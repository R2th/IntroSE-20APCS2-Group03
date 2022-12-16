XIn chào các đọc giả thân yêu của Viblo, mình - một dev gà mờ học cái này chưa ăn thua lại đi học cái khác =))

Hôm nay sẽ cùng bạn đi tìm hiểu một thứ được coi là quái gì được sinh ra từ con quái vật "Javascript" - Nodejs.


Nhưng trước khi đi tìm hiểu con quái dị kia thì chúng ta cần có một số kiến thức cơ bản để có thể hiểu sương sương được nó, bao gồm cú pháp của ES6, const, let, this, .... bla bla
Nói chung là mấy cái dị hợm của Javascript. Hoặc bạn có thể tham khảo [bài này](https://viblo.asia/p/javascript-es6-va-nhung-tinh-nang-moi-RnB5pwYDlPG)

Nếu bạn đã có trong tay mấy cái này thì chúng ta sẽ đi tìm hiểu Nodejs. Let's get start =))

## Nodejs là gì?
Theo docs chính thức của nó địng nghĩa: Nó là môi trường lập trình thời gian thực của javascript. Nghe khó hiểu ghê :v
Nó chạy trên javascript đồng nghĩa với việc nó mạnh mẽ, khó hiểu và rất kén người lập trình =)) Vì sao ư ? Vì bản chất của nó là javascript mà. :D
## Sự Hình Thành
Bạn thử tưởng tượng bây giờ không có javascript xem thế nào =)) trang web bạn sẽ "chán" và "tẻ nhạt" tới mức nào. Mình đóng ngoặc ở chán và tẻ nhạt mang cả ý nghĩa cho dev và cho người dùng nhé.

Đó, sự quan trọng của javascript trong thời buổi bây giờ là ko thể phủ nhận với trang web. Sau đó các tiền bối, bao gồm cái ông sáng tạo ra Nodejs - Ryan Dahl mới nghĩ, tạo sao nó ngon và mạnh mẽ thế mà nó chỉ được dùng ở phía client nhỉ, tại sao nó lại ko được sử dụng ở phía server.

Và sau en nờ năm thì đến cuối 2009 thì chúng ta đã có trong tay nodejs - một nhánh được tách thành công từ cỗ máy phiên dịch Javascript V8 trong Google Chrome, cho phép chúng ta chạy Javascript trên servers với cơ chế non-blocking I/O hay non-blocking calls (ngon)
## Đặc Điểm
Trước tiên, vì nodejs được xây dựng trên javascript nên nó sẽ được kế thừa tất cả những gì mà javascript có, bao gồm: 
* Mạnh mẽ
* Linh động: Tối ưu hoá nhằm nâng cao hiệu suất cho lập trình viên.
* Chạy theo kịch bản: dịch tại thời điểm chạy.
* Có thể xây dựng theo có chế hướng đối tượng (trừ tính kế thừa và đa hình)
* Dựa trên nguyên mẫu (prototype-based)

Ngoài các đặc điểm trên thì chưa thể coi nodejs là khác biệt so với tổ tiên javascript của nó được, những cái sau đây mới làm nên thương hiệu của Nodejs
* Realtime: Đúng như định nghĩa, xử lí giao tiếp theo thời gian thực.
* Very Fast: V8 Javascript Engine nên việc thực thi chương trình rất nhanh
* Single thread: Không giống như những ngôn ngữ đa luồng khác, nodejs chỉ có một luồng chạy duy nhất - vòng lặp sự kiện (Event loop). Tất cả các request đi đều chạy vào luồng này để xử lí, giúp tối ưu hóa bộ nhớ và tốc độ.
* None-blocking: Tất cả các API của NodeJS đều không đồng bộ, nó chủ yếu dựa trên nền của NodeJS Server và chờ đợi Server trả dữ liệu về. Việc di chuyển máy chủ đến các API tiếp theo sau khi gọi và cơ chế thông báo các sự kiện của Node.js giúp máy chủ để có được một phản ứng từ các cuộc gọi API trước (Realtime).
* No cache: Gần như ko có đệm thêm gì ở đầu ra, chủ yếu là dữ liệu.

## Nhược Điểm

