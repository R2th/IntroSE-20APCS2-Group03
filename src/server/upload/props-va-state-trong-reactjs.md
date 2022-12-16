Thành phần cơ  bản của ReactJS là component. Component cho phép chúng ta chia nhỏ các thành phần UI độc lập mục đích để dễ quản lý và tái sử dụng nó. ReactJS kiểm soát luồng dữ liệu thông qua props và state. Dữ liệu trong states và props được sử dụng để render ra các component với dữ liệu động (dynamic dữ liệu). Vì vậy chúng ta cùng tìm hiểu xem props và state có chức năng gì và sử dụng như thế nào nhé?
# 1. Props
* Chúng ta sử dụng props để gửi dữ liệu đến component.
* Mọi component được coi là một hàm javascript thuần khiết (Pure Function).
* Trong ReactJS, props tương đương với các tham số của hàm javascript thuần khiết.
* Props là bất biến (không thể thay đổi được). Bởi vì điều này được phát triển trong khái niệm về các hàm thuần khiết. Trong các hàm thuần khiết, chúng ta không thể thay đổi dữ liệu của các tham số. Vì vậy, cũng không thể thay đổi dữ liệu của prop trong ReactJS.
* Một hàm component cơ bản trong ReactJS
```javascript
    import React from "react";
    const Profile = (props) => {
     // props.img_url = 'http://via.placeholder.com/350x150'
     const style = {
         padding: '10px',
         border: '1px solid green',
         display: 'block',
         marginLeft: 'auto',
         marginRight: 'auto',
         width: '50%',
         color: '#4db1e8',
         textAlign: 'center',
         fontFamily: 'sans-serif'
     }
     return (
         <div style={style}>
             <img src={props.logo_url} height="250px"/>
             <h1>{props.title}</h1>
         </div>
     );
    }
    module.exports = Profile;
```
* Một lớp component cơ bản trong ReactJS
```javascript
    import React from "react";
    class Profile extends React.Component {
     render(){
         // this.props.img_url = 'http://via.placeholder.com/350x150'
         const style = {
             padding: '10px',
             border: '1px solid green',
             display: 'block',
             marginLeft: 'auto',
             marginRight: 'auto',
             width: '50%',
             color: '#4db1e8',
             textAlign: 'center',
             fontFamily: 'sans-serif'
         }
         return (
             <div style={style}>
               <img src={this.props.logo_url} height="250px"/>
               <h1>{this.props.title}</h1>
             </div>
         );
     }
    }
    module.exports = Profile;
```
* Import và sử dụng một trong các component ReactJS ở trên như bên dưới
```javascript
    import React from "react";
    import ReactDOM from "react-dom";
    import Profile from "./components/Profile"
    ReactDOM.render(
     <Profile 
         logo_url="https://books.agiliq.com/projects/django-design-patterns/en/latest/_static/logo.png"
         title="Mobile App, Web App and API Development and More"/>,
     document.getElementById("main")
);
```
* Chúng ta không cần sử dụng `this` cho các hàm component cơ bản để truy cập props nhưng chúng ta phải sử dụng `this` để truy cập props `this.props.<prop_name>`.
# 2. State
* State giống như một kho lưu trữ dữ liệu cho các component trong ReactJS. Nó chủ yếu được sử dụng để cập nhật component khi người dùng thực hiện một số hành động như nhấp vào nút, nhập một số văn bản, nhấn một số phím, v.v.
* `React.Component` là lớp cơ sở cho tất cả các lớp component cơ bản khác trong ReactJS. Bất cứ khi nào một lớp kế thừa lớp React.Component, hàm tạo (Constructor) của nó sẽ tự động gán thuộc tính `state` cho lớp với giá trị ban đầu được gán bằng null. Chúng ta có thể thay đổi nó bằng cách ghi đè hàm tạo  (Constructor).
* Trong nhiều trường hợp chúng ta cần cập nhật `state `. Để làm điều đó, chúng ta phải sử dụng phương thức `setState` và chúng ta không thể gán trực tiếp như thế này `this.state = {'key': 'value'}`.
* Hãy cố gắng thử sử dụng khái niệm `state` trong component của chúng ta bằng cách thay đổi một ít mã code trong component ở trên mà chúng ta đã tạo.
```javascript
    class Profile extends React.Component {
      constructor(props){
          super(props)
          this.state = {"show_technologies": false}
          this.see_our_technologies = this.see_our_technologies.bind(this);
      }
      see_our_technologies(){
          this.setState({"show_technologies": true})
      }
      render(){
          console.log(this.state)
          const style = {
              padding: '10px',
              border: '1px solid green',
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '50%',
              color: '#4db1e8',
              textAlign: 'center',
              fontFamily: 'sans-serif'
          }
          const tech = {
              background: '#4db1e8',
              color: '#fff',
              padding: '5px',
              marginRight: '5px'
          }
          return (
              <div style={style}>
                  <img src={this.props.img_url} height="250px"/>
                  <h1>{this.props.title}</h1>
                  {this.state.show_technologies ?
                      <p>
                          <span style={tech}>Python</span>
                          <span style={tech}>Django</span>
                          <span style={tech}>Django REST</span>
                          <span style={tech}>ReactJS</span>
                          <span style={tech}>Angular</span>
                          <span style={tech}> and More</span>
                      </p>
                      :
                      <button onClick={this.see_our_technologies}>Click to see Our Technologies</button>
                  }
              </div>
          );
      }
}
module.exports = Profile;
```
* Sau khi cập nhật component cùng với đoạn mã trên thì Ui người dùng cập nhật thêm một nút button. Khi click vào button chúng ta sẽ thấy một nội dung được hiển thị.
* Trong đoạn mã trên chúng ta đã ghi đè hàm tạo (Constructor) và thiết lập giá trị state ban đầu:  `show_technologies`bằng `false`. Trong khi rendering ra component React sẽ kiểm tra giá trị `show_technologies` và nếu nó thiết lập giá trị là `false` thì React chỉ render ra nút button. Chúng ta sẽ liên kết sự kiện khi Click vào nút button. Bất cứ khi nào người dùng Click vào nút button `state` sẽ thay đổi thành: `{"show_technologies": true}` bằng cách sử dụng phương thức `setState`.
* Bây giờ, `state` đã được thay đổi, react sẽ render lại component với những thay đổi đó. Bất cứ khi nào `state` được cập nhật trong component, tất cả các component con của nó cũng sẽ render/show  lại với những thay đổi mới nhất.
* Đây là cách mà React xử lý `state`.
# 3. Kết luận
Hi vọng bài viết này sẽ giúp các bạn hiểu thêm về props và state. Cảm ơn các bạn đã theo dõi. Trong bài viết có tham khảo tại
https://www.agiliq.com/blog/2018/05/understanding-react-state-and-props/