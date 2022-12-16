![](https://images.viblo.asia/83e192e9-76e5-464b-b9b1-b293f016d1e6.png)

Trong bài viết này, chúng ta sẽ cùng thảo luận về 5 thuộc tính cơ bản nhất của Flexbox và giải thích cách thức hoạt động của chúng.

Xử lý thôi !!!

### 1. Display: Flex

Dưới đây là ví dụ về một trang web có các `div` được bọc bởi `container` màu xám bao ngoài

![](https://images.viblo.asia/17270a77-8c56-410f-aa92-7498c4e0d199.gif)

Như ví dụ trên, mỗi `div` đều nhận giá trị default là `display: block`

Để có thể bắt đầu với làm việc `flexbox`, chúng ta cần làm `container` trở thành `flex container`.

```
#container {
  display: flex;
}
```

![](https://images.viblo.asia/64b486fb-804e-44f9-bc1d-e36c6d236a70.gif)

Không có nhiều sự thay đổi - các `div` được sắp xếp thành một hàng ngang. 

Nhưng tại sao lại như thế ??? Phần sau sẽ giải thích rõ ràng hơn đằng sau việc sắp xếp này ...

### 2. Flex direction

Một `flex container` bao gồm 2 trục, `main axis` và `cross axis`, nó được biểu diễn như sau: 

![](https://images.viblo.asia/61890a5d-d1b0-4578-b00c-b3c0b5773b36.png)

Mặc định thì các `items` sẽ được sắp xếp theo trục `main axis` **từ trái qua phải**, đó là lý do vì sao khi thay đổi `display: flex` ở ảnh gif bên trên

Tuy nhiên, ta có thể thay đổi cho nó sắp xếp theo trục `cross axis`

```
#container {
  display: flex;
  flex-direction: column;
}
```

![](https://images.viblo.asia/f0d97d9f-c566-4f34-977c-2096e677e332.gif)

Ngoài ra, ta cũng có cặp đôi options khác cho `flex-direction`, như là: `row-reverse`, `column-reverse`

**column-reverse:**

![](https://images.viblo.asia/9cfb5c90-1462-424f-8887-65e6f04a9eba.gif)

### 3. Justify Content

Justify Content giúp bạn căn chỉnh các `items` trên `main axis`

Đầu tiên, chúng ta sẽ set nó về `flex-direction: row`

```
#container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
```

Bạn có 5 options khi sử dụng `justify-content`:

* flex-start
* flex-end
* center
* space-between
* space-around

![](https://images.viblo.asia/9ba8ffae-c756-48f7-80c8-2b93d7620075.gif)

`space-between` và `space-around` nhìn trên ảnh gif trên có khác nhau đổi chút. 

`space-between` sẽ đưa ra các khoảng cách bằng nhau giữa các `item`, nhưng lại bằng với khoảng cách của `div` ngoài cùng với `container`

`space-around` căn chỉnh khoảng cách của `div` ngoài cùng bằng **một nửa** khoảng cách giữa các `div` với nhau

* Note: Luôn nhớ rằng, `justify-content` hoạt động dựa trên trục `main-axis`, và `flex-direction` thay đổi trục. Nó khá quan trọng trong việc bạn sắp xếp các item với nhau


### 4. Align Items

**Justify Content** giúp bạn căn chỉnh các items trên `main axis`, còn **Align Items** giúp bạn sắp xếp các items dựa trên `cross axis`

`align-items` cũng có 5 options cần nhớ: 

* flex-start
* flex-end
* center
* stretch
* baseline

Từ option đầu tiên đến cái thứ 3 đều giống với `justify-content` nên sẽ không còn lạ lẫm gì cả

Hai option sau có đôi chút khác biệt.

Với `stretch`, item sẽ được tăng độ dài theo trục `cross axis`; 

Còn `baseline`, top của item sẽ được căn chỉnh thẳng hàng

![](https://images.viblo.asia/97c424eb-e336-4f56-a49d-8b3b6750c409.gif)

* Note: Với `align-items: stretch`, bạn nên set `heigh: auto`, bởi vì `heigh` của item có thể ghi đè vào `stretch`

* Sao chúng ta hãy thử kết hợp `justify-content` và `align-items` rồi xem các thuộc tính tương tác với nhau như nào nhở: 

![](https://images.viblo.asia/7648d25c-681c-4fb0-b848-09da0604e82f.gif)

### 5. Align Self

**Align-self** cho phép bạn điều chỉnh thủ công một element cụ thể.

Về cơ bản, nó ghi đè `align-items` cho một `div`. 

```
#container {
  align-items: flex-start;
}
.square#one {
  align-self: center;
}
// Only this square will be centered.
```

Hãy nhìn kết quả đạt được. Bạn đã áp dụng `align-self` cho 2 div kết hợp với `align-items: center` và `flex-direction: row` 

![](https://images.viblo.asia/c2bddece-6dbf-483b-b31c-6e9f45ea5047.gif)


### 6. Tổng kết

Bài viết bao gồm các ví dụ đơn giản của Flexbox, hi vọng giúp ích được cho các bạn muốn tìm hiểu về Flexbox

Cảm ơn đã theo dõi. (seeyou)

Tài liệu tham khảo: https://medium.freecodecamp.org/an-animated-guide-to-flexbox-d280cf6afc35