# Giới thiệu bài toán
Bài toán thêm dấu cho tiếng Việt là một bài toán khá hay và thú vị. Do đặc điểm thói quen của người dùng, do đặc điểm khác nhau của các bộ gõ, nhiều người dùng Việt Nam tạo nội dung không dấu trên internet. Đây là một thách thức lớn dành cho các nhà khoa học dữ liệu khi phải đồng bộ tất cả dữ liệu về cùng 1 dạng (tiếng Việt có dấu với cùng 1 chuẩn bộ gõ) để có thể khai thác được thông tin từ dữ liệu một cách chính xác và đầy đủ hơn.

Và bài toán này cũng là [challenge thứ 3](https://www.aivivn.com/contests/3) của [AIVIVN](https://www.aivivn.com/), một nền tảng giúp tổ chức các cuộc thi machine learning cho cộng đồng học sinh, sinh viên Việt Nam.

Thách thức đặt ra cho các đội là phải thêm dấu vào cho 8240 dòng tiếng Việt không dấu trong tập dữ liệu kiểm tra, mỗi dòng có thể là một câu hoặc một đoạn văn.

Trong bài viết này, mình sẽ giới thiệu tới các bạn một phương pháp đơn giản để giải quyết bài toàn này, đó là ứng dụng Machine Translation vào quá trình thêm dấu.
# Giới thiệu về Machine Translation
Machine Translation là nhiệm vụ dịch một câu **x** ở một ngôn ngữ(ngôn ngữ nguồn) thành một câu **y** ở một ngôn ngữ khác(ngôn ngữ đích) mà ý nghĩa của câu không đổi.

Các hệ thống machine translation được bắt đầu nghiên cứu từ năm 1954. Trước đây, người ta giải quyết bài toán này dựa trên thống kê là chủ yếu, gọi là Statistical Machine Translation. Vài năm trở lại đây, với sự phát triển vượt bậc của các kĩ thuật học máy, Neural Machine Translation được đưa vào nghiên cứu và có những cải thiện vược bậc cho các hệ thống dịch máy. Đây là phương pháp dịch mà quá trình dịch được dựa trên 1 mạng neural duy nhất. Kiến trúc này được gọi là  sequence-to-sequence( seq2seq) do đầu vào và đâu ra đều là các sequence(khác với các bài toán phân loại, hồi quy thông thường). Các kiến trúc mạng thường được sử dụng là các kiến trúc mạng cho dữ liệu dạng time-series như RNN, LSTM,... Trong bài viết này chúng ta sẽ không đi sâu vào giải thích về Machine Translation nên bạn có thể tim hiểu chi tiết về Machine translation bạn tại [cs224n-2019-lecture08-nmt](http://web.stanford.edu/class/cs224n/slides/cs224n-2019-lecture08-nmt.pdf).
# Ứng dụng Machine Translation vào bài toán thêm dấu cho tiếng Việt
Trong phần này, mình sẽ lần lượt giới thiệu tới các bạn hướng tiếp cận machine translation như thế nào, cách thức chuẩn bị dữ liệu, mã hóa dữ liệu và đưa vào mô hình training.

Chúng ta sẽ cùng bắt đầu.
## Ứng dụng Machine Translation vào bài toán thêm dấu

Bài toán thêm dấu cho tiếng Việt được mình hiểu ở đây như một bài toán Sequence2Sequence, công việc được thực hiện tương tự như việc dịch từ một ngôn ngữ nguồn sang một ngôn ngữ đích(việc đọc dịch tiếng Việt không dấu còn mệt hơn cả đọc dịch tiếng Anh sang tiếng Việt)

Hiểu cơ bản là vậy, chúng ta bắt đầu thực hiện quá trình giải quyết bài toán.

## Chuẩn bị dữ liệu dữ liệu huấn luyện
Một đặc điểm khá thú vị của bài toán này là chúng ta hoàn toàn có thể chủ động trong việc chuẩn bị dữ liệu huấn luyện, không mất quá nhiều công cho việc chuẩn bị và không phải mất công để gán nhãn cho chúng. Dữ liệu huấn luyện được sinh ra từ chính những văn bản thông thường trong tự nhiên, đầu vào là văn bản đã được xóa dấu, đầu ra của mô hình chính là văn bản gốc ban đầu( có dấu).

Trong bài hướng dấn này, mình sẽ sử dụng dữ liệu huấn luyện lấy từ [Wikipedia](https://vi.wikipedia.org/wiki/Trang_Ch%C3%ADnh) của Việt Nam. Dữ liệu đã được kéo xuống lưu trữ theo chu kì 2 tuần 1 lần tại [Wikimedia Downloads](https://dumps.wikimedia.org/viwiki). Chọn tải về tệp **viwiki-yyyymmdd-pages-articles.xml.bz2** chứa nội dung của các bài viết và giải nén bằng cách sử dụng [WikiExtractor](https://github.com/attardi/wikiextractor).

```
python WikiExtractor.py <path to XML wiki dump file> --processes 4 -o ./output/ --json
```

Sau khi giải nén dữ liệu tải về từ [Wikimedia Downloads](https://dumps.wikimedia.org/viwiki), ta thu được 1 một tập hợp các file được lưu trữ dưới dạng jsonline(mỗi dòng trong file là một bài viết). Định dạng được lưu trữ là:

```
{"id": "", "revid": "", "url":"", "title": "", "text": "..."}
```
Tất cả được lưu trữ trong thư mục output.

Nhiệm vụ của chúng ta bây giờ là từ những bài viết đó, tách ra thành các câu và lưu trữ thành file **train_data.txt**. Trong đó, mỗi dòng trong file **train_data.txt** là một câu.

```python
PATH_DATA = "./output"

alphabet = '^[ _abcdefghijklmnopqrstuvwxyz0123456789áàảãạâấầẩẫậăắằẳẵặóòỏõọôốồổỗộơớờởỡợéèẻẽẹêếềểễệúùủũụưứừửữựíìỉĩịýỳỷỹỵđ!\"\',\-\.:;?_\(\)]+$'

list_sub_folder = os.listdir(PATH_DATA)

for sub_folder in (list_sub_folder):
    path_sub_folder = os.path.join(PATH_DATA, sub_folder)
    
    list_file = os.listdir(path_sub_folder)
    
    for file in tqdm(list_file):
        with open(os.path.join(path_sub_folder, file), "r") as f_r:
            contents = f_r.read()
            contents = re.sub("(\s)+", r"\1", contents)
            contents = contents.split("\n")
            for content in contents:
                try:
                    content = eval(content)
                except:
                    continue
                lines = content["text"].split("\n")
                with open("./train_data.txt", "a") as f_w:
                    for line in lines[1:]:
                        if len(line.split()) > 2 and re.match(alphabet, line.lower()):
                            f_w.write(line + "\n")
```

Trong đoạn code trên, ta đã tiến hành vào đọc từng file được lưu trữ tại thư mục **output**, lấy ra mỗi object json trong từng file bằng việc phân tách bởi ký tự xuống dòng. Với mỗi object, lấy ra giá trị của trường **text**, phân tách câu bởi các ký tự **\n** tiếp và kiểm tra tính phù hợp của câu và lưu trong file **train_data.txt**. Một câu được cho là phù hợp được mình định nghĩa là câu có cấu thành bởi nhiều hơn 2 từ và việc **re.match(alphabet, line.lower()** khẳng định câu này chỉ được tạo bởi các ký tự trong bảng chữ cái tiếng Việt.
# Generate dữ liệu huấn luyện và training
Sau khi đã có dữ liệu cho quá trình training, chúng ta bắt đầu ngay với quá trình đưa dữ liệu vào mô hình và huấn luyện.

Ta import một vài  thư viện cần thiết.

```python
import re
import unidecode
import itertools
from nltk import ngrams
import string
import numpy as np
from tqdm import tqdm
```

Dữ liệu ở bước trước ta thực hiện lưu trong file **train_data.txt** được đọc trở lại thành danh sách các câu.

```python
with open("./train_data.txt", "r") as f_r:
    lines = f_r.read().split("\n")
    
print(len(lines))
```

Số câu mình có thế thấy ở đây là **2406450** câu.

Chúng ta hoàn toàn có thể lấy input của mô hình là những câu này. Tuy nhiên, việc sử dụng Deep learning với kiến trúc xây dựng dựa trên các mạng hồi quy LSTM, việc sử dụng quá nhiều step sẽ khiến mô hình tính toán cho huấn luyện và dự đoán cực kì chậm.

Về mặt tự nhiên, chúng ta cũng không cần thiết phải đọc cả câu rồi mới biết cách thêm dấu cho từng từ, chỉ cần dựa vào một vài từ ngữ cảnh trong câu mình đã có thể điền dấu cho nó. Do vậy, mình cài đặt mô hình với đầu vào là 5-gram sinh ra từ câu( 5 token liên tiếp tạo thành). Trong tiếng Việt, ngoài từ *nghiêng* được tạo thành từ 7 chữ cái, tất cả các từ khác đều được tạo lên từ tối đa 6 chữ cái. Do vậy, độ dài tối đa của đầu vào được mình cho là $6*5 = 30$ step.
```python
MAXLEN = 30
NGRAM = 5
BATCH_SIZE = 1024
```

Chúng ta xây dựng hàm **remove_accent** để xóa dấu cho một câu đầu vào.

```python
def remove_accent(text):
    return unidecode.unidecode(text)
```
> Input: Chúng ta xây dựng hàm remove_accent để xóa dấu cho một câu đầu vào.
> 
> Output: Chung ta xay dung ham remove_accent de xoa dau cho mot cau dau vao.


Mỗi câu cũng được tách ra thành các phrases, trong đó các phrases được tách nhau bởi các dấu, kí hiệu do việc xác định dấu của từng từ trong một phrases không cần dựa vào các từ trong phrases khác.

```python
def extract_phrases(text):
    return re.findall(r'\w[\w ]+', text)
```
> Input: Mỗi câu cũng được tách ra thành các phrases, trong đó các phrases được tách nhau bởi các dấu, kí hiệu do việc xác định dấu của từng từ trong một phrases không cần dựa vào các từ trong phrases khác.
> 
> Output: \['Mỗi câu cũng được tách ra thành các phrases',
>  'trong đó các phrases được tách nhau bởi các dấu',
 > 'kí hiệu do việc xác định dấu của từng từ trong một phrases không cần dựa vào các từ trong phrases khác']

Tiến hành tách các phrases cho toàn bộ dữ liệu, các phrases có ít hơn 2 token sẽ bị loại bỏ cho quá trình huấn luyện.

```python
phrases = itertools.chain.from_iterable(extract_phrases(text) for text in lines)
phrases = [p.strip() for p in phrases if len(p.split()) > 1]
```

Chúng ta sử dụng hàm **ngrams** của thư viện **nltk** để thực hiện việc sinh 5-grams một cách đơn giản. Các 5-grams được lưu trữ trong **list_ngrams**.

```python
def gen_ngrams(words, n=5):
    return ngrams(words.split(), n)
    
list_ngrams = []
for p in tqdm(phrases):
  if not re.match(alphabet, p.lower()):
    continue
  for ngr in gen_ngrams(p, NGRAM):
    if len(" ".join(ngr)) < 32:
      list_ngrams.append(" ".join(ngr))
del phrases
list_ngrams = list(set(list_ngrams))
```
Ví dụ: Input phrases: Chúng ta sẽ làm việc trong hôm nay
> Output:
> 
> ('Chúng', 'ta', 'sẽ', 'làm', 'việc')
> 
> ('ta', 'sẽ', 'làm', 'việc', 'trong')
> 
> ('sẽ', 'làm', 'việc', 'trong', 'hôm')
> 
> ('làm', 'việc', 'trong', 'hôm', 'nay')

```python
list_ngrams = []

for p in tqdm(phrases):
  for ngr in gen_ngrams(p, NGRAM):
    if len(" ".join(ngr)) < 30:
      list_ngrams.append(" ".join(ngr))
del phrases
list_ngrams = list(set(list_ngrams))
```
Tiếp theo, ta định nghĩa lại bảng chữ cái tiếng Việt và lưu trữ trong biến **alphabet** chính là đầu ra mong muốn tại mỗi step của mô hình.
```python
accented_chars_vietnamese = [
    'á', 'à', 'ả', 'ã', 'ạ', 'â', 'ấ', 'ầ', 'ẩ', 'ẫ', 'ậ', 'ă', 'ắ', 'ằ', 'ẳ', 'ẵ', 'ặ',
    'ó', 'ò', 'ỏ', 'õ', 'ọ', 'ô', 'ố', 'ồ', 'ổ', 'ỗ', 'ộ', 'ơ', 'ớ', 'ờ', 'ở', 'ỡ', 'ợ',
    'é', 'è', 'ẻ', 'ẽ', 'ẹ', 'ê', 'ế', 'ề', 'ể', 'ễ', 'ệ',
    'ú', 'ù', 'ủ', 'ũ', 'ụ', 'ư', 'ứ', 'ừ', 'ử', 'ữ', 'ự',
    'í', 'ì', 'ỉ', 'ĩ', 'ị',
    'ý', 'ỳ', 'ỷ', 'ỹ', 'ỵ',
    'đ',
]
accented_chars_vietnamese.extend([c.upper() for c in accented_chars_vietnamese])
alphabet = list(('\x00 _' + string.ascii_letters + string.digits + ''.join(accented_chars_vietnamese)))
```

Trong đó, giá trị **\x00** được thêm vào như một blank token, padding thêm vào cho các input đủ 30 kí tự(do đầu vào của mô hình là cố định).

Tiếp theo, chúng ta xây dựng 2 hàm **encode** có vai trò chuyển một đoạn text đầu vào thành một ma trận đầu ra theo kiểu [One hot vector](https://en.wikipedia.org/wiki/One-hot) cho kí tự và **decode** giúp giải mã từ ma trận encode về dạng text ban đầu. Ma trận đầu ra từ hàm **encode** có kích thước $maxlen*len(alphabet)$ chính là đầu vào cho mô hình.

```python
def encode(text, maxlen=MAXLEN):
        text = "\x00" + text
        x = np.zeros((maxlen, len(alphabet)))
        for i, c in enumerate(text[:maxlen]):
            x[i, alphabet.index(c)] = 1
        if i < maxlen - 1:
          for j in range(i+1, maxlen):
            x[j, 0] = 1
        return x

def decode(x, calc_argmax=True):
    if calc_argmax:
        x = x.argmax(axis=-1)
    return ''.join(alphabet[i] for i in x)
```

Dữ liệu đã được mã hóa sẵn sàng đưa vào trong mô hình. Chúng ta tiến hành xây dựng kiến trúc của mô hình.

```python
from keras.models import Sequential
from keras.layers import Activation, TimeDistributed, Dense, RepeatVector, recurrent, LSTM, Bidirectional
from keras.callbacks import Callback, EarlyStopping, ModelCheckpoint
from keras.optimizers import Adam

HIDDEN_SIZE = 256

model = Sequential()
model.add(LSTM(HIDDEN_SIZE, input_shape=(MAXLEN, len(alphabet)), return_sequences=True))
model.add(Bidirectional(LSTM(HIDDEN_SIZE, return_sequences=True, dropout=0.25, recurrent_dropout=0.1)))
model.add(TimeDistributed(Dense(len(alphabet))))
model.add(Activation('softmax'))

model.compile(loss='categorical_crossentropy',
              optimizer=Adam(lr=0.001),
              metrics=['accuracy'])

model.summary()
```

Mô hình được thiết kế cực kì đơn giản với hơn 1,6 triệu tham số. Bạn có thể tùy chỉnh mô hình này để hy vọng kết quả sẽ cho ra với độ chính xác tốt hơn. Chi tiết về mô hình:

```python
Layer (type)                 Output Shape              Param #   
=================================================================
lstm_1 (LSTM)                (None, 30, 256)           466944    
_________________________________________________________________
bidirectional_1 (Bidirection (None, 30, 512)           1050624   
_________________________________________________________________
time_distributed_1 (TimeDist (None, 30, 199)           102087    
_________________________________________________________________
activation_1 (Activation)    (None, 30, 199)           0         
=================================================================
Total params: 1,619,655
Trainable params: 1,619,655
Non-trainable params: 0
```

Tính đến thời điểm hiện tại, chúng ta đã có danh sách các 5-grams được lưu trữ trong **list_ngrams**. Chúng ta tiến hành chia list này thành 2 tập con phục vụ cho quá trình huấn luyện và validate mô hình.

```python
from sklearn.model_selection import train_test_split

train_data, valid_data = train_test_split(list_ngrams, test_size=0.2, random_state=2019)
```

Cuối cùng, dữ liệu sẽ được **encode** để đưa vào mô hình. Tuy nhiện, số lượng dữ liệu là khác lớn nên ta không thể đưa hết chúng và mô hình cùng một lúc. Cần chia thành các Batch và đưa vào mô hình một cách từ từ, điều này sẽ giúp việc huấn luyện mô hình của bạn không gặp phải sự cố về bộ nhớ do phải encode quá nhiều dữ liệu cùng lúc. Chúng ta viết hàm **generate_data** để thực hiện điều này. Tại mỗi bước, số số lượng sample bằng batch_size được encode để đưa vào mô hình.

```python
def generate_data(data, batch_size=128):
    cur_index = 0
    while True:
        
        x, y = [], []
        for i in range(batch_size):  
            y.append(encode(data[cur_index]))
            x.append(encode(unidecode.unidecode(data[cur_index])))
            cur_index += 1
            
            if cur_index > len(data)-1:
                cur_index = 0
        
        yield np.array(x), np.array(y)
    
```
Cuối cùng, chúng ta tiến hành huấn luyện mô hình. Tại mỗi epoch, mô hình tốt nhất tính tới thời điểm đó được lưu trữ bằng việc sử dụng **ModelCheckpoint**, **EarlyStopping** được sử dụng cho việc dừng học sớm nếu quá trình học không giúp cải thiện độ chính xác của mô hình sau 2 epoch.
```python
train_generator = generate_data(train_data, batch_size=BATCH_SIZE)
validation_generator = generate_data(valid_data, batch_size=BATCH_SIZE)

checkpointer = ModelCheckpoint(filepath=os.path.join('./model_{val_loss:.4f}_{val_acc:.4f}.h5'), save_best_only=True, verbose=1)
early = EarlyStopping(patience=2, verbose=1)

model.fit_generator(train_generator, steps_per_epoch=len(train_data)//BATCH_SIZE, epochs=10,
                    validation_data=validation_generator, validation_steps=len(valid_data)//BATCH_SIZE,
                    callbacks=[checkpointer, early])
```
Sau 2 epoch đầu, độ chính xác của mô hình đã cao đáng kể nên mình quyết định dừng lại vì thời gian huấn luyện mô hình hơi lâu.

```python
Epoch 1/10
31812/31812 [==============================] - 5731s 344ms/step - loss: 0.0878 - acc: 0.9732 - val_loss: 0.0515 - val_acc: 0.9835

Epoch 00001: val_loss improved from inf to 0.05151, saving model to ./model_0.0515_0.9835.h5
Epoch 2/10
31812/31812 [==============================] - 5689s 342ms/step - loss: 0.0532 - acc: 0.9829 - val_loss: 0.0453 - val_acc: 0.9854

Epoch 00002: val_loss improved from 0.05151 to 0.04527, saving model to ./model_0.0453_0.9854.h5
```

Mình thử sử dụng mô hình đã được **checkpointer** lưu lại xem có gì hư cấu không. Xây dựng các hàm cần thiết cho quá trình dự đoán.
```python
from collections import Counter
from keras.models import load_model
model = load_model("./model_0.0453_0.9854.h5")

def extract_phrases(text):
    pattern = r'\w[\w ]*|\s\W+|\W+'
    return re.findall(pattern, text)

def guess(ngram):
    text = ' '.join(ngram)
    preds = model.predict(np.array([encode(text)]), verbose=0)
    return decode(preds[0], calc_argmax=True).strip('\x00')


def add_accent(text):
    ngrams = list(gen_ngrams(text.lower(), n=NGRAM))
    guessed_ngrams = list(guess(ngram) for ngram in ngrams)
    candidates = [Counter() for _ in range(len(guessed_ngrams) + NGRAM - 1)]
    for nid, ngram in enumerate(guessed_ngrams):
        for wid, word in enumerate(re.split(' +', ngram)):
            candidates[nid + wid].update([word])
    output = ' '.join(c.most_common(1)[0][0] for c in candidates)
    return output

def accent_sentence(sentence):
  list_phrases = extract_phrases(sentence)
  output = ""
  for phrases in list_phrases:
    if len(phrases.split()) < 2 or not re.match("\w[\w ]+", phrases):
      output += phrases
    else:
      output += add_accent(phrases)
      if phrases[-1] == " ":
        output += " "
  return output
```

```python
text = '''Trung Quoc da mo rong anh huong cua ho trong khu vuc thong qua cac buoc leo thang ep buoc cac nuoc lang gieng o Hoa Dong, Bien Dong, boi dap dao nhan tao va quan su hoa cac cau truc dia ly tren Bien Dong trai luat phap quoc te; Tim cach chia re Hoa Ky khoi cac dong minh chau A thong qua cac no luc ep buoc va leo lai kinh te'''
print((accent_sentence(text)))
```
Kết quả mà mình thu được:
```python
"Trung Quốc đã mở rộng ảnh hưởng của họ trong khu vực thông qua các bước leo thang ép buộc các nước láng giềng ở Hoa Đông, Biển Đông, bởi đắp đảo nhân tạo và quân sự hóa các cấu trúc địa lý trên Biển Đông trái luật pháp quốc tế; Tìm cách chia rẽ Hoa Kỳ khỏi các đồng minh châu Á thông qua các nỗ lực ép buộc và leo lại kinh tế"
```
Nhận thấy kết quả trả về khá tốt, vẫn còn một vài từ chỗ sai nhiều như:

```python
print(accent_sentence("cái nha rung lac vi anh em ba con nhay ram ram nhu muon sap."))
Output: "cái nhà rừng lắc vì anh em bà con nhảy rầm rầm như muốn sắp."
```

# Submit results
Sau khi đã dự đoán dấu cho 8240 file **test.txt**, chúng ta tiến hành tạo file **submit.csv** phù hợp để submit lên hệ thống của AIVIVN để kiểm tra kết quả(do quá trình chuẩn bị dữ liệu test của ban tổ chức có chút lỗi nên mình phải tự làm lại quá trình này). 

Mình tạo file **submit.csv** dựa vào file **test_word_per_line.txt** do ban tổ chức cung cấp.

```python
from unicodedata import normalize
import pandas as pd

alphabet = 'abcdefghijklmnopqrstuvwxyzáàảãạâấầẩẫậăắằẳẵặóòỏõọôốồổỗộơớờởỡợéèẻẽẹêếềểễệúùủũụưứừửữựíìỉĩịýỳỷỹỵđ'
pattern = '[^ ' +alphabet + alphabet.upper() + ']+'

def utils(word):
    word = str(normalize("NFD", word).encode("utf-8"))[2:-1]
    
    word = re.sub(r"\\xcc\\x81", "1", word)
    word = re.sub(r"\\xcc\\x80", "2", word)
    word = re.sub(r"\\xcc\\x89", "3", word)
    word = re.sub(r"\\xcc\\x83", "4", word)
    word = re.sub(r"\\xcc\\xa3", "5", word)
    
    word = re.sub(r"\\xcc\\x82", "6", word)
    word = re.sub(r"\\xcc\\x9b", "7", word)
    word = re.sub(r"\\xcc\\x86", "8", word)
    word = re.sub(r"\\xc4\\x91", "d9", word)
    word = re.sub(r"\\xc4\\x90", "D9", word)
    
    output = re.sub("[a-zA-Z]+", "", word)
    if output == "":
        return "0"
    dau = re.findall('[1-5]', output)
    
    if len(dau) > 0:   
        output = output.replace(dau[0], "") + dau[0]
    return output

with open("./output_test.txt", "r") as f_r:
    data_test = f_r.read().split("\n")
test = {}
for d in data_test[:-1]:
    test[d.split(",", 1)[0]] = re.sub("\s+", " ", re.sub(pattern, " ", d.split(",", 1)[1])).split()

tokens = pd.read_csv("./test_word_per_line.txt")

words = [(token[:-3], (token[-3:])) for token in tokens["id"]]

list_id = []
results = []

for word in words:
    id_word = word[0] + word[1]
    w = test[word[0]][int(word[1])]
    list_id.append(id_word)

    results.append(utils(w))
 
df = pd.DataFrame(columns=["id", "label"])

df["id"] = list_id
df["label"] = results

df.to_csv("submit.csv")
 ```
Mình có thử sử dụng mô hình này để submit kết quả lên cuộc thi [AIVIVN challenge 3](https://www.aivivn.com/contests/3) và kết quả đạt được trên tập dữ liệu kiểm tra đạt 93.693%.

Hiện tại, cuộc thi vẫn đang diễn ra và thời hạn cho lần submit cuối cùng là hết ngày  29/7/2019 tức là vẫn còn hơn 2 tháng nữa. Hy vọng bài viết này của mình sẽ cung cấp cho các bạn một hướng dẫn cơ bản giúp các bạn có thể dễ dàng thử nghiệm với bài toán này. Bạn có thể thử nghiệm thay đổi các kiến trúc mạng khác nhau, các bước tiền xử lý, hậu xử lý để có kết quả tốt hơn. Và việc mình sử dụng dữ liệu từ Wikipedia cũng có ảnh hướng ít nhiều đến kết quả trên hệ thống do domain của dữ liệu không giống nhau, dữ liệu cũng chưa đủ tổng quát, các bạn có thể huấn luyện mô hình trên các tập dữ liệu khác hay trên chính tập dữ liệu ban tổ chức cung cấp. Chúc các bạn thành công.

Cảm ơn các bạn vì đã đọc bài.