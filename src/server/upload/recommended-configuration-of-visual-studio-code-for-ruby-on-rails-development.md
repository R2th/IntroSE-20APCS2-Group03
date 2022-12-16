Visual Studio Code is gaining popularity now amongst web developers around the globe. In fact, VSCode tops the latest [Stackoverflow 2019 Survey](https://insights.stackoverflow.com/survey/2019#development-environments-and-tools) for *Most Popular Development Environments*. VSCode offers features like;

* **Intellisense** for code-completion and syntax highlighting,
* **Extensions** which are third-party plugins that makes VSCode more usable, and,
* **Git Integrated Terminal** which provides a built-in terminal inside VSCode.

It also offers support for popular languages such as **PHP**, **C++**, **C#**, and of course, **Ruby**.

> I am Ivan Ray Buglosa, a Ruby On Rails developer from Sun* Philippines, and I've been using VSCode since I started writing codes 3 years ago. 
> This article will mainly discuss how to configure a Ruby-on-Rails-ready Visual Studio Code...
-----
## **VSCode Extensions**
VSCode has a lot of third-party plugins that you can use to boost your productivity. I've listed some of the extensions that I'm currently using below or you can also visit [VSCode Marketplace](https://marketplace.visualstudio.com/vscode) and browse for additional extensions.
* [Ruby](https://marketplace.visualstudio.com/itemdetails?itemName=rebornix.Ruby)
 
     This is basically the most useful extension that you want to use if your coding in Ruby. It lets VSCode support Ruby programming language and offers syntax highlighting specifically built for Ruby. Emmet, which is already built-in in VSCode automatically shows snippets and code-completion for your ruby code.

* [Rails](https://marketplace.visualstudio.com/items?itemName=bung87.rails)

    If you're currently coding in ruby, you'll probably be going to proceed to ruby-on-rails soon. Rails extension gives you the same functionality with Ruby extension like syntax highlighting and Rails framework support. This extension also offers extra functionality for debugging and testing processes in Rails.
    
* [Ruby on Rails](https://marketplace.visualstudio.com/items?itemName=hridoy.rails-snippets)

    Ruby on Rails extension is both Ruby and Rails extension combined. It offers a more specific emmet and syntax highlighting functionality for `.html.erb` and `.rb` files. One notable feature of this extension is the code completion of emmet. You can just put the `<%=`  opening rails tag and automatically, VSCode emmet will suggest some possible methods that you're going to use. It will surely improve your work process.
    
* [Simple Ruby ERB](https://marketplace.visualstudio.com/items?itemName=vortizhe.simple-ruby-erb)

    Simple Ruby ERB extension focuses on improving ruby file structure with `html`. Some of its features are the same with Ruby on Rails extension but its surely important to have this one when you want to code in ruby on rails.
    
* [Atom Dark One Theme](https://marketplace.visualstudio.com/items?itemName=akamud.vscode-theme-onedark)

    One of the biggest rivals of VSCode in development environment applications is [Atom](https://atom.io/). I was an Atom-user before VSCode and I was attached to its theme, font-style, and simplicity. If you're just like me, you can use the Atom Dark One Theme to basically mimic the theme of Atom to your editor. The font-style, font-color of your codes and dark theme editor can greatly lessen the stress of your eyes if working for longer hours.
    
*    [vscode-icons](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons)

![vscode-icons in ruby on rails application](https://images.viblo.asia/d85850d5-ff4c-4348-a3b1-904ab2002096.png)
VSCode-icons automatically detects the file extension and directory contents in your project file structure and adds an appropriate icon. It's just a simple extension but it does help organize your project structure.

## User Settings Configuration
Vscode doesn't support Ruby and Ruby on Rails by default. This means emmet doesn't have auto-close tag feature for `.rb` and `.html.erb` files. But since the editor is very flexible in terms of configurations and modifications, you can hack through some configurations and enable the auto-close tag of emmet. 

You can open user settings by `⌘+,` and search `include languages`.

![include-languages settings](https://images.viblo.asia/0fd774cc-1882-49f3-9936-b25c60b05022.png)

Click the `Edit in settings.json` to customize the laungages in emmet. And add `"emmet.includeLanguages": {"erb": "html"}` in the settings.
![settings-configuration](https://images.viblo.asia/d6df5da0-208f-42a3-b9b2-50cc9a6eb9df.png)

This will enable the auto-close tag for ruby related files.
## Git Integrated Terminal 

Any rails application is automatically initialized with git, so if you're working alone or in team, the integrated terminal will surely boost your coding process. Code and commit in one app.

![open-terminal in mac](https://images.viblo.asia/40fabb84-a662-46d0-b9aa-ede156cac583.png)

> You can open the terminal by following the image displayed at the top or `⌘+backtick` for mac or `Ctrl+backtick` for windows.


The integrated terminal provides features for debugging, git, and console commands. You can develop Ruby applications and run it immediately in the terminal.

![sample-ruby-application-with-terminal](https://images.viblo.asia/ee6346d5-9ef4-4ec9-91e5-1b0dd7c50159.png)

By default, VSCode terminal will automatically use the default shell in your computer. I recommend using [git bash](https://git-scm.com/downloads) if your using either windows or mac but if you really want to go advance, you can install [Oh My Zsh! ](https://ohmyz.sh/) which offers more unique features like git-branching mechanism and dynamic theme for your terminal. Oh My Zsh is currently only available for mac.

![sample zsh terminal](https://images.viblo.asia/d6f5c893-6671-4ec2-b274-9078b1f76552.jpg)


-----

And that's it! After installing the extensions and getting to know more about the terminal, you can now develop your next ruby on rails application. I suggest to read the documentation of [VSCode](https://code.visualstudio.com/docs) or each extension to know more about the functionality of the application.