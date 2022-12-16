### Code Coverage :
The degree to which a certain piece of code can be evaluated, by testing the source code under a given test suite. Code coverage is thus a measurement of the extent to which a code is covered.

### Statement Coverage Testing :
This is a metric which ensures that each statement of the code is executed at least once. It measures the number of lines executed. It helps to check the does and dont's of a source code. 

***Let understand the concept with the help of the following source code:***

```
read a;

read b;

if a>b

print "a is greater than b";

else

print "b is greater than a";

end if;
```


***Condition 1 :***
> If a=5 and b=1, then the first print statement is executed.
> 
> Number of statements executed = 5
> 
> Total number of statements in the code = 7
> 
> Statement coverage - 5/7 * 100


***Condition 2 :***
> If a=1 and b=5, then the second print statement is executed.
> 
> Number of statements executed = 6
> 
> Total number of statements in the code = 7
> 
> Statement coverage - 6/7 * 100

This method can be considered a white box testing, as it intends to evaluate the internal structure of the code. A programmer is the one who can perform this task efficiently.

### Branch Coverage Testing:
Branch or decision coverage technique aims to test whether a program performs the requisite jump or branching. If the program branches successfully, then the rest of the code within the branch must also execute efficiently.

The diamond shapes are the decision nodes, based on the true and false conditions, the flow of program takes place.

### Path Coverage Testing :
Path coverage deals with the total number of paths that could be covered by a test case. Path is actually a way, a flow of execution that follows a sequence of instructions. It covers a function from its entry till its exit point. It covers statement, branch/decision coverage. Path coverage can be understood in terms of the following :

* Loop coverage
* Function coverage
* Call coverage
### Loop Coverage :
This technique is used to ensure that all the loops have been executed, and the number of times they have been executed. The purpose of this coverage technique is to make sure that the loops adhere to the conditions as prescribed and doesn't iterate infinitely or terminate abnormally. Loop testing aims at monitoring the beginning till the end of the loop.

### Function Coverage :
This method assures that each function has been invoked.

### Call Coverage :
It is a very common scenario in programming that one function calls another and so on. There is a calling function and a called function. So this coverage technique ensures that there does not exist any faults in function call.

### Coverage Metrics :
There are various techniques for path coverage. Few of them are - Flow graphs, cyclomatic complexity, graph metrices.

* **Flow Graphs -**
This is simply a graphical representation of the flow of a program. Each statement of a program or the decision points are represented using nodes.The nodes that switch to another node, that is, a set of new condition(s), it is known as independent path.

* **Cyclomatic Complexity -**
This technique follows the flow graph technique and aims to calculate the structural complexity of the code. To understand this, let's have a look at the following example. The flow of a program is simply presented with the help of a diagram. The decision nodes are known as predicate nodes.

***The cyclomatic complexity is calculated as follows :***

> V(G) = e-n+2P
> 
> e stands for the number of edges
> 
> n stands for the number of nodes
> 
> P stands for the predicate nodes

### Objectives of Coverage Techniques :
* The entire concept of coverage technique focuses on bridging any gap in test cases.
* A quantitative analysis surely provides a better way to keep a track of the entire process.
* Evaluates how efficient the test cases are in delivering the right output, thereby enhancing the quality of a product.
* To what extent our program is successfully running.


```
Ref: 
http://www.professionalqa.com
https://www.testingexcellence.com
```