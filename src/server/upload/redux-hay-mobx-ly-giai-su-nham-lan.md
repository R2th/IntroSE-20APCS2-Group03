# Chúng ta cần giải quyết vấn đề gì?

Tất cả chúng ta đều muốn có một cách nào đó để quản lý state trong một ứng dụng. Nhưng bạn đã bao giờ tự hỏi nó giải quyết được vấn đề gì cho chúng ta chưa? Hầu hết các lập trình viên đều sử dụng một thư viện quản lý state ngay cả đối với những ứng dụng nhỏ. Hiển nhiên thôi mà, khi tất cả những người khác đều nói về chúng, tất nhiên chúng ta cũng phải bắt kịp xu thế chứ? Redux này, MobX này. Thế nhưng hầu hết các ứng dụng lại không cần đến những công cụ quản lý state phức tạp đến vậy. Nó còn nguy hiểm hơn, vì hầu hết mọi người sẽ không bao giờ gặp những vấn đề mà những thư viện như Redux hay MobX cố gắng để giải quyết.

Ngày nay, một hiện trạng mà chúng ta dễ dàng thấy là việc mọi người đều viết ra những frontend app với các component. Component thì có state nội tại. Ví dụ trong React thì state nội tại đó được xử lý bằng `this.state` và `this.setState()`. Với những app lớn, vấn đề guản lý state có thể trở nên khó khăn với state nội bộ bởi vì:
* Một component cần phải chia sẻ state với một component khác.
* Một component cần phải thay đổi state của một component khác.

Đến một lúc nào đó, vấn đề này càng ngày càng trở nên khó giải quyết khi nó trở thành một đống hỗn loạn các state object và các thay đổi diễn ra chồng chéo nhau khắp các component và rất khó để chúng ta có thể quản lý tất cả một cách hiệu quả.

Suy ra để giải quyết vấn đề này, chúng ta có thể sử dụng thư viện như MobX hay Redux. Những thư viện này cung cấp cho chúng ta công cụ để lưu giữ state, thay đổi state và nhận những thay đổi của state. Bạn có một chỗ để tìm state, một chỗ để thay đổi nó và cũng một chỗ để nhận các thay đổi. Chúng tuân theo nguyên tắc single source of truth (chỉ một nơi để lưu trữ toàn bộ state). Nó làm cho việc quản lý state trở nên dễ dàng hơn vì nó được tách rời khỏi các component của bạn.

Các thư viện quản lý state như Redux hay MobX thường có các add-on đi kèm, như với React thì chúng ta có `react-redux` và `mobx-react`, để cung cấp cho các component cách để truy cập các state. Thường thì các component đó được gọi là container component, hay chính xác hơn là, connected component. Bạn có thể truy cập hoặc thay đổi state từ bất cứ đâu trong ứng dụng của bạn bằng cách biến các component thành các connected component.

# Redux và MobX có gì khác nhau?

Trước khi chúng ta nói về những khác biệt, tôi muốn nói về một số điểm chung giữa MobX và Redux.

Cả 2 thư viện đều được dùng để quản lý state trong các ứng dụng Javascript. Chúng không nhất thiết phải đi kèm với một thư viện như React. Chúng cũng được dùng trong những thư viện khác như AngularJs hay VueJs nữa. Nhưng chúng kết hợp rất tốt với triết lý của React.

Nếu bạn chọn dùng một thư viện để quản lý state, bạn sẽ không bị ràng buộc bởi nó. Bạn có thể chuyển qua sử dụng một thư viện khác bất kỳ lúc nào. Bạn hoàn toàn có thể chuyển từ MobX sang Redux hoặc ngược lại.

Redux bởi Dan Abramov và Andrew Clark là một biến thể của kiến trúc flux. Trái ngược với flux, nó chỉ sử dụng duy nhất một store để lưu trữ state. Hơn nữa, thay vì sử dụng một dispatcher, nó dùng các pure function để thay đổi state. Redux bị ảnh hưởng rất nhiều bởi các nguyên tắc của functional programming (FP). Chúng ta có thể có FP trong Javascript, nhưng rất nhiều người đã quen với OOP như Java, và họ gặp rất nhiều khó khăn trong việc ứng dụng các nguyên tắc này. Điều này cũng lý giải tại sao MobX có thể sẽ dễ học hơn đối với người mới.

