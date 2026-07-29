"use client";

/**
 * Official cryptocurrency logo SVGs (paths from the MIT-licensed
 * cryptocurrency-icons set), rendered as small round badges.
 */

interface IconProps {
  className?: string;
}

export function BtcIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#F7931A" />
      <path
        fill="#FFF"
        d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z"
      />
    </svg>
  );
}

export function EthIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#627EEA" />
      <g fill="#FFF">
        <path fillOpacity=".602" d="M16.498 4v8.87l7.497 3.35z" />
        <path d="M16.498 4L9 16.22l7.498-3.35z" />
        <path fillOpacity=".602" d="M16.498 21.968v6.027L24 17.616z" />
        <path d="M16.498 27.995v-6.028L9 17.616z" />
        <path fillOpacity=".2" d="M16.498 20.573l7.497-4.353-7.497-3.348z" />
        <path fillOpacity=".602" d="M9 16.22l7.498 4.353v-7.701z" />
      </g>
    </svg>
  );
}

export function UsdtIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#26A17B" />
      <path
        fill="#FFF"
        d="M17.922 17.383v-.002c-.11.008-.677.042-1.942.042-1.01 0-1.721-.03-1.971-.042v.003c-3.888-.171-6.79-.848-6.79-1.658 0-.809 2.902-1.486 6.79-1.66v2.644c.254.018.982.061 1.988.061 1.207 0 1.812-.05 1.925-.06v-2.643c3.88.173 6.775.85 6.775 1.658 0 .81-2.895 1.485-6.775 1.657m0-3.59v-2.366h5.414V7.819H8.595v3.608h5.414v2.365c-4.4.202-7.709 1.074-7.709 2.118 0 1.044 3.309 1.915 7.709 2.118v7.582h3.913v-7.584c4.393-.202 7.694-1.073 7.694-2.116 0-1.043-3.301-1.914-7.694-2.117"
      />
    </svg>
  );
}

export function SolIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="sol-grad" x1="0" y1="32" x2="32" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#9945FF" />
          <stop offset="1" stopColor="#14F195" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="16" fill="#131313" />
      <g fill="url(#sol-grad)">
        <path d="M10.9 8.5a.9.9 0 01.64-.27h13.02c.4 0 .6.49.32.77l-2.78 2.77a.9.9 0 01-.64.27H8.44a.45.45 0 01-.32-.77L10.9 8.5z" />
        <path d="M10.9 20.23a.9.9 0 01.64-.26h13.02c.4 0 .6.48.32.77l-2.78 2.77a.9.9 0 01-.64.26H8.44a.45.45 0 01-.32-.77l2.78-2.77z" />
        <path d="M21.1 14.35a.9.9 0 00-.64-.27H7.44a.45.45 0 00-.32.77l2.78 2.77a.9.9 0 00.64.27h13.02c.4 0 .6-.49.32-.77l-2.78-2.77z" />
      </g>
    </svg>
  );
}

export function XmrIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#FFF" />
      <path
        fill="#F60"
        d="M16 3C8.82 3 3 8.82 3 16c0 1.434.23 2.814.658 4.105h3.889v-9.617L16 18.937l8.453-8.449v9.617h3.889A12.97 12.97 0 0029 16c0-7.18-5.82-13-13-13"
      />
      <path
        fill="#4C4C4C"
        d="M13.682 20.28l-3.687-3.687v6.86H4.784A12.99 12.99 0 0016 29a12.99 12.99 0 0011.216-6.546h-5.211v-6.86l-3.687 3.686-2.318 2.318-2.318-2.317z"
      />
    </svg>
  );
}

/** Simple branded round badge for currencies without a hand-drawn SVG. */
export function LetterIcon({
  label,
  color,
  className = "w-4 h-4",
}: IconProps & { label: string; color: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill={color} />
      <text
        x="16"
        y="21.5"
        textAnchor="middle"
        fontSize="15"
        fontWeight="800"
        fontFamily="system-ui, sans-serif"
        fill="#FFF"
      >
        {label}
      </text>
    </svg>
  );
}
