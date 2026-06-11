import { cn } from "../../lib/utils";

export default function Separator({ className, ...props }) {
  return <div className={cn("h-px w-full bg-white/20", className)} {...props} />;
}
