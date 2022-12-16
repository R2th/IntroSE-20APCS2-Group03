XIn chào mọi người, hôm nay mình sẽ chia sẻ về Redux , axios kết hợp với React native.
Trước tiên bạn cần biết về React native cơ bản, các cú pháp, method nhé !
Vậy Redux là gì ? 
> Redux is a predictable state container for JavaScript apps.
> 
Hiểu nôm na ra, Redux là 1 phương pháp tổ chức code. Sao cho chúng ta có thể tuận tiện nhất trong việc sử dụng data.
Bây giờ, chúng ta xét 1 bài toán sau:
*  Chúng ta có 4 component (C1 => C2 => C3 => C4)
*  Tại C4 chúng ta có 1 biến A =1;
*  Ở bên ngoài C1, khi click 1 button sẽ thay đổi giá trị trong C4
Vậy , với bài toán trên, với cách sử dụng thông thường, chúng ta sẽ giải quyết nó như nào ?
Cách giải quyết đơn giản thôi : 
> Từ C1, chúng ta tạo 1 function đến C2, rồi từ C2 lại gọi đến C3, cứ lần lượt vậy cho đến khi gọi tới C4 là được thôi mà :)
> 
Ồ, mệt quá nhỉ, nó mà có thêm C5,C6 nữa thì "em xin giơ tay rút lui thôi".
Thế thì phải làm ra sao ? À, thế mới cần Redux. Bạn có thể tham khảo thêm về Redux tại đây: https://redux.js.org/basics/usagewithreact
Vậy Redux có các thành phần như nào ? cách sử dụng ra làm sao ?
## Các thành phần của Redux
### * Action
Action chính là các hành động được định nghĩa trong màn hình. Ví dụ trong màn Login thì hành động là gì ?  Đương nhiên là LoginAction rồi
```
export const loginAction = (username,password) => {
    return {
        type: 'LOGIN',
        payload: {
            name: username,
            pass: password
        }
    }
}
```
Nhìn func bên trên ta thấy: khi nhấn vào login, action được return ra với type: 'LOGIN', vậy payload là gì ? payload chính là data mà ta muốn truyền vào từ 1 màn component. Tức là khi nhấn login, sẽ truyền userName và password vào action.
### * Reducer
Reducer chính là nơi xử lý logic cho Action đó. Ở trường hợp login, tôi chỉ muốn lưu lại giá trị cho usernae và password thôi. Reducer sẽ dựa vào type để return ra action tương ứng
```
const loginReducer = (state = { username: '', password: '' }, action) => {
    switch (action.type) {
        case 'LOGIN':
            return Object.assign({}, state, {
                username: action.username,
                password: action.password,
            });
    }

    return state;
}

export default loginReducer;
```
### * Store
Tiếp theo, đó là store. Nghe store cũng có thể đoán ra được nó là làm chi rồi. Chính là lưu trữ. 

```
import thunk from 'redux-thunk';

const AppReducers = combineReducers({
  loginReducer,
});

const rootReducer = (state, action) => {
  return AppReducers(state, action);
}
let store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
```

Các bạn có thể xem ảnh dưới đây để hiểu được rõ hơn logic xử lý:
![](https://images.viblo.asia/bdd0e15f-4b51-4136-940f-f5d23f3c264a.png)
tât cả data đều được lưu trữ tại store. Chỉ cần thay đổi state của data thì tất cả màn nào sử dụng data sẽ được  thay đổi giá trị.
Bên trên, các bạn còn thấy applyMiddleware(thunk) vậy nó là cái chi rứa ? mà cần sử dụng ? 
Nó lại liên quan đến 1 khái niệm nữa, đó là đa luồng. 
Xét 1 bài toán đó là download file chẳng hạn, nếu như chúng ta thực hiên nó trên main thread thì sao ? Đơ app quá trời luôn á. Vậy thì phải làm sao ? Đương nhiên là sẽ thực hiện nó trên 1 thread khác rồi. Khi nào download xong sẽ update giao diện lên main thread, và redux-thunk sẽ làm điều này. Bạn chỉ cần gọi như bên trên là được, còn lại cứ để React lo. Nếu muốn tìm hiểu sâu hơn, bạn có thể tham khảo ngay tại trang chủ của nó. 
https://github.com/reduxjs/redux-thunk

### * View Component
Trước tiên, bạn cần phải import { connect } from 'react-redux'; sau đó export export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen); 

Tiếp theo,  khi request API Login, mình dùng lib axios bạn có thể tham khảo tại đây: https://www.npmjs.com/package/react-native-axios
Nó là 1 lib để ta request API

```
import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, TextInput, Button, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { loginAction } from '../actions/LoginAction';
import axios from 'axios';

class LoginScreen extends Component {
    static navigationOptions = {
        title: 'Bion',
        headerStyle: {
            backgroundColor: '#841584',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            tokenVN: '',
            isLoading: false,
        };
    }
    login(e) {
        //this.props.loginA(this.state.username, this.state.password);
        //alert(this.state.username);
        //e.preventDefault();
        this.setState({ isLoading: true })
        axios
            .post('https://reqres.in/api/login',
                {
                    'email': this.state.username,
                    'password': this.state.password
                }
            )
            .then((response) => {
                this.props.loginA(this.state.username, this.state.password),
                this.setState({ tokenVN: response.data.token, isLoading: false })
                this.props.navigation.navigate('Main')
            })
            .catch((err) => console.log(err))
    }
}

const styles = StyleSheet.create({
    groupName: {
        fontSize: 16,
        paddingLeft: 10,
        marginTop: 10,
        borderRadius: 3,
        height: 40, borderColor: '#841584', borderWidth: 1,
    },
    viewGroupName: {
        marginTop: 15,
        marginLeft: 15, marginRight: 15
    },
    viewContainer: {
        width: '100%',
        backgroundColor: '#ffffff'
    },
    viewButton: {
        borderRadius: 5, marginTop: 30, height: 50,
        marginLeft: 15, marginRight: 15, alignContent: 'center',
    }
});

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
    loginA: (username, password) => dispatch(loginAction(username, password))

});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
```
Thanks mọi người đã quan tâm, mình mong nhận được sự góp ý của các bạn để bài viết thêm hoàn chỉnh. Vì mình cũng chỉ mới học và viết theo ý hiểu của bản thân, không thể tránh được những sai lầm.