Hi các bạn, hôm nay mình xin giới thiệu tới các bạn một món hàng rất tiện dụng khi làm pet project bằng nodejs, đó là lowdb.
## Khái niệm
lowdb là gì: là một  JSON database nhỏ cho các ứng dụng node, electron or browser, đơn giản hơn thì lowdb cho phép bạn lưu database dạng JSON dưới dạng file hoặc cũng có thể là localstorage.

lowdb có đặc điểm gì: nó được cung cấp bởi lodash, nên nếu bạn đã làm quen với lodash thì việc sử dụng lowdb cũng cực kì dễ dàng, đồng thời lowdb cũng cho phép bạn custom adapter(mình ít sử dụng cái này) hoặc encrypt data

## Cách sử dụng lowdb
### Khởi tạo lowdb
Với các ứng dụng node/electron: `npm install lowdb` or `yarn add lowdb`

Hoặc browser: 
```markdown
<script src="https://unpkg.com/lodash@4/lodash.min.js"></script>
<script src="https://unpkg.com/lowdb@0.17/dist/low.min.js"></script>
<script src="https://unpkg.com/lowdb@0.17/dist/LocalStorage.min.js"></script>
<script>
  var adapter = new LocalStorage('db')
  var db = low(adapter)
</script>
```

Tạo file `db.js` nội dung như sau:
```javascript
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('database.json')
const db = low(adapter)

db.defaults({ posts: [] }).write() // đoạn này để set default trong file json ta có một mạng posts rỗng

module.exports = db
```
Một file `database.json` sẽ được tạo cho bạn ngay tại thư mục root, muốn thay đổi đường dẫn sang một thư mục khác bạn chỉ cần sửa đoạn code sau:

`new FileSync('database.json')` => `new FileSync('folder-name/database.json')`

**Lưu ý:** ở đây chúng ta sử dụng JSON files để lưu, bạn cũng có thể sử dụng localStorage để thay thế cho FileSync adapter

lowdb đã sẵn sàng để sử dụng.

### Bắt đầu với CRUD nào :) 

Thêm một bài viết mới:
```javascript
db.get('posts')
  .push({
      id: 1,
      title: 'tại sao Tào Tháo lại là gian hùng?',
      isPublish: false,
      view: 0,
      cai_nay_de_xoa: 'No beer, no life'
  })
  .write()
```

Lấy tất cả bài viết:
```python
db.get('posts').value()
```
Lấy một bài viết:
```erlang:erlang
db.get('posts').find({id: 1}).value()
```
Update bài viết thành public
```javascript
db.get('posts')
  .find({ id: 1 })
  .assign({ isPublish: true})
  .write()
```
Xóa bài viết:
```javascript
db.get('posts')
  .remove({ id: 1 })
  .write()
```
### Rồi, xem nó còn có gì hay ho hơn CRUD không?
Kiểm tra có bài viết nào hay không
```python
db.has('posts').value()
```

Lấy 5 bài viết và sort bài viết theo lượt view 
```python
db.get('posts')
  .filter({isPublish: true})
  .sortBy('view')
  .take(5)
  .value()
```

Đếm tổng số bài viết:
```python
db.get('posts').size().value()
```

Xóa một property của bài viết:
```python
db.unset('posts.cai_nay_de_xoa').write()
```

Ồ, đến đây bạn có thể nhận ra, nếu đánh số `ID` như mình viết thì có lẽ khá củ chuối, vì vậy bạn có 2 lựa chọn khác để thay thế cho việc tự increment id bằng cách cộng 1 cho id cuối cùng bằng việc sử dụng [shortid ](https://github.com/dylang/shortid) hoặc [lodash-id](https://github.com/typicode/lodash-id).

Ví dụ: sử dụng **shortid** 
Sau khi install bạn cần import vào chỗ tạo bài viết trước
```javascript
const shortid = require('shortid')
```
Ta sẽ thay thế đoạn create post như sau:
```markdown
const postId = db
  .get('posts')
  .push({
      id: shortid.generate(),
      ... // đoạn này giống như ví dụ bên trên nhé, chỉ là thay id bằng shortid thôi
  })
  .write()
  .id // sau khi write thì bạn có thể lấy luôn id của post bạn vừa mới thêm vào
```
Lấy bài viết bạn vừa thêm dựa vào id của bài bạn vừa tạo:
```css
const post = db
  .get('posts')
  .find({ id: postId })
  .value()
```
### Lưu ý khi sử dụng lowdb
- database lưu dưới dạng file JSON nên khi file quá lớn có thể gặp một số vấn đề
- dữ liệu trả về là dạng tham chiếu, vì vậy khi bạn lấy danh sách các post rồi thêm một thuộc tính hoặc xóa hoặc làm gì đó thì db cũng sẽ tự update lại vì vậy bạn cần sử dụng `.cloneDeep()` để tránh việc này xảy ra khi không cần thiết

Ví dụ:
```python
db.get('posts').cloneDeep().value()
```

Lúc mình dùng bị sai mà mình không biết vì không đọc kĩ đoạn này, mình đã fix bằng cách clone từ data mà mình đã lấy ra, đúng là luôn cần đọc kĩ hướng dẫn trước khi dùng mà  😁😁

## Kết
Qua bài viết mình muốn giới thiệu sơ qua về `lowdb` một công cụ giúp việc thực hiện pet project hoặc các thử nghiệm một cái gì đó mới trong project của các bạn mà không mất công cài cắm, config db dài dòng.

Còn rất nhiều tính năng thú vị mà mình cũng chưa thử hết và cũng khó để viết hết vì khá là dài nên mình tạm giới thiệu qua các tính năng cơ bản mà bạn có thể dùng với `lowdb`. 

Git repo của lowdb: https://github.com/typicode/lowdb

Thank for your time, bro (☞ﾟヮﾟ)☞