
# Introduction
Binary search is one of the fundamental algorithms in computer science. In order to explore it, we’ll first build up a theoretical backbone, then use that to implement the algorithm properly. Binary search is a fast search algorithm with run-time complexity of Ο(log n). This search algorithm works on the principle of divide and conquer. For this algorithm to work properly, the data collection should be in the sorted form.

### Finding a value in a sorted sequence
In its simplest form, binary search is used to quickly find a value in a sorted sequence (consider a sequence an ordinary array for now). We’ll call the sought value the target value for clarity. Binary search maintains a contiguous subsequence of the starting sequence where the target value is surely located. This is called the search space. The search space is initially the entire sequence. At each step, the algorithm compares the median value in the search space to the target value. Based on the comparison and because the sequence is sorted, it can then eliminate half of the search space. By doing this repeatedly, it will eventually be left with a search space consisting of a single element, the target value.

For example, consider the following sequence of integers sorted in ascending order and say we are looking for the number 55:

| 0 |1 | 2 | 3 | 4| 5| 6| 7 |8|9|10|
| -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| 0     | 5     | 13     |19     |22     |41     |55     |68     |72     |81     |99     |

We are interested in the location of the target value in the sequence so we will represent the search space as indices into the sequence. Initially, the search space contains indices 0 through 10. Since the search space is really an interval, it suffices to store just two numbers, the low and high indices. As described above, we now choose the median value, which is the value at index 5 (the midpoint between 0 and 10): this value is 41 and it is smaller than the target value. From this we conclude not only that the element at index 5 is not the target value, but also that no element at indices between 0 and 4 can be the target value, because all elements at these indices are smaller than 41, which is smaller than the target value. This brings the search space down to indices 6 through 10:
| 6| 7 |8|9|10|
| -------- | -------- | -------- | -------- | -------- | 
|55     |68     |72     |81     |99     |

Proceeding in a similar fashion, we chop off the second half of the search space and are left with:

| 6| 7 |
| -------- | -------- |
|55     |68     |

Depending on how we choose the median of an even number of elements we will either find 55 in the next step or chop off 68 to get a search space of only one element. Either way, we conclude that the index where the target value is located is 6.

If the target value was not present in the sequence, binary search would empty the search space entirely. This condition is easy to check and handle. Here is some code to go with the description:

```
binary_search(A, target):
   lo = 1, hi = size(A)
   while lo <= hi:
      mid = lo + (hi-lo)/2
      if A[mid] == target:
         return mid            
      else if A[mid] < target: 
         lo = mid+1
      else:
         hi = mid-1
            
   // target was not found
```

# Complexity
Since each comparison binary search uses halves the search space, we can assert and easily prove that binary search will never use more than (in big-oh notation) O(log N) comparisons to find the target value.The logarithm is an awfully slowly growing function. In case you’re not aware of just how efficient binary search is, consider looking up a name in a phone book containing a million names. Binary search lets you systematically find any given name using at most 21 comparisons. If you could manage a list containing all the people in the world sorted by name, you could find any person in less than 35 steps. This may not seem feasible or useful at the moment, but we’ll soon fix that.

Note that this assumes that we have random access to the sequence. Trying to use binary search on a container such as a linked list makes little sense and it is better use a plain linear search instead.

# Binary search in standard libraries
C++’s Standard Template Library implements binary search in algorithms lower_bound, upper_bound, binary_search and equal_range, depending exactly on what you need to do. Java has a built-in Arrays.binary_search method for arrays and the .NET Framework has Array.BinarySearch.

You’re best off using library functions whenever possible, since, as you’ll see, implementing binary search on your own can be tricky.


