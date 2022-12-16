Nếu bạn đang xây dựng một ứng dụng hoặc một trang web thay đổi thường xuyên, mô đun hóa các phương thức `CSS` sẽ giải quyết được nhiều vấn đề. Thay vì sao chép cấu trúc` HTML` của bạn trong `CSS` và trang trí nó, bạn nên tạo ra các thư viện chứa các `component`. Điều này làm cho các dự án có khả năng mở rộng hơn và giữ cho code `CSS` nằm dưới sự kiểm soát.

Việc mô đun `CSS` dựa vào thành phần, chắc chắn sẽ làm `HTML` dài dòng hơn. Hiệu ứng thế chấp này có thể là một rào cản đáng kể đối với nhiều người vì  sự "sưng lên" nó tạo ra.

Trong bài viết này, chúng ta sẽ so sánh hai kỹ thuật: **chaining** và **extending**. Chúng ta sẽ xem những thứ nó cung cấp và những thiếu sót của nó là gì để bạn có thể đưa ra nhiều lựa chọn tốt hơn.

## **Chaining**
**Chaining** `CSS` có nghĩa là tạo ra giao diện mong muốn bằng cách thêm các `class` chỉnh sửa chi tiết với nhau vào trong cùng `HTML selector`. Các style kết hợp với nhau tạo ra hiệu ứng cuối cùng. Đây là hành vi mặc định với hầu hết các phương pháp mô-đun `CSS`.

Cùng xem một đoạn code `CSS` cho một `button`:

```
.btn {
display: block;
box-shadow: 0 0 5px 0 rgba(0, 0, 0, .2);
}
.btn-default {
border: 3px solid grey;
}
.btn-primary {
background: purple; color: white;
}
```
Nếu bạn **chain** các `class`, `HTML` của bạn sẽ trông như sau:

```
<button class="btn btn-primary">Primary button</button>
<button class="btn btn-default">Default button</button>
```

Vậy nếu phức tạp hơn một chút:

```
<div class="media-object media-object--reverse media-object--outlined">
  <div class="media-object__media">
    <img class="media-object__img media-object__img--faded img img--square" src="..." alt="...">
  </div>
  <div class="media-object__body">...</div>
</div>
```

Giờ chúng ta có nhiều `class` tương tác hơn:

* Class `.media-object` có một số chỉnh sửa là (`.media-object--reverse` và `.media-object--outlined`).
* Class `.media-object__img` có một chỉnh sửa (`.media-object__img--faded`).
* Class `.media-object__img` cũng có một `.img` với chỉnh sửa của nó (`.img--square`).

### Ưu điểm
Điểm nổi bật của **chaining** các `class` là mỗi `class` có **hiệu ứng riêng biệt**. Nó giữ cho code `CSS` của bạn sạch, gọn nhẹ, thoải mái để đọc và không lặp đi lặp lại. Những gì mỗi `class` làm là rõ ràng, và bạn ngay lập tức biết những gì bạn nên sử dụng và những gì bạn không nên.

Nó cũng tốt để tái sử dụng: vì bạn đang xử lý việc build các block, nên mọi thứ đều hữu ích. Khi bạn xóa một component, bạn chỉ cần xóa `HTML`. `CSS` vẫn có thể có ích để dùng trong `component` khác.

Tách biệt các chỉnh sửa là tốt để thể hiện trạng thái. Nó làm cho các kỹ sư `Javascript` làm việc dễ dàng hơn. Việc họ cần làm chỉ là thêm hoặc bỏ các `class`.

Trên các dự án lớn, phương pháp này có thể giúp bạn tiết kiệm rất nhiều thời gian.

### Nhược điểm
Một trong những vấn đề phổ biến nhất mà mọi người gặp phải với `CSS` mô-đun là nó tạo ra “lớp điên rồ” trong `HTML`. Nghiêm túc mà nói, điều này là đúng.

`Design patterns` để thực thi những việc riêng biệt luôn chia ra nhiều file và code dài dòng. `CSS` cũng không phải là ngoại lệ: nếu bạn chọn một phương pháp làm cho mã nguồn của bạn dễ bảo trì hơn, thì các tệp `HTML` sẽ rất dài dòng.

Việc phải nhập quá nhiều code ngày càng trở nên ít gặp vấn đề hơn cho tới ngày nay, vì hầu hết các trình soạn thảo và IDE đều cung cấp tính năng `autocompletion` mạnh mẽ. Nhưng bây giờ, code vẫn còn nhiều hơn để viết mỗi khi bạn tạo một trang mới hoặc tạo một `component` mới. Theo thời gian, điều này có thể gây ra một cảm giác lộn xộn và dư thừa sẽ gây khó khăn cho nhà phát triển.

