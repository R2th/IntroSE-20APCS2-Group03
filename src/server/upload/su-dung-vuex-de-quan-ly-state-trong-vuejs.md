Nếu bạn đã từng phát triển ứng dụng **single page** có quy mô lớn, thì có thể bạn sẽ biết tới khái niệm quản lý trạng thái (**state management**), Như là **Flux**, được phát bởi Facebook thông qua Redux.

Thì trong bài viết này mình sẽ hướng dẫn **pattern** trên trong VueJS sử dụng **VueX** 

# Cài đặt
Vuex, bạn có thể cài thông qua **yarn** hoặc **npm**.

```
# Yarn
$ yarn add vuex
# NPM
$ npm install vuex --save
```

Sau đó, phải enable **Vuex plugin** trong ứng dụng Vue của bạn.

```
main.js
=======================================

import Vue from 'vue';
import Vuex from 'vuex';
import App from 'App.vue';

Vue.use(Vuex);

new Vue({
  el: '#app',
  render: h => h(App)
});
```

# Khởi tạo Store

Để có thể sử dụng những tính năng hay ho của Vuex, đầu tiên bạn phải tạo 1 **global store object**.

Nó không thể được truy cập hoặc sửa đổi trực tiếp để đảm bảo trạng thái nhất quán và cho phép theo dõi các thay đổi.

```
store.js
======================================

export const store = new Vuex.Store({
  state: {
    safelyStoredNumber: 0
  }
});
```

Bây giờ, để access tới Store, bạn sẽ phải import nó vào tất cả các **components** hoặc có thể đưa nó vào file **main.js** để tự động import cho mọi **components** khác trong ứng dụng. 

```
main.js
=======================================

import Vue from 'vue';
import Vuex from 'vuex';
import App from 'App.vue';
import { store } from './store.js';

Vue.use(Vuex);

new Vue({
  store,
  el: '#app',
  render: h => h(App)
});
```

# Getters

Chắc ai cũng biết đến Getter, nó sẽ lấy các giá trị của state trong Store. Trong components, nó có thể được truy cập thông qua **$$store.getters.property** như là 1 thuộc tính, không phải là một hàm. Nếu getter cần một tham số, nó có thể trả về một hàm thứ hai nhận tham số.

```
store.js
=====================================

export const store = new Vuex.Store({
  state: {
    safelyStoredNumber: 0
  },
  getters: {
    safelyStoredNumber: state => state.safelyStoredNumber,
    storedNumberMatches(state) {
      return matchNumber => {
          return state.safelyStoredNumber === matchNumber;
      }
    }
    // Cách ngắn gọn hơn:
    // storedNumberMatches: state => matchNumber => state.safelyStoredNumbers === matchNumber
  }
});
```

Tuy nhiên, cách dễ dàng để truy cập vào các getters trong components của bạn là thông qua phương thức **mapGetters**  của Vuex. Điều này cho phép bạn gắn getters vào các thuộc tính ở mức cao nhất trong component của bạn.

```
App.vue
=========================================

<template>
  <p>The safely stored number: {{safelyStoredNumber}}<p>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'safelyStoredNumber'
    ])
  }
}
</script>
```

# Thay đổi State

## Mutations

Cách duy nhất để có thể thay đổi state trong Vuex là bằng cách “commit” một sự thay đổi. Vuex mutation tương tự như là event: mỗi một thay đổi có có type và handler.

Chúng ta có thể sử dụng **this.$store.commit(‘mutationName’, payload).**

```
store.js
=======================================

export const store = new Vuex.Store({
  state: {
    safelyStoredNumber: 0
  },
  ...
  mutations: {
    incrementStoredNumber(state) {
      state.safelyStoredNumber++;
    },
    setStoredNumber(state, newNumber) {
      state.safelyStoredNumber = newNumber;
    }
  }
});
```

