Khi chúng ta sử dụng sessions, dữ liệu không được lưu trữ trực tiếp trên trình duyệt. Thay vào đó chúng được lưu trữ tại server. Django tạo ra chuỗi ngẫu nhiên dài 32 ký tự được gọi là khóa session và liên kết nó với dữ liệu session. Server sau đó gửi một cookie tên là sessionid, chứa khóa session, với giá trị cho trình duyệt.
Trong các yêu cầu tiếp theo, trình duyệt sẽ gửi cookie phiên tới máy chủ. Django sau đó sử dụng cookie này để truy xuất dữ liệu session  và làm cho nó có thể truy cập được trong code của bạn.

# 1. Config session
Để setup sử dụng session trong Django, chúng ta cần thêm ở trong file settings.py
* ‘django.contrib.sessions.middleware.SessionMiddleware'to MIDDLEWARE
* 'django.contrib.sessions' to INSTALLED_APPS. Chạy python manage.py migrate để khởi tạo các bảng. Sẽ sinh ra bảng django_session gồm 3 cột: session_key, session_data, and expire_date .

Những setting này sẽ được thêm tự động khi tạo project mới
# 2. Kiểm tra khả năng lực cookie của trình duyệt
Chúng ta biết người dùng có thể tùy chỉnh trình duyệt của họ để không cho phép bất kì cookie nào. Django cùng cấp một vài phương thức thuận tiện để kiểm tra cookies có phục vụ trình duyệt không. Object request.sessions cung cấp theo dõi 3 phương thức để kiểm tra cookie support trình duyệt.
* set_test_cookie( ): Đặt cookie kiểm tra để xác định xem trình duyệt của người dùng có hỗ trợ cookie không. Do cách thức hoạt động của cookie, bạn đã có thể kiểm tra điều này cho đến khi người dùng yêu cầu trang tiếp theo.
* test_cookie_worked( ): Trả về True hoặc False, phụ thuộc vào việc trình duyệt của người dùng có cho phép test cookie không. Do cách hoạt động của cookie, bạn sẽ phải gọi set_test_cookie( ) ở yêu cầu trang riêng trước đó.
* delete_test_cookie( ): Xóa test cookie.
```python
def e_commerce_home(request):
    if request.session.test_cookie_worked():
        request.session.delete_test_cookie()
    else:
        request.session.set_test_cookie()
        messages.error(request, 'Please enable cookie')
    return render(request, 'home/home.html')
```

Khi trình duyệt được sử dụng, nó sẽ kiểm tra cookie có được cho phép không. Nếu không nó sẽ gửi 1 test cookie và show message lỗi để cho phép.
# 3. Đọc và viết session data
Một request Django có một thuộc tính session hoạt động như 1 dictionary 
* set session data
```
request.session[‘user_id’] = ‘20’
request.session[‘team’] = ‘Barcelona’
```
* read session data
```
request.session.get(‘user_id’) # returns ‘20’
request.session.get(‘team’) # returns ‘Barcelona’
```
* delete session data
```
del request.session[‘user_id’]
del request.session[‘team’]
```
# 4. Vai trò SessionMiddleware
Hãy cùng kiểm tra code ‘django.contrib.sessions.middleware.SessionMiddleware' để hiểu 
```
import time
from importlib import import_module

from django.conf import settings
from django.contrib.sessions.backends.base import UpdateError
from django.core.exceptions import SuspiciousOperation
from django.utils.cache import patch_vary_headers
from django.utils.deprecation import MiddlewareMixin
from django.utils.http import http_date


class SessionMiddleware(MiddlewareMixin):
    def __init__(self, get_response=None):
        self.get_response = get_response
        engine = import_module(settings.SESSION_ENGINE)
        self.SessionStore = engine.SessionStore

    def process_request(self, request):
        session_key = request.COOKIES.get(settings.SESSION_COOKIE_NAME)
        request.session = self.SessionStore(session_key)

    def process_response(self, request, response):
        """
        If request.session was modified, or if the configuration is to save the
        session every time, save the changes and set a session cookie or delete
        the session cookie if the session has been emptied.
        """
        try:
            accessed = request.session.accessed
            modified = request.session.modified
            empty = request.session.is_empty()
        except AttributeError:
            pass
        else:
            # First check if we need to delete this cookie.
            # The session should be deleted only if the session is entirely empty
            if settings.SESSION_COOKIE_NAME in request.COOKIES and empty:
                response.delete_cookie(
                    settings.SESSION_COOKIE_NAME,
                    path=settings.SESSION_COOKIE_PATH,
                    domain=settings.SESSION_COOKIE_DOMAIN,
                )
                patch_vary_headers(response, ('Cookie',))
            else:
                if accessed:
                    patch_vary_headers(response, ('Cookie',))
                if (modified or settings.SESSION_SAVE_EVERY_REQUEST) and not empty:
                    if request.session.get_expire_at_browser_close():
                        max_age = None
                        expires = None
                    else:
                        max_age = request.session.get_expiry_age()
                        expires_time = time.time() + max_age
                        expires = http_date(expires_time)
                    # Save the session data and refresh the client cookie.
                    # Skip session save for 500 responses, refs #3881.
                    if response.status_code != 500:
                        try:
                            request.session.save()
                        except UpdateError:
                            raise SuspiciousOperation(
                                "The request's session was deleted before the "
                                "request completed. The user may have logged "
                                "out in a concurrent request, for example."
                            )
                        response.set_cookie(
                            settings.SESSION_COOKIE_NAME,
                            request.session.session_key, max_age=max_age,
                            expires=expires, domain=settings.SESSION_COOKIE_DOMAIN,
                            path=settings.SESSION_COOKIE_PATH,
                            secure=settings.SESSION_COOKIE_SECURE or None,
                            httponly=settings.SESSION_COOKIE_HTTPONLY or None,
                            samesite=settings.SESSION_COOKIE_SAMESITE,
                        )
        return response
```
* Middewares được gọi trước và sau views gọi, process_request(self, request) được sử dụng trước và process_response(self, request, response) được sử dụng sau khi view gọi
* process_request: kiểm tra nếu có cookie nào có tên sessionid(mặc định giá trị của settings.SESSION_COOKIE_NAME) trong request.COOKIES. Nếu tìm thấy, nó sẽ cố session sử dụng cột session_key trong session database
*  process_response kiểm tra bất khi nào request.session được chỉnh sửa hoặc được tạo mới. Sau đó nó sẽ tạo mới hoặc lưu session data vào session database và thêm 1 sessionid cookie để trả ra với session_key và value.Nếu nó tìm thấy request.COOKIES không rỗng và tất cả session data đã bị xóa, sau khi xóa session  khỏi database và xóa session cookie khỏi response, cookie ở trình duyệt cũng bị xóa

