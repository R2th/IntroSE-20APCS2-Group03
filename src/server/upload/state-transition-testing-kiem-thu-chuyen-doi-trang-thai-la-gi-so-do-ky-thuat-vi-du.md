## State Transition Testing - Kiểm thử chuyển đổi trạng thái là gì?
Kiểm thử chuyển đổi trạng thái là một kỹ thuật kiểm thử hộp đen trong đó các thay đổi được thực hiện trong điều kiện đầu vào gây ra thay đổi trạng thái hoặc thay đổi đầu ra trong Ứng dụng đang kiểm thử (AUT). Kiểm tra chuyển đổi trạng thái giúp phân tích hành vi của một ứng dụng cho các điều kiện đầu vào khác nhau. Testers - Người kiểm thử có thể cung cấp các giá trị kiểm thử đầu vào tích cực và tiêu cực và ghi lại hành vi của hệ thống.

Nó là mô hình dựa trên hệ thống và các bài test. Bất kỳ hệ thống nào mà bạn nhận được một đầu ra khác cho cùng một đầu vào, tùy thuộc vào những gì đã xảy ra trước đó, đều là một hệ thống trạng thái hữu hạn.

Kiểm thử chuyển đổi trạng thái rất hữu ích khi bạn cần test các chuyển đổi hệ thống khác nhau.

## Khi nào thì sử dụng chuyển trạng thái?
* Điều này có thể được sử dụng khi Tester đang test ứng dụng cho một bộ giá trị đầu vào hữu hạn.

* Khi Tester đang cố gắng test chuỗi sự kiện xảy ra trong ứng dụng. Tức là, điều này sẽ cho phép Tester kiểm tra hành vi ứng dụng cho một chuỗi các giá trị đầu vào.
* Khi hệ thống đang thử nghiệm có sự phụ thuộc vào các sự kiện / giá trị trong quá khứ.

## Khi nào không nên dựa vào chuyển trạng thái?
* Khi việc kiểm thử không được thực hiện đối với các kết hợp đầu vào tuần tự.
* Nếu việc test được thực hiện cho các chức năng khác nhau như exploratory testing - Kiểm thử khám phá

## Bốn phần của sơ đồ chuyển đổi trạng thái
Có 4 thành phần chính của Mô hình chuyển đổi trạng thái như dưới đây

1) **Các trạng thái** mà phần mềm có thể nhận được

![](https://images.viblo.asia/aee97948-7e75-4a9b-a81c-c8a0803a9999.png)


2) **Chuyển đổi** từ trạng thái này sang trạng thái khác

![](https://images.viblo.asia/8a79cdf1-9d89-4ad4-a15f-e8b344e4da86.png)



3) **Các sự kiện** bắt nguồn sự chuyển đổi như đóng tệp hoặc rút tiền

![](https://images.viblo.asia/1e2b8e99-10ba-42f2-8ce9-758c74b9fd96.png)

4) **Các hành động** phát sinh từ quá trình chuyển đổi (thông báo lỗi hoặc được trao tiền mặt.)

