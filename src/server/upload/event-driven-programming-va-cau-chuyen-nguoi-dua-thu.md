Một bức tranh lớn về thiết kế hệ thống với phong cách lập trình theo phương châm: **Sống là không chờ đợi**.

Chắc hẳn trong cuộc sống hối hả thường ngày, các bạn đã không ít lần nghe đến câu nói: **Sống là không chờ đợi** rồi đúng không? Đừng lo, các bạn có thể yên tâm đọc bài viết này mà không sợ dính phải những ngữ điệu *self-help* của những chuyên gia nói đạo lý nửa mùa. Rất đơn giản là vì mình thì không biết nói đạo lý cuộc sống, chỉ biết chém gió công nghệ thôi. Còn nếu các bạn coi việc mình chém gió là đạo lý thì là do các bạn nhé =)))

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/1fr8dnfglp_maxresdefault.jpg)

## First things first

Okay, **Minh Monmen** đã trở lại sau một thời gian dài nghe ngóng việc kipalog dừng hoạt động. Mình quá lười để mở 1 blog riêng nên nghe đồn kipalog dừng cái là cũng lười viết luôn. Nhưng thấy mấy tháng rồi mà vẫn có vẻ hoạt động êm nên... Ta da, chúng ta lại ở đây với một chủ đề khá hay ho và basic: **Event driven programming**. 

Nghe trịnh trọng thế thôi chứ chắc mấy cái này ai cũng biết cả, mình cũng đưa những kiến thức về việc code với event vào **Cẩm nang tân thủ** của công ty mình. Gần như anh em nào vào làm quen với hệ thống backend cũng sẽ được giới thiệu. Hôm nay mang ra đây chỉ là để tái hiện lại bức tranh về việc ứng dụng **Event driven programming** trong project thực tế thì nó thế nào mà thôi. 

Kiến thức để đọc bài viết này đơn giản chỉ là biết **event là gì** mà thôi. Tuy nhiên có 1 lưu ý trước khi đọc đó là cơ chế event-handler tồn tại ở rất nhiều khâu trong ứng dụng của chúng ta, từ việc handle DOM event (như button click), handle connection, handle request,... Tuy nhiên trong bài viết này mình sẽ chỉ nói tới những thứ chúng ta cần mó tay tới và cần có hệ thống đàng hoàng (thay vì nói về việc hiển nhiên như xử lý 1 button click bằng event).

Okay? Let's move!

## Câu chuyện về người đưa thư

Chắc hẳn các bạn đều biết về định nghĩa **event** hay **message** rồi. Vậy nên chỗ này mình sẽ không dông dài nói về định nghĩa của nó nữa. Chúng ta hãy đi thẳng vào mô hình của một hệ thống web-app cơ bản và thử xem công việc của người đưa thư sẽ xuất hiện ở những đâu nhé.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/bvr35rykyb_asyncprogramming1.png)

Hãy bắt đầu với một mô hình client-server truyền thống như này. Ở đó client của chúng ta là trang web như facebook đi, và server giả dụ trong thời kỳ sơ khai mới chỉ là một con API chạy bằng nodejs chẳng hạn. Tiếp theo mình sẽ có 1 luồng CRUD cơ bản thôi - **tạo bài viết** đi, với việc call tới server thông qua HTTP request, hãy coi như ở đây chưa tồn tại hệ thống thư báo nào đáng để chúng ta quan tâm.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/gvv3gg3xi1_asyncprogramming2.png)

Và đây là đoạn code prototype xử lý cho việc tạo 1 bài post:

```javascript
// file index-api.js

const express = require('express');

// Define express server
const app = express();

// Init db connection
const db = initDb();

app.post('/posts', async (req, res) => {
    const post = new Post(req.body);
    const savedPost = await post.save();
    return res.json(savedPost);
});

// listen to requests
app.listen(3000, () => console.info(`server started on port 3000`));
```

## Eventbus trong process

Nhưng business thì đâu có đơn giản như vầy đúng không? Ngoài việc **tạo ra bài viết và lưu vào DB** là hành động chính, mình nhận ra mình còn cần **tăng tổng số bài viết của user lên 1** nữa. Vậy là vấn đề bắt đầu phát sinh rồi đây. Tất nhiên mình có thể thêm 1 dòng code vào như sau và mọi thứ đã hoạt động đúng như mong muốn:

```javascript
app.post('/posts', async (req, res) => {
    const post = new Post(req.body);
    const savedPost = await post.save();

    // Increase user's post_count
    await User.updateOne({ _id: post.user_id }, { $inc: { post_count: 1 } });

    return res.json(savedPost);
});
```

