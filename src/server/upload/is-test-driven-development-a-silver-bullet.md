**Abstract—** *Building software is not easy. That’s true if we look through the history of software industry, the percentage of successful software product is really low. Many efforts had been made to figure out the reason why and Fred Brooks’s work is an excellent one – the paper “No Silver Bullet - Essence and Accidents of Software Engineering” (1986). More than thirty years gone by, many methodologies in software development had been introduced and one of them is Test-Driven Development. This post is intended to discuss about the impacts of Test-Driven Development methodology on the inherent problems in building software described by Brooks, to see whether TDD helps to solve or to improve any of them, in other words, Is Test-Driven Development a Silver Bullet?*

**Index Terms—** *Test-Driven Development (TDD); No Silver Bullet (NSB)*
***
## 1.	Introduction
<div align="justify">
Fred Brooks Jr. in his famous paper “No Silver Bullet - Essence and Accidents of Software Engineering” (NSB) concluded that “Building software will always be hard. There is inherently no silver bullet.” His explanation is that because of the very nature of software makes it unlikely that there will be any-no inventions which will do for software productivity, reliability and simplicity what electronics, transistors, and large-scale integration did for computer hardware. [1]

However, the paper is written in 1986, more than thirty years ago. In that period, a lot of inventions had been introduced, promising help building software easier, increasing *productivity*, *reliability* and *simplicity*. **Test-Driven Development** was one of them.

The main objective of this post is to reflect the Test-Driven Development methodology with the view of Brooks in software development difficulties.

This post is organized as follows. Section 2 summarizes the four inherent problems with building software according to Brooks view. Section 3 provides brief description about Test-Driven Development. Section 4 presents the effort in establishing the relationship between TDD and NBS to see whether TDD is a silver bullet or not. Section 5 discusses the conclusions and future work.
</div>

## 2.	Why Building Software Will Always Be Hard?
Brooks pointed out the four inherent properties of the software which make building software will always be hard, included: *Complexity*, *Conformity*, *Changeability* and *Invisibility* (C.C.C.I). He asserts that these properties are the *essence* of Software Development, which is unlikely to be changed or replaced. He also pointed out that, our efforts in the last decades just solved the *accidental* difficulties which we made them ourselves, we didn’t really attack the *essence*.

Below is the brief description of those four characteristics.

### 2.1. Complexity

The complexity of a software is represented in their size: the total number of involved elements (no two elements are alike) and the number of interactions between those elements.

The scale-up of a software requires the increment in the number of *different* elements. In most case, these elements interact with each other in *non-linear* fashion make the complexity of the whole increases much more than linearly.

### 2.2. Conformity

The complexity of software development is much harder because one’s software system must conform to other’s software systems and none of them are similar.

### 2.3. Changeability

Because of the fact that software can be changed easily, hence it is under the pressure of changes much stronger than building, cars or computers.

These changes mostly come from the users, laws and machine vehicles. 

### 2.4. Invisibility

Software is invisible and unvisualizable. These characteristics impede the process of design within one mind and the communication among minds.

## 3. Test-Driven Development
### 3.1. An interesting idea called Test-Driven Development

Writing tests is generally a good part in software development process. This phrase appears as an indispensable step which ensure the software product quality before commercializing. In the traditional fashion, testing is implemented after the codes implementation is finished, this make it also known as a Test-Last approach.

In the late 1990s, Kent Beck, one of the 17 original signatories of the Agile Manifesto and also the creator of Extreme Programming (XP), introduced a really interesting idea, in which we will **write test before writing code** (obviously the test will fail in the first run). [3] That idea is formally called Test-Driven Development (TDD), it’s simply a style of programming, no more. Beck just switched the order of testing and coding phrases, then seeing the impacts.

### 3.2. What did Kent Beck talk about some benefits of TDD?

In a talk, Beck once said that he got a lot of anxiety, he tended to get overwhelmed by big problems, and for him, TDD helped him solve those problems. Even if he didn’t know how to implement something, he could almost always figure out how to write a test for it. He was really into that piecemeal style (Beck’s words) because it worked for him.

Beck questioned that “As a programmer do you deserve to feel confident? Can you sleep at night knowing your code works?”. Then he said “the answer should be yes for programmer. So if we agree on that we can talk about how we achieve that. TDD is one way to achieve that and there’s a lot of other ways”.

In conclusion, Beck suggests that TDD can help programmers feel more confident about their code and TDD also be used as a helpful technique for system design. 

### 3.3. Test-Driven Development key concepts

*Clean code that works* is the goal of TDD.

How do we achieve clean code? We’ll let automated tests drive our development. Specifically, we’ll follow these two rules:

* Write new code only if an automated test has failed
* Eliminate duplication

Red/green/refactor is TDD mantra:
1. Red – write a test that doesn’t work
2. Green – write as few as possible codes to make the test pass
3. Refactor – eliminate all of the duplication created in helping the test passed

