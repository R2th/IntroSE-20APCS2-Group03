Việc sử dụng thư viện bên thứ 3 thông qua các mẫu parttern setup đôi khi sẽ cảm thấy rườm rà phức tạp nhưng việc gói gọn khi sử dụng thư viên ngoài thay vì sử dụng trực tiếp sẽ đem lại 1 số lợi ích nhất định.

Đầu tiên chúng ta đi qua ví dụ của `axios`
## Re-Export - Import
Giả sử chúng ta có folder `/utils` như sau
```js
// utils/api.js
export * from 'axios';
```

Có các services
```js
// services/user.js
import api from '../utils/api';

export const user = {
  get({ id }) {
    return api.get(`/user/${id}`);
  },
  // ...
};
```

Thay vì chúng ta sử dụng `axios` trên mọi chỗ thì chúng ta tập trung phụ thuộc vào 1 folder `utils` để dễ dàng chỉnh sửa API khi cần thiết, dễ maintain dự án hơn.
VIệc sử dụng chung như vậy sẽ giảm bớt gánh nặng thay thế những phần API dùng chung mà giống nhau.

## Config tham số phù hợp
Cải tiến thêm bước nữa, chúng ta có thể sử dụng dạng ví dụ như sau
```js
// utils/api.js
import axios from 'axios';

export default {
  get: ({ url, config }) => axios.get(url, config),
  post: ({ url, data, config }) => axios.post(url, data, config),
};
```

## Lợi ích
### Tìm kiếm dễ dàng, giải quyết vẫn đề nhanh chóng.
Bạn thử tưởng tượng việc tập trung tìm kiếm của 1 module hệ thống phụ thuộc vào những dạng API ở chung 1 folder hay 1 file nào đó sẽ giúp chúng ta tìm kiếm dễ dàng hơn rất nhiều.

Đôi khi chúng ta gặp phải tình huống lỗi nghiêm trọng của 1 thư viện bên thứ 3, sử dụng chúng mọi nơi trong ứng dụng của mà ko tập trung tại 1 nơi cầu nối nào đó, thì việc thay thế thư viện đó có chức năng tương tự sẽ cực kì khó khăn hơn bao giờ hết.
### Viết test API sẽ trở dễ dàng hơn
Test API bằng các hàm javascript sẽ trở lên dễ dàng khi chỉ việc gọi đến các services cần thiết để chạy test như `Jest` thực thi rất dễ dàng thông qua `mock` và `Promise`kết hợp.
Dưới đây là ví dụ minh họa.
```js
import axios from 'axios';
 
import { test } from 'services/user';
 
jest.mock('axios');
 
describe('test', () => {
  it('fetches successfully data from an API', async () => {
    const data = {
      data: {
        hits: [
          {
            objectID: '1',
            title: 'a',
          },
          {
            objectID: '2',
            title: 'b',
          },
        ],
      },
    };
 
    axios.get.mockImplementationOnce(() => Promise.resolve(data));
  });
 
  it('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';
 
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );
  });
});
```
### Document
Tài liệu bên thứ 3 rõ ràng sẽ giúp lập trình viên dễ dàng sử dụng, đóng góp 1 phần vào tài liệu dự án tốt hơn thể hiện rành mạch các chức năng mà tài liệu này mang lại.
## Nhược điểm
### Sử dụng thiếu chức năng thư viện
Việc sử dụng đóng gói như thế này sẽ mất đi một số chức năng khác của thư viện. Trong trường hợp đó với ví dụ `axios` chúng ta có thể sử dụng trích dẫn toàn bộ thư viện như sau:

```js
// utils/api.js
// See https://github.com/axios/axios for docs.
export * from 'axios';
```

Điều này có thể thay đổi API phần phụ thuộc nếu trùng biến tên hay gì đó của thư viện gốc, tuy nhiên đây cũng không phải là vấn đề lớn.

### Có thể “lười não” của các developer
Việc thường xuyên tích hợp thư viện bên thứ 3 vô tình tạo nên thói quen lười suy nghĩ cho developer.

> Khi làm tính năng nào đó xem có thư viện có không, nếu có dùng luôn cho nó nhanh.

Thói quen này khiến chúng ta trở nên thụ động, bị phụ thuộc vào đội ngũ sáng tạo ra thư viện và hạn chế khả năng tư duy của bản thân. Chính những điều này có thể gây ảnh hưởng phát triển sự nghiệp. 

## Kết luận
Như vậy, việc thực hành đóng gói các yếu tố phụ thuộc của thư viện bên thứ 3 cũng không phải là không có một số nhược điểm. Các phụ thuộc có khả năng thay đổi hoặc được sử dụng nhiều trong toàn bộ codebase đem lại lợi ích lớn hơn công sức bỏ ra. Tuy nhiên, để rõ ràng thì chúng ta cần define cụ thể các mẫu sẽ thống nhất toàn bộ dự án.