## Extending
Nếu bạn không muốn **chain** `classes`, bạn có thể **extend** chúng. Chúng ta vẫn có cùng các khối riêng biệt, nhưng thay vì **chaining** chúng trong `HTML`, chúng ta kế thừa các thuộc tính của `base class` với các sửa đổi của nó. Bằng cách này, chúng ta có thể sử dụng chúng cùng một lúc.

Hãy sử dụng hàm `@extend` trong `Sass` để làm như vậy:

```
.btn {
  display: block;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, .2);
  &-default {
    @extend .btn;
    border: 3px solid grey;
  }
  &-primary {
    @extend .btn;
    background: purple;
    color: white;
  }
}
```

Điều này sẽ chuyển thành đoạn mã `CSS` sau:

```
.btn,
.btn-default,
.btn-primary {
  display: block;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, .2);
}
.btn-default {
  border: 3px solid grey;
}
.btn-primary {
  background: purple; color: white;
}
```

Với `CSS` ở trên, `HTML` của chúng ta sẽ trông giống như sau:

```
<button class="btn-primary">Primary button</button>
<button class="btn-default">Default button</button>
```

Thay vì có một loạt các `class` dường như lặp đi lặp lại, chúng ta chỉ có một. Nó có một tên rõ ràng và code có thể đọc được. Chúng ta vẫn có thể sử dụng `.btn` một mình, nhưng nếu chúng ta cần một biến thể của nó, chúng ta chỉ cần thêm phần chỉnh sửa thêm vào nó thay vì `chain` một `class` mới.

### Ưu điểm
Điểm nổi bật của phương pháp này là một `HTML` không lộn xộn, dễ đọc hơn và nhẹ hơn. Khi bạn sử dụng `CSS` mô-đun, bạn cũng quyết định thực hiện nhiều `HTML` và ít `CSS` hơn. `CSS` trở thành thư viện thay vì danh sách các chỉ dẫn. Vì vậy, bạn dành nhiều thời gian hơn trong `HTML`, đó là lý do tại sao bạn có thể muốn giữ cho nó nhẹ và dễ đọc.

### Nhược điểm
`CSS` của bạn có thể trông `DRY`, đặc biệt nếu bạn đang sử dụng `pre-processor` nhưng các lớp mở rộng sẽ dẫn đến tệp `CSS` nặng hơn nhiều. Ngoài ra, bạn không có nhiều quyền kiểm soát những gì xảy ra: mỗi khi bạn sử dụng **@extend**, định nghĩa class được chuyển lên đầu và được thêm vào danh sách các `selector` chia sẻ cùng một `ruleset`. Quá trình này có thể dẫn đến ghi đè và code được tạo nhiều hơn.

Cũng có trường hợp muốn sử dụng nhiều `class` sửa đổi cùng nhau. Với phương pháp **extend**, bạn không soạn trong `HTML` nữa. Bạn còn lại một giải pháp nếu bạn định tạo kết hợp mới: tạo nhiều lớp hơn bằng cách **extend** các `class` sửa đổi. Điều này là khó duy trì và dẫn đến nhiều mã code hơn. Mỗi khi bạn cần pha trộn các class, bạn sẽ cần chỉnh sửa `CSS` và tạo quy tắc mới có khả năng không thể tái sử dụng. Nếu bạn đã từng xóa `HTML` sử dụng nó, bạn cũng sẽ phải xóa lớp `CSS`.

## Afterthoughts
Mô đun `CSS` đi cùng với `HTML` dài dòng, nhưng không phải vấn đề cho tất cả những lợi ích mà nó cung cấp. Nếu bạn đã xác định mình cần mô đun, đừng tự làm khó mình bằng cách sử dụng các phương pháp không tương thích. Nó có thể sẽ dẫn đến nhiều công việc hơn cả lợi ích.

`HTML` "sưng lên" không phải là một vấn đề lớn khi bạn nhìn vào tác động thực tế của nó. Từ quan điểm hiệu năng, nhiều `HTML` tốt hơn rất nhiều so với nhiều `CSS`.

Đừng tập trung vào những điều nhỏ nhặt không quan trọng. Thay vào đó, hãy tận dụng các công cụ giúp bạn viết và điều hướng mã hiệu quả hơn. Hãy thử nhìn vào bức tranh lớn và lựa chọn dựa trên sự thật, không phải sở thích cá nhân.


Tham khảo: https://frontstuff.io/should-you-chain-or-extend-css-classes