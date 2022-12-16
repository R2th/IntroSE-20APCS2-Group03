Aka **Nghệ thuật đưa dê qua cầu** của tác giả **Minh Monmen**.

Hê lô bà con cô bác họ hàng gần xa bà con khối phố. Lại là mình đây, **Minh Monmen** trong những chia sẻ vụn vặt về quá trình làm những sản phẩm siêu to khổng lồ (tự huyễn hoặc bản thân vậy cho có động lực). Hôm nay mình xin hân hạnh gửi đến các bạn phần tiếp theo của series [**Nghệ thuật xử lý background job**](https://viblo.asia/p/nghe-thuat-xu-ly-background-job-07LKXjqJlV4) mà mình vừa mới nghĩ được ra thêm. 

Thật ra đây cũng không phải chia sẻ gì mà là mình đang gặp 1 vấn đề, mình tìm ra 1 cách nông dân để giải quyết nó và đưa lên đây để các bạn cùng cho ý kiến xem nó có ok không. Rất mong nhận được nhiều gạch đá từ các bạn để đủ xây lâu đài cho vấn đề này.

## First things first

Bài viết này dành cho những bạn đã thành công trong việc implement được hệ thống **background job** (hoặc những bạn chưa implement được thì save lại sau đọc dần =))). Lần này mình sẽ nói qua 1 cách nhanh chóng những thứ mình vừa mới nghĩ ra, vì để lâu lắc 1 chút là mình lại quên mất. Nên bắt đầu luôn nè.

Những điều cần biết trước khi đọc:

- Background job (hiển nhiên)
- Queue, message queue
- Concurrency and lock 
- [Nghệ thuật xử lý background job phần 1](https://viblo.asia/p/nghe-thuat-xu-ly-background-job-07LKXjqJlV4)

Những điều cần biết khi đọc xong:

- Bài viết chỉ focus vào giải quyết bài toán **concurrency** và **job ordering**
- Bài viết bỏ qua các vấn đề liên quan tới các tính chất khác như **reliable**, **retryable**,... 

Vậy nên đọc xong đừng thắc mắc tại sao bài viết không giải quyết vấn đề retry, vấn đề tin cậy, persistent... các thứ nhé.

Nhào vô.

> Mọi thứ ở trong bài viết này đề cập đều ở mức **thiết kế hệ thống**, tức là cho các bạn một cách thiết kế nào đó **phục vụ được nhu cầu** nhưng **không quá phụ thuộc vào công nghệ**. Bạn sẽ không cần phải cài đặt Kafka hay hệ thống Message queue phức tạp nào đó để implement những cách tiếp cận dưới đây. Chính vì vậy mình sẽ loại bỏ hoàn toàn các **feature riêng biệt** của 1 hệ thống hay công nghệ nào đó mà chỉ quan tâm tới mô hình đơn giản nhất áp dụng được cho hầu hết công nghệ mà thôi.

## The big problem

Trong bài viết trước, mình đã bỏ qua toàn bộ các vấn đề liên quan tới **sự liên hệ giữa 2 job** và coi **mọi job đều là độc lập**. Điều này làm mọi thứ đơn giản hơn rất nhiều khi mà các bạn có thể thoải mái scale số lượng worker lên bao nhiêu cũng được để tận dụng sức mạnh của xử lý song song. Tuy nhiên trong 1 số trường hợp oái oăm hơn, khi mà các job bị phụ thuộc vào nhau bởi 1 khía cạnh nào đó thì việc các bạn vừa giữ được thứ tự xử lý job, vừa giữ được khả năng xử lý song song sẽ là một điều không đơn giản.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/fblvkyf7x1_%E1%BA%A3nh.png)

Xử lý worker song song làm mình liên tưởng đến bài toán 2 con dê qua cầu. **Làm sao để 2 con dê cùng qua 1 cây cầu an toàn mà hiệu quả?**

Chúng ta hãy đi sâu vào từng cách tiếp cận khi xử lý job có thứ tự trong phần dưới nhé.

> Mình mặc định coi **1 worker chỉ xử lý được 1 job** tại 1 thời điểm nhé. Với các loại worker kiểu async xử lý nhiều job cùng lúc thì sẽ coi như là multiple worker cho đơn giản.

Giờ chúng ta có 1 bài toán ví dụ như sau:

