Chào các bạn, 
Tiếp theo Seri NLP mình sẽ viết về 1 số task cụ thể được thực hiện. Task đầu tiên sẽ là nhận dạng thực thể. Mình chọn task này vì trong quá trình mình làm mảng NLP thấy task này khá cơ bản và dùng nhiều.
Bắt đầu thôi nhỉ.
# Nhận dạng thực thể - Named Entity Recognition (NER)

![](https://images.viblo.asia/afc071b0-dfc6-4407-b33d-f0beb24b0b5b.png)


## 1. Nhận dạng thực thể là gì
Named Entity Recognition — NER: nhận dạng thực thể, là tác vụ cơ bản trong lĩnh vực Xử lý ngôn ngữ tự nhiên.
Vai trò chính của tác vụ này là nhận dạng các cụm từ trong văn bản và phân loại chúng vào trong các nhóm đã được định trước như tên người, tổ chức, địa điểm, thời gian, loại sản phẩm, nhãn hiệu, vân vân và vân vân...
Từ kết quả của task vụ NER có thể xử lý cho nhiều bài toán phức tạp hơn như Chatbot, Question Answering, Search,...

Một ví dụ về NER:

![](https://images.viblo.asia/8b16d927-2b7e-48dc-951b-0115330bda1c.png)


## 2. Có những phương pháp và dataset nào để thực hành
Bài toán nhận dạng thực thể cũng được đặt ra từ lâu nên có khá nhiều phương pháp giải quyết.

### Hướng tiếp cận Rule-based
Rule-based trong NER hoạt động như sau: một tập các rule được định nghĩa sẵn hay tự động phát sinh. Mỗi token trong văn bản sẽ được biểu diễn dưới dạng tập các feature. Văn bản đầu vào sẽ đem so sánh với tập rule này, nếu rule match thì sẽ thực hiện rút trích.
Một rule như vậy gồm pattern + action. Pattern thường là regular expression định nghĩa trên tập feature của token. Khi pattern này match thì action sẽ được kích hoạt.
Bạn có thể tự code rule của mình hoặc sử dụng 1 số thư viện hỗ trợ sẵn. Một trong những framework/thư viện khá nổi tiếng là Duckling của Facebook ([Link](https://github.com/facebook/duckling))

### Hướng tiếp cận Statistical learning
NER được chuyển về bài toán sequence labeling. Bài toán được định nghĩa như sau: cho trước tập các chuỗi quan sát ký hiệu x = (x_1, x_2, ...,x_n). Thông thường x_i được biểu diễn dưới dạng vector. Ta mong muốn gán nhãn y_i dựa vào dữ kiện từ các x_i trước đó.
Để gán nhãn, ta thường dùng BIO notation. Với mỗi entity kiểu T, ta có hai nhãn B-T và I-T. B-T là begin type T, I-T là inside type T. Ngoài ra, ta còn có nhãn O cho biết outside name entity. Bạn có thể tham khảo ví dụ bên dưới
```
Công Lý là diễn viên hài
B-PER I-PER O O O O
```
Các phương pháp được sử dụng:
* Hidden Markov Model
* Maximum Entropy
* Conditional Random Fields – CRFs
### Hướng tiếp cận Machine Learning/Deep Learning
Cùng với sự phát triển của Machine Learning/Deep Learning các phương pháp NER mới ra đời. 
Bạn có thể vào trang [PapersWithCode.com](https://paperswithcode.com/task/named-entity-recognition-ner) để xem các dataset và phương pháp đạt kết quả cao nhất.

Các phương pháp NER top đầu cho dataset CoNLL 2003 ([Link]()):

![](https://images.viblo.asia/a7069c9c-9d9b-4509-ba0a-1de0ad3cc7d7.png)


Đánh giá thử nghiệm của underthesea trên bộ VLSP 2016 ([Link]()):

![](https://images.viblo.asia/d0c3a541-ef69-4eb5-92c0-ee97f2e8eeaf.png)


### Dataset (bộ dữ liệu) thường dùng
Dataset thường được dùng nhất để thử nghiệm đánh giá model là [CoNLL 2003](https://www.clips.uantwerpen.be/conll2003/ner/) (English) và với tiếng Việt bạn có thể dùng bộ [VLSP 2016](https://vlsp.org.vn/vlsp2016/eval/ner)

## 3. Thử nghiệm
Do khuôn khổ bài hơi dài nên bài sau mình sẽ giới thiệu và thử nghiệm 2 phương pháp có kết quả tốt nhất hiện tại là Flair và BERT cho 2 bộ dataset CoNLL 2003 (English) và VLSP 2016 (tiếng Việt)

Hi vọng bài này cung cấp cái nhìn tổng quan cho các bạn về bài toán NER và các phương pháp/dataset thường dùng.

Nếu có gì thắc mắc các bạn cứ đặt gạch để mình giải đáp

## Nguồn tham khảo
* [Blog Ông Xuân Hồng](https://ongxuanhong.wordpress.com/2017/08/28/information-extraction-bai-toan-rut-trich-thong-tin-trong-van-ban/)
* [Underthesea](https://github.com/undertheseanlp/ner)
* [Papers With Code](https://paperswithcode.com/sota/named-entity-recognition-ner-on-conll-2003)
* [Rasa Entity Extraction](https://rasa.com/docs/rasa/nlu/entity-extraction/)