Đối với những ai đã từng sử dụng framework laravel, thì sự thuận tiện của collection helper là không thể phủ nhận. Nó giúp chúng ta thao tác với dữ liệu một cách thuận tiện và trôi chảy hơn. Tuy nhiên, không phải lúc nào các dự án của chúng ta đều được phép sử dụng framework. Vì khi sử dụng framework, một khi có lỗi xảy ra thì chúng ta rất khó để control. Trong bài viết này, mình xin chia sẻ cách tạo một collection trong PHP thuần.

**1. Khởi tạo collection**

Đầu tiên, coletion phải có khả năng sử dụng trong vòng lặp giống như một array.  Collection phải implements IteratorAggregate interface để tạo một Iterator bên ngoài.

```php
<?php

use ArrayIterator;
use IteratorAggregate;

class Collection implements IteratorAggregate
{
    /**
     * Khởi taọ thuộc tính để chứa các giá trị từ mảng.
     *
     * @var \ArrayIterator
     */
    protected $items = [];
   
    /**
     * Khởi tạo items bằng cách tạo một instance của ArrayIterator.
     *
     * @param array  $items 
     * @return void
     */
    public function __construct($items = [])
    {
        $this->items = new ArrayIterator($this->getArrayableItems($items));
    }

    /**
     * Hàm này sẽ trả về một array cho việc khởi tạo thuộc tính items ở hàm __construct.
     *
     * @param  mixed  $items
     * @return array
     */
    protected function getArrayableItems($items)
    {
        if (is_array($items)) { // Nếu là một array thì return $item luôn
            return $items;
        } elseif ($items instanceof Traversable) { // Nếu là một thể hiện của Traversable thì sử dụng hàm iterator_to_array để chuyển từ iterator về array
            return iterator_to_array($items);
        }

        return (array) $items; // nếu là loại khác, ép kiểu về dạng array
    }

    /**
     * Get an iterator for the items.
     *
     * @return \ArrayIterator
     */
    public function getIterator()
    {
        return $this->items;
    }
}
```
 Giải thích:
 Khi chúng ta sử dụng colection trong một vòng lặp, php sẽ kiểm tra xem tham số được sử dụng để lặp có phải là một đối tượng có thể lặp hay không. Việc implements  IteratorAggregate interface giúp chúng ta tạo ra một đối tượng như vậy. Interface này yêu cầu chúng ta khởi tạo phương thức getIterator, giá trị trả về là một thể hiện của ArrayIterator. ArrayIterator cho phép lặp một object trong vòng lặp nhiều lần giống như một arrray.
Vì chúng ta đã khởi tạo một thể hiện của ArrayIterator ở constructor, nên trong hàm getIterator chúng ta chỉ cần return $this->items là xong.

Tới đây, chúng ta đã có thể sử dụng colection trong vòng lặp. Tuy nhiên, collection vẫn là một object, muốn truy cập vào các thuộc tính của nó như một array, chúng ta phải implements ArrayAccess.
interface này yêu cầu các methods offsetGet, offsetSet, offsetUnset, offsetUnset:
```php
    /**
     * @param  string  $key
     * @return mixed
     */
    public function offsetGet($key)
    {
        return $this->items[$key];
    }
```
 Hàm offsetGet được gọi khi chúng ta get một thuộc tính của object(ở đây là class Collection của chúng ta) như một array. VD: $collection['key1'], $collection['key2']
 Khi đó, chúng ta sẽ return giá trị được chứ trong $this->items.
 
```php
/**
 * @return void
 */
public function offsetSet($key, $value)
{
    if (is_null($key)) {
        $this->items[] = $value;
    } else {
        $this->items[$key] = $value;
    }
}
```
Hàm offsetSet được gọi khi chúng ta gán một giá trị cho collection. VD: $collection['key1'] = ''key1";
Khi đó, chúng ta sẽ gán giá trị truyền vào cho $this->items.

```php
/**
 * @return void
 */
public function offsetUnset($key)
{
    unset($this->items[$key]);
}
```

Hàm offsetUnset sẽ được gọi khi chúng ta sử dụng hàm unset. VD: unset($collection['key1']).
Tương tự, chúng ta cũng sẽ gọi hàm unset với $this->items.
```php
/**
 * Determine if an item exists at an offset.
 *
 * @param  TKey  $key
 * @return bool
 */
public function offsetExists($key)
{
    return isset($this->items[$key]);
}
```
Hàm offsetExists sẽ được gọi khi chúng ta gọi hàm isset để kiểm tra một key. Khi đó chúng ta sẽ gọi hàm isset để kiểm tra key trong $this->items.

**2. Các phương thức bổ trợ**
Như chúng ta thấy, các thao tác với collection đều sử dụng $this->items, một instance của ArrayIterator.
Tuy nhiên chúng ta lại không thể gọi các phương thức của ArrayIterator trong một thể hiện của collection.
Hàm sau đây sẽ giải quyết điều đó:

```php
public function __call($name, $arguments)
{
    if (method_exists($this->items, $name)) {
        return call_user_func_array([$this->items, $name], $arguments);
    }
}
```
Hàm sẽ được kích hoạt khi gọi các phương thức không thể truy cập trong collection.
Khi đó, chúng ta sẽ kiểm tra xem method đó có trong $this->items hay không, nếu có thì return method trong $this->items.

Chúng ta cũng có thể thêm các phương thức để collection có thể sử dụng giống một array hơn. VD 

```php
public function pop()
{
    $arrayItems = iterator_to_array($this->items);
    $results = array_pop($arrayItems);
    $this->items = new ArrayIterator($arrayItems);

    return $results;
}
```
**3. Test**

Cuối cùng, chúng ta tạo một file php để test collection.

```php
$a =  new Collection(['a', 'b', 'c']);
echo $a[0]; // return 'a'
$a[4] = '4'; // thêm phần tử vào collection
$c = isset($a[4]); //return true
unset($a[4]);// unset phần tử ra khỏi collection
$a->pop();// return 'c'
foreach($a as $key => &$value) { // sử dụng collection trong vòng lặp
    echo "$key => $value<br>";
}
$a->append('foobar');// gọi hàm append trong ArrayIterator để thêm phần tử vào cuối collection
```

Tham khảo toàn bộ file [tại đây ](https://github.com/nguyenthemanh2601/pure_php/blob/master/core/Support/Helper/Collection.php)


Đây là lần đầu viết bài, không thể tránh khỏi các sai sót. Mong được mọi người chỉ bảo thêm. Xin chân thành cảm ơn :))





.