## Giới thiệu:
Khi bạn xây dựng 1 trang web, đặc biệt là FE engineering thì việc xây dựng những biểu đồ không phải là hiếm, đặc biệt là những trang admin quản lý, thống kê. Do đó, việc các thư viện về biểu đồ ngày càng nhiều và đa dạng. 

Trong Reactjs cũng vậy, bạn có thể thấy các thư viện nổi tiếng như Nivo, React-Vis, Recharts, React-chartjs-2..., nhưng sẽ ra sao nếu bạn yêu cầu phải làm những biểu đồ khác với thư viện, hay đơn giản hơn là làm thế nào để làm ra chúng.

Vậy nên hôm nay mình sẽ cùng các bạn đi làm thử 1 loại chart đơn giản là line-chart mà ko dùng thư viện nào, và tìm hiểu xem nó cách xây dựng và nó hoạt động như thế nào nhé.
## Cài đặt môi trường:
Chúng ta nhanh chóng tạo mới app với create-react-app của facebook với câu lệnh create-react-app react-line-chart nhớ chạy lệnh npm start để start app.

Trong bài này, mình có sử dụng SVG để tạo line chart, vậy SVG là gì thì:
SVG viết tắt của **Scalable Vector Graphic**s là một định dạng hình ảnh (tương tự như JPG, PNG,... mà chúng ta vẫn thường dùng) sử dụng cấu trúc XML để hiển thị hình ảnh dưới dạng vector.
Bạn có thể tìm hiểu sâu hơn về SVG trong bài này : https://viblo.asia/p/tim-hieu-ve-svg-gAm5yqd85db

VD SVG đơn giản: `<path d="M 10 10 L 20 20 z"/>`
Trong đó: 
* **path**: là element tạo bất kỳ hình nào mà bạn thích bằng cách định nghĩa những điểm và đường thẳng giữa chúng.
* **d**: Thuộc tính này là 1 chuỗi ký tự có chứa danh sách chỉ dẫn cho **path**.
* **M**: là ‘move to', ở ví dụ trên là move từ điểm có toạ độ x=10, y=10.
* **L**: là ‘line to', ở ví dụ trên là 1 tạo 1 đường thẳng đến điểm có toạ độ x=20, y=20.
* **z**: là close, tức là kết thúc SVG.
Tóm lại đoạn code trên đơn giản là tạo 1 đường thẳng từ điểm có toạ độ 10, 10 đến điểm có toạ độ 20, 20.

1. Tạo data ảo:
Trước tiên, ta tạo ra danh sách data ảo gồm 10 phần tử, dạng như sau: [{x1, y2}, {x2, y2},...]
```
class App extends Component {
  // Function tạo data ảo: gồm 1 mảng 10 phần tử
  createFakeData(){
    const data = []

    for (let x = 0; x <= 10; x++) {
      const random = Math.random();
      const temp = data.length > 0 ? data[data.length-1].y : 50;
      const y = random >= .45 ? temp + Math.floor(random * 20) : temp - Math.floor(random * 20);
      data.push({x,y})
    }
    return data;
  }

  render() {
    console.error("this", this.createFakeData())
    return (
      <div className="App">
        <div className="header">react svg line chart</div>
      </div>
    );
  }
}
```
2. Tạo file LineChart.js trả về 1 svg html element
Trong thư mục LineChart, tạo file index.js với các giá trị khởi tạo như sau:
```
class LineChart extends Component {
  render() {

    return (
      <svg>
      </svg>
    );
  }
}

LineChart.defaultProps = {
  data: [], // Danh sách các toạ độ để tạo ra các line trong svg với giá trị khởi tạo là rỗng
  color: '#22dcfd', // Khởi tạo màu cho các line
  svgHeight: 300, // Set giá trị khởi tạo height cho svg
  svgWidth: 700, // Set giá trị khởi tạo width cho svg
}
```
4. Tạo functions tính trục toạ độ
Các hàm này được xây dựng nhằm tính giá trị lớn nhất, nhỏ nhất theo từng trục ox, oy để xây dựng biểu đồ cho phù hợp:
```
// Lấy MAX & MIN x để tạo trục hoàng ox
  getMinX() {
    const { data } = this.props;
    return data[0].x;
  }
  getMaxX() {
    const { data } = this.props;
    return data[data.length - 1].x;
  }
  // Lấy MAX & MIN Y để tạo trục tung oy
  getMinY() {
    const { data } = this.props;
    return data.reduce((min, p) => p.y < min ? p.y : min, data[0].y);
  }
  getMaxY() {
    const { data } = this.props;
    return data.reduce((max, p) => p.y > max ? p.y : max, data[0].y);
  }
```
6. Xây dựng hàm tính toạ độ
Tại bước này ta xây dựng hàm tính toạ độ của SVG theo từng điểm
```
// Lấy toạ độ của SVG
  getSvgX(x) {
    const { svgWidth } = this.props;
    return (x / this.getMaxX() * svgWidth);
  }
  getSvgY(y) {
    const { svgHeight } = this.props;
    return svgHeight - (y / this.getMaxY() * svgHeight);
  }
```
8. Tạo các line trong SVG
Giờ là bước vẽ các đường thẳng dựa trên các điểm đầu vào:
```
// Xây dựng SVG path
  makePath() {
    const { data, color } = this.props;
    let pathD = "M " + this.getSvgX(data[0].x) + " " + this.getSvgY(data[0].y) + " ";

    pathD += data.map((point, i) => {
      return "L " + this.getSvgX(point.x) + " " + this.getSvgY(point.y) + " ";
    });

    return (
      <path className="linechart_path" d={pathD} style={{ stroke: color }} />
    );
  }
```
10. Tạo khung toạ độ
Bước này mình xây dựng 2 đường thẳng đơn giản, đó là 2 đường thẳng bắt đầu từ điểm có vị trí 0 0, 1 đường đi từ cuối góc trái lên dầu góc trái, 1 đường đi từ cưối góc trái sáng cuối góc phải.
```
// Xây dựng trục toạ độ
  makeAxis() {
    const minX = this.getMinX(), maxX = this.getMaxX();
    const minY = this.getMinY(), maxY = this.getMaxY();

    return (
      <g className="linechart_axis">
        <line
          x1={this.getSvgX(minX)} y1={this.getSvgY(minY)}
          x2={this.getSvgX(maxX)} y2={this.getSvgY(minY)} />
        <line
          x1={this.getSvgX(minX)} y1={this.getSvgY(minY)}
          x2={this.getSvgX(minX)} y2={this.getSvgY(maxY)} />
      </g>
    );
  }
```

