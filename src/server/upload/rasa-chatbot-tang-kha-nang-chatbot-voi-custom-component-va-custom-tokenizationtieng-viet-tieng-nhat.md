Vậy là đã tròn 6 tháng mình không viết bất cứ bài chia sẻ nào trên Viblo cả, kể cũng buồn và hơi nhớ. Một phần lý do là mình lười (phần quan trọng nhất, chiếm khoảng 90% ), phần còn lại là bị cuốn bởi 2 nền tảng khác của Viblo là [Viblo Code](https://code.viblo.asia) và [Viblo CTF](https://ctf.viblo.asia) nên tự dưng sao đãng Viblo Sharing.

Nhưng thôi, mình đã quay lại rồi và để kỉ niệm con số 6 tháng khá đẹp này thì mình lại kiếm 1 cái gì đó để viết. (liên quan v~~~).

Giờ kiếm cái gì để viết cũng là một điều trăn trở. Hôm trước mình có ngồi với cu em thấy nó làm chatbot với Rasa, thấy có cái bug to đùng là sau khi training một hồi không thấy model bắt được cái entity nào kể cả trong dữ liệu training, thấy lạ mình nhảy vào nhìn thì em nó làm chatbot Tiếng Nhật mà Tiếng Nhật không hề có dấu khoảng trắng như các ngôn ngữ Latin khác(cái này là hiện tượng chung của mấy ngôn ngữ tượng hình như tiếng Trung, tiếng Thái rồi). Và vấn đề là em nó lại đang dùng **WhitespaceTokenizer** vậy là chết rồi. Hotfix cho em nó, mình chỉ mẹo là thay vì Tokenizer cho text đầu vào thì giờ xử lý theo character level đi, đó cũng là một cách và nó hoàn toàn WORK. Tuy nhiên, đó chỉ là giải pháp tạm thời để mình không phải code nhiều, còn giờ, khi đang có thời gian remote tại nhà, mình sẽ chỉ các bạn đi sâu vào bài toán này và giải quyết nó một cách hiệu quả hơn.

Mà nghĩ cũng lạ, tự dưng thấy người người nhà nhà thi nhau làm và viết về Rasa chatbot. Đây này [Tâp tành làm RASA CHATBOT](https://viblo.asia/p/tap-tanh-lam-rasa-chatbot-gAm5y8Nwldb), đây nữa [Sử dụng Rasa Custom Actions xử lý cuộc hội thoại cho chatbot](https://viblo.asia/p/su-dung-rasa-custom-actions-xu-ly-cuoc-hoi-thoai-cho-chatbot-bJzKmOywl9N), rồi cả đây nữa [Cách kết nối Chatwork với Rasa, và 5 phút mặc niệm latency trên trời](https://viblo.asia/p/cach-ket-noi-chatwork-voi-rasa-va-5-phut-mac-niem-latency-tren-troi-924lJJb0lPM) . Chưa kể đến ngoài Viblo còn có cả bác Thắng này làm nguyên 3 bài về Rasa [Ai cũng có thể làm RASA chatbot “siêu ngon khổng lồ”](https://ainoodle.vn/tag/chatbot/) thỉnh thoáng mình thấy chia sẻ trên các group nữa. Kể cũng trùng hợp nên mình viết thêm 1 bài đóng góp cho vui. Các bạn cũng có thể đọc qua mấy bài kia để hiểu hơn về Rasa và thử làm con chatbot chơi xem sao.

Lâu rồi không động tay viết, cũng có đôi chút dài dòng khúc dạo đầu, thôi chúng ta cùng tập trung vào món chính. (go) (go) (go)
# Rasa cơ bản
Thực ra ban đầu mình không định viết lại về Rasa cơ bản vì có khá nhiều người đã biết hoặc viết rồi nhưng nghĩ lại thừa còn hơn thiếu, mình vẫn nhắc lại những điều căn bản cần biết trước khi bạn bắt đầu làm chatbot với Rasa. Chúng ta bắt đầu với các thành phần của nó.
## Các thành phần
Về cơ bản thì Rasa là một Framework giúp chúng ta xây dựng các chatbot một cách hiệu quả và dễ dàng. Khi cài đặt [Rasa framework](https://rasa.com/docs/getting-started/) bạn sẽ thấy nó có 3 thành phần chính cấu thành nên nó bao gồm:
* **Rasa NLU**: Cái này được sinh ra với mục đích là phân tích những thông tin có trong tin nhắn mà con người gửi đến cho chatbot. Các thông tin bao gồm ý định của người dùng (**intent**) và các đối tượng, thực thế được nhắc đến cần trích xuất (**Entities**).
* **Rasa Core**: Sau khi đã phần tích được các thông tin cần thiết có trong tin nhắn của người dùng gửi tới chatbot, việc tiếp theo là dự đoán hành động tiếp theo mà chatbot cần làm để phản hồi lại người dùng. Cái này bao có thể là phản hồi lại tin nhắn hoặc truy vấn database hay bất cứ hành động nào ta có thể định nghĩa. Và Rasa Core được sinh ra để làm nhiệm vụ dự đoán này.
* **Rasa X**: Hiểu đơn giản cái này chính là giao diện của toàn Rasa. Bạn có thể tạo dữ liệu traning trên này, train model trên này, test trên này với một giao diện chatbot cực kỳ thân thiện, gửi URL cho người khác test, thu thập dữ liệu test để training lại,... Và dĩ nhiên phần này là phần bổ sung, bạn có thể dùng hoặc không.

Ngoài ra thì Rasa này cũng có 1 phần là [Channels](https://rasa.com/docs/rasa/user-guide/messaging-and-voice-channels/) khá là thân thiện trong việc giúp ra kết nối chatbot của mình với các nền tảng nhắn tin như Facebook, Slack, Telegram,...

Trước khi tiếp tục, cài đặt Rasa và xem cấu trúc cơ bản của 1 project đã.

```
pip install rasa==1.7.0
rasa init
```

Sau khi khởi tạo thành công project, bạn sẽ nhìn thấy trong thư mục mấy cái dạng như:

* **actions.py**: Nơi bạn sẽ code tất cả mọi hành động tùy chỉnh mà bạn muốn bot làm
* **config.yml**: Nơi bạn cấu hình các thông tin liên quan tới mô hình NLU và Core, cách mà chúng hoạt động.
* **credentials.yml**: Thông tin chi tiết về cách kết nối chatbot với các dịch vụ như Facebook, Slack, Telegram,...
* **data/nlu.md**: Dữ liệu huấn luyện cho NLU, bao gồm các câu được gán nhãn **intent** và **entities** theo định dạng cho trước.
* **data/stories.md**: Dữ liệu huấn luyện cho Rasa core, là các kịch bản mà bạn muốn bot làm theo.
* **domain.yml**: Đây coi như phần khai báo tất cả mọi thứ mà chatbot của bạn sử dụng, bao gồm các intent, entities, actions,...
* **endpoints.yml**: Các endpoints mà bạn muốn chatbot trả ra
* **models/**: Nơi lưu trữ các model bạn đã huấn luyện
## Rasa NLU
Như đã nói ở trên, NLP được xây dựng với mục đích là xác định mục đích/ý định của người dùng trong tin nhắn(**intent**) và trích xuất các thực thể có trong tin nhắn đó. Ví dụ như trong câu:
> Tôi muốn thuê nhà nghỉ ở khu vực Hà Nội
> 
Thì thông tin mà NLU module trả về sẽ là:

```
{
  "intent": "thue_nha",
  "entities": {
    "house_type" : "nhà nghỉ",
    "location" : "Hà Nội"
  }
}
```
Dữ liệu training cho NLU model bạn có thể định nghĩa theo định dạng json hoặc markdown, riêng mình rất thích markdown vì nó đơn giản hơn định dạng json rất nhiều, rất tiện cho việc làm dữ liệu. (Bạn vào file **nlu.md** trong thư mục data để tùy chỉnh lại dữ liệu). Dữ liệu huấn luyện có dạng như sau:

```
## intent:greet
- hi
- hello
- xin chào
- chào em

## intent:goodbye
- bye
- tạm biệt em
- tạm biệt

## intent:ask_bot
- Cho anh mua [đôi giầy](product_name)
- Anh muốn mua [đôi tất](product_name)
- Anh muốn mua [đôi vớ](product_name:đôi tất)

## intent:feedback
- Anh nhận được hàng rồi, sản phẩm chất lượng tốt
```
Ở đây mình định nghĩa ra 4 intent ứng với mỗi ý định của người dùng mà bot có thể hỗ trợ và 1 entity mà mình gọi là product_name. Trong trường hợp các sản phẩm được gọi với nhiều tên, mình sử dụng cú pháp **Entity Synonyms** như bạn thấy ở trên để ánh xạ từ ***đôi vớ***  thành ***đôi tất***.

Tiếp theo, mình xem qua các cấu hình của model NLU. Chi tiết thì các bạn chỉ có thể đọc ở [Doc](https://rasa.com/docs/rasa/nlu/choosing-a-pipeline/) của Rasa là chi tiết và đầy đủ nhất. Trong file config.yml mình thấy đoạn config cho NLU model.

```python
language: en
pipeline: supervised_embeddings
```

Với pipeline là **supervised_embeddings** thì Rasa có huấn luyện với bất kì ngôn ngữ nào trên đời vì chính xác là bạn đang trạining lại mọi thứ từ đầu, chỉ phụ thuộc vào dữ liệu huấn luyện của bạn. Pipline này tương đương với:

```python
language: "en"

pipeline:
- name: "WhitespaceTokenizer"
- name: "RegexFeaturizer"
- name: "CRFEntityExtractor"
- name: "EntitySynonymMapper"
- name: "CountVectorsFeaturizer"
- name: "CountVectorsFeaturizer"
  analyzer: "char_wb"
  min_ngram: 1
  max_ngram: 4
- name: "EmbeddingIntentClassifier"
```
Ngoài ra cũng có các pipeline mẫu khác cho bạn lựa chọn như **pretrained_embeddings_spacy**, **pretrained_embeddings_convert**, **MITIE** hay bạn cũng có thể tùy chỉnh 1 pipeline bất kỳ nào theo ý bạn nhưng với mình **supervised_embeddings** gần như hoạt động trong mọi trường hợp mình cần.

```python
language: "en"

pipeline:
- name: "WhitespaceTokenizer"
- name: "RegexFeaturizer"
- name: "CRFEntityExtractor"
- name: "EntitySynonymMapper"
- name: "CountVectorsFeaturizer"
- name: "CountVectorsFeaturizer"
  analyzer: "char_wb"
  min_ngram: 1
  max_ngram: 4
- name: "EmbeddingIntentClassifier"
  batch_strategy: sequence
```

Ngoài ra dễ để ý thấy có 2 thành phần khá là quan trọng trong phần cấu hình này mà bạn cần để ý đó là **Tokenizaion** mà ở đây do là tiếng Việt nên có thể sử dụng **WhitespaceTokenizer** và một phần nữa là **Featurization** mình sử dụng là **RegexFeaturizer** và **CountVectorsFeaturizer** do mình không dùng pre-trained trong trường hợp này. Rasa cũng rất nhanh nhạy khi đã hỗ trợ nhiều pre-trained khá nổi thời gian gần đây như BERT, GPT-2 bạn có thể đọc thêm ở đây [Featurization](https://rasa.com/docs/rasa/nlu/choosing-a-pipeline/#featurization).

Toàn bộ các thành phần cấu hình cho Rasa NLU đều ở đây [Components](https://rasa.com/docs/rasa/nlu/components/) nên đôi khi bạn nên xem qua trước khi đào sâu vào nó. Một điều đặc biệt là trong khi tất cả các thành phần ở đây đều khá thân thiện cho bất kỳ ngôn ngữ nào tuy nhiên **Tokenizers** hơi khó chịu cho các ngôn ngữ tượng hình không có dấu khoảng trắng. Ở đây mình chỉ thấy Jieba Tokenizer cho Chinese language chắc do Trung Quốc đông dân số quá. Thực ra trong **Tokenizers** cũng có một thành phần tách từ cho một vài ngôn ngữ có trên Spacy là **SpacyTokenizer** và mặc dù Spacy cũng có Japanese language nhưng mình không ưa Spacy nên trong bài này mình sẽ Custom một Tokenizer cho tiếng Nhật xem sao. Đấy chính là mục đích chính của bài này nhưng để lát nữa, chúng ta vẫn cần ôn lại Rasa.

Rồi, giờ hãy train thử **NLU** trước và xem nó có hoạt động không đã.
```
rasa train nlu
```

Để test, hãy tạm sử dụng rasa shell:

```
rasa shell
```
Và đây là kết quả:

```
Anh muốn mua một đôi vớ  
{
  "intent": {
    "name": "ask_bot",
    "confidence": 0.9999674558639526
  },
  "entities": [
    {
      "start": 17,
      "end": 25,
      "value": "đôi tất",
      "entity": "product_name",
      "confidence": 0.837924130907059,
      "extractor": "CRFEntityExtractor"
    }
  ],
}
```
Ồ, It works.

Thử chuyển hết dữ liệu trong **nlu.md** sang tiếng Nhật xem sao.

```
## intent:greet
- こんにちは
- こんにちはベイビー

## intent:goodbye
- さようなら
- バイバイベイビー

## intent:ask_bot
- [靴を](product_name)買わせて
- [靴下](product_name)を買いたい
- [ソックス ](product_name:靴下)を買いたい

## intent:feedback
- 商品を受け取りました
```
Và train lại xem mọi thứ có hoạt động không (?). Lưu ý rằng pipeline của ta đang không phụ thuộc vào ngôn ngữ.

```
靴下を買いたい
{
  "intent": {
    "name": "ask_bot",
    "confidence": 0.9971107244491577
  },
  "entities": []
  ],
  "text": "靴下を買いたい"
}
```
Ồ, mặc dù model đã có fit vào với dữ liệu và chúng ta test trên chính dữ liệu đó mà model vẫn không bắt được giá trị entity nào, giống ý như trường hợp cu em bàn bên mình gặp phải. Vấn đề đã được nhắc tới từ trước đó là tiếng Nhật không có khoảng trắng và Rasa lại không có Tokenizer nào phù hợp(Tạm bỏ qua Spacy đi). Và rồi chúng ta bắt đầu tìm con đường mới.

Và giờ, chúng ta bắt đầu với phần nội dung trọng tâm đầu tiên của bài viết này. Xây dựng một Custom Tokenization cho tiếng Nhật. Nhân tiện nhiều bạn nghĩ rằng tiếng Việt mình dùng **WhitespaceTokenizer** cũng được thì không cần custom lại Tokenization khác thì bạn đã sai rồi nha, mỗi ngôn ngữ cần dùng 1 Tokenization cho riêng mình mới đạt được hiểu quả tốt nhất. Ở đây mình lười nên dùng WhitespaceTokenizer thôi, việc custom Tokenization cho tiếng Việt tương tự như tiếng Nhật thôi.

##  Custom Tokenization cho tiếng Nhật

Lượn quanh 1 vòng github tìm kiếm các thư viện Tokenizer cho tiếng Nhật, mình để ý thấy có [SudachiPy](https://github.com/WorksApplications/SudachiPy) khá ổn nên mình sử dụng ngay. Việc bây giờ là làm sao biến nó trở thành một phần của Rasa.

```
pip install SudachiPy
```

Sau khi install xong SudachiPy, để ý một chút nữa thì tất cả các phương thức Tokenizer mà Rasa đang hỗ trợ đều ở trong một thư mục của thư viện **rasa/nlu/tokenizers**. Vậy mình muốn thêm một hàm tokenizer khác thì chỉ cần thêm vào đây là xong. Chúng ta sẽ vào đó và tạo thêm một file python có tên là **japanese_tokenizer.py**. Lần mò xem các tài liệu tham khảo về cách xử dụng SudachiPy và các hàm Tokenizer có sẵn của Rasa, mình đã có cái này.

```python
import re
from typing import Any, Dict, List, Text

from rasa.nlu.tokenizers.tokenizer import Token, Tokenizer
from rasa.nlu.training_data import Message

from rasa.nlu.constants import TOKENS_NAMES, MESSAGE_ATTRIBUTES
from sudachipy import dictionary
from sudachipy import tokenizer
class JapaneseTokenizer(Tokenizer):

    provides = [TOKENS_NAMES[attribute] for attribute in MESSAGE_ATTRIBUTES]

    def __init__(self, component_config: Dict[Text, Any] = None) -> None:
        super().__init__(component_config)
        self.tokenizer_obj = dictionary.Dictionary().create()
        self.mode = tokenizer.Tokenizer.SplitMode.A

    def tokenize(self, message: Message, attribute: Text) -> List[Token]:
        text = message.get(attribute)
        words = [m.surface() for m in self.tokenizer_obj.tokenize(text, self.mode)]

        return self._convert_words_to_tokens(words, text)
```

Chưa hoàn thành, theo như hướng dẫn trên trang chủ của Rasa, bạn cần một chút sửa đổi trong file này nữa **/rasa/nlu/registry.py**. Tìm đến nó và xem nó là gì.

> This is a somewhat delicate package. It contains all registered components
and preconfigured templates.
>
> Hence, it imports all of the components. To avoid cycles, no component should
import this in module scope.

Vậy là rõ rồi, chúng ta chỉ việc import thêm cái mà chúng ta vừa tạo và *đăng ký* tên cho nó như bao thành phần khác trong Rasa.

```python
from rasa.nlu.tokenizers.japanese_tokenizer import JapaneseTokenizer
```

Và thêm nữa:
```python
component_classes = [
# tokenizers
JapaneseTokenizer,
MitieTokenizer,
SpacyTokenizer,
WhitespaceTokenizer,
JiebaTokenizer,
]
```
Và giờ, hãy thay đổi lại pipeline của NLU trong config.yml và train thử xem nó có hoạt động hay không?

```
language: "ja"

pipeline:
- name: "JapaneseTokenizer"
- name: "RegexFeaturizer"
- name: "CRFEntityExtractor"
- name: "EntitySynonymMapper"
- name: "CountVectorsFeaturizer"
- name: "CountVectorsFeaturizer"
  analyzer: "char_wb"
  min_ngram: 1
  max_ngram: 4
- name: "EmbeddingIntentClassifier"
  batch_strategy: sequence
```

Tiếp tục **rasa train nlu** và chờ kết quả.

```
ソックスを買いたい
{
  "intent": {
    "name": "ask_bot",
    "confidence": 0.9996852874755859
  },
  "entities": [
    {
      "start": 0,
      "end": 4,
      "value": "靴下",
      "entity": "product_name",
      "confidence": 0.8421566323612244,
      "extractor": "CRFEntityExtractor",
      "processors": [
        "EntitySynonymMapper"
      ]
    }
}
```
Trông ổn hơn rồi đó, **ソックス** đã được bắt đúng và được chuyển về 1 dạng là **靴下** rồi.

Tiện công search github mình lại thấy có [MeCab](https://github.com/SamuraiT/mecab-python3) là một thư viện cũng khá ổn để Tokenizer cho tiếng Nhật nên mình tiếp tục thử xem sao.

```
pip install mecab-python3
```

```python
import re
from typing import Any, Dict, List, Text

from rasa.nlu.tokenizers.tokenizer import Token, Tokenizer
from rasa.nlu.training_data import Message

from rasa.nlu.constants import TOKENS_NAMES, MESSAGE_ATTRIBUTES
import MeCab
class JapaneseTokenizer(Tokenizer):

    provides = [TOKENS_NAMES[attribute] for attribute in MESSAGE_ATTRIBUTES]

    def __init__(self, component_config: Dict[Text, Any] = None) -> None:
        super().__init__(component_config)
        self.mt = MeCab.Tagger()

    def tokenize(self, message: Message, attribute: Text) -> List[Token]:
        text = message.get(attribute)
        parsed = self.mt.parse(text)
        x = (parsed.replace('\n', '\t').split('\t'))
        words = []
        for i in range(0, len(x) - 2, 2):
            w = x[i]
            words.append(w)

        running_offset=0
        tokens = []
        for word in words:
            word_offset = text.index(word, running_offset)
            word_len = len(word)
            running_offset = word_offset + word_len
            tokens.append(Token(word, word_offset))
        return tokens
```

Vậy là công việc đầu tiên đã hoàn thành, chúng ta đã viết được một custom Tokenizer cho tiếng Nhật để huấn luyện được chính xác một chatbot cho tiếng Nhật. Giờ chắc phải đến phần hứa hẹn tiếp theo là Custom Components.

## Custom NLU Components
Như phần trên mình đã huấn luyện module đầu tiên cho chatbot là phân tích tin nhắn người dùng để xác định ý định của tin nhắn và các thực thể chứa đựng trong nó. Các thành phần của NLU chỉ có vậy, vậy custom thì custom cái gì đây.

Thực tế, bạn có thể xây dụng bất cứ thành phần phân tích nào tùy thích để thực hiện các nhiệm vụ cụ thể mà module hiện không cung cấp như dịch tin nhắn của người dùng sang một ngôn ngữ khác, sửa lỗi chính tả hay phân tích cảm xúc người dùng để bot của bạn có thể đáp trả một cách phù hợp hơn. Tất cả đều có thể xây dựng dựa trên class **rasa.nlu.components.Component**.

Trong trường hợp ở trên, mình đang giả định xây dựng một con bot có khả năng chào hỏi với người dùng Nhật, biết được họ đang cần mua gì và sẵn sàng nhận feedback của người dùng. Do vậy mình sẽ xây dựng một component Sentiment analysis xem sao. Mục đích để cho bot biết người dùng feedback tốt mà cảm ơn, feed back xấu mà xin lỗi.

Mục đích là component này sẽ được thêm vào pipeline NLU của Rasa:

```
pipeline:
- name: "sentiment.SentimentAnalyzer"
```

Let go!!! (go) (go)

Nhưng khoan,...

Sau một hồi với bác google translate, mình đã quyết định quay trở lại với tiếng Việt cho mọi việc đơn giản hơn. (huhu) Và dĩ nhiên, để bài toán tốt hơn cho tiếng Việt, mình lại phải thực hiện viết lại 1 custom tokenizer cho tiếng Việt.
###  Custom Tokenization cho tiếng Việt
Công việc cũng khá đơn giản thôi, như những gì mình đã hướng dẫn ở trên, chúng ta cần một hàm tokenizer cho tiếng Việt đặt trong file **vi_tokenizer.py** trong thư mục **rasa/nlu/tokenizers** của thư viện rasa và đăng ký nó trong **/rasa/nlu/registry.py**. Nội dung file **vi_tokenizer.py** bạn có thể tham khảo mình viết ở đây. ([Underthesea](https://pypi.org/project/underthesea/) của bác Vũ Anh hân hạnh tài trợ chương trình này. )

```
pip install underthesea
```

```python
import re
from typing import Any, Dict, List, Text
from rasa.nlu.tokenizers.tokenizer import Token, Tokenizer
from rasa.nlu.training_data import Message

from rasa.nlu.constants import TOKENS_NAMES, MESSAGE_ATTRIBUTES
from underthesea import word_tokenize
class VietnameseTokenizer(Tokenizer):

    provides = [TOKENS_NAMES[attribute] for attribute in MESSAGE_ATTRIBUTES]

    def __init__(self, component_config: Dict[Text, Any] = None) -> None:
        super().__init__(component_config)

    def tokenize(self, message: Message, attribute: Text) -> List[Token]:
        text = message.get(attribute)
        words = word_tokenize(text)

        return self._convert_words_to_tokens(words, text)
```

Rồi, mọi thứ cho tiếng Việt đã xong, mình sẽ làm luôn quả SentimentAnalyzer cho tiếng Việt. Tiện cũng thấy Underthesea có cái này nên dùng luôn khỏi code lại =)) =)) Cài cắm thêm 1 chút:

```
$ pip install git+https://github.com/facebookresearch/fastText.git@v0.2.0
$ pip install unidecode
$ underthesea download sa_general
```

```python
from underthesea import sentiment
sentiment('hàng kém chất lg,chăn đắp lên dính lông lá khắp người. thất vọng')
```

### Xây dựng module phân tích feedback người dùng(Sentiment analysis)
Rồi, giờ chúng ta tiếp tục để làm sao Rasa có thêm chức năng phân loại tích cực/tiêu cực từ tin nhắn người dùng như thế này.

Đầu tiên, theo các hướng dẫn từ docs của Rasa, chúng ta khởi tạo một file **sentiment_analysis.py** như dưới đây ở ngay trong thư mục Rasa project.

```python
from rasa.nlu.components import Component
from rasa.nlu import utils
from rasa.nlu.model import Metadata
from underthesea import sentiment
import os

class SentimentAnalyzer(Component):

    name = "sentiment"
    provides = ["entities"]
    requires = []
    defaults = {}
    language_list = ["vi"]

    def __init__(self, component_config=None):
        super(SentimentAnalyzer, self).__init__(component_config)

    def convert_to_rasa(self, value, confidence):
        """Convert model output into the Rasa NLU compatible output format."""
        
        entity = {"value": value,
                  "confidence": confidence,
                  "entity": "sentiment",
                  "extractor": "sentiment_extractor"}

        return entity


    def process(self, message, **kwargs):

        key, confidence = sentiment(message.text), 0.5
        entity = self.convert_to_rasa(key, confidence)
        message.set("entities", [entity], add_to_output=True)
```

Đó, đơn giản chỉ có thế, tiếp theo là chúng ta sửa file config.yml để sử dụng phần custom component này.

```python
language: "vi"

pipeline:
- name: "VietnameseTokenizer"
- name: "sentiment_analysis.SentimentAnalyzer"
- name: "RegexFeaturizer"
- name: "CRFEntityExtractor"
- name: "EntitySynonymMapper"
- name: "CountVectorsFeaturizer"
- name: "CountVectorsFeaturizer"
  analyzer: "char_wb"
  min_ngram: 1
  max_ngram: 4
- name: "EmbeddingIntentClassifier"
  batch_strategy: sequence
  
policies:
  - name: MemoizationPolicy
  - name: KerasPolicy
  - name: MappingPolicy
```

Okie, giờ chúng ta train thử và xem kết quả bằng **rasa shell**.

```python
rasa train nlu
```

Kết quả:

```python
Anh thích sản phẩm này lắm
{
  "intent": {
    "name": "feedback",
    "confidence": 0.6913111209869385
  },
  "entities": [
    {
      "value": "positive",
      "confidence": 0.5,
      "entity": "sentiment",
      "extractor": "sentiment_extractor"
    }
  ],
  "intent_ranking": [
    {
      "name": "feedback",
      "confidence": 0.6913111209869385
    },
    {
      "name": "goodbye",
      "confidence": 0.11893563717603683
    },
    {
      "name": "ask_bot",
      "confidence": 0.11649619042873383
    },
    {
      "name": "greet",
      "confidence": 0.07325704395771027
    }
  ],
  "text": "Anh thích sản phẩm này lắm"
}
```

Thấy chứ, vậy là Rasa NLU đã phân tích được message của người dùng là feedback, phần **entities** có thông tin về sentiment analysis với tên là **sentiment**, giá trị là **positive** và **confidence** mình fake ra là 0.5 (do thư viện của bác Vũ Anh không trả về cái này).

Okie, okie vậy là mục đích của bài này đã xong, chúng ta đã xây dựng được **Rasa NLU** phù hợp hơn, tốt hơn với tiếng Việt và tiếng Nhật, lại có thêm cả phân phân tích feedback của người dùng nữa mới xịn. Kết thúc, kết thúc ở đây thôi.

Ơ ơ khoan đã không được rồi, làm xong cái này xong để hoàn thiện con bot chúng ta phải đi đến tìm hiểu về Rasa core rồi trong đó bao nhiêu là thứ như:
+ Stories
+ Domains 
+ Actions 
+ Policies 
+ Slots
+ Forms

Xong rồi con làm sao để kết nối được với Facebook nữa chứ. Thôi các bạn đọc các bài của mấy bác ở đầu bài mình đã dẫn link nhá.

Bye!
See you!