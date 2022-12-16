Như chúng ta đã biết Vuejs, cho đến thời điểm hiện tại Vuejs là một framework mạnh mẽ được tin tưởng và sử dụng bởi rất nhiều công ty cũng như các anh em developer chúng ta hiện nay. Trong đó, Vuex được biết đến như một thư viện giúp bạn quản lý trạng thái các component trong VueJS, đây cũng là nơi lưu trữ tập trung cho tất cả các component trong một ứng dụng với nguyên tắc trạng thái chỉ có thể được thay đổi theo kiểu có thể dự đoán.

Và để trả lời cho câu hỏi ngày hôm nay chúng ta cùng tìm hiểu một chút nhé :

# Tại sao chúng ta lại sử dụng Vuex ???

Như phần đầu đề, chúng ta đều biết, vuex là một hệ thống để quản lí các state. Và để hiểu xem mục đích của Vuex là gì chúng ta cần hiểu rõ các khái niệm về data flow trong Single Page App nhé. Cùng xem tấm hình quốc dân nào :

![](https://images.viblo.asia/f110a4b8-3e2c-4654-927d-17beddbbd322.png)

Như trong hình vẽ, thì về cơ bản, state chính là các data mà các components của chúng ta dựa vào. Data của chúng ta có thể là các bài post trong một trang báo, hay là các users trong một danh sách, ... Các dữ liệu này được gọi là state và môĩ component của vue đều chỉ được phép có một cái.

Khi phát triển ứng dụng, thì chắc chắn về sau, chúng ta sẽ có sự gia tăng đáng kể của các components. Nếu như chúng ta không sử dụng một thư viện quản lí các state như Vuex thì mỗi component của chúng ta sẽ  quản lí một state của riêng nó bằng cách sử dụng các API Vue.js.

![](https://images.viblo.asia/f338a242-011f-45d2-98df-fa53ea85ca13.png)

Theo kiến trúc của Vue thì các components cha - con giao tiếp với nhau thông các **props** và giao tiếp giữa con - cha thì thông qua **events**. Luồng data sẽ đi từ trên xuống dưới, nhưng thử tưởng tượng một ngày chúng ta cần truyền từ thằng cha đến tít tận thằng con cuối cùng, thì công việc của chúng ta khá là nặng truyền từ cha đến con gần nhất, lần lượt cho đến khi nào đến component cần truyền.

Công việc này tốn công sức và có thể xảy ra sai sót, đây chính là lí do vì sao mà Vuex lại xuất hiện. Vuex sẽ có một nơi gọi là store và quản lí tất cả các state của bạn trong này, tất cả các state đều phải tuân thủ theo một mô hình quản lí chung nhất và giao tiếp theo sự quản lí của vuex.

![](https://images.viblo.asia/5d8bd2ea-f7f8-45c0-b1f0-96bcd8c77a8b.png)

Bây giờ thì chắc chúng ta cũng hiểu sơ sơ qua tại sao lại phải sử dụng Vuex rồi đúng không, giờ tiếp tục đi giả quyết vấn đề : liệu chúng ta có nên quản lí state bằng Vue ?

# Kích thước của product 
Mình thường nghe mọi người nói là khi product của chúng ta phát triển hơn nữa, thì chắc chắn sẽ phải sử dụng Vuex. Nhưng theo mình nghĩ thì cho dùng nó có phát triển như thế nào đi chăng nữa thì điều quan trọng nhất vần là luồng dữ liệu và cách mà ứng dụng của chúng ta phát triển. 

Chúng ta vẫn có thể truyền data bằng cách sử dụng props và events mà không cần phải sử dụng thêm Vuex.

Mặt khác, nếu như chúng ta nhận thấy ngay từ đầu, dự liệu này cần được chia sẻ ở nhiều nơi thì ngay lập tức, bạn nên ngừng việc share bằng props và events, thay vào đó là sử dụng Vuex. Điều này sẽ giúp chúng ta rất nhiều trong viêcj tiết kiệm thời gian, chỉ cần nhớ một điều là khi chuyển sang Vuex thì chúng ta lại càng phải cấu trúc nhiều hơn.

# Chúng ta nên chú ý đến logic và độ phức tạp của dữ liệu

Khi làm việc thì chắc chắn chúng ta sẽ dính phải những vấn đề mà cần triển khai logic phức tạp, điều này bắt buộc chúng ta phải tách khối phức tạp này ra, đặc biệt là nếu logic này  có liên quan đến các component khác. Điển hình là chức năng mà chúng ta hay làm nhất, cần có nhất của mỗi ứng dụng - authentication.

Vuex là cách cơ bản nhất để chúng ta xử lí chức năng này. Mutation, getters và settsers sẽ hỗ trợ chúng ta trong việc xử lí các token, kiểm soát truy cập các route trong ứng dụng của chúng ta.

Vuex giúp ta tách hoàn toàn việc xử lí logic của việc authentication và đồng thời giúp chúng ta theo dõi luồng xác thực và data mà chúng ta truy cập vào.

# Vậy chính xác thì khi nào chúng ta cần Vuex :

Như trong doc đã nói :

```
Flux libraries are like glasses: you’ll know when you need them.
```
 Chúng ta chỉ dùng khi mà chúng ta biết là mình cần, khá là hay đúng không. Tuy nhiên, thì một số người lại cho rằng khi chúng ta nhận ra thì đã quá muộn , vì vậy mình sẽ lấy một sơ đồ ra, điều này mình nghĩ là sẽ giúp ích cho mọi người khá nhiều :
 
 ![](https://images.viblo.asia/51f1b62f-a9bc-4ef4-8610-92718f06a742.png)

# Tiếp nào, nếu có thể tại sao chúng ta nên bỏ qua Vuex 

Một trong những lý do chính khiến mọi người tránh Vuex là Vuex khá làdài dòng. Bởi nó cần phải tuân theo một khuôn mẫu để đảm bảo rằng những thay đổi đối với trạng thái của bạn xảy ra có chủ đích.

Mình có một cái so sánh nhẹ như sau:

![](https://images.viblo.asia/d91d8bd0-2041-4a18-aed9-6c8039d8ba04.png)

Khá là cồng kềnh đúng không, nếu như web của chúng ta là đơn giản thì tốt nhất là nên bỏ qua Vuex và sử dụng props với events.

Ngoài ra thì chúng ta cũng có thể sử dụng một số thư viện khác. Có thể nó sẽ cũng cấp ít hơn so với Vuex, cũng có khác nhau về cách sử dụng :
 - https://github.com/posva/pinia
 - https://github.com/hankchizljaw/beedle
 - https://github.com/alexander-heimbuch/redux-vuex
 - https://github.com/andrewcourtice/harlem

Cũng khá là hay cho những ai muốn vọc thử cái mới.

Ngoài ra, Vue cũng cho phép bạn chuyển dữ liệu trong toàn bộ ứng dụng của mình thông qua bus event. Bạn có thể đọc bài viết này để biết hướng dẫn chi tiết về cách thực hiện việc này: https://blog.logrocket.com/using-event-bus-in-vue-js-to-pass-data-between-components/ .
#  Kết luận 
Không còn nghi ngờ gì nữa, Vuex là một công cụ tuyệt vời. Tuy nhiên thì sức mạnh càng lớn đi kèm trách nhiệm càng lớn. Một trong những trách nhiệm này là hiểu được sức mạnh của nó và quyết định được có sử dụng nó hay không hay chúng ta sẽ phải trả giá là có một source code phức tạp hơn.

Hầu hết các ứng dụng đơn giản hiện nay đều sử dụng props và events sẵn có của Vue. Các ứng dụng này sẽ có xu hướng trở nên phức tạp hơn nhiều nếu chúng ta thêm sử dụng thêm Vuex. 

Lần tới khi bạn làm việc với dự án có sử dụng Vue, hãy đảm bảo rằng bạn thực sự suy nghĩ kĩ trước khi quyết định xem có cần Vuex không nhé :+1::+1::+1:.