# React-Select
## Giới thiệu
Link github: https://github.com/JedWatson/react-select
 Đối với một ứng dụng thì chức năng select hay search là những chức năng mà gần như ứng dụng nào cũng có . Tùy vào yêu cầu của ứng dụng mà chức năng này có thể phức tạp hoặc ở mức basic .Với việc sử dụng "react-select" bạn có thể xây dựng chức năng select, search cho ứng dụng của mình một cách nhanh chóng với nhiều options khác nhau . Hiện tại "react-select" có hơn 13.000 star trên github .
## Demo
  - install react-select
   
   ```
     yarn add react-select
   ```
 
 -  Sử dụng trong ứng dụng
 
 ```
 import React from 'react';
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

class App extends React.Component {
  state = {
    selectedOption: null,
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }
  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
    );
  }
}
 ```
 
 React-select cung cấp các option để bạn có thể custom lại cho ứng dụng của mình
 - autoFocus - focus the control when it mounts
 - className - apply a className to the control
 - isDisabled - disable the control
 - isMulti - allow the user to select multiple values
 - isSearchable - allow the user to search for matching options
 - name - generate an HTML input with this name, containing the current value
 ...
 ![](https://images.viblo.asia/892de18b-037b-4565-8e23-1a9c19b04055.png)
 ![](https://images.viblo.asia/8010cd4b-7c72-4b49-9dae-ba73d3bb7a09.png)
 
 # React-intl
 ## Giới thiệu
   React-intl là thư viện của Reactjs . Nó cung cấp các component và một API để định dạng ngày, tháng, số và chuỗi, bao gồm cả xử lý chuyển đổi, xứ lý văn bản một cách đa dạng.
   Hỗ trợ chuyển đổi ngôn ngữ dễ dàng
 ## Demo
 - install react-intl 
 ```
   npm install react-intl
 ```
 - Sử dụng trong ứng dụng
 ```
   import { FormattedMessage, injectIntl } from 'react-intl';
   class App extends Component {
     constructor(props) {
       super(props);
       this.submitLogin = this.submitLogin.bind(this);
      }
     render() {
     const { formatMessage } = this.props.intl;
   
     <Col xs="6" className="text-right">
       <Button color="link" className="px-0"><FormattedMessage id='login.bt_forgot_pass' /></Button>
     </Col>
    }  
   }
   export default injectIntl(App);
 ```
 # Reactstrap
 ## Giới thiệu
 reacstrap là một thư viện hỗ trợ việc phát triển layout cho những ứng dụng reactjs ! với những component được xây dựng sẵn sẽ giúp cho bạn tối ưu code cũng như tốc độ khi phát triển ứng   dụng react. Reactstrap sử dụng Bootstrap 4
 Reactstrap hỗ trợ rất nhiều component 
  
-  Tables
-  Buttons
-  Collapse
-  Modals 
-  ...
## Demo
  - instal reactstrap

  ```
    npm install --save reactstrap react react-dom
  ```
  
  - Sử dụng trong ứng dụng 
  + Xây dụng table 
  
  ```
import React from 'react';
import { Table } from 'reactstrap';

export default class Example extends React.Component {
  render() {
    return (
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}
  ```
  ![](https://images.viblo.asia/85abca2d-2960-4ef7-81e4-37dc7ad3de66.png)
  
  + Tạo các alert thông báo 

```
import React from 'react';
import { Alert } from 'reactstrap';

const Example = (props) => {
  return (
    <div>
      <Alert color="primary">
        This is a primary alert — check it out!
      </Alert>
      <Alert color="secondary">
        This is a secondary alert — check it out!
      </Alert>
      <Alert color="success">
        This is a success alert — check it out!
      </Alert>
      <Alert color="danger">
        This is a danger alert — check it out!
      </Alert>
    </div>
  );
};
  ```
  ![](https://images.viblo.asia/c9f987bb-28dc-4ae1-ab05-7a77582c5aa2.png)