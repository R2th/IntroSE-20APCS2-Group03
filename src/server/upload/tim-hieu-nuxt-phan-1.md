Xin chào mọi người, series bài viết này mình xin chia sẻ những kiến thức mà mình đã tìm hiểu về nuxt trong thời gian qua.
Hi vọng có thể giúp ích cho mọi người.

***Lưu ý:** Series bài viết này không tuân theo trình tự nào, nó chỉ xuất hiện ngẫu nhiên khi mà mình đặt tay lên bàn phím.
Với phần 1 này thì mình xin chia sẻ cách import thư viện vào 1 project vue nuxt.*

**Ok, bắt đầu thôi nào**

Mình sẽ chọn em vee-validate để demo trong bài viết này nhé. 

**Bước 1**: Cài em vee-validate này bằng npm (mọi người có thể cài bằng yarn nhé).

>`npm i vee-validate`

**Bước 2**: Tạo 1 file vee-validate.js trong folder plugins.

```
import Vue from 'vue'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate)
```

**Bước 3**: Ở file nuxt.config.js chúng ta thêm dòng code này nhé.

```
export default {
  plugins: ['~/plugins/vee-validate.js'],
}
```

**Bước 4**: Ngắm nhìn thành quả sau khi thêm em nó vào project nào.

Đây là đoạn code html: 
```html
<template>
  <form>
    <div class="login-form">
      <h4 class="login-title">Register</h4>
      <div class="row">
        <div class="col-md-6 col-12 mb-20">
          <label>Name*</label>
          <input
            v-model="user.name"
            v-validate="validate.name"
            name="name"
            class="mb-0"
            type="text"
            placeholder="Name"
          />
          <span class="help is-danger" v-text="errors.first('name')"></span>
        </div>
        <div class="col-md-6 col-12 mb-20">
          <label>Phone number*</label>
          <input
            v-model="user.phone"
            v-validate="validate.phone"
            @keyup="validateNumber"
            maxlength="11"
            name="phone"
            class="mb-0"
            type="text"
            placeholder="Phone number"
          />
          <span class="help is-danger" v-text="errors.first('phone')"></span>
        </div>
        <div class="col-md-6 mb-20">
          <label>Email Address*</label>
          <input
            v-model="user.email"
            v-validate="validate.email"
            name="email"
            data-vv-as="email"
            class="mb-0"
            type="email"
            placeholder="Email Address"
          />
          <span class="help is-danger" v-text="errors.first('email')"></span>
        </div>
        <div class="col-md-6 mb-20">
          <label>Gender</label>
          <select
            v-model="user.gender"
            name="gender"
            data-vv-as="selected"
            class="nice-select"
          >
            <option value="1">Name</option>
            <option value="2">Nữ </option>
            <option value="3">Không xác định</option>
          </select>
        </div>
        <div class="col-md-12 mb-20">
          <b-form-file @change="onChangeInputFile"></b-form-file>
        </div>
        <div class="col-md-6 mb-20">
          <label>Password*</label>
          <input
            ref="password"
            v-model="user.password"
            v-validate="validate.password"
            name="password"
            class="mb-0"
            type="password"
            placeholder="Password"
          />
          <span class="help is-danger" v-text="errors.first('password')"></span>
        </div>
        <div class="col-md-6 mb-20">
          <label>Confirm Password*</label>
          <input
            v-model="user.password_confirmation"
            v-validate="'required|confirmed:password'"
            data-vv-as="password"
            name="password_confirmation"
            class="mb-0"
            type="password"
            placeholder="Confirm Password"
          />
          <span
            class="help is-danger"
            v-text="errors.first('password_confirmation')"
          ></span>
        </div>
        <div class="col-12">
          <button
            :disabled="!isValidForm"
            class="btn btn-primary register-button mt-0"
            @click.prevent="handleRegister"
            >
            <span v-show="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Register
          </button>
        </div>
      </div>
    </div>
  </form>
</template>
```

Đây là đoạn code js:
```javascript
<script>
import { mapActions } from 'vuex'
import { REGEX_VALID_NUMBER } from '@/config'
import { registerUser } from '@/services/users.service'

export default {
  name: "Register",
  data() {
    return {
      loading: false,
      user: {
        name: '',
        phone: '',
        gender: 1,
        email: '',
        password: '',
        password_confirmation: '',
        avatar: '',
      },
    }
  },
  computed: {

    validate() {
      return {
        name: {
          required: true
        },
        phone: {
          required: true,
          regex: REGEX_VALID_NUMBER,
        },
        email: {
          max: 255,
          required: true
        },
        password: {
          min: 8,
          required: true
        }
      }
    },
    isValidForm() {
      return !this.errors.any();
    },
  },
  methods: {
    ...mapActions('app', ['registerUserAction']),

    validateNumber() {
      this.user.phone = this.user.phone && this.user.phone.replace(/\D/g, '');
    },
    handleRegister(e) {
      e.target.blur()
      this.$validator.validate().then(valid => {
        if (valid) {
          this.loading = true
          const user = { ...this.user }
          registerUser(user)
            .then((data) => {
              this.loading = false
              if(data.status === 200) {
                this.$router.replace('/verifyPhone')
              }
            })
            .catch(({ message }) => {
              this.loading = false
              for (let index = 0; index < message.length; index++) {
                this.$toasted.show(message[index].value)
              }
            })
        }
      })
    },
    onChangeInputFile(e) {
      this.user.avatar = e.target.files[0]
    },
  }
}
</script>

```

Kết quả sau khi chạy project: 
![](https://images.viblo.asia/a42a0e0c-411f-490e-a194-2552e6f59902.png)

Oke, đơn giản vậy thôi, đối với các plugins khác mọi người cũng xử tương tự nhé.
Cảm ơn mọi người đã theo dõi bài viết của mình.
Nếu có gì góp ý thì đừng ngần ngại gì comment dưới bài viết này nhé.
Hẹn gặp lại mọi người ở phần 2 nhé.

Tham khảo: https://nuxtjs.org/guide/plugins