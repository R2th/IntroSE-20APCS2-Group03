Sorting and searching is one of the heavily-used methodologies in this computing world. We can find different types of sorter with different run-time and space complexity.  **bubble sort** has gained as one of the most fundamental sorting algorithms . Today we will learn about an out of the people sorting algorithm named **Comb Sort**. It is actually an upgraed version of bubble sort.

### Comb Sort
In reference to my above statement, Comb Sort is actually developed over the concept of Bubble Sort. In bubble sort, when any two elements are compared, they always have a gap from each other of 1. The inner loop of bubble sort, which does the actual swap, is modified such that gap between swapped elements goes down in steps of a "shrink factor"  Comb Sort improves on Bubble Sort by using gap of size more than 1. The gap starts with a large value and shrinks by a factor of 1.3 in every iteration until it reaches the value 1. Thus Comb Sort removes more than one inversion counts with one swap and performs better than Bublle Sort.The shrink factor has been empirically found to be 1.3. Although, it works better than Bubble Sort on average, worst case remains O(n2).

The repeatation of sorting passes with recessive differences is quite same to Shellsort, but in Shellsort the resulting array is sorted fully in each pass before processing the next-smallest gap. Comb sort's steps do not  give the sorting result fully. This is the reason that Shellsort gap sequences have a larger optimal shrink factor of about 2.2.

### Algorithm
The technique of comb sort is as follows:

* start with a gap with total number of elements in array
* In a loop, check the next gap. 
* find next gap with 1.3
* If the gap is not greater than 1 then break the current loop
* otherwise change the places of elements in current gap

Lets see with example. Suppose our unsorted array is
  
  ```ruby
  A = (-22, 12, 4, 0, 25, -35)
  ```
  
So we can see the number of elements in this array is 6. So we start our inialize gap with 6. 

#### First Gap
After shrinking with 1.3, our new gap value will be **6/1.3 = 4**. So lets check in our array. start with the initial index 0. so the index to compare will be 0+4 = 4. We can see index 0, the value is -22 and at index 4,  the value is 25. so no need to do any swap, in this case.
```ruby
# compare index 0 and 4
before: A = (-22, 12, 4, 0, 25, -35)
after:  A = (-22, 12, 4, 0, 25, -35)
```

Now we increment our next index by 1. So the first index is now 1. And the index to compare will be 1 + 4 = 5. In the array, we can find out that at index 1, the value is 12 and at 5, the value is -35. here we need to swap there place as `A(1) > A(5)`

```ruby
# compare index 1 and 5
before: A = (-22, 12, 4, 0, 25, -35)
after:  A = (-22, -35, 4, 0, 25, 12)
```
We will now move on by going to the next index. So like before, the first index will be 1 + 1 = 2. So the index to compare will be 2 + 4 = 6. But 5 is out of bound for our sorting array. 

#### Second Gap
In previous step our gap value was 4. We worked on that and then we needed to find new gap value. Now our next gap value will be **4/1.3 = 3**. So lets start our business now. For first index 0, the camparable index will be 0+ 3 = 3. There is no need to do any swap because `A(0) = -22 < A(3) = 0`
```ruby
# compare index 0 and 3
before: A = (-22, 12, 4, 0, 25, -35)
after:  A = (-22, -35, 4, 0, 25, 12)
```

In the second pass, the first index will be 1 and so the compared index will be 1+3 = 4. In this case also there is no need do any swap as `A(1) = -35 < A(4) = 25`
```ruby
# compare index 1 and 4
before: A = (-22, 12, 4, 0, 25, -35)
after:  A = (-22, -35, 4, 0, 25, 12)
```

For nex compare, the first value is 2 and the comparable value is 2+3 = 5. And we need to keep it as it is because `A(2) = 4 < A(5) = 12`.
```ruby
# compare index 2 and 5
before: A = (-22, 12, 4, 0, 25, -35)
after:  A = (-22, -35, 4, 0, 25, 12)
```
We now will go to the third gap as the next campared index(3+3 = 6) will be out of bound.

#### Third Gap
For this step our gap value will be **3/1.3 = 2**. So starting with index 0, the comparable value will be  0+ 2= 2. And for this gap value we dont need any swap as `A(0)<A(2)`, `A(1)<A(3)`, `A(2)<A(4)` and `A(3)<A(5)`. So we will go to our next gap value
```ruby
# for gap value 2
before: A = (-22, -35, 4, 0, 25, 12)
after:  A = (-22, -35, 4, 0, 25, 12)
```

#### Fourth Gap
For this step the gap value will be **2/1.3 = 1**. So this will be our last step and after this step we will get our desired sorted array. We can demonstrate this in below snippet

```ruby
## for gap value 1

# for first index 0 and second index 1; A(0) > A(1), swap needed
before: A = (-22, -35, 4, 0, 25, 12)
after:  A = (-35, -22, 4, 0, 25, 12)

# for first index 1 and second index 2; A(1) < A(2), no swap needed
before: A = (-35, -22, 4, 0, 25, 12)
after:  A = (-35, -22, 4, 0, 25, 12)

# for first index 2 and second index 3; A(2) > A(3), swap needed
before: A = (-35, -22, 4, 0, 25, 12)
after:  A = (-35, -22, 0, 4, 25, 12)

# for first index 3 and second index 4; A(3) < A(4), no swap needed
before: A = (-35, -22, 0, 4, 25, 12)
after:  A = (-35, -22, 0, 4, 25, 12)

# for first index 4 and second index 5; A(4) > A(5), swap needed
before: A = (-35, -22, 0, 4, 25, 12)
after:  A = (-35, -22, 0, 4, 12, 25)
```

Thus we get our sorted array after doing comb sort which is
`A = (-35, -22, 0, 4, 12, 25)`

### Ruby Implementation
Following is the ruby implementation of comb sort

```ruby
def comb_sort a
    gap = a.size
    while gap != 1 do
        gap = gap/1.3
        (0...a.size).each.do |n|
            break if n + gap >= a.size - 1
            a[n], a[n+gap] = a[n + gap], a[n] if a[n] > a[n+gap]
        end
    end
    a
end
```

I hope this general information will inspire you to more about comb sorting. Until then. Thank you