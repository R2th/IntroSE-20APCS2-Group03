# Series Outline
[kintone Plaform Part 1 - Business database apps creation platform without coding](https://viblo.asia/p/kintone-platform-part-1-business-database-apps-creation-platform-without-coding-ORNZqoqG50n)

[kintone Plaform Part 2 - Using Plug-in to extend your platform features](https://viblo.asia/p/kintone-plaform-part-2-using-plug-in-to-extend-your-platform-features-yMnKM3xml7P)

[kintone Plaform Part 3 - Plug-In development Tutorial](https://viblo.asia/p/kintone-plaform-part-3-plug-in-development-tutorial-63vKj64dK2R)

[kintone Plaform Part 4 - Plug-in List](https://viblo.asia/p/kintone-plaform-part-4-plug-ins-list-oOVlYdQQZ8W)
# Overview
Well, so we meet again and as usual, today i also introduce to you a new useful plugin. Unless you known about below topics, please review its (in the series outline at the first part) first:
* What is kintone
* What is Plugin
* Plugin eco-system and Plugin development Tuttorial

## Problem

* When working with a great amount of records database, it is neccessary that you can limit the number of records that you need to work with, kintone provides for us a powerful filterer, you can recognize it easily at top menu.

![](https://images.viblo.asia/686aa079-2b5a-4f4b-97c9-3ee21992d10b.png)

* At the first look, it's seem to be good. However, we can make filterer more convinient than default the default by using plugin.
So let's investigate how to use it practically.

## How to use Plug-in
**Filter plugin Advantages**

Filter plugin 's developed to improve the filtering data feature better. Plugin help you can filter and modify your condition directly on records screen through a friendly interface filter box.

**At this time: This plugin only work with numeric and string field (NUMBER / SINGLE_LINE_TEXT / MULTY_LINE_TEXT). We will consider to update full fields filtering feature in the future**

* With Condition mode, you can search a term or a number.
* With Value mode, you can choose the values that you need to filter among all of values in the current records list.
* Moreover, you can click Sort A->Z or Sort Z->A to sort you table depend on alphabetical. It's an alternative of default kintone's sort feature.

![](https://images.viblo.asia/2408dbb4-c6f4-4ab8-9536-10e98d23d788.png)

**Step by Step Tutorial**

* Please follow the last article (Plugin: Sum of Total Records) to install Plugin to your kintone App at first.
* After setting up successfully, you can use it freely depend on your needs.

### General Guide
Firstly, i would like to inform that, this mode only supports for the following fields:
* Text (Single Line Text)
* Numberic (Number)

It also avoids some fields set:
* Calculation
* Reference to a look-up (destination of a lookup source field)

Let's take an example: Assuming that, I have a "test filter" sample app with installed Filter Plugin.

![](https://images.viblo.asia/af7e93ce-ecff-4b4f-9aaf-4356bd534e71.png)

Look at the red circles, Filter Plugin show an icon beside the title of each filterable field. To open the filter window, please click to the icon.

### Filter By Condition Guide

Click to the "Filter by Condition" then you will open the Filter By Condition menu. Click to the dropdown to choose an option, here, i choose "Contains" condition, then type the value that you would like to be included in the result 

![](https://images.viblo.asia/aa6c141e-17f5-467e-8bb1-b323d4db80b1.png)

Click Confirm, and a filtered list will be showed up alternatively to the original. You can see there are only the records which's value is "Test".

![](https://images.viblo.asia/c3275180-16f7-49e9-91d7-1c8b83d32d85.png)

### Filter By Value Guide

Same as the way to Filter by Condition, please click to the "Filter by Value" then you will open the Filter By Value menu. 
Unlike the before, this time you will see a list of values. Those values are values of on-screen records list, to filter you have to choose one/many value. Now, i will choose "ABC ABC" and "123123A".

![](https://images.viblo.asia/70c69aa8-8e4c-4b1b-8369-a95cb8b717ef.png)

Click Confirm, and a filtered list will be showed up alternatively to the original. You can see there are only the records which's value is  "ABC ABC" or "123123A".

![](https://images.viblo.asia/27e71cbb-1708-4bea-b571-8636ef30f143.png)

### Combining two mode

Of course, you can put 2 modes together to form some complex condition, Let's Unite 2 before condition.
First, choose the condition for Record_Number field :

![](https://images.viblo.asia/a3354b39-265b-4cdd-9d70-c073276d7452.png)

But this time, do not click the Confirm button but the Close button. Then you can choose another condition for even another fields , click to filter icon at Text title, then "Filter By Value", you will see exactly what you saw in the previous step. Choose "ABC ABC" and "123123A".

![](https://images.viblo.asia/70c69aa8-8e4c-4b1b-8369-a95cb8b717ef.png)

Now please Confirm, and a filtered list will be showed up alternatively to the original. You will see the results is the combining of two conditions. With filter Plugin you can build complex filter condition, it's only depend on what you need.

![](https://images.viblo.asia/8f0914ff-f8b1-4d60-bbe2-bc429b4a3423.png)

You can also notice that, the filter icon will change to "Blue color" that indicate, some filter condition is allocated here.

### Filter multiple times

At previous part, you have noticed that the filter icon change its color to illustrate it's state. From now on, you still modify, add , remove the conditions of filterer, just click to icon and do what you need.
I modified the condition of Record Number to Greater than 20 instead of 24

![](https://images.viblo.asia/cafcb54a-5149-4138-b02a-a56130334117.png)

Click Confirm button and see the result:

![](https://images.viblo.asia/1b41d139-ca0c-4ff2-aade-0f6e7cc01330.png)


## REMEMBER
Keep remember that, Filterer will only filter the showed records list. It means you can build multiple layers filter condition like

```
Filter 1 ---> Filter 2 ---> Filter 3 ... so on
```

## Notes
1. We do not guarantee this sample to run.
2. We do not provide any technical support for this sample Plug-in.
# Downloadable Content
zip file, please download the follwed link and upload whole package to kintone, don't extract it before upload to kintone.
[DOWNLOAD LINK](https://goo.gl/otJE3k)
# It is not the end
I hope that this plugin can bring some benefits to your work.
This series is not yet end and we will still meet again to discuss about more interesting plugins afterward. If you have any questions, please place a comment and i will try to reply as fast as possible. Thank you !