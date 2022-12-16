## 1. Mở đầu
&nbsp;&nbsp;&nbsp;&nbsp;Chào mọi người...:stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye: bây giờ mình lại nổi lên đây rồi. Lại chuỗi học reactjs nà. Bài trước mình có đi tìm hiểu về `redux` trong `reactjs` . Còn lần này mình lại cùng nhau đi tìm hiểu và học một kiến thức mới nhá..đó là kết hợp `redux-sagas` trong `reactjs`.
## Nội dung
**1.  Khái niệm và tiện ích**

**2.  Một chút ví dụ**
### 1. Khái niệm và tiện ích
&nbsp;&nbsp;&nbsp;&nbsp;`Redux-Saga` là một thư viện `redux middleware`, giúp quản lý những `side effect` trong ứng dụng redux trở nên đơn giản hơn. Bằng việc sử dụng tối đa tính năng `Generators (function*)` của ES6, nó cho phép ta viết `async code` nhìn giống như là `synchronos`.

**Side effect là gì??**

&nbsp;&nbsp;&nbsp;&nbsp;Những xử lý ở `REDUCER` đều là xử lý đồng bộ. Nhưng trong ứng dụng thực tế thì ta cần nhiều hơn vậy. Ví dụ như ta dùng gọi API và lấy dữ liệu thì cần phải đợi lấy kết quả. Vậy những việc như thế trong lập trình hàm gọi nó là side effecrs.

**Generator function là gì??**

&nbsp;&nbsp;&nbsp;&nbsp;Khác với function bình thường là thực thi và trả về kết quả, thì Generator function có thể thực thi, tạm dừng trả về kết quả. Từ khóa để làm được việc đấy là `YIELD`.

**Redux-Saga hoạt động như thế nào??**

&nbsp;&nbsp;&nbsp;&nbsp;Đối với logic của saga, ta cung cấp một hàm cho saga, chính hàm này là hàm đứng ra xem xét các action trước khi vào store, nếu là action quan tâm thì nó sẽ thực thi hàm sẽ được thực thi, nếu bạn biết khái niệm hook thì hàm cung cấp cho saga chính là hàm hook.

&nbsp;&nbsp;&nbsp;&nbsp;Điều đặc biệt của hàm `hook` này nó là một generator function, trong generator function này có`yield` và mỗi khi `yield` ta sẽ trả về một plain object. Object trả về đó được gọi `Effect object`. effect object này đơn giản chỉ là một object bình thường nhưng chứa thông tin đặc biệt dùng để chỉ dẫn middleware của Redux thực thi các hoạt động khác ví dụ như gọi một hàm async khác hay `put` một `action` tới store. Để tạo ra effect object đề cập ở trên thì ta gọi hàm từ thư viện của saga là `redux-saga/effects`.


