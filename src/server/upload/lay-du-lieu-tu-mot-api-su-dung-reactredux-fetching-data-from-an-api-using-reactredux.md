# Lấy dữ liệu từ một API sử dụng React/Redux

> Xin gửi lời chào sân tới anh em IT-ers, đây là bài viết đầu tiên của mình trên Viblo, thời gian gần đây mình có đang tìm hiểu về React/Redux và cũng có tìm hiểu một số bài viết trên web. Vừa để cải thiện tiếng anh, vừa để nâng cao thêm kiến thức, mình có dịch một bài về “Lấy dữ liệu từ một API sử dụng React/Redux”. Hi vọng một phần nào đó sẽ giúp ích cho những ai đã và đang tìm hiểu về React/Redux. Bài dịch có thể có nhiều thiếu sót, mong mọi người góp ý để mình hoàn thiện hơn.
### *Nguồn bài viết: https://dev.to/markusclaus/fetching-data-from-an-api-using-reactredux-55ao*

## Bắt đầu

Tôi quyết định chia sẻ một số kiến thức mà tôi đã thu được thông qua việc mắc sai lầm mà bạn cũng có thể mắc phải. Mọi thứ tôi viết ở đây tôi đều học được bằng cách đọc những bài viết trên blog, cố gắng hiểu những gì đã làm được và **“trial and error”** (đây là cách hoàn thành công việc bằng việc dùng phép thử thông qua những phương pháp khác nhau cho đến khi tìm được phương pháp đúng).

Bây giờ, những điều đầu tiên là bạn cần làm là cài đặt **React** và **Redux**. Tôi giả sử là bạn đã biết cách cài đặt chúng. Sau đó, bạn sẽ thiết lập ứng dụng **React** của bạn, bạn cần cài đặt một công cụ được gọi là **redux-thunk** bằng cách sử dụng lệnh `“npm install redux-thunk”`.

Với tất cả những gì đã được cài đặt, giờ đây chúng ta có thể xem xét những **Component** mà chúng ta sẽ cần để biến những điều kì diệu thành hiện thực!

## Thunk là cái gì vậy?

Về cơ bản, **thunk** là một function được gọi bởi một function khác. Chờ đã… Cái gì? Vâng, đó là cách mà tôi đã phản ứng khi lần đầu tiên tôi nghe tới điều này. Hãy để tôi cho bạn xem một ví dụ:
```javascript
function some_function() {
    // do something
    return function thunk() {
        // do something thunky later
    }
}
```
Như vậy, **some_function** được gọi, nó làm một vài việc và sau đó trả về một hàm mới với các câu lệnh và có thể là các dữ liệu dùng cho sau này.

## **Vậy còn Redux thì sao?**

Tôi không muốn đào sâu về **Redux** (chính xác hơn là tôi không thể). Vì vậy, lời giải thích ngắn gọn chỉ là: Nó là nơi chứa đựng các **state** trong ứng dụng **javascript**. Nó giữ tất cả những dữ liệu bạn cần trong ứng dụng của bạn ở một nơi. Mọi **component** trong ứng dụng của bạn đều có không gian ở trong vùng chứa **state** nơi mà bạn tìm kiếm dữ liệu. Khi dữ liệu được thay đổi thì **component** cũng sẽ thay đổi theo.

## **Actions**

Ý tưởng là bạn gửi các **action** lên **redux** và dựa trên những **action** đó, **state** được thay đổi.
Điều buồn cười là: Một **action** không được làm bất cứ thứ gì, nghe thì có vẻ như có những thứ đang diễn ra, nhưng thực ra là không có. Một **action** chỉ đơn giản là một đối tượng với một **type key**. Như thế này:

```javascript
// this is an action
{
    type: "SOME_ACTION",
    payload: {}
}
```
Hầu hết thời gian bạn không muốn viết đi viết lại cùng một đối tượng, vì thế có một khái niệm được gọi là **Action Creators**.

