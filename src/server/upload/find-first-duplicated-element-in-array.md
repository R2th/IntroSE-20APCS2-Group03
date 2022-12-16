Some days ago, I was just surfing some problems in codefights. Then in array category i see this problem. I want to share about the problems, my thought and then how i resolved it

### Problem Statement
The problem statement was like we will be given an array a with some integers. We have to find the first duplicate number for which the second occurrence has smaller index. In other words, if there are more than 1 duplicated numbers, return the number for which the second occurrence has a lower index than the second occurrence of the other number does. If there is no duplicate value then we need to print -1. It is also said that the range of integer value in that array is from 1 to a.size inclusive.

For example, if a = (2, 1, 3, 5, 3, 2), the output should be firstDuplicate(a) = 3.

There are 2 duplicates: numbers 2 and 3. The second occurrence of 3 has a smaller index than the second occurrence of 2 does, so the answer is 3.

ohh another thing i need to mention is that, We’re also given the constraints that our solution should be O(n) time and O(1) space.

### My Initial Approach
Ok so after seeing this problem, i think my self. My first approach was for each element in array a, i will check if it has duplicate value and compare its second occurence index. My Solution is like this

```
def firstDuplicate(a)
    index = a.size + 1 
    a.each_index do |n|
        if dup = a[n+1..a.size].index(a[n]) && n+dup+1<index
            index = n+dup+1
            ans = a[n]
        end
    end
    ans || -1
end
```

It works fine for the problem statement. But it dont pass the problem test cases. So why??

Because there is said in the problem that our solution should be in O(n) time. But if you look at the solution it is solution of O(n^2) complexity in the worst case. Also it fails in O(1) space constraints too. So I needed to find another convenient solution.

### Thinking More
Every statement in a problem like this typically has some meaning. So i looked at the problem statement again and again. Then i see that clue line - "range of integer value in that array is from 1 to a.size inclusive". Clearly, we’re expected to use the array values as array indexes somehow. One solution would be to go through the array, keeping track of whether we’ve seen each value in a seperate array. That solution would look something like this:

```
def firstDuplicate(a)
    counts =Array.new
    a.each do |n|
        return n if counts[n]
        counts[n] = true
    end
    -1
end
```

The best part of this solution is that this solution works fine and runtime is O(n). Unfortunately, it’s also O(n) space so we know it could be more efficient. Let’s try a slightly different approach.

### Final Solution
Coming back to our first clue in the description of the challenge, we know that all our input numbers are positive. So, we actually have an extra piece of data in the original array we can play with: it’s sign. We can walk the array, looking up the value at a[value] for each one, and changing it to it’s negative counterpart. If, when we examine a value, we find it’s already negative, we know that we’ve already seen it and it’s therefore a duplicate.
So the solution i wrote

```
def firstDuplicate(a)
    a.each do |n|
        return n.abs if a[n.abs-1] < 0
        a[n.abs-1] *= -1
    end
    -1
end
```

So i shared my internal thinking to solve a simple but chicky problem. So hope it will help to breakdown prolems in future.