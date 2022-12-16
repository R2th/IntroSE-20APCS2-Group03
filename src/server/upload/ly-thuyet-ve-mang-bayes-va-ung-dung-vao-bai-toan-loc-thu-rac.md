# Máy tính đang học như thế nào?

![](https://images.viblo.asia/a46dadd9-eb79-40a0-bbfc-9d9d0f5a32e5.jpg)

Dạo gần đây mình đã có viết tương đối nhiều bài viết về việc sử dụng các thư viện, hàm có sẵn để có thể tiếp cận và tạo ra được những ứng dụng của Machine Learning theo những cách đơn giản nhất. Đối với mình, cách học/ tiếp cận (top-down) này là một phương pháp rất hiệu quả vì nó vừa giúp chúng ta cải thiện về lý thuyết, đồng thời giúp chúng ta luôn cảm thấy hứng thú, tò mò và tạo thêm động lực cho chúng ta trong việc tiếp tục nghiên cứu và tìm hiểu sâu hơn nữa. Tuy nhiên sau khi đã có thể tự mình sử dụng các thư viện rồi, để có thể tự mình cải thiện hiệu suất, tự mình xây dựng một phương pháp khác để tiếp cận cho những bài toán của riêng mình, chúng ta cũng nên có những cái nhìn thật sự nghiêm túc và chi tiết để có thể hiểu rõ hơn rằng "Máy tính đang học như thế nào?". Và trong bài viết hôm nay mình muốn giới thiệu với các bạn về một cách học "có giám sát" của máy tính trong bài toán phân loại. Mình sẽ không sử dụng bất kỳ thư viện hỗ trợ nào trong việc huấn luyện máy học mà sẽ tự code lại thuật toán Naive Baiyes để giải quyết việc "Phân loại thư rác tiếng Việt".

# Mục tiêu

Với sự nổi lên nhanh chóng của trí tuệ nhân tạo hiện nay, việc tiếp cận bằng học máy (machine learning) đã trở thành một thuật ngữ rất quen thuộc với mọi người. Học máy đã đang và sẽ được ứng dụng trong vô số ứng dụng hiện nay trong nhiều lĩnh vực như việc dự đoán rủi ro trong kinh tế, phân loại tin nhắn trong các công cụ như Gmail hay Yahoo hay gần đây là ứng dụng chẩn đoán bệnh trong y tế ,... Vậy với những người quan tâm về cách máy tính có thể dự đoán được ra kết quả, dựa vào từ 1 tập dữ liệu đầu vào thì đây sẽ là bài viết dành cho các bạn. Chúng ta sẽ cùng nhau xây dựng thuật toán Naive Bayes đơn bằng python nhé.
Với những bạn không quan tâm tới lý thuyết, các bạn có thể bỏ qua phần tiếp theo và đi đến phần code của mình.

# Bài toán phân loại với Bayesian
Suy diễn Bayesian là một kiểu suy diễn đơn giản mà máy tính dựa vào các xác suất của dữ liệu đã có trước của bài toán để tìm ra xác suất của đầu ra cho những đầu vào tiếp theo. Nói thì có vẻ hơi "tối nghĩa", nhưng giờ hãy nghe qua ví dụ dưới đây để hiểu việc dựa trên xác suất của dữ liệu trước là như thế nào?

Hãy tưởng tượng rằng bạn đang đi trên đường, bống nhiên phía trước bạn có một tờ TIỀN rơi xuống và ngay lập tức bạn nhận ra rằng, tờ TIỀN đó rơi ra từ trong túi của NGƯỜI đang đi ngay trước bạn. Bạn nhặt tờ tiền lên và muốn GỌI người đó để trả họ TIỀN, và đây là hình ảnh bạn nhìn thấy người đó từ phía sau

![](https://images.viblo.asia/09f0318c-41c0-455e-bd4c-78c7092f856f.jpg)

Giờ tôi muốn biết bạn sẽ GỌI người kia quay lại thế nào :)). Tạm bỏ qua việc đó, tôi muốn bạn nói cho tôi biết rằng NGƯỜI NÀY là NAM hay NỮ??

