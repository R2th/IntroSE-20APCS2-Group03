Khi bạn làm về fontend hay bắt đầu học và tìm hiểu về CSS chắc hẳn bạn đã biết hoặc nghe về Flexbox. Vậy flexbox là gì? Sử dụng flexbox như thế nào? Khi nào nên sử dụng flexbox? Nên trong bài viết này chúng ta sẽ cùng tìm hiểu về flexbox cũng như công dụng của nó.

# Flexbox là gì?
Flexbox nhằm mục đích cung cấp một giải pháp hiểu quả trong việc bố trí, sắp xếp và phân bố các phần tử(item) bên trong một `container`. Chúng sẽ tự cân đối các phần tử trong `container` khi các phần tử không được xác định kích thước rõ ràng. Với flexbox ta có thể dễ dàng căn chỉnh hướng, bố cục, kích thước hay vị trí của các phần tử trong `container`.

Flexbox tiện ích là vậy nhưng chúng ta chỉ nên sử dụng khi cần layout cho các `component` hay những bố cục có phạm vi nhỏ. Còn nếu muốn layout cho phạm vi lớn hơn hay trang web ta nên sử dụng **Grid**.

# Khái niệm cơ bản
Trược khi đi tìm hiểu về các thuộc tính của flexbox ta sẽ tìm hiểu về cấu trúc của nó và một số thuật ngữ cần nhớ.

