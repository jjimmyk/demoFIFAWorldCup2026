import svgPaths from "./svg-cgzzpa18fl";
import imgCapsule from "figma:asset/371be526cb6c078a2a123792205d9842b99edd6d.png";
import imgCapsule1 from "figma:asset/eae313a48883a46e7a2a60ee806e73a8052191be.png";

function Capsule() {
  return (
    <div className="relative shrink-0 size-14" data-name="Capsule">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 56 56"
      >
        <g id="Capsule">
          <path
            d={svgPaths.p29a8a500}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Top() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-11 items-start justify-start p-0 relative shrink-0"
      data-name="Top"
    >
      <Capsule />
    </div>
  );
}

function MenuIconLogo() {
  return (
    <div
      className="bg-gradient-to-r box-border content-stretch flex flex-col from-[#02a3fe] from-[8.524%] gap-8 items-center justify-center overflow-clip p-[8px] relative shrink-0 size-16 to-[#6876ee] to-[94.739%]"
      data-name="Menu-icon-Logo"
    >
      <Top />
    </div>
  );
}

function LeftControl() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row gap-4 items-center justify-start left-0 p-0 top-0"
      data-name="left control"
    >
      <MenuIconLogo />
      <div
        className="font-['Open_Sans:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#ffffff] text-[16px] text-center text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[24px] whitespace-pre">{`Patrick’s Dashboard `}</p>
      </div>
    </div>
  );
}

function TopMessage() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-start justify-center p-0 relative shrink-0"
      data-name="Top Message"
    >
      <div
        className="font-['Open_Sans:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#ffffff] text-[12px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[18px] whitespace-pre">Wed Jan 10</p>
      </div>
    </div>
  );
}

function TimeZone01() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['Open_Sans:Regular',_sans-serif] font-normal gap-1 items-center justify-start leading-[0] p-0 relative shrink-0 text-center text-nowrap"
      data-name="TimeZone01"
    >
      <div
        className="relative shrink-0 text-[#ffffff] text-[14px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-none text-nowrap whitespace-pre">11:42</p>
      </div>
      <div
        className="flex flex-col justify-center relative shrink-0 text-[#afb5bc] text-[12px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-none text-nowrap whitespace-pre">
          CEST/GMT+2
        </p>
      </div>
    </div>
  );
}

function Time() {
  return (
    <div
      className="bg-[#222529] box-border content-stretch flex flex-col gap-2 items-start justify-center px-3 py-2 relative rounded shrink-0"
      data-name="Time"
    >
      <TimeZone01 />
    </div>
  );
}

function TimeZone() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-[13px] items-center justify-center p-0 relative rounded-md shrink-0"
      data-name="TimeZone"
    >
      <TopMessage />
      <Time />
    </div>
  );
}

function QuestionCircle() {
  return (
    <div className="relative shrink-0 size-4" data-name="question-circle">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="question-circle">
          <g id="Vector">
            <path d={svgPaths.p230304a0} fill="white" />
            <path d={svgPaths.p87e3800} fill="white" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Wrapper() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-end p-0 relative shrink-0"
      data-name="wrapper"
    >
      <QuestionCircle />
    </div>
  );
}

function Capsule1() {
  return (
    <div
      className="bg-center bg-cover bg-no-repeat h-[46px] rounded-[72px] shrink-0 w-11"
      data-name="Capsule"
      style={{ backgroundImage: `url('${imgCapsule}'), url('${imgCapsule1}')` }}
    />
  );
}

function RightControl() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row gap-4 h-16 items-center justify-end left-[1115px] p-0 top-0"
      data-name="right control"
    >
      <TimeZone />
      <Wrapper />
      <Capsule1 />
    </div>
  );
}

function TopNavLogo() {
  return (
    <div
      className="absolute bg-[#353a40] h-16 left-0 top-0 w-[1440px]"
      data-name="Top Nav & Logo"
    >
      <LeftControl />
      <RightControl />
    </div>
  );
}

function Check() {
  return (
    <div className="relative shrink-0 size-6" data-name="check">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="check">
          <mask
            height="24"
            id="mask0_1_3058"
            maskUnits="userSpaceOnUse"
            style={{ maskType: "alpha" }}
            width="24"
            x="0"
            y="0"
          >
            <rect
              fill="var(--fill-0, #D9D9D9)"
              height="24"
              id="Bounding box"
              width="24"
            />
          </mask>
          <g mask="url(#mask0_1_3058)">
            <g id="vector">
              <path d={svgPaths.p6ea2300} fill="var(--fill-0, #02A3FE)" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function StepperNumberLocal() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-[10px] relative rounded-3xl shrink-0 size-6"
      data-name="_Stepper Number local"
    >
      <div
        aria-hidden="true"
        className="absolute border border-[#02a3fe] border-solid inset-0 pointer-events-none rounded-3xl"
      />
      <Check />
    </div>
  );
}

function Wrapper1() {
  return (
    <div
      className="box-border content-stretch flex flex-row h-4 items-center justify-center px-1 py-0 relative shrink-0"
      data-name="wrapper"
    >
      <div
        className="flex flex-col font-['Open_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#afb5bc] text-[12px] text-left w-[139px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[18px]">Enter Organization Info</p>
      </div>
    </div>
  );
}

