###  Cài đặt Python
Để cài đặt Python lên máy tính, ta cần tải bộ cài Python tại https://www.python.org/downloads/ và cài theo hướng dẫn.

###  Cài đặt pip
> pip là công cụ quản lý các gói thư viện python (Python package manager). Với việc sử dụng pip, ta sẽ dễ dàng cài đặt các gói thư viện cần thiết trong quá trình làm việc với Python.
 
Nếu bạn sử dụng Python phiên bản từ 2.7.9 trở lên (đối với Python 2) hoặc 3.4 trở lên (với Python 3), mặc định pip đã được cài đặt sẵn cùng Python. Trong trường hợp bạn đáng sử dụng Python phiên bản thấp hơn như đã nêu ở trên, bạn cần cài đặt pip theo hướng dẫn từ trang chủ https://pip.pypa.io/en/stable/installing/

> Đề cập nhật pip hiện thời lên phiên bản mới nhất, bạn dùng câu lệnh

`python -m pip install --upgrade pip`
> Giới thiệu một số gói thư viện thông dụng cho Python
###  NumPy
Được tạo bởi Travis Oliphant, NumPy là một “ngựa kéo” phân tích thực sự của Python. Nó cung cấp cho người dùng cách làm việc với các mảng nhiều chiều, cùng một số lượng lớn các hàm để xử lý trên các toán tử toán học nhiều chiều trên các mảng đó. Mảng là các khối dữ liệu được sắp xếp theo nhiều chiều dựa trên các véc tơ và ma trận trong toán học. Mảng thường hữu ích không chỉ trong việc lưu dữ liệu mà cả việc tính toán nhanh các ma trận, điều không thể thiếu khi giải quyết các vấn đề liên quan đến khoa học dữ liệu.

> Cài đặt: pip install numpy

Trang chủ: http://www.numpy.org
###  SciPy
Là một dự án gốc bởi Travis Oliphant, Pearu Peterson, and Eric Jones, SciPy hoàn thiện các tính năng của NumPy, nhằm cung cấp các thuật toán cho đại số tuyến tính, không gian ma trận, xử lý tín hiệu và xử lý ảnh, tối ưu, biến đổi Fourier,…

> Cài đặt: pip install scipy

Trang chủ: http://www.scipy.org
### pandas
pandas là thư viện thực hiện mọi thứ mà NymPy và SciPy không thể làm. Nó làm việc với các đối tượng cấu trúc dữ liệu, DataFrames và Chuỗi (Series). pandas cho phép bạn có thể xử lý các bảng dữ liệu phức tạp của nhiều loại khác nhau (điều mà các mảng của NumPy thông thể làm được) và chuỗi thời gian. Bạn sẽ dễ dàng tải dữ liệu từ nhiều nguồn khác nhau, sau đó slide, dice, xử lý các thành phần còn thiếu, thêm, đổi tên, tổng hợp (aggregate), reshape và cuối cùng là trực quan dữ liệu theo ý của bạn.

> Cài đặt: pip install pandas

Trang chủ: http://pandas.pydata.org
### Scikit-learn
Bắt đầu như một phần của SciKits, Scikit-learn là lõi hoạt động của khoa học dữ liệu trên Python. Nó cung cấp tất cả những gì bạn cần để tiền xử lý dữ liệu, học giám sát và không giám sát, lựa chọn mô hình, validate và error metrics.

> Cài đặt: pip install scikit-learn

Trang chủ: http://scikit-learn.org/stable
### IPython
Một cách tiếp cận khoa học yêu cầu thử nghiệm nhanh các giả thuyết khác nhau trong một khoảng thời gian. IPython được tạo bởi Fernando Perez để giải quyết việc cần thiết một lệnh Shell Python (dựa trên shell, trình duyệt web, và giao diện ứng dụng) với đồ họa tích hợp, các lệnh có thể tùy chỉnh, lịch sử phong phú (dưới định dạng JSON) và khả năng tính toán song song để cải thiện hiểu năng tính toán.

> Cài đặt: pip install "ipython[notebook]"

Trang chủ: http://ipython.org
### Matplotlib
Được phát triển bởi John Hunte, matplotlib là một thư viện xây dựng các khối cần thiết để tạo các biểu đồ chất lượng từ mảng và trực quan và tương tác với chúng.

> Cài đặt: pip install matplotlib

Trang chủ: http://matplotlib.org
### Statsmodels
Trước đây là một phần của SciKits, Statsmodels bổ sung các tính năng thống kê cho SciPy. Nó bao gồm các mô hình tuyến tính tổng quát (generalized linear models), mô hình lựa chọn rời rạc (discrete choice models), phân tích chuỗi thời gian (time series analysis) và một chuỗi các thống kê mô tả như kiểm định tham số và kiểm định phi tham số (parametric and nonparametric tests).

> Cài đặt: http://statsmodels.sourceforge.net

Trang chủ: http://statsmodels.sourceforge.net