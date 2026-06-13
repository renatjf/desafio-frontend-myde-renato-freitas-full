"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface MobileInboxShellProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export function MobileInboxShell({ sidebar, children }: MobileInboxShellProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isChatOpen = mounted && pathname !== "/inbox" && pathname.startsWith("/inbox/");

  return (
    <div className="md:hidden" style={{ height: "100dvh", overflow: "hidden", position: "relative" }}>
      <div
        className="flex flex-col absolute inset-0"
        style={{ visibility: isChatOpen ? "hidden" : "visible", pointerEvents: isChatOpen ? "none" : "auto" }}
      >
        {sidebar}
      </div>

      <div
        className="flex flex-col absolute inset-0"
        style={{ visibility: isChatOpen ? "visible" : "hidden", pointerEvents: isChatOpen ? "auto" : "none" }}
      >
        {children}
      </div>
    </div>
  );
}
