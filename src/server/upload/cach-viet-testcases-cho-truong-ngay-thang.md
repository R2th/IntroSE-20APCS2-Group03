Đối với các QA/Tester chuyên nghiệp hay có kinh nghiệm lâu năm thì việc viết TCs cho trường ngày tháng có lẽ chẳng có khó khăn gì. Nhưng đối với những QA/ Tester mới vào nghề như mình thì việc cover hết các trường hợp hay viết được bộ TCs chính xác nhất cũng gặp rất nhiều khó khăn. 
Mình đã tìm hiểu và đọc các tài liệu trên mạng cùng kiến thức bản thân hôm nay mình sẽ chia sẻ cho các bạn một ví dụ về bộ TCs cho trường ngày tháng năm.

### **1. Hướng dẫn viết Testcase cho trường ngày tháng**

Màn hình dưới đây chúng ta sẽ viết TCs để search user theo  tiêu chí ngày tháng, mình sẽ giới thiệu cách viết TCs cho trường Last login( ngày tháng năm). Và đối với các trường ngày tháng năm thường có Date picker bên cạnh để người dùng thay vì phải nhập vào ngày tháng thì có thể chọn trực tiếp trên date picker.

![](https://images.viblo.asia/2ae18ef3-5e56-453a-a3fc-6ad8fab65dd6.png)
Tùy vào từng template TCs của mỗi công ty mà cách viết cũng khác nhau nhưng tổng quan lại bộ TCs bao gồm các thành phần chính
+ ID TCs
+ Page name (*)
+ Category (*)	
+ Pre-condition
+ Test Data	Steps (*)
+ Expected results (*)
 
### **2. Các trường hợp hợp lệ**

 Khi viết TCs mình thường chia ra viết theo từng đối tượng, bao gồm 3 category chính: Default value (giá trị mặc định của trường), Valid cases, Invalid cases
 Đối với trường "Last login" này thì trường hợp lệ sẽ là nhập vào ngày < current day
 
![](https://images.viblo.asia/577a2082-9d6d-44e6-93a8-31636789869a.png)

### **3. Các trường hợp không hợp lệ**

Các trường không hợp lệ của trường ngày tháng mình chia ra làm 4 trường hợp

TH1: Đúng định dạng nhưng không tồn tại trong DB

![](https://images.viblo.asia/d7d4d14c-a809-422e-bf5b-fcce7af10105.png)

TH2: Sai định dạng yyyy/mm/dd cái này có thể tùy từng yêu cầu hay format của khách hàng mà các bạn có thể tùy chỉnh nhé

![](https://images.viblo.asia/cf3d79b3-157f-46b5-86d1-6e7161488365.png)

TH3: Các giá trị ngày / tháng/năm không đúng ví dụ ngày chỉ có từ 01-31 ngày, tháng chỉ có 12 tháng

![](https://images.viblo.asia/b9194f89-a464-49ae-a226-a60d01bf86ed.png)

TH4: Những ngày tháng đặc biệt tuy đúng định dạng nhưng chúng không hợp lệ, và đây là các TCs mà mình thấy nhiều bạn rất hay bỏ qua, hay nói cách khác là thiếu

![](https://images.viblo.asia/ca9fe903-e02c-417f-b005-203c9d147522.png)

### **4. Chia sẻ thêm cách viết Testcase cho trường search**

Vì trong đây có cả chức năng tìm kiếm nên mình muốn chia sẻ thêm về cách viết testcase cho trường tìm kiếm mà mình hay dùng. Tùy vào màn hình có nhiều tiêu trí để tìm kiếm hay không mà mình sẽ thiết kế bộ testcase tương ứng. 

Ví dụ màn hình trên có thêm tìm kiếm với các tiêu trí : Username, Gmail

**Search với 1 tiêu trí:**

+ Search với Username:

TH1: Trường hợp search có kết quả(username tồn tại trong database)

- Tìm kiếm theo từ
 - Tìm kiếm không phân biệt chữ hoa hay chữ thường
- Tìm kiếm cho kết quả tương đối

TH2: Trường hợp search không có kết quả

Nhập username không tồn tại trong database

Tương tự ta tìm kiếm với các tiêu trí còn lại

+ Search với gmail

+ Search với Last login

**Search với  2 tiêu trí:** 

+ Search với username và lastlogin
+ Search với Username và Gmail
+ Search với Gmail và Lastlogin

**Search với  3 tiêu trí:**

+ Để null tất cả các trường và click button Search
+ Nhập đầy đủ thông tin vào các trường và click button Search


Tài liệu tham khảo:

http://www.testingvn.com/viewtopic.php?t=867

https://viblo.asia/p/cac-truong-hop-test-co-ban-4P856av9lY3

***Hy vọng bài viết có thể giúp ích cho bạn!***