## Why is code readability important?
When it comes to developing an application, developers don't give much importance on code readability- it's the last thing they have in mind. They aren't concerned about how the backend code structure would look like as long as they would be getting the desired output. These are usually the people who are all caught up making the functionality work that they don't rather mind the spaghetti code they are making throughout the process. 

Having been part of a training project and in the current team project, I've come to acknowledge the impact of code readability and it's importance to the developer's perspective and community. A code that is poorly written is:
* difficult to understand
* longer time to debug
* hard to maintain


## So what makes code readable?
<br>

**1. DRY (Don't Repeat Yourself) concept**
    
Programmers tend to be lazy sometimes that they write the same code or logic over again. It is best to divide the system into sections, not repeating the code knowledge and creating a single representation of that logic then use the representation of this logic anywhere on any code where one might need it. Repeating a code can create maintainability issues and it will be a hassle fixing the problem individually rather than just fixing the logic in one place. It will be less work when it comes to debugging.
<br><br><br>
   

**2. KISS (Keep It Simple, Stupid) concept**
    
This is a design principle that focuses on the concept that systems should be as simple as possible. It is to avoid unnecessary code complications and just keep it simple as the system works best on this way. 

The easier the code is understood- the more likely it would be approached. However, it is also important to not make it too simple to the point that it would affect functionality. In short, simple but with great logic.

I experienced a situation during a team project that I had created a lot of conditions that made my method look long and messy. The functionality works completely fine but I feel like there would be a much msimpler way on how to make it shorter, straightforward and easier to understand. Whenever I feel like I find my code lengthy, I would refactor it.
<br><br><br>

**3. MVC (Model, view, controller) architecture**
 
 This is an architectural pattern that helps code organization by putting it into separate areas with clear responsibilities. This is most useful when working on a complex web application as it gives a useful way to divide responsibilities. 
 
 If you would create a program and you would put all your code into one program file, it would rather look all messy and confusing, right? The best solution would be to separate them into smaller functions to divide a large application. 

I was already familiar with this concept during my college days and joining a team project that has the MVC framework, it was all easy for me to navigate and learn how the system was put together. So if I wanted to change a part of the code, I could handle the where the main part of the code is not touched. All because it is separated into different parts. I would end up writing a lot less code since similar code is divided into sections and I would just have to call that function where I needed it.
<br><br><br>

**4. Comments**

Comments are a real help as they provide an additional brief explanation for codes especially those which are confusing. But it would be best if that code itself is explanatory to avoid a lot of unnecessary comments. It is also to aid if there is another programmer going through the code and he finds it difficult in understanding it.
<br><br><br>

**5.Naming convention**

It is best to practice the correct naming convention when it comes to naming components like variables, methods, and functions. When assigning names, it should be seen that it is related to what that code is meant to do and think about how it would be interpreted by a person who has never seen your code. It wouldn't confuse the person which would save their time as the name itself should be self-explanatory.
<br><br><br>


**6. Indentation** 

This is one of those common features in programming that most developers would know but are reluctant to follow. But little did they know, not following this basic way contributes to messy code structure which makes it difficult to handle. I also did not give much thought of this during my college days as time pressure was the major factor that I just intend to neglect it. But I've come to realize how this may be a small thing but can greatly convey a better structure of code for other programmers. 

Proper code indentation will make it easy to understand as you can see at a first glance where the first and end of the code block is rather than searching it line by line on where it started or ended. And it is also to be taken note of that there should be consistent indentation throughout the code.