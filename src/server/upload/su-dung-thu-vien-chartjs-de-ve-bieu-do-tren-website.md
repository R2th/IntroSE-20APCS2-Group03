**Chart.js là gì?** Đây là một trong những dự án mã nguồn mở giúp cho mọi người có thể vẽ những biểu đồ thể hiện số liệu trên website một cách dễ dàng và đẹp nhất. Dự án này hiện tại đã có đến hơn 41.000 stars và 2600 lượt commit trên Github và được cập nhật thường xuyên. 4 điểm mạnh nhất của Chart.js là:
– Dự án mã nguồn mở: cả cộng đồng phát triển và khắc phục lỗi.
– Tương thích tốt với HTML 5 cái này gần như bắt buộc ở hiện tại
– Hơn 8 kiểu biểu đồ phổ biến nhất hiện nay
– Reponsive: hiển thị đẹp nhất trên tất cả các thiết bị từ Desktop, Tablet, Mobile.
Có 3 bước cơ bản trong việc tạo một biểu đồ bằng thư viện Chart.js.
– Bước 1: khai báo thư viện Chart.js và BootrapCDN
– Bước 2: Tạo một thẻ <Div> với <canvas> bên trong để hứng biểu đồ
– Bước 3: Tùy biến biểu đồ và thay đổi số liệu
    
### Bước 1: khai báo thư viện Chart.js và BootrapCDN

Trong bước đầu này, điều cần làm là khai báo đường dẫn đến thư viện Chart.js cũng như khai báo đường dẫn BootrapCDN. Nghe nó hơi phức tạp nếu như bạn không biết HTML. Nói chứ chỉ đơn giản là việc copy 2 dòng code và bỏ nó vào thẻ <head></head> của một cấu trúc HTML thôi. Với WordPress thì bạn có thể dùng Plugin “Custom CSS & JSS” để chép 2 đoạn code này vào cho dễ, giống như mình dưới đâ

 ```
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.min.js"></script>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
```

Hiện tại 2 dòng code này đang sử dụng phiên bản 2.6.0 của Chart.js và phiên bản 3.3.7 của Bootstrap. Bạn có thể vào Documentation của Chart.js để cập nhật phiên bản mới nếu có nha.
    
### Bước 2: Tạo một thẻ <Div> với <canvas> bên trong để hứng biểu đồ
    
 Tạo một thẻ <div> chứa một thẻ <canvas> với id nhất định bên trong, đây sẽ là nơi hiển thị biểu đồ của chúng ta. Bạn có thể bỏ thẻ <div> này này vào bất kỳ đâu trong trang web nếu bạn muốn nó hiển thị ở vị trí đó.
    
```
<div class="container">
    <canvas id="myChart"></canvas>
</div>
```
    
 Vậy là xong bước 2 Tất nhiên, có thể custom các thẻ <div> theo những cấu trúc tùy ý. Trong một vài trường hợp, những biểu đồ sẽ cần bố trí theo một thiết kế nhất định.
    
###  Bước 3: Tùy biến biểu đồ và thay đổi số liệu
    
Trong bước này, tùy vào mục đích của mỗi người mà chúng ta tùy biến biểu đồ cho phù hợp với nhu cầu. Chart.js hiện tại hỗ trợ tới 8 dạng biểu đồ phổ biến nhất hiện nay nên chúng ta có thể hoàn toàn tự tin sử dụng và tùy chỉnh theo ý một cách dễ dàng. Dưới đây là một đoạn <script> tùy chỉnh một biểu đồ cột.
    
```
<script>
    let myChart = document.getElementById('myChart').getContext('2d');
    // Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontColor = '#777';

    let massPopChart = new Chart(myChart, {
      type:'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data:{
        labels:['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
        datasets:[{
          label:'Population',
          data:[
            617594,
            181045,
            153060,
            106519,
            105162,
            95072
          ],
          //backgroundColor:'green',
          backgroundColor:[
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 99, 132, 0.6)'
          ],
          borderWidth:1,
          borderColor:'#777',
          hoverBorderWidth:3,
          hoverBorderColor:'#000'
        }]
      },
      options:{
        title:{
          display:true,
          text:'Largest Cities In Massachusetts',
          fontSize:25
        },
        legend:{
          display:true,
          position:'right',
          labels:{
            fontColor:'#000'
          }
        },
        layout:{
          padding:{
            left:50,
            right:0,
            bottom:0,
            top:0
          }
        },
        tooltips:{
          enabled:true
        }
      }
    });
  </script>
```
 Kết quả: 
    
![](https://images.viblo.asia/ba356386-c8e8-4372-8393-a9c6739856c9.png)

Để tùy chỉnh biểu đồ theo ý thích, bạn cần phải đọc qua một xíu về Documentation của Chart.js để hiểu phải ghi cú pháp như thế nào cho đúng. 😆Đừng lo, tài liệu này được Chart.js viết rất tốt nên nó khá dễ đọc cho những người bắt đầu.
Documentation Chart.js: https://www.chartjs.org/docs/latest/