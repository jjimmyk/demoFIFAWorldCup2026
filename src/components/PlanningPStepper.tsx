import { Check, Clock, ChevronDown, ArrowLeft, Calendar, BarChart3, FileText, Settings } from 'lucide-react';
import { DisasterPhase } from '../types/disaster';
import { Button } from './ui/button';

interface PlanningPStepperProps {
  phases: DisasterPhase[];
  currentPhaseId: string;
  onPhaseSelect: (phaseId: string) => void;
  operationalPeriodNumber?: number;
  showHeader?: boolean;
}

export function PlanningPStepper({ phases, currentPhaseId, onPhaseSelect, operationalPeriodNumber = 0, showHeader = true }: PlanningPStepperProps) {
  // Apply reduced font sizes (50% of original) only for operational period 1+
  const isReducedFontSize = operationalPeriodNumber >= 1;
  // Check if any phase has descriptive text (only for operational period 0)
  const hasDescriptiveText = operationalPeriodNumber === 0;
  
  return (
    <div className={`px-6 bg-card ${hasDescriptiveText ? 'py-6' : 'py-4'}`}>
      {/* Planning Phases Header */}
      {showHeader && (
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-5 h-5 bg-primary rounded flex items-center justify-center">
            <Calendar className="w-3 h-3 text-primary-foreground" />
          </div>
          <span className={`font-medium text-card-foreground ${isReducedFontSize ? 'text-[3px]' : 'text-sm'}`}>Planning Phases</span>
        </div>
      )}
      
      {/* Horizontal Planning Phases */}
      <div className={`flex items-center justify-center overflow-x-auto ${hasDescriptiveText ? 'pb-4' : 'pb-2'}`}>
        {phases.map((phase, index) => {
          const isActive = phase.id === currentPhaseId;
          const isCompleted = phase.completed;
          // For operational period 0, allow free access to first two phases (Initial Response & Incident Briefing)
          // For operational period 1+, allow free access to all phases
          // For other periods, maintain sequential access
          const canAccess = operationalPeriodNumber === 0 
            ? (index <= 1 || phases[index - 1]?.completed)
            : operationalPeriodNumber >= 1 
            ? true 
            : (index === 0 || phases[index - 1]?.completed);

          // Get descriptive text for Operational Period 0 phases
          const getDescriptiveText = () => {
            if (operationalPeriodNumber !== 0) return null;
            if (phase.id === 'initial-response') return 'Create ICS-201';
            if (phase.id === 'incident-briefing') return 'Use ICS-201';
            return null;
          };

          const descriptiveText = getDescriptiveText();

          return (
            <div key={phase.id} className="flex items-center flex-shrink-0">
              <div className={`flex flex-col items-center ${hasDescriptiveText ? 'mt-3' : ''}`}>
                <button
                  onClick={() => canAccess && onPhaseSelect(phase.id)}
                  disabled={!canAccess}
                  className={`flex items-center transition-colors min-w-0 ${
                    isReducedFontSize 
                      ? 'gap-1 px-1.5 py-0.5 rounded text-[3px]' 
                      : 'gap-3 px-4 py-2 rounded-lg text-sm'
                  } ${
                    isActive
                      ? 'bg-accent text-accent-foreground'
                      : isCompleted
                      ? 'text-card-foreground hover:bg-muted/50 border border-border'
                      : canAccess
                      ? 'text-muted-foreground hover:bg-muted/50 border border-border'
                      : 'text-muted-foreground/0 cursor-not-allowed border border-border/50'
                  }`}
                >
                  <div
                    className={`rounded-full flex items-center justify-center flex-shrink-0 ${
                      isReducedFontSize 
                        ? 'w-[17px] h-[17px] text-[3px]' 
                        : 'w-8 h-8 text-sm'
                    } ${
                      isCompleted
                        ? 'bg-accent text-accent-foreground'
                        : isActive
                        ? 'bg-accent-foreground/20 text-accent-foreground'
                        : 'border border-border text-muted-foreground'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className={`${isReducedFontSize ? 'w-[6px] h-[6px]' : 'w-4 h-4'}`} />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <span className="truncate">{phase.shortName}</span>
                </button>
                
                {/* Descriptive text for Operational Period 0 */}
                {descriptiveText && (
                  <div className="mt-2 text-xs text-muted-foreground text-center whitespace-nowrap">
                    {descriptiveText}
                  </div>
                )}
              </div>
              
              {/* Spacer between phases - no vertical line */}
              {index < phases.length - 1 && (
                <div className={`flex items-center justify-center flex-shrink-0 ${isReducedFontSize ? 'w-3' : 'w-4'} ${hasDescriptiveText ? '-mt-3' : ''}`}>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}