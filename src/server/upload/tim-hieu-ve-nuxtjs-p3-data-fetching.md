## 1. Mở đầu
<hr>

Chào mừng các bạn đến với phần ba trong loạt bài viết tìm hiểu về `NuxtJS`. Trong hai phần trước, chúng ta đã cùng nhau tìm hiểu về cách cài đặt, cấu trúc folder mặc định của project NuxtJS đồng thời chúng ta cũng đi qua hai khái niệm đầu tiên đó là Routing và Middleware. Trong bài viết ngày hôm nay chúng ta sẽ cùng tìm hiểu về `data fetching` trong NuxtJS.

## 2. Data fetching
<hr>

Trước đây khi làm việc với VueJS thông thường thì khi truy cập vào một trang trong dự án ta sẽ cần gọi API để lấy dữ liệu tương ứng cho trang đó. Để làm được việc này thì ta sẽ thực hiện việc fetching dữ liệu trong  trong hàm `mounted()` như sau:
```js
<template>
  <div>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
      users: []
    }
  },
  mounted () {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(response => (this.users = response.data));
  }
}
</script>
```
Tuy nhiên với cách làm như trên thì nó sẽ phù hợp với ứng dụng thuộc dạng `client-side-rendering` còn với `server-side-rendering` thì NuxtJS cung cấp cho chúng ta hai hàm khác lần lượt là `asyncData()` và `fetch()`. Bằng việc fetch data qua hai hàm này thì trang web của chúng ta mới render ra được đầy đủ nội dung html ngay từ trên server thay vì render phía client.

### a. asyncData

 Với `asyncData()` thì cú pháp sẽ như sau:
```js
<template>
  <div>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData () {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')

    return {
      users: data
    }
  },
}
</script>
```
Kết quả thu về là tương tự với việc dùng `mounted()` nhưng khác ở chỗ lúc này việc gọi API và render ra giao diện của bạn đã được thực hiện bên phía server và trả về cho các bạn kết quả cuối cùng. Còn với `mounted()` thì việc gọi API và render giao diện sẽ thực hiện ở phía client. Nếu bạn đã biết về khác nhau giữa `client-side-rendering` và `server-side-rendering` thì sẽ hiểu rõ phần này còn nếu chưa thì bạn có thể tìm kiếm trong các bài viết khác. Nếu bạn để ý kỹ thì trong ví dụ sử dụng `asyncData()` mình không cần phải định nghĩa lại phần `data()` nữa vì bất cứ nội dung gì mà bạn return trong `asyncData()` sẽ được merge vào với local state trong page của bạn. Với vi dụ sử dụng `asyncData()` khi bạn inspect bằng VueDevTool sẽ thấy trong phần data của component cũng có phần `users`:

