---
date: 2025-06-13
title: Oh my god! I ran Biome while I had uncommitted changes
---

# Oh, my god! I ran Biome while I had uncommited changes
And now my changes are a mess! How do I fix it without losing anything important?

You're concentrated working on a feature, and you notice Biome (or prettier) is not working. Confused, you run `biome check`. It might be a configuration issue, or even an IDE issue, after all. It formats all of your files, including the ones you were adding the feature to. Now you have 100 changed files, but the actual files you were working on are only 5.

If CJ from GTA San Andreas came to your mind saying "Ah shit, here we go again", you know exactly the nightmare expecting you ahead. You need to split the changed files into feature and Biome changes.

This is boring and complex to do. Especially if you're new to git. The more files you have, and the more complex the feature you are developing, the worse it is.

## But why is this even a problem?

Commits have to be atomic. How atomic they need to be is seriously debatable. For a long time, I've made commits that have all the essentials for something to work. For example, a React page with a calendar will have the code for the feature, the components, and the packages I added in package.json. If you check out that commit specifically, the page will work perfectly.

But there are other opinions. Some people claim commits should be even more atomic. Configuration files, components, and the feature code should be in separate commits. So instead of one working commit, you would have three commits.

No matter what you prefer, there is a rule that is not written. You cannot have feature code and biome-formatted code on the same commit. Otherwise, you will make the review process very difficult. These two changes should be introduced separately, even on different PRs.

Reviews have to be as easy to do as possible. Fixing this mess ensures the reviewer has clean commits to look at.

## Choosing a strategy

Should I check each file and revert it to keep only my feature changes? Should I use the git stage to split the changes?

Since Biome changes most of the files in an automated fashion, you can discard the changes and re-run it after making a commit of your feature changes. Using staging also works, and it's the way I chose to make this tutorial.

Now we need to split our feature from Biome's changes. Let's see what we can do.

## Identifying the parts

First, we need to identify the parts of the files that are changed by Biome. These changes relate to indentation, trailing commas, spaces, and more. They are quite easy to spot. Changes that change logic or add lines are often your feature changes.

As a rule of thumb, unstaged (new) files and deleted files can be considered your feature changes. Even if Biome formats the new code, it doesn't make a functional difference from your changes. You can be sure the component will work exactly as before formatting. And as a bonus, you will have a file that is already formatted before committing it.

Modified files are the tricky part.

## Tearing modified files apart

Here's where things might get very messy. Specially if the file has many lines of code. And unless you're very skilled with git, this might become a nightmare.

As mentioned before, you need to identify in the modified files what has been added or changed by you and what has been changed by Biome.

Let's play a game. I'll show you a diff, and you try to guess where the Biome changes are.

**First one:**

[image 1.webp]

The console log has been removed. And Biome never removes lines. It only changes them. The other lines seem to be about indentation and line breaks, and import sorting. So, this is mixed Biome and feature changes.

**Next one:**

[image 2.webp]

This one is so heavily changed that it can be considered as a user change. Biome might've done something here. But there are so many changes that it's almost like an unstaged file. So, feature change.

**Third (and bigger) one:**

[image 3.webp]

That's a ShadCN button. This one is pretty much about imports, indentation, trailing commas, and semi-colons. So, Biome only.

**Last one:**

[image 4.webp]

This has a small change on the env variable trailing comma, and then a big hunk of added lines of code. This one looks like a mix as well. Biome changed the trailing comma, and the user added the `getUser` function.

There might be more complex scenarios, for example, you changed a line of code, and Biome changed it as well. For this specific case, you have to keep the change; otherwise, your component won't behave as you planned.

## Splitting the changes

Now comes the fun (and potentially dangerous) part.

We will stage the parts that belong to your feature change, and leave unstaged everything else.

This can be easily made on VSCode. For a long time I've used `git` CLI for staging changes, but when VS Code was launched, I fell in love for its diff tool. It is complete and feature rich.

The main feature we will use is the ability to stage specific blocks. Let's see an example:

[image 5.webp]

This is the mixed file where we have a removed console log. There's also some Biome import sorting and semicolon fixes.

To keep only the removed console log, move your mouse to the bar that separates the diff, and click on "Stage Block".

[image 6.webp]

This will make the removed console log be staged. This will also make the line break added by Biome to be staged. But you can trust this one.  You're getting formatted code for free, and you are sure the change is equivalent.

In cases where a single line is changed, the "Stage Block" tool will stage the single line.

Repeat this process in all files.

## All staged. What now?

Now you have all the changes split and staged and ready to go. But before doing that, I recommend testing your split code to be sure it works. If it was not a complete feature, try to test it partially.

To be able to do that, we need to get rid of the unstaged changes. You can do that with:

```bash
git stash --keep-index
```

If you think the Biome changes are not important and can be done again later, do this instead:

```bash
git restore .
```

Now only the staged changes remain. Run your application and test everything. If you are happy, you can either commit the changes with a nice commit message or keep working on the changes.

After committing your feature files, run `biome check` again and have a nicely formatted code. Make sure to commit these changes too.

## Conclusion

Always try to perform different actions at different times. When developing a feature, concentrate on that and forget all the rest. Later, you run Biome and make your code nice and formatted.

A similar issue might arise when you enter a flow state and start creating things out of pure concentration. When it comes to the time to make a commit, you conclude that you went too far, and now a split is needed. The same technique can be applied here. But in such a case, it is even harder. You have to know exactly what pieces of code belong to which feature.

See you in the next one. ;)
