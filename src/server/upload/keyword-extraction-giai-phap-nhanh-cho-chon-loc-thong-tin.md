# Tổng quan 
Hiện nay với sự phát triển của công nghệ, các nền tảng mảng xã hội, báo trí, truyền thông ...vv. Chúng ta liên tục được tiếp cận với nhiều nguồn thông tin khác nhau, do đó nhu cầu của con người trong việc chọn lọc và sử dụng thông tin cũng ngày càng cao. Các bài toán về gợi ý người dùng, tìm kiếm xu hướng (trending), chat bot ... đã và đang ngày càng được cải tiến và phát triển. **Vậy thì việc trích trọn thông tin như thế nào** ? Bài viết này mình xin phép được trình bày về một số phương pháp **chọn lọc từ khóa từ văn bản** đã được sử dụng trong khá nhiều bài toán về xử lý ngôn ngữ tự nhiên (NLP).  

![image.png](https://images.viblo.asia/7247e8e6-0c4c-474c-a6df-fbbd38cd970c.png)
## 1. Spacy
Để nói về **extract keywords** thì không thể không nhắc tới **spacy**.  Là một trong những thư viện Python NLP khá nổi tiếng, SpaCy đi kèm với các **pretrained pipelines** và hiện đã và đang hỗ trợ mã hóa và đào tạo cho hơn 60 loại ngôn ngữ khác nhau. Bao gồm các mô hình mạng nơ-ron cho các tác vụ gắn thẻ, phân tích cú pháp, nhận dạng thực thể được đặt tên, phân loại văn bản ...

Một số xử lý cơ bản của spacy như sau. 
* Tách nội dung văn bản đầu vào bởi tokens 
* Trích xuất các key words từ danh sách token.
     * Đặt các key words với các thẻ POS như “PROPN”, “ADJ”, "VERB", “NOUN”... (Danh sách thẻ POS có thể tùy chỉnh)
```python
import spacy

# Load English tokenizer, tagger, parser and NER
nlp = spacy.load("en_core_web_sm")

text = ("When Sebastian Thrun started working on self-driving cars at Google in 2007, few people outside of the company took him  seriously.")
doc = nlp(text)

# Analyze syntax
print("Noun phrases:", [chunk.text for chunk in doc.noun_chunks])
print("Verbs:", [token.lemma_ for token in doc if token.pos_ == "VERB"])

# Find named entities, phrases and concepts
for entity in doc.ents:
    print(entity.text, entity.label_)
```
```
Noun phrases: ['Sebastian Thrun', 'self-driving cars', 'Google', 'few people', 'the company', 'him']
Verbs: ['start', 'work', 'drive', 'take']
Sebastian Thrun PERSON
2007 DATE
```
Các bạn có thể tìm hiểu sâu hơn về spacy ở đây nhé: [Spacy](https://pypi.org/project/spacy/)
## 2. Rake_NLTK
**RAKE** (Rapid Automatic Keyword Extraction) là một phương pháp trích xuất từ khóa để tìm các từ hoặc cụm từ có liên quan nhất trong một đoạn văn bản bằng cách sử dụng một tập hợp các **từ dừng** và dấu phân cách cụm từ. **RAKE** sử dụng thuật toán **trích xuất từ khóa độc lập theo miền** và cố gắng xác định các cụm từ khóa trong nội dung văn bản bằng cách phân tích **tần suất xuất hiện của từ** và sự **đồng xuất hiện** của nó với các từ khác trong văn bản. Rake nltk là một phiên bản mở rộng của RAKE với sự hỗ trợ bởi NLTK
Trình xử lý cơ bản của RAKE
* Chia nội dung văn bản đầu vào bởi dotes
* Tạo ma trận các **từ đồng xuất hiện**
* Word scoring - Điểm đó có thể được tính bằng mức độ của một từ trong ma trận, dưới dạng tần suất từ hoặc mức độ của từ chia cho tần suất của nó
* Các cụm từ khóa cũng có thể tạo bằng cách kết hợp của các từ khóa

``` python
from rake_nltk import Rake
import nltk
nltk.download('stopwords')
nltk.download('punkt')
r = Rake()
my_text = "When Sebastian Thrun started working on self-driving cars at Google in 2007, few people outside of the company took him  seriously."
r.extract_keywords_from_text(my_text)
keywordList           = []
rankedList            = r.get_ranked_phrases_with_scores()
for keyword in rankedList:
  keyword_updated       = keyword[1].split()
  keyword_updated_string    = " ".join(keyword_updated[:2])
  keywordList.append(keyword_updated_string)
print(keywordList)
```
```
['sebastian thrun', 'people outside', 'driving cars', 'company took', 'seriously', 'self', 'google', '2007']
```
Các bạn có thể tham khảo kỹ hơn thư viện Rake nltk ở đây nhé: [RAKE_NLTK](https://pypi.org/project/rake-nltk/)
## 3. TextRank
**Textrank** là một thư viện trong Python có chức năng trích xuất từ khóa và tóm tắt văn bản. Thuật toán xác định mức độ liên quan chặt chẽ của các từ bằng cách xem liệu chúng có theo sau nhau hay không. Các thuật ngữ quan trọng nhất trong văn bản sau đó được sắp xếp bằng cách sử dụng thuật toán **xếp hạng**. Textrank thường tương thích với pipelines của Spacy. Dưới đây là một ví dụ các bạn có thể tham khảo.

```python
import spacy
import pytextrank
# example text
text = "When Sebastian Thrun started working on self-driving cars at Google in 2007, few people outside of the company took him  seriously."
# load a spaCy model, depending on language, scale, etc.
nlp = spacy.load("en_core_web_sm")
# add PyTextRank to the spaCy pipeline
nlp.add_pipe("textrank")
doc = nlp(text)
# examine the top-ranked phrases in the document
for phrase in doc._.phrases[:10]:
    print(phrase.text)
```
```
few people
Google
self-driving cars
Sebastian Thrun
the company
2007
him
```
Các bạn có thể tìm hiểu kỹ hơn về tư tưởng và thuật toán được triển khai trong thư viện này ở đây nhé:  [TextRank](https://towardsdatascience.com/textrank-for-keyword-extraction-by-python-c0bae21bcec0)
## 4. KeyBert
**KeyBERT** là một kỹ thuật trích xuất từ khóa cơ bản và dễ sử dụng, tạo ra các từ khóa và cụm từ khóa tương tự nhất với một tài liệu nhất định bằng cách sử dụng **BERT-embeddings**. Nó sử dụng BERT-embeddings và tính cosine similarity để xác định vị trí các **sub-documents** trong một **document** giống nhất với chính tài liệu đó.

BERT được sử dụng để trích xuất **document embeddings** để tạo ra cái biểu diễn của documents . Tiếp theo các **word embeddings** cho các từ / cụm từ sẽ được trích xuất. Sau đó KeyBert sử dụng tính tương tự cosine để tìm các từ / cụm từ giống nhất với tài liệu. 
```python
from keybert import KeyBERT
doc = "When Sebastian Thrun started working on self-driving cars at Google in 2007, few people outside of the company took him  seriously."
kw_model = KeyBERT()
keywords = kw_model.extract_keywords(doc)
print(keywords)
```
```
[('sebastian', 0.3796), ('driving', 0.3548), ('google', 0.3379), ('thrun', 0.3156), ('cars', 0.2946)]
```
Các bạn có thể tìm hiểu kỹ hơn về tư tưởng và thuật toán được triển khai trong thư viện này ở đây nhé:  [KeyBert](https://pypi.org/project/keybert/)
## 5. Word cloud
**Word cloud** là một công cụ để trực quan hóa dữ liệu văn bản, thường được sử dụng để **nhấn mạnh** các điểm dữ liệu văn bản quan trọng. 

Một thuật ngữ xuất hiện trong Word cloud càng nhiều, thì càng nhiều lần nó xuất hiện trong nguồn dữ liệu văn bản (như bài phát biểu, bài đăng trên blog hoặc cơ sở dữ liệu) (Còn được gọi là tag cloud hay text cloud). Thuật ngữ nào xuất hiện trong tài liệu càng thường xuyên và càng quan trọng thì thuật ngữ đó càng lớn và càng được in đậm. Đây là những cách để trích xuất các phần quan trọng nhất của dữ liệu dạng văn bản, chẳng hạn như các bài đăng trên blog hay cơ sở dữ liệu.
```python
import collections
import numpy as np
import pandas as pd
import matplotlib.cm as cm
import matplotlib.pyplot as plt
from matplotlib import rcParams
from wordcloud import WordCloud, STOPWORDS
all_headlines = "When Sebastian Thrun started working on self-driving cars at Google in 2007, few people outside of the company took him  seriously."
stopwords = STOPWORDS
wordcloud = WordCloud(stopwords=stopwords, background_color="white", max_words=1000).generate(all_headlines)

filtered_words = [word for word in all_headlines.split() if word not in stopwords]
counted_words  = collections.Counter(filtered_words)
words = []
counts = []
for letter, count in counted_words.most_common(10):
    words.append(letter)
    counts.append(count)
print(words)
```
```
['When', 'Sebastian', 'Thrun', 'started', 'working', 'self-driving', 'cars', 'Google', '2007,', 'people']
```
Các bạn có thể tìm hiểu kỹ hơn về tư tưởng và thuật toán được triển khai trong thư viện này ở đây nhé:  [Word cloud](https://www.analyticsvidhya.com/blog/2021/05/how-to-build-word-cloud-in-python/)
## 6. Yet Another Keyword Extractor (Yake)
**YAKE** là một phương pháp trích xuất từ khóa tự động **không giám sát**, để xác định các từ khóa có liên quan nhất trong một văn bản bằng cách sử dụng dữ liệu thống kê văn bản từ các **văn bản đơn lẻ**. Kỹ thuật này không dựa vào từ điển, kho dữ liệu bên ngoài, kích thước văn bản, ngôn ngữ ... và nó không yêu cầu đào tạo về một bộ tài liệu cụ thể nào cả. Các đặc điểm chính của thuật toán Yake như sau:

* Unsupervised approach
* Corpus-Independent
* Domain and Language Independent
* Single-Document
```python
import yake
doc = "When Sebastian Thrun started working on self-driving cars at Google in 2007, few people outside of the company took him  seriously."
kw_extractor = yake.KeywordExtractor()
keywords = kw_extractor.extract_keywords(doc)
for kw in keywords:
  print(kw)
```
```
('Sebastian Thrun started', 0.006884150060415161)
('Thrun started working', 0.015042304599106411)
('Sebastian Thrun', 0.02140921543860024)
('Thrun started', 0.04498862876540802)
('cars at Google', 0.04498862876540802)
('started working', 0.09700399286574239)
('working on self-driving', 0.09700399286574239)
('self-driving cars', 0.09700399286574239)
('Sebastian', 0.1447773057422032)
('Thrun', 0.1447773057422032)
('Google', 0.1447773057422032)
('started', 0.29736558256021506)
('working', 0.29736558256021506)
('self-driving', 0.29736558256021506)
('cars', 0.29736558256021506)
('people', 0.29736558256021506)
('company', 0.29736558256021506)
```
Các bạn có thể tìm hiểu kỹ hơn về tư tưởng và thuật toán được triển khai trong thư viện này ở đây nhé:  [Yake](https://pypi.org/project/yake/)
## 7. Textrazor API
Ngoài cách sử dụng một số thư viện có sẵn trong python thì api cũng là một sự lựa chọn tốt cho tác vụ mà mình muốn triển khai. **API Textrazor** có thể được truy cập bằng nhiều ngôn ngữ máy tính khác nhau, bao gồm Python, Java, PHP và các ngôn ngữ khác. Chúng ta sẽ nhận được API key để trích xuất từ khóa từ văn bản khi đã tạo tài khoản với Textrazor.

**Textrazor** là một lựa chọn không tệ cho các nhà phát triển cần các công cụ trích xuất nhanh chóng với các tùy chọn tùy chỉnh toàn diện. Đây là một dịch vụ trích xuất từ khóa có thể được sử dụng cục bộ hoặc trên clound. API TextRazor có thể được sử dụng để trích xuất ý nghĩa từ văn bản và có thể dễ dàng kết nối với ngôn ngữ lập trình. Chúng ta có thể thiết kế trình trích xuất tùy chỉnh và trích xuất các từ đồng nghĩa và mối quan hệ giữa các thực thể, ngoài việc trích xuất các từ khóa và thực thể bằng 12 ngôn ngữ khác nhau

```python
import textrazor
textrazor.api_key = "your_api_key"
client = textrazor.TextRazor(extractors=["entities", "topics"])
response = client.analyze_url("https://www.textrazor.com/docs/python")
for entity in response.entities():
    print(entity.id, entity.relevance_score, entity.confidence_score)
```
Các bạn có thể tìm hiểu kỹ hơn về API ở đây nhé:  [Textrazor API](https://www.textrazor.com/docs/python)
#  Tổng kết
Với tốc độ phát triển của công nghệ hiện nay có rất nhiều giải pháp chọn lọc từ khóa được xây dựng và phát triển với tốc độ và độ chính xác cao, các bài toán được phát triển dựa theo đó cũng là các bài toán lớn và yêu cầu lượng dữ liệu không hề nhỏ. Bài viết lần này mình chỉ giới thiệu một số giải pháp đã được xây dựng dể dàng cài đặt và sử dụng. Hy vọng có thể giúp các bạn có thêm một số lựa chọn trong quá trình xây dựng và phát triển các dự án liên quan tới ngôn ngữ tự nhiên. 
# Tài liệu tham khảo
[Spacy](https://pypi.org/project/spacy/)

[RAKE_NLTK](https://pypi.org/project/rake-nltk/)

[TextRank](https://towardsdatascience.com/textrank-for-keyword-extraction-by-python-c0bae21bcec0)

 [KeyBert](https://pypi.org/project/keybert/)
 
 [Word cloud](https://www.analyticsvidhya.com/blog/2021/05/how-to-build-word-cloud-in-python/)
 
  [Yake](https://pypi.org/project/yake/)
  
  [Textrazor API](https://www.textrazor.com/docs/python)