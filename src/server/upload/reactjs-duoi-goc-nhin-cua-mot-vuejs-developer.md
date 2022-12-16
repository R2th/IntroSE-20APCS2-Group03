Tính tới thời điểm hiện tại, mình đã làm việc với VueJS được một khoảng thời gian tương đối. Tìm hiểu càng xâu về nguồn gốc của Vue thì mình biết định hướng dựa theo một thư viện JavaScript nổi tiếng khác là ReactJS nên cũng dành chút thời gian tìm hiểu thêm về ReactJS. Bài viết này sẽ nói về nhận định của một VueJS developer về ReactJS. *( Đây là ý kiến cá nhân của mình có thể đúng có thể sai, nếu sai bạn có thể comment vào dưới bài viết để chúng ta cùng thảo luận )*

# Templates

VueJS sử dụng HTML và một số directives để cho việc khai báo cấu trúc của mình. VueJS sử dụng nhưng file .vue.
```html:Hello.vue
<template>
  <p>Hello, {{ name }}!</p>
</template>

<script>
export default {
  props: ['name']
};
</script>
```

ReactJS sử dụng JSX, một extension của ECMAScript
```javascript:Hello.jsx
export default function Greeter({ name }) {
  return <p>Hello, {name}!</p>;
}
```
Về tính tường tận thì mình thấy VueJS rõ ràng hơn thi tách riêng phần html và phần khải báo dữ liệu, tuy vậy càng làm ReactJS thì mình thấy cú pháp của ReactJS nhỏ gọn, tiện dụng hơn rất nhiều nên đây có thể là một điểm cộng dành cho React.
# Conditional rendering

Vue sử dụng các directives như v-if, v-else và v-else-if để render dữ liệu theo một điều kiện nhất định.

```html:VueIsEasy.vue
<template>
  <article>
    <h1 v-if="easy">Vue là dễ!</h1>
  </article>
</template>

<script>
export default {
  props: ['easy']
};
</script>
```

React thì không hỗ trợ directives nên phải dùng chính JavaScript để có thể điều hướng câu lệnh điều kiện.
```javascript:Easy.jsx
export default function Easy({ easy }) {
  return (
    <article>
      {easy && <h1>React là dễ!</h1>};
    </article>
  );
}
```

Tuy nhiên React bắt đầu rối khi bắt đầu sử dụng nhiều if-else

```javascript:Easy.jsx
export default function Easy({ easy }) {
  return (
    <article>
      {awesome ? (
        <h1>React là dễ!</h1>
      ) : (
        <h1>Chả dễ tẹo nào 😢</h1>
      )};
    </article>
}
```

Khi gặp các trường hợp như thế này, chúng ta nên tách riêng thành 2 cho dễ sử dụng.
```javascript:Easy.jsx
export default function Easy({ easy }) {
  if (!easy) {
    return (
      <article>
        <h1>Khó như ma ý</h1>
      </article>
    );
  }

  return (
    <article>
      <h1>React là dễ!</h1>
    </article>
  );
}
```

Việc sử dụng các directives giúp việc xử lý các câu lệnh logic để render nhẹ nhàng hơn nhiều so với React nên đây là điểm cộng dành cho Vue.

# List Rendering

Việc sử dụng các directives lại là một lợi thế những tác vụ như này.
```html:Item.vue
<template>
  <ul>
    <li v-for="(item, index) in items" :key="index">
      {{ item }}
    </li>
  </ul>
</template>

<script>
export default {
  props: ['items']
};
</script>
```

Do không sử dụng directive nên việc hiển thị dữ liệu từng item trong items phải dùng tới function map.
```javascript:Item.jsx
export default function Item({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
```

Chúng ta cũng có thể sử dụng v-for cho việc hiển thị dữ liệu trong một Object.

```html:Object.vue
<template>
  <ul>
    <li v-for="(value, key) in object" :key="key">
      {{ key }}: {{ value }}
    </li>
  </ul>
</template>

<script>
export default {
  props: ['object'] // E.g. { a: 'Foo', b: 'Bar' }
};
</script>
```

Còn bên React thì khó khăn hơn một chút.
```javascript:Object.jsx
export default function Object({ object }) {
  return (
    <ul>
      {Object.entries(object).map(([key, value]) => (
        <li key={key}>{value}</li>
      ))}
    </ul>
  );
}
```

# Props
React và Vue có sự tương đồng trong việc sử dụng props.

```html:Post.vue
<template>
  <h1>{{ title }}</h1>
</template>

<script>
export default {
  props: ['title'],
};
</script>
```

```javascript:Post.jsx
export default function Post({ title }) {
  return <h3>{title}</h3>;
}
```

Có một điểm khác biệt nhỏ là khi truyền props từ cha vào con thì với những value động thì ở Vue sẽ được khai báo với dấu : còn với React sẽ được khai báo trong {}

