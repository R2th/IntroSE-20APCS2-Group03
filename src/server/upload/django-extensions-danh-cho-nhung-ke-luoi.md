Trong bài viết này, mình sẽ giới thiệu đến các bạn một module cực kỳ hữu dụng khi làm việc với Django Framework, đặc biệt với những người vừa "lười" vừa thích "làm màu" giống mình. Cụ thể đó là `django-extensions`. Và để biết nó là gì thì mình cùng các bạn hãy đi vào những phần tiếp theo nhé. Let's Go!
# 1. Introduction
`django-extensions` là một tập hợp các extensions tùy chỉnh cho Django Framework.
Nó bao gồm các command để quản lý, bổ sung field cho database, extension cho admin và còn nhiều hơn nữa. Cụ thể hơn, chúng ta tiếp tục tìm hiểu sâu xem rằng nó có thể cung cấp những điều hữu ích cho chúng ta nhé.
# 2. Installation
Có 2 cách để install `django-extensions`:

- Install thông qua môi trường ảo:

Nếu bạn đang sử dụng virtualenv thì chạy command:

```python
$ pip install django-extensions
```
Nếu bạn đang dùng pipenv thì chạy command:

```python
$ pipenv install django-extensions
```
- Install trực tiếp từ source: Nếu bạn muốn install nó từ source, hãy lấy từ `Github` và chạy file `setup.py`:
```python
$ git clone git://github.com/django-extensions/django-extensions.git
$ cd django-extensions
$ python setup.py install
```
Và sau cùng, đừng quên thêm chúng vào `INSTALLED_APPS` trong file `settings.py` của project của bạn nha.
# 3. Provide extensions
### 3.1. show_urls
Với command
```
$ python manage.py show_urls
```
Chúng ta có thể xem được toàn bộ router (urls) đang có trong project cũng như thư mục chúng đang ở và route name của chúng.
<img src="https://images.viblo.asia/9eef09c1-2895-4e7c-a8c9-1462758244a9.png" alt="" data-src="https://images.viblo.asia/9eef09c1-2895-4e7c-a8c9-1462758244a9.png" data-zoom-src="https://images.viblo.asia/full/9eef09c1-2895-4e7c-a8c9-1462758244a9.png" srcset="https://images.viblo.asia/retina/9eef09c1-2895-4e7c-a8c9-1462758244a9.png 2x">
### 3.2. shell_plus
Với `shell_plus`, chúng ta được bonus thêm 2 extensions nữa đó là `ipython` và `bpython` và shell command của chúng ta đã trông bớt nhàm chán, hơn nữa nó còn cho chúng ta tính năng suggestion rất xịn xò nha.
Nhưng trước hết, chúng ta cần phải cài đặt 2 thằng này đã nhé:
```python
$ pipenv install ipython bpython 
```
- ipython:

<img src="https://images.viblo.asia/6b741262-e995-41ff-9c79-a1c358629ca0.gif" alt="" data-src="https://images.viblo.asia/6b741262-e995-41ff-9c79-a1c358629ca0.gif" data-zoom-src="https://images.viblo.asia/full/6b741262-e995-41ff-9c79-a1c358629ca0.gif" srcset="https://images.viblo.asia/retina/6b741262-e995-41ff-9c79-a1c358629ca0.gif 2x">

- bpython:

<img src="https://images.viblo.asia/9ee139df-e25c-4977-aeb4-f0e0aec1b08a.gif" alt="" data-src="https://images.viblo.asia/9ee139df-e25c-4977-aeb4-f0e0aec1b08a.gif" data-zoom-src="https://images.viblo.asia/full/9ee139df-e25c-4977-aeb4-f0e0aec1b08a.gif" srcset="https://images.viblo.asia/retina/9ee139df-e25c-4977-aeb4-f0e0aec1b08a.gif 2x">

### 3.3. graph_models
<p><code>graph_models</code> giúp chúng ta generate ra một biểu đồ ER dưới định dạng image cho apps mà chúng ta lựa chọn.
<img src="https://images.viblo.asia/c2a69da2-af96-4da5-966a-f8c207b9e8cd.gif" alt="" data-src="https://images.viblo.asia/c2a69da2-af96-4da5-966a-f8c207b9e8cd.gif" data-zoom-src="https://images.viblo.asia/full/c2a69da2-af96-4da5-966a-f8c207b9e8cd.gif" srcset="https://images.viblo.asia/retina/c2a69da2-af96-4da5-966a-f8c207b9e8cd.gif 2x"></p>
<h3>3.4. runserver_plus</h3>
<p><code>runserver_plus</code> cho phép chúng ta debug ngay ở trên trình duyệt khi mà chúng ta gặp lỗi.
  
<img src="https://images.viblo.asia/937825fb-d0c2-472e-a940-8b421ee884c2.gif" alt="" data-src="https://images.viblo.asia/937825fb-d0c2-472e-a940-8b421ee884c2.gif" data-zoom-src="https://images.viblo.asia/full/937825fb-d0c2-472e-a940-8b421ee884c2.gif" srcset="https://images.viblo.asia/retina/937825fb-d0c2-472e-a940-8b421ee884c2.gif 2x"></p>



Trên đây là một số extensions mà mình thấy cực kỳ hữu dụng khi chúng ta làm việc với Django. Cảm ơn các bạn đã quan tâm và đọc bài viết của mình.

Mình sẽ tiếp tục gửi đến các bạn các extensions khác trong những bài viết tiếp theo.