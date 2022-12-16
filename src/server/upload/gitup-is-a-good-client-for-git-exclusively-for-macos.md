# I have used lots of software, but could not stop using GitUp
I would like to introduce to all of you who has to manage project with Git by Macbook a super friendly GUI that is GitUp
GitUp : http://gitup.co/

## What is GitUp
GitUp is a GUI client that is developed exclusively for MacOS
As it has been said in the Promition page:
> Work quickly, safely, and without headaches.
> 
Indeed I feel that I am using it without the pain in the head. And a big feature is - as mentioned in the upper quote: **FAST**

### How to use in brief

#### Checking commit
Here we will use openFrameworks (https://openFrameworks.cc) as an example to explain the github project
When opening an existing local repository with GitUp,  a screen like this will  appear

![](https://images.viblo.asia/461c7ba1-b0c8-4262-814d-7be945027012.png)

Wow, I feel something of **FAST** here  already. If you press the arrow key while on this screen, you can follow the nodes of the log tree (with blue balloon comes out).

If you press the "Space bar" key:

![](https://images.viblo.asia/c9d78883-1ec3-4afd-b905-cc1ea7c3f1ad.png)

You can see by eyes the differences of that commit, and navigating between files using the arrow keys. So **FAST**  right?

If you press `Cmd+{↑or↓}` or click the button at the top left corner, You can follow the branch back and forth. You can return to the original screen with `Esc` key.

If you want to check out a new branch, just Press the `B` key,

![](https://images.viblo.asia/0ca234ee-318f-4892-b6a1-0ad644c83dad.png)

Then type in the branch name you want:
![](https://images.viblo.asia/9f89ed0d-ee11-462d-aebd-c9cdce5771bf.png)

You can definitely know if the new branch is checked out or not.

#### Commit changes
I made some changes in the `Readme.md` file, 
I can see Commit History by Pressing `Cmd + 2` (there are 3 views on the windows that can be switched by pressing `Cmd + {1, 2, 3}`)
![](https://images.viblo.asia/c1339b52-322c-4211-8cb8-b6e08b950d8d.png)

You can see `diff` of changes. To staging changes, just press Enter in this screen

![](https://images.viblo.asia/6c650e2e-f9f3-44bb-b9af-5015782d406b.png)

Changes were staged in the Index. (If you want to commit partially, you can drag the target line with the code on the right and select it, then press `Enter`) so **FAST** right .

The commit message can be written in the big box below. You can easily navigate between Working Directory, Index, Commit message with `Tab` key.

![](https://images.viblo.asia/9f20f54d-d337-43ec-9072-18bb09ace38c.png)

You can commit by pressing the Commit button below or by `Option + Enter`. With `Cmd + 1`, you can check the commit progress.

#### Push to remote branch
You can Push by pressing `Cmd + Shift + P` (you can not push if you don't have the pushing authority)

So far we can create branch, Stage/Commit changes and Push without touching the mouse

#### Pull
We can pull the latest of current branch using `Cmd + P`

#### Checking the History
Go back to Map view (first screen) with `Cmd + 1` and select Remote Branch Tips (or `Cmd + Shift + R`) from the Show in the bottom left to display the Remote branch.
If you scroll down you can see someting unexpected here ...
![](https://images.viblo.asia/351879be-dcff-4dad-8cf3-f2e452e9cf2d.png)

What is that? you can overlook the commit log and masterpiece tree six years ago. Of course you can follow the direction key and check the log with the space key. It is insanely simple when displaying only this branch. By the way, you can check out there by pressing the Enter key with a blue balloon on it. It took about 20 seconds to a commit until six years ago, but just a fraction of a second to go up to the previous commitment.

#### Launching from terminal 
You can start GitUp from the terminal with `Gitup> Install command tool` from the menu bar. Under the target git repository,

You can set up GitUp just in moment and this is completion of the mouse free environment of GitUp.

```
$(openFrameworks/) gitup
```

### Other editors comparation 
Until now I have used 

* Github Desktop
* SourceTree
* GitKraken
Since I started using GitUp I have never come back. Both have substantial shortcut keys and are functional, but GitUp is simpler by any means. Therefore, I felt easy-to-use using GitUp. (Sorry to others who using the other editors, but non of them has fully feature to use comparing to GitUp)

#### Comparing to Github Desktop 
It is a pretty good Git client, and I can also make PR from this application in particular. The tutorial is also fulfilling and it can be said that it is a gentle application for those who use the Git client for the first time. At first I did used it a lot. However switching of branch commit is quite hard to do. It's a little troublesome to pick up a branch by moving the mouse to the button for switching the branch. Regarding the PR creation function, I would rather used the web interface instead.
![](https://images.viblo.asia/21083576-f8c5-43d9-82cd-808778de288d.png)

#### Comparing to Source Tree
SourceTree is outstanding in functionality, and it has an interface that makes it easy to list commit logs for each branch, but I feel that there are too many special functions. Although it seems that the amount of activity will be widen if it fully utilizes, but since I fell in love with GitUp before that, there is no opportunity now for me to use Source Tree then (completely personal opinion). Just obviously the type of view is so much information and complex, and it's hard to see the history logs.
![](https://images.viblo.asia/42d0836c-3791-4787-bebf-9ad3a40bf1a2.png)

#### Comparing to GitKraken
![](https://images.viblo.asia/21025595-0128-4236-b89b-a92b309378be.png)
The cuddlefish is cute but,** it takes around 7 seconds to launch the editor**. It obviously starts over unnecessarily long time for a GIT software. After that, I think that Opening App ... Opening Repo ... has been prompted and it takes time makes the client goes so **slow**, and plenty of extra processes running simultaneously. Unfortunately, we are obliged to become critical of this time theme: "**FAST**".
![](https://images.viblo.asia/cc2bcb6a-8816-47f6-a362-18955d8714bf.png)

# FAST makes good feelings
It is indispensable to have a fast response GUI for a comfortable working environment. Just shortening the time interval between thinking, body, and visual feedback will improve the working enthusiasm very much. Especially when you become accustomed to software development, you do not want to use the mouse, and you want to go back and forth on the keyboard as much as possible, but I think GitUp is made with careful consideration of such work environment. I think that it is a simple git client who omitted all waste so that necessary work can be smoothly, so i recommend you to give it a  try.