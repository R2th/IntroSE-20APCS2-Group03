Chào các bạn, lần này mình sẽ viết 1 chủ đề mà nhiều bạn Manual test quan tâm đó chính là làm thế nào để có thể thực hiện Automation test mà không cần code, hoặc code gà như mình vẫn có thể thực hiện được

Trong bài này mình sẽ giới thiệu về 1 tool như thế - đó là Selenium-IDE

Các phần mình sẽ giới thiệu trong bài gồm:
- :blowfish: Giới thiệu và cài đặt Selenium IDE
- :green_book: Quản lý test case trong Selenium IDE
- :red_car: Tái sử dụng Testcase trong Selenium IDE

### 1. Giới thiệu và cài đặt
Truy cập trang chủ selenium IDE https://www.selenium.dev/selenium-ide/ và chọn trình duyệt phù hợp, sẽ có Chrome, Firefox và 1 bản file zip để download

Trong bài mình sẽ chọn Chrome là trình duyệt thực hiện bài viết - bạn add extention vào trình duyệt là xong
- Mở tool Selenium IDE lên sẽ thấy hiện lên 1 dialog

![](https://images.viblo.asia/89db5cc7-66e6-4df3-8cd6-d2a4da4cbf92.png)
Gồm các lựa chọn
+ Record 1 kịch bản kiểm thử trong 1 project mới
+ Mở 1 project đã có sẵn
+ Tạo 1 project mới
+ Đóng Selenium IDE

Bây giờ chúng ta thử Record 1 kịch bản mới xem như nào nhé

**B1**: Chọn option đầu tiên và nhập tên project - như mình đặt là Sun_Demo

![](https://images.viblo.asia/4309dd92-7886-47b6-8057-5ce366619ccf.png)

**B2**: Nhập url trang web bạn muốn test - như mình nhập url: https://the-internet.herokuapp.com/ là trang web có nhiều dữ liệu test => Click button START RECORDING

![](https://images.viblo.asia/718dc82d-814c-4290-9c40-a9e525ad8b58.png)

**B3**: Sau khi click button thì trình duyệt sẽ mở đúng url mà bạn nhập. 

![](https://images.viblo.asia/9f076695-46d2-4e72-b655-2b8f0077104b.png)

Nhìn dưới góc phải màn hình bạn sẽ thấy button "Selenium IDE is recording" => điều này có nghĩa là kể từ đây mọi thao tác của bạn trên màn hình sẽ được ghi lại. 

Để mình test thử 1 trang web nha :

{@embed: https://www.youtube.com/embed/k5vayfK8I3g}

Như video trên - mình đã quay lại các bước thực hiện 1 form authenticate và verify kết quả thành công bằng Text 

Sau ghi record xong thì tool Selenium sẽ lưu lại các thao tác mình vừa làm.

Tại đây bạn có thể Replay lại và xem log => kết quả của từng step sẽ hiển thị rất chi tiết
![](https://images.viblo.asia/5dde6003-ba0d-417c-b4ca-7b7f60073910.png)


Sau khi chạy xong 1 kịch bản test bạn có thể lưu lại để lần sau khi cần có thể mở ra chạy lại mà không cần manual test

### 2. Quản lý bộ Test case trên Selenium IDE

Ở bất kỳ tool automation nào đều sẽ hỗ trợ người dùng quản lý Test suit cũng như Test case - thì tool Selenium IDE cũng vậy 

Tương tự như B3 ở phần 1, bạn tạo 1 test case nữa tên là login invalid . Sau đó ta tạo Test suit như sau

![](https://images.viblo.asia/2134cc95-d7e4-4f8e-9da5-6d8bc4db6e78.png)
![](https://images.viblo.asia/57fa8083-3e88-4365-925c-eaa976913407.png)
![](https://images.viblo.asia/c2096dd6-a44a-4f5c-8093-8794020ea119.png)
Sau đó click biểu tượng Replay lại để xem kết quả. 

Lưu lại bộ Test Suite để sử dụng cho lần sau nha bạn

### 3. Tái sử dụng Testcase trong Selenium IDE

Trước kia Selenium chỉ là 1 addon trên trình duyệt Firefox, nhưng sau này có nhiều cải tiến trên nhiều trình duyệt cũng như giao diện đẹp hơn dễ sử dụng hơn

Ở phần này mình sẽ nói về việc tái sử dụng test case trong Selenium IDE

Như 2 phần trên mình đã đề cập đến 2 testcase là login valid và login invalid.

Điểm chung của 2 testcase này là đều nhập username và password sau đó submit button - như vậy thao tác là như nhau, chỉ khác nhau ở kết quả thôi. 

Mình cần làm là tạo 1 testcase trung gian, sau đó login valid và login invalid chỉ cần gọi lại qua testcase trung gian đó là được

Testcase trung gian sẽ bao gồm các bước chung mà 2 test case kia đều có => Còn 2 testcase login valid và login invalid sẽ chỉ giữ lại kết quả 
![](https://images.viblo.asia/6fd60b97-98b6-4bcf-aaf4-169f640fce47.png)
![](https://images.viblo.asia/14e7b09e-c6c7-4718-a485-fee6c01dc57c.png)
![](https://images.viblo.asia/0a8322dd-bf27-4c4c-ac55-d2dc2cc2ddf3.png)

Để chạy được testcase valid và invalid thì cần chạy được testcase trung gian. Vậy tại từng testcase valid và invalid ta thêm command với key là run, và target là tên testcase trung gian (ở đây là login)
![](https://images.viblo.asia/48766921-779f-48e7-a874-b41ca42161a5.png)

Khai báo biến username và password vào từng testcase bằng key: `store`  rồi chạy là OK rồi. chúc bạn thành công nha
![](https://images.viblo.asia/8abcb9d7-99c5-47c4-be86-f572dd346497.png)

![](https://images.viblo.asia/67bf11e8-d7d4-466a-8998-2f58afd62ade.png)

![](https://images.viblo.asia/72690a75-c053-4a05-8297-4a033ff61a1d.png)

Phần tới mình sẽ viết về xử lý điều kiện trong Selenium IDE, mong bạn đón đọc