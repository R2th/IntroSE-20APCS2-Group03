![Intersection Observer - Javascript API cực hay mà bạn chưa từng nghe đến](https://images.viblo.asia/aae1d373-43b2-4848-83bd-fe0eff898d72.jpg)

Ngay từ thời IE9 hay những phiên bản Chrome đầu tiên, người ta đã có thể làm đủ thứ hay ho trên trang Web:
* **Lazy-load** các hình ảnh.
* **Tự động play/pause** video khi người dùng cuộn đến/cuộn khỏi video.
* **Animate-on-scroll** trên trang landing page.
* Hỗ trợ **infinite-scrolling** để người dùng có thể cuộn mãi mãi mà không phải click vào phần phân trang.

Mấu chốt của những tính năng này chính là nhờ "bộ đôi": `onscroll` event và `Element.getBoundingClientRect()`! Một thứ để phát hiện khoảnh khắc mà người dùng cuộn trang, cái còn lại thì giúp cho biết vị trí của phần tử trên trang.

Nhưng cách này có một **điểm trừ** lớn: **hiệu năng**! Các trình duyệt giờ đều có "cuộn mượt", cùng với smartphone cho phép vuốt bằng cảm ứng khiến cho event `onscroll` buộc phải bị trigger rất nhiều lần. Chỉ với một lần cuộn, trình duyệt có thể lên đến 60+ event `onscroll`. Cùng với đó, `Element.getBoundingClientRect()` lại phải thực thi hoàn toàn đồng bộ, và đều phải gọi để tính toán vị trí cho từng phần tử với từng event `onscroll` kể trên.

Sau bao nhiêu năm tiến bộ của thế giới Web, đây có còn là giải pháp tốt nhất?

# Giới thiệu về Intersection Observer API
Được cho một cái tên nghe hết sức "nguy hiểm", tuy nhiên thật ra bạn có thể hiểu về Intersection Observer API hết sức đơn giản:

> **Intersection Observer API** giúp bạn thực hiện một hành động khi phần tử bất kỳ bạn mong muốn được người dùng "cuộn" tới.

API này được làm ra chính xác để thay thế cách kiểm tra cũ bằng `onscroll` và `Element.getBoundingClientRect()`. Điều đáng nói ở đây là, đây là API hoàn toàn **bất đồng bộ**. Việc kiểm tra xem các phần tử có giao nhau không hoàn toàn được trình duyệt lo việc quản lý, tối ưu, và đặc biệt là công việc này được xử lý ở ngoài main thread. Vì được thực thi ở một thread độc lập nên **Intersection Observer API cho hiệu năng xuất sắc**, và không hề làm website của bạn chậm lại.

![Ví dụ về Intersection Observer API (Code hoạt động ở cuối bài)](https://images.viblo.asia/e56a93da-ea84-4296-9f25-2d4220c3cdda.gif)

# Tính tương thích
Bạn hoàn toàn không phải lo lắng về tính tương thích, trừ khi bạn buộc phải hỗ trợ trình duyệt Internet Explorer, bởi Intersection Observer API đã được **hỗ trợ bởi 100% các trình duyệt hiện đại**.

![CanIUse Intersection Observer API](https://images.viblo.asia/8925dd28-a9b7-4023-a639-89524c799cd4.png)

# Sử dụng
## Khái niệm bạn cần biết
Phần tử *target* ám chỉ phần tử mà bạn đang cần để kiểm tra việc giao nhau (ví dụ như một element ảnh).

Phần tử *root* thường là một phần tử cha của *target* và có thể cuộn được. Nhưng trong 99% trường hợp thì bạn sẽ muốn theo dõi giao nhau giữa target của bạn với *viewport* (khu vực hiển thị của trang Web trên trình duyệt). Nếu muốn vậy, bạn hãy đặt `null` làm phần tử root.

Lượng *intersection ratio* là tỷ lệ mà *target* và *root* giao nhau. Đây là con số thập phân từ 0 đến 1. Khi 2 phần tử không giao nhau, intersection ratio sẽ bằng 0. Khi *target* chỉ ló ra có một nửa thì ratio sẽ bằng 0.5. Và cuối cùng nếu *target* nằm hoàn toàn trong *root* thì ratio sẽ bằng 1.

Còn số *threshold* chính là tỷ lệ *intersection ratio* yêu cầu để callback được gọi đến. Mặc định, *threshold* sẽ được đặt bằng 0. Tức là chỉ một chút phần tử đó lọt vào trong viewport HOẶC khi phần tử đó biến mất hoàn toàn khỏi viewport, callback sẽ được gọi.

## Cùng thử *Intersection Observer API*
Bắt đầu với *Intersection Observer* thì cực kỳ đơn giản như thế này.

Đầu tiên, bạn khởi tạo một đối tượng `IntersectionObserver`:

```javascript
const observer = new IntersectionObserver(callback, {
  root: null,
  rootMargin: '0px',
  threshold: 0
})
```

Hoặc đơn giản hơn:

```javascript
const observer = new IntersectionObserver(callback)
```

Khi một phần tử được theo dõi nào đó đi qua `threshold` thì `callback` sẽ được gọi đến:

```javascript
let callback = (entries, observer) => {
  entries.forEach(entry => {
    entry.intersectionRatio // từ 0 đến 1
    entry.target // HTMLElement
  })
}
```

Cuối cùng, để bắt đầu theo dõi, bạn cần truyền đến `observer` đã tạo phía trên các phần tử cần theo dõi:

```javascript
const target = document.querySelector('#elem')
observer.observe(target)
```

## Ví dụ đơn giản
Dưới đây là ví dụ sử dụng *Intersection Observer API* để thay đổi màu nền các phần tử với `threshold` bằng 1:

```javascript
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio === 1) {
      entry.target.classList.add('bg-blue-600')
      entry.target.classList.remove('bg-gray-200')
    } else {
      entry.target.classList.remove('bg-blue-600')
      entry.target.classList.add('bg-gray-200')
    }
  })
}, {
  threshold: 1
})

const elements = document.querySelectorAll('.item')

elements.forEach(element => {
  observer.observe(element)
})
```

{@embed: https://codepen.io/tranxuanthang/pen/zYqqgxP}
# Tìm hiểu thêm ở đâu?
Đọc thêm tài liệu về [Intersection Observer API trên MDN](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) là cách tốt nhất để hiểu sâu hơn về API này.

Ngoài ra, nếu bạn cần làm những tính năng phổ biến như lazy-load hay animate-on-scroll, có thể đã có sẵn những thư viện tiện lợi sử dụng sẵn API này (và có luôn fallback về `Element.getBoundingClientRect()` khi cần thiết) như [Sal](https://github.com/mciastek/sal) hay [lazyload](https://github.com/tuupola/lazyload).

Vue và React cũng có những thư viện wrapper của API này ([react-intersection-observer](https://www.npmjs.com/package/react-intersection-observer) và [vue-intersect](https://www.npmjs.com/package/vue-intersect)) giúp bạn dễ dàng sử dụng Intersection Observer hơn.