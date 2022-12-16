In computer science, usually the problem is not how to solve a problem, but how to solve a problem efficiently. For instance, take the problem of searching. Many searching algorithms are well-known; the difficulty is not to find a way to search an element, but to find a way to efficiently find. We gonna discuss about it in here, and also about big O notation

### Why Important
Let someone is assigned to write a program to process some records the organization receives from time to time. You implemented two different algorithms and tested them on several sets of test data. The processing times you obtained are in Table 1.


| # of records | sol1 | sol2 |
| -------- | -------- | -------- |
| 10000    | 0.5s     | 0.8s     |
| 50000    | 5s     | 1.2s     |


After implementation, we probably can tell which of these two implementations is better for us. For the organization this solution may be fine. But from the developer’s point of view, it would be much better if he could estimate the values in Table before writing the actual code – then he could only implement the better algorithm.

### Big-O
Big  O  notation (with  a  capital  letter  O,  not  a  zero),  also  called Landau's  symbol,  is  a 
symbolism used in complexity theory, computer science, and mathematics to describe the 
behavior  of  functions.  Basically,  it  tells  us  how  fast  a  function  can compute.  
Landau's  symbol comes  from  the  name  of  the  German  number  theoretician  Edmund 
Landau  who  invented  the  notation.  The  letter  O  is  used  because  the  rate  of  growth  of  a function is also called its order.  
For  example,  when  analyzing  some  algorithm,  one  might  find  that  the  time  (or  the 
number of steps) it takes to complete a problem of size n is given by 
`T(n) = 3 n^2+ 2. `
If  we  ignore  constants  (which  makes  sense  because  those  depend  on  the  particular 
hardware the program is run on) and slower growing terms, we could say "*T(n) grows at the order of n^2*" and write:
`T(n) = O(n^2). `

### Some Common Term
Here  is  a  list  of  classes  of  functions  that  are  commonly  encountered  when  analyzing 
algorithms. The slower growing functions are listed first. c is some arbitrary constant. 

| Notation| Name |
| -------- | -------- |
| O(1)      | constant      |
| O(log(n))      | logarithmic     |
| O((log(n))^c)     | polylogarithmic     |
| O(n)      | linear     |
| O(n^2)      | quadratic     |
| O(n^c)      | polynomial     |
| O(c^n)      | exponential     |

### Example
The best way to understand Big O fruitfully is by producing some examples in code. So, below are some common orders of growth along with descriptions and examples.

#### O(1)

O(1) describes an algorithm whose execution time(or space) is always same, regardless of the size of the input data set.

```ruby
def element_at data, n
  data[n]
end
```

#### O(N)

O(N) describes an algorithm whose performance will grow linearly and in direct proportion to the size of the input data set. The below example demonstrates how Big O always count the worst-case performance scenario; Big O notation will generally assume the upper limit where the algorithm will perform the maximum number of iterations.

```ruby
def sum_of_array data
  sum = 0
  data.each do |n|
    sum += n
  end
  sum
end
```

#### O(N^2)

O(N^2) represents an algorithm that performs in the proportion to the square of the size of the input data set. This is common with algorithms that has nested iterations over the data set. Deeper nested iterations will result in O(N^3), O(N^4) etc.

```ruby
def find_pair_in_array data, sum
  (0..data.length do |i|
     (i..data.length do |j|
      return true if data[i] + data[j] == sum
    end
  end
  false
end
```

#### O(2^N)

O(2^N) denotes an algorithm whose growth doubles with each iteration to the input data set. The growth curve of an O(2^N) function is exponential - starting off very low, then rising exponentially. An example of an O(2^N) function is the recursive calculation of Fibonacci numbers.

```ruby
def fibonacci data, n
  return 1 if n == 1
  fibonacci(data, n - 1) + fibonacci(data, n - 2)
end
```

Hope it help you. Thank you.

Help: http://web.mit.edu/16.070/www/lecture/big_o.pdf