## Action Creators.

**Action Creators** thực hiện chính xác những gì mà chúng nghe, chúng tạo ra những đối tượng action cho bạn.

```javascript
const SOME_ACTION = "SOME_ACTION";

function create_action(data) {
    return {
        type: SOME_ACTION,
        payload: data
    }
}
```
Vì vậy với những **action creators** đó, bạn có thể dễ dàng sử dụng `SOME_ACTION` ngay bây giờ bằng cách gọi `create_action(data)`. Những action creators đó có thể được gửi lên **redux** bằng cách sử dụng `dispatch(create_action(data))`.
## Reducers
Sau khi một **action** được gửi lên, nó sẽ được truyền vào một cái gọi là **Reducer**. Một **reducer** là một hàm chức năng được đưa ra một **state** và một **action**. Tùy vào **action** mà nó sẽ biến đổi **state** và sau đó sẽ trả về một **state** mới.

```javascript
function someReducer(state, action) {
    switch(action.type) {
        case SOME_ACTION:
            return {
                ...state,
                data: action.payload
            }
        break;

        default:
            // the dispatched action is not in this reducer, return the state unchanged
            return state;
    }
}
```
Những ứng dụng phức tạp hơn rất có thể có 2 **reducer**, mỗi một **reducer** sẽ chịu trách nhiệm cho một phần của **state**. Vì vậy, điều quan trọng là không bao giờ được phép quên trường hợp mặc định (là trường hợp mà **reducer** trả về **state** chưa được thay đổi).
Điều quan trọng cần lưu ý rằng các **reducer** là các hàm thuần khiết. Chúng không bao giờ gọi một cái gì đó giống như **API** hoặc gửi một **action** khác tới **redux**.

## Bạn đã nói về thunks chưa?

Bạn đã nhớ điều đó. Okay, nói về **thunks** một lần nữa. Tôi chỉ đề cập đến **reducers** là thuần khiết. Nhưng thường thì chúng ta muốn có một loại lệnh gọi **API** hoặc gửi một cái gì đó tùy thuộc vào dữ liệu hoặc bất cứ cái gì… Nhưng chúng ta không thể… **reducers** là thuần khiết… **Redux-Thunk** sẽ làm điều đó.

**Redux-Thunk** khá dễ hiểu. Nó được coi như là một đoạn mã trung gian cho **redux store**. Nó xem xét mọi **action** đơn lẻ được gửi đi và nếu nó là một hàm, nó sẽ gọi cái hàm đó. Nhưng điều này mở ra một thế giới hoàn toàn mới của những “**action**” lạ mắt được gửi đến **redux**.
Bạn có thắc mắc, làm thế nào tôi nhận được điều kì diệu nhỏ này vào **store** của tôi? 

## Hãy lấy một số products

Chúng ta muốn nạp một số **product** từ **API** của chúng ta. Để làm điều này, đầu tiên chúng ta thiết lập **component** trong một số loại **state** đang chờ xử lý, chúng ta hiển thị một cái gọi là **loading spinner** hay một cái gì đó tương tự. Sau đó, chúng ta tải dữ liệu và quyết định xem chúng ta có thể hiển thị danh sách **product** được hay không hoặc hiển thị một số loại thông báo lỗi.
Chúng ta bắt đầu thiết lập **action creators.**
```javascript
// action.js

export const FETCH_PRODUCTS_PENDING = 'FETCH_PRODUCTS_PENDING';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_ERROR = 'FETCH_PRODUCTS_ERROR';

function fetchProductsPending() {
    return {
        type: FETCH_PRODUCTS_PENDING
    }
}

function fetchProductsSuccess(products) {
    return {
        type: FETCH_PRODUCTS_SUCCESS
        products: products
    }
}

function fetchProductsError(error) {
    return {
        type: FETCH_PRODUCTS_ERROR
        error: error
    }
}
```
Bây giờ chúng ta đã có **action creators**, hãy thiết lập **reducer** cho toàn bộ.

