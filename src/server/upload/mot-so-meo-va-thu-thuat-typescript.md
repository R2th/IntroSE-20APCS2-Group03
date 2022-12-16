## Tip 1. TypeScript & DOM

Khi bạn bắt đầu sử dụng Typescript, bạn sẽ nhận thấy nó khá thông minh khi làm việc với môi trường trình duyệt. Giả sử, muốn tìm phần tử `<input>` trên trang:

```
const textEl = document.querySelector('inpot');
console.log(textEl.value); 
// 🛑 Property 'value' does not exist on type 'Element'.
```

TypeScript thấy lỗi, bởi vì có một lỗi syntax trong phương thức `querySelector`, thay vì "input" tôi đang tìm kiếm một "inpot".

Làm thế nào nó biết điều đó? Câu trả lời nằm trong tệp `lib.dom.d.ts`, một phần của thư viện TypeScript và, về cơ bản, nó mô tả mọi thứ (đối tượng, hàm, sự kiện)
xảy ra trên trình duyệt. Một phần của định nghĩa này là giao diện được sử dụng trong cách gọi của phương thức `querySelector` và ánh xạ các chuỗi ký tự cụ thể (như 
"div," "table" hoặc "input") cho các loại phần thử HTML tương ứng:

```
interface HTMLElementTagNameMap {
    "a": HTMLAnchorElement;
    "abbr": HTMLElement;
    "address": HTMLElement;
    "applet": HTMLAppletElement;
    "area": HTMLAreaElement;
    "article": HTMLElement;
    /* ... */
    "input": HTMLInputElement;
    /* ... */
}
```

Nó không phải là một giải pháp hoàn hảo bởi vì nó chỉ làm việc với các `selectors` cơ bản, nhưng vẫn tốt hơn là không có gì, đúng ko nào.

Một ví dụ khác về hành vi `TypeScript` "thông minh" này là khi bạn làm việc với các sự kiện của trình duyệt:

```
textEl.addEventListener('click', e => {
    console.log(e.clientX);
});
```

`.clientX` trong ví dụ trên không phải là một thuộc tính có sẵn trên bất kỳ sự kiện nào - nó chỉ có sẵn trên `MouseEvent` cụ thể. Và TypeScript đã tìm ra loại sự kiện dựa trên "click" đó là đối số đầu tiên trong phương thức `addEventListener`.

## Tip 2. Expect Generics

Vì vậy, thay vì chọn một element, bạn có thể sử dụng bất kỳ điều gì khác:

`document.querySelector('input.action');`

thì `HTMLElementtagNameMap` sẽ không hữu ích, và TypeScipt sẽ chỉ trả về một kiểu Element cơ bản.

Như với `querySelector`, thường là trường hợp một hàm có thể trả về các cấu trúc khác nhau và không thể cho `TypeScript` xác định sẽ là cái nào. Trong trường hợp đó, bạn có thể mong đợi khá nhiều, hàm đó nói chung cũng là một `generic` và bạn có thể cung cấp kiểu trả về đó trong một cú pháp chung thuận tiện:

```
textEl = document.querySelector<HTMLInputElement>('input.action');
console.log(textEl.value);
// 👍 'value' is available because we've instructed TS
// about the type the 'querySelector' function works with.
```

## Tip 3. “Did we really find it?”	

Phương thức `document.querySelector(...)` không phải lúc nào cũng trả về cho chúng ta một đối tượng. Phần tử với bộ tìm kiếm đó có thể không nằm trên trang - và thay vì trả về một đối tượng thì hàm đó sẽ trả về `null`. Và khi bạn cố gắng truy cập vào nó, thuộc tính .value có thể không phải là tất cả những gì được lưu như mặc định.

Theo mặc định, trình kiểm tra xem xét việc việc gán `null` và `undefined` cho từng `type` khác nhau. Bạn có thể làm điều này an toàn hơn và hạn chế hành vi này bằng cách thêm kiểm tra `null` trong `tsconfig.json`:

```
{
    "compilerOptions": {
        "strictNullChecks": true
    }
}
```

