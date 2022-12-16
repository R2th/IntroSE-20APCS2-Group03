## Giới thiệu

Bạn muốn có một menu được gắn cố định khi ở, nhưng khi cuộn đến vị trí menu, nó sẽ dính luôn lên đầu trang và chạy theo trang? Vậy thì đây chính là thứ bạn cần!

Trong bài viết này, tôi sẽ hướng dẫn bạn làm một menu sticky đơn giản với sự hỗ trợ của jquery, nó có thể chạy trên hầu hết các web dùng jquery nên bạn có thể tái sử dụng rất dễ dàng (tức là không phải code lại ấy :laughing:)

## Bắt đầu nào!

Với trường hợp menu ở ngay trên đầu trang thì dễ rồi, bạn chỉ cần để css của nó là `position: fixed` rồi vã như bình thường là xong.

Ở bài này, tôi sẽ chỉ nói đến trường hợp menu cách cạnh trên màn hình một khoảng.

Có 2 vấn đề chính phải xử lý trong trường hợp này:

1. Khi nào đổi menu từ cố định sang `fixed` và ngược lại?
2. Khi đổi qua lại giữ cố định và `fixed`, trang sẽ bị giật nhẹ do vị trí menu trước đó biết mất hoặc ngược lại. Cần xử lý điều này thế nào?

### 1. Khi nào đổi menu từ cố định sang fixed và ngược lại?

Cái này dễ, bạn đo khoảng cách từ **đầu trang** đến menu: `sticky = menu.offset().top`

Rồi check nếu cuộn màn hình đến vị trị menu thì đổi nó qua sticky với `$(window).scrollTop() >= sticky`

Vị trí của màn hình cần được kiểu tra liên tục mỗi khi thay đổi bằng cách dùng `$(window).on('scroll', function () {});` của jquery

### 2. Xử lý giật trang khi đổi trạng thái

Trường hợp này thì bạn có thể đặt 1 tag bao ngoài cho menu, rồi gắn height bằng với menu. Cách này thì đối khi lỗi với trường hợp menu có dropdown.

Trong trường hợp của tôi, tôi sẽ dùng đẩy 1 tag với height bằng menu vào vị trị ngay dưới menu khi nó chuyển sang `fixed` và xoá nó đi khi nó đổi lại trạng thái bình thường. Một pha xử lý "cồng kềnh" nhưng đến giờ tôi vẫn thấy nó hiệu quá :laughing:

**Thêm tag:** `menu.after('<div id="just-for-height" style="height:' + menu.height() + 'px"></div>')`

**Xoá tag:** `$('#just-for-height').remove();`

## Hoàn thiện

Sau khi xử lý được 2 vấn đề lại thì chỉ còn lại việc đơn giản là đẩy cho nó 1 class và css theo vị trí đó.

**JS**
```
function sticky_menu(menu, sticky) {
    if (typeof sticky === 'undefined' || !jQuery.isNumeric(sticky)) sticky = 0;
    if ($(window).scrollTop() >= sticky) {
        if ($('#just-for-height').length === 0) {
            menu.after('<div id="just-for-height" style="height:' + menu.height() + 'px"></div>')
        }
        menu.addClass("sticky");
    } else {
        menu.removeClass("sticky");
        $('#just-for-height').remove();
    }
}

$(document).ready(function () {
    var menu = $("#menu-demo");
    if (menu.length) {
        var sticky = menu.offset().top + 1;
        if ($(window).width() > 767) {
            sticky_menu(menu, sticky);
            $(window).on('scroll', function () {
                sticky_menu(menu, sticky);
            });
        }
    }
});
```

**CSS**
```
.sticky {
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
  transition: all 1s;
}
```
*Chú ý:* 
+ Bạn cần kiểu tra element có tồn tại không với `menu.length` nếu không `menu.offset()` sẽ lỗi, làm js của bạn không thể chạy đc.
+ Function sticky_menu được gọi 2 lần, lần 1 để xử lý vị trị của menu khi khác F5 lại trang, lần 2 là xử lý khi cuộn trang. Có thể bạn đang nghĩ rằng đó là không cân thiết, nhưng khi người dùng cuộn xuống giữa trang và F5 lại, nếu không có function đầu tiên kia, menu sẽ **không** chuyển qua sticky cho đến khi họ cuộn trang dù đang ở giữa trang rồi. Với một số người khó tính, họ có thể bắt bạn sửa cái này cộng thêm cơ man là thứ khác kèm theo, tốt nhất là đánh phủ đầu trước cho chắc, bạn hiền ạ :laughing:
+ Demo trên, tôi làm menu chỉ chuyển qua sticky khi màn hình hiển thị lớn hơn 767px, tức là trên mobile, menu sẽ không đổi qua sticky nhé.

## Demo

{@embed: https://codepen.io/hungpv-2151/pen/MWaGgyQ}