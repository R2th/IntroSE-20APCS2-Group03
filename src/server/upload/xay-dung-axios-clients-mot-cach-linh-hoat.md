Gần đây khi làm việc với Vue tôi có thời gian làm quen với Axios, đó là một thư viện thường hay sử dụng trong Vuex để thực hiện các tác vụ triệu gọi các API.
Tôi thích xây dựng các mô-đun API JS cụ thể mà tôi có thể nhập vào các thành phần và mô-đun Vuex thay vì một cuộc gọi Axios được nướng trong một thành phần. Xây dựng các mô-đun tài nguyên API cho phép tôi làm việc trừu tượng với các tài nguyên HTTP và cung cấp các phương thức tiện lợi cho các mẫu phổ biến. Hãy xem một vài ví dụ!
# Cùng bắt đầu nào
Tôi sẽ xác định một vài yêu cầu mà khách hàng API của tôi thường có:
Hook into Error reporting (i.e., Sentry)
Khả năng truyền các HTTP Header ví dụ như truyền các thông tin để xác thực người dùng qua header.
Khả năng truy cập vào store của Vuex nếu cần (đồng nghĩa là nó có thể lấy được Json Web Token của người dùng)
Đơn giản hóa việc triệu gọi API
# Phía Client 
Tệp client.js sẽ là tệp nền tảng mà các máy khách HTTP sử dụng để tạo một cá thể Axios mới. Và chúng ta cùng xây dựng 'interceptors' cho các request và response nào.
Request interceptor yêu cầu nhận cấu hình yêu cầu và một error callback. Bạn có thể tùy chỉnh cấu hình tại thời điểm này, nhưng đối với người mới bắt đầu, chúng tôi sẽ trả lại cùng một cấu hình. Lệnh error callback sẽ ghi lại ngoại lệ thông qua Raven của Sentry:
```javascript
client.interceptors.request.use(
  requestConfig => requestConfig,
  (requestError) => {
    Raven.captureException(requestError);

    return Promise.reject(requestError);
  },
);
```

Response interceptor nhận hai đối số, đối số đầu tiên là một response callback và câu lệnh thứ hai là response error:
```javascript
client.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response.status >= 500) {
      Raven.captureException(error);
    }

    return Promise.reject(error);
  },
);
```

Dưới đây là một ví dụ đầy đủ về cách bạn có thể xây dựng Axios client cơ bản của riêng bạn dựa vào Sentry, kiểm tra Vuex store để có token truy cập của người dùng và cung cấp lớp ApiClient mà bạn có thể sử dụng để xây dựng phía client.
```javascript
import axios from 'axios';
import Raven from 'raven-js';
import store from '../store/index';

/**
 * Create a new Axios client instance
 * @see https://github.com/mzabriskie/axios#creating-an-instance
 */
const getClient = (baseUrl = null) => {

  const options = {
    baseURL: baseUrl
  };

  if (store.getters['users/isAuthenticated']) {
    options.headers = {
      Authorization: `Bearer ${store.getters['users/accessToken']}`,
    };
  }

  const client = axios.create(options);

  // Add a request interceptor
  client.interceptors.request.use(
    requestConfig => requestConfig,
    (requestError) => {
      Raven.captureException(requestError);

      return Promise.reject(requestError);
    },
  );

  // Add a response interceptor
  client.interceptors.response.use(
    response => response,
    (error) => {
      if (error.response.status >= 500) {
        Raven.captureException(error);
      }

      return Promise.reject(error);
    },
  );

  return client;
};

class ApiClient {
  constructor(baseUrl = null) {
    this.client = getClient(baseUrl);
  }

  get(url, conf = {}) {
    return this.client.get(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  delete(url, conf = {}) {
    return this.client.delete(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  head(url, conf = {}) {
    return this.client.head(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  options(url, conf = {}) {
    return this.client.options(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  post(url, data = {}, conf = {}) {
    return this.client.post(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  put(url, data = {}, conf = {}) {
    return this.client.put(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  patch(url, data = {}, conf = {}) {
    return this.client.patch(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }
}

export { ApiClient };

/**
 * Base HTTP Client
 */
export default {
  // Provide request methods with the default base_url
  get(url, conf = {}) {
    return getClient().get(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  delete(url, conf = {}) {
    return getClient().delete(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  head(url, conf = {}) {
    return getClient().head(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  options(url, conf = {}) {
    return getClient().options(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  post(url, data = {}, conf = {}) {
    return getClient().post(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  put(url, data = {}, conf = {}) {
    return getClient().put(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  patch(url, data = {}, conf = {}) {
    return getClient().patch(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
};
```

Chúng ta có thể sử dụng tất cả các phương thức của HTTP trên Axios một cách trực tiếp. Chúng ta sẽ xem qua ví dụ đơn giản sau đây:

```javascript
import client from './client';

client.get('/users').then((response) => {
  // do stuff
});
```
# Sử dụng client.js để tạo client API
Với client như ở phía trên, chúng ta có thể xây dựng các Axios API cụ thể cho client của bạn. 

Ví dụ: bạn sẽ xây dựng một tập phương thức sau để quản lý người dùng:

```javascript
import { ApiClient } from '../client';

let client = new ApiClient();

export default {

    all() {
        return client.get('/users');
    },

    find(userId) {
        return client.get(`/users/${userId}`);
    },

    update(userId, data) {
        return client.put(`/users/${userId}`, data);
    }

}
```

Ví dụ trên khá đơn giản, nhưng bạn có thể thực hiện tiếp tục xử lý bằng cách gọi một chuỗi các lời gọi promise sau khi nhận được phản hồi. Ví dụ: bạn chỉ có thể gửi cùng các thuộc tính có liên quan từ response chẳng hạn. Hoặc có thể bạn không có quyền truy cập vào chương trình phụ trợ và bạn có thể sử dụng response để tạo đối tượng tùy chỉnh hoặc thêm thuộc tính bổ sung, ví dụ: thuộc tính fullName nếu bạn chỉ lấy lại firstName và lastName. Vue cũng đã tính toán các thuộc tính, nhưng tôi hy vọng bạn có được ý tưởng rằng bạn có thể định dạng dữ liệu phản hồi trước khi gửi nó cùng với mã người client.

# Sử dụng Vuex
Một lý do tôi đề nghị bạn xây dựng các modules máy khách là chúng ta có thể kéo chúng vào các components, và chúng ta cũng có thể sử dụng chúng trong Vuex store. Các lợi ích tương tự được áp dụng, bao gồm gửi cùng các mã ủy quyền và tránh các lời gọi axios trực tiếp trong các modules Vuex.

Chúng ta cùng xem xét ví dụ sau:

```javascript
import usersClient from './api/users';

// ...

profile({ commit }, userId) {
  usersClient.find(userId)
    .then((response) => {
      let {
        firstName,
        lastName,
      } = response.data;

      commit('PROFILE', { firstName, lastName });
    });
},
```