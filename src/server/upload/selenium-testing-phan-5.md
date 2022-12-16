# Làm thế nào để sử dụng Locators trong Selenium IDE

**Locators là gì?**
Locator là một đoạn lệnh để điều khiển Selenium IDE biết là những thành phần GUI nào cần để vận hành.
Xác định các yếu tố GUI chính xác là điều kiện tiên quyết để tạo ra automation script. Tuy nhiên, việc xác định chính xác các yếu tố giao diện GUI rất khó. Đôi khi, bạn kết thúc làm việc với các yếu tố GUI không chính xác hoặc không có yếu tố nào cả! Do đó, Selenium cung cấp một số Locators để xác định vị trí chính xác một yếu tố GUI
Các loại Locators khác nhau trong Selenium IDE:
* ID
* Name
* Link Text
* CSS Selector
    * Tag and ID
    * Tag and class
    * Tag and attribute
    * Tag, class, and attribute
    * Inner text
* DOM (Document Object Model)
    * getElementById
    * getElementsByName
    * dom:name
    * dom: index
* XPath

Có những lệnh không cần locator (như lệnh "open"). Tuy nhiên, hầu hết trong số đó cần Locators.

Sự lựa chọn của locator phụ thuộc phần lớn vào ứng dụng của bạn . Trong hướng dẫn này, chúng ta sẽ chuyển đổi giữa Facebook, tour.demoaut mới trên cơ sở locators mà các ứng dụng này hỗ trợ. Tương tự trong dự án Testing của bạn, bạn sẽ chọn bất kỳ locators được liệt kê ở trên dựa trên hỗ trợ ứng dụng của bạn.

**Định vị theo ID**
Đây là cách phổ biến nhất để định vị các elements vì ID được cho là duy nhất cho mỗi phần tử.
Target Format: id=id của element
Ví dụ này, chúng ta sẽ sử dụng Facebook làm ứng dụng thử nghiệm vì Mercury Tours không sử dụng các thuộc tính ID.

Bước 1. Kể từ khi hướng dẫn này được tạo ra, Facebook đã thay đổi Thiết kế Trang Đăng nhập của họ. Sử dụng trang thử nghiệm này http://demo.guru99.com/test/facebook.html để thử nghiệm. Kiểm tra text box "Email or Phone" bằng Firebug và lưu ý ID của nó. Trong trường hợp này, ID là "email".

