Django là Python framework phổ biến nhất hiện nay, được thiết kế để cung cấp cho người dùng sự dễ sử dụng giống như Rails. Hãy cùng khám phá xem cách để xây dựng một API đơn giản nhanh như thế nào bằng Django và thư viện có tên TastyPie. Thông qua đó, ta sẽ thấy được Django có thể làm một việc trở nên khó khăn như thế nào và ngược lại một việc có thể trở nên dễ dàng hơn như thế nào.

**Đối tượng hướng đến:** Bạn nên có kiến thức cơ bản về REST API và CRUD. Kiến thức Python là một lợi thế nhưng không cần thiết. Bạn sẽ học được nó trong quá trình thực hành.
Chúng ta sẽ xây dựng API cho ứng dụng web ghi chú tương tự Google Keep. Chúng ta sẽ xây dựng API REST-Ful với các CRUD endpoint, để tạo, đọc, cập nhật và xóa ghi chú. Tin tốt là thay vì tiếp cận các endpoint này một cách riêng lẻ, Django cho phép chúng ta ít nhiều tạo ra tất cả chúng bằng một thao tác.
# Thiết lập project
Django chia công việc thành project và các app. Các project chứa các app, nhưng các app không nhất thiết thuộc về một project nhất định - ý tưởng này làm cho chúng có thể tái sử dụng các app trên các project khác nhau.

Trong tutorial này, chúng ta sẽ chỉ tạo một app trong một project, nhưng cấu trúc tệp có vẻ hơi kỳ lạ.

Cài đặt Python nếu bạn đã cài đặt, sau đó hãy cài đặt Django và tạo dự án của chúng ta:
```
pip install Django
django-admin startproject notable_django
cd notable_django
```
Tiếp theo, chúng ta sẽ cài đặt TastyPie, thứ sẽ cung cấp cho chúng ta REST framework.

`pip install django-tastypie`

Cuối cùng, chúng ta có thể bắt đầu app trong project của chúng ta:

`python manage.py startapp api`

Trong thư mục notable_django, bây giờ bạn sẽ có hai thư mục con: một cũng được gọi là notable_django và một thư mục khác có tên api (cũng như có một tệp manage.py).

Sự khác biệt giữa hai thư mục có thể được hiểu như thế này: notable_django chứa các cài đặt cho cấu hình của project, cũng như các URL. Thư mục api sẽ xử lý API thực tế.

Trước khi tiếp tục, chúng ta phải cài đặt app trong project, bên trong notable_django / settings-py:
```
# notable_django/settings.py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'api'
]
```
Một lần nữa, project của chúng ta có thể có nhiều app được cài đặt - và những app đó không nhất thiết phải gắn với project đó. Project của chúng ta ở đây là notable_django và app của chúng ta được gọi là api.

# Model
Điều đầu tiên chúng ta cần tạo là một model Note để tương tác.
Đối với những người không quen thuộc với các model, mô tả dưới đây từ Django có thể giúp ích:
> Một model là nguồn thông tin duy nhất, dứt khoát về dữ liệu của bạn. Nó chứa các trường và hành vi thiết yếu của dữ liệu bạn lưu trữ. Nói chung, mỗi model ánh xạ tới một bảng cơ sở dữ liệu.
> 

Django đặc biệt (so với một framework như Ruby on Rails) ở chỗ việc migrations của bạn tuân theo cách bạn định nghĩa model của mình, thay vì được định nghĩa riêng biệt.

Chúng ta sẽ tạo model Note của mình và sau đó chạy migration để thiết lập cơ sở dữ liệu của chúng ta với bảng note (với tất cả các trường thích hợp).

Hãy tạo model của chúng ta, trong api / model.py:
```
# api/models.py
class Note(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
```
Chúng ta định nghĩa các field cùng với kiểu dữ liệu của chúng.

Điều tiếp theo chúng ta muốn làm là thêm phương thức __str__ vào mô hình. Phương thức này xác định những gì chúng ta nhận được khi chúng ta yêu cầu một thể hiện cụ thể của một model.

