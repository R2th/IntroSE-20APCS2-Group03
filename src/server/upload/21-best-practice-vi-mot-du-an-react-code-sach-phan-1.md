Trong bài báo này, [Mohammad Faisal](https://56faisal.medium.com/) sẽ giới thiệu tới các độc giả 21 Best Practice hướng tới một dự án React code sạch. Hãy cùng thu thập tri thức và nâng cao chất lượng code lên nào.


![Woman with index finger over mouth](https://miro.medium.com/max/630/0*wueohBheYq-ekUeC)

Photo by [Diana Polekhina](https://unsplash.com/@diana_pole?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral).

# Lời nói đầu

React không hề áp đặt bạn phải cấu trúc mọi thứ như thế nào. Bởi vậy chính chúng ta là những người phải chịu trách nhiệm với project của mình, đảm bảo sao cho nó được 'sạch' và tiện maintain sau này.

Bữa nay ta sẽ cùng nhau nói về các Thực Hành Hay Nhất mà dân chuyên nên áp dụng để nâng cao sức khỏe cho app React của mình. Những rule này được mọi người chấp nhận rộng rãi, nên không lẽ gì chúng ta lại không tiếp cận đến những tri thức này.

Mọi thứ sẽ được thể hiện qua code, mời các bạn lên chuyến bay này và thắt dây an toàn vào nào!


##  1. Dùng dạng viết tắt của JSX

Dùng dạng viết tắt của JSX để truyền biến boolean. Ví dụ, nếu bạn muốn kiểm soát việc hiển thị title của `Navbar` component:

**Xấu**

```react
return (
    <Navbar showTitle={true} />
);
```

[shorthand-bad.jsx](https://gist.github.com/Mohammad-Faisal/b36048cd2b7810390125fbe60cfee4ff#file-shorthand-bad-jsx)

**Tốt**

```react
return(
    <Navbar showTitle />
)
```

[shorthand-good.jsx](https://gist.github.com/Mohammad-Faisal/af61bcf957da6f8f56a4daa226fffc96#file-shorthand-good-jsx)



## 2. Dùng phép toán ba ngôi

Ví dụ, nếu bạn muốn hiển thị chi tiết user nào đó dựa trên role:

**Xấu**

```react
const { role } = user;
if(role === ADMIN) {
    return <AdminUser />
}else{
    return <NormalUser />
}
```

[ternary-bad.jsx](https://gist.github.com/Mohammad-Faisal/44d8e6cf3ef66b9e1a69540c3254dba0#file-ternary-bad-jsx)

**Tốt**

```react
const { role } = user;
return role === ADMIN ? <AdminUser /> : <NormalUser />
```

[ternary-good.jsx](https://gist.github.com/Mohammad-Faisal/01b85e9570a74d359a284d859de33979#file-ternary-good-jsx)



## 3. Tận dụng lợi thế của cú pháp Object literal

Cú pháp tạo object sử dụng cặp dấu ngoặc {} thực sự giúp code của bạn dễ đọc. 
Ví dụ, bạn muốn hiển thị 3 loại user tương ứng với role. Lúc ấy bạn không thể dùng phép toán ba ngôi được vì có nhiều hơn hai lựa chọn.

**Xấu**

```react
const {role} = user
switch(role){
    case ADMIN:
        return <AdminUser />
    case EMPLOYEE:
        return <EmployeeUser />
    case USER:
        return <NormalUser />
}
```

[conditional-rendering-bad.jsx](https://gist.github.com/Mohammad-Faisal/6c4c1978f49184c503f111b316656f3d#file-conditional-rendering-bad-jsx)

**Tốt**

```react
const {role} = user
const components = {
    ADMIN: AdminUser,
    EMPLOYEE: EmployeeUser,
    USER: NormalUser
};

const Component = components[role];
return <Componenent />;
```

[conditional-rendering-good.jsx](https://gist.github.com/Mohammad-Faisal/c1c39a4b32a206cfd7a6c78226c702bf#file-conditional-rendering-good-jsx)

Đã dễ xem hơn rồi đấy.



## 4. Dùng fragment

Hãy luôn chọn `Fragment` thay vì `div`. Không chỉ giữ cho code sạch mà còn tốt cho performance bởi vì có ít hơn 1  node được tạo ở DOM ảo.

**Xấu**

```react
return (
    <div>
        <Component1 />
        <Component2 />
        <Component3 />
    </div>
)
```

[fragment-bad.jsx](https://gist.github.com/Mohammad-Faisal/9b22f4b53a1976a600967fae397d79b0#file-fragment-bad-jsx)

**Tốt**

```react
return (
    <>
        <Component1 />
        <Component2 />
        <Component3 />
    </>
)
```

[fragment-good.jsx](https://gist.github.com/Mohammad-Faisal/96e6947e3c3322e9c735adabde9a2f31#file-fragment-good-jsx)



## 5. Đừng định nghĩa hàm ở bên trong render

Đừng định nghĩa hàm ở bên trong render. Cố gắng kiềm chế logic bên trong render sao cho ít nhất có thể.

**Xấu**

```react
return (
    <button onClick={() => dispatch(ACTION_TO_SEND_DATA)}> // NOTICE HERE
        This is a bad example
    </button>
)
```

[function-render-bad.jsx](https://gist.github.com/Mohammad-Faisal/8ef6be341f70210a394fc27d5aa704db#file-function-render-bad-jsx)

**Tốt**

```react
const submitData = () => dispatch(ACTION_TO_SEND_DATA)

return (
    <button onClick={submitData}>
        This is a good example
    </button>
)
```

[function-render-good.js](https://gist.github.com/Mohammad-Faisal/d443774d9ae4dad565c93c68aff4ce2b#file-function-render-good-js)



## 6. Dùng memo

`React.PureComponent` và `memo` giúp performance của app bạn tăng một cách đáng kể. Và còn có thể tránh được rendering không cần thiết.

**Xấu**

```react
import React, { useState } from "react";

export const TestMemo = () => {
    const [userName, setUserName] = useState("faisal");
    const [count, setCount] = useState(0);
    const increment = () => setCount((count) => count + 1);
    return (
        <>
            <ChildrenComponent userName={userName} />
            <button onClick={increment}> Increment </button>
        </>
    );
};

const ChildrenComponent =({ userName }) => {
    console.log("rendered", userName);
    return <div> {userName} </div>;
};
```

[memo-bad.jsx](https://gist.github.com/Mohammad-Faisal/9f9efea49e187188a5917f20d2fbb76a#file-memo-bad-jsx)

Value của count không liên quan tới `ChildComponent`, cho nên chỉ cần render childcomponent một lần duy nhất thôi. Nhưng mỗi lần bạn click vào button thì nó đều được render.

![Output](https://miro.medium.com/max/630/1*UC19Qvfj06VAy63lR8mOFg.png)

**Tốt**

Edit `ChildrenComponent` như sau nào ~

```react
import React ,{useState} from "react";

const ChildrenComponent = React.memo(({userName}) => {
    console.log('rendered')
    return <div> {userName}</div>
})
```

[memo-good.jsx](https://gist.github.com/Mohammad-Faisal/a5e4afed5a0e2884f3f16f9f3f2d7d98#file-memo-good-jsx)

Giờ thì bạn có click đến bể nút, nó cũng sẽ chỉ render khi nào cần thiết thôi.



## 7. Đưa CSS vào JavaScript

Việc sắp xếp CSS còn vất hơn nhiều sắp xếp JS. Do vậy, khi viết app React, hãy tránh việc dùng JavaScript raw nhé.

**Xấu**

```react
// CSS FILE
.body {
    height: 10px;
}

//JSX
return <div className='body'>
</div>
```

[css-bad.jsx](https://gist.github.com/Mohammad-Faisal/70687534159f44a6d5056bbb933b3ce2#file-css-bad-jsx)

**Tốt**

```react
const bodyStyle = {
    height: "10px"
}
return <div style={bodyStyle}>
</div>
```

[css-good.jsx](https://gist.github.com/Mohammad-Faisal/684e1aedc41366e24b9bea3ef021089e#file-css-good-jsx)



## 8. Tận dụng Object Destructuring

Tận dụng Object Destructuring! Ví dụ, nếu bạn cần hiển thị chi tiết user:

**Xấu**

```react
return (
    <>
        <div> {user.name} </div>
        <div> {user.age} </div>
        <div> {user.profession} </div>
    </>
)
```

[descrutcure-bad.jsx](https://gist.github.com/Mohammad-Faisal/3f452b5a54c6a7542869c1448caaaa7e#file-descrutcure-bad-jsx)

**Tốt**

```react
const { name, age, profession } = user;

return (
    <>
        <div> {name} </div>
        <div> {age} </div>
        <div> {profession} </div>
    </>
)
```

[descructuring-good.jsx](https://gist.github.com/Mohammad-Faisal/faba3ee5ee16ea2ad0dd65d012a7e5f5#file-descructuring-good-jsx)



## 9. Không cần {} cho thuộc tính chuỗi ký tự

Ví dụ, khi bạn truyền chuỗi ký tự vào childcomponent:

**Xấu**

```react
return(
    <Navbar title={"My Special App"} />
)
```

[string-props.-bad.jsx](https://gist.github.com/Mohammad-Faisal/82b46cdfe707408829188bc4987b09a2#file-string-props-bad-jsx)

**Tốt**

```react
return(
    <Navbar title="My Special App" />
)
```

[string-prop-good.jsx](https://gist.github.com/Mohammad-Faisal/45594789b9d6fff8c0b1f401421a0b32#file-string-prop-good-jsx)



## 10. Xóa code JS khỏi JSX

Bỏ hết JS code khỏi JSX nếu như nó không phục vụ cho mục đích render hay chức năng UI nào.

**Xấu**

```react
return (
    <ul>
        {posts.map((post) => (
            <li onClick={event => {
                console.log(event.target, 'clicked!'); // <- THIS IS BAD
                }} key={post.id}>{post.title}
            </li>
        ))}
    </ul>
);
```

[js-in-jsx-bad.jsx](https://gist.github.com/Mohammad-Faisal/331aee513c27d7a2e951f35a9f81446a#file-js-in-jsx-bad-jsx)

**Tốt**

```react
const onClickHandler = (event) => {
    console.log(event.target, 'clicked!');
}
return (
    <ul>
        {posts.map((post) => (
            <li onClick={onClickHandler} key={post.id}> {post.title} </li>
        ))}
    </ul>
);
```

[jsx-in-js-good.jsx](https://gist.github.com/Mohammad-Faisal/2eda63340eeedcb338e48787fd17235f#file-jsx-in-js-good-jsx)





### *Hẹn gặp lại ở phần 2!*