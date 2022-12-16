# 1. BizCharts
- Đây   là một thư viện biểu đồ React được phat  triển dựa trên G2 4.X. Nó có tất cả các ưu điểm của G2 và React, cho phép người dùng kết hợp vô số loại biểu đồ dưới dạng các thành phần
- Tích hợp một số lượng lớn các công cụ thống kê, hỗ trợ vẽ nhiều hệ tọa độ, tùy chỉnh tương tác, tùy chỉnh hoạt ảnh và tùy chỉnh đồ họa, v.v.
- Hiệu suất ổn định và khả năng mở rộng mạnh mẽ và khả năng tùy biến cao

# 2.Cách sử dụng
##### 1) Cài đặt
```
npm install bizcharts --save
```
##### 2) Demo

###### 1.Biểu đồ dạng cột
```
import React from 'react';
import ReactDOM from 'react-dom';
import { Chart, Interval } from 'bizcharts';

// data examples
const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 155 },
  { genre: 'Action', sold: 230 },
  { genre: 'Shooter', sold: 250 },
  { genre: 'Other', sold: 450 }
];

// Các thành phần của biểu đồ phải được bọc bởi Chart component
// Interval là component bắt buộc

ReactDOM.render((
  <Chart height={320} autoFit data={data} >
    <Interval position="genre*sold" />
  </Chart>
), mountNode);

```

- Ở đây chúng ta có thể thấy position ở đây sẻ được xác định  `genre*sold`. General và sold sẻ đại diện cho tên của các property trong mảng data phía trên
-  Position sẻ được tính theo công thức sau “X * Y” = "genre*sold" .Tương đương genre sẻ là cột ngang và sold sẻ là cột dọc

![](https://images.viblo.asia/f5f98dcc-baa6-4667-bcd4-5d168af8e759.png)
- 
###### 2. Biểu đồ dạng sóng

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Chart, Line, Point, Tooltip } from 'bizcharts';

// data examples
const data = [
	{
		month: "Jan",
		city: "Tokyo",
		temperature: 7
	},
	{
		month: "Jan",
		city: "London",
		temperature: 3.9
	},
    .....

];
// Thêm các option để tuỳ chỉnh 
// Property London và Tokyo ở đây chúng ta có thể hiểu là các các loai đường sóng trong biểu đồ
const scale = {
	temperature: { min: 0 },
	city: {
		formatter: v => {
			return {
				London: '伦敦', 
				Tokyo: '东京'
			}[v]
		}
	}
}

function Demo() {
	return <Chart scale={scale} padding={[30, 20, 50, 40]} autoFit height={320} data={data} interactions={['element-active']}>
		<Point position="month*temperature" color="city" shape='circle' />
		<Line shape="smooth" position="month*temperature" color="city" label="temperature" />
		<Tooltip shared showCrosshairs />
	</Chart>
}

ReactDOM.render(<Demo />, mountNode);

```
- Tương tự như biểu đồ cột. Thì position cũng sẻ được tính như công thức trên
- Props scale ở đây là phần option  chúng ta có thể tuỳ chỉnh nó ở đây
![](https://images.viblo.asia/c02de5c9-14a5-4d32-8a84-b20b3b20b56c.png)

##### 3)  Custom theme
```
import { Chart, Interval,useTheme,registerTheme,getTheme } from 'bizcharts';

registerTheme('my-theme',{
  defaultColor:'#6DC8EC',
  geometries: {
    interval: {
      rect: {
        default: { style: { fill: '#6DC8EC', fillOpacity: 0.95 } },
        active: { style: { stroke: '#5AD8A6', lineWidth: 1 } },
        inactive: { style: { fillOpacity: 0.3, strokeOpacity: 0.3 } },
        selected: {},
      }}}
})

function Demo() {
  const [theme,setTheme] = useTheme('my-theme');
  console.log(getTheme('default'));
  return <Chart height={400} autoFit data={data} theme={theme} interactions={['element-active']} padding={[30, 30, 30, 50]} >
    <Interval position="year*sales"  />
  </Chart>
}

ReactDOM.render(<Demo />, mountNode);
```
Ở đây nó có cung cấp cho ta một số API để có thể custom giao diện của nó

- getTheme : Phương thức này giúp chúng ta có thể lấy được cấu hình mặc định mà thư viện cung cấp như `light` và `dark`. Giá trị `default` của nó là `light` . Gán nó vào props `theme` trong component Chart
- registerTheme: -Hàm này giúp chúng ta định nghĩa ra cấu hinh mà chúng ta muốn. Với 2 tham số `registerTheme(name: string , {option}) `
- useTheme: Là một hook để người dùng tải và cập nhật theme

##### 4)  Các chứ năng khác
- Custom Graphics 
- Drawing property Style 
- Configure the animation

# 3.Tài liệu tham khảo
- https://bizcharts.net/
- https://github.com/alibaba/BizCharts