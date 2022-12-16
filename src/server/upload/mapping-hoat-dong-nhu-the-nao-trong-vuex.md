Quản lý state trong ứng dụng Vue thực sự rất là khó, đặc biệt là khi có quá nhiều state. Và Vuex là một thư viện được sinh ra để quản lý state cho các ứng dụng Vue. giúp đơn giản hóa quá trình đó, nhưng đồng thời nó cũng có thể làm ứng dụng của chúng ta trở nên cồng kềnh hơn, và khi đó chúng ta cần thiết phải sử dụng đến **mapping**.

**Mapping** trong Vuex giúp chúng ta sử dụng được nhiều properties của store (state, getters, actions, và mutations) trong các  Vue Component. Trong bài viết này, chúng ta sẽ cùng nhau tìm hiểu cách sử dụng mapping để map data từ store Vuex tới các Vue Component nhé.

Bắt đầu thôi :+1::+1::+1:

# **Tại sao lại cần Mapping ?**
Như đã giải thích ở trên, Vuex cho phép chúng ta quản lý state trong các ứng dụng Vue và cung cấp một store để giữ các properties như state, getters, actions, and mutations. Dưới đây là ví dụ về một store trong Vuex :

```javascript
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    products: [],
  },
  mutations: {
    setProduct() {},
  },
  getters: {
    getProduct() {},
  },
  actions: {
    FETCH_PRODUCTS() {}
  },
});
```

Để truy cập các items ở state trong các Vue Component , chúng ta sử dụng thuộc tính  computed :
```javascript
computed: {
    getProducts(){
      return this.$store.state.products
    }
}
```

Mặc dù dùng phương pháp này để xử lý dữ liệu có vẻ hiệu quả đối với hầu hết các ứng dụng nhưng nó lại có một nhược điểm: khi ứng dụng của chúng ta trở nên lớn hơn,code có thể trở nên cồng kềnh khi chúng ta đưa thêm dữ liệu vào ứng dụng . Ví dụ như sau:

```javascript
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    products: [],
    cart: [],
    notifications: []
    product: null
  },
  mutations: {
    setProduct() {},
    setCart() {},
    setNotificationStatus(id) {}
  },
  getters: {
    getProduct() {} 
    getCartTotalPrice() {},
    getCartItemTotal() {}
    getNotifications() {}
  },
  actions: {
    SET_PRODUCT() {},
    SET_CART() {},
    FETCH_PRODUCTS(){},
    SET_NOTIFICATION_STATUS() {}
  },
});
```

Nếu chúng ta cần tất cả đống dữ liệu này trong một component, thì thằng computed cũng sẽ trở nên khá cồng kềnh:

```javascript
computed: {
  getProducts(){
.    return this.$store.state.products
  }
  getCart(){
    return this.$store.state.cart
  }
  getProduct(){
    return this.$store.state.product
  }
  getNotifications(){
    return this.$store.state.notifications
  }
  getCartTotalPrice(){
    return this.$store.getters.getCartTotalPrice
  }
  getCartItemTotal(){
    return this.$store.getters.getCartItemTotal
  }
},
methods: {
   setProduct: function() {
      this.$store.commit('setProduct');
    },
    setCart: function() {
      this.$store.commit('setCart');
    },
    setNotificationStatus: function(notificaionId) {
      this.$store.commit('setProduct', notificationId);
    }
    fetchProducts: function() {
      this.$store.dispatch('FETCH_PRODUCTS');
    }
}
```

**Mapping** cho phép chúng ta cấu trúc code tốt hơn bằng cách binding các store properties  (state, getters, actions, và mutations) với các computed properties để chúng ta có thể sử dụng các properties này trực tiếp trong state và tiết kiệm thời gian.

# Mapping State
State là một đại diện trong ứng dụng của chúng ta tại bất kỳ thời điểm nào và nó chứa dữ liệu như là object, array, string, v.v. Vuex sử dụng một state tree duy nhất để giữ tất cả các state cung cấp cho ứng dụng của chúng ta.

Vậy thì điều gì sẽ xảy ra khi chúng ta có "quá nhiều state" trong các Vue Component của mình. Vuex cung cấp một helper function được gọi **mapState** để giải quyết vấn đề này. Nó được sử dụng để mapping các state properties trong store với computed properties trong các component của chúng ta.

```javascript
import { mapState } from 'vuex'
export default{
    computed: {
        ...mapState([
            'products','product','cart','notifications'
        ])
    }
}
```

Helper mapState trả về một object chứa state trong store. State này sau đó có thể được truy cập trong các component bằng cú pháp **{{products}}**.

Chúng ta cũng có thể đặt tên cho state được mapState trả về bằng cách trả về một object thay vì một array như sau:

```javascript
import {mapState} from 'vuex'
export default{
    computed: {
        ...mapState({
          // using an arrow function
          productList: (state) => state.products,
          // passing the string value is the same as state => state.cart
          cartList: 'cart'
        })
    }
}
```