- Có 1 cơ số loại job cần thực hiện. VD: **tạo post**, **tạo comment**, **like post**,...
- 1 số loại job sẽ cần thứ tự với điều kiện xác định. VD: comment của cùng 1 post cần được tạo đúng theo thứ tự request đẩy vào.
- Ở đây các bạn có thể thấy điều kiện để 2 job ràng buộc về thứ tự là:
    + **Phần pre-defined**: tức là phần biết từ khi khởi tạo. Chính là những job **thuộc 1 loại nào đó**. Phần này sẽ có đặc điểm là **hữu hạn**. Ví dụ job loại `tạo post`, job loại `tạo comment`,...
    + **Phần data-related**: tức là khi khởi tạo job bạn không biết **giá trị chính xác**. Ví dụ những job tạo comment có **cùng post_id**. Phần này sẽ có đặc điểm là về lý thuyết sẽ **vô hạn**.

Vấn đề của chúng ta chính là ở chỗ này. Điều kiện để 2 job liên quan tới nhau không những chỉ từ **loại job** mà còn **phụ thuộc vào data nữa**. Ví dụ như job `comment X vào post A` phải được hoàn thành trước job `comment Y vào post A`.

## Những con đường ta đã đi qua

Chúng ta cùng xem xét những cách tiếp cận dưới đây và xem chúng gặp phải những vấn đề gì nhé.

### 1 Queue cho all job, 1 worker

Đây là cách tiếp cận nông dân và dễ hiểu nhất. Với cách tiếp nhận này bạn không cần phải lo về vấn đề xử lý song song nữa. Chỉ cần queue có cơ chế **FIFO (first in first out)** là đủ. 1 worker tại 1 thời điểm chỉ xử lý được 1 job, và thứ tự thực hiện job sẽ chính là thứ tự được lấy từ queue ra. Bravo!!!

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/ke0so68oah_Single-queue-1.png)

Và tất nhiên là nó kéo theo 1 vấn đề siêu to khổng lồ. Đó là việc **xử lý chậm**. Tưởng tượng bạn nhận được job với tần suất là 1000 job/giờ nhưng lại chỉ có thể xử lý 500 job/giờ. Vậy là qua mỗi ngày số job sẽ cứ dồn mãi, dồn mãi... **Boom!**

### 1 Queue cho mỗi loại **pre-defined** job, mỗi queue 1 worker.

Đây là bước tiến tiếp theo của cách làm trên, khi mà đã tách mỗi loại job ra 1 queue riêng, mỗi queue riêng này sẽ có **1 worker** của riêng mình.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/gesdcjq8ji_Single-queue-2.png)

Cách xử lý này đã khắc phục được phần nào điểm nghẽn khi mà đã chia tải hệ thống ra nhiều loại worker. Mặc dù chỉ là 1 phần khá nhỏ. Như mình đã nói ở trên, số lượng các loại **pre-defined** job là hữu hạn. Ví dụ hệ thống của bạn chỉ có 3 loại job là **tạo post**, **tạo comment**, **like post**. Vậy là bạn sẽ có 3 worker khác nhau, mỗi worker xử lý 1 loại job riêng biệt. Và tới đây, chúng ta vẫn gần như không cần phải lo lắng tới vấn đề thứ tự thực hiện job hay concurrency. Bởi với 90% các hệ thống thì **job loại A** sẽ ít liên quan tới **job loại B**. (Nếu hệ thống của bạn là 10% còn lại, hãy theo dõi tiếp các solution khác).

Tuy nhiên, tương tự như cách đầu tiên, hệ thống của các bạn vẫn bị giới hạn bởi 1 worker cho 1 loại job. Do vậy mà nó vẫn chậm, rất chậm.

### 1 queue cho mỗi loại **pre-defined** job, mỗi queue có nhiều worker 

Đây là cách mà phần lớn các hệ thống đang sử dụng. Các loại lib job queue/ task queue phổ biến như `Resque` trên ruby, `Celery` trên python, `Bull` trên Nodejs,... hay rất nhiều các loại task queue khác có backend là redis đều áp dụng pattern này. 

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/haq1fc3bt1_Single-queue-3a.png)

Thực hiện theo pattern này thì chúng ta đã xử lý được vấn đề chậm khi mà nhiều worker cùng xử lý song song 1 loại job, giúp cho hệ thống dễ dàng scale theo chiều ngang hơn. Tuy nhiên đây chính là lúc mà sự chú ý của ta đã va vào ánh mắt của vấn đề: **Concurrency và Job ordering**. Nhiều worker chạy song song đồng nghĩa với việc phát sinh những **tranh chấp tài nguyên** hay **job tới sau xử lý xong trước job tới trước**.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/i4qukzldnb_Single-queue-3b.png)

