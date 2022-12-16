# Giới thiệu

Redux là một predictable state container cho các ứng dụng JavaScript.

Nó giúp bạn viết các ứng dụng hoạt động ổn định, chạy trong các môi trường khác nhau (client, server, and native) và dễ dàng test. Trên hết, nó cung cấp trải nghiệm tuyệt vời cho developer, chẳng hạn như chỉnh sửa code trực tiếp kết hợp với trình gỡ lỗi time traveling .

Bạn có thể sử dụng Redux cùng với React hoặc với bất kỳ thư viện nào khác. Nó rất nhỏ (2kB, bao gồm cả dependencies), nhưng có sẵn một ecosystem lớn các addon.

## Redux giải quyết vấn đề gì?

Ngay cả một ứng dụng trang đơn cũng có thể phát triển ngoài tầm kiểm soát mà không có ranh giới rõ ràng giữa mọi layer của ứng dụng. Điều này đặc biệt đúng trong React.

Bạn có thể nhận được bằng cách giữ state trong component React gốc (hoặc trong context) miễn là ứng dụng vẫn còn nhỏ. Sau đó, mọi thứ sẽ trở nên khó khăn đặc biệt là khi bạn thêm nhiều behaviours vào ứng dụng. Tại một số điểm bạn có thể muốn đạt được một cách nhất quán để theo dõi các thay đổi state. Không chỉ vậy, các component frontend không nên biết về business logic.

Thật không may, một tấn logic được nhồi vào các component frontend ngày nay. Có một sự thay thế cho sự phức tạp này?

Redux có thể giải quyết chính xác những vấn đề đó. Nó có thể không rõ ràng ngay từ đầu, nhưng Redux giúp cung cấp cho mỗi component frontend chính xác state cần thiết.

Thậm chí tốt hơn, Redux có thể giữ business logic bên trong layer của nó (middleware), cùng với code để tìm nạp data.

## Có nên sử dụng Redux không?

Redux là một công cụ có giá trị để quản lý state của bạn, nhưng bạn cũng nên xem xét liệu nó có phù hợp với vấn đề của bạn không. Đừng sử dụng Redux chỉ vì ai đó nói rằng bạn nên - dành chút thời gian để hiểu những lợi ích tiềm năng và sự đánh đổi khi sử dụng nó .

Dưới đây là một số gợi ý về việc sử dụng Redux có ý nghĩa như thế nào:

* Bạn có lượng data hợp lý thay đổi theo thời gian.
* Bạn cần một source duy nhất cho state của bạn.
* Bạn thấy rằng việc giữ tất cả state của bạn trong một component cấp cao nhất là không còn đủ.

Tuy nhiên, điều quan trọng là phải hiểu rằng sử dụng Redux đi kèm với sự đánh đổi. Nó không được thiết kế để là viết code ngắn nhất hoặc nhanh nhất. Nó nhằm giúp trả lời câu hỏi "Khi nào thay đổi state nhất định và dữ liệu đến từ đâu?", với hành vi có thể dự đoán được. Nó làm như vậy bằng cách yêu cầu bạn tuân theo các ràng buộc cụ thể trong ứng dụng của bạn: lưu trữ state của ứng dụng dưới dạng dữ liệu đơn giản, mô tả các thay đổi dưới dạng objects đơn giản và xử lý các thay đổi đó bằng các functions áp dụng các cập nhật bất biến. Những ràng buộc này đòi hỏi nỗ lực từ phía developer, nhưng cũng mở ra một số khả năng bổ sung (chẳng hạn như lưu trữ và đồng bộ hóa store).
# Làm quen với Redux

Trong phần tiếp theo, ta sẽ bắt đầu xây dựng một proof về khái niệm để giới thiệu:

* Redux nguyên tắc cơ bản
* Redux cùng với React

## Redux store

Store ở Redux là một loại magic và nắm giữ tất cả state của ứng dụng. Nó là duy nhất trong bất kỳ một ứng dụng Redux nào.

Hãy tạo một store để bắt đầu với Redux. Di chuyển vào môi trường phát triển React của bạn và cài đặt Redux:

```
cd react-redux-tutorial
npm i redux --save-dev
```

Tạo thư mục cho store:  `mkdir -p src/js/store`

Tiếp theo tạo một file mới, src/js/store/index.js và khởi tạo store:

```
// src/js/store/index.js
import { createStore } from "redux";
import rootReducer from "../reducers/index";
const store = createStore(rootReducer);
export default store;
```

