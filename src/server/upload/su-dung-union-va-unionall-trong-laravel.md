Trong bài viết này mình sẽ chia sẻ cách sử dụng union và unionall trong laravel 5, 6 , 7, 8.<br>
Khi chúng ta muốn gộp dữ liệu 2 bảng vào 1 câu truy vấn thì có thể sử dụng với union và unionall.<br>
Mình sẽ tạo hai bảng "product_silver" và "product_gold" với dữ liệu demo như dưới đây.<br>

### product_silver table:
![](https://images.viblo.asia/af933f16-3005-4f48-a0e0-c9dfe0a23d4d.png)<br>


### product_gold table:
![](https://images.viblo.asia/df2ed200-34ad-44a2-83ad-eed2e1c7d2d5.png)<br>


### Cách sử dụng với union:
**Query:**<br>
```PHP
$silver = DB::table("product_silver")
            ->select(
                "product_silver.name",
                "product_silver.price"
            );
          
        $gold = DB::table("product_gold")
            ->select(
                "product_gold.name",
                "product_gold.price"
            )
            ->union($silver)
            ->get()
            ->toArray();
          
        dd($gold);

```

**Output:**<br>
![](https://images.viblo.asia/96a088f7-0a04-4d7a-8f71-7f71ce8f10e4.png)<br>
Khi sử dụng union thì nó sẽ gộp dữ liệu 2 bảng và loại bỏ đi những dòng bị trùng lặp,chỉ để lại một dòng duy nhất, tuy nhiên không phải lệnh nào cũng gộp được mà phải thoả mãn điều kiện sau:<br>
-	Tên của các column phải giống nhau<br>
-	Thứ tự các column phải giống nhau<br>
-	Tổng các column phải bằng nhau<br>

### Cách sử dụng với unionall:
**Query:**<br>
```PHP
$silver = DB::table("product_silver")
            ->select(
                "product_silver.name",
                "product_silver.price"
            );
          
        $gold = DB::table("product_gold")
            ->select(
                "product_gold.name",
                "product_gold.price"
            )
            ->unionall($silver)
            ->get()
            ->toArray();
          
        dd($gold);

```
**Output:**<br>
![](https://images.viblo.asia/044963ef-2350-4e3f-9bf3-0e896038cbf5.png)<br>
Khi sử dụng unionall thì nó sẽ gộp dữ liệu 2 bảng và sẽ giữ lại tất cả dữ liệu kể cả những dòng bị trùng lặp.<br>

### Phân biệt dữ liệu 2 bảng khi sử dụng unionall
Khi dử dụng unionall nó sẽ gộp hết dữ liệu từ 2 bảng, nhiều khi mình muốn biết dòng nào thuộc bảng product_silver và dòng nào thuộc bảng product_gold thì mình sẽ sửa lại query như bên dưới nhé.<br>

**Query:**<br>
```PHP
$silver = DB::table("product_silver")
            ->select(
                "product_silver.name",
                "product_silver.price",
                DB::raw('"silver" as type')
            );
          
        $gold = DB::table("product_gold")
            ->select(
                "product_gold.name",
                "product_gold.price",
                DB::raw('"gold" as type')
            )
            ->unionall($silver)
            ->get()
            ->toArray();
          
        dd($gold);

```
**Output:**<br>
![](https://images.viblo.asia/fed7cbe1-cb08-4d91-b612-f113450acc76.png)<br>
Mình hy vọng bài viết này sẽ giúp ích cho các bạn!