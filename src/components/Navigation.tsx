import IconLink from "./IconLink";

export function Navigation() {
  return (
    <nav className="container mx-auto flex items-center justify-between p-8">
      <div className="flex items-center gap-4">
        <IconLink
          icon="mdi:arrow-left"
          href="/"
          className="transition-all hover:translate-x-[-4px] p-4 -ml-6"
          iconClassName="size-6"
        />
        <span className="text-xl font-bold">Andrey Luiz</span>
      </div>
      <div className="flex gap-4">
        <IconLink
          icon="mdi:file-document-outline"
          href="https://cv.andreyluiz.com"
          target="_blank"
          rel="noopener noreferrer"
          title="CV"
        />
        <IconLink
          icon="mdi:briefcase"
          href="https://portfolio.andreyluiz.com"
          target="_blank"
          rel="noopener noreferrer"
          title="Portfolio"
        />
      </div>
    </nav>
  );
} 