![](https://images.viblo.asia/e8707732-1a32-4a50-9900-e1fc65da6d64.png)

Bước 2. Khởi động Selenium IDE và nhập "id = email" vào text box Target. Nhấp vào nút Find và nhận thấy text box "Email or Phone" trở nên nổi bật với màu vàng và có màu xanh lá cây, có nghĩa là Selenium IDE đã xác định đúng phần tử đó.

![](https://images.viblo.asia/c9ca9dd4-72e4-44a2-971b-5f3fdfd66351.png)

**Định vị theo Name**
Định vị các phần tử theo tên rất giống với vị trí của ID, ngoại trừ việc chúng ta sử dụng tiền tố "name =" thay thế.
Target Format: name=name của element
Bây giờ chúng ta sẽ sử dụng Mercury Tours vì tất cả các yếu tố quan trọng đều có tên.

Bước 1. Điều hướng tới http://demo.guru99.com/test/newtours/ và sử dụng Firebug để kiểm tra text box "User Name". Ghi lại thuộc tính name.

![](https://images.viblo.asia/5de78d19-959d-43ff-b628-866ee35dc5f3.png)

Ở đây, chúng ta thấy rằng tên của phần tử là "userName".

Bước 2. Trong Selenium IDE, nhập "name = userName" vào text box Target và nhấp vào nút Find. Selenium IDE có thể định vị text box User Name bằng cách làm nổi bật nó.

![](https://images.viblo.asia/1a436971-669e-44c9-87f2-2393e3ae2f97.png)

**Định vị bằng Name sử dụng Filters**
Filters có thể được sử dụng khi nhiều elements có cùng tên. Filters là các thuộc tính bổ sung được sử dụng để phân biệt các element có cùng tên.
Target Format: name=name_of_the_element filter=value_of_filter
Ví dụ:

Bước 1 . Đăng nhập vào Mercury Tours bằng cách sử dụng "tutorial" làm username và password. Nó sẽ đưa bạn đến trang Finder Flight được hiển thị dưới đây.

![](https://images.viblo.asia/9e6e1ced-551f-4456-b475-a5f3aabc92da.png)

Bước 2. Sử dụng Firebug, chú ý rằng các nút radio Round Trip và One Way có cùng tên "tripType". Tuy nhiên, chúng có các thuộc tính khác nhau VALUE để chúng ta có thể sử dụng từng thuộc tính như filter của chúng ta.

![](https://images.viblo.asia/fc372dd2-c851-4daf-9922-7a4d87ca5924.png)

Bước 3.
    * Chúng ta sẽ truy cập nút radio One Way trước. Nhấp vào dòng đầu tiên trên Editor.
    * Trong hộp lệnh của Selenium IDE, nhập lệnh "click".
    * Trong hộp Target, nhập "name = tripType value = oneway". Phần "value = oneway" là filter của chúng ta.
 
![](https://images.viblo.asia/9d9cda03-5805-40fb-910e-b01073ed999c.png)

Bước 4 . Nhấp vào nút Find và nhận thấy rằng Selenium IDE có thể làm nổi bật nút radio One Way với màu xanh lục - nghĩa là chúng ta có thể truy cập thành phần thành công bằng cách sử dụng thuộc tính VALUE của nó.

![](https://images.viblo.asia/f9f0c729-c52d-4766-91d9-d743555f0dd7.png)

Bước 5. Nhấn phím "X" trên bàn phím để thực hiện lệnh click. Lưu ý rằng nút radio One Way đã được chọn.

![](https://images.viblo.asia/9ea8c5ba-6ce7-4539-9e0c-bc1fad4f5ae9.png)

Bạn có thể thực hiện chính xác điều tương tự với nút radio Round Trip, lần này, sử dụng "name = tripType value = roundtrip" làm mục tiêu của bạn.

**Định vị bằng Link Text**
Loại định vị này chỉ áp dụng cho các hyperlink texts. Chúng ta truy cập liên kết bằng cách thêm tiền tố mục tiêu của chúng ta bằng "link =" và sau đó là hyperlink text.
Target Format: link=link_text
Trong ví dụ này, chúng tôi sẽ truy cập liên kết "REGISTER" được tìm thấy trên trang chủ của Mercury Tours.

Bước 1.
* Trước tiên, đảm bảo rằng bạn đã đăng xuất khỏi Mercury Tours.
* Đi tới trang chủ của Mercury Tours.

Bước 2 .
* Sử dụng Firebug, kiểm tra liên kết "REGISTER". Link text được tìm thấy giữa và các thẻ.
* Trong trường hợp này, link text của chúng ta là "REGISTER". Copy link text

![](https://images.viblo.asia/59e911bf-1160-493a-9a01-f9f98a2a0995.png)

Bước 3 . Sao chép link text trong Firebug và dán nó vào trường Target của Selenium IDE. Tiền tố với "link =".

![](https://images.viblo.asia/a722dec9-f173-4477-8e85-a6534f453870.png)

Bước 4. Nhấn vào nút Find và nhận thấy rằng Selenium IDE đã có thể làm nổi bật link REGISTER một cách chính xác.

![](https://images.viblo.asia/d8d64a82-74a0-4f7a-8a53-8690c044f10e.png)

Bước 5. Để xác minh thêm, nhập "clickAndWait" trong hộp lệnh và thực hiện nó. Selenium IDE sẽ có thể nhấp vào link REGISTER thành công và đưa bạn đến trang Registration được hiển thị bên dưới.

![](https://images.viblo.asia/69e4b3e3-a067-439e-8fe0-4aa5be164469.png)

**Định vị bằng CSS Selector**
CSS Selectors là các string patterns được sử dụng để xác định element dựa trên sự kết hợp của thẻ HTML, id, class và các thuộc tính. Định vị bằng CSS Selector phức tạp hơn các phương pháp trước đó, nhưng nó là chiến lược định vị phổ biến nhất của người dùng advanced Selenium vì nó có thể truy cập ngay cả những phần tử không có ID hoặc tên.

Các bộ chọn CSS có nhiều định dạng, nhưng chúng tôi chỉ tập trung vào các bộ chọn phổ biến nhất.
* Tag và ID
* Tag và class
* Tag và attribute
* Tag, class, và attribute
* Inner text
Khi sử dụng chiến lược này, chúng tôi luôn đặt tiền tố Target cùng với "css =" như hiển thị trong các ví dụ sau.

**Định vị bằng CSS Selector - Tag và ID**
Một lần nữa, chúng ta sẽ sử dụng text box Email của Facebook trong ví dụ này. Như bạn có thể nhớ, nó có một ID của "email", và chúng tôi đã truy cập vào nó trong phần "Xác định vị trí theo ID". Lần này, chúng ta sẽ sử dụng một Selector CSS với ID để truy cập vào cùng một phần tử.

| Cú pháp | Mô tả |
| -------- | -------- |
| css=tag#id | tag = thẻ HTML của phần tử được truy cập |
| | # = dấu thăng, cái này luôn luôn phải có khi sử dụng CSS Selector với ID |
| | id = ID của phần tử được truy cập |

Lưu ý rằng ID luôn luôn đứng trước dấu thăng (#).

Bước 1. Điều hướng tới www.facebook.com . Sử dụng Firebug, hãy kiểm tra text box "Email or Phone".
Tại thời điểm này, lưu ý rằng thẻ HTML là "input" và ID của nó là "email". Vì vậy cú pháp của chúng ta sẽ là "css = input # email".

![](https://images.viblo.asia/011e07cb-4ef3-4663-a355-cd034dc48185.png)

Bước 2. Nhập "css = input # email" vào trường Target của Selenium IDE và nhấp vào nút Find. Selenium IDE có thể làm nổi bật phần tử đó.

![](https://images.viblo.asia/5dfc3be8-5b5f-4a3a-ae08-f5eb12d100dc.png)

**Định vị bằng CSS Selector - Tag và Class**
Định vị bởi CSS Selector sử dụng thẻ HTML và tên class tương tự như sử dụng tag và ID, nhưng trong trường hợp này, một dấu chấm (.) Được sử dụng thay vì dấu thăng.

| Cú pháp | Mô tả |
| -------- | -------- |
| css=tag#id | tag = thẻ HTML của phần tử được truy cập |
| | . = dấu chấm, cái này luôn luôn phải có khi sử dụng CSS Selector với class |
| | class = class của phần tử được truy cập |

Bước 1. Đến trang giới thiệu http://demo.guru99.com/test/facebook.html và sử dụng Firebug để kiểm tra text box "Email or Điện thoại". Lưu ý rằng thẻ HTML của nó là "đầu vào" và lớp của nó là "đầu vào".

![](https://images.viblo.asia/215d25c0-ba73-41cf-8e0c-5c0a37b65ef6.png)

Bước 2. Trong Selenium IDE, nhập "css = input.inputtext" vào hộp Target và nhấp vào Find. Selenium IDE sẽ có thể nhận ra hộp văn bản Email hoặc Điện thoại.

![](https://images.viblo.asia/078da5e1-9dca-43d3-bd26-4b4067a585a9.png)

Lưu ý rằng khi nhiều phần tử có cùng một thẻ HTML và tên, chỉ có phần tử đầu tiên trong mã nguồn mới được công nhận . Sử dụng Firebug, kiểm tra hộp văn bản Mật khẩu trên Facebook và nhận thấy nó có cùng tên với hộp văn bản Email hoặc Điện thoại.

![](https://images.viblo.asia/3fbc1029-9638-4728-ae48-8e0388fbb238.png)

Lý do tại sao chỉ hộp Email hoặc Điện thoại được đánh dấu trong minh hoạ trước đó là nó xuất hiện đầu tiên trong nguồn trang của Facebook.

![](https://images.viblo.asia/31250f21-d8d7-4c73-aa42-b3cd5ab4db53.png)

Định vị bằng CSS Selector - Nhãn và Thuộc tính
Chiến lược này sử dụng thẻ HTML và một thuộc tính cụ thể của phần tử được truy cập.

| Cú pháp | Mô tả |
| -------- | -------- |
| css=tag[attribute=value] | tag = thẻ HTML của phần tử được truy cập |
| | [and] = dấu ngoặc vuông trong đó một thuộc tính cụ thể và giá trị tương ứng sẽ được đặt |
| | attribute = thuộc tính được sử dụng. Bạn nên sử dụng một thuộc tính duy nhất của phần tử như tên hoặc ID. |
| | value = giá trị tương ứng của thuộc tính đã chọn. |


Bước 1. Điều hướng đến trang Đăng ký Tour Du lịch Mercury ( http://demo.guru99.com/test/newtours/register.php ) và kiểm tra hộp văn bản "Họ Tên". Lưu ý thẻ HTML của nó ("đầu vào" trong trường hợp này) và tên của nó ("lastName").

![](https://images.viblo.asia/6e4bd098-a857-4ecb-a47f-cf4fb5f68019.png)

Bước 2. Trong Selenium IDE, nhập "css = input [name = lastName]" trong hộp Target và nhấp vào Find. Selenium IDE sẽ có thể truy cập hộp Họ tên thành công.

![](https://images.viblo.asia/443a1176-d5fc-4f19-949c-cb9e4966e25b.png)

Khi nhiều phần tử có cùng một thẻ HTML và thuộc tính, chỉ có một phần tử đầu tiên sẽ được công nhận . Hành vi này tương tự như việc định vị các phần tử sử dụng bộ chọn CSS với cùng một thẻ và lớp.

Định vị bằng CSS Selector - tag, class và thuộc tính

| Cú pháp | Mô tả |
| -------- | -------- |
| css=tag.class[attribute=value] | tag = thẻ HTML của phần tử được truy cập |
| | . = dấu chấm. Điều này nên luôn luôn có mặt khi sử dụng một Bộ chọn CSS với lớp |
| | class = class của phần tử được truy cập. |
| | [and] = dấu ngoặc vuông trong đó một thuộc tính cụ thể và giá trị tương ứng sẽ được đặt |
| | attribute = thuộc tính được sử dụng. Bạn nên sử dụng một thuộc tính duy nhất của phần tử như tên hoặc ID. |
| | value = giá trị tương ứng của thuộc tính đã chọn. |

Bước 1. Đến trang giới thiệu http://demo.guru99.com/test/facebook.html và sử dụng Firebug để kiểm tra hộp nhập liệu 'Email hoặc Điện thoại' và 'Mật khẩu'. Lưu ý về thẻ HTML, lớp học và thuộc tính của chúng. Đối với ví dụ này, chúng tôi sẽ chọn thuộc tính 'tabindex' của chúng.

![](https://images.viblo.asia/7a03ac97-b37f-4fac-9bcb-30c796bba7bd.png)

Bước 2. Chúng tôi sẽ truy cập hộp văn bản 'Email hoặc Điện thoại' trước. Do đó, chúng ta sẽ sử dụng một giá trị tabindex là 1. Nhập "css = input.inputtext [tabindex = 1]" trong hộp Target của Selenium IDE và nhấp vào Find. Hộp nhập liệu 'Email hoặc Điện thoại' sẽ được đánh dấu.

![](https://images.viblo.asia/3babc4ce-b2e5-44b0-aa03-75925c663368.png)

Bước 3. Để truy cập hộp nhập Mật khẩu, chỉ cần thay thế giá trị của thuộc tính tabindex. Nhập "css = input.inputtext [tabindex = 2]" vào ô Mục tiêu và nhấp vào nút Tìm. Selenium IDE phải có khả năng xác định thành công hộp văn bản Mật khẩu thành công.

![](https://images.viblo.asia/6615bdf6-3f97-4efa-b91e-e09e57b47fbc.png)

Định vị bằng CSS Selector - văn bản bên trong
Như bạn có thể nhận thấy, nhãn HTML ít khi được đặt tên id, tên hoặc thuộc tính lớp. Vì vậy, làm thế nào chúng ta truy cập chúng? Câu trả lời là thông qua việc sử dụng văn bản bên trong của họ. Văn bản bên trong là các mẫu chuỗi thực tế mà nhãn HTML hiển thị trên trang.

| Cú pháp | Mô tả |
| -------- | -------- | 
| css=tag:contains("inner text") | tag = thẻ HTML của phần tử được truy cập |
|  | inner text = văn bản bên trong của phần tử |

Bước 1. Điều hướng đến trang chủ của Mercury Tours ( http://demo.guru99.com/test/newtours/ ) và sử dụng Firebug để điều tra nhãn "Mật khẩu". Lưu ý thẻ HTML của nó (có nghĩa là "phông chữ" trong trường hợp này) và nhận thấy rằng nó không có thuộc tính class, id, hoặc name.

![](https://images.viblo.asia/2c870ff3-ef44-4e73-b511-de680b82a83e.png)

Bước 2. Gõ css = font: chứa ("Mật khẩu:") vào hộp Target của Selenium IDE và nhấp vào Find. Selenium IDE sẽ có thể truy cập nhãn Mật khẩu như thể hiện trong hình dưới đây.

![](https://images.viblo.asia/eaa995a5-56fe-4178-bf74-d22dbf7ccc36.png)

Bước 3. Lần này, thay thế văn bản bên trong bằng "Boston" để Target của bạn bây giờ trở thành "css = font: contains (" Boston ")". Nhấp Tìm. Bạn nên chú ý rằng nhãn "Boston to San Francisco" trở nên nổi bật. Điều này cho thấy bạn rằng Selenium IDE có thể truy cập một nhãn dài ngay cả khi bạn chỉ cần chỉ ra từ đầu tiên của văn bản bên trong của nó.

![](https://images.viblo.asia/e1b6e87e-58de-41a3-b85c-87492ed30d71.png)

**Định vị bằng DOM (Mô hình Đối tượng Tài liệu)**
Mô hình Đối tượng Tài liệu (DOM), theo cách đơn giản, là cách mà các phần tử HTML được cấu trúc. Selenium IDE có thể sử dụng DOM trong việc truy cập các phần tử trang. Nếu chúng ta sử dụng phương pháp này, hộp Target của chúng tôi sẽ luôn luôn bắt đầu bằng "dom = document ..."; tuy nhiên, tiền tố "dom =" thường được gỡ bỏ vì Selenium IDE có thể tự động giải thích bất cứ thứ gì bắt đầu với từ khóa "tài liệu" là một đường dẫn bên trong DOM.

Có bốn cách cơ bản để định vị một phần tử thông qua DOM:
* getElementById
* getElementsByName
* dom: name (chỉ áp dụng cho các phần tử bên trong một form có tên)
* dom: index

Định vị theo DOM - getElementById

Hãy để chúng tôi tập trung vào phương pháp đầu tiên - sử dụng phương pháp getElementById. Cú pháp sẽ là:

| Cú pháp | Mô tả | 
| -------- | -------- |
| document.getElementById("id of the element") | id của phần tử = đây là giá trị của thuộc tính ID của phần tử được truy cập. Giá trị này luôn luôn được bao gồm trong một cặp ngoặc đơn (""). |

Bước 1. Sử dụng trang thử nghiệm này http://demo.guru99.com/test/facebook.html Điều hướng đến nó và sử dụng Firebug để kiểm tra hộp kiểm "Giữ cho tôi đăng nhập". Ghi lại ID của nó.

![](https://images.viblo.asia/dd1fa861-9fa9-4bd6-94d4-475f3c590442.png)

Chúng ta có thể thấy rằng ID chúng ta nên sử dụng là "persist_box".

Bước 2. Mở Selenium IDE và trong hộp Target, nhập "document.getElementById (" persist_box ")" và nhấn Find. Selenium IDE sẽ có thể xác định vị trí hộp kiểm "Giữ cho tôi đăng nhập". Mặc dù không thể làm nổi bật nội thất của hộp kiểm này, nhưng Selenium IDE vẫn có thể bao quanh phần tử với đường viền màu xanh tươi sáng như được hiển thị bên dưới.

![](https://images.viblo.asia/05bb8f26-0586-4379-b1b2-976455bd25c9.png)

**Định vị theo DOM - getElementsByName**
Phương thức getElementById chỉ có thể truy cập một phần tử cùng một lúc, và đó là phần tử với ID mà bạn chỉ định. Phương pháp getElementsByName là khác nhau. Nó thu thập một mảng các phần tử có tên mà bạn chỉ định. Bạn truy cập vào các phần tử riêng lẻ sử dụng một chỉ mục bắt đầu từ 0.

![](https://images.viblo.asia/7a5f8529-2221-4b63-a79d-b5fbc785d5fc.png)

getElementById
* Nó sẽ nhận được chỉ một phần tử cho bạn.
* Thành phần đó mang mã ID mà bạn chỉ định bên trong dấu ngoặc đơn của getElementById ().

![](https://images.viblo.asia/9a827268-e5e4-40b6-a30f-3597dcb2cedf.jpg)

getElementsByName
* Nó sẽ có được một bộ sưu tập của các yếu tố có tên là như nhau.
* Mỗi phần tử được lập chỉ mục với một số bắt đầu từ 0 giống như một mảng
* Bạn chỉ định phần tử nào bạn muốn truy cập bằng cách đặt số chỉ mục của nó vào dấu ngoặc vuông trong cú pháp của getElementsByName bên dưới.

| Cú pháp | Mô tả |
| -------- | -------- |
| document.getElementsByName("name")[index] | name = tên của phần tử được định nghĩa bởi thuộc tính 'name' của nó |
|  | index = một số nguyên cho biết phần tử nào trong mảng getElementsByName sẽ được sử dụng. |

Bước 1. Điều hướng đến Trang chủ của Mercury Tours và đăng nhập bằng cách sử dụng "hướng dẫn" làm tên người dùng và mật khẩu. Firefox sẽ đưa bạn đến màn hình Máy bay Tìm.

Bước 2. Sử dụng Firebug, kiểm tra ba nút radio ở phần dưới cùng của trang (Lớp nền kinh tế, Nhóm doanh nghiệp và Các nút radio lớp học đầu tiên). Chú ý rằng tất cả chúng đều có cùng tên là "servClass".

![](https://images.viblo.asia/70054b9d-fc8f-4b11-9305-b6eb549db204.png)

Bước 3. Cho phép chúng tôi truy cập vào nút radio "Economy class". Trong tất cả ba nút radio này, phần tử này xuất hiện đầu tiên, vì vậy nó có chỉ số 0. Trong Selenium IDE, gõ "document.getElementsByName (" servClass ") [0]" và nhấp vào nút Tìm. Selenium IDE có thể xác định chính xác nút radio Kinh tế.

![](https://images.viblo.asia/3ef4e884-d26c-4327-a19c-25d078c5be49.png)

Bước 4. Thay đổi số chỉ mục thành 1 để Target của bạn bây giờ trở thành document.getElementsByName ("servClass") [1]. Nhấp vào nút Tìm và Selenium IDE sẽ có thể làm nổi bật nút radio "Kinh doanh", như được hiển thị bên dưới.

![](https://images.viblo.asia/bccd62bb-90aa-4fb7-bc94-dacf2f27def2.png)

**Định vị theo DOM - dom: name**
Như đã đề cập ở trên, phương pháp này sẽ chỉ áp dụng nếu phần tử bạn đang truy cập được chứa trong một mẫu có tên.

| Cú pháp | Mô tả |
| -------- | -------- |
| document.forms["name of the form"].elements["name of the element"] |name of the form = giá trị của thuộc tính name của thẻ khuôn dạng có chứa phần tử bạn muốn truy cập |
| | name of the element = giá trị của thuộc tính name của phần tử bạn muốn truy cập |

Bước 1. Điều hướng đến trang chủ của Mercury Tours ( http://demo.guru99.com/test/newtours/ ) và sử dụng Firebug để kiểm tra hộp văn bản User Name. Lưu ý rằng nó được chứa trong một mẫu có tên "nhà".

![](https://images.viblo.asia/c7fc08a4-fe8a-4afa-ba27-ca6b1319152d.png)

Bước 2. Trong Selenium IDE, gõ "document.forms [" home "]. Các thành phần [" userName "]" và nhấp vào nút Find. Selenium IDE phải có khả năng truy cập thành phần thành công.

![](https://images.viblo.asia/7c23f61a-7729-429c-9d35-8dcb838f5311.png)

**Định vị theo DOM - dom: index**
Phương pháp này áp dụng ngay cả khi phần tử không nằm trong một mẫu được đặt tên bởi vì nó sử dụng chỉ mục của biểu mẫu chứ không phải tên của nó.

| Cú pháp |Mô tả | 
| -------- | -------- | 
| document.forms[index of the form].elements[index of the element] | index of the form = số chỉ mục (bắt đầu bằng 0) của biểu mẫu đối với toàn bộ trang | 
|  | index of the element = số chỉ số (bắt đầu từ 0) của phần tử đối với toàn bộ mẫu chứa nó | 

Chúng tôi sẽ truy cập text box Phone trong trang Đăng ký Du lịch Mercury. Biểu mẫu trong trang đó không có thuộc tính tên và ID, vì vậy đây sẽ là một ví dụ điển hình.

Bước 1. Điều hướng đến trang Đăng ký Dịch vụ Du lịch Mercury và kiểm tra text box Phone. Lưu ý rằng các form chứa nó không có ID và tên thuộc tính.

![](https://images.viblo.asia/c066f2aa-2c94-4e43-8103-52a1c341915c.png)

Bước 2. Nhập "document.forms [0] .elements [3]" trong box Target của Selenium IDE và nhấp vào nút Find. Selenium IDE sẽ có thể truy cập vào text box Phone một cách chính xác.

![](https://images.viblo.asia/5f1fa9a0-f056-4012-ba41-64e23a1a0910.png)

Bước 3. Ngoài ra, bạn có thể sử dụng tên của phần tử thay vì chỉ mục của nó và nhận được kết quả tương tự. Nhập "document.forms[0].elements["phone"]" trong box Target của Selenium. Text box Phone vẫn sẽ trở nên nổi bật.

![](https://images.viblo.asia/616fc105-ba1f-42ce-a30c-c0bb2245321c.png)

**Định vị bởi XPath**
XPath là ngôn ngữ được sử dụng khi định vị các nút XML (Extensible Markup Language). Vì HTML có thể được coi là một sự triển khai của XML, nên chúng ta cũng có thể sử dụng XPath trong việc định vị các phần tử HTML.

* Thuận lợi: Nó có thể truy cập hầu như bất kỳ phần tử, ngay cả những cái không có thuộc tính class, name, id.
* Bất lợi: Đây là phương pháp phức tạp nhất để xác định các yếu tố vì quá nhiều quy tắc và cân nhắc khác nhau.

May mắn thay, Firebug có thể tự động tạo các trình định vị XPath. Trong ví dụ sau, chúng ta sẽ truy cập vào một hình ảnh mà không thể có thể được truy cập thông qua các phương pháp chúng tôi đã thảo luận trước đó.

Bước 1. Điều hướng đến trang chủ của Mercury Tours và sử dụng Firebug để kiểm tra hình chữ nhật màu da cam ở bên phải hộp màu vàng "Links". Tham khảo hình ảnh dưới đây.

![](https://images.viblo.asia/f4df30c5-8ceb-4f66-957c-c1cc821fb2b4.png)

Bước 2 . Nhấp chuột phải vào mã HTML của phần tử và sau đó chọn "Copy XPath".

![](https://images.viblo.asia/df4978c5-db9b-4cb0-b9be-bb7c0ee508bf.png)

Bước 3. Trong Selenium IDE, gõ một dấu gạch chéo "/" trong text box Target sau đó dán XPath mà chúng ta đã sao chép vào bước trước. Mục nhập trong text box Target của bạn bây giờ sẽ bắt đầu với hai dấu gạch chéo "//".

![](https://images.viblo.asia/afc727dd-28a1-4e41-bc25-6c6e3aad9e4c.png)

Bước 4 . Nhấp vào nút Find. Selenium IDE sẽ có thể làm nổi bật box màu cam như được hiển thị bên dưới.

![](https://images.viblo.asia/3af0e56e-f2f6-42ff-aaf0-1cd27fc65d28.png)

Tóm lược
Cú pháp cho việc sử dụng Locator

| Phương pháp | Cú pháp | Ví dụ |
| -------- | -------- | -------- |
| By ID | id= id_of_the_element  | id=email |
| By Name | name=name_of_the_element  | name=userName |
| By Name Using Filters | name=name_of_the_element filter=value_of_filter  | name=tripType value=oneway |
| By Link Text | link=link_text  | link=REGISTER |
| Tag and ID |  css=tag#id | css=input#email |
| Tag and Class | css=tag.class  | css=input.inputtext |
| Tag and Attribute | css=tag[attribute=value]	 | css=input[name=lastName] |
| Tag, Class, and Attribute |  css=tag.class[attribute=value] | css=input.inputtext[tabindex=1] |


Nguồn tham  khảo: https://www.guru99.com/locators-in-selenium-ide.html