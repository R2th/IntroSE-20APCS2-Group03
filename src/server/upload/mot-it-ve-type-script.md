TypeScript mở rộng JavaScript bằng cách thêm các type cho việc khai báo.

Có thể ví dụ một cách đơn giản như sau:

```
Javascript:

const myVariable = 1;

TypeScriprts

const myVariable: number = 1;
```

Mối khi khởi tạo hay đinh nghĩa variable cho function, class, bạn phải xác định rõ loại giá trị mà bạn đưa vào.

Bằng cách hiểu JavaScript, TypeScript giúp bạn tiết kiệm thời gian bắt lỗi trước khi bạn chạy code.

Việc định nghĩa rõ loại giá trị (boolean, number, string, ...) làm cho code của bạn chặt chẽ hơn, tránh được những lỗi cơ bản.

Ví dụ

```
let myVariable: boolean;
...
myVariable = 1;
```

Khi biên dịch thì trình biên dịch sẽ báo lỗi ngay chứ chưa cần đến lúc build JS và chạy code.

Bất kỳ trình duyệt nào, bất kỳ hệ điều hành nào, JavaScript chạy ở bất kỳ đâu. Typescript đều là mã nguồn mở.

TypeScript được phát triển và duy trì bởi Microsoft. 

TypeScript được xây dựng giúp tạo nên những app JavaScript lớn, đòi hỏi khả năng control code cao hơn.

## TypeScripts là gì?

### JavaScript và hơn thế nữa

TypeScript là một ngôn ngữ mã nguồn mở được xây dựng dựa trên JavaScript, một trong những công cụ được sử dụng nhiều nhất trên thế giới, bằng cách thêm các định nghĩa kiểu tĩnh (static type).

Các `Types` cung cấp một cách để mô tả hình dạng của một đối tượng, cung cấp tài liệu tốt hơn và cho phép TypeScript xác nhận code của bạn đang hoạt động chính xác.

Đôi khi việc pass method qua nhiều tầng component đôi khi kho kiểm soát đầu vào của method đó tại những component con, ví dụ:

```
const ChildComponent: Rreact.FC<ChildComponentProps> = (props) => {
  ...
  
  return (
    ...
    <SomeOtherComponent passMethod={props.passMethod}>
    ...
  )
}

const ParentCompoennt: React.FC<ParentComponentProps> = (props) => {
  const parentMethod = (someProps) => { ...  // Do something}
  
  return (
    ...
    <ChildComponent passMethod={parentMethod}>
    ...
  )
}
```

Ở ví dụ trên ta thấy, tại `SomeOtherComponent` `passMethod` được truyền qua nhiều tầng và props tryền vào nó đôi khi không đảm bảo tính đúng đắn, việc tạo thêm type cho props này giúp việc giảm thiểu bug có thể phát sinh tại đây, cụ thể là code sẽ thành:

```
interface PassMethodProps = {
  ... // some fields
}

interface SomeOtherComponentProps = {
   ... // some fields
   passMethod: (props: PassMethodProps): void;
}

interface ChildComponentProps = {
   ... // some fields
   passMethod: (props: PassMethodProps): void;
}

const ChildComponent: Rreact.FC<ChildComponentProps> = (props) => {
  ...
  
  return (
    ...
    <SomeOtherComponent passMethod={props.passMethod}>
    ...
  )
}

const ParentCompoennt: React.FC<ParentComponentProps> = (props) => {
  const parentMethod = (someProps) => { ...  // Do something}
  
  return (
    ...
    <ChildComponent passMethod={parentMethod}>
    ...
  )
}

```

Việc đinh nghĩa thêm `PassMethodProps` giúp cho sử dụng `passMethod` một cách đúng đắn hơn, giảm thiểu bug phát sinh tại đây.

Kiểu viết có thể là tùy chọn trong TypeScript, vì suy luận kiểu cho phép bạn có được nhiều sức mạnh mà không cần viết thêm code.


### Kết quả bạn có thể tin tưởng hơn

Tất cả code JavaScript hợp lệ cũng là code TypeScript. Bạn có thể gặp lỗi kiểm tra kiểu, nhưng điều đó sẽ không ngăn bạn chạy JavaScript. 

Mã TypeScript được chuyển thành mã JavaScript thông qua trình biên dịch TypeScript hoặc Babel. Đoạn code JavaScript này đơn giản, sạch sẽ chạy ở mọi nơi JavaScript chạy: Trong trình duyệt, trên Node.JS hoặc trong các ứng dụng của bạn.


### Từng bước áp dụng (cập nhật code)

Việc áp dụng TypeScript không phải là một việc quá khó, bạn có thể bắt đầu bằng cách chú thích JavaScript hiện có với JSDoc, sau đó chuyển một vài tệp để TypeScript kiểm tra và theo thời gian chuẩn bị cho cơ sở code của bạn để chuyển đổi hoàn toàn.

Việc chuyển đổi code js sang type script có thể cập nhật dấn dần dễ dàng, ví du trong thư mục shared của bạn có một vài component dạng jsx, ta có thể chuyển đổi từng component đó sang tsx.

```
src/shared/Header.jsx => src/shared/Header.tsx
src/shared/Footer.jsx => src/shared/Footer.tsx
...
```

Việc chia task và update dần code cũng làm như vậy.

Suy luận loại của TypeScript có nghĩa là bạn không cần phải chú thích code của mình cho đến khi bạn muốn an toàn hơn.

Mỗi type được định nghĩa đã làm cho code của bạn rõ ràng hơn rất nhều

```
const loading: boolean = !Boolean(someObject.id);

interface SomeObject {
  id: number;
  loading: boolean;
  hasChildren: boolean;
  ...
}
```

Ở đây việc đặt tên biên cùng với định nghĩa type đã giải thích logic code của bạn rõ ràng hơn rất nhiều.

Nội dung được lấy từ các nguồn
- https://www.typescriptlang.org/
- https://vi.wikipedia.org/wiki/TypeScript

Cảm ơn và hi vọng bài viết có ích cho công việc của bạn.