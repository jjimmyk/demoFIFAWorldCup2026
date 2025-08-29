import { useEffect, useRef } from 'react';
import { Maximize2 } from 'lucide-react';

// This component mounts the Esri Map defined in worldcupesri_map.js
// and reproduces the demo polygons/popups from worldcupesri_index.html
export default function EsriMap() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<any | null>(null);
  const uasLayerRef = useRef<any | null>(null);
  const fullscreenLayersRef = useRef<any[]>([]);
  const aor1LayerRef = useRef<any | null>(null);
  const aor2LayerRef = useRef<any | null>(null);
  const miamiRegionLayerRef = useRef<any | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Inject ArcGIS CSS once
    const existingLink = document.querySelector('link[data-esri-css="true"]');
    let linkEl: HTMLLinkElement | null = null;
    if (!existingLink) {
      linkEl = document.createElement('link');
      linkEl.rel = 'stylesheet';
      linkEl.href = 'https://js.arcgis.com/4.33/esri/themes/light/main.css';
      linkEl.setAttribute('data-esri-css', 'true');
      document.head.appendChild(linkEl);
    }

    let isCancelled = false;
    let cleanupFns: Array<() => void> = [];

    async function mountMap() {
      // Dynamically import ArcGIS modules directly from CDN to avoid bundling issues
      const [
        { default: Map },
        { default: MapView },
        { default: GeoJSONLayer },
        { default: esriConfig },
        { default: Legend },
        { default: Extent },
      ] = await Promise.all([
        import(/* @vite-ignore */ 'https://js.arcgis.com/4.33/@arcgis/core/Map.js'),
        import(/* @vite-ignore */ 'https://js.arcgis.com/4.33/@arcgis/core/views/MapView.js'),
        import(/* @vite-ignore */ 'https://js.arcgis.com/4.33/@arcgis/core/layers/GeoJSONLayer.js'),
        import(/* @vite-ignore */ 'https://js.arcgis.com/4.33/@arcgis/core/config.js'),
        import(/* @vite-ignore */ 'https://js.arcgis.com/4.33/@arcgis/core/widgets/Legend.js'),
        import(/* @vite-ignore */ 'https://js.arcgis.com/4.33/@arcgis/core/geometry/Extent.js'),
      ]);

      // Configure API key if provided or set in localStorage
      const key = window.localStorage.getItem('ARCGIS_API_KEY') || undefined;
      if (key) (esriConfig as any).apiKey = key;

      // Create map and view
      const map = new (Map as any)({ basemap: 'hybrid' });
      const view = new (MapView as any)({
        container: containerRef.current!,
        map,
        center: [-98.5795, 39.8283],
        zoom: 4,
      });
      viewRef.current = view;

      // Legend removed per requirement

      // Helpers to add GeoJSON (with optional zoom suppression)
      let suppressZoom = false;
      async function addGeoJSONFromUrl(url: string, layerOptions: Record<string, any> = {}) {
        const layer = new (GeoJSONLayer as any)({ url, ...layerOptions });
        map.add(layer);
        await layer.when();
        await (view as any).whenLayerView(layer);
        const extent = await layer.queryExtent();
        if (!suppressZoom && extent && extent.extent) {
          // Only auto-zoom for UAS or explicit events; prevent broad zoom-outs
          if ((layerOptions as any)?.title === 'UAS Units') {
            await (view as any).goTo(extent.extent.expand(1.2));
          }
        }
        return layer;
      }

      async function addGeoJSONFromObject(geojsonObject: unknown, layerOptions: Record<string, any> = {}) {
        const blob = new Blob([JSON.stringify(geojsonObject)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        try {
          return await addGeoJSONFromUrl(url, layerOptions);
        } finally {
          window.addEventListener('beforeunload', () => URL.revokeObjectURL(url));
        }
      }

      if (isCancelled) return;

      // Helper to build a circle polygon GeoJSON
      function createCircleGeoJSON(centerLon: number, centerLat: number, radiusKm: number, steps = 64, properties: Record<string, any> = {}) {
        const toRad = (d: number) => d * Math.PI / 180;
        const cosLat = Math.cos(toRad(centerLat));
        const deltaLat = radiusKm / 111.0;
        const deltaLonBase = radiusKm / (111.0 * (cosLat || 1e-6));
        const ring: Array<[number, number]> = [];
        for (let i = 0; i <= steps; i++) {
          const t = (i / steps) * Math.PI * 2;
          const lon = centerLon + deltaLonBase * Math.cos(t);
          const lat = centerLat + deltaLat * Math.sin(t);
          ring.push([lon, lat]);
        }
        return {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties,
              geometry: { type: 'Polygon', coordinates: [ring] },
            },
          ],
        } as const;
      }

      const miami = { lon: -80.1918, lat: 25.7617 };

      // TFR polygon
      const tfrGeojson = createCircleGeoJSON(miami.lon, miami.lat, 25, 96, {
        name: 'TFR - Miami',
        ZoneCommander: 'Miami ATC',
        Status: 'Active',
      });
      await addGeoJSONFromObject(tfrGeojson, {
        title: 'TFR - Miami',
        renderer: {
          type: 'simple',
          symbol: {
            type: 'simple-fill',
            color: [227, 66, 52, 0.25],
            outline: { color: [227, 66, 52, 1], width: 2 },
          },
        },
        popupTemplate: {
          title: '{name}',
          content: [
            {
              type: 'fields',
              fieldInfos: [
                { fieldName: 'ZoneCommander', label: 'Zone Commander' },
                { fieldName: 'Status', label: 'Status' },
              ],
            },
          ],
        },
        labelingInfo: [
          {
            labelPlacement: 'center-center',
            labelExpressionInfo: { expression: '$feature.name' },
            symbol: {
              type: 'text',
              color: 'white',
              haloColor: 'black',
              haloSize: 1,
              font: { size: 12, weight: 'bold' },
            },
          },
        ],
      });

      // AOR 1 polygon
      const aor1 = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: { name: 'AOR 1', ZoneCommander: 'AOR 1 Lead', Status: 'Monitoring' },
            geometry: {
              type: 'Polygon',
              coordinates: [[
                [-79.95, 25.60],
                [-79.50, 25.60],
                [-79.50, 26.00],
                [-79.95, 26.00],
                [-79.95, 25.60],
              ]],
            },
          },
        ],
      } as const;
      aor1LayerRef.current = await addGeoJSONFromObject(aor1, {
        title: 'AOR 1',
        renderer: {
          type: 'simple',
          symbol: {
            type: 'simple-fill',
            color: [0, 112, 255, 0.25],
            outline: { color: [0, 112, 255, 1], width: 2 },
          },
        },
        popupTemplate: {
          title: '{name}',
          content: [
            {
              type: 'fields',
              fieldInfos: [
                { fieldName: 'ZoneCommander', label: 'Zone Commander' },
                { fieldName: 'Status', label: 'Status' },
              ],
            },
          ],
        },
        labelingInfo: [
          {
            labelPlacement: 'center-center',
            labelExpressionInfo: { expression: '$feature.name' },
            symbol: {
              type: 'text',
              color: 'white',
              haloColor: 'black',
              haloSize: 1,
              font: { size: 12, weight: 'bold' },
            },
          },
        ],
      });

      // AOR 2 polygon
      const aor2 = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: { name: 'AOR 2', ZoneCommander: 'AOR 2 Lead', Status: 'Standby' },
            geometry: {
              type: 'Polygon',
              coordinates: [[
                [-79.90, 25.20],
                [-79.40, 25.20],
                [-79.40, 25.50],
                [-79.90, 25.50],
                [-79.90, 25.20],
              ]],
            },
          },
        ],
      } as const;
      aor2LayerRef.current = await addGeoJSONFromObject(aor2, {
        title: 'AOR 2',
        renderer: {
          type: 'simple',
          symbol: {
            type: 'simple-fill',
            color: [46, 204, 113, 0.25],
            outline: { color: [46, 204, 113, 1], width: 2 },
          },
        },
        popupTemplate: {
          title: '{name}',
          content: [
            {
              type: 'fields',
              fieldInfos: [
                { fieldName: 'ZoneCommander', label: 'Zone Commander' },
                { fieldName: 'Status', label: 'Status' },
              ],
            },
          ],
        },
        labelingInfo: [
          {
            labelPlacement: 'center-center',
            labelExpressionInfo: { expression: '$feature.name' },
            symbol: {
              type: 'text',
              color: 'white',
              haloColor: 'black',
              haloSize: 1,
              font: { size: 12, weight: 'bold' },
            },
          },
        ],
      });

      // UAS units within AOR 1, clustered with random jitter and constrained to AOR1 bbox
      const aor1MinLon = -79.95;
      const aor1MaxLon = -79.50;
      const aor1MinLat = 25.60;
      const aor1MaxLat = 26.00;

      // Cluster center near the western half of AOR1 to imply approach toward TFR
      const clusterCenterLon = -79.78;
      const clusterCenterLat = 25.80;

      // Helper: clamp
      const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

      // Helper: generate approximately normal noise using Box-Muller
      function randNormal(mean = 0, stdDev = 1) {
        const u1 = 1 - Math.random();
        const u2 = 1 - Math.random();
        const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
        return mean + z0 * stdDev;
      }

      const uasFeatures = Array.from({ length: 10 }).map((_, i) => {
        // Small jitter around cluster center (std devs are tuned to keep cluster tight)
        let lon = clusterCenterLon + randNormal(0, 0.03); // ~0.03 deg std dev in lon
        let lat = clusterCenterLat + randNormal(0, 0.025); // ~0.025 deg std dev in lat
        // Ensure points stay within AOR1 bounds
        lon = clamp(lon, aor1MinLon + 0.01, aor1MaxLon - 0.01);
        lat = clamp(lat, aor1MinLat + 0.01, aor1MaxLat - 0.01);

        const types = ['quad', 'fixed-wing', 'helicopter'];
        const status = ['Enroute', 'Active', 'Monitoring'];
        return {
          type: 'Feature',
          properties: {
            id: `UAS-${String(i + 1).padStart(2, '0')}`,
            ground_speed_mps: 12 + (i % 5) * 3,
            operational_status: status[i % status.length],
            aircraft_type: types[i % types.length],
            registered_uas: i % 2 === 0,
            swarm: i % 3 === 0,
          },
          geometry: {
            type: 'Point',
            coordinates: [lon, lat],
          },
        } as const;
      });

      const uasGeojson = {
        type: 'FeatureCollection',
        features: uasFeatures,
      } as const;

      uasLayerRef.current = await addGeoJSONFromObject(uasGeojson, {
        title: 'UAS Units',
        renderer: {
          type: 'simple',
          symbol: {
            type: 'simple-marker',
            size: 8,
            color: [255, 140, 0, 1],
            outline: { color: [0, 0, 0, 0.9], width: 1 },
          },
        },
        popupTemplate: {
          title: '{id}',
          content: [
            {
              type: 'fields',
              fieldInfos: [
                { fieldName: 'ground_speed_mps', label: 'Ground speed (m/s)' },
                { fieldName: 'operational_status', label: 'Operational status' },
                { fieldName: 'aircraft_type', label: 'Aircraft type' },
                { fieldName: 'registered_uas', label: 'Registered UAS' },
                { fieldName: 'swarm', label: 'Swarm' },
              ],
            },
          ],
        },
        labelingInfo: [
          {
            labelPlacement: 'above-center',
            labelExpressionInfo: { expression: '$feature.id' },
            symbol: {
              type: 'text',
              color: 'white',
              haloColor: 'black',
              haloSize: 1,
              font: { size: 9, weight: 'bold' },
            },
          },
        ],
      });

      // Vessel 01 (suspicious) inside AOR1 on the right side
      const vesselGeojson = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {
              name: 'Vessel 01',
              vessel_type: 'Cargo (Small)',
              total_risk: 'High',
              flag_risk: 'Medium',
              ownership_risk: 'High',
              ais_gaps_risk: 'High',
              abnormal_movements_risk: 'High',
              status: 'Suspicious',
            },
            geometry: {
              type: 'Point',
              // Right side of AOR1 bbox (slightly left of max lon, mid-lat)
              coordinates: [-79.53, 25.80],
            },
          },
        ],
      } as const;

      await addGeoJSONFromObject(vesselGeojson, {
        title: 'Vessel 01',
        renderer: {
          type: 'simple',
          symbol: {
            type: 'simple-marker',
            size: 10,
            color: [220, 38, 38, 1],
            outline: { color: [255, 255, 255, 0.9], width: 1 },
          },
        },
        popupTemplate: {
          title: '{name}',
          content: [
            {
              type: 'fields',
              fieldInfos: [
                { fieldName: 'vessel_type', label: 'Vessel type' },
                { fieldName: 'total_risk', label: 'Total risk' },
                { fieldName: 'flag_risk', label: 'Flag risk' },
                { fieldName: 'ownership_risk', label: 'Ownership risk' },
                { fieldName: 'ais_gaps_risk', label: 'AIS gaps risk' },
                { fieldName: 'abnormal_movements_risk', label: 'Abnormal movements risk' },
                { fieldName: 'status', label: 'Status' },
              ],
            },
          ],
        },
        labelingInfo: [
          {
            labelPlacement: 'above-center',
            labelExpressionInfo: { expression: '$feature.name' },
            symbol: {
              type: 'text',
              color: 'white',
              haloColor: 'black',
              haloSize: 1,
              font: { size: 10, weight: 'bold' },
            },
          },
        ],
      });

      // Listen for external zoom request events
      async function handleZoomToUAS() {
        try {
          const layer = uasLayerRef.current;
          const view = viewRef.current;
          if (!layer || !view) return;
          const extent = await layer.queryExtent();
          if (extent && extent.extent) {
            await view.goTo(extent.extent.expand(1.4));
          }
        } catch {}
      }

      window.addEventListener('zoom-to-uas', handleZoomToUAS);
      cleanupFns.push(() => window.removeEventListener('zoom-to-uas', handleZoomToUAS));

      async function handleNeutralizeUAS() {
        try {
          const layer: any = uasLayerRef.current;
          if (!layer) return;
          // Update renderer to gray
          layer.renderer = {
            type: 'simple',
            symbol: { type: 'simple-marker', size: 8, color: [128, 128, 128, 1], outline: { color: [0,0,0,0.6], width: 1 } },
          } as any;
          // Try to update attributes to reflect neutralized status in popup
          const q = layer.createQuery();
          q.returnGeometry = false;
          q.outFields = ['*'];
          const res = await layer.queryFeatures(q);
          const edits = res.features.map((f: any) => ({
            objectId: f.getObjectId ? f.getObjectId() : undefined,
            attributes: { ...f.attributes, operational_status: 'neutralized' },
          }));
          try { await layer.applyEdits({ updateFeatures: edits.filter((e: any) => e.objectId) }); } catch {}
          // As a fallback, override popupTemplate to show neutralized when undefined
          layer.popupTemplate = layer.popupTemplate || { title: '{id}' };
          const originalContent = (layer.popupTemplate as any).content;
          (layer.popupTemplate as any).content = [
            {
              type: 'fields',
              fieldInfos: [
                { fieldName: 'ground_speed_mps', label: 'Ground speed (m/s)' },
                { fieldName: 'operational_status', label: 'Operational status' },
                { fieldName: 'aircraft_type', label: 'Aircraft type' },
                { fieldName: 'registered_uas', label: 'Registered UAS' },
                { fieldName: 'swarm', label: 'Swarm' },
              ],
            },
            {
              type: 'text',
              text: '<em>Status forced to neutralized</em>',
            },
          ];
          (viewRef.current as any).requestRender?.();
        } catch {}
      }
      window.addEventListener('neutralize-uas', handleNeutralizeUAS);
      cleanupFns.push(() => window.removeEventListener('neutralize-uas', handleNeutralizeUAS));

      async function handleShowAORs() {
        try {
          const a = aor1LayerRef.current ? await aor1LayerRef.current.queryExtent() : null;
          const b = aor2LayerRef.current ? await aor2LayerRef.current.queryExtent() : null;
          const e1 = a?.extent;
          const e2 = b?.extent;
          if (!e1 && !e2) return;
          let unionExtent: any = e1 || e2;
          if (e1 && e2) {
            const xmin = Math.min(e1.xmin, e2.xmin);
            const ymin = Math.min(e1.ymin, e2.ymin);
            const xmax = Math.max(e1.xmax, e2.xmax);
            const ymax = Math.max(e1.ymax, e2.ymax);
            unionExtent = new (Extent as any)({ xmin, ymin, xmax, ymax, spatialReference: e1.spatialReference || e2.spatialReference });
          }
          // Do not auto-zoom to AORs when navigating; keep current zoom
        } catch {}
      }
      window.addEventListener('map-show-aors', handleShowAORs);
      cleanupFns.push(() => window.removeEventListener('map-show-aors', handleShowAORs));

      async function handleAddCUAS() {
        try {
          const baseLon = -79.70; // near cluster center
          const baseLat = 25.82;
          const pts = [
            [baseLon - 0.02, baseLat + 0.01],
            [baseLon - 0.03, baseLat - 0.005],
            [baseLon - 0.015, baseLat + 0.02],
          ];
          const cuas = {
            type: 'FeatureCollection',
            features: pts.map((coord, i) => ({
              type: 'Feature',
              properties: {
                id: `C-UAS USCG ${i + 1}`,
                operator: 'United States Coast Guard',
                role: 'Counter-UAS',
                status: 'Active',
              },
              geometry: { type: 'Point', coordinates: coord as [number, number] },
            })),
          } as const;
          await addGeoJSONFromObject(cuas, {
            title: 'C-UAS Units',
            renderer: {
              type: 'simple',
              symbol: { type: 'simple-marker', size: 9, color: [34, 197, 94, 1], outline: { color: [0,0,0,0.9], width: 1 } },
            },
            popupTemplate: {
              title: '{id}',
              content: [
                { type: 'fields', fieldInfos: [
                  { fieldName: 'operator', label: 'Operator' },
                  { fieldName: 'role', label: 'Role' },
                  { fieldName: 'status', label: 'Status' },
                ]},
              ],
            },
            labelingInfo: [{
              labelPlacement: 'above-center',
              labelExpressionInfo: { expression: '$feature.id' },
              symbol: { type: 'text', color: 'white', haloColor: 'black', haloSize: 1, font: { size: 9, weight: 'bold' } },
            }],
          });
        } catch {}
      }
      window.addEventListener('add-cuas-points', handleAddCUAS);
      cleanupFns.push(() => window.removeEventListener('add-cuas-points', handleAddCUAS));

      // Helper to build a rectangle GeoJSON from bbox
      function rectangleGeoJSON(minLon: number, minLat: number, maxLon: number, maxLat: number, properties: Record<string, any>) {
        return {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties,
              geometry: {
                type: 'Polygon',
                coordinates: [[
                  [minLon, minLat],
                  [maxLon, minLat],
                  [maxLon, maxLat],
                  [minLon, maxLat],
                  [minLon, minLat],
                ]],
              },
            },
          ],
        } as const;
      }

      async function addFullscreenPolygons() {
        if (fullscreenLayersRef.current.length > 0) return;
        async function exitFullscreenLikeEscape() {
          const doc: any = document;
          try {
            if (doc.fullscreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement) {
              if (doc.exitFullscreen) await doc.exitFullscreen();
              else if (doc.webkitExitFullscreen) await doc.webkitExitFullscreen();
              else if (doc.msExitFullscreen) await doc.msExitFullscreen();
            }
          } catch {}
        }
        // Greater Miami (approx)
        const miami = rectangleGeoJSON(-80.9, 25.2, -80.0, 26.4, { name: 'NSSE Miami' });
        const miamiLayer = await addGeoJSONFromObject(miami, {
          title: 'NSSE Miami',
          renderer: {
            type: 'simple',
            symbol: { type: 'simple-fill', color: [227, 66, 52, 0.12], outline: { color: [227, 66, 52, 0.9], width: 1.5 } },
          },
          popupTemplate: {
            title: '{name}',
            content: () => {
              const wrapper = document.createElement('div');
              wrapper.style.display = 'flex';
              wrapper.style.flexDirection = 'column';
              wrapper.style.gap = '8px';
              const p = document.createElement('div');
              p.textContent = 'View this region in the standard layout.';
              const btn = document.createElement('button');
              btn.textContent = 'View Region';
              btn.style.padding = '6px 10px';
              btn.style.borderRadius = '6px';
              btn.style.border = '1px solid rgba(0,0,0,0.2)';
              btn.style.background = '#fff';
              btn.style.cursor = 'pointer';
              btn.addEventListener('click', async () => {
                try {
                  (viewRef.current as any)?.popup?.close();
                } catch {}
                await exitFullscreenLikeEscape();
                try {
                  window.dispatchEvent(new CustomEvent('app-switch-tab', { detail: 'operations' }));
                } catch {}
                try {
                  window.dispatchEvent(new Event('map-show-miami'));
                } catch {}
              });
              wrapper.appendChild(p);
              wrapper.appendChild(btn);
              return wrapper;
            },
          },
        });
        miamiRegionLayerRef.current = miamiLayer;

        // Greater Los Angeles (approx)
        const la = rectangleGeoJSON(-119.0, 33.2, -117.5, 34.6, { name: 'NSSE Los Angeles' });
        const laLayer = await addGeoJSONFromObject(la, {
          title: 'NSSE Los Angeles',
          renderer: {
            type: 'simple',
            symbol: { type: 'simple-fill', color: [0, 112, 255, 0.12], outline: { color: [0, 112, 255, 0.9], width: 1.5 } },
          },
          popupTemplate: { title: '{name}' },
        });

        // San Francisco / Bay Area (approx)
        const sf = rectangleGeoJSON(-123.4, 37.0, -121.5, 38.6, { name: 'NSSE San Francisco/Bay Area' });
        const sfLayer = await addGeoJSONFromObject(sf, {
          title: 'NSSE San Francisco/Bay Area',
          renderer: {
            type: 'simple',
            symbol: { type: 'simple-fill', color: [255, 140, 0, 0.12], outline: { color: [255, 140, 0, 0.9], width: 1.5 } },
          },
          popupTemplate: { title: '{name}' },
        });

        // Greater Kansas City (approx)
        const kc = rectangleGeoJSON(-95.2, 38.7, -94.3, 39.4, { name: 'NSSE Kansas City' });
        const kcLayer = await addGeoJSONFromObject(kc, {
          title: 'NSSE Kansas City',
          renderer: {
            type: 'simple',
            symbol: { type: 'simple-fill', color: [128, 0, 128, 0.12], outline: { color: [128, 0, 128, 0.9], width: 1.5 } },
          },
          popupTemplate: { title: '{name}' },
        });

        // Greater Atlanta (approx)
        const atl = rectangleGeoJSON(-85.7, 33.0, -83.9, 34.3, { name: 'NSSE Atlanta' });
        const atlLayer = await addGeoJSONFromObject(atl, {
          title: 'NSSE Atlanta',
          renderer: {
            type: 'simple',
            symbol: { type: 'simple-fill', color: [34, 197, 94, 0.12], outline: { color: [34, 197, 94, 0.9], width: 1.5 } },
          },
          popupTemplate: { title: '{name}' },
        });

        // Greater Boston (approx)
        const bos = rectangleGeoJSON(-71.5, 42.0, -70.5, 42.8, { name: 'NSSE Boston' });
        const bosLayer = await addGeoJSONFromObject(bos, {
          title: 'NSSE Boston',
          renderer: {
            type: 'simple',
            symbol: { type: 'simple-fill', color: [255, 99, 132, 0.12], outline: { color: [255, 99, 132, 0.9], width: 1.5 } },
          },
          popupTemplate: { title: '{name}' },
        });

        // Greater Dallas (approx)
        const dal = rectangleGeoJSON(-97.5, 32.4, -96.2, 33.3, { name: 'NSSE Dallas' });
        const dalLayer = await addGeoJSONFromObject(dal, {
          title: 'NSSE Dallas',
          renderer: {
            type: 'simple',
            symbol: { type: 'simple-fill', color: [54, 162, 235, 0.12], outline: { color: [54, 162, 235, 0.9], width: 1.5 } },
          },
          popupTemplate: { title: '{name}' },
        });

        // Greater Houston (approx)
        const hou = rectangleGeoJSON(-96.1, 29.3, -94.9, 30.2, { name: 'NSSE Houston' });
        const houLayer = await addGeoJSONFromObject(hou, {
          title: 'NSSE Houston',
          renderer: {
            type: 'simple',
            symbol: { type: 'simple-fill', color: [75, 192, 192, 0.12], outline: { color: [75, 192, 192, 0.9], width: 1.5 } },
          },
          popupTemplate: { title: '{name}' },
        });

        // Greater New York / New Jersey (approx)
        const nynj = rectangleGeoJSON(-74.6, 40.3, -73.2, 41.1, { name: 'NSSE New York/New Jersey' });
        const nynjLayer = await addGeoJSONFromObject(nynj, {
          title: 'NSSE New York/New Jersey',
          renderer: {
            type: 'simple',
            symbol: { type: 'simple-fill', color: [153, 102, 255, 0.12], outline: { color: [153, 102, 255, 0.9], width: 1.5 } },
          },
          popupTemplate: { title: '{name}' },
        });

        // Greater Philadelphia (approx)
        const phi = rectangleGeoJSON(-75.5, 39.6, -74.7, 40.2, { name: 'NSSE Philadelphia' });
        const phiLayer = await addGeoJSONFromObject(phi, {
          title: 'NSSE Philadelphia',
          renderer: {
            type: 'simple',
            symbol: { type: 'simple-fill', color: [201, 203, 207, 0.12], outline: { color: [201, 203, 207, 0.9], width: 1.5 } },
          },
          popupTemplate: { title: '{name}' },
        });

        // Greater Seattle (approx)
        const sea = rectangleGeoJSON(-122.6, 47.3, -121.9, 47.9, { name: 'NSSE Seattle' });
        const seaLayer = await addGeoJSONFromObject(sea, {
          title: 'NSSE Seattle',
          renderer: {
            type: 'simple',
            symbol: { type: 'simple-fill', color: [255, 205, 86, 0.12], outline: { color: [255, 205, 86, 0.9], width: 1.5 } },
          },
          popupTemplate: { title: '{name}' },
        });

        fullscreenLayersRef.current = [
          miamiLayer,
          laLayer,
          sfLayer,
          kcLayer,
          atlLayer,
          bosLayer,
          dalLayer,
          houLayer,
          nynjLayer,
          phiLayer,
          seaLayer,
        ];
      }

      function removeFullscreenPolygons() {
        const layers = fullscreenLayersRef.current;
        const view = viewRef.current;
        if (layers && view && view.map) {
          layers.forEach((layer: any) => {
            try { view.map.remove(layer); } catch {}
          });
        }
        fullscreenLayersRef.current = [];
      }

      function handleFullscreenChange() {
        const doc: any = document;
        const isFs = !!(doc.fullscreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement);
        if (isFs && fullscreenLayersRef.current.length === 0) {
          // Ensure layers exist in fullscreen without changing zoom
          suppressZoom = true;
          addFullscreenPolygons().finally(() => { suppressZoom = false; });
        } else if (!isFs) {
          removeFullscreenPolygons();
        }
        // ensure view resizes
        setTimeout(() => { try { (viewRef.current as any)?.resize(); } catch {} }, 100);
      }

      document.addEventListener('fullscreenchange', handleFullscreenChange);
      document.addEventListener('webkitfullscreenchange', handleFullscreenChange as any);
      cleanupFns.push(() => document.removeEventListener('fullscreenchange', handleFullscreenChange));
      cleanupFns.push(() => document.removeEventListener('webkitfullscreenchange', handleFullscreenChange as any));

      // Ensure we can explicitly request NSSE polygons render immediately (e.g., on button click)
      async function handleAddNsseRegions() {
        try {
          suppressZoom = true;
          await addFullscreenPolygons();
        } finally {
          suppressZoom = false;
        }
      }
      window.addEventListener('map-add-nsse-regions', handleAddNsseRegions);
      cleanupFns.push(() => window.removeEventListener('map-add-nsse-regions', handleAddNsseRegions));

      // Popup action handler for "View Region"
      const popupHandle = (viewRef.current as any)?.popup?.on('trigger-action', async (evt: any) => {
        if (evt?.action?.id === 'view-region') {
          try {
            const doc: any = document;
            if (doc.fullscreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement) {
              if (doc.exitFullscreen) await doc.exitFullscreen();
              else if (doc.webkitExitFullscreen) await doc.webkitExitFullscreen();
              else if (doc.msExitFullscreen) await doc.msExitFullscreen();
            }
          } catch {}
        }
      });
      cleanupFns.push(() => { try { popupHandle?.remove?.(); } catch {} });

      async function handleShowMiami() {
        try {
          const layer = miamiRegionLayerRef.current;
          if (!layer) return;
          const extent = await layer.queryExtent();
          if (extent && extent.extent) await (viewRef.current as any).goTo(extent.extent.expand(1.2));
        } catch {}
      }
      window.addEventListener('map-show-miami', handleShowMiami);
      cleanupFns.push(() => window.removeEventListener('map-show-miami', handleShowMiami));

      // Fullscreen polygons are added only when entering fullscreen
    }

    mountMap();

    return () => {
      isCancelled = true;
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  async function toggleFullscreen() {
    const el = containerRef.current as any;
    if (!el) return;
    const doc: any = document;
    const inFs = doc.fullscreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement;
    try {
      if (!inFs) {
        // Proactively render NSSE polygons before entering fullscreen
        try { window.dispatchEvent(new Event('map-add-nsse-regions')); } catch {}
        if (el.requestFullscreen) await el.requestFullscreen();
        else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
        else if (el.msRequestFullscreen) await el.msRequestFullscreen();
      } else {
        if (doc.exitFullscreen) await doc.exitFullscreen();
        else if (doc.webkitExitFullscreen) await doc.webkitExitFullscreen();
        else if (doc.msExitFullscreen) await doc.msExitFullscreen();
      }
    } finally {
      // Resize the view after a tick to ensure correct sizing
      setTimeout(() => {
        if (viewRef.current) {
          try {
            viewRef.current.resize();
          } catch {}
        }
      }, 100);
    }
  }

  return (
    <div className="relative w-full h-[26rem]">
      <div ref={containerRef} className="absolute inset-0" />
      <button
        type="button"
        aria-label="Expand map"
        onClick={toggleFullscreen}
        className="absolute right-3 top-3 z-10 rounded-md bg-black/50 text-white p-2 hover:bg-black/60"
      >
        <Maximize2 className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
}