function Step() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0"
      data-name="Step"
    >
      <StepperNumberLocal />
      <Wrapper1 />
    </div>
  );
}

function Divider() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2.5 grow items-start justify-start min-h-px min-w-px px-[11px] py-0 relative shrink-0"
      data-name="Divider"
    >
      <div className="flex h-full items-center justify-center relative shrink-0">
        <div className="flex-none h-full rotate-[180deg] scale-y-[-100%]">
          <div className="h-full relative w-px" data-name="previous">
            <div
              aria-hidden="true"
              className="absolute border border-[#02a3fe] border-solid inset-0 pointer-events-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StepConnection() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-1.5 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Step & Connection"
    >
      <Step />
      <Divider />
    </div>
  );
}

function Check1() {
  return (
    <div className="relative shrink-0 size-6" data-name="check">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="check">
          <mask
            height="24"
            id="mask0_1_3058"
            maskUnits="userSpaceOnUse"
            style={{ maskType: "alpha" }}
            width="24"
            x="0"
            y="0"
          >
            <rect
              fill="var(--fill-0, #D9D9D9)"
              height="24"
              id="Bounding box"
              width="24"
            />
          </mask>
          <g mask="url(#mask0_1_3058)">
            <g id="vector">
              <path d={svgPaths.p6ea2300} fill="var(--fill-0, #02A3FE)" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function StepperNumberLocal1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-[10px] relative rounded-3xl shrink-0 size-6"
      data-name="_Stepper Number local"
    >
      <div
        aria-hidden="true"
        className="absolute border border-[#02a3fe] border-solid inset-0 pointer-events-none rounded-3xl"
      />
      <Check1 />
    </div>
  );
}

function Wrapper2() {
  return (
    <div
      className="box-border content-stretch flex flex-row h-4 items-center justify-center px-1 py-0 relative shrink-0"
      data-name="wrapper"
    >
      <div
        className="flex flex-col font-['Open_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#afb5bc] text-[12px] text-left w-[139px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[18px]">{`Set Strategic Objectives `}</p>
      </div>
    </div>
  );
}

function Step1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0"
      data-name="Step"
    >
      <StepperNumberLocal1 />
      <Wrapper2 />
    </div>
  );
}

function Divider1() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2.5 grow items-start justify-start min-h-px min-w-px px-[11px] py-0 relative shrink-0"
      data-name="Divider"
    >
      <div className="flex h-full items-center justify-center relative shrink-0">
        <div className="flex-none h-full rotate-[180deg] scale-y-[-100%]">
          <div className="h-full relative w-px" data-name="previous">
            <div
              aria-hidden="true"
              className="absolute border border-[#02a3fe] border-solid inset-0 pointer-events-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StepConnection1() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-1.5 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Step & Connection"
    >
      <Step1 />
      <Divider1 />
    </div>
  );
}

function Check2() {
  return (
    <div className="relative shrink-0 size-6" data-name="check">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="check">
          <mask
            height="24"
            id="mask0_1_3058"
            maskUnits="userSpaceOnUse"
            style={{ maskType: "alpha" }}
            width="24"
            x="0"
            y="0"
          >
            <rect
              fill="var(--fill-0, #D9D9D9)"
              height="24"
              id="Bounding box"
              width="24"
            />
          </mask>
          <g mask="url(#mask0_1_3058)">
            <g id="vector">
              <path d={svgPaths.p6ea2300} fill="var(--fill-0, #02A3FE)" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function StepperNumberLocal2() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-[10px] relative rounded-3xl shrink-0 size-6"
      data-name="_Stepper Number local"
    >
      <div
        aria-hidden="true"
        className="absolute border border-[#02a3fe] border-solid inset-0 pointer-events-none rounded-3xl"
      />
      <Check2 />
    </div>
  );
}

function Wrapper3() {
  return (
    <div
      className="box-border content-stretch flex flex-row h-4 items-center justify-center px-1 py-0 relative shrink-0"
      data-name="wrapper"
    >
      <div
        className="flex flex-col font-['Open_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#afb5bc] text-[12px] text-left w-[139px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[18px]">Manage Members</p>
      </div>
    </div>
  );
}

function Step2() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0"
      data-name="Step"
    >
      <StepperNumberLocal2 />
      <Wrapper3 />
    </div>
  );
}

function Divider2() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2.5 grow items-start justify-start min-h-px min-w-px px-[11px] py-0 relative shrink-0"
      data-name="Divider"
    >
      <div className="flex h-full items-center justify-center relative shrink-0">
        <div className="flex-none h-full rotate-[180deg] scale-y-[-100%]">
          <div className="h-full relative w-px" data-name="previous">
            <div
              aria-hidden="true"
              className="absolute border border-[#02a3fe] border-solid inset-0 pointer-events-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StepConnection2() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-1.5 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Step & Connection"
    >
      <Step2 />
      <Divider2 />
    </div>
  );
}