```javascript
// reducer.js

import {FETCH_PRODUCTS_PENDING, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_ERROR} from './actions';

const initialState = {
    pending: false,
    products: [],
    error: null
}

export function productsReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_PRODUCTS_PENDING: 
            return {
                ...state,
                pending: true
            }
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                pending: false,
                products: action.payload
            }
        case FETCH_PRODUCTS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default: 
            return state;
    }
}

export const getProducts = state => state.products;
export const getProductsPending = state => state.pending;
export const getProductsError = state => state.error;
```
Okay, bây giờ chúng ta có một phần lớn công việc được thực hiện.
Những điều cần lưu ý trong đoạn code trên là ba hàm ở cuối **reducer**. Chúng được gọi là các **selector**. Các **Selector** được sử dụng để lấy các phần được định nghĩa của **state**. 

Trong những ứng dụng nhỏ, chúng thực sự cần thiết. Nhưng nếu bạn mở rộng quy mô ứng dụng của mình và nó càng ngày càng phức tạp hơn, nó sẽ thực sự lộn xộn nếu bạn thay đổi một cái gì đó trong **state** của bạn. 
Tôi chắc chắn sẽ làm một bài blog về các **selector**, bởi vì tôi nghĩ rằng chúng thực sự quan trọng để thiết lập một ứng dụng **react/redux** có thể mở rộng.

Chúng ta đang ở đâu… À vâng, một phần lớn công việc đã hoàn thành. Điều duy nhất còn lại cho chúng ta để làm về phía **redux** là viết một trong những **action** mới.
```javascript
// fetchProducts.js

import {fetchProductsPending, fetchProductsSuccess, fetchProductsError} from 'actions';

function fetchProducts() {
    return dispatch => {
        dispatch(fetchProductsPending());
        fetch('https://exampleapi.com/products')
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(fetchProductsSuccess(res.products);
            return res.products;
        })
        .catch(error => {
            dispatch(fetchProductsError(error));
        })
    }
}

export default fetchProducts;
```
**Action** trên khá là đơn giản. Đầu tiên chúng ta gửi **pending action**. Sau đó lấy dữ liệu từ **API** của chúng ta. Tiếp đo giải mã **json** và truyền vào một **object**. Cuối cùng kiểm tra lỗi. Nếu có lỗi xảy ra, chúng ta sẽ **throw** nó và gọi hàm **error**. Nếu mọi thứ hoạt động bình thường, chúng ta gọi **success action (fetchProductsSuccess)**. **Reducer** sẽ xử lý phần còn lại.
Đây là tất cả về lấy dữ liệu từ **server**… Không, đùa thôi, không phải vậy đâu. Nhưng đây là cách kết thúc về việc lấy dữ liệu từ **api** mà hầu hết các bài viết đã làm, đúng không. Nhưng…

## Những gì về ứng dụng của chúng ta?

Oh, bạn muốn các sản phẩm từ **store** của bạn thực sự hiển thị trong ứng dụng **react** của bạn? Okay, hãy làm điều đó.
Tôi giả dụ như bạn biết cách để kết nối ứng dụng **react** của bạn tới **redux store** bằng **provider**. Có rất nhiều bài viết về chủ đề này ở ngoài kia. Sau khi bạn làm điều đó, bạn sẽ cần một vài **component**.

