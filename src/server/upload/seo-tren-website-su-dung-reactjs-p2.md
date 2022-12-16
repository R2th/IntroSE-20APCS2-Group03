Tiếp theo nội dung đã được viết tại bài: https://viblo.asia/p/seo-tren-website-su-dung-reactjs-p1-Eb85omB2Z2G

Hôm nay tôi chia sẻ thêm về cách thức để thực hiện render HTML trên server (Server rendering) trên ứng dụng ReactJS-based thay vì được render bới trình duyệt. 
Cách thức này sẽ hỗ trợ được việc SEO cho các ứng dụng reactjs nếu tốc độ tải trang chậm do đọc API mà google-bot không thế lấy được thông tin và index.

Server rendering là thuật ngữ dùng để chi việc xử lý render toàn bộ nội dung HTML/CSS phía server để trình duyệt hiển thị, thay vì browser chạy code js để render ra HTML phía browser.
Đây cũng có thể gọi là một nhiệm vụ khá khó khăn cho dev khi làm việc với các thư viên UI hoặc framework JS, là một thư viện UI,  React cũng không ngoại lệ. 

Chúng ta sẽ thư cách render trên server như thế nào, và cách áp dụng nó vào các ứng dụng web trên nền react-based.

**Sever rendering là gì?**

Những thư viện UI như là React sử dụng một số abstract DOM được tạo bằng javascript, ở React, gọi nó là Virtual DOM, VirtualDOM sẽ hỗ trợ nhanh hơn việc update khi có thay đổi UI và giảm thiểu thời gian xử lý bằng cách chỉ tương tác với phần thay đổi thôi.

Ví dụ khi chúng ta có action, click vào button thì thay đổi thông tin sản phẩm trên giao diện, thì thay vì phải xử lý update toàn bộ website sau khi click nút, thì chỉ cần update giá trị của các label đang hiển thị thôi, những phần nào không thay đổi thì không update, như vậy sẽ tiết kiệm được rất nhiều thời gian.

Cách thức này khác nhiều so với tư tưởng làm việc trước đây, là Server tạo ra HTML, sau đó gửi nội dung HTML về trình duyệt, chuyển thành các cây DOM và có thể thao tác với JS (ví dụ như jquery) nếu cần.

Cách này thì khá bất cập và cũng không hỗ trợ việc khai báo state (trạng thái),  cách làm mới mà các thư viện UI cung cấp khá mạnh mẽ và đặc biệt là có hỗ trợ quản lý state.

Vấn để là khi sử dụng các thư viện DOM được tạo base trên JavaScript, thì kết quả nếu chúng ta view-source nó như thế này:

![](https://images.viblo.asia/d5842bfb-151f-4bba-9972-93748c7e57e1.png)

Mặc du là khi view bằng trình duyệt, thì rõ ràng có text

![](https://images.viblo.asia/dde016fc-a362-4acc-bf72-c20c7315d7a0.png)

**Về vấn đề SEO**
Khi triển khai ứng dụng lên webserver, thì expect phần nhiều sẽ là đươc các search engines crawl nội dung website và index,

Hiện tại Google Search Engine đã hỗ trợ các website viết bằng JS để render ra HTML, nhưng nếu nội dung của website được render nhanh trong đâu đó vài ba giây, thì nội dung vẫn được crawl như bình thường, nhưng vì lý do nào đó mà mất nhiều thời gian hơn, thì chắc chắn là Google chỉ crawl được nội dung như ở phần view-source bên trên và index nội dung đó thôi.


Next.js  là một tool được based trên React, nó cho phép tự động render app ở trên server. Không càn cài đặt hoặc setting server rendering libraries gì cả.

**Setting Next.js**
Để setting Next.js, cần phải có Node và npm được cài đặt trước đó. Tạo mới một node project với npm bằng lệnh:
    
```
npm init -y
```
    
Một file `package.json` sẽ được tạo ra với nội dung tương tự như sau:

```
{
    "name": "next-first-step",
    "version": "1.0.0",
    "main": "index.js",
    "license": "MIT"
}
```

Tiếp theo là cài đặt Next.js trong project mới bằng npm:

```
npm install --save next
```


Next.js  là một React tool, vì thế nó cần có thư viện React để chạy, vì thế vẫn cần cài đặt React và React DOM:

```
npm install --save react react-dom
```

Cần có một script để start app. Thêm  đoạn sau vào file `package.json`:

```
...
"scripts": {
  "dev": "next"
},
...
```

Tiếp theo là Start app bằng lệnh:

```
npm run dev
```

Một lỗi như bên dưới sẽ bắn ra:

![](https://images.viblo.asia/f4313078-58a3-4e5b-9ca6-61480276a1a7.png)

Lỗi này phát sinh khi không có thư mục `pages` trong project. Thư mục này sẽ lưu trữ các file .js của ứng dụng.

Tạo folder `pages` và chạy lại:

![](https://images.viblo.asia/890a6e4f-8c29-45b3-b3e9-d916a23bbdc4.png)

Mở browser và URL: `http://localhost:3000`

![](https://images.viblo.asia/099dea56-cf2c-498c-a6c1-4644ba7d60b5.png)

Vì thư mục `pages` không có file nào, nên phát sinh lỗi 404, Xử lý bằng cách thêm file `index.js` với nội dung như sau:

```
// ./pages/index.js
import React from 'react';
const Index = () => (
  <div>
    <h1>This is your app's homepage</h1>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit porro deleniti amet. Error ipsam soluta quas maiores quibusdam accusamus dignissimos repellendus minus! Odio repudiandae ipsum impedit magnam odit non cum?</p>
  </div>
)

export default Index;
```

Bây giờ quay lại reload trình duyệt, màn hình hiển thị như sau:

![](https://images.viblo.asia/221fb805-e0cb-4a76-a849-3978995c23b1.png)

**Implicit routing**
Routing trong Next.js không cần yêu cầu cấu hình nhiều, chỉ cần như nội dung file ở phía trên. Khi tạo 1 file JS trong thư mục `pages`, nó sẽ tự động được mapping với 1 route. 

Ví dụ nếu chúng ta có 1 file tên là `about.js`, thì nó sẽ tự động được mapping vào `/about`, ngoại trừ file `index.js` thì được map với `/`.

Để xem trang about, add thêm file `about.js` trong folder `pages`:

```
// ./pages/about.js
import React from 'react';
const About = () => (
  <div>
    <h1>This is your app's about page</h1>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit porro deleniti amet. Error ipsam soluta quas maiores quibusdam accusamus dignissimos repellendus minus! Odio repudiandae ipsum impedit magnam odit non cum?</p>
  </div>
)
export default About;
```

Khi truy cập `/about`, màn hình sẽ như sau:

![](https://images.viblo.asia/0ef4c68f-6f63-452b-a643-babd93506fcd.png)

Kiểm tra nội dung SEO bằng cách view-source, thì sẽ thấy tòan bộ nội dung HTML đã được render ra từ phía server, thay vì chỉ có các file JS như trước đây:

![](https://images.viblo.asia/ab59b7b7-8b94-48ee-9759-c120f2d9133a.png)

**Kết luận**

Thực tế những ví dụ ở trên là khá simple, tuy nhiên Next.js có thể làm được rất nhiều thứ khác, ví dụ như Parameterized routing, route queries, API calls, ... 

Nếu có hứng thú với Next.js, có thể truy cập vào trang chủ của project này tại đây: https://nextjs.org/

Next.js xử lý vấn đề về performance rất tốt, nên bạn không cần phải lo lắng khi quyết định dùng nó để start 1 ứng dụng.

Tham khảo: https://blog.pusher.com/implicit-routing-server-rendering-react-next-js/