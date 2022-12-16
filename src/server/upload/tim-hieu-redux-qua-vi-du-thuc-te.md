Xin chào tất cả mọi người! Trong bài viết trước chúng ta đã tìm hiểu về các thành phần chính có trong Redux. Và để minh họa rõ hơn về cách hoạt động của Redux trong 1 project là như thế nào thì hôm nay mình sẽ cùng mọi người viết 1 ứng dụng nho nhỏ có sử dụng Redux.<br/>
<br/>
Nào cùng bắt đầu nhé!
## **Cài đặt môi trường** <br/>
Trước tiên các bạn hãy chắc chắn là máy tính của mình đã cài đặt đầy đủ `node` cũng như `npm` nhé. Bạn có thể kiểm tra bằng cách gõ 2 câu lệnh sau trong cửa sổ Terminal:
```
node -v
npm -v
```
Nếu chưa có các bạn có thể tải về tại https://nodejs.org/en/.
## **Khởi tạo Project** <br/>
Khi đã cài đặt Node xong, các bạn có thể khởi tạo project bằng câu lệnh `npm init -y` và điền các thông số hoặc sử dụng `create-react-app` để có thể tạo nhanh 1 project, bằng lệnh sau:
```js
npx create-react-app redux-demo
```
*Chú ý rằng phiên bản* `npm` *của bản phải lớn hơn 5.2 thì mới sử dụng được* `npx`<br/>
<br/>
Sau khi chạy xong thì ta sẽ được 1 project có cấu trúc như sau:

