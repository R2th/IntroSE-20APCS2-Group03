Trong bài hướng dẫn trước, chúng ta đã làm quen với cách tạo kịch bản test cho Selenium IDE bằng cách sử dụng Firebug để xác định các phần tử Web. Mỗi phần tử có thể định vị bằng ID, type, placeholder và name. Tuy nhiên có những phần tử ta lại không thấy có ID hoặc không biết cách xác định để Selenium có thể tìm ra. Ở bài hướng dẫn này, chúng ta sẽ cùng nghiên cứu về các loại định vị phần tử khác nhau trong Selenium và các kỹ thuật truy cập chúng để tạo ra kịch bản. 

## Locator (định vị) là gì?
Định vị có thể được gọi là địa chỉ để xác định một phần tử web duy nhất trên trang. Các Locators là các thuộc tính của phần tử web mà Selenium cần biết để thực thi.
Trên thực tế các phần tử web rất đa đạng, tuy nhiên trong bài này chúng ta sẽ giới thiệu về một số các control phổ biến nhất:
* Text box.
* Button.
* Drop Down.
* Hyper link.
* Check box.
* Radio button.

## Các loại Locators
Chúng ta có thể nhận thấy các câu lệnh của Selenium đều yêu cầu phải định vị để tìm các phần tử web. Hơn thế, việc xác định phần tử luôn là một chủ đề khá khó, do đó nó yêu cầu một phương pháp hiệu quả và chính xác. Chúng ta có các loại Locator sau: 

