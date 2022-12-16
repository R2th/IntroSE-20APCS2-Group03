- Cách xây dựng một base automation testing framework gồm 8 bước cơ bản sau

    1. Chọn một ngôn ngữ lập trình
    2. Chọn một unit test framework
    3. Design the framework architecture
    4. Build the SeleniumCore component
    5. Build the SeleniumTest component
    6. Chọn cơ chế báo cáo
    7. Quyết định cách triển khai CI/CD
    8.  Tích hợp với các framework khác

    => Bây giờ tôi sẽ đi giới thiệu chi tiết từng phần trên để các bạn hiểu rõ hơn.

## I. Chọn một ngôn ngữ lập trình

### 1. Nếu bạn có thể code
- Ngôn ngữ lập trình bạn chọn có tác động to lớn đến thiết kế framework và năng suất của bạn. Vì vậy, câu hỏi đầu tiên bạn nên hỏi là: Tôi muốn viết các bài kiểm tra của mình bằng ngôn ngữ lập trình nào?
- Các ngôn ngữ phổ biến nhất trong cộng đồng automation testing là Java, Python và JavaScript. Để quyết định ngôn ngữ lập trình bạn nên chọn, hãy xem xét các yếu tố dưới đây.
    - Ngôn ngữ lập trình nào đang được sử dụng để phát triển các ứng dụng web bạn cần thử nghiệm?
    - Công ty của bạn có một framework nội bộ mà bạn có thể sử dụng lại không?
    - Ai sẽ sử dụng framework của bạn để viết tests?
 
 - Theo kinh nghiệm của tôi, Java là sự lựa chọn an toàn nhất nếu bạn bắt đầu một dự án mới từ đầu vì nó được cộng đồng áp dụng rộng rãi bởi thực tế là nó hoạt động trên nhiều nền tảng. Hơn nữa, bạn có thể dễ dàng tìm thấy các ví dụ code hoặc các mẹo khắc phục sự cố nếu bạn gặp khó khăn.

### 2. Nếu bạn code không tốt
- Tin tốt là: bạn cũng có thể viết các bài kiểm tra bằng cách sử dụng phương pháp Behavior-Driven Development (BDD). Nhưng điều đó sẽ yêu cầu một số thiết lập bổ sung.
- Tóm lại, BDD giúp tăng khả năng đọc các bài kiểm tra của bạn bằng cách cấu trúc luồng kiểm tra thành các câu lệnh Given, When và Then (GWT). Do đó, không chỉ các test automation engineers có kỹ năng lập trình mà còn cả các thành viên khác trong team có thể hiểu các kịch bản kiểm tra và đóng góp có ý nghĩa vào quá trình tạo, tìm kiếm lỗi và bảo trì các trường hợp kiểm thử.
- Ví dụ về một kịch bản viết bằng BBD như sau

    ```
    Feature: Login action
    Scenario: Successfly login with valid email and password
    Given User is sign in
    When user sing in with "a@gmail.com" enail and "123456" password
    Then user sees success message as "Login successfully"
    ```

