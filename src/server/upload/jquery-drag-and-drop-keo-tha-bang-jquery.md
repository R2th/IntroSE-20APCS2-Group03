# jQuery và jQuery UI
[jQuery](https://vi.wikipedia.org/wiki/JQuery) là một thư viện đa trình duyệt được xây dựng từ `JavaScript`, `Ajax`. Nó giúp đơn giản hóa và dễ dàng hơn để sử dụng các đối tượng `JavaScript` và phát triển ứng dụng `Ajax`. Điều này cho phép các nhà phát triển để tạo ra trừu tượng hóa ở mức độ thấp tương tác và hình ảnh động, hiệu ứng tiên tiến và vật dụng cao cấp, chủ đề có thể. Cách tiếp cận mô-đun để thư viện `jQuery` cho phép tạo ra các công cụ mạnh mẽ và năng động web và các ứng dụng web. 

`jQuery UI` (jquery user interface) là một là một phần mở rộng của `jQuery` giúp dễ dàng tạo ra các yếu tố giao diện người dùng gọn gàng cho các trang web, cung cấp những ứng dụng, widgets, theme...
# Kéo thả với draggable() và droppable() 
jQuery hỗ trợ nhà phát triển sử dụng kéo thả bằng các hàm draggable() và droppable(). Thật tuyệt vời nếu bạn có một giao diện nơi mà ở đó người dùng có thể tha hồ kéo thả, di chuyển... với các thành phần của trang web!

## Cấu hình
Bạn có thể sử dụng trực tiếp các thuộc tính của thẻ HTML và JavaScript để cấu hình kéo thả:
Như trong [w3schools](https://www.w3schools.com/htmL/tryit.asp?filename=tryhtml5_draganddrop)
các thuộc tính của thẻ như: draggable="true", ondrop, ondragstart, ondragover...
Nhưng ở đây mình sẽ cùng nhau sử dụng thư viện jQuery Ui có sẵn để được hỗ trợ và dễ dàng sử dụng hơn: Để sử dụng được jquery-ui chúng ta cần tải về thư viện hoặc đơn giản hơn là vào trang:
[developers.google.com](https://developers.google.com/speed/libraries/#jquery-ui) và copy snippet để vào trong code. Vậy là code của chúng ta đã sẵn sàng để sử dụng kéo thả!
## Code
Trước khi code chúng ta sẽ xem một kết quả mà có sử dụng kéo thả mà mình đã làm:

 ![ ](https://images.viblo.asia/2ab4743b-e7bf-4087-a175-efcd622cebf1.gif)
Nhìn thật tuyệt
 Và bây giờ bắt đầu code!
###  Đầu tiên là các thuộc tính của hàm để sử dung một cách hiệu quả
 
`Draggable`
|  thuộc tính| sử dụng |
| -------- | -------- |
| scroll     | Khi kéo ra khỏi độ lớn của khung chứa thì tự động scroll theo không? (`true`/`false`)      |
|axis| Quá trình kéo thả bị dính cứng theo chiều nào? `x` là ngang và `y` là dọc|
|containment| Giới hạn vùng di chuyển, là một thẻ `HTML` khai báo bằng selector hoặc `parent` để chỉ cha của đối tượng|
|revert|Khi di chuyển xong có tự động quay về vị trí cũ không?  (`true`/`false`) |
|helper| Cách kéo thả. `clone` là tạo ra một bản sao để di chuyển, mặc định là `orginal` |
|start|Bắt đầu di chuyển sẽ làm gì? (`tên Function sẽ được gọi`)|
|drag|Đang di chuyển sẽ làm gì? (`tên Function sẽ được gọi`)|
|stop|Kết thúc di chuyển sẽ làm gì? (`tên Function sẽ được gọi`)|
|disable| Bằng `true` thì không thể thao tác|

`Droppable`

|  thuộc tính| sử dụng |
| -------- | -------- |
| accept     | Khai báo các `element` được chấp nhận việc kéo thả lên `element` này. Khai báo bằng `selector`   |
|classes| thay đổi class tương ứng trạng thái khi một phần tử nằm trong danh sách accept đang di chuyển thì sẽ kích hoạt `active`. Khi phần tử đó trong phạm vi thì kích hoạt trạng thái `hover`|
|activate| Sự kiện xảy ra khi một phần tử trong danh sách `accept` bắt đầu `drag`|
|deacrivate|Sự kiện xảy ra khi một phần tử trong danh sách `accept` ngừng `drag` |
|over| Sự kiện xảy ra khi một phần tử di chuyển lên trên đối tượng|
|out|Sự kiện xảy ra khi một phần tử di chuyển ra ngoài đối tượng|
|drop|Sự kiện xảy ra khi một phần tử đã được di chuyển lên đối tượng và thả ra|
### Ví dụ
```
$( "#list" ).draggable({
    scroll: true,
    axis: "x",
    containment: "body",
    revert: true,
    helper: "clone",
    disable: false,
    start: function( event, ui ) {
            $(ui.item).addClass("active-draggable");
    },
    drag: function( event, ui ) {
    },
    stop:function( event, ui ) {
            $(ui.item).removeClass("active-draggable");
    }
});

$( "#container" ).droppable({
    accept: "#list",
    class: {
          "ui-droppable-active":"ac"
          "ui-droppable-hover":"hv"
    }
    acivate: function( event, ui ) {
            $(this).css('background','red');
    },
    over: function( event, ui ) {
            $(this).css('background','yellow");
    },
    out: function( event, ui ) {
            $(this).css('background','blue');
    },
    drop: function( event, ui ) {
            $(this).css('background','white');
    },
    deactivate: function( event, ui ) {
             $(ui.item).css('background','green');
    },
});
```

Vậy là các thẻ có id = "list" đã có thể được kéo và thả,
thẻ có id = "container" đã nhận sự kiện kéo thả của thẻ trên và ảnh hưởng đến nó.
# Tổng kết
Kéo thả là một cách tuyệt vời để lấy thêm sự thích thú của người dùng khi sử dụng trang web nên mong bài viết có thể giúp đỡ những người đang cần đến nó. Bài viết có tham khảo nguồn từ [Kênh Thư viện lập trình](https://www.youtube.com/watch?v=bVNg6n_3G8E)

Cảm ơn mọi người đã đọc bài viết của mình.