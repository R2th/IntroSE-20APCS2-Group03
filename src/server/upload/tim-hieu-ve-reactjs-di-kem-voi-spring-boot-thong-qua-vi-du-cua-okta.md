Vì nhu cầu cải thiện kỹ năng vốn có, đồng thời tìm hiểu thêm về các kỹ thuật "mới", nên hôm nay muốn cùng mọi người tìm hiểu qua về ReactJS.

# 1. Điểm qua những điểm cơ bản dễ thấy của ReactJS
*  Đây là 1 thư viện/library(not framework) do Facebook phát triển.
*  Không như Thymleaf là một tool/utility hỗ trợ xử lý dữ liệu ở phần View của một project thông thường, ReactJS càng giống như một template vừa hỗ trợ quản lý, vừa xử lý logic, vừa làm Path management hơn(View layer)
*  Nếu như AngularJS là "nhúng"/sử dụng những tiền tố của JS(ng-app, ng-model,...) bên html để hạn chế việc xử lý qua lại quá nhiều giữa html và JS; thì ReactJS ngược lại sẽ nhúng html vào JS (JSX).
*  Tránh tương tác với cây DOM tree vì với những thay đổi liên tục của dữ liệu, khiến việc reload ảnh hưởng tốc độ xử lý. Thay vì thế, tương tác với một DOM ảo, hạn chế nhỏ nhất phạm vi xử lý.
*  ReactJS nói đơn giản chỉ tương tác với các Component(gồm 1 nhóm html liên quan đến nhau, và các Action(change, click, data change,....) đi kèm với đoạn html đó). Việc của chúng ta là custom, reuse lại những Component đó.

# 2. Một vài khái niệm chính
* Vì ReactJS do Facebook phát triển, một số Danh tự đi kèm cũng là do Facebook đưa ra. 
* Trong ví dụ tìm hiểu, mình sẽ dựa theo nguồn demo do page Okta cung cấp để học hỏi về cấu trúc, và cách thức hoạt động, tương tác giữa ReactJS và Spring Boot : https://developer.okta.com/blog/2018/07/19/simple-crud-react-and-spring-boot#call-your-spring-boot-api-and-display-the-results.
* Nguồn github họ cấp : https://github.com/oktadeveloper/okta-spring-boot-react-crud-example .
* Install thêm ReactDevTool để tiện debug : https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi/related.