Như getters, Vuex cũng có một phương thức tiện lợi cho các **mutations** trong component, **mapMutations** helper method. Nó cho phép bạn mount các mutations dưới dạng các phương thức trong component.

```
App.vue
=======================================================

<template>
  <p>The safely stored number: {{safelyStoredNumber}}<p>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  ...
  methods: {
    ...mapMutations([
      // "incrementStoredNumber" mutation thành `this.incrementStoredNumber()`.
      'incrementStoredNumber',
      // "setStoredNumber" mutation thành `this.setStoredNumber(newNumber)`.
      'setStoredNumber'
    ])
  }
}
</script>
```

## Asynchronous Actions

Tương tự như với mutation nhưng có một vài khác biệt. **Action** là hoạt động bất đồng bộ (asynchronous) còn **mutations** là hoạt động đồng bộ (**synchronous**). Do **Vuex** học tập thiết kế luồng dữ liệu một chiều (one way data flow) từ các hệ thống như Flux, Redux … do đó mutations là các hoạt động đồng bộ và một chiều để thay đổi dữ liệu state. **Actions** thường là nơi chứa các hành động như lấy dữ liệu từ API hay một hành động làm thay đổi dữ liệu trong CSDL (thêm, sửa, xóa)

**Actions** được sử dụng trong các components: **this.$ store.dispatch(‘actionName’, payload).then(response => {}).**

Để thay đổi state trong action sử dụng **context.commit(‘mutationName’, payload)**. 

```
store.js
==============================================

import myRemoteService from './my-remote-service.js'

export const store = new Vuex.Store({
  state: {
    safelyStoredNumber: 0
  },
  ...
  actions: {
    async setNumberToRemoteValue(context) {
      context.commit('setStoredNumber', await myRemoteService.getRemoteValue());
      return Promise.resolve();
    },
  }
});

```

Phương thức đối với các actions, (có thể được gọi là mapActions) được sử dụng giống như mutations.

```
<template>
  <p>The safely stored number: {{safelyStoredNumber}}<p>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  ...
  methods: {
    ...mapActions([
      // Mount action "setNumberToRemoteValue" thành `this.setNumberToRemoteValue()`.
      'setNumberToRemoteValue',
    ])
  }
}
</script>
```

# Module hóa
Vì là **Vuex** sử dụng một cây **state** nên tất cả **state** của ứng dụng dược chứa đựng bên trong một đối tượng lớn. Tuy nhiên khi mà ứng dụng mở rộng lên thì kho chứa (**store**) có thể phình lên rất nhiều. Để giải quyết vấn đề này, Vuex cho phép chúng ta chia nhỏ những store ra trong module. Mỗi module đều có thể chứa đựng **states**, **mutations**, **actions**, **getters** hay cả những module lồng nhau.

```
my-store-module.js
======================================

export const myModule = {
  namespaced: true,
  state: {
    myModularizedNumber: 0
  },
  getters: {
    myModularizedNumber: state => state.myModularizedNumber
  },
  mutations: {
    setModularizedNumber(state, newNumber) {
      state.myModularizedNumber = newNumber
    }
  }
}
```

```
store.js
======================================

import { myModule } from './my-store-module.js';

export const store = new Vuex.Store({
  modules: {
  	myModule
  },
  state: {
    safelyStoredNumber: 0
  },
  ...
});
```

Bạn có thể lồng các **modules** trong **modules**. Ngoài ra, mapGetters, mapMutations và mapActions tất cả sẽ lấy tham số đầu tiên để làm **module namespace**, để tránh viết code như bên dưới:

```
...mapGetters([
  'myModule/nestedModule/subNestedModule/exampleGetter',
  'myModule/nestedModule/subNestedModule/anotherGetter',
])
```
Và đây là cách viết khác:
```
...mapGetters('myModule/testedModule/subNestedModule', [
  'exampleGetter',
  'anotherGetter'
])
```
Hy vọng là bài viết này sẽ giúp các bạn hiểu hơn về **state management** sử dụng Vuex!