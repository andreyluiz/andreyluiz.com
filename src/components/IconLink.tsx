import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";

interface IconLinkProps {
  icon: string;
  href: string;
  target?: string;
  rel?: string;
  title?: string;
  className?: string;
  iconClassName?: string;
}

export default function IconLink({
  icon,
  href,
  target,
  rel,
  title,
  className,
  iconClassName,
}: IconLinkProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      title={title}
      className={cn(
        "text-neutral-400 hover:text-neutral-500 transition-colors flex flex-col items-center",
        className,
      )}
    >
      <Icon icon={icon} className={cn("size-8 text-center", iconClassName)} />
      {title && <span className="text-sm text-center">{title}</span>}
    </a>
  );
}
