## Mở đầu
Với công việc lập trình thì ngoài việc code của bạn cần phải chạy được, chạy đúng thì cần phải ổn định, dễ hiểu, dễ bảo trì và mở rộng, tránh các cách code có thể gây bug và rối rắm cho những người khác trong team hoặc xa hơn là cho những thành viên phát triển dự án về sau (có thể hiểu là cần phải code đẹp đi :grin: ). Dưới đây mình sẽ liệt kê một số lỗi mà mình hay gặp nhé, những sai lầm này có thể gây ra nhiều vấn đề, chẳng hạn như có thể phát sinh bug, gây khó hiểu, không tối ưu, bla bla...

## 1. Lỗi cơ bản về empty vs isset
**Mức độ phổ biến:** Rất phổ biến

**Mức độ nghiêm trọng:** Thường là không không quá nghiêm trọng (nhưng đôi khi sẽ gây ra những lỗi khá nghiêm trọng, làm sai business của chức năng), nhưng mà nó làm nhức đầu hại não nhưng thằng dev khác sau này khi đọc code của bạn.

Lỗi về sử dụng các hàm isset cho các đối tượng được lồng vô nhau, lỗi này phổ biến đến mức mình thấy nó có mặt khắp mọi nơi ở hầu hết các công ty mà mình từng làm việc.

Như ví dụ bên dưới đây, vấn đề không phải là code chạy sai nhưng nó làm cho code trể nên rối rắm, dài dòng không cần thiết.

**KHÔNG NÊN**
```
if (isset($product['shop']) && isset($product['shop']['id'])) {
  doSomeThing($product['shop']);
}
```

**NÊN**
```
if (!empty($product['shop']['id']) {
  doSomeThing($product['shop']);
}
```

**Lời bàn:**
Tại sao lập trình viên lại gặp lỗi này:

1. Là do **copy & paste**, tại thấy thằng khác trước nó code vậy, nên mình copy và paste vậy luôn.
2. Chưa bao giờ bạn thử hàm empty nó hoạt động thế nào, và rất ngại khi sửa lại cái hàm đó, bởi vì mấy thằng lead nó nói, khi code hoạt động ổn định thì đừng có sửa, ai sẽ review.

Làm thế nào để không gặp những lỗi này:

Đừng bao giờ **copy & paste** code của người khác mà không suy nghĩ. Và cũng đừng bao giờ code mà không suy nghĩ là các hàm như vậy khác nhau như thế nào.

**Chú ý:** Giữa **empty()** và **isset()** cơ bản nó cũng khác nhau về chức năng, tùy vào mục đích và cách code của mỗi người mà áp dụng nhưng cần phải hiểu được tính chất của hai hàm này (có nhiều bài viết đã nói về hai hàm này trong PHP các bạn có thể tìm hiểu thêm).

## 2. Lỗi sử dụng hàm cộng chuỗi với URL
**Mức độ phổ biến:** Rất phổ biến

**Mức độ nghiêm trọng:** Không quá nghiêm trọng

Xem xét một ví dụ, build một cái chuỗi url:

**KHÔNG NÊN**

Giả sử ta có một array params như sau:

```
$params = [
  'a' => 1,
  'b' => 2,
  'c' => 3
];
```

Bạn muốn build thành chuỗi:

**url = http://localhost?a=1&b=2&c=3**

```
$query_string = [];
for($params as $key => $value){
  $query_string[] = $key.'='.$value;
}
$url = 'http://localhost/?'.implode('&', $query_string);
```

**NÊN**

```
$url = 'http://localhost/?'.http_build_query($params);
```

Có thể nói cái cách làm trên không chỉ là dài dòng và không cần thiết, mà còn tìm ẩn nhiều rủi ro cơ bản, chẳng hạn khi các $params phức tạp ở dạng array, hay là các chuỗi cần dược encode. PHP cung cấp cho chúng ta rất rất nhiều hàm để xử lý chuỗi, bạn cần phải đọc tài liệu và viết đúng những hàm mà mình cần. Chưa hết, khi bạn sử dụng Framework bạn cần phải sử dụng hàm của nó để build ra url từ router thì ứng dụng mới hoạt động đúng.

**Lời bàn:**
*Tại sao lập trình viên lại gặp lỗi này:*

1. Không đọc tài liệu của PHP để viết cho đúng best practice.
2. Không đọc Framework của mình có gì và hiểu đúng Framework.

*Làm thế nào để không gặp những lỗi này:*