Đây chính là khi cơn ác mộng bắt đầu. Mình bắt đầu vận dụng hết bộ óc thiên tài để đi search google các cách giải quyết. Và 1 số hướng tiếp cận sau sinh ra:

- Sử dụng **Atomic transaction** để update tài nguyên. Cái này chỉ phù hợp với những transaction quan trọng và **nằm hoàn toàn trên 1 db**. Ví dụ như bạn update 1 hoặc 1 vài bản ghi bằng atomic transaction. Tuy nhiên nó ko áp dụng được với toàn bộ 1 process dài như chuẩn bị tham số, lấy info từ svc A, tính toán,... Mình đã từng kết hợp **unique index** + **upsert operation** cho 1 vài trường hợp, tuy nhiên với tần suất job lớn thì tỷ lệ fail với upsert là rất rất nhiều, và tin mình đi, bạn không muốn phải retry đống job fail nhiều như vậy đâu =)))
- Sử dụng **Locking** để khóa tài nguyên cần update. Cách này mình đã sử dụng khi nhận thấy thời gian lock không dài (chỉ vài chục ms), do đó mình chấp nhận drop hoặc retry nhưng job nào đen quá mà bị lock cùng nhau. Ban đầu thì nó cũng chạy ổn, nhưng càng về sau khi job của mình phải xử lý nhiều tác vụ hơn, và thời gian lock tăng lên đi kèm với tỷ lệ drop vài retry tăng lên luôn. Lại phải tính 1 cách khác.
- Sử dụng cơ chế **Partition queue** bắt chước từ kafka. Các bạn đều biết là kafka có 1 pattern xử lý nôm na đó là **tại 1 thời điểm 1 partition chỉ có 1 worker được xử lý**. Vậy là mình sẽ tạo ra 10 cái queue **create comment job**, tạo ra 10 worker rồi cho mỗi 1 cái lắng nghe duy nhất 1 queue trên. Khi có job mới thì chia cái ID của post cho 10 rồi đẩy vào queue tương ứng. Mọi thứ nghe thật là awesome nhưng có 1 cái lỗ hồng to đùng: **các loại task queue phổ biến lại không được thiết kế phức tạp như vậy**. =))))))) Để implement được cơ chế học mót này mình phải quản lý số lượng worker và số lượng queue rất chặt chẽ, rồi cả  thằng tạo job cũng bị phụ thuộc để biết nó đẩy job vào queue nào,... 
- Tạo cho mỗi 1 post 1 queue riêng, rồi cho 1 worker lắng nghe cái queue riêng đó. Ví dụ thay vì 1 queue **create comment job** thì sẽ tạo ra nhiều queue dạng **create comment job - post A**. Đây chính là mô hình giải quyết được bài toán. Nhưng vấn đề của mình lại là: **Việc tạo queue và listen queue phải được xử lý dynamic**. Tức là trong khi runtime phải liên tục tạo ra queue và consume job trong queue đó. Well well well.

Ví dụ code 1 thằng task queue bất kỳ sẽ dạng như sau:

```javascript
const queue = new Queue('create_comment')

// register handler (on worker)
const handler = (job) => {
    // process job
    const data = job.data; // xxx
}
// Register when worker start
queue.register(handler)

// insert job
const data = "xxx";
queue.add(data)
```

Thay vào đó ta lại cần:

```javascript
const queueA = new Queue('create_comment_post_A')
const queueB = new Queue('create_comment_post_A')

// register handler (on worker)
const handler = (job) => {
    // process job
}
// Dynamic register ON RUNTIME
queueA.register(handler)
queueB.register(handler)

// insert job
const data = "something";
queueA.add(data)

// Dynamic unregister ON RUNTIME when process all job for post A done
queueA.unregister(handler)
// Delete queue A
queueA.destroy()
```

Đây chính là vấn đề của cách tiếp cận này. Việc đăng ký/hủy đăng ký queue nếu thực hiện như thế này sẽ cực kỳ khó quản lý nếu các bạn trực tiếp sử dụng queue của các lib task queue. Chưa nói tới việc nó còn gây ra các tác động như tạo thêm connection, rác tài nguyên,...

