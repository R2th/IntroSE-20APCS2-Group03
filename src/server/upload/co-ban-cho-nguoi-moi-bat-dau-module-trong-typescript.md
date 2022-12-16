![image.png](https://images.viblo.asia/ec4f1428-7dca-438c-8f0b-732f6b6b1143.png)

**JavaScript** có một lịch sử lâu dài về các cách khác nhau để xử lý với việc module hóa. **TypeScript** ra đời từ năm 2012, đã triển khai hỗ trợ cho rất nhiều định dạng này, nhưng theo thời gian, cộng đồng và đặc tả JavaScript đã hội tụ trên một định dạng được gọi là **ES Module** (hoặc **ES6 Module**). Bạn có thể dùng nó với cú pháp `import/export`

ES Module đã được thêm vào thông số kỹ thuật JavaScript vào năm 2015 và đến năm 2020 đã hỗ trợ rộng rãi trong hầu hết các trình duyệt web và thời gian chạy JavaScript.

**ES Module Syntax**
Một file có thể khai báo một hàm chính với default export để export như sau:

```
// @filename: hello.ts
export default function helloWorld() {
  console.log("Hello, world!");
}
```

Sau đó ta imported vào bằng cách gọi:

```
import hello from "./hello.js";
hello();
```

Ngoài default export, bạn có thể có nhiều hơn một hàm export hoặc export các biến thông qua việc từ khóa `export`


```
// @filename: maths.ts
export var pi = 3.14;
export let squareTwo = 1.41;
export const phi = 1.61;
 
export class RandomNumberGenerator {}
 
export function absolute(num: number) {
  if (num < 0) return num * -1;
  return num;
}
```

Chúng có thể được gọi vào ở những chổ khác thông qua từ khóa `import`:

```
import { pi, phi, absolute } from "./maths.js";
 
console.log(pi);
const absPhi = absolute(phi);  // const absPhi: number
```

**Additional Import Syntax**
Việc import có thể đổi tên khi sử dụng theo format như:` import {old as new}`

```
import { pi as π } from "./maths.js";

console.log(π); // (alias) var π: number
// import π
```

You can mix and match the above syntax into a single `import`:
Bạn có thể kết hợp cú pháp trên vào một lần `import`
```
// @filename: maths.ts
export const pi = 3.14;
export default class RandomNumberGenerator {}
 
// @filename: app.ts
import RNGen, { pi as π } from "./maths.js";
 
RNGen;
 
// (alias) class RNGen
// import RNGen
 
console.log(π);
           
// (alias) const π: 3.14
// import π
```

Bạn cũng có thể lấy tất cả các object cần export và đặt chúng vào chung một namespace với cú pháp `* as name` như sau:

```
// @filename: app.ts
import * as math from "./maths.js";
 
console.log(math.pi);
const positivePhi = math.absolute(math.phi);
          
// const positivePhi: number
```


Bạn có thể import một file và không gồm bất kỳ biến nào vào trong module của bạn thông qua `import "./file"`

```
// @filename: app.ts
import "./maths.js";
 
console.log("3.14");
```

Trong trường hợp này, việc import không có tác dụng gì. Tuy nhiên, tất cả mã trong `maths.ts` đã được biên dịch, có thể gây ra các tác dụng phụ ảnh hưởng đến các đối tượng khác.

**TypeScript Specific ES Module Syntax**

Các loại đối tượng có thể được import/export bằng cú pháp giống như các giá trị JavaScript:

```
// @filename: animal.ts
export type Cat = { breed: string; yearOfBirth: number };
 
export interface Dog {
  breeds: string[];
  yearOfBirth: number;
}
 
// @filename: app.ts
import { Cat, Dog } from "./animal.js";
type Animals = Cat | Dog;
```

TypeScript đã mở rộng cú pháp import với từ khóa `import type` là kiểu import chỉ có thể dùng với các loại `import type` khác để mô tả cụ thể chỉ import type thay vi import tất cả các object.

```
// @filename: animal.ts
export type Cat = { breed: string; yearOfBirth: number };
export type Dog = { breeds: string[]; yearOfBirth: number };
export const createCatName = () => "fluffy";
 
// @filename: valid.ts
import type { Cat, Dog } from "./animal.js";
export type Animals = Cat | Dog;
 
// @filename: app.ts
import type { createCatName } from "./animal.js"; // 'createCatName' cannot be used as a value because it was imported using 'import type'.
const name = createCatName(); // OK
```

**ES Module Syntax with CommonJS Behavior**

```
import fs = require("fs");
const code = fs.readFileSync("hello.ts", "utf8");
```

**CommonJS Syntax**
 Export:
 
```
 function absolute(num: number) {
  if (num < 0) return num * -1;
  return num;
}
 
module.exports = {
  pi: 3.14,
  squareTwo: 1.41,
  phi: 1.61,
  absolute,
};
```

Import:

```
const maths = require("maths");
maths.pi;
```

hoặc: 

`const { squareTwo } = require("maths");`


Tham khảo: https://www.typescriptlang.org/docs/handbook/2/modules.html