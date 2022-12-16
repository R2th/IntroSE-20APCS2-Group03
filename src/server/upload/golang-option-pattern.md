# Lời tựa
Xin chào, lại gặp các bạn ở đây. Hôm nay sẽ là option pattern. Chúng ta sẽ dùng nó để constructor struct một cách thật flexible và professional nhé. 🤗🤗
# Bài toán
Giả sử chúng ta đang có 1 user service. service này sẽ connect đến user repo để lấy user infor từ bảng user.  <br>
(Để tiện theo dõi Thống sẽ bỏ full code ở đây - https://go.dev/play/p/AFcS-N2KwiV và sẽ chỉ điểm mặt những ý chính) <br>
Inject user repo to service  
```
func NewUserService(userRepo UserRepo) *userService {
	return &userService{userRepo: userRepo}
}
// main.go
func main() {
	r := NewUserRepo()
	s := NewUserService(r)
	s.GetUserById("BangThong")
	fmt.Println("sorry not found your user ...")
}
```
Một ngày nọ, client của Thống muốn lấy thêm thông tin xx của user từ bảng xx.  <br>
Như một thói quen, Thống nói Thống không có thời gian nhưng vẩn âm thầm implement 1  XXRepo như sau 😀😁:
```
type XXRepo interface {
	GetXXOfUser(string) (*[]XX, error)
}
``` 
 Và inject XXRepo to user service : 
```
func NewUserService(userRepo UserRepo, xxRepo XXRepo) *userService { // changed
	return &userService{userRepo: userRepo, xxRepo: xxRepo}
}
func main() {
	r := NewUserRepo()
	x := NewXXRepo()
	s := NewUserService(r, x) // changed
}
```
Yup. Vấn đề là ở đây , cứ mổi khi muốn inject 1 repo mới, Thống sẽ phải change constructor function và caller của constructor function. **Vậy có cách nào để limit những thay đổi  nhưng vẫn inject được xxRepo hay không**?  .  <br> 
(Tất nhiên ở đây, nếu chúng ta quyết định "get XX infor từ user repo" or "add new constructor - NewUserServiceXX" or  "có sẳn một framework depency injection"  thì không còn là vấn đề nữa.  <br>
Existing code ko bị thay đổi và có thể bạn cũng ko cần đọc phần sau nữa 🤣🤣 )
# Áp dụng option pattern 
```
type Option func(*userService)

func WithUserRepo(repo UserRepo) func(*userService) {
	return func(u *userService) {
		u.userRepo = userRepo
	}
}

func WithRoleRepo(repo XXRepo) func(*userService) {
	return func(u *userService) {
		u.xxRepo = repo 
	}
} 
func NewUserService(opts ...Option) *userService {

	s := &userService{}

	// Loop through each option
	for _, opt := range opts {
		opt(h)
	}

	return s
}
//main.go
func main() {
	r := NewUserRepo()
	x := NewXXRepo()
	s := NewUserService(WithUserRepo(r), WithRoleRepo(x))
	s.GetXXOfUser("Bang Thong")
}
```
Đơn giản đúng không ? Mình đi tiếp phần sau nhé. Ah mình đùa đấy 😂😂. <br> 
Constructor struct là "**action**" set (instance of struct).property = input value. Option pattern sẽ pass những **action** vào constructor function và tiến hành apply **action** đó.   <br>
Tương tư để inject thêm những repo khác, ta cứ define thêm 1 function mới và include nó ở caller. 
```
func WithAnotherRepo(repo AnotherRepo) func(*userService) {
	return func(u *userService) {
		u.anotherRepo = repo 
	}
} 
s := NewUserService(WithUserRepo(r), WithRoleRepo(x), WithAnotherRepo(anotherRepo))
```

# Vài lời sau cuối
Vài phút trôi qua, ban đã có thêm 1 cách để constructor struct rồi đúng không ? Tất nhiên cái gì cũng có mặt lơi và hại của nó. Chúng ta không nên rập khuôn apply pattern này cho mọi trường hợp. Như Thống , Thống rất thích câu quotes này. 
![](https://images.viblo.asia/16270358-5f9b-4d8e-b01e-b7d25ce8f7d9.jpg)
- Ah yeah, 1 vài go library cũng đang xài pattern này như go-kit. https://pkg.go.dev/github.com/go-kit/log/level 
- reference: https://www.sohamkamani.com/golang/options-pattern/
- full code with option pattern : https://go.dev/play/p/HKkdQdBnFNF
- **nếu thay hay cho Thống 1 like nhé**