Bởi vì Redux áp dụng các nguyên tắc của FP, nó sử dụng hàm thuần khiết. Một hàm nhận input, trả về output và không có thêm bất cứ sự phụ thuộc nào khác. Một hàm thuần khiết luôn trả về cùng một output đối với cùng một input và không hề có side effect.

```
(state, action) => newState
```

Redux state là **immutable**. Thay vì thay đổi state, bạn luôn trả về một state mới. Bạn không bao giờ trực tiếp thay đổi object state hay phụ thuộc vào tham chiếu đến object.

```
// Đừng làm thế này trong Redux vì nó trực tiếp thay đổi array
function addAuthor(state, action) {
  return state.authors.push(action.author);
}

// Luôn giữ state immutable và trả về object mới
function addAuthor(state, action) {
  return [ ...state.authors, action.author ];
}
```

Điều cuối cùng nhưng ko kém phần quan trọng, state của bạn được normalize như trong một database. Các entity chỉ tham chiếu đến nhau bằng id. Đó là cách làm tốt nhất. Mặc dù không phải tất cả mọi người đều làm vậy, bạn có thể sử dụng một thư viện như normalizr để đạt được state đã chuẩn hóa. Normalized state giúp cho chúng ta có một state phẳng và lưu giữ các entity như một nguồn duy nhất.

```
{
  post: {
    id: 'a',
    authorId: 'b',
    ...
  },
  author: {
    id: 'b',
    postIds: ['a', ...],
    ...
  }
}
```

Trong khi đó, MobX bởi Michel Weststrate lại chịu ảnh hưởng của lập trình hướng đối tượng, nhưng cũng một phần bởi lập trình phản ứng (Reactive programming). Nó đống gói state của bạn thành những observable. Vì thế bạn có mọi khả năng của một Observable trong state của bạn. Dữ liệu có thể chỉ cần có setter và getter thôi, nhưng observable làm cho chúng ta có khả năng nhận update khi dữ liệu thay đổi.

Trong MobX, state là **mutable**. Nghĩa là bạn thay đổi state trực tiếp:

```
function addAuthor(author) {
  this.authors.push(author);
}
```

Thêm nữa, các entity tồn tại dưới một cấu trúc dữ liệu lồng nhau. Bạn không cần chuẩn hóa state. State được giữ không chuẩn hóa và có thể lồng nhiều tầng.

```
{
  post: {
    id: 'a',
    ...
    author: {
      id: 'b',
      ...
    }
  }
}
```

### 1 Store và nhiều Store

Trong Redux bạn giữ mọi state trong một global store/global state. State object này là nguồn dữ liệu duy nhất của bạn. Mặt khác, chúng ta sử dụng nhiều reducer để thay đổi state này.

Trái lại, MobX lại dùng nhiều store. Tương tự như reducer của Redux, bạn có thể áp dụng chia để trị bằng cách phân bổ chúng thành nhiều tầng dữ liệu. Bạn có thể muốn có các domain entity trong một store riêng nhưng vẫn có khả năng kiểm soát state của view trong một trong các store của bạn. Sau cùng thì bạn là người quyết định và định hướng lại cấu trúc state nào có lợi cho ứng dụng của bạn nhất.

Trên lý thuyết bạn cũng có thể có nhiều store trong Redux. Không có ai bắt bạn phải dùng chỉ một store cả. Nhưng đó không phải là cách người ta khuyên dùng Redux. Nó sẽ làm trái lại những best practice nếu bạn dùng nhiều store. Trong Redux bạn chỉ cần có một store thôi và phản ứng với những thay đổi thông qua reducer và các global event.

### Implementation nhìn như thế nào?

