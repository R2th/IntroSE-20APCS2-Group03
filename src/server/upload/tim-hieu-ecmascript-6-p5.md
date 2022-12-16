Chào các bạn. Hôm nay chúng ta sẽ cùng tiếp tục tìm hiểu những tính năng mới trong bản ECMAScript 6.

Phần 1 các bạn có thể xem [Tại Đây](https://viblo.asia/p/tim-hieu-ecmascript-6-p2-oOVlYOpyK8W)

Phần 2 các bạn có thể xem [Tại Đây](https://viblo.asia/p/tim-hieu-ecmascript-6-p2-oOVlYOpyK8W)

Phần 3 các bạn có thể xem [Tại Đây](https://viblo.asia/p/tim-hieu-ecmascript-6-p3-vyDZOX6Qlwj)

Phần 4 các bạn có thể xem [Tại Đây](https://viblo.asia/p/tim-hieu-ecmascript-6-p4-1VgZvNXOZAw)

Hôm nay chúng ta sẽ tiếp tục với series về ES6 nhé mn
# Modules(Value Export/Import)
## Export
Export là gì câu lệnh được sử dụng trong các module của Javascript, nó cho phép export các function, object hoặc một giá trị của thể, và đối tượng được export có thể được sử dụng ở các file javascript khác thông qua câu lệnh Import.

### Syntax

```Javascript
export { name1, name2, …, nameN };
export { variable1 as name1, variable2 as name2, …, nameN };
export let name1, name2, …, nameN; // also var
export let name1 = …, name2 = …, …, nameN; // also var, const
export function FunctionName(){...}
export class ClassName {...}

export default expression;
export default function (…) { … } // also class, function*
export default function name1(…) { … } // also class, function*
export { name1 as default, … };

export * from …;
export { name1, name2, …, nameN } from …;
export { import1 as name1, import2 as name2, …, nameN } from …;
export { default } from …;
```

Export thì chia làm 3 loại như sau:
 - Named export: export các object của thể trong module, hoặc export các object trong module với một tên tên mới
     ```Javascript
     export { myFunction }; 

    // exports a constant
    export const foo = Math.sqrt(2);
    ```
 - Default export (function) : export module ra là một function khi call thì sẽ chạy function được export
    ```Javascript
    export default function() {}
    ```
 - Default export (class) : export module ra là một class, có thể sử dụng được các property cũng như function trong module đó
     ```Javascript
    export default class {}
    ```
    
    
 - **Khi export thì chúng ta có thể đặt tên cho các object hay function nhưng khi import vào thì chúng ta ko cần thiết phải sử dụng đúng tên mà mình đã sử dụng khi export.**

     ```Javascript
        export default k = 12; // in file test.js

        import m from './test' // note that we have the freedom to use import m instead of import k, because k was default export

        console.log(m);        // will log 12
      ```
    
### Examples    

***Using named exports***

- tạo mới fileJS "my-module.js"

- Content như sau:

```Javascript
    function cube(x) {
      return x * x * x;
    }
    const foo = Math.PI + Math.SQRT2;
    var graph = {
        options:{
            color:'white',
            thickness:'2px'
        },
        draw: function(){
            console.log('From graph draw function');
        }
    }
    export { cube, foo, graph };
```

- tạo mới 1 file JS "second-module.js"

 ```Javascript
import { cube, foo, graph } from 'my-module';
graph.options = {
    color:'blue',
    thickness:'3px'
}; 
graph.draw();
console.log(cube(3)); // 27
console.log(foo);    // 4.555806215962888
```

**Using the default export**

    - tạo mới fileJS "my-module.js"
    - Content như sau:
    ```Javascrip
    // module "my-module.js"
        export default function cube(x) {
          return x * x * x;
        }
    ```
- tạo mới 1 file JS "second-module.js"

```Javascrip
// module "my-module.js"
import cube from 'my-module';
console.log(cube(3)); // 27
```
 ## Import
    Import là câu lệnh để binding một module đã được export vào file JS đang gọi câu lệnh Import
### Syntax

    ```Javascript
    import defaultExport from "module-name";
    import * as name from "module-name";
    import { export } from "module-name";
    import { export as alias } from "module-name";
    import { export1 , export2 } from "module-name";
    import { export1 , export2 as alias2 , [...] } from "module-name";
    import defaultExport, { export [ , [...] ] } from "module-name";
    import defaultExport, * as name from "module-name";
    import "module-name";
    ````
    
   ***defaultExport*** : sẽ link đến default export của module được import
   
   ***module-name***:: tên của module mình sẽ import vào fileJS, nó có thể là đường dẫn của 1 folder, 1 file cụ thể, có thể có extension hoặc là không, nếu ko có extension thì mặc định là ".js". Và module-name sẽ được bọc trong dấu "single quotes" hoặc là "double quotes"
   
   ***name***:: alias mình đặt để sử dụng trong module
   
   ***export1 , export2***:: một module có thể export nhiều object, và đôi khi chúng ko cần thiết import tất cả các object đó mà chỉ cần import những object cần thiết bằng cách gọi tên chúng trong câu lệnh import.
   
   ***alias1, alias2***: tên do mình đặt cho các object mà mình sẽ sử dụng trong module của mình.
   
### Cách sử dụng "name" export
Sau đây mình sẽ giải thích + đi dịch một số mô tả về cách sử dụng "name" parameter của câu lệnh Import.

* Import tất cả object của module:
   Để thực hiện việc này chúng ta sẽ có cú pháp như sau:
   ```Javascript
   import * as myModule from "./moduleFolder/exportModule.js";
   ```
   với câu lệnh trên thì chúng ta có thể hiểu như sau: import tất cả các export object của exportModule.js và các object đó sẽ được sử dụng trong name space "moduleFolder"
 
 * import một object của module
   Để thực hiện việc này chúng ta sẽ có cú pháp như sau:
   ```Javascript
   import {myExport} from"./moduleFolder/exportModule.js";
   ```
   với câu lệnh trên thì chúng ta có thể hiểu như sau: lấy một object có tên là "myExport"  của exportModule.js
   
 * import nhiều object của module (không phải là tất cả)
   Để thực hiện việc này chúng ta sẽ có cú pháp như sau:
   ```Javascript
   import {myExport1, myExport2} from"./moduleFolder/exportModule.js";
   ```
   với câu lệnh trên thì chúng ta có thể hiểu như sau: lấy hai object có tên là "myExport1, myExport2"  của exportModule.js
   
* import với alias
   Để thực hiện việc này chúng ta sẽ có cú pháp như sau:
   ```Javascript
   import {thisIsMyExportObjectWithLongName as myExport} from"./moduleFolder/exportModule.js";
   ```
   với câu lệnh trên thì chúng ta có thể hiểu như sau: lấy object   "thisIsMyExportObjectWithLongName" của exportModule.js và sử dụng với tên  "myExport"
   Với câu lệnh này chúng ta có thể đặt tên cho các export object,  tiện lợi hơn cho việc nhìn code :D
   
* import với nhiều alias
    Để thực hiện việc này chúng ta sẽ có cú pháp như sau:
    ```Javascript
    import {thisIsMyExportObjectWithLongName1 as myExport1, thisIsMyExportObjectWithLongName2 as myExport2} from"./moduleFolder/exportModule.js";
    ```
  Việc đặt alias tương tự như việc đặt alias cho một object


### Examples

* The module: file.js
```Javascript
function getJSON(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.onload = function () { 
    callback(this.responseText) 
  };
  xhr.open('GET', url, true);
  xhr.send();
}

export function getUsefulContents(url, callback) {
  getJSON(url, data => callback(JSON.parse(data)));
}
```

* The module: main.js
```Javascript
import { getUsefulContents } from '/modules/file.js';

getUsefulContents('http://www.example.com',
    data => { doSomethingUseful(data); });
```