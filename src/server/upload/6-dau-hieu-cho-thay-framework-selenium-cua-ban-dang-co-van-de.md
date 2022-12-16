**Sự cần thiết của Selenium**

Selenium được cho là sân chơi lớn nhất trong giới test automation. Không có công cụ đối thủ nào khác đánh bại thành công sự nổi tiếng của Selenium. Rất nhiều tổ chức phần mềm và phi phần mềm đang sử dụng Selenium để tự động hóa các ứng dụng web của họ.

Bất kể bạn thừa hưởng  Selenium Framework của bạn hay bạn có nhiệm vụ xây dựng một branch mới, bạn có thể tự hỏi rằng : liệu khung Selenium của tôi có đủ tốt không? Bài viết này sẽ giúp bạn trả lời câu hỏi đó bằng cách nhấn mạnh 6 dấu hiệu cho thấy Framework của bạn đang thực sự chưa tốt nếu không nói là xấu.

1. Mỗi lần cập nhật lại bộ test là một nỗi đau :v 
2. Không hiểu nguyên nhân fail test
3. Thực thi test chậm
4. Phải lấy định danh hard-code cho những elements động
5. Không tích hợp được CI/CD 
6. Thiếu phần kiểm thử cho mobile 


# Dấu hiệu 1: Mỗi lần cập nhật lại bộ test là một nỗi đau :v 

**Triệu chứng**

Lúc đầu, kịch bản của bạn nhỏ. Việc bảo trì scripts có vẻ dễ dàng. Nhưng khi thời gian trôi nhanh, các bộ tests phát triển theo cấp số nhân. Không chỉ bạn mà, các thành viên trong nhóm của bạn liên tục thêm  nhiều dòng code vào Framework của bạn. Sau đó, có một điểm mà Selenium của bạn trở nên không thể nhận ra điều đó.

Bạn sẽ nhận thấy điều này khi bạn thấy quá nhiều đoạn code tương tự và quá nhiều trình định danh trùng lặp. Khi GUI của ứng dụng thay đổi một chút, mặc dù bạn sẽ phải duyệt qua toàn bộ code base để cập nhật và làm cho nó chạy lại.

Ví dụ:

Bạn có 50 bài tests khác nhau đang sử dụng cùng một trình định vị. Với bất kỳ thay đổi nào đối với yếu tố đó, bạn cần thay đổi tất cả 50  bộ tests đó. Hãy tưởng tượng rằng bạn có hàng trăm test case hoặc tệ hơn, bạn có hàng ngàn test case thì việc cập nhật toàn bộ code test sẽ trở thành điều không thể.

**Vậy tôi có thể làm gì ?**

May mắn thay, giải pháp cho vấn đề phổ biến này đã có : Mẫu thiết kế Page Object Model (POM). POM đã trở nên phổ biến trong Test Automatic để giảm mã trùng lặp và tăng cường bảo trì code.

Ví dụ dưới đây cho thấy một trường hợp test được viết theo kiểu POM

```
@Test(groups = {"smoke"})
public void TC0001_RegisterAccount(){
    homePage.goToRegisterPage();
    registerPage.registerAccount(email, password)
    assertTrue(registerPage.isAccountRegistered(email));
}

```

Page objects có thể được sử dụng lại trong bất kỳ bộ tests nào. Khi có bất kỳ thay đổi nào xảy ra với các phần tử(elements) hoặc phương thức đó, bạn chỉ cần cập nhật các phần tử và phương thức đó một lần trong Page objects , thay vì cập nhật hàng ngàn bộ tests khác nhau.

# Dấu hiệu 2: Không hiểu nguyên nhân fail test

**Triệu chứng**

