import React, { useState } from "react";
import clsx from "clsx";
import type { PatientList } from "@/utils/types";
import Card from "./Cards";

export default function PatientList({ cards }: PatientList) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="max-w-5xl mx-auto p-8 w-full ">
      <div
        onClick={() => setExpanded((prev) => !prev)}
        className={clsx(
          "relative cursor-pointer select-none transition-all duration-500 ease-in-out ",
          expanded
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
            : "h-[320px] flex flex-col items-center",
        )}
      >
        {cards.map((card, index) => {
          const isStacked = !expanded && index < 5;
          const style: React.CSSProperties | undefined = isStacked
            ? {
                position: "absolute",
                bottom: `${index * 12}px`,
                left: `${index * 8}px`,
                zIndex: 100 - index * 5,
              }
            : undefined;
          if (!expanded && !isStacked) return null;
          return (
            <div key={card.patient_id} style={style}>
              <Card key={card.patient_id} patient={card} />
            </div>
          );
        })}
      </div>
      <p className="mt-2 text-sm text-gray-500 italic select-none">
        Click the cards to {expanded ? "collapse to stack" : "expand to grid"}
      </p>
    </div>
  );
}
