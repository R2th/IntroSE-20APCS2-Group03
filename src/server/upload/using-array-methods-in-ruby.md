Arrays are one of the basic constructs of programming. When you have data in array, you have many ways to process it as remove, add, sort .... It appears everywhere and almost always when manipulating data, we always need arrays to process. 
In this article, I would like to introduce all of you some array processing techniques that are considered quite popular and you need to understand it clearly.

### Each
 "Each" allow you to step through “each” item in an array and do something to it.
 Check out some code:
 
```
[1, 2, 3].each { |n| puts "Number is: #{n}" }
Number is: 1
Number is: 2
Number is: 3
```
You need to note that `Each` will be return the original array.

### Map
Performs an action on each array element. The original array is not modified. Returns the modified array.

```
array = [1,2,3]
array.map { |n| n * 2 }
 => [2, 4, 6]
```

### Select and Detect

`.select` allows us to search for elements in the array. You need to define  a conditional statement that returns true or false since it will help us know what elements need to return to array.
`.detect` is also similar to `.select` but `.detect` only return the first element . 

```
array = ['hello', 'hi', 'goodbye']
array.select{|word| word.length > 3}
 => ["hello", "goodbye"]
```

### Reject
`.reject` is defferent to  `.select`. Instead of taking out what we need, ` .reject` will remove the elements that correct with condition.

```
array = [1, 2, 3, 5, 4]
array.reject{|number| number < 3}
 => [3, 4, 5]
```

Basically, when you want to get what you need to use `.select`, when you want to remove element that you do not want please use ` .reject`.

### Reduce
Reduce has a more complex structure than other array processing methods, but in return it is often used quite simply in ruby, mainly for the calculation of elements in the array and then returned. 
Let's check the example below:

```
array = [1, 2, 3]
array.reduce{|sum, x| sum + x}
 => 6
```

We can also manipulate the String array :

```
array = ['amber', 'scott', 'erica']
array.reduce{|sum, name| sum + name}
 => "amberscotterica"
```

### Sorting 

Sorting data is a common practice. You may need to alphabetize a list of names or sort numbers from smallest to largest.
We have a `reverse` method which can reverse the order of the elements in an array.

```
array = ["A", "B", "C", "D"]
reversed_array = array.reverse
=> ["D", "C", "B", "A"]
```

For sorting the array we can user `sort` to sorting element in the array: Plz check example below

```
array = ["A", "D", "B", "C"]
sorted_array = array.sort
=> ["A", "B", "C", "D"]
```

### Join
`.join` really useful when working with arrays, especially with the String
```
cars.map{|car| car[:type]}.join(', ')
 => "porsche, mustang, prius"
```

### slice
This function helps us to clone data from a given array, we just need to specify the starting index value and the ending index you want to clone:

```
array = ["A", "B", "C", "D"]
array[1, 2]        # ["B", "C"] 
array.slice(1, 2)  # ["B", "C"] 
```

### include?
Help us checking if your input is in a given data array.
```
array = ["A", "B", "C", "D"]
array.include? "A"      # true
array.include? "X"      # false
```

### uniq?
Help you delete duplicates in array quickly.
```

[1,2,3,4,1,5,3].uniq   # [1,2,3,4,5]

```

### Conclusion
In this article, I show all of you how to use several methods to work with arrays. You can individual elements, retrieved values by searching through the array, sorted elements, and you transformed the data, creating new arrays, strings, and totals. You can apply it to solve many problems programming with Ruby.