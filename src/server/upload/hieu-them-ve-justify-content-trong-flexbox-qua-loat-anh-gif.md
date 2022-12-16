# 1. Flexbox là gì?
Flexbox là một cách để thiết lập bố cục cho trang web của bạn. Về cơ bản, nó phục vụ cho việc tạo nên một trang web responsive, tức là nó sẽ tự cân đối kích thước của các phần tử bên trong để phù hợp cho việc hiển thị trên mọi thiết bị.
## Khi nào nên dùng flexbox?
Theo như khuyến cáo của Mozilla, flexbox chỉ nên được dùng khi bạn xử lí với layout chỉ có một chiều (hoặc là hàng hoặc là cột). Nếu bạn muốn xử lí hai chiều (cả hàng và cột), bạn có thể tìm hiểu về CSS Grid.

## Thuộc tính justify-content của flexbox
Khi mà các phần tử ở trong container không chứa hết trong chiều rộng của container, thuộc tính này sẽ xác định cách sắp xếp các phần tử ở trong container đó

## Làm thế nào để hiểu hết về flexbox?
Hiện nay có rất nhiều trang hướng dẫn về flexbox, từ có tiếng đến vô danh. Nhưng chắc chắn một điều rằng bạn không thể học về flexbox nếu không có các ví dụ minh họa trực quan sau đây.

# 2. Cách dùng một số giá trị của thuộc tính justify-content
### flex-start
`justify-content: flex-start` luôn là giá trị mặc định, kể cả khi bạn không khai báo thuộc tính này, nó sẽ luôn căn phần tử về phía trái, khá giống với `float: left`

![](https://images.viblo.asia/40aa26be-5169-4ad9-a59e-04a6bd4bf559.gif)

### flex-end
`flex-end` thì giống với `float-right`, nó căn các phần tử về phía bên phải

![](https://images.viblo.asia/75295396-7648-4677-84f1-55be06bcee0d.gif)

### center
Nói một cách dễ hiểu, giá trị này sẽ căn giữa các thành phần trong flexbox

![](https://images.viblo.asia/327ee2d7-b2ac-4111-a358-6919acaf9e16.gif)

### space-between
Gía trị này giúp cho các khoảng cách giữa các thành phần luôn bằng nhau, tuy nhiên phần tử đầu luôn nằm sát trái, phần tử cuối luôn nằm sát phải

![](https://images.viblo.asia/3271ca9e-117b-488f-bc64-48e7680b7c46.gif)

### space-around
Giá trị này cũng làm cho các khoảng cách giữa các phần tử bằng nhau, tuy nhiên nó cũng thay đổi cả vị trí của hai phần tử đầu cuối

![](https://images.viblo.asia/2447ace1-cde5-41a7-9028-c6592c78153a.gif)

### space-evenly
Về cơ bản, nó làm cho các khoảng cách ở giữa hai vùng kề cận nhau luôn như nhau

![](https://images.viblo.asia/9b230b05-edd8-46af-a220-08889ebd1fd4.gif)

### stretch
Giá trị này sẽ kéo giãn các phần tử cho lấp đầy flex, tuy nhiên nếu độ dài của các phần tử quá ngắn thì các phần tử sẽ `float: left`

![](https://images.viblo.asia/cac9f833-4f37-4a82-8b84-3bf2d206775b.gif)
# 3.Tự tay nghịch thử
Bạn có thể tự tùy chỉnh các thông số của flexbox ở trang sau: http://www.csstutorial.org/flex-generator.html

# 4. Kết
Hy vọng qua các ví dụ trực quan ở trên, bạn có thể hiểu thêm về cách sử dụng thuộc tính `justify-content`


-----


Tài liệu tham khảo: https://medium.freecodecamp.org/css-flex-an-interactive-tutorial-19ff6e93558