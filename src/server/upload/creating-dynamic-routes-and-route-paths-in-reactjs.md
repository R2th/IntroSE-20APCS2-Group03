Chào mọi người, Hôm nay chúng ta cùng tìm hiểu về react router trong reactjs. Let's go!.
## Creating A New React Application
Tạo project mới bằng command sau:
```
create-react-app picture_viewer
```
Tiếp theo di chuyển đến project vừa tạo:
```
cd picture_viewer
```
View trên trình duyệt:
```
npm start
```
sử dụng visual studio code cấu trúc thư mục sẽ như sau:
![](https://images.viblo.asia/a2fdcea5-bf6b-454b-97ba-e3634d901ac1.png)
Mở file App.js và sửa lại như sau:
![](https://images.viblo.asia/96d62872-0f80-47ba-9dc2-fa9d131b8930.png)
Tiếp theo sửa file index.js:
```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';  
ReactDOM.render(<App />, document.getElementById('root'));
```
## Installing Dependencies
Chúng ta sẽ sử dụng react-dom nhé, run command:
```
npm install react-router-dom
```
## Creating our files
Tạo folder pages trong folder src, folder pages sẽ xử lý tất cả các page của ứng dụng. Tạo 2 file imageDetail.jsx và index.jsx, file index.jsx sẽ là trang hiển thị ứng dụng mặc định của chúng ta, imageDetail.jsx sẽ là nơi hiển thị chi tiết về nội dung ảnh của chúng ta.
imageDetail.jsx
![](https://images.viblo.asia/250a99a5-36d8-4f64-bcb1-4077fc8aa86c.png)
index.jsx
![](https://images.viblo.asia/d528aa94-1b6e-4493-a39d-c9e29099b346.png)
## Setting Up React-Router-DOM
Chúng ta đã cài đặt react-router-dom trong ứng dụng của chúng ta. Chúng ta cần tạo ra hai pages, một page đến trang index.js và một page đến imageDetail.jsx
### Let's Begin
Chúng ta sẽ điều hướng file index.jsx làm thư mục root. import browserRouter từ react-router-dom trong file index.jsx như sau.
```
import { BrowserRouter } from 'react-router-dom'
```
Tiếp theo chúng ta sử dụng component bên trong BrwoserRouter, bây giờ chúng ta có thể xây dụng route bên trong ứng dụng của mình.
```
const app = <BrowserRouter> <App /> </BrowserRouter>
```
Bây giờ thay thế <App /> trong render bằng hằng số app:
```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom'

const app = <BrowserRouter> <App /> </BrowserRouter>

ReactDOM.render( app, document.getElementById('root'));
```
## Creating Our Routes
Điều hướng trong file app.js và sửa lại như sau:
```
import React from 'react';
import IndexRoute from './pages/index';
import ImageDetailRoute from './pages/imageDetail';
import {Switch, Route} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component = {IndexRoute} />
        <Route path="/image/:name" render={ props => <ImageDetailRoute {...props} /> } />
      </Switch>
    </div>
  );
}

export default App;
```
## Creating An Array Of Objects to Contain our Pictures and Details on Each Picture
Tạo file imgArray.js:
```
const imgArray = [
  {
    name: "Splendor",
    image: "http://onebigphoto.com/uploads/2011/12/magnificent-peacock.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    photographer: "Mirabella"
  },
  {
    name: "Natural",
    image:
      "https://i0.wp.com/areomagazine.com/wp-content/uploads/2019/07/espen-willersrud-GlHKd5I4SkY-unsplash.jpg?fit=1920%2C1280&ssl=1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    photographer: "Johnny"
  },
  {
    name: "Brave",
    image:
      "https://store-images.s-microsoft.com/image/apps.58792.68457814095533373.a0576f2d-8e71-4ce4-90fa-c24d8fc99462.6b0ff4ae-7c30-489b-9cfa-c0b78c259b74?mode=scale&q=90&h=1080&w=1920",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    photographer: "Daniel Don"
  },
  {
    name: "Sharp",
    image:
      "https://i2.wp.com/o.aolcdn.com/hss/storage/midas/924f8c548a89da6953a9022d8038fcd/200072281/relics_jimgolden.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    photographer: "Chiagozielam"
  },
  {
    name: "Exquisite",
    image:
      "https://exquisiteandelegantevents.com/files/2018/10/alasdair_elmes_682868_unsplash_2_.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    photographer: "Sarah"
  },
  {
    name: "Waters",
    image:
      "https://1843magazine.static-economist.com/sites/default/files/styles/article-main-image-overlay/public/DSCF7443.jpg",
    description: "",
    photographer: "Mirabella"
  },
  {
    name: "Everyday-Life",
    image:
      "https://www.redwallpapers.com/public/redwallpapers-large-thumb/grayscale-photo-of-people-walking-in-the-street-free-stock-photo-image-wallpaper.jpeg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    photographer: "Fling Stone"
  },
  {
    name: "Gadgets",
    image:
      "https://cdn.vox-cdn.com/thumbor/HOBzegwV2CJRJDWJyh71nYq8gEE=/0x0:2625x1907/1200x800/filters:focal(1103x744:1523x1164)/cdn.vox-cdn.com/uploads/chorus_image/image/52187575/jbareham_160418_0931_0086_FINAL_NO_BUFFER_5MB_02.0.0.jpeg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    photographer: "Daniel Don"
  },
  {
    name: "Beauty",
    image:
      "https://pbs.twimg.com/profile_images/1153052818468737026/hqeHshCl_400x400.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    photographer: "Miracle"
  },
  {
    name: "Leaves",
    image:
      "https://picjumbo.com/wp-content/uploads/leaf-leaves-background-free-photo-DSC04946-2210x1473.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    photographer: "Lexa"
  }
];
export default imgArray;
```
Sử dụng method map đế hiển thị content trong file index.jsx.
```
import React, { Component } from "react";
import imageArr from "../imgArray";
import { Link } from "react-router-dom";
import "./style.css"
export default class index extends Component {
render() {
  return (
    <div className = "index-container">
      <h1 id= "index-title">We Talk Photography!!</h1>
      <div className="row container">
        {imageArr.map(({ name, photographer, image }) => (
          <div className="col-sm-10 col-md-3 col-lg-4">
            <div className="card " style={{ width: "18rem" }}>
              <img src={image} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p>
                  <b>Photographer: </b>
                  {photographer}
                </p>
                <Link to={`/image/${name}`} className="btn btn-primary">
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
}
```
Mở ứng dụng trên trình duyệt để xem kết quả nào:
![](https://images.viblo.asia/20e42fbe-daa2-4192-83ad-3968d8ce6cfe.png)
## show details
Sửa lại file imageDetail.jsx như sau:
```
import React, { Component } from "react";
import imageArr from "../imgArray";
import { Link } from "react-router-dom";

class ImageDetail extends Component {
  state = {
    details: {}
  };

  componentDidMount() {
    const name = this.props.match.params.name;
    const detail = imageArr.find(obj => obj.name === name);
    this.setState({ details: detail });
  }
  render() {
    return (
      <div>
        <div className="row mt-5 ml-3">
          <div className="col-sm-10 col-md-4 col-lg-4">
            <img src={this.state.details.image} width="100%" alt="" />
          </div>
          <div className="col-sm-10 col-md-4 col-lg-5">
            <div className="card">
              <div className="card-body">
                <div className="card-title">
                  <h2>{this.state.details.name}</h2>
                </div>
                <div className="card-title">
                  <h5>
                    Photographer: <b>{this.state.details.photographer}</b>
                  </h5>
                </div>
                <p>{this.state.details.description}</p>
                <Link className="btn btn-primary" to="/">
                  Go Back To Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageDetail;
```
WE ARE DONE !!
Đây là kết quả của ứng dụng của chúng ta. 
![](https://images.viblo.asia/3d6b6ef8-8f42-4f27-bf8b-9c5b9215b7d8.png)
Happy codding!
Bạn có thể tham khảo tại đây nhé.
https://hashnode.com/post/creating-dynamic-routes-and-route-paths-in-reactjs-ck1t82j5s003hpis1iue7eeag