Ví dụ:
```
# api/models.py
class Note(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
def __str__(self):
        return self.title
```
Trong ví dụ thì phương thức __str__ có nghĩa là khi chúng ta lấy bất kỳ model Note nào, chúng ta sẽ thấy được tiêu đề. Điều này chỉ giữ cho mọi thứ rõ ràng. (Chúng ta sẽ chỉ tương tác với các model theo cách này thông qua Python shell, vì vậy nó không quá cần thiết nhưng lại rất tốt để nhận biết).

Hãy mở rộng phương thức __str__  để bao gồm cả body:
```
# api/models.py
class Note(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
def __str__(self):
        return f'{self.title} {self.body}'
```
Được rồi, model của chúng ta tất cả đã được thiết lập. Bây giờ hãy chạy migrations để thiết lập cơ sở dữ liệu của chúng ta.
```
python manage.py makemigrations
python manage.py migrate
```
Tiếp theo chèn một note mới vào trong cơ sở dữ liệu bằng python shell:
```
python manage.py shell
>>> from api.models import Note
>>> note = Note(title="First Note", body="This is certainly noteworthy")
>>> note.save()
>>> Note.objects.all()
<QuerySet [<Note: First Note This is certainly noteworthy>]>
>>> exit()
```
Chúng ta tạo note mới, lưu nó, sau đó lấy tất cả các note trong cơ sở dữ liệu. Bạn có thể thấy phương thức __str__ của chúng ta trả lại cả tiêu đề và nội dung.

(Nếu bạn muốn tìm hiểu thêm về trình quản lý Note.objects, xem [tại đây](https://docs.djangoproject.com/en/3.0/topics/db/managers/#django.db.models.Manager)).
# API-ification
Được rồi, vậy là model và cơ sở dữ liệu của chúng ta đã sẵn sàng. Bây giờ chúng ta sẽ xây dựng một số endpoint để có thể tương tác với dữ liệu trong cơ sở dữ liệu.

Một trong những điều cơ bản của API RESTful là ý tưởng về tài nguyên. Thuật ngữ này khá trừu tượng, nhưng trong ngữ cảnh này, nó đề cập đến một lớp nằm giữa các URL và các model của chúng ta.

Một người dùng sẽ gửi request đến endpoint. Tùy thuộc vào URL, người dùng sẽ được chuyển hướng đến một tài nguyên cụ thể, sau đó sẽ thực hiện hành động CRUD phù hợp trên model.

Một lần nữa, đây là một lời giải thích đơn giản về một chủ đề phức tạp - hãy xem nó trong thực tế như thế nào:

Trong thư mục api, hãy tạo một tệp mới có tên là resource.py.
```
# api/resources.py
from tastypie.resources import ModelResource
from api.models import Note
class NoteResource(ModelResource):
    class Meta:
        queryset = Note.objects.all()
        resource_name = 'note'
```
Chúng ta import model Note và tạo một tài nguyên từ nó. queryset là tất cả các đối tượng ghi chú có trong cơ sở dữ liệu.

Chúng ta cũng đặt tên tài nguyên một cách thích hợp: 'note'. Điều này sẽ rất quan trọng đối với các URL.

Nói về điều đó, hãy cài đặt trong tập tin notable_django / urls.py:
```
from django.conf.urls import url, include
from django.contrib import admin
from api.resources import NoteResource
note_resource = NoteResource()
urlpatterns = [
    url('admin/', admin.site.urls),
    url('api/', include(note_resource.urls)),
]
```
Chúng ta nhập NoteResource của mình, khởi tạo nó và sau đó nói rằng chúng ta muốn tất cả các URL bắt đầu bằng api / để chuyển hướng đến tài nguyên. Và đừng quên import thư viện include nhé.
# Kiểm tra API
Cuối cùng, chúng ta có thể chạy thử. Tuy nhiên, để kiểm tra API, chúng ta cần bắt chước các request của phía client. Để làm như vậy, chúng ta sẽ sử dụng một ứng dụng tuyệt vời có tên là Postman. Nó cho phép bạn thực hiện các yêu cầu HTTP đơn giản với các tham số và thông số tùy chỉnh. Bạn có thể tải nó [ở đây](https://www.postman.com/).

Bây giờ chúng ta hãy chạy project bằng câu lệnh sau:

`python manage.py runserver`

Bây giờ trong Postman, hãy gửi một request GET tới URL này: http://localhost:8000/api/note/1
![](https://images.viblo.asia/d3a171f4-c790-4844-8b47-c0a89736cd7b.png)
Tuyệt vời! Endpoint GET của chúng ta đang hoạt động hoàn hảo. Dễ dàng phải không nào :))))

