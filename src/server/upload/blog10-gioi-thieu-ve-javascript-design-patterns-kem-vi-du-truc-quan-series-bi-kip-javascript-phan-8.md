![image.png](https://images.viblo.asia/b67ebd1e-8b0b-445d-b392-60fee6f35252.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😉.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😊.

Trong bài viết này, mình sẽ giải thích về Design Patterns là gì và tại sao chúng lại hữu ích.

Bạn cũng sẽ điểm qua một số Design Patterns phổ biến nhất hiện có và đưa ra các ví dụ cho từng patterns. 

GET GÔ! 😊

Mục lục
-------

*   [Design Patterns Là gì?](#what-are-design-patterns)
*   [Creational Design Patterns](#creational-design-patterns)
    *   [Singleton Pattern](#singleton-pattern)
    *   [Factory Method Pattern](#factory-method-pattern)
    *   [Abstract Factory Pattern](#abstract-factory-pattern)
    *   [Builder Pattern](#builder-pattern)
    *   [Prototype Pattern](#prototype-pattern)
*   [Structural Design Patterns](#structural-design-patterns)
    *   [Adapter Pattern](#adapter-pattern)
    *   [Decorator Pattern](#decorator-pattern)
    *   [Facade Pattern](#facade-pattern)
    *   [Proxy Pattern](#proxy-pattern)
*   [Behavioral Design Patterns](#behavioral-design-patterns)
    *   [Chain of Responsibility Pattern](#chain-of-responsibility-pattern)
    *   [Iterator Pattern](#iterator-pattern)
    *   [Observer Pattern](#observer-pattern)
*   [Roundup](#roundup)

Design Patterns là gì?
======================

Design Patterns đã được phổ biến bởi [cuốn sách "Design Patterns: Các yếu tố của phần mềm hướng đối tượng có thể tái sử dụng"](https://en.wikipedia.org/wiki/Design_Patterns), được xuất bản vào năm 1994 bởi một nhóm bốn kỹ sư C++.

Cuốn sách khám phá điệm mạnh và điểm yếu (lỗi thường gặp) của lập trình hướng đối tượng, đồng thời mô tả 23 Patterns hữu ích mà bạn có thể thực hiện để giải quyết các vấn đề lập trình thông thường.

Những **patterns** này **không phải là thuật toán hoặc cách triển khai cụ thể**. Chúng giống như **những ý tưởng, quan điểm và những điều trừu tượng** có thể hữu ích trong những tình huống nhất định để giải quyết một loại vấn đề cụ thể.

Việc thực hiện cụ thể của các **patterns** có thể khác nhau tùy thuộc vào nhiều yếu tố khác nhau. Nhưng điều quan trọng là các khái niệm đằng sau chúng và cách chúng có thể giúp bạn đạt được giải pháp tốt hơn cho vấn đề của mình.

Nó có nghĩa là những patterns này đã được nghĩ ra với lập trình OOP C++. Khi nói đến các ngôn ngữ hiện đại hơn như JavaScript hoặc các patterns lập trình khác, các **patterns** này có thể không hữu ích như những ngôn ngữ thuần OOP và thậm chí có thể thêm các **Boilerplate** không cần thiết vào **code** của bạn.

Tuy nhiên, mình nghĩ rằng thật tốt nếu biết về chúng như là kiến ​​thức lập trình chung.

Side comment: Nếu bạn không quen với [patterns lập trình](https://tuan200tokyo.blogspot.com/2022/09/blog3-mot-so-mo-hinh-lap-trinh-pho-bien.html) hoặc [OOP](https://tuan200tokyo.blogspot.com/2022/09/blog4-oop-lap-trinh-huong-oi-tuong.html), gần đây mình đã có viết hai bài về những chủ đề đó.😉

Tóm lại **Design Patterns** được phân loại thành ba loại chính: **creational** **patterns, structural** **patterns** **và behavioral patterns**. 

Mình sẽ cùng nhau khám phá ngắn gọn từng **patterns** nhé. 🧐

Creational Design Patterns
==========================

Các patterns sáng tạo bao gồm các cơ chế khác nhau được sử dụng để tạo các đối tượng.

Singleton Pattern  
-------------------

**Singleton** là một **Design Patterns** đảm bảo rằng một lớp chỉ có một **instance** duy nhất và không thay đổi theo thời gian (tính bất biến). Nói một cách đơn giản, **singleton** **pattern** bao gồm một đối tượng không thể sao chép hoặc sửa đổi. Nó thường hữu ích khi bạn muốn có một **immutable single point of truth** (Object bất biến) cho ứng dụng của mình.

Ví dụ, bạn muốn có tất cả cấu hình của ứng dụng trong một đối tượng duy nhất. Và bạn muốn không cho phép bất kỳ sự sao chép hoặc sửa đổi nào của đối tượng đó.

Hai cách để triển khai **patterns** này là sử dụng các lớp hoặc các đối tượng thuần túy:

```js
const Config = {
  start: () => console.log('App has started'),

  update: () => console.log('App has updated'),
};

Object.freeze(Config);

Config.start();
// "App has started"

Config.update();
// "App has updated"

Config.name = 'Robert';
// We try to add a new key

console.log(Config);

//-----------------------------------
class Config {
  constructor() {}

  start() {
    console.log('App has started');
  }

  update() {
    console.log('App has updated');
  }
}
const instance = new Config();
Object.freeze(instance);
```

Factory Method Pattern
----------------------

**Factory Method Pattern** cung cấp một giao diện để tạo các đối tượng có thể được sửa đổi sau khi tạo. Điều thú vị về điều này là logic để tạo các đối tượng của bạn được tập trung ở một nơi duy nhất, đơn giản hóa và tổ chức code của bạn tốt hơn.

**Patterns** này được sử dụng rất nhiều và cũng có thể được thực hiện theo hai cách khác nhau, thông qua các **class** hoặc **factory function** (các hàm trả về một đối tượng).

```js
class Alien {
  constructor(name, phrase) {
    this.name = name;
    this.phrase = phrase;
    this.species = 'alien';
  }
  fly = () => console.log('Zzzzzziiiiiinnnnnggggg!!');
  sayPhrase = () => console.log(this.phrase);
}

const alien1 = new Alien('Ali', "I'm Ali the alien!");
console.log(alien1.name); // output: "Ali"
// Sử dụng các Class

//---------------------------
function Alien(name, phrase) {
  this.name = name;
  this.phrase = phrase;
  this.species = 'alien';
}

Alien.prototype.fly = () => console.log('Zzzzzziiiiiinnnnnggggg!!');
Alien.prototype.sayPhrase = () => console.log(this.phrase);

const alien2 = new Alien('Ali', "I'm Ali the alien!");

console.log(alien2.name); // output "Ali"
console.log(alien2.phrase); // output "I'm Ali the alien!"
alien2.fly(); // output "Zzzzzziiiiiinnnnnggggg"
// Sử dụng Factory function
```

Abstract Factory Pattern
------------------------

**Abstract Factory Patterns** cho phép bạn tạo ra các **họ (families - tên đại diện tiêu biểu)** của các đối tượng liên quan mà không cần chỉ định các lớp cụ thể. Nó hữu ích trong các tình huống mà bạn cần tạo các đối tượng chỉ chia sẻ một số thuộc tính và method.

Cách nó hoạt động là trình bày một **abstract factory** mà khách hàng tương tác. **Abstract factory** đó gọi **concrete factory** tương ứng với logic tương ứng. Và **concrete factory** đó là nơi trả về đối tượng cuối cùng.

Về cơ bản, nó chỉ thêm một lớp trừu tượng trên **method** gốc, để bạn có thể tạo nhiều loại đối tượng khác nhau, nhưng vẫn tương tác với một hàm hoặc một lớp đơn lẻ.

Vì vậy, hãy xem ví dụ này. Giả sử bạn đang mô hình hóa một hệ thống cho một công ty ô tô, tất nhiên là công ty sản xuất ô tô, nhưng cũng có cả xe máy và xe tải.

```js
// Bạn có một Class hoặc "concrete factory" cho từng loại xe
class Car {
  constructor() {
    this.name = 'Car';
    this.wheels = 4;
  }
  turnOn = () => console.log('Chacabúm!!');
}

class Truck {
  constructor() {
    this.name = 'Truck';
    this.wheels = 8;
  }
  turnOn = () => console.log('RRRRRRRRUUUUUUUUUMMMMMMMMMM!!');
}

class Motorcycle {
  constructor() {
    this.name = 'Motorcycle';
    this.wheels = 2;
  }
  turnOn = () => console.log('sssssssssssssssssssssssssssssshhhhhhhhhhham!!');
}

// Và Abstrac factory hoạt động như một điểm tương tác duy nhất cho khách hàng của bạn
// Với tham số mà nó nhận được, nó sẽ gọi Concrete Factory tương ứng
const vehicleFactory = {
  createVehicle: function (type) {
    switch (type) {
      case 'car':
        return new Car();
      case 'truck':
        return new Truck();
      case 'motorcycle':
        return new Motorcycle();
      default:
        return null;
    }
  },
};

const car = vehicleFactory.createVehicle('car'); 
// Car { turnOn: [Function: turnOn], name: 'Car', wheels: 4 }

const truck = vehicleFactory.createVehicle('truck'); 
// Truck { turnOn: [Function: turnOn], name: 'Truck', wheels: 8 }

const motorcycle = vehicleFactory.createVehicle('motorcycle'); 
// Motorcycle { turnOn: [Function: turnOn], name: 'Motorcycle', wheels: 2 }
```

Builder Pattern
---------------

**Builder Pattern** được sử dụng để tạo các đối tượng trong "**steps**". Thông thường bạn sẽ có các hàm hoặc method thêm các thuộc tính hoặc method nhất định vào đối tượng của bạn.

Điều thú vị về patterns này là bạn tách việc tạo ra các thuộc tính và method thành các thực thể khác nhau.

Nếu bạn có một **class** hoặc một **factory function**, đối tượng mà bạn khởi tạo sẽ luôn có tất cả các thuộc tính và method được khai báo trong **class/factory function** đó. Nhưng bằng cách sử dụng **builder pattern**, bạn có thể tạo một đối tượng và chỉ áp dụng cho nó theo các "steps" mà bạn cần, đây là một cách tiếp cận linh hoạt hơn.

Điều này liên quan đến [Object Composition](https://tuan200tokyo.blogspot.com/2022/09/blog4-oop-lap-trinh-huong-oi-tuong.html#object-composition), một chủ đề mà mình đã nói [ở đây](https://tuan200tokyo.blogspot.com/2022/09/blog4-oop-lap-trinh-huong-oi-tuong.html).

```js
// We declare our objects
const bug1 = {
  name: 'Buggy McFly',
  phrase: "Your debugger doesn't work with me!",
};

const bug2 = {
  name: 'Martiniano Buggland',
  phrase: "Can't touch this! Na na na na...",
};

// These functions take an object as parameter and add a method to them
const addFlyingAbility = (obj) => {
  obj.fly = () => console.log(`Now ${obj.name} can fly!`);
};

const addSpeechAbility = (obj) => {
  obj.saySmthg = () => console.log(`${obj.name} walks the walk and talks the talk!`);
};

// Finally we call the builder functions passing the objects as parameters
addFlyingAbility(bug1);
bug1.fly(); 
// output: "Now Buggy McFly can fly!"

addSpeechAbility(bug2);
bug2.saySmthg(); 
// output: "Martiniano Buggland walks the walk and talks the talk!"
```

Prototype Pattern
-----------------

**Prototype Pattern** cho phép bạn tạo một đối tượng bằng cách sử dụng một đối tượng khác làm bản thiết kế, kế thừa các thuộc tính và method của nó.

Nếu bạn đã sử dụng JavaScript một thời gian, có thể bạn đã quen thuộc với [kế thừa nguyên mẫu (prototype inheritance)](https://tuan200tokyo.blogspot.com/2022/09/blog5-nguyen-mau-va-ke-thua-javascript.html) và cách JavaScript hoạt động xung quanh nó.

Kết quả cuối cùng rất giống với những gì bạn nhận được khi sử dụng các lớp, nhưng linh hoạt hơn một chút vì các thuộc tính và method có thể được chia sẻ giữa các đối tượng mà không phụ thuộc vào cùng một lớp. Okay xem ví dụ nào 🤓

```js
// Khai báo đối tượng prototype của bạn bằng hai method
const enemy = {
  attack: () => console.log('Pim Pam Pum!'),
  flyAway: () => console.log('Flyyyy like an eagle!'),
};

// Khai báo một đối tượng khác sẽ kế thừa từ prototype của bạn
const bug1 = {
  name: 'Buggy McFly',
  phrase: "Your debugger doesn't work with me!",
};

// Với setPrototypeOf, bạn thiết lập prototype của đối tượng
Object.setPrototypeOf(bug1, enemy);

// Với getPrototypeOf, bạn đã đọc prototype và xác nhận prototype trước đó đã hoạt động
console.log(Object.getPrototypeOf(bug1)); 
// { attack: [Function: attack], flyAway: [Function: flyAway] }

console.log(bug1.phrase); 
// Your debugger doesn't work with me!

console.log(bug1.attack()); 
// Pim Pam Pum!

console.log(bug1.flyAway()); 
// Flyyyy like an eagle!
```

Structural Design Patterns
==========================

Các **Structural Patterns** đề cập đến cách tập hợp các đối tượng và lớp thành các cấu trúc lớn hơn.

Adapter Pattern
---------------

**Adapter Pattern** cho phép hai đối tượng có giao diện không tương thích tương tác với nhau.

Ví dụ, giả sử rằng ứng dụng của bạn truy vấn một API trả về [XML](https://www.freecodecamp.org/news/what-is-an-xml-file-how-to-open-xml-files-and-the-best-xml-viewers/) và gửi thông tin đó đến một API khác để xử lý thông tin đó. Nhưng API đó lại nhận đầu vào là [JSON](https://tuan200tokyo.blogspot.com/2022/10/blog11-json-la-gi-so-sanh-giua-json-va.html) . Bạn không thể gửi thông tin đã nhận được vì cả hai giao diện đều không tương thích. Đây là lúc bạn dùng Adapter Pattern. 😉

Bạn có thể hình dung khái niệm tương tự bằng một ví dụ đơn giản hơn. Giả sử bạn có một array các thành phố và một hàm trả về số lượng người sinh sống lớn nhất mà bất kỳ thành phố nào trong số đó có. Số lượng người sinh sống trong array của bạn là hàng triệu, nhưng bạn có một thành phố mới để thêm vào đó có những người sinh sống mà không cần chuyển đổi hàng đơn vị - xem ví dụ nhé:

```js
// Các thành phố của bạn
const citiesHabitantsInMillions = [
  {city: 'London', habitants: 8.9},
  {city: 'Rome', habitants: 2.8},
  {city: 'New york', habitants: 8.8},
  {city: 'Paris', habitants: 2.1},
];

// Thành phố mới mà bạn muốn thêm vào list
// Nhưng bạn thấy gì sai sai chưa nếu để nguyên như vậy thì array của bạn sẽ hiểu là 3100000tr
// Vì dữ liệu thì mỗi nơi lưu mỗi khác
const BuenosAires = {
  city: 'Buenos Aires',
  habitants: 3100000,
};

// Adapter Funtion lấy thành phố và chuyển đổi thuộc tính
// của người sinh sống sang cùng một định dạng mà tất cả các thành phố khác có
const toMillionsAdapter = (city) => {
  city.habitants = parseFloat((city.habitants / 1000000).toFixed(1));
};

toMillionsAdapter(BuenosAires);

// bạn thêm thành phố mới vào array
citiesHabitantsInMillions.push(BuenosAires);

// Và hàm này trả về số lượng người sinh sống lớn nhất
const MostHabitantsInMillions = () => {
  return Math.max(...citiesHabitantsInMillions.map((city) => city.habitants));
};

console.log(MostHabitantsInMillions()); // 8.9
```

Decorator Pattern
-----------------

**Decorator pattern** cho phép bạn đính kèm các hành vi mới vào các đối tượng bằng cách đặt chúng bên trong các đối tượng trình bao bọc có chứa các hành vi. Nếu bạn đã quen thuộc với React và các Hight order component (HOC) thì kiểu tiếp cận này sẽ giễ dàng với bạn đấy.

Về mặt kỹ thuật, các **component** trong **React function**, không phải đối tượng. Nhưng nếu bạn nghĩ về cách **React Context** hoặc [Memo](https://www.freecodecamp.org/news/memoization-in-javascript-and-react/), bạn có thể thấy rằng bạn đang chuyển một **component** dưới dạng con vào HOC này và nhờ đó, **component** con này có thể truy cập vào một số tính năng nhất định.

Trong ví dụ này, bạn có thể thấy rằng **ContextProvider Component** đang nhận **children** làm **props**:

```jsx
import {useState} from 'react';
import Context from './Context';

const ContextProvider: React.FC = ({children}) => {
  const [darkModeOn, setDarkModeOn] = useState(true);
  const [englishLanguage, setEnglishLanguage] = useState(true);

  return (
    <Context.Provider
      value={{
        darkModeOn,
        setDarkModeOn,
        englishLanguage,
        setEnglishLanguage,
      }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
```

Sau đó, bạn bọc toàn bộ ứng dụng xung quanh nó:

```jsx
export default function App() {
  return (
    <ContextProvider>
      <Router>
        <ErrorBoundary>
          <Suspense fallback={<></>}>
            <Header />
          </Suspense>

          <Routes>
            <Route
              path='/'
              element={
                <Suspense fallback={<></>}>
                  <AboutPage />
                </Suspense>
              }
            />

            <Route
              path='/projects'
              element={
                <Suspense fallback={<></>}>
                  <ProjectsPage />
                </Suspense>
              }
            />

            <Route
              path='/projects/helpr'
              element={
                <Suspense fallback={<></>}>
                  <HelprProject />
                </Suspense>
              }
            />

            <Route
              path='/projects/myWebsite'
              element={
                <Suspense fallback={<></>}>
                  <MyWebsiteProject />
                </Suspense>
              }
            />

            <Route
              path='/projects/mixr'
              element={
                <Suspense fallback={<></>}>
                  <MixrProject />
                </Suspense>
              }
            />

            <Route
              path='/projects/shortr'
              element={
                <Suspense fallback={<></>}>
                  <ShortrProject />
                </Suspense>
              }
            />

            <Route
              path='/curriculum'
              element={
                <Suspense fallback={<></>}>
                  <CurriculumPage />
                </Suspense>
              }
            />

            <Route
              path='/blog'
              element={
                <Suspense fallback={<></>}>
                  <BlogPage />
                </Suspense>
              }
            />

            <Route
              path='/contact'
              element={
                <Suspense fallback={<></>}>
                  <ContactPage />
                </Suspense>
              }
            />
          </Routes>
        </ErrorBoundary>
      </Router>
    </ContextProvider>
  );
}
```

Và sau này, bằng cách sử dụng `**useContext**` hook, mình có thể truy cập state được xác định trong **Context** từ bất kỳ **component** nào trong ứng dụng của mình.

```jsx
const AboutPage: React.FC = () => {
  const {darkModeOn, englishLanguage} = useContext(Context);

  return (...);
};

export default AboutPage;
```

Một lần nữa, đây có thể không phải là cách triển khai chính xác mà các tác giả cuốn sách đã nghĩ đến khi họ viết về patterns này, nhưng mình tin rằng ý tưởng cũng giống nhau. Đặt một đối tượng trong một đối tượng khác để nó có thể truy cập các tính năng nhất định. 😎

Facade Pattern
--------------

**Facade pattern** cung cấp giao diện đơn giản hóa cho thư viện, framework hoặc bất kỳ tập hợp **class** phức tạp nào khác.

Ngoài lề: Hiện tại phần **Front-end** của dự án mình cũng đang cùng **Facade design pattern** cùng với Angular + Redux. (Cái **Facade** này chưa biết thì thôi biết rồi đi đâu cũng gặp à)

Okay quay lại vấn đề, Bạn có thể đưa ra rất nhiều ví dụ cho **Facade pattern**, phải không? Ý mình là, bản thân **React** hoặc bất kỳ **thư viện** nào ngoài kia được sử dụng khá nhiều. Đặc biệt khi bạn nghĩ về [lập trình khai báo (Declarative programing - mình cũng có 1 bài viết về vấn đề này)](https://tuan200tokyo.blogspot.com/2022/09/blog3-mot-so-mo-hinh-lap-trinh-pho-bien.html#imperative-programming), tất cả chỉ nhằm cung cấp những nội dung trừu tượng để che giấu sự phức tạp khỏi con mắt của nhà phát triển.

Một ví dụ đơn giản có thể là **JavaScript** và các hàm **`sort` `reduce` `filter` `for map`**, tất cả đều hoạt động giống như thế. Dùng đơn giản và ko cần quan tâm bên trong nó hoạt động như thể nào.

Một ví dụ khác có thể là bất kỳ **thư viện** nào được sử dụng để phát triển giao diện người dùng ngày nay, như [MUI](https://mui.com/). Như bạn có thể thấy trong ví dụ sau, các **thư viện** này cung cấp cho bạn các **component** mang lại các tính năng và chức năng tích hợp giúp bạn xây dựng **code** nhanh hơn và dễ dàng hơn.

Nhưng tất cả điều này khi được biên dịch sẽ biến thành các phần tử HTML đơn giản, đó là thứ duy nhất mà các trình duyệt hiểu được. Những component này chỉ là những phần trừu tượng ở đây để làm cho cuộc sống của bạn dễ dàng hơn.

```jsx
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return {name, calories, fat, carbs, protein};
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 650}} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align='right'>Calories</TableCell>
            <TableCell align='right'>Fat&nbsp;(g)</TableCell>
            <TableCell align='right'>Carbs&nbsp;(g)</TableCell>
            <TableCell align='right'>Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='right'>{row.calories}</TableCell>
              <TableCell align='right'>{row.fat}</TableCell>
              <TableCell align='right'>{row.carbs}</TableCell>
              <TableCell align='right'>{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
```

Proxy Pattern
-------------

**Proxy Pattern** cung cấp một vật thay thế hoặc trình giữ chỗ cho một đối tượng khác. Ý tưởng là kiểm soát quyền truy cập vào đối tượng gốc, thực hiện một số loại hành động trước hoặc sau khi yêu cầu đến đối tượng gốc thực sự.

Một lần nữa, nếu bạn đã quen thuộc với [ExpressJS](https://expressjs.com/), thì lại quá í zì. Express là một **framework** được sử dụng để phát triển các NodeJS API và một trong những tính năng của nó là sử dụng **Middleware**. Middleware không hơn gì những đoạn code mà bạn có thể thực hiện trước, ở giữa hoặc sau khi bất kỳ yêu cầu nào đến **endpoint** của bạn.

Hãy xem điều này trong một ví dụ. Ở đây mình có một chức năng test **token**. Đừng chú ý nhiều đến cách nó thực hiện điều đó. Chỉ cần biết rằng nó nhận một **token** dưới dạng tham số và sau khi hoàn tất, nó sẽ gọi hàm **next()**.

```jsx
const jwt = require('jsonwebtoken');

module.exports = function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token === null) return res.status(401).send(JSON.stringify('No access token provided'));

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send(JSON.stringify('Wrong token provided'));
    req.user = user;
    next();
  });
};
```

Hàm này là một middleware và bạn có thể sử dụng nó trong bất kỳ **endpoint** nào của API của bạn theo cách sau. Bạn chỉ đặt middleware sau địa chỉ **endpoint** và trước khi khai báo hàm **endpoint**:

```js
router.get('/:jobRecordId', authenticateToken, async (req, res) => {
  try {
    const job = await JobRecord.findOne({_id: req.params.jobRecordId});
    res.status(200).send(job);
  } catch (err) {
    res.status(500).json(err);
  }
});
```

Bằng cách này, nếu không có **token** hoặc **token** sai được cung cấp, **middleware** sẽ trả về phản hồi lỗi tương ứng. Nếu **token** hợp lệ được cung cấp, **middleware** sẽ gọi hàm next() và hàm **endpoint** sẽ được thực thi tiếp theo.

Bạn có thể đã viết cùng một **code** trong chính **endpoint** và xác thực **token** ở đó, mà không cần lo lắng về middleware hoặc bất cứ điều gì. Nhưng vấn đề là bây giờ bạn có một sự trừu tượng mà bạn có thể sử dụng lại ở nhiều **endpoint** khác nhau. 😉

Một lần nữa, đây có thể không phải là ý tưởng chính xác mà các tác giả đã nghĩ đến, nhưng mình tin rằng đó là một ví dụ hợp lệ. Bạn đang kiểm soát quyền truy cập của một đối tượng để bạn có thể thực hiện các hành động tại một thời điểm cụ thể.

Behavioral Design Patterns
==========================

Các **Behavioral Patterns** kiểm soát giao tiếp và phân công trách nhiệm giữa các đối tượng khác nhau.

Chain of Responsibility Pattern
-------------------------------

**Chain of Responsibility Pattern** chuyển các yêu cầu dọc theo một string các trình xử lý. Mỗi trình xử lý quyết định xử lý yêu cầu hoặc chuyển nó cho trình xử lý tiếp theo trong string.

Đối với **patterns** này, bạn có thể sử dụng cùng một ví dụ chính xác như trước đây, vì **middleware** trong **Express** bằng cách nào đó là trình xử lý xử lý một yêu cầu hoặc chuyển nó cho trình xử lý tiếp theo.

Nếu bạn muốn một ví dụ khác, hãy nghĩ về bất kỳ hệ thống nào mà bạn có một số thông tin nhất định để xử lý theo nhiều bước. Ở mỗi bước, một thực thể khác nhau chịu trách nhiệm thực hiện một hành động và thông tin chỉ được chuyển cho một thực thể khác nếu một điều kiện nhất định được đáp ứng.

Bạn có thể thấy ở đây bạn có nhiều thực thể khác nhau hợp tác để thực hiện một nhiệm vụ nhất định như thế nào. Mỗi hàm trong số đó chịu trách nhiệm cho một "**step**" duy nhất của nhiệm vụ đó.

Iterator Pattern
----------------

**Iterator Pattern** được sử dụng để duyệt qua các phần tử của một tập hợp. Điều này nghe có vẻ tầm thường trong các ngôn ngữ lập trình được sử dụng ngày nay, nhưng không phải lúc nào cũng vậy.

Dù sao đi nữa, bất kỳ hàm nào được tích hợp sẵn trong JavaScript mà bạn có sẵn để lặp qua các cấu trúc dữ liệu (for, forEach, for...of, for...in, map, reduce, filter, vâ vân)

Tương tự như bất kỳ [thuật toán](https://www.freecodecamp.org/news/introduction-to-algorithms-with-javascript-examples/#traversing-algorithms) duyệt nào, bạn viết code để lặp qua các [cấu trúc dữ liệu phức tạp hơn như cây hoặc đồ thị](https://www.freecodecamp.org/news/data-structures-in-javascript-with-examples/). (Mình đã viết rất kỹ ở 2 bài này bạn có thể tham khảo)

Observer Pattern
----------------

**Observer Pattern** cho phép bạn xác định cơ chế đăng ký để thông báo cho nhiều đối tượng về bất kỳ sự kiện nào xảy ra với đối tượng mà họ đang quan sát. Về cơ bản, nó giống như việc có một trình lắng nghe sự kiện trên một đối tượng nhất định và khi đối tượng đó thực hiện hành động mà bạn đang lắng nghe, bạn sẽ làm điều gì đó.

**React Effect hook** có thể là một ví dụ điển hình ở đây. Những gì **useEffect** làm là thực thi một hàm đã cho tại thời điểm bạn khai báo.

**Hook** được chia thành hai phần chính, chức năng thực thi và một array các phần phụ thuộc. Nếu array trống, giống như trong ví dụ sau, hàm sẽ được thực thi mỗi khi **component** được hiển thị.

```jsx
useEffect(() => {
  console.log('The component has rendered');
}, []);
```

Nếu bạn khai báo bất kỳ biến nào trong array phụ thuộc, hàm sẽ chỉ thực thi khi các biến đó thay đổi.

```jsx
useEffect(() => {
  console.log('var1 has changed');
}, [var1]);
```

Ngay cả những **event listeners** đơn thuần của JavaScript cũ cũng có thể được coi là những **observer**. Ngoài ra, [lập trình phản ứng (reactive programming)](https://en.wikipedia.org/wiki/Reactive_programming) và các thư viện như [RxJS](https://rxjs.dev/) , được sử dụng để xử lý thông tin và sự kiện không đồng bộ dọc theo hệ thống, là những ví dụ điển hình về **patterns** này.

**Roundup**
===========

Nếu bạn muốn biết thêm về chủ đề này, mình giới thiệu video G[reat Fireship](https://www.youtube.com/watch?v=tv-_1er1mWI) và [trang web tuyệt vời này](https://refactoring.guru/) , nơi bạn có thể tìm thấy những lời giải thích rất chi tiết với hình ảnh minh họa để giúp bạn hiểu từng **patterns**.

Như mọi khi, mình hy vọng bạn thích bài viết này và học được điều gì đó mới. 

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy thích blog của mình thì nhấn theo dõi để ủng hộ mình nhé. Thank you.😉

# Ref
* https://tuan200tokyo.blogspot.com/2022/10/blog10-gioi-thieu-ve-javascript-design.html