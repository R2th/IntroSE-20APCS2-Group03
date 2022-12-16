# Sandbox Your Console
If you wish to test out some code without changing any data, you can do that by invoking rails console --sandbox. 

```ruby
$ rails c --sandbox
Running via Spring preloader in process 17938
Loading development environment in sandbox (Rails 5.1.6)
Any modifications you make will be rolled back on exit
irb: warn: can't alias context from irb_context.

>> user = User.create!(name: "Test")
=> #<User id: 1, name: "Test", …>
>> article = Article.new(subject: "First Post").tap { |a| a.user = user; a.save! }
=> #<Article id: 1, user_id: 1, ubject: "First Post", …>
>> Comment.new(body: "I need to add this.").tap { |c| c.user, c.article = user, article' c.save! }
=> #<Comment id: 1, user_id: 1, article_id: 1, body: "I need to add this.", …>
>> [Article, Comment, User].map(&:count)
=> [1, 1, 1]
>> exit
```

# Run Class/instance Method in the Console

```ruby
$ rails c
Loading development environment in sandbox (Rails 5.1.6)
>> User.number_to_currency(100)
>> "$100.00"
>> User.time_ago_in_words(3.days.ago)
=> "3 days"
```

# Use Non-Puma Servers in Development

```ruby
source 'https://rubygems.org'
# …
group :developemnt do
  gem "thin"
end
```

# Understand Shorthand Migrations
```
$ rails g resources user name:string email:string token:string bio:text
```
Default is string, can add limits
```
$ rails g resources user name email token:string{6} bio:text
```
```ruby
class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :token, :limit => 6
      t.text :bio
      
      t.timestamps
    end
  end
end 
```

# Add Indexes to Migrations
```
$ rails g resource user name:index email:uniq token:string{6} bio:text
```
```ruby
class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :token, :limit => 6
      t.text :bio
      
      t.timestamps
    end
    add_index :users, :name
    add_index :users, :email, :unique => true
  end
end
```

# Add Associations to a Migration
```
$ rails g resouce article user:references subject body:text
```
```ruby
class CreateArticles < ActiveRecord::Migration
  def change
    create _table :articles do |t|
      t.references :user
      t.string :subject
      t.text :body
      
      t.timestamps
    end
    
    add_index :articles, :user_id
  end
end
```
```ruby
class Article < ActiveRecord::Base
  belongs_to :user
  attr_accessible :body, :subject
end
```
```
$ rails g resource comment user:belongs_to article:belongs_to body:text
```
# Show You the Status of the Database
```ruby
$ rake db:migrate:status

database: db/development.sqlite3

Status   Migration ID       MigrationName
---------------------------------------
  up     20120414155612     Create users
  up     20120414160528     Create articles
 down    20120414161355     Create comments
```

# "Pluck" Fields Out of Your Database
```ruby
>> User.select(:email).map(&:email)
  User Load (0.1ms) SELECT email FROM "users"
==> ["james@example.com", "dana@example.com", "summer@example.com"]
>> User.pluck(:email)
  (0.2ms) SELECT email FROM "users"
==> ["james@example.com", "dana@example.com", "summer@example.com"]
>> User.uniq.plurk(:email)
  (0.2ms) SELECT DISTINCT email FROM "users"
==> ["james@example.com", "dana@example.com", "summer@example.com"]
```

# Merge Nested Hashes
```ruby
$ rails c
Loading development environment (Rails 3.2.3)
>> {nested: {one :1}}.merge(nested: {two: 2})
=> {:nestd => {:two=>2}}
>> {nested: {one :1}}.deep_merge(nested: {two: 2})
=> {:nestd => {:one=>1, :two=>2}}

### 25. Remove Speicific Keys From a Hash
```

# Hide Comments From Your Users
```ruby
<!-- HTML comments stay in the rendered content -->
<% ERb comments do not %>
<h1>Home Page</h1>
```
```ruby
<body>
<!-- HTML comments stay in the rendered content -->
<h1>Home Page</h1>
</body>
```

# Generate Muliple Tags at Once
```ruby
<h1> Articles </h1>

<% @articles.each do |article| %>
  <%= content_tag_for(:div, article) do %>
    <h2> <%= article.subject %> </h2>
  <% end 5>
<% end %>
```
=> 
```ruby
<h1> Articles </h1>

<%= content_tag_for(:div, @articles) do |article| do %>
   <h2> <%= article.subject %> </h2>
 % end %>
```
# Convert a String into Boolean
Converting a string value to a Boolean value can be quite tricky especially when creating web applications. You might receive a Boolean value passed into the application through the URL as a string (e.g: “true” or “false”). Rails has a neat solution to solve this problem. You can easily convert the “true” or “false” string into a Boolean value using:

```ruby
ActiveRecord::Type::Boolean.new.cast("true")
#=> true

ActiveRecord::Type::Boolean.new.cast("false")
#=> false

ActiveRecord::Type::Boolean.new.cast(nil)
#=> false
```
# Safe Navigation Operator (&)
If we proceed calling methods expecting as we have an object, the code might break if object comes up to be nil object.To avoid such case, safe navigation is introduced. This makes sure that our code won’t break even if the object on which method is called is nil object. This should be used when we are good with receiving nil object when the method call fails.
##### try from activesupport
Rails has try method available provided by ActiveSupport. This method provides similar behavior. As the name suggests, it tries calling the method if the object is available. If the method is being called on nil object it returns nil instead of throwing an error.
```ruby
$ nil.try(:some_method)
=> nil
```

##### safe navigation from ruby 2.3
Whenever we are unsure of object being nil object just use ampersand (&) before the method call. For example
```ruby
$ nil&.some_method
=> nil
```
The above code does not throw any exception and returns nil.

# References

[My Rails on Rails Bible](https://guides.rubyonrails.org/)

[Ruby on Rails Awesome Blog](https://weblog.rubyonrails.org/)