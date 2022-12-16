## Architectural Patterns
Architectural patterns are a bit different. For example, every house (and every
architectural style for houses) employs a Kitchen pattern. The Kitchen pattern and
patterns it collaborates with address problems associated with the storage and
preparation of food, the tools required to accomplish these tasks, and rules for place-
ment of these tools relative to workflow in the room. In addition, the pattern might
address problems associated with countertops, lighting, wall switches, a central is-
land, flooring, and so on. Obviously, there is more than a single design for a kitchen,
often dictated by the context and system of forces. But every design can be conceived
within the context of the “solution” suggested by the Kitchen pattern.

* The Kitchen pattern and patterns it collaborates with address problems associated with the storage and preparation of food, the tools required to accomplish these tasks, and rules for placement of these tools relative to workflow in the room. 
* In addition, the pattern might address problems associated with counter tops, lighting, wall switches, a central island, flooring, and so on.
* Obviously, there is more than a single design for a kitchen, often dictated by the context and system of forces. But every design can be conceived within the context of the ‘solution’ suggested by the Kitchen pattern. 

## Component-Level Patterns
* Component-level design patterns provide a proven solution that addresses one or more sub-problems extracted from the requirement model. 
* In many cases, design patterns of this type focus on some functional element of a system.
* For example, the SafeHomeAssured.com application must address the following design sub-problem: How can we get product specifications and related information for any SafeHome device?
* Having enunciated the sub-problem that must be solved, consider context and the system of forces that affect the solution. 
* Examining the  appropriate requirements model use case, the specification for a SafeHome device (e.g., a security sensor or camera) is used for informational purposes by the consumer. 
    * However, other information that is related to the specification (e.g., pricing) may be used when e-commerce functionality is selected. 
* The solution to the sub-problem involves a search. Since searching is a very common problem, it should come as no surprise that there are many search-related patterns.

## User Interface Design Patterns
Hundreds of user interface (UI) patterns have been proposed in recent years. Most
fall within one of the following 10 categories of patterns (discussed with a represen-
tative example 8 ) as described by Tidwell [Tid02] and vanWelie [Wel01]:

* **Whole UI.**  Provide design guidance for top-level structure and navigation throughout the entire interface.
*  **Page layout.**  Address the general organization of pages (for Websites) or distinct screen displays (for interactive applications)
*  **Forms and input.**  Consider a variety of design techniques for completing form-level input.
*   **Tables.**  Provide design guidance for creating and manipulating tabular data of all kinds.
* **Direct data manipulation.**  Address data editing, modification, and transformation.
* **Navigation.**  Assist the user in navigating through hierarchical menus, Web pages, and interactive display screens.
* **Searching.**  Enable content-specific searches through information maintained within a Web site or contained by persistent data stores that are accessible via an interactive application. 
* **Page elements.**  Implement specific elements of a Web page or display screen.
* **E-commerce.**  Specific to Web sites, these patterns implement recurring elements of e-commerce applications.

## WebApp Design Patterns
* Information architecture patterns relate to the overall structure of the information space, and the ways in which users will interact with the information. 
* Navigation patterns define navigation link structures, such as hierarchies, rings, tours, and so on.
* Interaction patterns contribute to the design of the user interface. Patterns in this category address how the interface informs the user of the consequences of a specific action; how a user expands content based on usage context and user desires; how to best describe the destination that is implied by a link; how to inform the user about the status of an on-going interaction, and interface related issues.
* Presentation patterns assist in the presentation of content as it is presented to the user via the interface. Patterns in this category address how to organize user interface control functions for better usability; how to show the relationship between an interface action and the content objects it affects, and how to establish effective content hierarchies.
* Functional patterns define the workflows, behaviors, processing, communications, and other algorithmic elements within a WebApp.

## Design Granularity
When a problem involves “big picture” issues, you should attempt to develop
solutions (and use relevant patterns) that focus on the big picture. Conversely, when
the focus is very narrow (e.g., uniquely selecting one item from a small set of five or
fewer items), the solution (and the corresponding pattern) is targeted quite nar-
rowly. In terms of the level of granularity, patterns can be described at the follow-
ing levels:
* **Architectural patterns.** This level of abstraction will typically relate to patterns that define the overall structure of the WebApp, indicate the relationships among different components or increments, and define the rules for specifying relationships among the elements (pages, packages, components, subsystems) of the architecture.
* **Design patterns.**  These address a specific element of the design such as an aggregation of components to solve some design problem, relationships among elements on a page, or the mechanisms for effecting component to component communication. An example might be the Broadsheet pattern for the layout of a WebApp homepage.
* **Component patterns.** This level of abstraction relates to individual small-scale elements of a WebApp. Examples include individual interaction elements (e.g. radio buttons, text books), navigation items (e.g. how might you format links?) or functional elements (e.g. specific algorithms).



**Reference:** *Software Engineering A Practitioner's Approach (7th Ed.) ~ Roger S. Pressman*