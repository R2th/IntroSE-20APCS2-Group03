MobX có các `decorators` để thay đổi các thuộc tính `observable` được hoạt động của nó. Trong bài viết ngày hôm nay chúng ta sẽ tìm hiểu từng cái một và cách sử dụng chúng

# Modifiers

MobX đi kèm với `decorators` dưới đây để , `observable` các thuộc tính sẽ hoạt động như thế nào:

- `observable`: Đại diện cho `observable.deep` , bất kỳ giá trị nào được gán cho `observable` sẽ tự động được chuyển đổi thành `observable.deep`.

- `observable.deep` : Modifier mặc định được sử dụng đối với bất kỳ đối tượng nào `observable` . Nó sao chép và chuyển đổi bất kỳ `array`, `map`, hoặc `plain object` thành đối tượng quan sát

- `observable.ref`: Tắt chức năng tự động theo dỏi với các đối tượng thay đổi.Đối với `object` sẽ chỉ theo dõi các thay đổi tham chiếu đối với `object`,
  có nghĩa là bạn sẽ cần phải thay đổi toàn bộ `object` để kích hoạt nó

- `observable.shallow`: Chỉ sử dụng đối với các `collections`.Đối với các property trong `object` nó sẽ không được coi là một `observable`

- `observable.struct`: Giống với `ref` nhưng nó sẽ bỏ qua giá trị mới nếu giá trị mới giống với giá trị hiện tại

- `computed` : Tạo ra một thuộc tính tuỳ chình. Nó sẻ tự động thay đổi theo thuộc tính gốc của nó

- `computed(options)` : Giống như `computed`, nhưng thêm các tùy chọn bổ sung

- `computed.struct` — Giống như `computed` , nhưng chỉ thông báo cho bất kỳ `observers` nào khi giá trị được tạo ra về cấu trúc khác với giá trị trước đó

- `action` : Tạo một hành động

- `action(name)` : Tạo một hành động ghi đè tên

- `action.bound` : Tạo một hành động và `binds this`



`Decorator` có thể được sử dụng `MobX’s decoration`, `Observable.object`, `expandObservable` và `observable` được để chỉ định cách các đối tượng hoạt động.

`Observable.deep` là hành vi mặc định cho bất kỳ cặp `key-value` trị nào theo mặc định và được tính cho `getters`.
Ví dụ, chúng ta có thể định nghĩa một giá trị quan sát được như sau:

```js
import { observable, action } from "mobx";
const person = observable(
  {
    firstName: "John",
    lastName: "Smith",
    age: 42,
  get fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
  setAge(age) {
      this.age = age;
    }
  },
  {
    setAge: action
  }
);

```

Như trên chúng ta có các `decorators` mặc định cho tất cả các thuộc tính ngoại trừ setAge chúng ta đã xác định rõ ràng là một hành động.

Do đó, firstName, lastName và age là những thứ `observable` được và fullName là một trường được tính toán.
Chúng ta có thể sử dụng `decorators` như sau:

```js
import { observable, action, decorate } from "mobx";
class Person {
  firstName = "John";
  lastName = "Smith";
  age = 42;
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
  setAge(age) {
    this.age = age;
  }
}
decorate(Person, {
  firstName: observable,
  lastName: observable,
  age: observable,
  setAge: action
});
```

Như trên  chúng ta gọi `decorators` với `class` làm đối số đầu tiên, sau đó gọi một đối tượng với các trường mà chúng ta muốn sửa đổi làm đối số thứ hai.
Chúng tôi đặt firstName, lastName và age là `observable` được và setAge là một hành động.
fullName là một trường được tính toán vì nó là tùy chọn mặc định cho `getters`.

# Deep Observability

Khi MobX tạo một đối tượng `observable` bằng cách sử dụng `observable`, `observable.object`  hoặc expandObservable, nó sẽ giới thiệu các thuộc tính `observable` sử dụng ` deep modifier` theo mặc định.
` Deep modifier ` gọi đệ quy `observable(newValue)`  cho bất kỳ giá trị được chỉ định nào sử dụng ` Deep modifier ` cho đến khi nó lấy được đối tượng cuối cùng.

# Reference Observability
Trong một số trường hợp, các đối tượng không cần phải chuyển đổi thành `observables` . Ví dụ: chúng ta không muốn làm điều này cho các đối tượng bất biến hoặc các đối tượng được quản lý bởi thư viện bên ngoài.
Trong trường hợp này, chúng ta có thể sử dụng công cụ sửa đổi `ref`

Ví dụ, chúng ta có thể sử dụng nó như sau: 

```js
class Person {
  firstName = "John";
  lastName = "Smith";
  @observable.ref age = 42;
}
```

Trong đoạn mã trên, chúng ta đã thêm  `Observable.ref` vào age để MobX sẽ chỉ theo dõi tham chiếu của nó nhưng không cố gắng chuyển đổi giá trị của nó.

# Shallow Observability
Chúng ta có thể sử dụng  `Observable.shallow` để áp dụng khả năng quan sát một cấp. Chúng ta cần điều này để tạo ra `collection ` của `observable` tham chiếu

Ví dụ, chúng ta có thể sử dụng nó như sau:

```js
class Books {
  @observable.shallow authors = [];
}
```
`{deep: false}` có thể được chuyển như một option cho các tập hợp  `observable , observable.object , observable.array , observable.map` và`extendObservable` để tạo `shallow collections`.

# Tài liệu tham khảo
- https://mobx.js.org/observable-state.html#available-annotations
- https://tarun-kalra.medium.com/a-simple-guide-to-mobx-practical-examples-ed0e8279e884