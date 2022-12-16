Nếu đã từng làm việc với Promise, chắc hẳn phương thức `Promise.all` không còn gì xa lạ với bạn nữa. Nhưng ngoài `Promise.all` ra, Promise còn có `Promise.race`, nghe qua có vẻ khá lạ lẫm nhỉ, nhưng cả 2 phương thức này đều hoạt động trên các trình duyệt hiện đại rồi đó.

Ngoài ra, tại buổi giới thiệu What’s new in JavaScript (Google I/O ’19) diễn ra vào 8/5, 2019, các diễn ra còn giới thiệu 2 phương thức mới của Promise đó là `Promise.allSettled` and `Promise.any`.
Ở các dự án thực tế, sử dụng  `Promise.all` là chủ yếu, nhưng sẽ còn tuyệt vời hơn nếu bạn hiểu cả những phương thức khác, rồi áp dụng được chúng trong dự án như `Promise.race`, `Promise.allSettled` đúng không nào.
Vì vậy, ở bài viết này, chúng ta sẽ cũng tìm hiểu về cả 4 phương thức này, tìm điểm khác nhau giữa chúng. 

Let's go :sunglasses:.

Trước khi đọc bài này, hãy đảm bảo bạn đã nắm chắc khái niệm về Promise của JavaScript và các trạng thái của nó nhé.
Nếu chưa rõ, bạn có thể đọc thêm theo link này nhé.

**Định nghĩa Promise** 

https://kipalog.com/posts/Promise-la-khi-gi-

**Các trạng thái của Promise**
- **Fulfilled** –  trạng thái trả về kết quả thành công
- **Rejected** – trạng thái trả về kết quả thất bại
- **Pending** –  trạng thái chưa hoàn thành
- **Settled** – Không hẳn là một trạng thái, nó dùng để miêu tả một promise ở trạng thái fulfilled or rejected, tức là đã trả về kết quả

## Promise.all
Phương thức này nhận vào một mảng các promises và chỉ resolve khi tất cả các promises này hoàn thành, hoặc reject khi một trong số chúng xảy ra lỗi. Trong trường hợp có lỗi xảy ra, tất cả các promise khác dù đã kết thúc hay chưa thì đều không được quan tâm nữa.

#### Ví dụ
```
const promisesWithoutReject = [
  Promise.resolve('🍎 #1'),
  '🍎 #2',
  new Promise((resolve, reject) => setTimeout(resolve, 100, '🍎 #3'))
]

Promise.all(promisesWithoutReject)
  .then(apples => console.log(`We can sell all these good apples`, apples))

const promisesWithOneReject = [
  Promise.resolve('🍎 #1'),
  '🍎 #2',
  new Promise((_, reject) => setTimeout(reject, 100, 'Bad 🍏'))
]

Promise.all(promisesWithOneReject)
  .then(console.log)
  .catch(badApple => 
    console.error(`Threw out all apples because of this`, badApple))
```

Output:
```sql
We can sell all these good apples [ '🍎 #1', '🍎 #2', '🍎 #3' ]
Threw out all apples because of this Bad 🍏
```
Với ví dụ đầu tiên của `promisesWithoutReject`, tất cả các promise đều thành công (tất cả số táo đều được bán ra), vì vậy mà Promise.all sẽ ở trạng thái fulfilled

Còn với ví dụ sau sử dụng `promisesWithOneReject ` chỉ ra rằng  khi một promise thất bại thì kết quả Promise.all cũng sẽ bị reject, không còn quan tâm các promise khác là thành công hay thất bại nữa

#### Ứng dụng
- Gọi API đồng loạt để lấy thông tin người dùng
- Kiểm tra validate đồng loạt nhiều dòng của file csv
- ....
## Promise.allSettled

Phương thức trả về Promise luôn được resolve khi tất cả các mảng promise trả về ở trạng thái settled (kể cả là thành công hay thất bại), vì vậy sẽ không rơi vào case bị reject. 
Để phân biệt các giá trị trả về của từng promise thành công hay thất bại, kết quả của resolve sẽ trả về một array các object theo cấu trúc như sau:

- Fulfilled promise trả về` {status: 'fulfilled', value}`

- Rejected promise trả về `{status: 'rejected', reason}`

Lưu ý:  Phương thức này hiện available trên Chrome 76.

#### Ví dụ
```
const allRejectedPromises = [
  Promise.reject('🍏 #1'),
  Promise.reject('🍏 #2'),
  Promise.reject('🍏 #3'),
]

Promise.allSettled(allRejectedPromises)
  .then(badApples => 
    console.log(`We can't sell any of these apples...`, badApples))
  .catch(error => console.error('This should never occur'))

const promisesWithoutReject = [
  Promise.resolve('🍎 #1'),
  '🍎 #2',
  new Promise((resolve, reject) => setTimeout(resolve, 100, '🍎 #3'))
]

Promise.allSettled(promisesWithoutReject)
  .then(apples => console.log(`We can sell all these good apples`, apples.map(_=>_.value)))

const promisesWithOneReject = [
  Promise.resolve('🍎 #1'),
  new Promise((_, reject) => setTimeout(reject, 10, '🍏 #2')),
  '🍎 #3',
  new Promise((_, reject) => setTimeout(reject, 100, '🍏 #4'))
]

Promise.allSettled(promisesWithOneReject)
  .then(apples => {
    const badApples = apples.filter(apple => apple.status === 'rejected').map(_ => _.reason)
    const goodApples = apples.filter(apple => apple.status === 'fulfilled').map(_ => _.value)

    console.log(`Let's throw out`, badApples, `and sell the rest`, goodApples)
  })
