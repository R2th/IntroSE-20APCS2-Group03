# 1. Vấn đề tách câu trong bài toán NLP tiếng Nhật

Bên cạnh các bước tiền xử lý văn bản như part-of-speech tagging, tokenization, stemming & lemmatization, vv., tách câu cũng là một bước quan trọng, nhất là đối với với các task NLP coi các câu là đơn vị xử lý (information retrieval, semantic search, vv.)

Tách câu, hay còn gọi là sentence boundary disambiguation, sentence segmentation, sentencizer là bài toàn trong xử lý ngôn ngữ tự nhiên chỉ ra điểm bắt đầu và kết thúc của một câu. Trong các trường hợp thông thường, một câu sẽ kết thúc bởi các dấu câu: chấm, hỏi chấm, chấm than. Tuy nhiên dấu chấm cũng có thể biểu thị chữ viết tắt, dấu thập phân, dấu chấm lửng hoặc địa chỉ email, vv. Theo Wikipedia, khoảng 47% các dấu chấm trong kho ngữ liệu của Wall Street Journal biểu thị các chữ viết tắt. Tương tự, dấu chấm hỏi và chấm than có thể được sử dụng trong biểu tượng cảm xúc (emoji), tiếng lóng, vv.

Với các ngôn ngữ như tiếng Nhật, tiếng Trung, ranh giới câu còn "mơ hồ" hơn:

- Trong tiếng Nhật, dấu chấm, dấu chấm than và dấu chấm hỏi là các dấu phân cách để phân đoạn câu trong hầu hết các trường hợp. Mỗi loại dấu có thể đại diện bằng các ký tự khác nhau, có dạng full-width, half-width, vv.

