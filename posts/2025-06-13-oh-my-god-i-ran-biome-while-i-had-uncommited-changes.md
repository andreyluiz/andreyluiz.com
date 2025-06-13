---
layout: post
title: Oh, my god! I ran Biome while I had uncommited changes
lead: And now my changes are a mess! How do I fix it without losing anything important?
---

That's pretty common, right? You're working on a feature, and you're not sure if it's working. Then you find out Biome is not working, for some reason, and you run `biome check`. It formats all of your files, including the ones you haven't committed yet. You first reaction: "Oh, my god! What should I do now?" This problem is the same thing also for prettier and ESLint.

Specially if you're new to git, this can turn into a nightmare where you could easily think you have to revert all your work.

## But why is this even a problem?

Commits have to be atomic. How atomic they need to be is seriously debatable. For a long time, I've made commits that have all the essentials for something to work. For example, a React page with a calendar will have the code for the feature, the components and the packages I added on package.json. If you checkout that commit specifically, the page will work perfectly.

But there are other opinions. Some people claim commits should be even more atomic, and configuration files (like adding a package to package.json), components, and the feature code itself should be in separate commits. So instead of one working commit, you would have three commits.

No matter what you prefer, one thing is for sure: if you have feature code and Biome formatted code on the same commit, you're going to make the review process very difficult. These two changes should be introduced separately, even on different PRs.

Reviews have to be as easy to do as possible. Fixing this mess ensures the reviewer has clean commits to look to.

## Choosing a strategy

Should I check the files one by one and revert them to keep only my feature changes, or should I use the git stage to split the changes?

To be quite frank, since Biome changes most of the files in an automated fashion, you can discard the changes and just re-run it after making a commit of your feature changes. Using staging also works, and it's the way I chose to make this tutorial.

Now we need to split our feature from Biome's changes. Let's see what we can do.

## Identifying the parts

First, we need to identify the parts of the files that were changed by Biome. Often, these kinds of changes are related to indentation, trailing commas, spaces, and things like that. So they are quite easy to spot. Changes that significantly change logic or add lines are often your feature changes.

As a rule of thumb, unstaged (new) files and deleted files can be safely considered as your feature changes. Even if Biome formats the new code, it doesn't make functional difference from your changes and you can be sure the component will work exactly as before formatting. And as a bonus, you will have a file that is already formatted before commiting it.

Modified files are the tricky part.

## Tearing modified files apart

Here's where things might get very messy. Specially if the file has many lines of code. And unless you're very skilled with git, this might become a nightmare.

As mentioned before, you need to identify on the modified files what has been added or changed by you, and what has been changed by Biome.

Let's play a game. I'll show you a diff, and you try to guess what are the Biome changes.

**First one:**

```diff
 "use server";
 
+import type { LoginFormData } from "@/utils/forms";
+import { createClient } from "@/utils/supabase/server";
 import { revalidatePath } from "next/cache";
 import { redirect } from "next/navigation";
-import { createClient } from "@/utils/supabase/server";
-import { LoginFormData } from "@/utils/forms";
 
 export async function login(formData: LoginFormData) {
   const supabase = await createClient();
 
-  const { error, data: user } = await supabase.auth.signInWithPassword(
-    formData
-  );
-
-  console.log(user, error);
+  const { error, data: user } =
+    await supabase.auth.signInWithPassword(formData);
 
   if (error) {
     return { error: error.message };
```

The console log has been removed. And Biome never removes lines. It only changes them. The other lines seem to be about indentation and line break, and import sorting. So, this is mixed Biome and feature changes.

**Next one:**

```diff
-export default function OnboardingPage() {
-  return <div>Onboarding</div>;
+import { getUser } from "@/utils/supabase/server";
+import { redirect } from "next/navigation";
+import { OnboardingSelector } from "./onboarding-selector";
+
+export default async function Onboarding() {
+  const user = await getUser();
+
+  if (!user) {
+    redirect("/login");
+  }
+
+  return <OnboardingSelector user={user} />;
 }
```

This one is so heavily changed that it can safely be defined as a user change. Biome might've done something here, but there are so many changes that it's almost like an unstaged file. So, feature change.

**Third (and bigger) one:**

