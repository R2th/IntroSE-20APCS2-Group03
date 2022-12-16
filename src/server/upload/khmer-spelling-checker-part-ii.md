After we separate Khmer words in sentences, I have an idea which implementing a Khmer spelling check in the browser extension. We are going to build a browser extension which embedded with browser input field. It will check any typo when user lost focus of that field then it will suggest a similar word to the user. In our first version we will check typing mistake only and for grammar and other logical error we will implement it later on.
![](https://images.viblo.asia/0a89e138-d5ac-429b-b1c5-cf831401c3fa.png)

In order to build this extention, we need to implement a server side where it receive senetence from user then it check any mistake and respond back to user. we also implementing extension where it send input value to server and handle response from server and display to user.


### Server Side Logic

Here are steps, we use in our server side:
- recieve request from clients
- seperate string of sentences in array of sentents
- check each words in senteces
- response an json object of sentences with its sugestion

### Implementation
Let's start by setting up a small Flask server. 
```python
#!/usr/bin/python
# -*- coding: utf-8 -*-
import sys
from flask import Flask
from flask_restful import Resource, Api
from resources.home import Home
from resources.spelling_checker import SpellingCheck

app = Flask(__name__)
api = Api(app)

api.add_resource(Home, '/')
api.add_resource(SpellingCheck, '/sentences_checking')

if __name__ == '__main__':
  reload(sys)
  sys.setdefaultencoding('utf-8')
  app.run(debug=True)
```

Let's create home page handler
```python
from flask_restful import Resource

class Home(Resource):
  def get(self):
    return {'hello world': 'Welcome to Khmer Spelling checker API'}
```


Let's create spelling check handler
```python
#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask_restful import reqparse, Resource
import model.word_segmentation as word_segmentation

parser = reqparse.RequestParser()
parser.add_argument('sentences')

class SpellingCheck(Resource):
  def post(self):
    args = parser.parse_args()
    sentences = args['sentences']
    words = word_segmentation.WordSegmentation(sentences)
    words.check_words()
    return words.get_result(), 201

```

As you can see in our code about, we use the code in our previous article. However, we customize some logic in it.
```python
class WordSegmentation:
  ...
  def check_words(self):
    while(self.startIndex < len(self.text)):
      ch = self.text[self.startIndex]
      ch = ch.encode('utf-8')
      word = ''

      if self.isNumber(ch):
        word = self.parseNumber(self.startIndex).encode('utf-8')
      elif self.isEnglish(ch):
        word = self.parseEnglish(self.startIndex).encode('utf-8')
      else:
        word = self.parseTrie(self.startIndex)

      length = len(word.decode('utf-8'))
      result = {}
      if length == 0:
        result["text"] = ch.decode('utf-8')
        result["is_word"] = False
        self.result_all.append(result)
        self.startIndex += 1
        continue

      if self.model.searchWord(word) or self.isNumber(ch) or self.isEnglish(ch):
        result["text"] = word.decode('utf-8').encode('utf-8')
        result["is_word"] = True
      else:
        result["text"] = word.decode('utf-8').encode('utf-8')
        result["is_word"] = False
        result["suggest_word"] = self.get_suggestion(word.decode('utf-8'))

      self.result_all.append(result)
      self.startIndex += length
    ...
```

Fanally, let's start our server:
```sh
FLASK_APP=api_server.py flask run
```
![](https://images.viblo.asia/dce1fea3-c14a-427d-be0a-ac4db206573b.png)

Now, let's make a simple post request:

![](https://images.viblo.asia/136b06cb-501b-4ba2-b517-018407469788.png)

Cool.

### Resources
- code: https://github.com/RathanakSreang/khmerspellingchecker

### What's next?
We are planning to build a Khmer work checking in a browser and we already implemented server side where it receives raw input and send back the validated words with their suggestion. Next, we are going to create a browser extension for sending user input value and displaying the error and suggesting similar words. Stay tune. :)