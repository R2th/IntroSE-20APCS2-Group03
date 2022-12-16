Memoization is a process that can be used to speed up rails methods. It caches the results of methods that do time-consuming work, work that only needs to be done once.  Here is an example

### Example
Suppose we have a point calculation system where each user can have many rewards. Each reward contans point. Sum of these points is the total point of that user. We have a `total_points` methodin user model which calculate these points . Lets check the below example

```ruby
class User < ActiveRecord::Base
  has_many :rewards, dependent: :destroy

  def total_points
    rewards.inject(0){|sum, a| sum += a.point}
  end
end
```
total_points can be called multiple times in models, view and controllers like

```ruby
<% if current_user.total_points > 0 %>
  <%= current_user.total_points %>
<% end %>
```
Each time we visit this view, we will have multiple calculation for calling `total_points` multiple times. So how can we avoid duplication of query structures and replication of calculations? We will tell several technique regarding this below

### 1. Instance Variable
This is an pretty straight forward and common solution to use instance variables to avoid duplication.

```ruby
class User < ActiveRecord::Base
  has_many :rewards, dependent: :destroy

  def total_points
    @total_points ||= rewards.inject(0){|sum, a| sum += a.point}
  end
end
```

Here when we call `total_points` for the first time, a db query will be run and sum the points, then assign that sum to the instance variable `@total_points`. When we call `total_points` for the second time there is no db query needed, and not performing calculations only returns the variable `@total_points`. 

### 2. Memoizable
Although it is easy to implement memoization using instance variable, but it has some problem. First problem is that we have to change the implementation. in this case, memoization do the job in very transparent way. From Rails 2.2 there is a way to make transparent memoization using memoize inheriting from `ActiveSupport::Memoizable`.

```ruby
class User < ActiveRecord::Base
  has_many :rewards, dependent: :destroy

  def total_points
    rewards.inject(0){|sum, a| sum += a.point}
  end
  memoize :total_points
end
```
This method removes the changing implementation problem and do the memoization automatically. It also gives us option to memorze different input and output in simple manner. We create a new method which fetch total point gained today. We will use memoize which can memoize different result

```ruby
class User < ActiveRecord::Base
  ...

  def today_point
    rewards.where(created_at: Date.today).inject(0){|sum, a| sum += a.point}
  end
  memoize :total_budget, :today_point
end
```
### 3. Memoist Gem
Nonetheless, if we start to add these memoization patterns to a lot of place in our application, our code will get pretty unreadable and pretty messy.  In this case of memoizing many places in our code, we can use a gem that handles memoization for us with a nice, friendly API. **Memoist** seems to be a good one, and pretty similar to what Rails used to have. But it’s always interesting to investigate patterns like this, see how they’re put together, where they work, and where the sharp edges are. And you can learn some neat things about some lesser-known Ruby features while you explore.

Hope this post helps you to know something about memoization. For further info please check the references.

1. https://rails-bestpractices.com/posts/2010/11/22/use-memoization/
2. https://github.com/matthewrudy/memoist