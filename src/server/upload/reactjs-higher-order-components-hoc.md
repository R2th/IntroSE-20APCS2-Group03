Hôm nay chúng ta cùng nhau tìm hiểu về HOC nhé

Các thành phần bậc cao hơn là các hàm `JavaScript` được sử dụng để thêm các chức năng bổ sung vào thành phần hiện có. Các hàm này thuần túy, có nghĩa là chúng đang nhận dữ liệu và trả về các giá trị theo dữ liệu đó. Nếu dữ liệu thay đổi, các hàm bậc cao hơn sẽ được chạy lại với đầu vào dữ liệu khác nhau. Nếu chúng ta muốn cập nhật thành phần trả về của mình, chúng ta không cần phải thay đổi HOC. Tất cả những gì chúng ta cần làm là thay đổi dữ liệu mà hàm của chúng ta đang sử dụng.

Thành phần bậc cao hơn (HOC) là một kỹ thuật nâng cao trong React để sử dụng lại logic thành phần. HOC không phải là một phần của API React. Chúng là một mẫu xuất hiện từ bản chất cấu thành của React.

> Một HOC nhận vào là một component và trả về một component mới

Chúng ta hãy xem một ví dụ đơn giản để dễ dàng hiểu cách hoạt động của khái niệm này.

#### 1. Install React.js
``` javascript
npm install -g create-react-app
create-react-app my-app

cd my-app
npm/yarn start
```

#### 2. Tạo một file HOC
``` javascript
// HOC.js

import React, {Component} from 'react';

export default function Hoc(HocComponent){
    return class extends Component{
        render(){
            return (
                <div>
                    <HocComponent></HocComponent>
                </div>
            );
        }
    } 
}
```
Đầu tiên, chúng ta đã tạo một hàm là `Hoc` bên trong file `HOC.js.`

Và props truyền vào là một component

Tiếp theo, chúng ta tạo một file App.js và import file Hoc vào
``` javascript
import React, { Component } from 'react';
import Hoc from './HOC';

class App extends Component {
  
  render() {
    return (
      <div>
        Higher-Order Component
      </div>
    )
  }
}
App = Hoc(App);
export default App;
```
Hàm `Hoc` nhận vào là một component, ở đây chúng to đã truyền func `App` vào. Nếu chúng ta muốn thay đổi dữ liệu chỉ cần đổi prop truyền vào.

OK, Tiếp theo chúng ta tạo file `StockList.js`
``` javascript
// StockList.js

import React, { Component } from 'react';
import TableRow from './TableRow';

class StockList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          stocks: [
            {
                id: 1,
                name: 'Iphone 11'
                    
            },
            {
                id: 2,
                name: 'Ipab'
            },
            {
                id: 3,
                name: 'Iphone 12 promax'
            }
          ]
        };
      }
      
      tabRow(){
        if(this.state.stocks instanceof Array){
          return this.state.stocks.map(function(item, i){
              return <TableRow data={item} key={i} />;
          })
        }
      }
      render() {
        return (
            <div className="container">
            <table className="table table-striped">
              <thead>
                <tr>
                  <td>Stock Name</td>
                  <td>Stock Price</td>
                </tr>
              </thead>
              <tbody>
                {this.tabRow()}
              </tbody>
            </table>
        </div>
        );
      }
}
export default StockList;
```

Chúng ta tạo tiếp file `TableRow.js`
``` javascript
// TableRow.js

import React, { Component } from 'react';

class TableRow extends Component {
  render() {
    return (
        <tr>
          <td>
            {this.props.data.id}
          </td>
          <td>
            {this.props.data.name}
          </td>
        </tr>
    );
  }
}

export default TableRow;
```

Bây giờ, chúng ta import  `StockList.js` vào file `App.js` và file `App.js` bây giờ sẽ như thế này
``` javascript
// App.js

import React, { Component } from 'react';
import StockList from './StockList';

class App extends Component {
  
  render() {
    return (
      <div>
        <StockList></StockList>
      </div>
    )
  }
}

export default App;
```

Bây giờ, lưu file và truy cập `http: // localhost: 3000` . Bạn sẽ thấy bảng danh sách Stock.

Tiếp theo chúng ta sửa lại file `HOC.js` một chút, như bên dưới

``` javascript
// HOC.js

import React, {Component} from 'react';

export default function Hoc(HocComponent, data){
    return class extends Component{
        constructor(props) {
            super(props);
            this.state = {
                data: data
            };
        }
        
        render(){
            return (
                <HocComponent data={this.state.data} {...this.props} />
            );
        }
    } 
}
```
Hàm trên chúng ta thêm một prop mới là data, để truyền thêm data vào. Giờ chúng ta sửa lại file App.js và call HOC
```
// App.js

import React, { Component } from 'react';
import StockList from './StockList';
import UserList from './UserList';
import Hoc from './HOC';

const StocksData = [
 {
    id: 1,
    name: 'Iphone 11'

},
{
    id: 2,
    name: 'Ipab'
},
{
    id: 3,
    name: 'Iphone 12 promax'
}
];

const Stocks = Hoc(
  StockList,
  StocksData
);


class App extends Component {
  
  render() {
    return (
      <div>
        <Stocks />
      </div>
    )
  }
}

export default App;
```

Ok, giờ chúng ta mở trang web lên và chạy lại xem thành quả nhé.

Công dụng chính của `HOC` là để nâng cao khả năng tái sử dụng của các `component` cụ thể trong nhiều mô-đun hoặc thành phần. Chúng ta cũng có thể bao gồm các `component` khác nhau. Hầu hết các thư viện của bên thứ ba đang sử dụng tính năng này

#### Những chú ý khi dùng HOC
* Không sử dụng HOC bên trong phương thức render()
* Ref không được truyền qua HOC
* Các phương thức static phải được copy

#### Tài liệu tham khảo
https://reactjs.org/docs/higher-order-components.html

Cảm ơn các bạn đã đọc bài viết của mình. Có gì sai sót mong các bạn góp ý:relaxed::relaxed::relaxed: