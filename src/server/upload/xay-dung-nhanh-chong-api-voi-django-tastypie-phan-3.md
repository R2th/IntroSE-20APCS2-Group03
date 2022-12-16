Tiếp theo [phần 1](https://viblo.asia/p/xay-dung-nhanh-chong-api-voi-django-tastypie-phan-1-m68Z08P2ZkG) và [phần 2](https://viblo.asia/p/xay-dung-nhanh-chong-api-voi-django-tastypie-phan-2-Do754MqBKM6), phần 3 này mình sẽ giới thiệu về cách sử dụng `Non-ORM Data Sources` trong Tastypie
Requirement trước khi đọc phần này là bạn phải đọc qua phần 1 [tại đây](https://viblo.asia/p/xay-dung-nhanh-chong-api-voi-django-tastypie-phan-1-m68Z08P2ZkG)


Okay, vì sao mình lại giới thiệu phần này? Khi bạn đã cảm thấy quá bí bách với Tastypie. Khi bạn cảm thấy quá nhàm chán. Khi bạn không muốn response có những dữ liệu mà thông qua tính toán không lưu trong model, blabla...

Tastypie định hướng được xây dựng để xử lý `Non-ORM` data. Không dài dòng nữa, bắt đầu nào!


# Approach

Tastypie cung cấp class `Resource`. Class này cung cấp rất nhiều thứ sẵn có cho bạn tương tự như `ModelResource`:
- `authentication`
- `authorization`
- `caching`
- `serialization`
...


Chúng ta sẽ có 9 method cần phải implement nếu cần full read-write một API:
- `detail_uri_kwargs`
- `get_object_list`
- `obj_get_list`
- `obj_get`
- `obj_create`
- `obj_update`
- `obj_delete_list`
- `obj_delete`
- `rollback`

Tất nhiên, nếu bạn không cần full read-write, bạn có thể chỉ cần implement một số methods thôi.

# Usage

Bài toán: Tạo endpoint ProfileUser đáp ứng các nhu cầu:
- Hiển thị list profile
- Hiển thị một profile
- Create mới một profile
- Update một profile
- Delete một profile

Đầu tiên mình tạo 2 class:

```python

class ProfileObject(object):
    def __init__(self, initial=None):
        self.__dict__['_data'] = {}

        if hasattr(initial, 'items'):
            self.__dict__['_data'] = initial

    def __getattr__(self, name):
        return self._data.get(name, None)

    def __setattr__(self, name, value):
        self.__dict__['_data'][name] = value

    def to_dict(self):
        return self._data


class ProfileResource(Resource):
    user_id = IntegerField(attribute='user_id')
    username = CharField(attribute='username')
    slug = CharField(attribute='slug')
    avatar = CharField(attribute='avatar')
    email = CharField(attribute='email')
    phone = CharField(attribute='phone')
    star = IntegerField(attribute='star')

    class Meta:
        resource_name = 'profile'
        object_class = ProfileObject
```

Trong ví dụ trên:
- `ProfileObject`: class này để chúng ta đẩy dữ liệu vào và lấy dữ liệu ra
- `MessageResource`: class này sẽ define các field tương ứng với data type của từng field

Ok. Mình sẽ đi vào từng feature:

## List profile

```python
def obj_get_list(self, bundle, **kwargs):
    return  self.get_object_list(bundle.request)

def get_object_list(self, request):
    fix_data = [
        {
            "user_id": 1,
            "username": "minhhahao",
            "slug": "/minhhahao",
            "avatar": "https://google.com",
            "email": "minhhahao@abc.com",
            "phone": "0123456789",
            "star": 9999
        },
        {
            "user_id": 2,
            "username": "ha.hao.minh",
            "slug": "/ha.hao.minh",
            "avatar": "https://google.com",
            "email": "ha.hao.minh@abc.com",
            "phone": "0987654321",
            "star": 8888
        },
        {
            "user_id": 3,
            "username": "nguyenthivan",
            "slug": "/nguyenthivan",
            "avatar": "https://google.com",
            "email": "nguyenthivan@abc.com",
            "phone": "0987654321123",
            "star": 7777
        }
    ]

    results = [ProfileObject(initial=data) for data in fix_data]

    return results
```


Ở đây mình sẽ override 2 methods mình đã liệt kê bên đầu bài đó là: `get_object_list`, `obj_get_list`.
Biến `fix_data` là dữ liệu mình hard code ra. Sau đó mình chuyển dữ liệu đó vào `ProfileObject`. Cuối cùng trả về list `ProfileObject`.
Ở đây,  với từng bài toán cụ thể bạn có thể query các kiểu để có dữ liệu. Vì là demo nên mình sử dụng fix data.
Ngoài ra, do mặc định Tastypie, get list object sẽ luôn trả về `resource_uri`. Nhưng mình không muốn hiển thị cái này ở response. Vậy nên mình sẽ disable nó đi :D :

```python
...
    class Meta:
        resource_name = 'profile'
        object_class = ProfileObject
        include_resource_uri = False
....

```

Nếu bạn muốn hiển thị `resource_uri` để có thể dẫn link vào detail. Bạn cần override lại method thứ 3: `detail_uri_kwargs`

```python

def detail_uri_kwargs(self, bundle_or_obj):
    kwargs = {}

    if isinstance(bundle_or_obj, Bundle):
        kwargs['pk'] = bundle_or_obj.obj.user_id
    else:
        kwargs['pk'] = bundle_or_obj.user_id

    return kwargs

```
Ở đây, url detail mình trả lại lấy `pk` dựa vào `user_id`

Ảnh demo:

![](https://images.viblo.asia/3ceb8f90-4c5d-4c4a-a62c-b2e47b06dc94.jpg)

## Detail profile

```python
def obj_get(self, bundle, **kwargs):
    # Todo: handle get data using bundle and kwargs
    user_profile = kwargs.get("pk")
    if user_profile and int(user_profile) == 1:
        fix_data = {
            "user_id": 1,
            "username": "minhhahao",
            "slug": "/minhhahao",
            "avatar": "https://google.com",
            "email": "minhhahao@abc.com",
            "phone": "0123456789",
            "star": 9999
        }
        return ProfileObject(initial=fix_data)

```

Ở feature này, mình cũng override method `obj_get`. Mình sử dụng `kwargs.get("pk")` để get `pk` từ request. Từ `pk` đó bạn có thể handle những thứ tiếp theo như ý đồ của bạn.
Như mình, mình trả về đoạn fix data như trên :

Ảnh demo:

![](https://images.viblo.asia/949c159f-8fbc-4928-8325-d8126ab3945b.jpg)

## Create/Update profile

```python
def obj_create(self, bundle, **kwargs):
    # Todo: handle save data using bundle and kwargs
    fix_data = {
        "user_id": 1,
        "username": "minhhahao",
        "slug": "/minhhahao",
        "avatar": "https://google.com",
        "email": "minhhahao@abc.com",
        "phone": "0123456789",
        "star": 9999
    }
    bundle.obj = ProfileObject(**fix_data)

```

Để create được object bạn cần override lại method `obj_create`. Data từ request body sẽ được Tastypie build vào trong `bundle` và `kwargs`.
Khi có được data input, bạn có thể tự implement theo bài toán của mình.

Còn update thì bạn sử override lại method: `obj_update`. Mình có thể xử lý chung update và create vào một function
```python
def obj_update(self, bundle, **kwargs):
        return self.obj_create(bundle, **kwargs)
```

Ảnh demo:

![](https://images.viblo.asia/f43286e6-6dda-49a8-b097-f46bf6349a93.jpg)

## Delete profile
```
def obj_delete_list(self, bundle, **kwargs):
    bucket = self._bucket()

    for key in bucket.get_keys():
        obj = bucket.get(key)
        obj.delete()

def obj_delete(self, bundle, **kwargs):
    bucket = self._bucket()
    obj = bucket.get(kwargs['pk'])
    obj.delete()

```

Delete profile có 2 lựa chọn là xóa 1 list và xóa 1 profile. Tương ứng mình phải override 2 method: `obj_delete_list` và `obj_delete`


Trên đây mình đã giới thiệu phần 3 về Tastypie. Trong phần tiếp theo mình sẽ giới thiệu nhiều thứ hay ho về nó nữa.
Cảm ơn các bạn đã đọc!