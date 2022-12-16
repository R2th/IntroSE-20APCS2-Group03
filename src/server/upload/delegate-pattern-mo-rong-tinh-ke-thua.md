# 1. Delegate Pattern là gì?
> ***The Delegate Design Pattern removes decisions and complex functionality from the core object by distributing or delegating them to other objects. Delegate Design Pattern loại bỏ các quyết định và chức năng phức tạp từ các đối tượng lõi bằng cách ủy quyền chúng cho các đối tượng khác.***

Delegate là một ***Design Pattern*** không nằm trong các pattern được đưa ra bởi Gang of Four nhưng nó cũng được sử dụng khá nhiều. Delegate Pattern hoạt động tương đối giống với ***tính kế thừa trong lập trình hướng đối tượng***. Tuy nhiên giữa Delegate và kế thừa có một số điểm khác nhau:

- Kế thừa copy hoàn toàn một class còn delegate chỉ copy một phần tính năng của class.
- Delegate thường dùng để copy tính năng của nhiều class.

Chúng ta cùng xem một ví dụ rất thực tế sau về Delegate, để vận chuyển hàng chúng ta có thể vận chuyển bằng xe khách, tàu hỏa và máy bay, mỗi loại vận chuyển một loại hàng hóa khác nhau, các hàng nhẹ và cần gấp thì vận chuyển bằng hàng không, hàng cồng kềnh và cần vận chuyển nhanh dùng xe khách, hàng có thể vận chuyển chậm dùng tàu hỏa. Như vậy bạn có 3 class là RailShipper, BusShipper và PlaneShipper, cả ba class này đều có phương thức vận chuyển (delivery), với xử lý thông thường chúng ta cần phải qua các lựa chọn điều kiện để lựa chọn được loại hình vận chuyển. Bạn sẽ ủy quyền cho một lớp ShipperHandler, lớp này sẽ giúp bạn gọi các phương thức delivery của các lớp RailShipper, BusShipper và PlaneShipper mà không cần biết các class này. Tức là lớp ShipperHandler đã copy các phương thức từ 3 class.

