## 1. Mở bài
Xin chào các bạn, lại là mòe vui vẻ đây. 
Rất nhiều ứng dụng Nodejs hiện nay sử dụng jsonwebtoken (JWT) để xác thực người dùng.

JWT là một phương tiện đại diện cho các yêu cầu chuyển giao giữa hai bên Client – Server , các thông tin trong chuỗi JWT được định dạng bằng JSON . Trong đó chuỗi Token phải có 3 phần là header , phần payload và phần signature được ngăn bằng dấu “.”

![image.png](https://images.viblo.asia/27221a2b-b315-4d9a-a974-aea6f556caf9.png)

Các bạn có thể nhìn vào sơ đồ sau để hiểu hơn về cơ chế hoạt động của JWT

![image.png](https://images.viblo.asia/f4a47d3b-da74-47aa-beb3-5364b8ce4130.png)

Mòe cũng theo xu hướng tập tọe học JWT, ban đầu thì rất nhàn và sướng. nhưng sau đó vấn đề bắt đầu xuất hiện khiến mòe nhiều đêm mất ngủ, nửa đêm vỗ gối, nước mắt đầm đìa tìm lời giải
## 2. Vấn đề của mòe
Thông thường, khi người dùng đăng xuất khỏi ứng dụng, người ta chỉ xóa JWT ở phía client. Thực thế, bạn vẫn có thể sử dụng token đó để request các API cho đến khi token đó hết hạn.
Thời gian hiệu lực của JWT là cố định, bạn không thể set lại thời gian hiệu lực của token sau khi tạo. Vậy nên bạn không thể hủy token một cách thủ công được. Vậy nên đối với một số ứng dụng cần đăng xuất một cách hoàn toàn thì ta cần phải destroy token cả ở phía server side nữa.

Sau khi tham khảo ý kiến từ người chị Gu Gồ thì mòe đã tìm ra được một vài cách để khắc phục vấn đề trên như: 
 - Đặt thời gian hết hạn hợp lý cho token => chỉ khắc phục được phần nào thôi, với lại mòe không giỏi ước lượng lắm nên mòe bỏ qua.
 - Blacklist: Lưu lại toàn bộ token đã hết hạn hoặc không còn khả dụng nữa, khi xác thực thì kiểm tra token có trong blacklist không, nếu có thì tức là token này đã bị hủy => Cách này khá hay, nhưng nhước điểm là phải lưu vĩnh viễn đối với các token không set thời gian hiệu lực, hoặc phải lưu thời gian dài tùy theo thời hạn hiệu lực của token.

## 3. Hướng đi của mòe
So với ý tưởng blacklist ở trên thì mòe thấy dùng whitelist lại hay hơn phần nào.
Đơn giản là khi tạo token thì ta lưu lại token đó vào whitelist và set TTL (Time To Live) trùng với thời gian hiệu lực của token. Khi xác thực token thì chỉ việc check thêm trên whitelist có token này không, nếu có thì token còn hiệu lực, không thì token đã bị hủy rồi.
Khi token hết hạn thì bản ghi trên whitelist cũng tự xóa luôn, còn nếu muốn hủy thì đơn giản là ta chỉ cần xóa token này ở whitelist là xong.

## 4. Từ ý tưởng đến hành động
Ý tưởng đã rõ, mòe bắt tay vào test luôn cho nóng. Ở đây mòe sẽ lưu whitelist vào redis vì những ưu điểm không phải bàn cãi của nó.

* Trước tiên thì cứ kết nối vào redis với package **ioredis** đã.
```
import Redis from 'ioredis'

export const redis = new Redis({
  host: '127.0.0.1',
  port: 6379,
  db: 0
})

redis.on('connect', function () {
  console.log('connected redis success!!!')
})

redis.on('error', function (err) {
  console.log('Connected redis Error ' + err)
})
```

* Sau đó thì tạo class **JwtRedis** để quản lý jwt
```
import { redis } from './redis';
import jwt from 'jsonwebtoken'

export default class JwtRedis {
  private readonly redisPrefix: string

  constructor(prefix: string) {
    this.redisPrefix = prefix
  }

  async sign(
    payload: string | object | Buffer,
    secretOrPrivateKey: jwt.Secret,
    options?: jwt.SignOptions
  ): Promise<string> {
    const token = jwt.sign(payload, secretOrPrivateKey, options)
    const decoded: any = jwt.decode(token)
    const key = `${this.redisPrefix}_${token}`
    // Nếu token này có expire time thì set TTL cho key
    if (decoded.exp) {
      const now = Date.now();
      const duration = Math.floor(decoded.exp - (now / 1000));
      if (duration > 0) {
        await redis.setex(key, duration, 'true');
      }
    // Không thì cứ lưu nó đấy cho đến khi mình destroy thì thôi
    } else {
      await redis.set(key, 'true');
    }
    return token
  }

  async verify(token: string) {
    const decoded: any = jwt.decode(token)
    const key = `${this.redisPrefix}_${token}`
    // Check xem trên redis có token này không
    const redisRecord = await redis.get(key)
    // Nếu không có thì token đã bị destroy rồi
    if (!redisRecord) throw new Error('Token destroyed!')
    return decoded
  }

  // Hủy token đi thì mình chỉ việc xóa key tương ứng trên redis thôi
  destroy = (token: string): Promise<number> => {
    const key = `${this.redisPrefix}_${token}`
    return redis.del(key);
  }
}
```
* Cuối cùng là test xem có ưng cái bụng không
```
import JwtRedis from "./JwtRedis"

(async () => {
  const jwtRedis = new JwtRedis('user')
  const token = await jwtRedis.sign(
    { id: 189278323 },
    "yourSecret",
    {
      expiresIn: '1h'
    }
  )
  console.log('token:', token)
  // token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTg5Mjc4MzIzLCJpYXQiOjE2NTI5NDE5NTUsImV4cCI6MTY1Mjk0NTU1NX0.KO3w8WP5JaZXOrR1Bov1iH7-e3KGbog2JdQhNZmI9Kw
  const decode = await jwtRedis.verify(token)
  console.log('decode:', decode)
  // decode: { id: 189278323, iat: 1652941955, exp: 1652945555 }
  await jwtRedis.destroy(token)
  const decodeAfterDestroy = await jwtRedis.verify(token)
  // Error: Token destroyed!
  console.log('decodeAfterDestroy: ', decodeAfterDestroy)
})()
```

Ngon lành cành đào luôn. Vậy là sau này mình chỉ việc dùng class JwtRedis để tạo và quản lý token là được.

**Bonus:**

Để tránh lưu cả token vào db thì các bạn có thể tạo ra UUID tương ứng với token để làm key redis. UUID này sẽ được truyền vào payload mỗi khi tạo token và khi giải mã token, ta luôn nhận được UUID này. 
Để kiểm tra token đã được destroy chưa thì thay vì check token có tồn tại trên redis không, ta check uuid có tồn tại trên redis không.

```
import { redis } from './redis'
import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken'

export default class JwtRedis {
  private readonly redisPrefix: string

  constructor(prefix: string) {
    this.redisPrefix = prefix
  }

  async sign<T extends object & { redisId?: string }>(
    payload: T,
    secretOrPrivateKey: jwt.Secret,
    options?: jwt.SignOptions
  ): Promise<string> {
    // Tạo uuid
    payload.redisId = uuidv4()
    const token = jwt.sign(payload, secretOrPrivateKey, options)
    const decoded: any = jwt.decode(token)
    // Kết hợp prefix và uuid làm key redis tương ứng với token hiện tại
    const key = `${this.redisPrefix}_${decoded.redisId}`
    // Nếu token này có expire time thì set TTL cho key
    if (decoded.exp) {
      const now = Date.now();
      const duration = Math.floor(decoded.exp - (now / 1000));
      if (duration > 0) {
        await redis.setex(key, duration, 'true');
      }
      // Không thì cứ lưu nó đấy cho đến khi mình destroy thì thôi
    } else {
      await redis.set(key, 'true');
    }
    return token
  }

  async verify(token: string) {
    const decoded: any = jwt.decode(token)
    const key = `${this.redisPrefix}_${decoded.redisId}`
    // Check xem trên redis có token này không
    const redisRecord = await redis.get(key)
    // Nếu không có thì token đã bị destroy rồi
    if (!redisRecord) throw new Error('Token destroyed!')
    return decoded
  }

  // Hủy token đi thì mình chỉ việc xóa key tương ứng trên redis thôi
  destroy = (token: string): Promise<number> => {
    const decoded: any = jwt.decode(token)
    const key = `${this.redisPrefix}_${decoded.redisId}`
    return redis.del(key);
  }
}
```

Test:

```
import JwtRedis from "./JwtRedis"

(async () => {
  const jwtRedis = new JwtRedis('user')
  const token = await jwtRedis.sign(
    { id: 189278323 },
    "yourSecret",
    {
      expiresIn: '1h'
    }
  )
  console.log('token:', token)
  // token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTg5Mjc4MzIzLCJyZWRpc0lkIjoiZTY5ODA2ZDctMzg4Ny00NDI0LWI3M2UtOWY1YjdmYTZjNGI4IiwiaWF0IjoxNjUzMDExMTUwLCJleHAiOjE2NTMwMTQ3NTB9.5h6sBaMLGcZ9gbNDh5GeGij1LlM-nh4IczMI03rtqhk 
  const decode = await jwtRedis.verify(token)
  console.log('decode:', decode)
  // decode: { id: 189278323, redisId: 'e69806d7-3887-4424-b73e-9f5b7fa6c4b8', iat: 1653011150, exp: 1653014750 }
  await jwtRedis.destroy(token)
  const decodeAfterDestroy = await jwtRedis.verify(token)
  // Error: Token destroyed!
  console.log('decodeAfterDestroy: ', decodeAfterDestroy)
})()
```

-----

Nếu các bạn thấy bài viết hay và có ích, hãy upvote cho mòe nhé. Bạn nào có cách làm hay hơn thì có thể comment dưới bài để mòe tham khảo.

Xin cảm ơn các bạn đã dành thời gian đọc bài của mòe và hẹn gặp lại các bạn trong những bài viết sau.