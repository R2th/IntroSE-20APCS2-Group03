## 1. Sticky element

Bạn có thể đã sử dụng thuộc tính CSS position với các giá relative và absolute trong quá khứ. Các trình duyệt web hiện đại hiện hỗ trợ giá trị "sticky". Nó cho phép bạn làm cho các phần tử dính lại khi cuộn đến một điểm nhất định.

Một phần tử có vị trí: sticky sẽ hoạt động giống như một phần tử được định vị tương đối cho đến khi nó đạt đến một điểm được chỉ định và sau đó bắt đầu hoạt động như một phần tử được định vị tĩnh.

[position: sticky](https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_sticky_element)

## 2. Think outside the box

Nếu bạn đã có sẵn 1 container với những chỉ số padding, margin, width... mặc định nhưng lại muốn có 1 trong số những element con của nó "fullscreen"

```
// container
.container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 24px;
    box-sizing: border-box;
  }
```

```
// child element
.content {
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
}
```

- width: giúp thay đổi chiều rộng của content có thể vượt ra ngoài max-width của container
- Điểm quan trọng ở đây chính là position: relative, các thuộc tính left, right và margin giúp thay đổi lại vị trí của element trở về chính giữa màn hình

## 3. box-sizing: border-box;
Một thuộc tính tuyệt vời giúp giải quyết vấn đề padding và lộn xộn layout. Về cơ bản, khi bạn thêm padding cho 1 box đã có size được thiết lập, padding sẽ làm tăng kích thước của box đó. Khi sử dụng box-sizing: border-box; kích thước của box sẽ không bị thay đổi.

Nếu muốn cho kích thước của box không bị padding làm cho thay đổi một cách không mong muốn, hãy sử dụng thuộc tính này.

## 4. Conical gradients

Một cách đơn giản nếu bạn muốn vẽ một biểu đồ dang Pie, chỉ đơn giản với một dòng, tất nhiên cách này sẽ hiệu quả nếu bạn chỉ muốn một biều đồ đơn giản và nhanh chóng.

Chức năng conic-gradient có thể được sử dụng để tạo ra một loạt các mẫu hình ảnh thú vị như hình nón, biểu đồ hình tròn, bánh xe màu và bề mặt bóng.

Các gradient hình nón xoay các điểm dừng màu xung quanh một điểm trung tâm (thay vì tỏa ra từ một điểm trung tâm như gradient xuyên tâm). Các điểm dừng màu gradient hình nón được đặt xung quanh chu vi của một vòng tròn.

![](https://images.viblo.asia/3c80e47c-669c-45c1-992f-7c1ef6299500.png)

Để tạo biểu đồ hình tròn, chúng tôi sử dụng các điểm dừng màu chồng lên nhau (có chuyển tiếp đột ngột).

![](https://images.viblo.asia/577b1b38-aaa0-4611-9b75-80173ba541f1.png)

```
.pie-chart{
    background: conic-gradient(red 120deg, green 120deg 240deg, blue 240deg);
}
```

- Browser support
![](https://images.viblo.asia/06d853c6-d8c2-4c76-84b8-916ef8d6b611.png)