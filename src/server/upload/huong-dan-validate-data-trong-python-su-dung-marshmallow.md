Validate dữ liệu là một khâu rất cần thiết trong lập trình, đặc biệt là lập trình web. Trong Python, cũng có rất nhiều thư viện hỗ trợ validation. Trong số đó, Marshmallow là thư viện có tên tuổi. Nào chúng ta cùng khám phá nhé :D

## Introduction

Trang chủ của Marshmallow các bạn có thể tham khảo tại đây: https://marshmallow.readthedocs.io/en/3.0/

Ngoài ra, Marshmallow cũng được sử dụng kết hợp với các framework web khác tạo ra các plugin hay extension như:

- https://flask-marshmallow.readthedocs.io/en/latest/: Plugin của Flask
- https://github.com/marshmallow-code/django-rest-marshmallow: Plugin của Django Rest Framework

Tóm tắt một ngắn gọn một vài features của Marshmallow:

- **Validate** input data
- **Deserialize** input data to app-level objects.
- **Serialize** app-level objects to primitive Python types.

## Installation

Marshmallow được public tại đây: https://pypi.org/project/marshmallow/
Bạn có thể cài dễ dàng qua `pip`

```py
pip install marshmallow
```

Lastest version tại thời điểm bài viết này là `2.19.1`

Python version support marshmallow:

- Python 2.6 ++
- Python 3.4 ++

## Guide

Trong guide này, mình sẽ chỉ giới thiệu tóm tắt 3 features chính:

- Validation
- Deserialize
- Serialize

Ngoài ra, các bạn có thể đọc thêm các features khác ở trong docs nhé:

### Validation

Đầu tiên, mình sẽ khởi tạo một object model:

```python
from datetime import datetime

class Customer(object):
    def __init__(self, username, email):
        self.username = username
        self.email = email
        self.created = datetime.now()
```

Tiếp theo, mình tạo một schema validate các field tương ứng trong objects models trên.

```python
from marshmallow import Schema, fields

class CustomerSchema(Schema):
    username = fields.Str()
    email = fields.Email()
    created = fields.DateTime()
```

Để validate input data, ta sẽ sử dụng syntax: `shema.load()`. Cụ thể:

```python
input_data = {'username': 'minhhahao', 'email': 'abc@abc.com'}
result = CustomerSchema().load(input_data)
print(result.data)
```

Kết quả có được:

```sh
{'email': 'abc@abc.com', 'username': 'minhhahao'}
```

Tức là dữ liệu này đúng format mình mong muốn.

Thử một example khác

```python
input_data = {'username': 'minhhahao', 'email': 'abc'}
result = CustomerSchema().load(input_data)
print(result.data)
```

Kết quả:

```sh
{'username': 'minhhahao'}
```

Kết quả này là do value của email đang lỗi định dạng email: `'email': 'abc'`. Vậy các bạn thắc mắc, làm sao để raise ra được lỗi ?

Ok, ta quay về chỗ định nghĩa Schema, thêm option `strict=True`:

```python
from marshmallow import Schema, fields

class CustomerSchema(Schema):
    username = fields.Str()
    email = fields.Email()
    created = fields.DateTime()

    class Meta:
        strict=True
```

Thử lại example trên, ta sẽ thấy lỗi in ra:

```sh
In [21]: input_data = {'username': 'minhhahao', 'email': 'abc'}
    ...: result = CustomerSchema().load(input_data)
    ...: print(result.data)
---------------------------------------------------------------------------
ValidationError                           Traceback (most recent call last)
<ipython-input-21-86c58ba5868d> in <module>
      1 input_data = {'username': 'minhhahao', 'email': 'abc'}
----> 2 result = CustomerSchema().load(input_data)
      3 print(result.data)

~/.pyenv/versions/3.6.5/envs/uiza-env3/lib/python3.6/site-packages/marshmallow/schema.py in load(self, data, many, partial)
    595         .. versionadded:: 1.0.0
    596         """
--> 597         result, errors = self._do_load(data, many, partial=partial, postprocess=True)
    598         return UnmarshalResult(data=result, errors=errors)
    599

~/.pyenv/versions/3.6.5/envs/uiza-env3/lib/python3.6/site-packages/marshmallow/schema.py in _do_load(self, data, many, partial, postprocess)
    718             self.handle_error(exc, data)
    719             if self.strict:
--> 720                 raise exc
    721
    722         return result, errors

ValidationError: {'email': ['Not a valid email address.']}

```

Để handle exception này, ta sẽ làm như sau:

