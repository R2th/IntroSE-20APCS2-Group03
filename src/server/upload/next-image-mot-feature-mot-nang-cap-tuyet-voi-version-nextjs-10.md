NextJS đã cho ra mắt version 10 cách đây 2 tháng với hơn 20 fearture nâng cấp đáng giá. Chúng ta có thể kể ra những features nổi bật như 

1. Next/Image: với khẳ năng render image cho các kích thước màn hình tương ứng
2. Next/link: giải quyết vấn đề `href` và giờ đây chúng ta không còn phải khai báo `as` như trước
3. Next.js Analytics: Đo lường và hành động dựa trên số lượng người dùng
4. Next.js Commerce:  Hỗ trợ xây dựng các trang thương mại điện tử hiệu suất cao
5. React 17 Support:  Version 10 đã tích hợp react mới nhất là version 17

Còn rất nhiều feature hay các bạn có thể tham khảo ở [đây](https://nextjs.org/blog/next-10)

Bây giờ chúng ta đi tìm hiểu sâu vào 1 feature mà mình đã tích hợp vào trong dự án trong quá trình upgrade lên NextJS version 10 đó là [Next/Image](https://nextjs.org/docs/api-reference/next/image)

Một trong những lý do mình muốn update lên Next 10 vì có Next/Image và Next/Link

Next/Image đã giải quyết được các vấn đề gì, tại sao nó lại luôn cuốn mình chúng ta cùng tìm hiểu thêm nhé

Với bản nâng cấp version 10 ngoài optimize về tối ưu dung lương file js giảm 23% so với version trước, còn giải quyết vấn đề nữa là tối ưu hoá hình ảnh vì ngoài file js vì hình ảnh chiếm 50% dung lượng tải trang.

Vấn đề ở đây là gì, ngày nay chúng ta truy cập vào trang web không phải từ PC, mà còn từ các thiết bị cầm tay như điện thoại, tablest, rất nhiều các kích thước khác nhau.

Ví dụ trên điện thoại màn hình nhỏ việc load hình ảnh kích thước 2000 x 2000 pixel là điều không cần thiết. Vì vậy để tối ưu hoá về mặt hình ảnh thì các nhà phát triển NextJS đã hỗ trợ cơ chế render, tối ưu hoá hình ảnh trên các thiết bị khác nhau. 

Nếu trên PC cần tải các hình ảnh 2000 x 2000 pixel, thì trên các thiết bị mobile chúng chỉ cần tải kích thước 100 x 100 pixel. Để tăng trải nghiệm người dùng lên một level cao hơn.

Còn một tính năng khác của `Next/Image` là tự động lazy loading, tự động preloading và xác định kích thước ảnh tương ứng với thiết bị 


Chúng ta cùng tìm hiểu qua cách sử dụng nhé

Trước khi sử dụng được `Next/Image` chúng ta cần khai báo nguồn  `url` image từ nguồn nào 

trong `next.config.js` như sau 

```js
module.exports = {
  images: {
    domains: ['example.com'],
  },
}
```

nếu chúng ta có nhiều nguồn thì chỉ việc khai báo thêm trong `domains` mọi người nhé.

Bây giờ chúng ta có thể sử dụng như sau


```js
import Image from 'next/image'

function Home() {
  return (
    <>
      <h1>My Homepage</h1>
      <Image
        src="/me.png"
        alt="Picture of the author"
        width={500}
        height={500}
      />
      <p>Welcome to my homepage!</p>
    </>
  )
}

export default Home
```

thay vì sử dụng `img` của `Html` thông thường thì chúng ta khai báo `import Image from 'next/image'` nhé các bạn 

một trong những props quan trọng và requried là `width` và `height` nếu không có thuộc tính này thì bạn buộc phải khai báo `layout="fill"`

Để tối ưu cho các devices, Next/Image cho chúng ta khai báo các devices cũng như các image size, nếu không khai báo thì nextjs sẽ lấy các giá trị mặc định.

```
module.exports = {
  images: {
    domains: ['example.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}
```

Về cách sử dụng đơn giản phải không các bạn, còn một vài props của Next/Image bạn có thể tìm hiểu thêm ở [đây](https://nextjs.org/docs/api-reference/next/image)

Hy vọng bài viết giúp bạn có thể áp dụng `Next/Image` vào trong dự án của mình một cách nhanh chóng.