Bây giờ, hãy thử tạo ra một ghi chú mới từ Postman.
# POST, PUT, DELETE
Chúng ta sẽ gửi một đối tượng JSON thô như ghi chú mới như thế này:
![](https://images.viblo.asia/b506fdee-1e3a-4445-a15e-c5796c9351e5.png)
Hãy chắc chắn rằng bạn chọn JSON từ chỗ danh sách màu cam! Điều này sẽ đặt Content-Type header (mà bạn có thể xem trong tab Header).

Ngoài ra, hãy đảm bảo bạn gửi yêu cầu tới http://localhost:8000/api/note/, không phải http://localhost:8000/api/note. Dấu gạch chéo đó rất quan trọng, vì nếu không có nó Django sẽ chuyển hướng bạn và làm mất dữ liệu POST.

Giờ thử gửi yêu cầu đó và kết quả là ...... không thành công. Chúng ta nhận lại một lỗi 401 Unauthorized.

TastyPie bảo vệ các model và chỉ cho phép đọc, không sửa đổi dữ liệu.

Mặc dù vậy, có thể sửa lỗi này dễ dàng - import lớp Authorization vào trong resource của chúng ta.
```
# api/resources.py
from tastypie.resources import ModelResource
from api.models import Note
from tastypie.authorization import Authorization
class NoteResource(ModelResource):
    class Meta:
        queryset = Note.objects.all()
        resource_name = 'note'
        authorization = Authorization()
```
Bây giờ nó đã hoạt động! Hãy thử gửi yêu cầu lại, và chúng ta nhận lại mã 201 Success!

Để kiểm tra lại, bạn có thể gửi yêu cầu GET tới http://localhost:8000/api/note. Bạn sẽ nhận được cả hai ghi chú.

Cảnh báo quan trọng: lớp Authorization của TastyPie, theo cách nói của họ, rất tốt cho phát triển - nhưng không phù hợp để triển khai thực tế. Bạn có thể tìm hiểu sâu hơn về ủy quyền của TastyPie [tại đây](https://django-tastypie.readthedocs.io/en/latest/authorization.html).
# Tất cả các endpoint
Được rồi, vậy là chúng ta đã hoàn thành endpoint GET và POST. Còn PUT và DELETE thì sao?

Chà, điều kỳ diệu làTastyPie đã làm sẵn cho chúng ta. Hãy thử cập nhật hoặc xóa ghi chú đầu tiên của bạn bằng cách gửi yêu cầu PUT hoặc DELETE tới http://localhost:8000/api/note/1/. Nó sẽ hoạt động!

Cứ như thế, chúng ta đã tạo ra một API RESTful.
# Giới hạn các trường
Nếu bạn muốn chỉ gửi thông tin cụ thể, bạn có thể giới hạn các trường như sau:
```
from tastypie.resources import ModelResource
from api.models import Note
from tastypie.authorization import Authorization
class NoteResource(ModelResource):
    class Meta:
        queryset = Note.objects.all()
        resource_name = 'note'
        authorization = Authorization()
        fields = ['title', 'body']
```
Bây giờ bạn sẽ không còn thấy trường created_at trong các request nữa.
# Tham khảo
https://codeburst.io/create-a-django-api-in-under-20-minutes-2a082a60f6f3