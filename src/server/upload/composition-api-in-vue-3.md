Vue hiện tại chưa có ngày phát hành chính thức của phiên bản 3. Nhưng lộ trình hiện tại chúng ta có thể thấy phiên bản alpha được lên kế hoạch vào cuối quý 4 năm 2019 và bản phát hình chính thức vào quý 1 năm 2020.

# Vue 3
Những thay đổi chính mà Vue3 sẽ có:
* :ant: smaller and :running_man: faster
* :star2: tính năng mới
* :construction: exposes lower level APIs
* :airplane: tăng khả năng hỗ trợ TypeScript
* :house: codebase sẽ dễ bảo trì hơn

# Composition API
Composition API là tính năng nâng cao, thêm vào API hiện tại và đặc biệt là một bộ APIs cấp thấp hơn sử dụng các tính năng của Vue bên ngoài các components.

```js
import {ref, computed, watch} from 'vue'
```

# Example new feature
Để hiểu rõ hơn thì chúng ta sẽ đi đến ví dụ của tính năng mới. Composition API bên trong Vue components sử dụng `setup`

`setup` option sẽ có dạng như sau:
```js
new Vue({
    beforeCreate () {

  },
  setup () {
    
  },
  created () {
	
  }
})
```
Chúng ta có thể thấy rằng `setup` option trông giống như là Lifecyycle hooks ? Nhưng thật ra nó tuyệt vời hơn là Lifecycle hooks.

![](https://images.viblo.asia/4b6c7ec7-362f-4405-88f3-22da3d15df1b.gif)

code:

```html:ButtonCounter.vue
<template>
  <button @click="increaseCount">count {{count}} | double {{double}}</button>
</template>
 
<script>
  import {computed, ref} from 'vue'
  export default {
    setup () {
      const count = ref(0)
      const double = computed(() => count.value * 2)
      const increaseCount = () => {
        count.value++
      }
      return {increaseCount, count, double}
    },
    mounted () {
      this.count = 40
      this.increaseCount()
    }
  }
</script>
```

# Why Composition API
## Code Organization
Dưới đây là 1 đoạn code gọi API để lấy các nhân vật khi không sử dụng `setup`
```js
 import axios from 'axios'
  import orderBy from 'lodash.orderby'
  export default {
    data () {
      return {
/* Fetch Resource Feature */        characters: [],
/* Fetch Resource Feature */        loadingState: false,
/* Order Array Feature */           orderKey: 'id'
      }
    },
    computed: {
/* Order Array Feature */      charactersOrdered() {
/* Order Array Feature */        return orderBy(this.characters, this.orderKey)
/* Order Array Feature */      }
    },
    methods: {
/* Fetch Resource Feature */      fetchAll () {
/* Fetch Resource Feature */        this.loadingState = 'loading'
/* Fetch Resource Feature */        axios.get('https://rickandmortyapi.com/api/character')
/* Fetch Resource Feature */          .then(response => {
/* Fetch Resource Feature */            setTimeout(() => {
/* Fetch Resource Feature */              this.loadingState = 'success'
/* Fetch Resource Feature */              this.characters = response.data.results
/* Fetch Resource Feature */            }, 1000)
/* Fetch Resource Feature */       })
      },
/* Order Array Feature */      setOrderKey(key) {
/* Order Array Feature */        this.orderKey = key
/* Order Array Feature */      }
    },
    created () {
/* Fetch Resource Feature */      this.fetchAll()
    }
  }
```

sử dụng `setup`
```js
import axios from 'axios'
  import orderBy from 'lodash.orderby'
  import {computed, ref} from '@vue/composition-api'
 
  export default {
    setup () {
/* Fetch Resource Feature */      const characters = ref([])
/* Fetch Resource Feature */      const loadingState = ref(false)
 
/* Fetch Resource Feature */      const fetchAll = () => {
/* Fetch Resource Feature */        loadingState.value = 'loading'
/* Fetch Resource Feature */        return axios.get('https://rickandmortyapi.com/api/character')
/* Fetch Resource Feature */          .then(response => {
/* Fetch Resource Feature */            loadingState.value = 'success'
/* Fetch Resource Feature */            characters.value = response.data.results
/* Fetch Resource Feature */          })
/* Fetch Resource Feature */      }
/* Order Array Feature */      const orderKey = ref('id')
/* Order Array Feature */      const charactersOrdered = computed(() => {
/* Order Array Feature */        return orderBy(characters.value, orderKey.value)
/* Order Array Feature */      })
 
/* Order Array Feature */      const setOrderKey = (key) => {
/* Order Array Feature */        orderKey.value = key
/* Order Array Feature */      }
      return {characters, loadingState, fetchAll, charactersOrdered, orderKey, setOrderKey} // render context
    },
    created () {
      this.fetchAll()
    }
  }
```

![](https://images.viblo.asia/c9ad5c6d-eca1-4fe0-860e-b67c9738223a.png)
https://vue-composition-api-rfc.netlify.com/#code-organization

Thông qua ví dụ trên chúng ta có thể thấy Code Organization được thể hiện tuần tự từ trên xuống dưới thành 1 nhóm không như Options API được rải rác khắp nơi.
## Logic Reuse
Để thấy được Logic Reuse được thể hiện thế nào khi sử dụng composition API, chúng ta sẽ đến ví dụ sau:

```js
<script>
  import {computed, ref} from 'vue'
  const useCounter = (initial = 0) => {
    const count = ref(initial)
    const double = computed(() => count.value * 2)
    const increaseCount = () => {
      count.value++
    }
 
    return {count, double, increaseCount}
  }
  export default {
    setup () {
      const {increaseCount, count, double} = useCounter(40)
      return {increaseCount, count, double} // render context
    }
  }
</script>
```

Như có thể thấy chúng ta có thể tách đoạn code này ra 1 file khác để tái sử dụng.
```js
  const useCounter = (initial = 0) => {
    const count = ref(initial)
    const double = computed(() => count.value * 2)
    const increaseCount = () => {
      count.value++
    }
 
    return {count, double, increaseCount}
  }
```

### Lợi ích khi sử dụng Logic Reuse
* tái sử dụng các components mà không cần dùng mixins
* Higher Order Components
* Renderless Components
* Tăng khả năng linh hoạt
* mã nguồn code được clear và rõ ràng hơn
* performance

Bạn hãy tưởng tượng chúng ta có 1 components dài, việc tách code cấu trúc nó là điều cần thiết tăng độ làm việc hiệu quả cho team của bạn đỡ phát ngấy chán nản nhìn đống code như thế.

## References
Vue Toronto 
https://vuetoronto.com/videos