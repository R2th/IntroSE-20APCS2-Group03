# Ciao,

Vâng, chào các bạn, lại là mình đây! Và hôm nay, như tiêu đề, mình sẽ chỉ các bạn các để import động bất cứ modules nào trong ES6 nha :sunglasses: Với cái nóng oi ả bức bối của mùa hè năm nay, mình sẽ xin đi thẳng vào nội dung chính luôn cho nó tròn các bạn nha. Đôi khi "cục súc" cũng là do thời tiết các bạn ạ... :stuck_out_tongue_closed_eyes:

Nói qua 1 chút, module trong ES6 (hay ES2015) là các để tổ chức các đoạn mã có tính gắng kết trong Javascript. Module thì cũng gắn liền với 2 từ khoá `import` và `export`... Để rõ hơn thì các bạn có thể đọc thêm [tại đây](https://viblo.asia/p/imports-va-exports-trong-javascript-es6-6J3ZgjyAKmB) nha.

Dường như trong đa số trường hợp, lập trình viên chúng mình đều sử dụng `import` tĩnh, tức là mọi liên kết giữa các modules từ nơi sử dụng tới nơi `export` đều được xác định rõ ràng khi biên dịch.
```js
// The imported module exports components
export const concat = (paramA, paramB) => paramA + paramB;
```
```js
// The importing module
import { concat } from './concatModule';

concat('a', 'b'); // => 'ab'
```

Thế nhưng đời không như mơ, một ngày bạn có yêu cầu cần phải xử lý động modules sử dụng tuỳ vào điều kiện, hoặc đơn giản là phải giảm băng thông tải xuống của máy khách, và đó cũng chính là mình đây, bạn giống mình, và chúng ta đang gặp nhau trong bài viết này. Vậy chần chừ gì mà không bắt đầu ngay thôi nhỉ! :sunglasses:

# I. Import động các modules
Ở cách này, thay vì việc sử dụng từ khoá `import` theo dạng tĩnh, ta coi nó là 1 function và sử dụng như sau:

```js
const module = await import(pathToModule);
```

Ở đây, ta sẽ nhận lại 1 `Promise`  và một quá trình bất đồng bộ thực hiện load module sẽ được thực hiện. Tuỳ vào việc `import` thành công hay thất bại mà `Promise` đó sẽ `resolve` trả về nội dung module hoặc `reject` trả về lỗi.

Giả sử rõ hơn, ta thử load 1 module trong 1 hàm bất đồng bộ:
```js
async function loadMyModule() {
  const myModule = await import('./myModule'); 
  // ... use myModule
}

loadMyModule();
```

Điều thú vị hơn ở đây, là ta hoàn toàn truyền được đường dẫn tới module một cách linh hoạt, ở đây ta sẽ truyền đường dẫn dưới dạng tham số của hàm. Và chắc chắn rồi, mọi thứ hoạt động hoàn toàn ổn định:
```js
async function loadMyModule(pathToModule) {
  const myModule = await import(pathToModule);  
  // ... use myModule
}

loadMyModule('./myModule');
```

# II. Import các components trong module
## 1. Import component được đặt tên
Giả sử ta có 1 module với tên là `namedConcat.js`, đã `export` ra một hàm tên là `concat` làm mẫu:
```js
// namedConcat.js
export const concat = (paramA, paramB) => paramA + paramB;
```

Thì để import động được hàm này ở nơi sử dụng, ta đơn giản làm như sau:
```js
async function loadMyModule() {
  const { concat } = await import('./namedConcat');  
  concat('b', 'c'); // => 'bc'
}

loadMyModule();
```

## 2. Import component theo `default`
Đối với trường hợp module `export` theo dạng `default`:
```js
// defaultConcat.js
export default (paramA, paramB) => paramA + paramB;
```

 Ta có thể dễ dàng truy cập động vào đó thông quy thuộc tính `default` trong khi `import`, cụ thể như sau:
```js
async function loadMyModule() {
  const { default: defaultImport } = await import('./defaultConcat');
  defaultImport('b', 'c'); // => 'bc'
}

loadMyModule();
```

Cần chú ý là `default` là 1 từ khoá trong Javascript, chứ không phải tên một biến sử dụng được trực tiếp.

## 3. Import hỗn hợp
Gộp lại của 2 cách trên, ta sẽ có thể `import` động hỗn hợp các loại `export` đơn giản như sau:
```js
async function loadMyModule() {
  const { 
    default: defaultImport,
    namedExport1,
    namedExport2
  } = await import('./mixedExportModule');
  // ...
}

loadMyModule();
```

# III. Khi nào thì nên dùng?
Với kinh nghiệm của mình, mình khuyên các bạn nên dùng phương pháp `import` động đối với các modules có kích cỡ to hoặc có điều kiện.

Giả sử, có một tình huống bạn muốn tuỳ thuộc vào điều kiện ở thời gian chạy chương trình, mà thực hiện gọi tới 1 số hàm trong modukes lớn khác nhau, nhưng lại cần chú trọng hiệu năng ứng dụng, bạn có thể làm như sau:
```js
async function execBigModule(condition) {
  if (condition) {
    const { funcA } = await import('./bigModuleA');
    funcA();
  } else {
    const { funcB } = await import('./bigModuleB');
    funcB();
  }
}

execBigModule(true);
```

Còn đối với các ví dụ ở phần II mình có nêu ra, một module nhỏ chỉ với một số hàm hoặc thuộc tính đơn giản, việc `import` động dường như không mang lại sự thay đổi gì về mặt hiệu năng chương trình.

# Và thế là hết,

Vậy là qua bài viết ngắn gọn xúc tích, không tốn quá nhiều năng lượng để đọc trong ngày hè nóng nực, mình rất mong đã mang lại được những kiến thức bổ ích bỏ túi cho các bạn trên hành trang trở thành Web Developer tài năng.

Khát thật, mình xin mời bạn một cốc nước khoáng tinh khiết có lợi cho sức khoẻ nhé! Chào tạm biệt và hẹn gặp lại vào một ngày đẹp trời, mình sẽ gửi tới các bạn các bài viết tuyệt vời hơn bao giờ hết! :heart_eyes::heart_eyes::heart_eyes:

Byebyeee!