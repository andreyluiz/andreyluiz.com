import IconLink from "@/components/IconLink";
import { PostList } from "@/components/PostList";
import Section from "@/components/Section";
import { groupPostsByDate } from "@/lib/posts";
import Image from "next/image";

export const metadata = {
  title: "Andrey Luiz | Home",
  description: "Software Engineer",
};

export default function Home() {
  const posts = groupPostsByDate();

  return (
			<main className="container flex flex-col items-center justify-center p-8 pb-24 space-y-24 mx-auto">
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
					<div className="flex gap-6 pb-24">
						<IconLink
							icon="mdi:github"
							href="https://github.com/andreyluiz"
							target="_blank"
							rel="noopener noreferrer"
							title="GitHub"
						/>
						<IconLink
							icon="mdi:linkedin"
							href="https://linkedin.com/in/andreyluiz"
							target="_blank"
							rel="noopener noreferrer"
							title="LinkedIn"
						/>
						<IconLink
							icon="mdi:instagram"
							href="https://instagram.com/oandreyluiz"
							target="_blank"
							rel="noopener noreferrer"
							title="Instagram"
						/>
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
							disabled
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
						I'm a senior full stack engineer with over nine years of experience
						working with JavaScript frameworks, Python, and AWS. I've built and
						launched products that improved reliability, boosted user
						engagement, and generated revenue across companies in Switzerland
						and beyond.
					</p>
					<p className="text-lg text-neutral-400 text-justify">
						In my past experiences, I led the development of decentralized apps and a staking
						game, helped integrate Clean Code features, and optimized app
						performance and Bluetooth reliability. My work has contributed to
						faster development cycles and successful international rollouts.
					</p>
					<p className="text-lg text-neutral-400 text-justify">
						I'm skilled in both frontend and backend technologies like React,
						SvelteKit, Node.js, Python, and Rust. I hold certifications in AWS and Rust
						programming. I'm based in Fribourg, Switzerland, and open to new
						challenges where I can create impactful digital experiences.
					</p>
				</Section>

				<Section id="posts" title="Latest posts">
					<PostList posts={posts} />
				</Section>
			</main>
		);
}
