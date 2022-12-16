## Giới thiệu 
- Khoảng thời gian trước, thì Vue đã cho ra mắt một phần rất mới, được coi như là phần core, phần cốt lõi mới nhất của phiên bản 3 của vue. Nó được gọi là Vue Composition API, hay thường được gọi tắt là vue3. Nó là phần cốt lõi, được phát triển sớm, và đưa ra mắt trước. Trong định hướng mới về Vue3, sẽ tiếp tục đưa ra các phần mới như hệ thống reactivity system, hay nhiều thứ khác nữa, mà nhân của toàn bộ những thứ đó, được biết đến và đưa ra mắt: Vue Composition API. 
- Ở phiên bản mới này, đã đưa ra những giải pháp giúp giải quyết những hạn chế của Vue ở phiên bản 2. Qua đó nhằm tăng performance lên rất rất nhiều. Việc thay đổi mới này sẽ không quá khó khăn trong việc upgrade từ vue2 lên vue3. Nó không (hoặc gần như là không) đưa ra một concept mới nào, mà nó hoàn toàn có thể tích hợp vào những project vue2, nhằm tăng hiệu suất, cải thiện những hạn chế. Chúng ta sẽ tìm hiểu rõ hơn trong nội dung bài viết.

## Nội dung

Nội dung được đề cập đầu tiên, là tại sao lại là Vue Composition API, hay gọi tắt là tại sao lại là vue3. Vue3 được sinh ra, nhằm đưa ra những giải pháp (solution) của những vấn đề hạn chế lớn nhất và thường gặp nhất của vue2. Tuy nhiên việc phát triển này vẫn đang được tiếp tục. Vue Composition API đưa ra nhằm giải quyết 3 hạn chế thường gặp của vue 2 như sau:
   - Khi một component phát triển trở lên lớn, thì khả năng đọc hiểu code trong component đó trở lên khó khăn. 
   - Khó tái sử dụng được những design pattern
   - Vue2 có hạn chế hỗ trợ typescript. 
Chúng ta sẽ đi tìm hiểu kỹ từng hạn chế này, và những điều mà vue3 , gọi vue 3 thì chưa chính xác, vì nó chỉ là phần core ra mắt trước của vue 3. Tên cụ thể của nó là Vue Composition API, là các api được định nghĩa mới, nhằm giải quyết 3 vấn đề trên. Tuy nhiên, trong bài viết này, mình sẽ gọi nó là Vue3 đi, cho nó ngắn gọn và dễ hiểu. 

### Hạn chế thứ nhất: Khả năng đọc hiểu code trở lên khó khăn với các component lớn. 
Chúng ta hãy đến với 1 ví dụ, mà qua đó chúng ta sẽ hiểu rõ vấn đề này hơn.

