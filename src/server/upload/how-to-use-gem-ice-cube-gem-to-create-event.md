### Introduction
Handling repeated events (schedules) is common thing that you need to use during you want to create events run everyday, everymonth or some spacific time ... In rails, we have alot of GEM that support you to create  repeated events. But now, let's me introduce all of you how to use gem "Ice Cube". ice_cube is a ruby library for easily handling repeated events. It helps us handle those events easily and very quickly. And you can use this gem for create event for your clendar.

### Set Up
Now add the gem into your Gemfile and run bundle install.
```
gem "ice_cube"
```
After add it to Gemfile, now you can use it in your rails app. You can initialize object Ice Cube as below:
```
schedule = IceCube::Schedule.new
```
From that object, we can call the available methods of ice_cube like get all events, check schedule.... there are many methods that we can use. Now let's create simple rule event.
```
schedule.add_recurrence_rule(
  IceCube::Rule.yearly.day_of_month(31).day(:friday).month_of_year(:may)
)
```

### Initialize the schedule object
```
schedule = IceCube::Schedule.new(start_time = Time.now,  end_time)
```
if we want to specify start_time and end_time we have option to specify in the above mentioned schedule. For veriable start_time and end_time are optional.

### Create rules for the schedule
It have alot of Rules that you use for your  schedule event such as:
```
# every day
schedule.add_recurrence_rule IceCube::Rule.daily

# every n day
schedule.add_recurrence_rule IceCube::Rule.daily(n)
```
```
# every week
schedule.add_recurrence_rule IceCube::Rule.weekly

# every other week on monday and tuesday
schedule.add_recurrence_rule IceCube::Rule.weekly(2).day(:monday, :tuesday)

# for programmatic convenience (same as above)
schedule.add_recurrence_rule IceCube::Rule.weekly(2).day(1, 2)

# specifying a weekly interval with a different first weekday (defaults to Sunday)
schedule.add_recurrence_rule IceCube::Rule.weekly(1, :monday)
```
Now let's see some example below:

**Daily schedules**
```
#schedule every day with mention time
schedule.add_recurrence_rule IceCube::Rule.daily

#schedule with repeat “n” number of days
schedule.add_recurrence_rule IceCube::Rule.daily(repeat_every_n_days)
```
**Weekly schedules**
```
schedule.add_recurrence_rule IceCube::Rule.weekly

#add repeat n number of weeks with the same schedule
schedule.add_recurrence_rule IceCube::Rule.weekly(repeat_every_n_weeks)

#repeat the schedule on only week days (monday to friday)
schedule.add_recurrence_rule IceCube::Rule.weekly.day(1, 2, 3, 4, 5)

#every other week on monday and tuesday
schedule.add_recurrence_rule IceCube::Rule.weekly(2).day(:monday, :tuesday)
```
**Monthly schedules**
```
#every month on the first and last days of the month
schedule.add_recurrence_rule IceCube::Rule.monthly.day_of_month(1, -1)

#every other month on the 15th of the month
schedule.add_recurrence_rule IceCube::Rule.monthly(2).day_of_month(15)
```
**Hourly**
```
# every hour on the same minute and second as start date
schedule.add_recurrence_rule IceCube::Rule.hourly

# every other hour, on mondays
schedule.add_recurrence_rule IceCube::Rule.hourly(2).day(:monday)

# every 10 minutes
schedule.add_recurrence_rule IceCube::Rule.minutely(10)

# every hour and a half, on the last tuesday of the month
schedule.add_recurrence_rule IceCube::Rule.minutely(90).day_of_week(:tuesday => [-1])
```
**Secondly**
```
# every 15 seconds between 12:00 – 12:59
schedule.add_recurrence_rule IceCube::Rule.secondly(15).hour_of_day(12)
```
Similar to this we can also rules such as : monthly, yearly, hourly, minutely, secondly...

### Call the required methods
After you've created the schedule, added the rule for that schedule, next We can call the methods that we need.

```
# take all events until end_time
occurrences = schedule.occurrences(end_time)
 
 #Takse all events 
occurrences = schedule.all_occurrences

# event for single time
schedule.occurs_at?(now + 1.day)

# event for single day
schedule.occurs_on?(Date.today)

# take first(2) event
schedule.first(2) 
schedule.first    

# take last(2) event
schedule.last(2) 
schedule.last   

...
```

As the above example you can see how to call the method, there are many more methods, you can go to its documentation to see details.