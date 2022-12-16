# 1. Giới thiệu
CI là Continuous Integration. Nó là phương pháp phát triển phần mềm yêu cầu các thành viên của team tích hợp công việc của họ thường xuyên, mỗi ngày ít nhất một lần. Mỗi tích hợp được “build” tự động (bao gồm cả test) nhằm phát hiện lỗi nhanh nhất có thể. Cả team nhận thấy rằng cách tiếp cận này giảm thiểu vấn đề tích hợp và cho phép phát triển phần mềm nhanh hơn.

Một kịch bản CI bắt đầu bằng việc developer commit code lên repository (github chẳng hạn). Bất kỳ thay đổi nào cũng sẽ trigger một vòng đời CI. Các bước trong một kịch bản CI thường như sau:

* Đầu tiên, developer commit code lên repo.
* CI server giám sát repo và kiểm tra xem liệu có thay đổi nào trên repo hay không (liên tục, chẳng hạn mỗi phút 1 lần)
* Ngay khi commit xảy ra, CI server phát hiện repo có thay đổi, nên nó nhận code mới nhất từ repo và sau đó build, chạy unit và integration test
* CI server sẽ sinh ra các feedback và gửi đến các member của project
* CI server tiếp tục chờ thay đổi ở repo

Sử dụng CI, bạn sẽ tiết kiệm thời gian:
* Tốc độ hơn trong việc code và fixbug
* Tự tin rằng bạn xây dựng phần mềm ổn định với ít lỗi hơn
* Đảm bảo sản phẩm hoạt động được trên các máy khác nhau
* Loại bỏ rất nhiều chi phí  và cho phép bạn tập trung vào những gì quan trọng
* Giảm thời gian giải quyết xung đột
# 2. Demo
## Khởi tạo project có môi trường ảo
Clone project từ tài khoản github + cài đặt môi trường ảo, ở đây mình có 1 repository CalculatorLibrary
```
$ git clone git@github.com:ChiThanh93/CalculatorLibrary.git
$ cd CalculatorLibrary
$ virtualenv -p /usr/bin/python3.6 .env
Running virtualenv with interpreter /usr/bin/python3.6
Using base prefix '/usr'
New python executable in /home/nguyen.chi.thanh/workspace/CalculatorLibrary/.env/bin/python3.6
Also creating executable in /home/nguyen.chi.thanh/workspace/CalculatorLibrary/.env/bin/python
Installing setuptools, pkg_resources, pip, wheel...done.
```
ở máy của bạn phải được cài đặt python và virtualenv , phiên bản python phụ thuộc vào bạn lựa chon , ở đây mình chọn python 3.6

Viết một ví dụ python cơ bản:
ở đây mình có file calculator.py
``` python
"""
Calculator library containing basic math operations.
"""

def add(first_term, second_term):
    return first_term + second_term

def subtract(first_term, second_term):
    return first_term - second_term
```
Từ mục CalulatorLibrary sẽ có follow sau:
```
CalculatorLibrary/
|
├── .git
├── .gitignore
├── README.md
└── calculator.py
```
Viết Test:

Bước đầu tiên liên quan đến việc chạy một chương trình, để phân tích mã cho các lỗi tiềm ẩn. flake8 thường được sử dụng để kiểm tra xem mã của bạn có phù hợp với kiểu mã hóa Python chuẩn hay không. Đảm bảo mã của bạn dễ đọc cho phần còn lại của cộng đồng Python.

Bước thứ hai là unit testing. Một bài kiểm tra đơn vị được thiết kế để kiểm tra một chức năng hoặc đơn vị mã. Python đi kèm với một thư viện thử nghiệm đơn vị tiêu chuẩn, nhưng các thư viện khác tồn tại và rất phổ biến. Ví dụ này sử dụng pytest.

Một thực hành tiêu chuẩn đi đôi với thử nghiệm là tính toán phạm vi code (covered). Độ bao phủ của code là tỷ lệ phần trăm của code được bao phủ bởi các bài kiểm tra của bạn. pytest có một phần mở rộng, pytest-cov, giúp bạn hiểu phạm vi bảo hiểm mã của bạn.
```
$ pip install flake8 pytest pytest-cov
$ pip freeze > requirements.txt
```
Tạo file test cho hàm tính toán , file test_calculator.py
``` python
"""
Unit tests for the calculator library
"""

import calculator


class TestCalculator:

    def test_addition(self):
        assert 4 == calculator.add(2, 2)

    def test_subtraction(self):
        assert 2 == calculator.subtract(4, 2)
```
commit và đẩy code lên repo của bạn
## kết nối với CircleCI
CircleCI cần biết bạn chạy dự án như thế nào , yêu cầu format cụ thể. CircleCi yêu cầu 1 folder .circleic trong repo của bạn và 1 file config trong đó. File config bao gồm cấu trúc cho tất cả các bước để xây dựng server cần thiết để thực thi. CircleCi yêu cầu file có tên config.yml . File này sử dụng 1 ngôn ngữ khởi tạo dữ liệu , cụ thể có thể tìm hiểu như  [sau](http://yaml.org/spec/). Mục đích của YAML để cho người đọc được và làm việc tốt với ngôn ngữ lập trình chung. Ở file YAML có 3 cách để diễn tả dữ liệu:
* Mappings (key-value pairs)
* Sequences (lists)
* Scalars (strings or numbers)

Tạo 1 file config.yml trong thư mục .circleci tương ứng với project demo
```yaml
# Python CircleCI 2.0 configuration file
version: 2
jobs:
  build:
    docker:
      - image: circleci/python:3.6

    working_directory: ~/CalculatorLibrary

    steps:
      # Step 1: obtain repo from GitHub
      - checkout
      # Step 2: create virtual env and install dependencies
      - run:
          name: install dependencies
          command: |
            virtualenv -p python3.6 .env
            source .env/bin/activate
            pip install -r requirements.txt
      # Step 3: run linter and tests
      - run:
          name: run tests
          command: |
            source .env/bin/activate
            flake8 --exclude=.env* --statistics
            pytest -v --cov=calculator
```
Khởi tạo quản lý circleci tại trang https://circleci.com/ . Login bằng tài khoản github của bạn và kết nối khởi tạo 1 job tương ứng với repo CalculatorLibrary
Trang cũng sẽ tạo cho bạn file config.yml tương ứng với ngôn ngữ lập trình của dự án.

Push code lên và chạy thử thôi !!!
![](https://images.viblo.asia/eb1a9307-940a-42ed-aa00-a69f93925cbc.png)

Sẽ nhận được giao diện như trên , gặp 1 sỗ lỗi pep8 rồi. fix theo comment rồi đẩy lại là xong

![](https://images.viblo.asia/d28e55ca-0799-4cbe-b8d5-f9043e2e0d0c.png)
phần còn lại Continuous Deployment mình sẽ hẹn ở bài viết sau !!
Nguồn : https://realpython.com/python-continuous-integration/#next-steps