# Mở đầu
Chúng ta luôn cần thống kê dữ liệu để có cái nhìn tổng thể giúp khai thác thông tin một cách hiệu quả nhất. Một trong những cách thống kê dữ liệu đó là dùng biểu đồ hay đồ thị. Hôm nay mình sẽ giới thiệu cho các bạn cách sử dụng thư viện [Highcharts](https://www.highcharts.com/) trong React JS. Chúng ta hãy cùng tìm hiểu sơ qua về HighCharts đã nhé :wink:
# Highcharts là gì ?
[Highcharts](https://www.highcharts.com/)  là một thư viện biểu đồ tuyệt vời được phát triển bằng JavaScript bởi Highsoft, một công ty được thành lập bởi Torstein Hønsi, người cũng là người sáng tạo chính của Highcharts. Highcharts được phát hành lần đầu tiên vào năm 2009. Highcharts có khả năng hiển thị các loại biểu đồ khác nhau, từ biểu đồ đường và cột cơ bản đến 3D và bản đồ nhiệt. Bạn có thể xem qua tất cả các loại biểu đồ khác nhau được Highcharts hỗ trợ [tại đây](https://www.highcharts.com/demo). 
 
# Cài đặt Highcharts trong React JS

Bước đầu tiên là cài đặt gói `react-highcharts`
```
npm install react-highcharts --save-dev
```

Sau khi cài đặt hoàn tất, gói sẽ nằm trong thư mục node_modules. Bây giờ chúng ta sẽ tạo một component để hiển thị biểu đồ , giả sử  đặt tên file là Graph.js và import Highcharts ở đó.

```
import React from 'react';
import Highcharts from 'highcharts';
```

# Vẽ đồ thị

Ví dụ, chúng ta hãy chọn biểu đồ hình tròn và minh họa thành phần của bầu khí quyển Trái đất với: Nitơ (78,1%), Oxy (20,9%), Argon (0,9%) và Khí Trace (0,1%). Chúng ta sẽ render biểu đồ này trong div với id = atmospheric-composition.
```
render() {
  return (
  	<div id="atmospheric-composition">
  	</div>
  );
}
```

Bây giờ hay tạo một biến state là series và gán một mảng cho nó một array bao gồm dữ liệu của thành phần bầu khi quyển Trái đát được cấu trúc như sau:

```
this.state = {
            series: [{
		  name: 'Gases',
	      data: [
	        {
	          name: 'Argon',
	          y: 0.9,
	          color: '#3498db'
	        },
	        {
	          name: 'Nitrogen',
	          y: 78.1,
	          color: '#9b59b6'
	        },
	        {
	          name: 'Oxygen',
	          y: 20.9,
	          color: '#2ecc71'
	        },
	        {
	          name: 'Trace Gases',
	          y: 0.1,
	          color: '#f1c40f'
	        }
	      ]
	    }]
        }
```

   Biểu đồ Highcharts được khởi tạo bằng cách sử dụng hàm tạo Highcharts.chart(). Toàn bộ đối tượng (trong dấu ngoặc nhọn) được truyền dưới dạng tham số cho nó được gọi là **Option** Object; và chart, title và plotOptions là các đối tượng trong khi đó serieslà một mảng. Để dễ dàng xử lý, hàm tạo Highcharts.chart()  được đặt bên trong hàm highChartsRender()  để chúng ta có thể gọi ra để khởi tạo hàm tạo. Bên trong đối tượng `chart`, giá trị `pie` tương ứng với thuộc tính `type`  biểu thị rằng biểu đồ là biểu đồ hình tròn và giá trị chuỗi atmospheric-composition tương ứng với thuộc tính renderTo chính là id của phần tử bên trong biểu đồ sẽ được hiển thị. Và để làm cho biểu đồ hình tròn của chúng ta trông giống như một chiếc bánh rán, tùy chọn `innerSize` bên trong đối tượng  `pie` của đối tượng `plotOptions`  được đặt thành 70%. Đối tượng cuối cùng là `series` được gán biến this.state.series  là một array.
  
```
highChartsRender() {
	Highcharts.chart({
	    chart: {
	      type: 'pie',
	      renderTo: 'atmospheric-composition'
	    },
	    title: {
	      verticalAlign: 'middle',
	      floating: true,
	      text: 'Earth\'s Atmospheric Composition',
	      style: {
	      	fontSize: '10px',
	      }
	    },
	    plotOptions: {
	      pie: {
	      	dataLabels: {
	      		format: '{point.name}: {point.percentage:.1f} %'
	      	},
	        innerSize: '70%'
	      }
	    },
	    series: this.state.series
  	});
}
```
Vì chúng ta cần render biểu đồ ngay sau khi thành phần Graph.js được chèn vào DOM,  nên chúng ta sẽ gọi hàm highChartsRender() bên trong componentDidMount().
    
`componentDidMount() {
  this.highChartsRender();
}`
    
Bây giờ hãy import thành phần **Graph.js** bên trong file **index.js** của bạn 
    
`import Graph from './graph';`
  
 Và cuối cùng là render component Graph
    
`ReactDOM.render(<Graph/>, document.getElementById('root'));`
    
 Kết quả là: 
    
 ![](https://images.viblo.asia/55d65315-81ad-47e3-b499-c73208cb3ce9.gif)
 
>  Tương tự cho những biểu đồ khác cũng sẽ thực hiện như vậy. Hy vọng với bài viết này bạn sẽ có thể làm cho website của mình đẹp hơn và có nhiều chức năng phục vụ cho công việc của bạn. 
 


>  Trong bài sau chúng ta sẽ get data từ controler của Laravel rồi đưa vào HighCharts. Hẹn gặp lại các bạn vào bài viết tiếp theo nhé ! 


***Nguồn tham khảo:***
[https://scriptverse.academy/tutorials/reactjs-highcharts.html](https://scriptverse.academy/tutorials/reactjs-highcharts.html)