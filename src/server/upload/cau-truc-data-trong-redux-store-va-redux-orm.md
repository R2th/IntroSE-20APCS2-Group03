## Chúng ta sẽ cấu trúc data ra sao trong redux store?

Đây là một câu hỏi phổ biến khi sử dụng redux. Câu trả lời thường phụ thuộc vào cách định tương tác với dữ liệu của mình.

Có một số điều cần xem xét: có thường xuyên lặp lại dữ liệu lưu trữ như danh sách trong store không? có cần truy cập nhanh O (1) vào các mục riêng lẻ không?

Tôi đã thấy một loạt các phương pháp tiếp cận trong thực tế, thường có một số sự cân bằng giữa thời gian truy cập và tính dễ lặp lại.

### Các cách tiếp cận phổ biến

Nếu bạn đang lưu trữ một số dữ liệu trong đó mỗi item có một id, bạn có thể định hình cửa store của mình dưới dạng object hoặc array của object.

#### Array của flat object 
Đây là điều phổ biến nhất. Nó làm cho việc lặp lại dễ dàng và có thể lưu trữ dữ liệu của mình theo một thứ tự cụ thể, nhưng bạn không thể truy cập vào một mục cụ thể theo id hoặc tên mà không lặp lại.

```
categories: [
  {name: 'abs',  id: '32o8wafe', exercises: ['crunches', 'plank']},
  {name: 'arms', id: 'oaiwefjo', exercises: [...]},
  {name: 'legs', id: 'aoijwfeo', exercises: [...]},
]
```

#### Gán Object với 1 id {id: {values}}:

```
categories: {
  '32o8wafe': {name: 'abs',  exercises: ['crunches', 'plank']},
  'oaiwefjo': {name: 'arms', exercises: [...]},
  '3oij2e3c': {name: 'legs', exercises: [...]},
}

Object.values(categories).map(row => // cant access id here)
// it's possible to use Object.entries, but you still cant do row.id
```

### Cấu trúc nó giống như một cơ sở dữ liệu của các hàng được lập chỉ mục bởi id

Một cách tiếp cận khác mang lại lợi ích của cả việc lặp lại dễ dàng với `Object.values ​​(state.categories)` và tìm nhanh chóng các mục riêng lẻ:

```
categories: {
  '32o8wafe': {id: '32o8wafe', name: 'abs',  exercises: [...]},
  'oaiwefjo': {id: 'oaiwefjo', name: 'arms', exercises: [...]},
  '3oij2e3c': {id: '3oij2e3c', name: 'legs', exercises: [...]},
}

categories: {
  '1': {id: '1', name: 'abs',  exercises: [...]},
  '2': {id: '2', name: 'arms', exercises: [...]},
  '3': {id: '3', name: 'legs', exercises: [...]},
}

```

### The power of indexes

Dạng mới mà chúng tôi giới thiệu ở trên là một thay đổi nhỏ cần thực hiện và có khả năng không một nhóm nào dành nhiều thời gian cân nhắc khi thiết kế redux store của họ. Điều kỳ diệu thực sự xuất hiện khi chúng ta truy cập dữ liệu lưu trữ bằng các khóa khác nhau ngoài id.

Lưu ý rằng hình dạng giới thiệu ở trên chỉ là một danh sách các hàng, với một id được sử dụng để xác định duy nhất mỗi hàng. Với store của bạn có hình dạng như thế này, bạn có thể tạo các chỉ mục cho phép bạn tìm bằng bất kỳ khóa nào khác mà bạn muốn:

Nếu bạn muốn có nhiều tính năng giống cơ sở dữ liệu hơn trong trình duyệt, hãy xem: **redux-orm, IndexedDB** (thay thế cho Web SQL) và **GraphQL**. Tuy nhiên, tùy vào mỗi trường hợp trong mỗi project mà sử dụng lib phù hợp.

## Redux-ORM

