![](https://images.viblo.asia/473833e4-f5e9-422e-80e5-f6dd036b5d67.jpeg) 

### 1. Kiểm tra nhiều điều kiện
Cách viết thông thường: 
```
if (userType == 'customer' || userType == 'merchant' || userType == 'guest') {

}
```
Cách viết ngắn hơn: 

```
if (['customer', 'merchant', 'guest'].includes(userType)) {
    
}
```

### 2. Kiểm tra null, empty, undefined
Cách viết thông thường: 
```
if(userType != undefined || userType != "" || userType != null){
    
}
```

Cách viết ngắn hơn: 

```
if(userType){
    console.log(productName)
}
```

### 3. Vòng lặp
Cách viết thông thường: 
```
const nUser =  users.length;
for (var i = 0; i < nUser; i++){
   console.log(users[i]);
}
```

Cách viết ngắn hơn: 

```
users.forEach(user => {
    console.log(user);
});
```
### 4. Nối Array sử dụng Three dots thay vì concat (...)

Cách viết thông thường: 
```
const lastName = ['Nguyen', 'Van'];
const fullName = ['Khai'].concat(lastName);
```

Cách viết ngắn hơn: 

```
const lastName = ['Nguyen', 'Van'];
const fullName = [...lastName, 'Khai'];
```

### 5. Sử dụng arrow function

Cách viết thông thường: 
```
function sayHello(name) {
    console.log('Xin chào', name);
}
sayHello("Khai")
```

Cách viết ngắn hơn: 

```
sayHello = name => console.log(name);
sayHello("Khai");
```

### 6. Sử dụng Template Literals "``" thay cho dấu nối chuỗi "+"
Cách viết thông thường: 
```
const userInfo = 'Ho ten: ' + name + ', Tuoi ' + age;
```

Cách viết ngắn hơn: 

```
const userInfo = `Ho ten: ${name}, Tuoi ${age}`;
```


Một Ví dụ khác khi giá trị là một chuỗi nhiều dòng:
Cách viết thông thường: 
```
const userInfo = 'Họ tên: Nguyen Van Khai\n\t'
    + 'Tuổi: 18\n\t'
    + 'Lớp: 12\n\t';
```

Cách viết ngắn hơn: 
```
const userInfo = `Họ tên: Nguyen Van Khai
Tuổi: 18
Lớp: 12`;
```

### 7. Sử dụng Object.keys
Phần này mình dùng để debug nhiều hơn :D
Như bạn biết thì trong javascript mọi thứ đều là object (chính vì thế cái gì bạn cũng có thể ném vào trong Object.keys)
Khi debug ứng dụng nodejs, nhiều khi console.log() 1 đối tượng nào đó ra, bạn sẽ hơi hoảng vì nó quá loằng ngoằng, khó đọc nữa. 
Nên mình hay thêm console.log(`Object.keys(objectA)`) vào để cho mọi thứ rút gọn và dễ đọc hơn 


Cảm ơn các bạn đã dành thời gian đọc bài.   
Rất mong nhận được comment góp ý của các bạn.  

Tham khảo: 
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
- https://stackoverflow.com/questions/154059/how-can-i-check-for-an-empty-undefined-null-string-in-javascript