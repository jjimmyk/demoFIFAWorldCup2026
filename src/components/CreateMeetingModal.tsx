import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Calendar, Clock, MapPin, Users, Link, FileText, Paperclip } from 'lucide-react';

interface CreateMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (meetingData: any) => void;
  defaultMeetingName?: string;
  defaultMeetingType?: string;
  defaultAgenda?: string;
}

export function CreateMeetingModal({ 
  isOpen,
  onClose, 
  onSave, 
  defaultMeetingName = 'Initial UC Meeting',
  defaultMeetingType = 'Initial UC Meeting', 
  defaultAgenda = `Roll call, review ground rules and meeting agenda.
Review regulatory authority, jurisdictional priorities, and initial objectives.
Identify membership of Unified Command.
Clarify UC roles and responsibilities.
Agree on incident priorities.
Identify assisting and coordinating agencies.
Negotiate and agree on key decisions.
Agree on sensitive information, intelligence, and operational security issues.
Summarize and document key decisions.
Identify Objectives Meeting time, attendees, and location.`
}: CreateMeetingModalProps) {
  const [formData, setFormData] = useState({
    meetingName: defaultMeetingName,
    meetingType: defaultMeetingType,
    attendees: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    isInPerson: true,
    virtualLink: '',
    agenda: defaultAgenda
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateMeeting = () => {
    console.log('Creating meeting:', formData);
    onSave(formData);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule Meeting</DialogTitle>
          <DialogDescription>
            Create a new meeting for incident coordination
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Meeting Name */}
          <div className="space-y-2">
            <Label htmlFor="meeting-name" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Meeting Name
            </Label>
            <Input
              id="meeting-name"
              value={formData.meetingName}
              onChange={(e) => handleInputChange('meetingName', e.target.value)}
              placeholder="Enter meeting name"
            />
          </div>

          {/* Meeting Type */}
          <div className="space-y-2">
            <Label htmlFor="meeting-type">Meeting Type</Label>
            <Select value={formData.meetingType} onValueChange={(value) => handleInputChange('meetingType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select meeting type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Incident Briefing">Incident Briefing</SelectItem>
                <SelectItem value="Initial UC Meeting">Initial UC Meeting</SelectItem>
                <SelectItem value="Planning Meeting">Planning Meeting</SelectItem>
                <SelectItem value="Operations Briefing">Operations Briefing</SelectItem>
                <SelectItem value="Strategy Meeting">Strategy Meeting</SelectItem>
                <SelectItem value="Tactics Meeting">Tactics Meeting</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Attendees */}
          <div className="space-y-2">
            <Label htmlFor="attendees" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Attendees
            </Label>
            <Input
              id="attendees"
              value={formData.attendees}
              onChange={(e) => handleInputChange('attendees', e.target.value)}
              placeholder="Enter attendee names separated by commas"
            />
          </div>

          {/* Date & Time */}
          <div className="space-y-4">
            <Label className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Date & Time
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm text-muted-foreground">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="start-time" className="text-sm text-muted-foreground">Start Time</Label>
                <Input
                  id="start-time"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => handleInputChange('startTime', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-time" className="text-sm text-muted-foreground">End Time</Label>
                <Input
                  id="end-time"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => handleInputChange('endTime', e.target.value)}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Location */}
          <div className="space-y-4">
            <Label className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location
            </Label>
            
            <div className="flex items-center justify-between">
              <div className="flex-1 mr-4">
                <Input
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Enter meeting location"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.isInPerson}
                  onCheckedChange={(checked) => handleInputChange('isInPerson', checked)}
                />
                <Label className="text-sm">In-Person</Label>
              </div>
            </div>

            {/* Virtual Meeting Link */}
            {!formData.isInPerson && (
              <div className="space-y-2">
                <Label htmlFor="virtual-link" className="flex items-center gap-2">
                  <Link className="h-4 w-4" />
                  Virtual Meeting Link
                </Label>
                <Input
                  id="virtual-link"
                  value={formData.virtualLink}
                  onChange={(e) => handleInputChange('virtualLink', e.target.value)}
                  placeholder="Enter virtual meeting link"
                />
              </div>
            )}
          </div>

          <Separator />

          {/* Agenda */}
          <div className="space-y-2">
            <Label htmlFor="agenda" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Meeting Agenda
            </Label>
            <Textarea
              id="agenda"
              value={formData.agenda}
              onChange={(e) => handleInputChange('agenda', e.target.value)}
              placeholder="Enter meeting agenda and description..."
              className="min-h-[150px] resize-y"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleCreateMeeting}>
            Create Meeting
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}