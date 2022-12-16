Checkbox là 1 thành phần HTML thường được sử dụng khá nhiều trong trang web. Tuy nhiên, dạng mặc định của radio button nhìn khá thô sơ và không đẹp mắt. Hôm nay, mình xin hướng dẫn các bạn cách để style cho checkbox  trở nên đẹp hơn với việc chỉ cần dùng CSS3 chứ không cần phải sử dụng đến Javascript.

# Thực hiện
### Đầu tiên, ta có cấu trúc HTML cho 2  checkbox như sau:

```
<div class="form-check-default box-checkbox">
      <input class="form-checkbox-input" id="default-check2" type="checkbox" name="default-check" checked="checked">
      <label class="form-checkbox-label-2" for="default-check2">Selected</label>
</div>

<div class="form-check-default box-checkbox">
      <input class="form-checkbox-input" id="default-check2" type="checkbox" name="default-check">
      <label class="form-checkbox-label-2" for="default-check2">Selected</label>
</div>
```

Tiếp theo ta có css như sau :
```
.form-check-default {
  .form-checkbox-input {
    position: absolute;
    left: -9999px;

    &:focus {
      box-shadow: none;
    }

    &:not(:checked) + label:after {
      color: $black;
      opacity: 0;
    }

    &:checked {
      + label {
        color: $black;

        // stylelint-disable-next-line max-nesting-depth
        &:before {
          border: 1px solid $red;
          background: $red;
        }

        // stylelint-disable-next-line max-nesting-depth
        &:after {
          opacity: 1;
        }
      }
    }

    &:disabled {
      + label {
        color: $gray;

        // stylelint-disable-next-line max-nesting-depth
        &:before {
          border: 2px solid $gray;
          background: $white;
        }
      }
    }

    &:disabled:checked {
      + label {
        color: $gray;

        // stylelint-disable-next-line max-nesting-depth
        &:before {
          border: 1px solid $gray;
          background: $gray;
          color: $gray;
        }
      }
    }
  }
  
  .form-checkbox-label-2 {
    position: relative;
    padding-left: 40px;
    cursor: pointer;
    display: inline-block;
    color: $gray;
    font-size: 12px;
    user-select: none;

    &:before {
      content: '';
      left: 0;
      width: 24px;
      height: 24px;
      border: 2px solid $payne-grey;
      border-radius: 3px;
      background: $white;
       position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    &:after {
      content: '\f00c';
      color: $white;
      left: 5px;
      width: 24px;
      height: 24px;
      font-family: $fontawesome;
      border-radius: 3px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      top: 11px;
      font-weight: 900;
      font-size: 15px;
    }
}
```

# Cuối cùng là mình sử lí sự kiện quan trọng nhất khi checkbox nó checked và lúc nó không checked
### Khi checkbox chưa checked
```
.form-check-default .form-checkbox-input:not(:checked) + label:after {
    color: #373737;
    opacity: 0;
}

.form-check-default .form-checkbox-label-2:before {
    content: '';
    left: 0;
    width: 24px;
    height: 24px;
    border: 2px solid #636e7b;
    border-radius: 3px;
    background: #fff;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}
```

### Khi checkbox checked
```
.form-check-default .form-checkbox-input:checked + label:before {
    border: 1px solid #b12427;
    background: #b12427;
}

.form-check-default .form-checkbox-label-2:before {
    content: '';
    left: 0;
    width: 24px;
    height: 24px;
    border: 2px solid #636e7b;
    border-radius: 3px;
    background: #fff;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}
```

### Hình ảnh minh họa sau khi style
![](https://images.viblo.asia/2a1fb7d9-5e1c-4f14-98d6-4a5929d779a4.png)
# Tổng kết
Thông qua bài này mình hi vọng sẽ giúp các bạn phần nào khi style checkbox theo design , không phải dùng style mặc đinh  .Trên đây là bài viết ngắn mình muốn giới thiệu cho mọi người 1 số tính năng khá hữu dụng khi kết hợp giữa HTML và CSS(CSS3). Xin cảm ơn mọi người đã đọc bài viết. 

# Tài liệu Tham khảo
https://codepen.io/bbodine1/pen/novBm