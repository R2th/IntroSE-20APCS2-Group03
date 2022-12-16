Trong bài viết này mình sẽ nói về cách tính toán độ rộng của các `item`. Các ví dụ trong bài viết này sẽ được lấy trong bố cục ngang, nhưng logic sẽ tương tự trong bố cục dọc.

Trước tiên hãy hiểu về flexbox trước. Flexbox là phương pháp bố trí phù hợp nhất cho không gian ở trong các `container` , giữa các `item` con, ngay cả khi số lượng và kích cỡ của các `item` không được biết hoặc thay đổi.

Bây giờ thì đến với việc tính toán độ rộng thôi.

## 1. Flex-grow
### 1.1 Sử dụng flex-grow khi nào
Flex-grow sẽ được sử dụng khi tổng kích thước các `item` trong `container` của bạn nhỏ hơn kích thước của `container` và bạn muốn nội dung trong `container` của mình luôn được lấp đầy. 
### 1.2 Flex-grow sẽ hoạt động thế nào?
Các bạn hãy xem ví dụ sau:

{@embed: https://codepen.io/duy-nguyn-the-vuer/pen/aebpLw?editors=1100}

Trong ví dụ trên các bạn thấy:
> `.container có width=1000px`
> 
> `item1 có flex-basis=200px; flex-grow=3`
> 
>`item2 có flex-basis=400px; flex-grow=5`
>

=>>
>Total basis: 600px
>
>Space remaining:  400px
>
>Item 1 grow factor: 3/8 × 400px = 150px
>
>Item 2 grow factor: 5/8 × 400px = 250px
>

Không gian còn lại là 400px, bằng với chiều rộng của thùng chứa flex (1000px) trừ tổng cơ sở (600px). Trong không gian còn lại (400px), (150px) được phân bổ cho item1 và (250px) cho item2.

Các phân số này được xác định bằng cách lấy giá trị riêng lẻ của flex-grow so với tổng giá trị flex-grow của tất cả các item. Độ rộng cuối cùng của mỗi mục sẽ là tổng của flex-basis + grow factor.

## 2. Flex-shrink
### 2.1 Sử dụng flex-shrink khi nào?
Ngược lại so với `flex-grow` thì `flex-shrink` sẽ được sử dụng khi tổng kích thước các `item` trong `container` lớn hơn kích thước của `container` và bạn muốn co kích thước của `item` lại theo tỉ lệ mong muốn.
### 2.2 Flex-shrink hoạt động như thế nào??
Trước tiên hãy cùng xem ví dụ sau:
{@embed: https://codepen.io/duy-nguyn-the-vuer/pen/XvWMpE?editors=1100}

>.flex-container{ width: 300px; }
>
>.flex-item-1{ flex-basis: 500px; flex-shrink: 2; }
>
>.flex-item-2{ flex-basis: 300px; flex-shrink: 1; }
>
>Total basis: 800px
>
>Space remaining: -500px
>
>Item 1 shrink factor: (2×500) / (1000px + 300px) = 10/13 × -500px = -384.6px
>
>Item 2 shrink factor: (1×300) / (1000px + 300px)= 3/13× -500px = -115.4px
>

Chiều rộng còn lại là -500px, bằng với độ rộng của flex container(300px) trừ đi tổng chiều rộng cơ sở ( total basis= 800px) . Để tìm ra hệ số co cho mỗi item thì ta làm theo công thức sau:
```
shrink factor=( flex-shrink value item * flex-basis value)/(Sum( flex-shrink value item * flex-basis value))*space remaining
```
```
Độ rộng cuối cùng = flex-basis + shrink factor
```
## Kết luận.
Cảm ơn các bạn đã đọc bài viết của mình.
Hẹn gặp các bạn tại các bài viết tiếp theo.

Bài viết tham khảo: https://www.madebymike.com.au/writing/understanding-flexbox/