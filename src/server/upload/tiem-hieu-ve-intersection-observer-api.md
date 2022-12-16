Trước đây, để xác định một element có đang hiển thị trong vùng  nhìn không, hay là việc xem người dùng đang đọc nội dung này trong thời gian bao lâu là một điều vô cùng khó khăn .  Để phát triển trang web và lấy được dử liệu trên để sử lý một số chức năng hửu ích nhằm tăng trải nghiêm người dùng và đẩy cao tốc độ của trang web. Hôm nay chúng ta hảy cùng tiềm hiều về Intersection Observer API

## Intersection Observer API là gì?

Theo MDN
> 
> The Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.

Intersection Observer API cung cấp một cách để quan sát không đồng bộ các thay đổi trong giao diện với các ancestor element hay với các document’s viewport cấp cao.

(viewport: là một khung hình, có thể là một khu vực hình đa giác (thường là hình chữ nhật) trên màn hình mà bạn được nhìn thấy. Trong trình duyệt web, nó đề cập đến phần document mà người dùng đang nhìn thấy, cái hiển thị trong cửa sổ ứng dụng (hoặc trên màn hình nếu hiển thị ở dạng full screen). Các phần bên ngoài viewport là những thứ bạn không nhìn thấy, cho đến khi bạn scroll tới nó)

![](https://images.viblo.asia/f71fb8c9-99a9-41d4-9582-77742c93d3d8.PNG)

## Các tính năng được áp dụng

* Lazy-loading hình ảnh hay các thông tin khác khi trang được cuộn.
* Thực hiện “infinite scrolling” trang web, nơi mà càng ngày càng nhiều thông tin được tải về và hiển thị khi bạn cuộn để người dùng không phải lật qua các trang.
* Báo cáo về khả năng hiển thị của quảng cáo để tính toán doanh thu quảng cáo.
* Quyết định có thực hiện các tác vụ hoặc hoạt ảnh hay không dựa trên việc người dùng có nhìn thấy nó hay không.
* vv .......

## Cách sử dụng

```
var el = document.getElementById('#el');
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
      // TO DO
  });
}, options);
observer.observe(el)

else document.querySelector('#warning').style.display = 'block';
```
## Các ví dụ
 #### 1 . Lazyloading
{@embed: https://codepen.io/rpsthecoder/pen/pByZjR}

Ở ví dụ này, chúng ta sẽ lưu hình ảnh ở data-src

    <img src="600px-PlaceholderLC.png" data-src="https://images.unsplash.com/photo-1504272017915-32d1bd315a59?fit=crop&w=600&q=80">
và load hình ảnh từ data-src vào src khi scroll tới phần hình ảnh

```
if(!!window.IntersectionObserver){
    let observer = new IntersectionObserver((entries, observer) => { 
        // entries : Danh sách các đối tượng chúng ta theo dỏi
        entries.forEach(entry => {
        // Kiểm tra ảnh của chúng ta có trong vùng nhìn thấy không
        if(entry.isIntersecting){
                /* Lấy dử liệu từ data-src mà chúng ta đã gán trước đó sau đó gàn vào thuộc
                tính src của ảnh , lúc này thì ảnh mới bắt đầu tải về  * /
            entry.target.src = entry.target.dataset.src;
            observer.unobserve(entry.target);
        }
        });
    }, {rootMargin: "0px 0px -200px 0px"});
    document.querySelectorAll('img').forEach(img => { observer.observe(img) });
}
else document.querySelector('#warning').style.display = 'block';
```

Ở đây chúng ta có thể thấy một thuộc được cung cấp :
```
rootMargin: "0px 0px -200px 0px"
```
  Đây là thuôc tính có thể tạm hiểu là mở rộng hoặc thu hẹp phạm vi của phần tử mà chúng ta đang theo dỏi.Ở ví dụ trên chúng ta có thể thấy , việc load ảnh sẻ được thực thi khi chúng ta scoll cách vị trí hiện tại của ảnh 200px . Nêu chúng ta không sử dụng thuộc tính này việc load sẻ được thực thi ngay sau khi vị trí của ảnh đi vào viewport . Có thể sử dụng chúng với các giá trị tương tự như thuộc tính lề CSS, ví dụ: "10px 20px 30px 40px" (trên cùng, phải, dưới, trái).
  
 Ở đay tôi sẻ cung cấp cho các bạn một thuộc tính hử ích khác
 
```
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
      // TO DO
  });
}, {threshold: 1.0});
```


**threshold** :cho biết tỷ lệ phần trăm khả năng hiển thị của thành phần sẽ được thực hiện. Nếu bạn chỉ muốn phát hiện khi khả năng hiển thị vượt qua mốc 50%, bạn có thể sử dụng giá trị 0,5. 

![](https://images.viblo.asia/df719efe-36eb-4d0a-8244-6570bf72d6cc.PNG)
 #### 2 .  Infinite Scroll
 {@embed: https://codepen.io/shubochao/pen/NWPpQGG}

Phần HTML
```
<div id="root">
  <h1>Infinite Scroll with Intersection Observer API</h1>
  <p>Try to scroll me!</p>
  <div id="list"></div>
  <div id="list-end"></div>
</div>
```
Phần Js

```
// Interception Handler
const callback = (entries, observer) => {
  for (const entry of entries) {
    console.log(entry);
    // Load more articles;
    if (entry.isIntersecting) {
      if (articleCount < 10) {
        loadArticles();        
      } else {
        observer.unobserve(listEnd);
      }
    }
  }
}

// Observe the end of the list
const observer = new IntersectionObserver(callback, {
  threshold: 0,
});
observer.observe(listEnd);
```


## So sánh Intersection Observer và EventListener Scroll
Theo nhiều bài viết so sanh Intersection Observer cho một hiều năng tốt hơn ngoài ra sức mạnh của nó là ở tính linh hoạt và các chức năng tích hợp của nó. Các bạn củng có xem một số bài viết so sanh ở đây :

##### https://itnext.io/1v1-scroll-listener-vs-intersection-observers-469a26ab9eb6
##### https://medium.com/@cristinallamas/intersection-observer-vs-eventlistener-scroll-90aed9dc0e62

## Can I Use
![](https://images.viblo.asia/e3d5b4aa-92f6-4b7c-91a7-3e01128f935d.PNG)
## Kết luận
 Intersection Observer cung cấp những tính năng vượt trội , dúp sử lý những chức năng phức tạp một cách dể dàng hơn và cải thiện performance  . Thay thế  EventListener Scroll trong xử lý nhiều tác vụ, như là lazy load images, infinite scroll,... 
##  Tham khảo
* #### https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
* #### https://css-tricks.com/a-few-functional-uses-for-intersection-observer-to-know-when-an-element-is-in-view/
* #### https://www.smashingmagazine.com/2018/01/deferring-lazy-loading-intersection-observer-api/
* ####  https://medium.com/better-programming/understanding-intersection-observer-api-in-javascript-bb1bf04b8081