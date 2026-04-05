"use client";

import { useState } from "react";

interface Props {
  text: string;
  maxLength?: number;
}

export default function ReadMore({ text, maxLength = 150 }: Props) {
  const [expanded, setExpanded] = useState(false);

  const isLong = text.length > maxLength;

  const displayedText = expanded
    ? text
    : text.slice(0, maxLength) + (isLong ? "..." : "");

  return (
    <div>
      <p>
        {displayedText}{" "}
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-gold-500 font-semibold mt-1 cursor-pointer"
          >
            {expanded ? "Less" : "More"}
          </button>
        )}
      </p>
    </div>
  );
}
