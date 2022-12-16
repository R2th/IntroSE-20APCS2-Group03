**Câu chuyện bê gạch tuy đơn giản nhưng lại chứa đựng biết bao triết lý khoa học tự nhiên**.

Không cần phải học qua sách vở, chẳng cần phải lý thuyết nọ nguyên lý kia để chúng ta hiểu được rằng bê gạch thì phải **bê theo chồng**. Một phương pháp gần như là hiển nhiên được áp dụng hàng ngày hàng giờ trong cuộc sống thường nhật liệu có thể ảnh hưởng tới ứng dụng write-heavy mà mình đang xây dựng như thế nào? 

> Mặc dù mọi kiến thức trong bài viết này không mới, hay nói cách khác là ai cũng biết, ai cũng hiểu nguyên lý. Thế nhưng điều mà mình kỳ vọng có thể đem đến cho các bạn là một lăng kính cụ thể, có số liệu rõ ràng, có thể kiếm chứng và tự thực hiện được (nếu hên tý nữa thì còn áp dụng vô thực tế được luôn). 

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/4q3inbq4i3_image.png)

## First things first

Mình là **Minh Monmen**, anh thợ xây đang cùng đồng hành với các bạn trong quá trình xây nên chiếc nhà **write-heavy** đây. Mặc dù tay kiến trúc sư tắc trách chưa hề đưa bản kiến trúc tổng thể cho mình tuy nhiên với những kinh nghiệm fuho mà mình có được sau nhiều năm pay lak à xây lắp thì hãy xem ngôi nhà của mình có thể lớn tới đâu nhé.