## Bước tiến lớn bằng một đoạn code nhỏ

Chính trong lúc khó khăn ấy, khi mà cái khó liền ló cái ngu mình đã nghĩ ra 1 cách nông dân để sử dụng luôn hạ tầng và các cơ chế hiện tại như sau:

### 1 queue cho mỗi loại **pre-defined** job, mỗi queue có nhiều worker, 1 lock + 1 datasource dạng queue để quản lý concurrency

Về mặt bản chất, vẫn là bạn tạo ra các queue riêng biệt cho từng đối tượng bài post A, B, C. Tuy nhiên khi đặt trong hoàn cảnh tích hợp với các lib task queue hiện có thì ý nghĩa implement của nó lại khác. Thay vì bạn tạo ra 1 **job cho post A** với **data X**, thì bạn sẽ tạo **job cho post A** không có data. Sau đó **job cho post A** sẽ pop data từ 1 list data nào đó (redis list, database,...) và xử lý. Xử lý xong sẽ lại tự schedule **job cho post A** tiếp theo.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/slrgd76d7l_Single-queue-4.png)

Mô tả diễn biến của nó như sau:

```javascript
const queue = new Queue('create_comment')

// register handler (on worker)
const handler = (job) => {
    // process job
    const name = job.data; // create_comment_post_A
    // 4. Pop data from data source
    const data = datasource.pop(name); // xxx

    // processing

    // 5. Check if data source has next data
    if (datasource.hasNext()) {
        // 6a. Extend lock timeout and schedule next job for post A
        extendLock(name)
        queue.add(name)
    } else {
        // 6b. No data available, release lock for post A so new job can be scheduled
        releaseLock(name)
    }
}
// Register when worker start
queue.register(handler)

// insert job
const data = "xxx";
// 1. Push data to data source (a redis list / db)
datasource.push('create_comment_post_A', data)
// 2. Claim lock for post A for TIMEOUT_DURATION. 
const canSchedule = claimLock('create_comment_post_A', TIMEOUT_DURATION)
if (canSchedule) {
    // 3a. If success schedule new job for post A 
    queue.add('create_comment_post_A')
} else {
    // 3b. Job for post A already running, do nothing
}
```

1 vấn đề nhỏ với cơ chế **schedule gối đầu** như này là nếu 1 job cho post A đã bị fail xử lý quá thời gian timeout của lock mà không có job mới nào được add để tiếp tục xử lý job cho post A thì hàng đợi cho post A sẽ dừng mãi mãi. Lúc này mình thêm 1 tiến trình định kỳ **re-scheduler** để kiểm tra toàn bộ những hàng đợi có vấn đề và khởi tạo lại job.

```javascript
// Interval running
const allProcesses = datasource.getAllLocks(); // ['create_comment_post_A', 'create_comment_post_B',...]
for (let i = 0; i < allProcesses.length; i++) {
    const element = allProcesses[i];
    if (claimLock(allProcesses[i])) {
        // Job for post A does not exists but datasource still have data for post A
        // Reschedule job for post A
        queue.add(allProcesses[i])
    }
}
```

Gần như các bạn không cần phải sửa code liên quan tới xử lý job mà ta chỉ cần can thiệp vào quá trình đẩy data vào và lấy data ra với sự tham gia của 1 data source và 1 chiếc lock. Điều này có thể dễ dàng tích hợp với phần lớn các loại database mà cơ bản nhất là redis. Sau đây là mẫu mình đã implement với redis.

