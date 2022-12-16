Khi học Vuex, có thể mất một chút thời gian để thấy sự khác biệt giữa Mutations và actions trở nên rõ ràng. Thông thường, các devs có thể sẽ xem đoạn code này:
```
mutations: {
  setName(state, name) {
    state.name = name;
  },
},
actions: {
  setName({ commit }, name) {
    commit('setName', name);
  },
},
```
Các tài liệu của Vuex cho biết, actions khá giống mutations, sự khác biệt là:
- Thay vì mutating state, actions commit mutations. <br>
- Actions có thể chứa các hoạt động không đồng bộ tùy ý.<br>
Vì vậy, trong nhiều ví dụ, chúng ta thấy một API gọi trong một action, dẫn đến kết quả trong một commit của một mutation:
```
actions: {
  loadBooks({ commit }) {
    commit('startLoading');
    get('/api/books').then((response) => {
      commit('setBooks', response.data.books);
      commit('stopLoading');
    });
  },
},
```
Không nhìn vào bất kỳ mutations nào, nó vẫn nên rõ ràng hơn những gì đang xảy ra. Trước khi API bắt đầu goị, một cờ loading được đặt; sau đó, kết quả trả về (sử dụng một promise không đồng bộ), nó sẽ commit dữ liệu trả về và sau đó commit `stopLoading`, điều này rất có thể sẽ hủy bỏ cờ loading.<br>
Một lựa chọn thiết kế đáng chú ý: code ở trên sử dụng 2 mutations. Các mutations `startLoading / stopLoading` có thể được thay thế bằng một mutation (`setLoading`) bằng một boolean payload, sau đó `stopLoading` có thể được `commit (‘setLoading, false)`.
Ví dụ trên yêu cầu 2 mutations, có nghĩa là nhiều code để maintain.<br>
Lý do này giống như khuyến nghị rằng các classes CSS không được đặt tên cho style mà chúng áp dụng, mà là ý nghĩa của style - tức là, không gọi nó là `redAndBold`, nhưng thay vào đó gọi là `activeMothyItem`.<br>
Cách gọi một mutation, `set <Property>`, điều đó có nghĩa là giao diện trừu tượng không có gì; mọi thay đổi đối với việc thực hiện có thể sẽ có nghĩa là thay đổi giao diện. Chúng tôi sẽ cho bạn thấy một ví dụ ngắn mà sự trừu tượng hóa mutation được thể hiện.<br>
    ![](https://images.viblo.asia/3399ec7a-25b5-47b8-ab63-1fb3fea8f907.png)
### Atomic and transactional means traceable
 Một trong những yêu cầu của các công cụ quản lý state hiện đại là traceability. Trong các thế hệ quản lý state trước đây, khi hệ thống rơi vào inconsistent state, việc tìm ra cách giải quyết thể khó khăn.<br>
Sử dụng các devtools Vue, có thể cho thấy rõ hơn chronology của mutations được áp dụng cho single global state.<br>
Hãy để `loadBooks` ở trên làm ví dụ. Vào tối muộn thứ Sáu, nhà phát triển Alex bắt đầu làm việc với chức năng load và hiển thị các tác giả bên cạnh sách. Là một điểm khởi đầu, họ copy và paste action đã có với những thay đổi nhỏ.
```
actions: {
  loadBooks({ commit }) {
    commit('startLoading');
    get('/api/books').then((response) => {
      commit('setBooks', response.data.books);
      commit('stopLoading');
    });
  },
  loadAuthors({ commit }) {
    commit('startLoading');
    get('/api/authors').then((response) => {
      commit('setAuthors', response.data.authors);
      commit('stopLoading');
    });
  },
},
```
Một vài test nhanh của developer, Alex rất vui khi nó hoạt động và triển khai ngay trên staging. Ngày hôm sau, một báo cáo lỗi xuất hiện trên trang này, dữ liệu này đã được sử dụng, một spinner được nhìn thấy lúc đầu, nhưng sau đó nó biến mất, hiển thị một màn hình trống sắp xếp sai. Sau đó, vài giây sau, nội dung xuất hiện và mọi thứ đều ổn.<br>
    Alex cố gắng tái hiện vấn đề này. Sau nhiều lần thử, vấn đề được tái hiện lại và Vue devtools hiển thị như sau:<br>
    ![](https://images.viblo.asia/d1146ab4-a52f-402f-8423-2d5e20fcde8e.png)
    **Vuex tab in Vue devtools.**
Alex sử dụng time-travel debugger để xem chu kỳ các mutations trong quá khứ và trả về state gây ra sự cố trên.<br>
    Alex nhận ra điều đơn giản rằng cờ loading boolean không hoạt động cho nhiều requests không đồng bộ; lịch sử cho thấy rõ ràng rằng 2 actions có mutations xen kẽ.<br>
    Cho dù bạn có tin rằng đó là lỗi mà bạn có thể phát hiện ra trong code hay không, chắc chắn time-travel debugging do Vuex cung cấp là một công cụ theo dõi cực kỳ mạnh mẽ. Nó có thể cung cấp một chuỗi các sự kiện sửa đổi state nhờ vào khái niệm mutations của nó.<br>
    Một khía cạnh khác của mutations góp phần vào transactional nature của chúng là các functions thuần túy. Hơn một vài nhà phát triển tại một số điểm đã hỏi...<br>
    *Tại sao mutations không thể access vào getters?*<br>
Mutations chỉ nhằm mục đích nhận đầu vào thông qua payload của chúng và không tạo ra effects ở nơi khác. khác với actions, mutations chỉ có `state` và `payload`.<br>
    Trong khi debugging trong Vue devtools, payload cho mutation cũng được hiển thị.
###     An abstracted fix
Bây giờ Alex phải thực hiện một số thay đổi đối với code để hỗ trợ nhiều API requests đồng thời. Dưới đây là những mutations có liên quan hiện tại:
```
state: { loading: false },
mutations: {
  startLoading(state) {
    state.loading = true;
  },
  stopLoading(state) {
    state.loading = false;
  },
},

```
Đây là một giải pháp mà không yêu cầu bất kỳ thay đổi nào đối với actions:
```
state: { loading: 0 },
mutations: {
  startLoading(state) {
    state.loading += 1;
  },
  stopLoading(state) {
    state.loading -= 1;
  },
},
```
Nếu giao diện của mutation này đã được thiết lập `setLoading`, như đã đề cập trước đó, điều đó có thể có nghĩa là sửa lỗi sẽ phải thay đổi code committing trong actions, hoặc nếu không thì đưa ra một giao diện làm xáo trộn underlying functionality.<br>
    Không phải anti-pattern nghiêm trọng, nhưng đáng để chỉ ra rằng nếu dev coi các mutations là một layer không trừu tượng, thì nó làm giảm trách nhiệm của layer đó. Nếu mỗi mutation là một phép gán với `set<Property>`, ví dụ `setName` từ đầu bài viết này sẽ là bao nhiêu store code looks và devs sẽ thất vọng.
### Battling boilerplate
Quay lại ví dụ `setName`, một trong những câu hỏi xuất hiện khi bắt đầu với Vuex là, mutations có nên được bao bọc trong các actions không? Đầu tiên, store cung cấp external `commit` API và sử dụng nó không phủ nhận lợi ích mutations trong các devtools. Vậy tại sao phải bọc chúng?<br>
    Như đã đề cập,mutations là pure functions và đồng bộ. Chỉ vì nhiệm vụ cần thiết ngay bây giờ có thể được xử lý thông qua các mutations không có nghĩa là vào tháng tới, tính năng này cần nhiều hơn nữa. Bao bọc các mutations trong actions tạo cơ hội cho sự phát triển trong tương lai mà không cần phải thay đổi tất cả code gọi đến - rất giống với khái niệm trừu tượng hóa Alex sửa.<br>
    Tất nhiên, biết lý do tại sao nó không loại bỏ code frustration boilerplate gây bực bội cho devs. Làm thế nào nó có thể reduced? Chà, một giải pháp rất gọn gàng mà Vuex Pathify đưa ra: nó cố gắng tạo ra một store bằng cách sử dụng ít code nhất có thể, một API ngắn gọn có cách tiếp cận cấu hình theo quy ước mà nhiều dev đã làm. Một trong những tuyên bố nổi bật nhất trong phần giới thiệu là:<br>
```
make.mutations(state)
```
Điều này tự động tạo ra các mutations `set<Property>` trực tiếp từ state, điều này chắc chắn loại bỏ boilerplate, nhưng cũng loại bỏ bất kỳ giá trị nào mà lớp mutation có thể có.
### Benefits of actions
Actions rất mở; Ở đó, không có gì được thực hiện trong actions mà không thể được thực hiện bên ngoài store, đơn giản là các actions đó được tập trung trong store.<br>
Một số khác biệt giữa actions và bất kỳ loại function nào bạn có thể khai báo bên ngoài store:<br>
1. Actions có thể được đặt trong một module, cả khi gửi chúng và trong bối cảnh chúng có sẵn<br>
2. Actions có thể bị chặn thông qua `subscribeAction` store API<br>
3. Actions là promisified bởi default theo cách tương tự như function async<br>
Hầu hết các functionality này rơi vào khu vực convenience và convention.
### Where does async/await fit in here?
Những thứ này có thể được sử dụng ngay bây giờ cho các actions. Dưới đây là ví dụ về `loadBooks` trông như thế nào với async/await:<br>
```
actions: {
  async loadBooks({ commit }) {
    commit('startLoading');
    const response = await get('/api/books');
    commit('setBooks', response.data.books);
    commit('stopLoading');
  },
},
```
Nhưng đây không phải là functionally tương đương - có một sự khác biệt tinh tế. Đây là functionally tương đương như sau:
```
actions: {
  loadBooks({ commit }) {
    commit('startLoading');
    return get('/api/books').then((response) => {
      commit('setBooks', response.data.books);
      commit('stopLoading');
    });
  },
}
```
Từ khóa quan trọng cần chú ý là `return`. Điều này có nghĩa là promise được trả về bởi action đang chờ đợi promise bên trong kết thúc. Điều này liên quan đến việc phát hiện bắt đầu và kết thúc một action.<br>
Phiên bản non-async/await action, mà không phải trả lại promise bên trong, không có cách nào để code gọi phát hiện ra nó kết thúc. Promise bên trong vẫn hoạt động không đồng bộ khi action đã trở lại mà không có gì.
### Mutation granularity
Nếu hầu hết mutations (không phải tất cả) là one-liner functions, thì có thể là atomic, transactional mutation có thể chỉ đơn giản là một câu lệnh mutating đơn lẻ (ví dụ: assignment). Vì vậy, mutations trong devtools có thể trông như thế này:<br>
1.`state.loading = true;`<br>
2. `state.loading = true;`<br>
3.`state.books = […];`<br>
4.`state.loading = false;`<br>
5.`state.authors = […];`<br>
6`state.loading = false;`<br>
Tuy nhiên, với một khối lượng lớn actions chạy song song, điều này có thể gây nhầm lẫn và nếu không có các tên có ý nghĩa mà mutations hiện đang cung cấp, có thể khó debug.<br>
### Tying mutations to actions
new mutaction của chúng tôi có thể giống như:<br>
```
mutactions: {
  async loadBooks({ state }) {
    state.loading += 1;
    const response = await get('/api/books');
    state.books = response.data.books;
    state.loading -= 1;
  },
}
```
Vì vậy, mutating làm thay đổi giá trị của `state.loading` sẽ tạo ra một vaì log entry trong devtools.
**Link bài viết gốc**: https://blog.logrocket.com/vuex-showdown-mutations-vs-actions-f48f2f7df54b/