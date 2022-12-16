# Lời mở đầu
**JWT** hoặc **JSON Tokens Web** là một phương pháp phổ biến của lưu trữ (**session state**) có thể kiểm chứng một cách an toàn trên `client` mà không cần stateful của máy chủ. Nó rất phổ biến thời gian gần đây cùng với sự phát triển của "serverless" và các ứng dụng web. JWTs là một phần cốt lõi của trạng thái của ứng dụng của bạn, nhưng cả hai đều một token và một phần dữ liệu được phân tách. Vì vậy, làm thế nào để chúng ta sử dụng chúng trong cả hai cách? Dưới đây là một vài mẫu có thể làm việc với các JWTs trong Vue.js.

# VueJS
Chúng ta sử dụng thuộc tính **computed** để tạo **JWT object** khi mà instance **jwt** thay đổi

Với 1 VueJS component đơn giản có nội dung như sau:

```
<template>
  <div>
    <p>JWT: {{jwt}}</p>
    <p>User ID: {{jwtData.sub}}</p>
    <p>Issuer: {{jwtData.iss}}</p>
    <button @click.native="doSomethingWithJWT()">Do Something</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jwt: ''
    }
  },

  computed: {
    // this.jwtData sẽ update khi this.jwt thay đổi.
    jwtData() {
      if (this.jwt) return JSON.parse(atob(this.jwt.split('.')[1]));
      return {};
    }
  },

  methods: {
    async fetchJWT() {
      const res = await fetch(`http://localhost/vuejs-jwt-example/auth?u=username&p=password`);
      this.jwt = await res.text();
    },

    async doSomethingWithJWT() {
      const res = await fetch(`http://localhost/vuejs-jwt-example/do-something`, {
        method: 'POST',
        headers: new Headers({
          Authorization: `Bearer: ${this.jwt}`
        })
      });
    }
  },

  mounted() {
    this.fetchJWT();
  }
}
</script>
```
# Vuex
Nếu bạn sử dụng **Vuex**, bạn có thể sử dụng pattern của Vuex actions và getters

Dưới đây là 1 ví dụ về **Vuex** cho phép bạn fetch **JWT object** và access giữa **string** và **object form**.

```
export const UserModule = {
  state: {
    currentJWT: ''
  },

  getters: {
    jwt: state => state.currentJWT,
    jwtData: (state, getters) => state.currentJWT ? JSON.parse(atob(getters.jwt.split('.')[1])) : null,
    jwtSubject: (state, getters) => getters.jwtData ? getters.jwtData.sub : null,
    jwtIssuer: (state, getters) => getters.jwtData ? getters.jwtData.iss : null
  },

  mutations: {
    setJWT(state, jwt) {
      // Khi this thay đổi, getters và những gì dành buộn tới chúng cũng được update
      state.currentJWT = jwt;
    }
  }

  actions: {
    async fetchJWT ({ commit }, { username, password }) {
      // Thực hiện HTTP request
      const res = await fetch(`http://localhost/vuejs-jwt-example/auth?u=${username}&p=${password}`);
      // gọi mutation method đã được định nghĩa ở trên để cập nhật lại JWT cúa state.
      commit('setJWT', await res.text());
    },
  }
}
```

Mà có thể được sử dụng trong một **component** tương tự như tôi đã viết ở trên:

```
<template>
  <div>
    <p>JWT: {{jwt}}</p>
    <p>User ID: {{jwtSubject}}</p>
    <p>Issuer: {{jwtIssuer}}</p>
    <button @click.native="doSomethingWithJWT()">Do Something</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'jwt',
      'jwtSubject',
      'jwtIssuer'
    ])
  },

  methods: {
    ...mapActions([
      `fetchJWT`
    ]),

    // Đoạn code này không có gì thay đổi so với ví dụ trên cả!
    async doSomethingWithJWT() {
      const res = await fetch(`http://localhost/vuejs-jwt-example/do-something`, {
        method: 'POST',
        headers: new Headers({
          Authorization: `Bearer: ${this.jwt}`
        })
      });
    }
  },

  mounted() {
    this.fetchJWT({
      // Thông tin bảo mật
      username: 'username',
      password: 'password'
    });
  }
}
</script>
```
# Kết luận
Lợi ích của cách tiếp cận hiển thị ở đây là bản thân JWT chỉ được lưu trữ và cập nhật dưới dạng chuỗi.
(Điều này sử dụng cho các yêu cầu API và xác thực)

Thuộc tính computed của VueJS cho phép chúng ta biến đổi điều đó tuy nhiên chúng ta cần mà không yêu cầu bất kỳ sự đồng bộ hóa trạng thái phụ nào.