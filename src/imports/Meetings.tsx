import svgPaths from "./svg-jlzcjmo8gu";

function Tab() {
  return (
    <div className="basis-0 grow h-[34px] min-h-px min-w-px relative shrink-0" data-name="Tab">
      <div aria-hidden="true" className="absolute border-[#02a3fe] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex gap-1 h-[34px] items-center justify-center p-[8px] relative w-full">
          <div className="font-['Open_Sans:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[#02a3fe] text-[12px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[18px] whitespace-pre">Meetings</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tab1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Tab">
      <div aria-hidden="true" className="absolute border-[#353a40] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex gap-1 items-center justify-center p-[8px] relative w-full">
          <div className="font-['Open_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#afb5bc] text-[12px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[18px] whitespace-pre">ICS Forms</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tabs() {
  return (
    <div className="content-stretch flex items-start justify-start relative shrink-0 w-full" data-name="Tabs">
      <div aria-hidden="true" className="absolute border-[#353a40] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Tab />
      <Tab1 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-col font-['Open_Sans:Bold',_sans-serif] font-bold items-center justify-start leading-[0] relative shrink-0 text-[#ffffff] w-[35px]">
      <div className="relative shrink-0 text-[20px] text-center w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[30px]">Jul</p>
      </div>
      <div className="relative shrink-0 text-[30px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[38px]">18</p>
      </div>
    </div>
  );
}

function Date() {
  return (
    <div className="bg-[#01669f] box-border content-stretch flex gap-2.5 h-[89px] items-center justify-center px-[22px] py-[7px] relative rounded-bl-[8px] rounded-tl-[8px] shrink-0 w-20" data-name="Date">
      <Frame28 />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-col gap-3 items-start justify-start leading-[0] relative shrink-0 text-[16px] w-[115px]" data-name="Content">
      <div className="font-['Open_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#ffffff] w-[246px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px]">Meeting Title - Initial Meeting</p>
      </div>
      <div className="font-['Open_Sans:Regular',_sans-serif] font-normal min-w-full relative shrink-0 text-[#afb5bc]" style={{ fontVariationSettings: "'wdth' 100", width: "min-content" }}>
        <p className="leading-[24px]">Time / Location</p>
      </div>
    </div>
  );
}

function Wrapper() {
  return (
    <div className="box-border content-stretch flex h-4 items-center justify-center px-1 py-0 relative shrink-0" data-name="wrapper">
      <div className="font-['Open_Sans:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#ffffff] text-[12px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[18px] whitespace-pre">More Info</p>
      </div>
    </div>
  );
}

function ButtonXs() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="Button/xs">
      <div className="box-border content-stretch flex gap-1 items-center justify-center overflow-clip p-[8px] relative">
        <Wrapper />
      </div>
      <div aria-hidden="true" className="absolute border border-[#6e757c] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(16,40,34,0.05)]" />
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[360px]" data-name="Content">
      <Content />
      <ButtonXs />
    </div>
  );
}

function Meeting() {
  return (
    <div className="bg-[#222529] content-stretch flex gap-3 h-[89px] items-center justify-start relative rounded-[8px] shrink-0 w-[468px]" data-name="Meeting">
      <Date />
      <Content1 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex flex-col font-['Open_Sans:Bold',_sans-serif] font-bold items-center justify-start leading-[0] relative shrink-0 text-[#ffffff] w-[35px]">
      <div className="relative shrink-0 text-[20px] text-center w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[30px]">Jul</p>
      </div>
      <div className="relative shrink-0 text-[30px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[38px]">20</p>
      </div>
    </div>
  );
}

function Date1() {
  return (
    <div className="bg-[#f04438] box-border content-stretch flex gap-2.5 h-[89px] items-center justify-center px-[22px] py-[7px] relative rounded-bl-[8px] rounded-tl-[8px] shrink-0 w-20" data-name="Date">
      <Frame29 />
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex flex-col gap-3 items-start justify-start leading-[0] relative shrink-0 text-[16px] w-[115px]" data-name="Content">
      <div className="font-['Open_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#ffffff] w-[263px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px]">Meeting Title</p>
      </div>
      <div className="font-['Open_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#afb5bc] w-[251px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px]">Meeting Type / Time / Location</p>
      </div>
    </div>
  );
}

function Wrapper1() {
  return (
    <div className="box-border content-stretch flex h-4 items-center justify-center px-1 py-0 relative shrink-0" data-name="wrapper">
      <div className="font-['Open_Sans:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#ffffff] text-[12px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[18px] whitespace-pre">More Info</p>
      </div>
    </div>
  );
}

function ButtonXs1() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="Button/xs">
      <div className="box-border content-stretch flex gap-1 items-center justify-center overflow-clip p-[8px] relative">
        <Wrapper1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#6e757c] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(16,40,34,0.05)]" />
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[360px]" data-name="Content">
      <Content2 />
      <ButtonXs1 />
    </div>
  );
}

