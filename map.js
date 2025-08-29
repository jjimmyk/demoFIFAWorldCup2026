// Minimal ArcGIS JS SDK map helper using 4.33 ESM via CDN
// Docs: https://developers.arcgis.com/javascript/latest/

// Using ESM imports directly from the CDN keeps bundling optional and makes it easy to embed later.
// If you prefer UMD with <script src="https://js.arcgis.com/4.33"></script>, you can adapt this file
// to use global esri.* namespaces instead.

import Map from "https://js.arcgis.com/4.33/@arcgis/core/Map.js";
import MapView from "https://js.arcgis.com/4.33/@arcgis/core/views/MapView.js";
import GeoJSONLayer from "https://js.arcgis.com/4.33/@arcgis/core/layers/GeoJSONLayer.js";
import esriConfig from "https://js.arcgis.com/4.33/@arcgis/core/config.js";
import Legend from "https://js.arcgis.com/4.33/@arcgis/core/widgets/Legend.js";

/**
 * Create a 2D MapView in the given container and return helpers for adding GeoJSON.
 * @param {string|HTMLElement} containerIdOrEl - Target div id or element.
 * @param {object} options
 * @param {string} [options.apiKey] - ArcGIS Location Platform API key (optional if not using premium basemaps/services).
 * @param {string} [options.basemap="arcgis-topographic"] - Basemap id or style.
 * @param {[number, number]} [options.center=[0, 0]] - [lon, lat].
 * @param {number} [options.zoom=2]
 */
export async function createMap(containerIdOrEl, options = {}) {
  const {
    apiKey,
    basemap = "arcgis-topographic",
    center = [0, 0],
    zoom = 2
  } = options;

  const resolvedContainer = typeof containerIdOrEl === "string"
    ? document.getElementById(containerIdOrEl)
    : containerIdOrEl;
  if (!resolvedContainer) throw new Error("Map container not found");

  // Configure API key if provided or set in localStorage
  const key = apiKey || window.localStorage.getItem("ARCGIS_API_KEY") || undefined;
  if (key) esriConfig.apiKey = key;

  const map = new Map({ basemap });
  const view = new MapView({ container: resolvedContainer, map, center, zoom });

  // Basic UI
  const legend = new Legend({ view });
  view.ui.add(legend, "top-right");

  // Helper: add GeoJSON by URL
  async function addGeoJSONFromUrl(url, layerOptions = {}) {
    const layer = new GeoJSONLayer({ url, ...layerOptions });
    map.add(layer);
    await layer.when();
    await view.whenLayerView(layer);
    // Zoom to layer
    const extent = await layer.queryExtent();
    if (extent && extent.extent) await view.goTo(extent.extent.expand(1.2));
    return layer;
  }

  // Helper: add GeoJSON from object (in-memory)
  async function addGeoJSONFromObject(geojsonObject, layerOptions = {}) {
    const blob = new Blob([JSON.stringify(geojsonObject)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    try {
      return await addGeoJSONFromUrl(url, layerOptions);
    } finally {
      // Keep the object URL alive while layer loads; revoke later on unload.
      window.addEventListener("beforeunload", () => URL.revokeObjectURL(url));
    }
  }

  return { view, map, addGeoJSONFromUrl, addGeoJSONFromObject };
}


