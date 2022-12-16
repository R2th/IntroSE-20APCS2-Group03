Mình đang code 1 website cá nhân, không đăng kí doanh nghiệp nên xài API chùa của bank để check lịch sử giao dịch rồi cộng tiền. 

Ý tưởng là khách sẽ chuyển tiền vào bank mình theo cú pháp kiểu như:
* Số: `nap 0123456`,
* Username:  `nap username`,  
* Email: `nap thatisemail@gmail.com` 
* Id Mongodb:  `nap 507f191e810c19729de860ea` 

Nhìn thôi cũng biết mình chọn cách nào rồi đúng không, email thì quá dài và 1 số bank không cho nhập kí tự đặc biệt, id mongodb thì đúng là thảm hoạ cho người dùng, username và số là ok nhất rồi.

Tuy nhiên collection bên mình không có field `username`, mà chỉ có `email` và `_id` (mặc định của mongodb) là không trùng lặp, nên giờ mình cần tạo filed mới để cho user nạp tiền, ở đây mình đặt tên nó là  `payment_id`, field này type Number, tăng dần, unique . Xài Sql thì dễ rồi, cho auto inc số là xong, còn mongodb thì làm thế nào đây ?

Dưới đây là bản phác thảo mình viết để hệ thống lại. Bài toán trên của mình thì mình xài cách 1 dưới đây do số lượng User đăng kí đồng thời khá thấp và mức delay chấp nhận được. Các cách khác sau mình khi cần scale mình sẽ dùng tới nên code có thể chưa được clean nhé!

# Atomic Update
Đúng như cái tên của của nó, findOneAndUpdate là giải pháp đầu tiên mà bất kì coder nào cũng nghĩ tới.
Tạo 1 collection `PaymentCounter` có filed là `count`.
Sau đó mỗi 1 lần user đăng kí mới, bạn sẽ 

```javascript
let {payment_id} = await PaymentCounter.findOneAndUpdate(
    {}, 
    {$inc: {count: 1}}, 
    {new: true}
);
let user = new User({
    email,
    ....
    payment_id
 });
 // update user and return payment_id here
```

Cơ mà với bài toán của mình, mình sẽ thêm 1 đoạn code nữa để khi thanh toán, nếu user không có `payment_id` thì mình mới update `payment_id` của user đó vào db.

Thực ra cũng có 1 cách nữa mình nghĩ tới đó là vứt luôn cái đống auto-inc unique mongodb này vào sọt rác, khi người dùng thanh toán thì mới bắt họ update username nếu chưa có là xong, nhưng thôi, thử thách bản thân 1 tí xem sao. 

> Rồi lại nói dông dài, thế cuối cùng là thử thách gì, có mỗi 1 cái findOneAndUpdate cũng lên bài. Nào my friend, bĩnh tĩnh....

Bây giờ web bạn đủ lớn thì cái giải pháp này chính là thứ bopdai web của bạn. Ví dụ giờ có 200 cái request đăng kí (hoặc user nạp lần đầu nếu bạn theo phương pháp của mình) post lên server 1 phát thì sao. Đúng rồi, cả 200 request này sẽ bị block mới lệnh atomic udpate findOneAndUpdate của bộ đếm.

# Vẫn là Atomic Update nhưng trên multiple document
Ý tưởng đơn giản lắm, thay vì atomic trên 1 cái document thì giờ atomic trên nhiều cái thôi, ez game

Ví dụ mình tạo 10 bộ đếm là 10 doc, mỗi 1 doc đại diện cho 1 khoảng số, ví dụ  từ `10.000` -> `19.999`, `20.000` -> `29.999` .... `90.000` ->  `99.999`.

Khởi tạo bộ đếm
```javascript
const NUM_OF_COUTER = 10;
const RANGING = 1000;
for(let i = 1; i <= NUM_OF_COUTER; i++){
    await PaymentCounter.findOneAndUpdate(
        { id_counter: i}, 
        {
            $setOnInsert: {
                start_count: i*RANGING,
                 max_count: (i+1)*RANGING - 1,
                count: i*RANGING, 
              }
         }, 
        {upsert: true}
    )
}
```

Chỗ dùng bộ đếm bây giờ sẽ đổi thành

