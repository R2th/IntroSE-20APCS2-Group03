Hi mọi người

M đã đọc được 1 bài viết của 1 bạn viết bài count view increase, nhưng có nhiều bạn đặt ra câu hỏi xung quanh vấn đề này là nếu người dùng thế này, người dùng thế kia thì sao mà chính xác được.

thì m cũng có lên mạng search và test cho website mình thì m thấy ok, không ghi nguồn nhé mn vì không nhớ, và đã áp dụng vào website m luôn. Cái này thì khắc phục được view ảo là F5 nhưng họ vẫn có  cách để tăng view ảo bằng cách đóng trình duyệt và click vào link.

Cho nên nếu áp dụng cả 2 thì có thể sẽ triệt để được vấn đề này nhưng bài này thì m chưa code nhé.

Thôi lan man quá, giờ m show code ra để mn cùng xem nhé.
```php
        $sessionKey = 'post_' . $id;

        $sessionView = Session::get($sessionKey);
        $post = Post::findOrFail($id);
        if (!$sessionView) { //nếu chưa có session
            Session::put($sessionKey, 1); //set giá trị cho session
            $post->increment('post_view');
        }
```

Trong này m để phần view là **post_view, id** của bài viết. Vậy là sẽ triệt để được vấn đề F5 trình duyệt, còn tắt trình duyệt và vào link đó thì có thể set thêm thời gian, m không test vì website m chỉ cần dùng session là ok rồi.

Nói dài dòng vậy thôi, đoạn code trên các bạn đặt vào trong controller các bạn nhé.

Website m test [đây nhé](http://panchef.top)

Have fun!