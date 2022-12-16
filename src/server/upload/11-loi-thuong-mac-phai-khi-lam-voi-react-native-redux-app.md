Bài viết này là tình cờ trong khi mình đang lướt trên trang [Medium](https://medium.com/) thì đọc được, theo mình cảm thấy bài viết này của tác giả khá hay nên xin phép được dịch sang để mọi người tham khảo thêm nếu đã từng mắc phải, cá nhân mình cũng đã từng mắc những lỗi này =))

Sau một thời gian làm việc với React Native thì anh [Valentyn Halkin](https://medium.com/@galikvalkin)
 đã đúc kết ra được những lỗi mà các beginer thường gặp phải khi mới bắt đầu với React Native 
 
 # 1. Wrong estimate
 Anh đưa ra estimate cho một app RN là hoàn toàn sai =))), cái này mình hiểu vì với React native bỗng một ngày đẹp trời bạn sẽ không biết tại sao lại có bug ở đâu ra trong khi ngày hôm qua đẩy pull nên check đi check lại vẫn chạy ngon lành =)))
 
- Bạn cần estimate riêng cho phiên bản iOS và Android! React Native có lợi thế là code được cả iOS và Android, nhưng không có gì hoàn hảo cả, iOS và android đều có nét đặc trưng riêng vậy nên UI 2 nền tảng đôi khi sẽ không thể giống nhau mà bạn cần custom riêng cho mỗi nền tảng 
-  Nên est qua form, như vậy bạn sẽ có nhìn thấy bố cục tổng quan hơn 
-  Nếu app có phía backend là web, bạn cần hiểu và đảm bảo các endpoint làm việc hoàn hảo, gửi qua phía backend chính xác.  Hiểu cấu trúc của DB, cách các thực thể được kết nối, v.v. Nếu hiểu nó, bạn có thể làm việc với redux hiệu quả

# 2. Trying to use already built components (buttons, footers, headers, inputs, texts)

Với các component mặc định đã có sẵn trong React, và React Native, anh ta khuyên dùng nếu như ta không có thiết kế đặc biệt nào đó mà component có sẵn đã hỗ trợ đầy đủ rồi, nhưng cũng khuyên các bạn nên tự custom lại theo project của mình nếu có thiết kế đặc biệt nào đó, và đặc biệt là bạn sẽ không cần phụ thuộc vào nó không sợ khi RN thay đổi version và component cũng sẽ ảnh hưởng theo

# 3. Not separating layout for iOS and Android
- Điểm này chỉ hữu ích nếu ta có bố cục khác nhau cho các phiên bản iOS và Android. Nếu không bạn có thể sử dụng Platform do RN cung cấp để thực hiện tùy thuộc vào nền tảng thiết bị.

- Nếu bố cục hoàn toàn khác nhau nên bố trí riêng.
-  `If you name a file like index.ios.js — when assembling build for iOS RN will use this file to display iOS layout. The same story is for index.android.js`

Cái này là với version 0.4x.x của react native rồi khi mà RN còn tách 2 file index ra. Nhưng cũng có phần đúng, ví dụ như làm việc với video trong RN bạn nên tách ra 2 file riêng nhau ra là `video.ios.js` và `video.android.js` vì như ở trên mình nói mỗi nền tảng đều có nét đặc trưng riêng của nhau.

# 4. Wrong redux store planning.
**A big mistake!**

 Khi bạn đang có dự định cho app của bạn, bạn thường tập trung vào mảng giao diện, nhưng đừng quên phần xử lý dữ liệu

 Redux giúp cho chúng ta lưu trữ dữ liệu một cách chính xác hơn, nếu bạn lên plan một cách chính xác hoặc chính redux sẽ làm cho bạn rối lung mọi thứ lên.

Khi Valentyn bắt đầu với một ứng dụng, anh ta đã nghĩ về redux như một bộ lưu trữ dữ liệu cho mỗi container. Vì vậy, nếu như app của chúng ta mà có Login, Forgot password, ToDo cũng nên có các reducer tương ứng.

Sau khi làm việc một chút store, anh ta phát hiện ra rằng trong trường hợp của mình, việc quản lý dữ liệu không dễ dàng như vậy. Anh ta cảm thấy không thoải mái khi chuyển từ screen Todo qua TodoDetails, anh ta cảm thấy không thoải mái khi truyền dữ liệu từ các action tới reducer? (mình cũng chưa hiểu đoạn này lắm)

Và sau khi thực hiện một nghiên cứu nhỏ này, Valentyn đưa  cấu trúc như thế này:

- Auth
- Todos
- Friends


    Auth sẽ được dùng để lưu lại token, reducer Todos và Friends được sử dụng để lưu các entities. Và khi Valentyn muốn đi tới screen Todos detail and ta chỉ cần tìm thông qua các id của todo.

