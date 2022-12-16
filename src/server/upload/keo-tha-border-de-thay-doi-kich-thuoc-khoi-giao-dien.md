# Giới thiệu
Điều đầu tiên mọi người nghĩ đến khi xử lí những vấn đề kiểu như vậy là sẽ thử tìm xem có thư viện nào đơn giản mà mượt mà, và rồi "bùm" chỉ cần gõ npm install ... hay copy source trên github về import vào code. 

Mình cũng đã từng như vậy, tuy nhiên tìm một hồi vẫn không thấy có lib/pack nào ưng ý cả nên đã quyết định tự code cho dễ controll =))

Một giao diện có nhiều khung nhìn chứa nhiều nội dung thay đổi với kích thước nội dung không lường trước là một vấn đề cần có giải pháp linh hoạt phía client. 

Không ai muốn phần view mình focus và lại bị fix cứng kích thước trong khi chỗ khác có thể vẫn còn trống hoác cả. Nên qua bài viết này mình sẽ đưa ra 1 hướng giải quyết cho điều này.
# Chuẩn bị và những lưu ý
- Một khối giao diện ( bằng thẻ div chẳng hạn)
- Đảm bảo rằng đường viền (border) của nó đủ lớn (dày khoảng 5px là thoải mái rồi) để thao tác trở nên mượt mà, mặc định đường viền chỉ dày 1px nên focus chuột vào rất khó.
- Nếu đang để giá trị css cố định cho min-width, max-width thì lưu ý tránh miền độ rộng mà bạn muốn kéo nhả kích thước.
- Để test chức năng thì tốt nhất là bạn đừng nhét nó vào 1 giao diện quá phức tạp, bị ảnh hưởng  bởi z-index, position,... khi đã hiểu vấn đề rồi thì cứ thế mà triển thôi !
# Bắt tay vào code
## Khởi tạo một số biến toàn cục
```

    var minWidth = 400,    //độ rộng tối thiểu
    MARGINS = 3,    //ước lượng độ rộng border/2
    clicked = null,    // lưu trạng thái đánh dấu các cạnh được kéo thả, ở đây mình chỉ làm với cạnh phải. Các cạnh khác làm   tương tự
    onRightEdge = false,    // trạng thái cho cạnh phải
    container = null,    // khối giao diện
    pointerToEdge = 0,    // khoảng cách từ con trỏ đến cạnh trái
    redraw = false;    // flag để render lại độ rộng
```
## Trích xuất Dom muốn thao tác
```
    container = document.getElementById('container');
```
## Lắng nghe sự kiện
```
    container.addEventListener('mousedown', this.onMouseDown);    // lắng nghe sự kiện nhấn chuột
    document.addEventListener('mousemove', this.onMove);    // lắng nghe sự kiện kéo chuột
    document.addEventListener('mouseup', this.onUp);    // lắng nghe sự kiện nhả chuột
    this.animate();    // kiểm tra và vẽ lại liên tục, gọi ngay khi page của bạn sẵn sàng
```
Nếu muốn hoạt động trên mobile, sự kiện cần bắt như sau:
```
    container.addEventListener('touchstart', onMouseDown);
    document.addEventListener('touchmove', onMove);
    document.addEventListener('touchend', onUp);
    this.animate();
    //Tự thay tên function cho đẹp nhế
```
Việc bắt sự kiện gì cho DOM nào khá quan trọng, với mỗi sự kiện cần xác định được nó xảy ra khi focus vào vùng của DOM nào.
Như trên khi nhấn chuột/tay vào border thì vùng focus là container, nhưng khi di chuyển và nhả ra thì vùng thay đổi đến phải là document.
## Sự kiện onMouseDown
```
onMouseDown = (e) => {
    this.detect(e);   //Phát hiện, cập nhật trạng thái các cạnh

    clicked = {
      onRightEdge: onRightEdge,
    };

    e.preventDefault();   //đố biết cái này là gì đếy
  }
```
## Hàm phát hiện, cập nhật trạng thái các cạnh
Như đã nói, mình chỉ check cạnh phải, các cạnh khác làm tương tự !
```
detect(e) {
    let b = container.getBoundingClientRect();
    pointerToEdge = e.clientX - b.left;
    let realWidth = b.width - MARGINS;
    onRightEdge = pointerToEdge >= realWidth;
  }
```
## Sự kiện onMove
```
onMove = (e) => {
    this.detect(e);
    redraw = true;   //Khi di chuyển thì luôn cho phép vẽ lại giao diện
  }
```
## Sự kiện onUp
```
onUp = (e) => {
    clicked = null;   //Bỏ mọi trạng thái kéo thả của các cạnh, về mặc định.
    this.detect(e);
  }
```
## Hàm vẽ lại kích thước
```
animate = () => {
    requestAnimationFrame(this.animate);   //Cái này nó giống như setTimeOut với thời gian cực nhỏ, liên tục check

    if (!redraw) return;

    redraw = false;

    if (clicked) {
      let width = parseInt(container.style.width);
      if (clicked.onRightEdge) {
        if (Math.max(pointerToEdge, minWidth) > (window.innerWidth - 500 )) {  //Cho giới hạn độ rộng chứ không kéo tràn viền page
          container.style.width = (window.innerWidth - 500 ) + 'px';
        } else {
          container.style.width = Math.max(pointerToEdge, minWidth) + 'px';
        }
      }

      return;
    }
    
    //Thay đổi định dạng con trỏ khi tới cạnh phải
    if (onRightEdge) {
      container.style.cursor = 'ew-resize';
    } else {
      container.style.cursor = 'default';
    }
  }
```
# Kết
Bài viết khá đơn giản, ae mà cần trôn được thì khỏi cần tìm option của thư viện nha !