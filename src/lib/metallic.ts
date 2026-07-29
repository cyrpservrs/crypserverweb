import type { CSSProperties } from "react";

/** Shared metallic green-gray styles (home-page look, site-wide) */

export const METALLIC_GREEN = "#8faa92";
export const METALLIC_GREEN_LIGHT = "#c8d4c9";
export const METALLIC_GREEN_DARK = "#4a6350";

export const metallicButtonStyle: CSSProperties = {
  background:
    "linear-gradient(145deg, #c8d4c9 0%, #7a9480 22%, #4a6350 48%, #6b8570 72%, #a8b8aa 100%)",
  border: "1px solid rgba(255,255,255,0.22)",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.35), 0 8px 24px rgba(0,0,0,0.35)",
  color: "#ffffff",
};

export const metallicButtonHoverShadow = "0 0 28px rgba(120, 160, 130, 0.35)";

export const metallicPillStyle: CSSProperties = {
  background:
    "linear-gradient(145deg, rgba(200,212,201,0.35) 0%, rgba(122,148,128,0.22) 30%, rgba(40,48,42,0.45) 55%, rgba(168,184,170,0.28) 100%)",
  border: "none",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.22)",
};

export const metallicBadgeStyle: CSSProperties = {
  background:
    "linear-gradient(145deg, rgba(200,212,201,0.28) 0%, rgba(74,99,80,0.35) 50%, rgba(168,184,170,0.22) 100%)",
  border: "1px solid rgba(255,255,255,0.12)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18)",
  color: METALLIC_GREEN_LIGHT,
};

export const metallicCardStyle: CSSProperties = {
  background:
    "linear-gradient(155deg, rgba(200,212,201,0.22) 0%, rgba(122,148,128,0.14) 22%, rgba(18,22,19,0.92) 48%, rgba(40,48,42,0.75) 72%, rgba(168,184,170,0.16) 100%)",
  border: "1px solid rgba(255,255,255,0.12)",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.16), inset 0 -1px 0 rgba(0,0,0,0.35), 0 12px 32px rgba(0,0,0,0.35)",
};
