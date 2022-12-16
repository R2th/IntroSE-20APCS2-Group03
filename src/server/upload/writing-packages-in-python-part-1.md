Một package về cơ bản là một tập hợp các mô-đun Python. Các gói là một cách cấu trúc cả hai, nhiều gói cũng như các mô-đun, cuối cùng dẫn đến một hệ thống phân cấp dữ liệu được tổ chức tốt, làm cho các thư mục và mô-đun dễ dàng được truy cập. Bài viết này tập trung vào quá trình viết và phát hành các Python package. Ở đây, chúng ta sẽ xem làm thế nào để giảm thời gian cần thiết để thiết lập mọi thứ trước khi bắt đầu công việc thực sự. Cùng với đó, chúng tôi cũng sẽ khám phá cách thiết lập một quy trình chuẩn hóa để viết các package và dễ dàng sử dụng phương pháp phát triển dựa trên thử nghiệm.

### Technical Requirements

Trước khi đi sâu vào quy trình thực tế, trước tiên chúng ta hãy tải xuống tệp mã mà chúng ta sẽ sử dụng trong bài viết này. Nó có thể được tải xuống từ ([](https://github.com/PacktPublishing/Expert-Python-Programming-Third-Edition/tree/master/chapter7)).

*     twine
*     wheel
*     cx_Freeze
*     py2exe
*     pyinstaller

Các gói Python được đề cập trong bài viết này có thể được tải xuống từ PyPi như sau:

```
python3 -m pip install <package-name>
```

### Tạo một Package

Python packaging có thể hơi khó hiểu một chút vào lúc đầu. Lý do chính đằng sau đó là sự nhầm lẫn về các công cụ thích hợp để tạo các Python packages. Nhưng một khi package đầu tiên được tạo ra, bạn sẽ thấy nó không khó như tưởng tượng. Ngoài ra, biết các công cụ đóng gói hiện đại, phù hợp sẽ giúp ích rất nhiều.

Bạn nên biết cách tạo các package ngay cả khi bạn không quan tâm đến việc phân phối mã của mình dưới dạng nguồn mở. Biết cách tạo các package của riêng bạn sẽ giúp bạn hiểu rõ hơn về hệ sinh thái đóng gói và sẽ giúp bạn làm việc với mã của bên thứ ba có sẵn trên PyPI mà chúng tôi có thể đang sử dụng.

Ngoài ra, có sẵn dự án nguồn đóng hoặc các thành phần của nó dưới dạng các package phân phối nguồn có thể giúp triển khai mã trong các môi trường khác nhau. Ở đây, chúng tôi sẽ tập trung vào các công cụ và kỹ thuật phù hợp để tạo ra các bản phân phối như vậy.

### Tool được khuyên dùng


Hướng dẫn sử dụng Python Packaging đưa ra một vài gợi ý về các công cụ được đề xuất để làm việc với các package. Chúng thường có thể được chia thành hai nhóm sau:

>      Công cụ cài đặt package
>      Công cụ tạo và phân phối package


Các tiện ích được đề xuất bởi PyPA:

>      Sử dụng pip để cài đặt các gói từ PyPI.
>      Sử dụng virtualenv hoặc venv để cách ly mức ứng dụng của môi trường thời gian chạy Python.

Hướng dẫn sử dụng Python packaging đề xuất các công cụ để tạo và phân phối gói như sau:

>      Sử dụng setuptools để xác định dự án và tạo phân phối nguồn.
>      Sử dụng wheels thay cho eggs để tạo phân phối được xây dựng.
>      Sử dụng twine để tải lên các bản phân phối gói lên PyPI.


### Cấu hình cho Project

Cách dễ nhất để tổ chức mã của các ứng dụng lớn là chia chúng thành nhiều packages. Điều này làm cho mã đơn giản hơn, dễ hiểu hơn, dễ duy trì và thay đổi. Nó cũng tối đa hóa khả năng sử dụng lại mã của bạn. Các package riêng biệt hoạt động như các thành phần có thể được sử dụng trong các chương trình khác nhau.

setup.py

Thư mục gốc của package phải được phân phối có chứa tập lệnh setup.py. Nó định nghĩa tất cả các siêu dữ liệu như được mô tả trong mô-đun distutils. Gói siêu dữ liệu được thể hiện dưới dạng đối số trong lệnh gọi đến hàm setup() tiêu chuẩn. Mặc dù distutils là mô-đun thư viện tiêu chuẩn được cung cấp cho mục đích đóng gói mã, nhưng thực sự nên sử dụng các công cụ thiết lập thay thế. Gói setuptools cung cấp một số cải tiến so với mô đun distutils tiêu chuẩn.

Do đó, nội dung tối thiểu cho tệp này như sau:

```python 
from setuptools import setup

setup(
    name='mypackage',
)
```

name cho tên đầy đủ của gói. Từ đó, tập lệnh cung cấp một số lệnh có thể được liệt kê với tùy chọn --help-commands, như được hiển thị trong đoạn mã sau:

```python 
$ python3 setup.py --help-commands
Standard commands:
build build everything needed to install
clean clean up temporary files from 'build' command
install install everything from build directory
sdist create a source distribution (tarball, zip file, etc.)
registerregister the distribution with the Python package index
bdist create a built (binary) distribution
check perform some checks on the package
uploadupload binary package to PyPI

Extra commands:
bdist_wheel create a wheel distribution
alias define a shortcut to invoke one or more commands
develop install package in 'development mode'

usage: setup.py [global_opts] cmd1 [cmd1_opts] [cmd2 [cmd2_opts] ...]
or: setup.py --help [cmd1 cmd2 ...]
or: setup.py --help-commands
or: setup.py cmd --help
```

Danh sách các lệnh thực tế dài hơn và có thể thay đổi tùy thuộc vào các phần mở rộng setuptools có sẵn. Nó đã bị cắt ngắn để chỉ hiển thị những thứ quan trọng nhất và có liên quan đến bài viết này. Các lệnh tiêu chuẩn là các lệnh tích hợp được cung cấp bởi distutils, trong khi các lệnh bổ sung là các lệnh được cung cấp bởi các package của bên thứ ba, chẳng hạn như setuptools hoặc bất kỳ package nào khác xác định và đăng ký một lệnh mới. Ở đây, một lệnh bổ sung như vậy được đăng ký bởi package khác là bdist_wheel, được cung cấp bởi wheel package.

### setup.cfg

Tệp setup.cfg chứa các tùy chọn mặc định cho các lệnh của tập lệnh setup.py. Điều này rất hữu ích nếu quá trình xây dựng và phân phối package phức tạp hơn và yêu cầu nhiều đối số tùy chọn được truyền cho các lệnh setup.py script. Tệp setup.cfg này cho phép bạn lưu trữ các tham số mặc định như vậy cùng với mã nguồn của bạn trên cơ sở từng dự án. Điều này sẽ làm cho luồng phân phối của bạn độc lập với dự án và cũng cung cấp sự minh bạch về cách package của bạn được xây dựng / phân phối cho người dùng và các thành viên khác trong nhóm.

Cú pháp của tệp setup.cfg giống như được cung cấp bởi mô-đun cấu hình có sẵn, do đó, nó tương tự như các tệp Microsoft Windows INI phổ biến. Dưới đây là một ví dụ về tệp cấu hình setup.cfg cung cấp một số giá trị mặc định của lệnh toàn cầu, sdist và bdist_wheel:

```python 
[global] 
quiet=1 
 
[sdist] 
formats=zip,tar 

[bdist_wheel] 
universal=1
```

Cấu hình ví dụ này sẽ đảm bảo rằng các bản phân phối nguồn (phần sdist) sẽ luôn được tạo ở hai định dạng (ZIP và TAR) và các bản phân phối wheel được xây dựng (phần bdist_wheel) sẽ được tạo dưới dạng các wheel phổ biến độc lập với phiên bản Python. Ngoài ra, hầu hết các đầu ra sẽ bị chặn trên mọi lệnh bởi công tắc toàn cầu --quiet. Lưu ý rằng tùy chọn này được bao gồm ở đây chỉ cho mục đích trình diễn và nó có thể không phải là một lựa chọn hợp lý để triệt tiêu đầu ra mặc định cho mọi lệnh.

### MANIFEST.in

Khi xây dựng một bản phân phối với lệnh sdist, mô-đun distutils duyệt thư mục package tìm kiếm các tệp để đưa vào kho lưu trữ. Theo mặc định distutils sẽ bao gồm những điều sau đây:

>     Tất cả các tệp nguồn Python được implied bởi các đối số py_modules, package và script
>     Tất cả các tệp nguồn C được liệt kê trong đối số ext_modules
>     Các tệp khớp với kiểm tra / kiểm tra mẫu toàn cầu * .py
>     Các tệp có tên README, README.txt, setup.py và setup.cfg

Ngoài ra, nếu package của bạn được phiên bản với hệ thống kiểm soát phiên bản như Subversion, Mercurial hoặc Git, có khả năng tự động bao gồm tất cả các tệp được kiểm soát phiên bản bằng cách sử dụng các tiện ích mở rộng setuptools như setuptools-svn, setuptools-hg và setuptools -git. Tích hợp với các hệ thống kiểm soát phiên bản khác cũng có thể thông qua các tiện ích mở rộng tùy chỉnh khác. Bất kể đó là chiến lược bộ sưu tập tích hợp mặc định hay chiến lược được xác định bởi tiện ích mở rộng tùy chỉnh, sdist sẽ tạo một tệp MANIFEST liệt kê tất cả các tệp và sẽ đưa chúng vào kho lưu trữ cuối cùng.

Giả sử bạn không sử dụng bất kỳ tiện ích mở rộng bổ sung nào và bạn cần đưa vào phân phối gói của mình một số tệp không được chụp theo mặc định. Bạn có thể xác định một mẫu có tên MANIFEST.in trong thư mục gốc gói của bạn (cùng thư mục với tệp setup.py). Mẫu này chỉ thị lệnh sdist trên các tệp cần bao gồm.

Mẫu MANIFEST.in này xác định một quy tắc bao gồm hoặc loại trừ trên mỗi dòng:

```python
include HISTORY.txt 
include README.txt 
include CHANGES.txt 
include CONTRIBUTORS.txt 
include LICENSE 
recursive-include *.txt *.py
```

Danh sách đầy đủ các lệnh MANIFEST.in có thể được tìm thấy trong tài liệu chính thức của distutils.

### Những Metadata quan trọng nhất

Bên cạnh tên và phiên bản của package được phân phối, các đối số quan trọng nhất mà hàm setup() có thể nhận được như sau:

>     description: Điều này bao gồm một vài câu để mô tả package.
>     long_description: Điều này bao gồm một mô tả đầy đủ có thể bằng reSturationuredText (mặc định) hoặc các ngôn ngữ đánh dấu được hỗ trợ khác.
>     long_description_content_type: điều này xác định loại mô tả dài MIME; nó được sử dụng để báo cho kho lưu trữ package loại ngôn ngữ đánh dấu nào được sử dụng cho mô tả package.
>     keywords: Đây là danh sách các từ khóa xác định package và cho phép lập chỉ mục tốt hơn trong kho package.
>     author: Đây là tên của tác giả hoặc tổ chức trọn gói chăm sóc nó.
>     Author_email: Đây là địa chỉ email liên hệ.
>     url: Đây là URL của dự án.
>     license: Đây là tên của giấy phép (GPL, LGPL, v.v.) theo đó package được phân phối.
>     packages: Đây là danh sách tất cả các tên package trong phân phối gói; setuptools cung cấp một hàm nhỏ gọi là find_packages có thể tự động tìm tên package để đưa vào.
>     namepace_packages: Đây là danh sách các gói không gian tên trong phân phối package.

### Trove Classifiers

PyPI và distutils cung cấp một giải pháp để phân loại các ứng dụng với bộ phân loại được gọi là trove classifiers. Tất cả các phân loại trove tạo thành một cấu trúc giống như cây. Mỗi chuỗi phân loại xác định một danh sách các không gian tên lồng nhau trong đó mọi không gian tên được phân tách bằng ::substring. Danh sách của chúng được cung cấp cho định nghĩa package dưới dạng đối số phân loại của hàm setup ().

Dưới đây là danh sách ví dụ về các trình phân loại được lấy từ dự án solrq có sẵn trên PyPI:

```python 
from setuptools import setup 
 
setup( 
    name="solrq", 
    # (...) 
 
    classifiers=[ 
        'Development Status :: 4 - Beta', 
        'Intended Audience :: Developers', 
        'License :: OSI Approved :: BSD License', 
        'Operating System :: OS Independent', 
        'Programming Language :: Python',
```

Các trình phân loại Trove hoàn toàn tùy chọn trong định nghĩa package nhưng cung cấp một phần mở rộng hữu ích cho siêu dữ liệu cơ bản có sẵn trong giao diện setup (). Ngoài ra, các trình phân loại trove có thể cung cấp thông tin về các phiên bản Python được hỗ trợ, các hệ điều hành được hỗ trợ, giai đoạn phát triển của dự án hoặc giấy phép theo đó mã được phát hành. Nhiều người dùng PyPI tìm kiếm và duyệt các gói có sẵn theo danh mục để phân loại thích hợp giúp các gói đạt được mục tiêu của họ.

Phân loại Trove phục vụ một vai trò quan trọng trong toàn bộ hệ sinh thái bao bì và không bao giờ được bỏ qua. Không có tổ chức nào xác minh phân loại package, do đó, bạn có trách nhiệm cung cấp các phân loại thích hợp cho các package của mình và không đưa ra sự hỗn loạn cho toàn bộ chỉ mục package.

Hiện tại, có 667 phân loại có sẵn trên PyPI được nhóm thành chín loại chính sau:

    Development status
    Environment
    Framework
    Intended audience
    License
    Natural language
    Operating system
    Programming language
    Topic

Danh sách này ngày càng phát triển và các phân loại mới được thêm vào theo thời gian. Do đó, có thể là tổng số của chúng sẽ khác nhau tại thời điểm bạn đọc này. Danh sách đầy đủ các phân loại trove hiện có sẵn ở đây.

### Các patterns phổ biến

Tạo một package để phân phối có thể là một nhiệm vụ tẻ nhạt cho các nhà phát triển thiếu kinh nghiệm. Hầu hết các siêu dữ liệu mà setuptools hoặc distuitls chấp nhận trong lệnh gọi hàm setup() của chúng có thể được cung cấp theo cách thủ công mà bỏ qua thực tế là siêu dữ liệu này cũng có thể có sẵn trong các phần khác của dự án. Đây là một ví dụ:

```python 
from setuptools import setup 
 
setup( 
    name="myproject", 
    version="0.0.1", 
    description="mypackage project short description", 
    long_description=""" 
        Longer description of mypackage project 
        possibly with some documentation and/or 
        usage examples 
    """, 
    install_requires=[ 
        'dependency1', 
        'dependency2', 
        'etc', 
    ] 
)
```


Một số yếu tố siêu dữ liệu thường được tìm thấy ở những nơi khác nhau trong một dự án Python điển hình. Ví dụ, nội dung mô tả dài thường được bao gồm trong tệp README của dự án và đó là một quy ước tốt để đặt một bộ xác định phiên bản trong mô-đun __init__ của gói. Mã hóa cứng như siêu dữ liệu package như chức năng setup() dự phòng cho dự án cho phép dễ dàng mắc lỗi và không nhất quán trong tương lai. Cả setuptools và distutils đều không thể tự động chọn thông tin siêu dữ liệu từ các nguồn dự án, do đó bạn cần phải tự cung cấp. Có một số mô hình phổ biến trong cộng đồng Python để giải quyết các vấn đề phổ biến nhất như quản lý phụ thuộc, bao gồm phiên bản / readme, v.v. Điều đáng để biết ít nhất là một vài trong số chúng bởi vì chúng phổ biến đến mức chúng có thể được coi là thành ngữ đóng gói.