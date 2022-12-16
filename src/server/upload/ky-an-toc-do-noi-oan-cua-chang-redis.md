**Redis chậm hay có điều gì ẩn khuất phía sau?**

Phiên tòa giữa lập trình viên và một công nghệ phổ biến hàng đầu trên thế giới với sự góp mặt của điều tra viên kiêm luật sư bào chữa Minh Monmen. Rất hy vọng rằng sau những lời lẽ đanh thép và hàng loạt bằng chứng thuyết phục, công lý sẽ đến được với đúng đối tượng.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/7e2pxrlf2c_%E1%BA%A3nh.png)

## First things first

Xin chào quý bạn và các vị, lại là mình đây, **Minh Monmen**, một backend developer kiêm devops kiêm nhà thơ và nhà văn viết truyện trinh thám. Ấy vậy mà hôm nay mình ở đây cùng các bạn với một vai trò hoàn toàn khác, đó chính là luật sư kiêm điều tra viên. Tại sao lại như vậy? Bởi vì mới đây công ty mình đã có 1 vụ kiện vô tiền khoáng hậu giữa anh em backend và redis. Vâng đúng là nó, **"chiếc xe đua F1 trong ngành công nghệ"** - **Redis** đã bị cáo buộc tội danh... **chậm**.

Ô kê, không để các bạn phải mất thời gian thêm nữa, ta hãy vào đi ngay vào hồ sơ vụ án.

## Hồ sơ vụ án

**Bị cáo**: Redis

**Nguyên cáo**: Developer

**Đại diện VKS**: Developer

**Luật sư bào chữa**: Devops

**Cáo trạng:** Vào hồi ban ngày khi lượng trafic ổn định, trụ sở của công an phường Sentry nhận được rất nhiều báo cáo về sự chậm chạp API. Qua quá trình điều tra làm rõ từng bước xử lý, cuối cùng đại diện VKS đã phát hiện ra nguyên nhân gây ra sự chậm trễ này là của bị cáo **Redis**, nhiều lần bị cáo phản hồi rất chậm, lên tới cả trăm mili giây (ms) và làm cho API bị timeout. Tới đây nhận thấy đây là hành vi đặc biệt nguy hiểm, ảnh hưởng tới an ninh, an toàn của cả hệ thống nên đại diện VKS đã lập hồ sơ và chuyển cho cơ quan chức năng có thẩm quyền (Devops) xử lý.  

Tới đây, Devops tiếp tục điều tra làm rõ qua các bằng chứng thông qua hệ thống monitor tài nguyên, kết luận sơ bộ bị cáo **Redis** không bị quá tải, lượng tài nguyên sử dụng thấp, số request phải xử lý thấp, latency được báo cáo trên monitor cũng thấp,... Vụ việc được chuyển hướng điều tra sang 1 đối tượng khác đó là **NodeJS**. NodeJS là đối tượng nổi tiếng với đặc điểm **single-thread** nên được các cơ quan chức năng đưa vào diện nghi vấn đầu tiên. Có thể trong lúc phục vụ người này thì đối tượng NodeJS đã tự ý delay nhiều request của người khác cũng nên. Rất nhiều các cuộc thăm khám nơi ở của đối tượng được thực hiện tuy nhiên người ta vẫn chưa thể tìm thấy bằng chứng phạm tội của y. Vậy là vụ án đã dần đi vào bế tắc.

May thay 1 tia sáng đã rọi vào hồ sơ vụ án khi điều tra viên Minh Monmen nghiên cứu source code và có 1 giả thuyết về vấn đề atomic operation thông qua lua script mà dev đang sử dụng sẽ gây blocking CPU của redis khi phải response 1 kết quả quá dài. Điều này được kiểm chứng bằng 1 bài test đơn giản (loại được hết các nghi ngờ liên quan tới đối tượng NodeJS hay network,...)

- Liên tục gọi API xuất hiện response chậm có sử dụng phần lua script (với concurrent là 1 nhưng gọi liên tục)
- Gọi 1 Request có sử dụng redis nhưng command rất nhẹ vào 1 instance NodeJS khác.

Kết quả: request sử dụng redis nhẹ mặc dù thông thường có latency chỉ 1ms, nhưng khi xuất hiện những request với lua script thì **latency đã tăng lên vài trăm ms, thậm chí tới cả nghìn ms**.

## Kẻ thủ ác lộ diện

