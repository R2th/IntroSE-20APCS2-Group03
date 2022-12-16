# Hướng dẫn tạo package Python

Tutorial này mình sẽ hướng dẫn cách tạo package cho một project Python cơ bản. Bao gồm:

- Structure package
- Necessary files
- Build the package
- Upload to Python Package Index

## Build simple project

Đầu tiên, mình sẽ tạo một simple project như sau:

```py
mkdir simple-project
cd simple-project
touch app.py
```

Trong file `app.py` mình sẽ define một function `sum`:

```py
# app.py
def sum(a, b):
        return a + b

```

Sau khi tạo xong, ta sẽ test thử module này nào:

```bash
$ python
Python 2.7.11 (default, May 16 2018, 08:55:09)
[GCC 5.4.0 20160609] on linux2
Type "help", "copyright", "credits" or "license" for more information.
>>> from app import sum
>>> print(sum(1, 2))
3
```

Okay, đã tạo xong một simple project.

## Add necessary files

Một package cơ bản sẽ có structure như này:

```bash
/packaging_tutorial
  /example_pkg
    __init__.py
  setup.py
  LICENSE
  README.md
```

Ta sẽ thêm từng thành phần vào project đã tạo ở bên trên.
Đầu tiên, bạn cần định nghĩa `__init__.py` file:

```bash
touch __init__.py
```

```py
# __init__.py
name = 'test_sum'
```

