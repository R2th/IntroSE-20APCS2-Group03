# Lời nói đầu.
Hello anh em , mình đã quay trở lại và ăn hại hơn xưa :D . Ngày hôm nay mình tiếp tục quay trở lại với python rồi đây . Nếu ae ai muốn vọc lại các bài trước của mình thì có thể vào bằng các đường dẫn bên dưới nhé :D
- [Getting started Python - P1](https://viblo.asia/p/getting-started-python-V3m5WBWWlO7)
-  [Getting started Python - P2](https://viblo.asia/p/getting-started-python-p2-3Q75wkz25Wb)
-  [Getting started Python - P3](https://viblo.asia/p/getting-started-python-p3-maGK7mOAlj2)
-  [Getting started Python - Handle File](https://viblo.asia/p/getting-started-python-handle-file-1VgZvo2rlAw)
- [Python vs MySQL](https://viblo.asia/p/python-vs-mysql-RQqKLEn4Z7z)
-  [Python And MongoDB](https://viblo.asia/p/python-and-mongodb-oOVlYBna58W)

Ok, để tiếp nối công cuộc học tập và nghiên cứu Python ngày hôm nay chúng ta sẽ nghiên cứu về 1 framework của nó. Đó là `Django` một framework thông dụng và cơ bản cho người mới bắt đầu như mình. Let Start !!

# Nội dung.
## I : How to get Django
`Django` là một mã nguồn mở có sẵn vì vậy bạn hoàn toàn có thể lấy nó về và custom theo những gì bạn muốn . Hiện tại mình sử dụng `python3` nên trong bài viết này mình sẽ focus theo cấu trúc của python3 nhé.
Có 2 phương pháp để install `Django` :

### 1: Xử dụng `pip3`
Nhắc đến `python` thì hiên nhiên chúng ta cần sử dụng `pip` rồi (Vì mình dùng  `python3`  nên sẽ dung `pip3` nhé). 
```
pip3 install Django
```
Còn nếu bạn muốn fix version thì có thể làm như sau :
```
pip3 install Django==2.2.1
```
> Note : Vì cái này dùng `pip3` nên để sử dụng được cách này thì bạn nhơ install `pip3`  nhé.

### 2 : Sử dụng `git`
Version mới nhất của `django` được public trên github. Chúng ta hoàn toàn có thể pull code về để sử dụng nó. Tuy nhiên, việc sự dụng cách này chỉ dành cho các developer nhiều kinh nghiệm muốn đóng góp thêm các feature hay fix các bug tộn tại trong bạn release hiện tại (kiểu thành contributor đấy). Để pull được code về chỉ cần gõ command sau :
```
git clone https://github.com/django/django.git
```
> Hãy nhớ là cần phải install `git` trước nhé.


## II : First Project.
Vì đây là lần đầu tiên mình sử dụng `Django` vậy nên mình sẽ sử dụng một số package có sãn được framework cung cấp. Nói 1 cách cụ thể hơn thì chũng ta sẽ cần tự sinh ra các đoạn code có sẵn như là : các setting cảu Django, file database config , các option đặc biệt cũng như các setting đặc biệt của `Django`.
Chúng ta sẽ dùng command line để di chuyển đến thư mục bạn sẽ chứa code và chạy câu lện sau :
```
django-admin startproject mysite
```
Điều này có nghĩa là bạn đã khởi tạo thư mục `mysite` trong cây thư mục và code cảu bạn sẽ nằm ở trong đó . Nêu code bị lỗi thì có thể vào [đây](https://docs.djangoproject.com/en/2.2/faq/troubleshooting/#troubleshooting-django-admin) để tìm hiểu cách giải quyết.
> **Note** 
> 
> Khi khởi tạo một project bạn cần chú ý tránh việc đặt tên để sao cho không bị trùng tên với các app hay component của `Django`. Và cụ thể ở đây là tên `django` (conflict với chính bản thân nó) hoặc `test` (conflict với packeage của Python)


>**Nên để code ở đâu ?** 
>
> Thực ra nếu bạn giống như mình , đi lên từ `php` (và không sử dụng các framwork hiện đại ) rất có thể bạn sẽ đẩy code vào thư mục gốc của Web Server (thường thì là thư mục `/var/www`) . Với `django` , bạn không cần làm vậy. Thực ra thì đó không phải phương án tốt để lưu project tại đây, bởi vì nó khá là rủi ro và có khả năng 1 user khác có thể đăng nhập vào máy bạn và view toàn bộ project. Như vậy thực sự không an toàn.
> 
> Bạn có thể phân quyền để các user other ko có quyền view hoặc chuyển sang các thư mục cá nhân , như vậy là ok nhất.

ok, giờ thì hãy xem `mysite` của chúng ta có những gì nào :
```
mysite/
    manage.py
    mysite/
        __init__.py
        settings.py
        urls.py
        wsgi.py
```

* Thư mục `mysite`  : Thư mục gốc chỉ chứa project của bạn. Chú ý rằng tên của nó ko quan trọng với Django . Bạn có thể đổi tên thành bất kì điều gì mà bạn thích.
* `manage.py` : Một câu lệnh tiện ích giúp bạn tương tác được với Django project theo các con đường khác nhau . Bạn có thể đọc cụ thể về  `manage.py` tại [đây](https://docs.djangoproject.com/en/2.2/ref/django-admin/)
*  Thư mục con `mysite/` thực chất là package python của prject của bạn. Tên của nó chính là package name mà bạn sẽ cần impoer (nếu sử dụng) bên trong đó (Ví dụ : `mysite.urls`)
*  `mysite/__init__.py` : Một file rỗng có chứ năng thông báo với Python rằng thư mục này có thể xem xét là một package của Python. Nếu bạn giống như mình là 1 beginner về python thì nên đọc thêm về package của Python tại [đây](https://docs.python.org/3/tutorial/modules.html#tut-packages) 
*  `mysite/settings.py` : File chưa các cài đặt và cấu hình của Django project. 
*  `mysite/urls.py` :  File này sẽ định nghĩa các url hoạt động bên trong Django project. Nếu bạn cần nghiên cứu thêm về nó, vùi lòng vào đọc tại [đây](https://docs.djangoproject.com/en/2.2/topics/http/urls/)
*  `mysite/wsgi.py` :  File này thì mình chưa thật sự hiểu lắm .... có gì để mình nghiên cứu thêm và giải thích sau nhé .


## III : Run Server.
Để run server , bước đầu tiên bạn cần chắc chắn rằng Django đã hoạt động. Tới thư mục gôc `mysite` và chạy lệnh sau :

```
python manage.py runserver
```
Bạn sẽ nhìn thấy output như sau :

```
Performing system checks...

System check identified no issues (0 silenced).

You have unapplied migrations; your app may not work properly until they are applied.
Run 'python manage.py migrate' to apply them.

May 20, 2019 - 15:50:53
Django version 2.2, using settings 'mysite.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

Bạn vừa mới khởi động một server develop của Django , một Website nhẹ nhagng và được viết thuần túy bằng Python. Chúng ta đã include Django ở bên trong và bạn hoàn toàn có thể phát triển nó một cách nhanh chóng mà không cần setup hay cài đặt với một Webserver (Như : Apache or Nginx) cho đến khi dự án của bạn đã sẵn sãng để len production

Hiện tại là khoảng thời gian tốt để bạn nhớ rằng : Không sử dụng server này tmôi trường production nhé . Nó chỉ thích hợp cho các nhà phát triên khi đang phát triển nó thôi nhé :D 

Nào, khi mà server hiện tại đã chạy, bạn hãy ghé thăm trang web `http://127.0.0.1:8000/ ` bẳng tring duyệt web đi nào. Và nếu bạn thấy trang `Congratulations!` . Ok , chúc mừng bạn , hệ thống đã làm việc 

>**Thay đổi cổng làm việc của Django**
> 
> Mặc định thì , `runserver` command sẽ khởi động một server tại máy bạn với cổng truy cập là 8000
> Nếu bạn muốn thay đổi cổng server , thì có thể thông qua 1 argument để làm việc này. Ví dụ bạn muốn chạy server với công 8080 thì chỉ cần chạy lệnh sau :
> 
> ` python manage.py runserver 8080`
> 
> Còn nếu bạn muốn chạy server ip khác t thì có thể chạy command như sau :
> 
> `python manage.py runserver 127.0.0.10:8000`
> 

> **Tự động reload của `runserver`**
> 
> Một điểm khá thông minh của development server này là sẽ tự động reload lại Python code mỗi lần có 1 file nào đó trong project thay đổi. Bạn ko cần restart lại server mỗi khi có 1 đoạn mã nào đó được update. Tuy nhiên , một số hành động như thêm tìm tin thì sẽ không trigger đến việc reload này. Vì vậy bạn vẫn phải restart lại thôi :D Hơi đen tẹo =))
>

Ok , vậy là mình đã giới thiệu qua với các bạn về  cách setup, install vs config về `Django` . Cám ơn các bạn đã theo dõi bài viết này của mình . Trong bài viết sau, mình sẽ giời thiệu với các bạn về các step để bắt đầu code nhưng chức năng và page đầu tiên bằng python Django. See you again !

# Tài liệu tham khảo
[https://www.djangoproject.com/start/overview/](https://www.djangoproject.com/start/overview/)