Quay trở lại với bài toán gốc rễ đã gây ra vụ kiện này. Đó chính là bài toán lọc blacklist được mình đơn giản hóa lại như sau:

- Cho 1 danh sách X chứa n số nguyên bị blacklist (1k < n < 1M)
- Nhiều danh sách Y khác chứa m số nguyên (1 < m < 20k)

Với mỗi request sẽ cần cần xuất ra toàn bộ phần tử của 1 số danh sách Y sau khi loại bỏ những số bị blacklist trong X.

Giả sử X và Y đều được lưu dạng Set trên redis. Vậy làm cách nào để xuất được các phần tử của nhiều danh sách kèm theo yêu cầu lọc blacklist?

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/zzetc51wpb_%E1%BA%A3nh.png)

Thật ra bài toán về logic rất đơn giản này có thể xử lý với câu lệnh **SDIFF** của redis như sau:

```js
const keys = [
    'Y1', 'Y2', 'Y3', 'Y4'
]
const result = await Promise.all(keys.map(async (key) => redis.sdiff(key, 'X')))
```

> **SDIFF** là câu lệnh trả về những phần tử của Y và **KHÔNG** xuất hiện xong X

Xong, bài toán được giải quyết (về mặt logic). Tuy nhiên với số lượng key Y cần lấy trong 1 request là khoảng vài chục với vài trăm thì cách xử lý bên trên lại gây ra những vấn đề về mặt performance. Chính vì điều này, developer đã xử lý bằng cách gom hết câu lệnh `sdiff` trên vào thành 1 lệnh lua script có pseudo code tương tự như sau:

```
# Call: sdiffes Y1 Y2 Y3 Y4

result = {}
for v in ARGV
    tmp = redis.sdiff(v)
        for val in tmp
            result[v][] = toNumber(val)

return json.encode(result)
```

Và đây chính là tên tội phạm của chúng ta: **Lua script** sẽ được thực thi như một **Atomic Operation** trên redis. Mọi chuyện sẽ vẫn rất ổn nếu như những thứ chạy bên trong lua script được xử lý 1 cách nhanh chóng. Đây cũng là 1 tính năng được rất nhiều người sử dụng để tạo ra 1 transaction trên redis. Tuy nhiên khi áp dụng vào trường hợp của chúng ta thì không những nó không giúp cải thiện về mặt tốc độ mà ngược lại còn gây rất nhiều hiệu ứng tiêu cực cho những câu lệnh khác. Tại sao vậy?

- Bản thân **SDIFF** là **1 câu lệnh rất chậm** (với độ phức tạp cụ thể trong trường hợp của chúng ta là O(nX + nY))
- **Lua script** sẽ tạo ra **1 khối lệnh được thực hiện liền mạch** và **block** những câu lệnh khác (đây là tính năng nhé) - cơ chế atomic.
- **Convert response** trả về từ string thành number. Tiêu tốn thêm CPU và làm tăng độ phức tạp do phải loop qua toàn bộ kết quả.
- Response được dồn lại thành 1 cục, được **encode json** rồi mới gửi cho client. Điều này làm tăng memory và CPU để xử lý.

Vâng, và tưởng tượng khi tạo ra 1 cục lệnh to như thế này trên redis, thì khi đó những command khác dù có nhanh đến mấy, được xử lý async hiệu quả đến mấy cũng sẽ phải ngồi mà chờ nó chạy cho xong. Điều này khác với việc gọi riêng lẻ các lệnh sdiff sẽ tạo cơ hội để redis có thể chen giữa các lệnh này bằng các command khác và không làm tất cả các request khác phải chờ đợi.

Kẻ thủ ác thật sự đã lộ diện, giờ chúng ta sẽ bắt hắn phải trả giá.

## Bản án sơ thẩm