Đoạn code trên đã đúng, nhưng mình có **NÊN** làm như vậy không? 

**Lợi:** 

- Nhìn code rất ngắn, rất clear, ai cũng hiểu nó làm những gì
- Ít xuất hiện trường hợp user nhìn thấy data phân mảnh (do user phải chờ đợi action create post làm hết các việc)

**Hại:**

- Function có side effect (tức là làm thêm những việc bên lề), vi phạm **Single-responsibility principle** trong **SOLID**. Nôm na là nó làm nhiều việc sẽ làm việc maintain cũng như mở rộng gặp vấn đề. Nếu như chỗ này mình cần bắn noti cho bạn bè của user biết họ vừa đăng bài thì cũng thêm luôn vào đoạn code trên hở?
- User phải chờ đợi những thứ không quan trọng: tại sao họ phải chờ đợi những việc như tăng số đếm bài viết, gửi noti cho bạn bè,... trong khi công việc chính họ thực hiện chỉ là **tạo bài viết**?

Điều này dẫn chúng ta tới một giải pháp mà người ta gọi là **lập trình hướng sự kiện** đây. Người đưa thư của chúng ta sẽ xung trận dưới cái tên **eventbus**, mà thằng nodejs của mình thì nó lại được build dựa vào kiến trúc event-driven nên xử lý mấy cái event này dễ như trở bàn tay vậy:

```javascript
const events = require('events');
const eventbus = new events.EventEmitter(); 

eventbus.on('post_created', async (post) => {
    // Increase user's post_count
    await User.updateOne({ _id: post.user_id }, { $inc: { post_count: 1 } });
});

app.post('/posts', async (req, res) => {
    const post = new Post(req.body);
    const savedPost = await post.save();

    // emit post_created event
    eventbus.emit('post_created', post);

    return res.json(savedPost);
});
```

Okay, đã xong phần dễ làm. Đến đây thì gần như ai cũng đều hiểu được làm được cả. Cái mà mọi người hay nhầm lẫn chính là **scope hoạt động của eventbus** mà thôi. 

Eventbus như trên (biến global dạng singleton) được mình gọi là **eventbus trong process**. Tầm hoạt động của eventbus loại này thường là **trong 1 process**. Do đó nếu bạn có chia app của mình ra thành nhiều entrypoint như `index-api.js`, `index-worker.js` thì mỗi process sẽ có những eventbus riêng biệt. Kể cả khi bạn start 2 process `node index-api.js` thì cũng sẽ tồn tại 2 eventbus khác nhau trên từng process, do đó không sợ bị xử lý trùng event khi chạy nhiều instance đâu nhé.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/eey00pmgki_asyncprogramming3.png)

Đây là loại dùng để xử lý các side-effect với 1 action trong process. Nhìn code thì đơn giản vậy thôi nhưng cái khó với những member mới ở đây chính là xác định **đâu là action chính, đâu là side effect** để biết lối sử dụng event cho đúng. Có nhiều người đang code quen kiểu procedural programming (như pascal) dẫn tới việc thực thi hết action nọ tới action kia trong 1 luồng xử lý request. Các bạn đừng cười nhé, ai cũng có thể mắc phải điều này vì câu nói: **cho nó tiện** dù đi làm lâu hay mới. Nó cũng có nhiều biến thể nữa:

```javascript
// A longgggggggggggggggggggggg function
function actionMain(req) {
    actionA();

    actionB();

    actionC();
}

// A nested function
function actionMain(req) {
    actionA();
}

function actionA() {
    actionB();
}

function actionB() {
    actionC();
}
```

Chuyển được mindset từ code kiểu này sang event-driven thực thụ là 1 quá trình khổ luyện chứ chẳng chơi, mặc dù event nó biến luồng code của chúng ta trở nên **rắc rối hơn**, **khó debug hơn**,... tuy nhiên việc nó có **tính mở rộng cao**, **không chờ đợi** và **tập trung vào thứ quan trọng** sẽ xứng đáng để các bạn bỏ công sức.

**Cách thiết lập**: thường các ngôn ngữ sẽ có cách liên lạc trong process với concept giống nhau, có thể là eventemitter của node, channel của golang,...

## Job queue nội service

Lại tiếp một yêu cầu nữa, giờ mình cần thêm bài viết của user vào feed của bạn bè (push-model) thì đoạn code trên sẽ xử lý thế nào?

> **Push model** là mô hình xây dựng feed cho user, trong đó việc tạo feed xuất phát từ action create post của 1 user và **đẩy (push)** bài viết đó vào feed của những người quan tâm.

