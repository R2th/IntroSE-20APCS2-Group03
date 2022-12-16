# Lời mở đầu
Chào các bạn, hôm nay chúng ta sẽ học cách tạo các Model để có thể tương tác với cơ sở dữ liệu. Nhưng trước tiên, chúng ta sẽ tìm hiểu khái  Model là gì?

Model là một lớp đại diện cho bảng hoặc tập hợp trong DB và trong đó mọi thuộc tính của lớp là một trường của bảng hoặc tập hợp. Mô hình được xác định trong **app / models.py** (ví dụ: **myapp / models.py**)

Tiếp theo, nội dung của chúng ta gồm: 4 phần
* Tạo model
* Thao tác dữ liệu (CRUD)
* Thao tác dữ liệu khác
* Mô hình liên kết
# 1. Tạo model
Dreamreal được tạo ra trong **myapp / models.py**

![](https://images.viblo.asia/632975e3-08c2-44c8-94c6-223323d3b794.png)
Ý nghĩa dòng code như sau:
* Khai báo class **Dreamreal** kế thừa models.Model, là class được viết ra ánh xạ đến bảng trong Database.
* Khai báo **field website/mail/name** ánh xạ đến cột website/mail/name trong bảng. Field website/mail/name sẽ thuộc CharField có tham số max_length=50, có nghĩa cột website/mail/name sẽ lưu trữ kiểu String và dài nhất 50 ký tự.
* Khai báo **phonenumber** body ánh xạ đến cột phonenumber trong bảng. Field phonenumber sẽ thuộc IntegerField, có nghĩa cột phonenumber lưu trữ kiểu Số nguyên.
* Lớp của chúng ta có 4 thuộc tính (3 CharField và 1 Integer), chúng sẽ là các trường của bảng.
* Lớp Meta với thuộc tính db_table cho phép chúng ta xác định bảng hoặc tên tập hợp thực tế. Django tự động đặt tên cho bảng hoặc bộ sưu tập: myapp_modelName. Lớp này sẽ cho phép bạn đặt tên của bảng theo ý bạn.

Có nhiều loại trường hơn trong django.db.models, bạn có thể tìm hiểu thêm về chúng trên https://www.webforefront.com/django/modeldatatypesandvalidation.html

Sau khi tạo mô hình của mình, bạn sẽ cần Django để tạo cơ sở dữ liệu thực tế
![](https://images.viblo.asia/153f66f6-6d02-4eff-bc72-c414e5fa4ec2.png)
# 2. Thao tác dữ liệu (CRUD)
Hãy tạo chế độ xem "crudops" để xem chúng ta có thể thực hiện các hoạt động CRUD trên các mô hình như thế nào. Sau đó,  đi đến file views.py trong **myapp / views.py** và thực hiện:

![](https://images.viblo.asia/b13cd17f-c607-49f5-9292-280d5a9a7f3f.png)
# 3. Thao tác dữ liệu khác
Hãy cùng khám phá các thao tác khác mà chúng ta có thể thực hiện trên Mô hình. Lưu ý rằng các hoạt động CRUD đã được thực hiện trên các phiên bản của mô hình của chúng tôi, bây giờ chúng tôi sẽ làm việc trực tiếp với lớp đại diện cho mô hình của chúng tôi.

Hãy tạo chế độ xem 'datamanipulation' trong **myapp / views.py**

![](https://images.viblo.asia/ec20129a-18fd-470d-899c-23d17b73e3d4.png)

# 4. Mô hình liên kết
Object-Relational Mapping (ORM) là một kĩ thuật cho phép chúng ta truy vấn và quản lý dữ liệu từ database bằng cách sử dụng mô hình hướng đối tượng. Khi nhắc đến ORM, hầu hết mọi người đều nói đến thư viện đã áp dụng kĩ thuật ORM.
![](https://images.viblo.asia/39173977-63ad-412c-acf5-8227e5aa3120.png)

Những thư viện ORM là những thư viện đã hoàn chỉnh được viết bằng ngôn ngữ lập trình bạn đang dùng và nó đã gói nhóm code cần thiết để quản lý data, như vậy bạn không cần sử dụng SQL nữa, bạn sẽ tương tác trực tiếp qua cách viết hướng đối tượng của ngôn ngữ bạn đang sử dụng

Django ORM đưa ra 3 cách để liên kết các mô hình

Một trong những trường hợp đầu tiên chúng ta sẽ thấy ở đây là các mối quan hệ một-nhiều. Như bạn có thể thấy trong ví dụ trên, công ty Dreamreal có thể có nhiều trang web trực tuyến. Việc xác định mối quan hệ đó được thực hiện bằng cách sử dụng django.db.models.ForeignKey
**myapp/models.py**

![](https://images.viblo.asia/09e2c18c-302e-4026-957a-f382dcfc9ece.png)

Như bạn có thể thấy trong **myapp / models.py** được cập nhật của chúng tôi, chúng tôi đã thêm mô hình trực tuyến và liên kết mô hình đó với mô hình Dreamreal của chúng tôi.

Hãy kiểm tra xem tất cả những điều này đang hoạt động như thế nào thông qua **management.py** shell

Đầu tiên, chúng ta hãy tạo một số công ty (mục nhập Dreamreal) để thử nghiệm trong trình bao Django của tôi 
![](https://images.viblo.asia/f222bd4e-da9b-4f1c-9b5b-37d7814b449b.png)

Hiện một số miền được lưu trữ
![](https://images.viblo.asia/90aaae99-9e08-42f9-8ac6-4e7977395187.png)

Truy cập thuộc tính của công ty lưu trữ (mục nhập Dreamreal) từ một miền trực tuyến rất đơn giản
![](https://images.viblo.asia/42eeccfc-f185-4ba8-b59a-a446aaceb7ca.png)

Nếu muốn biết tất cả miền trực tuyến được lưu trữ bởi một Công ty ở Dreamreal, chúng ta sẽ sử dụng mã
![](https://images.viblo.asia/d185a5c2-791a-45d0-bbb4-17605c3bc071.png)

Để có được QuerySet, hãy lưu ý rằng tất cả các phương pháp thao tác mà chúng ta đã thấy trước đây (filter, all, exclude, order_by....)

Bạn cũng có thể truy cập các thuộc tính mô hình được liên kết cho các hoạt động lọc, giả sử bạn muốn nhận tất cả các miền trực tuyến có tên Dreamreal chứa 'công ty
![](https://images.viblo.asia/19c81942-e67f-43b9-8dbb-b80bab771625.png)

Lưu ý - Loại truy vấn đó chỉ được hỗ trợ cho SQL DB. Nó sẽ không hoạt động đối với DB không quan hệ, nơi các phép nối không tồn tại và có hai '_'.

Nhưng đó không phải là cách duy nhất để liên kết các mô hình, bạn còn có OneToOneField, một liên kết đảm bảo rằng mối quan hệ giữa hai đối tượng là duy nhất. Nếu tôi sử dụng OneToOneField trong ví dụ của tôi ở trên, điều đó có nghĩa là đối với mỗi mục nhập Dreamreal chỉ có thể có một mục nhập Trực tuyến và theo cách khác.

Và cuối cùng, quan hệ ManyToManyField cho (n-n) giữa các bảng. Lưu ý, chúng có liên quan đến DB dựa trên SQL.
# Kết
Cuối cùng, cảm ơn các bạn đã dành thời gian đọc bài viết của mình. Hi vọng bài viết sẽ hữu ích đối với bạn. Thân!

Link tham khảo: https://www.tutorialspoint.com/django/django_models.htm