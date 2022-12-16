# 3. Các loại OS
![](https://images.viblo.asia/a080274d-80c3-4486-8e85-5288a3208733.png)<br>
Bên dưới là đại diện cho một vài OS phổ biến<br>
_ Windows<br>
_ Mac OS<br>
_ iOS<br>
_ Linux<br>
_ Android

Khi lập trình, nếu bạn đã biết về OS đối tượng thì không cần biết cặn kẽ về những OS khác. Tuy nhiên cũng nên nắm được những kiến thức thông thường như là có những loại OS nào.

## 3.1 Windows<br>
![](https://images.viblo.asia/15f073d2-d345-4c3b-9479-f47c8b0d2a97.png)<br>
Windows là OS mà công ty Microsoft phát triển. Trong số những OS đang dùng trên máy tính thì đây là OS có nhiều user nhất trên thế giới.<br>
Thông thường khi nói Windows thì đang chỉ tới "những máy tính đã được install Windows".

Trong Windows, theo như bạn biết thì có rất nhiều version khác nhau như Windows XP, Windows 7, Windows 8, Windows 10.<br>
Vì có nhiều version quá nên việc đề cập đến version cũng khá phiền và Windows cũng đã quá phổ cập rồi nên cũng có lúc gọi máy tính đó mà máy Windows luôn.

Điều này có lẽ là nguyên nhân đánh đồng máy tính và OS với nhau.

## 3.2 Mac OS
![](https://images.viblo.asia/8037ac59-6e89-4f66-96fd-2ba4d7c30e3e.png)<br>
Mac OS là OS do công ty Apple tạo ra. Ở một máy MAC đặc trưng sẽ có thân nhôm màu bạc. Với touch pad có thể thao tác một cách trơn tru hay sự đơn giản và tiện dụng mà Windows không có được đã làm cho nó trở nên phổ biến dạo gần đây.<br>
Giờ đi đến quán cà phê sẽ bắt gặp cảnh nhiều người đang dùng máy MAC.

## 3.3 iOS
iOS là OS mà công ty Apple đã cải tiến lại Mac OS để dùng nó cho các thiết bị di động. Được cài đặt trong iPhone hay iPad... Vốn dĩ được tạo từ Mac OS, và có tính tương thích cao với Mac OS.

Thật sự thán phục với các chức năng và thiết kế được trau chuốt kĩ lưỡng nhằm mang lại sự thuận tiện nhất cho người sử dụng.

## 3.4 Android
![](https://images.viblo.asia/717fdd12-9a14-4606-ab9d-ffe06df98ef0.png)<br>
Là OS mà công ty Google đã cải tiến lại Linux để dùng cho các thiết bị di động. Được đưa vào trong smart phone hay tablet như Xperia, Galaxy.<br>
Tạo nên dựa trên nên tảng Linux với đặc tính có thể cải biến tự do, vì vậy tùy vào nhà sản xuất phát triển smart phone hay tablet mà nó sẽ tích cực được customize, và nhiều thiết bị với những đặc trưng khác nhau sẽ được bán ra. <br>
Đây là 1 điểm hấp dẫn của hệ điều hành Android.

## 3.5 Linux
![](https://images.viblo.asia/fbd6293d-e672-49bb-aa3a-271ead381061.png)<br>
So với Windows và Mac phải bỏ phí thì Linux lại có thể sử dụng miễn phí. Ngoài ra, Linux cũng có đặc trưng là bất kì ai cũng có thể tự do cải biến được.<br>
Vì thế mà nó được sử dụng ở khắp nơi như super computer, robot dùng trong xe hơi hay các ngành khoa học.

Trong số các OS đang được dùng trên server thì đây là OS có lượng user lớn nhất thế giới.

# 4. Chức năng của OS
Cuối cùng, hãy cùng tổng hợp lại các chức năng của OS nào.

## 4.1 Control in/output
![](https://images.viblo.asia/480a6d93-21c6-4c10-8ecc-9343adabc0d8.png)<br>
Đối với thao tác keyboard hay thao tác chuột, thì OS sẽ quản lý những cái như "Đã nhấn vào keyboard nào" "Đã di chuột đi chừng nào" "Có phải đã nhấn vào button trái trên mouse không" bla bla...

Người phát triển app sẽ tiếp nhận những thông tin là "Cái gì đã được nhập vào" "Con trỏ chuột đang ở đâu" "Đã click UI nào trên màn hình", rồi thực hiện truy vấn từ app tới OS để tạo ra những xử lý cần thiết.

Hãy cùng xem về mặt hiển thị màn hình nào. Hiển thị màn hình cũng là một chức năng của OS nên người phát triển app sẽ mượn cái gì đó (trường hợp của Windows được gọi là Window handle hay Device context) để render màn hình từ OS, rồi render ra nhiều thứ khác nhau.

## 4.2 Quản lý công việc
![](https://images.viblo.asia/beab338b-702d-4730-888d-41d81531de07.png)<br>
Những OS gần đây thì thường có thể đồng thời khởi động 2 3 app. Việc khởi động, kết thúc app hay chuyển đổi giữa các app sẽ được OS quản lý.<br>
OS sẽ gửi thông báo cho app thông qua message khi có thay đổi như khởi động, finish, switch app, nên người phát triển sẽ tạo ra những xử lý khi được thông báo.

## 4.3 Quản lý file
![](https://images.viblo.asia/e023d42f-720b-4000-b3bc-02c938403047.png)<br>
Những chức năng như đặt tên cho file, đọc nội dung file, ghi vào file OS cũng sẽ quản lý. Do đó, việc quản lý file cũng cần sử dụng và thao tác với những chức năng của OS.

Tuy nhiên, khác với việc "Quản lý công việc" hay " Control in/output" đề cập ở trên, thì việc quản lý file là chức năng cơ bản trong việc lập trình. Do đó, hầu hết các trường hợp là ngôn ngữ lập trình đã cung cấp chức năng để thực hiện quản lý file rồi, và dù không có ý thức đó là chức năng của OS thì cũng có thể phát triển smooth được.

Tất nhiên, chỉ với chức năng của ngôn ngữ lập trình thôi thì cũng có khi sẽ không đầy đủ nên cũng cần sử dụng chức năng của OS để thực hiện quản lý file.

## 4.4 Chức năng khác
Ngoài ra, OS còn cung cấp nhiều chức năng khác nữa, trong đó có 1 chức năng mà mình muốn giới thiệu - đó là "giao tiếp network". Gần đây ngày càng có nhiều app thực hiện trao đổi data với các server như server HTTP.<br>
Nếu thông qua internet để thực hiện trao đổi data thì sẽ sử dụng phương thức TCP/IP. Khi sử dụng TCP/IP, thì sẽ mượn bên phía OS cái được gọi là socket để trao đổi data.