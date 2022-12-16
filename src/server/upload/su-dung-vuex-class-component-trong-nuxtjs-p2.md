Tiếp tục bài viết trước https://viblo.asia/p/su-dung-graphql-trong-du-an-nuxt-p1-aWj53n2ol6m, ở bài này chúng ta sẽ tiếp tục thực hiện call Qraphql API trong store của Nuxt.
# 1. ApiFactory
Trước hết chúng ta tạo 1 folder api ở root của project gồm 2 file `ExampleApi.ts` và `GqlQuery.ts`

```
// api/ExampleApi.ts
import { ApolloProvider } from 'vue-apollo/types';
import { UserQuery } from './GqlQuery';

type User = {
  id: number;
  name: string;
};

export default class ExampleApi {
  private _apollo: ApolloProvider;

  public constructor(apollo: ApolloProvider) {
    this._apollo = apollo;
  }

  public async getUser(): Promise<User | void> {
    try {
      const { data } = await this._apollo.defaultClient.query(UserQuery);
      return {
        id: data.id,
        name: data.name,
      };
    } catch (error) {
      throw error;
    }
  }
}

```

```
// api/GqlQuery.ts

import gql from 'graphql-tag';

export const UserQuery = {
  query: gql`
    query {
      user
    }
  `,
};
```

Tiếp theo chúng ta tạo file `api.ts` trong thư mục plugins

```
import { NuxtAppOptions } from '@nuxt/types';
import ExampleApi from '~/api/ExampleApi';

export interface ApiFactory {
  example: ExampleApi;
}

let apiFactory: ApiFactory;

export default function ({ app }: { app: NuxtAppOptions }): void {
  if (app.apolloProvider) {
    apiFactory = {
      example: new ExampleApi(app.apolloProvider),
    };
  }
}

export { apiFactory };
```

Sau đó chúng ta add thêm file vừa tạo vào `nuxt.config.js`

```
plugins: [
  '@/plugins/api',
],
```

Giờ chúng ta sẽ thực hiện việc call API trong store. Trong ví dụ dưới mình có dùng thư viện `vuex-class-component`, các bạn có thể tham khảo bài viết này để hiểu rõ hơn

https://viblo.asia/p/su-dung-vuex-class-component-trong-nuxtjs-WAyK89ynZxX

```
// store/example/index.ts

import { createModule, mutation, action } from 'vuex-class-component';
import { apiFactory } from '~/plugins/api';

const VuexModule = createModule({
  namespaced: 'example',
  strict: true,
  target: 'nuxt',
});

interface User {
  id: number;
  name: string;
}

export class ExampleStore extends VuexModule {
  private _user: User | null = null;

  @mutation
  private setUser(user: User | null): void {
    this._user = user;
  }

  @action
  public async getUser(): Promise<void> {
    try {
      const res = await apiFactory.example.getUser();
      if (res) {
        this.setUser(res);
      }
    } catch (error) {
      throw error;
    }
  }

  public get user(): User | null {
    return this._user;
  }
}

```

vậy là đã xong, giờ bạn có thể gọi đến action `getUser` trong store để fetch thông tin user. Thông tin user được fetch về sẽ lưu trong state user, bạn có lấy thông qua function `user`