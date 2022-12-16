## Giới thiệu
Gần đây mình thấy 1 số bạn mới học css sử dụng bootstrap grid khá loay hoay và lẫn lộn, container row col lồng nhau đủ kiểu lệch hết cả, vấn đề là do các bạn ấy chưa hiểu bản chất của grid bootstrap. Bài này mình sẽ giải thích cách hoạt động của nó cho những ai còn mung lung nhé!

## Lý thuyết
Grid bootstrap thì nổi tiếng rồi, ngày mình mới học ai cũng dùng để responsive, phân chia layout, dù bây giờ flex đã ra đời và vô cùng mạnh mẽ để thực hiện công việc chia layout nhưng nhiều người vẫn sử dụng bootstrap :joy:
Có 1 vài cái cần nhớ để hiểu rõ grid bs:

- container-fluid: `width: 100%; padding-left: 15px; padding-right: 15px;`
Vậy là toàn bộ content đặt bên trong container-fluid sẽ dài gần full màn hình (chiều dọc), cách viền trái phải 15px, mục đích của nó là không để content sát vào lề, trông sẽ rất xấu
![](https://images.viblo.asia/e66f0eee-aec9-472d-9c0e-373adc034a13.png)

- container:
```
width: 100%;
padding-right: 15px;
padding-left: 15px;
margin-right: auto;
margin-left: auto;

@media (min-width: 1200px) {
    .container {
        max-width: 1140px;
    }
}
...
```
container cũng cách lề trái phải 15px, margin-left và right auto sẽ giúp container luôn căn giữa màn hình, tùy kích cỡ màn hình thiết bị mà container sẽ có width khác nhau, thay vì full hết chiều dài như container-fluid
![](https://images.viblo.asia/b03309d3-7a67-49db-a9da-ff5473dc3fcc.png)
Mục đích của việc này là khi màn hình to ra thì content cũng chỉ nằm trong 1 khoảng cố định nằm giữa màn hình thôi, chứ full hết ra mà màn hình dài thì content cũng full ra nhìn rất thô và xấu :sweat_smile:
Ok vậy là nếu muốn content full hết chiều dài thiết bị, có cách lề 15px thì dùng container-fluid, cái này người ta hay dùng cho header footer, dùng ngay sau thẻ header, footer, vì 2 cái này thường là full màn, còn dùng container cho nội dung chính

- row và col
container thì dễ hiểu nhưng row và col mới là cái mà các bạn mới hay gặp rắc rối.
Đặt ra vấn đề như này, ta có trang list các sản phẩm, mỗi hàng sẽ có 4 sản phẩm, mỗi sản phẩm cách đều nhau 30px, tất cả content nằm gọn trong container.
Nếu ko có grid bs ta sẽ dùng float-left cho mỗi sp, mỗi sp sẽ margin-right: 30px, sp thứ 4n sẽ margin-right: 0, mỗi sp sẽ có width: calc((100%  - 30x3px)/4). 30x3 vì 4 sp thì chỉ có 3 cái khoảng cách giữa chúng thôi.
Cách xử lý của bs:
.row:display: flex; flex-wrap: wrap; margin-left: -15px; margin-right: -15px;
.col-3:width: 25%; padding-left: 15px; padding-right: 15px;
![](https://images.viblo.asia/10791f1f-ccd6-40bd-afcc-f06a7982374c.png)
container thì padding trái phải 15px, row lại cố tình thò ra cho = container khi margin lef right -15px, col lại padding trái phải 15px, ồ vậy là so với row col cách lề 15px, nhưng so với container thì nó lại nằm vừa khít content bên trong, đảm bảm khi ở màn hình bé, container có full ra bằng chiều dài thiết bị hoặc khi dùng container-fluid thì từng col cũng sẽ cách lề 15px, và mỗi col sẽ cách nhau 15px x 2 = 30px
Vậy nếu ta muốn từng col cách nhau 40px mà vẫn cách lề màn hình 15px thì sao? Nghĩ trước rồi hãy xem câu trả lời ở phần kết nhé!
Thế tại sao luôn là 15px nhỉ? cái này thực ra thấy đẹp vừa mắt thì dùng thôi, chứ 16px, 20px cũng đc :rofl: Nếu design mà vẽ ko phải 15px thì cũng đừng bảo bootstrap nó để 15px, ta chỉ làm y thế thôi =))
Thế tại sao boostrap lại chia thành 12 col mà không phải 10, 16... Ngẫm trước khi xem phần kết nhé!

## Kết nè
Trả lời câu 1,  muốn từng col cách nhau 40px mà vẫn cách lề màn hình 15px thì sao? => container vẫn padding left right 15px, row margin-left: -20px; margin-right: -20px; col padding left right 20px; Tuy nhiên phải thêm container overflow-x: hidden do lúc này row đã dài quá container rồi, ở mobile là tràn lề lỗi giao diện đó
Trả lời câu 2, tại sao lại là 12 col? Vì 12 rất dễ dàng phân chia, nó có thể được tách thành rất nhiều phần khác nhau, ví dụ 3 thằng col-4, 4 thằng col3, 1 thằng col-3 + 1 thằng col-9, 6 thằng col-2... Nếu sử dụng tổng là 10 col thì ko thể chia nhiều như vậy đc. Đa phần người ta chia 1 hàng thành 3 hoặc 4 item, bội chung của 3 và 4 phải là 12 thôi, chia thành 24 col cũng đc nhưng thế thì quá nhỏ rồi =))