Reactive Programming sử dụng khái niệm stream để tương tác với data. Trong điều kiện lý tưởng, stream luôn trả lại data và không xảy ra lỗi, khi đó stream có thể vẫn tồn tại hoặc `complete()` và kết thúc. Tuy nhiên, nếu xảy ra lỗi thì stream cũng sẽ tự động kết thúc, khi đó user có thể không tương tác gì được với application và phải restart lại toàn bộ nếu không có cơ chế `retry`.

Sau đây là một số cách có thể sử dụng để khắc phục vấn đề này.

---

### 1. catchError().
catchError() sẽ được gọi khi stream xảy ra lỗi và luôn trả về một Observable mới. Ý tưởng chính ở đây là khi stream này lỗi thì dùng stream khác.

```typescript
$stream.pipe(
    ...
    catchError(() => {
        ...
        return newStream$;
    })
)
```
Khi `stream$` xảy ra lỗi, nó sẽ gọi đến operator catchError() và trả lại `newStream$`. Lúc này `stream$`đã ngừng hoạt động và được thay thế bằng `newStream$`.

### 2. onErrorResumeNext().
Tương tự như `catchError()`, thua keo này ta bày keo khác, đổi stream!
```typescript
onErrorResumeNext(
  failStream$,
  fineStream$
)
```

### 3. retry() / retryWhen().
Một lần không được, chắc gì lần 2 lần 3 đã không được. Đẹp trai không bằng chai mặt, thử đi thử lại.
```typescript
stream$.pipe(
    retryWhen(error$ => error$.pipe(
        switchMap((error, i) => {
            if (i > 2) {
                return throwError(error);
            }
            return timer(1000);
        }),
    )),);
```

---
Trên đây là một số cách có thể áp dụng khi stream bị lỗi. Nguồn tham khảo:

- https://blog.angular-university.io/rxjs-error-handling/
- https://medium.com/@kddsky/error-handling-in-rxjs-bac0f96a7def