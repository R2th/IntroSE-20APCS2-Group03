## Tổng quan

Thiết kế lại một front-end infrastructure đòi hỏi nhiều suy nghĩ, thảo luận, quyết định, lập kế hoạch, quản lý và thực hiện. Một trong những quyết định đầu tiên chúng ta phải đưa ra là chọn một front-end framework để thiết kế lại các sản phẩm của chúng ta lên tầm cao mới.

Chúng tôi đã nghiên cứu trong một vài tháng dài để đưa ra một quyết định tốt hơn về chủ đề nhạy cảm này; tiến hành thảo luận, xây dựng bằng chứng về các khái niệm, phỏng vấn các đồng nghiệp có kinh nghiệm liên quan ở các công ty khác và đọc hàng tấn tài liệu trực tuyến.

Trong bài viết này, tôi đã so sánh những ứng viên cuối cùng trong cuộc chạy đua cho framework tiếp theo mà chúng tôi sẽ xây dựng infrastructure của mình với: Angular, React và Vue.

## Mục đích

Mục tiêu là xây dựng một nền tảng mới, hiện đại, nhanh chóng và đáng tin cậy để phục vụ tất cả các ứng dụng front-end hiện tại và tương lai của chúng tôi.

## Các ứng cử viên

- React
- Vue
- Angular

### Angular

