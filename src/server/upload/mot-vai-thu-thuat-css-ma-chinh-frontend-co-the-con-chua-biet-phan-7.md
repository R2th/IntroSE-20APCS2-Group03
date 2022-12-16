![Image from Internet](https://images.viblo.asia/2cede1b2-eff2-4c45-9f0c-e91608f0ebde.jpg)

Hello xin chào mọi người, mình đã trở lại và tiếp tục với phần 7 của series về [Một vài thủ thuật CSS mà chính Frontend có thể còn chưa biết](https://viblo.asia/s/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-bq5QL7RJlD8)

Bắt đầu thôi nào!

### 1. Text hiển thị theo chiều dọc dễ dàng với `writing-mode`

Nếu làm website cho ngôn ngữ Tiếng Nhật, Tiếng Trung hoặc Tiếng Hàn, đôi khi bạn hay gặp phải những layout kiểu như thế này:

{@codepen: https://codepen.io/tinhh/pen/pqevwj}

Đoạn code xử lý chính sẽ là:
```scss
.title-vertical {
  width: 15px;
  margin: auto;
}
```

Tuy nhiên, nếu chỗ text đấy là Tiếng Anh thì code sẽ work sai ngay, nếu làm đa ngữ Anh - Nhật thì buộc phải add thêm class và style lại như sau

{@codepen: https://codepen.io/tinhh/pen/qLrNoN}

Đoạn code xử lý chính sẽ là:

```scss
.title-vertical {
  width: 15px;
  margin: auto;
  transform: rotate(90deg);
  transform-origin: top left;
  height: 90px;
  position: relative;
  left: 18px;
}
 ```
 
 Còn rất nhiều bất cập ở đoạn code trên là việc khó maintain, dễ gặp lỗi nếu đoạn text dài thêm...
 
Nhưng rất may ta đã có vị cứu tinh là `writing-mode` chỉ cần 1 dòng code ta đã xử lý được hết bất cập ở trên. Có lẽ bạn đang lo lắng về khả năng support browsers của nó thì hãy ngó qua [CanIUse](https://caniuse.com/#feat=css-writing-mode) , thuộc tính này hầu như đã support ở hết các trình duyệt phổ biến rồi

{@codepen: https://codepen.io/tinhh/pen/GPWqbd}

Một chú ý nhỏ là set thêm `white-space: nowrap` đi cùng với `writing-mode: vertical-lr` để đảm bảo work đúng trên cả 2 ngôn ngữ Anh - Nhật nhé!

#### References:

+ https://css-tricks.com/almanac/properties/w/writing-mode/
+ https://www.w3.org/International/articles/vertical-text/
+ http://www.tipue.com/blog/css-writing-mode/

### 2. Khai phá sức mạnh của thuộc tính `background-image`

Ngoài việc `background-image` được biết đến nhiều nhất qua 2 trường hợp sử dụng là:

1. Đổ màu đa sắc với `background-image: linear-gradient(...)` hoặc `background-image: radial-gradient(...)`
2. Chèn ảnh `background-image: url(...)`

Nhưng khi kết hợp với tính năng **CSS Multiple Background**, thuộc tính `background-image` này thực sự làm nên nhiều thứ hay ho đến kỳ diệu, thử liệt kê lần lượt mà xem

#### Vẽ Shape (Hình dạng: Tròn, Tam Giác, Vuông)

Anh em Frontend thì chắc là không còn lạ gì với [article trên CSS Tricks](https://css-tricks.com/the-shapes-of-css/) đã hướng dẫn vẽ các loại shape chỉ bằng code CSS, không cần phải dùng hình và các thuộc tính được dùng trên đó chủ yếu là `width`, `height`, `border` kết hợp lại với nhau.

Và thay vì sử dụng nhiều dòng code trên kết hợp lại, chỉ cần sử dụng mỗi `background gradient` cũng có thể cover được. Tuy nhiên số lượng shape cover vẫn không đủ, vì nó vẫn có những giới hạn, chứ không phải là vô đối, thứ gì vẽ cũng được đâu :smile: 

{@codepen: https://codepen.io/yuanchuan/pen/vVRKRQ}

#### Vẽ Flag (Lá cờ)

Kết hợp thêm các thuộc tính CSS khác, `background gradient`còn được dùng vẽ được tất cả lá cờ các quốc gia trên thế giới với tiêu chí 1 `tag` là 1 lá cờ, tận dụng thêm 2 pseudo elements `:before` `:after` thì trong 1 `div` ta có được 3 elements, quá đủ để vẽ rồi :smiley: 

{@codepen: https://codepen.io/tinhh/pen/Ormzjo}

Còn nhiều flag ở đây nữa, mọi người vào lấy code mà sử dụng thôi: https://pixelastic.github.io/css-flags/

#### Vẽ Patterns Background

Từ patterns hơi khó giải thích Tiếng Việt, đại khái nó là những hình dạng như thế này:

{@codepen: https://codepen.io/tinhh/pen/PXmEEd}

Mình còn nhớ ngày xưa mỗi lần muốn tìm background đẹp cho website, mình hay lên trang [Subtle Patterns](https://www.toptal.com/designers/subtlepatterns/) . Vì nó là 1 image nhỏ add vào `background-image` và cho thêm `background-repeat: repeat` đổ full page nên rất nhẹ.

Nhưng giờ thì mình quên trang này rồi, chỉ vào mỗi trang [CSS3 Patterns](https://leaverou.github.io/css3patterns/) tìm thôi :hugs: 

> Với việc cố gắng tự làm khó mình bằng cách vẽ bằng code CSS `background gradient` mục đích cuối cùng mang lại là code ít hơn, performance tốt hơn, nhưng nói về việc scale, chỉnh sửa nó thì chưa chắc đã tốt hơn SVG. Nhưng qua đây mình cũng học được CSS `background gradient` nó làm được nhiều thứ rất hay, suy cho cùng thì nó vẫn có ích cho 1 vài trường hợp cần, chứ không phải là vẽ chơi đâu nha mọi người :smiley: 

#### References:

+ https://css-tricks.com/the-shapes-of-css/
+ https://codepen.io/yuanchuan/pen/vVRKRQ
+ https://pixelastic.github.io/css-flags/
+ https://leaverou.github.io/css3patterns/

### 3. Canh vị trí `background-position` từ hướng bottom, right theo 2 cách

Có những trường hợp `background-image` canh vị trí không chỉ đơn giản cố định là `top`, `right`, `bottom`, `left`, `center`.

Mà lại muốn canh vị trí theo:
+ Từ hướng `bottom` và cách `bottom` là `20px` 
+ Từ hướng `right` và cách `right` là `30px`

Ok, chúng ta sẽ có 2 cách làm ở đây:

**Cách 1:** Nếu sử dụng theo các `value` được cung cấp bởi `background-position` thì ta làm như sau:

```scss
background-position: bottom 20px right 30px;
```

{@codepen: https://codepen.io/tinhh/pen/OrmQeX}

**Cách 2:** Sử dụng `calc` cũng cho ta kết quả tương tự

```scss
background-position: calc(100% - 30px) calc(100% - 20px);
```

{@codepen: https://codepen.io/tinhh/pen/romdVZ}

#### References:

+ https://css-tricks.com/positioning-offset-background-images/
+ https://css-tricks.com/a-couple-of-use-cases-for-calc/

# Tổng kết

Hi vọng mọi người sẽ tăng thêm skill CSS với 3 tips trên.

Nếu thấy thích thì Upvote, thấy hay thì Clip bài này của mình nhé! ^^

P/s: Tiêu đề câu view thôi nhé! Anh em Frontend pro rồi đừng chém em ạ!