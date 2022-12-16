Tiếp theo trong series tutorial về Django Tastypie, mình sẽ giới thiệu thêm toàn bộ trong phần Authentication:
Khuyến nghị bạn nên đọc trước phần 1 [tại đây](https://viblo.asia/p/xay-dung-nhanh-chong-api-voi-django-tastypie-phan-1-m68Z08P2ZkG) để tránh một vài điều không hiểu :D

Authentication là một component cần thiết đề xác thực ai và quyền hạn của họ truy câp tới một API nào đó. 

# Usage
Cơ bản nhất là thêm option `authentication` vào trong `class Meta` của `resource.py`
Ở đây mình setup thêm `BasicAuthentication` cho API này

```py
from django.contrib.auth.models import User
from tastypie.authentication import BasicAuthentication
from tastypie.resources import ModelResource


class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        resource_name = 'auth/user'
        excludes = ['email', 'password', 'is_superuser']
        # Add it here.
        authentication = BasicAuthentication

```

Đây là kết quả

![](https://images.viblo.asia/e6122891-f0cc-4f9c-a520-01ae59212bc1.jpg)

# Options
Ngoài `BasicAuthentication` Tastypie cung cấp một số Auth khác
## Authentication

Đây là option mặc định của Tastypie. Client luôn luôn có thể truy cập vào API. Cái này rất hữu ích cho việc develop

## BasicAuthentication

 Đây là option cho phép setup một HTTP Basic Auth  cơ bản. Username/password chính là dữ liệu được save trong `django.contrib.auth.models.User`.
 Một lưu ý khi dùng `BasicAuthentication` kết hợp với `Apache` và `mod_wsgi` đó là phải **enable** `WSGIPassAuthorization`.
 
## ApiKeyAuthentication

Đây là option cho phép thay thế sự auth password bằng một mã `api_key`.  `ApiKeyAuthentication` cung cấp một `machine-generated ` cho phép genrerated từ username/password ra một mã `api_key`. 
Có 2 cách để làm việc này:

1. Setup một signal để mỗi khi tạo một User sẽ tự sinh ra một `api_key`
```py
from django.contrib.auth.models import User
from django.db.models import signals
from tastypie.models import create_api_key

signals.post_save.connect(create_api_key, sender=User)
```

2. Với những data user cũ:
```sh
$python manage.py backfill_api_keys
Created a new key for 'minhhahao'
Created a new key for 'ha.hao.minh'
Created a new key for 'nguyen.thi.van'
```

Kiếm tra bảng `tastypie_apikey`:
![](https://images.viblo.asia/67549815-4b73-4d4c-9e5e-a5b1dfe1b6a7.jpg)

Để sử dụng nó mình cần sửa lại code trong phần `authentication`  - tất nhiên rồi =)):
```py
# resources.py
from tastypie.resources import ModelResource
from tastypie.authentication import ApiKeyAuthentication
from django.contrib.auth.models import User


class AccountResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        allowed_methods = ['get']
        excludes = ['email', 'password', 'is_superuser']
        authentication = ApiKeyAuthentication()
```

Thêm vào Header Authorization theo cấu trúc:
```sh
Authorization: ApiKey <username>:<api_key>
```

Kết quả:

![](https://images.viblo.asia/7016b704-db8c-4b98-8a40-8e850f0a51a9.jpg)

## SessionAuthentication

Đây là option auth dựa trên Django session. Vậy nên mình cũng không muốn nói gì thế :v Nếu bạn không hiểu bạn có thể đọc thêm về Django session [tại đây](https://docs.djangoproject.com/en/2.0/topics/http/sessions/)

## DigestAuthentication

Đây là option cho phép setup một HTTP Digest Auth. Cái này tương tự `BasicAuthentication`.Tuy nhiên, bạn phải cài đặt thêm gói `python_digest`

Mình có thể cài gói này qua pip:

```sh
$pip install python_digest
Collecting python_digest
  Downloading https://files.pythonhosted.org/packages/8a/24/e5d9e5a4b4cf2ff5952e847e814303c31967226bd7bae89ee061e1f0c674/python-digest-1.7.tar.gz
Building wheels for collected packages: python-digest
  Running setup.py bdist_wheel for python-digest ... done
  Stored in directory: /Users/minhhahao/Library/Caches/pip/wheels/5f/be/90/1f6cfa54c783455991ecc42937828075a9606b93ca43defd4b
Successfully built python-digest
Installing collected packages: python-diges
```

Ok

![](https://images.viblo.asia/30452754-0465-4e19-807b-c07b05d94b4a.jpg)

## OAuthAuthentication

Đây là option handle OAuth. 

## MultiAuthentication

Đây là option cho phép kết hợp nhiều option auth.

Ví dụ:

```py
from django.contrib.auth.models import User
from tastypie.authentication import BasicAuthentication, ApiKeyAuthentication, MultiAuthentication
from tastypie.authorization import DjangoAuthorization
from tastypie.resources import ModelResource

class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        resource_name = 'auth/user'
        excludes = ['email', 'password', 'is_superuser']

        authentication = MultiAuthentication(BasicAuthentication(), ApiKeyAuthentication())
        authorization = DjangoAuthorization()
```

Ở ví dụ trên, API này có thể auth bằng 2 cách:
- Auth bằng `BasicAuthentication` nếu người dùng chỉ có username/password
- Auth bằng `ApiKeyAuthentication` nếu người dùng muốn sử dụng `api_key`

Đây mình đánh giá là option rất là hay của Tastypie :D

## Implementing a your Authentication

Bạn hoàn toàn có thể tự tạo ra một Class để auth theo cách bạn muốn. Cái này mình recommend là bạn nên sử dụng để phù hợp với từng dự án

Đây là một ví dụ:
```
from tastypie.authentication import Authentication

class ApiAcountOptionAuthentication(Authentication):
    def is_authenticated(self, request, **kwargs):
        if request.user.is_authenticated():
            return True
        try:
            if "HTTP_TOKEN" in request.META:
                access_token = request.META.get('HTTP_TOKEN')
                if access_token:
                    user = get_user_profile_service().get_api_user_from_token(token=access_token)
                    request.user = user
            if "HTTP_AUTHORIZATION" in request.META:
                access_token = request.META.get('HTTP_AUTHORIZATION')
                if "Bearer" in access_token:
                    valid, r = get_oauthlib_core().verify_request(request, scopes=[])
                    if valid:
                        request.user = r.user
        except Exception as ex:
            request.user = None
        return True
...
```

Tới đây bài viết cũng hết rồi. Một vài lưu ý nhỏ với các bạn là với những server sử dụng Apache và `mod_wsgi`, những auth option sau sẽ phải **enable** `WSGIPassAuthorization`:
- DigestAuthentication
- BasicAuthentication
- ApiKeyAuthentication

Thanks for reading :)