# Lời mở đầu

Ở bài trước, mình đã hướng dẫn các bạn xong [Model trong Django](https://viblo.asia/p/model-trong-django-Ljy5VDLyZra)

Trong bài này, mình sẽ giới thiệu đến các bạn Django Template Language

Nội dung bài viết của chúng ta gổm: 2 phần
*  Syntax
*  Components

# 1. Syntax
## Variables
Template thay thế biến bằng biến được gửi trong tham số thứ ba của hàm kết xuất. Hãy thay đổi file **hello.html** để hiển thị ngày hôm nay.

Một biến có dạng như sau: {{variable}}

**hello.html**

![](https://images.viblo.asia/13bd5b53-37af-43a7-b9d6-10ad0c280f5e.png)

Sau đó, **views.py** sẽ thay đổi thành

![](https://images.viblo.asia/d942cf23-4335-4454-b14b-49495730c729.png)


Bây giờ chúng ta sẽ nhận được kết quả sau sau khi truy cập URL / myapp / hello
![](https://images.viblo.asia/3d40648b-b76d-4a34-9e5c-fb1d37e83305.png)


Như bạn có thể đã nhận thấy, nếu biến không phải là một chuỗi, Django sẽ sử dụng phương thức __str__ để hiển thị nó; và với nguyên tắc tương tự, bạn có thể truy cập một thuộc tính đối tượng giống như bạn làm điều đó trong Python. Ví dụ: nếu tôi muốn hiển thị ngày của năm, biến của tôi sẽ là: {{today.year}}.

## Filters
Chúng giúp bạn sửa đổi các biến tại thời điểm hiển thị. Filters có cấu trúc như sau: {{var | filter}}.

Một số ví dụ như:

* {{string | truncatewords: 80}} - Filters này sẽ cắt ngắn chuỗi, vì vậy bạn sẽ chỉ thấy 80 từ đầu tiên.
* {{string | low}} - Chuyển chuỗi thành chữ thường.
* {{string | Escape | linebreaks}} - Thoát khỏi nội dung chuỗi, sau đó chuyển đổi ngắt dòng thành thẻ (tags).

Bạn cũng có thể đặt giá trị mặc định cho một biến.

Filters chuyển đổi giá trị của các biến và đối số thẻ. Như ví dụ sau:
![](https://images.viblo.asia/b2d6427f-627d-482c-8ebe-fd598cb6eef1.png)
Với context là {'django': 'the web framework for perfectionists with deadlines'}, template  thành:
![](https://images.viblo.asia/35daadd5-81a2-4e39-b92a-2f074b2b06d2.png)
Một số Filters có đối số:
![](https://images.viblo.asia/30940eed-151c-4e13-a07a-a7ca5b5067a9.png)
## Tags
Tags cho phép bạn thực hiện các thao tác sau: điều kiện if, vòng lặp for, kế thừa template,...

**Tag if**

Trong Python, bạn có thể sử dụng if, else và elif trong template:
![](https://images.viblo.asia/e24a1114-ece2-4cd6-890c-8e12ac8da853.png)

**Tag for**

Cũng giống như 'if', chúng ta có thẻ 'for', hoạt động trong Python. Thay đổi view hello truyền vào một danh sách ngày:
![](https://images.viblo.asia/13dac762-c28a-4bd7-96d3-fcb26cd4825b.png)
Template để hiển thị danh sách đó bằng cách sử dụng {{for}}

![](https://images.viblo.asia/837ed810-aafe-415a-abbc-7df6edb690b7.png)

Và chúng ta sẽ nhận được kết quả như: 
![](https://images.viblo.asia/8eb32db2-61d4-46b2-b633-88211f907a62.png)

**Comments**

Comments có cú pháp như sau:
![](https://images.viblo.asia/40a16b3e-c18b-4bd7-9b45-a13093a66eb2.png)

Thẻ {% comment%} cung cấp comments nhiều dòng.

**Block and Extend Tags**

Một hệ thống template không thể hoàn chỉnh nếu không có sự kế thừa template. Có nghĩa là khi bạn thiết kế các template của mình, bạn nên có một template chính.

Ví dụ, template hello.html kế thừa từ main_template.html

**main_template.html**

![](https://images.viblo.asia/5c4d12e0-cdb3-4bea-a29c-e4df9f75ba28.png)

**hello.html**

![](https://images.viblo.asia/b4dc4252-9428-4ea5-8081-eab6a9be5114.png)
Trong ví dụ trên, khi gọi / myapp / hello, chúng ta vẫn sẽ nhận được kết quả tương tự như trước đây nhưng bây giờ chúng ta dựa vào extension và block để cấu trúc lại mã của chúng ta

Trong main_template.html, chúng tôi xác định các khối bằng cách sử dụng khối thẻ. Khối tiêu đề sẽ chứa tiêu đề trang và khối nội dung sẽ có nội dung chính của trang. Trong home.html, chúng tôi sử dụng extension để kế thừa từ main_template.html, sau đó chúng tôi điền vào khối được xác định ở trên (nội dung và tiêu đề).

# 2. Components
## Engine
**django.template.Engine** đóng gói một phiên bản của hệ thống template Django. Lý do chính để khởi tạo trực tiếp một Engine là sử dụng ngôn ngữ mẫu Django bên ngoài dự án Django.

**django.template.backends.django.DjangoTemplates** là một màng bọc mỏng tương thích **django.template.Engine** với API template chung.
## Template
**django.template.Template** đại diện cho một template đã biên dịch. Các template được lấy bằng **Engine.get_template ()** hoặc **Engine.from_string ()**.

Tương tự như  **django.template.backends.django.Template** là một màng bọc mỏng tương thích **django.template.Template** với API template chung.
## Context
**django.template.Context** giữ một số siêu dữ liệu ngoài dữ liệu context. Nó được chuyển tới **Template.render ()** để hiển thị một template.

**django.template.RequestContext** là một lớp con của **Context** lưu trữ **HttpRequest** hiện tại và chạy các bộ xử lý context mẫu.

API chung không có khái niệm tương đương. Dữ liệu context được truyền dưới dạng chính tả đơn giản và **HttpRequest** hiện tại được chuyển riêng nếu cần.
## Loaders
Bộ tải mẫu chịu trách nhiệm định vị templates, tải chúng và trả về các **Template** objects.

Django cung cấp một số trình tải template tích hợp sẵn và hỗ trợ các trình tải template tùy chỉnh.
## Context processors
Context processors là các hàm nhận **HttpRequest** hiện tại làm đối số và trả về một lệnh dữ liệu được thêm vào context.

Công dụng chính của chúng là thêm dữ liệu chung được chia sẻ bởi tất cả các template vào context mà không cần lặp lại mã trong mọi view.

Django cung cấp nhiều context processors tích hợp sẵn và bạn cũng có thể thực hiện các context processors bổ sung cho riêng mình.
# Kết
Cuối cùng, cảm ơn các bạn đã dành thời gian đọc bài viết của mình. Hi vọng bài viết sẽ hữu ích đối với bạn. Thân!

Link tham khảo: 

https://www.tutorialspoint.com/django/django_template_system.htm

https://docs.djangoproject.com/en/3.2/topics/templates/