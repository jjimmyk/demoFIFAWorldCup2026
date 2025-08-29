import { useState } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';

interface GenericPhaseProps {
  phase: {
    id: string;
    name: string;
    description: string;
  };
  data?: Record<string, any>;
  onDataChange: (data: Record<string, any>) => void;
  onComplete: () => void;
  onPrevious: () => void;
  isFirst?: boolean;
}

export function GenericPhase({ phase, data = {}, onDataChange, onComplete, onPrevious, isFirst = false }: GenericPhaseProps) {
  const [formData, setFormData] = useState({
    startTime: data.startTime || '',
    participants: data.participants || '',
    keyDiscussions: data.keyDiscussions || '',
    decisions: data.decisions || '',
    actionItems: data.actionItems || '',
    meetingNotes: data.meetingNotes || '',
    nextSteps: data.nextSteps || '',
    completed: data.completed || false,
    ...data
  });

  const handleInputChange = (field: string, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onDataChange(newData);
  };

  // Remove form validation requirement - allow users to proceed without completing required fields
  const isFormValid = true;

  return (
    <div className="space-y-6">
      <div>
        <h2>{phase.name}</h2>
        <p className="text-muted-foreground">{phase.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Session Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="start-time">Start Time</Label>
              <Input
                id="start-time"
                type="datetime-local"
                value={formData.startTime}
                onChange={(e) => handleInputChange('startTime', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="participants">Key Participants</Label>
              <Textarea
                id="participants"
                value={formData.participants}
                onChange={(e) => handleInputChange('participants', e.target.value)}
                placeholder="List attendees and their roles"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Outcomes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="decisions">Key Decisions</Label>
              <Textarea
                id="decisions"
                value={formData.decisions}
                onChange={(e) => handleInputChange('decisions', e.target.value)}
                placeholder="Important decisions made"
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="next-steps">Next Steps</Label>
              <Textarea
                id="next-steps"
                value={formData.nextSteps}
                onChange={(e) => handleInputChange('nextSteps', e.target.value)}
                placeholder="Next actions and timeline"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Key Discussions</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.keyDiscussions}
            onChange={(e) => handleInputChange('keyDiscussions', e.target.value)}
            placeholder="Summarize the key points discussed during this phase"
            rows={8}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Action Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.actionItems}
            onChange={(e) => handleInputChange('actionItems', e.target.value)}
            placeholder="List specific actions, responsible parties, and deadlines"
            rows={6}
          />
        </CardContent>
      </Card>

      {formData.meetingNotes !== undefined && (
        <Card>
          <CardHeader>
            <CardTitle>Additional Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.meetingNotes}
              onChange={(e) => handleInputChange('meetingNotes', e.target.value)}
              placeholder="Any additional notes or observations"
              rows={3}
            />
          </CardContent>
        </Card>
      )}

      <div className="flex items-center space-x-2">
        <Checkbox
          id="phase-complete"
          checked={formData.completed}
          onCheckedChange={(checked) => handleInputChange('completed', checked)}
        />
        <Label htmlFor="phase-complete">Mark this phase as completed</Label>
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrevious} disabled={isFirst}>
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