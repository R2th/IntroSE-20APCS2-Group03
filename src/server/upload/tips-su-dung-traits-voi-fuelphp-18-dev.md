## Sơ lược 
Mình thấy khi có một tính năng hay muốn chia sẻ giữa các class mà không cần phải kế thừa, thì `traits` là một công cụ khá là bổ ích. Ví dụ chỉ đơn giản như mình muốn xuất logs khi chạy câu lệnh migrations thôi, và mình không muốn bất kì file migration nào mình cũng phải thêm dòng xuất log vào đó, mình sẽ dùng traits ở FuelPHP

## Cấu trúc thư mục traits và thêm autoload traits

### Cấu trúc thư mục 
FuelPHP không hỗ trợ sẵn `autoload` traits, chúng ta phải tự tạo thư mục `traits` để các file `traits` vào trong đó và sửa `app/bootstrap.php` để autoload. (Khá là lằn nhằn nhỉ ). Thôi đơn giản mình sẽ tạo thư mục `traits` nằm bên trong `fuel/app` như hình 
![](https://images.viblo.asia/eccc59a5-342b-479b-aafe-68586c8861d0.png)

### Nội dung file traits 
File traits của mình chỉ đơn giản như bên dưới. Nó có 2 nhiệm vụ 
	* Output Sql ra file được chỉ định sẵn 
	* Get `short name` của 1 class (thay vì tên có đầy đủ namespace)

```php
<?php

trait MigrationSqlOutputTrait{

	public static function outputSql(){
		//Output SQL 
		//Create new Log;
		$filePath = '..' .DS.'..' . APPPATH;
		file_put_contents($filePath. implode('_', [date('Ymd'), self::getName()]) .'.sql' , DB::last_query());

	}
	public static function getName() {
	    $path = explode('\\', __CLASS__);
	    return array_pop($path);
	}
}
```

### Autoload 
Để autoload traits, mình cần chỉnh  lại file `app/bootstrap.php`

```php
/**
 * Your environment.  Can be set to any of the following:
 *
 * Fuel::DEVELOPMENT
 * Fuel::TEST
 * Fuel::STAGE
 * Fuel::PRODUCTION
 */
Fuel::$env = (isset($_SERVER['FUEL_ENV']) ? $_SERVER['FUEL_ENV'] : Fuel::DEVELOPMENT);

// Initialize the framework with the config file.
Fuel::init('config.php');
//Load traits
\Fuel::load(APPPATH.'traits' .DS . 'MigrationSqlOutputTrait.php');

```

Thêm đoạn `\Fuel::load` thôi, vậy là khi bootstrap thì `MigrationSqlOutputTrait` sẽ được autoload.

### Sử dụng

Để sử dụng thì đơn giản là chúng ta chỉ cần thêm đoạn `use \MigrationSqlOutputTrait ` và dùng thôi .
Các bạn có thể xem code mẫu bên dưới

```php
<?php

namespace Fuel\Migrations;

class AAA
{
	use \MigrationSqlOutputTrait;

	public function up()
	{
		\DBUtil::add_fields('xxx', array(
			'yyy' => array('type' => 'tinyint(1)', 'default' => 0),

		));
		$this->outputSql();
	}

	public function down()
	{
		\DBUtil::drop_fields('xxx', array(
			'yyy'

		));
	}
}
```

Khi chạy migration, thì sẽ có file `20180716_AAA.sql` xuất hiện trong thư mục `logs`


## TL;DR
Traits là một cách để chia sẻ code ngang hàng giưã các class trong PHP. Nhờ dùng traits chúng ta có thể giảm thiểu việc copy/paste code. 
Khi dùng traits các bạn nhớ cẩn thận vì có thể các traits có tên methods trùng nhau, khi đó chúng ta phải resolve traits conflict đấy.

#### Nguồn
[FuelPHPでTraitを使う方法](https://qiita.com/Keech/items/111bee8824a56aa8b8af)