# Lời nói đầu
Xin chào các bạn, lâu lắm rồi mình mới lại viết bài. Thì như các bạn biết đấy, khi chúng ta vào dashboard thì hầu hết mọi template dashboard sẽ có biểu đồ thống kê, có thể có một chiếc hoặc là rất nhiều chiếc biểu đồ hiển thị ra ngay ở lần đầu tiên mình vào. Có rất nhiều các thư viện vẽ biểu đồ đẹp như Google Chart, ChartJS, Ember Charts, Smothies Charts,... Vô vàn các package thư viện vẽ biểu đồ, trong bài viết lần này thì mình muốn giới thiệu tới các bạn thư viện Vue Chart để vẽ biểu đồ cực kỳ đơn giản và tiện lợi nhé.

# Tiểu sử
Tiền thân của thư viện này đó chính là bắt nguồn từ `Chart.js`, nó rất tiện dụng và hiện đại, thư viện được build trên HTML5 canvas. Nó bao gồm 8 dạng biểu đồ khác nhau, dễ dàng extend và config để dùng trong Vue. Và trên hết, yếu tố đẹp dễ nhìn và bắt mặt thì đều nằm trọn trong thư viện này.

Các bạn có thể cài đặt qua npm hoặc yarn nhé
```Javascript
yarn add vue-chartjs chart.js or npm install vue-chartjs chart.js --save
```

Hoặc các bạn có thể dùng CDN
```Javascript
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>
<script src="https://unpkg.com/vue-chartjs/dist/vue-chartjs.min.js"></script>
```

# Hướng dẫn sử dụng
Mình sẽ không nói phần set up project như thê nào, vì có bạn dùng vue cli bình thường, có bạn sẽ dùng nuxtjs, hoặc có bạn tích hợp vue ngay trong project laravel. Mình sẽ đi thẳng trực tiếp vào vấn đề đó chính là làm sao để tạo ra được biểu đồ nhé :)

Bạn cần import base và extend chúng như sao, tạo 1 file `LineChart.vue`
```Javascript
<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  mounted() {
       this.renderChart(data, options)
  }
};
</script>
```
Các bạn có thể thay thế ` extends: Line` bằng `mixins: [Line]` cũng được nhé. Phương thức `this.renderChart()` được cung cấp bởi `Line` component và nhận 2 tham số data và options.

Cấu trúc của chartData và options như sau
```Javascript
<script>
    import { Line, mixins } from 'vue-chartjs';

    const { reactiveProp } = mixins;

    export default {
        extends: Line,
        mixins: [reactiveProp],
        props: {
            chartData: Object,
            options: Object,
        },
        mounted() {
            this.renderChart({
                labels,
                datasets: [
                    {
                        label: 'Average Score',
                        data,
                        backgroundColor: 'transparent',
                        borderColor: 'rgba(1, 116, 188, 0.50)',
                        pointBackgroundColor: 'rgba(171, 71, 188, 1)',
                    },
                ],
            }, {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: this.$t("Average member's score"),
                },
                ...this.options,
            });
        },
    };
</script>

```

Nếu như 2 tham số của hàm `renderChart` các bạn muốn truyền vào trong component cha khác thì các bạn có thể viết như sau
```Javascript
<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['chartdata', 'options'],
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>

<style>
</style>
```
Chú ý trong file này các bạn khong nên thêm tag `<template></template>` bởi vì Vue sẽ không thể hợp nhất template. Nếu bạn thêm thẻ trên và không có nội dung gì thì Vue sẽ lấy nội dung rỗng đấy từ component mà không lấy phần extend `Line` mà bạn khai báo ở trong cặp thẻ `<script></script>` ở dưới, từ đó sẽ ra kết quả sai lệch.

Và một điều mình muốn nói nữa nếu các bạn muốn update dữ liệu khi các bạn thay đổi dữ liệu từ component cha thì các bạn có thể sử dụng mixin `reactiveProp` hoặc `reactiveData`. Cả 2 minxin này thực chất là giống nhau, nhưng hầu hết chúng ta sử dụng `reactiveProp`. Nó extend từ logic của chart component và tạo một cách tự động prop với tên `chartData` và add prop này vào `vue watch` để theo dõi xem nếu prop thay đổi thì chart nó sẽ có thể tự động vẽ lại. Khi dữ liệu thay đổi, nó sẽ gọi đến `update()` nếu chỉ dữ liệu bên trong `dataset` thay đổi hoặc gọi đến `renderChart()` nếu một dataset mới được thêm vào.

