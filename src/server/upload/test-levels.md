## What is Test Levels?
***Test levels are groups of test activities that are organized and managed together. Test levels are related to other activities within the software development lifecycle.***

**The test levels used are:**
* Component testing
* Integration testing
* System testing
* Acceptance testing

**Test levels are characterized by the following attributes:**
* Specific objectives
* Test basis, referenced to derive test cases
* Test object (i.e., what is being tested)
* Typical defects and failures
* Specific approaches and responsibilities

**For every test level, a suitable test environment is required**
## 1. Component testing (Unit testing)
#### Objectives: 
Focuses on components that are separately testable.
* Reducing risk
* Verifying whether the functional and non-functional behaviors of the component are as designed and specified
* Building confidence in the component’s quality
* Finding defects in the component
* Preventing defects from escaping to higher test levels
#### Special: 
Often done in isolation from the rest of the system, depending on the software development lifecycle model and the system, which may require mock objects, service virtualization, harnesses, stubs, and drivers.
#### Test basis: 
* Detailed design
* Code
* Data model
* Component specifications
#### Test types:
* Functionality (e.g., correctness of calculations)
* Non-functional characteristics (e.g., searching for memory leaks)
* Structural properties(e.g., decision testing).
#### Typical Test Object:
* Components, units or modules
* Code and data structures
* Classes
* Database modules
#### Environment: 
Development environment with framework, debug tool,...
#### Typical defects and failures:
* Incorrect functionality (e.g., not as described in design specifications)
* Data flow problems
* Incorrect code and logic
#### Responsibilities: 
* Developers
#### Approaches:
* Test first approach
* Test Driven Development
## 2. Integration testing

#### Objectives: 
Focuses on interactions between components or systems. Objectives of integration testing include:
* Reducing risk
* Verifying whether the functional and non-functional behaviors of the interfaces are as designed and specified
* Building confidence in the quality of the interfaces
* Finding defects (which may be in the interfaces themselves or within the components or systems)
* Preventing defects from escaping to higher test levels
#### Special: 
There are two different levels of integration testing:
* Component integration testing
* System integration testing
#### Test basis: 
* Software and system design
* Sequence diagrams
* Interface and communication protocol specifications
* Use cases
* Architecture at component or system level
* Workflows
* External interface definitions
#### Test types:
Functional, Non-functional and structural test types
#### Typical Test Object:
* Subsystems
* Databases
* Infrastructure
* Interfaces
* APIs
* Microservices
#### Environment:
Specific environment
#### Typical defects and failures:
* Incorrect data, missing data, or incorrect data encoding
* Incorrect sequencing or timing of interface calls
* Interface mismatch
* Unhandled or improperly handled communication failures between components/system
* Incorrect assumptions about the meaning, units, or boundaries of the data being passed between components
* Failures in communication between components/system
* Inconsistent message structures between systems 
#### Responsibilities: 
* Developers
* Testers
#### Approaches:
**Test strategy bases on:**
* System architecture
* Functional task
* Transaction processing sequences
* Some other aspect of the system or components

**Big - Bang integration and Incremental integration**:
* Top-down
* Bottom-up
* Continuous (i.e Functional) 
## 3. System testing
#### Objectives: 
Focuses on the behavior and capabilities of a whole system or product, often considering the end-to-end tasks the system can perform and the non-functional behaviors.
* Reducing risk
* Verifying whether the functional and non-functional behaviors of the system are as designed and specified
* Validating that the system is complete and will work as expected
* Building confidence in the quality of the system as a whole
* Finding defects
* Preventing defects from escaping to higher test levels or production
#### Special: 
System testing often produces information that is used by stakeholders to make release decisions. System testing may also satisfy legal or regulatory requirements or standards.
#### Test basis:
* System and software requirement specifications (functional and non-functional)
* Risk analysis reports
* Use cases
* Epics and user stories
*  Models of system behavior
* State diagrams
* System and user manuals
#### Test types:
* Functional
* Non - functional
#### Typical Test Object:
* Applications
* Hardware/software systems
* Operating systems
* System under test (SUT)
* System configuration and configuration data
#### Environment: 
Ideally correspond to the final target or production environment
#### Typical defects and failures:
* Incorrect calculations
* Incorrect or unexpected system functional or non-functional behavior
* Incorrect control and/or data flows within the system
* Failure to properly and completely carry out end-to-end functional tasks
* Failure of the system to work properly in the system environment(s)
* Failure of the system to work as described in system and user manuals
#### Responsibilities
Independent test team
#### Approaches
* Focus on the overall, end-to-end behavior of the system as a whole, both functional and non-functional
* Should use the most appropriate techniques (see chapter 4) for the aspect(s) of the system to be tested. 
* Early involvement of testers in user story refinement or static testing activities, such as reviews, helps to reduce the incidence of some situations such as Defect in specification
## 4. Acceptance testing
#### Objectives:
Typically focuses on the behavior and capabilities of a whole system or product. Objectives of acceptance testing include:
* Establishing confidence in the quality of the system as a whole
* Validating that the system is complete and will work as expected
* Verifying that functional and non-functional behaviors of the system are as specified
#### Special:
Acceptance testing may also satisfy legal or regulatory requirements or standards.
#### Common form:
Common forms of acceptance testing include the following:
* User acceptance testing
* Operational acceptance testing
* Contractual and regulatory acceptance testing
* Alpha and beta testing.
#### Test basis:
**For any form of acceptance testing:**
* Business processes
* User or business requirements
* Regulations, legal contracts and standards
* Use cases and/or user stories
* System requirements
* System or user documentation
* Installation procedures
* Risk analysis reports

