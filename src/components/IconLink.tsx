import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";

interface IconLinkProps {
  icon: string;
  href: string;
  target: string;
  rel: string;
  className: string;
}

export default function IconLink({ icon, href, target, rel, className }: IconLinkProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={cn("text-neutral-400 hover:text-neutral-500 transition-colors", className)}
    >
      <Icon icon={icon} className="w-8 h-8" />
    </a>
  );
}