Bổn cũ soạn lại mình lại thêm 1 event handler nữa cho event `post_created`.

```javascript
eventbus.on('post_created', async (post) => {
    // Increase user's post_count
    await User.updateOne({ _id: post.user_id }, { $inc: { post_count: 1 } });
});

eventbus.on('post_created', async (post) => {
    // Push user's post to friend's feeds
    for (const friend of friends) {
        await friend.insertPostToFeed(post);
    }
});

app.post('/posts', async (req, res) => {
    const post = new Post(req.body);
    const savedPost = await post.save();

    // emit post_created event
    eventbus.emit('post_created', post);

    return res.json(savedPost);
});
```

Cũng work, không những thế còn chuẩn chỉ event-driven programming. Thế nhưng mình có **NÊN** làm như vậy không?

Mỗi khi mình hỏi câu hỏi này, thì câu trả lời chắc là **không** rồi, vì nếu **có** thì làm gì có chuyện gì mà nói nữa =))). Okay, ở đây thì mình nghĩ là không nên làm như vầy, bởi vì nhìn prototype thôi cũng thấy việc insert post vào feed của bạn bè là 1 action tốn thời gian và công sức rồi. Chúng ta cũng đều biết Nodejs chạy single thread và việc nhồi nhét càng nhiều logic vào 1 process sẽ khiến app của chúng ta mất resource cho việc xử lý mà quên mất **chức năng chính** vẫn là **handle request** của user.

Điều này sẽ dẫn đến kỹ thuật xử lý thứ hai, cũng liên quan đến người đưa thư, chính là hệ thống **Job queue**.

Nếu các bạn đã đọc series [Background job cho người nông dân](https://viblo.asia/p/background-job-va-queue-cho-nguoi-nong-dan-L4x5xdDg5BM) của mình thì chắc cũng không lạ gì với hệ thống job queue này và tác dụng của nó. Ở đây mình sẽ chỉ nói lại 1 chút về sự khác biệt khi xử lý bằng hệ thống **job queue** và xử lý bằng hệ thống **eventbus trong process** mà thôi.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/ax9alocbzk_asyncprogramming4.png)

Code đây:

```javascript
// file index-api.js
const Queue = require('bull');
const insertPostToFeedQueue = new Queue('insert-post-to-feed', 'redis://127.0.0.1:6379');

eventbus.on('post_created', async (post) => {
    // Increase user's post_count
    await User.updateOne({ _id: post.user_id }, { $inc: { post_count: 1 } });
});

eventbus.on('post_created', async (post) => {
    await insertPostToFeedQueue.add({ post });
});

app.post('/posts', async (req, res) => {
    const post = new Post(req.body);
    const savedPost = await post.save();

    // emit post_created event
    eventbus.emit('post_created', post);

    return res.json(savedPost);
});
```

```javascript
// file index-worker.js
const Queue = require('bull');

const insertPostToFeedQueue = new Queue('insert-post-to-feed', 'redis://127.0.0.1:6379');

insertPostToFeedQueue.process(async (job, done) => {
    const { post } = job.data;
    // Push user's post to friend's feeds
    for (const friend of friends) {
        await friend.insertPostToFeed(post);
    }
});
```

Điểm khác biệt ở đây thì hãy quan tâm mấy cái sau:

**Eventbus chạy trong process, còn job queue thì chạy bên ngoài**. Thật ra bạn hoàn toàn có thể xử lý job ngay trên process api bằng việc chạy `worker.on('job', handler)` trong file `index-api.js`. Tuy nhiên mình không khuyến khích các bạn làm thế bởi vì mục đích sử dụng job queue là để giảm tải cho process api, nếu giờ cũng lại xử lý job trên đó luôn thì hòa nhau =))) 

Đừng cười nhé, mình thấy phần lớn người sử dụng job queue mình đã gặp không hề để ý điều này và điềm nhiên chạy job trên process api. Phần vì mọi người tổ chức project không được clear lắm (chưa tạo multiple entrypoint app bao giờ), phần vì mọi người sử dụng các framework có sẵn (như NestJS) và ít để ý cách tổ chức process của nó. Để khắc phục điều này thì cần 1 người kiến tạo project có kinh nghiệm về phân chia entrypoint của app thôi chứ không có gì to tát cả. 

Job queue mình sử dụng ở đây (và nhiều lib job queue khác) có phần message bus sử dụng Redis có thể được coi là **hệ thống liên lạc inter-process** nhưng vẫn là **nội bộ service**.

