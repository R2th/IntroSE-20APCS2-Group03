Hai trong số những thách thức lớn nhất các QA phải đối mặt trong team agile, đó là theo kịp các dev  để tự động hoá các function mới, và thử thách còn lại là có kĩ năng technical đủ tốt để có thể viết được tốt code automation.

Đa số các kỹ sư automation test, đó là am hiểm và thành thục cũng như dành thời gian lớn để code automated scripts với ngôn ngữ lập trình họ thành thục nhất.

Tính tới thời điểm hiện tại thì đây là vấn đề chung, và nếu delivery team chủ yếu là C# trong khi dev và automated test chủ yếu được viết bằng Java bởi các QA, vậy thì team member với hiểu biết về Java có thể đóng góp và maintain framwork.

Hãy làm quen với Subject 7, một script-free và nền tảng Autiomation test SaaS dựa trên Cloud được thiết kế để giúp các non-technical tester cũng như các Automation tester nhằm tạo ra end-to-end automated test.

Sử dụng Subject7 mang tính trực quan cao, bạn có thể tạo ra những scenario test tự động trong khoảng thời gian ngắn và quan trọng nhất là đây là ngôn ngữ mà bất kỳ ai cũng có thể đóng góp.

Sau đây là tổng quan của một số tính năng hữu ích trên nền tảng automation test mạnh mẽ này:
・Test repository cho toàn bộ automated và manual testcase.
・Hỗ trợ API Testing, Browser Testing, Native Mobile App Testing, Sikuli Test và hơn thế nữa.
・Tạo và thực hiện test nhanh chóng
・Test Parameter và Data Driven
・Module hoá các bước test
・Clould run, thực hiện theo lịch có sẵn và gửi thông báo
・Báo cáo test và lưu lại video

# Test Library

Bạn có thể sắp xếp tác vụ test theo phân cấp, với các folder hoàn toàn tách biệt với các dự án. Ở mỗi folder, bạn có thể tạo test suites để lưu trữ các test scenario liên quan, và với mỗi test suite, bạn có thể tạo ra các test case.

Một trong những tính năng rất tuyệt vời trên Subject7 tool đó là nó có thể đóng vai trò như là test repository cho manutal test cũng như automation test. Khi bạn tạo test case, bạn có thể chọn test manual hay automated.

![](https://images.viblo.asia/e7437f28-c574-4acb-949d-454429384442.png)

# Wizard

Trung tâm của nền tảng Automation test Subject7 là một trình hướng dẫn thông minh giúp bạn tạo ra tất cả các loại action. Với hơn 70 lựa chọn, thì trình hướng dẫn này có thể tạo ra Selenium WebDriver Test, Appium Test, API test, và thậm chí cả Sikuli test, các branch có điều kiện, các vòng lặp, và cả query database! Tất cả và không phải viết một dòng code nào.


Trình wizard có thể tự động tạo bộ định vị phần thử bằng thuật toán tạo XPath độc quyền. Vô cùng mạnh mẽ!

![](https://images.viblo.asia/d8f46e4a-896d-47ab-ad7a-0b7fa4650933.png)


# Test Creation nhanh chóng

Một trong những tính năng mạnh mẽ và hữu ích khác của tool đó là có thể tạo các bước test ví dụ như chạy test case. Bạn có thể hình dung rằng khi chạy một test case dài, nếu trường hợp phát sinh lỗi, hoặc bạn đã code định vị không chính xác, bạn phải bắt đầu hoàn toàn lại từ đầu.

Với khả năng tạo các bước test như chạy test case, bạn có thể giảm thời gian debug và tiến hành test từng bước. Điều này đảm bảo khi bạn thực hiện test một khối lượng lớn, ít nhất sẽ không xảy ra script failure.

# Test Parameter và Data Driven

Một trong những phương thức luyện tập tốt trong bất kì automated test scripts nào đó là lưu trưx ngoài test data để có thể dễ dàng sửa đổi mà không cần thay đổi script.

Ngoài ra, sẽ có rất nhiều lúc bạn sẽ phải chạy những test case với khối lượng data lớn, vẫn được gọi là Data Driven Testing. Subject7 support hoàn toàn những tính năng này bằng các tính năng Data Template và Data Sets được tích hợp sẵn.

Bạn có thể upload file định dạng CSV cho data test hoặc có thể tạo data test trực tiếp trên tool. Bạn có thể liên kết test data của bạn tới bất kì test case nào.

Tính năng này vô cùng hữu ích ví dụ như khi bạn muốn chạy phần test trên dev, staging và thậm chí trên môi trường pre-prod. Bạn có thể tham số hoá và định nghĩa các môi trường trên các Data Template và gọi chúng trên từng bước test.

![](https://images.viblo.asia/9dbc287e-df15-4187-9c1a-27ed17f26446.png)


# Nhóm các bước test

Khi bạn tạo một test suite với nhiều test case, có khả năng một số test steps sẽ bị trùng lặp, khi đó chúng sẽ bị lặp lại trong rất nhiều test scenario.

Subject7 cho phép bạn tạo những chức năng bằng cách nhóm các test step có thể được tái sử dụng trong các script khác, làm giảm thời gian rework và tăng cường khả năng đọc.

# Local Run và Cloud Run

Khi bạn phát triển các test scenario, bạn thường chọn local run để test và debug các test step của chính bạn. Điều này giới hạn chạy trên một luồng duy nhất trên máy local host và browser được chọn.

Giống như hầu hết các nhà cung cấp PaaS, Subject7 cũng support chạy trên cloud và điều này trở nên thực sự thú vị.

Sử dụng Cloud run, bạn có thể thực hiện test song song và chạy các test cáse trên nhiều Máy ảo và Browser.

Việc thực hiện test cũng có thể lên lịch trình để chạy vào một thời gian cụ thể, ví dụ như hàng ngày lúc 5 giờ chiều. Bạn có khả năng theo dõi trực tiếp status của các test đang chạy và nhận thông báo với bất kì event nào (Ví dụ như failure hay timeout).

Cloud run không có nghĩa rằng bạn không thấy những test tự động đang được chạy! Sau khi một test case được chạy xong, bạn có thể dễ dàng click vào button video trên mỗi hàng status test và nhìn thấy việc chạy test tự động khi nó được thực thi trên máy ảo. Điều này thực sự hữu ích khi có một test tự động bị fail và bạn muốn lưu lại evidence cho bug report.

![](https://images.viblo.asia/675d1ce4-2aec-489c-b8ea-52b56d414191.png)
Đây là một bài học nhỏ cho việc sử dụng Subject7 để tạo automated test, tuy nhiên, khi vượt qua các thử thách ban đầu, thì việc test các pack khối lượng lớn có thể trở nên nhanh chóng và việc maintain cũng vô cùng dễ dàng.


Nguồn: https://www.testingexcellence.com/subject7-saas-test-automation-platform/