![](https://images.viblo.asia/adb7e6b5-3d36-43f5-bc1a-2936aa5f7270.png)

## Sơ đồ và Bảng chuyển trạng thái
Có hai cách chính để biểu diễn hoặc thiết kế chuyển trạng thái đó là biểu đồ chuyển trạng thái và bảng chuyển trạng thái.

Trong sơ đồ chuyển đổi trạng thái, các trạng thái được hiển thị trong các boxed texts và quá trình chuyển đổi được biểu diễn bằng các mũi tên. Nó còn được gọi là Biểu đồ trạng thái hoặc Đồ thị. Nó hữu ích trong việc xác định các chuyển đổi hợp lệ.

Trong bảng chuyển đổi trạng thái, tất cả các trạng thái được liệt kê ở phía bên trái và các sự kiện được mô tả ở trên cùng. Mỗi ô trong bảng đại diện cho trạng thái của hệ thống sau khi sự kiện đã xảy ra. Nó còn được gọi là State Table. Nó hữu ích trong việc xác định các chuyển đổi không hợp lệ.

## Cách Thực hiện Chuyển đổi Trạng thái (Ví dụ về Chuyển đổi Trạng thái)
**Ví dụ 1:**

Hãy xem xét một chức năng của hệ thống ATM trong đó nếu người dùng nhập mật khẩu không hợp lệ ba lần, tài khoản sẽ bị khóa.

**Sơ đồ chuyển đổi trạng thái**

![](https://images.viblo.asia/44f4edc1-b6cd-470a-a3cd-24cd01648fb5.png)

Trong hệ thống này, trong bất kỳ lần thử nào nếu người dùng nhập mật khẩu hợp lệ trong ba lần thử đầu tiên, người dùng sẽ đăng nhập thành công. Nếu người dùng nhập mật khẩu không hợp lệ trong lần thử đầu tiên hoặc lần thứ hai, người dùng sẽ được yêu cầu nhập lại mật khẩu. Và cuối cùng, nếu người dùng nhập sai mật khẩu lần 3 , tài khoản sẽ bị khóa.

### Sơ đồ chuyển đổi trạng thái

Trong sơ đồ, bất cứ khi nào người dùng nhập mã PIN chính xác, sẽ được chuyển sang trạng thái được cấp quyền truy cập và nếu nhập sai mật khẩu, sẽ được chuyển sang lần thử tiếp theo và nếu làm như vậy trong lần thứ 3 thì tài khoản sẽ đạt đến trạng thái bị khóa.

Bảng chuyển đổi trạng thái

| | **Mã PIN chính xác** | **Mã PIN không chính xác** |
| -------- | -------- | -------- |
| **S1) Bắt đầu**     |   S5     | S2     |
| **S2) Lần thử thứ nhất**     | S5     | S3     |
| **S3) Lần thử thứ 2**     | S5     | S4     |
| **S4) Lần thử thứ 3**     | S5     | S6     |
| **S5) Quyền truy cập được cấp**     | -     | -     |
| **S6) Tài khoản bị khóa**     | -     | -     |


Trong bảng khi người dùng nhập đúng mã PIN, trạng thái được chuyển sang S5 được cấp Quyền truy cập. Và nếu người dùng nhập sai mật khẩu, sẽ được chuyển sang trạng thái tiếp theo. Nếu làm như vậy lần thứ 3 , anh ta sẽ đến trạng thái bị khóa tài khoản.