Như bạn có thể thấy, store là kết quả của việc gọi createStore, một function từ thư việc Redux. createStore lấy một reducer làm đối số đầu tiên và trong trường hợp này chúng ta thông qua rootReducer.

Bạn cũng có thể chuyển state ban đầu để createStore, hữu ích cho rendering phía server và state preloading, nhưng hiện tại chúng ta không quan tâm đến điều đó. Khái niệm quan trọng nhất để hiểu ở đây là state trong Redux đến từ các reducer. Hãy lặp lại: reducers tạo ra state ứng dụng của bạn.

## Redux reducers

Reducer là gì ? Một Redux reducer chỉ là một hàm IavaScript. Nó có hai tham số: state hiện tại và action.

Trong một component React điển hình, state cục bộ có thể bị thay đổi tại chỗ. Trong Redux bạn không được phép làm điều đó. Các nguyên tắc thứ ba của Redux quy định rằng state là không thay đổi và không thể thay đổi tại chỗ.

Nói cách khác, reducer phải giữ nguyên. Hàm thuần túy là một hàm trả về cùng một đầu ra cho đầu vào đã cho.

Trong ví dụ dưới đây sẽ tạo ra một reducer đơn giản, lấy action state ban đầu làm tham số. Tạo một thư mục cho reducer: `mkdir -p src/js/reducers`

Tạo một file mới, src/js/reducers/index.js:

```
const initialState = {
  articles: []
};
function rootReducer(state = initialState, action) {
  return state;
};
export default rootReducer;
```

Lưu ý cách state ban đầu được truyền dưới dạng tham số mặc định. Nhưng đến bây giờ reducer không làm gì hơn là trả lại state ban đầu.

## Redux action và name constants

Action là payloads của thông tin gửi dữ liệu từ ứng dụng của bạn đến store của bạn. Chúng là nguồn thông tin duy nhất cho các store. Bạn gửi chúng đến store bằng cách sử dụng store.dispatch().

Redux reducer chắc chắn là khái niệm quan trọng nhất trong Redux. Reducer tạo ra state của một ứng dụng. Nhưng làm thế nào để một reducer biết khi nào tạo ra state tiếp theo?

Các nguyên tắc thứ hai của Redux nói cách duy nhất để thay đổi state này là bằng cách gửi một tín hiệu đến các store. Tín hiệu này là một action. Vì vậy, gửi một action có nghĩa là gửi tín hiệu đến store.

Các action Redux không gì khác hơn là các đối tượng JavaScript:

```
{
  type: 'ADD_ARTICLE',
  payload: { title: 'React Redux Tutorial', id: 1 }
}
```

Như bạn có thể thấy đó là một đối tượng JavaScript có hai thuộc tính: type và payload.

Thuộc tính type điều khiển state sẽ thay đổi như thế nào và nó luôn được Redux yêu cầu. Thay vào đó, thuộc tính payload mô tả những gì sẽ thay đổi và có thể bị bỏ qua nếu bạn không có dữ liệu mới để lưu trong store.

Là một cách thực hiện tốt nhất trong Redux, chúng tôi gói mọi action trong một function, để việc tạo đối tượng được trừu tượng hóa.

Tạo một thư mục cho các hành động: `mkdir -p src/js/actions`

Sau đó, tạo một tệp mới, src/js/actions/index.js :

```
// src/js/actions/index.js
export function addArticle(payload) {
  return { type: "ADD_ARTICLE", payload }
};
```

Bạn có thể nhận thấy rằng thuộc tính type là một string. Các string dễ bị lỗi chính tả và trùng lặp và vì lý do này, tốt hơn là khai báo các action là hằng số. Tạo một thư mục mới: `mkdir -p src/js/constants`

Sau đó, tạo một tệp mới, src/js/constants/action-type.js :

```
// src/js/constants/action-types.js
export const ADD_ARTICLE = "ADD_ARTICLE";
```

Bây giờ hãy mở lại src/js/actions/index.js và cập nhật action để sử dụng các action type:

```
// src/js/actions/index.js
import { ADD_ARTICLE } from "../constants/action-types";
export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload };
}
```

## Refactoring the reducer

 Làm thế nào để reducer biết khi nào tạo state tiếp theo? Key ở đây là store Redux. Khi một action được gửi đi, store sẽ chuyển một message đến reducer.

