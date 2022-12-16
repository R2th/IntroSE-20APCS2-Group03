Hẳn các bạn Comtor khi mới bước chân vào nghề IT sẽ khá lạ lẫm với cụm từ  *API* (ngày xưa mình cũng vậy). 
Hỏi các anh Dev thì sẽ được trả lời kiểu dễ hiểu hơn một chút nhưng cũng không hiểu lắm, kiểu như : "API là cái sẽ tiếp nhận yêu cầu từ client, xử lý và trả response lại cho client".

Giải thích từ chuyên ngành bằng một từ chuyên ngành khác thì cũng không khá hơn là mấy.
Vậy thì xem thử cách giải thích sau đây có dễ hiểu hơn chút nào không nhé.

## Application
Để hiểu API là cái gì thì trước hết phải biết khái niệm *Application* đã. Application hay gọi tắt là App, là cái mà các bạn có thể download được từ CH Play hay từ App Store của điện thoại, hay là các App trên Computer như Word, Excel,...

Có nhiều cách phân chia các loại App. Tuy nhiên, nếu phân chia dựa trên tiêu chí "có sử dụng internet hay không" thì có 2 loại App sau đây:
* Stand - Alone App
* Client - Server App

### Stand - Alone App
Là loại app hoạt động độc lập mà không cần kết nối internet. 
Ví dụ như Word, Excel của MicroSoft chẳng hạn 

### Client - Server App

Là loại App mà hệ thống hoạt động của nó được chia thành 2 phần với vai trò riêng biệt là : Server và Client. 

Server nếu dịch tiếng anh ra nghĩa là "nhà cung cấp", chịu trách nhiệm cung cấp thông tin, xử lý các yêu cầu của Client. Client là phía người sử dụng thông thường có thể thao tác trên device (điện thoại) để gửi các yêu cầu đến cho Server. Client và Server được kết nối với nhau thông qua mạng internet.

Ví dụ như khi bạn sử dụng Facebook. Bạn chọn 1 image rồi set nó làm ảnh avatar. Lúc này bạn (Client) sẽ thực hiện các hành động : chọn image -> bấm nút Set làm avatar. Lúc này, yêu cầu "Set image này làm avatar cho tôi nhé" từ Client sẽ gửi đến cho Server bằng internet. Phía Server sẽ thực hiện yêu cầu và trả lại kết quả (response) cho Client cũng thông qua internet. Lúc này kết quả mà Client nhận được chính là image đã được set làm avatar.

Như vậy Server tiếp nhận yêu cầu và trả kết quả lại cho Client như thế nào? Đó chính nhờ những API.
Đa số mỗi hoạt động trên app đều sẽ ứng với một API. Ví dụ khi Client yêu cầu Set avatar thì sẽ chạy API SetAvatar để xử lý yêu cầu setting avatar của user. Nếu Client yêu cầu Login thì sẽ chạy API Login.

Các Server - Client APP sẽ có một số đặc trưng như sau:
* Phân chia tách biệt vai trò giữa Client và Server 
* Nhiều Client, ít Server
* Client và Server kết nối với nhau thông qua internet (kiểu như internet là người truyền tin giữa 2 bên ấy)
* Data xử lý giữa 2 bên phải thống nhất (phải quy ước cách gọi tên chẳng hạn. Ví dụ Server quy định tên API là SetAvatar thì Client phải gọi đúng tên đấy)

Flow làm việc của Server - Client App như sau:
* Client gửi yêu cầu công việc (thông qua việc nhấn một nút nào đó trên device chẳng hạn) 
* Server tiếp nhận và xử lý yêu cầu bằng các API
* Trả kết quả xử lý về cho Client



Rồi bây giờ chúng ta đi sâu vào chuyên ngành hơn 1 tý nữa nhé. Hãy tìm hiểu xem 1 API hoạt động như thế nào.
## Request, Respone, Parameter và các Error Code
Request chính là yêu cầu từ phía Client. Ví dụ khi user nhấn nút Login thì Client sẽ gửi request Login cho Server. Lúc này API Login sẽ được gọi tên và thực hiện công việc của nó.

Nhưng khoan, API login sẽ hoạt theo cơ chế gì? Công việc của API Login chính xác là check xem cái username, password đã input có đúng hay không, có tồn tại hay không thì mới cho login. 

Như vậy, bạn phải hiểu 1 điều rằng API không tự lấy được thông tin của người dùng mà phía Client phải truyền lên cho API. Client sẽ sử dụng parameter để truyền thông tin lên cho API. Ví dụ khi login cần kiểm tra 2 thông tin là username và password thì sẽ có 2 parameter tương ứng để truyền tải 2 thông tin đó.

Sau khi check thông tin Login do Client truyền lên, Server sẽ cho phép login hoặc không. Đây chính là Response của Server.

Việc response của server sẽ được hiểu thông qua các code. Bạn cứ liên tưởng đến trò chơi nói chuyện bằng mật mã lúc nhỏ là chuẩn luôn đấy.
Các code chung thường được sử dụng như sau  :
* Code biểu thị thành công (cho phép login) : 200
* Code lỗi authen (cái này thì nó hơi thiêng về security 1 chút) : 400
* Code lỗi server không chạy : 500
* Code lỗi không tìm thấy (thường dùng trong các request yêu cầu hiển thị một dữ liệu gì đó chẳng hạn, đây là lỗi không tìm thấy dữ liệu đó) : 404

Ngoài ra trong một số trường hợp, để hiển thị message tương ứng vơi từng loại lỗi thì có thể tự quy định thêm code. Người ta gọi đây là các  error code.

Các error code này do Dev quy định với nhau là được. Ví dụ, bạn Dev phía API quy định trường hợp lỗi nhập sai username là code 15 thì bạn Dev phía Client sẽ trả về nội dung message sai username khi thấy trả về error code 15.

## Kết 
Giải thích tới đây thì chắc các bạn cũng hiểu về cơ chế hoạt động giữa Client và Server của 1 app rồi. Cứ làm dần dần rồi các bạn sẽ phân biệt được xử lý nào cần api, xử lý nào không cần đối với các chức năng cơ bản. 

Để nhanh hiểu hơn về cơ chế hoạt động của  API, các bạn có thể tiếp xúc với api thông qua Swagger chẳng hạn. Nếu dự án có sử dụng Swagger thì các bạn có thể nhờ dev hướng dẫn sử dụng, cũng khá đơn giản mà vừa giúp mình hiểu về cơ chế của API, vừa  hiểu thêm về cấu trúc data DB của dự án nữa (data nào thì lưu ở cột nào, table nào).