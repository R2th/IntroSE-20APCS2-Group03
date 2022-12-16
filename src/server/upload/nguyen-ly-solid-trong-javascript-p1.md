Nguyên lý SOLID là một tập hợp các nguyên tắc thiết kế phần mềm, nó giúp chúng ta hiểu được cách cấu trúc code để giúp code trở nên mạnh mẽ, dễ dàng bảo trì và linh hoạt nhất có thể.

Dưới đây là các nguyên tắc của S.O.L.I.D

S: Single Responsibility

O: Open/Close

L: Liskov Substitution

I: Interface Segregation

D: Dependency Inversion

Ở bài viết này, chúng ta cùng tìm hiểu về 2 nguyên tắc đầu tiên nhé, S, O. Bài viết sau mình sẽ nói về 3 nguyên tắc còn lại.
# S - Single Responsibility Principle
![](https://images.viblo.asia/ad5570c7-3ccc-4ac0-982c-67e1b513ecaa.jpg)

> Mỗi class chỉ nên làm duy nhất MỘT nhiệm vụ. (chỉ có thể sửa đổi với một lý do duy nhất).
> 
Như trong hình bạn có thể thấy, dĩa và thìa có 2 chức năng khác nhau. Chúng ta không nên gộp chúng vào một vật thể mà nên tách chúng thành 2 vật thể khác nhau vì nhiệm vụ của chúng khác nhau.

Ví dụ: Giả sử chúng ta muốn validate form tạo user, rồi tạo user trong DB


**KHÔNG NÊN**
```js

/* Một function với tên như thế này là dấu hiệu của việc đang vi phạm nguyên tắc Single Responsibility 
*  Phần xử lý validation và spec tạo user đang bị lẫn vào nhau
*  Điều này là không tốt
*/ 
validateAndCreatePostgresUser = (name, password, email) => {   

  // Gọi một hàm bên ngoài để validate user form
  const isFormValid = testForm(name, password, email); 

  // Khi form hợp lệ
  if(isFormValid){
   // Thực hiện cụ thể việc tạo user
    db = connectWithDB()
    db.createUser(name, password, email) 
  }
}
```
**NÊN**
```js

validateRequest = (req) => {

  // Gọi function từ bên ngoài để validate user form
  const isFormValid = testForm(name, password, email); 

  // Form đã hợp lệ
  if(isFormValid){
    createUser(req); // triển khai ở function/module khác
  }
}

// 1 function chỉ  dùng để tạo user trong firebase
createUserInDB = (req) => {
    db = connectWithDB()
    db.createUser(name, password, email) 
 }

/* Bước tiếp theo là khai báo function này trong 1 file khác
* và import nó vào đây
*/
```
Trông thì có vẻ chỉ là một thay đổi nhỏ, nhưng việc tách logic của phần validate với phần tạo user sẽ rất hữu ích. Vì cả 2 logic này có thể thay đổi trong tương lai. Khi logic tạo user trở nên phức tạp hơn, việc maintain hay mở rộng code sẽ trở nên dễ dàng hơn nhiều.


# O - Open-Closed Principle
![](https://images.viblo.asia/57aeabc8-f8e6-46bf-80d5-5eed4b748b8b.jpg)

> Mở  cho sự mở rộng, nhưng đóng cho sự sửa đổi

Chúng ta nên hạn chế việc chỉnh sửa bên trong một class hoặc module có sẵn, thay vào đó hãy xem xét mở rộng chúng.

Rõ ràng hơn nữa thì nguyên lý này có nghĩa là nếu bạn muốn mở rộng hành vi của module, bạn sẽ không cần phải sửa code đã có trước đó rồi. Còn nếu bạn vẫn bất chấp thay đổi code thay vì mở rộng chúng, tức là bạn đã vi phạm nguyên tắc này.

![](https://images.viblo.asia/2787f134-2003-4601-88df-4cbd6e5b853a.png)

Phía trên là một hình ảnh vui mình mới search Google về nguyên lý này. Edward đang có tay bình thường, và giờ anh ý cần sử dụng kéo. Rất buồn là Edward lúc này không chọn giải pháp chỉ cần cầm cái kéo lên là xong (extend), anh ấy lại chọn biến tay thành cái kéo (modify). :scream:POOR THING!


Tiếp tục chúng ta cùng tìm hiểu ví dụ sau:

Giả sử bạn đã có đoạn code này từ trước

```js
const roles = ["ADMIN", "USER"]
checkRole = (user) => {
  if (roles.includes(user.role)) {
    return true; 
  } else {
    return false
  }
}

//Test role
checkRole("ADMIN"); //true
checkRole("Foo"); //false
```

Và chúng ta muốn thêm một superuser, vì bất cứ lý do gì, thay vì sửa code đã có, chúng ta có thể làm việc đó trong một function khác.

```js
// Code không được phép sửa đổi!!!
const roles = ["ADMIN", "USER"]
checkRole = (user) => {
  if (roles.includes(user.role)) {
    return true; 
  } else {
    return false
  }
}
// Code không được phép sửa đổi!!!

// Chúng ta có thể định nghĩa một function để thêm role mới cho function này
addRole(role){
  roles.push(role)
}

// Gọi function với param là role mới để thêm nó vào
addRole("SUPERUSER");

// Kiểm tra role
checkRole("ADMIN"); //true
checkRole("Foo"); //false
checkRole("SUPERUSER"); //true
```




Bài viết đến đây là hết, hẹn gặp lại các bạn ở phần sau. Hy vọng có thể giúp các bạn hiểu thêm về 2 nguyên tắc đầu tiên của SOLID và áp dụng chúng khi viết code.

Tham khảo: 

https://francescociulla.com/solid-principles-around-you-in-javascript

https://thefullstack.xyz/solid-javascript