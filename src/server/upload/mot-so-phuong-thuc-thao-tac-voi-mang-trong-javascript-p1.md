# 1. Các phương thức thêm và xóa phần tử của mảng

```rust
arr.push(num1, num2, ...);
// Thêm một hoặc nhiều phần tử vào cuối mảng
// let arr = [1, 2];
// let num1 = 3;
// let num2 = 4;
// arr.push(num1, num2);
// console.log(arr);
// [1, 2, 3, 4]
```

```objectivec
arr.unshift(num1, num2, ...);
// Thêm một hoặc nhiều phần tử vào đầu mảng
// let arr = [1, 2];
// let num1 = 3;
// let num2 = 4;
// arr.unshift(num1, num2);
// console.log(arr);
// [3, 4, 1, 2]
```

```java
arr.pop();
// Lấy ra phần tử cuối cùng của mảng
// let arr = [1, 2];
// arr.pop();
// console.log(arr);
// [1]
```

```java
arr.shift();
// Lấy ra phần tử đầu tiên của mảng
// let arr = [1, 2];
// arr.shift();
// console.log(arr);
// [2]
```

```objectivec
delete arr[index]
// Xoá giá trị của 1 phần tử ở key truyền vào và không làm thay đổi chiều dài của mảng
// let arr = [1, 2, 3];
// delete arr[1];
// console.log(arr)
// [1, empty, 3]
```

```objectivec
arr.splice(index, n, num1, num2, ...)
// Xóa n phần tử từ vị trí key truyền vào và chèn thêm num1, num2... vào vị trí đó
// let arr = [1, 2, 3, 4];
// arr.splice(1, 1, 5, 6, 7);
// console.log(arr);
// [1, 5, 6, 7, 3, 4]

// index là bắt buộc
// n và các num1, num2... ko bắt buộc
// nếu n ko dc truyền vào thì splice sẽ xõa các phần tử từ index đến cuối mảng
// let arr = [1, 2, 3, 4];
// arr.splice(2);
// console.log(arr);
// [1, 2]
```

> đặc điểm chung của các phương thức push, unshift, pop, shift, delete, splice là thay đổi mảng gốc.

```objectivec
arr1.concat(arr2, arr3, ...)
// Tạo mảng mới bao gồm các phần tử của các mảng arr1, arr2, arr3...
// let arr1 = [1, 2];
// let arr2 = [3, 4];
// let arr3 = [5, 6];
// arr1.concat(arr2, arr3)
// [1, 2, 3, 4, 5, 6]
```

```objectivec
arr.slice(start, end)
// Tảo mảng mới từ vị trí start tới end
// let arr = [1, 2, 3, 4, 5];
// arr.slice(1, 3);
// [2, 3]
```

> đặc điểm chung của các phương thức concat, slice là không thay đổi mảng gốc.

### So sánh giữa `push` và `concat`

```markdown
arr1.concat(arr2, arr3)
tương đương với
arr1.push(...arr2, ...arr3)
```

```c
arr.push(num1, num2)
tương đương với
arr.concat(num1, num2)
```

Chú ý: bởi vì push sẽ thay đổi trực tiếp mảng nên trong 1 số trường hợp có thể xảy ra lỗi không mong muốn
```rust
arr1 = [1, 2];
arr2 = arr1;
arr1.push(3);
console.log(arr1, arr2);
// [1, 2, 3] [1, 2, 3]

arr1 = [1, 2];
arr2 = arr1;
arr3 = arr1.concat(3)
console.log(arr1, arr2, arr3);
// [1, 2] [1, 2] [1, 2, 3]
```

Chúng ta có thể tránh lỗi xảy ra trong th1 bằng cách sau

```objectivec
arr1 = [1, 2];
arr2 = [...arr1];
arr1.push(3);
console.log(arr1, arr2);
// [1, 2, 3] [1, 2]
```

Về performance thì push hơn hẳn so với concat

![](https://images.viblo.asia/78452592-3477-4fb0-9b3a-18bf65a49ebd.png)

[https://jsben.ch/WJDbt](https://jsben.ch/WJDbt)