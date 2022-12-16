Chào mọi người, welcome back to my channel =))
Hôm nay mình sẽ tiếp tục tìm hiểu và sharing về CSS Grid Layout
Mình đã có phần 1 giới thiệu sơ lược và các properties liên quan đến Grid Layout

(https://viblo.asia/p/tim-hieu-ve-css-grid-layout-phan-1-V3m5W0L7KO7)

Trong phần này sẽ tìm hiểu kỹ hơn các properties và value tương ứng dùng để căn chỉnh nội dung của 1 grid items, Ok start thôi

CSS và HTML này dùng chung cho các ví dụ bên dưới nhé (thanks)

**CSS**

```
.container {
    display: grid;
    border: 2px dashed rgba(114, 186, 94, 0.35);
    height: 250px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    background: rgba(114, 186, 94, 0.05);
}
/* Mình chỉ để width và height của item = 50% của parent cho dễ hình dung */
.item {
    width: 50%;
    height: 50%;
    background: rgba(255, 213, 70, 0.4);
    border: 2px dashed rgba(236, 198, 48, 0.5);
}
```

**HTML**

```
<div class="container">
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
</div>
```

Kết quả ban đầu:
![](https://images.viblo.asia/0248604d-82a8-4c33-8f9b-87979f0ae70a.png)

### justify-items
Dùng để căng chỉnh nội dung của item theo row (hàng)

Với giá trị start thì chúng ta sẽ có kết quả như trên
```
.container {
    /* ... */
    justify-items: center;
}
```
![](https://images.viblo.asia/86a6879d-db59-42ee-9110-d3875c587c67.png)
```
.container {
    /* ... */
    justify-items: end;
}
```
![](https://images.viblo.asia/4e8ff569-bff5-41cd-9424-7b2fd308c1dc.png)

Với giá trị stretch thì có nghĩa là sẽ căng ra hết khoảng trống của item, ở đây mình sẽ comment thuộc tính width lại để mn dễ hình dung
```
.container {
    /* ... */
    /*width: 50%;*/ 
    justify-items: stretch;
}
```
![](https://images.viblo.asia/1dc0e037-5f21-4cf5-8f72-b3a448f5af7b.png)

### align-items
Tương tự như justify-items nhưng để căn chỉnh theo cột, và giá trị mặc định start sẽ có kết quả như ảnh ban đầu =))
```
.container {
    /* ... */
    align-items: center;
}
```
![](https://images.viblo.asia/2772c3c9-2604-486f-8dea-9dc0bb744158.png)
```
.container {
    /* ... */
    align-items: end;
}
```
![](https://images.viblo.asia/d2231cbf-004e-44b7-9a97-9494d5a69d83.png)
Tương tự với giá trị stretch ở justify-items thì mình cũng sẽ comment height, nó sẽ ntn
```
.container {
    /* ... */
    /*height: 50%;*/ 
    align-items: stretch;
}
```
![](https://images.viblo.asia/795f0d4f-283c-4bb7-8425-2e02e8d1e85d.png)
### justify-self và align-self
Cách sử dụng tương tự như justify-items và align-items nhưng ở đây là set riêng cho các items
```
<div class="container">
    <div class="item" style="justify-self: start"></div>
    <div class="item" style="justify-self: center"></div>
    <div class="item" style="justify-self: end"></div>
    <div class="item" style="align-self: end"></div>
    <div class="item" style="align-self: end; justify-self: center"></div>
    <div class="item" style="align-self: end; justify-self: end"></div>
</div>
```
![](https://images.viblo.asia/479a8e5e-8b27-4df4-8df2-75f98fc82a36.png)

### place-items
Đây là 1 shorthand để set justify-items và align-items chung với nhau. Syntax
```
place-items: <align-items value> / <justify-items value>
```

justify-items và align-items dùng để căn chỉnh các nội dung của 1 item, chúng ta muốn căn chỉnh toàn bộ nội dung thì sẽ cần phải sử dụng đến 2 properties khá mạnh mẽ là justify-content và align-content, 2 thuộc tính này còn kết hợp rất tốt khi sử dụng vs bố cục theo flex,
Đối với justify-content và align-content thì sẽ điều chỉnh 1 chút style để mn dễ hiểu hơn.
```
.container {
      /* ... */
      grid-template-columns: 100px 100px 100px;
      grid-template-rows: 75px;
      height: 300px;
}
.item {
     width: 60px;
     height: 60px;
     /* ... */
}
```
![](https://images.viblo.asia/50c0c058-6586-4237-8de1-115f80198c10.png)


### justify-content

Căn chỉnh toàn bộ nội dung theo row (hàng)
Và tương tự giá trị start sẽ có kết quả như ảnh trên

```
.container {
     /* ... */
     justify-content: end;
}
```
![](https://images.viblo.asia/f404c1ca-ec87-427f-9c66-93e23b0290c7.png)

```
.container {
  /* ... */
  width: 100%; /* điều chỉnh width chiếm toàn bộ khoảng trống của item */
  justify-content: space-evenly; /* khoảng cách giữa các item là như nhau */
}
```
![](https://images.viblo.asia/bae74cb0-2ea5-4f36-a0cc-ac2bfdfa520b.png)
```
.container {
  /* ... */
  width: 100%;
  /* giá trị mình k biết giải thích ntn cho dễ hiểu, nhìn kết quả =)) */
  justify-content: space-between;
}
```
![](https://images.viblo.asia/d9314d17-274c-4b3d-93b8-87485e2e8efc.png)
### place-content
Đây cũng là 1 shorthand để viết gộp justify-content và align-content. Syntax:

```
place-content: <align-content value> / <justify-content value>
```

### Kết thúc =))
Ok, cũng khá nhiều ví dụ về các properties quan trọng dùng để căn chỉnh nội dung trong grid, còn vài values trong các properties mình k thể ví dụ hết đc vì nó khá nhiều, mn có thể tự check lại, hy vọng sẽ giúp ích cho mọi người, và nhớ đừng quên đăng ký kênh của mình nhé =)), nếu có thắc mắc gì thì mn comment bên dưới nhé, cảm ơn mọi người đã đọc bài (love)