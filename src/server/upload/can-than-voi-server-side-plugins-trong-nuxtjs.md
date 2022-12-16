__Nếu bạn build một ứng dụng server-side rendering (SSR) với [Nuxt.js](https://nuxtjs.org/), bạn hoàn toàn có thể tạo ra một ứng dụng với độ linh hoạt cao cùng với trải nghiệm hiệu suất tuyệt vời.
Nhưng nó phụ thuộc vào một server node, điều này có thể mang lại một chút khó khăn cho bạn. Trong bài viết này, tác giả sẽ chỉ ra một issue mà ít được biết đến với SSR plugins trong nuxt.__

Nếu bạn từng phát triển ứng dụng SSR với Nuxt, có thể bạn sẽ cần tạo ra một vài server-side plugins. Và như bạn đã biết, trong Nuxt, plugins có thể chạy server-side và client-side.

# Môi trường rintime
Khi sử dụng plugins ở client-side thì khá đơn giản, mỗi người dùng có một trình duyệt riêng, thậm chí cùng một người dùng khi truy cập nhiều tab riêng biệt vẫn được, vì vậy luôn đảm bảo là mỗi plugin sẽ chạy trên môi trường của riêng nó. Nhưng khi ở server-side thì khác, mọi thứ không như là bạn nghĩ. Bạn cần phải ghi nhớ một điều là Nuxt server là một instance đang chạy và tất cả những lần truy cập đầu tiên của trang web đều sẽ "hit" server nuxt.
Mỗi plugin chạy cho mỗi người dùng server-side với trạng thái mới của nó và được lưu trữ lại, nhưng hầu hết đều là lưu trữ trong bộ nhớ.

# Play Time
Giờ tạo một project example đã, tôi sẽ chỉ cho bạn thấy 
```sh
yarn create nuxt-app server-plugin-test
cd server-plugin-test
yarn dev
```
Kế đến tạo một plugin server-side đơn giản, có một biến `magicState` kiểm tra query của request tới server, và nó nằm ngoài hàm plugin được export.
```js
let magicState = false
export default ({ route }) => {
  if (route.query.test) {
    magicState = true
  }
  console.log(magicState)
}
```
Lưu file ở đường dẫn: `plugins/test.server.js`

Sau đó thêm plugin vào Nuxt config file
```js
plugins:[ '~/plugins/test.server'],
```
Để đơn giản, bạn hãy truy cập http://localhost:3000, sau đó view-source để đảm bảo là bạn không trigger thêm thứ gì khác, chỉ hit server nuxt thôi.

![](https://images.viblo.asia/f18e7c79-9f66-46f9-8cfd-c223f57e9e00.png)


Giờ check lại trên terminal, chắc chắn bạn sẽ thấy false được in ra.

![](https://images.viblo.asia/e6cb7bdb-18f1-4cf4-bd4c-c2149a5b9efe.png)


Rồi, giờ sửa 1 tí trên url, thêm query `?test=1`

![](https://images.viblo.asia/8b545d31-9366-466f-9c5e-1db8aacc7180.png)


Bạn sẽ thấy trên terminal in ra như sau

![](https://images.viblo.asia/130e5113-29c3-4edb-98b0-6d218a09becf.png)


Hoàn toàn bình trường, giờ hãy thử **remove** query lúc nãy đi `?test=1`

![](https://images.viblo.asia/ec84410b-267e-4194-949c-8bf51af80e0a.png)


Có gì lạ ở đây? mọi thứ đều bình thường.

Nhưng khoan, chưa.

Thử tắt dev server đi và build ra nào

```
yarn build
yarn start
```

![](https://images.viblo.asia/145f0008-7aea-4e01-bc38-75d173e05df9.png)


![](https://images.viblo.asia/1785c106-32bc-467a-9964-5b9dcf146cfc.png)


Giờ tái hiện lại với step y chang lúc nãy


![](https://images.viblo.asia/f18e7c79-9f66-46f9-8cfd-c223f57e9e00.png)


Trên terminal

![](https://images.viblo.asia/e6cb7bdb-18f1-4cf4-bd4c-c2149a5b9efe.png)


![](https://images.viblo.asia/8b545d31-9366-466f-9c5e-1db8aacc7180.png)


Trên terminal

![](https://images.viblo.asia/130e5113-29c3-4edb-98b0-6d218a09becf.png)


Sửa url lại như cũ

![](https://images.viblo.asia/f18e7c79-9f66-46f9-8cfd-c223f57e9e00.png)

Và trên terminal

![](https://images.viblo.asia/100a55fb-c94e-488b-a00d-031559abbc0f.png)

# Trời ơi cái quần què zì zaay #@$)^#!
Vậy đó, trên môi trường `production` tất cả các biến bên ngoài plugin đều được shared cho **tất cả users**.

Đến đây có thể bạn sẽ lắc đầu ngao ngán, "no no no no..., tao code dự án cả mấy tháng trời rồi, gì đây sao tao chưa gặp bao giờ".

Bạn có thể đang gặp vấn đề mà không hề biết hoặc tệ hơn có thể vấn đề đang chực chờ xuất hiện khi bạn có đủ lượng truy cập.

Tôi đã dính chưởng và khá vất vả khi lần đầu tiên tiếp cận với nuxt, vì mãi đến khi lên production thì vấn đề mới lần đầu xuất hiện. Trường hợp của tôi là sử dụng một plugins ở phía server để phát hiện thiết bị di động, và đột nhiên một vài người dùng desktop nhập được giao diện di động! Một bài học thật đáng nhớ, nhưng may mắn là chúng tôi đã kịp thời revert lại code.

Vì vậy, hãy học hỏi từ (những) sai lầm của tôi và thật cẩn thận khi sử dụng những plugin server-side. Luôn luôn khai báo biến của bạn bên trong plugin, và kiểm tra cẩn thận để đảm bảo kết quả trả về hoàn toàn giống nhau dù với 1 hay 1.000 users.

---
Lược dịch từ [https://masteringnuxt.com/](https://masteringnuxt.com/blog/problems-with-server-side-plugins-in-nuxtjs)