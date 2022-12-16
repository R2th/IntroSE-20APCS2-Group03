Vuex chắc hẳn là công cụ để quản lý trạng thái của ứng dụng Vue.js rất tốt. Các nhà phát triển Vuex đã tạo ra vô số plugin miễn phí rất hay, với nhiều tính năng bạn mà bạn có thể áp dụng vào project của mình.

Trong bài viết này, tôi sẽ chỉ cho bạn 5 plugins mà bạn có thể dễ dàng thêm vào dự án của mình cho Vuex.

### 1. Persisting state
[vuex-continedstate](https://github.com/robinvdvleuten/vuex-persistedstate) sử dụng localStorage của trình duyệt để duy trì state của bạn qua các session. Điều này có nghĩa là làm mới trang hoặc đóng tab sẽ không xóa dữ liệu của bạn.

Ví dụ về một trường hợp mà bạn có thể sử dụng đó là thêm vào giỏ hàng: Nếu người dùng vô tình đóng một tab, họ có thể mở lại nó với trạng thái trang còn nguyên vẹn.

![](https://images.viblo.asia/267bdb75-68c6-4c91-ac71-a4933451eea6.gif)

### 2. Syncing tabs/windows
[vuex-shared-mutations](https://github.com/xanf/vuex-shared-mutations) đồng bộ state giữa các tab khác nhau. Nó thực hiện bằng cách lưu một mutation vào localStorage. Sau đó nó kích hoạt sự kiện storage để cập nhật trong tất cả các tab / cửa sổ khác. Do đó giữ state đồng bộ giữa các tab với nhau.

![](https://images.viblo.asia/7ecc9f25-b5ea-48ba-8f10-6fc6e9639726.gif)

### 3. Language Localization
[vuex-i18n](https://github.com/dkfbasel/vuex-i18n) cho phép bạn dễ dàng lưu trữ nội dung bằng nhiều ngôn ngữ. Sau đó, việc chuyển đổi ngôn ngữ trong ứng dụng của bạn là chuyện nhỏ.

Một tính năng thú vị là bạn có thể lưu trữ các chuỗi thông báo ví dụ như : Hello {name}, đây là ứng dụng Vue.js của bạn. Tất cả các bản dịch của bạn có thể có cùng một mã thông báo khi cần trong chuỗi.

![](https://images.viblo.asia/869fe78f-6879-4589-a335-e123d31b8e42.gif)

### 4.  Managing multiple loading states
[vue-wait](https://github.com/f/vue-wait) giúp quản lý nhiều state loading trong ứng dụng của bạn. Plugin này tiện dụng cho các ứng dụng real-time, những ứng dụng này thay đổi về trạng thái là thường xuyên và phức tạp.

![](https://images.viblo.asia/72a6c3de-e5be-4397-8298-adc2f7430dd5.gif)

### 5.  Catching actions
[vuex-cache](https://github.com/superwf/vuex-cache) có thể lưu trữ các actions của Vuex .Ví dụ: nếu bạn đang truy xuất dữ liệu từ máy chủ, plugin này sẽ lưu kết quả vào lần đầu tiên bạn gọi action, sau đó trả về giá trị được lưu trong bộ nhớ cache cho các lần gửi tiếp theo. Việc xóa bộ nhớ cache khi cần thiết là chuyện nhỏ.

![](https://images.viblo.asia/05d9f857-7f58-4786-9cd4-2de4109dc109.gif)

Trên đây là 5 plugins cho Vuex. Hy vọng nó sẽ đem lại nhiều giúp ích cho các bạn.

Nguồn: [5 Vuex Plugins For Your Next VueJS Project](https://medium.com/js-dojo/5-vuex-plugins-for-your-next-vuejs-project-df9902a70de2)