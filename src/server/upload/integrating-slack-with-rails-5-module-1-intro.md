### Intro
We all know what is [Slack](https://slack.com/), so any introduction is redundant.  This will be a series of step by step guides to integrate Slack with a RoR app  from very start of `rails new` to releasing it on Slack Store.
Because it'll be a long series, I'm targetting this post to just be an intro to give a basic idea about what we're going to implement.

* [Module#1 Introduction](https://viblo.asia/p/integrating-slack-with-rails-5-module-1-intro-1Je5EJgGKnL)
* [Module#2  Slack Web Hooks (sending data from your project to Slack)](https://viblo.asia/p/posting-on-slack-from-rails-app-webhooks-3Q75wa0eZWb)
* Module#3 API creation, Slash commands (sending data from Slack to your project)
* Module#4 Slack custom forms (sending data from Slack to your project interactive way)
* Module#5 Creating Slack Bot (posting message to Slack as a bot user)
* Module#6 Handling installation of your custom app to user's Slack Channel
* Module#7  Releasing yout app in Slack Store

### The project blueprint

We will create a very basic ToDo using rails 5 for the backend demonstration.
The barebone app will just contain two models, User and Task.
A user will have many tasks, and a task will have many users.

![](https://images.viblo.asia/fcdc9ec7-c70d-4efb-b0ce-2fbea494fa7c.png)

This is the ERD, and that's all.
We will handle the Sign In feature using [Slack Ruby Client](https://github.com/slack-ruby/slack-ruby-client) gem.

So, here are the commands used to create the project skeleton

```
rails new ToDoSlack
cd ToDoSlack

rails g model Task title 
rails g model User name slack_name
```

Now, after the models are created, please add the [Slack Ruby Client](https://github.com/slack-ruby/slack-ruby-client) gem to the Gemfile, and run bundle.
That's it for today. We are all setup for beginning our step by step journey

### Module#2  Slack Web Hooks 
On this module we will be implementing the sign_in with Slack feature. Also, we will be sending messages from our app to Slack,
for example `Sending message to slack when a new task is created / updated / deleted.
For this, we will be using the [Slack Incoming Web Hooks](https://api.slack.com/incoming-webhooks) function.
![Sending data from our project to Slack](https://images.viblo.asia/82182d71-0a93-44f6-9bd6-7a3a32b9bf6b.png)

### Module#3 API creation, Slash commands
Here we will create a simple API for Slack to send data to our App.
We will implement the infamous [Slash Command](https://api.slack.com/slash-commands) feature.

### Module#4 Slack custom dialogs
We will create a Custom designed Slack app which is fully interactive with the (Slack Custom Dialog UI)[https://api.slack.com/dialogs]. We will need some extra API endpoints from Module#3.
![Dialog](https://images.viblo.asia/0f160003-4ad2-4add-bf89-65c54229e92d.png)
![Sending data from Slack to our Project](https://images.viblo.asia/187cfef9-6717-47f1-9851-26570bec9dc0.png)
![Custom UI](https://images.viblo.asia/eed1caba-a026-409b-b7f6-d0c49362511f.gif)

### Module#5 Bots rule the world
This module will be focused on creation of a SlackBot, which will talk to our project and the users in the channel. It will be added extra scopes than the Slash command and Slack custom form. The bot will be fully interactive and take necessarry decision upon user's response
[More bots example here](https://jootohandover.slack.com/apps/category/At0MQP5BEF-bots)

### Module#6 Handling installation of your custom app to user's Slack Channel
For your custom project to be installed in Slack, we have to make the app installable. For that we will have two different options, 
1. Create a landing page and make app install for there,
2.  Make the app installable directly from the Slack Store.

[Steps](https://jootohandover.slack.com/apps/category/At0MQP5BEF-bots) are discussed broadly here.

### Module#7  Releasing yout app in Slack Store
To release our app to the Slack App marketplace, we have to meet a bunch of criteria to slacks requirement. We will be using [NGROK](https://ngrok.com/) to make our local server be HTTPS and many other things.
Here is the [Slack App Store](https://jootohandover.slack.com/apps?utm_source=in-prod&utm_medium=inprod-link_app_directory-index-click).


### Conclution
This was a very short introduction to what we will be implementing in our next steps.  Through this series we will be learning all the necessarry elements for making a fully interactive Slack app to get/send message from/to our project, Create an installer and finally release our app in store.  So, See you next time.