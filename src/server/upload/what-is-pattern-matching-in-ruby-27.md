### 1. What is Pattern Matching?
Pattern matching is a way of defining a pattern for our data, and if the data matches that pattern, we can do something with the data according to this pattern. And we can say, with pattern matching we obtain specific parts of data selected on specified rules.
In this presentation we can also find a sentence, that for Ruby pattern matching is a case/when with a multiple assignment.

In the ruby Pattern Matching is shown via the `case` statement , however it is not accompanied by `when` but paired with `in`  as you can below:

```
case [variable or expression]
in [pattern]
  ...
in [pattern] if [expression]
  ...
else
  ...
end
```
The processing of the patterns, they are run in the order with normal `case` until we find the first match. When no case there will be no pattern was found, `else`  will be executed. we will get `NoMatchingPatternError` when no case was found.
### 2. Basic Pattern
**2.1 Value Pattern**

Now in statmant `case` we number `10` and at `in` statment we put range number as `1..100` as below:
```
case 10
  in 0..100
    p 'it is match!'
end
```
As you can see the out put should be: `it is match!` . what happend when we put number `101` in in statmant `case` as below? :
```
case 101
  in 0..100
    p 'it is match!'
end
```
When the matching fails it outputs a NoMatchingPatternError followed by the tested object inside a parenthesis.

**2.2 Variable Pattern**

For variable pattern, you can use it to show value that you compare in statment.
```
case 100
  in num
    p "num got its name bound to #{num}"
end
out put "num got its name bound to 100"
```

**2.3 ARRAY PATTERN**

Not only value or variable but we can also use pattern with array. Now let's see the code below:
```
case [0, 1, 2]
  in Array(0, 1, 2) => arr
    p arr
end

case [0, 1, 2]
  in Object[0, 1, 2] => arr
    p arr
end

case [0, 1, 2]
  in [0, 1, 2] => arr
    p arr
end

=> [0, 1, 2]

case [0, 1, 2]
in [0, a, 3]
 :no_match       
end
#=> NoMatchingPatternError ([0, 1, 2])
case [0, 1, 2]
in [0, a, 2]
 a        
end
#=> 1
case [0, 1, 2]
in [0, *tail]
 tail  
end
#=> [1, 2]
```
Also with array patterns, we can go decoding arrays

```
case [1, 2, 3]
in Array(a, b, c)
  puts a, b, c
end
# => 1
# => 2
# => 3
```

**2.4 AS PATTERN**

`As Pattern` will assign the value to the variable immediately after the pattern with the `=>`  if it matches that pattern. We can also bind the variable to a value using as pattern. It can be useful when we need more complex assignments..
This pattern is quite useful for developers to check match condition.Now you can check example below:

```
email = 'abc.com'

case email
  in /.+@.+\.\w/ => email
    p "Sending to #{email}"
  else
    p 'This is not an email'
end
=> "This is not an email"
```

**2.5 Hash Pattern**

Hash pattern is similar to array pattern. It is not only use for hash object but we can use it with specific rule with its.
```
translation = {orig_lang: 'kh', trans_lang: 'en', orig_txt: 'ខ្មែរ', trans_txt: 'Khmer' }

case translation
in {orig_lang: 'kh', trans_lang: 'en', orig_txt: orig_txt, trans_txt: trans_txt}
  puts "#{orig_txt} => #{trans_txt}"
end
```

Hash patterns are more flexible than array matches, by default they always test for subsets.
```
hash = {a: 0, b: 1, c: 2}

case hash
  in {b: 1}
    p rest
end
=> [[0, 1, 2]]

case {a: 0, b: 1, c: 2}
  in a:, b:
    p a
    p b
end
=> 0
=> 1
```