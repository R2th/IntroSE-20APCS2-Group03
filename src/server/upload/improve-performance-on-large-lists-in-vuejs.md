# I. Giới thiệu.
Chào bạn Và chào mừng bạn đến với mẹo VueDose đầu tiên! Tôi cũng học về Vue chưa lâu nhưng trong lúc rảnh rỗi tình cờ tôi tìm được một số bài viết rất hay nên muốn chia sẻ dần với mọi người.

Các mẹo của VueDose khá ngắn gọn và  tôi nghĩ nó thật sự hữu ích với mọi người. Vì vậy, bây giờ chúng ta cùng đi thẳng tới vấn đề đầu tiên cho bài viết hôm nay.

# II. Vấn đề.

Thông thường chúng ta có nhu cầu tìm nạp list objects, items, articles,... nói chung là dữ liệu để sử dụng và đôi khi chúng ta thậm chí không cần phải sửa đổi những dữ liệu này, chỉ dùng để hiển thị chúng hoặc để chúng ở trạng thái toàn cầu của chúng ta (hay còn gọi là Vuex). 

Đoạn code đơn giản để tìm nạp danh sách đó như sau:
```php
export default {
  data: () => ({
    users: {}
  }),
  async created() {
    const users = await axios.get("/api/users");
    this.users = users;
  }
};
```
Bạn có thể hiểu đơn giản bạn lấy hoặc tạo ra một bản ghi dữ liệu sau đó chỉ muốn hiển thị bản ghi dữ liệu đó lên mà không cần tác động thêm, sửa, xóa ghì tới bản ghi đó.

Theo mặc định Vue sẽ phản ứng với mọi thuộc tính ở cấp đầu tiên của từng đối tượng trong danh sách dữ liệu đó. Như vậy đối với những danh sách lớn thì sẽ rất mất thời gian, Đôi khi những danh sách dữ liệu này được phân trang nhưng bạn chỉ có danh sách đó ở frontend.

Một ví dụ đơn giản là trường hợp với các điểm đánh dấu Google Maps, trên thực tế là những dữ liệu khổng lồ.

# III. Cách giải quyết.

Trong những trường hợp như trên, chúng ta có thể đạt được một số hiệu suất nếu chúng ta ngăn không cho Vue Theo dõi với danh sách đó.

Và chúng ta có thể làm điều đó bằng cách sử dụng Object.freeze trong danh sách trước khi thêm nó vào thành phần:
```php
export default {
  data: () => ({
    users: {}
  }),
  async created() {
    const users = await axios.get("/api/users");
    this.users = Object.freeze(users);
  }
};
```
Với Vuex thì ta có thể làm tương tự:

```php
const mutations = {
  setUsers(state, users) {
    state.users = Object.freeze(users);
  }
};
```

Nếu bạn cần sửa đổi mảng, bạn vẫn có thể làm điều đó bằng cách tạo một mảng mới. Chẳng hạn, để thêm một mục, bạn có thể làm như sau:
```php
state.users = Object.freeze([...state.users, user]);
```

Dùng freeze liệu cải thiện được bao nhiêu hiệu suất, bạn cùng xem nó ngay sau đây.

Như đã nói ở trên về cách cải thiện hiệu suất trong danh sách dữ liệu lớn của Vue. Nhưng chúng ta vẫn chưa đo được nó thực sự cải thiện đến mức nào.

Để đo được hiệu suất chúng ta có thể sử dụng tab Hiệu suất trong DevTools của Chrome. Nhưng để có dữ liệu chính xác, chúng ta phải kích hoạt chế độ hiệu suất trên ứng dụng Vue của chúng ta.

Chúng ta có thể làm điều đó bằng cách cài đặt toàn cục, trong tệp main.js của chúng ta hoặc trong một plugin với trường hợp Nuxt:

```php
Vue.config.performance = true;
```
Hoặc nếu bạn có thể sửa biến NODE_ENV trong env, bạn có thể sử dụng nó để đặt nó trong môi trường non-production:
```php
const isDev = process.env.NODE_ENV !== "production";
Vue.config.performance = isDev;
```

Điều đó sẽ kích hoạt [User Timing API](https://developer.mozilla.org/en-US/docs/Web/API/User_Timing_API) mà Vue sử dụng nội bộ để đánh dấu hiệu suất của các thành phần.

Từ mẹo cuối cùng, tôi đã tạo ra [hộp mã này](https://0ql846q66w.codesandbox.io/). Mở nó và nhấn nút tải lại từ tab hiệu suất trên DevTools của Chrome:


![](https://images.viblo.asia/12f587c3-69da-42c9-a9f7-6477a4745ecd.PNG)


Điều đó sẽ ghi lại hiệu suất tải trang. Và nhờ cài đặt Vue.config.performance trên main.js mà bạn có thể thấy được thời gian tải trang:

![](https://images.viblo.asia/cd472fac-c69f-422b-9f20-b61d910fd2d6.PNG)

Trong đó, bạn sẽ tìm thấy 3 số liệu:

Init: cần có thời gian để tạo cá thể thành phần.

Render: thời gian để tạo cấu trúc VDom.

Patch: thời gian để áp dụng cấu trúc VDom cho DOM thực.

Quay lại một chút ta có kết quả khi chưa dùng freeze là như sau: thành phần bình thường mất 417ms để kích hoạt:

![](https://images.viblo.asia/2a661203-24d8-484f-8dcd-87e26755c4f9.PNG)

Trong khi sử dụng non-reactive bằng Object.freeze mất 3,9ms:

![](https://images.viblo.asia/6a9dfc61-e96e-4cb9-97e0-4b624b2abb7c.PNG)

Bạn có thể thấy sự khác biệt khá lớn. Vì vấn đề xảy ra khi có phản ứng thành phần được tạo ra, bạn sẽ thấy sự khác biệt đó trong phần khởi đầu của các Reactive và NoReactive components.

# IV. Kết.

Như vậy tôi đã giới thiệu một mẹo nhỏ để tăng hiệu suất cho Vue mà tôi thấy rất hữu ích với những dự án lớn. Mong rằng mẹo này sẽ hữu ích với các bạn.

Tham khảo: https://vuedose.tips/tips/improve-performance-on-large-lists-in-vue-js/