## 4. The Relationship Between Test-Driven Development Methodology And Brooks’s View 
### 4.1. TDD idea versus C.C.C.I

In Test-Driven Development, by following the two simple rules: write new code only if an automated test has failed and eliminate duplication, they generate complex individual and group behavior with technical implications such as:

“We must design organically, with running code providing feedback between decisions”. [2] This implication looks like attack the *Complexity* essence. Because since we agree that the *Complexity* comes from the large number of involved elements, TDD forces us design in an organically way, take care of each piece of codes before writing, then receiving feedbacks before making another design decision. It sounds like we can minimize the number of involved elements. In other words, TDD help us provide a good design which minimize the software size. Hence, reducing the software complexity, improve its **simplicity**.

“We must write our own tests, because we can’t wait 20 times per day for someone else to write a test”. [2] This implication related to the **reliability** of code, because our code is well covered by tests even they’re not written yet, once the pass code is written, we know that they’re correct without doubt. However, writing a lot of tests might cause reducing the **productivity** because we have to do additional works. 

“Our development environment must provide rapid response to small changes” [2] This implication looks like it attacks the *Changeability* essence. Because in the time that Brooks wrote his NBS paper, he described the Changeability characteristic as a tough problem in building software. Sounds like we scare of changes and if changes don’t happen, our programmer and designer lives would be easier. In the opposite, TDD encourages changes and encourages respond quickly to changes. Since TDD is derived from Agile Methodology and TDD is introduced by one of 17 original signatories of the Agile Manifesto, in Agile, changes are not something that we afraid of, but something that we encourage it to happen. [4]

For the *Conformity* essence, because our system is designed with the support of TDD, it may reach the simplicity, hence, the *Conformity* essence could be improved.

For the *Invisibility* essence, because of covering each piece of code with tests, they are self well documented. In the design process, we might see running code that providing feedback for our next design decision which really help improving design process in one mind. About communication among minds, because each one can see the other’s code running with tests, they might have a pretty good idea of other’s design, hence, improve the communication among minds.

### 4.2. TDD idea versus Brooks suggestions

Not only point out the inherent difficulties in software development, Brooks also suggests four ideas to deal with them, two of them are closely related to how TDD works:

1. Using rapid prototyping as part of a planned iteration in establishing software requirements [1]
2. Growing software organically, adding more and more function to systems as they are run, used, and tested. [1]

Since TDD is both an incremental and iteration development methodology [3] (TDD is derived from Agile methodology), it comes out that TDD methodology is developed with these two suggestions in mind. Or one might say that, Agile methodology is developed with Brooks suggestions in minds of the creators.

### 4.3. TDD in practice and in experiments

According to the paper “Evaluating the Efficacy of Test-Driven Development: Industrial Case Studies”, a study performed at IBM found that the TDD practice helps programmers produce higher quality code. The code developed using the TDD practice showed, during verification and regression tests, approximately 40% fewer defects than a baseline prior product developed in a more traditional fashion. Another experiment results involving 24 professional programmers indicated that TDD help to produce higher quality code because they passed 18% more functional test-box test-cases than the code implemented with a waterfall-like approach. However, using TDD took 16% more time.

Besides, the authors also made two others case studies performed at Microsoft Corporation using TDD. In two divisions inside Microsoft, Windows and MSN respectively. The results showed that the system developed using TDD had a great significant improvement in quality, higher than at least two time compare to non-using TDD system. However, it took 15-35% increase in the overall development time. (Figure 1).
![](https://images.viblo.asia/7e2423e5-3f72-4782-a342-f837ac714405.png)

## 5. Conclusion & Future Work

Based on what have been discussed, in theory, Test-Driven Development methodology is really an impressive idea, looks like a silver bullet because it closely reflects to Brooks’s suggestions. In practice, what TDD impacts on software’s quality is undeniable. TDD improves the **reliability** but reducing the **productivity**. The concern now is also the concern Brooks once said in his NSB paper “we hear desperate cries for a silver bullet, something to make software costs drop as rapidly as computer hardware costs do” [1] which lead to a future work on the cost-benefit tradeoff between the increase in development time and the resulting improvement in software quality.

## 6. References
[1] [Brooks Jr., F. P., “No Silver Bullet: Essence and Accidents of Software Engineering”, (1986)](https://ieeexplore.ieee.org/document/1663532)

[2] [K. Beck, Test Driven Development – by Examples. Boston: Addison Wesley, 2003](https://www.amazon.com/Test-Driven-Development-Kent-Beck/dp/0321146530)

[3] [Wikipedia, Test Driven Development](https://en.wikipedia.org/wiki/Test-driven_development)

[4] [Wikipedia, Agile Software Development](https://en.wikipedia.org/wiki/Agile_software_development)

[5] [Thirumalesh Bhat, Nachiappan Nagappan, "Evaluating the Efficacy of Test-Driven Development: Industrial Case Studies"]( http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.187.9671&rep=rep1&type=pdf)