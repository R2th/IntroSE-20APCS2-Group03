# Cài đặt Project
Để cài đặt môi trường test không khó, trong version trước của VueJS CLI ta phải làm việc đó bằng tay nhưng bây giờ thì chỉ bằng 1 câu lệnh

Và chắc chắn là bạn đã cài đặt VueJS CLI trên máy bằng cách sau:

```
$ npm install -g @vue/cli
# Hoặc
$ yarn global add @vue/cli
$ vue --version
```

Tạo mới project sử dụng CLI như sau:

```
$ vue create testing-vue

> Manually select features
> Babel, Linter / Preformatter, Unit Testing
> ESLint (your preference)
> Lint on save
> Jest
> In dedicated config files

$ cd testing-vue
$ code .
$ npm run serve 
```

# Testing

Chúng ta đã có VueJS  project sử dụng Jest. Và chúng ta đi tới foler **tests/unit**. Trong folder có 1 file có tên là  `example.spec.js:`

```js
import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
```

Như được tham chiếu bên trong `package.json`. Chúng ta có thể chạy thử **Unit Test** này bằng cách chạy lệnh sau:

```
$ npm run test:unit
```

Lệnh này sẽ trả về kết quả của tất cả các unit test trong project.

Ta có thể thêm flag **--watch** để chạy `realtime` khi chúng ta tạo hoặc sửa unit test

```
"scripts": {
  "test:unit": "vue-cli-service test:unit --watch"
}
```

# Unit Testing

Trong 1 một ví dụ khác, chúng ta tạo 1 component có tên là `FancyHeading`.
**Component** này sẽ đại diện cho một tiêu đề có thể được tùy chỉnh với một tiêu đề và màu sắc bằng cách sử dụng **props**.

```html
<template>
  <h1 :style="headingStyles">{{title}}</h1>
</template>

<script>
export default {
  data() {
    return {
      headingStyles: {
        color: this.color
      }
    };
  },
  props: ["title", "color"]
};
</script>
```

Đầu tiên chúng ta cần phải tạo file test tương ứng có tên là `FancyHeading.spec.js` trong folder `tests/unit`.

Chúng ta hãy cùng xem unit test đầu tiên của chúng ta với **Jest** và **Vue**. 

```js
import Vue from 'vue';
import FancyHeading from '@/components/FancyHeading.vue';

function mountComponentWithProps (Component, propsData) {
  const Constructor = Vue.extend(Component);
  const vm = new Constructor({
    propsData
  }).$mount();

  return vm.$el;
}

describe('FancyHeading.vue', () => {
  it('should be the correct color', () => {
    const headingData = mountComponentWithProps(FancyHeading, { color: 'red' });
    const styleData = headingData.style.getPropertyValue('color');

    console.log(styleData)

    expect(styleData).toEqual('blue');
  });

  it('should have the correct title', () => {
    const headingData = mountComponentWithProps(FancyHeading, { title: 'Hello, Vue!' });
    const titleData = headingData.textContent;

    expect(titleData).toEqual('Hello, Vue!');
  });
});
```

Sau đó ta  chạy lệnh 

```
npm run test:unit --watch
```

chúng ta sẽ thấy kết quả của **unit test** trên. :D

# Tham khảo
Và để biết thêm thông tin về Testing trong VueJS bạn có thể tham khảo bài viết [Karma and Mocha guide](https://alligator.io/vuejs/unit-testing-karma-mocha/) của **Joshua Bemenderfer.**.