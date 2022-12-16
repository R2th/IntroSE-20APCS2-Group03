## Mở đầu

![](https://images.viblo.asia/92e5be87-1062-4f68-8d73-a3a9774fc536.png)

Ta luôn cần phải thống kê dữ liệu để có cái nhìn tổng thể giúp khai thác thông tin một cách hiệu quả nhất. Một trong những cách thống kê dữ liệu đó là dùng biểu đồ hay đồ thị. Biểu đồ dùng các hình vẽ. đường nét hình học mô tả có tính quy ước các số liệu thống kê, để tóm tắt trình bày các đặc trưng của dữ liệu, phản ánh khái quát về đặc điểm, xu hướng biến động...

Hiện nay chúng ta có rất nhiều thư viện hỗ trợ vẽ đồ thị một cách đơn giản, giao diện đẹp nhưng trong bài viết này mình xin giới thiệu 1 cách tạo biểu đồ vô cùng đơn giản trong Rails sử dụng thư viện [Chartkick](https://github.com/ankane/chartkick) . `Chartkick` có thể kết hợp với `Google Chart`, `HighChart`, `Chart.js` và nó cũng cung cấp API để nhà phát triển có thể sử dụng nó.
`Chartkick` được hỗ trợ bởi hầu hết các trình duyệt phổ biến hiện nay như chrome, firefox.. Chúng ta cùng tìm hiểu về nó nhé :p

## Cài đặt
Để sử dụng `Chartkick` ta thêm gem:
```
gem "chartkick"
```
Tiếp theo ta chọn thư viện Chart

### `Chart.js` 

Trong `application.js` ta thêm

```
//= require Chart.bundle
//= require chartkick
```

### `Google Charts`:
Trong `application.js` ta add:
```
//= require chartkick
```
Trong `application.html.erb` ta thêm

```
<%= javascript_include_tag "https://www.gstatic.com/charts/loader.js" %>

```
### `Highcharts`
Download [highcharts.js](https://code.highcharts.com/highcharts.js) và để trong thư mục `vendor/assets/javascripts `
Trong `application.js` ta add:
```
//= require highcharts
//= require chartkick
```
## Tạo đồ thị
Để tạo dữ liệu để hiển thị ta tạo 1 Controller mới:
```
class UsersController < ApplicationController
  def index
    @users = User.all
  end
end
```
Trong `view`: render ra biểu đồ đường (line_chart) theo `city` của users:
```
# app/views/users/index.html.erb

<%= line_chart @users.group(:city).count %>
```

Ta có ngay 1 biểu đồ đường

![](https://images.viblo.asia/1fc52fc1-9e6f-44c4-a1e8-501e21799315.png)


Một số biểu đồ khác mình xin thống kê vào bảng dưới đây:

| Tên biểu đồ| Method| Ví dụ  |
| -------- | -------- | -------- |
| Biểu đồ hình tròn     | pie_chart     |  ```pie_chart @users.group(:city).count ```    |
|Biểu đồ hình cột| column_chart|`column_chart  @users.group(:city).count`|
|Biểu đồ miền|area_chart |`area_chart @users.group(:city).count`|
|Biểu đồ tán xạ| scatter_chart|`scatter_chart @users.group(:city).count`|
|Biểu đồ địa lý|geo_chart|`geo_chart @users.group(:city).count`|

Chúng ta cùng xem qua ví dụ hình ảnh:


***Biểu đồ hình cột***

![](https://images.viblo.asia/c7562ebd-1969-4616-90d9-af23375ad2b2.png)

***Biểu đồ miền***

![](https://images.viblo.asia/e55f711e-7a37-4563-bb46-ecd2762b45f2.png)

***Biểu đồ hình tròn***

![](https://images.viblo.asia/6b1a98bc-7234-4d15-bb16-a2631775c144.png)

Thật đơn giản phải không? Giờ ta đi thêm vào các option cho các biểu đồ này nhé
## Options
1. Id, width, and height: Ta có thể gán id và set cho nó chiều dài, chiều rộng tùy ý
```
<%= line_chart data, id: "users-chart", width: "800px", height: "500px" %>
```

2.  Min and max values: Mặc định min là 0 cho đồ thị k có giá trị âm
```
<%= line_chart data, min: 1000, max: 5000 %>
```
3. Colors: Thay đổi màu của đồ thị
```
<%= line_chart data, colors: ["#b00", "#666"] %>
```
4. Gắn tiêu đề trục:
```
<%= line_chart data, xtitle: "Time", ytitle: "Population" %>
```
5. Làm mới dữ liệu `n` giây 1 lần
```
<%= line_chart url, refresh: 60 %>
```
6. Thêm prefix, hữu dụng khi thêm currency - `Chart.js, Highcharts`
```
<%= line_chart data, prefix: "$" %>
```
7.  Thêm dấu `,` ngăn cách các số thuộc hàng nghìn - `Chart.js, Highcharts`
```
<%= line_chart data, thousands: "," %>
```
8. Hiển thị message khi data rỗng:
```
<%= line_chart data, messages: {empty: "No data"} %>
```
9. Download chart: Chỉ với `Chart.js` ta có thể download chart mà k cần server side
```
<%= line_chart data, download: true %>
```
Cài đặt filename:
```
<%= line_chart data, download: "File Name" %>
```
Còn nhiều option khác bạn có thể tham khảo tại [Chartkick](https://github.com/ankane/chartkick), [Chart.js](https://www.chartjs.org/docs/), [Google Charts](https://developers.google.com/chart/interactive/docs/gallery), [Highcharts](https://api.highcharts.com/highcharts)

Ở ví dụ trên, ta có thể thêm các `option` bằng cách định nghĩa 1 helper hiển thị chúng.
Ta sử dụng `HighCharts` nên phải add thêm
```
//= require highcharts
//= require chartkick
```
vào `application.js` và add thêm file thư viện như mình đã nhắc ở phần cài đặt.

```
module UsersHelper
  def users_by_city
    bar_chart @users.group(:city).count, height: '500px', library: {
      title: {text: 'Users by city', x: -20},
      yAxis: {
         allowDecimals: false,
         title: {
             text: 'Cities count'
         }
      },
      xAxis: {
         title: {
             text: 'City'
         }
      }
    }
  end
end
```
`:library` chứa các cài đặt cụ thể cho chart

Tại `view` ta chỉ việc render:

```
<%= users_by_city %>
```

Kết quả là:

![](https://images.viblo.asia/87670238-80b9-48a5-a332-74609d81f705.png)
## Global Options
Bạn có thể custom các option cho `ChartKick`. Tạo file khởi tạo `chartkick.rb` và thêm như dưới đây:
```
# config/initializers/chartkick.rb:

Chartkick.options = {
  height: "300px",
  colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "0000ff"]
}
```
Sau đó restart lại server và refresh lại page. Bạn sẽ thấy màu sắc biểu đồ thay đổi

## Tổng kết
Trên đây là một bài giới thiệu về `Chartkick` để vẽ biểu đồ trong Rails. Hi vọng bài viết có thể giúp ích cho bạn có thêm 1 tùy chọn để sử dụng khi cần vẽ biểu đồ trong dự án của mình.


***Nguồn tham khảo***

https://www.chartkick.com/