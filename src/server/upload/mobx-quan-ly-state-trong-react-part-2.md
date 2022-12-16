## Lời nói đầu
[Part 1](https://viblo.asia/p/quan-ly-state-trong-react-bang-mobx-part-1-OeVKB9aM5kW) mình đã hướng dẫn cách viết mobx cơ bản và cách kết hợp mobx với react. Nay mình sẽ hướng dẫn các bạn một số function đặc biệt trong **mobx** và **mobx-react**

## useLocalStore - giải pháp thay thế useState hook
Bình thường trong function component chúng ta muốn dùng state ta sẽ dùng `useState`
```javascript
const [name, setName] = useState('Hello');
```

Chúng ta hãy tưởng tượng có 10 `state` lại phải có 10 function đóng vai trò `setState` đi cùng. Thật là nhiều phải không? Tuy nhiên, nếu chúng ta dùng `useLocalStore`, một function built-in nằm trong `mobx-react` thì không cần như thế nữa. Khi dùng function này chúng ta sẽ có một local store cỡ nhỏ. Việc thay đổi nó sẽ dựa vào việc **mutate** trực tiếp Bạn hãy nhìn ví dụ dưới đây:

```javascript
import React from "react";
import { useLocalStore, observer } from "mobx-react";

export const CounterWithLocalStore = observer(() => {
  // Khai báo một store
  const store = useLocalStore(() => ({
    count: 0,
    increase: () => (store.count += 1), // việc thay đổi sẽ được mutate trực tiếp
    decrease: () => (store.count -= 1),
    reset: () => (store.count = 0)
  }));
  const { count, increase, decrease, reset } = store;

  return (
    <>
      <p>Count (with local store): {count}</p>
      <button onClick={increase}>Increase +</button>
      <button onClick={decrease}>Decrease -</button>
      <button onClick={reset}>Reset</button>
    </>
  );
});
```

## computed - giá trị sẽ được tính toán lại mỗi khi observable value thay đổi

```javascript
import { observable, computed } from "mobx"

class OrderLine {
    @observable price = 0
    @observable amount = 1

    constructor(price) {
      this.price = price
    }

    // Giá trị này sẽ được tính toán và trả về mỗi khi 2 giá trị observable ở trên bị thay đổi
    @computed get total() {
      return this.price * this.amount
    }
}
OrderLine.price = 12;

console.log(OrderLine.total) // 12
```

## autorun - thường dùng cho việc log thông tin
Có vài điều cần lưu ý về `autorun`

* Cũng giống như `computed` cũng sẽ chạy khi `observable` thay đổi, tuy nhiên `autorun` không trả về giá trị mới
* `autorun` trả về một disposer function, hàm này có vai trò huỷ bỏ `autorun`
* Tham số thứ nhất mà `autorun` trả về một biến dùng để **debug**
```javascript
import { observable, computed, autorun } from "mobx"

class OrderLine {
    @observable price = 0
    @observable amount = 1

    constructor(price) {
        this.price = price;
        autorun((reaction) => {
          console.log(this.total)
          if (this.total > 10) {
            reaction.dispose(); // dừng log lại nếu total > 10
          }
        })
    }

    // Giá trị này sẽ được tính toán và trả về mỗi khi 2 giá trị observable ở trên bị thay đổi
    @computed get total() {
      return this.price * this.amount
    }
}

OrderLine.price = 9; // log ra 9
OrderLine.price = 11; // log ta 11 sau đó bị huỷ bỏ
OrderLine.price = 12: // ngưng log vì đã bị huỷ bỏ
```

## when - xảy ra với điều kiện nào

Đôi lúc các bạn sẽ muốn biết khi nào dữ liệu đấy thay đổi và sẽ thay đổi khi nó phù hợp với điều kiện nào
```javascript
import { observable, computed, when } from "mobx"

class OrderLine {
    @observable price = 0
    @observable amount = 1

    constructor(price) {
      this.price = price;
      // chỉ chạy một lần
      // Khi this.total lớn hơn 10 thì gán lại this.total = 0
      when(() => this.total > 10, () => (this.total = 0));
    }

    // Giá trị này sẽ được tính toán và trả về mỗi khi 2 giá trị observable ở trên bị thay đổi
    @computed get total() {
      return this.price * this.amount
    }
}

OrderLine.price = 11;
console.log(OrderLine.total) // 0
```

## reaction - một phiên bản nâng cấp so với autorun
reaction nhận vào hai tham số, cả hai đều là function

* function thứ nhất (data function) là function đóng vai trò là dữ liệu được theo dõi, dữ liệu trả lại sẽ là đầu vào cho function thứ hai
* function thứ hai (effect function) có hai tham số được trả về, tham số thứ nhất là dữ liệu từ function thứ nhất, tham số thứ hai là reaction (vai trò như trong autorun)

```javascript
import { observable, computed, reaction } from "mobx"

class Todo {
    @observable todos = [
      {
          title: "Make coffee",
          done: true,
      },
      {
          title: "Find biscuit",
          done: false,
      },
    ]

    constructor(price) {
      // reaction 1
      // Cách sửa dụng reaction sai: nó chỉ theo dõi dộ dài của array todos
      reaction(
        () => todos.length,
        (length) => console.log("reaction 1:", todos.map((todo) => todo.title).join(", "))
      )
      // reaction 2
      // Cách sửa dụng đúng: nó sẽ theo dõi cả độ dài và khi titles thay đổi
      reaction(
        () => todos.map((todo) => todo.title),
        (titles) => console.log("reaction 2:", titles.join(", "))
      )
    }
}

Todo.todos.push({ title: "explain reactions", done: false })
// prints:
// reaction 1: Make coffee, find biscuit, explain reactions
// reaction 2: Make coffee, find biscuit, explain reactions

Todo.todos[0].title = "Make tea"
// prints:
// reaction 2: Make tea, find biscuit, explain reactions
```

## Kết luận

Qua hai phần về `mobx`, mình đã giới thiệu cho các bạn cách dùng `mobx` với `react` cũng như các function thường sử dụng đi kèm. Mong các bạn các bạn làm việc thật tốt với `mobx`. Thanks!