```
def save_session_data(request):
    # set new data
    request.session['user_id'] = 20
    request.session['team'] = 'Barcelona'
    return HttpResponse("Session Data Saved")
def access_session_data(request):
    response = ""
    if request.session.get('user_id'):
        user_id = request.session.get('user_id')
        response += "User Id : {0} <br>".format(user_id)
    if request.session.get('team'):
        team = request.session.get('team')
        response += "Team : {0} <br>".format(team)

    if not response:
        return HttpResponse("No session data")
    else:
        return HttpResponse(response)
def delete_session_data(request):
    try:
        del request.session['user_id']
        del request.session['team']
    except KeyError:
        pass

    return HttpResponse("Session Data cleared")
```
Với hàm save_session_data() khi được gọi
* 'django.contrib.sessions.middleware.SessionMiddleware' middleware tạo một key session bất kì và liên kết với session data
* 'django.contrib.sessions.middleware.SessionMiddleware' sử dụng the 'django.contrib.sessions' để lưu trữ session ở database
* 1 cookie với tên sessionid với 1 giá trị bất kì được tạo từ bước 1 được gửi tới trình duyệt
* Từ đó trở đi, trình duyệt sẽ gửi sessionid với mỗi request đến server, cho phép Python code truy cập vào dữ liệu session data trong views sử dụng request.session

Khi access_session_data được gọi sau save_session_data, sessionid cookie có sẵn trong request.COOKIES, process_request của middleware sử dụng sessionid để lưu trữ session trong request

Ở delete_session_data, chúng ta sẽ xóa session_data, middleware xác điịnh sẽ không có session nào , nó đã xóa trong response trả về và cookie trong trình duyệt

# 5. Khi nào sessions được lưu
Mặc định, Django chỉ lưu session vào database khi session được chỉnh sửa, nếu bất kì giá trị nào được gán hoặc xóa
```
# Session is modified.
request.session['foo'] = 'bar'

# Session is modified.
del request.session['foo']

# Session is modified.
request.session['foo'] = {}
```
Một điểm quan trọng khác đáng được đề cập ở đây là Django chỉ gửi cookie session tới trình duyệt khi dữ liệu phiên được sửa đổi. Trong quá trình này, nó cũng cập nhật thời gian hết hạn của cookie.
* session_key: lưu trữ session id duy nhất bất kì
* session_data; Django lưu session data được mã hóa, để lấy dữ liệu sử dụng get_decode()
* expire_date: thời hạn của session cookie

Nguồn: https://medium.com/better-programming/managing-sessions-in-django-92ef72db4c63?