Đoạn code của chúng ta trở nên rõ ràng và dễ đọc hơn so với việc tạo các mehtods riêng lẻ để trả về các state properties :

```javascript
computed: {
  getProducts(){
    return this.$store.state.products
  }
  getCart(){
    return this.$store.state.cart
  }
  getProduct(){
    return this.$store.state.product
  }
  getNotifications(){
    return this.$store.state.notifications
  }
},
```

Lưu ý rằng mapState chỉ nên được sử dụng khi chúng ta có nhiều dữ liệu trong state. Làm vậy để tránh các vấn đề về bộ nhớ và hiệu suất về lâu dài.

# Mapping Getters

Mapping getters tương tự như Mapping state. Getters cung cấp một cách để lấy computed state từstore ví dụ như một hàm trả về products dựa trên mức độ phổ biến. Vuex cũng cung cấp một helper function là mapGetters để Mapping getters tới các local computed properties:

```javascript
import {mapGetters} from 'vuex'
export default{
    computed: {
        ...mapGetters([
            'getProduct' ,
            'getCartTotalPrice',
            'getCartItemTotal',
            'getNotifications'
        ])
    }
}
```
mapGetters trả về một object của getters từ store. Chúng ta cũng có thể đặt tên cho getters bằng cách sử dụng một object thay vì một array :

```javascript
import {mapGetters} from 'vuex'
export default{
    computed: {
        ...mapGetters({
            singleProduct: 'getProduct' ,
            cartTotalPrice: 'getCartTotalPrice',
            cartTotalItems: 'getCartItemTotal',
            notifications: 'getNotifications'
        })
    }
}
```

# **Mapping Mutations**

Các Mutations là điểm khác biệt của Vuex với các thư viện quản lý state khác vì chúng giúp thay đổi state trong store bằng cách tạo Mutations thay vì sử dụng các reducer function :

```javascript
methods: {
    setProduct: function(todo) {
      this.$store.commit('setProduct');
    },
    setCart: function(todo) {
      this.$store.commit('setCart');
    },
    setNotificationStatus: function(notificationId) {
      this.$store.commit('setProduct', notificationId);
    }
  }
```
Các Mutations cũng có thể được Mapping bằng cách sử dụng hàm helper mapMutations nhưng không giống như states và getters, các mutations được mapping tới methods chứ không phải computed properties :

```javascript
import { mapMutations } from 'vuex';
export default {
  methods: {
    ...mapMutations([
      'setProduct', // maps this.setProduct to this.$store.commit('setProduct')
      'setCart', // maps this.setCart to this.$store.commit('setCart')
      // this accepts a payload
      'setNotificationStatus', // maps this.setCart to this.$store.commit('setNotificationStatus', notificationId),
    ]),
  },
};
```

Chúng ta cũng có thể đặt tên cho các mutations bằng cách passing một object thay vì một array :

```javascript
import { mapMutations } from 'vuex';
export default {
  methods: {
    ...mapMutations({
      addProduct: 'setProduct',
      addProductToCart: 'setCart',
      markNotification: 'setNotificationStatus'
    }),
  },
};
```

# Mapping Actions

Các Mapping Actions rất giống với các mutations vì các actions cũng được mapping tới methods chứ không phải computed properties. Sự khác biệt chính giữa actions và mutations là actions commit mutations và chúng không đồng bộ:

```javascript
import { mapActions } from 'vuex';
export default {
  methods: {
    ...mapActions([
      'SET_PRODUCT', // maps this.SET_PRODUCT() to this.$store.dispatch('SET_PRODUCT')
      'SET_CART', // maps this.SET_CART() to this.$store.dispatch('SET_CART')
      'FETCH_PRODUCTS', // maps this.FETCH_PRODUCTS() to this.$store.dispatch('FETCH_PRODUCTS'),
    ]),
  },
};
```

Chúng ta cũng có thể đặt tên cho actions :

```javascript
import { mapActions } from 'vuex';
export default {
  methods: {
    ...mapActions({
      setProduct: 'SET_PRODUCT',
      setCart: 'SET_CART',
      fetchProducts: 'FETCH_PRODUCTS', 
    }),
  },
};
```

Các mutations và actions được mapping có thể được sử dụng trong các template giống như cách các mutations và actions khác được sử dụng:

```
<button v-on:click="setCart">Add to Cart</button>
```

# Kết luận

Trong bài viết này, chúng ta đã xem xét khái niệm Mapping trong Vuex và cách nó có thể giúp bạn cấu trúc code của mình một cách tốt hơn. Một điều cần lưu ý là Mapping có lợi khi một component cần sử dụng nhiều store properties thôi nhé.

Chúc mọi người code it bug hơn :laughing::laughing::laughing:

Bài viết của mình đến đây là kết thúc rồi, nếu thấy hay, đừng ngại ngần mà cho mình một **like**, **share** hay một **upvote** nhé :heart_eyes::heart_eyes::heart_eyes: