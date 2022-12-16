**Chartjs** là một thư viện khá hay ho về hỗ trợ vẽ biểu đồ. Tuy đã có một số bài viết về chủ đề này, nhưng mình vẫn muốn viết tiếp. Và để bớt trùng lặp, trong bài viết này, mình sẽ chỉ viết về cách sử dụng **chartjs** trong **Vue**.
(Thực ra là mình cũng mới chỉ thực hành được với Vue thôi :rofl:)

![](https://images.viblo.asia/1457a687-db7f-4fd1-a74e-055b2304e0c2.png)

## 1. Cài đặt

```cmd
npm install vue-chartjs --save
```

hoặc 
```cmd
yarn add vue-chartjs --save
```

## 2. Chart Template

```js:Chart.vue
<script>
  import { <TYPE_CHART> } from 'vue-chartjs';
  
  export default {
    extends: <TYPE_CHART>,

    props: {
      chartData: Object,
      options: Object,
    },

    watch: {
      chartData() {
        this.renderChart(this.chartData, this.options);
      },
    },

    mounted() {
      this.renderChart(this.chartData, this.options);
    },
  };
</script>
```

Trong đó `<TYPE_CHART>` là kiểu biểu đồ bạn muốn tạo.
Theo source của chartjs thì chúng ta có các loại biểu đồ sau:
```js
export class Bar extends BaseChart {}
export class HorizontalBar extends BaseChart {}
export class Doughnut extends BaseChart {}
export class Line extends BaseChart {}
export class Pie extends BaseChart {}
export class PolarArea extends BaseChart {}
export class Radar extends BaseChart {}
export class Bubble extends BaseChart {}
export class Scatter extends BaseChart {}
```
Về tham số truyền vào. Quan sát template, bạn có thể thấy được, `props` truyền vào bao gồm 2 tham số:
- chartData: Dữ liệu để vẽ biểu đồ, bao gồm, tên bảng, các nhãn (label), các số liệu (dataset) và màu tương ứng,...
- options: Các tham số tùy chỉnh cho việc vẽ biểu đồ.

### Tham số chartData
Data thường là một json, có các tham số cần chú ý là:
- labels: Danh sách nhãn
- datasets:
    - label: Tên chú thích cho nhãn
    - data: Số liệu để vẽ biểu đồ
    - backgroundColor: Màu/Danh sách màu sử dụng để vẽ biểu đồ

Ví dụ:
```js
chartData: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
        }]
    }
```

### Tham số options
Tương tự như chartData, options cũng là một json.
Một số options thường hay được sử dụng bao gồm:
- layout: Tùy chỉnh padding, nhận một number/object
```js
options: {
    layout: {
        padding: {
            left: 50,
            right: 0,
            top: 0,
            bottom: 0
        }
    }
}
```
    
- scales: tùy chỉnh cho 2 trục của biểu đồ, bao gồm `xAxes` và `yAxes`.

>>Mình sẽ nói phần này rõ hơn trong ví dụ ở mục 3.

- legend: tùy chỉnh về chú giải

| Tên | KIểu | Mặc định | Mô tả | 
| -------- | -------- | -------- | -------- |
| display     | Boolean     | true     | Hiển thị hay không |
| position | string | 'top' | có 4 kiểu: 'top', 'left', 'bottom', 'right' |
| onClick | function |  | Định nghĩa callback được thực hiện khi click vào chú thích |
|onHover| function | | Định nghĩa callback được thực hiện khi di chuột vào chú thích|
|labels| object | | Style cho chú thích như font, size, color,... [Chi tiết](https://www.chartjs.org/docs/latest/configuration/legend.html#legend-label-configuration)|

<br>

Ví dụ: 
```js
options: {
    legend: {
        display: true,
        labels: {
            fontColor: 'rgb(255, 99, 132)'
        }
    }
}
```

Tìm hiểu thêm về Legend tại: https://www.chartjs.org/docs/latest/configuration/legend.html

- title: tùy chỉnh tên bảng

| Tên | KIểu | Mặc định | Mô tả | 
| -------- | -------- | -------- | -------- |
| display     | Boolean     | true     | Hiển thị hay không |
| position | string | 'top' | có 4 kiểu: 'top', 'left', 'bottom', 'right' |
|text|string/string[]|''|Tên biểu đồ. Nếu dữ liệu truyền vào là một string[], mỗi phần tử sẽ được hiển thị trên 1 dòng|

<br>

Ngoài ra còn có các tham số để style cho title như: fontSize, fontFamily, fontColor, fontStyle, padding, lineHeight. Chi tiết xem tại: https://www.chartjs.org/docs/latest/configuration/title.html

Ví dụ:
```js
options: {
    title: {
        display: true,
        text: 'Custom Chart Title'
    }
}
```

- tooltips: tùy chỉnh cho chú thích khi hover vào mỗi nhãn

| Tên | KIểu | Mặc định | Mô tả | 
| -------- | -------- | -------- | -------- |
| enabled     | Boolean     | true     | Hiển thị hay không |
| custom | function | | Custom lại tooltips theo cách mà bạn muốn. [Chi tiết](https://www.chartjs.org/docs/latest/configuration/tooltip.html#external-custom-tooltips) |
|mode|string|'nearest'|Cài đặt phần tử xuất hiện tooltips, gồm: 'nearest', |
|intersect| Boolean|true| Nếu `true`, tooltips sẽ xuất hiện khi di chuột, ngược lại, tooltips luôn được hiển thị|
|position|string|'average'| Chế độ định vị tooltips, gồm `average` và `nearest`|
|callback|function||Cấu hình lại nhãn của tooltips. [Chi tiết](https://www.chartjs.org/docs/latest/configuration/tooltip.html#tooltip-callbacks)|

<br>

Ngoài ra, còn có các tham số để style tooltips. [Chi tiết](https://www.chartjs.org/docs/latest/configuration/tooltip.html)

Ví dụ: 
```js
ooltips: {
    enabled: true,
    mode: 'single',
    callbacks: {
        label: function(tooltipItems, data) {
            return '$' + tooltipItems.yLabel;
        }
    }
},
```


## 3. Một số ví dụ

### Line

{@embed: https://codepen.io/hatth-1632/pen/abbNVVY}
    
### Bar

{@embed: https://codepen.io/hatth-1632/pen/mddPqyQ}

```js
Vue.component('bar-chart', {
	extends: VueChartJs.Bar,
	data: function () {
		return {
			datacollection: {
				labels: ['', '', '', '', ''],
				datasets: [
					{
						backgroundColor: [ '#1E9600', '#99C802', '#FFF200', '#F89403',	'#FF0000' ],
						data: [1, 2, 3, 4, 5],
					},
				],
			},
			options: {
				scales: {
					yAxes: [{
						display: false,
						ticks: {
							beginAtZero: true,
						},
						gridLines: {
							display: false,
						},
						minBarLength: 2,
					}],
					xAxes: [{
						display: false,
						barPercentage: 1,
						categoryPercentage: 1,
						gridLines: {
							display: false,
						},
					}],
				},
				responsive: true,
				maintainAspectRatio: false,
				legend: {
					display: false,
				},
  	 },
		}
	},
	mounted () {
		// this.chartData is created in the mixin
		this.renderChart(this.datacollection, this.options)
	}
})

var vm = new Vue({ 
	el: '.app',
})
```

>> Một số tham số
>> - scales:
>> 
>> |  Tham số | Kiểu | Mặc định | Mô tả |
>> | -------- | -------- | -------- |---------|
>> | display     | Boolean     | true     | Có hiển thị trục đồ thị hay không |
>> | beginAtZero     | Boolean     | false | Trục bắt đầu từ gốc tọa độ (0, 0) |
>> | minBarLength     | Number     |  | Độ dài nhỏ nhất cho 1 cột của biểu đồ cột (Bar) |
>> [Chi tiết](https://www.chartjs.org/docs/latest/charts/bar.html)
>> - responsive: Biểu đồ có reponsive hay không?

### Pie

{@embed: https://codepen.io/hatth-1632/pen/bGGpYJw}

Hi vọng bài viết của mình có hữu ích với bạn. Cảm ơn và hẹn bạn ở những bài viết tiếp theo nhé :).

Tài liệu tham khảo: [ChartJs Doc](https://www.chartjs.org/docs/latest/)