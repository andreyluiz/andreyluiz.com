---
date: 2025-10-29
title: Diary of a Nue.js Migration
---

# Diary of a Nue.js Migration
Documenting the progress of migrating my website from Next.js to Nue.js.

My previous post explained why I am done with React and why I decided to migrate my website to Nue.js. In this post, I will document the steps I took to migrate my website from Next.js to Nue.js.

## Migrating the posts

Since the posts are the most important part of my website, I decided to migrate them first.

I created a new Nue.js project with `nue create blog`, and the whole structure was already there. I just had to make some adjustments:

- I decided to create a folder for each post with an `index.md` file and the images (if any) inside it.
- I moved the posts from the old website to these folders and renamed the files accordingly.
- I added a date field to the metadata header of each Markdown file.
- I had to make some small adjustments to the styles of the posts.
- I optimized the images, which where unoptimized on my old website.
- Fixed some typos in the posts (bad bad bad).

In this opportunity I didn't change any styling. So my blog looks pretty much like Nue.js website. Which I assume are the default styles of Nue.js.

Other than that, the default configuration of the Nue.js template already cover the basics of having a blog working.

## Met the creator

During this time, I joined Nue.js Slack channel and talked with the creator of Nue.js, Tero Piirainen. He is an amazing and polite guy, with an incredible vision.

I was struggling with a component to format dates in my posts. And we figured out that the docs of Nuedom were wrong. We figured it out together and Tero fixed the docs. Easy like that!

I strongly recommend joining the Slack channel and getting in touch. The community is friendly and helpful.

## The first commit

I made the first commit with the basic structure that came with template and the Markdown files of my posts.

The only configuration file is the site.yaml. No biome, no next, no prettier, no tailwind, no other configs. I also decided to go lean and use some formatting provided by the editor itself (Zed in my case). Another option is to use Editor Config extension for VS Code or any other editor and have a configuration file at the root of the project. I opted out of using it.

My first and foremost priority in this migration is to avoid falling for the trap of Node.js and node_modules. I want to keep my dependencies to a minimum and avoid unnecessary bloat.

## Done already? OMG!

Well, that was fast.

I literally created a couple of CSS files, added some markup to the index.html, customized a bit the styling, added my profile and favicon, and done!

I don't have much else to say, really. I had to make a detox of Tailwind, for sure, and go back to writing pure CSS, which was refreshing. I was rusty. Tailwind makes us lazy.

The same functionallity my website had is done, with less than 10 files, if you don't consider the posts. Everything written in pretty much a standard. With pure JavaScript, CSS and HTML knowledge. That's neat!

What's more important about this is that there is no node_modules, no weird and non-standard dependencies. Only Nue.js and it's core, standard based structure.

## Server vs Dynamic pages

This is one of the things that confused me the most.

Nue.js will render HTML documents on the server if it detects no dynamic content in it. A dynamic content is anything that depends on the browser behavior to work, such as a button click, or a form submit.

You can also tell Nue.js how to treat your HTML:

- `<!doctype html>` is a server file.
- `<!doctype dhtml>` is a dynamic component.
- `<!doctype lib` is a library of components and layout modules.

If you try to use client side API such as `localStorage` on a server HTML, you will see an error in the console. So try to be mindful of where to use certain APIs.

Nue.js docs on [HTML file types](https://nuejs.org/docs/html-file-types) goes into details about this subject.

## Deployment

The website is migrated, and now it's time to pick a host for serving it.

I asked Tero himself if he had any recommendation for hosting, and he indicated CloudFlare. Since my domain and DNS are there, I decided to follow his recommendation.

In fact, CloudFlare Pages makes it so ridiculously simple, that to test I was just building the Nue.js application locally, making a zip file with the assets and uploading. And that's it. The website was online. This, of course, considers that the website is static. I haven't tried deploying it as an application with a server.

After this, I will setup an automatic connection with Github to deploy from the main branch.

## Conclusion

I'm quite surprised by how easy this was. Nue.js brings us back to standards, and makes it in a such friendly and familiar way that is almost shocking.

No node_modules, no non-standard libraries, no formatters and linters, no complexity. It's just simple, standard, browser support at its best.

I will certainly expand my blog with other functionalities. It will be interesting to implement them with Nue.js. I will also make my best to be an active supporter and contributor of Nue.js, because I truly believe in its mission and its purpose.

Stay hydrated, stay safe.
