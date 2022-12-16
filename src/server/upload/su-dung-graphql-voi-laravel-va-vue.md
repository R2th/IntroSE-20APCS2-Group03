Đây là ví dụ nho nhỏ về GraphQL sử dụng trong thực tế, có khá nhiều bài viết đã sử dụng với React, bài này mình sẽ dùng với Vue làm client truy vấn GraphQL và Laravel sẽ chịu trách nhiệm làm server GraphQL trả về dữ liệu cho client.
# 1. Xây dựng server
## 1.1 Cài đặt Laravel và xây dựng Database + Model
- Trước tiên bạn khởi taọ một project Laravel mới và chạy ngon lành đi.
- Bài này mình chỉ làm đơn giản, mình sẽ tạo 2 bảng là `user` và `profile`, user thì ta có sẵn migration rồi, giờ mình sẽ Model và migration cho Profile, ta chạy lệnh `php artisan make:model Profile -m`. Đây là bảng User mình sẽ dùng, và sẽ rất ngắn gọn.
```php
Schema::create('users', function (Blueprint $table) {
    $table->increments('id');
    $table->string('email', 100)->unique();
    $table->string('password');
    $table->timestamps();
});
```
Còn đây là bảng profile, cũng tương tự rất ngắn gọn.
```php
Schema::create('profiles', function (Blueprint $table) {
    $table->increments('id');
    $table->integer('user_id');
    $table->string('first_name')->nullable();
    $table->string('last_name')->nullable();
    $table->string('address')->nullable();
    $table->timestamps();
});
```
## 1.2 Cấu hình GraphQL cho server
Đã xong bước tạo Model và database, giờ mình sẽ bắt đầu cài đặt và cấu hình GraphQL. Bây giờ chúng ta cùng nhau từng bước tạo một server GraphQL.

