Trong ReactNative, cách bố cục các thành phần được sử dụng theo cách khác. Đó là CSS flexbox

Flexbox được thiết kế để cung cấp một cách bố cục thống nhất cho các kích thước màn hình khác nhau. Nó cho phép các containter tự sắp xếp các thành phần con của nó, bao gồm cả kích thước và khoảng cách giữa chúng.

Có 5 thuộc tính phổ biến nhất của Flexbox:

### Display: Flex

VD ở trên trang web:
![](https://images.viblo.asia/e31a4e4f-18b0-4657-94d9-343454b6b641.gif)


Bạn có 4 thẻ divs với màu và kích thước khác nhau, nằm trong 1 container div màu xám. Mỗi div được bố cục với display: block, do đó mỗi ô vuông chiếm tất cả chiều ngang của dòng.

Để bắt đầu với flexbox, bạn cần cài đặt containter thành một flex containter, chỉ đơn giản là:

```
#container {
  display: flex;
}
```

Ta sẽ chuyển qua bố cục sử dụng flexbox:
![](https://images.viblo.asia/0f84cfe1-c54c-4f1e-b202-2b2d64e400e4.gif)

Không có nhiều thay đổi, thẻ div được bố cục thành inline, nhưng đằng sau đó, bạn đã chuyển các ô vuông đó thành một flex context.

Bây giờ, bạn có thể bắt đầu sắp xếp chúng trong context đó, đơn giản hơn rất nhiều so với CSS truyền thống.

### Flex Direction

Một flexbox containter có 2 trục: một trục chính (main axis) và một trục dọc (cross axis):

![](https://images.viblo.asia/9feba0c8-d5a9-4305-8d1e-5fc06cdd6ac6.png)

Mặc định, các đối tượng được sắp xếp theo trục chính, từ trái qua phải. Đó là lý do tại sao các ô vuông được mặc định xếp theo chiều ngang ngay khi bạn sử dụng `display: flex`.

Tuy nhiên, với `flex-direction`, bạn có thể đổi lại trục:

```
#container {
  display: flex;
  flex-direction: column;
}
```

![](https://images.viblo.asia/6aa25f3a-23d8-4037-bce5-439a7dc70fa6.gif)

Cần phân biệt rõ là: `flex-direction: column` không sắp xếp các ô theo trục dọc mà vẫn là trục chính. Nhưng nó chuyển trục chính từ chiều ngang sang chiều dọc.

Có thêm options cho flex-direction, đó là `row-reverse` và `column-reverse`

![](https://images.viblo.asia/35b81de9-892c-419e-9f3c-1e3bf9387194.gif)

### Justify Content

`Justify-content` điều khiển cách bạn sắp xếp các đối tượng trên trục chính. 

VD: với flex-direction: row
```
#container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
```

Bạn có 5 giá trị cho justify-content:
* Flex-start
* Flex-end
* Center
* Space-between
* Space-around

![](https://images.viblo.asia/d364157a-0343-47c1-b364-8f3793fd1455.gif)

Space-around và space-between khá giống nhau. Space-between làm cho mỗi ô có khoảng cách bằng nhau, nhưng không tạo khoảng cách giữa nó với container.

Space-around tạo một khoảng cách bằng nhau với từng cạnh của ô - bao gồm cả khoảng cách giữa cạnh ô ngoài cùng với container bằng một nửa so với khoảng cách giữa 2 ô.

Lưu ý là justify-content chỉ sử dụng được với trục chính, và flex-direction được thay đổi trong trục chính.

### Align Items

`Align-items` cũng gần giống như justify-content, trong khi justify-content được dùng cho trục chính, thì align-items được sử dụng cho trục dọc(cross-axis).

Chúng ta thay đổi flex-direction thành row, và sử dụng align-items với các giá trị:
* flex-start
* flex-end
* center
* stretch
* baseline

3 giá trị đầu tương tự như justify-content, 2 giá trị sau hơi khác một chút.

Với `stretch`, các đối tượng sẽ dãn ra bằng kích thước của cross-axis

![](https://images.viblo.asia/1bd4a95a-b8cb-406c-a767-5951e20b8bbe.gif)

(Lưu ý là với `align-items: stretch`, bạn phải cài đặt chiều cao của ô vuông là auto. Nếu không, giá trị height sẽ ghi đè stretch)

Với baseline, nó sắp xếp tất cả các ô cùng xuống dưới.
![](https://images.viblo.asia/f505ad86-01af-4d53-811d-3dc5c7a27780.png)

Để hiểu rõ hơn 2 trục, kết hợp cả justify-content và align-items, ta sẽ theo dõi hình sau:

![](https://images.viblo.asia/4fe894f1-af66-4d36-9523-f06cb746c9b9.gif)

Với row, các ô được sắp xếp theo chiều ngang của main axis. Với column, chúng được sắp xếp theo chiều dọc của main axis.

### Align Self

`Align Self` cho phép bạn chỉnh sửa thủ công bố cục của một đối tượng cụ thể.

Nó chỉ là ghi đè lại thuộc tính align-items cho một ô. Tất cả các thuộc tính là giống nhau, mặc dù mặc định là auto, nhưng nó dựa theo align-items của containter.

```
#container {
  align-items: flex-start;
}
.square#one {
  align-self: center;
}
// Chỉ ô này là được để giữa
```

VD, ta sử dụng align-self với 2 ô, các ô còn lại là dùng align-items: center và flex-direction: row

![](https://images.viblo.asia/3a2ae1ac-058e-47c0-b982-e41a894f4228.gif)

### Kết luận 
Mặc dù chỉ nói sơ qua về Flexbox, nhưng những thuộc tính kia là những thuộc tính cơ bản nhất, từ đó ta có thể dễ dàng bố cục các thành phần nhanh chóng.