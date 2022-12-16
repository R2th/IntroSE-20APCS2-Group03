**Locator là gì?**

Locator có thể được gọi là địa chỉ để xác định một Web element trong trang web. Các Locators là các thuộc tính  HTML của  một Web element thông báo cho Selenium về Web element mà Selenium cần biết để thực thi. 

Có rất nhiều Web element nhưng phổ biến nhất trong số đó là:

* Text box
* Button
* Drop Down
* Hyperlink
* Check Box
* Radio Button


 Về cơ bản, mỗi lệnh Selenium đều yêu cầu các locators tìm các Web element. Do đó, để xác định các Web element này một cách chính xác chúng ta có các loại  locators khác nhau.


**Sử dụng ID làm Locator**

Phương pháp tốt nhất và phổ biến nhất để xác định Web element là sử dụng ID. 

![](https://images.viblo.asia/a3fb060f-b093-4223-80ab-7347e1b93a9c.jpg)

Trong ví dụ này, mình sẽ truy cập vào Email.

***Tìm ID của Web element bằng Firebug***

Bước 1: Khởi chạy trình duyệt web (Firefox) và navigate đến https://accounts.google.com.vn.

Bước 2: Mở Firebug bằng cách nhấn F12.

Bước 3: Click vào biểu tượng kiểm tra để xác định Web element.
![](https://images.viblo.asia/b90097a1-ed45-4116-b643-6c9c4cc19d87.jpg)

Bước 4: Trỏ chuột vào Textbox Email. Trong phần firebug, chúng ta có thể thấy các thẻ HTML tương ứng được tô sáng.

![](https://images.viblo.asia/d5de24ab-eca5-423b-a6db-3bba7c732926.jpg)

Bước 5: Xác minh xem ID được xác định có thể tìm thấy element hay không ( Trong ví dụ này ID = Email)

Cách tiếp cận khác: 

Thay vì làm theo bước 2 đến 4, bạn có thể kiểm tra trực tiếp phần tử web bằng cách nhấp chuột phải vào phần tử web (Email Textbox) có giá trị định vị mà chúng ta cần kiểm tra và nhấp vào “Inspect Element with Firebug” thẻ HTML tương ứng sẽ được tô sáng.
![](https://images.viblo.asia/8422890b-d169-44b6-a4af-6e05a52db5d0.jpg)

***Verify giá trị Locator***

Mở trình duyệt “https://accounts.google.com/”.

Bước 1: Khởi chạy Selenium IDE.

Bước 2: Click vào hàng đầu tiên trong phần soạn thảo.

Bước 3: Nhập mã id = Email. 

Bước 4: Click vào Find button. Nếu giá trị của trình định vị được cung cấp đúng thì textbox Email sẽ được tô sáng bằng màu vàng. Nếu giá trị của trình định vị được cung cấp không chính xác, thông báo lỗi sẽ được in trong ngăn nhật ký ở dưới cùng của Selenium IDE.

***Trường hợp 1 - Locator value = Chính xác***

![](https://images.viblo.asia/dd726dcd-aee8-4d41-8685-099afa8ccd19.jpg)

***Trường hợp 2 - Locator value = Không chính xác***

![](https://images.viblo.asia/f94613be-3491-41b9-9774-94f2eb85a74a.jpg)

**Sử dụng ClassName làm Locator**

Trong ví dụ này,  mình sẽ truy cập vào "Need Help?" Hyperlink  ở cuối form đăng nhập gmail

***Tìm classname của Web element bằng Firebug***

Bước 1: Click chuột phải vào Web element có giá trị định vị mà chúng ta cần kiểm tra và Click vào “Inspect Element with Firebug”.

Bước 2: Xác minh xem classname được xác định có tìm thấy phần tử chính xác không.
![](https://images.viblo.asia/dc77ff38-650e-4ed9-ac29-f976e663e6b6.jpg)

Cú pháp: class = classname of the element

Trong trường hợp này, classname là “need-help-reverse”

***Verify giá trị Locator***

Bước 1: Type “class= need-help-reverse”

Bước 2: Click Find button.  Hyper link sẽ được tô sáng bằng màu vàng.
![](https://images.viblo.asia/d9c7b84f-1286-4f14-b2a5-423b501273e0.jpg)

**Sử dụng Name làm Locator**

Mình sẽ truy cập vào Password textbox trong form login gmail.

Syntax: name = name of the element

Trong ví dụ này. Name là “Passwd”.

***Verify giá trị Locator***

Bước 1: Nhập Tên = Passwd và Click Find button. Password textbox sẽ được tô sáng.

**Sử dụng Link text làm Locator**

Mình sẽ truy cập vào “Create an account” link ở cuối form đăng nhập gmail.

***Tìm Link text của Web element bằng Firebug***

Bước 1: Click chuột phải vào Web element có giá trị định vị chúng ta cần kiểm tra và Click vào “Inspect Element with Firebug”.

Bước 2: Focus vào text có trong các thẻ <a> </a>.
![](https://images.viblo.asia/2a420a74-89db-4ef2-b79d-3510512120c1.jpg)

Syntax: link = link text of the element

Trong trường hợp này, Link text là “Create an account”.

***Verify giá trị Locator***

Bước 1: Gõ “link=Create an account”

Bước 2: Click Find button. Link sẽ được tô sáng bằng màu vàng .

![](https://images.viblo.asia/353b95f0-7352-49ef-9a9b-301caaf0fb01.jpg)

**Sử dụng Xpath làm Locator**

Xpath được sử dụng để xác định các phần tử web dựa trên path XML của nó. Đây được xem là kỹ thuật hiệu quả nhất, có thể xác định tất cả các phần tử trên trang web - thường là các element không định vị được bằng id, name, class. Tuy nhiên khi có sự thay đổi trong cấu trúc trang thì bạn sẽ cần phải update lại thông tin các element liên quan.

Xpath có 2 dạng:

**Xpath tương đối (Relative Xpath)**

Các Xpath này thường bắt đầu từ vị trí hiện tại và có  "//". Xpath tương đối sẽ đơn giản, ngắn gọn và ít khi bị ảnh hưởng khi cấu trúc web thay đổi.

Ví dụ:   //span[@class=’Email’]

**Xpath tuyệt đối (Absolute Xpath)**

Khác với Xpath tương đối, Xpath tuyệt đối sẽ bắt đầu từ trang gốc thay vì trang hiện tại đang đứng và có "/".

Ví dụ: /HTML/body/div/div[@id=’Email’]

**Tạo Xpath của 1 Web element**

Bước 1: Nhập “//img[@class='logo']” 

Bước 2: Click Find button. Hình ảnh sẽ được highlighted màu vàng.

![](https://images.viblo.asia/853e593d-1de4-4edb-ba19-176ea8ff8491.jpg)

Trên đây là chia sẻ của mình về Selenium Locators. Cám ơn các bạn đã đọc, rất mong bài viết của mình có thể giúp đỡ phần nào những vướng mắc của các bạn!

Link tham khảo: https://techblog.vn/cach-xac-dinh-cac-phan-tu-web-bang-using-selenium-xpath-va-other-locators-selenium-tutorial-5