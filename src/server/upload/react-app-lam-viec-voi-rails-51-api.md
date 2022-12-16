## Thiết lập Rails 5.1 API

Hắt bắt đầu bằng việc xây dựng Rails API. Chúng ta sẽ sử dụng tính năng được tích hợp của Rails để xây dựng ứng dụng chỉ có API.

Hãy đảm bảo rằng bạn có version 5.1 hoặc cao hơn của Rails gem được cài đặt.

```
gem install rails
```

Tiếp theo hãy tạo một Rails API app với flag `--api`

```
rails new --api ideaboard-api
cd ideaboard-api
```

Tiếp theo hãy tạo ra data model. Chúng ta chỉ cần một data model sử dụng cho các ý tưởng, với hai trường đó là title và body, cả hai đều có type là `string`.

Hãy khởi tạo và chạy migration:

```
rails generate model Idea title:string body:string

rails db:migrate
```

Như vậy ta đã có bảng dành cho Ideas, và hãy viết một số dữ liệu mẫu để ta có thể hiển thị.

Trong file `db/seeds.rb`, hãy thêm đoạn code sau:

```
ideas = Idea.create(
  [
    {
      title: "A new cake recipe",
      body: "Made of chocolate"
    },
    {
      title: "A twitter client idea",
      body: "Only for replying to mentions and DMs"
    },
    {
      title: "A novel set in Italy",
      body: "A mafia crime drama starring Berlusconi"
    },
    {
      title: "Card game design",
      body: "Like Uno but involves drinking"
    }
  ])
  ```
  
  Bạn có thể thay thế nội dung khác mà bạn mong muốn.
  
  Sau đó chạy lệnh:
  
  ```
  rails db:seed
  ```
  
  Sau đó, ta hãy tạo một IdeasController với action index trong file: `app/controllers/api/v1/ideas_controller.rb` :
  
  ```
  module Api::V1
  class IdeasController < ApplicationController
    def index
      @ideas = Idea.all
      render json: @ideas
    end
  end
end
```

Hãy để ý rằng controller ở bên trong folder `app/controllers/api/v1` bởi vì chúng ta đang thiết lập version cho API của mình.
Đây là một cách làm tốt để tránh việc lỗi xảy ra do có sự thay đổi và đáp ứng được backward compatibility (tương thích ngược) cho API của chúng ta.

Sau đó ta thêm resource ideas trong `config/routes.rb`

```
Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :ideas  
    end
  end
end
```

OK, bây giờ chúng ta hãy test API endpoint đầu tiên của mình:

Chạy lệnh:

```
rails s -p 3001
```

Sau đó, kiểm tra endpoint để lấy về dữ liệu của tất cả ideas với `curl`:

```
curl -G http://localhost:3001/api/v1/ideas
```

Và ta sẽ thấy các dữ liệu Ideas được trả về dưới dạng JSON:

```
[{"id":18,"title":"Card game design","body":"Like Uno but involves drinking","created_at":"2017-09-05T15:42:36.217Z","updated_at":"2017-09-05T15:42:36.217Z"},{"id":17,"title":"A novel set in Italy","body":"A mafia crime drama starring Berlusconi","created_at":"2017-09-05T15:42:36.213Z","updated_at":"2017-09-05T15:42:36.213Z"},{"id":16,"title":"A twitter client idea","body":"Only for replying to mentions and DMs","created_at":"2017-09-05T15:42:36.209Z","updated_at":"2017-09-05T15:42:36.209Z"},{"id":15,"title":"A new cake recipe","body":"Made of chocolate","created_at":"2017-09-05T15:42:36.205Z","updated_at":"2017-09-05T15:42:36.205Z"}]
```

Chúng ta cũng hoàn toàn có thể test endpoint này trên một browser bằng cách mở đường dẫn: http://localhost:3001/api/v1/ideas

## Thiết lập ứng dụng Front-end sử dụng Create React App

