![](https://images.viblo.asia/17a466ba-9626-4e5e-8f07-111b5d0b5959.jpg)
# Lời mở đầu
Ở bài viết [trước](https://viblo.asia/p/xay-dung-api-voi-django-rest-framework-Do754PXJ5M6), chúng ta đã cùng nhau cài đặt các môi trường cần thiết cho một ứng dụng Django Rest và tạo ra các API với những chức năng **CRUD** cơ bản. Trong bài này, mình sẽ cùng với các bạn tìm hiểu xem, làm sao để có thể xác thực người dùng (Đăng nhập) bằng Django Rest nhé.

Trước khi bắt đầu, chúng ta cần nắm được những khái niệm về Authentication (Xác thực người dùng) là gì? Có những cách Authenticate nào cũng như cách hoạt động của chúng. Mình sẽ sử dụng JWT Authentication làm phương thức xác thực cho ứng dụng của mình. Link dưới đây sẽ giúp các bạn tìm hiểu về chúng: 
- Authentication là gì: https://kipalog.com/posts/Authentication-story-part-1--Authentication-la-lam-gi
- Các cách Authenticate: https://kipalog.com/posts/Authentication-story-part-2--Authentication-co-ban
- JWT: https://viblo.asia/p/json-web-token-la-gi-aWj533go56m
# 1. Bài toán
Sau khi tạo ra những API đảm nhiệm chức năng CRUD, mình muốn rằng để truy cập hay sử dụng được những API này, người dùng bắt buộc phải đăng nhập vào hệ thống.
Và để đăng nhập được vào hệ thống, người dùng phảI đăng kí tài khoản cho mình. 
# 2. Triển khai
## 2.1. Register
Hãy thử nhớ lại, thông thường khi chúng ta đăng kí tài khoản tại một ứng dụng hay một hệ thống nào đó, họ sẽ yêu cầu chúng ta phải nhập những thông tin gì. 

Với mục đích để tìm hiểu thì mình sẽ cần những thông tin của người dùng như sau: 
- Email 
- Password
### 2.1.1. Model
Đầu tiên 
```python
from django.contrib.auth.models import AbstractUser

...

class User(AbstractUser):
    # Delete not use field
    username = None
    last_login = None
    is_staff = None
    is_superuser = None

    password = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
```
Ở đây mình sẽ sử dụng `email` để đăng nhập nên không cần sử dụng `username` nữa.
Sau khi tạo hoặc sửa một model, việc tiếp theo chúng ta cần làm đó là chạy `python manage.py makemigrations` đúng không nào?

Nhưng các bạn đừng vội, hãy chú ý rằng chúng model User của chúng ta vừa tạo đang kế thừa từ `AbstractUser`, tức là chúng ta cũng đang kế thừa luôn cả luồng xử lý Authentication của nó. Vậy điều chúng ta cần làm ở đây là gì?

Rất đơn giản, chúng ta chỉ cần vào file `settings.py` và thêm một dòng sau : 
```python
AUTH_USER_MODEL = 'car.User'
```
Mục đích là để hệ thống của chúng ta hiểu rằng, nó đang cần sử dụng model `User` mà chúng ta vừa tạo để thay thế cho model `User` của nó.
### 2.1.2. Serializer 
Mục đích sử dụng **serializer** ở đây để `validate` những thông tin mà chúng ta gửi lên.
```python
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserModel
        fields = ('email', 'password')
        extra_kwargs = {'password': {'write_only': True}}
```
Sử dụng **ModelSerializer** cho phép chúng ta sử dụng lại các định nghĩa của các fields trong **Model** để validate cho những thông tin gửi lên.
### 2.1.3. View
Sau khi nhập vào `username` và `password` thì chúng ta sẽ xử lý chúng như sau:
```python
class UserRegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['password'] = make_password(serializer.validated_data['password'])
            user = serializer.save()
            
            return JsonResponse({
                'message': 'Register successful!'
            }, status=status.HTTP_201_CREATED)

        else:
            return JsonResponse({
                'error_message': 'This email has already exist!',
                'errors_code': 400,
            }, status=status.HTTP_400_BAD_REQUEST)
```
Trước tiên chúng ta sẽ truyền `data` vào trong **serializer** để validate chúng. Nếu pass qua lớp validate đó thì chúng ta tiến hành lưu dữ liệu vào database. Nếu dữ liệu không đúng định dạng (Validate fail) thì sẽ trả về `error_message` cũng như `errors_code`.

### 2.1.4. Urls
Để có thể đăng ký được tài khoản, điều chúng ta cần làm bây giờ là gì ? Đó là tạo ra một đường link để chúng ta nhập thông tin đăng ký đúng không nào ?
```python
from django.urls import path
from car.views import UserRegisterView

...

urlpatterns = [
    path('api/register', UserRegisterView.as_view(), name='register'),
]
```
Như vậy, chúng ta đã hoàn thành được bước đầu tiên, đó là đăng ký. Để test lại API, chúng ta vẫn tiếp tục sử dụng POSTMAN như bài trước đã nói.

## 2.2. Login
Như đã nói ở trên, chúng ta sẽ sử dụng JWT để xác thực người dùng. Và Django Rest có nhiều package để hỗ trợ chúng ta trong việc generate ra token đó. 
Cụ thể là `simplejwt`. Với `simplejwt`, chúng ta đã được xây dựng sẵn tất cả và việc của chúng ta là gọi nó ra để sử dụng. 
### 2.2.1. Urls
```python
from django.urls import path
from rest_framework_simplejwt import views as jwt_views

...

urlpatterns = [
    path('api/login', jwt_views.TokenObtainPairView.as_view(), name='login'),
]
```
Nhìn vào `url` ta có thể thấy `simplejwt` đã cung cấp cho chúng ta `views` đó là `TokenObtainPairView` giúp chúng ta nhập thông tin, nếu thông tin trùng khớp, nó sẽ cho pheps chúng ta đăng nhập đồng thời sinh ra cho chúng ta 2 `tokens` đó là `access_token` và `refresh_token`.
Và kết quả: 
![](https://images.viblo.asia/07b89eaf-6c89-4af2-91a8-81e5c856ff0f.png)

Như chúng ta thấy, sau khi nhập đúng thông tin đăng nhập, nó sẽ sinh ra cho chúng ta 2 loại token.
Bài toán đã được giải quyết thành công đúng không nào. 

**NHƯNG KHÔNG**, vào một ngày đẹp trời, chúng ta nhận được yêu cầu đó là muốn xem thời gian tồn tại của từng loại token đó là bao nhiêu lâu? Lúc đó chúng ta sẽ làm gì? Chọc vào core của nó để sửa hay là tạo ra một function mới kế thừa lại flow của hàm cha?

Đương nhiên là phải viết một function mới rồi. Và điều quan trọng là chúng ta sẽ viết như thế nào?
### 2.2.2. View
Trong `views.py` chúng ta tiếp tục tạo ra một class đó là `UserLoginView` để xử lý hành động đăng nhập.
```python
def post(self, request):
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        user = authenticate(
            request,
            username=serializer.validated_data['email'],
            password=serializer.validated_data['password']
        )
        if user:
            refresh = TokenObtainPairSerializer.get_token(user)
            data = {
                'refresh_token': str(refresh),
                'access_token': str(refresh.access_token)
            }
            return Response(data, status=status.HTTP_200_OK)
            
        return Response({
            'error_message': 'Email or password is incorrect!',
            'error_code': 400
        }, status=status.HTTP_400_BAD_REQUEST)
        
    return Response({
        'error_messages': serializer.errors,
        'error_code': 400
    }, status=status.HTTP_400_BAD_REQUEST)
```
Như vậy, chúng ta đã hoàn thành bước đầu tiên đó là: Kiểm tra thông tin đăng nhập, trả về token như lúc nãy. Nhưng mục đích của chúng ta viết ra một **function login** mới để trả về thêm những thông tin liên quan như thời gian hết hạn của `access_token` và `refresh_token`.
### 2.2.3. Setting
Vậy thì chúng ta sẽ vào trong`settings.py` để cài đặt cho nó. Ở đây, chúng ta sẽ thêm đoạn code sau:
```python
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': True,

    'ALGORITHM': 'HS256',
    'SIGNING_KEY': settings.SECRET_KEY,
    'VERIFYING_KEY': None,

    'AUTH_HEADER_TYPES': ('Bearer',),
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',

    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',

    'JTI_CLAIM': 'jti',

    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
}
```
Để điều chỉnh thời gian tồn tại của `access_token` và `refresh_token`, chúng ta chỉ việc sửa lại 2 dòng đó là `ACCESS_TOKEN_LIFETIME` và `REFRESH_TOKEN_LIFETIME`. Ở đây mình lấy ví dụ đó là thời gian tồn tại của `access_token` là 60 phút và `refresh_token` là 1 ngày.


Quay trở lại **views.py**, chúng ta sẽ có một function `login` hoàn chỉnh như sau:
```python
def post(self, request):
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        user = authenticate(
            request,
            username=serializer.validated_data['email'],
            password=serializer.validated_data['password']
        )
        if user:
            refresh = TokenObtainPairSerializer.get_token(user)
            data = {
                'refresh_token': str(refresh),
                'access_token': str(refresh.access_token),
                'access_expires': int(settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds()),
                'refresh_expires': int(settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'].total_seconds())
            }
            return Response(data, status=status.HTTP_200_OK)
            
        return Response({
            'error_message': 'Email or password is incorrect!',
            'error_code': 400
        }, status=status.HTTP_400_BAD_REQUEST)
        
    return Response({
        'error_messages': serializer.errors,
        'error_code': 400
    }, status=status.HTTP_400_BAD_REQUEST)
```
Xong xuôi, đừng quên cập nhật lại file `urls.py` nhé.
```python
from django.urls import path
from car.views import UserLoginView, UserRegisterView

urlpatterns = [
    path('api/register', UserRegisterView.as_view(), name='register'),
    path('api/login', UserLoginView.as_view(), name='login'),
]
```
### Kết quả
![](https://images.viblo.asia/1a18a9de-eca1-4de7-adbf-72b05aec559b.png)
Vậy là chúng ta đã hoàn thành được chức năng đăng nhập bằng chính tay chúng ta viết rồi. (Kế thừa lại các thuộc tính của thằng cha) =))


Nếu có câu hỏi, hay muốn mình viết bài tìm hiểu về chủ đề gì hãy comment ở phía dưới. Mình sẽ cố gắng tìm hiểu và truyền tải đến mọi người một cách dễ hiểu nhất. <br>



**Lời cuối cùng, cảm ơn các bạn đã quan tâm đến bài viết này, chúc các bạn thành công!** <br>

**Thanks and best regards!**

**Related  Links:** https://simpleisbetterthancomplex.com/tutorial/2018/12/19/how-to-use-jwt-authentication-with-django-rest-framework.html

**Source code:** https://github.com/nguyenhuuhai98/django-rest-framework