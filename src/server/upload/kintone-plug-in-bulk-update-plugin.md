# Series Outline
[kintone Plaform Part 1 - Business database apps creation platform without coding](https://viblo.asia/p/kintone-platform-part-1-business-database-apps-creation-platform-without-coding-ORNZqoqG50n)

[kintone Plaform Part 2 - Using Plug-in to extend your platform features](https://viblo.asia/p/kintone-plaform-part-2-using-plug-in-to-extend-your-platform-features-yMnKM3xml7P)

[kintone Plaform Part 3 - Plug-In development Tutorial](https://viblo.asia/p/kintone-plaform-part-3-plug-in-development-tutorial-63vKj64dK2R)

[kintone Plaform Part 4 - Plug-in List](https://viblo.asia/p/kintone-plaform-part-4-plug-ins-list-oOVlYdQQZ8W)
# Overview
In this article, i will introduce to you a new useful Plugin. Unless you known about below topics, please review its (in the series outline at the first part) before continue:
* What is kintone
* What is Plugin
* Plugin eco-system and Plugin development Tuttorial

## Problem

* When working with Database Management System liek SQL Server, mySQL, Oracle, ... You have the ability to modify many records even whole table at the same time. Regrettably, kintone does not provide that feature but you can still use a plugin in order to realize it.
***Plugin Bulk Update*** can update/ replace many records at the same time quickly, automatically. It also brings a friendly interface with end-users.  
So let's investigate how to use it practically.

## How to use Plug-in
**Bulk Update plugin Advantages**

Bulk Update 's developed to improve the updating data work better. Plugin supports 2 modes : Replace String and Update Data.
* With Replace String, you can search a term and then replace it with the word/number provided.
* With Update Data, you update the whole filterd data records appears on the screen by your provided data .

**Step by Step Tutorial**

* Please follow the last article (Plugin: Sum of Total Records) to install Plugin to your kintone App at first.
* After setting up successfully, you can use it freely depend on your needs.

### Replace String Mode Guide
Firstly, i would like to inform that, this mode only supports for the following fields:
* Text (Single Line Text)
* TextArea (Multi Line Text)

It also avoids some fields set:
* Calculation
* Reference to a look-up (destination of a lookup source field)

Let's take an example: Assuming that, I have a "Bulk Update" sample app.

![](https://images.viblo.asia/2e2be964-303a-4206-98df-9bcb54d79acc.png)

Choose the desired field in the dropdown list:
![](https://images.viblo.asia/e54fead9-a9ad-4cee-b72a-3cc0a427c51f.png)

Enter the string, that you 'd like to be replaced at Search Term input box. The new string will be entered at "Replace String". After that, press at CONFIRM button.
![](https://images.viblo.asia/0f6ecc55-b6db-49c2-9589-12ec0a187de4.png)

![](https://images.viblo.asia/0337a117-903c-4fd6-8552-1940b651bf29.png)

Congratulation, replaced successfully!!! You can follow the information message - press CONFIRM button again - to do a reload of your page so that the new content will appear on the screen.

![](https://images.viblo.asia/b0c50b2d-0bb6-4699-92cf-e42669976914.png)

### Update Data Mode Guide
* Similarly to Relace String Mode, there are some notices when using Update Data Mode. Here are supported fields of this mode:
    * Text (Single line text)
    * TextArea (Multi line text）
    * Date
    * Date&Time
    * Dropdown
    * Checkbox
    * Radio button
    * Number
* Fields, which has these setted attribute, will be not included:
    * Calculation
    * Prohibit Duplicate Values

As the previous part, we do an example together to sum up. On constract, you must choose Update Data mode, at the top of the function box to switch to Update Data mode.
Here, i choose "Number" field.
![](https://images.viblo.asia/8968396f-96df-48aa-b81e-445ccc9b4add.png)

Input the value, that i would like to update all records of "Number" field - "123".

![](https://images.viblo.asia/e011ce1b-39eb-4a0e-912c-b6e6ea445e65.png)

Dont forget to press CONFIRM, after review your input carefully, all of replaced data can not be brought back.

![](https://images.viblo.asia/e05121c3-a7b7-4d1c-8072-adc9005e41d7.png)

![](https://images.viblo.asia/542ca200-7742-4071-8709-4403c5cccf95.png)

Done, everythings seem to work perfectly. Although, you can struggle some error messages when using it, please follow the direction of the message. If you still can not fix it, please feel free to post your problems here, and i'll try to support asap.

## Notes
1. We do not guarantee this sample to run.
2. We do not provide any technical support for this sample Plug-in.
# Downloadable Content
zip file, please download the follwed link and upload whole package to kintone, don't extract it before upload to kintone.
https://goo.gl/h2FXRG
# It is not the end
I hope that this plugin can bring some benefits to your work.
This series is not yet end and we will still meet again to discuss about more interesting plugins afterward. If you have any questions, please place a comment and i will try to reply as fast as possible. Thank you !