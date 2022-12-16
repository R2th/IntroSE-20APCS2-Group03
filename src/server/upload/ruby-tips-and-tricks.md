In this post I am going to show you lots of Ruby trick shots that very experience rubyist that I know have said I don't know that all. 

### Random number from a range 
getting a random number in ruby is quite easy. We use the random method. Effort here is very simple. 

```ruby 
rand(10)
=> 7
```

It will give output number from 0 to 9. We can also get a random number from an inclusive range like as follows using rand() 


```ruby
rand(10..20)
=> 15
```
### awesome_print
Most rubyists frequently have a need to get a nicer representation of their objects dig into them for the debugging that type of thing and you might be used to using `P` or `PP` which is pretier version. But awesome_print is an even prettier version. Awesome Print is a Ruby library that pretty prints Ruby objects in full color exposing their internal structure with proper indentation. Rails ActiveRecord objects and usage within Rails templates are supported via included mixins.

#### How to use it: 
Open the irb console and then require it after install this gem. 
```ruby
-> require "awesome_print"
-> awesome_print [1, 2, 3]
[
    [0] 1,
    [1] 2,
    [2] 3
]

```
or in short, you can use `ap` in short
```ruby
-> ap [1, 2, 3]
[
    [0] 1,
    [1] 2,
    [2] 3
]

```

You can go to the [ github page](https://github.com/awesome-print/awesome_print) and learn more about it because I have just shown you the very basics. It even integrates with active record, there is a way to make it be the default output format in IRB or Pry. Definitely it is one of my recommended libraries. 

### Curious concatenation 
This one really is curious. Let's say we want to concatenate one string to another. Well some people may consider the following: 

```ruby
-> "Fram" + "gia"
=> "Framgia"
```
Or you can use `concat()` method

```ruby
-> "abc".concat("def")
=> "abcdef"
```
That's nice and simple. The good thing is that using concat will actually return exactly the same object. It takes the `abc` string and then puts the `def` into it but it is exactly the same object ID. But there is another way of doing this. Try the following: 

```ruby
-> puts "abc" "def"
=> abcdef

-> x = "abc" "def"
=> "abcdef"

-> x = "abc" "def" "ghi"
=> "abcdefghi"
```
Now what is going on here! You might not see any methods or anything going on, just merely having spaces in between multiple strings gets us them all concatenated together. It is a more direct way of concatening string together. Interesting curiosity!

### Simple presence of a substring 
This is the simplest way to check whether one string contains another as a substring. 

```ruby
-> x = "This is a simple string" 
=> "This is a simple string"
```
Here x equals "This is a string" and the most common way I see people do thia is they would do the same using a regular expression and put that together. It is actually a lot simpler than that. Just do the following: 

```ruby
-> x["simple"]
=> "simple"
```

Now if the substring doesn't exist inside there, you will get nil back. So you can use this even in a conditional.  

```ruby
-> x["test"]
=> nil
```

### Space as string delimiters
Useless tric alert! You may know there are many ways to put literal strings into ruby. For example

```ruby
x = "This"
=> "This"

-> x = %{This}
=> "This"

-> x = %|This|
=> "This"
```
You can use lot of different things a delimiters, the number of special characters you can use. You can also use spaces like as follows: 

```ruby
-> % hello .length
=> 5
```
It actually works! Don't use it **but it's a trick.**

### Instance variable interpolation shorthand 
String interpolation in ruby is very simple. Here we have two strings one on instance variable called @mystr and another on a local variable mystr, different strings however.

```ruby

@mystr = "this is a test"
=> "this is a test"

-> mystr = "this is a test as well"
=> "this is a test as well"
```
Now if I want to interpolate the strings I might use pound sign(#), than the start of curly brace, followed by the variable and then closing curly brace like as follows. 

```ruby
-> "abcd" #{mystr}"
=> "abcd this is a test as well"

-> "abcd #{@mystr}"
=> "abcd this is a test"
-> "abcd #{2 + 2}"
=> "abcd 4"
```
 If you are using an instance variable or any variable that has a sigl at the start that is the @ symbol or the $ symbol, you actually don't need the curly braces. 
 
 ```ruby
 -> "abcd #@mystr"
 => "abcd this is a test"
 
 -> "abcd #mystr" // Don't try this
 ```

### Ruby syntax checking at the command line
If you want to check the ruby source code file if it is syntactically valid, you can do so directly from the command prompt. Just use `ruby -c file_name`

```ruby
-> ruby -c awesome.rb
=> Syntax OK

-> ruby -c badcode.rb
=> badecode.rb:5: syntax error, unexpected $end, expecting '}'
```

That's all from my ruby tips and tric today. 
#### Reference: 
[Google](https://www.google.com/)

[Ruby Documentation](https://www.ruby-lang.org/en/documentation/)