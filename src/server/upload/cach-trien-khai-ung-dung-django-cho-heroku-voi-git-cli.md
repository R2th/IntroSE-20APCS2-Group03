# Giới thiệu

 Heroku là một nền tảng đám mây cung cấp dịch vụ lưu trữ. Nó hỗ trợ một số ngôn ngữ lập trình bao gồm PHP, Node.js và Python. Là Platform-as-a-Service (PaaS) cho phép bạn quản lý các ứng dụng web trong khi quan tâm đến các máy chủ, mạng, lưu trữ và các thành phần đám mây khác của bạn.

Trong bài viết này, chúng ta sẽ xem xét cách triển khai ứng dụng Django cho Heroku , sử dụng Git .

Bạn có thể làm theo các bước tương tự và triển khai ứng dụng từ [](https://stackabuse.com/deploying-django-apps-to-heroku-from-github/) , .
# Điều kiện tiên quyết

Dưới đây là danh sách những việc cần phải làm trước khi chúng ta bắt đầu triển khai:

* Git
* Tài khoản Heroku và CLI
* Ứng dụng Django

Giao diện dòng lệnh Heroku (CLI) giúp bạn dễ dàng tạo và quản lý các ứng dụng Heroku của mình trực tiếp từ terminal. Đó là một phần thiết yếu của việc sử dụng Heroku.

Để cài đặt Heroku CLI (hay còn gọi là Heroku Toolbelt ), vui lòng làm theo hướng dẫn trên trang [web](https://devcenter.heroku.com/articles/heroku-cli) chính thức .

Đảm bảo rằng ứng dụng Django của bạn đang chạy trên môi trường ảo mà bạn cần duy trì hoạt động trong suốt quá trình triển khai.

# Tài khoản Heroku

Khi tất cả những thứ này đã được cài đặt, bước tiếp theo là tạo một tài khoản Heroku miễn phí tại đây , nếu bạn chưa có tài khoản.

Sau khi viết những điều sau vào một terminal:

```
$ heroku login
```
terminal sẽ hiển thị một thông báo như:

```
heroku: Press any key to open up the browser to login or q to exit:
```
Nhấn phím bất kỳ và đăng nhập bằng trình duyệt của bạn. Sau đó, terminal sẽ hiển thị một thông báo dọc theo các dòng:

```
Logged in as email@domain.com
```
# Cấu hình ứng dụng Django cho Heroku

Bây giờ chúng ta đã hoàn tất các điều kiện tiên quyết, hãy chuẩn bị ứng dụng Django cho Heroku.

## Procfile

Một Procfile là một file có tên Procfile mà không cần bất kỳ phần mở rộng tập tin được đặt trong thư mục gốc của ứng dụng của bạn. Nó liệt kê các loại quy trình trong một ứng dụng và mỗi loại quy trình là một khai báo của một lệnh được thực thi khi một container / dyno của loại quy trình đó được khởi động.

Trước khi tạo Procfile, bạn sẽ cài đặt django gunicorn trong thư mục dự án của mình:

```
$ pip install django gunicorn
```
Trong khi Django xuất bản với máy chủ WSGI, chúng ta sẽ yêu cầu Heroku sử dụng Gunicorn để phục vụ ứng dụng , điều này cũng được Heroku khuyến nghị.

Bây giờ, hãy tạo một Procfile trong thư mục cha và thêm dòng sau:

```
web: gunicorn yourdjangoweb.wsgi --log-file -
```
Thay thế yourdjangoweb bằng tên thực tế của dự án của bạn.

## Runtime.txt
 Tạo một tệp văn bản được gọi runtime.txt trong cùng thư mục với Procfile. Nó cho Heroku biết ứng dụng của bạn đang sử dụng phiên bản Python nào. Nếu bạn không chắc chắn về phiên bản, hãy nhập python --version vào terminal với môi trường ảo Django của bạn được kích hoạt.

Sau đó thêm phiên bản vào runtime.txt:

```
python-x.x.x
```
## Những Host được phép
## 
Đây là một biện pháp bảo mật bổ sung trong Django để ngăn chặn các cuộc tấn công đến máy chủ HTTP bằng cách chỉ cho phép trang web được phân phát tại host/domains được thêm vào ALLOWED_HOSTS danh sách. If Debug = True và ALLOWED_HOSTS is [] sau đó duy nhất  localhost được cho phép theo mặc định. Để triển khai và phục vụ ứng dụng web của bạn trên Heroku, hãy thêm nó vào danh sách:

```
ALLOWED_HOSTS = ['herokuappname.herokuapp.com']
```
Ngoài ra, bạn có thể cho phép tất cả các ứng dụng từ Heroku bằng cách bỏ qua tên ứng dụng như sau:

```
ALLOWED_HOSTS = ['.herokuapp.com']
```
Bạn cũng có thể sử dụng ['*'] để cho phép tất cả các máy chủ. Bạn có thể tìm thêm chi tiết trong[ tài liệu](https://docs.djangoproject.com/en/3.1/ref/settings/#allowed-hosts) .

## Cài đặt gói
## 
Dưới đây là các gói bổ sung cần được cài đặt trong môi trường ảo của chúng ta.

Để kết nối cơ sở dữ liệu Django của chúng ta với Heroku, hãy cài đặt dj-database-url bằng cách gọi:

```
$ pip install dj-database-url
```
Vì Heroku sử dụng cơ sở dữ liệu Postgres, chúng tôi cũng cần bộ chuyển đổi (adapter) cho Python:

```
$ pip install psycog2
```
Và cuối cùng, chúng tôi sẽ sử dụng WhiteNoise để phục vụ các tệp tĩnh trong máy chủ sản xuất. Chúng tôi có thể cài đặt bằng cách gọi:

```
$ pip install whitenoise
```
Chúng ta đã cấu hình gunicorn, hãy thêm cấu hình cho whitenoisevà dj-database-url.

## cấu hình tệp tĩnh
 Đầu tiên hãy thêm các cài đặt cơ bản để phân phát các tệp tĩnh trong bất kỳ dự án Django nào. Bạn có thể sao chép-dán các cài đặt sau vào settings.py:

```
# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.11/howto/static-files/
PROJECT_ROOT   =   os.path.join(os.path.abspath(__file__))
STATIC_ROOT  =   os.path.join(PROJECT_ROOT, 'staticfiles')
STATIC_URL = '/static/'

# Extra lookup directories for collectstatic to find static files
STATICFILES_DIRS = (
    os.path.join(PROJECT_ROOT, 'static'),
)
```
* Thêm WhiteNoise vào MIDDLEWAREdanh sách ngay sau SecurityMiddlewaređó sẽ ở trên cùng:

```
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
  ]
```
* Thêm STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'vào settings.py.0 của bạn

## Cấu hình cơ sở dữ liệu

Chúng ta đang sử dụng dj-database-url để cấu hình cơ sở dữ liệu của mình. Thêm những dòng này ở cuối settings.py:
```
import dj_database_url 
prod_db  =  dj_database_url.config(conn_max_age=500)
DATABASES['default'].update(prod_db)
```

## requirements.txt
Heroku sẽ chỉ nhận ra một ứng dụng đã triển khai là một ứng dụng Python nếu nó có một requirements.txt tệp trong thư mục gốc. Nó cho Heroku biết những gói nào cần thiết để chạy ứng dụng của bạn.

Chúng ta có thể sử dụng pip freeze và chuyển thành requirements.txt tệp cho việc này:

```
$ pip freeze > requirements.txt
```
Của bạn requirements.txtnên bao gồm những điều sau:

```
whitenoise==5.2.0
dj-database-url==0.5.0
Django==3.0.9
gunicorn==20.0.4
psycopg2==2.8.5
pytz==2020.1
```
Lưu ý: Các phiên bản trên được ứng dụng Django của chúng tôi sử dụng và chúng có thể khác nhau đối với bạn.

## Kết nối ứng dụng Heroku với Git

Bây giờ chúng ta cần tạo một ứng dụng Heroku:

```
$ heroku create herokuappname
```
Nó sẽ hiển thị một thông báo "done" với hai URL dọc theo dòng này:
```

Creating ⬢ herokuappname... done
https://herokuappname.herokuapp.com/ | https://git.heroku.com/herokuappname.git
```
Điều này có nghĩa là một repository Git đã được tạo trên đám mây Heroku cho ứng dụng của bạn. URL https://herokuappname.herokuapp.com/ sẽ được sử dụng để truy cập ứng dụng của bạn ở bất kỳ đâu nhưng chúng ta vẫn cần thực hiện thêm một bước trước khi chạy ứng dụng của mình, tức là chúng ta cần đẩy mã của mình vào repository.

Khởi tạo một repository trống trong thư mục dự án của bạn:

```
$ git init
> Initialized empty Git repository in /herokuappname/.git/
```
Kết nối ứng dụng Heroku của bạn với git repository :

```
$ heroku git:remote -a herokuappname
> set git remote heroku to https://git.heroku.com/herokuappname.git
```

```
$ git add .
```

```
$ git commit -m "first commit for all files"
```
Cuối cùng, đẩy dự án lên gitrepo được lưu trữ trên Heroku:

```
$ git push master heroku
```
Nếu mọi thứ suôn sẻ, bạn sẽ thấy một đầu ra như thế này:

```
Counting objects: 26, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (20/20), done.
Writing objects: 100% (26/26), 32.13 KiB | 0 bytes/s, done.
Total 26 (delta 1), reused 0 (delta 0)
remote: Compressing source files... done.
remote: Building source:
.....
.....
remote: -----> Launching...
remote:        Released v1
remote:        https://herokuappname.herokuapp.com/ deployed to Heroku
remote: 
remote: Verifying deploy... done.
To https://git.heroku.com/herokuappname.git
[new branch]      master -> master
```

## collectstatic Error

Bạn có thể gặp lỗi liên quan đến collectstatic khi chạy lệnh git push heroku master. Điều này liên quan đến thư mục tệp tĩnh và bạn có thể bỏ qua nó bằng lệnh sau:

```
$ heroku config: set DISABLE_COLLECTSTATIC = 1
Đặt DISABLE_COLLECTSTATIC và khởi động lại ⬢ herokuappname ... đã xong, v2
DISABLE_COLLECSTATIC: 1
```
Nó sẽ yêu cầu Heroku không chạy lệnh thu thập trong quá trình triển khai ứng dụng. Bạn có thể chạy nó sau bằng cách sử dụng bower:

```
$ heroku run 'bower install --config.interactive = false; grunt prep; python management.py collectstatic --noinput'
```
Nó có thể xảy ra vì nhiều lý do

* Danh sách STATICFILES_DIRS của bạn trống trong settings.py hoặc không được định cấu hình đúng cách.
* Thư mục tĩnh của bạn không chứa tệp nào để git theo dõi. Bạn có thể thêm bất kỳ tệp tạm thời nào vào thư mục tĩnh của mình để làm cho nó hoạt động.
## Di chuyển cơ sở dữ liệu
```
$ heroku run python management.py migrate
```
Vậy là xong, ứng dụng của bạn đã chạy trên heroku! Bạn có thể truy cập nó tại [appname] .herokuapp.com. URL trong trường hợp của chúng ta sẽ là http://herokuappname.herokuapp.com/.

## Thêm tên miền tùy chỉnh
 Mọi ứng dụng trên Heroku đều được lưu trữ trên .herokuapp.com nhưng bạn có thể đổi nó thành tên miền của mình nếu sở hữu. Quá trình này rất đơn giản:

* Đăng nhập vào Bảng điều khiển Heroku
* Chọn ứng dụng hiện tại của bạn từ danh sách:

* Chọn Cài đặt từ thanh điều hướng và cuộn xuống để tìm phần Miền:
* Nhấp vào Thêm miền, nơi bạn sẽ có thể thêm tên miền của mình.

Tùy chọn này chỉ dành cho các tài khoản đã xác minh. Bạn sẽ được yêu cầu nhập chi tiết thẻ tín dụng trên Heroku để xác minh tài khoản của mình. Bạn có thể tìm thêm thông tin chi tiết về việc thêm tên miền và tên miền phụ trên [trang](https://devcenter.heroku.com/articles/custom-domains) này.

nguồn: https://stackabuse.com/how-to-deploy-a-django-application-to-heroku-with-git-cli/