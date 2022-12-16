## Giới thiệu
Nhắc đến boostrap (bt) thì chả ai còn xa lạ, dù là frontend hay backend thì cũng đều học và sử dụng. Thế nhưng có nhiều người tuy dùng bt thường xuyên lại không nắm hết sức mạnh của framework này, hay không hiểu những thứ cơ bản của boostrap như grid được làm như thế nào. Trong bài này mình sẽ nói 1 chút để ai đó còn mơ màng hay mới học bt sẽ dễ hình dung hơn (bài chỉ dành cho người mới thôi nha các bác :joy_cat:)

## Những điều nên biết
Bootstrap là một framework bao gồm HTML templates, CSS templates và Javascript tạo ra những thứ cơ bản có sẵn như: typography, forms, buttons, tables, navigation, modals, image carousels và nhiều thứ khác. Trong bootstrap có thêm các plugin Javascript giúp cho việc thiết kế reponsive của bạn dễ dàng hơn và nhanh chóng hơn. 

### Grid
Grid có lẽ là thứ nổi tiếng nhất của bt, về cơ bản bt chia layout thành 12 phần, 12 là con số rất hợp lý, nó có thể dễ dàng chia layout thành nhiều phần tùy biến. 
Nguyên lý của grid bt là, bạn sẽ bao nội dung trong 1 container hoặc container-fluid, 2 class này padding 2 đầu 15px, điều này sẽ giúp nội dung không quá sát với lề, thử tưởng tượng text mà dính sát vào lề xem, cả desktop lẫn moblie, chắc chắn bạn sẽ muốn out web ngay lập tức, quá xấu :angry:

![](https://images.viblo.asia/088003ad-8340-45ed-b73b-2602e786cf4e.PNG)

Trong content, muốn chia các phần thì các bạn đọc col bt, mình muốn nói đến class row và col-xxx. row thì margin-left và margin-right -15px, tức là nó sẽ dài hơn cái bao nó 30px, nên nếu dùng row các bạn hãy cẩn thận tránh trường hợp vỡ giao diện, còn col thì padding-left và padding-right 15px, tức là col nằm trong row thì sẽ bù trừ vừa đúng 2 mép trái phải, và các col sẽ cách nhau 15px x 2 = 30px. Vậy nên nếu các bạn muốn tạo 1 bộ grid cho riêng mình với các khoảng cách khác nhau, hãy áp dụng cách này của bt :thumbsup:

### Modal
Với mình thì modal là thứ tiện lợi thứ 2 sau grid của bt. Nó rất tuyệt và bạn chẳng cần làm thêm hiệu ứng gì, nó bỏ scroll page khi modal show, fade dễ nhìn, cách dùng đơn giản. 
Nguyên lý của modal là bạn sẽ có 1 nút hoặc link với thuộc tính **data-target="#exampleModal"**, khi click vào link này, bt sẽ open modal có id là exampleModal, vì là id nên không lo trùng với modal khác. Đây cũng là cách các bạn nên dùng để tự viết modal hoặc tab hoặc gì đó tương tự.

### Form, button
Đây là thứ tiện lợi tiếp theo của bs. 1 trang web thì luôn có các form, form field, button các loại, có lẽ đây là thứ thường xuất hiện nhiều nhất trên trang web, vì nó cũng đẹp sẵn rồi nên các bạn cứ dùng luôn nếu không có design khác biệt.

### Carousel
1 dạng slide đơn giản, hữu dụng, không cần nhiều tùy biến thì cứ Carousel bt mà dùng, nhanh gọn lẹ khỏi cần tự viết hoặc thêm plugin nặng nề :clap:

### Một số class hữu dụng
**card**: class để đóng gói các phần nội dung liên quan, có sẵn border

**jumbotron**: ý nghĩa giống card, nhưng mặc định sẽ có background xám màu

**margin, padding**: có sẵn các class pt: padding-top, px: padding left và right, py: padding top và bottom, tương tự với các class còn lại, khoảng cách thì từ 1 đến 5, ví dụ pt-1 là padding-top: 0.25rem, pt-2 là padding-top: 0.5rem...

**border, border-radius, box-shadow**: rất tiện lợi, có khi nào bạn nghĩ không biết box-shadow bao nhiêu cho đẹp mắt? cứ nhìn bs nó làm mà theo thôi

**width, height, mw, mh, min-wm, min-wh**, có các size là w-25, w-50, w-75, w-100 ứng với 25%...
...

## Kết luận
Mình chỉ nói sơ qua vài thứ hay dùng của bootstrap, framework này vẫn còn nhiều thứ thú vị các bạn nên xem qua, sử dụng thì rất dễ thôi, chủ yếu là mình biết nó có để sau này tra cho dễ.
Khi nào thì nên sử dụng bt? Khi bạn không có design chi tiết làm theo, cần nhanh, gọn, dễ nhìn, khi có những chi tiết không áp dụng được cho nhiều chỗ, thay vì đặt class hoặc style vào phần tử đó, bạn có thể tìm class bt mà áp vào.
Bootstrap tiện lợi thật nhưng các bạn mới học nên xem và tìm hiểu nó làm như thế nào thay vì cứ áp dụng không cần biết lý do, vì bs không nhẹ chút nào, bạn sẽ không muốn áp cả framework nào mà dùng mỗi cái grid để responsive, đã thế grid còn chả giống hệt design phải custom lại. Đừng nói mình thành thạo bootstrap khi chỉ biết sử dụng những thứ có sẵn mà không hiểu bản chất nhé. :v: