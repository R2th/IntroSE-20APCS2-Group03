## Object-Oriented Testing
* begins by evaluating the correctness and consistency of the analysis and design models
* testing strategy changes 
    * the concept of the ‘unit’ broadens due to encapsulation
    * integration focuses on classes and their execution across a ‘thread’ or in the context of a usage scenario\
    * validation uses conventional black box methods
* test case design draws on conventional methods, but also encompasses special features

## Broadening the View of “Testing”
It can be argued that the review of OO analysis and design models is especially useful because the same semantic constructs (e.g., classes, attributes, operations, messages) appear at the analysis, design, and code level. Therefore, a problem in the definition of class attributes that is uncovered during analysis will circumvent side effects that might occur if the problem were not discovered until design or code (or even the next iteration of analysis).

## OO Testing Strategy
* class testing is the equivalent of unit testing
    * operations within the class are tested 
    * the state behavior of the class is examined
* integration applied three different strategies 
    * thread-based testing—integrates the set of classes required to respond to one input or event
    * use-based testing—integrates the set of classes required to respond to one use case
    * cluster testing—integrates the set of classes required to demonstrate one collaboration

## WebApp Testing
* The content model for the WebApp is reviewed to uncover errors.
* The interface model is reviewed to ensure that all use cases can be accommodated.
* The design model for the WebApp is reviewed to uncover navigation errors.
* The user interface is tested to uncover errors in presentation and/or navigation mechanics.
* Each functional component is unit tested.
* Navigation throughout the architecture is tested.
* The WebApp is implemented in a variety of different environmental configurations and is tested for compatibility with each configuration.
* Security tests are conducted in an attempt to exploit vulnerabilities in the WebApp or within its environment.
* Performance tests are conducted.
* The WebApp is tested by a controlled and monitored population of end-users. The results of their interaction with the system are evaluated for content and navigation errors, usability concerns, compatibility concerns, and WebApp reliability and performance.

## High Order Testing
* Validation testing 
    * Focus is on software requirements
* System testing 
    * Focus is on system integration
* Alpha/Beta testing 
    * Focus is on customer usage
* Recovery testing 
    * forces the software to fail in a variety of ways and verifies that recovery is properly performed
* Security testing 
    * verifies that protection mechanisms built into a system will, in fact, protect it from improper penetration
* Stress testing 
    * executes a system in a manner that demands resources in abnormal quantity, frequency, or volume
* Performance Testing 
    * test the run-time performance of software within the context of an integrated system

## Debugging
![](https://images.viblo.asia/39dd465b-fd35-467f-8a92-18a3d6a52594.png)

## Symptoms & Causes
In many cases, the noncorresponding data are a symptom of an underlying cause as yet hidden. The debugging process attempts to match symptom with cause, thereby leading to error correction.
* symptom and cause may be geographically separated
* symptom may disappear when another problem is fixed
* cause may be due to a combination of non-errors
* cause may be due to a system or compiler error
* cause may be due to assumptions that everyone believes
* symptom may be intermittent

## Consequences of Bugs
![](https://images.viblo.asia/eab131ab-cb71-488c-ad81-4a9e5788009f.png)

## Debugging Techniques
* brute force / testing
    * Most common; but least efficient
    * memory dumps are taken, run-time traces are invoked, and the program is loaded with output statements 
* Backtracking
    * common debugging approach that can be used successfully in small programs.
    * source code is traced backward (manually) until the cause is found 
* Cause elimination
    * A “cause hypothesis” is devised
    * If initial tests indicate that a particular cause hypothesis shows promise, data are refined in an attempt to isolate the bug


**Reference:** *Software Engineering A Practitioner's Approach (7th Ed.) ~ Roger S. Pressman*