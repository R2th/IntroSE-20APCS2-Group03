##### Lập trình viên nói chung và lập trình viên PHP nói riêng, khi tạo ra một cơ sở dữ liệu rất cần có những dữ liệu để chèn vào trong từng cột, từng bảng. Thay vì phải chèn từng dòng vào từng bảng thì hôm nay tôi sẽ giới thiệu một số thuộc tính thường dùng trong thư viện Faker của Laravel.

### 1. Faker là gì?
Faker là một thư viện PHP tạo dữ liệu giả cho bạn. Cho dù bạn cần khởi động lại cơ sở dữ liệu của mình, tạo các tài liệu XML đẹp mắt, điền vào sự kiên trì của bạn để kiểm tra căng thẳng hoặc ẩn danh dữ liệu được lấy từ một dịch vụ sản xuất, Faker là dành cho bạn.

Faker được truyền cảm hứng rất nhiều từ Dữ liệu của Perl :: Faker và Faker của ruby.

Faker yêu cầu PHP> = 5.3.3.
 ### 2. Cài đặt faker 
` composer require fzaninotto/faker`
### 3. Cách sử dụng cơ bản
#### 3.1. Autoloading 
Faker hỗ trợ cả PSR-0 dưới dạng PSR-4 autoloaders.
```php
 <?php
 # Khi được cài đặt thông qua composer
 require_once 'vendor/autoload.php';
```
Bạn cũng có thể tải `Fakers` qua `PSR-0` autoloaders.
```php
<?php
# Tải fakers sở hữu autoloader
require_once '/path/to/Faker/src/autoload.php';
```
#### 3.2. Tạo dữ liệu giả
Sử dụng `Faker\Factory::created()` để tạo và khởi tạo trình tạo faker, có thể tạo dữ liệu bằng cách truy cập các thuộc tính được đặt tên theo loại dữ liệu bạn muốn.
```php
<?php
// Sử dụng Factory để tạo Faker\Generator
$faker = Faker\Factory::create();

// Tạo dữ liệu bằng cách truy cập thuộc tính
echo $faker->name;
  // 'John Henry';
echo $faker->address;
  // "426 Jordy Lodgen"
echo $faker->text;
  // Fuga deserunt tempora facere magni omnis. Omnis quia temporibus laudantium
  // sit minima sint.
```
Ngay cả khi ví dụ này hiển thị quyền truy cập thuộc tính, mỗi lệnh gọi đến `$faker->name` mang lại kết quả (ngẫu nhiên) khác nhau. Điều này là do Faker sử dụng phép thuật` __get ()` và chuyển tiếp `Faker\Generator->$property` gọi đến `Faker\Generator->format($property)`.
```php
<?php
for ($i = 0; $i < 10; $i++) {
  echo $faker->name, "\n";
}
  // Adaline Reichel
  // Dr. Santa Prosacco DVM
  // Noemy Vandervort V
  // Lexi O'Conner
  // Gracie Weber
  // Roscoe Johns
  // Emmett Lebsack
  // Keegan Thiel
  // Wellington Koelpin II
  // Ms. Karley Kiehn V
```
Mẹo: Để tạo nhanh dữ liệu giả, bạn cũng có thể sử dụng Faker làm công cụ dòng lệnh nhờ `faker-cli` .
### 4. Formatters
Mỗi thuộc tính của trình tạo (như tên, địa chỉ và lorem) được gọi là "Formatters". Dưới đây là một số định dạng mà thường sử dụng nhiều.
#### 4.1. Faker\Provider\Base
```shell
randomDigit             // 7
randomDigitNot(5)       // 0, 1, 2, 3, 4, 6, 7, 8, or 9
randomDigitNotNull      // 5
randomNumber($nbDigits = NULL, $strict = false) // 79907610
randomFloat($nbMaxDecimals = NULL, $min = 0, $max = NULL) // 48.8932
numberBetween($min = 1000, $max = 9000) // 8567
randomLetter            // 'b'
```
#### 4.2. Faker\Provider\Lorem
```sql
word                                             // 'aut'
words($nb = 3, $asText = false)                  // array('porro', 'sed', 'magni')
sentence($nbWords = 6, $variableNbWords = true)  // 'Sit vitae voluptas sint non voluptates.'
sentences($nb = 3, $asText = false)              // array('Optio quos qui illo error.', 'Laborum vero a officia id corporis.', 'Saepe provident esse hic eligendi.')
paragraph($nbSentences = 3, $variableNbSentences = true) // 'Ut ab voluptas sed a nam. Sint autem inventore aut officia aut aut blanditiis. Ducimus eos odit amet et est ut eum.'
paragraphs($nb = 3, $asText = false)             // array('Quidem ut sunt et quidem est accusamus aut. Fuga est placeat rerum ut. Enim ex eveniet facere sunt.', 'Aut nam et eum architecto fugit repellendus illo. Qui ex esse veritatis.', 'Possimus omnis aut incidunt sunt. Asperiores incidunt iure sequi cum culpa rem. Rerum exercitationem est rem.')
text($maxNbChars = 200)                          // 'Fuga totam reiciendis qui architecto fugiat nemo. Consequatur recusandae qui cupiditate eos quod.'
```
#### 4.3. Faker\Provider\en_US\Person
```ruby
title($gender = null|'male'|'female')     // 'Ms.'
titleMale                                 // 'Mr.'
titleFemale                               // 'Ms.'
suffix                                    // 'Jr.'
name($gender = null|'male'|'female')      // 'Dr. Zane Stroman'
firstName($gender = null|'male'|'female') // 'Maynard'
firstNameMale                             // 'Maynard'
firstNameFemale                           // 'Rachel'
lastName                                  // 'Zulauf'
```
#### 4.4. Faker\Provider\en_US\Address
```sql
cityPrefix                          // 'Lake'
secondaryAddress                    // 'Suite 961'
state                               // 'NewMexico'
stateAbbr                           // 'OH'
citySuffix                          // 'borough'
streetSuffix                        // 'Keys'
buildingNumber                      // '484'
city                                // 'West Judge'
streetName                          // 'Keegan Trail'
streetAddress                       // '439 Karley Loaf Suite 897'
postcode                            // '17916'
address                             // '8888 Cummings Vista Apt. 101, Susanbury, NY 95473'
country                             // 'Falkland Islands (Malvinas)'
```
#### 4.5. Faker\Provider\en_US\PhoneNumber
```sql
phoneNumber             // '201-886-0269 x3767'
tollFreePhoneNumber     // '(888) 937-7238'
e164PhoneNumber     // '+27113456789'
```
#### 4.6. Faker\Provider\en_US\Company
```javascript
catchPhrase             // 'Monitored regional contingency'
bs                      // 'e-enable robust architectures'
company                 // 'Bogan-Treutel'
companySuffix           // 'and Sons'
jobTitle                // 'Cashier'
```
#### 4.7. Faker\Provider\en_US\Text
```sql
realText($maxNbChars = 200, $indexSize = 2) // "And yet I wish you could manage it?) 'And what are they made of?' Alice asked in a shrill, passionate voice. 'Would YOU like cats if you were never even spoke to Time!' 'Perhaps not,' Alice replied."
```
#### 4.8. Faker\Provider\DateTime
```sql
dateTime($max = 'now', $timezone = null) // DateTime('2008-04-25 08:37:17', 'UTC')
dateTimeAD($max = 'now', $timezone = null) // DateTime('1800-04-29 20:38:49', 'Europe/Paris')
date($format = 'Y-m-d', $max = 'now') // '1979-06-09'
time($format = 'H:i:s', $max = 'now') // '20:49:42'
dayOfMonth($max = 'now')              // '04'
dayOfWeek($max = 'now')               // 'Friday'
month($max = 'now')                   // '06'
monthName($max = 'now')               // 'January'
year($max = 'now')                    // '1993'
timezone                              // 'Europe/Paris'
```
#### 4.9. Faker\Provider\Internet
```javascript
email                   // 'tkshlerin@collins.com'
safeEmail               // 'king.alford@example.org'
freeEmail               // 'bradley72@gmail.com'
companyEmail            // 'russel.durward@mcdermott.org'
freeEmailDomain         // 'yahoo.com'
safeEmailDomain         // 'example.org'
userName                // 'wade55'
password                // 'k&|X+a45*2['
```
#### 4.10. Faker\Provider\Color
```shell
hexcolor               // '#fa3cc2'
rgbcolor               // '0,255,122'
rgbColorAsArray        // array(0,255,122)
rgbCssColor            // 'rgb(0,255,122)'
safeColorName          // 'fuchsia'
colorName              // 'Gainsbor'
hslColor               // '340,50,20'
```
#### 4.11. Faker\Provider\Image
```javascript
imageUrl($width = 640, $height = 480) // 'http://lorempixel.com/640/480/'
imageUrl($width, $height, 'cats')     // 'http://lorempixel.com/800/600/cats/'
imageUrl($width, $height, 'cats', true, 'Faker') // 'http://lorempixel.com/800/400/cats/Faker'
imageUrl($width, $height, 'cats', true, 'Faker', true) // 'http://lorempixel.com/gray/800/400/cats/Faker/' Monochrome image
image($dir = '/tmp', $width = 640, $height = 480) // '/tmp/13b73edae8443990be1aa8f1a483bc27.jpg'
image($dir, $width, $height, 'cats')  // 'tmp/13b73edae8443990be1aa8f1a483bc27.jpg' it's a cat!
image($dir, $width, $height, 'cats', false) // '13b73edae8443990be1aa8f1a483bc27.jpg' it's a filename without path
image($dir, $width, $height, 'cats', true, false) // it's a no randomize images (default: `true`)
image($dir, $width, $height, 'cats', true, true, 'Faker') // 'tmp/13b73edae8443990be1aa8f1a483bc27.jpg' it's a cat with 'Faker' text. Default, `null`.
```
#### 4.12. Faker\Provider\Barcode
```shell
ean13          // '4006381333931'
ean8           // '73513537'
isbn13         // '9790404436093'
isbn10         // '4881416324'
```

Trên đây là những thuộc tính hay được sử dụng nhiều nhất của thư viện `Fakers` hy vọng có thể giúp bạn trong những vấn đề liên quan đến việc tạo những dữ liệu giả trong khi code.
Bạn cũng có thể tham khảo thêm một số thuộc tính khác của thư viện tại: https://github.com/fzaninotto/Faker