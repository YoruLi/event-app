"use client";
import { NAV_LINKS } from "@/constants";
import Link from "next/link";
import React, { useEffect } from "react";
import { Svg } from "./ui/svg";

import { svgs } from "@/data/svgs";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

type IconType = keyof typeof svgs;
type NavLink = {
  label: string;
  route: string;
  icon: IconType;
};
const transition = {
  type: "tween",
  ease: "easeOut",
  duration: 0.15,
};
export default function MobileNavbar() {
  const pathname = usePathname();

  const [hoveredRect, setHoveredRect] = React.useState<DOMRect | null | undefined>(null);

  const navRef = React.useRef<HTMLDivElement>(null);
  const navRect = navRef.current?.getBoundingClientRect();

  const onEnterTab = React.useCallback(
    (e?: React.MouseEvent<Element> | React.FocusEvent<Element>, i?: number) => {
      if (!e) {
        const index = NAV_LINKS.findIndex((d) => d.route === pathname);
        const el = getLinkElement(index);
        return setHoveredRect(el?.getBoundingClientRect());
      }
      setHoveredRect(e.currentTarget.getBoundingClientRect());
    },
    [pathname]
  );
  useEffect(() => {
    onEnterTab();
  }, [onEnterTab]);

  const getLinkElement = (index: number) => {
    return document.querySelector(`[data-index="${index}"]`);
  };

  return (
    <>
      <nav
        ref={navRef}
        className=" fixed flex justify-evenly bg-background/30 border border-border  backdrop-blur-md  items-center  z-40 bottom-4 left-0 right-0 rounded-full max-w-sm  py-1 mx-auto w-full animate-fade-up !animate-delay-[2000ms] animate-once "
        style={{
          boxShadow: "0 0 4px rgba(0, 0, 0, 0.2 )",
        }}
        onMouseLeave={() => {
          onEnterTab();
        }}
      >
        {NAV_LINKS.map(({ label, route, icon }: NavLink, index) => {
          return (
            <Link
              data-index={index}
              href={route}
              key={route}
              onMouseEnter={(e) => {
                onEnterTab(e, index);
              }}
              className=" text-current px-6 py-[2px] bg-transparent transition-colors rounded"
            >
              {icon ? <Svg path={svgs[icon].path} viewBox={svgs[icon].viewBox} /> : label}

              {hoveredRect && navRect && (
                <motion.div
                  className="absolute top-0 left-0 rounded-md bg-muted -z-20 "
                  initial={{
                    x: hoveredRect.left - navRect.left,
                    y: hoveredRect.top - navRect.top,
                    width: hoveredRect.width,
                    height: hoveredRect.height,
                    opacity: 0,
                  }}
                  animate={{
                    x: hoveredRect.left - navRect.left,
                    y: hoveredRect.top - navRect.top,
                    width: hoveredRect.width,
                    height: hoveredRect.height,
                    opacity: 1,
                  }}
                  exit={{
                    x: hoveredRect.left - navRect.left,
                    y: hoveredRect.top - navRect.top,
                    width: hoveredRect.width,
                    height: hoveredRect.height,
                    opacity: 0,
                  }}
                  transition={transition}
                />
              )}

              {/* {hoveredRect && navRect && isHovered && (
                <motion.div
                  className="absolute top-0 left-0 rounded-md bg-zinc-200 dark:bg-zinc-800 -z-20 hover:opacity-100  transition-all"
                  style={{
                    translateX: hoveredRect.left - navRect.left,
                    translateY: hoveredRect.top - navRect.top,
                    width: hoveredRect.width,
                    height: hoveredRect.height,
                    opacity: 1,
                  }}
                />
              )} */}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
