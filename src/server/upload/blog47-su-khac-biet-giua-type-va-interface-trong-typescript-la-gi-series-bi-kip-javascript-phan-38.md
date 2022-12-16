![image.png](https://images.viblo.asia/4b6fb7b9-fcba-40a0-b999-a451c0205872.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😊.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😉.

`Interface` là một cách để mô tả cho một **kiểu** dữ liệu, chẳng hạn như một đối tượng. Không giống như một `Interface`, `Type` có thể đặt tên cho bất kỳ kiểu dữ liệu nào, bao gồm các kiểu dữ liệu nguyên thủy, kiểu dữ liệu hợp nhất và kiểu dữ liệu giao nhau.

Interface là gì?
================

Một Interface sẽ trông như thế này:

```javascript
interface Human {
  name: string;
  age: number;
  speak: () => void;
}

// Using an interface
const james: Human = {
  name: 'James',
  age: 30,
  speak: () => {
    console.log('Hello, my name is James.')
  }
```

Ở trên chúng ta đã định nghĩa một Interface có tên là `Human`, và sau đó sử dụng nó để tạo một biến `james`. Các Interface hữu ích theo cách mà chúng ta luôn có thể chắc chắn rằng các đối tượng mà chúng ta tạo có cùng các thuộc tính (Properties). Và nếu chúng ta tình cờ tạo một biến có Interface `Human`, với các `Properties` khác, thì TypeScript sẽ hiển thị lỗi.

```javascript
// Creating an interface that does not match the "Human" shape
const charlie: Human {
  name: 'Charlie',
  
  // This will display an error
  // Type '{ name: string; run: () => void }' is not assignable to type 'Human'.
  run: () => {
    console.log('Running away!')
  }
}
```

Type là gì?
===========

Khi tạo một `type`, bạn không thực sự tạo một Type mới mà bạn đang tạo một **tên** mới cho một Type, đó là lý do tại sao nó được gọi là [type alias](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-aliases) .

Trước khi bạn quá bối rối, đây là một ví dụ tương tự dành cho bạn:

Ben có một chiếc **laptop**, nhưng thay vì gọi nó là **laptop**, anh ấy lại gọi nó là **Code Maker**, bởi vì Ben rất khó tính và thích gọi như vậy sẽ rất ngầu đời.

```javascript
type Laptop = {
  language: string;
  model: string;
  year: number;
}

type CodeMaker = {
  language: string;
  model: string;
  year: number; 
}
```

Như chúng ta có thể thấy ở trên, các Properties của kiểu `Laptop` và `CodeMaker` hoàn toàn giống nhau. Tại sao chúng ta cần tạo một Type khác có cùng Properties, chỉ vì Ben muốn gọi nó là “**Code Maker**” thay vì laptop như mọi người khác? Điều đó không công bằng lắm.

John nói: “Nếu Ben gọi laptop của anh ấy là **Code Maker** , thì mình muốn gọi chiếc **laptop** của mình là **The Machine”**.

```javascript
type Laptop = {
  language: string;
  model: string;
  year: number;
}

type CodeMaker = {
  language: string;
  model: string;
  year: number;
}

type TheMachine = {
  language: string;
  model: string;
  year: number;  
}
```

Bây giờ chúng ta có 3 tên khác nhau, về cơ bản mô tả cùng một thứ. Hãy đơn giản hóa nó bằng cách làm điều gì đó với `type` nhưng `interface` không thể làm.

```javascript
type Laptop = {
  language: string;
  model: string;
  year: number;
};

type CodeMaker = Laptop;
type TheMachine = Laptop;

const bensLaptop: CodeMaker = {
  language: 'en',
  model: 'Macbook Pro',
  year: 2016
}

const johnsLaptop: TheMachine = {
  language: 'en',
  model: 'Dell XPS',
  year: 2018
}
```

Thay vì khai báo `Laptop` 3 lần, Ben và John chỉ cần tạo `type aliases` của `Laptop` và gọi nó là bất cứ thứ gì họ muốn. Và tất nhiên, dù người ta gọi laptop bằng nhiều tên khác nhau thì suy cho cùng nó vẫn là **laptop**. Vì vậy, code dưới đây là hoàn toàn hợp lệ.

```javascript
const benAndJohnsLaptops: Laptop[] = [bensLaptop, johnsLaptop]
```

Không giống như một khai báo Interface, luôn giới thiệu một kiểu đối tượng được đặt tên, một **type aliases** có thể đưa ra một tên cho bất kỳ Type nào, bao gồm các kiểu dữ liệu nguyên thủy, kiểu dữ liệu hợp nhất và kiểu dữ liệu giao nhau.

Chúng ta cũng có thể đặt **type aliases** cho các [kiểu dữ liệu nguyên thủy](https://www.typescriptlang.org/docs/handbook/basic-types.html), đây là điều `interface` không thể làm được. Lấy ví dụ sau:

```javascript
type Age = number;

const bensAge: Age = 21;
const johnsAge: Age = 31;
```

Interface vs Type
=================

Đây là bảng phân tích nhanh về Interface và Type.

1\. Cả hai đều hỗ trợ kế thừa, mặc dù cú pháp khác nhau
-------------------------------------------------------

```javascript
// Interface extends interface
interface Animal { age: number; }
interface Dog extends Animal { woof: () => void; }

// Type extends type
type Animal = { age: number; }
type Dog = Animal & { woof: () => void; }

// Interface extends type
type Animal = { age: number; };
interface Dog extends Animal { woof: () => void; }

// Type extends interface
interface Animal { age: number; }
type Dog = Animal & { woof: () => void; }
```

2\. Interface hỗ trợ `merged declarations`, còn Type thì không
------------------------------------------
Merged declarations là khi bạn khai báo 2 kiểu cùng tên nó sẽ **merge** chúng lại với nhau.

```javascript
type Laptop = {
  language: string;
  model: string;
  year: number;
};

// This will cause error: Duplicate identifier 'Laptop'.ts(2300)
type Laptop = {
  cpu: string;
};

interface Human {
  name: string;
  age: string;
  speak: () => void;
}

// No problems here. The multiple declarations will be "merged",
// Human interface will have all the properties defined above, as well as "jump".
interface Human {
  jump: () => void;
}
```

3\. Type hỗ trợ tạo bí danh (type aliases) cho các kiểu dữ liệu nguyên thủy và toàn bộ kiểu khác. Interface thì không
---------------------------------------------------------------------------------------------

```javascript
// primitive
type Age = number;

// union
type Length = 'short' | 'long';

// tuple
type Data = [number, string];
```

Vậy… khi nào thì nên sử dụng **Interface** và khi nào mình nên sử dụng **Type**?
--------------------------------------------------------------------------------

Bạn nên bắt đầu bằng cách suy nghĩ về những gì mà bạn muốn đạt được trước, sau đó quyết định sử dụng cái nào cho hợp lý. 
Bạn có cần kế thừa Interface hay không?. Cần tạo `type aliases` cho các kiểu dữ liệu nguyên thủy hay không?. 
Bạn có cần việc [Merged declarations (khai báo hợp nhất)](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) Interface hay không?

Hãy tạo ra những câu hỏi trước khi bạn muốn làm bất cứ việc gì. Đó là cách tốt nhất để bạn xử lý mọi vấn đề.

Roundup
--------------------------------------------------------------------------------

Như mọi khi, mình hy vọng bạn thích bài viết này và học thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉 

Ref
--------------------------------------------------------------------------------
* https://tuan200tokyo.blogspot.com/2022/11/blog47-su-khac-biet-giua-type-va.html