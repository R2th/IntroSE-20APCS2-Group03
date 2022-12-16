Khi làm việc với Django, chúng ta có thể sử dụng Django's CheckConstraint để đảm bảo trường được lựa chọn bị ràng buộc bởi các giá trị hợp lệ. Trong bài viết này, mình sẽ trình bày cách sử dụng CheckConstraint để đảm bảo một tập hợp các trường, đại diện cho tỷ lệ phần trăm, luôn luôn có tổng là 100.
# Add Check Constraint
Đầu tiên, chúng ta sẽ tạo ra một ứng dụng cần sử dụng đến các trường phần trăm. Ở đây sẽ là một ứng dụng theo dõi việc đọc sách với ba trường:
* Số trang đã đọc
* Số trang chưa được đọc
* Số trang người đọc cố ý bỏ qua

Giờ chúng ta sẽ bắt đầu với việc tạo Model:
```
from django.db import models


class Book(models.Model):
    percent_read = models.PositiveIntegerField()
    percent_unread = models.PositiveIntegerField()
    percent_ignored = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.id} - {self.percent_read}% read"
```

Khi sử dụng **PositiveIntegerField** có nghĩa là các trường ở trên sẽ không nhận giá trị âm. Điều chúng ta quan tâm lúc này là làm sao để tổng giá trị của ba trường này đúng bằng 100. Sử dụng một Check Constraint, chúng ta có thể thực thi ràng buộc đó, báo cho cơ sở dữ liệu để ngăn lưu trữ dữ liệu không hợp lệ. Trong trường hợp này, chúng ta chỉ cần thực thi rằng tổng của chúng là 100 để tự động ràng buộc các trường riêng lẻ trong khoảng từ 0 đến 100.
Chúng ta sẽ thêm Check Constraint ở trong Model's Meta như sau:
```
from django.db import models


class Book(models.Model):
    percent_read = models.PositiveIntegerField()
    percent_unread = models.PositiveIntegerField()
    percent_ignored = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.id} - {self.percent_read}% read"

    class Meta:
        constraints = [
            models.CheckConstraint(
                check=models.Q(
                    percent_read=(
                        100
                        - models.F("percent_unread")
                        - models.F("percent_ignored")
                    )
                ),
                name="percentages_sum_100",
            )
        ]
```
Lưu ý:
* Luôn phải đặt biểu thức bên trong một **Q()** object. Nó đại diện cho một bộ lọc và lấy cú pháp tương tự như các đối số cho **object.filter()**.
* Sử dụng các **F() object** để chỉ các trường trong Model.
* Chúng ta phải viết biểu thức với percent_read ở phía bên trái. Đó là, **percent_read == 100 - percent_unread - percent_ignored**, thay vì **percent_read + percent_unread + percent_ignored == 100**. Điều này là do những hạn chế trong **Django's F() objects** mà có thể bị xóa trong phiên bản tương lai.
# Migrations
Ta định nghĩa  migration như sau:
```
from django.db import migrations, models
import django.db.models.expressions


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0001_initial"),
    ]

    operations = [
        migrations.AddConstraint(
            model_name="book",
            constraint=models.CheckConstraint(
                check=models.Q(
                    percent_read=django.db.models.expressions.CombinedExpression(
                        django.db.models.expressions.CombinedExpression(
                            django.db.models.expressions.Value(100),
                            "-",
                            django.db.models.expressions.F("percent_unread"),
                        ),
                        "-",
                        django.db.models.expressions.F("percent_ignored"),
                    )
                ),
                name="percentages_sum_100",
            ),
        ),
    ]
```
Nó trông giống như một cách định nghĩa Model. Sự khác biệt chính là migrations framework đã hoán đổi các  **F() object** cho các **CombinedExpression object** được tạo ra.
Sử dụng **sqlmigrate** để để migrate:
```
$ python manage.py sqlmigrate core 0002
--
-- Create constraint percentages_sum_100 on model book
--
ALTER TABLE `core_book` ADD CONSTRAINT `percentages_sum_100` CHECK (
    `percent_read` = (
        (100 - `core_book`.`percent_unread`)
        - `core_book`.`percent_ignored`
    )
);
```
Chúng ta cũng có thể áp dụng migration  này bằng cách migrate, nhưng chỉ khi tất cả dữ liệu trong bảng đã phù hợp với ràng buộc. Nếu không, thì cơ sở dữ liệu hiển thị IntegrityError:
```
$ python manage.py migrate core 0002
Operations to perform:
  Target specific migration: 0002_percentages_sum_100, from core
Running migrations:
  Applying core.0002_percentages_sum_100...Traceback (most recent call last):
...
django.db.utils.IntegrityError: (4025, 'CONSTRAINT `percentages_sum_100` failed for `testapp`.`core_book`')
```
Trừ khi đã biết chắc chắn, nếu không bạn nên kiểm tra cơ sở dữ liệu của mình đã hợp lệ chưa trước khi cố gắng triển khai migrate. Bạn có thể sử dụng các đối số được truyền cho **Q** trong **QuerySet.exclude()** để tìm các đối tượng không hợp lệ:
```
Book.objects.exclude(percent_read=(
    100
    - models.F("percent_unread")
    - models.F("percent_ignored")
))
```
# Form Validation
Do cần phải validation cho nhiều trường, nên chúng ta sẽ sử dụng **Form.clean() method**.
```
from django import forms

from core.models import Book


class BookForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = ["percent_read", "percent_unread", "percent_ignored"]

    def clean(self):
        cleaned_data = super().clean()

        try:
            percentages_sum = (
                cleaned_data["percent_read"]
                + cleaned_data["percent_unread"]
                + cleaned_data["percent_ignored"]
            )
        except KeyError:
            pass
        else:
            if percentages_sum != 100:
                self.add_error(
                    None,
                    (
                        f"Percentages must add up to 100%, they currently add"
                        + f" up to {percentages_sum}%"
                    )
                )

        return cleaned_data
```
Lưu ý:
* Chúng ta sử dụng **try/except KeyError/else** đế tính tổng phần trăm. Dữ liệu được chứa dưới dạng dict sẽ tạo ra lỗi **KeyError**  nếu trường đó không tồn tại.
* Chúng ta sử dụng **self.add_error(None, msg)** để thêm non-field error. Điều này tốt hơn là raise ValidationError  vì nó cho phép tiếp tục thực hiện các bước tiếp theo mà chúng tôi có thể thêm vào **Clean()** để chạy.
# Test 
Cuối cùng, chúng ra sẽ kiểm tra xem Check Constraints có hoạt động theo dự kiến hay không. Sau đây là một bài test nhanh:
```
$ python manage.py shell
...
In [1]: from core.forms import BookForm

In [2]: BookForm({'percent_unread': 12, 'percent_read': 12, 'percent_ignored': 12}).errors
Out[2]: {'__all__': ['Percentages must add up to 100%, they currently add up to 36%']}

In [3]: BookForm({'percent_unread': 33, 'percent_read': 33, 'percent_ignored': 34}).errors
Out[3]: {}
```
Như vậy, ràng buộc của ba trường phần trăm đã hoạt động tốt!