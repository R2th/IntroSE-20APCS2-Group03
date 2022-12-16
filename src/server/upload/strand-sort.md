![](https://images.viblo.asia/9426f8d4-49af-4e6d-bfee-dda45fb127e0.jpg)


Sorting data efficiently and rapidly is one of the hot talk among the computer science engineers. Several effective algorithms are created to do so, yet more research are undergoing to reach the linear time mark. Today our discussion will be on strand sort, a not very well-known algorithm, is a time-based algorithm that you never hear about probalbly.

### Strand sort
Strand sort is a recursion based sorting algorithm that sorts elements of a list into increasing order. It has O(n2) worst time complexity which occurs when the input list is by chance in reverse order.It performs best with time complexity of O(n) when the input is a list that is already sorted. Strand sort can not work without extra space and its space complexity is O(n).
This mechanism at first transfers the first element of to be sorted list into a sub-list. It then compares the last element in the sub-list to each subsequent element in the unsorted list. If there is an element in the original list that is greater than the last element in the sub-list, the element is transferred to the end of sub-list. This process continues until the last element in the sub-list is compared to the remaining elements in the original list. The sub-list is then added to a new list. Repeat this process and merge all sub-lists until all elements are sorted. This algorithm is called strand sort because there are strands of sorted elements within the unsorted list that are deducted one at a time.


### Algorithm
The generalize algorithm of strand sort is summerized below

1. Suppose input be unordered list and output be desired sorted list.
2. Initialize an empty sublist and move first item of input to it.
3. Go through remaining items of input. For every item x, check if x is greater than last inserted item to sublist. If yes, remove x from input and add at the end of sublist. If no, ignore x  and check for the remainder items
4. Merge sublist into output.
5. Recur for remaining items in input and current items in output.

![](https://images.viblo.asia/81c077ad-1615-4f89-8698-0cdc82a37f9b.gif)



### Implementation
Implementation in ruby as follows
```ruby
def strandSort input, output 
  return if input.empty?
  
  sublist = [] 
  sublist.push input.first 
  input.first.delete
  i = 0
       
  while i < input.size
    if input[i] > sublist.last
      sublist.push input[i] 
      input.delete_at i
      next
    end
    i += 1 
  end
  
  output += sublist 

  strandSort input, output
end
```

### Example
Lets illustrate this with an example. Suppose
```
input= [4, 2, 1, 3, 5, 6]
Initialize : output = []
             sublist = []
```

So now we will transfer the first item to sublist array
```
input= [2, 1, 3, 5, 6]
output = []
sublist = [4]
```

Traverse remaining items of input and
if current element is greater than
last item of sublist, move this item
from input to sublist. Now
```
input= [2, 1, 3]
output = []
sublist[ = [4, 5, 6]
```
                
At this time we will add current sublist into output.
```
input= [2, 1, 3]
output = [4, 5, 6]
sublist = []
```

Following  recursive call:
Transfer first item of input to sublist.
```
input= [1, 3]
output = [4, 5, 6]
sublist = [2]
```

Traverse remaining items of input and move
elements greater than last inserted.
```
input= [1]
output = [4, 5, 6]
sublist = [2, 3]
```

Merge sublist into output.akes advantage of natural runs in the dat
```
input= [1]
output = [2, 3, 4, 5, 6]
sublist = []
```

Last Recursive Call:
remaining {1} first moved to sublist and
then merged into op.
```
input= []
output = [1, 2, 3, 4, 5, 6]
sublist = []
```

### Complexity and Shuffle Sort
Shuffle Sort is a distribution sort algorithm that starts by emmiting the first one-eighth of the the items, sorting them recursively, and storing them in an array. This creates items/8 buckets to which the remaining 7/8 of the items are distributed. Each bucket is then sorted, and the buckets are then togethered. It actually shows the the limitation of strand sort in bigger data set. The average runtime of strand sort is O(n^2). So for fewer elements it works fine because it takes advantage of natural runs in the data. But this advantantage starts to vanish as the number of input data increases. J Sort concept uses strand sort for the data set of less than 40 elements. In Contrast Shuffle sort slices the data set into multiple chunks and sort them parallelly. it works in logarithmic complexity. Also strand sort need extra memory to work. So if the memory is limited in our system, it is advisable to check if it can fit or search for other algorithms to make it work.

Hope this helps Thank you

Reference: https://www.tutorialspoint.com/strand-sort-in-cplusplus