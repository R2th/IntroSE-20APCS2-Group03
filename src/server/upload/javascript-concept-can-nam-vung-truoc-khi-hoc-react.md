![](https://images.viblo.asia/e0896504-625b-4b20-89d2-2d4cbdd93c17.png)
 
 Có thể bạn đã, `React` là một **thư viện** dùng để tạo ra các UI components có thể được sử dụng đề làm base của ứng dụng web và mobile. Điểm khác biệt của `React` với một số đối thủ cạnh tranh là đoạn mã của nó được viết hoàn toàn bằng `Javascript`. Ngay cả các đoạn HTML cũng có thể viết bằng JS bằng cách sử dụng [JSX](https://reactjs.org/docs/introducing-jsx.html), là một phần mở rộng của JS để có thể cấu trúc các UI components.<br/>
 Bài viết này nhằm mục đích giúp cho những ai đang có ý định làm quen với `React` thì trước hết phải thực sự thành thạo những concept hơn là việc đi luôn vào `React` mà bỏ qua chúng. Trước hết hay nhớ một điều rằng, `React` được xậy dựng dựa trên việc sử dụng các tính năng Javascript hiện đại, về cơ bản chủ yếu vẫn là cú pháp [ES2015](https://babeljs.io/docs/en/learn/). <br/>
 ### Logic có điều kiện với câu lệnh if, toán tử ba ngôi và toán tử logic
Những toán tử trên đã thực sự là một phần rất đỗi quen thuộc của `Javascript`. Trong `React`, chúng đặc biệt hữu dụng cho việc `rendering` các `components`.<br>
[Toán tử ba ngôi](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) sẽ trông giống như:
```javascript
const buttonLabel = playback === "stop" ? "play ▶️" : "stop ⏹️";
```
Không có gì nhiều để nói ở đây, về cơ bản, có thể coi đây là cách viết tắt của cú pháp dưới đây:
```javascript
let buttonLabel;
if (playback === "stop") {
  buttonLabel = "play ▶️";
}
else {
  buttonLabel = "stop ⏹️"
}
```
Tất nhiên chúng ta có thể sử dụng câu lệnh `if...else` như trên, nhưng toán tử ba ngôi thường được lựa chọn cho việc bạn cần sử dụng biểu thức đơn dòng cho việc [rendering các phần tử có điều kiện](https://reactjs.org/docs/conditional-rendering.html#inline-if-else-with-conditional-operator)<br>
Nếu không, bạn phải gọi một hàm nơi bạn đặt đoạn mả của mình để hỗ trợ cho việc rendering có điều kiện. Trong `React`, bạn cũng có thể sử dụng logic điều kiện phức tạp hơn(ví dụ:if...else) và lưu trữ các giá trị trên các biến có thể được sử dụng để `rendering có điều kiện` trong đoạn mã JSX.<br>
[Toán tử logic ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators) **&&** hoặc **||** rất hữu dụng cho việc xây dựng các `React components`.
```javascript
const isLoggedIn = true;
const userComponent = isLoggedIn && getUserComponent();
```
Trong ví dụ trên, toán hạng bên trái(isLoggedIn) so với **&&** là `true`. Do đó, kết quả của toạn hạng bên phải(getUserComponent()) sẽ được gán luôn cho `userComponent`<br>
Khái niệm này cũng rất hữu ích cho việc rendering có điều kiện trong `React` vì **true && jsxComponent** return **jsxComponent** và **false && jsxComponent** return **false**. Nếu bạn trả về **false**, `React` sẽ bỏ qua nó và chỉ hiển thị không có gì.<br>
Cũng có thể kết hợp nhiều điều kiện. Trong ví dụ tiếp theo, kết quả của `getOtherUsersComponent()` được trả về khi cả hai điều kiện được đáp ứng.
```javascript
const otherUsers = isLoggedIn && users?.length > 0 && getOtherUsersComponent();
```
Chú ý, toán tử **?** ở chỗ **users?.length > 0**. Đây là [optional chaining](https://blog.logrocket.com/optional-chaining-and-nullish-coalescing-in-javascript/), hạn chế sử dụng nó trong các dự án `React` nhé.<br>
Nếu bạn trả về `null`, `React` sẽ không render bất cứ thứ gì, ngược lại với `undefined`, `null` đại diện cho việc giá trị đó có, nhưng tạm thời đang `vắng mặt`.
```javascript
if (shouldRenderComponent()) {
  return getComponent();
}
else {
  return null;
}
```
Điều này rất hữu ích để ngăn các components được render ra.
### Object literals và inline functions
Có tương đối [nhiều cách để tạo ra objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer). Khởi tạo các object với literal sẽ trông như sau:
```javascript
const foo = { bar: 3, hello: "world" };
```
Ký hiệu này thường được sử dụng trong các dự án `React` để tạo các object mà không cần gán chúng cho một biến. Ví dụ cho việc khợi tạo trạng thái ban đàu của `useReducer`.
```javascript
// 2nd function argument uses inline object literal
foo("bar", { hello: "world" })
```
Với cú pháp `ES2015`, bạn cũng có thể sử dụng `shorthand properties` và`method names`.
```javascript
function foo(id) {
  return {
    name: "dummy",
    id: id,
    bar: function() {
      console.log("bar");
    }
  }
}

// thay vào đó bạn có thể làm như sau
function foo(id) {
  return {
    name: "dummy",
    id, // shorthand property name
    bar() { // shorthand method name
      console.log("bar");
    }
  }
}
```
`Shorthand properties` đặc biệt được sử dụng khắp mọ nơi trong quá trình phán triển `React` vì đơn giản chúng giúp chúng ta loại bỏ những đoạn mã thừa.<br>
Do đó bạn phải nắm được sự khác biệt giữa `object literal` và một biến của `object`<br>
Trong một số trường hợp, vì mục đích tối ưu hóa hiệu suất `React`, bạn nên tránh chuyển các `object literal` cho các `React components` bởi bì một `object` mới sẽ được tạo mỗi lần, gây ra re-render không cần thiết.<br>
Tương tự cũng áp dụng cho cách `anonymous functions` (ví dụ như inline functions), điều này nên tránh trong một số trường hợp tăng [hiệu suất `React` app](https://www.digitalocean.com/community/tutorials/react-keep-react-fast#avoid-anonymous-functions)
```javascript
// inline function
foo(() => {console.log("bar")});

// hãy truyền biến trỏ tới hàm
const barFunc = () => console.log("bar");
foo(barFunc);
```
### Template literals
[Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals), hay `templates strings`, được giới thiệu trong `ES2015` cho phép tạo mội chuỗi với các biểu thức `Javascript`được nhúng bên trong. Trong dấu gạch ngược, bạn chó thể kết hợp các chuỗi mã `hardcoded` với các biểu thức `Javascript` bên trong `${}`.
```javascript
const name = "pa st";
console.log(`Hello, my name is ${name}`); // Hello, my name is pa st
```
Cũng có thể viết cách biểu thức phức tạp hơn, kiểu inline calculations,hay gọi một functions
```javascript
const name = "pa st";
const getRandomIndex = max =>  Math.floor(Math.random() * Math.floor(max))
const food = ["fish", "sandwich", "hamburger", "pizza", "cakes"];
const getFood = index => food[index]
console.log(`Hello, my name is ${name} 
and I'm hungry for ${getFood(getRandomIndex(food.length))}`);

Hello, my name is pa st 
and I'm hungry for pizza
```
### Switch statement
Trong các ứng dụng `React` vừa và lớn, rất có thể chúng ta sẽ gặp phải câu lệnh [`switch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) để quản lý `state` giữa các `components`. Cũng tương tự như [`useReducer`](https://reactjs.org/docs/hooks-reference.html#usereducer) Hook hoặc [Redux](https://redux.js.org/) thường được sử dụng cho các tác vụ như vậy.<br>
Ví dụ sau đây cho thấy một cái gọi là [`reducer function`](https://medium.com/async-la/a-short-and-sour-guide-to-reducers-b5b54d3bb018) sử dụng câu lệnh `switch` để quản lý `state`. Bạn không nhất thiết phải sử dụng câu lệnh `switch` với một `reducer`, nhưng đó là thực sự là một "pattern tốt".
```javascript
export default (state, action) => {
  switch (action.type) {
    case "TOGGLE_DARK_MODE":
      return {
        ...state,
        darkMode: action.darkMode,
      };
     case "UPDATE_PLAYBACK": {
      return {
        ...state,
        currentSound: action.currentSound,
      };
    }  
    default:
      return state;
  }
};
```
Ví dụ trên kiểm tra giá trị của `action.type` và thực thị mã của từng trường hợp.<br>
Trong ví dụ trên, mọi mệnh đề case (và default) đều trả về một object mới, đại diện cho state React mới. Điều này đưa chúng ta đến một chủ đề quan trọng về phát triển React.
### Object destructuring
Nguyên tác của [`object destructuring`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) khá đơn giản. Với cú pháp đơn giản dưới đây, chugns ta có thể trích xuất các thuộc tính thành các biến.
```javascript
const creatures = {
  human: ["men", "women", "children", "man", "woman"],
  supernatural: ["robot", "ai", "unknow", "demon", "ghost"]
};
const { human, supernatural } = creatures;

console.log(human); // ["men", "women", "children", "man", "woman"]
console.log(supernatural); // ["robot", "ai", "unknow", "demon", "ghost"]
```
Nếu bạn sử dụng phép gán mà không khai báo biến, lúc đó hãy sử dụng dấu ngoặc đơn.
```javscript
const creatures = {
  human: ["men", "women", "children", "man", "woman"],
  supernatural: ["robot", "ai", "unknow", "demon", "ghost"]
};
let human, supernatural;
({human, supernatural} = creatures);

console.log(human); // ["men", "women", "children", "man", "woman"]
console.log(supernatural); // ["robot", "ai", "unknow", "demon", "ghost"]
```
`Object destructuring` cung cấp cho bạn cú pháp để tiết kiệm thêm các dòng code.
```javascript
// you can do this
const { human, supernatural } = creatures;

// instead of
const human = creatures.human;
const supernatural = creatures.supernatural;
```
Trong bối cảnh của `React`, cấu trúc đối tượng thường được sử dụng với function parameters.
```javascript
const infos = {name: "pa st", hobby: "React" };
function printInfos({name, hobby}) {
  console.log(name, hobby);
}
printInfos(infos);

const printName = ({name}) => console.log(name);
printName(infos);
```
Để rõ ràng hơn, `React developers` sử dụng pattern này với [props](https://reactjs.org/docs/components-and-props.html) là đầu vào cho các `React components`.
```javascript
function MyReactComponent({name, age}) {
  // ...
}
```
Việc gán kết hợp với đổi tên các biến có thể hữu ích để tăng khả nặng đọc hiệu đoạn mã của bạn hơn hẳn.
```javascript
const creatures = {
  human: ["men", "womem", "children"]
};
const { human: people  } = creatures;
console.log(people); // ["men", "women", "children"]
```
Bạn cũng có thể xác định các giá trị mặc định trong khi gói các fields vào một object. Dưới đây là một cách.
```javascript
const { human: people = ["men"], supernatural = ["robot", "unknow"] } = {
  human: ["men", "women", "children"]
};
console.log(people); // ["men", "women", "children"]
console.log(supernatural); // ["robot", "unknow"]
```
Nesting cũng có thể được, nhưng điều này không khuyến khích, việc đọc code sẽ khó khăn hơn.
```javascript
const creatures = {
  animals: {
    wildlife: ["lobster", "snake"],
    pet: ["dog", "cat"]
  },
  human: ["men", "women", "children"]
};
const { animals: { pet }} = creatures;
console.log(pet); //  ["dog", "cat"]
```
### Array destructuring
Với sự trợ giúp của [`destructuring assignment`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment), một mảng có thể được giải nén theo cách mà các giá trị của nó được trích xuất thành các biến riêng biệt, kiểu như thế này này:
```javascript
const array = [1, 2];
const [varForVal1, varForVal2] = array;

console.log(varForVal1); // 1
console.log(varForVal2); // 2
```
Các biến sẽ được gán từ trái qua phải của một mảng, vì vậy thứ tự sẽ là:
```javascript
const [fruit, veggie] = ["berry", "cauliflower", "pizza", "sandwich", "cake", "hamburger"];

console.log(fruit); // berry
console.log(veggie); // cauliflower
```
Cũng có thể bỏ qua các giá trị bằng cách sau:
```javascript
const [fruit,,pizza,,,burger] = ["berry", "cauliflower", "pizza", "sandwich", "cake", "hamburger"];
console.log(fruit); // berry
console.log(pizza); // pizza
console.log(burger); // hamburger
```
Follow theo `chatty code` sau đây để có thể hiểu chính xác điều gì đã xảy ra:
```javascript
const [
  fruit,
  /* skip entry 2 (cauliflower) */,
  pizza,
  /* skip entry 4 (sandwich) */,
  /* skip entry 5 (cake) */,
  burger] = ["berry", "cauliflower", "pizza", "sandwich", "cake", "hamburger"];
```
Bạn cũng có thể gán nhiều giá trị cùng một lúc với mẫu pattern còn lại sau:
```javascript
const [fruit, veggie, ...junkfood] = ["berry", "cauliflower", "pizza", "sandwich", "cake", "humburger"];
console.log(fruit); // berry
console.log(veggie); // cauliflower
console.log(junkfood); // ["pizza", "sandwich", "cake", "hamburger"]
```
Array destructuring cũng cho phép gán các giá trị mặc địch, tất nhiên cũng có thể áp dụng mẫu pattern này với lệch gọi hàm.
```javascript
const getFood = () => ["berry", "cauliflower"];
const [fruit, veggie, junkfood = "pizza"] = getFood();
console.log(fruit); // berry
console.log(veggie); // cauliflower
console.log(junkfood); // pizza
```
Array destructuring được sử dụng thường xuyên với `React Hooks` vì bạn có thể nghĩ ra một vài dòng `semantic code`. Để tạo một biến `state` cùng với một hàm cập nhật một `React component`, bạn cũng có thể sử dụng `React` `useState` Hook.
```javascript
const initialValue = false;
// thay vì 
const stateWithUpdater = useState(initialValue);
const darkMode = stateWithUpdater[0];
const darkModeUpdater = stateWithUpdater[1];

// you can do
const [darkMode, setDarkMode] = useState(initialValue);
```

Ví dụ sau chứng minh rằng, bạn có thẻ triên khai các hàm chung cho các trường hợp cụ thể. `Array destructuring` cho phép `function call` sử dụng các tên biến ngữ nghĩa(semantic variable names) .
```javascript
const getFood = type => {
  let food = [];
  let error = false;
  if (type === "fruits") {
    food = ["strawberry", "kiwi", "banana"];
  }
  else if (type === "junk") {
    food = ["pizza", "sandwich", "cake"];
  }
  else {
    error = true;
  }
  const addFood = newFood => food.push(newFood);
  return [food, error, addFood];
};
const [healthyFood, noFruitsAvailable, addFruitFunc] = getFood("fruits");

console.log(healthyFood); // ["strawberry", "kiwi", "banana"]
console.log(noFruitsAvailable); // false
console.log(addFruitFunc("cherry")); 
console.log(healthyFood); // ["strawberry", "kiwi", "banana", "cherry"]
```
Việc trả về một mảng với hàm `getFood()` dẫn đến ngắn ngọn đoạn mã hơn, `Array destructuring` cho phếp đặt tên biến tùy chỉnh. Ngược lại, với `Object destructuring` bạn cần đổi tên cách biến.
```javascript
const getFood = type => {
  // same function body as above, only different return statement
  return {food, error, addFood};
};
const {food: healthyFood, error: noFruitsAvailable, addFood: addFruitFunc} = getFood("fruits");

console.log(noFruitsAvailable); // false
console.log(addFruitFunc("cherry")); 
console.log(healthyFood); // ["strawberry", "kiwi", "banana", "cherry"]
```
### Spread operator
[Spread operator (...)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) cho phép một mục có thể lặp lại(ví dụ một mảng) được `extracted` các phần của nó để đặt vào những function, parameter, array, object để xử lý. Với cú pháp này, chúng ta có thể tách cách thuộc tính đối tượng hoặc các phần tử của mảng.
```javascript
const numbers = [11, 5, 3, 1, 26];
// Math.max expects to be called like Math.max(11,5,3,1,26)

console.log(Math.max(...numbers)); // 26
```
Một trường hợp được sử dụng khác là dùng để sao chép các thuộc tính của đố tượng, tạo mới một đối tượng, ..
```javascript
const food = {
  breakfast: ["sandwich", "egg"],
  lunch: ["hamburger", "French fries", "pizza"]
};
const foodAndDrinks = {
  ...food,
  drinks: ["🍷", "🍹", "🍺", "🥃"],
};

console.log(foodAndDrinks); 
/* 
{
  breakfast: ["sandwich", "egg"],
  lunch: ["hamburger", "French fries", "pizza"],
  drinks: ["🍷", "🍹", "🍺", "🥃"],
} */
```
Với cú pháp ngắn gọn này, bạn có thể tạo một bản sao của một mảng một cách thuận tiện
```javascript
  const food = ["sandwich", "egg", "hambuerger", "French fries", "pizza"];
  const copy = [...food];
  console.log(copy); // ["sandwich", "egg", "hambrger", "French fries", "pizza"]
  console.log(food === copy); // false
```
Với `React` bạn không nên thao tác trực tiếp với các đối tượng state, thay vào đó, bạn cần tạo ra một đối tượng state hoàn toàn mới bất cứ khi nào bạn muốn cập nhật `state`. Điều này cực kỳ quan quạng với `React`
```javascript
const restaurantState = {
  drinks: ["🍷", "🍹", "🍺", "🥃"],
  food: ["sandwich", "egg", "hambuger", "French fries", "pizza"],
  lastOrder: null
}

// the customer ordered a hamburger
const stateAfterOrder = {
  drinks: [...restaurantState.drinks], // copy drinks
  food: [...restaurantState.food], // copy food
  lastOrder:  hamburger // override lastOrder
}
```
### Rest operator
Với [`Rest operator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters), bạn có thể merge một list các đối số của một hàm thành một mảng. Mặc dù cú pháp của toán tử này tương đối giống với `spread operator` nhưng vị trí sử dụng của chúng lại tạo nên sự khác biệt.<br>
Nếu bán ửu dụng taons tử bên trong {} hoặc [], bạn sử dụng object hoặc mảng spreading. Mặt khác, nếu bạn sử dụng operator với đối số cuối cùng trong hàm, đó lại là `rest parameter`.<br>
Mục đích của nó là merge một list các giá trị thành một mảng.
```javascript
const cleanFoodIncluded = (...food) => food.findIndex(f => f === "cauliflower") !== -1;
console.log(cleanFoodIncluded("pizza", "sandwich", "cake", "cauliflower", "hamburger")); // true
```
Với `rest operator` chúng ta đưa vào một mảng với tên gọi là `food`. Phương thức `findIndex()` đang hoạt động trên một mảng và kiểm tra xem có bao gồm `cauliflower` hay không.
###  Tổng kết
Về cơ bản, chúng ta mới đi được nửa chặng đường, nhưng do nhiều quá có thể gây loãng nên tạm thời dừng ở đây, tiếp theo sau này chúng ta sẽ tiếp cận với `Function declarations`, `function expressions`, và cả  `arrow functions` cú pháp phổ biến nhất hiện nay. Bên cạnh đó cũng điểm qua về `Classes` hay `Callback functions` ở [part 2](https://viblo.asia/p/javascript-concept-can-nam-vung-truoc-khi-hoc-react-part-2-Az45bMVwlxY)<br>
Tạm thời, mình xin kết thúc ở đây, Cảm ơn các bạn đã đọc!