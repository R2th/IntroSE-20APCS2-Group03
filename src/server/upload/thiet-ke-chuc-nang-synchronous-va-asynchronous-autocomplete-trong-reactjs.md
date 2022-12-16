### Giới thiệu
Đợt vừa rồi, dự án mình tham gia có yêu cầu xây dựng chức năng tự động hoàn thành khi nhập vào input search. Bản thân mình cũng rất lười gõ mỗi khi tìm kiếm vì thế việc áp dụng công nghệ auto-complete vào trong ứng dụng sẽ giúp cho trải nhiệm người dùng tốt hơn, cũng như nâng cao kĩ thuật cho bản thân.

Ý tưởng xây dựng của mình cũng đơn giản, khi bạn gõ vào search input một đoạn text bất kì hệ thống cũng sẽ show danh sách ra các kết quả tương tứng với đoạn text bạn vừa nhập. Việc suggest như vậy sẽ đảm bảo thông tin bạn cần tìm sẽ chính xác hơn do dữ liệu lấy ra từ trên server hoặc fix cứng ở local. 

Trong bài việc này mình sẽ sử dụng reactjs phía client, phần server mình sẽ sử dụng ruby.

### Package requirements
Để setup cho ứng dụng react, mình sẽ sử dụng package react-create-app để tạo base cho ứng dụng react. Để cài đặt bạn gõ lệnh sau:
```
npx create-react-app auto-complete
cd auto-complete
npm start
```

Kết thúc phần tạo base, tiếp theo để tạo các component cần thiết cho việc auto-complete, mình sẽ sử dụng package `react-autocomplete`, vì component này có thể dễ dàng tối ưu và chỉnh sửa. Gõ lệnh sau để cài đặt
```
npm install --save react-autocomplete
```

Component tiếp theo cần phải cài đặt là `axios`
### Tạo một autocomplete với data fix cứng
Trước tiên mình sẽ thiết kế lại cấu trúc thư mục của react create app lại như sau:
```
node_modules
public
src
├── AutocompleteContainer
│   ├── index.jsx
├── index.js
├── serviceWorker.js
package.json
package-lock.json
```
Trong phần code của index.js mình sẽ sửa lại code như sau:
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import AutoCompleteContainer from "./AutoCompleteContainer/index"
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<AutoCompleteContainer />, document.getElementById('root'));

serviceWorker.unregister();
```

Tiếp theo lại với file index.jsx tạo mới mình sẽ viết theo code base của `react-autocomplete` component:
```javascript
import React from 'react'
import Autocomplete from 'react-autocomplete';

class AutoCompleteContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      autocompleteData: [
        {
          locationId: 1,
          name: 'Hanoi'
        },
        {
          locationId: 2,
          name: 'HCM'
        },
        {
          locationId: 3,
          name: 'DaNang'
        }
      ]
    };
  }

  onChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }

  onSelect = (val) => {
    this.setState({
      value: val
    });
  }

  renderItem(item, isHighlighted){
    return (
      <div
        style={{background: isHighlighted ? 'lightgray' : 'white'}}
        key={item.locationId}
      >
        {item.name}
      </div>
    );
  }

  getItemValue(item){
    return `${item.name}`;
  }

  render(){
    return (
      <div>
        <Autocomplete
          getItemValue={this.getItemValue}
          items={this.state.autocompleteData}
          renderItem={this.renderItem}
          value={this.state.value}
          onChange={this.onChange}
          onSelect={this.onSelect}
        />
      </div>
    );
  }
}

export default AutoCompleteContainer
```

Dữ liệu để test có vẻ hơi ít! Mình sẽ tự build file json chứa tên của các thành phố trên thế giới các bạn có thể tham khảo ở [đây](https://github.com/duongpham910/auto-complete/blob/develop/src/AutoCompleteContainer/cities.json). Đồng thời import thêm file json vừa down về:
```javascript
import cities from './cities.json';

class AutoCompleteContainer extends React.Component {
  ...
  render(){
    return (
      <div>
        <Autocomplete
          getItemValue={this.getItemValue}
          items={cities}
          renderItem={this.renderItem}
          value={this.state.value}
          onChange={this.onChange}
          onSelect={this.onSelect}
        />
      </div>
    );
  }
}

