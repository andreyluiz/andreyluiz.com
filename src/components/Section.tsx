import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  id: string;
  title: string;
  className?: string;
}

export default function Section({ children, id, title, className }: SectionProps) {
  return (
    <section className={cn("flex flex-col space-y-6 max-w-2xl w-full", className)}>
      <h2 className="text-4xl font-bold" id={id}>
        {title}
      </h2>
      {children}
    </section>
  );
}
