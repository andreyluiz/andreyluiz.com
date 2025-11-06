---
date: 2025-11-06
title: Discovering OpenAI Codex
---

# Discovering OpenAI Codex
I was not expecting to have an OpenAI model perform so well in coding.

I've used Cursor in the past, but ended up cancelling the license. I've used Claude in the past, but back then it was not as useful as ChatGPT, so I kept ChatGPT for general usage. But over the past month, I’ve been re-exploring different AI tools for coding assistance.

## What can you do with the cheapest subscription?

Recently, I was developing primarily with Claude Code, which I enjoyed for its generous usage limits and consistent performance. This November, I decided to give Cursor another chance. I got the same $20 license I had before. Almost immediately, I ran into something that frustrated me.

After a few sessions using the Sonnet 4.5 model in Cursor, I received a notification saying that my usage limit would be fully consumed by November 11th. That experience felt unnecessarily restrictive and kinda demotivated me to keep the subscription in December.

While I understand that higher limits require higher payments, the warning felt more like a control mechanism than a friendly reminder. In comparison, Claude Code’s limits have always felt fair and transparent, and while I hit usage limits a couple of times, they reset in the same day, so I could keep using it.

[image]
  src: 1.webp
  caption: Claude Code pretty UI.

So I will keep using Cursor until the end of the month, but I'm wondering when this limit will end. I'm using the auto mode to preserve the limit as much as I can.

## I didn't expect something from OpenAI

ChatGPT is nice. But while it can give you code samples and help with coding, it's not really practical for every day use. So I excluded OpenAI from the coding assistant competition for a long time.

But last week I read on [Superhuman AI blog](https://www.superhuman.ai/p/inside-openai-s-quest-to-build-the-world-s-smartest-coding-assistant?_bhlid=3a7265f1ccdb04bb7c7376280026eca7e4159364) that OpenAI is actually investing heavy on turning Codex into "the smartest coding assistant". It is said that quite a few people on a typical Tech event in San Francisco would say the topic they're most excited about is Codex. According to the Engineering Lead for Codex, a good AI coding assistant is not only about the model, but about the infrastructure, tooling and design choices. Reading this gave me a different perspective on how OpenAI is approaching this matter. So I decided to install the VS Code extension.

Historically, when comparing GPT-4o or o3 to Anthropic’s models, the latter always felt stronger for coding tasks. But that perception changed dramatically with GPT-5. It is at the top of the ranking at reasoning and mathematical logic. And what is debugging code if not strong reasoning and mathematical logic?

I started slowly by doing some investigations with Codex to test its capabilities.

[image]
  src: 2.webp
  caption: Codex simpler UI.

## First impressions

The first tasks I asked it was basic code base mapping. I asked where certain things happen, where I find certain screens. Nothing too fancy here. Any other coding assistant nails at this task. This step was more to test the CLI UI and how it manages context.

It did the job with a level of depth that stands out from other code assistants. It gives a lot of details that Claude Code doesn't for instance. If you ask it to investigate a complex code base, it will spend a good amount of time (more than 5 minutes, in some cases) and come back with a complete report for you.

The UI of the VS Code extension is also well made.

## A more complex scenario

The next test was to put it as a reviewer of Sonnet 4.5's work. I ordered Sonnet to make a fix and produce a Markdown document describing the fixes it did. Then, I asked Codex to read the Markdown file and evaluate the changes. In the first try, it found many issues. Dumb issues, like missing imports or undeclared variables. I used Codex' output as input for Sonnet 4.5 to fix the issues. I had to do this process 3 or 4 times to have a clean output. After the back and forth, the fix worked.

Next, I decided to put Codex on an actual coding test. I submitted it to a particularly difficult bug: a transient bug caused by a race condition between two React components. Normally, this kind of bug takes a long time to diagnose, specially if it involves huge components and history navigations, which is the case here. Fixing it might prove even more difficult.

Now it's important to relate with my already known experience with other tools: with Claude and Cursor, such bugs would require me to ask 4 times or more to get a concrete fix. 90% of times the first code produced does not fix the bug. You ask again, it gives another fix. It doesn't work. Loop. The main issue with this besides spending time, is that the previous changes introduced by the AI do not fix the issue, and you have to revert them. It's a double spent time.

I asked Codex for help, expecting a long back-and-forth. Instead, within minutes, it analyzed my files, compared the logic, identified the race condition, and proposed a working fix on the first try. That level of precision is something I hadn’t experienced before. And it explains the issue and the fix with a high level of precision. It's the kinda of explanation that makes you think the AI is actually a senior developer, not an intern saying "You're absolutely right!".

## Will it be a shift in development workflow?

After proving worthy, I’m now using Codex across both personal and company projects. It feels like the perfect balance between deep reasoning and practical implementation. The way it approaches code analysis is distinct from Anthropic’s philosophy. It's less about skills and frameworks, more about thorough understanding and intelligent debugging.

I will try it for a while using my standard ChatGPT subscription and see how far can I go. I can't afford to pay $200 per month for now, so my current subscription has to do.

If I will stick to it only time will tell. So far I'm loving it.

## Looking ahead

As I continue experimenting, I’ll likely write more about Codex and its nuances. For now, the takeaway is simple: OpenAI has surprised me.

Codex isn’t just catching up with Anthropic. It’s doing coding assistance... differently. And I like how different it is from the slop we are used to. I’m having a lot of fun rediscovering the process of building software with it.

It also might be an opportunity to save $20. If I find that I don't need Cursor or Anthropic, I might keep my ChatGPT subscription only and find another use for those $20. Maybe buy some beers?

_Stay hydrated and keep experimenting._