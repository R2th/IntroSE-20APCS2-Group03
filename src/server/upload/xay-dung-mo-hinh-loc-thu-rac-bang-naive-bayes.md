# Welcome miu blog!

Chào mọi người, đây là đầu tiên của tôi về *Machine Learning*. Xin giới thiệu qua về bản thân, tôi tên là Tú, hiện tôi đang làm Machine Learning Engineer. Động lực để làm blog này để chia sẻ kiến thức và kinh nghiệm của mình và cũng để học hỏi thêm kiến thức và cũng mong nhận được sự góp ý của mọi người để mình hoàn thiện hơn.
Tôi thuộc típ người yêu từ cái nhìn đầu tiên, nên cái gì đầu tiên sẽ làm tôi nhớ nhất,  nên nội dung của bài này chủ yếu tôi sẽ giới thiệu về dự án đầu tiên  **phân loại thư rác dựa vào học tự động**.

##  Trước khi đi sâu vào dự án tôi sẽ nói qua các khái niệm cơ bản.
* *Trí tuệ nhân tạo hay  (AI)* là một ngành khoa học máy tính liên quan đến việc tự động hóa các hành vi thông minh. AI là trí tuệ do con người lập trình tạo nên với mục tiêu giúp máy tính có thể tự động hóa các hành vi thông minh như con người.
* *Machine Learning* là một nhánh của trí tuệ nhân tạo, thuộc ngành khoa học máy tính, nó có khả năng tự học hỏi dựa trên dữ liệu đưa vào mà không cần phải được lập trình cụ thể. Học tự động là một phương pháp để tạo ra các chương trình máy tính bằng việc phân tích các tập dữ liệu.
* *Xử lý ngôn ngữ tự nhiên (Natural Language Processing)* là khái niệm để chỉ các kĩ thuật, phương pháp thao tác trên ngôn ngữ tự nhiên bằng máy tính. NLP xử lý các từ ngữ bằng máy tính và làm cho máy tính hiểu được các từ ngữ. 
## Phần tiếp theo, tôi sẽ giới thiệu qua về email.
* *Email* được gọi là thư điện tử, đây là một hệ thống chuyển nhận thư từ qua các mạng máy tính. Thư điện tử có thể gửi được chữ, hình ảnh, âm thanh, nó có thể chuyển thông tin từ một máy nguồn tới một hay nhiều máy nhận thông qua mạng Internet.
* *Thư rác* là những bức thư điện tử không mong muốn, không yêu cầu, vô bổ thường chứa quảng cáo được gửi tới người nhận. Đôi khi, nó lấy cắp các thông tin cá nhân của người dùng vào mục đích xấu. Thư rác do những hacker lấy được địa chỉ email của người gửi thông qua những email trao đổi.
* Các phương pháp lọc thư rác hiện nay: lọc thư rác thông qua việc đưa ra luật lệ, dựa trên địa chỉ IP, dựa trên chuỗi hỏi đáp, lọc dựa trên mạng xã hội, định danh người gửi, lọc nội dung.
Trong dự án này, tôi sử dụng phương pháp lọc nội dung cụ thể  dùng xác suất thống kê và học tự động

