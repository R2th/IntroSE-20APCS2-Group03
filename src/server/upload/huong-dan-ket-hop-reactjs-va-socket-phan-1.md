Trong bài viêt này, mình sẽ cùng các bạn tạo ra 1 ứng dụng realtime cùng với Reactjs và socketio. Cụ thể hơn, sản phẩm chúng ta hướng tới sẽ là 1 game đơn giản để 2 người có thể chơi online với nhau, mình sẽ đặt tên nó là Pikachu War.

**Bắt đầu thôi!!!**

**1/ Khởi tạo base project**

Chúng ta sẽ tạo react project với cú pháp thần thánh quen thuộc

```npx create-react-app pikachu-war```

Sau đó truy cập vào folder pikachu-war: ```cd pikachu-war```

Vì chúng ta xây dựng app dựa trên kết hợp react và socketio nên chắc chắn không thể thiếu socketio rồi, cài đặt thêm socketio, hoặc đơn giản là copy đoạn code sau vào file ```package.json``` của bạn

````
{
  "name": "pikachu-war",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "gh-pages": "^1.0.0",
    "jquery": "^3.2.1",
    "lodash": "^4.17.15",
    "react": "^16.12.0",
    "react-dom": "^16.12.0",
    "react-scripts": "3.2.0",
    "socket.io-client": "^2.0.4",
    "styled-components": "^4.4.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject",
    "deploy": "react-scripts build && gh-pages -d build"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
````
Sau khi copy xong thì nhớ chạy thêm câu lệnh ```npm install``` hoặc ```yarn``` để cài đặt các package có trong list trên

**2/ Tạo component**

chúng ta sẽ tạo 1 component là Screen để pikachu của chúng ta có thể di chuyển trên đó, tạo 1 file và đặt tên là ```Board```, hoặc đơn giản là copy đoạn code này vào:
````
import React from "react";
import styled from "styled-components";

import BreakWall  from './break_wall.jpg';
import Pikachu  from './pikachu.jpg';

export default class Board extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      dataBoard: props.dataBoard,
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.dataBoard!==this.props.dataBoard){
      this.setState({dataBoard: nextProps.dataBoard });
    }
  }

  detectObstacle = (position) => {
    const { dataBoard } = this.state;
    let tmp = [];
    dataBoard.map((rowData, y) => {
      rowData.map((item, x) => {
        if (item.object === 'break_wall' ) {
          tmp.push({x, y, object: 'break_wall'});
        }
      })
    })
    let error = [];

    for (let i = 0; i < tmp.length; i++) {
      if (position.x === tmp[i].x && position.y === tmp[i].y) {
        error.push(`collide:${tmp[i].x}_${tmp[i].y}`);
      }
    }
    return !!error.length;
  }

  moveObject = (object, direction) => {
    const { dataBoard } = this.state;
    let tmp = dataBoard;
    let position = {};
    dataBoard.map((rowData, y) => {
      rowData.map((item, x) => {
        if (item.object === object ) {
          return position = {x, y};
        }
      })
    })
    let isCollide = false;
    switch(direction) {
      case 'up':
        if (position.y === 0) return null;
        isCollide = this.detectObstacle({x: position.x, y: position.y - 1});

        if (isCollide) return null;
        tmp[position.y][position.x].object = null;
        tmp[position.y - 1][position.x].object = 'pikachu';
        break;
      case 'down':
        if (position.y === 8) return null;
        isCollide = this.detectObstacle({x: position.x, y: position.y + 1});

        if (isCollide) return null;
        tmp[position.y][position.x].object = null;
        tmp[position.y + 1][position.x].object = 'pikachu';
        break;
      case 'left':
        if (position.x === 0) return null;
        isCollide = this.detectObstacle({x: position.x - 1, y: position.y});

        if (isCollide) return null;
        tmp[position.y][position.x].object = null;
        tmp[position.y][position.x - 1].object = 'pikachu';
        break;
      case 'right':
        if (position.x === 8) return null;
        isCollide = this.detectObstacle({x: position.x + 1, y: position.y});

        if (isCollide) return null;
        tmp[position.y][position.x].object = null;
        tmp[position.y][position.x + 1].object = 'pikachu';
        break;
      default:
        break;
    }
    this.props.updateData({dataBoard: tmp});
  }

  renderRect() {
    const { dataBoard } = this.state;
    return dataBoard.map((rowData, y) => {
      return rowData.map((item, x) => {
        return (
          <RectangleContainer
            key={`${x}_${y}`}
            bgImage={
              item.object === 'pikachu'
                ? Pikachu 
                  : item.object === 'break_wall' 
                    ? BreakWall 
                      : null}
          />
        )
      })
    })

  }
  render() {
    return (
      <React.Fragment>
        <BoardContainer>
        {this.renderRect()}
        </BoardContainer>
        <button onClick={() => this.moveObject('pikachu', 'up')}>
          Up
        </button>
        <button onClick={() => this.moveObject('pikachu', 'down')}>
          Down
        </button>
        <button onClick={() => this.moveObject('pikachu', 'left')}>
          Left
        </button>
        <button onClick={() => this.moveObject('pikachu', 'right')}>
          Right
        </button>
      </React.Fragment>
    );
  }
}

