## 1. Chartkick là gì?
Chartkick là một bộ thư viện giúp chúng ta trực quan hóa các dữ liệu thống kê một cách dễ dàng. Nó có các framework hỗ trợ nhiều ngôn ngữ lập trình khác nhau như: 

* Ruby on rails 
* Python
* Javascript 
* ...

Đồng thời có thể sử dụng các thư viện adapter khác nhau như: Chart.js, highcharts hoặc googlechart.
## 2. Hướng dẫn cài đặt
### 2.1.    Thêm `gem "chartkick"` vào Gemfile sau đó `bundle` 
### 2.2.    Cài đặt các thư viện JS cần thiết để vẽ biểu đồ

**Cài đặt với ChartJS**

* Với Rails 6/ Webpacker:

chạy lệnh sau để download các thư việc cần thiết về thư mục: 

`yarn add chartkick chart.js` và trong file app/javascript/packs/application.js thêm vào các dòng sau: 

```javascript
require("chartkick")
require("chart.js")
```

* Với Rails 5:

Thêm các dòng sau vào `app/assets/javascripts/application.js`:
```javascript
//= require chartkick
//= require Chart.bundle
```

**Cài đặt với GoogleChart**

Thêm asset tag này vào trong layout:

```ruby
<%= javascript_include_tag "https://www.gstatic.com/charts/loader.js" %>
```

* Với Rails 6/Webpacker, ta thêm: 

Ta  chạy    `yarn add chartkick` để cài chartkick và trong file `app/javascript/packs/application.js` ta thêm: 
```javascript
require("chartkick")
```

* Với Rails 5:

Bổ sung vào file `app/assets/javascripts/application.js` :
```javascript
//= require chartkick
```

Chú ý: Để config ngôn ngữ hay ggmap API cho googlechart thì chỉ cần thêm dòng này trước khi sử dụng chart:
```javascript
Chartkick.configure({language: "de", mapsApiKey: "..."})
```
**Cài đặt với highcharts**

* Với Rails 6/ Webpacker:

chạy lệnh sau để download các thư việc cần thiết về thư mục: 

`yarn add chartkick chart.js` và trong file app/javascript/packs/application.js thêm vào các dòng sau: 

```erlang
require("chartkick").use(require("highcharts"))
```

