Chào mọi người, chưa gì đã đến ngày 20 rồi, nên lại phải viết bài nè hi, đùa tí chứ viết bài cũng thú vị lắm ạ :D, hôm nay mình sẽ chia sẻ với các bạn về cách để sử dụng TS trong **function**, có thể nói đây là một bài thực hành thay vì lý thuyết như ở bài trước. À bạn nào chưa đọc bài trước về **4 Tính năng rất hay từ TypeScript** thì các bạn tham khảo để hiểu thêm, các bạn xem ở [ĐÂY](https://viblo.asia/p/4-tinh-nang-rat-hay-tu-typescript-vyDZOMn95wj) ha.

Đối với các bạn mới tìm hiểu về TS các bạn có hay gặp vấn đề này giống mình hông nhỉ? Đó là lúc mói học TS cảm thấy khó nhai lắm, học xong lý thuyết rồi, xong vào code thử thì hông biết code từ đâu. Nhất là hông biết phải đặt type cho **biến** như thế nào, rồi lỗi từa lưa làm mình cũng nản thiệt, nhưng mà được cái **Coder** như tụi mình thì có quyết tâm lắm nên thôi cứ chơi tới rồi cũng biết hết thôi!!!

Rồi zô nào!

## Function declarations
Bên dưới mình khai báo một hàm đơn giản và đặt **type** cho 2 tham số **a và b** là *number*.

```typescript
function sum(a: number, b: number) {
  return a + b
}
```

Tiếp theo, sử dụng lại đoạn code trên bạn có thể thấy hàm **return**, nên giờ mình sẽ ràng buộc **type** trả về của hàm.

```typescript
function sum(a: number, b: number): number {
  return a + b
}
```

Cũng dể phải hông ạ, các bạn vào dự án hoặc cứ code luyện tập là quen thôi, mình thì hay có suy nghĩ như vầy, khi mà mình thấy khó thì chẳng qua là mình chưa quen với nó thôi chứ quen rồi thì làm gì cũng được cũng dể thôi. Giống như việc cua gái vậy mới đầu khó sau này thì dể cua lắm kkkk

## Funtion Expression
**Funtion Expression** hay còn gọi là *biểu thức hàm* nó được khai báo bằng *const hoặc let*

Những cách viết này cũng dể hiểu giống như **Function declarations** nhưng bạn chỉ cần viết lại bằng **Funtion Expression**

```typescript
// named function
const sum = function sum(a: number, b: number): number {
  return a + b
}

// annonymous function
const sum = function (a: number, b: number): number {
  return a + b
}

// arrow function
const sum = (a: number, b: number): number => {
  return a + b
}

// implicit return
const sum = (a: number, b: number): number => a + b

const sum = (a: number, b: number): {result: number} => ({result: a + b})
```

Bạn cũng có một cách viết như này, nhưng cách viết này mình cảm thấy hơi khó đọc.
```typescript
const sum: (a: number, b: number) => number = (a, b) => a + b
```

Để dể đọc hơn bạn có thể dùng *Type hoặc Interface*
```typescript
type MathFn = {
  (a: number, b: number): number
}
const sum: MathFn = (a, b) => a + b

type MathFn = {
  (a: number, b: number): number
  operator: string
}
const sum: MathFn = (a, b) => a + b
sum.operator = '+'

interface MathFn {
  (a: number, b: number): number
  operator: string
}
const sum: MathFn = (a, b) => a + b
sum.operator = '+'
```

Rồi bạn đã nghe đến *declare function và declare namespace* chưa nhỉ, bạn cũng có thể thực hiện với nó đấy. Nó sẽ tạo cho bạn một **name và type** và sử dụng nó bằng cách sử dụng từ khóa **typeof** để chỉ định type cho function. Bạn sẽ ít sử dụng 2 thằng này vì nó chỉ hay sử dụng ở các thư viện thôi.

Nếu chọn để sử dụng thì mình sẽ chọn *Type và Interface* thôi, sử dụng *Type* cho chính nó, còn *Interface* khi  bạn muốn kế thừa.

```typescript
declare function MathFn(a: number, b: number): number
declare namespace MathFn {
  let operator: '+'
}
const sum: typeof MathFn = (a, b) => a + b
sum.operator = '+'
```

## Optional/Default params
### Optional parameter
Để ý đoạn code bên dưới, bạn có để ý tham số **b?: number**, nó đang ngầm hiểu rằng tham số *b* có thể được truyền vào hoặc không và nó có *type* là *number hoặc undefined*.

```typescript
const sum = (a: number, b?: number): number => a + (b ?? 0)
```

Tương tự như khi bạn sử dụng **Unions**

```typescript
const sum = (a: number, b: number | undefind): number => a + (b ?? 0)
```

### Default params
Và đây là khi bạn đặt tham số mặc định.

```typescript
const sum = (a: number, b: number = 0): number => a + b
sum(1) // results in 1
sum(2, undefined) // results in 2
```

Với **Type**

```typescript
type MathFn = (a: number | undefined, b: number) => number
const sum: MathFn = (a = 0, b) => a + b
```

### Rest params
Rest params là một tính năng rất hay của **JS** nó giúp bạn nhóm các giá trị vào trong một Array

Thực hiện nó như sau:

```typescript
const sum = (a: number = 0, ...rest: Array<number>): number => {
  return rest.reduce((acc, n) => acc + n, a)
}
```

Có nghĩa rằng *...rest* là một array và các phần tử trong nó đều có **type = number**

### Tổng kết
Trên đây là những cách mà mình đã liệt kê và hy vọng sẽ giúp các bạn mới tìm hiểu về TS sẽ rõ hơn và sẽ có thêm kiến thức bổ ích, cảm ơn các bạn đã xem bài viết <3