```html:Post:vue
<template>
  <post-title :title="title" />
</template>

<script>
export default {
  props: ['title'],
};
</script>
```

```Post.jsx
export default function Post({ title }) {
  return <PostTitle title={title} />;
}
```
# Data

Trong VueJS, để khai báo một giá trị trong một Component, ta sẽ viết trong thuộc tính data.
```html:Counter.vue
<template>
  <button @click="count++">
    You clicked me {{ count }} times.
  </button>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  }
};
</script>
```

Với phiên bản ReactJS trước 16.8, ta sẽ phải khai báo state và mỗi khi thay đổi đều phải dùng setState rất bất tiện:
```javascript:App.jsx

class App extends React.Component {
    constructor(props) {
        this.state = {
            count: 0
        }
    }

    onClick(e) {
        this.setState({
            count: this.state.count + 1
        });
    }

    render() {
        return (
            <div>
                <h1>{this.state.count}</h1>
                <button onClick={this.onClick.bind(this)}>Count Up!!</button>
            </div>
        )
    }
}
```

Sau phiên bản 16.8, React có bước cải thiện đáng kể khi sử dụng `useState` hook

```js:Counter.jsx
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```

Ngoài ra VueJS còn một directive để có thể tự động gán giá trị khi ô input fire các event và ngược lại, dữ liệu hiển thị trong ô input được thay đổi khi giá trị đó được tác động vào. Trong Vue gọi đó là two-way binding.
```html:Profile.vue
<template>
  <input type="text" v-model="name" />
</template>

<script>
export default {
  data() {
    return {
      name: 'Viblo'
    }
  }
};
</script>
```

ReactJS không có cơ chế tương tự, chúng ta phải tự viết các function tương ứng cho nên đây là điểm cộng dành cho Vue.

# Computed

Bên cạnh data, VueJS có thêm thuộc tính computed để xử lý các logic dữ liệu khó và cache lại chúng tránh việc render lại không cần thiết.

```html:Message.vue
<template>
  <p>{{ message.split('').reverse().join('') }}</p>
</template>

<script>
export default {
  props: ['message']
};
</script>
```
```js
export default function ReversedMessage({ message }) {
  return <p>{message.split('').reverse().join('')}</p>;
}
```

Thay bằng việc viết toàn bộ logic để hiện thị dữ liệu, ta sử dụng thuộc tính computed để giải quyết.

```html:Message.vue
<template>
  <p>{{ reversedMessage }}</p>
</template>

<script>
export default {
  props: ['message'],

  computed: {
    reversedMessage() {
      return this.message.split('').reverse().join('');
    }
  }
};
</script>
```
Với ReactJS ta sẽ viết như sau

```js:Messange.jsx
export default function ReversedMessage({ message }) {
  const reversedMessage = message.split('').reverse().join('');

  return <p>{reversedMessage}</p>;
}
```
Ngoài ra từ 16.8, ta có thể sử dụng thêm `useMemo` hook để cải thiện hiện năng, `reversedMessage` sẽ được cache lại và chỉ khi nào biến message thay đổi thì mới được tính toán lại.

```javascript:Message.jsx
import { useMemo } from 'react';

export default function ReversedMessage({ message }) {
  const reversedMessage = useMemo(() => {
    return message.split('').reverse().join('');
  }, [message]);

  return <p>{reversedMessage}</p>;
}
```

# Methods

Bất cứ một function nào mà ta muốn sử dụng Component đều phải khai báo trong thuộc tính `Methods`
```html:Button.vue
<template>
  <button onClick="doSomething">
    Do something!
  </button>
</template>

<script>
export default {
  methods: {
    doSomething() {
      // ...
    }
  }
};
</script>
```

Còn với ReactJS, function sẽ được khai báo thẳng trong component
```javascript:Button.jsx
export default function Button() {
  function doSomething() {
    // ...
  }

  return (
    <button onClick={doSomething}>
      Do something!
    </button>
  );
}
```

# Nguồn tham khảo
[https://reactjs.org/docs/getting-started.html](https://reactjs.org/docs/getting-started.html)

[https://vuejs.org/v2/guide/](https://vuejs.org/v2/guide/)

# Tổng kết
Thông qua những ví dụ cơ bản trên, bạn có thể thấy sự tương đồng giữa ReactJS và VueJS. 

Nếu bạn là một con người yêu thích mọi thứ trong một khuôn khổ cũng như không muốn tốn quá nhiều công sức thì VueJS là sự lựa chọn dành cho bạn. Còn ngược lại nếu bạn là một người yêu thích sự thuần tuý của ngôn ngữ JavaScript hay TypeScript thì ReactJS là điểm đến dành cho bạn. :kissing_heart: