import { cn } from "@/lib/utils";
import { FC, SVGAttributes } from "react";

const Svg: FC<SVGAttributes<SVGSVGElement>> = ({
  className,
  path,
  viewBox,
  width,
  height,
  ...rest
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? "24"}
      height={height ?? "24"}
      viewBox={viewBox || "0 0 24 24"}
      className={cn("", className)}
      {...rest}
    >
      <path d={path}></path>
    </svg>
  );
};

Svg.displayName = "Svg";

export { Svg };
