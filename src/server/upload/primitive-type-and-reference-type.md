# Primitive type:
Có 6 kiểu dữ liệu nguyên thủy (primitive data type): **undefined, boolean, number, string, bigint, symbol**. Khi ta sao chép giá trị biến này cho biến khác thì giá trị của 2 biến này độc lập và không liên quan với nhau.
Ví dụ :
```
let a = 1
let b = a
b = 2
console.log(a) // 1
console.log(b) // 2
```

Dù gán b = a, nhưng khi b thay đổi thì a vẫn không thay đổi!

Khi giá trị thuộc kiểu dữ liệu nguyên thủy, biến sẽ chứa giá trị của biến đó.

Hình ảnh minh hoạ :
![](https://images.viblo.asia/79f533bd-7253-449a-8f61-188951d05ee8.PNG)

# Reference type
Các bạn lưu ý là trong Javascript: object, array, function thì đều được coi là object cả nhé.

Khi gán hoặc sao chép dữ liệu thuộc kiểu object thì biến đó chỉ lưu địa chỉ của giá trị đó trên vùng nhớ. Nó không lưu giá trị được gán.

## Gán object
ví dụ với **array** :
```
let arr1 = ['a', 'b']
let arr2 = cars1
arr2 = ['c', 'd']
console.log(arr1) // ['a', 'b']
console.log(arr2) // ['c', 'd']
```

Hình ảnh minh hoạ :
![](https://images.viblo.asia/c9d65cec-0f3a-4e5b-bba7-480889e9d53a.PNG)

**location1** đại diện cho địa chỉ vùng nhớ của array  **['a','b']**

**location2** đại diện cho địa chỉ vùng nhớ của array  **['c', 'd']**

**location1** khác **location2**

Nhìn vào sơ đồ trên ta thấy được ban đầu thì arr1 và arr2 đều lưu giá trị ô nhớ giống nhau (đều là location1) và chia sẻ cho nhau các thuộc tính bên trong array. arr1 và arr2 đều có giá trị ô nhớ giống nhau nhưng nó lại ở 2 mắt xích khác nhau, vì thế khi thay đổi arr2 bằng 1 giá trị khác (array khác) thì sẽ không ảnh hưởng đến arr2. Nếu như bạn thay đổi arr2[0] thì arr1[0] cũng sẽ thay đổi theo vì 2 vị trí này chia sẽ với nhau.

Thêm một ví dụ nữa để hiểu rõ hơn :

## Thay đổi thuộc tính Object
```
const person1 = { name: 'Do Tuan', age: 23 }
const person2 = person1
person2.age = 20
console.log(person1) // { name: 'Do Tuan', age: 20 }
console.log(person2) // { name: 'Do Tuan', age: 20 }
```

Bạn đang thắc mắc tại sao khai báo bằng **const** rồi nhưng lại có thể thay đổi giá trị bên trong object được phải không? Thực ra thì khi bạn khai báo **const** kết hợp với object thì bạn sẽ không thể thay đổi object nhưng lại có thể thay đổi thuộc tính của nó.

Như ví dụ thì bạn không thể thay đổi **person2** bằng một object mới được, mà chỉ có thể thay đổi **person2.age** hoặc **person2.name**. Điều này liên quan đến vùng nhớ như mình đã nói ở bên trên, nếu bạn thay đổi nguyên 1 object thì vùng nhớ của **person2** sẽ thay đổi và **const**  không cho phép nên sẽ gây lỗi. Nhưng nếu bạn thay đổi thuộc tính bên trong thì vùng nhớ object bên ngoài vẫn giữ nguyên.

Hình ảnh minh hoạ :

![](https://images.viblo.asia/7824151f-b909-4a12-8527-2820d4768e3e.PNG)


**Thảm khảo** :

https://www.javascripttutorial.net/javascript-primitive-vs-reference-values/