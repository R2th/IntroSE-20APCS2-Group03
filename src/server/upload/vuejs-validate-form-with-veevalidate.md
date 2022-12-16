#### Lời mở đầu
Trong bài viết này, mình sẽ hướng dẫn mọi người validate form với `VeeValidate`.

#### Install VeeValidate
Để cài đặt, các bạn chạy câu lệnh phía dưới
```javascript
# NPM
npm install vee-validate --save


# Yarn
yarn add vee-validate


```
Sau khi cài đặt xong, các bạn mở file main.js lên và thêm code phía dưới vào
```javascript
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';

// install rules
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
```
các bạn chạy thêm lệnh dưới để cài thêm boostrap vào dùng cho nhanh
```javascript
npm i bootstrap-vue
```
sau khi cài xong các bạn thêm boostrap vào như file bên dưới
```javascript
import Vue from "vue";
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import App from "./App.vue";

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// install rules
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

// Install components globally
Vue.use(BootstrapVue);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
```
#### Create Form with Bootstrap in Vue
Bây giờ chúng ta tạo một form dùng boostrap
```javascript
<template>
    <b-form @submit.prevent="handleSubmit">
        <b-form-group label="Name">
            <b-form-input
              type="text"
              v-model="user.name"
              placeholder="Enter name">
            </b-form-input>
        </b-form-group>

        <b-form-group label="Email">
            <b-form-input
              type="email"
              v-model="user.email"
              placeholder="Enter email">
            </b-form-input>
        </b-form-group>

        <b-form-group label="Mobile">
            <b-form-input
              type="text"
              v-model="user.mobile"
              placeholder="Enter mobile no">
            </b-form-input>
        </b-form-group>

        <b-form-group label="City">
          <b-form-select v-model="user.city">
            <option value="">Choose</option>
            <option value="CA">Los Angeles</option>
            <option value="IL">Chicago</option>
            <option value="LA">New Orleans</option>
            <option value="NM">Santa Fe</option>
          </b-form-select>
        </b-form-group>

        <b-form-group label="Password">      
            <b-form-input v-model="user.password" type="password" placeholder="Enter password">
            </b-form-input>
        </b-form-group>

        <b-form-group label="Confirm Password">
            <b-form-input v-model="user.confirmation" type="password"></b-form-input>
        </b-form-group>

        <b-form-group>
          <b-form-checkbox-group v-model="user.hobbies">
            <b-form-checkbox value="Reading">Reading</b-form-checkbox>
            <b-form-checkbox value="Gyming">Gyming</b-form-checkbox>
            <b-form-checkbox value="Movies">Movies</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>

      <b-button block type="submit" variant="primary">Submit</b-button>
    </b-form>
</template>

<script>
export default {
  data: () => ({
    user:{
        name: '',
        email: '',
        mobile: '',
        city: '',
        password: '',
        confirmation: '',
        hobbies: []
    }
  }),
  methods: {
    handleSubmit () {
      console.log(this.user);
    }
  }
};
</script>

<style lang="scss">
form {
   max-width: 500px;
   margin: 0 auto; 
   text-align: left;
}
.col-form-label {
    font-weight: 600;
}
</style>
```
#### Vue Form Validation with VeeValidate
Chúng ta đã đăng ký `ValidationProvider` trong file `main.js`. `VeeValidate` hỗ trợ rất nhiều `rules` để chúng ta sử dụng để validate, các bạn vào link [tại đây](https://vee-validate.logaretm.com/v4/guide/global-validators#available-rules) để xem thêm.

Bây giờ file sẽ như thế này
```javascript
<template>
<ValidationObserver ref="observer">
    <b-form slot-scope="{ validate }" @submit.prevent="validate().then(handleSubmit)">
      <ValidationProvider rules="required" name="Name">
        <b-form-group slot-scope="{ valid, errors }" label="Name">
            <b-form-input
              type="text"
              v-model="user.name"
              :state="errors[0] ? false : (valid ? true : null)"
              placeholder="Enter name">
            </b-form-input>
            <b-form-invalid-feedback>
              {{ errors[0] }}
            </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>

      <ValidationProvider rules="required|email" name="Email">
        <b-form-group 
          slot-scope="{ valid, errors }"
          label="Email">
            <b-form-input
              type="email"
              v-model="user.email"
              :state="errors[0] ? false : (valid ? true : null)"
              placeholder="Enter email">
            </b-form-input>
            <b-form-invalid-feedback>
              {{ errors[0] }}
            </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>

      <ValidationProvider rules="required" name="Mobile">
        <b-form-group 
          slot-scope="{ valid, errors }"
          label="Mobile">
            <b-form-input
              type="text"
              v-model="user.mobile"
              :state="errors[0] ? false : (valid ? true : null)"
              placeholder="Enter mobile no">
            </b-form-input>
            <b-form-invalid-feedback>
              {{ errors[0] }}
            </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>

      <ValidationProvider name="City" rules="required">
        <b-form-group slot-scope="{ valid, errors }" label="City:">
          <b-form-select 
            :state="errors[0] ? false : (valid ? true : null)" 
            v-model="user.city">
            <option value="">Choose</option>
            <option value="CA">Los Angeles</option>
            <option value="IL">Chicago</option>
            <option value="LA">New Orleans</option>
            <option value="NM">Santa Fe</option>
          </b-form-select>
            <b-form-invalid-feedback>
              {{ errors[0] }}
            </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>

      <ValidationProvider rules="required" name="Password" vid="password">
        <b-form-group 
          slot-scope="{ valid, errors }"
          label="Password">      
            <b-form-input
              type="password"
              v-model="user.password"
              :state="errors[0] ? false : (valid ? true : null)"
              placeholder="Enter password">
            </b-form-input>
            <b-form-invalid-feedback>
              {{ errors[0] }}
            </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>

      <ValidationProvider rules="required|confirmed:password" name="Confirm Password">
        <b-form-group 
          slot-scope="{ valid, errors }"
          label="Confirm Password">
            <b-form-input
              type="password"
              v-model="user.confirmation"
              :state="errors[0] ? false : (valid ? true : null)">
            </b-form-input>
            <b-form-invalid-feedback>
              {{ errors[0] }}
            </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>

      <ValidationProvider name="Hobbies" rules="required|length:1">
        <b-form-group slot-scope="{ valid, errors }">
          <b-form-checkbox-group 
            :state="errors[0] ? false : (valid ? true : null)" 
            v-model="user.hobbies">
            <b-form-checkbox value="Reading">Reading</b-form-checkbox>
            <b-form-checkbox value="Gyming">Gyming</b-form-checkbox>
            <b-form-checkbox value="Movies">Movies</b-form-checkbox>
          </b-form-checkbox-group>
          <b-form-invalid-feedback>
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>

      <b-button block type="submit" variant="primary">Submit</b-button>
    </b-form>
</ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data: () => ({
    user:{
        name: '',
        email: '',
        mobile: '',
        city: '',
        password: '',
        confirmation: '',
        hobbies: []
    }
  }),
  methods: {
    handleSubmit () {
      // pass validate  
      console.log(this.user);
    }
  }
};
</script>

<style lang="scss">
form {
   max-width: 500px;
   margin: 0 auto; 
   text-align: left;
}
.form-group > label {
    font-weight: 600;
}
</style>
```
Bây giờ các bạn mở trình duyệt lên và xem nhé.

Bạn nào muốn `custom message` thì làm như dưới đây
```javascript
import { extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules'; // Bạn xem link trên để xem tất cả rules

extend('required', {
    ...required,
    message: 'Message custom',
});
```
Khi này tất cả những thằng nào mà `required` thì sẽ đk đổi thành message mà mình vừa custom.
#### Tổng kết
Ok! Vậy là mình vừa giới thiệu xong cho các bạn một package validate form. Nó làm cho việc validate trở nên siêu dễ dàng.

Nếu có chỗ nào sai xót mong các bạn comment để cho mình biết mình sửa và hẹn các bạn ở các bài viết tiếp theo :heart_eyes::heart_eyes: