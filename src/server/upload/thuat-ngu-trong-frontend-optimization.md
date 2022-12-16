## Tại sao nên đọc bài này?

- Dành cho các bạn mới tiếp cận và thấy quá nhiều thuật ngữ mới
- Dành cho các bạn có thể đã làm FE một thời gian rồi nhưng đôi khi vẫn không biết có một thứ như vậy tồn tại trên đời
- Có vài keyword để tối ưu performance cho website

## Các thuật ngữ phổ biến

Trong bài này mình sẽ nói về các thuật ngữ liên quan tới optimization nhé!

### Code split

Hiểu một cách đơn giản thì bạn có một file code rất to, bạn chia file to đó ra thành nhiều file nhỏ thì gọi là code split

![image.png](https://images.viblo.asia/b7631c16-6df5-43c8-9e5b-77c59d768aab.png)

Hoặc một ví dụ khác là bạn có một trang web build bằng React, trong đó bao gồm Header, body và Footer. Thì bạn có thể build thành một file bundle.js bao gồm cả 3 component trên hoặc cũng có thể chia cái bundle đó thành 3 file, mỗi file chứa một component

*😼 Hãy nghĩ đơn giản code split như là bạn cắt một miếng bánh to thành nhiều miếng nhỏ*


### Lazy load

Lazy load nghĩa là một cách để delay việc load một resource gì đó cho tới khi thật sự cần thiết

![image.png](https://images.viblo.asia/bc35fd39-d1dd-47dc-8746-5531b5fbace7.png)

Như trong Video ở trên, sẽ khá tốn resource nếu chúng ta load hình mà user chưa thực sự cần xem đúng không. Do đó, nó apply lazy load để khi nào ta gần scroll tới cái hình đó thì mới load hình về. Vừa đỡ tốn CPU cho máy user, cùng vừa đỡ tốn 3g cho người ta

Resource ở đây bạn có thể define là mọi thứ như là

- Một file code
- Một cái thẻ `img`
- Một thư viện
- Một response từ API

Khi nghĩ về lazy load thì bạn cần suy nghĩ: Cái gì có thể lazy và cái gì không thể lazy. Việc chia ra những resource nào lazy load được, cái gì không thể lazy load giúp bạn có chiến thuật quản lý resource tốt hơn.

Back lại cái thuật ngữ bên trên Split code làm ví dụ nhé. Câu hỏi của bạn là cắt cái bundle bự thành nhiều bundle nhỏ để làm gì?

Câu trả lời thường là bạn cắt nó ra thành hai phần: Phần có thể lazy load được và phần không thể lazy load được.

Do đó bạn sẽ thấy khái niệm lazy load thường đi chung với split code vì lazy load cái resource code thì cần cắt nó thành nhiều chunk nhỏ hơn để hiện thực lazy load


*😼 Về mặt lý thuyết, tất cả các resource liên quan tới interaction của user (Scroll, click, hover, press,…) đều có thể lazy load được*


### Prefetch/Preload

Prefetch nghĩa là bạn nói với Browser “Tao có một cái resource này nè, khi nào mày rảnh thì load trước giúp tao nhé”

![image.png](https://images.viblo.asia/bddd471c-010e-482e-8262-dc1a5e4ba10f.png)

Preload

Preload nghĩa là bạn nói với Browser “Load trước đống resource này cho tao nhé, rảnh hay không thì cũng load 😈”

Okey vậy khi nào thì nên dùng prefetch hay preload?

Prefetch hữu dụng khi bạn tin là user sẽ cần một số resource này trong tương lai. Mình ví dụ khi user hover vào một link nào đó, mình cũng không chắc là user sẽ thật sự click vào link này hay không, nhưng khả năng cao là có. Vì vậy nếu mình prefetch trước cái link này thì nếu user bấm thật thì nó đã được load sẵn cmnr, nên sẽ thấy trang này load nhanh vklllllllllll ⚡

Preload hữu dụng khi bạn cần những resource cực kì quan trọng cho bước render đầu tiên. Ví dụ dễ thấy nhất là Font, việc preload trước font giúp trang web của bạn render lần đầu tiên thì visual cũng ok luôn. Thay vì nếu render ra trang web mà font chưa có, sau đó load font rồi phải render lại một lần nữa. Việc thay font như vậy dễ khiến cho layout bị flick và với góc nhìn của user thì thấy nó cũng khá là bad

### ****Tree Shaking****

Bạn tưởng tượng đống code/module của bạn như một cái cây nha. Bây giờ bạn cầm cái cây đó rung mạnh thật mạnh, cái gì sẽ xảy ra? Những thành phần yếu ớt trên cái cây đó sẽ bị rơi ra như là già, cành khô, tổ chym,…

![image.png](https://images.viblo.asia/85c4b3e2-df48-4b2a-aa8e-c27c68987a88.png)

Tree shaking trong code cũng tương đương vậy, bạn loại bỏ những thứ không cần thiết trong code (dead code) một cách tự động.

Cái này giống như việc giảm “mỡ” cho bundle của các bạn, sẽ giúp load web nhanh hơn, không tốn thời gian cho những thứ không cần thiết

### SEO

Viết tắt của cụm từ Search Engine Optimization - Tối ưu hóa cho công cụ tìm kiếm. Hiểu đơn giản là có vô vàn website trên internet đúng không, và khi bạn search Google thì nó sẽ trả về cho bạn vào trăm hay vài triệu kết quả đó. Vậy làm sao để trang web của mình nằm ở vị trí cao hơn trong danh sách đó để nhiều user biết tới hơn?

![image.png](https://images.viblo.asia/7ee41246-b26f-4888-bb35-ce5cbedb1d03.png)

Vậy SEO là cách để tối ưu trang web giúp nó có thứ hạng cao hơn ở các công cụ tìm kiếm như Google, Bing

Tụi Google sẽ có nhiều tiêu chí để quyết định trang web của bạn có phù hợp với user hay không như là Content, keyword, hình ảnh, tốc độ load trang, ngôn ngữ,… Do đó khi nói làm SEO nghĩa là bạn làm đủ kiểu để các tiêu chí đó tốt hơn, phù hợp với user hơn (đường nhiên là theo tiêu chí của tụi Google rồi)

### Google Page Speed

Nó là cái trang này nè 

[PageSpeed Insights](https://pagespeed.web.dev/)

Google build ra một cài tool để đo lường tốc độ website của bạn và cho ra thang điểm từ 0 tới 100. Điểm càng cao thì chứng tỏ website của bạn “ra dẻ” load càng nhanh

Thường cái này là một tiêu chí mà ai cũng dùng để xem coi website của bạn có đuỷnh hay không.

![image.png](https://images.viblo.asia/b6e897f9-b9ed-42ec-b234-44d47ae8fef2.png)

Mình thì thấy nó cũng tương đối tuy nhiên mọi người lại dựa vào nó quá nhiều để đánh giá một website

### The fold

![image.png](https://images.viblo.asia/8688e6d4-644a-4d78-92ab-622afc8ee254.png)

The fold hiểu là bạn cắt cái trang web theo chiều ngang, bên trên the fold là những gì đập vào mặt user ngay lập tức khi họ mở trang web của bạn. Những gì ở dưới thì người ta phải scroll xuống mới thấy được.

Và vì định nghĩa là những gì đập vào mặt user ngay lập tức nên khái niệm này khá là … tương đối. Vì users có thể dùng device khác nhau, to nhỏ khác nhau. Có thể đập vào mặt ở màn hình MateView 4k 27inch với màn hình Dell FullHD 24 inch nó khác nhau nên do đó the fold ở hai màn hình đó cũng khác nhau.

Tại sao cần phải phân biệt the fold? Nó giúp bạn tối ưu hơn cho user kiểu như

- Ở trên the fold thì load càng nhanh càng tốt vì nó là thứ xuất hiện ngay lập tức khi user mở website
- Ở dưới the fold thì có thể apply lazy load vì user phải scroll xuống mới thấy được phải không nào

### CSS critical

Là một cách để trích xuất những CSS Above the fold ra riêng để tối ưu tốc độc load.

![image.png](https://images.viblo.asia/e8bfa03b-55a9-4bf6-9f71-a8d5216e31c2.png)

Nhớ vụ mình nói ở trên là optimize tối đa cho những thứ Above the fold không, thì cái này là một cách để tối ưu Above the fold. Tuy idea về việc chỉ inject CSS above the fold ra gắn vào khá là đỉnh nhưng thực tế rất rất khó làm cái này. Nên mình thấy nghe cho vui thì được :))

### CSS in JS

Cái tên nó lên tất cả: Viết CSS ở JavaScript.

Mà tại sao lại không viết trong file css nhỉ?

Khi dùng css đồng thời kết hợp với các library, hay framework gần đầy thì nó sẽ gặp một vài vấn đề

- CSS là global, trong khi mình muốn component của là isolated và không bị, hoặc tạo những style lên các thành phần khác
- Lỡ code JS hết rồi nên thôi code luôn JS hết 😅

Vì nó viết bằng CSS nên sẽ dễ hơn khi bạn muốn làm một số thứ advance hơn với CSS như CSS extraction, critical,…

### Service worker

Là một đoạn script chạy ở background, nó có thể intercept vào request và response giữa web của bạn và server, và làm một vài thứ hay ho khác (Notification, cache, sync data,…)

![image.png](https://images.viblo.asia/c838214a-42fd-412e-bbc7-3b6f16d925fc.png)

Vì nó đứng ở giữa nên các bạn tưởng tượng nó như proxy cũng được, có thể thay đổi data gửi đi hay data nhận về luôn. Nên cách dùng của service worker cũng khá là sáng tạo, có thể là

- Mock proxy server
- Cache lại response để biến web của các bạn trở thành offline web
- Precache những resource cần thiết

Một key quan trọng khi nói tới Service worker là vì nó chạy dưới background nên bạn có thể làm vài thứ hay ho mà không khiến cho web của các bạn chậm đi 

### Web worker

![image.png](https://images.viblo.asia/ab87953d-8523-43cf-8aaa-bf1495ede1fa.png)

Trước đây thì web chỉ có một luồng thực thi thôi, được gọi là Main thread. Và vì chỉ có một luồng thực thì nên nó đẻ ra một vấn đề: Khi bạn đang thực hiện một tác vụ (task) gì đó, thì các tương tác khác phải chờ cho task đó chạy xong mới chạy được.

Case thử tế là ví dụ bạn code một trang web tính lương cho nhân viên, khi có một task tính toán lương đang chạy ở dưới và nếu nó khá nặng thì lúc này user có click vào đâu thì trang web của các bạn cũng không phản hồi được (vì đang bận tính lương chết mọe rồi mà, còn bắt tao làm cái khác nữa hả????)

Do đó Web worker đẻ ra để giải quyết vấn đề trên. Nói đơn giản là cái gì tính toán nặng thì đẩy ra một thread khác, để cái thằng Main thread rảnh rỗi còn handle interaction từ user

### Hydration

Cái từ này hơi hiếm gặp nhưng khác là quan trọng và gặp phải ở hầu hết các lib support SSR.

Hydration là quá trình gắn các event listener và các node tương ứng đã được generate từ quá trình SSR

[https://github.com/thanhlmm/blog/blob/master/public/materials/lazy-hydrate.mp4?raw=true](https://github.com/thanhlmm/blog/blob/master/public/materials/lazy-hydrate.mp4?raw=true)

Mình có một bài viết lan quyên tới cái này ở đây

[Server side rendering với Hydration lãng phí tài nguyên như thế nào?](https://thanhle.blog/blog/server-side-rendering-voi-hydration-lang-phi-tai-nguyen-nhu-the-nao)

### List ****virtualization****

![image.png](https://images.viblo.asia/6a83f01d-93ca-41ad-aae1-28830f32943e.png)

Bạn tưởng tượng là cái web của mình là một cuộn giấy siêu dài và mình dang nhìn nò thông qua một cửa sổ nhỏ (Window). Nghĩa là mình đang nhìn một phần rất nhỏ trong cuộn giấy đó, và để nhìn hết thì các bạn phải scroll.

List virtualization là kĩ thuật chỉ render cái DOM node nằm trong cửa sổ (Window) của bạn, các thứ nằm ngoài thì bỏ nó ra khỏi DOM luôn để trình duyệt không tốn resource để take care những thứ không quan trọng.

Bạn sẽ thấy cái này rất quan trọng khi apply cho những trang web có list cực kì dài và phức tạp như là New feed của Facebook, Twitter,…

*Tới đây thấy cũng khá dài rồi, kiều càng viết nó càng có thêm á 😅, nên mình cũng không biết là còn thiếu gì quan trọng không.*

*Ngoài ra bạn còn muốn tìm hiểu về thuật ngữ ở mảng nào nữa (Layout, CSS, state management, …)? Comment bên dưới nhé!*

## Bài viết “lan quyên”
- https://thanhle.blog/blog/fix-loi-force-layout-reflow-anh-huong-toi-performance-frontend
- https://thanhle.blog/blog/tuong-lai-cua-frontend
- https://thanhle.blog/blog/frontend-performance-pattern-vi