Tại thời điểm này, reducer xem thuộc tính type của action này. Sau đó tùy thuộc vào type action, reducer tạo ra state tiếp theo, cuối cùng hợp nhất action payload vào state mới.

Trước đó chúng ta đã tạo ra một reducer mà không làm gì. Hãy sửa nó đi! Mở src/js/giảm/index.js và cập nhật reducer bằng câu lệnh if để kiểm tra loại action:

```
// src/js/reducers/index.js
import { ADD_ARTICLE } from "../constants/action-types";
const initialState = {
  articles: []
};
function rootReducer(state = initialState, action) {
  if (action.type === ADD_ARTICLE) {
    state.articles.push(action.payload);
  }
  return state;
}
export default rootReducer;
```

Ngoài ra còn có một dòng code đẩy action payload về state ban đầu. Có vẻ đúng việc cần làm. Nhưng nó sai rồi! Reducer phá vỡ nguyên tắc Redux chính: immutability.

Array.prototype.push là một hàm impure: nó sửa đổi array ban đầu. Nhưng còn nhiều hơn thế. Chúng ta cũng đang thay đổi state ban đầu tại chỗ.

Chúng ta cần một sửa chữa. Đầu tiên chúng ta có thể trả về một state mới với Object.assign, nghĩa là một đối tượng JavaScript mới. Bằng cách này, ta giữ cho state ban đầu không thay đổi. Sau đó, chúng ta có thể sử dụng Array.prototype.concat thay cho Array.prototype.push để giữ array ban đầu:

```
import { ADD_ARTICLE } from "../constants/action-types";
const initialState = {
  articles: []
};
function rootReducer(state = initialState, action) {
  if (action.type === ADD_ARTICLE) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    });
  }
  return state;
}
export default rootReducer;
```

Bây giờ state ban đầu được để lại trong điều kiện đầu tiên và state kết quả chỉ là một bản sao của state ban đầu. Hãy nhớ hai điểm chính để tránh thay đổi trong Redux :

* Sử dụng concat(), slice() hoặc spread operator cho array.
* Sử dụng Object.assign() hoặc object spread của các đối tượng.

## Redux store method

Bạn có thể ngạc nhiên khi biết rằng chính Redux là một thư viện nhỏ (2KB) và chỉ có ba phương thức quan trọng nhất:

* **getState** để đọc state hiện tại của ứng dụng.
* **dispatch** để gửi một action.
* **subscribe** để nghe về những thay đổi state.

Bây giờ chúng ta sẽ kiểm tra trong console của trình duyệt. Để làm được điều này chúng ta phải xuất dưới dạng các biến toàn cục trong store và action mà chúng ta đã tạo trước đó. Tạo một tệp mới có tên src/js/index.js và đặt code ở đây:

```
import store from "../js/store/index";
import { addArticle } from "../js/actions/index";
window.store = store;
window.addArticle = addArticle;
```

Bây giờ cũng mở src/index.js , dọn sạch nội dung của nó và cập nhật nó như sau:

```
import index from "./js/index";
```

Bây giờ hãy chạy lệnh:  `npm start`

```
store.getState();
// output: {articles: Array(0)}
```

Không có articles. Trong thực tế, chúng ta chưa cập nhật state ban đầu. Để làm cho mọi thứ thú vị, chúng ta có thể lắng nghe cập nhật state với subscribe.

Phương thức subscribe chấp nhận một cuộc gọi lại sẽ kích hoạt bất cứ khi nào một action được gửi đi. Gửi một action có nghĩa là thông báo cho store rằng chúng ta muốn thay đổi state.

Đăng ký callback với:

```
store.subscribe(() => console.log('Look ma, Redux!!'));
```

Để thay đổi state trong Redux, chúng ta cần gửi một action. Để gửi một action, chúng ta sẽ gọi phương thức dispatch. Bây giờ chúng ta có một action: addArticle để thêm một mục mới vào state. Hãy gửi action với:

```
store.dispatch( addArticle({ title: 'React Redux Tutorial for Beginners', id: 1 }) );
```

Ngay sau khi chạy đoạn code trên, bạn sẽ thấy “Look ma, Redux!!”. Để xác minh rằng state thay đổi chạy lại:

```
store.getState();
// output: {articles: Array(1)}
```

### Tài liệu tham khảo:
https://redux.js.org/introduction/getting-started#should-you-use-redux
https://www.valentinog.com/blog/redux/