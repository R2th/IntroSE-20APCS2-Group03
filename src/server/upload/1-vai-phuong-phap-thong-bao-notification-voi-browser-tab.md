Các trang web và ứng dụng web có nội dung cập nhật thường xuyên phải tìm cách thu hút sự chú ý của người dùng để thông báo cho họ về các cập nhật, đặc biệt là tab nơi trang web hoặc ứng dụng đang hoạt động.

Có một vài mẫu phổ biến mà bạn sẽ thấy trong các trang web xã hội như Facebook, Twitter và LinkedIn, có khả năng nhận nội dung mới sau mỗi vài giây, chèn số liên quan vào tiêu đề trang hiển thị số lượng cập nhật mới trong tab. Mặt khác Trello  lại cho thấy một huy hiệu nhỏ màu đỏ trên favicon.

Dưới đây là 1 vài phương pháp giúp develop có thể sử dụng để thông báo notification với browser tab của trình duyệt web: 

1. Sử dụng Document Title:

    Chúng ta sẽ bắt đầu bằng cách thêm số lượng cập nhật mới vào tiêu đề trang, tương tự như cách Facebook và Twitter thực hiện.

    Trong một kịch bản thế giới thực, chúng tôi có thể truy xuất dữ liệu theo bất kỳ cách nào .Trong ví dụ dưới đây, chúng tôi gi1ả định rằng chúng tôi đã truy lục số lượng cập nhật và có sẵn dữ liệu để sử dụng trong JavaScript. 
    ```javasrcipt
   <script>
        var count = 0;
        var title = document.title;

        function changeTitle() {
            count++;
            var newTitle = '(' + count + ') ' + title;
            document.title = newTitle;
        }

        function newUpdate() {
            update = setInterval(changeTitle, 1000);
        }

        var docBody  = document.getElementById('site-body');
        docBody.onload = newUpdate;

        // Stop button
        function stop() {
        clearInterval(update);
        }
        var btnStop  = document.getElementById('stop');
        btnStop.onclick  = stop;

    </script>
    ```
    Hàm trên giả định rằng chúng ta cần kiểm tra các bản cập nhật mới mỗi 1000 mili giây (1 giây). Hàm của chúng ta, changeTitle (), sẽ liên tục chạy trong khoảng thời gian. Chúng tôi chạy chức năng này ngay sau khi trang được tải.

      ![](https://images.viblo.asia/5c604b12-0463-4e86-8b4f-b90f3327d68c.jpg)

2. Sử dụng Favicon 

    Bây giờ chúng ta sẽ thử phương pháp thứ hai, đó là thay đổi favicon như ứng dụng web Trello. Đối với điều này, chúng tôi sẽ cần phải chuẩn bị hai biến favicon, nơi biến thể thứ hai là thay thế mà chúng tôi sẽ hiển thị bất cứ khi nào chúng tôi nhận được bản cập nhật mới.
    ![](https://images.viblo.asia/ecaa613b-0e1f-41bc-8dbe-2ccf9e1bb200.jpg)
    
    Bắt đầu bằng cách liên kết favicon đầu tiên trong ứng dụng: 
    ```javascript
    <link id="favicon" rel="icon" href="img/favicon.gif?v3"/>
    ```
    
    Khai báo 1 biến lưu trữ favicon mới và sử dụng javascript để thay đổi lại :
    
    ```javascript
    var iconNew = 'img/favicon-dot.gif';
    function changeFavicon() {
        document.getElementById('favicon').href = iconNew;
    }
    function newUpdate() {
        update = setInterval(changeFavicon, 3000);
        setTimeout(function() { 
            clearInterval( update ); 
        }, 3100);
    }

    var docBody = document.getElementById('site-body');
    docBody.onload = newUpdate;
    ```
    ![](https://images.viblo.asia/21fa6d18-085c-4fcd-93d3-4293a84ff471.jpg)
    
    Lưu ý : Chrome ko hỗ trợ các favicon là ảnh GIF.
 
3. Sử dụng thư viện Favico.js

    Để kết thúc, chúng ta sẽ sử dụng một thư viện JavaScript có tên là Favico.js, được phát triển bởi Miroslav Magda. Thư viện cung cấp một API tiện dụng với nhiều tùy chọn để thay đổi favicon như hiển thị huy hiệu cùng với số lượng cập nhật tất cả cùng nhau.

    Để bắt đầu, sử dụng JavaScript, chúng tôi định nghĩa một cá thể Favico mới xác định vị trí huy hiệu, hoạt ảnh, màu nền cũng như màu văn bản.

    ```javascript
    
    var favicon = new Favico({
        position  :'up',
        animation :'popFade',
        bgColor   :'#dd2c00',
        textColor :'#fff0e2'
    });
    
    var num = 0;
    function generateNum() {
        num++;
        return num;
    }

    function showFaviconBadge() {
        var num = generateNum();
        favicon.badge(num); 
    }

    function newUpdate() {
        update = setInterval(showFaviconBadge, 2000);
    }

    var docBody  = document.getElementById('site-body');
    docBody.onload = newUpdate;
    ```