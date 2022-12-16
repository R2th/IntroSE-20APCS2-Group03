**1. Tổng quan về bug**

   Bug là những lỗi phần mềm trong chương trình hoặc trong hệ thống máy tính làm cho kết quả không chính xác hoặc không hoạt động như mong muốn (theo Wikipedia). 
Vòng đời của bug 

![](https://images.viblo.asia/19473bb8-5796-4c6a-938a-8995e7ed1142.JPG)
Vòng đời của bug được thể hiện như sơ đồ trên, cụ thể là : 
* New: Bug được gán ở trạng thái này là thời điểm tester thực hiện test phần mềm và tìm ra bug. 
* Assigned: Bug được chuyển qua trạng thái “Assigned” khi tester log bug lên hệ thống và tester hoặc team leader sẽ assign các bug đó cho developer chịu trách nhiệm phát triển chức năng bị lỗi đó để sửa chữa. 
* Open: Ở trạng thái này, các developer sẽ check và phân tích xem đây có chính xác là bug hay không. 
* Fixed: Sau khi tiến hành sửa lỗi, developer sẽ chuyển trạng thái của bug thành Fixed
* Pending Retest:  Đây là trang thái sau khi bug được fix ở máy local của developer, code sẽ được đưa lên môi trường test để chuẩn bị cho tester thực hiện retest.
* Retest: Tester kiểm tra lại xem chức năng xuất hiện bug đã được fix hay chưa. Nếu tester vẫn thấy bug này xuất hiện thì sẽ chuyển bug về trạng thái Reopen để developer kiểm tra lại. 
* Verified: Tester kiểm tra nếu bug đó đã được sửa thì chuyển trạng thái thành Verified.
* Closed: Sau khi bug đã được verify bởi tester, chức năng có bug được kiểm tra chắc chắn là không xảy ra bug thì tester sẽ chuyển trạng thái cho bug sang Close.

**2. Cách log bug trên redmine**

   Hiện nay, có rất nhiều công cụ hỗ trợ các dự án quản lý task, feature, issue và bug. Phổ biến một trong số đó là công cụ Redmine. Redmine là 1 công cụ để quản lý dự án trên Web, được viết trên Ruby on Rails, cho phép người dùng quản lý nhiều project và tạo ra cả những subproject trong đó. Redmine cho phép dự án quản lý các issue một cách linh hoạt. Trong bài viết này, tôi tập trung vào việc redmine hỗ trợ tester quản lý các bug một cách hiệu quả và trước tiên chúng ta sẽ đi tìm hiểu về cách log bug trên redmine. 
	Điều kiện để tester log một bug trên redmine là tester đó phải được add vào project trên redmine


**Bước 1**: Truy cập vào redmine project Log in with your account -> Click on Project -> Click on Project name 

**Bước 2**: Sau khi Click vào Project name tester muốn log bug, sẽ được chuyển đến màn hình Project detail

Ở màn hình chi tiết của project, Click vào **New issue**

**Bước 3**: Sau khi click vào New Issue, chuyển qua trang tạo issue như sau: 
![](https://images.viblo.asia/71ed33cc-dabb-44ff-84b2-522a9ea2a892.jpg)

   Bước này là bước quan trọng nhất vì đây là bước mà test sẽ mô tả lại bug và assign bug cho developer. 
   
**1.** Chọn **tracker** là Bug

**2.**  **Subject**: Trường này có thể hiểu là tiêu đề của bug. 
    *  Tiêu đề của Bug nên ngắn gọn, rõ ràng và dễ hiệu. Tiêu đề Bug tốt là tiêu đề mà khi developer/tester khác nhìn vào có thể hình dung ra ngay được bug mà không cần mất nhiều thời gian vào việc đọc phần mô tả bug. 
    *   Format chung: [Loại bug][Vị trí xảy ra bug] Mô tả bug 
    *   Loại bug: Bug về chức năng hoặc về giao diện 
    *   Vị trí xảy ra bug: ví dụ như màn hình Log in, màn hình Dashboard,....
    *   Mô tả bug: Mô tả bug ngắn gọn bằng một câu từ 70 - 90 ký tự
     
     Ví dụ: [Sign-up] Sign-up account successfully although users register with existing email in the Database.

    
**3. Description ( Mô tả bug) bao gồm:**
- Summary: Đây là phần tester mô tả chi tiết hơn về bug mà tester gặp mà không lo giới hạn về mặt ký tự như ở phần Subject.Tuy nhiên, có thể bỏ qua phần summary này nếu Subject đã diễn đạt rõ ràng và đầy đủ về bug đó. 
Thay vào đó, tùy từng đặc điểm của dự án và yêu cầu của khách hàng phần này có thể thay bằng mô tả test case với format
	Test case: TC-ID x, y - [link TC ID-x, y]
- Pre- Condition : Phần này là điều kiện tiên quyết ( nếu có ) Nêu rõ các điều kiện cần thực hiện trước khi làm theo các bước để tái hiện bug.
- Step to reproduce: Trong phần mô tả, chúng ta nên đánh số các bước thực hiện một cách rõ ràng , mỗi hành động là 1 bước. Hãy đảm bảo là khi người khác thực hiện các bước giống như bạn viết ra thì có thể tái tạo được bug.
- Actual result : Thể hiện đúng trạng thái hiện tại của bug.
- Expected result: Thể hiện rõ ràng và chính xác kết quả mong muốn. 
- Environment: Môi trường tester đã thực hiện test và phát hiện ra bug 
Ví dụ về việc bug description: 
![](https://images.viblo.asia/22b697b6-d86b-4275-853d-6a611c439508.JPG)

**3. Status:** Sau khi mô tả bug, tester sẽ chọn trạng thái cho bug ở trường Status là New
**4. Priority**: Trường này thể hiện độ ưu tiên của bug. Tùy vào đặc điểm của bug mà sẽ có 5 mức độ ưu tiên như sau: 
	- Immediate: Bug block chức năng QA đang test, cần fix trong 24h.
- Urgent: Block một số function chính, ảnh hưởng đến chất lượng release 
- High: Bug function quan trọng, nằm trong các luồng xử lý chính
- Medium: Bug function không nằm trong  flow chính
- Low: UI, Name, bug suggestion

**5. Assignee**: Nếu tester biết rõ developer thực hiện chức năng đó thì có thể assign trực tiếp cho developer đó còn nếu không, tester sẽ assign cho leader rồi sau đó leader sẽ assign cho developer. 

**6. Bug Severity**: Tùy vào mức độ ảnh hưởng của bug, mà Bug Severity cũng được chia thành 5 mức độ dưới đây: 
    - Blocker: Bug block màn hình, block functions lớn, không thể thực hiện test. 
  * Nếu block màn hình mà vẫn workaround được bằng cách khác thì không set blocker
    - Critical: Crash app/ system/ sai logic nghiêm trọng
    - High: function, flow liên quan đến các test case happy path
    - Normal: các bug validate, function không nằm trong luồng flow chính
    - Low: UI, bug suggestion
    
Sau khi đã log bug trên redmine, tester nên to trên box dự án cho leader hoặc dev chịu trách nhiệm chức năng biết về bug đã biết, giúp dev follow được các bug cần sửa và tiết kiệm thời gian xử lý bug hơn. 

*Trên đây, là những kinh nghiệm quản lý bug trên redmine mình đã tổng hợp được trong những ngày đầu làm việc ở vị trí QA. Hy vọng bài viết này có ích với những bạn QA mới vào nghề và làm việc trong dự án có sử dụng redmine để quản lý ticket.*