Đây là một trong những bài hướng dẫn khá quan trọng để nắm được công cụ kiểm thử tự động Selenium IDE. Nội dung chính trong bài viết này sẽ tập trung vào việc thực thi các tính năng, hiểu các nguyên tắc cơ bản khi record, sử dụng các câu lệnh sẵn có trong tool để tạo ra một kịch bản kiểm thử tự động. 

Để tạo ra 1 bộ kịch bản bằng Selenium IDE, chúng ta có thể sử dụng 1 trang web mà bạn mong muốn test ví dụ như 1 trang mạng xã hội: http://login.me.zing.vn. 

## Tạo kịch bản Selenium IDE đầu tiên.

Toàn bộ quá trình tạo ra kịch bản Selenium IDE được chia làm 3 phần:

***Phần 1:*** Recording - Selenium IDE hỗ trợ người dùng ghi lại các tương tác của người dùng với trình duyệt. Các hoạt động được ghi lại đó tạo nên kịch bản lệnh Selenium IDE.

***Phần 2:*** Playing back - Trong giai đoạn này, chúng ta sẽ thực thi các kịch bản đã được ghi lại để xác minh và kiểm soát độ ổn định và tỷ lệ thành công của kịch bản.

***Phần 3:*** Saving - Khi ghi được một kịch bản ổn định, chúng ta có thể lưu lại để chạy hoặc test hồi quy trong tương lai.

### Phần 1: Record một kịch bản test
Kịch bản: 
* Mở trang web: http://login.me.zing.vn/
* Check title của website
* Thực hiện đăng ký tài khoản
* Xác minh login thành công.

1. Bước 1: Khởi động Firefox và chạy Selenium IDE.
2. Bước 2: Nhập địa chỉ website vào thanh Url "http://login.me.zing.vn/". Khi mở Selenium, mặc định nút Record đang được bật.

