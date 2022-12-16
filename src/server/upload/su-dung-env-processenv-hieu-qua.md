> Lâu rồi không viết bài gì cả nên nay mình viết một bài xàm xàm xíu. Cũng có hữu ích cho một số bạn làm NodeJS.
> 
> - Bài viết gốc: [Sử dụng env (process.env) hiệu quả](https://blog.ltv.dev/su-dung-env-process-env-hieu-qua/)
> - Bài tiếp theo: [Tôi viết cái package @ltv/env như thế nào](https://viblo.asia/p/toi-viet-cai-package-ltvenv-nhu-the-nao-E375z6mq5GW)

## Tổng quan

`process.env` là một biến toàn cục trong NodeJS được set tự động khi app nodejs start.
Có thể hình dung thế này:
Khi ta set biến môi trường cho hệ điều hành `export NODE_PORT=3000` thì ta sẽ lấy được thông tin đó ở `process.env`, nó sẽ là: `process.env.NODE_PORT`

## Biến môi trường này có quan trọng không?

Quan trọng vãi nồi ra. Để mình ví dụ cái nhẩy.
Giả sử app NodeJS của mình có kết nối DB và thông tin nó thế này:

```
dastabase_host=127.0.0.1
database_user=root
database_port=3306
database_pass=SecurePass
```

Khi dùng ở local, thì muốn define sao cũng được, set cứng cũng được luôn. Cơ mà khi các bố mang deploy lên trên server / production / dev / hay đại loại là máy thằng khác thì nó ra sao? Nếu mà set cứng thì sẽ phải vào sửa thông tin trong code. Mỗi lần như vậy thì sẽ phải sửa. Nó phiền vcl.

Nếu chỉ có 4 cái bên trên thì chắc là cũng chả vấn đề gì nhẩy nhưng mà thường thì nó sẽ nhiều hơn như vậy rất nhiều, có thể đến vài chục cái.

Chính vì thế những thông tin có thể / cần phải thay đổi khi thay đổi môi trường chạy thì nên (`phải`) để ở biến môi trường.

## Dùng nó như thế nào?

Cơ bản là trước khi start cái app NodeJS lên thì phải set ENV cho hệ điều hành. Nhưng mà nó phiền lắm, nếu có khoảng vài chục cái env khác nhau mà các bố mang đi set trước khi start thì đúng là bệnh vãi. Vậy nên không có ai làm như vậy cả. Thường là nó dùng cái nào đó để set tự động. Nhưng trong trường hợp này thì mình không nên set vào biến môi trường của OS vì nếu mình mà dev vài cái app khác nhau thì nó sẽ bị conflict `env`. Cách tốt nhất là set vào `process.env` của mỗi app riêng biệt.

Đâu đó nó thế này:

```javascript
process.env.DATABASE_PORT=3000
```

Với NodeJS app thì ta có 1 cái package khá nổi tiếng để set env cho biến `process.env` đó là `dotenv`. Và việc của mình là mang hết env vào trong một file. VD: `.env` / `local.env` chẳng hạn.

VD: `local.env`

```bash
DATABASE_HOST=127.0.0.1
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASS=SecurePass
```

Rồi trong code mình load thế này (`app.js` / `index.js`):

```javascript
require('dotenv').config({ path: 'local.env' })
```

Sau đó thì cái biến global `process.env` sẽ có toàn bộ những env mà mình đã define ở file `local.env` và có thể dùng bất cứ đâu trong app NodeJS.

VD:

```javascript
const connection = new Connection({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  pass: process.env.DATABASE_PASS
});
```

## Dùng sao cho ngon

> Câu chuyện ở trên chắc là các đồng chí đã hiểu rồi nhẩy. Vấn đề bây giờ là dùng sao cho ngon.

Quay lại câu chuyện ở trên, nếu các bố có file `env` thì không sao, nhưng nếu không có thì cũng vỡ mặt. Cái đống `process.env` sẽ không có gì. Vậy giờ nếu không có env thì sẽ xử lý sao? 

Điều đương nhiên là phải check null rồi set default env chớ mọe gì nữa.

```javascript
const connection = new Connection({
  host: process.env.DATABASE_HOST || 'localhost',
  port: process.env.DATABASE_PORT || 3306,
  user: process.env.DATABASE_USER || 'root',
  pass: process.env.DATABASE_PASS || 'noPASSon'
});
```

Ờ. Có vẻ là giải quyết vấn đề rồi đấy. Nhưng nếu đi sâu hơn 1 tí, thì tất cả các env đều có value type là string. Có nghĩa là cái thằng `process.env.DATABASE_PORT` sẽ là: `'3306'` chứ không phải là `3306`. Mà cái mình muốn thì nó phải là `3306`.

Tương tự, trường hợp oái oăm hơn nó có thể xảy đến thế này:

Các ông có:

```
DATABASE_SSL=false
```

Lúc dùng thì là:

```javascript
const connection = new Connection({
  ...otherConfigs,
  ssl: process.env.DATABASE_SSL || true
});
```

Các bố để ý nhé. `process.env.DATABASE_SSL` là string `'false'` Mà string khác `empty` khác `undefined` và khác `null` thì có nghĩa là `ssl=true`.

Chết mọe rồi. Các bố đang muốn set `ssl=false` mà. Chuyện phức tạp hơn rồi phải không?

Vậy có nghĩa là phát sinh thêm một chuyện nữa. Các bố bắt buộc phải ép kiểu từ string về kiểu chính xác muốn dùng. Chốt lại có 2 chuyện cần làm:

- Check null
- Ép kiểu

Vậy túm cái váy lại là dùng thế nào cho gọn và ngon?

Để cho ngắn gọn thì các đồng chí install thằng này:

```bash
yarn add @ltv/env # npm i -S @ltv/env
```

Và dùng thôi:

```javascript
const env = require('@ltv/env')
// Or can use with import
import env from '@ltv/env'

const dbPort = env.int('DATABASE_PORT', 3000)
# or string
const dbHost = env('DATABASE_HOST', 'localhost')
# or bool
const useSSL = env.bool('DATABASE_SSL', false)

# First arg is VARIABLE NAME
# Second arg is DEFAULT VALUE
```

Sử dụng ở ví dụ trên thì nhìn nó thế này:

```javascript
const connection = new Connection({
  host: env('DATABASE_HOST', 'localhost'),
  port: env.int('DATABASE_PORT', 3306),
  user: env('DATABASE_USER', 'root'),
  pass: env('DATABASE_PASS', 'noPASSon)',
  ssl: env.bool('DATABASE_SSL')
});
```

Trong bài viết tới chúng ta sẽ tìm hiểu xem viết cái `lib` này ra làm sao sau nhé. Một số bạn quen với NodeJS, mọi người có thể vào: https://github.com/ltv/env