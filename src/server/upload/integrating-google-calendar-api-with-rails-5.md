# Intro
This tutorial will be for connecting rails applications with google calendar api.

# Setting up 

First we will need to setup a project to be able for google signup/signin.

Lets create a demo application
`rails new task_scheduler -d=mysql`

We will be using the `devise` and `omniauth-google-oauth2` gems for this purpose.
[Here](https://viblo.asia/p/login-with-google-account-using-devise-and-omniauth-PwRGgWAPGEd) is a step by step guide explaining on how to do it, you can follow that or just google yourself.

One thing to make sure, when you're creating and configuring your app from console.developers.google.com,
enable these services too,

1. Google Calendar API
2. Google+ API
3. Contacts API

![](https://images.viblo.asia/445dac5e-0c6b-452b-9762-b526dfa3181e.png)

Click on the Enable button on top, search `google calendar`, enable it
![](https://images.viblo.asia/871fede3-9658-4ae6-8b6e-b66ca1e27bc7.png)

After you have implemented google signup / signin in your application, it's time to integrate google calendar to the app.
For this, we will need the [google_api_client gem](https://github.com/google/google-api-ruby-client)

Add it in your Gemfile, run `bundle install`

If you follwed the mentioned article, your `config/initializers/devise.rb` should contain a line

```ruby
config.omniauth :google_oauth2, ENV['GOOGLE_API_KEY'], ENV['GOOGLE_API_SECRET'], {}
```

change object at the end of the line, so it looks like this
```ruby
config.omniauth :google_oauth2, ENV['GOOGLE_API_KEY'],  ENV['GOOGLE_API_SECRET'],
  { 
    access_type: "offline", 
    prompt: "consent",
    select_account: true,
    scope: 'userinfo.email, calendar' 
  }
```

we need the `access_type: "offline"` and `prompt: "consent"` fields because we need google to send us the users access_token, refresh_token, and expires_at values.
And `scope: calendar` for the app to ask users permission to grant access to his calendar.

Create a migration and add 3 extra fileds in your user model `access_token`, `refresh_token`, `expires_at`.
When you sign in using google account, you will now be shown a new screen asking your permission for accessing the calendar.

modify your `OmniauthCallbacksController` files `google_oauth2` method, Add these lines
```ruby
@user.access_token = auth.credentials.token
@user.expires_at = auth.credentials.expires_at
@user.refresh_token = auth.credentials.refresh_token
@user.save!
```
So, when you login and grant your app accees to your calendar, you will get your tokens.

Now, we will implement a small app functionality, which will let users to create tasks, set start_date, end_date on tasks, and set members.

For ease of use, let't use scaffold to create our task resource.

```
rails g scaffold Task title description start_date:datetime end_date:datetime event members user:references
```

Here, we will using the event(string) filed, for saving the event_id on the calendar, so, we can update the event later.

And, modify your user model to add this line `has_many :tasks`

For ease of use, we will not create a many_to_many relation between task and user model to set up the members.
Instead, we will just use a string field, and take input in csv format, like
`"a@gmail.com, b@gmail.com, c@gmail.com"`


### The Event
Now lets implement the functionalites to send request to google api.
For this, you can just modify your task model, or just create a service.

whichever path you choose, add these requirements on the top of the file
```
require "google/apis/calendar_v3"
require "google/api_client/client_secrets.rb"
```

and create a constant,
```
CALENDAR_ID = 'primary'
```

this calendar_id is for the api to know which calendar(user can have multiple) will the event be created on.
Every user who has a google account, will have a calendar named 'primary' by default. So, it's safe to just use 'primary' for our tests.
You can query and find if a user has multiple calendars and get the list from [this api](https://developers.google.com/calendar/v3/reference/calendarList/list)


Now, lets add a method in our code, named `get_event`

```ruby
def get_event task
    attendees = task.members.split(',')

    event = {
      summary: task.title,
      description: task.description,
      start: task.start_date,
      end: task.end_date,
      sendNotifications: true,
      attendees: attendees,
      reminders: {
        use_default: true
      }
    }

    event[:id] = task.event if task.event

    event
end
```

This method will create the event hash whcih we need to send to google api.

We will use the summary field as the title of our task, description is as it is (can be empty).
the other fields are

#### sendNotifications 
whether you want the members to get notified about the event creation

#### reminders

```
reminders: {
    use_default: true
}
```

By default, google will send you a reminder notification (push notification) on 30 minutes and 5 minutes before a task starts, but you can override it.
For this, modify it like this

```
reminders: {
    use_default: false,
    overrides: [
      Google::Apis::CalendarV3::EventReminder.new(reminder_method:"popup", minutes: 5),
      Google::Apis::CalendarV3::EventReminder.new(reminder_method:"email", minutes: 30)
    ]
}
```

this way, you will get an email notification at 30 minutes before a task, and popup 5 minutes before.


#### start and end

To create an event on calendar, you should specify your start and end dates. And yes, end date can not be before start date.
Dates must be in the format of "yyyy-mm-dd", here is an example,
```
event = {
  .......
  start: "2018-08-23",
  end: "2018-08-24",
  .......
}
```

but, the api is a litte different if you're willing to send a datetime

```
event = {
  .......
  start: {
      date_time: "2018-08-23 09:30:00 UTC",
      time_zone: "Asia/Tokyo"
    },
  end: {
      date_time: "2018-08-23 10:30:40 UTC",
      time_zone: "Asia/Tokyo"
    },
  .......
}
```
use [this list](https://en.wikipedia.org/wiki/List_of_time_zone_abbreviations) to get your timezones abbreviations
One thing to note here, calendar api is very picky about the format you send your datetime values, and will give error unless you send in [RFC3339](https://tools.ietf.org/html/rfc3339) format.

Also, you can not set one field as date and other filed as datetime.
Both `event[:start]` and `event[:end]` must be datetimes, or both must be dates.

These are the bare minimums for creating an event on the calendar.
But there are many more options you can change, such as setting a recurring event rather than a one time event.
For those, please refer to this [API guide](https://developers.google.com/calendar/v3/reference/events/insert)


### The Client
To send our event hash to googles api, we need to use a client, made by the keys of that user.
We will build it in this section.

Lets just dump a bunch of code here, then we will break it down.
```ruby
def get_google_calendar_client current_user
    client = Google::Apis::CalendarV3::CalendarService.new
    return unless (current_user.present? && current_user.access_token.present? && current_user.refresh_token.present?)

    secrets = Google::APIClient::ClientSecrets.new({
      "web" => {
        "access_token" => current_user.access_token,
        "refresh_token" => current_user.refresh_token,
        "client_id" => ENV["GOOGLE_API_KEY"],
        "client_secret" => ENV["GOOGLE_API_SECRET"]
      }
    })
    begin
      client.authorization = secrets.to_authorization
      client.authorization.grant_type = "refresh_token"

      if current_user.expired?
        client.authorization.refresh!
        current_user.update_attributes(
          access_token: client.authorization.access_token,
          refresh_token: client.authorization.refresh_token,
          expires_at: client.authorization.expires_at.to_i
        )
      end
    rescue => e
      raise e.message
    end
    client
end
```

So, look at this part
```ruby
secrets = Google::APIClient::ClientSecrets.new({
  "web" => {
    "access_token" => current_user.access_token,
    "refresh_token" => current_user.refresh_token,
    "client_id" => ENV["GOOGLE_API_KEY"],
    "client_secret" => ENV["GOOGLE_API_SECRET"]
  }
})
```
we use the current_user's access_token and refresh_token, and our projects API_KEY and API_SECRET to create the ClientSecrects object.
Please note the `'web' => {}` line, this is because our app will be used from pc, via web browsers.
For smartphones, you have to use a different key.
More about it [here](https://developer.android.com/guide/topics/providers/calendar-provider)

```ruby
if current_user.expired?
    client.authorization.refresh!
    current_user.update_attributes(
      access_token: client.authorization.access_token,
      refresh_token: client.authorization.refresh_token,
      expires_at: client.authorization.expires_at.to_i
    )
end
```

we will need a method expired? in our user model

```ruby
def expired?
  expire_at < Time.current.to_i
end
```
use this method to check if the user's tokens have been expired, if so, we will ask for new tokens using the `client.authorization.refres!` code.
and update the newly provided access_token, refresh_token, and expires_at value for our user.

if all went without a hitch, we will get a primed client object for that user, using which we can send our event hash to google api
```ruby
client.authorization = secrets.to_authorization
client.authorization.grant_type = "refresh_token"
```


### The CRUD
Finally, the easiest part
```ruby
  def create(task, user)
    client = get_google_calendar_client user
    event = get_event task
    event = Google::Apis::CalendarV3::Event.new(event)
    client.insert_event(CALENDAR_ID, event)
  end

  def edit(task, user)
    client = get_google_calendar_client user
    event = get_event task
    event = Google::Apis::CalendarV3::Event.new(event)
    client.update_event(CALENDAR_ID, event.id, event)
  end

  def delete(event_id, user)
    client = get_google_calendar_client user
    client.delete_event(CALENDAR_ID, event_id)
  end

  def get(event_id, user)
    client = get_google_calendar_client user
    client.get_event(CALENDAR_ID, event_id)
  end
  ```

# Gotchas
One thing bothered me most when working with Google Calendar was, the lack of documentaion for ruby, even the google's own site lacks proper documentation for the gem.
So we had to find many things using trial and error.

Here are some notable ones,

1. You can't send multiple requests to google within a short period. If you send 4/5 requests in a second, you'll get a `503:Server error` for 3 of them atleast.
2. If you send more than 150 requests to google in one hour from one user (same access_token), the user's quota will get temporarily blocked by google and you'll be shown a `403:quota limit reached` error
3. Sometimes, users tokens will get expired long before the time mentioned by google. See [this](https://medium.com/m/global-identity?redirectUrl=https%3A%2F%2Fblog.timekit.io%2Fgoogle-oauth-invalid-grant-nightmare-and-how-to-fix-it-9f4efaf1da35)
4. Quota limits you can modify from `console.developers.google.com` means shit. Your users will get quota errors without any reason, and without any explanation from Google. 
5. User A invited User B,C,D in task which starts at 1st January 10:30AM. User B changed the time to 11:30AM to held the meeting 1 hour later. This change will only be visible to User B's calendar. User A, C, D will be shown the original time of 10:30 -_-
To propagate the change to every user, owner of the task (who created, in this case A) should make the change.

6. Monitoring console sucks. It's like google deleberately made it least user friendly.
# Study materials
[API Documentation for google calendar](https://developers.google.com/calendar/v3/reference/events/insert)

[Ruby QuickStart by google](https://developers.google.com/calendar/quickstart/ruby)

[How to integrate gcal with rails - readysteadycode.com](https://readysteadycode.com/howto-integrate-google-calendar-with-rails)

[Google Calendar with rails 5 - Sophie DeBenedetto](https://www.thegreatcodeadventure.com/using-the-google-api-ruby-client-with-google-calendar-api/)(most up to date)

[Invalid grant nightmare](https://medium.com/m/global-identity?redirectUrl=https%3A%2F%2Fblog.timekit.io%2Fgoogle-oauth-invalid-grant-nightmare-and-how-to-fix-it-9f4efaf1da35)

[Source code of the app](https://www.github.com) (not complete, please come back within 2 days, I will upload the full source code then)


# Conclution
This photo sums up how I felt working with google_api.
![alt](https://murze.be/uploads/2016/05/Screen-Shot-2016-05-09-at-19.44.40.jpg)

**Dear google bot, if you're indexing this article, please don't flag it as 'offensive' / 'inappropriate'**