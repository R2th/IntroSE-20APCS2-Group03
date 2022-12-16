### Thêm mới 1 bài Post ###
Đầu tiên để thêm 1 bài Post ta cần làm 1 Form bao gồm 2 text box để điền tiêu đề cũng như nội dung. Vậy ta sẽ cần tạo 1 Component với tên là AddPost vào 1 file mới là AddPost.js
```AddPost.js
import React, { Component } from 'react';

class AddPost extends Component {

  render() {
    return(
      <div> 
       
        <div> 
         <h2> Add new post </h2>
        <form>

          <label> 
            Title: 
            <input type="text"/>
          </label>
          
          <label> 
            Description: 
            <input  type="text"/>
          </label>

          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>)
  }
}

export default AddPost;
```

Sau đó trong file PostList.js ở phần 2 ta thêm đoạn để thêm Form AddPost này vào
```PostList.js
import AddPost from './AddPost';
....
render() {
    ....
    <AddPost />
```

Sau đó F5 ta sẽ có Form thêm mới ở dưới như hình sau:

![](https://images.viblo.asia/d921715d-c3c5-4db9-ba47-386baf4a6825.png)

Tiếp đến ta cần bắt sự kiện khi gõ text trong từng input cũng như khi submit form trong file AddPost.js
```AddPost.js
    constructor(props) {
    super(props);
       /* Initialize the state. */
       this.state = {
          newPost: {
              title: '',
              content: ''
          }
        }
    
    //Boilerplate code for binding methods with `this`
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  handleInput(key, e) {
    var state = Object.assign({}, this.state.newPost); 
    state[key] = e.target.value;
    this.setState({newPost: state });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.onAdd(this.state.newPost);
  }
  
  ...
  render() {
  ...
  <form onSubmit={this.handleSubmit}>
  ...
  <input type="text" onChange={(e)=>this.handleInput('title',e)} />
  ...
  <input  type="text" onChange={(e)=>this.handleInput('content',e)} />
```

như vậy khi gõ trong từng text box sẽ vào hàm handleInput và đưa tương ứng với mỗi text box đó vào status newPost đã khai báo trong constructor. Và sau khi submit ta sẽ gọi đến hàm onAdd sẽ được gọi ở PostList sau.
Vậy toàn bộ nội dung file AddPost.js sẽ như sau:
```AddPost.js
import React, { Component } from 'react';

class AddPost extends Component {

  constructor(props) {
    super(props);
       /* Initialize the state. */
       this.state = {
          newPost: {
              title: '',
              content: ''
          }
        }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  
  /* This method dynamically accepts inputs and stores it in the state */
  handleInput(key, e) {
    var state = Object.assign({}, this.state.newPost); 
    state[key] = e.target.value;
    this.setState({newPost: state });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.onAdd(this.state.newPost);
  }

  render() {
    return(
      <div> 
       
        <div> 
         <h2> Add new post </h2>
        <form onSubmit={this.handleSubmit}>

          <label> 
            Title: 
            <input type="text" onChange={(e)=>this.handleInput('title',e)} />
          </label>
          <label> 
            Description: 
            <input  type="text" onChange={(e)=>this.handleInput('content',e)} />
          </label>

          <input  type="submit" value="Submit" />
        </form>
      </div>
    </div>)
  }
}

export default AddPost;
  
```

Tiếp theo ta thêm sự kiện onAdd và chạy đến Api để thêm mới Post đó vào trong database.
Đầu tiên ta viết hàm thêm Post và gọi vào Api
```
    handleAddPost(post) {
       fetch('/api/posts', {
            method:'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
           },
           body: JSON.stringify(post)
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            this.setState((prevState)=> ({
                currentPost : data.data
            }))
        });
    }
```
Và phần render ta cần thêm khai báo onAdd như sau
```
<AddPost onAdd={this.handleAddPost.bind(this)} />
```
Vậy file PostList.js cuối cùng sẽ như sau:
```PostList.js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PostDetail from './PostDetail';
import AddPost from './AddPost';
/* An example React component */
class PostList extends Component {
    constructor() {
        super();
        //Initialize the state in the constructor
        this.state = {
            posts: [],
            currentPost: null,
        }
    }

    componentDidMount() {
        fetch('/api/posts')
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({ posts:data.data });
            });
    }
 
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

    handleAddPost(post) {
       fetch('/api/posts', {
            method:'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
           },
           body: JSON.stringify(post)
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            this.setState((prevState)=> ({
                currentPost : data.data
            }))
        });
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
            <AddPost onAdd={this.handleAddPost.bind(this)} />
        </div> 
        );
      }
}
 
export default PostList;
 
if (document.getElementById('root')) {
    ReactDOM.render(<PostList />, document.getElementById('root'));
}
```