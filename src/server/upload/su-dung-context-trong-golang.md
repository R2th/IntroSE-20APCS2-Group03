Bài viết trước mình đã hướng dẫn cách viết middleware trong golang.
Ở bài viết này chúng ta sẽ sử dụng 1 package của golang `context`.

context package thường được sử dụng khá nhiều trong các service API.

```
type Context interface {
    // Deadline returns the time when work done
    // on behalf of this context should be canceled.
    Deadline() (deadline time.Time, ok bool)

    // Done returns a channel that's closed when work done 
    // on behalf of this context should be canceled.
    Done() <-chan struct{}

    // Err returns a non-nil error value after Done is closed.
    Err() error

    // Value returns the value associated with this context for key
    Value(key interface{}) interface{}
}
```

Dưới đây là 1 ví dụ sử dụng context để share value giữa các middleware.

```
func authMiddleware(h http.Handler) http.Handler {
    fn := func(w http.ResponseWriter, r *http.Request) {
        authToken := r.Header().Get("Authorization")
        user, err := getUser(authToken)

        if err != nil {
          http.Error(w, http.StatusText(401), 401)
          return
        }

        ctx := r.Context()
        context.WithValue(ctx, "user", user)
        r = r.WithContext(ctx)
        next.ServeHTTP(w, r)
     }
     
     return http.HandlerFunc(fn)
}

func index(w http.ResponseWriter, r *http.Request) {
  // Bởi vì data get từ context có type interface{} 
  // nên cần phải sử dụng type assertion
  user := r.Context().Value("user").(*User)
  // do something
}
```