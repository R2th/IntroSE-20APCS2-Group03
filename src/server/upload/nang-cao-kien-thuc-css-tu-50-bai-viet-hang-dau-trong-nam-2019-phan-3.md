## Giới thiệu
Trong phần 2 của bài viết chúng ta đã cũng nhau khám phá những bài viết tiếp theo trong series [Nâng cao kiến thức CSS từ 50 bài viết hàng đầu](https://viblo.asia/p/nang-cao-kien-thuc-css-tu-50-bai-viet-hang-dau-trong-nam-2019-phan-1-OeVKBd6MlkW). Trong bài viết hôm nay chúng ta cùng nhau tìm hiểu tiếp nhé. Nếu bạn nào chưa xem phần 2 của series có thể xem tại

[Nâng cao kiến thức CSS từ 50 bài viết hàng đầu trong năm 2019 (Phần 2)](https://viblo.asia/p/nang-cao-kien-thuc-css-tu-50-bai-viet-hang-dau-trong-nam-2019-phan-2-63vKjVPyK2R)
## Lesson
1. [How to get better at writing CSS?](https://www.freecodecamp.org/news/how-to-get-better-at-writing-css-a1732c32a72f/?utm_source=mybridge&utm_medium=blog&utm_campaign=read_more)

- Tìm hiểu cách viết mã CSS tốt hơn

![](https://images.viblo.asia/91e6645d-f44c-400b-8ad7-2b0a936f7106.png)

2. [Pattern Library First: An Approach For Managing CSS.](https://www.smashingmagazine.com/2018/07/pattern-library-first-css/?utm_source=mybridge&utm_medium=blog&utm_campaign=read_more)

- Tìm hiểu các quản lý code CSS

![](https://images.viblo.asia/a6937c0d-1a47-4124-a650-473a0b362e86.png)

3. [4 CSS tricks I’ve learnt the hard way.](https://itnext.io/4-css-tricks-ive-learnt-the-hard-way-aab1e7e8ff44?utm_source=mybridge&utm_medium=blog&utm_campaign=read_more&gi=539ee578bf07)

- 4 thủ thuật CSS hữu ích

![](https://images.viblo.asia/4f867ac2-6c9f-4110-a82b-b3f2a6cae2a3.jpeg)

5. [One CSS Trick You Didn’t Know About! ](https://www.youtube.com/watch?v=olE86OdKYQs)

- CSS tips hữu ích có thể bạn chưa biết

![](https://images.viblo.asia/64b71f8b-d351-409a-84fa-5c780a22a1bf.png)

## User Interface
1. [Drawing Images with CSS Gradients](https://css-tricks.com/drawing-images-with-css-gradients/)

- Tìm hiểu cách vẽ hình ảnh sử dụng CSS Gradients

![](https://images.viblo.asia/aff5e2b0-3eef-464c-a611-44756913c730.png)

2. [Learn Bulma in 5 minutes.](https://www.freecodecamp.org/news/learn-bulma-in-5-minutes-ec5188c53e83/?utm_source=mybridge&utm_medium=blog&utm_campaign=read_more)

- Tìm hiểu Bulma cơ bản trong 5 phút

![](https://images.viblo.asia/81dd38d4-b7ce-4e74-978b-53d8068294a5.png)

Bulma là một Framework CSS đơn giản, hiện đại được 1 số lập trình viên ưa thích hơn Bootstrap. Bulma nhẹ hơn Boostrap và có thiết kế tốt hơn.
##### Setup
Cài đặt Bulma vô cùng dễ dàng, có nhiều cách khác nhau như sử dụng NPM, tải về trực tiếp từ trang Document hoặc sử dụng CDN. Ở đây ví dụ chúng ta sử dụng link CDN. Điều này sẽ cho phép chúng ta sử dụng các `class` của Bulma. Bulma - một tập hợp các `class`.
```
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.2/css/bulma.min.css">
```

##### Modifiers
Đầu tiên, chúng ta nên tìm hiểu về modifier class. Tính năng này cho phép chúng ta thay thế style của bất kỳ phần tử nào trong Bulma. Chúng bắt đầu với `is-*` hoặc `has-*`, thay thế `*` bằng style mà bạn muốn. Để hiểu khái niệm này, chúng ta xét ví dụ về Button sau:
```
<button class="button">Click here</button>
```

Để có 1 button với style chung bình thường chúng ta sử dụng class `button` như trên. 

![](https://images.viblo.asia/3e52bdd1-eaff-46fb-b239-bf9ddc28a2b5.png)

Như chúng ta có thể thấy đây là một thiết kế phẳng như bên trên. Để thay đổi style của Button trên chúng ta sử dụng Bulma modifiers. Ở đây chúng ta sẽ style cho Button lớn hơn với border-radius và màu xanh lá cây.
```
<button class="button **is-large is-success is-rounded**">Click here</button>
```

![](https://images.viblo.asia/a432e088-71fe-4b05-9226-dfb84d1867f3.png)

Chúng ta cũng có thể sử dụng modifier để kiểm soát trạng thái của Button. Chúng ta thêm class `is-focused`

![](https://images.viblo.asia/72841eee-3e6a-4f1b-a187-b1f3a681ea4d.png)

Cuối cùng, chúng ta sử dụng `has-*` modifier. Chúng kiểm soát style bên trong phần tử. Ở đây chúng ta sẽ thêm class `has-text-weight-bold`

![](https://images.viblo.asia/8728e371-81c5-4409-b550-173fd3af24c4.png)

Ở đây, mình đưa ra 1 số ví dụ cơ bản. Các bạn có thể tìm hiểu sâu hơn tại [Document](https://bulma.io/documentation/elements/button/) của Bulma.

##### Columns
Hầu hết các Framework CSS đều có khái niệm columns để xây dựng Layout Website. Columns của Bulma dựa trên Flexbox do đó rất đơn giản để chúng ta kiểm soát Layout. Ví dụ dưới đây tạo 1 `row` với 4 `column`

```
<div class="columns">  
  <div class="column">First column</div>
  <div class="column">Second column</div>
  <div class="column">Third column</div>
  <div class="column">Fourth column</div>
</div>
```

Đầu tiên, chúng ta tạo container với thẻ `div` có class `columns` và các thẻ `div` con bên trong nó với class `column`.

![](https://images.viblo.asia/a6062ec3-4930-487a-9fcf-c9ce5397f2af.png)

Ở đây mình chỉ giới thiệu cơ bản về Framework Bulma. Bạn có thể lên trang Document của Bulma để tìm hiểu sâu hơn.

3. [CSS Border-Radius Can Do That? How to create very cool effects with a rarely used feature.](https://medium.com/9elements/css-border-radius-can-do-that-d46df1d013ae?utm_source=mybridge&utm_medium=blog&utm_campaign=read_more)

- Tạo các hình khối sử dụng CSS Border-radius

![](https://images.viblo.asia/32bbb5c6-39eb-4ff7-935d-fa0e6fc0c798.png)

4. [About making cards with CSS.](https://inclusive-components.design/cards/?utm_source=mybridge&utm_medium=blog&utm_campaign=read_more)

- Tìm hiểu cách tạo thẻ card trong CSS

![](https://images.viblo.asia/fe0e7ae1-d424-45c9-8ca3-304a75a57ed6.png)

5. [Dark theme in a day: Using a bunch of modern CSS to create a night mode for an app.](https://medium.com/@mwichary/dark-theme-in-a-day-3518dde2955a)

- Tìm hiểu cách tạo dark theme bằng CSS

![](https://images.viblo.asia/68c71b03-dd57-4768-bb8e-c61acbdd9b7f.png)

6. [Having fun with link hover effects.](https://css-tricks.com/having-fun-with-link-hover-effects/)

- Tạo các hiệu ứng hover link sử dụng CSS

![](https://images.viblo.asia/68a78d5a-fa95-43b8-804f-d5226fe8d541.png)

## Kết luận
Như vậy trong phần 3 bài viết này mình đã giới thiệu với các bạn các bài viết hàng đầu hướng dẫn các kỹ thuật liên quan đến CSS. Hẹn gặp lại các bạn ở phần tiếp theo nhé.

**Bài viết tham khảo:** https://medium.mybridge.co/learn-css-from-top-50-articles-for-the-past-year-v-2019-4570d9da53c