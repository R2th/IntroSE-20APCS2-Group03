**CSS Position Sticky** đã được hỗ trợ trên hầu hết các trình duyệt (trừ IE và Opera Mini). Tuy nhiên, nó vẫn chưa được nhiều developer sử dụng. Một phần vì phải chờ quá lâu để tính năng này đuợc hỗ trợ trên các trình duyệt và khiến nó bị lãng quên. Một phần vì phần lớn developer vẫn chưa hiểu rõ về cách thức hoạt động của tính năng này. Vậy nên trong bài viết này mình sẽ giới thiệu cho các bạn về thuộc tính **Position Sticky** trong CSS.

Như chúng ta đã biết, thuộc tính Position có 4 giá trị chính mà chúng ta hay dùng đó là: `static`, `relative`, `absolute` và `fixed`.

Sự khác biệt chính giữa `static / relative` và `absolute / fixed` là không gian mà chúng chiếm trong website. Cụ thể hơn, Postion `static` và `relative` sẽ giữ lại không gian tự nhiên của phần tử trên website, còn `absolute` và `fixed` sẽ loại bỏ không gian vốn có của phần tử đi và khiến chúng nằm trôi nổi trên các phần tử khác.

Và **Position Sticky** cũng tương tự như 4 giá trị trên, nhưng nó lại khác về cách thức hoạt động. Mình sẽ giải thích thêm ở dưới ;)

## Ví dụ đầu tiên về Position Sticky
Ở ví dụ đầu tiên với **Position Sticky**, chúng ta có thể nhanh chóng nhận ra rằng phần tử sẽ stick lại khi chúng ta scroll đến vị trí của phần tử này.

```css
.some-element {
  position: sticky;
  top: 0;
} 
```

Vấn đề là có lúc nó hoạt động, nhưng có những lúc thì lại không. Khi nó hoạt động thì phần tử được stick lại, nhưng đôi lúc nó lại không được stick lại khi scroll. Đối với những ai mà làm việc với CSS nhiều thì khó có thể chấp nhận được, vì vậy mình quyết định tìm hiểu sâu hơn về **Position Sticky**.

## Tìm hiểu về Sticky
Trong quá trình tìm hiểu về nó, mình đã nhận thấy rằng khi một phần tử với style là `position: sticky` được đặt trong một phần tử khác được gọi là **container** và trong **container** chỉ có một phần tử sticky mà chúng ta khởi tạo dưới đây, thì phần tử này sẽ không được stick lại.

```html
<!-- DOESN'T WORK!!! -->
<style>
  .sticky {
    position: sticky;
    top: 0;
  }
</style>
<div class="wrapper">
  <div class="sticky">
    SOME CONTENT
  </div>
</div>
```

Tuy nhiên, khi chúng ta thêm một vài phần tử vào trong phần tử **container**, thì nó mới thực sự hoạt động. Đó là vì khi một phần tử được set style là `position: sticky`, thì phần tử cha liền kề của nó (tức là **container** trong ví dụ trên) là một vùng mà phần tử sticky có thể hoạt động được, còn nằm ngoài vùng đó phần tử sticky sẽ không hoạt động. Trong phần tử cha không có bất cứ phần tử con nào để nằm nổi lên vì nó chỉ có một phần tử con duy nhất và phần tử con này lại chính là phần tử Sticky.

## Position Sticky hoạt động như thế nào?
**CSS position sticky** có 2 thành phần chính, đó là **sticky item** và **sticky container**.

**Sticky item** là một phần tử mà chúng ta định nghĩa style cho nó là `position: sticky`. Phần tử này sẽ nằm trôi nổi trên màn hình dựa trên vị trí mà chúng ta định nghĩa: Ví dụ: `top: 0px` hay `bottom: 0px`.

```css
.some-component {
  position: sticky;
  top: 0px;
}
```

**Sticky container** là một phần tử HTML chứa các phần tử sticky bên trong. Đây là một vùng giới hạn mà các phần tử sticky bên trong được phép hoạt động. Khi bạn định nghĩa một phần tử với `position: sticky` thì lúc đó bạn đang tự động định nghĩa phần tử cha là một **sticky container**. Điều này rất quan trọng, **container** là một phạm vi mà các **sticky item** bên trong không thể vượt ra bên ngoài nó.

Đây là lý do tại sao ở trong ví dụ trên, sticky item không hoạt động vì nó là **sticky item** duy nhất nằm trong **container**.

Ví dụ về Position Sticky:

![](https://images.viblo.asia/c6f2e8e9-270f-480e-9f35-d68f94e2a399.png)

{@embed: https://codepen.io/hoanganhcao/pen/RwbaEJd}

Như mình đã nói ở đầu bài viết, CSS Position Sticky hoạt động khác với các giá trị position khác. Tuy nhiên, nó cũng có một số điểm tương đồng với chúng. Hãy để mình giải thích:

**Relative (hoặc Static)** - Position Sticky khá giống với 2 giá trị này, bởi vì nó vẫn giữ một khoảng cách tự nhiên trong DOM.

**Fixed** - khi phần tử sticky được stick lại, thì nó hoạt động như một phần tử fixed và nằm nổi lên trên các phần tử khác, đồng thời nó cũng bị xoá khỏi flow.

**Absolute** - ở cuối của phạm vi container, phần tử sẽ dừng lại và xếp chồng lên trên các phần tử khác, khá giống với `position: absolute`

## Hỗ trợ trình duyệt
* Position Sticky đã được hỗ trợ trên các trình duyệt phổ biến hiện nay, trừ IE và Opera Mini.
* Đối với trình duyệt Safari chúng ta sẽ cần thêm `-webkit` prefix.

```css
position: -webkit-sticky; /* Safari */
position: sticky;
```

![](https://images.viblo.asia/7ff49400-d14e-4ffa-b961-7956e65eb630.png)

-----
***Tài liệu tham khảo:** https://medium.com/@elad/css-position-sticky-how-it-really-works-54cd01dc2d46*