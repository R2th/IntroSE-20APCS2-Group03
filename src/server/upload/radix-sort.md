Sorting is an important element in modern computer science. It is found in almost every task related to vast areas of computer technology. Today i am gonna write about a least popular searching algorithm named **Radix Sort**. 

### Radix Sort
Radix sort is a non-comparative sorting algorithm which works by grouping keys by the individual digits which share the same position and value. In 1887,  Herman Hollerith invented this sorting algorithm when he was working on tabulating machine. Some of the well known compare based sorting algorithm is - Merge sort, Quick sort etc. The lowest complexity for these algorithms are O(nlogn). So we cant get better performance than nlogn from them. Counting sort do linear time sorting. So for n elements, complexity of counting sort is O(n). But what if there are n^2 elements? The performance of counting sort will be worst. In that case Radix sort is the better solution. Radix sort starts its operation from the least significant digit and end up when there is no more digit is left to compare.

### Working Algorithm
The mechanism of Radix sort algorithm is as following - 
For each digit of of all the numbers - 
 - sort each number using counting or any other sort. if 2 or 3 number's considered digit is same, they will be arranged based of there position in previous array.
 - continue doing it until the algorithm reach most significant bit or left-most bit.
 - is case of a number which has no bit left to compare with, assume the comparable digit is 0

Let there be d digits in input integers. Radix Sort takes O(d*(n+b)) time where b is the base for representing numbers, for example, for decimal system, b is 10. What is the value of d? If k is the maximum possible value, then d would be O(logb(k)). So overall time complexity is O((n+b) * logb(k)). Which looks more than the time complexity of comparison based sorting algorithms for a large k. Let us first limit k. Let k <= n^c where c is a constant. In that case, the complexity becomes O(nLogb(n)). But it still doesn’t beat comparison based sorting algorithms.
What if we make value of b larger?. What should be the value of b to make the time complexity linear? If we set b as n, we get the time complexity as O(n). In other words, we can sort an array of integers with range from 1 to nc if the numbers are represented in base n (or every digit takes log2(n) bits).

### Example
Lets Demonstrate an example:
Assume that our un-sorted array that has to be sorted is A and 
```ruby
A = [120, 90, 7, 155, 75]
```
So for better understanding we will convert them to number of same digits. The maximum digit of numbers in array A is 3. So our array becomes
```ruby
A = [120, 090, 007, 155, 075]
```
So in first iteration, the left-most digits will be in consideration. So considering them our array will be note that we place 120 ahead of 90 in first iteration because 120 comes first in original array.
```ruby
A = [120, 090, 155, 075, 007]
```

Now in the second iteration, only the middle digits will be taken into consideration. So our array will be
```ruby
A = [007, 120, 155, 075, 090]
```
And in the last but not the least iteration, we will get our disirable sorted array. and the sorted array is
```ruby
A = [007, 075, 090, 120, 155]
```

### Implementation
Below is the ruby implementation of radix sort
```ruby
def counting_sort(input_arr, exp = 0)
  count_arr = Array.new(10, 0)
  result = Array.new(input_arr.size)
  m = 10**(exp+1)
  n = 10**exp 
  input_arr.each do |item|
      signif_number = (item%m)/n
      count_arr[signif_number] += 1
  end
  for i in 1...10 
      count_arr[i] = count_arr[i-1] + count_arr[i]
  end
  i = input_arr.size - 1
  until i < 0 do
      item = input_arr[i]
      signif_number = (item%m)/n
      count_arr[signif_number] -= 1
      result[count_arr[signif_number]] = item
      i -= 1
  end
  result
end

def radix_sort(a)
  max_num = a.max
  exp = 0
  until max_num == 0 do
      exp += 1
      max_num = max_num/10
  end
  for i in 0...exp do
      a =  counting_sort(a, i)
  end
  a
end
```

thats all from me about radix sort. Hope this article helps you to learn more. Thank you.