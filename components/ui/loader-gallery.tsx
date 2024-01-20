import React from "react";

export default function Loading() {
  return (
    <>
      <ul
        className="grid gap-3 w-full"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))",
        }}
      >
        {[...Array(10).keys()].map((i) => (
          <li key={i}>
            <div
              className="h-[280px] w-full mx-auto rounded-xl bg-primary/10 animate-fade animate-delay-700"
              style={{
                animationDelay: `${200 * i}ms`,
              }}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
