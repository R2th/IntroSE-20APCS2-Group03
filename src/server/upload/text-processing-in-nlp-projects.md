Trong các bài toán xử lý NLP (Natural Language Processing), khi có dữ liệu đầu vào, việc tiền xử lý dữ liệu rất quan trọng. Nó sẽ giúp làm sạch dữ liệu đầu vào trước khi đưa dữ liệu vào training.

Các kỹ thuật được sử dụng trong quá trình clean:
- Convert Text To Lowercase
- Tokenise Paragraphs To Sentences
- Tokenise Sentences To Words
- Remove Numbers
- Remove Punctuation
- Remove Stop words
- Remove Whitespaces

Ở đây, chúng ta sẽ sử dụng 2 công cụ chính để làm việc này:
- NLTK library in Python
- Python lib: re, string

Đôi với [NLTK (Natural Language Toolkit)](https://www.nltk.org/), bạn có thể cài qua pip:

```sh
pip install nltk
```

Đối với regular expressions, bạn có thể dùng sẵn lib `re` của Python.

## Convert Text To Lowercase

Mục đính ở đây là giảm số lượng tự khác nhau. Bạn có thể hiểu ví dụ:

Ta có 2 từ: `Book` và `book`. Về mặt ý nghĩa, chúng đề giống nhau, nhưng về hình thức chúng lại khác nhau.

Trong Python, bạn có thể lower text bằng cách:

```py
>>> "Book".lower()
'book'
```

## Tokenise Paragraphs To Sentences

Dữ liệu text thường được hiển thị dưới dạng các paragraphs. Vậy bài toán của ta là phải tách paragraphs thành các sentence `có ý nghĩa`.

Ta sẽ sử dụng `sent_tokenize` của nltk để tách. NLTK support tách các sentences cho 17 language.

```py
>>> from nltk.tokenize import sent_tokenize

>>> text = """Isa Briones' character Daj appears on screen, pleading for Picard's help and shelter. "Everything inside me says I am safe with you." Cut to Picard at Starfleet, telling someone across from him: "If she is who I think she is, she is in serious danger." Others throughout the trailer allude to Briones' character not knowing who she is, or what she's capable of."""
>>> sentences = sent_tokenize(text)
>>> print(sentences)
["Isa Briones' character Daj appears on screen, pleading for Picard's help and shelter.", '"Everything inside me says I am safe with you."', 'Cut to Picard at Starfleet, telling someone across from him: "If she is who I think she is, she is in serious danger."', "Others throughout the trailer allude to Briones' character not knowing who she is, or what she's capable of."]
```

Ta có thể thấy paragraphs đã được split thành các sentences có ý nghĩa.

Nếu bạn chạy có lỗi sau:

```py
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File ...
LookupError:
**********************************************************************
  Resource punkt not found.
  Please use the NLTK Downloader to obtain the resource:

  >>> import nltk
  >>> nltk.download('punkt')

  Searched in:
    - '.../nltk_data'
    - '/usr/share/nltk_data'
    - '/usr/local/share/nltk_data'
    - '/usr/lib/nltk_data'
    - '/usr/local/lib/nltk_data'
    - '.../.pyenv/versions/3.6.2/nltk_data'
    - '.../.pyenv/versions/3.6.2/lib/nltk_data'
    - ''
**********************************************************************

```

Bạn cần download `punkt` về. Bạn cần thực hiện bước sau:

```py
>>> import nltk
>>> nltk.download('punkt')
[nltk_data] Downloading package punkt to .../nltk_data...
[nltk_data]   Unzipping tokenizers/punkt.zip.
True
```
Mặc định, data download về nó sẽ ở thư mục `~/`

```sh
ls ~/ | grep nltk
nltk_data
```

Bước tiếp theo, ta sẽ cần tách các sentences thành các words.

## Tokenise Sentences To Words

Chúng ta sẽ sử dụng TreebankWordTokenizer  class của NLTK để tách sentences  thành words. Mình sẽ sử dụng lại đoạn paragraphs ở bên trên:

```py
>>> from nltk.tokenize import TreebankWordTokenizer
>>> tokenizer = TreebankWordTokenizer()
>>> print(tokenizer.tokenize(text))
['Isa', 'Briones', "'", 'character', 'Daj', 'appears', 'on', 'screen', ',', 'pleading', 'for', 'Picard', "'s", 'help', 'and', 'shelter.', '``', 'Everything', 'inside', 'me', 'says', 'I', 'am', 'safe', 'with', 'you.', "''", 'Cut', 'to', 'Picard', 'at', 'Starfleet', ',', 'telling', 'someone', 'across', 'from', 'him', ':', '``', 'If', 'she', 'is', 'who', 'I', 'think', 'she', 'is', ',', 'she', 'is', 'in', 'serious', 'danger.', "''", 'Others', 'throughout', 'the', 'trailer', 'allude', 'to', 'Briones', "'", 'character', 'not', 'knowing', 'who', 'she', 'is', ',', 'or', 'what', 'she', "'s", 'capable', 'of', '.']
```

## Remove Numbers

Việc remove number này phụ thuộc nhiều vào bài toán của bạn. Một số bài toán, ta cần phải xóa các số khỏi text vì những số đó không có nghĩa trong việc phân tích văn bản.

Ta có thể loại bỏ number dễ dàng nhất bằng cách sử dụng regex:

```py
>>> import re
>>> result = re.sub(r'\d+', '', '123Hellooooo456789')
>>> print(result)
Hellooooo
```

## Remove Punctuation

Các dấu `.`, `,`, `!`, ... cũng là những thứ cần được làm sạch. Python hỗ trợ lib `string` để remove đống dấu má này. Ta sẽ tái sử dụng list words ở phần `Tokenise Sentences To Words`:

```py
>>> import string
>>> punctuation = string.punctuation
>>> words = tokenizer.tokenize(text)
>>> clean_words = [w for w in words if w not in punctuation]
>>> print(clean_words)
>>> print(clean_words)
['Isa', 'Briones', 'character', 'Daj', 'appears', 'on', 'screen', 'pleading', 'for', 'Picard', "'s", 'help', 'and', 'shelter.', '``', 'Everything', 'inside', 'me', 'says', 'I', 'am', 'safe', 'with', 'you.', "''", 'Cut', 'to', 'Picard', 'at', 'Starfleet', 'telling', 'someone', 'across', 'from', 'him', '``', 'If', 'she', 'is', 'who', 'I', 'think', 'she', 'is', 'she', 'is', 'in', 'serious', 'danger.', "''", 'Others', 'throughout', 'the', 'trailer', 'allude', 'to', 'Briones', 'character', 'not', 'knowing', 'who', 'she', 'is', 'or', 'what', 'she', "'s", 'capable', 'of']

```

Kế quả ta sẽ có được list các từ theo đúng thứ tự ban đầu. Bạn có thể nối đống text đã được clean này vào thành 1 chuỗi bằng cách sử dụng `"".join(clean_text)`.

## Remove Stop words

Một số mạo từ như `a`, `an`, `the`, `and`, `but` ... sẽ là những stop words trong Tiếng Anh. Bạn sẽ thường cần phải remove chúng.

NLTK support remove stop word:

```py
>>> from nltk.corpus import stopwords
>>> text = "The trailer begins with Picard trying to survive on his family vineyard."
>>> words = nltk.word_tokenize(text)
>>> stopwords = stopwords.words('english')
>>> clean = [w for w in words if w not in stopwords]
>>> print(clean)
['The', 'trailer', 'begins', 'Picard', 'trying', 'survive', 'family', 'vineyard', '.']

```

## Remove Whitespaces

Whitespaces sẽ bao gồm: `space`, `tab` ...

Easy:

```py
>>> 'FinTechExplained Is A      Publication. \n This is about NLP'.split()
['FinTechExplained', 'Is', 'A', 'Publication.', 'This', 'is', 'about', 'NLP']
```

## Summary

Tóm lại, tùy vào bài toán cụ thể mà bạn sẽ cần phải linh hoạt xử lý clean text. 

Source: https://medium.com/fintechexplained/nlp-text-processing-in-data-science-projects-f083009d78fc