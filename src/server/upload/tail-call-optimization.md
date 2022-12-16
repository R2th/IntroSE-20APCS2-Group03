A tail call is a function call performed as the last action of another function. If a function is called again later in the call chain, that function is said to be tail-recursive, a special case of recursion. This case of recursion is called tail-end recursion. Tail-end recursion is particularly useful, and often easy to handle in implementations. The tail recursive functions considered better than non tail recursive functions as tail-recursion can be optimized by compiler.
 
 ### Recursive call insight
 When a function is called, the computer must "remember" the place it was called from, the return address, so that it can return to that location with the result once the call is complete. Typically, this information is saved on the call stack, a simple list of return locations in order of the times that the call locations they describe were reached. lets check a recursive function first -
 ```ruby
     def fact n
         return 1 if n <= 1
         n * fact(n-1)
     end
 ```
 Above is the simple example of recursion where factorial of a number is calculated. This function multiply current number n with his previous descendents. So to get the result of fact(4), we first need to get fact(3) which need fact(2) to return result. So this holding state need to be stored for the result. Here’s what happens on every function call:
* All registers -the hardware equivalent of variables, where data are stored- are pushed onto the stack (written into memory, but not in the slowest possible way).
* Your computer starts reading instructions from a different memory address (corresponding to the first line of code of the called function).
* Code is executed from that address onward, doing what the function actually does. Usually changing register values in a certain way.
* All register values are popped/retrieved back from the stack, so the function we return to has its data back.
* A return statement is run, and instructions start being read from the previous function again.

### The Trouble
Steps two and four in the above list are costlier to run in terms of time, like most operations that deal with memory. Each push or pop usually takes over ten times what a ‘regular’ (only dealing with registers) instruction does. When you call a function, the compiler adds the function, its parameters, and the return location to the stack.  A call stack is a stack that contains function calls, their parameters and local variables, as well as the return address. This allows the compiler to go back from the code inside the function to where the function was called. It's the compiler's version of leaving breadcrumbs so it knows how to find its way back. 

```
[(fact, n = 4, returnAddress = 1)]
[(fact, n = 3, returnAddress = 5)]
[(fact, n = 2, returnAddress = 10)]
[(fact, n = 1, returnAddress = 15)]
```


Call stack has a fixed size that vary machine to machine. But if the number of call exceeds then the trouble begins. So for above example, with small n, it will run perfectly. But for larger n(say 10000), the system will crash with `Maximum call stack size exceeded` error.

### The Optimization
A tail call is the last instruction that will be executed, not the instruction that is last in the text. For instance, in our fact example, the tail call is performing multiplication, and not the recursive call, because the multiplication operands have to get evaluated before the multiplication can take place.

Functions that do call themselves as the last instruction are called tail recursive functions. Tail recursive functions don't have the problem of stack overflows, because we can do a little trick that avoids adding new items onto the call stack.

There is nothing left to do inside a function after the tail call. You won't return back to the function after the tail call. This means you don't need to pass a return address to the function called inside the tail call. Since the whole point of the call stack is knowing where you need to return, you don't need a new item in the stack if you're calling a function inside a tail call.

To fix our memory issue, we can rewrite our fact function to be tail recursive.
```ruby
     def fact n, f
         return f if n <= 1
         fact(n-1, f*n)
     end
 ```

Let's take a look at the call stack to see what's going on. When we call fact(3, 1) a new item is added to the call stack.

`[(fact, n = 4, f = 1, returnAddress = 1)]`

The function will call fact(2, 3). However, since we are at the end of the function, we no longer need the function's item in the call stack. It also means the return address for the next call will be the same as it is for the current call. So, we can make a shortcut: instead of allocating a new item on the stack, we simply use the one we already have, and just replace the parameters.

`[(fact, n = 3, i = 4, returnAddress = 1)]`

We can keep doing this for every recursive call until we get a result. During the whole time of the factorial calculation we are only using a maximum of one item in the call stack. And the best part is this is true no matter how large the number is!

### Conclusion
 Recursion is a cool paradigm to solve complex problem. and now we can eliminate the memory and runtime issue. Tail-call make a recursion behave like a loop. Although not all problem can be solved with