![](https://images.viblo.asia/9dd2fe2b-6c0e-41ba-9e3c-c6e90cdcdc71.png)

Tất cả các phần tử trong `container` đều được layout theo `main-axis` và được bắt đầu từ `main-start` đến `main-end` hoặc `cross-axis` và bắt đầu từ `cross-start` đến `cross-end`.

* `main-axis`: trục chính để điều hướng các flex item hiển thị trong `container`. Ta có thể thay đổi `main-axis` bằng cách dùng thuộc tính `flex-direction: row | column`.
* `main-start` | `main-end`: khi ta sử dụng flexbox để layout thì điểm bắt đầu của `container` được gọi là `main-start` và điểm kết thúc được gọi là `main-end`.
* `main-size`: là kích thước của mỗi flex item dựa vào  `main-axis`.
* `cross-axis`: là trục vuông góc với trục chính `main-axis`.
* `cross-start` | `cross-end`: tương tự như `main-start` và `main-end` những nó được tính theo `cross-axis`.
* `cross-size`: là kích thước của mỗi flex item dựa vào  `cross-axis`.

# Thuộc tính Flexbox
Để sử dụng flexbox để layout trước hết ở container ta phải sử dụng `display: flex`. Ta có đoạn HTML và CSS sau.
```HTML
<div class="container radius">
    <div class="item radius"></div>
    <div class="item radius"></div>
    <div class="item radius"></div>
</div>
```
```CSS
.radius {
    border-radius: 3px;
}
.container {
    background-color: #907fa4;
    padding: 10px;
}

.item {
    background-color: #a6d6d6;
    margin: 10px;
    height: 100px;
}
```
Giao diện sẽ như sau:

![](https://images.viblo.asia/b4e72a84-6a38-4a2f-9a3b-7573b65804b7.png)

Khi ta thêm `display: flex` vào `container` ta sẽ có.

![](https://images.viblo.asia/d257632e-7de2-4fc7-9db8-8ffe1c8ca634.png)

Vì mặc định thẻ div sẽ có `display: block` nên khi ta có 3 thẻ div thì tương ứng với mỗi thẻ dev sẽ ở trên cùng một dòng và có chiều rộng là full cửa sổ trình duyệt còn khi ta thêm `display: flex` vào `container`. Thì 3 thẻ div trong `container` sẽ nằm trên cùng một dòng (vì mặc định khi sử dụng flexbox ta sẽ có `flex-direction: row` lát ta sẽ tìm hiểu ở bên dưới) và chiều rộng của nó sẽ theo content trong thẻ div. Ở đây mình có set thêm `width: 100px` cho mỗi item trong `container` cho dễ nhìn.
```CSS
.item {
    background-color: #a6d6d6;
    margin: 10px;
    height: 100px;
    width: 100px;
}
```

### flex-direction
Thuộc tính `flex-direction` dùng để điều hướng cho `main-axis` của flexbox.

`flex-direction: row | row-reverse | column | column-reserve`
* `row`: đây là giá trị mặc định khi ta sử dụng flex box, các `flex-item` sẽ điều hướng theo trục ngang.

![](https://images.viblo.asia/bf71c4af-93b1-4689-8a04-e274f3b94292.png)
* `row-reverse`: các `flex-item` sẽ điều hướng theo trục ngang nhưng các phần tử sẽ bị đảo ngược.

![](https://images.viblo.asia/9b421967-07a8-4d89-98e1-9482b1176033.png)

* `column`: tương tự như `row` nhưng chúng được điều hướng theo chiều dọc.

![](https://images.viblo.asia/a6d85d7b-7b15-427d-8464-f499e4781fe1.png)

* `column-reserve`: tương tự như `row-reverse` nhưng chúng được điều hướng theo chiều dọc.

![](https://images.viblo.asia/b9867b8d-1aba-45d1-a8f2-6cf9d00be9bb.png)



### flex-wrap
Mặc định các flex item sẽ được fit vào 1 dòng. Nhưng khi các flex item có tổng chiều dài lớn hơn `container` nếu ra muốn khi bị tràn ra thì các flex item tự động bị đẩy xuống dòng mới thì như thế nào?. Lúc này ta cần đến thuộc tính `flex-wrap`.

`flex-wrap: nowrap | wrap | wrap-reverse`

* `nowrap`: đây là thuộc tính mặc định, các item sẽ không được xuống dòng khi tràn ra mà sẽ được hiển thị trên một dòng.

![](https://images.viblo.asia/3c19cec5-d362-418f-81ee-f9de469a7927.png)

* `wrap`: các item sẽ tự động xuống dòng khi tràn và chúng sẽ được hiển thị trên nhiều dòng từ cao xuống thấp.

![](https://images.viblo.asia/cbdd3ed8-8edc-4419-a828-d650732604f1.png)

* `wrap-reverse`: tương tự như `wrap` nhưng chúng được hiển thị từ dưới lên trên.

![](https://images.viblo.asia/4f0006ca-f2b4-40bc-989c-37c5eb7f3a2b.png)


### flex-flow
`flex-flow` là shorthand của `flex-direction` và `flex-wrap`.

`flex-flow: column wrap` tức là `flex-direction: column + flex-wrap: wrap`.

### justify-content
Đây là thuộc tính để căn chỉnh các flex item theo `main-axis`. Nó sẽ phân chia những phần còn thừa của container một cách linh hoạt theo ý ta muốn. Ở đây mình sẽ đề cập đến một số thuộc tính hay dùng.

`justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly`

* `flex-start`: đây là giá trị mặc định, flex item sẽ bắt đầu `main-start` theo `flex-direction`

![](https://images.viblo.asia/bf71c4af-93b1-4689-8a04-e274f3b94292.png)


* `flex-end`: flex item sẽ bắt đầu từ `main-end` theo `flex-direction`

![](https://images.viblo.asia/931af9ff-895d-4ca4-867f-1dfec7ea5e6d.png)


* `center`: các flex item sẽ được căn ở giữa theo `main-axis`

![](https://images.viblo.asia/327dabca-655f-4c41-a886-63e066ba3e81.png)


* `space-between`: các flex item sẽ được căn tương đối với nhau, phần tử đầu tiền bắt đầu ở `main-start`, phần tử cuối cùng ở `main-end`

![](https://images.viblo.asia/0eaad266-ae84-49a8-8a2e-6f2a192c1425.png)


* `space-around`: các flex item sẽ được cách đều nhau

![](https://images.viblo.asia/551559ef-1479-4ec5-b79b-7e3f1be94411.png)

* `space-evenly`: các flex item sẽ có khoảng cách đều nhau, tính cả ở 2 đầu

![](https://images.viblo.asia/3b585605-fe01-4db3-b979-8bdbf2d118c7.png)

### align-item
`align-item` giúp ta layout các flex item theo chiều của trục `cross-axis` (vuông góc với hướng `flex-direction`).

`align-items: stretch | flex-start | flex-end | center | baseline`

* `stretch`: giá trị mặc định, các phần tử sẽ có độ dài theo chiều `cross-axis` (max-width hoặc max-height)

![](https://images.viblo.asia/37f3812f-a990-49bf-a8c1-34af399c3158.png)


* `flex-start`: các flex-item sẽ được bắt đầu theo chiều `cross-axis` ở vị trí `cross-start`

![](https://images.viblo.asia/76d264c0-178e-4c22-9333-136d097c9fd4.png)


* `flex-end`: các flex-item sẽ được bắt đầu theo chiều `cross-axis` ở vị trí `cross-end`

![](https://images.viblo.asia/a3fb8641-e0a3-432b-a1a0-32385cbfd88a.png)


* `center`: các flex-item sẽ được căn ở chính giữa theo chiều `cross-axis`

![](https://images.viblo.asia/78625983-6aea-49d9-974a-8e1809a51c8b.png)


* `baseline`: các flex item sẽ được căn theo `baseline` của chúng

![](https://images.viblo.asia/aa4087e7-5502-4050-8f2a-f844ac4d6dc3.png)



### order
`order` cho phép ta sắp xếp các flex item theo thứ tự mà ta mong muốn. Thứ tự sẽ được sắp xếp từ thấp đến cao.

`order: <number>`

![](https://images.viblo.asia/1fcc0f31-8e17-42b8-a03c-c0b8a56c5cdb.png)

### flex-grow
`flex-grow` giúp ta xác định chiều dài cho các flex item một cách "dynamic" theo container. Ví dụ ta có 3 flex item chiếm 500px theo chiều dài và container của ta còn thừa 500px nữa khi ta xét `flex-grow` lần lượt là 1, 2, 3 tương ứng với 3 flex item thì 500px còn thừa sẽ được chia cho các flex item tướng ứng với số phần ta định nghĩa `flex-grow`. Lúc này chiều dài của các container sẽ được giãn ra theo `flex-grow`. Giả sử tổng `flex-grow` các flex item là 6 thì tùy theo số `flex-grow` ta sẽ chia phần còn thừa của container ra là 1/6, 2/6 và 3/6.

`flex-grow: <number>`

Trong phần này ta sẽ có một ví dụ thực tế sau:

![](https://images.viblo.asia/1140cb8b-3ac3-440a-ab09-daa7a56d2293.png)

Ở đây trang mp3 ta có danh sách hiển thị bài hát của bảng xếp hàng. Phân tích ta có thể thấy ở đây chỉ có tên bài hát là thay đổi các phần còn lại đã có width cố định. Nếu chia ra ta sẽ để flex item chứa tên bài hát có `flex-grow: 1` để phần tử này sẽ chiếm toàn bộ phần còn lại của container.

### flex-shrink
Khi ta thu nhỏ trình duyệt các phần tử sẽ đồng thời co lại nếu ta muốn một phần từ co lại nhiều hơn thì sao? Lúc này ta sẽ dùng đến `flex-shrink` mặc định giá trị này sẽ là 1 (các phần tử sẽ bớt chiều rộng của mình như nhau). Nếu ta để giá trị này lớn hơn các phần tử flex còn lại thì flex item này sẽ bị co lại nhiều hơn (mất chiều rộng nhiều hơn các phần tử khác) theo một công thức.

![](https://images.viblo.asia/2658584d-a558-4e97-ada3-583bb04d1bbf.gif)

Nhìn vào gif ta có thể thấy flex item thứ 2 bị co lại nhiều hơn so với 1 và 3 mặc dù flex item thứ 2 to hơn rất nhiều.

### flex-basis
`flex-basis` là độ rộng tượng đối của các flex item(giống như width và height).

# Tổng kết
Như vậy qua bài viết này mình đã giới thiệu cho các bạn về **Flexbox**. Flexbox rất hữu dụng giúp ta có thể layout dễ dàng cho các phần tử thay vì trước đây sử dụng float. Mình hy vọng qua bài viết này các bạn có thể sử dụng thành thạo flexbox và áp dụng nó cho dự án của mình. Cảm ơn các bạn đã theo dõi đến hết bài viết <3.