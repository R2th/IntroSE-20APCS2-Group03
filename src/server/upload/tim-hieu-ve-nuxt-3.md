# Nuxt @3.0.0

Hello anh em, như các bạn đã biết thì hiện tại **Nuxt** đã ra mắt bản stable releasetại [v3.nuxtjs.org](https://v3.nuxtjs.org/). Chúng ta đang mong đợi điều gì ở lần ra mắt này hãy cùng mình tìm hiểu nhé.

![Nuxt 3](/images/nuxt3.jpg)

## Tình trạng hiện tại của nuxt

Tóm tắt lại tắt nhanh trạng thái của Nuxt 3:

Nuxt3 đã ra mắt phiên bản ổn định vào ngày 20 tháng 4 năm 2022

Xem thêm [tại](https://v3.nuxtjs.org/community/roadmap)

## Các tính năng mới

Ở lần phát hành này Nuxt sẽ cải thiện và phát triển tính năng mới

### Tối ưu hóa chung

**Nuxt 3** mang đến nhiều cải tiến và tối ưu hóa chung. Kết quả là kích thước gói nhỏ hơn (lõi nhẹ hơn 20% khi so sánh với Nuxt 2) và cải thiện hiệu suất.

Các nhà phát triển có thể mong đợi hiệu suất tốt hơn trong quá trình phát triển nhờ **công cụ máy chủ Nitro** mới với khởi động nguội được tối ưu hóa và phân tách mã động.

Trên hết, các phần khác của công cụ cũng đã được nâng cấp - hiện đã có hỗ trợ **Webpack 5** , **PostCSS 8** , **ESBuild** và **Vite** - làm cho cả quá trình xây dựng phát triển và sản xuất cực kỳ nhanh chóng.

### Vue 3

Không ai ngạc nhiên, Nuxt 3 sẽ dựa trên Vue 3 và cung cấp trải nghiệm phù hợp với phiên bản mới nhất của khung Vue. Điều này có nghĩa là:

- Các tiện ích mô-đun mới cho **Composition API** ;
- Cải thiện định tuyến với **Vue Router 4** ;
- Tìm nạp dữ liệu đã sửa đổi và tích hợp Hồi hộp .

### **TypeScript**

Bên cạnh quá trình di chuyển Vue 3, Nuxt 3 sử dụng **Mô-đun ES (ESM**) và **TypeScript** như những công dân hạng nhất để cải thiện trải nghiệm phát triển. Động thái này phù hợp với những gì Vue 3 đã làm và toàn bộ hệ sinh thái Vue hiện đang đi đến đâu.

Tích hợp **TypeScript** chặt chẽ sẽ cung cấp khả năng kiểm tra kiểu cho toàn bộ cơ sở mã Nuxt 3, cũng như tự động hoàn thành và phát hiện lỗi tốt hơn.

Nếu bạn không thích **TypeScript**, bạn vẫn có thể sử dụng Nuxt mà không gặp bất kỳ sự cố nào.

### Kinh nghiệm phát triển tốt hơn

Ngoài TypeScript, Vue 3 và các cải tiến về hiệu suất, Nuxt 3 còn có nhiều cải tiến hơn nữa đối với trải nghiệm phát triển, bao gồm:

- **Nuxt CLI** mới để tích hợp mô-đun và giàn giáo dự án dễ dàng;
- **Nuxt Devtools** để gỡ lỗi nhanh hơn và thoải mái hơn ngay trong trình duyệt;
- Bộ công cụ mô-đun tiện ích hiện đại được gọi là **Nuxt Kit** ;
- Tự động nhập cho các tiện ích toàn cầu và các chức năng có thể tổng hợp. ## Kết xuất kết hợp

Cuối cùng nhưng không kém phần quan trọng, Nuxt 3 giới thiệu kết xuất kết hợp hay còn gọi là “tạo tĩnh gia tăng” . Tính năng này, theo nghĩa rộng, sẽ cho phép bạn quyết định xem bạn muốn các trang của mình được hiển thị tĩnh hay động trong bao lâu. Thông tin chi tiết về tính năng này sẽ được cung cấp cùng với bản phát hành beta.

### Động cơ nitro

Giờ đây, một trong những tính năng nổi bật của Nuxt 3 là công cụ máy chủ mới của nó - **Nitro** . Động cơ này là thứ thúc đẩy nhiều cải tiến hiệu suất và các tính năng mới của Nuxt 3.

### API routes

Nhờ Nitro, giờ đây bạn sẽ có thể tạo và chạy mã API máy chủ một cách dễ dàng, giống như hiện có thể thực hiện được trong nhiều khuôn khổ full-stack khác. Thư mục _server/api/_ mới sẽ là nơi chứa API máy chủ của bạn, trong khi các hàm sẽ tìm thấy trang chủ của chúng trong _server/functions/ _.

Các tuyến API mới, cùng với cơ chế tìm nạp đẳng cấu mới và hỗ trợ không máy chủ được cải thiện, đánh dấu một bước đi đúng hướng.

### Đầu ra được tối ưu hóa

Một ưu điểm khác của Nitro là đầu ra phổ quát, được tối ưu hóa cao cho thư mục .output mới. Gói máy chủ lõi bây giờ sẽ nhỏ hơn 1 MB và sẽ chứng kiến ​​sự gia tăng hiệu suất đáng chú ý. Ví dụ, khởi động nguội sẽ nhanh hơn 75-100 lần! Điều này sẽ chứng minh rất có lợi cho các môi trường như [Cloudflare worker](https://workers.cloudflare.com/) .

Những cải tiến này sẽ đạt được bằng cách theo dõi phụ thuộc tốt hơn bằng cách sử dụng Node File Trace từ Vercel [( @ vercel / nft )](https://github.com/vercel/nft). Điều này sẽ đảm bảo rằng chỉ những phụ thuộc cần thiết mới được đưa vào gói cuối cùng.

Việc giảm kích thước gói hơn nữa sẽ được thực hiện với cơ chế phân tách mã được sửa đổi.

### Hỗ trợ đa nền tảng

Với sự phát triển nhanh chóng của JavaScript trong vài năm qua, nhiều nền tảng hỗ trợ JS đã xuất hiện - và Nuxt 3 đã sẵn sàng cho tất cả chúng.

Nhờ tính năng theo dõi phụ thuộc được cải thiện, đã đề cập trước đó và các polyfills nhẹ mới cùng với tính năng tự động phát hiện nền tảng, Nuxt 3 sẽ chạy liền mạch trong hầu hết các môi trường JS. Điều này bao gồm **Node.js , Deno , Cloudflare worker** và thậm chí cả các Service worker của trình duyệt (mặc dù đó là thử nghiệm ngay bây giờ).

### Nuxt Bridge

Mặc dù Nuxt 3 trông giống như một bản nâng cấp tuyệt vời, nhưng có một vấn đề lớn mà chúng tôi chưa thảo luận - khả năng tương thích . Bản thân Vue 3, với những thay đổi đột phá, đã khiến nhiều thư viện và công cụ từ hệ sinh thái của Vue 2 trở nên “lỗi thời” và cần được nâng cấp. Vì vậy, nó sẽ khó khăn để nâng cấp lên Nuxt 3? Cảm ơn Nuxt Bridge - không khó lắm!

Nuxt Bridge là một dự án nhằm mang lại các tính năng của Nuxt 3 cho Nuxt 2. Điều này nhằm mục đích làm cho quá trình di chuyển trong tương lai diễn ra suôn sẻ hơn đồng thời cung cấp nhiều cải tiến Nuxt 3 cho những người dùng Nuxt 2 không có kế hoạch nâng cấp ngay lập tức.

Tập hợp các tính năng được hỗ trợ trở lại đã được lên kế hoạch bao gồm:

- Động cơ **nitro**;
- Hỗ trợ **ESM** và **TypeScript** tích hợp sẵn;
- **Composition API** với các bản tổng hợp Nuxt 3 và tự động nhập;
- **Nuxt CLI** và **Devtools**;
- Tích hợp **Vite**.
  Nuxt Bridge cũng đơn giản hóa việc nâng cấp cho toàn bộ hệ sinh thái Nuxt. Các plugin và mô-đun kế thừa sẽ tiếp tục hoạt động, tệp cấu hình từ Nuxt 2 sẽ tương thích với Nuxt 3 và một số API Nuxt 3 sẽ không thay đổi để cho phép nâng cấp dần dần.

### Phát lại phiên nguồn mở

Gỡ lỗi một ứng dụng web trong quá trình sản xuất có thể khó khăn và tốn thời gian. [OpenReplay](https://github.com/openreplay/openreplay) là một mã nguồn mở thay thế cho **FullStory, LogRocket và Hotjar**. Nó cho phép bạn theo dõi và phát lại mọi thứ mà người dùng của bạn làm và cho biết ứng dụng của bạn hoạt động như thế nào đối với mọi vấn đề.
Nó giống như việc mở trình kiểm tra trình duyệt của bạn trong khi nhìn qua vai người dùng của bạn.
OpenReplay là giải pháp thay thế mã nguồn mở duy nhất hiện có.

### Điểm mấu chốt

Nhìn chung, cá nhân tôi rất nóng lòng chờ đợi Nuxt 3. Giống như nhiều nhà phát triển Vue khác, tôi đã theo dõi nó trong vài tháng qua và tôi rất vui vì cuối cùng nó cũng đã ra mắt công chúng.

Mặc dù các cải tiến về hiệu suất rất ấn tượng, với tư cách là người dùng TypeScript, tôi quan tâm nhất đến việc viết lại TS, cũng như tích hợp Vue 3 và Vite. Những công nghệ này gần đây đã trở thành công nghệ mà tôi sử dụng cho các dự án cá nhân và sẽ thật tuyệt khi thấy chúng được tích hợp vào một khuôn khổ duy nhất.

Nuxt 3 sẽ là bước đệm trong việc chuyển hệ sinh thái Vue sang Vue 3, khuyến khích các nhà phát triển khác nâng cấp hoặc tạo ra các công cụ mới để làm phong phú thêm hệ sinh thái mới. Cộng đồng chắc chắn sẽ được hưởng lợi từ việc chuyển đổi sang TypeScript, áp dụng API thành phần và cải tiến hiệu suất cho cả ứng dụng hướng tới người dùng và chính môi trường phát triển, nhờ Vite.

Vì vậy, bạn có nó! Đó là nhiều nhưng chắc chắn không phải là tất cả các tính năng bạn sẽ thấy trong Nuxt 3. Tùy thuộc vào thời điểm bạn đọc nó, tôi hy vọng bạn cũng háo hức trải nghiệm Nuxt 3 như tôi, hoặc có thể bạn đã chơi với nó. Dù bằng cách nào - hãy vui vẻ!

[Nguồn tham khảo](https://vnphu.com)