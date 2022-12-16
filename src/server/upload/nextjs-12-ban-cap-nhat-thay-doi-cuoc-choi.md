# Lời mở đầu 
![image.png](https://images.viblo.asia/34a866de-d2da-4278-bf8b-2f234d6ca9c3.png)

Nextjs là 1 Framework cực kỳ mạnh mẽ khi nó support cả 4 cơ chế rendering là SSR, CSR, SSG và ISR hơn nữa là còn rất nhiều build-in giúp việc phát triển products trở nên dễ ràng hơn. Bản thân vốn đã mạnh mẽ sẵn rồi nhưng trong  ngày 26/10 vừa qua Next.js đã update lên version 12, Next.js 12 là bản phát hành lớn nhất từ trước đến nay. Đây cũng có thể coi 1 bước tiến lớn để Nextjs có thể bước tiếp tham vọng của mình là biến Nextjs không chỉ đơn thuần là 1full-stack web framework mà trở thành một web SDK xịn xò 😀😀😀. Vậy trong bản cập nhật này họ đã có những cải tiến lớn như thế nào thì cùng mình tìm hiểu nhé :) . 
## Nội dung chính
### 1. Cải thiện tốc độ build và refresh sử dụng Rust complier.
Trong các phiên bản trước đó thì Nextjs sử dụng Babel (là 1 JavaScript compiler và chuỗi công cụ chủ yếu được sử dụng để chuyển đổi mã ECMAScript 2015+ thành phiên bản JavaScript tương thích ngược trong các trình duyệt hoặc môi trường hiện tại và cũ hơn)  và nhược  điểm của nó là làm cho thời gian compile lâu hơn, sử dụng nhiều dependencies hơn <dev dependencies 269 packages >, ... đây là 1 trong những điều làm cho thời gian compile của Nextjs mất khá nhiều tài nguyên và thời gian. Do đó ở version 12 này thì Nextjs đã quyết định không sử dụng Babel nữa mà thay vào đó họ sử dụng Rust compiler được build on SWC (swc là một đối thủ cạnh tranh mới của Babel. Nó được viết bằng Rust và nhanh hơn tới 20 lần) nhờ sử dụng Rust compiler thì tốc độ build và refresh của Nextjs đã được cải thiện đáng kể: 
![swc.png](https://images.viblo.asia/078c252b-3045-4942-85f2-6757fc1a2421.png)
Tóm lại:
1. **Cải thiện tốc độ build codebase lớn**: Họ cũng đã thử nghiệm bằng cách build 1 trong những repo Nextjs lớn nhất trên thế giới (repo của vercel.com) thì thời gian khi sử dụng Rust compiler thì thời gian build mất khoảng `2mins` trong khi đó nếu sử dụng Babel thì thời gian build lên đến `3-4mins`
. ![image.png](https://images.viblo.asia/eed7a1d5-4ff2-4d75-a8a2-10717550c76c.png)
3. **Cải thiện khả năng quan sát hiệu năng**: Nextjs có xuất ra cả `thời gian refresh` ở cả 2 phía client và server được cải thiện rõ ràng bao gồm cả việc compile các modules và file đã được compile.Tức là chúng ta có thể xem được thời gian compile mỗi lần hot reload
4. **Cải tiến về webpack** :  Thực hiện nhiều cải tiến với webpack bao gồm tối ưu hóa khả năng fast refresh.

### 2. Build in Middleware (BETA)
Trước kia khi chưa có build in middleware thì chúng ra thường sử dụng redux saga, hoặc sử dụng 1 vài cách khác như sử dụng  [kết hợp context, React HOC và store redux](https://viblo.asia/p/tao-middleware-cho-web-voi-nextjs-RnB5p4qJ5PG). Các cách trên đều rất ok nhưng cũng có 1 số nhược điểm như mất thời gian code hơn, cần hiểu biết rộng hơn để có thể build được,...Vậy cùng thử tìm hiểu xem build in middleware (BETA) của Nextjs có điểm đặc biệt gì đáng dùng hơn không nhé.

![middleware.png](https://images.viblo.asia/f4a39af7-0c6a-42f7-9825-d97203b91628.png)

Từ Nextjs 12 trở đi chúng ta có thể đơn giản tạo ra 1 middleware cho toàn bộ các pages bằng cách sử dụng 1 file _middleware.ts ở trong thư mục pages cùng cấp với file index và _app.js. Hoặc nếu bạn muốn tạo middleware riêng biệt cho từng nested-route thì b chỉ cần để _middleware ở cùng cấp với route mà bạn muốn sử dụng middleware là ok. Thật đơn giản đúng k nào :D 
![image.png](https://images.viblo.asia/3ce0a79f-0c99-4535-94e3-63994a836f91.png)
Trong trường hợp bạn có những sub-directories hoặc nested-route thì Middleware sẽ chạy theo hướng top-down. Ví dụ bạn có cấu trúc route như sau:
![image.png](https://images.viblo.asia/538e0341-acd9-4956-b6de-e533062bbf4a.png)
Thì đầu tiên phần middleware của route `/about` sẽ được chạy trước sau đó mới đến phần middleware của `/about/teams` sẽ chạy sau.

### 3. Edge Function
Trước khi nói về Edge Function thì mình muốn nói về cách truyền tải content đến người dùng, theo cách truyền thống thì có 2 cách để có thể truyền tải nội dung đến người dùng đó là
1. Cache lại dữ liệu trên [CDN](http://www.ntccloud.vn/cdn-la-gi-mo-hinh-hoat-dong-va-cac-loi-ich-khi-su-dung-p2290.html) server gần với người dùng để có thời gian phản hồi `nhanh` chóng nhưng việc này sẽ làm content của chúng ta `thiếu dynamic content`. Một trang tĩnh sẽ cung cấp cùng một nội dung cho tất cả khách truy cập, bất kể họ ở đâu trên thế giới và nó sẽ nhanh chóng vì nó được CDN lưu vào bộ nhớ cache. Nhưng cách tiếp cận này có thể không khả thi nếu bạn muốn cung cấp nội dung được cá nhân hóa, tùy thuộc vào , ví dụ, một người dùng đang ở đâu trên thế giới.
2. Dynamically genrate dữ liệu trên mỗi request của người dùng tuy làm trang web của chúng ta `có dynamic content`  nhưng ngược lại thì lại giảm thời gian phản hồi đến nguời dùng. Để mang đến cho người dùng trải nghiệm được cá nhân hóa, bạn có thể tận server side rendering để tạo nội dung động theo từng request đối với các trang trên trang web của bạn. Điều này sẽ cho phép bạn cung cấp nội dung khác nhau cho mọi người dựa trên vị trí của họ, xác thực họ hoặc định cấu hình ngôn ngữ của trang web của bạn.


![giphy.gif](https://images.viblo.asia/4034b553-57c7-4e24-837d-1cfd86a9eab1.gif)

Chình vì  tham vọng của việc mong muốn truyền tải nội dung đến người dùng nhanh chóng hơn và nội dung da dạng hơn thì `Edge Function` đã được ra đời. Về bản chất thì `Edge Function` hoạt động giống như `AWS Lamda` hay `Google cloud Function` . Nhiệm vụ của nó là giúp bạn có thể thực thi được những đoạn code logic ở trên những services này. Giống như CDN, Edge nằm giữa server gốc và user nhưng lại không như CDN, Edge không chỉ lưu static content mà nó còn lưu trữ thêm cả đoạn code logic để thực thi được các web API ,Serverless Functions,... 
![image.png](https://images.viblo.asia/f76334df-2f91-4b1e-948a-225241cc2a4a.png)

Bản chất của middleware là giúp bạn thực thi những đoạn code logic trước khi request được gửi lên server do đó dựa trên cơ chế này bạn có thể sử dụng middleware để thay đổi response nhờ vào cách là rewrite, thêm header,  redirecting, hoặc thậm chí là streaming HTML,...Và nếu bạn có thể sử dụng đoạn code middleware này trên Edge function trên hệ thống Vercel Edge Network thì bạn có thể thực thi đoạn server-side logic này gần với end-user hơn từ đó giúp cải thiện được độ trễ.
![ezgif.com-gif-maker.gif](https://images.viblo.asia/7e2618e7-60fe-47ed-b20a-80a14ddc9453.gif)
Edge Function sử dụng strict runtime build on V8, chính vì vậy nó support các webAPI tiêu chuẩn như Fetch, Geolocation,... và hơn hết là nó nhanh hơn cả trăm lần khi startup so với Nodejs server chạy trên virtual machine hay container.

![image.png](https://images.viblo.asia/130cd363-a71b-495f-ba9b-62199596187d.png)
Tạm kết thúc về Edge Function vì mình không thể cover hết được nội dung của nó và hơn nữa còn rất nhiều các tính năng khác cần khám phá 🙄🙄, các bạn quan tâm có thể đọc thêm ở đây [Edge Function](https://vercel.com/features/edge-functions#examples).

### 4. Server components và Server Side Streaming
Để chuẩn bị đón đợt cập nhật của React 18 với new API như startTransaction(hỗ trợ responsive), streaming server render,...thì Vercel đã làm việc cùng React team để release bản dùng thử các tính năng mới này.
![image.png](https://images.viblo.asia/46be986b-dce0-4178-9950-c0a276547f81.png)
React Server Components cho phép ta render mọi thứ, bao gồm cả chính các component, ở phía máy chủ và đồng nghĩa với việc `zero client-side JavaScript needed`  giúp qúa trình render trang nhanh hơn. Next.js hiện cho phép bạn thực hiện data fetching ở cấp độ component dưới dạng JSX. Bằng cách sử dụng các React Server Components. Các hàm đặc biệt như `getServerSideProps` hoặc `getStaticProps` không còn cần thiết nữa. Điều này phù hợp với mô hình React Hooks về data fetching  với components.
Để tạo 1 server component chúng ta sẽ thêm `.server.js` vào sau tên mỗi component đó.
![image.png](https://images.viblo.asia/02be4869-1722-4b80-b9fd-20ff881346e3.png)
 Việc kết hợp sử dung server side streaming và server component sẽ là bước ngoặt lớn trong cách chúng ta quyết định xây dựng 1 component. Giờ đây việc render component sẽ gần như là **ngay lập tức** (bởi vì chúng ta đã di chuyển việc tính toán dữ liệu từ thiết bị của người dùng sang bên server ). Chúng ta cũng có thể kết hợp sử dụng Edge Function và streaming HTML cho việc render lên phía client. [Đọc thêm](https://nextjs.org/blog/next-12#react-server-components)
### 5. URL import
Giờ đây Nextjs hỗ trợ thêm cả tính năng import bằng URL giống như Deno. Bất kỳ CDN nào cung cấp các mô-đun ES sẽ hoạt động,ví dụ như boootstrap,jquery,...Import URL cho phép bạn sử dụng bất kỳ package nào trực tiếp thông qua một URL. Nếu Next detecte được bạn đang sử dụng URL import thì nó sẽ tự động generate ra `next.lock` file để cache lại để đảm bảo bạn có thể làm việc ngay cả khi offline
![image.png](https://images.viblo.asia/b5e435f4-8549-4980-945b-eaa6bcfb6092.png)
Có thể config trực tiếp trong file next.config.js
![image.png](https://images.viblo.asia/cec7ea2d-3bb2-4510-9382-fdb2d53df68f.png)
sau đó bạn có thể import trực tiếp thông qua URL
![image.png](https://images.viblo.asia/789bc4d1-88b9-422e-8c6d-b5d510d9f7ae.png)
### Lời Kết 
Chắc rằng sau bài viết các bạn đã có thể có cái nhìn tổng quan về Next.js 12 rồi đúng không nào.Vì kiến thức của mình vẫn chưa đủ tốt để có thể hiểu tường tận được tất cả khái niệm nhưng mình cũng đã cố tìm hiểu để có thể truyền đạt 1 cách dễ hiểu nhất có thể đến mọi người . Hy vọng nhận được nhiều ý kiến đóng góp.