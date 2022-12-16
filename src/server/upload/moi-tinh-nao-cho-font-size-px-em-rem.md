## Đặt vấn đề
Chả là ở vương quốc Frontend, có nàng công chúa là `font-size`. Đã tới tuổi lên file lấy chồng nên nhà vua quyết định kén rể. <br/>
Qua báo cáo thống kê của vệ thần CSS thì sau vòng loại CV, 3 ứng cử viên sáng giá là hoàng tử của nước `Rems`, `Em` và `Pixel`.
Bối rối không biết chọn ai, Quốc vương quyết định tìm hiểu nguồn gốc của 3 hoàng tử để tìm được người xứng đáng :stuck_out_tongue:

## Chọn đơn vị nào là phù hợp nhất?
### px
Chàng `Pixel` là đơn vị đo dễ sử dụng nhất. <br/>
Tuy nhiên, chàng không đem lại trải nghiệm tốt cho người dùng. 
Khi nàng `font-size` nghe lời brouser (device) thay đổi size chữ thì `Pixel` vẫn giữ vững lập trường của mình. Không vì nàng `font-size` nhà ta mà thay đổi :cry:

> `px` may be good at spacing and layout but are not good fit for font-size. *(Dixita Ganatra)*

Trở lại với vấn đề về thiết kế, Pixel, nó có thể nghe tuyệt vời với layout hay với các bác Designer/Developer, nhưng người dùng thì không như vậy.
Dĩ nhiên, để khắc phục điều này, bạn vẫn có thể *Zoom in / Zoom out* trang web lên. :upside_down_face:

Song, liệu chúng ta có giải pháp tốt hơn ??

### em
> An `em` is equal to the computed font-size of that element’s parent.*(Dixita Ganatra)*

Chàng `em` lại không có chính kiến, rất nghe lời element "cha" mình: 
```
<div class="parent">
    <p class="child">...</p>
</div
```
```
<style>
   .parent { font-size: 16px; }   // 16px
   .child  { font-size: 2em }    // 2*16px = 32px
</style>
````

### rem

>`rem` values are relative to the root html *(Dixita Ganatra)*

Nếu `:root` chưa được khai báo giá trị `font-size` thì sẽ lấy giá trị mặc định của brouser.
```
:root {
    font-size: 10px;
}
```
Để đơn giản hóa tính toán, mình thường để `font-size` của root là 10px (=1rem), như vậy, 1.6rem = 16px. 

## Tổng kết

Qua đặc điểm của từng loại đơn vị, ta nhận ra không có đơn vị tốt hay không tốt, chỉ có đơn vị phù hợp hay là không thôi. <br/>
Chúng ta nên chọn chàng  `rem` hoặc `em` cho nàng `font-size`, khoảng cách *(margin, padding...)* thì `rem`, `px`, với các layouts như *menu, sub-menu* thì `em` là một gợi ý không tồi :smiley:
<br/>
<br/>
Còn bạn, đơn vị nào được bạn dùng project của mình, cùng chia sẻ phía dưới nhé :point_down::point_down:
<br/><br/>
*Nguồn tham khảo: Medium*