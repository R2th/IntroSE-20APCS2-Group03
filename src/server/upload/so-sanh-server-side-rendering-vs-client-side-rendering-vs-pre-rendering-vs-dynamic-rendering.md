# So sánh Server Side Rendering vs Client Side Rendering vs Pre Rendering vs Dynamic Rendering
Trong bài này chúng ta sẽ so sánh Server side rendering vs Client side rendering vs Pre rendering vs Dynamic Rendring. Giữa công nghệ mới và công nghệ cũ bạn sẽ chọn cái nào.

Hiện nay đã là 2021, công nghệ web đã thay đổi chóng mặt và bạn sẽ xoắn hết cả não khi mình sẽ kể những công nghệ render web hiện nay:

1. Server Side Redering (SSR)
2. Client Side Rendering (CSR)
3. Pre-Rendering: Static Site Generation (SSG) và Server Side Rendering (Universal SSR)
4. Dynamic Rendering

## 1. Server Side Rendering

Server Side Sendering (SSR) là cơ chế được dùng từ rất lâu, đa số xử lý logic sẽ nằm ở phía server. Server sẽ xử lý và thao tác với databse để render ra HTML gửi về cho client. Browser ở client chỉ cần hiển thị HTML ra cho người dùng.
![image.png](https://images.viblo.asia/028cdede-032c-4b6d-a879-3c4efbe6cb1c.png)

### Đặc điểm của Server Side Rendering

* Xử lý logic và Render HTML tại server
* Routing chuyển trang tại server

### Ưu điểm của Server Side Sendering

Dù ra đời lâu rồi nhưng Server Side Rendering vẫn có nhiều ưu điểm mà nhiều cơ chế khác không có như:

* Load lần đầu tiên nhanh, caching hay CDN dễ dàng
* Thân thiện với SEO vì bot như google, bing dễ đọc được trang web dưới dạng html
* Tương thích nhiều trình duyệt trên nhiều thiết bị vì logic Javascript


### Nhược điểm

- Vì xử lý logic nhiều tại server => server dễ bị quá tải và chậm
- Chuyển trang là phải load lại toàn bộ trang web => gây khó chịu về mặt UI/UX cũng như tốn băng thông

Ai đang dùng Server Side Rendering

Nhiều website đứng top đầu về truy cập tại Việt Nam vẫn đang dùng SSR như:

- Các trang tin tức: Zingnews.vn, 24h.com.vn, Kenh14.vn, vtv.vn
- Các trang phim truyện: Nettruyen.com, Phimmoiz.com
- Diễn đàng: Voz.vn
- Những trang được xây dựng từ WordPress như blog của mình chẳng hạn


## 2. Client Side Rendering

**Client Side Rendering (CSR)** là những trang web mà HTML, CSS sẽ được render ở trên trình duyệt.

![image.png](https://images.viblo.asia/9e7257ef-4537-4fc9-92ef-d5e270fdb625.png)

**Đặc điểm của Client Side Rendering**

- Xử lý logic đơn giản và render HTML, CSS sẽ nằm ở Client.
- Logic phức tạp liên quan đến bảo mật và database vẫn nằm ở server
- Chuyển trang tại client

**Ưu điểm của Client Side Rendering

- Logic được chuyển bớt cho client => Server được giảm tải
- Page load một lần duy nhất. Các lần chuyển trang sau không cần load lại page => mượt, nhanh, tốt về mặt UI/UX
- Băng thông được giảm tải vì server chỉ cần gửi JSON


**Nhược điểm của Client Side Rendering**

- Lần lần đầu khá chậm vì client phải tải 1 cục Javascript về, sau đó chạy JS để DOM và gọi API, rồi mới render ra HTML.
- Không thân thiện SEO, mặc dù ngày nay

Công nghệ hỗ trợ CSR: React, VueJs, Angular, Svelte…

Những công ty nào đang dùng Client Side Rendering?

Mạng xã hội: Facebook, Instagram, WhatsApp, Twitter

Giải trí: Netflix

Forum: Reddit


## 3. Pre-Rendering
Pre-Rendering là công nghệ mới nhất về render web hiện nay. Website sẽ được render ra HTML trước khi gửi về cho client (khá giống SSR). Vì ra sau cùng nên Pre-Rendering khắc phục được các nhược điểm của các công nghệ như SSR hay CSR. Hiện nay có 2 loại Pre-Rendering đó là: Static Site Generation và Server Side Rendering (hay còn gọi là Universal).

**Static Site Generation là gì**

Static Site Generation (SSG) là website được render ra html trong quá trình build, vì thế html sẵn sàng được dùng cho mỗi request.

Đại diện cho SSG là các công nghệ như GatsbyJs, VueExpess, Hugo, NuxtJs, NextJs…


Ai đang dùng Static Site Generation? Trang chủ React, Airbnb Engineering & Data Science, Shoptify.Design

**Ưu điểm Static Site Generation**

* Siêu nhanh ( cả về tốc độ develop lẫn tốc độ của trang web).
* Tiết kiệm chi phí server vì ít dùng tài nguyên.
* Thân thiện SEO.

**Nhược điểm Static Site Generation**

* Website không linh động, nội dung sẽ trở nên lỗi thời nếu thay đổi quá thường xuyên vì là web tĩnh (có thể dùng Ajax để xử lý dữ liệu động nhưng nó sẽ không được cache cũng như không thân thiện SEO)
* Khả năng mở rộng không tốt vì mỗi lần cập nhật dữ liệu là phải qua quá trình build tốn khá nhiều thời gian.
* Thời gian build tăng lên dựa vào size của project
* Mình đã có bài đánh giá chi tiết GatsbyJs, mọi người có thể đọc để hiểu thêm về Static Site Generation.

## Server Side Rendering (Universal SSR)
Đây là kĩ thuật kết hợp giữa Client Side Rendering và Server Side Rendering truyền thống. Khi request lần đầu tiên, server sẽ gọi API và render HTML, CSS, JS gửi về cho client (giống SSR). Ở các lần request tiếp theo thì client sẽ tự gọi API và render tại client ( giống CSR).

ều này đem lại sự linh hoạt và khắc phục các nhược điểm của CSR và SSR. Giúp website vừa có thể cân bằng tải server vừa có thể SEO tốt.
![image.png](https://images.viblo.asia/63c128af-53c3-43da-951a-07e9df4a76df.png)

Ví dụ những framework cho phép SSR: NextJs và NuxtJs

**Ưu điểm Universal SSR**

* Nội dung được cập nhật thường xuyên
* Site load nhanh vì được render tại server trước khi gửi về cho client
* Tối ưu SEO và trải nghiệm người dùng

**Nhược điểm Universal SSR**

* Không thể deploy đến một static hosting.
* Gọi API và render tại server.

## 4. Dynamic Rendering

Dynamic Rendering hay còn gọi là kết xuất động, một kĩ thuật cung cấp HTML phù hợp tùy thuộc vào đối tượng request. Cụ thể là nếu đối tượng request là Browser thì server sẽ trả về một phiên bản SPA, còn nếu là bot như Google, Bing thì server sẽ trả về html đã được render tại server để phục vụ cho crawler. Điều này giải quyết được vấn đề muôn thuở của CSR là SEO.
![image.png](https://images.viblo.asia/8e341971-b822-46eb-82c3-b019600f4e48.png)

Một số trình kết xuất động phổ biến là Puppeteer, Rendertron và prerender.io

Cùng xem Google nói về sự quan trọng của dynamic rendering cho Javascript SEO

{@embed: https://www.youtube.com/watch?v=CrzUP6MmBW4}

Ai đang dùng Dynamic Rendering ?

Mình có check soure của Shopee thì họ dùng React cho client, nhưng lại có khả năng SEO rất tốt. Nên rất có thể họ dùng Dynamic Rendering.

**Ưu điểm Dynamic Rendering:**

* Không cần phải thay đổi lại source code của Client Side Rendering
* Hỗ trợ SEO
* Vẫn giữ được những ưu điểm của Client Side Rendering

**Nhược điểm Dynamic Rendering:**

* Cần một service riêng để chạy
* Khó khăn cho nhà phát triển vì cần phải làm chủ được kĩ thuật này.


**Tóm lại**

Không có gì là hoàn hảo tuyệt đối, sự lựa chọn là ở bạn tùy thuộc vào business dự án. Với mình, mình thích những công nghệ mới nên mình vẫn thích SSR Universal và Dynamic Rendering hơn. Cám ơn các bạn đã đọc đến đây, have nice day 😛