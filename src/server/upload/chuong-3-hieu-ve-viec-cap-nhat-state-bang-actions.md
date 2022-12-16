Đây là bài dịch, bài gốc các bạn có thể xem ở đây: https://medium.freecodecamp.org/understanding-redux-the-worlds-easiest-guide-to-beginning-redux-c695f45546f6

Chào mừng các bạn tiếp tục đến với chương 3 trong series tìm hiểu về Redux

## Chương 3: Hiểu về việc cập nhật State bằng Actions

![](https://images.viblo.asia/7f9de285-0ca9-447d-87d5-913dc566193b.png)

Ở các chương trước, sau khi đã thảo luận về các concept cơ bản và quan trọng nhất trong Redux, chúng ta giờ sẽ bắt đầu sử dụng Redux để tạo ra và học hỏi một vài điều thú vị hơn nữa.

Trong chương này, tiếp tục phương pháp học bằng thực hành, tôi sẽ hướng dẫn thông qua việc thực hiện một dự án nho nhỏ để tìm hiểu sâu hơn nữa về Redux.

Vậy dự án lần này chúng ta làm sẽ là gì?

Tôi đã chọn được một ví dụ hoàn toàn phù hợp cho các bạn. Trước tiên hãy xem hình ảnh minh họa ở dưới đây:

![](https://images.viblo.asia/d7b48ca9-5867-462d-aced-a942d62e6028.png)
> Cập nhật giao diện cho ứng dụng Hello world

Trông có vẻ khá là giống với ví dụ ở chương trước - với một vài thay đổi. Lần này chúng ta sẽ xử lý một vài thao tác của người dùng. Mỗi khi người dùng bấm bất kì nút nào ở phía dưới, chúng ta sẽ cập nhật trạng thái của ứng dụng với giai diện thay đổi giống như ảnh GIF dưới đây:

![](https://images.viblo.asia/dc08e9b9-5a06-4cee-a12e-089dab19fd16.gif)

Và đây là thứ khác biệt so với ví dụ ở chương trước đó. Trong kịch bản hoạt động lần này, người dùng đang thực hiện những hành động cụ thể ảnh hưởng đến state của ứng dụng. So với ứng dụng ban đầu, tất cả những gì chúng ta đã làm là hiển thị trạng thái với state khởi tạo của ứng dụng mà không có bất kì hành động nào của người dùng được xử lý.

### Redux Action là cái gì?

Mỗi khi bạn đến ngân hàng, Thu Ngân sẽ đóng vai trò tiếp nhận các hành động của bạn, hay nói cách khác, là mục đích khiến bạn đến ngân hàng. Ở ví dụ trước đó, hành động đấy có tên là `WITHDRAWAL_MONEY` (rút tiền). Và các duy nhất để bạn có thể mang tiền ra khỏi nhà băng là trình bày và tương tác với nhân viên Thu Ngân.

Và điều tương tự cũng áp dụng cho Reducer trong Redux.

Không giống như việc gọi hàm `setState()` ở trong React thuần, cách duy nhất bạn có thể cập nhật state của ứng dụng Redux phải là truyền đạt `intent` (mục đích) của bạn cho `Reducer`.

Nhưng bằng cách nào? Bằng cách `dispatch` (gửi đi) các action!

Trong thế giới thực tế, bạn biết rõ hành động mình muốn làm là gì. Bạn có thể viết hành động đó ra một tờ ghi chú và đưa cho nhân viên Thu Ngân xử lý.

Và cách xử lý trong Redux cũng tương tự như vậy. Có duy nhất một vấn đề ở đây là, làm thế nào để định nghĩa ra một action ở trong Redux? Chắc chắn không phải là nói với thu ngân hay viết ra một tờ giấy được rồi.

Tuy nhiên tin tốt cho bạn đây.

Một action có thể được mô tả một cách chính xác và đầy đủ thông qua một đối tượng Javascript đơn giản. Và không cần gì hơn cả.

Có một điều duy nhất chúng ta cần lưu ý ở đây. Tất cả các actions đều phải có một trường tên là `type`. Và trường này sẽ đóng vai trò mô tả `intent` của `action`.

Trong câu chuyện về ngânn hàng, nếu chúng ta mô tả hành động của mình với thu ngân thì nó sẽ trông như thế này:

```javascript
{
  type: "withdraw_money"
}
```

Và đó là tất cả, thật đấy.

Một action trong Redux được môt tả dưới dạng một plain object (object cơ bản) trong JS.

Hãy nhìn lại về action phía trên.

Bạn có nghĩ rằng chỉ với trường `field` là đủ để mô tả chính xác hành động rút tiền mà bạn đang muốn thực hiện hay không.

Hmmm. Tôi thì không nghĩ vậy. Chúng ta cần thêm số tiền cần rút nữa chứ nhỉ?

Sẽ có rất nhiều trường hợp mà các action của bạn cần thêm các dữ liệu để có một mô tả rõ ràng nhất. Khi xem xét ví dụ ở trên, tôi đề nghị mô tả về action dưới đây sẽ rõ ràng hơn.

```javascript
{
  type: "withdraw_money",
  amount: "$4000"
}
```

Hiện giờ đã có đủ thông tin để mô tả về action chúng ta cần. Để giữ cho ứng dụng của chúng ta dễ hiểu nhất có thể, hãy tạm thời bỏ qua một số thông tin chi tiết mà action có thể chứa thêm, ví dụ như là số tài khoản ngân hàng của bạn chẳng hạn.

Với Redux, ngoài điều kiện bắt buộc về trường `type`, thì cấu trúc của action trong ứng dụng của bạn là hoàn toàn do bạn tự quyết.

Tuy nhiên, cách áp dụng phổ biến cho cấu trúc dữ liệu của action sẽ là có một trường `field` và một trường `payload` giống như dưới đây:

```javascript
{
  type: " ",
  payload: {}
}
```

Trường `type` đóng vai trò mô tả về action, và tất cả những dữ liệu khác bổ sung cho action sẽ được đặt trong đối tượng `payload`.

Ví dụ như là:

```javascript
{
  type: "withdraw_money",
  payload: {
     amount: "$4000"
  }
}
```

Và đây chính là mô tả về một action trong Redux.


### Xử lý Action trong Reducer

Giờ bạn đã hiểu một action nghĩa là gì, và giờ chúng ta sẽ đến với phần quan trọng, đó là xem action có tác dụng gì trong thực tế.

Trước đó, tôi đã nói rằng một `reducer` sẽ nhận vào **hai tham số**. Một là `state`, và cái còn lại chính là `action`.

Dưới đây là một Reducer đơn giản:

```javascript
function reducer(state, action) {
   // return new state
}
```

`action` được truyền vào thông qua tham số thứ 2 của hàm định nghĩa Reducer. Nhưng chúng ta chưa thực hiện bất cứ thao tác nào với tham số action đó trong hàm Reducer cả.

Để xử lý action được truyền vào reducer, thông thường bạn sẽ cần phải sử dụng `switch` như thế này:

```javascript
function reducer (state, action) {
	switch (action.type) {
		 case "withdraw_money":
			//do something
			break;
		case "deposit-money":
			 //do something
			break;
		default:
			return state;
			 }
}
```

Một vài người có thể không thích `switch`, nhưng về cơ bản nó là một chuỗi `if/else` cho các giá trị có thể xảy ra cho một biến số xác định.

Đoạn code ở trên sẽ tuỳ theo giá trị của trường `type` trong action để thực hiện đoạn code tương ứng với action đó. Về kĩ thuật, việc `làm gì đó` với mỗi action cũng yêu cầu phải trả về một state mới.

Để tôi giải thích kỹ hơn đoạn này.

Giả sử rằng bạn có 2 nút với tên gọi lần lượt là *nút số 1* và *nút số 2* trong một trang web cụ thể, và state của app của bạn có cấu trúc như sau:

```javascript
{
	 isOpen: true,
	 isClicked: false,
  }
```

Khi *nút số 1* được bậm, bạn muốn đảo giá trị của trường `isOpen` trong state. Trong ngữ cảnh của một ứng dụng Redux, giải pháp này hoàn toàn đơn giản. Mỗi khi *nút số 1* được bấm, bạn có thể làm như sau: `this.setState({isOpen: !this.state.isOpen})`.

Đồng thời cũng giả sử rằng *nút số 2* khi được bấm, bạn sẽ đảo giá trị của trường `isClicked`, thì giải pháp cũng hoàn toàn đơn giản: `this.setState({isClicked: !this.state.isClicked})`.

Khá là ổn đúng không.

Tuy nhiên với ứng dụng Redux, bạn không thể sử dụng `setState()` để cập nhật đối tượng state được quản lý bởi Redux.

Mà trước đó bạn phải tạo và gửi đi (dispatch - từ sau này mình sẽ dùng từ này thay cho tiếng Việt là gửi đi, vì sẽ được dùng rất nhiều trong Redux nên các bạn nên làm quen và nhớ nó).

Giả sử rằng action được tạo ra sẽ như thế này:

- Action số 1:
 
```javascript
{
	type: "is_open"
}
```

- Action số 2: 

```javascript
{
	type: "is_clicked"
}
```

Trong một ứng dụng Redux, tất cả các action đều phải được gửi đến và xử lý bởi reducer. Vì thế trong ví dụ này, cả 2 action số 1 và 2 đều sẽ được xử lý chung bởi một reducer. 

Trong trường hợp này, làm thế nào để reducer phân biệt được các action đây? Hẳn các bạn có thể dễ dàng đoán được đúng không, bằng cách sử dụng `action.type`, chúng ta có thể tự tin xử lý cả 2 action trong cùng một reducer.

Và đây là đoạn code mà tôi muốn nói đến:

```javascript
function reducer (state, action) {
	switch (action.type) {
		case "is_open":
			return;  //return new state
		case "is_clicked":
			return; //return new state
		default:
		return state;
	}
}
```

![](https://images.viblo.asia/df1106ce-5613-42ef-b8e5-1c59fec234c4.png)

Giờ bạn sẽ thấy tại sao sử dụng toán tử `switch` ở đây sẽ hết sức hữu dụng. Tất cả các action vì đều phải được xử lý thông qua reducer, nên nó cần được phân biệt và xử một cách độc lập.

Trong phần tiếp theo, chúng ta sẽ tiếp tục việc xây dụng cái app nho nhỏ để có thể làm được như dưới đây:

![](https://images.viblo.asia/809a1bb1-4506-44ea-b707-d3896895c7af.gif)

### Tìm hiểu về các Action trong Ứng dụng mẫu

Như tôi đã giải thích trước đó, mỗi khi có một mong muốn cập nhật state của ứng dụng, thì chúng ta đều phải dispatch một `action`.

Và kể cả cái mong muốn cập nhật state đó có đến từ việc người dùng bấm vào nút nào đó, hay một sự kiện bị timeout, hay bắt đầu từ một request Ajax, thì luật vẫn gióng nhau hết, bạn cần phải dispatch một `action`.

Điều này cũng tương tự đối với app của chúng ta.

Vì chúng ta định cập nhật lại state của ứng dụng, nên mỗi khi bất kì một nút nào được bấm, chúng ta sẽ cần phải dispatch một `action`.

![](https://images.viblo.asia/4a5d874f-ca70-4e38-b233-3607480b8837.png)

Đầu tiên, chúng ta sẽ cùng nhau định nghĩa các actions.

Hãy thử trước khi đọc tiếp để xem bạn có làm đúng không nhé.

Và đây là những gì tôi sẽ sử dụng:

- Action cho nút `React`:

```javascript
{
    type: "SET_TECHNOLOGY",
    text: "React"
  }
```

- Action cho nút `React-Redux`:

```javascript
{
     type: "SET_TECHNOLOGY",
     text: "React-redux"
   }
```

- Và cuối cùng, Action cho nút `Elm`:

```javascript
{
   type: "SET_TECHNOLOGY",
  text: "Elm"
}
```

Quá là đơn giản đúng không? Để ý rằng ở đây cả 3 action đều có cùng một giá trị cho trường `field`. Đó là vì cả 3 nút đều sẽ thực hiện những điều giống nhau. Nếu như chúng là những người khách hàng ở ngân hàng, thì chúng sẽ cùng muốn rút tiền với những số tiền khác nhau. Do đó giá trị trường `type` của action sẽ là `DEPOSIT_MONEY` nhưng với các giá trị khác nhau cho trường `amounts`

Đồng thời bạn cũng có thể để ý là giá trị cho trường `type` cuả action thì đều được mô tả dưới dạng string có chữ cái được viết hoa. Và việc đó là có chủ đích cả đấy. Mặc dù nó không phải là bắt buộc, nhưng nó là style code rất phổ biến trong cộng đồng Redux.

Hy vọng rằng bạn đã hiểu được cách tôi tạo ra các action là như thế nào.

### Giới thiệu về Action Creators

Hãy nhìn vào các action mà chúng ta vừa tạo ra ở trên, bạn có thể nhận thấy là chúng ta đã lặp lại một số hành động.

Ví dụ như là chúng đều có chung một giá trị cho trường `type`. Nếu chúng ta phải dispatch 3 actions này ở nhiều chỗ khác nhau, thì chúng ta sẽ phải lặp lại các đoạn code trên ở tất cả các vị trí cần thiết. Và điều này thì không tốt lắm, đặc biệt với tư tường phải luôn giữ cho code của chúng ta DRY.

Vậy thì chúng ta có thể làm gì để giải quyết vấn đề này không? Đương nhiên là có rồi. **Action Creators** sẽ là thứ bạn cần. Có vẻ như là Redux có một loạt các cái tên hào nhoáng nhỉ? Reducer, Action và giờ là Action Creator.

Hãy để tôi giải thích nó là gì.

Action Creator về cơ bản là những hàm giúp bạn tạo ra các action. Và chỉ thế mà thôi. Nó sẽ là các hàm có giá trị trả về là action.

Trong ví dụ cụ thể mà chúng ta đang implement, ta có thể tạo ra một hàm nhận vào một tham số tên là `text` và trả về một action như này:

```javascript
export function setTechnology (text) {
  return {
     type: "SET_TECHNOLOGY",
     tech: text
   }
}
```

Và giờ chúng ta sẽ không phải lo đến việc code bị lặp ở khắp mọi nơi nữa. Chúng ta có thể sử dụng hàm tạo action `setTechnology` ở bất kỳ đâu, và sẽ nhận lại một action! Và đó là lợi ích của action creator. Sử dụng ES6, hàm action creator có thể còn viết được gọn hơn như sau:

```javascript
const setTechnology = text => ({ type: "SET_TECHNOLOGY", text });
```

![](https://images.viblo.asia/5a38c146-99ea-4ac9-8479-cef773bb3d8c.png)


### Ghép tất cả lại với nhau

Tôi đã giải thích các thành phần cần thiết và quan trọng để có thể nâng cấp ứng dụng Hello World giống như tôi đã mô tả ở đầu chương. Và giờ chúng ta sẽ áp dụng tất cả những điều đó để hiện thực hoá nó thôi các bạn.

Trước hết, tôi muốn nói về cấu trúc thư mục cho ứng dụng của chúng ta.

Mỗi khi bạn đến ngân hàng, Thu Ngân dường như sẽ ngồi ở hộp hoặc văn phòng của họ. Và Két bạc thì được giữ an toàn ở phòng bảo an. Vì những lý do và mục đích tốt đẹp, mọ thứ đã được tổ chức với cấu trúc như vậy ở hầu hết các ngân hàng. Thứ nào ở đúng chỗ thứ đó.

Liên tưởng lại vớii Redux, chúng ta cũng có thể tổ chức thư mục dự án giống như vậy.

Một phương pháp phổ biến là có những thư mục riêng biệt để chứa những thành phần chính của một app.

Khi nói về những thành phần chính, ý tôi là `reducer`, `action` và `store`.

Và thông thường thì người ta sẽ tạo ra 3 thư mục chính trong thư mục gốc của ứng dụng, và đặt tên cho từng thư mục giống với tên của từng thành phần.

Đây không phải là điều bắt buộc hay chắc chắn bạn phải tuân theo khi quyết định cấu trúc cho ứng dụng của mình. Nhưng với những ứng dụng lớn thì cách chia thư mục như thế này là một phương pháp khá ổn.

Chúng ta sẽ tái cấu trúc, bắt đầu bằng việc tổ chức lại cấu trúc thư mục đã có. Hãy tạo một vài thư mục với tên là `reducers, store, actions`, và nó sẽ trông như thế này:

![](https://images.viblo.asia/2f7a0cd7-9fb0-40e2-a106-b2b7d97d9929.png)

Trong mỗi thư mục, hãy tạo một file `index.js`. Đây sẽ là file đóng vai trò là điểm truy cập cho mỗi thành phần chính của Redux (reducers, actions và store). Tôi gọi nó là các thành phần chính cũng như các diễn viên chính trong film vậy. Đó là những thành phần chủ yếu cho một hệ thống Redux.

Giờ chúng ta sẽ đi tái cấu trúc ứng dụng đã hoàn thành trong Chương 2 với việc sử dụng cấu trúc thư mục mới.

```javascript

##file store/index.js

import { createStore } from "redux";
import reducer from "../reducers";

const initialState = { tech: "React " };
export const store = createStore(reducer, initialState);
```

Đây cũng giống như những gì chúng ta đã làm ở phần trước. Điều khác biệt duy nhất là store giờ sẽ được tạo ở file `index.js` riêng của nó, cũng giống như chúng ta có một hộp nhân viên/văn phòng riêng cho từng thành phần chính của Redux vậy.

Store cũng cần có thể được truy cập ở khắp mọi nơi trong ứng dụng, và chúng ta có thể làm được điều đó thông qua câu lệnh import như sau: `import store from "./store"`.

Và kèm theo đó thì file `App.js` cũng có một chút thay đổi so với lúc trước.

```javascript
## file App.js

import React, { Component } from "react";
import HelloWorld from "./HelloWorld";
import ButtonGroup from "./ButtonGroup";
import { store } from "./store";

class App extends Component {
  render() {
    return [
      <HelloWorld key={1} tech={store.getState().tech} />,
      <ButtonGroup key={2} technologies={["React", "Elm", "React-redux"]} />
    ];
  }
}

export default App;
```

Điều gì đã thay đổi ở đây?

Ở dòng thứ 4, store được import từ **cái hộp** của chính nó. Và đồng thời cũng có một component có tên là `<ButtonGroup />` sẽ nhận vào một mảng là tên các công nghệ, sau đó sẽ hiển thị ra các nút tương ứng với các công nghệ được truyền vào. Component `ButtonGroup` sẽ đảm nhiệm việc hiển thị ra 3 nút ở phía dưới dòng chữ "Hello World".

![](https://images.viblo.asia/217ed4e4-84a5-4ae5-b43d-deb8a0a9e8c9.png)

Đồng thời bạn có thể nhận thấy là component `App` của chúng ta sẽ trả về một mảng. Đó là một cập nhật từ `React 16`. Với React 16, bạn không phải bao các thành phần `JSX` trong một element ngoài cùng nữa, mà có thể sử dụng một mảng, nhưng cần truyền vào giá trị cho thuộc tính `key` của từng thành phần trong mảng - để phân biệt các thành phần với nhau.

Và đó là tất cả cho component `App.js`

Code cho component `ButtonGroup` cũng khá là đơn giản:

```javascript
## file ButtonGroup.js

import React from "react";

const ButtonGroup = ({ technologies }) => (
  <div>
    {technologies.map((tech, i) => (
      <button
        data-tech={tech}
        key={`btn-${i}`}
        className="hello-btn"
      >
        {tech}
      </button>
    ))}
  </div>
);

export default ButtonGroup;
```

`ButtonGroup` là một component không-state (stateless) nhận vào một mảng các công nghệ thông qua tham số `technologies`. Sau đó nó sẽ lặp qua mảng này bằng hàm `map` và tạo ra cho mỗi thành phần một `button`.

Trong ví dụ này, mảng các công nghệ được truyền vào sẽ là `["React", "Elm", "React-redux"]`.

Các nút được tạo ra sẽ có một vài thuộc tính. `className` là thuộc tính khá hiển nhiên cho việc style. Có một tham số `key` để phòng tránh việc  React phiền phức cảnh báo về việc render ra nhiều đối tượng mà không có thuộc tính key. Chúa ơi cái lỗi này cứ ám ảnh tôi mãi :(

Cuối cùng, có một thuộc tính tên là `data-fetch` cho từng button nữa. Nó được gọi là [data-attribute](https://developer.mozilla.org/en-U/

S/docs/Learn/HTML/Howto/Use_data_attributes). Nó là một cách để lưu trữ một số thông tin bổ sung mà không có bất kì hiển thị nào. Và việc này giúp cho việc lấy ra giá trị tương ứng của từng thành phần một cách dễ dàng hơn.

Một button khi được render ra hoàn chỉnh sẽ giống như thế này:

```html
<button 
  data-tech="React" 
  key="btn-1" 
  className="hello-btn"> React </button>
```

Đến đây thì các mọi thứ đã được render chính xác, nhưng khi bấm vào các button thì chưa có gì xảy ra cả.

![](https://images.viblo.asia/f979ff2e-83bf-4afe-b728-d74614e6c59b.gif)

Đương nhiên rồi, đó là bởi vì chúng ta chưa cung cấp bất kì xử lý nào cho việc click cả. Giờ hãy cùng thực hiện nào.

Nằm trong hàm `render`, hãy tạo ra một xử lý `onClick`:

```javascript
<div>
    {technologies.map((tech, i) => (
      <button
        data-tech={tech}
        key={`btn-${i}`}
        className="hello-btn"
        onClick={dispatchBtnAction}
      >
        {tech}
      </button>
    ))}
  </div>
```

Ngon. Giờ hãy cùng viết hàm `dispatchBtnAction`. Đừng quên là hàm này chỉ có nhiệm vụ dispatch một action mỗi khi người dùng click vào button thôi đó nhé.

Ví dụ khi bạn bấm vào nút React thì sẽ dispatch một action như sau:

```javascript
{
    type: "SET_TECHNOLOGY",
    tech: "React"
  }
```

Khi bạn bấm vào nút React-Redux thì sẽ dispatch một action như sau:

```javascript
{
     type: "SET_TECHNOLOGY",
     tech: "React-redux"
   }
```

Và dưới đây là hàm `dispatchBtnAction`:

```javascript

function dispatchBtnAction(e) {
    const tech = e.target.dataset.tech;
    store.dispatch(setTechnology(tech));
}
```

`e.target.dataset.tech` sẽ lấy giá trị được set trong data attribute của button có tên là `data-tech`. Ở đây, `tech` sẽ giữ giá trị của button.

`store.dispatch()` là cách mà bạn dispatch một action trong Redux, và `setTechnology()` là action creator mà chúng ta đã viết trước đó!

```javascript
function setTechnology (text) {
  return {
     type: "SET_TECHNOLOGY",
     text: text
   }
}
```

![](https://images.viblo.asia/8f3aa349-fc5c-451f-9e6e-c0faf3e33f21.png)

Như các bạn đã biết, `store.dispatch` sẽ mong muốn một đối tượng action, và chỉ thế mà thôi. Và đừng quên hàm `setTechnology`, nó chỉ có việc nhận vào text của button và trả về action tương ứng.

Đồng thời, giá trị `tech` của button được lấy từ data attribute của button. Bạn có thể thấy đó là lý do vì sao tôi có thuộc tính `data-set` cho từng button, vì đó là cách mà chúng ta có thể tận dụng để dễ dàng lấy ra giá trị của tech từ button được click.

Giờ chúng ta đã dispatch được đúng action, liệu ứng dụng của chúng ta đã hoạt động như mong muốn chưa?

### Action đã được dispatch. Liệu nó có hoạt động không?

Đầu tiên, tôi có một câu đố nho nhỏ. Mỗi khi bấm vào một button và dispatch được một action, điều gì sẽ xảy ra tiếp theo ở trong Redux? Thành phần nào trong Redux sẽ tiếp tục thực hiện?

Liên tưởng đơn giản, nếu mỗi khi bạn đến ngân hàng và thực hiện hành động rút tiền, thì bạn sẽ gặp ai? Thu Ngân đúng chứ? Tương tự với Redux, khi action được dispatch thì sẽ đi qua và được xử lý bởi reducer.

Để chứng tỏ điều này, tôi sẽ log lại bất kì một aciton nào được gửi đến reducer.

```javascript

## file reducers/index.js

export default (state, action) => {
  console.log(action);
  return state;
};
```

Reducer sau đó sẽ cần phải trả về state mới của app, trong trường hợp này chúng ta sẽ chỉ đơn giản là trả về giá trị giống giá trị khởi tạo của `state`.

Với hàm `console.log()` trong reducer, hãy cùng xem có điều gì xảy ra khi click vào từng button

![](https://images.viblo.asia/4c27d70f-7cad-4171-b027-34ff66ad4b1f.gif)

Như các bạn thấy, tất cả các action đều được log lại mỗi khi button được click. Điều này đã chứng minh rằng actions đã được truyền đến Reducer. Thật tuyệt!

Và có thêm một điều nữa. Mỗi khi app khởi động, có một action khá là kì lạ cũng được log lại, nó sẽ giống như này : `{type: "@@redux/INITu.r.5.b.c"}`.

Đây là gì vậy? Thực ra thì chúng ta không cần quan tâm đến cái này nhiều lắm. Nó là một action được truyền bởi chính Redux mỗi khi khởi tạo app của bạn. Nó thường được biết đến với cái tên là `action khởi tạo` của Redux, và được truyền vào reducer mỗi khi Redux khởi tạo cùng với state ban đầu của app.

Và giờ chúng ta đã chắc rằng actions sẽ chắc chắn phải đi qua reducer. Thật tuyệt!

Tương tự cũng giống với việc bạn gặp Thu Ngân là vì bạn muốn rút tiền. Nếu Reduer không nhận action của chúng ta truyền lên và xử lý nó thì nó còn có giá trị gì nữa đâu?

### Làm cho Reducer hoạt động đúng mong muốn

Cho đến giờ, reducer mà chúng ta đã làm việc cùng vẫn chưa làm bất cứ một xử lý cụ thể nào cả. Nó giống như một người Thu Ngân vẫn còn mới với công việc của mình và chưa thể giúp chúng ta rút tiền được.

Vậy thì chúng ta muốn reducer làm gì nhỉ?

Đến thời điểm hiện tại, thì đây là `initialState` mà chúng ta đã truyền cho hàm `createStore` khi tạo ra một `STORE`:

```javascript
const initialState = { tech: "React" };
export const store = createStore(reducer, initialState);
```

Mỗi khi người dùng click vào bất kì button nào, thì một action sẽ được truyền đến reducer, và state mới chúng ta mong muốn từ reducer sẽ trả về sẽ là state có chứa text ở trong action.

Đây là điều tôi muốn.

State hiện tại đang là `{teach: "React"}`.

Cho một action mới có type là `SET_TECHNOLOGY`, và text là `React-Redux`:

```javascript
{
	    type: "SET_TECHNOLOGY",
	    text: "React-Redux"
}
```

Bạn muốn state mới sẽ trở thành như nào? Đúng rồi, chính là `{tech: "React-Redux"}`.

Lý do duy nhất mà chúng ta dispatch một action đó là vì chúng ta muốn có một state mới cho ứng dụng của mình!

Giống như tôi đã nói đến lúc trước, cách thông thường để xử lý các loại action khác nhau ở trong một reducer là sử dụng câu lệnh `switch` giống như dưới đây:

```javascript
export default (state, action) => {
  switch (action.type) {
    case "SET_TECHNOLOGY":
      //do something.

    default:
      return state;
  }
};
```

Giờ chúng ta sẽ chuyển qua lại các xử lý thông qua biến `action.type`, nhưng vì sao lại thế?

So sánh với việc đến ngân hàng và gặp Thu Ngân, thì bạn có thể có rất nhiều mong muốn khác nhau trong đầu, có thể là rút tiền, nạp tiền hoặc nói xin chào.

Thu Ngân là người thông minh, vì thế họ sẽ nhận các action mà bạn truyền, đồng thời dựa vào từng action mà phản hồi lại cho bạn một cách hợp lý.

Và nó cũng chính là nguyên lý chúng ta sẽ áp dụng trong Reducer. câu lệnh `switch` sẽ đóng vai trò kiểm tra `type` của action, từ đó xác định xem bạn muốn làm gì? Rút tiền, nạp tiền, ...

Sau khi xác định được hành động rồi, chúng ta sẽ có những xử lý tương ứng cho từng `case` đã biết. Ở thời điểm hiện tại thì chỉ có một `case` duy nhất là `SET_TECHNOLOGY`. Và theo đúng nguyên tắc, chúng ta cần trả về `state` mới cho app khi kết thúc hàm reducer!

[](https://images.viblo.asia/b7d22bf0-95b6-43c3-a5cf-1388bfa1ca93.png)

Khá ổn rồi nhỉ. Điều này cũng giống như là Thu Ngân (`Reducer`) sẽ hiểu được từng action mà bạn đưa ra. Tuy nhiên, họ vẫn chưa đưa chúng ta số tiền mà chúng ta mong muốn (là `state` với giá trị mới).

Hãy thực hiện một vài thao tác trong câu lệnh `case`.

Đây là bản cập nhật của reducer và đã thực sự đưa chúng ta tiền (thay đổi state):

```javascript
export default (state, action) => {
   switch (action.type) {
    case "SET_TECHNOLOGY":
      return {
        ...state,
        tech: action.tech
      };

    default:
      return state;
  }
};
```

Bạn có thấy tôi đã làm gì ở đây không?

![](https://images.viblo.asia/7229839e-454b-4035-b700-fc1fadca05aa.png)

Đấy chính là điều mà tôi sẽ giải thích ngay sau đây.

### Không bao giờ thay đổi state cũ (mutate state) ở trong Reducer

Khi trả về một `state` ở trong reducer, có một số điều chúng ta cần lưu ý. Tuy nhiên nếu bạn đã từng code React ngon lành, thì bạn sẽ thấy quen thuộc ngay thôi. 

Bạn không nên thay đổi trực tiếp tham số `state` được truyền vào Reducer. Mà thay vào đó, chúng ta luôn luôn tạo ra một bản copy mới của state. Điều này được thể hiện trong code như sau: 

Chúng ta không nên làm như thế này:

```javascript
export default (state, action) => {
  switch (action.type) {
    case "SET_TECHNOLOGY":
      state.tech = action.tech; 
      return state;

    default:
      return state;
  }
};
```

Và đó cũng chính là lý do mà tôi đã viết hàm reducer như thế này:

```javascript
return {
        ...state,
        tech: action.tech
  };
```

Thay vì cập nhật và thay đổi state nhận được, tôi đã trả về một object **mới**. Object này có tất cả các thuộc tính và giá trị của state cũ, nhờ phép toán `...state` mới được cập nhật ở ES6. Tuy nhiên, trường `tech` đã được cập nhật với giá trị được action gửi lên, `action.text`.

Thêm một lưu ý nữa là, tất cả các hàm reducer bạn viết ra nên là pure function mà không có side-effects nào cả - ko gọi API, ko update giá trị nằm ngoài phạm vi của hàm. Bạn hiểu chứ? Tôi hy vọng thế :D

Giờ thì Thu Ngân sẽ không phớt lờ hành động  của chúng ta nữa mà đã thực sự xử lý và đưa tiền cho bạn! Nếu bạn click vào các button thì nó có hoạt động như mong muốn không? Đáng tiếc là không, dùng chữ vẫn không được cập nhật với giá trị mới khi click voà từng button.

Vậy thì còn điều gì cần ở đây nữa nhỉ?

### Đăng kí (subscribe) để nhận các cập nhật từ Store

Khi bạn đi đến Ngân hàng, thông báo với Thu Ngân là mình muốn rút tiền, sau đó nhận được tiền của mình thành công - thì bước tiếp theo sẽ là gì?

Trong đa số trường hợp, chúng ta sẽ nhận được một thông báo thông qua emial/giấy hoặc tin nhắn điện thoại nói rằng chúng ta vừa thực hiện một giao dịch, với thông tin về số dư mới, vài thông tin bổ sung,...

Nếu như bạn không nhận được thông báo cho điện thoại, thì bạn chắc chắn sẽ nhận được một hoá đơn cá nhân để cho bạn biết rằng một giao dịch thành công vừa được thực hiện từ tài khoản của bạn.

Hãy nhìn lại luồng hoạt động ở trên một lần nữa. Action được khởi tạo, bạn nhận được tiền, đồng thời nhận được một emial thông báo giao dịch thành công.

So sánh với ứng dụng Redux đang làm việc, chúng ta có vẻ đang có một vấn đề ở đây.

Một action đã được tạo và gửi lên reducer, chúng ta đã nhận được tiền (state mới đã được trả về), nhưng còn phần thông báo cho việc state đã được update thành công thì sao nhỉ?

Chúng ta vẫn chưa có. Và có một giải pháp cho vấn đề này. Nếu ở ngân hàng, thì bạn phải đăng kí để nhận thông báo về giao dịch bằng email hoặc text sms. Và điều tương tự cũng cần thiết trong Redux. Nếu bạn muốn được thông báo là state đã được update, bạn cần đăng ký để nhận những thông báo đó.

Nhưng bằng cách nào?

Ở store mà Redux đã tạo ra, sẽ có một hàm `subscribe` có thể được gọi như thế này: `store.subscribe()`. Nếu bạn hỏi tôi thì tên của cái hàm này khá là rõ nghĩa đó.

Tham số được truyền vào trong hàm `store.subscribe()` sẽ là một hàm, và sẽ được gọi ra mỗi khi state được cập nhật. Nhắc lại lần nữa để không quên này - vì nó khá quan trọng đấy - **tham số** truyền vào hàm cho hàm `store.subscribe()` nên là **một hàm**, okay?

Giờ hãy sử dụng hàm này. Hãy nghĩ một chút, khi state được cập nhật thì chúng ta muốn gì? Chúng ta muốn giao diện được render lại, đúng chứ? Kiểu như này: "Ok state được cập nhật rồi, Redux, hãy render lại ứng dụng với giá trị state mới đi xem nào".

Hãy nhìn lại chỗ mà app đang được render trong file `index.js`. Đây là những gì chúng ta đã có.

`ReactDOM.render(<App />, document.getElementById("root")`

Đây là dòng sẽ render toàn bộ ứng dụng của chúng ta. Nó nhận vào component `App` và render nó trong cây DOM. và ID cho element gốc - `root` là cần phải cụ thể.

Trước tiên chúng ta sẽ trừu tượng hoá đoạn này vào trong một hàm, giống như thế này: 

```
const render = function() {
    ReactDOM.render(<App />, document.getElementById("root"))
}
render()
```

Giờ thì `<App />` sẽ được render giống như trước đó.

Sử dụng ES6 chúng ta có thể rút gọn hàm đơn giản hơn như sau:

```javascript
const render = () => ReactDOM.render(<App />, document.getElementById("root"));

render();
```

Sau khi đã có hàm `render` của `App` component, chúng ta có thể đăng ký để nhận cập nhật từ store của Redux giống như thế này: `store.subscribe(render)`

Bạn hiểu chỗ này chúng ta đang làm gì chứ?

Cứ mỗi khi có một cập nhật mới thành công ở state, thì `App` component sẽ được render lại với giá trị mới của state.

Để rõ ràng hơn thì đây là `App` component:

```javascript
class App extends Component {
  render() {
    return [
      <HelloWorld key={1} tech={store.getState().tech} />,
      <ButtonGroup key={2} technologies={["React", "Elm", "React-redux"]} />
    ];
  }
}
```
Cứ mỗi khi việc render lại được thực thi, dòng số 4 - `store.getState()` sẽ lấy về giá trị state đã được cập nhật, và kết quả của chúng ta sẽ là:

![](https://images.viblo.asia/ab23fdc2-2a13-48de-a6d5-ec8775d253af.gif)

Và nó đã hoạt động rồi, tôi biết là chúng ta làm được mà. Chúng ta vừa mới dispatch một action, nhận tiền từ Thu Ngân, và đăng ký để nhận thông báo. Hoàn hảo!

### Lưu ý QUAN TRỌNG khi sử dụng store.subscribe()

Có một vài lưu ý khi sử dụng `store.subscribe` giống như chúng ta đang làm ở đây. Về bản chất nó là một hàm cấp thấp (low-level) của Redux API. Trong môi trường production, cho các yêu cầu cao về hiệu năng, bạn sẽ cần phải sử dụng các thư viện để binding như là `react-redux` cho các ứng dụng lớn và phức tạp hơn. Đến thời điểm hiện tại, sử dụng `store.subscribe()` là phù hợp để học hỏi.

Trong một [PR comment](https://github.com/reduxjs/redux/pull/1289) tuyệt vời nhất mà tôi đã từng được thấy, Dan Abramov, ở trong một ví dụ về ứng dụng Redux đã nói như thế này:

> Ví dụ về Counter Vanilla được tạo ra nhằm lý giải những điều bí ẩn về Redux rằng tại sao nó cần Webpack, React, hot reloading, sagas, action creators, constants, Babel, npm, CSS modules, decorators, fluent Latin, và cần sự ủng hộ từ Egghead, một tiến sĩ, hoặc là một Bằng Phù Thuỷ Thường Đẳng với điểm số Giỏi Quá Kỳ Vọng (Harry Potter - Exceeds Expectation O.W.L)

Và tôi cũng tin như vậy. Khi học về Redux, đặc biệt là khi bạn mới bắt đầu, bạn nên bỏ qua rất nhiều thứ hào nhoáng hay được gọi là "extras" để nắm bắt cái cốt lõi trước tiên.

Trước tiên hãy học đi bộ, rồi sau đó bạn có thể chạy nhanh như bạn muốn.

### Okay, vậy chúng ta xong chưa nhỉ

Về kỹ thuật thì chúng ta đã xong xuôi hoàn toàn. Tuy nhiên, có một điều tôi muốn chỉ cho các bạn xem. Tôi sẽ bật Devtools ở trình duyệt của mình lên là bật tính năng `paint-flashing`

![](https://images.viblo.asia/7b54e834-d254-4c4d-abb8-178bb576f5d0.png)

Giờ thì, mỗi khi chúng ta click vào các button để cập nhật state cho ứng dụng, hãy để ý rằng có một khung xanh xuất hiện trong màn hình. Khung xanh nhấp nháy này thể hiện các thành phần của app đang được render lại trong engine của trình duyệt.

Hãy xem:

![](https://images.viblo.asia/2af875b5-1ebd-4a1f-89f0-0bd457b032e3.gif)

Như bạn có thể thấy, mặc dù hàm `render` được thực thi mỗi khi state được cập nhật, nhưng không phải toàn bộ app được render lại, chỉ cái component sử dụng giá trị thay đổi trong state mà thôi - trong trường hợp này chính là component `HelloWorld`

Thêm một điều nữa. Nếu state hiện tại của app đang được render là Hello World React, thì khi click vào nút React sẽ khôgn render lại component HelloWorld, bởi vì giá trị của state vẫn giữ nguyên. Điều này là tốt, và xảy ra được là do giải thuật So sánh sự khác nhau của Virtual DOM trong React, hẳn bạn đã từng nghe nói đến nếu sử dụng React.

Vậy là chúng ta đã xong mọi thứ cho phần này! Tôi đã có rất nhiều niềm vui khi giải thích được ra như thế này, và hi vọng bạn cũng có thể tận hưởng và thưởng thức nó.

### Tổng kết

Với một ứng dụng đơn giản, thì chương này có vẻ dài hơn dự kiến của bạn. Nhưng điều đó hoàn toàn ổn. Giờ bạn đã được trang bị với một vốn kiến thức dày dặn hơn về cách Redux hoạt động.

Dưới đây là những điều bạn đã học được ở chương này:

- Không giống như `setState()` ở trong React thuần, cách duy nhất để cập nhật state cho ứng dụng Redux là thông qua việc dispatch - gửi đi một action.
- Một action sẽ được mô tả đầy đủ và chính xác thông qua một Javascript object, nhưng nó bắt buộc phải có trường `type`.
- Trong một ứng dụng Redux, thì tất cả các action đều sẽ phải chạy qua reducer. Tất cả.
- Bằng cách sử dụng cú pháp `switch`, bạn có thể xử lý các action khác nhau ở trong cùng 1 reducer.
- Action Creators là các hàm đơn giản luôn trả về một đối tượng action.
- Việc tạo ra các thư mục để chứa các thành phần quan trọng của một ứng dụng Redux là một trong những practice thông dụng khi xây dựng ứng dụng Redux.
- Bạn không nên thay đổi `state` đã nhận được trong Reducer, thay vào đó hãy luôn trả về một bản copy của state.
- Để đăng ký nhận thông tin khi state được cập nhật, sử dụng hàm `store.subscribe()`. Nhưng vì nó làm hàm cấp thấp của Redux API, trong thực tế hãy sử dụng `react-redux`.

### Bài tập

Giờ là lúc làm một vài điều cool ngầu.

Bài số 1) Trong các file bài tập, tôi đã tạo ra một ứng dụng React đơn giản để mô tả một ứng dụng ngân hàng cho người dùng.

![](https://images.viblo.asia/d16445c9-03e5-4082-bd1e-a4174b2fbe1c.png)

Ứng dụng này có giao diện khá là dễ nhìn. Và thêm vào việc người dùng có thể xem tổng số tiền trong tài khoản của mình thì họ cũng có thể làm các hành động rút tiền.

![](https://images.viblo.asia/a2bc98ff-761a-442d-9722-424d462fbca0.png)

Giá trị về tên và số dư trong tài khoản người dùng được lưu trong state như sau:

```javascript
{
  name: "Ohans Emmanuel",
  balance: 1559.30
}
```

Có 2 việc bạn cần làm ở đây.

1. Tái cấu trúc lại ứng dụng để sử dụng Redux trong việc quản lý state.
2. Xử lý các hành động rút tiền bằng cách trừ tiền trong tài khoản của người dùng (tức là khi click vào các nút rút tiền thì trừ tiền trong tài khoản).

Bạn phải làm tất cả các việc này chỉ bằng Redux.

![](https://images.viblo.asia/95eb8565-9c81-46f1-9e9c-2e31b77ba580.png)

Nhắc lại một chút là khi download Ebook, bạn sẽ tìm thấy hướng dẫn để lấy các file code, file bài tập và file đáp án cho bài tập nữa

Bài số 2) Bức ảnh dưới đây là một ứng dụng React đóng vai trò là một bộ đếm thời gian.

![](https://images.viblo.asia/15b6a8d9-797f-4822-bf38-4d198673a155.png)

State sẽ giống như thế này:

```javascript
{
  days: 11,
  hours: 31,
  minutes: 27,
  seconds: 11,
  activeSession: "minutes"
}
```

Phụ thuộc vào session đang hoạt động, khi click vào bất kì nút `increase` hay `decrease` nào thì sẽ cập nhật giá trị hiển thị trong bộ đếm.

![](https://images.viblo.asia/6604da6f-e9d2-4990-b1c8-efb1b468f9e8.png)

Có 2 việc bạn cần làm ở đây.

1. Tái cấu trúc lại ứng dụng để quản lý state bằng Redux
2. Xử lý các action increase và decrease để hiển thị thời gian thực tế trên bộ đếm giờ.