# Phân quyền React App với CASL

## 1. Giới thiệu
- [Home Page](https://stalniy.github.io/casl/)
- [Github](https://github.com/stalniy/casl)

Một số Framework hỗ trợ:
+ [@casl/vue](https://github.com/stalniy/casl/tree/master/packages/casl-vue) cho Vue
+ [@casl/react](https://github.com/stalniy/casl/tree/master/packages/casl-react) cho React
+ [@casl/angular](https://github.com/stalniy/casl/tree/master/packages/casl-angular) cho Angular 2+
+ [@casl/aurelia](https://github.com/stalniy/casl/tree/master/packages/casl-aurelia) cho Aurelia

## 2. Cấu hình cho Reactjs

> Đọc thêm README.MD nếu chưa thoả mãn https://github.com/stalniy/casl/tree/master/packages/casl-react

> Đây cũng có project mẫu cho react: https://github.com/stalniy/casl-react-example

### a. Cài đặt packages
```
npm install @casl/react @casl/ability
```

### b. Code
Đầu tiên ta cần định nghĩa 2 files là file cấu hình `ability.js` và file component `Can.js`. Đặt files ở đâu thì tham khảo [How to structure React project](http://react-file-structure.surge.sh/) bởi anh Dan Abramov :).

#### Can.js
```
import { createCanBoundTo } from "@casl/react"
import ability from "./ability"

export default createCanBoundTo(ability)
```

Đây là component để kiểm tra user hiện tại có quyền và hiển thị những thứ mình muốn ra hay không
Ví dụ: 
```
import Can from './Can';

...

const Setting = ({ classes }) => (
<Buttons>
    <Can I="can" a="Shutdown">
      {() => <Button onClick={this.handleShutdown} />}
    </Can>
</Buttons>
);
```

#### ability.js
```
import { Ability } from "@casl/ability";
/**
 * Defines how to detect object's type: https://stalniy.github.io/casl/abilities/2017/07/20/define-abilities.html
 */
function subjectName(item) {
  if (!item || typeof item === "string") {
    return item;
  }

  return item.__type;
}

const ability = new Ability([], { subjectName });

export default ability;
```

Trong này chúng ta cần input vào array rules mà user hiện tại có quyền gì cho ability.

```
ability.update([{"actions":"can","subject":["Shutdown"]}])
```

### c. Tích hợp vào project

Như cách giải thích các yêu cầu ở trên thì chúng ta có thể hardcode permissions cho từng role hoặc lấy từ server sau khi login

#### * Cách 1: 
Định nghĩa một function và return và array rules
```
function defineRulesFor(user) {
  const { role } = user;
  const { can, rules } = AbilityBuilder.extract();
  can("view", "Profile");
  switch (role) {
    case USER_ROLES.TECHNICIAN:
      break;
    case USER_ROLES.SALON_MANAGER:
      break;
    case USER_ROLES.SALON_OWNER:
      can("reschedule", "Booking");
      can("delete", "Booking");
      break;
    case USER_ROLES.SUPPLIER:
      break;

    default:

      break;
  }
  return rules;
}
```

#### * Cách 2: 
Có thể lấy data remote sau khi login và truyền vào ability

```
import React, { Component } from 'react'
import ability from './ability'

export class LoginComponent extends Component {
  login(event) {
    event.preventDefault()
    const { email, password } = this.state

    return fetch('path/to/api/login', { method: 'POST', body: JSON.stringify({ email, password }) })
      .then(response => response.json())
      .then(session => ability.update(session.rules))
  }

  render() {
    return (
      <form onSubmit={this.login.bind(this)}>
		...
      </form>
    )
  }
}
```


### d. Cách dùng [View More](https://github.com/stalniy/casl/tree/master/packages/casl-react#3-property-names-and-aliases): 

```
<Can I="create" a="Post">
  {() => <button onClick={...}>Create Post</button>}
</Can>
```

## 3. Credit: 
- [https://github.com/stalniy/casl/](https://github.com/stalniy/casl/)
- [https://github.com/stalniy/casl/tree/master/packages/casl-react](https://github.com/stalniy/casl/tree/master/packages/casl-react)
- [https://dev.to/dwalsh01/managing-user-roles-in-react-using-casl-11f6](https://dev.to/dwalsh01/managing-user-roles-in-react-using-casl-11f6)