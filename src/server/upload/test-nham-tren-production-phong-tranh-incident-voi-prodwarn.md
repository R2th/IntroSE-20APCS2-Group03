## "Toang" khi test nhầm production

Chào các bạn! :wave:  Hãy giả sử, bạn là ông dev của một dự án Quản lý hồ sơ bảo hiểm và đang test chức năng claim bảo hiểm. Thật không may bạn đã vào nhầm production mà không hề hay biết, nhấn duyệt dăm bảy cái request đền bù bảo hiểm cho khách hàng. Toang, thế là toàn bộ thông báo đền bù được gửi đi tới khách hàng thật qua mail, tiền đền bù đã được lên lệnh gửi đi. Hôm sau bạn phát hiện ra và lúc đấy là *toang thực sự*.

Hoặc có thể những trường hợp khác nghiêm trọng hơn ảnh hưởng xấu tới hình ảnh và danh tiếng của công ty cả của bạn và khách hàng, khách hàng thì kiện bạn, khách của khách hàng cũng kiện khách hàng. :laughing: 

Hôm nay mình sẽ giới thiệu tới anh em Viblo một extension cho trình duyệt có tên là **Prodwarn**. Được open source tại https://github.com/kimyvgy/prodwarn với phiên bản mới nhất hiện tại là `v0.4.2`.

![](https://images.viblo.asia/8c43d25d-ce55-4f60-ad4f-ea26f4559ccd.gif)

## Chức năng chính

`Prodwarn` - lấy ý tưởng từ keyword *Production Warning* ghép lại mà thành, cũng thể hiện luôn chức chức năng chính của nó đó là hiển thị các cảnh báo khi mà bạn truy cập vào một website production.

Extension này cho phép bạn tự *dánh dấu* đâu là website production để từ đó hiện cảnh báo với các trang này. Một điều làm bạn an tâm đó là toàn bộ thông tin *đánh dấu* này đều được lưu trữ ngay trên máy của bạn và không chia sẻ hay gửi đi ra bên ngoài nên sẽ không lo sợ bị lack thông tin về dự án.

## Ưu điểm

Với các ưu điểm:
- Hỗ trợ các trình duyệt phổ biến như: Opera, Chrome, Firefox.
- Giao hiện thân thiện, dễ dùng, quản lý theo nhóm các trang, hỗ trợ tìm kiếm, chỉnh sửa, xóa, xóa theo nhóm...
- Gọn nhẹ, các mẫu cảnh báo được `Scoped CSS` giúp không bị ghi đè CSS vào website production
- Cảnh báo ở góc dưới màn hình; có thể thu gọn thành icon với hiệu ứng rung lắc, gây được chú ý ngay cả khi thu gọn.
- Mọi thông tin chỉ lưu trên máy của người sử dụng

## Cách dùng

### Cài đặt

- Chrome: https://chrome.google.com/webstore/detail/prodwarn-production-warni/dgdfcekakoecdmmccembbgjeanedklic
- Firefox, Firefox Developer, Firefox Nighlightly: https://addons.mozilla.org/en-US/firefox/addon/prodwarn-production-warning
- Opera Developer, Opera Beta, Opera Next: https://addons.opera.com/en/extensions/details/prodwarn-production-warning
- Opera Stable: Pending review

Với các phiên bản trình duyệt mà extension đang ở trạng thái *Pending review*, anh chị em Viblo có thể cài đặt qua thông qua zip sau:
https://github.com/kimyvgy/prodwarn/releases/download/v0.4.2/prodwarn-v0.4.2.zip

Sau khi cài đặt thành công, một icon tương ứng có hình biển cảnh báo xuất hiện trên toolbox của trình duyệt như này:

![](https://images.viblo.asia/50x-/9cd6ae80-2ec5-4382-99b4-87e8b7ca4b1e.png)

### Đánh dấu một trang production

Để đánh dấu một trang là production, bạn chỉ cần:
- Truy cập trang đấy trên browser
- Nhấn vào icon Prodwarn trên toolbar của browser
- Bạn nhấn nút *Let's get started* hoặc biểu tượng dấu cộng *+*
- Một form đã tự điền các thông tin trang hiện tại xuất hiện, bạn có thể sửa lại tên nhóm *group* hoặc các thông tin khác.
- Nhấn *Add site* để lưu rồi reload lại trang hiện tại là cảnh báo production sẽ xuất hiện.

![](https://images.viblo.asia/b04b6b7b-fc50-4500-90b9-f51ed7898215.gif)

### Sửa lại trang đã đánh dấu

Để xóa xóa bỏ một trang cần cảnh báo:
- Bạn nhấn nút icon Prodwarn trên trình duyệt
- Danh sách các trang đã lưu hiện ra, bạn nhấn icon bút chì ở dòng tương ứng
- Sau khi form xuất hiện, bạn sửa thông tin và nhấn nút *Save* để lưu lại là xong.

![](https://images.viblo.asia/48c9d742-26c7-4b07-921d-9f0727d2ac8a.gif)

### Xóa đánh dấu trang production

Tương tự như khi sửa, để xóa bạn chỉ cần tìm trang cần xóa rồi nhấn icon hình thùng rác ở dòng tương ứng là được.

![](https://images.viblo.asia/ef545879-7790-40ce-8341-1ef82465a528.gif)

### Sửa / Xóa group

- Nhấn nút icon Prodwarn trên trình duyệt
- Tìm group cần sửa rồi nhấn icon menu *dấu 3 chấm* ở dòng tương ứng
- Tại mục *New group*, nhập tên group mới, nhấn nút *Update* để lưu lại.

![](https://images.viblo.asia/7ba8bc70-a1b5-434f-9f61-7327d952c405.gif)

## Tổng kết

Trên đây là một Open Source hỗ trợ việc cảnh báo khi bạn truy cập vào một website là production. Một ứng dụng nhỏ nhưng nó lại rất thiết thực, ít nhất cũng sẽ là có thêm một giải pháp nhắc nhở chúng ta mỗi khi truy cập những trang nhạy cảm. Đừng để khi INCIDENT do thao tác nhầm trên Production xảy ra thì lúc đó mọi thứ đã quá muộn. Bạn đọc vẫn còn nhớ ví dụ về website bảo hiểm mình đề cập ở đầu bài chứ?!!

Thực ra nếu anh em nào theo dõi mình trên Viblo thì có thể đã biết, Prodwarn chính là sản phẩm từ series [Tạo Chrome extension với Typescript + Vue theo phong cách Viblo](https://viblo.asia/s/tao-chrome-extension-voi-typescript-vue-theo-phong-cach-viblo-pmleB8G95rd) mà mình còn chưa viết xong các bài hướng dẫn. :D Và nó cũng chính là một extension được tự viết lại dựa theo một sản phẩm nội bộ trong công ty, tuy nhiên có một số cải tiến và tùy biến để open source cho mọi người.

Nếu anh em Viblo thấy sản phẩm này hay và hữu ích thì đừng quên upvote và follow mình nhé! Hoặc có thể tạo pull request để contribute cho sản phẩm này tại https://github.com/kimyvgy/prodwarn

:coffee::coffee: *Nếu thấy nội dung này bổ ích, hãy mời tôi một tách cà phê nha! **https://kimyvgy.webee.asia***