Chúng ta có một bài toán là tìm kiếm một sản phẩm trên giao diện, cụ thể nó như sau
![search-component](https://images.viblo.asia/ece427d8-f43c-4dfb-84b7-c7ffbe2b411c.gif)

Thì chúng ta sẽ có code một component sẽ như sau:
![search-vue](https://images.viblo.asia/ee360c08-0266-4f69-9e99-0c8f2243c7ce.jpg)

Cái đoạn hình icon :mag: là dữ liệu và logic xử lý logic của việc search, hiện tại, thì chúng ta vẫn không quan tâm lắm, logic của nó ra sao, chúng ta chỉ cần biết nó là đoạn logic nhằm xử lý việc search là được rồi. 

Tiếp đến, chúng ta đưa thêm một tính năm sắp xếp các kết quả tìm kiếm. Như vậy, component search của chúng ta sẽ có thể như sau:
![search-and-sort](https://images.viblo.asia/c362d38b-c81b-4d4d-ae73-5a020568d245.jpg)

Vậy thế nhé icon :mag: là dữ liệu và logic xử lý việc search còn icon còn lại là biểu thị dữ liệu vào logic của việc sort. Vẫn như cũ, chúng ta cũng không cần quan tâm logic thực sự nó sẽ như nào. Cứ tưởng tượng nó có logic ở đoạn đó là được. Mình không tìm thấy icon sorting trên viblo :smiley: 

Nhìn thì có vẻ là không tệ lắm đúng không. Và cũng có vẻ thông thường thế này thôi, chưa có vấn đề gì. Tuy nhiên, chúng ta hãy thử tưởng tượng, chúng ta sẽ thêm 1 số các tính năng mới của việc search này, ví dụ như phân trang (paginate), tìm kiếm theo điều kiện và một vài thứ khác. Khi component của chúng ta trở lên khổng lồ. Tưởng tượng với dữ liệu logic, các options của vue (như props, mounted, computed, updated, ...etc), và mỗi thứ nó có một màu, thì chúng ta sẽ có một component đầy màu sắc như hình bên trái này.

![mixin](https://images.viblo.asia/335a91de-a0cd-45a7-92f7-4a9c6662fc69.jpg)

Một loạt các màu xen lẫn nhau. Và hãy nhớ là vue 2 có rất nhiều hạn chế trong việc sử dụng typescript, nên việc tracking (lần vết) lại thêm khó khăn. Các logic, các optios, các xử lý xen lẫn nhau, khi component chúng ta lớn, khả năng đọc hiểu code sẽ trở lên khó khăn rất nhiều. 
Điều này chỉ giúp người đọc hình dung nó sẽ như thế nào, trên thực tế thì những component lớn, và khả năng đọc hiểu trong dự án thực tế là thường xuyên xảy ra. Khi phải thực hiện maintain một tính năng mà mình không hiểu rõ, Khi thực hiện sửa chữa một cái gì đó, có thể gây những lỗi mà chúng ta không thể kiểm soát được. Việc đọc hiểu một component lớn không phải là không có khả năng, mà nó sẽ gây tốn rất nhiều effort của developer, mà đôi khi, cũng không thể nắm hết ý tưởng viết của người cài đặt ban đầu. Một thảm họa sẽ xảy ra mà chúng ta không kiểm soát được. 

Nhìn vào ảnh bên phải, thì nó có vẻ thuận mắt hơn nhiều, có vài màu rõ ràng, và khúc nào ra khúc ấy  :heart_eyes: 

Và thực tế, nếu chúng ta sử dụng Vue3 (Vue Composition API) để tổ chức lại component search này, thì nó sẽ như này : 

![refactor-search-vue](https://images.viblo.asia/2cc668b9-e799-40de-902c-a8028063355d.jpg)

Nhưng chờ đã, nếu tổ chức code như thế này, thì ta sẽ có một **super setup function** sao? Một hàm **setup** với nôi dung vài nghìn dòng nghe có vẻ không khá hơn là mấy có khi còn điên hơn so với cấu trúc ban đầu. 

Nhưng thực tế, chúng ta sẽ tổ chức code lại như sau: 

![refactor-setup-function](https://images.viblo.asia/8fbd6a3e-657e-44b0-b9f9-a337430adf45.jpg)

Ngon rồi, ít ra không phải **super setup function** chắc là ngon hơn nhiều rồi. 

### Hạn chế thứ hai, việc tái sử dụng code

Có 3 cách tái sử dụng code trong vue2, và cái nào nó cũng có những hạn chế riêng. Chúng ta hãy đi tìm hiểu sâu hơn từng cách một.
#### Cách 1: Sử dụng mixin
![mixin-component](https://images.viblo.asia/9e1c1e2e-16e7-4819-b7d5-aa2228f6d637.jpg)

**Điểm tốt**
- Có thể mixin các tính năng lại với nhau một cách có tổ chức
**Điểm chưa tốt**
- Bị conflict giữa tên của các thuộc tính của các component được mixin
- Không rõ ràng mối quan hệ giữa các component 
- Khó để tái sử dụng
#### Cách 2: Sử dụng mixin factory
![mixin-factory](https://images.viblo.asia/13d77d0c-d4ed-4b66-b1d1-902bdf7f45d3.jpg)

Như bạn đã thấy, mixin factory giúp chúng ta có thể customize lại mixin và truyền các tham số qua đó tái sử dụng ở các component khác nhau
**Điểm tốt**
- Dễ dàng tái sử dụng ở các component khác nhau
- Nhìn thấy mối quan hệ giữa các component rõ ràng hơn.
**Điểm chưa tốt**
- Quá trình namespace yêu cầu một convention cực kỳ chặt chẽ
- Có các thuộc tính ngầm định, nên khi factory một component, vẫn cần xem xét các giá trị ngầm định này.
- Không có quyền truy cập các thể hiện trong quá trình runtime. Như vậy sẽ không tự động sinh ra các component này được 

#### Cahs 3: Sử dụng scope slot
![scope-slot](https://images.viblo.asia/1352bf38-2405-4f14-8b55-7140dbfee771.jpg)
**Điểm tốt**
- Rõ ràng cấu trúc, chỉ rõ để mixin nào
**Điểm chưa tốt**
- Các cấu hình mixin phải để trong template
- Giảm khả năng đọc hiểu component
- Các thuộc tính của component bắt buộc phải là các biến của `template`
#### Vậy Vue3 cung cấp cách tái sử dụng như thế nào ? 
![vue3-reuse](https://images.viblo.asia/c867ed15-ab0a-4c3b-a988-c12ce49e840b.jpg)
**Điểm tốt**
- Viết ít code hơn, dễ dàng sử dụng các function trong 1 component
- Sử dụng được những code function thông dụng có sẵn, không phải xây dựng thêm
- Linh động hơn mixin và slot
- Hỗ trợ typescript nên có thể sử dụng tham chiếu, sử dụng document, sử dụng autocomplete

**Điểm chưa tốt**
- Phải học các API ở mức low-level
- Có đến 2 cách để viết các component, không còn dùng 1 cách chuẩn như vue2 nữa.


### Tài liệu tham khảo
-[ Bài viết tại sao lại dùng vue compostion api ](https://www.vuemastery.com/courses/vue-3-essentials/why-the-composition-api/)
-[ Video giới thiệu vue composition api](https://www.youtube.com/watch?v=WLpLYhnGqPA)