function Meeting1() {
  return (
    <div className="bg-[#222529] content-stretch flex gap-3 h-[89px] items-center justify-start relative rounded-[8px] shrink-0 w-[468px]" data-name="Meeting">
      <Date1 />
      <Content3 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex flex-col font-['Open_Sans:Bold',_sans-serif] font-bold items-center justify-start leading-[0] relative shrink-0 text-[#ffffff] w-[35px]">
      <div className="relative shrink-0 text-[20px] text-center w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[30px]">Jul</p>
      </div>
      <div className="relative shrink-0 text-[30px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[38px]">24</p>
      </div>
    </div>
  );
}

function Date2() {
  return (
    <div className="bg-[#fec84b] box-border content-stretch flex gap-2.5 h-[89px] items-center justify-center px-[22px] py-[7px] relative rounded-bl-[8px] rounded-tl-[8px] shrink-0 w-20" data-name="Date">
      <Frame30 />
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex flex-col gap-3 items-start justify-start leading-[0] relative shrink-0 text-[16px] w-[115px]" data-name="Content">
      <div className="font-['Open_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#ffffff] w-[292px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px]">Meeting Title - Operations Briefing</p>
      </div>
      <div className="font-['Open_Sans:Regular',_sans-serif] font-normal min-w-full relative shrink-0 text-[#afb5bc]" style={{ fontVariationSettings: "'wdth' 100", width: "min-content" }}>
        <p className="leading-[24px]">Time / Location</p>
      </div>
    </div>
  );
}

function Wrapper2() {
  return (
    <div className="box-border content-stretch flex h-4 items-center justify-center px-1 py-0 relative shrink-0" data-name="wrapper">
      <div className="font-['Open_Sans:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#ffffff] text-[12px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[18px] whitespace-pre">More Info</p>
      </div>
    </div>
  );
}

function ButtonXs2() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="Button/xs">
      <div className="box-border content-stretch flex gap-1 items-center justify-center overflow-clip p-[8px] relative">
        <Wrapper2 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#6e757c] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(16,40,34,0.05)]" />
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[360px]" data-name="Content">
      <Content4 />
      <ButtonXs2 />
    </div>
  );
}

