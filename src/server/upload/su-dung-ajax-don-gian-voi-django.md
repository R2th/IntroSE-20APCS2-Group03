## 1. Giới thiệu chung
AJAX hiện nay đã trở thành một phần quan trọng của các ứng dụng web. AJAX cũng giúp Django rất nhiều trong việc tăng hiệu quả và tiết kiệm thời gian của người dùng. Tất cả các dịch vụ phổ biến đều sử dụng nó theo cách này hay cách khác. Các ứng dụng như Facebook, Twitter, Instagram, Gmail, Google Maps, Spotify, v.v không thể hoạt động mà không có AJAX.

Bạn sẽ phải sử dụng code AJAX tại một số điểm. Ngay cả trình tìm kiếm của Google cũng sử dụng AJAX. Bạn hẳn đã thấy những cụm từ gợi ý tìm kiếm đó trên thanh tìm kiếm trong khi gõ, đó là những kết quả được tạo ra bởi AJAX.
![](https://images.viblo.asia/b4d26c8d-82e5-4461-9d69-2f9160dfda0a.png)
## 2. AJAX trong Django
Chúng ta đã nói sơ qua về AJAX và cách nó hiện diện trên các trang web. Bây giờ, hãy cùng tìm hiểu tại sao chúng ta cần AJAX trong Django. AJAX là từ viết tắt của **Asynchronous JavaScript and XML** (JavaScript và XML không đồng bộ). Nó là một tổ hợp các công nghệ được thực hiện để giải quyết vấn đề thiết yếu. Nó sử dụng các đối tượng XMLHttpRequest để truyền và nhận dữ liệu.
### Vấn đề mà AJAX giải quyết
* Yêu cầu từ trình duyệt của bạn để tải lại trang.
* Máy chủ tiếp nhận và phản hồi tương ứng với các thư mới được thêm vào.
* Quá trình tiếp tục mỗi khi bạn muốn đọc một thư mới.

Cách tiếp cận này rất tốn thời gian và không hiệu quả. Vấn đề trở nên nghiêm trọng hơn khi người nhận yêu cầu phản hồi khẩn cấp. Rõ ràng, đó là một tình huống thực xảy ra đối với các trang web trước năm 2003.

Cuối năm 2003, tất cả các trình duyệt đã giải quyết vấn đề trên bằng cách sử dụng XHR. XHR là từ viết tắt của **XMLHttpRequest** (các đối tượng XMLHttpRequest). Các trình duyệt sử dụng đối tượng XHR để liên lạc với máy chủ. Quá trình truyền xảy ra mà không cần tải lại toàn bộ trang. API XMLHttpRequest đứng phía sau xử lý các yêu cầu XHR.

Bây giờ, hầu hết tất cả các trình duyệt đều có API XMLHttpRequest. Điều này khiến các ứng dụng như Gmail, Google Maps trở thành hiện thực.
### Cách AJAX hoạt động trong Django
AJAX thực chất chỉ là sự kết hợp giữa 2 đối tượng JavaScript và XHR. Concept này rất đơn giản:

* **Mã JavaScript trên máy khách** – Trình duyệt sẽ tạo ra một request khi một sự kiện xảy ra trên trang web. Mã JavaScript sẽ tạo một đối tượng XHR và được gửi dưới dạng request object đến máy chủ. Đối tượng XHR chứa một số dữ liệu/đối tượng dạng JavaScript. Đối tượng XHR cũng chứa URL hoặc tên của call-back function trên máy chủ.
* **Request được xử lý bởi máy chủ với một callback function** – View function tương ứng hoặc callback function sẽ xử lý request. Nó sẽ gửi một respone thành công hoặc thất bại. Bởi vì request là không đồng bộ, phần còn lại của mã nguồn được thực thi mà không bị gián đoạn. Tại thời điểm đó, máy chủ sẽ xử lý request.
* **Response được trả lại là thành công hoặc thất bại** – Response thành công có thể chứa một số dữ liệu máy chủ ở nhiều định dạng như:<br>**1. Dạng Text**<br>Định dạng Html (Phần này chứa các phần tử HTML).<br>**2. Dạng JSON**<br>Định dạng JSONP (cũng là JSON nhưng chỉ khi response đến từ một miền khác).<br>Script (Phần này chứa một số JavaScript sẽ được thay đổi trong trang).<br>**3. Dạng XML**<br>Tương tự, một response thất bại cũng có thể được định dạng.
* **JavaScript sẽ thực thi theo response nhận được** – Thông thường trình AJAX sẽ thực thi dựa theo dữ liệu từ máy chủ. Chúng ta có thể thay đổi các thành phần HTML hoặc chạy một số JavaScript. Nhiều thứ có thể sử dụng được nó.

![](https://images.viblo.asia/450ea51d-90bf-4d45-abc9-06f0cee4978b.jpg)
## 3. Một ví dụ sử dụng AJAX trên thực tế
Trong bài viết này, chúng ta sẽ cùng nhau tạo ra một ứng dụng website đơn giản quản lý danh sách bạn bè sử dụng AJAX trong Django.
### Thiết lập ban đầu
Chúng ta sẽ sử dụng thư viện `jQuery` để dễ dàng triển khai JavaScript; hơn nữa, chúng ta cũng sẽ sử dụng Bootstrap 4 để làm cho ứng dụng hoạt động tốt hơn.

Dưới đây là `base.html` template, bao gồm thư viện `jQuery` và khung bootstrap. Hãy chắc chắn rằng bạn bao gồm các *link* và *script* này một cách chính xác. Ngoài ra, lưu ý các khối `content` và `javascript`, chúng sẽ được sử dụng sau này.
#### base.html
```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>{% block title %}{% endblock title %}</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    {% block style %}
    {% endblock style %}
</head>

<body>
    {% block content %}
    {% endblock content %}

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
    {% block javascript %}
    {% endblock javascript %}
</body>

</html>
```
Tôi giả sử rằng bạn đã biết cách thiết lập Django. Nếu không, hoặc nếu bạn chưa quen với Django, vui lòng làm theo tài liệu của Django để có được những thiết lập ban đầu.
### Bắt tay vào Code
Trong bài viết này, chúng ta sẽ sử dụng một ví dụ thời gian thực để thể hiện các `POST` và `GET` AJAX requests trong Django.

Chúng ta sẽ sử dụng kịch bản ScrapBook trong đó người dùng có thể tạo một người bạn và ứng dụng sẽ hiển thị nó một cách linh hoạt. Nó cũng sẽ kiểm tra xem nickname đã được sử dụng hay chưa bằng cách gửi yêu cầu `GET` đến máy chủ.

![](https://images.viblo.asia/3ea3b30e-a5ff-4fc2-b1d2-b37a12d2297a.png)
Hãy bắt đầu bằng cách tạo một ứng dụng Django có tên "my_app" bằng lệnh `startapp`. Hãy chắc chắn rằng bạn chạy lệnh `manage.py` sau đây tại nơi tệp tin `manage.py` tồn tại, tức là, trong thư mục dự án của bạn.

`$ python manage.py startapp my_app`

Sau khi tạo ứng dụng Django, hãy đảm bảo rằng bạn thêm nó vào trong `INSTALLED_APPS` trong file `settings.py`.
```
INSTALLED_APPS += [
    'my_app',
]
```
#### Tạo Models
Hãy tạo một model ví dụ cho một `Friend` với số lượng thuộc tính tối thiểu trong file `models.py`
```
from django.db import models

# Create your models here.
class Friend(models.Model):
    # NICK NAME should be unique
    nick_name = models.CharField(max_length=100, unique =  True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    likes = models.CharField(max_length = 250)
    dob = models.DateField(auto_now=False, auto_now_add=False)
    lives_in = models.CharField(max_length=150, null = True, blank = True)

    def __str__(self):
        return self.nick_name
```
Sau khi tạo các models, thực hiện `makemigations` và `migrate` bằng cách chạy các lệnh sau.
```
$ python manage.py makemigrations
$ python manage.py migrate
```
Sau đó, chạy Django server.

`$ python manage.py runserver`

### POST Request
Để submit được form, chúng tôi cần tạo một POST request cho máy chủ với tất cả các giá trị của form được điền bởi người dùng.
#### 1. Tạo Forms
Hãy tạo Django form bằng cách kế thừa `ModelForm`. Trong `FriendForm`, tôi đã thay đổi trường `dob` và kích hoạt tiện ích `DateField` với một số thay đổi cho năm. Và cũng lưu ý rằng trong phương thức `__init__`, tôi đã cập nhật một thuộc tính HTML với `form-control` cho mọi trường của form để Bootstrap được bật trên mọi trường.

Cuối cùng, trong lớp con `Meta`, tôi đã bao gồm lớp phương thức và các trường có khả năng được hiển thị.

Lưu ý rằng tôi đã tạo một file mới có tên `forms.py` trong thư mục ứng dụng của mình, với nội dung như sau:
```
from .models import Friend
from django import forms
import datetime

class FriendForm(forms.ModelForm):
    ## change the widget of the date field.
    dob = forms.DateField(
        label='What is your birth date?', 
        # change the range of the years from 1980 to currentYear - 5
        widget=forms.SelectDateWidget(years=range(1980, datetime.date.today().year-5))
    )
    
    def __init__(self, *args, **kwargs):
        super(FriendForm, self).__init__(*args, **kwargs)
        ## add a "form-control" class to each form input
        ## for enabling bootstrap
        for name in self.fields.keys():
            self.fields[name].widget.attrs.update({
                'class': 'form-control',
            })

    class Meta:
        model = Friend
        fields = ("__all__")
```
#### 2. Tạo Views
Sau khi tạo form, hãy import `FriendForm` vào trong views. Có 2 views cần được cân nhắc trong phần này, và chúng là `indexView` và `postFriend`.
* `indexView` tạo đối tượng `FriendForm`, lấy tất cả các đối tượng friends từ cơ sở dữ liệu và gửi chúng đến `index.html` template, chúng ta sẽ thảo luận về nó sau.
* `postFriend` là AJAX POST view, xử lý **POST** request. Bạn sẽ nhận thấy rằng nó tương tự như view thông thường, nhưng với một số thay đổi, chẳng hạn như `JsonResponse` và `serialize`. Chúng ta sử dụng các phương thức này vì đây là một AJAX view, vì vậy chúng ta chỉ cần xử lý với JSON.

Nội dung file `views.py` như sau:
```
from django.http import JsonResponse
from django.core import serializers
from .forms import FriendForm
from .models import Friend

def indexView(request):
    form = FriendForm()
    friends = Friend.objects.all()
    return render(request, "index.html", {"form": form, "friends": friends})

def postFriend(request):
    # request should be ajax and method should be POST.
    if request.is_ajax and request.method == "POST":
        # get the form data
        form = FriendForm(request.POST)
        # save the data and after fetch the object in instance
        if form.is_valid():
            instance = form.save()
            # serialize in new friend object in json
            ser_instance = serializers.serialize('json', [ instance, ])
            # send to client side.
            return JsonResponse({"instance": ser_instance}, status=200)
        else:
            # some form errors occured.
            return JsonResponse({"error": form.errors}, status=400)

    # some error occured
    return JsonResponse({"error": ""}, status=400)
```
#### 3. Tạo URLs
Đối với các views trên, hãy tạo đường dẫn URL cho từng view một. Lưu ý về tên được đặt cho đường dẫn `postFriend`, nó sẽ được sử dụng trong template được nhắc đến sau trong bài viết này.

Nội dung file `urls.py` như sau:
```
from django.urls import path
from my_app.views import (
    indexView,
    postFriend, 
)

urlpatterns = [
    # ... other urls
    path('', indexView),
    path('post/ajax/friend', postFriend, name = "post_friend"),
    # ...
]
```
#### 4. Tạo Templates
Bây giờ bạn đã tạo ra được backend, hãy chuyển sang phần frontend của bài viết này.

Trong `index.html`, trước tiên chúng ta sẽ extend từ `base.html`, điều này đã được nhắc đến trước đó trong bài viết này. Hơn nữa, chúng ta sẽ viết nội dung bên trong các blocks.

Template được chia thành hai phần. Phần đầu tiên render ra form, phần thứ hai hiển thị các đối tượng `friends` được lưu trữ trước đó trong bảng.
#### index.html
```
{% extends "base.html" %}

{% block content %}

<div class="container-fluid">
    <form id="friend-form">
        <div class="row">
            {% csrf_token %}
            {% for field in form %}
            <div class="form-group col-4">
                <label class="col-12">{{ field.label }}</label>
                {{ field }}
            </div>
            {% endfor %}
            <input type="submit" class="btn btn-primary" value="Create Friend" />
        </div>
    <form>
</div>
<hr />

<div class="container-fluid">
    <table class="table table-striped table-sm" id="my_friends">
        <thead>
            <tr>
                <th>Nick name</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Likes</th>
                <th>DOB</th>
                <th>lives in</th>
            </tr>
        </thead>
        <tbody>
        {% for friend in friends %}
        <tr>
            <td>{{friend.nick_name}}</td>
            <td>{{friend.first_name}}</td>
            <td>{{friend.last_name}}</td>
            <td>{{friend.likes}}</td>
            <td>{{friend.dob | date:"Y-m-d"}}</td>
            <td>{{friend.lives_in}}</td>
        </tr>
        {% endfor %}
        </tbody>
    </table>

</div>
{% endblock content %}
```
Bây giờ hãy chuyển sang phần JavaScript của bài viết này.

Khi submit form, ta sẽ serialize dữ liệu của form và tạo một AJAX POST request, sau đó gửi nó đến máy chủ.

Với request là successful, thêm hàng mới vào bảng.

Lưu ý rằng chúng ta đã sử dụng reversed `URL`, được nhắc đến trong phần `urls.py`. Điều này giúp bạn không phải viết đường dẫn URL cứng.

Bạn có thể đặt reversed URL tag này vào trong thuộc tính HTML và sau đó fetch thuộc tính sau. Hãy đặt mã JavaScript này vào trong file `js`.
#### index.html
```
{% block javascript %}
<script>
    /*
        On submiting the form, send the POST ajax
        request to server and after successfull submission
        display the object.
    */
    $("#friend-form").submit(function (e) {
        // preventing from page reload and default actions
        e.preventDefault();
        // serialize the data for sending the form data.
        var serializedData = $(this).serialize();
        // make POST ajax call
        $.ajax({
            type: 'POST',
            url: "{% url 'post_friend' %}",
            data: serializedData,
            success: function (response) {
                // on successfull creating object
                // 1. clear the form.
                $("#friend-form").trigger('reset');
                // 2. focus to nickname input 
                $("#id_nick_name").focus();

                // display the newly friend to table.
                var instance = JSON.parse(response["instance"]);
                var fields = instance[0]["fields"];
                $("#my_friends tbody").prepend(
                    `<tr>
                    <td>${fields["nick_name"]||""}</td>
                    <td>${fields["first_name"]||""}</td>
                    <td>${fields["last_name"]||""}</td>
                    <td>${fields["likes"]||""}</td>
                    <td>${fields["dob"]||""}</td>
                    <td>${fields["lives_in"]||""}</td>
                    </tr>`
                )
            },
            error: function (response) {
                // alert the error if any error occured
                alert(response["responseJSON"]["error"]);
            }
        })
    })
</script>
{% endblock javascript %}
```
### GET Request
Bây giờ hãy chuyển sang `GET` Request. Trong kịch bản hiện tại của chúng ta, trước khi gửi form, chúng ta có thể kiểm tra xem một nickname đã tồn tại trong cơ sở dữ liệu hay chưa bằng cách gửi nickname đã được nhập trở lại máy chủ.

Sau đây là ảnh chụp màn hình về những gì chúng ta sẽ xây dựng trong phần này.
![](https://images.viblo.asia/2dc354db-2837-400f-8b75-c25a204e3eee.png)
#### 1. Tạo Views
Hãy tạo view cho kịch bản này. Trong view `checkNickName`, trước tiên chúng ta lấy nickname đã được gửi bởi AJAX request và sau đó kiểm tra xem có người bạn nào có nickname này trong cơ sở dữ liệu không. Nếu nó đã tồn tại, thì chúng ta trả về với giá trị là False, ngược lại là True.
```
from django.http import JsonResponse
from .models import Friend

def checkNickName(request):
    # request should be ajax and method should be GET.
    if request.is_ajax and request.method == "GET":
        # get the nick name from the client side.
        nick_name = request.GET.get("nick_name", None)
        # check for the nick name in the database.
        if Friend.objects.filter(nick_name = nick_name).exists():
            # if nick_name found return not valid new friend
            return JsonResponse({"valid":False}, status = 200)
        else:
            # if nick_name not found, then user can create a new friend.
            return JsonResponse({"valid":True}, status = 200)

    return JsonResponse({}, status = 400)
```
#### 2. Tạo URLs
Đối với view ở trên, hãy tạo một đường dẫn URL có tên là `validate_nickname`.
```
from django.urls import path
from my_app.views import (
    checkNickName
)

urlpatterns = [
    # ...other urls
    path('get/ajax/validate/nickname', checkNickName, name = "validate_nickname")
    # ...
]
```
#### 3. Tạo Templates
Bây giờ, hãy viết AJAX `GET` request cho sự kiện `focusout` của trường input `nick_name` bằng cách lấy giá trị `nick_name` hiện tại và gửi nó đến máy chủ.

Sau một successful `GET` request, hãy thông báo xem `nick_name` có được chấp nhận hay không.
```
{% block javascript %}
<script>
    /*
    On focus out on input nickname,
    call AJAX get request to check if the nickName
    already exists or not.
    */
    $("#id_nick_name").focusout(function (e) {
        e.preventDefault();
        // get the nickname
        var nick_name = $(this).val();
        // GET AJAX request
        $.ajax({
            type: 'GET',
            url: "{% url 'validate_nickname' %}",
            data: {"nick_name": nick_name},
            success: function (response) {
                // if not valid user, alert the user
                if(!response["valid"]){
                    alert("You cannot create a friend with same nick name");
                    var nickName = $("#id_nick_name");
                    nickName.val("")
                    nickName.focus()
                }
            },
            error: function (response) {
                console.log(response)
            }
        })
    })
</script>
{% endblock javascript %}
```
### BONUS: Sử dụng Class-based Views
Nếu bạn có một số kinh nghiệm với Django, thì có lẽ bạn biết rằng bạn có thể tạo view theo function và theo Class. Hầu hết các developers lúng túng trong việc sử dụng chúng và khi nào thì sử dụng. Vì vậy, trong bài viết ngắn này, hãy chuyển đổi code FBV (function based view) ở trên thành code CBV (class based view).

Trong phần này, tôi sẽ kết hợp các function `indexView` và `postFriend` thành một Class duy nhất gọi là `FriendView`, kế thừa lớp `View` và có 2 phương thức là `get` và `post` tương ứng.

Nội dung file `views.py` như sau:
```
from django.shortcuts import render
from django.http import JsonResponse
from django.core import serializers
from .forms import FriendForm
from .models import Friend

from django.views import View

class FriendView(View):
    form_class = FriendForm
    template_name = "index.html"

    def get(self, *args, **kwargs):
        form = self.form_class()
        friends = Friend.objects.all()
        return render(self.request, self.template_name, 
            {"form": form, "friends": friends})

    def post(self, *args, **kwargs):
        if self.request.is_ajax and self.request.method == "POST":
            form = self.form_class(self.request.POST)
            if form.is_valid():
                instance = form.save()
                ser_instance = serializers.serialize('json', [ instance, ])
                # send to client side.
                return JsonResponse({"instance": ser_instance}, status=200)
            else:
                return JsonResponse({"error": form.errors}, status=400)

        return JsonResponse({"error": ""}, status=400)
```
Hãy viết urlpattern cho CBV đã thảo luận ở trên. Nội dung file `urls.py` như sau:
```
from django.urls import path
from my_app.views import (
    FriendView
)

urlpatterns = [
    # ... other urls
    path("", FriendView.as_view(), name = "friend_cbv"),
    # ...
]
```
Để chuyển đổi từ FBV sang CBV, bạn cần thay đổi cả reverse URL pattern.
#### index.js
```
// other previous stuff
$.ajax({
    type: 'POST',
    url: "{% url 'friend_cbv' %}", // CHANGE the POST url
    // ... continues
// ...
```
## 4. Kết luận
AJAX là cách tốt nhất để thực hiện các tác vụ không đồng bộ trong Django, ít nhất là ở quy mô nhỏ. Nếu bạn muốn thực hiện một tác vụ không đồng bộ ở quy mô lớn hơn, bạn có thể thực hiện lập trình socket trong Django hoặc sử dụng các thư viện JavaScript front-end như Angular, Vue hoặc React.
### Nguồn tham khảo
* [Django Documentation](https://docs.djangoproject.com/en/2.2/)
* [Django AJAX csrf](https://docs.djangoproject.com/en/2.2/ref/csrf/#ajax)
* [AJAX in Django - Data Flair](https://data-flair.training/blogs/ajax-in-django/)