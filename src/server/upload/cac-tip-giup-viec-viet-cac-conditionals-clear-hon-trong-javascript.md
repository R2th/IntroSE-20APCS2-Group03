Conditionals vốn quá quen thuộc với tất cả các developers. Tuy nhiên vì tính chất của chúng không quá phức tạp, và ai cũng tự tin rằng mình đã nắm rõ về conditional, nên developers thường lãng quên việc tìm tòi cái mới khi có liên quan đến conditionals. 

Dưới đây là một số tip khá hay ho mà bản thân người viết muốn chia sẻ đến với các developers. Sẽ không tốn quá nhiều thời gian của bạn đâu. Cùng đọc và khám phá thêm vài điều hữu ích liên quan đến conditionals nhé. Let's go !!

### 1. Sử dụng object literals thay vì switch

Hãy xem một ví dụ sử dụng *switch* phổ biến sau đây:

```
switch (name) {
  case 'hoa':
    return { name: 'hoa' };
  case 'lan':
    return { name: 'lan' };
  case 'thao':
    return { name: 'thao' };
  default:
    return undefined;
}
```

Đoạn code trên không có gì sai cả. Tuy nhiên đó chỉ là một đoạn code thông thường. Sao không thử cải tiến nó bằng các áp dụng một cú pháp rõ ràng hơn, đó là sử dụng object literal?

```
const userFactory = {
  hoa: { name: 'hoa' },
  lan: { name: 'lan' },
  thao: { name: 'thao' },
};

const name = 'hoa';
return userFactory[name]; // { name: 'hoa' }
```

Và kết quả ở đây là một cũ pháp rõ ràng hơn, khả năng đọc hiểu cao hơn và có thể gói gọn làm một module để dễ dàng cải tiến sau này.

Có thể cải thiện hơn nữa bằng việc sử dụng *get* của *lodash*, để đảm bảo tính an toàn.

```
import { get } from 'lodash';

const userFactory = {
  hoa: { name: 'hoa' },
  lan: { name: 'lan' },
  thao: { name: 'thao' },
};

const name = 'hoa';
return get(userFactory, name, { name: 'fallback' });
```

Chúng ta viết nhưng này không phải muốn loại bỏ cách viết *switch*. Đây chỉ là một ví dụ về một giải pháp thay thế được, vì đôi khi muốn nó hoạt động tốt nhất thì không ai khác chính là bạn, người hiểu rõ hệ thống nhất. Với trường hợp khi có một câu lệnh *switch* khổng lồ và dài dằng dặc, sao chúng ta không sử dụng object literals để khiến nó trở nên clear hơn, phải không?

### 2. Sử dụng Array.includes trong trường hợp có nhiều điều kiện
Một ví dụ khác về conditionals như sau:

```
if (name === 'hoa' || name === 'lan' || name === 'thao') {
  return true;
}
```

Thử hô biến nó thành một cấu trúc clear và dễ hiểu hơn nào:

```
const admins = ['hoa', 'lan', 'thao'];

if (admins.includes(name)) {
  return true;
}
```

Có thấy sự khác biệt không ^^. Việc setup admin tự dưng trở nên rõ ràng hơn đúng không nào.

### 3. Sử dụng các function parameters mặc định

Chúng ta thường hay viết như này trong một function:

```
function (name) {
  let finalName = name;

  if (name === undefined) {
    finalName = 'hoa'
  }

  // do some logic with finalName
}
```

Hô biến nó trở nên xinh đẹp hơn như nào đây?  Sử dụng parameter values và xem kết quả nào:

```
function (name = 'hoa') {
  // do some logic with name
}
```

### 4. Sử dụng Array.every và Array.some
Giả sử muốn viết một function có thể lọc được tất cả các item đều thông qua điều kiện đề ra. Và chúng ta có đoạn code như sau:

```
const users = [
  { name: 'hoa', isAdmin: true },
  { name: 'lan', isAdmin: true },
  { name: 'thao', isAdmin: true },
];

let areAllAdmins;

users.forEach((user) => {
  if (!areAllAdmins) { // break function };

  areAllAdmins = user.isAdmin === true;
});
```

Thay vì dài dòng văn tự như trên, thử rút gọn lại xem:

```
const users = [
  { name: 'Hoa', isAdmin: true },
  { name: 'Lan', isAdmin: true },
  { name: 'Thao', isAdmin: true },
];

const areAllAdmins = users.every((user) => !!user.isAdmin);
```

Hoặc cách khác, sử dụng Array.some:

```
const users = [
  { name: 'Hoa', isAdmin: true },
  { name: 'Lan', isAdmin: true },
  { name: 'Thao', isAdmin: true },
];

const areAllAdmins = users.some((user) => !!user.isAdmin);
```

### 5. Returning early
Thay vì trả về một biến đơn ở cuối function, thử trả nó về sớm hơn để làm đơn giản hoá đoạn code xem sao.

```
function canAccess(user) {
  let finalStatus;

  if (user) {
    if (user.isAdmin) {
      finalStatus = true;
    } else {
      finalStatus = false;
    }
  }

  return finalStatus;
}
```

Giờ thì lại tiếp tục hô biến nào:

```
function canAccess(user) {
  if (!user) return false;
  if (user.isAdmin) return true;
  if (!user.isAdmin) return false;
}
```

Thậm chí có thể đơn giản hoá hơn với việc return user.isAdmin, tuy nhiên vì đây là bài viết hướng dẫn, nên viết như này sẽ thể hiện được rõ ràng hơn.

### Kết luận
Đọc xong các tip như này, bạn có cảm nghĩ như nào :)

Là một developer, không có thứ gì không đáng để bạn phải học hỏi cả. Dù biết rõ đến đâu thì có lẽ lúc nào đó cũng sẽ là một điểm mới mà nếu bạn không tiếp tục muốn đi tiếp thì sẽ không thể nào khám phá ra được. Học, học nữa, học mãi mà, phải không :)