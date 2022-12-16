## 1. Selector là gì ?

Trước khi chúng ta tìm hiểu `reselect` có tác dụng gì thì trước tiên, chúng ta phải hiểu được `selector` là gì ?. `selector` có thể hiểu là một đoạn logic được sử dụng để tính toán ra một giá trị nào đó từ các giá trị có sẵn, hoặc chỉ đơn giản là lấy một giá trị từ một giá trị có sẵn.

Trong một ứng dụng React có sử dụng Redux, Chúng ta hoàn toàn có thể viết các `selector` của riêng mình để lấy hoặc tính toán một giá trị từ các giá trị trong `store` của redux để tái sử dụng chúng trong function `mapStateToProps`. VD:

```js
// *** selector dùng để lấy property 'users' từ store của redux
const getUsers = state => state.users;

// *** selector dùng để tính toán một giá trị dựa trên property 'users' của store
const getUserViaId = (state, id) => state.users.map(user => user.id === id);
```

Thế nhưng, mỗi khi `users` được `update`, hàm `getUserViaId` và `getUser` sẽ phải tính toán lại. Đây chính là vấn đề của các `selector` đơn giản, khi `users` trở nên lớn hơn, hoặc việc tính toán  bên trong `getUserViaId` phức tạp hơn, tốn nhiều tài nguyên hơn và kết quả là app của chúng ta sẽ ... chậm hơn :snail::snail::snail:. Đây chính là lúc thư viện `Reselect` toả sáng. :dash::dash::dash:

## 2. Thư viện reselector hoạt động như thế nào

**reselector** đơn giản là một thư viện giúp chúng ta giải quyết được vấn đề ở trên bằng cách so sánh các tham số của một `selector` (được tạo bằng thư viện **reselect**) với nhau, `selector` đó sẽ chỉ thực hiện tính toán nếu các tham số cũ `khác` với tham số mới.

**reselector** chỉ là một thư viện javascript nên các bạn có thể dùng nó với bất cứ framework hay thư viện javascript nào, chứ không cứ là react nhé.

## 3. Cách Sử dụng thư viện reselector

File README trong [repo](https://github.com/reduxjs/reselect)  của thư viện **reselector** trên **github** thật sự rất chất lượng, dễ đọc, rõ ràng và rất dễ hiểu nên mình sẽ chỉ giới thiệu qua cho các bạn cách dùng cơ bản của thư này thôi nhé.

OKay, Để tạo một `Selector` bằng thư viện**reselector**, chúng ta sẽ phải:

1. tạo một ... `selector` :sweat_smile:, `selector` này nhận vào một store của redux và trả về một giá trị, giá trị này để làm gì các bạn hày đọc tiếp bước dưới và xem VD để hiểu hơn nhé. 

2. chuyền `selector` vào method  `createSelector` của **reselector** để tạo ra một `selector` mới. method này nhận vào một `selector` hoặc một mảng các `selector` và cuối cùng là một callback function, callback function này nhận vào tham số mà `selector` ta chuyền vào `createSelector` và hoạt động như mình đã viết ở mục số **2** . VD:

_**1. file tạo selector:**_

```js
import { createSelector } from 'reselect'

// *** đây là 'selector' của mình
const selectGetUsers = (state) => state.users

// *** function sẽ là một 'selector' thay thế cho 'selector' selectGetUsers
export const getUsersSelector = createSelector(
    // *** chuyền 'selector' ở trên vào method 'createSelector'
    selectGetUsers,
    // *** callback function hoạt động với cơ chế hoạt động
    //     như mình giới thiệu ở trên thay cho 'selector' selectGetUsers
    users => users
);
```

_**2. sử dụng selector:**_


```js
...

const mapStateToProps = state => ({
    getUsers: getUsersSelector(state)
});

...
```

Như mình có đề cập ở bước **2**, tham số đầu tiên của `createSelector` cũng có thể là một mảng các `selector`.

```js
import { createSelector } from 'reselect'

// *** đây là 'selector' của mình
const selectGetUsersOptions = (state) => state.getUsersOptions
const selectGetUsers = (state) => state.users

// *** function sẽ là một 'selector' thay thế cho 'selector' selectGetUsers
export const getUsersSelector = createSelector(
    [selectGetUsersOptions, selectGetUsers],
    (getUsersOptions, users) => {
        switch(getUsersOptions) {
            case 'adult':
                return users.filter(user => user.age > 19);
            case 'teenagers':
                return users.filter(user => user.age > 12 && user.age < 19);
            default:
                return users;
        }
    }
);
```

Thêm một điều nữa, như mình đã đề cập, **reselect** chỉ là một thư viện javascript nên các bạn có thể dùng nó với framework hay thư viện javascript hoặc javascript thuần luôn cũng được nhé !.

```js
const {
    createSelector
} = Reselect;

let exampleState = {
    getUsersOptions: 'all',
    users: [
        { name: 'a', age: 12 },
        { name: 'b', value: 19 },
    ]
}

const selectUsers = state => state.users;
const selectGetUsersOptions = state => state.getUsersOptions;

const getStateSelector = createSelector(
    [selectUsers, selectGetUsersOptions],
    (users, getUsersOptions) => ({ users, getUsersOptions })
)

console.log (getStateSelector(exampleState));
```

## 4. Lời kết
Trên đây là một số điều mà mình muốn giới thiệu với các bạn về thư viện **reselect**. Mình mong rằng qua bài viết này, các bạn mới tìm hiểu về **react** và **redux** sẽ biết thêm về **reselect** và lý do đằng sau sự thịnh hành của thư viện này.