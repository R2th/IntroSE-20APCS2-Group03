# 1. Giới Thiệu
Chào mọi người, hôm nay chúng ta cùng tìm hiểu về khái niệm Redux và cách vận hành của nó trong javascript nhé.

# 2. Redux là gì?
Theo tài liệu chính thức từ Redux thì Redux là một predictable state management tool cho các ứng dụng Javascript. Nghĩa là Redux là một công cụ giúp quản lí được các state có thể tiên đoán trước, nó giúp chúng ta viết ứng dụng một cách nhất quán. Trước khi Redux được ra đời, chúng ta gặp nhiều khó khăn khi phải đối mặt với việc quản lí state trong những ứng dụng lớn. Lấy cảm hứng từ design pattern Flux, Redux được thiết kế để quản lý state trong các project JavaScript, do đó nó thường được sử dụng chủ yếu với React. Tuy nhiên, chúng ta hoàn toàn có thể sử dụng Redux với các framework khác như jQuery, Angular hoặc Vue.

Nếu đã làm quen qua với ReactJS, chắc hẳn chúng ta đều biết rằng ReactJS hoạt động theo hướng chuyển dữ liệu qua các thành phần, hay còn gọi là “unidirectional data flow”, toàn bộ dữ liệu chảy theo một hướng từ cấp độ gốc đến cấp độ con.

Với việc sử dụng Redux, chúng ta không còn cần phải truyền props xuống các component con hay ngược lại là sử dụng các hàm callback để truyền data từ component con lên cha, mà các state của các ứng  dụng của chúng ta sẽ lưu tại một nơi gọi là store, từ đó các component có thể dispatch (điều phối) state bị thay đổi thông qua store này, và những thành phần nào cần biết về sự thay đổi đó có thể subscribe (đăng ký) vào store. Nhờ đó mà code của chúng ta sẽ gọn gàn và mạch lạc hơn.
![image.png](https://images.viblo.asia/ea56d5bf-538f-45fa-bbcc-b7e2d9fc093e.png)

### Lợi ích Redux mang lại: 
* **Trạng thái có thể dự đoán được:** Nếu cùng một state và action được chuyển cho reducer, thì kết quả tương tự luôn được tạo ra vì reducer là các pure function. Nhờ đó mà chúng ta có thể chuyển qua lại giữa các state trước đó và xem kết quả trong thời gian thực.
* **Việc đồng bộ dễ dàng hơn:** Với chỉ một "Source of Truth" (store), chúng ta sẽ gặp ít vấn đề trong việc sync state giữa các component với nhau hơn.
* **Dễ dàng testing:** vì các functions được sử dụng để thay đổi state là các pure functions.
* **Khả năng maintain:** Redux có bộ docs vô cùng chặt chẽ hướng dẫn chi tiết cách tổ chức code như thế nào. Do đó, nếu nắm vứng kiến thức về redux thì việc maintain code vô cùng dễ dàng.


## 3. Các thành phần chính và cách hoạt động
![Alt Text](https://redux.js.org/assets/images/ReduxDataFlowDiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif)
### Actions
`Action` đơn giản là những Event được tạo ra bằng việc sử funcion và send data từ app đến Redux store. Data có thể được gửi bằng nhiều cách như gọi API, hay thao tác của User lên App, hoặc submit form. 

Mỗi action của Redux là một object chứa `type` của action và data `payload`, trong đó `type` dùng để miêu tả loại action, còn `payload` thì chứa data được gửi lên store. Một ví dụ đơn giản về action:
```js
export const getProductByFilter = (filter) => {
	return {
		type: "GET_PRODUCT_BY_FILTER",
		payload: filter
	}
}
```

Sau đó, chúng ta sử dụng method dispatch() để gửi action tới Redux store để xử lý thay đổi state:
```js
const handlefilterProduct = (filter) => {
    dispatch(getProductByFilter(filter));
}
```

### Reducers

Sau khi `dispatch` một action nào đó, Reducers trong Redux có nhiệm vụ lấy state hiện tại của app, thêm dữ liệu nhận được từ việc dispatch action, và trả về một state mới. Những states này được lưu như những objects và chúng định rõ cách state của một ứng dụng thay đổi trong việc phản hồi một action được gửi đến store.
```js
const productReducer(state, action) => {
	switch (action.type) {
		case GET_PRODUCT_BY_FILTER:
			return {
				...state,
				filter: { ...state.filter,
					action.payload
				}
			};
		default:
			return state;
	}
};
```
Ngoài ra, khi build một ứng dụng lớn cần sử dụng nhiều reducer, chúng ta sẽ sử dụng method `combineReducers()` của Redux để kết hợp tất cả các reducer lại thành một list các reducer, mỗi một reducer sẽ xử lí một state riêng nhỏ.
```js
const rootReducer = combineReducers({
    product: productReducer,
    post: postReducer,
});
```
### Store
Store chính là **"single source of truth"** nắm giữ toàn bộ states của app chúng ta và đồng thời cung cấp những method để có thể thao tác với state, dispatch action, và sau khi reducer xử lí các action nhận được thì nó trả về state mới cho store và các component sẽ được rerender khi state của nó có thay đổi. 
```js
import {createStore} from 'redux';
import rootReducers from './reducers';

const store = createStore(rootReducers);
export default store;
```

**Cần lưu ý:** 
* Chúng ta sẽ chỉ có một store duy nhất trong ứng dụng Redux.
* State là read only, chúng ta không thể tác động trực tiếp vào state, nó chỉ được thay đổi khi dispatch 1 action nào đó.
* Sự thay đổi được tạo ra với pure reducer function
# 3. Tổng kết:
Qua bài viết này, mình và các bạn đã tìm hiểu cơ bản về redux và cách nó hoạt động. Từ đó nhận thấy rằng, sự ra đời của Redux là một giải pháp mới giúp đỡ các lập trình viên trong việc xây dựng những ứng dụng dễ dàng hơn trong việc quản lí state, từ đó khiến có flow code mạch lạc và dễ đọc, ít bugs hơn. Nhờ sự tuyệt vời này mà Redux không chỉ được áp dụng cho riêng reactjs mà nó còn sử dụng cho tất cả các framework của javascript cần quản lí state. Cảm ơn mọi người đã dành thời gian đọc ^^.

Tài liệu tham khảo:

https://blog.logrocket.com/why-use-redux-reasons-with-clear-examples-d21bffd5835/

https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow

https://css-tricks.com/learning-react-redux/