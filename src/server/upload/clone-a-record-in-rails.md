There are some situations where we need to clone a record instead of fill up the form from scratch. It is kind of time saviour where you can just create an entry just by a click rather than filling up the whole form and click "Save". There are ways to do it in rails framwork. We will know about them step by step

#### Using dup(): 
dup() is a public method in object class in ruby. It produces a shallow copy of obj—the instance variables of obj are copied, but not the objects they reference. dup copies the tainted state of obj.  In general, dup typically uses the class of the descendant object to create the new instance.
This method may have class-specific behavior. If so, that behavior will be documented under the #initialize_copy method of the class. 
```
a = User.first
b = a.dup
b.name = "Matz"
b.save
```

But there is a problem. If you want to copy recods association too. You need to do it mannually.

#### Amoeba gem:
Amoeba is a famous gem in rails to clone active records easily. From the name you can easily understand that. In biology, amoeba's are good at reproducing first. Also their children are also good in fast reproduction. Like the amoeba algae, this gem also allows to copy associated objects too. Lets get started,

##### Installation:
Installation of this gem is just like others. You can install this gem either by

`gem install amoeba` or add 

`gem "amoeba"` in gemfile and then `bundle install`.

##### Configuration:
To enable cloning through amoeba gem, we need to configure our model for which amoeba will be used. Lets say, ClassRoom is a class which has many teachers.
```
class ClassRoom < ActiveRecord::Base
  has_many :teachers
end

class Teacher < ActiveRecord::Base
  belongs_to :classroom
end
```
We can enable duplication by simply adding an amoeba configuration block in the classroom model like this
```
class ClassRoom < ActiveRecord::Base
  has_many :teachers
  
  amoeba do
    enable
  end
end

class Teacher < ActiveRecord::Base
  belongs_to :classroom
end
```

So when you use `amoeba_dup` it will clone the classroom record and its association as new entry in the table. You can also tell in configuration, which models to include and what to exclude

```
class ClassRoom < ActiveRecord::Base
  has_many :teachers
  has_many :students

  amoeba do
    include_association :teachers
  end
end

class Teacher < ActiveRecord::Base
  belongs_to :classroom
end

class Student < ActiveRecord::Base
  belongs_to :classroom
end
```

So here we tell the gem that when we use amoeba_dup it will only duplicate teachers association, not the students association through `include_association`.

For exclusion,
```
class ClassRoom < ActiveRecord::Base
  has_many :teachers
  has_many :students

  amoeba do
    exclude_association :teachers
  end
end

class Teacher < ActiveRecord::Base
  belongs_to :classroom
end

class Student < ActiveRecord::Base
  belongs_to :classroom
end
```
Here We say that when we clone classroom object, we dont want duplication of teachers objects. Other associations can be duplicated.

##### Usage:
So after doing your desired configuration, you can duplicate a classroom object simply by

`classroom.amoeba_dup`

Below an example is illustrated,
```
c = ClassRoom.create(title: "Class 1")
c.teachers.create(title: "ms. Y")
c.teachers.create(title: "Mr. Z")

puts Teacher.all.count # should be 2

my_copy = c.amoeba_dup
my_copy.save

puts Teacher.all.count # should be 4
```

Hope this post will help you in future. Happy coding