import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { ArrowRight, ArrowLeft, Users, ClipboardList, ChevronDown, ChevronRight, StickyNote, Video, Calendar, Clock, MapPin, Link, Trash2, Download, FileText, Plus, ListTodo, Crosshair, AlertTriangle, Info, Shield, FileCheck, Target, Layers, Zap, Edit2 } from 'lucide-react';
import { useState } from 'react';
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

interface WorkTactic {
  id: string;
  name: string;
  description: string;
  assignedTo: string;
  priority: 'High' | 'Medium' | 'Low';
}

interface WorkStrategy {
  id: string;
  name: string;
  description: string;
  tactics: WorkTactic[];
  expanded: boolean;
}

interface WorkObjective {
  id: string;
  name: string;
  description: string;
  strategies: WorkStrategy[];
  expanded: boolean;
}

interface Resource {
  id: string;
  name: string;
  quantityRequired: number;
  quantityHad: number;
  quantityNeeded: number;
}

interface WorkAssignment {
  id: string;
  name: string;
  divisionGroupLocation: string;
  resources: Resource[];
  overheadPositions: string;
  specialEquipmentSupplies: string;
  reportingLocation: string;
  requestedArrivalTime: string;
}

interface Hazard {
  id: string;
  name: string;
  incidentArea: string;
  mitigations: string;
  garScore: number;
}

interface InitialUCMeetingPhaseProps {
  data?: Record<string, any>;
  onDataChange?: (data: Record<string, any>) => void;
  onComplete?: () => void;
  onPrevious?: () => void;
  operationalPeriodNumber?: number;
  currentPhaseId?: string;
  currentTab?: 'operations' | 'planning';
}