Angular đã bị loại bỏ sớm trong quá trình của chúng tôi vì hai lý do chính (một lý do chi tiết hơn có thể được đọc [ở đây](https://medium.com/fundbox-engineering/state-of-front-end-at-fundbox-ed3f6427f8e4?source=post_page---------------------------) tại mục  "Why move then?")::

Angular là framework hiện tại của chúng tôi, chúng tôi hiện đang sử dụng v1. Angular v2 được giới thiệu với nhiều cải tiến, nhưng nó không tương thích ngược. Điều đó có nghĩa là việc nâng cấp lên Angular mới nhất đòi hỏi những nỗ lực tương tự như chuyển sang bất kỳ framework nào khác. Do đó, động lực sử dụng Angular đã giảm đáng kể, trong toàn ngành khi các nhà phát triển đã thất vọng.

Angular đã phát triển để trở thành một framework lớn có thể hữu ích trong việc xây dựng các hệ thống phức tạp nhưng ít hữu ích hơn trong việc xây dựng các UI thay đổi nhanh khi khởi động. React và Vue có trọng lượng nhẹ hơn, và các component có xu hướng trở nên nhỏ, tự trị, đóng gói, do đó - dễ dàng tái sử dụng. Nếu chúng ta phát triển một infrastructure mới từ đầu (và không cần phải di chuyển từ cơ sở hiện có), chúng ta cũng có thể đã xem xét Angular. Trong trường hợp của chúng tôi, nó không phù hợp.

Nếu dù sao thì chúng tôi đang trên đường viết lại các phần quan trọng trong ứng dụng của mình, thì đó là một cơ hội tuyệt vời để tìm hiểu các công nghệ mới khi chúng tôi đi. Bằng cách này, chúng tôi có thể mở rộng kiến thức và làm phong phú thêm kinh nghiệm cho các nhà phát triển của chúng tôi.

## So sánh React và Vue

Sau khi loại Angular, chúng ta còn lại React và Vue và chúng tôi đã so sánh cách hai ngôn ngữ này thực hiện theo các tiêu chí sau:

### Learning curve
Framework có dễ dàng để học cho một nhà phát triển có kinh nghiệm?

### Code style
Mã nguồn và convention có dễ đọc và trực quan hãy không?

### Single file component
Việc tìm và bảo trì một component trong framework có trực quan hay không?

### Hiệu suất
Các ứng dụng được xây dựng bởi framework có hiệu suất cao không?

Kích thước các package và memory sử dụng của framework có lớn không?

### Tính mềm dẻo
Ngay từ đầu, framework cung cấp bao nhiêu tính năng?
Có bao nhiêu tính năng của nó là bắt buộc?
Việc customize (tuỳ chỉnh) framework có dễ dàng hay không?

### Các công cụ
Những công cụ có sẵn cho framework?
Có bao nhiêu plugin ổn định cho framework?

### Hỗ trợ ứng dụng điện thoại
Liệu framework có hỗ trợ nhiều ứng dụng khác ngoài web?
Liệu nó có cung cấp một cách để xây dựng các ứng dụng native dành cho di động?

### Cộng đồng
Cộng đồng của framework có lớn hay không?
Là cộng đồng thống nhất hay phân mảnh?

### Trưởng thành
Framework đã trưởng thành chưa?
Nó đã được kiểm thử trong bao lâu?
Tương lai của nó có rõ ràng hay không?

### Sự ủng hộ
Team đứng phía sau framework có lớn hay không?
Liệu có một công ty hay một tổ chức sở hữu framework đó không?

### Tuyển dụng nhân tài
Làm thế nào dễ dàng để thuê các nhà phát triển có kinh nghiệm về framework?

## Đường cong học tập

### React

Tài liệu chính thức của React cung cấp một vài hướng dẫn Bắt đầu được viết một cách khéo léo và đưa ra hướng dẫn rõ ràng cho người mới. Các nguyên tắc cốt lõi của framework có thể được hiểu trong vài giờ, bởi các nhà phát triển có một số kinh nghiệm về framework.

Tài liệu chính thức của React rất kỹ lưỡng, nhưng không rõ ràng và có tổ chức như tài liệu chính thức cho Vue. Các tài liệu bao gồm các luồng hạnh phúc cần thiết và sau đó một số chi tiết, nhưng vẫn còn các cạnh của khung bị thiếu trong tài liệu. Các cạnh này có thể chuyển đổi thành các điểm đau vì dự án sẽ lớn hơn.

React không phải là một khung hoàn chỉnh; nó dựa vào cốt lõi của nó và các thành phần khung nâng cao hơn phải được tìm kiếm như một gói của bên thứ ba. Điều này thêm một số phức tạp cho đường cong học tập vì nó khác nhau dựa trên các lựa chọn bạn thực hiện với khung trên đường đi.

### Vue

Thư viện Vue đơn giản có thể được tải dưới dạng tài nguyên của trang HTML; thông qua đó, toàn bộ thư viện có thể được sử dụng mà không cần bước xây dựng chỉ trong vài phút. Điều này phản ánh mức độ không phô trương của thư viện nói chung và cũng cho phép viết các ứng dụng Vue ngay lập tức.

Vì Vue chia sẻ một số khái niệm với cả React và Angular, các nhà phát triển chuyển đổi sẽ có một đường cong học tập dễ dàng hơn vào Vue. Cũng giúp thực tế là tài liệu chính thức cho Vue được viết rất tốt và bao gồm tất cả mọi thứ mà một nhà phát triển sẽ vấp ngã khi phát triển ứng dụng Vue.

Vue được định nghĩa chặt chẽ hơn React; điều đó cũng có nghĩa là nó được nhiều ý kiến hơn Điều đáng chú ý là trong Vue, nhiều câu hỏi được trả lời thẳng trong tài liệu, không cần phải tìm kiếm quá nhiều ở những nơi khác.

## Code Style

### React
React đã giới thiệu một loạt các khái niệm dựa trên lập trình chức năng giúp giảm bớt quá trình phát triển các ứng dụng đầu tiên UI. Điều đáng chú ý nhất:

JSX, đó là một cách viết HTML trong mã JavaScript. JSX là một bổ sung cho React là một người thúc đẩy mạnh mẽ của Lập trình hàm, và trong phạm vi đó, nó có ý nghĩa tuyệt vời.

Vòng đời thành phần của nó cung cấp một cách trực quan để kết nối với các sự kiện cụ thể trong vòng đời của một thành phần (sáng tạo, cập nhật, v.v.)

### Vue

Là một framework trẻ hơn cả React và Angular, Vue đã lấy những thứ tốt hơn từ mỗi loại, kết hợp giữa lập trình chức năng và OO.

Theo mặc định, phong cách mã hóa Vue có một chút tương tự ở một số khu vực với Angular nhưng cũng loại bỏ hầu hết các điểm đau của Angular. Vue tách HTML, JS và CSS, giống như các nhà phát triển web đã được sử dụng trong nhiều năm, nhưng nó cũng cho phép sử dụng JSX nếu bạn thích phong cách đó. Vì vậy, nó không lực lượng thay đổi phong cách mã của bạn.

Vue có thể sử dụng vòng đời thành phần đơn giản và trực quan hơn so với React. Nhìn chung, API Vue ván rộng hơn nhưng đơn giản hơn React.

## Single file component

### React

Với JSX, các thành phần tệp đơn trong React được viết hoàn toàn dưới dạng một mô-đun JavaScript và do đó, điều đó có nghĩa là React có cách viết HTML, CSS và JavaScript cụ thể.
Viết mọi thứ bằng JavaScript là một tính năng, và không phải là một lỗi vì nó giúp giảm bớt gánh nặng tạo HTML động bên trong các thành phần. Thay vào đó, người ta có thể sử dụng JavaScript vanilla để tạo các mẫu khi sử dụng JSX.

Điều đó nói rằng, cú pháp đặc biệt của React, đòi hỏi phải học hỏi và thực hành nhiều hơn để cảm thấy thoải mái với việc viết các thành phần trong React.

### Vue

Các thành phần tệp đơn trong Vue chia thành ba phần riêng biệt: `<template>`, `<script>` và `<style>` và mỗi phần chứa loại mã tương ứng và do đó, sẽ cảm thấy tự nhiên hơn khi chuyển đổi các nhà phát triển web.
    
Là một khung tiến bộ, Vue dễ dàng tùy biến. Ví dụ: với một cấu hình duy nhất, người ta có thể sử dụng JSX thay vì thẻ `<template>`.
    
Ngoài ra, như một ví dụ khác, chỉ bằng cách thêm thuộc tính lang = cảnh scss vào thẻ `<style>`, người ta có thể viết SCSS thay vì CSS đơn giản. Tương tự, bằng cách thêm thuộc tính phạm vi vào thẻ `<style>`, các thành phần Vue sẽ triển khai phạm vi CSS (a.k.a CSS Modules) ra khỏi hộp.
    
## Hiệu năng
    
### React

Kích thước thư viện (qua mạng / không nén): 32,5KB / 101,2KB

So sánh các thao tác DOM, hiệu suất tổng thể React lề là tuyệt vời. Nó nhanh hơn nhiều so với Angular nhưng chậm hơn Vue một chút.

React cung cấp hỗ trợ cho Kết xuất phía máy chủ (SSR) và có thể hữu ích cho một số loại triển khai.

Hỗ trợ tích hợp để bó và rung cây để giảm thiểu gánh nặng tài nguyên của người dùng cuối.

### Vue

Kích thước thư viện (qua mạng / không nén): 31KB / 84.4KB

Bên cạnh việc là người nhanh nhất trong nhóm, Vue cũng là một framework tiến bộ, được xây dựng từ đầu để có thể được áp dụng dần dần. Thư viện lõi chỉ tập trung vào lớp xem và dễ dàng chọn và tích hợp với các thư viện khác hoặc các dự án hiện có.

Tương tự như React, Vue có hỗ trợ tích hợp để bó và rung cây để giảm thiểu gánh nặng tài nguyên của người dùng cuối.

## Tính mềm dẻo

### React 

React tập trung vào UI, vì vậy điều cần thiết bạn nhận được là sự hỗ trợ của nó để xây dựng các thành phần hướng tới người dùng.

Những gì nó không cung cấp như một phần của thư viện chính thức React là các tính năng nâng cao hơn như quản lý nhà nước. Hầu hết các ứng dụng React đang sử dụng Redux để quản lý nhà nước và ngày nay, MobX cũng có được lực kéo như một người bạn đồng hành của React.

Ngay cả bộ định tuyến React không phải là gói chính thức, mà là gói của bên thứ ba, được hỗ trợ bởi nhóm React siêu.

### Vue

Là một khung tiến bộ, Vue cho phép chỉ sử dụng các tính năng cơ bản nhất của nó để xây dựng một ứng dụng, nhưng nếu cần, nó cũng cung cấp hầu hết mọi thứ bạn cần ngoài: Vuex cho quản lý nhà nước, Vue Router để quản lý URL ứng dụng, Vue Server- Trình kết xuất bên cho kết xuất phía máy chủ.

Vue được nhiều người quan tâm hơn React, vì điều tốt và điều xấu.

## Các công cụ

### React

React có một công cụ CLI của bên thứ ba được gọi là ứng dụng tạo phản ứng giúp dàn dựng các ứng dụng và thành phần mới trong dự án React.

Công cụ CLI cũng hỗ trợ khả năng chạy thử nghiệm đầu cuối và đơn vị, kiểm tra mã và máy chủ phát triển cục bộ.

React có sự hỗ trợ chính thức và cộng đồng tuyệt vời cho các IDE chính.

### Vue

Vue có một công cụ CLI chính thức được gọi là Vue CLI. Rất giống với ứng dụng tạo phản ứng phản ứng, công cụ Vue CLI cung cấp cho các ứng dụng mới.

Vue cũng hỗ trợ tốt cho tất cả các IDE quan trọng (không tốt bằng React, nhưng WebStorm và VSCode đều có).

## Hỗ trợ ứng dụng di động

### React

React có một cổng để xây dựng các ứng dụng di động gốc, nó có tên là React Native và nó là nhà lãnh đạo hiện tại của văn bản viết một lần (bằng JavaScript), sử dụng nhiều giải pháp (trong iOS và Android gốc) hiện nay.

Có rất nhiều ứng dụng được sản xuất bằng React Native.

### Vue

Đối với Vue, có nhiều hơn một tùy chọn để xây dựng các ứng dụng Mobile Native. Mặc dù, không giống như React Native, không có nhà lãnh đạo rõ ràng nào trong không gian Vue-Mobile-Native.

NativeScript là công cụ hàng đầu trong số các tùy chọn này (và nó cũng là một giải pháp hàng đầu cho Angular btw), nhưng cũng có cả Junx và Quasar.

## Cộng đồng

## React 

Trong StackOverflow, có gần 88.000 câu hỏi được gắn thẻ #reactjs

Có hơn 40.000 gói npm có sẵn để cài đặt cho các nhà phát triển React.

Trong các khảo sát công cụ mặt trước mới nhất, hơn 40% số người được hỏi đã bỏ phiếu họ cảm thấy thoải mái khi sử dụng React.

Trong GitHub, React repo có gần 100.000 sao.

Cộng đồng React thực sự có ý nghĩa hơn nhiều nhưng có nhược điểm là bị phân mảnh nhiều hơn Vue, và khó khăn hơn để tìm câu trả lời thẳng thắn cho các vấn đề phổ biến.

### Vue

Trong StackOverflow, có 18.000 câu hỏi được gắn thẻ #vue

Đối với Vue, có gần 10.000 gói npm có sẵn để cài đặt.

Trong các khảo sát mới nhất, 17% số người được hỏi đã bỏ phiếu họ cảm thấy thoải mái khi sử dụng Vue. Nhưng trên thực tế, gấp đôi số nhà phát triển quan tâm đến việc học Vue, so với React, vì vậy thị trường dành cho các nhà phát triển Vue có thể sẽ phát triển nhanh hơn Reactiến trong tương lai.

Repo Vue trong GitHub vừa vượt qua React và đạt hơn 100.000 sao.

Nhờ tài liệu tuyệt vời của nó, hầu hết các câu trả lời cho các vấn đề trong phát triển Vue có thể được tìm thấy trong tài liệu ngay lập tức, nhưng các câu trả lời của cộng đồng cũng phù hợp hơn.

## Trưởng thành

### React

React được phát hành vào tháng 3 năm 2013 (5 tuổi tại thời điểm viết bài).

Theo SameTech, React đang được sử dụng trên 205.000 tên miền duy nhất. Tăng trưởng 2,46% mỗi tháng.

React được thử nghiệm rất tốt trên sản xuất, hơn cả Vue. React đã xây dựng một cộng đồng rộng lớn, điều này có ý nghĩa với một chủ sở hữu như Facebook.

### Vue

Vue được phát hành vào tháng 2 năm 2014 (4 tuổi tại thời điểm viết).

Theo SameTech, Vue đang được sử dụng trên 26.000 tên miền duy nhất. Tăng trưởng 3,34% mỗi tháng.

Vue đã trở thành một tiêu chuẩn khoảng một năm rưỡi trước. Ngày nay nó được sử dụng rộng rãi, cũng tại một số công ty lớn hơn như GitLab, Alibaba, Yahoo và nhiều hơn nữa. Vue tỏ ra ổn định cả khi chạy và cập nhật.

## Tuyển dụng nhân tài

### React

Là framework phổ biến nhất hiện nay, React có lợi thế nếu bạn trong thị trường dành cho các nhà phát triển React.

Ngoài ra, bằng cách học React, các nhà phát triển sẽ có được một dòng có giá trị ngay lập tức vào CV của họ, vì họ sẽ có được kinh nghiệm quý giá với một khung phổ biến là React.

### Vue

Vue là sự nóng bỏng mới của người Viking trong ngành công nghiệp front-end. Tất nhiên, sự cường điệu cũng có một số nhược điểm, nhưng Vue đã đạt được lực kéo ổn định trong một thời gian dài và các nhà phát triển rất mong muốn có được một dự án Vue như là một phần của FOMO. Ngày nay, không có gì lạ khi tìm thấy các nhà phát triển có một số kinh nghiệm với Vue.

## Ưu điểm chung

### React

- Tiêu chuẩn công nghiệp.
- Lướt qua các Fed với framework phổ biến nhất hiện có.
- Thuê dễ dàng hơn các Fed mạnh.
- Tương lai an toàn và ổn định hơn, dựa trên một quá khứ ổn định và một công ty hậu thuẫn vững chắc.
- Cộng đồng quan trọng hơn, rất nhiều công cụ và gói.
- Các ứng dụng web và di động có thể chia sẻ một số mã.

### Vue

- Các mô-đun cốt lõi của Vue (Vuex, Bộ định tuyến, v.v.) được tích hợp và hoạt động tuyệt vời.
- Chọn điều tiếp theo, và không phải là hiện tại.
- Trở nên độc đáo hơn; dẫn đầu đàn và không theo nó.
- Giai đoạn tăng tốc nhanh hơn nhiều, cả Fed và BED sẽ cảm thấy tự nhiên trong mã Vue, nhanh chóng.
- Thúc đẩy tốt hơn văn hóa Full-Stack; cho phép phát triển sản phẩm chéo.

## Nhược điểm chung

### React

- Giữ sự phân chia giữa các Fed và BED; React đòi hỏi phải học hỏi rất nhiều để trở thành một chuyên gia.
- Sẽ cần nhiều thời gian hơn để đào tạo devs.
- Cung cấp chậm hơn (ít nhất là cho nâng nặng ban đầu).

### Vue

- Bước vào một vùng đất thử nghiệm hơn, không mạo hiểm, nhưng sắc sảo.
- Khó khăn hơn để tìm các nhà phát triển Vue có kinh nghiệm.
- Ít plugin và công cụ có sẵn, cộng đồng nhỏ hơn.
- Không phải là React, các nhà phát triển không có kinh nghiệm với khung phổ biến nhất hiện nay.

## Tham khảo
https://medium.com/fundbox-engineering/react-vs-vue-vs-angular-163f1ae7be56