Thêm ít style cho khung nhé:
Tại file LineChart.css:
```
.linechart_path {
  stroke-width: 3;
  fill: none;
}

.linechart_axis {
  stroke: #bdc5c7;
}
```
12. Hoàn thành
Sau khi hoàn thành file LineChart.js của mình sẽ như thế này:
```
import React, { Component } from "react"
import "./LineChart.css"

class LineChart extends Component {
  // Lấy MAX & MIN x để tạo trục hoàng ox
  getMinX() {
    const { data } = this.props;
    return data[0].x;
  }
  getMaxX() {
    const { data } = this.props;
    return data[data.length - 1].x;
  }
  // Lấy MAX & MIN Y để tạo trục tung oy
  getMinY() {
    const { data } = this.props;
    return data.reduce((min, p) => p.y < min ? p.y : min, data[0].y);
  }
  getMaxY() {
    const { data } = this.props;
    return data.reduce((max, p) => p.y > max ? p.y : max, data[0].y);
  }
  // Lấy toạ độ của SVG
  getSvgX(x) {
    const { svgWidth } = this.props;
    return (x / this.getMaxX() * svgWidth);
  }
  getSvgY(y) {
    const { svgHeight } = this.props;
    return svgHeight - (y / this.getMaxY() * svgHeight);
  }
  
  // Xây dựng SVG path
  makePath() {
    const { data, color } = this.props;
    let pathD = "M " + this.getSvgX(data[0].x) + " " + this.getSvgY(data[0].y) + " ";

    pathD += data.map((point, i) => {
      return "L " + this.getSvgX(point.x) + " " + this.getSvgY(point.y) + " ";
    });

    return (
      <path className="linechart_path" d={pathD} style={{ stroke: color }} />
    );
  }
  
  // Xây dựng trục toạ độ
  makeAxis() {
    const minX = this.getMinX(), maxX = this.getMaxX();
    const minY = this.getMinY(), maxY = this.getMaxY();

    return (
      <g className="linechart_axis">
        <line
          x1={this.getSvgX(minX)} y1={this.getSvgY(minY)}
          x2={this.getSvgX(maxX)} y2={this.getSvgY(minY)} />
        <line
          x1={this.getSvgX(minX)} y1={this.getSvgY(minY)}
          x2={this.getSvgX(minX)} y2={this.getSvgY(maxY)} />
      </g>
    );
  }
  
  render() {
    const { svgHeight, svgWidth } = this.props;

    return (
      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {this.makePath()}
        {this.makeAxis()}
      </svg>
    );
  }
}

LineChart.defaultProps = {
  data: [], // Danh sách các toạ độ để tạo ra các line trong svg với giá trị khởi tạo là rỗng
  color: '#22dcfd', // Khởi tạo màu cho các line
  svgHeight: 300, // Set giá trị khởi tạo height cho svg
  svgWidth: 700, // Set giá trị khởi tạo width cho svg
}

export default LineChart;
```

Và đây là file App.js
```
import React, { Component } from 'react';
import './App.css';
import LineChart from './LineChart';

class App extends Component {
  createFakeData(){
    const data = []

    for (let x = 0; x <= 10; x++) {
      const random = Math.random();
      const temp = data.length > 0 ? data[data.length-1].y : 50;
      const y = random >= .45 ? temp + Math.floor(random * 20) : temp - Math.floor(random * 20);
      data.push({x,y})
    }
    return data;
  }

  render() {
    
    return (
      <div className="App">
        <div className="header">react svg line chart</div>
        <LineChart data={this.createFakeData()} />
      </div>
    );
  }
}

export default App;
```

Và đây là sản phẩm:
![](https://images.viblo.asia/beee891e-2ff8-4177-8246-82f4a58e9eec.png)
## Tổng kết và tài liệu tham khảo:
Vậy là, mình đã giới thiệu với các bạn cách xây dựng 1 biểu đồ linechart đơn giản, và cấu trúc, cách làm nó như thế nào. Hẹn gặp lại các bạn ở bài sau nhé.

Tài liệu tham khảo: 
https://medium.com/@kris101/create-svg-line-chart-in-react-51279a1493dc