function Check3() {
  return (
    <div className="relative shrink-0 size-6" data-name="check">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="check">
          <mask
            height="24"
            id="mask0_1_3058"
            maskUnits="userSpaceOnUse"
            style={{ maskType: "alpha" }}
            width="24"
            x="0"
            y="0"
          >
            <rect
              fill="var(--fill-0, #D9D9D9)"
              height="24"
              id="Bounding box"
              width="24"
            />
          </mask>
          <g mask="url(#mask0_1_3058)">
            <g id="vector">
              <path d={svgPaths.p6ea2300} fill="var(--fill-0, #02A3FE)" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function StepperNumberLocal3() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-[10px] relative rounded-3xl shrink-0 size-6"
      data-name="_Stepper Number local"
    >
      <div
        aria-hidden="true"
        className="absolute border border-[#02a3fe] border-solid inset-0 pointer-events-none rounded-3xl"
      />
      <Check3 />
    </div>
  );
}

function Wrapper4() {
  return (
    <div
      className="box-border content-stretch flex flex-row h-4 items-center justify-center px-1 py-0 relative shrink-0"
      data-name="wrapper"
    >
      <div
        className="flex flex-col font-['Open_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#afb5bc] text-[12px] text-left w-[139px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[18px]">Form Teams</p>
      </div>
    </div>
  );
}

function Step3() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0"
      data-name="Step"
    >
      <StepperNumberLocal3 />
      <Wrapper4 />
    </div>
  );
}

function Divider3() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2.5 grow items-start justify-start min-h-px min-w-px px-[11px] py-0 relative shrink-0"
      data-name="Divider"
    >
      <div className="flex h-full items-center justify-center relative shrink-0">
        <div className="flex-none h-full rotate-[180deg] scale-y-[-100%]">
          <div className="h-full relative w-px" data-name="previous">
            <div
              aria-hidden="true"
              className="absolute border border-[#02a3fe] border-solid inset-0 pointer-events-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StepConnection3() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-1.5 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Step & Connection"
    >
      <Step3 />
      <Divider3 />
    </div>
  );
}

function Check4() {
  return (
    <div className="relative shrink-0 size-6" data-name="check">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="check">
          <mask
            height="24"
            id="mask0_1_3058"
            maskUnits="userSpaceOnUse"
            style={{ maskType: "alpha" }}
            width="24"
            x="0"
            y="0"
          >
            <rect
              fill="var(--fill-0, #D9D9D9)"
              height="24"
              id="Bounding box"
              width="24"
            />
          </mask>
          <g mask="url(#mask0_1_3058)">
            <g id="vector">
              <path d={svgPaths.p6ea2300} fill="var(--fill-0, #02A3FE)" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function StepperNumberLocal4() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-[10px] relative rounded-3xl shrink-0 size-6"
      data-name="_Stepper Number local"
    >
      <div
        aria-hidden="true"
        className="absolute border border-[#02a3fe] border-solid inset-0 pointer-events-none rounded-3xl"
      />
      <Check4 />
    </div>
  );
}

function Wrapper5() {
  return (
    <div
      className="box-border content-stretch flex flex-row h-4 items-center justify-center px-1 py-0 relative shrink-0"
      data-name="wrapper"
    >
      <div
        className="flex flex-col font-['Open_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#afb5bc] text-[12px] text-left w-[139px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[18px]">Define AORs</p>
      </div>
    </div>
  );
}

function Step4() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0"
      data-name="Step"
    >
      <StepperNumberLocal4 />
      <Wrapper5 />
    </div>
  );
}

function Divider4() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2.5 grow items-start justify-start min-h-px min-w-px px-[11px] py-0 relative shrink-0"
      data-name="Divider"
    >
      <div className="flex h-full items-center justify-center relative shrink-0">
        <div className="flex-none h-full rotate-[180deg] scale-y-[-100%]">
          <div className="h-full relative w-px" data-name="previous">
            <div
              aria-hidden="true"
              className="absolute border border-[#02a3fe] border-solid inset-0 pointer-events-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StepConnection4() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-1.5 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Step & Connection"
    >
      <Step4 />
      <Divider4 />
    </div>
  );
}

function StepperNumberLocal5() {
  return (
    <div
      className="bg-[#01669f] box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-[10px] relative rounded-3xl shrink-0 size-6"
      data-name="_Stepper Number local"
    >
      <div
        className="flex flex-col font-['Open_Sans:Bold',_sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[#ffffff] text-[12px] text-center w-2"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[18px]">6</p>
      </div>
    </div>
  );
}

function Wrapper6() {
  return (
    <div
      className="box-border content-stretch flex flex-row h-4 items-center justify-center px-1 py-0 relative shrink-0"
      data-name="wrapper"
    >
      <div
        className="flex flex-col font-['Open_Sans:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#ffffff] text-[12px] text-left w-[139px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[18px]">Upload Documentation</p>
      </div>
    </div>
  );
}

function Step5() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0"
      data-name="Step"
    >
      <StepperNumberLocal5 />
      <Wrapper6 />
    </div>
  );
}

function StepConnection5() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-1.5 items-start justify-start p-0 relative shrink-0"
      data-name="Step & Connection"
    >
      <Step5 />
    </div>
  );
}

