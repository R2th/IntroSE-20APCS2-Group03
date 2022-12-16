- Bạn đã thử sử dụng Selenium IDE cho kiểm thử tự động chưa? 
- Có rất nhiều sự kỳ thị xung quanh việc sử dụng các công cụ ghi và phát lại như Selenium IDE thay vì các công cụ kiểm thử tự động khác như Selenium Webdo, Cypress và WebdoIO. Và đúng như vậy, theo như truyền thống các công cụ đó có các nhược điểm sau:

    1. No cross-browser support
    2. Brittle tests
    3. No easy way to wait for app under test
    4. No conditional logic
    5. No way for one test script to call another
    6. No way to embed code into recorded scripts
    7. No way to edit scripts once recorded
    8. No script debugger
    9. No way to run scripts in parallel
    10. No way to run tests from Continuous Integration build scripts
    11. No way to integrate with source code control systems
    12. No plugins to extend functionality
    13. No way to do visual UI testing
    14. Poor support for responsive web
    15. No way to quickly diagnose front-end bugs
    16. No way to export tests to languages like Java
    17. No way to have data-driven tests

- Trên tất cả Selenium IDE từng thống trị vài năm trước đây. Nhưng cho đến bây giờ, thì dường như đã bị lãng quên. Nếu có ai đó hỏi bạn có sử dụng selenium IDE không, chắc chắn câu trả lời là Không, tôi không điên =))
- Nhưng với Selenium IDE 2019, bạn có thể phải xem xét lại (quaylen) 
- Dưới đây là 16 lý do tại sao nê sử dụng và 2 lý do tại không.

### 1. Selenium IDE is no longer dead

- Trở lại năm 2017, Selenium IDE đã ngừng phát triển. Firefox 55 đã không hỗ trợ Selenium IDE nữa 

    => Selenium IDE bị khai tử.
- Không lâu sau, các nhà phát triển ở Applitools đã tiếp cận cộng đồng Selenium để xem có thể giúp đỡ như thế nào. Nhận được sự hưởng ứng từ cộng đồng, các nhà phát triển đã quyết định đưa Selenium IDE trở lại. 
- Vì vậy, họ đã giúp tân trang phần lớn mã Selenium IDE, hiện có sẵn miễn phí trên GitHub theo giấy phép Apache 2.0, được quản lý bởi cộng đồng Selenium, và được hỗ trợ bởi hai kỹ sư toàn thời gian, một trong số họ đã viết cuốn sách về Selenium testing.

