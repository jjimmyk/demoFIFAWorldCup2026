import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { CalendarDays, Target, Users, FileText, Plus, X } from 'lucide-react';

interface PlanningMeetingPhaseProps {
  data?: Record<string, any>;
  onDataChange: (data: Record<string, any>) => void;
  onComplete: () => void;
  onPrevious: () => void;
}

export function PlanningMeetingPhase({ data = {}, onDataChange, onComplete, onPrevious }: PlanningMeetingPhaseProps) {
  const [formData, setFormData] = useState({
    meetingTime: data.meetingTime || '',
    operationalPeriod: data.operationalPeriod || '',
    objectives: data.objectives || [],
    strategy: data.strategy || '',
    assignmentList: data.assignmentList || [],
    resourceRequests: data.resourceRequests || '',
    contingencyPlans: data.contingencyPlans || '',
    communicationsPlan: data.communicationsPlan || '',
    ...data
  });

  const [newObjective, setNewObjective] = useState('');
  const [newAssignment, setNewAssignment] = useState({ unit: '', assignment: '', personnel: '' });

  const handleInputChange = (field: string, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onDataChange(newData);
  };

  const addObjective = () => {
    if (newObjective.trim()) {
      const objectives = [...formData.objectives, newObjective.trim()];
      handleInputChange('objectives', objectives);
      setNewObjective('');
    }
  };

  const removeObjective = (index: number) => {
    const objectives = formData.objectives.filter((_: any, i: number) => i !== index);
    handleInputChange('objectives', objectives);
  };

  const addAssignment = () => {
    if (newAssignment.unit && newAssignment.assignment) {
      const assignments = [...formData.assignmentList, { ...newAssignment, id: Date.now() }];
      handleInputChange('assignmentList', assignments);
      setNewAssignment({ unit: '', assignment: '', personnel: '' });
    }
  };

  const removeAssignment = (id: number) => {
    const assignments = formData.assignmentList.filter((a: any) => a.id !== id);
    handleInputChange('assignmentList', assignments);
  };

  const isFormValid = formData.meetingTime && formData.operationalPeriod && formData.objectives.length > 0 && formData.strategy;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
          <CalendarDays className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2>Planning Meeting</h2>
          <p className="text-muted-foreground">Develop the Incident Action Plan for the next operational period</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Meeting Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="meeting-time">Planning Meeting Time *</Label>
              <Input
                id="meeting-time"
                type="datetime-local"
                value={formData.meetingTime}
                onChange={(e) => handleInputChange('meetingTime', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="operational-period">Next Operational Period *</Label>
              <Input
                id="operational-period"
                value={formData.operationalPeriod}
                onChange={(e) => handleInputChange('operationalPeriod', e.target.value)}
                placeholder="e.g., 0600-1800 Day 2"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Communications Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.communicationsPlan}
              onChange={(e) => handleInputChange('communicationsPlan', e.target.value)}
              placeholder="Radio frequencies, command post locations, reporting procedures"
              rows={4}
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Operational Objectives *
          </CardTitle>
          <CardDescription>Set clear, measurable objectives for this operational period</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newObjective}
              onChange={(e) => setNewObjective(e.target.value)}
              placeholder="Enter operational objective"
              onKeyPress={(e) => e.key === 'Enter' && addObjective()}
            />
            <Button onClick={addObjective} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            {formData.objectives.map((objective: string, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-md">
                <span className="text-sm">{objective}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeObjective(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Strategy *</CardTitle>
          <CardDescription>Overall strategic approach for achieving objectives</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.strategy}
            onChange={(e) => handleInputChange('strategy', e.target.value)}
            placeholder="Describe the overall strategy and approach for this operational period"
            rows={4}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Tactical Assignments
          </CardTitle>
          <CardDescription>Assign specific tasks to operational units</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Input
              placeholder="Unit/Team"
              value={newAssignment.unit}
              onChange={(e) => setNewAssignment({...newAssignment, unit: e.target.value})}
            />
            <Input
              placeholder="Assignment"
              value={newAssignment.assignment}
              onChange={(e) => setNewAssignment({...newAssignment, assignment: e.target.value})}
            />
            <div className="flex gap-2">
              <Input
                placeholder="Personnel"
                value={newAssignment.personnel}
                onChange={(e) => setNewAssignment({...newAssignment, personnel: e.target.value})}
              />
              <Button onClick={addAssignment} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            {formData.assignmentList.map((assignment: any) => (
              <div key={assignment.id} className="flex items-center justify-between p-3 bg-muted rounded-md">
                <div className="flex gap-4">
                  <Badge variant="outline">{assignment.unit}</Badge>
                  <span className="text-sm">{assignment.assignment}</span>
                  {assignment.personnel && (
                    <span className="text-sm text-muted-foreground">({assignment.personnel})</span>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeAssignment(assignment.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resource Requests</CardTitle>
          <CardDescription>Additional resources needed for next operational period</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.resourceRequests}
            onChange={(e) => handleInputChange('resourceRequests', e.target.value)}
            placeholder="Personnel, equipment, or other resources needed"
            rows={3}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contingency Plans</CardTitle>
          <CardDescription>Alternative plans for potential scenarios</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.contingencyPlans}
            onChange={(e) => handleInputChange('contingencyPlans', e.target.value)}
            placeholder="What-if scenarios and backup plans"
            rows={3}
          />
        </CardContent>
      </Card>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrevious}>
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