Developer thường sử dụng `console.log()` trong lập trinh javascript vì sự đơn giản và dễ sử dụng của nó, nhưng bạn biết ngoài `console.log()`, Console API còn cung cấp rất nhiều phương thức khác hỗ trợ bạn ghi log ra console dễ dàng hơn. Bài viết này mình sẽ giới thiệu 1 số phương thức của Console API nên sử dung trong lập trình với javascript.
# console.assert
Hàm `console.assert` được sử dụng để kiểm tra 1 biểu thức boolean truyền vào là đúng hay sai. Trong trường hợp biểu thức trả về giá trị sai, hàm sẽ ghi các giá trị được truyền sau biểu thức lên màn hình console. Nếu biểu thức boolean trả về kết quả đúng thì hàm này sẽ ko ghi log ra màn hình console.

**Cú pháp**
```
console.assert(assertion, obj1 [, obj2, ..., objN]);
console.assert(assertion, msg [, subst1, ..., substN]);
```

- `assertion`: Là 1 biểu thức logic. Nếu biểu thức sai, thông báo sẽ được ghi vào console
- `obj1 ... objN`: Một danh sách các đối tượng JavaScript để ouput ra console trong trường hợp assertion trả về false. Nếu những obj này là 1 chuỗi thì nó sẽ nối với nhau theo thứ tự.

Ex: Ta có 2 ví dụ sau:
```
console.assert(false, {name: 'Name1', old: 25}, {name: 'Name2', old: 26});
```
![](https://images.viblo.asia/ee61ccee-5543-4f78-a851-5df456551ee9.png)
```
console.assert(false, 'This is', 'assert function');
```
![](https://images.viblo.asia/e7bde285-4539-44b7-98fe-cecea64f4537.png)

- `msg`: Là một chuỗi JavaScript chứa 0 hoặc nhiều chuỗi thay thế tương tự cú pháp in chuỗi trong ngôn ngữ lập trình C.
-  `subst1 ... substN`:  Các đối tượng JavaScript để thay thế các chuỗi thay thế trong msg.
-  
Ex: 
```
console.assert(false, 'This is %d function in %d', 'assert', 'javascript');
```
![](https://images.viblo.asia/f920fe05-5d1f-4df7-bf73-8bab3958e13d.png)

# console.count và console.countReset
Hai phương thức này được sử dụng để thiết lập và xóa bộ đếm số lần một chuỗi cụ thể được log trên console.

**Cú pháp**
```
console.count( [label] );
console.countReset([label]);
```

Ex: 
```
console.count('Hello');
console.count('Hello');
console.countReset('Hello');
console.count('Hello');
console.count('Hello');
```

![](https://images.viblo.asia/2ac632fb-b85a-4758-ad8d-454170f7c1a5.png)

# console.group and console.groupEnd

console.group và console.groupEnd giúp tạo một nhóm các logs trong trong console của bạn. Bạn có thể truyền một label làm đối số đầu tiên của console.group để mô tả cho group.

**Cú pháp**
```
console.group([label]);
console.groupEnd();
```

Ex:
```
console.group('Start group1');
console.log('Log 1');
console.log('Log 2');
console.groupEnd();
console.group('Start group2');
console.log('Log 1');
console.log('Log 2');
console.groupEnd();
```
![](https://images.viblo.asia/d62fcf68-5df3-49ee-99bf-6bf7c8bc6f12.png)

Ngoài ra có thể sử dụng hàm `console.groupCollapsed([label])` thay cho hàm `console.group([label]);`, nó sẽ tạo ra 1 group ở trạng trái đóng lại.

![](https://images.viblo.asia/1c756baf-5fba-414a-9513-23b823e7d59d.png)

# console.table
Hàm đặc biệt này cực kỳ hữu ích để hiển thị một đối tượng hoặc nội dung một mảng trong một bảng thân thiện với người dùng.

**Cú pháp**
```
console.table(data); // với data là 1 object hoặc 1 mảng.
```

Ex: 
```
var users = [
    {
        name: 'Người dùng 1',
        age: 22,
    },
    {
        name: 'Người dùng 2',
        age: 22,
    }
];
console.table(users)
```

![](https://images.viblo.asia/4d6ff968-8b84-4d75-ac80-8c01e0b59bbb.png)


```
var person = {
    name: 'user',
    age: 22,
    address: '193 Nguyễn Lương Bằng'
};
console.table(person);
```

![](https://images.viblo.asia/dceb6cf4-cd76-4d4f-913f-130d4b78228e.png)

# console.time và console.timeEnd
Trong trường hợp bạn muốn kiểm tra hiệu năng của code của bạn trong thời gian thực thi và giải quyết nó. Bạn có thể khởi tạo một mốc thời gian bắt đầu với Date API và sử dụng nó để tính toán thời gian thực thi code của bạn.

```
const start = Date.now();

for(let i = 0; i < 100000000; i++) {
    //do some thing
}

const diff = Date.now() - start;

console.log('Time execution: ' + diff + 'ms');
```
![](https://images.viblo.asia/f855762d-772c-4e2b-a985-67ce1e343268.png)

Thay vì sử dụng cách trên chúng ta có thể sử dụng `console.time` và `console.timeEnd` để làm điều này.

**Cú pháp**
```
console.group([label]);
console.timeEnd(([label]);
```

Đoạn xử lý trên sẽ được thay  thế như sau:
```
console.time('Time execution');
    
for(let i = 0; i < 100000000; i++) {
    //do some thing
}

console.timeEnd('Time execution');
```

![](https://images.viblo.asia/2c9e2507-bdf1-48b6-8bb7-b63d4f681235.png)

# Tổng kết
Trên đây là 1 số hàm console có thể giúp bạn debug tốt hơn khi code mà bạn ko để ý. Ngoài ra các bạn có thể xem thêm tại [đây](https://developer.mozilla.org/en-US/docs/Web/API/Console).