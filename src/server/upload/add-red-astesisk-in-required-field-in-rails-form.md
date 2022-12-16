It is a good practise in a web application form to show the required field with a mark. Normally we see a red star marks * to symbolize this. There are some ways to do it. Most simple way is add * in every label whose corresponding input field is a must. But it is a long and hectic process and also there is a high chance to forget in many places. if you can combine this frontend validation with backend, it would be good isn't it?? Perhaps it would be an automatic solution for this problem. You write `validates: true` in in model and be reliefed for that * marks in form. I will guide you in this post: 

#### The Basics:
Ruby classes can always be re-opened later and manipulated later, known as monkey patching. That’s exactly what we’re going to do here: the FormBuilder that shipped with Rails doesn’t quite do what we want, so we’ll enhance it to automatically mark required form fields. One of the ways to do this is to simply drop the Ruby file with our modifications somewhere in the `config/initialilzers` directory. I just create a file named file_reader.rb in initializer file and put my modified code for label method.


#### FileBuilder Modification:
I put the following code in my initializer file. First look at the code. I have explained below:

```
module ActionView
  module Helpers
    class FormBuilder
      include TagHelper

      alias actual_label label

      def label method, content_or_options = nil, options = nil, &block
        if content_or_options && content_or_options.class == Hash
          options = content_or_options
        else
          content = content_or_options
        end
        if object.class.validators_on(method).map(&:class).include? ActiveRecord::Validations::PresenceValidator
           content = content + "*"
        end
        actual_label(method, content, options || {}, &block)
      end
    end
  end
end
```
#### The Explanation:
On line 1, 2, 3, we reopen the ActionView::Helpers::FormBuilder class, because that’s where the label helper is defined .

Then on line 6, we alias the original implementation of the label helper as actual_helper, so we can pass on the arguments to the original method (last line of the method) after we’ve marked the required field.

On line 8, we simply copy the method signature from the api and follow with determining what the arguments are on lines 6 through 10.

Line 14 is where the magic happens: we loop through all of the model’s validators for the given attribute and see if one of them is a presence validator. If it is, we set the required mark.

On lines 15 , we manually set the label text to the given label  and attach on the required mark if necessary.

With line 17, we pass on our modified label text to the aliased label method (i.e. the original) and let the Rails framework do the rest.

The beauty of it, is that there is nothing else for you to do: the forms you’ve already written will automatically have their required fields marked, as will any forms that are created in the future (whether by hand or via a generator). All you need to do is have a presence validator to the model.

#### Internationalize:
Above is just a simple example to do the patch. but what about if our web application uses more than one language. This solution will create problem actually. So What todo?? It is not the end of the world. Just replace the asterisk add function with this
```
content ||= I18n.t("activerecord.attributes.#{object.class.name.underscore}.#{method}",
          default: method.to_s.humanize)
```

#### Problem with rails admin:
The above solution has some problem with a reknowned admin gem named rails admin. This setup breaks the ui for this app. To run with this admin panel we need to take help from css class too. instead of adding asterisk to the content, we will add a class to the label element and write css to work like before. So our final modified version is
```
module ActionView
  module Helpers
    class FormBuilder
      include TagHelper

      alias actual_label label

      def label method, content_or_options = nil, options = nil, &block
        if content_or_options && content_or_options.class == Hash
          options = content_or_options
        else
          content = content_or_options
        end
        if object.class.validators_on(method).map(&:class).include? ActiveRecord::Validations::PresenceValidator
            if options.class != Hash
               options =  {class: " important"}
            else
                options[:class] = ((options[:class] || "") + " important")
                          .split.uniq.join Settings.salary_module.space
            end
        end
        actual_label(method, content, options || {}, &block)
      end
    end
  end
end
```

You see we add "important class to our validatable label. Now we will right right css for this class to get the same ui output like this
```
label.important:after {
    content: " *";
}
```

Check this in your code and i think it is better solution than adding asterisk mannually. Hope this will help in your work

##### HA5