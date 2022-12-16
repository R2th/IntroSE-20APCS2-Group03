### **Khái niệm**
Ratelimit là chiến lược giới hạn số lượng request thông qua internet, nó là tần suất của một user có lặp đi lặp lại trong một thời gian. Ví dụ khi user login thì ratelimit giới hạn trong 1 phút chỉ được thực hiện 5 request, khi có request thứ 6 sẽ bị từ chối.

### **Ratelimit hoạt động thế nào**
* Ratelimit sẽ chạy bên trong của một application, trên web server của chính nó. Ratelimit theo dõi địa chỉ IP request đến, theo dõi số lượng request giữa mỗi request. Có nhiều cách để xác định của mỗi user.
* Ratelimit là cơ chế theo dõi số lượng request cho một địa chỉ IP, và  số lượng request trong 1 khoảng thời gian. Nếu có nhiều request hơn trong 1 thời điểm thì ratelimit sẽ từ chố request.
* Ratelimit chỉ sử dụng cho địa chỉ IP, vì thế nếu sử dụng nhiều IP thì có thể không hiệu quả.

### **Mục đích sử dụng### **
* Giảm tải việc một số user dùng tool để tấn công quá nhiều request tại 1 thời điểm.
* Khi sàn ecomerce trong những đợi giảm giá lớn sẽ có nhiều user spam request.
* Chặn một service khác gọi qua service của team quá nhiều.

## Golang Code Demo
### Không chặn số lượng request

* Phần này sẽ sử dụng redis để handle ratelimit, cần connect đến redis trước, bài viết trước mình có thực hiện redis demo rồi [link](https://viblo.asia/p/golang-redis-luu-don-gian-Az45bjNO5xY). 
*  Sử dụng thêm thư viện limiter, link [github]( https://github.com/ulule/limiter )
*  Sử dụng framework: [Gin](https://github.com/gin-gonic/gin) 

1. Struct Server:
Khai báo một struct *server* bao hồm các field:
```
type Server struct {
	limiter    *limiter.Limiter
	router     *gin.Engine
	httpServer *http.Server
}
```
* limiter: giới hạn số lượng request trong 1 khoảng thời gian.
* router: khai báo các router , method.
* httpServer: một địa chỉ server để lắng nghe request từ client.

2. Main function:
```
limiterRate := limiter.Rate{
		Period: 5 * time.Second,
		Limit:  5,
	}
```
=> định nghĩa số lượng request trong 1 khoảng thời gian, 5 request trong vòng 5 giây, có thể thay đổi thông số này tuỳ vào từng nghiệp vụ khác nhau.

3. Create function Ratelimit:
```
func RetiverRatelimit(rateLimiter *limiter.Limiter) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		fmt.Println("rate ")
		ctx.Next()
	}
}
```
=> func hiện tại không kiểm tra gì cả, chỉ khai báo và cho đi tiếp, func *Next()*

4. Test:
- thực hiện lệnh curl sau:
```
curl --location --request GET 'http://localhost:8100/v1/set'
```
- response 
```
{
    "message": "redis set ok \n"
}
```
=> Có thể request không giới hạn.

### Chặn số lượng request:
1.  Sử dụng một function để kiểm tra total request trong 1 khoảng thời gian. Kiểm tra hàm *RetiverRatelimit* và thay đổi đoạn code sau:
```

func RetiverRatelimit(rateLimiter *limiter.Limiter) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ipClient := ctx.ClientIP()
		limiterCtx, err := rateLimiter.Get(ctx, ipClient)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, handler.Reponse{
				Message: "ratelimiter faile",
			})
			return
		}
		if limiterCtx.Reached {
			ctx.JSON(http.StatusBadRequest, handler.Reponse{
				Message: "Yêu cầu quá nhiều lần. Vui lòng thử lại sau!",
			})
			ctx.Abort()
			return
		}
		ctx.Next()
	}
}
```
=> thực hiện việc kiểm tra xem đối với client-ip có bao nhiêu request tại 1 thời điểm.

2. Trong router:
```
func (s *Server) Router() {
	grouter := s.router.Group("v1")
	grouter.Use(ratelimit.RetiverRatelimit(s.limiter))
	grouter.GET("/set", handler.Set())
	grouter.GET("/get", handler.Get())
}
```
=> Khai bảo một group *router*, và trước khi đi vào từng function thì phải qua *RetiverRatelimit*  kiểm tra request có hợp lệ hay từ chối. 

2. Call request thứ 6:
- Request curl:
```
curl --location --request GET 'http://localhost:8100/v1/set'
```
- Message reponse: 
```
{ 
     "message": "Yêu cầu quá nhiều lần. Vui lòng thử lại sau!"
}
```

3. Check redis để biết số lượng request:
![](https://images.viblo.asia/9b8d2474-58c1-4161-a7b3-fb773557ee16.png)
=> Key được *store* với *ratelimit* là *golang-demo:::1*, *golang-demo:* là prefix để phân biệt với các key store, phần phía sau là ip.
    local thì ip là ::1 khi lên môi trường dev hoặc production thì sẽ có client ip khác. 

* **Source Code** 
link: https://github.com/ducnpdev/golang-demo
        https://www.cloudflare.com/learning/bots/what-is-rate-limiting/

Tks anh,em: https://t.me/OpenDevGolang join group này nếu anh em có câu hỏi.