* Với Rails 5 Ta cần phải download [highcharts.js](https://code.highcharts.com/highcharts.js) về trong thư mục `vendor/assets/javascripts` . Nếu sử dụng Rails 5.1+ thì có thể sử dụng lệnh sau để cài đặt `yarn add highcharts` . 
Thêm các dòng sau vào `app/assets/javascripts/application.js`:
```
//= require chartkick
//= require highcharts
```

   ### 2.3.    Cài đặt các tool cần thiết cho database phục vụ việc thống kê

   Có một số  thứ cần thiết cho việc thống kê của chúng ta ví dụ như:  [GroupDate](https://github.com/ankane/groupdate), [Hightop](https://github.com/ankane/hightop) và [ActiveMedian](https://github.com/ankane/active_median)

Việc cài đặt các bạn hãy follow theo các link trên.

Sau khi đã hoàn tất các bước cơ bản các bạn có thể vẽ.

## 3. Vẽ các biểu đồ đặc trưng

**Chú ý:** Nếu sử dụng nhiều thư viện biểu đồ một lúc. Thì phải thêm  tùy chọn sau(tùy chọn thự viện): 
```html

<%= line_chart data, adapter: "google" %> <!-- or highcharts or chartjs -->

```

**Các loại biều đồ đơn (Chỉ có 1 loạiiểu đồ trong một biểu đồ)**

Cú pháp chung: 
```go
function_chart data, options* 
```

**Data** sẽ là một hash  hoặc array: 

```go
<%= pie_chart({"Football" => 10, "Basketball" => 5}) %>
<%= pie_chart [["Football", 10], ["Basketball", 5]] %>
```

Ví dụ:

**Các loại biểu đồ:**

Line chart

`<%= line_chart User.group_by_day(:created_at).count %>`

Pie chart

`<%= pie_chart Goal.group(:name).count %>`

Column chart

`<%= column_chart Task.group_by_hour_of_day(:created_at, format: "%l %P").count %>`

Bar chart

`<%= bar_chart Shirt.group(:size).sum(:price) %>`

Area chart

`<%= area_chart Visit.group_by_minute(:created_at).maximum(:load_time) %>`

**Các tùy chọn:**

Id, width, and height

```ruby
<%= line_chart data, id: "users-chart", width: "800px", height: "500px" %>
```

Min and max values

```html
<%= line_chart data, min: 1000, max: 5000 %>
```

min defaults to 0 for charts with non-negative values. Use nil to let the charting library decide.

Min and max for x-axis - Chart.js

```scala
<%= line_chart data, xmin: "2018-01-01", xmax: "2019-01-01" %>
```

Colors

```markdown
<%= line_chart data, colors: ["#b00", "#666"] %>
```

Stacked columns or bars

```html
<%= column_chart data, stacked: true %>
```

Discrete axis

```erlang
<%= line_chart data, discrete: true %>
```

Label (for single series)

```html
<%= line_chart data, label: "Value" %>
```

Axis titles

```javascript
<%= line_chart data, xtitle: "Time", ytitle: "Population" %>
```

Straight lines between points instead of a curve

```html
<%= line_chart data, curve: false %>
```

Hide points

```html
<%= line_chart data, points: false %>
```

Show or hide legend

```ruby
<%= line_chart data, legend: false %>
```

Specify legend position

```ruby
<%= line_chart data, legend: "bottom" %>
```

Defer chart creation until after the page loads

```html
<%= line_chart data, defer: true %>
```

Donut chart

```erlang
<%= pie_chart data, donut: true %>
```

Prefix, useful for currency - Chart.js, Highcharts

```html
<%= line_chart data, prefix: "$" %>
```

Suffix, useful for percentages - Chart.js, Highcharts

```html
<%= line_chart data, suffix: "%" %>
```

Set a thousands separator - Chart.js, Highcharts

```html
<%= line_chart data, thousands: "," %>
```

Set a decimal separator - Chart.js, Highcharts

```html
<%= line_chart data, decimal: "," %>
```

Set significant digits - Chart.js, Highcharts

```ruby
<%= line_chart data, precision: 3 %>
```

Set rounding - Chart.js, Highcharts

```ruby
<%= line_chart data, round: 2 %>
```

Show insignificant zeros, useful for currency - Chart.js, Highcharts

```cpp
<%= line_chart data, round: 2, zeros: true %>
```

Friendly byte sizes - Chart.js 2.8+

```html
<%= line_chart data, bytes: true %>
```

Show a message when data is empty

```html
<%= line_chart data, messages: {empty: "No data"} %>
```

Refresh data from a remote source every n seconds

```markdown
<%= line_chart url, refresh: 60 %>
```

You can pass options directly to the charting library with:

```markdown
<%= line_chart data, library: {backgroundColor: "#eee"} %>
```

**Tối ưu performance với biểu đồ đơn**
Làm cho các trang của bạn tải siêu nhanh và không lo ngại về thời gian chờ. Ta sử dụng url cho riêng nó và load dữ liệu về.

**Tạo controller**
```ruby
class ChartsController < ApplicationController
  def completed_tasks
    render json: Task.group_by_day(:completed_at).count
  end
end
```

**Nếu dùng để vẽ nhiều dạng cùng kiều thì như sau: **

```ruby
render json: Task.group(:goal_id).group_by_day(:completed_at).count.chart_json
```

**Vẽ biểu đồ**
Ví dụ kiều biều đồ đường:
```html
<%= line_chart completed_tasks_charts_path %>
```

## 4. Custom một số biểu đồ theo ý muốn
### 4.1. Vẽ biều đồ kết hợp dạng server side  rendering 

Chúng ta sẽ kết hợp nhiều loại biểu đồ trong 1 biểu đồ phía client.
* Ưu điểm: 
    * Triển khai nhanh 
    * Đơn giản
* Nhược điểm:
    * Thời gian load trang chậm do phải tổng hợp dữ liệu

Ví dụ: 

```html
<%= line_chart [
                {name: "Data1", type: "line", data: data},
                {name: "Data1", type: "column", data: data}
               ],
          prefix: "$", adapter: "highcharts", messages: {empty: I18n.t("chart.message.empty")} %>
```
Lúc này biểu đồ, sẽ có 1 line và cột.

### 4.2. Vẽ biểu đồ kết hợp dạng client side  rendering

Code demo

```
    var data = [
        {name: "Apple", type: "line", data: {"Tuesday": 3, "Friday": 4}},
        {name: "Pear", type: "line", data: {"Tuesday": 1, "Friday": 8}},
        {name: "Carrot", type: "line", data: {"Tuesday": 3, "Friday": 4}},
        {name: "Beet", type: "column", data: {"Tuesday": 1, "Friday": 8}}
    ];
    new Chartkick.LineChart("chart-12345", data, {adapter:"highcharts"});
```


## Tài liệu tham khảo

* https://github.com/ankane/chartkick
* https://chartkick.com/
* https://www.highcharts.com/demo