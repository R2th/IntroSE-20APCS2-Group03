When you build a rails app with many roles of user, I think at this time  the thing that you are most worried about is decentralizing your users. Now  you have a lot of solutions to solve this problem. But now in this article I will show you a `gem pundit` to manage user roles.

### What is pundit ?
`Gem pundit` is a library that helps build a system to limit the resources of an authorized user.
If you need to limit access resoures to certain users, seperating role for the user in your app will be appear. So you can use `Pundit` for manage that problem. `Pundit` helps us to define policy as PORC.

We will still need to determine the role of our users. But now our advantage is mitigating for controllers and models. Policy will handle the most complex part for the model / controller is to allow access to a specific page. 

### How you work with Pundit
**Step 1:** You create a Policy class that deals with authorizing access to a specific type of record.

**Step 2:** You call the built-in authorize function, passing in what you’re trying to authorize access to.

**Step 3:** Pundit will find the appropriate Policy class and call the Policy method that matches the name of the method you are authorizing. If it returns true, you have permission to perform the action. If not, it’ll throw an exception.

### Set up Pundit
I think it is quit easy to set up this gem. For clearly instruction you can check Gem's documentation. Now start to set up it:

* Add `gem "pundit"` to `Gemfle`
* Add  `Include Pundit` into the `application controller`
* Running `bundle install`
* `rails g pundit:install` will create and set the default policy for your application and be defined at the path app/polices.

Now you can check example `application_controller.rb` as below:

```
class ApplicationController < ActionController::Base
  include Pundit
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  protect_from_forgery with: :exception

  private
  def user_not_authorized
    flash[:error] = "Access Deny"
    redirect_to request.referrer || new_user_session_path
  end
end
```

Now  you see the default file of Pundit is application_policy.rb as follows:
```
class ApplicationPolicy
  attr_reader :user, :model

  def initialize current_user, model
    raise Pundit::NotAuthorizedError,"login" unless user
    @user = user
    @model = model
  end

  def index

  end

  def show
  
  end
  .
  .
  .
end
```
For the code above you can see:
* First veriable is `user` and in the controller `pundit` will be passed the `current_user`
* Second veriable is model that we need to authorize.
Policy in pundit and controller will have the same function to check policy in that function.

Example: in your `users_controller.rb` :
```
class UsersController < ApplicationController

  def show
  end

  def index
    @users = User.all
  end

 end
```

Then in user_policy.rb will have the corresponding functions as follows:

```
class UserPolicy < ApplicationPolicy
  class Scope
    attr_reader :user, :scope

  def initialize user, scope
    @user = user
    @scope = scope
  end

  def index?
    @user.admin?
  end

  def show?
    @user.present?
  end
 end
```

### Conclusion
After I introduced to all you about `gem pundit` and I think it is  a choice for considering if you are looking for decentralized solutions for your Rails application.

Reference source
https://github.com/elabs/pundit