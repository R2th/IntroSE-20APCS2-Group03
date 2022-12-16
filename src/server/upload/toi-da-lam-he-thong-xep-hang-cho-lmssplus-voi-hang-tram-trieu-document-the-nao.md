Mình làm web [LmssPlus](https://lmssplus.com/)  cho phép tra cứu thông tin cá nhân game Liên Minh , có 1 phần cực khoai (đối với mình) đó là người chơi muốn biết con tướng họ đang sử dụng có điểm thông thạo đứng thứ bao nhiêu trong toàn server VN.

Để mình giải thích một chút cho bạn nào không chơi Liên Minh nhé. Đại khái là bạn sẽ có nhiều con tướng khác nhau để lựa chọn trong tổng số 150 con tướng, tuy nhiên mọi người thay vì chơi tất cả 150 con tướng, họ thường chỉ chơi khoảng chục con, và đến khoảng 30 con tướng là nhiều. Với mỗi lần chơi con tướng đó bạn sẽ được cộng thêm điểm thông thạo.

Vậy là nhu cầu của người dùng ở đây:
* Họ muốn biết con tướng X họ chơi có thông thạo đứng thứ bao nhiêu trong server.
* Họ muốn biết top những người chơi nhiều thông thạo nhất server của con tướng X.

Suy nghĩ đầu tiên của mình khá đơn giản, mình dùng Mongodb, trước tiên là model
```javascript
var chema = new mongoose.Schema({
  accountId: Number, //người chơi
  championId: Number, //tướng
  point: Number, //điểm thông thạo
});
```
- Index { accountId: 1, championId: 1 } để upsert dữ liệu (khi người dùng thay đổi điểm thông thạo).
- Index { championId: 1, point: 1 } để lấy rank.

-----


Câu truy vấn rank thế này: 
```javascript
Ssrank.find({championId, point: {$gt: point}).count()
```
Vậy là rank của tướng championId đơn giản là kết quả trên cộng 1. 

Ta cần lấy thứ hạng của tất cả các con tướng của họ chơi, rồi hiển thị con tướng có thứ hạng cao nhất, như mình là top 731 Katarina.
![](https://images.viblo.asia/6a211a94-1281-4186-9057-94810e6ac7a1.png)

Vậy câu truy vấn sẽ trông như thế này:

![](https://images.viblo.asia/07d2b992-9267-43c0-8a9c-b961bf052b25.png)

Với mỗi 1 người dùng vào ta mất khoảng 10-30 truy vấn, tốc độ trả về kết quả khoảng 300-500ms, kết quả con server của mình bị tình trạng này đây:

![](https://images.viblo.asia/03d7ad8d-6d05-4651-9cfb-f9b6c638463d.png)

Dữ liệu sẽ được update mới ngày đêm (có 1 cron làm nhiệm vụ lấy thông tin và cập nhật vào db) và khi người dùng vào web (để có dữ liệu mới nhất)

Hmm, sau khi đọc thêm 1 vài blog, mình quyết định dùng Redis với ưu điểm cực nhanh, và lượng ram sử dụng cũng chỉ tương đương với mongodb (1)

Trước tiên mình viết 1 function để đem dữ liệu từ mongodb qua redis, ở bên mongodb thì mình bỏ collection `ssranks` để đỡ tốn ram vào index không cần thiết, thay vào đó data tướng sẽ được lưu vào 1 field `champions` trong collection `accounts`. 

`Key` sẽ là cp_id_tướng, `score` sẽ là điểm thông thạo, và `value` là accountId
```javascript
//khi upsert
redis.zadd("cp_" + championId, point, accountId)
//truy vấn lấy thứ hạng của tất cả các con tướng của họ chơi
await Promise.all(
      champions.map(({ championId, point }) =>
        redis.zrevrank("cp_" + championId, accountId).then((rank) => ({
          championId,
          rank: rank + 1,
          point,
        }))
      )
    )
 //à lấy top 10 người chơi có thông thạo đứng đầu server của tướng thì như này
 let toprank = await redis.zrevrange("cp_" + championId, 0, 9, "WITHSCORES");
```
Và kết quả
* Tốc độ 30ms
* Cpu giảm, ổn định ở mức 5%

![](https://images.viblo.asia/be1f1501-1628-4eb8-91a6-4a5ed27f8696.png)


Trên đây là những gì mình làm, hiểu biết mình còn hạn hẹp nên có lỗi lầm nào mong các bạn lượng thứ. Mình cảm ơn!

Ref:
- https://medium.com/@badotnet/use-case-how-to-rank-2-millions-users-per-score-in-realtime-with-redis-452d6aeb58b2
- https://www.openmymind.net/Paging-And-Ranking-With-Large-Offsets-MongoDB-vs-Redis-vs-Postgresql/