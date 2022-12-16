# giới thiệu
![](https://images.viblo.asia/ecf65ebc-409e-4c24-82bf-f94a8f83b0a5.jpeg)

Hôm nay mình xin giới thiệu một cách làm biểu đồ trong reactjs với chartjs, thư viện ở đây mình đề cập sắp đến là react-chartjs2 [https://github.com/jerairrest/react-chartjs-2 ](https://github.com/jerairrest/react-chartjs-2)
Thư viện này sử dụng chartjs để viết thành các component trong reactjs (thư viện chartjs hiện đang có https://github.com/chartjs/Chart.js 47k3 lượt rating, quá đáng tin tưởng để xài rồi@@).

# Bắt đầu tìm hiểu
## 1. cài đặt:

```shell
npm install --save react-chartjs-2 chart.js
```

Ở đây mình phải cài đặt 2 thư viện là chart.js và react-chartjs-2, mình phải chú ý phiên bản mà chartjs đang cài đặt là gì, mỗi version update của chartjs có 1 sự thay đổi khác nhau. Trong khi sử dụng có thể không có lỗi, nhưng những config có thể dẫn đến kết quả không như mong muốn.

## 2. Những biểu đồ thường gặp mà nó có thể mô tả được:

Có rất nhiều dạng chart ngoài đời sống thường hay sử dụng, chartjs đã có thể tạo nên. Trong đó có 3 nhóm chính:

- Bar charts: biểu đồ cột
Hình bên dưới là biểu đồ dạng: Vertical, ngoài ra ta còn có thể style theo dạng: Vertical,Horizontal,Multi axis,Stacked,Stacked groups
![](https://images.viblo.asia/dd88f6a2-d086-43f0-991d-923abddc3ddb.png)
- Line charts: biểu đồ đường.
![](https://images.viblo.asia/2780f015-1459-4e42-a180-ed881295acf9.png)
ngoài ra còn có các loại biển đồ khác có thể style: Multi axis,Stepped,Interpolation,Line styles,Point styles,Point sizes

- Area charts: biểu đồ khu vực:
Hình bên dưới là biểu đồ radar
-![](https://images.viblo.asia/4540777d-ef98-46e2-8be5-90553f877cd0.png)
Ngoài ra còn có các dạng khác hay dùng: Doughnut, Pie,vv...

## 3. Cách dùng, cách viết biểu đồ trong reactjs:
Với chartjs, để vẽ được 1 chart, ta thường khai báo hay dùng như thế này để vẽ biểu đồ:
```js
new Chart(element, {
    type: "", // ở đây ta thường khai báo loại chart tương ứng (ví dụ: bar, line,radar, pie,...)
    data: []/{} //mảng dữ liệu, thường là giá trị của biểu đồ, các nhãn,vv
});
    options: {}// object chứa các config , thường là config về tiêu đề, chú thích,...

````

Việc áp dụng với react-chartjs2 tương tự, chỉ là nó viết thành các component để có thể sử dụng dễ dàng hơn.
```js
<Tên loại chart
data = []
options=[]
/>
````
### a) biểu đồ cột đơn: 

Giờ mình sẽ bắt đầu tìm hiểu chi tiết nào. Ví dụ mình muốn tạo biểu đồ cột hiển thị thông tin dự đoán mức độ ô nhiễm của thế giới vào năm 2050. Ở đây các thông số cơ bản của biểu đồ cột: giá trị ô nhiễm (trục y), trục x là các châu lục. Ngoài ra để dễ nhìn thì ta thêm màu sắc, tiêu đề của biểu đồ vào

```js
import React from "react";
import { Bar } from "react-chartjs-2";
.....

<Bar
    data={{
      labels: [
        "Africa",
        "Asia",
        "Europe",
        "Latin America",
        "North America"
      ],
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: [
            "#3e95cd",
            "#8e5ea2",
            "#3cba9f",
            "#e8c3b9",
            "#c45850"
          ],
          data: [2478, 5267, 734, 784, 433]
        }
      ]
    }}
    options={{
      legend: { display: false },
      title: {
        display: true,
        text: "Predicted world population (millions) in 2050"
      }
    }}
  />
```
Thuộc tính data:
- labels: các nhãn dán trục x
- datasets: 
    - label ở đây là tooltips khi ta hover vào cột biểu đồ, nó sẽ ra: Population (millions): giá trị.
    - data : các giá trị --> tự động chia khoảng cách trục y, nếu muốn chia bằng tay, ta có thể config ở options --> steps
- options: mình chỉ config cơ bản với biểu đồ cột này:
    - legend (chú thích): mình cho nó ẩn đi luôn
    - title: tiêu đề của nó, text: là văn bản của tiêu đề

===> kết quả sẽ là:
![](https://images.viblo.asia/e1bf7937-44c6-4fe4-8184-3d95a88bfb7a.png)

====> ở cây element: ta sẽ thấy nó sinh chart là 1 thẻ canvas --> chartjs dùng mã js vẽ trên canvas:
```html
<canvas height="363" width="726" class="chartjs-render-monitor" style="display: block; width: 726px; height: 363px;"></canvas>
```

### b) biểu đồ đường
Một ví dụ khác: vẽ biểu đồ mật độ dân số thể giới các châu lục qua từng năm --> ta sẽ làm về biểu đồ đường .
Ở đây mỗi đường là mỗi châu lục, giá trị tại mỗi điểm tương ứng với dân số của châu lục tại năm đó

```js
import React from "react";
import { Doughnut } from "react-chartjs-2";

........

<Line
    data={{
      labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
      datasets: [
        {
          data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
          label: "Africa",
          borderColor: "#3e95cd",
          fill: false
        },
        {
          data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
          label: "Asia",
          borderColor: "#8e5ea2",
          fill: false
        },
        {
          data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
          label: "Europe",
          borderColor: "#3cba9f",
          fill: false
        },
        {
          data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
          label: "Latin America",
          borderColor: "#e8c3b9",
          fill: false
        },
        {
          data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433],
          label: "North America",
          borderColor: "#c45850",
          fill: false
        }
      ]
    }}
    options={{
      title: {
        display: true,
        text: "World population per region (in millions)"
      },
      legend: {
        display: true,
        position: "bottom"
      }
    }}
  />

```
Điểm khác biệt với biểu đồ cột đơn ở trên, biểu đồ đường data là 1 array, mỗi element sẽ chứa:
- data: giá trị dân số qua các năm
- label: tên châu lục
- borderColor: màu sắc đường
- fill: ở đây có tô hay không( tô màu vùng chứa đường đó)

Option ở đây:
- title : cũng là tiêu đồ biểu đồ
- lengend: lần này biểu đồ đường,ta muốn hiển thị chú thích với vị trí top/right/bottom/left

![](https://images.viblo.asia/9969f322-d2b6-476a-bcff-ac5d4c08299c.png)


### c) biểu đồ hình tròn
Tương tự ta có 1 ví dụ:
```js
<Doughnut
        data={{
          labels: [
            "Africa",
            "Asia",
            "Europe",
            "Latin America",
            "North America"
          ],
          datasets: [
            {
              label: "Population (millions)",
              backgroundColor: [
                "#3e95cd",
                "#8e5ea2",
                "#3cba9f",
                "#e8c3b9",
                "#c45850"
              ],
              data: [2478, 5267, 734, 784, 433]
            }
          ]
        }}
        option={{
          title: {
            display: true,
            text: "Predicted world population (millions) in 2050"
          }
        }}
      />
```
![](https://images.viblo.asia/d5e0b260-d818-4ab8-bda0-014bd3a1cc30.png)


# Kết luận:

react-chartjs2 với chartjs là 1 bộ đôi đáng để sử dụng để vẽ biểu đồ, ví nó đã hỗ trợ hầu hết các loại biểu đồ hay gặp. ngoài ra, nó còn hỗ trợ config để có được biểu đồ tương ứng hay việc set event(khi click vào từng item,vv)

Ngoài ra, nó còn hỗ trợ set animation, style gradient,vv hay các hành động phóng to thu nhỏ qua các config extension (tự code tay hoặc qua thư viện cũng được). Hẹn gặp ở bài tới với nội dung chi tiết hơn

Tham khảo
- Trang chủ chartjs : https://www.chartjs.org/
-  Trang chủ react-chartjs2:  https://www.chartjs.org/docs/latest/getting-started/
-  Docs:  https://www.chartjs.org/docs/latest/getting-started
- Ví dụ hay gặp: https://tobiasahlin.com/blog/chartjs-charts-to-get-you-started/