![](https://images.viblo.asia/e8e57053-ab35-4d11-9874-abd6e520b7de.png)

Bài viết này mình sẽ hướng dẫn cách cơ bản nhất để có thể đăng nhập Google Oauth2 trong ứng dụng web Flask bằng gói request-oauthlib cho OAuth 2.0 và jar-sqlalchemy .

Để bắt đầu, trước tiên chúng ta phải tạo một dự án trong Google Developers của Google để lấy được client key và client secret của người dùng.

### **1. Tạo Google project**

Đầu tiên, hãy truy cập Google Developers Console . Đăng nhập bằng thông tin đăng nhập Google của bạn nếu bạn chưa có có thể đăng ký. Sẽ có một danh sách các dự án (nếu trước đây bạn đã tạo với bất ký dự án nào của mình).

Tạo 1 dự án mới.

Bạn điền đầy đủ tên mà bạn muốn đặt.
![](https://images.viblo.asia/47afb8d3-ce26-4193-86e8-35802996685f.png)
Bây giờ đi đến trang dự án. Nhấp vào API và Auth -> Thông tin xác thực trong thanh bên trái. 

Sau đó, đi đến màn hình đồng ý OAuth. Cung cấp Tên sản phẩm (bạn cũng có thể cung cấp các chi tiết khác nhưng chúng là tùy chọn). Tên sản phẩm là những gì người dùng nhìn thấy khi họ đăng nhập vào ứng dụng của bạn bằng Google.

![](https://images.viblo.asia/f2d0ecd4-0ff1-4bff-a8b5-b319538c2ff8.png)

Bây giờ bấm vào phần Thông tin xác thực . Sau đó bấm vào Thêm thông tin xác thực và sau đó chọn ID khách hàng OAuth 2.0.

![](https://images.viblo.asia/a4f742ba-5d0b-4810-91d4-04be0aaa97ff.png)

Chọn Loại ứng dụng  Web Application, Cung cấp tên, nguồn gốc Javascript được ủy quyền và URI chuyển hướng được ủy quyền và nhấp vào Tạo. Trong quá trình phát triển, chúng ta sẽ sử dụng localhost làm URL của chúng ta.
![](https://images.viblo.asia/d7b4fd8a-01ee-4474-9106-eb5e3532dd37.png)

Sau bước trên, bạn sẽ thấy một hộp thoại có client ID và client secret. Sao chép cả hai chuỗi và lưu trong một tệp văn bản vì chúng ta sẽ cần những chuỗi này.
![](https://images.viblo.asia/fc8b2e91-db6a-4cca-9259-060079f57616.png)

### **2. Tạo bảng User trong Database**
Chúng ta sẽ sử dụng `flask-sqlalchemy` để xử lý các hoạt động DB.

```python
class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=True)
    avatar = db.Column(db.String(200))
    active = db.Column(db.Boolean, default=False)
    tokens = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow())
```

### **3. Tạo config cho ứng dụng.**
Nếu sử dụng `flask-login` để quản lý phiên người dùng, chúng ta có thể kiểm tra xem người dùng có đăng nhập hay không. Nếu không đăng nhập, chúng ta chuyển hướng người dùng đến trang đăng nhập có chứa liên kết đến thông tin đăng nhập Google. Tạo 1 file `config.py` để cấu hình các thông số liên quan của Google OAuth.
```python
import os
basedir = os.path.abspath(os.path.dirname(__file__))
class Auth:
    CLIENT_ID = ('688061596571-3c13n0uho6qe34hjqj2apincmqk86ddj' '.apps.googleusercontent.com')
    CLIENT_SECRET = 'JXf7Ic_jfCam1S7lBJalDyPZ'
    REDIRECT_URI = 'https://localhost:5000/gCallback'
    AUTH_URI = 'https://accounts.google.com/o/oauth2/auth'
    TOKEN_URI = 'https://accounts.google.com/o/oauth2/token'
    USER_INFO = 'https://www.googleapis.com/userinfo/v2/me'
class Config:
    APP_NAME = "Test Google Login"
    SECRET_KEY = os.environ.get("SECRET_KEY") or "somethingsecret" 
class DevConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, "test.db")
class ProdConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, "prod.db")
config = {
"dev": DevConfig,
"prod": ProdConfig,
"default": DevConfig
}
```
* REDIRECT_URI là những gì chúng ta Google Developers Console dành cho nhà phát triển của Google

*  AUTH_URI là nơi người dùng được đưa đến để đăng nhập Google

* TOKEN_URI được sử dụng để trao đổi mã thông báo tạm thời cho access_token

* USER_INFO là URL được sử dụng để truy xuất thông tin người dùng như tên , email , v.v ... sau khi xác thực thành công.

* SCOPE là loại thông tin người dùng mà chúng ta sẽ truy cập sau khi người dùng xác thực ứng dụng. Google OAuth2 Playground có một danh sách các phạm vi có thể được thêm vào.

**URL routes for login and callback**

```python
app = Flask(__name__)
app.config.from_object(config['dev'])
db = SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.login_view = "login"
login_manager.session_protection = "strong"
```

**requests_oauthlib.OAuth2Session helper**
```python
def get_google_auth(state=None, token=None):
    if token:
        return OAuth2Session(Auth.CLIENT_ID, token=token)
    if state:
        return OAuth2Session( Auth.CLIENT_ID, state=state, redirect_uri=Auth.REDIRECT_URI)
    oauth = OAuth2Session( Auth.CLIENT_ID, redirect_uri=Auth.REDIRECT_URI, scope=Auth.SCOPE)
    return oauth
```

**Root URL:**

```python
@app.route('/')
@login_required
def index():
    return render_template('index.html')
```

**Callback URL:**
```python
@app.route('/gCallback')
def callback():
    # Redirect user to home page if already logged in.
    if current_user is not None and current_user.is_authenticated():
        return redirect(url_for('index'))
    if 'error' in request.args:
        if request.args.get('error') == 'access_denied':
            return 'You denied access.'
        return 'Error encountered.'
    if 'code' not in request.args and 'state' not in request.args:
        return redirect(url_for('login'))
    else:
        # Execution reaches here when user has successfully authenticated our app.
        google = get_google_auth(state=session['oauth_state'])
        try:
            token = google.fetch_token( Auth.TOKEN_URI, client_secret=Auth.CLIENT_SECRET, authorization_response=request.url)
        except HTTPError:
            return 'HTTPError occurred.'
        google = get_google_auth(token=token)
        resp = google.get(Auth.USER_INFO)
        if resp.status_code == 200:
            user_data = resp.json()
            email = user_data['email']
            user = User.query.filter_by(email=email).first()
            if user is None:
                user = User()
                user.email = email
            user.name = user_data['name']
            user.tokens = json.dumps(token)
            user.avatar = user_data['picture']
            db.session.add(user)
            db.session.commit()
            login_user(user)
            return redirect(url_for('index'))
        return 'Could not fetch your information.'
```

Run serve.py để thử nghiệm.

![](https://images.viblo.asia/ea74b06a-7ef6-4d5e-8b22-4a46a049de45.jpg)
### **Tài liệu tham khảo:**
https://developers.google.com/gmail/api/quickstart/python