![](https://images.viblo.asia/c49b0e77-b9d7-46aa-a5e0-e3530ba79c08.jpg)

### Locator: ID
Sử dụng ID để xác định phần tử Web được biết đến là cách tốt nhất và phổ biến nhất bởi ID của mỗi phần tử là duy nhất. Lưu ý: một số các trang web có sử dụng các framework mà mỗi lần truy cập thì sẽ tự động sinh id khác cho phần tử đó. Lúc này sẽ sử dụng cách khác để xử lý như class - sẽ được giới thiệu ở dưới.

Áp dụng vào ví dụ của bài viết trước "http://login.me.zing.vn/". Các bạn truy cập màn hình đăng ký user: https://id.zing.vn/v2/register.
1. Xác định ID của phần tử
* Bước 1: Hover chuột vào phần tử - element cần định vị.
* Bước 2: Chuột phải ở element đó và kích Inspect Element with Firebug.
* Bước 3: Kiểm tra thông tin của element đó. Ta xác định được id=regacc_fullname.

![](https://images.viblo.asia/027af273-d4e6-436b-b9cb-e4fc2641bef7.jpg)

2. Kiểm tra giá trị locator
* Bước 1: Mở và chạy Selenium IDE trên Firefox.
* Bước 2: Click vào dòng đầu tiên trong vùng Editor.
* Bước 3: Gõ id của element vừa lấy ở trên vào trường Target
* Bước 4: Click nút Find. Khi tìm được chính xác element, trường Họ và tên sẽ được highlight màu vàng. 

![](https://images.viblo.asia/b0c05e1f-6adc-43c4-a29d-9ccb0f7e7ff5.jpg)

Nếu element không chính xác sẽ hiển thị thông báo cho người dùng "[error] locator not found: regacc_fullname1"

![](https://images.viblo.asia/bc92ec82-3c9b-41e7-97aa-7421aae3e9ab.jpg)

### Locator: ClassName

Ngoài ID thì ClassName cũng là 1 thuộc tính để xác định phần tử trên Web. Lưu ý: có nhiều phần tử có tên Class giống nhau --> không tìm ra được.

**Cú pháp:** class= tên class của phần tử (element).

Áp dụng vào ví dụ của bài viết trước "http://login.me.zing.vn/". Các bạn truy cập màn hình đăng ký user: https://id.zing.vn/v2/register.
1. Xác định ID của phần tử
* Bước 1: Hover chuột vào phần tử - element cần định vị - Ngày sinh.
* Bước 2: Chuột phải ở element đó và kích Inspect Element with Firebug.
* Bước 3: Kiểm tra thông tin của element đó. Ta xác định được class=finput reg_date.

![](https://images.viblo.asia/0c3f7514-365c-425f-9bae-a0ba6397e626.jpg)

2. Kiểm tra giá trị locator
* Bước 1: Mở và chạy Selenium IDE trên Firefox.
* Bước 2: Click vào dòng đầu tiên trong vùng Editor.
* Bước 3: Gõ id của element vừa lấy ở trên vào trường Target
* Bước 4: Click nút Find. Khi tìm được chính xác element, trường Họ và tên sẽ được highlight màu vàng. 

![](https://images.viblo.asia/a856e7f8-8da6-4650-8e1f-9bd9627985cd.jpg)

### Locator: Name

Việc sử dụng thuộc tính "name" để xác định phần tử cũng giống như hai loại trên và chỉ khác ở cú pháp. Tương tự như ID, tên của các phần tử thường là duy nhất, cũng như không thay đổi sau những lần refresh. Đây cũng là 1 locator đơn giản và dễ dàng sử dụng.

**Cú pháp:** name = tên của phần tử (element)

Áp dụng vào ví dụ "http://login.me.zing.vn/"

1. Xác định ID của phần tử tương tự như cách làm với ID. Ta được: name = fullname

![](https://images.viblo.asia/3ffbe242-e095-487b-ba77-77a607d0ef27.jpg)

2. Kiểm tra giá trị locator
* Bước 1: Mở và chạy Selenium IDE trên Firefox.
* Bước 2: Click vào dòng đầu tiên trong vùng Editor.
* Bước 3: Gõ name của element vừa lấy ở trên vào trường Target
* Bước 4: Click nút Find. Khi tìm được chính xác element, trường Họ và tên sẽ được highlight màu vàng. 

![](https://images.viblo.asia/a013ec97-7805-4a0a-a9f5-85bb6f568263.jpg)

### Locator: Link Text
Việc sử dụng Link Text để xác định các element là cách cực kỳ hiệu quả với các dạng hyperlink, các liên kết trên trang web hay chính là test điều hướng. Thông thường các dạng link: text được highlight

![](https://images.viblo.asia/b4e9f7f2-ccfb-432d-aefe-940bda4810b9.jpg)

Tuy nhiên ở ví dụ trên chúng ta rất dễ bị nhầm các control "Kiểm tra", "Đăng ký" là button nhưng thực tế đó cũng là Link Text. Để đơn giản nhận ra đó là link hay button, khi các bạn inspect element, hãy kiểm tra xem có thẻ <a>...</a> hay không. Nếu có thì chính xác đó là link text.
  
![](https://images.viblo.asia/0e54e139-20b6-43a0-ae2a-aa5a14cec342.jpg)

Áp dụng vào ví dụ "http://login.me.zing.vn/"

1. Xác định ID của phần tử tương tự như cách làm với ID. Ta được: link=Đăng ký

![](https://images.viblo.asia/0caf693b-2350-4b98-a773-e20501c0fc82.jpg)https://images.viblo.asia/0caf693b-2350-4b98-a773-e20501c0fc82.jpg

2. Kiểm tra giá trị locator
* Bước 1: Mở và chạy Selenium IDE trên Firefox.
* Bước 2: Click vào dòng đầu tiên trong vùng Editor.
* Bước 3: Gõ link của element vừa lấy ở trên vào trường Target
* Bước 4: Click nút Find. Khi tìm được chính xác element, link "Đăng ký" sẽ được highlight màu vàng. 

![](https://images.viblo.asia/d78894df-85e1-4e0f-a4d7-c939e43d706b.jpg)

### Locator: Xpath
Xpath được sử dụng để xác định các phần tử web dựa trên path XML của nó. Đây được xem là kỹ thuật hiệu quả nhất, có thể xác định tất cả các phần tử trên trang web - thường là các element không định vị được bằng id, name, class. Tuy nhiên khi có sự thay đổi trong cấu trúc trang thì bạn sẽ cần phải update lại thông tin các element liên quan.

XML - eXtensible Markup Language - được sử dụng để lưu trữ, tổ chức và vận chuyển dữ liệu tùy ý. XML lưu trữ dữ liệu trong Key-value pair, nó tương đối giống với các thẻ HTML.

Việc sử dụng Xpath được khuyến khích sử dụng khi thực hiện automation test với các tool như Selenium WebDriver... Chính xác thì các Xpath không phải là một thuộc tính của element, không thể inspect để tìm ra ngay. Xpath là cách thức để có thể tìm ra element trên trang web bằng cách lần lượt đi qua từng lớp để vào dần bên trong và tìm thấy element. Cũng vì lý do phải qua nhiều bước nên hiệu năng thực hiện sẽ bị giảm khi thực thi kịch bản test. 

Hiện nay có nhiều add-on hỗ trợ người dùng sinh ra các Xpath, tuy nhiên việc xác định này cũng không hoàn toàn chính xác. Lưu ý: nên có thêm các kiến thức về Danh pháp và giao thức.

Xpath có 2 dạng:

1. **Xpath tương đối (Relative Xpath)**

Các Xpath này thường bắt đầu từ vị trí hiện tại và có tiền tố "//". Xpath tương đối sẽ đơn giản, ngắn gọn và ít khi bị ảnh hưởng khi cấu trúc web thay đổi.

 Cú pháp: **Xpath=//tagname[@attribute='value']**
 
 Ví dụ:  //input[@id='regacc_fullname']
 
 Chú giải: 
* // : Chọn node hiện tại.
* Tagname: Tên thẻ HTML của node cụ thể.
* @: Select attribute.
* Attribute: Tên thuộc tính của node như id, name, value...
* Value: Giá trị của thuộc tính.

2. **Xpath tuyệt đối (Absolute Xpath)**

Khác với Xpath tương đối, Xpath tuyệt đối sẽ bắt đầu từ trang gốc thay vì trang hiện tại đang đứng và có tiền tố "/". Ví dụ: 

    /html/body/div[3]/div/div[1]/form/div[2][@id='regacc_fullname']

***Cách lấy XPath***

* *Tính năng Copy XPath trên trình duyệt Firefox*: 
Người dùng sẽ inspect element cần định vị. Sau đó kích chuột phải ở dòng highlight thông tin của element và chọn Copy XPath. Cuối cùng, người dùng chỉ cần paste/ dán vào vùng Target. Lưu ý: đôi khi việc xác định XPath không chính xác.

* *Sử dụng các add-on với trình duyệt FireFox*. Cách thức cài đặt tương tự như khi với Selenium IDE: https://addons.mozilla.org/vi/firefox/tag/xpath. Một gợi ý cho sự kết hợp này, đó là FireBug và XPath Finder. FireBug hỗ trợ đọc mã nguồn của trang web và XPath Finder giúp lấy XPath của đối tượng UI.
## Tổng kết
Sau đây chúng ta sẽ tổng kết lại các nội dung chính của bài viết này.

* Locators là các thuộc tính HTML của một phần tử web để Selenium có thể nhận biết và thực thi các câu lệnh tương ứng.
* Một số các phần tử web thường xuyên sử dụng: Text box, Button, Drop Down, Hyperlink, Check Box, và Radio Button.
* Chúng ta cần lựa chọn các cách thức để xác định element cho hiệu quả.
* Một số loại định vị được sử dụng nhiều như: ID, ClassName, Link Text, Xpath, CSS Selectors và Name.
* Xpath là một cách xác định element hữu ích và có hiệu quả cao. Tuy nhiên để sử dụng được Xpath đòi hỏi người dùng phải tìm hiểu kỹ hơn. Bài viết này chỉ với mục đích giới thiệu chung. Để tìm hiểu rõ hơn, hãy chờ đón các nội dung tiếp theo.

Nguồn bài viết:
https://www.softwaretestinghelp.com/using-selenium-xpath-and-other-locators-selenium-tutorial-5/