Với thiết lập đó, `TypeScript` bây giờ sẽ `complain` nếu bạn cố gắng truy cập thuộc tính trên một đối tượng có thể là `null` và bạn sẽ phải "reassure" nó về sự tồn tại của đối tượng, ví dụ: bằng cách gói phần đó với điều kiện `if (textE1) {...}`

Khác với `querySelector`, trường hợp phổ biến khác cho điều này là phương thức `Array.find` - kết quả trả về có thể là `undefinded`.

Không phải điều gì bạn muốn tìm kiếm nó cũng sẽ có nhé!!!.

## Tip 4. “I’m telling you, TS, it is there!”

Như chúng ta đã thiết lập, với việc kiểm tra chặt chẽ, TypeScript sẽ có nhiều hoài nghi hơn về giá trị của chúng ta. Mặc khác, đôi khi bạn chỉ biết từ bên ngoài có nghĩa là giá trị sẽ được thiết lập. Trong những trường hợp ngoại lệ như vậy, bạn có thể sử dụng "post-fix expression operator" (hay nói cách dễ hiệu là dấu !):

```
const textEl = document.querySelector('input');
console.log(textEl!.value); 
// 👍 with "!" we assure TypeScript
// that 'textEl' is not null/undefined
```

## Tip 5. When migrating to TS…

Thông thường, khi bạn có một codebase cũ mà bạn muốn chuyển sang TypeScript, một trong những điều mất khá nhiều time là làm cho code cũ tuân thủ các quy tắc TSLint của bạn. Những gì bạn có thể làm là chỉnh sửa tất cả các tệp bằng cách thêm

`// tslint:disable`

trong dòng đầu tiên của mỗi dòng, để TSLint không kiểm tra chúng. Sau đó, chỉ khi một developer làm việc trên một tệp cụ thể, anh ta sẽ bắt đầu bằng cách xóa dòng này và sửa tất cả các lỗi `linting` chỉ trong tệp đó. Bằng cách này, chúng ta không cần làm một cuộc cách mạng mà chỉ là một sự cải tiến - và các `codebase` dần dần an toàn và được cải thiện.

*Để thêm các types với vào mã JS cũ, đây chắc là điều mà bạn không thường xuyên làm. Suy luận kiểu của TypeScript sẽ xử lý nó và chỉ khi bạn có một số mã khó, ví dụ: chỉ định loại giá trị khác nhau cho cùng một biến thì bạn có thể gặp vấn đề. Nếu tái cấu trúc mà không phải là một vấn đề tầm thường bạn có thể giải quyết bằng cách sử dụng `any`*:

```
let mything = 2;
mything = 'hi';
// 🛑 Type '"hi"' is not assignable to type 'number'
mything = 'hi' as any;
// 👍 if you say "any", TypeScript says ¯\_(ツ)_/¯
```

Nhưng thực sự, nó như là một phương sách cuối cùng. Chúng tôi không khuyến khích việc dùng `any` trong TypeScript.

## Tip 6. More type restrictions

Đôi khi TypeScript không thể suy ra type. Trường hợp phổ biến nhất là tham số hàm:

```
function fn(param) {
    console.log(param);
}
```

Trong nội bộ nó cần được gán một số type cho params ở đây. Vì muốn giới hạn số lượng `any` đến mức tối thiểu tuyệt đối, nên thường sẽ hạn chế hành vi đó bằng cài đặt `tsconfig.json`:

```
{
    "compilerOptions": {
        "noImplicitAny": true
    }
}
```

