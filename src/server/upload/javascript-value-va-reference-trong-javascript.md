![](https://images.viblo.asia/b50d01a5-9f23-40a6-9447-055d09fdea33.jpg)
# Mở bài #
Chào các bạn, hôm nay mình và các bạn sẽ cũng nhau bàn về khái niệm trong javascript mà không hiểu rõ nó sẽ khá rắc rối khi viết code, xin giới thiệu đó là **Value và Reference**.

Đây là ví dụ của mình :

```
const Obj1 = {
    ten: 'Nguyen',
    tuoi: 25
};

var Obj2 = Obj1;
Obj2.ten = 'Thanh';
Obj2.tuoi = 30;

Obj2 = {
    ten: 'Tam',
    tuoi: 35
};

const Obj3 = Obj2;
 
console.log('Obj1',Obj1);

console.log('Obj3',Obj3);

```
Bạn hãy thử chạy đoạn code trên và cho suy nghĩ nhé. Mình có khai báo một const có tên biến Obj1 và kiểu dữ liệu của nó là object, value của Obj1 không hề được update.
# Thân bài #
### 1. Trong javascript có 5 kiểu dữ liệu nguyên thủy "primitive types" :

- boolean
- undefined
- String
- Number
- Null

5 Kiểu dữ liệu này được lưu trữ dưới dạng **value** : còn gọi là **Giá trị.**

**Khi ta sao chép giá trị của biến này cho biến khác thì giá trị của 2 biến này hoàn toàn độc lập và không hề liên hệ gì đến với nhau.**

**Ví dụ:**

```
var a = 'Johny';
var b = a;
b = 'Kendy';

console.log('a',a);
console.log('b',b);
```

bạn có thể thấy rằng ta thay đổi giá trị của biến b, mà trước đó biến b đã được gán dữ liệu bằng biến a, và sự thay đổi giá trị của biến b này không ảnh hưởng đến giá trị của biến a.
Nếu dùng kiểu dữ liệu **value** thì tên biến và giá trị của biến đó sẽ lưu cùng 1 ô nhớ.

| Variables| Values |
| -------- | -------- |
| a     | 'Johny' |
| b     |'Kendy'|


### 2. Trong javascript có 3 kiểu dữ liệu tham chiếu "Reference" :

- Function
- Array
- Object

Gọi chung là kiểu dữ liệu **Object type**, vì nó không mang giá trị mà chỉ tham chiếu đến vùng lưu trữ của object đó trong bộ nhớ, **Reference** sẽ không lưu giá trị được gán mà nó sẽ chỉ lưu địa chỉ đến đến giá trị của bộ nhớ.
**Ví dụ**
```
const arr1=['kendy','john'];

const arr2= arr1;
arr2[0]='tom';

console.log('arr1',arr1);

console.log('arr2',arr2);
```
Bạn có thể thấy rằng kết quả xuất ra 2 mảng : mảng **arr1** và mảng **arr2** đều có chung dữ liệu là ['tom','john'] , vì nó đều tham chiếu đến cùng 1 ô dữ liệu.

| Variables| Values |
| -------- | -------- |
| arr1     | <#001> |
| arr2     | <#001> |

# Kết bài #
Đây là những gì mình hiểu về **Value  giá trị** và **Reference tham chiếu** trong javascript.
Nếu có ý kiến và đóng góp gì mong các bạn bình luận phía dưới.


## Xin cảm ơn ##