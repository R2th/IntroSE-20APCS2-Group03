# Sử dụng biến trong CSS
Những website lớn thường sẽ sử dụng rất nhiều CSS với lượng lớn giá trị bị lặp lại. Giả sử khi bạn muốn sửa màu chủ đạo của website thì rất có khả năng bạn sẽ phải sửa ở rất nhiều vị trí ví dụ như button, navbar, title,.... Điều này gây ra rất nhiều khó khăn khi code cũng như khi bảo dưỡng và duy trì website.

Để giải quyết vấn đề này chúng ta có thể sử dụng CSS pre-processing: SASS, LESS. Tuy nhiên, với cách này các bạn sẽ cần thêm 1 bước complile độc lập, đồng thời cần phải bỏ thời gian ra học và tìm hiểu về chúng và một điều rất quan trọng là các bạn sẽ không thể sử dụng javascript để update các giá trị css.

Trong bài viết này mình sẽ giới thiệu cho các bạn 1 cách đơn giản hơn đó là biến trong css không cần bước compile độc lập đồng thời các bạn hoàn toàn có thể thay đổi các giá trị css bằng javascript.

Tuy nhiên, có 1 lưu ý đây vẫn đang là tính năng thử nghiệm nên khi sử dụng các bạn cần lưu ý xem browser mà các bạn develop cho có hỗ trợ không. Các bạn có thể xem ở trang này:
https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables#Browser_compatibility

**Ví dụ: **
```
/* Khai báo biến */

element {
  --spacing:10px;
}

/* Sử dụng biến */

element {
  padding: var(--spacing);
}
```

Các bạn lưu ý, tất cả biến trong css khi khai báo đều cần có hai dấu gạch ngang "--" ở phía trước .
Khi lấy giá trị của biến ra thì các bạn dùng cấu trúc "var(tên biến)".

**Ví dụ 1: Sử dụng biến trong CSS **
```
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        --main-color: red;
      }
      
      .red {
        color: var(--main-color);
      }
      
      .red2 {
        color: var(--main-color);
      }
      
      .red3 {
        color: var(--main-color);
      }
      

    </style>
  </head>

  <body>
    <h1 class="red">Red 1</h1>
    <h1 class="red">Red 2</h1>
    <h1 class="red">Red 3</h1>
  </body>
</html>
```

# Tính kế thừa của biến CSS
```
<style>
    .parent {
      --color: blue;
    }
    .child1 {
      --color: green;
    }
    
    .child1 {
      color:var(--color);
    }
    
    .child2 {
      color:var(--color);
    }

  </style>
  <body>
    <div class="grand-parent">
      <div class="parent">
        <div class="child1">child1</div>
        <div class="child2">child2</div>
      </div>
    </div>
  </body>
```

Trong ví dụ trên:
Đối với **class="child1"** : color = green mà không phải là blue do giá trị này được define trong **class="child1"**
Đối với **class="child2"** : color=blue do thừa hưởng từ class="parent"
Đối với **class="grand-parent"** : biến --color không tồn tại do biến này chỉ được define trong các phần tử con.

# Giá trị mặc định
Các bạn có thể define giá trị mặc định khi mà biến không tồn tại như sau:
```
element {
  color: var(--main-color, red); /* nếu --main-color không tồn tại thì trả về red */
}


element {
  background-color: var(--main-color, --second-color, pink); /* trả về red nếu --main-color và --second-color không tồn tại */
}
```

# Nguồn tham khảo 
https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables#Browser_compatibility

# Tổng kết 
Đây là những gì mình đã tìm hiểu về biến trong CSS , hi vọng qua bài này sẽ giúp các bạn hiểu rõ hơn về biến trong CSS qua đó giúp các bạn áp dụng biến vào dự án một cách hiểu quả nhất .