![image.png](https://images.viblo.asia/cbc76974-1e39-4cc4-926f-88d6389cd228.png)

- Một số biến thể của ranh giới câu tiếng Nhật có thể kể đến như: việc mô tả cảm xúc (ví dụ: “(笑)”: cười, “(涙)”: khóc), emoji (ví dụ: “ (* ˆ∇ˆ *) ”,“ §ˆ｡ˆ§ ”), v.v. - thường gặp trong văn bản không chính thức, trên Internet 

- Ranh giới câu cũng có thể được biểu hiện bằng việc ngắt dòng mà không cần dấu chấm câu. 

![image.png](https://images.viblo.asia/ad216328-61ff-4f4d-83aa-618db1429dea.png)

- Mặt khác, chúng ta cũng không thể đơn giản coi vị trí ngắt dòng là ranh giới của câu vì trong văn bản tiếng Nhật, một câu có thể được xuống dòng giữa chừng. Người ta thường làm như vậy để cho các câu dài dễ đọc hiểu hơn. Theo một nghiên cứu năm 2003 thực hiện phân tích cấu trúc các tài liệu bằng sáng chế của Nhật Bản cho biết, 48.5% yêu cầu bảo hộ đầu tiên trong 59,968 tài liệu bằng sáng chế có ngắt dòng trong câu. 

![image.png](https://images.viblo.asia/e26e6076-f70b-4901-839e-f3e6b7b97099.png)

- Một trường hợp nữa làm việc tách câu trở nên khó khăn hơn là xử lý văn bản được copy/ convert từ file pdf, bảng biểu hoặc công cụ OCR. Văn bản lúc này sẽ bị xuống dòng không theo quy luật ngữ nghĩa hoặc trở nên khá là rời rạc. 

Những lúc này thì một công cụ tách câu tốt sẽ giúp ích được rất nhiều cho chất lượng dữ liệu cũng như tiết kiệm được thời gian công sức của chúng ta.

# 2. Một số công cụ tách câu cho văn bản tiếng Nhật
Tách câu là một phần quan trọng trong quá trình tiền xử lý văn bản, làm đầu vào cho các bước tiếp theo. Do vậy có một công cụ sentencizer hữu hiệu giắt tay áo cũng không tệ phải không nào, nhất là đối với ngôn ngữ có nhiều ngoại lệ như Tiếng Nhật.

Trong bài này mình sẽ giới thiệu 3 công cụ phổ biến và thử dùng để tách câu cho ví dụ sau:
```
input_text = """平素より格別のご愛顧を賜り、誠にありがとうございます
A.B.C会社 ××部にて営業を担当しております(* ˆ∇ˆ *)山田と申します。
この度、◯月◯日をもちまして、
前任の××に代わり貴社の担当として
新しく着任いたしましたため、
ご挨拶の
連絡をさせていただきました。"""
```
Bên cạnh các câu được ngắt theo quy tắc thông thường, mình đã thêm vào một số trường hợp đặc biệt như emoji, xuống dòng khi chưa hết câu, vv. để dễ dàng so sánh.

## 2.1. ja_sentence_segmenter (Rule-based)
Link: https://github.com/wwwcojp/ja_sentence_segmenter
```
!pip install ja_sentence_segmenter
```

Đây là một công cụ tách câu dựa trên các quy tắc ngắt câu thông dụng (ví dụ dấu chấm, chấm than, dấu hỏi ở cuối câu, xử lý dấu ngoặc đơn - ngoặc kép, vv.)

```
import functools
from ja_sentence_segmenter.common.pipeline import make_pipeline
from ja_sentence_segmenter.concatenate.simple_concatenator import concatenate_matching
from ja_sentence_segmenter.normalize.neologd_normalizer import normalize
from ja_sentence_segmenter.split.simple_splitter import split_newline, split_punctuation

split_punc2 = functools.partial(split_punctuation, punctuations=r"。!?")
concat_tail_no = functools.partial(concatenate_matching, former_matching_rule=r"^(?P<result>.+)(の)$", remove_former_matched=False)
segmenter = make_pipeline(normalize, split_newline, concat_tail_no, split_punc2)
for idx, sent in enumerate(list(segmenter(input_text))):
    print(idx, sent)
```
Nó làm việc ổn với các loại văn bản hành chính hay sách báo có format chuẩn, tuy nhiên khi gặp các case đặc biệt như nhắc đến trong phần 1, văn bản trong đời sống bình thường như tin nhắn, trên internet thì không được hữu dụng cho lắm vì nó gần như không xử lý được các trường hợp xuống dòng khi chưa hết câu cũng như không xét đến ngữ nghĩa của câu. Tuy nhiên do là rule-based nên nó khá nhẹ và nhanh nên nếu là văn bản thông thường thì hoàn toàn có thể cân nhắc sử dụng.

Kết quả:
```
0 平素より格別のご愛顧を賜り、誠にありがとうございます

1 A.B.C会社 ××部にて営業を担当しております(* ˆ∇ˆ *)山田と申します。

2 この度、◯月◯日をもちまして、

3 前任の××に代わり貴社の担当として

4 新しく着任いたしましたため、

5 ご挨拶の連絡をさせていただきました。
```
## 2.2. Spacy Dependency parser
Link: https://spacy.io/usage/linguistic-features#sbd
```
!pip install -U spacy
!python -m spacy download ja_core_news_trf
import spacy
nlp = spacy.load("ja_core_news_trf")
```
Không giống như các thư viện khác, spaCy sử dụng phân tích cú pháp phụ thuộc (dependency parse) để xác định ranh giới câu. Tức là nó sẽ phân tích cú pháp của một câu để chỉ ra mối quan hệ phụ thuộc giữa các thành phần trong câu. Đây thường là cách tiếp cận rất chính xác, nhưng với các loại văn bản không có format chuẩn thì có thể thêm một custom component để pipeline hoạt động hiệu quả hơn.
![image.png](https://images.viblo.asia/59c5e7a0-9c68-49be-b150-f3bf88777d3c.png)
```
doc = nlp(input_text)
for idx, sent in enumerate(doc.sents):
    print(idx, sent.text)
```
Kết quả:

```
0 平素より格別のご愛顧を賜り、誠にありがとうございます

1 A

2 .B.C会社 ××部にて営業を担当しております(

3 * ˆ∇ˆ *)山田と申します。

4 この度、◯月◯日をもちまして、
前任の××に代わり貴社の担当として
新しく着任いたしましたため、

5 ご挨拶の
連絡をさせていただきました。
```
Cũng tạm được, `spacy` có thể phân biệt được phần phía sau `(* ˆ∇ˆ *)` là một câu riêng biệt. Nhưng nó lại bị nhầm lẫn dấu (.) trong tên công ty A.B.C là dấu tách câu. Như đã nói ở trên, ta có thể thêm một rule based component vào pipeline để tăng độ chính xác.

Ngoài ra thì `spacy` cũng cung cấp cả những công cụ khác như tokenizer, POS tagger, vv. tạo nên một **pipeline hoàn chỉnh**

## 2.3. Bunkai
Link: https://github.com/megagonlabs/bunkai
```
!pip install transformers==4.21.3
!pip install emoji==1.7     
!pip install -U 'bunkai[lb]'
!bunkai --model bunkai-model-directory --setup
```
Công cụ này gồm 2 thành phần chính:
- Bunkai: tập hợp các annotators để detect vị trí ngắt câu theo rule based và xử lý các trường hợp ngoại lệ.
- SBD model: được mô tả trên bài báo [Sentence Boundary Detection on Line Breaks in Japanese](https://aclanthology.org/2020.wnut-1.10.pdf), model được finetune từ model Bert Japanese của đại học Tohoku, tập trung vào việc xác định xem một dấu xuống dòng có phải ranh giới ngắt câu hay không.
(Thông tin thêm: theo mình tìm hiểu được thì một số thử nghiệm cho thấy 2 language model pre-trained tiếng Nhật cho performance của các task tốt nhất là [NICT BERT](https://alaginrc.nict.go.jp/nict-bert/index.html) và [Bert Japanese của Tohoku University](https://github.com/cl-tohoku/bert-japanese))

```
def example_basic_usage(input_text: str, path_newline_model: typing.Optional[Path] = None):
    from bunkai.algorithm.bunkai_sbd.bunkai_sbd import BunkaiSentenceBoundaryDisambiguation

    bunkai = BunkaiSentenceBoundaryDisambiguation(path_model=path_newline_model)
    iter_sentences = bunkai(input_text)
    for idx, sent in enumerate(iter_sentences):
        assert isinstance(sent, str)
        print(idx, sent)
        
PATH_NEWLINE_MODEL = Path("/content/bunkai-model-directory/")
example_basic_usage(input_text, PATH_NEWLINE_MODEL)
```
Kết quả:

```
0 平素より格別のご愛顧を賜り、誠にありがとうございます

1 A.B.C会社 ××部にて営業を担当しております(* ˆ∇ˆ *)山田と申します。

2 この度、◯月◯日をもちまして、
前任の××に代わり貴社の担当として
新しく着任いたしましたため、
ご挨拶の
連絡をさせていただきました。
```
Có thể thấy mô hình SBD nhận diện khá tốt, nhất là đối với các trường hợp xuống dòng khi chưa hết câu (nó xác định đúng dấu xuống dòng sau `ため、` không phải là ranh giới câu). 

Công cụ này **đặc biệt hữu dụng để xử lý các văn bản convert từ PDF hoặc bảng biểu.**

# 3. Kết luận
Trong bài này mình đã nêu ra những khó khăn trong bước tách câu (sentence segmentation) khi xử lý văn bản tiếng Nhật, đồng thời giới thiệu 3 công cụ thường dùng. Mỗi loại có những điểm mạnh, yếu riêng nên các bạn có thể xem xét và sử dụng trong từng case thích hợp nhé :D 

# References
- [Sentence Boundary Detection on Line Breaks in Japanese](https://aclanthology.org/2020.wnut-1.10.pdf)
- https://github.com/megagonlabs/bunkai
- https://spacy.io/usage/linguistic-features#sbd
- https://blog.octanove.org/japanese-pretrained-models/