Trong Redux, bạn sẽ cần đoạn code như dưới đây để thêm một user vào global state. Bạn có thể thấy chúng ta có thể sử dụng spread operator để trả về một state object mới. Bạn cũng có thể dùng `Object.assign()` để tạo ra một immutable object trong ES5.

```
const initialState = {
  users: [
    {
      name: 'Dan'
    },
    {
      name: 'Michel'
    }
  ]
};

// reducer
function users(state = initialState, action) {
  switch (action.type) {
  case 'USER_ADD':
    return { ...state, users: [ ...state.users, action.user ] };
  default:
    return state;
  }
}

// action
{ type: 'USER_ADD', user: user };
```

Bạn sẽ cần phải gọi `dispatch({ type: 'USER_ADD', user: user });` để thêm một user mới vào global state.

Trong MobX, một store sẽ chỉ quản lý một substate (như một reducer trong Redux quản lý một substate) nhưng bạn có thể thay đổi state một cách trực tiếp. Annotation `@observable` giúp cho chúng ta có khả năng nhận update khi state thay đổi.

```
class UserStore {
  @observable users = [
    {
      name: 'Dan'
    },
    {
      name: 'Michel'
    }
  ];
}
```

Giờ thì chúng ta có thể gọi `userStore.users.push(user);` vào một instance của store. Tuy vậy best practice đó là xử lý việc thay đổi state rõ ràng hơn với các action.

```
class UserStore {
  @observable users = [
    {
      name: 'Dan'
    },
    {
      name: 'Michel'
    }
  ];

  @action addUser = (user) => {
    this.users.push(user);
  }
}
```

Bạn có thể bắt buộc việc sử dụng action bằng cách cấu hình Mobx với `configure({ enforceActions: true });`. Giờ thì bạn có thể thay đổi state bằng cách gọi `userStore.addUser(user);` với một instance của store.

Bạn đã thấy cách chúng ta cập nhật state trong cả Redux và MobX. Chúng rất khác nhau. Trong Redux state của bạn là read-only. Bạn chỉ có thể thay đổi state bằng các action rõ ràng. Ngược lại, state trong MobX lại có thể vừa read và vừa write. Bạn có thể thay đổi state trực tiếp mà không cần dùng action, nhưng bạn cũng có thể bắt buộc sử dụng action với cấu hình đã nói ở trên.

# Learning curve của quản lý state trong React

Cả Redux và MobX đều hầu hết được sử dụng trong các ứng dụng React. Nhưng bản chất của chúng thì là những thư viện quản lý state độc lập, và có thể được dùng mà không cần đến React. Chúng còn có những thư viện hỗ trợ tương thích để làm cho việc kết hợp với React component trở nên dễ dàng hơn, đó là `react-redux` cho Redux + React và `mobx-react` cho MobX + React. 

Trong những thảo luận trên các diễn đàn công nghệ thì một vấn đề mà người ta hay nói đến đó là learning curve của Redux. Thường thì nó diễn ra trong bối cảnh mọi người bắt đầu học React nhưng đã muốn tìm hiểu là làm thế nào để quản lý state với Redux. Nhiều người sẽ cho rằng React và Redux nằm riêng thì có một learning curve khá tốt, nhưng kết hợp cả 2 lại thì chúng lại khó hiểu hơn nhiều. Vì thế MobX được coi là một giải pháp thay thế vì nó phù hợp hơn với những người mới học.

Tuy vậy, tôi muốn gợi ý một cách tiếp cận khác cho các bạn mới học React về vấn đề quản lý state, đó là bắt đầu với chính những tính năng quản lý state nội bộ của component. Trong một ứng dụng React, điều đầu tiên mà bạn sẽ học đó là các hàm nằm trong vòng đời của một component và làm thế nào để quản lý state bằng `setState()` và `this.state`. Đây là một cách học mà tôi đánh giá rất cao. Nếu không theo cách này, bạn sẽ rất dễ bị choáng ngợp bởi hệ sinh thái của React. Đến một thời điểm nào đó với cách học này, bạn sẽ nhận ra rằng việc quản lý các state nội bộ của component càng ngày càng trở nên khó hơn. Đó là lúc mà chúng ta trả lời câu hỏi: Vấn đề mà MobX và Redux giải quyết cho chúng ta là gì? Cả 2 đều cung cấp một cách để quản lý state của ứng dụng độc lập với các component. State được tách biệt hoàn toàn khỏi component. Component có thể truy cập state, thay đổi nó và nhận những cập nhật với state mới. State đó chính là single source of truth.

