Hi mọi người!
m tự học **Laravel** và nghĩ ra 1 cái khá hay là nén ảnh trực tiếp trong thư mục khi bạn sử dụng Ckfinder hoặc TinyCME để up ảnh
Trước m lên diễn đàn Free Tuts gì đó hỏi nhưng ông chủ kênh thì nói cái này khó rồi này nọ, ghét cái thái độ (hơi nói xấu nhưng lỡ nói thì nói luôn)
M hướng dẫn các bạn làm bằng cách đơn giản k tưởng.
Rồi vào việc nhé!
**Đầu tiên** là các bạn add và gọi hàm TinyPNG vào project nhé, bạn tìm hiểu trên trang của nó luôn nhé.
**Tiếp đến** bạn phải xác định được thư mục mà TinyCME upload ảnh *(bạn có thể thiết lập để nó nằm trong 1 thực mục bạn muốn)*
Sau đó bạn gọi toàn bộ ảnh trong thư mục đó ra bằng cú pháp PHP
$files = File::files(public_path('/image/1/'));
Sau đó các bạn lấy tên của file ảnh thôi nhé bằng cú pháp lặp mảng

foreach ($files as $file) {
    $images[] = $file->getRelativePathname();
};

ở đây vì m check và add nó vào database luôn, vì ảnh quá nhiều mà nén lại thì hết phần free của TinyPNG, nghĩa là nếu đã nén rồi thì k nén lại nữa để tiết kiệm lượt nén
        
        $TinyCME_image = Image_TinyCME::select('image_TinyCME_name')->get()->toArray();
        foreach($TinyCME_image as $value => $key){
            $images_array_check[] = $key['image_TinyCME_name'];
        }
        
        $count = count($images);
        for ($i=0; $i < $count; $i++) {
        
            // Kiểm tra ảnh này có trong database chưa?
            // Nếu chưa thì update trong database và nén online
            if(!in_array($images[$i], $images_array_check, false)){
                $TinyCME = new Image_TinyCME;
                $TinyCME->image_TinyCME_name   = $images[$i];
                $TinyCME->image_TinyCME_status = 1;

                $TinyCME->save();
                $path6 = 'public/image/1'.'/'.$images[$i];
                $fp = fopen($path6, "rb");
                

                $source = \Tinify\fromFile($path6);
                $source->toFile($path6);
            }

            
            
        }
        
Câu lệnh trên ý nghĩa là đếm số lượng ảnh trong thư mục, và check ảnh đó tồn tại trong dữ liệu chưa?
Nếu có rồi thì bỏ qua k nén, còn chưa có thì nén và store ảnh đó vào database,
À quên bạn tạo 1 table cho nó nhé.

m đã test trên local và đã ok, cái này làm m đau đầu rất nhiều thời gian, vì lúc làm chưa có ý tưởng xây dựng.
Hi vọng nó giúp ích được cho các bạn.
Thank mn đã đọc, nếu có chỗ nào k hiểu thì cmt m giải đáp nhé.