Mặc dù chúng ta có thể ngay lập tức có câu trả lời trong đầu (dựa vào mái tóc) do chúng ta đã được huấn luyện trên hàng trăm nghìn trường hợp từ trước tuy nhiên vẫn có thể câu trả lời của bạn HOÀN TOÀN KHÔNG CHÍNH XÁC!

Tạm dừng lại một chút, hãy giả sử hình ảnh bạn đang nhìn thấy là ở trong .. MỘT NHÀ VỆ SINH NAM. Tôi tin chắc rằng lúc này đa số mọi người đều sẽ nghĩ đây là NAM thay vì như trước. Điều này là một minh chứng cho việc chúng ta sẽ dựa hoàn toàn vào ngữ cảnh và các hiểu biết có sẵn (MỘT NGƯỜI Ở TRONG NHÀ VỆ SINH NAM THÌ KHÔNG THỂ LÀ NỮ...) để làm tăng khả năng dự đoán chính xác lên rất nhiều và cũng chính là cách Bayesian hoạt động.

Quay trở lại với tình huống trên, giờ hãy giả sử khi đi trên một đường phố bình thường, xác suất chúng ta gặp một người là NAM và một người là NỮ hoàn toàn bằng nhau. Để không mất tính tổng quát, hãy tưởng tượng rằng từ bé đến giờ chúng ta đã gặp 100 người, trong đó có 50 nam và 50 nữ. Có 25 người là NỮ để TÓC DÀI, 25 người NỮ để TÓC NGẮN, 48 người NAM để tóc ngắn và CHỈ CÓ 2 người NAM để TÓC DÀI. Trong tình huống này, rõ ràng xác suất 1 người có tóc dài mà là nữ sẽ cao hơn!

Khi chúng ta gặp một người ở trên đường, xác suất người đó là NAM/ NỮ coi như là như nhau (50%), còn ở đây, chúng ta đang đi tìm câu trả lời cho một câu hỏi "Khi biết một người có TÓC DÀI thì xác suất người đó là NAM/NỮ là bao nhiêu?". Một định nghĩa cần phải nắm được đó là XÁC SUẤT ĐIỀU KIỆN

$P(A|B)$ - Xác suất để xảy ra điều A khi đã biết điều B

Cụ thể hơn, Baysian được xây dựng và dựa vào công thức dưới đây để tính rồi so sánh các kết quả lại với nhau để biết xác suất nào là cao hơn

<br>

$y= cMAP = argmax P(c_j |x_1,x_2,...,x_n)$ với $ c_j∈C $ 

C là tập nhãn có thể nhận được của y (trong trường hợp này C là tập gồm 2 giá trị nam và nữ)

<br>

Nhìn lại một chút, công thức trên của Bayesian có nghĩa là chúng ta sẽ tính tất cả các xác suất của từng nhãn khi đã biết sự xảy ra hoặc không xảy ra các thuộc tính cho trước (x1, x2, ..) rồi chọn lấy giá trị lớn nhất (argmax) và đó cũng chính là kết quả dự đoán của chúng ta.

Vấn đề ở chỗ, xác suất xảy ra của nhãn khi biết các điều kiện khác (Xác suất 1 người là nữ khi biết ta đang đi trên đường và người đó có mái tóc dài) là điều mà ta đang cần biết, vậy nên công thức trên có thể được viết lại:

<br>

$y= argmaxP(x_1,x_2,...,x_n |c_j)P(c_j)$


$P(cj)$ ở đây được tính là tần suất xuất hiện của nhãn trên toàn bộ tập dữ liệu và có thể được tính rất dễ dàng, ví dụ ở trong bài toán của chúng ta đang nói  $P(nam) = P(nữ) = 50/100$


<br>

Vấn đề khó khăn hơn ở việc tính xác suất $P(x_1, x_2, .., x_n | c_j)$ - Xác suất xảy ra đồng thời các điều kiện $x_1, x_2, ..$ khi nhãn $c_j$ xảy ra. Thông thường việc tính này là bất khả thi (nhất là khi số lượng điều kiện n là lớn). Vậy nên thông thường, chúng ta sẽ coi các xác suất $x_1, x_2, .. x_n$ là độc lập với nhau, từ đó 

<br>

$P(x_1, x_2, .., x_n | c_j) = P(x_1 |c_j).P(x_2 |c_j)...P(x_n |c_j)$