const BoardContainer = styled.div`
  height: 468px;
  width: 468px;
  border: solid;
  display: flex;
  flex-wrap: wrap;
  background-color: white;
`;

const RectangleContainer = styled.div`
  height: 50px;
  width: 50px;
  border: 1px solid;
  display: flex;
  flex-wrap: wrap;
  background-image: url(${props => props.bgImage || null});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;
````

**Giải thích**

- Trước tiên, các bạn sẽ cần kiếm 2 hình khác để thay cho pikachu.jpg và break_wall.jpg để có thể chạy được ứng dụng.
- BoardContainer là 1 hình vuông lớn có chứa 9x9 ô nhỏ RectangleContainer ( nó giống như bàn cờ vua nhưng to hơn tí)
- các button và hàm moveObject giúp chúng ta di chuyển nhân vật pikachu đi trong bàn cờ, kết hợp cùng với hàm detectObstacle, nhân vật pikachu của chúng ta sẽ không thể di chuyển đè lên các ô có dữ liệu object là 'break_wall'.
- func renderRect sẽ render các ô vuông ra có chứa object phù hợp ra, ( bao gồm, pikachu, break_wall và ô đường đi)
-  dataBoard chúng ta sẽ nhận từ Component cha

**App.js**

chúng ta sẽ code lại file app.js như sau
````
import React, { Component } from 'react';
import Board from './Board';
import io from 'socket.io-client';

const socket = io('localhost:6969');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataBoard: [],
    }
  }

  componentWillMount() {
    socket.on('getData', res => this.setState({dataBoard: res.dataBoard})) 
  }

  componentDidUpdate() {
    socket.on('sendData', res=> this.setState({dataBoard: res.dataBoard})); 
  }

  updateData = (data) => {
    socket.emit("updateData", data);
  }
  
  render () {
    const { dataBoard } = this.state;
    return (
      <Board dataBoard={dataBoard} updateData={data => this.updateData(data)}/>
    )
  }
}
````

**3/ Tạo server**

chúng ta sẽ tạo thư mực chứa server Node, ```mkdir server``` để tạo folder server

tạo file ```package.json``` với nội dung như sau
````
{
  "name": "pikachu-war",
  "version": "1.0.0",
  "description": "begin",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "license": "ISC",
  "dependencies": {
    "ejs": "^2.5.7",
    "express": "^4.15.4",
    "lodash": "^4.17.4",
    "request": "^2.81.0",
    "socket.io": "^2.0.3"
  }
}
````
tiếp theo tạo file ```index.js``` với nội dung
````
var express = require("express");
var app = express();
var server = require("http").Server(app);
var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 6969;
var io = require("socket.io")(server);
server.listen(port, () => console.log("Server running in port " + port));

const data = [];
let rowData = [];
for (let i = 0; i <= 8; i++) {
  for (let j = 0; j <= 8; j++) {
    if (i % 2 === 1 && j % 2 === 1) {
      rowData.push({
        id: `${j}_${i}`,
        object: 'break_wall',
      })
    } else {
      rowData.push({
        id: `${j}_${i}`,
        object: j === 4 && i === 4 ? 'pikachu' : null
      })
    }
  }
  data.push(rowData);
  rowData = [];
};

io.on("connection", function(socket) {
  const dataServer = data;
  console.log(socket.id + ": connected");
  socket.on("disconnect", function() {
    console.log(socket.id + ": disconnected");
  });
  io.sockets.emit("getData", {dataBoard: dataServer});
  socket.on("updateData", data => {
    io.emit("sendData", {dataBoard: data.dataBoard})
  });

});

app.get("/", (req, res) => {
  res.send("Game on!!!");
});
````

sau đó chạy lệnh ```npm install``` hoặc ```yarn``` để cài đặt package,  ```node index.js``` để chạy server trên ```port:6969```

Giờ các bạn có thể chạy ứng dụng trên địa chỉ ```http://localhost:3000```, và đây là thành quả.

![](https://images.viblo.asia/e1554518-42e2-42cf-9aa5-22d834fb00ac.PNG)

Cơ bản là chúng ta đã xong được hình hài đầu tiên của app, bạn có thể bấm các button tương ứng để điều khiển pikachu. Bạn của bạn cũng có thể mở thêm 1 trang khác lên và điểu khiển pikachu của bạn, và bạn cũng sẽ thấy nó chuyển động trên máy mình

Dù vậy, ứng dụng của chúng ta vẫn còn thiếu rất nhiều thứ. trong phần sau mình sẽ tiếp tục tạo thêm room riêng để 2 người chơi có thể chiến đâu với nhau trong room

Cảm ơn các bạn đã theo dõi bài viết