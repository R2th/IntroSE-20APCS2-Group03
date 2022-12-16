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
-    [Tìm hiểu Django framwork (Python) - Model 2](https://viblo.asia/p/tim-hieu-django-framwork-python-model-p2-WAyK8eVnZxX)

Ok, Trong các bài viết trước mình đã giới thiệu cho các bạn kha khá nhiều điều về Model trong `django` rồi. Tuy nhiên nó vẫn còn 1 số điều mình nghĩ là nên diễn giải ra cho ae rõ hơn. Vì vây, trong bài viết này  chúng ta sẽ tìm hiểu nốt về Model nhé (Hứa là đây sẽ bài viết về Model cuối cùng). Ok, Let go !!!

# Nội dung.
## Model inheritance
Việc kế thừa  Model Class trong Django về cơ bản là vẫn giống hệt với các quy tắc kế thừa bình thương trong Python . Điều này có nghĩa rằng các class model của bạn để sẽ được kế thừa từ [django.db.models.Model.](https://docs.djangoproject.com/en/2.2/ref/models/instances/#django.db.models.Model).

Điều duy nhất bạn phải quyết định đó là các Class cha có phải là một Model của riêng nó hay không (Tức là có 1 bảng cố định trong database của nó ) hay là một class cha mà chưa các thông tin chung nhất  và chỉ hiển thị thông tin qua model con của nó.

Chúng ta có 3 kiểu kế thừa có thể được sử dụng trong Django Model :

* Đầu tiên và cũng là thường sử dụng nhất : Bạn sử dụng parent class như một nơi để chứa thông tin (Vì có quá nhiều bẳng có cùng chung 1 dạng thông tin và bạn ko muốn define từng model con của nó) và hiển nhiên là nó sẽ ko bao giờ được sử dụng 1 cách độc lập. Hiểu 1 cách đơn giản hơn thì nó là `Abstract base classes` cho model
* Cách thứ 2 : Nếu parent class là 1 Model đã tồn tại (có thể Model cha thuộc một Application khác) và muốn mỗi model đều có thể sử dụng độc lập (Đều có 1 bảng riêng trong database) thì `Multi-table inheritance` chính là cách phù hợp với bạn
* Cuối cùng , nếu bạn chỉ mốn chỉnh sửa cách thể hiện của các model con (Các `function` , `ordering`, ..v...v ) mà ko phải là chỉnh sửa các fields của model con thì bạn có thể sử dụng `Proxy models`.

Vậy chúng ta cùng tìm hiểu cách sử dụng của chúng nhé .

### Abstract base classes

Đây là cách được sử dụng nhiều nhấ khi mà bạn muốn put các thông tin chung vào một số các model. 
 * Create t 1 base class chứa đầy đủ các thông tin về fields chung 
 * Add `abstract=True` vào trong `Meta`

Model đó sẽ không được sử dụng để tạo table trong database mà thay vào đó nó được sử dụng như 1 base model của các model khác. Các filed của nó sẽ được khởi tạo vào các model con. Ví dụ :

```
from django.db import models

class CommonInfo(models.Model):
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()

    class Meta:
        abstract = True

class Student(CommonInfo):
    home_group = models.CharField(max_length=5)
```

Như các bạn đã thấy bên trên , 1 student sẽ có : `name`, `age` và `home_group`. Model `CommonInfo` sẽ không được sử dụng như một model binh thường của Django. Nó không khởi tạo nên 1 table , không thể được khởi tạo hay save trực tiếp

Các fied kế thừa từ class base có thể được ghi đè từ class con.

Đối với nhiều mục đích sử dụng, kiểu kế thừa mô hình này là  chính xác như những gì bạn muốn. Nó cung cấp một cách để xác định thông tin phổ trong code Python, trong khi vẫn chỉ tạo một bảng cơ sở dữ liệu cho mỗi mô hình con ở cấp cơ sở dữ liệu.

**1 : Meta inheritance**

Mỗi khi 1 abstract base class được khởi tạo, Django sẽ tạo 1 class `Meta` bên trong đó và bạn hoàn toàn có thể khai báo class này như một thuộc tính mở. Nếu class con của bạn ko được khai báo class `Meta` nó sẽ được kế thừa class Meta từ cha của nó. Và nếu class con muốn extend class Meta của class cha. Thì bạn có thể làm như sau :

```
from django.db import models

class CommonInfo(models.Model):
    # ...
    class Meta:
        abstract = True
        ordering = ['name']

class Student(CommonInfo):
    # ...
    class Meta(CommonInfo.Meta):
        db_table = 'student_info'
```

***Note :***
Django sẽ có 1 vài điều chỉnh nhỏ cho class `Meta` được lấy từ class cha của nó. Các class Meta này sẽ auto được set **abstract=False**. Điều này có nghĩa là các lớp con của `abstract base classes`  sẽ không tự động trở thành `abstract base classes ` . Đương nhiên nếu muốn bạn vẫn có thể tạo 1 `abstract base classes ` kế thừa từ `abstract base classes` khác bằng cách set **abstract=True**

### Multi-table inheritance

Đây là kiểu kế thừa thứ 2 của model được support bởi  Django , các model được tạo thành 1 hệ thông phân cấp trong đó mỗi model tương ứng với 1 bảng dữ liệu riêng , có thể được khởi tạo và truy vấn riêng lẻ. Sư kế thừa được thể hiện qua mỗi quan hệ giữa model và các lớp cha mẹ của nó (thông qua việt tự động tạo ra relation ` OneToOneField`).

```
from django.db import models

class Place(models.Model):
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=80)

class Restaurant(Place):
    serves_hot_dogs = models.BooleanField(default=False)
    serves_pizza = models.BooleanField(default=False)
```

Tất các các fields của `Place` đều có trong `Restaurant` và tất cả các dự liệu sẽ được lưu trự tại các bảng khác nhau trong database. Vì vậy việc truy vấn đơn lẻ từ cả 2 model đều có thể:

```
>>> Place.objects.filter(name="Bob's Cafe")
>>> Restaurant.objects.filter(name="Bob's Cafe")
```

Trong ví dụ trên , khi mà bạn truy vấn ra `Place` bạn cũng có thể gọi ra `Restaurant` bằng cách sau :

```
p = Place.objects.get(id=12)
# If p is a Restaurant object, this will give the child class:
p.restaurant
# <Restaurant: ...>
```

Tuy nhiên , rất có thể `Place` được gọi ra không tồn tại `Restaurant` nào liên quan (Kiểu tạo trược tiếp từ  Model `Place` ko thông qua `Restaurant`) thì khi bạn gọi đến `p.restaurant` sẽ bắn ra 1 exception `Restaurant.DoesNotExist`

Relation được tự động khởi tạo ` OneToOneField` trong ` Restaurant` link sang `Place` sẽ kiểu như sau :

```
place_ptr = models.OneToOneField(
    Place, on_delete=models.CASCADE,
    parent_link=True,
)
```

**1: Meta and multi-table inheritance**

Trong trường hợp này , sẽ là không có ý nghĩa đối với một lớp con kế thừa Meta từ lớp cha  của nó. Tất cả các tùy chọn Meta đã được áp dụng cho lớp cha và việc áp dụng lại chúng thường chỉ dẫn đến hành vi trái ngược nhau (điều này trái ngược với trường hợp `abstract base class`).


Vì vậy, một mô hình con không có quyền truy cập vào lớp  Meta của cha  nó. Tuy nhiên, có một vài trường hợp đặc biệt  khi lớp con  thừa hưởng hành vi từ cha mẹ: nếu lớp con không chỉ định thuộc tính `ordering` hoặc thuộc tính `get_latest_by`, nó sẽ thừa hưởng những hành vi này từ cha mẹ.

Nếu cha mẹ có thuộc tính  `ordering` và bạn không muốn cho lớp con kế thừa lớp cha của nó, bạn có thể vô hiệu hóa nó một cách đơn giản như sau :

```
class ChildModel(ParentModel):
    # ...
    class Meta:
        # Remove parent's ordering effect
        ordering = []
```

**2: Inheritance and reverse relations**

Bởi vì sử dụng relation ` OneToOneField` để link dữ liệu từ con đến cha  nên đương nhiên chũng ta cũng có thể gọi ngược lại từ cha về con  như ví dụ bên trên. Việc gọi dự liệu này thực ra là chúng ta đang sử dụng các giá trị mặc định của `related_name` cho `ForeignKey` và relation `ManyToManyField`


### Proxy models

Khi sử dụng `multi-table inheritance` thì một bảng dữ liểu mới được sinh ra với mỗi model con. Đây thường là hành vi mong muốn, vì lớp con cần một nơi để lưu trữ bất kỳ  dữ liệu bổ sung nào không có trên lớp cơ sở. Tuy nhiên, đôi khi, bạn chỉ muốn thay đổi hành vi  của một mô hình Python - có lẽ để thay đổi trình quản lý mặc định hoặc thêm một phương thức mới.


Đây là những điều mà model proxy cung cấp :  tạo proxy cho model sẵn có. Bạn có thể tạo, xóa và cập nhật các model proxy và tất cả dữ liệu sẽ được lưu như thể bạn đang sử dụng mô hình ban đầu. Sự khác biệt là bạn có thể thay đổi những thứ như thứ tự mô hình mặc định hoặc trình quản lý mặc định trong proxy mà không phải thay đổi bản gốc

Các mô hình proxy được khai báo như các mô hình bình thường. Bạn khai báo  với Django rằng nó là  một mô hình proxy bằng cách đặt thuộc tính `proxy` của lớp `Meta` thành True. Ví dụ:


```
from django.db import models

class Person(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)

class MyPerson(Person):
    class Meta:
        proxy = True

    def do_something(self):
        # ...
        pass

```

Class `MyPerson` hoạt động trên cùng một bảng cơ sở dữ liệu với class `Person`. Đặc biệt, mọi trường hợp mới của `Person` cũng sẽ có thể truy cập được thông qua MyPerson và ngược lại:

```
>>> p = Person.objects.create(first_name="foobar")
>>> MyPerson.objects.get(first_name="foobar")
<MyPerson: foobar>
```

Bạn cũng có thể sử dụng mô hình proxy để xác định việc `ordering` mặc định khác trên model. Bạn có thể không phải lúc nào cũng muốn order model `Person` nhưng bạn có thể order thuộc tính`last_name` khi bạn sử dụng proxy. Điều này thật dễ dàng:

```
class OrderedPerson(Person):
    class Meta:
        ordering = ["last_name"]
        proxy = True
```

### Multiple inheritance

Cũng giống như với việc phân lớp trong  Python, Model Django có thể kế thừa từ nhiều Model cha mạ .Tuy nhiên ,  hãy nhớ rằng các quy tắc phân giải tên Python sẽ được áp dụng. Lớp cơ sở đầu tiên có tên cụ thể (ví dụ: Meta) xuất hiện sẽ là được kế thừa cho lớp con . Điều này có nghĩa là nếu nhiều class cha mẹ đều  chứa class  Meta, thì chỉ có một class cha đầu tiên sẽ được sử dụng và tất cả những người khác sẽ bị bỏ qua.

Nói chung, bạn không cần  cần phải thừa kế từ nhiều cha mẹ. Cố gắng giữ cho hệ thống phân cấp kế thừa của bạn đơn giản và dễ hiểu nhất để bạn có thể dễ dàng tìm hiểu dữ liệu ở đâu hay  update hay các hành vi của model 1 cách dễ dàng sẽ quan trong hơn 


Lưu ý rằng việc kế thừa từ nhiều mô hình có trường khóa chính id chung sẽ gây ra lỗi. Để sử dụng đúng cách nhiều kế thừa, bạn nên sử dụng `AutoField` rõ ràng trong các mô hình cơ sở:

```
class Article(models.Model):
    article_id = models.AutoField(primary_key=True)
    ...

class Book(models.Model):
    book_id = models.AutoField(primary_key=True)
    ...

class BookReview(Book, Article):
    pass

```

Hoặc sử dụng chung  tổ tiên  để giữ AutoField. Điều này yêu cầu sử dụng `OneToOneField` rõ ràng từ mỗi model  cha mẹ đến tổ tiên chung để tránh xung đột giữa các trường được tự động tạo và kế thừa bởi model con :

```
class Piece(models.Model):
    pass

class Article(Piece):
    article_piece = models.OneToOneField(Piece, on_delete=models.CASCADE, parent_link=True)
    ...

class Book(Piece):
    book_piece = models.OneToOneField(Piece, on_delete=models.CASCADE, parent_link=True)
    ...

class BookReview(Book, Article):
    pass
```


Ok, vậy là mình đã kết thúc bài viêt ngày hôm nay. Trong bài viết này mình đã giới thiệu về kế thừa trong Model và có lẽ đây cũng là bài viết cuối cùng về model rồi . Hẹn gặp lại các bạn vào bài viết tiếp theo. Thank you for reading !


# Tài liệu tham khảo
https://docs.djangoproject.com/en/2.2/topics/db/models/