<br>
$P(x_1|c_j)$ được tính dựa trên tập dữ liệu có trước đó bằng số lần $x_i$ xuất hiện cùng với $c_j$ chia cho tổng số lần $x_i$ xuất hiện

Tóm lại bộ phân loại Bayes đơn giản sẽ được viết như sau:

<br>

$y = argmaxP(c_j)∏P(x_i |c_j)$

<br>

Ví dụ, để tính xác suất xảy ra việc người đó TÓC DÀI đồng thời người đó CAO TRÊN 1m60 đồng thời người đó ĐI GIÀY khi biết người đó là NỮ sẽ đòi hỏi việc thống kê khó khăn hơn việc tính các xác suất người đó TÓC DÀI khi người đó là NỮ (25/27) ... rồi nhân tất cả lại với nhau.

Một chút áp dụng ngay sau đây vào bài toán của chúng ta với những số liệu mình đã giả sử ở trên có thể sẽ giúp các bạn hiểu các công thức vừa rồi hơn. 

Để áp dụng suy diến Bayesian, chúng ta sẽ phải tìm giá trị lớn hơn của $P(TÓC DÀI | nữ ).P(nữ)$ và $P(TÓC DÀI|nam).P(nam)$ rồi sẽ kết luận NAM hay NỮ theo giá trị nào lớn hơn.

<br>

$P_{nam}$ và $P_{nữ} $ chúng ta ở đây đang được giả sử là bằng nhau và bằng 50/100 (dựa vào thống kê)

$ P(TÓC DÀI|NỮ) $ - xác suất một người tóc dài khi biết người đó là nữ ta có thể dễ dàng thống kê được từ dữ liệu là 25/27

$P (TÓC DÀI|NAM) $ - xác suất một người tóc dài khi biết người đó là nam ta thống kê được từ dữ liệu là 2/27

Vậy ta sẽ có được:

<br>

$y = argmaxP(c_j)∏P(x_i |c_j) =$ $argmax$([P(nam).P(TÓC DÀI|nam), P(nữ).P(TÓC DÀI|nữ)])


y = argmax([0.5*2/27, 0.5*25/27])

y = nữ 

<br>

Như vậy với tập dữ liệu đã có và với các thông tin mới nhận được vào, mạng Bayes đoán ra người này có giới tính là NỮ! Nếu để ý hơn nữa, các bạn có thể thấy, Naive Bayes không cần xây dựng ra 1 cây hay 1 model như các phương pháp khác, tất cả những gì cần là chúng ta sẽ lưu lại CÁC XÁC SUẤT để tính toán cho 1 đầu vào mới sau này!

# Phân loại thư rác tiếng Việt với Naive Bayes

Hy vọng một chút công thức toán xác suất ở trên kia không làm cho các bạn cảm thấy bối rối quá nhiều :)) Bởi sau khi hiểu được rõ cách hoạt động của mạng, giờ chúng ta sẽ code để giải quyết bài toán phân loại thư rác này một cách dễ dàng.

## Thu thập dữ liệu

