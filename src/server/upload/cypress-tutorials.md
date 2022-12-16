# 1. Cypress là gì?
Cypress là front end testing tool được xây dựng cho các ứng dụng Web hiện đại. Đây là một công cụ hỗ trợ hữu hiệu cho developers và QA trong kiểm thử ứng dụng Web hiện đại. Cypress được xây dựng trên một kiến trúc mới và chạy trong cùng vòng lặp chạy khi ứng dụng đang được thử nghiệm. Cypress thường được so sánh với Selenium. Nhưng Cypress hoàn toàn khác biệt với Selenium và nó không gặp phải các hạn chế như Selenium. Điều này giúp chúng ta thực thi các Test Cases một cách đơn giản và dễ dàng hơn.
![](https://images.viblo.asia/f2029161-9010-49f6-9eee-248424672a25.png)

Cypress hỗ trợ chúng ta:
- Set up tests
- Write tests
- Run tests
- Debug Tests
  
 Đằng sau Cypress là một máy chủ Node.js. Quá trình Cypress và Node.js liên tục liên lạc, đồng bộ hóa và thực hiện các nhiệm vụ thay mặt cho nhau. Có quyền truy cập vào cả hai phần (front and back) cho phép khả năng phản hồi các sự kiện của ứng dụng  trong thời gian thực, đồng thời hoạt động bên ngoài trình duyệt cho các tác vụ yêu cầu đặc quyền cao hơn.
# 2. Đối tượng sử dụng Cypress
Thường thì những đối tượng sử dụng Cypress là developers hoặc QA khi xây dựng một ứng dụng Web có sử dụng Javascript framework.

Cypress cho phép người dùng thực thi rất nhiều loại test:
- End-to-end tests
- Integration tests
- Unit tests
Cypress có thể test bất cứ thứ gì chạy trên trình duyệt.

# 3. Làm thế nào để sử dụng Cypress?
## 3.1 Cài đặt Cypress
- Cần phải cài đặt npm trên máy tính của bạn để có thể cài đặt Cypress. NPM là trình quản lý gói cho JavaScript và đăng ký phần mềm lớn nhất thế giới. 
- Sau đó chạy lệnh sau để cài đặt Cypress 

![](https://images.viblo.asia/d306d3e0-b3f2-4ce1-a8d9-d48268f3f2b5.png)
 Hãy chắc chắn rằng bạn đã chạy npm init hoặc có một thư mục node_modules hoặc tệp package.json trong thư mục gốc của dự án để đảm bảo Cypress được cài đặt trong thư mục chính xác.
## 3.2 Làm thế nào để mở Cypress?
- Chạy lệnh bên dưới để mở Cypress

![](https://images.viblo.asia/bef86430-487b-4f1f-b850-7c01fb20d874.png)
- Hoặc sử dụng lệnh:

![](https://images.viblo.asia/51d1d62b-1bd2-4d95-8782-4f6ee8e5b091.png)
## 3.3 Thêm tập lệnh npm
![](https://images.viblo.asia/c04dfbc7-2732-44eb-96ff-7455bcfacd74.png)
## 3.4 Làm thế nào để viết một bài Test?
- Bước đầu tiên là cần duyệt đến thư mục cài đặt Cypress và tạo một tệp javascript. Sau đó, sẽ thấy tệp javascript mới được tạo trong Cypress.
![](https://images.viblo.asia/0b6c14d2-f5f0-457e-8ced-8a5ed5bb32a8.png)
- Bạn có thể chỉnh sửa tệp js để đưa ra các test action phù hợp với yêu cầu của ứng dụng.
- Có thể tham khảo đoạn code dưới đây
![](https://images.viblo.asia/f292fc49-d69f-4f25-8cf1-206f2051a4a9.png)

- Có thể thấy, có một đối tượng "cy" mà chúng ta luôn sử dụng. Đối tượng "Cy" cho phép bạn tương tác với trình duyệt. Nó được sử dụng trước mỗi lệnh. Dưới đây là các action mà đoạn code trên thực hiện trên ứng dụng Web
    
    *    cy.viewport (HEIGHT, WIDTH):Lệnh này thay đổi kích thước màn hình theo giá trị được cung cấp
    
    *    cy.visit ('URL'): Phương thức này là phương thức điều hướng cho Cypress. Nó gọi URL đã cho
   
    *   cy.get ('locator'):  Phương thức này lấy một đối số là trình định vị CSS của phần tử web mà chúng ta muốn tương tác.
    
    *    cy.get ('locator'). type ('INPUT'):  Phương thức này cho phép bạn điền vào các trường đầu vào.
    
    *    cy.get ('locator'). click ():  Phương thức này cho phép bạn click vào một đối tượng có thể click ( Ví dụ như 1 button).
    
    *    cy.get ('locator'). contains('EXPECTED_VALUE'):  Phương thức này đưa ra sự xác nhận cho thành phần web mà bạn đã chỉ định.
- Sau đó bạn chỉ cần mở Cypress và click vào bài test mà bạn muốn thực thi. Giao diện thực thi bao gồm 2 phần : viewport cho execute commands và preview part cho Website.
![](https://images.viblo.asia/d2d738b6-b69a-444a-9118-c08647eb97cf.png)

- Trong trường hợp có lỗi thì Cypress sẽ cảnh báo qua viewport![](https://images.viblo.asia/977ed796-f135-414f-beee-677dbae6237f.png)

# 4. Kết luận
Cypress là một công cụ hữu ích giúp cho việc kiểm thử trở nên dễ dàng hơn cho developers và QA đặc biệt là trong Integration Testing. 

### Lưu ý: 
Hiện nay Cypress chỉ hỗ trợ chạy trên Chrome.
### References:
https://docs.cypress.io/guides/getting-started/testing-your-app.html#Seeding-data
https://www.swtestacademy.com/cypress-tutorial/
https://www.valentinog.com/blog/cypress/