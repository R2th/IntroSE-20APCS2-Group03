## 1. Test Scenario là gì?				
				
Scenario sẽ kiểm thử bất kỳ chức năng nào			
				
Là một bộ test case để đảm bảo rằng luồng nghiệp vụ đã được kiểm tra từ đầu đến cuối				
				
Có thể là các thử nghiệm độc lập hoặc một loạt các thử nghiệm nối tiếp nhau, mỗi thử nghiệm phụ thuộc vào đầu ra của thử nghiệm trước đó				

<br>

**Test Scenario trả lời cho câu hỏi ‘Những cái gì sẽ được kiểm tra’ và Test Case thì trả lời cho câu hỏi ‘Thực hiện kiểm thử như thế nào’**
				
				
## 2. Sự khác biệt giữa Test case và Test scenario				
			
| Test case | Test scenario |
| -------- | -------- |
| Test case bao gồm tập hợp các giá trị đầu vào, điều kiện tiên quyết thực hiện, kết quả mong đợi | Test scenario không có gì ngoài phương thức kiểm thử |
| | Test scenario liên hệ đến một hoặc nhiều test case, có nghĩa là 1 scenario là tập hợp nhiều test case |
| Test case thể hiện từng hành động đơn lẻ của người sử dụng | Test scenario thể hiện một chuỗi các hành động được liên kết với nhau |
| Test case bao gồm tập hợp giá trị đầu vào và đầu ra của hệ thống | Scenario là một luồng hoạt động |

<br>

**Ví dụ: Kiểm tra chức năng của button Login**

<br>

**Test case:**
| ID | Precondition | Step	|Expected Result |
| -------- | -------- | -------- | -------- |
| 1 | [Login] screen is displayed | 1. <br>Set [User name] = "Blank" <br>Set [Password] = "Blank"<br>2. Click [Login] button" | Error message is displayed |
| 2	|  |1. <br>Set [User name] = "Valid"<br>Set [Password] = "Blank"<br>2. Click [Login] button" | Error message is displayed |
| 3 | | 1. <br>Set [User name] = "Blank"<br>Set [Password] = "Valid"<br>2. Click [Login] button" | Error message is displayed |
| ... | ... | ... | ... |

<br>

**Test scenario:**
| ID | Requirement name | Test scenario | Test case |	
| -------- | -------- | -------- | -------- |
| 1 | Login | Validate	| 1. Click the button without entering user name and password<br>2. Click the button only entering User name<br>3. Click the button while entering wrong user name and wrong password	|
| ... | ... | ... | ... |	


<br>

*Nguồn tham khảo:*

*https://www.guru99.com/test-scenario.html*

*https://www.softwaretestingclass.com/what-is-difference-between-test-cases-vs-test-scenarios/*

*Test Scenario template - QualiTest*