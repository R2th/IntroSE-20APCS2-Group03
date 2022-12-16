Có lẽ `state` là một trong những điểm thường xuyên gây rắc rối nhất trong React.

Tưởng tượng rằng bạn có một form để edit một user. Thông thường bạn sẽ tạo ra một handler đơn lẻ cho việc xử lý thay đổi với tất cả các form fields. Nó có thể trông giống như sau:

```
updateState(event) {
 const {name, value} = event.target;
 let user = this.state.user; // this is a reference, not a copy...
 user[name] = value; // so this mutates state 🙀
 return this.setState({user});
}
```

Vấn đề ta quan tâm nằm ở dòng số 4. Line 4 thực hiện việc thay đổi state bởi vì biến user là một reference tới state. React state cần được xử lý như một immutable (bất biến).

Từ React docs:

> Never mutate `this.state` directly, as calling `setState()` afterwards may replace the mutation you made. Treat this.state as if it were immutable.

Tại sao lại như vậy:

1) Các batches `setState` hoạt động ngầm. Điều này có nghĩa là một xử lý thay đổi state một cách thủ công có thể bị ghi đè khi `setState` đang được thực hiện.
2) Nếu bạn tạo một method `shouldComponentUpdate`, bạn không thể sử dụng `===` bên trong nó bởi object reference sẽ không thay đổi. Vì vậy hướng tiếp cận ở trên tiềm ẩn việc ảnh hưởng tới performance.

Chú ý: Ví dụ ở trên thường hoạt động không vấn đề gì, nhưng để tránh những tình huống bất thường, hãy xử lý state như một immutable.

Đây là bốn cách để bạn xử lý state như một immutable:

## Cách 1: Object.assign

`Object.assign` tạo ra một bản sao của một object. Parameter đầu tiên là đối tượng, và bạn chỉ rõ một hoặc nhiều parameter cho các properties mà bạn muốn chỉnh sửa. Do đó, đối với ví dụ như trên ta có thể sửa lại như sau ở dòng số 3:

```
updateState(event) {
 const {name, value} = event.target;
 let user = Object.assign({}, this.state.user);
 user[name] = value;
 return this.setState({user});
}
```

Trên dòng 3, tôi nói rằng Tạo một đối tượng trống mới và thêm tất cả các thuộc tính trên this.state.user vào nó. Điều này tạo ra một bản sao riêng biệt của đối tượng người dùng được lưu trữ trong trạng thái. Bây giờ tôi đã an toàn để biến đổi đối tượng người dùng trên dòng 4 - nó là một đối tượng hoàn toàn tách biệt với đối tượng ở trạng thái.

Hãy chắc chắn với polyfill Object.assign vì nó không được hỗ trợ trong IE và không được dịch bởi Babel. Bốn lựa chọn để xem xét:

1) object-assign
2) The MDN docs
3) Babel Polyfill
4) Polyfill.io

## Cách 2: Object Spread

Object spead hiện đang là một stage 3 feature, và có thể được dịch bở Babel. Cách tiếp cận này ngắn gọn hơn:

```
updateState(event) {
 const {name, value} = event.target;
 let user = {...this.state.user, [name]: value};
 this.setState({user});
}
```

Trên dòng 3, tôi nói, sử dụng tất cả các thuộc tính trên this.state.user để tạo một đối tượng mới, sau đó đặt thuộc tính được đại diện bởi [name] thành một giá trị mới được truyền vào event.target.value. Vì vậy, cách tiếp cận này hoạt động tương tự như cách tiếp cận Object.assign, nhưng có hai lợi ích:

1) Không cần có polyfill, bởi Babel có thể dịch được
2) Ngắn gọn súc tích hơn

Bạn có thể sử dụng cả destructuring và inlining để viết nó trong vòng 1 dòng

```
updateState({target}) {
 this.setState({user: {...this.state.user, [target.name]: target.value}});
}
```

Tôi destructuring event trong method signature để có được một tham chiếu đến event.target. Sau đó, tôi sẽ khai báo trạng thái đó thành một bản sao của this.state.user với thuộc tính có liên quan được đặt thành một giá trị mới. Tôi thích cách này ngắn gọn. Đây hiện là cách tiếp cận yêu thích của tôi để viết trình xử lý thay đổi. 🏅

Hai cách tiếp cận trên là những cách phổ biến và đơn giản nhất để xử lý trạng thái bất biến. Muốn có thêm sức mạnh? Kiểm tra hai tùy chọn khác dưới đây.

## Cách 3: Immutability Helper