## Mục tiêu của dự án
![enter image description here](https://scontent.fdad1-1.fna.fbcdn.net/v/t1.0-9/103072147_1359483167584999_1927800358147986065_n.jpg?_nc_cat=111&_nc_sid=8024bb&_nc_ohc=95ivjcBzOuwAX9l-zaG&_nc_ht=scontent.fdad1-1.fna&oh=9ef738c772ae71c7908b685b030384d8&oe=5F076ABA)
- Nội dung chính của dự án là xây dựng mô hình lọc thư rác tự động, dựa trên cơ sở sử dụng các xác suất Bayes để tính toán khả năng một thư điện tử có phải thư rác hay không. Khi có thư mới đến dữ liệu sẽ được tiền xử lý và làm sạch dữ liệu trước khi được đưa vào mô hình để phân loại.
- Ngoài ra để thuận tiện cho người sử dụng, đồ án thực hiện xây dựng giao diện người dùng bằng lập trình tkinter.
- Bài toán phân loại thư rác thực chất là bài toán phân loại văn bản hai lớp, trong đó tập cơ sở dữ liệu ban đầu là các thư rác và thư hợp lệ. Ý tưởng của phương pháp là tìm cách xây dựng một bộ phân loại nhằm phân loại cho một mẫu mới bằng cách huấn luyện từ những mẫu có sẵn. Ở đây mỗi mẫu ta xét đến chính là mỗi một email, tập các lớp mà mỗi email có thể là thư rác hoặc thư hợp lệ.

###  Dữ liệu
 Dữ liệu gồm 5728 thư điện tử, trong đó có 4360 thư hợp lệ và 1368 thư rác.

## Thuật toán sử dụng Naive Bayes
* Thuật toán **Naive Bayes** dựa trên cơ sở định lí Bayes và đặc biệt phù hợp cho các trường hợp phân loại có kích thước đầu vào là lớn. 
* Cơ sở của thuật toán Naïve Bayes là dựa vào định lý Bayes. Định lý Bayes là kết quả của lý thuyết xác suất, nó đề cập đến xác suất có điều kiện của biến ngẫu nhiên A biết phân bố xác suất của A và phân bố xác suất của B khi A đã xảy ra.
* Phân loại văn bản bằng định lý Bayes là phương pháp phân loại có giám sát, đây là phương pháp quan trọng trong xử lý ngôn ngữ tự nhiên. Nó dễ sử dụng, dễ cài đặt nhưng đem lại hiệu quả vô cùng cao.

## Các bước xây dựng bô lọc thư rác

![enter image description here](https://scontent.fvca1-1.fna.fbcdn.net/v/t1.0-9/103315390_1359483170918332_8347596475864421711_n.jpg?_nc_cat=106&_nc_sid=8024bb&_nc_ohc=gB5uWgvxJrMAX9F0I18&_nc_ht=scontent.fvca1-1.fna&oh=e04589f1da889ac02a5c2e2ebd209b0e&oe=5F2DDE18)

**1. Tiền xử lý và làm sạch dữ liệu**
* Tiền xử lý dữ liệu: in ra nội dung của dữ liệu, biểu diễn, mô tả dữ liệu có chiều bao nhiêu, bao nhiêu hàng, bao nhiêu cột.
* Tách từ
* Loại bỏ Stopwords
* Loại bỏ các kí tự đặc biệt
* Chuẩn hóa từ

**2.  Xác định đặc trưng và lựa chọn đặc trưng**
*  Yêu cầu này chúng ta sẽ xem xét trên các thư điện tử và tìm các từ hoặc nhóm từ mà chúng là dấu hiệu của thư rác hay không phải thư rác. Sử dụng một số phương pháp lựa chọn đặc trưng để phân tích dữ liệu và chọn đặc trưng, sau đó có ước lượng xác suất điều kiện và sử dụng định lý Bayes để ước lượng xác suất của một thư điện tử có phải thư rác hay không?
* Lựa chọn đặc trưng của thư điện tử là rất quan trọng, bên cạnh các từ riêng lẻ trong nội dung của các thông điệp nó cung cấp dấu hiệu để nhận ra một thư điện tử có phải là thư rác hay không.

**3. Trích xuất đặc trưng**
* Trích xuất đặc trưng (feature extraction): sau khi đã lựa chọn đặc trưng chúng ta tiến hành trích xuất đặc trưng, chúng ta cần biến đổi dữ liệu nhiễu, dữ liệu thô về cùng một chuẩn vector. Dữ liệu chuẩn mới này cần giữ được những đặc trưng của dữ liệu thô ban đầu, cần thiết kế để có những phép biến đổi đặc trưng phù hợp.
* Phương pháp Bag of Words (BoW) sẽ chuyển các từ, các câu, đoạn văn ở dạng text của văn bản về một vector mà mỗi phần tử là một số. BoW học được một bộ từ vựng từ tất cả các văn bản rồi mô hình các văn bản bằng cách đếm số lần xuất hiện của mỗi từ trong văn bản đó. Bag of Words không quan tâm đến thứ tự từ trong câu và cũng không quan tâm đến ngữ nghĩa của từ.
* TF-IDF là trọng số của một từ trong văn bản thu được qua thống kê thể hiện mức độ quan trọng của từ này trong văn bản. Trong văn bản luôn có những từ được sử dụng nhiều hơn, tần suất xuất hiện nhiều hơn từ khác. Những từ có giá trị TF-IDF cao thường là những từ xuất hiện nhiều trong văn bản này và ít xuất hiện trong văn bản khác. Việc này giúp lọc những từ phổ biến và giữ lại những từ có giá trị cao.
**4. Xác định ngưỡng**
Sử dụng công thức tính xác suất Naïve Bayes ta sẽ tính được xác suất của một thư điện tử có phải là thư rác hay không. Giá trị xác suất này dùng để so sánh với ngưỡng, ranh giới phân định giữa thư rác và thư hợp lệ. Xác định rõ ngưỡng để loại bỏ tất cả các thư điện tử mà xác suất của chúng lớn hơn xác suất này. Những thư nào có xác suất lớn hơn ngưỡng t được coi là thư rác.
## Tiêu chí đánh giá

![enter image description here](https://scontent.fvca1-1.fna.fbcdn.net/v/t1.0-9/101686303_1359483240918325_5828660671634942891_n.jpg?_nc_cat=106&_nc_sid=8024bb&_nc_ohc=CzGxMsXg248AX9NoTFG&_nc_ht=scontent.fvca1-1.fna&oh=64de6e304a14d000a724f702c72239a0&oe=5F2DFD07)
 Underfitting là mô hình quá đơn giản nên nhiều lớp không được phân loại dẫn đến độ chính xác thấp. 
 Overfitting là mô hình quá phức tạp, mô hình quá khớp. Độ chính xác trên tập huấn luyện gần như tuyệt đối nhưng khi có dữ liệu mới không có trong tập huấn luyện thì độ chính xác rất tệ. 
 Cho nên một mô hình lý tưởng là mô hình không quá đơn giản, không quá phức tạp và không bị ảnh hưởng bởi nhiễu.
* Phương pháp Ma trận nhầm lẫn (Confusion matrix) thể hiện có bao nhiêu điểm dữ liệu thực sự thuộc vào một lớp, lớp nào được phân loại đúng nhiều nhất, dữ liệu của lớp nào bị phân loại nhầm vào lớp khác

![enter image description here](https://scontent.fvca1-2.fna.fbcdn.net/v/t1.0-9/103061821_1359483234251659_576633061759413635_n.jpg?_nc_cat=101&_nc_sid=8024bb&_nc_ohc=QAEQ5HUaHr4AX95swNv&_nc_ht=scontent.fvca1-2.fna&oh=5c63b5dccc736768a2717152a3f4c423&oe=5F07B9CB)

	TP (True Positive):  khi mô hình dự đoán đúng là thư rác. 
	TN (True Negative):  khi mô hình dự đoán đúng là thư hợp lệ.
	 FP (False Positive):  khi mô hình dự đoán sai thư hợp lệ thành thư rác. 
	 FN (False Negative): khi mô hình dự đoán sai thư rác thành thư hợp lệ.
 * Accuracy (Độ chính xác) tính tỉ lệ giữa số điểm được dự đoán đúng và tổng số điểm trong tập dữ liệu kiểm tra.  Phương pháp này chỉ cho chúng ta biết được bao nhiêu phần trăm lượng dữ liệu được phân loại đúng mà không chỉ ra được cụ thể mỗi loại được phân loại như thế nào, lớp nào được phân loại đúng nhất, lớp nào bị phân loại nhầm. 
 `Accuracy = (TP+TN)/(TP+TN+FP+FN)`
 * Recall thể hiện khả năng mô hình dự đoán không bị sót nhãn, nó là tổng số ví dụ được phân loại chính xác của một lớp chia cho tổng số các ví dụ của lớp đó. Recall càng cao càng tốt, tức là FN trong mô hình này phân loại nhầm thư rác thành thư hợp lệ càng nhỏ càng tốt. 
 `Recall = TP/(TP+FN)`
* Precision thể hiện khả năng mô hình dự đoán đúng nhãn, nó là tổng số ví dụ được phân loại chính xác của một lớp chia cho tổng số ví dụ được phân loại vào lớp đó. Precision càng cao càng tốt, tức là FP trong mô hình này phân loại nhầm thư hợp lệ thành thư rác càng nhỏ càng tốt.
`Precision = TP/(TP+FP)`
* F1-score là sự kết hợp giữa hai tiêu chí Precision và Recall, nó là trung bình điều hòa của Precision và Recall. Như vậy F1-score được dùng khi ta quan tâm đồng đều vai trò của Precision và Recall, nói cách khác muốn mô hình vừa nhạy, vừa chính xác

## Phương pháp đánh giá

* Holdout

* Đánh giá chéo (Cross Validation)

* Đánh giá chéo 1:k (K-fold cross validation)

### 9. Giao diện của mô hình
![enter image description here](https://scontent.fhan3-2.fna.fbcdn.net/v/t1.0-9/102609612_1359483310918318_5402761120114791680_n.jpg?_nc_cat=111&_nc_sid=8024bb&_nc_ohc=zUDjA5-i-38AX-5_vAj&_nc_ht=scontent.fhan3-2.fna&oh=b937510a343be8f7783357504d9d4873&oe=5F2D5BB9)

## Kết quả thí nghiệm với đặc trưng Bag of Words 
![enter image description here](https://scontent.fvca1-2.fna.fbcdn.net/v/t1.0-9/101861939_1359483300918319_3939973434927843707_n.jpg?_nc_cat=104&_nc_sid=8024bb&_nc_ohc=OYq5Rh2i5IsAX-283cA&_nc_ht=scontent.fvca1-2.fna&oh=7c3d4945d08709d7b3ee61412ac1f13c&oe=5F07F21E)

## Kết quả thí nghiệm với đặc trưng TF-IDF 
![enter image description here](https://scontent.fhan3-2.fna.fbcdn.net/v/t1.0-9/102699881_1359483357584980_6412959820744224689_n.jpg?_nc_cat=111&_nc_sid=8024bb&_nc_ohc=fzA-0T3_drUAX8_xoXK&_nc_ht=scontent.fhan3-2.fna&oh=485018e651a23a25b4b89b4809a30807&oe=5F2CC1E3)
## Đánh giá mô hình
⦁	 Kết quả phân loại nhầm thư rác thành thư hợp lệ và kết quả phân loại nhầm thư hợp lệ thành thư rác rất thấp, điều đó chứng tỏ mô hình hoạt động tốt. 
⦁	 Ngoài tiêu chí độ chính xác, tiêu chí thời gian được dùng để đánh giá mô hình. Thời gian xử lý dữ liệu còn chậm.
So sánh giữa kết quả giữa hai đặc trưng:
⦁	Với đặc trưng Bag of Words bộ lọc hoạt động tốt, kết quả, độ chính xác cao, ít email bị phân loại nhầm tuy nhiên tỷ lệ thư hợp lệ phân loại nhầm lẫn thành thư rác vẫn nhiều hơn so với đặc trưng TF-IDF. 
⦁	Với đặc trưng TF-IDF hiệu suất bộ lọc thấp hơn, tỉ lệ email bị phân loại nhầm tương đối cao, thư rác bị phân nhầm thành thư hợp lệ có xảy ra nhiều. 

## Kết luận và hướng phát triển 
### Kết luận
*	Thuật toán Naïve Bayes đem lại kết quả bất ngờ, tỉ lệ nhận dạng cao. Kết quả phân loại cao nhưng chỉ nằm trong một điều kiện, bài toán cụ thể chứ không phải đúng trong tất cả mô hình khác. 
*	Mô hình trên chỉ quan tâm tới nội dung của email. Email còn có các đặc điểm để phân loại nữa là tiêu đề, địa chỉ người gửi. Để xây dựng được mô hình với đầy đủ các đặc điểm trên là bài toán lớn với em và các nhà khoa học trên thế giới.
*	Một trong những lý do nghĩ đến có thể là trong bức thư đó những từ hay xuất hiện ở thư rác và những từ hay xuất hiện thư hợp lệ có tỷ lệ gần bằng nhau dẫn đến việc tính xác suất bị sai. Khi đó mô hình sẽ bị phân loại sai.
### Hướng phát triển
*	Mô hình phân loại thư rác trên chỉ sử dụng thuật toán Naïve Bayes, chúng ta còn có thể sử dụng các thuật toán khác như SVM, mạng Neutron… cũng cho ta kết quả khá tốt. Không có thuật toán nào là tối ưu nên việc chọn thuật toán cho phù hợp với bài toán là rất quan trọng.
*	Việc thu thập thêm dữ liệu từ cơ sở dữ liệu trên cũng là vấn đề em quan tâm. Dựa vào cơ sở dữ liệu trên ta có thể tìm thêm các dữ liệu rồi gán nhãn cho chúng là thư rác hoặc thư hợp lệ. Việc dữ liệu càng nhiều thì mô hình phân loại sẽ chính xác hơn.
*	Xây dựng một mô hình thư rác hoàn chỉnh, hiệu quả cao, tạo ra một ứng dụng để người dùng email có thể sử dụng nó.
* Deploy mô hình lên server, xây dựng giao diện trên web thay vì dùng giao diện GUI.

## Thư viện 
* Scikit-learn: một thư viện mã nguồn mở và hỗ trợ hầu hết các thuật toán dành cho học tự động. Chúng ta sử dụng scikit-learn khi cần giải quyết bài toán về học tự động.
* nltk: phục vụ xử lý ngôn ngữ tự nhiên, ngoài ra nó còn có tác dụng làm sạch dữ liệu, xử lý dữ liệu đầu vào cho các thuật toán học tự động.

## Link demo: [spam email](https://www.youtube.com/watch?v=LISuR6NG6xg)
## Source code: [gitlab](https://gitlab.com/XuanTu1508/project_spam-email)

### Đây là dự án được tôi thực hiện khi còn là sinh viên, hiện tại tôi chưa chỉnh sửa gì thêm, nếu sắp tới có thời gian thì tôi sẽ cải thiện để có kết quả tốt hơn. Cảm ơn mọi người đã xem.
### Tu Pham