function Steps() {
  return (
    <div className="h-[424px] relative shrink-0 w-full" data-name="Steps">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1.5 h-[424px] items-start justify-start pb-0 pt-6 px-4 relative w-full">
          <StepConnection />
          <StepConnection1 />
          <StepConnection2 />
          <StepConnection3 />
          <StepConnection4 />
          <StepConnection5 />
        </div>
      </div>
    </div>
  );
}

function Info() {
  return (
    <div className="relative shrink-0 size-4" data-name="info">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="info">
          <mask
            height="16"
            id="mask0_1_3054"
            maskUnits="userSpaceOnUse"
            style={{ maskType: "alpha" }}
            width="16"
            x="0"
            y="0"
          >
            <rect
              fill="var(--fill-0, #D9D9D9)"
              height="16"
              id="Bounding box"
              width="16"
            />
          </mask>
          <g mask="url(#mask0_1_3054)">
            <g id="vector">
              <path d={svgPaths.p82c5500} fill="var(--fill-0, white)" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function Title() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1.5 items-center justify-start p-0 relative shrink-0"
      data-name="Title"
    >
      <Info />
      <div
        className="font-['Open_Sans:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#ffffff] text-[12px] text-left w-[145px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[18px]">Helper</p>
      </div>
    </div>
  );
}

function Action() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-start p-0 relative shrink-0"
      data-name="action"
    >
      <div
        className="font-['Open_Sans:SemiBold',_sans-serif] font-semibold leading-[0] overflow-ellipsis overflow-hidden relative shrink-0 text-[#02a3fe] text-[12px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="[text-overflow:inherit] block leading-[18px] overflow-inherit whitespace-pre">
          Dismiss
        </p>
      </div>
    </div>
  );
}

function Actions() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-start p-0 relative shrink-0"
      data-name="Actions"
    >
      <Action />
    </div>
  );
}

function Text() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Text"
    >
      <Title />
      <div
        className="font-['Open_Sans:Regular',_sans-serif] font-normal leading-[0] min-w-full relative shrink-0 text-[#afb5bc] text-[12px] text-left"
        style={{ fontVariationSettings: "'wdth' 100", width: "min-content" }}
      >
        <p className="block leading-[18px]">
          Upload key documents and link them to the appropriate teams or
          workspaces, ensuring accurate labels.
        </p>
      </div>
      <Actions />
    </div>
  );
}

function Helper() {
  return (
    <div
      className="basis-0 bg-[#353a40] grow min-h-px min-w-px relative rounded-lg shrink-0"
      data-name="Helper"
    >
      <div className="overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col gap-[13px] items-start justify-start pb-5 pt-4 px-3 relative w-full">
          <Text />
        </div>
      </div>
    </div>
  );
}

function HelperContainer() {
  return (
    <div
      className="h-[184px] relative shrink-0 w-full"
      data-name="Helper Container"
    >
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-3 h-[184px] items-center justify-start pb-4 pt-0 px-4 relative w-full">
          <Helper />
        </div>
      </div>
    </div>
  );
}

function WizardNav() {
  return (
    <div
      className="bg-[#222529] box-border content-stretch flex flex-col h-[713px] items-start justify-between pb-0 pt-1 px-0 relative rounded-bl-[4px] rounded-tl-[4px] shrink-0 w-[221px]"
      data-name="Wizard Nav"
    >
      <Steps />
      <HelperContainer />
    </div>
  );
}

function ArrowBack() {
  return (
    <div className="relative shrink-0 size-4" data-name="arrow_back">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="arrow_back">
          <mask
            height="16"
            id="mask0_1_3042"
            maskUnits="userSpaceOnUse"
            style={{ maskType: "alpha" }}
            width="16"
            x="0"
            y="0"
          >
            <rect
              fill="var(--fill-0, #D9D9D9)"
              height="16"
              id="Bounding box"
              width="16"
            />
          </mask>
          <g mask="url(#mask0_1_3042)">
            <g id="vectir">
              <path d={svgPaths.p228d6580} fill="var(--fill-0, white)" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function ButtonXs() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-start justify-center overflow-clip p-[4px] relative rounded shadow-[0px_1px_2px_0px_rgba(16,40,34,0.05)] shrink-0"
      data-name="Button/xs"
    >
      <ArrowBack />
    </div>
  );
}

function Steps1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-start p-0 relative shrink-0"
      data-name="Steps"
    >
      <div
        className="flex flex-col font-['Open_Sans:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#afb5bc] text-[12px] text-left text-nowrap uppercase"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[18px] whitespace-pre">Step 6/6</p>
      </div>
    </div>
  );
}

function Breadcrumbs() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-start p-0 relative shrink-0"
      data-name="Breadcrumbs"
    >
      <Steps1 />
    </div>
  );
}

function Steps2() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-3 items-center justify-start p-0 relative shrink-0"
      data-name="Steps"
    >
      <ButtonXs />
      <Breadcrumbs />
    </div>
  );
}

