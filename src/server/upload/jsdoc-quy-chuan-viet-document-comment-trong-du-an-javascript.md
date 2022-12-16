Viết comment cho dự án nghe tưởng chừng như là một việc đơn giản nhưng phần lớn các developer đều bỏ qua nó. Do đó sau một khoảng thời gian có thể developer đó sẽ cần mở lại dự án để bảo trì và có thể không hiểu được những dòng code mà vài tháng trước mình đã viết dù đã căng mắt ra đọc. Do vậy việc viết comment là một kỹ năng khá quan trọng giúp cho việc tái sử dụng các đoạn code cũ dễ dàng hơn, giúp dev tiết kiệm thời gian cho chính mình cũng như các dev khác bảo trì dự án của bạn. Dù chúng ta cũng từng nghe rằng nếu viết code đủ dễ hiểu thì sẽ không cần phải comment. Nhưng trong thực tế liệu lúc nào chúng ta cũng có thể làm được như vậy với một đống logic xuất phát từ yêu cầu của khách hàng? Do đó vậy việc viết comment vẫn là một kỹ năng cần thiết giúp bảo vệ bộ não của chúng ta không bị nướng chín khi đọc lại các dòng code cũ của chính mình.

## 1. Clarification comments và documentation comments

Có 2 loại comment thường được sử dụng:
- **Comment mang tính chất giải thích (clarification comments)**: Thường được sử dụng, mục đích để cho người đọc hiểu được chức năng chính của một hàm hay một đoạn code cần giải thích. Một ví dụ từ lodash:

```js
function addSetEntry(set, value) {   
  // Don't return `set.add` because it's not chainable in IE 11.
  set.add(value);    
  return set;  
}
```

- **Comment mang tính chất tài liệu (documentation comments)**: Thường được sử dụng để định nghĩa chi tiết cho một hàm hay một biến nào đó, bao gồm cả chức năng, kiểu dữ liệu, input/output như thế nào, kiểu dữ liệu trả về,... Một ví dụ khác từ lodash:

```js
/**
 * Creates an object composed of keys generated from the results of running
 * each element of `collection` thru `iteratee`. The corresponding value of
 * each key is the number of times the key was returned by `iteratee`. The
 * iteratee is invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 0.5.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
 * @returns {Object} Returns the composed aggregate object.
 * @example
 *
 * _.countBy([6.1, 4.2, 6.3], Math.floor);
 * // => { '4': 1, '6': 2 }
 *
 * // The `_.property` iteratee shorthand.
 * _.countBy(['one', 'two', 'three'], 'length');
 * // => { '3': 2, '5': 1 }
 */
var countBy = createAggregator(function(result, value, key) {
  if (hasOwnProperty.call(result, key)) {
	++result[key];
  } else {
	baseAssignValue(result, key, 1);
  }
});
```

