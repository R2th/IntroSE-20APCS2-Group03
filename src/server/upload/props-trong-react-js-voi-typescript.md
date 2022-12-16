# Giới thiệu
Hướng dẫn này sẽ cung cấp cho bạn cú pháp bạn cần để xác định đúng các **props** cần nhập vào trong **components** của bạn, so sánh và đối chiếu xác định các **props** dưới dạng `class` hoặc `interface`. Và cung cấp cho bạn một mẹo hữu ích khi bạn cần cung cấp giá trị mặc định cho các **props** tùy chọn.
# Bạn nên sử dụng từ khóa nào?
**Typescript** mang đến một số tính năng tuyệt vời giúp mở rộng **JavaScript** theo những cách mạnh mẽ, bao gồm khả năng xác định cấu trúc của một đối tượng theo nhiều cách khác nhau. Trong quá trình tìm kiếm cách tốt nhất để xác định các đối tượng, bạn chắc chắn sẽ gặp phải nhiều tùy chọn, `class` và `interface` là phổ biến nhất. Nếu bạn xem [tài liệu của Typescript](https://www.typescriptlang.org/docs/), bạn có thể tự nghiên cứu sự khác biệt giữa các trình định nghĩa đối tượng phổ biến này. Hướng dẫn này sẽ cung cấp cho bạn phiên bản ngắn, dễ hiểu.

`class` dành cho khi bạn muốn xác định nhiều hơn cấu trúc của một đối tượng:
```typescript
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
let greeter = new Greeter('world')
```

`Interface`dành cho khi bạn muốn thực thi các `structural contracts` (tức là những gì bạn muốn được truyền vào hoặc những gì bạn muốn được trả lại):
```typescript
interface FullName{
    firstName: string;
    lastName: number;
}

const fullNameObj:FullName = {
    firstName: "Jon",
    lastName: "Snow"
}
```

Vì vậy, bạn nên sử dụng cái nào để xác định một prop? Nếu bạn nói `interface`, bạn sẽ đúng.
# Định nghĩa Props
Cho dù bạn mới bắt đầu sử dụng **Typescript** với **React** hay là một người kỳ cựu đang tìm cách thêm nhiều thành phần chức năng hơn vào codebase của mình bằng cách giới thiệu hook, điều quan trọng là phải biết các cách khác nhau để xác định các **props**.
## Đơn giản nhưng hiệu quả
Một trong những cách bạn có thể xác định **props** chỉ đơn giản là xác định chúng trong danh sách tham số của một hàm như đã trình bày ở trên.

Ví dụ: 
```typescript
interface FullName {
    firstName: string;
    lastName: string;
}
function FunctionalComponent(props:FullName){
    // props.firstName
    // props.lastName
}
```
## Cách linh hoạt hơn
Trong hầu hết các trường hợp, cách đơn giản là tốt. Nhưng điều gì sẽ xảy ra nếu bạn muốn xác định **props** mặc định nếu chúng không được chuyển vào? Hay bạn chỉ muốn có cú pháp rõ ràng hơn trong **component** của mình?

Đối với những trường hợp đó, bạn có thể tận dụng một tính năng cú pháp JavaScript được gọi là **destructuring**. Điều này cho phép linh hoạt hơn trong cách bạn có thể xác định các **props** của mình.

```typescript
// Using the same FullName interface from the last example
function FunctionalComponent({firstName, lastName}:FullName){
    // firstName
   // lastName
}
```
Điều gì xảy ra nếu bạn muốn thêm middle name? Không phải ai cũng có middle name, vì vậy bạn muốn đặt tên này là tùy chọn.**Destructuring** có thể cung cấp một giải pháp rõ ràng cho vấn đề đó.

```typescript
interface OptionalMiddleName {
    firstName: string;
    middleName?: string;
    lastName: string;
}
function Component({firstName, middleName = "N/A", lastName}:OptionalMiddleName){
    // If middleName wasn't passed in, value will be "N/A"
}
```

Bây giờ bất cứ khi nào bạn cần tham chiếu đến middleName, nếu nó không tồn tại, bạn sẽ có một "N / A" mặc định. 

Hoàn thành cùng một chức năng bằng cách sử dụng cú pháp **non-destructuring** sẽ trông giống như sau:
```typescript
// using the same OptionalMiddleName interface from above
function Component(props:OptionalMiddleName){
    if(!props.middleName){
        props.middleName = "N/A"
    }
}
```

Không tồi, nhưng cũng không thực sự là tốt :confused:. 

Tuy nhiên, như mọi khi, tốt hay không nằm trong mắt người xem :grinning: (thỉnh thoảng).

# Sử dụng React.FC
Một cách khác để xác định `props` là **import** và sử dụng loại thành phần chức năng của **React**, viết tắt là **FC**.

Sử dụng **React.FC** thì dài dòng hơn, nhưng có một số lợi ích bổ sung:

* Rõ ràng với kiểu trả về của nó.
* Cung cấp kiểm tra kiểu và **autocomplete** cho các thuộc tính tĩnh (tức là `displayName`, `defaultProps`).
* Cung cấp một định nghĩa ngầm về `children`:

```typescript
    const ReactFCComponent: React.FC<{title:string}> = ({children, title}) => {
        return <div title={title}>{children}</div>
    }
```

Bạn có thể đọc thêm về các lợi ích của **React.FC** [tại đây](https://github.com/typescript-cheatsheets/react/blob/main/README.md#function-components).

Bạn nên sử dụng cái nào? Cộng đồng **React** thường khó chịu khi sử dụng **React.FC** do tính chi tiết của nó và vì những lợi ích của nó không đáng để bạn gặp rắc rối và khó đọc.

# Kết luận
Hy vọng rằng hướng dẫn đơn giản này cung cấp cho bạn một tài liệu tham khảo tốt để bạn làm việc. Nói chung, tôi muốn **destructuring**  tất cả `props` của tôi khi nhập `component`, vì nó cung cấp một cú pháp rõ ràng và hiệu quả để làm việc. Chúc bạn may mắn trong các chuyến hành trình với **Typecript React!**

Nguồn: https://www.pluralsight.com/guides/defining-props-in-react-function-component-with-typescript