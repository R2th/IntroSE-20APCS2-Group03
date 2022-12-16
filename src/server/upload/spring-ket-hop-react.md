# Giới thiệu
Spring là một Framwork nền tảng Java nó được tạo ra để thay thế cho các công nghệ cũ cồng kềnh như EJB, dựa trên 2 nguyên tắc chính là Dependency Injection và Aspect Oriented Programing và dựa trên mô hình sử dụng POJO Spring trở nên gon nhẹ và linh hoạt cho các dự án.
React là một thư việc JavaScript được phát triển bởi Facebook giúp cho việc phát triển trở nên đơn giản và trực quan hơn cho người dùng.
Việc kết hợp giữa Spring và React giúp ích rất nhiều cho việc phát triển ứng dụng
# Step By Step Demo
Trước tiên chúng ta cần tạo ra một project cho Spring, Ở đây mình sử dụng Spring boot và sử dụng tool build Gradle. Bạn có thể dễ dàng thực hiện việc này bằng cách lên trang start.spring.io trên trang này chúng ta cũng có thể chọn cho mình những dependencies tương ứng mà chúng ta mong muốn sẽ sử dụng trong project. Ở đây mình sử dụng các dependencies Web, H2, JPA, Lombok tương tự như hình ảnh
![](https://images.viblo.asia/fdd25671-3eae-4f25-8c7e-caf00ec9e9b8.png)
Sau khi import vào IDE vào file build.gradle để kiểm tra chúng ta có thể thấy danh sách dependencies sau:
```
dependencies {
	implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
	implementation 'org.springframework.boot:spring-boot-starter-web'
	runtimeOnly 'com.h2database:h2'
	compileOnly 'org.projectlombok:lombok'
	testImplementation 'org.springframework.boot:spring-boot-starter-test'
}
```
Theo các step của demo này mình sẽ thực hiện việc tạo ra một danh sách các bài Post (bao gồm tiêu đề và hình ảnh) và các chức năng thêm sửa xóa
## Xây dựng API bằng Spring boot
Tạo package model và thêm class Post.java
```
package com.example.demo.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "post")
public class Post {

    @Id
    @GeneratedValue
    private Long id;

    @NonNull
    private String content;
}

```
Để init dữ liệu ban đầu ta tạo ra một class Initializer như sau 
```
package com.example.demo.init;

import com.example.demo.model.Post;
import com.example.demo.repository.PostRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.stream.Stream;

@Component
public class Initializer implements CommandLineRunner {

    private final PostRepository postRepository;

    public Initializer(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Override
    public void run(String... strings) {
        Stream.of("Post 1", "Post 2", "Post 3", "Post 4", "Post 5")
                .forEach(content -> postRepository.save(new Post(content)));
        postRepository.findAll().forEach(System.out::println);
    }
}

```

Sau khi run server chúng ta có thể thấy dữ liệu được in ra ở log 
```
com.example.demo.model.Post@fddd7ae
com.example.demo.model.Post@7b9088f2
com.example.demo.model.Post@1a914089
com.example.demo.model.Post@43d76a92
com.example.demo.model.Post@4a2bf50f
```

Thêm PostController class để xử lý việc gọi api
```
package com.example.demo.controller;

import com.example.demo.model.Post;
import com.example.demo.service.PostService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class PostController {

    private final Logger log = LoggerFactory.getLogger(PostController.class);

    @Autowired
    PostService postService;

    @GetMapping("/post/list")
    List<Post>  list() {
        return postService.listPost();
    }

    @GetMapping("/post/{id}")
    ResponseEntity<?> getPost(@PathVariable Long postId) {
        return postService.findById(postId);
    }

    @PostMapping("/post")
    ResponseEntity<Post> createPost(@Valid @RequestBody Post post) throws URISyntaxException {
        Post newPost = postService.savePost(post);
        return ResponseEntity.created(new URI("/api/post" + newPost.getId())).body(newPost);
    }

    @PutMapping("/post")
    ResponseEntity<Post> updatePost(@Valid @RequestBody Post post) {
        Post newPost = postService.savePost(post);
        return ResponseEntity.ok().body(newPost);
    }

    @DeleteMapping("/post/{id}")
    ResponseEntity deletePost(@PathVariable Long postId) {
        postService.deletePost(postId);
        return ResponseEntity.ok().build();
    }
}

```
Thêm service để xử lý logic cho các thao tác CRUD
Interface PostService
```
package com.example.demo.service;

import com.example.demo.model.Post;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface PostService {
    List<Post> listPost();

    ResponseEntity<?> findById(Long postId);

    Post savePost(Post post);

    void deletePost(Long postId);
}

```
và class implement Service 
```
package com.example.demo.service;

import com.example.demo.model.Post;
import com.example.demo.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepository postRepository;

    @Override
    public ResponseEntity<?> findById(Long postId) {
        Optional<Post> postOptional = postRepository.findById(postId);
        return postOptional.map(post -> ResponseEntity.ok().body(post)).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @Override
    public List<Post> listPost() {
        return postRepository.findAll();
    }

    @Override
    public Post savePost(Post post) {
        return postRepository.save(post);
    }

    @Override
    public void deletePost(Long postId) {
        postRepository.deleteById(postId);
    }
}

```
Thêm repository để thực hiện việc tương tác với DB
```
package com.example.demo.repository;

import com.example.demo.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
```
## Xây dựng React để tạo giao diện và đổ dữ liệu
Ở trong thư mục dữ liệu thực hiện lệnh 
```
yarn create react-app app
```
Ở bước này có thể bạn sẽ gặp một số lỗi liên quan đến node version, hãy cài đặt phiên bản node phù hợp theo console log lỗi thông báo và chạy lại lệnh là được.
sau đó vào thư mục app mới được tạo ra 
```
cd app
```
sau đó cài thêm Boostrap, cookie hỗ trợ cho React, React Router, and Reactstrap
```
yarn add bootstrap@4.1.3 react-cookie@3.0.4 react-router-dom@4.3.1 reactstrap@6.5.0
```
import css cho file index.js
```
import 'bootstrap/dist/css/bootstrap.min.css';
```
Ở App.js chúng ta gọi dữ liệu từ API của Spring boot
```
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    isLoading: true,
    posts: []
  };
  
  async componentDidMount() {
    const response = await fetch('/api/post/list');
    const body = await response.json();
    this.setState({ posts: body, isLoading: false });
  }
  
  render() {
    const {posts, isLoading} = this.state;
  
    if (isLoading) {
      return <p>Loading...</p>;
    }
  
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
            <div className="App-intro">
              <h2>Post List</h2>
              <div>
                {posts.map(post =>
                  <div key={post.id}>
                  {post.content}
                  </div>)}
              </div>
            </div>
        </header>
      </div>
    );
  }
}

export default App;

```
Để ủy quyền từ /api tới http://localhost:8080/api thêm cài đặt proxy vào app/package.json. thêm "proxy": "http://localhost:8080" ngay sau chỗ khai báo cho scripts như sau
```
"scripts": {...},
"proxy": "http://localhost:8080",
```
Bây giờ chúng ta start app bằng lệnh yarn start thì cổng 3000 sẽ mở lên và gọi dữ liệu từ api/post/list ra để hiển thị kết quả sẽ như sau
![](https://images.viblo.asia/c324258d-4099-4ed7-9e26-f88b73f0e441.png)

Thay việc đặt các dữ liệu trong App.js thành một file mới cho việc hiển thị danh sách bài post như sau
```
import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class PostList extends Component {

  constructor(props) {
    super(props);
    this.state = {posts: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/posts')
      .then(response => response.json())
  .then(data => this.setState({posts: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/api/post/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedPosts = [...this.state.posts].filter(i => i.id !== id);
    this.setState({posts: updatedPosts});
  });
  }

  render() {
    const {posts, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const postList = posts.map(post => {
    return <tr key={post.id}>
      <td style={{whiteSpace: 'nowrap'}}>{post.content}</td>
    
    <td>
    <ButtonGroup>
    <Button size="sm" color="primary" tag={Link} to={"/posts/" + post.id}>Edit</Button>
      <Button size="sm" color="danger" onClick={() => this.remove(post.id)}>Delete</Button>
    </ButtonGroup>
    </td>
    </tr>
  });

    return (
      <div>
      <AppNavbar/>
      <Container fluid>
    <div className="float-right">
      <Button color="success" tag={Link} to="/posts/new">Add Post</Button>
    </div>
    <h3>Post List</h3>
    <Table className="mt-4">
      <thead>
      <tr>
      <th width="20%">Name</th>
      <th width="10%">Actions</th>
      </tr>
      </thead>
      <tbody>
      {postList}
      </tbody>
      </Table>
      </Container>
      </div>
  );
  }
}

export default PostList;
```
Để tạo navigation chúng ta thêm class AppNavbar.js
```
import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {isOpen: false};
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return <Navbar color="dark" dark expand="md">
      <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
      <NavbarToggler onClick={this.toggle}/>
    <Collapse isOpen={this.state.isOpen} navbar>
    
      </Collapse>
      </Navbar>;
  }
}
```
Thêm class Home.js để hiển thị mặc định khi mới load vào trang
```
import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Home extends Component {
  render() {
    return (
      <div>
      <AppNavbar/>
      <Container fluid>
    <Button color="link"><Link to="/posts">Go To Post List</Link></Button>
    </Container>
    </div>
  );
  }
}

export default Home;
```
Thêm class PostEdit để thực hiện việc thêm và chỉnh sửa bài post
```
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class PostEdit extends Component {
  
  emptyItem = {
    content: ''
  };
  
  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const post = await (await fetch(`/api/post/${this.props.match.params.id}`)).json();
      this.setState({item: post});
    }
  }
  
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const content = target.content;
    let item = {...this.state.item};
    item[content] = value;
    this.setState({item});
  }
  
  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;
    
    await fetch('/api/post', {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/posts');
  }
  
  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Edit Post' : 'Add Post'}</h2>;
    
    return <div>
    <AppNavbar/>
    <Container>
    {title}
    <Form onSubmit={this.handleSubmit}>
      <FormGroup>
      <Label for="content">Content</Label>
      <Input type="text" name="content" id="content" value={item.content || ''}
    onChange={this.handleChange} autoComplete="content"/>
      </FormGroup>
      
      <FormGroup>
      <Button color="primary" type="submit">Save</Button>{' '}
      <Button color="secondary" tag={Link} to="/posts">Cancel</Button>
      </FormGroup>
      </Form>
      </Container>
      </div>
  }
}

export default withRouter(PostEdit);
```


Chỉnh sửa lại class App.js thay thế bằng các Route
```
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PostList from './PostList';
import PostEdit from './PostEdit';


class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/posts' exact={true} component={PostList}/>
          <Route path='/posts/:id' component={PostEdit}/>
        </Switch>
      </Router>
    )
  }
}

export default App;
```
Sau khi hoàn thành chúng ta run app lên và có thể thực hiện các thao tác CRUD 
Màn hình chính
![](https://images.viblo.asia/5ea10685-4116-4f88-98be-6e83afc193df.png)

Vào danh sách
![](https://images.viblo.asia/94d79fc3-34cd-43dc-88a9-663a8f894ccf.png)

Chỉnh sửa
![](https://images.viblo.asia/80c50a48-125c-409a-bf20-ede137891e84.png)

Thêm mới
![](https://images.viblo.asia/320f70c7-dca5-4dee-b5d9-d1f603ccda28.png)

# Tài liệu tham khảo
https://developer.okta.com/blog/2018/07/19/simple-crud-react-and-spring-boot
https://www.tutorialspoint.com/reactjs/