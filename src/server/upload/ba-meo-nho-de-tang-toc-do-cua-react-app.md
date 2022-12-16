Trong bài viết này tôi sẽ giới thiệu với các bạn 3 mẹo nhỏ để tăng tốc độ và cải thiện hiệu năng cho ứng dụng React của bạn.

Bài viết sẽ tập trung đề cập đến các khái niệm thực tiễn sẽ đảm bảo rằng khi bạn đưa Redux vào sử dụng cho ứng dụng của bạn sẽ không gây ra bất kì vấn đề về hiệu năng nào khi bạn phát triển.

Chúng ta cùng bắt đầu nào:

## **1. Sử dụng memoization trong selectors của bạn**


Selectors không phải là 1 khái niệm gì mới trong redux, chúng đơn giản chỉ là một cách trừu tượng hoá các state trong các component đang sử dụng nó, là proxy giữa component và redux state. Viết 1 selector có thể dễ dàng như ví dụ sau:

```
// selectors.js
export const getItems = state => state.items;

// Component.jsx
import React from 'react';
import { connect } from 'react-redux';
import { getItems } from './selectors';

function MyComponent({ items }) {
  return <div>{items.length}</div> 
}

const mapStateToProps = state => ({ items: getItems(state) });

export default connect(mapStateToProps)(MyComponent);
```

Trong ví dụ trên, chúng tôi giả định rằng dữ liệu được lưu trữ trong một danh sách. Tuy nhiên, tài liệu Redux khuyến nghị rằng state được chuẩn hóa. Điều đó có nghĩa là chúng ta nên lưu trữ các item ở trong object mà khoá là các ID và giá trị của các item đó.  Đạt được kết quả tương tự như trên, sau đó chúng ta sẽ viết lại một selector như vậy:

```
// remember, items is an object in this case
export const getItems = state => Object.keys(state.items);
```

Việc cài đặt như này thực sẽ nó có thể giải quyết được mục đích của chúng ra, nhưng nó sẽ có một vấn đề rất lớn ở đây. Bất cứ lúc nào state của Redux được cập nhật, Component của bạn sẽ bị render lại. Bạn có thể thấy, khi bạn kết nốt một component bằng cách sử dụng eact-redux’s connect () HOC, Redux sẽ tính toán lại đầu ra của mapStateToProps mà đã cung cấp cho connect(). Nếu props trước và sau khi cập nhật store giống nhau về mặt tham chiếu thì component sẽ không render lại. Tuy nhiên nếu chúng khác nhau thì component sẽ bị render lại

Trong trường hợp của chúng ta, Object.keys trả về một thể hiện khác mỗi khi nó được gọi. Do đó, vì selector này nằm trong mapStateToProps, nó sẽ được tính toán lại khi mỗi lần store cập nhật lại. Chỉ vì tham thiếu của mảng này sẽ khác với tham chiếu trước đó của nó. nên react-redux sẽ nghĩ sai rằng các props của component sẽ khác và vì vậy nó sẽ cho phép React render lại.

Các toán tử như `.map` và `filter` sẽ trả về các giá trị khác nhau về mặt tham chiếu mỗi khi chúng được gọi. Vì vậy chúng ta phải đảm bảo rằng khi đầu ra thực tế giống nhau, thì tham chiếu sẽ phải giữ nguyên và khi đầu ra khác nhau, tham chiếu cũng phải khác. Để làm được điều đó, chúng ra sử dụng một kỹ thuật gọi là ghi nhớ. Một tuỳ chọn của library để triển khai đó là reselect. Với nó, chúng ta có thể viết lại như sau:

```
import { createSelector } from 'reselect';
export const getItems = 
  createSelector(state => state.items, items => Object.keys(items))
```

createSelector sẽ chấp nhận một đối số tuỳ ý, trong đó N-1 hàm đầu tiên là đầu vào cho selector và cái thứ N chính là đầu ra. Nó đảm bảo rằng miễn là đầu vào có cùng giá trị, thì đầu ra sẽ được lưu vào bộ nhớ đệm và được sử dụng lại. Nếu bất kì đầu vào nào có giá trị khác so với giá trị trong lần gọi cuối cùng, thì đầu ra từ hàm thứ N sẽ phải tính toán lại.

## **2. Action creator có tính nhất quán về mặt tham chiếu**

Một vài action creator có thể là những function đơn giản như thế này:

```
const fireAction = () => ({ type: 'ACTION', payload: {} });
```

Trong trường hợp trên, fireAction có một tham chiếu cố định, nhưng không may là không phải lúc nào cũng vậy. Đôi khi bạn cần chuyển các component props vào action creator để phân biệt dữ liệu được chuyển đến reducer. Ví dụ, hãy xem trường hợp sau:

