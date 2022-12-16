### Giới thiệu về Generics trong TypeScript
Sử dụng generics trong TypeScript cho phép bạn viết các hàm, class, interfaces có thể tái sử dụng và tổng quát hóa.<br>
Ví dụ, bạn cần tạo một hàm, cái trả về ngẫu nhiên một phần tử trong một mảng các **numbers**.<br>
```TypeScript
function getRandomNumberElement(items: number[]): number {
    let randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}
let numbers = [1, 5, 7, 4, 2, 9];
console.log(getRandomNumberElement(numbers));
```

Giả sử, bạn cần lấy một phần tử ngẫu nhiên của một mảng của strings. Lần này, bạn có thể nghĩ ra một chức năng mới như dưới:<br>
```TypeScript
function getRandomStringElement(items: string[]): string {
    let randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}

let colors = ['red', 'green', 'blue'];
console.log(getRandomStringElement(colors));
```
Sau đó, bạn lại cần lấy một phần tử ngẫu nhiên trong một mảng đối tượng. Việc tạo một hàm mới mỗi khi bạn muốn lấy một phần tử ngẫu nhiên từ một kiểu mảng mới là không thể mở rộng.

### Sử dụng kiểu any
Một giải pháp cho vấn đề ở trên là set loại của mảng các đối số là kiểu **any[]**.  Bằng cách này, bạn chỉ cần viết một hàm hoạt động với mảng thuộc bất kỳ kiểu dữ liệu nào.<br>
```TypeScript
function getRandomAnyElement(items: any[]): any {
    let randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}
```

Bầy giờ hàm **getRandomAnyElement()** có thể làm việc với một mảng của bất kỳ loại nào như numbers, strings, objects, etc..<br>
```TypeScript
let numbers = [1, 5, 7, 4, 2, 9];
let colors = ['red', 'green', 'blue'];

console.log(getRandomAnyElement(numbers));
console.log(getRandomAnyElement(colors));
```
Giải pháp này hoạt động tốt, tuy nhiên, nó có một lỗ hổng.<br>
Nó không cho phép bạn thực thi kiểu của phần tử trả về. Nói cách khác, nó không an toàn về kiểu.<br>
Một giải pháp tốt hơn để tránh trùng lặp mã trong khi vẫn bảo toàn kiểu là sử dụng **generic**.<br>

### Sử dụng generics
Ví dụ bên dưới hiển thị một hàm generic, cái trả về một phần tử ngẫu nhiên từ một mảng với loại **T** : <br>
```TypeScript
function getRandomElement<T>(items: T[]): T {
    let randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}
```
Hàm này sử dụng biến **T**. Biến **T** cho phép bạn nắm bắt kiểu được cung cấp tại thời điểm gọi hàm. Ngoài ra, hàm sử dụng biến kiểu T làm kiểu trả về của nó.<br>
Hàm **getRandomElement()** này là **generic** vì nó có thể hoạt động với bất kỳ kiểu dữ liệu nào bao gồm string, number, objects,…<br>
Theo quy ước, chúng ta sử dụng chữ **T** làm kiểu biến, tuy nhiên, bạn có thể thoải mái sử dụng các chữ cái khác như A, B C,…

### Gọi hàm generic
Sau đây là cách sử dụng **getRandomElement()** với một mảng của **numbers**:<br>
```TypeScript
let numbers = [1, 5, 7, 4, 2, 9];
let randomEle = getRandomElement<number>(numbers); 
console.log(randomEle);
```
Ví dụ này, khi chúng ta truyền biến **number** vào code như trên, biến **T** trong hàm getRandomElement() bây giờ sẽ được hiểu là kiểu number.<br>

Tương tự, sử dụng **getRandomElement()** với một mảng của **strings**:<br>
```TypeScript
let numbers = ['1', '5', '7', '4', '2', '9'];
let randomEle = getRandomElement<string>(numbers); 
console.log(randomEle);
```

### Sử dụng generic với multiple types
Sau đây minh họa cách phát triển một hàm tổng quát với hai biến kiểu U và V:<br>
```TypeScript
function merge<U, V>(obj1: U, obj2: V) {
    return {
        ...obj1,
        ...obj2
    };
}

let result = merge(
    { name: 'John' },
    { jobTitle: 'Frontend Developer' }
);

console.log(result);
```
Output:<br>
```
{ name: 'John', jobTitle: 'Frontend Developer' }
```

Tóm tắt:<br>
- Sử dụng generics trong TypeScript để phát triển các hàm, giao diện và lớp có thể tái sử dụng, tổng quát và an toàn cho kiểu.