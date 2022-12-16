Một trong những vấn đề khó giải quyết trong các ứng dụng giao diện người dùng lớn là quản lý store.

Mặc dù có một số cách tiếp cận để giải quyết các vấn đề về quản lý state, Redux và MobX là hai trong số các thư viện bên ngoài phổ biến nhất giải quyết vấn đề quản lý state trong các ứng dụng giao diện người dùng.

Hãy cùng xem qua Redux và Mobx

### Redux

Dan Abramov và Andrew Clark đã phát triển redux. Lần đầu tiên nó được phát hành vào năm 2015. Nó được viết bằng JavaScript. Nó chủ yếu được sử dụng với các thư viện để xây dựng giao diện người dùng cho các công nghệ front-end như React, angle, v.v. Nó hỗ trợ đa nền tảng.
Redux có thể được sử dụng với React. Redux rất đơn giản nếu bạn biết về Flux hoặc bạn đã phát triển một thứ gì đó trên Flux.
Redux chủ yếu được sử dụng khi một lượng dữ liệu hợp lý được thay đổi theo thời gian. Nếu dữ liệu không thay đổi thường xuyên, thì việc sử dụng Redux sẽ ít hơn. Nó được sử dụng như một mẫu để quản lý state ứng dụng.
Một số thư viện hoặc công nghệ front-end như React có quản lý trạng thái ứng dụng của riêng họ, vì vậy trong khi sử dụng các thư viện này, người ta nên tìm hiểu các khả năng sẵn có của nó. Đôi khi sau khi phát triển ứng dụng, việc hiểu và viết code trở nên phức tạp; thật khó để biết state đã được thay đổi như thế nào. Trong trường hợp này, Redux rất hữu ích và được sử dụng.

Các nguyên tắc cốt lõi của Redux bao gồm những điều sau:

- Redux có một store duy nhất.
- State trong store là không thay đổi
- Các hành động gọi ra các thay đổi đối với store
- Trạng thái cập nhật reducer

### Mobx

Michel Weststrate đã phát triển mobx. Lần đầu tiên nó được phát hành vào năm 2015. Nó chủ yếu được viết bằng JavaScript. Ở một state, như mảng, tham chiếu, đối tượng được coi là ô dữ liệu của ứng dụng.
Các hành động sửa đổi state và Mobx đảm bảo rằng tất cả các thay đổi cần được xử lý đồng bộ.
Mobx có thể chạy trên mọi môi trường ES5. Nó hỗ trợ node.js ,hino và tất cả các trình duyệt ngoại trừ IE8. Mobx thường bao gồm state, derivations, reactions, và actions.
Một điều cần chú ý là Mobx không phải là một framework vì nó không biết cách cấu trúc code của bạn, cách xử lý và lưu trữ dữ liệu. Mobx có thể được áp dụng cho bất kỳ môi trường JS hiện đại nào.

Một số nguyên tắc cốt lõi của MobX bao gồm:

- MobX có thể có nhiều store lưu trữ state của một ứng dụng
- Bất kỳ thứ gì bắt nguồn từ state mà không có bất kỳ tương tác nào khác đều là derivation
- Hành động là bất kỳ đoạn code nào thay đổi trạng thái
- Tất cả các derivation cập nhật tự động khi state thay đổi

### Những khác nhau căn bản giữa Redux và Mobx