- Một số công cụ mà bạn có thể sử dụng nếu bạn chọn BDD:
    - Cucumber (hỗ trợ hầu hết các ngôn ngữ chính) 
    - SpecFlow (dành cho C #)

- Theo quan điểm của tôi, BDD phù hợp với các dự án nhỏ hoặc ngắn hạn. Sẽ rất khó để mở rộng quy mô nếu bạn phải viết hàng tá câu lệnh “And / And / And…” bằng cú pháp GWT.
-  Một phương pháp tối ưn hơn để bạn cân nhắc là phương pháp `Keyword-Driven Testing` (KDT)

## II. Chọn một unit test framework
- Sau khi lựa chọn được ngôn ngữ lập trình phù hợp nhất, bước tiếp theo chúng ta cần chọn một unit test framework mà chúng ta sẽ xây dựng framework của mình. 
- Do tôi đang lấy ví dụ về cách tạo một framework với selenium bằng ngôn ngữ Java nên tôi khuyên bạn nên sử dụng TestNG vì nó mang lại một số lợi ích quan trọng, chẳng hạn như:
    - TestNG tương tự như JUnit, nhưng nó mạnh hơn nhiều so với JUnit — đặc biệt là về mặt thử nghiệm các lớp tích hợp. Và tốt hơn nữa, TestNG kế thừa tất cả những lợi ích mà JUnit mang lại.
    - TestNG loại bỏ hầu hết các hạn chế của các framework cũ và cung cấp cho bạn khả năng viết các bài kiểm tra linh hoạt và mạnh mẽ hơn. Một số tính năng nổi bật là: easy annotations, grouping, sequencing, and parameterizing.

## III. Design the framework architecture

- Chúng ta nên tham khảo framework architecture dưới đây

![](https://images.viblo.asia/0661f28d-3531-48e9-9f00-ed6ee4488e13.PNG)

- Kiến trúc này có hai thành phần riêng biệt được gọi là `SeleniumCore` và `SeleniumTest`
- Việc có hai thành phần tách rời giúp đơn giản hóa việc bảo trì thử nghiệm về lâu dài.
- Ví dụ: nếu bạn muốn kiểm tra xem thẻ `<input>` có hiển thị trên màn hình hay không trước khi nhấp vào thẻ đó, đơn giản bạn chỉ cần sửa "input" element wrapper. Khi đó phần thay đổi đó sẽ được truyền tới tất cả các trường hợp thử nghiệm và đối tượng trang tương tác với thẻ `input`
- Không có thử nghiệm và trình bao bọc phần tử với thẻ `input` có nghĩa là bạn sẽ phải cập nhật từng trường hợp thử nghiệm hoặc đối tượng trang hiện đang tương tác với thẻ `<input>` bất cứ khi nào bạn cần.

## IV. Build the SeleniumCore component

- SeleniumCore được thiết kế để quản lý các phiên bản trình duyệt cũng như các tương tác phần tử. Thành phần này giúp bạn tạo và hủy các đối tượng WebDriver.
- Một đối tượng WebDriver, như tên gọi của nó, “drives” một phiên bản trình duyệt chẳng hạn như di chuyển từ trang web này sang trang web khác. Tốt nhất, người viết thử nghiệm không nên quan tâm đến cách các phiên bản trình duyệt được tạo hoặc hủy. Họ chỉ cần một đối tượng WebDriver để thực hiện một bước thử nghiệm nhất định trong luồng thử nghiệm của họ.
- Để đạt được loại trừu tượng này, chúng ta thường tuân theo một phương pháp tốt nhất được gọi là `Factory design pattern`. Dưới đây là Class diagram of Factory pattern bạn có thể tham khảo

![](https://images.viblo.asia/f001f101-7c6a-4dcf-b297-d1ef1baaa493.PNG)

- Trong sơ đồ trên, LoginTest, LogoutTest và OrderTest là test classes sử dụng DriverManagerFactory để tạo ra các đối tượng DriverManager cho chúng.

## V. Build the SeleniumTest component

- Không giống như SeleniumCore đóng vai trò là nền tảng của framework, SeleniumTest là nơi chứa tất cả các trường hợp thử nghiệm - nơi sử dụng các lớp được cung cấp bởi SeleniumCore. Mẫu thiết kế mà tôi sẽ áp dụng ở đây được gọi là PageObject pattern (POM).

### 1. PAGEOBJECT PATTERN
   - Page Object Model (POM) đã trở thành mô hình thực tế được sử dụng trong các framework kiểm thử tự động bởi vì nó làm giảm sự trùng lặp code do đó giảm chi phí bảo trì thử nghiệm.
    - Áp dụng POM có nghĩa là tôi sẽ tổ chức UI elements trong các page. Một page cũng có thể bao gồm "actions" hoặc luồng chức năng bạn có thể thực hiện trên page đó. Ví dụ, nếu ứng dụng web của bạn bao gồm một số trang Login page, Home page, Register page ... tôi sẽ tạo các PageObjects tương ứng cho chúng, chẳng hạn như LoginPage, HomePage, RegisterPage, v.v.
    - Nhờ POM, nếu giao diện người dùng của bất kỳ trang nào thay đổi, tôi sẽ chỉ cần cập nhật PageObjects một lần, thay vì cấu trúc lại tất cả các thử nghiệm tương tác với trang đó.
    - Hình ảnh dưới đây minh họa cách tôi thường cấu trúc các PageObject, cách xác định element locators cũng như action methods. Lưu ý rằng mặc dù RegisterPage và LoginPage đều có userNameTextBox và passwordTextBox, nhưng các phần tử web này hoàn toàn khác nhau.
    ![](https://images.viblo.asia/a9b32c82-add8-4efe-8ecf-2b2f8fcc4426.PNG)

### 2. A SIMPLE PAGE OBJECT

- Tôi sẽ ví dụ về trang LoginPage sẽ gồm các thông tin như sau:
    - Một constructor
    -  Element locators giúp đối tượng WebDriver tìm thấy các phần tử web bạn muốn tương tác. Ví dụ. userNameTextBox
    -  Các phương thức để thao tác trên trang Login như setUserName (), setPassword (), clickLogin () và quan trọng nhất là phương thức – login () kết hợp cả ba phương thức trên.

    ![](https://images.viblo.asia/f4fda7c0-ac0c-46a9-8953-3124fbf87485.PNG)

3. HOW TO USE A PAGEOBJECT

- Để tương tác với trang Login trong các thử nghiệm, tôi chỉ cần tạo một LoginPage object mới và gọi các phương thức hành động của nó.
- Nếu các phần tử web thay đổi định danh, tôi không cần cập nhật tất cả các thử nghiệm tương tác với trang Login này, tôi chỉ cần sửa tại LoginPage là đủ.

![](https://images.viblo.asia/50c61b98-9ca9-43bc-8af8-bea98a9393e3.PNG)

- Bạn có thể thấy, trên ví dụ trên tôi có sử dụng phương thức getLoginErrorMessage() - chưa được đề cập ở LoginPage. Lúc này tôi chỉ cần thêm vào trang LoginPage như sau:

    ```

    private By errorMessageLabel = By.id(“errorMessage”));

    public String getLoginErrorMessage() {
       return  driver.findByElement(errorMessageLabel).getText();
    }

    ```

## VI. Chọn cơ chế báo cáo

- Khi bạn chạy ngày càng nhiều thử nghiệm, bạn sẽ sớm thấy rằng việc thống kê kết quả thử nghiệm sẽ khó khăn nếu không có cơ chế báo cáo tốt.
- Giả sử tôi nhận được một bài kiểm tra không thành công. Làm thế nào để xác định xem lỗi là do lỗi AUT, thay đổi thiết kế có chủ ý trên AUT hay do lỗi trong quá trình phát triển và thực hiện thử nghiệm?
- Vào cuối ngày, kiểm thử tự động sẽ trở nên vô dụng nếu chúng ta không thể có được những hiểu biết hữu ích từ kết quả kiểm tra để thực hiện các hành động khắc phục có ý nghĩa.
- Các cơ chế báo cáo được cung cấp bởi testing frameworks như Junit và TestNG thường được tạo ở định dạng XML, có thể dễ dàng được hiểu bởi các phần mềm khác như công cụ CI / CD (Jenkins). Thật không may, những XML đó không dễ đọc đối với con người chúng ta.
=> Các thư viện của bên thứ ba như ExtentReport và Allure có thể giúp bạn tạo các báo cáo kết quả thử nghiệm mà con người có thể đọc được. Chúng cũng bao gồm các hình ảnh như biểu đồ hình tròn và ảnh chụp màn hình.
- Nếu bạn không thích những công cụ đó, có một thư viện báo cáo mã nguồn mở của Java có tên là ReportNG. Đây là  HTML plug-in đơn giản cho TestNG unit-testing framework cung cấp chế độ xem đơn giản, được mã hóa màu về kết quả kiểm tra. Điểm đáng chú ý là việc thiết lập ReportNG rất dễ dàng.
- Một báo cáo tốt cần cung cấp thông tin chi tiết như: số lượng các trường hợp kiểm thử pass hoặc fail, tỷ lệ pass, thời gian thực hiện và lý do tại sao các trường hợp kiểm thử không thành công. Các hình ảnh dưới đây là các báo cáo ví dụ được tạo bởi ReportNG.

![](https://images.viblo.asia/ed6ac0ac-ca9d-4668-b2e5-6df746176763.PNG)

## VII. Quyết định cách triển khai CI/CD

- Build tools and dependency managers: Dependency managers giúp bạn quản lý dependencies và libraries cái mà framework đang sử dụng. Ví dụ về các công cụ này bao gồm Maven, Gradle, Ant, NPM và NuGet. Một tình quản lý các dependency để tránh bỏ sót các dependency khi bạn xây dựng framework của mình.
- Build tools hỗ trợ bạn trong việc xây dựng mã nguồn và dependent libraries, cũng như trong việc chạy thử nghiệm. Hình ảnh dưới đây minh họa cách chúng tôi sử dụng Maven để thực hiện các thử nghiệm của mình (mvn clean test).

![](https://images.viblo.asia/3bc0fb3c-25f1-4dab-a5a3-019a3980b886.PNG)

- Version control: Tất cả Automation teams phải cộng tác và chia sẻ mã nguồn với nhau. Cũng giống như một dự án phát triển phần mềm, mã nguồn của các bài kiểm tra và test utilities được lưu trữ trong hệ thống kiểm soát nguồn, còn được gọi là version control system. Các version control systemn phổ biến là GitHub, Bitbucket và TFS. Tuy nhiên, tôi khuyên nhóm của bạn nên thiết lập hệ thống kiểm soát nguồn nội bộ bằng Git nếu bạn không muốn chia sẻ mã nguồn của mình một cách công khai.
- CI/CD integration: Các hệ thống CI phổ biến bao gồm Jenkins, Bamboo và TFS. Bạn nên sử dụng Jenkins vì nó miễn phí và rất hiệu quả.

## VIII. Tích hợp với các framework khác

- Cân nhắc tích hợp với các công cụ sau để tăng thêm giá trị cho framework của bạn:
    - AutoIt
    - TestRail
    - Jira

## IX. Tổng quát

- Hy vọng bài viết của tôi sẽ giúp bạn có cách nhìn nhận và biết được các bước cần thiết để xây dựng một base framework cơ bản cho kiểm thử tự động. Cảm ơn các bạn đã quan tâm và đọc bài viết của tôi.
- Tài liệu tham khảo [Building a Selenium Framework from A to Z](https://www.logigear.com/blog/test-automation/building-a-selenium-framework-from-a-to-z/)