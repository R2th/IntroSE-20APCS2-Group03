![](https://images.viblo.asia/d5e4fd08-cd73-4065-992b-ac99d149f892.png)

Trước khi Fetch API ra đời, Axios là được coi là HTTP client phổ biến cho các HTTP requests. Tuy nhiên, hiện nay Fetch API được sử dụng nhiều do nó được tích hợp vào hầu hết các browsers "hiện đại", chúng ta có thể sử dụng nó để thực hiện các HTTP requests dễ dàng hơn so với Axios, điều này khiến Axios có thể bị thay thế trong một vài trường hợp.

Trong bài viết này, chúng ta sẽ tìm hiểu về cả hai cách, làm thế nào để sử dụng chúng và đưa ra những lập luận để xem xét về lý do và thời điểm chúng ta nên chọn sử dụng cách nào.

## 1. Fetch API

Fetch API cung cấp một giao diện để fetch resources (trên internet), là một standard API để thực hiện các HTTP requests trên browser. Những ai đã quen thuộc với `XMLHttpRequest` thì khi sử dụng Fetch API sẽ nhận thấy nó những tính năng mạnh mẽ và linh hoạt hơn.

Hỗ trợ tất cả các loại requests, bao gồm **GET, POST, PUT, PATCH, DELETE và OPTIONS,**.

Để thực hiện requests với Fetch API, chúng ta không phải làm bất cứ điều gì. Tất cả những gì chúng ta cần làm là thực hiện request trực tiếp với `fetch` object.

Ví dụ:

```javascript
// App.vue

<template>
  <div id="app">
    {{data}}
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      data: {}
    }
  },
  beforeMount(){
    this.getName();
  },
  methods: {
    async getName(){
      const res = await fetch('https://api.agify.io/?name=michael');
      const data = await res.json();
      this.data = data;
    }
  }
};
</script>
```

Trong đoạn code trên, chúng ta đã thực hiện một requests GET đơn giản từ một API và  convert data từ JSON sang một JavaScript object bằng method `json()`.

Sau đó, hiển thị data của object trực tiếp trên template. Và cũng có thể xử lý response body ở các định dạng khác với Fetch API, bao gồm plain text và binary data.

Giống như hầu hết các HTTP clients, chúng ta có thể gửi headers và bodies requests bằng Fetch API.

Để gửi một requests có HTTP headers, có thể viết như sau:

```javascript
// App.vue

<template>
  <div id="app">
    <img :src="data.src.tiny">
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      data: {
        src: {}
      }
    };
  },
  beforeMount() {
    this.getPhoto();
  },
  methods: {
    async getPhoto() {
      const headers = new Headers();
      headers.append(
        "Authorization",
        "api_key"
      );
      const request = new Request(
        "https://api.pexels.com/v1/curated?per_page=11&page=1",
        {
          method: "GET",
          headers,
          mode: "cors",
          cache: "default"
        }
      );
      const res = await fetch(request);
      const { photos } = await res.json();
      this.data = photos[0];
    }
  }
};
</script>
```

Trong đoạn code trên, chúng ta đã sử dụng `Headers` constructor, được sử dụng để thêm requests headers vào các Fetch API requests.

Các method `append` thêm vào của `Authorization` header đến requests.

Chúng ta đã set `mode` để `cors` cho một cross-domain requests và `headers` được set để các `headers` object được trả về bởi các `Headers` constructor.

Ảnh sau đó được hiển thị trên template.

Để tạo requests body, có thể viết như sau:

```javascript
<template>
  <div id="app">
    <form @submit.prevent="createPost">
      <input placeholder="name" v-model="post.name">
      <input placeholder="title" v-model="post.title">
      <br>
      <button type="submit">Create</button>
    </form>
    {{data}}
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      post: {},
      data: {}
    };
  },
  methods: {
    async createPost() {
      const request = new Request(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          mode: "cors",
          cache: "default",
          body: JSON.stringify(this.post)
        }
      );
      const res = await fetch(request);
      const data = await res.json();
      this.data = data;
    }
  }
};
</script>
```

Trong đoạn code trên, chúng ta đã thực hiện request bằng cách sử dụng stringifying `this.post` object và gửi nó với request POST.

Sau đó, chúng ta nhận được response giống như cách chúng ta đã làm bên trên và hiển thị nó.

Bạn có thể thấy, không quá khó để tạo requests với Fetch API đâu nhỉ và nó đã được tích hợp vào hầu hết các trình duyệt.

## 2. Axios

Axios là một HTTP client phổ biến hoạt động trên cả trình duyệt và Node.js app.
Bạn có thể tìm đọc tại [đây](https://github.com/axios/axios) để biết thêm nhiều hơn về axios.

Chúng ta có thể cài đặt nó bằng cách chạy:

```markdown
npm i axios
```

Sau đó có thể sử dụng để thực hiện các requests. Ví dụ một request GET đơn giản như sau:

```javascript
// App.vue

<template>
  <div id="app">{{data}}</div>
</template>
<script>
const axios = require("axios");
export default {
  name: "App",
  data() {
    return {
      data: {}
    };
  },
  beforeMount(){
    this.getName();
  },
  methods: {
    async getName(){
      const { data } = await axios.get("https://api.agify.io/?name=michael");
      this.data = data;
    }
  }
};
</script>
```

Trong đoạn code trên, chúng ta gọi method `axios.get` với URL `"https://api.agify.io/?name=michael"` để thực hiện request.

Sau đó, gán response data cho một object.

Nếu muốn tạo request với headers, có thể viết:

```javascript
// App.vue

<template>
  <div id="app">
    <img :src="data.src.tiny">
  </div>
</template>
<script>
const axios = require("axios");
export default {
  name: "App",
  data() {
    return {
      data: {}
    };
  },
  beforeMount() {
    this.getPhoto();
  },
  methods: {
    async getPhoto() {
      const {
        data: { photos }
      } = await axios({
        url: "https://api.pexels.com/v1/curated?per_page=11&page=1",
        headers: {
          Authorization: "api_key"
        }
      });
      this.data = photos[0];
    }
  }
};
</script>
```

Trong đoạn code trên, chúng ta đã thực hiện request GET với Pexels API key với `axios` method, nó có thể được sử dụng để thực hiện bất kỳ loại request nào.

Nếu không có requests nào khác được chỉ định, thì nó sẽ mặc định là request GET.

Như chúng ta thấy, đoạn code ngắn hơn một chút vì không phải tạo một object với `Headers` constructor

Nếu  muốn đặt cùng một header trong nhiều requests, có thể sử dụng request interceptor để đặt header hoặc config khác cho tất cả các requests.

Chúng ta có thể viết lại ví dụ trên như sau:

```javascript
// main.js

import Vue from "vue";
import App from "./App.vue";
const axios = require("axios");
axios.interceptors.request.use(
  config => {
    return {
      ...config,
      headers: {
        Authorization: "api_key"
      }
    };
  },
  error => Promise.reject(error)
);
Vue.config.productionTip = false;
new Vue({
  render: h => h(App)
}).$mount("#app");
```

```javascript
// App.vue
<template>
  <div id="app">
    <img :src="data.src.tiny">
  </div>
</template>
<script>
const axios = require("axios");
export default {
  name: "App",
  data() {
    return {
      data: {}
    };
  },
  beforeMount() {
    this.getPhoto();
  },
  methods: {
    async getPhoto() {
      const {
        data: { photos }
      } = await axios({
        url: "https://api.pexels.com/v1/curated?per_page=11&page=1"
      });
      this.data = photos[0];
    }
  }
};
</script>
```
Mình đã chuyển header vào `main.js` bên trong code cho interceptor.

Đối số đầu tiên được truyền vào `axios.interceptors.request.use` là một function để sửa đổi config request cho tất cả các requests.

Và đối số thứ 2 là một error handler để xử lý lỗi của tất cả các requests.

Tương tự như vậy, cũng có thể config các interceptors cho các responses.

Để thực hiện một requests POST với một request body, có thể sử dụng method `axios.post`.

```javascript
// App.vue

<template>
  <div id="app">
    <form @submit.prevent="createPost">
      <input placeholder="name" v-model="post.name">
      <input placeholder="title" v-model="post.title">
      <br>
      <button type="submit">Create</button>
    </form>
    {{data}}
  </div>
</template>
<script>
const axios = require("axios");
export default {
  name: "App",
  data() {
    return {
      post: {},
      data: {}
    };
  },
  methods: {
    async createPost() {
      const { data } = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        this.post
      );
      this.data = data;
    }
  }
};
</script>
```
Chúng ta thực hiện request POST bằng method `axios.post` với request trong đối số thứ hai.

Sau đó, lấy lại response data bằng cách get `data` property từ response.

## 3. Kết luận

Fetch API và Axios tương tự nhau về nhiều mặt. Cả hai đều được tích hợp dễ dàng vào các VueJS apps và về bản chất, cả hai đều có thể giúp chúng ta hoàn thành tốt công việc.

Nếu bạn đang làm việc trên nhiều requests, bạn sẽ thấy rằng Fetch đòi hỏi bạn viết nhiều code hơn Axios, ngay cả khi setup những thứ cần thiết cho nó. Do đó, đối với các requests đơn giản, Fetch API và Axios là khá giống nhau. Tuy nhiên, đối với các requests phức tạp hơn, Axios tốt hơn vì nó cho phép bạn định cấu hình nhiều requests ở một nơi.

### Reference

* [Requests in VueJS: Fetch API and Axios — A Comparison](https://blog.bitsrc.io/requests-in-vuejs-fetch-api-and-axios-a-comparison-a0c13f241888?source=---------9-----------------------)

* [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

* [Axios](https://github.com/axios/axios)