![](https://images.viblo.asia/c0e01acd-106d-49ba-8825-c8b262465411.png)
![](https://images.viblo.asia/93f7c1bd-a428-442a-bd5a-70d47be0fb7c.png)

#### Store
Trong Mobx, các state có thể bị ghi đè, còn được gọi là state không tinh khiết vì trạng thái có thể được cập nhật đơn giản với các giá trị mới. Trong Redux, state được gọi là state thuần túy vì các state ở chế độ chỉ đọc và không thể bị ghi đè một cách đơn giản. Nó có nghĩa là nó sử dụng một trạng thái bất biến.

MobX, tuy nhiên, cho phép nhiều store. Bạn có thể tách các store một cách hợp lý để tất cả trạng thái của ứng dụng không nằm trong một store. Hầu hết các thiết kế ứng dụng có ít nhất hai store: một cho trạng thái giao diện người dùng và một hoặc nhiều cho trạng thái domain. Ưu điểm của việc tách các store theo cách này cho phép sử dụng lại domain trong các ứng dụng khác. Và, store giao diện người dùng sẽ dành riêng cho ứng dụng hiện tại.

Trong Redux, chỉ có một store duy nhất. State trong store là không thay đổi, điều này giúp dễ dàng biết vị trí cần tìm dữ liệu / state hơn. Trong Redux, mặc dù có một đối tượng JSON đại diện cho store, chúng ta luôn có thể chia code thành nhiều reducer. Bằng cách này, chúng ta có thể tách các mối quan tâm một cách hợp lý với nhiều bộ reducer.

Đây là cách tiếp cận trực quan hơn cho nhiều nhà phát triển vì họ luôn có thể tham chiếu đến một store duy nhất cho state của ứng dụng và không có khả năng trùng lặp hoặc nhầm lẫn liên quan đến state hiện tại của dữ liệu.

#### Data structure

Trong Mobx, dữ liệu chưa chuẩn hóa có thể được giữ lại. Trong Redux, chủ yếu, dữ liệu được lưu giữ chỉ là dữ liệu chuẩn hóa.

Mobx chủ yếu sử dụng một dữ liệu có thể quan sát được để lưu trữ. Redux chủ yếu sử dụng các đối tượng javascript để lưu trữ dữ liệu.

#### Cộng đồng

Mobx có ít cộng đồng trực tuyến và hỗ trợ nhà phát triển hơn so với Redux. Redux đi trước nhà phát triển và hỗ trợ cộng đồng trực tuyến hơn Mobx.

Liên quan đến cộng đồng nhà phát triển, Redux đã thành công. Redux đi kèm với Redux DevTools được hàng nghìn nhà phát triển sử dụng. Nó cung cấp hỗ trợ đáng kinh ngạc cho việc gỡ lỗi mã Redux.

MobX cũng cung cấp các công cụ dành cho nhà phát triển, nhưng chúng không có cùng chất lượng hỗ trợ gỡ lỗi mà Redux cung cấp.

Số liệu thống kê của GitHub là một dấu hiệu tốt về sự tham gia của cộng đồng cho cả hai thư viện: Redux có khoảng 56 nghìn sao, với hơn 800 cộng tác viên. Mặt khác, MobX có khoảng 24k sao và 260 cộng tác viên.

Nếu chúng ta xem xét các lượt tải xuống từ npm, Redux đang dẫn đầu. Redux trung bình có 5 triệu lượt tải xuống mỗi tuần, trong khi MobX trung bình có khoảng 655k lượt tải xuống mỗi tuần.

#### Tính dễ mở rộng

Vì Redux kiên quyết hơn và mong đợi các chức năng giảm thiểu thuần túy, nên nó dễ mở rộng hơn MobX. Bản chất kiên định và thuần khiết của Redux cho phép khả năng mở rộng của nó.

Các hàm thuần túy dễ kiểm tra hơn vì chúng có thể dự đoán được và đơn giản, dẫn đến code có thể bảo trì, có thể mở rộng. Đây là một trong những lợi ích cốt lõi của việc chọn Redux thay vì MobX.

#### Một số mặt khác

Trong Mobx, các cập nhật có thể được thực hiện tự động với sự trợ giúp của một thuộc tính có thể quan sát được. Trong Redux, các bản cập nhật cần phải theo dõi thủ công.

Trong Mobx, việc gỡ lỗi rất khó thực hiện vì các công cụ có sẵn cho Mobx không đạt tiêu chuẩn và dẫn đến các phản hồi không thể đoán trước nhiều lần. Đối với Redux, có rất nhiều công cụ dành cho nhà phát triển; các chức năng thuần túy và ít trừu tượng hơn giúp gỡ lỗi dễ dàng hơn. Phản ứng cũng có thể dự đoán được với việc sử dụng mô hình Flux.

Mobx dễ học hơn và có cách học đơn giản. Nếu ai đó biết khái niệm OOPs, thì việc học Mobx đối với các nhà phát triển javascript rất dễ dàng. Redux rất khó học, nó tuân theo mô hình lập trình chức năng, đòi hỏi nhiều nỗ lực để nắm bắt mọi thứ.

Trong Mobx, có rất nhiều trừu tượng tích hợp ở đó, dẫn đến ít code hơn. Trong Redux, có ít sự trừu tượng hơn và cần phải viết nhiều code hơn.

Mobx chủ yếu được sử dụng để phát triển ứng dụng nhanh chóng và trong thời gian ngắn hơn. Các ứng dụng do Redux phát triển thường mất thời gian vì độ phức tạp của chúng.

Mobx ít có khả năng bảo trì hơn. Redux dễ bảo trì hơn.

Cảm ơn và hi vọng bài viết có ích trong công việc của bạn.

Bàu viết được tổng hợp từ các nguồn:
- https://mobx.js.org
- https://blog.logrocket.com/redux-vs-mobx/#what-is-redux
- https://www.educba.com/mobx-vs-redux/