export function InitialUCMeetingPhase({ data = {}, onDataChange, onComplete, onPrevious, operationalPeriodNumber = 0, currentPhaseId = 'ic-uc-objectives-meeting', currentTab = 'planning' }: InitialUCMeetingPhaseProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(data.checkedItems || {});
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(data.expandedItems || {});
  const [notes, setNotes] = useState<Record<string, string>>(data.notes || {});
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showAddActionModal, setShowAddActionModal] = useState(false);
  const [newAction, setNewAction] = useState<Partial<ActionItem>>({
    taskName: '',
    pointOfContact: '',
    pocBriefed: 'No',
    startDate: '',
    deadline: '',
    status: 'Not Started'
  });
  
  // Incident Objectives state (for Strategy Meeting)
  const [selectedLifelines, setSelectedLifelines] = useState<Record<string, boolean>>(data.selectedLifelines || {});
  const [incidentPriorities, setIncidentPriorities] = useState<string>(data.incidentPriorities || '');
  const [incidentObjectives, setIncidentObjectives] = useState<string>(data.incidentObjectives || '');
  const [commandEmphasis, setCommandEmphasis] = useState<string>(data.commandEmphasis || '');
  const [siteSafetyPlanRequired, setSiteSafetyPlanRequired] = useState<string>(data.siteSafetyPlanRequired || 'No');
  const [siteSafetyPlanLocation, setSiteSafetyPlanLocation] = useState<string>(data.siteSafetyPlanLocation || '');
  const [criticalInformationRequirements, setCriticalInformationRequirements] = useState<string>(data.criticalInformationRequirements || '');
  const [limitationsConstraints, setLimitationsConstraints] = useState<string>(data.limitationsConstraints || '');
  const [keyDecisionsProcedures, setKeyDecisionsProcedures] = useState<string>(data.keyDecisionsProcedures || '');
  const [resourceRequests, setResourceRequests] = useState<Array<{ id: string; item: string; quantity: string; notes: string }>>(data.resourceRequests || []);
  const [showAddResource, setShowAddResource] = useState(false);
  const [newResourceRequest, setNewResourceRequest] = useState<{ item: string; quantity: string; notes: string }>({ item: '', quantity: '', notes: '' });
  
  // Get meetings and actions from data or initialize empty arrays
  const meetings: Meeting[] = data.meetings || [];
  const actions: ActionItem[] = data.actions || [];

  // Work Analysis Matrix state (for Prepare Tactics Meeting, Tactics Meeting, and Prepare Planning Meeting)
  const [workObjectives, setWorkObjectives] = useState<WorkObjective[]>(data.workObjectives || []);
  const [showAddObjectiveModal, setShowAddObjectiveModal] = useState(false);
  const [showAddStrategyModal, setShowAddStrategyModal] = useState(false);
  const [showAddTacticModal, setShowAddTacticModal] = useState(false);
  const [selectedObjectiveId, setSelectedObjectiveId] = useState<string>('');
  const [selectedStrategyId, setSelectedStrategyId] = useState<string>('');
  const [newObjective, setNewObjective] = useState({ name: '', description: '' });
  const [newStrategy, setNewStrategy] = useState({ name: '', description: '' });
  const [newTactic, setNewTactic] = useState({ name: '', description: '', assignedTo: '', priority: 'Medium' as const });

  // Operational Planning state (for Prepare Tactics Meeting, Tactics Meeting, and Prepare Planning Meeting)
  const [workAssignments, setWorkAssignments] = useState<WorkAssignment[]>(data.workAssignments || []);
  const [showAddWorkAssignmentModal, setShowAddWorkAssignmentModal] = useState(false);
  const [newWorkAssignment, setNewWorkAssignment] = useState({
    name: '',
    divisionGroupLocation: '',
    resources: [] as Resource[],
    overheadPositions: '',
    specialEquipmentSupplies: '',
    reportingLocation: '',
    requestedArrivalTime: ''
  });
  const [newResource, setNewResource] = useState({
    name: '',
    quantityRequired: 0,
    quantityHad: 0,
    quantityNeeded: 0
  });

  // IAP Safety Analysis state (for Prepare Tactics Meeting)
  const [hazards, setHazards] = useState<Hazard[]>(data.hazards || []);
  const [showAddHazardModal, setShowAddHazardModal] = useState(false);
  const [newHazard, setNewHazard] = useState({
    name: '',
    incidentArea: '',
    mitigations: '',
    garScore: 1
  });

  // Community Lifelines for Strategy Meeting
  const communityLifelines = [
    'Safety & Security',
    'Food, Water, Sheltering',
    'Health & Medical',
    'Energy',
    'Communications',
    'Transportation',
    'Hazardous Materials'
  ];

  const agendaItems = [
    {
      id: 'rollcall',
      role: 'PSC',
      roleColor: 'bg-blue-600',
      item: 'Roll call, review ground rules and meeting agenda'
    },
    {
      id: 'regulatory-authority',
      role: 'IC/UC',
      roleColor: 'bg-green-600',
      item: 'Review regulatory authority, jurisdictional priorities, and initial objectives'
    },
    {
      id: 'uc-membership',
      role: 'IC/UC',
      roleColor: 'bg-green-600',
      item: 'Identify membership of Unified Command'
    },
    {
      id: 'uc-roles',
      role: 'IC/UC',
      roleColor: 'bg-green-600',
      item: 'Clarify UC roles and responsibilities'
    },
    {
      id: 'incident-priorities',
      role: 'IC/UC',
      roleColor: 'bg-green-600',
      item: 'Agree on incident priorities'
    },
    {
      id: 'assisting-agencies',
      role: 'IC/UC',
      roleColor: 'bg-green-600',
      item: 'Identify assisting and coordinating agencies'
    },
    {
      id: 'key-decisions',
      role: 'IC/UC',
      roleColor: 'bg-green-600',
      item: 'Negotiate and agree on key decisions',
      subItems: [
        'UC jurisdictional boundaries and focus AOR',
        'Name of incident',
        'Overall response organization, including integration of assisting and cooperating agencies',
        'Operational period length/start time and work shift hours',
        'Location of ICP and other critical facilities, as appropriate',
        'Command and General Staff composition, including deputies (especially OSC, PSC, and Public Information Officer (PIO))',
        'Resource ordering process',
        'Covers public affairs and public information issues'
      ]
    },
    {
      id: 'sensitive-info',
      role: 'PSC',
      roleColor: 'bg-blue-600',
      item: 'Agree on sensitive information, intelligence, and operational security issues'
    },
    {
      id: 'document-decisions',
      role: 'PSC',
      roleColor: 'bg-blue-600',
      item: 'Summarize and document key decisions'
    },
    {
      id: 'objectives-meeting',
      role: 'PSC',
      roleColor: 'bg-blue-600',
      item: 'Identify Objectives Meeting time, attendees, and location'
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
        selectedLifelines,
        incidentPriorities,
        incidentObjectives,
        commandEmphasis,
        siteSafetyPlanRequired,
        siteSafetyPlanLocation,
        criticalInformationRequirements,
        limitationsConstraints,
        keyDecisionsProcedures,
        workObjectives,
        workAssignments,
        hazards,
        resourceRequests,
        ...updates 
      });
    }
  };

  const handleCreateMeeting = (meetingData: any) => {
    const newMeeting: Meeting = {
      id: Date.now().toString(), // Simple ID generation
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

  const handleExportICS201 = () => {
    // TODO: Implement ICS-201 export functionality
    console.log('Exporting ICS-201 form...');
    // This would typically generate and download the ICS-201 form
  };

  const handleExportICS202 = () => {
    // TODO: Implement ICS-202 export functionality
    console.log('Exporting ICS-202 form...');
    // This would typically generate and download the ICS-202 form
  };

  const handleExportICS233 = () => {
    console.log('Exporting ICS-233 form...');
  };

  const handleExportICS234 = () => {
    // TODO: Implement ICS-234 export functionality
    console.log('Exporting ICS-234 form...');
    // This would typically generate and download the ICS-234 form
  };

  const handleExportICS215 = () => {
    // TODO: Implement ICS-215 export functionality
    console.log('Exporting ICS-215 form...');
    // This would typically generate and download the ICS-215 form
  };

  const handleExportICS215A = () => {
    // TODO: Implement ICS-215A export functionality
    console.log('Exporting ICS-215A form...');
    // This would typically generate and download the ICS-215A form
  };

  const handleExportICS213RR = () => {
    // TODO: Implement ICS-213RR export functionality
    console.log('Exporting ICS-213RR form...');
    // This would typically generate and download the ICS-213RR form
  };

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
    
    // Reset form
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

  // Incident Objectives handlers (for Strategy Meeting)
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

  // Work Analysis Matrix handlers (for Prepare Tactics Meeting, Tactics Meeting, and Prepare Planning Meeting)
  const handleAddObjective = () => {
    if (!newObjective.name) return;
    
    const objective: WorkObjective = {
      id: Date.now().toString(),
      name: newObjective.name,
      description: newObjective.description,
      strategies: [],
      expanded: true
    };

    const updatedObjectives = [...workObjectives, objective];
    setWorkObjectives(updatedObjectives);
    updateData({ workObjectives: updatedObjectives });
    
    setNewObjective({ name: '', description: '' });
    setShowAddObjectiveModal(false);
  };

  const handleDeleteObjective = (objectiveId: string) => {
    const updatedObjectives = workObjectives.filter(obj => obj.id !== objectiveId);
    setWorkObjectives(updatedObjectives);
    updateData({ workObjectives: updatedObjectives });
  };

  const handleToggleObjective = (objectiveId: string) => {
    const updatedObjectives = workObjectives.map(obj =>
      obj.id === objectiveId ? { ...obj, expanded: !obj.expanded } : obj
    );
    setWorkObjectives(updatedObjectives);
    updateData({ workObjectives: updatedObjectives });
  };

  const handleAddStrategy = () => {
    if (!newStrategy.name || !selectedObjectiveId) return;
    
    const strategy: WorkStrategy = {
      id: Date.now().toString(),
      name: newStrategy.name,
      description: newStrategy.description,
      tactics: [],
      expanded: true
    };

    const updatedObjectives = workObjectives.map(obj =>
      obj.id === selectedObjectiveId
        ? { ...obj, strategies: [...obj.strategies, strategy] }
        : obj
    );
    
    setWorkObjectives(updatedObjectives);
    updateData({ workObjectives: updatedObjectives });
    
    setNewStrategy({ name: '', description: '' });
    setSelectedObjectiveId('');
    setShowAddStrategyModal(false);
  };

  const handleDeleteStrategy = (objectiveId: string, strategyId: string) => {
    const updatedObjectives = workObjectives.map(obj =>
      obj.id === objectiveId
        ? { ...obj, strategies: obj.strategies.filter(strategy => strategy.id !== strategyId) }
        : obj
    );
    setWorkObjectives(updatedObjectives);
    updateData({ workObjectives: updatedObjectives });
  };

  const handleToggleStrategy = (objectiveId: string, strategyId: string) => {
    const updatedObjectives = workObjectives.map(obj =>
      obj.id === objectiveId
        ? {
            ...obj,
            strategies: obj.strategies.map(strategy =>
              strategy.id === strategyId ? { ...strategy, expanded: !strategy.expanded } : strategy
            )
          }
        : obj
    );
    setWorkObjectives(updatedObjectives);
    updateData({ workObjectives: updatedObjectives });
  };

  const handleAddTactic = () => {
    if (!newTactic.name || !selectedObjectiveId || !selectedStrategyId) return;
    
    const tactic: WorkTactic = {
      id: Date.now().toString(),
      name: newTactic.name,
      description: newTactic.description,
      assignedTo: newTactic.assignedTo,
      priority: newTactic.priority
    };

    const updatedObjectives = workObjectives.map(obj =>
      obj.id === selectedObjectiveId
        ? {
            ...obj,
            strategies: obj.strategies.map(strategy =>
              strategy.id === selectedStrategyId
                ? { ...strategy, tactics: [...strategy.tactics, tactic] }
                : strategy
            )
          }
        : obj
    );
    
    setWorkObjectives(updatedObjectives);
    updateData({ workObjectives: updatedObjectives });
    
    setNewTactic({ name: '', description: '', assignedTo: '', priority: 'Medium' });
    setSelectedObjectiveId('');
    setSelectedStrategyId('');
    setShowAddTacticModal(false);
  };

  const handleDeleteTactic = (objectiveId: string, strategyId: string, tacticId: string) => {
    const updatedObjectives = workObjectives.map(obj =>
      obj.id === objectiveId
        ? {
            ...obj,
            strategies: obj.strategies.map(strategy =>
              strategy.id === strategyId
                ? { ...strategy, tactics: strategy.tactics.filter(tactic => tactic.id !== tacticId) }
                : strategy
            )
          }
        : obj
    );
    setWorkObjectives(updatedObjectives);
    updateData({ workObjectives: updatedObjectives });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-destructive';
      case 'Medium': return 'text-yellow-500';
      case 'Low': return 'text-green-500';
      default: return 'text-muted-foreground';
    }
  };

  // Operational Planning handlers (for Prepare Tactics Meeting, Tactics Meeting, and Prepare Planning Meeting)
  const handleAddWorkAssignment = () => {
    if (!newWorkAssignment.name) return;
    
    const workAssignment: WorkAssignment = {
      id: Date.now().toString(),
      name: newWorkAssignment.name,
      divisionGroupLocation: newWorkAssignment.divisionGroupLocation,
      resources: newWorkAssignment.resources,
      overheadPositions: newWorkAssignment.overheadPositions,
      specialEquipmentSupplies: newWorkAssignment.specialEquipmentSupplies,
      reportingLocation: newWorkAssignment.reportingLocation,
      requestedArrivalTime: newWorkAssignment.requestedArrivalTime
    };

    const updatedWorkAssignments = [...workAssignments, workAssignment];
    setWorkAssignments(updatedWorkAssignments);
    updateData({ workAssignments: updatedWorkAssignments });
    
    setNewWorkAssignment({
      name: '',
      divisionGroupLocation: '',
      resources: [],
      overheadPositions: '',
      specialEquipmentSupplies: '',
      reportingLocation: '',
      requestedArrivalTime: ''
    });
    setShowAddWorkAssignmentModal(false);
  };

  const handleUpdateWorkAssignment = (assignmentId: string, field: keyof WorkAssignment, value: any) => {
    const updatedWorkAssignments = workAssignments.map(assignment =>
      assignment.id === assignmentId ? { ...assignment, [field]: value } : assignment
    );
    setWorkAssignments(updatedWorkAssignments);
    updateData({ workAssignments: updatedWorkAssignments });
  };

  const handleDeleteWorkAssignment = (assignmentId: string) => {
    const updatedWorkAssignments = workAssignments.filter(assignment => assignment.id !== assignmentId);
    setWorkAssignments(updatedWorkAssignments);
    updateData({ workAssignments: updatedWorkAssignments });
  };

  // Resource management handlers
  const handleAddResourceToAssignment = (assignmentId: string, resource: Resource) => {
    const updatedWorkAssignments = workAssignments.map(assignment =>
      assignment.id === assignmentId
        ? { ...assignment, resources: [...assignment.resources, resource] }
        : assignment
    );
    setWorkAssignments(updatedWorkAssignments);
    updateData({ workAssignments: updatedWorkAssignments });
  };

  const handleUpdateResource = (assignmentId: string, resourceId: string, field: keyof Resource, value: any) => {
    const updatedWorkAssignments = workAssignments.map(assignment =>
      assignment.id === assignmentId
        ? {
            ...assignment,
            resources: assignment.resources.map(resource =>
              resource.id === resourceId ? { ...resource, [field]: value } : resource
            )
          }
        : assignment
    );
    setWorkAssignments(updatedWorkAssignments);
    updateData({ workAssignments: updatedWorkAssignments });
  };

  const handleDeleteResource = (assignmentId: string, resourceId: string) => {
    const updatedWorkAssignments = workAssignments.map(assignment =>
      assignment.id === assignmentId
        ? { ...assignment, resources: assignment.resources.filter(resource => resource.id !== resourceId) }
        : assignment
    );
    setWorkAssignments(updatedWorkAssignments);
    updateData({ workAssignments: updatedWorkAssignments });
  };

  const handleAddResourceToModal = () => {
    if (!newResource.name) return;
    
    const resource: Resource = {
      id: Date.now().toString(),
      name: newResource.name,
      quantityRequired: newResource.quantityRequired,
      quantityHad: newResource.quantityHad,
      quantityNeeded: newResource.quantityNeeded
    };

    setNewWorkAssignment(prev => ({
      ...prev,
      resources: [...prev.resources, resource]
    }));
    
    setNewResource({
      name: '',
      quantityRequired: 0,
      quantityHad: 0,
      quantityNeeded: 0
    });
  };

  const handleRemoveResourceFromModal = (resourceId: string) => {
    setNewWorkAssignment(prev => ({
      ...prev,
      resources: prev.resources.filter(resource => resource.id !== resourceId)
    }));
  };

  // IAP Safety Analysis handlers (for Prepare Tactics Meeting)
  const handleAddHazard = () => {
    if (!newHazard.name) return;
    
    const hazard: Hazard = {
      id: Date.now().toString(),
      name: newHazard.name,
      incidentArea: newHazard.incidentArea,
      mitigations: newHazard.mitigations,
      garScore: newHazard.garScore
    };

    const updatedHazards = [...hazards, hazard];
    setHazards(updatedHazards);
    updateData({ hazards: updatedHazards });
    
    setNewHazard({
      name: '',
      incidentArea: '',
      mitigations: '',
      garScore: 1
    });
    setShowAddHazardModal(false);
  };

  const handleUpdateHazard = (hazardId: string, field: keyof Hazard, value: any) => {
    const updatedHazards = hazards.map(hazard =>
      hazard.id === hazardId ? { ...hazard, [field]: value } : hazard
    );
    setHazards(updatedHazards);
    updateData({ hazards: updatedHazards });
  };

  const handleDeleteHazard = (hazardId: string) => {
    const updatedHazards = hazards.filter(hazard => hazard.id !== hazardId);
    setHazards(updatedHazards);
    updateData({ hazards: updatedHazards });
  };

  const getGarScoreColor = (score: number) => {
    if (score >= 1 && score <= 3) return 'text-green-500';
    if (score >= 4 && score <= 6) return 'text-yellow-500';
    if (score >= 7 && score <= 10) return 'text-destructive';
    return 'text-muted-foreground';
  };

  // Remove completion requirement - allow users to proceed without completing all items
  const allItemsCompleted = true;

  // Get phase-specific header content
  const getPhaseHeader = () => {
    switch (currentPhaseId) {
      case 'ic-uc-objectives-meeting':
        return {
          icon: <Users className="w-5 h-5 text-accent" />,
          title: 'IC/UC Objectives Meeting',
          description: 'Incident Commander and Unified Command objectives meeting'
        };
      case 'strategy-meeting':
        return {
          icon: <Target className="w-5 h-5 text-accent" />,
          title: 'Strategy Meeting',
          description: 'Develop strategic approach for incident response'
        };
      case 'prepare-tactics-meeting':
        return {
          icon: <Layers className="w-5 h-5 text-accent" />,
          title: 'Prepare for Tactics Meeting',
          description: 'Preparation activities for the tactics meeting'
        };
      case 'tactics-meeting':
        return {
          icon: <Crosshair className="w-5 h-5 text-accent" />,
          title: 'Tactics Meeting',
          description: 'Tactical planning and resource assignment meeting'
        };
      case 'prepare-planning-meeting':
        return {
          icon: <ClipboardList className="w-5 h-5 text-accent" />,
          title: 'Prepare for Planning Meeting',
          description: 'Preparation activities for the planning meeting'
        };
      case 'planning-meeting':
        return {
          icon: <Users className="w-5 h-5 text-accent" />,
          title: 'Planning Meeting',
          description: 'Planning and coordination meeting'
        };
      case 'iap-prep-approval':
        return {
          icon: <FileCheck className="w-5 h-5 text-accent" />,
          title: 'IAP Prep & Approval',
          description: 'Incident Action Plan preparation and approval'
        };
      case 'operations-briefing':
        return {
          icon: <Info className="w-5 h-5 text-accent" />,
          title: 'Operations Briefing',
          description: 'Operations briefing and assignment communication'
        };
      default:
        return {
          icon: <Users className="w-5 h-5 text-accent" />,
          title: 'Meeting Phase',
          description: 'Meeting phase description'
        };
    }
  };

  const handleExportICS230 = () => {
    console.log('Exporting ICS-230 form...');
  };

  const handleExportICS208 = () => {
    console.log('Exporting ICS-208 Safety Message...');
  };

  const handleExportICS203 = () => {
    console.log('Exporting ICS-203 Organization Assignment List...');
  };

  const handleExportICS207 = () => {
    console.log('Exporting ICS-207 Organization Chart...');
  };

  // Safety Messages (for IAP Prep & Approval)
  const [safetyMessages, setSafetyMessages] = useState<Array<{
    id: string;
    message: string;
    physicalHazards: string;
    environmentalHazards: string;
    otherHazards: string;
    sop: string;
    requiredPpe: string;
    comments: string;
  }>>(data.safetyMessages || []);
  const [showAddSafety, setShowAddSafety] = useState(false);
  const [newSafety, setNewSafety] = useState({
    message: '',
    physicalHazards: '',
    environmentalHazards: '',
    otherHazards: '',
    sop: '',
    requiredPpe: '',
    comments: '',
  });

  // Organization Assignment List (for IAP Prep & Approval)
  const [orgAssignments, setOrgAssignments] = useState<Array<{
    id: string;
    position: string;
    name: string;
    contact: string;
    notes: string;
  }>>(data.orgAssignments || []);
  const [showAddOrg, setShowAddOrg] = useState(false);
  const [newOrgAssignment, setNewOrgAssignment] = useState({ position: '', name: '', contact: '', notes: '' });

  // Organization Chart editing (for IAP Prep & Approval)
  const [orgChartNodes, setOrgChartNodes] = useState<Array<{
    id: string;
    position: string;
    name: string;
    reportsTo: string; // supervisor position or name
  }>>(data.orgChartNodes || []);
  const [showAddOrgNode, setShowAddOrgNode] = useState(false);
  const [newOrgNode, setNewOrgNode] = useState({ position: '', name: '', reportsTo: '' });
  const [editingOrgId, setEditingOrgId] = useState<string | null>(null);
  const [editOrgNode, setEditOrgNode] = useState({ position: '', name: '', reportsTo: '' });

  // ICS-204 Assignment List (for IAP Prep & Approval)
  const [assignments, setAssignments] = useState<Array<{
    id: string;
    assignment: string;
    resources: string;
    specialInstructions: string;
    contact: string;
  }>>(data.assignments || []);
  const [showAddAssignment, setShowAddAssignment] = useState(false);
  const [newAssignment, setNewAssignment] = useState({ assignment: '', resources: '', specialInstructions: '', contact: '' });

  const handleAddAssignment = () => {
    if (!newAssignment.assignment) return;
    const item = {
      id: Date.now().toString(),
      assignment: newAssignment.assignment,
      resources: newAssignment.resources,
      specialInstructions: newAssignment.specialInstructions,
      contact: newAssignment.contact,
    };
    const updated = [...assignments, item];
    setAssignments(updated);
    updateData({ assignments: updated });
    setNewAssignment({ assignment: '', resources: '', specialInstructions: '', contact: '' });
    setShowAddAssignment(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-foreground">{getPhaseHeader().title}</h2>
          {!(currentTab === 'planning' && (
            currentPhaseId === 'strategy-meeting' ||
            currentPhaseId === 'prepare-tactics-meeting' ||
            currentPhaseId === 'tactics-meeting' ||
            currentPhaseId === 'prepare-planning-meeting' ||
            currentPhaseId === 'planning-meeting' ||
            currentPhaseId === 'iap-prep-approval' ||
            currentPhaseId === 'operations-briefing'
          )) && (
            <p className="text-muted-foreground">{getPhaseHeader().description}</p>
          )}
        </div>
        {/* Removed standalone Period badge per request */}
      </div>

      {/* Scheduled Meetings Card - Directly Below Header */}
      {!(currentTab === 'planning' && currentPhaseId === 'strategy-meeting') && (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Scheduled Meetings ({meetings.length})
              </CardTitle>
              <CardDescription>
                {getPhaseHeader().title} meetings that have been scheduled
              </CardDescription>
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
        <CardContent className="space-y-4">
          {meetings.length > 0 ? (
            meetings.map((meeting) => (
              <div key={meeting.id} className="border border-border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{meeting.meetingName}</h4>
                      <Badge variant="outline" className="text-xs">
                        {meeting.meetingType}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(meeting.date)}
                      </div>
                      {meeting.startTime && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTime(meeting.startTime)}
                          {meeting.endTime && ` - ${formatTime(meeting.endTime)}`}
                        </div>
                      )}
                    </div>

                    {meeting.location && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                        <MapPin className="w-3 h-3" />
                        {meeting.location}
                        {meeting.isInPerson ? ' (In-Person)' : ' (Virtual)'}
                      </div>
                    )}

                    {!meeting.isInPerson && meeting.virtualLink && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                        <Link className="w-3 h-3" />
                        <a 
                          href={meeting.virtualLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-accent hover:underline"
                        >
                          Join Meeting
                        </a>
                      </div>
                    )}

                    {meeting.attendees && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                        <Users className="w-3 h-3" />
                        <span className="truncate">{meeting.attendees}</span>
                      </div>
                    )}

                    {meeting.agenda && (
                      <div className="mt-3">
                        <p className="text-sm font-medium mb-2 text-card-foreground">Agenda:</p>
                        <div className="bg-card/50 border border-border/50 rounded-lg p-4 max-h-24 overflow-y-auto">
                          <div className="text-sm text-card-foreground/90 leading-relaxed whitespace-pre-wrap font-normal">
                            {meeting.agenda}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
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
              <p className="text-muted-foreground">No {getPhaseHeader().title} meetings scheduled</p>
            </div>
          )}
        </CardContent>
      </Card>
      )}

      {/* Strategy Meeting Specific Cards */}
      {currentPhaseId === 'strategy-meeting' && (
        <>
          {/* Incident Objectives Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-accent" />
                  <CardTitle>Incident Objectives</CardTitle>
                  {currentTab === 'planning' && (
                    <Button
                      onClick={handleExportICS202}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 ml-4"
                    >
                      <FileText className="w-4 h-4" />
                      Export ICS-202
                    </Button>
                  )}
                </div>
              </div>
              <CardDescription>
                Define strategic objectives and priorities for the incident response
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Community Lifelines */}
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

              {/* Critical Information Requirements */}
              <div className="space-y-3">
                <Label htmlFor="critical-info" className="font-medium text-card-foreground">
                  Critical Information Requirements
                </Label>
                <Textarea
                  id="critical-info"
                  placeholder="List critical information needed for decision making..."
                  value={criticalInformationRequirements}
                  onChange={(e) => handleCriticalInformationRequirementsChange(e.target.value)}
                  className="min-h-20"
                />
              </div>

              {/* Limitations and Constraints */}
              <div className="space-y-3">
                <Label htmlFor="limitations" className="font-medium text-card-foreground">
                  Limitations and Constraints
                </Label>
                <Textarea
                  id="limitations"
                  placeholder="Identify any limitations or constraints affecting the response..."
                  value={limitationsConstraints}
                  onChange={(e) => handleLimitationsConstraintsChange(e.target.value)}
                  className="min-h-20"
                />
              </div>

              {/* Key Decisions and Procedures */}
              <div className="space-y-3">
                <Label htmlFor="key-decisions" className="font-medium text-card-foreground">
                  Key Decisions and Procedures
                </Label>
                <Textarea
                  id="key-decisions"
                  placeholder="Document key decisions made and procedures to follow..."
                  value={keyDecisionsProcedures}
                  onChange={(e) => handleKeyDecisionsProceduresChange(e.target.value)}
                  className="min-h-20"
                />
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Prepare Tactics Meeting, Tactics Meeting, and Prepare Planning Meeting Specific Cards */}
      {(currentPhaseId === 'prepare-tactics-meeting' || currentPhaseId === 'tactics-meeting' || currentPhaseId === 'prepare-planning-meeting') && (
        <>
          {/* Work Analysis Matrix Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-accent" />
                    Work Analysis Matrix
                  </CardTitle>
                  <CardDescription>
                    Break down objectives into strategies and tactics
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => console.log('Exporting ICS-234 Work Analysis Matrix...')}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Export ICS-234
                  </Button>
                  <Button 
                    onClick={() => setShowAddObjectiveModal(true)}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Objective
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {workObjectives.length > 0 ? (
                workObjectives.map((objective) => (
                  <div key={objective.id} className="border border-border rounded-lg">
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleObjective(objective.id)}
                            className="p-1"
                          >
                            {objective.expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                          </Button>
                          <div>
                            <h4 className="font-medium text-card-foreground">{objective.name}</h4>
                            {objective.description && (
                              <p className="text-sm text-muted-foreground mt-1">{objective.description}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedObjectiveId(objective.id);
                              setShowAddStrategyModal(true);
                            }}
                            className="text-xs"
                          >
                            Add Strategy
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteObjective(objective.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {objective.expanded && (
                        <div className="ml-6 space-y-3 pt-3 border-t border-border/50">
                          {objective.strategies.map((strategy) => (
                            <div key={strategy.id} className="border border-border/50 rounded-lg">
                              <div className="p-3">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleToggleStrategy(objective.id, strategy.id)}
                                      className="p-1"
                                    >
                                      {strategy.expanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                                    </Button>
                                    <div>
                                      <h5 className="text-sm font-medium text-card-foreground">{strategy.name}</h5>
                                      {strategy.description && (
                                        <p className="text-xs text-muted-foreground mt-1">{strategy.description}</p>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        setSelectedObjectiveId(objective.id);
                                        setSelectedStrategyId(strategy.id);
                                        setShowAddTacticModal(true);
                                      }}
                                      className="text-xs"
                                    >
                                      Add Tactic
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleDeleteStrategy(objective.id, strategy.id)}
                                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </Button>
                                  </div>
                                </div>
                                
                                {strategy.expanded && strategy.tactics.length > 0 && (
                                  <div className="ml-5 space-y-2 pt-2 border-t border-border/30">
                                    {strategy.tactics.map((tactic) => (
                                      <div key={tactic.id} className="flex items-start justify-between p-2 bg-muted/20 rounded">
                                        <div className="flex-1">
                                          <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-card-foreground">{tactic.name}</span>
                                            <Badge variant="outline" className={`text-xs ${getPriorityColor(tactic.priority)}`}>
                                              {tactic.priority}
                                            </Badge>
                                          </div>
                                          {tactic.description && (
                                            <p className="text-xs text-muted-foreground mt-1">{tactic.description}</p>
                                          )}
                                          {tactic.assignedTo && (
                                            <p className="text-xs text-muted-foreground">Assigned to: {tactic.assignedTo}</p>
                                          )}
                                        </div>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => handleDeleteTactic(objective.id, strategy.id, tactic.id)}
                                          className="text-destructive hover:text-destructive hover:bg-destructive/10 ml-2"
                                        >
                                          <Trash2 className="w-3 h-3" />
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">No objectives defined</p>
                  <p className="text-sm text-muted-foreground">Add objectives to break down the work into manageable strategies and tactics</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Operational Planning Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-accent" />
                    Operational Planning
                  </CardTitle>
                  <CardDescription>
                    Define work assignments and resource requirements
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => console.log('Exporting ICS-215 Operational Planning...')}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Export ICS-215
                  </Button>
                  <Button 
                    onClick={() => setShowAddWorkAssignmentModal(true)}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Work Assignment
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {workAssignments.length > 0 ? (
                workAssignments.map((assignment) => (
                  <div key={assignment.id} className="border border-border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-card-foreground mb-1">{assignment.name}</h4>
                        {assignment.divisionGroupLocation && (
                          <p className="text-sm text-muted-foreground">Division/Group: {assignment.divisionGroupLocation}</p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteWorkAssignment(assignment.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">Overhead Positions</Label>
                        <Input
                          value={assignment.overheadPositions}
                          onChange={(e) => handleUpdateWorkAssignment(assignment.id, 'overheadPositions', e.target.value)}
                          placeholder="List overhead positions..."
                          className="mt-1 text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">Reporting Location</Label>
                        <Input
                          value={assignment.reportingLocation}
                          onChange={(e) => handleUpdateWorkAssignment(assignment.id, 'reportingLocation', e.target.value)}
                          placeholder="Specify reporting location..."
                          className="mt-1 text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">Special Equipment/Supplies</Label>
                        <Input
                          value={assignment.specialEquipmentSupplies}
                          onChange={(e) => handleUpdateWorkAssignment(assignment.id, 'specialEquipmentSupplies', e.target.value)}
                          placeholder="List special equipment..."
                          className="mt-1 text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">Requested Arrival Time</Label>
                        <Input
                          value={assignment.requestedArrivalTime}
                          onChange={(e) => handleUpdateWorkAssignment(assignment.id, 'requestedArrivalTime', e.target.value)}
                          placeholder="HH:MM"
                          className="mt-1 text-sm"
                        />
                      </div>
                    </div>

                    {assignment.resources.length > 0 && (
                      <div className="pt-3 border-t border-border/50">
                        <Label className="text-xs font-medium text-muted-foreground mb-2 block">Resources</Label>
                        <div className="space-y-2">
                          {assignment.resources.map((resource) => (
                            <div key={resource.id} className="flex items-center justify-between p-2 bg-muted/20 rounded text-sm">
                              <div className="flex-1">
                                <span className="font-medium">{resource.name}</span>
                                <span className="text-muted-foreground ml-2">
                                  Required: {resource.quantityRequired}, Have: {resource.quantityHad}, Need: {resource.quantityNeeded}
                                </span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteResource(assignment.id, resource.id)}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10 ml-2"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <ClipboardList className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">No work assignments defined</p>
                  <p className="text-sm text-muted-foreground">Add work assignments to organize operational activities and resources</p>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {/* Prepare Tactics Meeting Specific Cards (also shown in Tactics Meeting and Prepare Planning) */}
      {(currentPhaseId === 'prepare-tactics-meeting' || currentPhaseId === 'tactics-meeting' || currentPhaseId === 'prepare-planning-meeting') && (
        <>
          {/* IAP Safety Analysis Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-accent" />
                    IAP Safety Analysis
                  </CardTitle>
                  <CardDescription>
                    Identify hazards and safety considerations for the operational period
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => console.log('Exporting ICS-215A IAP Safety Analysis...')}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Export ICS-215A
                  </Button>
                  <Button 
                    onClick={() => setShowAddHazardModal(true)}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Hazard
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {hazards.length > 0 ? (
                hazards.map((hazard) => (
                  <div key={hazard.id} className="border border-border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-card-foreground">{hazard.name}</h4>
                          <Badge variant="outline" className={`text-xs ${getGarScoreColor(hazard.garScore)}`}>
                            GAR: {hazard.garScore}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-xs font-medium text-muted-foreground">Incident Area</Label>
                            <Input
                              value={hazard.incidentArea}
                              onChange={(e) => handleUpdateHazard(hazard.id, 'incidentArea', e.target.value)}
                              placeholder="Specify incident area..."
                              className="mt-1 text-sm"
                            />
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-muted-foreground">GAR Score (1-10)</Label>
                            <Select 
                              value={hazard.garScore.toString()} 
                              onValueChange={(value) => handleUpdateHazard(hazard.id, 'garScore', parseInt(value))}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {[1,2,3,4,5,6,7,8,9,10].map((score) => (
                                  <SelectItem key={score} value={score.toString()}>{score}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <Label className="text-xs font-medium text-muted-foreground">Mitigations</Label>
                          <Textarea
                            value={hazard.mitigations}
                            onChange={(e) => handleUpdateHazard(hazard.id, 'mitigations', e.target.value)}
                            placeholder="Describe mitigation measures..."
                            className="mt-1 text-sm min-h-20"
                          />
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteHazard(hazard.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 ml-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">No hazards identified</p>
                  <p className="text-sm text-muted-foreground">Add hazards to conduct safety analysis for the operational period</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Resource Requests Card (Prepare Planning only) */}
          {currentPhaseId === 'prepare-planning-meeting' && (
            <Card className="mt-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-accent" />
                    Resource Requests
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button size="sm" onClick={() => setShowAddResource(true)} className="flex items-center gap-2">
                      <Plus className="w-4 h-4" /> Add Resource Request
                    </Button>
                    <Button
                      onClick={() => console.log('Exporting ICS-213RR Resource Requests...')}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      Export ICS-213RR
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {resourceRequests.length === 0 ? (
                  <div className="text-sm text-muted-foreground mb-3">No resource requests yet.</div>
                ) : (
                  <div className="space-y-2 mb-4">
                    {resourceRequests.map((req) => (
                      <div key={req.id} className="border border-border/50 rounded-lg p-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-medium text-sm text-foreground">{req.item}</div>
                            <div className="text-xs text-muted-foreground">Qty: {req.quantity}</div>
                            {req.notes && <div className="text-xs text-muted-foreground mt-1">{req.notes}</div>}
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => setResourceRequests(prev => prev.filter(r => r.id !== req.id))} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {showAddResource ? (
                  <div className="space-y-3 border border-border/50 rounded-lg p-3 mb-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <Label className="text-xs">Item</Label>
                        <Input value={newResourceRequest.item} onChange={(e) => setNewResourceRequest({ ...newResourceRequest, item: e.target.value })} placeholder="e.g., Portable radios" className="mt-1" />
                      </div>
                      <div>
                        <Label className="text-xs">Quantity</Label>
                        <Input value={newResourceRequest.quantity} onChange={(e) => setNewResourceRequest({ ...newResourceRequest, quantity: e.target.value })} placeholder="e.g., 10" className="mt-1" />
                      </div>
                      <div>
                        <Label className="text-xs">Notes</Label>
                        <Input value={newResourceRequest.notes} onChange={(e) => setNewResourceRequest({ ...newResourceRequest, notes: e.target.value })} placeholder="Optional notes" className="mt-1" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" onClick={() => {
                        if (!newResourceRequest.item || !newResourceRequest.quantity) return;
                        setResourceRequests(prev => [...prev, { id: Date.now().toString(), ...newResourceRequest }]);
                        setNewResourceRequest({ item: '', quantity: '', notes: '' });
                        setShowAddResource(false);
                      }}>Add</Button>
                      <Button size="sm" variant="outline" onClick={() => { setShowAddResource(false); setNewResourceRequest({ item: '', quantity: '', notes: '' }); }}>Cancel</Button>
                    </div>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Prepare Planning Meeting Specific Cards */}
      {currentPhaseId === 'prepare-planning-meeting' && (
        <>
          {/* ICS Forms Export Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5 text-accent" />
                ICS Forms Export
              </CardTitle>
              <CardDescription>
                Export completed ICS forms for the planning meeting
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button
                  onClick={handleExportICS215}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export ICS-215
                </Button>
                
                <Button
                  onClick={handleExportICS215A}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export ICS-215A
                </Button>
                
                <Button
                  onClick={handleExportICS213RR}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export ICS-213RR
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Planning Meeting Specific Cards */}
      {currentPhaseId === 'planning-meeting' && (
        <>
          {/* Incident Objectives Card (same as Strategy Meeting) */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-accent" />
                  <CardTitle>Incident Objectives</CardTitle>
                  {currentTab === 'planning' && (
                    <Button
                      onClick={handleExportICS202}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 ml-4"
                    >
                      <FileText className="w-4 h-4" />
                      Export ICS-202
                    </Button>
                  )}
                </div>
              </div>
              <CardDescription>
                Define strategic objectives and priorities for the incident response
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Community Lifelines */}
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

          {/* Open Actions Tracker Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <ListTodo className="w-5 h-5 text-accent" />
                  Open Actions Tracker
                </CardTitle>
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

          {/* Open Actions Tracker Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ListTodo className="w-5 h-5 text-accent" />
                Open Actions Tracker
              </CardTitle>
              <CardDescription>
                Track open action items and assignments from the planning meeting
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-8">
                <ListTodo className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h4 className="text-muted-foreground mb-2">Open Actions Tracker</h4>
                <p className="text-muted-foreground">Action tracking functionality coming soon</p>
                <p className="text-sm text-muted-foreground mt-1">
                  This will provide comprehensive action item tracking including assignments, deadlines, and status updates from planning meeting decisions.
                </p>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* IAP Prep & Approval Specific Cards */}
      {currentPhaseId === 'iap-prep-approval' && (
        <>
          {/* Incident Objectives Card (same as Strategy Meeting) */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-accent" />
                  <CardTitle>Incident Objectives</CardTitle>
                  {currentTab === 'planning' && (
                    <Button
                      onClick={handleExportICS202}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 ml-4"
                    >
                      <FileText className="w-4 h-4" />
                      Export ICS-202
                    </Button>
                  )}
                </div>
              </div>
              <CardDescription>
                Define strategic objectives and priorities for the incident response
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Community Lifelines */}
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

          {/* Organization Assignment List Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-accent" />
                    Organization Assignment List
                  </CardTitle>
                  <CardDescription>
                    Define organizational structure and personnel assignments
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleExportICS203}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Export ICS-203
                  </Button>
                  <Button size="sm" onClick={() => setShowAddOrg(true)} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Assignment
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {orgAssignments.length === 0 ? (
                <div className="text-sm text-muted-foreground">No assignments yet.</div>
              ) : (
                <div className="space-y-2">
                  {orgAssignments.map((oa) => (
                    <div key={oa.id} className="border border-border/50 rounded-lg p-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="font-medium text-sm text-foreground">{oa.position} – {oa.name}</div>
                          <div className="text-xs text-muted-foreground">Contact: {oa.contact}</div>
                          {oa.notes && <div className="text-xs text-muted-foreground">Notes: {oa.notes}</div>}
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => setOrgAssignments(prev => prev.filter(x => x.id !== oa.id))} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {showAddOrg && (
                <div className="space-y-3 border border-border/50 rounded-lg p-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs">ICS Position</Label>
                      <Input value={newOrgAssignment.position} onChange={(e) => setNewOrgAssignment({ ...newOrgAssignment, position: e.target.value })} placeholder="e.g., Operations Section Chief" className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs">Name</Label>
                      <Input value={newOrgAssignment.name} onChange={(e) => setNewOrgAssignment({ ...newOrgAssignment, name: e.target.value })} placeholder="Full name" className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs">Contact</Label>
                      <Input value={newOrgAssignment.contact} onChange={(e) => setNewOrgAssignment({ ...newOrgAssignment, contact: e.target.value })} placeholder="Phone / Email" className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs">Notes</Label>
                      <Input value={newOrgAssignment.notes} onChange={(e) => setNewOrgAssignment({ ...newOrgAssignment, notes: e.target.value })} placeholder="Optional" className="mt-1" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" onClick={() => {
                      if (!newOrgAssignment.position || !newOrgAssignment.name) return;
                      setOrgAssignments(prev => [...prev, { id: Date.now().toString(), ...newOrgAssignment }]);
                      setNewOrgAssignment({ position: '', name: '', contact: '', notes: '' });
                      setShowAddOrg(false);
                    }}>Add</Button>
                    <Button size="sm" variant="outline" onClick={() => { setShowAddOrg(false); setNewOrgAssignment({ position: '', name: '', contact: '', notes: '' }); }}>Cancel</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Organization Chart Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-accent" />
                    Organization Chart
                  </CardTitle>
                  <CardDescription>
                    Visual representation of the incident organization structure
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleExportICS207}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Export ICS-207
                  </Button>
                  <Button size="sm" onClick={() => setShowAddOrgNode(true)} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Node
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {orgChartNodes.length === 0 ? (
                <div className="text-sm text-muted-foreground">No org chart nodes yet.</div>
              ) : (
                <div className="space-y-1">
                  {orgChartNodes.map((n) => {
                    // compute simple depth by walking reportsTo chain
                    let depth = 0; let guard = 0; let curReports = n.reportsTo?.trim();
                    while (curReports && guard < 6) {
                      const parent = orgChartNodes.find(x => x.position === curReports || x.name === curReports);
                      if (!parent) break;
                      depth += 1; guard += 1; curReports = parent.reportsTo?.trim();
                    }
                    return (
                      <div key={n.id} className="flex items-start justify-between" style={{ paddingLeft: depth * 16 }}>
                        {editingOrgId === n.id ? (
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                            <Input value={editOrgNode.position} onChange={(e) => setEditOrgNode({ ...editOrgNode, position: e.target.value })} placeholder="ICS Position" />
                            <Input value={editOrgNode.name} onChange={(e) => setEditOrgNode({ ...editOrgNode, name: e.target.value })} placeholder="Name" />
                            <Input value={editOrgNode.reportsTo} onChange={(e) => setEditOrgNode({ ...editOrgNode, reportsTo: e.target.value })} placeholder="Reports To (position or name)" />
                          </div>
                        ) : (
                          <div className="flex-1">
                            <div className="font-medium text-sm text-foreground">{n.position} – {n.name}</div>
                            {n.reportsTo && <div className="text-xs text-muted-foreground">Reports to: {n.reportsTo}</div>}
                          </div>
                        )}
                        <div className="flex items-center gap-2 ml-2">
                          {editingOrgId === n.id ? (
                            <>
                              <Button size="sm" onClick={() => {
                                setOrgChartNodes(prev => prev.map(x => x.id === n.id ? { id: n.id, ...editOrgNode } : x));
                                setEditingOrgId(null);
                              }}>Save</Button>
                              <Button size="sm" variant="outline" onClick={() => setEditingOrgId(null)}>Cancel</Button>
                            </>
                          ) : (
                            <>
                              <Button size="sm" variant="outline" onClick={() => { setEditingOrgId(n.id); setEditOrgNode({ position: n.position, name: n.name, reportsTo: n.reportsTo }); }}>Edit</Button>
                              <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => setOrgChartNodes(prev => prev.filter(x => x.id !== n.id))}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {showAddOrgNode && (
                <div className="space-y-3 border border-border/50 rounded-lg p-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <Label className="text-xs">ICS Position</Label>
                      <Input value={newOrgNode.position} onChange={(e) => setNewOrgNode({ ...newOrgNode, position: e.target.value })} placeholder="e.g., Operations Section Chief" className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs">Name</Label>
                      <Input value={newOrgNode.name} onChange={(e) => setNewOrgNode({ ...newOrgNode, name: e.target.value })} placeholder="Full name" className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs">Reports To</Label>
                      <Input value={newOrgNode.reportsTo} onChange={(e) => setNewOrgNode({ ...newOrgNode, reportsTo: e.target.value })} placeholder="Supervisor position or name" className="mt-1" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" onClick={() => {
                      if (!newOrgNode.position || !newOrgNode.name) return;
                      setOrgChartNodes(prev => [...prev, { id: Date.now().toString(), ...newOrgNode }]);
                      setNewOrgNode({ position: '', name: '', reportsTo: '' });
                      setShowAddOrgNode(false);
                    }}>Add</Button>
                    <Button size="sm" variant="outline" onClick={() => { setShowAddOrgNode(false); setNewOrgNode({ position: '', name: '', reportsTo: '' }); }}>Cancel</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Safety Plan Card */}
          {currentTab !== 'planning' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-accent" />
                  Safety Plan
                </CardTitle>
                <CardDescription>
                  Comprehensive safety planning and hazard mitigation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h4 className="text-muted-foreground mb-2">Safety Plan</h4>
                  <p className="text-muted-foreground">Safety planning functionality coming soon</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    This will provide comprehensive safety plan development including hazard analysis, safety protocols, emergency procedures, and risk mitigation strategies.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Assignment List Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-accent" />
                  <CardTitle>Assignment List</CardTitle>
                </div>
                {currentTab === 'planning' && (
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => setShowAddAssignment(true)}
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> Add Assignment
                    </Button>
                    <Button
                      onClick={() => console.log('Exporting ICS-204 form...')}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4" /> Export ICS-204
                    </Button>
                  </div>
                )}
              </div>
              <CardDescription>
                Detailed work assignments and resource allocations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {assignments.length > 0 ? (
                <div className="space-y-3">
                  {assignments.map((a) => (
                    <div key={a.id} className="bg-muted/30 p-3 rounded-lg border border-border/50">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="font-medium text-sm text-foreground">{a.assignment}</div>
                          <div className="text-xs text-muted-foreground">Resources: {a.resources}</div>
                        </div>
                        <Badge variant="outline" className="text-xs">ICS-204</Badge>
                      </div>
                      {a.specialInstructions && (
                        <div className="text-xs text-muted-foreground">Special Instructions: {a.specialInstructions}</div>
                      )}
                      {a.contact && (
                        <div className="text-xs text-muted-foreground">Contact: {a.contact}</div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">No assignments yet.</div>
              )}
            </CardContent>
          </Card>

          {/* Add Assignment Modal */}
          <Dialog open={showAddAssignment} onOpenChange={setShowAddAssignment}>
            <DialogContent className="max-w-xl">
              <DialogHeader>
                <DialogTitle>Add Assignment</DialogTitle>
                <DialogDescription>
                  Create a new assignment for ICS-204 export.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="asmt-name">Assignment</Label>
                  <Input id="asmt-name" value={newAssignment.assignment} onChange={(e) => setNewAssignment({ ...newAssignment, assignment: e.target.value })} placeholder="Division A, Group 1, etc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="asmt-resources">Resources</Label>
                  <Input id="asmt-resources" value={newAssignment.resources} onChange={(e) => setNewAssignment({ ...newAssignment, resources: e.target.value })} placeholder="Engines, Teams, Equipment" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="asmt-special">Special Instructions</Label>
                  <Textarea id="asmt-special" value={newAssignment.specialInstructions} onChange={(e) => setNewAssignment({ ...newAssignment, specialInstructions: e.target.value })} placeholder="Safety notes, tactics, comms..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="asmt-contact">Contact</Label>
                  <Input id="asmt-contact" value={newAssignment.contact} onChange={(e) => setNewAssignment({ ...newAssignment, contact: e.target.value })} placeholder="Supervisor / Contact details" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddAssignment(false)}>Cancel</Button>
                <Button onClick={handleAddAssignment} disabled={!newAssignment.assignment}>Add</Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Incident Radio Communications Plan Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent" />
                Incident Radio Communications Plan
              </CardTitle>
              <CardDescription>
                Radio frequency assignments and communication protocols
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-8">
                <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h4 className="text-muted-foreground mb-2">Incident Radio Communications Plan</h4>
                <p className="text-muted-foreground">Communications planning functionality coming soon</p>
                <p className="text-sm text-muted-foreground mt-1">
                  This will provide comprehensive communications planning including frequency assignments, talk group management, and communication protocols for operational coordination.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Medical Plan Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-accent" />
                Medical Plan
              </CardTitle>
              <CardDescription>
                Medical support and emergency medical procedures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-8">
                <Plus className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h4 className="text-muted-foreground mb-2">Medical Plan</h4>
                <p className="text-muted-foreground">Medical planning functionality coming soon</p>
                <p className="text-sm text-muted-foreground mt-1">
                  This will provide comprehensive medical planning including medical support locations, evacuation procedures, medical personnel assignments, and emergency medical protocols.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Safety Message Card */}
          <Card className="mt-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-accent" />
                  Safety Message
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleExportICS208}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Export ICS-208
                  </Button>
                  <Button size="sm" onClick={() => setShowAddSafety(true)} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Safety Message
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {safetyMessages.length === 0 ? (
                <div className="text-sm text-muted-foreground mb-3">No safety messages yet.</div>
              ) : (
                <div className="space-y-2 mb-4">
                  {safetyMessages.map((sm) => (
                    <div key={sm.id} className="border border-border/50 rounded-lg p-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="font-medium text-sm text-foreground">{sm.message}</div>
                          <div className="text-xs text-muted-foreground">Physical Hazards: {sm.physicalHazards}</div>
                          <div className="text-xs text-muted-foreground">Environmental Hazards & Other: {sm.environmentalHazards}{sm.otherHazards ? `; ${sm.otherHazards}` : ''}</div>
                          <div className="text-xs text-muted-foreground">SOP: {sm.sop}</div>
                          <div className="text-xs text-muted-foreground">Required PPE: {sm.requiredPpe}</div>
                          {sm.comments && <div className="text-xs text-muted-foreground">Comments: {sm.comments}</div>}
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => setSafetyMessages(prev => prev.filter(s => s.id !== sm.id))} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {showAddSafety && (
                <div className="space-y-3 border border-border/50 rounded-lg p-3 mb-3">
                  <div>
                    <Label className="text-xs">Safety Message</Label>
                    <Input value={newSafety.message} onChange={(e) => setNewSafety({ ...newSafety, message: e.target.value })} placeholder="Enter safety message" className="mt-1" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs">Physical Hazards</Label>
                      <Input value={newSafety.physicalHazards} onChange={(e) => setNewSafety({ ...newSafety, physicalHazards: e.target.value })} placeholder="e.g., Slip/trip/fall; heat" className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs">Environmental Hazards</Label>
                      <Input value={newSafety.environmentalHazards} onChange={(e) => setNewSafety({ ...newSafety, environmentalHazards: e.target.value })} placeholder="e.g., Weather, wildlife" className="mt-1" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs">Other Hazards</Label>
                      <Input value={newSafety.otherHazards} onChange={(e) => setNewSafety({ ...newSafety, otherHazards: e.target.value })} placeholder="Optional" className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs">Standard Operating Procedure</Label>
                      <Input value={newSafety.sop} onChange={(e) => setNewSafety({ ...newSafety, sop: e.target.value })} placeholder="Key SOP guidance" className="mt-1" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs">Required PPE</Label>
                      <Input value={newSafety.requiredPpe} onChange={(e) => setNewSafety({ ...newSafety, requiredPpe: e.target.value })} placeholder="e.g., Helmet, eye pro, gloves" className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs">Comments</Label>
                      <Input value={newSafety.comments} onChange={(e) => setNewSafety({ ...newSafety, comments: e.target.value })} placeholder="Optional comments" className="mt-1" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" onClick={() => {
                      if (!newSafety.message) return;
                      setSafetyMessages(prev => [...prev, { id: Date.now().toString(), ...newSafety }]);
                      setNewSafety({ message: '', physicalHazards: '', environmentalHazards: '', otherHazards: '', sop: '', requiredPpe: '', comments: '' });
                      setShowAddSafety(false);
                    }}>Add</Button>
                    <Button size="sm" variant="outline" onClick={() => { setShowAddSafety(false); setNewSafety({ message: '', physicalHazards: '', environmentalHazards: '', otherHazards: '', sop: '', requiredPpe: '', comments: '' }); }}>Cancel</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {/* Operations Briefing Specific Cards */}
      {currentPhaseId === 'operations-briefing' && (
        <>
          {/* Assignment List Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-accent" />
                    Assignment List
                  </CardTitle>
                  <CardDescription>
                    Review and communicate operational assignments and responsibilities
                  </CardDescription>
                </div>
                <Button 
                  className="flex items-center gap-2"
                  disabled
                >
                  <Plus className="w-4 h-4" />
                  Add Assignment
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-8">
                <ClipboardList className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h4 className="text-muted-foreground mb-2">Assignment List</h4>
                <p className="text-muted-foreground">Assignment briefing functionality coming soon</p>
                <p className="text-sm text-muted-foreground mt-1">
                  This will provide comprehensive assignment briefing tools including operational objectives, resource assignments, safety reminders, and communication protocols for the operational period.
                </p>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Initial UC Meeting Phase specific content */}
      {currentPhaseId === 'ic-uc-objectives-meeting' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getPhaseHeader().icon}
              Meeting Agenda
            </CardTitle>
            <CardDescription>
              IC/UC Objectives meeting agenda and tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {agendaItems.map((item) => (
              <div key={item.id} className="border border-border rounded-lg">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id={`item-${item.id}`}
                        checked={checkedItems[item.id] || false}
                        onCheckedChange={(checked) => handleItemCheck(item.id, checked as boolean)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={`${item.roleColor} text-white text-xs`}>
                            {item.role}
                          </Badge>
                        </div>
                        <Label 
                          htmlFor={`item-${item.id}`} 
                          className="text-card-foreground cursor-pointer"
                        >
                          {item.item}
                        </Label>
                        {item.subItems && (
                          <div className="mt-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleItemExpand(item.id)}
                              className="flex items-center gap-2 text-sm p-2 h-auto"
                            >
                              {expandedItems[item.id] ? (
                                <ChevronDown className="w-4 h-4" />
                              ) : (
                                <ChevronRight className="w-4 h-4" />
                              )}
                              Show Details ({item.subItems.length} items)
                            </Button>
                            {expandedItems[item.id] && (
                              <div className="ml-6 mt-2 space-y-2">
                                {item.subItems.map((subItem, index) => (
                                  <div key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                                    <span className="text-accent mt-1">•</span>
                                    <span>{subItem}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleItemExpand(`notes-${item.id}`)}
                      className="text-muted-foreground hover:text-accent"
                    >
                      <StickyNote className="w-4 h-4" />
                    </Button>
                  </div>
                  {expandedItems[`notes-${item.id}`] && (
                    <div className="mt-4 pl-8">
                      <Textarea
                        placeholder="Add notes for this agenda item..."
                        value={notes[item.id] || ''}
                        onChange={(e) => handleNotesChange(item.id, e.target.value)}
                        className="min-h-24"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Open Actions Tracker */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <ListTodo className="w-5 h-5 text-accent" />
                Open Actions Tracker ({actions.length})
              </CardTitle>
              <CardDescription>
                Track action items and follow-ups from the meeting
              </CardDescription>
            </div>
            <Button 
              onClick={() => setShowAddActionModal(true)}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Action
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {actions.length > 0 ? (
            actions.map((action) => (
              <div key={action.id} className="border border-border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-card-foreground mb-1">{action.taskName}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      POC: {action.pointOfContact} • POC Briefed: {action.pocBriefed}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">Start Date</Label>
                        <Input
                          type="date"
                          value={action.startDate}
                          onChange={(e) => handleUpdateAction(action.id, 'startDate', e.target.value)}
                          className="mt-1 text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">Deadline</Label>
                        <Input
                          type="date"
                          value={action.deadline}
                          onChange={(e) => handleUpdateAction(action.id, 'deadline', e.target.value)}
                          className="mt-1 text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">Status</Label>
                        <Select 
                          value={action.status} 
                          onValueChange={(value) => handleUpdateAction(action.id, 'status', value)}
                        >
                          <SelectTrigger className="mt-1">
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
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteAction(action.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 ml-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <ListTodo className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No action items tracked</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6">
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
        
        <div className="flex items-center gap-4">
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

      {/* Meeting Creation Modal */}
      {showScheduleModal && (
        <CreateMeetingModal
          isOpen={showScheduleModal}
          onClose={() => setShowScheduleModal(false)}
          onCreateMeeting={handleCreateMeeting}
        />
      )}

      {/* Add Action Modal */}
      <Dialog open={showAddActionModal} onOpenChange={setShowAddActionModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Action Item</DialogTitle>
            <DialogDescription>
              Create a new action item to track
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="task-name">Task Name</Label>
              <Input
                id="task-name"
                value={newAction.taskName || ''}
                onChange={(e) => setNewAction(prev => ({ ...prev, taskName: e.target.value }))}
                placeholder="Enter task name..."
              />
            </div>
            <div>
              <Label htmlFor="point-of-contact">Point of Contact</Label>
              <Input
                id="point-of-contact"
                value={newAction.pointOfContact || ''}
                onChange={(e) => setNewAction(prev => ({ ...prev, pointOfContact: e.target.value }))}
                placeholder="Enter point of contact..."
              />
            </div>
            <div className="flex items-center space-x-4">
              <Label>POC Briefed:</Label>
              <Select 
                value={newAction.pocBriefed} 
                onValueChange={(value: 'Yes' | 'No') => setNewAction(prev => ({ ...prev, pocBriefed: value }))}
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start-date">Start Date</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={newAction.startDate || ''}
                  onChange={(e) => setNewAction(prev => ({ ...prev, startDate: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="deadline">Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={newAction.deadline || ''}
                  onChange={(e) => setNewAction(prev => ({ ...prev, deadline: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <Label>Status</Label>
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
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowAddActionModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddAction}>
                Add Action
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Objective Modal */}
      <Dialog open={showAddObjectiveModal} onOpenChange={setShowAddObjectiveModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Objective</DialogTitle>
            <DialogDescription>
              Create a new objective for work analysis
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="objective-name">Objective Name</Label>
              <Input
                id="objective-name"
                value={newObjective.name}
                onChange={(e) => setNewObjective(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter objective name..."
              />
            </div>
            <div>
              <Label htmlFor="objective-description">Description</Label>
              <Textarea
                id="objective-description"
                value={newObjective.description}
                onChange={(e) => setNewObjective(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter objective description..."
                className="min-h-20"
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowAddObjectiveModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddObjective}>
                Add Objective
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Strategy Modal */}
      <Dialog open={showAddStrategyModal} onOpenChange={setShowAddStrategyModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Strategy</DialogTitle>
            <DialogDescription>
              Create a new strategy for the selected objective
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="strategy-name">Strategy Name</Label>
              <Input
                id="strategy-name"
                value={newStrategy.name}
                onChange={(e) => setNewStrategy(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter strategy name..."
              />
            </div>
            <div>
              <Label htmlFor="strategy-description">Description</Label>
              <Textarea
                id="strategy-description"
                value={newStrategy.description}
                onChange={(e) => setNewStrategy(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter strategy description..."
                className="min-h-20"
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowAddStrategyModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddStrategy}>
                Add Strategy
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Tactic Modal */}
      <Dialog open={showAddTacticModal} onOpenChange={setShowAddTacticModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Tactic</DialogTitle>
            <DialogDescription>
              Create a new tactic for the selected strategy
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="tactic-name">Tactic Name</Label>
              <Input
                id="tactic-name"
                value={newTactic.name}
                onChange={(e) => setNewTactic(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter tactic name..."
              />
            </div>
            <div>
              <Label htmlFor="tactic-description">Description</Label>
              <Textarea
                id="tactic-description"
                value={newTactic.description}
                onChange={(e) => setNewTactic(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter tactic description..."
                className="min-h-20"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="assigned-to">Assigned To</Label>
                <Input
                  id="assigned-to"
                  value={newTactic.assignedTo}
                  onChange={(e) => setNewTactic(prev => ({ ...prev, assignedTo: e.target.value }))}
                  placeholder="Enter assignment..."
                />
              </div>
              <div>
                <Label>Priority</Label>
                <Select 
                  value={newTactic.priority} 
                  onValueChange={(value: 'High' | 'Medium' | 'Low') => setNewTactic(prev => ({ ...prev, priority: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowAddTacticModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddTactic}>
                Add Tactic
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Work Assignment Modal */}
      <Dialog open={showAddWorkAssignmentModal} onOpenChange={setShowAddWorkAssignmentModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Work Assignment</DialogTitle>
            <DialogDescription>
              Create a new work assignment with resources
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="assignment-name">Assignment Name</Label>
                <Input
                  id="assignment-name"
                  value={newWorkAssignment.name}
                  onChange={(e) => setNewWorkAssignment(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter assignment name..."
                />
              </div>
              <div>
                <Label htmlFor="division-group">Division/Group/Location</Label>
                <Input
                  id="division-group"
                  value={newWorkAssignment.divisionGroupLocation}
                  onChange={(e) => setNewWorkAssignment(prev => ({ ...prev, divisionGroupLocation: e.target.value }))}
                  placeholder="Enter division, group, or location..."
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="overhead-positions">Overhead Positions</Label>
                <Input
                  id="overhead-positions"
                  value={newWorkAssignment.overheadPositions}
                  onChange={(e) => setNewWorkAssignment(prev => ({ ...prev, overheadPositions: e.target.value }))}
                  placeholder="List overhead positions..."
                />
              </div>
              <div>
                <Label htmlFor="special-equipment">Special Equipment/Supplies</Label>
                <Input
                  id="special-equipment"
                  value={newWorkAssignment.specialEquipmentSupplies}
                  onChange={(e) => setNewWorkAssignment(prev => ({ ...prev, specialEquipmentSupplies: e.target.value }))}
                  placeholder="List special equipment..."
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reporting-location">Reporting Location</Label>
                <Input
                  id="reporting-location"
                  value={newWorkAssignment.reportingLocation}
                  onChange={(e) => setNewWorkAssignment(prev => ({ ...prev, reportingLocation: e.target.value }))}
                  placeholder="Specify reporting location..."
                />
              </div>
              <div>
                <Label htmlFor="arrival-time">Requested Arrival Time</Label>
                <Input
                  id="arrival-time"
                  value={newWorkAssignment.requestedArrivalTime}
                  onChange={(e) => setNewWorkAssignment(prev => ({ ...prev, requestedArrivalTime: e.target.value }))}
                  placeholder="HH:MM"
                />
              </div>
            </div>

            {/* Resources Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <Label className="font-medium">Resources</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddResourceToModal}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Resource
                </Button>
              </div>

              <div className="space-y-3 mb-4">
                <div className="grid grid-cols-4 gap-2">
                  <Input
                    value={newResource.name}
                    onChange={(e) => setNewResource(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Resource name..."
                  />
                  <Input
                    type="number"
                    value={newResource.quantityRequired}
                    onChange={(e) => setNewResource(prev => ({ ...prev, quantityRequired: parseInt(e.target.value) || 0 }))}
                    placeholder="Required"
                  />
                  <Input
                    type="number"
                    value={newResource.quantityHad}
                    onChange={(e) => setNewResource(prev => ({ ...prev, quantityHad: parseInt(e.target.value) || 0 }))}
                    placeholder="Have"
                  />
                  <Input
                    type="number"
                    value={newResource.quantityNeeded}
                    onChange={(e) => setNewResource(prev => ({ ...prev, quantityNeeded: parseInt(e.target.value) || 0 }))}
                    placeholder="Need"
                  />
                </div>
              </div>

              {newWorkAssignment.resources.length > 0 && (
                <div className="border border-border rounded-lg p-3 space-y-2 max-h-32 overflow-y-auto">
                  {newWorkAssignment.resources.map((resource) => (
                    <div key={resource.id} className="flex items-center justify-between text-sm">
                      <span>{resource.name} - Req: {resource.quantityRequired}, Have: {resource.quantityHad}, Need: {resource.quantityNeeded}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveResourceFromModal(resource.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddWorkAssignmentModal(false);
                  setNewWorkAssignment({
                    name: '',
                    divisionGroupLocation: '',
                    resources: [],
                    overheadPositions: '',
                    specialEquipmentSupplies: '',
                    reportingLocation: '',
                    requestedArrivalTime: ''
                  });
                  setNewResource({
                    name: '',
                    quantityRequired: 0,
                    quantityHad: 0,
                    quantityNeeded: 0
                  });
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleAddWorkAssignment}>
                Add Work Assignment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Hazard Modal */}
      <Dialog open={showAddHazardModal} onOpenChange={setShowAddHazardModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Hazard</DialogTitle>
            <DialogDescription>
              Identify a new hazard and its mitigation measures
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="hazard-name">Hazard Name</Label>
              <Input
                id="hazard-name"
                value={newHazard.name}
                onChange={(e) => setNewHazard(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter hazard name..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="incident-area">Incident Area</Label>
                <Input
                  id="incident-area"
                  value={newHazard.incidentArea}
                  onChange={(e) => setNewHazard(prev => ({ ...prev, incidentArea: e.target.value }))}
                  placeholder="Specify incident area..."
                />
              </div>
              <div>
                <Label>GAR Score (1-10)</Label>
                <Select 
                  value={newHazard.garScore.toString()} 
                  onValueChange={(value) => setNewHazard(prev => ({ ...prev, garScore: parseInt(value) }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4,5,6,7,8,9,10].map((score) => (
                      <SelectItem key={score} value={score.toString()}>{score}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="mitigations">Mitigations</Label>
              <Textarea
                id="mitigations"
                value={newHazard.mitigations}
                onChange={(e) => setNewHazard(prev => ({ ...prev, mitigations: e.target.value }))}
                placeholder="Describe mitigation measures..."
                className="min-h-20"
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowAddHazardModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddHazard}>
                Add Hazard
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}