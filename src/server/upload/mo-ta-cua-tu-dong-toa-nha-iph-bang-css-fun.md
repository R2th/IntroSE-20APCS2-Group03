Hi anh em, trong một ngày đẹp trời đang ngồi uống cafe tại highland, mình thấy mấy đứa trẻ chạy ra chạy vào trước cái cửa tự động của toà nhà IPH. 
Thế là trong dây phút rảnh rỗi mình nghĩ thử mô tả cách hoạt động của cánh cửa tự động này bằng HTML/CSS :D 

![](https://images.viblo.asia/6569780b-b06d-4b10-a624-09cb511fa8df.jpeg)

## Bài toán 

Cánh cửa tự động gồm 6 tấm kính tất cả, đối xứng nhau và có 4 tấm kính kích thước bằng nhau sẽ di chuyển dạt sang 2 bên
khi có người đi vào khu vực mà cảm biến nhận diện được ( ở đây thay cho cảm ứng thì chúng ta dùng sự kiện hover vào khu vực 4 tấm kính 1, 1', 2 và 2')
2 tấm (1 và 1') gần trung tâm sẽ phải di chuyển nhanh hơn 2 tấm (2 và 2') để cả 4 tấm sẽ dạt về 2 phía cùng lúc.

![](https://images.viblo.asia/e53159c8-7efd-4c88-971e-925981e076a9.jpeg)

 Hiển thị nó ra với HTML/CSS trước cho dễ hình dung 

```html
<div class="main">
  <h1 style="text-align: center;">IPH auto door</h1>
  <div class="door">
    <div class="d-left"></div>
    <div class="d-animate">
      <div class="d-side d-side--left"></div>
      <div class="d-center">
        <div class="center-item"></div>
        <div class="center-item"></div>
      </div>
      <div class="d-side d-side--right"></div>
    </div>
    <div class="d-right"></div>
  </div>
</div>

<style lang="scss">
.door {
  display: flex;
  width: 1200px;
  height: 400px;
  border: 1px solid;
  margin: 50px auto;

  .door-item {
    width: 200px;
  }

  .d-left,.d-right {
    width: 200px;
    background-color: #2c3e50;
  }
}

.d-animate {
  display:flex;
  width: 800px;

  .d-side {
    position: relative;
    width: 200px;
    background-color: rgba(46, 204, 113, 0.7);
  }

  .d-center {
    width: 400px;
    display:flex;

    .center-item {
      position:relative;
      border: 1px solid #fff;
      background-color: rgba(41, 128, 185, 0.7);
      width:300px;
    }
  }
}

</style>
```

Chúng ta sẽ được một cái hình như sau:

![](https://images.viblo.asia/740dc794-58cb-41fd-90ce-a8712347066e.png)

Khi có người đi đến khu vực cảm biến tương đương với việc hover vào khu vực 4 cái cửa màu xanh kia thì nó sẽ dạt sang 2 bên, để biết được điều đó chúng ta dựa vào class `d-animate` vì thằng này bao bọc bên ngoài cả 4 cánh cửa màu xanh, nên khi hover vào mình có thể tác động nên 4 cánh cửa bên trong nó.

Vậy chúng ta sẽ cho 4 cánh cửa đó dạt sang 2 bên khi hover vào class `d-animate`

```css
.d-animate {
... (như đoạn ở trên)

&:hover {
    cursor:pointer;

    .center-item {
      &:first-child {
        transform: translatex(-400px);
      }
      &:last-child {
        transform: translatex(400px);
      }
    }

    .d-side--left {
      transform: translatex(-200px);
    }
    .d-side--right {
      transform: translatex(200px);
    }
  }
}
```

![](https://images.viblo.asia/48f44b35-c818-40eb-89e2-01d9ed3bb640.png)

Đoạn css trên chạy đã có vẻ đúng nhưng để ý kĩ lại thì chúng ta thấy có một vấn đề là 2 bên cửa đang bị đè lên nhau chưa đúng thứ tự (thứ tự đúng là xanh dương -> xanh lá -> đen) nên có màu sắc khác nhau và chưa được "mượt" cho lắm :D 

Sửa tiếp css 
```css
.d-animate {
  ...

  .d-side {
    ...

    z-index:1;
  }

  .d-center {
    ...

    .center-item {
    ...

      z-index:2;
    }
  }
}

```

Đến đoạn này thì 2 cánh cửa màu xanh dương đã được nhảy lên trên cùng rồi, nhưng cửa toà nhà mà mở nhanh thế này thì vỡ hết kính mất :D , thêm một ít `transition` cho những cái cửa này 

```css
.d-animate {
  ...

  .d-side {
    ...

    transition: transform 4s linear;
    z-index:1;
  }

  .d-center {
    ...

    .center-item {
      ...

     transition: transform 4s linear;
      z-index:2;
    }
  }
}

```

![](https://images.viblo.asia/f02ab86b-82fb-49bd-aaf5-bb7da3ba7068.png)

## Notes
Bài viết chỉ mang tính chất giải trí, bạn cũng có thể tham khảo qua một chút về cách xử lý animation của thành phần con khi hover một thành phần cha, 
nếu có cơ hội chúng ta sẽ làm nhiều ví dụ khác hơn về các animation thường dùng trong dự án của mình.

Link [codepen](https://codepen.io/thuyetnv/pen/XWXBJme)