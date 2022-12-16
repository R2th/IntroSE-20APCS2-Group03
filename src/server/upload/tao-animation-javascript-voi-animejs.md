# Anime.js là gì?
Trang chủ: https://animejs.com/
- Anime.js là thư viện cho javascript rất nhẹ (Khoảng 14kb) để tạo các hiệu ứng animation với các api đơn giản nhưng rất mạnh mẽ, sử dụng các thuộc tính CSS, SVG, DOM attributes và JavaScript Objects.
# Tạo 1 animation đơn giản
## Anime
Anime cung cấp một API rất đơn giản để tạo animation cho các element. Đầu tiên ta sẽ tạo một đối tượng Anime:
```
const animeObject = anime({
  /* describe animation */
});
```
Ta có thể truyền các properties đơn giản để tạo animation vài anime vừa tạo như:
{
  /* Animation Targets: div, .box, #sky, etc... */
/* Animatable Properties: height, opacity, color, translateX, etc ... */
/* Property Parameters: duration, delay, easing, etc... */
/* Animation Properties: loop, direction, autoplay, etc... */
}
VD:
```
anime({
  targets: '#box',
  translateX: 200,
});
```
- Kết quả:
![](https://images.viblo.asia/e78a8948-a43b-4fd4-bdc1-5f2d01af74d7.gif)
Trong đó:
* targets chính là đối tượng sẽ áp dụng animation ở đây là #box (Element có id là box)
* Property Values: Giá trị của thuộc tính, ta có thể truyền 1 giá trị hoặc 1 mảng các giá trị như `translateX: [50, 200]` hoặc cả function như `(elm, index, t) => index * 2`
* Animation Properties: Các thuộc tính của animation như duration (mặc định là 1000ms) hay autoplay, loop,...
## Tạo animation cho nhiều element
Ta có tạo animation cho nhiều element cùng lúc như:
```
const boxesAnimation = anime({
  targets: '.js-box',
  translateX: (elm, index, t) => index * 50,
  scale: 2,
  easing: 'easeInOutSine',
  delay: (elm, index, t) => index * 20,
  duration: 1200,
  loop: true,
  direction: 'alternate',
});
```
Kết quả:
![](https://images.viblo.asia/28932cd9-e73b-4c17-9845-5bcbfb52b844.gif)
- Như trên, ta đã tạo animation cho 3 element có class là "js-box" và với các thuộc tính css là translateX và scale, và sử dụng easing function ở đây là easeInOutSine với các thuộc tính cho animation như delay, duration, loop.. 
- Với thuộc tính direction là alternate, animation sẽ thực hiện normal rồi reverse ( Ta cũng có thể chỉ set direction với giá trị chỉ normal hoặc reverse)
- Ở đây ta sử dụng function và sử dụng giá trị index để các thuộc tính css của các thẻ js-box khác nhau, như thẻ đầu tiên (index = 0) sẽ có thời gian delay là 0*20 = 0 còn element tiếp theo sẽ là 20ms
# Tổng kết
Trên đây chỉ là 1 phần rất nhỏ mà anime.js có thể làm được, còn rất nhiều tính năng khác mà các bạn có thể khám phá thêm. Trong những bài viết sau mình sẽ hướng dẫn sử dụng anime.js để tạo các animation phức tạp hơn.
Các bạn có thể tham khảo 1 số example của anime.js tại: https://codepen.io/collection/XLebem/
Link document: https://github.com/juliangarnier/anime