Trước tiên bạn cần chạy `composer  require folklore/graphql` để cài package GraphQL cho ứng dụng.
Sau đó publish các file cấu hình và view của package trên bằng lệnh sau `php artisan vendor:publish --provider="Folklore\GraphQL\ServiceProvider"`. Bạn sẽ thấy 1 file mới `config/graphql.php`, đây sẽ chứa các thông số cấu hình cho GraphQL.
### Định nghĩa các Type
Các Type trong GraphQL là khai báo kiểu dữ liệu sẽ được trả về, và bạn cũng có thể tùy biến dữ liệu trả về từ dữ liệu gốc sao cho hợp lý.
Mình sẽ định nghĩa `App\GraphQL\Type\UserType`  như sau:
```php
<?php
namespace App\GraphQL\Type;

use GraphQL;
use GraphQL\Type\Definition\Type;
use Folklore\GraphQL\Support\Type as GraphQLType;

class UserType extends  GraphQLType
{
    public function fields()
    {
        return [
            'id' => [
                'type' => Type::nonNull(Type::int()),
                'description' => 'The id of the user',
            ],
            'email' => [
                'type' => Type::string(),
                'description' => 'The email of user'
            ],
            'created_at' => [
                'type' => Type::string(),
                'description' => 'Creation datetime'
            ],
            'updated_at' => [
                'type' => Type::string(),
                'description' => 'Updating datetime'
            ],
            'profile' => [
                'type' => GraphQL::type('Profile'),
            ],
        ];
    }

    protected function resolveCreatedAtField($root, $args)
    {
        return $root->created_at->format('Y-m-d H:i:s');
    }

    protected function resolveUpdatedAtField($root, $args)
    {
        return $root->updated_at->format('Y-m-d H:i:s');
    }

    protected function resolveProfileField($root, $args)
    {
        return $root->profile;
    }
}
```
Thực ra bảng profile này trong thực tế sẽ nằm luôn trong bảng user, tuy nhiên mình muốn tách ra để sử dụng truy vấn quan hệ trong GraphQL, mình sẽ khai báo `App\GraphQL\Type\ProfileType` như sau:
```php
<?php
namespace App\GraphQL\Type;

use GraphQL\Type\Definition\Type;
use Folklore\GraphQL\Support\Type as GraphQLType;

class ProfileType extends  GraphQLType
{
    public function fields()
    {
        return [
            'id' => [
                'type' => Type::nonNull(Type::int()),
                'description' => 'The id of the user',
            ],
            'first_name' => [
                'type' => Type::string(),
            ],
            'last_name' => [
                'type' => Type::string(),
            ],
            'address' => [
                'type' => Type::string(),
            ],
            'created_at' => [
                'type' => Type::string(),
                'description' => 'Creation datetime'
            ],
            'updated_at' => [
                'type' => Type::string(),
                'description' => 'Updating datetime'
            ],
        ];
    }

    protected function resolveCreatedAtField($root, $args)
    {
        return $root->created_at->format('Y-m-d H:i:s');
    }

    protected function resolveUpdatedAtField($root, $args)
    {
        return $root->updated_at->format('Y-m-d H:i:s');
    }
}
```
Như thế là mình đã xay dựng xong các Type mình sẽ dùng trong bài này. Sau khi xây dựng xong các Type trên thì chúng ta vào khai báo trong config: `config/graphql.php`, bạn tìm đến dòng `type` để thêm vào như sau:
```php
'types' => [
    'User' => App\GraphQL\Type\UserType::class,
    'Profile' => App\GraphQL\Type\ProfileType::class,
],
```
### Định nghĩa các Query
Giờ mình sẽ định nghĩa các query, đây là nơi bạn sẽ xử lý cách trả về dữ liệu cho Client sao cho hợp lý. Mình sẽ có file `App\GraphQL\Querry\UserQuery` như sau:
```php
<?php

namespace App\GraphQL\Query;

use GraphQL;
use App\User;
use GraphQL\Type\Definition\Type;
use Folklore\GraphQL\Support\Query;

class UserQuery extends Query
{
    protected $attributes = [
        'name' => 'users'
    ];

    public function type()
    {
        return Type::listOf(GraphQL::type('User'));
    }

    public function args()
    {
        return [
            'id' => ['name' => 'id', 'type' => Type::int()],
            'email' => ['name' => 'email', 'type' => Type::string()],
            'first' => ['name' => 'first', 'type' => Type::int()],
        ];
    }

    public function resolve($root, $args)
    {
        $users = new User();

        if (isset($args['first'])) {
            $users = $users->take($args['first'])->orderBy('id', 'desc');
        }

        if (isset($args['id'])) {
            $users = $users->where('id', $args['id']);
        }

        if (isset($args['email'])) {
            $users = $users->where('email', 'like', "%{$args['email']}%");
        }

        return $users->get();
    }
}
```
Và bạn cũng cần khai báo vào file `app/graphql.php`  tại `schemas` dòng sau:
```php
'schemas' => [
    'default' => [
        'query' => [
            'users' => \App\GraphQL\Query\UserQuery::class,
        ],
        'mutation' => [
        ]
    ]
],
```
Thế là giờ bạn có thể test được query rồi đấy, để test query ở trên bạn có thể  vào url `graphiql` để test.
Ở bài này mình sẽ ko tạo Mutation, các bạn hãy tự tìm hiểu thêm nhé.
# 2. Client
Như tiêu đề bài viết, mình sẽ dùng Vue để xây dựng client và gọi dữ liệu ở Server vừa xây dựng ở trên.
Ngoài các package có sẵn khi cài Laravel, bạn thêm cho mình các package sau:
```json
"dependencies": {
    "apollo-cache-inmemory": "^1.1.4",
    "apollo-client": "^2.0.4",
    "apollo-link": "^1.0.7",
    "apollo-link-context": "^1.0.3",
    "apollo-link-http": "^1.3.2",
    "graphql": "^0.12.3",
    "graphql-tag": "^2.6.1",
    "vue-apollo": "^3.0.0-alpha.3"
}
```
Mình sẽ dùng Vue để xây dựng một client nho nhỏ, như ở đây mình chỉ hiển thị User list thôi, cơ bản là cách cấu hình của GraphQL với Vue thế nào là được rồi.
Trước tiên là file main chứa các config cho Vue.
```javascript
import Vue from 'vue'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import App from './App'

const httpLink = new HttpLink({
    // You should use an absolute URL here
    uri: 'http://localhost:8080/graphql'
})

const authLink = setContext((_, { headers }) => {
    return {
        ...headers,
    //   authorization: token //for authentication
    }
})

// Create the apollo client
const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true,
})

// Install the vue plugin
Vue.use(VueApollo)

const apolloProvider = new VueApollo({
    defaultClient: apolloClient
})

/* eslint-disable no-new */
new Vue({
    el: '#root',
    provide: apolloProvider.provide(),
    template: '<App/>',
    components: { App }
})
```
Giờ là Component Root cho ứng dụng, mình sẽ  tạo như sau. Mình dùng Bootstrap cho tiện nhá các bạn
```html
<template>
    <div class="app">
        <UserList />
    </div>
</template>

<script>
    import UserList from './components/UserList'
    export default {
        name: 'app',

        components: {
            'UserList': UserList,
        },
    }
</script>

<style lang="scss">
    @import '~bootstrap/dist/css/bootstrap.css';
</style>
```

Mình tạo 1 file chứa các câu query của GraphQL, mình tách ra như các bạn tách các api khi dùng RESTful.
```javascript
import gql from 'graphql-tag'

export const ALL_USERS_QUERY = gql`
    query Users {
        users {
            id
            email
            created_at
            profile {
                first_name
                last_name
                address
            }
        }
    }
`
```
Và cuối cùng là file hiển thị list user, trong đó có cả query để fetch dữ liệu
```html
<template>
    <section class="section">
        <div class="container">
            <div class="columns">
                <div class="column">
                    <h2 class="title">Users</h2>
                    <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Full Name</th>
                                <th>Join At</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in users" :key="user.id">
                                <td>{{ user.email }}</td>
                                <td>{{ user.profile.address }}</td>
                                <td>{{ `${user.profile.first_name} ${user.profile.last_name}` }}</td>
                                <td>{{ user.created_at }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import { ALL_USERS_QUERY } from '../graphql'

    // Component def
    export default {
        name: 'UserList',

        // Local state
        data() {
            return {
                users: [],
            }
        },

        // Apollo GraphQL
        apollo: {
            users: {
                query: ALL_USERS_QUERY
            },
        },
    }
</script>
```
Như thế là mình đã làm xong một ứng dụng nho nhỏ ứng dụng GraphQL cho Vue.
Các bạn có thể tham khảo source code mình viết tại đây https://github.com/dinhvantai/graphql-laravel-vue

Bài viết mình có tham khảo tại:
http://www.qcode.in/build-api-for-twitter-like-app-using-graphql-in-laravel/