Dữ liệu có ID, lồng hoặc mối quan hệ thường phải được lưu trữ theo kiểu “chuẩn hóa”: mỗi đối tượng nên được lưu trữ một lần, được khóa bằng ID và các đối tượng khác tham chiếu đến nó chỉ nên lưu trữ ID thay vì bản sao của toàn bộ đối tượng. Có thể hữu ích khi coi các item trong store của bạn như một cơ sở dữ liệu, với các “bảng” riêng lẻ cho mỗi loại item. Các thư viện như **normalizr** và **redux-orm** có thể cung cấp trợ giúp và các thông tin tóm tắt trong việc quản lý dữ liệu chuẩn hóa.

Redux-ORM nhỏ, đơn giản và bất biến để quản lý dữ liệu quan hệ trong Redux store của bạn

### Nhẹ nhàng

Redux-ORM rất nhanh. Tất cả các truy vấn đều là lazily evaluated và đi kèm với một hỗ trợ tích hợp cho memoization.

### Đáng tin cậy

Nó cung cấp một bản tóm tắt rõ ràng về các bản cập nhật cấp thấp, bảo vệ trạng thái khỏi các đột biến ngẫu nhiên.

### Ổn định

Với độ phủ gần như 100%, thư viện được test kỹ lưỡng để đảm bảo chất lượng code.

### Linh hoạt

Bất kể dữ liệu của bạn đến từ đâu, Redux-ORM sẽ không tồn tại. Ngay cả một lớp cơ sở dữ liệu tùy chỉnh cũng có thể.

### Tại sao bạn sử dụng Redux-ORM

Đối với ứng dụng Redux, tổ chức một phần store của bạn trông giống như một tập hợp các bảng cơ sở dữ liệu. Mỗi loại dữ liêu mà bạn muốn lưu trữ có một đối tượng được sử dụng để tra cứu bằng cách ánh xạ ID. Vì các dữ liệu không có thứ tự, nên các mảng ID lưu trữ để tìm đến dữ liệu cần thiết (cái này rất dễ hiểu khi bạn đã làm việc với MySQL hoặc tương tự).

Bởi vì dữ liệu thường được nhận từ máy chủ ở dạng nested relational, nó cần được chuyển đổi thành dạng chuẩn hóa để được thêm đúng cách vào store. Cách tiếp cận điển hình là sử dụng thư viện **Normalizr** cho việc này. Bạn có thể xác định các schema và cách chúng liên quan, chuyển schema gốc và một số dữ liệu lồng nhau vào Normalizr và nó cung cấp cho bạn phiên bản chuẩn hóa của dữ liệu phù hợp để hợp nhất vào state của bạn.

Tuy nhiên, Normalizr thực sự chỉ dành cho việc xử lý dữ liệu đến một lần. Nó không cung cấp các công cụ để xử lý dữ liệu chuẩn hóa sau khi nó nằm trong store của bạn. Ví dụ: nó không bao gồm cách chuẩn hóa dữ liệu và tra cứu các mục liên quan dựa trên ID, cũng như không giúp áp dụng các bản cập nhật cho dữ liệu đó. Có một số thư viện khác có thể trợ giúp, chẳng hạn như **Denormalizr**, nhưng nhất định cần có một thứ gì đó có thể giúp các bước này giải quyết dễ dàng hơn.

May mắn thay, một công cụ như vậy tồn tại: Redux-ORM. Hãy xem cách nó được sử dụng và cách nó có thể giúp quản lý dữ liệu chuẩn hóa trong cửa hàng dễ dàng hơn.

### Địng nghĩa Model Classes

Trước tiên, bạn cần xác định các kiểu dữ liệu khác nhau của mình và cách chúng liên quan với nhau (cụ thể là trong thuật ngữ cơ sở dữ liệu). Sau đó, khai báo các lớp ES6 mở rộng từ lớp Model của Redux-ORM. Giống như các loại tệp khác trong ứng dụng Redux.

Là một phần của các khai báo đó, hãy thêm phần trường tĩnh vào chính lớp sử dụng các toán tử quan hệ của Redux-ORM để xác định quan hệ mà lớp này có:

```
import {Model, fk, oneToOne, many} from "redux-orm";

export class Pilot extends Model{}
Pilot.modelName = "Pilot";
Pilot.fields = {
  mech : fk("Battlemech"),
  lance : oneToOne("Lance")
};

export class Battlemech extends Model{}
Battlemech.modelName = "Battlemech";
Battlemech.fields = {
    pilot : fk("Pilot"),
    lance : oneToOne("Lance"),
};

export class Lance extends Model{}
Lance.modelName = "Lance";
Lance.fields = {
    mechs : many("Battlemech"),
    pilots : many("Pilot")
}
```

