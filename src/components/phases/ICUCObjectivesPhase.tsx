import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { ArrowRight, ArrowLeft, Target, ClipboardList, ChevronDown, ChevronRight, StickyNote, Calendar, Clock, MapPin, Link, Trash2, FileText, Crosshair, AlertTriangle, Users, Info, Shield, FileCheck, Download, Plus, ListTodo, Lock, UserCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
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

interface ActionItem {
  id: string;
  taskName: string;
  pointOfContact: string;
  pocBriefed: 'Yes' | 'No';
  startDate: string;
  deadline: string;
  status: string;
  createdAt: Date;
}

interface ThreatAlert {
  id: string;
  threatType: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  location: string;
  timeDetected: string;
  status: 'Active' | 'Monitoring' | 'Resolved';
  assignedTo: string;
  createdAt: Date;
}

interface WorkAssignment {
  id: string;
  assignmentName: string;
  assignedTo: string;
  status: 'Assigned' | 'In Progress' | 'Complete';
  priority: 'Low' | 'Medium' | 'High';
  resources: string;
  location: string;
}

interface Tactic {
  id: string;
  tacticName: string;
  description: string;
  workAssignments: WorkAssignment[];
  createdAt: Date;
}

interface ICUCObjectivesPhaseProps {
  data?: Record<string, any>;
  onDataChange?: (data: Record<string, any>) => void;
  onComplete?: () => void;
  onPrevious?: () => void;
  operationalPeriodNumber?: number;
  currentTab?: 'operations' | 'planning';
}

export function ICUCObjectivesPhase({ data = {}, onDataChange, onComplete, onPrevious, operationalPeriodNumber = 0, currentTab = 'planning' }: ICUCObjectivesPhaseProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(data.checkedItems || {});
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(data.expandedItems || {});
  const [notes, setNotes] = useState<Record<string, string>>(data.notes || {});
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showAddActionModal, setShowAddActionModal] = useState(false);
  const [expandedThreats, setExpandedThreats] = useState<Record<string, boolean>>(data.expandedThreats || {});
  const [expandedTactics, setExpandedTactics] = useState<Record<string, boolean>>(data.expandedTactics || {});
  const [threatsExpanded, setThreatsExpanded] = useState(true);
  const [objectivesExpanded, setObjectivesExpanded] = useState(true);
  const [uasRationaleSelected, setUasRationaleSelected] = useState(false);
  const [newAction, setNewAction] = useState<Partial<ActionItem>>({
    taskName: '',
    pointOfContact: '',
    pocBriefed: 'No',
    startDate: '',
    deadline: '',
    status: 'Not Started'
  });
  
  // Objectives state
  const [selectedLifelines, setSelectedLifelines] = useState<Record<string, boolean>>(data.selectedLifelines || {});
  const [incidentPriorities, setIncidentPriorities] = useState<string>(data.incidentPriorities || '');
  const [incidentObjectives, setIncidentObjectives] = useState<string>(data.incidentObjectives || '');
  const [commandEmphasis, setCommandEmphasis] = useState<string>(data.commandEmphasis || '');
  const [siteSafetyPlanRequired, setSiteSafetyPlanRequired] = useState<string>(data.siteSafetyPlanRequired || 'No');
  const [siteSafetyPlanLocation, setSiteSafetyPlanLocation] = useState<string>(data.siteSafetyPlanLocation || '');
  const [criticalInformationRequirements, setCriticalInformationRequirements] = useState<string>(data.criticalInformationRequirements || '');
  const [limitationsConstraints, setLimitationsConstraints] = useState<string>(data.limitationsConstraints || '');
  const [keyDecisionsProcedures, setKeyDecisionsProcedures] = useState<string>(data.keyDecisionsProcedures || '');
  
  // Get meetings and actions from data or initialize empty arrays
  const meetings: Meeting[] = data.meetings || [];
  const actions: ActionItem[] = data.actions || [];
  
  // Sample threat alerts data for World Cup 2026
  const [threats, setThreats] = useState<ThreatAlert[]>(data.threats || [
    {
      id: '1',
      threatType: 'High-Risk Drones Approaching TFR',
      description: 'Multiple unauthorized drones detected entering Temporary Flight Restriction zone - immediate response required',
      severity: 'Critical',
      location: 'Miami NSSE - AOR 1',
      timeDetected: '14:23',
      status: 'Active',
      assignedTo: 'Airspace Security Unit',
      createdAt: new Date()
    }
  ]);

  // Objectives displayed in the Current IAP view (reuse Tactic shape for styling/structure)
  const tactics: Tactic[] = data.tactics || [
    {
      id: 'obj-1',
      tacticName: 'Establish Secure Airspace Corridor',
      description: 'Coordinate airspace controls and deconflict UAS operations approaching the TFR',
      workAssignments: [
        {
          id: 'obj-1-wa-1',
          assignmentName: 'Stand up Airspace Coordination Cell',
          assignedTo: 'Air Operations Branch',
          status: 'In Progress',
          priority: 'High',
          resources: 'Air Ops Lead, 2 Planners, Liaison',
          location: 'ICP Air Ops Desk'
        },
        {
          id: 'obj-1-wa-2',
          assignmentName: 'Issue UAS Advisory & NOTAM Review',
          assignedTo: 'Airspace Security Unit',
          status: 'Assigned',
          priority: 'Medium',
          resources: 'Comms Specialist, Legal Advisor',
          location: 'Joint Communications Center'
        }
      ],
      createdAt: new Date()
    },
    {
      id: 'obj-2',
      tacticName: 'Maintain Crowd Safety and Flow',
      description: 'Ensure safe ingress/egress and rapid response to crowd safety issues',
      workAssignments: [
        {
          id: 'obj-2-wa-1',
          assignmentName: 'Staff Pedestrian Flow Control Points',
          assignedTo: 'Security Team Alpha',
          status: 'In Progress',
          priority: 'High',
          resources: '12 Officers, 2 Supervisors',
          location: 'Gate A / Gate C'
        },
        {
          id: 'obj-2-wa-2',
          assignmentName: 'Medical Quick-Response Teams Ready',
          assignedTo: 'EMS Strike Team',
          status: 'Assigned',
          priority: 'Medium',
          resources: '2 ALS Units, 1 Gator Cart',
          location: 'West Concourse Staging'
        }
      ],
      createdAt: new Date()
    }
  ];

  // Community Lifelines options
  const communityLifelines = [
    'Safety and Security',
    'Transportation', 
    'Hazardous Materials',
    'Health and Medical',
    'Energy',
    'Communications',
    'Food, Hydration, Shelter',
    'Water Systems'
  ];

  const agendaItems = [
    {
      id: 'rollcall-agenda',
      role: 'PSC',
      roleColor: 'bg-blue-600',
      item: 'Roll call; review ground rules and meeting agenda'
    },
    {
      id: 'review-priorities',
      role: 'IC/UC',
      roleColor: 'bg-green-600',
      item: 'Review incident priorities and Command Direction'
    },
    {
      id: 'review-objectives',
      role: 'IC/UC',
      roleColor: 'bg-green-600',
      item: 'Review incident objectives and update as needed'
    },
    {
      id: 'update-decisions',
      role: 'IC/UC',
      roleColor: 'bg-green-600',
      item: 'Review and update key decisions and IMT procedures'
    },
    {
      id: 'identify-constraints',
      role: 'IC/UC',
      roleColor: 'bg-green-600',
      item: 'Identify Limitations and Constraints'
    },
    {
      id: 'develop-cirs',
      role: 'IC/UC',
      roleColor: 'bg-green-600',
      item: 'Develop CIRs and time critical expectations'
    },
    {
      id: 'develop-procedures',
      role: 'IC/UC',
      roleColor: 'bg-green-600',
      item: 'Develop or update key procedures which may include:',
      subItems: [
        'Managing sensitive information',
        'Resource request and ordering process',
        'Cost sharing and cost accounting'
      ]
    },
    {
      id: 'uc-workload',
      role: 'IC/UC',
      roleColor: 'bg-green-600',
      item: 'Agree on division of UC workload'
    },
    {
      id: 'review-decisions-schedule',
      role: 'PSC',
      roleColor: 'bg-blue-600',
      item: 'Review decisions and meeting schedule'
    },
    {
      id: 'closing-comments',
      role: 'IC/UC',
      roleColor: 'bg-green-600',
      item: 'Provide closing comments'
    }
  ];

  const handleItemCheck = (itemId: string, checked: boolean) => {
    const newCheckedItems = { ...checkedItems, [itemId]: checked };
    setCheckedItems(newCheckedItems);
    updateData({ checkedItems: newCheckedItems });
  };

  const handleItemExpand = (itemId: string) => {
    const newExpandedItems = { ...expandedItems, [itemId]: !expandedItems[itemId] };
    setExpandedItems(newExpandedItems);
    updateData({ expandedItems: newExpandedItems });
  };

  const handleNotesChange = (itemId: string, noteText: string) => {
    const newNotes = { ...notes, [itemId]: noteText };
    setNotes(newNotes);
    updateData({ notes: newNotes });
  };

  const updateData = (updates: Record<string, any>) => {
    if (onDataChange) {
      onDataChange({ 
        ...data, 
        checkedItems, 
        expandedItems, 
        notes,
        expandedThreats,
        expandedTactics,
        selectedLifelines,
        incidentPriorities,
        incidentObjectives,
        commandEmphasis,
        siteSafetyPlanRequired,
        siteSafetyPlanLocation,
        criticalInformationRequirements,
        limitationsConstraints,
        keyDecisionsProcedures,
        ...updates 
      });
    }
  };

  const handleLifelineChange = (lifeline: string, checked: boolean) => {
    const newSelectedLifelines = { ...selectedLifelines, [lifeline]: checked };
    setSelectedLifelines(newSelectedLifelines);
    updateData({ selectedLifelines: newSelectedLifelines });
  };

  const handleIncidentPrioritiesChange = (value: string) => {
    setIncidentPriorities(value);
    updateData({ incidentPriorities: value });
  };

  const handleIncidentObjectivesChange = (value: string) => {
    setIncidentObjectives(value);
    updateData({ incidentObjectives: value });
  };

  const handleCommandEmphasisChange = (value: string) => {
    setCommandEmphasis(value);
    updateData({ commandEmphasis: value });
  };

  const handleSiteSafetyPlanRequiredChange = (value: string) => {
    setSiteSafetyPlanRequired(value);
    updateData({ siteSafetyPlanRequired: value });
  };

  const handleSiteSafetyPlanLocationChange = (value: string) => {
    setSiteSafetyPlanLocation(value);
    updateData({ siteSafetyPlanLocation: value });
  };

  const handleCriticalInformationRequirementsChange = (value: string) => {
    setCriticalInformationRequirements(value);
    updateData({ criticalInformationRequirements: value });
  };

  const handleLimitationsConstraintsChange = (value: string) => {
    setLimitationsConstraints(value);
    updateData({ limitationsConstraints: value });
  };

  const handleKeyDecisionsProceduresChange = (value: string) => {
    setKeyDecisionsProcedures(value);
    updateData({ keyDecisionsProcedures: value });
  };

  const handleCreateMeeting = (meetingData: any) => {
    const newMeeting: Meeting = {
      id: Date.now().toString(),
      ...meetingData,
      createdAt: new Date()
    };

    const updatedMeetings = [...meetings, newMeeting];
    updateData({ meetings: updatedMeetings });
  };

  const handleDeleteMeeting = (meetingId: string) => {
    const updatedMeetings = meetings.filter(meeting => meeting.id !== meetingId);
    updateData({ meetings: updatedMeetings });
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

  const handleExportICS202 = () => {
    console.log('Exporting ICS-202 form...');
  };

  const handleExportICS230 = () => {
    console.log('Exporting ICS-230 form...');
  };

  const handleExportICS233 = () => {
    console.log('Exporting ICS-233 form...');
  };

  const handleExportThreatReport = () => {
    console.log('Exporting Threat Assessment Report...');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-500 text-white';
      case 'Response In Progress':
        return 'bg-yellow-500 text-black';
      case 'Neutralized':
        return 'bg-yellow-500 text-black';
      case 'High':
        return 'bg-orange-500 text-white';
      case 'Medium':
        return 'bg-yellow-500 text-black';
      case 'Low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getSeverityPillClasses = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-destructive/10 hover:bg-destructive/20 border border-destructive/30 hover:border-destructive/50';
      case 'Response In Progress':
        return 'bg-destructive/10 hover:bg-destructive/20 border border-destructive/30 hover:border-destructive/50';
      case 'Neutralized':
        return 'bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 hover:border-yellow-500/50';
      case 'High':
        return 'bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 hover:border-orange-500/50';
      case 'Medium':
        return 'bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 hover:border-yellow-500/50';
      case 'Low':
        return 'bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 hover:border-green-500/50';
      default:
        return 'bg-muted/30 hover:bg-muted/40 border border-border/50 hover:border-border';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-destructive text-destructive-foreground';
      case 'Response In Progress':
        return 'bg-yellow-600 text-white';
      case 'Monitoring':
        return 'bg-yellow-600 text-white';
      case 'Resolved':
        return 'bg-green-600 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getWorkAssignmentStatusColor = (status: string) => {
    switch (status) {
      case 'Assigned':
        return 'bg-blue-600 text-white';
      case 'In Progress':
        return 'bg-yellow-600 text-white';
      case 'Complete':
        return 'bg-green-600 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500 text-white';
      case 'Medium':
        return 'bg-yellow-500 text-black';
      case 'Low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  // Listen for threat updates dispatched from outside (e.g., clicking Location in COP)
  useEffect(() => {
    function onThreatUpdate(e: Event) {
      const detail = (e as CustomEvent).detail as { type?: string; severity?: string } | undefined;
      if (!detail) return;
      setThreats(prev => prev.map(t =>
        t.threatType === (detail.type || '')
          ? { ...t, severity: (detail.severity as any) || t.severity }
          : t
      ));
    }
    window.addEventListener('threat-update', onThreatUpdate as EventListener);
    return () => window.removeEventListener('threat-update', onThreatUpdate as EventListener);
  }, []);

  const handleAddAction = () => {
    if (!newAction.taskName || !newAction.pointOfContact) return;
    
    const action: ActionItem = {
      id: Date.now().toString(),
      taskName: newAction.taskName!,
      pointOfContact: newAction.pointOfContact!,
      pocBriefed: newAction.pocBriefed || 'No',
      startDate: newAction.startDate || '',
      deadline: newAction.deadline || '',
      status: newAction.status || 'Not Started',
      createdAt: new Date()
    };

    const updatedActions = [...actions, action];
    updateData({ actions: updatedActions });
    
    setNewAction({
      taskName: '',
      pointOfContact: '',
      pocBriefed: 'No',
      startDate: '',
      deadline: '',
      status: 'Not Started'
    });
    setShowAddActionModal(false);
  };

  const handleUpdateAction = (actionId: string, field: keyof ActionItem, value: any) => {
    const updatedActions = actions.map(action =>
      action.id === actionId ? { ...action, [field]: value } : action
    );
    updateData({ actions: updatedActions });
  };

  const handleDeleteAction = (actionId: string) => {
    const updatedActions = actions.filter(action => action.id !== actionId);
    updateData({ actions: updatedActions });
  };

  const handleThreatToggle = (threatId: string) => {
    const newExpandedThreats = { ...expandedThreats, [threatId]: !expandedThreats[threatId] };
    setExpandedThreats(newExpandedThreats);
    updateData({ expandedThreats: newExpandedThreats });
  };

  const handleTacticToggle = (tacticId: string) => {
    const newExpandedTactics = { ...expandedTactics, [tacticId]: !expandedTactics[tacticId] };
    setExpandedTactics(newExpandedTactics);
    updateData({ expandedTactics: newExpandedTactics });
  };

  const allItemsCompleted = agendaItems.every(item => checkedItems[item.id]);

  // All users can edit all components
  const canEditIncidentObjectives = true;
  const canEditActionTracker = true;
  const canEditScheduledMeetings = true;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        {currentTab !== 'operations' && (
          <div className="flex items-center gap-3">
            {currentTab !== 'planning' && (
              <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                <Target className="w-5 h-5 text-accent" />
              </div>
            )}
            <div>
              {currentTab === 'planning' && (
                <div>
                  <h2 className="text-foreground">Incident Objectives</h2>
                </div>
              )}
            </div>
          </div>
        )}
        
        {currentTab !== 'operations' && (
          <div className="flex items-center gap-2">
            <Button 
              onClick={() => setShowScheduleModal(true)}
              className="flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Schedule Meeting
            </Button>
            <Button
              onClick={handleExportICS230}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Export ICS-230
            </Button>
          </div>
        )}
      </div>



      {/* Conditional Card Rendering based on tab */}
      {currentTab === 'operations' ? (
        <div className="space-y-6">
          {/* Threat Alerts Card for Current IAP - Aligned with COP */}
          <Card className={`sticky top-6 -mt-6 ${threatsExpanded ? '' : 'h-48'}`}>
            <CardHeader className={`cursor-pointer select-none ${threatsExpanded ? '' : 'h-full py-0 flex items-center'}`} onClick={() => setThreatsExpanded(v => !v)}>
              {threatsExpanded ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                    <CardTitle>Threat Alerts</CardTitle>
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </div>
              ) : (
                <div className="relative w-full h-full flex items-center justify-start pl-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                    <CardTitle>Threat Alerts</CardTitle>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground absolute right-4 top-1/2 -translate-y-1/2" />
                </div>
              )}
            </CardHeader>
            {threatsExpanded && (
              <CardContent className="space-y-4">
                {threats.length > 0 ? (
                  <div className="space-y-4">
                    {threats.map((threat) => (
                      <div key={threat.id} className="space-y-3">
                        {/* Threat Alert Pill */}
                        <div 
                          className={`inline-flex items-center gap-3 rounded-full px-4 py-3 cursor-pointer transition-all duration-200 hover:shadow-sm ${getSeverityPillClasses(threat.severity)}`}
                          onClick={() => handleThreatToggle(threat.id)}
                        >
                          <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0" />
                          <span className="font-medium text-foreground text-sm">{threat.threatType}</span>
                          <div className="flex items-center gap-1">
                            <Badge className={`${getSeverityColor(threat.severity)} text-xs px-2 py-0.5`}>
                              {threat.severity}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{threat.timeDetected}</span>
                            {expandedThreats[threat.id] ? (
                              <ChevronDown className="w-4 h-4 text-muted-foreground ml-1" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-muted-foreground ml-1" />
                            )}
                          </div>
                        </div>

                        {/* Expanded Threat Details */}
                        {expandedThreats[threat.id] && (
                          <div className="ml-4 space-y-3 border-l-2 border-destructive/20 pl-4">
                            <div className="mb-3">
                              <p className="text-sm text-white">{threat.description}</p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-white">
                                <span>Location: {threat.location}</span>
                                <span>AOR Lead: {threat.assignedTo}</span>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <h5 className="text-sm font-medium text-foreground">Rationale</h5>
                              <button
                                type="button"
                                onClick={() => {
                                  setUasRationaleSelected(true);
                                  window.dispatchEvent(new Event('zoom-to-uas'));
                                }}
                                className={`w-full text-left p-3 rounded-xl border transition-colors shadow-sm ${
                                  uasRationaleSelected
                                    ? 'bg-blue-600/20 border-blue-600/50'
                                    : 'bg-blue-600/10 hover:bg-blue-600/15 border-blue-600/30'
                                }`}
                              >
                                <div className="flex items-start justify-between">
                                  <p className="text-sm text-foreground">10 UAS detected moving from high-risk vessel toward TFR</p>
                                  <Badge variant="outline" className="ml-2 text-xs">TAK</Badge>
                                </div>
                              </button>
                              <div className="bg-blue-600/10 hover:bg-blue-600/15 p-3 rounded-xl border border-blue-600/30 transition-colors shadow-sm">
                                <div className="flex items-start justify-between">
                                  <p className="text-sm text-foreground">37 social media users report flying objects near beach</p>
                                  <Badge variant="outline" className="ml-2 text-xs">Grist Mill</Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h4 className="text-muted-foreground mb-2">No active threats</h4>
                    <p className="text-sm text-muted-foreground">All clear - no security threats detected</p>
                  </div>
                )}
              </CardContent>
            )}
          </Card>

          {/* Objectives Card for Current IAP */}
          <Card className={`${objectivesExpanded ? '' : 'h-48'}`}>
            <CardHeader className={`cursor-pointer select-none ${objectivesExpanded ? '' : 'h-full py-0 flex items-center'}`} onClick={() => setObjectivesExpanded(v => !v)}>
              {objectivesExpanded ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-accent" />
                    <CardTitle>Objectives</CardTitle>
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </div>
              ) : (
                <div className="relative w-full h-full flex items-center justify-start pl-4">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-accent" />
                    <CardTitle>Objectives</CardTitle>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground absolute right-4 top-1/2 -translate-y-1/2" />
                </div>
              )}
            </CardHeader>
            {objectivesExpanded && (
              <CardContent className="space-y-4">
                {tactics.length > 0 ? (
                  <div className="space-y-4">
                    {tactics.map((tactic) => (
                      <div key={tactic.id} className="space-y-3">
                        {/* Tactic Pill */}
                        <div 
                          className="inline-flex items-center gap-3 bg-accent/10 hover:bg-accent/20 border border-accent/30 rounded-full px-4 py-3 cursor-pointer transition-all duration-200 hover:shadow-sm hover:border-accent/50"
                          onClick={() => handleTacticToggle(tactic.id)}
                        >
                          <UserCheck className="w-4 h-4 text-accent flex-shrink-0" />
                          <span className="font-medium text-foreground text-sm">{tactic.tacticName}</span>
                          <div className="flex items-center gap-1">
                            <Badge variant="outline" className="text-xs px-2 py-0.5">
                              {tactic.workAssignments.length} assignments
                            </Badge>
                            {expandedTactics[tactic.id] ? (
                              <ChevronDown className="w-4 h-4 text-muted-foreground ml-1" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-muted-foreground ml-1" />
                            )}
                          </div>
                        </div>

                        {/* Expanded Work Assignments */}
                        {expandedTactics[tactic.id] && (
                          <div className="ml-4 space-y-3 border-l-2 border-accent/20 pl-4">
                            <div className="mb-3">
                              <p className="text-sm text-muted-foreground">{tactic.description}</p>
                            </div>
                            
                            <div className="space-y-3">
                              <h5 className="text-sm font-medium text-foreground">Work Assignments</h5>
                              {tactic.workAssignments.map((assignment) => (
                                <div key={assignment.id} className="bg-blue-600/10 hover:bg-blue-600/15 p-3 rounded-xl border border-blue-600/30 transition-colors shadow-sm">
                                  <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <h6 className="font-medium text-sm text-foreground">{assignment.assignmentName}</h6>
                                        <Badge className="bg-blue-600 text-white" size="sm">
                                          {assignment.priority}
                                        </Badge>
                                      </div>
                                      <p className="text-xs text-muted-foreground mb-2">{assignment.assignedTo}</p>
                                    </div>
                                    <Badge className="bg-blue-700 text-white" size="sm">
                                      {assignment.status}
                                    </Badge>
                                  </div>

                                  <div className="grid grid-cols-2 gap-3 text-xs">
                                    <div>
                                      <span className="text-muted-foreground">Resources: </span>
                                      <span className="text-foreground">{assignment.resources}</span>
                                    </div>
                                    <div>
                                      <span className="text-muted-foreground">Location: </span>
                                      <span className="text-foreground">{assignment.location}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <ListTodo className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h4 className="text-muted-foreground mb-2">No tactics assigned</h4>
                    <p className="text-sm text-muted-foreground">No tactical assignments currently active</p>
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        </div>
      ) : (
        <>
        {/* Incident Objectives Card for Future IAP */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-accent" />
                <CardTitle>Incident Objectives</CardTitle>
                <Button
                  onClick={handleExportICS202}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 ml-4"
                >
                  <FileText className="w-4 h-4" />
                  Export ICS-202
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Community Lifelines (match Strategy Meeting) */}
            <div className="space-y-3">
              <Label className="font-medium text-card-foreground">Affected Community Lifelines</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {communityLifelines.map((lifeline) => (
                  <div key={lifeline} className="flex items-center space-x-2">
                    <Checkbox
                      id={`lifeline-${lifeline}`}
                      checked={selectedLifelines[lifeline] || false}
                      onCheckedChange={(checked) => handleLifelineChange(lifeline, checked as boolean)}
                    />
                    <Label 
                      htmlFor={`lifeline-${lifeline}`} 
                      className="text-sm text-card-foreground cursor-pointer"
                    >
                      {lifeline}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Incident Priorities */}
            <div className="space-y-3">
              <Label htmlFor="incident-priorities" className="font-medium text-card-foreground">
                Incident Priorities
              </Label>
              <Textarea
                id="incident-priorities"
                placeholder="Define the key priorities for this incident..."
                value={incidentPriorities}
                onChange={(e) => handleIncidentPrioritiesChange(e.target.value)}
                className="min-h-20"
              />
            </div>

            {/* Incident Objectives */}
            <div className="space-y-3">
              <Label htmlFor="incident-objectives" className="font-medium text-card-foreground">
                Incident Objectives
              </Label>
              <Textarea
                id="incident-objectives"
                placeholder="List the specific objectives for this operational period..."
                value={incidentObjectives}
                onChange={(e) => handleIncidentObjectivesChange(e.target.value)}
                className="min-h-24"
              />
            </div>

            {/* Command Emphasis */}
            <div className="space-y-3">
              <Label htmlFor="command-emphasis" className="font-medium text-card-foreground">
                Command Emphasis
              </Label>
              <Textarea
                id="command-emphasis"
                placeholder="Specify any particular emphasis or focus areas from command..."
                value={commandEmphasis}
                onChange={(e) => handleCommandEmphasisChange(e.target.value)}
                className="min-h-20"
              />
            </div>

            {/* Site Safety Plan */}
            <div className="space-y-3">
              <Label className="font-medium text-card-foreground">Site Safety Plan</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-card-foreground">Is a Site Safety Plan Required?</span>
                  <Select value={siteSafetyPlanRequired} onValueChange={handleSiteSafetyPlanRequiredChange}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {siteSafetyPlanRequired === 'Yes' && (
                  <div className="space-y-2">
                    <Label htmlFor="safety-plan-location" className="text-sm text-card-foreground">
                      Site Safety Plan Location/Details
                    </Label>
                    <Input
                      id="safety-plan-location"
                      placeholder="Specify location or details of the site safety plan..."
                      value={siteSafetyPlanLocation}
                      onChange={(e) => handleSiteSafetyPlanLocationChange(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Open Actions Tracker - separate card below Incident Objectives */}
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Open Actions Tracker</CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleExportICS233}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Export ICS-233
                </Button>
                <Button size="sm" onClick={() => setShowAddActionModal(true)} className="flex items-center gap-2">
                  <Plus className="w-4 h-4" /> New Action
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {actions.length > 0 ? (
              <div className="space-y-3">
                {actions.map((action) => (
                  <div key={action.id} className="bg-muted/30 p-3 rounded-lg border border-border/50">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-medium text-sm text-foreground">{action.taskName}</div>
                        <div className="text-xs text-muted-foreground">POC: {action.pointOfContact}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{action.status}</Badge>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteAction(action.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-muted-foreground">Start: </span>
                        <span className="text-foreground">{formatDate(action.startDate)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Deadline: </span>
                        <span className="text-foreground">{formatDate(action.deadline)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Assigned To: </span>
                        <span className="text-foreground">{action.pointOfContact}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Created: </span>
                        <span className="text-foreground">{action.createdAt.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">No open actions yet.</div>
            )}
          </CardContent>
        </Card>
        </>
      )}



      {/* Navigation Controls */}
      {currentTab !== 'operations' && (
        <div className="flex items-center justify-between pt-6 border-t border-border">
          <div>
            {onPrevious && (
              <Button
                onClick={onPrevious}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous Phase
              </Button>
            )}
          </div>
          
          <div>
            {onComplete && (
              <Button
                onClick={onComplete}
                disabled={!allItemsCompleted}
                className="flex items-center gap-2"
              >
                Complete Phase
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Create Meeting Modal */}
      <CreateMeetingModal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        onSubmit={handleCreateMeeting}
        phaseTitle="IC/UC Objectives Meeting"
        operationalPeriod={operationalPeriodNumber}
      />

      {/* Add Action Modal */}
      <Dialog open={showAddActionModal} onOpenChange={setShowAddActionModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Action</DialogTitle>
            <DialogDescription>
              Create a new action item to track tasks and assignments
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-task-name">Task Name *</Label>
                <Input
                  id="new-task-name"
                  value={newAction.taskName || ''}
                  onChange={(e) => setNewAction(prev => ({ ...prev, taskName: e.target.value }))}
                  placeholder="Enter task name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-point-of-contact">Point of Contact *</Label>
                <Input
                  id="new-point-of-contact"
                  value={newAction.pointOfContact || ''}
                  onChange={(e) => setNewAction(prev => ({ ...prev, pointOfContact: e.target.value }))}
                  placeholder="Enter point of contact"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-poc-briefed">POC Briefed</Label>
                <Select
                  value={newAction.pocBriefed}
                  onValueChange={(value) => setNewAction(prev => ({ ...prev, pocBriefed: value as 'Yes' | 'No' }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-start-date">Start Date</Label>
                <Input
                  id="new-start-date"
                  type="date"
                  value={newAction.startDate || ''}
                  onChange={(e) => setNewAction(prev => ({ ...prev, startDate: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-deadline">Deadline</Label>
                <Input
                  id="new-deadline"
                  type="date"
                  value={newAction.deadline || ''}
                  onChange={(e) => setNewAction(prev => ({ ...prev, deadline: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-status">Status</Label>
              <Select
                value={newAction.status}
                onValueChange={(value) => setNewAction(prev => ({ ...prev, status: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Not Started">Not Started</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setShowAddActionModal(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddAction}
              disabled={!newAction.taskName || !newAction.pointOfContact}
            >
              Add Action
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}