### Redux hay MobX cho người mới?

Một khi bạn đã quen với việc sử dụng component và quản lý state nội bộ, bạn có thể chọn một thư viện để giải quyết vấn đề này. Sau khi đã dùng cả 2 thư viện, tôi cho rằng MobX rất phù hợp đối với người mới. Chúng ta đều đã thấy MobX cần ít code hơn, dù cho nó sử dụng vài loại annotation mà có lẽ chúng ta chưa cần hiểu về chúng.

Với MobX bạn không cần phải làm quen với lập trình hàm hay phải hiểu những thuật ngữ như immutability. Lập trình hàm là một mô hình đang phát triển rất nhanh, nhưng lại xa lạ với hầu hết các lập trình viên Javascript. Dù thế giới lập trình đang dần được đẩy theo xu hướng này nhưng không phải ai cũng có kinh nghiệm về nó, nên các nguyên lý của MobX sẽ dễ dàng để hiểu hơn đối với những người đã biết về hướng đối tượng.

### Một ứng dụng đang phát triển

Trong MobX, bạn thay đổi object có annotation và component của bạn sẽ tự động render lại. MobX đem đến nhiều xử lý nội bộ hơn là Redux, nên sẽ làm cho nó dễ dùng hơn lúc đầu vì bạn phải viết ít code hơn. Nếu bạn đã biết Angular thì sẽ thấy dùng MobX giống như là two-way data binding vậy. Bạn giữ một vài state ở đâu đó, theo dõi state bằng annotation và để cho component tự update một khi state thay đổi.

```
// component
<button onClick={() => store.users.push(user)} />
```

Cách tốt hơn để làm điều này đó là sử dụng @action trong store.

```
// component
<button onClick={() => store.addUser(user)} />

// store
@action addUser = (user) => {
  this.users.push(user);
}

```

Nó sẽ làm cho việc thay đổi state trở nên minh bạch hơn với các action. Hơn nữa chúng ta cũng có thể bắt buộc việc sử dụng action để thay đổi state bằng cách mà tôi đã nói ở trên.

```
// root file
import { configure } from 'mobx';

configure({ enforceActions: true });
```

Việc thay đổi state trực tiếp trong store như chúng ta đã làm ở ví dụ thứ nhất sẽ không còn hoạt động nữa. Việc sử dụng action là một trong các best practice của MobX. Hơn nữa một khi bạn chỉ dùng action, bạn đã áp dụng các ràng buộc của Redux.

Tôi xin gợi ý rằng chúng ta nên sử dụng MobX để bắt đầu một dự án. Một khi ứng dụng đã bắt đầu to lên, đó cũng là điều dễ hiểu khi chúng ta bắt buộc việc sử dụng các action. Điều này cũng đi theo đường lối của Redux đó là chúng ta không bao giờ thay đổi trực tiếp state mà lúc nào cũng phải thông qua các action.

### Chuyển sang Redux

Khi mà ứng dụng của bạn lớn dần và có thêm nhiều dev cùng làm việc, bạn nên chuyển qua dùng Redux. Bản chất của nó là việc nó bắt buộc sử dụng action để thay đổi state chứ không thông qua config như MobX. Action bao gồm kiểu và một payload và reducer có thể dùng để thay đổi state.

```
// reducer
(state, action) => newState
```