Bây giờ ta đã có một API cơ bản, hãy thiết lập ứng dụng Front-end React sử dụng [Create React App](https://github.com/facebookincubator/create-react-app).

Create React App là một project của Facebook, giúp bạn bắt đầu với React app một cách nhanh chóng mà không cần thiết lập nào cả.

Đầu tiên, bảo đảm rằng bạn đã có Node.js và npm được cài đặt. Bạn có thể download installer từ trang web của [Node.js](https://nodejs.org/). Sau đó cài đặt Create React App bằng cách chạy lệnh:

```
npm install -g creat-react-app
```

Sau đó bạn hãy rời khỏi Rails directory và chạy lệnh sau:

```
create-react-app ideaboard
```

Tiếp theo, chạy React app:

```
cd ideaboard
npm start
```

Bạn sẽ được chuyển thẳng tới trang http://localhost:3000

Ứng dụng React này có một trang mặc định với một React component được gọi là App dùng để hiển thị React logo.

Nội dung của trang được render thông qua React component ở trong file `src/App.js`

```
import React, { Component } from 'react';                                                            
import logo from './logo.svg';                                                                       
import './App.css';                                                                                  
                                                                                                     
class App extends Component {                                                                        
  render() { 
    return (
      <div className="App">                                                                          
        <header className="App-header">                                                              
          <img src={logo} className="App-logo" alt="logo" />                                         
          <p>
            Edit <code>src/App.js</code> and save to reload.                                         
          </p>
          <a
            className="App-link"                                                                     
            href="https://reactjs.org"                                                               
            target="_blank"
            rel="noopener noreferrer"                                                                
          >                                                                                          
            Learn React                                                                              
          </a>                                                                                       
        </header>                                                                                    
      </div>                                                                                         
    );                                                                                               
  }
} 
    
export default App;
```

### React Component đầu tiên

Bước tiếp theo của chúng ta là sửa lại file này để sử dụng API mà chúng ta mới tạo ra và list ra danh sách tất cả các ideas trên page.

Hãy bắt đầu bằng cách thay đổi Welcome message với một <h1> tag có chứa title của ứng dụng của chúng ta : "Idea Board".

Ta cũng sẽ thêm một component tên là `IdeasContainer`. Ta cần import nó và cho vào trong function render:

```
import React, { Component } from 'react'
import './App.css'
import IdeasContainer from './components/IdeasContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Idea Board</h1>
        </div>
        <IdeasContainer />
      </div>
    );
  }
}

export default App
```

Ta tiếp tục tạo ra component `IdeasContainer` bên trong một file mới : `IdeasContainer.js` bên trong directory: `src/components`:

```
import React, { Component } from 'react'

class IdeasContainer extends Component {
  render() {
    return (
      <div>
        Ideas
      </div>
    )
  }
}

export default IdeasContainer
```

Ta cũng hãy thay đổi style của App.css để có một header màu trắng và chữ màu đen, và ta cũng bỏ đi những styles ta không cần:

```
.App-header {
  text-align: center;
  height: 150px;
  padding: 20px;
}

.App-intro {
  font-size: large;
}
```

Component mới sẽ cần giao tiếp với Rails API end point của chúng ta để lấy các thông tin về list Ideas và hiển thị chúng.

### Lấy dữ liệu API bằng axios

Chúng ta sẽ tạo ra một Ajax call tới API bên trong method lifecycle componentDidMount() của IdeasContainer component và lưu ideas trong state của component.

```
constructor(props) {
  super(props)
  this.state = {
    ideas: []
  }
}
```

Và ta sẽ update state trong `componentDidMount()`.

Hãy sử dụng thư viện [axios](https://github.com/mzabriskie/axios) để thực hiện gọi API. Bạn cũng có thể sử dụng jQuery nếu bạn thích cách đó hơn.

Cài đặt `axios` bằng npm:

```
npm install axios --save
```

Sau đó import nó vào `IdeadsContainer`:

```
import axioss from 'axios'
```

Và sử dụng nó trong componentDidMount():

```
componentDidMount() {
  axios.get('http://localhost:3001/api/v1/ideas.json')
  .then(response => {
    console.log(response)
    this.setState({ideas: response.data})
  })
  .catch(error => console.log(error))
}
```

Tuy nhiên lúc này ta sẽ gặp lỗi bởi API của chúng ta nằm ở port khác (3001 so với 3000), và chúng ta vẫn chưa enable Cross Origin Resource Sharing (CORS).

### Cho phép thực hiện Cross Origin Resource Sharing (CORS)

Trước tiên, hãy enable CORS bằng cách sử dụng gem [rack-cors](https://github.com/cyu/rack-cors) ở Rails app của chúng ta:

Thêm gem vào trong Gemfile:

```
gem 'rack-cors', :require => 'rack/cors'
```

Cài đặt nó:

```
bundle install
```

Sau đó, ta thêm middleware configuration vào file `config/application.rb`.

```
config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:3000'
    resource '*', :headers => :any, :methods => [:get, :post, :put, :delete, :options]
  end
end
```

Chúng ta giới hạn origins chỉ bao gồm front-end app của mình ở http://localhost:3000 và cho phép access vào các methods endpoint chuẩn REST API  cho tất cả resouces.

Bây giờ ta cần restart Rails server, và nếu ta refresh lại browser, ta sẽ không gặp lỗi CORS nữa.

Trang web sẽ được load thành công và ta có thể thấy dữ liệu từ phía API Rails được log lại trong console.

![](https://images.viblo.asia/9ebbd16b-f277-45e3-a16d-efdbee7e74ec.png)

Như vậy ta đã biết là có thể lấy được các dữ liệu ideas từ API và hãy sử dụng nó trong React component của chúng ta.

Ta có thể thay đổi function render để chạy một vòng lặp quanh danh sách ideas từ state và hiển thị tất cả.

Hãy chú ý về attributes `key` của div có className là `tile`.

Chúng ta cần bao gồm nó khi tạo ra list của các elements. Keys giúp React định danh items nào đã bị thay đổi, được thêm vào hay bị bỏ ra.

Bây giờ hãy thêm vào một vài style trong `App.css` để khiến cho các item idea nhìn giống một viên đá lát (tile).

### Stateless functional components

Trước khi chúng ta tiếp tục, hãy refactor lại code và chuyển phần JSX của các tile idea sang một component riêng gọi là Idea

```
import React from 'react'

const Idea = ({idea}) =>
  <div className="tile" key={idea.id}>
    <h4>{idea.title}</h4>
    <p>{idea.body}</p>
  </div>

export default Idea
```

Đây là một stateless functional componet (hay còn được gọi là một "dumb" component), có nghĩa là nó không có state nào cả. Nó chỉ là một function chấp nhận dữ liệu đầu vào và trả về JSX.

Và trong map function ở IdeasContainer, ta có thể return component Idea mới được tạo như sau:

```
{this.state.ideas.map((idea) => {
  return (<Idea idea={idea} key={idea.id} />)
})}
```

Ngoài ra cũng đừng quên import `Idea`:

```
import Idea from './Idea'
```

Như vậy ta đã hoàn thành phần đầu tiên của ứng dụng. Chúng ta có một API với một endpoint để lấy các ideas và có một React app để hiển thị chúng. (Còn nữa)

## Tham khảo

https://www.sitepoint.com/react-rails-5-1/