Immutability-helper` là một thư viện tiện dụng cho việc thay đổi bản sao của một dữ liệu mà không cần thay đổi bản gốc. Thư viện này được gợi ý bởi React docs:

```
// Import at the top:
import update from 'immutability-helper';

updateState({target}) {
 let user = update(this.state.user, {$merge: {[target.name]: target.value}});
 this.setState({user});
}
```

Trên dòng 5, tôi gọi là hợp nhất, đây là một trong nhiều lệnh được cung cấp bởi người trợ giúp bất biến. Giống như Object.assign, tôi truyền cho nó đối tượng đích làm tham số đầu tiên, sau đó chỉ định thuộc tính mà tôi thích hợp nhất.

Có rất nhiều người giúp đỡ bất biến hơn thế này. Nó sử dụng một cú pháp lấy cảm hứng từ ngôn ngữ truy vấn MongoDB, và cung cấp nhiều cách mạnh mẽ để làm việc với dữ liệu không thay đổi.

## Cách 4: Immutable.js


Bạn muốn bắt buộc immutablity một cách programmatically? Hãy xem xét sử dụng immutable.js
Thư viện này cung cấp các cấu trúc dữ liệu immutable

Đây là một ví dụ, sử dụng một immutable map:

```
// At top, import immutable
import { Map } from 'immutable';

// Later, in constructor...
this.state = {
  // Create an immutable map in state using immutable.js
  user: Map({ firstName: 'Cory', lastName: 'House'})
};

updateState({target}) {
 // this line returns a new user object assuming an immutable map is stored in state.
 let user = this.state.user.set(target.name, target.value);
 this.setState({user});
}
```

Có ba bước cơ bản ở trên:
1) Import immutable
2) Chọn state cho một immutable map trong constructor
3) Sử dụng method set trong change handler để tạo ra một bản sao mới của user.

Vẻ đẹp của immutable.js: Nếu bạn cố gắng thay đổi trạng thái trực tiếp, nó sẽ thất bại. Với các cách tiếp cận khác ở trên, nó rất dễ quên và React đã thắng Cảnh báo bạn khi bạn đột biến trạng thái trực tiếp.

Nhược điểm của bất biến?

1) Phình to source code. Immutable.js thêm 57K rút gọn vào gói của bạn. Việc xem xét các thư viện như Preact có thể thay thế React chỉ trong 3K, điều mà khó có thể chấp nhận.
2) Cú pháp. Bạn phải tham chiếu các thuộc tính đối tượng thông qua các chuỗi và các cuộc gọi phương thức thay vì trực tiếp. Tôi thích user.name hơn user.get (‘name,).
3) YATTL (Còn một điều cần học nữa) - Bất kỳ ai tham gia nhóm của bạn cũng cần học một API khác để nhận và thiết lập dữ liệu, cũng như một bộ kiểu dữ liệu mới.

Một số sự thay thế khác mà bạn có thể xem xét:

- seamless-immutable
- react-copy-write

## Cảnh báo: Chú ý với những Nested Objects!

Tùy chọn # 1 và # 2 ở trên (Object.assign và Object lây lan) chỉ thực hiện một bản sao nông. Vì vậy, nếu đối tượng của bạn chứa các đối tượng lồng nhau, các đối tượng lồng nhau đó sẽ được sao chép bằng tham chiếu thay vì theo giá trị. Vì vậy, nếu bạn thay đổi đối tượng lồng nhau, bạn sẽ biến đổi đối tượng ban đầu. 🙀

Hãy phẫu thuật về những gì bạn nhân bản. Don lồng nhân bản tất cả mọi thứ. Nhân bản các đối tượng đã thay đổi. Bất biến-người trợ giúp (đã đề cập ở trên) làm cho điều đó dễ dàng. Cũng như các lựa chọn thay thế như immer, updeep, hoặc một danh sách dài các lựa chọn thay thế.

Bạn có thể bị cám dỗ để tiếp cận với các công cụ hợp nhất sâu như clone-deep hoặc lodash.merge, nhưng tránh nhân bản sâu một cách mù quáng.

Đây là lý do tại sao:
1) Deep clone rất tốn xử lý
2) Deep clone thường lãng phí (thay vào đó, chỉ nên clone những thứ thực sự thay đổi)
3) Deep clone tạo ra những renders không cần thiết bởi React cho rằng mọi thứ được thay đổi trong khi thực tế chỉ có một object con cụ thể được thay đổi

## Tham khảo
https://medium.freecodecamp.org/handling-state-in-react-four-immutable-approaches-to-consider-d1f5c00249d5