Tiếp nối với câu chuyện còn dang dở của series [Chuyện anh thợ xây làm kiến trúc sư hệ thống](https://viblo.asia/s/24lJDz46KPM).

Ở trong bài viết đầu tiên: [BUILD a write-heavy application](https://viblo.asia/p/chuyen-anh-tho-xay-p1-build-a-write-heavy-application-V3m5WQrEZO7), mình đã giới thiệu cho các bạn một ngôi nhà tranh vách đất đơn sơ nhưng đủ dùng rồi. Tuy nhiên chúng ta vẫn chỉ đang dừng lại ở một chút nghệ thuật sắp đặt không gian trong nhà để trông cho ngăn nắp thôi, còn đâu nhà dột thì vẫn dột, bão to thì vẫn bay. Chính vì vậy mà trong kỳ thứ hai này, mình quyết định chuyển phỏm: thay máu ngôi nhà dột nát của mình sang nhà gạch. 

Để làm được điều này thì tất nhiên là phải đi bê gạch rồi. 100 ngàn viên gạch đã được chuyển tới cổng nhà mình. Việc còn lại của mình là làm sao vận chuyển được số gạch này vào xây nhà trong thời gian nhanh nhất mà tốn ít nguồn lực nhất.

Hiểu bài toán chứ? Okay let's go!

> Toàn bộ source code của quá trình test được public ở repo này: [https://github.com/minhpq331/write-heavy-application](https://github.com/minhpq331/write-heavy-application)]

## Những shipper gạch cần mẫn

Đây là tình trạng khả quan nhất của ứng dụng trong phần 1:

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/l6mbnoz7sv_writeheavy4.png)

Thời gian thực hiện quá trình này được cấu thành từ hai khoảng thời gian nhỏ sau:

- Thời gian nhận toàn bộ 100k request là 25.1s.
- Thời gian insert toàn bộ 100k bản ghi là 12.3s.

Nếu các bạn thử tưởng tượng tình huống bê gạch này vào sơ đồ trên thì tương ứng sẽ là:

- Mình đang có 1 ông chuyên xếp gạch đứng ở cổng (Express). Ông này sẽ nhận 100k viên gạch và chuyển cho các **shipper gạch**.
- Có 100 **shipper gạch** (tương đương connection pool 100 của mình) đang thực hiện bê gạch như sau:
    + Người xếp gạch đưa **mỗi shipper 1 viên gạch**
    + 100 shipper gạch sau khi nhận gạch sẽ chuyển gạch vào trong cho thợ xây
    + Khi 100 shipper thực hiện xong lượt của mình và quay ra, người xếp gạch sẽ tiếp tục phát cho mỗi người 1 viên để thực hiện lượt tiếp theo.

Ở đây ông xếp gạch đại diện cho ứng dụng của chúng ta, chỉ chạy trên 1 thread. Trong bài trước mình đã thử để ông xếp gạch này **vừa nhận gạch vừa xếp gạch** nhưng kết quả chậm hơn khá nhiều so với việc **nhận hết gạch rồi xếp cả thể**. Vậy ở đây chúng ta có cách nào để tăng tốc độ của hai quá trình này lên không? 

> **Fact từ bài trước:** mặc dù có tới 100 shipper nhưng tốc độ chuyển gạch (12.3s) không nhanh gấp 100 lần 1 shipper (38.2s). Vì sao thế? Vì chúng ta chỉ có **1 người xếp gạch** và **đường đi từ cổng vào nhà lại nhỏ**, nên shipper vừa phải đợi người xếp, lại vừa đụng trúng nhau trên đường dẫn đến chỉ nhanh hơn khoảng 3 lần so với 1 người.

## Tối ưu hóa shipper

Phương thức vận chuyển của 100 shipper ở đây bộc lộ 1 điểm yếu cơ bản mà đến trẻ con cũng nhìn ra:

- **Mỗi lần di chuyển tốn nhiều thời gian và công sức** (network roundtrip)
- **Nhưng kết quả thu được mỗi lần lại quá ít so với khả năng của họ: 1 viên gạch** (1 command)

Vậy thì chắc chắn là cách tối ưu chỉ là **xếp nhiều gạch trong 1 lần vận chuyển của họ lên** rồi. Đây cũng chính là thứ mà chúng ta hay gọi là **batch operation** (hay bulk operation) đó.

Trong thực tế thì cứ nghĩ tới write operation là người ta lại nghĩ ngay tới buffer và batch operation rồi chứ chẳng cần phải nhìn chuyện bê gạch làm gì. Ở đây mình sẽ code 1 đoạn xử lý batch đơn giản như sau:

- Tạo ra 1 buffer (nôm na là cái array) chứa bản ghi chờ
- Nếu số bản ghi chờ đạt 1000 phần tử ~> thực hiện (flush) insert 1000 phần tử này vào DB
- Nếu chưa đủ 1000 phần tử (ví dụ chỉ có 300) nhưng sau 5s kể từ khi phần tử đầu tiên được thêm vào thì cũng flush 300 phần tử này xuống DB.

Nếu mà quay sang chuyện bê gạch thì sẽ là như này:

- Shipper gạch sẽ đứng chờ người xếp gạch xếp đủ 1000 viên
- Nếu đủ 1000 viên thì bắt đầu vận chuyển
- Nếu chưa đủ 1000 viên nhưng chờ đợi xếp quá lâu (5s) thì cũng chuyển đi luôn. Có bao nhiêu chuyển bấy nhiêu.

Ở đây mình có sử dụng hàm throttle của lodash, đại khái là giới hạn số lần chạy 1 function trong 1 khoảng thời gian xác định:

```javascript
const _ = require('lodash');

/**
 * Class representing a batch executor
 * @param {number} max size of batch
 * @param {number} timeout in ms
 * @param {function} batchFunc function to be called
 * @returns
 */
module.exports = function (size, timeout, batchFunc) {
    let batch = [];
    let counter = 0;

    // Create an executor function
    const execBatchFunc = async () => {
        // Reset the batch
        const tmp = batch;
        batch = [];

        // Process the batch
        await batchFunc(tmp);
        counter += tmp.length;
        console.log(`Processed ${tmp.length} records`);
    };

    // Create a throttled executor function
    const throttledFunc = _.throttle(execBatchFunc, timeout, {
        leading: false,
        trailing: true,
    });

    return {
        /**
         * Push item to batch
         * @param {any} item
         */
        push(item) {
            batch.push(item);
            if (batch.length >= size) {
                // Flush the batch when the batch is full
                this.flush();
            } else {
                // Run the throttled function when the batch is not full
                throttledFunc();
            }
        },

        async flush() {
            return throttledFunc.flush();
        },

        getCounter() {
            return counter;
        },
    };
};
```

Ở đây mình tạo ra 1 class với 3 tham số `size`, `timeout` và `batchFunc`. Tức là khi batch đạt `size` hoặc trải qua `timeout` thời gian từ bản ghi đầu tiên thì sẽ thực hiện `batchFunc` để xử lý toàn bộ bản ghi trong batch.

Hãy thử test tốc độ insert với đoạn code này xem sao:

```javascript
const Bulker = require('./bulk');

const insertBulker = new Bulker(
    1000,   // max size 1000 items
    1000,   // 1000ms = 1s
    async (items) => {
        await db.collection('logs').insertMany(items); // Insert all items in 1 command
    }
);

for (let i = 0; i < 100000; i++) {
    insertBulker.push({
        title: 'My awesome test',
        description: 'This is a test',
    });
}
```

Kết quả:

| No. | Framework | Test         | Http time (s) | Additional time (s) | Http RPS | Ops RPS | avg(ms) | min(ms) | max(ms) | p95(ms) | Mongo CPU |
|-----|-----------|--------------|---------------|---------------------|----------|---------|---------|---------|---------|---------|-----------|
| 3   | Raw       | Insert Sync  | 38.2          |                     | 2620     |         |         |         |         |         | 52.00%    |
| 4   | Raw       | Insert Group | 12.1          |                     | 8264     |         |         |         |         |         | 135.00%   |
| 8   | Raw       | Insert Bulk  | 0.89          |                     | 111607   |         |         |         |         |         | 35.00%    |

Nó lại là ối zồi ôi luôn. Mình còn chưa kịp nhìn xem chuyện gì vừa xảy ra hay đo đạc thì nó chạy xong mất rồi. 111k rps trong chưa tới 1s. Vội vàng tăng số bản ghi lên 1 triệu thì chỉ mất hơn 7s với tốc độ 138k rps. Quả là tốc độ insert vô DB kinh khủng khiếp chỉ với việc chuyển sang chạy batch operation (insertMany).

Tới đây thì mình cảm thấy nếu sử dụng batch operation thì lượng tài nguyên tiêu tốn quá ít và thời gian quá là nhanh đi. Do đó ở đây cũng chẳng cần tới nghệ thuật sắp đặt nhận hết request rồi process như bài trước làm gì. Mình sẽ vừa request vừa insert vô batch luôn xem kết quả sao nhé.

```javascript
const Bulker = require('./bulk');

const insertBulker = new Bulker(
    1000,   // max size 1000 items
    1000,   // 1000ms = 1s
    async (items) => {
        await db.collection('logs').insertMany(items); // Insert all items in 1 command
    }
);

app.post('/insert_bulk', async (req, res) => {
    const body = req.body;
    insertBulker.push(body);
    res.send('Ok');
});
```

Lại cùng đo kết quả:

| No. | Framework | Test         | Http time (s) | Additional time (s) | Http RPS | Ops RPS | avg(ms) | min(ms) | max(ms) | p95(ms) | Mongo CPU |
|-----|-----------|--------------|---------------|---------------------|----------|---------|---------|---------|---------|---------|-----------|
| 1   | Express   | Empty GET    | 18.2          |                     | 5498     |         | 18.14   | 0.28    | 69.61   | 26.91   |           |
| 2   | Express   | Empty POST   | 24.8          |                     | 4026     |         | 24.79   | 1.72    | 121.99  | 30.66   |           |
| 5   | Express   | Insert Sync  | 50.9          |                     | 1962     |         | 50.9    | 20.14   | 246.78  | 73.77   | 36.00%    |
| 6   | Express   | Insert Async | 42.3          | 8.5                 | 2361     | 1968    | 42.28   | 3.97    | 177.93  | 64.02   | 35.00%    |
| 7   | Express   | Insert Group | 25.1          | 12.3                | 3982     | 2673    | 25.07   | 1.36    | 102.99  | 31.21   | 135.00%   |
| 9   | Express   | Insert Bulk  | 26.7          | 1                   | 3742     | 3610    | 26.66   | 2.1     | 96.82   | 35.78   | 3.00%     |

Yay, bài test số 9 cho thấy rõ ràng việc sử dụng bulk operation đã gần như loại bỏ hoàn toàn thời gian insert vào DB và giúp API của chúng ta có performance đạt gần như mức **không làm gì** - bài test số 2 (3742 vs 4026 rps).

## Tối ưu hóa người xếp gạch

Okay, vậy là chúng ta tạm gọi là tối ưu thành công khả năng của shipper, khi giúp thời gian thực hiện việc insert từ app tới DB gần như không đáng kể so với thời gian app xử lý http request. Thế chúng ta có thể can thiệp gì tới thời gian thực thi của người xếp gạch không khi mà performance của họ gần như đã đạt công suất với việc chỉ nhận gạch mà không làm gì rồi?

Câu trả lời của mình ở đây là không. Ứng dụng phía trên của mình đã đơn giản tới mức khó có thể tạo ra 1 impact lớn nào nữa từ việc tối ưu express. Chỗ này chúng ta chỉ có 2 con đường nếu muốn tăng khả năng nhận request của hệ thống:

- **Scale thêm instance**: Từ đó tận dụng nhiều CPU hơn để xử lý request.
- **Thay đổi framework**: Giảm framework overhead so với express.

Nếu như ứng dụng của bạn đã bám chặt vào express, hoặc bạn cũng không cần tới performance kinh khủng hơn nữa (vì 3742 rps là ok rồi),  hoặc code của bạn chạy express còn tích hợp nhiều thứ khác nữa rồi, thì cách đơn giản là bạn tăng thêm số instance để xử lý request đồng thời. Còn với 1 instance thì chúng ta đã đạt điểm tới hạn của nó rồi.

Nếu ứng dụng của các bạn đơn giản, không phụ thuộc nhiều vào express, hay cần phải tối ưu performance thêm nữa thì có thể thử các framework khác có overhead nhẹ hơn như [fastify](https://www.fastify.io/) hay [KoaJS](https://koajs.com/). Mình thì thường dùng Koa vì phổ biến hơn fastify và được sử dụng rộng rãi hơn, addon các thứ cũng nhiều hơn. Kiểu đây là option balance giữa độ phổ biến và tốc độ ấy.

Đây là kết quả bài test trên nhưng được thực hiện trên KoaJS:

| No. | Framework | Test         | Http time (s) | Additional time (s) | Http RPS | Ops RPS | avg(ms) | min(ms) | max(ms) | p95(ms) | Mongo CPU |
|-----|-----------|--------------|---------------|---------------------|----------|---------|---------|---------|---------|---------|-----------|
| 10  | Koa       | Empty GET    | 9.6           |                     | 10363    |         | 9.6     | 0.24    | 88.92   | 20.07   |           |
| 11  | Koa       | Empty POST   | 12.1          |                     | 8251     |         | 12.08   | 0.24    | 97.1    | 21.75   |           |
| 12  | Koa       | Insert Sync  | 35.3          |                     | 2835     |         | 35.23   | 12.67   | 183.13  | 53.01   | 52.00%    |
| 13  | Koa       | Insert Async | 29            | 7.5                 | 3452     | 2740    | 28.91   | 0.9     | 166.67  | 53.21   | 50.00%    |
| 14  | Koa       | Insert Group | 12.5          | 12.2                | 8017     | 4048    | 12.42   | 0.28    | 86.66   | 24.71   | 130.00%   |
| 15  | Koa       | Insert Bulk  | 13.3          | 1                   | 7515     | 6993    | 13.26   | 0.32    | 85.47   | 24.28   | 8.00%     |

Khá ấn tượng đúng không? Code xử lý thì giống nhau nhưng KoaJS có thể nhanh gấp rưỡi tới gấp đôi phiên bản code với ExpressJS.

> **Tips:** Ở đây các bạn đã hiều vì sao mình phải test cái Empty GET và Empty POST rồi chứ? Chính là để xác định đâu là phần mình tối ưu được, đâu là giới hạn dừng tối ưu và thay đổi framework. Nếu không có 2 bài test này thì các bạn sẽ cứ mò mẫm để tăng tốc thêm mà không biết rằng nó đã chạm tới giới hạn rồi.

## Bonus thêm mấy cái râu ria

Hết mấy bài test này, chắc các bạn cũng đã nắm kha khá những kỹ thuật xoay vòng rồi xử lý các kiểu có tác dụng gì rồi. Chỗ này mình sẽ nói thêm một chút kinh nghiệm mình có được trong quá trình xử lý ứng dụng write-heavy nữa.

### Queue không giúp giảm tải DB

Các bạn có thể cười mình. =))) Đầu tiên người ta bảo cứ hệ thống write nặng thì hãy nghĩ tới xử lý dạng queue, nên mình thường cứ mặc định hệ thống write nặng là lại chạy queue và nghĩ nó sẽ giảm tải cho DB. Tuy nhiên thực tế thì không phải vậy.

