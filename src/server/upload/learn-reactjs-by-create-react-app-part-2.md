Tiếp tục [phần 1](https://viblo.asia/p/learn-reactjs-by-create-react-app-part-1-924lJpLaKPM) của bài viết **Learn ReactJS By Create React App**, hôm nay mình xin giới thiệu các thành phần nòng cốt không thể thiếu trong reactjs đó là: **component, props, và state**.
### React Components
**Components** thực chất là các đoạn code độc lập và có thể tái sử dụng. Chúng phục vụ cùng mục đích như các hàm **JavaScript**, nhưng hoạt động độc lập và trả về HTML thông qua hàm **render**.

Components có hai loại, Class components và Function components, Ở bài này chúng ta sẽ tập trung vào Class components.
#### Create a Class Component
Khi tạo một component, tên của nó phải bắt đầu bằng chữ in hoa.

Component này phải bao gồm câu lệnh `extends React.Component`, câu lệnh này tạo ra sự kế thừa cho React.Component và cho phép component của bạn truy cập vào các chức năng của React.Component.

Component  này cũng yêu cầu bắt buộc phải có phương thức **render ()**, phương thức này trả về **HTML**.
<br>EX: Tạo một Class component có tên là Car
``` ruby
## myapp/scr/index.js 

import React from 'react';
import ReactDOM from 'react-dom';

# Tạo một component Car 
class Car extends React.Component {
  render() {
    return <h2>Hi, I am a Car!</h2>;
  }
}
# Để sử dụng component này trong ứng dụng của chúng ta, hãy sử dụng cú pháp tương tự như HTML thông thường: <Car />
ReactDOM.render(<Car />, document.getElementById('root'));

## myapp/public/index.html

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport"
      content="width=device-width, initial-scale=1" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```
#### Component Constructor

Nếu có hàm **constructor ()** trong component, hàm này sẽ được gọi khi component được khởi tạo.
Hàm constructor là nơi chúng ta khởi tạo các thuộc tính(properties) của component.
Trong React, properties nên được giữ trong một đối tượng được gọi là **state**.
Chúng ta sẽ tìm hiểu nó sau.

Hàm **constructor ()** cũng là nơi chúng ta  kế thừa **parent component**  bằng cách bao gồm câu lệnh **super ()**, thực thi hàm constructor của parent component và component của chúng ta có quyền truy cập vào tất cả các function của parent component (React.Component).
<br>EX:
``` ruby
class Car extends React.Component {
  constructor() {
    super();
    this.state = {color: "red"};
  }
  render() {
    return <h2>I am a {this.state.color} Car!</h2>;
  }
}
```
### React Props
**Props** là các đối số được truyền vào các React components.
Props được truyền cho các component thông qua các thuộc tính HTML.
#### React Props
React props giống như các đối số chức năng trong JavaScript và các thuộc tính trong HTML.
Để gửi props vào một component, hãy sử dụng cú pháp giống như các thuộc tính HTML:
<br>EX: 
``` ruby 
import React from 'react';
import ReactDOM from 'react-dom';

class Car extends React.Component {
  render() {
    return <h2>I am a {this.props.brand}!</h2>
  }
}

const myelement = <Car brand="Ford" />;

ReactDOM.render(myelement, document.getElementById('root'));
# result: I am a Ford!
```
#### Pass data 
Props cũng là cách chúng ta truyền dữ liệu từ component này sang component khác, dưới dạng tham số.
``` ruby 
# Gửi thuộc tính "brand" từ component Garage đến component Car:
import React from 'react';
import ReactDOM from 'react-dom';

class Car extends React.Component {
  render() {
    return <h2>I am a {this.props.brand}!</h2>;
  }
}

class Garage extends React.Component {
  render() {
    return (
      <div>
      <h1>Who lives in my Garage?</h1>
      <Car brand="Ford" />
      </div>
    );
  }
}

ReactDOM.render(<Garage />, document.getElementById('root'));
```
Nếu ta có một biến hoặc một object để gửi và không phải là một chuỗi như trong ví dụ trên, ta chỉ cần đặt tên biến hoặc object trong dấu ngoặc nhọn:
``` ruby 
# Biến
class Car extends React.Component {
  render() {
    return <h2>I am a {this.props.brand}!</h2>;
  }
}

class Garage extends React.Component {
  render() {
    const carname = "Ford";
    return (
      <div>
      <h1>Who lives in my garage?</h1>
      <Car brand={carname} />
      </div>
    );
  }
}

ReactDOM.render(<Garage />, document.getElementById('root'));

# Object
class Car extends React.Component {
  render() {
    return <h2>I am a {this.props.brand.model}!</h2>;
  }
}

class Garage extends React.Component {
  render() {
    const carinfo = {name: "Ford", model: "Mustang"};
    return (
      <div>
      <h1>Who lives in my garage?</h1>
      <Car brand={carinfo} />
      </div>
    );
  }
}

ReactDOM.render(<Garage />, document.getElementById('root'));
```
#### Props in the Constructor
Nếu component của ta có hàm Constructor(), props phải luôn được truyền cho hàm constructor và cả React.Component thông qua phương thức **super** ().
``` ruby 
class Car extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h2>I am a Car!</h2>;
  }
}

ReactDOM.render(<Car model="Mustang"/>, document.getElementById('root'));
```

> **Note**: React Props are read-only! You will get an error if you try to change their value.
### React State
React components có một đối tượng **state** tích hợp.
Đối tượng **state** là nơi ta lưu trữ các giá trị thuộc tính thuộc về state.

Khi đối tượng state thay đổi, components sẽ được **re-render.**
#### Creating the state Object
Đối tượng state được khởi tạo trong hàm contructor:
``` ruby 
class Car extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964
    };
  }
  render() {
    return (
      <div>
        <h1>My Car</h1>
      </div>
    );
  }
}
```

#### Using the state Object
Refer đối tượng state ở bất kỳ đâu trong component bằng cách sử dụng cú pháp **this.state.propertyname:**
``` ruby
# Refer to the state object in the render() method:
class Car extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964
    };
  }
  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          It is a {this.state.color}
          {this.state.model}
          from {this.state.year}.
        </p>
      </div>
    );
  }
}
```
#### Changing the state Object
Để thay đổi một giá trị trong đối tượng **state**, sử dụng phương thức **this.setState ().**

Khi một giá trị trong đối tượng **state** thay đổi, component sẽ re-render, nghĩa là đầu ra sẽ thay đổi theo (các) giá trị mới.
``` ruby
class Car extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964
    };
  }
  changeColor = () => {
    this.setState({color: "blue"});
  }
  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          It is a {this.state.color}
          {this.state.model}
          from {this.state.year}.
        </p>
        <button
          type="button"
          onClick={this.changeColor}
        >Change color</button>
      </div>
    );
  }
}
```
###
Trên đó là phần giới thiệu sơ lượt để ta có thể có cái nhìn tổng quát về các thành phần quan trọng bật nhất trong reactjs, hy vọng có thể giúp mọi người phần nào trong quá trình tìm hiểu reactjs :)