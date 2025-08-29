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
      <div className="font-['Open_Sans:Regular',_sans-serif] font-normal min-w-full relative shrink-0 text-[#afb5bc]" style={{ width: "min-content", fontVariationSettings: "'wdth' 100" }}>
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

export default function Meeting() {
  return (
    <div className="bg-[#222529] content-stretch flex gap-3 items-center justify-start relative rounded-[8px] size-full" data-name="Meeting">
      <Date />
      <Content1 />
    </div>
  );
}