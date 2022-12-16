Đầu tiên mình sẽ dùng [**Repository Pattern**](https://docs.microsoft.com/en-gb/dotnet/standard/microservices-architecture/microservice-ddd-cqrs-patterns/infrastructure-persistence-layer-design?view=aspnetcore-2.1#the-repository-pattern) để truy cập vào tài nguyên theo cách độc lập, không có bất kì logic nào ngoài việc trả về dữ liệu.

Cái thứ 2 là sẽ sử dụng [**Factory Pattern**](https://refactoring.guru/design-patterns/factory-method) để khởi tạo logic của môi trường hay repository cần thiết cho từng case. Factory có 1 lợi thế là có thể khởi tạo 1 mock repository hoặc là production repository nếu cần thiết.

repository.js đảm nhiệm việc kết nối đến các resources.
```js
// repository.js
import axios from 'axios'

const baseDomain = 'https://jsonplaceholder.typicode.com'
const baseUrl = `${baseDomain}` // or `${baseDomain}/api/v1`

export default axios.create({
    baseUrl,
    header: {'Authorization': 'Bearer ...'}
})
```

Tiếp theo chúng ta sẽ đi định nghĩa cho từng Entity của project.

Ví dụ như có 1 blog. Khi đó chúng ta sẽ có 1 Entity là posts. Và bây giờ chúng ta sẽ đi định nghĩa tất cả các thao tác CRUD (Create Update Delete).

Và khi đó **postsRepository.js** sẽ là:

```js
// postRepository.js
import repository from './repository'

const resource = '/posts'

export default {
    getPosts () {
        return repository.get(`${resource}`)
    }
    
    getPost (id) {
        return repository.get(`${resource}/${id}`)
    }
    
    createPost (payload) {
        return repository.post(`${resource}`, payload)
    }
    
    updatePost (payload) {
        return repository.put(`${resource}/${id}`, payload)
    }
    
    deletePost (id) {
        return repository.delete(`${resource}/${id}`)
    }
}
```

Tiếp theo chúng ta sẽ đi tạo **Factory**.

```js
// repositoryFactory.js

import PostsRepository from './postsRepository'

const repositories = {
    posts: PostsRepository
}

export const RepositoryFactory = {
    get: name => repositories[name]
}
```

Nhìn vào trên ta thấy việc tạo Repository từ Factory trở nên thật đơn giản phải không nào

Còn đây là cách áp dụng vào trong component (ở đây mình sử dụng Vue, ngoài ra cũng có thể dùng cho cả React hay Angular):

```js
...

import RepositoryFactory from '@/repositories/repositoryFactory'
const PostsRepository = RepositoryFactory.get('posts')

export default {
    data () {
        return {
            posts: [],
            isLoading: false
        }
    },
    created () {
        this.getPosts()
    },
    methods: {
        async getPosts () {
            this.isLoading = true
            const { data } = await PostsRepository.get()
            this.posts = data
            this.isLoading = false
        }
    }
}

...
```