Documentation comments thường sử dụng các ngôn ngữ đánh dấu như [JSDoc](https://JSDoc.app/) (Javascript), [phpDoc](https://www.phpdoc.org/) (PHP) làm quy chuẩn giúp cho việc đọc hiểu các comment này trở nên dễ dàng hơn.

Việc sử dụng kết hợp thành thục hai loại comment này sẽ giúp source code của bạn dễ đọc dễ hiểu hơn rất nhiều trong các dự án thực tế.

## 2. Dynamically typed và strongly typed

Javascript là một ngôn ngữ lập trình sử dụng **dynamically typed** (biến kiểu động - một biến có thể sử dụng cho nhiều kiểu dữ liệu khác nhau) tương tự với một số ngôn ngữ thông dịch khác như PHP, Python,... Điều này giúp việc lập trình dễ dàng hơn cho những người mới học lập trình hay trong các dự án nhỏ nơi mà việc tuân theo quy chuẩn không quá khắc khe vì một người có thể bao quát toàn bộ dự án. Nhưng đối với những dự án lớn ta cần phải đặt ra những quy chuẩn cho input/output hay định nghĩa chức năng của từng hàm thì việc chúng ta lập trình với những biến kiểu động như thế này phần lớn sẽ gây ra sự bối rối không hề nhẹ cho những dev bảo trì dự án vì có thể họ không biết được kiểu dữ liệu của input như thế nào để sử dụng các hàm xử lí phù hợp và có thể gây ra bug tiềm năng.

Ví dụ trong Javascript chúng ta có thể sử dụng một biến cho 2 kiểu dữ liệu `string` và `number` như thế này:

```js
let message = "Hello";
message = 2;
```

Đó là một trong những lí do chính mà Typescript với kiểu khai báo **strongly typed** ra đời giúp chúng ta khai báo kiểu dữ liệu cho biến một cách tường minh hạn chế việc sử dụng kiểu dữ liệu tràn lan cho một biến:

```ts
let message: string = "Hello";
message = 2; // <-- Báo lỗi "Type 'number' is not assignable to type 'string'"
```

Nhưng nếu dự án ở công ty mà bạn làm việc không sử dụng Typescript hoặc đơn giản bạn cần một công cụ giúp cho việc comment chi tiết cho các thành phần trong dự án của bạn một cách dễ dàng hơn? Đó là lúc chúng ta cần đến JSDoc!

## 3. Giới thiệu về JSDoc

JSDoc là một loại ngôn ngữ đánh dấu sử dụng comment trong dự án Javascript, là loại documentation comment có chức năng chú thích chi tiết các thành phần của dự án Javascript. Do tính chất mạnh mẽ và phổ biến của nó, JSDoc còn được nhiều công cụ sử dụng để tạo ra documentation cho dự án. Ngoài JSDoc sử dụng cho Javascript ra ta còn có phpDoc (PHP), Javadoc (Java),... Hiện nay JSDoc đã được tích hợp vào các text editor/IDE phổ biến như Sublime Text, VSCode, Intellij,...

Ví dụ ta có một đoạn code Javascript sau đây được viết trong VSCode, khi di chuột vào hàm ta có thể thấy mô tả của hàm:

![](https://images.viblo.asia/93897b9e-1f7c-491a-989c-56ca6c8db312.png)

Ta có thể thấy hàm `printMessage` có thể nhận đầu vào `msg` là bất cứ kiểu dữ liệu gì, nhưng nếu chúng ta muốn cho người khác biết rằng hàm `printMessage` chỉ nhận `msg` là kiểu dữ liệu `string` ta có thể khai báo nó bằng JSDoc. Để viết JSDoc ta cần viết trong cặp dấu `/** */`:

```js
/**
 * Hàm này dùng để in ra tin nhắn
 * @param {string} msg
 */
function printMessage(msg) {
    console.log("Message: " + msg);
}
```

Khi di chuột vào lần hàm lần nữa ta có thể thấy giờ đây hàm đã có khai báo chi tiết hơn:

![](https://images.viblo.asia/1923f4bd-e84f-4558-bdd4-1258c2c30e66.png)

Ngoài sử dụng cho hàm thì JSDoc còn có thể sử dụng cho biến:

```js
/** @type {string} Biến này chứa tin nhắn cần hiển thị */
let helloMessage = "Hello";
```

![](https://images.viblo.asia/06bb7713-df50-414f-a26f-4960aa6e4725.png)

## 4. Type-checking với JSDoc và VSCode

Nhưng trong một số trường hợp chúng ta vẫn có thể mắc một chút sai sót như sử dụng sai kiểu dữ liệu cho hàm như thế này:

```js
let helloMessage = 2;
printMessage(helloMessage);
```

Lúc đó chúng ta cần đến type-checking được tích hợp sẵn vào VSCode để giúp thể hiện lỗi lên text-editor khi chúng ta sử dụng sai kiểu dữ liệu. Để sử dụng nó ta cần thêm `// @ts-check` vào đầu file:

```js
// @ts-check

/**
 * Hàm này dùng để in ra tin nhắn
 * @param {string} msg 
 */
function printMessage(msg) {
    console.log("Message: " + msg);
}

let helloMessage = 2;
printMessage(helloMessage);
```

Giờ đây khi sử dụng sai kiểu dữ liệu cho hàm `printMessage` thì VSCode sẽ báo lỗi trực quan hơn:

![](https://images.viblo.asia/96093f21-21c3-4703-90aa-4b33132317de.png)

Nhưng trong một dự án lớn gồm cả trăm, ngàn file .js thì việc thêm `// @ts-check` vào đầu từng file có vẻ không phải là một biện pháp tốt. Lúc đó ta cần sử dụng đến file `jsconfig.json` được tạo ra ở root-folder (thư mục gốc) của dự án:

![](https://images.viblo.asia/cc31a60c-35f4-40cd-99f0-8cba62a9fcb0.png)

Trong file `jsconfig.json` ta thêm nội dung như sau:

```json
{
    "compilerOptions": {
        "checkJs": true
    }
}
```

Tiếp theo nhấn tổ hợp `Ctrl + Shift + P` để mở hộp command của VSCode. Tìm và mở setting:

![](https://images.viblo.asia/0b4f95f5-ac3c-471b-a5c5-2db2c5caab5b.png)

Trong setting ta tìm `JS/TS > Implicit Project Config: Check JS` và bật chức năng đó lên, giờ đây VSCode có thể đọc và sử dụng các config trong file `jsconfig.json`:

![](https://images.viblo.asia/c8cbbceb-3a92-4cd1-8f3d-1347678736f4.png)

Giờ đây toàn bộ những file .js trong thư mục của dự án đều đã được bật type-checking mà không cần phải thêm `// @ts-check` vào đầu từng file, nếu VSCode chưa kịp update thì ta cần tắt đi và mở lại VSCode:

![](https://images.viblo.asia/b19247cf-382d-4266-b5da-7a949d5f6296.png)

![](https://images.viblo.asia/557176c6-c97e-44b6-ab2e-20c67b3d100d.png)

Nhưng nếu teammate của bạn không dùng VSCode hoặc IDE của họ không hỗ trợ mà vẫn muốn sử dụng type-checking thì phải làm sao? Lúc đó ta cần thay file `jsconfig.json` thành file `tsconfig.json` với nội dung như sau:

```json
{
    "compilerOptions": {
        "allowJs": true,
        "checkJs": true
    }
}
```

Mở command line ở thư mục gốc của dự án và chạy câu lệnh:

```sh
npx tsc --noEmit
```

Ta đã có thể sử dụng chức năng type-checking cho toàn bộ dự án bằng command line:

![](https://images.viblo.asia/2ba2a8b7-c3af-48f5-a94c-505b2df254df.png)

## 5. Các thẻ khác của JSDoc

Ngoài các thẻ `@type` và `@param` đã giới thiệu ở trên ta còn có một số thẻ cơ bản khác:
- Thẻ **@async**: Chi định hàm đó là asynchronous.
- Thẻ **@returns**: Chỉ định giá trị trả về cho function.
- Thẻ **@version**: Chỉ định phiên bản của một danh mục.
- Thẻ **@see**: Tham chiếu tới một liên kết để biết thêm thông tin.

Các bạn có thể tham khảo thêm ở [đây](https://jsdoc.app/index.html#block-tags).

Ví dụ:

```js
/**
 * `fetchData` lấy dữ liệu từ url đưa vào function
 * @async
 * @param {string} url - url để lấy dữ liệu
 * @returns {Promise<string>} dữ liệu được lấy từ url
 * @version 1.1
 * @see https://viblo.asia/
 */
export async function fetchData(url) {
  const result = await fetch(url);

  return result;
}
```

Popup hiển thị khi đưa chuột vào hàm:

![](https://images.viblo.asia/eb6dc576-b5e4-420a-b278-c3c20c2a0f19.png)

## 6. Tổng kết

Với việc sử dụng JSDoc kết hợp VSCode và tsc CLI, ta có thể thấy code dự án Javascript của chúng ta đã chặc chẽ và dễ hiểu hơn rất nhiều, dễ đọc hơn khi gặp lại nó ở những lần sau. Và quan trọng hơn hết là những người khác đọc code của bạn. Họ sẽ hiểu được bạn đang viết cái gì.

---

Tài liệu tham khảo:
- [Comment Code ! Tập làm những điều nhỏ nhặt (viblo.asia)](https://viblo.asia/p/comment-code-tap-lam-nhung-dieu-nho-nhat-aWj53LepK6m)
- [Viết comment trong code: thiện, ác, tà. (techmaster.vn)](https://techmaster.vn/posts/35092/viet-comment-trong-code-thien-ac-ta)
- [Use JSDoc: Getting Started with JSDoc 3](https://jsdoc.app/about-getting-started.html#getting-started)
- [VS Code supports JSDoc-powered type checking | Stefan Judis Web Development](https://www.stefanjudis.com/today-i-learned/vs-code-supports-jsdoc-powered-type-checking/)
- [TypeScript: How to set up TypeScript (typescriptlang.org)](https://www.typescriptlang.org/download)