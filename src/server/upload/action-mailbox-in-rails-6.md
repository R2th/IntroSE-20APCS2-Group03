# Introduction
Action Mailbox is the new framework that routes incoming emails to controller-like mailboxes in Rails. It allows Rails applications to better integrate with inbound emails. An example of using it is github reply by email for issues and pull request. 

![](https://images.viblo.asia/196f305a-9eeb-47ff-93ed-286e0f157e95.png)

When ever you get notifications from github it says reply to this email directly and it allows you to add a comment from your email ever logging into github. When you click on reply button, it generates the email address with the following format 
`reply+pull_request_id@reply.github.com`
Here the `reply.github.com` is the sub domain used entirly for processing emails for replies and that's basically what you will have to setup in send grid or postmark or whatever tool you use for mailing service. Than in action mailbox, you will be able to go and match those email addresses, find whoever sent it, lookup their user account, than pull out the ID from the email that they sent it to and then you can look up the pull request or issue. 

In this post we will create a simple example to see the basic functionality of action mailbox. 

# Setup
To use action mailbox, we have to install atleast ruby version of 5.1 or later. Here I will use ruby 2.6.1 and rails 6.0.0.rc1
```ruby
rvm install 2.6.1
rvm use 2.6.1 --default
gem install rails -v 6.0.0.rc1
```

# Example
Next we will install action mailbox which will also install active storage. The thing that happens behing the scene for us that we don't really have to pay attention to active storage that stores the coming email. Whenever an email comes into rails, it will save it, keep track of it and whether or not it has been processed then it will load an active job to process it and then delete that email when it's done but it will keep track of the ID and checksum so that this a way for it to deduplicate. So if you ever got the same email twice, it would not process it two times. Let's run the following command. 

```ruby
rails new mailbox_demo_app
rails action_mailbox:install
```

This is going to generates two migrations, for active storage action mailbox and application mailbox. Let's generate a scaffold for User , Discussion and Comment

```ruby
rails generate scaffold User name email
rails generate scaffold Discussion title 
rails generate scaffold Comment user:references discussion:references body:text
rails db:migrate
```

If you look at the schema, you can see the model for action mailbox. The status attribute is for whether or not it is pending, processing or finished.

```ruby
  create_table "action_mailbox_inbound_emails", force: :cascade do |t|
    t.integer "status", default: 0, null: false
    t.string "message_id", null: false
    t.string "message_checksum", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["message_id", "message_checksum"], name: "index_action_mailbox_inbound_emails_uniqueness", unique: true
  end
```

The message_id and message_checksum for the deduplication stuff. The other file that it created for us is `application_mailbox.rb` under the app/mailboxes directory. In this file we will define routes for the emails. They will match against the email address and determine which processing method you want which is called a mailbox. Here you can set up a routing for all the messages to go to a specific mailbox. You can also use regx here to specify routes.   

```ruby
class ApplicationMailbox < ActionMailbox::Base
  # routing /something/i => :somewhere
end
```

Let's generate a mailbox, I will name it as replies and will use it to add replies to a discussion. 

```ruby
rails generate mailbox Replies 
```

It will create `RepliesMailbox` inherited from `ApplicationMailbox` where we will process our mail object. 

```ruby
class RepliesMailbox < ApplicationMailbox
  def process
  end  
end
```

In this file add the following code snippet to process an inbound email 

```ruby
  MATCHER = /reply-(.+)@reply.example.com/i

  def process
    return if user.nil?
    discussion.comments.create(
      user: user,
      body: mail.decode
    )
  end

  def user 
    @user ||= User.find_by(email: mail.from)
  end 

  def discussion 
    @discussion ||= Discussion.find(discussion_id)
  end  
  
  def discussion_id
    recipient = mail.recipients.find{ |r| MATCHER.match?(r)}
    recipient[MATCHER, 1]
  end
```

Note that, the `MATCHER` regx is taken based on the reply email format of the github. For your application it could be changed depending on your application domain. Now use this `MATCHER` regx in the application_mailbox roution. 

```ruby
class ApplicationMailbox < ActionMailbox::Base
  routing RepliesMailbox::Matcher => :replies
end
```

Please note that,  [mail gem](https://github.com/mikel/mail)  is this mail object that you have to work with. The action mailbox stuff is built on top of this mail gem. If you read the documentation of mail gem, you can find how to read an email. You can also find the ways of reading multi-part email. If you have an HTML email usually it comes with a plain text version as well you might have images attached underneath and than referenced in the HTML and it gets very complicated. So typically what happens is that applications like github and Basecamp and so on will just take plain text version of that email and embed that 

**Reading an email**
```ruby
mail.envelope_from   #=> 'mikel@test.lindsaar.net'
mail.from.addresses  #=> ['mikel@test.lindsaar.net', 'ada@test.lindsaar.net']
mail.sender.address  #=> 'mikel@test.lindsaar.net'
mail.to              #=> 'bob@test.lindsaar.net'
mail.cc              #=> 'sam@test.lindsaar.net'
mail.subject         #=> "This is the subject"
mail.date.to_s       #=> '21 Nov 1997 09:55:06 -0600'
mail.message_id      #=> '<4D6AA7EB.6490534@xxx.xxx>'
mail.decoded         #=> 'This is the body of the email...
```

Let's go ahead and add show comments in the discussion. But before that, add the has_many association for comments to the discussion model

```ruby
  has_many :comments
```

Now start the rails server, 
1. create a user with the with an email from the url `http://localhost:3000/users/new`
2.  create a discussion from the page `http://localhost:3000/discussions/new` 
3. Show the comments in the discussion show page

```ruby
#In views/discussions/show.html.erb
<h4>Comments</h4>
<%= render @discussion.comments %>

#In views/comments/_comment.html.erb
<div>
  <strong><%= comment.user.name %></strong>
  <%= simple_format comment.body %>
</div>
```
We are now ready to test this using new rails conduction for action mailbox. In the development environment, you can send email from the page `http://localhost:3000/rails/conductor/action_mailbox/inbound_emails/new`

# References: 
1. [https://weblog.rubyonrails.org/2018/12/13/introducing-action-mailbox-for-rails-6/](https://weblog.rubyonrails.org/2018/12/13/introducing-action-mailbox-for-rails-6/)
2. [https://edgeguides.rubyonrails.org/action_mailbox_basics.html](https://edgeguides.rubyonrails.org/action_mailbox_basics.html)