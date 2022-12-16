Chắc mọi người cũng không ngạc nhiên khi có người nhắc đến Machine Learning trong thời gian gần đây, đó là bởi sự phát triển nhanh chóng cũng như ứng dụng của nó trong cuộc sống của con người. Và chắc hẳn mọi người cũng thắc mắc rằng những thuật toán trong Machine Learning được xây dựng như thế nào, nó có gì khác biệt với những thuật toán thông thường. Vì vậy, trong bài này, chúng ta sẽ cùng nhau tiếp cận và xây dựng một số thuật toán khác nhau trong Machine Learning để giải quyết bài toán *Phân loại văn bản tiếng Việt* để hiểu rõ hơn về Machine Learning là và làm như thế nào. <br>

# Giới thiệu
Mục tiêu của một hệ thống phân loại văn bản là nó có thể tự động phân loại một văn bản cho trước, để xác định xem văn bản đó thuộc thể loại nào. Một số ứng dụng của hệ thống phân loại như:
* Hiểu được ý nghĩa, đánh giá, bình luận của người dùng từ mạng xã hội.
* Phân loại emails là *spam* hay *không spam*.
* Tự động gắn thẻ cho những truy vấn, tìm kiếm của người dùng.
* Phân loại các bài báo điện tử.

Bài toán *phân loại văn bản* là một bài toán học giám sát (supervised learning) trong học máy (machine learning), bởi vì nội dung của văn bản đã được gán nhãn, và được sử dụng để thực hiện phân loại. Để giải quyết một bài toán phân loại văn bản, ta thực hiện 4 bước:
1. Chuẩn bị dữ liệu (Dataset Preparation)
2. Xử lý thuộc tính của dữ liệu (Feature Engineering)
3. Xây dựng mô hình (Build Model)
4. Tinh chỉnh mô hình và cải thiện hiệu năng (Improve Performance)

