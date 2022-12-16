### Mở đầu
Trong quá trình làm phát triển. Chắc sớm muộn chúng ta cũng gặp phải một số tính năng liên qua đến việc vẽ đồ thị. Ví dụ như vẽ biểu đồ tỉ lệ loại sản phẩm bán ra trong tháng, biểu đồ đường doanh thu trong tuần..v.v...<br/> Hiện có rất nhiều thư viện javascript có sẵn hỗ trợ chúng ta làm việc này. Cụ thể, nay mình xin phép hướng dẫn một số ví dụ đồ thị căn bản với thư viện `Chart.js` và `Chartist.js` - đây đều là các thư viện khá nổi tiếng và mạnh mẽ để hỗ trợ chúng ta tạo các loại biểu đồ.
### Chart.js
Để bắt đầu hãy nhúng thư viện chart.js vào trang web của bạn bằng cặp thẻ sau 

```javascript
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>
```

Hoặc cài đặt bằng npm <br>
```
npm install chartjs --save
```

Nếu bạn sử dụng Bower thì mọi chuyện cũng tương tự <br>
```
bower install chartjs --save
```
Trong trang web của bạn, tại nơi bạn muốn hiển thị đồ thị, thêm cặp thẻ `canvas` như sau
```html
<canvas id="x-chart" width="800" height="450"></canvas>
```

Bạn có thể tùy chỉnh chiểu rọng cũng như chiều cao của `canvas` qua việc điều chỉnh `width` và `height` trong thẻ canvas bên trên sao cho phù hợp... <br/>

