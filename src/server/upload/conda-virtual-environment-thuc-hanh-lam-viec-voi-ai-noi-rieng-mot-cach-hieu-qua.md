Chắc hẳn với những ai đã và đang làm việc trong lĩnh vực AI không còn quá xa lạ với conda - một package manager và environment manager vô cùng hữu ích trong công việc. Đứng trên góc nhìn một người mới tiếp cận AI cũng như hiện tại cũng chưa có bài viết nào trên Viblo về chủ để này, vì vậy hôm nay mình xin phép chia sẻ một số thứ quan trọng về conda giúp ích cho mọi người trong công việc, giúp mọi người có thể khởi tạo, sử dụng conda một cách hiệu quả

![image.png](https://images.viblo.asia/3694d7cc-6c1c-437c-97f2-6a59c2fb276d.png)

# Conda virtual environment là gì?
Trước hết thì conda là một package manager và environment manager được viết bằng python và có thể sử dụng nhiều ngôn ngữ khác nhau. Nó có thể:
* Tạo và quản lý các môi trường
* Tìm kiếm, cài đặt packages vào một môi trường có sẵn giúp dễ dàng quản lý, kiểm soát các packages

Còn về virtual environment, hiểu đơn giản là một thư mục nằm trên máy tính để chạy các tập lệnh ở một vị trí biệt lập. Ta có khả năng tạo ra nhiều môi trường ảo khác nhau, mỗi môi trường sẽ được cách ly, biệt lập với nhau

Có tương đối nhiều dịch vụ khác nhau cung cấp cho bạn để tạo môi trường ảo, đối với Python thì có 2 cách phổ biến nhất mình hay dùng (cũng thấy mn đề cập chủ yếu) đó là Pip và Conda. 
* Pip: cấp quyền truy cập vào phạm vi rộng hơn có sẵn trên Pypi (https://pypi.org/ )
* Conda: Cho phép truy cập vào phạm vi gói tương đối nhỏ hơn có sẵn trên trang chủ của nó (https://docs.conda.io/projects/conda/en/latest/user-guide/concepts/channels.html )

Đó là lý do về sau có 1 số package bạn không cài bằng conda được nhưng pip thì được. (Cái này thì về sau mình sẽ nói rõ hơn về việc có thể cài bằng pip trong conda environment)

# Tại sao cần sử dụng môi trường ảo hóa (Virtual Environments)
Sau khi giới thiệu qua về Conda virtual environment, có lẽ các bạn cùng đoán ra phần nào được tính ứng dụng cao của nó. Với việc bạn có khả năng tạo nhiều môi trường ảo khác nhau, mỗi môi trường sẽ được cách ly với nhau thì điều này cho phép bạn chạy các dự án và mã của mình với nhiều gói khác nhau trong các phiên bản khác nhau.

Ví dụ như trong quá trình làm việc với một dự án cũ A, các phiên bản packages sẽ cũ, mà thường những packages cũ sẽ thường khác biệt với phiên bản mới hơn, dễ xung đột khi chạy. Theo cách thủ công, ta phải cài đặt lại môi trường hoàn toàn tương thích. Đấy là packages nghe đã muốn mệt lả rồi, nhưng các bạn nghĩ xem đang dùng Python 3.x lại còn phải lùi xuống python 2.x thì … thôi toang, lẫn lộn hết cả. Và conda xuất hiện như một giải pháp tuyệt vời cho việc này

Conda cho phép ta tạo ra một môi trường riêng biệt, độc lập với máy tính cũng như độc lập với các môi trường khác. Tức là bạn có thể tạo ra 2 môi trường với python 2.x, 2 môi trường với python 3.x, sau này có việc cần dùng mà phù hợp với môi trường mình đã tạo thì có thể dùng luôn mà không cần khởi tạo lại. Hay việc cập nhật package trên môi trường này không hề gây ảnh hưởng tới các môi trường khác.
Đối với conda, nó có thể sử dụng kết hợp với pip. ĐIều này sẽ giúp chúng ta dễ tiếp cận hơn trong việc cài đặt các packages, tuy nhiên thì mình đọc được là chúng ta được khuyến cáo chỉ dùng pip trong conda khi cần thiết để đảm bảo cho độ tương thích

# Một chút về Conda
Conda là một packages manager vì vậy nó có thể cài đặt, cập nhật hay gỡ bỏ các gói, tương tử là một environment manager, nó quản lý các môi trường ảo
* Anaconda: Anaconda là bản phân phối các ngôn ngữ lập trình Python và R cho tính toán khoa học, nhằm mục đích đơn giản hóa việc quản lý và triển khai gói. Bản phân phối bao gồm các gói khoa học dữ liệu phù hợp với Windows, Linux và macOS. Bằng cách cài đặt Anaconda, bạn nhận được Miniconda, Anaconda Navigator (tức là một giao diện người dùng đồ họa) và lựa chọn được quản lý của các gói được cài đặt
* Miniconda: miniconda là một phiên bản quy mô nhỏ của Anaconda, thường nhẹ hơn Anaconda, mình hay thấy mọi người dùng miniconda khi dùng Ubuntu bởi tính nhẹ của nó

![image.png](https://images.viblo.asia/25b3cab8-d0ca-41f7-86c7-4a2a91db1b6e.png)

# Cài đặt Conda
Để sử dụng được conda, trước tiên phải cài đặt được conda lên máy tính của bạn. Mình có kinh nghiệm cài đặt Conda trên Window và Ubuntu rồi nên sẽ chia sẻ hướng dẫn mà mình đã thử thành công cho mọi người
* Window: https://nttuan8.com/huong-dan-cai-dat-anaconda/ 
* Linux/Ubuntu: https://phoenixnap.com/kb/how-to-install-anaconda-ubuntu-18-04-or-20-04 

Đối với window, khi bạn muốn check conda bằng terminal sẽ gặp lỗi kiểu không nhận conda, lý do bởi bạn chưa add conda path và biến môi trường trong window (environment path) để gọi. Các bạn có thể xem ở đây  https://www.geeksforgeeks.org/how-to-setup-anaconda-path-to-environment-variable/ 
Đối với Ubuntu, sau khi cài đặt thành công sẽ có thêm “(base)” ở đầu dòng lệnh thông báo hiện đang trong môi trường cơ bản của conda

![image.png](https://images.viblo.asia/bb0e21e9-8f4b-40e3-bebf-a27cc40e870c.png)
# Khởi tạo môi trường, cài đặt packages
* Để khởi tạo môi trường riêng biệt, bạn mở terminal / command line lên, sau đó gõ cú pháp sau để khởi tạo môi trường
```
conda create -n <env_name> python=<python_version> 
```
Trong đó env_name là tên môi trường, còn python_version là version python bạn muốn dùng trong môi trường đó. Ví dụ
```
conda create -n torch-env python=3.8 
```
Sau khi chạy lệnh trên đợi 1 lát sẽ có thông báo xem bạn muốn cài đặt không, gõ y (yes)
![image.png](https://images.viblo.asia/1871e0a9-6f54-44d3-a68f-1c8f0e56af3b.png)
Sau khi cài đặt xong, bạn vẫn chưa thực sử đang trong môi trường bạn vừa cài. Việc dễ thấy nhất là bạn vẫn thấy “(base)” ở đầu command. Bạn cần activate môi trường này lên để sử dụng bằng lệnh sau
```
conda activate <env_name>
```
Ví dụ
```
conda activate torch-env
```
Lúc này bạn sẽ thấy có “(torch-env)” ở đầu command

![image.png](https://images.viblo.asia/acf950e1-bfe0-4ce2-88a5-2dc702f14306.png)

Để vô hiệu hóa môi trường, gõ lệnh 
```
conda deactivate
```

Để xóa môi trường
```
conda env remove -n <env_name>
```

Để liệt kê các environments đã được cài đặt 
```
Conda env list
```

Để liệt kê danh sách packages cũng như version tương ứng
```
conda list
```

Để cài đặt một package 
```
conda install <package_name>
hoặc 
conda install <package_name>==<version>
```

Update package
```
conda update <package_name>
```

Loại bỏ packages trong một môi trường bất kì
```
conda remove -n <name_env> <name_package>
```

Loại bỏ packages trong môi trường hiện tại
```
conda remove <name_package>
```

# Tổng kết
Trên đây là một số giới thiệu về Conda virtual environment cũng như cách cài đặt và sử dụng nó. Có thể bài viết của mình chưa thực sự đầy đủ nhưng hiện tại như cá nhân mình sử dụng thì các mục trên đã đủ phục vụ công việc của mình. Hồi mình mới bước vào AI cũng tìm đủ các nguồn để cài đặt Conda, xem nó là gì, … lộn xộn phết nên mình mong bài viết này của mình sẽ giúp đỡ được các bạn phần nào trong việc tiếp xúc với AI và triển khai nó

Cuối tuần rồi, relax and chill thôi ^^

# Tài liệu tham khảo
* [Anaconda](https://www.anaconda.com/)
* [Comprehensive Guide to Python Virtual Environments using Conda for Data Scientists ](https://towardsdatascience.com/comprehensive-guide-to-python-virtual-environments-using-conda-for-data-scientists-6ebea645c5b)
* [Introduction to Conda virtual environments](https://towardsdatascience.com/introduction-to-conda-virtual-environments-eaea4ac84e28)