Trong bài viết này, chúng ta sẽ cùng nhau xây dựng mô hình phân loại văn bản cho các bài báo tiếng Việt. Link project đầy đủ tại [đây](https://github.com/thanhhau097/Natual-Language-Processing/tree/master/Text\ Classifier)

# Bài toán 
Phân loại bài báo tiếng Việt vào để xác định bài báo đó thuộc thể loại nào trong 10 thể loại:
* Chính trị xã hội
* Đời sống
* Khoa học
* Kinh doanh
* Pháp luật
* Sức khoẻ
* Thế giới 
* Thể thao
* Văn hoá
* Vi tính 

# Tiền xử lý dữ liệu (Preprocessing Data)
Bộ dữ liệu mà chúng ta sử dụng được tải tại: https://github.com/duyvuleo/VNTC

Chúng ta cùng thử đọc một bài báo mẫu:
> Thủ tướng Đức nhận lời tham dự lễ kỷ niệm D-Day
Thủ tướng Gerhard Schroeder sẽ trở thành nguyên thủ Đức đầu tiên tham dự lễ kỷ niệm ngày quân đồng minh đổ bộ lên bãi biển Normandy trong Thế chiến II (mang mật danh D-Day) vào tháng 6 tới. Ông đã chấp nhận lời mời tham gia lễ kỷ niệm 60 năm ngày D-Day của Tổng thống Pháp Jacque Chirac.
Phát ngôn viên của Berlin cho biết: "Tổng thống Chirac đã mời Thủ tướng Schroeder từ trước lễ Giáng sinh và ông đã nhận lời ngay. Thủ tướng cảm thấy rất vui khi được mời". Năm 1994, cố tổng thống Pháp Francois Mitterrand đã không mời cựu thủ tướng Đức Helmut Kohl đến dự lễ kỷ niệm 50 năm sự kiện D-Day. 
Giới chức Pháp tuyên bố rằng, việc mời thủ tướng Schroeder tham dự lễ kỷ niệm 60 năm sự kiện D-Day là một hành động mang tính biểu tượng nhằm củng cố bầu không khí hòa bình lâu dài giữa hai nước. Pháp và Đức hy vọng từ đây họ có thể chôn vùi những hận thù quá khứ từng đẩy hai nước lâm vào 2 cuộc đại chiến trong thế kỷ trước.
Đúng 1h30' sáng 6/6/1944, Mỹ và Anh bất ngờ cho quân đổ bộ lên bãi biển Normandy để giải phóng Pháp khỏi sự chiếm đóng của phát xít Đức, mở mặt trận thứ hai ở Tây Âu. Cuộc hành quân lịch sử vào giai đoạn cuối của Thế chiến II này đã góp phần cùng Hồng quân Liên Xô, đang tổng tiến công quân Đức ở mặt trận Đông Âu, tiêu diệt đế chế của Hitler. Hàng năm cứ đến ngày 6/6, các cựu chiến binh và chính trị gia đến từ những nước có binh sĩ tham gia cuộc đổ bộ năm 1944 lại tập trung tại bãi biển Normandy để làm lễ kỷ niệm. 
Khi diễn ra sự kiện D-Day, Thủ tướng Gerhard Schroeder mới được 2 tháng tuổi (ông sinh ngày 7/4/1944). Nhà lãnh đạo Đức không bao giờ biết mặt cha mình vì ông đã bỏ mạng lúc đang tham chiến ở Romania không lâu sau khi Schroeder chào đời.

Đây là bài báo thuộc thể loại **Thế giới**. Điều mà chúng ta thắc mắc ở đây là, từ một văn bản như thế này, làm sao để máy tính có thể hiểu được văn bản để phân loại nó? Câu trả lời là: Máy tính chỉ có thể hiểu được dữ liệu ở dạng số, vì vậy chúng ta cần phải chuyển dữ liệu ở dạng ký tự về dữ liệu dạng số, sau đó chúng ta sẽ sử dụng dữ liệu dạng số này để huấn luyện cho máy tính phân loại các văn bản.

## Chuẩn bị dữ liệu
Trước hết, chúng ta cần phải loại bỏ những ký tự đặc biệt trong văn bản ban đầu như dấu chấm, dấu phẩy, dấu mở đóng ngoặc,... bằng cách sử dụng thư viện *gensim*. Sau đó chúng ta sẽ sử dụng thư viện *PyVi* để tách từ tiếng Việt. Một điểm đặc biệt trong văn bản tiếng Việt đó là một từ có thể được kết hợp bởi nhiều tiếng khác nhau, ví dụ như: sử_dụng, bắt_đầu,... khác với tiếng Anh và một số ngôn ngữ khác, các từ được phân cách nhau bằng khoảng trắng: use some examples, i love you... Vì vậy chúng ta cần tách từ để có thể đảm bảo ý nghĩa của từ được toàn vẹn.

Chúng ta sẽ *import* các thư viện cần thiết để xử lý dữ liệu:
```python 
from pyvi import ViTokenizer, ViPosTagger # thư viện NLP tiếng Việt
from tqdm import tqdm
import numpy as np
import gensim # thư viện NLP
```

Chúng ta sẽ đưa mỗi bài báo về một cặp *(x, y)*. Trong đó, *x* là văn bản đã được xử lý, *y* là nhãn/thể loại của bài báo đó. Chi tiết được thực hiện như sau:
```python
import os 
dir_path = os.path.dirname(os.path.realpath(os.getcwd()))
dir_path = os.path.join(dir_path, 'Data')

def get_data(folder_path):
    X = []
    y = []
    dirs = os.listdir(folder_path)
    for path in tqdm(dirs):
        file_paths = os.listdir(os.path.join(folder_path, path))
        for file_path in tqdm(file_paths):
            with open(os.path.join(folder_path, path, file_path), 'r', encoding="utf-16") as f:
                lines = f.readlines()
                lines = ' '.join(lines)
                lines = gensim.utils.simple_preprocess(lines)
                lines = ' '.join(lines)
                lines = ViTokenizer.tokenize(lines)

                X.append(lines)
                y.append(path)

    return X, y

train_path = os.path.join(dir_path, 'VNTC-master/Data/10Topics/Ver1.1/Train_Full')
X_data, y_data = get_data(train_path)
```

Dòng lệnh ``lines = gensim.utils.simple_preprocess(lines)`` dùng để xử lý xoá các ký tự đặc biệt.
Dòng lệnh ``lines = ViTokenizer.tokenize(lines)`` dùng để tách từ trong văn bản tiếng Việt.

Kết quả thu được của một văn bản đã được xử lý có dạng như sau:
> thủ_tướng đức nhận_lời tham_dự lễ kỷ_niệm day thủ_tướng gerhard schroeder sẽ trở_thành nguyên_thủ đức đầu_tiên tham_dự lễ kỷ_niệm ngày quân đồng_minh đổ_bộ lên bãi biển normandy trong thế_chiến ii mang mật_danh day vào tháng tới ông đã chấp_nhận lời mời tham_gia lễ kỷ_niệm năm ngày day của tổng_thống pháp jacque chirac phát_ngôn_viên của berlin cho biết tổng_thống chirac đã mời thủ_tướng schroeder từ trước lễ giáng_sinh và ông đã nhận_lời ngay thủ_tướng cảm_thấy rất vui khi được mời năm cố tổng_thống pháp francois mitterrand đã không mời cựu_thủ_tướng đức helmut kohl đến dự lễ kỷ_niệm năm sự_kiện day giới_chức pháp tuyên_bố rằng việc mời thủ_tướng schroeder tham_dự lễ kỷ_niệm năm sự_kiện day là một hành_động mang tính biểu_tượng nhằm củng_cố bầu không_khí hòa_bình lâu_dài giữa hai nước pháp và đức hy_vọng từ đây họ có_thể chôn vùi những hận_thù quá_khứ từng đẩy hai nước lâm vào_cuộc đại_chiến trong thế_kỷ trước đúng sáng mỹ và anh bất_ngờ cho quân đổ_bộ lên bãi biển normandy để giải_phóng pháp khỏi sự chiếm_đóng của phát_xít đức mở_mặt_trận thứ hai tây âu cuộc hành_quân lịch_sử vào giai_đoạn cuối của thế_chiến ii này đã góp_phần cùng hồng_quân liên xô đang tổng tiến_công quân đức mặt_trận đông âu tiêu_diệt đế_chế của hitler hàng năm cứ đến ngày các cựu_chiến_binh và chính_trị_gia đến từ những nước có binh_sĩ tham_gia cuộc đổ_bộ năm lại tập_trung tại bãi biển normandy để làm lễ kỷ_niệm khi diễn ra sự_kiện day thủ_tướng gerhard schroeder mới được tháng tuổi ông sinh ngày nhà lãnh_đạo_đức không bao_giờ biết mặt cha mình vì ông đã bỏ_mạng lúc đang tham_chiến romania không lâu sau khi schroeder chào_đời

Để tiện sử dụng cho việc sử dụng lại dữ liệu đã được xử lý, các bạn có thể lưu dữ liệu lại vào file *.pkl*:
```
import pickle

pickle.dump(X_data, open('data/X_data.pkl', 'wb'))
pickle.dump(y_data, open('data/y_data.pkl', 'wb'))
```

Chúng ta cũng xử lý tương tự với dữ liệu *test*:
```
test_path = os.path.join(dir_path, 'VNTC-master/Data/10Topics/Ver1.1/Test_Full')
X_test, y_test = get_data(test_path)

pickle.dump(X_test, open('data/X_test.pkl', 'wb'))
pickle.dump(y_test, open('data/y_test.pkl', 'wb'))
```

## Feature Engineering
Ở bước này, chúng ta sẽ đưa dữ liệu dạng văn bản đã được xử lý về dạng vector thuộc tính có dạng số học. Có nhiều các khác nhau để đưa dữ liệu văn bản dạng *text* về dữ liệu dạng số mà chúng ta có thể thực hiện như:
1. Count Vectors as features
2. TF-IDF Vectors as features
    *  Word level
    *  N-Gram level
    *  Character level
3. Word Embeddings as features
4. Text / NLP based features
5. Topic Models as features

Chúng ta sẽ cùng nhau thực hiện các phương pháp này. Đầu tiên, bạn cần load dữ liệu mà đã được lưu ở file *.pkl* ở trên:
```python
import pickle

X_data = pickle.load(open('data/X_data.pkl', 'rb'))
y_data = pickle.load(open('data/y_data.pkl', 'rb'))

X_test = pickle.load(open('data/X_test.pkl', 'rb'))
y_test = pickle.load(open('data/y_test.pkl', 'rb'))
```

### Count Vectors as features
Khi sử dụng phương pháp này, chúng ta sẽ thu được một ma trận mà trong đó, mỗi hàng sẽ đại diện cho một văn bản, mỗi cột đại diện cho một từ có trong từ điển, và mỗi ô (cell) sẽ chứa tần suất xuất hiện của từ trong văn bản tương ứng. Bằng cách sử dụng thư viện *sklearn*, chúng ta sẽ làm như sau:
```python
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer


# create a count vectorizer object 
count_vect = CountVectorizer(analyzer='word', token_pattern=r'\w{1,}')
count_vect.fit(X_data)

# transform the training and validation data using count vectorizer object
X_data_count = count_vect.transform(X_data)
X_test_count = count_vect.transform(X_test)
```

### Tf-Idf Vectors as Features
Có thể mọi người đã từng nghe đến phương pháp TF-IDF (Term Frequency - Inverse Document Frequency), đây là một phương pháp cực kì phổ biến trong xử lý văn bản. Nó được tính theo công thức dưới đây:
* TF(t) = (Number of times term t appears in a document) / (Total number of terms in the document)
* IDF(t) = log_e(Total number of documents / Number of documents with term t in it)

Chúng ta có thể thực hiện TF-IDF cho các cấp độ khác nhau của văn bản như sau:
a. Word Level TF-IDF : Thực hiện tính toán dựa trên mỗi thành phần là một từ riêng lẻ. 
```
# word level - we choose max number of words equal to 30000 except all words (100k+ words)
tfidf_vect = TfidfVectorizer(analyzer='word', max_features=30000)
tfidf_vect.fit(X_data) # learn vocabulary and idf from training set
X_data_tfidf =  tfidf_vect.transform(X_data)
# assume that we don't have test set before
X_test_tfidf =  tfidf_vect.transform(X_test)
```

b. N-gram Level TF-IDF : Kết hợp *n* thành phần (từ) liên tiếp nhau. Ví dụ: "thủ_tướng đức nhận_lời tham_dự lễ kỷ_niệm". Khi đó, 2-gram cho ta kết quả: {thủ_tướng đức, đức nhận_lời, nhận_lời tham_dự, tham_dự lễ , lễ kỷ_niệm}. Mõi phần từ là cặp 2 từ liên tiếp nhau.
```
# ngram level - we choose max number of words equal to 30000 except all words (100k+ words)
tfidf_vect_ngram = TfidfVectorizer(analyzer='word', max_features=30000, ngram_range=(2, 3))
tfidf_vect_ngram.fit(X_data)
X_data_tfidf_ngram =  tfidf_vect_ngram.transform(X_data)
# assume that we don't have test set before
X_test_tfidf_ngram =  tfidf_vect_ngram.transform(X_test)
```

c. Character Level TF-IDF : Dựa trên n-gram của ký tự.
```
# ngram-char level - we choose max number of words equal to 30000 except all words (100k+ words)
tfidf_vect_ngram_char = TfidfVectorizer(analyzer='char', max_features=30000, ngram_range=(2, 3))
tfidf_vect_ngram_char.fit(X_data)
X_data_tfidf_ngram_char =  tfidf_vect_ngram_char.transform(X_data)
# assume that we don't have test set before
X_test_tfidf_ngram_char =  tfidf_vect_ngram_char.transform(X_test)
```

Sau khi thực hiện TF-IDF, chúng ta dễ dàng nhận thấy rằng, ma trận mà chúng ta thu được có kích thước rất lớn, và việc xử lý tính toán với ma trận này đòi hỏi thời gian và bộ nhớ khá tốn kém. Giả sử, chúng ta có 100.000 văn bản và bộ từ điển bao gồm 50000 từ, khi đó ma trận mà chúng ta thu được sẽ có kích thước là *100000 * 50000*. Giả sử mỗi phần tử được lưu dưới dạng *float32* - 4 byte, bộ nhớ mà chúng ta cần sử dụng là: 
$$100000 \times 50000 \times 4 = 20000000000\ byte$$ 

tức là chúng ta tốn tầm 18.63GB bộ nhớ, khó có thể lưu hết vào RAM để thực hiện tính toán. Trong thực tế, với số lượng văn bản khổng lồ và từ điển lên đến hàng trăm nghìn từ, bộ nhớ mà chúng ta sử dụng còn tốn kém hơn rất nhiều. Để xử lý vấn đề này, chúng ta sẽ sử dụng thuật toán SVD (singular value decomposition) nhằm mục đích giảm chiều dữ liệu của ma trận mà chúng ta thu được, mà vẫn giữ nguyên được các thuộc tính của ma trận gốc ban đầu. Các bạn có thể đọc thêm thuật toán SVD để hiểu rõ hơn cách mà thuật toán này thực hiện. Trong python, chúng ta thực hiện như sau:
#### Word Level
```python
from sklearn.decomposition import TruncatedSVD

svd = TruncatedSVD(n_components=300, random_state=42)
svd.fit(X_data_tfidf)


X_data_tfidf_svd = svd.transform(X_data_tfidf)
X_test_tfidf_svd = svd.transform(X_test_tfidf)
```

#### N-gram Level
```python
svd_ngram = TruncatedSVD(n_components=300, random_state=42)
svd_ngram.fit(X_data_tfidf_ngram)

X_data_tfidf_ngram_svd = svd_ngram.transform(X_data_tfidf_ngram)
X_test_tfidf_ngram_svd = svd_ngram.transform(X_test_tfidf_ngram)
```

#### N-gram Char Level
```python
svd_ngram_char = TruncatedSVD(n_components=300, random_state=42)
svd_ngram_char.fit(X_data_tfidf_ngram_char)

X_data_tfidf_ngram_char_svd = svd_ngram_char.transform(X_data_tfidf_ngram_char)
X_test_tfidf_ngram_char_svd = svd_ngram_char.transform(X_test_tfidf_ngram_char)
```

### Word Embeddings
Trong phương pháp này, chúng ta sẽ chuyển mỗi từ trong từ điển về một vector n chiều, bằng cách sử dụng thuật toán Bag-of-words. Bạn đọc có thể đọc thêm cách huấn luyện cho thuật toán này. Trong bài viết này, chúng ta sẽ sử dụng mô hình đã được huấn luyện sẵn cho tiếng Việt, các bạn có thể tải về tại đây: https://github.com/Kyubyong/wordvectors

Trong mô hình này, mỗi từ sẽ được biểu diễn bằng một vector 300 chiều. Từ đó chúng ta có thể sử dụng chúng cho các mô hình Deep Learning như Deep Neural Network, Recurrent Neural Networks, Convolutional Neural Networks để phân loại văn bản. Ở đây chúng ta sẽ tiếp tục sử dụng thư viện *gensim*:
```

from gensim.models import KeyedVectors 
dir_path = os.path.dirname(os.path.realpath(os.getcwd()))
word2vec_model_path = os.path.join(dir_path, "Data/vi/vi.vec")

w2v = KeyedVectors.load_word2vec_format(word2vec_model_path)
vocab = w2v.wv.vocab
wv = w2v.wv

def get_word2vec_data(X):
    word2vec_data = []
    for x in X:
        sentence = []
        for word in x.split(" "):
            if word in vocab:
                sentence.append(wv[word])

        word2vec_data.append(sentence)

    return word2vec_data

X_data_w2v = get_word2vec_data(X_data)
X_test_w2v = get_word2vec_data(X_test)
```

Như vậy, chúng ta đã thực hiện xong bước xử lý văn bản đầu vào. Do bài viết đã khá dài, nên việc xây dựng model cho bài toán sẽ được thực hiện trong bài viết tiếp theo. Cảm ơn các bạn đã đọc bài. Nhớ **UPVOTE** cho mình nếu cảm thấy bài viết hữu ích nhé!
Các bạn có thể đọc tiếp [phần 2](https://viblo.asia/p/phan-loai-van-ban-tu-dong-bang-machine-learning-nhu-the-nao-phan-2-4P856PqBZY3) của bài viết tại đây: https://viblo.asia/p/phan-loai-van-ban-tu-dong-bang-machine-learning-nhu-the-nao-phan-2-4P856PqBZY3