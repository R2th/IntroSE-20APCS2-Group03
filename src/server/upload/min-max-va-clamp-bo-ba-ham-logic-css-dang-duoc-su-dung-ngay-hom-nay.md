#### Hôm nay, chúng ta sẽ cùng nhau tìm hiểu cách kiểm soát kích thước các phần tử, duy trì khoảng cách thích hợp giữa chúng và triển khai định dạng phông chữ linh hoạt bằng cách sử dụng bộ 3 chức năng CSS tuyệt vời này nhé. 

*Với thiết kế responnsive đang phát triển và ngày càng đa dạng, bản thân CSS cũng không ngừng phát triển và cung cấp cho lập trình viên nhiều quyền kiểm soát hơn đối với sự thay đổi kích thước. Các hàm min(), max() và clamp(), hiện được hỗ trợ trong tất cả các trình duyệt hiện đại, là một trong những công cụ mới nhất trong việc làm cho các trang web và ứng dụng trở nên năng động và phản hồi nhanh hơn.*

*Đứng trước nhu cầu thiết kế responsive đang ngày càng phát triển và càng phong phú về sắc thái, bản thân CSS cũng nhanh chóng thích ứng và cung cấp cho lập trình viên thêm nhiều quyền kiểm soát sự căn chỉnh kích thước thành phần. Các hàm min(), max() và clamp() hiện đã được hỗ trợ trên tất cả các trình duyệt hiện đại và trở thành những công cụ đắc lực, mới mẻ trong việc tạo ra các ứng dụng, tran web năng động, phản hồi nhanh hơn nhiều. Chúng quả thực đã giúp lập trình viên rất nhiều trong việc thay đổi linh hoạt kích thước phần tử, kiểu chữ cũng như duy trì khoảng cách thích hợp trên ứng dụng.*

## I. Nền tảng
> Các hàm toán học, calc(), min(), max() và clamp() cho phép các biểu thức toán học với cộng (+), trừ (-), nhân (*) và chia (/) được sử dụng làm giá trị thành phần trong CSS.