function Help() {
  return (
    <div className="relative shrink-0 size-4" data-name="help">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="help">
          <mask
            height="16"
            id="mask0_1_3080"
            maskUnits="userSpaceOnUse"
            style={{ maskType: "alpha" }}
            width="16"
            x="0"
            y="0"
          >
            <rect
              fill="var(--fill-0, #D9D9D9)"
              height="16"
              id="Bounding box"
              width="16"
            />
          </mask>
          <g mask="url(#mask0_1_3080)">
            <g id="vector">
              <path d={svgPaths.p24ca3410} fill="var(--fill-0, white)" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function Wrapper7() {
  return (
    <div
      className="box-border content-stretch flex flex-row h-4 items-center justify-center px-1 py-0 relative shrink-0"
      data-name="wrapper"
    >
      <div
        className="font-['Open_Sans:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#ffffff] text-[12px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[18px] whitespace-pre">Need Help?</p>
      </div>
    </div>
  );
}

function ButtonXs1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-center justify-start overflow-clip px-0 py-2 relative rounded shadow-[0px_1px_2px_0px_rgba(16,40,34,0.05)] shrink-0"
      data-name="Button/xs"
    >
      <Help />
      <Wrapper7 />
    </div>
  );
}

function Header() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-between overflow-clip p-0 relative shrink-0 w-full"
      data-name="Header"
    >
      <Steps2 />
      <ButtonXs1 />
    </div>
  );
}

function Title1() {
  return (
    <div
      className="box-border content-stretch flex flex-col font-['Open_Sans:SemiBold',_sans-serif] font-semibold gap-1.5 items-start justify-start leading-[0] overflow-clip p-0 relative shrink-0 text-left w-full"
      data-name="Title"
    >
      <div
        className="relative shrink-0 text-[#ffffff] text-[24px] text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[32px] whitespace-pre">
          Upload Documentation
        </p>
      </div>
      <div
        className="relative shrink-0 text-[#afb5bc] text-[14px] w-[737px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[20px]">
          Upload essential organization files to centralize document access and
          maintain a repository of key information
        </p>
      </div>
    </div>
  );
}

function CloudUpload() {
  return (
    <div className="relative shrink-0 size-[59px]" data-name="cloud_upload">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 59 59"
      >
        <g id="cloud_upload">
          <mask
            height="59"
            id="mask0_1_3084"
            maskUnits="userSpaceOnUse"
            style={{ maskType: "alpha" }}
            width="59"
            x="0"
            y="0"
          >
            <rect
              fill="var(--fill-0, #D9D9D9)"
              height="59"
              id="Bounding box"
              width="59"
            />
          </mask>
          <g mask="url(#mask0_1_3084)">
            <g id="vector">
              <path d={svgPaths.p382bb4f2} fill="var(--fill-0, #AFB5BC)" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function Description() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-1.5 items-start justify-start leading-[0] p-0 relative shrink-0"
      data-name="Description"
    >
      <div
        className="font-['Open_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#02a3fe] text-[14px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[20px] whitespace-pre">
          Drag and Drop to Upload
        </p>
      </div>
      <div
        className="font-['Open_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#afb5bc] text-[12px] text-center w-[162px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[18px]">(Up to 10 files at a time)</p>
      </div>
    </div>
  );
}

function IconDescription() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-2.5 items-center justify-start p-0 top-1/2 translate-x-[-50%] translate-y-[-50%]"
      data-name="Icon & Description"
      style={{ left: "calc(50% - 0.25px)" }}
    >
      <CloudUpload />
      <Description />
    </div>
  );
}

function ArrowDropDown() {
  return (
    <div className="relative shrink-0 size-5" data-name="arrow_drop_down">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="arrow_drop_down">
          <mask
            height="20"
            id="mask0_1_3046"
            maskUnits="userSpaceOnUse"
            style={{ maskType: "alpha" }}
            width="20"
            x="0"
            y="0"
          >
            <rect
              fill="var(--fill-0, #D9D9D9)"
              height="20"
              id="Bounding box"
              width="20"
            />
          </mask>
          <g mask="url(#mask0_1_3046)">
            <g id="vector">
              <path d={svgPaths.p1889d880} fill="var(--fill-0, #AFB5BC)" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function Input() {
  return (
    <div className="relative rounded shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start px-3 py-2 relative w-full">
          <div
            className="font-['Open_Sans:Italic',_sans-serif] font-normal italic leading-[0] relative shrink-0 text-[#afb5bc] text-[14px] text-left text-nowrap"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            <p className="block leading-[20px] whitespace-pre">
              File Associated With
            </p>
          </div>
          <ArrowDropDown />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-[#353a40] border-solid inset-0 pointer-events-none rounded shadow-[0px_1px_2px_0px_rgba(16,40,34,0.05)]"
      />
    </div>
  );
}

function InputSm() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-1 items-start justify-start p-0 relative shrink-0"
      data-name="Input/sm"
    >
      <Input />
    </div>
  );
}

function Wrapper8() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center px-1 py-0 relative shrink-0"
      data-name="wrapper"
    >
      <div
        className="font-['Open_Sans:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[20px] whitespace-pre">Upload</p>
      </div>
    </div>
  );
}

