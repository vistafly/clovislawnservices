# Marquee Component - Claude Code Instructions

Implement an infinite scrolling marquee banner using GSAP in this Next.js + Tailwind CSS project. Follow these steps exactly.

---

## Step 1: Install GSAP

Run:
```bash
npm install gsap
```

## Step 2: Create GSAP utility file

Create `src/lib/gsap.ts`:

```ts
"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
```

If this file already exists, skip this step.

## Step 3: Create the Marquee component

Create `src/components/ui/Marquee.tsx` with this exact code:

```tsx
"use client";

import { useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "@/lib/gsap";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
  className?: string;
  pauseOnHover?: boolean;
  scrollAcceleration?: boolean;
  maxSpeedMultiplier?: number;
  fadedEdges?: boolean;
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Marquee({
  children,
  speed = 50,
  direction = "left",
  className,
  pauseOnHover = true,
  scrollAcceleration = true,
  maxSpeedMultiplier = 4,
  fadedEdges = true,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const isPausedRef = useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current || !contentRef.current) return;
    const content = contentRef.current;

    const initTimeout = requestAnimationFrame(() => {
      const contentWidth = content.scrollWidth / 4;
      if (contentWidth === 0) return;

      tweenRef.current?.kill();
      gsap.set(content, { x: direction === "right" ? -contentWidth : 0 });

      tweenRef.current = gsap.to(content, {
        x: direction === "left" ? -contentWidth * 2 : contentWidth,
        duration: (contentWidth * 2) / speed,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => {
            const wrappedX = parseFloat(x) % contentWidth;
            return direction === "left" ? wrappedX : wrappedX - contentWidth;
          }),
        },
      });
    });

    let lastScrollY = window.scrollY;
    let currentSpeed = 1;
    let targetSpeed = 1;
    let rafId: number;
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const updateSpeed = () => {
      const diff = targetSpeed - currentSpeed;
      const lerpSpeed = diff > 0 ? 0.1 : 0.025;
      currentSpeed += diff * lerpSpeed;
      if (tweenRef.current && !isPausedRef.current) {
        tweenRef.current.timeScale(currentSpeed);
      }
      rafId = requestAnimationFrame(updateSpeed);
    };

    const handleScroll = () => {
      if (!scrollAcceleration) return;
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;
      const velocity = Math.min(delta / 15, 1);
      const easedVelocity = Math.pow(velocity, 0.8);
      targetSpeed = 1 + easedVelocity * (maxSpeedMultiplier - 1);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        targetSpeed = 1;
      }, 300);
    };

    rafId = requestAnimationFrame(updateSpeed);
    if (scrollAcceleration) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      cancelAnimationFrame(initTimeout);
      tweenRef.current?.kill();
      cancelAnimationFrame(rafId);
      clearTimeout(scrollTimeout);
      if (scrollAcceleration) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [speed, direction, scrollAcceleration, maxSpeedMultiplier]);

  const handleMouseEnter = () => {
    if (pauseOnHover && tweenRef.current) {
      isPausedRef.current = true;
      gsap.to(tweenRef.current, {
        timeScale: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover && tweenRef.current) {
      isPausedRef.current = false;
      gsap.to(tweenRef.current, {
        timeScale: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden whitespace-nowrap relative ${className || ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {fadedEdges && (
        <div
          className="absolute left-0 top-0 bottom-0 w-20 md:w-32 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, var(--fade-color, #1a1a1a) 0%, transparent 100%)",
          }}
        />
      )}
      {fadedEdges && (
        <div
          className="absolute right-0 top-0 bottom-0 w-20 md:w-32 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, var(--fade-color, #1a1a1a) 0%, transparent 100%)",
          }}
        />
      )}
      <div ref={contentRef} className="inline-flex will-change-transform">
        <div className="flex items-center shrink-0">{children}</div>
        <div className="flex items-center shrink-0">{children}</div>
        <div className="flex items-center shrink-0">{children}</div>
        <div className="flex items-center shrink-0">{children}</div>
      </div>
    </div>
  );
}
```

## Step 4: Add the marquee to the page

Import and use the Marquee component wherever a scrolling banner is needed. Example usage with a dark background band:

```tsx
import Marquee from "@/components/ui/Marquee";
import { Wrench, Paintbrush, Zap } from "lucide-react";

// Define the items to scroll
const marqueeItems = [
  { icon: Wrench, text: "PLUMBING" },
  { icon: Paintbrush, text: "PAINTING" },
  { icon: Zap, text: "ELECTRICAL" },
  { icon: Wrench, text: "DRYWALL" },
  { icon: Paintbrush, text: "FLOORING" },
  { icon: Zap, text: "CABINETS" },
];

// JSX - wrap in a dark container, set --fade-color to match background
<div
  className="w-full bg-[#1a1a1a] py-4"
  style={{ "--fade-color": "#1a1a1a" } as React.CSSProperties}
>
  <Marquee speed={20} maxSpeedMultiplier={6} className="text-white">
    {marqueeItems.map((item, i) => (
      <div key={i} className="flex items-center gap-3 mx-8">
        <item.icon className="w-5 h-5 text-red-600" />
        <span className="text-lg font-bold tracking-wider">{item.text}</span>
        <span className="text-red-600 mx-4">•</span>
      </div>
    ))}
  </Marquee>
</div>
```

## Customization notes

- `speed`: lower = slower scroll (20 is a good default)
- `maxSpeedMultiplier`: how much faster it goes when user scrolls the page (6 is punchy)
- `--fade-color` on the parent wrapper MUST match the background color for the edge fade to look right
- `direction`: set to `"right"` to reverse scroll direction
- `pauseOnHover`: set `false` to keep scrolling on hover
- `fadedEdges`: set `false` to remove the gradient fades
- Swap `lucide-react` icons for any icon library, or use plain text/emojis
- Change `text-red-600` to match the project's accent/primary color
- The component requires Tailwind CSS utility classes. If not using Tailwind, convert classes to equivalent CSS.

## Requirements

- Next.js 13+ (App Router with "use client" directives)
- React 18+
- GSAP 3 (`npm install gsap`)
- Tailwind CSS
- `@/lib/gsap` path alias must resolve (check tsconfig.json paths)
