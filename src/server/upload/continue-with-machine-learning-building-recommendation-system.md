Nowadays there are no successful e-commerce websites which do not use recommendation system. Website such as Amazon which sell million of books use recommendation system to cater customers with the most likeable products that customer will buy. Netflix uses recommendation system to provide customer with their favorite movies.
Just thing about this: without recommendation system customer will get lost in the ocean of products!

We will talk about how recommendation system develop and 3 main categories of recommendation systems. In this post we'll main focus on the concept of the recommendation engines. In later post we'll pick up a real-life example to work on.

## Use of recommendation system
I will use the term recommendation system and recommendation engine interchangeably. Let's talk about what we can do about recommendation engine:
Is to filter **relevant** products which can further divide into 3 tasks:
1. Predict what rating the user would give a product
2. Predict whether a user would buy  a product
3. Rank products based on their relevance to the user

Here we have to define clearly what we mean by **relevant**.
**Relevant** can mean:
* Similar to the ones the user **liked**
If Chivorn likes books about spirituality such as The power of now,
You would recommend him The New Earth or other spirituality books
Here we find products by matching attributes or descriptive characteristics or their content
 This is what we call **Content-based Filtering**. This is the first way of how people build recommendation engine.
* **Liked** by simila r users
For example, Tom liked "The power of Now" and "The new Earth"
Jerry also liked "The power of Now" and "The new Earth".
Now we can say that they are **Similar** Users.
So if Tom like "The awakening of Intelligence", We will show Jerryb"The awakening of Intelligence" too.
This is the basis of what we call **Collaborative Filtering**.  

* Purchased along with the ones the user **liked**
James bought a microphone for recording.
We got some data that show that 90% of people who bought a microphone also bought a shock mount and wind shield.
Therefore we show James shock mount and wind shield. 
This is called **Association Rules**. 

Recommondation Engines use one or more of these techniques.

But how do we know that a user **likes** a product? or what do we mean by **like**?
The products **liked** are the ones that are:
* Purchased
* Clicked on
* Added to cart
* Rated highly
* Confirmed by the user's answer

Product with low ratings can be very useful data too!

## Content-based filtering
Content-based filtering is normally used with text documents.

This technique consists of two parts:
1. Products are represented in terms of descriptors or attributes such as:
* Genre (Drama, Comedy, Action...)
* Words used
* Author
2. A User profile is created using the same terms
* Based on user's history
* By asking what the user likes

So now we can find products which match the user's profile
Users are represented using the same descriptor. Tom clicked on 10 movies 7 Commercial and 9 Drama

The key challenge in content based filter is about knowing the attribues of the products. 
What attributes should we use? and  How are these generated?

Typically, you'll need manual data collection. For text documents, you could use NLP to generate description

The example of  the most succesful examples of content-based filtering is the music genome project ownd by Pandora Radio
Every song is represented by a vector of 450 "Genes". Then the radio keeps playing songs that match the user's preferences.
## Collaborative Filtering
What if you could recommend products without knowing anything about the products themselve?
Unlike content-based filtering, collaborative filtering doesn't require any product description data at all.
But how does that work?
Let's consider the following:
How do you normally find a movie to watch?
How do you normally find a place to visit?
How do you normally find a hospital to have a health check?
How do you normally find a book to read?
Normally we ask our **FRIEND**. 
Someone has the same preferences as us. 
Someone who likes the same movie, place to visit, books category...
This is exactly the basic idea of what **Collaborative Filtering** is.

The baisc premise of collaborative filtering is that:
* If 2 users have the same opinion about a bunch of products
* Then they are likely to have the same opinion about other products too

**The same opinioin about other products** can be defined as the same rating about a bunch of products between two people.

So **Collaborative filtering** is a general term for any algorithm that relies only on user behavior (history, ratings, similar users ...).
The purpose of the algorithm is to predict users' ratings for products they haven't yet rated.

**Rating** is a general term which can mean that a user likes a product, rate explicitly. 
For example. Netflix asks users to rate a movie on a scale of 1 to 5 once they have watched it.
Besides users can also rate implicitly by clicking, purchasing, or searching.

The algorithm can also be used to predict whether a user will buy a product.

So what is the main difference between collaborative filtering and content-based filtering?
The difference are:
* collaborative filtering only use user's behavior such as history, ratings
* Whereas content-based filtering require the knowledge of the attributes, the descriptors or the content of the products

### The algorithms used with collaborative filtering
There are a great deal of different algorithms to perform collaborative filtering. And the 2 most popular techniques are:
* Nearest neighbor based methods
* And Latent Factor based methods

## Association Rules
Association rules are normally used for a fancy task called Market Basket Analysis.
What is Market Basked Analysis? I can mean:
* What items are normally bought at the same time?
*  What items are bought by the same user within a short period of time?

OK, So what association is all about?