**Queue giúp throttle tải vào DB**. Tức là tổng lượng tải vào DB (số operations) thì không thay đổi, mà thay đổi ở đây là việc queue giúp **giới hạn số operation đồng thời** tới DB và **san đều peak request theo thời gian**. Điều này giúp giảm khả năng dính lock DB dẫn tới chờ đợi và quá tải tại 1 thời điểm.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/7ma3uorqdg_Screenshot%20from%202021-10-01%2000-06-32.png)

Batch mới là cái giảm tải cho DB và cả ứng dụng, do nó giảm được số operations và network roundtrip giữa app và DB. Đừng nhầm giữa việc áp dụng queue và batch như mình nhé. Thường thì không phải kiểu ứng dụng nào cũng có thể dùng batch. Nhiều operations phải xử lý tuần tự thì chúng ta đành dùng queue để tránh DB bị peak thôi.

### Xử lý batch rất khó control kết quả

Mặc dù dùng batch rất nhanh, tuy nhiên không phải lúc nào cũng có thể sử dụng được bởi nó làm tăng độ phức tạp ứng dụng của các bạn lên rất nhiều nếu như:

- Cần xử lý nhiều operation với 1 bản ghi
- Cần control kết quả một cách chặt chẽ. Kiểu bản ghi nào lỗi bản ghi nào thành công,...

