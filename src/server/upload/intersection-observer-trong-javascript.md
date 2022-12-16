### Mở đầu

Bạn đã bao giờ nghe đến intersection observer hay sử dụng nó trong javascript chưa. Nếu chưa thì trong bài viết này mình sẽ giới thiệu đến các bạn intersection observer là gì và sử dụng nó với mục đích gì nhé. Nào hãy cùng mình tìm hiểu. 

### Ví dụ

Với Intersection Observer, chúng ta có thể lắng nghe sự thay đổi của một element trong viewport (vùng hiển thị trên màn hình).

Nếu bạn chưa hiểu chức năng này để làm gì thì cùng mình đến với ví dụ cụ thể sau. Chẳng hạn bạn muốn lazyload hình ảnh chỉ khi nào thanh scroll lăn đến khu vực chưa hình ảnh đó. Bạn có thể làm điều này bằng cách lắng nghe sự kiện scroll và check xem image đó đã nằm trong viewport hay chưa để load hình ảnh đó ra.

### Các bước để thực hiện

Các bước để thực hiện cũng rất đơn giản:
    - Tạo đối trượng Intersection Observer.
    - Gắn element cần lắng nghe sự kiện vào.
    
#### 1.  Tạo đối tượng Intersection Observer:

Đầu tiên là tạo Intersection Observer bằng cách:

```
function handler(entries, observer) {
  console.log(entries);
}

const config = {
  root: null,
  rootMargin: '0px',
  threshold: 1.0
};

const observer = new IntersectionObserver(handler, config);
```

Ở đây mình giải thích 1 chút về phần config. 
 - root: Là phần tử parent của element được lắng nghe. Ở đây mình đặt là null có nghĩa parent chính là document.
 - rootMargin: Margin sẽ được thêm vào root.
 - threshold: Phần này sẽ giới hạn lại mức độ gọi lại callback. Giá trị của nó nằm trong khoảng 0 - 1. Hoặc có thể là 1 mảng. Ví dụ:
         + `1`: Callback sẽ được gọi khi element hiển thị 100% trên viewport.
         + `0`: Callback sẽ được gọi ngay khi element vừa hiển thị được 1px trên viewport. Và đây cũng là giá trị mặc định nếu mình không config.
         + `0.5`: Cũng tương tự như các giá trị trên callback sẽ được gọi khi element hiển thị được 50% trên viewport.
         + `[0, 0.5, 1]`: Callback sẽ được gọi 3 lần vào lúc element hiển thị được 1px, 50% và 100% trên viewport.

Trong hàm callback handler thì có tham số entries đây chính là mảng các element được lắng nghe nếu chúng có thay đổi. Các entries này còn có thêm các thuốc tính để kiểm tra tình trạng xuất hiện của element đó:
  - entry.boundingClientRect
  - entry.intersectionRatio
  - entry.intersectionRect
  - entry.isIntersecting
  - entry.rootBounds
  - entry.target
  - entry.time

#### 2. Gắn element vào đối tượng Intersection Observer:

Ví dụ:

```
const image = document.getElementById('content_image');

observer.observe(image);
```

Sau khi đã lắng nghe sự kiện cho element image, thì callback sẽ được thực hiện ngay lập tức ngay cả khi nó không nằm trong viewport. Và sau đó nó sẽ được gọi lại khi nào element được hiển thị trong viewport.

Ngoài ra chúng ta có thể lắng nghe cho nhiều element cùng 1 lúc với cùng 1 đối tượng observer.

```
const images = document.querySelectorAll('.image');

images.forEach(image => {
    observer.observe(image);
});
```

#### 3. Cách hủy bỏ observer:

Khi chúng ta không muốn lắng nghe nữa thì có thể dùng các cách sau
- `observer.unobserver(element);` để hủy lắng nghe cho 1 element đã lắng nghe trước đó.
- `observer.disconnect();` để hủy lắng nghe cho tất cả cả element.

#### 4. Thực hành

Hãy đến với phần thực hành về intersection observer nào.
Ví dụ chúng ta muốn tự động play video khi chúng ta scroll đến video và pause khi chúng ta scroll qua video đó.

```
const video = document.getElementById('video');

function handler(entries) {
    const videoEntry = entries[0]; // we have only one entry
    if(videoEntry.isIntersecting) {
        video.play();
    } else {
        video.pause();
    }
}

const observer = new IntersectionObserver(handler, );
observer.observe(video);
```

Lần này chúng ta không cần config vì mình chỉ cần giá trí mặc định thôi.

### Tổng kết

Như vậy mình đã giớ thiệu cho các bạn biết về tác dụng của Intersection Observer, hy vọng nó có thể giúp ích được cho các bạn. Chúc các bạn làm việc và học tập hiệu quả :)))))