```py
In [25]: from marshmallow import ValidationError
    ...:  
    ...: try:
    ...:     input_data = {'username': 'minhhahao', 'email': 'abc'}
    ...:     result = CustomerSchema().load(input_data)
    ...:     print(result.data)
    ...: except ValidationError as e:
    ...:     print(e.messages)
    ...:
{'email': ['Not a valid email address.']}

```

Tiếp theo, trong Object Customer, ta mong muốn username là required. Trong Schema ta cần chỉnh lại như sau:

```py
from marshmallow import Schema, fields

class CustomerSchema(Schema):
    username = fields.Str(required=True)
    email = fields.Email()
    created = fields.DateTime()

    class Meta:
        strict=True
```

Kiểm tra lại nào:

```py
In [27]: from marshmallow import ValidationError
    ...:  
    ...: try:
    ...:     input_data = {'email': 'abc@gmail.com'}
    ...:     result = CustomerSchema().load(input_data)
    ...:     print(result.data)
    ...: except ValidationError as e:
    ...:     print(e.messages)
{'username': ['Missing data for required field.']}
```

Look good :v.

Kế tiếp, username ta mong muốn độ dài lớn hơn 8 ký tự và nhỏ hơn 16 ký tự. 

```py
from marshmallow import Schema, fields

class CustomerSchema(Schema):
    username = fields.Str(required=True, validate=lambda x: 8 < len(x) < 16 )
    email = fields.Email()
    created = fields.DateTime()

    class Meta:
        strict=True
```

Kế quả sẽ là:

```sh
In [30]: from marshmallow import ValidationError
    ...:  
    ...: try:
    ...:     input_data = {'username': 'minh', 'email': 'abc@abc.com'}
    ...:     result = CustomerSchema().load(input_data)
    ...:     print(result.data)
    ...: except ValidationError as e:
    ...:     print(e.messages)
{'username': ['Invalid value.']}
```

Vậy, nếu bài toán của mình input data thừa ra các field thì sao. Mặc định, marshmallow sẽ remove những field đó ra. Tuy nhiên, ta có thể handle nó.

Tuy nhiên bạn phải upgrade version của marshmallow lên bản 3.0: https://marshmallow.readthedocs.io/en/3.0/upgrading.html

```py
from marshmallow import Schema, fields, RAISE, INCLUDE, EXCLUDE

class CustomerSchema(Schema):
    username = fields.Str(required=True, validate=lambda x: 8 < len(x) < 16 )
    email = fields.Email()
    created = fields.DateTime()

    class Meta:
        strict=True
        unknown = RAISE
```

Trong đó:

- INCLUDE: cho phép include các unkown field trong input vào valid data.
- EXCLUDE: loại bỏ unkown field trong input ra khỏi valid data.
- RAISE: raise a  ValidationError nếu có bất kỳ một unkown field nào trong input data

### Deserialize

Để deserialize to object, ta sẽ cần sử dụng decorator: `post_load`.

Example:

```py
from marshmallow import Schema, fields, post_load

class CustomerSchema(Schema):
    username = fields.Str()
    email = fields.Email()
    created = fields.DateTime()

    class Meta:
        strict=True

    @post_load
    def make_customer(self, data):
        return Customer(**data)
```

Sau khi define lại Schema, method `load` sẽ return một customer object thay vì một dict như trên:

```sh
In [46]: from marshmallow import ValidationError
    ...:  
    ...: try:
    ...:     input_data = {'username': 'minhhahao', 'email': 'abc@abc.com'}
    ...:     result = CustomerSchema().load(input_data)
    ...:     print(result.data.username)
    ...:     print(result.data.email)
    ...: except ValidationError as e:
    ...:     print(e.messages)
    ...:
minhhahao
abc@abc.com
```

### Serialize

Ta sẽ serialize objects bằng các sử dụng `dump` hoặc `dumps` method. Serialize objects to a JSON-encoded string sẽ phải dùng `dumps`.

Example:

```sh

from marshmallow import pprint

customer = Customer(username='minhhahao', email='abc@abc.com')
schema = CustomerSchema()
result = schema.dump(customer)
pprint(result)
```

Ta sẽ được:

```sh
In [48]: from marshmallow import pprint
    ...:  
    ...: customer = Customer(username='minhhahao', email='abc@abc.com')
    ...: schema = CustomerSchema()
    ...: result = schema.dump(customer)
    ...: pprint(result)
MarshalResult(data={'email': 'abc@abc.com', 'username': 'minhhahao', 'created': '2019-03-19T10:57:51.366516+00:00'}, errors={})
```

Thanks for reading!