![](https://images.viblo.asia/53681e4e-1074-4c7f-b0a4-49346477945e.png)

Để run app, các bạn có thể sử dụng lệnh `npm run start`
## **Phân tích ứng dụng** <br/>
Mục tiêu trong bài ngày hôm nay của chúng ta đó là xây dựng 1 ứng dụng về Micropost. Đại loại là nó sẽ có những tính năng như là tạo mới 1 bài viết, và ta có thể chỉnh sửa và xóa bài viết đó, cũng không có gì to tát lắm nhỉ :D <br/>
<br/>

Để có một cái nhìn tổng quát hơn về flow trong Redux thì các bạn hãy tạo trong thư mục src các folder là **actions, reducers, components** và **containers** nhé. Đến đây chắc sẽ có nhiều người thắc mắc là containers dùng để làm gì thì mình xin được giải thích 1 cách ngắn gọn là nó cũng tương tự như component nhưng khác ở chỗ Containers sẽ có nhiệm vụ thao tác với Store của App. Tức là nó có thể **set state** cũng như **get state** rồi sau đó sẽ truyền state xuống Component để render ra View.<br/>
<br/>
Được rồi, cùng bắt tay vào làm nào! <br/>
<br/>
À quên, trước khi code mọi người hãy install thư viện Bootstrap vào nhé, để cho giao diện nó đẹp đẹp 1 tí :D bằng cách chạy dòng lệnh sau: `npm i --save-dev bootstrap`

## **Actions** <br/>
Rồi Ok, việc đầu tiên là ta cần làm là phải xem trong ví dụ này sẽ có những action gì? Đối với 1 ứng dụng kiểu như Micropost thì việc đầu tiên đó là người dùng phải tạo được bài viết. Vậy thì trong actions ta sẽ tạo 1 file **index.js** dùng để định nghĩa action `createPost` nhé:
```js
import uuidv4 from 'uuid/v4'; // thư viện dùng để tự động render ra 1 chuỗi string dùng làm id

export const createPost = content => ({
   type: 'ADD_POST',
   payload: {
     id: uuidv4(),
     content,
   },
});
```
1 action thông thường sẽ gồm có *type* và *payload*, ở đây khi người dùng thêm 1 bài viết thì action `createPost` sẽ phải có content của bài viết đó và id do uuid tạo ra. Sau khi có action `createPost` rồi thì khi người dùng ấn vào sự kiện tạo bài viết trên view thì action `createPost` sẽ được **dispatch** đến reducer để xử lý. Như vậy thì bước tiếp theo ta sẽ phải tạo reducer để xử lý action này. 
## **Reducers** <br/>
Trong folder reducers ta tạo 1 file **Post.js**:<br/>
```js
let posts = [];

export default function postReducer(state = posts, action) {
  switch (action.type) {
    case 'ADD_POST':
      return [...state, action.payload];
    default:
      return state;
  }
}
```
Đầu tiên, ta sẽ khởi tạo 1 **state** trong reducer dùng để lưu trữ tất cả các bài post của người dùng - đây chính là **global state** được lưu trong Store mà các bài viết về Redux thường hay nhắc tới. Để có thể xử lý được từng action một thì trong Reducer người ta sẽ dùng cú pháp *switch case*, tương ứng với các type trong action. Trong ví dụ này, ta đã định nghĩa type của action createPost là `ADD_POST` nên trong reducer ta cũng sẽ phải khai báo đúng chính xác type đó. Và để thêm bài post thì ta chỉ việc thêm data về bài viết là `action.payload` vào trong state đã khởi tạo ban đầu.

Để **reducer** có thể kết nối với **Store** thì ta cần phải *combine* tất cả các reducer lại. Các bạn tạo file **index.js** với nội dung như sau:
```js
import { combineReducers } from 'redux';
import posts from './Post';

export default combineReducers({
  posts
});
```
## **Components** <br/>
Bước tiếp theo, sau khi có **action** và **reducer** rồi thì tiếp theo chúng ta cần phải tạo ra 1 ô Text để cho người dùng nhập nội dung và 1 nút Submit để có thể post bài viết, vì đây là phần hiển thị giao diện nên các bạn sẽ phải tạo 1 file trong **Components** và đặt tên là **NewPost.jsx** nhé: <br/>

```js
import React, { Component } from 'react';

class NewPost extends Component {
    constructor(props){
        super(props)
        this.state = { // Khởi tạo 1 state content dùng để lưu dữ liệu người dùng nhập vào
          content: '',
        };
    }
    handleInputChange(){
       this.setState({
          title: e.target.value // Thay đổi state khi người dùng nhập data vào textbox
       });
    };
    handleSubmit(){
       // implement later
    };
    render() {
        return (
          <div>
            <form onSubmit={ this.handleSubmit }> // Tạo form và gán cho sự kiện onSubmit 1 function là handleSubmit
              <div className="form-group">
                <input type="text" placeholder="Content" className="form-control"
                  onChange={ this.handleInputChange } value={ this.state.content } />
                // ô Input có value là giá trị của state đã khởi tạo ở trên 
                // gán function cho sự kiện onChange khi người dùng nhập data
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary">Add Post</button>
              </div>
            </form>
          </div>
        );
     }
  }
```
Theo như luồng hoạt động trong Redux mà chúng ta đang áp dụng thì khi người dùng click vào nút Submit thì sẽ action createPost sẽ được sinh ra và dispatch đến reducer mà ta đã định nghĩa như ở trên. Vậy làm thế nào để hàm handleSubmit có thể làm được việc đó?Chúng ta sẽ cùng nhau xử lý điều này trong Container!
## **Containers** <br/>
Trong **Redux** để giải quyết được vấn đề bên trên thì nó có cung cấp cho chúng ta 1 hàm gọi là `mapDispatchToProps`. Đại loại là thằng này nó sẽ map cái việc dispatch action đến reducer bằng **props** quen thuộc mà ta vẫn hay thường dùng **React**. Trong folder Containers các bạn tạo 1 file đặt tên là **createPost.js**
```js
import { connect } from 'react-redux';
import { createPost } from '../actions';
import NewPost from '../components/NewPost';

const mapDispatchToProps = dispatch => ({
  dispatch,
  onAddPost: post => dispatch(createPost(post)),
});

export default connect(
  null,
  mapDispatchToProps
)(NewPost);
```
Container thực chất là những component giao tiếp với Redux thông qua `connect()` của react-redux. Hàm `connect()` sẽ có nhiệm vụ là kết nối `mapDispatchToProps` và `mapStateToProps` (trong đây mình không dùng mapStateToProps nên để giá trị là null nhé) tới Component mà ta chỉ định, ở ví dụ này là component được connect đó là **NewPost**. Và nhờ có `mapDispatchToProps` nên ta đã map được việc dispatch action createPost đến với props `onAddPost`. Điều này đồng nghĩa với việc là bạn đã có thể sử dụng thoải mái props `onAddPost` ở component **NewPost** rồi đó, ta tiến hành update hàm `handleSubmit` như sau:
```js
handleSubmit(e){
    e.preventDefault();
    const { title } = this.state
    if (title) {
      this.props.onAddPost(title);
      this.setState({
        title: '',
      });
    }
  };
 ```
 Như vậy là ta đã hoàn thành xong việc tạo mới 1 bài viết, việc tiếp theo đó là hiển thị nội dung của bài viết đó ra màn hình. Quay trở lên phần reducer 1 chút thì trong reducer ta đã lưu data của tất cả các bài viết vào trong 1 state đó là **posts**. Mà đây là global state nên nhiệm vụ của ta rất đơn giản chỉ là lấy nó ra vào in kết quả là xong. Để lấy ra được state trong reducer thì ta sẽ sử dụng hàm `mapStateToProps`. Thằng này thì nhiệm vụ của nó cũng tương tự `mapDispatchToProps` chỉ khác ở chỗ thay vì map `dispatch` thì nó sẽ map `state` trong reducer.
 Ta tiếp tục tạo 1 file mới trong Containers để xử lý thằng này nhé, tên là **PostList.js**
 ```js
 import React from 'react';
import { connect } from 'react-redux';
import Posts from '../components/Posts';

function PostList(newPosts) {
  return (
    <div>
      {newPosts.map(post => {
        return (
          <Posts post={ post } key={ post.id } />
        );
      })}
    </div>
  );
}
function mapStateToProps(state){
  return {
    newPosts: state.posts
  };
};

export default connect(
  mapStateToProps,
  null,
)(PostList);
```
Vì là phần hiển thị view nên trong Components các bạn cũng cần phải thêm 1 file mới để xử lý nhé:
```js
// Posts.jsx
import React, {Component} from 'react';

export default class Posts extends Component{
  render(){
    let { post } = this.props
    return(
      <div>
        <h2>{ post.title }</h2>
        <button className="btn btn-danger" type="button">
          Remove
        </button>
        <hr/>
      </div>
    )
  }
}
```
## **Connect Reducer to Store** <br/>
Đến đây thì coi như các bạn đã hoàn thành được đến 90% công việc rồi. Tuy nhiên để app chạy được thì mọi người cần phải kết nối **Reducer** với **Store** nữa, chúng ta sẽ làm việc này trong file `index.js` thông qua hàm `createSotre`:
```js
// Index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import rootReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));

registerServiceWorker();
```
Thêm 1 chút giao diện cho phần hiển thị
```js
// App.js
import React, { Component } from 'react';
import CreatePost from './containers/CreatePost';
import PostList from './containers/PostList';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const stylesApp = {
  marginTop: 40;
}

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row" style={ stylesApp }>
          <div className="col-md-6">
            <CreatePost />
          </div>
          <div className="col-md-6">
            <PostList />
          </div>
        </div>
      </div>
    );
  }
}
```
**-> Kết quả:**
![](https://images.viblo.asia/9f4ad304-d8bf-4374-8411-1057e9f021ad.png)
## **Kết luận** <br/>
Trên đây mình đã hướng dẫn các bạn làm 1 app demo nho nhỏ về Redux, hy vọng nó sẽ giúp các bạn phần nào hiểu được các luồng hoạt động trong Redux. Để có thể nắm rõ hơn thì các bạn có thể tiếp tục thực hành bằng cách thêm 1 số chức năng như là edit, delete post, thực sự thì mình nghĩ cũng không khó lắm đâu :D

Source code: [https://github.com/tdtrung5893/redux-demo](https://github.com/tdtrung5893/redux-demo)