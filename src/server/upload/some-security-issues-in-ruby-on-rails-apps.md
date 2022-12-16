### Introduction
Rails is one of many web frameworks in the world of app programming and web development. It has been increasingly used widely, a flexible language, short, easy to learn for programmers.
Even Ruby on rails is good framework for developer, but like any other platform. It still have security issues that developer need to focus on and understand. Here are some issues that we need to know as below:

### Mass Assignment
The mass-assignment feature may become a problem, as it allows an attacker to set any model’s attributes by manipulating the hash passed to a model’s new() method. It assigns custom variables by this wat hackers can try to update multiple fields in the database at the same time, including the field that not allowed to edit with a normal user. For example:
```
<%= form_for @user do |f| %>
  <%= f.label :name %>
  <%= f.text_field :name %>
 
  <%= f.label :surname %>
  <%= f.text_field :surname %>
 
  <%= f.submit %>
<% end %>
```

And in the controller:

```
def update
  @user = User.find(params[:id])
  if @user.update_attributes(params[:user])
    redirect_to ...
  else
    ...
  end
end
```
It seem no problems, but it is really a big security hole. If the user table has an `admin` column, and hacker can easily edit it. Just add a hidden field in the form with:

```
<input type="hidden" name="user[admin]" value="true">
```
What will happen when hacker has permission as admin, It is really bad and dangerouse. That why strong parameters were introduced at the beginning of Rails core version 4. With strong parameters, you provide a list of attributes that are allowed to be changed by the user. You can find out more about Strong parameters.

### Log Private Data

It is a good thing to use Rails app logs for showing your your interactions with the app. However, some personal information can also be recorded, and becomes a delicacy for someone who can access the server.Example like  the data contains user password, credit card number ... In Rails, it has Rails.application.config.filter_parameters to filter out information that we do not need to show in log. 
```
Rails.application.config.filter_parameters += [:password]
```

### Private Tokens
When you developing Rails app, it always have a list of individual tokens to interact with third parties or allow for OAuth2 authentication. So you nees to be careful with these tokens and never show them outside or in a case push it to GitHub public repo. The easiest way is to separate them into environment variables and use gems like dotenv-rails. With dotenv-rails, you create a file called .env and remove that file from the version controller (git). and put the tokens into the file: On production, these variables are always placed in the server configuration file. In older versions of Rails, a secret token is included in the config / initializers / secret_token.rb, but it is not safe for every case. Rails 4 introduced a special file config / secrets.yml with production tokens configured to use an ENV variable.
```
production:
  secret_key_base: <%= ENV["KEY"] %>
```

### Uploading Executable Files
Almost all apps allow users to upload files (images, text files...) . By this way hacker can try to load a malicious file on your server and can automatically execute it, which can lead to many serious problems. For example, when downloading files placed in public folders, but also installed as Apache root directory.
There are many solutions such as Paperclip, Carrierwave and other tools, you should carefully check the documentation and make sure what kind of file that you allow user to upload.