```javascript
const ALL_LOCKS_KEY = 'locks';
const LOCK_TTL = 30; // 30s

function getLockKey(uniqueKey) {
    return `lock:${uniqueKey}`;
}

function getDataKey(uniqueKey) {
    return `data:${uniqueKey}`;
}

// Lua script to clear lock when data queue empty
// Usage: clearIfQueueEmpty <REDIS_ALL_LOCKS_KEY> <REDIS_LOCK_KEY> <REDIS_DATA_KEY> <LOCK_KEY>
await redisClient.defineCommand('clearIfQueueEmpty', {
    numberOfKeys: 3,
    lua:
        "if redis.call('llen', KEYS[3]) == 0 then "
            + "redis.call('del', KEYS[2], KEYS[3]);"
            + "redis.call('srem', KEYS[1], ARGV[1]);"
            + "return 1;"
        + "else "
            + "return 0; "
        + "end"
});

/**
* Add a job to datasource and try schedule job for a key
* @param {Queue} queue Queue instance. Eg: new Queue("create_comment")
* @param {string} key  Key to lock resource: post_A
* @param {object} data Data to push to datasource
*/
async function add(queue, key, data) {
    // Push data to queue
    const dataKey = getQueueDataKey(key);
    await redisClient
        .pipeline()
        .rpush(dataKey, JSON.stringify(data))
        // Push key to all lock
        .sadd(ALL_LOCKS_KEY, key)
        .exec();

    // Check lock to ensure schedule only not running queue
    const lockKey = getQueueLockKey(key);
    // Claim lock
    const jobStatus = await redisClient.setnx(lockKey, '1');
    if (jobStatus === 1) {
        await redisClient.expire(lockKey, LOCK_TTL);
        await queue.add({ key });
    }
}

/**
* Pop data from datasource to process
* @param {string} key  Key to lock resource: post_A
* @return {object}     Data to process
*/
async function pop(key) {
    // Pop data from data source
    const data = await redisClient.lpop(getQueueDataKey(key));
    if (!data) {
        return null;
    }
    return JSON.parse(data);
}

/**
* Finish a job and schedule next job
* @param {Queue} queue Queue instance. Eg: new Queue("create_comment")
* @param {string} key  Key to lock resource: post_A
*/
async function finish(queue, key) {
    const lockKey = getQueueLockKey(key);
    // Clear job lock if data empty
    const result = await redisClient.clearIfQueueEmpty(
        ALL_LOCKS_KEY,
        lockKey,
        getQueueDataKey(key),
        key
    );
    if (result === 0) {
        // clear fail, schedule next job and extend lock
        await redisClient.expire(lockKey, LOCK_TTL);
        await queue.add({ key });
    }
}

/**
* Ensure all queue running
*/
async function ensureAllQueueRunning() {
    const keys = await redisClient.smembers(ALL_LOCKS_KEY);
    let locks = [];
    if (Array.isArray(keys) && keys.length > 0) {
        locks = await redisClient.mget(
            keys.map(key => getQueueLockKey(key))
        );
    }
    const missingLockTasks = [];
    locks.forEach((lock, index) => {
        if (lock !== '1') {
            missingLockTasks.push(
                (async () => {
                    try {
                        const lockKey = getQueueLockKey(keys[index]);
                        const jobStatus = await redisClient.setnx(
                            lockKey,
                            '1'
                        );
                        if (jobStatus === 1) {
                            // Can schedule job for this key
                            await redisClient.expire(lockKey, LOCK_TTL);
                            await queueService
                                .getQueue(keys[index])
                                .add({ key: keys[index] });
                        }
                    } catch (error) {
                        logger.error('Reschedule failed: ', error);
                    }
                })()
            );
        }
    });
    return Promise.all(missingLockTasks);
}
```

## Final thoughts

Tất nhiên, đây chỉ là 1 prototype để các bạn áp dụng vào các hệ thống của mình nếu có yêu cầu quản trị job song song. Còn rất nhiều thứ các bạn có thể cải tiến về độ tin cậy khi pop data, retry khi xử lý lỗi, retry khi worker crash,... tuy nhiên những thứ đó lại nằm ngoài scope của bài viết này.

Những thứ mà cách tiếp cận của mình này đã giải quyết được:

- Tránh được việc listen dynamic queue của lib. Việc khai báo listen và xử lý queue chỉ nên thực hiện 1 lần khi start worker.
- Cho phép job **tạo comment X cho post A** và **tạo comment X cho post B** chạy song song
- Đảm bảo job **tạo comment X cho post A** và **tạo comment Y cho post A** chạy tuần tự
- Không cần care số lượng worker hay queue, scale hạ tầng hay worker thoải mái

Trên đây là những kinh nghiệm của mình khi xử lý vấn đề **concurrency và job ordering** trong những hệ thống sử dụng task queue đơn giản như redis. Hiện tại hệ thống task queue do mình thiết kế sử dụng [Bull JS](https://github.com/OptimalBits/bull) đã triển khai sử dụng giải pháp task gối đầu của mình cho 1 số loại job và vận hành tốt với lượng job concurrency khá lớn. Hy vọng các bạn có thể đóng góp thêm nếu có bất cứ ý kiến cải thiện nào. 

Cảm ơn các bạn vì đã quan tâm 1 bài viết dài vãi lúa thế này.