```diff
-import * as React from "react"
-import { Slot } from "@radix-ui/react-slot"
-import { cva, type VariantProps } from "class-variance-authority"
+import { Slot } from "@radix-ui/react-slot";
+import { type VariantProps, cva } from "class-variance-authority";
+import type * as React from "react";
 
-import { cn } from "@/lib/utils"
+import { cn } from "@/lib/utils";
 
 const buttonVariants = cva(
   "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
@@ -32,8 +32,8 @@ const buttonVariants = cva(
       variant: "default",
       size: "default",
     },
-  }
-)
+  },
+);
 
 function Button({
   className,
@@ -43,9 +43,9 @@ function Button({
   ...props
 }: React.ComponentProps<"button"> &
   VariantProps<typeof buttonVariants> & {
-    asChild?: boolean
+    asChild?: boolean;
   }) {
-  const Comp = asChild ? Slot : "button"
+  const Comp = asChild ? Slot : "button";
 
   return (
     <Comp
@@ -53,7 +53,7 @@ function Button({
       className={cn(buttonVariants({ variant, size, className }))}
       {...props}
     />
-  )
+  );
 }
 
-export { Button, buttonVariants }
+export { Button, buttonVariants };
```

That's a ShadCN button. This one is pretty much about imports, indentation, trailing commas and semi-colons. So, Biome only.

**Last one:**

```diff
@@ -3,6 +3,14 @@ import { createBrowserClient } from "@supabase/ssr";
 export function createClient() {
   return createBrowserClient(
     process.env.NEXT_PUBLIC_SUPABASE_URL!,
-    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
+    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
   );
 }
+
+export async function getUser() {
+  const supabase = createClient();
+  const {
+    data: { user },
+  } = await supabase.auth.getUser();
+  return user;
+}
```

This has a small change on the env variable trailing coma, and then a big hunk of added lines of code. This one looks like a mix as well. Biome changed the trailing comma, and the user added the `getUser` function.

There might be more complex scenarios, for example, you changed a line of code and Biome changed it as well. For this specific case, you have to keep the change, otherwise your component won't behave as you planned.

## Splitting the changes

Now comes the fun (and pottentially dangerous) part.

We will stage the parts that belong to your feature change, and leave unstaged everything else.

This can be easily be made on VSCode. For a long time I've used `git` CLI for staging changes, but when VS Code was launched, I fell in love for its diff tool. It is complete and feature rich.

The main feature we will use is the ability to stage specific blocks. Let's see an example:

![VS Code Diff](/posts/2025-06-13-oh-my-god-i-ran-biome-while-i-had-uncommited-changes/1.png "VS Code Diff")

This is the mixed file where we have a removed console log, and some Biome import sorting and semi-colon fixes.

To keep only the removed console log, move your mouse to the bar that separates the diff, and click on "Stage Block"

![Stage Block tool](/posts/2025-06-13-oh-my-god-i-ran-biome-while-i-had-uncommited-changes/2.png "Stage Block tool")

This will make the removed console log to be staged. This will also make the line break added by Biome to be staged. But you can trust on this one because you're getting formatted code for free, and you are sure the change is functionally equivalent.

In cases where there is a single changed line, the "Stage Block" tool will stage the single line.

Repeat this process in all of your files.

## All staged. What now?

Now you have all the changes split and staged and ready to go. But before doing that, I seriously recommend testing your split code to be absolutely sure it works. If it was not a complete feature, try to test it partially.

To be able to do that, we need to get rid temporarily of the unstaged changes. You can do that with:

```bash
git stash --keep-index
```

If you think the Biome changes are not important and can be done again later, do this instead:

```bash
git restore .
```

Now only the staged changes remain. Run your application, and test everything. If you are happy, you can either commit the changes with a nice commit message, or keep working on the changes.

After commiting your feature files, you're free to run `biome check` again and have a nice formatted code. Make sure to commit these changes too.

## Conclusion

Always try to perform different actions at different times. When developing a feature, concentrate on that, and forget all the rest. Later you run Biome and make your code nice and formatted.

A similar issue might arise when you enter a flow state and start creating things out of pure concentration. When it comes the time to make a commit, you come to the conclusion that you went too far, and now a split is needed. The same technique can be applied here. But in such case it is even harder, because you have to know exactly what pieces of code belong to which feature.

See you in the next one. ;)