**Event thì 1:n, còn job thì 1:1**. Tức là 1 event phát ra có thể có nhiều handler khác nhau cùng xử lý, còn 1 job phát ra chỉ có 1 worker nào đó xử lý mà thôi. Nói vậy nghĩa là event chỉ phản ánh **một sự kiện gì đó vừa diễn ra**, tức là chỉ quan tâm tới thằng **producer** và **cái gì vừa xảy ra** thôi. Còn job thì phản ánh **một công việc muốn được thực hiện**, tức là khi phát ra message job thì đã quan tâm tới thằng **consumer** và **cái gì sẽ được làm** rồi.

Cụ thể:

- `post_created` là **event mới xảy ra**, thằng producer không hề biết sau này user sẽ được tăng post count hay feed của bạn bè sẽ có thêm bài viết.
- `insert-post-to-feed` là **job cần được làm**, thằng producer đã biết cần thực hiện việc thêm bài viết vào feed bạn bè ngay từ khi tạo job.

Tất nhiên đây chỉ là cách thiết kế, bạn hoàn toàn có thể xử lý event kiểu 1:1 như job cũng không vấn đề gì, nhưng cái này nó là sự khác biệt về mặt bản chất rồi, đừng lẫn lộn dễ confuse lắm nhé. Rất nhiều newbie khi tiếp cận hệ thống có eventbus và job queue đã bị nhầm lẫn giữa 2 khái niệm này, dẫn đến việc **sử dụng event như gọi function thông thường** và làm rối quá trình xử lý. Ví dụ như ở trên bạn không emit ra `post_created` mà emit luôn `increase-user-post-count` vào eventbus.

Hãy luôn nhớ điều này: **event chỉ quan tâm người gửi** và **job mới quan tâm người nhận**.

**Cách thiết lập**: thường sử dụng sự trợ giúp của lib như bulljs, goworker,... dựa trên 1 hệ thống hỗ trợ message queue như redis, rabbitmq,...

## Message broker giữa các service

Lại tiếp một yêu cầu nữa, mình cần push 1 cái notification tới danh sách bạn thân của user và báo họ biết bạn của họ mới đăng bài. Lại tiếp tục bổn cũ soạn lại thôi nhỉ?

```javascript
// file index-api.js
const Queue = require('bull');
const insertPostToFeedQueue = new Queue('insert-post-to-feed', 'redis://127.0.0.1:6379');
const createNotificationForCloseFriends = new Queue('create-notification-for-close-friends', 'redis://127.0.0.1:6379');

eventbus.on('post_created', async (post) => {
    // Increase user's post_count
    await User.updateOne({ _id: post.user_id }, { $inc: { post_count: 1 } });
});

eventbus.on('post_created', async (post) => {
    await insertPostToFeedQueue.add({ post });
});

eventbus.on('post_created', async (post) => {
    await createNotificationForCloseFriends.add({ post });
});
```

Cũng work, vẫn chuẩn event-driven programming, lại còn sử dụng được job queue giảm tải cho api nữa. Thế nhưng trớ trêu thay mình đã tách béng logic về notification sang 1 micro-service khác rồi. Giờ đây service này của mình chỉ có logic liên quan tới bài viết mà thôi. Nó không hề biết chút gì về việc bắn notification tới friend như nào.

Điều này lại dẫn mình đến kỹ thuật xử lý thứ 3, cũng liên quan tới người đưa thư, nay đã mở rộng vùng phủ sóng ra thành **liên service**, chính là hệ thống message broker phục vụ liên lạc giữa các service.

Nếu các bạn đã nghe tới khái niệm **event-sourcing** thì chắc cũng sẽ không lạ lẫm gì với hệ thống message broker này. 

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/tix8wop7ke_asyncprogramming5.png)

Lúc này post service của mình sẽ bắn ra 1 event (chứ không phải job nhé) lên message broker giữa các service với kiểu broadcast như sau:

```javascript
// file index-api.js
const Queue = require('bull');
const insertPostToFeedQueue = new Queue('insert-post-to-feed', 'redis://127.0.0.1:6379');
const producer = initKafkaProducer();

eventbus.on('post_created', async (post) => {
    // Increase user's post_count
    await User.updateOne({ _id: post.user_id }, { $inc: { post_count: 1 } });
});

eventbus.on('post_created', async (post) => {
    await insertPostToFeedQueue.add({ post });
});

eventbus.on('post_created', async (post) => {
    await producer.send({
        topic: 'post'
        messages: [
            {
                key: post.user_id,
                value: JSON.stringify(post),
                headers: {
                    event: 'created',
                },
            },
        ],
    });
});
```