Dựa trên những bằng chứng được khẳng định chắc chắn bằng công cụ. À chết quên chưa nói tới vấn đề công cụ nhỉ. Để loại trừ các yếu tố liên quan tới network thì mình đã thực hiện test bằng [**benchmark.js**](https://benchmarkjs.com/) chạy trực tiếp trên server redis. Và sau đây là điều kiện test:

- 1 tập hợp blacklist X gồm 100k phần tử 
- 10 tập hợp Y với số lượng phần tử từ vài trăm tới vài ngàn phần tử

> **Data dùng để test không phải ngẫu nhiên mà là dữ liệu thực tế, do đó phản ánh chính xác các tương quan cụ thể ở cuối bài**

Các bài test:

- **Test old command (lua script + convert number)**

```
# Call: sdiffes Y1 Y2 Y3 Y4

result = {}
for v in ARGV
    tmp = redis.sdiff(v)
        for val in tmp
            result[v][] = toNumber(val)

return json.encode(result)
```

- **Test optimized command (lua script + NOT convert number)**

```
# Call: sdiffes Y1 Y2 Y3 Y4

result = {}
for v in ARGV
    result[v] = redis.sdiff(v)
return json.encode(result)
```

- **Test sdiff command qua pipeline**

```js
const result = await redis
    .pipeline()
    .sdiff('Y1', 'X')
    .sdiff('Y2', 'X')
    .sdiff('Y3', 'X')
    .sdiff('Y4', 'X')
    .exec();
```

- **Test sdiff command qua promise all (không dùng pipeline)**

```js
const keys = [
    'Y1',
    'Y2',
    'Y3',
    'Y4',
];
const result = await Promise.all(
    keys.map(async (key) => redis.sdiff(key, 'X'))
);
```

Kết quả sơ bộ:

|        Test        |     Result    | Variance |
|--------------------|---------------|----------|
| Lua + number       | 31.39 ops/sec | ±1.68%   |
| Lua w/o number     | 52.36 ops/sec | ±3.07%   |
| Sdiff + pipeline   | 58.80 ops/sec | ±2.66%   |
| Sdiff w/o pipeline | 62.90 ops/sec | ±2.02%   |

Như chúng ta có thể thấy, việc loại bỏ convert number giúp tăng đáng kể tốc độ thực thi, đồng thời việc chuyển qua sử dụng trực tiếp lệnh **SDIFF** giúp chia nhỏ quá trình lấy kết quả và tránh được phần nào việc block những câu lệnh khác của redis.

Một điểm thú vị ở đây đó chính là việc sử dụng pipeline với test case của mình là không hiệu quả. Điều này có thể lý giải bằng 3 lý do sau:

- **Không có network latency**, do đó pipeline không phát huy ưu thế rõ rệt
- **Số lượng command trong 1 pipeline rất ít** (~10 cmd/pipeline), do đó hiệu quả cũng chưa rõ rệt
- **Sdiff vốn là 1 command chậm**, cộng với **dung lượng response trả về lớn** (vài k item) nên việc gộp response lớn của 1 số ít command không đem lại hiệu quả như gộp response nhỏ của nhiều command. Điều này làm cho việc gọi bằng Promise.all đạt hiệu qủa cao hơn 1 chút.

Vậy là bản án dành cho kẻ thủ ác của chúng ta chỉ là 2 năm tù giam (x2 performance). Tuy nhiên Redis cũng không tránh khỏi liên đới trách nhiệm khi vẫn gây thất vọng vì không thể xử lý trường hợp này hiệu quả hơn. Câu chuyện đáng lẽ đã kết thúc tại đó.

## Bản án phúc thẩm: nhân chứng bitset

Không cam tâm để redis chịu thêm ấm ức, đặc phái viên Devops (là mình) đã tiếp tục đào sâu thêm vào các tình tiết của vụ án nhằm tìm ra những sơ hở của kẻ thủ ác vẫn còn nhơn nhơn vì mức án quá nhẹ. Kết hợp với 1 nghiên cứu mà mình đã thực hiện 4 năm trước về các phép toán hiệu quả trên tập hợp số nguyên, mình đã lờ mờ nhận ra 1 hướng đi mới có lợi hơn cho Redis. Đó chính là sử dụng **Bitset**.

Nói qua 1 chút về bitset, thì bitset là 1 dãy bit thôi. Tuy nhiên bitset sẽ có thể biểu diễn được 1 tập hợp số tự nhiên không quá lớn 1 cách có hiệu quả thông qua các giá trị 1 tại offset tương ứng. Ví dụ: Tập hợp `[1,3,4,6,7,10]` có thể được biểu diễn bằng dãy bit: 

```
1 - 0 - 1 - 1 - 0 - 1 - 1 - 0 - 0 - 1
|       |   |       |   |           |
1       3   4       6   7           10
```

Quay trở lại với bài toán, giả sử X là tập hợp `[1,3,4,6,7,10]`, còn Y của mình là tập hợp `[3,5,8,9]` và tập kết quả sau khi filter sẽ là `[5,8,9]` thì mình có thể sử dụng phép toán bit để giải quyết như sau:

```
( 1-0-1-1-0-1-1-0-0-1  XOR  0-0-1-0-1-0-0-1-1-0 ) AND ( 0-0-1-0-1-0-0-1-1-0 ) = 0-0-0-0-1-0-0-1-1-0
  |   | |   | |     |           |   |     | |               |   |     | |               |     | |                                
  1   3 4   6 7     10          3   5     8 9               3   5     8 9               5     8 9                         
```

Các phép toán bit được thực hiện cực kỳ nhanh trên CPU nên chúng ta có thể kỳ vọng việc thực hiện này sẽ nhanh hơn việc loop qua cả 2 tập hợp như SDIFF đang làm. Lý thuyết là dùng 1 lần XOR và 1 lần AND (hoặc 1 lần NOT chuyển blacklist thành whitelist rồi mới AND). Redis cũng hỗ trợ sẵn chúng ta kiểu dữ liệu Bitset. Vậy là điều này dễ dàng thực hiện được rồi đúng không?

Nhưng đời lại không đơn giản như vậy. Với dãy số nguyên của mình có thể nhận các giá trị từ 1 ~> 4 tỷ (int32) và 1 tập hợp Y chỉ chứa số phần tử không nhiều (vài k phần tử) thì việc lưu trữ bằng bitset là cực kỳ tốn dung lượng.

Ví dụ để lưu 1 tập hợp chứa số 4.000.000.000 (4 tỷ) thì mình sẽ cần 3.999.999.999 số 0 phía trước. Tức là cần tương đương **4.000.000.000 / 8 / 1024 / 1024 = 470MB** dung lượng lưu trữ chỉ để lưu 1 số. Không ổn không ổn.

Giữa lúc bế tắc này, mình có nhớ lại 1 extension mình định viết cho PostgreSQL cách đây mấy năm về việc giảm tải dung lượng lưu trữ của bitset. Và may mắn thay trên redis đã có người làm sẵn điều ấy bằng module: [redis-roaring](https://github.com/aviggiano/redis-roaring). 

> Roaring bitmap là 1 kiểu dữ liệu bitset được nén lại bằng các thuật toán phân chia loại bỏ phần không cần thiết của bitset (như 1 đống số 0 ở ví dụ trên) để giảm dung lượng lưu trữ. Các bạn có thể tìm hiểu thêm về Roaring bitmap tại đây [https://roaringbitmap.org/](https://roaringbitmap.org/)

Vậy là việc của chúng ta bây giờ chỉ cần dùng. Hãy bắt đầu với 1 đoạn lua script thực hiện yêu cầu trên:

```lua
-- Call bitdiff Y X

-- tmp = Y XOR X
redis.call('R.BITOP', 'XOR', 'tmp', KEYS[1], KEYS[2])

-- tmp = Y AND tmp
redis.call('R.BITOP', 'AND', 'tmp', KEYS[1], 'tmp')

-- Get list number stored in tmp
local result = redis.call('R.GETINTARRAY', 'tmp')

-- Delete tmp key
redis.call('DEL', 'tmp')

return result
```

Tiếp tục benchmark sử dụng các test case:

- **Test bitdiff command qua pipeline** 

```js
const result = await redis
    .pipeline()
    .bitdiff('Y1', 'X')
    .bitdiff('Y2', 'X')
    .bitdiff('Y3', 'X')
    .bitdiff('Y4', 'X')
    .exec();
```

- **Test bitdiff command qua promise all (không dùng pipeline)**

```js
const keys = [
    'Y1',
    'Y2',
    'Y3',
    'Y4',
];
const result = await Promise.all(
    keys.map(async (key) => redis.bitdiff(key, 'X'))
);
```

Ta được kết quả:

|              Test              |     Result    | Variance |
|--------------------------------|---------------|----------|
| Lua + number                   | 31.39 ops/sec | ±1.68%   |
| Lua w/o number                 | 52.36 ops/sec | ±3.07%   |
| Sdiff + pipeline               | 58.80 ops/sec | ±2.66%   |
| Sdiff w/o pipeline             | 62.90 ops/sec | ±2.02%   |
| Bitdiff + pipeline             | 99.05 ops/sec | ±1.52%   |
| Bitdiff w/o pipeline           | 103 ops/sec   | ±1.21%   |

Một cú bứt phá ngoạn mục đúng không? Ta đã tăng thêm được 1 năm tù cho bản án bằng việc gấp 3 lần performance ban đầu thông qua sử dụng Roaring bitmap. 

## Bản án giám đốc thẩm: sự linh động theo từng usecase

Mặc dù tòa đã tuyên án phúc thẩm và bị cáo Redis hết quyền khiếu nại tiếp tục lên trên. Tuy nhiên với nhận định rằng bị cáo Redis hoàn toàn có thể làm tốt hơn nếu được tối ưu dựa vào tình huống cụ thể, các cấp chính quyền trung ương đã chỉ thị tiếp tục xem xét tiếp cho bị cáo được trắng án hoàn toàn và thoát khỏi cáo buộc chậm chạp. Và thế là hội đồng giám đốc thẩm được bổ nhiệm do mình làm chủ trì.

Còn yếu tố nào chưa xét đến nữa? Chính là việc sử dụng 2 bitwise operation AND và XOR cho 2 chuỗi bitmap X và Y. Mặc dù có tiếng là nhanh nhưng khi xem xét tương quan lực lượng giữa X và Y thì có 1 số đặc điểm sau cần lưu ý:

- **Số lượng phần tử trong X rất lớn** (10k < n < 1M)
- **Số lượng phần tử trong Y không lớn** (1 < n < 20k)
- **Số lượng phần tử chung của X và Y rất nhỏ** (dao động trong khoảng [0,100])

Từ đây ta có thể suy diễn tiếp việc gán `tmp = X XOR Y` là không hiệu quả (vì gần như tmp sẽ clone lại X với số lượng lớn phần tử). Vậy nếu chúng ta sử dụng 1 cách nông dân hơn rất nhiều, đó chính là tìm các phần tử chung của X và Y (rất ít), rồi làm 1 vòng loop để loại bỏ các phần tử này khỏi Y mà không cần XOR thì sao?

```lua
-- Call bitdiffoptimized Y X

-- tmp = Y AND X
redis.call('R.BITOP', 'AND', 'tmp', KEYS[1], KEYS[2])

-- Get list number stored in tmp
local t = redis.call('R.GETINTARRAY', 'tmp')

for i,v in pairs(t) do
    -- Remove v from Y
    redis.call('R.SETBIT', KEYS[1], v, 0)
end

-- Delete tmp key
redis.call('DEL', 'tmp')

-- Return list number stored in Y (without tmp)
return redis.call('R.GETINTARRAY', KEYS[1])`
```

Benchmark tương tự như các case phía trên, ta có kết quả:

|              Test              |     Result    | Variance |
|--------------------------------|---------------|----------|
| Lua + number                   | 31.39 ops/sec | ±1.68%   |
| Lua w/o number                 | 52.36 ops/sec | ±3.07%   |
| Sdiff + pipeline               | 58.80 ops/sec | ±2.66%   |
| Sdiff w/o pipeline             | 62.90 ops/sec | ±2.02%   |
| Bitdiff + pipeline             | 99.05 ops/sec | ±1.52%   |
| Bitdiff w/o pipeline           | 103 ops/sec   | ±1.21%   |
| Optimized Bitdiff + pipeline   | 173 ops/sec   | ±1.02%   |
| Optimized Bitdiff w/o pipeline | 182 ops/sec   | ±0.97%   |

Một con số ấn tượng đúng không? 6 năm tù giam dành cho kẻ thủ ác. Tất nhiên điều này có được cũng phải nhờ tới sự hy sinh khi mà chính tập hợp Y sẽ bị loại bỏ các phần tử blacklist mãi mãi. Sự hy sinh này sẽ mở đầu cho nhiều cách tối ưu tiếp theo. Tuy nhiên vụ án có lẽ tới đây đã có thể dừng lại được rồi. Redis cũng đã mãn nguyện với việc trắng án và bọn mình cũng đã có được điều bọn mình cần: **Tốc độ** và **Ít bị block**.

## Tổng kết

Qua vụ kỳ án này mình rút ra 3 điều:

- **Không có vinh quang nào đạt được mà không cần tới sự hy sinh**. Tối ưu là quá trình hy sinh rất nhiều thời gian và chất xám. Thời gian ngắn thì đừng đòi hỏi mọi thứ phải ngon.
- **Cái mà bạn thấy chỉ là bề nổi của tảng băng**. 3 phương án trên mà các bạn nhìn thấy là kết quả của sự chọn lọc và đánh giá khoảng 12 phương án tối ưu với rất nhiều cách tiếp cận khác nhau mà thôi.
- **Trong mọi trường hợp, đừng vội vàng phán xét công cụ**. Bởi vì công cụ đâu biết tự làm việc đâu.

Hết rồi.