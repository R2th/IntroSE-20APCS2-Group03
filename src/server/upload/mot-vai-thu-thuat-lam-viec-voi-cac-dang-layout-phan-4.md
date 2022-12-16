![](https://images.viblo.asia/243bc980-c9d9-4224-9dad-32b434fdecdf.png)

Chào mọi người, cũng đã lâu rồi mình không thấy nhau. Để tiếp tục với [series's về các dạng layout](https://viblo.asia/s/mot-vai-thu-thuat-cho-nhung-dang-layout-thuong-gap-3m5WB8evlO7) hôm nay mình sẽ chia sẻ thêm một trick thú vị nữa về **step layout**.

Hôm nay là ngày cuối nhiệm kỳ của ông Canh Tý rồi, tối nay cũng khá nhiều việc, ngồi viết giấy tờ, bày soạn mâm đồ cúng cùng gia đình. Được ngày cuối năm thời tiết đẹp chút lạnh mà không mưa, mình ngồi khai code đầu xuân với bài chia sẻ về chiếc layout mà vừa rồi mình apply cho bên dự án đợt vừa rồi.

Chiếc layout nhìn khá hay, đẹp mắt. Tuy nhiên nếu nhìn kỹ nó cũng khá tốn thời gian và công sức đấy các bro. Bây giờ mình sẽ tái hiện lại cách làm layout này. Yên tâm là có support cho cả IE nữa nhé ;)

![](https://images.viblo.asia/1af4e3b8-db01-4b5d-bbb6-87e347ab75ef.jpg)

> **Mô tả**:
> - Mỗi item là 1 step
> - Giữa mỗi step sẽ có icon arrow, khi item bị deactive thì sẽ bị chuyển thành màu xám và icon trước đó cũng vậy.
> - Giữa mỗi item có một điểm khuyết (lõm), màu của border sẽ đi theo màu của step hiện tại.

#### Ý tưởng thực hiện
- Để chia layout đều giữa các item và khoảng cách mình sẽ áp dụng [cách này](https://viblo.asia/p/mot-vai-thu-thuat-lam-viec-voi-cac-dang-layout-phan-1-RnB5p6kDZPG#_1-layout-multi-row-voi-flex-0).
- Điều hack não nhất chỗ này chính là cái đường khuyết chỗ icon arrow. Làm thế nào mà color của border phụ thuộc theo mỗi step được, ví dụ step màu cam và bên cạnh nó là step bị deactive thì color của 2 bên là khác nhau.
- Ở đây mình sẽ dùng kỹ thuật `before / after` để tạo đường cong kết hợp với `overflow` cùng với một background màu trắng để che đi đường viền *"thẳng"*.

##### - Tổ chức layout HTML (ở đây mình sử dụng Pug cho gọn)
```pug
.step // 1 cái wrapper để dàn layout cho các item
  .stepItem.active
    .stepItemBox
      .stepItemInner
        .stepText Code
  .stepItem
    .stepNotification 1
    .stepItemBox
      .stepItemInner
        .stepText Eat
  .stepItem
    .stepItemBox
      .stepItemInner
        .stepText Sleep
  .stepItem.unActive
    .stepItemBox
      .stepItemInner
        .stepText Bugs
```

##### - CSS phần layout nào
```scss
.step {
  display: flex;
  padding: 20px;
  font-family: "Open Sans", sans-serif;
  
  // Bắt đầu CSS cho từng item
  &Item {
    position: relative;
    width: calc(25% - 21px);
    text-align: center;
    color: $orange2;
    cursor: pointer;

    // Dùng trừ phần tử đầu tiên và selector những phần tử còn lại
    &:not(:first-child) {
      margin-left: 28px;
       
      // Chỗ icon arrow mình dùng luôn font Awesome cho tiện
      &:after {
        content: "\f101";
        font-family: "FontAwesome";
        position: absolute; // căn lại position sao cho phù hợp là được
        top: calc(50% - 16px);
        left: -28px;
        width: 33px;
        height: 22px;
        font-size: 30px;
        color: $orange2;
        z-index: 3;
      }
    }
    
    // Vì chỉ xuất hiện điểm khuyết giữa các step, nên step đầu và cuối mình sẽ ẩn
    // Step đầu tiên thì không khuyết bên trái
    &:first-child {
      .stepItemBox {
        &:before {
          display: none;
        }
      }
    }

    // Step cuối cùng thì không khuyết bên phải
    &:last-child {
      .stepItemBox {
        &:after {
          display: none;
        }
      }
    }

    // Style cho phần border khuyết của mỗi item
    .stepItemBox {
      &:before,
      &:after {
        color: $orange4;
        border-color: $orange4;
      }
    }

    // Đối với step nào được active thì style riêng
    &.active {
      .stepItemInner {
        background: $yellow2;
      }

      .stepItemBox {
        &:after {
          color: $orange4;
          border-color: $orange4;
        }
      }
    }

    // Tương tự, với unActive thì dùng CSS3 mình blend lại màu xám luôn cho nhanh
    &.unActive {
      filter: grayscale(100%);
      text-decoration: line-through;
      z-index: 2;
    }
  }
  
  // Mục đích để tạo đường border xung quanh mỗi step.  
  &ItemInner {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: $yellow3;
    border: 1px solid $orange4;
    border-radius: 4px;
    padding: 30px 25px;
    min-height: 200px;
    transition: 0.4s;

    &:hover {
      background: $orange5;
    }
  }

  // trick này để hack `overflow` và tạo phần khuyết để che đi đường border lớn.
  &ItemBox {
    position: relative;
    overflow: hidden;

    &:before,
    &:after {
      content: "";
      position: absolute;
      top: calc(50% - 26px);
      width: 52px;
      height: 52px;
      background: white;
      border: 1px solid $orange4;
      border-radius: 50%;
      z-index: 2;
    }
    
    &:before {
      left: -40px;
    }
    
    &:after {
      right: -40px;
    }
  }

  // Tạo cái notification chỗ góc
  &Notification {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 18px;
    right: 18px;
    width: 20px;
    height: 20px;
    color: white;
    background: red;
    font-size: 11px;
    border-radius: 50%;
    z-index: 3;
    line-height: 1;
  }

  &Text {
    color: $orange2;
    font-size: 24px;
    font-weight: 400;
  }
}
```

***Mấy bro cũng có thể xem phần hoàn chỉnh ở đây.***
{@embed:https://jsfiddle.net/KhuyenNH/km024rLw/embed/result,html,css/dark}

### Tổng kết
Trên đây là layout về một kiểu step mà mình vừa gặp, ban đầu code mất 4 giờ nhưng có chút bugs, định request đổi design. Nhưng sau một buổi happy hour với anh em trong team thì mình lại thử cách này và nó work khá ok. Hi vọng tricks trên sẽ giúp mọi người có thể tận dụng được `ctrl + c` và `ctrl + v` từ code của mình.

Chúc mọi người ăn Tết vui, lành mạnh, không bị cô Vít ghé thăm. Năm mới nhiều sức khoẻ, may mắn và đạt được nhiều mục tiêu.