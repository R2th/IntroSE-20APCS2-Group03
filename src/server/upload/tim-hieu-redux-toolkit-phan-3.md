### TL;DR
Dưới đây là đường dẫn hai phần trước của mình.  
Link phần 1: https://viblo.asia/p/tim-hieu-redux-toolkit-phan-1-YWOZrN3vZQ0  
Link phần 2: https://viblo.asia/p/tim-hieu-redux-toolkit-phan-2-QpmlejPD5rd  
Qua hai phần chúng ta đã cùng tìm hiểu được khá nhiều về **redux-toolkit**, và như đã hứa, trong phần thứ ba này mình sẽ chia sẻ cách xử lý các **action** bất đồng bộ trong **redux-toolkit**.  
### Sử dụng redux middleware với redux-toolkit.
**[Middleware](https://redux.js.org/understanding/history-and-design/middleware#understanding-middleware)** là cơ chế của **redux** cho phép can thiệp vào luồng hoạt động của **redux** (sau khi **dispatch** một **action** và trước khi **action** đó đến **reducer**), thường được ứng dụng cho một số tác vụ như **log**, **debug**, hay xử lý bất đồng bộ...   
Chúng ta thường sẽ cần sử dụng một **redux-middleware** cho việc xử lý bất đồng bộ, bởi vì cơ chế của **redux** yêu cầu **reducer** và **action** không được phép chứa **logic** xử lý **side effect**. Hai lựa chọn phổ biến nhất là **[redux-thunk](https://github.com/reduxjs/redux-thunk)** và **[redux-saga](https://redux-saga.js.org/)**.  
Mình sẽ không so sánh hai công cụ trên trong bài viết này, nhìn chung chúng đều giúp chúng ta cho việc xử lý bất đồng bộ trong **redux**, khác biệt dễ thấy nhất là **redux-saga** phức tạp, khó hiểu hơn, nặng hơn nhưng có vẻ xịn hơn :joy::joy:.  
Quay trở lại với **redux-toolkit**, như đã đề cập ở [phần 1](https://viblo.asia/p/tim-hieu-redux-toolkit-phan-2-QpmlejPD5rd) của bài viết này, khi bạn khởi tạo một **store** cho ứng dụng bằng hàm **configureStore**, giả sử như ví dụ ở dưới đây, **redux-toolkit** sẽ thiết lập sẵn một số **middleware** trong đó, bao gồm **redux-thunk**.  
```js
const store = configureStore({
    reducer: rootReducer,
})
```
Chúng ta có thể dễ dàng thêm vào các **middleware** khác bằng cách chỉ định thêm như sau:  
```js
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import customMiddleware from './customMiddleware'

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(customMiddleware)
    // middleware: [customMiddleware],
})
```
Trong ví dụ thêm chúng ta chỉ định thêm lựa chọn **middleware** khi khởi tạo **store**, lựa chọn này không bắt buộc và nếu không được truyền vào thì **redux-toolkit** sẽ set giá trị **middleware** tương ứng với kết quả trả về của hàm **getDefaultMiddleware** - hàm này cho phép mở rộng thiết lập **middleware** khá dễ dàng như cách mình sử dụng ở trên. Còn  dòng **code** được **comment** là cách chúng ta thiết lập **store** với **redux-toolkit** mà không sử dụng các **middleware** mặc định. 

### Xử lý bất đồng bộ với redux-thunk  
#### redux-thunk
Tại sao lại là **redux-thunk** khi mình có nói là **redux-saga** có vẻ xịn xò hơn nhỉ :joy:. Vì như mình có nói ở trên là **redux-saga** "xịn" nhưng nặng và phức tạp, trong **redux-thunk** dễ hiểu và siêu siêu nhẹ, không tin vào [link](https://github.com/reduxjs/redux-thunk/blob/master/src/index.js) này mà xem :laughing:. Ngoài ra điều quan trọng là nếu chỉ đơn giản bạn cần một giải pháp để xử lý bất đồng bộ trong luồng hoạt động của **redux** (làm việc với **restful api** là chủ yếu chẳng hạn) thì **thunk** là quá đủ rồi. Khi cần xử lý một luồng bất đồng bộ với **redux-thunk** chúng ta sẽ xử lý như ví dụ sau:
```js
import {  createReducer,  createAction  } from '@reduxjs/toolkit'
import services from './services'

const initialState = {
    jobDetail: [],
    loading: true,
    error: null
}

// pure action
const fetchJobDetail = createAction('fetch_job_detail')
const fetchJobDetailSuccess = createAction('fetch_job_detail_success')
const fetchJobDetailFail = createAction('fetch_job_detail_fail')

// async action with redux-thunk
function fetchJobDetail(jobId) {
     return async (dispatch) {
         try {
             const response = await services.fetchJobDetail(jobId)
             dispatch(fetchJobSuccess(response.data))
         } catch (error) {
            dispatch(fetchJobFail(error))
         }
     }
}

const reducer = createReducer(initialState, {
    [fetchJobDetail]: (state, action) => state.loading = true,
    [fetchJobDetailSuccess]: (state, action) => {
        state.loading = false
        state.jobDetail = action.payload
    },
    [fetchJobDetailFail]: (state, action) => {
        state.loading = false
        state.error = action.payload
    }
})
```
Ở trên mình đã **demo** một luồng hoàn chỉnh, thường hay gặp khi sử dụng **redux-thunk** trong dự án, ban đầu mình định viết toàn bộ bằng **redux** thuần, không dùng **toolkit** để các bạn tiện so sánh, tuy nhiên mình vẫn dùng hai hàm **createReducer** và **createAction** để chúng ta cùng ôn lại bài ở phần một.  
Vì ngay từ đầu phần một mình đã khuyên các bạn nên biết trước **redux** để dễ dàng hiểu được nội dung bài viết rồi nên chỗ này mình không giải thích chi tiết luồng hoạt động nữa nhé. 
#### redux-thunk với redux-toolkit
Sau đây mình sẽ viết lại ví dụ ở trên dùng hàm **createSlice** và một hàm mới của **redux-toolkit** giúp chúng ta viết code với **redux-thunk** gọn gàng và trực quan hơn.
```js
import { createReducer, createAsyncThunk } from '@reduxjs/toolkit'
import services from './services'

export const fetchJobDetail = createAsyncThunk(
    'jobs/fetch_job_detail',
    async (jobId, thunkParams) => {
      const response = services.fetchJobDetail(jobId)
      return response.data
    }
)

const initialState = {
    jobDetail: [],
    loading: true,
    error: null
}

const reducer = createReducer(initialState, {
    [fetchJobDetail.pending]: (state, action) => state.loading = true,
    [fetchJobDetail.fulfilled]: (state, action) => {
        state.loading = false
        state.jobDetail = action.payload
    },
    [fetchJobDetail.rejected]: (state, action) => {
        state.loading = false
        state.error = action.payload
    }
})
```
Ví dụ trên cho ta thấy **createAsyncThunk** là một **function** nhận vào hai tham số, một giá trị **string** và một hàm **callback**, hàm **callback** này chứa luồng bất đồng bộ. Hàm **createAsyncThunk** này sẽ thực hiện thi luồng bất đồng bộ và có thể **dispatch** ra ba **action** khác nhau tương ứng với trạng thái của **Promise** được truyền vào, giúp ta xử lý một luồng bất đồng bộ tương tự nhưng ngắn gọn hơn so với ví dụ trước đó, Còn giá trị **string** được truyền vào hàm **createAsyncThunk** ban đầu sẽ là tiền tố tương ứng với **type** của ba **action** được tạo ra như sau:
```js
// fetchJobDetail.pending :   'jobs/fetch_job_detail/pending'
// fetchJobDetail.fulfilled : 'jobs/fetch_job_detail/fulfilled'
// fetchJobDetail.rejected :  'jobs/fetch_job_detail/rejected'
```
Ở đây có một lưu ý là **createAsyncThunk** chỉ giúp tạo ra một luồng hoạt động bất đồng bộ và **dispatch action** theo tham số được truyền vào mà không tự mình thực thi **logic** xử lý **reducer** nào cả, chúng ta sẽ phải tự viết **logic** **reducer** để nhận và xử lý các **action** được **createAsyncThunk** tạo ra và **dispatch** như ở trên.  
Trong hàm **callback** được truyền vào **createAsyncThunk** mình ví dụ ở trên có 2 tham số, trong đó, tham số thứ nhất là tham số mà chúng ta sẽ truyền vào luồng bất đồng bộ, trong ví dụ thì khi gọi **api** để lấy về **Job detail** thì chúng ta cần truyền vào **id** chẳng hạn. Nếu bạn muốn truyền nhiều tham số hơn thì sẽ cần nhóm chúng lại bằng một **object**, như sau:  
```js
...
dispatch(fetchJobDetail({ id: 1, key1: "value1", key2: "value2" }))
...
```
Tham số thứ hai là một **object** chứa các giá trị mặc định được truyền vào hàm **thunk**, có thể được sử dụng khi cần thiết trong **logic** tính toán kết quả của luồng bất đồng bộ.
* **dispatch**:  phương thức **dispatch** của **store**, cho phép **dispatch action** bên trong hàm **callback**. 
* **getState**: phương thức cho phép tham chiếu giá trị của **state** hiện tại.
* **extra**: các tham số được truyền vào trong lúc thiết lập **redux-thunk middleware**
* **requestId**: giá trị **id** duy nhất được sinh ra tự động khi hàm **thunk** được gọi.
* **signal**: đối tượng cho biết liệu một phần khác trong **logic** của **app** có đánh dấu yêu cầu này cần huỷ hay không, xem thêm ở [link](https://redux-toolkit.js.org/api/createAsyncThunk) này.
* **rejectWithValue**: đây là một hàm tiện ích cho phép chúng ta muốn bắt buộc luồng xử lý phải trả về trạng thái **rejected** với một giá trị **payload** được chỉ định chính là tham số được truyền hàm đó.  

Cơ chế sử dụng **createAsyncThunk** giúp chúng ta giải quyết bài toán bất đồng bộ một cách ngắn gọn hơn, giúp giảm thiểu những đoạn **code** lặp lại, mình thì thấy hàm này hay, ngắn gọn hơn so với **redux-saga** mà vẫn giữ được độ **xịn** tương đương.
### Cấu trúc folder store với **redux-toolkit**  
Nội dung cuối cùng mình muốn chia sẻ là cấu trúc thư mục **store** khi áp dụng **redux-toolkit** sẽ khác gì với trước đây, thường thì chúng ta sẽ chia thư mục theo hai cách,  
Phân chia theo chức năng:
```
stores/
    feature1/
        reducer.js
        actions.js
        types.js
        selector.js
    feature2/
        reducer.js
        actions.js
        types.js
        selector.js
    index.js
```
Hoặc phân chia theo các **api** của **redux**
```
stores/
    actions/
        feature1.js
        feature2.js
    reducers/
        feature1.js
        feature2.js
    types/
        feature1.js
        feature2.js
    index.js
```
Đối với sử dụng **redux-toolkit**, cấu trúc thư mục cũng không có gì khác biệt cả, chỉ là cách bạn đặt tên sẽ khác một chút, mình thường dùng như sau:
```
stores/
    feature1/
        slice.js
        thunks.js
        selectors.js
    index.js
```
Do mình sẽ tạo tất cả các nhánh của **store** bằng hàm **createSlice** nên không còn khái niệm riêng biệt **actions**, **types** hay **reducer** nữa.
### Kết luận
Qua phần ba này, mình đã giới thiệu các phần cơ bản của **redux-toolkit**, cách chúng ta chuyển đổi cách viết **redux** thông thường sang **redux-toolkit**. Công cụ mới này đã thật sự  xây dựng một bộ cú pháp mới hoàn chỉnh, ngắn gọn và trực quan hơn. Tất nhiên là còn nhiều nội dung được trình bày trong **[document](https://redux-toolkit.js.org/)** của **redux-toolkit** mình vẫn chưa giới thiệu hết nhưng đến đây mình thấy là đủ dùng rồi, hãy ứng dụng, tìm hiểu và cảm nhận thêm nhé.