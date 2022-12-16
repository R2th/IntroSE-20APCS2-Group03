In my previous article, I talk about [Build a Trie Data structure](https://viblo.asia/p/nlp-build-a-trie-data-structure-from-scratch-with-python-3P0lPzroKox) where I mentioned that it's usefull for NLP. Now, let's discause why/how we use it to build NLP model. 


As we all know, machine learning(deep learning) is a process of using mathematics operation to calculate then hypothesis from given input variables(numbers) via some equations. Therefore, we need to convert any input data(text, image, audio, video,..) into a form of numbers then we can fit those number into our prepared model. For NLP, we do a text "Tokenization" process to breaks up a stream of characters into individual words(tokens). For example, it would convert the text "Framgia is awesome" into `[Framgia, is, awesome]`. Then we can turn each of those words(tokens) into a sequence of integers (each integer being the index of a token in a dictionary) or into a vector. So that, it can be fited into our NLP model.

### Tokenization
We can write a very simple python code to seperate text into array of words with ease.
```python
str = "Framgia is awesome"
str.split(" ")
# ['Framgia', 'is', 'awesome']
```
And we also can convert those array of words into a sequence of numbers from scratch. However, there are many libraries where we can use to do this job. We choose to use library instead of building our own because the code in those libraries had been tested and used by many researchers. Where our scratch code may miss some points since we write it in a short of time. So now let's use one of those libraries which is Keras.

```python
from keras.preprocessing.text import text_to_word_sequence
text = "Framgia is awesome"
result = text_to_word_sequence(text)
print(result)
# ['framgia', 'is', 'awesome']
```
And we can convert them into array of numbers via keras `one_hot` or `hashing_trick` function.

Encoding with one_hot which encodes a text into a list of word indexes of size n.
```python
from keras.preprocessing.text import one_hot
from keras.preprocessing.text import text_to_word_sequence
text = "Framgia is awesome, Let make it awesome"
words = set(text_to_word_sequence(text))
vocab_size = len(words)
print(vocab_size)
# 6
result = one_hot(text, round(vocab_size*1.3))
print(result)
# [7, 6, 2, 6, 6, 6, 2]
```
Encoding with hashing_trick which converts a text to a sequence of indexes in a fixed-size hashing space.
```python
from keras.preprocessing.text import hashing_trick
from keras.preprocessing.text import text_to_word_sequence
text = "Framgia is awesome, Let make it awesome"
words = set(text_to_word_sequence(text))
vocab_size = len(words)
print(vocab_size)
# 6
result = hashing_trick(text, round(vocab_size*1.3), hash_function='md5')
print(result)
#[3, 5, 2, 4, 6, 5, 2]
```

### Other languages?
All "Tokenization" methods above really work well with English text. How about other langauges? Ex: Khmer langauge. As you may know in Khmer langauge there isn't rule for adding space for seperating word. That why we build a custom structure(`Trie`) for separating the word in this language. 

### Resources
- https://machinelearningmastery.com/clean-text-machine-learning-python/
- https://machinelearningmastery.com/prepare-text-data-deep-learning-keras/
- https://machinelearningmastery.com/prepare-text-data-machine-learning-scikit-learn/
- https://keras.io/preprocessing/text/

### Next Step
We have learned about why we need to prepare input text for NLP. We also explore some text "Tokenization" methods and put them into practice. Moreover, we also use the code from the previous article to segment word for some special language such as Khmer. Next step, we will apply `Trie` for separating the Khmer language and we will discuss more about word segmentation.

Have fun. :)