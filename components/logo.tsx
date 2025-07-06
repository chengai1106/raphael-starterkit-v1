import Link from "next/link";
import { Code2 } from "lucide-react";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 hover:opacity-90 transition-opacity"
    >
      <Code2 className="w-6 h-6" />
      <span className="font-bold text-lg">Raphael Starter</span>
    </Link>
  );
}
