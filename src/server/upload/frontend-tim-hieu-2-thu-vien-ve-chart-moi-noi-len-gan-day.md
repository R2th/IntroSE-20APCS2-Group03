## I> Mở đầu:
Để tạo ra 1 Chart, thường mọi người hay chọn Highchart (https://github.com/highcharts/highcharts)  hoặc Chartjs(https://www.chartjs.org/) vì nó có độ ổn định và đã được anh em tin tưởng. Hôm nay, mình xin  giới thiệu 2 thư viện Chart, mọi người thử xem nó có gì khác so với 2 anh lớn kia nhé.

## II> Thư viện thứ 1 - tui.chart:
**Trang chủ** : https://ui.toast.com/tui-chart 

**Github** : https://github.com/nhn/tui.chart/

Vừa vào trang chủ đã thấy thông tin giới thiệu là 1 thư viện do mấy anh Hàn Quốc phát triển, và điều ấn tượng đối với mình là thư viện này được mấy anh update liên tục :v:  đồng thời tài liệu khá đầy đủ, đơn giản dễ dùng phù hợp với các nhu cầu cơ bản. Đồng thời theo giới thiệu support khá tốt các trình duyệt (có IE 10+ là vip rồi):

![](https://images.viblo.asia/87177946-777c-40f0-bf44-113adb73d8fa.JPG)

- Loại chart mà nó hỗ trợ cũng khá đầy đủ:
-![](https://images.viblo.asia/44ba446a-2e6c-40ae-a706-d124ce722b2d.JPG)

- Có support cho cả React và Vue:
[Vue](https://github.com/nhn/tui.chart/tree/main/apps/vue-chart), 
[React](https://github.com/nhn/tui.chart/tree/main/apps/vue-chart)

Phần ví dụ tớ sẽ viết với Reactjs nên trước tiên cài đặt như thế này nhé:
```cmd
create-react-app myapp
cd myapp
npm install @toast-ui/chart
npm install @toast-ui/react-chart
````

- Một tính năng nổi bật : responsive và zoomable ( tớ định embed ảnh gif nhưng vì ảnh lớn quá nên mình gắn link thôi nhé):

https://user-images.githubusercontent.com/35371660/105812424-77681900-5ff1-11eb-9b3c-402798703bc5.gif

https://user-images.githubusercontent.com/35371660/105669323-68666580-5f22-11eb-8344-be57d7468b93.gif

Ngoài ra tooltip cũng ổn:

https://user-images.githubusercontent.com/35371660/105493953-65d6f680-5cfd-11eb-9b51-204dbfd589c9.gif 

Mình đã giới thiệu sơ qua, giờ cùng tìm hiểu chi tiết hơn với 1 số ví dụ bạn nhé.

### 1. LineChart:
- Bài toán: tạo chart thể hiện nhiệt độ trung bình của các thành phố.

```js
import React, { useRef } from "react";
import "@toast-ui/chart/dist/toastui-chart.min.css";
import { BarChart, LineChart, BubbleChart } from "@toast-ui/react-chart";

function LineChartExample() {
  const data = {
    categories: [
      "01/01/2020",
      "02/01/2020",
      "03/01/2020",
      "04/01/2020",
      "05/01/2020",
      "06/01/2020",
      "07/01/2020",
      "08/01/2020",
      "09/01/2020",
      "10/01/2020",
      "11/01/2020",
      "12/01/2020"
    ],
    series: [
      {
        name: "Seoul",
        data: [
          -3.5,
          -1.1,
          4.0,
          11.3,
          17.5,
          21.5,
          25.9,
          27.2,
          24.4,
          13.9,
          6.6,
          -0.6
        ]
      },
      {
        name: "Seattle",
        data: [3.8, 5.6, 7.0, 9.1, 12.4, 15.3, 17.5, 17.8, 15.0, 10.6, 6.6, 3.7]
      },
      {
        name: "Sydney",
        data: [
          22.1,
          22.0,
          20.9,
          18.3,
          15.2,
          12.8,
          11.8,
          13.0,
          15.2,
          17.6,
          19.4,
          21.2
        ]
      },
      {
        name: "Moscow",
        data: [
          -10.3,
          -9.1,
          -4.1,
          4.4,
          12.2,
          16.3,
          18.5,
          16.7,
          10.9,
          4.2,
          -2.0,
          -7.5
        ]
      },
      {
        name: "Jungfrau",
        data: [
          -13.2,
          -13.7,
          -13.1,
          -10.3,
          -6.1,
          -3.2,
          0.0,
          -0.1,
          -1.8,
          -4.5,
          -9.0,
          -10.9
        ]
      }
    ]
  };
  const options = {
    chart: { title: "24-hr Average Temperature", width: 1000, height: 500 },
    xAxis: {
      title: "Month"
    },
    yAxis: {
      title: "Amount"
    },
    tooltip: {
      formatter: (value) => `${value}°C`
    },
    legend: {
      align: "bottom"
    }
  };

  return <LineChart data={data} options={options} />;
}
```
- Kết quả:
![](https://images.viblo.asia/d976f6aa-ca55-4b21-958a-d0c7b8ea2c36.JPG)

Như các thư viện khác, khi hover vào các line sẽ hiển thị ra tooltip hoặc click vào các label (legend) sẽ tắt/mở các line. Có 1 tính năng tính hợp sẵn khá hay là nó có thể export ra các định dạng khác nhau như hình dưới đây:
![](https://images.viblo.asia/139c0784-c7ba-4c3d-a2fc-35dfd415222a.JPG)

### 2< BarChart:
- Bài toán: Vẽ chart thể hiện mức lương trung bình theo từn g tháng.
```js
function BarChartExample() {
  const chartRef = useRef(null);
  const data = {
    categories: ["June", "July", "Aug", "Sep", "Oct", "Nov"],
    series: [
      {
        name: "Budget",
        data: [5000, 3000, 5000, 7000, 6000, 4000]
      },
      {
        name: "Income",
        data: [8000, 1000, 7000, 2000, 5000, 3000]
      }
    ]
  };

  const options = {
    chart: {
      width: 1160,
      height: 650,
      title: "Monthly Revenue"
    },
    yAxis: {
      title: "Month"
    },
    xAxis: {
      title: "Amount"
    }
  };

  const containerStyle = {
    width: "600px",
    height: "600px",
  };

  const handleClickButton = () => {
    console.log(
      "type:",
      chartRef.current.getInstance(),
      chartRef.current.getInstance().getOptions()
    );

    chartRef.current.getInstance().hideTooltip();
  };

  return (
    <>
      <BarChart
        ref={chartRef}
        data={data}
        options={options}
        // style={containerStyle}
      />
      <button onClick={handleClickButton}>test options</button>
    </>
  );
}
```
- Kết quả:
![](https://images.viblo.asia/2b5dd9e5-b44f-4299-bdcd-0da6ed109aea.JPG)

- Ngoài vẽ chart ra, ở ví dụ này mình đã thử gắn ref và test event của nó nhé:
 ```js
   const handleClickButton = () => {
    console.log(
      "type:",
      chartRef.current.getInstance(),
      chartRef.current.getInstance().getOptions()
    );

    chartRef.current.getInstance().hideTooltip();
  };
  ```
 Các bạn có thể xem log, ta sẽ thấy được các event và property của nó như hình dưới đây:
 ![](https://images.viblo.asia/dccdb045-7947-436d-93a0-fa4f4cbf57b6.JPG)

### 3>  Buble Chart:
Bài toán: Vẽ biểu đồ thể hiện mức sống mong đợi theo GPD  của 1 số khu vực trên thế giới.
```js
const BubbleChartExample = () => {
  const data = {
    series: [
      {
        name: "Africa",
        data: [
          { x: 4200, y: 70.35, r: 32209101, label: "Morocco" },
          { x: 4200, y: 70.71, r: 76117421, label: "Egypt" },
          { x: 5900, y: 56.46, r: 1355246, label: "Gabon" },
          { x: 6600, y: 72.74, r: 32129324, label: "Algeria" },
          { x: 6700, y: 76.28, r: 5631585, label: "Libya" },
          { x: 7100, y: 74.66, r: 9974722, label: "Tunisia" },
          { x: 10500, y: 69.28, r: 1096585, label: "Trinidad and Tobago" },
          { x: 12800, y: 72.09, r: 1220481, label: "Mauritius" },
          { x: 18200, y: 78.68, r: 396851, label: "Malta" }
        ]
      },
      {
        name: "America",
        data: [
          { x: 4800, y: 74.64, r: 6191368, label: "Paraguay" },
          { x: 4900, y: 70.92, r: 6587541, label: "El Salvador" },
          { x: 5600, y: 69.22, r: 2754430, label: "Peru" },
          { x: 5800, y: 74.06, r: 2501738, label: "Venezuela" },
          { x: 6300, y: 67.63, r: 8833634, label: "Dominican Republic" },
          { x: 6500, y: 67.43, r: 272945, label: "Belize" },
          { x: 6600, y: 71.43, r: 4231077, label: "Colombia" },
          { x: 6900, y: 72.14, r: 3000463, label: "Panama" },
          { x: 8100, y: 71.41, r: 78410118, label: "Brazil" },
          { x: 9600, y: 76.63, r: 3956507, label: "Costa Rica" },
          { x: 9600, y: 74.94, r: 4495959, label: "Mexico" },
          { x: 12400, y: 75.7, r: 6914475, label: "Argentina" },
          { x: 14500, y: 75.92, r: 3399237, label: "Uruguay" },
          { x: 16400, y: 71.64, r: 278289, label: "Barbados" },
          { x: 17700, y: 65.63, r: 299697, label: "Bahamas, The" },
          { x: 17700, y: 77.49, r: 3897960, label: "Puerto Rico" },
          { x: 31500, y: 79.96, r: 32507874, label: "Canada" },
          { x: 32100, y: 77.43, r: 89302754, label: "United States" }
        ]
      },
      {
        name: "Asia",
        data: [
          { x: 5600, y: 71.96, r: 92988000, label: "China" },
          { x: 5700, y: 61.29, r: 4863169, label: "Turkmenistan" },
          { x: 7700, y: 69.66, r: 19018924, label: "Iran" },
          { x: 7800, y: 66.07, r: 1514370, label: "Kazakhstan" },
          { x: 8100, y: 71.41, r: 14865523, label: "Thailand" },
          { x: 9700, y: 71.95, r: 23522482, label: "Malaysia" },
          { x: 12000, y: 75.23, r: 25795938, label: "Saudi Arabia" },
          { x: 13100, y: 72.85, r: 2903165, label: "Oman" },
          { x: 19200, y: 75.58, r: 48598170, label: "Korea, South" },
          { x: 19200, y: 73.98, r: 677886, label: "Bahrain" },
          { x: 20800, y: 79.17, r: 6199008, label: "Israel" },
          { x: 21300, y: 76.84, r: 2257549, label: "Kuwait" },
          { x: 23200, y: 73.4, r: 840290, label: "Qatar" },
          { x: 25200, y: 74.99, r: 2523915, label: "United Arab Emirates" },
          { x: 25300, y: 77.06, r: 22749838, label: "Taiwan" },
          { x: 27800, y: 81.53, r: 4353893, label: "Singapore" },
          { x: 29400, y: 81.04, r: 52733300, label: "Japan" },
          { x: 34200, y: 81.39, r: 6855125, label: "Hong Kong" }
        ]
      },
      {
        name: "Europe",
        data: [
          { x: 7700, y: 71.12, r: 2235555, label: "Romania" },
          { x: 8200, y: 71.75, r: 7517973, label: "Bulgaria" },
          { x: 9800, y: 66.39, r: 54378233, label: "Russia" },
          { x: 10700, y: 76.38, r: 1582395, label: "Chile" },
          { x: 11200, y: 74.14, r: 4496869, label: "Croatia" },
          { x: 11500, y: 70.86, r: 2306306, label: "Latvia" },
          { x: 12000, y: 74.16, r: 38626349, label: "Poland" },
          { x: 12500, y: 73.46, r: 3607899, label: "Lithuania" },
          { x: 14300, y: 71.38, r: 1341664, label: "Estonia" },
          { x: 14500, y: 74.19, r: 5423567, label: "Slovakia" },
          { x: 14900, y: 72.25, r: 1003237, label: "Hungary" },
          { x: 16800, y: 75.78, r: 1024617, label: "Czech Republic" },
          { x: 17900, y: 77.35, r: 1052414, label: "Portugal" },
          { x: 19600, y: 75.93, r: 2011473, label: "Slovenia" },
          { x: 21300, y: 78.94, r: 10647529, label: "Greece" },
          { x: 23300, y: 79.37, r: 40280780, label: "Spain" },
          { x: 27700, y: 79.54, r: 58057477, label: "Italy" },
          { x: 28400, y: 80.3, r: 898640, label: "Sweden" },
          { x: 28700, y: 78.54, r: 22424609, label: "Germany" },
          { x: 28700, y: 79.44, r: 30424213, label: "France" },
          { x: 29000, y: 78.24, r: 5214512, label: "Finland" },
          { x: 29500, y: 78.68, r: 16318199, label: "Netherlands" },
          { x: 29600, y: 78.27, r: 60270708, label: "United Kingdom" },
          { x: 30600, y: 78.44, r: 10348276, label: "Belgium" },
          { x: 31300, y: 78.87, r: 8174762, label: "Austria" },
          { x: 31900, y: 77.36, r: 3969558, label: "Ireland" },
          { x: 31900, y: 80.18, r: 293966, label: "Iceland" },
          { x: 32200, y: 77.44, r: 5413392, label: "Denmark" },
          { x: 33800, y: 80.31, r: 7450867, label: "Switzerland" }
        ]
      },
      {
        name: "Oceania",
        data: [
          { x: 2200, y: 64.56, r: 5420280, label: "Papua New Guinea" },
          { x: 2700, y: 61.32, r: 100798, label: "Kiribati" },
          { x: 5900, y: 69.2, r: 880874, label: "Fiji" },
          { x: 14500, y: 78.75, r: 108775, label: "Virgin Islands" },
          { x: 23200, y: 78.49, r: 1993817, label: "New Zealand" },
          { x: 30700, y: 80.26, r: 5991314, label: "Australia" }
        ]
      }
    ]
  };
  const options = {
    chart: {
      title: "Life Expectancy per GDP",
      width: 1000,
      height: 600
    },
    yAxis: {
      title: "Life Expectancy (years)"
    },
    xAxis: {
      title: "GDP"
    },
    theme: {
      tooltip: {
        background: "#80CEE1",
        borderColor: "#3065AC",
        borderWidth: 10,
        borderRadius: 20,
        borderStyle: "double",
        header: {
          fontSize: 15,
          fontWeight: 700,
          color: "#333333",
          fontFamily: "monospace"
        },
        body: {
          fontSize: 11,
          fontWeight: 700,
          color: "#a66033",
          fontFamily: "monospace"
        }
      }
    }
  };
  return <BubbleChart options={options} data={data} />;
};
````
- Kết quả:
![](https://images.viblo.asia/32976636-359a-4649-973b-0a08038e06c5.JPG)
Chắc các bạn đọc cod e trên cũng để ý có đoạn tớ có custom lại theme:
```js
 const options = {
........
    theme: {
      tooltip: {
        background: "#80CEE1",
        borderColor: "#3065AC",
        borderWidth: 10,
        borderRadius: 20,
        borderStyle: "double",
        header: {
          fontSize: 15,
          fontWeight: 700,
          color: "#333333",
          fontFamily: "monospace"
        },
        body: {
          fontSize: 11,
          fontWeight: 700,
          color: "#a66033",
          fontFamily: "monospace"
        }
      }
    }
  };
````
Các bạn thử nghiên cứu thêm nhiều option với nhiều loại Chart khác nữa nhé, mình viết cuxgn dài rồi nên tạm ngừng tại đây

## III> Thư viện thứ 2: charts.css
**Trang chủ**: https://chartscss.org/  
**Github** :(https://github.com/ChartsCSS/charts.css)

Đây là 1 thư viện khá mới, phát triển từ năm ngoái tuy nhiên số sao cũng khá cao đủ để bạn suy nghĩ sẽ nghiên cứu và dùng. 
- Loại chart hỗ trợ: thư viện chỉ đang support 1 số chart cơ bản như Bar, line, Area, Column và Mix . Các loại khác hiện tại đang phát triển.
- Điều đặt biệt: thay vì vẽ canvas,  thư viện sẽ style các thẻ table, tr, td và after before để tạo chart. Điều này sẽ giúp chúng ta dễ custom hơn. Mình rất mong chờ nó sẽ hoàn thiện hơn

Vì bài viết đã dài nên mình chỉ giới thiệu sơ qua thôi, bạn vào trang chủ sẽ thấy nó có ví dụ rất rõ ràng

## IV> kết luận
Cảm ơn các bạn đã đọc bài viết, bài viết này tớ chỉ giới thiệu 2 thư viện để tạo chart, các thư viện này đều có nét hay của nó các bạn hãy cân nhắc dùng thử vào dự án của mình nhé

Toàn bộ ví dụ ** tui.chart** ở đây nhé bạn: 
https://codesandbox.io/s/sad-colden-ivx8v?file=/src/App.js
Demo https://ivx8v.csb.app/

**Tham khảo:**

https://ui.toast.com/tui-chart 

https://github.com/nhn/tui.chart/

https://chartscss.org

https://github.com/ChartsCSS/charts.css