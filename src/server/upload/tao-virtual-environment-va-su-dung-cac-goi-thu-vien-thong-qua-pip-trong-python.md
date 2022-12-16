Xin chào các bạn. Hôm nay mình sẽ giới thiệu với các bạn cách tạo Virtual Environment và sử dụng thư viện trong Ngôn ngữ lập trình Python

- [Giới thiệu](#gioithieu)
- [Tạo Virtual Environment](#VirtualEnvironment)
- [Quản lý các gói thư viện bằng pip](#quanlygoithuvien)



## Giới thiệu

Hiện tại các chương trình được viết bằng Python đang thường dùng các gói thư viện cũng như module bên ngoài các thư viện. Những chương trình này sẽ cần các phiên bản cụ thể của một thư viện nào đó.

Điều này có nghĩa là mỗi một thư viện của Python sẽ chỉ phù hợp cho một chương trình cụ thể nào đó mà nó sử dụng chứ không thể có một thư viện có thể sử dụng cho tất cả các chương trình Python được.

Giải pháp xử lý vấn đề này là tạo ra `virtual environment`, một thư mục chứa phiên bản cụ thể của một thư viện cụ thể, hoặc thậm chí chứa bộ thư viện chuẩn của Python theo phiên bản nào đó.

## Tạo Virtual Environment

Module được sử dụng để tạo và quản lý virtual enviroment có tên là [`venv`](https://docs.python.org/3/library/venv.html#module-venv). [`venv`](https://docs.python.org/3/library/venv.html#module-venv) thường sẽ cài đặt các thư viện Python mới nhất trên máy tính của bạn vào virtual enviroment. Nếu bạn có nhiều phiên bản Python trên máy tính, bạn có thể chọn lựa phiên bản Python bằng lệnh `python3` hoặc bất cứ phiên bản Python nào bạn muốn.

Để tạo virtual enviroment, đầu tiên bạn chọn một thư mục, rồi gõ vào terminal:

```text
python3 -m venv tutorial-env
```

Lệnh này sẽ tạo thư mục `tutorial-env` nếu nó chưa tồn tại, cùng với đó là các thư mục con chứa trình thông dịch Python, các thư viện Python chuẩn và các file cần thiết khác.

Sau khi tạo virtual environment, bạn cần kích hoạt \(activate\) nó để sử dụng.

Trên Windows, gõ lệnh:

```text
tutorial-env\Scripts\activate.bat
```

Trên Unix hoặc MacOS, gõ lệnh:

```text
source tutorial-env/bin/activate
```

Kích hoạt virtual environment sẽ chuyển điều khiển từ OS shell về shell của virtual enviroment bạn đang sử dụng, và lúc này bạn sẽ thấy các thư viện trên virtual enviroment hiện tại khác với thư viện trên virtual enviroment khác. Ví về sự khác biệt giữa phiên bản Python trong và ngoài virtual enviroment:

```text
$ source ~/envs/tutorial-env/bin/activate
(tutorial-env) $ python
Python 3.5.1 (default, May  6 2016, 10:59:36)
  ...
>>> import sys
>>> sys.path
['', '/usr/local/lib/python35.zip', ...,
'~/envs/tutorial-env/lib/python3.5/site-packages']
>>>
```

## Quản lý các gói thư viện bằng pip
Bạn có thể cài đặt, nâng cấp, xóa bỏ các gói thư viện bằng một chương trình tên là **pip**. Mặc định, `pip` sẽ cài đặt các gói thư viện nằm trên Python Package Index. Bạn có thể tìm hiểu các gói thư viện này bằng cách  tìm kiếm thông qua lệnh `pip` trên shell:

```text
(tutorial-env) $ pip search astronomy
skyfield               - Elegant astronomy for Python
gary                   - Galactic astronomy and gravitational dynamics.
novas                  - The United States Naval Observatory NOVAS astronomy library
astroobs               - Provides astronomy ephemeris to plan telescope observations
PyAstronomy            - A collection of astronomy related tools for Python.
...
```

`pip` có nhiều câu lệnh con: "search", "install", "uninstall", "freeze", v.v.. 

Bạn có thể cài phiên bản mới nhất của gói thư viện bất kỳ bằng cách nhập tên gói thư viện ấy vào shell:

```text
(tutorial-env) $ pip install novas
Collecting novas
  Downloading novas-3.1.1.3.tar.gz (136kB)
Installing collected packages: novas
  Running setup.py install for novas
Successfully installed novas-3.1.1.3
```

Bạn có thể cài đặt một phiên bản cụ thể của gói thư viện bằng cách thêm dấu `==` và số phiên bản mong muốn:

```text
(tutorial-env) $ pip install requests==2.6.0
Collecting requests==2.6.0
  Using cached requests-2.6.0-py2.py3-none-any.whl
Installing collected packages: requests
Successfully installed requests-2.6.0
```

Nếu bạn chạy lệnh dưới đây, `pip` sẽ thông báo phiên bản mà bạn mong muốn đã được cài đặt từ trước. Bạn có thể chỉ định cài đặt một phiên bản khác bằng việc bổ sung thêm số phiên bản sau tên thư viện, hoặc chạy `pip install --upgrade` để nâng cấp gói thư viện tới bản mới nhất:

```text
(tutorial-env) $ pip install --upgrade requests
Collecting requests
Installing collected packages: requests
  Found existing installation: requests 2.6.0
    Uninstalling requests-2.6.0:
      Successfully uninstalled requests-2.6.0
Successfully installed requests-2.7.0
```

Lệnh `pip uninstall` đặt phía trước tên các package có tác dụng xóa các package này khỏi virtual enviroment.

Lệnh `pip show` đặt phía trước tên package sẽ hiển thị thông tin về package đó:

```text
(tutorial-env) $ pip show requests
---
Metadata-Version: 2.0
Name: requests
Version: 2.7.0
Summary: Python HTTP for Humans.
Home-page: http://python-requests.org
Author: Kenneth Reitz
Author-email: me@kennethreitz.com
License: Apache 2.0
Location: /Users/akuchling/envs/tutorial-env/lib/python3.4/site-packages
Requires:
```

Lệnh `pip list` sẽ hiển thị tất cả các gói thư viện đã được cài đặt trong virtual enviroment:

```text
(tutorial-env) $ pip list
novas (3.1.1.3)
numpy (1.9.2)
pip (7.0.3)
requests (2.7.0)
setuptools (16.0)
```

Lệnh `pip freeze` cũng sẽ hiển thị tất cả các gói thư viện đã được cài đặt, nhưng kết quả trả về sẽ được trình bày sao cho phù hợp để làm đầu vào cho lệnh `pip install`. Thông thường kết quả này sẽ được ghi ra file `requirements.txt`:

```text
(tutorial-env) $ pip freeze > requirements.txt
(tutorial-env) $ cat requirements.txt
novas==3.1.1.3
numpy==1.9.2
requests==2.7.0
```

File `requirements.txt` có thể được dùng như một file cài đặt của chương trình Python. Người dùng có thể cài đặt tất cả các gói thư viện cần thiết với bằng cách thêm tham số `install -r`:

```text
(tutorial-env) $ pip install -r requirements.txt
Collecting novas==3.1.1.3 (from -r requirements.txt (line 1))
  ...
Collecting numpy==1.9.2 (from -r requirements.txt (line 2))
  ...
Collecting requests==2.7.0 (from -r requirements.txt (line 3))
  ...
Installing collected packages: novas, numpy, requests
  Running setup.py install for novas
Successfully installed novas-3.1.1.3 numpy-1.9.2 requests-2.7.0
```

Dưới đây mình  đã bước đầu giới thiệu cách tạo Virtual Environment và sử dụng thư viện trong Ngôn ngữ lập trình Python. Nếu có bất kì thắc mắc gì hãy để lại comment ở phía dưới nhé.


### Thao Khảo

https://docs.python.org/3/tutorial/venv.html