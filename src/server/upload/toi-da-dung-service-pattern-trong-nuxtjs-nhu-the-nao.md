## Giới thiệu

Trong quá trình làm VueJS NuxtJS hay thậm chí là Laravel mình cũng hay áp dụng các pattern như Service hoặc Repository. 
Mình cũng đã trải nghiệm qua thằng Angular, và thực sự nó support các pattern này khá tốt và theo khuôn khổ. Với VueJS hay Nuxt thì các dev sẽ phải cần có kinh nghiệm và tự dựng bằng tay
Bài viết này mình mong muốn chia sẻ về cách sử dụng Service pattern trong NuxtJS mình hay làm nhằm phục vụ cho việc xử lý logic nghiệp vụ.

## Lý do nên dùng?

- Thứ nhất là mình sẽ tạch độc lập việc xử lý logic nghiệp vụ ra, code vừa đẹp vừa rõ ràng dễ maintaince.
- Áp dụng Factory pattern được trơn tru hơn, nếu được sẽ có dịp mình viết về thằng này.
- Vì nó độc lập... sẽ dễ tái sử dụng hơn.
- Việc viết test đơn giản hơn.

Chung quy lại thì mình thấy khi mình maintaince các dự án có và không có các pattern như trên thì toàn gặp 1 vấn đề
<strong>Thay vì tôi phải sửa lại 1 file thì tôi lại phải sửa hàng chục file</strong>

## Triển khai qua ví dụ

- Ở ví dụ này, mình sẽ lấy 1 thực thể Product làm demo và trong dự án sẽ sử dụng axios để phục vụ cho việc call API (  hoặc có thể thêm cả VueX ) 
- Trước hết tại thư mục plugins mình sẽ có 1 file kiểu như sau 

```javascript
// plugins/services.js

export default ({$axios}, inject) => {
  inject('getProducts', async (query) => await $axios.get('endpoint_url', {
    query
  }))
 
  inject('storeProduct', async (data) => await $axios.post('endpoint_url', data))
}
```

- Trong Vue component mình có thể sử dụng nó như sau 

```javascript

<script>
  export default {
    name: 'ProductComponent',
    async mounted() {
      // accessing $getProducts service using this
      const { data } = this.$getProducts({price: '50000'})

      // accessing $storeProduct service
      const { data } = this.$storeProduct({
        name: 'awesome product'
      })

    }
  }
</script>
```

- Hoặc khi sử dụng với Vuex

```javascript
export default {
  actions: {
    async getProducts({ commit }) {
      const { data } = this.$getProducts({price: '50000'})
      commit('GET_PRODUCT_MUTATION', data)
    },
    async storeProduct({ commit }, { data }) {
      const { data } = this.$storeProduct(data)
      commit('STORE_PRODUCT_MUTATION', data)
    },
  }
}
```

## Triển khai case thực tế

- Ok bên trên là ví dụ về triển khai 1 services, trong trường hợp ở các case thực tế chúng ta có thể tham khảo cách triển khai như sau

```sh
// Struct folder

pages
services
  |_AxiosConfig.js
  |_Index.js
  |_ProductService.js
  |_OrderService.js
   ...
```

- Trong `AxiosConfig.js` sẽ tiến hành trả về 1 instance axios 

```javascript
import axios from 'axios';

const client = url =>
  axios.create({
    baseURL: url,
    withCredentials: false,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

export default client;
```

- Trong mỗi services chúng ta sẽ tiền hành inject client vào
```javascript
// plugins/services/ProductService.js
import client from './AxiosConfig';

const baseUrl = 'https://api...'

export default {
  getProducts: async  (query) => {
    return await client(baseUrl).get('endpoint_url', {
      query
    })
  },
  storeProduct: async  (data) => {
    return await client(baseUrl).post('endpoint_url', data)
  }
}
```

- Và giờ là lúc ta đăng ký các Service vào trong file `services/Index.js`

```javascript
import productService from './services/ProductService'

export default (inject) => {
  const allMethods = {
    ...productService(),
    // another service
  }
  const methods = Object.keys(allMethods)
  methods.forEach((method) => {
    inject(method, allMethods[method])
  })
}
```

...
Và sau đó là gọi trong asyncData hoặc MapGetters bla bla v....v =)))

## Kết bài
- Trên đây là các cách mình hay thực hiện, nếu các bạn có các cách khác hãy comment ở dưới bài viết để mọi người cùng nghiên cứu và chia sẻ nhé ^_^
- LƯU Ý: Sẽ có nhiều bạn sau khi đọc xong kiểu : Ủa sao nhìn nó giống Repository Pattern vậy ta?? Ờm thực ra mình chỉ ví dụ về việc call API thôi còn thực ra mình cũng ghi rõ là giải quyết logic nghiệp vụ =)) có nghĩa là sau này khi chỉ quan tâm tới việc call API thì chúng ta có thể lồng Repository Pattern vào đó và mình muốn sẽ chia sẻ trong 1 bài viết khác giữa 2 thằng này !
- Thanks for reading !