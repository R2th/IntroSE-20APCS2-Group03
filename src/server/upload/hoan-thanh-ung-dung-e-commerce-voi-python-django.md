![](https://i0.wp.com/www.vetbossel.in/wp-content/uploads/2020/08/django.png)

Xin chào tất cả mọi người. Tiếp nối [phần 1](https://viblo.asia/p/python-django-xay-dung-ung-dung-e-commerce-part-1-LzD5da4dKjY) và [phần 2](https://viblo.asia/p/de-dang-co-ngay-ung-dung-e-commerce-voi-django-part-2-aWj53n2Yl6m) về việc xây dựng 1 ứng dụng e-commerce với Django, sau đây mình xin được viết phần 3 để hoàn thiện ứng dụng thương mại điện tử nhỏ nhỏ này.

Phần 3 này gồm các phần mình sẽ thực hiện như sau:
- Cho phép người dùng đánh giá (rating) cho sản phẩm
- Deploy ứng dụng lên **AWS Elastic Beanstalk** hoặc **Python Anywhere**

# Chức năng review sản phẩm

## Cho phép review

Trước tiên, mình tạo 1 bảng mới có tên `ReviewRating` trong app `store`, với 2 khóa ngoài là sản phẩm và nguời dùng, các trường còn lại gồm chủ để, đánh giá với text và đánh giá với số sao:
```
class ReviewRating(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    subject = models.CharField(max_length=100, blank=True)
    review = models.TextField(max_length=500, blank=True)
    rating = models.FloatField()
    ip = models.CharField(max_length=20, blank=True)
    status = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
```

Sau khi tạo bảng với lệnh `migrate` mình tạo 1 form model cơ bản gồm các trường `subject`, `review`, `rating`.
Mình tạo 1 đường dẫn để người dùng có thể gửi form review có tên `submit_review` trong file `store/urls.py`. Đồng thời, cũng tạo hàm ở views.py luôn:
```
def submit_review(request, product_id):
    url = request.META.get('HTTP_REFERER')
    if request.method == "POST":
        try:
            review = ReviewRating.objects.get(user__id=request.user.id, product__id=product_id)
            form = ReviewForm(request.POST, instance=review)
            form.save()
            messages.success(request, "Thank you! Your review has been updated.")
            return redirect(url)
        except Exception:
            form = ReviewForm(request.POST)
            if form.is_valid():
                data = ReviewRating()
                data.subject = form.cleaned_data['subject']
                data.rating = form.cleaned_data['rating']
                data.review = form.cleaned_data['review']
                data.ip = request.META.get('REMOTE_ADDR')
                data.product_id = product_id
                data.user_id = request.user.id
                data.save()
                messages.success(request, "Thank you! Your review has been submitted.")
                return redirect(url)
```

Mình thêm 1 phần html trong trang product_detail.html, thêm 1 đoạn css và thêm 1 thẻ link trong trang base.html để có thể tải icon từ FontAwesome xuống.

Kết quả mà mình có được như sau:


![](https://s6.gifyu.com/images/Peek-2021-07-17-00-08.gif)

## Hiển thị review

Trong hàm product_detail của file `store/views.py`, mình lấy những bản ghi review có khóa ngoài là id của sản phẩm hiện tại, sau đó hiển thị chúng như 1 danh sách template.

Kết quả mình thực hiện như sau:

![](https://images.viblo.asia/0349092f-c435-4977-a46c-c420c4c05d37.png)

# Deploy ứng dụng với AWS Elastic Beanstalk
Amazon Elastic Beanstalk có tài liệu hướng dẫn phần deploy 1 ứng dụng như thế nào, mọi người có thể tham khảo [ở đây](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create-deploy-python-django.html)

## Cài đặt tài khoản Amazon aws

Mình tạo 1 tài khoản ở trang amazon aws (https://aws.amazon.com/vi/)

Mình cũng phải xác thực tài khoản thanh toán qua trang https://portal.aws.amazon.com/billing/signup?redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation#/identityverification. Ở đây mình sẽ phải thực hiện 5 bước để xác thực tài khoản thanh toán

Trở lại folder code, mình chạy lệnh `pip freeze > requirements.txt` để ghi hết các thư viện python trong môi trường python cho đến hiện tại. Sau đó, mình tạo folder mới có tên `.ebextensions` và 1 file trong đó `django.config` với nội dung như sau:

**Chú ý phần {...} phải là tên folder chứa file wsgi.py :grinning:**
```
option_settings:
  aws:elasticbeanstalk:container:python:
    WSGIPath: {...}/wsgi.py tức là: greatkart/wsgi.py
```

Tiếp theo, mình tạo 1 repo EB CLI với lệnh sau:
```
eb init -p python-3.6 My-Greakart
```
Phần tên repo các mình có thể tùy chỉnh nhưng phiên bản Python mình để là 3.6. Sau đó, mình sẽ phải nhập `aws-access-id`, mình truy cập vào trang https://console.aws.amazon.com/iam/home?region=us-east-2#/security_credentials, mở dropout `Access keys (access key ID and secret access key)` và tạo 1 key mới. Ngay khi modal mở ra và thông báo tạo key thành công, mình phải copy cả access key lẫn secret key và paste vào máy local.

![](https://images.viblo.asia/fab21ccd-65db-4a71-8b7b-ff11dfea1258.png)

Nhưng đến đây, cá nhân mình lại gặp lỗi `Operation Denied`. Chắc là do liên kết tài khoản ngân hàng rồi đây :grinning:

Có lẽ mình sẽ chuyển sang Python Anywhere để deploy xem sao

# Deploy ứng dụng với Python Anywhere

Trước tiên thì mình phải tạo tài khoản trên trang chủ https://www.pythonanywhere.com/. Ứng dụng này cho phép tạo app, mỗi app cho phép deploy 1 project của chúng ta. Để tạo app thứ 2 thì chúng ta phải trả phí :grinning::grinning:

## Chuẩn bị

Mình nén toàn bộ folder chứa code thành 1 file zip mới, có tên `Greatkart.zip`. Mở folder trong file zip, mình xóa toàn bộ các file migrate, tức là để trống các folder `migrations` trong mỗi folder app. Đồng thời folder `media` mình để trống.

Truy cập vào tab `Database` trên Python Anywhere và tạo 1 database, Python Anywhere chỉ hỗ trợ My SQL cho tài khoản miễn phí. Tên database mình để giống trong file `env`, mật khẩu có thể khác.

## Cấu hình

Truy cập vào tab `File` trong tab `Dashboard`, nhấn `Upload a file` để tải lên file zip mà mình vừa mới chỉnh sửa. Để giải nén tệp này, mình click vào `Open Bash console here` để chạy lệnh giải nén với lệnh đơn giản `unzip Grearkart` là xong.

Tại màn hình terminal trên, mình chạy lệnh `mkvirtualenv --python=/usr/bin/python3.7 env_greatkart` để cài đặt python 3.7 và mỗi trường ảo luôn. Cài đặt các thư viện với việc lệnh `cd GreatKart` và `pip3 install -r requirements.txt`

Trở lại `Dashboard`, mình vào tab `Web apps` và tạo 1 web, phần tùy chỉnh mình để `Manual configuration` và `python3.7`. Tạo xong và click vào `Enter path to a virtualenv, if desired`, nhập tên môi trường vừa nãy tạo là `env_greatkart` là được.

![](https://images.viblo.asia/18326f55-96a3-4e3f-928a-838b99b379d9.png)

Tiếp tục kéo xuống mục `Code` và click vào `/var/www/chungcypher_pythonanywhere_com_wsgi.py` để sửa file wsgi.py của web app. Xóa toàn bộ ngoại trừ phần comment `++ Django ++` và uncomment các dòng code cũng như chỉnh sửa như bên dưới và lưu lại.
```
import os
import sys


path = '/home/<your_name>/GreatKart'
if path not in sys.path:
    sys.path.append(path)

os.environ['DJANGO_SETTINGS_MODULE'] = 'greatkart.settings'

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
```

Quay trở lại với tab `File`, mình chỉnh sửa file settings.py trong folder `GreatKart/greatkart` gồm:
- `ALLOWED_HOSTS = ['<your_name>.pythonanywhere.com']`
- Phần `Database` liên quan đến Database mình đã tạo vừa nãy

```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': '<your_name>$<database_name>'
        'USER': '<your_name>',
        'PASSWORD': '<your_password>',
        'HOST': '<your_name>.mysql.pythonanywhere-services.com',
    }
}
```
- Key `DIRS` trong biến `templates` mình cũng sửa lại:
```
'DIRS': [os.path.join(BASE_DIR, 'templates')],
```
- Phần static & media:
```
STATIC_ROOT = '/home/<your_name>/greatkart/static'
```
- Các phần còn lại mình trả lại biến env tương ứng, cũng như xóa các dòng liên quan đến `env`

Quay trở lại với màn hình terminal ban đầu, mình chạy lệnh makemigrations sau đó migration:
```
python3 manage.py makemigrations accounts carts category orders store
```

Quay lại tab web lúc trước, ở mục `Static files` mình thêm URL và path tương ứng
`URL = /static/` `path = /home/<your_name>/greatkart/static`

## Hoàn thiện

Như vậy, mình đã kết thúc việc cấu hình web app trên Python Anywhere

VIệc tiếp theo là quay trở lại màn hình terminal lúc trước và chạy lệnh để tạo admin
```
python3 manage.py createsuperuser
```
Như vậy là xong rồi, mình truy cập trang http://yourname.pythonanywhere.com/ là có thể sử dụng bình thường

Và đây là trang mà mình sau khi deploy [My app](http://chungcypher.pythonanywhere.com/). Các bản ghi chưa có thì mình phải tạo trong trang admin.

Code đầy đủ cho project mình để [ở đây](https://github.com/chungpv-1008/GreatKart)

Cảm ơn mọi người đã theo dõi. Đừng quên cho mình 1 upvote ạ :grinning: