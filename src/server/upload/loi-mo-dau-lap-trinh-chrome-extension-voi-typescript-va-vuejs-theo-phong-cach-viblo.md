Xin chào mọi người! :wave::wave::wave:

Chào mừng bạn đã đến với series/tutorial ***Lập trình Chrome extension với Typescript + Vue.js theo phong cách Viblo***. Mình tên là Kim, cũng là một trong các thành viên trong [Viblo Team](https://viblo.asia/o/viblo).  Rất hân hạnh được đồng hành cùng các bạn trong series này. Bài này chỉ mang tính chất giới thiệu nên hãy cùng bắt đầu tản mạn tí nhé!

## Viblo Browser Extension

Nếu bạn là một *"fan cứng"* của Viblo chắc có lẽ bạn đang hoặc đã từng sử dụng Viblo Browser Extension. Extension này được opensource tại repository: https://github.com/viblo-asia/browser-exntesion, được nhắm tới các browser hiện đại như Chrome, Firefox, Opera. Các bạn hoàn toàn có thể vào contribute hoặc tham khảo cách code để tích lũy thêm kiến thức hoặc đóng góp thêm những cái hay ho hơn cho cộng đồng Viblo!

Viblo Browser Extension cũng là một trong số những tool nho nhỏ mà Viblo Team tạo ra phục vụ riêng cho sản phẩm Viblo. Được xây dựng từ năm 2017 trên nền tảng JavaScript với vỏn vẹn 79 commit và 6 star :thinking: (stupid).

![](https://images.viblo.asia/83a5f828-1ebd-419f-ac26-ff70fe75a773.png)

Mini tool này được phát triển dựa trên framework là Vue.js, kết hợp với Webpack để build và đóng gói. Cùng với đó là library ElementUI để tạo frontend được dễ dàng hơn.

## Mục tiêu của series

Xây dựng một tool extension cho browser, hỗ trợ hiển thị các cảnh báo để nhắc nhở rằng chúng ta đang thao tác với một website XXX nào đó trên môi trường production thay vì development (môi trường phát triển) hoặc staging (môi trường kiểm thử). Giúp người dùng sẽ giảm nguy cơ dính các incident (sự cố lỗi xảy ra trên production) do việc thao tác nhầm môi trường.

Nghe nguyên nhân thì chắc bạn sẽ nghĩ: Uầy, mấy cái nào ai làm nhầm bao giờ?!!... :thinking:

Tin mình đi! :wink: Bản thân các anh em coder như mình nhiều lúc không để ý thì rất dễ mắc phải. Khi cả phiên bản website mình đang develop dưới local và production đều có giao diện giống hệt nhau. Và thực tế, mình đã thấy rất nhiều incident do nguyên nhân trên xảy ra.

## Các chức năng chính

1. Hiển thị badge cảnh báo ngay trên Icon trên toolbar của browser.
2. Người dùng define các website cần waning, tên môi trường (production, staging, development).
3. Hiển thị warning bên trong các website đã được người dùng define.
4. Người dùng có thể chọn các kiểu hiển thị warning

## Nội dung của series

Series này không phải là series đi sâu vào hướng dẫn cách sử dụng Vue.js hay Typescript mà sẽ focus vào cách chúng ta sẽ build một extension từng bước từng bước một cho tới khi release được lên Webstore của Chrome browser. Do đó, mình mặc định là các bạn đã có các kiến thức cơ bản về Vue.js và Typescript.  Bạn có thể tìm hiểu về Vue.js và Typescript qua các series trên Viblo nhé:
- Vue.js: https://viblo.asia/tags/vue
- Typescript: https://viblo.asia/tags/typescript

## TL;DR

Nếu bạn thấy series này hay và hữu ích thì đừng quên [share](https://www.facebook.com/sharer.php?u=https%3A%2F%2Fviblo.asia%2Fs%2Ftao-chrome-extension-voi-typescript-vue-theo-phong-cach-viblo-pmleB8G95rd&title=Tạo%20Chrome%20extension%20với%20Typescript%20%2B%20Vue%20theo%20phong%20cách%20Viblo), upvote, follow mình để đón đọc các bài viết tiếp theo của mình trên Viblo nhé!

Bạn cũng có thể subscribe các tag về [Vue](https://viblo.asia/tags/vue) và [Typescript](https://viblo.asia/tags/typescript) trên Viblo để nhận được nhiều hơn nữa các bài viết mới nhất về các topic này trên Viblo nhé! Viblo sử dụng các dữ liệu mà bạn follow, quan tâm cho hệ thống gợi ý nên các bạn hãy follow những topic bạn yêu thích để hệ thống recommend thêm nhiều bài hay và bổ ích từ hàng nghìn bài viết trên Viblo mà bạn còn chưa từng đọc!

:coffee::coffee: *Nếu thấy nội dung này bổ ích, hãy mời tôi một tách cà phê nha! **https://kimyvgy.webee.asia***