```javascript
// file index-consumer.js inside notification service
const consumer = initKafkaConsumer();

consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        switch (topic) {
            case 'post':
                if (message.headers.event === 'created') {
                    await createNotificationForCloseFriends(JSON.parse(message.value.toString()));
                }
                break;
            default:
                break;
        }
    }
});
```

Lúc này chúng ta quay trở lại với pattern event 1:n, khi service post broadcast message `post_created` lên message broker (ví dụ là kafka) thì nó cũng không cần biết thằng nào là thằng nhận, và thằng nhận sẽ làm gì. Ở đây thằng kafka đóng vai trò **message broker giữa các service** với nhau, có nghĩa là sẽ truyền message từ hệ thống này sang hệ thống khác.

**Cách thiết lập**: thường dùng 1 app của bên thứ 3 có chức năng truyền tải message như kafka, rabbitmq, zeromq,...

## Message broker giữa client - server 

Ở chỗ này mình lại phát sinh thêm nhu cầu, là khi bạn bè của user đăng bài đang lướt feed dở thì sẽ có 1 cái noti hiện lên ở góc màn hình báo: **Bạn thân của mày đã đăng bài**. Vậy thì phải làm thế nào?

Nếu các bạn đã đọc bài viết: [Chat chit và bức tranh về realtime communication](https://viblo.asia/p/chat-chit-va-buc-tranh-ve-realtime-communication-maGK7vRA5j2) trước đây của mình thì sẽ hiểu được ở đây người ta thường sử dụng giải pháp gì. Tuy nhiên trong khuôn khổ câu chuyện của người đưa thư ở đây mình cũng sẽ nhắc lại 1 hệ thống thư báo gọi là **message broker giữa client - server**. Lúc này phạm vi hoạt động của người đưa thư lại là con đường giao tiếp giữa client - server rồi.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/qjezxmc86y_asyncprogramming6.png)

Ví dụ chỗ này như mình đang sử dụng hệ thống MQTT để liên lạc đi, thì code sẽ dạng như này:

```javascript
// file index-consumer.js inside notification service

const mqttClient = initMQTTClient();

eventbus.on('notification_created', async (notification) => {
    // Publish notification to mqtt
    await mqttClient.publish(`users/${notification.user_id}/received_notification`, JSON.stringify(notification));
});

async function createNotificationForCloseFriends(post) {
    for (const friend of friends) {
        const notification = new Notification(friend, post);
        await notification.save();
        eventbus.emit('notification_created', notification);
    }
}

const consumer = initKafkaConsumer();
consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        switch (topic) {
            case 'post':
                if (message.headers.event === 'created') {
                    await createNotificationForCloseFriends(JSON.parse(message.value.toString()));
                }
                break;
            default:
                break;
        }
    }
});
```

Bạn sẽ để ý mình vẫn tiếp tục kết hợp việc sử dụng eventbus trong notification service đó nhé. Nhắc lại thêm lần nữa, đây là mindset code, dù là worker hay api thì vẫn cần xác định đâu là action chính, đâu là side effect để tách ra event.

**Cách thiết lập**: 1 số dùng message broker của bên thứ 3 như với mqtt: emqx, vernemq,... hoặc tự build websocket server dùng lib như socket.io, ws,...

## Tổng kết

Trên đây chỉ là bản tóm tắt 1 số phương thức truyền tin async mà một hệ thống backend sẽ sử dụng, nó không bao gồm **toàn bộ** các khâu xử lý async mà chỉ là những khâu xử lý quan trọng bạn cần phải nắm rõ. 

Ngoài ra cũng không hề có một ranh giới cứng nào cho việc bạn bỏ toàn bộ code vào api controller, hay cái nào phải sử dụng eventbus, cái nào sử dụng job queue,... Tất cả phụ thuộc vào việc tổ chức code và tính phức tạp trong logic của bạn. Thông thường mình sẽ dựa vào **mức độ delay chấp nhận được** và **khối lượng công việc** để xác định xem chỉ eventbus là đủ hay cần thêm job queue.

Ví dụ như việc **tăng số lượng post count** cần delay thấp, logic cũng đơn giản nhẹ nhàng thì xử lý ngay trong eventbus, còn việc **thêm post vào feed bạn bè** có thể delay nhiều, logic dài dòng phức tạp thì nên đưa xuống worker (process khác) xử lý.

Hy vọng sau bài viết này, các bạn sẽ có thêm 1 chút để tâm trong phong cách code và tổ chức hệ thống của mình. Code có nhiều cách work, nhưng cách work nào dễ maintain, dễ mở rộng, tối ưu được performance,... thì có thể bắt đầu luyện thành thói quen từ ngay hôm nay chứ đừng chờ refactor nhé.

Chào thân ái và quyết thắng.