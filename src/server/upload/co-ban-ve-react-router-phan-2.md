# Tìm hiểu về Navlink
```
import React, { Component } from 'react';
import {Link , Navlink} from 'react-router-dom';

class Menu extends Component {
    render() {
        return (
        	<div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
				<div className="list-group">
                    <Navlink to="/" className="list-group-item active">Home</Navlink>
                    <Navlink to="/about" className="list-group-item">About</Navlink>
				</div>
			</div>
        );
    }
}

export default Menu;
```

Như bài trước mình đã giới thiệu 
```
<Link to="/" className="list-group-item active">Home</Link>
```

Mình muốn **active** 1 menu thì mình sẽ dùng như trên , bây giờ  mình sẽ dùng 1 cách nó sẽ tự động add class **acitve** khi mỗi lần bạn click 
```
<Navlink to="/" className="list-group-item">Home</Navlink>
```

Đây là code sẽ sinh ra khi chạy trình duyệt
```
<a class="list-group-item active" aria-current="page" href="/">Home</a>
```

Nếu bạn có nhiều 1 menu khi click khi các bạn click nó điều sinh ra class **acitve** nên xảy ra ko đúng , để khắc phục điểm đó mình sẽ hướng dẫn các bạn fix lỗi đó như sau 
```
<NavLink to="/" exact="/" className="list-group-item">Home</NavLink>
<NavLink to="/about" className="list-group-item">About</NavLink>
```

- Khi dùng Navlink nếu các không muốn dùng class **acitve** mặc định của nó thì bạn có thể dùng như sau 
```
<Navlink to="/" className="list-group-item" avtiveClassName="selected">Home</Navlink>
```

# Tìm hiểu về Notfound 
```
import React, { Component } from 'react';

class Notfound extends Component {
    render() {
        return (
            <div >
               <h3>Notfound</h3>
            </div>
        );
    }
}

export default Notfound;

```

Đây là code Component NotFound

Bây giờ mình cấu hình lại phần App.js như sau
```
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Menu from './Menu';
import Title from './Title';
import Home from './Home';
import About from './About';
import Notfound from './Notfound';

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
                                    <Switch>
                                        <Route exact path="/" component={ Home } />
                                        <Route path="/about" component={ About } />
                                        <Route component={ NotFound } />
                                    <Switch>
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

- Mình sẽ giải thích phần Switch như sau khi đường đẫn trùng với **/home** hay **/about** thì nó sẽ lấy component tương ứng, còn không thì nó sẽ chạy vào component **NotFound**

# Tổng kết
- Đây là những kiến thức cơ bản nhất về react-router, thông qua bài viết này sẽ giúp được các bạn 1 phần nào đó thì làm việc với React Router về phần Link, Nav-Link, và NotFound.