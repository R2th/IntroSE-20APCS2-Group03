## Tóm tắt

Nói về các package manager quản lý dành cho python, thì vài năm gần đây có khá nhiều tool hỗ trợ, tuy nhiên ưu nhược điểm của các tool đó như thế nào thì nếu không tìm hiểu qua chắc chắn cũng sẽ hơi lung túng trong việc lựa chọn khi start một dự án mới. Trong bài viết này, tôi sẽ thực hiện so sánh các tool với nhau về giúp chúng ta hiểu rõ hơn về lợi ích và cách thức sử dụng như thế nào. Tôi thì hơi nghiêng về Poetry nên có thể cũng sẽ hơi thiên vị chút, mong các bạn thông cảm.

**Nội dung chính:**
- Điểm tương đồng giữa Pipenv、Poetry、Pyflow và cách thức sử dụng.

**Nội dung không đề cập:**
- GIải thích về các tool: Pyenv、Venv、Virtualenv

**Môi trường kiểm thử:**
- Ubuntu 18.04
- Python 3.8.0
- Pipenv 2018.11.26
- Poetry 1.0.0
- Pyflow 0.2.1

Đặc biệt Poetry và Pyflow đang trong quá trình phát triển, nên có thể có sai lệnh về 2 tool này.
Tại thời điểm  2019/12/15, thống kê Star trên github như sau, riêng tool Poetry 1.0.0 mới được phát hành 7 ngày trước