1. Khi bạn gặp phải một hàm gì đó quá phức tạp hay nghĩ ra một cách làm gì đó phức tạp thì bạn phải tin rằng mình đang làm sai gì đó và đâu đó đã có cách viết tốt hơn.
2. Lập trình viên trên thế giới rất lười và phần lớn những điều mà bạn nghĩ bạn gặp đã được giải quyết, bạn chỉ cần search Google là sẽ ra cách giải quyết thôi.
3. Nên đọc và hiểu Framework mà mình đang viết, các khái niệm nó stack với nhau.

## 3. Sử dụng các con số
**Mức độ phổ biến:** Đâu đâu cũng thấy

**Mức độ nghiêm trọng:** Giống như một mình bạn đang chống lại thế giới.

Như ví dụ bên dưới, bạn không nên so sánh với các giá trị như 1, 2 vì người khác đọc code sẽ không thể nào hiểu được các giá trị đó là gì.

**KHÔNG NÊN**
```
if( $product->status === 2 && $product->stock_status === 1 ){
  // do something
}
```

So sánh với:

**NÊN**
```
class Product {
  const STATUS_OK = 2;
  const STOCK_STATATUS_AVAILABLE = 1;
  public function canDoSomething() {
    if ($product->status === static::STATUS_OK
      && $product->stock_status === static::STOCK_STATATUS_AVAILABLE) {
      return true;
    }
    return false;
  }
}
if ($product->canDoSomething()) {
  // do something
}
```

**Lời bàn:**
Viết như cách **KHÔNG NÊN** rất rối rắm, và không thể tái sử dụng. Đóng gói function sẽ làm cho code dễ đọc, dễ bảo trì, fix bug và tái sử dụng hơn.

## 4. Lỗi về sử dụng switch-case

**Mức độ phổ biến:** Thỉnh thoảng hay gặp

**Mức độ nghiêm trọng:** Điều này dẫn tới rât khó maintain và phát triển thêm tính năng

Hãy nhìn vào đoạn code bên dưới, code này, việc code thành từng case như thế này mà input dầu vào chỉ có $key và $param thì phần code này không thiết kế tốt sẽ rất khó thay đổi.

**KHÔNG NÊN**

```
namespace CorePackage;

use CorePackage\Adapder\AdapterA;
use CorePackage\Adapder\AdapterB;
use CorePackage\Adapder\AdapterC;

class Service
{
    public static function getSomething($key, $param = NULL){
        $config   = new Config();
        $options  = $config->getOptions();
        if (!in_array($key, $options) ){
            throw new \Exception('Invalid key');
        }
        switch((int)$options[$key]){
            case 0:
                $adapter  = new AdapterA();
                $data     = $server->getData($key, $param);
                break;
            case 1:
                $adapter  = new AdapterB();
                $data     = $adapter->getData($key, $param);
                break;
            case 2: 
                $adapter  = new AdapterC();
                $data     = $adapter->getData($key, $param);
                break;

        }
        return $data;
    }
}
```

**NÊN**

```
namespace CorePackage;

use CorePackage\Adapter\Factory;
use CorePackage\Adapder\AdapterInterface;

class Service
{    
    public static function getSomething($key, $param = NULL){
        $config   = new Config();
        $adapter  = Factory::create($config)
        if ( !($adapter instanceof AdapterInterface) ){
            throw new \Exception('Can not create adapater!');
        }
        $data = $adapter->getData($key, $param);
        return $data;
    }
}
```

## 5. Thực hiện truy vấn trong vòng lặp

**Mức độ phổ biến:** Không hiếm

**Mức độ nghiêm trọng:** Có thể làm hệ thống "biểu tình và tự động nghỉ ngơi" luôn =))

Ví dụ đoạn code như sau

```
$models = [];

foreach ($inputValues as $inputValue) {
    $models[] = $valueRepository->findByValue($inputValue);
}
```

Mặc dù hoàn toàn không có gì sai ở đây, nhưng nếu bạn để ý logic trong code, bạn có thể thấy rằng giá trị `$valueRepository->findByValue()` đang được gọi một cách vô tội vạ, cuối cùng kết quả của truy vấn của một số thứ, sẽ giống như thế này:

```
$result = $connection->query("SELECTx,yFROMvaluesWHEREvalue=" . $inputValue);
```