![](https://images.viblo.asia/678c4861-d844-46a2-9834-e1d746171cc1.png)

Nếu bạn đã định nghĩa thêm nội dung khác trong đây như sau:
```js
<script>
import axios from 'axios'

export default {
  async asyncData () {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')

    return {
      users: data
    }
  },
  data() {
    return {
      testString: 'Hi'
    }
  }
}
</script>
```
Thì kết quả sẽ là:

![](https://images.viblo.asia/742bea68-bb64-4ad9-b5cf-ea34607076c1.png)

Vì ở đây dữ liệu cuối cùng của bạn thu được là local state của VueJS nên bạn có thể thoải mái biến đổi `users` theo ý bạn. Ngoài ra, `asyncData` còn cung cấp cho chúng ta một số tham số đầu vào tuy nhiên tạm thời chúng ta sẽ chỉ quan tâm đến một số tham số là: 
- `params`: chi phép các bạn truy cập vào các tham số tryền trên url. Ví dụ bạn có url là `users/1` và tên page của bạn đang là `pages/users/_id.vue` thì bạn có thể dùng `params.id` để lấy giá trị `1` kia về phục vụ cho việc lấy dữ liệu tương ứng 
- `query`: cho phép bạn lấy các query trên url như `users?name=phuc` thì bạn có thể sử dụng `query.name` để lấy giá trị `phuc` về phục vụ cho việc lấy dữ liệu tương ứng
- `store`: cho phép bạn truy cập vào Vuex store trong ứng dụng Nuxt của bạn. Với biến `store` này bạn có thể thực hiện đầy đủ các thao tác như `commit`, `dispatch`dữ liệu đến store của dự án.

Ngoài ra còn rất nhiều các tham số khác và cụ thể các bạn có thể xem chi tiết ở [đây](https://nuxtjs.org/docs/2.x/internals-glossary/context).

Giả sử chúng ta có 2 page lần lượt là `index` và `user` với nội dung lần lượt như sau:
```html
// index.vue
<template>
    <nuxt-link to="user">User Page</nuxt-link>
</template>
```

```html
// user.vue
<template>
  <div>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData (context) {
    console.log(context)
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')

    return {
      users: data
    }
  },
}
</script>
```
Khi ở bên trang `index` và chúng ta bấm vào link để chuyển quan trang `user` thì khi bạn sử dụng hàm `asyncData` để fetch dữ liệu thì trên trình duyệt sẽ như sau:

![](https://images.viblo.asia/f6f4faee-c4fd-404a-a5b4-dab77705286a.gif)

Bạn để ý sẽ thấy xuất hiện 1 thanh loading sẽ chạy và đồng thời sẽ chỉ chuyển qua trang `/user` khi mà hàm `asyncData()` đã chạy xong và có dữ liệu trả về. Nếu bạn thử với việc dùng `mounted()` thì kết quả sẽ khác:

![](https://images.viblo.asia/40b2db69-2e78-49fa-89af-bf8e8f1398d3.gif)

Ở đây ngay khi chúng ta bấm vào link để chuyển trang thì ta cũng lập tức được chuyển qua trang user và ở bên trang này mới diễn ra việc fetching dữ liệu về đồng thời ta cũng không nhận được hiệu ứng loading khi chuyển trang nữa. Thêm một lưu ý nữa với hàm `asyncData` là ở đây chúng ta sẽ không sử dụng được từ khóa `this` và `asyncData` chỉ có thể được sử dụng trong cá file VueJS nằm trong folder `page/`. Một điểm nữa khá hay về `asyncData` là nếu việc gọi API trong đây xảy ra lỗi thì nó sẽ được tự động xử lý bằng việc hiển thị ra page lỗi mặc định của NuxtJS (bạn có thể custom lại) thay vì hiển thị ra lỗi trắng trang hay gì đó:

![](https://images.viblo.asia/8cffcaf7-5ed2-4347-91c2-55838de24091.gif)


### b. fetch

Ngoài cách sử dụng `asyncData` như nói trên thì Nuxt còn cung cấp cho chúng ta thêm một hàm khác đó chính là `fetch()`. Về cú pháp sẽ như sau:
```html
<template>
  <div>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      users: []
    }
  },
  async fetch () {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')
    this.users = data
  }
}
</script>
```
Khác với `asyncData` thì trong `fetch` bạn có thể sử dụng `this` thoải mái ví dụ như việc update state trực tiếp như trong ví dụ nói trên. Vì thế ở đây bạn sẽ không thấy `fetch` có bất cứ tham số nào truyền vào bởi nếu bạn muốn tấy các giá trị từ url như params hay query thì có thể truy cập thông qua `this.$route.params` hay `this.$route.query`. Tuy nhiên ở đây bạn cũng sẽ phải định nghĩa local state trước khi có thể update nó bằng dữ liệu lấy về từ API trên server chứ không phải tự động merge như việc dùng `asyncData`. Thêm một điểm nữa là khi bạn chuyển từ trang index sang trang user sử dụng `fetch` thì nó sẽ hoạt động khá giống với `mounted` là chuyển trang ngày lập tức rồi mới gọi API và đồng thời không có hiệu ứng loading:

![](https://images.viblo.asia/40b2db69-2e78-49fa-89af-bf8e8f1398d3.gif)

Nhưng khác với `mounted` là `fetch` hoạt động được ở mode `server-side-rendering`. Thêm nữa `fetch()` có thể sử dụng bất cứ component nào bạn mong muốn chứ không nhất thiết phải sử dụng trong `page/` như `asyncData`. Một điểm nữa bạn cần lưu ý khi sử dụng fetch đó là nó sẽ không tư hiển thị trạng thái loading và xử lý lỗi nếu xảy ra cho bạn như `asyncData` mà sẽ bị trắng trang:

![](https://images.viblo.asia/f4c5bf79-faeb-4fbe-bdb8-115d9631142b.gif)

Tuy nhiên khi bạn sử dụng `fetch()`  thì nó sẽ cung cấp cho bạn thêm biến đặc biệt là `$fetchState` bao gồm:
- `$fetchState.pending`: với giá trị là true/ false thể hiện cho việc hàm fetch đã chạy xong hay chưa
- `$fetchState.erorr`: với giá trị mặc định là null hoặc ErrorObject nếu có lỗi xảy ra
- `$fetchState.timestamp`: là biến chứa thời gian cuối cùng hàm fetch được gọi

Bằng cách sử dụng biến `$fetchState` ta sẽ cập nhật lại template trong trường hợp sử dụng `fetch()` như sau:

```html
<template>
  <div>
    <p v-if="$fetchState.pending">
      Fetching data...
    </p>
    <div v-else-if="$fetchState.error">
      <p>An error occurred :(</p>
      <pre>{{ $fetchState.error }}</pre>
    </div>
    <ul v-else>
      <li v-for="user in users" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>
```

Lúc này kết quả mà chúng ta thu được sẽ là:

![](https://images.viblo.asia/a6834f4b-0df9-4a39-be0f-bdc28597a787.gif)

Ngoài ra, nếu bạn sử dụng `fetch()` thì bạn còn được cung cấp thêm một số option riêng như:
```js
export default {
  async fetch () {
    ...
  },
  
  fetchOnServer: false // Mặc định là true, nếu bạn để false thì việc fetch dữ liệu sẽ được diễn ra dưới client
  fetchDelay: 200 // milisecond, thời gian delay giữa mỗi lần gọi fetch trong component đó
}
```

### c. asyncData hay fetch

Như chúng ta vừa nói ở trên thì mặc định ta sẽ có hai cách đề lấy dữ liệu cho mode `server-side-rendering` tuy nhiên theo cá nhân mình nếu bạn không có nhu cầu gì đặc biệt như sử dụng `this` khi fetch dữ liệu thì hãy sử dụng `asyncData` để được nó sử lý cho toàn bộ trạng thái loading và error nếu có. Còn ngược lại nếu bạn có nhu cầu riêng mà `asyncData` không đáp ứng được thì lúc này hãy sử dụng đến `fetch`.

### d. Watch query

Như bạn thấy thì mỗi hàm `asyncData` hay `fetch` sẽ được sử dụng để lấy dự liệu tử server trước khi trả về giao diện cho người dùng. Tất nhiên dữ liệu bạn lấy về sẽ còn phụ thuộc vào cả các tham số từ url như `query` cho chứng nằng tìm kiếm và filter chẳng hạn. Nhưng mặc định khi query trên url của bạn thay đổi thì `asyncData` và `fetch` sẽ không tự động được gọi lại mà để làm được điều này ta cần thêm một option đặc biệt  vào trang của chúng ta như sau:

```js
export default {
    watchQuery: true // Dùng trong trường hợp bạn muốn gọi lại API nếu có bất cứ query trên url nào thay đổi
}
```
Hoặc:

```js
export default {
    watchQuery: ['name', 'page'] // Dùng trong trường hợp bạn muốn gọi lại API cho một số query nhất định
}
```

## 3. Kết bài
<hr>

Phần 3 của loạt bài viết liên quan đến NuxtJS của mình đến đây là kết thúc, hẹn gặp lại các bạn trong các phần tiếp theo. Bạn cùng đừng quên để lại một upvote để ủng hộ mình nhé.