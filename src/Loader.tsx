import { cn } from "@/lib/utils";

export const Loader = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("animate-spin stroke-slate-300 stroke w-[70px] h-[70px]", className)}
    >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
);
