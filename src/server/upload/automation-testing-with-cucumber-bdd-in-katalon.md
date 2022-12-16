### 1. What is Cucumber?

Cucumber là một công cụ được sử dụng để chạy acceptance tests tự động được tạo ở định dạng BDD. Một trong những tính năng nổi bật nhất của công cụ này là khả năng thực hiện các mô tả chức năng văn bản thuần túy (được viết bằng ngôn ngữ gọi là Gherkin) dưới dạng automation test. Chúng ta hãy xem ví dụ dưới đây:

```

Feature: Login gmail successfully
Scenario: User can successfully login to gmail if account exists in system 

Given I am on "Gmail" site
When I input email 'oanh.framgia@gmail.com'
And I click on Next button
And I input password 'Abc@123123'
And I click on Login button
Then I will navigate to Gmail page

```

Tính năng đáng kinh ngạc này của  Behavior-Driven Development  (BDD) với những ưu điểm như sau:
- Viết các bài kiểm tra BDD bằng ngôn ngữ rất phổ biến một ngôn ngữ được cấu trúc xung quanh domain model và được sử dụng rộng rãi bởi tất cả các thành viên trong nhóm bao gồm các developer, tester, BA và khách hàng.
- Kết nối kỹ thuật với các nontechnical members của software team.
- Cho phép tương tác trực tiếp với code của developer, nhưng các thử nghiệm BDD được viết bằng ngôn ngữ mà các bên liên quan cũng có thể thực hiện.
- Cuối cùng nhưng không kém phần quan trọng, acceptance tests có thể được thực hiện tự động, trong khi nó được thực hiện thủ công bởi các bên liên quan khác.

### 2. Tạo feature file
Select **Include** --> **feature** --> **Click on the right button** --> **New feature file**
- Đầu tiên chúng ta tạo new feature file như image bên dưới:
![](https://images.viblo.asia/0624506c-fc3d-42d9-b09d-6f74ad514a4e.png)

- Nhập nội dung cho feature chúng ta cần tạo:
![](https://images.viblo.asia/b5ca77c5-4cd7-4bb1-a0eb-85b3c592a465.png)

Khi bạn thấy dấu màu vàng (**warning**) được hiện thị trước mỗi line của feature, điều này có nghĩa là chúng ta chưa viết script cho nó.

### 3. Create Test Script
Select **Include** --> **scripts** --> **groovy** --> **Click on the right button** --> **New script file**

![](https://images.viblo.asia/ed7109f6-6d28-4f77-8b81-1d5e42fa8cc7.png)

Sau khi tạo file xong  thì bạn sẽ thấy nội dung file mẫu như thế này, chúng ta sẽ sửa lại hợp lý với testcase

![](https://images.viblo.asia/4b5d895f-4c41-4026-beb1-79f4ac48a1cf.png)

- Mình sẽ viết test script cho dòng đầu tiên `Given I am on 'Gmail' site`
  + Chúng ta cần chỉnh sửa nội dung của `@Given` trong code là `I am on 'Gmail' site`


![](https://images.viblo.asia/de921837-4e1a-4b90-9108-fec7f82dd0b3.png)

 + Bây giờ chúng ta sẽ viết đoạn code cho Given (Navigate to Gmail site)
```
@Given("I am on 'Gmail' site")
	def I_am_on_gmail_site() {
		WebUI.openBrowser(null)
		WebUI.navigateToUrl('https://gmail.com')
	}
  ```
  
-  Khi bạn quay lại file feature vẫn thấy dấu vàng warning bởi vì nó chưa được matching với script. Nên chúng ta cần phải `Click chuột phải` --> `Recalculate steps`
 
- Tiếp theo mình sẽ viết test script cho dòng đầu tiên `When I input email 'oanh.framgia@gmail.com'`

![](https://images.viblo.asia/ad072255-8550-4aef-9efc-8803e5a8e1c0.png)

  + Lưu ý ở đây là `(.*)` sẽ thay thế cho nội dung cần nhập (email)

- Next chúng ta sẽ viết đoạn code cho `And I click on Next button`

![](https://images.viblo.asia/7e038c99-f702-47d0-8d3b-8a27794e9a3d.png)

- Next chúng ta sẽ viết đoạn code cho `And I input password 'Abc@123123'`

![](https://images.viblo.asia/4a81ec12-99ed-40a3-be8b-cfe3ce796d5e.png)

- Next chúng ta sẽ viết đoạn code cho `Then I will navigate to Gmail page and see an email correctly`

![](https://images.viblo.asia/0f7fe550-815d-4036-9d7a-24d022ab716d.png)

Đây là video toàn bộ những gì mình đã làm nha:
https://drive.google.com/open?id=1-Q-CxeWYqMZjWR5kxZfCdE6V4S7xQ57t

Nguồn Tham khảo:
- https://www.softwaretestingmaterial.com/cucumber-bdd-for-automation-testing/
- https://docs.katalon.com/katalon-studio/videos/cucumber_runner_bdd.html