### Tạo Schema

Khi bạn đã xác định các model của mình, bạn cần tạo một phiên bản của schema class Redux-ORM và chuyển các class model vào register method. Phiên bản Schema này sẽ là một singleton trong ứng dụng của bạn:

```
import {Schema} from "redux-orm";
import {Pilot, Battlemech, Lance} from "./models";

const schema = new Schema();
schema.register(Pilot, Battlemech, Lance);
export default schema;
```

### Tạo Store và Reducers

```
// Pilot.js
class Pilot extends Model {
    static reducer(state, action, Pilot, session) {
        case "PILOT_CREATE": {
            Pilot.create(action.payload.pilotDetails);
            break;
        }
    }
}

// rootReducer.js
import {combineReducers} from "redux";
import schema from "models/schema";

const rootReducer = combineReducers({
    orm : schema.reducer()
});
export default rootReducer;

```

```
// entitiesReducer.js
import schema from "models/schema";

// This gives us a set of "tables" for our data, with the right structure
const initialState = schema.getDefaultState();

export default function entitiesReducer(state = initialState, action) {
    switch(action.type) {
        case "PILOT_CREATE": {
            const session = schema.from(state);
            const {Pilot} = session;
            
            // Queue up a "creation" action inside of Redux-ORM
            const pilot = Pilot.create(action.payload.pilotDetails);
            
            // Applies the queued actions and returns an updated
            // "tables" structure, with all updates handled immutably
            return session.reduce();            
        }    
        // Other actual action cases would go here
        default : return state;
    }
}

// rootReducer.js
import {combineReducers} from "redux";
import entitiesReducer from "./entitiesReducer";

const rootReducer = combineReducers({
    entities: entitiesReducer
});

export default rootReducer;
```

### Lấy data

```
import React, {Component} from "react";
import schema from "./schema";
import {selectEntities} from "./selectors";

export function mapState(state, ownProps) {
    // Create a Redux-ORM Session instance based on the "tables" in our entities slice
    const entities = selectEntities(state);
    const session = schema.from(entities);
    const {Pilot} = session;
    
    const pilotModel = Pilot.withId(ownProps.pilotId);
    
    // Retrieve a reference to the real underlying object in the store
    const pilot = pilotModel.ref;    
    
    // Dereference a relation and get the real object for it as well
    const battlemech = pilotModel.mech.ref;
    
    // Dereference another relation and read a field from that model
    const lanceName = pilotModel.lance.name;

    return {pilot, battlemech, lanceName};
}

export class PilotAndMechDetails extends Component { ....... }

export default connect(mapState)(PilotAndMechDetails);

```

Redux-ORM đã trở thành một phần quan trọng trong bộ công cụ để viết ứng dụng Redux. Dữ liệu đang làm việc rất lồng ghép và quan hệ, và Redux-ORM hoàn toàn phù hợp cho các trường hợp sử dụng. Mặc dù nó chưa được đánh dấu là phiên bản 1.0, API vẫn nhất quán và ổn định kể từ đầu . Thực tế là thư viện thực sự đi kèm với tài liệu có ý nghĩa thực sự (cả hướng dẫn và tài liệu API) cũng là một điểm cộng rất lớn.

Nhìn chung, nên sử dụng Redux-ORM trong bất kỳ ứng dụng Redux nào cần xử lý dữ liệu quan hệ / lồng nhau được chuẩn hóa, nó sẽ giúp bạn xử lý dễ dàng hơn.

Cảm ơn và hi vọng bài viết có ích trong công việc của bạn.

Bài viết được tổng hợp từ các nguồn tài liệu:
- https://blog.isquaredsoftware.com/2016/10/practical-redux-part-1-redux-orm-basics/
- https://redux-orm.github.io/redux-orm/
- https://redux.js.org/faq/organizing-state#how-do-i-organize-nested-or-duplicate-data-in-my-state
- https://hackernoon.com/shape-your-redux-store-like-your-database-98faa4754fd5