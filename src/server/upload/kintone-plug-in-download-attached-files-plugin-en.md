# Series Outline
[kintone Plaform Part 1 - Business database apps creation platform without coding](https://viblo.asia/p/kintone-platform-part-1-business-database-apps-creation-platform-without-coding-ORNZqoqG50n)

[kintone Plaform Part 2 - Using Plug-in to extend your platform features](https://viblo.asia/p/kintone-plaform-part-2-using-plug-in-to-extend-your-platform-features-yMnKM3xml7P)

[kintone Plaform Part 3 - Plug-In development Tutorial](https://viblo.asia/p/kintone-plaform-part-3-plug-in-development-tutorial-63vKj64dK2R)

[kintone Plaform Part 4 - Plug-in List](https://viblo.asia/p/kintone-plaform-part-4-plug-ins-list-oOVlYdQQZ8W)
# Overview
Again I would like to introduce a new plugin, which supports people to downloading files in the app. Who wants to learn and install this plugin, please make sure to have some knowledge about:
   - What is kintone
   - What is Plugin
   - Plugin eco-system and Plugin development Tuttorial
# Problem
When you use the app, there are attachments. You want to download each file, OK no problem, click  the link  of this file is downloaded. You want to download full file, kintone doesn't support this function, you can only click each link. So very inconvenient.

Luckily, I found a plugin that supports this. That is Download Attached Files plugin. I will explain more about this in the next part.
# How to use Plug-in
 Download Attached Files plugin supports people to downloading files in the app.
##  Setting config
Setting config to set which files the user is downloaded. If not, the plugin will by default download all the files.If you do not configure, the plugin will download all files by default.
![](https://images.viblo.asia/0091592e-78ce-4c62-aa0f-551ff8390375.png)
When you have not set up the config, the config interface will look like this. By default, all files will be downloaded and the file name will be changed, in the format `{file} {no}. {extension}`
![](https://images.viblo.asia/3be805ac-c6a6-4881-8d31-ba2cabf8eb4e.png)
If you want the file isn't downloaded, you will need to uncheck it.
![](https://images.viblo.asia/ef672254-6a69-4909-a5b9-93eb4fea8cc2.png)
You can also change the file name.
![](https://images.viblo.asia/6d87ae5b-1777-4bc2-96be-4080fdcda430.png)
Filename must not same or empty. Otherwise it will fail
![](https://images.viblo.asia/06c30a7a-62eb-4367-9752-b2231e8dc1f4.png)
![](https://images.viblo.asia/3186be68-0d54-495c-b972-aecfb3ae84a4.png)
When you finish the setup, you must submit.
![](https://images.viblo.asia/b661317c-342f-45ad-afe5-442f4f445e88.png)
Done, please update app.
![](https://images.viblo.asia/b6bf732e-1c6e-4089-99ab-c86fc1ad6b5c.png)
## Setting desktop
When you added the plugin, the app interface looked like this
![](https://images.viblo.asia/a0127eb4-c2a4-4a30-8f13-56cd52a57b4a.png)
To download file:
![](https://images.viblo.asia/22a77e3e-2dd4-4f09-8f51-d268189602b5.png)
![](https://images.viblo.asia/0adf7086-3ef9-4410-a101-ba38a9e6b96b.png)
After you see a zip file is downloaded you will see the results message. The name of the zip file is format `{current_year}{current_month}{current_day}.zip`. Open the zip file and you will see the downloaded files.
![](https://images.viblo.asia/2e11cd2b-2831-4d92-91b2-3e4f30c7ca6a.png)
# Notes
1. We do not guarantee this sample to run.
2. We do not provide any technical support for this sample Plug-in.
# Downloadable Content
Zip file, please download the follwed link and upload whole package to kintone, don't extract it before upload to kintone.
https://goo.gl/hgYTGj
# It 's not the end
I hope that this plugin can bring some benefits to your work.
This series is not yet end and we will still meet again to discuss about more interesting plugins afterward. If you have any questions, please place a comment and i will try to reply as fast as possible. Thank you !