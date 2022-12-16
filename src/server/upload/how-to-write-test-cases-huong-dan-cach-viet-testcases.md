Hôm nay mình sẽ hướng dẫn cách viết Testcase cho các bạn newbie nhé. Mỗi công ty sẽ đều có cách viết khác nhau nhưng đây sẽ là mẫu viết Testcase cơ bản nhất mà các bạn nên cần biết. 

Đầu tiên, chúng ta cùng tìm hiểu:
### 
### **A. Testcase là gì?**
![](https://images.viblo.asia/8b43138d-034b-45fd-a73b-ff7609118570.png)
- Testcase là các trường hợp kiểm thử bao gồm các hành động được thực hiện nhằm kiểm tra từng chức năng của ứng dụng phần mềm có hoạt động đúng theo như mong muốn hay không. 

### B. Làm thế nào để có thể viết được Testcase tốt?

![](https://images.viblo.asia/d83d6273-7670-43c0-a1ba-289317a9de27.jpg)

  **I. Trước khi bắt tay vào việc viết Testcase thì chúng ta cần nhớ những điểm sau đây:**

+ Là 1 newbie, mới gia nhập công ty, chúng ta nên hỏi QA leader về template viết Testcase và xin file đó để làm. ( Vì mỗi công ty sẽ có cách viết khác nhau)
+ Viết Testcase nhớ phải bám sát tài liệu yêu cầu ( spec)
+ 1 Testcase ID không quá 15 bước ( step)
+ Trước khi viết Testcase thì ta nên đọc và phân tích tài liệu thật kĩ càng, có chỗ nào chưa hiểu thì đặt Q&A ( Question & Answer) với các member trong team hoặc QA leader hoặc khách hàng để việc viết testcase và test được chính xác và chắc chắn hơn. 

**II.  Những nguyên tắc để viết TestCase tốt:**

![](https://images.viblo.asia/a505a8a3-9b1c-4a67-b746-428822a27c4d.png)

**1. Các trường hợp kiểm thử cần phải đơn giản và minh bạch: (Test Cases need to be simple and transparent)**
- Tạo các testcase đơn giản nhất có thể nhưng vẫn phải rõ ràng và dễ hiểu. 
- Sử dụng những thuật ngữ thông dụng như: 
Go to the Home page 
Enter data 
Click on this button 

=> Điều này làm cho việc hiểu các bước kiểm tra dễ dàng và được thực hiện nhanh hơn. 

**2. Tạo Testcase với vai trò mình là End -user (người dùng ứng dụng đó)**

- Mục tiêu cuối cùng của bất kì dự  án phần mềm nào cũng là đáp ứng được tất cả các yêu cầu của khách hàng. Vậy nên đặt vị trí của mình là người dùng thì sẽ thực hiện test được hiệu quả hơn. Chứ không nên có suy nghĩ mình chỉ là QA, chỉ là tester nên mình cứ test theo những gì spec nói thôi. Khi thấy UI nó khó dùng thì ta nên ta feedback lại với PM hay với mọi người để tất cả cùng cân nhắc có nên thay đổi hay không. 

**3. Mỗi testcase đều phải được xác định**

- Đặt tên ID cho từng testcase để dễ dàng theo dõi

**4. Các kĩ thuật cần áp dụng trong khi viết Testcase**

 **a ,Phân tích giá trị biên (Boundary Value Analysis ) :** Kĩ thuật xác định ranh giới cho 1 phạm vi giá trị được chỉ định. 
Ví dụ: Giá trị của field A nằm trong khoảng 0 ->  100 
=> Ta sẽ có các giá trị biên sau: -1 , 0, 100, 101
+ Case 1: Input field A = 0  => PASS
+ Case 2: Input field A = -1 => BÁO LỖI 
+ Case 3: Input field A = 100 => PASS
+ Case 4: Input  field A = 101 => BÁO LỖI  

**b, Phân vùng tương đương  (Equivalence Partition):** Kỹ thuật này phân vùng phạm vi thành các phần / nhóm bằng nhau có xu hướng có cùng hành vi.

Ví dụ: Giá trị của field A nằm trong khoảng 0 ->  100 thì ta sẽ có các case sau
+ Case 1: Input field A = 0  => PASS
+ Case 2: Input field A = 100  => PASS
+ Case 3: Input field A < 0  => -1 ;   -2  => BÁO LỖI 
+ Case 4: Input field A > 100 =>  110;   120 => BÁO LỖI 
+ Case 5: Input  0 > field A < 100 => PASS ( lưu ý giá trị = 1, =100 -> Pass)
+ Case 6: Input dữ liêu là dạng chữ hay kí tự đặc biệt => BÁO LỖI 
+ Case 7: Để field A = null => BÁO LỖI 

**c,Kỹ thuật Bảng quyết định (Decision tables) :** Phương pháp này  tìm được những tác động khi kết hợp các yếu tốt đầu vào khác nhau và các trạng thái phần mềm mà phải thực hiện đúng các quy tắc nghiệp vụ khác.
 
**d, Kỹ thuật đoán lỗi (Error Guessing Technique)**: Đây là đoán / dự đoán lỗi có thể phát sinh trong khi thực hiện test manual.

**5. Review chéo (Peer Review):** Sau khi tạo xong Testcase,  hãy nhờ đồng nghiệp của bạn review giúp, có thể là QA leader hay QA cùng team để phát hiện ra các case mà bạn còn thiếu hoặc bạn chưa nghĩ tới.  

### C. Thực hành viết Testcase: 
-  Khi join vào dự án, chúng ta được QA Leader giao cho nhiệm vụ là viết Testcase cho màn Login của 1 website với UI như thế này:
![](https://images.viblo.asia/adee7428-a65b-494e-a007-1b0ed142fd18.png)

Ta sẽ viết theo format chuẩn như sau:



| Testcase ID | Test Scenario | Test Steps | Test Data | Expected Results | Actual Results| Status |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| LG01     | Check UI      | 1. Go to stie http://abc.com <br> 2. Observe on the screen    |    | 2. System displays: <br> - Titlle: ALREADY REGISTERED? <br> - Email address field: Default = Blank <br> - Password field: Default = Blank <br> - Forgot your password? button <br> - Sign in button   <br>  (Refer UI Zeplin: gắn link UI nếu có )    |As expected     | Pass |
| LG02| Check button Sign in when user input valid data|1. Go to stie http://abc.com <br> 2. Input valid Email <br> 3. Input valid Password <br> 4. Click on the Sign in button |Email = abc@gmailcom <br> Password = abc123  |4. User can login successfully and system go to the Homepage | As expected | Pass|
| LG03     | Check button Sign in when user input invalid data   |1. Go to stie http://abc.com <br> 2. Input invalid Email <br> 3. Input valid Password <br> 4. Click on the Sign in button|Email = abc@ <br> Password = abc123       | 4. User cannot login  and system shows error message: Email is invalid.    |  As expected    |Pass  |

 Qua 3 ví dụ trên các bạn có thể dễ dàng hơn với việc với Testcase rồi đúng không nào? Tương tự các case trên, các bạn áp dụng Kĩ thuật Bảng quyết định, ta sẽ có thêm các case sau:
 
| Case 4 | Leave blank 2 fields: <br> Email and Password | Can not login|
| -------- | -------- | -------- |
| Case 5     | Input invalid Email <br> Input invalid Password |Can not login      |
| Case 6| Input valid Email <br> Input invalid Password| Can not login|
| Case 7| Input invalid Email <br> Leave Password field blank| Can not login|
 | Case 8| Input valid Email <br> Leave Password field blank| Can not login|
 | Case 9| Leave Email field blank <br> Input invalid Password|Can not login|
 | Case 10|  Leave Email field blank <br>Input valid Password| Can not login|
 
 
 <br>
 
Đó là những cách cơ bản để bạn có thể viết TESTCASE hiệu quả. Chúc các bạn thành công nhé!
Các bạn có thể tham khảo thêm Template ở đây:
https://www.guru99.com/test-case.html