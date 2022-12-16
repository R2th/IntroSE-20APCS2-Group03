Xin chào các bạn, lại là mình đây, hôm này mình giới thiệu cho các bạn một package hữu ích khi làm việc với **Reactjs**

Chắc hẳn các bạn ai cũng từng gặp phải vấn đề khi làm việc với **api**. Có rất nhiều thứ các bạn phải suy nghĩ khi xử lý dữ liệu không đồng bộ, cập nhập data hay lưu data vào cache hoặc re-fetching lại khi có data mới.

Thì bây giờ các bạn không phải lo nghĩ điều đó nữa, khi mà đã có [react-query](https://react-query.tanstack.com/overview) lo điều đó cho bạn. Nó xử lý những điều đó một cách trơn tru, các bạn lên document của nó để đọc tiếp nhé, có rất nhiều thứ hay ho :heart_eyes:

OK! Vậy bây giờ mình và các bạn sẽ đi tìm hiều nó nhé.

Trước hết, nếu bạn nào đã cài reactjs rồi thì thôi, còn bạn nào chưa thì có thể chạy câu lệnh phía dưới để cài nhanh
```
npx create-react-app
```

Khi cài xong các bạn chạy thêm cho mình câu lệnh này nữa để cài đặt **react-query**
```
npm i --save react-query
```

##### Fetching the data
Đầu tiên, mình đi vào fetch data nhé. Các bạn mở file App.js lên và thay thế bằng đoạn code sau
```javascript
import React from 'react';
import { useQuery } from 'react-query'

const getPosts = async () => {
  const response = await fetch('endpoint api')
  return response.json()
}

function App() {
  const { data, isFetching, isLoading, error, isError } = useQuery('key_unique', getPosts)

  if (isLoading) {
    return <div>loading...</div> // loading data
  }

  if (isError) {
    return <div>{error.message}</div> // error data
  }

  return (
    <div>
      <ul>
      {
        data && data
          .slice(0,10) // only take frist 10 for now
          // render list of titles
          .map(d => <li key={`post-${d.id}`}>{d.title}</li>)
      }
      </ul> 
      { isFetching && <p>updating...</p> }
    </div>
  )
}

export default App
```

Đầu tiên, mình khai báo một hàm **getPosts()**  để lấy data từ api về.

Trong hàm **App()** mình có sử dụng hook **useQuery**, nếu bạn nào chưa biết về hook thì có thể lên trang chủ đọc nhé t[ại đây](https://reactjs.org/docs/hooks-intro.html)

- **data**: hook trả dữ liệu về cho mình qua biến data, các bạn dùng biến data để map dữ liệu của mình ra, data là key mặc định các bạn không thể refactor sang tên khác, nếu các bạn muốn đổi tên khác thì có thể viết như này **{ data: newName }** và các key ở dưới cũng vậy.
- **isLoading**: trả về trạng thái loading khi data đang load
- **isError**: trả về lỗi khi fetch data về bị lỗi
- **error**: sẽ trả về lỗi cho bạn
- **key_unique**: đặc biệt là cái này. Mỗi một query sẽ có một key duy nhất, nên các bạn phải để ý là đặt key không được trung nhau
- **isFetching**: Trông bất kỳ trạng thái nào, nếu có data mới thì sẽ trả về **true**

Trường hợp khi các bạn phải truyền cả params lên thì **react-query** cũng hỗ trợ cho các bạn
```javascript
useQuery(['key', params1, params2], ...)
```

Ok, hôm nay chúng ta cần ngầm tưng đây vào đầu là được rồi, chậm mà chắc :), còn các bạn nào thông minh thì lên trên document của nó đọc và làm theo những hàm mới của nó.

Bài viết của mình đến đây là dừng nhé. Hẹn các bạn ở bài tiếp theo, nếu mình có sai chỗ nào thì mong các bạn nhẹ tay góp ý cho mình. Cảm ơn các bạn đã đọc bài của mình :kissing_heart::kissing_heart: