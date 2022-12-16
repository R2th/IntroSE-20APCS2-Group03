Vấn đề với z-index, đấy là có rất ít người thực-sự-hiểu nó hoạt động như thế nào. Z-index không hề phức tạp, nhưng nếu như bạn chưa bao giờ bỏ thời gian ra đọc tài liệu specification, sẽ có rất nhiều khía cạnh mà gần như chắc chắn bạn sẽ hoàn toàn không biết tới.

Không tin phải không ? Vậy thì, hãy cùng xem ví dụ dưới đây:

## Vấn đề

Trong đoạn HTML sau, ta sẽ có 3 thẻ `<div>`, trong mỗi div sẽ chứa một `<span>`. Mỗi span này sẽ có 1 màu background - đỏ, xanh lá và xanh nước biển. Mỗi `<span>` cũng được set vị trí absolute, hơi chồng lên nhau để bạn có thể nhìn thấy được thứ tự xếp lớp của chúng. `<span>` đầu tiên có z-index được gán bằng 1, 2 cái còn lại sẽ không được gán.

Đây là đoạn HTML và CSS kèm theo.

```
<div>
  <span class="red">Red</span>
</div>
<div>
  <span class="green">Green</span>
</div>
<div>
  <span class="blue">Blue</span>
</div>
```

```
.red, .green, .blue {
  position: absolute;
  width: 100px;
  color: white;
  line-height: 100px;
  text-align: center;
}

.red {
  z-index: 1;
  top: 20px;
  left: 20px;
  background: red;
}

.green {
  top: 60px;
  left: 60px;
  background: green;
}

.blue {
  top: 100px;
  left: 100px;
  background: blue;
}
```

![](https://images.viblo.asia/d9caec66-f0bc-471f-8034-f55da4dc7078.png)

**Đây là bài toán:** hãy thử xem bạn có thể làm thẻ `<span>` đỏ chui xuống phía dưới 2 thẻ `<span>` xanh được không mà không được dùng cách nào dưới đây:

- Thay đổi code HTML
- Thêm / sửa `z-index` của các element
- Thêm / sửa `position` của các element

![](https://images.viblo.asia/e5e79ac3-900b-40fd-8a7e-6705caf30124.png)

...
......
.........

## Giải pháp

Giải pháp ở đây - đó là thêm 1 giá trị nhỏ hơn `1` cho property `opacity` của `<div>` đầu tiên (div chứa thẻ `<span>` đỏ). 

```
div:first-child {
  opacity: .99;
}
```

=))

Nếu bạn vẫn đang vò đầu bắt tai và vẫn không chịu tin rằng opacity có thể ảnh hưởng tới thứ tự xếp lớp của các element, xin chúc mừng :) Cả tôi cũng đã từng shock khi lần đầu gặp phải vấn đề này.

Hi vọng rằng phần còn lại của bài viết có thể làm mọi thứ rõ ràng hơn.

## Stacking Order

Z-index nhìn thì có vẻ là đơn giản: element nào có z-index cao hơn thì sẽ xếp phía trước element nào có z-index thấp hơn. Nghe có vẻ đúng :)

Well, thật ra thì không.

Đây là một trong những vấn đề với z-index: Nó quá đơn giản, thế nên hầu hết các developer sẽ không bỏ thời gian để đọc các rule của nó.

Mọi element trong một trong HTML có thể ở phía trước hay phía sau các element khác trong document. Đây được gọi là thứ tự xếp lớp (**stacking order**). Quy luật để xác định thứ tự được định nghĩa rõ trong tài liệu spec.

Đầu tiên, khi chưa tính đến 2 property `z-index` và `position`, chỉ có mọt luật khá đơn giản: về cơ bản, thứ tự xếp lớp chính là thứ tự xuất hiện trong HTML 

> OK, thực ra thì cũng có [1 chút phức tạp hơn](https://www.w3.org/TR/CSS2/zindex.html) 1 tí, nhưng chừng nào ta còn chưa đụng tới negative margin để khiến các element chồng lên nhau, thì ta sẽ không gặp phải trường hợp này.
 
Tiếp theo, khi tính tới property `position`, thì khi đó mọi element được-set-position (và cả các element con của nó) đề xuất hiện phía trước **bất kì** một element không-set-position nào. (Một element được gọi là được-set-position khi nó có giá trị `position` khác `static`, ví dụ `relative`, `absolute` ...)

Cuối cùng, khi tính tới cả `z-index`, vấn đề lại trở nên phức tạp hơn 1 chút. Ban đầu, ta có thể coi như element nào có giá trị z-index cao hơn thì sẽ đứng trước element có giá trị z-index thấp hơn. Tuy nhiên thì ta cần biết rằng thực ra có nhiều quy tắc hơn thế:

- z-index chỉ chạy đối với element nào được-set-position. Nếu bạn cố set z-index cho element nào không đặc tả position, nó sẽ không có tác dụng.
- z-index có thể tạo ra `stacking context`, và đây là lúc mà vấn đề trở nên rắc rối.

## Stacking Contexts

Một nhóm các element có chung một element cha sẽ cùng di chuyển chung với nhau trong `stacking order`, tạo nên khái niệm gọi là `stacking context`. Việc hiểu biết về stacking context chính là chìa khóa để hiểu hoàn toàn về cách z-index và stacking order hoạt động.

Mỗi một stacking context sẽ có 1 HTML element là element gốc (root element). Khi một stacking context gắn với một element, nó sẽ liên kết tất cả các element con vào 1 vị trí cố định trong stacking order. Điều đó có nghĩa là nếu 1 element nằm trong 1 stacking context nằm ở dưới cùng của stacking order, sẽ không có cách nào làm cho nó xuất hiện phía trước một element nằm trong 1 stacking context có vị trí cao hơn trong stacking order, ngay cả nếu set z-index của nó tới 1 tỉ !

Một stacking context có thể được gắn với 1 element bằng 1 trong 3 cách:

- Khi một element là gốc của document (thẻ `<html>`)
- Khi một element có giá trị `position` được set khác với `static` và `z-index` khác `auto`
- Khi một element có giá trị `opacity` nhỏ hơn `1`

Cách thứ nhất và thứ hai thì dễ hiểu rồi, và hầu hết mọi developer đều hiểu về nó (ngay cả khi họ không biết nó gọi là gì).

Tuy nhiên, cách thứ ba hầu như không bao giờ được nhắc tới, ngoại trừ trong tài liệu đặc tả của w3c.

> **Cập nhật**: Bên cạnh opacity, một số property CSS mới bây giờ cũng có thể tạo stacking context. Chúng bao gồm `transforms`, `filters`, `css-regions`, `paged media` ... Như một luật chung, đó là nếu như 1 property CSS yêu cầu render trong một `offscreen context`, nó sẽ tạo ra một stacking context mới.
 
## Xác định vị trí của một Element trong stacking order

Thực ra, việc xác định vị trí tổng thể trong stacking order của mọi element trong trang (bao gồm cả border, background, text ...) là một việc cực kì phức tạp, và nằm ngoài giới hạn của bài viết này (nếu muốn, bạn có thể đọc [tài liệu đặc tả](https://www.w3.org/TR/CSS2/zindex.html) :)

Tuy nhiên, việc hiểu biết cơ bản về thứ tự này có thể giúp ích rất nhiều cho ta và khiến việc viết code cho CSS dễ hình dung hơn. Vì vậy hãy cùng bắt đầu với từng trường hợp con.

### Stacking order bên trong 1 stacking context

Đây là 1 số quy tắc cơ bản để xác định stacking order với các element trong cùng một stacking context:

1. đầu tiên là root element của stacking context đó.
2. Các element được-set-position (và con của chúng) với giá trị `z-index` âm. (Giá trị cao hơn thì xếp trước, các element với giá trị bằng nhau thì xác định dựa vào thứ tự trong HTML)
3. Các element không-set-position.
4. Các element được-set-position (và con của chúng) với `z-index` bằng `auto` 
5. Các element được-set-position (và con của chúng) với `z-index` dương 

Các trường hợp 3 đến 5 cũng giống với 2: (Giá trị cao hơn thì xếp trước, các element với giá trị bằng nhau thì xác định dựa vào thứ tự trong HTML)

**Note**: Các element với z-index âm được xếp đầu tiên trong stacking context, điều đó có nghĩa chúng xếp phía sau (khi hiển thị) tất cả các element khác. Vì điều này, một element hoàn toàn có thể hiển thị phía sau element cha của nó. Cách này chỉ thực hiện được nếu như element cha đó nằm trong cùng 1 stacking context và không phải là root element của stacking context đó. Một ví dụ rất hay của Nicolas Gallagher mà bạn có thể thử đó là [CSS drop-shadows without images](http://nicolasgallagher.com/css-drop-shadows-without-images/demo/).

### Global stacking order

Sau khi đã hiểu rõ làm sao mà một stacking context mới được tạo ra, cũng như thứ tự sắp xếp bên trong 1 stacking context, khi này việc biết vị trí tổng thể của một element dễ dàng hơn rồi.

Chìa khóa để tránh việc nhầm lẫn ở đây đó là phải tìm ra được vị trí mà một stacking context mới được tạo. Nếu bạn đã cố set z-index cho một element lên 1 triệu mà nó vẫn không xuất hiện lên phía trước, hãy nhìn lên các element tổ tiên của nó và xem nếu như đã có 1 stacking context nào đó được tạo ra ở đâu. 

## Tóm tắt

Quay trở lại vấn đề ban đầu, tôi sẽ viết lại cấu trúc HTML đi kèm với comment để biểu thị cho stacking order.

Order này tương ứng với CSS ban đầu.

```
<div><!-- 1 -->
  <span class="red"><!-- 6 --></span>
</div>
<div><!-- 2 -->
  <span class="green"><!-- 4 --><span>
</div>
<div><!-- 3 -->
  <span class="blue"><!-- 5 --></span>
</div>
```

Khi ta thêm opacity cho `<div>` đầu tiên, stacking order thay đổi:

```
<div><!-- 1 -->
  <span class="red"><!-- 1.1 --></span>
</div>
<div><!-- 2 -->
  <span class="green"><!-- 4 --><span>
</div>
<div><!-- 3 -->
  <span class="blue"><!-- 5 --></span>
</div>
```


`span.red` từ `6` chuyển về `1.1`. Tôi dùng `.1` ở đây là có ý nói rằng một stacking context mới vừa được tạo với `span.red` là element đầu tiên của context này.

Giờ, sau bài viết này, hi vọng bạn đã có được cái nhìn rõ hơn vì sao mà cái ô đỏ lại nằm phía sau các ô khác rồi chứ :) Ban đầu, chỉ có 2 stacking context, 1 là root và 1 là trên `span.red`, khi ta thêm opacity cho element cha của `span.red` ta đã tạo ra stacking context thứ 3, và kết quả là `z-index` của `span.red` chỉ áp dụng bên trong context đó. Bởi vì `<div>` đầu tiên và các element anh em của nó không có `position` hay `z-index` được set, thứ tự stacking order được xác định theo thứ tự xuất hiện trong HTML, có nghĩa là `<div>` đầu tiên - và tất cả các element nằm trong stacking context của nó - sẽ nằm phía dưới `<div>` thứ hai và thứ ba.

## Nguồn mở rộng

[Elaborate description of Stacking Contexts](http://www.w3.org/TR/CSS2/zindex.html)

[The stacking context](https://developer.mozilla.org/en-US/docs/CSS/Understanding_z-index/The_stacking_context)

[The Z-Index CSS Property: A Comprehensive Look](http://coding.smashingmagazine.com/2009/09/15/the-z-index-css-property-a-comprehensive-look/)

### Nguồn dịch

https://philipwalton.com/articles/what-no-one-told-you-about-z-index/