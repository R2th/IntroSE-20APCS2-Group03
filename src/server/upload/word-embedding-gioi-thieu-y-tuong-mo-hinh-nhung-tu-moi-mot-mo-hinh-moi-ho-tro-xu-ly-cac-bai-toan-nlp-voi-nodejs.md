# Giới thiệu ý tưởng mô hình nhúng từ mới
> Máy tính không hiểu những mặt chữ tự nhiên thông thường như cách con người hiểu, nó chỉ hiểu những dãy số và các từ dù ở trong bất cứ ngôn ngữ giao tiếp nào trên thế giới đều tồn tại một dãy số đặc trưng riêng. Dãy số ấy là vector đặc trưng của từ, việc tạo ra vector cho từ gọi là word to vec (chuyển đổi từ ngữ sang vector).<br>

>  Hiện tại có các mô hình nhúng từ như Skip-gram; CBOW; Glove;...Nhưng chúng tồn tại một vấn đề là sử dụng các phép toán khá phức tạp, khiến một học sinh THPT có trình độ về toán hạn chế như mình khó có thể hiểu được tường tận khi tự học về NLU, NLP, Machine Learning tại gia và đặc biệt hơn khi mình muốn triển khai thuật toán word to vec trên Javascript để phục vụ dự án đi thi khoa học kỹ thuật cấp quốc gia (Visef 2020) (Đa số các mô hình word to vec trên npm đều trục trặc khi cài đặt trên máy mình, còn việc dùng python để triển khai là điều khó nhọc khi dự án được triển khai trên server miễn phí với cấu hình yếu). Vậy nên mô hình NK-VEC được ra đời nhằm đáp ứng một mục tiêu là sử dụng các phép toán đơn giản để xây dựng mô hình chuyển đổi từ ngữ sang vector, viết được trên javasript, server yếu vẫn chạy được.<br>

