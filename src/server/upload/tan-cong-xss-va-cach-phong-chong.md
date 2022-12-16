Tính đến thời điểm tháng 3/2018 trên toàn thế giới đã có khoảng 1,8 tỷ trang web. Những trang web thuộc nhiều đối tượng, trong đó có các tổ chức chính quyền, các tập đoàn kinh tế lớn, các cá nhân có ảnh hưởng, …Khi bị tấn công vào bảo mật thì một website sẽ có nguy cơ sụp đổ, kéo theo đó là ảnh hưởng rất lớn đến tổ chức hay cá nhân sở hữu website này. XSS là loại tấn công phổ biến nhất và đang thực sự đe dọa tới rất nhiều người dùng web hiện nay, do đó mình viết bài này để giúp mọi người có cái nhìn về loại hình tấn công lày :D . 

## **I. Khái niệm**
Cross - Site Scripting hay còn được viết tắt là XSS là một kỹ thuật tấn công bằng cách chèn
vào những website động (ASP, PHP,CGI,…) những thẻ HTML hay những đoạn mã script
nguy hiểm có thể gây hại cho những người sử dụng khác. Trong đó những đoạn mà nguy
hiểm thường được viết bằng các Client Site Script như: JavaScript, Jscript, DHTML và cũng
có thể là các thẻ HTML.
Ví dụ:
```
http://www.xxx.vn//index.php?pg=news&cat=<script>alert(“LỗiXSS”)</script>
```
Theo đó hacker đã sử dụng lỗ hổng XSS để chèn thêm đoạn mã Javascript nhằm phục vụ
mục đích riêng.![](https://images.viblo.asia/24a5212c-e9a3-4fb3-bdb5-c33e93103c3b.gif)
## **II. Phân loại XSS**

### *1. Non-persistent*

Non-persistent (hay reflected) XSS là một loại XSS phổ biến nhất.
Loại này xuất hiện khi dữ liệu được cung cấp từ một web client nào đó. Hacker khi muốn
tấn công thì điều đầu tiên là sẽ phải tìm ra lỗ hỗng bảo mật trên website bằng cách gắn
một đoạn mã test vào web client để web client gửi đến web server và chờ phản hồi của
web server để tìm ra lỗ hổng bảo mật.
Hacker tấn công dựa vào sự thiếu chú ý về việc lọc dữ liệu vào từ URL của webiste. 
![](https://images.viblo.asia/6016fd6b-2ece-47b5-b07f-483b96365415.png)
### *2. Persistent XSS*
Loại XSS này xảy ra khi dữ liệu do các hacker cung cấp được lưu trữ trên các máy chủ
thông qua một số chức năng trên website và từ đó về sau thì các dữ liệu này hiển nhiên
được hiển thị một cách bình thường trên các trình duyệt của người dùng mà không cần
tới HTML riêng nữa. Khi người dùng click vào những phần bị gắn mã độc thì đã bị dính
XSS.
![](https://images.viblo.asia/9aaa1faa-4b83-4a52-b205-54fdebde03ef.png)

## **III. Các phương thức tấn công**

### *1. Đánh cắp Cookies người dùng:*
Cookie là một bộ nhắc nhở mà website lưu trữ ở trên máy tính của bạn có thể định danh cho bạn.  Nếu không có cookie bạn sẽ phải nhập lại thông tin của mình trên mỗi màn hình web. Thông tin duy nhất mà cookie lưu trữ là thông tin mà bản thân bạn chia sẻ với website tạo ra cookie. Cookie có thể chứa rất nhiều thông tin quan trọng như phiên làm việc của bạn. Nếu hacker có đoạn cookie chưa phiên làm việc của bạn, rất có thể hacker sẽ có khả năng đăng nhập vào website dưới tư cách của bạn mà không cần biết mật khẩu.

## *2. Tấn công qua mạng Intranet:*

Hầu hết chúng ta tin rằng trong khi lướt Web mình đã được bảo vệ bởi tường lửa, cách ly thông qua lớp địa chỉ IP riêng. Với sự hiểu biết này, giả sử các phần mềm bảo mật của những trang Web mạng nội bộ và giao diện Web dựa trên các thiết bị định tuyến router, hệ thống tường lửa, IP Phone…. thì ngay cả khi các bản vá lỗi chưa được cập nhật chúng ta vẫn an toàn trong khu vực được bảo vệ bởi các phần mềm bảo mật trên, điều này có vẻ không khả thi lắm. Trình duyệt Web hoàn toàn có thể được kiểm soát bởi bất kỳ trang web nào, cho phép người dùng trở thành tâm điểm cho các cuộc tấn công mạng nội bộ. Khi truy cập vào một Website có chứa phần mềm độc hại với các đoạn mã JavaScript, nó có thể cấu hình lại một cách tự động router hay tường lửa từ đó tạo thành một đường hầm thông ra thế giới mạng bên ngoài.

![](https://images.viblo.asia/1f17d6b2-749b-4f59-a122-2c2d44141628.png)

Các bước khai thác:

* Bước 1: Một nạn nhân truy cập vào một trang Web độc hại hoặc nhấn vào một liên kết không rõ ràng, sẽ bị nhúng mã JavaScript chứa phần mềm độc hại, sau đó sẽ kiểm soát trình duyệt của họ.
* Bước 2: Mã độc JavaScript Malware sẽ tải một ứng dụng trên nền Java Applet và làm lộ ra địa chỉ IP của nạn nhân thông qua NAT IP.
* Bước 3: Sau đó sử dụng trình duyệt của nạn nhân như một nền tảng để tấn công, mã độc JavaScript sẽ xác định máy chủ Web trên mạng nội bộ.
* Bước 4: Phát động tấn công chống lại các Web nội bộ hoặc Web bên ngoài, thu thập thông tin đánh cắp được và gửi ra mạng bên ngoài.

### *3. XSS Defacements:*
Có hai loại XSS Defacement: liên tục và không liên tục 

Mức độ nghiêm trọng của XSS Defacement liên tục là cao hơn so với XSS Defacement không liên tục vì những kẻ tấn công có thể sẽ thay đổi vĩnh viễn thông tin các trang bị tấn công như sửa đổi nội dung, đánh cắp một số thông tin cá nhân của người dùng. Mặc dù kẻ tấn công không có quyền truy cập trực tiếp vào hệ thống tập tin tại nơi trang Web bị lỗi XSS. XSS Defacement không liên tục thường dễ dàng tìm kiếm và thực thi nhưng để nó làm việc attacker sẽ đánh lừa người dùng qua một URL cụ thể.
Khái niệm XSS Defacement về cơ bản cũng tương tự như các loại hình tấn công XSS khác. Tuy nhiên thay vì tiêm những đoạn mã JavaScript để thực thi và chuyển thành dữ liệu cookie hoặc chiếm đoạt quyền kiểm soát trình duyệt, attacker sẽ tiêm những đoạn mã làm thay đổi cấu trúc, nội dung ban đầu của Website. 


## **IV. NGĂN CHẶN XSS**

### *1. Lọc*
Có hai khái niệm cơ bản về quá trình lọc (filter) XSS: lọc đầu vào (input filtering) và lọc đầu ra (output filtering). Cách sử dụng phổ biến nhất là lọc đầu vào. Input Filtering được xem là chính xác hơn so với Output Filtering, đặc biệt trong trường hợp XSS Reflected. Tuy nhiên có một sự khác biệt nhỏ, quá trình lọc đầu vào áp dụng cho tất cả các loại dữ liệu, loại bỏ những nội dung không hợp lệ trong khi lọc đầu ra chỉ mang tính áp dụng lại, mục đích bài trừ các loại mã độc còn xót lại. 

Có hai loại thanh lọc dữ liệu đầu vào và đẩu ra: ***White-List Filtering*** và ***Black-List Filtering***

**Black-List Filtering**

Lọc dữ liệu được định nghĩa sẵn trong 1 danh sách cho trước, khi gặp 1 yêu cầu không
hợp lệ sẽ hủy, không thực hiện yêu cầu. Ưu điểm là dễ cấu hình, triển khai nhưng nhược
điểm là khi xuất hiện một cuộc tấn công kiểu mới (chưa được định nghĩa trong black-list)
thì không thể phát hiện và ngăn chặn cuộc tấn công.

**White-List Filtering**

Cho phép quy định sẵn trước 1 danh sách hợp lệ, chỉ có những yêu cầu thuộc danh sách
này mới được thực hiện. Vì thế ngăn chặn được các kiểu tấn công mới, nhược điểm là
khi có một ứng dụng mới được phát triển thì cũng phải được cập nhật trong White-List.
Tuy nhiên White-List Filtering bảo mật hơn so với Black-List Filtering.

### *2. Input Encoding*
Mã hóa đầu vào có thể trở thành một vị trí trung tâm cho tất cả các bộ lọc, đảm bảo chỉ có một điểm duy nhất cho tất cả các bộ lọc.

Mã hóa phía máy chủ là một tiến trình mà tất cả nội dung phát sinh động sẽ đi qua một hàm mã hóa nơi mà các thẻ script sẽ được thay thể bởi mã của nó. Nói chung, việc mã hóa (encoding) được khuyến khích sử dụng vì nó không yêu cầu bạn phải đưa ra quyết định những kí tự nào là hợp lệ hoặc không hợp lệ.Tuy nhiên việc mã hóa tất cả dữ liệu không đáng tin cậy có thể tốn tài nguyên và ảnh hưởng đến khả năng thực thi của một số máy chủ.

### *3.Output Encoding*

Mục đích của việc mã hóa đầu ra (vì nó liên quan Cross Site Scripting) là chuyển đổi đầu
vào không tin cậy vào một hình thức an toàn, nơi đầu vào sẽ được hiển thị như dữ liệu
cho người sử dụng mà không thực hiện được như đang trong trình duyệt.  ( cái này khá đa dạng, các bạn có thể tìm hiểu thêm sau :D )

###  *4.Sử dụng thư viện*
Hiện nay có rất nhiều thư viện giúp ta ngăn ngừa XSS, chúng giúp ta thực hiện các bước
ngăn chặn XSS như đã liệt kê ở trên.
Thậm chí là các framework để làm web cũng đã tích hợp sẵn rất nhiều các công nghệ chống loại hình tấn công này, tuy nhiên tất cả là không đủ nếu chung ta không có sự hiểu biết.

## **V. CHỐT LẠI**
Không giống như các vấn đề liên quan đến bảo mật khác, XSS không thể loại bỏ trong một thời gian ngắn.Tuy nhiên , một tấn công XSS chỉ thực hiện được khi gửi một trang web cho trình duyệt web của nạn nhân có kèm theo mã script độc của kẻ tấn công. Vì vậy những người phát triển web có thể bảo vệ website của mình khỏi bị lợi dụng và xâm hại. 

***Nguồn: nhiều nguồn trên google :D .***