**For operational acceptance testing:**
* Backup and restore procedures
* Disaster recovery procedures
* Non-functional requirements
* Operations documentation
* Deployment and installation instructions
* Performance targets
* Database packages
* Security standards or regulations
#### Typical test Objects:
* System under test
* System configuration and configuration data
* Business processes for a fully integrated system
* Recovery systems and hot sites (for business continuity and disaster recovery testing)
* Operational and maintenance processes
* Forms
* Reports
* Existing and converted production data
#### Typical defect and failures:
* System workflows do not meet business or user requirements
* Business rules are not implemented correctly
* System does not satisfy contractual or regulatory requirements
* Non-functional failures such as security vulnerabilities, inadequate performance efficiency under
* high loads, or improper operation on a supported platform
#### Responsibilities:
* The customers
* Business users
* Product owners or operators of a system
* Other stakeholders may be involved as well
#### Approaches:
**Alpha tests and beta tests may occur either**
* at the end of each iteration
* after the completion of each iteration
*  or after a series of iterations

**User acceptance tests, operational acceptance tests, regulatory acceptance tests, and contractual acceptance tests also may occur, either**
* at the close of each iteration,
* after the completion of each iteration,
* or after a series of iterations
### 4.1. User acceptance testing (UAT)
User acceptance testing of the system is typically focused on:
* Validating the fitness for use of the system by intended users in a real
* Simulated operational environment. 

The main objective is:
* Building confidence that the users can use the system to meet their needs
* Fullfill requiements
* Perform businesses with minimum difficulty, cost and risk.

### 4.2. Operational acceptance testing (OAT)
The acceptance testing of the system by operations or systems administration staff is usually performed in a (simulated) production environment. The tests focus on operational aspects, and may include:
* Testing of backup and restore
* Installing, uninstalling and upgrading
* Disaster recovery
* User management
* Maintenance tasks
* Data load and migration tasks
* Checks for security vulnerabilities
* Performance testing

The main objective of operational acceptance testing is building confidence that the operators or system administrators can keep the system working properly for the users in the operational environment, even under exceptional or difficult conditions.
### 4.3. Contractual and Regulatory acceptance testing
The main objective is building confidence that the operators or system administrators can keep the system working properly for the users in the operational environment, even under exceptional or difficult conditions.

**Contractual acceptance testing**
* Contractual acceptance testing is performed against a contract’s acceptance criteria for producing custom- developed software.
* Acceptance criteria should be defined when the parties agree to the contract.
* Contractual acceptance testing is often performed by users or by independent testers.   

**Regulatory acceptance testing**
* Regulatory acceptance testing is performed against any regulations that must be adhered to, such as government, legal, or safety regulations.
* Regulatory acceptance testing is often performed by users or by independent testers, sometimes with the results being witnessed or audited by regulatory agencies.

### 4.4. Alpha testing and Beta testing
Alpha and beta testing are typically used by developers of commercial off-the-shelf (COTS) software who want to get feedback from potential or existing users, customers, and/or operators before the software product is put on the market. 

**Objectives:**
* Building confidence among potential or existing customers, and/or operators that they can use the system under normal, everyday conditions, and in the operational environment(s) to achieve their objectives with minimum difficulty, cost, and risk. 
* The detection of defects related to the conditions and environment(s) in which the system will be used, especially when those conditions and environment(s) are difficult to replicate by the development team. 

**Alpha testing**:
Alpha testing is performed at the developing organization’s site, not by the development team, but by potential or existing customers, and/or operators or an independent test team

**Beta testing**:
Beta testing is performed by potential or existing customers, and/or operators at their own locations. Beta testing may come after alpha testing, or may occur without any preceding alpha testing having occurred.


-----


***Reference: "Certified Tester - Foundation Level Syllabus" of ISTQP***