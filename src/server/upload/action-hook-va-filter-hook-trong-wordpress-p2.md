## Filter là gì?
* Filter là một hàm được viết bằng PHP trong Plugin
* Gắn Filter vào hệ thống WP thông qua hàm có sẳn add_filter()
* Filter được viết ra để thực hiện lọc dữ liệu input và output trong hệ thống WP
* Xác định vị trí (Hook) để gắn Filter đã viết của chúng ta 

## Gắn Filter vào Hook
* Để gắn một Filter vào một vị trí (hook) nào đó chúng ta sẽ sử dụng hàm:
```
add_filter( $tag, $function, $priority, $accepted_args );
```
* Với các tham số:
1. $ tag -  Là tên của một 'filter hook'  của WP
2. $function - Tên Filter  tương tác vào hệ thống.
3. $priority – Độ ưu tiên của Filter.
4. $accepted_args - Số lượng các tham số sẽ được truyền vào hàm của bạn.

Ví dụ hàm thay đổi tiêu đề của một bài viết
```
add_filter( 'the_title', 'fr_post_title', 10);

function fr_post_title() {
    return 'Title'';
}
```

```
add_filter('the_title', array($this, 'theTile'));

public function theTile(){ 	
    return ''Title'';
}
```

## Loại bỏ Filter khỏi Hook
* Để loại bỏ một Filter ra khỏi một vị trí (hook) nào đó chúng ta sẽ sử dụng hàm:
```
remove_filter( $tag, $function, $priority);
```
* Tham số
1. $ tag -  Là tên của một 'filter hook'  của WP
2. $function - Tên Filter mà bạn muốn loại bỏ khỏi hệ thống.
3. $priority – Độ ưu tiên của Filter

```
remove_filter('the_content', 'convert_smilies');
```

## Loại bỏ tất cả Filter khỏi Hook
* Để loại bỏ tất cả Filter ra khỏi một vị trí (hook) nào đó chúng ta sẽ sử dụng hàm:
```
remove_all_filters( $tag, $priority);
```
* Tham số
1. $ tag -  Là tên của một 'filter hook'  của WP
2. $priority – Độ ưu tiên của Filter

Không sử dụng độ ưu tiên
```
remove_all_filters('the_content');
```
Sử dụng độ ưu tiên
```
remove_all_filters('the_content', 10);
```

## Kiểm tra sự tồn tại Filter
* Kiểm tra sự tồn tại của Filter trong một Hook nào đó:
```
has_filter($tag, $function_to_check);
```
* Tham số
1. $ tag -  Là tên của một 'filter hook'  của WP
2. $ function_to_check - Tên Filter mà bạn muốn kiểm tra.
```
has_filter('the_content','convert_smilies')
```

## Lấy tên Filter tại một thời điểm
* Lấy tên của một Filter tại một thời điểm nào đó :
```
current_filter()
```

## Tra cứu Filter
http://codex.wordpress.org/Plugin_API/Filter_Reference