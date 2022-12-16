Đây là bài dịch, bài gốc mời các bạn xem ở đây : https://medium.freecodecamp.org/understanding-redux-the-worlds-easiest-guide-to-beginning-redux-c695f45546f6

Chào mừng các bạn đến với chương thứ 2 trong series tìm hiểu về Redux.

## Chương 2: Ứng dụng Redux đầu tiên của bạn

![](https://images.viblo.asia/07fbdf69-da27-4cc9-953e-a7035f257676.png)

> Chúng ta học hỏi thông qua ví dụ và kinh nghiệm trực tiếp bởi những giới hạn thực tế trong việc diễn đạt và chỉ dẫn bằng ngôn từ.
> Malcom Gladwell

Mặc dù tôi đã cố gắng để có thể giải thích các nguyên tắc của Redux theo cách mà bạn không thể nào quên, nhưng việc đó cũng có sự hạn chế nhất định.
Để giúp các bạn có thể hiểu sâu hơn nữa những nguyên tắc này, tôi sẽ trình bày với các bạn thông qua một ví dụ thực tế. Và bạn có thể gọi nó là `Ứng dụng Redux đầu tiên của tôi` nếu muốn.
Cách tiếp cận của tôi trong việc dạy học, đó là hướng dẫn thông qua các ví dụ có độ khó tăng dần. Vì thế, với những người mới bắt đầu, ví dụ này sẽ tập trung vào việc tái cấu trúc lại một ứng dụng chỉ có React bằng cách sử dụng Redux.
Mục tiêu ở đây là để hiểu rõ cách thức cài đặt và sử dụng Redux trong một ứng dụng đơn giản, và đồng thời cũng giúp các bạn đào sâu sự hiểu biết của bản thân đối với các khai niệm cơ bản và quan trọng của Redux.
Các bạn đã sẵn sàng chưa?
Dưới đây là ứng dụng React có tên là `Hello World` rất quen thuộc mà chúng ta sẽ làm việc cùng

![](https://images.viblo.asia/633c62c7-ed94-4326-a969-f48e2e1ff9eb.png)
> Ứng dụng Hello World căn bản.

Đừng có cười vội, bởi vì bạn sẽ học được cách rèn luyện các cơ bắp tư duy Redux từ những khái niệm *đã biết* như là React, cho đến những khái niệm *chưa biết* là Redux.

### Cấu trúc của ứng dụng React Hello World

Ứng dụng React chúng ta sẽ làm việc cùng được khởi tạo thông qua `create-react-app`, nên ắt hẳn bạn đã khá quen thuộc với cấu trúc của nó.
Bạn có thể download repo ứng dụng này từ [Github](https://github.com/ohansemmanuel/hello-redux) nếu muốn vừa đọc vừa làm - và cũng là cách học mà tôi rất hoan nghênh.

Có một file đầu vào có tên là `index.js` làm nhiệm vụ render một component với tên gọi `<App />` đến cây `DOM`.

Component chính với tên `App` bao gồm một component có tên là `<HelloWorld />`.

Component `<HelloWorld />` này sẽ nhận một thuộc tính có tên là `tech`, và thuộc tính này sẽ đóng vai trò là một kĩ năng công nghệ cụ thể được hiển thị cho người dùng.

Ví dụ, component `<HelloWorld tech="React" />` sẽ tạo ra nội dung như dưới đây.

![](https://images.viblo.asia/82d14a93-6ac7-4fa2-a79d-e64b5ab074c3.png)
> Ứng dụng Hello World cơ bản với state mặc định, "React"

Hoặc `<HelloWorld tech="Redux" />` sẽ tạo ra nội dung như dưới đây.
![](https://images.viblo.asia/6691c88d-8fec-430a-9b92-98e959235555.png)
> Ứng dụng Hello World cơ bản với thuộc tính tech được thay đổi thành "Redux"

Vậy là các bạn đã hiểu về cách hoạt động của ứng dụng rồi đấy.

Và đây là code của component `App`:

```javascript
import React, { Component } from "react";
import HelloWorld from "./HelloWorld";

class App extends Component {
 state = { 
  tech : "React"
}
render() {
  return <HelloWorld tech={this.state.tech}/>
}
}

export default App;
```

Hãy nhìn vào đoạn mô tả đối tượng `state`.

Chỉ có một trường ở trong này có tên là `tech`, được đặt trong đối tượng `state` và được truyền xuống cho `prop` (thuộc tính) của component `HelloWorld` thông qua đoạn code sau:

```javascript
<HelloWorld tech={this.state.tech}/>
```

Bạn chưa cần phải quan tâm về component HelloWorld đâu. Nó chỉ có vai trò là nhận một thuộc tính có tên là `tech` và thêm một vài đoạn code CSS mà thôi.

Bởi vì chúng ta đang tập trung vào Redux, nên tôi sẽ bỏ qua phần chi tiết của việc sử dụng CSS.

Và giờ là đến thử thách của chúng ta.

Chúng ta sẽ tái cấu trúc component `App` của chúng ta như thế nào để sử dụng `Redux`?

Chúng ta sẽ lấy đi đối tượng state của `App` và Redux quản lý đối tượng đó hoàn toàn bằng cách nào? Nhớ rằng Redux có vai trò là `quản lý state` cho ứng dụng của bạn.

Hãy bắt đầu trả lời những câu hỏi trên trong từng phần.

### Ôn lại kiến thức về Redux

Bạn có còn câu nhớ trích dẫn trong phần tài liệu chính thức về Redux không?

> Redux là một công-ten-nơ để lưu trữ state có thể dự đoán được, và dành cho các ứng dụng Javascript

Từ ngữ có tính chủ chốt trong câu trên là `công-ten-nơ lưu trữ state`.

Hay nói về mặt kỹ thuật, bạn muốn `state` của ứng dụng của bạn được quản lý bởi Redux.

Và đây là thứ mà biến Redux trở thành một `công-ten-nơ lưu trữ state`.

State trong component React của bạn vẫn tồn tại. Redux không cướp nó đi đâu cả.

Tuy nhiên, Redux sẽ quản lý state cho ứng dụng của bạn một cách **hiệu quả và toàn diện**.  Cũng giống như một nhà kho trong ngân hàng, Redux có `store` để làm việc này.

Với component `<App />` đơn giản chúng ta đang có, object state cũng rất đơn giản, chỉ là:

```javascript
{
 tech: "React"
}
```

Chúng ta sẽ cần lấy state này ra khỏi component `<App />` và đưa chúng quản lý bởi Redux.

Theo những giải thích của tôi trước đó, bạn nên nhớ lại sự tương đồng giữa Nhà kho trong ngân hàng và Store trong Redux. Nhà kho trong ngân hàng sẽ giữ tiền, còn Redux `store` giữ đối tượng `state` của ứng dụng.

Vậy bước đầu tiên để chúng ta tái cấu trúc component `<App />` sử dụng Redux là như thế nào?

Hẳn bạn cũng đoán ra rồi đấy, chúng ta sẽ loại bỏ state trong component `<App />`.

`store` của Redux sẽ có nhiệm vụ quản lý `state` của App. Và để làm điều này, trước hết chúng ta cần loại bỏ state đang dùng hiện tại trong `<App />`.

```javascript
import React, { Component } from "react";
import HelloWorld from "./HelloWorld";

class App extends Component {
 // the state object has been removed. 
render() {
  return <HelloWorld tech={this.state.tech}/>
}
}

export default App;
```

Giải pháp ở phía trên vẫn chưa hoàn thiện, nhưng ngay trong lúc này thì `<App />` đã không còn state nào cả.

Trước khi tiếp tục, hãy đảm bảo bạn đã cài Redux bằng việc chạy lệnh `yarrn install redux` từ CLI.Chúng ta sẽ cần package `redux` để làm mọi thứ đúng đắn.

### Tạo ra một Redux Store

Nếu như component `<App />` không quản lý state, vậy thì chúng ta cần tạo ra một Redux Store để quản lý state của ứng dụng.

Đối với Nhà kho của ngân hàng, một vài kỹ sư xây dựng và cơ khí sẽ được tuyển dụng để tạo ra một kho chứa tiền an toàn.

Với Redux, để tạo ra một kho chứa state có thể quản lý được, chúng ta lại không cần những thợ cơ khí, mà sẽ làm việc đó bằng cách thực hiện một vài hàm APIs của Redux hỗ trợ cho việc này.

Đây là code để tạo ra một Redux `store`:

```javascript
import { createStore } from "redux"; //an import from the redux library
const store = createStore();  // an incomplete solution - for now.
```

Đầu tiên chúng ta import hàm factory tạo store có tên là `createStore` từ Redux. Sau đó chúng ta thực thi hàm `createStore()` để tạo ra store.

Giờ đến hàm `createStore`, nó cần một vài tham số. Tham số đầu tiên là `reducer`, và cách thực thi hàm tạo store đầy đủ sẽ là `createStore(reducer)`

Tôi sẽ giải thích vì sao chúng ta cần hàm `reducer` ở đây

### Quan hệ giữa Store và Reducer

Quay trở lại với phép so sánh Redux và Ngân hàng.

Khi bạn đến ngân hàng để rút tiền, bạn sẽ gặp một nhân viên thu ngân. Sau khi bạn thông báo với Thu Ngân về dự định rút tiền có tên là `WITHDRAW_MONEY` của mình, họ sẽ đưa luôn cho bạn số tiền mà bạnd dã yêu câu chứ?

KHÔNG.

Để làm được việc này, Thu Ngân đầu tiên sẽ xác nhận rằng số dư trong tài khoản của bạn là đủ tiền để thực hiện giao dịch rút tiền bạn đang thông báo.

![](https://images.viblo.asia/4609b069-3363-4890-8732-ac250d0f2f23.png)
> Bạn có bao tiền và bạn muốn rút bao tiền?

Người Thu Ngân trước hết sẽ đảm bảo rằng bạn có đủ số tiền trong tài khoản để rút theo yêu cầu. Sử dụng máy tính, Thu Ngân sẽ có thể nhìn thấy tất cả những thông tin về tài khoản của bạn, và máy tính cũng giống như một công cụ giao tiếp với Nhà Kho chứa tiền của bạn.

Tóm lại, việc này sẽ đảm bảo Thu Ngân và Nhà Kho luôn luôn được đồng bộ với nhau như một đôi bạn tuyệt vời!

![](https://images.viblo.asia/c7e98b77-aaac-4ec8-b8c2-0d78f5037317.png)

Điều tương tự cũng được áp dụng với `STORE` trong Redux (đóng vai trò là nhà kho), và `REDUCER` (đóng vai trò là Thu Ngân), đều là đôi bạn cùng tiến và luôn đồng bộ với nhau.

Vì sao?

Vì `REDUCER` luôn luôn *nói chuyện* với `STORE`, giống như là thu ngân luôn luôn kết nối và đồng bộ với nhà kho thông qua máy tính.

Điều này giải thích tại sao khi thực hiện hàm tạo store, luôn luôn cần tham số là một `Reducer`, và điều này là bắt buộc. `Reducer` là tham số duy nhất yêu cầu được truyền vào hàm `createStore()`

![](https://images.viblo.asia/f49a8b53-f794-4652-8d7a-8ebf30f359ab.png)
> reducer là tham số bắt buộc cần truyền vào `createStore`

Trong phần tiếp theo, chúng ta sẽ có một cái nhìn rõ nét hơn về Reducer và thực hiện tạo ra một `Store` với tham số là `Reducer` thông qua hàm khởi tạo `createStore`

### Reducer

Chúng ta sẽ nói chi tiết và kỹ lưỡng hơn rất nhanh thôi, nhưng trước hết tôi sẽ cố gắng tóm tắt những ý chính.

Khi bạn nghe đến từ `Reducer` thì bạn nghĩ đến cái gì trong đầu?

Reduce - Giảm bớt? Đúng, tôi cũng nghĩ vậy, nó nghe giống như từ reduce vậy.

Theo [tài liệu chính thống](https://redux.js.org/glossary) của Redux thì: 

> Reducer là concept quan trọng nhất trong Redux.
![](https://images.viblo.asia/92d92a23-2cc5-445c-ae0f-33adf080233d.png)

Trong hệ thống ngân hàng, người Thu Ngân có vai trò rất quan trọng. Vậy thì với Reducer thì sao, nó làm gì và có vai trò gì?
Theo ngôn ngữ công nghệ, thì reducer còn được biết đến với tên gọi là `hàm reducing`. Bạn có thể không để ý, nhưng bạn đã từng làm việc với reducer nếu như đã một lần dùng qua hàm `Array.reduce()` . Và đây tôi sẽ giới thiệu lại về `hàm reducing` là gì.

Xem xét đoạn code dưới đây, với mục đích là tính tổng của các phần tử trong một mảng:

```javascript
let arr = [1,2,3,4,5]
let sum = arr.reduce((x,y) => x + y)
console.log(sum)  //15
```

Chi tiết hơn, hàm được truyền vào làm tham số khi thực hiện hàm `arr.reduce` được gọi là một `reducer`. Trong ví dụ này, `reducer` nhận vào 2 giá trị, một giá trị gọi là `accumulator` (biến tích luỹ) và một giá trị gọi là `currentValue` (giá trị hiện tại), với `x` là `accumulator` và `y` là `currentValue`.

Tương tự như thế, `Reducer` trong Redux cũng đơn giản là một hàm với hai tham số, tham số đầu tiên là trạng thái của app (`STATE`), và tham số thứ 2 là hành động - `ACTION`.

Ra vậy! Nhưng `STATE` và `ACTION` dùng để truyền vào `REDUCER` được lấy từ đâu nhỉ? Khi tôi học về Redux, tôi đã tự hỏi mình câu này một vài lần.

Trước tiên, chúng ta hãy nhìn lại ví dụ về hàm `Array.reduce()` một lần nữa:

```javascript
let arr = [1,2,3,4,5]
let sum = arr.reduce((x,y) => x + y)
console.log(sum)  //15
```

Hàm `Array.reduce` sẽ đóng vai trò truyền các tham số cần thiết là `x` và `y` cho hàm `reducer`. Vì thế các tham số không cần tự nhiên sinh ra từ không khí.
Điều tương tự cũng xảy ra trong Redux.

Reducer của Redux cũng được truyền tham số thông qua một hàm cố định. Bạn có đoán ra được đó là hàm nào không, đúng rồi chính là cái này:

```javascript
createStore(reducer)
```

Hàm khởi tạo `createStore`, cũng giống như hàm `Array.reduce`, sẽ đóng vai trò truyền các tham số vào hàm reducer.
Nếu bạn không e ngại đọc code, đây là một phiên bản cụ thể hoá việc implement hàm `createStore` ở trong source code của Redux:

```javascript
function createStore(reducer) {
    var state;
    var listeners = []

    function getState() {
        return state
    }
    
    function subscribe(listener) {
        listeners.push(listener)
        return unsubscribe() {
            var index = listeners.indexOf(listener)
            listeners.splice(index, 1)
        }
    }
    
    function dispatch(action) {
        state = reducer(state, action)
        listeners.forEach(listener => listener())
    }

    dispatch({})

    return { dispatch, subscribe, getState }
}
```

Đừng tự trách bản thân mình nếu bạn không hiểu được đoạn code trên nó làm cái quái gì. Điều mà tôi muốn nói đến ở đây là những điều trong cái hàm `dispatch` kìa. Bạn có thể thấy cách hàm `reducer` được gọi với `state` và `action`.

Với tất cả những điều đã nói từ nãy đến giờ, thì đoạn code tối thiểu để tạo ra một `store` trong Redux sẽ là như này:

```javascript
import { createStore } from "redux";  
const store = createStore(reducer);   //đã được cập nhật để truyền vào một reducer
```

### Quay trở lại với quá trình tái cấu trúc code

Giờ chúng ta sẽ cùng quay trở lại ví dụ tái cấu trúc code app React Hello World của chúng ta để sử dụng Redux.

Trước khi đi vào chi tiết, nếu bạn có vấn đề gì không hiểu ở bất cứ phần nào trước đó, hãy đọc lại một lần nữa và tôi đảm bảo rằng bạn có thể hiểu được rõ ràng. Nếu cần thiết thì bạn cứ đặt câu hỏi cho tôi nhé.

Đây là code đến thời điểm hiện tại chúng ta đã có:

```javascript
import React, { Component } from "react";
import HelloWorld from "./HelloWorld";

 import { createStore } from "redux";  
 const store = createStore(reducer);  

 class App extends Component {
 render() {
   return <HelloWorld tech={this.state.tech}/>
 }
}

export default App;
```

Hoàn toàn dễ hiểu nhỉ?

Bạn có thể nhận thấy có một vấn đề trong đoạn code này chứ, hãy nhìn dòng số 4.

Reducer được truyền vào hàm `createStore` chưa tồn tại, và chúng ta phải tạo nó. Reducer cũng chỉ là một hàm thôi mà, bạn còn nhớ chứ?

Hãy tạo một thư mục có tên là `reducers` và tạo một file có tên là `index.js` ở trong đó. Về bản chất, hàm reducer của chúng ta sẽ được đặt trong đường dẫn `src/reducers/index.js`.

Đầu tiên hãy tạo ra một hàm đơn giản và export ra trong file index.js:

```javascript
export default () => {
}
```

Nhớ rằng hàm reducer của chúng ta cần nhận vào 2 tham số, như đã mô tả ở trên. Trước hết, chúng ta sẽ chỉ quan tâm đến tham số đầu tiên là `state`. Truyền tham số `state` đó vào hàm, chúng ta sẽ được như sau:

```javascript
export default (state) => {
}
```

Không tệ lắm.
Một hàm reducer sẽ luôn luôn trả về một thứ già đó. Trong ví dụ về hàm `Array.reduce()` đã mô tả ở trước đó, chúng ta đã trả về kết quả là tổng của các giá trị trong mảng.

Với reducer trong Redux, bạn luôn luôn trả về *state mới* của ứng dụng của bạn.

Hãy để tôi giải thích kỹ hơn đoạn này.

Sau khi bạn đi đến ngân hàng và tạo ra một giao dịch rút tiền thành công, thì số tiền còn lại của bạn được giữ trong ngân hàng sẽ không còn giống như lúc đầu nữa. Nếu bạn rút 200 đô, thì tài khoản cuả bạn sẽ bị giảm đi 200 đô (Đương nhiên rồi).

Một lần nữa, Thu Ngân và nhà băng sẽ đồng bộ với nhau để cập nhật số tiền còn lại trong tài khoản của bạn.

Cũng giống như Thu Ngân, đó cũng chính là những gì mà reducer làm việc. Reducer sẽ luôn trả về *state mới* của ứng dụng. Trong trường hợp một số thứ đã thay đổi. Giá trị của tài khoản không thể vẫn giữ nguyên mặc dù hành động rút tiền đã được thực hiện.

Chúng ta sẽ đi vào chi tiết bên trong về cách thay đổi/cập nhật state sau này. Hiện tại, hãy giữ một niềm tin mù quáng để tiếp tục.

Giờ quay trở lại với vấn đề chúng ta đang giải quyét. Bởi vì không quan tâm đến việc thay đổi và cập nhật state ở thời điểm này, chúng ta sẽ giữ *state mới* được trả về cũng giống như *state cũ* đã được truyền vào.

Trong hàm reducer chúng ta sẽ làm thế này:

```javascript
export default (state) => {
	    return state	
}
```

Điều này cũng giống như bạn đến ngân hàng nhưng không làm gì cả, thì tài khoản của bạn vẫn sẽ được giữ nguyên.
Và ở thời điểm này, bất kì `ACTION` - hành động nào cũng chưa thể thực hiện vì chúng ta chưa truyền tham số action vào reducer.

### Tham số thứ 2 trong hàm createStore

Nếu bạn đến ngân hàng và gặp Thu Ngân để hỏi về số dư trong tài khoản của mình, thì họ sẽ tra cứu và phản hồi lại cho bạn.
![](https://images.viblo.asia/affc6c69-3d26-4c76-9300-26f1af9cc6d1.png)

Nhưng họ làm điều đó thế nào?

Khi lần đầu tiên tạo một tài khoản ở ngân hàng, ắt hẳn bạn đã từng tra cứu thông tin cùng với việc nạp một ít tiền vào tài khoản hoặc không.

![](https://images.viblo.asia/73a94832-aae1-41f4-b589-69297702cb33.png)
> Tôi cần một tài khoản và nạp vào đó 500 đô.

Hãy gọi hành động này là Nạp tiền lần đầu vào tài khoản.

Quay trở lại với Redux.

Bằng cách tương tự, khi tạo ra một `STORE` trong redux (tương đương với nhà kho chứa tiền của ngân hàng), sẽ có một tuỳ chọn giống như việc nạp tiền lần đầu tiên. Nói theo ngôn ngữ của Redux, thì đó là giá trị state khởi tạo - `initialState` của ứng dụng.

Còn trong code, `initialState` là tham số thứ 2 được truyền vào hàm `createStore`.

```javascript
const store = createStore(reducer, initialState);
```

Trước khi thực hiện bất kì một `action` giao dịch tiền tệ nào, nếu bạn yêu cầu xem thông tin tài khoản thì giá trị của số tiền nạp lần đầu luôn luôn trả về cho bạn.

Sau đó, khi bạn thực hiện bất kì một giao dịch rút gửi tiền nào thì số tiền đầu tiên này sẽ được cập nhật.

Điều tương tự cũng xảy ra trong Redux.

Đối tượng được truyền vào `initialState` cũng giống như là giá trị tiền đầu tiên mà chúng ta nạp vào tài khoản. Giá trị của `initialState` sẽ luôn luôn được trả về như là `state` hiện tại của ứng dụng chừng nào bạn thực hiện update thông qua thực hiện một `action`.

Chúng ta giờ sẽ cập nhật code để truyền vào một `state khởi tạo`:


```javascript
const initialState = { tech: "React " };
const store = createStore(reducer, initialState);
```

Để ý rằng `initialState` chỉ là một đối tượng và nó chính là những giá trị chúng ta đã thiết lập ở state mặc định trong ứung dụng React trước khi thực hiện refactor.

Giờ sẽ là tất cả những đoạn code chúng ta có đến thời điểm này, với `reducer` đã được import vào `App`.

```javascript
## App.js

import React, { Component } from "react";
import HelloWorld from "./HelloWorld";
import reducer from "./reducers";
import { createStore } from "redux";  

const initialState = { tech: "React " };
const store = createStore(reducer, initialState);

class App extends Component {
 render() {
   return <HelloWorld tech={this.state.tech}/>
 }
 }

export default App;

## reducers/index.jsjs
export default state  => {
	    return state	
}
```

Nếu thử chạy ứng dụng, bạn sẽ nhận được lỗi. Nguyên nhân là vì thuộc tính `tech` được truyền vào container `<HelloWorld />`. Nó vẫn đang được đọc thông qua `this.state.tech`. Tuy nhiên chúng ta giờ không còn state ở trong component App nữa, vì thế mà nó sẽ trả về `undefined`. Do đó chúng ta sẽ sửa lại đoạn này. Và giải pháp khá là đơn giản. Vì `store` của Redux hiện tại đang quản lý state của ứng dụng chúng ta, nên điều đó có nghĩa là đối tượng `STATE` có thể lấy được thông qua `store`. Nhưng làm thế nào?

Bất cứ khi nào bạn tạo ra một store với hàm `createStore()`, thì store được tạo ra sẽ có 3 hàm để chúng ta sử dụng.

Một trong số chúng có tên là `getState()`. Khi gọi hàm này, `store` sẽ luôn trả về state hiện tại của ứng dụng. Trong trường hợp chúng ta đang sử dụng, `store.getState()` sẽ trả về đối tượng `{ tech: "React" }` bởi vì nó là giá trị `INITIAL STATE` chúng ta đã truyền vào khi tạo store mới. Bạn đã thấy chúng liên kết với nhau như thế nào chưa?

Ở đây thuộc tính `tech` sẽ được truyền vào component `<HelloWorld />` giống như dưới đây:

```javascript

## App.js

import React, { Component } from "react";
import HelloWorld from "./HelloWorld";
import { createStore } from "redux";  

const initialState = { tech: "React " };
const store = createStore(reducer, initialState);  

class App extends Component {
 render() {
   return <HelloWorld tech={store.getState().tech}/>
 }
 }

## reducers/Reducer.js

export default state => {
	    return state	
}
```

![](https://images.viblo.asia/b73a173f-ac1c-4b96-bacf-7f769982d049.png)

Và bạn vừa học được cơ bản về Redux cũng như tái cấu trúc lại app React của mình một cách thành công để sử dụng Redux rồi đó.

Ứng dụng React giờ đã được quản lý state bởi Redux. Bất cứ thứ già chúng ta cần từ đối tượng `state` sẽ được lấy thông qua `store` như ví dụ ở trên.

Hy vọng rằng bạn đã hiểu cặn kẽ về toàn bộ quá trình refactor này.

Để xem lại một cách tổng quát, bạn có thể xem lại toàn bộ sự thay đổi thông qua [Git diff này](https://github.com/ohansemmanuel/hello-redux/compare/solution?expand=1).

Với dự án "Hello World" vừa qua, chúng ta đã có một cái nhìn cơ bản và tổng quan về những concept trong Redux. Mặc dù đây chỉ là một dự án bé xíu xiu, nhưng nó đã cho chúng ta hiểu những điều căn bản và giá trị nhất để tiếp tục!

### Một số lưu ý

Ở ví dụ về **Hello World** ở trên, một giải pháp khác bạn có thể nghĩ ra để lấy state từ store sẽ giống như sau:

```javascript
class App extends Component {
  state = store.getState();
  render() {
    return <HelloWorld tech={this.state.tech} />;
  }
}
```

Bạn nghĩ sao nào? Cái này có hoạt động không.

Để nhắc lại một chút, dưới đây là 2 cách để khởi tạo một state của React Component.

(a)
```javascript
class App extends Component {
 constructor(props) {
   super(props);
   this.state = {}
  }
}
```

(b)
```javascript
class App extends Component {
  state = {}
}
```

Giờ, quay trở lại với câu hỏi, thì đáp án đơn giản là được, giải pháp ở trên sẽ hoạt động hoàn toàn bình thường.
`store.getState()` sẽ lấy state hiện tại từ `STORE` của Redux.

Tuy nhiên phép gán `state = store.getState()` sẽ truyền state lấy được từ Redux về cho component `<App />`. Chi tiết hơn, thì câu lệnh return ở trong hàm `render` với đoạn code `<HelloWorld tech={this.state.tech} />` sẽ trở nên có nghĩa. Lưu ý ở đây là chúng ta đang đọc `this.state.tech` **chứ không phải là** `store.getState().tech`.

Mặc dù nó vẫn hoạt động tốt nhưng sẽ đi ngược với lý thuyết mong muốn của Redux.

Nếu như trong ứng dụng của bạn mà bạn chạy hàm `this.setState()`, thì state của App sẽ được cập nhật mà không có sự trợ giúp của Redux. Và nó lại là nguyên lý mặc định của React chứ không phải là cái bạn muốn. Bạn muốn `state` của mình được quản lý bởi `STORE` của Redux và là nguồn dữ liệu duy nhất tin tưởng (single source of truth).

Cứ mỗi khi bạn lấy state thông qua `store.getState()` hoặc cập nhật/thay đổi `state` (sẽ được mô tả sau), bạn muốn rằng tất cả đều được quản lý bởi Redux chứ không phải qua hàm `setState()`.

Bởi vì Redux quản lý state của ứng dụng, tất cả những điều bạn cần làm là lấy ra `state` từ `STORE` của Redux và đưa vào props của bất kì component nào yêu cầu.

Một câu hỏi lớn khác mà bạn có thể thắc mắc, đó là *Vì sao tôi phải trải qua tất cả những công việc stress này chỉ để state của tôi được quản lý bởi Redux?*

Reducer, Store, createStore, ....

Bạn cũng đã từng nghĩ giống tôi đó. Tuy nhiên, hãy thừa nhận một thực tế là bạn sẽ không thể chỉ đến ngân hàng và không tuân theo quy trình mà vẫn rút được tiền. Tiền là của bạn, nhưng quy trình rút tiền thì bạn cần tuân thủ.

Và điều tương tự cũng giống với Redux. Redux có một quy trình riêng để làm việc. Chúng ta cần phải học để biết quy trình đó - và, bạn đang tiến bộ dần đấy!

### Nhược điểm và tổng kết

Chương này quả thực rất thú vụ. Chúng ta đã tập trung hầu hết vào việc thiết lập một nền tảng vững chắc để đón nhận thêm những thứ thú vị hơn.
Dưới đây là danh sách một vài thứ chúng ta đã học trong chương này:

- Redux là một container chứa state có thể dự đoán được, dành cho các ứng dụng Javascript.
- Hàm `createStore` của Redux là hàm factory được dùng để tạo ra một `STORE`
- `Reducer` là tham số yêu cầu duy nhất cần truyền vào hàm `createStore()`
- `Reducer` chỉ là một hàm, nhận **HAI** tham số. Tham số đầu tiên là `STATE` của ứng dụng, và một tham số là `ACTION`
- Một `Reducer` luôn luôn trả về state mới của ứng dụng
- State khởi tạo của ứng dụng được gọi là `initialState` và có thể tuỳ chọn truyền vào tham số thứ 2 khi gọi hàm `createStore`
- `Store.getState()` sẽ trả về state hiện tại của ứng dụng. (trong đó STORE là một STORE của Redux)

### Bài tập

Tôi nghiêm túc yêu cầu các bạn không bỏ qua bài tập. Đặc biệt nếu như bạn chưa tự tin vào kĩ năng Redux của mình và muốn đạt được kết quả tốt nhất từ hướng dẫn này.

Vì thế hãy bật dev mode của bản thân lên và code đi :)

Đồng thời nếu bạn muốn gửi feedback về bất cứ phần nào trong bài giải của mình, hãy tweet tôi với hashtag #UnderstandingRedux bất cứ lúc nào, và tôi sẽ rất vui mừng xem cho các bạn. Tôi không cam đoan mình sẽ đọc hết từng tweet một, nhưng tôi sẽ thử!

Khi bạn đã làm bài tập ngon lành rồi, tôi sẽ gặp bạn ở phần kế tiếp.

Nhớ rằng để đạt hiệu quả trong việc đọc những nội dung dài, chúng ta có thể chia nó ra thành những phần ngắn hơn. Những bài tập này sẽ giúp bạn làm được điều này. Bạn dành ra chút thời gian nghỉ, thử giải bài tập và tiếp tục đọc. Đó là cách hiệu quả để học.

![](https://images.viblo.asia/b394e8f6-d0da-4604-8371-e99f4bbf3689.png)

Nếu bạn muốn xem bài giải cho các bài tập này, tôi đã đính kèm chúng ở trong các bài tập ở trong ebook. Bạn sẽ tìm thấy hướng dẫn làm thế nào để code được đi kèm toàn bộ lời giải khi download Ebook (miễn phí).

Và đây là bài tập cho phần này

#### Refactor ứng dụng user card để sử dụng Redux

Trong các file code đi kèm ebook, bạn sẽ tìm thấy một ứng dụng hiển thị user card được viết hoàn toàn bằng React. Nhiệm vụ của bạn là chuyển phần quản lý state sang cho Redux.

![](https://images.viblo.asia/b9e8a3ae-a190-45a3-9216-2918c441b31a.png)