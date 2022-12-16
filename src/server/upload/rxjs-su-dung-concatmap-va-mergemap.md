Khi làm việc với RxJS có 2 operators mình sử dụng khá thường xuyên khi cần xử lý nhiều luồng dữ liệu (stream).  
Bài viết này mình sẽ chia sẻ cách sử dụng 2 operators `concatMap` và `mergeMap`.

#### ConcatMap

`concatMap` thường được sử dụng khi chúng ta muốn xử lý dữ liệu theo thứ tự.  
Giả sử bạn cần làm tính năng tự động lưu nội dung form (textarea để nhập nội dung).  
Sử dụng `concatMap` có thể làm như sau:

```
const postId = 1;

this.form.valueChanges.pipe(
    concatMap(formData => {
        return this.http.put('/post/${postId}', formData)
    })
    .subscribe(
        result => console.log('Saved!')
    )
)
```

Ở ví dụ trên mỗi khi nội dung textarea thay đổi,
chúng ta sẽ thực hiện gửi 1 http request (`PUT` request) lên server.  
**Và chỉ thực hiện gửi request tiếp theo khi request trước đó đã hoàn thành.**  
**Điều này sẽ đảm bảo dữ liệu được lưu trong database luôn là dữ liệu mới nhất**.



#### MergeMap

`mergeMap` thường được sử dụng khi chúng ta muốn xử lý các data đồng thời.  
Như ở ví dụ trên, nếu chúng ta thay `concatMap` bởi `mergeMap`,
request tiếp theo có thể sẽ được gửi trước khi request trước đó hoàn thành,
và như vậy có thể dẫn đến trường hợp dữ liệu được lưu trên database  
không phải là dữ liệu mới nhất của form.

Hãy thử một ví dụ với `mergeMap`.  
Lần này bạn cần build vote app. Mỗi lần click vào button Vote sẽ gửi 1 `POST` request
lên server và +1 cho vote.  
Vì mỗi request sẽ tăng 1 vote. Request sau không cần đợi request trước đó hoàn thành
nên có thể gửi các request đồng thời.

```
const btn = document.querySelector('#btn')

fromEvent(btn, 'click')
    .pipe(
        mergeMap(() => return this.http.post('/vote'))
    )
    .subscribe(
        result => console.log(result)
    )
```

#### Kết luận:

Khi chỉ có 1 stream, `map` có lẽ là operator duy nhất bạn cần.  
Tuy nhiên khi có nhiều stream, sử dụng `concatMap` và `mergeMap` sẽ giúp việc xử lý data trở nên đơn giản hơn.