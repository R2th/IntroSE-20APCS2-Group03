Một trang web sẽ không thể thực hiện được nếu không có CSS. Ngôn ngữ chịu trách nhiệm về mặt tiền của trang web, có bố cục đẹp mắt và mọi yếu tố đều ở đúng vị trí của nó. Tuy nhiên, bạn có biết rằng các tính năng CSS mới luôn được cập nhật không?

Trong những năm qua, CSS đã vượt xa background colors, borders, text styling, margins, và the box model . CSS hiện đại có khả năng cung cấp toàn bộ nhiều chức năng mà trước đây, bạn cần JavaScript hoặc các giải pháp thay thế.

Để kỷ niệm nó đã đi được bao xa, trong bài đăng này, chúng ta sẽ xem xét một số tính năng mới tuyệt vời mà CSS tự hào vào năm 2021 mà bạn có thể không biết. Chúng ta sẽ nêu bật những điều thú vị mà designers và developers  có thể làm với CSS mới nhất, nói về các trường hợp sử dụng, hỗ trợ trình duyệt và cũng cung cấp cho bạn một ví dụ nhanh.

Dưới đây là một số điều tuyệt vời mà CSS có thể làm được ngày nay.

## Conical gradients

Các hàm có thể được sử dụng để tạo ra những hình dạng như hình nón, biểu đồ pie, bánh xe màu, và các bề mặt bóng loáng. ***conic-gradient***

Để tạo biểu đồ hình tròn, chúng ta sử dụng các màu chồng lên nhau (có chuyển tiếp đột ngột).

