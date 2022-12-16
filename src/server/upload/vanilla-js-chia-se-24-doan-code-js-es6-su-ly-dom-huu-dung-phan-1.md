Hello cả nhà. React, Vue hay Angular đang từng bước trở thành quy chuẩn làm việc Front-end rồi. Nhưng cũng có những trường hợp mà chúng ta phải sử dụng Vanilla JS hay gọi là Javascrip chay (tính chất dự án không cần thiết hoặc không sử dụng những front-end framework kể trên). Có thể sử dụng jQuery tuy nhiên không phải lúc nào jQuery cũng tốt (khiến website chậm chạp, cần những tác vụ đơn giản không cần thiết).

Bài viết này mình sẽ giới thiệu tới các bạn 24 đoạn code Vanilla JS xử lý DOM thông dụng, giải quyết những vấn đề mà có thể các bạn sẽ thường gặp khi làm việc. Bắt đầu nhé.

## 1. Ẩn đi những phần tử đặc biệt trên trang
```
const hide = (...el) => [...el].forEach(e => (e.style.display = 'none'));
```

Đoạn code này sẽ ẩn đi và bản chất là thêm **style="display: none"** cho tất cả những phần tử truyền vào. 
Ví dụ ẩn tất cả ảnh trên trang web:
```
hide(document.querySelectorAll('img')); // Hides all <img> elements on the page
```

## 2. Kiểm tra xem element có chứa một class nào đó không
```
const hasClass = (el, className) => el.classList.contains(className);
```

Đoạn code này nhận vào 2 giá trị: element và tên class cần kiểm tra, trả về dạng **booean** (true hoặc false)

Ví dụ kiểm tra một element p.specialcó chứa class .pecial hay không
```
hasClass(document.querySelector('p.special'), 'special'); // true
```

## 3. Togge (thêm & bớt) một class cho một element
```
const toggleClass = (el, className) => el.classList.toggle(className);
```

Đoạn code trên nhận vào 2 giá trị: element và tên class cần toggle (khi element không tồn tại class thì sẽ thêm vào, tồn tại rồi sẽ bỏ đi)

Ví dụ thêm bớt thẻ .**special** cho element **p.special**
```
toggleClass(document.querySelector('p.special'), 'special'); 
// The paragraph will not have the 'special' class anymore
```

## 4. Lấy ra vị trí cuộn của trang hiện tại
```
const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});
```

Đoạn code này sẽ trả về giá trị tọa độ **(x,y)** của trang hiện tại
Ví dụ:
```
getScrollPosition(); // {x: 0, y: 200}
```

## 5. Tạo hiệu ứng Scroll Top mượt mà
```
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};
```
Đoạn code định nghĩa một function scroll lên đầu trang một cách mềm mại 

Ví dụ:
```
scrollToTop();
```

## 6. Kiểm tra một element cha có chứa một element con hay không
```
const elementContains = (parent, child) => parent !== child && parent.contains(child);
```

Function nhận vào 2 tham số: Element cha và Element con, trả về giá trị theo kiểu **boolean** (true hoặc false)
Ví dụ:
```
// Examples
elementContains(document.querySelector('head'), document.querySelector('title')); 
// true
elementContains(document.querySelector('body'), document.querySelector('body')); // false
```

## 7. Kiểm tra một element có xuất hiện trong màn hình nhìn thấy (viewport) hay không
```
const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};
```
Function nhận vào 2 tham số: element cần kiểm tra và điều kiện partiallyVisible (chấp nhận chỉ nhìn thấy một phần hay không)
Ví dụ:
```
// Examples
elementIsVisibleInViewport(el); // (not fully visible)
elementIsVisibleInViewport(el, true); // (partially visible)
```

## 8. Lấy ra tất cả hình ảnh trong một element
```
const getImages = (el, includeDuplicates = false) => {
  const images = [...el.getElementsByTagName('img')].map(img => img.getAttribute('src'));
  return includeDuplicates ? images : [...new Set(images)];
};
```
Function này nhận vào 2 tham số: element cần lấy ảnh và includeDuplicates (chấp nhận lấy ảnh trùng nhau hay không)
Ví dụ lấy ra tất cả hình ảnh trong document
```
// Examples
getImages(document, true); // ['image1.jpg', 'image2.png', 'image1.png', '...']
getImages(document, false); // ['image1.jpg', 'image2.png', '...']
```

## Còn nữa ...

Còn phần 2 và 3 với ví dụ thực tế nữa, bạn nào quan tâm follow để mình viết bài nha :3