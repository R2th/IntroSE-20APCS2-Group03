# 1. API
API là một trong những thứ quan trọng nhất của dự án. Một dự án có cấu trúc API tốt sẽ tiết kiệm rất nhiều thời gian cho bạn khi làm việc và fix bug. Trong bài viết này mình sẽ viết 1 cấu trúc API đơn giản cho dự án Nuxt.

# 2. Cài đặt
Trước tiên bạn cần tạo 1 folder api cho dự án của bạn. Sau đó bạn tạo 1 file `BaseApi.js` trong folder vừa tạo. Mục đích của file này là tập hợp các hàm cơ bạn của API (get, post, put, patch, delete).
```
export default class BaseApi {
  constructor(axios) {
    this._axios = axios;
  }

  async get(url, params = {}) {
    try {
      const { data } = await this._axios.get(url, { params });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async put(url, data) {
    try {
      const { data } = await this._axios.put(url, data);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async patch(url, data) {
    try {
      const { data } = await this._axios.patch(url, data);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async post(url, data) {
    try {
      const { data } = await this._axios.post(url, data);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async delete(url, data) {
    try {
      const { data } = await this._axios.delete(url, { data });
      return data;
    } catch (error) {
      throw error;
    }
  }
}
```

> Việc tạo file base như này sẽ giúp code của bạn ít bị lặp lại hơn và có thể dễ dàng thay đổi thư viện http khác nếu có yêu cầu

Tiếp theo bạn sẽ tạo các file api riêng biệt.
```
import BaseApi from './BaseApi';

export default class ExampleApi extends BaseApi {
  getExample(params) {
    return this.get('/example', params);
  }
};
```

Tạo 1 file `api.js` trong thư mục plugins và thêm nó vào `nuxt.config.js`. File này sẽ được thực thi trước khi instance root Vue được khởi tạo.

```
import ExampleApi from '~/api/ExampleApi';

let apiFactory;

export default function ({ $axios }) {
  apiFactory = {
    example: new ExampleApi($axios),
  };
}

export { apiFactory };
```

```
plugins: [
    '@/plugins/api',
  ],
```

Vậy là chúng ta đã tạo xong API cho dự án. Khi nào bạn cần call API thì chỉ cần import `apiFactory` vào và call. Đây là 1 ví dụ khi bạn call api trong action của vuex
```
import { apiFactory } from '~/plugins/api';

export default {
  async getData({ commit }, params) {
    try {
      const data = await apiFactory.example.getExample(params)
      commit('setTestData', data);
    } catch (error) {
      // handle error
    }
  }
};
```