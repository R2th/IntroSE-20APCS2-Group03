Khi code HTML CSS thì phải nói đến những người code Backend, vì đây chính là việc làm lười nhất họ phải làm. Vì nó là bộ mặt thể hiện ra bên ngoài cho người dùng nên phải làm sao cho đẹp, đẹp rồi thì phải thân thiện với người dùng, sau đó lại phải tương thích trên nhiều thiết bị khác nhau,... đủ các thứ trên đời.

Vậy nên dưới đây là những cách viết cấu trúc SCSS hay mà các bạn có thể tham khảo trong khi làm việc, nhất là các bạn không chuyên về Front-End như mình. Vì đôi lúc chúng ta cũng sẽ phải tự thân vận động code giao diện trang web sao cho vừa đẹp trên máy tính, rồi trên điện thoại, và hàng loạt các kích cỡ màn hình khác nhau nữa :cry:

Lưu ý: Các cấu trúc bên dưới hướng tới cách viết bằng SCSS, vì vậy có thể có cái không áp dụng cho CSS thuần túy. Giờ thì cùng tìm hiểu thôi nào

## Mobile First
Khi nói đến responsive, người ta thường ưu tiên phiên bản dành cho máy tính, điều này có thể khiến việc tùy chỉnh cho thiết bị mobile trở thành một quá trình khó khăn hơn. Thay vào đó, chúng ta nên thiết kế mở rộng, không nên nhồi nhét mọi thứ để phù hợp với mobile.

Thông thường mọi người sẽ viết như này
```CSS
.bad {
  // Desktop code

  @media (max-width: 768px) {
    // Mobile code
  }
}
```

Nhưng nếu thử đổi sang cách này thử xem sao
```CSS
.good {
  // Mobile code

  @media (min-width: 768px) {
    // Desktop code
  }
}
```

Có thể thấy ở đây cách thứ 2 sẽ làm mình chú ý CSS từ các màn hình có kích cỡ từ nhỏ đến lớn,  nên sẽ có thể giúp chúng ta đỡ bị quên và khó khăn hơn đối với màn hình mobile. Tuy nhiên về responsive thì mình nghĩ sẽ theo thói quen từng người mà sẽ chọn cách viết phù hợp với mình.

## Đặt Variables và Mixins
Trong một project thì việc dựng base là một việc rất quan trọng để phát triển cũng như maintain project cho sau này. Việc có một base tốt thì sẽ giúp người code sau này dễ dàng hơn nhiều, code gọn gàng hơn và tránh trùng lặp code.

Việc xác định các biến CSS và các mixins cũng vậy, nên là một phần của việc dựng base. Ví dụ như các thành phần hay dùng sau đây thì nên đặt biến cho nó:
* border-radius
* color
* font-faminly
* font-weight
* margin (gutters, grid gutters)
* transition (duration, easing)
* @media
* ...

## Tránh #id và !important
Không nên:
```CSS
#bad {
  #worse {
     background-color: #000;
  }
}
```
Nên:
```CSS
.good {
  .better {
     background-color: rgb(0, 0, 0);
  }
}
```
Vì `#ids` và `!important` thường sẽ dùng để chỉ định cụ thể bắt buộc cho một đối tượng element nên nếu không để kỹ thì nó sẽ làm rối loạn CSS của bạn. Viết CSS của elenement này nhưng có thể ảnh hưởng tới nhiều element khác, nhất là đối với các class được sử dụng ở nhiều chỗ khác nhau.
Cái nữa là việc kết hợp CSS của class này với CSS của class khác đôi khi cũng sẽ không được như ý muốn của bạn. Vậy nên tốt nhất là tránh dùng #id và !important nhiều nhất có thể.

## Đặt tên mô tả class
Bình thường chúng ta có thói quen đặt tên class kiểu như cho có, dễ gây bị trùng class cũng như khó tìm lại được vị trí class để fix bug
```CSS
.huge-font {
  font-family: 'Impact', sans-serif;
}

.blue {
  color: $COLOR_BLUE;
}
```
Trong khi đó việc code sao cho nó chạy đã làm chúng ta rất đau đầu rồi, nhưng việc nghĩ tên class sao cho hợp lý thì cũng đau đầu không kém :joy:
Ở đây mình sẽ dùng quy tắc BEM để đặt tên cho các class và đặt theo mô tả hệ thống phân cấp. Mình cũng có 2 bài viết về quy tắc BEM này rồi, các bạn có thể tham khảo tại đây

* [BEM - Quy ước đặt tên dành cho class CSS](https://viblo.asia/p/bem-quy-uoc-dat-ten-danh-cho-class-css-924lJEyYZPM)
* [BEM và một số ví dụ](https://viblo.asia/p/bem-va-mot-so-vi-du-QpmlegpmKrd)

Vậy đoạn CSS trên nên viết như nào, chúng ta có thể tham khác cách viết như sau
```CSS
.brand__title {
  font-family: 'Impact', serif;
}

.u-highlight {
  color: $COLOR_BLUE;
}
```

## Giá trị zero và các đơn vị
Điều này có thể tùy thuộc vào lựa chọn cá nhân hoặc hướng dẫn của từng dự án cụ thể, nhưng tính nhất quán mới là chìa khóa. Quy tắc bên dưới yêu cầu bạn chỉ định các đơn vị cho thời gian có thời lượng bằng 0, nhưng không chỉ định các giá trị độ dài bằng 0. Ngoài ra, hãy thêm một số 0 ở đầu cho các vị trí thập phân, nhưng đừng để 3 chữ số sau dấu thập phân.

Không nên:
```CSS
.not-so-good {
  animation-delay: 0;
  margin: 0px;
  opacity: .4567;
}
```
Nên:
```CSS
.better {
  animation-delay: 0s;
  margin: 0;
  opacity: 0.4;
}
```

## Comment CSS

Cách tốt nhất ở đây là nhận xét trên đầu của thuộc tính bạn đang mô tả. Ngoài ra, hãy sử dụng nhận xét nội tuyến (//) thay vì nhận xét cấp khối (/ * * /), điều này khó bỏ comment hơn.

Không nên:
```CSS
.bad {
  background-color: red; // Not commenting on top of property
  /* padding-top: 30px;
  width: 100% */
}
```

Nên:
```CSS
.good {
  // Commenting on top of property
  background-color: red;
  // padding-top: 30px;
  // width: 100%;
}
```

## Lồng các @media CSS

Không nên:
```CSS
.bad {

  &__area {
    // Code

    @media (min-width: 568px) {
      // Code
    }
  }

  &__section {
    // Code

    @media (min-width: 568px) {
      // Code
    }
  }
}
```
Nên:
```CSS
.good {

  &__area {
    // Code
  }

  &__section {
    // Code
  }

  @media (min-width: 568px) {
    &__area {
      // Code
    }

    &__section {
      // Code
    }
  }
}
```

Nên viết CSS @media cho các màn hình ở class gốc, tránh viết vào trong từng thành phần con để dễ dàng kiểm soát được đoạn @media này.

-----

Trên đây không phải danh sách đầy đủ các phương pháp tối ưu khi viết CSS, nhưng nó cũng là những cái cần thiết nhất để thiết kết lên trang web. Hy vọng sẽ giúp ích được cho các bạn chút nhiều!

Cảm ơn các bạn đã đọc bài của mình, nếu có cách viết nào hay thì hãy chia sẻ cho mình biết với nhé :wink: