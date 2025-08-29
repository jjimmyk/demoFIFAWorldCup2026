import svgPaths from "./svg-4ab4ujrm1u";
import imgCapsule from "figma:asset/371be526cb6c078a2a123792205d9842b99edd6d.png";
import imgCapsule1 from "figma:asset/eae313a48883a46e7a2a60ee806e73a8052191be.png";

function Capsule() {
  return (
    <div className="relative shrink-0 size-14" data-name="Capsule">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56 56">
        <g id="Capsule">
          <path d={svgPaths.p29a8a500} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Top() {
  return (
    <div className="content-stretch flex flex-col gap-11 items-start justify-start relative shrink-0" data-name="Top">
      <Capsule />
    </div>
  );
}

function MenuIconLogo() {
  return (
    <div className="bg-gradient-to-r box-border content-stretch flex flex-col from-[#02a3fe] from-[8.524%] gap-8 items-center justify-center overflow-clip p-[8px] relative shrink-0 size-16 to-[#6876ee] to-[94.739%]" data-name="Menu-icon-Logo">
      <Top />
    </div>
  );
}

function OrgName() {
  return (
    <div className="content-stretch flex gap-1 items-center justify-start relative shrink-0" data-name="Org Name">
      <div className="font-['Open_Sans:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#ffffff] text-[16px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px] whitespace-pre">Demo Org</p>
      </div>
    </div>
  );
}

function LeftControl() {
  return (
    <div className="absolute content-stretch flex gap-4 items-center justify-start left-0 top-0" data-name="left control">
      <MenuIconLogo />
      <OrgName />
    </div>
  );
}

function Search() {
  return (
    <div className="relative shrink-0 size-4" data-name="search">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="search">
          <path d={svgPaths.p24e77f00} fill="var(--fill-0, #AFB5BC)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function NavbarSearchCollapsed() {
  return (
    <div className="absolute bg-[#222529] box-border content-stretch flex gap-2 items-center justify-start left-1/2 px-4 py-3 rounded-md top-1/2 translate-x-[-50%] translate-y-[-50%] w-[360px]" data-name="Navbar-Search / Collapsed">
      <Search />
      <div className="basis-0 font-['Open_Sans:Regular',_sans-serif] font-normal grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#afb5bc] text-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-none">Search</p>
      </div>
    </div>
  );
}

function TopMessage() {
  return (
    <div className="content-stretch flex flex-col gap-4 items-start justify-center relative shrink-0" data-name="Top Message">
      <div className="font-['Open_Sans:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#ffffff] text-[12px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[18px] whitespace-pre">Wed Jan 10</p>
      </div>
    </div>
  );
}

function TimeZone01() {
  return (
    <div className="content-stretch flex font-['Open_Sans:Regular',_sans-serif] font-normal gap-1 items-center justify-start leading-[0] relative shrink-0 text-center text-nowrap" data-name="TimeZone01">
      <div className="relative shrink-0 text-[#ffffff] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-none text-nowrap whitespace-pre">11:42</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-[#afb5bc] text-[12px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-none text-nowrap whitespace-pre">CEST/GMT+2</p>
      </div>
    </div>
  );
}

function Time() {
  return (
    <div className="bg-[#222529] box-border content-stretch flex flex-col gap-2 items-start justify-center px-3 py-2 relative rounded shrink-0" data-name="Time">
      <TimeZone01 />
    </div>
  );
}

function TimeZone() {
  return (
    <div className="content-stretch flex gap-[13px] items-center justify-center relative rounded-md shrink-0" data-name="TimeZone">
      <TopMessage />
      <Time />
    </div>
  );
}

function QuestionCircle() {
  return (
    <div className="relative shrink-0 size-4" data-name="question-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
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
    <div className="content-stretch flex gap-4 items-center justify-end relative shrink-0" data-name="wrapper">
      <QuestionCircle />
    </div>
  );
}

function Capsule1() {
  return <div className="bg-center bg-cover bg-no-repeat h-[46px] rounded-[72px] shrink-0 w-11" data-name="Capsule" style={{ backgroundImage: `url('${imgCapsule}'), url('${imgCapsule1}')` }} />;
}

function RightControl() {
  return (
    <div className="absolute content-stretch flex gap-4 h-16 items-center justify-end left-[1591px] top-0" data-name="right control">
      <TimeZone />
      <Wrapper />
      <Capsule1 />
    </div>
  );
}

function TopNavLogo() {
  return (
    <div className="absolute bg-[#353a40] h-16 left-0 top-0 w-[1920px]" data-name="Top Nav & Logo">
      <LeftControl />
      <NavbarSearchCollapsed />
      <RightControl />
    </div>
  );
}

export default function WaDefault() {
  return (
    <div className="bg-[#090909] relative size-full" data-name="WA- default">
      <TopNavLogo />
    </div>
  );
}