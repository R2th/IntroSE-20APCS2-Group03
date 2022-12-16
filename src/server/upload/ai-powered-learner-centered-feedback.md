With the advent of machine learning and [Artificial Intelligence](https://www.digifutura.com/blog/ai-powered-learner-centered-feedback) every industry be it Healthcare, Education, or Finance, etc. has been disrupted. Technology can be seen as both, Yin and Yang, it can be beneficent and can be malignant and machine learning gives us enormous power to solve complex problems that cannot be possible with writing rule for every specific case.

Machine learning has been disrupting Education Technology and has been prolific across most of the EdTech startup. Be it provision of recommendation to students about the courses or assisting students with feedback or summarizing the content so reader can comprehend the useful part of the content rather than getting into nitty gritty details of every text.

We thought of building an application in a similar domain, assisting students with feedback and self-evaluation. In the age of information and technology where data is available in abundance, it’s difficult as well as imperative for a student to learn and understand the concept behind the content; regular assessment and keeping the user progress can be a better way to improvise the learning.

Let’s start our Journey — Building a student-centered Feedback system,

There are couple of entities a person needs to keep in mind while building Text processing and Natural language system. A complex Natural language system contains a substantial number of algorithm depending on the use case, be it a key phrase extraction using Tf-idf , Text-rank for Text summarization, Bayes Theorem for Sentiment analysis, POS tagging, NER extraction using Naïve Bayes etc. these are some of the simple algorithms which can be useful while building a simple text processing engine.

With the advent of deep learning, it is feasible to replenish the area of Natural language understanding which opens a broader scope of understanding the emotion behind the text the user conveyed, such as sarcasm, humor, disgust, excitement etc.

This technology can help us build a complex natural language system and general-purpose Artificial Intelligence.

The components we need for our purpose are:

1. Crawler service that crawls each section of the document, create a token of each term, and create a snippet or tag and save it in the database.

2. A Reverse indexer that maps document-id to the term found within the content.

3. To measure the similarity of the answer with the actual answer while taking the assessment we’ll be using consine similarity matrix. For complex systems you can use deep-learning RNN to measure the similarity.

4. We will be using Watson API to understand the confidence of the students while answering the question.



The Query Engine,

The user answers to the question asked by the system through Quey API, which will be parsed and decomposed into tokens of N vector. Here we split the answer into token and match each with the actual answer token of M vector and find the cosine similarity between both the answers. Consine similarity doesn’t take into account the magnitude between both the answers but the angle between them.

If the given answer is above the given threshold we assume that the answer is correct and try to find the confidence/emotion behind the answer using Watson cognitive API.

If the answer is incorrect we will decompose the actual answer which is mapped to the question asked to the student into tokens of N vectors and find the document/ section id of the question from which answers are prepared from. To find the section id we will use Parsed Query and Standard Query where we take the intersection of matched token and use Text rank algorithm to rank the matching document/section.

Intricacy of NLP system:

There are couple of intricacies while building a Text processing system. Scaling a system, avoiding stop words, navigating to correct section of the document, technique and heuristics of parsed queries to recommend actual section id and finally the confidence of the student on answering the questions. We’ll not build the entire system from scratch but we’ll use some of existing library available.

Some of the important libraries and API’s we have used are:

1. Tensor flow,

2. Scikit learn,

3. NLTK to text processing,

4. Whoosh / Elastic search for reverse indexer,

5. Watson cognitive API,

This is a general purpose solution for building a feedback system. It can be used in organization to get feedback from employees and it can also be used to get feedback from the customer and get the emotion out of it and avoid the need of manual evaluation of each feedback response.

Here I come to an end of the brief overview of building a student feedback system, we have already gone through few of the algorithm necessary to build an NLP system. I suggest readers to search some of the material related to Natural Language Processing to get a better understanding of the subject.