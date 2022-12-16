## Continuous Testing?
In Agile, where we frequently release software to production, we need to ensure that software is of high quality throughout the development. We need to test early and we need to test often.
We need to make sure that we get correct requirements to begin with, and to ensure that we test throughout development and not leave testing just before release.

Below are a set of best practices that we can follow to implement and improve testing throughout the development lifecyle.

### 1. Lean Testing
Continuous Testing requires being fully focused on providing value for the business. Rather than spending time and effort on producing artifacts that don’t provide value, we should organize testing in a lean way

* Pair developers with testers to ensure effective unit testing is performed.
* Reduce unnecessary testing artifacts, such as extensive test plans and test cases, reduce waiting times for testing.
* Adapt a more exploratory attitude to testing when testing manually.

### 2. Collaborate With Business
Continuous Testing means testing correctly from the very start. We have to make sure we get good requirements from business to start development.

* QA should build a close relationship with Business Analysts.
* Remove ambiguity from user stories – ensure every user story is testable and includes acceptance criteria.
* Don’t ignore non-functional testing such as performance and security. Do both functional and non-functional testing from the very start of the project.
* Build meaningful end-to-end test scenarios by utilizing trends, data and analytics from the production website to gather information about user activities and user journeys through the application.

### 3. Implement a QA Practice
* Build a strong testing/QA practice which drives development. Define an Agile QA Testing Strategy.
* Run regular QA workshops where the testers can improve their technical skills as well as soft skills.
* Implement appropriate Test Techniques, leveraging technical architecture diagrams, models of the application and mind maps.
* Embed QA within the teams, so that they are aware of any changes to the application.

### 4. Automate Testing
* Continuous Testing requires testing early and testing often. We can use automated testing to get quick feedback on the status of the application.
* Apply Best Practices on Test Automation
* Know when to automate tests and when to leave them as manual tests
* Test automation is the responsibility of both developers and testers.
* Automate regression tests as well as non-functional performance and security tests where possible.
* Ensure you follow the Test Automation Pyramid principle by increasing automated unit tests, API and Integration tests, and only a handful of automated tests through the UI.
* Run automated tests from a Continuous Integration (CI) server.
* Create smoke regression packs that run fast and run them as often as the application is updated.
* Automate new functionality and stories along development rather than leaving them for later.

### 5. Automate Deployments
* In order to make the most of continuous testing, the steps involved in every stage should be seamless, trouble-free and automated.
* Rather than waiting for DevOps to deploy the latest release in a test environment for QA to test, this process should be automated.
* Embrace Task Automation. Automation is not just for testing and verification. Any repetitive heavy-processed manual work should be automated.
* Standardize the test environments so deployment is smooth across different environments and the results of the automated tests are reliable.
* Make use of visualization to scale automated testing to get quick feedback


```
Ref: 
www.testingexcellence.com
www.tricentis.com/what-is-continuous-testing
```