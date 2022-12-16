Chào các bạn, biểu đồ thống kê là một phần khá là quan trọng của một trang web, nó giúp cho người dùng có một cái nhìn tổng quan về hoạt động của hệ thống. 

Hiện nay có khá nhiều thư viện JS hỗ trợ chúng ta trong việc vẽ biểu đồ như: ChartJS, HighchartsJS, Chartkick, Google Chart, ....

Hôm nay mình xin giới thiệu với các bạn thư viện Google Chart, thư viện vẽ biểu đồ miễn phí của Google.

### Load the Libraries

Đầu tiên load file loader của Google Chart:

```html
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
```

File này chỉ cần load một lần là bạn có thể sử dụng để vẽ bao nhiêu loại biểu đồ mà bạn muốn.

Sau khi load file loader, bạn có thể gọi hàm **google.charts.load** để load packages cho từng loại biểu đồ của bạn

```html
<script type="text/javascript">
  google.charts.load('current', {packages: ['corechart']});
</script>
```

Tham số đầu tiên ở hàm **google.charts.load** là version mà bạn muốn load, 'current' tức là bạn đang muốn load version mới nhất của Google Chart.

Tham số thứ hai là packages mà bạn muốn load để sử dụng. Ở đây 'corechart' sẽ load những loại biểu đồ cơ bản, gồm: bar, column, line, area, stepped area, bubble, pie, donut, combo, candlestick, histogram, scatter.

### Draw the chart

Để vẽ được biểu đồ, bạn chỉ cần:

```javascript
google.charts.setOnLoadCallback(drawChart);
```

trong đó drawChart là một function định nghĩa những gì bạn muốn vẽ.

Ví dụ, mình sẽ vẽ một biểu đồ hình cột đơn giản như sau:

```javascript
$(document).ready(function() {
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
  // Tạo data table
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Users');
    data.addColumn('number', 'Total');
    data.addRows([
      ['10A1', 43],
      ['10A2', 41],
      ['10A3', 41],
      ['10A4', 40],
      ['10A5', 42]
    ]);
    
    // Set option của biểu đồ
    var options = {
      'title': 'Students of Class',
      'width': 800,
      'height': 300
    };

    // Vẽ biểu đồ từ data và option đã khai báo
    var chart = new google.visualization.ColumnChart(document.getElementById('chart'));
    chart.draw(data, options);
  }
});
```

Để hiển thị biểu đồ, khai báo một cái div:

```html
<div id="chart"></div>
```

Kết quả: 

![](https://images.viblo.asia/90f60c9e-63eb-46b8-8bbc-4d2cf7a781eb.png)

Nhìn cõ vẽ chướng mắt vì trục y nó không bắt đầu từ 0, cái này thì sẽ có tùy chọn trong option nhé:

```javascript
   var options = {
      'title': 'Students of Class',
      'width': 800,
      'height': 300,
      vAxis: {
        viewWindow: {
          min: 0
        }
    }
```

![](https://images.viblo.asia/8d16a6bf-4ea5-4f2c-84e9-15ada6f4cd18.png)

Có khá là nhiều options để bạn vẽ biểu đồ theo ý thích của mình, các bạn hoàn toàn có thể tham khảo từ [documents của Google Chart](https://developers.google.com/chart/interactive/docs/)

Thử vẽ một cái biểu đồ tròn nào:

Cũng với data Student of Class ở trên, bạn chỉ cần khởi tạo một đối tượng biểu đồ hình tròn như sau:

```javascript
var chart = new google.visualization.PieChart(document.getElementById('chart'));
chart.draw(data, options);
```

![](https://images.viblo.asia/499e8d4e-a7ab-4419-a6de-4f700638898a.png)

Và tất nhiên về màu sắc, tooltip khi hover các bạn có thể hoàn toàn custom trong options.

### Custom tooltip

Mặc định dữ liệu ở toottip khi bạn hover hoặc click vào nó sẽ như thế này

![](https://images.viblo.asia/b5d4ebff-6254-4986-a4e6-30146c70cbb1.png)

Nó sẽ hiển thị cái label và giá trị của phần biểu đồ bạn focus tới, format sẽ luôn là như vậy.

Bây giờ giả sử bạn muốn cái tooltip nó hiển thị đẹp hơn, muốn cho cái số to hơn, cái text bold lên, hoặc có thể là hiển thị theo một format khác thì sẽ làm thế nào?

Yên tâm, Google Chart cho phép bạn custom cái tooltip bằng HTML và CSS theo ý bạn muốn. Để làm được điều này, trong options, bạn cho phép tooltip nhận HTML như sau:

```javascript
var options = {
  .......,
  tooltip: {
    isHtml: true
  },
  .......
}
```

Giả sử mình muốn vẽ một biểu đồ hình cột, xem số lượng học sinh của 3 khối 10, 11, 12, khi hover vào sẽ ra số lượng học sinh của từng lớp trong khối đó.

```javascript
$(document).ready(function() {
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Users');
    data.addColumn('number', 'Total');
    // Ở đây add thêm một column để nhận giá trị tooltip
    data.addColumn({type: 'string', role: 'tooltip', 'p': {'html': true}});
    
    // Data hiển thị ở tooltip, cái này sẽ lấy từ server đổ về
    var list_data_10 = [['10A1', 30], ['10A2', 35], ['10A3', 35]];
    var list_data_11 = [['11A1', 30], ['11A2', 34], ['11A3', 35]];
    var list_data_12 = [['12A1', 30], ['12A2', 33], ['12A3', 32]];
    
    // Ngoài 2 giá trị là tên khối lớp và tổng số lượng, add thêm params tooltip là một function return một HTML
    data.addRows([
      ['Grade 10', 100, createCustomHTMLContent(list_data_10)],
      ['Grade 11', 99, createCustomHTMLContent(list_data_11)],
      ['Grade 12', 95, createCustomHTMLContent(list_data_12)]
    ]);
    var options = {
      'title': 'Students of Class',
      'width': 800,
      'height': 300,
      tooltip: {
        isHtml: true // Khai báo cho phép tooltip nhận HTML
      },
      vAxis: {
        viewWindow: {
          min: 0
        }
      }
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('chart'));
    chart.draw(data, options);
  }
});

// Tạo function định nghĩa tooltip
function createCustomHTMLContent(list_data) {
  html = '<div style="padding: 10px; border: solid 1px #cccccc; width: 180px;">' +
  '<table style="border: none; width: 100%;">';
  for (var i = 0; i < list_data.length; i++) {
    html += '<tr>' +
      '<td style="font-size: 11px; color: #333333;">' +
      list_data[i][0] + '</td>' +
      '<td style="float: right; font-size: 11px; color: #333333;"><b>' +
      list_data[i][1] + '</b></td></tr>'
  }
  html += '</table></div>';
  return html;
};
```

Và đây là kết quả khi focus vào cột Grade 12:

![](https://images.viblo.asia/09ee284c-9550-457e-96dd-fb7e3c30ec10.png)

Ở bài viết này, mình đã giới thiệu với các bạn tool Google Chart cũng khá mạnh, dễ sử dụng để vẽ biểu đồ.

Việc còn lại của các bạn là đổ dữ liệu từ server về, tìm những options để custom biểu đồ theo ý muốn của mình.

Tham khảo thêm các loại biểu đồ khác, cũng như những options khác tại [documents của Google Chart](https://developers.google.com/chart/interactive/docs/)

Chúc các bạn thành công!