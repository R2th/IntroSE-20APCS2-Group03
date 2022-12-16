# Lời nói đầu.
Hello anh em , mình đã quay trở lại và ăn hại hơn xưa :D . Ngày hôm nay mình tiếp tục quay trở lại với python rồi đây . Nếu ae ai muốn vọc lại các bài trước của mình thì có thể vào bằng các đường dẫn bên dưới nhé :D
- [Getting started Python - P1](https://viblo.asia/p/getting-started-python-V3m5WBWWlO7)
-  [Getting started Python - P2](https://viblo.asia/p/getting-started-python-p2-3Q75wkz25Wb)
-  [Getting started Python - P3](https://viblo.asia/p/getting-started-python-p3-maGK7mOAlj2)
-  [Getting started Python - Handle File](https://viblo.asia/p/getting-started-python-handle-file-1VgZvo2rlAw)
- [Python vs MySQL](https://viblo.asia/p/python-vs-mysql-RQqKLEn4Z7z)
-  [Python And MongoDB](https://viblo.asia/p/python-and-mongodb-oOVlYBna58W)
-   [Tìm hiểu Django framwork (Python) ](https://viblo.asia/p/tim-hieu-django-framwork-python-RQqKLw6r57z)

Ok, Trong bài viết lần trước mình đã giớ thiệu cho các bạn cách install và config application cho Django . Hôm nay mình sẽ hướng dẫn các bạn tìm hiểu về các thành phần cơ bản của Django. Let Start !!

# Nội dung.
## I : Cái nhìn tổng quan về Django.
Nếu như là 1 lập trình viên Web chắc các bạn cũng không lạ gì về mô hình MVC trong lập trình Web và điều khá thú vị ở đây đó là `Django` cũng có 3 lớp chức năng cơ bản phụ trách các phần như vậy :

- `M` Model  ==> Lớp Model : Cũng như các loại ngôn ngữ khác , Model chịu trách nhiệm liên kết Django vs CSDL vcủa bạn. Tuy nhiên , `model` với `Django` không hẳn chỉ là lớp liên kết dữ liệu mà nó còn là thành phần để định nghĩa lên cấu trúc và thao tác lên các dữ liệu của bảng. 
- 'V'  View ==> Chữ `V` ở đây có ý nghĩa hơi khác 1 chút , nó chính là Lớp Template trong Django: Lớp này là lớp tương tác trực tiếp với người dùng. Các loại trạng thái của hệ thống và sự biểu hiện của data sẽ được show ra với User ở đây. Đồng thời , user cũng có thể thông qua Template để làm việc với hệ thống.
- 'C' Controller ==> Vơi `Django` chúng ta có lớp chức năng đó là `View`. Đây là lớp liên kết giữa Model và Template . Nó có chức năng như là tram trung chuyển và điều tiết dữ liệu. 

Tổng quan sơ lược là vậy. Nào chúng ta bắt tay đi vào nghiên cứu từng lớp nhé .

## II: Model
### 1: Giới thiệu sơ lược về Model.
Model là một mô hình ánh xạ tới một bảng cơ sở dữ liệu . Nó chứa các trường và cung cấp khả năng tương tác với dự liệu của bạn.

- Mỗi Model là  1 lớp con của  `django.db.models.Model`.
- Mỗi atribute trong model đại diện cho 1 trường trong database
- Với tất cả những điêu trên , Model cung cấp cho bạn khả năng tự động chỉnh sửa truy cập vào dữ liệu của database .

***1.1: Cách sử dụng model.***

Đầu tiên, bạn cần định nghĩa Model của bạn và bạn cần thông báo vơi Django là bạn sẽ sử dụng Model đó. Để cập nhật cài đặt , bạn cần sửa `INSTALLED_APPS` trong file `settings` của project  và add tên của module mà tồn tại Model của bạn. Ví dụ:

```
INSTALLED_APPS = [
    #...
    'myapp',
    #...
]
```

Note :  Khi bạn add thêm 1 module mới vào `INSTALLED_APPS` bạn cần chắc chắn rằng mình đã tạo đầy đủ các migrate và  chạy lại lện `manage.py migrate` đê update database .

***1.2: Fields***

Phần quan trọng và là phần duy nhất yêu cầu bắt buộc pải có của Model đó chính danh sách fields của database được định nghĩa trong Model. Các trường này được xác định bởi các thuộc tính của class. Hãy cần thận chọn tên của trường không được conflict với các API của database như `SAVE` hay `UPDATE`.
    
   Ví dụ:
   ```
   from django.db import models

class Musician(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    instrument = models.CharField(max_length=100)

class Album(models.Model):
    artist = models.ForeignKey(Musician, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    release_date = models.DateField()
    num_stars = models.IntegerField()
   ```


***1.3: Field Type.***

Each field in your model should be an instance of the appropriate Field class. Django uses the field class types to determine a few things:

Mỗi trường của Model của bạn là 1 sự thể hiện của 1 Field Class. Django sử dụng class đó để định nghĩa một số vấn đề sau :
 
 - Thông báo với cơ sở dữ liểu của field đó.
 - Kiểu dữ liệu của thành phần HTML khi generate field đó ra form (Điều này mình sẽ trình bày trong các bài viết sau)
 - Các validator được cơ bản được sử dụng trong `Django’s admin` và trong việc tự động generated form (Điều này mình sẽ trình bày trong các bài viết sau)

Django cung cấp cho bạn hàng chục loại field type và bạn có thể tìm và hoàn thiện trong list model field [reference](https://docs.djangoproject.com/en/2.2/ref/models/fields/#model-field-types).

***1.4: Field options.***

Mỗi trường chắc chắn sẽ có các field-specific arguments . Ví dụ  :

    `CharField()` <=== Kiểu dữ liệu này required `max_length` để chỉ max size của kiểu dữ liệu `VARCHAR` được sử dụng trong database

Và cũng có một số tập hợp các  arguments phổ biến có sẵn cho tất cả các loại trường. Các argument đó đều là option. Nếu bạn muốn tìm hiểu thêm thì có thể tham khảo tại [đây](https://docs.djangoproject.com/en/2.2/ref/models/fields/#common-model-field-options)

***1.5: Automatic primary key fields.***

Mặc định thì mỗi Model thì có 1 khóa chính như sau:
```
id = models.AutoField(primary_key=True)
```

Tuy nhiên nếu bạn muốn custome khóa chính thì có thế set option `primary_key=True` vào field mà bạn muốn set primary. Nên nhớ rằng mỗi Model đều chỉ có 1 khóa chính nên nếu bạn set 1 field khác là khóa chính thì field id sẽ ko đk generate ra nữa .

***1.6: Relationship***

Rõ ràng là sức mạnh của 1 CSDL quan hệ (Mysql) đó chính là mỗi quan hệ giữa các các bảng với nhau. Hiểu được điều này, Django đưa cho chúng ta 3 kiểu quan hệ chung được moị người sử dụng : 

-  `many-to-one`
-  `many-to-many`
-  `one-to-one`


**1.6.1: Many-to-one relationships**

Để xây dụng được kiểu quan hệ `Many-to-one` ta cán sử dụng lib `django.db.models.ForeignKey`. Bạn chỉ cần sử dụng nó như 1 Field Type thông thường là được. Tuy nhiên, với kiểu field type này bạn cần cung cấp 1 Model khác, là Model đại diện cho bảng dữ liệu liên quan .

Ví dụ :

- 1 chiếc xe ô tô chỉ có 1 nhà sản xuất
- 1 nhà sản xuất có thể tạo ra rất nhiều xe ô tô.


```
from django.db import models

class Manufacturer(models.Model):
    # ...
    pass

class Car(models.Model):
    manufacturer = models.ForeignKey(Manufacturer, on_delete=models.CASCADE)
    # ...
```

Note:

Bạn hoàn toàn có thể xây dựng các mỗi quan hệ đệ quy nhé. (Mối quan hệ với chính bản thân table).

**1.6.2: Many-to-many relationships**

Để xây dụng được kiểu quan hệ `Many-to-many` ta cán sử dụng lib `ManyToManyField`. Bạn chỉ cần sử dụng nó như 1 Field Type thông thường là được. 

Tuy nhiên, với kiểu field type này bạn cũng cần cung cấp 1 argument là  Model khác, là Model đại diện cho bảng dữ liệu liên quan .

Ví dụ :
- 1 chiếc bánh Pizza có nhiều kiểu Topping 
- 1 kiểu Topping có thể thuộc nhiều chiếc bánh Pizza khác nhau :

```
from django.db import models

class Topping(models.Model):
    # ...
    pass

class Pizza(models.Model):
    # ...
    toppings = models.ManyToManyField(Topping)
```

**1.6.3: One-to-one relationships**

Để xây dụng được kiểu quan hệ ` One-to-one` ta cán sử dụng lib ` OneToOneField`. Bạn chỉ cần sử dụng nó như 1 Field Type thông thường là được. 

Tuy nhiên, với kiểu field type này bạn cũng cần cung cấp 1 argument là  Model khác, là Model đại diện cho bảng dữ liệu liên quan .

Ví dụ :

- 1 nhà hàng chỉ có 1 địa chỉ 
- 1 địa chỉ chỉ có 1 nhà hàng 

```
from django.db import models

class Place(models.Model):
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=80)

class Restaurant(models.Model):
    place = models.OneToOneField(
        Place,
        on_delete=models.CASCADE,
        primary_key=True,
    )
```


Ok, vậy là mình đã kết thúc bài viêt ngày hôm nay. Trong bài viết này mình đã giới thiệu sơ lược về Model cho các bạn đọc và hiểu các khái niệm cơ bản của Model. Trong bài viết sau, mình sẽ viết giới thiệu cho bạn cách hoạt đọng thực tế của model khi đi vào làm 1 trang web. Hẹn gặp lại các bạn vào bài viết tiếp theo. Thank you for reading !


# Tài liệu tham khảo
[https://docs.djangoproject.com/en/2.2/topics/db/models/](https://docs.djangoproject.com/en/2.2/topics/db/models/)