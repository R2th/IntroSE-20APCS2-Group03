# Giới thiệu
Ant design còn được biết đến với cái tên "Antd" là một thư việc components của reactjs. Antd là open source của công ty "Ant Design".
Các tính năng nổi bật của Ant Design:
1. Hỗ trợ tất cả các browser.
2. Phù hợp design cho phát triển web.
3. Xây dựng các components và có thể customize.
4. Một sự thay thế cho bootstrap.
# Ant Design Grid + Layout system
Antd cũng có girl system như bootstrap. “Antd” grid system với component Rows và Cols, tuy nhiên bootstrap chia ra 12 cols còn antd lại chia 24 cols điều đó có thể làm cho ui trở lên tùy biến hơn.![](https://images.viblo.asia/4fcb92b1-9bb1-48c4-902a-a4c8109b17ca.png)
```
import { Row, Col } from 'antd';

ReactDOM.render(
  <div>
    <Row>
      <Col span={12}>col-12</Col>
      <Col span={12}>col-12</Col>
    </Row>
    <Row>
      <Col span={8}>col-8</Col>
      <Col span={8}>col-8</Col>
      <Col span={8}>col-8</Col>
    </Row>
    <Row>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
    </Row>
  </div>,
  mountNode,
);
```
Không chỉ thế, girl system cũng hỗ trợ phần responsive hiển thị tốt trên tất cả các thiết bị.
```
import { Row, Col } from 'antd';

ReactDOM.render(
  <Row>
    <Col xs={2} sm={4} md={6} lg={8} xl={10}>
      Col
    </Col>
    <Col xs={20} sm={16} md={12} lg={8} xl={4}>
      Col
    </Col>
    <Col xs={2} sm={4} md={6} lg={8} xl={10}>
      Col
    </Col>
  </Row>,
  mountNode,
);
```
“Antd” Layout cung cấp cho chúng ta các components Header, Sider, Content, Footer cho việc bố trí bố cục của web trở lên dễ dàng hơn.
![](https://images.viblo.asia/402447ec-0e36-472e-ae9f-32cb9570810c.png)
```
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

ReactDOM.render(
  <div>
    <Layout>
      <Sider>Sider</Sider>
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  </div>,
  mountNode,
);
```
# Form component
Chúng ta đã biết form là một phần cần thiết của web, antd cung cấp cho bạn các component để tạo FormItems. Một vài component Input, TextArea, Checkbox, Radio, Date/TimePicker,... hay được sử dụng đẻ tạo form. "Antd" còn cung cấp cho chúng ta phần validate cho form rất tiện dụng, có thể validate theo số, chuỗi, pattern,... sử dụng validator để customize validate rất tiện lợi.
```
rules: [{ validator: this.checkNumber }]
// define method custom validate
checkNumber = (rule, value, callback) => {
    if (value >= 0) {
      callback();
      return;
    }
    callback('Number must equal or greater than zero!');
  }
```
# Feedback Component
Nếu ứng dụng của bạn có thể show các thông báo cho các hành động của người dùng. Bạn có thể dễ dàng đạt được điều này với Alert, Messages, Notification và nhiều các component khác.
![](https://images.viblo.asia/f765b655-99c5-4bc9-afc5-7e4a9c09bd26.gif)

Ant Design là một trong những thư viện UI React tốt nhất có thể so sánh với thư viện UI của Google Material cho React. Hãy đọc các tài liệu [ở đây](https://ant.design/docs/react/introduce) để tìm hiểu thêm những điều thú vị về nó.
HAPPY CODING !!!!