This is the part two of our ongoing series on creating a complete Slack app and connecting with our rails app.
* [Module#1 Introduction](https://viblo.asia/p/integrating-slack-with-rails-5-module-1-intro-1Je5EJgGKnL)
* [Module#2  Slack Web Hooks (sending data from your project to Slack)](https://viblo.asia/p/posting-on-slack-from-rails-app-webhooks-3Q75wa0eZWb)
* Module#3 API creation, Slash commands (sending data from Slack to your project)
* Module#4 Slack custom forms (sending data from Slack to your project interactive way)
* Module#5 Creating Slack Bot (posting message to Slack as a bot user)
* Module#6 Handling installation of your custom app to user's Slack Channel
* Module#7  Releasing yout app in Slack Store

# Creating a slack app
Go to [api.slack.com](https://api.slack.com/ ) and create a slack app for yourself.
![](https://images.viblo.asia/547e856e-5855-455e-bd8d-8c4d20b54672.png)
![](https://images.viblo.asia/7def256a-3f6e-4227-b026-0432cc98cd6d.png)

After you're done, you'll be greeted with the control panel of the app.
![](https://images.viblo.asia/47567c09-1ff1-4460-ade9-a5af56bf5dbe.png)

Now we need to enable the WebHook feature for the app.
![](https://images.viblo.asia/3390c9dc-2555-4c46-ae7b-d71792620b14.png)

when you try to enable it, you'll be asked to select which workspace your app is connecting with.
![](https://images.viblo.asia/8f6fb720-dbc3-4bed-a567-1f9187010386.png)

Now, we are done configuring from Slack side. Simple as that.

You'll be given the post url where you'll send your api call. Just send a post message on the url on this structure `{text: "your message"}` and you'll get the message posted on Slack.

![](https://images.viblo.asia/10d63498-9047-42ad-9c00-ae73623a954f.gif)

# Creating the todo app

Just a basic todo app, which sits behind devise authentication.  Enabling devise authentication should be easy enough for you guys to google, so I'm skipping that part.
Now, lets create a Task model using the `scaffold` command.

`rails g scaffold Task title start:datetime end:datetime done:boolean`

We will modify the `TasksController`to call on the webhook whenever we do any action.

So, lets create a class `ExternalApiCaller` to post on the SlackWebhook for us.


```ruby
require "net/http"
require "uri"
require "json"

class ExternalApiCaller
  def call uri, data
    uri = URI.parse uri

    request = Net::HTTP::Post.new(uri)

    req_options = { use_ssl: uri.scheme == "https" }
    request.content_type = "application/json"
    request.body = JSON.dump(data)

    response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
      http.request(request)
    end

    return response.body
  end
end
```
Here's a demo of it in action.
![](https://images.viblo.asia/fbfa1f2a-663a-414f-88d9-05683536d4a7.gif)


Now we modify our controller to fire this method whenever `CRUD` actions were done.

```ruby
require "./app/services/external_api_caller"

class TasksController < ApplicationController
  before_action :authenticate_user!
  before_action :set_task, only: [:show, :edit, :update, :destroy]

  URI = "https://hooks.slack.com/services/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"

  # GET /tasks
  # GET /tasks.json
  def index
    @tasks = Task.all
  end

  # GET /tasks/1
  # GET /tasks/1.json
  def show
  end

  # GET /tasks/new
  def new
    @task = Task.new
  end

  # GET /tasks/1/edit
  def edit
  end

  # POST /tasks
  # POST /tasks.json
  def create
    @task = Task.new(task_params)

    respond_to do |format|
      if @task.save
        format.html { redirect_to @task, notice: 'Task was successfully created.' }
        format.json { render :show, status: :created, location: @task }

        send_slack_notification(
          ["#{current_user} created a new task: `#{@task.title}`",
           "\n", "#{@task.get_url}"].join)
      else
        format.html { render :new }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /tasks/1
  # PATCH/PUT /tasks/1.json
  def update
    respond_to do |format|
      if @task.update(task_params)
        format.html { redirect_to @task, notice: 'Task was successfully updated.' }
        format.json { render :show, status: :ok, location: @task }

        send_slack_notification(
          ["#{current_user} has updated task: `#{@task.title}`",
           "\n", "#{@task.get_url}"].join)
      else
        format.html { render :edit }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tasks/1
  # DELETE /tasks/1.json
  def destroy
    title = @task.title
    @task.destroy
    respond_to do |format|
      format.html { redirect_to tasks_url, notice: 'Task was successfully destroyed.' }
      format.json { head :no_content }
    end

    send_slack_notification("#{current_user} has removed the task:`#{title}`")
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task
      @task = Task.find(params[:id])
    end

    def send_slack_notification message
      return unless message.present?
      eac = ExternalApiCaller.new
      eac.call URI, {text: message}
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def task_params
      params.require(:task).permit(:title, :description, :start, :end, :done)
    end
end
```


And we're done !

![](https://images.viblo.asia/cab25edd-9a1d-476c-aeec-919a3a936f97.gif)

Here's the workspace for the app [c9.io/salekin.slack_webhook](https://ide.c9.io/salekin/slack_webhook).

and here's the [git repo](https://github.com/SSalekin/slack_webhook).
# Finishing thoughts
We could improve upon the app with adding `Activity` gem and call our `ExternalApiCaller` on each activity
# Reference Material
[Slack Documentation](https://api.slack.com/incoming-webhooks)