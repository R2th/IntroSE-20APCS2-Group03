![](https://images.viblo.asia/ec2b7491-5859-48d1-b741-44da2f0b4842.png)<br>
Gần đây tôi có những cuộc nói chuyện về nhiều cách khác nhau mà người ta có thể quản lý state trong ứng dụng Vue.js. Nhận thấy rất nhiều các nội dung tôi vừa chia sẻ có thể có ích nên tôi đã chuẩn bị bài viết này để tóm tắt phần lớn cách chúng ta có thể suy nghĩ về quản lý state (ví dụ: dữ liệu) trong một ứng dụng Vue.<br>
### Quản lý state
Vue components là các khối xây dựng của ứng dụng Vue bằng cách cho phép chúng ta couple markup (HTML), logic (JS) và styles (CSS) trong chúng.<br>
Ở đây, một ví dụ về một Single-File component hiển thị một chuỗi các số từ data property:
{@gist: https://gist.github.com/djirdehh/14c7760872bea6bcef866cf8c7908578}
Mỗi Vue component chứa một hàm *data()* để *reactive*. Nếu một giá trị *data()* property sử dụng trong template thay đổi, component view sẽ re-render để hiển thị thay đổi.<br>
Trong ví dụ trên, *numbers* là mảng được lưu trữ trong hàm *data()*. Điều gì xảy ra nếu *numbers* là một giá trị dữ liệu cần được *accessed* từ một component khác? Ví dụ, chúng ta có thể cần một component chịu trách nhiệm trong việc hiển thị *numbers* (như trên) và phần khác để thao tác giá trị của *numbers*.<br>
Nếu chúng ta muốn chia sẻ *numbers* giữa nhiều components, *numbers* không chỉ trở thành dữ liệu cấp component mà còn là dữ liệu cấp ứng dụng. Điều này đưa chúng ta đến chủ đề **State Management** - quản lý dữ liệu cấp ứng dụng.<br>
Trước khi chúng ta giải quyết làm thế nào có thể quản lý state trong một ứng dụng, chúng ta sẽ bắt đầu bằng cách xem cách **props** và **custom events** có thể chia sẻ dữ liệu giữa các components cha và con.<br>
### Props và Custom Events
Giả sử chúng ta có một ứng dụng giả thuyết, lúc đầu chỉ chứa một component cha và một component con. Giống như các front-end frameworks khác tồn tại, Vue cho chúng ta khả năng sử dụng **props** để truyền dữ liệu từ cha xuống cho con.<br>
![](https://images.viblo.asia/26c8b9cd-4b97-42d0-bf2b-3d4e580eceea.png)<br>
Sử dụng props khá đơn giản. Tất cả những gì chúng ta cần làm là bind một giá trị với thuộc tính prop trong đó component con được rendered. Ở đây, một ví dụ về việc sử dụng props để truyền một loạt các giá trị xuống với sự trợ giúp của chỉ thị **v-bind**:<br>
{@gist: https://gist.github.com/djirdehh/54338eca8eeef1db8a42cef78ddfa01e#file-parentcomponent-vue}
{@gist: https://gist.github.com/djirdehh/213454222eb3b3a05a99edf230ae28ed#file-childcomponent-vue}
**ParentComponent** chuyển mảng *numbers* dưới dạng props cùng tên xuống **ChildComponent**. **ChildComponent** chỉ đơn giản là binds giá trị của *numbers* trên template của nó với sự trợ giúp của **Mustache syntax**.<br>
Dưới đây, một ví dụ về CodeSandbox ở trên:<br>
[https://codesandbox.io/s/github/fullstackio/awesome-fullstack-tutorials/tree/master/vue/managing_state_01/props?from-embed](https://codesandbox.io/s/github/fullstackio/awesome-fullstack-tutorials/tree/master/vue/managing_state_01/props?from-embed)<br>
**Lưu ý**: Tất cả các ví dụ code đang chạy trong bài viết này được cung cấp trong một dự án webpack bundled dựa trên vue-cli template. Code mà chúng ta viết sẽ chỉ phù hợp với thư mục `src/` của các dự án.<br>
> => #1: props có thể được sử dụng để truyền dữ liệu từ components cha xuống components con.
> 
Điều gì xảy ra nếu chúng ta cần tìm cách truyền đạt thông tin theo hướng ngược lại? Một ví dụ về điều này có thể cho phép người dùng giới thiệu một số mới cho mảng được trình bày trong ví dụ trên từ component con.<br>
Chúng ta không thể sử dụng `props` vì `props` chỉ có thể được sử dụng để truyền dữ liệu theo định dạng đơn hướng (từ cha xuống con đến cháu). Để tạo điều kiện cho component con thông báo cho cha  về điều gì đó, chúng ta có thể sử dụng Vue **custom events**.<br>
![](https://images.viblo.asia/4bc64daf-0d86-453e-834b-a6c749d1a014.png)<br>
Custom events trong Vue hoạt động rất giống với custom events trong JavaScript nhưng có một điểm khác biệt - **Vue custom events được sử dụng chủ yếu để liên lạc giữa các components thay vì giao tiếp giữa các nút DOM**.<br>
Ở đây, một ví dụ về việc sử dụng custom events để `ChildComponent` có thể tạo điều kiện thay đổi `numbers` data property của `ParentComponent`:<br>
{@gist: https://gist.github.com/djirdehh/9218a88ca2c0161c05c2229281b81621#file-childcomponent-vue}
{@gist: https://gist.github.com/djirdehh/6dd40a015134558201b99bb5fa3bcea2#file-parentcomponent-vue}<br>
`ChildComponent` có đầu vào bắt một giá trị `number` và button emits một `number-added` custom event với giá trị `number` vừa bắt.<br>
Trên `ParentComponent`, trình nghe custom event được biểu thị bằng `@number-added`, được chỉ định nơi component con đang được rendered. Khi sự kiện này được emitted ở con, nó sẽ đẩy giá trị `number` từ sự kiện này sang mảng `numbers` của `ParentComponent`.<br>
> =>># 2: Custom events có thể được sử dụng để tạo giao tiếp từ components con đến components cha.
>
Chúng ta có thể sử dụng props để truyền dữ liệu xuống dưới và custom events để gửi tin nhắn lên trên. Làm thế nào chúng ta có thể truyền dữ liệu hoặc tạo điều kiện giao tiếp giữa hai sibling components khác nhau?
![](https://images.viblo.asia/8f1c4404-1245-44ad-8e41-7acd8dc54014.png)<br>
Chúng ta có thể sử dụng custom events theo cách chúng ta có ở trên vì các events đó được emitted trong interface của một component cụ thể và do đó, trình nghe custom event cần phải được khai báo ở nơi component được rendered. Trong hai components biệt lập, một component không được rendered bên trong component khác.
Có khoảng 3 cách chính để chúng ta có thể bắt đầu quản lý thông tin giữa các sibling components và kết quả là bắt đầu xử lý quản lý state trong toàn ứng dụng:
1. Sử dụng một global EventBus.
2. Sử dụng một simple global store.
3. Sử dụng thư viện flux-like Vuex.

Dưới đây mình chỉ giới thiệu EventBus còn Simple Global Store và Vuex các bạn tham khảo thêm trong bài viết gốc mà mình để link dưới nhé^^
#### EventBus
EventBus là một Vue instance được sử dụng để cho phép các components biệt lập subscribe và publish custom events với nhau.<br>
Đợi..., chúng ta chỉ nói các components biệt lập không thể kích hoạt và lắng nghe custom events với nhau? Thường là không thể, nhưng một EventBus giúp chúng ta đạt được điều này bằng cách trở thành `global` cho mục đích này.<br>
Dưới đây, một ví dụ về việc tạo một EventBus trong file `event-bus.js`:
{@gist: https://gist.github.com/djirdehh/adc4f2c816ba731acb7bcacc4b9624d9#file-event-bus-js}
Bây giờ chúng ta có thể sử dụng giao diện của EventBus để emit events. Giả sử chúng ta có một component `NumberSubmit` chịu trách nhiệm trong việc gửi một custom event khi click vào button. Custom event này là `number-added`, sẽ chuyển một giá trị do người dùng nhập vào từ ô input.<br>
{@gist: https://gist.github.com/djirdehh/3b9cc5a836a1b7a25f5c33ca20d571e7#file-numbersubmit-vue}
Bây giờ chúng ta có thể có một component bị cô lập hoàn toàn, `NumberDisplay` sẽ hiển thị danh sách các giá trị `number` và `listen` nếu một  new number được nhập vào `NumberSubmit`:
{@gist: https://gist.github.com/djirdehh/ce8008474da8fea57434fe9422d7f8ac#file-numberdisplay-vue}<br>
Chúng ta đã đính kèm EventBus listener, EventBus.$on trong created() của NumberDisplay component. Khi NumberSubmit emits sự kiện, nó sẽ truyền một giá trị number trong event object. NumberDisplay lắng nghe và đẩy new number đó vào mảng numbers data của nó.<br>
Điều này trả lời câu hỏi trong đầu chúng ta - Một EventBus có thể được sử dụng để tạo điều kiện giao tiếp giữa các sibling components:
![](https://images.viblo.asia/b8363a55-3cef-41b4-a150-51a92b3017fe.png)<br>
Lưu ý cách dễ dàng để thiết lập và sử dụng EventBus? Thật không may, một EventBus cũng mang đến một nhược điểm rõ ràng. Hãy tưởng tượng ứng dụng giả thuyết của chúng ta trông giống như thế này:<br>
![](https://images.viblo.asia/8a8f91d3-32d5-49f9-bbb4-7708599868b1.png)<br>
Giả sử tất cả các dòng trắng là props được truyền từ cha xuống cho tất cả con và các đường đứt nét màu vàng là các sự kiện được emits và listen từ và đến một component. Mỗi sự kiện này đều không được theo dõi và có thể bị fired từ bất cứ đâu trong ứng dụng của chúng ta. Điều này làm cho mọi thứ khó duy trì, có thể làm cho code xấu và gây ra nhiều bug.<br>
Đây là một trong những lý do chính là tại sao Vue style-guide states nói rằng EventBus không phải là cách tiếp cận được đề xuất để quản lý dữ liệu trên toàn ứng dụng.<br>
> =>># 3: EventBus là một cách dễ dàng để bắt đầu có tất cả các components giao tiếp với nhau nhưng không có quy mô tốt cho các ứng dụng từ trung bình đến lớn.
> 
#### Link bài viết gốc: <br>
https://medium.com/fullstackio/managing-state-in-vue-js-23a0352b1c87