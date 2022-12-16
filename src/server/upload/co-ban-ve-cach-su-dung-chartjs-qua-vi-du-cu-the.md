Chart.js là một thư viện mã nguồn mở phổ biến giúp chúng ta vẽ đồ thị dữ liệu trong các ứng dụng web. Nó có khả năng tùy biến cao, nhưng cấu hình tất cả các option của nó vẫn gây khó dễ cho k ít người. Chúng ta hãy cùng khám phá nó, bắt đầu từ một ví dụ đơn giản và xây dựng nó.

## Download/Installation
Có 2 cách để các bạn có thể sử dụng Chart.js đó là:

## Let’s start
* Download từ trang github: https://github.com/chartjs/Chart.js/releases/tag/v2.5.0, đơn giản nhất là sử dụng CDN: https://cdnjs.com/libraries/Chart.js (đây là cách mình sẽ sử dụng để thực hiện ví dụ ở dưới)
* Install nó thông qua npm hoặc bower bằng câu lệnh sau: npm: ` npm install chart.js --save`  bower: `bower install chart.js --save`

Mình cũng sẽ sử dụng jQuery để thực hiện các yêu cầu ajax. bài tóan trong ví dụ này sẽ là vẽ dữ liệu doanh thu của một nhà hàng cho mỗi ngày trong tuần.

{@embed: https://codepen.io/ninhunest/pen/GxavBp}

Quan sát code js phần demo phía trên một chút nhé có 2 thành phần quan trọng là:

* `type`, để chúng ta có thể thay đổi biểu đồ đường thành biểu đồ thanh hoặc thậm chí là biểu đồ hình tròn. Tất cả các loại biểu đồ khác nhau bạn có thể tham khảo [ở đây](https://www.chartjs.org/samples/latest/).

* Như bạn có thể thấy, `datasets` là Array[object]. Điều đó có nghĩa là chúng ta có thể vẽ hai hoặc nhiều chuỗi dữ liệu trong cùng một biểu đồ. Nó chứa dữ liệu cho mỗi tập dữ liệu, dữ liệu ở bên trong datasets phụ thuộc vào từng loại chart khác nhau

* `labels`  là một Array[string]. các nhãn hiển trên trục của chart, nó phụ thuộc vào việc bạn định nghĩa xLabels - trục Ox, yLabels - trục Oy (còn nếu không định nghĩa thì nó sẽ hiểu là trục Ox)

Cùng nhìn lại kết quả của ví dụ trên ta thấy có vài điều sai sai:

- Trục Y không bắt đầu từ 0. Nó bắt đầu từ 12000 (giá trị thấp nhất trong chuỗi);

- Màu của đồ thị đang là màu xám (chính xác là mã màu #666) nhìn nó tụt mood thật sự :D;

- Nó không hiển thị dữ liệu dưới dạng tiền tệ: 2000000 ->  2.000.000 đ 

Mình sẽ thêm một chút code js để khắc phục nhưng vấn đề trên

{@embed: https://codepen.io/ninhunest/pen/oMeZBP}

* `float2vnd` là một hàm định dạng float thành chuỗi tiền tệ: 2000000 ->  2.000.000 đ 
*  `boderColor` và `backgroundColor` là các thuộc tính thay đổi màu của đường và vùng biểu đồ hiển thị.
* `beginAtZero: true` buộc các trục bắt đầu từ 0 và thay vì giá trị nhỏ nhất trong mảng dữ liệu.
* `callback` của một mốc nằm trên 1 trục(ở đay là trục Oy thì sẽ được gọi mỗi khi mốc đó đc render.

## Load data from an Ajax request
Trong thực tế data để tạo ra một biểu đồ thường được load về từ 1 request ajax. để mô phỏng điều đó mình có tạo ra 1 api từ trang 
[này](https://jsonbin.io/) với ý tưởng sẽ gửi 1 request ajax để lấy về data ở dạng json rồi thực hiệ tạo biểu đồ từ dữ liệu đó.
chuỗi json trả về sẽ có dạng :
```
{
  "chartData": {
    "labels": [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday"
    ],
    "thisWeek": [
      2000000,
      1400000,
      1200000,
      1500000,
      1800000,
      1900000,
      2200000
    ],
    "lastWeek": [
      1900000,
      1000000,
      1400000,
      1400000,
      1500000,
      2200000,
      2400000
    ]
  }
}
```


Dưới đây là kết quả:

{@embed: https://codepen.io/ninhunest/pen/LoygVE}


Dữ liệu mà mình gửi đến hàm renderChart sẽ là một mảng gồm hai mảng. Dữ liệu đầu tiên (data[0]) sẽ là dữ liệu từ doanh thu của tuần này và (data [1]) sẽ là dữ liệu từ tuần trước.

Cuối cùng, các bộ dữ liệu từ biểu đồ sẽ có một đối tượng thứ hai: đường biểu đồ của doanh thu tuần trước.
Còn rất nhiều tùy chọn cho việc cấu hình Chart.js bạn có thể tham khảo thêm [ở đây](https://www.chartjs.org/docs/latest/)

bài viết có tham khảo từ các nguồn
* https://viblo.asia/p/tim-hieu-ve-chartjs-Qbq5Qqvw5D8
* https://medium.com/javascript-in-plain-english/exploring-chart-js-e3ba70b07aa4