> Tiếp nối series về kinh nghiệm khi làm việc với React Native. Hôm nay các bạn cùng mình tiếp tục cùng nhau nói về các vấn đề thường gặp trong quá trình phát triển một ứng dụng React Native nhé :D , bài viết này là phần tiếp theo của: https://viblo.asia/p/mot-so-van-de-thuong-gap-trong-qua-trinh-phat-trien-ung-dung-react-native-phan-1-WAyK8QbWZxX
> 


-----


# VI. Sử dụng Store:
Khi thiết kế ứng dụng, chúng ta thường tập trung quá nhiều về phần layout và ít chú ý đến việc xử lý dữ liệu.

Redux giúp chúng ta lưu trữ dữ liệu một cách chính xác. Nếu thiết kế redux store một cách chính xác - nó sẽ là một công cụ rất tuyệt để quản lý dữ liệu của ứng dụng. Ngược lại, nó sẽ làm mọi thứ rối tung lên nếu dùng sai cách.

Khi mình bắt đầu phát triển ứng dụng RN, mình đã từng nghĩ các reducers là mỗi kho chứa dữ liệu với mỗi container. Khi đó, nếu bạn có các màn Sign In, Forgot Password, ToDo list thì sẽ có các reducers tương ứng.

Sau khi làm việc với cách thiết kế store theo lối này, mình nhận ra nó không quá dễ để quản lý dữ liệu. Mình có một màn ToDo details, và khi sử dụng theo cách này mình sẽ cần tạo thêm một reducer ToDoDetails, đây là một sai lầm khá phổ biến! Tại sao ư:

Khi mình chọn item từ ToDo list - cần truyền dữ liệu vào reducer ToDoDetails. Nghĩa là phải sử dụng thêm action để gửi dữ liệu vào reducer - rất bất tiện.

Sau khi nghiên cứu một chút, mình quyết định thiết kế store như sau:
1. Auth
1. Todos
1. Friends

Auth được dùng để lưu authorization token.

Todos và Friends được dùng để lưu trữ các dữ liệu ứng với tên của chúng. Khi vào màn ToDo Details - mình sẽ lấy dữ liệu qua id của chúng.
 
# VII. Sai cấu trúc Container:
Mình có component như sau:
```javascript
import React, { Component } from ‘react’;
import {
  Text,
  TextInput,
  View,
  TouchableOpacity
} from ‘react-native’;
import styles from ‘./styles.ios’;
export default class SomeContainer extends Component {
  constructor(props){
      super(props);
      this.state = {
          username:null
      }
  }
  _usernameChanged(event){
      this.setState({
          username:event.nativeEvent.text
      });
   }
  _submit(){
      if(this.state.username){
          console.log(`Hello, ${this.state.username}!`);
      }
      else{
          console.log(‘Nhập user name’);
      }
   }
   render() {
       return (
           <View style={styles.container}>
               <View style={styles.avatarBlock}>
                   <Image
                       source={this.props.image}
                       style={styles.avatar}/>
               </View>
               <View style={styles.form}>
                   <View style={styles.formItem}>
                       <Text>
                           Username
                       </Text>
                       <TextInput
                        onChange={this._usernameChanged.bind(this)}
                        value={this.state.username} />
                   </View>
               </View>
               <TouchableOpacity onPress={this._submit.bind(this)}>
                   <View style={styles.btn}>
                       <Text style={styles.btnText}>
                           Submit
                       </Text>
                   </View>
               </TouchableOpacity>
           </View>
       );
   }
}
```

Trong đoạn code trên, chúng ta có thể thấy tất cả các styles được đặt trong một file. Không có code bị trùng lặp. Nhưng hầu như lúc nào chúng ta cũng tái sử dụng các field trong một form. Button được bao trong TouchableOpacity cũng có thể được tách ra - để có thể dùng lại sau này. Image cũng có thể được tách ra để dùng lại, vì thế chúng ta có thể tách làm các component riêng biệt.

