import IconLink from "@/components/IconLink";
import Section from "@/components/Section";
import Image from "next/image";

export const metadata = {
  title: "Andrey Luiz | Home",
  description: "Software Engineer",
};

export default function Home() {
  return (
    <main className="container flex flex-col items-center justify-center p-8 pb-24 space-y-24">
      <div className="h-screen flex flex-col items-center justify-center space-y-6">
        {/* Profile Image */}
        <div className="w-72 h-72 rounded-full overflow-hidden border-4 border-neutral-200">
          <Image
            src="/profile.png"
            alt="Profile Picture"
            className="w-full h-full object-cover"
            width={1024}
            height={1024}
          />
        </div>

        {/* Name and Title */}
        <h1 className="text-6xl font-bold">Andrey Luiz</h1>
        <h2 className="text-4xl text-neutral-400">Software Engineer</h2>

        {/* Social Links */}
        <div className="flex space-x-6 pb-24">
          <IconLink
            icon="mdi:github"
            href="https://github.com/andreyluiz"
            target="_blank"
            rel="noopener noreferrer"
          />
          <IconLink
            icon="mdi:linkedin"
            href="https://linkedin.com/in/andreyluiz"
            target="_blank"
            rel="noopener noreferrer"
          />
          <IconLink
            icon="mdi:instagram"
            href="https://instagram.com/oandreyluiz"
            target="_blank"
            rel="noopener noreferrer"
          />
          <IconLink
            icon="mdi:file-document-outline"
            href="https://cv.andreyluiz.com"
            target="_blank"
            rel="noopener noreferrer"
          />
        </div>

        <IconLink
          icon="mdi:arrow-down"
          href="#about"
          className="transition-all duration-300 animate-bounce"
          iconClassName="text-neutral-200 size-12"
        />
      </div>

      <Section id="about" title="About Me">
        <p className="text-lg text-neutral-400 text-justify">
          I&apos;m a web developer with experience working in multiple countries. I
          started by learning core programming languages like HTML, CSS, and
          JavaScript, along with classic development tools. Over time, I shifted
          to modern frameworks like React and Svelte to build fast, interactive
          websites.
        </p>
        <p className="text-lg text-neutral-400 text-justify">
          I&apos;ve designed user interfaces for complex platforms, improved user
          engagement for online marketplaces, and optimized apps for unique
          devices like smart TVs. I&apos;ve also led large-scale system upgrades,
          ensuring smooth transitions and better performance.
        </p>
        <p className="text-lg text-neutral-400 text-justify">
          My focus is always on writing clean, practical code. I thrive in teams
          and stay curious—constantly learning and adapting to new challenges.
        </p>
      </Section>

      <Section id="posts" title="Latest posts">
        <p className="text-lg text-neutral-400 text-justify">
          Coming soon...
        </p>
      </Section>
    </main>
  );
}