![](https://images.viblo.asia/d0f7177d-efa9-47ae-b588-e20541c4db9b.jpg)

3. Bước 3: Click "Đăng ký tài khoản" để mở màn hình nhập thông tin người dùng
4. Bước 4: Xác minh title của website mở đã chính xác chưa bằng cách kích chuột phải trên màn hình trang hiện tại, kích "Show All Available Commands" và kích tiếp "assertTitle Zing ID - Zing Passport - Tài khoản Zing của VNG". 

![](https://images.viblo.asia/bce068c5-1bcd-4f1d-9f94-93cc70c6c495.jpg)

Hiển thị lệnh trên màn hình record

![](https://images.viblo.asia/82441f96-730c-46ac-aa02-756bb49cac1e.jpg)

5. Bước 5: Nhập đầy đủ thông tin trên trang. Sau đó kích "Đăng ký" để thoàn thành thao tác. 

![](https://images.viblo.asia/c70e55fb-6dca-431f-aa46-5eb292248ee6.jpg)

6. Bước 6: Xác minh đăng nhập thành công, hiển thị trang chủ với title là "anhnt2605 trên Zing Me". Thao tác tương tự như bước 4.
7. Bước 7: Click btn Record để dừng việc ghi kịch bản.

![](https://images.viblo.asia/a0606e17-2e9c-4861-8ef1-746963192b11.jpg)

### Phần 2: Chạy lại và thực thi kịch bản kiểm thử

Sau khi tạo được một kịch bản với Selenium IDE, chúng ta sẽ thực thi nó để thấy kịch bản có ổn định hay không. Click vào nút Play back để chạy kịch bản. Lưu ý đây là chức năng đăng ký mới do đó khi chạy lại bạn hãy thay đổi lại tên đăng nhập để tránh bị trùng lặp. Đồng thời việc thiết lập speed chậm lại sẽ tránh lỗi và dễ theo dõi hơn.

![](https://images.viblo.asia/4cc5ba4f-2f94-4b8c-ab06-72bf81a3359c.jpg)

Sau khi thực hiện, tất cả các bước kiểm thử sẽ được highlight màu xanh đối với những case thành công. 

![](https://images.viblo.asia/2079ccd9-218b-45b7-ac95-d82713e24373.jpg)

Với các trường hợp test case lỗi hoặc thực thi không thành công, các bước kiểm thử lỗi sẽ được highligh màu đỏ. Và Pane test case cũng sẽ đánh dấu các test case thực thi lỗi.

![](https://images.viblo.asia/6e0b7ee9-9c2b-4d2f-85d4-87e5ff44e749.jpg)

### Phần 3: Lưu kịch bản kiểm thử

Cần lưu lại kịch bản ngay sau khi chúng ta chạy lại kịch bản thành công.

**Bước 1:** Để lưu kịch bản test, click vào menu File và chọn "Save Test Case"

![](https://images.viblo.asia/406feede-01f3-468d-8cfd-2541f8627b99.jpg)

**Bước 2:** Hệ thống sẽ nhắc chúng ta xác định vị trí sẽ lưu kịch bản và đặt tên cho kịch bản đó. Ví dụ tên kịch bản là "Login_Zing" và click vào nút "Save".

Kịch bản kiểm thử có thể được tìm thấy ở vị trí đã đưa ra ở bước trên. Lưu ý rằng kịch bản kiểm thử được lưu dưới dạng HTML.

![](https://images.viblo.asia/e4cf824a-8366-42ee-ab32-e5be71c74980.jpg)

## Sử dụng các tính năng thông dụng của Selenium IDE

**Cài đặt tốc độ thực hiện**

Trong khi kiểm thử các ứng dụng web, chúng ta có thể bắt gặp các trường hợp như sau một thao tác thì trang sẽ được load lại. Quá trình load có thể nhanh hoặc chậm, tùy vào yếu tố môi trường: tốc độ máy, tốc độ mạng. Do đó page có thể chưa kịp mở lại nhưng thao tác thứ hai đã thực hiện.

Để tránh lỗi như trên xảy ra trong khi đang Play back kịch bản, chúng ta có thể thiết lập tốc độ chậm hơn. 

![](https://images.viblo.asia/ca52a9b9-1f95-4bf5-8b25-8d37154fa084.jpg)

**Sử dụng "Execute this command"**

Seleniium IDE cho phép người dùng thực hiện từng bước kiểm thử đơn lẻ trong một bộ kịch bản mà không cần chạy toàn bộ. "Execute this command" là một lựa chọn để thực hiện được mong muốn trên.

"Execute this command" có thể được sử dụng khi chúng ta muốn debug hoặc xem lại hành vi của một bước kiểm thử cụ thể.

3 cách sử dụng "Execute this command" như sau:
1. Sử dụng tab Actions từ thanh Menu, sau khi click vào step cần chạy.

![](https://images.viblo.asia/7fb7e095-5614-4803-af01-a024c1b86d7a.jpg)

2. Sử dụng phím tắt "X".
3. Chuột phải vào bước kiểm thử muốn thực hiện và chọn "Execute this command".

![](https://images.viblo.asia/5295a072-f658-499c-b551-5b2381b918be.jpg)

4. Click đúp bước kiểm thử cần check.

Lưu ý: mở đúng trang web hoặc màn hình sẽ thực hiện bước kiểm thử để tránh các nguy cơ lỗi. Ví dụ chạy lệnh input vào trường Tên đăng nhập thì cần mở đúng màn hình nhập thông tin chứ không phải màn hình Trang chủ...

**Sử dụng Start point**

Selenium IDE cho phép người dùng chọn một step bất kỳ để bắt đầu chạy trong một kịch bản test.

Start point có thể được sử dụng khi chúng ta không muốn thực hiện toàn bộ kịch bản từ đầu tiên.

Start point có thể được thiết lập và hủy bỏ theo 3 cách sau:

1. Sử dụng tab Actions từ thanh Menu

![](https://images.viblo.asia/49b0fa21-e337-4a7d-b649-2d253dce6d29.jpg)

2. Sử dụng phím tắt "S"
3. Chuột phải vào bước kiểm thử và chọn "Set/Clear Start Point". 

![](https://images.viblo.asia/a9704c09-27aa-4965-ab81-56fb9a6a6107.jpg)

Lưu ý:
* Chỉ có duy nhất 1 Start point trong 1 kịch bản
* Start point có thể xóa bằng các thao tác tương tự như khi thiết lập
* Người dùng chịu trách nhiệm sử dụng đúng kịch bản, mở đúng môi trường trên trình duyệt.

**Sử dụng Break point**

Selenium IDE cho phép người dùng tạo ra điểm dừng trong một kịch bản test. Break point là điểm sẽ dừng thực thi kịch bản.

Break point được sử dụng khi chúng ta muốn dừng thực thi để xác minh một phần thao tác mà không phải chạy đến cuối kịch bản.

Break point có thể được thiết lập và xóa theo 3 cách sau:
1. Sử dụng Action tab trên thanh Menu.
2. Sử dụng phím tắt "B".
3. Chuột phải ở 1 bước kiểm thử và chọn "Toggle Breakpoint".

![](https://images.viblo.asia/939bb15f-f7ca-4dc2-b0b8-79f88b4524d4.jpg)

Selenium IDE cho phép người dùng áp dụng nhiều điểm breakpoint trong một kích bản. Khi  phần đầu của kịch bản được thực thi, nó sẽ dừng khi gặp điểm breakpoint. Để thực hiện các bước kiểm thử tiếp theo, người dùng được yêu cầu thực hiện từng bước kiểm thử một cách rõ ràng.

Lưu ý:
* Có thể tạo nhiều điểm Break point trên cùng 1 kịch bản
* Break point có thể xóa bỏ giống như các cách thiết lập nó

**Sử dụng nút Find**

Một trong những phần quan trọng nhất của kịch bản test Selenium IDE là tìm và định vị được các phần tử web trên 1 trang. Đôi khi, những phần tử có thuộc tính giống như liên kết với chúng, khiến cho người dùng rất khó xác định được phần tử web.

Để giải quyết vấn đề này, Selenium IDE cung cấp nút Find - được sử dụng để xác định giá trị định vị được cung cấp trong hộp Target là thực sự chính xác và xác định
...........

**Sử dụng các Format khác**

Chuyển đổi các kịch bản kiểm thử Selenium IDE sang các ngôn ngữ lập trình khác.

Selenium IDE hỗ trợ chuyển định đạng của kịch bản sang một ngôn ngữ lập trình khác từ format mặc định là HTML. Các kịch bản đã chuyển đổi sẽ không thể chạy lại bằng Selenium IDE, chỉ trừ khi chúng ta chuyển lại về HTML. Do đó việc chuyển đổi sẽ mang lại lợi ích khi chúng ta muốn thực thi kịch bản này trên các tool khác của bộ Selenium

Bước 1 - Click vào Tab Options trên thanh Menu và chọn Format. Hộp danh sách các ngôn ngữ lập trình sẽ hiển thị, chúng ta kích vào ngôn ngữ muốn chuyển đổi. Hoặc Click File > Export Test Case As...

![](https://images.viblo.asia/23e87fea-7bc5-4281-80d2-c231421b3785.jpg)

Lưu ý: sau khi cài đặt có thể nhiều bạn không thấy list danh sách Format trong Options tab. Các bạn hãy truy cập  Tab Options > Options... và tích vào "Enable experimental features". Click OK sẽ hoàn thành việc show format.

Bước 2 - Ngay sau khi chọn được ngôn ngữ cần chuyển đổi, hộp thoại xác nhận sẽ hiển thị với nội dung: khi chuyển đổi kịch bản sẽ không thể chạy lại bằng Selelnium IDE. Các thay đổi có thể sẽ mất và bạn sẽ phải copy paste kịch bản vào một trình soạn thảo để lưu. Một lời khuyên đưa ra: chúng ta nên tạo ra một bản copy khác trước khi thực hiện chuyển đổi. Click "OK" để tiếp tục việc chuyển đổi.

![](https://images.viblo.asia/446513e0-338b-4cb9-88ff-f06dd6963408.jpg)

Kịch bản đã chuyển đổi theo Java Format có thể chạy bằng Selenium WebDriver. Lưu ý: các thay đổi, chỉnh sửa kịch bản không nên thực hiện ở tab Source View, bởi tool có thể đưa ra một số lỗi.

## Lệnh Selenium IDE

Mỗi bước kiểm thử của Selenium IDE có thể chia thành 3 phần như sau:

* Command - lệnh
* Target - mục tiêu/ đối tượng
* Value - giá trị

![](https://images.viblo.asia/0dba10ab-3983-4820-8a8d-3d7174362295.jpg)

Các loại câu lệnh của Selenium IDE

Có 3 loại câu lệnh được chia thành các nhóm sau:
* Actions
* Accessors
* Assertions

**Actions**

Đó là những câu lệnh tương tác trực tiếp với ứng dụng bằng cách thay đổi trạng thái hoặc truyền các dữ liệu kiểm thử.

Ví dụ: câu lệnh "type" - cho phép người dùng tương tác trực tiếp với phần tử của web như ô textbox. Nó cho phép nhập một giá trị cụ thể vào textbox và khi truyền giá trị nào thì sẽ hiển thị chính xác giá trị đó.

Trong trường hợp lệnh dạng Action bị thất bại, toàn bộ phần kịch bản sau đó cũng sẽ dừng lại và không thực hiện tiếp nữa. 

**Accessors**

Là những câu lệnh cho phép người dùng lưu trữ các dữ liệu vào các biến do người dùng tự định nghĩa. Các giá trị được lưu trữ có thể được sử dụng để xác nhận/ xác minh sau này.

Ví dụ: lệnh "storeAllLinks" sẽ đọc và lưu tất cả các hyperlinks tồn tại trong 1 trang web vào 1 biến do người dùng tự định nghĩa. Nếu có nhiều giá trị cần lưu, chũng ta có thể sử dụng các biến dạng mảng.

**Assertions**

Cũng gần tương tự như Accessors, sẽ không phải là các tương tác trược tiếp với ứng dụng, Assertions được sử dụng để xác minh các trạng thái hiện tại của ứng dụng với trạng thái mong muốn. Các dạng của Assertions:
1. ***"Assert":*** để chắc chắn rằng thực hiện kiểm thử sẽ kết thúc trong trường hợp thất bại
1. ***"Verify":*** cho phép Selenium IDE tiếp tục thực hiện kịch bản ngày cả khi việc xác minh bị lỗi.
2. ***"Wait for":*** là lệnh chờ cho đến khi 1 điều kiện nhất định nào đó được đáp ứng trước khi thực hiện bước tiếp theo. Điệu kiện này giống như kiểu chờ page load thành công, các phần tử được hiển thị. Loại lệnh này vẫn cho phép thực hiện các bước tiếp theo ngay cả khi điều kiện không được đáp ứng trong khoảng thời gian cho phép.

**Các câu lệnh thường dùng**

| Command | Mô tả | Đối số |
| -------- | -------- | -------- |
| open | Mở ra một đường link cụ thể trên trình duyệt. | 1 |
| assertTitle, VerifyTitle | Trả về title của trang web hiện tại và so sánh nó với 1 title cụ thể. | 1 |
| assertElementPresent, verifyElementPresent | Xác minh/ xác nhận sự xuất hiện của 1 phần tử trên web. | 1 |
| assertTextPresent, verifyTextPresent | Xác minh/ xác nhận các text hiện có trên 1 trang web. | 1 |
| type, typeKeys, sendKeys | Nhập 1 giá trị (dạng String) vào 1 phần tử cụ thể trên web. | 2 |
| Click, clickAt, clickAndWait | Kích vào 1 phần tử web cụ thể trên trang. | 1 |
| waitForPageToLoad | Tạm dừng việc thực hiện cho đến khi trang load thành công. | 1 |
| waitForElement Present | Tạm dừng thực hiện cho đến khi hiển thị 1 phần tử cụ thể. | 1 |
| chooseOkOnNext, Confirmation, chooseCancelOn, NextConfirmation | Kích vào button "OK" hoặc "Cancel" khi hộp xác nhận tiếp theo hiển thị. | 0 |

Một số câu lệnh để xử lý cho các loại control đặc biệt, có thể xem thêm bài viết sau: https://viblo.asia/p/selenium-ide-cach-xu-ly-voi-tung-loai-control-maGK7zdL5j2

## Tổng kết

Sau đây là một số nội dung chính trong bài hướng dẫn này.
* Kịch bản test của Selenium IDE có thể tạo ra bằng việc sử dụng tính năng Record và Playback
* Tạo kịch bản có thể chia thành 3 quy trình: Recording, Playing back và Saving.
* Selenium IDE cho phép người dùng thực hiện các bước kiểm thử đơn lẻ mà không cần chạy toàn bộ bằng cách sử dụng "Execute this comand".
* Tốc độ thực hiện của kịch bản được thiết lập trên thanh toolbarr.
* Người dùng có thể tự xác định điểm 1 điểm "Start point" để chạy kịch bản thay vì chạy từ đầu. Lưu ý cần mở ra đúng màn hình thực hiện bước đó để tránh lỗi.
* Người dùng có thể thiết đặt nhiều điểm "Break points" để tạm dừng thực thi kịch bản ở 1 bước nhất định.
* Người dùng có thể tìm và xác nhận xem giá trị target có chính xác là phần tử trên web không bằng cách sử dụng nút Find.
* Thay đổi source view sang định dạng khác không được khuyến khích vì nó có thể gây ra mất dữ liệu.
* Hãy luôn lưu lại 1 bản Script dạng HTML trước khi chuyể đổi sang các định dạng khác.
* Selenium có 3 loại lệnh chính: Actions, Accessors và Assertions.
* Actions: sẽ tương tác trực tiếp với ứng dụng và thay đổi trạng thái của nó.
* Accessors được sử dụng để lưu trữ các thuộc tính của 1 phần tử trong 1 biến do người dùng tự định nghĩa.
* Assertions được sử dụng để kiểm tra xem điều kiện nào đó có đáp ứng hay không.
* Assertions được phân loại nhỏ hơn như các câu lệnh verify, assert và waitFor.
* Cần xác minh rằng việc thực thi kịch bản sẽ không bao giờ bị dừng thậm chí nếu việc xác minh thất bại.
* Assert sẽ không cho thực thi tiếp kịch bản trong trường hợp bị thất bại
* WaitFor: chờ trong 1 khoảng thời gian quy định để chắc chắn điều kiện được đáp ứng.
* Một số lệnh Selenium IDE thường dùng:
  *    open
  *    assertTitle / VerifyTitle
  *    AssertForElementPresent / VerifyForElementPresent
  *    AssertForTextPresent / VerifyForTextPresent
  *    type / typeAndWait / sendKeys
  *    click /clickAt / clickAndWait
  *    waitForPageToLoad
  *    waitForElementPresent
  *    chooseOkOnNextConfirmation / chooseCancelOnNextConfirmation

Nguồn: https://www.softwaretestinghelp.com/selenium-ide-script-selenium-tutorial-3/