function Meeting2() {
  return (
    <div className="bg-[#222529] content-stretch flex gap-3 h-[89px] items-center justify-start relative rounded-[8px] shrink-0 w-[468px]" data-name="Meeting">
      <Date2 />
      <Content5 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex flex-col font-['Open_Sans:Bold',_sans-serif] font-bold items-center justify-start leading-[0] relative shrink-0 text-[#ffffff] w-[35px]">
      <div className="relative shrink-0 text-[20px] text-center w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[30px]">Jul</p>
      </div>
      <div className="relative shrink-0 text-[30px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[38px]">24</p>
      </div>
    </div>
  );
}

function Date3() {
  return (
    <div className="bg-[#353a40] box-border content-stretch flex gap-2.5 h-[89px] items-center justify-center px-[22px] py-[7px] relative rounded-bl-[8px] rounded-tl-[8px] shrink-0 w-20" data-name="Date">
      <Frame31 />
    </div>
  );
}

function Content6() {
  return (
    <div className="content-stretch flex flex-col gap-3 items-start justify-start leading-[0] relative shrink-0 text-[16px] w-[115px]" data-name="Content">
      <div className="font-['Open_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#ffffff] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px]">Meeting Title</p>
      </div>
      <div className="font-['Open_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#afb5bc] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px]">Time / Location</p>
      </div>
    </div>
  );
}

function Wrapper3() {
  return (
    <div className="box-border content-stretch flex h-4 items-center justify-center px-1 py-0 relative shrink-0" data-name="wrapper">
      <div className="font-['Open_Sans:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#ffffff] text-[12px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[18px] whitespace-pre">More Info</p>
      </div>
    </div>
  );
}

function ButtonXs3() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="Button/xs">
      <div className="box-border content-stretch flex gap-1 items-center justify-center overflow-clip p-[8px] relative">
        <Wrapper3 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#6e757c] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(16,40,34,0.05)]" />
    </div>
  );
}

function Content7() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[360px]" data-name="Content">
      <Content6 />
      <ButtonXs3 />
    </div>
  );
}

function Meeting3() {
  return (
    <div className="bg-[#222529] content-stretch flex gap-3 h-[89px] items-center justify-start relative rounded-[8px] shrink-0 w-[468px]" data-name="Meeting">
      <Date3 />
      <Content7 />
    </div>
  );
}

function Insights() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="Insights">
      <div className="overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start px-4 py-0 relative size-full">
          <div className="font-['Open_Sans:SemiBold',_sans-serif] font-semibold leading-[0] min-w-full relative shrink-0 text-[#ffffff] text-[16px]" style={{ width: "min-content", fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[24px]">Upcoming Meetings</p>
          </div>
          <Meeting />
          <Meeting1 />
          <Meeting2 />
          <Meeting3 />
        </div>
      </div>
    </div>
  );
}

function Add() {
  return (
    <div className="relative shrink-0 size-5" data-name="add">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="add">
          <mask height="20" id="mask0_16002_469" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="20" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="20" id="Bounding box" width="20" />
          </mask>
          <g mask="url(#mask0_16002_469)">
            <g id="vector">
              <path d={svgPaths.p37361200} fill="var(--fill-0, white)" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function Wrapper4() {
  return (
    <div className="box-border content-stretch flex items-center justify-center px-1 py-0 relative shrink-0" data-name="wrapper">
      <div className="font-['Open_Sans:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#ffffff] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px] whitespace-pre">New Meeting</p>
      </div>
    </div>
  );
}

function ButtonSm() {
  return (
    <div className="bg-[#01669f] box-border content-stretch flex gap-1 items-center justify-center overflow-clip p-[8px] relative rounded-[4px] shadow-[0px_1px_2px_0px_rgba(16,40,34,0.05)] shrink-0" data-name="Button/sm">
      <Add />
      <Wrapper4 />
    </div>
  );
}

function Approve() {
  return (
    <div className="basis-0 content-stretch flex gap-2.5 grow items-center justify-end min-h-px min-w-px relative shrink-0" data-name="Approve">
      <ButtonSm />
    </div>
  );
}

function Controls() {
  return (
    <div className="relative shrink-0 w-full" data-name="Controls">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-2.5 items-center justify-start p-[16px] relative w-full">
          <Approve />
        </div>
      </div>
    </div>
  );
}

export default function Meetings() {
  return (
    <div className="bg-[#090909] box-border content-stretch flex flex-col gap-5 items-start justify-start pb-0 pt-2 px-0 relative size-full" data-name="Meetings">
      <div aria-hidden="true" className="absolute border-[#353a40] border-[0px_0px_0px_1px] border-solid bottom-0 left-[-1px] pointer-events-none right-0 top-0" />
      <Tabs />
      <Insights />
      <Controls />
    </div>
  );
}