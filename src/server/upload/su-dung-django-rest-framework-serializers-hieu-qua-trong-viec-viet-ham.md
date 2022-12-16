# 1. Giới thiệu
Bài viết này sử dụng Django REST Framework, thư viện thường được sử dụng trong việc viết API cho các dự án django nói riêng và python nói chung
* Cách thêm validation cho field
* Cách thêm validation kết hợp cho field
* Khi nào nên ghi đè to_internal_value()
* Khi nào nên ghi đè create()

# 2.  Serializer cơ bản
Cùng ôn lại một số kiến thức cơ bản , Serialization là một quá trình để chuyển đổi một cấu trúc dữ liệu hoặc đối tượng thành một định dạng có thể lưu trữ được (ví dụ như trong một file, bộ nhớ, hoặc vận chuyển thông qua mạng), sau đó nó có thể được phục hồi để trở lại trạng thái ban đầu trong một môi trường khác thông qua quá trình deserialization. Rất nhiều ngôn ngữ lập trình hiện nay hỗ trợ kĩ thuật này bao gồm C#, Java, Objective-C, Perl, Python, Ruby, PHP,… 
Cùng thực hành viết 1 serializer cho việc tạo một User instance
```
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'password')
        extra_kwargs = {
            'password': {'write_only': True}
        }
```
Thử tạo 1 user
```
In [1]: from accounts.serializers import UserSerializer
In [2]: data = {'first_name': 'john', 'last_name': 'doe', 'username': 'john', 'password': 'abc123'}
In [3]: serializer = UserSerializer(data=data)
In [4]: serializer.is_valid()
Out[4]: True
In [5]: serializer.save()
Out[5]: <User: john>
```
# 3. Xác thực field tùy chỉnh
Xác thực trường tùy chỉnh có thể được thực hiện bằng cách cung cấp phương thức validate_ <field_name>.
Hãy xác thực mật khẩu đó phải có ít nhất một ký tự không phải là chữ và số. Chúng ta sẽ cần xác định một phương thức validate_password () để đạt được điều này.
```
class UserSerializer(serializers.ModelSerializer):

    def validate_password(self, value):
        if value.isalnum():
            raise serializers.ValidationError('password must have atleast one special character.')
        return value

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'password')
        extra_kwargs = {
            'password': {'write_only': True}
        }
```
Hãy để xác thực dữ liệu trong đó mật khẩu không có chứa bất kỳ ký tự đặc biệt nào.
```
In [3]: data = {'first_name': 'john', 'last_name': 'doe', 'username': 'john', 'password': 'abc123'}
In [4]: serializer = UserSerializer(data=data)
In [5]: serializer.is_valid()
Out[5]: False
In [6]: serializer.errors
Out[6]: {'password': [ErrorDetail(string='password must have atleast one special character.', code='invalid')]}
```
Hãy để xác thực dữ liệu trong đó mật khẩu chứa một ký tự đặc biệt.
```
In [6]: data = {'first_name': 'john', 'last_name': 'doe', 'username': 'john', 'password': 'abc123#'}
In [7]: serializer = UserSerializer(data=data)
In [8]: serializer.is_valid()
Out[8]: True
```
# 4. Xác thực kết hợp field
Nếu chúng ta muốn thêm một số xác nhận hợp lệ khi chúng ta cần truy cập đồng thời nhiều trường, điểm móc nối tiếp chính xác để thực hiện đó là phương thức validate ().
Hãy xác thực  rằng First_name và last_name khác nhau. Chúng ta sẽ phải ghi đè serializer dòng validate() để đạt được điều này
```
class UserSerializer(serializers.ModelSerializer):

    def validate_password(self, value):
        if value.isalnum():
            raise serializers.ValidationError('password must have atleast one special character.')
        return value

    def validate(self, data):
        if data['first_name'] == data['last_name']:
            raise serializers.ValidationError("first_name and last_name shouldn't be same.")
        return data

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'password')
        extra_kwargs = {
            'password': {'write_only': True}
        }
```
Hãy để xác thực dữ liệu trong đó First_name và last_name giống nhau.
```
In [10]: data = {'first_name': 'john', 'last_name': 'john', 'username': 'john', 'password': 'abc123#'}
In [12]: serializer = UserSerializer(data=data)
In [13]: serializer.is_valid()
Out[13]: False
In [14]: serializer.errors
Out[14]: {'non_field_errors': [ErrorDetail(string="first_name and last_name shouldn't be same.", code='invalid')]}
```
Hãy để xác thực dữ liệu trong đó First_name và last_name khác nhau.
```
In [1]: data = {'first_name': 'john', 'last_name': 'doe', 'username': 'john', 'password': 'abc123#'}
In [3]: serializer = UserSerializer(data=data)
In [4]: serializer.is_valid()
Out[4]: True
```
# 5. Khi nào nên ghi đè to_internal_value()
DRF có một hookpoint gọi là to_iternal_value (). Nó có thể được sử dụng để thực hiện một số xử lý trước khi mã xác thực được thực thi.

