import svgPaths from "./svg-5kk04naywq";

function Close() {
  return (
    <button className="block cursor-pointer relative shrink-0 size-6" data-name="close">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="close">
          <mask height="24" id="mask0_12001_963" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_12001_963)">
            <g id="vector">
              <path d={svgPaths.p23120bc0} fill="var(--fill-0, white)" />
            </g>
          </g>
        </g>
      </svg>
    </button>
  );
}

function TitleClose() {
  return (
    <div className="content-stretch flex items-start justify-start relative shrink-0 w-full" data-name="Title & Close">
      <div className="basis-0 font-['Open_Sans:SemiBold',_sans-serif] font-semibold grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#ffffff] text-[24px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px]">Create New Meeting</p>
      </div>
      <Close />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-col items-start justify-start relative shrink-0 w-full" data-name="content">
      <TitleClose />
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-full" data-name="Title">
      <Content />
    </div>
  );
}

function Title1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Title">
      <div className="flex flex-col justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2 items-start justify-center pb-4 pt-6 px-6 relative w-full">
          <Title />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#353a40] border-[0px_0px_1px] border-solid inset-0 pointer-events-none shadow-[0px_1px_2px_0px_rgba(16,40,34,0.05)]" />
    </div>
  );
}

function MeetingRoom() {
  return (
    <div className="relative shrink-0 size-6" data-name="meeting_room">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="meeting_room">
          <mask height="24" id="mask0_12001_921" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_12001_921)">
            <g id="vector">
              <path d={svgPaths.pad2e200} fill="var(--fill-0, white)" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function Input() {
  return (
    <div className="relative shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex gap-2 items-center justify-start px-3 py-2.5 relative w-full">
          <div className="basis-0 font-['Open_Sans:Italic',_sans-serif] font-normal grow italic leading-[0] min-h-px min-w-px relative shrink-0 text-[#afb5bc] text-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[24px]">Meeting Name</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#353a40] border-[0px_0px_1px] border-solid inset-0 pointer-events-none shadow-[0px_1px_2px_0px_rgba(16,40,34,0.05)]" />
    </div>
  );
}

function InputMd() {
  return (
    <div className="content-stretch flex flex-col gap-1 items-start justify-start relative shrink-0 w-[393px]" data-name="Input/md">
      <Input />
    </div>
  );
}

function Title2() {
  return (
    <div className="content-stretch flex gap-3 items-center justify-start relative shrink-0" data-name="Title">
      <MeetingRoom />
      <InputMd />
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex gap-2 items-center justify-start relative shrink-0" data-name="Content">
      <div className="font-['Open_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#afb5bc] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px] whitespace-pre">Meeting Type</p>
      </div>
    </div>
  );
}

function ArrowDropDown() {
  return (
    <div className="relative shrink-0 size-5" data-name="arrow_drop_down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="arrow_drop_down">
          <mask height="20" id="mask0_12001_971" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="20" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="20" id="Bounding box" width="20" />
          </mask>
          <g mask="url(#mask0_12001_971)">
            <g id="vector">
              <path d={svgPaths.p1889d880} fill="var(--fill-0, white)" />
              <path d={svgPaths.p1ee8e600} stroke="var(--stroke-0, white)" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function Input1() {
  return (
    <div className="box-border content-stretch flex gap-2 items-center justify-start px-3 py-2 relative rounded-[4px] shrink-0" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#353a40] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(16,40,34,0.05)]" />
      <Content1 />
      <ArrowDropDown />
    </div>
  );
}

function InputDropdownSm() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-1 grow items-end justify-end min-h-px min-w-px relative shrink-0" data-name="Input Dropdown/sm">
      <Input1 />
    </div>
  );
}

function Title3() {
  return (
    <div className="content-stretch flex gap-3 items-end justify-end relative shrink-0 w-full" data-name="Title">
      <Title2 />
      <InputDropdownSm />
    </div>
  );
}

function Groups() {
  return (
    <div className="relative shrink-0 size-6" data-name="groups">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="groups">
          <mask height="24" id="mask0_12001_959" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_12001_959)">
            <g id="vector">
              <path d={svgPaths.p1a06a200} fill="var(--fill-0, white)" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function Input2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex gap-2 items-center justify-start px-3 py-2.5 relative w-full">
          <div className="basis-0 font-['Open_Sans:Italic',_sans-serif] font-normal grow italic leading-[0] min-h-px min-w-px relative shrink-0 text-[#afb5bc] text-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[24px]">Invite Attendees</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#353a40] border-[0px_0px_1px] border-solid inset-0 pointer-events-none shadow-[0px_1px_2px_0px_rgba(16,40,34,0.05)]" />
    </div>
  );
}

