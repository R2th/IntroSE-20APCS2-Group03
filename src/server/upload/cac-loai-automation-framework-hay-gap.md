##  Automation framework là gì?

Automation framework là một tập hợp các hướng dẫn, tiêu chuẩn, quy trình và thực hành để tạo và duy trì tính nhất quán đoạn code và để tạo bộ kiểm thử tự động hóa. Mỗi kiểu framework lại có những quy tắc riêng, các hướng dẫn, giao thức và thủ tục riêng dành cho các công việc như tạo test case, tổ chức và thực thi các test case.

##  Lợi ích của Testing automation framework

* Khả năng tái sử dụng code
* Bao phủ tối đa
* Kịch bản phục hồi
* Bảo trì chi phí thấp
* Can thiệp test manual tối thiểu
* Báo cáo dễ dàng

Dưới đây là 6 framework dành cho kiểm thử tự động thường gặp nhất. Thứ tự được sắp xếp tăng dần theo độ phức tạp và các mức độ trong việc định hướng để đạt được các mục tiêu kiểm thử. Và các khía cạnh dùng để đánh giá việc đó bao gồm khả năng mở rộng, tính tái sử dụng, nỗ lực dành cho việc bảo trì và chi phí đầu tư dành cho các kỹ năng liên quan đến kỹ thuật như là chuyển giao kiến thức, đào tạo nhân lực hay các nỗ lực cần có để học hỏi các công nghệ mới…

1. Module Based Testing Framework
2. Library Architecture Testing Framework
3. Data Driven Testing Framework
4. Keyword Driven Testing Framework
5. Hybrid Testing Framework
6. Behavior Driven Development Framework

