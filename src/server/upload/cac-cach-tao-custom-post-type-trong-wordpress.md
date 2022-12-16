### Custom post type là gì ?
Khi cài đặt mặc định, **wordpress** đã cung cấp 2 **post type** đó là : page và post. Chúng dùng để quản lý bài viết (post) và các trang tĩnh (page). 
Như vậy nếu bạn muốn quản lý một đối tượng khác như **dịch vụ** (product) thì bạn phải tạo 1 post type **service** hoặc **dich_vu** để quản lí chúng.
Post type product cũng có đầy đủ các thuộc tính như **post** và **page** ( ảnh đại diện, content, title, custom field, ... )

![](https://images.viblo.asia/763ad4fc-465b-49a4-a019-047b27c031be.png)

Nhưng trong trang quản trị wordpress không thể tạo post type **service** được. Vậy làm sao để tạo 1 custom post type như mong muốn và có những cách nào để tạo chúng nhanh nhất có thể.
Hãy cùng mình tìm hiểu nhé.
### Cách tạo custom post type
1. Tạo bằng code (Be like a coder :v: )
Do chúng ta dùng code nên sẽ có nhiều cách tạo.
    Chúng ta có thể viết vào **functions.php** (file này ở trong folder theme nhé), viết như 1 plugin
    Dù viết ở đâu thì chúng cũng sử dụng function **register_post_type** để tạo và dùng hook **init** (xem thêm về [action_hook](https://developer.wordpress.org/plugins/hooks/) ) để wordpress nhận post type khi khởi chạy.
    Hãy nhìn qua đoạn code dưới đây nhé.
    
```
function sun_dich_vu_init() {
    $labels = array(
        'name'                  => _x( 'Dịch vụ', 'Post type general name', 'textdomain' ),
        'singular_name'         => _x( 'Dịch vụ', 'Post type singular name', 'textdomain' ),
        'menu_name'             => _x( 'Dịch vụ', 'Admin Menu text', 'textdomain' ),
        'name_admin_bar'        => _x( 'Dịch vụ', 'Add New on Toolbar', 'textdomain' ),
        'add_new'               => ( 'Add New', 'textdomain' ),
        'add_new_item'          => ( 'Add New Dịch vụ', 'textdomain' ),
        'new_item'              => ( 'New Dịch vụ', 'textdomain' ),
        'edit_item'             => ( 'Edit Dịch vụ', 'textdomain' ),
        'view_item'             => ( 'View Dịch vụ', 'textdomain' ),
        'all_items'             => ( 'All Dịch vụ', 'textdomain' ),
        'search_items'          => ( 'Search Dịch vụ', 'textdomain' ),
        'parent_item_colon'     => ( 'Parent Dịch vụ:', 'textdomain' ),
        'not_found'             => ( 'No Dịch vụ found.', 'textdomain' ),
        'not_found_in_trash'    => ( 'No Dịch vụ found in Trash.', 'textdomain' ),
        'featured_image'        => _x( 'Book Cover Image', 'Overrides the “Featured Image” phrase for this post type. Added in 4.3', 'textdomain' ),
        'set_featured_image'    => _x( 'Set cover image', 'Overrides the “Set featured image” phrase for this post type. Added in 4.3', 'textdomain' ),
        'remove_featured_image' => _x( 'Remove cover image', 'Overrides the “Remove featured image” phrase for this post type. Added in 4.3', 'textdomain' ),
        'use_featured_image'    => _x( 'Use as cover image', 'Overrides the “Use as featured image” phrase for this post type. Added in 4.3', 'textdomain' ),
        'archives'              => _x( 'Dịch vụ archives', 'The post type archive label used in nav menus. Default “Post Archives”. Added in 4.4', 'textdomain' ),
        'insert_into_item'      => _x( 'Insert into Dịch vụ', 'Overrides the “Insert into post”/”Insert into page” phrase (used when inserting media into a post). Added in 4.4', 'textdomain' ),
        'uploaded_to_this_item' => _x( 'Uploaded to this Dịch vụ', 'Overrides the “Uploaded to this post”/”Uploaded to this page” phrase (used when viewing media attached to a post). Added in 4.4', 'textdomain' ),
        'filter_items_list'     => _x( 'Filter Dịch vụ list', 'Screen reader text for the filter links heading on the post type listing screen. Default “Filter posts list”/”Filter pages list”. Added in 4.4', 'textdomain' ),
        'items_list_navigation' => _x( 'Dịch vụ list navigation', 'Screen reader text for the pagination heading on the post type listing screen. Default “Posts list navigation”/”Pages list navigation”. Added in 4.4', 'textdomain' ),
        'items_list'            => _x( 'Dịch vụ list', 'Screen reader text for the items list heading on the post type listing screen. Default “Posts list”/”Pages list”. Added in 4.4', 'textdomain' ),
    );

 
    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => array( 'slug' => 'service' ),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => null,
        'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' ),
    );
 
    register_post_type( 'dich_vu', $args );
}
 
add_action( 'init', 'sun_dich_vu_init' );
```

- Nhìn có vẻ khá dài đúng không? Nhưng đây là toàn bộ thuộc tính của 1 post type ta cần setup nếu cần thiết đó.
Cơ mà nhớ thế méo nào hết được. 
Bởi thế mình thấy nên làm theo 1 trong 2 cách sau: 
* nhớ những thứ cần thiết: 
Đoạn code trên ta không cần nhớ toàn bộ chúng, ta chỉ cần nhớ 1 phần mà thôi

```
function sun_dich_vu_init() {
    $labels = array(
        'name'                  => _x( 'Dịch vụ', 'Post type general name', 'textdomain' ),
        'singular_name'         => _x( 'Dịch vụ', 'Post type singular name', 'textdomain' ),
        'menu_name'             => _x( 'Dịch vụ', 'Admin Menu text', 'textdomain' ),
    );
 
    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => array( 'slug' => 'service' ),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => null,
        'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' ),
    );
 
    register_post_type( 'dich_vu', $args );
}
 
add_action( 'init', 'sun_dich_vu_init' );
```

Đó, ngắn hơn nhiều rồi. Do các data của $label khá dài mà lại không cần thiết cho lắm nên ta có thể bỏ qua. 
Chú ý cần nhớ phần $args chính là các cài đặt cho post type đó.
Cơ mà mình vẫn thấy nó dài và khó nhớ (lười). Thực ra trong mấy project mà chạy deadline sml thì không thể ngồi gõ như này được.
Sau khi google thì mình thấy đâu có mỗi mình lười đâu. Các cha anh đã tạo luôn 1 tool để generate ra đoạn code phía trên cho chúng ta roài.
- Truy cập đường link này nhé: 
https://generatewp.com/post-type/
Demo nè:
![](https://images.viblo.asia/ba2b11d8-e180-413a-adcf-2a723d3bfc86.png)

- Đó là sau khi mình setup ở form phía trên
![](https://images.viblo.asia/62262a59-c0ab-463f-9425-d75c0671a03d.png)

Xong, giờ chúng ta đã có code. Mình sẽ dùng cách nhanh nhất là ném thẳng vào file functions.php của theme đang active nhé.
Sau đó chúng ta sẽ thấy ở menu xuất hiện 1 phần quản lí Dịch vụ như sau
![](https://images.viblo.asia/e9c80705-2675-480c-996d-4557cf02c13a.png)

2. Dùng plugin để tạo ( cách này mình hay dùng nè)
- Có lần mình code lắm post type quá, thành ra lặp đi lặp lại đống code kia nên khá oải.
Cơ mà nhờ có anh làm cùng chỉ cho dùng plugin **Custom Post Type UI** nên giờ bao nhiêu post type cũng chiến hết á.
Link nè: https://vi.wordpress.org/plugins/custom-post-type-ui/

Demo:
![](https://images.viblo.asia/49bc0bb0-5139-4913-ad5a-96fc94142cd1.png)

- Sau khi cài đặt và kích hoạt plugin thì đây là phần cài đặt cho post type dịch vụ như bên trên nếu không dùng code.
Điền xong ấn submit và bạn đã có phần quản lý cho post type **dich_vu** trong 1 nốt nhạc :v: 
Ngoài ra plugin này rất hữu ích khi có thể tạo custom taxonomy cho post type luôn. Cực kỳ tiện lợi !

### Kết luận
Qua bài viết này mình đã chia sẻ các cách để tạo 1 custom post type quản lí riêng cho 1 đối tượng ngoài post và page.
Ở bài sau mình sẽ chia sẻ về cách tạo các custom template riêng để hiển thị cho post type **dich_vu**
Cám ơn các bạn đã đọc đến tận đây, nếu thấy hay hãy cho mình 1 up vote nhé !