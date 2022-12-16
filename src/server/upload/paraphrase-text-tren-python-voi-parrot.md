Nếu từng có trải nghiệm làm chatbot (ví dụ với Rasa), chắc hẳn bạn cũng từng phải vò đầu bứt tai cố nghĩ ra các cách nói khác nhau (paraphrase) của cùng một user intent để tạo training data cho chatbot. Paraphrase với tiếng mẹ đẻ là tiếng Việt đã rất nản và mất thời gian rồi chứ đừng nói đến những ngôn ngữ khác. Ngoài ra khi augment data cho một số task NLU khác (ví dụ  slot-filling) chúng ta cũng cần đến paraphrasing.

Vì vậy trong bài này mình sẽ giới thiệu với các bạn một công cụ hỗ trợ text paraphrasing cho tiếng Anh dùng python, đó là [Parrot Paraphraser](https://github.com/PrithivirajDamodaran/Parrot_Paraphraser).

Parrot là một augmentation framework dựa trên việc paraphrase được xây dựng để tăng tốc độ training của các mô hình NLU (Natural Language Understanding). Công nghệ paraphrasing của PARROT được dựa trên thuật toán T5 (viết tắt của Text-To-Text Transfer Transformer) được phát triển bởi Google (tham khảo thêm về thuật toán này tại [đây](https://paperswithcode.com/method/t5)).

### Cài đặt thư viện Parrot và import các thư viện cần thiết

Thư viện Parrot chứa các mô hình text paraphrasing được pre-trained. Mô hình này được gọi là parrot_paraphraser_on_T5 và được list trên [trang web](https://huggingface.co/models?pipeline_tag=text2text-generation&search=paraphrase) của Hugging Face.
```
! pip install git+https://github.com/PrithivirajDamodaran/Parrot.git

from parrot import Parrot
import torch
import warnings
warnings.filterwarnings("ignore")
```

### Reproducibility of the Text Paraphrasing

Để có thể tái hiện lại kết quả paraphrasing, chúng ta sẽ thiết lập một số random seed. Nói cách khác, khi chạy lại code nhiều lần thì kết quả trả ra sẽ giống nhau với mỗi random seed number.

```
def random_state(seed):
  torch.manual_seed(seed)
  if torch.cuda.is_available():
    torch.cuda.manual_seed_all(seed)

random_state(1234)
```

### Load model
```
parrot = Parrot(model_tag="prithivida/parrot_paraphraser_on_T5")
```

### Thử nghiệm model nào
```
phrases = ["Where can I buy the product?", "How do I use this?", "My aircon is not working"]
for phrase in phrases:
  print("-"*100)
  print("Input_phrase: ", phrase)
  print("-"*100)
  para_phrases = parrot.augment(input_phrase=phrase)
  for para_phrase in para_phrases:
   print(para_phrase)
```
Kết quả :
![image.png](https://images.viblo.asia/5fbdc01e-3204-4655-a9b8-fae637aade34.png)

Chúng ta có thể thấy:
- Các câu sinh ra đúng ngữ pháp (Fluency)
- Nghĩa của câu được bảo toàn khá ổn (Adequacy)
- Mô hình có thể sinh ra một số câu khá là "sáng tạo" - không phải chỉ đơn thuần là thay thế các từ trong câu gốc bằng synonym hoặc sửa đổi cấu trúc ngữ pháp (Diversity)

### Một số tùy biến khác

```
para_phrases = parrot.augment(input_phrase=phrase,
                               use_gpu=False,
                               diversity_ranker="levenshtein",
                               do_diverse=False, 
                               max_return_phrases = 10, 
                               max_length=32, 
                               adequacy_threshold = 0.99, 
                               fluency_threshold = 0.90)

```
Như vậy chúng ta có thể "tweak" các thông số này để sinh ra được các paraphrases đa dạng hơn tùy theo mục đích sử dụng.


### Kết luận

Parrot chủ yếu tập trung vào augmentation cho các văn bản theo dạng conversational interfaces (giao diện đối thoại) cho các bài toán NLU, tức là các câu được nhập vào qua bàn phím hoặc giọng nói của người sử dụng, như vậy các câu sẽ không quá dài. Do đó, mô hình được pre-trained với các mẫu văn bản có độ dài tối đa là 32 và nó cũng perform tốt hơn với các câu đầu vào ngắn gọn, thuộc dạng question hoặc command.

Như vậy trong bài này mình đã giới thiệu đến các bạn thư viện Parrot Paraphraser, có thể được sử dụng để sinh dữ liệu augmentation để training cho chatbot hoặc các bài toán NLU khác. Với mỗi câu paraphrases sinh ra bạn lại có thể dùng nó để paraphrasing tiếp, nhờ vậy việc sinh dữ liệu sẽ đỡ vất vả và nhàm chán hơn rất nhiều :D 

Hơi tiếc là hiện tại thư viện này mới chỉ support text tiếng Anh, mình cũng đang nghiên cứu và sẽ chia sẻ thêm về augmentation với các ngôn ngữ khác như tiếng Việt, tiếng Nhật trong các bài tiếp theo.

### References
- https://github.com/PrithivirajDamodaran/Parrot_Paraphraser
- https://towardsdatascience.com/how-to-paraphrase-text-using-python-73b40a8b7e66