Selenium giúp bạn tự động hóa một ứng dụng web từ đầu đến cuối. Tuy nhiên, khi test fails, việc điều tra nguyên nhân gốc rễ tại sao thất bại xảy ra có thể là một thách thức thực sự. Framework  của bạn có thể báo cáo một thông điệp mơ hồ như mong đợi [đúng] nhưng được tìm thấy [sai]. thật khó để biết nguyên nhân lỗi từ đâu ? :( 

Nhưng nếu tài khoản mới được đăng ký, điều gì đã xảy ra? Chúng ta nên làm gì để khắc phục nó? Để trả lời câu hỏi này, chúng ta có thể phải chạy lại bài tests và quan sát thực thi trực tiếp để hiểu điều gì đang xảy ra. Điều đó đã mất rất nhiều thời gian để thực hiện lại và tìm ra nguyên nhân gốc rễ.

**Vậy tôi có thể làm gì ?**

Chụp ảnh màn hình - Hầu hết các lỗi kiểm tra có thể được điều tra nhanh chóng với một số công cụ hỗ trợ trực quan bổ sung. Bạn có thể thấy những gì đang xảy ra với ứng dụng đang được thử nghiệm khi test failed 

![](https://images.viblo.asia/924a52c5-6ad3-446d-91e1-c47f0ffee1ce.png)

Kiểm tra mã nguồn HTML - Đôi khi trang của bạn trông chính xác, nhưng thực sự nó có vấn đề. Trong trường hợp này, bạn có thể sử dụng phương thức Selenium getPageSourceand xuất nguồn HTML hiện tại vào báo cáo kết quả của bạn.

![](https://images.viblo.asia/313026d6-0d3c-4e09-9842-0ba4df9defb3.png)

Với một số quen thuộc với HTML, bạn có thể sử dụng ảnh chụp nhanh HTML này để tìm ra những gì còn thiếu trên GUI khiến thử nghiệm thất bại.

# Dấu hiệu 3: Thực thi test chậm

**Triệu chứng**

Khi dự án thử nghiệm của chúng ta phát triển, chúng ta sẽ nhanh chóng vấp phải các vấn đề về khả năng mở rộng. Trong DevOps, các bộ tests sẽ được chạy theo cam kết và trạng thái xây dựng cần phải được báo cáo lại cho developers và testers trong chớp mắt. Nếu phải mất một vài ngày chỉ để thực hiện một bộ test chỉ bao gồm một số test case, thì Framework cuả bạn đang có vấn đề.

**Vậy tôi có thể làm gì ?**

Bạn chạy cùng một bộ tests trên các máy khác nhau trên các trình duyệt khác nhau song song. Mục tiêu là để đảm bảo rằng ứng dụng web của bạn chạy trơn tru trên các trình duyệt. Do đó, chúng ta cũng có thể gọi nó là “cross-browser testing”.

Hãy tưởng tượng rằng chúng ta có 50 bài tests và mỗi bài test mất 2 phút để chạy. Chạy chúng tuần tự trên một máy sẽ mất 100 phút. Tuy nhiên, nếu chúng ta quay 50 máy ảo, phân phối 50 bài tests cho các máy đó để chạy song song sẽ chỉ tốn 2 phút cho toàn bộ bộ tests.

Tối ưu hóa tốc độ định vị các phần tử của web - Trình định vị không được tạo bằng nhau. Một số loại định vị nhanh hơn để Selenium phân tích và xử lý. Một số chậm hơn. Khi bạn xây dựng bộ định vị cho một phần tử, hãy bắt đầu với các loại định vị nhanh. Chỉ khi trình định vị nhanh hơn không thể xác định duy nhất thành phần web, hãy thử loại định vị chậm hơn. Theo thứ tự như sau:

1. ID
2. Name
3. CSS
4. XPath

Đừng sử dụng hard sleeps - Vấn đề với hard sleeps là bộ test của bạn sẽ tạm dừng và chờ trong khoảng thời gian cố định. 
Ví dụ: nếu bạn có chế độ sleep trong 10 giây để chờ phần tử web xuất hiện, thử nghiệm của bạn sẽ tạm dừng trong 10 giây bất kể thực tế là đối tượng mà bạn đang chờ hiển thị trong 3 giây. Trong trường hợp này, bạn nên sử dụng Explicit Waits hoặc Fluent Wait thay thế Implicit Wait.

# Dấu hiệu 4: Phải lấy định danh hard-code cho những elements động

**Triệu chứng**

Một số phần tử web trên ứng dụng của bạn là phần tử động. Điều đó có nghĩa là front-end sẽ định dạng và hiển thị dữ liệu khác nhau tùy thuộc vào backend. Vì vậy, khi bạn mở một Selenium framework và bạn thấy các bộ định vị được hard-coded cho các phần tử động, bạn có thể kết luận một cách an toàn rằng khung này có chỗ để cải thiện.

Ví dụ: chúng ta có một bảng hiển thị thông tin về người dùng như Họ, Tên và Email như bên dưới.

![](https://images.viblo.asia/fdaf6ea9-15a7-47d7-ba61-d94437349f67.png)

Một số người mới có thể sử dụng các bộ định vị bên dưới để xác định vị trí các elements:

First Name	
| Field | Column 2 |
| -------- | -------- | 
| First Name | //table/tbody/tr/td[1][text()=’Moye’] |
| Last Name	     | //table/tbody/tr/td[2][text()=’David’]     | 
|Email|//table/tbody/tr/td[3][text()=’moyed@gmail.com’] | 

Những cách định vị như thế là không tốt, bởi vì Moye, David và moyed@gmail.com đều là những dữ liệu có thể thay đổi 

**Vậy tôi có thể làm gì ?**

Nếu một phần tử thuộc tính khác như ID, tên và giá trị thay đổi trên mỗi lần làm mới trang hoặc tương tác trang, chúng ta cần xử lý các phần tử động bằng cách sử dụng bộ chọn XPath hoặc CSS động. Điều đó có nghĩa là chúng ta phải thay thế từng bit dữ liệu được hard-coded bằng các biến.

```
//table/tbody/tr/td[text()=’<Last Name>‘]/following-sibling::td[text()=’<First Name>‘]/following-sibling::td[text()=’<Email>‘]
```

# Dấu hiệu 5: Không tích hợp được CI/CD 

**Triệu chứng**

Nhiều công ty phát triển phần mềm đã và đang áp dụng Tích hợp liên tục và Triển khai liên tục với thành công lớn. Nếu công ty của bạn có sẵn CI / CD và bạn không tích hợp vào khung Selenium của mình với  thì bạn sẽ bị tụt lại phía sau.

**Vậy tôi có thể làm gì ?**

Dưới đây là các bước bạn có thể thực hiện để tích hợp khung Selenium của mình với CI / CD.

* Chọn các trình duyệt mà các bộ tests sẽ được thực hiện trên, ví dụ: Chrome, Firefox, Edge, v.v.
* Chọn ngôn ngữ lập trình bạn chọn, ví dụ: Java, Javascript, Python, v.v.
* Quyết định Framework test của đơn vị nào mà bạn muốn, ví dụ: JUnit, TestNG, v.v.
* Tạo các bộ test 
* Chạy test trên môi trường local 
* Tạo và cấu hình công việc CI / CD để kiểm soát và thực hiện các bộ tests của bạn
* Lên lịch cho công việc trong công cụ CI / CD của bạn (ví dụ: Jenkins, Bamboo, v.v.), một cái gì đó tương tự như trình kích hoạt bên dưới.

![](https://images.viblo.asia/20367166-f253-4658-90c3-7bfa20783f70.png)

link tham khảo : https://www.softwaretestingmaterial.com/selenium-continuous-integration/


# Dấu hiệu 6: thiếu phần kiểm thử cho mobile

Điện thoại thông minh đã trở thành một công cụ quan trọng trong công nghệ với các ứng dụng phổ quát cho cả người tiêu dùng và doanh nghiệp. Theo Bizness Apps, có khoảng 8 triệu ứng dụng trong cửa hàng Google Play và 2,2 triệu ứng dụng trong cửa hàng Ứng dụng Apple. Những ứng dụng này đang phục vụ hơn 3,5 tỷ người dùng di động trên thế giới.

Vì vậy, là developers hay testers cho ứng dụng web, chúng ta phải đảm bảo rằng các ứng dụng của chúng ta hoạt động trơn tru trên thiết bị di động để đáp ứng nhu cầu ngày càng tăng của thế giới đầu tiên trên thiết bị di động. Các ứng dụng web di động cần phải cực kỳ ổn định, bảo mật và đơn giản.

Nhưng như bạn đã biết, Selenium chỉ có thể giúp bạn điều khiển các ứng dụng web chạy trên trình duyệt máy tính để bàn. Sẽ bó tay khi chúng ta cần thực hiện tests trên thiết bị di động chạy iOS hoặc Android.

**Vậy tôi có thể làm gì ?**

Chúng ta có một giải pháp đó là : Appium
Appium là thư viện Kiểm tra tự động mã nguồn mở hỗ trợ các ứng dụng web di động và ứng dụng gốc trên nhiều thiết bị iOS và Android khác nhau. Vì vậy, một Framework tốt nên tích hợp với Appium ngay từ đầu.

Về cơ bản, một khi bạn đã kiến trúc khung Selenium của mình đủ tốt, thì việc tích hợp với Appium chỉ đơn giản là tạo một iOSDriver hoặc AndroidDriver mới bằng cách sử dụng mẫu thiết kế Factory. Sau đó, các  test case của bạn sẽ tương tác với các thiết bị iOS / Android thông qua Máy chủ Appium như bên dưới.

![](https://images.viblo.asia/b5ce2cf9-23c3-4fd7-8e83-22e48cec4956.png)

Để tìm hiểu thêm về kiến trúc một khung Selenium tốt có thể tích hợp với Appium ngay từ đầu, hãy xem bài viết này.
https://www.logigear.com/blog/test-automation/building-a-selenium-framework-from-a-to-z/

# Kết luận

Chúng ta đã trải qua các dấu hiệu tiết lộ khung Selenium được cho là xấu và các hành động mà chúng ta có thể thực hiện để cải thiện khung Selenium của mình. Hy vọng, bạn có thể mang về cho mình một số hiểu biết hữu ích để cải thiện việc kiểm tra các ứng dụng web của bạn.


Tham khảo bài viết :

https://www.logigear.com/blog/selenium/6-signs-that-your-selenium-framework-is-bad