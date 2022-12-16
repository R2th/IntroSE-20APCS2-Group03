Vẽ đồ thị bằng React native là một việc nghe thì dễ. Có nhiều thư viện mang đến cho chúng ta những biểu đồ sẵn có, tuy nhiên thường thì chúng ta lại muốn tạo ra những biểu đồ riêng với những thiết kế cụ thể phù hợp với mục đích của mình. Đích đến của bài viết này chính là để làm việc đó, mình sẽ cho các bạn thấy được quá trình tạo ra một biểu đồ cho riêng mình.
<br>

Chúng ta sẽ build một biểu đồ như sau:

![](https://images.viblo.asia/66999d0f-7181-4a9d-b76b-9df7f6e6a22d.png)

## Cài đặt dependencies
Như đã đề cập ở tiêu đề: chúng ta cần hai thư viện, [react-native-svg](https://github.com/react-native-community/react-native-svg) và [d3.js](https://d3js.org/).
```
npm i --save d3
npm i --save react-native-svg
react-native link react-native-svg
```

## Vẽ thôi nào!
Biểu đồ cột mà chúng ta đinh vẽ được hiển thị từ dưới lên trên. Vấn đề là trục tung (trục Y) của SVG lại hoạt động từ trên xuống dưới. Chúng ta sẽ sử dụng một kỹ thuật để đơn giản hóa việc vẽ.
<br>

Chúng ta sẽ vẽ biểu đồ có giá trị của tọa độ Y là giá trị âm. Ví dụ, với giá trị là 5, ta sẽ vẽ một cột từ tọa độ 0 đến -5.
<br>

Cuối cùng, chúng ta cần dịch chuyển toàn bộ biểu đồ, bởi vì lúc này nó sẽ nằm ngoài khung hiển thị của SVG.

![](https://images.viblo.asia/a58cb7f2-2369-4faa-87c4-7296a8e4eeb8.png)

Giờ thì hãy thục sự bắt tay vào làm thôi nào.
<br>

Hãy thêm một `<Rect>` vào `<SVG>` để chúng ta có thể nhìn thấy gì đó trên giả lập.

```javascript:App.js
import React, { PureComponent } from 'react'
import { Svg, G, Rect } from 'react-native-svg'

export default class BarChart extends PureComponent {
  render() {
    const SVGHeight = 60
    const SVGWidth = 60
    const graphHeight = 50

    return (
      <Svg width={SVGWidth} height={SVGHeight}>
        {/* translate for 'graphHeight' on y axis */}
        <G y={graphHeight}>
          <Rect
              x="15"
              y="-15"
              width="20"
              height="20"
              stroke="red"
              strokeWidth="4"
              fill="yellow"
            />
        </G>
      </Svg>
    )
  }
}
```
<br>

Với đoạn code trên, chúng ta đã vẽ ra một hình vuông vàng viền đỏ và dịch chuyển nó trên trục Y một khoảng tương ứng với giá trị của const `graphHeight`.  Hãy để ý rằng tọa độ Y của `<Rect>` là -5 bởi vì chúng ta đã vẽ nó bên ngoài khung hiển thị của SVG rồi dịch chuyển nó vào bên trong. Bạn hãy thử kiểm tra lại xem trên giả lập của mình có hiển thị ra ô vuông không.

## Tạo trục
Chúng ta sẽ bắt đầu với trục nằm ngang dưới cùng của biểu đồ. Biều đồ mà chúng ta xem lúc nãy đã được tối giản để hiểu được sự dịch chuyển của biểu đồ. Y=0 là tọa độ đầu tiên của các cột. Chúng ta cần xác định lề của biểu đồ nơi mà các thông số của biểu đồ sẽ được hiển thị (Ví dụ như: *Jan, Feb ...*).
<br>

![](https://images.viblo.asia/1aeb02de-f4cb-4e0a-bd03-0c49dffe9dcf.png)

Nhìn kỹ hình trên bạn sẽ thấy trục dưới cùng cách ra một chút so với biểu đồ. VÌ chúng ta vẽ với tọa độ âm (bắt đầu từ tọa độ 0) và chúng ta muốn hiển thị thông tin phía dưới biểu đồ, chúng ta sẽ gán cho trục dưới cùng tọa độ Y=2.

```javascript:App.js
import React, { PureComponent } from 'react';
import { Svg, G, Line } from 'react-native-svg';

const GRAPH_MARGIN = 20;
const colors = {
  axis: 'black',
};

export default class BarChart extends PureComponent {
  render() {
    const SVGHeight = 300;
    const SVGWidth = 300;
    const graphHeight = SVGHeight - 2 * GRAPH_MARGIN;
    const graphWidth = SVGWidth - 2 * GRAPH_MARGIN;

    return (
      <Svg width={SVGWidth} height={SVGHeight}>
        <G y={graphHeight}>
          {/* bottom axis */}
          <Line
            x1="0"
            y1="2"
            x2={graphWidth}
            y2="2"
            stroke={colors.axis}
            strokeWidth="0.5"
          />
        </G>
      </Svg>
    );
  }
}
```

## Tạo cột
Các cột ở biểu đồ này chỉ đơn giản là các hình chữ nhật có border radius. Lúc này chúng ta cần một vài dữ liệu. Dữ liệu biểu đổ cột của chúng ta sẽ là một danh sách các cặp key-value. Trong javascript chúng ta sẽ thể hiện dữ liệu này bằng một mảng các object.

*Note: Mình sẽ loại bỏ việc validate các prop trong bài hướng dẫn này để tập trung vào việc dựng biểu đồ.*

Chúng ta sẽ quyết định các tọa độ **x**, **y**, **height** và **width** như thế nào cho `<Rect>` ?
<br>

Chúng ta cần nhớ rằng, chiều cao trong SVG sẽ chạy từ trên xuống dưới dù cho có vẽ bằng tọa độ âm. Có nghĩa là điểm bắt đầu **(x, y)** sẽ là đỉnh của `<Rect>` và chiểu cao thì đại diện cho khoảng cách giữa điểm bắt đầu và trục đáy (Y=0). Hình vẽ sau sẽ giúp bạn hiểu rõ ý này:

![](https://images.viblo.asia/fd3d349e-33d6-4615-9118-bab0edd45986.png)

Giờ thì việc khó là là tìm ra **x** và **y**. Cái chúng ta muốn đạt được là giá trị cao nhất sẽ là đỉnh của biểu đồ, vậy nên chúng ta sẽ cần chia tỉ lệ các cột tùy theo giá trị cao nhất.
<br>

Hãy sử dụng [d3-scale Point scales](https://github.com/d3/d3-scale#point-scales) và [d3-scale Linear scales](https://github.com/d3/d3-scale#linear-scales) cho việc này. Nói một cách ngắn gọn, các phương thức chia tỉ lệ này cho phép chúng ta từ một giá trị trong một miền (domain) nội suy ra được giá trị tương ứng trong một phạm vi (range), và chúng ta lại dùng các giá trị đó để xác định các tọa độ **x** và **y**. Việc đáng lưu tâm duy nhất chúng ta cần làm sau khi tính toán tỉ lệ là dịch chuyển cột theo trục X một khoảng bằng một nửa chiều rộng cột. Vì chúng ta sử dụng point scale nên cần dịch chuyển như vậy để các "point" sẽ ứng với điểm chính giữa của các cột.
<br>

Giờ thì chúng ta hay tách component `BarChart` ra một file riêng (tạo folder Components và tạo file BarChart.js trong đó). Còn ở App.js chúng ta sẽ thêm dữ liệu cho biểu đồ và render component BarChart.

```javascript:App.js
import React from 'react';
import { StyleSheet, View } from 'react-native';

import BarChart from './Components/BarChart';

const App = () => {
  const data = [
    { label: 'Jan', value: 500 },
    { label: 'Feb', value: 312 },
    { label: 'Mar', value: 424 },
    { label: 'Apr', value: 745 },
    { label: 'May', value: 89 },
    { label: 'Jun', value: 434 },
    { label: 'Jul', value: 650 },
    { label: 'Aug', value: 980 },
    { label: 'Sep', value: 123 },
    { label: 'Oct', value: 186 },
    { label: 'Nov', value: 689 },
    { label: 'Dec', value: 643 },
  ];
  return (
    <View style={styles.container}>
      <BarChart data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
```
```javascript:Components/BarChart.js
import React, { PureComponent } from 'react';
import { Svg, G, Line, Rect } from 'react-native-svg';
import * as d3 from 'd3';

const GRAPH_MARGIN = 20;
const GRAPH_BAR_WIDTH = 5;
const colors = {
  axis: 'black',
  bars: '#15AD13',
};

export default class BarChart extends PureComponent {
  render() {
    // Dimensions
    const SVGHeight = 300;
    const SVGWidth = 300;
    const graphHeight = SVGHeight - 2 * GRAPH_MARGIN;
    const graphWidth = SVGWidth - 2 * GRAPH_MARGIN;
    const { data } = this.props;

    // X scale point
    const xDomain = data.map((item) => item.label);
    const xRange = [0, graphWidth];
    const x = d3
      .scalePoint()
      .domain(xDomain)
      .range(xRange)
      .padding(1);

    // Y scale linear
    const yDomain = [0, d3.max(data, (d) => d.value)];
    const yRange = [0, graphHeight];
    const y = d3
      .scaleLinear()
      .domain(yDomain)
      .range(yRange);

    return (
      <Svg width={SVGWidth} height={SVGHeight}>
        <G y={graphHeight}>
          {/* bars */}
          {data.map((item) => (
            <Rect
              key={item.label}
              x={x(item.label) - GRAPH_BAR_WIDTH / 2}
              y={y(item.value) * -1}
              rx={2.5}
              width={GRAPH_BAR_WIDTH}
              height={y(item.value)}
              fill={colors.bars}
            />
          ))}

          {/* bottom axis */}
          <Line
            x1="0"
            y1="2"
            x2={graphWidth}
            y2="2"
            stroke={colors.axis}
            strokeWidth="0.5"
          />
        </G>
      </Svg>
    );
  }
}
```
<br>
Với hai file trên, chúng ta đã tạo ra được biểu đồ như sau:

![](https://images.viblo.asia/538a3087-aff2-4fc3-86a2-211d2ed6134b.png)

## Bổ sung thêm một vài chi tiết
Chúng ta sẽ bổ sung thêm một vài chi tiết vào component hiện tại của chúng ta. Chúng ta sẽ vẽ hai đường thằng: một đường ở trên cùng, một đường ở giữa. Chúng ta cũng sẽ thêm một label ở phía trên dòng trên cùng thể hiện giá trị được làm tròn của giá trị cao nhất cùng với đơn vị và thêm label ở phía dưới các cột. Vậy ta cần thêm hai prop mới **round** và **unit** cho `<BarChart>`.
<br>

Code của chúng ta cuối cùng sẽ như thế này:
```javascript:App.js
import React from 'react';
import { StyleSheet, View } from 'react-native';

import BarChart from './Components/BarChart';

const App = () => {
  const data = [
    { label: 'Jan', value: 500 },
    { label: 'Feb', value: 312 },
    { label: 'Mar', value: 424 },
    { label: 'Apr', value: 745 },
    { label: 'May', value: 89 },
    { label: 'Jun', value: 434 },
    { label: 'Jul', value: 650 },
    { label: 'Aug', value: 980 },
    { label: 'Sep', value: 123 },
    { label: 'Oct', value: 186 },
    { label: 'Nov', value: 689 },
    { label: 'Dec', value: 643 },
  ];
  return (
    <View style={styles.container}>
      <BarChart data={data} round={100} unit="€" /> // modified
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
```
```javascript:Components/BarChart.js
import React, { PureComponent } from 'react';
import { Svg, G, Line, Rect, Text } from 'react-native-svg'; // modified
import * as d3 from 'd3';

const GRAPH_MARGIN = 20;
const GRAPH_BAR_WIDTH = 5;
const colors = {
  axis: 'black',
  bars: '#15AD13',
};

export default class BarChart extends PureComponent {
  render() {
    // Dimensions
    const SVGHeight = 300;
    const SVGWidth = 300;
    const graphHeight = SVGHeight - 2 * GRAPH_MARGIN;
    const graphWidth = SVGWidth - 2 * GRAPH_MARGIN;
    const { data, round, unit } = this.props;                // modified

    // X scale point
    const xDomain = data.map((item) => item.label);
    const xRange = [0, graphWidth];
    const x = d3
      .scalePoint()
      .domain(xDomain)
      .range(xRange)
      .padding(1);

    // Y scale linear
    const maxValue = d3.max(data, (d) => d.value);           // added
    const topValue = Math.ceil(maxValue / round) * round;    // added
    const yDomain = [0, topValue];                           // modified
    const yRange = [0, graphHeight];
    const y = d3
      .scaleLinear()
      .domain(yDomain)
      .range(yRange);

    // top axis and middle axis
    const middleValue = topValue / 2;                        // added

    return (
      <Svg width={SVGWidth} height={SVGHeight}>
        <G y={graphHeight + GRAPH_MARGIN}>                   // modified
          {/* Top value label */}
          <Text                                              // added
            x={graphWidth}                                   // added
            textAnchor="end"                                 // added
            y={y(topValue) * -1 - 5}                         // added
            fontSize={12}                                    // added
            fill="black"                                     // added
            fillOpacity={0.4}                                // added
          >                                                  // added
            {`${topValue} ${unit}`}                          // added
          </Text>                                            // added

          {/* top axis */}
          <Line                                              // added
            x1="0"                                           // added
            y1={y(topValue) * -1}                            // added
            x2={graphWidth}                                  // added
            y2={y(topValue) * -1}                            // added
            stroke={colors.axis}                             // added
            strokeDasharray={[3, 3]}                         // added
            strokeWidth="0.5"                                // added
          />                                                 // added

          {/* middle axis */}
          <Line                                              // added
            x1="0"                                           // added
            y1={y(middleValue) * -1}                         // added
            x2={graphWidth}                                  // added
            y2={y(middleValue) * -1}                         // added
            stroke={colors.axis}                             // added
            strokeDasharray={[3, 3]}                         // added
            strokeWidth="0.5"                                // added
          />                                                 // added

          {/* bars */}
          {data.map((item) => (
            <Rect
              key={item.label}
              x={x(item.label) - GRAPH_BAR_WIDTH / 2}
              y={y(item.value) * -1}
              rx={2.5}
              width={GRAPH_BAR_WIDTH}
              height={y(item.value)}
              fill={colors.bars}
            />
          ))}

          {/* bottom axis */}
          <Line
            x1="0"
            y1="2"
            x2={graphWidth}
            y2="2"
            stroke={colors.axis}
            strokeWidth="0.5"
          />

          {/* labels */}
          {data.map((item) => (                              // added
            <Text                                            // added
              key={`label${item.label}`}                     // added
              fontSize="8"                                   // added
              x={x(item.label)}                              // added
              y="10"                                         // added
              textAnchor="middle"                            // added
            >                                                // added
              {item.label}                                   // added
            </Text>                                          // added
          ))}                                                // added
        </G>
      </Svg>
    );
  }
}
```
<br>
Trên màn hình giả lập chúng ta sẽ thu được kết quả cuối cùng như sau:

![](https://images.viblo.asia/66999d0f-7181-4a9d-b76b-9df7f6e6a22d.png)

Còn rất nhiều thứ mà bạn có thể làm được bằng D3.js và react-native-svg. Hy vọng bài hướng dẫn nhỏ này đã giúp các bạn nắm được những điều căn bản và mang đến cho các bạn những thứ bạn cần để tạo ra những biểu đồ đẹp cho chính mình.

-----

Nguồn: https://medium.com/kaliop/make-your-own-svg-graph-with-react-native-svg-and-d3-js-dd0250813313.