**Ví dụ 2:**
Xem video này, trước khi bạn tham khảo ví dụ bên dưới:
{@embed: https://www.youtube.com/watch?v=_Udjai_6b9Y&ab_channel=Guru99}

Trong màn hình đăng nhập đặt chỗ chuyến bay, bạn phải nhập chính xác tên đại lý và mật khẩu để truy cập ứng dụng đặt chỗ chuyến bay. 

**Biểu đồ chuyển đổi trạng thái**
![](https://images.viblo.asia/30e21f70-0451-4945-ae42-4591a4a67b6f.png)



Nó cung cấp cho bạn quyền truy cập vào ứng dụng với mật khẩu và tên đăng nhập chính xác, nhưng điều gì sẽ xảy ra nếu bạn nhập sai mật khẩu.

Ứng dụng cho phép ba lần thử và nếu người dùng nhập sai mật khẩu ở lần thử thứ 4, hệ thống sẽ tự động đóng ứng dụng.

Biểu đồ trạng thái giúp bạn xác định các chuyển đổi hợp lệ sẽ được kiểm tra. Trong trường hợp này, việc kiểm tra với mật khẩu chính xác và mật khẩu không chính xác là bắt buộc. Đối với các test scenarios, Bất cứ a cũng có thể là Tester với cách làm là cố gắng đăng nhập lần thứ 2,3, 4.

Bạn có thể sử dụng Bảng trạng thái để xác định các chuyển đổi hệ thống không hợp lệ.

![](https://images.viblo.asia/97970029-18e9-44e8-b331-b9f044fc6249.png)

Trong Bảng trạng thái, tất cả các trạng thái hợp lệ được liệt kê ở phía bên trái của bảng và các sự kiện gây ra chúng ở trên cùng.

Mỗi ô đại diện cho hệ thống trạng thái sẽ chuyển đến khi sự kiện tương ứng xảy ra.

Ví dụ, trong khi ở trạng thái S1, bạn nhập mật khẩu chính xác, bạn sẽ được đưa đến trạng thái S6 (Đã cấp quyền truy cập). Giả sử nếu bạn nhập sai mật khẩu ở lần thử đầu tiên, bạn sẽ được đưa đến trạng thái S3 hoặc Thử lần 2.

Tương tự như vậy, bạn có thể xác định tất cả các trạng thái khác.

Hai trạng thái không hợp lệ được đánh dấu bằng cách sử dụng phương pháp này. Giả sử bạn đang ở trạng thái S6 tức là bạn đã đăng nhập vào ứng dụng và bạn mở một phiên bản đặt chỗ chuyến bay khác và nhập mật khẩu hợp lệ hoặc không hợp lệ cho cùng một đại lý. Cần kiểm tra phản ứng của hệ thống cho một tình huống như vậy.

## Ưu điểm và nhược điểm của kỹ thuật chuyển đổi trạng thái


|Ưu điểm | Nhược điểm |
| -------- | -------- | 
| Kỹ thuật test này sẽ cung cấp một biểu diễn bằng hình ảnh hoặc dạng bảng về hành vi của hệ thống, điều này sẽ giúp người thử nghiệm bao quát và hiểu được hành vi của hệ thống một cách hiệu quả.     | Nhược điểm chính của kỹ thuật kiểm tra này là  không thể dựa vào nó mọi lúc. Ví dụ, nếu hệ thống không phải là một hệ thống hữu hạn (không theo thứ tự tuần tự) thì không thể sử dụng kỹ thuật này.     | 
| Bằng cách sử dụng thử nghiệm này, Tester kỹ thuật có thể xác minh rằng tất cả các điều kiện được bao quát và kết quả được chụp (lưu giữ) lại  | Một bất lợi khác là bạn phải xác định tất cả các trạng thái có thể có của một hệ thống. Mặc dù điều này hoàn toàn phù hợp đối với các hệ thống nhỏ, nhưng nó sẽ sớm chia thành các hệ thống lớn hơn vì có một số trạng thái tăng dần theo cấp số nhân.     | 

## Tóm lược:

* Kiểm thử Chuyển đổi trạng thái được định nghĩa là kỹ thuật kiểm tra trong đó các thay đổi trong điều kiện đầu vào gây ra các thay đổi trạng thái trong Ứng dụng đang Kiểm tra.
* Trong Kỹ thuật phần mềm, Kỹ thuật kiểm thử chuyển đổi trạng thái rất hữu ích khi bạn cần kiểm tra các chuyển đổi hệ thống khác nhau.
* Hai cách chính để biểu diễn hoặc thiết kế chuyển trạng thái, Biểu đồ chuyển trạng thái và Bảng chuyển trạng thái.
* Trong sơ đồ chuyển đổi trạng thái, các trạng thái được hiển thị trong cácboxed texts và quá trình chuyển đổi được biểu diễn bằng các mũi tên.
* Trong bảng chuyển đổi trạng thái, tất cả các trạng thái được liệt kê ở phía bên trái và các sự kiện được mô tả ở trên cùng.
* Ưu điểm chính của kỹ thuật kiểm tra này là nó sẽ cung cấp một cách biểu diễn bằng hình ảnh hoặc dạng bảng về hành vi của hệ thống, điều này sẽ giúp người kiểm tra bao quát và hiểu được hành vi của hệ thống một cách hiệu quả.
* Nhược điểm chính của kỹ thuật kiểm tra này là chúng ta không thể dựa vào nó mọi lúc.


>  *Bài viết được dịch lại từ nguồn*: https://www.guru99.com/