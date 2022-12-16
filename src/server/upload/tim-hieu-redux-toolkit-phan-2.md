Trong phần đầu tiên tìm hiểu và sử dụng **redux-toolkit** ([link phần 1](https://viblo.asia/p/tim-hieu-redux-toolkit-phan-1-YWOZrN3vZQ0)), mình đã giới thiệu và chia sẻ cách sử dụng một số **api** cơ bản của **redux-toolkit** giúp chúng ta tạo ra một **redux flow** hoàn chỉnh thay thế các hàm mặc định của **redux**, trong phần này mình sẽ giới thiệu thêm một số **api** nâng cao của **redux-toolkit**.  
## Tạo một module hoàn chỉnh với createSlice  
đầu tiên để hiểu thế nào là khái niệm **"module hoàn chỉnh"**, chúng cùng xem lại ví dụ khởi tạo **store** từ phần trước.
```js
// store.js
import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';

// actions
const increasement = createAction('increasement')
const decreasement = createAction('decreasement')

const initialState = { count: 0 }

function rootReducer = createReducer(initialState, {
    [increasement]: state => ({ count: state.count + 1 })
    [decreasement]: state => ({ count: state.count - 1 })
})

const store = configureStore({
    reducer: rootReducer
})

export default store
```
Trong ví dụ đơn giản này chúng ta có một **rootReducer**, thực tế trong dự án thì **reducer** không mấy khi nhỏ bé như thế này, nguyên tắc của **redux** là chỉ có 1 **single source of truth**, tức là toàn bộ **state** của **app** sẽ đặt trong một **reducer** duy nhất, **redux** cho phép chúng ta chia nhỏ **reducer** thành các **reducer** nhỏ hơn, sau đó dùng hàm **combineReducers** để gộp lại thành **reducer** chung của ứng dụng, thường thì **sub-reducer** độc lập về **logic** và đi theo các **screen** hay **feature** của ứng dụng, mỗi **sub-reducer** thường sẽ lắng nghe các **action** riêng biệt, có các **middleware** tương ứng. Đâu đó chúng ta sẽ thấy thư mục **store** trong ứng dụng được cấu trúc như sau:
```
store
   --> module1
       --> reducer.js
       --> actions.js
       --> actionTypes.js
   --> module2
       --> reducer.js
       --> actions.js
       --> actionTypes.js
  ...
```
OK, giả sử chúng ta đều hiểu về khái niệm **module** rồi nhé, sẽ không vấn đề với cách chia theo thư mục như trên cả, tuy nhiên 
không có gì đảm bảo là **reducer** và **actions** trong **module** kia liên quan đến nhau, mình thường tạo ra một số **convention** trong dự án như là đặt tên **module** theo chức năng, **type** của action phải có tiền tố theo **module** ở đầu để phân biệt và tránh trùng lặp tên **actions**, ví dụ:
```js
// module1 -> actionTypes.js

const context = 'module1'

// action name must contains module prefix
const 'ACTION_01' = `${context}_ACTION_01`
const 'ACTION_01' = `${context}_ACTION_01`
...
```
như đã giới thiệu ở phần trước, **redux-toolkit** sẽ tạo ra một chuẩn hoá để chúng ta viết **code redux** một cách thống nhất và ngắn gọn hơn, chúng ta sẽ giải quyết bài toán **module** này với hàm **createSlice**, trước hết cùng xem qua **demo** nhé.
```js
// module counter --> index.js
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { count: 0 },
  reducers: {
    increment: state => state.count += 1,
    decrement: state => state.count -= 1
  }
})

export const { increment, decrement } = counterSlice.actions
export default counterSlice.reducer
```
**createSlice** giúp chúng ta giải quyết các vấn đề khi tạo **redux module** mình đề cập ở trên, **reducer** và **action** được nhóm lại trong một **object**, và chúng ta chỉ cần **export** ra để sử  dụng trong ứng dụng, đồng thời **action types** cũng được sinh ra với tiền tố mặc định là trường **name** khi tạo **slice**.  
![](https://images.viblo.asia/c210d859-f912-47fa-82ef-1721d21abcf2.png)  
Đến đây thì hẳn là bạn sẽ thấy khá là tiện lợi phải không nào, **createSlice** thật sự đã tạo ra một cú pháp hoàn chỉnh, nhất quán và ngắn gọn cho việc quản lý **state** của ứng dụng với **redux**. Ở đây có điểm nữa cần chú ý, trong ví dụ trên, các **action** sẽ tự động sinh ra tương ứng là các thuộc tính trong trường **reducers**, vậy nếu trường hợp **reducer** của **slice** muốn lắng nghe các **action** khác thì sao, giả sử như lắng nghe một **action** chung nào đó của ứng dụng ?  
Trong trường hợp này, chúng ta cần sử dụng một **option** khác khi tạo **slice**, tên là **extraReducers**, và có hai cách viết khác nhau.
### extraReducers builder callback  
đây cách thứ nhất, được **[document redux-toolkit](https://redux-toolkit.js.org/api/createSlice)** được khuyên dùng, cùng xem **demo** nhé:  
```
// module counter --> index.js
import { createSlice, createAction } from '@reduxjs/toolkit';

const otherAction = createAction('updateCounterByValue')

const counterSlice = createSlice({
  name: 'counter',
  initialState: { count: 0 },
  reducers: {
    increment: state => state.count += 1,
    decrement: state => state.count -= 1
  },
  extraReducers: (builder) => {
      build.addCase(otherAction, (state, action) => {
             state.count += action.payload
      })
      .addDefaultCase((state, action) => {})
  }
})

export const { increment, decrement } = counterSlice.actions
export default counterSlice.reducer
```
Mỗi **action** cần lắng nghe, **builder** sẽ gọi một hàm **addCase** với tham số truyền vào là **action type** (**action** được tạo bởi hàm **createAction** của **redux** hoặc được **export** từ **createSlice** thì chỉ cần truyền vào **action** đó, còn **action** tạo bằng **function** thường hoặc thư viện khác thì cần truyền đúng giá trị **type** của **action**), đối với trường hợp **default** thì chỉ cần gọi hàm **addDefaultCase**, ở đây vẫn cho phép **mutate** trực tiếp **state** nhé.
 
 Lưu ý thêm là hàm **createReducer** cũng cho phép sử dụng hàm **builder** này nhé, cú pháp tương tự như sau.
```
const reducer = createReducer((builder) => {
    ....
})
```
### extraReducers với **map object**  
cách thứ hai này sử dụng **object** với **key** là **action type** và **value** là hàm xử lý **state**.
```
// module counter --> index.js
import { createSlice, createAction } from '@reduxjs/toolkit';

const otherAction = createAction('updateCounterByValue')

const counterSlice = createSlice({
  name: 'counter',
  initialState: { count: 0 },
  reducers: {
    increment: state => state.count += 1,
    decrement: state => state.count -= 1
  },
  extraReducers: {
      // có thể viết là [otherAction] hoặc otherAction.type
      [otherAction]: (state, action) => {
             state.count += action.payload
      }
  }
}) 

export const { increment, decrement } = counterSlice.actions
export default counterSlice.reducer
```
Cách thứ hai này cú pháp gọn gàng và dễ đọc hiểu hơn, tuy nhiên bên **redux-toolkit** khuyên dùng cách thứ nhất trong trường hợp ứng dụng của chúng ta được viết bằng **typescript**, có thể xem thêm ở [đây](https://redux-toolkit.js.org/api/createSlice).
## reducer lắng nghe nhiều action có cùng logic
Trong các ví dụ mình giới thiệu qua hai phần thì chúng ta xử lý trường hợp **reducer** lần lượt xử lý từng **action**, mỗi **action type** được lắng nghe và xử lý bởi một **function**, thực tế thì đôi khi có một số trường hợp mà chúng ta muốn xử lý các **action type** ở cùng một hàm để giảm thiểu lặp **code**, ví dụ trường hợp sau:  
```js
function reducer(state = initState, action) {
    switch (action.type) {
        case 'FETCH_DATA_FAIL':
        case 'UPDATE_DATA_FAIL':
        case: 'DELETE_DATA_FAIL:
            return {
                ...state,
                errors: action.payload.errors,
                loading: false
            };
        default:
            return state;
    }
}
```
Vấn đề này thực tế gặp không nhiều, vì nếu nhiều **action** có cách xử lý giống nhau thì chúng ta nên **dispatch** chung một **action** mà thôi :joy::joy:. Tuy nhiên nếu bạn buộc lòng phải làm như trên, trong **reducer** ta sẽ sử dụng **builder callback** với hàm **addMatcher**, cụ thể như sau:
```
const isErrorAction = (action) => {
    return action.type.endsWith('FAIL')
}

const reducer = createReducer(initState, (builder) => {
    build
        .addMatcher(isErrorAction, (state, action) => {
            state.errors = action.payload
        })
        .addDefaultCase((state, action) => {})
})
```
Khác một chút với **builder.addCase** và **builder.addDefaultCase**, tham số đầu tiên của hàm **addMatcher** là một **function** với tham số là **action** được **dispatch** và trả về giá trị **boolean**, tất cả các **action** được **dispatch** đều sẽ được kiểm tra và cho biết **reducer** cần lắng nghe **action** nào. Bạn có thể xem chi tiết hơn về **addMatcher** tại [đây](https://redux-toolkit.js.org/api/createReducer#builder-methods).  

Trong phần hai bài viết tìm hiểu về **redux-toolkit** này, mình tập trung giới thiệu về **createSlice**, một hàm cho phép chúng ta viết **redux** theo kiểu **tất cả trong một**, mình thấy hàm này quá là hay và tiện lợi luôn, nếu bạn cảm thấy không quen hay khó hiểu thì vẫn có thể dùng **createReducer** hay **createAction** nhưng mình khuyên là nếu ứng dụng **redux-toolkit** thì hãy sử dụng luôn **createSlice** vì nó **xịn** thật sự đấy, mình tạm kết phần hai ở đây, phần 3 tới đây mình sẽ giới thiệu nốt về cách xử lý các **action** bất đồng bộ.