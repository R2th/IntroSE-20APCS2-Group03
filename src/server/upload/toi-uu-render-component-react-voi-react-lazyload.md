![https://codefun.dev/mrfrenkyztiny/toi-uu-render-component-react-voi-reactlazyload-2033931367](https://codefun.dev/uploads/post-image-mrfrenkyztiny-1571212799828.jpeg)

Giả sử tại một trang, bạn render ra danh sách 100 items trong khi màn hình của user chỉ hiển thị được tối đa 3 items thôi, việc này sẽ làm giảm lãng phí thời gian render và xử lý 97 component chưa thực sự hữu dụng, giảm performance của React.

Thay vào đó chúng ta chỉ cần render ra 3 items đầu ( hero component) sau đó sử dụng react-lazyload để render ra component còn lại khi user scroll.
> Hero Component là những Components cần được render ra sớm nhất có thể để xoa dịu thời gian chờ đợi tải trang của người dùng. ( user-centric performance metrics )\

## Render khi không có Lazy

![](https://codefun.dev/uploads/post-image-mrfrenkyztiny-1571217614476.png)

Mỗi component article của mình chứa rất nhiều elements con, chưa kể còn có hình ảnh nữa, ở ngoài browser thì chỉ hiện thị được 3 components có ý nghĩa với người dùng thôi, còn lại coi như bỏ.

Việc render ra hết một list mấy chục item + tải resource (ảnh,gif, video....) sẽ làm giảm performance , tăng thời gian render lúc đầu và Time To Interract. 

Nói qua cũng nói lại, nếu bạn render tất cả lúc đầu, khi user scroll thì sẽ không cần phải đợi nữa vì tất cả đã được tải xuống và render ra lúc đầu. Đúng nhưng đây là bước cuối cùng trong vòng đời của một ứng dụng React, mình luôn làm mọi cách để tối ưu thời gian tải trang, làm sao để trang web có thể hiển thị nội dung sớm nhất có thể.

Một khi Hero Component đã render, user sẽ đỡ cảm thấy bực bội vì phải chờ lâu, lúc này khi scroll để tải tiếp những nội dung khác cũng chẳng đáng là bao.

## Render với React-lazyload

Khi loazyload component, mình sử dụng 2 component đầu tiền làm Hero Component, còn lại mình sẽ lazyload và render khi user scroll xuống.

Như bạn thấy trong hình thì những component được wrap bởi lazyload chỉ render ra thẻ 
```javascript
<div className="lazyload-placeholder"> 
```
và không có bất kì childNodes nào được render bên trong, khi bạn scroll xuống thì react-lazyload mới bắt đầu render ra component được wrap bên trong.
![](https://media.giphy.com/media/KxhSRWolf2A8N12XNo/giphy.gif)

### Install React-lazyload
```javascript
npm install react-lazyload --save

// import và sử dụng 

import Lazy from "react-lazyload"

// Render component

<Lazy>
     <YourComponent/>
</Lazy>
```
### Benchmark performance 
Mình đặt hàm checktime để kiểm trả xem React mất bao lâu để render ra một list khi có lazyload và không có lazyload.

#### Không có react-lazyload:
```javascript
const RenderPost = ({data = [], start = 0, history, offset = 1}: any) => {
  console.time('renderTime');
  React.useEffect(() => {
    console.timeEnd('renderTime');
  }, []);
}
  return (
    <PostCol>
      {data.map((item: IPostItem) => {
        return (
            <PostImage
              {...post}
              key={post.title_id}
            />
        )
      })}
    </PostCol>
  );
};
```

![](https://codefun.dev/uploads/post-image-mrfrenkyztiny-1571222522393.png)
Thiếu vắng React-lazyload ứng dụng của mình mất 120ms để render toàn bộ danh sách bài viết.

#### Render với react-lazyload:
```javascript
const RenderPost = ({data = [], start = 0, history, offset = 1}: any) => {
  console.time('renderTime');
  React.useEffect(() => {
    console.timeEnd('renderTime');
  }, []);
}
  return (
    <PostCol>
      {data.map((item: IPostItem) => {
        return (
          <Lazy offset={[-50, 0]} height={200} once={true}>
            <PostImage
              {...post}
              key={post.title_id}
            />
          </Lazy>
        );
      })}
    </PostCol>
  );
};
```
![](https://codefun.dev/uploads/post-image-mrfrenkyztiny-1571222572707.png)

React-lazyload đã đến và tối ưu thời gian render danh sách xuống còn 51ms.

Trong trường hợp component của bạn chứa nhiều component con, hình ảnh, logic thì lazyload sẽ improve thời gian nhiều hơn nữa.
## Tham khảo
https://codefun.dev/@mrfrenkyztiny/toi-uu-render-react-component-voi-reactlazyload-2033931367