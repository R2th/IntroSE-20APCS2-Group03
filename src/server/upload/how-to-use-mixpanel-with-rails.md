### Mixpanel
Mixpanel is a tool that can make us easy to data collection and analysis like Google Analytics. It helps Admin can see users are using their applications with the following information like: 
* Where they come from
* What language they use
* What devices to access
* What broswer they use
* Which pages they use
* And we can also check how many viewers are on each page.

To integrate Mixpanel into your website you need to create account on Mixpanel.
![](https://images.viblo.asia/65783c39-9058-4b1f-9422-a86d9f014b13.PNG)
You can go into [mixpanel website](https://mixpanel.com/) and create account.

Mixpanel give us some feature that easy track user and data as below:
* Notifications
* A/B Testing
* Bookmarks
* Annotations
* Versatile Data Visualization
* Point and Click Analytics
* Visual Coding
* iOS and Android Compatibility
* Mobile Surveys
* Autotrack
* Retention Features
* Customer Engagement

### Mixpanel with Rails
The Mixpanel Ruby library is designed to be used for scripting, or in circumstances when a user isn't directly interacting with your application on the web or a mobile device.
Now i will show you how to use gem` mixpanel-ruby` .
```
gem install mixpanel-ruby
```
After install gem `mixpanel-ruby` now you use call api mixpanel in your app. 

**Tracking Action**

If you want track event user, you can see code as below:
```
require 'mixpanel-ruby'
#PROJECT_TOKEN you can take it from config mixpanel
tracker = Mixpanel::Tracker.new(PROJECT_TOKEN)

# Tracks an event, "delete user",
# with distinct_id user_id
tracker.track(user_id, "delete user")

# Here you add some info 
tracker.track(user_id, "delete user", {
    "DeleteUserDate" => ...
})
```

**Setting Profile Properties**

When you want to store new properties into mixpanel, you can use `people.set`.

```
tracker.people.set(user_id, {
  "$first_name"   => "abc",
  "$last_name"    => "abc",
  "$email"        => "abce@gmail.com",
  "$phone"   => "1111111111",
  "Favorite Color"   => "red"
});
```

**Appending to List Properties**

When you want to append new properties to existing profile property, you can use `people.append `.

```
tracker.people.append(user_id, {
  "Survey" => ...
})
```

MIxpanel also priovide us a lot of fuctions like: `track_charge`, `increment`, ...  So you can check them on mixpanel doc.