function ButtonSm() {
  return (
    <div
      className="bg-[#222529] relative rounded shrink-0"
      data-name="Button/sm"
    >
      <div className="box-border content-stretch flex flex-row gap-1 items-center justify-center overflow-clip p-[8px] relative">
        <Wrapper8 />
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-[#353a40] border-solid inset-0 pointer-events-none rounded shadow-[0px_1px_2px_0px_rgba(16,40,34,0.05)]"
      />
    </div>
  );
}

function Buttons() {
  return (
    <div
      className="absolute bottom-px box-border content-stretch flex flex-row h-[46px] items-center justify-between left-0 pb-3 pt-0 px-3 w-[420px]"
      data-name="Buttons"
    >
      <InputSm />
      <ButtonSm />
    </div>
  );
}

function DragNDrop() {
  return (
    <div
      className="basis-0 grow min-h-px min-w-px relative rounded shrink-0 w-full"
      data-name="drag n drop"
    >
      <div className="overflow-clip relative size-full">
        <IconDescription />
        <Buttons />
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-[#01476f] border-dashed inset-0 pointer-events-none rounded"
      />
    </div>
  );
}

function Wrapper9() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['Open_Sans:SemiBold',_sans-serif] font-semibold gap-6 items-center justify-center leading-[0] p-0 relative shrink-0 text-[#afb5bc] text-[14px] text-left text-nowrap"
      data-name="wrapper"
    >
      <div
        className="relative shrink-0"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[20px] text-nowrap whitespace-pre">
          20MB max
        </p>
      </div>
      <div
        className="relative shrink-0"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[20px] text-nowrap whitespace-pre">{`PNG, JPEG, PDF, EXCEL, TXT are supported `}</p>
      </div>
    </div>
  );
}

function Buttons1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="buttons"
    >
      <Wrapper9 />
    </div>
  );
}

function UploadFrame() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-3 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0 w-full"
      data-name="Upload Frame"
    >
      <DragNDrop />
      <Buttons1 />
    </div>
  );
}

function Field() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-6 grow h-full items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Field"
    >
      <UploadFrame />
    </div>
  );
}

function NameSize() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-start justify-start leading-[0] p-0 relative shrink-0 text-[12px] text-left text-nowrap"
      data-name="Name + Size"
    >
      <div
        className="font-['Open_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#ffffff]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[18px] text-nowrap whitespace-pre">
          WHO-WHE-CPI-2018.48 v1-eng.pdf
        </p>
      </div>
      <div
        className="font-['Open_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#afb5bc]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[18px] text-nowrap whitespace-pre">
          48.4 MB
        </p>
      </div>
    </div>
  );
}

function Close() {
  return (
    <div className="relative shrink-0 size-5" data-name="close">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="close">
          <mask
            height="20"
            id="mask0_1_3017"
            maskUnits="userSpaceOnUse"
            style={{ maskType: "alpha" }}
            width="20"
            x="0"
            y="0"
          >
            <rect
              fill="var(--fill-0, #D9D9D9)"
              height="20"
              id="Bounding box"
              width="20"
            />
          </mask>
          <g mask="url(#mask0_1_3017)">
            <g id="vector">
              <path d={svgPaths.p37b3c730} fill="var(--fill-0, white)" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function DocNameClose() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-between pb-3 pt-0 px-0 relative shrink-0 w-full"
      data-name="Doc name & close"
    >
      <NameSize />
      <Close />
    </div>
  );
}

function ClickToView() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['Open_Sans:SemiBold',_sans-serif] font-semibold gap-1 items-start justify-start leading-[0] p-0 relative shrink-0 text-[12px] text-left text-nowrap"
      data-name="Click to View"
    >
      <div
        className="relative shrink-0 text-[#afb5bc]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[18px] text-nowrap whitespace-pre">-</p>
      </div>
      <div
        className="relative shrink-0 text-[#02a3fe]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[18px] text-nowrap whitespace-pre">
          Click to View
        </p>
      </div>
    </div>
  );
}

function StatusMessage() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-start justify-start p-0 relative shrink-0"
      data-name="Status message"
    >
      <div
        className="font-['Open_Sans:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[#afb5bc] text-[12px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[18px] whitespace-pre">
          Uploading Complete
        </p>
      </div>
      <ClickToView />
    </div>
  );
}

function ProgressBar() {
  return (
    <div
      className="basis-0 grow h-2 min-h-px min-w-px relative rounded-lg shrink-0"
      data-name="Progress bar"
    >
      <div
        className="absolute bg-[#353a40] h-2 left-0 right-[-0.5px] rounded top-0"
        data-name="Background"
      />
      <div
        className="absolute bg-[#12b76a] h-2 left-0 right-0 rounded top-0"
        data-name="Progress"
      />
    </div>
  );
}

function ProgressBar1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-3 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Progress bar"
    >
      <ProgressBar />
      <div
        className="flex flex-col font-['Open_Sans:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[20px] whitespace-pre">100%</p>
      </div>
    </div>
  );
}

function FileUploader() {
  return (
    <div
      className="bg-[#222529] relative rounded shrink-0 w-full"
      data-name="File Uploader"
    >
      <div className="overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-start px-4 py-3 relative w-full">
          <DocNameClose />
          <StatusMessage />
          <ProgressBar1 />
        </div>
      </div>
    </div>
  );
}

function NameSize1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-start justify-start leading-[0] p-0 relative shrink-0 text-[12px] text-left text-nowrap"
      data-name="Name + Size"
    >
      <div
        className="font-['Open_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#ffffff]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[18px] text-nowrap whitespace-pre">
          WHO-WHE-CPI-2018.48 v2-eng.pdf
        </p>
      </div>
      <div
        className="font-['Open_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#afb5bc]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[18px] text-nowrap whitespace-pre">
          48.4 MB
        </p>
      </div>
    </div>
  );
}

