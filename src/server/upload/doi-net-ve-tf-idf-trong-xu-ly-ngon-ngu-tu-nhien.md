### Mở đầu
Xử lý ngôn ngữ là công việc vô cùng quan trọng nhằm giúp cho máy tính hiểu được ngôn ngữ con người, qua đó giúp đỡ con người các công việc như: dịch thuật, phân tích văn bản, tìm kiếm thông tin, v.v..

TF-IDF là một trong những kỹ thuật cơ bản trong xử lý ngôn ngữ giúp đánh giá mức độ quan trọng của một từ trong văn bản. 

###  Nội dung

**TF(Term frequency)** : Tần suất xuất hiện của 1 từ trong 1 document.

TF(t, d) = (Số lần xuất hiện từ t) / (Tổng số từ)

``` python
def tf(term, doc):
    result = 0
    for word in doc:
        if word == term:
            result += 1
    return result / len(doc)
```

**IDF( Invert Document Frequency)** : Dùng để đánh giá mức độ quan trọng của 1 từ trong văn bản. Khi tính tf múc độ quan trọng của các từ là như nhau. Tuy nhiên trong văn bản thường xuất hiện nhiều từ không quan trọng xuất hiện với tần suất cao:
+ Từ nối : và, hoặc, ....
+ Giới từ: ở, trong, của, để, ....
+ Từ chỉ định: ấy, đó, nhỉ

Chính vì thế ta cần giảm đi mức độ quan trọng của những từ đó bằng **IDF**.

IDF(t, D) = log_e(Số văn bản trong tập D /Số văn bản chứa từ t trong tập D)
``` python
def idf(term, docs):
    result = 0
    for doc in docs:
        for word in doc:
            if word == term:
                result += 1
                break
    return math.log(len(docs) / result, math.e)
```
**TF-IDF**

TF-IDF(t, d, D) = TF(t, d) * IDF(t, D)

Những từ có tf-idf là nhũng từ xuất hiện nhiều trong 1 văn bản này và xuất hiện ít trong văn bản khác. Việc này giúp lọc ra những từ phổ biến và giữ lại những từ có giá trị cao trong văn bản ( keyword).

``` python
def tf_idf(term, doc, docs):
    return tf(term, doc) * idf(term, docs)
```

**Ứng dụng**

TF-IDF được sử dụng rộng rãi trong hệ thống tìm kiếm. Hệ thống sẽ xác định được từ nào mà người dùng quan tâm nhất, từ đó sẽ trả ra kết quả đáp ứng mong muốn của người dùng. VD ta search: "Làm thế nào để có người yêu" thì người yêu có tf-idf cao nhất. Hệ thống sẽ xác định và trả ra một loạt các kết quả có "người yêu" trước rồi sau đó mới đối chiếu với văn bản cần tìm kiếm.

### Tham khảo 
https://viblo.asia/p/tf-idf-term-frequency-inverse-document-frequency-JQVkVZgKkyd

https://en.wikipedia.org/wiki/Tf–idf

https://radimrehurek.com/gensim/tutorial.html