Cho tôi mọi thứ bắt đầu về một **view**. Đối với tôi, một **view** là một **component** bao bọc mọi thứ mà một **user** nhận được trong một **component** cha. **Component** cha này hầu hết đều có kết nối tới **redux store** và chia sẻ dữ liệu với **component** mà nó gói gọn.
```javascript
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import fetchProductsAction from 'fetchProducts';
import {getProductsError, getProducts, getProductsPending} from 'reducer';

import LoadingSpinner from './SomeLoadingSpinner';
import ProductList from './ProductList';

class ProductView extends Component {
    constructor(props) {
        super(props);

        this.shouldComponentRender = this.shouldComponentRender.bind(this);
    }

    componentWillMount() {
        const {fetchProducts} = this.props;
        fetchProducts();
    }

    shouldComponentRender() {
        const {pending} = this.props;
        if(this.pending === false) return false;
        // more tests
        return true;
    }

    render() {
        const {products, error, pending} = this.props;

        if(!this.shouldComponentRender()) return <LoadingSpinner />

        return (
            <div className='product-list-wrapper'>
                {error && <span className='product-list-error'>{error}</span>}
                <ProductList products={products} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    error: getProductsError(state),
    products: getProducts(state),
    pending: getProductsPending(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchProducts: fetchProductsAction
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductView );
```
Vì vậy, rất nhiều thứ đang diễn ra ở đây. Chúng ta viết một **component React** tiêu chuẩn. Sau đó, chúng ta sử dụng **connect** để kết nối nó tới **redux store**. **Connect** có hai tham số: Một hàm **mapStateToProps** để ánh xạ các phần của **state** vào **props** của bạn và một hàm **mapDispatchToProps** để ánh xạ các hàm vào **props** của bạn, khi được gọi sẽ được gửi tới **redux**.

Cuối cùng, chúng ta đặt những thứ đó lại với nhau và nhìn xem, chúng ta có một kết nối tới **store**.
Ở trong hàm **mapStateToProps**, chúng ta sử dụng các **selector** mà chúng ta đã viết trước đó.
Tôi muốn thêm chức năng gọi là **shouldComponentRender** vào **component view** và hầu hết các **component**. Tôi đặt tên như vậy bởi vì nó gần giống với tên của phương thức **lifecycle** (**shouldComponentUpdate**) của **React**. Nó kiểm tra xem **component** có nên **render** hay không. Nếu không, nó sẽ **render** ra **LoadingSpinner component**.

Tôi thấy nó rất có lợi khi làm việc như thế này, bởi vì các **component** luôn luôn được khởi tạo lại và tất cả các **component** con được gắn lại sau khi **pending flag**, nó điều khiển hàm **render** trong trường hợp này. Do đó, bạn có thể thêm **redux state** vào **state** của **component** trong hàm khởi tạo (**constructor**). (Tôi không muốn nói về những gì truyền vào **redux** và những gì truyền vào **component state**, đây là chủ đề cho một bài viết khác).

Trong hầu hết các dự án của tôi, tôi thấy đây là một trong những vấn đề khó chịu nhất. Hãy nghĩ về một **component** mà **render** ra một sản phẩm. Nó được khởi tạo bởi dữ liệu và sau đó một số thành phần con như **price calculator**, có **component state**, được khởi tạo trong **constructor** của nó.  Khi dữ liệu mới xuất hiện, bạn cần kiểm tra xem **calculator** có cần phải xác định lại hay không.  Với hàm **ShouldComponentRender**, thật dễ dàng để làm điều đó. Mỗi khi **pending flag** được bật (có thể do một sản phẩm mới được chọn), mọi thứ sẽ được khởi động lại và rất tốt để sử dụng.
Tất nhiên có một vài lý do tại sao bạn lại có các **component** trong phần **view** của bạn mà không được **render** lại. Nếu có trường hợp như vậy, hãy loại bỏ hàm **shouldComponentRender** từ phần **view** và làm việc với nó trong các component con.

Bạn có thể sử dụng một vài hiệu ứng **fadeout/-in** để cải thiện trải nghiệm người dùng.
Vâng, và đó là nó.

Cảm ơn đã đọc bài blog đầu tiên của tôi. Tôi hi vọng bạn sẽ thích nó, tôi hi vọng bạn đã học được một vài thứ và nếu bạn có một vài gợi ý cho tôi để cải thiện kỹ năng **react/redux** của tôi hoặc chỉ muốn nói “chào”, hãy để lại lời bình cho tôi. Tôi thực sự thích điều đó.