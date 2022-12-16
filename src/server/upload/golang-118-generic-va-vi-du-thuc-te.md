# Golang và Generics

Như các bạn cũng đã biết, **Golang** vừa cho ra mắt phiên bản mới v1.18 (https://go.dev/blog/go1.18, https://tip.golang.org/doc/go1.18), đây là phiên bản cập nhật được cho là "lớn nhất chưa từng có" (https://thenewstack.io/go-1-18-the-programming-languages-biggest-release-yet/)

Một trong những tính năng nổi bật của phiên bản này là **Generics** (https://go.dev/blog/why-generics, https://go.dev/doc/tutorial/generics).

## Ví dụ

### Trước khi dùng generic 

Mình xin đưa một ví dụ thực tế nhanh và dễ hiểu nhất của việc ứng dụng generic trong lập trình với ngôn ngữ Golang,
Trước đây, để lưu thông tin vào `context` mình thường viết các util func kiểu như là:

```go
func GetToken(ctx context.Context) string {
	return ctx.Value(ctxkey.Token).(string)
}

func SetToken(ctx context.Context, token string) context.Context {
	return context.WithValue(ctx, ctxkey.Token, token)
}
```

```go
func GetUser(ctx context.Context) *usertype.UserModel {
	return ctx.Value(ctxkey.User).(*usertype.UserModel)
}

func SetUser(ctx context.Context, user *usertype.UserModel) context.Context {
	return context.WithValue(ctx, ctxkey.CtxKeyUser, user)
}
```

```go
func GetUserID(ctx context.Context) *uuid.UUID {
	return ctx.Value(ctxkey.UserID).(*uuid.UUID)
}

func SetUserID(ctx context.Context, userID *uuid.UUID) context.Context {
	return context.WithValue(ctx, ctxkey.UserID, userID)
}
```

### Sau khi dùng generic

Các func trên bây giờ được thay thế bằng generic chỉ với 2 func gọn nhẹ:

```go
func Get[K any](ctx context.Context, key string) K {
	return ctx.Value(key).(K)
}

func Set[K any](ctx context.Context, key string, value K) context.Context {
	return context.WithValue(ctx, key, value)
}
```

#### Sử dụng

```go
ctxutil.Set[string](ctx, ctxkey.Token, "abc")
token := ctxutil.Get[string](ctx, ctxkey.Token)
```

## Generic với compare func

### Before

```go
func StrContains(arr []string, str string) bool {
	for _, a := range arr {
		if a == str {
			return true
		}
	}
	return false
}
```

```go
func Uint64Contains(arr []uint64, str uint64) bool {
	for _, a := range arr {
		if a == str {
			return true
		}
	}
	return false
}
```

### After

Với compare func thì phải sử dụng type là `comparable` chứ không phải `any`.

```go
func Contains[T comparable](arr []T, str T) bool {
	for _, a := range arr {
		if a == str {
			return true
		}
	}
	return false
}
```

## Generic struct

```go
type Response[T any] struct {
    Data []T
}
```