Tiếp theo, bạn tạo một file `setup.py`. File này để làm gì ? `setup.py` là một script build for [setuptools](https://packaging.python.org/key_projects/#setuptools). Trong đây sẽ chứa những thông tin về package của bạn:

```py
import setuptools

setuptools.setup(
    name="example-pkg-your-username",
    version="0.0.1",
    author="Example Author",
    author_email="author@example.com",
    description="Sort description",
    long_description="Full description",
    long_description_content_type="text/markdown",
    url="https://github.com/pypa/sampleproject",
    packages=setuptools.find_packages(),
    classifiers=[
        "Programming Language :: Python :: 2",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
)
```

Trong đó:

- **name** : tên package. Nếu sau này bạn có ý định upload lên [pypi.org](https://pypi.org/), thì bạn cần chắc chắn rằng tên đó chưa tồn tại trên hệ thống của `pypi`.
- **version** : version của package.
- **author** : tên tác giả.
- **author_email** : email của tác giả.
- **description** : sort description package.
- **long_description** : full description package. Ta có thể đọc từ file `README.md` của mình.

```py
with open("README.md", "r") as fh:
    long_description = fh.read()

...
long_description=long_description,
...
```

- **long_description_content_type** : chỉ định content type của long_description.
- **url** : link source code của project. Có thể là Github, Gitlab, Bitbucker...
- **packages** : danh sách các Python import package. Bạn có thể sử dụng `setuptools.find_packages()` để làm tự động. Hoặc nếu bạn muốn làm bằng tay.

```py
...
packages=['an_example_pypi_project', 'tests'],
...
```

- **classifiers**: bổ sung thêm một số thông tin cho package. Như ví dụ trên, package chỉ tương thích với Python 2,  under MIT lisense và là OS-independent. Danh sách classifiers bạn có thể tham khảo [tại đây](https://pypi.org/classifiers/).

File `setup.py` trên khá là cơ bản. Bạn có thể tìm hiểu đầy đủ [tại đây](https://packaging.python.org/guides/distributing-packages-using-setuptools/)

Sau khi tạo xong file `setup.py`, tiếp theo bạn cần tạo 1 file `README.md`. File này để làm gì thì mình cũng không nhắc nữa nhé. Mình sẽ để tạm nội dung vào như sau:

```markdown
# Test sum package
...
```

Cuối cùng, ta sẽ cần tạo một LICENSE file.

File này là rất quan trong khi bạn muốn upload package lên Python Package Index. Nếu bạn chỉ sử dụng ở mức độ giới hạn người dùng thì việc tạo file này không cần thiết cho lắm. File này sẽ nói về term khi người dùng cài đặt package này. Bạn có thể chọn license tại trang: https://choosealicense.com/. Ở ví dụ này, mình sẽ chọn MIT license:

```LICENSE
MIT License

Copyright (c) 2019 minhhahao

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

Bước tiếp theo, ta sẽ đóng gói package.

## Build the package

Trước hết, phải chắc chắn rằng bạn đã cài đặt 2 packages: `setuptools` và `wheel`:

```sh
$ pip list | grep setuptools
setuptools (39.2.0)
$ pip list | grep wheel
wheel (0.33.0)
```

Nếu không có, bạn có thể cài 2 packages đó qua pip:

```sh
$ pip install -U setuptools wheel
Collecting setuptools
  Using cached https://files.pythonhosted.org/packages/d1/6a/4b2fcefd2ea0868810e92d519dacac1ddc64a2e53ba9e3422c3b62b378a6/setuptools-40.8.0-py2.py3-none-any.whl
Collecting wheel
  Using cached https://files.pythonhosted.org/packages/7c/d7/20bd3c501f53fdb0b7387e75c03bd1fce748a1c3dd342fc53744e28e3de1/wheel-0.33.0-py2.py3-none-any.whl
Installing collected packages: setuptools, wheel
  Found existing installation: setuptools 39.2.0
    Uninstalling setuptools-39.2.0:
      Successfully uninstalled setuptools-39.2.0
Successfully installed setuptools-40.8.0 wheel-0.33.0

```

Tiếp theo, bạn chạy command sau để đóng gói package.

```sh
python setup.py sdist bdist_wheel
```

Khi run command này, `setup.py` phải ở folder mà bạn chạy lệnh. Không thì nó sẽ bão lỗi không tìm thấy `setup.py` đâu :v

Kế t quả:

```sh
$ tree
.
├── app.py
├── app.pyc
├── build
│   └── bdist.linux-x86_64
├── dist
│   ├── simple_sum-0.0.1-py2-none-any.whl
│   └── simple_sum-0.0.1.tar.gz
├── __init__.py
├── LICENSE
├── README.md
├── setup.py
└── simple_sum.egg-info
    ├── dependency_links.txt
    ├── PKG-INFO
    ├── SOURCES.txt
    └── top_level.txt

4 directories, 12 files

```

trong thử mục `dist/` có 2 file mà ta cần quan tâm:

- **simple_sum-0.0.1.tar.gz** : a source archive file.
- **simple_sum-0.0.1-py2-none-any.whl**: a built distribution file.

Sau khi có 2 file này, ta có thể upload lên Pypi được rồi.

## Upload distribution archives

Để test bạn có thể tạo tài khoản tại https://test.pypi.org/account/register/. Còn nếu muốn upload lên pypi luôn thì có thể tạo tài khoản tại https://pypi.org/account/register/. Tài khoản bạn cần phải confirm qua email. Nếu không khi đẩy lên bạn sẽ dính lỗi 403 ngay :v

Sau khi có tài khoản rồi, tiếp tục bạn cần check xem môi trường bạn có gói `twine` chưa:

```sh
$ pip list | grep twine
twine (1.13.0)
```

Nếu không có thì cài vô:

```sh
pip install -U twine
```

Upload lên nào:

```sh
$ python -m twine upload --repository-url https://test.pypi.org/legacy/ dist/*  --verbose
Enter your username: <your-username>
Enter your password: <your-password>
Uploading distributions to https://test.pypi.org/legacy/
Uploading simple_sum-0.0.1-py2-none-any.whl
100%|████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████| 4.95k/4.95k [00:00<00:00, 16.4kB/s]
Uploading simple_sum-0.0.1.tar.gz
100%|████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████| 3.94k/3.94k [00:01<00:00, 2.84kB/s]
```

Sau khi upload thành công, bạn có thể check package của bạn tại: `https://test.pypi.org/project/your-package-name`

## Install package

Có 2 cách install package là install qua archives file và một là qua pypi.

- Install offline:

```sh
pip install simple_sum-0.0.1.tar.gz
```

- Install qua pypi:

```sh
pip install package
or
pip install --index-url https://test.pypi.org/simple/ your-package-name
```

Xong! Đơn giản là vậy.

Thanks for reading!