function Close1() {
  return (
    <div className="relative shrink-0 size-5" data-name="close">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="close">
          <mask
            height="20"
            id="mask0_1_3017"
            maskUnits="userSpaceOnUse"
            style={{ maskType: "alpha" }}
            width="20"
            x="0"
            y="0"
          >
            <rect
              fill="var(--fill-0, #D9D9D9)"
              height="20"
              id="Bounding box"
              width="20"
            />
          </mask>
          <g mask="url(#mask0_1_3017)">
            <g id="vector">
              <path d={svgPaths.p37b3c730} fill="var(--fill-0, white)" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function DocNameClose1() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-between pb-3 pt-0 px-0 relative shrink-0 w-full"
      data-name="Doc name & close"
    >
      <NameSize1 />
      <Close1 />
    </div>
  );
}

function StatusMessage1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-start justify-start p-0 relative shrink-0"
      data-name="Status message"
    >
      <div
        className="font-['Open_Sans:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[#afb5bc] text-[12px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[18px] whitespace-pre">Uploading</p>
      </div>
    </div>
  );
}

function ProgressBar2() {
  return (
    <div
      className="basis-0 grow h-2 min-h-px min-w-px relative rounded-lg shrink-0"
      data-name="Progress bar"
    >
      <div
        className="absolute bg-[#353a40] h-2 left-0 right-[-0.5px] rounded top-0"
        data-name="Background"
      />
      <div
        className="absolute bg-[#02a3fe] h-2 left-0 right-[49.63%] rounded top-0"
        data-name="Progress"
      />
    </div>
  );
}

function ProgressBar3() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-3 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Progress bar"
    >
      <ProgressBar2 />
      <div
        className="flex flex-col font-['Open_Sans:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[20px] whitespace-pre">50%</p>
      </div>
    </div>
  );
}

function FileUploader1() {
  return (
    <div
      className="bg-[#222529] relative rounded shrink-0 w-full"
      data-name="File Uploader"
    >
      <div className="overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-start px-4 py-3 relative w-full">
          <DocNameClose1 />
          <StatusMessage1 />
          <ProgressBar3 />
        </div>
      </div>
    </div>
  );
}

function NameSize2() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-start justify-start leading-[0] p-0 relative shrink-0 text-[12px] text-left text-nowrap"
      data-name="Name + Size"
    >
      <div
        className="font-['Open_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#ffffff]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[18px] text-nowrap whitespace-pre">
          WHO-WHE-CPI-2018.48 v3-eng.pdf
        </p>
      </div>
      <div
        className="font-['Open_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#afb5bc]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[18px] text-nowrap whitespace-pre">
          48.4 MB
        </p>
      </div>
    </div>
  );
}

function Close2() {
  return (
    <div className="relative shrink-0 size-5" data-name="close">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="close">
          <mask
            height="20"
            id="mask0_1_3017"
            maskUnits="userSpaceOnUse"
            style={{ maskType: "alpha" }}
            width="20"
            x="0"
            y="0"
          >
            <rect
              fill="var(--fill-0, #D9D9D9)"
              height="20"
              id="Bounding box"
              width="20"
            />
          </mask>
          <g mask="url(#mask0_1_3017)">
            <g id="vector">
              <path d={svgPaths.p37b3c730} fill="var(--fill-0, white)" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function DocNameClose2() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-between pb-3 pt-0 px-0 relative shrink-0 w-full"
      data-name="Doc name & close"
    >
      <NameSize2 />
      <Close2 />
    </div>
  );
}

function StatusMessage2() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-start justify-start p-0 relative shrink-0"
      data-name="Status message"
    >
      <div
        className="font-['Open_Sans:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[#afb5bc] text-[12px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[18px] whitespace-pre">In Queue</p>
      </div>
    </div>
  );
}

function SliderBar() {
  return (
    <div
      className="absolute bg-[#353a40] h-2 left-0 right-[1.5px] rounded top-0"
      data-name="Slider/Bar"
    />
  );
}

function ProgressBar4() {
  return (
    <div
      className="basis-0 grow h-2 min-h-px min-w-px relative rounded-lg shrink-0"
      data-name="Progress bar"
    >
      <SliderBar />
      <div
        className="absolute bg-[#02a3fe] h-2 left-0 right-[89.93%] rounded top-0"
        data-name="Progress"
      />
    </div>
  );
}

function ProgressBar5() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-3 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Progress bar"
    >
      <ProgressBar4 />
      <div
        className="flex flex-col font-['Open_Sans:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[20px] whitespace-pre">0%</p>
      </div>
    </div>
  );
}

function FileUploader2() {
  return (
    <div
      className="bg-[#222529] relative rounded shrink-0 w-full"
      data-name="File Uploader"
    >
      <div className="overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-start px-4 py-3 relative w-full">
          <DocNameClose2 />
          <StatusMessage2 />
          <ProgressBar5 />
        </div>
      </div>
    </div>
  );
}

