## 1. What is Static Testing?
Static Testing is testing a work product without the work product code being executed.

**What can be reviewed?**

Any work product can be Examined by Static Testing
* Project progress: work completed to schedule, etc. 
* SRS, system designs, codes, test plans, test cases

**What can be Inspected?**

* Policy, strategy, business plans, marketing or advertising material, contracts
* System requirements, feasibility studies, acceptance test plans
* Test plans, test designs, test cases, test results
* System designs, logical & physical
* Software code
* User manuals, procedures, training material

**What to Review/ Inspect?**


| Review | Inspect | 
| -------- | -------- |
|Informal, formal quick | Formal, take more time | 
|Any work product can be reviewed, Compared to inspect, Review has boarder meaning | Not all work prodict can be inspected |
|Not bring as much value as inspect | Bring more values |
|The subject of review is typically documented or not | The subject of inspected is typically documented |
|Method: Individual review, Group review | Method: Individual review, Group review |

## 2. Why is Static Testing?
* Static testing enables the early detection of defects before dynamic testing is performed
* Defects found early are often much cheaper to remove than defects found later in the lifecycle, especially compared to defects found after the software is deployed and in active use
* Increasing development productivity
* Reducing development cost and time
* Reducing testing cost and time
* Identifying defects which are not easily found by dynamic testing
* Detecting and correcting defects more efficiently, and prior to dynamic test execution

The two main types of static testing techniques are:
1. The manual examination of work products:( i.e REVIEWS)
2. Tool-driven evaluation of the code or other work products ( i.e STATIC ANALYSIS)

### Review process
The review process comprises the following 5 main activities:
1. Planning
1. Initiate review
1. Individual review
1. Issue communication and analysis
1. Fixing and reporting

### Roles and responsibilities
* **Author:** writer or person with chief responsibility for the documents to be reviewed / Inspected
* **Managers:** excluded from some types of review, need to plan project time for review / Inspection. Decides on the execution of reviews, allocates time in project schedules and determines if the review objectives have been met. 
* **Facilitator (often called moderator):** plans the review / Inspection, chooses participants, helps & encourages, conducts/leads the meeting or review, performs follow-up, manages metrics, mediates between various points of view, person whom the success of the review rests. 
* **Reviewers leader:** with specific technical or business background, specialised fault-finding roles for Inspection, should be chosen to represent different perspectives
* **Scribe / Recorder:** documents all the issues, problems and open points that were identified during the meeting

### Review Types
#### Informal review
* Main purpose: detecting potential defects
* Not based on a formal (documented) process
* Review meeting: led by author
* Performed by: a colleague of the author (buddy check) or by more people
* Results : may be documented
* Use of checklists: optional
* Very commonly used in Agile development
(e.g., buddy check, pairing, pair review)

⇒ widely viewed as useful and cheap (but no one can prove it!) A helpful first step for chaotic
organisations.

#### Walkthrough
* Main purposes: find defects, improve the software product, consider alternative implementations, evaluate
* conformance to standards and specifications
* Individual preparation before the review meeting: optional
* Review meeting: Yes, led by the author of the work product
* Scribe: mandatory
* Use of checklists: optional
* May take the form of: scenarios, dry runs, or simulations
* Result: Potential defect logs and review reports may be produced
* May vary in practice from quite informal to very formal

⇒ Author guides the group through a document and his or her thought processes, so all understand the
same thing, consensus on changes to make

#### Technical review
* Main purposes: gaining consensus, detecting potential defects
* Reviewers: should be technical peers of the author, and technical experts in the same or other disciplines
* Individual preparation before the review meeting: is required
* Review meeting: optional, ideally led by a trained facilitator (typically not the author)
* Scribe: mandatory, ideally not the author
* Use of checklists: optional
* Result: Potential defect logs and review reports are typically produced

⇒ includes peer and technical experts, optional or no management participation. Normally
documented, fault-finding. Can be rather subjective.

#### Inspection
* Main purposes: detecting potential defects, preventing future similar defects
* Follows a defined process with formal documented outputs: based on rules and checklists
* Uses clearly defined roles
* Individual preparation: is required
* Review meeting: Yes, is led by a trained facilitator (not the author)
* Reviewers: are either peers of the author or experts in other disciplines that are relevant to the work
* product
* Specified: entry and exit criteria are used
* Scribe: mandatory
* Result: Potential defect logs and review report are produced

⇒ Formal individual and group checking, using sources and standards, according to generic and specific
rules and checklists, using entry and exit criteria, Leader must be trained & certified, metrics required