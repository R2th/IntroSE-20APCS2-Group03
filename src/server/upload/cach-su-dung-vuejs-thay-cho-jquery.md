> Nếu bạn muốn hiểu tất cả nội dung của bài viết này, một số kiến ​​thức về VueJs là bắt buộc nhé: https://vuejs.org/v2/guide/<br>
> 
Tôi đã tìm hiểu VueJs hai năm trước, và rất thích sử dụng nó kể từ đó. Tôi đã có cơ hội làm việc trên ba dự án VueJs, pha trộn với các công nghệ khác. Nhưng sau đó, tôi đã trở lại với dự án backend cổ điển hơn, với Symfony, eZPublish, thậm chí Drupal ... và với jQuery để thỉnh thoảng xử lý sự kiện nhấp chuột.<br>
Chúng ta có thể tạo ra những điều tuyệt vời với điều đó, nhưng tôi đã buồn khi không có VueJs, và công việc thì kém vui hơn<br>
Cho đến lúc tôi phải đồng bộ hóa rất nhiều phần tử DOM cùng với jQuery, trên một loạt tương tác cho một nền tảng thương mại điện tử. Tôi hoàn toàn dập tắt, xóa tất cả mã của mình và tôi bắt đầu lại với VueJs chỉ trong một đêm không ngủ. Và bạn biết gì không? Cuộc sống của tôi hạnh phúc hơn kể từ đó!<br>
Và từ lúc đó, tôi chỉ muốn sử dụng VueJs mọi lúc, mọi nơi! Và tôi sẽ chỉ cho bạn cách để đạt được điều đó.<br>
> Lưu ý: các ví dụ ở đây không hoàn hảo, chúng có thể cần được tái cấu trúc và cải thiện, nhưng tôi đã cố gắng giữ đơn giản nhất có thể. Tất cả các code và nhiều thứ khác có sẵn ở đây github.com/Erilan/replace-jQuery-by-vuejs<br>
> 
Đầu tiên, hãy để so sánh các ví dụ mẫu cơ bản với jQuery và tích hợp VueJs đơn giản.<br>
> Một tích hợp VueJs đơn giản bao gồm thư viện vue (ví dụ bằng CDN), thẻ div và một đoạn script nhỏ:<br>
> 
{@gist: https://gist.github.com/Erilan/4bdba528aa866f0c0964ba20fad338e5#file-simple-html}
{@codepen: https://codepen.io/Erilan/pen/dQbZeY}

Không phức tạp hơn tích hợp jQuery!<br>
Trước tiên, hãy cho phép xem một dropdown cơ bản (hiển thị danh sách các mục khi click vào button):<br>
{@gist: https://gist.github.com/Erilan/7f646e4503c2451b9bda08b625bf7580#file-dropdown-html}
{@codepen: https://codepen.io/Erilan/pen/VVZryv}
Ở đây, phiên bản jQuery gọn hơn phiên bản VueJs. Nó là một ví dụ rất đơn giản, nó chỉ phản ứng với một sự kiện click và chúng ta chuyển đổi một class (jQuery) hoặc chúng ta chuyển đổi một boolean (Vue). Phiên bản Vue không thực sự tốt hơn, nhưng nó hợp lý hơn một chút: chúng ta có một giá trị đại diện cho trạng thái dropdown  của chúng ta, không chỉ là một class.<br>
Bây giờ, hãy cùng xem một panels cơ bản (nội dung được hiển thị khi click button):<br>
{@gist: https://gist.github.com/Erilan/42d6407925c834313a426031d697c01a#file-panels-html}
{@codepen: https://codepen.io/Erilan/pen/zMOPQg}
Ở đây một lần nữa, phiên bản jQuery gọn hơn phiên bản VueJs. Một lần nữa, chúng ta phản ứng về một sự kiện click chuột và chúng ta chơi với các class (jQuery) hoặc chúng ta đặt một biến (Vue). Giống như ví dụ trước, phiên bản Vue không thực sự tốt hơn, nhưng nó hợp lý hơn. Thay vì thêm/xóa các class, chúng ta có một giá trị state thể hiện nội dung nào được hiển thị.<br>
Ok, tiếp tục với một mẫu phức tạp hơn: một công thức phục vụ bằng máy tính<br>
{@gist: https://gist.github.com/Erilan/a625809a5973edd56173724a5240b037}
{@codepen: https://codepen.io/Erilan/pen/qQWpqa}
Bây giờ, phiên bản Vue gọn hơn phiên bản jQuery và trông thông minh hơn. Trong jQuery, chúng ta phải phản ứng trên nhiều loại sự kiện, để đọc dữ liệu từ DOM, để viết InternalHTML và khởi chạy tính toán khi bắt đầu.<br>
Trong giải pháp VueJs, code ngắn hơn và bắt đầu logic hơn. Chúng ta có một giá trị state đại diện cho số serving và mỗi dòng thành phần tính toán số tiền của mình. Chúng ta không đọc và viết DOM nữa, chúng ta chỉ tính toán các giá trị thú vị khi chúng ta cần, tận hưởng tính phản ứng của VueJs.<br>
Có một số trường hợp jQuery gọn hơn Vuejs, nhưng chúng ta dễ dàng thêm logic thực sự với Vuejs.<br>
Nhưng bây giờ, nếu chúng ta muốn sử dụng tất cả sức mạnh của Vuejs và sử dụng các component? Chúng ta có thể!<br>
{@codepen: https://codepen.io/Erilan/pen/RqbxEJ}
Chúng ta có thể tạo trên các components, nhưng viết html bằng chuỗi javascript thường là một ý tưởng tồi và không thực sự có thể tái sử dụng.<br>
Đã đến lúc đi sâu hơn với Webpack! Nhưng nó có thể khó sử dụng và cấu hình, vì vậy chúng ta sẽ sử dụng Webpack Encore (https://symfony.com/doc/civerse/frontend.html), một trình Webpack wrapper độc lập được tạo bởi SensioLab, biên tập viên của Symfony.<br>
Chúng ta chỉ cần cài đặt nó và một số packages liên quan đến Vue:<br>
```
composer require symfony/webpack-encore-pack
npm install — save node-sass sass-loader vue vue-loader vue-template-compiler
```
Trong tệp webpack.config.js được tạo, chúng ta phải kích hoạt trình tải Vue:<br>
```
Encore
  // enables VueJs support
  .enableVueLoader()
```
Bây giờ chúng ta có thể tạo các tệp .vue và tận hưởng sức mạnh của trình tải vue-template-loader:<br>
{@gist: https://gist.github.com/Erilan/ebd6f226fb5cb56970c4aeb354197827#file-recipe-vue}
Để khởi tạo vue của chúng ta, chúng ta chỉ cần thêm một thẻ div với một class cụ thể và chúng ta xử lý mount trong javascript của chúng ta:<br>
{@gist: https://gist.github.com/Erilan/5f14dfbdd187e5d92e828fc01b6bdb9b#file-app-js}
Bây giờ là thời gian để đi sâu hơn và sâu hơn!<br>
Hãy cùng xem những gì tôi gọi là **widget approach**. Tôi hiển thị các widget tích hợp trong một ứng dụng Symfony trong ví dụ này, nhưng nó có thể hoạt động với bất kỳ công cụ nào khác.<br>
![](https://images.viblo.asia/89c3a2ea-c012-4b3d-ac7f-4f6579d2fc05.png)

Ý tưởng là soạn các trang như bình thường, được hiển thị từ máy chủ với HTML tĩnh và để cải thiện nó với một số phần Vue, được gọi là Widgets. Một widget có thể là duy nhất, hoặc tái sử dụng. Nó có thể độc lập hoặc liên kết với cái khác bằng event bus hoặc Vuex store.<br>
Với phương pháp này, chúng ta cần nghiêm ngặt hơn. Đây là một đề xuất về kiến trúc tệp để xử lý các widget của chúng ta và các tệp liên quan đến Vue:<br>
![](https://images.viblo.asia/a839eb0b-3b7b-4660-af70-aac086740032.png)

Trong thư mục js của chúng ta, chúng ta có một thư mục cho các tiện ích vue, như mixins, plugin, directives, v.v.<br>
Chúng ta có một thư mục *Widgets*, chứa tất cả các widgets của chúng ta. Mỗi widget có thư mục riêng của mình, với root vue và các component của chúng. Chúng ta có thể có một thư mục *Common* với các common vues.<br>
Ngoài ra còn có một thư mục cho store và một thư mục cho các services khác, như api, eventBus, v.v.<br>
Cuối cùng, chúng ta có file Vue chính của chúng ta: vueWidgetsHandler.<br>
{@gist: https://gist.github.com/Erilan/271dec8848c9e2fb69cb5ed21b5aa315#file-vuewidgetshandler-js}
File này chịu trách nhiệm tạo các widgets của chúng ta. Nó có thể rất chung chung, hoặc hoàn toàn tùy chỉnh.<br>
Đối với mỗi widget của chúng ta, chúng ta sẽ khởi tạo một Vue, với các tùy chọn khác nhau, như store, a router, hoặc props.<br>
Trong ví dụ này, chúng ta sử dụng phần tử DOM *dataset* làm giá trị cho props. Nó tương thích với HTML và dễ sử dụng.<br>
{@gist: https://gist.github.com/Erilan/bdfe39ff90a86fe51153ea8d1f4ab353#file-props-html-twig}
Với sự kết hợp tốt của các widget, bạn có thể xây dựng các trang web trông giống như một ứng dụng! Bạn có thể tìm thấy một ví dụ thực tế ở đây (phiên bản di động tốt hơn;)): www.make-my-box.com<br>
Bài viết này đủ dài, nhưng có rất nhiều khả năng để tăng cường cách tiếp cận này, bằng cách chơi với Vuex store, hoặc eventBus!<br>
Cuối cùng, jQuery nổi tiếng, có rất nhiều plugin và thư viện giúp tăng tốc dự án của bạn, nhưng sử dụng Vue rất thú vị và đưa ra một cách khác để nâng cao trang web của bạn! Cách tiếp cận của vue cleaner hơn, đơn giản hơn để duy trì và mang lại các tính năng mới như ràng buộc dữ liệu gốc!<br>
Tất cả code có sẵn ở đây: https://github.com/Erilan/replace-jQuery-by-vuejs<br>
##### Link bài viết gốc: https://medium.com/kaliop/how-to-use-vuejs-instead-of-jquery-ee6003ba323d