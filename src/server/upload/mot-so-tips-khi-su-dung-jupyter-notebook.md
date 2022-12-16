Xin chào mọi người! Thực ra mình cũng muốn viết bài này khá là lâu từ cái lúc bắt đầu học ML, DL mình đã vật lộn mãi với Jupyter-Notebook, việc code trên Jupyter khá là trực quan, tuy nhiên với những người mới bắt đầu thì khá là bỡ ngỡ với các phím tắt ở Jupyter ví dụ như làm sao có thể chạy dòng này hay dòng kia, ... . Do vậy mình muốn viết bài này với mục đích chia sẻ cho những người mới bắt đầu làm quen với code trên Jupyter. Hi vọng nó sẽ hữu ích :D. 
# 1. Phím tắt trong Jupyter 
Đầu tiên  để làm việc với jupyter notebook dễ dàng hơn chúng ta cần phải biết một vài phím tắt cơ bản. Đầu tiên bạn nhấn phím H để show ra tất cả các phím tắt được cài đặt sẵn ở trên Jupyter notebook. Tuy  nhiên nếu bạn muốn chỉnh sửa các phím tắt theo ý muốn của mình thì bạn có thể click vào edit shortcut nhé. 

![](https://images.viblo.asia/a53e00a1-567c-4cf9-b995-5a75202c9b4c.png)
Hình 1a. Các phím tắt trong Jupyter
![](https://images.viblo.asia/accf4ece-9251-43c6-86e0-1eef52876b98.png)
Hình 1b. Các phím tắt trong Jupyter

Sau khi nhấn phím H thì bạn sẽ nhìn thấy các phím tắt như trên 2 hình 1a và hình 1b. 

# 2. Hiển thị nhiều output
Một vấn đề hay gặp phải là Jupyter notebook chỉ show ra một đầu ra cuối cùng như ví dụ dưới đây. 

![](https://images.viblo.asia/10746850-365f-468b-9979-dc7894e372ff.PNG)
Hình 2a: show ra duy nhất một output

Tuy nhiên  như vậy khá là bất tiện nếu bạn muốn show a và b cùng 1 lúc thì bạn phải dùng lệnh *print* hoặc chạy từng dòng lệnh với biến a và b.  Hãy thêm dòng lệnh dưới đây nhé. 

```
from IPython.core.interactiveshell import InteractiveShell
InteractiveShell.ast_node_interactivity = "all"
```
Chúng ta sẽ được kết quả như hình 2b dưới đây. 

![](https://images.viblo.asia/291fd5a3-3c81-4c9d-a1e4-e03d50646c7e.PNG)
Hình 2b: show multiple output


# 3. Có thể thực thi các command shell trực tiếp ở trong jupyter notebook
Bạn chỉ cần thêm **!** vào trước khi bắt đầu lệnh. 

```
!pip install pandas
```

# 4. Tính toán thời gian thực hiện cell

Sử dụng `%%time` để tính toán thời gian thực hiện một cell như hình 3 dưới đây

![](https://images.viblo.asia/e5d02d39-1ffb-448a-89d6-33de1f48c01c.PNG)
Hình 3: tính toán thời gian thực hiện cell như thế nào? 


# 5. Show method documentation 
Khi mà bạn không nhớ một hàm cần những  param  nào thì bạn nên thực hiện: *shift + tab* để xem lại doc của nó. 

![](https://images.viblo.asia/6f01eee7-82ce-4717-b03b-72d224ec3cfa.png)
hình 4a: xem doc của một hàm bằng shift + tab

Hoặc bạn có thể sử dụng dấu **?** để xem doc của hàm đó như hình 4b bên dưới:

![](https://images.viblo.asia/6c4d878f-7a6d-4627-937f-c27ddc8eb923.PNG)
Hình 4b: sử dụng dấu **?**

# 6. Mở rộng số lượng rows và cols khi hiển thị bảng 
Có một vấn đề mình cũng hay gặp phải là pandas  đặt giới hạn rows và cols khi hiển thị table tuy nhiên mình  có thể tự set lại theo ý của bản thân như sau: 

```
import pandas as pd
pd.set_option('display.max_rows', 500)
pd.set_option('display.max_columns', 500)
```

Bạn có thể thay 500 hay 1000 hoặc hơn nữa :D 

# 7.  Ẩn text khi sử dụng matplotlib

Khi bạn dùng matplotlib để show biểu đồ thường sẽ có 1 dòng bên trên như hình 5a bên dưới: 

![](https://images.viblo.asia/f6b0fa87-c35f-49a0-b4ae-ace49daebfc4.png)
Hình 5a:  Text khi sử dụng matplotlib

Tuy nhiên nếu bạn cảm thấy không thích thú với dòng  text đó thì có thể ẩn đi như hình 5b dưới đây: 

![](https://images.viblo.asia/ad2b6fc6-4f87-4593-a09e-0392d24ea4ad.png)
Hình 5b: ẩn text
# 6. Sử dụng magic command

Chúng ta thường hay dùng lệnh: `%mathplotlib inline` là câu lệnh của Jupyter Notebook để vẽ được các đồ thị bên trong cell của Jupyter Notebook. Khi sử dụng magic command thì việc thao tác trên kernel của jupyter notebook sẽ trở nên đơn giản hơn . 

Các lệnh magic command trong jupyter notebook 

```
%pwd #print thư mục đang làm việc hiện tại
%cd #thay đổi thư mục đang làm việc hiện tại
%ls #hiển thị ra các file có trong thư mục 
%load [insert Python filename here] #load code vào trong Jupyter notebook
%who #use %liệt kê tất cả các biến
```

# Kết luận
Cảm ơn mọi người đã đọc bài viết của mình ạ. Rất mong nhận được sự góp ý từ mọi người ạ. 
# Reference 
https://www.dataquest.io/blog/jupyter-notebook-tips-tricks-shortcuts/