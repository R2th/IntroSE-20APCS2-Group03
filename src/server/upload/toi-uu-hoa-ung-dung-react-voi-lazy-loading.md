Lazy Loading là một kỹ thuật cũ để tối ưu hoá ứng dụng web cũng như ứng dụng di động. Cách hoạt động của nó khá đơn giản - Không hiển thị đối tượng nếu chúng không được xem hoặc không được yêu cầu tại thời điểm đó. Ví dụ, nếu chúng ta có một danh sách các bài đăng để hiển thị, ban đầu chúng ta chỉ nên hiển thị một phần vừa đủ với màn hình. Điều đó có nghĩa là những bài đăng còn lại sẽ được hiển thị khi chúng ta yêu cầu ( như cuộn chuột ).

## Tại sao lại cần Lazy Loading?
Để đảm bảo tính thân thiện với người dùng, chúng ta không nên để họ xem toàn bộ trang web, ít nhất là vào lúc bắt đầu. Cho dù giao diện người dùng ứng dụng của chúng ta đã được cấu trúc như thế nào, có một số thành phần nhất định mà người dùng có thể không cần xem từ ngay lúc đầu hoặc không bao giờ cần xem.

Trong những trường hợp này, việc hiển thị những thành phần đó không chỉ gây hại cho hiệu suất của ứng dụng mà còn lãng phí rất nhiều tài nguyên ( đặc biệt khi chúng có chứa hình ảnh ) . 

Vậy nên, việc loading và rendering các đối tượng đó theo yêu cầu dường như là một phương án hiệu quả để giải quyết vấn đề trên. Nó giúp cải thiện hiệu suất của ứng dụng, đồng thời có thể giúp ta tiết kiệm rất nhiều tài nguyên.

## Sử dụng Lazy Loading
Ở đây, ta sẽ tạo một ứng dụng mẫu để áp dụng lazy loading. Trước tiên, ta cần khởi tạo ứng dụng React của mình bằng cách sử dụng `create-react-app` với các câu lệnh bên dưới:

```
create-react-app lazydemo
cd lazydemo
npm run start
```

Việc này có thể mất vài phút để khởi tạo và chạy trên browser với cổng 3000 - mặc định.

> Nếu bạn gặp lỗi trong quá trình cài đặt ứng dụng React. Hãy thử sử dụng câu lệnh `npm install -g create-react-app`

Bây giờ, chúng ta sẽ tạo một danh sách các bài đăng ngẫu nhiên. Tạo một tệp có tên `data.js` trong folder `src` của folder dự án. Bạn có thể tạo dữ liệu riêng cho mình.Ở đây, mình sao chép dữ liệu từ https://jsonplaceholder.typicode.com/posts

```
export default [
  {
    id: 1,
    title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  .....
]
```

Bây giờ, hãy replace lại file App.js bằng đoạn code dưới đây:

```
import React from 'react'
import data from 'data'

const Post = ({ id, title, body }) => (
  <div className="post">
    <div className="post-body">
      <h4>{title}</h4>
      <p>{body}</p>
    </div>
  </div>
)

const App = () => (
  <div className="App">
    <h2>LazyLoad Demo</h2>
    <div className="post-container">
      {data.map(post => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  </div>
)

export default App
```


Ở đây, ta chỉ đơn giản tạo ra một danh sách `post` với `title` và `body` của nó. Và thêm một số CSS đơn giản, ta được giao diện như hình dưới

