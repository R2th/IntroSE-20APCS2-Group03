# Mở Đầu
Chắc hẳn ae đi làm đã từng động đến việc thống kê số liệu và vẽ biểu đồ, nhất là mấy trang buôn bán thì việc có biểu đồ thống kê số lượng sản phẩm bán ra,  sản phẩm bán chạy... là rất quan trọng. Vì thế hôm nay mình cùng các bạn tìm hiểu về 1 một thư viện hỗ trợ việc vẽ biểu đồ hiệu quả đó là `Chart.js`. Trong bài viết này thì mình sẽ cùng các bạn tìm hiểu cách dùng `Chart.js` trong `vue` nhé :D bắt đầu thôi nào 

# Cài Đặt 
Bạn có thể cài đặt `chart.js` bằng `npm` hoặc `yarn`
* npm 

    ```npm install chart.js --save ```
    
 * yarn 

      ```yarn add chartjs --save ```

# Tạo Biểu Đồ

#### Bước 1:
Mình sẽ tạo 1 components có tên là chartjs.vue với nội dung như sau: 
``` 
    <script>
        import { Line } from 'vue-chartjs'

        export default {
          extends: Line,
          props: ['data', 'options'],
          mounted () {
            this.renderChart(this.data, this.options)
          }
        }
    </script>

```
#### Bước 2: 
ở components cha là file `index.vue` mình import file `chartjs.vue` vào với nội dung như sau 
  ```
                <chart
                  :data="chartData"
                  :options="options"
                />
 ```
 và phần data có nội dung như sau
   ```
  data () {
    return {
      data: {
        labels: [1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020],
        datasets: [{
          data: [70, 95, 100, 120, 257, 271, 300, 321, 383, 450],
          label: 'Cây lương thực',
          borderColor: '#3e95cd'
        }, {
          data: [70, 80, 111, 129, 135, 209, 247, 372, 400, 426],
          label: 'Cây công nghiệp',
          borderColor: '#8e5ea2'
        }, {
          data: [70, 78, 128, 150, 203, 276, 300, 317, 375, 434],
          label: 'Rau đậu',
          borderColor: '#3cba9f'
        }, {
          data: [70, 107, 170, 200, 254, 293, 314, 337, 268, 384],
          label: 'Cây ăn quả',
          borderColor: '#e8c3b9'
        }, {
          data: [70, 100, 135, 157, 187, 201, 222, 272, 312, 433],
          label: 'Cây khác',
          borderColor: '#c45850'
        }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Đồ thị tăng trưởng giá trị sản xuất các nhóm cây trồng'
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  ```
  và đây là kết quả mình nhận được 
  ![](https://images.viblo.asia/fc50317c-3483-4c45-a9cd-e1a7f6b054c6.png)
  
  cũng đẹp phết chứ nhỉ :D, thôi k lan man nữa mình sẽ đi vào giải thích  đầu tiên là ở  components `chartjs.vue`  ở dòng thứ 2 ``` import { Line } from 'vue-chartjs' ```chúng ta thấy có `{Line}` . Thì `{Line}` ở đây là loại biểu đồ, ngoài `Line` còn có 
  * bar
  * radar
  * doughnut and pie
  * polar area
  * bubble
  * scatter
  
  Cú pháp khai báo cũng tương tự ``` import { loại biểu đồ } from 'vue-chartjs' ```
  phần cuối mình sẽ lấy thêm ví dụ một số loại biểu đồ khác nữa :D. Tiếp theo chúng ta thấy có ``` props: ['data', 'options'],``` . Ở đây 
  #####  data:  bao gồm `labels` và `datasets`
  * labels:  là một tập các nhãn dán
  * datasets:
      * data : giá trị mà `chart.js` lấy vào để vẽ biểu đồ
      *  label: chú thích cho nhãn dán (có thể bỏ chú thích)
      *  borderColor: màu để vẽ biểu đồ 
  #####  options:
* `title` là tên của biểu đồ. bạn có thể xem chi tiết ở [đây](https://www.chartjs.org/docs/latest/configuration/title.html?h=title)
 * `legend`: chú giải bạn có thể bật tắt chú giải bằng cách thêm đoạn code sau 
  ` legend: {
          display: true
        },`
còn rất nhiều tùy chỉnh về chú giải bạn có thể xem chi tiết ở [đây](https://www.chartjs.org/docs/latest/configuration/legend.html?h=legend)
Ngoài ra mình thấy còn  thuộc tính cũng khá hữu ích và hay được sử dụng như là : 
* `Responsive` : để có thể thay đổi kích thước của biểu đồ 
Có 2 thuộc tính của `Responsive` mà mình hay sử dụng đó là 
    * maintainAspectRatio: dùng để giữ tỉ lệ (chiều rộng / chiều dài) khi kích thước biểu đồ thay đổi
    * aspectRatio: xác định lại tỉ lệ (chiều rộng / chiều dài)
    
  Còn một số thuộc tính nữa của `Responsive`  bạn có thể tham khảo ở  [đây](https://www.chartjs.org/docs/latest/general/responsive.html?h=res)
  
 Trên đây chỉ là một số options cơ bàn cần thiết mà mình đưa ra nếu có thời gian các bạn nên trang chủ của `chart.js` để xem thêm nhé. Bây giờ mình sẽ đi vào một số ví dụ 
 # Ví Dụ
 
### Bar
![](https://images.viblo.asia/2260e8ae-2a44-462c-b5b6-99c5f407f1e4.png)

```
      data: {
        labels: ['1990', '1995', '2000', '2005', '2010', '2015', '2020'],
        datasets: [{
          label: 'đơn vị (triệu tấn)',
          backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850', '#3e95cd', '#8e5ea2'],
          data: [63.2, 52.1, 73.4, 78.4, 80.5, 79.2, 82.1]
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Biểu đồ  sản lượng lương thực việt nam'
        },
        responsive: true,
        maintainAspectRatio: false
      }
```
### Pie
![](https://images.viblo.asia/f63724c6-e260-434a-b853-ddcfd105e800.png)

```
      data: {
        labels: ['1990', '1995', '2000', '2005', '2010', '2015', '2020'],
        datasets: [{
          label: 'đơn vị (triệu tấn)',
          backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850', '#dcd615', '#57d408'],
          data: [63.2, 52.1, 73.4, 78.4, 80.5, 79.2, 82.1]
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Biểu đồ  sản lượng lương thực việt nam'
        },
        responsive: true,
        maintainAspectRatio: false
      }
```
### Doughnut
Cũng tương tự nhue `Pie`
![](https://images.viblo.asia/e6f0bf7a-8686-4eb5-85aa-9f5d65e70615.png)

***Lưu ý*** : Bạn nhớ là khi muốn dùng biểu đồ nào thì nhớ đổi tên biểu đồ tương ứng  ở  components có tên là chartjs.vue mình nói ở trên nhé.  
# Kết Luận
Như vậy mình và các bạn đã cùng tìm hiểu về cách vẽ biểu đồ bằng `chart.js` nó cũng khá đơn giản đún không :D. Vì trong phạm vi một bài viết mình không thể nào liệt kê được tất cả mà trên đây chỉ là nhừng thứ cơ bản thường dùng vì thế nếu cần tìm hiểu sâu hơn các bạn có thể comment xuống phía dưới hoặc là lên trên trang chủ của `chart.js` để tìm hiểu thêm. Cảm ơn các bạn đã quan tâm

#### Tài liệu tham khảo :
[(https://www.chartjs.org/docs/latest/charts/doughnut.html)]