Khi nhắc tới biểu đồ trong HTML, đôi khi chúng ta sẽ nghĩ tới việc vẽ bằng SVG hoặc Canvas. Tuy nhiên, với sức mạnh của CSS3 ta hoàn toàn có thể vẽ biểu đồ chỉ với HTML và CSS thuần túy. Trong bài viết này, mình sẽ cùng các bạn đi tìm hiểu cách xây dựng 1 biểu đồ, cụ thể là Area Chart.  
Bắt đầu ngay thôi!

![](https://images.viblo.asia/b24a7e83-28e5-4925-8e3c-4a7b73bd5e72.png)

# 1. Xây dựng thành phần giao diện
Trước hết, chúng ta cần phải xây dựng các thành phần của biểu đồ. Mỗi thẻ <td> sẽ tượng trưng cho 1 cột của biểu đồ. Bởi vì CSS không thể nhận diện, truy xuất được văn bản HTML, cho nên ta cần phần truyền vào cho mỗi cột 2 giá trị CSS Custom Properties - Thuộc tính CSS tùy chỉnh là start và end, các giá trị start và end nằm trong khoảng từ 0 đến 1. Thuộc tính tùy chỉnh cho phép chúng ta thao tác, làm việc trực tiếp với biến ngay bên trong stylesheet mà không cần phải sử dụng bất kỳ CSS preprocessor nào.
```
    <table class="area-chart">
      <tbody>
        <tr>
          <td style="--start: 0.4; --end: 0.5">50</td>
        </tr>
        <tr>
          <td style="--start: 0.5; --end: 0.8">80</td>
        </tr>
        <tr>
          <td style="--start: 0.8; --end: 0.4">40</td>
        </tr>
        <tr>
          <td style="--start: 0.4; --end: 0.6">60</td>
        </tr>
        <tr>
          <td style="--start: 0.6; --end: 0.5">50</td>
        </tr>
      </tbody>
    </table>
```
#     2. Bắt đầu định dạng giao diện với CSS
 ```
    /* Reset CSS */
    * {
      margin: 0;
      padding: 0;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }

    /* 
    Căn giữa nội dung bên trong, cụ thể là table với className area-chart 
    Đừng quên Prefixes để hỗ trợ các thuộc tính đầy đủ nhất trên các trình duyệt nhé
    */
    body {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      background-color: #333333;
    }
    
    /* Truyền width và height cho Chart */
    .area-chart {
      width: 100%;
      max-width: 600px;
      height: 300px;
      background-color: rgba(232, 96, 43, 0.65);
    }
 ```
 Kết quả nhận được:
    ![](https://images.viblo.asia/7d30b4ff-e67d-4ab4-a951-20859e7d54d1.png)
Nhìn vẫn chưa ra gì đúng không? Và hơn hết thảy, biểu đồ vẫn đang ở dạng column. Do vậy tiếp theo đó, chúng ta cần phải chuyển chúng sang dạng row và chia cột thành các phần bằng nhau. Trước đó hãy nhớ xóa background-color của class area-chart đi nhé, vì đó chỉ dùng để preview. 
  ```
    /* Xóa thuộc tính background-color */
    .area-chart {
      width: 100%;
      max-width: 600px;
      height: 300px;
    }
    
    /* Chuyển đổi tbody sang dạng row */
    .area-chart tbody {
      width: 100%;
      height: 100%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
      -ms-flex-direction: row;
      flex-direction: row;
    }

    /* Chia các thẻ <tr> thành các cột bằng nhau */
    .area-chart tr {
      position: relative;
      -webkit-box-flex: 1;
      -ms-flex-positive: 1;
      flex-grow: 1;
    }

    .area-chart td {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(232, 96, 43, 0.65);
    }
  ```
   Kết quả sau khi phân chia thành các cột bằng nhau:
    ![](https://images.viblo.asia/363c91b2-6588-4add-92b8-28376c642d30.png)
Về căn bản, chúng ta đã đi được gần hết quãng đường. Sau đó, ta chỉ cần sử dụng 1 thuộc tính mới của CSS3 là clip-path để chuyển đổi cái đống hình hộp này thành 1 biểu đồ cụ thể.
    
  ```
    .area-chart td {
      ...
      -webkit-clip-path: polygon(
        0% calc(100% * (1 - var(--start))),
        100% calc(100% * (1 - var(--end))),
        100% 100%,
        0% 100%
      );
      clip-path: polygon(
        0% calc(100% * (1 - var(--start))),
        100% calc(100% * (1 - var(--end))),
        100% 100%,
        0% 100%
      );
    }
  ```
   Tada!!! Và đây là những gì mà ta sẽ nhận được.
    ![](https://images.viblo.asia/2a44368a-a406-4c9f-8707-1e800bcfb6d2.png)
Ở đây chúng ta sử dụng thuộc tính clip-path và sử dụng hàm polygon của nó để điều chỉnh lại kích thước và chỉ hiển thị các khu vực nằm trong khoảng 2 giá trị CSS Custom Properties là start và end. Ở cột đầu tiên, 2 giá trị start và end lần lượt là 0.4 và 0.5. Nên khi sử dụng thuộc tính clip-path, nó sẽ "cắt" đi các khoảng còn lại, và chỉ để chừa lại 1 phần hình đa giác với 2 cạnh bên lần lượt chiếm 40% và 50% so với chiều cao của thẻ <tr>.
#   3. Xây dựng với nhiều dữ liệu hơn
   {@embed: https://codepen.io/vietnguyen27/pen/ZELrqbN}
    
   Vậy là với ví dụ trên, hi vọng là mọi người sẽ hiểu cách xây dựng Area Chart đơn giản chỉ với HTML và CSS thuần. Ngoài ra, còn biết thêm được cách thức hoạt động của CSS Custom Properties và thuộc tính CSS clip-path.