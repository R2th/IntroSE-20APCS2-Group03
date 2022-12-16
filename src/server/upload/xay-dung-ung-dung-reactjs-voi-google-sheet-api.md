### 1.  Giới thiệu.
Trong công việc hằng ngày chúng ta thường xuyên phải làm việc với google sheet. Nhưng thực sự để mà hiểu và làm được nó thì thật là khó và không dễ lắm. Nhưng nó thật thú vị nếu như bạn có thể làm chủ nó. Và hôm nay mình muốn cùng mọi người xây dựng 1 ứng dụng nhỏ liên quan đến google sheet api(không liên quan cho lắm :D).
### 2. Cài đặt.
Để bắt đầu với ứng dụng chúng ta phải cài cơ bản về reactjs.Mình sẽ không đề cập ở đây.
1. Tạo react app.

-  Để băt đầu nhanh ta mỡ terminal và tạo 1 react app.
```
npm create-react-app google-sheet-api
cd google-sheet-api
npm start
```
Vậy tạm thời là vậy tiếp theo chúng ta sẽ tạo app google để có thể truy cập api.

2.  Tạo google app api.
    - Chúng ta truy cập vào link sau để tạo app. [Google api app](https://console.developers.google.com/projectcreate?project=adroit-cortex-223517)

    - Sau khi tạo xong app moiij người vào APIs & Services và chọn Credentials để tạo credentials và từ đó ta có thể lấy được key.
    ![](https://images.viblo.asia/a5b46e90-5e07-497a-bc4e-738f0c15ec75.png)
    - Và sau khi đủ đạo cụ ta bắt đầu tạo các component đơn giản để có thể get data từ api.
    
4.Tao file config để connect tới api.

  - Ta tạo file src/api/config.js
  
  ```
  export default {
  apiKey: "Your api key",
  discoveryDocs: 
    ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
  spreadsheetId: "sheet id"
}
  ```
  - Tạo file src/api/sheet.js  để get data.
  ```
  import config from './api/config';


export const load = (callback) => {
  window.gapi.client.load("sheets", "v4", () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: config.spreadsheetId,
        range: "ThangTD!A3:L3"
      })
      .then(
        response => {
          const data = response.result.values;
          console.log(data)
          const items = data.map(item => ({
            year: item[0],
            make: item[1],
            model: item[2]
          })) || [];
          callback({
            items
          });
        },
        response => {
          callback(false, response.result.error);
        }
      );
  });
}
  ```
Và sau khi ta get được kết quả ta sẽ hiển thị giá trị lấy về ngay trên app component luôn nha (mọi người có thể tạo các commponent nhỏ ra để quản lý cái đó tùy mục đích mọi người)
- Ở app.js
```
import React, { Component } from 'react';
import config from './api/config';
import {load, updateCell} from './api/spreadsheet';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      items: [],
      error: null
    }
  };

  componentDidMount() {
    window.gapi.load("client:auth2", this.initClient)
  };

  initClient = () => {
    window.gapi.client.init({
      apiKey: config.apiKey,
      discoveryDocs: config.discoveryDocs
    })
    .then(() => {
      load(this.onLoad);
    })
  };

  onLoad = (data, error) => {
    if (data) {
      const items = data.items;
      this.setState({ items });
    } else {
      this.setState({ error });
    }
  };

//.......
}

export default App;
```
Và hiện thị.
```

  render() {
      const listItems = this.state.items.map((item) =>
        <li>{item.name} at Latitute {item.lat} and Longitude {item.lng} </li>
     );
    return (
      <div className="App">
          <div>
             <ul>{listItems}</ul>
          </div>
      </div>
    );
  }

```
### 3. Kết thúc.
Trên đây là 1 ứng dụng nhỏ về react liên qua tới api của google . Cảm ơn mọi người.