Safari đi đầu trong việc [cung cấp](https://bugs.webkit.org/show_bug.cgi?id=167000) bộ chức năng hoàn chỉnh vào tháng 4 năm 2019, tiếp đó là Chromium vào cuối năm đó trong phiên bản 79 của mình. Và cho tới năm nay, từ phiên bản [Firefox 75](https://bugzilla.mozilla.org/show_bug.cgi?id=1519519),  chúng ta đã có thể sử dụng được toàn bộ các hàm hỗ trợ mạnh mẽ này!

![](https://images.viblo.asia/46ff1d47-8e1d-47b4-898f-b9df5ca89ece.png)

## II. Sử dụng

Bạn có thể sử dụng min(), max() và clamp() ở phía bên phải (bên giá trị) của bất kỳ biểu thức CSS nào miễn là nó có ý nghĩa phù hợp. Đối với min() và max(), bạn cần cung cấp danh sách đối số các giá trị và trình duyệt xác định giá trị nào là nhỏ nhất hoặc lớn nhất, tương ứng. Ví dụ: trong trường hợp: min (1rem, 50%, 10vw), trình duyệt sẽ tính toán đơn vị tương đối nào trong số các đơn vị tương đối này là nhỏ nhất và sử dụng giá trị đó làm giá trị thực của kết quả.

Để sử dụng clamp(), bạn hãy cung cấp ba giá trị: giá trị nhỏ nhất, giá trị lý tưởng (để tính toán) và giá trị lớn nhất.

Bất kỳ hàm nào ở trên đều có thể được sử dụng ở bất kỳ nơi nào cho phép `<length>`, `<frequency>`, `<angle>`, `<time>`, `<percentage>`, `<number>` hoặc `<integer>`. Bạn có thể sử dụng chúng một mình (tức là `font-size: max(0,5vw, 50%, 2rem)`), kết hợp với calc() (tức là `font-size: max(calc(0,5vw - 1em), 2rem)`), hoặc là gộp (tức là `font-size: max(min(0,5vw, 1em), 2rem))`.

> Khi sử dụng một phép tính bên trong hàm min(), max() hoặc clamp(), bạn có thể bỏ qua hàm calc(). Ví dụ: viết `font-size: max(calc(0.5vw - 1em), 2rem)` sẽ tương đương với `font-size: max(0.5vw - 1em, 2rem)`.

{@embed: https://www.youtube.com/watch?v=jBj3eSCi44Y}
*Video trên hiển thị cách hàm min() chọn một giá trị dựa trên danh sách các tùy chọn và cha của nó (hoặc bạn có thể xem code trên [Codepen](https://codepen.io/una/pen/rNeGNVL))*

{@embed: https://www.youtube.com/watch?v=ILqutToP3gE}
*Video trên hiển thị cách hàm max() chọn một giá trị dựa trên danh sách các tùy chọn và cha của nó (hoặc bạn có thể xem code trên [Codepen](https://codepen.io/una/pen/RwaZXqR))*

{@embed: https://www.youtube.com/watch?v=C_jryWbwLGA}
*Video trên hiển thị cách hàm clamp() chọn một giá trị dựa trên danh sách các tùy chọn và cha của nó (hoặc bạn có thể xem code trên [Codepen](https://codepen.io/una/pen/bGpoGdJ))*

### Tóm lại:
* `min(<value-list>)`: chọn giá trị nhỏ nhất (âm nhất) từ danh sách các biểu thức được phân tách bằng dấu phẩy
* `max(<value-list>)`: chọn giá trị lớn nhất (dương nhất) từ danh sách các biểu thức được phân tách bằng dấu phẩy
* `clamp(<min>, <ideal>, <max>)`: kẹp một giá trị giữa giới hạn trên và giới hạn dưới, dựa trên giá trị lý tưởng đã đặt

## III. Một số ví dụ hay
### 1. Độ rộng hoàn hảo

Theo [The Elements of Typographic Style](http://webtypography.net/2.1.2#:~:text=%E2%80%9CAnything%20from%2045%20to%2075,is%2040%20to%2050%20characters.%E2%80%9D) của Robert Bringhurst, "bất kỳ thứ gì từ 45 đến 75 ký tự được mọi người coi là độ dài dòng thỏa đáng cho một trang một cột được đặt trong một mặt văn bản có chân ở kích thước văn bản."

Để đảm bảo rằng các khối văn bản của bạn không hẹp hơn 45 ký tự hoặc rộng hơn 75 ký tự, hãy sử dụng clamp() và đơn vị ch ([ký tự nâng cao 0-width](https://developer.mozilla.org/en-US/docs/Web/CSS/length)):
```
p {
  width: clamp(45ch, 50%, 75ch);
}
```

Điều này cho phép trình duyệt xác định chiều rộng của đoạn văn. Nó sẽ đặt chiều rộng thành 50%, trừ khi 50% nhỏ hơn 45ch, lúc đó 45ch sẽ được chọn và ngược lại nếu 50% rộng hơn 75ch. Trong bản demo này, bản thân thẻ đang bị kẹp lại.

{@embed: https://www.youtube.com/watch?v=VKLfWjU-VGg}
*Video trên hiển thị cách sử dụng hàm clamp() để giới hạn chiều rộng tối thiểu và tối đa (hoặc bạn có thể xem code trên [Codepen](https://codepen.io/una/pen/QWyLxaL))*

Bạn cũng có thể thực hiện điều này chỉ với hàm min() hoặc max(). Nếu bạn muốn phần tử luôn có chiều rộng 50% và chiều rộng không vượt quá 75ch (tức là trên màn hình lớn hơn), hãy viết: `width: min(75ch, 50%);`. Về cơ bản, cách làm này đã đặt kích thước "tối đa" bằng cách sử dụng hàm min().

{@embed: https://www.youtube.com/watch?v=iFTxf08mkDs}
*Video trên hiển thị cách sử dụng hàm min() để đặt chiều rộng "tối đa"*

Tương tự, bạn có thể đảm bảo kích thước tối thiểu cho văn bản dễ đọc bằng cách sử dụng hàm max(). Điều này sẽ trông giống như: `width: max(45ch, 50%);`. Ở đây, trình duyệt chọn phần tử nào lớn hơn, 45ch hoặc 50%, nghĩa là phần tử phải có kích thước tối thiểu là 45ch hoặc lớn hơn.

{@embed: https://www.youtube.com/watch?v=vAi5F-t9mI0}
*Video trên hiển thị cách sử dụng hàm max() để đặt chiều rộng "tối thiểu"*

### 2. Quản lý vùng đệm - padding

Sử dụng khái niệm tương tự như trên, trong đó hàm min() có thể đặt giá trị “max” và max() đặt giá trị “min”, bạn có thể sử dụng max() để đặt kích thước vùng đệm tối thiểu. Ví dụ này đến từ [CSS Tricks](https://css-tricks.com/using-max-for-an-inner-element-max-width/), nơi độc giả Caluã de Lacerda Pataca chia sẻ ý tưởng này: Ý tưởng là cho phép một phần tử có thêm phần đệm ở kích thước màn hình lớn hơn, nhưng duy trì phần đệm tối thiểu ở kích thước màn hình nhỏ hơn, đặc biệt là trên phần đệm nội tuyến. Để đạt được điều này, hãy sử dụng calc() và trừ khoảng đệm tối thiểu cho một trong hai bên: `calc((100vw - var(--contentWidth)) / 2)` hoặc sử dụng max: `max(2rem, 50vw - var(--contentWidth) / 2)`. Tất cả cùng nhau trông giống như:
```
footer {
  padding: var(--blockPadding) max(2rem, 50vw - var(--contentWidth) / 2);
}
```

{@embed: https://www.youtube.com/watch?v=w8aU5ivcLKU}
*Video trên hiển thị cách đặt khoảng đệm tối thiểu cho một thành phần bằng cách sử dụng hàm max() (hoặc bạn có thể xem code trên [Codepen](https://codepen.io/chriscoyier/pen/qBZqNKa))*

### 3. Kiểu chữ tràn linh hoạt (Fluid typography)

Để kích hoạt [kiểu chữ linh hoạt](https://www.smashingmagazine.com/2016/05/fluid-typography/), [Mike Riethmeuller](https://twitter.com/mikeriethmuller) đã phổ biến một kỹ thuật sử dụng hàm calc() để đặt kích thước phông chữ tối thiểu, kích thước phông chữ tối đa và cho phép điều chỉnh tỷ lệ từ tối thiểu đến tối đa.

{@embed: https://www.youtube.com/watch?v=DIjEEDh9yvQ}
*Video trên hiển thị cách tạo kiểu chữ linh hoạt với clamp() (hoặc bạn có thể xem code trên [Codepen](https://codepen.io/una/pen/ExyYXaN))*

Với clamp(), bạn có thể viết điều này rõ ràng hơn. Thay vì yêu cầu một chuỗi phức tạp, trình duyệt có thể thực hiện công việc cho bạn. Đặt kích thước phông chữ tối thiểu có thể chấp nhận được (ví dụ: 1.5rem cho tiêu đề, kích thước tối đa (tức là 3rem) và kích thước lý tưởng là 5vw.

Bây giờ, chúng ta nhận được kiểu chữ có tỷ lệ với chiều rộng khung nhìn của trang cho đến khi nó đạt đến giá trị tối thiểu và tối đa giới hạn, trong một dòng mã ngắn gọn hơn nhiều:
```
p {
  font-size: clamp(1.5rem, 5vw, 3rem);
}
```

Khi bạn sử dụng đơn vị vw hoặc giới hạn lượng văn bản lớn có thể nhận được bằng clamp(), có khả năng người dùng sẽ không thể chia tỷ lệ văn bản thành 200% so với kích thước ban đầu. Nếu điều đó xảy ra, thì là do WCAG bị lỗi theo [1.4.4 Thay đổi kích thước văn bản (AA)](https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=144#resize-text), vì vậy hãy chắc chắn là bạn đã [kiểm tra kết quả với thu phóng (zooming)](https://adrianroselli.com/2019/12/responsive-type-and-zoom.html) trên ứng dụng của mình.

## IV. Tổng kết
Các hàm toán học CSS, min (), max () và clamp() quả thực **VÔ CÙNG MẠNH MẼ**, lại còn được hỗ trợ tốt bởi tất cả trình duyệt và mình cá chắc là rất có thể đây là những gì bạn đang tìm kiếm để giúp bạn xây dựng giao diện người dùng reponsive hiện đại!

***NOTE**: Một ngày đẹp trời mình đọc được [bài gốc](https://web.dev/min-max-clamp/) này hay quá nên dịch ra cho các bạn đọc :rofl::rofl::rofl:. Mong là sẽ giúp đỡ được nhiều bạn cũng luôn đau đầu với responsive như mình... Cảm ơn các bạn đã đọc!!!*