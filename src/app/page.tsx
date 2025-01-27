import IconLink from '@/components/IconLink';
import Image from 'next/image';

export const metadata = {
  title: 'Andrey Luiz | Home',
  description: 'Software Engineer',
};

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="flex flex-col items-center space-y-6">
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
        <div className="flex space-x-6">
          <IconLink
            icon="mdi:github"
            href="https://github.com/andreyluiz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-neutral-500 transition-colors"
          />
          <IconLink
            icon="mdi:linkedin"
            href="https://linkedin.com/in/andreyluiz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-neutral-500 transition-colors"
          />
          <IconLink
            icon="mdi:instagram"
            href="https://instagram.com/oandreyluiz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-neutral-500 transition-colors"
          />
          <IconLink
            icon="mdi:file-document-outline"
            href="https://cv.andreyluiz.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-neutral-500 transition-colors"
          />
        </div>
      </div>
    </main>
  );
}