>  Lưu ý nho nhỏ: Chúng ta thống nhất với nhau về cụm từ "ngữ nghĩa" là sự tương đồng hoặc có liên quan với nhau giữa từ với từ nhé
### Update
Hiện đã có thư viện tích hợp sẵn NK-VEC model và hàng loạt tính năng hỗ trợ giải quyết các bài toán NLP với Javascript đã được publish trên npm [tại đây](https://www.npmjs.com/package/nk-vector)
## Tổng quát mô hình
![Sơ đồ tổng quát](https://images.viblo.asia/c11fc1fc-5018-4144-80ff-0bd3ecc6964d.PNG)
<div align="center">Sơ đồ tổng quát</div> <br>

### Các bước tiến hành <br>
--------
***Tạo one-hot vector cho các từ:*** <br>
Đây là bước khởi đầu cơ bản và nhẹ nhàng <br>
- Số chiều one-hot của một từ được quyết định bởi số lượng từ (kể cả lặp lại) có trong văn bản (Gọi là D) <br>
- Khởi tạo zero vector có D chiều <br>
- Tại các vị trí từ xuất hiện trong văn bản sẽ được thay đổi thành 1 tại vị trí tương ứng trong zero vector (VD: Theo mô tả trong hình) <br>

***Giảm chiều vector:*** <br>
Sau một thời gian nghiên cứu các thuật toán giảm chiều tiêu biểu như SVD hoặc PCA thì mình nhận ra 3 điều sau:<br>
- 1. Chúng phức tạp về toán học nên dẫn đến điều thứ 2.<br>
- 2. Chúng khó triển khai lên Javascript.<br>
- 3. Đòi hỏi tính toán lớn nên không thể áp dụng lên một server miễn phí mà Heroku cung cấp (cốt lõi của NK-VEC là phục vụ cho mình xây dựng sản phẩm và triển khai trên các server yếu như server miễn phí mà Heroku cung cấp).<br>
Nên mình nghĩ ra một cách thay thế SVD, PCA hoặc các thuật toán tương tự, mình đặt tên phương pháp này là Auto Focus.<br>
Ý tưởng như sau: <br>
Bạn đưa đầu vào là một vector có D chiều (giả sử D rất lớn - như trong bài này thì con số này gần 9 nghìn, lớn hơn số chiều mà bạn muốn thu gọn xuống) và bạn mong muốn đầu ra là vector có D' chiều (D' là số chiều mong muốn rút gọn xuống) thì Auto Focus sẽ tạo ra một bộ trượt tương tự với words windows có step là 1, sẽ trượt trên toàn bộ vector đầu vào D chiều ban đầu đồng thời trong lúc này nó sẽ gom nhóm D' phần tử - ứng với D' chiều mong muốn đầu ra và tính tổng của các phần tử vừa gom được (điều này sẽ giúp định xem nhóm vừa gom có thưa không - vì đầu vào là một onehot) sau đó lưu vào một list theo định dạng Json như sau (Lưu ý: cách này có thể sẽ tạo ra việc trùng key - tức cùng tổng nhưng vẫn không ảnh hưởng vì cả tập dữ liệu đều chịu ảnh hưởng chung): <br>
{"<**tổng của các phần tử trong nhóm gom được**>":[<***nhóm được gom***>]} <br>
Cuối cùng chỉ cần sort key tổng lớn nhất (lưu ý chuyển về kiểu int) và truy vấn lấy nhóm tương ứng => nhóm tương ứng này sẽ là vector đầu ra của Auto Focus. Hãy xem ví dụ sau: <br>
![](https://images.viblo.asia/d03a48f6-12a1-44c0-a61f-1455be815215.PNG)  <br>

Cách làm thế này sẽ đảm bảo vector đầu vào không bị thưa và vẫn giữ được một số đặc trưng cơ bản vậy nên chất lượng không bị thay đổi mà còn tiết kiếm thời gian training, thời gian search word similarity.<br>

***Tạo dữ liệu đào tạo:*** <br>
Nhìn chung mô hình NK-VEC giống với CBOW ở ý tưởng đó là sử dụng các từ ngữ cảnh xung quanh (context words) để tạo ra vector cho từ mục tiêu (target word), thế nên NK-VEC cũng sử dụng cửa sổ trượt (sliding windows) giống với CBOW để tạo dữ liệu đào tạo. <br>
- Đầu vào có các vector của x (context words) và y (target word) <br>
- Lấy các vector của x làm dữ liệu đào tạo (Training data = $Contextwords^T$) còn vector y là mục tiêu của mô hình <br>

***Tiến hành đào tạo:*** <br>
Chúng ta sẽ thực hiện theo thứ tự sau:<br>
- Khởi tạo ma trận W có chiều ứng với số cột của x (VD: Theo mô tả trong hình) <br>
- Lan truyền tới sẽ dùng $W*Training data$ và tạo ra một y_pred (đầu ra dự đoán) thông qua sigmoid <br>
- Lỗi là một vector (Error) được tính bằng cách y - y_pred <br>
- Lan truyền ngược (Backpropagation) bằng cách lấy $Error*Trainingdata^T$ <br>
- Cập nhật W bằng $W_(old) - W_(Backpropagation)$ <br>
--------
### Kết quả <br>
- - Với cấu hình máy của mình là CPU i7-4610m @3.00GHz, Ram 8Gb, win 10 64-bit lúc chạy mô hình đào tạo 3K từ thì CPU đạt 40 - 50%, Ram 4-5Gb. Vẫn dư dả để chơi game lúc chờ đợi mô hình chạy<br>
**Ưu điểm của mô hình:**<br>
- - Đơn giản đến mức học sinh cấp 3 yếu toán như mình vẫn làm được và triển khai được trên Javascript<br>
- - Thời gian đạo tạo cho 3K từ rời vào khoảng 5h trên máy mình [Sau khi áp dụng Auto Focus thì thời gian training giảm xuống còn 50 phút]<br>
**Nhược điểm của mô hình:**<br>
- - Chiều vector lớn theo lượng từ vựng trong văn bản đưa vào (Nhưng mình nghĩ với các thuật toán giảm chiều vector như SVD, TSNE, PCA, product quantization...sẽ giải quyết được điều này, chỉ có khó ở chỗ khó sử dụng các thuật toán giảm chiều vector này trên Javascript) - Đã được fix với Auto Focus<br>
**Một số hình ảnh truy vấn từ tương tự sau khi đào tạo:**<br>
- ***Trước khi dùng Auto Focus:*** <br>
![](https://images.viblo.asia/ec43acd8-9cdc-43fc-8211-7a1ed3836215.jpg)<br>
![](https://images.viblo.asia/8e36dfa3-d4a4-422e-a9f5-1087802c91d5.jpg)<br>
- ***Sau khi dùng Auto Focus:*** <br>
![](https://images.viblo.asia/480b80ab-2d01-401e-9010-8e34eaf43767.PNG)<br>
![](https://images.viblo.asia/b4ae583b-8f83-4f00-87e9-e129e18f1dd4.PNG)<br>
- ***Visual***<br>
![](https://images.viblo.asia/780b5789-50eb-453b-8889-449ff3cb6d86.jpg)<br>
![](https://images.viblo.asia/fc8c35b5-6813-452f-8780-2db4167fcb44.jpg)<br>
- ***Evaluation***<br>
- Dữ liệu đánh giá là bộ [Quora Question Pairs](https://www.kaggle.com/c/quora-question-pairs)<br>
- Tình trạng mẫu:<br>
![](https://images.viblo.asia/97177962-e28d-456c-a870-9eaf672ce63e.png)<br>
- Kết quả:<br>
![](https://images.viblo.asia/82c37d16-5941-4123-a29c-6bc6bef4f8aa.jpg)<br>
### Note
Bài viết này nhằm giới thiệu ý tưởng và là bài viết đầu tiên của mình về mô hình mạng nên khó tránh sai sót hay nhầm tưởng thế nên mong mọi người góp ý chỉnh sửa. Mình xin cảm ơn mọi người rất nhiều :heart_eyes:<br>
Truy cập thư viện tích hợp NK-VEC model [tại đây](https://www.npmjs.com/package/nk-vector)<br>
Truy cập demo sản phảm mình đi thi [tại đây](https://code-search-vni.herokuapp.com/). Mong mọi người test nhẹ thui :relaxed: !<br>
Link Facebook liên hệ mình [tại đây](https://www.facebook.com/trinhdoduyhungss/)<br>