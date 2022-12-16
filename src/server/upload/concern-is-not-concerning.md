Refactoring using concern is an nice and easy refactoring pattern. This pattern is based on the simple idea of Ruby modules and mixins, but is particularly handy when it comes to dealing with class methods and callbacks. It is using ActiveSupport::Concern  module for DRYing code for models. The ActiveSupport::Concern wrapper is an efficient way of encapsulating certain functionality that you might be concerned with. These concerns take advantage of two directories that are automatically part of the load path within a Rails application: `app/models/concerns` and `app/controllers/concerns`. So, how do you write a concern, and what should go inside of it? We will learn about it next

### ActiveSupport::Concern:
Concerns are meant to make our lives less complicated. In a blog post pre-Rails 4 titled Put chubby models on a diet with concerns, DHH explains that: 
> “Concerns encapsulate both data access and domain logic about a certain slice of responsibility. Concerns are also a helpful way of extracting a slice of model that doesn’t seem part of its essence (what is and isn’t in the essence of a model is a fuzzy line and a longer discussion) without going full-bore Single Responsibility Principle and running the risk of ballooning your object inventory.”
> 

### Situations to use concern:
Let’s look at a school management application. We have an **Student** model for students that signs up to use our application. Whenever a Students signs up, we want to send them an email telling them that they’ve been registered, and probably highlighting some of the features that they can do to set up their profile on our application. Now, this seems like something that only the Student model would be concerned with, right? Well, yes, until we realize that we need to have another model that needs to share this same functionality! What will students do without **Teacher** ?

For example, now I want that teachers also need to receive the same email and be “registered”. As our application grows, we might even want to create a Registration model, which would belong to an Student and Teacher. Now, obviously we could accomplish what we wanted to by just adding the same lines of code to both models, but that makes for neither DRY code, nor a great separation of concerns. But wouldn’t it be great if we could take this piece of “registration” functionality, wrap it up, and only pull it out when we need to use it? It turns out that is exactly what we can do with ActiveSupport::Concern.

### How to Concern:
Before we write our concern, let’s look at what our Student model looks like. Here’s a truncated version that contains only the logic pertaining to registering a user:

```
class Student < ActiveRecord::Base
  after_commit :register_user, on: :create

  def register_user
      # Where our logic for registering a user
      # would go. Would call on a background job
      # to perform and send our registration email.
  end
end
```
We very well could stick this inside of our Teacher.rb model file and later in Guardian.rb file(if needed), but there’s a better way to do this. There are a few steps to creating a concern, the first of which is recognizing where to put it! Since we’re creating a concern for a model, this will live inside of our `app/models/concerns` directory. We’ll call this concern a Register concern, since that’s its single responsibility, and we can preemptively namespace our concern under Users, which would make its path app/models/concerns/users/register.rb.

Next, we’ll want to extend the Rails ActiveSupport::Concern module itself from within our concern:

```
module Users
  module Register
      extend ActiveSupport::Concern
  end
end
```

Now, for the actual writing, there’s one method that’s going to be our new best friend: the included method, which takes a block. A little-known fact about this callback is that it’s actually defined by Ruby’s Module class, and it’s called whenever a module is “included” into another class or module. This is where we’ll put the important class methods and callbacks that we want to be shared amongst the models that will use our concern.

```
module Users
  module Register
      extend ActiveSupport::Concern

      included do
          after_commit :register_user, on: :create
      end

      def register_user
          send_registration_email(self)
      end

      def send_registration_email(self)
          RegistrationEmailerJob.perform_later(self)
      end
  end
end
```
This is mostly straightforward. All the logic for a registration now lives in this single file, including the creating of a registration association on our target object (in this case, the Student model), the registering of a student by passing our Student instance (self) to our RegistrationEmailerJob. We’re also able to use the after_commit callback hook, since the included method can accept callback names as parameters.

Now that we have all this code in one place, how do we add it to our model? Well, we can do it in a single line:

```
class Student < ActiveRecord::Base
  include Users::Register
end
```
All we need to do is include our concern, just as we would a module. And down the road, when we find out that we need to create Teacher model that shares this set of functionality, all we need to do is add the exact same line to our new model:

```
class Teacher < ActiveRecord::Base
  include Users::Register
end
```
And here’s the really nice part about utilizing concerns in this way: when we realize that we need to change how this works — maybe we need to add another job or service object, or perhaps another, more specific callback — we can add it to one place and update our logic in a single file!  In this case, being able to be “registered” isn’t necessarily something that pertains to the User model specifically. But, it also doesn’t need to be its own object per se. Instead, we really just need a set of methods that can be available to be invoked upon an object, which is exactly what ActiveSupport::Concern provides us with. We can use concerns for controllers like these simple steps.

### Rspec for Concerns:
Unit testing with Rspec is one of the important and efficient way to do in Rails. So question may arise that how to test concers. Its not that hard. You can do it by - 
1. testing cocern functionality in included model
2. Using [shared_example](https://www.relishapp.com/rspec/rspec-core/docs/example-groups/shared-examples)

Now if you know about writing Rspec for model. You can surely do it by first mean. I will tell a little about second way(it is also common though!)

So firstly, we will create a directory `spec/support/concerns` and auto require it in rails_helper file
```
# /spec/rails_helper.rb
...
...
# autorequire the spec/support
Dir["./spec/support/**/*.rb"].sort.each {|f| require f} # autorequire the files
```
Now a possible spec for the above mentioned register concern is

```
# in spec/support/concerns/register.rb
require 'spec_helper'

shared_examples_for 'register' do
  let (:model) {create (described_class.to_s.underscore)}
  
  it 'has a mail job' do
    expect {model.register_user}.to have_enqueued_job(RegistrationEmailerJob)
  end
  ....
end
```
Then, in the specs for my models that include Register, in our case in Student and Teacher Model, should run this shared example to test concern. It is as easy as including a concern in model.

```
# in spec/models/student_spec.rb
require 'rails_helper'

describe Student do

  it_behaves_like 'register'

..... #other specs
```

We will do the same thing in Teacher model for efficient test
```
# in spec/models/teacher_spec.rb
require 'rails_helper'

describe Teacher do

  it_behaves_like 'register'

..... #other specs
```

So thats it. I just give a primary review of concern in rails and how to test. If you want go more deep, go through the rails [doc].(http://api.rubyonrails.org/v5.1/classes/ActiveSupport/Concern.html)

Happy Coding.