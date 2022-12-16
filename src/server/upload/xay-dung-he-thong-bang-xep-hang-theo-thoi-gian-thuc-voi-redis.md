Chào các bạn, lại là mòe vui vẻ đây. Sau một thời gian vọc vẹo làm gêm gủng thì gần đây mình cũng tập tọe làm phần server. Theo mình thấy thì đối với các hệ thống game thì bảng xếp hạng là một phần không thể thiếu. Vậy nên hôm nay mình sẽ chia sẻ cách tạo một bảng xếp hạng theo thời gian thực dựa trên kinh nghiệm của mình.
## 1. Đặt vấn đề
Việc xây dựng bảng xếp hạng theo thời gian thực gặp rất nhiều thách thức như:
 - Đáp ứng được quy mô lớn ( lên đến hàng triệu người dùng)
 - Tính toán trên một lượng lớn các thuộc tính (để xem xếp hạng dựa trên các điều kiện phân loại khác nhau)
 - Cung cấp quyền truy cập bảng xếp hạng theo thời gian thực với tính khả dụng cao
 - Vân vân và mây mây...
Thật may là với cấu trúc Sorted Sets (ZSETs) mà Redis cung cấp, chúng ta có thể dễ dàng xây dựng bảng xếp hạng một cách dễ dàng. (Bạn nào chưa biết Redis là gì thì có thể lên đây tìm hiểu nhé: https://redis.io/docs/about/)
## 2. Ý tưởng
Mình sẽ sử dụng 2 Key:
   - 1 ZSET key để lưu score (điểm số) của người chơi, ZSET trên redis sẽ tự động sắp xếp data theo điểm số.   
![](https://images.viblo.asia/34da63eb-e205-4317-9d52-ae71ec4ba539.png)
  - 1 HSET key để lưu thông tin tên của người chơi.   
![](https://images.viblo.asia/7ba19774-1972-4e01-82df-6a08c762a5a9.png)

 Khi cần lấy bảng xếp hạng, mình sẽ dùng ZREVRANGE để lấy danh sách người chơi theo điểm số đã được sắp xếp từ ZSET, sau đó map với tên người chơi từ HSET để trả về kết quả.
## 3. Xây dựng hệ thống bảng xếp hạng đơn giản với Nodejs + Redis
Ở phần này, mình sẽ tạo mẫu một bảng xếp hạng đơn giản với Nodejs.
### 3.1 Kết nối redis
Để kết nối Nodejs server thì mình sẽ sử dụng package ioredis (Cú pháp tải: `npm i ioredis`)
```
import Redis from 'ioredis'

export const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT),
  db: 0
})

// Kết nối thành công
redis.on('connect', function () {
  console.log('connected redis success!!!')
})

// Kết nối thất bại
redis.on('error', function (err) {
  console.log('Connected redis Error ' + err)
})
```
### 3.2 Tạo class **LeaderboardManager** để quản lý bảng xếp hạng
```
import { redis } from './redis'

export class LeaderboardManager {
  private readonly PREFIX = 'demo:'
  private readonly REDIS_KEY = this.PREFIX + 'leaderboard'
  private readonly REDIS_DATA_KEY = this.PREFIX + 'leaderboard_data'

  // Lấy thông tin bảng xếp hạng
  async getLeaderboard(limit: number) {
    try {
      const result = []
      // Lấy danh sách member đã được sắp xếp theo điểm số
      const userRankingSet = await redis.zrevrange(this.REDIS_KEY, 0, limit, 'WITHSCORES')
      // Filter để lấy list điểm của user
      const topUserScore = userRankingSet.filter((value, index) => {
        if (index % 2 === 1) return value
        return false
      })
      // Filter để lấy list id của user
      const topUserId = userRankingSet.filter((value, index) => {
        if (index % 2 === 0) return value
        return false
      })
      // Lấy list tên người chơi theo list id ở trên
      const listUsername = await redis.hmget(this.REDIS_DATA_KEY, ...topUserId)
      // Map data lại với nhau
      for (let i = 0; i < topUserScore.length; i++) {
        result.push({
          id: topUserId[i],
          ranking: i + 1,
          username: listUsername[i],
          point: topUserScore[i]
        })
      }
      return result
    } catch (error) {
      return []
    }
  }

  // Lấy xếp hạng của người chơi theo id
  async getUserRanking(userId: number) {
    // Lấy thứ tự của member trên zset. Vì thứ tự bắt đầu từ 0 nên rank của user = thứ tự + 1
    const rankingInRedis = await redis.zrevrank(this.REDIS_KEY, `${userId}`)
    return rankingInRedis + 1
  }

  // Cập nhật điểm của người chơi bất kỳ theo id
  async updateUserPoint(userId: number, point: number, username?: string) {
    // Cập nhật lại điểm
    await redis.zadd(this.REDIS_KEY, point, userId)
    if (!username) return
    // Nếu truyền username vào thì cập nhật lại username
    await redis.hsetnx(this.REDIS_DATA_KEY, `${userId}`, username)
  }
}

```
### 3.3 Tạo các API để test
```
@Controller('api/leaderboard')
export class LeaderboardController {
  private leaderboardManager = new LeaderboardManager()

  @Post('get')
  public async get(req: Request, res: Response, next: NextFunction) {
    const task = async () => {
      const data = await this.leaderboardManager.getLeaderboard(10)
      return new BaseResponse({
        data
      })
    }
    await ErrorHandler.APIReqHandler(task, { req, res, next })
  }

  @Post('update')
  public async update(req: Request, res: Response, next: NextFunction) {
    const task = async () => {
      const { id, point, name } = req.body
      await this.leaderboardManager.updateUserPoint(id, point, name)
      return new BaseResponse({
        message: 'OK'
      })
    }
    await ErrorHandler.APIReqHandler(task, { req, res, next })
  }

  @Post('user-ranking')
  public async userRanking(req: Request, res: Response, next: NextFunction) {
    const task = async () => {
      const { id } = req.body
      const data = await this.leaderboardManager.getUserRanking(id)
      return new BaseResponse({
        data
      })
    }
    await ErrorHandler.APIReqHandler(task, { req, res, next })
  }
}
```
### 3.4 Thành quả
Vậy là chỉ với vài dòng code nho nhỏ, chúng ta đã xây dựng được 1 bảng xếp hạng thời gian thực.
![](https://images.viblo.asia/6d84b9f9-cf8e-471f-83e2-cb1d325e6687.png)

![image.png](https://images.viblo.asia/d5043fd7-c0ee-4633-ba71-724b4e4db637.png)

Như các bạn đã thấy, chỉ mất vài milligiây để API phản hồi về, quá nhanh và nguy hiểm phải không ạ.
## 4. Tài liệu tham khảo:
1. https://redis.com/solutions/use-cases/leaderboards/
2. https://redis.io/commands/
3. https://www.npmjs.com/package/ioredis
4. https://gitlab.com/ThanhPham99/sample-redis-leaderboard