![](https://images.viblo.asia/04a052e9-b9c1-4c6e-87ac-3506a2cf99f5.png)

## Giới thiệu

### Pipenv
#### ![https://github.com/pypa/pipenv](https://qiita-user-contents.imgix.net/https%3A%2F%2Fimg.shields.io%2Fgithub%2Fstars%2Fpypa%2Fpipenv%3Fstyle%3Dfor-the-badge?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=1e98636771840d7e7612668eac859a88)

Tool này sử dụng để quản lý các package bằng file `requirements.txt` (có nghĩa là quản lý các thư viện được liệt kê trong file này), ví dụ như Node.js thì có npm, yarn, Ruby thì có gem, và cũng có thể xử lý được các reference của thư viện đó ( tức là download luôn các thư viện phụ thuộc để chạy được thư viện chính). 

Tool này sử dụng file quản lý `Pipfile` và file `Pipfile.lock` để quản lý các liên kết này. Ví dụ như thư viện `pandas` sử dụng `numpy` như là thư viện liên kết bắt buộc, thì khi cài đặt hoặc xóa `pandas`, thì thư viện numpy cũng sẽ được cài đặt hoặc xóa kèm theo.

**Pipfile**
```
[[source]]
name = "pypi"
url = "https://pypi.org/simple"
verify_ssl = true

[dev-packages]
black = "*"

[packages]
numpy = "*"

[requires]
python_version = "3.8"

[pipenv]
allow_prereleases = true
```

### Poetry
#### ![https://github.com/python-poetry/poetry](https://qiita-user-contents.imgix.net/https%3A%2F%2Fimg.shields.io%2Fgithub%2Fstars%2Fsdispater%2Fpoetry%3Fstyle%3Dfor-the-badge?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=4834759bc79284cc97837fb0a1a8c98c)

Trong khi Pipenv như là 1 tool phổ biến, thì tại [PEP 518](https://www.python.org/dev/peps/pep-0518), pyproject.com đã giới thiệu Poetry như là một tool chính chính thức sử dụng để quản lý package của mình. 

Pipenv thì chỉ quản lý được trên trên `requirements.txt` hoặc `alt-requirements.txt`, nhưng đối với Poetry thì có thể quản lý được trên nhiều kênh hơn như `setup.py`, `setup.cfg`, `MANIFEST.in`, ..., ngoài ra thì cũng có thể setup được `linter` hoặc `formatter` trên cùng 1 file đó.

```pyproject.toml
[tool.poetry]
name = "sample-ploject"
version = "1.0.0"
description = ""
authors = ["Your Name <you@example.com>"]
license = "MIT"

[tool.poetry.dependencies]
python = "^3.8"
numpy = "^1.17.4"

[tool.poetry.dev-dependencies]
black = {version = "^19.10b0", allow-prereleases = true}

[build-system]
requires = ["poetry>=0.12"]
build-backend = "poetry.masonry.api"
```

### Pyflow
#### ![https://github.com/David-OConnor/pyflow](https://qiita-user-contents.imgix.net/https%3A%2F%2Fimg.shields.io%2Fgithub%2Fstars%2FDavid-OConnor%2Fpyflow%3Fstyle%3Dfor-the-badge?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=414d894dbd077b19c69703fa17c71406)

Pyflow có lẽ là tool mới nhất, được viết bằng Rust, ngoài PEP 518 được giới thiệu bởi Poetey, thì cũng đã được để xuất ở PEP 582. Pyflow có thể xử lý và switch nhiều version python trong cùng 1 môi trường ảo.
Không giống như Pipenv/Poetry, chỉ xử lý một môi trường ảo của một phiên bản Python với Pyenv + venv, Pyflow có thể tự quản lý nhiều phiên bản Python và tạo môi trường ảo với bất kỳ phiên bản nào.

Việc này hiện tại chưa có nhiều ý nghĩa, nhưng nó có thể có ích nếu có một bản cập nhật lớn cho Python trong tương lai. Điểm lợi là tool này được viết bằng Rust và dường như có lợi về tốc độ, v.v., nhưng có điểm khó là cộng động phát triên Rust đang hơi yếu nên nếu có lỗi thì cũng sẽ mất nhiều thời gian để giải quyết.

```pyproject.toml
[tool.pyflow]
name = "sample-project"
py_version = "3.8"
version = "1.0.0"
authors = ["Your Name <you@example.com>"]

[tool.pyflow.scripts]

[tool.pyflow.dependencies]
numpy = "^1.17.4"

[tool.pyflow.dev-dependencies]
black = "^19.10.0b0"
```

## Cách sử dụng

Cách cài đặt thì có thể tham khảo ở các link bên dưới.

Đối với Pyflow về cơ bản thì có thể sử dụng Pip để cài đặt, nhưng hiện tại thì Pyflow đang không khuyến khích dùng Pip, vì có vẻ không thương thích với Mac nên tốt hơn là nên cài đặt bằng Rust.

- [pipenv#installation](https://github.com/pypa/pipenv#installation)
- [poetry#installation](https://github.com/python-poetry/poetry#installation)
- [pyflow#installation](https://github.com/David-OConnor/pyflow#installation)

Toàn bộ các lệnh cơ bản nhất thì các bạn có thểm tham khảo ở bảng được liệt kê dưới đây.

| Action |	Pip | Pipenv | Poetry | Pyflow |
| -------- | -------- | -------- | -------- | -------- |
|Create project | - | - | poetry new sample | pyflow new sample |
|Init project | - |pipenv --python 3.8 |poetry init |pyflow init |
|Add package |pip install numpy |pipenv install numpy |poetry add numpy |pyflow install numpy 
|Remove package |pip uninstall numpy |pipenv uninstall numpy |poetry remove numpy |pyflow uninstall numpy |
|Install depedency |pip install -r requirements.txt |pipenv sync |poetry install |pyflow sync |
|Run virtual environment |- |pipenv run python main.py |poetry run python main.py |pyflow main.py |
|Build package |python setup.py bdist_whee |- |poetry build |pyflow package |
|Upload package (PyPI) |twine upload --repository pypi dist/* |- |poetry publish |pyflow publish |

Nhìn bảng trên thì có thể thấy ở Pyflow và Pipenv các lệnh có vẻ tương tự như nhau, còn khi build package thì Poetry và Pyflow có command nhìn sáng sủa nhất.

Cấu trúc của thư mục sau khi install một thư viện như sau (instal numpy)

**pipenv-tree**
```
./
├── .venv/
├── Pipfile
└── Pipfile.lock
```

**poetry-tree**
```
./
├── .venv/
├── poetry.lock
├── pyproject.toml
├── README.rst
├── sample/
└── tests/
```

**pyflow-tree**
```
./
├── .git/
├── .gitignore
├── __pypackages__/
├── LICENSE
├── pyflow.lock
├── pyproject.toml
├── README.md
└── sample/
```

## Tham khảo
https://qiita.com/sk217/items/43c994640f4843a18dbe