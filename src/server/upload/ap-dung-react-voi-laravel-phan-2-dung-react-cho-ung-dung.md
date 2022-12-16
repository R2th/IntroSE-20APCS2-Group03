### Cài đặt môi trường 
Sau bài 1 ta đã dựng xong việc lấy DB thông qua laravel, ở bài này ta tiếp tục làm việc dựng React trong Laravel.
Để cài đặt các thư viện cũng như các thứ liên quan đến React trong Laravel rất đơn giản, ta chỉ việc chạy lệnh sau:
`php artisan preset react`
Đây là cách cài đặt nhanh nhất, Khi chạy lệnh này sẽ tự động thêm các version mới nhất của React bao gồm cả (React-dom và React-router).
Tiếp đến sẽ tự động xóa mặc định Vue trong file resource/assets/app.js đồng thời thêm 1 Ví dụ cho phần React trong resources/assets/Compoment/Example.js
Như vậy sau khi chạy lệnh kia xong ta cần chạy việc cài đặt cũng như build file js ra public bằng lệnh sau
`npm install && npm run dev`

### Chạy thử React 
Để chạy thử ta sửa file resources/assets/app.js bằng cách thêm dòng sau
```app.js
import Post from './components/Post';
```
Theo như dòng như này ta cần phải thêm 1 file Post.js ở trong folder components. Và trong file đó ta thêm như sau
```Post.js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
 
/* An example React component */
class Post extends Component {
    render() {
   /* Some css code has been removed for brevity */
    return (
        <h2> All Posts </h2>
    );
  }
}
 
export default Post;
 
/* The if statement is required so as to Render the component on pages that have a div with an ID of "root";  
*/
 
if (document.getElementById('root')) {
    ReactDOM.render(<Post />, document.getElementById('root'));
}
```

Tiếp đến ta sửa ở file welcome.blade.php bằng thêm đoạn gọi js sau
```
<script src="{{ asset('js/app.js') }}" defer></script>
```
Và ta cần thêm 1 div có `id = "root"` để React có thể nhận biết vị trí fill data vào.
Sau đó ta gõ vào trình duyệt link của project ta có kết quả như sau là được
![](https://images.viblo.asia/9e3c783e-383d-40af-8717-9bfe9ab6c72f.png)

Giờ ở màn hình ban đầu sẽ là danh sách các bài Post như vậy trong file Post.js ta cần khai báo 1 state là posts. Ban đầu ta thử thêm 1 vài dữ liệu demo.
```Post.js
    constructor() {
        super();
        //Initialize the state in the constructor
        this.state = {
            posts: [
                {id: 1, title: 'Title 1'},
                {id: 2, title: 'Tieu de 2'},
                {id: 3, title: 'Kiem tra title'},
                {id: 4, title: 'Noi dung kiem thu'},
                {id: 5, title: 'Test thu xem'},
            ],
        }
    }
```

Tiếp đến ta viết 1 hàm để show ra từng post một như sau:
```Post.js
    renderPosts() {
        return this.state.posts.map(post => {
            return {
                <li key={post.id} >
                    { post.title } 
                </li>      
            );
        })
    }
```

Cuối cùng ta sửa nó trong phần render trả về như sau:
```Post.js
    render() {
    return (
        <div>
            <h2>All Posts</h2>
            <ul>
                { this.renderPosts() }
            </ul> 
        </div> 
    );
```
Sau khi chạy lệnh `npm run dev` và gõ link trình duyệt ta có kết quả như sau là được:
![](https://images.viblo.asia/2d72bef5-92ee-4655-a587-6d80f5edfdb8.png)

### Gọi dữ liệu từ API đưa vào React

Giờ tiếp theo ta cần maping data gọi từ API ở phần 1 vào list. Đầu tiên ta cần xóa sạch post ta đã thử, sau đó dùng `fetch` để gọi API và fill data vào posts như khai báo ở trên.
```Post.js
    //Hàm này sẽ được gọi trước khi render
    componentDidMount() {
        fetch('/api/posts')
            .then(response => {
                return response.json();
            })
            .then(data => {
                //Vì api ta trả về có post trong data do vậy cần phải gọi data.data
                this.setState({ posts:data.data });
            });
    }
 
```
Để chỉnh sửa cho đẹp hơn ta thêm các class cho giao diện như ở file home.blade.php
```home.blade.php
    <div id="root" class="col-12"></div>
```
Và phần render cho danh sách post ta thêm class như sau
```Post.js
    render() {
    return (
        <div>
            <h2>All Posts</h2>
            <div className="col-4">
                <ul>
                    { this.renderPosts() }
                </ul> 
            </div>
        </div> 

    );
```
Sau đó chạy `npm run dev` và kết quả ta có như sau:
![](https://images.viblo.asia/2eca557f-c1a4-443d-acb4-c97356fcc1e0.png)

### Hiển thị chi tiết bài Post

Đầu tiên ta tạo 1 định nghĩa Post bằng file PostDetail mục đích hiển thị chi tiết Post như sau
```PostDetail.js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
const PostDetail = ({post}) => {
  if(!post) {
    return(<div >  Post Doesnt exist </div>);
  }
     
  return(  
    <div> 
      <h2> {post.title} </h2>
      <p> {post.content} </p>
      
    </div>
  )
}

export default PostDetail;
```

Sau đó trong file Post.js ta cần khai báo 1 state là post được chọn và khi click vào thi gọi PostDetail vừa tạo như sau
```Post.js
import PostDetail from './PostDetail';
    renderPosts() {
        return this.state.posts.map(post => {
            return (
                <li key={post.id} onClick={
                () =>this.handleClick(post)}>
                    { post.title } 
                </li>
            );
        })
    }

    handleClick(post) {
        this.setState({currentPost: post})
    }
    render() {
   /* Some css code has been removed for brevity */
    return (
        <div>
            <h2>All Posts</h2>
            <div className="col-4">
                <ul>
                    { this.renderPosts() }
                </ul> 
            </div>
            <div className="col-8">
                <PostDetail post={this.state.currentPost} />
            </div>
        </div> 
        );
      }
```
Như vậy ta xử lý thêm được phần hiển thị chi tiết