Tình cờ thấy một số thanh progress bar trên nodejs khá hay ho, hôm nay tôi sẽ hướng dẫn mọi người viết một cái progress bar màu mè bằng php. 

Tạo class ProgressBar

```sql
<?php
final class ProgressBar
{
    /**Ký tự dùng phần hoàn thành của progress bar */
    const FILL_CHAR = "▓";

    /**Ký tự dùng phần còn lại chưa hoàn thành của progress bar */
    const NOT_FILL_CHAR = "░";

    /** Độ dài tối đa của thanh progress bar */
    const BAR_LENGTH = 50;

    /** @var int Số bứớc nhảy tối đa của  progress bar, mặc định ban đầu là 0*/
    private $maxProcess = 0;

    /** @var int Bứớc nhảy hiện tại của  progress bar, mặc định ban đầu là 0 */
    private $currenProcess = 0;

    /** @var bool Trạng thái kết thúc của thanh tiến trình */
    private $endProgress = false;

    /** @var string Nơi lưu toàn bộ progress bar */
    private  $progressBar = "";

    /** Danh sách màu của progress bar, cái này chỉ để cho thanh progress bar trông màu mè hơn xíu :)) */
    private $colors = [];
}
```

 Tạo constructor để khởi tạo số bước nhảy tối đa của progress bar, tiếp đó là khởi tạo các mã màu để sử dụng cho việc biến đổi màu sắc theo số % của thanh tiến trình.

```perl
public function __construct($max)
{
    $this->maxProcess = $max;
    $this->initColorCode();
}

private function initColorCode()
{
    for ($i = 196; $i <= 231; $i++) {
        $this->colors[] = $i;
    }
    for ($i = 123; $i >= 119; $i--) {
        for ($j = 0; $j < 3; $j++) {
            $this->colors[] = $i - 36 * $j;
        }
    }
}
```

 Hàm tạo color code theo số %:

```php
private function getColorCode($percent)
{
    $code = floor($percent / 2);
    if (!isset($this->colors[$code])) {
        $code = $this->colors[count($this->colors) - 1];
    } else {
        $code = $this->colors[$code];
    }
    return "\e[38;5;{$code}m";
}
```

 Mỗi lần progress bar thay đổi, các ký tự đã show ra console trước đó phải được replace, hàm getBackward sẽ nhận vào số % hiện tại và trả về ký tự thoát tương ứng để relpace lại các ký tự đã in ra trước đó:

```perl
private function getBackward($percent)
{
    $backward = (strlen($this->progressBar) + 2);
    if ($percent < 10) {
        $backward++;
    }

    return  "\033[{$backward}D ";
}
```

Ui chao nghe lan man quá, rồi cái thanh tiến trình của tôi đâu. Thôi thì mình sẽ show code chính trước, hàm bổ trợ mình để ở dưới và giải thích sau nhé :))

```php
public function start()
{
    echo "\n\033[?25l"; // show break line and hide cursor
    $this->showProcess(0);
}
```
Hàm start ẩn con trỏ trên console và gọi hàm showProcess với đầu vào ban đầu là 0%(sẽ viết bên dưới)

```php
public function advance($step = 1)
{
    $this->currenProcess += $step; // Mỗi lần gọi hàm thì tăng current process lên 
    $percent = floor($this->currenProcess * 100 / $this->maxProcess); // tính toán số phần trăm tương ứng với process hiện tại

    $this->showProcess($percent); // gọi hàm để show progress bar

    if ($percent >= 100 && !$this->endProgress) {// nếu số phần trăm đã vượt ngưỡng 100%, đánh dấu là end progress để không tăng thêm độ dài cho progress bar
        $this->endProgress = true;
    }
}
```
Hàm advance cho phép truyền vào 1 tham số int, là bước nhảy của progress bar. Nếu không truyền vào thì mặc định mỗi lần gọi sẽ tăng step lên 1 đơn vị.

```php
public function __destruct()
{
    $this->endProgress = true;
    echo "\033[?25h\n"; //show cursor and break line
}
```
 Sau khi chạy xong thì destructor sẽ được gọi và hiển thị con trỏ trở lại.

 Còn thiếu 2 hàm createProgress và showProcess, ngay đây thôi :))

```perl
private function createProgress($percent)
{
    $bar = '';
    if ($percent >= 100) { // Nếu số phần trăm quá 100, gán lại bằng 100 để không tăng thêm độ dài cho progress bar
        $percent = 100;
    }
    $fillPoint = floor($percent / (floor(100 / static::BAR_LENGTH))); // tính toán xem cần fill bao nhiêu % hoàn thành vào progress bar
    for ($i = 0; $i < $fillPoint; $i++) {
        $bar .= static::FILL_CHAR;
    }
    $notFill = static::BAR_LENGTH - $fillPoint; // tính toán xem cần fill bao nhiêu % chưa hoàn thành vào progress bar
    for ($i = 0; $i < $notFill - 1; $i++) {
        $bar .= static::NOT_FILL_CHAR;
    }

    return $bar; // trả về 1 chuỗi thanh tiến trình
}
private function showProcess($percent)
{
    $backward = $this->getBackward($percent); // get backward code để replace lại progress bar
    $bar = $this->createProgress($percent); // tạo progress bar string

    $colorCode = $this->getColorCode($percent); // get mã màu tương ứng với thanh tiến trình hiện tại

    $total = "{$this->currenProcess}/" . ($this->currenProcess > $this->maxProcess ? $this->currenProcess : $this->maxProcess); // tính tổng số step
    echo $this->progressBar = "{$backward}{$colorCode} {$total} " // show progress bar
        . Formater::ESCAPE
        . " [{$colorCode}{$bar}"
        . Formater::ESCAPE
        . "] {$colorCode}{$percent} %"
        . Formater::ESCAPE;
}
```

Cuối cùng là khởi tạo instance của ProgressBar để test thôi nào

```shell
$command = new Command;
$command->progressStart(1000);
for($i = 0; $i < 1500; $i++) {
    $command->progressAdvance();
    usleep(50000);// sleep nửa giây cho mỗi step để xem thanh tiến trình thay đổi từ từ :))
}
```
![](https://images.viblo.asia/7f66d228-e6ea-4922-9fba-8c9ea8031143.gif)

 Full code [tại đây ](https://github.com/nguyenthemanh2601/pure_php/blob/master/core/Console/ProgressBar.php)

 Tham khảo mã màu cho console [tại đây](https://misc.flogisoft.com/bash/tip_colors_and_formatting)

  Thank for watching ;p