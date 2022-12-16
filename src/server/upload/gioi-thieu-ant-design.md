## Giới thiệu
Đối với các bạn lập trình web nói chung, hầu hết mọi người đã từng nghe qua [bootstrap](https://getbootstrap.com/).

> Bootstrap là 1 framework HTML, CSS, và JavaScript cho phép người dùng dễ dàng thiết kế website theo 1 chuẩn nhất định, tạo các website thân thiện với các thiết bị cầm tay như mobile, ipad, tablet,...

<br/><br/>
Bài viết này mình sẽ không nói về `boostrap` mà mình sẽ giới thiệu tới mọi người một `thư viện` khá là mới và được nhắc đến khá là nhiều trong khoảng thời gian gần đây. Đó là `ant design`:

<div align="center">

![](https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg)
### [Ant Design](https://ant.design/)

A design system with values of Nature and Determinacy for better user experience of enterprise applications

</div>
<br/><br/>
Với `Ant` bạn có thể tạo nhanh cho mình một trang `landing page` dựa theo `template` được cung cấp sẵn. `Ant` cũng có các thư viện giành riêng cho các ngôn ngữ như `React`, `Vue` hay `Angular`.

Dưới đây mình sẽ giới thiệu về `Ant design với React` (official implementation)

## Ant Design và React
https://ant.design/docs/react/introduce

### Tổng quan
`Ant` là tập hợp các components của React được xây dựng theo chuẩn thiết kế của Ant UED Team. Tương tự như chuẩn Material Design, Ant cung cấp hầu hết các component thông dụng trong ứng dụng web hiện đại, như Layout, Button, Icon, DatePicket, v.v…Bên cạnh đó Ant cũng có những component riêng thú vị, như LocaleProvider cho phép bạn thay đổi ngôn ngữ trên toàn ứng dụng.
<br/><br/>
Ant hiện đang có hơn 25k star trên Github.
<br/><br/>
Có thể coi `Ant Design cho React` là tập hợp của hầu hết các thư viện về React. Nó đáp ứng được hầu hết các yêu cầu của project của bạn mà ban không phải cài thêm bất cứ thư viện nào nữa. Dưới đây là danh sách các `component` mà nó cung cấp:

- General: Button, Icon
- Layout: Grid, Layout
- Navigation: Affix, Breadcrumb, Dropdown, Menu, Pagination, Steps
- Data Entry: AutoComplete, Checkbox, Cascader, DatePicker, Form, InputNumber, Input, Mention, Rate, Radio, Switch, Slider, Select, TreeSelect, Transfer, TimePicker, Upload
- Data Display: Avatar, Badge, Collapse, Carousel, Card, Calendar, List, Popover, Tree, Tooltip, Timeline, Tag, Tabs, Table
- Feedback: Alert, Drawer, Modal, Message, Notification, Progress, Popconfirm, Spin, Skeleton
- Other: Anchor, BackTop, Divider, LocaleProvider

### Cài đặt
Sử dụng `npm` hoặc `yarn`
```sh
npm install antd --save

# or

yarn add antd

```

### Sử dụng
Bạn chỉ cần `import` nó vào và sử dụng như các component trong React. Dưới đây là ví dụ sử dụng `Layout` component của `antd`:

```jsx
import { Layout, Menu, Icon } from 'antd';

const { Header, Sider, Content } = Layout;

class SiderDemo extends React.Component {
    state = { collapsed: false };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Icon type="user" />
                            <span>nav 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="video-camera" />
                            <span>nav 2</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="upload" />
                            <span>nav 3</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                        Content
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

ReactDOM.render(<SiderDemo />, mountNode);
```

{@embed: https://codepen.io/doanh/pen/aQGKVJ?editors=0010#0}