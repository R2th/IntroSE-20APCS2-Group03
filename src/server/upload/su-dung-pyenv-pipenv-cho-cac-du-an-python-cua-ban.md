Dựa trên việc phát triển dự án ở local của bản thân. Bạn có thể phát hiện ra rằng việc quản lý các dự án khác nhau, rất khó khăn trong  với các package khác nhau phụ thuộc vào các phiên bản Python khác nhau trên máy cục bộ của bạn.
![](https://images.viblo.asia/f49fcdcc-f3e0-4a34-82a7-8f47931d1f10.png)
Có nhiều cách để cài đặt python :
* Dựa vào cài đặt sẵn của hệ điều hành
* Sử dụng hệ thống quản lý package như brew hoặc apt
* Download từ www.python.org
* Sử dụng pyenv , cách dễ dàng để cài đặt và quản lý Python
# 1. Cài đặt pyenv
```
$ brew install pyenv
```
Thêm phần sau vào ~ / .bash_profile hoặc ~ / .bashrc để tự động khởi tạo pyenv khi terminal của bạn load:
```
eval "$(pyenv init -)"
```
# 2 . pyenv hoạt động thế nào
Để xem tất cả các version Python có sẵn:
```
$ pyenv install --list
```
hãy cài thử python 3.6.6
```
$ pyenv install 3.6.6
Installed Python-3.6.6 to /Users/dvf/.pyenv/versions/3.6.6
```
pyenv không thay đổi global interpreter của bạn trừ khi bạn nói với nó:
```
$ python --version
Python 2.7.14
$ pyenv global 3.6.6
Python 3.6.6
```

pyenv cho phép bạn cài đặt các phiên bản khác nhau của Python cục bộ vào một thư mục. Hãy tạo một dự án với Python 3.7.0:
```
$ pyenv install 3.7.0
Installed Python-3.7.0 to /Users/dvf/.pyenv/versions/3.7.0
$ mkdir my_project && cd my_project
$ python --version
Python 3.6.6
$ pyenv local 3.7.0
$ python --version
Python 3.7.0
```
Bây giờ, bất cứ khi nào bạn thấy mình trong my_project, bạn sẽ tự động sử dụng trình thông dịch Python 3.7.0.
# 3. Pipenv là gì và nó hoạt động như thế nào?
Chắc hẳn ai làm việc với các dự án python đều quen thuộc với môi trường ảo ,  nó phục vụ độc lập cho chỉ riêng dự án của bạn mà không hề ảnh hưởng đến những thứ bạn đã cài đặt hoặc có sẵn của hệ điều hành như : version python, package,.. Ngoài phục vụ việc đóng gói sẵn giúp bạn độc lập sử dụng , và việc cài đặt lại hoặc cho người dùng chung dự án đơn giản trong việc cài đặt .

Pipenv là công cụ quản lý gói. Nó kết hợp chức năng của Pip và Virtualenv, cùng với các tính năng tốt nhất của các công cụ đóng gói từ các ngôn ngữ khác như Bundler và NPM. Điều này dẫn đến một quy trình công việc đơn giản hóa để cài đặt các gói và quản lý môi trường ảo. Pipenv chính thức được đề nghị để quản lý các phụ thuộc dự án

Các vấn đề mà Pipenv tìm cách giải quyết là nhiều:
* Bạn không còn cần phải sử dụng pip và virtualenv riêng biệt. Chúng làm việc cùng nhau.
* Việc quản lý tệp requirements.txt có thể có vấn đề, vì vậy Pipenv sử dụng Pipfile và Pipfile.lock để tách các khai báo phụ thuộc trừu tượng khỏi kết hợp được thử nghiệm cuối cùng.
*  Hash được sử dụng ở mọi nơi, mọi lúc. An toàn
*  Khuyến khích mạnh mẽ việc sử dụng các phiên bản phụ thuộc mới nhất để giảm thiểu rủi ro bảo mật phát sinh từ các thành phần lỗi thời.
*  Cung cấp cho bạn cái nhìn sâu sắc về biểu đồ phụ thuộc của bạn (ví dụ: biểu đồ $ pipenv graph).
*  Hợp lý hóa quy trình phát triển bằng cách tải các tệp .env.

Để cài đặt pipenv:
```
$ brew install pipenv

Nếu bạn đang sử dụng Ubuntu 17.10 trở lên
sudo apt install software-properties-common python-software-properties
sudo add-apt-repository ppa:pypa/ppa
sudo apt update
sudo apt install pipenv

hoặc
sudo apt install python-pip
pip install pipenv
```
Setup Pipenv trong project
```
mkdir python-example && cd python-example
pipenv --python 3.6
```
Nếu bạn bỏ qua tùy chọn --python, môi trường sẽ được tạo bằng phiên bản Python mặc định của hệ thống. 
Bạn sẽ tìm thấy hai tệp mới trong dự án của mình: Pipfile và Pipfile.lock.

Đây là những gì Pipfile của bạn :
```
[[source]]
url = "https://pypi.org/simple"
verify_ssl = true
name = "pypi"
[packages]
[dev-packages]
[requires]
python_version = "3.6"
```
Cài thử dependencies mới đơn giản:
```
$ pipenv install django
Installing django
...
Installing collected packages: pytz, django
Successfully installed django-2.1.2 pytz-2018.5
Adding django to Pipfile's [packages]…
Pipfile.lock (4f9dd2) out of date, updating to (a65489)…
Locking [dev-packages] dependencies…
Locking [packages] dependencies…
Updated Pipfile.lock (4f9dd2)!
Installing dependencies from Pipfile.lock (4f9dd2)…
🐍   ▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉ 2/2 — 00:00:01
To activate this project's virtualenv, run pipenv shell.
Alternatively, run a command inside the virtualenv with pipenv run.
```
Nếu chúng tôi muốn cài đặt cácdependencies dev để sử dụng trong quá trình phát triển, ví dụ YAPF, bạn hãy thêm --dev vào bước cài đặt:
```
$ pipenv install --dev yapf
```
Pipfile.lock là cực kỳ quan trọng bởi vì nó thực hiện hai điều:
* Cung cấp bảo mật tốt bằng cách giữ một hash của mỗi gói được cài đặt.
* Ghim các phiên bản của tất cả các phụ thuộc và phụ thuộc phụ, cung cấp cho bạn các môi trường có thể nhân rộng.
```
{
    "_meta": {
        "hash": {
            "sha256": "627ef89...64f9dd2"
        },
        "pipfile-spec": 6,
        "requires": {
            "python_version": "3.7"
        },
        "sources": [
            {
                "name": "pypi",
                "url": "https://pypi.org/simple",
                "verify_ssl": true
            }
        ]
    },
    "default": {
        "django": {
            "hashes": [
                "sha256:acdcc1...ab5bb3",
                "sha256:efbcad...d16b45"
            ],
            "index": "pypi",
            "version": "==2.1.2"
        },
        "pytz": {
            "hashes": [
                "sha256:a061aa...669053",
                "sha256:ffb9ef...2bf277"
            ],
            "version": "==2018.5"
        }
    },
    "develop": {}
}
{
    "_meta": {
        "hash": {
            "sha256": "627ef89...64f9dd2"
        },
        "pipfile-spec": 6,
        "requires": {
            "python_version": "3.7"
        },
        "sources": [
            {
                "name": "pypi",
                "url": "https://pypi.org/simple",
                "verify_ssl": true
            }
        ]
    },
    "default": {
        "django": {
            "hashes": [
                "sha256:acdcc1...ab5bb3",
                "sha256:efbcad...d16b45"
            ],
            "index": "pypi",
            "version": "==2.1.2"
        },
        "pytz": {
            "hashes": [
                "sha256:a061aa...669053",
                "sha256:ffb9ef...2bf277"
            ],
            "version": "==2018.5"
        }
    },
    "develop": {}
}{
    "_meta": {
        "hash": {
            "sha256": "627ef89...64f9dd2"
        },
        "pipfile-spec": 6,
        "requires": {
            "python_version": "3.7"
        },
        "sources": [
            {
                "name": "pypi",
                "url": "https://pypi.org/simple",
                "verify_ssl": true
            }
        ]
    },
    "default": {
        "django": {
            "hashes": [
                "sha256:acdcc1...ab5bb3",
                "sha256:efbcad...d16b45"
            ],
            "index": "pypi",
            "version": "==2.1.2"
        },
        "pytz": {
            "hashes": [
                "sha256:a061aa...669053",
                "sha256:ffb9ef...2bf277"
            ],
            "version": "==2018.5"
        }
    },
    "develop": {}
}{
    "_meta": {
        "hash": {
            "sha256": "627ef89...64f9dd2"
        },
        "pipfile-spec": 6,
        "requires": {
            "python_version": "3.7"
        },
        "sources": [
            {
                "name": "pypi",
                "url": "https://pypi.org/simple",
                "verify_ssl": true
            }
        ]
    },
    "default": {
        "django": {
            "hashes": [
                "sha256:acdcc1...ab5bb3",
                "sha256:efbcad...d16b45"
            ],
            "index": "pypi",
            "version": "==2.1.2"
        },
        "pytz": {
            "hashes": [
                "sha256:a061aa...669053",
                "sha256:ffb9ef...2bf277"
            ],
            "version": "==2018.5"
        }
    },
    "develop": {}
}
```
 Tùy chỉnh chỉ mục
 
Pipenv khó sử dụng các kho lưu trữ Python riêng, ví dụ nếu bạn muốn lưu trữ các thư viện Python riêng trong tổ chức của mình. Tất cả những gì bạn cần làm là xác định chúng là một nguồn bổ sung trong Pipfile:
```
[[source]]
url = "https://pypi.org/simple"
verify_ssl = true
name = "pypi"

[[source]]
url = "https://www.example.com"
verify_ssl = true
name = "some-repo-name"

[packages]
django = "*"
my-private-app = {version="*", index="some-repo-name"}

[dev-packages]

[requires]
python_version = "3.6"
```
Trong thư mục chứa Pipfile, bắt đầu một shell trong môi trường mới:
```
pipenv shell
Điều này tương tự như chạy source env/bin/activate với virtualenv.
```
Hoặc, nếu bạn muốn thực thi một lệnh bên trong venv:
```
$ pipenv run python manage.py runserver

```
Xem các phụ thuộc của dự án của bạn ở dạng biểu đồ:
```
pipenv graph
```
```
numpy==1.14.2
pytest==3.5.0
- attrs [required: >=17.4.0, installed: 17.4.0]
- more-itertools [required: >=4.0.0, installed: 4.1.0]
- six [required: >=1.0.0,<2.0.0, installed: 1.11.0]
- pluggy [required: >=0.5,<0.7, installed: 0.6.0]
- py [required: >=1.5.0, installed: 1.5.3]
- setuptools [required: Any, installed: 39.0.1]
- six [required: >=1.10.0, installed: 1.11.0]
```
Xác định vị trí nhị phân cho môi trường ảo:
```
pipenv --venv
  
/home/user/.local/share/virtualenvs/python-example-YJNpmGYi
```
Deploying

Việc deploy của bạn không thành công nếu có một sự không phù hợp giữa các phụ thuộc được cài đặt và Pipfile.lock. Vì vậy, bạn nên nối thêm -- deploy vào bước cài đặt của mình để thực hiện điều đó:
```
$ pipenv install --deploy
```
Bạn cũng có thể kiểm tra những phụ thuộc nào không khớp:
```
$ pipenv check

```
Nguồn: https://hackernoon.com/reaching-python-development-nirvana-bb5692adf30c,

https://www.linode.com/docs/development/python/manage-python-environments-pipenv/,

https://pipenv.readthedocs.io/en/latest/