![hoat động của redux](https://images.viblo.asia/6d6e476c-b16a-45ae-9642-f159218af9ac.png)

Sơ đồ hoạt động của `sagas`


-----

Mình tìm hiểu thì dài vậy nhưng mình nghĩ nó là một thư viện giúp ứng dụng redux của bạn giao tiếp và không đồng bộ với bên ngoài, và chủ yếu là API.

### 2. Một chút ví dụ

tạo một project
> npx create-react-app my-app

Thêm các thư viện cần thiết 

> yarn add  redux

> yarn add react-redux

> yarn add redux-saga

Rồi chiến thôi các bạn, ở đây mình kết hợp cả kiến thức coi như đã biết của redux rồi nên chỉ giải thích phần liên quan tới `sagas` .. :heart_eyes::heart_eyes::heart_eyes::kissing_heart::kissing_heart::stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye:

Đầu tiên mình sẽ tạo một số file
```javascript
//types.js
export const REQUEST_FROM_JSON = 'REQUEST_FROM_JSON';
export const RECEVIE_DATA = 'RECEVIE_DATA';
export const ADD_USER = 'ADD_USER';
```

file này chưa các name case để tất cả các name case là đồng nhất

```javascript
//actions.js
import * as types from './types';

export function getDataFromJson () {
    return {
        type: types.REQUEST_FROM_JSON
    }
}

export function getData (data) {
    return {
        type: types.RECEVIE_DATA,
        data
    }
}
```

Các hành động dùng để dispatch

```javascript
//reducers.js
import * as types from './types';
const getDataFromJsonInitialState = {};
export function getDataFromJson (state = getDataFromJsonInitialState, action) {
    switch (action.type) {
        case types.RECEVIE_DATA:
            return {...getDataFromJsonInitialState, 'users': action.data};
        case types.REQUEST_FROM_JSON:
            return {...getDataFromJsonInitialState, 'success': true}
        default:
            return state;
    }
}
```
Nơi đây thực thi và lưu vào store...giờ đến file `sagas.js` xem chúng ta có gì nha.

```javascript
//sagas.js
import { takeLatest, call, put } from "redux-saga/effects";
import * as actions from './actions';
import * as types from './types';
import callApi from './../callApi';

export function* watcherSaga () {
    yield takeLatest(types.REQUEST_FROM_JSON, workerSaga);
}

function fetchData () {
    return callApi('student/get-all');
}

function* workerSaga() {
    try {
        const users = yield call(fetchData);
        yield put(actions.getData(users.data));

    } catch (error) {
        console.log(error);
    }
    
}
```

Vâng đến đây mình giải thích những gì mình dùng trong này

đầu tiên là 

`takeLastest() `: Có nghĩa là nếu chúng ta thực hiện một loạt các actions, nó sẽ chỉ thực thi và trả lại kết quả của của actions cuối cùng.

`call():` gọi function. Nếu nó return về một promise, tạm dừng saga cho đến khi promise được giải quyết.

`put() `: dispatch một action

`watcherSaga` : một  generator function sẽ gửi action được dispatched tới Store 

`workerSaga`: dùng để gọi hàm `call` lên api và trả về kết quả.

trên là công dụng của chúng và cách dùng bên trên..giờ ta đên nơi sử dụng nhá

```javascript
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../redux/actions';
import { withRouter } from 'react-router-dom'
import './../users.css';
class UserItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
        
    }
    componentWillMount() {
        this.props.getUser();
    }

    delete = (id) => {
        console.log(id);
    }
    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Name</th>
                            <th>Mobile</th>
                            <th>Address</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.users && this.props.users.map((value, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{ key + 1 }</td>
                                        <td>{ value.name }</td>
                                        <td>{ value.mobile }</td>
                                        <td>{ value.address }</td>
                                        <td>
                                            <button className="btn btn-outline-danger" onClick={() => this.delete(value.id)}>Delete</button> 
                                            <button className="btn btn-outline-warning">Edit</button>
                                        </td>
                                    </tr>
                                    
                                )
                            })
                        }
                    </tbody>
                </table> 
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        users: state.users
      }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getUser: () => {
            dispatch(actions.getDataFromJson())
          }
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserItem));
```

&nbsp;&nbsp;&nbsp;&nbsp;Các ban thấy không mình gọi như bình thường mà không cần tao hay gọi đến bất kì function nào tác động đến api rồi mới truyền ngược vào store..ở đây mình có thể làm đc cả 2 trong một lần gọi function được truyền từ store. 

##  Tổng kết

&nbsp;&nbsp;&nbsp;&nbsp;Qua quá trình mình làm thì ngoài các khái niệm trên thì mình rút ra đó là, sagas giúp mình thực hiện các việc mà chúng ta không thao tác, giảm bớt giai đoạn cũng như xử lý..ví dụ trước kia không dùng sagas thì chúng phải tự `dispatch` một action để gọi api và lấy kết quả rồi sau đó mới `dispatch` đưa vào store. Bây giờ đã có sagas giúp ta làm những công đoạn như vậy.

&nbsp;&nbsp;&nbsp;&nbsp;Qua bài trên mong rằng giúp được phần nào quá trình học tập của các bạn cũng như đây là bài note lại kiến thức cho mình.


&nbsp;&nbsp;&nbsp;&nbsp;Mọi ý kiến đóng góp mọi người cmt ở dưới nhá!!!

## Tài liệu tham khảo
[Giới thiệu Redux-Saga](https://viblo.asia/p/redux-saga-gAm5yqLA5db)


[Redux-Saga tutorial for beginners and dog lovers](https://hackernoon.com/redux-saga-tutorial-for-beginners-and-dog-lovers-aa69a17db645)