```javascript
let random = RandomIntMinMax(0,10);
let {counter} = await PaymentCounter.findOneAndUpdate(
    {id_counter: random}, 
    {$inc: {count: 1}}, 
    {new: true}
);
```

> Ơ, thế ví đụ đếm nó nó full luôn rồi thì sao, kiểu id_counter = 1 mà count nó lên `20.000` thì sao? 

Dễ, thì reset bộ đếm qua 1 bộ đếm khác

```javascript
let random = RandomIntMinMax(0, 10);
    let id_counter = random;
    let { start_count, count, max_count } = await PaymentCounter.findOneAndUpdate(
        { id_counter },
        { $inc: { count: 1 } },
        { new: true }
    );
    if (count > max_count) {
        let overflow_count = max_count - count;
        let old_start_count = start_count;
        start_count = ((old_start_count / RANGING) + NUM_OF_COUTER) * RANGING;
        ({ start_count, count, max_count } = await PaymentCounter.findOneAndUpdate(
            { id_counter },
            {
                $set:
                {
                    count: start_count + overflow_count,
                    start_count: start_count,
                    max_count: new_max_count
                }
            },
            { new: true }
        ));
    }
```
`((old_start_count / RANGING) + NUM_OF_COUTER) * RANGING` là gì thế? 

