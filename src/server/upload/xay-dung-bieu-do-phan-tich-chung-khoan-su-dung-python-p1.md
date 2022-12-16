Hôm nay chúng ta sẽ cùng nhau tạo một website phân tích chỉ số thị trường chứng khoán của Alphabet Inc (thuộc Google), sử dụng Python và một số thư viện hỗ trợ:
1. [pandas](https://pandas.pydata.org/): Pandas là một thư viện mã nguồn mở cung cấp các cấu trúc dữ liệu và các công cụ phân tích dữ liệu hiệu suất cao, dễ sử dụng cho ngôn ngữ lập trình Python.
1. [pandas-datareader](https://pandas-datareader.readthedocs.io/en/latest/): Thay vì phải dùng trình duyệt truy cập trang web có chứa datasource để tải về, thư viện này hỗ trợ việc tải về dữ liệu thị trường chứng khoán chạy trên nền ngôn ngữ Python dưới dạng [dataframe](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.html).
1. [bokeh](https://docs.bokeh.org/en/latest/index.html): Thư viện hỗ trợ visualize data, thay vì những con số khô khốc, bokeh giúp chúng ta trực quan hoá dữ liệu.

Prerequisite cho bài viết này tất nhiên là bạn phải có một kiến thức cơ bản về ngôn ngữ Python và một chút về jupyternotebook - ứng dụng chạy trên nền web cho phép chạy interactive python, nếu không bạn cũng có thể đọc lướt qua như một sự tò mò và dò xét xem "Python liệu làm được trò trống gì?". OK. let's move on!
## 1. Cài đặt pandas_datareader để get dữ liệu
Như đã giới thiệu từ trước, cách thường lệ mà chúng ta vẫn làm khi kiếm data là sử dụng web browser, lên google gõ keyword cần tìm, đến trang web cung cấp datasource và thực hiện tải về, song với sử dụng thư viện pandas_datareader và Python, bạn có thể tải trực tiếp mà không cần dùng đến bất kì browser nào. Thời gian trước, pandas_datareader chỉ là một module trong pandas library, nhưng hiện tại nó đã một standalone library.

Để cài đặt thư viện trên môi trường Windows, bạn chỉ cần gõ trên command, ở đây mình đã cài đặt sẵn:

`pip install pandas_datareader`

![pandas_datareader install](https://images.viblo.asia/096275a5-ab86-42c7-a070-9a803936051d.jpg)

## 2. Tạo file code trên jupyer notebook
### Get data from datasource
Với những ai chưa biết/chưa từng nghe tới, jupyer notebook là một ứng dụng chạy trên nền web cho phép chạy interactive python, tương tự như một IDE vậy.
Mình tạo mới một file và đặt tên là stock_analysis.py
![](https://images.viblo.asia/53cb4957-6faf-4567-84f1-4d6c10775b9e.jpg)

Tiếp theo, chúng ta sẽ chọn một mã chứng khoán để phân tích, mình thích GOOGLE nên chúng ta sẽ chọn GOOGLE để phân tích, mã chứng khoán tương ứng cho công ty này là GOOG, bạn có thể chọn bất kì công ty nào khác tuỳ thích miễn là công ty đấy có bán cổ phiếu trên sàn chứng khoán

![](https://images.viblo.asia/27cb43b7-6281-4d3a-8e3a-cea09a4b4fd4.JPG)

Đầu tiên chúng ta cần require hai thư viện cần thiết là pandas_datareader và datetime, sau đó thực hiện get dữ liệu. 
DataReader nhận vào 4 tham số lần lượt là:
- name: tên mã chứng khoán của công ty mà bạn muốn get (stock symbol)
- datasource: nguồn dữ liệu, bạn có thể chọn nguồn dữ liệu từ các nhà cung cấp, ngoài yahoo thì chúng ta còn có thêm một số kho dữ liệu về finance khác như google, fred, quandl, worldbank,...
- start: thời gian bắt đầu
- end: thời gian kết thúc

Dữ liệu thu về là một bảng hai chiều dạng data-frame. Nếu bạn không có kiến thức về các chỉ số trong bảng, đừng lo mình sẽ giới thiệu trong phần tiếp theo.

OK, đã thu được một chút thành quá là một bảng với chi chít số, chúng ta sẽ tiếp tục phân tích bảng dữ liệu, ý nghĩa của các dòng, cột, các con số

* Nếu bản để ý hơn, bạn sẽ nhận ra bảng trên bị miss 4 ngày (07 & 08/12/2019 + 14 & 15/12/2019). Lý do hết sức đơn giản, sàn chứng khoán theo thường lệ chỉ mở vào các ngày làm việc trong tuần từ thứ hai đến thứ sáu, thế nên sẽ không có dữ liệu cho những ngày cuối tuần.

![](https://images.viblo.asia/80f6876c-9f2f-40be-9a6e-77edf7419572.jpg)
* High column: mức giá bán cao nhất trong ngày
* Low column: mức giá bán thấp nhất trong ngày
* Open column: mức giá lúc bắt đầu mở cửa
* Close clumn: mức giá chốt lúc đóng cửa
* Volume: khối lượng giao dịch (volume) là số lượng đơn vị cổ phiếu được giao dịch trong ngày

Trong phạm vi bài viết này mình chỉ giới thiệu sơ qua về các cột, chúng ta sẽ chỉ sử dụng các cột High, Low, Open, Close mà thôi.

### Visualize data using candlestick chart
Okay, đầu tiên chúng ta sẽ nhìn qua kết quả mà chúng ta hướng đến, trả lời cho câu hỏi: How the output looks like?
![chart](https://images.viblo.asia/2e42ac68-e5b7-48a8-aa48-4e5de32363c8.png)

Nếu bạn chưa biết về candlestick thì có thể xem thêm chú thích ở [đây nhé](https://en.wikipedia.org/wiki/Candlestick_chart):
![candle_stick](https://images.viblo.asia/034877b5-4829-45fa-a392-cb2a5b297a78.png)

Mình tạo một hàm mới có tên là inc_des() với input là chỉ số close và open của từng ngày và output là kết quả so sánh hai giá trị: Increase, Decrease hay Equal
Sau đó thêm từ các chỉ số trong bảng, ta thêm cột Status với các trạng thái tương ứng được trả về từ hàm inc_dec():
```
def inc_dec(c, o):
    if c > o:
        value="Increase"
    elif c < o:
        value="Decrease"
    else:
        value="Equal"
    return value

df["Status"]=[inc_dec(c,o) for c, o in zip(df.Close,df.Open)]
```

Lúc này, một cột mới với tên cột là "Status" được add vào dataframe:
![status_added](https://images.viblo.asia/87f1bb3b-b809-4fa4-91d7-068f9bee0780.png)


Chúng ta sẽ bắt đầu việc xây dựng hệ trục tọa độ cho biểu đồ bằng hàm figure
```
p = figure(x_axis_type='datetime', width=1000, height=300)
p.title.text = "Candlestick Chart"
```
Tiếp tục dựng các hình chữ nhật (thân nến - rectangle) bằng hàm rect() với tọa độ của hình chữ nhật được xác định như sau
Toạ độ x được xác định bằng đúng ngày xét đến trên trục OX, tọa độ trên và dưới của hình chữ nhật được xác định bằng chỉ số open và close, có nghĩa là tâm của hình chữ nhật trên trục Oy sẽ bằng giá trung bình của Open và Close, mình thêm một cột có tên là Middle để tính giá trị trung bình nói trên và một cột Height để tính chiều cao của hình chữ nhật.
```
df["Middle"] = (df.Open+df.Close)/2
df["Height"] = abs(df.Close-df.Open)
```
![](https://images.viblo.asia/1a121849-76ad-4641-aa1c-63cf40cb2ba5.png)


Theo thường lệ, những ngày giá trị của cổ phiếu tăng (close > open), biểu đồ sẽ hiển thị bằng màu xanh, ngược lại người ta thường biểu diễn bằng màu đỏ ( =)) thị trường đẫm máu) nên ta sẽ tách riêng câu lệnh vẽ hình chữ nhật cho ngày tăng và cho ngày giảm thành hai câu lệnh riêng biệt như sau:

```
#tăng
p.rect(df.index[df.Status=="Increase"],df.Middle[df.Status=="Increase"],
   hours_12, df.Height[df.Status=="Increase"],fill_color="#CCFFFF",
   line_color="black")
#giảm
p.rect(df.index[df.Status=="Decrease"],df.Middle[df.Status=="Decrease"],
   hours_12, df.Height[df.Status=="Decrease"],fill_color="#FF3333",
   line_color="black")
```
Merge tất cả các đoạn code và chạy:

![](https://images.viblo.asia/83425ab6-3d06-4225-9991-4c5ad689bdf7.png)

![](https://images.viblo.asia/0ee44e81-3528-45e5-b7de-06620c0822b9.png)

Yeah, gần được nửa chặng đường rồi, tiếp theo chúng ta sẽ vẽ các đường biểu thị chỉ số High - Low
Đơn giản hơn so với vẽ hình chữ nhật, ta chỉ cần sử dụng method segment để vẽ các đoạn thẳng (khúc).
Tham khảo thêm về segment tại [đây nhé](https://docs.bokeh.org/en/latest/docs/reference/models/glyphs/segment.html)

`p.segment(df.index, df.High, df.index, df.Low, color="Black")`

Chạy tiếp xem có gì mới nào :-?

![](https://images.viblo.asia/5b1b7480-4148-419d-bf59-14435b238b42.png)

![](https://images.viblo.asia/6159c5b2-bd3e-4e5b-9a2f-344b192462e5.png)

OK có vẻ khá ổn nhưng vẫn chưa chuẩn, do segment() được đặt sau rect() nên đoạn thẳng sẽ đè lên hình chữ nhật, để khắc phục vấn đề này, ta chỉ cần move câu lệnh vừa thêm vào trước các câu lệnh vẽ hình chữ nhật (rect). Cùng sửa lại và xem kết quả nhé:
![](https://images.viblo.asia/7e9bef59-1e19-4927-acd6-8fb62591cf0b.png)
Ầu, nhìn khá ổn áp rồi. Tiếp tục để có cái nhìn tổng quan hơn hay nhìn được bức tranh vĩ mô hơn, ta cần kéo dài khoảng thời gian. Mình sẽ sửa start_date từ 2019/12/1 thành 2019/06/15. Vậy là ta sẽ thấy được bức tranh tổng quan từ 2019/06/15 đến 2019/12/15.

Kết quả:

![](https://images.viblo.asia/a2191f57-2c05-4b7e-bb31-e30ce38ce159.png)

Yay, looks nice :D trông nguy hiểm phết rồi. Vậy là trong phần 1 này, mình đã tạo một biểu đồ thống kê chứng khoán dạng đơn giản, đây gần như chỉ là một phần nhỏ mô tả sức mạnh vô cùng lớn của Python cùng tập hợp vô số các thư viện thứ 3 hỗ trợ. Ở Phần 2 tiếp theo, mình sẽ hướng dẫn các bạn kết hợp kết quả của phần một cùng một chút ít kiến thức về Flask framework để tạo nên một trang web đơn giản và deploy lên Heroku.

Many thanks. Have fun!