# 2. Delegate Pattern UML
![](https://images.viblo.asia/d7cccd94-2094-4e82-ba7c-0635e17a8f66.png)
# 3. Ví dụ áp dụng Delegate Pattern
Trong phần ví dụ này, chúng ta cùng xem một ứng dụng quản lý nhạc số, các bài hát được lưu vào với đường dẫn và tên bài hát, chúng ta có hai loại danh sách nhạc là M3U và PLS. Class Playlist có thể cung cấp và quản lý danh sách các bài hát.
```php
<?php
class Playlist {
    private $__songs;

    public function __construct() {
        $this->__songs = array();
    }

    public function addSong($location, $title) {
        $song = array('location' => $location, 'title' => $title);
        $this->__songs[] = $song;
    }

    public function getM3U() {
        $m3u = '#EXTM3U\n\n';

        foreach ($this->__songs as $song) {
            $m3u .= '#EXTINF:-1,{$song['title']}\n';
            $m3u .= '{$song['location']}\n';
        }   
        return $m3u;
    }

    public function getPLS() {
        $pls = "[playIist]\nNumberOfEntries=" . count($this->__songs) . "\n\n";

        foreach ($this->__songs as $songCount => $song) {
            $counter = $songCount + 1;
            $pls .= "File{$counter}={$song['location']}\n";
            $pls .= "Title{$counter}={$song['title']}\n";
            $pls .= "Length{$counter}=-1\n\n";
        }
        return $pls;
    }
}
```

Class Playlist chứa một mảng các bài hát, phương thức addSong() để thêm bài hát vào danh sách với 2 tham số là đường dẫn file MP3 và tên bài hát. Playlist có thể cung cấp ở cả hai dạng là M3U và PLS thông qua hai phương thức tương ứng getM3U() và getPLS(). Đoạn mã tiếp theo thực hiện tạo một Playlist, thêm hai bài hát và tùy thuộc vào dạng playlist, lấy ra playlist đúng định dạng.
```php
$playlist = new Playlist();
$playlist- > addSong('http://allaravel/music/song_1.mp3', 'Song 1');
$playlist- > addSong('http://allaravel/music/song_2.mp3', 'Song 2');

if ($externalRetrievedType == 'pls') {
    $playlistContent = $playlist- > getPLS();
} else {
    $playlistContent = $playlist- > getM3U();
}
```

Tuy nhiên, có rất nhiều các định dạng playlist khác, các lập trình viên cần phải phát triển ứng dụng sao cho lấy được nhiều dạng playlist khác nhau. Một class NewPlayList được thực hiện áp dụng Delegate Pattern.
```php
class newPlaylist {
    private $__songs;
    private $__typeObject;

    public function __construct($type) {
        $this->__songs = array();
        $object = "{$type}Playlist";
        $this->__typeObject = new $object;
    }

    public function addSong($location, $title) {
        $song = array('location' => $location, 'title' => $title);
        $this->__songs[] = $song;
    }

    public function getPlaylist() {
        $playlist = $this->__typeObject->getPlaylist($this->__songs);
        return $playlist;
    }
}
```

Class NewPlaylist có phương thức khởi tạo có tham số $type, như vậy nó có thể tạo ra các đối tượng tùy chỉnh. Phương thức getPlaylist() sẽ ủy quyền (delegate) thực hiện các phương thức getPlaylist() của instance động. Các phương thức getM3U() và getPLS() sẽ được chuyển sang đối tượng ủy quyền:

```php
class m3uPlaylistDelegate {
    public function getPlaylist($songs) {
        $m3u = "#EXTM3U\n\n";

        foreach ($songs as $song) {
            $m3u .= "#EXTINF:-1,{$song['title']}\n";   
            $m3u .= "{$song['location']}\n";
        }

        return $m3u;
    }
}

class plsPlaylistDelegate {
    public function getPlaylist($songs) {
        $pls = "[playIist]\nNumberOfEntries=" . count($songs) . "\n\n";

        foreach ($songs as $songCount => $song) {
            $counter = $songCount + 1;
            $pls .= "File{$counter}={$song['location']}\n";
            $pls .= "Title{$counter}={$song['title']}\n";
            $pls .= "Length{$counter}=-1\n\n";
        }

        return $pls;
    }
}
```

Khi đó, việc lấy playlist sẽ không bị code cứng:

```php
$externalRetrievedType = 'pls';

$playlist = new newPlaylist($externalRetrievedType);
$playlistContent = $playlist->getPlaylist();
```

# 4. Chuẩn hóa Delegate Pattern
Các ví dụ ở trên chúng ta đã áp dụng Delegate Pattern, tuy nhiên nó khó để áp dụng đồng loạt cho các ứng dụng khác. Chúng ta cùng tạo ra một class Delegate để có thể áp dụng ở bất kỳ đâu:
```php
<?php 
 class Delegate { 
    protected $_closures = array(); 

    public function add($closures) { 
        if (is_array($closures)) { 
            if (get_class($closures[0]) != 'Closure') {
                $this->setClosure($closures); 
            } else { 
                foreach($closures as $closure) { 
                    $this->setClosure($closure); 
                } 
            } 
        } else { 
            $this->setClosure($closures); 
        } 
    } 

    public function setClosure($closure) { 
        if (!in_array($closure, $this->_closures)) { 
            $this->_closures[] = $closure; 
        } 
    } 

    public function execute() { 
        foreach($this->_closures as $closure) { 
            call_user_func($closure); 
        } 
    } 
 }
```


Với class Delegate ở trên, chúng ta có thể sử dụng lại ở bất kỳ đâu.

```php
<?php 
require_once 'Delegate.php'; 
function test () { echo "testing";} 
class Dog { protected $_name = 'Jonh'; public function bark () { echo $this->_name; }} 
$mydog = new Dog(); 

$processruns = new Delegate(); 
$processruns->add(function() { echo "hello"; }); 
$processruns->add(function() { echo "world"; }); 
$processruns->add(array($mydog, 'bark')); 
$processruns->add('test'); 
// Hoặc có thể add vào bằng mảng
// $processruns->add(array(function() { echo "hello"; }, function() { echo "world"; }, array($mydog, 'bark'), 'test'));
$processruns->execute();
```

# 5. Lời kết
Delegate Pattern có nhiều điểm giống với kế thừa trong lập trình hướng đối tượng nhưng nó được mở rộng hơn, nó cũng có những điểm tương đồng với Proxy Pattern tuy nhiên mỗi pattern hữu ích trong những tình huống khác nhau. Các Design Pattern giúp cho bạn phát triển ứng dụng nhanh hơn với kinh nghiệm được đúc kết trong các pattern sẽ giải quyết được nhiều vấn đề chung. Việc sử dụng các desgin pattern cũng cần linh hoạt, không áp dụng dập khuôn, cứng nhắc để có hiệu quả cao nhất.