![](https://images.viblo.asia/c71bb8f1-db91-4272-a5bd-65e8a40a3ee9.png)

- Kết quả là, Selenium IDE đã trở lại. Bạn có tin tôi không? Hãy xem biểu đồ này về việc sử dụng Selenium IDE trên Chrome - nó đang tăng trưởng đều đặn.

![](https://images.viblo.asia/48864ac8-7b32-4f51-aaef-6556513e99f7.png)

### 2. Selenium IDE is now cross-browser

- Selenium ra mắt lần đầu tiên vào năm 2006. Khi đó Firefox là trình duyệt duy nhất trên các hệ điều hành. Chrome hai năm sau đó mới ra đời. 
- Vì vậy, không có gì ngạc nhiên khi Selenium IDE đã đưa chiếc xe của mình lên Firefox. 
- Thật không may, nó vẫn như vậy trong hơn một thập kỷ, khiến người dùng thất vọng với sự hỗ trợ của một trình duyệt. 

- Và 2019, Selenium IDE  có sẵn trên Chrome trên [Google Chrome Extension](https://chrome.google.com/webstore/detail/selenium-ide/mooikfkahbdckldjjndioackbalphokd)

- Thậm chí tốt hơn, Selenium IDE có thể chạy thử nghiệm trên các máy chủ Selenium WebDriver. Bạn có thể thực hiện việc này bằng cách sử dụng trình chạy thử nghiệm dòng lệnh Selenium IDE, được gọi là SIDE Runner. 

  ![](https://images.viblo.asia/cad759ae-da61-492f-99c2-2137a028a3fd.png)

- Bạn có thể nghĩ về SIDE Runner như là các yếu tố pha trộn của Selenium IDE và Selenium Webdo. Nó lấy một tập lệnh Selenium IDE, được lưu dưới dạng tệp .side và chạy bằng trình điều khiển trình duyệt như ChromeDriver, EdgeDriver, Firefox Nott geckodriver, IEDriver và SafariDriver.

### 3. Selenium IDE tests are no longer brittle
 
- Thay vì việc bạn phải tự tìm kiếm location của các đối tượng như trước, Selenium IDE 2019 hộ trợ bạn các gợi ý lấy location theo các khác nhau ở mục Target. Do đó bạn có thể dễ dàng, linh hoạt trong việc phát triển và bảo trì.
 
 ![](https://images.viblo.asia/18dd21f6-3bf0-4d8e-a9f8-8b87393104b0.png)
 
###  4. Selenium IDE is now better at waiting for your app

 -  Khi làm việc với kiểm thử tự động, chắc chắn bạn đã từng gặp trường hợp báo lỗi do không tìm được element. 
 -  Một trong nguyên nhân chủ yếu là do thời gian chạy quá nhanh, dẫn đến element chưa kịp load xong đã chuyển sang bước khác. 
 -  Để khắc phục điều này Selenium 2019 đã thiết lập các câu lệnh
     -   `set speed`
     -    `pause` 
     -    `wait for element editable`
     -     `wait for element not editable`
     -      `wait for element not present` 
     -      `wait for element not visible`
     -       `wait for element present` 
     -       `wait for element visible`

### 5. Selenium IDE now has conditional logic

- Trước đây, không có conditional logic việc xử lý những tình huống có điều kiện là không thể. Ví dụ nếu thông báo hiện ra thì ấn nút OK.
- Selenium IDE 2019 đã được cải thiện và có thể xử lý được mọi tình huống có điều kiện như trên. Thật dễ dàng với các câu lệnh dưới đây: 
- `if, else if, else, end`
 ![](https://images.viblo.asia/83274a48-8755-4ae9-811a-2e0452d0ccb7.png)
- `times, end`

    ![](https://images.viblo.asia/9ba278de-377b-4cc9-b9e3-0e31cf32c7d0.png)

- `do, repeat if`
- `while, end`
 
     ![](https://images.viblo.asia/761856f7-8db9-4dbf-b307-a65f47766b64.png)
 
###  6. Selenium IDE now supports modular test scripts

- Cũng giống như application code, test scripts cần phải được mô đun hóa. Tại sao?
- Nhiều tập lệnh thử nghiệm của bạn sẽ có các bước để đăng nhập vào ứng dụng của bạn, đăng ký tài khoản và đăng xuất khỏi một ứng dụng. Nó lãng phí thời gian để tạo lại các bước thử nghiệm đó nhiều lần.

    ![](https://images.viblo.asia/5cdce8ed-ec6f-4b8b-b375-e75467df2a08.png)

Selenium IDE 2019 có câu lệnh `run script` để làm điều đó. Để hiểu rõ hơn bạn hãy xem demo tại [đây](https://www.youtube.com/watch?time_continue=43&v=ohimk8ViyJQ), đảm bảo bạn sẽ phải ngạc nhiên đó.

### 7. Selenium IDE now supports embedded code

- Do Selenium IDE API không làm mọi thứ, nên Selenium IDE 2019 có thêm các câu lệnh `execute script` và `execute async script` cho phép bạn gọi một đoạn mã javascript.
- Điều này cung cấp cho bạn một sự linh hoạt to lớn bằng cách có thể tận dụng tính linh hoạt của Javascipt và các thư viện của javascript.
- Để sử dụng bạn chỉ cần chọn Insert new command và chọn  `execute script` hoặc `execute async script`

    ![](https://images.viblo.asia/dac19181-efe8-4f45-8209-e1e791025249.png)

### 8. Selenium IDE scripts now can be edited

- Trong Selenium IDE cũ, các script là không thể chỉnh sửa. Với IDE Selenium 2019, bạn có thể dễ dàng sửa đổi các kịch bản của mình. Chèn, sửa đổi và xóa các lệnh, như bạn có thể thấy dưới đây. 

    ![](https://images.viblo.asia/b6b8ec54-458e-4fcb-8522-398b3d21894e.png)
    
### 9. Selenium IDE now has a debugger

- Selenium IDE 2019 bạn có thể debug

### 10. Selenium IDE now can run scripts in parallel

- Selenium IDE trước đây, bạn chỉ có thể chạy 1 - 1. Điều này làm cho việc chạy các test case mất nhiều thời gian hơn.  Các lựa chọn thay thế như Selenium Grid chỉ khả dụng khi được sử dụng với Selenium WebDriver.
- Selenium IDE 2019 có thể chạy thử nghiệm song song. Điều này cho phép bạn chạy các thử nghiệm của bạn nhanh hơn nhiều. Bạn có thể tham khảo tại [link](https://www.seleniumhq.org/selenium-ide/docs/en/introduction/command-line-runner/)

### 11. Selenium IDE now can be run from CI build scripts

### 12. Selenium IDE scripts can be managed in a code repository

### 13. Selenium IDE is now extensible with plugins

### 14. Selenium IDE now can do visual UI testing

### 15. Selenium IDE can now visually test responsive web apps

### 16. Selenium IDE now help pinpoint the cause of front-end bugs

**=> 6 lý do cuối cùng mình sẽ giới thiệu vào bài tiếp theo, các bạn nhớ theo dõi nha**

## Link thảm khảo:
- [Selenium IDE 2019 document](https://www.seleniumhq.org/selenium-ide/docs/en/introduction/getting-started/)

- [16 Lý do Selenum IDE 2019 hồi sinh](https://medium.com/@applitools/16-reasons-why-to-use-selenium-ide-in-2019-and-2-why-not-201b0b9d7b68)