Quản lý app trên redux luôn luôn là lựa chọn hàng đầu với mình trừ phi app của bạn rất nhỏ hoặc app chủ yếu là webview còn không mình khuyên các bạn nên sử dụng redux trong ứng dụng của mình. Với các bạn beginer nên bắt đầu với redux-thunk vì cú pháp dễ hiểu nhưng rối, còn với redux-saga tuy hơi khó ban đầu nhưng luồng rất mạch lạc, khi bạn nắm gọn được nó rồi maintain, hay xử lý luồng data sẽ rất suôn sẻ.

# 5. Wrong project structure
 Do React native chưa có 1 model chính thức như MVC, MVVD,... nên rất khó cho các beginer không biết nên đặt cấu trúc thư mục ra sao
        
 Đây là cấu trúc đầu tiên mà Valentyn đã làm
 
 ![](https://images.viblo.asia/acaf21ee-1be0-4071-8cc8-09ca2d53d1ab.png)
 
 với model này, coi là phù hợp với app của anh ấy vì chỉ có khoảng 10 screen.
 
 Nhưng nếu mà nếu hơn 10 screen thì sao, nó sẽ như này: 
 
 ![](https://images.viblo.asia/b2b2a858-d74f-457f-8878-fbee408725c3.png)
 
 =))) hoang mang chưa các bạn. Khác nhau ở đây là gì. Với cách 1 anh ấy tách các action và reducer ra một folder riêng, còn cách 2 anh ta lưu tất cả lại với nhau. Nếu ứng dụng nhỏ cách 1 sẽ rất hữu ích vì nhìn vào tree folder sẽ không rối, còn khi app của bạn đã rất lớn, có rất nhiều feature thì làm theo cách 2 sẽ giúp bạn nhìn rõ được feature này bao gồm những gì, tiện cho matain về sau rất nhiều.
 
Nếu trong một feature có các component con như Button, Header,... ta cũng có thể tạo 1 folder Style và viết từng file styles tương ứng trong folder đó `Header.styles.js`

Có nhiều dạng cấu trúc khác nhau, ta chỉ nên tìm hiểu cái nào trong số chúng sẽ phù hợp với yêu cầu của ta hơn mà thôi.

# 6. Wrong container structure. Not using smart/dumb components ideology from the beginning

Khi các beginer lần đầu init app sẽ thấy một file App với content được demo, điều đáng nói ở đây là tất cả các component được viết vào trong 1 Component, sinh ra khó có thể kế thừa lại, Valentyn khuyên với những component nào mà ta cảm thấy có thể sẽ dùng lại, nên viết nó thành một component riêng ra, các bạn tham khảo 2 ảnh dưới đây

Được gói gọn trong 1 component gồm avatar, username,...
```js
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
           console.log(‘Please, enter username’);
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

Với `TouchableOpacity` và `Image` đều có các props ta đều có thể tách ra và truyền props vào cho nó để có thể kế thừa và tối ưu

```js
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
            console.log('Please, enter username');
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

Tuy file có dài hơn nhưng bây giờ ta cũng có thể dùng lại các component con kia phải không =)), không chỉ ở file này mà còn các component bạn cũng có thể import và sử dụng lại nó.

