Ngay từ thuở khai sinh lập ngôn ngữ, các React developers đã có ý tưởng về một đứa con mang trong mình dòng máu thuần khiết, không bị lai tạp, thay đổi => Pure component đã ra đời. Khái niệm này được nhiều người gọi với các tên khác nhau (stateful/pure, smart/dumb, container/presentational, etc.), nhưng tất cả đều cùng chung miêu tả một ý nghĩa "*không thay đổi*". Các thành phần này vẫn sử dụng React.Component nhưng đã có một sự cải tiến để nó trở nên "*pure*".

![](https://images.viblo.asia/4df133d7-1977-4f12-974b-a88dc2f69448.png)

Trong bài viết này, mình sẽ thảo luận về các concept trong đó sử dụng Pure component là lợi thế và khi nào không nên. Ngoài ra chúng ta cũng thảo luận về sự khác biệt giữa Component và Pure component

## What problem does it solve? ##

Theo mặc định, một React.Component đơn giản có anh shouldComponentUpdate luôn luôn trả về đúng. Điều này cũng tốt thôi bởi vì điều đó có nghĩa là React sẽ luôn cập nhật component trong trường hợp có bất kỳ dữ liệu mới nào để hiển thị. Tuy nhiên, nó có thể dẫn đến một vài trường hợp render không cần thiết. Một trong những cách thiết thực nhất là tối ưu lại cái anh shouldComponentUpdate để anh ấy kiểm tra xem có cần render hay không.

Other way :thinking: các anh developers React đã sinh ra em Pure component để ngăn việc render không cần thiết. Hãy cùng xem các ví dụ xung quanh bài toán hiệu suất này nhé ... 

**Example**:

**Note**: bad code :hankey: trong các ví dụ để thể hiện các vấn đề mà chúng ta gặp phải. Xin đừng viết chúng cho các dự án thực tế :pray:

**Todos**

Đầu tiên, mình có một React.component, đây là cái sẽ được render. Trong trường hợp này, mình có một array có tên là **todos**, với mỗi item sẽ có các thuộc tính **title**, **done** và **notes**

```
constructor(props) {
    super(props);
    this.state = { 
        todos: [
            { title: 'take out the trash', done: false, notes: ['boring'] },
            { title: 'walk dog', done: true, notes: ['exercise'] },
            { title: 'read about React', done: false, notes: ['fun!'] },
        ]
    };
}
```

Sau đó, lại có một phương thức **componentDidMount**. Mục đích của anh ý là thay đổi state của app bạn mỗi giây để xem :eyes: anh chàng React sẽ xử lý những thay đổi đó như thế nào. Ngay bây giờ, nó sẽ cập nhật **state.todos** giống với giá trị của **state.todos trước đó**.

```
componentDidMount() {
    setInterval(() => {
        this.setState((oldState) => {
            return { todos: [...oldState.todos] }
        });
    }, 1000);
}
```

Cuối cùng, còn cần một hàm render() để ví dụ trở nên ý nghĩa hơn. Nó sẽ render ra một list chứa các TodoItem component, và truyền vào các thuộc tính title, done và notes. Điều mà bạn đang chờ mình cũng đang hóng là nhìn các thành phần này render như thế nào. 

```
render() {
    console.log('Todos render called');
    return (<Container>
        {this.state.todos.map((todo, i) => {
            return (<TodoItem
            key={i}
            title={todo.title}
            done={todo.done}
            notes={todo.notes}
            />);
        })}
        </Container>);
}
```

**TodoItem** cũng giống như todos nhưng nó đơn giản hơn, thừa hưởng React.component nhưng chỉ thực hiện một hàm render() để hiện thị các props của nó ( title, done và notes )

```
render() {
    console.log('TodoItem render called');
    return (<Container>
            {this.props.done ? '✓': '▢'} {this.props.title}
            ({this.props.notes.join(', ')})
        </Container>);
}
```

## What’s the problem?

Chà, nếu bạn tự nhìn vào console, bạn sẽ thấy thông tin được hiển thị trên đó: 

```
Todos render called
TodoItem render called
TodoItem render called
TodoItem render called
Todos render called
TodoItem render called
TodoItem render called
TodoItem render called
```
Mỗi giây, mỗi giây...

Điều đó có vẻ ngớ ngẩn, dữ liệu của tôi không có sự thay đổi !!!

Bạn có thể nói đúng - ở đó, bạn không cần phải reder lại bất kỳ thành phần nào trong số này vì dữ liệu không thay đổi. Nhưng React không biết điều này - phương thức **setState** từ **onComponentDidmount** kích hoạt render lại mỗi giaay cho thành phần Todos và các thành phần con của nó.

### How do we re-render less?

Bây giờ hãy tập trung vào TodoItem. Nó render ba lần cho mỗi một render Todos. Vậy mình sẽ tối ưu nó trước sau đó đến anh Todos. 

**Làm thế nào để có thể hạn chế việc render TodoItem ? :hammer_and_wrench:**

Điều đó dẫn mình đến với chân ái Pure component. TodoItem không cần phải render lại vì không có dữ liệu nào thay đổi. Props truyền vào mỗi lần là như nhau, không có internal state. Hãy thử thay đổi TodoItem thành React.PureComponent 

```
class TodoItem extends React.PureComponent { // This line changed

    render() {
        console.log('TodoItem render called');
        return (<Container>
                {this.props.done ? '✓': '▢'} {this.props.title}
                ({this.props.notes.join(', ')})
            </Container>);
    }
}
```
Sau khi thay đổi thì ...

```
Todos render called
TodoItem render called
TodoItem render called
TodoItem render called
Todos render called
Todos render called
Todos render called
Todos render called
```

Sau khi TodoItems được khởi tạo, chúng sẽ không bao giờ render lại nữa mặc cho parent Todos render lại bao nhiêu lần đi chăng nữa. 

**Boom. :boom:**

Bạn đã nắm được vấn đề của chúng ta chưa? Mình mới chỉ đang hạn chế việc render không cần thiết của TodoItem bằng cách đổi sang sử dụng **PureComponent**

### How does PureComponent work?

Bạn đã có một manh mối lớn trong việc sử dụng component. Pure component ? Nó đã thực sự làm việc như thế nào ?

Bạn có biết thường thì chúng ta nên viết **shouldComponentUpdate** để kiểm tra việc có cần thiết render lại component đó hay không? Well, mấy anh developer React đã viết cho chúng ta shouldComponentUpdate trong PureComponent. 

```
if (type.prototype && type.prototype.isPureReactComponent) {
    shouldUpdate = !shallowEqual(oldProps, props) ||
                   !shallowEqual(oldState, state);
}
```

**Note:** React check cả props và state. Ở đây mình sẽ tập trung vào state vì nó làm cho các ví dụ về việc render trở nên dễ hiểu hơn. Nhưng việc áp dụng state vào props ở đây là tương tự. 

> Performs equality by iterating through keys on an object and returning false when any key has values which are not strictly equal between the arguments. Returns true when the values of all keys are strictly equal.

```
function shallowEqual(objA: mixed, objB: mixed): boolean {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null ||
      typeof objB !== 'object' || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (let i = 0; i < keysA.length; i++) {
    if (
      !hasOwnProperty.call(objB, keysA[i]) ||
      !is(objA[keysA[i]], objB[keysA[i]])
    ) {
      return false;
    }
  }

  return true;
}
```
Đợi đã, **"strictly equal"** có nghĩa là gì ?
Đó là câu hỏi rất hay, vì vậy mình sẽ dành cả một phần dưới cho nó :rofl:

### Side note: shallow equality

Một shallow equality là kiểm tra các giá trị của ID object ( như trong địa chỉ ô nhớ, nơi mà JS lư trữ thông tin cho đối tượng cụ thể đó ) giống nhau, nhưng không phải nội dung của chúng giống nhau. Vì vậy shallow equality có nghĩa là những gì mà bạn sẽ nghĩ về từ "Equal"
```
const value = 'cat';

const item1 = value;
const item2 = value;

console.log(item1 === item2); // true
```
Và một ví dụ về định nghĩa equal của JS, có thể định nghĩa về JS của tôi vs họ khác nhau

```
const value = 'cat';

const array1 = [value];
const array2 = [value];

console.log(array1 === array2); // false
```

Mặc dù chúng ta có thể thấy rõ nội dung của mảng 2  giống hệt như mảng 1 JS được đăng ký, nhưng với JS chúng là khác nhau vì id của chúng khác nhau. Trong trường hợp này, mình đã tạo ra hai mảng hoàn toàn riêng biệt, điều đó tình cờ có cùng một dữ liệu trong đó.

Cái gì thay thế? :scream::scream:

Chúng ta có thể kiểm tra bên trong mỗi chỉ mục và xem liệu tất cả các giá trị có giống nhau hay không - đây được gọi là **"deep" equality check** . Một cái gì đó như thế này:
```
const value = 'cat';

const array1 = [value];
const array2 = [value];

let equal = true;
array1.forEach((item, index) => {
    equal = equal && array1[index] === array2[index];
});

console.log(equal); // true

```

**Tại sao một shallow equality lại hữu ích**
Well, mình có thể trả lời bạn là nó rất nhanh. Ở ví dụ trên chúng ta phải thực hiện loop từng item theo chỉ mục của mảng để xác định mảng bằng nhau. Nhưng trong một trường hợp khác, có thứ gì đó khác trong mảng có thể kiến việc duyệt mảng của bạn bị chậm đi nhanh chóng. 

### :warning: Pure Component là một shallow equality

React sử dụng shallow equality là một cách tối ưu performant tốt hơn so với thực hiện deep equal. Trong thực tế, React thậm chí còn không cung cấp deep equality check. Thay vào đó bạn có thể thực hiện shallow check  với Pure component và tự viết code check với shouldComponentUpdate hoặc không làm gì cả và nó sẽ tự động render lại các component ( default mà :rofl: ) . Tại sao React không làm chặt chẽ với deep equality check, bạn thử tưởng tượng xem, với những trường hợp dữ liệu lồng nhau rất nhiều, việc kiểm tra sẽ tốn rất nhiều thời gian và hiệu năng, thật nguy hiểm. 

Nhưng đời không như là mơ, tất cả chỉ là một viễn cảnh tốt đẹp đang được vẽ ra trước mắt bạn với một anh data thân thiện. Nếu state và props thay đổi các component render lại khi cần thì yeah , ứng dụng của bạn quá tuyệt vời :clap:
Tuy nhiên, nếu bạn không xử lý anh data này đúng cách có thể dẫn đến vô tình không render lại khi bạn cần ...

Mình có thể đưa bạn một ví dụ:
Hãy thay đổi TodoItem ở ví dụ trên thành một PureComponent, và thay đổi componentDidMount của Todo để gây rối một vài dữ liệu 

```
componentDidMount() {
    setInterval(() => {
        this.setState((oldState) => {
            oldState.todos[0].done = !oldState.todos[0].done; // new line
            return { todos: [...oldState.todos] }
        });
    }, 1000);
}
```
Nếu bạn chạy, state "done" cho item đầu tiên thực hiện bật tắt mỗi giây. Có vẻ cũng hợp lý, mình đang thực hiện cập nhập dữ liệu và hiển thị đúng. Nhưng hãy thử cách này xem :

```
componentDidMount() {
    setInterval(() => {
        this.setState((oldState) => {
            oldState.todos[0].notes.push('smelly'); // new line
            return { todos: [...oldState.todos] }
        });
    }, 1000);
}
```

Thông thường như chúng ta nghĩ, việc đầu tiên todo item sẽ được render lại mỗi giây với "smelly" note. Nhưng điều đó không diễn ra, Wth ? Thực tế nó chỉ initial render và không có note "smelly".

**Tại sao React không render lại component ?**

Vì mình đang thực hiện push "smelly" vào mảng mà **không phải là tạo một mảng mới**. Khi React thực hiện shallow equality check cho PureComponent TodoItem , nó chỉ check **oldState.notes === newState.notes**, trả về true mặc dù dữ liệu của notes đã được thay đổi. 
Để hiển thị chính xác điều này, chúng ta cần rollback TodoItem về React.Component hoặc forceUpdate để cập nhật sự thay đổi dữ liệu

**Warning: Hãy nghĩ đến các child component**

Một bẫy phổ biến khi đổi từ Component sang PureComponent là việc bạn quên mất rằng các child component cũng cần được render lại. Với React, việc parent không re-render dẫn đến các con của nó cũng không được cập nhật lại. Vì vậy, nếu bạn sử dụng PureComponent với các child component, nó có thể được update nếu state, props so sánh khác qua shallowly check => dẫn đến parent của nó cũng được cập nhật lại theo :yum: 

Bạn chỉ nên sử dụng PureComponent cho parent component khi biết rõ child nào phải re-render khi parent không re-render. Mình sẽ thêm một ví dụ về bẫy này khi đổi từ component sang pure component

```
class Todos extends React.PureComponent { // new line
    // ...

    componentDidMount() {
        setInterval(() => {
            this.setState((oldState) => {
                oldState.todos[0].done = !oldState.todos[0].done; // new line
                return oldState; // new line
            });
        }, 1000);
    }

    // ...
}
```

Nếu nhìn code trên, bạn có thể thấy hầu hết các mã code đều giống nhau. Ở đây mình đã thay đổi Todos thành một Pure Component và componentDidMount trả về đối tượng oldState ban đầu thay vì tạo một đối tượng mới như ở trên. Mong muốn của chúng ta là to do item nhấp nháy khi state done on hoặc off. Nhưng điều đó một lần nữa không xảy ra, khi React thực hiện shallow equality check so sánh **oldState === newState**, nó tìm thấy chính xác cùng một đối tượng, mặc dù nội dung của đối tượng đó đã thay đổi. Dẫn đến Todos lkhoong bao giờ được re-render, và dẫn đến TodoItem cũng không được re-render. Chúng ta có thể thực hiện điều này dễ dàng bằng cách rollback lại Component 

## Tóm lại
**PureComponent** rất mạnh ở chỗ nó có thể giúp bạn hạn chế số lần render không cần thiết xảy ra. Tuy nhiên, nó cũng có thể gây ra vấn đề đáng ngạc nhiên. Điều quan trọng cần ghi nhớ là PureComponent chỉ kiểm tra shallow equality về props và state trước khi đưa ra quyết định có render lại hay không. Dẫn đến các con của chúng có render lại hay không. Vì vậy bạn hãy sử dụng Pure Component khi có thể, nó sẽ giúp bạn tăng hiệu suất, nhưng hãy chắc chắn rằng nó sẽ được render lại khi cần, và hãy thay thế thành một component khi cần thiết :+1: