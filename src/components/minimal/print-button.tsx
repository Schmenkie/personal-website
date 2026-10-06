"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="flex min-h-11 cursor-pointer items-center bg-transparent p-0 text-left text-inherit"
    >
      Print / save as PDF
    </button>
  );
}
