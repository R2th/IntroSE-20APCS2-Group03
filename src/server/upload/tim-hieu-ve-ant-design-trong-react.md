# I. Ant-desgin là gì ? 
Ant là tập hợp các components của React được xây dựng theo chuẩn thiết kế của Ant UED Team. Tương tự như chuẩn Material Design, Ant cung cấp hầu hết các component thông dụng trong ứng dụng web hiện đại, như Layout, Button, Icon, DatePicket, v.v…Bên cạnh đó Ant cũng có những component riêng thú vị, như LocaleProvider cho phép bạn thay đổi ngôn ngữ trên toàn ứng dụng.

Ant hiện đang có hơn 51k star trên Github.

Có thể coi Ant Design cho React là tập hợp của hầu hết các thư viện về React. Nó đáp ứng được hầu hết các yêu cầu của project của bạn mà ban không phải cài thêm bất cứ thư viện nào nữa. Dưới đây là danh sách các component mà nó cung cấp:

- General: Button, Icon
- Layout: Grid, Layout
- Navigation: Affix, Breadcrumb, Dropdown, Menu, Pagination, Steps
- Data Entry: AutoComplete, Checkbox, Cascader, DatePicker, Form, InputNumber, Input, Mention, Rate, Radio, Switch, Slider, Select, TreeSelect, Transfer, TimePicker, Upload
- Data Display: Avatar, Badge, Collapse, Carousel, Card, Calendar, List, Popover, Tree, Tooltip, Timeline, Tag, Tabs, Table
- Feedback: Alert, Drawer, Modal, Message, Notification, Progress, Popconfirm, Spin, Skeleton
- Other: Anchor, BackTop, Divider, LocaleProvider

## Cài đặt 
- Sử dụng npm hoặc yarn
```
npm install antd --save
yarn add antd
```

# Sử dụng 
Bạn chỉ cần import nó vào và sử dụng như các component trong React. Dưới đây là ví dụ sử dụng Layout component của antd:

- Component ***Menu***

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;

class Sider extends React.Component {
  handleClick = e => {
    console.log('click ', e);
  };

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="mail" />
              <span>Navigation One</span>
            </span>
          }
        >
          <Menu.ItemGroup key="g1" title="Item 1">
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="g2" title="Item 2">
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="appstore" />
              <span>Navigation Two</span>
            </span>
          }
        >
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu
          key="sub4"
          title={
            <span>
              <Icon type="setting" />
              <span>Navigation Three</span>
            </span>
          }
        >
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

ReactDOM.render(<Sider />, document.getElementById('container'));
          
```

- Kết quả sẽ hiển thị như sau: 
![](https://images.viblo.asia/80621482-842f-4fc5-be64-4ed86f129b37.png)

- Component  ***Panigation***

```javascript
import { Pagination } from 'antd';
ReactDOM.render(<Pagination defaultCurrent={1} total={50} />, mountNode);
```

- Kết quả sẽ hiển thị như sau: 
![](https://images.viblo.asia/c65d4a32-7101-48a5-b07d-1d66d59afc0d.png)

# Kết bài 
- Thông qua 2 ví dụ mình về component , mình hi vọng rằng giúp các bạn giải quyết những vấn đề về style trong React , cài đặt và sử dụng nó một cách dễ dàng trong dự án của mình và từ đó áp dụng và dự án của mình một cách có hiệu quả.

# Tài liệu tham khảo 
Link :  https://ant.design/