`reactiveData` đơn giản là tạo ra biến local `chartData`, nó không phải là prop được truyền vào và nó được add vào watcher. Cái này chỉ dùng nếu bạn cần vẽ các biểu đồ mà gọi API và api gọi ngay bên trong chart component.

# Ví dụ
**AreaChart.vue**
```Javascript
<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  data() {
    return {
      gradient: null,
      gradient2: null
    };
  },
  mounted() {
    this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient2 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);

    this.gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
    this.gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
    this.gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

    this.gradient2.addColorStop(0, "rgba(0, 231, 255, 0.9)");
    this.gradient2.addColorStop(0.5, "rgba(0, 231, 255, 0.25)");
    this.gradient2.addColorStop(1, "rgba(0, 231, 255, 0)");

    this.renderChart(
      {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
        datasets: [
          {
            label: "Data One",
            borderColor: "#FC2525",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "white",
            backgroundColor: this.gradient,
            data: [40, 39, 10, 40, 39, 80, 40]
          },
          {
            label: "Data Two",
            borderColor: "#05CBE1",
            pointBackgroundColor: "white",
            pointBorderColor: "white",
            borderWidth: 1,
            backgroundColor: this.gradient2,
            data: [60, 55, 32, 10, 2, 12, 53]
          }
        ]
      },
      { responsive: true, maintainAspectRatio: false }
    );
  }
};
</script>
```
Kết quả:
![](https://images.viblo.asia/d2cf89db-0bf8-430b-aab9-83a7c3f74512.png)

**BarChart.vue**
```Javascript
<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  mounted() {
    this.renderChart(
      {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
          }
        ]
      },
      { responsive: true, maintainAspectRatio: false }
    );
  }
};
</script>

```

Kết quả:
![](https://images.viblo.asia/27820b2f-0fcf-43de-be54-da2115a7bf2e.png)

**LineChart.vue**
```Javascript
<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  mounted() {
    this.renderChart(
      {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
        datasets: [
          {
            label: "Data 1",
            data: [2, 10, 5, 9, 0, 6, 20],
            backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)"
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "My Data"
        }
      }
    );
  }
};
</script>
```

Kết quả:
![](https://images.viblo.asia/281e8797-9e68-4a31-ac18-9ceaf161a000.png)

**PieChart.vue**
```Javascript
<script>
import { Pie } from "vue-chartjs";

export default {
  extends: Pie,
  mounted() {
    this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient2 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);

    this.gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
    this.gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
    this.gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

    this.gradient2.addColorStop(0, "rgba(0, 231, 255, 0.9)");
    this.gradient2.addColorStop(0.5, "rgba(0, 231, 255, 0.25)");
    this.gradient2.addColorStop(1, "rgba(0, 231, 255, 0)");
    this.renderChart(
      {
        labels: ["Books", "Magazines", "Newspapers"],
        datasets: [
          {
            backgroundColor: [this.gradient, this.gradient2, "#00D8FF"],
            data: [40, 20, 10]
          }
        ]
      },
      { responsive: true, maintainAspectRatio: false }
    );
  }
};
</script>
```

Kết quả:
![](https://images.viblo.asia/b0e32be7-b723-4419-aa12-4c8177de4cc1.png)

**RadarChart.vue**
```Javascript
<script>
import { Radar } from "vue-chartjs";

export default {
  extends: Radar,
  mounted() {
    this.renderChart(
      {
        labels: [
          "Eating",
          "Drinking",
          "Sleeping",
          "Designing",
          "Coding",
          "Cycling",
          "Running"
        ],
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "rgba(179,181,198,0.2)",
            borderColor: "rgba(179,181,198,1)",
            pointBackgroundColor: "rgba(179,181,198,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(179,181,198,1)",
            data: [65, 59, 90, 81, 56, 55, 40]
          },
          {
            label: "My Second dataset",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            pointBackgroundColor: "rgba(255,99,132,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(255,99,132,1)",
            data: [28, 48, 40, 19, 96, 27, 100]
          }
        ]
      },
      { responsive: true, maintainAspectRatio: false }
    );
  }
};
</script>
```

Kết quả:
![](https://images.viblo.asia/992ce67a-1d24-4269-a27f-ed1e57d491b0.png)

# Kết luận
Qua một vài chia sẻ ở trên của mình, dù chưa đầy đủ và hoàn thiện lắm những cũng một phần giúp các bạn hiểu được về package Vue Chart. Mong rằng giúp ích được các bạn có thể áp dụng được trong project của mình. Cảm ơn các bạn đã đọc bài viết của mình.

# Tham khảo
https://vue-chartjs.org/
https://www.chartjs.org/