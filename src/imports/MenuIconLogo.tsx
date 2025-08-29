import svgPaths from "./svg-ngsxexfdiu";

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

export default function MenuIconLogo() {
  return (
    <div
      className="bg-gradient-to-r from-[#02a3fe] from-[8.524%] relative size-full to-[#6876ee] to-[94.739%]"
      data-name="Menu-icon-Logo"
    >
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-8 items-center justify-center p-[8px] relative size-full">
          <Top />
        </div>
      </div>
    </div>
  );
}