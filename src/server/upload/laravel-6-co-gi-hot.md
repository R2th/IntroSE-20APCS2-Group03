<div align="center">

# Lời mở đầu
    
</div>

Thực ra thì cũng không có gì để trình bày nhiều cả, chỉ là sáng mở mắt ra thấy Laravel release bản 6.0 rồi nên cũng lên hóng hớt xem nó có gì hay không rồi chia sẻ với mọi người. Có gì không phải mọi người bỏ quá cho nhé, đừng downvote tội nghiệp :( :( :( 

<div align="center">

# Nội dung
    
</div>

Nói qua một chút thì **phiên bản 6.0** này sẽ là bản **LTS** (Long Term Support) tức là phiên bản hỗ trợ dài hạn, theo như thông báo là sẽ hỗ trợ fix bug cho đến tận 03/09/2021 và fix security cho đến 03/09/2022. Nếu các bạn còn nhớ thì phiên bản LTS gần nhất của Laravel là **phiên bản 5.5**, hãy cùng xem qua thời gian release các phiên bản Laravel gần đây nhé:


| Version | Release | Bug Fixes Until |Security Fixes Until|
| -------- | -------- | -------- |--------|
| **5.5 (LTS)**     | 30/08/2017     | 30/08/2019    | 30/08/2020|
| 5.6     | 07/02/2018    | 	07/08/2018     | 	07/02/2019|
| 5.7     | 04/09/2018     | 04/03/2019    | 04/09/2019|
| 5.8     | 26/02/2019    | 26/08/2019     | 	26/02/2020|
| **6.0 (LTS)**    | 03/09/2019     |03/09/2021    | 03/09/2022|

- Chắc mọi người ai cũng biết đến cách đánh phiên bản cập nhật XX.xx.xxx rồi đúng không? Nó có tên là [Semantic Versioning](https://semver.org/), bao gồm các quy tắc đặt tên cho từng bản update, release. 
- Và việc chuyển từ phiên bản **5.8** lên **6.0** tức là Laravel đã có thay đổi không nhỏ. Hãy cùng điểm qua một số thay đổi nổi bật của Laravel 6.0 trong bài viết này nhé!

<div align="center">

### Cải thiện Exceptions sử dụng [Ignition](https://github.com/facade/ignition)

</div>

Ignition là một open source mới, giúp hiển thị trang chi tiết exception của hai tác giả Freek Van der Herten and Marcel Pociot. Nó đem lại nhiều tiện ích hơn so với các phiên bản trước, ví dụ như việc cải thiện lỗi file Blade, xử lí số dòng lỗi cũng như là cải thiện thêm về UX, ...

![](https://images.viblo.asia/662f67bd-0afd-444e-a74e-af21de7f300a.png)

<div align="center">

### Cải thiện responses khi xác thực người dùng:

</div>

- Trong các phiên bản trước, khá khó để trả về cho người dùng một thông báo tùy chỉnh. Vì vậy rất khó để giải thích cho người dùng biết chính xác vì sao request của họ bị từ chối. Và từ Laravel 6.0, mọi thứ sẽ dễ dàng hơn với respons message và method `Gate::inspect`

    ```php
    /**
     * Determine if the user can view the given flight.
     *
     * @param  \App\User  $user
     * @param  \App\Flight  $flight
     * @return mixed
     */
    public function view(User $user, Flight $flight)
    {
        return $this->deny('Custom message');
    }
    ```

- Sử dụng `Gate::inspect`
    ```php
    $response = Gate::inspect('view', $flight);

    if ($response->allowed()) {
        // User is authorized to view the flight...
    }

    if ($response->denied()) {
        echo $response->message();
    }
    ```
- Những thông báo tùy chỉnh này sẽ được tự động trả về bên phía frontend khi sử dụng methods `$this->authorize` hoặc `Gate::authorize` ở trong routes hoặc controllers.


<div align="center">

### Lazy Collections

</div>

Chắc hẳn các developer làm việc với Laravel đều đã biết và sử dụng Collection của Laravel rồi đúng không? Và ở phiên bản Laravel 6.0, Lazy Collections được ra mắt nhằm hỗ trợ các developer làm việc với tập dữ liệu rất lớn nhưng lại tiêu tốn ít tài nguyên hơn.

Nói một cách đơn giản, thay vì phải load toàn bộ dữ liệu như trong Collection cũ thì lazy collections sẽ chia nhỏ ra thành các phần và lưu trữ trong trong bộ nhớ tại một thời điểm nhất định, như vậy ta có thể giảm thiểu được bộ nhớ cần sử dụng. Ví dụ khi bạn cần làm việc với Collection gồm 10000 bản ghi, nếu sử dụng cách truyền thống thì cả 10000 bản ghi sẽ được load một lúc, với lazy collections, điều đó sẽ không xảy ra.

- Để sử dụng lazy collections, bạn sẽ sử dụng method `cursor` như sau: 

    ```php
    // không sử dụng lazy collection
    $users = App\User::all()->filter(function ($user) {
        return $user->id > 500;
    });

    // sử dụng lazy collection
    $users = App\User::cursor()->filter(function ($user) {
        return $user->id > 500;
    });

    foreach ($users as $user) {
        echo $user->id;
    }
    ```

<div align="center">

### Cải tiến về các câu truy vấn con (Subquery)

</div>

- Ví dụ bài toán: Chúng ta có 2 bảng trong CSDL là chuyến bay (**flights**) và đích đến (**destinations**), trong bảng chuyến bay sẽ có trường `arrived_at` chứa thời điểm máy bay hạ cánh.
- Bạn muốn lấy ra danh sách các đích đến và tên chuyến bay cuối cùng hạ cánh xuống đó, bạn chỉ cần thực hiện câu truy vấn sau

    ```php
    return Destination::addSelect(['last_flight' => Flight::select('name')
        ->whereColumn('destination_id', 'destinations.id')
        ->orderBy('arrived_at', 'desc')
        ->limit(1)
    ])->get();
    ```

- Ngoài ra, nếu bạn muốn sắp xếp các đích đến theo thứ tự thời gian chuyến bay cuối cùng hạ cánh xuống đó (sort theo trường `arrived_at` ở bảng **flights**), cú pháp sử dụng subquery cũng rất đơn giản
    ```php
    return Destination::orderByDesc(
        Flight::select('arrived_at')
            ->whereColumn('destination_id', 'destinations.id')
            ->orderBy('arrived_at', 'desc')
            ->limit(1)
    )->get();
    ```

<div align="center">

### ...

</div>


<div align="center">

# Lời kết
    
</div>

Bài viết này chỉ mang tính chất tổng hợp, liệt kê một số cập nhật, thay đổi của Laravel phiên bản 6.0 cho mọi người biết thôi. Còn muốn tìm hiểu sâu hơn, các bạn hãy vào trang [document](https://laravel.com/docs/6.0) cũng như là [github](https://github.com/laravel/laravel) để tìm hiểu nhé.

<div align="center">

# Tài liệu tham khảo
    
</div>

- https://laravel-news.com/laravel-6
- New notes: https://laravel.com/docs/6.0/releases