Hiện trên mạng, có rất rất nhiều tập dữ liệu cho bài toán lọc thư rác bằng TIẾNG ANH, các bạn có thể dễ dàng tìm thấy trên một số trang như Kaggle với keyword "Mail Filter Dataset". Tuy nhiên mình lại không tìm thấy bộ dữ liệu nào cho TIẾNG VIỆT cả :( Vậy nên mình chỉ còn cách thu thập từ gmail của mình, rồi tổng hợp ra ở 2 thư mục INBOX và SPAM :( Mình mất 1 buổi tối chỉ để làm việc này :( Thế mới thấy làm Machine Learning khổ thế nào :) 

![](https://images.viblo.asia/d2d0222b-bb86-403d-beab-f4d37c3dfa99.png)


Mình cố gắng và tổng hợp ra được 219 email, trong đó có 114 email là spam còn lại là email bình thường rồi lưu vào 1 file Excel như dưới đây kèm label (1 là spam, 0 là non-spam)

![](https://images.viblo.asia/69168e22-e046-40bc-bde3-24a4f31301f1.png)

## Xử lý dữ liệu
Nếu các bạn đã đọc khoảng 2-3 bài trước của mình sẽ thấy phần này tương đối giống nhau =)) Vì mình đều đang xử lý dữ liệu của văn tiếng Việt mà. Nhưng dù sao để các bạn không phải chuyển qua xem bài khác và vì để nhấn mạnh ĐỘ QUAN TRỌNG của bước này mình vẫn sẽ nói lại.

Các bạn có thể nhìn qua là thấy ngay, các email chứa khá nhiều "ký tự" lạ, nhiều viết tắt, link trang web, số đánh mã lung tung hết cả lên. Thông thường những dữ liệu này chả đem lại thêm thông tin gì cho các mô hình của chúng ta mà còn làm giảm tính chính xác, tăng độ phức tạp lên tương đối, vậy nên mình sẽ phải đi KHỬ chúng để chúng ta có những dữ liệu thật SẠCH nhé!

Đây là một dữ liệu ban đầu:
```python
print(document_test)
```
> ✅Cơ hội được tham gia hỗ trợ trực tiếp các dự án ""khủng"" với hàng triệu khách hàng trong nước và quốc tế. ✅ Được trải nghiệm môi trường làm việc trẻ, chuyên nghiệp và sáng tạo. ✅ Lương trong thời gian đào tạo từ 300 USD++, Phụ cấp cơm trưa, cafe miễn phí. ✅ Được hướng dẫn, đào tạo từ các mentors là chuyên gia hàng đầu trong lĩnh vực Marketing. ✅≥.....
> 
> HÌNH THỨC ĐĂNG KÝ:  ✅ B1: Truy cập: http://bit.ly/2AezDzP Click Đăng kí & Điền thông tin  ✅ B2: Like Fanpage http://bit.ly/2PctnNo, bật chế độ See First ✅ B3: Join group VNG HN - TALENT FRESHER : http://bit.ly/2PgfA8R\n'
> 

Mình sẽ đi từng bước một cho các bạn dễ hiểu. Vì phần này có khá nhiều thư viện hỗ trợ tiền xử lý văn bản, nên chúng ta sẽ không cần mất công nhiều nữa, các bạn hãy khai báo các thư viện sau nhé

```python
from pyvi import ViTokenizer #For split vietnamese words
import pandas as pd #For reading xlsx file
from gensim.parsing.preprocessing import strip_non_alphanum, strip_multiple_whitespaces,preprocess_string, split_alphanum, strip_short, strip_numeric
import re #For preprocessing raw text
```

### Loại bỏ tất cả các đường dẫn trong văn bản
Các đường dẫn thường là chứa nhiều ký tự hoàn toàn vô nghĩa, vậy nên trong bước đầu, chúng ta sẽ khử chúng đi với câu lệnh sau
```python
document_test = re.sub(r"http\S+", "", document_test)
print(document_test)
```
>  ✅Cơ hội được tham gia hỗ trợ trực tiếp các dự án ""khủng"" với hàng triệu khách hàng trong nước và quốc tế. ✅ Được trải nghiệm môi trường làm việc trẻ, chuyên nghiệp và sáng tạo. ✅ Lương trong thời gian đào tạo từ 300 USD++, Phụ cấp cơm trưa, cafe miễn phí. ✅ Được hướng dẫn, đào tạo từ các mentors là chuyên gia hàng đầu trong lĩnh vực Marketing....  
>  ♦ HÌNH THỨC ĐĂNG KÝ:  ✅ B1: Truy cập:  Click Đăng kí & Điền thông tin  ✅ B2: Like Fanpage  bật chế độ See First ✅ B3: Join group VNG HN - TALENT FRESHER : 

Hãy để ý kỹ rằng các đường dẫn đã hoàn toàn bị loại bỏ

### Loại bỏ ký tự lạ, chuẩn hoá văn bản
Các ký tự (emoji) cần phải được loại bỏ hết, sau đó văn bản sẽ được chuẩn hoá loại bỏ các khoảng trắng đầu cuối và đưa tất cả về dạng viết thường (lowercase).
```python
document_test = strip_non_alphanum(document_test).lower().strip()
print(document_test)
```
> cơ hội được tham gia hỗ trợ trực tiếp các dự án   khủng   với hàng triệu khách hàng trong nước và quốc tế    được trải nghiệm môi trường làm việc trẻ  chuyên nghiệp và sáng tạo    lương trong thời gian đào tạo từ 300 usd    phụ cấp cơm trưa  cafe miễn phí    được hướng dẫn  đào tạo từ các mentors là chuyên gia hàng đầu trong lĩnh vực marketing       
> hình thức đăng ký    b1  truy cập  click đăng kí   điền thông tin   b2  like fanpage bật chế độ see first   b3  join group vng hn   talent fresher

### Tách biệt các từ vô nghĩa
Các từ vô nghĩa có thể hiểu khi nhìn thấy ở trên ví dụ như (b1, b2...). Chúng là các chữ cái kết hợp với các số và hoàn toàn không có nghĩa.
```python
document_test = split_alphanum(document_test)
print(document_test)
```
> cơ hội được tham gia hỗ trợ trực tiếp các dự án   khủng   với hàng triệu khách hàng trong nước và quốc tế    được trải nghiệm môi trường làm việc trẻ  chuyên nghiệp và sáng tạo    lương trong thời gian đào tạo từ 300 usd    phụ cấp cơm trưa  cafe miễn phí    được hướng dẫn  đào tạo từ các mentors là chuyên gia hàng đầu trong lĩnh vực marketing       
> hình thức đăng ký    b 1  truy cập  click đăng kí   điền thông tin   b 2  like fanpage bật chế độ see first   b 3  join group vng hn   talent fresher

Giờ các từ vô nghĩa đã bị tách rời nhau ra thành TỪNG KÝ TỰ RIÊNG LẺ, và chúng sẽ được xử lý ở phần tiếp theo

### Loại bỏ toàn bộ các ký tự đứng 1 mình
Gần như không có ký tự nào đứng 1 mình mà lại mang nghĩa, vậy nên hãy loại bỏ chúng nhé
```python
document_test = strip_short(document_test, minsize=2)
print(document_test)
```
> cơ hội được tham gia hỗ trợ trực tiếp các dự án khủng với hàng triệu khách hàng trong nước và quốc tế được trải nghiệm môi trường làm việc trẻ chuyên nghiệp và sáng tạo lương trong thời gian đào tạo từ 300 usd phụ cấp cơm trưa cafe miễn phí được hướng dẫn đào tạo từ các mentors là chuyên gia hàng đầu trong lĩnh vực marketing 
> hình thức đăng ký truy cập click đăng kí điền thông tin like fanpage bật chế độ see first join group vng hn talent fresher

### Loại bỏ hết các số trong văn bản
```python
document_test = strip_numeric(document_test)
print(document_test)
```
> cơ hội được tham gia hỗ trợ trực tiếp các dự án khủng với hàng triệu khách hàng trong nước và quốc tế được trải nghiệm môi trường làm việc trẻ chuyên nghiệp và sáng tạo lương trong thời gian đào tạo từ  usd phụ cấp cơm trưa cafe miễn phí được hướng dẫn đào tạo từ các mentors là chuyên gia hàng đầu trong lĩnh vực marketing 
> hình thức đăng ký truy cập click đăng kí điền thông tin like fanpage bật chế độ see first join group vng hn talent fresher

### Ghép các từ tiếng Việt
Tiếng Việt không giống tiếng Anh ở một đặc tính quan trọng đó là việc nhiều từ tiếng Việt phải đi cùng nhau để tạo ra 1 từ (Với tiếng Anh, gần như không có điều này). Ở giai đoạn tiếp theo, chúng ta sẽ tách từng từ ra một để tạo ra vector, vậy nên hãy ghép các từ có nghĩa lại bằng thư viện ViTokenizer để đảm bảo việc tách này không làm mất nghĩa của từ nhé
```python
document_test = ViTokenizer.tokenize(document_test)
print(document_test)
```
> cơ_hội được tham_gia hỗ_trợ trực_tiếp các dự_án khủng với hàng triệu khách_hàng trong nước và quốc_tế được trải nghiệm môi_trường làm_việc trẻ chuyên_nghiệp và sáng_tạo lương trong thời_gian đào_tạo từ usd phụ_cấp cơm trưa cafe miễn_phí được hướng_dẫn đào_tạo từ các mentors là chuyên_gia hàng_đầu trong lĩnh_vực marketing 
> 
> hình_thức đăng_ký truy_cập click đăng_kí điền thông_tin like fanpage bật chế_độ see first join group vng hn talent fresher

Chắc hản nhìn vào kết quả các bạn đã hiểu ý mình nói ở trên!

Tóm lại, chúng ta sẽ làm tất cả các bước trên đối với bất kỳ văn bản nào trong dữ liệu và sau này khi dữ liệu mới được đưa vào để dự đoán.

```python
def raw_text_preprocess(raw):
    raw = re.sub(r"http\S+", "", raw)
    raw = strip_non_alphanum(raw).lower().strip()
    raw = split_alphanum(raw)
    raw = strip_short(raw, minsize=2)
    raw = strip_numeric(raw)
    raw = ViTokenizer.tokenize(raw)

    return raw
```
Xong xuôi, giờ chúng ta sẽ đi vào xây dựng mô hình suy diễn Naive Bayes nhé!

## Xây dựng mô hình Naive Bayes

Hãy cố gắng ghi nhớ những lý thuyết hoạt động ở phần trước mình đã nói, vì điều này sẽ giúp bạn dễ hiểu hơn khi thực hiện các bước xây dựng dưới đây. Bắt đầu thôi!

### Đọc dữ liệu đã thu thập từ file exel rồi xử lý
```python
xl_file = pd.ExcelFile('./data.xlsx')
dfs = xl_file.parse('Sheet1')
```

```python
document = []
label = []

for d in dfs.Document:
    document.append(d)

for l in dfs.Label:
    label.append(l)
```

```python
document = [raw_text_preprocess(d) for d in document]

document_test = document[100:130]
label_test = label[100:130]
document = document[:100] + document[130:]
label = label[:100] + label[130:]
```


Do lúc tổng hợp mình để hoàn toàn 114 email đầu là spam, 105 cuối là email thường, vậy nên để tạo ra 1 bộ test thật sự đúng, mình sẽ coi tập dữ liệu của mình có là 100 email đầu + 90 email cuối thôi nhé!

Dữ liệu còn lại sẽ để chúng ta đánh giá hiệu qủa của Naive Bayes

### Xây dựng Bag_of_words:

Bag of words sẽ là 1 "cái túi" chứa TẤT CẢ CÁC TỪ CÓ TRONG TẬP DỮ LIỆU của chúng ta. Mình sẽ tách các văn bản ra thành các từ, rồi lần lượt "cho hết vào túi", sau đó loại tất cả những từ trùng nhau đi để đảm bảo mỗi từ không xuất hiện qúa 1 lần nhé!

```python
set_words = []

for doc in document:
    words = doc.split(' ')
    set_words += words
    set(set_words)
    
print(len(set_words))
```
> 22276 #Length of bag

Như vậy bags của mình chứa 22276 words

### Chuyển các văn bản sang các vector

Hãy nhớ lại ở phần trước của mô hình Naive Bayes sẽ có xuất hiện của các điều kiện (Như mình ví dụ thì chỉ có 1 điều kiện là tóc CÓ DÀI hay KHÔNG DÀI). Ở đây cũng tương tự, nhưng với mỗi từ trong BAG OF WORDS ở trên, sẽ là 1 thuộc tính. Như vậy, tất cả các văn bản từ giờ sẽ được biểu diễn dưới dạng 1 vector có 22276 thuộc tính, nếu 1 từ trong BAG OF WORDS có xuất hiện trong văn bản đó, vị trí của nó sẽ là 1, còn lại là 0. Ví dụ bag of word của chúng ta chỉ có 3 từ:

> Tôi, yêu, Việt_Nam

Khi đó mọi văn bản đều biểu diễn dưới dạng 1 vector có 3 thuộc tính.
Với văn bản 
> Hoàng Anh là tôi


Ta sẽ có vector biểu diễn cho văn bản trên là 
> [1, 0, 0] 

Từ "TÔI" có xuất hiện trong văn bản nên vị trí đầu tiên của vector là 1, từ "YÊU" và từ "VIỆT_NAM" đều không có nên sẽ là 0.

Giờ chúng ta sẽ biểu diễn hết toàn bộ dữ liệu thành vector của BAG OF WORDS đã có ở trên để áp dụng được mô hình Naive Bayes nhé!

```python
import numpy as np
vectors = []

for doc in document:
    vector = np.zeros(len(set_words))
    for i, word in enumerate(set_words):
        if word in doc:
            vector[i] = 1
    vectors.append(vector)
```

Với mỗi một văn bản trong tập dữ liệu, lúc đầu, mình tạo ra 1 vector toàn 0 với số thuộc tính là chiều dài của bag of words. Sau đó, mình lần lượt kiểm tra xem từng từ của bag of words có nằm trong văn bản đó không, nếu có mình sẽ gán cho thuộc tính đó bằng 1.

```
np.shape(vectors)
```
> (189, 22276)    #189 documents, 22276 attributes

### Tính các xác suất cần thiết của Naive Bayes
**Áp dụng công thức xác suất trong bài toán thực tế**

Trước khi vào phần này, có 1 phương pháp mình sẽ áp dụng đó là "làm trơn" xác suất. Mục đích là tránh cho việc tích 1 xác suất đang cao, bỗng nhiên gặp 1 xác suất điều kiện bằng 0, và kéo theo toàn bộ sẽ bằng 0 bất kể rất nhiều các điều kiện khác thế nào. Để giải quyết vấn đề này, ta sẽ áp dụng công thức sau:


$P(x_i |c_j )= (n_c + 1)/( n + 1)$


Việc cộng cả tử và mẫu với 1 sẽ giữ gần như nguyên vẹn và đảm bảo công bằng cho các xác suất, đồng thời tránh được việc 1 xác suất điều kiện bằng 0 kéo theo tích toàn bộ xác suất bằng 0

Biểu diễn trong python:
```python
def smoothing(a, b):
    return float((a+1)/(b+1))
```

**1. Xác suất $P(c_j)$**
- P(spam) = số lượng mail spam / tổng số lượng mail
- P(non-spam) = số lượng mail non-spam / tổng số lượng mail

```python
spam = 0
non_spam = 0
for l in label:
    if l == 1:
        spam += 1
    else:
        non_spam += 1
print(spam, non_spam)

spam_coef = smoothing(spam, (spam+non_spam))
non_spam_coef = smoothing(non_spam, (spam+non_spam))
```

**2. Các xác suất thành phần $P(x_i|c_j)$**

Như mình đã nói ở trên, chúng ta chỉ cần lưu lại các giá trị xác suất thành phần của từng từ, và từ lần tiếp theo, việc dự đoán sẽ được tính toán trên nó. 

```python
bayes_matrix = np.zeros((len(set_words), 4)) #app/spam, app/nonspam, nonapp/spam, nonapp/nonspam
```

Sau đó thực hiện thống kê, đếm việc xuất hiện/ không xuất hiện đồng thời của từng từ khi văn bản là spam hoặc không là spam rồi cập nhật vào ma trận

```python
for i, word in enumerate(set_words):
    app_spam = 0
    app_nonspam = 0
    nonapp_spam = 0
    nonapp_nonspam = 0
    for k, v in enumerate(vectors):
        if v[i] == 1:
            if label[k] == 1:
                app_spam += 1
            else:
                app_nonspam += 1
        else:
            if label[k] == 1:
                nonapp_spam += 1
            else:
                nonapp_nonspam += 1
                
    bayes_matrix[i][0] = smoothing(app_spam, spam)
    bayes_matrix[i][1] = smoothing(app_nonspam, non_spam)
    bayes_matrix[i][2] = smoothing(nonapp_spam, spam)
    bayes_matrix[i][3] = smoothing(nonapp_nonspam, non_spam)
```

Và giờ chúng ta sẽ chỉ cần ma trận này cho việc dự đoán! 

### Phân loại một thư mới

Với một văn bản mới, trước khi đưa vào dự đoán, chúng ta cũng cần tiền xử lý và biến nó thành vector!
```python
#Preprocessing
new_document = raw_text_preprocess(new_document)

#Vectorizer
vector = np.zeros(len(set_words))
for i, word in enumerate(set_words):
    if word in new_document:
        vector[i] = 1
```

Thực hiện tính toán với ma trận Bayes để ra các kết quả nhằm xác định nhãn cho văn bản. Dựa vào công thức:

$y = argmaxP(c_j)∏P(x_i |c_j)$

Ta sẽ nhân tất cả các xác suất điều kiện lại với nhau rồi chọn kết quả lớn hơn => Chính là nhãn dự đoán.
```python
log = np.zeros(2)

predict_spam = spam_coef #P(spam)
predict_non_spam = non_spam_coef #P(non_spam)

index = 0

for i, v in enumerate(vector):
    if v == 0:
        predict_spam *= bayes_matrix[i][2] #P(xi|cj)
        predict_non_spam *= bayes_matrix[i][3]
    else:
        predict_spam *= bayes_matrix[i][0]
        predict_non_spam *= bayes_matrix[i][1]
    
    if predict_spam < 1e-10:
        predict_spam *= 1000
        log[0] += 1
    
    if predict_non_spam < 1e-10:
        predict_non_spam *= 1000
        log[1] +=1
```


Đa số các xác suất đều rất nhỏ, nếu cứ nhân liên tiếp với nhau, chắc chắn chúng sẽ bị về 0. Vậy nên mỗi khi nhận thấy xác suất quá nhỏ, chúng ta sẽ nhân xác suất lên để đảm bảo không bị về 0. Tuy nhiên để đảm bảo cuộc "CẠNH TRANH CÔNG BẰNG" giữa 2 xác suất, mỗi lần nhân, chúng ta đều sẽ ghi lại để cuối cùng so sánh xem giá trị nào lớn hơn! Việc so sánh thực hiện một cách khá đơn giản như sau

```python
def compare(predict_spam, predict_non_spam, log):
    while (log[0] > log[1]):
        predict_spam /= 10
        log[0] -=1
        if predict_spam > predict_non_spam:
            return True
        
    while(log[1] > log[0]):
        predict_non_spam /= 10
        log[1] -= 1
        if predict_non_spam > predict_spam:
            return False
        
    if predict_spam > predict_non_spam:
        return True
    return False
```

> Compare trả về **True** nếu giá trị xác suất spam lớn hơn, **False** nếu ngược lại.

Gộp các bước như trên lại ta được hàm predict:
```python
def predict(mail):
    mail = raw_text_preprocess(mail)
    
    vector = np.zeros(len(set_words))
    for i, word in enumerate(set_words):
        if word in mail:
            vector[i] = 1
    log = np.zeros(2)

    predict_spam = spam_coef
    predict_non_spam = non_spam_coef

    for i, v in enumerate(vector):
        if v == 0:
            predict_spam *= bayes_matrix[i][2]
            predict_non_spam *= bayes_matrix[i][3]
        else:
            predict_spam *= bayes_matrix[i][0]
            predict_non_spam *= bayes_matrix[i][1]

        if predict_spam < 1e-10:
            predict_spam *= 1000
            log[0] += 1

        if predict_non_spam < 1e-10:
            predict_non_spam *= 1000
            log[1] +=1
            
    if compare(predict_spam, predict_non_spam, log):
        return 1
    return 0
```
Với 1 email mới cần phân loại, ta chỉ cần gọi hàm predict!

Giờ mình sẽ kiểm tra độ chính xác trên tập document_test mình tạo ra lúc nãy. Sử dụng hàm tính độ chính xác của thư viện SKLEARN
```python
from sklearn.metrics import accuracy_score

pred = [predict(d) for d in document_test]
accuracy_score(label_test, pred)
```

> 0.7333333333333333

# Kết luận
Đối với cá nhân mình thấy, thuật toán suy đoán Naive Bayes là một thuật toán tương đối gần gũi. Nắm được thuật toán này, chúng ta sẽ giải đáp được về mặt logic câu hỏi ở đầu mình có đặt ra "Liệu máy nó học như nào?"

Hy vọng qua bài viết, các bạn sẽ hiểu được mô hình này và áp dụng thành công. 

Lần đầu tiên mình viết một bài nặng lý thuyết như này chắc chắn không tránh khỏi sai sót, nhầm lẫn, vậy nên có bất cứ khúc mắc hay góp ý gì, các bạn hãy comment giúp mình nhé.

Cảm ơn và chúc các bạn thành công