```
// actions.js
export const fireAction = item => ({ type: 'ACTION', payload: { item } });

// Component.jsx
import React from 'react';
import { connect } from 'react-redux';
import { getItems } from './selectors';

function MyComponent({ item, fireActionWithItem }) {
  return <button onClick={fireActionWithItem}>{item}</button>
}

const mapDispatchToProps = (dispatch, ownProps) => ({ 
  fireActionWithItem: () => dispatch(fireAction(ownProps.item)) 
});

export default connect(null, mapDispatchToProps)(MyComponent);
```

Chúng ra muốn bind fireAction creator cho một phần item mà MyComponent lấy làm props. Để làm được việc đó, chúng ta "read" các props từ bên trong mapDispatchToProps và sử dụng chúng để tạo fireActionWithItem. Điều mà một số người sẽ không biết là bất cứ khi nào bạn sử dụng props của component từ mapDispatchToProps, react-redux sẽ tính toán lại đầu ra của mapDispatchToProps mỗi khi props của component thay đổi, nó có thể tạo ra các sự cố cho các component được khác được khai báo bên trong MyComponent. Hãy xem xét tình huống sau:

```
// actions.js
export const fireAction = item => ({ type: 'ACTION', payload: { item } });



// ExpensiveComponent.jsx
import React, { memo } from 'react';

function ExpensiveComponent({ onClick }) {
  return (
      <button onClick={onClick}>click me</button>
  )
}
export default memo(ExpensiveComponent);



// MyComponent.jsx
import React from 'react';
import { connect } from 'react-redux';
import { getItems } from './selectors';
function MyComponent({ item, fireActionWithItem, randomProp }) {
  return (
    <React.Fragment>
      <button onClick={fireActionWithItem}>{item}</button>
      <ExpensiveComponent onClick={fireActionWithItem} />
    </React.Fragment>
  )
}

const mapDispatchToProps = (dispatch, ownProps) => ({ 
  fireActionWithItem: () => dispatch(fireAction(ownProps.item)) 
});

export default connect(null, mapDispatchToProps)(MyComponent);
```

Chúng ta có 2 components: MyComponent và ExpensiveComponent. Như bạn có thể nhìn thấy, ExpensiveComponent được bọc trong memo() nên nó chỉ render lại khi props thay đổi. Mỗi khi randomProp trong MyComponent thay đổi, mapDispatchToProps sẽ được tính toán lại, fireActionWithItem sẽ nhận được 1 tham chiếu mới, MyComponent sẽ hiển thị lại và ExpensiveComponent cũng sẽ bắt buộc phải re-render lại vì prop của onClick sẽ khác. Nhưng ExpensiveComponent không nên được hiển thị lại vì không có gì ảnh hưởng đến nó ở đây cả.

Để chống lại các tình huống xấu như vậy, bạn có thể làm như sau:

```
// action.js
const fireAction = item => ({ type: 'ACTION', payload: { item } });

// Option 1
import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { getItems } from './selectors';
function MyComponent({ item, fireAction, randomProp }) {
  const fireActionWithItem = useCallback(() => fireAction(item), [item]);
  return (
    <React.Fragment>
      <button onClick={fireActionWithItem}>{item}</button>
      <ExpensiveComponent onClick={fireActionWithItem} />
    </React.Fragment>
  )
}

const mapDispatchToProps = { 
  fireAction
}

export default connect(null, mapDispatchToProps)(MyComponent);

// -------------------------------------------------------------- 

// Option 2
import React from 'react';
import { connect } from 'react-redux';
import { getItems } from './selectors';
function MyComponent({ item, fireActionWithItem, randomProp }) {
  return (
    <React.Fragment>
      <button onClick={fireActionWithItem}>{item}</button>
      <ExpensiveComponent onClick={fireActionWithItem} />
    </React.Fragment>
  )
}

const createFireAction = createSelector(
  dispatch => dispatch, 
  item => item, 
  (dispatch, item) => () => dispatch(fireAction(item))
);

const mapDispatchToProps = (dispatch, ownProps) => ({ 
  fireActionWithItem: createFireAction(dispatch, ownProps.item)
})

export default connect(null, mapDispatchToProps)(MyComponent);
```

## **3. Batch action để giảm renders**

Khi bạn phải sâu chuỗi các action này đến các action khác, tốt hơn hết bạn nên chia nhóm cho chúng và gọi bằng một batch duy nhất.

```
import { batch } from 'react-redux'
import { action1, action2 } from './actions';
// dispatches both actions at the same time
batch(() => {
  dispatch(action1());
  dispatch(action2());
});
```

Để sử dụng được nó chúng ra cần access và dispatch function. Có rất nhiều cách để làm việc này, tuỳ thuộc vào nơi thực hiện. Nó chủ yếu tập trung vào lí thuyết rằng ứng dụng của bạn được cấu trúc. Phải nói rằng kỹ thuật này hiếm khi được sử dụng, nhưng nó lại có thể mang lại hiệu năng trong những trường hợp đặt biệt. Batch sẽ giúp bạn có thể lưu giữ được những frame quý giá trong ứng dụng.