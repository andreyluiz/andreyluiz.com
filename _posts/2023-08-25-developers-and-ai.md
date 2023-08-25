---
layout: post
title: Developers and AI
lead: How are we developers evolving with AI?
---

Unless you've been living under a rock for the past year, you've seen the advent of AI in our day-to-day lives. At this point, I use Chat GPT for ordinary stuff, from asking for cooking recipes, to fix texts, and even add accents to texts when I write Portuguese using my US keyboard. And of course, developers would benefit from this greatly. But how?

## AI and the developer

I think Github picked a perfect word for their AI tool: Copilot. It's not a replacement for a developer, but a copilot. It's there to help you, to make your life easier, to make you more productive. And that's what AI should be for developers. It should be a tool to help us, not to replace us.

I've been using Github Copilot for the past 2 years, and I became more productive without any doubt. I can write code faster, and I can focus on the important stuff. I don't have to worry about the syntax, or the name of a function, or even the name of a variable. I can focus on the logic, on the architecture, on the design, and not on boring stuff. And boy, there's a lot of boring stuff in programming.

Let's see an example:

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

let users: User[] = [];

// four functions to make CRUD operations on the users array
```

This is a simple example of a CRUD operation. I have an array of users, and I want to create, read, update and delete users from that array. I could write all the functions by hand, but I don't want to. So I'll use Github Copilot to help me with that. We all know what a CRUD does, we just don't want to write it because we're lazy. So let's see what Copilot can do for us:

![Copilot suggestion](/assets/png/2023-08-25-developers-and-ai-1.png "Copilot Suggestion")

Immediately you see that Copilot already knows what to do. It knows that I want to create a CRUD operation, and it even knows that I want to create a CRUD operation for users. It's not perfect, but it's a good start.

In this scenario, Copilot will suggest each line separately, so you can auto complete them. If you want a broader suggestion, you can open the Completions Panel (For VS Code, Ctrl+Enter on Windows, Cmd+Enter on Mac) and see what Copilot suggests:

![Copilot Completions](/assets/png/2023-08-25-developers-and-ai-2.png "Copilot Completions")

It generated the whole CRUD operation for me. I just have to copy and paste it to my code or click "Accept Solution". And that's it.

## Github Copilot Chat

What I shown above might not be a surprise for most developers who are already used to Github Copilot.

But Github Copilot has a successor: Github Copilot X. It features a Chat, and automatic tests and documentation generation. Let's see some examples.

You can open the Github Copilot Chat with Ctrl+I on Windows, or Cmd+I on Mac. It will open a popup where you can type what you want. Make sure you select the code or the comment you want the effect to be applied to.

Here's the result:

![Copilot Chat](/assets/png/2023-08-25-developers-and-ai-3.png "Copilot Chat")

I don't need to accept this suggestion straight away. I can refine the text again and hit Enter once more to get a more refined suggestion. For example, I want it to make the functions return the users collection on mutating operations.

![Copilot Chat](/assets/png/2023-08-25-developers-and-ai-4.png "Copilot Chat")

Even my misspell ("updates" instead of "updated") was ignored and the right context was inferred. That's pretty cool.

## Other features

The context menu on Copilot has other four options. Explain this, Fix this, Generate Docs, and Generate tests. And they all work as expected.

The Explain this is particularly interesting because it opens the chat on a panel, where you can interact with Github Copilot, just like you would do with Chat GPT.

![Copilot Explain](/assets/png/2023-08-25-developers-and-ai-5.png "Copilot Explain")

In this case I am asking it to explain the `createUser` function generated above. And it does a pretty good job at it.

## Where do we go from here?

As I said, I don't believe AI will replace developers. I believe it will help us. It will make us more productive, and it will make us focus on the important stuff. And that's what we want. At least I am a lazy developer, and I want to do only the necessary.

If you're a senior developer like me, you probably will find on Github Copilot a very powerful tool to make you more productive. Don't expect it to do things on your place. That's not what it is meant to. It's meant to help you, not to replace you.

If you're a junior developer, you probably will find on Github Copilot a very powerful tool to learn how to code. You won't find all the answers there, but you at least has someone (Copilot) to ask for help.

I can't wait for what the future reserves in 2024 regarding AI. I think we will have some crazy stuff coming up.

Cheers.
