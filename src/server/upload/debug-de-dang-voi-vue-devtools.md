# I. Giới thiệu
Thông thường khi debug trong ứng dụng Vuejs, chúng ta vẫn đang sử dụng console.log() để phát hiện lỗi và sửa. Tuy  nhiên Vue có một plugin chuyên dụng để debug, giúp chúng ta tăng tốc độ phát triển đáng kể. Nó không có nhiệm vụ thay thế cho console.log(), nó chỉ bổ sung thêm cho chúng. Nó được gọi là Vue DevTools, và sau đây là 3 chức năng bạn có thể sử dụng nó để có thể tăng tốc độ phát triển ứng dụng Vue của bạn.
# II. Cài đặt Vue DevTools Plugin
Trước khi chúng ta bắt đầu đi vào hướng dẫn sử dụng, có 3 phiên bản DevTools mà bạn có thể cài đặt tuỳ theo môi trường của bạn đang sử dụng. Có một plugin cho Chrome, một addon cho Firefox, và thậm chí còn có 1 ứng dụng Electron (chạy được trên cả Mac, Linux, và Windows).

Nhấn vào đây để xem hướng dẫn cài đặt cụ thể cho từng phiên bản của plugin trên Github của nó nhá. Sau khi bạn đã cài đặt xong, hãy mở 1 trang viết bằng VueJS, sau đó mở developer tools, tab Vue lên để thấy Vue DevTools nhé !

OK, giờ chúng ta bắt đầu đi tìm Ai là Triệu Phú, Let’s go !!! À quên, giờ chúng ta bắt đầu đi vào tìm hiểu 3 chức năng để có thể debug với Vue DevTools !

## 1.Live-edit data component

Ồ, một tính năng rất WOW với Vue DevTools là có thể live-edit data của component. Điều này cho phép bạn nhanh chóng kiểm tra các case, các biến thể từ component mà bạn đang code.

Bạn không cần ở trong IDE của bạn, không cần ở trong editor của bạn để edit một cách thủ công dữ liệu ấy nữa. Thay vào đó, chức năng này giúp cho bạn cho phép bạn bỏ qua công đoạn : sửa – alt tab – refresh – xem change – sửa – alt tab -refresh – xem change – sửa – …. => Và cuối cùng sẽ tăng tốc độ phát triển của bạn lên kha khá đó.

![](https://images.viblo.asia/7c968d99-f4aa-433d-90e6-8488c226bff9.png)

Để có thể live-edit data, trước tiên hãy click vào component bạn muốn edit trong tab Components của Vue DevTools. Sau khi click vào đó, bạn sẽ thấy 1 tab data xuất hiện ở bên phải, với tất cả data mà bạn có thể truy cập (như props hay state). Bạn có thể edit chúng như nào cũng được, ví dụ như edit text, đổi true false, tăng number, thậm chí có thể thêm một element vào array,…

Live-edit data thậm chí vẫn có thể hoạt động khi bạn sử dụng remote API để fetch data về và gắn vào state hay props. Khi data của bạn được fetch về , nó sẽ có sẵn để bạn chỉnh sửa trong tab data panel đó.

## 2.Debug Vuex với Time Travel

Tiếp tục đến chức năng thứ 2, các bạn khi nghe đến Time Travel có thể nghĩ ngay đến việc du hành thời gian của The Flash ấy. Ở đây cũng là như vậy, Vue DevTools đã tích hợp với Vuex một cách hoàn hảo để cho ra chức năng này.

Vuex là một thư viện state management, là nơi lưu trữ toàn bộ state dưới dạng tập trung cho tất cả component trong ứng dụng Vuejs của bạn. State trong store của Vuex là ở dưới dạng immutable, bạn phải thay đổi state bằng cách tạo một phiên bản mới cho state đó (mutate), chứ không thể trực tiếp sửa đổi giá trị của nó.

Điều này cho phép bạn cái mà được biết đến là Time Travel debugging , giúp bạn chuyển qua các trạng thái trước đó, trong quá khứ của các state trong Vuex

![](https://images.viblo.asia/a6d5aba6-9008-4925-9121-feeb86daaac2.gif)

Để truy cập vào chức năng này, đầu tiên hãy click vào phần Vuex (hình đồng hồ thời gian). Tại đây bạn có thể đi qua hết các mutations mà đã xảy ra trên ứng dụng của mình. Sau khi hover vào một mutations, hãy click vào Time Travel để quay lại trạng thái đã chỉ định.

Một tính năng tiện lợi khác trên Vue DevTools dành cho Vuex chính là nhập và xuất toàn bộ các state trên ứng dụng của bạn. Điều này có thể giúp ích để debug trong trường hợp mà user đang gặp phải, nhưng bạn không có khả năng để tái hiện nó.

## 3.Tracking custom event trong ứng dụng

Nếu bạn đang sử dụng event trong ứng dụng mà bạn code, bạn có thể tracking chúng trong tab Events.

Chức năng này cho phép bạn tracking những event trong ứng dụng, nhưng nó chỉ hiển thị những custom event. Ví dụ event mà bạn tự emit với this.$emit(‘myEvent’) , chứ ko phải những native event như là on:click, on:keyup,…

![](https://images.viblo.asia/8c438683-2e10-4c0b-ab4a-5ae8b7ba9d64.png)

Để bắt đầu chức năng này, click vào tab Events trong Vue DevTools. Sau đó, click vào nút Record và bạn sẽ thấy những custom event xuất hiện ở phía bên trái khi mà bạn test ứng dụng của mình.

III. Kết luận

Dưới đây là ba chức năng cơ bản mà bạn có thể sử dụng để debug dễ dàng hơn, giúp tăng tốc độ phát triển ứng dụng của mình. Ngoài ra, nó còn có rất nhiều chức năng hay ho, có thể giúp bạn trong quá trình debug Vuejs.

Để tìm hiểu sâu và chi tiết hơn, cụ thể hơn những gì bạn có thể làm được với Vue DevTools, bạn có thể đọc What’s New in Vue DevTools 4.0 đã được publish trên The Vue Point.

link tham khảo: https://medium.com/vue-mastery/how-to-use-the-vue-devtools-af95191ff472