Nhưng cũng đừng tham quá mà chia nhỏ nó quá đi, sẽ rất là rối, có thể gây nhần lẫn cho chúng ta khi component to lên, app lớn hơn, các bạn xem ví dụ dưới đây:
 
 ```js
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
            console.log('Please, enter username');
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
 
 Như ta thấy thì button lại được tách ra một lần nữa, anh ta check button này là Submit, hay delete và Draft với id là index tương ướng. Điều gì sẽ xảy ra nếu chúng ta sẽ chuyển tới 5 status dưới dạng id cho component này?
 
 # 7. Inline styles
Sau khi làm việc một chút với bố cục trong RN, Valentyn gặp phải một vấn đề với cách viết Inline styles:

```js
render() {
    return (
        <View style={{
            flex:1,
            flexDirection:'row',
            backgroundColor:'transparent'
        }}>
            <Button
                title={"Submit"}
                onPress={this._submit.bind(this)}/>
        </View>
    );
}
```
Với các bạn beginer ban đầu khi viết được như này sẽ rất thoả mãn, nhưng đợi tới khi app của bạn được đưa lên store xem =)), bạn sẽ cấn phải est, maintain lại performance khá là nhiều đấy.

# 8. Validating forms with redux
Để validate form với redux ta cần tạo action, laction type, field, reducer. Và nó thực sự gây phiền nhiễu.

Vì vậy, thay vì sử dụng redux hãy nên sử dụng state.

# 9. Relying on zIndex TOO MUCH
Rất nhiều người đến với React native từ web. Và trong web có một có thuộc tính css là z-index. Nó giúp chúng ta hiển thị lớp mà chúng ta muốn ở cấp độ mong muốn. Trong web nó thực sự awesome.

Ban đầu RN không có tính năng như này. Nhưng sau đó nó đã được thêm vào. Và vì vậy Valentyn bắt đầu sử dụng nó. Lúc đầu nó thực sự dễ dàng. Kết xuất lớp theo bất kỳ thứ tự nào bạn muốn và chỉ cần đặt thuộc tính zIndex theo kiểu. Và nó sẽ hoạt động. Nhưng sau khi thử nghiệm nó trên Android, nó sẽ không như vậy, nó chỉ làm việc hiệu quả nếu khi nó được bọc trong 1 View có style `position: absolute`,  và đi kèm với `elevation`, như vậy đã gây ra rất nhiều hạn chế và gây rối code. 

# 10. Not reading code of external modules
Khi bạn muốn tiết kiệm thời gian của mình,  bạn sẽ sử dụng các lib bên ngoài. Thường thì họ có tài liệu và bạn chỉ cần hiểu nó và sử dụng.

Nhưng đôi khi libs này có thể bị hỏng, hoặc sdk update, ... Sinh ra không hoạt động như lib đã được mô tả. Đó là lý do tại sao bạn cần đọc code của các modul, libs này. Khi đó bạn sẽ hiểu nó đang sai ở đâu. Code có sạch, có tối ưu không. Thêm vào đó bạn sẽ học cách xây dựng modul của riêng mình nếu bạn sẽ đọc code của các modul, libs khác.

# 11. Awareness of PanResponder and Animated APIs.
PanResponder cung cấp cho chúng ta cảm nhận một cách tự nhiên hơn khi tương tác với màn hình app.

PanResponder thường được dùng để handle vào màn hình khi bạn muốn đóng keyboard, tương tác gì đó trên màn hình sẽ sinh ra action nào đó, ...

Dưới đây là 1 ví dụ giữ PanResponder với Button, Button này được xây dựng để ghi lại cử chỉ của user. Ví dụ: user nhấn mục và sau đó kéo ngón tay sang một bên. Với sự trợ giúp của API Animated đã được xây dựng Button sẽ thay đổi độ mờ khi nhấn nút:

```js
'use strict';
import React, { Component, PropTypes } from 'react';
import { Animated, View, PanResponder, Easing } from 'react-native';
import moment from 'moment';
export default class Button extends Component {
    constructor(props){
        super(props);
        this.state = {
            timestamp: 0
        };
        this.opacityAnimated = new Animated.Value(0);
        this.panResponder = PanResponder.create({
   onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
   onStartShouldSetResponder:() => true,
   onStartShouldSetPanResponder : () => true,
   onMoveShouldSetPanResponder:(evt, gestureState) => true,
   onPanResponderMove: (e, gesture) => {}, 
   onPanResponderGrant: (evt, gestureState) => {
   /**THIS EVENT IS CALLED WHEN WE PRESS THE BUTTON**/
       this._setOpacity(1);
       this.setState({
           timestamp: moment()
       });
       this.long_press_timeout = setTimeout(() => {
            this.props.onLongPress();
       }, 1000);
   },
   onPanResponderStart: (e, gestureState) => {},
   onPanResponderEnd: (e, gestureState) => {},
   onPanResponderTerminationRequest: (evt, gestureState) => true,
   onPanResponderRelease: (e, gesture) => {
   /**THIS EVENT IS CALLED WHEN WE RELEASE THE BUTTON**/
       let diff = moment().diff(moment(this.state.timestamp));
       if(diff < 1000){
           this.props.onPress();
       }
       clearTimeout(this.long_press_timeout);
       this._setOpacity(0);
       this.props.releaseBtn(gesture);
   }
     });
    }
    _setOpacity(value){
    /**SETS OPACITY OF THE BUTTON**/
        Animated.timing(
        this.opacityAnimated,
        {
            toValue: value,
            duration: 80,
        }
        ).start();
    }
    render(){
        let longPressHandler = this.props.onLongPress,
            pressHandler = this.props.onPress,
            image = this.props.image,
            opacity = this.opacityAnimated.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0.5]
            });
        return(
            <View style={styles.btn}>
                <Animated.View
                   {...this.panResponder.panHandlers}
                   style={[styles.mainBtn, this.props.style, {opacity:opacity}]}>
                    {image}
               </Animated.View>
            </View>
        )
    }
}
Button.propTypes = {
    onLongPress: PropTypes.func,
    onPressOut: PropTypes.func,
    onPress: PropTypes.func,
    style: PropTypes.object,
    image: PropTypes.object
};
Button.defaultProps = {
    onPressOut: ()=>{ console.log('onPressOut is not defined'); },
    onLongPress: ()=>{ console.log('onLongPress is not defined'); },
    onPress: ()=>{ console.log('onPress is not defined'); },
    style: {},
    image: null
};
const styles = {
    mainBtn:{
        width:55,
        height:55,
        backgroundColor:'rgb(255,255,255)',  
    }
};
```

**Lời kết**

React Native is awesome. You can do mostly everything with it. If not - you can do it in Swift/Objective C or Java and then just port it to React Native. =))

Tài liệu tham khảo:

https://medium.com/dailyjs/11-mistakes-ive-made-during-react-native-redux-app-development-8544e2be9a9