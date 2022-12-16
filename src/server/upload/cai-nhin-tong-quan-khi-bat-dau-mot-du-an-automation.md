Bước đầu tìm hiểu về Automation Testing, chắc hẳn ai cũng gặp khó khăn và "rối bời".
Dưới đây là những kiến thức cơ bản sẽ giúp chúng ta có cái nhìn tổng quan về những việc cần làm khi bắt đầu một dự án automation.

Chúng ta có một bài toán đặt ra như sau:

Chúng ta có các test cases để test chức năng cho một website nào đó: web app đó có thể là một trang quản trị, một trang web bán hàng online, hay là bất kỳ các ứng dụng web nào khác mà chúng ta cần phải test…

Các test case chức năng này được chuẩn bị để chúng ta thực hiện manual test. Tất nhiên, chúng ta phải thực hiện test từng test case một cho đến khi xong bộ test case đó, từ việc setup precondition, input testdata, đến việc so sánh kết quả thực tế và kết quả mong đợi có tương ứng với nhau hay không để đánh pass – fail cho từng test case đó.

Yêu cầu dành cho chúng ta là sẽ automate được nhiều test case nhất có thể!

Vậy thì làm thế nào? Cùng xem lời giải dưới đây để biết được các thành phần chính trong project, từ đó định hướng được các công việc chúng ta cần phải làm nhé!

## 1. Tạo automation project
Đầu tiên chúng ta tạo một project – Có thể sử dụng IDE là Eclipse và sau đó add hai thư viện này vào project đó:

- Selenium Webdriver library: Thư viện hỗ trợ tương tác với trình duyệt thông qua web brower.
- Một thư viện dùng trong unit test như TestNG: Thư viện này giúp bạn có thể tạo được các script automation độc lập.
Trong project, có các tầng (layer), mỗi tầng chỉ giao tiếp với tầng trước và kế tiếp nó theo thứ tự như dưới đây:
![](https://images.viblo.asia/625461b7-5247-46c7-bd60-c1d75d6c8fe8.jpg)

Ba layer trên cùng thường thì sẽ được tổ chức thành các package khác nhau đó là:
- Test classes package
- Page object classes package
- Framework classes package

## 2. Tạo các class page object
Tương ứng với mỗi web page được chia trong bộ test case, bạn sẽ tạo một page object cho nó.

Page object class thực thi các tương tác người dùng trên một trang web cụ thể, nó bao gồm các thông tin về trường dữ liệu (field) và các method.

Các trường dữ liệu của page object bao gồm:
- Title
- Ulr
- Locator của các web elements
- Và các thông tin đặc trưng khác của page ví dụ như: source page, sub title,…
Các method được sử dụng để:
* Cung cấp thông tin về webpage và các element:
 + Page title
 + Page url
 + Value của các label
 + Kiểm tra element đó có enable hay không, có thể selected hay không
* Thực hiện các tương tác trên page như:
 + Click vào một element cụ thể nào đó
 + Input text vào textbox
 + Select options của checkboxes hay listboxes
Các test script của chúng ta sẽ sử dụng các thông tin trong page object này. Từ đó page object sẽ sử dụng các hàm trong classes framework của project để tiến hành thực thi các tương tác với trang web.

## 3. Tạo các class test
Ở đây mỗi test cript chúng ta tạo ra sẽ tương ứng với một test case.

Và trước mỗi test script chúng ta cần phải thêm 1 annotation @Test tương ứng với 1 unit test
Test script này gồm có hai phần:
- Điều hướng đến trang được test
- Thực thi việc test, và verify
Để điều hướng đến trang được test thì trong script sẽ gọi đến các thông tin trong page object của trang đó.

Và như vậy mỗi lần khi được điều hướng đến các trang test thì script sẽ thực hiện việc test và so sánh kết quả thực tế thực hiện được với kết quả mong đợi để đưa ra kết luận test.

Trong các class test thì các test ccript được gom nhóm với nhau, thuận tiện cho việc tìm kiếm và nâng cấp.

Mỗi nhóm test script được nhóm lại với nhau dựa vào mục đích test riêng của nhóm script.

Các class test không phải chỉ có các test script mà nó còn bao gồm cả test fixtures (test fixtures này không biết dịch sang tiếng việt sao nữa, thôi để nguyên)

Test fixtures là các method đặc biệt của unit test framework như:

- Việc chuẩn bị môi trường test, những cái mà các script test cần phải có trước khi có thể thực thu được (bước này thường để trong một hàm riêng, có annotation là @Before)
- Việc clean/reset môi trường test sau khi run test script: như việc reset về các thiết lập ban đầu, không cache…, (bước này cũng được xây dựng thành hàm riêng và có annotation là @After)

Các class test có thể được gom lại với nhau bằng cách sử dụng groups và suites.

## 4. Tạo một class base – class dùng chung
Các công việc như chuẩn bị môi trường test hay việc reset môi trường sau khi thực hiện test có thể được sử dụng nhiều lần ở nhiều nơi khác nhau trong project, vì thế để tránh việc lặp lại nhiều lần này thì ta sẽ đưa những test fixtures này vào trong một class base.

Các class test sẽ thừa kế class base này để có thể gọi đến và sử dụng các hàm trong đó.

## 5. Tạo các class framework
Các class framework được sử dụng trong project cho các chức năng chung như:
- Tạo browser driver cho từng loại browser khác nhau
- Tương tác với web sử dụng explicit wait
- Lấy log file
- Đọc các thông tin từ một file text nào đó
- Chụp lại ảnh màn hình (capture screen) khi xảy ra exception
- Tự động gửi email kết quả test
- Tạo một report sau khi có kết quả test.
Các class page object sẽ gọi đến các function này từ các class framework mà ta đã có, để đưa ra thông tin cần lấy cho page ấy.

Như vậy chúng ta có thể tóm tắt lại một cách tổng quan về thành phần cần có của một automation project đó là: đầu tiên sẽ cần tạo project trong IDE (Eclipse), tiếp theo cần xác định rằng trong project cần có các class Page object, class test, class base, và class liên quan đến framework.

Mỗi class đều có mục đích riêng, việc hiểu về các class đó giúp project của chúng ta khoa học hơn, dễ dàng hơn trong việc quản lý, bảo trì và nâng cấp.

Hi vọng bài viết giúp chúng ta có cái nhìn tổng thể trước khi bắt đầu với một project automation.

 

Bài viết được lược dịch từ nguồn:

https://www.quora.com/How-do-I-explain-Java-Selenium-automation-project-in-interview