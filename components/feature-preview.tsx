"use client";

import { useState, useRef, useEffect } from "react";

interface FeaturePreviewProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
  details: string[];
  preview?: string; // Optional image or illustration description
}

export function FeaturePreview({
  trigger,
  title,
  description,
  details,
}: FeaturePreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<"top" | "bottom">("bottom");
  const triggerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      // Determine position based on viewport
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        setPosition(spaceBelow < 300 ? "top" : "bottom");
      }
      setIsOpen(true);
    }, 300); // 300ms delay like main app
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(false);
  };

  return (
    <div
      ref={triggerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger element */}
      <div className="cursor-pointer">{trigger}</div>

      {/* Preview popup */}
      {isOpen && (
        <div
          className={`absolute z-50 w-80 p-5 bg-white rounded-xl shadow-2xl border border-gray-200 ${
            position === "top" ? "bottom-full mb-3" : "top-full mt-3"
          } left-1/2 -translate-x-1/2`}
        >
          {/* Arrow */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-gray-200 rotate-45 ${
              position === "top"
                ? "bottom-[-7px] border-r border-b"
                : "top-[-7px] border-l border-t"
            }`}
          />

          {/* Content */}
          <div className="relative">
            <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              {description}
            </p>

            {/* Detail list */}
            <ul className="space-y-2">
              {details.map((detail, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <svg
                    className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

// Pain point card that reveals solution on hover
interface PainSolutionCardProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  pain: string;
  solution: string;
}

export function PainSolutionCard({
  icon,
  iconBg,
  title,
  pain,
  solution,
}: PainSolutionCardProps) {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div
      className="p-6 rounded-2xl bg-gray-50 border border-gray-100 transition-all duration-300 hover:border-emerald-200 hover:bg-emerald-50/30 cursor-pointer group"
      onMouseEnter={() => setShowSolution(true)}
      onMouseLeave={() => setShowSolution(false)}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${showSolution ? "!bg-emerald-100" : ""}`}
        >
          <div
            className={`transition-colors duration-300 ${showSolution ? "text-emerald-600" : ""}`}
          >
            {icon}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            {title}
            {showSolution && (
              <span className="text-xs font-medium text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                How Nquir helps
              </span>
            )}
          </h3>
          <p
            className={`leading-relaxed transition-all duration-300 ${showSolution ? "text-gray-400 text-sm" : "text-gray-500"}`}
          >
            {pain}
          </p>
          {showSolution && (
            <p className="text-emerald-700 mt-3 text-sm leading-relaxed animate-fadeIn">
              → {solution}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
