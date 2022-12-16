Trong bài viết này, mình sẽ giới thiệu về Application Programming Interfaces, hay gọi tắt API. Cụ thể, mình sẽ giới thiệu các nội dung: API là gì, thư viện API, API REST, bao gồm: Request và Response. 

### 1. API là gì?

Một API cho phép hai phần mềm nói chuyện với nhau. Ví dụ: bạn có một chương trình, một số dữ liệu và một số các phần mềm thành phần khác. Khi đó bạn cần sử dụng API để liên lạc với các phần mềm khác. 
Bạn không cần phải biết API hoạt động như thế nào, bạn chỉ cần biết đầu vào và đầu ra của nó. 
![](https://images.viblo.asia/be8219dc-4bb4-46ad-a8b5-32ae6a9a9d11.png)

Ví dụ như thư viện Pandas. Pandas được coi là một phần mềm thành phần. Chúng ta sử dụng API PANDAS để xử lý dữ liệu bằng cách liên lạc với các phần mềm thành phần khác. 
Hay tenorflow, được viết bằng C ++. Có các API riêng biệt trong Python, JavaScript, C ++ Java và Go. API chỉ đơn giản là giao diện. Ngoài ra còn có nhiều API do tình nguyện viên phát triển cho Tensorflow; Ví dụ Julia, Matlab, R, Scala, và nhiều hơn nữa. 

### 2. Rest API
REST API  là một loại API phổ biến khác. Chúng cho phép bạn giao tiếp bằng internet, tận dụng lưu trữ, truy cập dữ liệu lớn hơn, thuật toán trí tuệ nhân tạo và nhiều tài nguyên khác. RE là viết tắt của "Representation - đại diện", S là viết tắt của "State - trạng thái", T -t là viết tắt của "Transfer-Chuyển nhượng". Trong REST API, program của bạn được gọi là "client." API giao tiếp với một dịch vụ web mà bạn gọi qua internet. Một tập hợp các quy tắc giao tiếp, input hay còn gọi là request và output hay còn gọi là response. 

Dưới đây là một số thuật ngữ liên quan đến API phổ biến:
Program, hay code của bạn, có thể được coi là một client. 
Dịch vụ web được gọi là resources. 
Client tìm resources thông qua một endpoints. 
Client gửi request đến resource và phản hồi cho client. 
Các phương thức HTTP là một cách truyền dữ liệu qua Internet, chúng nói với các API còn lại phải làm gì bằng cách gửi requesst. 
Request thường được truyền thông qua HTTP message, nơi chứa nội dung JSON gồm các hướng dẫn cho hành động mà chúng ta muốn service thực hiện. Hành động này được truyền đến service web qua Internet. 
Tương tự, service web trả về repsonse thông qua HTTP message, trong đó thông tin thường được trả về bằng tệp JSON. Thông tin này được trả lại cho client.

#### Tham khảo từ quyển Getting Started with Data Science của IBM