function Uploads() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-2.5 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Uploads"
    >
      <FileUploader />
      <FileUploader1 />
      {[...Array(2).keys()].map((_, i) => (
        <FileUploader2 key={i} />
      ))}
    </div>
  );
}

function Content() {
  return (
    <div
      className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full"
      data-name="Content"
    >
      <div className="box-border content-stretch flex flex-row gap-4 items-start justify-start overflow-clip pb-4 pt-0 px-0 relative size-full">
        <Field />
        <Uploads />
      </div>
      <div
        aria-hidden="true"
        className="absolute border-[#353a40] border-[0px_0px_1px] border-solid inset-0 pointer-events-none"
      />
    </div>
  );
}

function Wrapper10() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center px-1 py-0 relative shrink-0"
      data-name="wrapper"
    >
      <div
        className="font-['Open_Sans:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[20px] whitespace-pre">Skip</p>
      </div>
    </div>
  );
}

function ButtonSm1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-center justify-center overflow-clip px-0 py-2 relative rounded shadow-[0px_1px_2px_0px_rgba(16,40,34,0.05)] shrink-0"
      data-name="Button/sm"
    >
      <Wrapper10 />
    </div>
  );
}

function Wrapper11() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center px-1 py-0 relative shrink-0"
      data-name="wrapper"
    >
      <div
        className="font-['Open_Sans:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[20px] whitespace-pre">Save Progress</p>
      </div>
    </div>
  );
}

function ButtonSm2() {
  return (
    <div className="relative rounded shrink-0" data-name="Button/sm">
      <div className="box-border content-stretch flex flex-row gap-1 items-center justify-center overflow-clip p-[8px] relative">
        <Wrapper11 />
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-[#6e757c] border-solid inset-0 pointer-events-none rounded shadow-[0px_1px_2px_0px_rgba(16,40,34,0.05)]"
      />
    </div>
  );
}

function Wrapper12() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center px-1 py-0 relative shrink-0"
      data-name="wrapper"
    >
      <div
        className="font-['Open_Sans:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[20px] whitespace-pre">Save and Finish</p>
      </div>
    </div>
  );
}

function ButtonSm3() {
  return (
    <div
      className="bg-[#01669f] box-border content-stretch flex flex-row gap-1 items-center justify-center overflow-clip p-[8px] relative rounded shadow-[0px_1px_2px_0px_rgba(16,40,34,0.05)] shrink-0"
      data-name="Button/sm"
    >
      <Wrapper12 />
    </div>
  );
}

function Left() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-center justify-end p-0 relative shrink-0"
      data-name="Left"
    >
      <ButtonSm2 />
      <ButtonSm3 />
    </div>
  );
}

function Buttons2() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-between overflow-clip pb-0 pt-3 px-0 relative shrink-0 w-full"
      data-name="Buttons"
    >
      <ButtonSm1 />
      <Left />
    </div>
  );
}

function ContentTitle() {
  return (
    <div
      className="basis-0 bg-[#14171a] grow min-h-px min-w-px relative self-stretch shrink-0"
      data-name="Content  & Title"
    >
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-6 items-start justify-start px-8 py-6 relative size-full">
          <Header />
          <Title1 />
          <Content />
          <Buttons2 />
        </div>
      </div>
    </div>
  );
}

function Wizard() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-start justify-start overflow-clip p-0 rounded-lg top-[148px] w-[1142px]"
      data-name="Wizard"
      style={{ left: "calc(8.333% + 29px)" }}
    >
      <WizardNav />
      <ContentTitle />
    </div>
  );
}

function Content1() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="content"
    >
      <div
        className="font-['Open_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#afb5bc] text-[20px] text-left w-full"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[30px]">Create New Organization</p>
      </div>
    </div>
  );
}

function Close4() {
  return (
    <div className="relative shrink-0 size-5" data-name="close">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="close">
          <mask
            height="20"
            id="mask0_1_3017"
            maskUnits="userSpaceOnUse"
            style={{ maskType: "alpha" }}
            width="20"
            x="0"
            y="0"
          >
            <rect
              fill="var(--fill-0, #D9D9D9)"
              height="20"
              id="Bounding box"
              width="20"
            />
          </mask>
          <g mask="url(#mask0_1_3017)">
            <g id="vector">
              <path d={svgPaths.p37b3c730} fill="var(--fill-0, white)" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function ButtonSm4() {
  return (
    <div
      className="bg-[#222529] box-border content-stretch flex flex-row gap-1 items-center justify-center overflow-clip p-[8px] relative rounded shadow-[0px_1px_2px_0px_rgba(16,40,34,0.05)] shrink-0"
      data-name="Button/sm"
    >
      <Close4 />
    </div>
  );
}

function WizardHeader() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-start p-0 top-[92px] w-[1142px]"
      data-name="Wizard Header"
      style={{ left: "calc(8.333% + 29px)" }}
    >
      <Content1 />
      <ButtonSm4 />
    </div>
  );
}

export default function OrganizationSetupWizardUploadDocuments() {
  return (
    <div
      className="bg-[#090909] relative size-full"
      data-name="Organization/Setup Wizard/Upload Documents"
    >
      <TopNavLogo />
      <Wizard />
      <WizardHeader />
    </div>
  );
}