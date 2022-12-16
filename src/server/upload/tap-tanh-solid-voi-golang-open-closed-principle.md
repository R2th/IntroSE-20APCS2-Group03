### Lời mở đầu:
Để trở thành một *Senior Developer*, chắc hẳn mỗi chúng ta sẽ cần nắm vững một vài **Principle**. Đối với tôi, một thứ giúp tôi nâng tầm được bản thân trong năm qua đó là việc học và áp dụng **SOLID** Principle với ngôn ngữ Golang. Chính vì thế, hôm nay tôi muốn chia sẻ những gì mà mình đã tìm hiểu và thực hành Principle này với hi vọng sẽ giúp mọi người có thêm một góc nhìn về **SOLID**.

Hôm nay chúng ta sẽ cùng nhau tìm hiểu về chữ **O** trong **SOLID Principle**. Trong công việc hằng ngày, đôi khi chúng ta đã vô tình lướt qua nhau, đôi khi mình đã áp dụng **Open/Closed Principle** nhưng chúng ta lại không hề hay biết. Đó chính là design parttern Strategy. Tuy nhiên, Strategy cũng chỉ là một thể hiện của **OCP** (*Open/Closed Principle*).

Không để mọi người phải đợi lâu nữa. Chúng ta sẽ đi vào những luận điểm để hiểu rõ hơn về nguyên tắc này nhé:

### Khi chúng ta không tuân thủ Open/Closed Principle:
Để hiểu về định nghĩa cụ thể của **OCP** các bạn có thể truy cập [vào đây](http://blog.cleancoder.com/uncle-bob/2014/05/12/TheOpenClosedPrinciple.html) để tìm hiểu chi tiết. Chắc hẳn ở đây chúng ta đều rất đau đầu mỗi khi nhận yêu cầu mới của khách hàng hoặc những **CR** (change request) ảnh hưởng rất nhiều đến hệ thống hiện tại. Vậy làm cách nào để có thể thêm tính năng mới mà lại không ảnh hưởng hoặc không cần sửa đổi hoặc có cách nào để mở rộng nó mà không thay đổi chính nó không? Nghe có vẻ rất mâu thuẫn, nhưng hãy cùng xem ví dụ dưới đây để có cái nhìn về giả thuyết này nhé:

```go
import (
	"net/http"

	"github.com/ahmetb/go-linq"
	"github.com/gin-gonic/gin"
)

type PermissionChecker struct {
	//
	// some fields
	//
}

func (c *PermissionChecker) HasPermission(ctx *gin.Context, name string) bool {
	var permissions []string
	switch ctx.GetString("authType") {
	case "jwt":
		permissions = c.extractPermissionsFromJwt(ctx.Request.Header)
	case "basic":
		permissions = c.getPermissionsForBasicAuth(ctx.Request.Header)
	case "applicationKey":
		permissions = c.getPermissionsForApplicationKey(ctx.Query("applicationKey"))
	}

	var result []string
	linq.From(permissions).
		Where(func(permission interface{}) bool {
			return permission.(string) == name
		}).ToSlice(&result)

	return len(result) > 0
}

func (c *PermissionChecker) getPermissionsForApplicationKey(key string) []string {
	var result []string
	//
	// extract JWT from the request header
	//
	return result
}

func (c *PermissionChecker) getPermissionsForBasicAuth(h http.Header) []string {
	var result []string
	//
	// extract JWT from the request header
	//
	return result
}

func (c *PermissionChecker) extractPermissionsFromJwt(h http.Header) []string {
	var result []string
	//
	// extract JWT from the request header
	//
	return result
}
```
Các bạn sẽ thấy `PermissionChecker` Nó kiểm tra xem có quyền truy cập một số tài nguyên, phụ thuộc vào `context` của application do package Gin cung cấp. Ở đây, chúng ta có phương thức `HasPermission`, nó sẽ kiểm tra quyền với tên cụ thể được liên kết với dữ liệu bên trong `context`. Việc truy xuất quyền từ `context` sẽ có thể khác nhau tuỳ thuộc vào việc người dùng sẽ lựa chọn phương thức xác thực gì (có thể sẽ là `JWT Token`, `Basic Auth` hay  `API key`), và trong chương trình của chúng ta cần xử lý tất cả những phần đó để có thể trích xuất được dữ liệu do client gửi tới.  Nếu các bạn chú ý tới **SRP** (Single Responsibility Principle), `PermissionChecker` sẽ chịu trách nhiệm quyết định xem có được sự cho phép truy cập hay không và nó không ảnh hưởng gì tới `context`. 

Giả sử chúng ta muốn mở rộng logic của uỷ quyền và thêm một số luồng mới, chẳng hạn như lưu trữ dữ liệu người dùng trong session hoặc sử dụng [Digest Authorization](https://httpwg.org/specs/rfc7616.html). Trong trường hợp này, chúng ta sẽ cần phải sửa logic bên trong `PermissionChecker`. Việc sửa đổi logic đó có thể xảy ra một vài vấn đề như sau:

* `PermissionChecker` giữ logic được xử lý ban đầu ở một nơi nào đó khác.
* Bất kỳ sự điều chỉnh nào của logic ủy quyền , nơi mà có thể ở một module khác, đều yêu cầu sự sửa đổi trong ` PermissionChecker`.
* Để thêm một cách trích xuất ủy quyền mới, chúng ta luôn cần sửa đổi `PermissionChecker`.
* Logic bên trong ` PermissionChecker` chắc chắn sẽ thay nổi với một luồng ủy quyền mới.
* Unit testing cho `PermissionChecker` sẽ bao gồm nhiều chi tiết kỹ thuật về trích xuất khác nhau của permission.

**Và một lần nữa chúng ta cần phải cấu trúc lại.** Bây giờ chúng ta sẽ cùng nhau học cách tuân thủ **OCP**

### Khi chúng ta tuân thủ Open/Closed Principle:

**OCP** chỉ đơn giản chỉ ra cho chúng ta rằng cấu trúc phần mềm nên được mở để mở rộng nhưng đóng để sửa đổi. Với suy nghĩ như vậy, chúng ta có thể đưa ra một số hướng có thể cho code của chúng ta tuân thủ theo **OCP**. Đoạn mã code đó phải cung cấp một thứ gì đó để cho phép tiện ích mở rộng tới từ bên ngoài. Trong **OOP**, chúng được hỗ trợ mở rộng bằng cách sử dụng các cách triển khai khác nhau cho cùng một interface. Nói cách khác là chúng ta sử dụng *Polymorphism*.

```go
type PermissionProvider interface {
	Type() string
	GetPermissions(ctx *gin.Context) []string
}

type PermissionChecker struct {
	providers []PermissionProvider
	//
	// some fields
	//
}

func (c *PermissionChecker) HasPermission(ctx *gin.Context, name string) bool {
	var permissions []string
	for _, provider := range c.providers {
		if ctx.GetString("authType") != provider.Type() {
			continue
		}

		permissions = provider.GetPermissions(ctx)
		break
	}

	var result []string
	linq.From(permissions).
		Where(func(permission interface{}) bool {
			return permission.(string) == name
		}).ToSlice(&result)

	return len(result) > 0
}
```
Trong đoạn code mẫu bên trên, chúng ta sẽ thấy xuất hiện thêm một interface `PermissionProvider`, nó sẽ giúp chúng ta tuân thủ **OCP**. Việc sửa lại `PermissionChecker` không ẩn đi phần thông tin trích xuất từ `context`. Thay vào đó, chúng ta tạo ra một interface mới. Cấu trúc này đại diện cho từng trích xuất logic khác nhau, ví dụ như: `JWTPermissionProvider` hoặc `APIKeyPermissionProvider` hay thậm chí là `AuthBasicPermissionProvider`. Mục đích chính của chúng ta, để mở rộng `PermisionChecker` mà không cần sửa đổi nó và như các bạn thấy đó bây giờ nó đã đáp ứng được yêu cầu mà chúng ta kỳ vọng.

**Một ví dụ khác** có thể giúp các bạn loại bỏ phần bên trong của `PermissionProvider` từ `PermissionChecker`.

```go
type PermissionProvider interface {
	Type() string
	GetPermissions(ctx *gin.Context) []string
}

type PermissionChecker struct {
	//
	// some fields
	//
}

func (c *PermissionChecker) HasPermission(ctx *gin.Context, provider PermissionProvider, name string) bool {
	permissions := provider.GetPermissions(ctx)

	var result []string
	linq.From(permissions).
		Where(func(permission interface{}) bool {
			return permission.(string) == name
		}).ToSlice(&result)

	return len(result) > 0
}
```

Cá nhân tôi thích cách tiếp cận đầu tiên hơn. Tuy nhiên, cách tiếp cận thứ hai cũng hoàn toàn không vấn đề gì. Phụ thuộc vào từng bài toán cụ thể, các bạn có thể lựa chọn một cách tiếp cận phù hợp.

### Tóm lại:
**Open/Closed Principle** là nguyên tắc thứ hai trong **SOLID**. Nó muốn gửi đến nhưng người lập trình viên chúng ta một thông điệp, hãy luôn luôn mở rộng cấu trúc code mà không thực sự sửa đổi chúng. Rất trừu tượng phải không các bạn, hi vọng với bài chia sẻ này của mình, các bạn sẽ có thêm một cái nhìn về các nguyên tắc để áp dụng và thực hành nhuần nhuyễn trong dự án của mình. Cảm ơn mọi người đã đọc bài của mình.