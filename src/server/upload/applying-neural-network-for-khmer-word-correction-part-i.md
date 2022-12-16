In year 2019, there is a breakthrough algorithm in NLP field which developed by Google called BERT(Bidirectional Encoder Representations from Transformers). By using neural network technique and train on millions of sentences, BERT can archived the best result which can be used for many other NLP tasks by just adding a few layers to the core model(transfer learning).  More over its best for Next Sentence Prediction(NSP) where google mainly implement it for solving text recommendation in their search engine. However, we are not going to apply BERT for our problem, but hopefully we can use its technique to solve our Khmer word correction.

#### Plan of attack
Let's break down steps for solving this challenge:
1. Data collection
2. Choose a machine learning model
3. Data preparation
4. Build and train a model
5. Test the model

In, this article we will go through data collection, choosing a machine learning model and data preparation.




##### 1.1.Data data data
As we all know, in machine field data is king, therefore, we need to collection data beforehand. Thankfully, we already have some dataset  in our previous [article](https://viblo.asia/p/nlp-khmer-word-segmentationpart-i-63vKjRxyK2R) however this data might need to prepare follow our selected machine learning model.



##### 1.2.Choose a machine learning model
There are many algorithms that we can use to solve this problem. However, BERT has inspired me to try neural network technique for our spelling model, But how can we use NN for spelling correction? The goal of our algorithm is to find correct word when miss-spelling is given. Ex: `សួស្ត` => `សួស្តី`. As we know, words in dictionary are rarely change, so we can think it as label in our NN model. Therefore, we are going use Multi-class neural network where we will predict the most likely corrected labels(words) base on given input(incorrect word).



##### 1.3.Data preparation
As we know, deep learning need alot of data, yet we have only around 8000 corrected words where will turn it into a label(Y) for training our NN model. Moreover, we can also use those correct words to produce the input(X) for our model.
We can produce an input(X) by:
- remove character form word(at random position): Ex: `សួស្តី` => `សស្តី`
- add charrecter to word(at random position): Ex: `សួស្តី` => `សួស្តីរ`
- replace charater in word: Ex: `បួស្តី` => `សួស្តី`
- Combind: Ex: `បួស្តី` => `សួស្តីរ`


Let's implement python code for that.

```python
from random import randrange

correctWords = ['សួស្តី', 'អក្សរចារឹក', 'ចំណែង', 'នៅ', 'ភោជន', 'មនុស្ស', 'ពព្រាយ', 'ពពិល', 'ប្រជាករ', 'ប្រជាជន']
alphabet = ['ក','ខ','គ','ឃ','ង','ច','ឆ','ជ','ឈ','ញ','ដ','ឋ','ឌ','ឍ','ណ','ត','ថ','ទ','ធ','ន','ប','ផ','ព','ភ','ម','យ','រ','ល','វ','ឝ','ឞ','ស','ហ','ឡ','អ', 'ា', 'ិ', 'ី', 'ឹ', 'ឺ', 'ុ', 'ូ', 'ួ', 'ើ', 'ឿ', 'ៀ', 'េ', 'ែ', 'ៃ', 'ោ', 'ៅ', 'ំ', 'ះ', '◌ៈ', '៉', '់', '៌', '៏','័']

#remove character
removedWords = []
for word in correctWords:
    pos = randrange(len(word))
    word = word[:pos] + word[(pos+1):]
    removedWords.append(word)

#add character
addedWords = []
for word in correctWords:
    ch = alphabet[randrange(len(alphabet))]
    pos = randrange(len(word))
    word = word[:pos] + ch + word[pos:]
    addedWords.append(word)

#replace character
replaceWords = []
for word in correctWords:
    ch = alphabet[randrange(len(alphabet))]
    pos = randrange(len(word))
    word = word[:pos] + ch + word[(pos+1):]
    replaceWords.append(word)

```
Then run it to test our methods and got:
![](https://images.viblo.asia/f23c50dc-9e7f-4aeb-adff-c3ea54be510f.png)


Now, we can generate ton of input(X) for our deep learning model.
#### Resources
- https://www.blog.google/products/search/search-language-understanding-bert/
- https://github.com/google-research/bert
- https://searchengineland.com/welcome-bert-google-artificial-intelligence-for-understanding-search-queries-323976
- https://towardsdatascience.com/bert-explained-state-of-the-art-language-model-for-nlp-f8b21a9b6270
- https://towardsdatascience.com/bert-explained-state-of-the-art-language-model-for-nlp-f8b21a9b6270

#### What next?
In next article, we are going to implement a Multi-class neural network model, and we will train our model with dataset we have prepared in this post. Then test the result of our trained model. At mean time, you can comment your comment and suggestion my chosen machine learning algorithm. We might use your suggestion algorithm in my next article. Stay tune.