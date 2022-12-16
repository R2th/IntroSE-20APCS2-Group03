Nếu dự án hiện tại hoặc dự án sắp tới của bạn sử dụng Nuxt với version lớn hơn v2.13 thì có lẽ bạn nên bắt đầu chuyển sang sử dụng runtime config mới của Nuxt thay vì sử dụng module @nuxtjs/dotenv đấy.

# What are environment variables
Đầu tiên có lẽ cũng cần phải giới thiệu sơ qua về biến môi trường. 

Trong các ứng dụng front end, chúng ta thường xuyên phải sử dụng APIs và các ứng dụng, thư viện của bên thứ ba, các third-party này thông thường sẽ yêu cầu chúng ta phải có các dữ liệu để config, thông thường các thông tin đó được đặt trong biến môi trường (environment variables). Và dĩ nhiên, các thông tin trong biến môi trường đôi khi rất nhạy cảm, do đó chúng không nên được hiển thị trên giao diện người dùng trên browser, vi người dùng có thể sẽ truy cập để sử dụng nó. Thay vào đó, chúng ta thường sẽ lưu trữ các thông tin nhạy cảm như keys, secretssecrets... trong các CI tools có mật khẩu bảo vệ hoặc trong các môi trường triển khai (deployment pipelines), do đó, cần phải có 1 nơi để lưu trữ các biến môi trường này.

# Misconceptions
Suy nghĩ thông thường là các secret keys sẽ được giữ an toàn nếu đặt trong một nơi nào đó nằm ngoài source code, ví dụ như file `.env`, nó làm bạn rất dễ bị lộ các secret keys khi gửi các bundles về client-side. Thường thì file `.env` sẽ được đưa vào `.gitignore` để tránh push lên cùng với code. Tuy nhiên file `.env` không được mã hoá, vì vậy mà việc lưu trữ các keys bí mật trong đó không giúp tăng cường tính bảo mật mà nó chỉ giúp che đậy các dữ liệu nhạy cảm. 

# Why we need webpack
Các ứng dụng `isomorphic` (hoặc còn có tên gọi là `universal`) là ứng dụng chạy cả trên môi trường server lẫn browser. Babel được sử dụng để compile code JS hiện đại sang JS ES5 để nó có thể chạy được trên tất cả các nền tảng. Node.js là một môi trường thực thi javascript bất đồng bộ, có thể được sử dụng trong các môi trường ngoài browser và chạy được code dưới dạng module.

Việc sử dụng các module trong Node.js được thực hiện bằng các sử dựng `require` (ví dụ `require('lodash')`). Tuy nhiên trình duyệt vẫn chưa thực sự hỗ trợ các module, do đó vẫn phải cần môt công cụng bundling như webpack để chuyển các modules thành các file code mà browser có thể đọc được. Về cơ bản, webpack giúp cho việc phát triển ứng dụng ở client-side trở nên giống với node về mặt sử dụng module. Điều đó nghĩa là các câu lệnh `require` hoặc câu lệnh `import` của ES6 sẽ hoạt động tương tự nhau. Và đối với lập trình front end thì các ứng dụng không chỉ có javascript mà còn có HTML, CSS, images... tất cả chúng đều có thể được import (require) bằng việc sử dụng các webpack loaders.

# How environment variables work
Vào thời điểm thực thi, Node.js tự động load các biến môi trường vào `process.env` nên các biến môi trường này sẽ có thể sử dụng trong app. Các tham chiếu đến biến môi trường sẽ được thay thế bằng các giá trị thực của nó. Ví dụ, nếu bạn có một biến `API_SECRET=my-secret`, khi đó trong ứng dụng của bạn, những chỗ nào đang sử dụng `process.env.API_SECRET` sẽ bị đổi thành string `my-secret`. 

Các giá trị sẽ được đọc trong quá trình build app và tồn tại bên trong webpack bundle (phần source sau khi build bằng webpack). Nên nếu chúng ta đổi giá trị biến `API_SECRET` chúng ta sẽ phải build lại ứng dụng để nạp lại giá trị mới của biến môi trường vào bản build.

# Introducing the Nuxt.js runtime config
Với __Nuxt.js 2.13+__ chúng ta có runtime config và được tích hợp dotenv sẽ cung cấp tính bảo mật tốt hơn và tăng tốc thời gian phát triển. Có 2 options mới được đưa vào `nuxt.config.js` file sẽ cho phép chúng ta đưa các config runtime, và các config này sẽ được access qua `$config` từ context. Trước đây, mặc dù đã có option `env`, nhưng runtime config sẽ giúp thêm biến môi trường vào context mà không cần phải rebuild để update giá trị khi làm việc với môi trường development hoặc server-side rendering haowjc single-page  applications. Tuy nhiên với các trang static, bạn sẽ cần phải build lại để thấy được sự thay đổi.

```nuxt.config.js
export default {
  publicRuntimeConfig: {},
  privateRuntimeConfig: {}
}
```

## The new runtime config values are:
- `publicRuntimeConfig` nên chứa tất cả các biến env mà có thể public ra bên ngoài frontend. Ví dụ các public URLs, version...
- `privateRuntimeConfig` nên chứa các biến môi trường có tính private mà nó ko nên bị lộ ở phần frontend. Ví dụ như các secret tokens...

  ⚠️  `privateRuntimeConfig` luôn luôn overrides `publicRuntimeConfig` trên server-side. `$config` trên server mode sẽ là `{...publicRuntimeConfig, ...privateRuntimeConfig}`, nhưng dưới client mode sẽ chỉ là `{...privateRuntimeConfig}`.

