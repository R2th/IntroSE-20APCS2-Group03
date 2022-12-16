# Giới thiệu
Xin chào các bạn! Mình đã quay trở lại rồi đây.

Ở [phẩn 1](https://viblo.asia/p/xay-dung-thu-vien-javascript-cua-rieng-minh-xay-dung-thu-vien-crop-anh-maGK7jgM5j2) chúng ta đã chọn được ảnh, load được ảnh lên view và xoay ảnh đúng hướng. Trong phần 2 này chúng ta sẽ tạo các hàm thực hiện thao tác người dùng. Cụ thể là các hàm bắt sự kiện di chuyển chuột để di chuyển vị trí của ảnh, cuộn chuột để phóng to ảnh. Mình sẽ lưu tọa độ khung ảnh cần crop lại rồi dùng canvas để crop ảnh khi hàm `crop` được gọi đến hoặc người dùng `submit form`.

Việc đầu tiên các bạn hãy tải [chương trình của phần 1](https://github.com/HoangHoi/image-cropper/tree/viblo_post_1). Chúng ta sẽ viết tiếp vào chương trình này.

# Phân tích một chút

Khi ảnh được load vào view thì ta cần quan tâm 3 loại kích thước:

- Kích thước thật của ảnh
- Kích thước của vùng crop: chính là kích thước của thẻ `div` hiện ra. Kích thước này cố định và được quy định bởi `options` `width` và `height` khi khởi tạo instance crop.
- Kích thước ảnh khi hiển thị: đây là kích thước của ảnh lúc hiển thị trên view có thể lớn hơn hoặc nhỏ hơn kích thước thật của ảnh. Tỷ lệ kích thước hiển thị / kích thước thật mình sẽ biểu thị bằng số `zoom`. Số `zoom` thay đổi sẽ làm cho kích thước hiển thị to, nhỏ tùy ý.

Do mình không hiển thị toàn bộ ảnh ra nên vùng ảnh mình nhìn thấy chỉ là kích thước của vùng crop. Ảnh thực tế có thể sẽ to hơn và tràn ra ngoài vùng hiển thị.

Vị trí của ảnh cần phải lưu bao gồm các thuộc tính:

- Chiều rộng, chiều cao của ảnh khi hiển thị: `width`, `height`
- Tọa độ điểm đầu của vùng crop: `x`, `y`
- Tỷ lệ zoom của ảnh hiển thị so với ảnh gốc: `zoom`

Ảnh mình cho hiện ra là dạng **backgroundImage: url(background_link.jpg)** nên thao tác thay đổi vị trí, kích thước của ảnh trên view sẽ được thực hiện như sau:

- Thay đổi kích thước ta sẽ dùng thuộc tính **backgroundSize: 100px 100px**.
- Thay đổi vị trí của ảnh sẽ dùng 2 thuộc tính css: **backgroundPositionX: 50px** và **backgroundPositionY: 50px**.

# Khởi tạo thuộc tính
Ta hãy cho thêm các thuộc tính lưu trữ `position` vào trong `imageOptions`. Hàm `makeImageOptions()` sẽ được viết lại như sau:
```javascript
function makeImageOptions() {
    return {
        orientation: 1,
        originWidth: 0,
        originHeight: 0,
        zoomMin: 1,
        position: {
            x: 0,
            y: 0,
            zoom: 0,
            width: 0,
            height: 0
        }
    };
}
```

Khi load một ảnh lên ta phải khởi tạo giá trị vị trí để hiển thị ban đầu. Mình sẽ khởi tạo vị trí và kích thước ảnh ban đầu sao cho vừa khít với khung crop nhất. Giả sử khung crop hình vuông tức là khung có chiều cao (height) và chiều rộng (width) bằng nhau. Nếu ảnh có originWidth lớn hơn originHeight thì khi mình co lại width của ảnh bằng width của vùng crop thì height của ảnh sẽ dài hơn height của khung (giữ đúng tỷ lệ chiều dài và chiều cao). Như vậy khi hiển thị trên view ảnh sẽ lấp đầy vùng crop (vì width bằng nhau và height của ảnh dài hơn). Đây sẽ là tỷ lệ zoom nhỏ nhất mà mình sẽ cho phép người dùng `zoom`. `zoom` nhỏ hơn nữa thì sẽ dẫn đến ảnh thiếu và khi crop sẽ có vùng trắng. Đối với trường hợp originHeight lớn hơn originWidth cũng vậy. Tổng quát lại công thức của nó sẽ như sau: `originWidth/originHeight > viewWidth/viewHeight` thì `height = viewHeight` không thì `width = viewWidth`. Hàm `changeImage(instance)` mình sẽ cài đặt thuộc tính mặc định như sau:

```javascript
function changeImage(instance) {
    /*....................................*/
        instance.imageOptions.originWidth = width;
        instance.imageOptions.originHeight = height;

        var viewWidth = instance.options.width;
        var viewHeight = instance.options.height;

        if (width/height > viewWidth/viewHeight) {
            instance.imageOptions.position.height = viewHeight;
            instance.imageOptions.position.width = (viewHeight * width) / height;
        } else {
            instance.imageOptions.position.width = viewWidth;
            instance.imageOptions.position.height = (viewWidth * height) / width;
        }

        // Vị trí đầu của view sẽ là vị trí đầu tiên của ảnh
        instance.imageOptions.position.x = 0;
        instance.imageOptions.position.y = 0;
        
        // Zoom nhỏ nhất chính là tỷ lệ chiều rộng hiển thị chia cho chiều rộng thật của ảnh
        instance.imageOptions.zoomMin = instance.imageOptions.position.width / width;
        instance.imageOptions.position.zoom = instance.imageOptions.zoomMin;

        setImageToView(instance, canvas.toDataURL());
    /*................................*/
}
```

# Bắt sự kiện di chuyển chuột để di chuyển vị trí của ảnh
Đầu tiên ta phải có hàm `updateImagePosition(element, imagePosition)` để cài đặt vị trí cho `element`:

```javascript
function updateImagePosition(element, imagePosition) {
    element.style.backgroundPositionX = imagePosition.x + 'px';
    element.style.backgroundPositionY = imagePosition.y + 'px';
}
```

Thêm hàm `addResizeImageEvents` và `removeResizeImageEvents` cho `instance`. Khi file ảnh được thay đổi ta sẽ load file ảnh lên và sẽ chạy hàm `addResizeImageEvents` của instance để thêm các sự kiện chuột cho vùng hiển thị (kéo thả chuột để thay đổi vị trí, cuộn chuột để zoom). Khi mà người dùng không chọn ảnh tức là không có file trong instance thì tất nhiên ta phải chạy hàm `removeResizeImageEvents` để loại bỏ các thao tác chuột lên vùng hiển thị. Hai hàm này sẽ được mình thêm vào instance qua hàm `addMouseEventsToInstance(instance)`. Hàm `addEvents(instance)` sẽ chạy hàm `addMouseEventsToInstance(instance)` khi khởi tạo instance.

Chuột có rất nhiều sự kiện ứng với mỗi thao tác khác nhau. Với thao tác bấm nút chuột và kéo thì mình sẽ sử dụng sự kiện `mousemove` để thay đổi vị trí tọa độ của ảnh crop theo sự di chuyển của chuột. Nút ấn mình sẽ kiểm tra thông qua thuộc tính `buttons` của sự kiện.

Nói qua thuộc tính `buttons` một chút. Đây là thuộc tính có ở tất cả các sự kiện chuột. Nó biểu thị nút nào của chuột đang được nhấn. Giá trị của nó sẽ là tổng giá trị của mỗi nút được ấn. Giá trị của 3 nút cơ bản là:
- Nút trái được ấn: 1
- Nút phải được ấn: 2
- Nút giữa được ấn: 4

Nếu mà cả nút trái và nút phải được ấn thì giá trị của `buttons` sẽ là 1 + 2 = 3. Cách tính tương tự khi ta bấm 3 nút, 4 nút cùng 1 lúc.

Cụ thể mình sẽ viết hàm `handleMouseMoveEvent` như sau:

```javascript
function addMouseEventsToInstance(instance) {
    // Get thẻ div hiển thị view, chính là thẻ có backgroundImage: url(background_link.jpg)
    var element = document.getElementById(IC_VIEW_PREFIX + instance.inputId);
    // Đây là hàm thực hiện thay đổi vị trí của ảnh khi chuột di chuyển trên thẻ div hiển thị ảnh
    var handleMouseMoveEvent = function(event) {
        // Kiểm tra xem nút trái chuột có được bấm không.
        // Nếu không bấm có nghĩa là chuột chỉ lướt qua vùng hiển thị.
        // Ta sẽ không làm gì trong trường hợp không bấm nút trái
        if (event.buttons == 1) {
            // Lấy vị trí điểm đầu X, Y của ảnh nền vị trí lấy ra sẽ có dạng: 10.5px
            var positionX = element.style.backgroundPositionX;
            var positionY = element.style.backgroundPositionY;
            
            // Chuyển giá trị vị trí thành số và cộng thêm phần chuột di chuyển để ra vị trí mới
            var x = parseFloat(positionX) + event.movementX;
            var y = parseFloat(positionY) + event.movementY;

            var imageBoxWidth = instance.options.width;
            var imageBoxHeight = instance.options.height;

            // Tính toán 1 chút.
            // Nếu vị trí mới không vượt quá giới hạn của ô hiển thị thì thay đổi sang vị trí mới.
            // Nếu vị trí mới vượt quá giới hạn thì ta sẽ giữ nguyên vị trí cũ, không thay đổi.
            if (typeof x === 'number' && x <= 0 && x >= (imageBoxWidth - instance.imageOptions.position.width)) {
                instance.imageOptions.position.x = x;
            }

            if (typeof y === 'number' && y <= 0 && y >= (imageBoxHeight - instance.imageOptions.position.height)) {
                instance.imageOptions.position.y = y;
            }

            // Cập nhật vị trí trên view
            updateImagePosition(element, instance.imageOptions.position);
        }

        event.preventDefault();
    };

    instance.addResizeImageEvents = function () {
        // Lắng nghe sự kiện mousemove thực hiện hàm handleMouseMoveEvent, true có nghĩa là thực hiện bắt đầu lúc sự kiện xảy ra.
        // Nếu đặt là false thì sẽ thực hiện sau khi các Listener có giá trị là true thực hiện xong.
        element.addEventListener('mousemove', handleMouseMoveEvent, true);
    };

    instance.removeResizeImageEvents = function () {
        // Loại bỏ listener
        element.removeEventListener('mousemove', handleMouseMoveEvent, true);
    };
}
```

Hãy nhớ gọi hàm `addMouseEventsToInstance(instance);` trong `addEvents(instance)` nhé.

```javascript
function addEvents(instance) {
    addImageChangeEvents(instance);
    addMouseEventsToInstance(instance);
}
```

**Kết quả:**

![](https://images.viblo.asia/9ab549db-e151-488b-b108-b0630c3b1666.gif)

# Cuộn chuột để phóng to ảnh
Trong javascript sự kiện cuộn chuột là `wheel`. Chúng ta sẽ lắng nghe sự kiện này và thực hiện phóng to, thu nhỏ kích thước ảnh hiển thị. Thao tác phóng to ảnh mình làm sẽ không chỉ đơn thuần là cuộn chuột mà là ấn nút `ctr + cuộn chuột`. Bạn có thể thay đổi thành bấm phím `shift` hoặc `alt` cho nó đỡ trùng với phím tắt phóng to thu nhỏ của trình duyệt. 

Điều kiện khi zoom ở đây là không được nhỏ hơn `zoomMin` và sẽ không được lớn hơn một số mặc định được cài đặt sẵn (`zoomMax`). Và mỗi khi lăn con lăn chuột 1 cái mình sẽ quy định zoom thay đổi một đơn vị `zoomStep`. Tất cả các biến này mình sẽ đưa vào trong `options` của instance và lập trình viên có thể thay đổi được.

Thêm các thuộc tính cho `DEFAULT_OPTIONS`:

```javascript
const DEFAULT_OPTIONS = {
    width: 200,
    height: 200,
    zoomMax: 5,
    zoomStep: 0.1
};

// Đối với chuột của mình 1 khấc lăn của nó sẽ là 53 đơn vị
const WHEEL_STEP = 53;
```

Khi zoom lên hoặc xuống thì width và height hiển thị của ảnh sẽ thay đổi. Nếu giữ nguyên vị trí hiện tại thì ảnh sẽ bị xê dịch đi, rất xấu. Mình muốn khi phóng to thì vị trí ảnh ở giữa khung crop vẫn giữ nguyên. Để làm được vậy cần phải tính toán một chút. Bạn hãy xem hình vẽ sau:

![](https://images.viblo.asia/6b74e11e-2b72-4147-bce8-8c32836d9cd5.png)

Ban đầu tọa độ của tâm khung view so với ảnh là: X + viewWidth/2, Y + viewHeight/2. Sau khi kích thước ảnh thay đổi **n** lần thì tọa độ của tâm khung view cũng phải nhân với **n** lần. Như vậy tọa độ của điểm đầu khung view sẽ là `(X + viewWidth/2)*n - viewWidth/2`, `(Y + viewHeight/2)*n - viewHeight/2`. Đây chính là giá trị X và Y sau khi thay đổi. Vì ảnh sẽ bị thụt so với khung view nên giá trị này sẽ là âm.

Toàn bộ hàm `handleMouseScrollWheel` trong `addMouseEventsToInstance(instance)` sẽ được viết như sau:

```javascript
function addMouseEventsToInstance(instance) {
    /*.........................................*/
    var handleMouseScrollWheel = function(event) {
        // Kiểm tra nút bấm ctrl để thực hiện zoom
        if (event.ctrlKey) {
            // deltaY là số lượng cuộn dọc. Cuộn 1 khấc sẽ tốn WHEEL_STEP đơn vị.
            // Ta chia cho WHEEL_STEP để được số khấc rồi nhân với zoomStep để được số zoom được thêm
            var zoomDelta = (event.deltaY * instance.options.zoomStep) / WHEEL_STEP;
            
            // Cộng zoomDelta vào.
            // Thông thường khi lăn chuột kéo về lòng bàn tay chỉ số zoomDelta sẽ dương. Mình muốn thao tác đó là thu nhỏ thì sẽ trừ đi.
            // Ngược lại phóng to sẽ là đưa tay lăn từ trong lòng bàn tay ra ngoài.
            instance.imageOptions.position.zoom = instance.imageOptions.position.zoom - zoomDelta;
            
            // Sửa lại giá trị zoom sao cho không được nhỏ hơn zoomMin và không được lớn hơn zoomMax
            if (instance.imageOptions.position.zoom < instance.imageOptions.zoomMin) {
                instance.imageOptions.position.zoom = instance.imageOptions.zoomMin;
            }
            if (instance.imageOptions.position.zoom > instance.imageOptions.zoomMax) {
                instance.imageOptions.position.zoom = instance.imageOptions.zoomMax;
            }

            // Tính toán giá trị chiều rộng và chiều cao mới
            var newWidth = instance.imageOptions.originWidth * instance.imageOptions.position.zoom;
            var newHeight = instance.imageOptions.originHeight * instance.imageOptions.position.zoom;
            var boxWidth = instance.options.width;
            var boxHeight = instance.options.height;

            // Tính toán giá trị tọa độ điểm đầu vùng hiển thị sao cho điểm giữa không thay đổi khi kích thước ảnh thay đổi.
            instance.imageOptions.position.x = -((-instance.imageOptions.position.x + boxWidth/2) * (newWidth / instance.imageOptions.position.width) - boxHeight/2);
            instance.imageOptions.position.y = -((-instance.imageOptions.position.y + boxHeight/2) * (newHeight / instance.imageOptions.position.height) - boxHeight/2);
            instance.imageOptions.position.width = newWidth;
            instance.imageOptions.position.height = newHeight;

            // Sửa lại giá trị tọa độ sao cho ảnh không vượt quá vùng hiển thị.
            if (instance.imageOptions.position.x > 0) {
                instance.imageOptions.position.x = 0;
            }
            if (instance.imageOptions.position.x < (instance.options.width - instance.imageOptions.position.width)) {
                instance.imageOptions.position.x = (instance.options.width - instance.imageOptions.position.width);
            }
            if (instance.imageOptions.position.y > 0) {
                instance.imageOptions.position.y = 0;
            }
            if (instance.imageOptions.position.y < (instance.options.height - instance.imageOptions.position.height)) {
                instance.imageOptions.position.y = (instance.options.height - instance.imageOptions.position.height);
            }

            // Cập nhật vị trí và zoom lên view
            updateImagePosition(element, instance.imageOptions.position);
            updateImageSize(element, instance.imageOptions.position);

            event.preventDefault();
        }
    };
    /*.........................................*/
};
```

Đừng quên thêm các hàm lắng nghe và hủy lắng nghe sự kiện `wheel` nhé:

```javascript
    function addMouseEventsToInstance(instance) {
        /*................................*/
        instance.addResizeImageEvents = function () {
            element.addEventListener('mousemove', handleMouseMoveEvent, true);
            element.addEventListener('wheel', handleMouseScrollWheel, true);
        };

        instance.removeResizeImageEvents = function () {
            element.removeEventListener('mousemove', handleMouseMoveEvent, true);
            element.removeEventListener('wheel', handleMouseScrollWheel, true);
        };
    }
```

Kết quả:
![](https://images.viblo.asia/1dc75671-e876-4a68-88cb-a3177862be06.gif)

# Kết luận
Như vậy chúng ta đã bắt các sự kiện chuột để thực hiện thay đổi tọa độ cũng như kích thước của ảnh thành công.
Bài viết đã khá dài. Mình xin dừng lại tại đây. Bạn có thể tham khảo toàn bộ chương trình của phần 2 tại link https://github.com/HoangHoi/image-cropper/tree/viblo_post_2

Sang phần tiếp theo ta sẽ sử dụng canvas để crop ảnh và upload lên server. Server sẽ lưu lại và gửi trả về url ảnh được upload.