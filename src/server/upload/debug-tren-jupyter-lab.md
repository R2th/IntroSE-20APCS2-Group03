## Giới thiệu 
Jupyter là một công cụ mã nguồn mở miễn phí giúp mọi người học python dễ dàng hơn. Tên Jupyter xuất phát từ cách ghép Jupyter = Julia + Python + R. Và trước đó Jupyter bắt nguồn từ IPython, từ năm 2014 thì chuyển tên sang Jupyter. 

Chú ý: Jupyter Notebook và Jupyter Lab là hai thứ khác nhau nhé, về cơ bản JupyterLab là một "next-generation" bao gồm cả notebook.

Khi mới bắt đầu mình sử dụng jupyter notebook trước bởi đơn giản , nó chỉ là filebrowser với một notebook. Nếu mình cần sử dụng nhiều tính năng hơn thì chuyển sang JupyterLab.

Và chắc hẳn có nhiều bạn cũng đã sử dụng với jupyter lab để code và cũng đã nghĩ rằng muốn debug trên đây thì làm như thế nào. Ban đầu mình sử dụng cũng chưa biết cách sử dụng debug mà toàn đọc lạo code rồi mò từng logic, rồi print() các thứ.... xem code chạy ntn như thế thì rất bất tiện và lâu, quan trọng là thậm chí ko biết code đã được xử lý đến đâu và như thế nào. Nên mình đã tìm hiểu và sau đây mình xin giới thiệu với các bạn cách debug trên Jupyter.
Ngoài ra còn một số tip hay gồm các phím tắt trên jupyter các bạn có thể xem thêm ở [link](https://viblo.asia/p/mot-so-tips-khi-su-dung-jupyter-notebook-3P0lPqJv5ox) sau , sẽ rất hữu ích và cải thiện đáng kể trong quá trình code.

![](https://images.viblo.asia/d78b218e-d77a-4a09-9311-d685eefb4e89.png)

## Cài đặt và Debug
Đầu tiên ta sẽ install một môi trường sử dụng anaconda với python=3.8 ( các bạn có thể dùng version khác cũng ok, tùy vào dự án của các bạn thôi).
Vẫn là câu lệnh quen thuộc khi create một môi trường mới. 

```
conda create --name jupyter_with_debug python==3.8.2
```

Sau vài giây thì ta đã instal một môi trường riêng để install các thư viện phục vụ cho việc code.
Để activate môi trường vừa cài với version python=3.8.2 ta cài bên trên ta dùng câu lệnh:
```
conda activate jupyter_with_debug
```
Như vậy là ta đã vào môi trường, tiếp theo ta install **[xeus-python](https://github.com/jupyter-xeus/xeus-python)** một Kernel của Jupyter cho python, các bạn có thể xem thêm trong repo của nó.

```
conda install xeus-python notebook jupyterlab -c conda-forge
```

Cũng mất một khoảng thời gian khá lâu đấy ( hay do mạng mình kém ????) .Tiếp theo ta cài một extension cho jupyter debug web (font -end):

```
jupyter labextension install @jupyterlab/debugger
```

Cài cái này còn lâu hơn nữa @@. Sau khi cài xong run `jupyter lab` , khi đó sẽ show ra trình duyệt để ta code + debug trên đó.

![](https://images.viblo.asia/ed1e3f07-80e3-4d46-84b3-658093fa0841.png)

Ta sẽ click vào **xpython** . Các bạn có thể tùy chỉnh setting trên thanh tabar cho phù hợp. Ta sẽ để ý vào chỗ khoanh đỏ để start chế độ debug ,OK

![](https://images.viblo.asia/97120fd9-c0c2-4fe0-83dd-ba595065a17d.png)

Hãy thử code và debug xem cách sử dụng ntn. Khai báo một mảng có 3 phần tử và ta sẽ cho một vòng lặp qua mảng và print ra một chuỗi.Ta muốn debug chỗ nào thì ta click vào đoạn code đó.
Các bạn để ý ở vị trí mình vẽ số 1 đó chĩnh là biến i (số lượng phần tử trong mảng). Ta sẽ click vào vị trí thứ 2 thì nó sẽ lần lượt print ra chuỗi và tăng i.

![](https://images.viblo.asia/87a4841c-c4b9-4a52-930a-0c201f4ec825.png)

Kết quả là cuỗi **Viblo MayFest** sẽ được print ra 3 lần, bằng với số lượng phần tử của mảng hay chính là biến **i**.
Các bạn hãy tự thử với code của mình xem nó run từng bước như thế nào , cũng như hiểu rõ hơn nội dung code.

Ngoài debug thì xeus-python còn có tip khác như Error handling, Output streams,Input streams,..
* Error handling:

 ![](https://images.viblo.asia/35fd4e1b-e5a4-48eb-9b62-2769424b8c64.gif)
* Input Streams:

![](https://images.viblo.asia/dd4b7a1b-8a42-42f6-8529-7978b13a21ce.gif)

* And of course widgets:

```
from ipywidgets import IntSlider
slider = IntSlider()
slider
```

![](https://images.viblo.asia/4cc730bf-efa0-4d31-899b-23fbdfabd212.gif)

* Show video:
```
from ipywidgets import Video
video =  Video.from_video("link_video")
video
```
![](https://images.viblo.asia/91584fff-5285-4979-9270-64d3ff7c3b2c.gif)

Như vậy mình đã chia sẻ cách debug trên jupyter lab, và một số cách show code, cũng như link tip thường sử dụng . Hy vọng nó sẽ có ích cho bạn, giúp bạn debug, tìm bug dễ dàng hơn khi sử dụng Jupyter trong quá trình làm việc.

## Tài liệu
1. https://jupyter.org/
2. https://github.com/jupyter-xeus/xeus-python