Do you ever run rspec in your project take time 20 mn or much that this or not ? It maybe become normal for you, if you want to run it all for making sure that your editing code is not effected to any function expectation. Unfortunately, if you meet some case fails or you need to update current rspec to correct with current logic, Clearly that you need to run fails case few times and worse than this sometime you need to run all case in project. It seem so borde  when it waste much time to run slow rspec. It have a lot of cases that make your rspec become slow. In this article, i want to show all of you some cases effected to your rspec performace.

### Slow because of configure in spec_helper
Plz take a look example below:
```
# spec/models/user_spec.rb

describe "associations" do
  subject(:user) { User.new }

  it { should have_many(:orders) }
  # 12 additional association specs
end
```
Result:
![](https://images.viblo.asia/b25c132e-e069-4653-a5ce-90da70cbbd3f.png)

It takes more than 3 seconds to test the model relationships, even without call any database,it seem take too long. And it is cause from large logic in file spec_helper so it make our rspec become slow also.
Now let's command all logic in file spec_helper and run it again:

```
# spec/spec_helper.rb`

RSpec.configure do |config|
  # > 300 lines of around, before and after blocks
end
```

![](https://images.viblo.asia/d31adaa4-86d1-4745-b649-b04387eee713.png)

As you can see speed is faster nearly 9 times that before. Now we will start toinvestigate about the causes and how to solve the problems that lead to our rspec running so long in spec_helper.

### Case 1
```
# spec/spec_helper.rb

config.before(:each) do
  stub_something
end
```
The before block above is only needed for the `feature` spec but if we write it like this, it will run before all spec. So we need write it as below to make it faster:

```
# spec/spec_helper.rb

config.before(:each, type: :feature) do
  stub_something
end
```
But sometime doesn't mean all `feature` spec need to run block code above. So we can make better as below:

```
# spec/spec_helper.rb

config.before(:each, :stub_something) do
  stub_something
end
```
### Case 2
```
# spec/spec_helper.rb

config.before(:each) do |example|
  DatabaseCleaner.strategy = :truncation
end
```
Sometime alot of data can make our rspec become slow also, So we need database cleaning strategies to reset the db, We can create `config.before` block to clean db as below:

```
# spec/spec_helper.rb

config.before(:each, :clean_database_with_truncation) do |example|
  DatabaseCleaner.strategy = :truncation
end
```

### Slow in Spec Setup
Using the RSpec flag profile, we can determine the slowest parameters when running rspec for the file.

```
rspec spec/models/user_spec.rb --profile 5
```

![](https://images.viblo.asia/8448b636-59d5-4800-845a-c19c2fc017e0.png)

Now let's check slow logic in our rspec:

```
# spec/models/user_spec.rb

it "does something" do
  user = FactoryGirl.create(:user)

  # expectation on user
end
```
Even comment all logic except `FactoryGirl` and can see speed is not improved at all. So the cause of the slowdown is most likely due `FactoryGirl`we looked at whether it was needed `FactoryGirl` or could be used `build_stubbed`. In addition, we still consider whether we can optimize the internal code `FactoryGirl` or not.

```
# spec/factories/user_factory.rb

FactoryGirl.define do
  factory :user do

  # more code

  after(:create) do |user|
    create(:billing_profile, user: user)
  end
end
```

In `FactoryGirl`, has created an additional active record for the relationship without using in some spec. This part can be further optimized.

```
# spec/factories/user_factory.rb

FactoryGirl.define do
  factory :user do

  # more code

  trait :with_billing_profile do
    after(:create) do |user|
      create(:billing_profile, user: user)
    end
  end
end
```
So now it is possible to create users with or without creating relationships through the use of the option `:with_billing_profile` Now run rspec again to see if the speed has increased.