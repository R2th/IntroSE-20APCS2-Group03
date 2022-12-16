## Nội dung: 
Tại vì hôm trước mình có gặp 1 library khá là thú vị, nhưng lại dùng typescript nên trước khi đến với library đó thì mình cần phải setup typescript trước cho dự án của mình trước đã, do đó mới có bài hôm nay.

Nhưng tại sao là là Nextjs mà ko phải create-react-app thì do mình muốn đổi gió chút cũng như việc cũng có mấy bài về việc kết hợp create-react-app với typescript rồi nên mình ko muốn viết về nó nữa.

Nếu bạn chưa biết nextjs là gì thì nó có tên khoa học vẫn là nextjs, và nếu bạn đã nghe qua khái niệm server side rendering (SSR) thì nó chính là thư viện đc sinh ra để giúp bạn giải quết vấn đề này mà create-react-app không làm được… Bạn có thể tìm hiểu thêm về nó qua trang chủ hoặc các tài liệu khác nhé.

Còn typescript thì nếu bạn code JS thì bạn chắc hẳn đã nghe qua rồi, nếu tóm tắt lại theo ý hiểu của mình thì có thể được coi là một phiên bản nâng cao của Javascript bởi việc bổ sung tùy chọn kiểu tĩnh và lớp hướng đối tượng mà điều này không có ở Javascript. Do nó giúp việc tổ chức, debug code dễ dàng hơn.

Thôi không luyên thuyên, nhảy vô code luôn để hiểu dần nhé:
## Cài đặt ứng dụng:
 Để sử dụng nextjs thì cũng có 2 kiểu như khởi tạo bằng lệnh hoặc cài đặt các dependencies rồi config toàn bộ từ đầu như install next, babel, react..., nhưng để tiết kiệm thời gian, mình sử dụng phương pháp 1 để khởi tạo project nhé, nó tương tự với việc mình tạo project bằng create-react-app vậy:
 Dùng lện `npx create-next-app nextjs-typescript` để toại project **nextjs-typescript**
 
 Sau đó bạn thêm file **tsconfig.json** ở ngoài **root**, lưu ý, file này để trống nhé bạn, Next.js sẽ tự fill data để config nó sau.
 
 Tiếp đó mình chạy lệnh npm run dev để run project, nhưng hiện tại thì do có file ** tsconfig.json** nên nó sẽ hỏi mình là muốn sử dụng typescript không và sẽ hướng dẫn mình cài đặt các package tương ứng:
 ![](https://images.viblo.asia/141e66ad-ed75-4f0a-b09a-b5352a2f8810.png)

Bạn có để ý trong ảnh có line này không: 
` yarn add --dev typescript @types/react @types/node`  
mình copy luôn line đó vào và tiến hành cài đặt

Đã xong, thử start xem nào, vẫn lỗi đỏ loè :(
![](https://images.viblo.asia/d280c1a8-9d8d-4eab-b253-f7317739a3ea.png)

Đọc lỗi mới thấy chưa build sau khi cài các đống đó để nextjs setup lại theo typescript, mình lại chạy `npm run build`

Vậy là nextjs đã detect typescript được sử dụng thay cho js và file ** tsconfig.json** đã được fill

Ở file **./pages/_app.js** mình đổi lại tên file là **./pages/app.tsx** và sửa lại như sau:
```
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
```

Giờ chạy thử lại xem nào: `npm start` và thành công:
![](https://images.viblo.asia/524f54c3-b27b-4952-bcbf-765460fc8e6f.png)

Nếu bạn để ý, thì khi mở http://localhost:3000/ và hard reload page thì tốc độ cực kỳ nhanh, hoàn toàn khác với create-react-app, đó chính là ưu điểm lớn nhất của nextjs với CRA
 
## Kết luận:
Hy vọng qua bài vừa rồi, bạn có thể học được gì đó thú vj, hẹn gặp lại các bạn ở bài sau!