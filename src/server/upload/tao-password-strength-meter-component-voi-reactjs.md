### Mở đầu
Form đăng ký user là bước đầu tiên mà người dùng cần phải làm để có thể sử dụng dịch vụ của ứng dụng nào đó bắt buộc người dùng phải đăng ký trước. Khi mà form đăng ký không thân thiết có thể dẫn đến tỉ số người dùng bị giảm đi. Trong đó việc validate, popover và nhiều thứ nữa đã trở thành việc chung đang áp dụng vào hầu hết các web hiện đại hiện nay. Một form đăng ký tốt cần làm rõ rằng người dùng nhập thông tin đầy đủ và không sai, ví dụ: set password quá đơn giản. Password Strength Meter là một công cụ hỗ trợ cho người dùng thấy mức độ an toàn của mật khẩu mà người dùng đang nhập.
### Yêu cầu
Để bắt đầu xây dựng Password Strength Meter Component cần có các yêu cầu sau:
- [Create React App](https://reactjs.org/docs/create-a-new-react-app.html) là một môi trường thân thiện để phát triển ứng dụng single-page mới trong react.
- [React Bootstrap](https://react-bootstrap.github.io/getting-started/introduction/) components là tổng hợp các components để dựng các UI element giúp chúng ta để không phải tạo lại, vd: FormGroup, Panel, Progress bar, .....vv.
### Mục đích
Trong bài viết này chúng ta sẽ dựng một component với react để thực hiện việc đánh giá mức độ của mật khẩu như hình dưới.

![Great Password](https://images.viblo.asia/a018d41f-42a5-4b54-9975-251e3573c830.png)

![Bad Password](https://images.viblo.asia/8231477b-433f-42cd-8856-9b56d44fb7e6.png)

![Good Password](https://images.viblo.asia/9b5efa42-7b1e-451c-8ed0-4996f1af41b8.png)

*Password input state trong hình dựng lên với Bootstrap CSS framework.*

Như đã thầy sẽ có 3 state của strength meter UI:
- Bad password - progress bar màu đỏ và input đang trong state `red`(1/3 hoặc ít hơn nguyên tắc thỏa mãn)
- Medium password - progress bar màu vàng và input đang trong state `vàng`(1/3 đến 2/3 nguyên tắc thỏa mãn)
- Greate password - progress bar màu xanh và input đang trong state `xanh`(2/3 hoặc nhiều hơn nguyên tắc thỏa mãn)

Trước khi bắt đầu code chúng ta sẽ đánh dấu các thành phần của Password Strength Meter Component.
![](https://images.viblo.asia/4c8def5a-7187-41fc-90bb-8cec4ece8eb9.png)
### Coding
Đầu tiền tạo app với câu lệnh 
```
npx create-react-app ps-meter-app
cd ps-meter-app
npm start
```
Tiếp theo chạy 2 lệnh để cài thêm dependency
```
npm install react-bootstrap --save
npm install classnames --save
```

#### Cấu trúc folder
![](https://images.viblo.asia/9312085c-1151-4c95-8516-35d242788a8e.png)

Đầu tiên chúng ta cần tạo thư mục `components` và 3 component chính đó là `PasswordInput`, `StrengthMeter` và `PasswordField`

```
// PasswordInput.js
import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import PasswordField from './PasswordField';
import StrengthMeter from './StrengthMeter';

class PasswordInput extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col md={8}>
            <PasswordField />
          </Col>
          <Col md={4}>
            <StrengthMeter />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default PasswordInput;

// StrengthMeter.js
class StrengthMeter extends Component {
  render() { return null; }
}
export default StrengthMeter;

// PasswordField.js
class PasswordField extends Component {
  render() { return null; }
}
export default PasswordField;
```

Tiếp đến là sửa `App.js` để đưa `PasswordInput` component vào.
```
import PasswordInput from './components/PasswordInput';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="App-title">React Password Strength Meter Component</h1>
        <PasswordInput />
      </div>
    );
  }
}

export default App;
```

> Do `react-component` chỉ giúp tạo các component cơ bản của boostrap và không có stylesheet đi kèm nên phải thêm bằng tay.

```
// public/index.html
  <head>
    ...
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
  </head>
```

Tạo logic để đánh giá mức độ của mật khẩu và khởi tạo `password=''` trong `PasswordInput`
```
const SPECIAL_CHARS_REGEX = /[^A-Za-z0-9]/;
const DIGIT_REGEX = /[0-9]/;

class PasswordInput extends Component {
  static defaultProps = {
    goodPasswordPrinciples: [
      {
        label: '6+ characters',
        predicate: password => password.length >= 6
      },
      {
        label: 'with at least one digit',
        predicate: password => password.match(DIGIT_REGEX) !== null
      },
      {
        label: 'with at least one special character',
        predicate: password => password.match(SPECIAL_CHARS_REGEX) !== null
      }
    ]
  };
  constructor(props) {
    super(props);
    this.state = { password: '' };
  }
}
```

Mức độ đánh giá được trigger khi người dùng nhập mật khẩu với thuộc tính `onPasswordChange` cho input và gọi một method `changePassword` để xử lý khi password thay đổi.

```
  ...
  changePassword(password) {
    this.setState({ password });
  }
  
  render() {
    let { goodPasswordPrinciples } = this.props;
    let { password } = this.state;
    return (
      <Grid>
        <Row>
          <Col md={8}>
            <PasswordField
              password={password}
              onPasswordChange={this.changePassword}
              principles={goodPasswordPrinciples}
            />
          </Col>
          <Col md={4}>
            <StrengthMeter
              principles={goodPasswordPrinciples}
              password={password}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
```

Sau khi đã truyền thuộc tính `password` và `principles` thì sẽ định nghĩa component `PasswordField` và `StrengthMeter`
> Vì dòng code dài nên truy cập [source code](https://github.com/limkimhuor/react-ps-strength-meter/blob/master/src/components/PasswordField.js) để xem file đầy đủ
```
// PasswordField.js
render() {
    let { password } = this.props;
    return (
      <FormGroup
        controlId="formValidationWarning2"
        validationState={this.inputColor()}
      >
        <ControlLabel>Please input password</ControlLabel>
        <FormControl
          type="password"
          label="Password"
          value={password}
          onChange={this.handlePasswordChange}
        />
        <FormControl.Feedback />
      </FormGroup>
    );
  }
```
- `handlePasswordChange()` method này sẽ xử lý khi có sự thay đổi mật khẩu và truyền giá trị vừa nhập bằng props `onPasswordChange` để cho method `changePassword` ở `PasswordInput.js` xử lý set state với value mới truyền.
- `inputColor` method này tính toán dựa vào `satisfiedPercent` để trả về một class để tô màu cho input tag.
```
// StrengthMeter.js
render() {
    return (
      <Panel>
        <Panel.Body className="text-left">
          <PrinciplesProgress {...this.props} />
          <h4>A good password is:</h4>
          <PrincipleList {...this.props} />
        </Panel.Body>
      </Panel>
    );
  }
```
Trong component `StrengthMeter` tách 2 component nữa `PrinciplesProgress` và `PrincipleList` để cho mỗi component con này xử lý việc riêng trong đó có `props` của `StrengthMeter` được sao chép với `{...this.props}`.
```
// PrincipleList.js
render() {
    let { principles } = this.props;
    return (
      <ul>
        {principles.map((principle, i) => (
          <li key={i} className={this.principleClass(principle)}>
            <small>{principle.label}</small>
          </li>
        ))}
      </ul>
    );
  }
```
Như đã mô tả ở trên `PrincipleList` phụ trách về hiển thị một list quy định về mức độ của mật khẩu và `this.principleClass(principle)` để tính toán về mức độ mật khẩu, nó gọi tiếp `principleSatisfied` để tính xem mật khẩu vừa nhập có tuần theo quy định nào không trong `goodPasswordPrinciples`.
```
// PrinciplesProgress.js
render() {
    return (
      <ProgressBar
        now={this.satisfiedPercent()}
        bsStyle={this.progressColor()}
      />
    );
  }
```
`PrinciplesProgress` cho một progress bar với độ dài tính bằng method `satisfiedPercent()` và `progressColor()` để tính toán về màu của progress bar.

### Kết luận
Bài viết này đã giúp bạn hiểu về cách tạo một component để đo mức độ an toàn của mật khẩu, cách truyền thuộc tính trong react giữa state. Tùy rất đơn giản nhưng lại có thể áp dụng vào thực tế. 
Cảm ơn bạn đã đọc bài viết của minh! ![thanks](http://static.skaip.org/img/emoticons/v2/ffffff/happy.gif)

### Tài liệu tham khảo
- [Create React App](https://reactjs.org/docs/create-a-new-react-app.html)
- [React Bootstrap](https://react-bootstrap.github.io/getting-started/introduction/)
- [Components and Props](https://reactjs.org/docs/components-and-props.html)
- [Handling Events](https://reactjs.org/docs/handling-events.html)
- [React.js by example](https://reactkungfu.com/showcases/password-strength-meter/)
- [Source Code](https://github.com/limkimhuor/react-ps-strength-meter)