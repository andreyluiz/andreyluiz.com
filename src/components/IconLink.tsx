import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";

interface IconLinkProps {
  icon: string;
  href: string;
  target?: string;
  rel?: string;
  className?: string;
  iconClassName?: string;
}

export default function IconLink({ icon, href, target, rel, className, iconClassName }: IconLinkProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={cn("text-neutral-400 hover:text-neutral-500 transition-colors", className)}
    >
      <Icon icon={icon} className={cn("size-8", iconClassName)} />
    </a>
  );
}
