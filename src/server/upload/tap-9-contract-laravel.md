Rất vui được gặp lại tất cả các bạn. Trong ngày hôm nay, chúng ta sẽ nói về một khái niệm cấu trúc nữa trong Laravel, đó chính là "Contract". Đây là một thuật ngữ trong Laravel, nhưng sẽ không khó hình dung cho lắm. Mình sẽ cố gắng giải thích một cách gần gũi để giúp các bạn có thể tiếp thu được nội dung trong tập này.

> **Khuyến cáo:** Đây là một trong những phần Laravel nâng cao, chính vì thế sẽ gây khó hiểu, mất nghị lực, quyết tâm khi học. Mình khuyên bạn hãy đọc một lần, nếu thấy không thể tiếp thu thì có thể bỏ qua.  

# I. Giới thiệu (Introduction)
Về nghĩa thuần túy, "Contract" tạm dịch là "hợp đồng", cũng như bao khái niệm cấu trúc khác, vừa nghe xong chẳng hiểu nó liên quan gì đến code cả. Nói về bản chất thì "Contract" này đại diện cho các interface hoặc abstract class. Theo Laravel docs, Laravel contract là interface xác định các dịch vụ cốt lõi cung cấp bởi framework. Chẳng hạn như là contract `Illuminate\Contracts\Mail\Mailer` sẽ định nghĩa các phương thức cần cho việc gửi mail...

Mỗi contract có cách triển khai tương ứng, hiểu đơn giản các contract trong Laravel như những package tích hợp vào ứng dụng của bạn. 

# II. Contract Vs. Facade
Như chúng ta đã biết, các facade cung cấp những cú pháp nhanh gọn, dễ nhớ để resolve các service mà không cần phải type-hint để inject dependency gì cả. Nhưng đối với contract thì chúng ta phải làm điều ngược lại. Tức là để có thể resolve các service từ container khi sử dụng các contract, coder phải thực hiện thao tác inject thủ công trong các phương thức khởi tạo. Tuy là không nhanh gọn như facade nhưng đối với contract ta có thể tránh được các nguy hiểm tiểm ẩn khi sử dụng facade, dễ dàng kiểm soát phạm vi của các lớp. 

> Về hiệu năng thì ứng dụng của bạn vẫn không khác biệt khi sử dụng facade hoặc là contract. Tuy nhiên sau này nếu bạn có viết package riêng thì nên suy nghĩ về việc sử dụng contract bởi tính rõ ràng, dễ dàng hơn khi làm việc trong môi trường package. 


# III. Khi nào sử dụng contract? (When to use contract?)
Theo như ở trên, thì việc sử dụng contract phần lớn phụ thuộc vào sở thích hoặc xu hướng làm việc của cá nhân hay nhóm. Việc sử dụng facade hay contract không tạo ra sự khác biệt quá lớn cho ứng dụng. Dưới đây là một trường hợp ví dụ cho việc sử dụng contract hiểu quả.

Chẳng hạn, mình có một class `Repository` có chức năng như một nhà kho lưu trữ cache. Ban đầu thì mình sử dụng một package memcached cho việc tương tác với cache.

```PHP
<?php

class Repository
{
    protected $cache;
    
    public function __construct(\SomePackage\Cache\Memcached $cache)
    {
        $this->cache = $cache;
    }
    
    //
}
```

Được vài hôm thì mình thấy package redis làm việc tốt hơn chẳng hạn, mình muốn thay thế nó. Nhưng lúc trước ta đã code những method xử lý theo memcached rồi, giờ mà thay đổi thì rất mất thời gian và dễ xảy ra lỗi.

Đây chính là đất cho Laravel contract "dụng võ". Ban đầu thay vì bạn inject một package nào đó và code theo nó thì bạn hãy sử dụng interface cache contract do framework cung cấp. Việc này giúp bạn dễ dàng tùy biến sau này nếu muốn thay đổi package.

```PHP
<?php

use Illuminate\Contracts\Cache\Repository as Cache;

class Repository
{
    protected $cache;
    
    public function __construct(Cache $cache)
    {
        $this->cache = $cache;
    }
    
    //
}
```

Việc của chúng ta bây giờ đơn giản hơn rồi, bạn chỉ cần cấu hình trong file `config/cache.php` là có thể thay đổi driver lưu trữ.

Ngoài ra bạn có thể mở file `vendor/laravel/framework/src/Illuminate/Contracts/Cache/Repository.php` sẽ thấy Laravel đã định nghĩa rất nhiều method có sẵn để ta tiện lợi trong việc test cũng như code nhanh hơn.

> Chính vì sử dụng những contract cung cấp bởi framework, nó sẽ giúp cho code bạn dễ hiểu hơn, dễ xác định chức năng của một service nhất định. 

# IV. Cách sử dụng contract (How to use contract)
Chắc hẳn các bạn đã biết cách sử dụng contract luôn rồi dù cho mình không hướng dẫn đi chăng nữa. Vì nó chẳng khác gì việc type-hint các dependency trong các method vậy.

Mình sẽ lấy ví dụ ở trên để dẫn chứng luôn:
```PHP
<?php

use Illuminate\Contracts\Cache\Repository as Cache;

class Repository
{
    protected $cache;
    
    public function __construct(Cache $cache)
    {
        $this->cache = $cache;
    }
    
    //
}
```

Để có thể gọi contract `Cache` ta chỉ việc viết type-hint ở method `__construct` của lớp, quá dễ dàng và quen thuộc phải không nào :v
# V. Tham khảo thêm các contract (Contract Reference)
Bạn có thể tìm hiểu thêm các contract do Laravel cung cấp tại [đây](https://laravel.com/docs/5.8/contracts#contract-reference).

----

Cảm ơn các bạn đã quan tâm theo dõi. Cùng đồng hành với mình qua những tập tiếp theo tại series "[Hành trình chinh phục Laravel Framework](https://viblo.asia/s/hanh-trinh-chinh-phuc-laravel-framework-nB5pXJDG5PG)" nhé! Chúc may mắn và hẹn gặp lại.

> Mình đang xây dựng blog riêng là [lechihuy.dev ](https://lechihuy.dev), mong các bạn ghé sang ủng hộ, mình cảm ơn rất nhiều ạ