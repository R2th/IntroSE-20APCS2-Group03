Trong một lần tình cờ vi vu trên mạng, mình có xem một đoạn video giới thiệu về **p5.js**. Trong video đó có sử dụng **p5.js** đề tạo ra các vật thể, các chuyển động nhìn rất thích mắt. Bạn có thể tham khảo trang youtube [The Coding Train](https://www.youtube.com/user/shiffman/playlists) để hiểu rõ hơn về **p5.js**.
# Vậy p5.js là gì?
 ****p5.js**** là một thư viện và tập hợp các công cụ giúp dễ sử dụng ngôn ngữ lập trình JavaScript cho mã hóa sáng tạo. Nó dựa trên [Processing](https://processing.org/), một môi trường mã hóa sáng tạo ban đầu được phát triển bởi Ben Fry và Casey Reas. Một trong những mục tiêu chính của Processing (và các dự án dựa trên Processing) là làm cho nó dễ dàng nhất có thể cho người mới bắt đầu học cách lập trình các ứng dụng đồ họa, tương tác (đồng thời cung cấp các công cụ mạnh mẽ cho các chuyên gia).
 
 Lợi thế của việc sử dụng ngôn ngữ lập trình JavaScript là khả năng sẵn có rộng rãi và hỗ trợ phổ biến: mọi trình duyệt web đều có trình thông dịch JavaScript tích hợp, có nghĩa là các chương trình **p5.js** có thể (thường) chạy trong bất kỳ trình duyệt web nào. Ngoài ra, ngôn ngữ JavaScript được xác định bởi một tiêu chuẩn quốc tế và hầu hết các trình thông dịch JavaScript (bao gồm cả các trình duyệt chạy bên trong trình duyệt web), là mã nguồn mở và có sẵn miễn phí. Không ai 'sở hữu' JavaScript, và bất cứ ai cũng có thể sử dụng nó miễn phí.
 
Một ý tưởng quan trọng khác của quá trình xử lý là việc lập trình tạo các nguyên mẫu phần mềm rất dễ dàng, để thử một ý tưởng mới hoặc xem một cái gì đó có hiệu quả hay không. Vì lý do này, các chương trình Processing (và **p5.js**) thường được gọi là 'bản phác họa.
# Phần mềm nào cần sử dụng
Có một số cách để viết các bản phác họa **p5.js**. Bởi vì **p5.js** chỉ là một thư viện JavaScript, bạn có thể đưa nó vào bất kỳ trang web thông thường nào và thậm chí sử dụng nó cùng với các thư viện JavaScript khác. Hướng dẫn chính thức đề xuất tải xuống trình soạn thảo văn bản riêng biệt (như TextWrangler, Brackets hoặc Notepad ++) và làm việc với mã nguồn p5.js của bạn giống như bất kỳ ngôn ngữ lập trình nào khác. 

Tuy nhiên, chúng ta có thể sử dụng [p5.js web editor](https://alpha.editor.p5js.org/), một môi trường lập trình dựa trên web được xây dựng riêng cho **p5.js**. Nó sẽ hoạt động trong hầu hết mọi trình duyệt web!

# Cấu trúc của [p5.js web editor](https://alpha.editor.p5js.org/)
Khi truy cập [p5.js web editor](https://alpha.editor.p5js.org/), bạn có thể bắt đầu ngay lập tức. Nhưng mình khuyên bạn nên tạo một tài khoản, điều này sẽ cho phép bạn lưu công việc của mình và chia sẻ nó với những người khác. Dưới đây là những gì trình chỉnh sửa web trông giống như và giải thích về các bộ phận chuyển động quan trọng. Cũng có một số tính năng khác của giao diện trình soạn thảo web mà chúng ta sẽ thảo luận sau.

![](https://images.viblo.asia/908eef8e-8b10-49c3-be12-a85418761d04.png)
1. Đây là nơi bạn nhập code **p5.js** của mình
2. Đây là nơi thông báo lỗi từ mã của bạn hiển thị. Bạn cũng có thể sử dụng hàm ***console.log()*** để làm cho văn bản xuất hiện ở đây trong khi chương trình của bạn đang chạy. (Điều này hữu ích cho mục đích gỡ lỗi)
3. Bản phác họa của bạn sẽ hiển thị ở đây
4. Nhấn nút “Phát” (▶) để “chạy” bản phác họa của bạn. Nhấn “Stop” (⬛︎) để chấm dứt bản phác họa.
5. Tên của bản phác thảo của bạn. Nhấp vào biểu tượng bút chì nhỏ ở bên phải tên để chỉnh sửa. (Khi bạn tạo một bản phác họa mới, một tên ngẫu nhiên được tạo cho bạn. Trình soạn thảo web sử dụng thư viện này để tạo tên, nếu bạn tò mò!)

# Một vài ví dụ về p5.js trong việc tạo ra các vật thể
## Vẽ hình ellipse

![](https://images.viblo.asia/9ec4aed1-5797-40e6-acfd-8e324a7fe692.PNG)

Ở trên là ví dụ về việc vẽ một hình ellipse sử dụng** p5.js**. Các bạn có thể xem code ở đây:
[ellipse](https://alpha.editor.p5js.org/trunghieu0211/sketches/HJZcmluAG)

 Nhưng chính xác những gì đã xảy ra? Dưới đây là một số phân tích nhỏ (đơn giản hóa một chút):
 
* **ellipse(50, 50, 60, 60);** là một ví dụ về việc gọi hàm. **p5.js** đi kèm với hàng chục 'hàm' được tích hợp sẵn để thực hiện các tác vụ khác nhau, như vẽ các hình dạng tới màn hình hoặc tính toán các giá trị bằng cách sử dụng các công thức toán học. Học cách lập trình trong **p5.js** chủ yếu là về việc học các lệnh này và những gì chúng làm. Hàm **ellipse**, có tác dụng vẽ một hình elip lên màn hình.
*  **ellipse** là tên của hàm. Các hàm luôn được theo sau bởi một cặp ngoặc đơn; bên trong các dấu ngoặc đơn này là danh sách giá trị được phân cách bằng dấu phẩy. Các giá trị này được gọi là tham số của hàm. Mỗi hàm sử dụng các tham số của nó theo một cách hơi khác, và một phần của việc học một hàm là học các tham số của nó là gì.
*   Trong trường hợp của hàm **ellipse**, tham số đầu tiên là tọa độ X của hình elip, tham số thứ hai là tọa độ Y, tham số thứ ba là chiều rộng của hình elip và tham số cuối cùng là chiều cao của hình elip.
*    Cuộc gọi hàm kết thúc bằng dấu chấm phẩy. Bạn nên đặt dấu chấm phẩy ở cuối mỗi cuộc gọi hàm.
*    Bạn có thể đặt nhiều cuộc gọi hàm như bạn muốn trong **function draw ()**

Bạn có thể tìm thấy một danh sách lớn các hàm **p5.js** trong [p5.js reference](https://p5js.org/reference/). Hiện tại, ta sẽ chỉ tập trung vào các chức năng đơn giản nhất để vẽ hình dạng cho màn hình.
## Vẽ hình chữ nhật
Tương tự, để vẽ hình chữ nhật, ta sử dụng hàm **rect()**.  Bạn có thể tham khảo đoạn code ở đây [rect](https://alpha.editor.p5js.org/trunghieu0211/sketches/SyCIgWdCG)

![](https://images.viblo.asia/e70b556a-d17d-4ba7-9d80-29fc140b7945.PNG)

 Hàm **rect ()** vẽ một hình chữ nhật lên màn hình. Các tham số cho hàm chữ nhật có ý nghĩa sau:
*  tham số 1: tọa độ X của hình chữ nhật
*  tham số 2: tạo độ Y của hình chữ nhật
*  tham số 3: chiều rộng của hình chữ nhật 
*  tham số 4: chiều cao của hình chữ nhật

Ngoài ra, bạn có thể tham khảo hàm **rect()** với nhiều tham số khác ở đây [rect](https://p5js.org/reference/#/p5/rect)

## Vậy trong trường hợp vẽ cả hai hình trên thì sao nhỉ?
Giờ ta sẽ vẽ cả hai hình trong 2 ví dụ trên xem như thế nào nhé. Bạn có thể tham khảo đoạn code ở đây [shapes](https://alpha.editor.p5js.org/trunghieu0211/sketches/HyeJGbd0f)

![](https://images.viblo.asia/4c63627b-ef2c-4d97-bc03-eb9d12b6193c.PNG)

Như quan sát, ta thấy hình chữ nhật được vẽ chồng lên hình elip. Việc này được giải thích như sau, các hàm được gọi theo thứ tự giống như chúng được vẽ. Điều đó có nghĩa là hình chữ nhật được vẽ trên đầu hình elip. Nếu bạn đảo ngược thứ tự của các lệnh, hình elip sẽ được vẽ lên trên đầu thay vào đó:

![](https://images.viblo.asia/2d353e4e-50ca-4662-8214-762fc1f1e911.PNG)

## Background color

Để vẽ màu nền, ta sử dụng hàm **background()** thiết lập màu nền cho toàn bộ bản vẽ. Gọi nó đầu tiên trong khối **draw ()**, như sau:

![](https://images.viblo.asia/cfd30840-9155-4253-996d-d3b809b34f9f.PNG)

Màu sắc được chỉ định theo màu RGB, HSB hoặc HSL tùy thuộc vào colorMode hiện tại. (Không gian màu mặc định là RGB, với mỗi giá trị trong phạm vi từ 0 đến 255). Phạm vi alpha theo mặc định cũng là 0 đến 255.  Bạn có tham khảo nhiều tùy chọn của màu nền tại đây [background color](https://p5js.org/reference/#/p5/background) tại đây.
# Tổng kết
Như vậy ta đã tìm hiểu sơ qua được về **p5.js**, về một vài hàm mà **p5.js** hỗ trợ trong việc ta tạo ra vật thể một cách dễ dàng. Mình sẽ cố gắng tìm hiểu thêm về thư viện này và chia sẻ cho các bạn trong các bài viết tiếp theo. Cảm ơn các bạn đã dành thời gian đọc bài viết của mình! 

**(To be continued)**
# Tham khảo
https://p5js.org/

https://creative-coding.decontextualize.com/first-steps/

[The Coding Train](https://www.youtube.com/user/shiffman/playlists)