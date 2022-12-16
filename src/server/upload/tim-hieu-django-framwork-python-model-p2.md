# Lời nói đầu.
Hello anh em , mình đã quay trở lại và ăn hại hơn xưa :D . Ngày hôm nay mình tiếp tục quay trở lại với python rồi đây . Nếu ae ai muốn vọc lại các bài trước của mình thì có thể vào bằng các đường dẫn bên dưới nhé :D
- [Getting started Python - P1](https://viblo.asia/p/getting-started-python-V3m5WBWWlO7)
-  [Getting started Python - P2](https://viblo.asia/p/getting-started-python-p2-3Q75wkz25Wb)
-  [Getting started Python - P3](https://viblo.asia/p/getting-started-python-p3-maGK7mOAlj2)
-  [Getting started Python - Handle File](https://viblo.asia/p/getting-started-python-handle-file-1VgZvo2rlAw)
- [Python vs MySQL](https://viblo.asia/p/python-vs-mysql-RQqKLEn4Z7z)
-  [Python And MongoDB](https://viblo.asia/p/python-and-mongodb-oOVlYBna58W)
-   [Tìm hiểu Django framwork (Python) ](https://viblo.asia/p/tim-hieu-django-framwork-python-RQqKLw6r57z)
-   [Tìm hiểu Django framwork (Python) - Model ](https://viblo.asia/p/tim-hieu-django-framwork-python-model-eW65G7Va5DO)

Ok, Trong bài viết lần trước mình đã giớ thiệu cho các bạn một vài khái niệm cơ bản của Model trong django. Hôm nay chúng ta sẽ tiếp tục tìm hiểu thêm Model nhé . Ok, Let go !!!

# Nội dung.
Trước khi vào bài viết mình xin trình bày 1 vài điều liên quan đến các khái niệm sẽ được nói tới trong bài. 
Trong Django người ta có 2 khái niệm . Đó là :

- App là một Web ứng dụng gì đó . Ví dụ : Hệ thống Weblog, Hệ thống viết bài đơn giản hay một ứng dụng thăm dò ý kiến
- Project là một tập hợp các cấu hình và các ứng dụng cho 1 web site thực tế . Nó có thể chứa nhiều app khác nhau và ngược lại, 1 app cũng có thể tồn tại trong nhiều project khác nhau.

Nếu bạn là một người xuất phát từ một PHP DEVELOPER như mình thì sẽ khá bất ngờ với cấu trúc như vậy. Thực ra mục đích của các nhà sáng lập django đó là nâng cao tính tái sử dụng của code 1 cách triệt để. 

Ví dụ như bạn có chức năng viết bài chẳng hạn . Chắc năng này có thể sử dụng trong prject liên quan đến báo điện tử hoặc cũng có thể sử dụng trong hệ thống bán hàng hay chỉ đơn giản là việc viết blog. Về vấn đề này mình xin phép được đề cập đến trong 1 bài viết trong tương lai. Khi chúng ta đã có 1 cái nhìn khái quát hơn về Django.

### Models across files
Như đã nói ở trên project sẽ có rất nhiều app và đương nhiên trong hệ thống thường thì các chức năng sẽ liên quan đến nhau vì vậy bạn sẽ cần tạo được các relation với các app khác nhau. Để làm được điều này khá đơn giản thôi, bạn chỉ cần import các model bạn muốn vào đầu file model của bạn và sử dụng nó như binh thường . Cụ thể như sau :
```
from django.db import models
from geography.models import ZipCode

class Restaurant(models.Model):
    # ...
    zip_code = models.ForeignKey(
        ZipCode,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
```
### Field name restrictions
Bạn nên biết rằng, Django đặt 1 số hạn chế trong việc đặt tên trường. Cụ thể như sau:
1.  Tên trường không thể đặt trùng các cú pháp hay thuật ngữ của Python. Lý do vì sao ư, đơn giản là nếu làm như vậy Python sẽ ko thể biên dịch code của bạn và sẽ báo lỗi cú pháp :
```
class Example(models.Model):
    pass = models.IntegerField() # 'pass' is a reserved word!
```

2. Tên trường không được bao gồn các kí tự gạch dưới do cách hoạt động và truy vấn cú pháp của Django.

```
class Example(models.Model):
    foo__bar = models.IntegerField() # 'foo__bar' has two underscores!
```

Các thuật ngữ của SQL như : `join`, `select` , .... thì được phép sử dụng như 1 model field name bởi vì `Django` có thể tránh được các lỗi cú pháp trong quá trình xây dưng 1 câu truy vấn dữ liệu. 

### Meta options
Meta options là bất kì điều gì khác nhưng không phải để định nghĩa các field (nghe có vẻ hơi khó hiểu nhỉ). Thực tế thì nó trao cho bạn rất nhiều khả năng để kiểm xoát hay làm bất kì điều gì với model . Ví dụ như :

- Để order  các bản ghi thì ta có option [ordering](https://docs.djangoproject.com/en/2.2/ref/models/options/#django.db.models.Options.ordering)
- Database table name thì ta có option [db_table](https://docs.djangoproject.com/en/2.2/ref/models/options/#django.db.models.Options.db_table)
-  ......

Và còn nhiều optin hơn nữa. Nếu các bạn có mong muốn tìm hiểu thì hãy vào [đây](https://docs.djangoproject.com/en/2.2/ref/models/options/) để nghiên cứu rõ hơn nhé. :D 

### Model methods

Model methods là nơi chứa đựng các hành động với những mục đích cụ thể với từng loại model được instance . Chúng  là những kĩ thuật mang lại giá trị cao trong việc thể hiện các buissness logic tại Model.

Việc định nghĩa thêm 1 method cung không có gì khó khăn cả. Khá giống php bạn chỉ cần viết thêm method vào là xong. 

```
from django.db import models

class Person(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    birth_date = models.DateField()

    def baby_boomer_status(self):
        "Returns the person's baby-boomer status."
        import datetime
        if self.birth_date < datetime.date(1945, 8, 1):
            return "Pre-boomer"
        elif self.birth_date < datetime.date(1965, 1, 1):
            return "Baby boomer"
        else:
            return "Post-boomer"
```

Tuy nhiên có 1 vài điểm bạn cần lưu ý đó là trong core của Django đã có 1 list các method dựng sẵn cho từng model [(xem chi tiết tại đây)](https://docs.djangoproject.com/en/2.2/ref/models/instances/#model-instance-methods) và đương nhiên bạn hoàn toàn có thể ghi đè lên nó . Về cụ thể thế nào mình xin nói cụ thể phía bên dươí. Ở đây mình sẽ nói về 2 method phổ biến nhất hay được ghi đè nhất của các model.

- `__str__()` : Đây là 1 magic method của python. Nó trả về 1 chuỗi kí tự đại diện cho chính bản thân object chứa hàm.  Ở đây thì Python và Django mặc định thì sẽ show ra name của chính object model của nó. Và đương nhiên là bạn có thể chỉnh sửa text show ra bằng cách ghi đè nó được
- `get_absolute_url()` method này cho phép Django có thể biết được cách biết được URL cho từng object. Mặc định thf Django sẽ sử dụng nó trong admin interface (1 BE có sẵn của Django nhé ae)


### Overriding predefined model methods
Như đã nói ở phần trên thì mỗi model có nhiều các method được dựng sẵn của Django và trong đó hiển nhiên sẽ có các method là sự thể hiện các hành vi vơi cơ sở dữ liệu. Thông thường thì chúng ta sẽ muốn tùy chỉnh các hành vi `save()` hay `delete()`

Và đương nhiên là chũng ta hoàn toàn có thể làm được điều này bằng cách override lại chính method đó. Cụ thể như sau:
```
from django.db import models

class Blog(models.Model):
    name = models.CharField(max_length=100)
    tagline = models.TextField()

    def save(self, *args, **kwargs):
        do_something()
        super().save(*args, **kwargs)  # Call the "real" save() method.
        do_something_else()
```

Hoặc bạn cung có thể hoàn toàn ngăn chặn hành vi này bằng cách sau :

```
from django.db import models

class Blog(models.Model):
    name = models.CharField(max_length=100)
    tagline = models.TextField()

    def save(self, *args, **kwargs):
        if self.name == "Yoko Ono's blog":
            return # Yoko shall never have her own blog!
        else:
            super().save(*args, **kwargs)  # Call the "real" save() method.

```

Điều quan trọng bạn cần nhớ ở đây đó là việc gọi đến các method gốc của chúng bằng cách `super().save(*args, **kwargs)` để chắc chắn rằng dữ liệu vẫn được cập nhật vào database. Nếu bạn quên làm điều đó, thì việc update dữ liệu vào database cũng sẽ không được thực thi

Thêm 1 điểu nữa cũng ko kém phần quan trọng đó là việc cung cấp đủ các tham số đầu vào để match method. Chúng chính là `*args, **kwargs`. 

Django sẽ mở rộng các khả năng giúp bạn xây dựng lên mode method bằng cách thêm vào tham số mới. Nếu bạn sử dụng `*args, **kwargs` trong input method mới của bạn. Bạn sẽ nhận được sự chắc chắn răngf code của bạn luôn hoạt động cho du bạn có add thêm bao nhiêu tham số mới đi nữa




Ok, vậy là mình đã kết thúc bài viêt ngày hôm nay. Trong bài viết này mình đã giới thiệu thêm 1 số điều cần biết về Model cho các bạn đọc và hiểu các khái niệm cơ bản của Model. Hẹn gặp lại các bạn vào bài viết tiếp theo. Thank you for reading !


# Tài liệu tham khảo
[https://docs.djangoproject.com/en/2.2/topics/db/models/](https://docs.djangoproject.com/en/2.2/topics/db/models/)