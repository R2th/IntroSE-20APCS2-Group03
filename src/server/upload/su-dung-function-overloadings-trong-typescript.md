Ví dụ chúng ta có 2 hàm sau:<br>
```TypeScript
function addNumbers(a: number, b: number): number {
    return a + b;
}

function addStrings(a: string, b: string): string {
    return a + b;
}
```
Trong ví dụ trên:<br>
- Hàm addNumbers() trả về tổng của hai số.
- Hàm addStrings() trả về nối của hai chuỗi.

Có thể sử dụng một kiểu liên hợp để xác định một loạt các kiểu cho các tham số và kết quả của hàm:<br>
```TypeScript
function add(a: number | string, b: number | string): number | string {
    if (typeof a === 'number' && typeof b === 'number')
        return a + b;

    if (typeof a === 'string' && typeof b === 'string')
        return a + b;
}
```
Tuy nhiên, loại kết hợp không thể hiện chính xác mối quan hệ giữa các loại tham số và kết quả.<br>
Hàm add () cho trình biên dịch biết rằng nó sẽ chấp nhận số hoặc chuỗi và trả về một số hoặc chuỗi.<br>
Nó không thể mô tả rằng hàm trả về một số khi các tham số là số và trả về một chuỗi nếu các tham số là chuỗi.<br>
Để mô tả tốt hơn các mối quan hệ giữa các kiểu được sử dụng bởi một hàm, TypeScript hỗ trợ **function overloadings**(nạp chồng hàm). Ví dụ:<br>
```TypeScript
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: any, b: any): any {
   return a + b;
}
```
Bây giờ, khi bạn gọi hàm add (), trình soạn thảo code sẽ gợi ý rằng có một hàm overload  có sẵn như thể hiện trong hình sau:<br>

![](https://images.viblo.asia/1be05bce-2b73-40df-ba80-a9d1df58493f.png)
![](https://images.viblo.asia/26208f45-8afc-4812-9cda-4d119cc59481.png)

### Function overloading with optional parameters
Khi bạn overload một hàm, số lượng tham số bắt buộc phải giống nhau. Nếu một overload  có nhiều tham số hơn tham số khác, bạn phải đặt các tham số bổ sung là optional(tùy chọn). Ví dụ:<br>
```TypeScript
function sum(a: number, b: number): number;
function sum(a: number, b: number, c: number): number;
function sum(a: number, b: number, c?: number): number {
    if (c) return a + b + c;
    return a + b;
}
```
Hàm sum () chấp nhận hai hoặc ba số. Tham số thứ ba là tùy chọn. Nếu bạn không làm tùy chọn, bạn sẽ gặp lỗi.<br>
### Method overloading
Khi một hàm là thuộc tính của một lớp, nó được gọi là một phương thức. TypeScript cũng hỗ trợ phương thức overloading. Ví dụ:<br>
```TypeScript
class Counter {
    private current: number = 0;
    count(): number;
    count(target: number): number[];
    count(target?: number): number | number[] {
        if (target) {
            let values = [];
            for (let start = this.current; start <= target; start++) {
                values.push(start);
            }
            this.current = target;
            return values;
        }
        return ++this.current;
    }
}
```
Hàm count () có thể trả về một số hoặc một mảng tùy thuộc vào số lượng đối số mà bạn truyền vào nó:<br>
```TypeScript
let counter = new Counter();

console.log(counter.count()); // return a number
console.log(counter.count(20)); // return an array
```
Output:<br>
```TypeScript
1
[
   1,  2,  3,  4,  5,  6,  7,
   8,  9, 10, 11, 12, 13, 14,
  15, 16, 17, 18, 19, 20     
]
```

Tóm tắt:<br>
Function overloadings  cho phép bạn mô tả mối quan hệ giữa các kiểu tham số và kết quả của một hàm.