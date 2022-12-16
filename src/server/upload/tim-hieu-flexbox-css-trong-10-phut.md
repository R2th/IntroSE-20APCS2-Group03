Ở bài viết này chúng ta sẽ cùng nhau tìm hiểu cơ bản về flexbox css một trong những kỹ năng cần thiết để phát triển và thiết kế website. 

## Flexbox css là gì?
Flexbox là mô hình bố cục web mà nó sẽ tự cân đối kích thước của các phần tử bên trong để hiển thị trên mọi thiết bị. Nói theo cách khác, bạn không cần thiết lập kích thước của phần tử, không cần cho nó float, chỉ cần thiết lập nó hiển thị chiều ngang hay chiều dọc, lúc đó các phần tử bên trong có thể hiển thị theo ý muốn. Flexbox đã được phát triển hoàn thiện và đang ngày càng được nhiều trang web sử dụng (Bootstrap 4 cũng sử dụng Flexbox như một lựa chọn cho hệ thống grid).
## Cấu trúc của flex
Trước khi bắt tay vào tìm hiểu kỹ hơn về flexbox, chúng ta cần tìm hiểu qua về cấu trúc của flexbox. Dưới đây là sơ đồ cấu trúc của flexbox:
![](https://images.viblo.asia/50de4a48-797b-4f0a-a1bb-bcb8daf22953.jpg)

Một cấu trúc của flex box có hai thành phần quan trong nhất là `container` và `item`:
* Container là thành phần lớn bao quanh các phần tử bên trong
* Item Các phần tử con của container được gọi là item, ở item bạn có thể thiết lập nó sẽ sử dụng bao nhiêu cột trong một container hoặc thiết lập thứ tự hiển thị của nó.

Ngoài ra như trên hình chúng ta có thể thấy một số thành phần khác:
* **Main start và main end**: Khi thiết lập flexbox, điểm bắt đầu của container gọi là main start và điểm kết thúc được gọi là main end. Điều này có nghĩa, các item bên trong sẽ heienr thị từ main start đến main end (hoặc là được phép hiển thị đến main end). Và chiều vuông góc của nó là **cross start, cross end** cũng có ý nghĩa tương tự nhưng luôn vuông góc với main start, main end.
* **main axis**: Đây chính là trục chính để điều khiển các Item sẽ được hiển thị như thế nào
* **cross axis**: Tương tự main axis nhưng là trục vuông góc với main axis
* **main size**: Đây là kích thước của Item dựa theo trục main axis
* **cross size**: Là kích thước của Item dựa theo trục cross axis.
## Cách sử dụng và các thuộc tính của flexbox
Flexbox có nhiều thuộc tính nhưng ở bài viết này chúng ta sẽ không đi sau vào tìm hiểu tất cả các thuộc tính mà chỉ tìm hiểu cách sử dụng và một số thuộc tính cơ bản:
### Flexbox container và thuộc tính của nó
Cùng xem xét ví dụ sau để hiểu thêm về thuộc tính của flexbox container
```
<div class="container">
  <div class="item item1">Item 1</div>
  <div class="item item2">Item 2</div>
  <div class="item item3">Item 3</div>
  <div class="item item4">Item 4</div>
</div>
```
Để bắt đầu set cho `div` có class là container trên là một flexbox chúng ta sử dụng thuộc tính display flex cho nó:
```
.container {
  display: flex;
}
```
Sau khi sử dụng thuộc tính này ta sẽ thấy các item được hiển thị theo chiều ngang là chiều mặc định của main axis. Vậy muốn thay đổi trục hiển thị thì chúng ta làm như thế nào. Đừng lo flex hỗ trợ chúng ta thay đổi trục bằng cách sử dụng thuộc tính **flex-direction**:
```
flex-direction: row | column | row-reverse | column-reverse
```
Với:
* row: hiển thị theo hàng
* column: hiển thị theo cột
* row-reverse: hiển thị theo hàng nhưng vị trí item bị đảo ngược
* column-reverse: hiển thị theo cột nhưng vị trí item bị đảo ngược
Theo mặc định tất cả các item sẽ cố gắng được hiển thị hợp lý trên một dòng. Nhưng bạn có thể thay đổi chiều rộng của các item không theo kích thước mặc định mà flexbox định nghĩa bằng cách sử dụng thuộc tính **flex-warp**
```
flex-wrap: nowrap | wrap | wrap-reverse
```
Với:
* nowrap: tất cả các item sẽ nằm trên nột dòng
* wrap: các item sẽ được hiển thị trên nhiều dòng nếu hết chiều rộng của container hiển thị từ trên xuống dưới
* wrap-reverse: các item sẽ hiển thị trên nhiều dòng từ dưới lên trên

Vâỵ để căn chỉnh vị trí hiển thị các item trong flex chúng ta dùng gì? Flex cho chúng ta thuộc tính **justify-content** để có thể điều chỉnh không gian trống còn lại trong flex
```
justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly
```
* flex-start: Các item được sắp xếp theo hướng bắt đầu
* flex-end: Các item được sắp xếp theo hướng kết thúc
* center: Các item được căn giữa
* space-between: Các item được phân bổ để trong flex, mục đầu tiên sẽ ở vị trí bắt đầu và mục cuối cùng sẽ ở vị trí kết thúc
* space-around: Các item được phân bố đều nhau trong container với khoảng cách là bằng nhau
* space-evenly: Các item được phân phối sao cho khoảng cách giữa 2 item bất kỳ là bằng nhau
Nhìn hình sau để có trực quan dễ hơn
![](https://images.viblo.asia/8cc9ccc8-5417-44d3-8d55-f08105a51350.png)

Như vậy chúng ta đã cùng nhau tìm hiểu về flex container và một số thuộc tính cơ bản. Tiếp theo chúng ta sẽ cùng nhau tìm hiểu về flex item và thuộc tính của nó.
### Flex items và thuộc tính của nó
#### Order
Mặc định các item sẽ được sắp xếp bắt đầu từ trái qua phải và từ trên xuống dưới. Tuy nhiên chúng ta cũng có thể thay đổi vị trí của các item thông qua thuộc tính `order` ví dụ:
```
.item1 {
  order: 4;
}
.item2 {
  order: 3;
}
.item3 {
  order: 1;
}
.item4 {
  order: 2;
}
```
#### flex-grow
Nếu tất cả các item có flex-grow được đặt là 1 thì khoảng trống còn lại sẽ được chia đều cho tất cả các item. Nếu một trong số item là 2 thì khoảng trống đó sẽ chiếm gấp đôi so với các khoảng trống của các item còn lại
```
.item {
  flex-grow: <number>; /* default 0 */
}
```
![](https://images.viblo.asia/724c15ed-9d88-4475-801b-f52be5738a5a.png)
#### flex-shrink
Mặc định tất cả các item đều có flex-shrink: 1. Điều này có nghĩa khi ta thu nhỏ trình duyệt lại, các phần tử đều co lại bằng nhau. Bạn có thể thay đổi sự co lại của các item bằng cách thiết lập thông số flex-shrink
```
.item {
  flex-shrink: <number>; /* default 1 */
}
```
#### flex-basis
Sử dụng nếu bạn muốn gán một kích thước nhất định cho item, có thể dùng giá trị tuyệt đối hay tương đối (phụ thuộc kích thước của container)
```
.item {
  flex-basis: <length> | auto; /* default auto */
}
```

Để tìm hiểu sau hơn về tất cả các thuộc tính của flexbox các bạn vào [đây](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) đọc nha

## Kết luận
Như vậy ở bài này mình và các bạn đã cùng nhau tìm hiểu về flexbox. Có thể nói thì flexbox cũng dễ sử dụng đó chứ nhỉ. Tuy nhiên, theo lời khuyên từ Mozilla thì chúng ta sử dụng Flexbox để thiết lập bố cục trong phạm vi nhỏ (ví dụ như những khung trong website) và khi thiết lập bố cục ở phạm vi lớn hơn (như chia cột website) thì vẫn nên sử dụng kiểu thông thường là dàn trang theo dạng lưới (grid layout). Cảm ơn các bạn đã theo dõi