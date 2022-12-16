## **1. Vòng đời của bug**
![](https://images.viblo.asia/3d5f2dd0-7d02-455f-8c72-de877e0ba250.png)
Trong quá trình phát triển và quy trình kiểm thử phần mềm, mỗi một bug mà chúng ta tìm thấy đều có 1 vòng đời riêng. Công việc của 1 người tester không chỉ là việc tìm và log các bug mà họ phải quản lý được vòng đời của bug đó cho tới khi nó được đóng lại.

Dưới đây là tất cả các trạng thái mà 1 bug có thể phải trải qua:

**New:**  Khi người kiểm thử log lên 1 bug mới, bug đó sẽ được gán trạng thái là New.

**Assigned:**  Sau khi bug được log bởi người kiểm thử thì leader của team hoặc của dự án sẽ gán các bug đó cho developer chịu trách nhiệm phát triển chức năng có chứa bug đó để fix. 

**Open:**  Ở bước này, các developer bắt đầu quá trình phân tích xem đó có phải là bug hay không và tiến hành sửa lỗi nếu đó đúng là 1 bug.

**Fixed/ Resolved:**  Sau khi tiến hành sửa lỗi và xác minh rằng lỗi đó đã được sửa  thì developer sẽ chuyển trạng thái của bug thành Fixed/ Resolved.

**Pending retest/ Deploy:**  Đây là trang thái sau khi bug được fix ở máy local của developer, code sẽ được đưa lên môi trường test để chuẩn bị cho tester thực hiện retest.

**Retest:**   Tester sẽ tiến hành kiểm tra lại để xem bug đó đã được sửa hay chưa.

**Reopen:**  Nếu lỗi vẫn tồn tại sau khi fix thì lúc này tester sẽ chuyển trạng thái của bug thành Reopen.

**Verified:**   Tester kiểm tra nếu bug đó đã được sửa thì chuyển trạng thái thành Verified.

**Closed:**  Sau khi lỗi được sửa, nó được kiểm tra bởi người tester. Nếu lỗi đó không còn xuất hiện trong phần mềm, người kiểm thử có thể chuyển trạng thái thành Closed. Trạng thái này có nghĩa là bug đã được sửa chữa, kiểm tra và phê duyệt.

**Duplicate:**  Nếu bug mà tester log lên bị lặp lại hoặc 2 bug cùng đề cập tới 1 vấn đề thì developer sẽ chuyển trạng thái của bug đó thành Duplicate.

**Rejected:**  Nếu developer nhận thấy rằng đó không phải là bug thì sẽ chuyển trạng thái về  Rejected

**Deferred:**  Là lỗi , lỗi này sẽ được sửa trong bản release sau. Sự chuyển trạng thái này cũng do nhiều yếu tố quyết định ví dụ như : mức độ nghiêm trọng, mức độ ưu tiên của lỗi và thiếu thời gian để sửa lỗi đó. 

**Not a bug:**   Trạng thái được cung cấp dưới dạng Không phải là lỗi nếu không có thay đổi về chức năng của ứng dụng. Ví dụ: Nếu khách hàng yêu cầu một số thay đổi về giao diện của ứng dụng như thay đổi màu sắc của một số văn bản thì đó không phải là lỗi mà chỉ là một số thay đổi về giao diện của ứng dụng.

Trên đây là toàn bộ các trạng thái của 1 ticket được log lên redmine, tuy nhiên, tuỳ vào cách quản lý của từng dự án mà mỗi dự án sẽ chỉ sử dụng một số trạng thái nhất định để phù hợp với nhu cầu.
## 2. Cách log 1 bug lên redmine
### 2.1. Tracker 

Chọn tracker là Bug.

### 2.2. Subject ( tiêu đề của bug)

* Tiêu đề nên được đặt ngắn gọn và rõ ràng để dev có thể chỉ đọc tiêu đề này cũng có thể hình dung ra bug mà không cần tốn thời gian đọc các bước mô tả sau.
Một tiêu đề của bug nên có các phần :

* Loại bug:  Ví dụ như bug về giao diện hay bug về chức năng. Thường được kí hiệu bằng prefix [UI]/ [Logic],...Ngoài ra, ở một số giai


* Vị trí màn hình xuất hiện bug: Ví dụ bug mà chúng ta tìm được ở màn hình Login thì ta nên cho thêm vào trước nội dung của tiêu đề chữ [Login].

* Các tiêu đề không nên viết quá dài và chung chung sẽ dẫn đến khó hiểu cho dev.

Ví dụ : 
![](https://images.viblo.asia/c34922da-72f2-43cf-8ca5-df0043530e4a.PNG)

### 2.3. Description( Mô tả lỗi)

Một mô tả lỗi đầy đủ bao gồm các phần như sau:

**Summary:** Đây là phần bạn có thể diễn đạt rõ hơn về lỗi mà bạn gặp phải mà không lo giới hạn về mặt ký tự như ở phần Subject.Tuy nhiên chúng ta cũng có thể bỏ qua phần summary này nếu Subject đã diễn đạt rõ ràng và đầy đủ về bug đó. 

**Pre- Condition :** Phần này là điều kiện tiên quyết ( nếu có ) Nêu rõ các điều kiện cần thực hiện trước khi làm theo các bước để tái hiện bug.

**Step to reproduce:** Trong phần mô tả, chúng ta nên đánh số các bước thực hiện một cách rõ ràng , mỗi hành động là 1 bước. Hãy đảm bảo là khi người khác thực hiện các bước giống như bạn viết ra thì có thể tái tạo được bug.
Ví dụ: 
1. Open the application
2. Enter a valid email
3. Password = blank
4. Click on " Login" button.

**Actual result :** Thể hiện đúng trạng thái hiện tại của bug.

**Expected:**  Thể hiện rõ ràng và chính xác kết quả mong muốn. Chúng ta có thể gắn link đoạn spec mô tả chức năng để cho developer đỡ mất công tìm kiếm.

Ví dụ: 
- Change text color to blue 
- Textsize: 13pt.

**Lưu ý:**

- Để dev có thể tái hiện được lỗi một cách nhanh chóng và dễ dàng,  chúng ta nên thêm phần Test data( dữ liệu test) 
- Đính kèm hình ảnh hoặc video bug. 
- Không nên dùng các từ ngữ mang tính ra lệnh như " phải", " không được phép"  mà thay vào đó là các từ ngữ mang ý nghĩa nhẹ nhàng hơn như " nên được".
- Log bug nên ngắn gọn, rõ ràng và dễ hiểu .

### **2.4. Assign:**

Nếu bạn biết rõ dev nào thực hiện chức năng đó thì bạn có thể assign trực tiếp cho dev đó. Còn nếu không , hãy assign cho leader rồi sau đó leader sẽ assign cho dev.

### **2.5. Phân biệt rõ Severity và  Priority:** 

Bug serverity và Bug Priority là 2 khái niệm rất dễ gây nhầm lẫn trong quá trình quản lý bug.
Tuy không phải là yếu tố sống còn trong dự án nhưng nếu hiểu được chính xác ý nghĩa của 2 khái niệm  này sẽ giúp chúng ta quản lý thời gian và công việc tốt hơn. 

**Bug serverity**  là mức độ nghiêm trọng của một con bug,  thường chỉ mức độ tác động của  bug đó đến sản phẩm/ người dùng. Mỗi dự án hay sản phẩm có tiêu chí đánh giá độ nghiêm trọng khác nhau nhưng thông thường sẽ có 4-5 mức độ khác nhau từ nghiêm trọng nhất đến ít nghiêm trọng hơn:

**Mức độ 1:** Hệ thống sập, dữ liệu bị mất, ứng dụng không cài đặt được .

**Mức độ 2:**  Chức năng chính của sản phẩm không hoạt động.

**Mức độ 3:** Chức năng phụ của sản phẩm không hoạt động.

**Mức độ 4:** Bug nhỏ, không quan trọng.

**Mức độ 5:** Yêu cầu cải tiến sản phẩm, thêm chức năng.

Việc xác định mức độ nghiêm trọng của bug chỉ là tương đối bởi vì có thể tester nhìn nhận vấn đề đó là nghiêm trọng,ảnh hưởng đến dự án nhưng với các nhìn của người quản lý dự án hoặc khách hàng thì vấn đề đó không quá nghiêm trọng.

**Bug Priority:**     Đã là bug thì chắc chắn sẽ phải sửa, chỉ là sửa sớm hay muộn mà thôi. Chính vì vậy mà priority của bug giúp chúng ta xác định thứ tự sửa bug đó. Ví dụ 1 dự án đang đến ngày release nhưng còn khá nhiều bug chưa được fix,  vì không thể fix toàn bộ các bug nên, priority sẽ giúp chúng ta lựa chọn các bug nên được fix vào lúc này. Những bug có priority cao sẽ được ưu tiên fix trước.  Có 3-4 mức độ để xác định độ ưu tiên của 1 bug:

**Mức độ 1:** Cao – Bug sẽ phải sửa ngay lập tức.

**Mức độ 2:** Trung bình – Bug sẽ sửa trong bản cập nhật lần tới.

**Mức độ 3:** Thấp – Bug không cần sửa trong bản cập nhật lần tới, có thể sửa nếu có thời gian.

Để dễ dàng trong việc phân biệt mức độ ưu tiên và mức độ nghiêm trọng, mình sẽ lấy một vài ví dụ như sau.

Ví dụ về 1 bug có priority high và severity low: Một website của công ty có logo bị sai chính tả, bug này rất dễ dàng để sửa và cũng không ảnh hưởng nghiêm trọng tới hệ thống nhưng độ ưu tiên lại cao vì tên công ty sai sẽ ảnh hưởng rất lớn đến uy tín của công ty.

Hay một ví dụ khác về priority low và severity high: Một trò chơi có khoảng 10 level nhưng ở level thứ 9 thì app sẽ bị down. Việc app bị down như vậy sẽ ảnh hưởng rất nghiêm trọng tới người dùng và hệ thống nhưng độ ưu tiên lại không cao vì để chơi được đến level này thì không phải ai cũng có thể làm được điều đó :D, do đó bug này có thể để sửa sau. 

Đây là hình ảnh ví dụ cho 1 bug mà mình đã log lên redmine

![](https://images.viblo.asia/9cc2ef11-2c69-4b5b-bffc-933b13130932.PNG)

Các bạn cũng có thể đăng ký tài khoản rồi thực hành log bug lên redmine [tại đây.](http://demo.redmine.org)

Như vậy , trên đây là các kiến thức mà mình đã tìm hiểu về bug và cách log bug. Trong quá trình tìm hiểu chắc chắn sẽ có những lỗi sai, mong được các bạn góp ý để kiến thức của mình được hoàn thiện hơn. Cảm ơn các bạn ! <3

## 3. Tài liệu tham khảo 
https://www.guru99.com/defect-life-cycle.html

http://softwaretestingfundamentals.com/defect-priority/
 

 

.