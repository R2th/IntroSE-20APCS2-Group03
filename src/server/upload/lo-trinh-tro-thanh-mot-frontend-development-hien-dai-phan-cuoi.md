Các bạn có thể theo dõi lại [Phần 1](https://viblo.asia/p/lo-trinh-tro-thanh-mot-frontend-development-hien-dai-phan-dau-aWj53OGb56m) và [Phần 2](https://viblo.asia/p/lo-trinh-tro-thanh-mot-frontend-development-hien-dai-phan-tiep-theo-XL6lAyLplek) trước khi chúng ta vào phần cuối của seri này nhé.

# Chọn lấy cho mình một framework

Trong phần này sẽ sử dụng những kiến thức cơ bản bên cạnh đó là sass, build tools và package managers những thứ mà chúng ta đã học trong những phần trước và giờ chúng sẽ được dùng trong các framework.

Quay lại với framework, có nhiều sự lựa chọn nhưng ngày nay **React**, *Angular* và **vue** được sử dụng phổ biến nhất. Trong đó nhiều nhất là React. Tuy nhiên bạn có thể chọn bất kì cái nào ở trên cũng được. Cá nhân tôi sẽ chọn React hoặc Angular. Chỉ cần lưu ý nhỏ ở đây, với một người mới bắt đầu bạn **có thể** sẽ thấy Angular là dễ dàng hơn một chút, có lẽ bởi vì nó hỗ trợ hầu hết mọi thứ ví dụ router đầy quyền năng với hỗ trợ lazy loading, đóng gói component,... mà không phải lo lắng về việc chọn thư viện ngoài. Nhưng React chắc chắn có điểm hơn với cộng đồng quanh nó và cách mà team react tại facebook đã cải thiện nó từng ngày. Chỉ cần chắc chắn là không chọn cái nào vì sự cường điệu nó từ một ai đó, hãy so sánh và xem cái gì là tốt nhất cho bạn nhé.

Bởi vì bài này là về việc học nên chúng ta sẽ thôi không đi sâu vào so sánh giữa các thư viện. Đây là biểu đồ miêu tả về quá trình học tập của Angular và React.


![4da8d50e1dc6](https://images.viblo.asia/f648d74a-6a7c-4883-819d-4da8d50e1dc6.png)

Khi bạn đã có sự lựa chọn framework của mình, có một số thứ khác mà có thế bạn phải học. Ví dụ nếu bạn đã quyết định học react bạn có thể phải học Redux hoặc Mobx để quản lí state của app, dựa trên độ lớn của app bạn sẽ làm. Mobx thích hợp cho app nhỏ và vừa, Redux thì thích hợp hơn cho app với quy mô lớn và bạn thậm chí không cần chúng và có thể dựa vào quản lí state mặc định của React.

Nếu bạn chọn Angular bạn sẽ phải làm quen với **TypeScript** (bạn có thể phát triển app Angular mà không cần nó nhưng nó được khuyến nghị sử dụng) và Rx.js mà chúng cũng sẽ có lợi ích cho bạn ngoài ứng dụng angular của bạn. Nó thật sự là một thư viện quyền lực và nó cũng thích hợp cho lập trình hướng chức năng.

Và nếu bạn chọn **Vue.js** bạn có thể phải học Vuex, nó khá giống với Redux nhưng dành cho Vue.

> Bạn nên chú ý rằng Redux, Mobx và Rx.js không chỉ bị rằng buộc với những framework, bạn có thể sử dụng chúng trong các ứng dụng vanilla JavaScript của mình. Cũng vậy nếu bạn chọn Angular hãy chắc chắn nó là Angular 2+ không phải Angular 1.

# Progressive WebApps
 Và khi bạn đã hoàn thành tất cả các bước ở trên, hãy tìm hiểu về service workers và cách làm progress web apps nhé.

# testing cho App của bạn

Có rất nhiều công cụ khác nhau cho các mục đích khác nhau. Bản thân tôi chủ yếu sử dụng kết hợp của **Jest, Mocha, Karma và Enzyme**. Tuy nhiên trước khi bạn chọn bất kì cái bạn nên có những hiểu biết cơ bản về sự khác nhau giữa các kiểu testing. Xem xét tất cả các lựa chọn sẵn có và sử dụng cái phù hợp nhất với nhu cầu của bạn.

Đây là một bài tổng hợp rất hay để giúp bạn bắt đầu [testing](https://medium.com/welldone-software/an-overview-of-javascript-testing-in-2018-f68950900bc3)

# Static Type Checkers

Static Type Checkers giúp bạn kiểm tra kiểu dữ liệu cho JavaScript. Bạn không cần học nó nhưng nó thật sự rất hữu ích và có thể học trong vài giờ và sau đó nó sẽ theo bạn mãi. Hiện tại phổ biến nhất là **TypeScript** và **Flow**. Tôi thích Typescript và sẽ chọn nó nhưng đừng ngại xem xét cả 2 và chọn cái bạn thích.

# Server Side Rendering

Các kĩ năng mà bạn đã có cho đến lúc này đã đủ giúp bạn có một công việc với ví trí frontend development. Nhưng đừng dừng lại ở đây!

Học về server side rendering trong bất kì framework nào mà bạn đã chọn. Có những lựa chọn khác nhau, dựa trên framework mà bạn sử dụng. Ví dụ nếu bạn đã quyết định sử dụng React các tùy chọn đáng chú ý nhất là Next.js và After.js. Với angular có Universal và Vue.js có Nuxt.js.

Có thể có những thứ vẫn còn thiếu trong roadmap này nhưng đây là tất cả những gì bạn cần cho một vị chí frontend development. Nhớ ràng chìa khoá cho thành công chính là thực hành nhiều nhất bạn có thể. Nó sẽ trông có vẻ đáng sợ khi bắt đầu và bạn sẽ cảm thấy như không thể nắm bắt được nhưng đó là điều bình thường và qua thời gian bạn sẽ cảm thấy rằng bạn tiến bộ rất nhiều. Và đừng quên tìm kiếm sự giúp đỡ nếu bạn gặp khó khăn, bạn sẽ ngạc nhiên khi có rất nhiều người sẵn sàng giúp đỡ hoặc ít nhất có tôi(nếu có thể :D).

# Nguồn tham khảo

[Modern Frontend Developer in 2018](https://medium.com/tech-tajawal/modern-frontend-developer-in-2018-4c2072fa2b9c)