function InputMd1() {
  return (
    <div className="content-stretch flex flex-col gap-1 items-start justify-start relative shrink-0 w-[393px]" data-name="Input/md">
      <Input2 />
    </div>
  );
}

function Invite() {
  return (
    <div className="content-stretch flex gap-3 items-center justify-start relative shrink-0" data-name="Invite">
      <Groups />
      <InputMd1 />
    </div>
  );
}

function Schedule() {
  return (
    <div className="relative shrink-0 size-6" data-name="schedule">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="schedule">
          <mask height="24" id="mask0_12001_967" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_12001_967)">
            <g id="vector">
              <path d={svgPaths.p9911600} fill="var(--fill-0, white)" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function CalendarMonth() {
  return (
    <div className="relative shrink-0 size-5" data-name="calendar_month">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="calendar_month">
          <mask height="20" id="mask0_12001_955" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="20" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="20" id="Bounding box" width="20" />
          </mask>
          <g mask="url(#mask0_12001_955)">
            <g id="vector">
              <path d={svgPaths.p35b9ac00} fill="var(--fill-0, #AFB5BC)" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex gap-2 items-center justify-start relative shrink-0" data-name="Content">
      <div className="font-['Open_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#afb5bc] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px] whitespace-pre">Select Date(s)</p>
      </div>
    </div>
  );
}

function ArrowDropDown1() {
  return (
    <div className="relative shrink-0 size-5" data-name="arrow_drop_down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="arrow_drop_down">
          <mask height="20" id="mask0_12001_971" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="20" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="20" id="Bounding box" width="20" />
          </mask>
          <g mask="url(#mask0_12001_971)">
            <g id="vector">
              <path d={svgPaths.p1889d880} fill="var(--fill-0, white)" />
              <path d={svgPaths.p1ee8e600} stroke="var(--stroke-0, white)" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function Input3() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#353a40] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(16,40,34,0.05)]" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-2 items-center justify-start px-3 py-2 relative w-full">
          <CalendarMonth />
          <Content2 />
          <ArrowDropDown1 />
        </div>
      </div>
    </div>
  );
}

function InputDropdownSm1() {
  return (
    <div className="content-stretch flex flex-col gap-1 items-start justify-start relative shrink-0" data-name="Input Dropdown/sm">
      <Input3 />
    </div>
  );
}

function Schedule1() {
  return (
    <div className="relative shrink-0 size-5" data-name="schedule">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="schedule">
          <mask height="20" id="mask0_12001_940" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="20" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="20" id="Bounding box" width="20" />
          </mask>
          <g mask="url(#mask0_12001_940)">
            <g id="vector">
              <path d={svgPaths.p39779980} fill="var(--fill-0, #AFB5BC)" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex gap-2 items-center justify-start relative shrink-0" data-name="Content">
      <Schedule1 />
      <div className="font-['Open_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#afb5bc] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px] whitespace-pre">Start</p>
      </div>
    </div>
  );
}

function ArrowDropDown2() {
  return (
    <div className="relative shrink-0 size-5" data-name="arrow_drop_down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="arrow_drop_down">
          <mask height="20" id="mask0_12001_971" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="20" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="20" id="Bounding box" width="20" />
          </mask>
          <g mask="url(#mask0_12001_971)">
            <g id="vector">
              <path d={svgPaths.p1889d880} fill="var(--fill-0, white)" />
              <path d={svgPaths.p1ee8e600} stroke="var(--stroke-0, white)" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function Input4() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#353a40] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(16,40,34,0.05)]" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-2 items-center justify-start px-3 py-2 relative w-full">
          <Content3 />
          <ArrowDropDown2 />
        </div>
      </div>
    </div>
  );
}

function InputDropdownSm2() {
  return (
    <div className="content-stretch flex flex-col gap-1 items-start justify-start relative shrink-0" data-name="Input Dropdown/sm">
      <Input4 />
    </div>
  );
}

function Schedule2() {
  return (
    <div className="relative shrink-0 size-5" data-name="schedule">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="schedule">
          <mask height="20" id="mask0_12001_940" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="20" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="20" id="Bounding box" width="20" />
          </mask>
          <g mask="url(#mask0_12001_940)">
            <g id="vector">
              <path d={svgPaths.p39779980} fill="var(--fill-0, #AFB5BC)" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex gap-2 items-center justify-start relative shrink-0 w-[60px]" data-name="Content">
      <Schedule2 />
      <div className="font-['Open_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#afb5bc] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px] whitespace-pre">End</p>
      </div>
    </div>
  );
}

function ArrowDropDown3() {
  return (
    <div className="relative shrink-0 size-5" data-name="arrow_drop_down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="arrow_drop_down">
          <mask height="20" id="mask0_12001_971" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="20" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="20" id="Bounding box" width="20" />
          </mask>
          <g mask="url(#mask0_12001_971)">
            <g id="vector">
              <path d={svgPaths.p1889d880} fill="var(--fill-0, white)" />
              <path d={svgPaths.p1ee8e600} stroke="var(--stroke-0, white)" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function Input5() {
  return (
    <div className="box-border content-stretch flex gap-2 items-center justify-start px-3 py-2 relative rounded-[4px] shrink-0" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#353a40] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(16,40,34,0.05)]" />
      <Content4 />
      <ArrowDropDown3 />
    </div>
  );
}

function InputDropdownSm3() {
  return (
    <div className="content-stretch flex flex-col gap-1 items-start justify-start relative shrink-0" data-name="Input Dropdown/sm">
      <Input5 />
    </div>
  );
}

function DateTime() {
  return (
    <div className="content-stretch flex gap-3 items-center justify-start relative shrink-0" data-name="Date/Time">
      <Schedule />
      <InputDropdownSm1 />
      <InputDropdownSm2 />
      <InputDropdownSm3 />
    </div>
  );
}

function LocationOn() {
  return (
    <div className="relative shrink-0 size-6" data-name="location_on">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="location_on">
          <mask height="24" id="mask0_12001_932" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_12001_932)">
            <path d={svgPaths.p16812c00} fill="var(--fill-0, white)" id="location_on_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Input6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex gap-2 items-center justify-start px-3 py-2.5 relative w-full">
          <div className="basis-0 font-['Open_Sans:Italic',_sans-serif] font-normal grow italic leading-[0] min-h-px min-w-px relative shrink-0 text-[#afb5bc] text-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[24px]">Meeting Location</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#353a40] border-[0px_0px_1px] border-solid inset-0 pointer-events-none shadow-[0px_1px_2px_0px_rgba(16,40,34,0.05)]" />
    </div>
  );
}

function InputMd2() {
  return (
    <div className="content-stretch flex flex-col gap-1 items-start justify-start relative shrink-0 w-[393px]" data-name="Input/md">
      <Input6 />
    </div>
  );
}

function Location() {
  return (
    <div className="content-stretch flex gap-3 items-center justify-start relative shrink-0" data-name="Location">
      <LocationOn />
      <InputMd2 />
    </div>
  );
}

function ToggleSm() {
  return (
    <div className="h-5 relative shrink-0 w-9" data-name="toggle/sm">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 20">
        <g id="toggle/sm">
          <g clipPath="url(#clip0_12001_914)">
            <g filter="url(#filter0_dd_12001_914)" id="Button">
              <circle cx="10" cy="10" fill="var(--fill-0, white)" r="8" />
            </g>
          </g>
          <rect height="19" rx="9.5" stroke="var(--stroke-0, white)" width="35" x="0.5" y="0.5" />
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="22" id="filter0_dd_12001_914" width="22" x="-1" y="0">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dy="1" />
            <feGaussianBlur stdDeviation="1.5" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.133333 0 0 0 0 0.133333 0 0 0 0 0.133333 0 0 0 0.1 0" />
            <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_12001_914" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dy="1" />
            <feGaussianBlur stdDeviation="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.133333 0 0 0 0 0.133333 0 0 0 0 0.133333 0 0 0 0.06 0" />
            <feBlend in2="effect1_dropShadow_12001_914" mode="normal" result="effect2_dropShadow_12001_914" />
            <feBlend in="SourceGraphic" in2="effect2_dropShadow_12001_914" mode="normal" result="shape" />
          </filter>
          <clipPath id="clip0_12001_914">
            <rect fill="white" height="20" rx="10" width="36" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Toggle() {
  return (
    <div className="basis-0 content-stretch flex gap-3 grow items-center justify-end min-h-px min-w-px relative shrink-0" data-name="Toggle">
      <ToggleSm />
      <div className="font-['Open_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#afb5bc] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px] whitespace-pre">In-Person Event</p>
      </div>
    </div>
  );
}

function Location1() {
  return (
    <div className="content-stretch flex gap-3 items-center justify-start relative shrink-0 w-full" data-name="Location">
      <Location />
      <Toggle />
    </div>
  );
}

function Link() {
  return (
    <div className="relative shrink-0 size-6" data-name="link">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="link">
          <mask height="24" id="mask0_12001_906" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_12001_906)">
            <g id="vector">
              <path d={svgPaths.p2c568780} fill="var(--fill-0, white)" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function Input7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex gap-2 items-center justify-start px-3 py-2.5 relative w-full">
          <div className="basis-0 font-['Open_Sans:Italic',_sans-serif] font-normal grow italic leading-[0] min-h-px min-w-px relative shrink-0 text-[#afb5bc] text-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[24px]">Virtual Meeting Link</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#353a40] border-[0px_0px_1px] border-solid inset-0 pointer-events-none shadow-[0px_1px_2px_0px_rgba(16,40,34,0.05)]" />
    </div>
  );
}

function InputMd3() {
  return (
    <div className="content-stretch flex flex-col gap-1 items-start justify-start relative shrink-0 w-[393px]" data-name="Input/md">
      <Input7 />
    </div>
  );
}

function MeetingLink() {
  return (
    <div className="content-stretch flex gap-3 items-center justify-start relative shrink-0" data-name="Meeting Link">
      <Link />
      <InputMd3 />
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 size-6" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame">
          <path d={svgPaths.p1409c400} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function AttachFile() {
  return (
    <div className="relative shrink-0 size-5" data-name="attach_file">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="attach_file">
          <mask height="20" id="mask0_12001_944" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="20" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="20" id="Bounding box" width="20" />
          </mask>
          <g mask="url(#mask0_12001_944)">
            <g id="vector">
              <path d={svgPaths.p179f8800} fill="var(--fill-0, white)" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function Wrapper() {
  return (
    <div className="box-border content-stretch flex h-4 items-center justify-center px-1 py-0 relative shrink-0" data-name="wrapper">
      <div className="font-['Open_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[12px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[18px] whitespace-pre">Attach</p>
      </div>
    </div>
  );
}

function ButtonXs() {
  return (
    <div className="absolute box-border content-stretch flex gap-1 items-center justify-start left-0 p-[8px] rounded-[4px] top-[130px]" data-name="Button/xs">
      <AttachFile />
      <Wrapper />
    </div>
  );
}

function Input8() {
  return (
    <div className="bg-[#222529] h-[166px] relative rounded-[4px] shrink-0 w-[608px]" data-name="Input">
      <div className="h-[166px] overflow-clip relative w-[608px]">
        <div className="absolute bg-[#353a40] h-9 left-0 top-[130px] w-[608px]" />
        <ButtonXs />
        <div className="absolute font-['Open_Sans:Regular',_sans-serif] font-normal h-[150px] leading-[0] left-3 text-[#afb5bc] text-[16px] top-2 w-[584px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[24px]">Enter a description...</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#353a40] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(16,40,34,0.05)]" />
    </div>
  );
}

function Desciption() {
  return (
    <div className="content-stretch flex gap-3 items-start justify-start relative shrink-0 w-full" data-name="Desciption">
      <Frame />
      <Input8 />
    </div>
  );
}

function Content5() {
  return (
    <div className="relative shrink-0 w-full" data-name="content">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-3 items-start justify-start pb-10 pt-6 px-6 relative w-full">
          <Title3 />
          <Invite />
          <DateTime />
          <Location1 />
          <MeetingLink />
          <Desciption />
        </div>
      </div>
    </div>
  );
}

function Wrapper2() {
  return (
    <div className="box-border content-stretch flex items-center justify-center px-1 py-0 relative shrink-0" data-name="wrapper">
      <div className="font-['Open_Sans:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#ffffff] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px] whitespace-pre">Cancel</p>
      </div>
    </div>
  );
}

function ButtonSm1() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="Button/sm">
      <div className="box-border content-stretch flex gap-1 items-center justify-center overflow-clip p-[8px] relative">
        <Wrapper2 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#6e757c] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(16,40,34,0.05)]" />
    </div>
  );
}

function Wrapper3() {
  return (
    <div className="box-border content-stretch flex items-center justify-center px-1 py-0 relative shrink-0" data-name="wrapper">
      <div className="font-['Open_Sans:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#ffffff] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px] whitespace-pre">Create</p>
      </div>
    </div>
  );
}

function ButtonSm2() {
  return (
    <div className="bg-[#01669f] box-border content-stretch flex gap-1 items-center justify-center overflow-clip p-[8px] relative rounded-[4px] shadow-[0px_1px_2px_0px_rgba(16,40,34,0.05)] shrink-0" data-name="Button/sm">
      <Wrapper3 />
    </div>
  );
}

function Actions() {
  return (
    <div className="basis-0 content-stretch flex gap-3 grow items-center justify-end min-h-px min-w-px relative shrink-0" data-name="actions">
      <ButtonSm1 />
      <ButtonSm2 />
    </div>
  );
}

function ModalActionbar() {
  return (
    <div className="bg-[#353a40] box-border content-stretch flex gap-4 items-center justify-end p-[16px] relative shrink-0 w-[692px]" data-name="Modal Actionbar">
      <Actions />
    </div>
  );
}

export default function CreateMeeting() {
  return (
    <div className="bg-[#222529] box-border content-stretch flex flex-col items-start justify-start overflow-clip relative rounded-[8px] shadow-[0px_4px_6px_-2px_rgba(34,34,34,0.03),0px_12px_16px_-4px_rgba(34,34,34,0.08)] size-full" data-name="Create Meeting">
      <Title1 />
      <Content5 />
      <ModalActionbar />
    </div>
  );
}