Như ở trên toàn nói đặc điểm là đặc điểm tốt, ngoài ra cũng chính vì những đặc điểm đó mà nó lại trở thành nhược điểm khi áp dụng vào một số trượng hợp:
* SIngle thread: Do nodejs xây dựng trên cơ chế Event loop, các xử lí đều được sắp xếp vào stacks để gọi ra sau khi đã xử lý nên khi một stack nào đó bị chết hoặc xử lý qúa nhiều thứ bên trong thì sẽ làm cho Event loop đó bị đứng - gọi là trạng thái Block ( Nguy hiểm)
* Nếu áp dụng vào các ứng dụng xử lý logic nhiều thì nodejs tỏ ra khá lù đù do stack bị delay để xử lý nên làm cho ứng dụng ngốn tài nguyên rất nhiều

Thực Hành
Lý thuyết thế là đủ rồi :v Sau đây là một ví dụ nhỏ để mình giải thích mấy cái bên trên theo ý của mình cho các bạn nghe, có gì không đúng mong được chỉ giáo :D

Trước tiên, tất nhiên, chúng ta phải cài môi trường đã, ở đây mình sử dụng Ubuntu nên sẽ dùng nó là demo nhé !

Có hai thứ ta cần cài là nodejs - môi trường và npm - công cụ quản lý thư viện cho js

`sudo apt-get install nodejs && sudo apt-get install npm`

Sau khi chúng ta cài xong hai cái này thì chúng ta đã có thể tạo ra nodejs project rồi đó. Dùng lệnh sau để tạo ra một thư mục làm việc, đặt tên nó là **ahihi**,  sau đó di chuyển vào trong

`mkdir ahihi && cd ahihi`

Sau khi có thư mục xong thì tạo bắt buộc phải tạo ra file package.json. Đây là file cấu hình cũng như quản lý các thư viện của ứng dụng

`npm init`

Nó sẽ hỏi chúng ta một số thông tin cơ bản của ứng dụng, ta cứ điền đầy đủ hoặc để trống cũng được.
Nhìn vào trong file này ta có thể thấy:
* name: Tên của Project
* version: Version của Project
* description: Mô tả cho Project
* main: File chạy chính (chạy đầu tiên) của Project
* scripts: Danh sách các khai báo cấu hình bổ sung cho npm
* author: Tên tác giả của Project
* license: License của Project, giá trị mặc định là ISC.

Ở đây mình sẽ dùng Express - một công cụ mạnh mẽ dùng để code nodejs:

`npm install express --save`

Tiếp theo, ta sẽ tạo ra một file main chạy ứng dụng, thường tên của file này sẽ là app.js hoặc index.js. Nhưng theo mình thì nên đặt là app.js

`touch app.js`

Vào trong file đó chúng ta sẽ cấu hình như sau:
![](https://images.viblo.asia/adf3f5e0-ef5f-4885-a7e8-5892aee8c58b.png)

Nhìn vào từng dòng lệnh:

1. Khai báo var `express = require('express')`
1. Khởi tạo biến` app = express()`
1. Tạo ra route '/' để gửi ra dữ liệu là dòng chữ "Hello World"
1. Cuối cùng là khởi tạo ứng dụng chạy dưới cổng 3000, bạn có thể tùy chỉnh cổng khác nếu muốn

Sau khi cài đặt xong chúng ta sử dụng command sau để chạy ứng dụng: 

`node app.js`

Truy cập vào điệu chỉ: 127.0.0.1:3000 chúng ta sẽ ra được kết quả là dòng chứ Hello World. 

Đó, đơn giản vậy thôi. Bước đầu làm quen với nodejs chúng ta nên từ từ, vì nếu làm quá nhiều thứ sẽ gây khó khăn trong việc ghi nhớ và hiểu sâu, mà js ko hiểu sâu thì về sau chỉ có sml =))

## Kết luận

Qua bài viết này, mình chỉ muốn share lại cho các bạn kiến thức về một chút hiểu biết về nodejs của mình, chắc hẳn sẽ còn nhiều thiếu sót =)) Hi vọng không bị cười chê =)) Ở bài viết sau, nếu vẫn còn đam mê với thứ quái dị nodejs này mình sẽ chuyển nó thành series học nodejs :D

Cảm ơn các bạn đã đọc bài viết !