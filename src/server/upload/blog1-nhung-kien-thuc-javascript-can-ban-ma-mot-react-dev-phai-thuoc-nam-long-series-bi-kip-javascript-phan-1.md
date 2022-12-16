![image.png](https://images.viblo.asia/40ad3871-5236-4509-893f-54e07432429e.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😉.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😊.

React là một trong những frameworks JavaScript phổ biến nhất để xây dựng các ứng dụng web - Single Page. Không cần phải nói thì các bạn cũng biết để thuần thục React thì việc đầu tiên bạn phải có đó là nắm vững kiến ​​thức về JavaScript.

Nói đúng hơn thì React là một Library chứ ko phải là 1 framework (nhưng thường thì các bạn đều dùng nó như một frameworks) - vì React sẽ thường được sử dụng chung với  Redux, react-router-dom, creat-react-app....

Trong bài viết này, mình và các bạn sẽ xem qua một số khái niệm JavaScript mà bạn phải biết trước khi học React. Hiểu rõ về các khái niệm này là điều cơ bản trong việc xây dựng các ứng dụng React. 

Vì vậy, không cần dài dòng nữa chiến luôn nào.

1. Kiến thức cơ bản về JavaScript
---------------------------------

React là một Library JS và bạn sẽ sử dụng JavaScript rộng rãi trong code React của. Vì vậy, không cần phải bàn cãi bạn phải biết các khái niệm JavaScript cơ bản.

Về cơ bản, ý mình là những thứ như: biến (variables), kiểu dữ liệu (data types), toán tử (operators), điều kiện (conditionals), array (arrays), hàm (functions), đối tượng (objects), sự kiện (events), v.v.

Hiểu đúng về các khái niệm này là điều quan trọng để bạn có thể áp dụng đúng trong React, vì bạn sẽ phải sử dụng chúng rất nhiều trong khi xây dựng ứng dụng React.

Vì vậy, nếu bạn không chắc chắn về những kiến thức này hoặc muốn nhanh chóng review lại mọi thứ, hãy xem tham khảo trang web [JavaScript.info](http://JavaScript.info). Nó cũng là tài liệu tham khảo tìm kiếm nhanh hữu ích.

2\. Toán tử ba ngôi (Ternary Operator)
--------------------------------------

[Toán tử ba ngôi](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) là một toán tử điều kiện ngắn, một dòng để thay thế cho if/else. Nó thực sự hữu ích khi cần nhanh chóng test một điều kiện để hiển thị một Component, update một state hoặc hiển thị một số đoạn text nào đó.

Hãy so sánh cách Toán tử ba ngôi và câu lệnh If/Else:

```js
// Example of Ternary Operator
condition ? 'True' : 'False';

// Example of If/Else statement
if (condition) {
  ('True');
} else {
  ('False');
}
```

Bạn có thể thấy việc sử dụng Toán tử 3 ngôi (Ternary Operator) gọn gàng hơn và ngắn hơn bao nhiêu so với sử dụng If/Else.

Cách thức hoạt động của nó là bạn viết một điều kiện, và nếu điều kiện là đúng, chương trình sẽ thực hiện câu lệnh sau dấu ?. Nếu điều kiện sai, chương trình sẽ thực hiện câu lệnh sau dấu :. 

Đơn giản phải không?

3\. Destructuring
-----------------

Mình thì hay gọi nó là Trích xuất (dịch thô: Phá vỡ cấu trúc) :D mình tự gọi vậy thôi cũng không biết chính xác nghĩa Tiếng việt của nó. Tốt nhất bạn cứ gọi nó là **Destructuring**.

[Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) giúp bạn giải nén các value từ array và đối tượng và gán chúng vào các biến riêng biệt một cách đơn giản và trơn tru. :D Nai sơơơ  

Xem cách sử dụng nó qua ví dụ sau:

```js
// With Destructuring
const objects = ["table", "iPhone", "apple"];
const [furniture, mobile, fruit] = objects;

// Without Destructuring
const furniture = objects[0];
const mobile = objects[1];
const fruit = objects[2];
```

Bây giờ bạn hãy xem một ví dụ khác về việc truyền **props** trong React với **Destructuring**:

 ```js
// With Destructuring Ex-1
function Fruit({ apple }) {
  return <div>This is an {apple}</div>;
}

// With Destructuring Ex-2`

function Fruit(props) {
  const { apple, iphone, car } = props;
  return <div>This is an {apple}</div>;
}

// Without Destructuring
function Fruit(props) {
  return <div>This is an {props.apple}</div>;
}
```

Bạn có thấy rằng mình phải sử dụng đi sử dụng lại biến **props** để lấy dữ liệu khi không sử dụng **Destructuring.** 

**Destructuring** sẽ làm cho code của bạn sạch hơn hông nà. 

4\. Toán tử Spread
------------------

Toán tử Spread (Spread Operator) đã được giới thiệu cùng với JavaScript trong ES6. Bạn có thể dùng toán tử này để tách 1 objects hoặc bất cứ cài gì có thể lặp **[iterable](https://www.freecodecamp.org/news/demystifying-es6-iterables-iterators-4bdd0b084082/)** thành các phần tử riêng lẻ. 

(Bạn nhớ keyword này nhé **[iterable](https://www.freecodecamp.org/news/demystifying-es6-iterables-iterators-4bdd0b084082/)** nó khá quan trọng đấy. Nó có nghĩa là **loại dữ liệu có thể lặp**)

Một trường hợp sử dụng phổ biến nhất của **Toán tử Spread** trong React là sao chép các value của một đối tượng vào một đối tượng khác trong quá trình cập nhật state nhằm mục đích hợp nhất các thuộc tính của cả hai đối tượng.

Explain thì dài dòng vậy chứ nhìn vào cú pháp bên dưới là hiểu ngay:

```js
const [person, setPerson] = useState({
  id: "",
  name: "",
  age: "",
});

setPerson([
  ...person,
  {
    id: "1",
    name: "Steve",
    age: "25",
  },
]);
```

Trong ví dụ trên, ...person sao chép tất cả các value của đối tượng person vào đối tượng state mới, sau đó thay thế hoặc thêm bằng các value tùy chỉnh khác có cùng thuộc tính và cuối cùng là cập nhật đối tượng state.

Bạn chú ý **thứ tự vị trí** của ...person cái này khá quan trọng nhé. ...person đặt ở trước có nghĩa là nếu sau đó có thêm dữ liệu bị trùng lặp hoặc ghi đè lẫn nhau thì nó ưu tiên cái sau. Ngược lại nếu ...person nằm sau vì thứ tự là ưu tiên cái sau nên ...person lại ghi đè ngược lại. (Mình từng gặp **Bug** này rồi mấy bạn junior là hay dính lắm :D)

Đây là một trong nhiều trường hợp sử dụng của **Toán tử spread** trong React. Khi ứng dụng của bạn trở nên lớn hơn, **Toán tử spread** sẽ có ích để xử lý dữ liệu theo cách tốt hơn và hiệu quả hơn.

5\. Method của array (Array methods)
------------------------------------

**Method array** rất phổ biến khi xây dựng một ứng dụng quy mô vừa đến lớn trong React. Bạn sẽ luôn phải sử dụng một số loại **method array** trong hầu hết mọi ứng dụng React.

Vì vậy, hãy dành một chút thời gian để tìm hiểu những method này. Một số method rất phổ biến như **map()**. Bạn sẽ sử dụng **map()** mỗi khi tìm nạp dữ liệu từ một tài nguyên bên ngoài (Fetch Data từ API nào đó) để hiển thị nó trên giao diện người dùng.

Có các method khác như: **filter, reduce, sort, includes, find, forEach, splice, concat, push and pop, shift and unshift .v.v.**

Một số trong số chúng được sử dụng phổ biến, và một số sẽ hiếm khi được sử dụng. Điều quan trọng là bạn phải hiểu rất rõ các method array phổ biến và chỉ cần nhận thức được sự tồn tại của các method khác để bất cứ khi nào bạn cần thì có thể nhanh chóng học chúng. (Google phát ra ngay ai rảnh mà nhớ hết... :D)

_Bên lề: Một trong những **bí kíp** của mình đó là mình đọc mọi thứ. Đơn giả chỉ là đọc để biết nó có tồn tại. Khi nào cần mình sẽ nghiên cứu sâu hoăc có vấn đề tương tự thì lên tìm lại thôi. Nếu các bạn còn chưa biết vấn đề đó có tồn tại trên đời thì **KHÓ**._

Tham khảo [cẩm nang về các method array](https://tuan200tokyo.blogspot.com/2022/09/2-so-tay-kien-thuc-quan-trong-nhat-ve.html) và cách làm việc với array nói chung trong JavaScript để bạn có thể tìm hiểu thêm.

6\. Arrow Functions
-------------------

[Arrow functions](https://www.freecodecamp.org/news/arrow-function-javascript-tutorial-how-to-declare-a-js-function-with-the-new-es6-syntax/) (**hàm mũi tên**) cho phép bạn tạo các hàm một cách đơn giản với cú pháp ngắn gọn hơn.

```js
// Regular Functions
function hello() {
  return "hello";
}

// Arrow Functions
let hello = () => "hello";
```

Cả hai hàm trong đoạn code trên đều hoạt động giống nhau, nhưng bạn có thể thấy rằng hàm mũi tên gọn gàng và ngắn hơn nhiều. Khoảng trống **()** trong **cú pháp (syntax)** trên dành cho các **đối số (arguments)**. Ngay cả khi không có đối số, các dấu ngoặc này cũng phải tồn tại.

Tuy nhiên, bạn cũng có thể bỏ qua các dấu ngoặc này nếu chỉ có một đối số trong hàm, như sau:

`let square = num => num * num`

Trong **arrow functions** mà chỉ có 1 dòng thì có thể bỏ qua câu lệnh **return**. Bạn cũng có thể khai báo một **arrow functions** nhiều dòng bằng cách sử dụng dấu ngoặc nhọn **{}** tương tự như các functions thông thường.

```js
let square = num => {
    return num * num
}
```

7\. Promises
------------

Bạn sử dụng các [promises](https://www.freecodecamp.org/news/what-is-promise-in-javascript-for-beginners/) để [xử lý các hoạt động không đồng bộ](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous) trong JavaScript. Khi tạo một **Promise** trong JavaScript, nó có thể thành công hoặc thất bại - được **resolved** hoặc bị **rejected** trong thuật ngữ JavaScript.

Những **Promise** trong JavaScript, theo một cách nào đó, cũng có thể được so sánh với những lời hứa mà con người chúng ta thực hiện. Giống như những lời hứa của con người được thúc đẩy bởi việc triển khai một hành động nhất định trong tương lai, những Promises trong JavaScript là về việc triển khai code trong tương lai, dẫn đến việc nó được giải quyết hoặc bị từ chối (resolved or rejected).

Có 3 state của một promise:

1.  **Pending** – Khi kết quả cuối cùng của **Promise** vẫn chưa được xác định.
2.  **Resolved** – Khi **Promise** được giải quyết thành công
3.  **Rejected** – Khi **Promise** bị từ chối.

Khi một **promise** được **Resolved** hoặc bị **Rejected**, bạn có thể sử dụng phương thức **.then()** hoặc **.catch()** lên đối tượng được trả về.

*   Method **.then()** được gọi khi một **Promise** được **Resolved** hoặc bị **Rejected**. Nó nhận vào 2 hàm làm đối số. Cái đầu tiên được thực thi khi promise được giải quyết và nhận được kết quả, cái thứ hai là đối số tùy chọn (không có cũng được vì nó là **optional**) trong trường hợp lời hứa bị từ chối nó sẽ gọi hàm này.
*   Method **.catch()** được sử dụng như một trình xử lý lỗi và được gọi khi Promise bị Rejected hoặc có lỗi trong quá trình thực thi.

Lý thuyết vậy là đủ, hãy kết thúc phần này với một ví dụ về một Promise, bao gồm cả việc sử dụng các method .**then()** và **.catch()**:

```js
let promise = new Promise((resolve, reject) => {
  const i = "Promise";
  // Test phần Toán tử ba ngôi ở trên
  // để hiểu rõ hơn về cú pháp này
  i === "Promise" ? resolve() : reject();
});

promise
  .then(() => {
    console.log("Your promise is resolved");
  })
  .catch(() => {
    console.log("Your promise is rejected");
  });
```

Một góc nhìn khác cho các thanh niên Beginner chưa quen với callBack

```js
// Các bạn tạo một hàm rồi đưa cho Promise để nó gọi lại khi chạy
// Hàm này nhận vào 2 đối số là 2 hàm
// 2 hàm này sẽ được gọi khi nào?
// Đầu tiên bạn sẽ định nghĩa trong cái hàm callMe này
const callMe = (resolve, reject) => {
  // Gọi Fetch API quần què gí đấy
  // Nói chung là sử lý lâu cũng ko biết khi nào
  // là có dữ liệu trả về..... ĐỢI ĐỢI ĐỢI
  // Sau khi xử lý gì đấy nhận được kết quả trả về
  const result = {name: 'Okay chốt đơn'}
  // Random 50% 50% đúng thì resolve sai reject
  if (Math.random() < 0.5) {
    // Khi các bạn gọi promise sẽ .then() rồi nhét vào tay
    // thằng .then() này một cái hàm chính là cái
    // hàm resolve này đây giờ có kết quả rồi dùng cái hàm này
    // gọi để truyền kết quả ngược lại cho nó
    resolve(result)
  } else {
    // Tương tự là cái hàm mà ông .cath() đưa cho promise
    // giờ dùng nó call lại và có thích đưa gì cho nó thì đưa
    reject({data: 'Hông đâu pé ơi'})
  }
}

// Tạo một đối tượng promise
// Vì tạo thông qua PromiseConstructor
// Nên nó có sẵn 2 hàm .then() .catch()
const promise = new Promise(callMe)

// Giờ đến lúc sử cái promise này
// Đây chính là cái hàm mà sẽ đưa đưa cho hàm callMe ở phía trên
const resolve = (data) => {
  console.log(data)
}

// Đây lại cũng chính là cái hàm mà sẽ đưa cho thằng callMe ở trên
const reject = (errData) => {
  console.log(errData)
}

// Bạn đưa 2 hàm này làm đối số cho .then() và .catch()
promise.then(resolve).catch(reject)
```

Bonus để các bạn hiểu hơn về hàm Promise

```js
// Nó sẽ trông như vầy nếu code chay (tool cơm)
// chỉ là ví dụ siêu đơn giản
// cho các bạn mới giễ hình dung thôi nhé
// (Dùng là đi ăn cắp ngay :D)
const PromiseConstructor = (_callMe) => {
  return {
    // Trả về mội đối tượng có chứa method .then()
    then(_resolve) {
      // Khi gọi hàm .then() bạn lại trả về chính nó
      return {
        ...this,
        // và ứng dụng Toán tử spread để add thêm .catch()
        catch(_reject) {
          // Thực hiện gọi hàm callMe
          // và đưa cho nó hai cái hàm resolve, reject
          callMe(_resolve, _reject);
          return;
          this;
        },
      };
    },
  };
};

// Thông qua hàm vừa tạo ở trên cũng tạo một _promise
// Rồi đưa cho nó cái callMe mà bạn đã tạo ở vd trước
const _promise = PromiseConstructor(callMe);
_promise.then(resolve).catch(reject);
```

Bạn tạo cái hàm này để cho bạn hiểu hơn về cách mà hàm Promise hoạt động thế nào thôi đấy nhé. (kẻo bạn pro vào lại ném đá chết)

8\. Fetch API
-------------

[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) cho phép bạn thực hiện các yêu cầu không đồng bộ đến máy chủ web từ trình duyệt. Nó trả về một promise mỗi khi một yêu cầu được thực hiện, sau đó nó được sử dụng để lấy phản hồi của yêu cầu. Nó sẽ tương tự quả vd phía trên mà giờ đặt tên nó là fetch và hàm callFetch sẽ ko đơn giản như **callMe** mà bạn đã tạo trước đó nữa (nói chung là có sẵn rồi xài thôi).

`const fetch = new Promise(callFetch) // chỉ là vd thôi nhóa`

Tiếp, Một hàm fetch() cơ bản nhận một đối số, là URL của tài nguyên bạn muốn tìm nạp. Sau đó, nó trả về một lời hứa khác giải quyết bằng một đối tượng Phản hồi (**HTTP**).

Vì vậy, để lấy nội dung **JSON** từ promise này, bạn phải sử dụng method .json() trên đối tượng Response. Điều này cuối cùng sẽ trả về một **promise** mà sẽ giải quyết bằng kết quả của dữ liệu **JSON** đã được phân tích cú pháp từ **response body.** Đó là lý do vì sao ví dụ bên dưới bạn sẽ thấy mình CHẤM .then().then() tận 2 lần. (gọi 1 **promise** mà kết quả nó lại trả về 1 **promise** thế mới ảo chứ)

Nó có thể hơi khó hiểu, vì vậy bạn hãy chú ý đến ví dụ dưới đây:

```js
fetch('http://example.com/books.json')
  .then((response) => response.json())
  .then((data) => setState(data))
// Chơi khô máu không cần reject luôn
```

9\. Async/Await
---------------

Chức năng [Async/Await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) cung cấp một cách tốt hơn và rõ ràng hơn để đối phó với **Promises**. JavaScript về bản chất là không đồng bộ và async/await giúp bạn viết các hàm dựa trên **Promises** theo cách như thể chúng đồng bộ bằng cách ngừng thực thi code cho đến khi **Promises** được resolve hoặc bị reject. Nhưng thực ra thì không phải vì bạn hiểu Promise rồi đấy, đơn giản là mình đưa cho nó cái hàm rồi khi nào nó làm xong thì nó dùng cái hàm đấy gọi lại mình. (Còn quả **Async/Await** này bắt cái hàm nào Async thì phải trả về 1 **Promises**)

Để làm cho nó hoạt động, trước tiên bạn phải sử dụng keyword async trước khi khai báo một hàm. Ví dụ, **async function promise() {}**. Đặt **async** trước một hàm có nghĩa là hàm sẽ luôn trả về một **Promises** . (Nhắc 2 lần rồi đấy **async function** trả về 1 **Promises)**

Bên trong một hàm không đồng bộ (**async function**), bạn có thể sử dụng keyword await để tạm ngừng thực thi thêm code cho đến khi lời hứa đó được resolve hoặc bị reject. Bạn chỉ có thể sử dụng hàm await bên trong một hàm không đồng bộ **(****async function****)**.

Bây giờ, hãy nhanh chóng kết thúc phần này với một ví dụ:

```js
async function asyncFunction() {
  let promise = new Promise((resolve) => {
    resolve();
  });
  let response = await promise;
  return console.log(response);
}
// Quá e zì luôn pk bạn
// Nói chung bạn mà nắm chắc promise với callBack
// Thì mấy cái này chỉ là biến thể cho nó đẹp hơn thôi
```

Vào đây để có thể tìm hiểu thêm về [Async/Await](https://www.freecodecamp.org/news/javascript-async-await-tutorial-learn-callbacks-promises-async-await-by-making-icecream/) nhé.

10\. ES modules và Import/Export
--------------------------------

[Modules](https://www.freecodecamp.org/news/javascript-modules-beginners-guide/) đã được giới thiệu trong ES6. Mỗi tệp là một mô-đun của riêng nó. Bạn có thể địa nghĩa các đối tượng, biến, array, hàm, v.v. ở tệp này và sử dụng chúng trong tệp khác. Điều này được gọi là Import/Export mô-đun (Modules).

Trong React, bạn dùng các mô-đun ES6 để tạo các tệp riêng biệt cho các component. Mỗi component được Export ra khỏi mô-đun của nó và được Import vào tệp nơi nó sẽ được hiển thị. 

Hãy tìm hiểu điều này với một ví dụ nhé các người bạn thiện lành:

```js
function Component() {
  return <div>This is a component</div>
}

export default Component
import Component from './Component'

function App() {
  return <Component />
}
```

Trong React, bạn phải hiển thị mọi componet mà mình khai báo trong Component App.js.

Trong ví dụ trên, bạn đã tạo một **Component**  có tên là **Component** và xuất nó với câu lệnh:

`export default Component`

Tiếp theo, bạn truy cập App.js và Import **Component**  với code sau: 

`import Component from './Component'`

Tổng kết
--------

Bạn đã đến cuối bài viết! Cho đến nay, mình đã đề cập đến những kiến ​​thức cơ bản về JavaScript bao gồm: **Ternary Operator, Destructuring, Spread Operator, Array methods, Arrow functions, Promises, Fetch API, Async/Await, and ES6 Modules and Import/Export.**

Mình hy vọng bạn đã học được nhiều điều từ bài viết này và hiểu được một số khái niệm JavaScript quan trọng và lý do tại sao bạn cần tìm hiểu chúng kỹ lưỡng trước khi bắt đầu sử dụng React.

Bài viết này không phải là một giải pháp thay thế cho việc tự học các khái niệm này một cách kỹ lưỡng. Mình chỉ giới thiệu chung về chúng và tại sao chúng lại quan trọng. Bây giờ bạn học những điều này như thế nào và xây dựng kiến thức từ đây tùy thuộc vào bạn. 

Chúc các ae may mắn với cuộc hành trình đi tìm Vua của mọi nghề!

Mình hy vọng bạn thích bài viết này và học được điều gì đó mới. 

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy thích blog của mình thì nhấn theo dõi để ủng hộ mình nhé. Thank you.😉

# Ref
* https://tuan200tokyo.blogspot.com/2022/09/3-mot-vai-chieu-thuc-javascript-can-ban_28.html