![](https://images.viblo.asia/87bd59d7-d791-42aa-bd71-9e202f984af9.png)

Hiện tại, tất cả các bài viết đang được hiển thị đầy đủ. Bây giờ, ta sẽ áp dụng Lazy Loading. Ở đây, ta sử dụng [`react-lazyload`](https://github.com/twobin/react-lazyload)

```
npm install —-save react-lazyload
```

Bây giờ, hãy update lại App.js bằng cách import và apply react-lazyload

```
import React from 'react'
import data from 'data'
import LazyLoad from 'react-lazyload'

const Loading = () => (
  <div className="post loading">
    <h5>Loading...</h5>
  </div>
)

const Post = ({ id, title, body }) => (
  <div className="post">
    <div className="post-body">
      <h4>{title}</h4>
      <p>{body}</p>
    </div>
  </div>
)

const App = () => (
  <div className="App">
    <h2>LazyLoad Demo</h2>
    <div className="post-container">
      {data.map(post => (
        <LazyLoad key={post.id} placeholder={<Loading />}>
          <Post key={post.id} {...post} />
        </LazyLoad>
      ))}
    </div>
  </div>
)

export default App
```

Sử dụng `react-lazyload` khá đơn giản, chỉ cần bọc component bên trong với `<LazyLoad …> … </LazyLoad>` . bạn cũng có thể tuỳ chỉnh `height`, `offset` của LazyLoad Component. Chi tiết có thể tham khảo tại [đây](https://github.com/twobin/react-lazyload#height)

Bây giờ, tất cả các bài viết không được hiển thị như lúc đầu. Chỉ một số ít sẽ được hiển thị ban đầu tùy thuộc vào chế độ xem. Nhưng chúng ta không thể nhận ra sự thay đổi vì không có một hiệu ứng nào cho thấy điều đó, trừ khi ta check sự thay đổi của DOM và thấy chúng được chuyển giữa 2 trạng thái `loading` và `loaded`.

Để làm cho lazy loading hiệu quả hơn, ta sẽ kết hợp ảnh ở bên trong bài viết bằng đoạn code dưới đây:

```
const Post = ({ id, title, body }) => (
  <div className="post">
    <div className="post-img">
      <img src={`https://picsum.pjoto/id/${id}/200/200`} alt="...." />
    </div>
    <div className="post-body">
      <h4>{title}</h4>
      <p>{body}</p>
    </div>
  </div>
)
```

> Lorem Picsum url format 
> https://picsum.photos/id/[image_id]/[width]/[height]

![](https://images.viblo.asia/31614575-d413-42ba-b8a8-5f80cc91e97c.png)

Mặc dù toàn bộ component đã được lazy loaded mà hình ảnh cũng được tải cùng với thành phần, nhưng hình ảnh được tải chậm hơn và không được mượt mà. Vì vậy, để tạo ra trải nghiệm hình ảnh tốt hơn với người dùng, ta sẽ sử dụng LazyLoad cho từng hình ảnh.

```
import React from 'react'
import data from 'data'
import LazyLoad from 'react-lazyload'

const Loading = () => (
  <div className="post loading">
    <h5>Loading...</h5>
  </div>
)

const Post = ({ id, title, body }) => (
  <div className="post">
    <LazyLoad
      once={true}
      placeholder={<img src={`https://picsum.pjoto/id/${id}/5/5`} alt="..." />}
    >
      <div className="post-img">
        <img src={`https://picsum.pjoto/id/${id}/200/200`} alt="...." />
      </div>
    </LazyLoad>
    <div className="post-body">
      <h4>{title}</h4>
      <p>{body}</p>
    </div>
  </div>
)

const App = () => (
  <div className="App">
    <h2>LazyLoad Demo</h2>
    <div className="post-container">
      {data.map(post => (
        <LazyLoad
          key={post.id}
          height={100}
          offset={[-100, 100]}
          placeholder={<Loading />}
        >
          <Post key={post.id} {...post} />
        </LazyLoad>
      ))}
    </div>
  </div>
)

export default App
```

Bây giờ, chúng ta có thể scroll list bài viết và inspect element để xem các component được thay đổi như thế nào

![](https://images.viblo.asia/cd00ddf5-de9f-4b5c-a7ee-c9292ed24f7d.gif)

Nguồn: https://medium.freecodecamp.org/how-to-optimize-react-applications-with-lazy-loading-232183e02768