Data Flow testing is one of the testing strategies, which focuses on the data variables and their values, used in the programming logic of the software product, by making use of the control flow graph. Data flow testing is the form of white box testing and structural type testing, which generally keeps check at the points, where the data values are being received by the variables, and at the points, when it is called for use. It is used to fill the gap between the path testing and branch testing.

The basic idea behind this form of testing, is to reveal the coding errors and mistakes, which may results in to improper implementation and usage of the data variables or data values in the programming code i.e. data anomalies, such as:
* All the data variables, present in the programming code have been initialized or not,
* Data variables which are put into use, have been, priorly initialized or not,
* If the initialized data variables, has been used, at least once, in the programming code.

### 1. How data is used in the Programming Code?
Generally, data objects occurring in the programming life cycle goes through 3 phases

* **Definition:** data variables are defined, created and initialized, along with the allocation of the memory to that particular data object.

* **Usage:** Declared data variables may be used in the programming code, in two forms
1. As the part of the predicate(P), such as "If (A>B)"
1. In the computational form(C), when the data items are involved in the calculations to give some output.

* **Deletion or Kill:** Memory allocated to the variables, gets freed and is put into for some other use.

### 2. Types of Data Flow Testing:
The process of data flow testing may be carried out through two different approach or methodology.

* **Static Data Flow Testing**

In static testing, study and analysis of code is done without performing the actual execution of the code such as wrong header files or library files use or syntax error. Generally, during this type of testing, d-u-k pattern, i.e. definition, usage and kill pattern of the data variables is monitored and observed with the help of control flow graph.

* **Dynamic Data Flow Testing**

It involves the execution of the code, to monitor and observe the intermediate results. It basically, looks after the coverage of data flow properties. This type of testing may comprise of following activities:
1. Identification of all d-u pairs, i.e. definition and usage in the code.
1. Detecting feasible path between each definition and usage pair.
1. Designing & creating sets of test cases for each path.

### 3. Data Flow Testing Coverage:
The coverage of data flow in terms of "sub-paths" and "complete path" may be categorised under following types:

* **All definition coverage:** Covers "sub-paths" from each definition to some of their respective use.
* **All definition-C use coverage:** "sub-paths" from each definition to all their respective C use.
* **All definition-P use coverage:** "sub-paths" from each definition to all their respective P use.
* **All use coverage:** Coverage of "sub-paths" from each definition to every respective use irrespective of types.
* **All definition use coverage:** Coverage of "simple sub-paths" from each definition to every respective use.

### 4. Advantages of Data Flow Testing:
Data Flow testing helps us to pinpoint any of the following issues:

* A variable that is declared but never used within the program.
* A variable that is used but never declared.
* A variable that is defined multiple times before it is used.
* Deallocating a variable before it is used.


### 5. Data Flow Testing Limitations:
With the advantages of using the exploratory testing in the agile environment, some limitations are also associated with it such as:

* Testers need to have sufficient knowledge of the programming.
* Time-consuming and costly process.



```
Reference: 
https://www.tutorialspoint.com
http://www.professionalqa.com
```