![Mạng nơ ron](https://images.viblo.asia/4ed73802-4586-4fb1-a28f-9b55a445438b.jpeg)


Trí thông minh nhân tạo (AI) và Học máy (ML) đang là các chủ đề hot nhất hiện nay. Thuật ngữ **"AI"** được nhắc đến hằng ngày, nhưng có những người không hiểu AI nghĩa là gì. Bài viết này sẽ giới thiệu cơ bản về AI và ML, cụ thể bạn sẽ hiểu Deep Learning, một loại phổ biến của ML, hoạt động như thế nào.

# Quá trình hình thành

Bước đầu tiên để hiểu cách Deep Learning hoạt động là nắm rõ sự khác biệt giữa các thuật ngữ quan trọng. 

##### Artificial Intelligence vs Machine Learning (*Trí thông minh nhân tạo và Học máy*)
> **Artificial Intelligence là bản sao trí thông minh của con người trong máy tính.**
> 

Khi nghiên cứu về AI lần đầu được bắt đầu, các nhà nghiên cứu đã thử tái tạo trí thông minh con người cho một vài việc cụ thể - như là chơi game. Họ đã giới thiệu một lượng lớn các quy tắc mà máy tính cần phải tuân theo. Máy tính phải có một danh sách cụ thể các hành động khả thi và quyết định đưa ra từng hành động dựa vào các quy tắc này.

> **Machine Learning hướng đến khả năng của một cái máy để học cách sử dụng một lượng lớn tập dữ liệu (dataset) thay vì các quy tắc đã được đặt sẵn cho nó.**
> 

ML cho phép máy tính học từ chính bản thân nó. Cách học này lợi dụng sức mạnh xử lý của máy tính hiện đại, những chiếc máy tính có thể dễ dàng xử lý lượng lớn các tập dữ liệu.

##### Supervised learning vs unsupervised learning (*học có giám sát và học không giám sát*)
> **Học có giám sát bao gồm việc sử dụng các tập dữ liệu có dán nhãn (labelled dataset) mà có các đầu vào và đầu ra được dự đoán.**
> 


Khi bạn huấn luyện một AI sử dụng phương pháp học giám sát, bạn phải đưa vào một đầu vào và chỉ cho nó chính xác đầu ra là gì. Nếu AI cho đầu ra sai, nó sẽ tự điều chỉnh sự tính toán của nó. Quá trình lặp lại trong tập dự liệu sẽ hoàn thành cho đến khi AI không đưa ra kết quả sai nữa.
Một ví dụ cho học có giám sát là AI dự báo thời tiết. AI này học cách dự báo thời tiết dựa vào các dự liệu cũ đã có. Dữ liệu huấn luyện đó có các đầu vào (độ ẩm, tốc độ gió, áp suất) và các đầu ra (nhiệt độ).

> **Học không giám sát là nhiệm vụ của học máy để sử dụng các tập dữ liệu không có cấu trúc cụ thể.**
> 

Khi bạn huấn luyện AI sử dụng học không giám sát, bạn để AI tự phân tích, phân loại dữ liệu. Một ví dụ của học không giám sát là AI dự đoán hành vi cho website thương mại. Nó sẽ không học bằng cách sử dụng các tập dữ liệu dán nhãn, thay vào đó nó sẽ tự tạo ra các phân lớp của nó cho dữ liệu đầu vào. Nó sẽ chỉ ra cho bạn từng loại người dùng sẽ mua từng loại sản phẩm khác nhau nào.

# Vậy Deep Learning hoạt động ra sao?

Deep Learning là một phương pháp của Học máy. Nó cho phép chúng ta huấn luyện một AI có thể dự đoán được các đầu ra dựa vào một tập các đầu vào. Cả hai phương pháp có giám sát và không giám sát đều có thể sử dụng để huấn luyện.

Chúng ta sẽ học cách deep learning hoạt động ra sao bằng cách xây dựng một dịch vụ dự đoán giá vé máy bay. Ta sẽ huấn luyện nó bằng phương pháp học có giám sát.

Chúng ta muốn dự đoán giá vé dựa vào các đầu vào như sau:
* Sân bay khởi hành
* Sân bay đến
* Ngày bay
* Hãng hàng không

## Mạng nơ ron

Cũng giống động vật, bộ não của  AI cũng có các nơ ron. Chúng được biểu diễn bằng các vòng tròn. Các nơ ron này đều đã được liên kết.
![](https://images.viblo.asia/f324c4c1-535b-4ec3-a4b7-983380694ec5.jpeg)

Các nơ ron được nhóm va ò 3 loại layer khác nhau: 
1. Input layer
2. Các hidden layer
3. Output layer

**Input layer** nhận các dữ liệu đầu vào. Trong trường hợp của chúng ta, ta có 4 nơ r on trong input layer: sân bay khởi hành, sân bay đến, ngày bay, hãng bay. Input layer sẽ đưa các đầu vào này vào hidden layer thứ nhất.

Các **hidden layer** thực hiện các phép tính toán cho các đầu vào. Thử thách lớn nhất trong việc tạo mạng nơ ron là quyết định số lượng các hidden layer này, cũng như số các nơ ron cho mỗi layer.

> Từ **“Deep”** trong Deep Learning chỉ đến việc có nhiều hơn một hidden layer.
> 

**Output layer** trả về dữ liệu đầu ra, trường hợp của ta sẽ là đưa ra dự đoán về giá vé.
![](https://images.viblo.asia/486f5192-7782-44e0-a796-8f5c9deaac7c.png)


Vậy làm thế nào máy móc có thể tính toán được về dự đoán giá vé?
> Mỗi một kết nối giữa nơ ron được liên kết với một trọng số (weight). Trọng số này chỉ rõ ra tầm quan trọng của giá trị đầu vào. Trọng số khởi tạo được chọn ngẫu nhiên.
> 

> Khi dự đoán giá vé, ngày khởi hành là nguyên tố quan trọng nhất. Vì vậy, mạng nơ ron liên kết của ngày khởi hành sẽ có một trọng số lớn.
> 
![](https://images.viblo.asia/d3704bb4-792c-4bbc-bffb-16edf7c915aa.jpeg)

Mỗi một nơ ron sẽ có một Hàm kích hoạt ([Activation Function](https://en.wikipedia.org/wiki/Activation_function)). Các hàm này sẽ là các thuật toán như: softmax, gaussian.... Một trong những mục đích của nó là để chuẩn hóa output từ nơ ron.
Khi một tập dữ liệu input được truyền qua tất cả các layer của mạng nơ ron, nó sẽ trả về dữ liệu đầu ra thông qua output layer.

## Huấn luyện Neural Network

Để huấn luyện được mạng nơ ron, bạn cần có:
1. Lượng lớn tập dữ liệu (data set)
2. Một máy tính mạnh để tính toán

Trở lại với bài toán dự đoán giá vé máy bay, chúng ta cần dữ liệu về lịch sử của giá vé. Và với số lượng lớn của tập hợp các sân bay, ngày bay, chúng ta cũng cần một lượng lớn tương đương về giá vé.

Để huấn luyện AI, chúng ta cần đưa cấc đầu vào từ tập dữ liệu, sau đó so sánh với đầu ra của nó với đầu ra của tập dữ liệu mẫu. Khi AI chưa được huấn luyện, đầu ra của nó sẽ có thể bị sai.

Khi ta đã hoàn thành với tập dữ liệu, ta có thể tạo một hàm hiển thị độ sai của đầu ra của AI so với đầu ra thực tế. Hàm này được gọi là **Cost Function** . Một cách hiểu đơn giản rằng, ta muốn Cost Function của ta sẽ trả về 0, khi đó đầu ra của AI cũng sẽ giống với đầu ra thực tế  từ tập dữ liệu.

## Làm thế nào để làm giảm cost function?


Ta thay đổi trọng số giữa các nơ ron. Chúng ta có thể chọn ngẫu nhiên để thay đổi cho đến khi cost function là nhỏ nhất, nhưng như vậy cũng không có ích lắm.

Thay vào đó, chúng ta sẽ sử dụng một công nghệ gọi là Gradient Descent.

Gradient Descent là công nghệ cho phép ta tìm giá trị nhỏ nhất của một hàm. Trong trường hợp của ta, chúng ta đang tìm giá trị nhỏ nhất cho cost function. Nó hoạt động bằng cách thay đổi một giá trị rất nhỏ cho trọng số sau mỗi lần lặp trong tập dữ liệu. Bằng cách tính toán đạo hàm của cost function ở một tập trọng số, ta có thể tìm được hướng của cực tiểu.

![](https://images.viblo.asia/a5c7d5a2-d57b-45c3-b9b3-09227562b262.png)


Để giảm tối đa cost function, bạn phải lặp rất nhiều lần trong tập dữ liệu. Đây là lý do tại sao phải cần một khả năng tính toán rất lớn. Cập nhật trọng số sử dụng gradient descent được hoàn thành một cách tự động.

# Kết
* Deep Learning sử dụng một mạng nơ ron để bắt chước trí thông minh của động vật (giống hành động của vật).
* Có 3 loại layer chính của các nơ ron trong mạng nơ ron là: **Input layer**, **Các hidden layer**, **Output layer**.
* Mối liên kết giữa nơ ron được kết hợp với một trọng số, nó chỉ ra được tầm quan trọng của giá trị đầu vào.
* Các nơ ron áp dục một Hàm kích hoạt trên dữ liệu để chuẩn hóa đầu ra cho nơ ron.
* Để huấn luyện một mạng nơ ron, bạn cần một tập dữ liệu lớn.
* Việc lặp lại tập dữ liệu và so sánh các đầu ra sẽ sinh ra cost function giúp chỉ ra sai sót của AI so với đầu ra thực tế.
* Sâu mỗi vòng lặp trong tập dữ liệu, trọng số weight giữa nơ ron sẽ được điều chỉnh bằng Gradient Descent để giảm cost function.