![](https://images.viblo.asia/e5a1d4d3-a245-49a2-9319-9127855cebac.jpg)

Hãy cùng xem chi tiết thêm về các framework nhé !

### 1. Module-Based Testing Framework

Trong framework này,  toàn bộ ứng dụng thường được chia thành một số mô-đun và mô-đun con hợp lý và biệt lập. Sau đó, đối với mỗi mô-đun, có thể tạo tập lệnh thử nghiệm riêng biệt và độc lập. Do đó, khi tất cả các tập lệnh thử nghiệm được hợp nhất, nó sẽ tạo ra một bộ thử nghiệm lớn đại diện cho nhiều hơn một mô-đun đơn lẻ.

![](https://images.viblo.asia/5e9b6da1-3fd3-4512-a0a1-9822c3562873.jpg)

Với mỗi script của một module sẽ được gắn tương ứng với các thao tác (actions) và dữ liệu (testdata) tương ứng dành cho nó. Nếu như có sự thay đổi về test data thì các script cũng phải thay đổi tương ứng, hoặc là bạn phải tạo mới một test script riêng biệt khác để đáp ứng sự thay đổi đó. Và nếu như dữ liệu test của chúng ra thường xuyên có sự thay đổi hoặc cập nhật thì việc sử dụng data-driven framework sẽ là lựa chọn tốt hơn.

### 2. Library Architecture Testing Framework

Trong framework này, chúng ta sẽ xác định tất cả các bước phổ biến và nhóm chúng thành các hàm dưới một hàm thư viện và gọi các hàm này trong các kịch bản kiểm tra tự động hóa theo yêu cầu

ví dụ : 
Các bước đăng nhập có thể được kết hợp thành một hàm và được lưu giữ trong một thư viện. Do đó, tất cả các kịch bản kiểm tra yêu cầu để đăng nhập ứng dụng có thể gọi hàm đó thay vì viết lại toàn bộ code

![](https://images.viblo.asia/8b47689d-2040-499e-8a17-114f2e662245.jpg)

### 3. Data Driven Testing Framework

Trong quá trình automation hay trong quá trình kiểm thử thông thường, việc thực hiện test một chức năng phải lặp đi lặp lại nhiều lần với các dữ liệu test khác nhau là việc mà ta sẽ phải gặp rất thường xuyên. Hơn nữa, trong một số trường hợp, ta không thể nhúng dữ liệu test vào trong test script được. Do đó mà người ta phải nghĩ tới việc sẽ lưu trữ các test data ra bên ngoài, tách biệt với các test script.

Trong framework này, chúng ta sẽ tách biệt dữ liệu test và test case logic với nhau và lưu trữ dữ liệu này vào một hệ thống bên ngoài như excel hoặc cơ sở dữ liệu. Dữ liệu này được điều khiển dưới dạng cặp "key-value" và key được sử dụng để truy cập và điền dữ liệu trong test scripts.

![](https://images.viblo.asia/79bbd51b-5358-4c8a-9153-97b63bf7c400.jpg)

### 4. Keyword Driven Testing Framework

Framework  này chỉ là một phần mở rộng data-driven Testing Framework và nó không chỉ tách biệt dữ liệu test khỏi script mà còn giữ bộ code thuộc test script thành một file dữ liệu bên ngoài.

Key word được thể hiện dưới dạng từ khóa như SendMail (), LoginIntoPage (), EnterUserDetails (), v.v.
Nhược điểm lớn nhất của framework này là nó đòi hỏi kiến thức lập trình phức tạp khi đoạn code trở nên dài hơn.

ví dụ : 

![](https://images.viblo.asia/b37afae3-2f92-4b47-a870-611bb89b0592.jpg)

Như bảng dữ liệu trên, ta có cột keywork với các giá trị như login, clickLink và verifyLink. Tùy thuộc vào tính chất của ứng dụng, thì các keyword sẽ được gọi và sử dụng tương ứng. Các keyword này có thể được gọi đến và sử dụng nhiều lần trong quá trình thực hiện test. Cột Locator/Data là giá trị locator của phần tử trên màn hình hoặc các test data cần truyền vào cho phần tử ấy.

### 5. Hybrid Testing Framework

Hybrid test framework là sự kết hợp giữa hai hoặc nhiều các loại framework trên. Điểm cộng lớn ở đây chính là việc phát huy các ưu điểm của các framework mà nó kết hợp sử dụng.

![](https://images.viblo.asia/d092cc5d-94ae-4b40-b4ed-07a472183947.jpg)

ví dụ :

![](https://images.viblo.asia/dbb35d3b-9654-4d5c-aff6-2295b7a1c3b2.jpg)

Trong ví dụ trên, cột keyword chứa tất cả các từ khóa bắt buộc được sử dụng trong test case cụ thể và cột dữ liệu chứa tất cả dữ liệu được yêu cầu trong kịch bản test. Nếu bất kỳ bước nào không cần bất kỳ đầu vào nào thì có thể để trống.

### 6. Behavior Driven Development Framework

Behavior Driven Developmet Framework viết tắt là BDD, mục đích của nó là tạo điều kiện cho các bên liên quan trong quy trình phát triển phần mềm như: Business Analysts, Developers, Testes… có thể tiếp cận với các yêu cầu kỹ thuật của sản phẩm sớm nhất có thể. Điều này đòi hỏi sự hợp tác cao giữa team DEV và team test.

Ngôn ngữ đơn giản được sử dụng trong các scenarios giúp ngay cả những thành viên không chuyên về kỹ thuật cũng hiểu được những gì đang diễn ra trong dự án phần mềm. Điều này giúp và cải thiện thông tin liên lạc giữa các nhóm kỹ thuật và phi kỹ thuật, các nhà quản lý và các bên liên quan.
 
 Bạn có thể đọc thêm về BBD framework tại đây : 
 https://www.softwaretestinghelp.com/bdd-framework/
 
###  Kết Luận 
  
  Trên đây là các framework thường hay gặp, mong rằng sẽ hữu ích cho các bạn ! 
  
Tham khảo : 

https://www.softwaretestinghelp.com/bdd-framework/
https://www.softwaretestinghelp.com/test-automation-frameworks-selenium-tutorial-20/