export default AutoCompleteContainer
```



Gõ lệnh `npm start` để chạy chương trình. Sau khi giao diện sẽ hiện thị như sau:
![](https://images.viblo.asia/1425021e-3771-4de6-b2ff-b245e3c931b7.png)

Tuy nhiên hiện tại component vẫn tương đương với drop down box, mình sẽ sửa 1 chút để có thể tự động suggest tên thành phố tương ứng với đoạn text được nhập:
```javascript
class AutoCompleteContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      autocompleteData: []
    };
  }
  
  onChange = (e) => {
    this.setState({
      value: e.target.value,
      autocompleteData: this.getSuggestions(e.target.value)
    });
  }
  
  getSuggestions = (value) => {
    const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (escapedValue === '') {
      return [];
    }
    const regex = new RegExp('^' + escapedValue, 'i');
    return cities.filter(city => regex.test(city.name));
  }
  ...
  
  render(){
    return (
      <div>
        <Autocomplete
          getItemValue={this.getItemValue}
          items={this.state.autocompleteData}
          renderItem={this.renderItem}
          value={this.state.value}
          onChange={this.onChange}
          onSelect={this.onSelect}
        />
      </div>
    );
  }
```

Sau khi sửa kiểm tra lại xem ứng dụng đã chạy đúng chưa nhé:
![](https://images.viblo.asia/00ec9c81-32d3-4361-9bdf-d92a7f09ca73.gif)

Vậy là xong phần auto-complete với dữ liệu đã được load từ trước đến đây là kết thúc. Phần tiếp theo mình sẽ viết việc load các suggest item từ database.

### Tạo một autocomplete với data được load từ trên server

Mình vẫn sẽ tiếp tục sửa dụng base đã được cài đặt ở phía trên. Thay vì mình dùng `function getSuggestions` để lọc tên các nước không thảo mãn mình sẽ viết một function khác để get dữ liệu từ server. Dữ liệu sau khi được load về thành công sẽ được set cho state autocompleteData.

```javascript
import React from 'react'
import Autocomplete from 'react-autocomplete';
import cities from './cities.json';
import axios from 'axios';

class AutoCompleteContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      autocompleteData: []
    };
  }

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });

    this.retrieveDataAsynchronously(e.target.value)
  }

  onSelect = (val) => {
    this.setState({
      value: val
    });
  }

  retrieveDataAsynchronously = (searchText) => {
    let url = "example.com"
    axios.get(url)
    .then(response => {
      this.setState({
        autocompleteData: response.data
      });
    })
    .catch(error => {
      console.error(error);
    })
  }

  renderItem(item, isHighlighted){
    return (
      <div
        style={{background: isHighlighted ? 'lightgray' : 'white'}}
        key={item.locationId}>
        {item.name}
      </div>
    );
  }

  getItemValue(item){
    return `${item.name}`;
  }

  render(){
    return (
      <div>
        <Autocomplete
          getItemValue={this.getItemValue}
          items={this.state.autocompleteData}
          renderItem={this.renderItem}
          value={this.state.value}
          onChange={this.onChange}
          onSelect={this.onSelect}
        />
      </div>
    );
  }
}

export default AutoCompleteContainer
```

Ở ví dụ phía trên mình thêm đoạn code base function retrieveDataAsynchronously để có thể call API và load dữ liệu từ server về. Function được gọi mỗi khi người dùng nhập vào input search một đoạn text, sau đó dữ liệu được trả về và gán vào state autocompleteData .

### Một số thuộc tính khác của react-autocomplete
Việc áp dụng auto-complete cho các input đã hoàn tất, tuy nhiên giao diện vẫn chưa đạt yêu cầu do từng dự án lại có thiết kế riêng nên ta sẽ phải tìm cách để thay đổi sao cho phù hợp với thiết kế.

Để có sửa một số thuộc tính cơ bản cho input ví dụ như: `class name`, `placeholder`. Ta sẽ truyền vào auto-complete component như sau:
```javascript
import './index.css';
...
  render(){
    const inputProps = {
      placeholder: "Search",
      className: "search-input",
    };
    const wrapperStyle = {}
    return (
      <div className="auto-container">
        <Autocomplete
          getItemValue={this.getItemValue}
          items={this.state.autocompleteData}
          renderItem={this.renderItem}
          value={this.state.value}
          onChange={this.onChange}
          onSelect={this.onSelect}
          inputProps={inputProps}
          wrapperStyle={wrapperStyle}
        />
      </div>
    );
  }
```
```css
.auto-container {
  width: 800px;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  height: 50px;
  padding: 0px 18px 0 25px;
  font-size: 14px;
  color: $label-color;
  font-weight: 400;
  border: 1px solid #e5e6e7;
  line-height: 50px;
}
```
Kết quả sau khi mình thêm style cho auto-complete component 
![](https://images.viblo.asia/0359baa2-1942-470a-9bd4-ecd4c46a3dd5.png)

### Kết thúc

Cảm ơn các bạn đã đọc bài viết của mình, tuy kiến thức trong bài viết không có gì cao siêu tuy nhiên đó là những kinh nghiệm của mình rút ra được khi làm các task trong dự án. Hy vọng bài viết của mình sẽ giúp được các bạn trong dự án 

Bài viết này được tham khảo tại https://ourcodeworld.com/articles/read/546/how-to-create-a-synchronous-and-asynchronous-autocomplete-input-in-reactjs