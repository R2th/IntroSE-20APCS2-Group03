## Tại sao phải dùng `scroll snap`

Câu trả lời cũng tương tự như câu hỏi 'Tại sao phải responsive ?', với nhu cầu sử dụng smartphone, tablet ngày càng nhiều thì mong muốn đáp ứng được điều này cũng là lẽ đương nhiên, kèm theo đó là UX - trải nghiệm người dùng cần được nâng lên. Ví dụ như, mọt galary hình ảnh, nếu hiển thị chiều dọc trên điện thoại thì người dùng phải scroll rất nhiều, điều đó khiến UX rất tệ và user sẽ không muốn xem phần bên dưới của trang web nữa, do vậy chúng ta phải tối ưu cho UX thật tốt.
![](https://images.viblo.asia/39447433-76af-454a-8b49-96d2581bf755.png)

## Scroll căn bản
Để tạo một `scrolling container`, thì chúng ta cần:

* Sử dụng `overflow-x: auto`
* Sắp xếp các phần tử thành 1 hàng

``` html
<div class="section">
  <div class="section__item">Item 1</div>
  <div class="section__item">Item 2</div>
  <div class="section__item">Item 3</div>
  <div class="section__item">Item 4</div>
  <div class="section__item">Item 5</div>
</div>
```

``` css
.section {
  white-space: nowrap;
  overflow-x: auto;
}
```

Đã từ lâu,chúng ta sử dụng `white-space: nowrap;` để sắp xếp các `element` thẳng hàng,tuy nhiên bây giờ chúng ta đã có một thứ hiện đại hơn, đó là `flexbox`;

``` css
.section {
  display: flex;
  overflow-x: auto;
}
```
![](https://images.viblo.asia/f1de04be-25a4-4dd2-8c43-9484b0247169.png){@embed: https://vimeo.com/557896183}

## Vấn đề scroll với `overflow`

Có một vấn đề chính là `scroll` với `overflow` có UX chưa tốt trên di động, để có một trải nghiệm mượt mà chúng ta cần một giải pháp tốt hơn, chi tiết tại sau `overflow` chưa tốt bạn có thể xem thêm video dưới:


## Về `scroll snap`

Để sử dụng `scroll snap` thì các phần tử bên trong `container` phải là `inline` \- thẳng trên 1 hàng\. Tái sự dụng phần code phía trên\, chúng ta cần bổ sung:

* Thêm thuộc tính `scroll-snap-type` vào `css` của `container`
* Thêm thuộc tính `scroll-snap-align` vào `css` của các `element` bên trong `container`

``` css
.section {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}
.section__item {
  scroll-snap-align: start;
}
```

Lúc này, việc scroll của bạn sẽ rất mượt mà, giống như là đang sử dụng `slick.js` vậy :)
{@embed: https://vimeo.com/557896650}

## Chi tiết

### `scroll-snap-type`

`scroll-snap-type` xác định kiểu `snap` cho `container` sẽ có kiểu scroll như thế nào và hướng ra sao:
Như đây là xác định hướng `scroll` của `container`

``` css
/* Chiều ngang */
.section {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x;
}
/* Chiều dọc */
.section {
  height: 250px;
  overflow-y: auto;
  scroll-snap-type: y;
}
```
![](https://images.viblo.asia/64f60b76-6180-497b-97fd-5d65b7d4ad7a.png)

Còn đây là khi chúng ta cần chọn `kiểu scroll`, giá trị `default` sẽ là `proximity` tuy nhiên sẽ không đẹp cho lắm, mình ưu tiên sử dụng `mandatory` hơn

* **proximity**: là giá trị `default`, trình duyệt sẽ `snap` theo các điểm mặc định mà trình duyệt đã tính toán.
* **mandatory**: trình duyệt sẽ `snap` theo từng điểm `scroll`, giả sử `scroll-snap-align` là `start` thì trình duyệt sẽ `scroll` theo hướng bắt đầu của `container`
![](https://images.viblo.asia/5dbb9bea-4aad-400f-aa66-f3a9bedef9ed.png)

### `scroll snapping alignment`

Hơi khó giải thích đối với thuộc tính này, có thể hiểu rằng chúng ta sẽ canh ví trị các `element` bên trong `container` khi `scroll`
![](https://images.viblo.asia/024143bd-9f1c-4af6-aa3b-e5c6cf8d8afd.png)
![](https://images.viblo.asia/6c6145bf-cc11-4933-937e-41858a2458a2.png)

### `scroll-snap-stop`
Thuộc tính này giúp tối ưu UX hơn khi chúng ta `scroll container` quá nhanh
- normal: giá trị `default` cho phép `user` lướt nhanh qua `container`
- always: khi lướt nhanh qua `container`, `container` sẽ dừng ở từng `element`

{@embed: https://vimeo.com/557897813}
### ` scroll-padding`
Tương tự như `padding`, được dùng để set `padding` giữa `element` bên trong và `container`
![](https://images.viblo.asia/1e879654-8916-4a85-bdb3-4e67bd9193c1.png)
![](https://images.viblo.asia/1d2482af-bf1e-4614-ad32-cc84928df96f.png)

### Lưu ý:
Không nên sử dụng `scoll snap` bừa bãi, chỉ nên sử dụng với `layout` với dạng `list`, scroll ngang
### `scroll-margin`
dùng để set `margin` giữa các `element` trong `container` ![](https://images.viblo.asia/21073500-3501-40d1-8fb7-90c08716d535.png)

## Một vài ví dụ khác
### Images List
{@embed: https://codepen.io/shadeed/pen/jOMrxYO}
### Avatars List
{@embed: https://codepen.io/shadeed/pen/KKgMJWa}
### Full Height Sections
{@embed: https://codepen.io/shadeed/pen/oNzLMZj}

## Tham khảo:
[ishadeed](https://ishadeed.com/article/css-scroll-snap/)