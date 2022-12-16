Chào các bạn!

Bài viết hôm nay có thể là khá ngắn nhưng có lẽ sẽ có nhiều người gặp phải trường hợp này. Mới đây thôi, trong 1 dự án mình làm cũng gặp phải case này nên muốn chia sẻ cho các bạn cùng tham khảo.
Bài toán được đặt ra ở đây là như thế này:
- Page có 1 group tabs (4 tab nhỏ). Trong mỗi tab đều có slick carousel. Tất nhiên 3 carousel này chỉ sử dụng chung 1 class và gọi chung 1 lần trong file js là ok. 

```
$(document).ready(function(){
  $('.your-class').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3
  });
});
```

Về lý thuyết thì khi chạy ra ngoài page thì 3 carousels này sẽ chạy ok đúng không? Bởi class đúng, js gọi đúng rồi mà. Tuy nhiên, bạn có đoán được kết quả nó sẽ chạy ra như thế nào không? Xem hình bên dưới nhé

![alt](https://media4.giphy.com/media/pjpllZAZkMLffWYD8w/giphy.gif?cid=790b76112cd06bfd5aab68535dec126607533765de71afe5&rid=giphy.gif&ct=g)

Nếu là kết quả chính xác thì 2 carousel trong 2 tab Popular và Recommend đều phải hiển thị đúng và đủ 3 items như tab New vì khi gọi js mình đã set hiển thị là 3 item với option **slidesToShow: 3**.
Nhưng ở 2 tab Popular và Recommend lại chỉ có thể hiển thị được 1 item => Như vậy là đang sai.

Vậy lý do tại sao lại xảy ra lỗi như thế này? Và mình đã tìm ra nguyên nhân của nó như sau:

Trong tab của bootstrap thì chỉ có tab defaut active (thường là tab đầu tiên) là được set **display: block** tức là lúc này width của tab này đã được define, còn các tab còn lại thì bị ẩn bởi css **display: none**. 1 element khi set **display: none** thì không thể define width được cho nó.

Mà với slick thì sao? Slick chỉ chạy được khi element call đến nó phải có width. Giải thích một cách dễ hiểu hơn là: slick từ chối khởi tạo trên các tab không hoạt động - vì chúng (các tab không hoạt động) bao gồm thuộc tính display: none css. Kể cả khi bạn click sang tab mới gọi là tab B đi, lúc này bản thân tab B là display: block và đã được define width nhưng vì slick xác nhận tab B này ngay từ khi nó còn là tab ẩn nên dù nó có display: block thì slick cũng không chạy đúng được. 

Vậy giải pháp ở đây là gì để slick có thể chạy được trên các tab ẩn sau khi click vào các tab ẩn này? Lúc này, chúng ta cần sử đụng đoạn code như sau:

```
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  $('.your-class').slick('refresh');
})
```

Giải thích đoạn code trên một chút: Sau khi click vào các tab ẩn, lúc này các tab ẩn đó được active tương ứng với event **shown.bs.tab** thì cần refresh lại để slick có thể nhận diện được tab này. Đơn giản chỉ vậy thôi. 

*Các bạn có thể tìm hiểu thêm về các event của tab bootstrap tại đây:*
https://getbootstrap.com/docs/4.0/components/navs/#tabs

Ngoài việc sử dụng **refresh**, bạn cũng có thể sử dụng **setPosition**:

```
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  $('.your-class').slick('setPosition');
})
```

Quay trở lại với bài toán này thì chỉ cần xử lý đơn giản như vậy thôi. Và đây chính xác là cách mình sử dụng để có thể xử lý được trường hợp này. Các bạn có thể xem demo ở đây nhé.

{@embed: https://codepen.io/maiptn226/pen/PopqdGG}

Trong bài viết này mình chỉ tính đến trường hợp sử dụng [Slickjs](https://kenwheeler.github.io/slick/) vì mình hay sử dụng library này nhất. Còn các libray tương tự như Owl thì mình ít khi sử dụng hơn. 
Hi vọng bài viết ngắn này có thể hỗ trợ các bạn.

Cám ơn các bạn đã theo dõi!