Kết quả là, mỗi lần lặp của vòng lặp ở trên sẽ dẫn đến một truy vấn đến cơ sở dữ liệu. Ví dụ, nếu bạn lặp một mảng có 1000 giá trị, nó sẽ tạo ra 1000 truy vấn riêng biệt cho cơ sở dữ liệu. Nếu như việc này được gọi trong nhiều threads, nó có thể làm cho hệ thống bị ngừng hoạt động.
Do đó cần phải xác định khi nào các truy vấn được thực hiện trong code của bạn. Bất cứ khi nào có thể, hãy thu thập các giá trị và sau đó chạy một truy vấn để lấy ra tất cả các kết quả.

Một ví dụ về một chỗ khá phổ biến để gặp phải việc thực hiện truy vấn không hiệu quả (hay truy vấn trong vòng lặp) là với danh sách các giá trị (ví dụ ID). Sau đó, để lấy dữ liệu đầy đủ cho mỗi ID, code sẽ lặp qua array và thực hiện truy vấn SQL riêng cho mỗi ID. Giống thế này:

**KHÔNG NÊN**

```
$data = [];
foreach ($ids as $id) {
    $result = $connection->query("SELECT `x`, `y` FROM `values` WHERE `id` = " . $id);
    $data[] = $result->fetch_row();
}
```

Nhưng cùng một vấn đề như vậy có thể được giải quyết bằng cách hiệu quả hơn nhiều:

**NÊN**

```
$data = [];
if (count($ids)) {
    $result = $connection->query("SELECT `x`, `y` FROM `values` WHERE `id` IN (" . implode(',', $ids));
    while ($row = $result->fetch_row()) {
        $data[] = $row;
    }
}
```

**Lời bàn:**
Do đó, điều quan trọng để nhận ra các truy vấn đang được thực hiện, hoặc trực tiếp hoặc gián tiếp, đó là bằng code của bạn. Bất cứ khi nào có thể, hãy thu thập các giá trị sau đó chạy một truy vấn để lấy tất cả các kết quả. Tuy nhiên, phải thận trọng khi thực hiện điều đó, nó có thể dẫn chúng ta tới một sai lầm phổ biến tiếp theo.

## 6. Bỏ qua các vấn đề liên quan đến Unicode/UTF-8

Trong một số trường hợp, đây thực sự là một vấn đề trong chính PHP hơn là một cái gì đó bạn sẽ chạy trong quá trình debug PHP, nhưng nó lại chưa bao giờ được giải quyết đầy đủ.
Điều cốt lõi ở trong PHP 6 là làm cho có thể nhận dạng được Unicode, nhưng đáng tiếc nó đã không được phát triển tiếp do PHP 6 bị đình chỉ trong năm 2010.

Dưới đây là một danh sách kiểm tra nhỏ để tránh những vấn đề liên quan trến Unicode/UTF-8 trong code của bạn:
Nếu bạn không biết nhiều về Unicode và UTF-8, ít nhất bạn nên học các điều cơ bản:

*1. Hãy chắc chắn luôn sử dụng các chức năng `mb  ` thay vì các hàm xử lý chuỗi cũ (đảm bảo phần mở rộng "multibyte" được xây dựng cùng với mã code PHP của bạn).*

*2. Hãy chắc chắn rằng cơ sở dữ liệu và bảng của bạn được thiết lập để sử dụng Unicode (nhiều bản xây dựng của MySQL theo mặc định vẫn sử dụng latin1).*

*3. Hãy nhớ rằng jsonencode () chuyển đổi các ký hiệu non-ASCII (ví dụ: "Schrödinger" trở thành "Schr \ u00f6dinger") nhưng serialize() thì không.*

*4. Đảm bảo rằng các file code PHP của bạn cũng được mã hoá UTF-8 để tránh xung đột khi nối chuỗi với hằng số chuỗi được mã hoá hoặc đã được config.*

Bạn có thể đọc thêm về UTF-8 Primer cho PHP và MySQ tại [đây](https://www.toptal.com/php/a-utf-8-primer-for-php-and-mysql) được đăng tải bởi Francisco Claria.

## Kết thúc
Bài viết này chắc chắn sẽ không thể nào liệt kê được đầy đủ và chi tiết tất cả những lỗi được cho là phổ biến và thường hay gặp đối với các lập trình viên PHP nên dĩ nhiên là sẽ có nhiều lỗi "hay ho" khác mà các mỗi lập trình viên PHP trong chúng ta đều ít lần đã được nếm trải =)) Cảm ơn các bạn đã đọc bài.