## I. Lời mở đầu
![](https://images.viblo.asia/8258af92-2681-460f-b49a-c22de88288da.png)
Có thể nói, Nextjs đang dần phổ biến trong giới lập trình frontend và ngày càng chứng tỏ cho chúng ta thấy hiệu suất cực cao mà các trang web được code bằng Framework này mang lại. Mình có sử dụng cho dự án của mình với Nextjs từ version 9. Thời gian đầu sử dụng mình cũng thấy không cảm thấy hài lòng vì những gì nó đang có ở thời điểm hiện tại. Ở version 9 đặc biệt là version 9.1, 9.2 có một số thiếu sót không đáng có kiểu như: không thể import css từ node modules, không có midleware bên router web (cái này đã có ở NuxtJS), không có đa ngôn ngữ,... Nếu so sánh với 1 Framework hỗ trợ Server-side rendering (SSR) hiện tại là Nest hay NuxtJS thì cá nhân mình vẫn cảm thấy NextJS đang thua kém hơn một chút. Tuy nhiên mình vẫn quyết định tiếp tục sử dụng NextJS và cũng không uổng công mình đợi chờ. Ngay từ version 9.4 một số lỗi nho nhỏ như import css đã được cải thiện. Và đến thời điểm hiện tại, một NextJS 10 mới toanh đã dần hoàn thiện và cung cấp thêm cho chúng ta những thay đổi đặc biệt.
## II. Nội dung chính
NextJS đã release version v10.0.0 vào ngày 27/10/2020. Tuy nhiên, ngày 13/11/2020 đã upgrade lên version v10.0.2-canary.14. Và sau khi lên NextJS v10, Framwork này đã có những cải thiện đáng kể và mới mẻ. Bên dưới mình chỉ đưa ra những thay đổi nổi bật và một số nhận định của mình (bow)

### 1. Built-in Image Component and Automatic Image Optimization

Với những trải nghiệm chưa được tốt, các lập trình viên cũng thường nói với nhau rằng, sao con Next này chậm với lag thế :v. Nhận thấy điều này, trong phiên bản nâng cấp này, NextJS đã quan tâm hơn đến Developer Experience (Coding) and User Experience (Trải nghiệm người dùng)
NextJS 10 giới thiệu một component mới là: ```next/image```. Trước đó đội phát triển NextJS cũng đã làm việc với Google Chrome nhằm tối ưu hiệu suất cho component này. Với ```next/image```, tất cả các hình ảnh sẽ tự động được lazy-load và responsive. Vậy thì còn chần chừ gì mà không refactor nhỉ các bạn (yeah)

```js
<img src="/profile-picture.jpg" width="400" height="400" alt="Profile Picture">
```

hãy sử dụng ```next/image``` để hiệu suất trang web được tốt nhất

```js
import Image from 'next/image'

<Image src="/profile-picture.jpg" width="400" height="400" alt="Profile Picture">
```
### 2. Internationalized Routing
Ngày nay, internet và website là những thứ vô cùng phổ cập. Dần dần mọi người muốn website của nhiều được truy cập ở nhiều nơi hơn để kiếm được các user (khách hàng, người dùng) khác nhau với số lượng lớn hơn. Chính vì vậy đa ngôn ngữ trong website là vô cùng cần thiết. Thiết nghĩ 1 Framework có cộng động lập trình viên lớn như NextJS lại thiếu mất tính năng này thì thật là đáng tiếc. Với sự nâng cấp lần này, Nextjs cung cấp hai option khá là hay là Translations and Routing.
- Translation: Dịch theo các ngôn ngữ
- Routing: NextJS giờ đây đã hỗ trợ định tuyến miền cho ngôn ngữ cụ thể là:

1.  Subpath routing

Ví dụ trang web của bạn có đường dẫn là: www.viblo.asia/cn/blog. Thì config như dưới để phát hiện ngôn ngữ:

```js
module.exports = { 
  i18n: { 
    locales: ['en', 'cn'], 
    defaultLocale: 'en' 
  } 
}
```

2.  Domain routing

Với phần định tuyến miền sẽ phát hiện và chuyển ngôn ngữ qua domain trang web của bạn, ví dụ: www.viblo.cn thì trang web sẽ nhận ngôn ngữ Trung Quốc chẳng hạn. Còn www.viblo.com sẽ mặc định nhận ngôn ngữ tiếng Anh.
```js
// next.config.js
module.exports = {
  i18n: {
    locales: ['en', 'cn'],
    domains: [
      {
        domain: 'viblo.com',
        defaultLocale: 'en'
      },
      {
        domain: 'viblo.cn',
        defaultLocale: 'cn'
      }
    ]
  }
}
```

### 3. Next.js Analytics
![](https://images.viblo.asia/393dfd16-fb92-4f7f-aa7d-684783a80a6d.png)

Next.js Analytics cung cấp các thông tin về performance của trang web, trước đây có thể các bạn hay dùng một trang của google là [Lighthouse](https://developers.google.com/web/tools/lighthouse)

Sử dụng và cài đặt chi tiết tham khảo tại:
[Next.js Analytics](https://vercel.com/docs/next.js/analytics) và [Nextjs performance Document](https://nextjs.org/docs/advanced-features/measuring-performance)

### 4. Next.js Commerce
![](https://images.viblo.asia/8eeab662-21ee-48ac-97eb-c4a8bf51d686.png)

Next.js Commerce nhằm phục vụ clone và deploy nhanh chóng cho bạn nào đang muốn làm trang thương mại điện tử. Chỉ cần vài thao tác đơn giản là bạn đã có thể sở hữu cho mình một trang web E-Commerce rồi :v

Chi tiết tham khảo tại:
[Next.js Commerce](https://nextjs.org/commerce)

### 5. React 17 Support
Hiện tại NextJS 10 đã hỗ trợ cho ReactJS 17, Bạn hãy update phiên bản React và tận hưởng nhé.
```cmd
npm install next@latest react@latest react-dom@latest
```

### 6. Importing CSS from node_modules
![](https://images.viblo.asia/21847f6f-ff77-4fe6-b892-7cb6455ed1e9.png)

Như mình có nói ở trên, chúng ta đã gặp phải lỗi import css từ phái React Component bên thứ 3. Ví dụ bootstrap, các package của react, ...

Ở NextJS 9.x đã có cách fixed tạm thời tuy nhiên khi lên NextJS thì mọi thứ đã được giải quyết. Bây giờ bạn install một package bất kỳ bình thường và import nó vào component trực tiếp mà không cần config gì trong next.config.js cả

```js
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
```
### 7. Automatic href resolution
Một điều hay nữa này, trước đây trong team của mình các bạn khi sử dụng ```next/link``` rất hay quên thêm thuộc tính ```href```, đôi lúc có bạn lại dùng chỉ một trong hai ```href```hoặc ```as``` khiến cho khi chuyển router trang bị reload trước khi render view :)).
```js
<Link href="/posts/[slug]" as="/post/co-gi-moi-trong-phien-ban-nextjs-10-gGJ59MRx5X2">
```

ở NextJS 10 thì bạn chỉ cần sử dụng thuộc tính ```href``` mà không cần thêm thuộc tính ```as``` như trước nữa. Mình cũng thấy việc bỏ 1 attribute đi là điều cần thiết, tránh trường hợp thẻ quá dài hay mọi người bị quên 1 thuộc tính nào đó.
```js
<Link href="/post/co-gi-moi-trong-phien-ban-nextjs-10-gGJ59MRx5X2">
```
## III. Tạm kết
NextJS 10 đã được ra mắt đã giảiquyết được cơ số các tồn đọng cũng như giúp hiệu suất trang web được tốt hơn. Cùng chờ đợi những thay đổi của NextJS và refactor lại code nào (tunghoa) (yeah)
![](https://images.viblo.asia/b67bf6ec-fa7f-475b-8173-6e09f9e5d848.gif)