Vậy là ổn rồi, giờ ta hãy bắt đầu đi vẽ một số biểu đồ cơ bản với chart.js
#### Ví dụ biểu đồ tỷ lệ hình tròn
Ví dụ này mình sẽ vẽ biểu đồ hình tròn. Ví dụ biểu đồ tỉ lệ dân số thế giới như hình sau chẳng hạn:
![](https://images.viblo.asia/3951e094-0111-42b0-96a2-0d4fee165afb.png)

Trước tiên, tại nơi bạn muốn hiển thị đồ thi, thêm thẻ canvas như đã nói bên trên
```html
<canvas id="pie-chart" width="800" height="450"></canvas>
```
Sau đó thêm mấy dòng javascript như sau :
```javascript
new Chart(document.getElementById("pie-chart"), {
    type: 'pie',
    data: {
      labels: ["Châu Phi", "Châu Á", "Châu Âu", "Châu Mỹ Latin", "Bắc Mỹ"],
      datasets: [{
        label: "đơn vị (triệu người)",
        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
        data: [2478,5267,734,784,433]
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Biểu đồ tỷ lệ dân số thế giới'
      }
    }
});
```
Như bạn có thể thấy bạn chỉ cần ném số liệu, tên biểu đồ cũng như tên các cột dữ liệu là chart.js sẽ tự động vẽ lên đồ thị cho chúng ta. Như ví dụ trên thì : 
* `text` là tên đồ thị của bạn
* `data` là một mảng chưa các số liệu mà từ đó `chart.js` sẽ đọc ra và vẽ lên các cột/mảnh đồ thị của của bạn
* `labels`  Một mảng các nhãn, tên các cột trên đồ thị. Ở ví dụ trên, cột châu phi tương ứng với số liệu ở mảng data là `2478` người chẳng hạn
* `backgroundColor` tương tự như lables hay data ở trên, đây là mảng các màu tương ứng cho các cột đồ thị của bạn..

#### Ví dụ biểu đồ bánh rán (Doughnut-chart) 
Đây là một dạng biểu đồ tương tự như biểu đồ hình tròn ở trên nhưng có phần hơi khác về mặt hình thức. Tương tự, ta vẫn thêm thẻ canvas tại nơi muốn hiển thị biểu đồ :
```html
<canvas id="doughnut-chart" width="800" height="450"></canvas>
```
Và rồi javascript
```javascript
new Chart(document.getElementById("doughnut-chart"), {
    type: 'doughnut',
    data: {
      labels: ["Châu Phi", "Châu Á", "Châu Âu", "Châu Mỹ Latin", "Bắc Mỹ"],
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: [2478,5267,734,784,433]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Đỗ thị tỷ lệ dân số thế giới'
      }
    }
});
```
Và kết quả thu được <br/>
![](https://images.viblo.asia/546bdfd4-36ab-415a-823b-7f11a91e9af8.png)
#### Ví dụ biểu đồ cột (Bar)
Thêm thẻ canvas
```html
<canvas id="bar-chart-grouped" width="800" height="450"></canvas>
```
Thêm js
```javascript
new Chart(document.getElementById("bar-chart-grouped"), {
    type: 'bar',
    data: {
      labels: ["1900", "1950", "1999", "2050"],
      datasets: [
        {
          label: "Châu Phi",
          backgroundColor: "#3e95cd",
          data: [133,221,783,2478]
        }, {
          label: "Châu Âu",
          backgroundColor: "#8e5ea2",
          data: [408,547,675,734]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Biểu đồ tăng trưởng dân số Châu Phi và Châu Âu)'
      }
    }
});
```
Kết quả thu được <br/>
![](https://images.viblo.asia/ede18750-d3d3-44ee-8d86-e40d1d048220.png)
#### Ví dụ về biểu đồ đường (Line)
![](https://images.viblo.asia/b1ed8700-7f15-4514-875b-75827d851627.png)
Tương tự như những ví dụ trên, thêm canvas này

```html
<canvas id="line-chart" width="800" height="450"></canvas>
```
Thêm javascript này
```javascript
new Chart(document.getElementById("line-chart"), {
  type: 'line',
  data: {
    labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
    datasets: [{ 
        data: [86,114,106,106,107,111,133,221,783,2478],
        label: "Châu Phi",
        borderColor: "#3e95cd",
        fill: false
      }, { 
        data: [282,350,411,502,635,809,947,1402,3700,5267],
        label: "Châu Á",
        borderColor: "#8e5ea2",
        fill: false
      }, { 
        data: [168,170,178,190,203,276,408,547,675,734],
        label: "Châu Âu",
        borderColor: "#3cba9f",
        fill: false
      }, { 
        data: [40,20,10,16,24,38,74,167,508,784],
        label: "Châu Mỹ Latin",
        borderColor: "#e8c3b9",
        fill: false
      }, { 
        data: [6,3,2,2,7,26,82,172,312,433],
        label: "Bắc Mỹ",
        borderColor: "#c45850",
        fill: false
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Đồ thị tăng trưởng dân số thế giới'
    }
  }
});
```

### Chartist.js
Chartist cũng khá giống với Chartjs nên mình sẽ vào ví dụ luôn <br>
Cài đặt sử dụng bower

```
bower install chartist --save
```

hoặc nếu bạn dùng npm
```
npm install chartist --save
```
Hoặc bạn cũng có thể nhúng link CDN:
```javascript
<script src="http://cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"></script>
```
#### Vẽ biểu đồ đường (Line)
Cũng gần tương tự như Chartjs, ta phải thêm thành phần html cho nó: 
```html
<div class="ct-chart ct-square"></div>
```
Ví dụ ở đây mình muốn show nhiệt độ trung bình của mỗi tháng.

Javascript như dưới:
```javascript
var data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    series: [
    [22, 28, 30, 33, 35, 38, 37, 36, 34, 29, 24, 24]
  ]
};

var options = {
	axisY: {
    onlyInteger: true
  },
  seriesBarDistance: 100
};

new Chartist.Line('.ct-chart', data, options);
```
Lưu ý là trong options `axisY` là để cho trục Y không bị giá trị lẻ nhé <br>
Kết quả như sau:

![](https://images.viblo.asia/42cb08d7-2414-4dee-81d5-a0b137287c96.png)

Cũng rất đẹp và dễ dàng đúng không :D 
#### Vẽ biểu đồ  hình chiếc bánh (Pie)
Cuối cùng mình xin giới thiệu về biểu đồ  mà mình gọi là biểu đồ hình chiếc bánh <br> 
Thiết lập html:
```html
<div class="ct-chart ct-perfect-fourth posts-tendency"></div>
```
Javascript:
```javascript
var data = {
   labels: ['Asia', 'Europe', 'Africa', 'America', 'Australia'],
   series: [2478,5267,734,784,433]
};

new Chartist.Pie('.ct-chart', data);
```

Kết quả: 

![](https://images.viblo.asia/796e330c-6663-42b4-9310-2667ca3daa05.png)

Các bạn cũng có thể xét thêm màu sắc cũng như các option cho nó bằng cách thêm vào sau `data`.
Ngoài ra nếu bạn muốn sử dụng một số plugins của Chartist thì bạn có thể tham khảo tại 	[Plugins Chartist](https://gionkunz.github.io/chartist-js/plugins.html)
### Kết luận
Việc vẽ biểu đồ sử dụng `chart.js` cũng như `chartist` tương đối đơn giản, chúng ta chỉ cần đưa số liệu vào và chart.js sẽ vẽ lên đồ thị tương ứng thôi. Vậy mà hồi mới học, mình nghĩ nó khó khăn, mình loay hoay mãi mới tạo được cái biểu đồ đường, và sướng phát điên lên được :joy::joy::joy: Nay xin chia sẽ lại, nhỡ đâu cũng có bạn cần đến như mình...^^ <br/>
Ngoài ra, còn nhiều thiết lập cho biểu đồ cũng như cách vẽ các loại biểu đồ khách bạn có thể tham khảo thêm tại [Chart.js](http://www.chartjs.org/docs/latest/) và [Chartist.js](https://gionkunz.github.io/chartist-js/examples.html)
<br>Cảm ơn các bạn đã theo dõi bài viết của mình. Nếu có ý kiến hay khó khăn khi sử dụng, hãy để lại comment nhé. Tạm biệt!