Như trong trường hợp mình sử dụng MongoDB ở trên thì hàm `insertMany` sẽ có 1 options là `ordered: true|false`. Các bạn nên đọc thêm [doc của mongodb](https://docs.mongodb.com/manual/reference/method/db.collection.insertMany/#unordered-inserts) để hiểu cách hoạt động và kết quả của operation này. Điều tương tự cũng xảy ra với `bulkWrite`. Vậy nếu có trường hợp việc insert bản ghi xảy ra lỗi (duplicated key chẳng hạn) thì các bạn sẽ phải có 1 flow handle những error đó từ kết quả của bulk operation.

Cũng bởi vì khi sử dụng batch thì không thể biết kết quả operation vào thời điểm gọi. Nên là batch thường phù hợp với những ứng dụng kiểu **fire and forget**, tức là không cần biết kết quả cụ thể cho lắm. Còn đâu thì các bạn phải handle error với batch cẩn thận, vậy thôi.

Những ứng dụng kiểu insert event như mình đang làm rất phù hợp với batch vì tính đơn giản là insert vào DB chứ không phải xử lý gì mấy. Thế nhưng ứng dụng của bạn thì khác, lúc đó lại phải chọn những giải pháp khác như **sắp xếp lại thứ tự xử lý** này, rồi **tách 2 instance nhận request và insert DB riêng** này, **sử dụng queue để quản lý concurrent operation** này,...

### Graceful shutdown app khi dùng batch

Khác với việc xử lý request one-by-one và ngay lập tức. Việc xử lý batch dẫn chúng ta tới nguy cơ mất mát dữ liệu nhiều hơn. Ví dụ cái buffer 1000 items của mình chưa kịp đầy mà vẫn đang được giữ trong RAM mà app bị tắt đột ngột thì chúng ta sẽ mất hết cái buffer đó. Đây là rủi ro mà chúng ta phải chấp nhận khi đã sử dụng batch. Tuy nhiên chúng ta có thể giảm thiểu rủi ro bằng những tinh chỉnh sau đây:

- **Giảm size batch** 
- **Giảm timeout 1 batch**
- **Xử lý flush batch trong trường hợp app nhận được tín hiệu shutdown**.

Với 2 cách đầu thì chúng ta sẽ phải cân bằng giữa tính an toàn (flush batch sớm) và hiệu quả của batch (batch nhiều item). Mình sẽ để các bạn tự cân nhắc theo hệ thống của bản thân.

Cái số 3 là cái mà nhiều người hay quên. App đang chạy nếu nhận tín hiệu shutdown từ OS (SIGTERM, SIGINT,...) mà chúng ta không xử lý thì những batch đang chờ sẽ bị mất dữ liệu. Để xử lý vấn đề này thì các bạn hãy nghiên cứu về khái niệm Graceful shutdown. Nôm na là cleanup dữ liệu khi ứng dụng tắt.

Với express mình sẽ handle như sau:

```javascript
const server = app.listen(PORT, () => {
    console.log(`Application is listening at http://localhost:${PORT}`);
});

const terminate = function () {
    server.close(async () => {
        console.log('HTTP server closed, flushing batch...');
        await groupBulker.flush();
        console.log('Cleaned everything, bye bye.');
    });
}

process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    terminate();
});
process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    terminate();
});
```

Chỗ này nhớ handle cả SIGTERM và SIGINT nhé. SIGTERM sẽ thường gặp trong container khi pid 1 được gửi SIGTERM để tắt. Còn SIGINT sẽ hay gặp khi mình chạy `node index.js` rồi ấn `Ctrl + C`.

## Tổng kết

Qua bài viết này mình lại rút ra ba điều:

- **Database thì nhanh vãi, code của bạn mới chậm**. Thế nên hãy thôi lo lắng về việc chọn DB mà hãy tập trung tối ưu code của bạn trước đã. Kể cả hệ DB dạng SQL như MySQL hay PostgreSQL cứ bảo là insert chậm đi nhưng vẫn còn nhanh hơn tốc độ chạy code của bạn =))). Nếu bạn thật sự biết được giới hạn của DB bạn dùng, giới hạn của framework bạn dùng thì hẵng nghĩ tới việc thiết kế hay lựa chọn DB. Còn không thì tất cả sẽ trở thành over-engineer hết đó.
- **Batch rất nhanh và hiệu quả về tài nguyên, nhưng chưa chắc phù hợp với bạn**. Đây là điều bạn phải cân nhắc kỹ khi sử dụng batch. Rất nhiều hệ thống có traffic không cao quá và mỗi operation lại phức tạp thì cũng chưa cần động tới batch làm gì.
- **Biết giới hạn của công nghệ thì mới có thể chọn một công nghệ khác**. Bạn phải hiểu khả năng của một viên gạch thì mới có thể thiết kế căn nhà xây bằng gạch gì. Hiểu express chỉ chạy được tối đa 4k rps của mình là cơ sở để mình cân nhắc sang Koa hay Fastify với số request throughput mình mong muốn. Hay nói cách khác là muốn làm kiến trúc sư thì hãy xuống làm thợ xây một thời gian trước đã =))).

Hết rồi. Trong phần 3 của series [Chuyện anh thợ xây làm kiến trúc sư hệ thống](https://viblo.asia/s/24lJDz46KPM) tới đây, rất có thể mình sẽ đề cập tới những ứng dụng write-heavy nhưng có đặc điểm khác, như update các loại counter chẳng hạn. Hãy cùng đón đọc nhé.