# Migrating to the Nuxt.js runtime config from @nuxtjs/dotenv
Nếu bạn đã cài module `@nuxtjs/dotenv` thì bạn có thể remove nó đi bằng cách gỡ nó khỏi `package.json` và remove khỏi `nuxt.config` file. Sau đó chuyển sang dùng Nuxt.js runtime config bằng cách thêm 2 thuộc tính mới vào `nuxt.config.js` file, rồi thêm các biến môi trường từ `.env` file vào thuộc tính public và private tương ứng để Nuxt.js access được chúng.

Ví dụ file `.env` của bạn như này 
```.env
BASE_URL=https://nuxtjs.org
API_SECRET=1234
```
Thì khi chuyển sang runtime config sẽ trông như này
```nuxt.config.js
export default {
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL
  },
  privateRuntimeConfig: {
    apiSecret: process.env.API_SECRET
  }
}
```
Thậm chí còn có thể vứt đi những biến môi trường public khỏi file `.env` nếu sử dụng default value như sau:
```nuxt.config.js
export default {
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || 'https://nuxtjs.org'
  }
}
```

# Migrating to the Nuxt.js runtime config from the env property
Nếu bạn đang sử dụng các env variables trong `nuxt.config` thì bạn có thể chuyển sang dùng các runtime config mới bằng cách thêm chúng vào `nuxt.config` file.


Ví dụ env variables của bạn như sau
```nuxt.config.js
export default {
  env: {
    BASE_URL: 'https://nuxtjs.org',
    API_SECRET: '1234'
  }
}
```
Thì khi chuyển sang runtime config sẽ trông như này
```nuxt.config.js
export default {
  publicRuntimeConfig: {
    baseURL: 'https://nuxtjs.org'
  },
  privateRuntimeConfig: {
    apiSecret: process.env.API_SECRET
  }
}
```
⚠️  Hãy nhớ là các secret keyss không nên lưu trực tiếp trong `nuxt.config` file, hãy tạo 1 file `.env` nếu cần thiết hoặc lưu nó trên trong hosting environment.
  
# The env property v runtime config
Thuộc tính `env` vẫn có thể được sử dụng, và nó vẫn hữu dụng đối với những variables được yêu cầu lúc build time thay vì runtime, ví dụ như `NODE_ENV=staging` or `VERSION=1.2.3`. Tuy nhiên đối với các runtime env variable, runtime config được khuyến khích sử dụng hơn, sử dụng thuộc tính `env` có phần nguy như việc sử dụng module dotenv nếu dùng ko đúng cách.

# Using your config values
Khi đã set các giá trị trong public và private runtime config, bạn có thể access giá trị của chúng ở bất cứ đâu thông qua context trong pages, store, components và plugins bằng `this.$config` hoặc `context.$config`
```pages/index.vue.html
<template>
  <p>Our Url is: {{ $config.baseURL}}</p>
</template>

<script>
  asyncData ({ $config: { baseURL } }) {
    const posts = await fetch(`${baseURL}/posts`)
      .then(res => res.json())
  }
</script>
```

# Migrating your config values in your script tags
Nếu bạn đã sử dụng `env` trong script tags ví dụ như `asyncData`
```js
async asyncData ({ env }) { }
```
Thì bạn cần phải thay `env` bằng `$config` khi passing vào context, đây là một ví dụ:
```js
async asyncData ({ $config: { baseURL } }) {
```

khi đó thay vì dùng `env.BASE_URL`
```js
const posts = await fetch(`${env.BASE_URL}/posts`)
```
bạn có thể dùng thằng `baseUrl` luôn, khỏi phải lấy thông qua `$config`
```js
const posts = await fetch(`${baseURL}/posts`)
```

# Migrating your config values in your templates
Nếu code của bạn có sử dụng `env` trên template như bên dưới
```html
<p>{{process.env.baseURL}}</p>
```

Thì chuyển sang dùng `$config` như bình thường
```html
<p>{{$config.baseURL}}</p>
```
 
 # Expand/Interpolation Support
 Expand đối với runtime config chỉ xảy ra khi đã có sẵn 1 key 
 
 ```.env
 API_SECRET=1234
 ```
 ```nuxt.config.js
export default {
  privateRuntimeConfig: {
    API_SECRET: ''
  }
}
```
Nội suy sẽ cho phép lồng các biến môi trường
 ```.env
BASE_URL=/api
PUBLIC_URL=https://nuxtjs.org
 ```
 ```nuxt.config.js
export default {
  privateRuntimeConfig: {
    baseURL: '${PUBLIC_URL}${BASE_URL}'
  }
}
```
ℹ️  Ngoài ra cũng có thể dùng function cho publicRuntimeConfig và privateRuntimeConfig nhưng không khuyến khích.

# Best Practices:
✅  Sử dụng default values cho các runtime config nêsu được, ví dụ `process.env.baseURL || 'https://nuxt.js.org'`.

✅  Cài đặt các secret keys chính xác trên các hosting platform như Heroku hoặc Netify.

✅  Sử dụng các đặt tên giống với JS naming convention cho runtime config, `secretKey` thay vì `SECRET_KEY`.

✅  Khuyến khích sử dụng runtime config thay vì `env` option.

🚫  Không commit các thông tin nhạy cảm lên git.

🚫  Không chứa các thông tin nhạy cảm trong `nuxt.config` file hoặc trong `.env` trừ khi đã gitignored nó đi.