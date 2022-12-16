### Giới thiệu
Chào mọi nguời !
Hôm nay mình xin chia sẻ 1 techical nhỏ nhưng rất hữu ích khi tạo smooth scroll anchor link chỉ bằng CSS mà không cần dùng đến JS. Bình thường khi tạo anchor link scroll đến target hay page khác để sao cho muợt mà mọi người sẽ viết 1 đoạn JS đúng không nhỉ, nhưng chỉ với 1 dòng CSS sẽ giúp chúng ta tiết kiệm được nhiều thời gian và rất đơn giản.

### Cách làm
 Để làm được cái này chúng ta sẽ sử dụng CSS properties `scroll-behavior` và pseudo-class `:focus-within` vào thẻ HTML.
- `scroll-behavior`  : là 1 thuộc tính được set cho việc scroll ở trong 1 box khi 1 anchor nhận được 1 trigger scroll nó sẽ scroll tới target đó
Để hiểu hơn mọi người có thể vào đây và thao tác thử với ví dụ sẽ dễ hiểu hơn nhiều.
https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior
- `:focus-within`: để chỉ ra 1 element đã nhận được focus hay chứa các element trong đó đã nhận được focus
https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-within

Chúng ta sẽ viết dạng global cho toàn bộ element nằm trong thẻ HTML thì những element bên trong khi được scroll đến khi bấm vào anchor link sẽ có scroll khi nhận được focus

1.HTML
Với HTML chỉ cần seting đơn giản thế này.
```HTML
<a href="#content">Event</a>
````

```HTML
<div id="content">Event Area</a>
````

2.CSS
CSS chúng ta sẽ để giá trị cho `scroll-behavior` là `smooth` nhé.
<br>
```CSS
html:focus-within {
scroll-behavior: smooth;
}
```


### Lời kết
 Hi vọng tip nhỏ này sẽ giúp cho các bạn còn chưa biết đến có thể dễ dàng tạo 1 nội dung điều dướng với anchor scroll một cách muợt mà , không cần sử dụng đến Javascript.