Giả sử ứng dụng Frontend hoặc thiết bị di động của bạn gửi thông tin người dùng kèm theo trong một dict khác với người dùng chính. Giả sử dữ liệu đã đăng trông giống như:
```
data = {'user': {'first_name': 'john', 'last_name': 'doe', 'username': 'john', 'password': 'abc123#'}}
```
Hãy cùng cố gắng xác thực dữ liệu này và xem serializer .
```
In [5]: data = {'user': {'first_name': 'john', 'last_name': 'doe', 'username': 'john', 'password': 'abc123#'}}
In [6]: serializer = UserSerializer(data=data)
In [7]: serializer.is_valid()
Out[7]: False
```
Trong trường hợp đó, thông tin người dùng cần được trích xuất khỏi dict trước khi các trường được xác thực. Chúng ta có thể đạt được điều này bằng cách ghi đè lên_iternal_value ().
```
def to_internal_value(self, data):
    user_data = data['user']
    return super().to_internal_value(user_data)
```
Hãy để xác nhận lại cùng một dữ liệu và xem serializer :
```
In [2]: data = {'user': {'first_name': 'john', 'last_name': 'doe', 'username': 'john', 'password': 'abc123#'}}
In [3]: serializer = UserSerializer(data=data)
In [4]: serializer.is_valid()
Out[4]: True
```
Hãy để thảo luận về một kịch bản nữa trong đó to_iternal_value () sẽ là ý tưởng.

DRF mong đợi bất kỳ POST datetime / date  ở định dạng YYYY-MM-DD. Hãy để xác minh rằng chúng ta có thể đăng ở bất kỳ định dạng nào khác và sau đó xem cách chúng ta có thể khắc phục hành vi này để cho phép các định dạng khác.

Người dùng có trường datetime gọi là date_joined. Hãy để thêm trường này vào serializer.
Hãy để sử dụng định dạng MM-DD-YYYY cho date_joined và xác thực dữ liệu.
```
In [9]: data = {'first_name': 'john', 'last_name': 'doe', 'username': 'john', 'password': 'abc123#', 'date_joined': '06/12/2019'}
In [10]: serializer = UserSerializer(data=data)
In [11]: serializer.is_valid()
Out[11]: False
In [12]: serializer.errors
Out[12]: {'date_joined': [ErrorDetail(string='Datetime has wrong format. Use one of these formats instead: YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z].', code='invalid')]}
```
Hãy để ghi đè lên to_iternal_value () và sử dụng dateutil.parser () để phân tích ngày và sau đó gọi super to_iternal_value () để xác thực thêm.
```
 def to_internal_value(self, value):
        value['date_joined'] = parser.parse(value['date_joined'])
        return super().to_internal_value(value)
```
```
In [2]: data = {'first_name': 'john', 'last_name': 'doe', 'username': 'john', 'password': 'abc123#', 'date_joined': '06/12/2019'}
In [3]: serializer = UserSerializer(data=data)
In [4]: serializer.is_valid()
Out[4]: True
In [5]: serializer.validated_data
Out[5]:
OrderedDict([('username', 'john'),
             ('first_name', 'john'),
             ('last_name', 'doe'),
             ('password', 'abc123#'),
             ('date_joined',
              datetime.datetime(2019, 6, 12, 0, 0, tzinfo=<UTC>))])
```
# 6. Khi nào nên ghi đè create()
Serializer có một phương thức gọi là create(). create() được thực thi whenserializer.save () được gọi. Hành vi mặc định của serializer created () là thực thi trình quản lý mô hình mà tạo ra.
create () nên được ghi đè khi chúng ta muốn làm một cái gì đó khác với hành vi mặc định này. Trong khi tạo phiên bản người dùng, chúng tôi muốn gọi User.objects.create_user () thay vì User.objects.create () để mật khẩu được hashed. Đây là một kịch bản lý tưởng để ghi đè create.

Hãy để thử nó trên UserSerializer. Chúng tôi sẽ xác minh rằng không có người dùng trong cơ sở dữ liệu và sau đó gọi serializer.save () để tạo người dùng.
```
In [8]: from django.contrib.auth.models import User
In [9]: User.objects.count()
Out[9]: 1
```

Hãy để xác thực một số dữ liệu và tạo một người dùng.
```
In [10]: data = {'first_name': 'john', 'last_name': 'doe', 'username': 'john', 'password': 'abc123#', 'date_joined': '06/12/2019'}
In [11]: serializer = UserSerializer(data=data)
In [12]: serializer.is_valid()
Out[12]: True
In [13]: serializer.save()
Out[13]: <User: john>
In [14]: User.objects.count()
Out[14]: 2
```
Hãy kiểm tra xem mật khẩu có bị hashed hay không.
```
In [15]: user = User.objects.latest('pk')
In [16]: user.password
Out[16]: 'abc123#'
```
Mật khẩu đã không được hashed vì serializer đã thực hiện hành vi mặc định. Gọi serializer.save () trong nội bộ được gọi là User.objects.create ().
Hãy để khắc phục điều này bằng cách ghi đè create().
```
def create(self, validated_data):
    return User.objects.create_superuser(**validated_data)
```
Thử lại lần nữa
```
In [9]: data = {'first_name': 'john', 'last_name': 'doe', 'email': 'john@doe.com', 'username': 'john', 'password': 'abc123#', 'date_joined': '06/12/2019'}
In [10]: serializer = UserSerializer(data=data)
In [12]: serializer.is_valid()
Out[12]: True
In [13]: serializer.save()
Out[13]: <User: john>
In [14]: user = User.objects.latest('pk')
In [15]: user.password
Out[15]: 'pbkdf2_sha256$100000$08HZhymedEOB$2O+WXqizLBZgXVFVc7iw0r8I2Z0gAu0GulJNUY4Dj2s='   # hashed password
In [17]: user.check_password('abc123#')
Out[17]: True
```
Serializer create() sẽ là điểm chính xác nếu chúng ta muốn chạy trình quản lý, get get_or_create () thay vì trình quản lý create().
Nguồn : https://medium.com/@raaj.akshar/how-to-effectively-use-django-rest-framework-serializers-during-write-operations-dd73b62c26b5