![](https://images.viblo.asia/435c54a2-e611-4f44-9929-41fc6bde4c78.png)

Let's continue with the addressing:

***Works are always associated with defetcs....just as the fire is enveloped with smoke....***

now the question comes what's associate wih defect, like ***Defect Leakage***. Well, let's start by explaining why/how…defect leakage occur. 

### Defect Leakage:
Defect leakage occurs on the Customer or End User side after the delivery of the application. Once the application has been released to the client, if the end user gets any kind of defect using the application, it is called "***Defect leakage***". This Defect Leakage is also called as "***Bug Leakage***".


### A Glance at Defect Leakage: 
In order to calculate the total number of undetected defects and errors, software engineers follow an approach known as Defect Leakage, which helps them to calculate the total defects present in the software system. as well as aids them in validating their testing efforts. Defect leakage is a metric, used by software testers to identify the efficiency of Quality Assurance (QA) TESTING. It measures the percentage of defects leaked from the current stage of testing to the next stage.

### Components of Defect Leakage:
Defect leakage is a metric measuring the percentage of defects leaked from the current stage of testing to the next stage, here the defect leakage elements are:

* It happens on the customer / end-user side after delivery of the application.
* Used to determine the percentage of defect leaked to the next stage.
* Measured in percentage.
* Calculate at the overall level of the project or stage or both.

### How to Calculate Defect Leakage & Ratio:
**Defect Leakage:**
> #Defect found during next phase / (#Defects found during testing + #Defects found during next phase) * 100
 
*For Example, During the UAT production site, 42 defects were detected by the end users and 140 defects were detected throughout the QA process, including both the test site and the production site. Therefore, the defect leakage would be:*

= (42/140)*100

= 30%

So, the Defect Leakage Percentage is **30%**


**Defect Matrix Ratio:**
> (No. Of defect rejected / total no. of defect raise)* 100

I'm going to explain about defect matrix, so why we need different matrix. 
Let consider a view point for example out of 84 defects, we reported over the 64 are actually defects what means our 20 defects we reports are all wrong, it is a mistake during testing period so how we can calculate them? How can we measure the quality of our test execution?

Well there are two matrix we have to measure the quality of our execution. Let's say one is Defect Rejection Ratio the other one is Defect Leakage Ratio the earlier example.

Both are different, Defect Rejection Ratio (DRR) means we reported some defects to the developer and developer has rejected, because they are invalid that is a basically comes under the Defective Rejection and on the other hand Defect Leakage, we haven't found those defects and left those defects in testing period because we could not find those in depth which are containing  in the application in customer end. Here we have a form like a defect rejection ratio means  number of defects rejected by total number of defects raised into 100, this formula will give you defect rejection ratio.

In the above scenario, you can get the Defection Rejection Radio is **23.8%**


### Reason for Defect Leakage: 
Following these reasons can lead to high defect leakage:

* Lack of test cases to cover satisfactory conditions
* Absence of specific test cases and review process.
* Environment differences.
* Because of unclear requirements poorly designed test case.
* Incorrect deployment in UAT or production.
* Use of incorrect test data

### Ways to Prevent Defect Leakage: 
The ways to avoid high-leakage defects are:

* Test the product like an environment in the real world.
* Verify sensitive content and fields
* Choose a specific area, and perform a detailed analysis and test.
* Find components which are susceptible to high leakage of defects.
* Perform rigorous testing on tiniest components.
* Consider a rewrite if things are truly bad.
* Take a closer look at the whole system.

In conclusion, Defective leakage is the best way to validate test efforts. Additionally, Its significance is considerable since the lower the defect leakage value, the better the software test quality.


```
References:  
http://findnerd.com/list/view/How-to-Calculate-Defect-Leakage/4699/
https://www.slideshare.net/ProfessionalQA/defect-leakage-formula-components-reasons-and-ways
```