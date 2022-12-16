# Giới thiệu
Chúng ta đang trong loạt bài cùng tìm hiểu về reactjs, mình sẽ cố gắng đưa thật nhiều ví dụ để các bạn dễ hiểu. Và chắc trong thời gian tới mình sẽ cố gắng viết một loạt bài về react base để các bạn tiện theo dõi. Còn bây giời để nối tiếp bài [**Cùng tìm hiểu về lifting state up trong reactjs**](https://viblo.asia/p/cung-tim-hieu-ve-lifting-state-up-trong-reactjs-924lJqmYZPM) chúng ta sẽ cùng tìm hiểu về redux. Đúng như lời mở bài  và các bạn chắc cũng từng đặt câu hỏi **tại sao giờ nhà nhà dùng redux mà không phải lifting state up chứ,** ukm thì tại vì những ưu điển lớn mà nó mang lại, mình sẽ chưa bật mí vội đâu mà chúng ta sẽ cùng nhau tìm hiểu trong bài viết này nha :). Một chú ý nho nhỏ là nếu muốn hiểu được luồng hoạt động và để hiểu rõ hơn các vấn đề thì các bạn cần đọc về **lifting state up** trước nhé.
# Nội dung
## 1. Định nghĩa
Theo như document của redux thì nó được định nghĩa đơn giản như sau

> Redux is a predictable state container for JavaScript apps.

Nếu với **lifting state up** hoạt động theo kiểu đưa tất cả về cùng một thằng cha để xử lý, rồi ở đâu cần thì lại truyền từ thằng cha đến. Hay các bạn có thể hiểu theo hình sau:

![](https://images.viblo.asia/f1be4df7-31a3-4d6f-959e-e7540bc81167.png)

Và như ở phần cuối của phần trước mình chia sẻ, thì nếu các điểm cuối cần dữ liệu. Thì bắt buộc chúng ta phải chuyển dữ liệu từ thằng cha và qua **các điểm trung gian**. Ví dụ mình muốn truyền dữ liệu từ thằng cha là file app.js tới thằng menuItem, thì mình sẽ cần chuyền nó qua thằng trung gian menuList. Và nếu bạn có 10 thằng trung gian thì các bạn bắt buộc phải truyền qua từng đấy thằng :), nghe thôi cũng thấy mệt rồi.

Và redux xuất hiện như một giải pháp tuyệt vời.

![](https://images.viblo.asia/b32516a7-dbbb-416f-9682-2d14147263a4.png)

Như trên hình chúng ta có thể thấy, bây giời ở component nào của các bạn thay đổi, hoặc hiển thị state thì các bạn chỉ connet trực tiếp lên store của redux mà chẳng cần bất kì thằng chung gian nào cả.
## 2. Nguyên tắc hoạt động của Redux
Nếu các bạn đã hiểu được tư tưởng của redux thì phần này sẽ là cách mà redux hoạt động, nếu các bạn lắm được cơ bản của 2 phần này mình nghĩ các bạn sẽ nhanh chóng lắm bắt được redux thôi :D.

**Nguyên tắc 1: Store(Single Source of Truth)**

Trạng thái của toàn bộ ứng dụng được lưu trong 1 store duy nhất là 1 Object, các bạn sẽ có đoạn code sau:
```
import { createStore } from 'redux';
import myReducer from './reducers/index';

const store = createStore(myReducer);
return (
<Provider store={store}>
    ...
</Provider>
)
``` 
Đoạn code trên các bạn có thể biện dịch thành :Tại file index hay có thể hiểu là Root component tạo ra một store, và chỉ định store này dùng *myReducer* , trong file *import myReducer from './reducers/index';* chúng ta sẽ chia nhỏ các file xử lý và `combineReducers()` - tập hợp các reducer xử lý lại. 

**Nguyên tắc 2: Action ( State is Read-Only )**

Các bạn sẽ không thể thay đổi trực tiếp state như viết trong component là *setState()* như trước. Muốn thay đổi state trên store các bạn cần gửi cho nó một action (là 1 object mô tả những gì xảy ra)
```
export const listAll = () => {
    return {
        type : types.LIST_ALL
    }
};
```
Một action quan trọng nhất là type. Vì khi các bạn gọi một dispatch để gửi nó lên store
```
onChangeMessage : (message) => {
            dispatch(action.actChangeMessage(message));
        }
```
và ở reducers có thể dự vào type này để nhận biết bạn đang muốn xử lý cái gì

**Nguyên tắc 3: Reducer ( Changes are made with Pure Functions )**

Để chỉ rõ trạng thái (state) tree được thay đổi bởi 1 action bạn phải viết **pure reducers**. **Pure reducers** hiểu đơn giản nó nhận một action và với state cũ chúng ta sẽ update một state mới, trong đây các bạn không xử lý web hay gọi api vv... ở đây chỉ thực hiện các chức năng update state thôi.

### Có thể tón tắt hoạt động cơ bản của redux theo ảnh sau:
![](https://images.viblo.asia/8903d3c3-8818-44ea-91d7-660b9811454e.gif)

## 3. Áp dụng redux vào ví dụ
Và chương trình lý thuyết buồn ngủ đến đây là kêt thúc, chúng ta cùng đi vào một số ví dụ nhỏ nhỏ để hiểu sâu hơn và để có thể ngấm được tư tưởng của redux nhé.
###  Installation thư viện redux vào project

Đầu tiên các bạn mở cmd lên và pase câu lệnh sau vào, để thêm redux vào project của bạn:
> npm install --save redux react-redux

các bạn mở file *package.json* trong project lên nếu tìm thấy *"react-redux":* trong *"dependencies"* thì có nghĩa là bạn đã cài đặt redux thành công.

### Sử dụng redux
Sẽ có rất nhiều cách để các bạn chia folder project của các bạn với react và redux nhưng tổng quan nhất các bạn sẽ cần: **Store, Views , Actions, và Reducers.**
* **Store**: Tại **Root component** khởi tạo store và bao các component lại với Provider của react-redux giúp component có thể giao tiếp với redux.
```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import appReducers from './reducers/index';
import { Provider } from 'react-redux';
import { composeWithDevTools } from "redux-devtools-extension";

const composeEnhancers = composeWithDevTools({});
const store = createStore(
    appReducers, composeEnhancers()
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
document.getElementById('root'));

serviceWorker.unregister();
```
Nếu các bạn thử log **store** lên các bạn sẽ thấy một danh sách các biến default mà quan trong nhất mà các bạn có thể thấy :
> getState(): Giúp lấy ra state hiện tại
> 
> dispatch(action): Thực hiện gọi 1 action
> 
> subscrible(listener): Luôn lắng nghe xem có thay đổi gì ko rồi ngay lập tức cập nhật ra View
* **Actions** : Nó là 1 pure object định nghĩa 2 thuộc tính lần lượt là type: **type** của action, ví dụ như *taskConstants.FETCH_TASK_SUCCESS*, **payload**: data mà action truyền lên.
```
export const fetchListTaskSuccess = (data) => {
    return {
        type: taskConstants.FETCH_TASK_SUCCESS,
        payload: {
            data,
        }
    };
};
```
taskConstants chỉ là nơi chứa các biến static của mình thôi, mình viết như vậy để tránh nhầm lẫn và dễ thay đổi khi cần thôi :D lên các bạn không cần quá quan tâm đâu.
* **Reducers**: Như mình đã đề cập ở trên đây là lơi sẽ nhận các action và dựa theo đó chúng ta sẽ update lại state của bạn
```
import * as taskConstants from './../constants/task';
import { toastError } from '../helpers/toastHelper';

const initialState = {
    listTask: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case taskConstants.FETCH_TASK: {
            return {
                ...state,
                listTask: [],
            };
        }
        case taskConstants.FETCH_TASK_SUCCESS: {
            const { data } = action.payload;
            return {
                ...state,
                listTask: data,
            };
        }
        case taskConstants.FETCH_TASK_FAILED: {
            const { error } = action.payload;
            toastError(error);
            return {
                ...state,
                listTask: [],
            };
        }
        default:
            return state;
    }
};

export default reducer;
```
* **View**: Hiển thị dữ liệu được cung cấp bởi Store. Chúng ta sẽ sử dụng **import { connect } from 'react-redux';** để kết nối với redux. Mình sẽ lấy một component của mình để giải thích cho các bạn
```
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Products from '../components/Products';
import Product from '../components/Product';
import PropTypes from 'prop-types';
import * as action from '../actions/index';

class ProductsContainer extends Component {
    render () {
        var { products } = this.props; 
        return (
            <Products products={ products }>
                { this.showProducts(products) }
            </Products>
        );
    }
    showProducts(products) {
        var result = null;
        var { onAddToCart, onChangeMessage } = this.props;
        if(products.length > 0) {
            result = products.map((product, index) => {
                return <Product 
                            key={index} 
                            product={product}
                            onAddToCart = {onAddToCart}
                            onChangeMessage = {onChangeMessage}
                        />
            });
        }
        return result;
    }
}

ProductsContainer.propTypes = {
    products : PropTypes.arrayOf(
        PropTypes.shape({//Check điều kiện của từng phần tử trong một arr
            id : PropTypes.number.isRequired,//number check kiểu số và bắt buộc phải có
            name: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            inventory: PropTypes.number.isRequired,
            rating: PropTypes.number.isRequired
        })
    ).isRequired,//isRequired bắt buộc phải có, PropTypes.arrayOf check nó là một array
    onAddToCart : PropTypes.func.isRequired,
    onChangeMessage : PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        products : state.products,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddToCart : (product) => {
            dispatch(action.actAddToCart(product, 1));
        },
        onChangeMessage : (message) => {
            dispatch(action.actChangeMessage(message));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer);
```
Đầu tiên chúng ta sẽ kết nối đến **redux** qua  **connect**, sau đó mình sẽ thực hiện middleware bằng **propTypes** để kiểm tra dữ liệu nhận về. Và cuối cùng mình viết hàm **showProducts** để render dữ liệu nhận đươc này.
### Tóm tắt lại :
> component -> action -> reducer -> store -> component
## Kết luận
Đọc tới đây chắc các bạn cũng đã hình dung được **redux** là gì đúng không ạ. Cảm ơn bạn đã đọc bài của mình, nếu các bạn có thắc mắc, hay có phần nào chưa hiểu các bạn có thể bình luận dưới phần comment để chúng ta cùng tìm hiểu dõ hơn nhé. Và đặc biệt đừng quên cho mình một like và một share nhé :D!!!