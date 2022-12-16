![](https://images.viblo.asia/7461c639-8754-4a3a-80da-3ce26a5a9002.jpg)
## Giới thiệu về state trong vuex
Nếu như bạn đã từng làm việc với ReactJS thì chắc hẳn cũng đã từng nghe tới Redux, một thư viện giúp bạn quản lí trạng thái (state) của application. Nó được thiết kế dựa trên Flux, nhưng giảm bớt khó khăn thường gặp phải khi viết một ứng dụng Flux. Và Vuex là một thư viện của Vuejs có chức năng cũng tương tự như Redux. 
Hiểu đơn giản state là trạng thái của ứng dụng. Mỗi một action trong 1 ứng dụng đều có 1 trạng thái. VD: 
Khi bạn sử dụng chức năng Signin của trang [https://medium.com/](https://medium.com/)  state tương ứng với mỗi action như sau:
```
state.status = "" //Khởi tạo khi load page
state.status = "loading" //Khi click button login đợi gửi request
state.status = "success" //Khi gọi API thành công và trả về dữ liệu
state.status = "error" //Khi gọi API bị lỗi
```
![](https://images.viblo.asia/c37a4567-5193-482e-a8f3-8055b7c2d8ad.pnhttps://images.viblo.asia/011eb7f9-9c9e-46ef-acc7-bb07a27a0448.pngg)
* State là dữ liệu bắt đầu của ứng dụng.
* View sẽ thay đổi tương ứng với state.
* Action là cách mà thay đổi state dựa vào tương tác người dùng từ view.
Tuy nhiên, mô hình này bị phá vỡ khi chúng ta có rất nhiều các component cùng dùng chung, chia sẻ state. Đó là lý do chúng ta cần Vuex để có thể quản lý đc trạng thái của ứng dụng.
#### Quản lý state
![](https://images.viblo.asia/84ccef8c-d2db-44c2-896d-76cd72068540.jpg)

Nguồn: medium.com

Mình sẽ giải thích qua 1 đoạn code trong demo của mình tương ứng với những khái niệm trong hình:

![](https://images.viblo.asia/011eb7f9-9c9e-46ef-acc7-bb07a27a0448.png)

* (1: state) Khởi tạo state.status = "" trong modules `register/index.js` 
```
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
  status: ''
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
```
Trong file này sẽ import actions, getters và mutations trong module register.
* (2 Vue Component) Truy cập vào component với 1 form signup đơn giản (ứng với 2)
```
<template>
  <div class="register-container">
    <div class="register-title">
      <p>{{ $t("lang.views.signup.title") }}</p>
    </div>
    <form class="space-reset" @submit.prevent="signup">
     ----------------------------
    </form>
    <div class="signup-with-oauth">
      <p class="register__sub-title">{{ $t("lang.views.signup.social_accounts.title") }}</p>
      <button class="loginBtn btn-ful loginBtn--facebook">
        {{ $t("lang.views.signup.social_accounts.facebook") }}
      </button>
      <button class="loginBtn btn-ful loginBtn--google">
        {{ $t("lang.views.signup.social_accounts.google") }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data () {
    return {
      title: 'Signup',
      email: '',
      password: ''
    }
  },
  head: {
    title: function () {
      return {
        inner: this.title
      }
    }
  },
  methods: {
    signup: function () {
      this.$validator.validateAll().then((result) => {
        const {email, password} = this
        if (result) {
          this.$store.dispatch('register/registerRequest', {email, password, social_type: 'email'})
        }
      })
    }
  },
  computed: {
    registerStatus () {
      return this.$store.getters['register/registerStatus']
    }
  }
}
</script>
```
Ở đây trạng thái ứng dụng chính là lúc khởi tạo. `status=""`
Trong component register có 1 methods là nơi giao tiếp giữa component với action.
 mình sử dụng dispatch để truyền params sang action tương ứng `register/registerRequest`
* (3: action) `register/actions.js` 
```
import registerService from '@/services/api/register'

export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_ERROR = 'REGISTER_ERROR'

export default {
  [REGISTER_REQUEST]: ({commit}, params) => {
    commit(REGISTER_REQUEST)
    try {
      const response = registerService.register(params)
      commit(REGISTER_SUCCESS)
      return Promise.resolve(response.data)
    } catch (e) {
      commit(REGISTER_ERROR, e.response)
    }
  }
}
```
Ở action mình có sử dụng 1 service `registerService` để gọi api lên backend server side(4).
* (5: mutations) 
Như đã nói ở trước, mutations là nơi thay đổi trạng thái của ứng dụng
```
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_ERROR } from './actions'

export default {
  [REGISTER_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [REGISTER_SUCCESS]: (state) => {
    state.status = 'success'
  },
  [REGISTER_ERROR]: (state) => {
    state.status = 'error'
  }
}
```
Ở đây mình có 3 trạng thái là loading, success và error.
* Ngoài ra `getters.js` là nơi để lấy dữ liệu từ state về để phục vụ việc hiển thị hoặc tính toán trên componient.
```
export default {
  registerStatus: state => state.status
}
```
Luồng dữ liệu cơ bản chỉ vậy nhưng để project có thể phát triển trơn tru phù hợp khả năng mở rộng bạn nên tuân thủ theo đúng các nguyên tác viết code, VD: để thay đổi trạng thái thì phải viết trong mutations, để thực hiện việc gọi api trong actions.... :D!
Bài này mình viết theo trải nghiệm thực tế qua việc học vuejs và vuex. Ở loạt bài sau sẽ chuyên sâu hơn!

Tài liệu tham khảo: [https://medium.com/codingthesmartway-com-blog/vue-js-2-state-management-with-vuex-introduction-db26cb495113](https://medium.com/codingthesmartway-com-blog/vue-js-2-state-management-with-vuex-introduction-db26cb495113)