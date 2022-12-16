![](https://images.viblo.asia/af02fbbe-4429-4ef3-acee-8c8b63236a10.png)

## Giới thiệu
ES6 cung cấp cho chúng ta **import (nhập)**, **export (xuất)** các functions, biến từ module này sang module khác và sử dụng nó trong các file khác. Nói một cách chính xác theo thuật ngữ React, người ta có thể sử dụng các stateless components trong các components khác bằng cách export các components từ các modules tương ứng và sử dụng nó trong các tệp khác.

ES6 cung cấp hai cách để export một module từ một tệp: named export và default export.

### 1. Named Export: (export)
Trong JavaScript ES6, named export được sử dụng để xuất nhiều thứ từ một module bằng cách thêm keyword export vào khai báo của chúng. Những thứ được export sẽ được phân biệt bằng tên. Sau đó import những thứ chúng ta cần sử dụng bằng cách bao quanh chúng cặp dấu ngoặc nhọn **{ }**. Tên của module đã nhập phải giống với tên của module đã xuất.

Ví dụ 1: Tôi đã tạo các hàm được đặt tên trong một tệp JavaScript có tên là functionsFile.js
```
//functionsFile.js

//exporting a function
export function squareNumber(x) {
  return x * x; 
}

//exporting a variable 
export const pi = 3.14; 

//Cách khác để export:

//exporting a function
function squareNumber(x) {
  return x * x; 
}

//exporting a variable 
const pi = 3.14; 
export {squareNumber, pi} ; 
```

Bây giờ hàm SquareNumber và biến pi đã sẵn sàng để import. Tôi sẽ tạo một tệp có tên main.js và import các giá trị được export ở trên

```
//main.js 
import {squareNumber, pi} from "functionsFile"; 
const radius = 7; 
console.log("Area of a circle is", pi * squareNumber(7)); 

//Cách khác để import

import * as mathFuncs from "functionsFile"; 
console.log("Area of circle is ", mathFuncs.pi * mathFuncs.squareNumber(7)); 
```

Ví dụ 2:

```
// imports
// importing a single named export
import { MyComponent } from "./MyComponent";

// importing multiple named exports
import { MyComponent, MyComponent2 } from "./MyComponent";

// sử dụng 'as' để đặt tên khác cho named export:
import { MyComponent2 as MyNewComponent } from "./MyComponent";

// import tất cả named exports vào 1 đối tượng:
import * as MainComponents from "./MyComponent";

// exports from ./MyComponent.js file
export const MyComponent = () => {}
export const MyComponent2 = () => {}

```

### 2. Default Export: (export default)

**Default Export** trong Javascript ES6 chỉ cho phép xuất một mặc định cho mỗi file. **Default Export** có thể cho một function, class hoặc một object.

Ví dụ 1:

```
//functionsFile.js

export default function(x) { 
  return x * x ; 
}
```
import vào 1 file khác
```
//main.js 

import squareNumber from "functionsFile"; 
squareNumber(7);
```

Ví dụ 2:
```
// import
import MyDefaultComponent from "./MyDefaultExport";
// export
const MyComponent = () => {}
export default MyComponent;
```


**Chú ý:** Việc đặt tên import hoàn toàn độc lập trong export default và chúng ta có thể sử dụng bất kỳ tên nào mà mình muốn.


### 3. Exporting a class

Trong Javascript ES6, các class cũng có thể được xuất như các function

Ví dụ 1:

```
//MyClass.js 

export default class MyClass {
  ...
} 

//Main.js

import MyClass from "MyClass";
```

Xét trong trường hợp sử dụng React, trong đó MyClass là một component và cần được hiển thị bên trong Main, nó sẽ trông như sau:

```
//MyClass.js 

import React from "react"; 
export default class MyClass extends React.Component {
  ...
} 

//Main.js

import React from "react"; 
import MyClass from "MyClass";
export default class Main extends React.Component {
  render() {
    return(
        <MyClass />
      );
  }
}
```

## Tổng kết

**Named exports** hữu dụng trong việc xuất một số giá trị. Trong quá trình import, chúng ta sẽ có thể sử dụng tên tương tự để chỉ giá trị tương ứng.

Liên quan đến **Export default**, chỉ có một default export duy nhất cho mỗi một module. **Export default** có thể là một function, một class, một object hoặc bất cứ thứ gì khác. Giá trị này được coi là giá trị export chính vì nó là đơn giản nhất để import.

Nguồn:

http://parseobjects.com/imports-exports-javascript-es6/