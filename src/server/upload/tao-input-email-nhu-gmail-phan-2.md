Bài viết này mình sẽ tiếp tục viết tiếp về cách tạo input nhập email giống như gmail. Các bạn có thể xem lại phần 1 tại [đây](https://viblo.asia/p/tao-input-email-nhu-gmail-phan-1-YWOZrgjvlQ0)
### Yêu cầu
Phần 2 này chúng ta sẽ làm tính năng thay đổi độ rộng của input khi gõ text, chọn email hoặc xóa email.
### Mã HTML
Phần này sẽ code javascript và mã HTML không có gì thay đổi so với P1
```html
<div class="wrap">
  <div class="row d-flex">
    <div class="row__label">To</div>
    <div class="input-gmail-container row__value">
      <input class="input-gmail" type="text" value="to@gmail.com,to2@gmail.com" placeholder="to" />
    </div>
  </div>
  <div class="row d-flex">
    <div class="row__label">Cc</div>
    <div class="input-gmail-container row__value">
      <input class="input-gmail" type="text" value="cc@test.com" placeholder="cc" />
    </div>
  </div>
  <div class="row d-flex">
    <div class="row__label">Bcc</div>
    <div class="input-gmail-container row__value">
      <input class="input-gmail" type="text" value="" placeholder="bcc" />
    </div>
  </div>
</div>
```
### Mã CSS (SCSS)
Chúng ta cần tạo thêm 1 **div** với class là **email-input__hidden** để tính width của input khi nhập text, vì thế sẽ thêm css của input đó:
```css
.wrap {
  width: 100%;
  font-size: 13px;
  line-height: 2;
  font-family: Arial,Helvetica Neue,Helvetica,sans-serif; 
  box-sizing: border-box;
  * {
    box-sizing: border-box;
  }
}

.d {
  &-flex {
    display: flex;
  }
  &-none {
    display: none;
  }
}

.row {
  border-bottom: 1px solid #ddd;
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0;
  }
  &__label {
    width: 25px;
  }
  &__value {
    width: calc(100% - 25px);
  }
}

.email {
  &-container {
    display: flex;
    flex-wrap: wrap;
  }
  &-item {
    white-space: nowrap;
    background-color: #f5f5f5;
    color: #222;
    height: 20px;
    line-height: 20px;
    border-radius: 3px;
    margin: 3px;
    padding: 0 5px;
    display: inline-block; 
    &--invalid {
      background: none;
    }
    &__value {
      .email-item--invalid & {
        border-bottom: 2px dotted #d14836;
      }
    } 
    &__remove {
      margin-left: 5px;
      opacity: 0.6;
      color: #333;
      cursor: pointer;
      &:hover {
        opacity: 1;
      }
    }
  }
  &-input {    
    &__field {
      min-width: 300px;
      resize: none;
      border: none;
      height: 26px;
      padding: 3px 5px;
      line-height: 20px;
      overflow: hidden;
      margin: 0;
      vertical-align: middle;
      display: inline-block;
      white-space: nowrap;
	    font-size: 13px;
      &:focus {
        outline: none;
      }
    }
    
    &__hidden {
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      visibility: hidden;
      white-space: nowrap;
      height: 26px;
      padding: 3px 5px;
      letter-spacing: 1px;
    }
  }
}
```
### Mã Javascript (jQuery)
Ở phần này chúng ta cần 1 function để tính toán lại width của **input** khi gõ text, chọn email, hoặc xóa email. Cụ thể width của **input** sẽ được tính bằng width của **container** trừ đi tổng width của list các **emails**. Nếu có nhiều email cần phải xuống dòng thì tổng width của list email sẽ là tổng width của các **emails** dòng cuối cùng.
Riêng khi gõ text chúng ta không tự cập nhật được width của **input** vì thế cần tạo một div **email-input__hidden** sẽ lấy giá trị của **input** này vào để tính toán chiều rộng.
```javascript
// Thêm div email-input__hidden - update lại function createHtml
function createHtml(obj, opt) {
    var emails = obj.val() ? obj.val().split(',') : [],
        emailList = '',
        emailsLength = emails.length;
    if (emailsLength > 0) {
      for(var i = 0; i< emailsLength; i++) {
        emailList += emailItem(emails[i]);
      }
    }
    var html = '<div class="email-container">'+emailList+
                  '<textarea class="email-input__field" placeholder="'+opt.placeholder+'"></textarea>'+
                  '<div class="email-input__hidden"></div>'+
                '</div>';
    obj.parents(opt.container).append(html);
};
  
function updateInputWidth(obj) {
    var emailContainer = obj.next('.email-container'),
        emailItems = emailContainer.find('.email-item'),
        inputField = emailContainer.find('.email-input__field'),
        inputHidden = emailContainer.find('.email-input__hidden'),
        hiddenWidth = inputHidden.outerWidth(),
        containerW = emailContainer.width(),
        emailsWidth = 0,
        emailTop = 0;

    // Tính toán tổng width emails list
    emailItems.each(function() {
      if ($(this).offset().top > emailTop) {
        // Nếu có nhiều dòng sẽ lấy tổng width của list email ở dòng cuối cùng  
        emailTop = $(this).offset().top;
        emailsWidth = 0;
      }
      // Mỗi email item + 6px margin.
      emailsWidth += $(this).outerWidth() + 6;
    });

    emailsWidth = emailsWidth % containerW;

    // Kiểm tra điều kiện để set width cho input.
    if (containerW - emailsWidth - hiddenWidth <= 0) {
      inputField.css({width: containerW});
    } else {
      inputField.css({width: containerW - emailsWidth});
    }
  };
```
Hãy gọi function **updateInputWidth** này khi khởi tạo, gõ text, chọn email hoặc xóa email.
### Kết quả
Kết quả của quá trình trên sẽ được như sau:
{@codepen: https://codepen.io/minhkhmt1k3/pen/bxZdew}