Ví dụ `NUM_OF_COUTER=3`, `RANGING=100` thì ta sẽ có
![image.png](https://images.viblo.asia/89ad8155-b13c-4ef3-9197-82abca15a446.png)
> Lỡ có trường hợp có nhiều request cùng dùng 1 bộ đếm bị full đồng thời, thì nó có chạy ổn không? Thử tự đưa ra đáp án và lời giải thích nhé. (1)

# Vẫn là Atomic Update trên multiple document nhưng thêm queue
Chỗ này ngắn ngọn dễ hiểu đối với ai đã biết cách dùng Queue (nếu chưa biết thì bạn có thể tham khảo qua các bài viết của anh @monmen nhé). Thay vì random thì đẩy nó vào queue, và tạo số lượng worker = bộ đếm mà bạn có, để phân bổ đều trên các bộ đếm. Chỗ reset bộ đếm khi full dễ dàng hơn (vì không cần lo nhiều request đồng thời cùng gọi đến 1 bộ đếm đã full). 

![image.png](https://images.viblo.asia/f1c51c83-edcc-4f90-bb0d-b1f7e9cae049.png)

Dưới đây là full code trong project của mình, bạn hãy chỉnh lại RANGING cho phù hợp, phần type các bạn cứ kệ nhé, để sau mình mở rộng 1 bộ đếm khác cho chức năng khác thôi.

```javascript
const BullQueue = require("bull");
const EventEmitter = require("events");
EventEmitter.defaultMaxListeners = 200;

const { redisSetting, redis, IS_DEV } = require("../config");
const logger = require("../lib/logger");
const Counter = require("./model");

// không chỉnh sửa 2 const dưới đây khi đã chạy production
// Do not edit the 2 constants below when production is running
const __DANGEROUSLY_SET_RANGING = IS_DEV ? 10 : 10000;
const __DANGEROUSLY_SET_NUM_OF_COUNTER = 10;
//

exports.InitCounter = async (type) => {
  logger.info("InitCounter...", { type });
  if (!type || !["product", "user"].includes(type))
    throw new Error("Invalid type");
  for (let i = 1; i <= __DANGEROUSLY_SET_NUM_OF_COUNTER; i++) {
    await Counter.findOneAndUpdate(
      { id_counter: `${type}-${i}` },
      {
        $setOnInsert: {
          start_count: i * __DANGEROUSLY_SET_RANGING,
          max_count: (i + 1) * __DANGEROUSLY_SET_RANGING - 1,
          count: i * __DANGEROUSLY_SET_RANGING,
        },
      },
      { upsert: true }
    );
  }
  logger.info("Init Counter Success");
};
let _check = {};

const counterQueues = Array.from(
  new Array(__DANGEROUSLY_SET_NUM_OF_COUNTER)
).map(
  (_, i) =>
    new BullQueue(`counter_queue_${i}`, {
      prefix: `counter_queue_${i}`,
      redis: redisSetting,
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: { age: 60 * 60 * 24, count: 200 },
        attempts: 3,
        backoff: { type: "exponential", delay: 1000 },
      },
    })
);
counterQueues.forEach((counterQueue, i) => {
  counterQueue.process(1, async (job) => {
    let { type } = job.data;
    if (!type || !["product", "user"].includes(type))
      throw new Error("Invalid type");

    let id_counter = `${type}-${i + 1}`;
    let ver = 0,
      start_count = 0,
      count = 0,
      max_count = 0;

    ({ ver, start_count, count, max_count } = await Counter.findOneAndUpdate(
      { id_counter },
      { $inc: { count: 1 } },
      { new: true, lean: true }
    ));

    // logger.trace("GetCountUser", { ver, start_count, count, max_count });
    // tạo counter mới trong trường hợp counter full, ví dụ min max 0 -> 99, current_count = 100,
    if (count > max_count) {
      let overflow_count = count - max_count;
      let old_start_count = start_count;
      start_count =
        (old_start_count / __DANGEROUSLY_SET_RANGING +
          __DANGEROUSLY_SET_NUM_OF_COUNTER) *
        __DANGEROUSLY_SET_RANGING;
      let new_max_count =
        (old_start_count / __DANGEROUSLY_SET_RANGING +
          __DANGEROUSLY_SET_NUM_OF_COUNTER +
          1) *
          __DANGEROUSLY_SET_RANGING -
        1;

      logger.trace("full counter", {
        ver,

        old_count: count,
        old_start_count,
        old_max_count: max_count,
        overflow_count,

        new_start_count: start_count,
        new_max_count,
      });
      ({ ver, start_count, count, max_count } = await Counter.findOneAndUpdate(
        { id_counter },
        {
          $set: {
            count: start_count + overflow_count,
            start_count: start_count,
            max_count: new_max_count,
          },
          $inc: { ver: 1 },
        },
        { new: true, lean: true }
      ));
      logger.info("UpdateCounterDone", { ver, start_count, count, max_count });
    }

    // simple test
    // if (_check.hasOwnProperty(count)) {
    //   logger.error("Duplicate", {
    //     now: { ver, start_count, count, max_count },
    //     check: _check[count],
    //   });
    //   process.exit(1);
    // } else {
    //   _check[count] = {
    //     ver,
    //     start_count,
    //     count,
    //     max_count,
    //   };
    // }
    return count;
  });
});
const GetCountUser = async (type) => {
  if (!type || !["product", "user"].includes(type))
    throw new Error("Invalid type");

  let counterQueue =
    counterQueues[Math.floor(Math.random() * __DANGEROUSLY_SET_NUM_OF_COUNTER)];
  let job = await counterQueue.add({ type });
  let count = await job.finished();

  // logger.info("GetCountUser", { count });
  return count;
};

exports.GetCountUser = GetCountUser;

// simple test
// setTimeout(async () => {
//   let timer = logger.startTimer();
//   for (let i = 0; i < 20; i++) {
//     await Promise.all(
//       Array.from(new Array(100)).map(() => GetCountUser("user"))
//     );
//     console.log("i ", i);
//   }
//   timer.done("GetCountUser");
//   console.log("Done");
// }, 4000);


```

# Random số ngẫu nhiên rồi kiểm tra xem đã tồn tại trong DB chưa
Một trong các cách mình nghĩ tới, Tuy nhiên chỉ phát huy tác dụng khi mà có dải số rộng, không phù hợp với bài toán của mình cho lắm.

# Chuyển Atomic qua cho Redis và update vào DB
Cách này cũng khá đơn giản, thay vì mỗi 1 lần call couter mình lại gọi tới db dẫn tới thắt cổ chai, xử lí 1 lệnh trên db như vậy mất dỡ 40ms, nghĩa là 1 giây chỉ xử lí đc vài chục request.  Thay vào đó mình sẽ chuyển bài toán tăng atomic qua cho redis nắm giữ và chỉ update vào database mỗi 10s.

Code chay thì đơn giản, tuy nhiên phải catch được lỗi và retry hoặc pause các queue có xử dụng tới router khi app mới khởi động, xử lí được việc chậm delay update từ reds vào mongodb,  listen event redis tắt save vào db.  Good luck ae!
![image.png](https://images.viblo.asia/d1be044e-73ec-4738-a400-b4f6897fb0d0.png)

Bài viết tới đây là hết rồi. Có lỗi lầm hay thiếu sót gì các bạn cứ góp ý nhiệt tình nhé.