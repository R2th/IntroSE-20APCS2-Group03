**Bạn biết đấy, chúng ta chuẩn bị chào đón một phiên bản Vue.js mới sáng lòa con mắt - cái mà cha đẻ Evan You đã công bố từ mùa thu năm 2018 tại London. Cho đến khi Vue 3 chính thức được trình làng, thì chúng tôi vẫn sẽ ở đây và tiếp tục thu thập các thông tin cũng như tài nguyên có giá trị cho bạn, bạn chắc chắn sẽ không bị lỡ bất ngờ điều gì!**

-----

# Ngày ra mắt Vue 3
Việc phát hành chính thức được lên kế hoạch vào quý 3 năm 2020 - theo [lộ trình đã đề ra](https://github.com/vuejs/vue/projects/6?ref=madewithvuejs.com). Nó đã ở giai đoạn sẵn sàng để được phát hành (RC)!  (Đây là [thông báo chính thức về tình trạng RC](https://github.com/vuejs/rfcs/issues/189?ref=madewithvuejs.com)!)

Điều này có nghĩa là các API và việc triển khai hiện đã thực sự ổn định và sẽ không có bất kỳ thay đổi đột phá nào nữa. Nhóm và tất cả những người làm việc trên các thư viện này sẽ cần làm việc để làm mịn bất kỳ góc cạnh vấn đề nào có thể trước khi phát hành chính thức.

Các [tài liệu mới](https://v3.vuejs.org/?ref=madewithvuejs.com) đã được xuất bản, cùng với [migration guide](https://v3.vuejs.org/guide/migration/introduction.html?ref=madewithvuejs.com) cho bạn biết những gì đã thay đổi. Cả hai vẫn đang trong giai đoạn thử nghiệm, nhưng đã khá hoàn chỉnh (và rất dễ đọc và có cấu trúc tốt, giống như các tài liệu Vue đã từng có).

Bạn hoàn toàn có thể bắt đầu thử nghiệm phiên bản mới. Hãy cứ đi và vui chơi với nó! Nếu bạn phát hiện ra lỗi trong khi xây dựng ứng dụng thử nghiệm, hãy báo cáo chúng thông qua [Trình trợ giúp sự cố Vue](https://new-issue.vuejs.org/?repo=vuejs/vue-next&ref=madewithvuejs.com).

Để giúp bạn bắt đầu thử nghiệm dễ dàng hơn, đây là những công cụ quan trọng nhất. Hãy nhớ rằng tất cả chúng đều là WIP:
* Phiên bản beta của [Vue Devtools](https://github.com/vuejs/vue-devtools/releases/tag/v6.0.0-beta.1?ref=madewithvuejs.com) mới
* [Router](https://github.com/vuejs/vue-router-next?ref=madewithvuejs.com) chính thức cho Vue 3
* [Plugin Vue CLI](https://github.com/vuejs/vue-cli-plugin-vue-next?ref=madewithvuejs.com) cho bản phát hành tiếp theo
* Phiên bản Vue 3 của [Vue Test Utils](https://github.com/vuejs/vue-test-utils-next?ref=madewithvuejs.com)
* [Bản phát hành alpha mới của Vuex 4](https://github.com/vuejs/vuex/releases/tag/v4.0.0-alpha.1?ref=madewithvuejs.com) cũng tương thích với Vue 3, đồng thời cung cấp API tương tự như Vuex 3
-----

# Các tính năng và thay đổi của Vue 3
Như Evan You đã tóm tắt, Vue 3 nhanh hơn, nhỏ hơn, dễ bảo trì hơn và dễ nhắm mục tiêu bản địa hơn.

### Composition API

Một trong những thay đổi quan trọng nhất là API mới sẽ cho phép cách viết thành phần của bạn dựa trên hàm, lấy cảm hứng từ React Hooks.

Nó cho phép bạn đóng gói logic thành "các hàm tổng hợp" và sử dụng lại logic đó trên các thành phần. Đọc toàn bộ [Yêu cầu nhận xét (RFC)](https://vue-composition-api-rfc.netlify.app/?ref=madewithvuejs.com) để biết thêm thông tin hoặc xem [tài liệu tham khảo API.](https://vue-composition-api-rfc.netlify.app/api.html#setup?ref=madewithvuejs.com) (API đã được đổi tên từ "API hàm" thành "API tổng hợp", vì vậy đừng để điều đó làm bạn nhầm lẫn nếu bạn đọc tên đó ở bất cứ đâu!)

Có, điều đó thay đổi cách chúng tôi sử dụng Vue. Tuy nhiên, nó sẽ không phá vỡ bất kỳ điều gì trong ứng dụng Vue 2.x của bạn, vì API mới tương thích 100% với cú pháp hiện tại, cú pháp này sẽ sớm không được dùng nữa.

Cá nhân chúng tôi nghĩ rằng sự thay đổi này sẽ mang lại cho chúng tôi rất nhiều sự linh hoạt và dẫn đến mã có cấu trúc tốt hơn.

Nếu bạn muốn bắt đầu thử nghiệm, [API thành phần mới](https://github.com/vuejs/composition-api?ref=madewithvuejs.com) đã có sẵn cho 2.x dưới dạng plugin và có [tham chiếu API](https://vue-composition-api-rfc.netlify.app/api.html#setup?ref=madewithvuejs.com) (đang phát triển).

### Các thay đổi khác trong Vue 3:

* Viết lại DOM ảo để có hiệu suất tốt hơn và hỗ trợ TypeScript được cải thiện
* Kỹ thuật Native Portal - hay còn được gọi là Teleport
* Sử dụng phân mảnh (Fragments), các phân mảnh sẽ không được hiển thị trên DOM tree
* Thay đổi trong việc mount ở scope global (Global mounting)
* Tạm hoãn render components theo điều kiện
*  ... và hơn thế nữa.

Bạn có thể đọc thêm về quá trình viết lại phiên bản mới của Vue.js và cách đưa ra quyết định trong bài viết này của Evan You 👉️ [Quá trình: Tạo Vue 3](https://increment.com/frontend/making-vue-3/?ref=madewithvuejs.com)

-----
# Vấn đề chuyển đổi từ Vue 2
Vậy thì, điều gì sẽ xảy ra với Vue 2 và việc chuyển đổi sẽ được xử lý như thế nào? Sẽ có một bản phát hành cuối cùng cho phiên bản 2 nhằm hỗ trợ các tính năng tương thích với Vue 3 và đồng thời ta sẽ có thêm các cảnh báo không dùng  nữa (deprecation) đối với các thay đổi quan trọng.

Phiên bản Vue 2 vẫn sẽ có sẵn dưới dạng phiên bản LTS (hỗ trợ dài hạn) trong 18 tháng, có nghĩa là nó sẽ vẫn nhận được các bản cập nhật bảo mật và hoàn toàn an toàn để tiếp tục sử dụng.

Có một [migration guide](https://v3.vuejs.org/guide/migration/introduction.html?ref=madewithvuejs.com) (bản beta) và cũng sẽ có một bản dựng tương thích cho Vue 3. Một công cụ migrate bằng dòng lệnh cũng sẽ có sẵn, giúp bạn tự động migrate được nhiều nhất có thể và đưa ra các gợi ý về nơi bạn sẽ cần nâng cấp một cách thủ công .

### Tôi nên chọn Vue 2 hay 3 cho một dự án mới?

Nếu bạn quyết định sử dụng Vue cho một dự án sản xuất mới, theo khuyến nghị chính thức thì vẫn là nên bắt đầu với Vue 2 ngay bây giờ. Và nếu bạn chọn Vue 2, hãy theo dõi các thay đổi và tránh sử dụng các tính năng đã bị loại bỏ cũng như các thư viện của bên thứ ba có khả năng không được cập nhật nhanh chóng.

Nếu bạn có thể đợi đến quý 3 năm 2020, thì khi đó bạn sẽ chẳng có lý do gì mà không lựa chọn bắt đầu phát triển với Vue 3.

(Tất cả những thông tin và khuyến nghị này được lấy từ [Câu hỏi thường gặp chính thức trong Lộ trình cho Vue 3](https://github.com/vuejs/vue/projects/6?ref=madewithvuejs.com). Hãy xem chúng nếu bạn có thêm những câu hỏi khác!)

-----
# Về việc học Vue 3

Đã có sẵn rất nhiều nguồn tài nguyên giúp bạn có thể tìm hiểu thêm về các chức năng mới:
* [Những điều mới mẻ trong Vue 3](https://codecourse.com/courses/new-in-vue-3?ref=madewithvuejs.com) và các khóa học về [Composition API](https://codecourse.com/courses/the-vue-3-composition-api?ref=madewithvuejs.com) được thực hiện bởi Codecourse (các khóa học với video)
* [Hướng dẫn Vue 3 (dành cho người dùng Vue 2)](https://vuejsdevelopers.com/2020/03/16/vue-js-tutorial/?ref=madewithvuejs.com) bởi Anthony Gore của vuejsdevelopers.com (hướng dẫn bằng văn bản)
* [Khóa học thiết yếu cho Vue 3](https://www.vuemastery.com/courses/vue-3-essentials/why-the-composition-api/?ref=madewithvuejs.com) của Vue Mastery (khóa học với video)
* [Giới thiệu về Composition API](https://www.youtube.com/watch?v=FGKpOLG34xE&ref=madewithvuejs.com) của Gregg Pollack (video bài nói chuyện của anh ấy tại Vue.js Amsterdam 2020)
* [Điều bạn sẽ thích trong Vue 3](https://www.youtube.com/watch?v=eQpVcZa8dVQ&ref=madewithvuejs.com) của Alex Kyriakidis (video về cuộc nói chuyện của anh ấy tại Vue.js Amsterdam 2020)
* [Các phương pháp hay nhất về Composition API](https://www.youtube.com/watch?v=6D58SI9P-aU&ref=madewithvuejs.com) của Thorsten Lünborg (video bài nói chuyện của anh ấy tại Vue.js Amsterdam 2020)
* [Vue 3 & Cái nhìn đầu tiên về Composition API](https://www.youtube.com/watch?v=V-xK3sbc7xI&ref=madewithvuejs.com) của Academind (video)
* [Xin chào Vue 3: Cái nhìn đầu tiên về Vue 3 và Composition API](https://www.youtube.com/watch?v=UAgO2JanN9Y&ref=madewithvuejs.com) của Dan Vega (video)
* [Cái nhìn mới mẻ đầy hoang dại về Composition API trong Vue 3](https://css-tricks.com/an-early-look-at-the-vue-3-composition-api-in-the-wild/?ref=madewithvuejs.com) của Mateusz Rybczonek trên css-tricks.com (bài viết)
* [Vue 3 và Composition API](https://slides.com/hootlex/vue-3-and-the-composition-api-toronto?ref=madewithvuejs.com) của Alex Kyriakidis (trình chiếu từ bài nói chuyện của anh ấy tại Vue Toronto)
* [Các tính năng mới thú vị trong Vue 3](https://vueschool.io/articles/vuejs-tutorials/exciting-new-features-in-vue-3/?friend=madewithvue) của Filip Rakowski trên vueschool.io (bài viết)
* [Live coding: Composition API mới](https://www.youtube.com/watch?v=JON6X6Wmteo&ref=madewithvuejs.com) của Jason Yu (video)
* [Nhìn qua Vueture: Composition Functions](https://www.youtube.com/watch?v=dy_ZB1TyFx4&ref=madewithvuejs.com) của Natalia Tepluhina (video) (đây là [trang trình bày của cô ấy](https://slides.com/nataliatepluhina/vue-func#/?ref=madewithvuejs.com) về bài nói chuyện này tại ComponentsConf!)

Vueschool cũng đang cập nhật khóa học [Master Class của họ cho Vue.js 3](https://vueschool.io/courses/the-vuejs-3-master-class?friend=madewithvue) và cung cấp tổng quan về [Tính năng mới đặc biệt trong Vue 3](https://vueschool.io/courses/whats-new-in-vue-3?friend=madewithvue). Tính đến thời điểm hiện tại nó vẫn chưa khả dụng nhưng bạn có thể để lại email của mình để được thông báo khi chúng ra mắt. Nếu bạn hơi lo lắng về việc phiên bản 3 sẽ ảnh hưởng đến bạn thì việc tìm hiểu và sẵn sàng chính là một cách tuyệt vời để chống lại điều đó.

### Tôi nên bắt đầu học Vue 2 hay Vue 3?

Nếu bạn mới bắt đầu với Vue, đừng ngần ngại bắt đầu học với các nguồn v2 rộng lớn ngoài kia. Hầu hết các khái niệm chính của framework vẫn giữ nguyên và kiến thức của bạn sẽ vẫn có giá trị khi v3 ra mắt.

Nhiều thay đổi của v3 là nội bộ, chẳng hạn như chúng viết lại việc triển khai DOM ảo và viết codebase trong TypeScript. Điều này sẽ làm cho Vue nhanh hơn, nhưng bạn sẽ không phải sử dụng TypeScript nếu không muốn.

Nhóm phát triển Vue thực sự tuyệt vời khi nói đến tài liệu và họ đã có phiên bản beta của tài liệu v3. Bạn hãy xem danh sách của chúng tôi ở trên để kiểm tra một số khóa học đầu tiên tập trung vào v3, nếu bạn muốn bắt đầu với nó.

-----
# Vue 3 drama

Trong trường hợp bạn vẫn nhớ đã nghe điều gì đó đả kích mạnh mẽ về phiên bản 3 cách đây, thì chúng tôi muốn gỡ bỏ điều đó để bạn có thể mong đợi nó giống như chúng tôi 😊

Điều gì sẽ thay đổi nếu không có một chút drama? Vốn dĩ đã có một cuộc thảo luận sôi nổi trong cộng đồng (f.ex. [trên HackerNews](https://news.ycombinator.com/item?id=20237568&ref=madewithvuejs.com) và [trên Reddit](https://www.reddit.com/r/vuejs/comments/c319el/vue_3_will_change_vue_in_a_big_way_current_syntax/?ref=madewithvuejs.com)) khi [RFC](https://madewithvuejs.com/blog/vue-3-roundup?ref=madewithvuejs.com) cho Composition API được phát hành lần đầu tiên vào tháng 6 năm 2019.

Các thành viên trong cộng đồng đã có một chút kích động (và đôi khi thô lỗ, thật đáng buồn) - chủ yếu là do lúc đầu, khi họ chưa biết rõ ràng liệu Composition API mới sẽ được thêm vào như một sự bổ sung như nào (điều này sẽ xảy ra)! Hay API hiện tại liệu sẽ không còn được dùng nữa (còn điều này thì không)!. Ngoài ra, mọi người sợ rằng tất cả thời gian họ dành để học Vue 2 sẽ đều bị lãng phí (không phải vậy nha!).

Nếu bạn vẫn còn hơi e ngại về phiên bản 3 vì một số nhận xét tiêu cực, đây là một số bài viết giải thích lý do tại sao bạn không nên như vậy:

* [Ngày đen tối nhất của Vue](https://dev.to/danielelkington/vue-s-darkest-day-3fgh?ref=madewithvuejs.com) viết bởi Daniel Elkington trên dev.to
* [Tại sao mọi người lại khó chịu với Vue 3](https://vueschool.io/articles/news/why-people-are-mad-with-vue-3/?ref=madewithvuejs.com) bởi Alex Kyriakidis trên vueschool.io
* [3 Thông tin chi tiết chính từ API RFC chức năng mới của Vue](https://zendev.com/2019/06/25/key-insights-from-vue-functional-rfc.html?ref=madewithvuejs.com) của Kevin Ball trên zendev.com (chúng tôi đặc biệt thích việc anh ấy chỉ ra rằng [thay đổi này cho thấy rằng bạn chọn framework nào không quan trọng](https://madewithvuejs.com/blog/why-it-doesnt-matter-which-javascript-framework-you-choose), cái chúng tôi cũng đã đề cập ở trên)

Những thay đổi về framework có thể gây ra nhiều sự căng thẳng. Nhưng chúng tôi tin rằng những thay đổi trong v3 sẽ là một bước tiến vượt bậc và bạn sẽ có đủ thời gian để thích nghi.

-----

*Bài viết này được dịch từ: [Vue 3 – A roundup of infos about the new version of Vue.js](https://madewithvuejs.com/blog/vue-3-roundup). Rất cảm ơn các bạn đã quan tâm!*