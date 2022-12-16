Bài viết là hướng dẫn thực hiện một ví dụ đơn giản về CRUD các bài viết sử dụng Redux. Về các thành phần trong Redux mọi người có thể đọc hiểu ở [trang chủ](https://redux.js.org) và một số bài viết trên Viblo.

Cài đặt CLI:
```
npm install -g create-react-app
```

Tạo ứng dụng React:
```bash
create-react-app crud-redux
```
Di chuyển vào thư mục **src** và xóa các tập tin không cần thiết:
```bash
cd src
rm App.css App.test.js logo.svg registerServiceWorker.js
```
Cài đặt Redux:
```bash
npm install --save redux react-redux
```
Redux là thư viện quản lý state, nó cho phép bạn có thể truy cập vào state ở bất kỳ đâu trong các component mà không cần đưa vào props.

Hình ảnh dưới đây là cấu trúc thư mục của ví dụ mình thực hiện.

![](https://images.viblo.asia/e556a482-6c6b-41bc-bdc2-b11316272e5e.png)
# Khai báo hằng
Khai báo các hằng sử dụng:
```js
// constants/PostTypes.js

export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const EDIT_POST = 'EDIT_POST';
export const UPDATE_POST = 'UPDATE_POST';
```
# Định nghĩa các action
Actions là các gói thông tin gửi dữ liệu từ ứng dụng của bạn đến store. 
```js
// actions/PostActions.js

import * as types from '../constants/PostTypes';

export const addPost = (title, content) => ({
    type: types.ADD_POST,
    title,
    content
});

export const editPost = (id) => ({
    type: types.EDIT_POST,
    id
});

export const updatePost = (id, newTitle, newContent) => ({
    type: types.UPDATE_POST,
    id,
    newTitle,
    newContent
});

export const deletePost = (id) => ({
    type: types.DELETE_POST,
    id: id
});
```
Actions bắt buộc phải có thuộc tính `type` để xác định kiểu của hành động thực hiện. `type` thường được định nghĩa là chuỗi tuy nhiên mình khai báo riêng trong `constants/PostTypes.js`. Việc này sẽ có ích hơn trong việc xây dựng một hệ thống lớn với nhiều mô-đun riêng biệt.
# Reducers
Reducers định nghĩa cách mà state của ứng dụng thay đổi với sự phản hồi của các action gửi đến store.
```js
// reducers/PostReducer.js

import { ADD_POST, EDIT_POST, UPDATE_POST, DELETE_POST } from '../constants/PostTypes';

const postReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_POST:
            return [
                {
                    id: (state.length === 0) ? 0 : state[0].id + 1,
                    title: action.title,
                    content: action.content,
                    editing: false
                },
                ...state
            ];

        case DELETE_POST:
            return state.filter((post) => post.id !== action.id);

        case EDIT_POST:
            return state.map((post) => post.id === action.id
                ? { ...post, editing: !post.editing }
                : post);

        case UPDATE_POST:
            return state.map((post) => {
                if (post.id === action.id) {
                    return {
                        ...post,
                        title: action.newTitle,
                        content: action.newContent,
                        editing: !post.editing
                    }
                } else {
                    return post;
                }
            });
            
        default: 
            return state;
    }
}

export default postReducer;
```
# Presentational và Container Components
Để hiểu rõ lý do tại sao lại phân chia 2 thành phần Presentational và Container thì mọi người có thể đọc tại [trang chủ](https://redux.js.org/basics/usagewithreact#presentational-and-container-components) hoặc có 1 bài viết trên Viblo mà mình thấy tương đối dễ hiểu ([React: Presentational and Container Components](https://viblo.asia/p/react-presentational-and-container-components-07LKXY08ZV4)).

Trong bài viết của tác giả có nói đến mục đích sử dụng của từng loại component như sau:

**Presentational Component**:
> * 1 Presenting Component đảm nhiệm việc show data (view)
> * Thường nhận data từ Container Component và render
> * Chỉ tập trung vào việc (How things look like) chứ ko xử lý bất cứ logic nào bên trong.

**Container Component**
> * 1 Container Component thường sẽ làm nhiệm vụ fetching data (call API) và truyền data vừa fetch cho Presentational Component render ra.
> * Container Component chỉ tập trung xử lý logic (How things work) chứ ko xử lý việc view (How thing look like).

Từ những lý thuyết như trên mình chia component trong đây vào 2 thư mục conponents và containers.
## Components
Trong các component ở dưới đây mình có sử dụng React PropTypes để bắt lỗi thông qua việc kiểm tra loại dữ liệu được truyền vào các component thông qua `props`.

Cài đặt PropTypes:
```bash
npm install --save prop-types
```
**Các component:**

Nội dung của từng bài viết. Có 2 button thực thi hành động sửa và xóa bài viết lần lượt gọi đến 2 hành động đã được định nghĩa và đưa vào store.
```js
// components/Post.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Post extends Component {
    static propTypes = {
        post: PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            content: PropTypes.string
        }).isRequired,
        editPost: PropTypes.func.isRequired,
        deletePost: PropTypes.func.isRequired
    };

    render() {
        return (
            <div>
                <h2>
                    { this.props.post.title }
                </h2>
                <p>
                    { this.props.post.content }
                </p>
                <button onClick={ () => this.props.editPost(this.props.post.id) }>
                    Edit
                </button>
                <button onClick={ () => this.props.deletePost(this.props.post.id) }>
                    Delete
                </button>
            </div>
        );
    }
}

export default Post;
```
Form tạo bài viết mới:
```js
// components/AddPost.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PostForm extends Component {
    static propTypes = {
        addPost: PropTypes.func.isRequired
    }

    render() {
        return (
            <div>
                <h1>
                    Create Post
                </h1>
                <form onSubmit={ this.handleSubmit }>
                    <input required type="text" placeholder="Enter Post Title" ref={ (input) => this.getTitle = input } />
                    <br />
                    <textarea required rows="5" cols="20" placeholder="Enter Post" ref={ (input) => this.getContent = input } />
                    <br />
                    <button>
                        Create
                    </button>
                </form>
            </div>
        );
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const title = this.getTitle.value;
        const content = this.getContent.value;
        this.props.addPost(title, content);
        this.getTitle.value = '';
        this.getContent.value = '';
    }
}

export default PostForm;
```
Form cập nhật nội dung bài viết:
```js
// components/EditPost.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditPost extends Component {
    static propTypes = {
        post: PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            content: PropTypes.string
        }).isRequired,
        updatePost: PropTypes.func.isRequired
    };
    
    render() {
        return (
            <div>
                <form onSubmit={ this.handleEdit }>
                    <input required type="text" 
                        ref={ (input) => this.getTitle = input }
                        defaultValue={ this.props.post.title }
                        placeholder="Enter Post Title" />
                    <br />
                    <textarea required rows="5" cols="20"
                        ref={ (input) => this.getContent = input }
                        defaultValue={ this.props.post.content }
                        placeholder="Enter Post Content" />
                    <br />
                    <button>
                        Edit
                    </button>
                </form>
            </div>
        );
    }

    handleEdit = (e) => {
        e.preventDefault();
        const id = this.props.post.id;
        const newTitle = this.getTitle.value;
        const newContent = this.getContent.value;
        this.props.updatePost(id, newTitle, newContent);
    }
}

export default EditPost;
```
Danh sách các bài viết:
```js
// components/AllPost.js

import React, { Component } from 'react';
import EditPost from './EditPost';
import Post from './Post';
import PropTypes from 'prop-types';

class AllPost extends Component {
    static propTypes = {
        posts: PropTypes.array.isRequired
    };

    render() {
        return (
            <div>
                <h1>
                    All Posts
                </h1>
                {
                    this.props.posts.map((post) => (
                        <div key={ post.id }>
                            { post.editing 
                            ? <EditPost post={ post } 
                                key={ post.id } 
                                updatePost={ this.props.actions.updatePost } /> 
                            : <Post post={ post } 
                                key={ post.id } 
                                editPost={ this.props.actions.editPost } 
                                deletePost={ this.props.actions.deletePost } /> }
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default AllPost;
```
## Containers
Như những gì mình đã nói ở trên khi phân chia các component. Mọi người có thể xem các Container Component ở dưới đây sẽ chỉ gọi đến các component chịu trách nhiệm hiển thị và thực hiện các chức năng liên quan đến store.

**`connect()`** cho phép bạn có thể truy cập để `dispatch` như là `props`. Cú pháp như sau:
```js
export default connect(mapStateToProps, mapDispatchToProps)(ComponentName)
```
**`mapStateToProps`** là hàm chịu trách nhiệm kết nối  state từ store đến props tương ứng. Điều này cho phép nó có thể truy cập các reducer từ bên trong component. Hàm này sẽ đăng ký với store và mọi thay đổi sẽ được tự động cập nhật props.

**`mapDispatchToProps`** nhận phương thức `dispatch()` và trả về callback props để có thể gọi được ở Presentational Component. Bạn có thể tự định nghĩa bind action sử dụng `dispatch` hoặc tự động bind với `bindActionCreators`. Ở dưới đây, 2 file mình có sử dụng 2 cách bind khác nhau.
```js
// containers/PostFormContainer.js

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../actions/PostActions';
import PostForm from '../components/PostForm';

class PostFormContainer extends Component {   
    render() {
        return (
            <PostForm addPost={ this.props.addPost } />
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (title, content) => {
            dispatch(addPost(title, content));
        }
    }
};

export default connect(null, mapDispatchToProps)(PostFormContainer);
```
```js
// containers/AllPostContainer.js

import React, { Component } from 'react';
import { connect } from 'react-redux';
import AllPost from '../components/AllPost';
import { bindActionCreators } from 'redux';
import * as PostActions from '../actions/PostActions';

class AllPostContainer extends Component {
    render() {
        return (
            <AllPost posts={ this.props.posts } actions={ this.props.actions } />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(PostActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllPostContainer);
```
# Bước cuối
Sử dụng các Container Component vào `App.js`:
```js
// App.js

import React, { Component } from 'react';
import AllPostContainer from './containers/AllPostContainer';
import PostFormContainer from './containers/PostFormContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>
          Hello
        </h1>
        <PostFormContainer />
        <AllPostContainer />
      </div>
    );
  }
}

export default App;
```
Vâng, từ đầu đến giờ nói khá nhiều đến store mà chả thấy định nghĩa hay khởi tạo gì đâu hết ha. Store chịu trách nhiệm:
* Lưu trữ state của ứng dụng
* Cho phép truy cập state
* Cho phép state có thể cập nhật
* Đăng ký listeners
* Xử lý việc hủy listeners

Tạo store sử dụng `createStore(reducer)`. Tham số truyền vào là reducer. Nếu có nhiều reducer bạn có thể sử dụng `combineReducers()`.

Tất cả các Container Component đều cần truy cập đến store. Ta có thể sử dụng `<Provider>` để làm cho store luôn luôn sẵn có với các Container Component.
```js
// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import postReducer from './reducers/PostReducer';
import { Provider } from 'react-redux';

const store = createStore(postReducer);

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById('root')
);
```
Dưới đây là kết quả đạt được. Vì mình không viết css nên có vẻ hơi xấu nhưng chức năng thì ổn rồi.


![](https://images.viblo.asia/1d925d74-564c-41d8-99a3-c674b34b0608.png)
# Kết luận
Ví dụ đã hoàn thành. Mong rằng bạn nào làm theo thì code sẽ chạy. Chúc mọi người thành công nhé.
# Tham khảo
* https://redux.js.org/basics/usagewithreact#presentational-and-container-components
* https://viblo.asia/p/react-presentational-and-container-components-07LKXY08ZV4
* https://viblo.asia/s/redux-cho-nguoi-moi-bat-dau-P0lPmJPn5ox