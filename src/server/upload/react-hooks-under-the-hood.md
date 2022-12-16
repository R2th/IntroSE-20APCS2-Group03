![](https://images.viblo.asia/853346f0-e94a-4f63-99b5-57237c1653ed.png)

Kể từ phiên bản React 16.8 đã tung ra [Hooks](https://reactjs.org/hooks), một cách tiếp cận mới để quản lí state và side effect hiệu quả hơn. Tư tưởng của React Hooks đã nhanh chóng được cộng đồng JavaScript đón nhận một cách tích cực, chẳng hạn như [Vue](https://css-tricks.com/what-hooks-mean-for-vue/), [Svelte](https://twitter.com/Rich_Harris/status/1093260097558581250) hay cả [VanillaJS](https://github.com/getify/TNG-Hooks). Tuy nhiên, cách thiết kế Hooks đòi hỏi sự hiểu biết sâu về Closure trong JavaScript.

Bài viết này sẽ mô tả closure đơn giản bằng cách clone một phiên bản "React Hooks" đơn giản.

## Closure: giúp thao tác với state trong JavaScript

State trong các ngôn ngữ lập trình đơn giản có nghĩa là việc lưu giữ các giá trị.

Ví dụ:

```javascript
let a = 0;

a = a + 1; // => 1
a = a + 1; // => 2
a = a + 1; // => 3
```

Trong ví dụ trên, state được lưu giữ trong biến a. Để kiểm soát sự thay đổi của một đối tượng, chúng ta phải ghi lại state của nó. Thứ nắm giữ state trong ví dụ trên là biến `a`, nó giúp giữ state trong bộ nhớ.

Thông thường khi lập trình, bạn sẽ muốn theo dõi mọi thứ, ghi nhớ trạng thái các đối tượng và truy cập nó sau. Trong các ngôn ngữ lập trình OOP phổ biến (JS với ES6+), điều này được thực hiện bởi khái niệm `class` và `instance`, ví dụ dễ hiểu như sau:

```javascript
class Bread {
  constructor(weight) {
    this.weight = weight;
  }

  render() {
    return `My weight is ${this.weight}!`;
  }
}
```

Tuy nhiên, với JavaScript (không hỗ trợ Class từ đầu!) và trong các ngôn ngữ chỉ hỗ trợ functional programming (như Elixir, Lisp), chúng ta có thể sử dụng Closure như một cách quản lí state hiểu quả và tối ưu nhất.

Ví dụ:

```javascript
let n = 0;
const count = function() {
  n = n + 1;
  return n;
};

count(); // 1
count(); // 2
count(); // 3
```

Trong ví dụ trên đã hoàn thành việc lưu một state vào biến global `n`, tuy nhiên cách này không an toàn lắm khi biến n được expose ra và bất kì một hàm nào khác cũng có thể thay đổi giá trị của biến này. Chúng ta có thể làm tốt hơn với closure đơn giản giúp đóng gói state trong một hàm:

```javascript
const countGenerator = function() {
  let n = 0;
  const count = function() {
    n = n + 1;
    return n;
  };

  return count;
};

const count = countGenerator();
count(); // 1
count(); // 2
count(); // 3
```

Pro ghê! :smiley: Trong ngữ cảnh của functional programming, nơi function la first-class-citizen, chúng ta có thể thao tác được với state và side effect mà không cần tới những thứ như class, method hay instance.

## Closure là gì?

Một trong những lợi thế khi sử dụng Hooks trong React là giảm thiểu sự phức tạp, loại bỏ các side effect gây nhức đầu và khó tái sử dụng do việc sử dụng `class` và `higher order component` gây ra. Tuy nhiên, khi dùng Hooks thì lại có một vấn đề khác cần lưu tâm. Thay vì quan tâm về bound context (class, this...) thì chúng ta sẽ bị confuse bởi Closure:

![Closure](https://cdn.netlify.com/e3dbea97adeafbc7d65e67ec60bf345ed989f5b6/4dbb8/img/blog/tweet-markdalgleish-hooks.jpg)

Closure là một trong những concept cơ bản của Javascript và các ngôn ngữ hỗ trợ functional programming khác (như Elixir, Lisp hay cả Ruby), tuy vậy đây vẫn luôn là cơn ác mộng với nhiều developer khi mới bắt đầu. Kyle Simpson trong quyển [You Don’t Know JS](https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20%26%20closures/ch5.md) định nghĩa Closure như sau:

> "Closure is when a function is able to remember and access its lexical scope even when that function is executing outside its lexical scope."

hoặc

> "Closure là những function tham chiếu đến các biến tự do tách biệt. Nói cách khác, function được định nghĩa trong closure sẽ ghi nhớ môi trường (lexical environment) trong nó được tạo ra."

Để dễ hiểu hơn, chúng ta sẽ clone hàm useState của React Hooks bằng closure như sau:

```javascript
// Example 0
function useState(initialValue) {
  let _val = initialValue; // _val là một biến cục bộ được tạo ra bởi hàm useState
  function state() {
    // state là một hàm con trong hàm cha useState, một closure
    return _val; // state() sử dụng _val, được khai báo bởi hàm cha
  }
  function setState(newVal) {
    _val = newVal; // gán _val mà không cần expose _val
  }
  return [state, setState]; // expose hàm để gọi từ bên ngoài
}

const [foo, setFoo] = useState(0); // dùng array destructuring
console.log(foo()); // logs 0 - giá trị khởi tạo
setFoo(1); // gán _val bên trong scope của useState
console.log(foo()); // logs 1 - giá trị khởi tạo mới
```

Xong, chúng ta đã hoàn thành viện clone lại hàm useState của React Hooks. Hàm này trả về 2 hàm con, `state` và `setState`. `state` trả về biến cục bộ `_val` được khai báo ở trên và `setState` gán biến cục bộ này bằng giá trị được truyền vào (newVal). Với `foo` và `setFoo` chúng ta đã có thể thao tác với một biến cục bộ (một state).

## Dùng useState trong Functional Components

Hãy thử mô phỏng việc sử dụng hàm useState mới tạo ở trên trong một Function Component, ví dụ như một Counter Component như sau:

```javascript
// Example 1
function Counter() {
  const [count, setCount] = useState(0); // dùng hàm useState vừa mới tạo ở trên
  return {
    click: () => setCount(count() + 1),
    render: () => console.log("render:", { count: count() }),
  };
}
const C = Counter();
C.render(); // render: { count: 0 }
C.click();
C.render(); // render: { count: 1 }
```

Ở hàm này chúng ta chưa xuất ra được DOM mà mới chỉ in ra bằng console.log, tuy nhiên hàm mô phỏng này đã tạm đủ để hiểu được việc sử dụng useState trong Component của React.

Tuy vậy, hàm này vẫn chưa tương thích được 100% với React.useState API thực sự, vì `count` vẫn con đang là một hàm thay vì một biến (variable).

## Cải thiện useState để tương thích với React.useState API

Để biến `count` thành một biến thay vì một hàm cũng không phải chuyện dễ. Nếu chỉ đơn giản expose ra biến `_val` thay vì wrap nó trong một hàm, sẽ có bug ngay:

```javascript
// Example 1, hàm này sẽ bị BUG!
function useState(initialValue) {
  let _val = initialValue;
  // không còn hàm state()
  function setState(newVal) {
    _val = newVal;
  }
  return [_val, setState]; // expose _val trực tiếp
}
const [foo, setFoo] = useState(0);
console.log(foo); // logs ra 0 mà không cần gọi hàm
setFoo(1); // gán _val trong scopr của useState
console.log(foo); // vẫn logs 0 - bug cmnr!!
```

Đây là một vấn đề liên quan tới `Stale Closure`. Khi chúng ta destructure biến `foo` từ hàm `useState`, nó sẽ luôn là giá trị khởi đầu (initial value) của hàm useState mà không bao giờ trả về giá trị hiện tại (current value).

## Cải thiện Closure với Module Pattern

Chúng ta có thể giải quyết vấn đề trên bằng cách... di chuyển closure vào một closure khác. :smiley::smiley::smiley:?:smiley::smiley::smiley:

```javascript
// Example 2
const MyReact = (function() {
  let _val; // giữ state trong module scope
  return {
    render(Component) {
      const Comp = Component();
      Comp.render();
      return Comp;
    },
    useState(initialValue) {
      _val = _val || initialValue; // gán lại giá trị mới sau mỗi lần chạy
      function setState(newVal) {
        _val = newVal;
      }
      return [_val, setState];
    },
  };
})();
```

Như cách viết ở trên, chúng ta đã sử dụng Module pattern để tạo ra một hàm useState tương thích với React API. Cách này cho phép `MyReact` "render" function component, cho phép gán lại giá trị của biến cục bộ `_val` mỗi lần với closure chuẩn xác:

```javascript
// Example 2.1
function Counter() {
  const [count, setCount] = MyReact.useState(0);
  return {
    click: () => setCount(count + 1),
    render: () => console.log("render:", { count }),
  };
}
let App;
App = MyReact.render(Counter); // render: { count: 0 }
App.click();
App = MyReact.render(Counter); // render: { count: 1 }
```

Bạn có thể đọc thêm về Module Pattern và Closure trong [You Don't Know JS](https://medium.com/javascript-deep-dive/ydkjs-scope-and-closures-cf1f65ac831d).

## Tiếp tục clone useEffect

Sau useState, một React Hook cơ bản nhất, thì useEffect cũng là một API khá quan trọng của React Hooks (nó sẽ thay thế cho các lifecycle của React Class Component như ComponentDidMount hay ComponentDidUpdate...). Không như useState, useEffect được thực thi một cách bất đồng bộ, có nghĩa rằng nó sẽ có nhiều khả năng bị lỗi hơn (đối mặt với các vấn đề của closure).

Chúng ta có thể mở rộng `MyReact` ở trên để tiếp tục implement bản clone của `useEffect`:

```javascript
// Example 3
const MyReact = (function() {
  let _val, _deps; // giữ state và dependencies trong scope
  return {
    render(Component) {
      const Comp = Component();
      Comp.render();
      return Comp;
    },
    useEffect(callback, depArray) {
      const hasNoDeps = !depArray;
      const hasChangedDeps = _deps ? !depArray.every((el, i) => el === _deps[i]) : true;
      if (hasNoDeps || hasChangedDeps) {
        callback();
        _deps = depArray;
      }
    },
    useState(initialValue) {
      _val = _val || initialValue;
      function setState(newVal) {
        _val = newVal;
      }
      return [_val, setState];
    },
  };
})();

function Counter() {
  const [count, setCount] = MyReact.useState(0);
  MyReact.useEffect(() => {
    console.log("effect", count);
  }, [count]);
  return {
    click: () => setCount(count + 1),
    noop: () => setCount(count),
    render: () => console.log("render", { count }),
  };
}
let App;
App = MyReact.render(Counter);
// effect 0
// render {count: 0}
App.click();
App = MyReact.render(Counter);
// effect 1
// render {count: 1}
App.noop();
App = MyReact.render(Counter);
// // không có effect nào chạy
// render {count: 1}
App.click();
App = MyReact.render(Counter);
// effect 2
// render {count: 2}
```

Để theo dõi các dependencies (vì `useEffect` sẽ chạy lại mỗi khi một trong các dependencies thay đổi), chúng ta sẽ sử dụng một biến khác để theo dõi: `_deps`.

## Dùng Hooks Array

Các hàm clone `useState` và `useEffect` ở trên gần như đã hoạt động tốt về mặt chức năng, tuy nhiên chúng ta sẽ gặp vấn đề khi sử dụng cả 2 hàm này cùng lúc (chỉ có thể tồn tại 1 trong 2, hoặc sẽ có bug). Để giải quyết vấn đề này, chúng ta sẽ dùng hooks array, như Rudi Yardley đã viết: [React Hooks không có gì là ma thuật cả, chỉ với array](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e) :smiley:. Chúng ta có thể thu gọn `_val` và `_deps` vào hooks array vì chúng sẽ không bao giờ trùng nhau:

```javascript
// Example 4
const MyReact = (function() {
  let hooks = [],
    currentHook = 0; // hooks array
  return {
    render(Component) {
      const Comp = Component(); // chạy effects
      Comp.render();
      currentHook = 0; // reset cho lần render kế tiếp
      return Comp;
    },
    useEffect(callback, depArray) {
      const hasNoDeps = !depArray;
      const deps = hooks[currentHook]; // type: array | undefined
      const hasChangedDeps = deps ? !depArray.every((el, i) => el === deps[i]) : true;
      if (hasNoDeps || hasChangedDeps) {
        callback();
        hooks[currentHook] = depArray;
      }
      currentHook++;
    },
    useState(initialValue) {
      hooks[currentHook] = hooks[currentHook] || initialValue; // type: any
      const setStateHookIndex = currentHook; // cho closure cuả setState's
      const setState = newState => (hooks[setStateHookIndex] = newState);
      return [hooks[currentHook++], setState];
    },
  };
})();
```

Giải thích gọn: sẽ có một array của các hooks và một chỉ mục (currentHook) sẽ tăng lên mỗi khi có một hook được gọi, và được reset mỗi khi component được render lại.

## Nguồn gốc các quy tắc của React Hooks

Qua cách implement bản clone của Hooks ở trên các bạn có thể hiểu sơ được về một trong những quy tắc sử dụng React Hooks: [chỉ được gọi Hooks ở Top Level](https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level). Chúng ta đã mô hình hóa một cách rõ ràng sự phụ thuộc của React vào thứ tự các lần gọi với biến `currentHook` như ở trên. Bạn có thể đọc thêm về mô tả về quy tắc này tại [trang chủ docs của React](https://reactjs.org/docs/hooks-rules.html#explanation).

### References

- [https://medium.com/javascript-deep-dive/ydkjs-scope-and-closures-cf1f65ac831d](https://medium.com/javascript-deep-dive/ydkjs-scope-and-closures-cf1f65ac831d)
- [https://www.netlify.com/blog/2019/03/11/deep-dive-how-do-react-hooks-really-work/](https://www.netlify.com/blog/2019/03/11/deep-dive-how-do-react-hooks-really-work/)
- [https://stackoverflow.com/questions/36636/what-is-a-closure](https://stackoverflow.com/questions/36636/what-is-a-closure)