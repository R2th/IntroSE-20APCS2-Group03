### Mục đích
Tạo ra một điểm duy nhất làm nhiệm vụ gọi `API`
### Vấn đề
Ví dụ `UserService` sẽ gọi các `api` lên quan tới `user`

```
export default class UserService extends BaseService {
  async index (params = {}) {
    const res = await this.get(`/api/v1/users`, params)
    return res.data
  }

  async create (params = {}) {
    const res = await this.post(`/api/v1/users`, params)
    return res.data
  }

  async update (id, params = {}) {
    const res = await this.post(`/api/v1/users/${id}`, params)
    return res.data
  }

  async show (id, params = {}) {
    const res = await this.get(`/api/v1/users/${id}`, params)
    return res.data
  }

  async destroy (id) {
    const res = await this.delete(`/api/v1/users/${id}`)
    return res.data
  }
}
```
Giả sử ngoài `user` còn có `lessson, secction, test, history...`  Như vậy chúng ta sẽ có rất nhiều` service` cho các thành phần khác nhau.

Muốn sử dụng `service` nào thì phải khai báo `service`đó, dùng nhiều thì khai báo nhiều. 

Giờ làm sao có thể khai báo 1 lần mà vẫn sử dụng được tất cả các `service` không?.

### Giải quyết với FactoryService
Câu trả lời tất nhiên là có rồi. Chúng ta tạo `IndexService` để gom tất cả các `server` lại với nhau.

```
import AuthService from '../AuthService'
import BaseService from '../BaseService'
import ChatService from './ChatService'
import CourseService from './CourseService'
import ContactService from './ContactService'
import CrazyService from './CrazyService'
import HistoryService from './HistoryService'
import LessonService from './LessonService'
import RemindService from './RemindService'
import TestService from './TestService'
import UserService from './UserService'

export default {
  AuthService,
  BaseService,
  ChatService,
  CourseService,
  ContactService,
  CrazyService,
  HistoryService,
  LessonService,
  RemindService,
  TestService,
  UserService
}
```

Đến đây lại có câu hỏi, như thế này thì làm sao mà gọi nhỉ? Đúng rồi cần phải thêm `FactoryService` nữa. 
Nhiều lúc có các `api` khác nhau dành cho `Admin` và `User` . Việc chia ra để tránh gọi nhầm cũng là cần thiết
```
import adminService from './Admin/IndexService'
import userService from './API/IndexService'

const requestMap = {
  user: userService,
  admin: adminService
}

export default class FactoryService {
  static request (classname, auth = 'user') {
    let RequestClass = requestMap[auth][classname]

    if (!RequestClass) {
      throw new Error('Invalid request class name: ' + classname)
    }

    return new RequestClass(auth)
  }
}

```

Ở đây có 2 `IndexService` dành cho `AP`I của `user` và `amin`. Thấy ngay rằng `function request` sẽ khởi tạo `service` thông qua tên `class` của `server` và loại `api` được truyền vào
Để sử dụng:

### Sử dụng
```
import FactoryService from '../../../services/FactoryService'
//api History của user
const histories = await FactoryService.request('HistoryService').index()
//api History của admin
const histories = await FactoryService.request('HistoryService', 'admin').index()
```

Quá đơn giản phải không nào?

### Thông tin liên quan
Có thể các nhiều bạn đã hiểu về `FactoryService `rồi. 
Nhưng vẫn muốn biết `BaseService` mà mọi `service` kế thừa kia như nào phải không. Bạn có thể xây dựng như sau:
- Việc  gọi `api` với `js` qua thư viện `axios`.
- Việc xác định `auth` ở đây là `passport`. 
Mặc định sẽ kiểm tra và gắn `token` xác thực vào `header` khi khởi tạo `service `

Bạn cũng có thể xây dựng `BaseService` trên các nền tảng khác nếu muốn.
Dưới đây là `BaseService` của tôi

```
import axios from 'axios'
import Api from '../config/Api'
import Vue from 'vue'

const domain = Api.domain()

export default class BaseService {
  constructor (auth = 'user') {
    if (auth) {
      this.setAuth(auth)
    }
  }

  setAuth (auth) {
    axios.interceptors.request.use(function (config) {
      const user = JSON.parse(localStorage.getItem(auth))

      if (user) {
        config.headers.Authorization = `Bearer ${user.access_token}`
      }

      return config
    })
  }

  async get (uri, params = {}) {
    try {
      return await axios.get(domain + uri, { params: params })
    } catch (e) {
      return this.errorMsg(e)
    }
  }

  async post (uri, params = {}) {
    try {
      return await axios.post(domain + uri, params)
    } catch (e) {
      return this.errorMsg(e)
    }
  }

  async put (uri, params = {}) {
    try {
      return await axios.put(domain + uri, params)
    } catch (e) {
      return this.errorMsg(e)
    }
  }

  async patch (uri, params = {}) {
    try {
      return await axios.patch(domain + uri, params)
    } catch (e) {
      return this.errorMsg(e)
    }
  }

  async show (uri) {
    try {
      return await axios.get(domain + uri)
    } catch (e) {
      return this.errorMsg(e)
    }
  }

  async delete (uri) {
    try {
      return await axios.delete(domain + uri)
    } catch (e) {
      return this.errorMsg(e)
    }
  }

  url (uri) {
    return domain + uri
  }

  errorMsg (e) {
    console.log(e)
    if (e.response === undefined) {
      e.status = 0
      e.statusText = e.message
      return { data: e }
    }

    let validationErrors = ''
    if (e.response.status === 422) {
      const errors = e.response.data.errors
      for (let key in errors) {
        validationErrors += errors[key] + '. '
      }
    }

    if (e.response.status !== 422) {
      validationErrors = e.response.data
    }

    Vue.$notify('error', e.response.statusText, validationErrors, { duration: 5000, permanent: false })

    return { data: e.response }
  }
}
```

### Kết luận
Như vậy chúng ta dễ dàng gọi các `api` chỉ bằng 1 khai báo duy nhất, không mất quá nhiều thời gian khai báo, số dòng code được rút ngắn, cấu trúc api rõ ràng, mạch lạc. 

Bạn có thể ứng dụng mô hình này với bất cứ ngôn ngữ nào chứ không chỉ là `js` nhé.

Việc thực hiện quá đơn giản phải không nào?

Cảm ơn bạn đã theo dõi, hẹn gặp lại.