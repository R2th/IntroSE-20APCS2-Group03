# I. Mở đầu.

Trong bài này mình sẽ giới thiệu cách viết unit test bằng các tool unit test chính chủ từ VueJS và framework Jest.

vue-test-utils, một thư viện VueJS testing chính thức dựa trên avoriaz. Nó cung cấp tất cả các tool cần thiết giúp viết unit test trong ứng dụng VueJS một cách dễ dàng. Bên cạnh đó, Jest là một testing framework được xây dựng bởi Facebook, giúp testing nhanh vượt trội với nhiều features tuyệt vời như:

- Hầu như không có config mặc định
- Interactive Mode rất “cool”
- Chạy test song song
- Các spy, stub và mock mới ra mắt
- Built trên code coverage
- Snapshot testing
- Các tiện ích module mocking
- Tất nhiên bạn có thể viết test mà không dùng tool này và chỉ cần dùng karma + mocha + chai + sinon + …, nhưng rồi bạn sẽ thấy nó dễ dàng như thế nào.

# II. Demo.
## 1. Set up một project mẫu vue-test 

Hãy bắt đầu bằng một project mới dùng vue-cli :


```php
npm install -g vue-cli
vue init webpack vue-test
cd vue-test
```

Cài jest-vue-preprocessor:

```php
npm i -D jest jest-vue-preprocessor babel-jest
```

Cần phải cài jest-vue-preprocessor để jest đọc được cái file .vue, và cần babel-jest để hợp nhất với Babel.

Cài vue-test-utils:

```php
npm i -D vue-test-utils
```

Thêm cấu hình Jest vào package.json:

```php
...
"jest": {
  "moduleNameMapper": {
    "^vue$": "vue/dist/vue.common.js"
  },
  "moduleFileExtensions": [
    "js",
    "vue"
  ],
  "transform": {
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
    ".*\\.(vue)$": "<rootDir>/node_modules/jest-vue-preprocessor"
  }
}
...
```

ModuleFileExtensions sẽ chỉ cho Jest extension nào để tìm, và transform sẽ chỉ preprocessor nào để dùng cho các file extension.

Cuối cùng, thêm test script vào package.json:

```php
{
  "scripts": {
    "test": "jest",
    ...
  },
  ...
}
```

## Testing một Component


Ở đây tôi sẽ dùng các Single File Component, và tôi vẫn chưa check xem nó có hoạt động không nếu tách chúng ra các file html, css hoặc js riêng, vì thế cứ xem như là bạn cũng làm luộn việc này.

Đầu tiên tạo một MessageList.vue component trong src/components:
```php
 
<template>
    <ul>
        <li v-for="message in messages">
            {{ message }}
        </li>
    </ul>
</template>
 
<script>
export default {
  name: 'list',
  props: ['messages']
}
</script>
 ```
 
 Và update App.vue để dùng nó như sau:
 
 ```php
 <template>
  <div id="app">
    <MessageList :messages="messages"/>
  </div>
</template>
 
<script>
import MessageList from './components/MessageList'
 
export default {
  name: 'app',
  data: () => ({ messages: ['Hey John', 'Howdy Paco'] }),
  components: {
    MessageList
  }
}
</script>
```

Chúng ta đã có một vài component để test. Hãy tạo một folder test  trong project root, và một App.test.js:

```php
import Vue from 'vue'
import App from '../src/App'
 
describe('App.test.js', () => {
  let cmp, vm
 
  beforeEach(() => {
    cmp = Vue.extend(App) // Create a copy of the original component
    vm = new cmp({
      data: { // Replace data value with this fake data
        messages: ['Cat']
      }
    }).$mount() // Instances and mounts the component
  })
 
  it('equals messages to ["Cat"]', () => {
    expect(vm.messages).toEqual(['Cat'])
  })
})
```

Bây giờ nếu ta chạy npm test (hoặc npm t cho nhanh), test sẽ chạy và pass. Vì chúng ta vẫn còn điều chỉnh test, nên chạy nó trên watch mode:

```php
npm t -- --watch
```

### Vấn đề của các nested component (component chồng component)
Bài test này quá đơn giản. Hãy check cả output ban đầu và output dự kiến. Chúng ta có thể sử dụng feature Snapshots của Jest, có thể cho ra snapshot của output và đối chiếu nó với những lần run tới. Add thêm với it:

```php
it('has the expected html structure', () => {
  expect(vm.$el).toMatchSnapshot()
})
```

Nó sẽ tạo ra một file test/__snapshots__/App.test.js.snap. Mở và xem file này có gì:

```php
 
// Jest Snapshot v1, https://goo.gl/fbAQLP
 
exports[`App.test.js has the expected html structure 1`] = `
<div
  id="app"
>
  <ul>
    <li>
      Cat
    </li>
  </ul>
</div>
`;
 ```
 
 Để ý kĩ bạn sẽ thấy, có một vấn đề rất lớn ở đây: component MessageList  cũng đã bị render. Các unit test phải được test theo mỗi unit riêng lẻ, nghĩa là trong App.test.js chúng ta muốn test component App và không quan tâm đến những thứ khác.

Nó có thể bắt nguồn từ nhiều lý do. Tưởng tượng xem, các component con đó (trong trường hợp này là MessageList) sẽ gây ra nhiều side effect trên created hook, ví dụ như gọi fetch, một Vuex action hoặc các thay đổi state? Chắc chắn chúng ta không hề muốn nó xảy ra.

May thay, đã có Shallow Rendering!

### Shallow Rendering là gì?
Shallow Rendering là một kĩ thuật đảm bảo rằng component của bạn được render mà không có component con đi kèm. Nó có lợi ích sau:

Chỉ test component bạn muốn test (vậy mới gọi là Unit Test)
Tránh các side effect của các component con, như thực hiện các HTTP call, calling store actions,…

## Testing Component bằng vue-test-utils
vue-test-utils cung cấp cho chúng ta Shallow Rendering trong số các features. Chúng ta có thể viết lại test trước như sau:

```php
import { shallow } from 'vue-test-utils'
import App from '../src/App'
 
describe('App.test.js', () => {
  let cmp
 
  beforeEach(() => {
    cmp = shallow(App, { // Create a shallow instance of the component
      data: {
        messages: ['Cat']
      }
    })
  })
 
  it('equals messages to ["Cat"]', () => {
    // Within cmp.vm, we can access all Vue instance methods
    expect(cmp.vm.messages).toEqual(['Cat'])
  })
  ```
  
  Sau đó nếu như bạn vẫn đang chạy Jest trong watching mode, bạn sẽ thấy nó vẫn qua bài test, nhưng Snapshot thì không tương thích. Nhấn u để generate lại lần nữa. Hãy mở và check lại:
  
  ```php
 
// Jest Snapshot v1, https://goo.gl/fbAQLP
 
exports[`App.test.js has the expected html structure 1`] = `
<div
  id="app"
>
  <!--  -->
</div>
`;
```

Bạn thấy không? Không có component con nào được render và App component được test hoàn toàn tách biệt khỏi bộ component. Ngoài ra, nếu bạn có bất kỳ created hay các hook nào đó trong các component con, chúng cũng không được call nhé.

Nếu bạn tò mò về Shallow render được implement như thế nào, check source code và ta thấy rằng căn bản đó là components key, method render và các lifecycle hook.

Tương tự như vậy, bạn có thể áp dụng MessageList.test.js test như sau:

```php
import { shallow } from 'vue-test-utils'
import MessageList from '../src/components/MessageList'
 
describe('MessageList.test.js', () => {
  let cmp
 
  beforeEach(() => {
    cmp = shallow(MessageList, {
      // Beaware that props is overriden using `propsData`
      propsData: {
        messages: ['Cat']
      }
    })
  })
 
  it('has received ["Cat"] as the message property', () => {
    expect(cmp.vm.messages).toEqual(['Cat'])
  })
 
  it('has the expected html structure', () => {
    expect(cmp.element).toMatchSnapshot()
  })
})
 
```

III. Kết luận.
Như vậy mình đã giới thiệu cách viết Vue.js Component Unit Test với Jest trong phần tiếp theo mình sẽ tiếp tục giới thiệu về cách test Vue.js Components deep render trong Jest.

Link tham khảo: https://alexjover.com/blog/write-the-first-vue-js-component-unit-test-in-jest/