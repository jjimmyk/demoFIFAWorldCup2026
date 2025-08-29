export interface DisasterPhase {
  id: string;
  name: string;
  shortName: string;
  description: string;
  completed: boolean;
  data?: Record<string, any>;
}

export interface OperationalPeriod {
  id: string;
  number: number;
  startTime: Date;
  endTime?: Date;
  phases: DisasterPhase[];
}

export const PLANNING_P_PHASES: Omit<DisasterPhase, 'completed' | 'data'>[] = [
  {
    id: 'initial-response',
    name: 'Initial Response & Assessment',
    shortName: 'Initial Response',
    description: 'Immediate response and situation assessment'
  },
  {
    id: 'incident-briefing',
    name: 'Incident Briefing (ICS-201)',
    shortName: 'Incident Briefing',
    description: 'Brief key personnel on current situation'
  }
];

export const OPERATIONAL_PERIOD_PHASES: Omit<DisasterPhase, 'completed' | 'data'>[] = [
  {
    id: 'ic-uc-objectives-meeting',
    name: 'IC/UC Objectives Meeting',
    shortName: 'IC/UC Objectives',
    description: 'Incident Commander and Unified Command objectives meeting'
  },
  {
    id: 'strategy-meeting',
    name: 'Strategy Meeting',
    shortName: 'Strategy Meeting',
    description: 'Develop strategic approach for incident response'
  },
  {
    id: 'prepare-tactics-meeting',
    name: 'Prepare for Tactics Meeting',
    shortName: 'Prepare Tactics',
    description: 'Preparation activities for the tactics meeting'
  },
  {
    id: 'tactics-meeting',
    name: 'Tactics Meeting',
    shortName: 'Tactics Meeting',
    description: 'Tactical planning and resource assignment meeting'
  },
  {
    id: 'prepare-planning-meeting',
    name: 'Prepare for Planning Meeting',
    shortName: 'Prepare Planning',
    description: 'Preparation activities for the planning meeting'
  },
  {
    id: 'planning-meeting',
    name: 'Planning Meeting',
    shortName: 'Planning Meeting',
    description: 'Comprehensive incident planning meeting'
  },
  {
    id: 'iap-prep-approval',
    name: 'IAP Prep & Approval',
    shortName: 'IAP Prep & Approval',
    description: 'Incident Action Plan preparation and approval process'
  },
  {
    id: 'operations-briefing',
    name: 'Operations Briefing',
    shortName: 'Operations Briefing',
    description: 'Brief operational personnel on the action plan'
  }
];