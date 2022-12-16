Nhiều bạn khi chưa quen với `typescript` sẽ thường lạm dụng `any` thay vì tạo hẳn type riêng cho từng biến, tuy việc này sẽ giảm thời gian code trong giai đoạn phát triển nhưng về lâu dài, mình cá là các bạn sẽ không muốn maintain một đoạn code chỉ toàn có type là `any` đâu :smiley:. vì vậy, trong bài viết này mình sẽ chia sẻ với các bạn một số cách để các bạn có thể loại bỏ `any` trong source code nhé.

## 1. Union type
Nếu như bạn muốn một biến có thể có nhiều type thì bạn có thể tạo một union type, union type cho phép chúng ta định nghĩa nhiều type cho một biến.

Thay vì sử dụng `any` như ví dụ sau:
```ts
function func(arg: any) {
    if(arg instanceof Array) {
        // xử lý array
        return;
    }
    
    // xử lý string
}
```

Các bạn hãy sử dụng `union type` để thay thế `any` nhé.

```ts
// người dùng có thể chuyển string hoặc một mảng các string vào trong function
// func
function func(arg: string | string[]) {
    if(arg instanceof Array) {
        // xử lý array
        return;
    }
    
    // xử lý string
}

func('string'); // => ok
func(['string1', 'string2', 'string3']); // => ok
func(1); // => lỗi
```

## 2. Record
Không biết các bạn đã bao giờ gặp phải trường hợp mà các bạn phải tạo type cho một object mà tất cả property của nó đều phải có giá trị là `string`, nhưng object đó lại không có property cụ thể chưa,nhưng mình thì lại gặp cực kỳ nhiều, trong trường hợp này, các bạn có thể dùng `record`để xử lý.

Mình cá là sẽ không nhiều bạn biết cách áp dùng `record` để giải quyết vấn đề này đâu :wink:.

`Record` sẽ nhận vào 2 tham số, tham số thứ nhất sẽ là type của tên của các property của một object và tham số thứ 2 sẽ là type cho tất cả các property của object đó. Ví dụ:

```ts
// property của obj phải có giá trị là 'prop1' hoặc 'prop2' hoặc 'prop3'
// và tất cả giá trị của property của obj phải là string
//
// vì javascript sẽ chuyển tên của các property thành string(ngoại trừ Symbol)
// nên việc đặt type cho tên của property là string sẽ giúp chúng ta định nghĩa
// được type cho giá trị của các property của một object mà không cần định nghĩa 
// tên cho từng property một.
let obj: Record<string, string>

obj = {
    prop1: '1',
    prop2: '2',
    prop3: '3'
}

obj = {
    prop1: '1',
    prop2: '2',
    prop3: 3 // => lỗi
}
```

`Record` cũng có thể được sử dụng trong trường hợp bạn đã biết trước các property của object, nhưng tất cả giá trị của object phải là có cùng một kiểu dữ liệu.

Đa số mọi người sẽ chọn cách này:

```ts
interface Test {
    prop1: number,
    prop2: number,
    prop3: number
}

const obj: Test = {
    prop1: 1,
    prop2: 2,
    prop3: 3
};
```

Nhưng các bạn có thể dùng `Record` để rút gọn đoạn code trên thành thế này:

```ts
type Test = Record<'prop1' | 'prop2' | 'prop3', number>;
let obj: Test;

obj = {
    prop1: 1,
    prop2: 2,
    prop3: 3
}
```

Các bạn cũng có thể kết hợp `record` với một `interface` hoặc `type` khác để tạo ra một type phức tạp hơn. Các bạn hãy xem ví dụ dưới đây nhé:

```ts
interface ExamInfo {
    status: 'in_progress' | 'done';
    point: number | null;
}

const examInfo: Record<string, ExamInfo> = {
    id_1: { status: 'in_progress', point: null},
    id_2: { status: 'done', point: 10},
    id_3: { status: 'done', point: 9},
}
```

## 3. Generic
Một ví dụ tiêu biểu nữa của việc sử dụng `any` đó là khi bạn phải tạo một function có đầu vào là một mảng có giá trị bất kỳ và sau function đó sẽ phải trả về một object chứa index và type của các trị bên trong mảng đầu vào.

Đây chính là một function có chức năng như trên, nhưng mình sẽ định nghĩa type cho các giá trị của mảng đầu vào là `any`.

```ts
const arrToObj = (arr: any[]): {index: number, value: any}[] => {
    return arr.map((value: any, index: number) => ({ index, value }));
}
```

Như các bạn có thể thấy, chúng ta không thể biết được type của các giá trị của mảng đầu vào, điều này sẽ rất nguy hiểm vì người dùng sẽ không biết được chính xác giá trị của property `value` mà function này trả về là gì.

Bây giờ mình sẽ viết lại function ở trên, nhưng thay vì sử dụng `any`, mình sẽ dùng `generic`.

Nếu các bạn chưa biết thì `generic` sẽ giúp các bạn chứa type của một giá trị trong một biến khi chúng ta khởi tạo một function và chúng ta có thể tái sử dụng lại biến này như một type cho các giá trị khác.

```ts
// cho phép người dùng chuyền type vào trong function, sau đó được chuyền vào,
// type này sẽ được chứa trong biến T và ta có thể tái sử dụng lại biến này cho
// các giá trị khác
const arrToObj = <T>(arr: T[]): {index: number, value: T}[] => {
    return arr.map((value: T, index: number) => ({ index, value }));
}

const result = arrToObj<string>(['arr1', 'arr2', 'arr3']);

type Test = Record<string, string>;
const result = arrToObj<Test>(['arr1', 'arr2', 'arr3']); // => lỗi
``` 

## Lời kết
Mình cũng đã từng cứ thấy chỗ nào có thể dùng `any` là phang, và cuối cùng là phải đối mặt với những cái kết ngập hành. Nên nếu bạn là người yêu màu hồng và không thích mùi hành những vẫn đang sử dụng `any` trong dự án của mình thì hãy dừng sử dụng nó ngay đi, bạn sẽ sớm nhận thấy đây là một trong những lời khuyên có tâm nhất và hữu ích nhất mà bạn từng gặp đấy. Cheers !