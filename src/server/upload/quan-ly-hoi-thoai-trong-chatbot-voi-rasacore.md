# 1. Tổng quan về quản lý hội thoại

Trong xây dựng ChatBot có 3 bước chính bao gồm: 

* Phân tích ngữ nghĩa
* Trích xuất thông tin
* Quản lý hội thoại 
    
Sau khi input được xử lý ở 2 phần Phân tích ngữ nghĩa và Trích xuất thông tin sẽ được chuyển xuống Quản lý hội thoại. Ở đây, đảm nhận công việc dự đoán hành động tiếp theo cho Bot làm sao để phù hợp với bối cảnh câu chuyện đang diễn ra giữa người sử dụng và Bot.

Vd: Khi người dùng hỏi Bot một câu hỏi  mở: "A : Tôi muốn mua áo." Có thể thấy, có rất nhiều cách để Bot trả lời lại người dùng: "Bạn muốn áo loại nào?", "Bạn muốn mua bao nhiêu chiếc áo", "Bạn muốn áo màu gì?",..Tuy nhiên, làm sao để câu trả lời của Bot phù hợp với ý định của người dùng trong những trường hợp này thì cần phải xử lý qua một công đoạn đó là "Quản lý hội thoại". Như vậy, "Quản lý hội thoại" nắm vai trò quan trọng trong việc tạo ra bối cảnh và dự đoán hành động tiếp theo cho Bot một cách chính xác nhất có thể.

#  2. Quản lý hội thoại cho RasaBot với RasaCore

RasaCore là một famrework rất mạnh trong xây dựng và quản lý hội thoại cho Bot.

Điểm mạnh: 

* Open Source
* Dễ sử dụng, không cần biết quá nhiều về python vẫn sử dụng được
* Xây dựng hội thoại nhanh chóng
* Phù hợp với bộ dữ liệu trung bình
    
RasaCore có 2 thành phần chính trong quản lý hội thoại là: Dialog State Tracker và Dialog Policy

##  2.1 Mô hình xử lý phản hồi tin nhắn 

![](https://images.viblo.asia/84f8fdf9-6e4a-479f-b20a-d3266b01d9a0.png)

* Tin nhắn được nhận và chuyển đến một Interpreter, trong đó chuyển đổi nó thành một từ điển bao gồm văn bản gốc, ý định và bất kỳ thực thể nào được tìm thấy.
* Tracker là đối tượng theo dõi trạng thái hội thoại. Nó nhận được thông tin rằng một tin nhắn mới đã đến.
* Policy nhận được trạng thái hiện tại của trình theo dõi và chọn hành động tiếp theo.
* Hành động được chọn được ghi lại bởi trình theo dõi.
* Một phản hồi được gửi đến người dùng.
  
## 2.2 Dialog State Tracker

Trình theo dõi lưu trữ và duy trì trạng thái của cuộc đối thoại với một người dùng. Nó được lưu trữ trong một file tên là "store.md", được truy xuất khi các tin nhắn đến cho cuộc hội thoại được nhận và cập nhật sau khi các hành động được thực thi.

Nếu đây là tin nhắn đầu tiên của cuộc hội thoại, RasaCore sẽ tạo một đối tượng theo dõi với khóa "sender_id" là định danh đến của người dùng, id này phải là duy nhất cho một người dùng nếu không dự đoán có thể không nhất quán cho một con người cụ thể.

## 2.3 Dialog Policy 
Policy là thành phần chính để đánh giá các hành động trong một danh sách các hành động có sẵn của Bot, hành động nào sẽ được chọn để Bot thực hiện tiếp theo.

**Một số Policy của RasaCore được sử dụng:**

**Memoization Policy**
Plolicy sao chép dữ liệu đào tạo và ghi lại sau đó dự đoán hành động tiếp theo. Ở đây dự đoán là nhị phân, nếu cuộc hội thoại khớp với một trong những câu chuyện trong dữ liệu đào tạo thì hành động tiếp theo sẽ có độ tin cậy là 1, nếu không thì độ tin cậy là 0.

Tuy nhiên, cuộc trò chuyện này cần làm sao để được kiểm tra sẽ phụ thuộc vào siêu tham số Max_History:  *"siêu tham số MaxHistory chỉ định số lượng trạng thái trước đó để đưa vào featurisation. Theo mặc định, các trạng thái được xếp chồng lên nhau để tạo thành một mảng hai chiều, có thể là được xử lý bởi recurrent neural networks (RNN) hoặc simlar sequence model (SSM)"*

**AugmentedMemoizationPolicy**
Có thể sử dụng Policy nếu không đặt các vị trí dự đoán nhưng chúng có trong dữ liệu đào tạo, về cơ bản, điều này giúp Policy này bỏ qua các vị trí trong trình theo dõi để xem xét quyết định.

**Keras Policy**
Một trong những Policy quan trọng nhất, sử dụng mô hình Machine Learning là LSTM (Long short term memory) có nhiều tính năng dự đoán hành động tiếp theo trong hội thoại.

**Fallback Policy**
Fallback Policy là một chức năng logic thực hiện chuyển tiếp có ba tham số là : “NLU threshold, Core threshold và Fallback action”. Nếu “NLU threshold” (ngưỡng NLU) dưới một tỷ lệ nhất định thì action dự phòng sẽ được gọi. Nếu “ngưỡng” này đạt tỷ lệ ổn nhưng mục đích đã cho trong Domain không có thì Policy này sẽ sử dụng action dự phòng. “Core threshold” là dự phòng thứ hai, trong đó, Bot hiểu rất rõ ý định nhưng không chắc chắn về hành động được dự đoán và nó nằm dưới ngưỡng của tham số “Core” này thì sau khi xét trường hợp, action dự phòng sẽ đc gọi.

**Cảm ơn các bạn đã dành thời gian cho bài viết ^^!**

link tham khảo : http://rasa.com/docs/rasa/user-guide/installation/