Thật không may, chúng ta không thể đặt loại dây an toàn đó (yêu cầu nhập rõ ràng) trên function trả về type. Vì vậy, nếu thay vào đó chức năng fn(param): string { Tôi sẽ quên kiểu đó function fn(param) {), TypeScript sẽ không theo dõi những gì tôi trả về, hoặc thậm chí nếu tôi trả về bất cứ thứ gì từ hàm đó. Chính xác hơn: nó sẽ phỏng đoán giá trị trả về từ bất kỳ giá trị nào bạn đã trả lại hoặc không trả lại.

Rất may mắn đó là nơi `TSLint` trợ giúp. Với quy tắc `typedef` bạn có thể thực tạo ra hình thức trả về cho hàm:

```
{
    "rules": {
        "typedef": [
            true,
            "call-signature"
        ]
    }
}
```


## Tip 7. Type Guards

Khi bạn có một giá trị có thể có nhiều type, bạn phải tính đến thuật toán đó để phân biệt từng loại với nhau. Điều về `TypeScript` là nó hiểu được logic này.

```
type BookId = number | string;
function returnFormatterId(id: BookId) {
    return id.toUpperCase();
    // 🛑 'toUpperCase' does not exist on type 'number'.
}
function returnFormatterId(id: BookId) {
    if (typeof id === 'string') {
        // we've made sure it's a string:
        return id.toUpperCase(); // so it's 👍
    }
    // 👍 TS also understands that it
    // has to be a number here:
    return id.toFixed(2)
}
```

## Tip 8. Once more about the generics

Giả sử ta có cấu trúc khá chung chung này:

```
interface Bookmark {
    id: string;
}
class BookmarksService {
    items: Bookmark[] = [];
}
```

Bạn muốn sử dụng nó trong các ứng dụng khác nhau, ví dụ: để lưu trữ Books hoặc Movies.

Trong ứng dụng như vậy, bạn có thể làm một cái gì đó như:

```
interface Movie {
    id: string;
    name: string;
}
class SearchPageComponent {
    movie: Movie;
    constructor(private bs: BookmarksService) {}
    getFirstMovie() {
        // 🛑 types are not assignable
        this.movie = this.bs.items[0];
        // 👍 so you have to manually assert type:
        this.movie = this.bs.items[0] as Movie;
    }
    getSecondMovie() {
        this.movie = this.bs.items[1] as Movie;
    }
}
```

Kiểu xác nhận này có thể cần nhiều lần trong lớp đó.

Những gì chúng ta có thể làm thay vào đó là định nghĩa lớp `BookmarksService` như là một thể loại:

```
class BookmarksService<T> {
    items: T[] = [];
}
```

Vâng, bây giờ nó đã là tổng quát, mặc dù...Chúng tôi muốn đảm bảo rằng các loại lớp này sẽ làm việc với sẽ thực hiện giao diện `Bookmark` (vd thuộc tính id có type là string).
Đây là một sự cải tiến:

```
class BookmarksService<T extends Bookmark> {
    items: T[] = [];
}
```

Bây giờ, trong `SearchPageComponent` của chúng ta, chỉ cần chỉ định type một lần:

```
class SearchPageComponent {
    movie: Movie;
    constructor(private bs: BookmarksService<Movie>) {}
    getFirstMovie() {
        this.movie = this.bs.items[0]; // 👍
    }
    getSecondMovie() {
        this.movie = this.bs.items[1]; // 👍
    }
}
```

Có một cải tiến bổ sung cho lớp chung đó có thể hữu ích - nếu bạn đang sử dụng nó ở những nơi khác trong khả năng chung đó và không muốn viết `BookmarsService<Bookmark>` là những trường hợp như vậy.

Bạn có thể cung cấp type mặc định theo định nghĩa chung:

```
class BookmarksService<T extends Bookmark = Bookmark> {
    items: T[] = [];
}
const bs = new BookmarksService();
// I don't have to provide the type for the generic now
// - in that case 'bs' will be of that default type 'Bookmark'
```

## Tip 9. Create Interfaces from API response

Nếu bạn response trả về của 1 API phức tạp, nhiều object lồng nhau, thật là tẻ nhạt và thủ công khi bạn chỉnh sửa lại format của chúng bằng tay. Việc này hãy để cho máy móc thực hiện nhé:

Có một số tùy chọn bạn có thể lựa chọn:

- http://www.json2ts.com

- http://www.jsontots.com

- https://app.quicktype.io/.


Tài liệu tham khảo: https://medium.com/@tomsu/typescript-tips-tricks-c8fdef998d50