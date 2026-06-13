"use client";
import React from "react";

export default function Time({ iso }: { iso: string }) {
  try {
    const d = new Date(iso);
    return (
      <span>
        {d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
      </span>
    );
  } catch (e) {
    return <span />;
  }
}
