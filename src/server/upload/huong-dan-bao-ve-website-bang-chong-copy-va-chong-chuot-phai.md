**Hiện nay việc sao chép nội dung từ các trang Web khác về Website của mình mà không trích nguồn là trường hợp rất phổ biến tại Việt Nam. Trong bài viết này vncoder.vn sẽ hướng dẫn chi tiết cho các bạn về cách chặn copy và click chuột phải từ người dùng kết hợp sử dụng CSS và Javascript.**
## 1. Chặn Copy
Mình sẽ kết hợp cả 2 biện pháp là sử dụng CSS  với JavaScript. Bạn chỉ cần đưa đoạn code sau vào trước thẻ đóng </head> của mẫu HTML trang web của bạn là thành công:
```
<style>
body{
-webkit-touch-callout: none;
-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
-o-user-select: none;
user-select: none;
}
</style><script type=”text/JavaScript”>
function killCopy(e){
return false
}
function reEnable(){
return true
}
document.onselectstart=new Function (“return false”)
if (window.sidebar){
document.onmousedown=killCopy
document.onclick=reEnable
}
</script>
```
Ở trên là đoạn CSS3 chống copy; -webkit, -moz, -ms, -o là để tương thích với các trình duyệt khác nhau. Vì là CSS3 nên nếu trình duyệt nào chưa hỗ trợ đầy đủ. Thì nó không hoạt động, nghĩa là đối tượng vẫn copy được! Do vậy ta mới cần thêm JavaScript – cái này thì hoạt động tốt trên hầu hết trình duyệt.

Tuy nhiên JavaScript lại có điểm yếu là đối tượng có thể chủ động tắt JavaScript của trình duyệt để copy… Và đó là lý do ta nên kết hợp cả hai. Vì CSS thì đối tượng lại không thể tự tắt. Phối hợp cả 2 làm cho chúng bù lấp các điểm yếu của nhau
## 2. Chặn click chuột phải
Thêm tính năng chống thao tác chuột phải (hạn chế tình trạng sao chép ảnh và văn bản), thì đây là đoạn code… Vị trí thì vẫn thế, bạn cứ để nó trước thẻ đóng </head>.
```
<script language="JavaScript">
    window.onload = function() {
        document.addEventListener("contextmenu", function(e) {
            e.preventDefault();
        }, false);
        document.addEventListener("keydown", function(e) {
            //document.onkeydown = function(e) {
            // "I" key
            if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
                disabledEvent(e);
            }
            // "J" key
            if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
                disabledEvent(e);
            }
            // "S" key + macOS
            if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
                disabledEvent(e);
            }
            // "U" key
            if (e.ctrlKey && e.keyCode == 85) {
                disabledEvent(e);
            }
            // "F12" key
            if (event.keyCode == 123) {
                disabledEvent(e);
            }
        }, false);
 
        function disabledEvent(e) {
            if (e.stopPropagation) {
                e.stopPropagation();
            } else if (window.event) {
                window.event.cancelBubble = true;
            }
            e.preventDefault();
            return false;
        }
    };
</script>
```
Nguồn tham khảo: [VNCoder: Hướng chặn copy và click chuột phải từ người dùng sử dụng CSS kết hợp Javascript](https://vncoder.vn/bai-viet/css-javascript-huong-chan-copy-va-click-chuot-phai-tu-nguoi-dung-su-dung-css-ket-hop-javascript)