Dưới đây là đoạn code sau khi đã thực hiện các bước trên:
```javascript
import React, { Component, PropTypes } from 'react';
import {
   Text,
   TextInput,
   View,
   TouchableOpacity
} from 'react-native';
import styles from './styles.ios';

class Avatar extends Component{
   constructor(props){
       super(props);
   }
   render(){
       if(this.props.imgSrc){
           return(
               <View style={styles.avatarBlock}>
                   <Image
                       source={this.props.imgSrc}
                       style={styles.avatar}/>
               </View>
            )
        }
        return null;
   }
}
Avatar.propTypes = {
   imgSrc: PropTypes.object
}

class FormItem extends Component{
   constructor(props){
       super(props);
   }
   render(){
       let title = this.props.title;
       return(
           <View style={styles.formItem}>
               <Text>
                   {title}
              </Text>
              <TextInput
                  onChange={this.props.onChange}
                  value={this.props.value} />
           </View>
       )
   }
}
FormItem.propTypes = {
   title: PropTypes.string,
   value: PropTypes.string,
   onChange: PropTypes.func.isRequired
}

class Button extends Component{
   constructor(props){
       super(props);
   }
   render(){
       let title = this.props.title;
       return(
           <TouchableOpacity onPress={this.props.onPress}>
               <View style={styles.btn}>
                   <Text style={styles.btnText}>
                       {title}
                   </Text>
               </View>
           </TouchableOpacity>
       )
   }
}
Button.propTypes = {
   title: PropTypes.string,
   onPress: PropTypes.func.isRequired
}
export default class SomeContainer extends Component {
   constructor(props){
       super(props);
       this.state = {
           username:null
       }
   }
   _usernameChanged(event){
       this.setState({
           username:event.nativeEvent.text
       });
   }
   _submit(){
       if(this.state.username){
           console.log(`Hello, ${this.state.username}!`);
       }
       else{
           console.log('Nhập user name');
       }
   }
   render() {
       return (
           <View style={styles.container}>
               <Avatar imgSrc={this.props.image} />
               <View style={styles.form}>
                   <FormItem
                     title={"Username"}
                     value={this.state.username}
                     onChange={this._usernameChanged.bind(this)}/>
               </View>
               <Button
                   title={"Submit"}
                   onPress={this._submit.bind(this)}/>
           </View>
       );
   }
}

```

Bạn có thể thấy, có thể cần nhiều code hơn sau khi thực hiện việc này - bởi vì mình vừa tách chúng ra, nhưng bây giờ chúng có thể được tái sử dụng tất cả nếu cần thiết. 

Nhưng cũng đừng qúa cố gắng tách quá nhỏ các component vì sẽ rất khó để đọc. Kể cả đối với các task cần thêm các props mới để dễ dàng xử lý, điều này sẽ khiến cho code rất khó đọc trong tương lai.

Cùng xem xét thêm component sau:
```javascript
class Button extends Component{
   constructor(props){
       super(props);
   }
   _setTitle(){
       const { id } = this.props;
       switch(id){
           case 0:
               return 'Submit';
           case 1:
               return 'Draft';
           case 2:
               return 'Delete';
           default:
               return 'Submit';
        }
   }
   render(){
       let title = this._setTitle();
       return(
           <TouchableOpacity onPress={this.props.onPress}>
               <View style={styles.btn}>
                   <Text style={styles.btnText}>
                       {title}
                   </Text>
              </View>
          </TouchableOpacity>
       )
   }
}
Button.propTypes = {
   id: PropTypes.number,
   onPress: PropTypes.func.isRequired
}
export default class SomeContainer extends Component {
   constructor(props){
       super(props);
       this.state = {
           username:null
       }
   }
   _submit(){
       if(this.state.username){
           console.log(`Hello, ${this.state.username}!`);
       }
       else{
           console.log('Nhập user name');
       }
   }
   render() {
       return (
           <View style={styles.container}>
               <Button
                   id={0}
                   onPress={this._submit.bind(this)}/>
           </View>
       );
   }
}
```

Chúng ta đã nâng cấp component Button, thay thế title bằng id để có thể thay đổi title tuỳ toàn cảnh sử dụng. 

# VIII. Không đọc code của các thư viện:
Có rất nhiều các thư viện hỗ trợ, vừa nhanh vừa gọn, nhưng nhiều khi chúng ta không đọc kỹ hướng dẫn và sử dụng chúng bừa bãi, thỉnh thoảng, các thư viện có thể bị lỗi ở một số chỗ. Cũng có thể chúng không hoạt động như được mô tả. Đó là lý do vì sao bạn cần đọc code. Bạn sẽ hiểu được lý do tại sao nó sai. Và bạn cũng có thể học được cách tạo thư viện cho riêng mình.

# IX. Kết luận:
React Native thật tuyệt vời. Bạn có thể làm hầu hết mọi thứ với nó. Hoặc nếu không, bạn có thể làm bằng Swift/Objective C hoặc Java và sau đó kết nối với React Native.

Một cộng đồng lớn, rất nhiều giải pháp, các components,... chắn chắn bạn sẽ gặp phải những sai lầm, nhưng không sao! Mình hy vọng bài viết này sẽ giúp được nhiều bạn tránh được những sai lầm khi phát triển ứng dụng React Native.  

Cảm ơn các bạn đã theo dõi bài viết đến tận đây, hãy để lại ý kiến, quan điểm của các bạn bằng cách comment vào bên dưới bài viết này nhé :D