![](https://images.viblo.asia/2520d016-1f64-481c-80ed-fb1038d32e7f.png)

```
.pie-chart{
    background: conic-gradient(red 120deg, green 120deg 240deg, blue 240deg);
}
```


Để lặp lại các màu như thế này chúng ta sử dụng ***repeating-conic-gradient()***
![](https://images.viblo.asia/5be794a9-842b-47cd-b0c4-7c275e1ef8e7.png)

```
.sunburst{
    background: repeating-conic-gradient(red 0 15deg,darkred 0 30deg);
}
```


Bạn có thể xem thêm các ví dụ trong [codepen này](https://codepen.io/newinweb/details/BOEwza) .

**Trình duyệt hỗ trợ **

Hỗ trợ là tuyệt vời. Nó có sẵn trong tất cả các trình duyệt thể hiện màu xanh.
![](https://images.viblo.asia/2bebed2d-00ec-4212-bd10-88201825b592.jpeg)


## Aspect ratio

Một tính năng mới khác là aspect ratio, là mối quan hệ tỷ lệ giữa chiều rộng và chiều cao. Duy trì tỷ lệ khung hình nhất quán là điều quan trọng trong việc tạo bố cục đáp ứng và ngăn chặn sự thay đổi layout cumulative (một chỉ số hiệu suất quan trọng của web ).

Một số ví dụ về nơi mà aspect ratio thường được sử dụng:

* Tạo vùng chứa giữ chỗ cho nội dung sẽ được tải
* Tạo các thành phần nhất quán, có kích thước đồng nhất như card
* Tạo iframe đáp ứng

Thuộc tính này cho phép bạn sửa tỷ lệ khung hình trên bất kỳ phần tử nào . 

Cú pháp rất đơn giản. Giá trị là: tỷ lệ chiều rộng, dấu gạch chéo và tỷ lệ chiều cao.

```
.widescreen {
  aspect-ratio: 16 / 9;
}
```

Điều quan trọng cần lưu ý là các phần tử sẽ không tuân theo tỷ lệ co nếu cả chiều cao và chiều rộng đều được xác định cho một phần tử.

Tham khảo [codepen](https://codepen.io/robjoeol/pen/oNYvRJg)

Bạn có thể bắt đầu sử dụng thuộc tính ngay lập tức và sử dụng truy vấn tính năng để cung cấp dự phòng, như bên dưới.

```
.standard {
  aspect-ratio: 4 / 3;
}

@supports not (aspect-ratio: 4 / 3) {
  .standard {
    width: 16rem;
    height: 9rem;
  }
}
```

**Trình duyệt hỗ trợ **

Kể từ tháng 1 năm 2021, thuộc tính có sẵn trong Chrome và Edge mà không yêu cầu bật cờ thử nghiệm. Nó cũng có sẵn trong Firefox.
![](https://images.viblo.asia/4d3f7138-b57a-4725-b060-cd88ebc3e601.jpeg)


## Content-visibility property

content-visibility property là một thuộc tính CSS mới có thể cải thiện hiệu suất hiển thị trang. Nó cho phép trình duyệt bỏ qua công việc hiển thị của một phần tử cho đến khi cần thiết (khi một phần tử đang ở chế độ view). Nếu một phần lớn nội dung của bạn nằm ngoài màn hình, việc tận dụng thuộc tính này có thể giảm đáng kể thời gian tải ban đầu của trang.

Để đạt được lợi ích của khả năng hiển thị nội dung, bạn phải cân nhắc xem nội dung nào phải được tải ban đầu và nội dung nào có thể bị hoãn lại. Thuộc tính có một tùy chọn tự động cho phép trình duyệt quyết định xem nó có thể bỏ qua việc hiển thị một phần tử hay không.

Có một số lưu ý quan trọng khi sử dụng thuộc tính này như sau:

* Chiều cao của trang: trình duyệt sẽ tạo một phần tử với content-visibility: auto  hoặc content-visibility: hidden không nhìn thấy bằng cách đặt chiều cao của nó bằng không cho đến khi nó được hiển thị. Thao tác này sẽ thay đổi chiều cao và khả năng scroll của trang. Bạn có thể sử dụng thuộc tính contain-intrinsic-size để cung cấp chiều cao rõ ràng cho phần tử để bù đắp cho điều này, đây có thể chỉ là phỏng đoán của bạn, nhưng bạn không cần phải chính xác như vậy!

* Ảnh hưởng đến khả năng tiếp cận: Nếu bạn đang sử dụng content-visibility trên một phần có tiêu đề và cột mốc, trình đọc màn hình sẽ không thể truy cập những thứ này khi trang tải. Thật không may, điều này làm giảm khả năng truy cập nội dung của bạn. 

**Trình duyệt hỗ trợ **

Nó sẵn trong Edge và Chrome.
![](https://images.viblo.asia/ca1dbc92-52e0-4245-8b00-e7e9341ed905.jpeg)


## Logical properties

Thuộc tính logic là chế độ viết tương đương của các thuộc tính vật lý. Họ cung cấp một cách để mô tả bố cục của các trang web bằng một từ vựng phổ quát rõ ràng giữa các ngôn ngữ khác nhau.

Ví dụ: bạn sẽ sử dụng margin-block-start thay vì margin-left cho văn bản từ trái sang phải.

![](https://images.viblo.asia/7824cb9a-5703-4284-ab0a-09e62d054009.png)

Các thuộc tính logic đã xuất hiện từ khá lâu, nhưng hỗ trợ rất ít các trình duyệt. Giờ đây, sự hỗ trợ đã tốt hơn rất nhiều.

Tuy nhiên, một số phiên bản viết tắt của thuộc tính vẫn được coi là thử nghiệm. Cho đến khi các thuộc tính này được hỗ trợ rộng rãi, sẽ rất khó để sử dụng các thuộc tính logic.

**Trình duyệt hỗ trợ**
Giờ đây, các thuộc tính logic cho margin, border và padding được hỗ trợ trong tất cả các trình duyệt chính. Các phiên bản viết tắt của các thuộc tính này có sẵn dưới dạng các tính năng thử nghiệm. Thuộc tính border logical đang chờ xử lý trong hầu hết các trình duyệt.
![](https://images.viblo.asia/1300307b-d264-4ff2-9b60-bc289317d14d.jpeg)


## CSS Subgrid

CSS Subgrid làm cho một số mẫu layout khó trở nên đơn giản hơn nhiều.

Nếu bạn đã biết CSS grid, sẽ không cần nhiều nỗ lực để học CSS subgrid. Cú pháp mới rất ngắn gọn.

Về mặt khái niệm, grid được định nghĩa là subgrid khá giống với nested grid thông thường, nhưng nó chia sẻ các đường của parent grid. Thành quả là nó cung cấp một cách để căn chỉnh nested grid với parent grid.

Một ví dụ phổ biến sẽ là một layout card có các phần khác nhau. Các phần này có thể thay đổi kích thước tùy thuộc vào nội dung. Với nested grid thông thường, bạn không thể duy trì căn chỉnh theo chiều dọc của các phần giống nhau giữa các thẻ khác nhau (xem bên dưới).

![](https://images.viblo.asia/6fed5529-f7a7-4470-b3e3-c6fb08bc28db.png)

```
.container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.card {
    display: grid;
}
```

![](https://images.viblo.asia/36d47259-765c-4d3b-bfd1-91a85b2707d9.png)

Nếu chúng ta thay đổi card thành một subgrid, chúng ta có thể có được các phần được căn chỉnh theo chiều dọc một cách hoàn hảo.

```
.card {
    display: grid;
    grid-template-rows: subgrid;
    grid-row: auto / span 3;
}
```

Bạn có thể bắt đầu sử dụng thuộc tính ngay lập tức và sử dụng tính năng  query  để dự phòng cho bất kỳ trình duyệt nào không được hỗ trợ.

```
@supports not (grid-template-rows: subgrid) {
  .card {
    /* ..alternative layout */
  }
}
```

Bạn có thể tham khảo ví dụ trên trong [codepen này](https://codepen.io/robjoeol/pen/eYBYvNJ).

**Trình duyệt hỗ trợ**
Firefox là trình duyệt duy nhất thực hiện tính năng này cho đến nay.
![](https://images.viblo.asia/c8993870-da84-4037-933e-c3d00cb1f9d3.jpeg)


## Color function

Hàm color () cho phép một màu được chỉ định trong một không gian màu cụ thể, thay vì không gian màu sRGB ngầm mà hầu hết các hàm màu khác hoạt động. Điều này sẽ cho phép các dev chỉ định một dải màu lớn hơn nhiều trong tương lai.

Các thiết bị vật lý thực sự không thể tạo ra mọi màu sắc có thể có mà mắt người có thể nhìn thấy. Phạm vi màu sắc mà một thiết bị nhất định có thể tạo ra được gọi là gam màu. Các gam màu của các không gian màu khác nhau có thể được so sánh bằng cách xem thể tích (theo đơn vị Lab khối) của các màu có thể được thể hiện. Bảng sau đây cho thấy các không gian màu được xác định trước có sẵn trong CSS.

![](https://images.viblo.asia/84ea168a-4dde-4fc7-bcdc-a4c5337b0901.png)

Kết quả rút ra là display-p3 lớn hơn sRGB khoảng 35%. Nhiều màn hình hiện đại bao phủ 100% colorspace display-p3 hiện nay.

Bạn có thể bắt đầu sử dụng chức năng màu ngay lập tức và cung cấp màu sRGB tương thích ngược thông qua tính năng query như bên dưới.

```
/* sRGB color. */
:root {
    --bright-green: rgb(0, 255, 0);
}

/* Display-p3 color, when supported. */
@supports (color: color(display-p3 1 1 1)) {
    :root {
        --bright-green: color(display-p3 0 1 0);
    }
}

header {
    color: var(--bright-green);
}
```


**Trình duyệt hỗ trợ**
Hiện tại, Safari là trình duyệt duy nhất thực hiện tính năng này.
![](https://images.viblo.asia/ac602234-dc6a-4c6e-aff7-f24462ecdde3.jpeg)


## URL Scroll-To-Text Fragments

Đây thực sự là một tính năng HTML, nhưng tôi sẽ đưa nó vào đây, nếu không bạn có thể sẽ không sớm nghe về nó!

Scroll-to-text fragments (còn được gọi là đoạn văn bản) nối một query văn bản vào một URL. Khi nhấp vào link, trình duyệt sẽ tìm thấy văn bản trong trang web, scroll nó vào chế độ xem và đánh dấu văn bản phù hợp. Chúng cho phép các link chỉ định phần nào của trang đang được liên kết đến mà không cần dựa vào tác giả chú thích trang bằng các thuộc tính id.

Định dạng là: ***#:~:text=\[prefix-,]textStart[,textEnd\][,-suffix].***

Đây là một ví dụ đơn giản mà bạn có thể kiểm tra trong trình duyệt của mình.

![](https://images.viblo.asia/e2b2b6fb-3580-4216-95fc-46616e6b604d.png)

Bạn có thể bắt đầu sử dụng scroll-to-text ngay lập tức mà không gặp bất kỳ ảnh hưởng xấu nào trong các trình duyệt không hỗ trợ chúng.

**Trình duyệt hỗ trợ**
Có sẵn trong Edge và Chrome.

![](https://images.viblo.asia/3a23eb70-4bf8-45ff-9622-b64ca4dc1aad.jpeg)


## Phần kết luận

Tôi hy vọng bài viết này đã cung cấp cho bạn tổng quan rõ ràng về các tính năng CSS chính mới nhất để đưa nó vào trình duyệt và xác định các trường hợp sử dụng rõ ràng cho chúng. Trong thời đại của các browser và tính năng query luôn phát triển, không có rào cản nào đối với việc sớm áp dụng các tính năng mới. Thách thức là phải biết những tính năng mới nào đã thực sự xuất hiện trên các trình duyệt, tìm thời gian để tìm hiểu về chúng và biến chúng thành một phần của kho vũ khí thiết kế web của bạn theo thời gian. Tôi hy vọng cộng đồng web có thể tìm ra cách tốt hơn để công khai thông tin này trong tương lai.

Tham khảo: https://blog.logrocket.com/the-latest-features-of-css-in-2021/