```
```ruby
We can't sell any of these apples... 
[ { status: 'rejected', reason: '🍏 #1' },
  { status: 'rejected', reason: '🍏 #2' },
  { status: 'rejected', reason: '🍏 #3' } ]
We can sell all these good apples [ '🍎 #1', '🍎 #2', '🍎 #3' ]
Let's throw out [ '🍏 #2', '🍏 #4' ] and sell the rest [ '🍎 #1', '🍎 #3' ]
```

#### Ứng dụng
- Gửi email và cần lấy kết quả thành công hay thất bại với từng email
- Các tác vụ đồng bộ nhiều dữ liệu cần có kết quả với từng dữ liệu
-  ...
## Promise.race
Phương thức này nhận vào một mảng các promises và sẽ resolve/reject ngay khi một trong số các promises này hoàn thành/xảy ra lỗi (settled). Tức là khi có một promise kết thúc, promise sẽ trả về resolve.

#### Ví dụ

```
const promiseWillFulfill = [
  new Promise((resolve, reject) => setTimeout(reject, 250, '😈')),
  new Promise((resolve, reject) => setTimeout(resolve, 150, '😇')),
  new Promise((resolve, reject) => setTimeout(resolve, 1, '😇')),
]
Promise.race(promiseWillFulfill)
  .then(value => console.log(`The humanity survives "${value}"`))
  .catch(error => console.log(`Won't be called as 😇 will win the race`))

const promiseWillReject = [
  new Promise((resolve, reject) => setTimeout(resolve, 250, '😇')),
  new Promise((resolve, reject) => setTimeout(reject, 1, '😈')),
  new Promise((resolve, reject) => setTimeout(resolve, 250, '😇')),
]
Promise.race(promiseWillReject)
  .then(value => console.log(`This won't be called...="${value}"`))
  .catch(error => console.log(`The humanity is doomed...="${error}"`))

const promisesWithOUTReject = [
  new Promise(resolve => setTimeout(resolve, 350, 'one')),
  new Promise(resolve => setTimeout(resolve, 250, 'two')),
  new Promise(resolve => setTimeout(resolve, 150, 'three')),
]
Promise.race(promisesWithOUTReject)
  .then(value => console.log(`Promise without reject="${value}"`))
```
```sql
The humanity survives "😇"
The humanity is doomed...="😈"
Promise without reject="three"
```

##  Promise.any
Phương thức trả về ngay khi nhận được một promise ở trạng thái kết thúc (fulfilled) bất kể những promises khác là reject. Khi tất cả promise đều bị reject, Promise.any mới trả về reject

Lưu ý:  Phương thức được triển khai trên bất cứ browsers nào và hiện tại đang ở  Stage 1.

#### Ví dụ

```javascript
// Example #1
Promise.any([
    Promise.reject('✗'),
    Promise.reject('✗'),
    Promise.resolve('✓'),
    Promise.reject('✗'),
]).then(function(value) {
    console.log(`You win at life`, value)
});

// Example #2
// You get the first fulfilled value
Promise.any([
    new Promise((_, reject) => setTimeout(reject, 10, '✗')),
    new Promise((_, reject) => setTimeout(reject, 20, '✗')),
    new Promise((_, reject) => setTimeout(reject, 30, '✗')),
    new Promise(resolve => setTimeout(resolve, 100, 'I got a job!')),
    new Promise(resolve => setTimeout(resolve, 1000, 'I could have gotten a better job!')),
]).then(function(value) {
    console.log(value)
});

// Example #3
// You get all rejection reasons 
Promise.any([
    Promise.reject('✗'),
    Promise.reject('✗'),
]).catch(function(reasons) {
    console.log(`Didn't get any offers...`, reasons)
});
```
// Note that the result of Example #3 is printed first because of `setTimeout` in example #2
Chú ý rằng kết quả của Example #3 sẽ được in ra trước bởi vì  `setTimeout`  ở example #2
```objectivec
// Result of Example #1
You win at life ✓
// Result of Example #3
Didn't get any offers... [ '✗', '✗' ]
// Result of Example #2
I got a job!
```

# So sánh
### Promise.all vs. Promise.allSettled
Cả 2 đều có đầu vào là đối tượng duyệt lặp ( iterable object) ví dụ như mảng.
Nhưng:
- **Promise.all**  sẽ reject ngay khi có 1 promise trong mảng bị reject
- **Promise.allSettled** luôn luôn resolve kể cả khi có promise reject trong mảng

### Promise.race vs. Promise.any
Cả 2 đều có đầu vào là đối tượng duyệt lặp ( iterable object) ví dụ như mảng.
- **Promise.race** sẽ trả về kết quả ngay khi có một promise trong mảng trả về kết quả settled (fulfilled or rejected) và không quan tâm đến promise khác nữa.
- **Promise.any** trả về resolve khi có ít nhất một promise trả về fulfilled và chỉ trả về reject khi tất cả promise đều là reject

Để có cái nhìn tổng quát hơn, bạn có thể xem bảng so sánh dưới đây.

||Short-circuit?	|Short-circuits on?|	Fulfilled on?|	Rejected on?|
| -------- | -------- | -------- | -------- |-------- |
|Promise.all	|✅	|First rejected promise	|All promise fulfilled	|First rejected promise|
|Promise.allSettled|	❌	|N/A|	Always	|N/A|
|Promise.race	|✅	|First settled	|First promise fulfilled|	First rejected promise|
|Promise.any	|✅	|First fulfilled|	First promise fulfilled|	All rejected promises|

<br>

Bài viết đến đây là hết, hi vọng có thể giúp các bạn hiểu hơn về các phương thức của Promise. Cảm ơn các bạn đã theo dõi bài viết.

Nguồn: https://dev.to/dance2die/promise-race-vs-promise-any-and-promise-all-vs-promise-allsettled-26if