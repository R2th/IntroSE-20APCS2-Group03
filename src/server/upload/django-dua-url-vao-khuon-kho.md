![](https://images.viblo.asia/22879595-1ee1-466e-bf65-9f25b7c6199d.png)


"Khuôn khổ" mình muốn nói ở đây là những chuẩn mẫu mà chúng ta sẽ đặt ra cho URL. Thông thường chúng ta ít khi phải validate cho URL để làm gì cả, URL của một trang web được thiết kế làm sao để tạo ra thiện cảm đối với người dùng, chứ ít ai lôi nguyên cả đống kí tự loằng ngoằng mà đọc ko hiểu gì như `key, code,...` đúng không nào? Đơn giản như trang web mà một newbie như mình hay truy cập nhất đó là [W3School](https://www.w3schools.com/python/python_getstarted.asp) =)) Nhưng đó chỉ là về mặt người dùng, còn về mặt dev thì sao, sẽ có lúc chúng ta gặp phải những trường hợp cần validate như vậy. 

Nên mình muốn chia sẻ với các bạn về việc validate một URL sẽ như thế nào. Let's go. 
# 1.  path()
Đây là cách thông dụng nhất chúng ta hay sử dụng để validate cho một variable có trong url như `id`, chúng ta dùng syntax **`<data_type:variable>`**:
```python
# urls.py
from django.urls import path
from .views import RetrieveUserView


urlpatterns = [
    path('users/<int:id>', RetrieveUserView.as_view(), name='users')
]
```
Với `variable` chúng ta khai báo ở đây là `id` thì trong view chúng ta có thể sử dụng nó thông qua `kwargs`: 
```python
# views.py
from rest_framework.views import APIView


class RetrieveUserView(APIView):
    def get(self, request, *args, **kwargs):
        id = kwargs.get('id')
        pass
```
Như vậy chúng ta đã có thể lấy ra được `id` từ **Url.**

Rất đơn giản phải không nào? Nhưng với cách làm này, ta chỉ có thể validate kiểu dữ liệu cho nó mà thôi. Giờ hãy qua một cách khởi tạo **"nâng cao"** hơn một chút nha.
# 2. re_path()
Nó khác với `path()` đã nói ở phần trên ở chỗ nào? Thêm mỗi chữ **re** thôi à? Vậy mà cũng gọi là nâng cao ư?
Nếu chỉ thêm mỗi chữ **re** thôi thì dại gì chúng ta sử dụng cho tốn 3 lần bấm phím đúng không nào?

**re** ở đây có nghĩa là Regular Expressions (RegEx). Chúng ta hẳn là không còn quá xa lạ với khái niệm RegEx đúng không nào? RegEx là các pattern được quy định sẵn thay vì các chuỗi cụ thể được sử dụng để **Find/Replace**. Ví dụ: Khi chúng ta kiểm tra tính hợp lệ của một email, thì chúng ta sẽ sử dụng RegEx. Còn sử dụng như thế nào thì chúng ta tìm hiểu ở dưới đây nha =)) 

Không nằm ngoài mục đích sử dụng, chúng ta dùng RegEx để xác định các URL patterns. Để dùng được RegEx thì chúng ta sử dụng `re_path()` thay vì `path()`. Giả sử, chúng ta có một URL `example.com/code` với code bắt buộc phải có 9 ký tự:
```python
# urls.py
from django.urls import re_path


urlpatterns = [
    re_path(r'^(?P<code>[A-Za-z0-9]{9})/$', View.as_view(), name='view')
]
```
Như vậy, chúng ta đã hoàn thành được việc quy định cho `code` bắt buộc phải gồm 9 ký tự.

Tiếp tục, chúng ta sẽ đến với một URL có độ phức tạo cao hơn "một chút": `example.com/code/status/` với:
- `code`: bao gồm 9 kí tự
- `status`: là 1 trong 3 status: new, doing, done.


Vậy url của chúng ta sẽ trông như thế nào nhỉ?
```python
# urls.py
from django.urls import re_path


urlpatterns = [
    re_path(r'^(?P<code>[A-Za-z0-9]{9})/(?P<status>new|doing|done)/$', View.as_view(), name='view')
]
```
Khá là dài đúng không nào, nhưng đó chỉ mới có 2 tham số thôi đó :D. Vậy thì có giải pháp nào tốt hơn không? Câu trả lời là có. Chúng ta cùng đến với giải pháp ở dưới đây nha.
# 3. Custom path converters
Dựa vào syntax của **path()** để chúng ta tạo ra những quy định riêng cho từng variable:
```python
# converters.py
class RegexConverter:
    def to_python(self, value):
        return value

    def to_url(self, value):
        return value

class CodeConverter(RegexConverter):
    regex = f'[A-Za-z0-9]'
    
class StatusConverter(RegexConverter):
    regex = 'new|doing|done'
```
Khi đã tạo ra các converters như trên, chúng ta đã có thể sử dụng trong url bằng cách đăng ký các converter. Khi đó các converter đã được đăng ký sẽ coi như là một `data_type`:
```python
# urls.py
from django.urls import path, register_converter
from .converters import CodeConverter, StatusConverter

register_converter(CodeConverter, 'code_type')
register_converter(StatusConverter, 'status_type')

urlpatterns = [
    path('<code_type:code>/<status_type:status>', View.as_view(), name='view')
]
```
Trông ngắn và dễ hiểu hơn nhiều đúng không nào.

### Lời cảm ơn
Và cuối cùng, vẫn như thường lệ. Cảm ơn các bạn đã đọc đến đây. Nếu bài viết này **hữu ích**, hay cho mình **1 upvote**. Nếu các bạn cảm thấy bài viết này **chưa ổn**, cần phải thay đổi ở chỗ nào, hãy cho mình **1 comment** để chúng ta cùng nhau tiến bộ nha. 

Hẹn gặp lại các bạn trong những bài viết tới.
![](https://images.viblo.asia/b75eb72e-853a-4b4e-9273-9a0fabfb22de.jpg)