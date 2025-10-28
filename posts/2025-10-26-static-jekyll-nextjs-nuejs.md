---
layout: post
title: Static -> Jekyll -> Next.js -> Nue.js
lead: I'm going to rewrite my website. Again.
---

Before anything else, I want to vent something here. I'm bored with my website.

An unknown website with blog posts that are not read, with arbitrary and very spaced out posts. Come on! I'm tired of this.

Also, I see a lot of coding, tech and AI gibberish here, but nothing about myself. Who is Andrey? What does he do? So I will perhaps add some other things about myself. Not sure yet how to balance privacy and opennes in such case.

## How this all started

![My website in 2016](/posts/2025-10-26-jekyll-nextjs-nuejs/1.jpg)

The first commit on my website was in 29 September 2016, back in Brazil. 9 years ago, can you believe it? It was a simple index.html application written "Andrey Luiz - JavaScript Developer". Back then, I was proud to have just registered andreyluiz.com. So I created a simple placeholder to improve later and just keep the domain.

![Design update in 2020](/posts/2025-10-26-jekyll-nextjs-nuejs/2.jpg)

When I came to Switzerland beginning of 2020, I was locked in quarantine due to the COVID-19. During good part of the year I learned pixel art. To show the world how good I was (don't laugh), I added myself to the website. I mean, it was a self portrait of myself in pixel art. I also added some information about myself, and some links to Github, Linkedin, Instagram, etc. The commit dates from 22 November 2020.

![My website in 2025](/posts/2025-10-26-jekyll-nextjs-nuejs/3.jpg)

In August 2023, I decided to have a blog. So I added a huge blog structure using Jekyll and a pre-made template. This was the first structure that resembles somewhat what we have today. The fact of being Jekyll was working, but I personally didn't like it. Ruby is not my tech, and I wanted to make a blog in a stack that has more to do with my tech stack. Then I decided to use Next.js. And this was a mistake...

## The problem about React

React is full of problems. Facebook (now Meta) pushed React on us for many years. Year after year, they made architectural decisions that introduced new stuff, deprecated other stuff, and made the library that once was so natural, into a monster of clunky mess that is almost irrecognizable.

I've been here when React only had classes. I've been here when HOCs (High Order Components) where the ONLY way of composing in React. I remember the good days of recompose, an amazing library that was a set of very nice tools using HOCs. Well, its creator stopped maintaining it because he's been hired by Facebook (now Meta). This happened right when Facebook released for the first time the Hooks API. How would've guessed?

Facebook killed many of these nice projects in favor of their own set of directions and dominance over React's future. And here we are: thinking that it is acceptable to have an application downloading 5Mb of JavaScript just to render a simple page. Or thinking that a server with a lot of resources is necessary to run a simple blog.

## It's insane how much we normalize this

Developing React is so complex, and there is so many things to consider, that usually when back-end developers try to learn it, they feel absolutely overwhelmed by the amount of moving pieces.

Components in React using the Hooks API became a bloated mess, with hooks that do way more than they should.

The mental overhead is insane, and I'm starting to think that it's not worth it. Companies need front-end developers not only because we understand how browsers work. But developing React (which is industry lead) became so increasingly complex, that specialists are needed to understand how it works and to implement new features.

And often the application's architecture is insufficient. The app has bugs that are only explainable because React is being used (the suspense white flashes, for example, or the infamous hydration errors).

## How I've been feeding my anger

This of course makes me angry. And wanting to change.

But React is the industry lead. For whatever reason I came to this point, and I need to be strategic and prioritize the technology that is actually paying my bills. I'm not going to stop using React, but I'll make my best to use it properly, specially at my current job.

But in other projects, such as my website/blog, I can go wild and implement revolution myself! Hence the title of this blog post.

## Alright, the title starts making sense now

In 2014 I tried something new with Riot.js. I was an Angular.js developer, and while I didn't make anything significant with Riot.js, I had a lot of fun with it. Already in 2014 it was a library that introduced this elegant API you see in Svelte and Vue.js (where you have a single file component with markup, JavaScript and CSS). I remeber well the feeling of being free from the problems to, maybe, replace them with other but new problems.

So here I am again, willing to rewrite my website blog in Nue.js.

## Nue.js who?

I really like elegant solutions. When you see one, you think "why is it so obvious now? Why no one has seen it before?"

This was my first reaction when seeing and learning Nue.js.

I read about it for the first time in a blog post criticizing React's complexity and Meta's constant push of unexplained and unexcused changes in React's API. The post mentioned some libraries that still value software engineering principles, among them were Svelte, Vue.js, Preact and Nue.js. The first three are well known for me, so I skipped them because I have my own set of issues with each of them. Except for Preact. I love it <3.

But Nue.js caught my attention, so I went to check it out. And the moto caught my attention immediately: "A full application smaller than a shadcn button." Now that's a heck of a claim! I started to read their blog posts and the docs, and I was impressed by their approach. It felt proper, clean, elegant. Its creator applies Unix development principles to it, which explains why it's so small and fast.

Among the features it has, some of them particularly stand out:

- **Native Markdown support**: Nue.js will handle any Markdown file at the root as a route. So about.md will be rendered as /about. This is a piece of cake for blogs. You can target specific sections with custom styles, and add metadata. It's all I need here, but native. Without custom implementation, as I did.
- **Scoped CSS support**: CSS in Nue.js uses layers by default, which makes composing styles easier and more maintainable.
- **Brainless routing**: Any HTML or MD file at the root is automatically rendered as a route. No need to define routes manually. Paths with dynamic segments are supported as well.
- **Zero-config**: Nue.js comes with a default configuration that works out of the box. You can customize it later with an YAML file.
- **Back to simplicity**: You can start with an HTML and CSS file to have the basics going. You can build on top of it step by step.

## The Tailwind bias

I use Tailwind and I love it. When I started with Nue.js, I caught myself searching if it is possible to use it with Tailwind.

I arrived to this blog post: [Tailwind vs Semantic CSS](https://nuejs.org/blog/tailwind-vs-semantic-css/)

I read the article and I was impressed by the comparison. It was a great read. And highlights how biased I am. I use Tailwind with React because React sucks at styling. In fact, Tailwind kinda detaches us from raw CSS. It's been a long while since I wrote a single line of CSS.

Going back to semantic CSS sounds a good refresher. So I will start to follow it.

## TypeScript support

It's hard to imagine a world without TypeScript. I feel naked when developing with JavaScript.

But hey, which one is the standard? Here's the core difference. Nue.js is built on standards. So I've seen almost nothing about TypeScript.

I'm sure you can add a tsconfig.json file and transpile it to JavaScript though. But Nue.js talks about how standards are important in the development process to avoid the Madmax world of React.

## Conclusion

I will rewrite this blog once more using Nue.js and raw browser technologies. It feels proper. It's a tribute to my profession and to what I care the most: elegance and simplicity.

I don't know when it will be done, but the work has started already.

I will make a new post after the migration is done.

For now, stay hydrated. Stay safe.