Redux cung cấp cho bạn cả một cấu trúc để quản lý state với những ràng buộc rõ ràng. Đó là [lý do mà Redux rất thành công.](https://www.youtube.com/watch?v=uvAXVMwHJXU)

Một điểm mạnh khác của Redux đó là việc sử dụng nó ở server side. Bởi vì chúng ta đang làm việc với Javascript object, bạn có thể gửi state qua mạng được. Serialize và deserialize các state object hoạt động một cách tự động mà bạn không cần làm thêm gì cả. Bạn cũng có thể làm như thế với MobX nữa.

MobX thì không có nhiều ràng buộc nhưng bạn cũng có thể tự tạo ra chúng bằng các config. Đó là lí do tại sao tôi không nói là bạn không thể dùng MobX với những ứng dụng lớn, nhưng Redux thì giúp chúng ta có một cách làm nhất quán hơn. Doc của MobX cũng có nói là: "MobX không hướng dẫn cho bạn cách bạn cấu trúc code, lưu state ở đâu hay xử lý các event như thế nào." Team của bạn cần phải tự cấu trúc việc quản lý state nếu sử dụng thư viện này.

Cuối cùng thì việc học quản lý state không khó như chúng ta nghĩ. Để tóm gọn lại vấn đề, một người mới học React đầu tiên sẽ học cách sử dụng `setState()` và `this.state`. Sau một thời gian thì họ sẽ thấy khó khăn với việc chỉ dùng `setState()` để quản lý state cho cả ứng dụng. Khi đi tìm giải pháp, họ gặp được những thư viện như MobX hay Redux. Nhưng nên chọn cái nào bây giờ? Bởi vì MobX có ít ràng buộc hơn, cần ít code hơn và dùng cũng tương tự như `setState()`, tôi nghĩ nó rất thích hợp với các ứng dụng vừa và nhỏ. Một khi ứng dụng đã to dần lên, bạn nên xem xét việc tạo ra thêm ràng buộc bằng config trong MobX hoặc chuyển sang dùng Redux.

# Lời kết

Mỗi khi tôi đọc comment về tranh luận giữa Redux và MobX, luôn luôn có 1 comment kiểu này: "Redux có quá nhiều code thừa, bạn nên dùng MobX đi. Tôi đã bỏ được XXX dòng code đấy." Comment này có thể đúng, nhưng họ chưa xem xét đến những sự đánh đổi. Redux có nhiều code thừa hơn MobX, vì nó được thêm vào vì những ràng buộc cụ thể trong thiết kế. Nó cho phép bạn có cái nhìn tổng quan hơn về state của ứng dụng dù ứng dụng đó lớn thế nào. Không phải tự nhiên mà nó là một trong những thư viện phổ biến nhất đâu.

Thư viện Redux có kích thước khá là nhỏ. Hầu hết thời gian bạn sẽ dành để xử lý Javascript object và array. Nó giống với Javascript thuần hơn là MobX. Trong MobX, chúng ta gói object và array vào trong observable object và điều này giấu đi hầu hết các boilerplate code. Nó được xây dựng dựa trên tính trừu tượng ẩn. Nó sẽ thực hiện một phép thuật nào đó và code bạn tự nhiên chạy được, nhưng đồng thời cũng làm cho các cơ chế ở tầng dưới trở nên khó hiểu hơn nhiều. Với Redux thì chúng ta test và debug ứng dụng dễ hơn vì nó chỉ sử dụng Javascript thuần.

Trong khi với Redux, chúng ta có một cách nhất định để làm mọi thứ thì MobX lại ít ràng buộc hơn. Nhưng dù vậy chúng ta vẫn nên tuân theo các best practice trong MobX, vì như thế sẽ dễ dàng hơn trong việc lí giải thay đổi của state.

Cả 2 thư viện đều rất tốt. Trong khi Redux đã được chứng minh trong thế giới React, MobX đang dần trở thành một giải pháp thay thế đáng chú ý.

Bài viết được dịch từ [Redux or MobX: An attempt to dissolve the Confusion](https://www.robinwieruch.de/redux-mobx-confusion/#motivation) của tác giả **Robin Wieruch**.