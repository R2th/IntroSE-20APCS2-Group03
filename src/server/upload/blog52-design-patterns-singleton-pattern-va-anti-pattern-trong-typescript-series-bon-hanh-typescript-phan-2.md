![image.png](https://images.viblo.asia/3de49e53-efca-4a9e-a6b1-447f32af698d.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😊.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😉.

**Cách sử dụng Singleton Pattern bằng TypeScript để giải quyết các vấn đề thực tế trong các project web giúp Chia sẻ một Global Instance duy nhất trong toàn bộ ứng dụng.**

Chào mừng bạn đến với loạt bài **Design Patterns trong TypeScript**, loạt bài này mình sẽ giới thiệu một số Design Patterns hữu ích trong phát triển web bằng TypeScript.

Các **Design Patterns** rất quan trọng đối với các web developer và chúng ta có thể code tốt hơn bằng cách thành thạo chúng. Trong bài viết này, mình sẽ sử dụng **TypeScript** để giới thiệu **Singleton Pattern** .

Singleton Pattern
----

**Singleton Pattern** là một mẫu phổ biến và chúng ta thường chỉ cần một trong một số đối tượng, chẳng hạn như bộ đệm chung, đối tượng windown trong Browsers, v.v. **Singleton Pattern được sử dụng để đảm bảo rằng chỉ có một Instance của một Class và để cung cấp một điểm truy cập global duy nhất cho nó** .

Chúng ta hãy xem cách sử dụng TypeScript để implement Singleton Pattern.

```javascript
class Singleton {
  private static singleton: Singleton; // ①
  private constructor() {} // ②
  public static getInstance(): Singleton { // ③
    if (!Singleton.singleton) {
      Singleton.singleton = new Singleton();
    }
    return Singleton.singleton;
  }
}
```

Khi định nghĩa class `Singleton`, có ba bước quan trọng:

1.  Xác định một `private static Properties` để giữ đối tượng Instance ;
2.  Xác định một `private constructor`;
3.  Cung cấp một `public static getInstance()` để lấy một Instance đối tượng.

Trong VSCode, đối với các private static Properties, `IntelliSense` của VSCode sẽ tự động lọc ra các `Properties` này:

![image.png](https://images.viblo.asia/708db7d9-9ff5-4a64-bad9-4c441b572605.png)

Đối với `private constructor`, khi chúng ta tạo một Instance thông qua `new Singleton()`, trình biên dịch TypeScript sẽ nhắc thông báo lỗi sau:

```console
Constructor of class 'Singleton' is private and only accessible within the class declaration.ts(2673)
```

Với class `Singleton`, hãy thử check xem các instance của nó có thật là duy nhất:

```javascript
let instance1 = Singleton.getInstance();
let instance2 = Singleton.getInstance();
console.log(instance1 === instance2); // true
```

Cách dễ nhất để implement một singleton trong JavaScript là sử dụng một **đối tượng theo đúng nghĩa đen**：

```javascript
const httpClient = {
  get(url, config) {
    // send get request
  },
  post(url, config) {
    // send post request
  },
};
```

Nếu bạn cần chứa thêm các private `properties` hoặc `methods`, bạn có thể sử dụng các cách sau để tạo một singleton:

```javascript
const httpClient = (function () {
  // private method
  function sendRequest(url, config) {
    // send request
  }
  return {
    get(url, config) {
      return sendRequest(url, config);
    },
    post(url, config) {
      return sendRequest(url, config);
    },
  };
})();
```

Nếu bạn đang sử dụng ES6, bạn có thể khai báo một singleton bằng **ES Modules** rất dễ dàng:

```javascript
export default {
  get(url, config) {
    // send get request
  },
  post(url, config) {
    // send post request
  },
};
```

[Axios](https://axios-http.com/) được sử dụng rộng rãi trong các project web khác nhau và đối tượng `axios` được cung cấp cũng là một đối tượng **Singleton**.

```javascript
import axios from "axios";
axios.get('/users')
  .then(res => {
    console.log(res.data);
 });
```

Ví dụ trên `axios` sử dụng đối tượng configure mặc định, tất nhiên Axios cũng cho phép chúng ta sử dụng hàm `axios.create` để tạo một **instance** mới của axios với configure tùy chỉnh.

```javascript
const instance = axios.create({
  baseURL: 'https://mediuem.com/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'Bytefer'}
});
```

Các tình huống sử dụng của Singleton Pattern:

*   Các đối tượng mất quá nhiều thời gian hoặc tài nguyên để tạo nhưng lại thường được sử dụng lại nhiều lần.
*   Vì Singleton Pattern chỉ có một Instance trong bộ nhớ nên mức sử dụng bộ nhớ giảm, đặc biệt là khi một đối tượng cần được tạo và hủy thường xuyên => không thể tối ưu hóa hiệu suất trong quá trình tạo hoặc hủy, đó là luc **Singleton Pattern** phát huy hết sức mạnh của mình.
  
Tuy nhiên không phải lúc nào **Singleton Pattern** cũng hữu dụng đôi khi sử dụng nó cũng sẽ là một Anti-Pattern.

Ví dụ: Chắc bạn nào code Nodejs + Postgres thì ko lạ gì cái thư viện [pg](https://node-postgres.com/) này rồi đúng ko?
Việc Connect tốn time và cũng tốn tài nghuyên. Woa chuẩn rồi công thức rồi áp dụng công thức thôi.

```javascript
import { Pool } from 'pg';

const pool = new Pool();

export async function query(query: any) {
  const { rows } = await pool.query(query);
  return rows;
}
```

`pool` giờ là một Singleton Instance ok dùng thôi.

```javascript
import { query } from '../'
 
async function doSomething() {
  try {
    await query('BEGIN')
    const queryText = 'INSERT INTO users(name) VALUES($1) RETURNING id'
    const res = await query(queryText, ['brianc'])
  
    const insertPhotoText = 'INSERT INTO photos(user_id, photo_url) VALUES ($1, $2)'
    const insertPhotoValues = [res.rows[0].id, 's3.bucket.foo']
    await query(insertPhotoText, insertPhotoValues)
    await query('COMMIT')
  } catch (e) {
    await query('ROLLBACK')
    throw e
  }
}
await doSomething()
```

Opps!!! ko ổn chút nào trong trường hợp này thì nếu dùng 1 Instance thì lại phản tác dụng -> bug

[Theo node-postgres doc:](https://node-postgres.com/features/transactions) Để thực hiện một transaction với **node-postgres**, bạn chỉ cần thực hiện các truy vấn `BEGIN/COMMIT/ROLLBACK` thông qua một Instance là OK.
Tuy nhiên lưu ý: Bạn phải sử dụng cùng một Instance `client` cho tất cả các câu lệnh trong một `transaction`. PostgreSQL cô lập một `transaction` cho các `client`. Điều này có nghĩa là nếu bạn khởi tạo hoặc sử dụng các `transaction` bằng phương thức `pool.query`, bạn sẽ gặp `**LỖI**`. Khuyến cáp không sử dụng các `transaction` với phương thức `pool.query`. 

Cách đúng sẽ là:

```javascript
const { Pool } = require('pg')
const pool = new Pool()
 
// note: we don't try/catch this because if connecting throws an exception
// we don't need to dispose of the client (it will be undefined)
const client = await pool.connect()
 
try {
  await client.query('BEGIN')
  const queryText = 'INSERT INTO users(name) VALUES($1) RETURNING id'
  const res = await client.query(queryText, ['brianc'])
 
  const insertPhotoText = 'INSERT INTO photos(user_id, photo_url) VALUES ($1, $2)'
  const insertPhotoValues = [res.rows[0].id, 's3.bucket.foo']
  await client.query(insertPhotoText, insertPhotoValues)
  await client.query('COMMIT')
} catch (e) {
  await client.query('ROLLBACK')
  throw e
} finally {
  client.release()
}
```

=> Khi bạn sử dụng một **Design Pattern** nào đó thậm chí công thức y hệt như SGK thì cũng có lúc tạch là chuyện rất bình thường. 
Thầy cô VN cũng có câu kinh điển: Môn TOÁN giễ lắm mấy em chỉ cần áp dụng công thức là ra. Đúng thật chỉ cần áp dụng công thức là ra.... mà là ra khỏi phòng thi nộp bái sớm.

Thời gian tới mình cũng sẽ viết một bài về Anti-Pattern và sẽ đào sâu về vấn đề này. Các bạn nhớ theo dõi mình để đón đọc nhé. 

Roundup
----
Như mọi khi, mình hy vọng bạn thích bài viết này và học thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

Ref
----
* https://tuan200tokyo.blogspot.com/2022/11/blog52-design-patterns-singleton.html