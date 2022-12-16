# Giới thiệu
- Hầu hết các trang web hiện tại đều có sử dụng **popup** . POpup ngoài tác dụng hiện ra những thống báo chú ý, những yêu cầu cần xác nhận(comfirm) . Nó còn dùng cho show ra một số tiện ích như chi tiết sản phẩm, thanh toán... mà các lập trình viên không muốn chuyển từ page này sang page # ,vẫn có thể thấy được thông tin về những gì họ cần biết trong cung 1 page. 
- Và Bootstrap là một framework được rất nhiều lập trình viên yêu thích và sử dụng. Modal bootstrap là một component trong bootstraps cho phép hiện thị popup với kích thước và hiệu ứng tuỳ chỉnh

## Tạo popup với modal bootraps

- Bước 1:  Bạn vào link sau:  https://getbootstrap.com/docs/4.5/components/modal/
- Bước 2 đọc và di chuyển xuống phần **live demo**  copy đoạn code demo và cho vào page bạn cần sử dụng thế là xong

```html
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
      Launch demo modal
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
```
- Giải thích: Khi click vào button  **Launch demo modal** thì popup xuất hiện. Bạn để ý cho mình đoạn code sau  `data-toggle="modal" data-target="#exampleModal"`
- Trong đó: 
  - **data-target="#exampleModal"** là dùng để xác định popup nào được gọi (nếu có nhiều popup trên cùng trang), trong ví dụ trên là popup có id là #exampleModal
  - **data-toggle**="modal" là lệnh mở một Modal Popup trong Bootstrap
  
- Phần popup các bạn muốn show ra là đoạn code này :  Trong popup đó các bạn muốn thêm gì thì thêm hiện ứng ra sao tuỳ các bạn.

```html
<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
```

## Hướng dẫn làm Multiple Bootstrap Modals
- Multiple Bootstrap Modals là sao. Là sự xuất hiện của popup thứ2 hoặc 3 nằm trên popup đầu
- Rất đơn giản các bạn cũng làm Popup như bình thường và bạn muốn popup sau xuất hiện như thế nào cũng làm tao modal popup
- ví dụ: 
  
 ```html
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal2">Save changes</button> 
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="exampleModal2">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Are You Ok</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary">OK</button>
      </div>
    </div>
  </div>
</div>
```


-  Giải thích Khi bạn muốn modal thứ 2 xuất hiện bạn chỉ cần. cho data-target="id pop up bạn muốn show". ví dụ trên  **data-target="#exampleModal2"**
- Nhưng như thế chưa đủ. Khi hiện lên bạn sẽ thấy màu background overlay hiện ra đậm hơn. popup sau sẽ nằm tại popup đầu và nhìn như hình ảnh sau
- Để sửa những lỗi vậy, mình pải làm sao. Đơn giản thôi bạn chỉ cần sửa như sau:
+Tại html ở popup2: thêm class : modal-second

```html
<div class="modal fade  modal-second" id="exampleModal2"> 
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Are You Ok</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary">OK</button>
      </div>
    </div>
  </div>
</div>
```
+ tại css bạn thêm đoạn code sau:

```scss
.modal-second {
  z-index: 1052;
}

.modal-backdrop.fade {
  & + .modal-backdrop.fade {
    z-index: 1051;
  }
}
```

+ tại js bạn thêm đoạn code sau:

```js
$(document).on('hidden.bs.modal', function () {
      if ($('.modal:visible').length) {
        $('body').addClass('modal-open');
      }
    });
```

Thế là bạn đã hoàn thành modal multiple rồi.

## Hướng dẫn làm Step modal
- Step modal là sao:  là cùng 1 popup khi bạn click vào button này sẽ chuyển đến modal sau với nội dụng khác với nội dung ban đầu nh không muốn hiệu ứng xuất hiện modal của bootstrap.
- Đầu tiên bạn cứ tạo 1 popup modal như bình thường

```html
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal">
  <div class="modal-dialog">
    <div class="modal-content"
      <div class="modal-body">
         <div class="step js-steps-content" id="step1">
           <h4>Title step1</h4>
           <div class="d-flex">
               <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary js-step" data-show="step2">OK</button>
            </div>
         </div>
         <div class="step js-steps-content step-hide" id="step2">
           <h4>Title step2</h4>
           <div class="d-flex">
               <button type="button" class="btn btn-secondary js-step" data-show="step1">Cancel</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal">OK</button>
            </div>
         </div>
      </div>
    </div>
  </div>
</div>
```

- Sau đó sử dung css và js tạo hiệu ứng chuyển đổi sang popup #. Nhưng thật ra vẫn là trên cùng 1 popup

```css
.step-hide {
   display: none;
}
```

```js
$(document).on(click, '.js-step', function(e) {
      e.stopPropagation();
      var attrStep = $(this).attr('data-show');
      $(this).parents('.js-steps-content').hide();
      $(attrStep).show();
 });
```

## Kết Luận

- Mình đã hướng dẫn các bạn về cách xây dựng modal bootstrap, Multiple Bootstrap Modals và step Modal bootstrap. Các bạn thấy hay có thể áp dụng trong dự án hiện tại hoặc dự án tương lai. Và thấy có cách làm hay hơn các bạn có thể chia sẻ thêm ở phần comment