**Chart (biểu đồ) là một thành phần quan trọng và thường xuyên xuất hiện trong các website, đặc biệt là các trang web về thống kê, quản lý... Trước đây, mình đã có bài giới thiệu về một thư viện dùng để vẽ biểu đồ bằng Javascript đó là HighCharts, nếu các bạn quan tâm thì có thể xem nó ở [đây](https://viblo.asia/p/highcharts-de-dang-ve-bieu-do-voi-javascript-XQZkxAEovwA).**

ReactJS là gì thì chắc mình không cần phải giới thiệu nữa nhỉ, nó đã quá nổi tiếng và được sử dụng phổ biến trong cộng đồng Web developers rồi. Trong bài viết này, mình xin giới thiệu đến các bạn 1 thư viện khá tuyệt để vẽ biểu đồ trong ReactJS, đó là Recharts. Hiện tại, thư viện này đã có tới gần 10.000 starts trên Github.

## Giới thiệu
Recharts là một thư viện được xây dựng dựa trên ReactJS và D3. D3.js là thư viện Javascript dùng để trực quan hoá dữ liệu, biến dữ liệu thành những đồ thị, bảng biểu xây dựng từ những native HTML5 elements (chứ không phải file ảnh), tăng tính tương tác với người dùng trong môi trường web. Để tìm hiểu thêm về thư viện này thì các bạn có thể xem thêm ở [đây](https://d3js.org/).

Mục đích chính của Recharts là giúp các bạn vẽ biểu đồ trong thư viện ReactJS trở nên dễ dàng hơn bao giờ hết. Nguyên tắc chính của Recharts là:
1. Dễ dàng triển khai nó trong Component của ReactJS.
2. Hỗ trợ SVG và cực kỳ nhẹ.
3. Các thành phần bên trong chart được trình bày rất "thuần khiết".

## Cài đặt
Các bạn có thể cài đặt Recharts rất dễ dàng thông qua NPM bằng lệnh. Đây là cách dễ dàng và nhanh nhất được thư viện này khuyến cáo sử dụng, bởi vì nó sẽ dễ dàng đóng gói cùng với các CommonJS module ví dụ như Webpack.

> `npm install recharts`

hoặc

> `yarn add recharts`

Hoặc các bạn có thể sử dụng thông qua UMD:

> `<script src="https://unpkg.com/recharts/umd/Recharts.min.js"></script>`

## Ví dụ đơn giản
***Lưu ý**: Đoạn code bên dưới có sử dụng 1 số cú pháp của ES6.*

> ReactJS code
```
import React, { Component } from 'react';

import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

class ChartExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
        {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
        {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
        {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
        {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
        {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
        {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
      ]
    }
  }

  render() {
    const { data } = this.state;

    return (
      <ResponsiveContainer className="chart" height={300}>
        <LineChart 
         width={600} 
         height={300} 
         data={data}
         margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
        <XAxis dataKey="name"/>
        <YAxis/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

export default ChartExample;
```

Kết quả sẽ như hình dưới:

![](https://images.viblo.asia/e9cffafc-2178-4eac-b4f2-4f5937e6106e.png)

Các bạn có thể xem kết quả chi tiết của ví dụ trên ở [đây](https://jsfiddle.net/alidingling/xqjtetw0/).

Ngoài ra, Recharts còn hỗ trợ thêm rất nhiều các dạng biểu đồ khác nữa. Ví dụ như biểu đồ cột, biểu đồ đường, biểu đồ hình tròn, biểu đồ radar... Các bạn có thể xem thêm các ví dụ về các dạng biểu đồ khác ở [đây](http://recharts.org/en-US/examples).

## Đánh giá
Theo bản thân mình đánh giá thì đây có lẽ là thư viện dùng để vẽ biểu đồ trong ReactJS dễ sử dụng và đầy đủ nhất, với một hệ thống API, documents rất đầy đủ và dễ hiểu, cộng thêm với một lượng lớn start trên Github và một cồng đồng support mạnh mẽ, thì các bạn có thể hoàn toàn yên tâm khi sử dụng thư viện này. Các bạn có thể tìm hiểu thêm về thư viện này tại [đây](http://recharts.org/en-US) nhé.

Cảm ơn các bạn đã theo dõi bài viết. Xin chào và hẹn gặp lại!