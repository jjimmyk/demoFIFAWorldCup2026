import { useState, useEffect } from 'react';
import { PlanningPStepper } from './components/PlanningPStepper';
import { InitialUCMeetingPhase } from './components/phases/InitialUCMeetingPhase';
import { ICUCObjectivesPhase } from './components/phases/ICUCObjectivesPhase';
import { GenericPhase } from './components/phases/GenericPhase';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { DisasterPhase, OperationalPeriod, OPERATIONAL_PERIOD_PHASES } from './types/disaster';
import { RefreshCw, Clock, CheckCircle, Menu, HelpCircle, Search, FileText, Download, Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './components/ui/dialog';
import { Textarea } from './components/ui/textarea';
import EsriMap from './components/EsriMap';
import svgPaths from './imports/svg-4ab4ujrm1u';
import imgCapsule from "figma:asset/371be526cb6c078a2a123792205d9842b99edd6d.png";
import imgCapsule1 from "figma:asset/eae313a48883a46e7a2a60ee806e73a8052191be.png";

export default function App() {
  const [currentOperationalPeriod, setCurrentOperationalPeriod] = useState<OperationalPeriod>({
    id: '2',
    number: 2,
    startTime: new Date(),
    phases: OPERATIONAL_PERIOD_PHASES.map(phase => ({
      ...phase,
      completed: false,
      data: {}
    }))
  });

  const [pastOperationalPeriods, setPastOperationalPeriods] = useState<OperationalPeriod[]>([]);
  const [viewingPastPeriod, setViewingPastPeriod] = useState<OperationalPeriod | null>(null);
  const [currentPhaseId, setCurrentPhaseId] = useState<string>('ic-uc-objectives-meeting');
  const [showCompletionSummary, setShowCompletionSummary] = useState(false);
  const [currentTab, setCurrentTab] = useState<'operations' | 'planning'>('planning');
  const [showSitrep, setShowSitrep] = useState(false);
  const [sitrepText, setSitrepText] = useState<string | null>(null);
  useEffect(() => {
    function onSwitchTab(e: Event) {
      const detail = (e as CustomEvent).detail as 'operations' | 'planning' | undefined;
      if (!detail) return;
      setCurrentTab(detail);
    }
    window.addEventListener('app-switch-tab', onSwitchTab as EventListener);
    return () => window.removeEventListener('app-switch-tab', onSwitchTab as EventListener);
  }, []);


  // Mock incident data - Updated for World Cup 2026
  const [incidentData] = useState({
    name: 'World Cup 2026',
    type: 'Special Event',
    location: 'Hard Rock Stadium, Miami, FL',
    startTime: new Date('2026-06-11T10:00:00'),
    icName: 'Captain Maria Rodriguez',
    status: 'Active',
    priority: 'High',
    capacity: '80,000 attendees',
    security: '85% complete',
    venues: {
      primary: 'AT&T Stadium',
      coverage: '16 host venues nationwide'
    }
  });

  const currentPhase = currentOperationalPeriod.phases.find(p => p.id === currentPhaseId);
  const currentPhaseIndex = currentOperationalPeriod.phases.findIndex(p => p.id === currentPhaseId);

  const handlePhaseDataChange = (data: Record<string, any>) => {
    setCurrentOperationalPeriod(prev => ({
      ...prev,
      phases: prev.phases.map(phase =>
        phase.id === currentPhaseId
          ? { ...phase, data }
          : phase
      )
    }));
  };

  const handlePhaseComplete = () => {
    setCurrentOperationalPeriod(prev => ({
      ...prev,
      phases: prev.phases.map(phase =>
        phase.id === currentPhaseId
          ? { ...phase, completed: true }
          : phase
      )
    }));

    // Move to next phase or show completion
    const nextPhaseIndex = currentPhaseIndex + 1;
    if (nextPhaseIndex < currentOperationalPeriod.phases.length) {
      setCurrentPhaseId(currentOperationalPeriod.phases[nextPhaseIndex].id);
    } else {
      setShowCompletionSummary(true);
    }
  };

  const handlePreviousPhase = () => {
    const previousPhaseIndex = currentPhaseIndex - 1;
    if (previousPhaseIndex >= 0) {
      setCurrentPhaseId(currentOperationalPeriod.phases[previousPhaseIndex].id);
    }
  };

  const advanceOperationalPeriod = () => {
    // Save current period to past periods before advancing
    setPastOperationalPeriods(prev => [...prev, { 
      ...currentOperationalPeriod, 
      endTime: new Date() 
    }]);
    
    const newPeriodNumber = currentOperationalPeriod.number + 1;
    
    setCurrentOperationalPeriod(prev => ({
      id: (parseInt(prev.id) + 1).toString(),
      number: newPeriodNumber,
      startTime: new Date(),
      endTime: undefined,
      phases: OPERATIONAL_PERIOD_PHASES.map(phase => ({
        ...phase,
        completed: false,
        data: {}
      }))
    }));
    setCurrentPhaseId('ic-uc-objectives-meeting');
    setShowCompletionSummary(false);
    setViewingPastPeriod(null); // Return to current period
  };

  const handleViewPastPeriod = (periodId: string) => {
    if (periodId === 'current') {
      setViewingPastPeriod(null);
    } else {
      const pastPeriod = pastOperationalPeriods.find(p => p.id === periodId);
      if (pastPeriod) {
        setViewingPastPeriod(pastPeriod);
        setCurrentPhaseId('ic-uc-objectives-meeting');
      }
    }
  };

  // Get the period currently being displayed (either current or past)
  const displayedPeriod = viewingPastPeriod || currentOperationalPeriod;
  const displayedPhase = displayedPeriod.phases.find(p => p.id === currentPhaseId);
  const displayedPhaseIndex = displayedPeriod.phases.findIndex(p => p.id === currentPhaseId);

  const renderCurrentPhase = () => {
    if (!displayedPhase) return null;

    // If viewing a past period, make it read-only
    const isReadOnly = viewingPastPeriod !== null;

    const commonProps = {
      data: displayedPhase.data,
      onDataChange: isReadOnly ? () => {} : handlePhaseDataChange,
      onComplete: isReadOnly ? () => {} : handlePhaseComplete,
      onPrevious: displayedPhaseIndex > 0 ? handlePreviousPhase : undefined,
    };

    // Phases that use the same content as Initial UC Meeting
    const phasesUsingInitialUCContent = [
      'strategy-meeting',
      'prepare-tactics-meeting', 
      'tactics-meeting',
      'prepare-planning-meeting',
      'planning-meeting',
      'iap-prep-approval',
      'operations-briefing'
    ];

    switch (displayedPhase.id) {
      case 'ic-uc-objectives-meeting':
        return <ICUCObjectivesPhase {...commonProps} operationalPeriodNumber={displayedPeriod.number} currentTab={currentTab} />;
      default:
        // Most phases use Initial UC Meeting content
        if (phasesUsingInitialUCContent.includes(displayedPhase.id)) {
          return <InitialUCMeetingPhase {...commonProps} operationalPeriodNumber={displayedPeriod.number} currentPhaseId={displayedPhase.id} />;
        }
        return (
          <GenericPhase 
            phase={displayedPhase}
            isFirst={displayedPhaseIndex === 0}
            {...commonProps} 
          />
        );
    }
  };

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'Complete':
        return 'default';
      case 'Ongoing':
        return 'destructive';
      case 'Scheduled':
        return 'outline';
      default:
        return 'outline';
    }
  };

  if (showCompletionSummary) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-accent" />
              </div>
              <h1>Operational Period {currentOperationalPeriod.number} Complete</h1>
              <p className="text-muted-foreground mt-2">
                All planning phases have been completed successfully
              </p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Phase Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentOperationalPeriod.phases.map((phase) => (
                    <div key={phase.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="font-medium text-sm truncate">{phase.shortName}</div>
                        <div className="text-xs text-muted-foreground truncate">{phase.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={advanceOperationalPeriod}
                size="lg"
                className="bg-primary hover:bg-primary/90 flex items-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Start New Operational Period
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top Navigation Bar - Imported Design */}
      <div className="relative bg-[#353a40] h-16 w-full">
        {/* Left Control */}
        <div className="absolute content-stretch flex gap-4 items-center justify-start left-0 top-0 h-16">
          {/* Menu Icon Logo */}
          <div className="bg-gradient-to-r box-border content-stretch flex flex-col from-[#02a3fe] from-[8.524%] gap-8 items-center justify-center overflow-clip p-[8px] relative shrink-0 size-16 to-[#6876ee] to-[94.739%]">
            <div className="content-stretch flex flex-col gap-11 items-start justify-start relative shrink-0">
              <div className="relative shrink-0 size-14">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56 56">
                  <g id="Capsule">
                    <path d={svgPaths.p29a8a500} fill="white" id="Vector" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Right Control */}
        <div className="absolute content-stretch flex gap-4 h-16 items-center justify-end right-4 top-0">
          {/* Help Icon */}
          <div className="content-stretch flex gap-4 items-center justify-end relative shrink-0">
            <div className="relative shrink-0 size-4">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                <g id="question-circle">
                  <g id="Vector">
                    <path d={svgPaths.p230304a0} fill="white" />
                    <path d={svgPaths.p87e3800} fill="white" />
                  </g>
                </g>
              </svg>
            </div>
          </div>
          {/* User Avatar */}
          <div className="bg-center bg-cover bg-no-repeat h-[46px] rounded-[72px] shrink-0 w-11" style={{ backgroundImage: `url('${imgCapsule}'), url('${imgCapsule1}')` }} />
        </div>
      </div>

      <div className="flex flex-1">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Incident Header */}
          <div className="bg-background border-b border-border">
            <div className="px-6 py-4">
              {/* Incident Title */}
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-4">
                    <h1 className="text-foreground">{incidentData.name}</h1>
                    <span className="text-muted-foreground text-lg">
                      Start Time: {incidentData.startTime.toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })} at {incidentData.startTime.toLocaleTimeString('en-US', { 
                        hour: 'numeric', 
                        minute: '2-digit',
                        hour12: true 
                      })}
                    </span>
                    <Badge variant="outline" className="flex items-center gap-2 cursor-pointer" onClick={() => {
                      window.dispatchEvent(new Event('neutralize-uas'));
                      window.dispatchEvent(new CustomEvent('threat-update', { detail: { type: 'High-Risk Drones Approaching TFR', severity: 'Neutralized' } }));
                    }}>
                      <Clock className="w-4 h-4" />
                      {displayedPeriod.number === currentOperationalPeriod.number
                        ? `Current Operational Period ${displayedPeriod.number}`
                        : `Operational Period ${displayedPeriod.number}`}
                    </Badge>
                    {currentTab === 'operations' && (
                      <Button
                        onClick={() => { 
                          setSitrepText(`SITREP – Operational Period ${displayedPeriod.number}
Date/Time: ${new Date().toLocaleString()}
Incident: ${incidentData.name}
Location: ${incidentData.location}
Status: ${incidentData.status}

1) Summary
Unauthorized UAS activity detected near the TFR. C-UAS units deployed and actively monitoring. Vessel of interest identified and under investigation.

2) Objectives (Next OP)
- Maintain secure airspace corridor into/around TFR.
- Coordinate with USCG for maritime interdiction support.
- Maintain safe ingress/egress for spectators and staff.

3) Operations
- C-UAS (USCG) positioned west of UAS cluster; UAS contacts neutralized as needed.
- Security teams assigned to perimeter choke points (Gates A/C).

4) Logistics
- Request additional portable radios (10) and first-aid kits (50).

5) Safety
- Heat stress precautions; hydration and shade rotations.
- PPE: eye protection, gloves; follow SOP for crowd management.

6) Comms
- Primary: Command Net; Alt: TAC-2.

Prepared by: Planning Section
Approved by: Unified Command`);
                          setShowSitrep(true);
                        }}
                        className="ml-2 flex items-center gap-2"
                      >
                        <Sparkles className="w-4 h-4" />
                        Generate SITREP
                      </Button>
                    )}
                  </div>

                </div>
                {pastOperationalPeriods.length > 0 && (
                  <div className="flex items-center gap-3 mt-3">
                    {/* Past Period Dropdown */}
                    <Select value={viewingPastPeriod?.id || 'current'} onValueChange={handleViewPastPeriod}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="current">Current Period ({currentOperationalPeriod.number})</SelectItem>
                        {pastOperationalPeriods.map((period) => (
                          <SelectItem key={period.id} value={period.id}>
                            Period {period.number} (Completed)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Operations and Planning Tabs */}
          <Tabs value={currentTab} className="flex-1 flex flex-col" onValueChange={(value) => setCurrentTab(value as 'operations' | 'planning')}>
            <div className="flex justify-center py-6 border-b border-border">
              <TabsList className="h-10 bg-card/50 p-1 flex rounded-xl border border-border/50 shadow-sm">
                <TabsTrigger 
                  value="operations" 
                  className="text-base w-128 py-1 h-7 rounded-lg transition-all duration-200 data-[state=active]:bg-green-600/80 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground data-[state=inactive]:hover:bg-muted/20"
                 >
                   Current Action Plan
                 </TabsTrigger>
                <TabsTrigger 
                  value="planning" 
                  className="text-base w-128 py-1 h-7 rounded-lg transition-all duration-200 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-md data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground data-[state=inactive]:hover:bg-muted/20"
                >
                  Next Action Plan
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Operations Tab Content */}
            <TabsContent value="operations" className="flex-1 flex flex-col">
              {/* Planning Content - Two Column Layout */}
              <div className="flex-1 flex gap-6 p-6">
                {/* Planning Phase Content - Left Column (50%) */}
                <div className="flex-1 w-1/2">
                  {renderCurrentPhase()}
                </div>
                
                {/* Common Operating Picture - Right Column (50%) */}
                <div className="w-1/2">
                  <Card className="sticky top-6">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        Common Operating Picture
                      </CardTitle>
                      <CardDescription>
                        Real-time situational awareness and incident overview
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="w-full h-[26rem] border border-border rounded-lg overflow-hidden mb-4">
                        <EsriMap />
                      </div>
                      
                      {/* Incident Details */}
                      <div className="space-y-3">
                        <div
                          className="bg-muted/30 p-3 rounded-lg cursor-pointer hover:bg-muted/40 transition-colors"
                          onClick={() => { 
                            window.dispatchEvent(new CustomEvent('threat-update', { detail: { type: 'High-Risk Drones Approaching TFR', severity: 'Response In Progress' } }));
                            window.dispatchEvent(new Event('add-cuas-points'));
                          }}
                        >
                          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Location</div>
                          <div className="font-medium">{incidentData.location}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Dialog open={showSitrep} onOpenChange={setShowSitrep}>
                <DialogContent className="sm:max-w-xl">
                  <DialogHeader>
                    <DialogTitle>SITREP Assistant</DialogTitle>
                    <DialogDescription>
                      Review, edit, and export the generated situation report.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3">
                    <Textarea
                      value={sitrepText ?? ''}
                      onChange={(e) => setSitrepText(e.target.value)}
                      className="min-h-[22rem]"
                    />
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => { if (sitrepText) navigator.clipboard?.writeText(sitrepText).catch(() => {}); }}
                      >
                        Copy to Clipboard
                      </Button>
                      <Button
                        onClick={() => {
                          const blob = new Blob([sitrepText ?? ''], { type: 'text/plain' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url; a.download = `SITREP-OP${displayedPeriod.number}.txt`;
                          document.body.appendChild(a); a.click(); a.remove();
                          URL.revokeObjectURL(url);
                        }}
                      >
                        Download .txt
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </TabsContent>

            {/* Planning Tab Content */}
            <TabsContent value="planning" className="flex-1 flex flex-col">
              {/* Planning Stepper - Now displayed below tabs */}
              <div className="border-b border-border">
                <PlanningPStepper
                  phases={displayedPeriod.phases}
                  currentPhaseId={currentPhaseId}
                  onPhaseSelect={setCurrentPhaseId}
                  operationalPeriodNumber={displayedPeriod.number}
                />
              </div>
              
              {/* Planning Content - Two Column Layout */}
              <div className="flex-1 flex gap-6 p-6">
                {/* Planning Phase Content - Left Column (50%) */}
                <div className="flex-1 w-1/2">
                  {renderCurrentPhase()}
                </div>
                
                {/* Common Operating Picture - Right Column (50%) */}
                <div className="w-1/2">
                  <Card className="sticky top-6">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        Common Operating Picture
                      </CardTitle>
                      <CardDescription>
                        Real-time situational awareness and incident overview
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="w-full h-[26rem] border border-border rounded-lg overflow-hidden mb-4">
                        <EsriMap />
                      </div>
                      
                      {/* Incident Details */}
                      <div className="space-y-3">
                        <div
                          className="bg-muted/30 p-3 rounded-lg cursor-pointer hover:bg-muted/40 transition-colors"
                          onClick={() => window.dispatchEvent(new CustomEvent('threat-update', { detail: { type: 'High-Risk Drones Approaching TFR', severity: 'Response In Progress' } }))}
                        >
                          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Location</div>
                          <div className="font-medium">{incidentData.location}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}