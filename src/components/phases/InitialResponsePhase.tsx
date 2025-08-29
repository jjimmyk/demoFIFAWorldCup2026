import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { MapPin, FileText, Target, Activity, Map, Users, Edit, Plus, User, ChevronDown, ChevronUp, Download } from 'lucide-react';

interface InitialResponsePhaseProps {
  data?: Record<string, any>;
  onDataChange: (data: Record<string, any>) => void;
  onComplete: () => void;
  onPrevious?: () => void;
}

export function InitialResponsePhase({ data = {}, onDataChange, onComplete, onPrevious }: InitialResponsePhaseProps) {
  const [formData, setFormData] = useState({
    mapSketch: data.mapSketch || '',
    situationOverview: data.situationOverview || '',
    objectives: data.objectives || '',
    currentActions: data.currentActions || '',
    plannedActions: data.plannedActions || '',
    ...data
  });

  const [isMapExpanded, setIsMapExpanded] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onDataChange(newData);
  };

  const handleExportICS201 = () => {
    // TODO: Implement ICS-201 export functionality
    // For now, show a notification that export is triggered
    console.log('Exporting ICS-201 form...');
    // In a real implementation, this would generate and download the ICS-201 PDF
  };

  const isFormValid = true;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Initial Response & Assessment</h2>
          <p className="text-muted-foreground">Document the initial incident details and immediate response actions</p>
        </div>
        <Button 
          variant="outline" 
          onClick={handleExportICS201}
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export ICS-201
        </Button>
      </div>

      {/* Situation Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Situation Overview
          </CardTitle>

        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.situationOverview}
            onChange={(e) => handleInputChange('situationOverview', e.target.value)}
            placeholder="Describe the current situation: what happened, current conditions, environmental factors, impacts, response status, etc."
            rows={8}
          />
        </CardContent>
      </Card>

      {/* Map Sketch - Full Width */}
      <Card>
        <Collapsible open={isMapExpanded} onOpenChange={setIsMapExpanded}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Map className="w-5 h-5" />
                  Map Sketch
                </CardTitle>
                <CardDescription>Location details and reference points</CardDescription>
              </div>
              <CollapsibleTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  {isMapExpanded ? (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      Hide Map
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      View Map
                    </>
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
          </CardHeader>
          <CollapsibleContent>
            <div className="px-6 pb-4">
              <div className="border rounded-lg overflow-hidden bg-muted/20">
                <iframe
                  src="https://www.arcgis.com/apps/mapviewer/index.html?webmap=6ace7e7112ba42c493a9ccfeed86b0ec"
                  width="100%"
                  height="500"
                  frameBorder="0"
                  scrolling="no"
                  allowFullScreen
                  title="ArcGIS Emergency Response Map - Galveston Bay Area"
                  className="w-full"
                />
                <div className="p-2 bg-muted/50 text-xs text-muted-foreground text-center">
                  Interactive map showing Galveston Bay area for incident location reference
                </div>
              </div>
            </div>
          </CollapsibleContent>
          <CardContent>
            <Textarea
              value={formData.mapSketch}
              onChange={(e) => handleInputChange('mapSketch', e.target.value)}
              placeholder="Describe coordinates, reference points, boundaries, nearby infrastructure, staging areas, etc."
              rows={8}
            />
          </CardContent>
        </Collapsible>
      </Card>

      {/* Objectives */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="w-5 h-5" />
            Objectives
          </CardTitle>
          <CardDescription>Strategic objectives and priorities for this operational period</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.objectives}
            onChange={(e) => handleInputChange('objectives', e.target.value)}
            placeholder="List primary and secondary objectives: life safety, environmental protection, source control, etc."
            rows={8}
          />
        </CardContent>
      </Card>

      {/* Actions Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Current Actions
            </CardTitle>
            <CardDescription>Actions currently being taken</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.currentActions}
              onChange={(e) => handleInputChange('currentActions', e.target.value)}
              placeholder="List all actions currently underway: containment, response, notifications, etc."
              rows={10}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Planned Actions
            </CardTitle>
            <CardDescription>Actions planned for the next operational period</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.plannedActions}
              onChange={(e) => handleInputChange('plannedActions', e.target.value)}
              placeholder="List planned actions: resource deployment, tactical operations, monitoring, etc."
              rows={10}
            />
          </CardContent>
        </Card>
      </div>

      {/* Organization Structure */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5" />
                Organizational Structure
              </CardTitle>
              <CardDescription>Define the incident command structure and key positions</CardDescription>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              0/12 Positions Filled
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            {/* Incident Commander */}
            <div className="w-64">
              <div className="bg-primary/20 border-2 border-primary rounded-lg p-4 text-center relative">
                <div className="bg-destructive text-destructive-foreground px-2 py-1 rounded text-xs absolute -top-2 left-2">
                  Vacant
                </div>
                <Button size="sm" variant="ghost" className="absolute -top-2 right-2 p-1 h-6 w-6">
                  <Edit className="w-3 h-3" />
                </Button>
                <div className="text-sm font-medium mb-1">Incident Commander</div>
                <div className="text-xs text-muted-foreground">Click to assign</div>
              </div>
              <div className="flex justify-center mt-2">
                <Button size="sm" variant="outline" className="text-xs flex items-center gap-1">
                  <Plus className="w-3 h-3" />
                  Add Position
                </Button>
              </div>
            </div>

            {/* Section Level Positions */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
              {[
                { title: 'Safety Officer', description: 'Click to assign' },
                { title: 'Information Officer', description: 'Click to assign' },
                { title: 'Operations Section Chief', description: 'Click to assign' },
                { title: 'Planning Section Chief', description: 'Click to assign' },
                { title: 'Logistics Section Chief', description: 'Click to assign' }
              ].map((position, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="bg-accent/20 border-2 border-accent rounded-lg p-3 text-center relative w-full">
                    <div className="bg-destructive text-destructive-foreground px-2 py-1 rounded text-xs absolute -top-2 left-2">
                      Vacant
                    </div>
                    <Button size="sm" variant="ghost" className="absolute -top-2 right-2 p-1 h-6 w-6">
                      <Edit className="w-3 h-3" />
                    </Button>
                    <div className="text-xs font-medium mb-1">{position.title}</div>
                    <div className="text-xs text-muted-foreground">{position.description}</div>
                  </div>
                  <div className="flex justify-center mt-2">
                    <Button size="sm" variant="outline" className="text-xs flex items-center gap-1">
                      <Plus className="w-3 h-3" />
                      Add Position
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Unit Level Positions */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
              {[
                { title: 'Division A Supervisor', description: 'Click to assign' },
                { title: 'Division B Supervisor', description: 'Click to assign' },
                { title: 'Resources Leader', description: 'Click to assign' },
                { title: 'Situation Unit Leader', description: 'Click to assign' },
                { title: 'Supply Unit Leader', description: 'Click to assign' }
              ].map((position, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="bg-orange-500/20 border-2 border-orange-500 rounded-lg p-3 text-center relative w-full">
                    <div className="bg-destructive text-destructive-foreground px-2 py-1 rounded text-xs absolute -top-2 left-2">
                      Vacant
                    </div>
                    <Button size="sm" variant="ghost" className="absolute -top-2 right-2 p-1 h-6 w-6">
                      <Edit className="w-3 h-3" />
                    </Button>
                    <div className="text-xs font-medium mb-1">{position.title}</div>
                    <div className="text-xs text-muted-foreground">{position.description}</div>
                  </div>
                  <div className="flex justify-center mt-2">
                    <Button size="sm" variant="outline" className="text-xs flex items-center gap-1">
                      <Plus className="w-3 h-3" />
                      Add Position
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between pt-6">
        <Button 
          variant="outline" 
          onClick={onPrevious}
          disabled={!onPrevious}
        >
          Previous
        </Button>
        <Button 
          onClick={onComplete}
          disabled={!isFormValid}
          className="bg-primary hover:bg-primary/90"
        >
          Complete & Continue
        </Button>
      </div>
    </div>
  );
}