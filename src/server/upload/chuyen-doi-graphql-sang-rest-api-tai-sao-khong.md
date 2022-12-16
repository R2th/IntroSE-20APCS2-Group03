## Mở đầu.

Khi viết API dùng GraphQL mình gặp vấn đề là API được viết ra khó sử dụng cho các bạn quen dùng RESTful APIs. Đối với các bạn ý câu truy vấn `query`, `mutation` của GraphQL thật lằng nhằng, đôi lúc cả mình cũng thấy thế.

Nhìn vào Graph API của facebook trông đẹp biết bao nhiêu nhỉ. 

> ##### GET Request.
```
curl -i -X GET \
  "https://graph.facebook.com/{your-user-id}/photos
    ?fields=height,width
    &access_token={your-user-access-token}"
```

> ##### GET Response.

```json
{
  "data": [
    {
      "height": 720,
      "width": 720,
      "id": "1308573619175349"        // Photo ID
    },
    {
      "height": 720,
      "width": 720,
      "id": "1294456907253687"        // Photo ID
    },
    {
      "height": 180,
      "width": 180,
      "id": "1228552183844160"        // Photo ID
    }
  ]
}
```

> ##### DELETE Request.
```
curl -i -X DELETE \
  "https://graph.facebook.com/{your-page-post-id}
    ?access_token={your-page-access-token}"
```

Vẫn là dạng RESTful API và cũng vẫn là GraphQL

Tại sao mình không viết Graphql API như thế nhỉ?

Mình thấy rằng [express-graphql](https://www.npmjs.com/package/express-graphql) thực tế nó chỉ làm một việc là đẩy body vào và excute graphql.

Do vậy mình làm tương tự nó nhưng thêm bước quy định route và Query, Mutation tương ứng.

## GraphQL To Rest API.

Mình đã viết một thư viện chuyển đổi [graphql-to-restapi](https://www.npmjs.com/package/graphql-to-restapi).

Cách sử dụng như sau.

### 1. Định nghĩa mutation, query của graphql.

Bước này các bạn định nghĩa cấu trúc query, mutation như bình thường.

#### Mutation
```js
export const createAccount = {
    type: AccountType,
    description: 'Tạo tài khoản',
    args: {
        email: {
            type: new GraphQLNonNull(GraphQLString)
        },
        password: {
            type: new GraphQLNonNull(GraphQLString)
        },
        fullname: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve(root, params) {
        // Todo
    }
};
```

#### Query
```js
export const profile = {
    type: GraphQLBoolean,
    description: 'Lấy thông tin profile của user đã login',
    args: {
       
    },
    resolve(root, params, context) {
        let {id} = context;
        // get profile by id
    }
};
```

Khi định nghĩa xong thì tạo GraphQLSchema từ Query, Mutation đã định nghĩa.

### 2. Config route và hàm xử lý graphql tương ứng.

Tạo file `route.config.js` với nội dung như sau:

```js
let routeConfigs = [
    // Viewer
    {
        method: 'get',
        path: '/profile',
        handle: {
            type: 'query',
            name: 'profile'
        },
        parameters: [
            {
                in: 'header',
                name: 'x-token-key',
                type: 'string',
                required: true
            }
        ],
        tags: ['Viewer'] 
    }

    // Account
    {
        method: 'post',
        path: '/accounts',
        handle: {
            type: 'mutation',
            name: 'createMultiAccount'
        },
        tags: ['Account'] 
    }
];

export default routeConfigs;
```

### 3. Config.

```js
import express from 'express';
import GraphqlRest from 'graphql-to-restapi';
import schema from './graphql/schema';
import routeConfigs from './route.config';
const app = express();

app.use('/api', GraphqlRest({
	schema, 
	routeConfigs, 
	swagger: {
		basePath: '/api'
	}, 
	graphql: true,
	formatContext: function(req) {
		// Gắn context vào trong graphql
		return {
			account: 3
		}
	},
	formatResponse: function(err, data, routeConfig) {
		if (err) {
			return {
				error: true
			}
		}

		if (routeConfig.wapper) {
			return {
				[routeConfig.wapper]: {
					error: false,
					data
				}
			}
		}

		return {
			error: false,
			data
		}
	}
}));

let port = process.env.PORT || 8080;
```

Chạy lên là đã có cả GraphQL API và RESTful API rồi

### 4. Example.
Các bạn có thể tham khảo lib mình viết và example chạy tại [repo github](https://github.com/TuanLDT/graphql-to-restapi)

### 5. Swagger document.
Lib mình có viết bộ chuyển đổi document, các bạn chỉ cần viết description trong graphql đầy đủ thì doc swagger gen ra sẽ có.
Các bạn chạy example ở repo trên và vào link doc: [http://localhost:8080/api/doc](http://localhost:8080/api/doc)
![](https://images.viblo.asia/e06a10a5-19ab-4303-b21f-bbb19d8e7d80.png)