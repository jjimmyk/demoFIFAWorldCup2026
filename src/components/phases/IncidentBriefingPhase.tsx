import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { FileText, Calendar, Clock, MapPin, Users, Link, Trash2, Target, Plus } from 'lucide-react';
import { CreateMeetingModal } from '../CreateMeetingModal';

interface Meeting {
  id: string;
  meetingName: string;
  meetingType: string;
  attendees: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  isInPerson: boolean;
  virtualLink: string;
  agenda: string;
  createdAt: Date;
}

interface IncidentBriefingPhaseProps {
  data?: Record<string, any>;
  onDataChange: (data: Record<string, any>) => void;
  onComplete: () => void;
  onPrevious: () => void;
}

export function IncidentBriefingPhase({ data = {}, onDataChange, onComplete, onPrevious }: IncidentBriefingPhaseProps) {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  
  // Get meetings from data or initialize empty array
  const meetings: Meeting[] = data.meetings || [];

  const handleCreateMeeting = (meetingData: any) => {
    console.log('handleCreateMeeting called with:', meetingData);
    console.log('Current meetings array:', meetings);
    
    const newMeeting: Meeting = {
      id: Date.now().toString(), // Simple ID generation
      ...meetingData,
      createdAt: new Date()
    };

    console.log('New meeting created:', newMeeting);

    const updatedMeetings = [...meetings, newMeeting];
    console.log('Updated meetings array:', updatedMeetings);
    
    onDataChange({
      ...data,
      meetings: updatedMeetings
    });
    
    // Close the modal after the data has been updated
    setShowScheduleModal(false);
  };

  const handleDeleteMeeting = (meetingId: string) => {
    const updatedMeetings = meetings.filter(meeting => meeting.id !== meetingId);
    onDataChange({
      ...data,
      meetings: updatedMeetings
    });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const allItemsCompleted = true;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
          <FileText className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h2>Incident Briefing</h2>
          <p className="text-muted-foreground">Brief key personnel on the current incident situation</p>
        </div>
      </div>

      {/* Scheduled Meetings Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Scheduled Meetings ({meetings.length})
              </CardTitle>

            </div>
            <Button 
              onClick={() => setShowScheduleModal(true)}
              className="flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Schedule Meeting
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {meetings.length > 0 ? (
              meetings.map((meeting) => (
                <div key={meeting.id} className="bg-[#222529] content-stretch flex gap-3 items-center justify-start relative rounded-[8px] size-full">
                  {/* Date Section */}
                  <div className="bg-[#01669f] box-border content-stretch flex gap-2.5 h-[89px] items-center justify-center px-[22px] py-[7px] relative rounded-bl-[8px] rounded-tl-[8px] shrink-0 w-20">
                    <div className="content-stretch flex flex-col font-['Open_Sans'] font-bold items-center justify-start leading-[0] relative shrink-0 text-[#ffffff] w-[35px]">
                      <div className="relative shrink-0 text-[20px] text-center w-full">
                        <p className="leading-[30px]">{formatDate(meeting.date).split(' ')[0]}</p>
                      </div>
                      <div className="relative shrink-0 text-[30px] w-full">
                        <p className="leading-[38px]">{formatDate(meeting.date).split(' ')[1]}</p>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="content-stretch flex items-center justify-between relative shrink-0 w-[360px]">
                    <div className="content-stretch flex flex-col gap-3 items-start justify-start leading-[0] relative shrink-0 text-[16px] w-[115px]">
                      <div className="font-['Open_Sans'] font-semibold relative shrink-0 text-[#ffffff] w-[246px]">
                        <p className="leading-[24px]">{meeting.meetingName}</p>
                      </div>
                      <div className="font-['Open_Sans'] font-normal min-w-full relative shrink-0 text-[#afb5bc]">
                        <p className="leading-[24px]">
                          {meeting.startTime && `${formatTime(meeting.startTime)}${meeting.endTime ? ` - ${formatTime(meeting.endTime)}` : ''}`}
                          {meeting.location && ` / ${meeting.location}${meeting.isInPerson ? ' (In-Person)' : ' (Virtual)'}`}
                        </p>
                      </div>
                    </div>

                    {/* More Info Button */}
                    <div className="relative rounded-[4px] shrink-0">
                      <div className="box-border content-stretch flex gap-1 items-center justify-center overflow-clip p-[8px] relative">
                        <div className="box-border content-stretch flex h-4 items-center justify-center px-1 py-0 relative shrink-0">
                          <div className="font-['Open_Sans'] font-semibold leading-[0] relative shrink-0 text-[#ffffff] text-[12px] text-nowrap">
                            <p className="leading-[18px] whitespace-pre">More Info</p>
                          </div>
                        </div>
                      </div>
                      <div aria-hidden="true" className="absolute border border-[#6e757c] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(16,40,34,0.05)]" />
                    </div>

                    {/* Delete Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteMeeting(meeting.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 ml-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="sr-only">Delete meeting</span>
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No incident briefings scheduled</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Deliverables Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Deliverables
          </CardTitle>

        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-card-foreground">Updated situational awareness/tactical understanding</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-card-foreground">Confirmation and or refinement of initial objectives</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-card-foreground">Confirmation and or refinement of initial organization</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-card-foreground">Identification of and request for additional resources</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Meeting Modal */}
      <Dialog open={showScheduleModal} onOpenChange={setShowScheduleModal}>
        <DialogContent className="w-[1704px] max-w-[1704px] p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>Create New Meeting</DialogTitle>
            <DialogDescription>
              Schedule a new meeting for incident coordination and planning.
            </DialogDescription>
          </DialogHeader>
          <CreateMeetingModal 
            onClose={() => setShowScheduleModal(false)} 
            onCreateMeeting={handleCreateMeeting}
          />
        </DialogContent>
      </Dialog>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button 
          onClick={onComplete}
          disabled={!allItemsCompleted}
          className="bg-primary hover:bg-primary/90"
        >
          Complete & Continue
        </Button>
      </div>
    </div>
  );
}