### 2. 1 Components : 
Một thanh Navbar là một Component. Một thanh header là một Component. Một table danh sách kết quả là một Component,...Đơn giản một Component lớn hay nhỏ là do mình định nghĩa, gồm 1 đoạn html nhất định đại biểu cho một thành phần nào đó trên trang Web. Ví dụ như App.js trong source là định nghĩa thanh menu header :
![](https://images.viblo.asia/9551bab7-e60f-4d49-8cc7-c961775ca8d8.png)

### 2. 2 Props và State :
Props: Thuộc tính. State : trạng thái. Mỗi Component sẽ change/reload/chạy một Action một khi Props và State thay đổi.
![](https://images.viblo.asia/6327770f-f8cd-46de-a516-8ad77791e807.png)

### 2. 3 Các hàm ReactJS liên quan đến một Component :
Nguồn : https://fullstackstation.com/vong-doi-cua-component-trong-react/
```javascript
import React, {Component, PropTypes} from 'react';

class User extends Component {
  constructor(props){
    super(props)
    // Hàm này Thực hiện việc thiết lập state cho component
    // Việc sử dụng super(props) là để có thể sử dụng this.props trong phạm vi hàm constructor này
  }
  
  componentWillMount() {
    // Thực hiện một số tác vụ, hàm này chỉ thực hiện 1 lần duy nhất
    
  }
  componentDidMount() {
    // Thực hiện một số tác vụ, hàm này chỉ thực hiện 1 lần duy nhất
    // Hàm này rất hữu dụng khi bạn làm việc thêm với Map, bởi vì map chỉ render được 
    // khi có node (id) trong DOM  
    // Nói tóm lại, hàm này được gọi để thông báo component đã tồn tại trên DOM, 
    // từ đó các thao tác trên DOM sẽ có thể thực hiện bình thường đối với component này
  }
  componentWillUnmount() {
    // Hàm này thực hiện một lần duy nhất, khi component sẽ unmount
    // Hàm này hữu dụng khi bạn cần xoá các timer không còn sử dụng
  }
  componentWillReceiveProps(nextProps) {
    // Hàm này thực hiện liên tục mỗi khi props thay đổi
    // (1) Sử dụng để thay đổi trạng thái (state) của component phụ thuộc props
    // (2) Sử dụng các kết quả, khởi tạo biến có tính chất async. Ví dụ: Khởi tạo Google Map Api, đây là quá trình async,
    // do vậy, bạn không thể biết được khi nào khởi tạo xong, thì khi khởi tạo xong có thể truyền xuống component thông qua
    // props, và từ đó bạn có thể khởi tạo các dịch vụ khác.
    // Code mẫu:
    //# if(nextProps.mapLoaded){ //props.mapLoaded khởi tạo false
    //#     let googleMaps = this.props.googleMaps ||
    //#         (window.google && // eslint-disable-line no-extra-parens
    //#         window.google.maps) ||
    //#         this.googleMaps;

    //#     if (!googleMaps) {
    //#         console.error(// eslint-disable-line no-console
    //#          'Google map api was not found in the page.');
    //#         return;
    //#     }
    //#     this.googleMaps = googleMaps;

    //#     this.autocompleteService = new googleMaps.places.AutocompleteService();
    //#     this.geocoder = new googleMaps.Geocoder();
    //# } 
  }
  shouldComponentUpdate(nextProps, nextState) {
    // Hàm này thực hiện khi state và props thay đổi
    // Hàm này sẽ trả về kết quả true/false, bạn sẽ cần sử dụng đến hàm này để xử lý xem có cần update component không
  }
  
  componentWillUpdate(nextProps, nextState) {
    // Hàm này thực hiện dựa vào kết quả của hàm trên (shouldComponentUpdate)
    // Nếu hàm trên trả về false, thì React sẽ không gọi hàm này
  }  
  componentDidUpdate(prevProps, prevState) {
    // Hàm này thực hiện sau khi component được render lại, từ kết quả của componentWillUpdate
  }
  
  render() {
    return (
      <div>
        // thực hiện việc render
      </div>
    );
  }
}

User.propTypes = {
  //Khai báo kiểu biến cho props
};
User.defaultProps = {
  //Khai báo giá trị mặc định cho props
}
export default User;
```
### - Vòng đời của một Component :
![](https://images.viblo.asia/9e854315-7e5b-4aea-a187-307654d50683.png)

# 3. Phân tích 
Sau khi đã đọc qua một số khái niệm cơ bản mình nêu trên, các bạn có thể đã mường tượng ra một Component nó là CÁI GÌ, và HOẠT ĐỘNG THẾ NÀO rồi phải không?
```javascript
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    isLoading: true,
    groups: []
  };

  async componentDidMount() {
    const response = await fetch('/api/groups');
    const body = await response.json();
    this.setState({ groups: body, isLoading: false });
  }

  render() {
    const {groups, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div className="App" id="app-container">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="App-intro">
            <h2>JUG List</h2>
            {groups.map(group =>
              <div key={group.id}>
                {group.name}
              </div>
            )}
          </div>
        </header>
      </div>
    );
  }
}

export default App;

```
Ví dụ như trong đoạn code trên, thực sự đã lồng html vào trong js, tuy nhiên với số lượng 1 page gồm nhiều Component, một Component lại gồm nhiều Component nhỏ, và gồm ít nhiều ảnh, css đi kèm, nếu không quản lý cấu trúc tốt sẽ khó quản lý, hình dung

### 3.1 Flow trang Index.html :
Trong file App.js
- **Mouting phase** : render() => componentDidMount() => nhận data sau khi fetch làm change state => **Updating phase**
- **Updating phase** : Giống như việc binding model, executive render()

Trong file index.js

![](https://images.viblo.asia/38b4796a-0eed-4f1c-a4b8-1c9979d2fa34.png)

Import App như một Component vào index.html(có thể xem như là 1 template), và render nó vào vị trí cần thiết, ở đây là div[id='root']

![](https://images.viblo.asia/2b1ce18f-55fd-4eb2-b164-ce0c99c47caf.png)

Kết quả khi chưa run Server bên SpringBoot, data của Component App sẽ không fetch được list groups như mong muốn, do vậy, trong phase **Mouting phase** sẽ chỉ nhận được content là:
![](https://images.viblo.asia/71255ecc-afda-43c1-b0e1-735aa411ac42.png)

Khi started server, đã fetch được data trả về :
![](https://images.viblo.asia/a78e59fe-7398-4c32-b0e6-52ae5166fdd1.png)

### 3.2 JS expression và ReactJS Action :
Trước tiên ta thử tạo một Simple Component và sử dụng JS expression trong render() method, sau đó export ra bằng alias Test
```javascript
import React, { Component } from 'react';

class Test extends Component {

  constructor(props) {
    super(props);

    this.state = {
      text: 'feck u'
    };
  }

  changeText = () => {
    if (this.state.text && this.state.text === 'feck u') {
      this.setState({text: 'hello world'});
    }
  };

  render() {
    return (
      <span onClick={this.changeText} id='test-span'>
        {this.state.text}
      </span>
    );
  }
}

export default Test;
```

Import Component Test vào App.js
```javascript
import Test from './Test';
```
Call Component Test dưới logo, cách sử dụng giống như 1 thẻ tag thông thường : 
```javascript
<img src={logo} className="App-logo" alt="logo" />
<Test/>
```

Kết quả : 
![](https://images.viblo.asia/5d9caa7c-1362-4ccc-97d2-aef6c4314dd2.png)

Trên Component trên có khai báo một Action để change text của chính nó,  nội dung thì tương tự với dòng lệnh : 
```javascript
document.getElementById('test-span').textContent = 'hello world';
```

### 3.3 Tìm hiểu về cách cấu trúc, quản lý Page và Router trong  ReactJS (Build a React GroupList Component bên trang Okta):
Bởi vì ReactJS là tương tác bởi nhiều Component liên kết với nhau. Và như mục 3.1 mình có đề cập qua, file index.html có thể xem như là 1 template chính. Trong khi đó App.js được dùng để append phần content chính tùy theo nội dung, cùng điểm qua một chút update bên trong App.js :

![](https://images.viblo.asia/cdeaa32a-e758-4b00-bf30-2c46f6b307f6.png)

Kết quả trang chủ phần template index.html vẫn giữ nguyên(title, comment,...), riêng content của Component **App** đã được append bằng content của Component **Home** :

![](https://images.viblo.asia/e3a8ebfd-cd8e-486c-90fa-2a1f728d6cd3.png)

Và khi Path của chúng ta thay đổi, content của Component **App** đã được append bằng content của Component **GroupList**  :

![](https://images.viblo.asia/3a7d6849-12aa-4519-b0d9-893caa4ab188.png)

Ta rút ra được kết luận ReactJS vừa có thể support layout management, vừa có thể support path management, vừa có thể support xử lý logic thay thế cho Thymleaf(hoặc JSTL với 1 page jsp thông thường). ReactJS cũng được support một số library Component cung cấp sẵn, như ở trên ta đang sử dụng reactstrap, ngoài ra các bạn có thể tìm hiểu thêm về các thư viện khác trên google.