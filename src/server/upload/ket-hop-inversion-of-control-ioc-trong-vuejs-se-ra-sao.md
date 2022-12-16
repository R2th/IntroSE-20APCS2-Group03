Bài viết này hướng tới mang tính chất thử nghiệm IoC trong Vuejs. 
# Vậy trước hết IoC là gì ?
> **Inversion of Control**: Đây là một design pattern được tạo ra để code có thể tuân thủ nguyên lý Dependency Inversion. Có nhiều cách hiện thực pattern này: ServiceLocator, Event, Delegate, … Dependency Injection là một trong các cách đó.


> |Ưu điểm | Nhược điểm |
> | -------- | -------- |
> | Giảm sự kết dính giữa các module     | Khái niệm DI khá “khó tiêu”, các developer mới sẽ gặp khó khăn khi học     |
> | Code dễ bảo trì, dễ thay thế module     | Sử dụng interface nên đôi khi sẽ khó debug, do không biết chính xác module nào được gọi     |
> | Rất dễ test và viết Unit Test     | Các object được khởi tạo toàn bộ ngay từ đầu, có thể làm giảm performance     |
> | Dễ dàng thấy quan hệ giữa các module (Vì các dependecy đều được inject vào constructor)     | Làm tăng độ phức tạp của code     |

Nguồn: https://toidicodedao.com/2015/11/03/dependency-injection-va-inversion-of-control-phan-1-dinh-nghia/

## Cảm hứng IoC Container trong Laravel
Phần này các bạn có thể tham khảo thêm của anh @thangtd90 [Laravel Beauty: Tìm hiểu về Service container](https://viblo.asia/p/laravel-beauty-tim-hieu-ve-service-container-3KbvZ1wLGmWB)

Hoặc có thể tham khảo thêm trang chủ của Laravel https://laravel.com/docs/5.8/container

# Mô hình sơ khai
## Idea
Xây dựng 1 container, nơi sẽ import tất cả services của ứng dụng của bạn tại 1 chỗ. Ở Laravel chúng ta biết có cách sử dụng Facade để load tất cả các service được chỉ định, điều này sẽ hoạt động rất tốt với web chúng ta nhỏ và ít các services. Đương nhiên chúng ta cũng phải xem xét vấn đề này nếu áp dụng IoC vào Vuejs.

=> Một số services sẽ được load ngay ban đầu và có 1 số khác sẽ được load chỉ khi cần thiết.

## Mô hình
![](https://images.viblo.asia/04014d63-6dff-4df1-a5fb-f34ac7f4de28.png)

# Triển khai
Hiển thị danh sách người dùng và danh sách các công ty.
```src/repositories/user.js
// Mock Api
const api = Promise.resolve([
  {
    id: 1,
    name: 'An'
  },
  {
    id: 2,
    name: 'Binh'
  }
]);

export default {
  async find(id) {
    const result = await api;
    return result.find(x => x.id === id);
  },
  async list() {
    return api;
  }
};
```

```src/repositories/company.js
// Mock Api
const api = Promise.resolve([
  {
    id: 1,
    title: 'Sun*'
  },
  {
    id: 2,
    title: 'Secomus'
  }
]);

export default {
  async find(id) {
    const result = await api;
    return result.find(x => x.id === id);
  },
  async list() {
    return api;
  }
};

```

Đây là nơi Service Container chính của chúng ta sẽ được `provide` bên trong `main.js`
```service-container.js
import companyRepository from "./repositories/company";
import userRepository from "./repositories/user";

// This is the place where you set up all
// of your dependencies. You can switch
// repositories or change the implementation
// details of a repository without having to
// touch all of the components which use it.
export default {
  companyRepository,
  userRepository
};

```

```main.js
import Vue from "vue";

import serviceContainer from "./service-container";

import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  provide: serviceContainer,
  render: h => h(App)
}).$mount("#app");

```

Trong `App.vue`

```javascript
<template>
  <div id="app">
    <h2>Companies</h2>
    <CompanyListing/>

    <h2>Users</h2>
    <UserListing/>
  </div>
</template>

<script>
import CompanyListing from "./components/CompanyListing";
import UserListing from "./components/UserListing";

export default {
  name: "App",
  components: {
    CompanyListing,
    UserListing
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 3em;
}
</style>

```

### Inject các repository

```javascript
// src/components/CompanyListing
<template>
  <ul>
    <li v-for="company in companies" :key="company.id">{{ company.title }}</li>
  </ul>
</template>

<script>
export default {
  name: "CompanyListing",
  inject: ["companyRepository"],
  data() {
    return { companies: [] };
  },
  async created() {
    this.companies = await this.companyRepository.list();
  }
};
</script>

```

```javascript
// src/components/UserListing
<template>
  <ul>
    <li v-for="user in users" :key="user.id">{{ user.name }}</li>
  </ul>
</template>

<script>
export default {
  name: "UserListing",
  inject: ["userRepository"],
  data() {
    return { users: [] };
  },
  async created() {
    this.users = await this.userRepository.list();
  }
};
</script>

```
DEMO:
https://codesandbox.io/s/basic-ioc-vuejs-9sg5g

## Đánh giá
Trông có vẻ rất tốt nhưng sâu trong nó rất nhiều nhược điểm. Quay trở lại **Idea** của chúng ta, giả sử ứng dụng này sẽ to dần đều, đồng nghĩa với việc tải tất cả services đều được load cùng 1 lúc, đó là vấn đề của chúng ta. :clown_face:.

## Sửa lại cho thành Dynamically import services
```service-container.js
import companyRepository from "./repositories/company";
import userRepository from "./repositories/user";

const RepositoryInterface = {
  find() {},
  list() {}
};

function bind(repositoryFactory, Interface) {
  return {
    ...Object.keys(Interface).reduce((prev, method) => {
      const resolveableMethod = async (...args) => {
        const repository = await repositoryFactory();
        return repository[method](...args);
      };
      return { ...prev, [method]: resolveableMethod };
    }, {})
  };
}

export default {
  get companyRepository() {
    // Delay loading until a method of the repository is called.
    return bind(() => companyRepository, RepositoryInterface);
  },
  get userRepository() {
    return bind(() => userRepository, RepositoryInterface);
  }
};


```

DEMO:
https://codesandbox.io/s/high-ioc-vuejs-ly2sw

Hàm `bind()` đã bổ trợ giúp chúng ta có interface cho đối tượng. Đối tượng ở đây có phương thức giả giống với các phương thức ở trong repositories. Tất cả chúng được resolved bằng cách linh hoạt, điều hạn chế chúng ta có thể thấy ngay là chúng ta phải tuân thủ các interface được xác định trước đó, ở đây là `find()`, `list()`

# Kết luận
Việc xây dựng IoC chỉ để mang tính chất thử nghiệm vì thật sự không cần thiết đối với các ứng dụng mở rộng bằng javascript  và Vue.js

Nếu bạn muốn tạo các components có thể tái sử dụng cao mà không phụ thuộc vào một thể hiện cụ thể của services, Pattern này vẫn có thể hữu ích. Hãy tưởng tượng bạn muốn triển khai một thành phần trên nhiều ứng dụng, nhưng mỗi ứng dụng sử dụng một kho lưu trữ khác nhau để tìm tải nguồn API người dùng (và tất cả chúng đều có chung giao diện).

Tuy vậy chúng ta có thể sử dụng khái niệm các hàm bậc cao hơn để truyền các phụ thuộc thông qua các tham số cho hàm (hoặc thông qua props trong các components của Vue.js).

facebook: https://www.facebook.com/quanghung997