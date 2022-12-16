Ở bài viết này chúng ta sẽ tìm hiểu thêm về `unknown` type trong Typescript.

Để hiểu về `unknown` type trước hết chúng ta sẽ tìm hiểu về `any` type trong Typescript.

### any Type

Khi chúng ta chạy câu lệnh `tsc anyfile.ts`, typescript code sẽ được transpile ra javascript code.  
Bởi vì javascript là dynamic language nên khi trong Typescript, cần có 1 loại type đại diện cho bất kỳ value nào trong javascript.  
Và đó là `any` type.  
`any` type đại diện cho bất cứ value nào trong javascript, promise, primitive type, array, object, symbol, etc.

```
let anyValue: any;

anyValue = Math.random;
anyValue = 1;
anyValue = {};
anyValue = [];
anyValue = true;
anyValue = "string";
anyValue = null;
anyValue = undefined;
anyValue = Symbol("type");
```

Khi sử dụng `any` type chúng ta có thể thực hiện bất kỳ operation nào.
Typescript sẽ bỏ qua việc kiểm tra type với `any` type value.

```
let anyValue: any;

anyValue.foo().bar();
anyValue.toString();
anyValue[0];
```

### unknown Type

Giống như `any` type, `unknown` type có thể assign bất kỳ value nào.

```
let unknownValue: unknown;

unknownValue = Math.random;
unknownValue = 1;
unknownValue = {};
unknownValue = [];
unknownValue = true;
unknownValue = "string";
unknownValue = null;
unknownValue = undefined;
unknownValue = Symbol("type");
```

Nếu như `any` type cho phép thực hiện bất kỳ operation nào mà không check type  
thì `uknown` type lại gần như không cho phép thực hiện operation nào.

```
let unknownValue: unknown;

unknownValue.foo().bar(); // Error
unknownValue.toString();  // Error
unknownValue[0];          // Error
```

Chúng ta có thể sử dụng type-checking (narrow type) để có thể thực hiện các operation trên `unknown` type

```
let unknownValue: unknow;

if (typeof value === "number") {
    unknownValue + 1
}

if (value instanceOf Xyz) {
   new Xyz()
}
```