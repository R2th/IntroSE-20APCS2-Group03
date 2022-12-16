# 1. React Router là gì ? 
React router là một thư viện routing mạnh, nó giúp bạn thêm screen và follow vào trong ứng dụng của bạn một cách nhanh chóng. Nó giúp cho việc đồng bộ giữa URL và những component được load vào hiển thị trên trang

# 2. Cài đặt React 
```
npx create-react-app my-app
cd my-app
npm start
```

# 3. Cài đặt React Router
```
npm install --save react-router
```

# 4. Cấu trúc ứng dụng
![](https://images.viblo.asia/7419e784-79ff-405a-9ae7-a939b4b1c9ab.png)

- File index.js mình cần cấu hình lại như sau 
```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
```

Do mình cấu đặt file App.js trong thư mục componments nên phải cấu hình lại như sau 

```
import App from './components/App';
```

- File App.js

```
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Menu from './Menu';
import Title from './Title';
import Home from './Home';
import About from './About';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <div className="row">
                        <Title />
                        <Menu />
                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                            <div className="panel panel-danger">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Content</h3>
                                </div>
                                <div className="panel-body">
                                    <Route exact path="/" component={ Home } />
                                    <Route path="/about" component={ About } />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
```

Muốn sử dụng được Router trong React cần import đoạn code này 

```
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
```

Tiếp  tục mình giải thích phần code gọi router tưng ứng từng component
```
<div className="panel-body">
 <Route exact path="/" component={ Home } />
 <Route path="/about" component={ About } />
</div>
```

Khi bạn click vào Menu Home hay About bên trái thì nội dung tương ưng từng components dữ liệu đỗ  vào nó sẽ load vào phần 
```
<div className="panel-body">
</div>
```

- File Menu.js
```
import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Menu extends Component {
    render() {
        return (
        	<div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
				<div className="list-group">
                    <Link to="/" className="list-group-item active">Home</Link>
                    <Link to="/about" className="list-group-item">About</Link>
				</div>
			</div>
        );
    }
}

export default Menu;
```

Để  ứng dụng ko load lại trang cần import **Link** và cấu hình như sau 
```
import {Link} from 'react-router-dom';
<Link to="/" className="list-group-item active">Home</Link>
<Link to="/about" className="list-group-item">About</Link>
```

- File Title.js 
```
import React, { Component } from 'react';

class Title extends Component {
    constructor(props) {
        super(props);

        this.state = {
           
        };
    }

    render() {
        return (
            <div className="page-header">
                <h1>Project 03 - React Router <small>ReactJS</small></h1>
            </div>
        );
    }
}

export default Title;
```

- File About.js
```
import React, { Component } from 'react';

class About extends Component {
	
    render() {
        return (
            <div >
               <h3>About</h3>
            </div>
        );
    }
}

export default About;
```

- File Home.js
```
import React, { Component } from 'react';

class Home extends Component {
	
    render() {
        return (
            <div >
               <h3>Home</h3>
            </div>
        );
    }
}

export default Home;
```

# 5. Tổng kết 
Thông qua bài viết này của mình hi vọng các bạn nắm được phần cơ bản nhất về router để áp dụng vào dự án một cách hiệu quả nhất .

# 6. Tài liệu tham khảo
Link: https://reacttraining.com/react-router/core/guides/philosophy