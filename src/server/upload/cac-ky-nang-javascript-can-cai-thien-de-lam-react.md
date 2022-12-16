Một trong những điều quan trọng nhất cần hiểu về React là về cơ bản nó là JavaScript. Điều này có nghĩa là bạn càng giỏi JavaScript thì bạn càng thành công với React.

Hãy chia nhỏ 7 khái niệm cơ bản mà bạn nên biết về JavaScript để thành thạo React.

Và khi tôi nói những khái niệm này là cần thiết, ý tôi là chúng được sử dụng trong mọi ứng dụng đơn lẻ mà một nhà phát triển React tạo ra, với rất ít hoặc không có ngoại lệ.

Học những khái niệm này là một trong những điều quý giá nhất mà bạn có thể làm để tăng tốc khả năng tạo dự án React và trở thành một nhà phát triển React lành nghề, vì vậy hãy bắt đầu.

**1. Khai báo hàm và Arrow Functions**
Cơ sở của bất kỳ ứng dụng React nào là thành phần. Trong React, các thành phần được định nghĩa bằng cả hàm và lớp JavaScript.
Nhưng không giống như các hàm JavaScript, các thành phần React trả về các phần tử JSX được sử dụng để cấu trúc giao diện ứng dụng của chúng ta.

```
// JavaScript function: returns any valid JavaScript type
function javascriptFunction() {
  return "Hello world";
}

// React function component: returns JSX
function ReactComponent(props) {
  return <h1>{props.content}</h1>   
}
```

Lưu ý cách viết hoa khác nhau giữa tên của các hàm JavaScript và các thành phần của hàm React. Các hàm JavaScript được đặt tên bằng cách viết hoa lạc đà, trong khi các thành phần của hàm React được viết bằng cách viết hoa pascal (trong đó tất cả các từ đều được viết hoa).

Có hai cách khác nhau để viết một hàm trong JavaScript: cách truyền thống, sử dụng từ khóa hàm, được gọi là khai báo hàm và dưới dạng **Arrow Function**, đã được giới thiệu trong ES6.

Cả khai báo hàm và **Arrow Function** đều có thể được sử dụng để viết các thành phần hàm trong React.

Lợi ích chính của các **Arrow Function** là tính ngắn gọn của chúng. Chúng ta có thể sử dụng một số phím tắt để viết các hàm của chúng ta nhằm loại bỏ các bản viết sẵn không cần thiết, như vậy chúng ta thậm chí có thể viết tất cả trên một dòng.

```
// Function declaration syntax
function MyComponent(props) {
  return <div>{props.content}</div>;
}
 
// Arrow function syntax
const MyComponent = (props) => {
  return <div>{props.content}</div>;
}
 
// Arrow function syntax (shorthand)
const MyComponent = props => <div>{props.content}</div>;

/* 
In the last example we are using several shorthands that arrow functions allow:

1. No parentheses around a single parameter
2. Implicit return (as compared to using the "return" keyword)
3. No curly braces for function body
*/
```

Một lợi ích nhỏ của việc sử dụng khai báo hàm trên các  **Arrow Function** là bạn không phải lo lắng về các vấn đề với việc nâng cấp.

Do hoạt động lưu trữ của JavaScript, bạn có thể sử dụng nhiều thành phần hàm được tạo bằng khai báo hàm trong một tệp duy nhất theo bất kỳ thứ tự nào bạn muốn.

Tuy nhiên, các thành phần hàm được tạo bằng các  **Arrow Function** không thể được sắp xếp theo cách bạn muốn. Bởi vì các biến JavaScript được lưu trữ, các thành phần hàm mũi tên phải được khai báo trước khi chúng được sử dụng:

```
function App() {
  return (
    <>
      {/* Valid! FunctionDeclaration is hoisted */}
      <FunctionDeclaration />
      {/* Invalid! ArrowFunction is NOT hoisted. Therefore, it must be declared before it is used */}
      <ArrowFunction />
    </>
}
  
function FunctionDeclaration() {
  return <div>Hello React!</div>;   
}

function ArrowFunction() {
  return <div>Hello React, again!</div>;   
} 
```

Một sự khác biệt nhỏ khác trong việc sử dụng cú pháp khai báo hàm là bạn có thể xuất ngay một thành phần từ tệp bằng cách sử dụng **export default** hoặc **export** trước khi hàm được khai báo. Bạn chỉ có thể sử dụng từ khóa **export** trước các **Arrow Function** (xuất mặc định phải được đặt trên một dòng bên dưới thành phần).

```
// Function declaration syntax can be immediately exported with export default or export
export default function App() {
  return <div>Hello React</div>;   
}

// Arrow function syntax must use export only
export const App = () => {
  return <div>Hello React</div>;     
}
```

**2. Template Literals**

Với việc bổ sung ES6, chúng tôi đã được cung cấp một dạng chuỗi mới hơn được gọi là khuôn mẫu, bao gồm hai dấu tích phía sau `` ` `` thay vì dấu nháy đơn hoặc dấu ngoặc kép.

Thay vì phải sử dụng toán tử +, chúng ta có thể kết nối các chuỗi bằng cách đặt một biểu thức JavaScript (chẳng hạn như một biến) trong một cú pháp **$ {}** đặc biệt:

```
/* 
Concatenating strings prior to ES6.
Notice the awkward space after the word Hello?
*/
function sayHello(text) {
  return 'Hello ' + text + '!';
}

sayHello('React'); // Hello React!
 
/* 
Concatenating strings using template literals.
See how much more readable and predictable this code is?
*/
function sayHelloAgain(text) {
  return `Hello again, ${text}!`;
}

sayHelloAgain('React'); // Hello again, React!
```

Điều mạnh mẽ về các ký tự mẫu là khả năng sử dụng bất kỳ biểu thức JavaScript nào trong JavaScript (tức là bất kỳ thứ gì trong JavaScript phân giải thành một giá trị) trong cú pháp **$ {}**.

Chúng tôi thậm chí có thể bao gồm logic có điều kiện bằng cách sử dụng toán tử bậc ba, điều này hoàn hảo để thêm hoặc xóa có điều kiện một lớp hoặc quy tắc kiểu cho một phần tử JSX nhất định:

```
/* Go to react.new and paste this code in to see it work! */
import React from "react";

function App() {
  const [isRedColor, setRedColor] = React.useState(false);

  const toggleColor = () => setRedColor((prev) => !prev);

  return (
    <button
      onClick={toggleColor}
      style={{
        background: isRedColor ? "red" : "black",
        color: 'white'
      }}
    >
      Button is {isRedColor ? "red" : "not red"}
    </button>
  );
}

export default App;
```

Ví dụ: khi chúng tôi sử dụng các giá trị chuỗi có thể thay đổi trong các phần tử head hoặc body trong trang web của chúng tôi:

```
import React from 'react';
import Head from './Head';

function Layout(props) {
  // Shows site name (i.e. Reed Barger) at end of page title
  const title = `${props.title} | Reed Barger`;  
    
  return (
     <>
       <Head>
         <title>{title}</title>
       </Head>
       <main>
        {props.children}
       </main>
     </>
  );
}
```

**3. Điều kiện: &&, ||, Ternary Operator**

Xét rằng React chỉ là JavaScript, rất dễ dàng hiển thị (hoặc ẩn) các phần tử JSX có điều kiện bằng cách sử dụng các câu lệnh if đơn giản và đôi khi là câu lệnh switch.

```
import React from "react";

function App() {
  const isLoggedIn = true;

  if (isLoggedIn) {
    // Shows: Welcome back!
    return <div>Welcome back!</div>;
  }

  return <div>Who are you?</div>;
}

export default App;
```

Với sự trợ giúp của một số toán tử JavaScript thiết yếu, chúng tôi cắt giảm sự lặp lại và làm cho mã của chúng tôi ngắn gọn hơn.

Chúng ta có thể biến đổi câu lệnh if ở trên thành câu lệnh sau, sử dụng toán tử bậc ba. Toán tử bậc ba hoạt động giống hệt như câu lệnh if, nhưng ngắn hơn, nó là một biểu thức (không phải một câu lệnh) và có thể được chèn vào bên trong JSX:

```
import React from "react";

function App() {
  const isLoggedIn = true;

  // Shows: Welcome back!
  return isLoggedIn ? <div>Welcome back!</div> : <div>Who are you?</div>
}

export default App;
```

Các toán tử bậc ba cũng có thể được sử dụng bên trong dấu ngoặc nhọn (một lần nữa, vì nó là một biểu thức):

```
import React from "react";

function App() {
  const isLoggedIn = true;

  // Shows: Welcome back!
  return <div>{isLoggedIn ? "Welcome back!" : "Who are you?"</div>;
}

export default App;
```

Nếu giá trị đầu tiên (toán hạng) trong điều kiện là true, toán tử **&&** sẽ hiển thị toán hạng thứ hai. Nếu không, nó trả về toán hạng đầu tiên. Và vì nó là giả (là một giá trị được JavaScript tự động chuyển thành boolean **false**) nên nó không được JSX hiển thị:

```
import React from "react";

function App() {
  const isLoggedIn = true;

  // If true: Welcome back!, if false: nothing
  return <div>{isLoggedIn && "Welcome back!"}</div>;
}

export default App;
```

Đối với logic này, chúng ta có thể sử dụng dấu **||** (hoặc) toán tử. Về cơ bản, nó hoạt động ngược lại với toán tử **&&**. Nếu toán hạng đầu tiên là true, toán hạng đầu tiên (falsy) được trả về. Nếu toán hạng đầu tiên sai, toán hạng thứ hai được trả về.

```
import React from "react";

function App() {
  const isLoggedIn = true;

  // If true: nothing, if false: Who are you?
  return <div>{isLoggedIn || "Who are you?"}</div>;
}

export default App;
```

**4. 3 phương thức mảng: .map(), .filter(), .reduce()**

Chèn các giá trị nguyên thủy vào các phần tử JSX rất dễ dàng - chỉ cần sử dụng dấu ngoặc nhọn.

Chúng ta có thể chèn bất kỳ biểu thức hợp lệ nào, bao gồm các biến chứa giá trị nguyên thủy (chuỗi, số, boolean, v.v.) cũng như các thuộc tính đối tượng chứa giá trị nguyên thủy.

```
import React from "react";

function App() {
  const name = "Reed";
  const bio = {
    age: 28,
    isEnglishSpeaker: true
  };

  return (
    <>
      <h1>{name}</h1>
      <h2>I am {bio.age} years old</h2>
      <p>Speaks English: {bio.isEnglishSpeaker}</p>
    </>
  );
}

export default App;
```

Điều gì sẽ xảy ra nếu chúng ta có một mảng và chúng ta muốn lặp lại mảng đó để hiển thị từng phần tử mảng trong một phần tử JSX riêng lẻ?

Đối với điều này, chúng ta có thể sử dụng phương thức **.map ()**. Nó cho phép chúng ta chuyển đổi từng phần tử trong mảng của chúng ta theo cách chúng ta chỉ định với hàm bên trong.
Lưu ý rằng nó đặc biệt ngắn gọn khi được sử dụng kết hợp với Arrow Function.

```
/* Note that this isn't exactly the same as the normal JavaScript .map() method, but is very similar. */
import React from "react";

function App() {
  const programmers = ["Reed", "John", "Jane"];

  return (
    <ul>
      {programmers.map(programmer => <li>{programmer}</li>)}
    </ul>
  );
}

export default App;
```

**.map()** giống như nhiều phương thức mảng, trả về một bản sao ngắn của mảng mà nó đã lặp lại. Điều này cho phép mảng đã trả về của nó được chuyển sang phương thức tiếp theo trong chuỗi.

**.filter()** như tên gọi của nó, cho phép chúng tôi lọc các phần tử nhất định ra khỏi mảng của chúng tôi. Ví dụ: nếu chúng tôi muốn xóa tất cả tên của các lập trình viên bắt đầu bằng "J", chúng tôi có thể làm như vậy với **.filter()**:

```
import React from "react";

function App() {
  const programmers = ["Reed", "John", "Jane"];

  return (
    <ul>
      {/* Returns 'Reed' */}
      {programmers
       .filter(programmer => !programmer.startsWith("J"))
       .map(programmer => <li>{programmer}</li>)}
    </ul>
  );
}

export default App;
```

Điều quan trọng là phải hiểu rằng cả **.map()** và **.filter()** chỉ là các biến thể khác nhau của phương thức mảng **.reduce()** phương thức này có khả năng chuyển đổi các giá trị mảng thành hầu như bất kỳ kiểu dữ liệu nào, ngay cả các giá trị không phải là mảng.

Đây là **.reduce()** thực hiện thao tác tương tự như phương thức **.filter()** của chúng tôi ở trên:

```
import React from "react";

function App() {
  const programmers = ["Reed", "John", "Jane"];

  return (
    <ul>
      {/* Returns 'Reed' */}
      {programmers
        .reduce((acc, programmer) => {
          if (!programmer.startsWith("J")) {
            return acc.concat(programmer);
          } else {
            return acc;
          }
        }, [])
        .map((programmer) => (
          <li>{programmer}</li>
        ))}
    </ul>
  );
}

export default App;
```

**5. Thủ thuật đối tượng: Property Shorthand, cơ cấu hủy, toán tử Spread**

Giống như mảng, các đối tượng là một cấu trúc dữ liệu mà bạn cần phải hiểu khi sử dụng React.

Đây là viết tắt thuộc tính đối tượng:

```
const name = "Reed";

const user = {
  // instead of name: name, we can use...
  name
};

console.log(user.name); // Reed
```
Cách tiêu chuẩn để truy cập thuộc tính từ một đối tượng là sử dụng ký hiệu dấu chấm. Tuy nhiên, một cách tiếp cận thậm chí còn thuận tiện hơn là cấu trúc đối tượng. Nó cho phép chúng tôi trích xuất các thuộc tính dưới dạng các biến riêng lẻ cùng tên từ một đối tượng nhất định.

Có vẻ như bạn đang viết ngược lại một đối tượng, đó là điều làm cho quá trình trở nên trực quan. Nó dễ sử dụng hơn nhiều so với việc phải sử dụng tên đối tượng nhiều lần để truy cập mỗi khi bạn muốn lấy một giá trị từ nó.

```
const user = {
  name: "Reed",
  age: 28,
  isEnglishSpeaker: true
};
 
// Dot property access
const name = user.name;
const age = user.age;
 
// Object destructuring
const { age, name, isEnglishSpeaker: knowsEnglish } = user;
// Use ':' to rename a value as you destructure it

console.log(knowsEnglish); // true
```

Bây giờ nếu bạn muốn tạo các đối tượng từ những đối tượng hiện có, bạn có thể liệt kê từng thuộc tính một, nhưng điều đó có thể lặp đi lặp lại.

Thay vì sao chép các thuộc tính theo cách thủ công, bạn có thể trải tất cả các thuộc tính của một đối tượng vào một đối tượng khác (khi bạn tạo nó) bằng cách sử dụng toán tử trải đối tượng:

```
const user = {
  name: "Reed",
  age: 28,
  isEnglishSpeaker: true
};

const firstUser = {
  name: user.name,
  age: user.age,
  isEnglishSpeaker: user.isEnglishSpeaker
};

// Copy all of user's properties into secondUser 
const secondUser = {
  ...user  
};
```

Điều tuyệt vời về đối tượng là bạn có thể rải bao nhiêu đối tượng thành một đối tượng mới tùy thích và bạn có thể sắp xếp chúng như thuộc tính. Nhưng lưu ý rằng các thuộc tính đến sau có cùng tên sẽ ghi đè các thuộc tính trước đó:

```
const user = {
  name: "Reed",
  age: 28
};

const moreUserInfo = {
  age: 70,
  country: "USA"
};

// Copy all of user's properties into secondUser 
const secondUser = {
  ...user,
  ...moreUserInfo,
   computer: "MacBook Pro"
};

console.log(secondUser);
// { name: "Reed", age: 70, country: "USA", computer: "Macbook Pro" }
```

**6. Promises + Async/Await Syntax**

Hầu như mọi ứng dụng React đều bao gồm mã không đồng bộ - mã mất một khoảng thời gian không xác định để được thực thi. Đặc biệt nếu bạn cần lấy hoặc thay đổi dữ liệu từ API bên ngoài bằng cách sử dụng các tính năng của trình duyệt như API tìm nạp hoặc axios thư viện bên thứ ba.

Promises được sử dụng để giải quyết mã không đồng bộ để làm cho nó phân giải như mã đồng bộ, bình thường mà chúng ta có thể đọc từ trên xuống dưới.

Promises truyền thống sử dụng lệnh gọi lại để giải quyết mã không đồng bộ của chúng tôi. Chúng tôi sử dụng lệnh gọi lại **.then()** để giải quyết các promises đã được giải quyết thành công, trong khi chúng tôi sử dụng lệnh gọi lại **.catch()** để giải quyết các lời hứa phản hồi có lỗi.

Đây là một ví dụ thực tế về việc sử dụng React để tìm nạp dữ liệu từ API GitHub của tôi bằng cách sử dụng API Tìm nạp để hiển thị hình ảnh hồ sơ của tôi. Dữ liệu được giải quyết bằng promises:

```
/* Go to react.new and paste this code in to see it work! */
import React from 'react';
 
const App = () => {
  const [avatar, setAvatar] = React.useState('');
 
  React.useEffect(() => {
    /* 
      The first .then() lets us get JSON data from the response.
      The second .then() gets the url to my avatar and puts it in state. 
    */
    fetch('https://api.github.com/users/reedbarger')
      .then(response => response.json())
      .then(data => setAvatar(data.avatar_url))
      .catch(error => console.error("Error fetching data: ", error);
  }, []);
 
  return (
    <img src={avatar} alt="Reed Barger" />
  );
};
 
export default App;
```
Thay vì luôn cần sử dụng các lệnh gọi lại để phân giải dữ liệu của chúng ta từ một lời hứa, chúng ta có thể sử dụng một cú pháp được làm sạch trông giống với mã đồng bộ, được gọi là cú pháp **async / await**.

Các từ khóa async và await chỉ được sử dụng với các hàm (các hàm JavaScript thông thường, không phải các thành phần hàm React).

Để sử dụng chúng, chúng ta cần đảm bảo rằng mã không đồng bộ của chúng ta nằm trong một hàm được bổ sung thêm từ khóa **async**. Giá trị của bất kỳ lời hứa nào sau đó có thể được giải quyết bằng cách đặt từ khóa **await**  trước nó.

```
/* Go to react.new and paste this code in to see it work! */
import React from "react";

const App = () => {
  const [avatar, setAvatar] = React.useState("");

  React.useEffect(() => {
    /* 
	  Note that because the function passed to useEffect cannot be async, we must create a separate function for our promise to be resolved in (fetchAvatar)
    */
    async function fetchAvatar() {
      const response = await fetch("https://api.github.com/users/reedbarger");
      const data = await response.json();
      setAvatar(data.avatar_url);
    }

    fetchAvatar();
  }, []);

  return <img src={avatar} alt="Reed Barger" />;
};

export default App;
```

Chúng tôi vẫn sử dụng **.catch()** và khi chúng tôi gặp lỗi, chẳng hạn như khi chúng tôi nhận được phản hồi từ API của mình nằm trong phạm vi trạng thái 200 hoặc 300:

```
/* Go to react.new and paste this code in to see it work! */
import React from "react";

const App = () => {
  const [avatar, setAvatar] = React.useState("");

  React.useEffect(() => {
    async function fetchAvatar() {
      /* Using an invalid user to create a 404 (not found) error */
      const response = await fetch("https://api.github.com/users/reedbarge");
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        /* In development, you'll see this error message displayed on your screen */
        throw new Error(message);
      }
      const data = await response.json();

      setAvatar(data.avatar_url);
    }

    fetchAvatar();
  }, []);

  return <img src={avatar} alt="Reed Barger" />;
};

export default App;
```

**7. ES Modules + Import / Export syntax**

ES6 đã cho chúng tôi khả năng dễ dàng chia sẻ mã giữa các tệp JavaScript của riêng chúng tôi cũng như các thư viện của bên thứ ba bằng cách sử dụng **ES modules**.

Ngoài ra, khi chúng tôi tận dụng các công cụ như Webpack, chúng tôi có thể nhập các nội dung như hình ảnh và svgs, cũng như các tệp CSS và sử dụng chúng làm giá trị động trong mã của chúng tôi.

```
/* We're bringing into our file a library (React), a png image, and CSS styles */
import React from 'react';
import logo from '../img/site-logo.png';
import '../styles/app.css';
 
function App() {
  return (
    <div>
      Welcome!
      <img src={logo} alt="Site logo" />
    </div>
  );
}
 
export default App;
```

Ý tưởng đằng sau các ES modules là có thể chia mã JavaScript của chúng tôi thành các tệp khác nhau, để biến nó thành modules hoặc có thể tái sử dụng trên ứng dụng của chúng tôi.

Chúng tôi cũng có thể viết tất cả các lần exports vào cuối tệp thay vì bên cạnh mỗi biến hoặc hàm:

```
// constants.js
const name = "Reed";

const age = 28;

function getName() {
  return name;   
}

export { name, age };
export default getName;

// app.js
import getName, { name, age } from '../constants.js';

console.log(name, age, getName());
```

Bạn cũng có thể đặt bí danh hoặc đổi tên những gì bạn đang nhập bằng từ khóa **as** cho các mục nhập được đặt tên. Lợi ích của việc xuất mặc định là chúng có thể được đặt tên theo bất kỳ thứ gì bạn thích.

```
// constants.js
const name = "Reed";

const age = 28;

function getName() {
  return name;   
}

export { name, age };
export default getName;

// app.js
import getMyName, { name as myName, age as myAge } from '../constants.js';

console.log(myName, myAge, getMyName());
```

Nguồn: https://www.freecodecamp.org/news/javascript-skills-you-need-for-react-practical-examples/