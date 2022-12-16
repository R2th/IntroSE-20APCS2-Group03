Tiếp tục với các kiểu dữ liệu

### Chuỗi
Chuỗi trong Dart là một chuỗi các đơn vị mã UTF-16. Bạn có thể sử dụng dấu ngoặc đơn hoặc dấu ngoặc kép để tạo chuỗi:

```
var s1 = 'Single quotes work well for string literals.';
var s2 = "Double quotes work just as well.";
var s3 = 'It\'s easy to escape the string delimiter.';
var s4 = "It's even easier to use the other delimiter.";
```

Bạn có thể đặt giá trị của một biểu thức bên trong một chuỗi bằng cách sử dụng ${ expression } . Nếu biểu thức là định danh, bạn có thể bỏ qua {}. Để có được chuỗi tương ứng với một đối tượng, Dart gọi phương thức toString() của đối tượng.

```
var s = 'string interpolation';

assert('Dart has $s, which is very handy.' ==
    'Dart has string interpolation, ' +
        'which is very handy.');
assert('That deserves all caps. ' +
        '${s.toUpperCase()} is very handy!' ==
    'That deserves all caps. ' +
        'STRING INTERPOLATION is very handy!');
```
> Lưu ý: Toán tử == kiểm tra xem hai đối tượng có tương đương không. Hai chuỗi tương đương nếu chúng chứa cùng một chuỗi các đơn vị mã.

Bạn có thể nối chuỗi bằng chuỗi ký tự chuỗi liền kề hoặc toán tử + :

```
var s1 = 'String '
    'concatenation'
    " works even over line breaks.";
assert(s1 ==
    'String concatenation works even over '
        'line breaks.');

var s2 = 'The + operator ' + 'works, as well.';
assert(s2 == 'The + operator works, as well.');
```
Một cách khác để tạo một chuỗi nhiều dòng: sử dụng một trích dẫn ba với dấu ngoặc kép đơn hoặc kép:

```
var s1 = '''
You can create
multi-line strings like this one.
''';

var s2 = """This is also a
multi-line string.""";
```
Bạn có thể tạo một chuỗi thô bằng cách đặt tiền tố với r :

```
var s = r'In a raw string, not even \n gets special treatment.';
```
Xem thêm [Runes](https://dart.dev/guides/language/language-tour#runes) để biết chi tiết về cách thể hiện các ký tự Unicode trong một chuỗi.

Các chuỗi ký tự là các hằng số thời gian biên dịch, miễn là bất kỳ biểu thức nội suy nào là hằng số thời gian biên dịch ước tính thành null hoặc giá trị số, chuỗi hoặc boolean.

```
// These work in a const string.
const aConstNum = 0;
const aConstBool = true;
const aConstString = 'a constant string';

// These do NOT work in a const string.
var aNum = 0;
var aBool = true;
var aString = 'a string';
const aConstList = [1, 2, 3];

const validConstString = '$aConstNum $aConstBool $aConstString';
// const invalidConstString = '$aNum $aBool $aString $aConstList';
```
Để biết thêm thông tin về việc sử dụng chuỗi, hãy xem [Chuỗi và Regx](https://dart.dev/guides/libraries/library-tour#strings-and-regular-expressions).

### Booleans
Để biểu thị các giá trị boolean, Dart có một loại có tên là bool . Chỉ có hai đối tượng có kiểu bool: *true* và *false* , cả hai đều là hằng số thời gian biên dịch.

Vì Dart là ngôn ngữ type-safe nên bạn không thể sử dụng code kiểu *if (nonbooleanValue)* hoặc *assert(nonbooleanValue)* . Thay vào đó, hãy kiểm tra rõ ràng các giá trị, như thế này:

```
// Check for an empty string.
var fullName = '';
assert(fullName.isEmpty);

// Check for zero.
var hitPoints = 0;
assert(hitPoints <= 0);

// Check for null.
var unicorn;
assert(unicorn == null);

// Check for NaN.
var iMeantToDoThis = 0 / 0;
assert(iMeantToDoThis.isNaN);
```

### Danh sách
Có lẽ bộ sưu tập phổ biến nhất trong gần như mọi ngôn ngữ lập trình là mảng hoặc nhóm đối tượng được sắp xếp. Trong Dart, mảng là các đối tượng List , vì vậy hầu hết mọi người chỉ gọi chúng là danh sách .

Danh sách trong Dart giống như mảng JavaScript. Đây là một danh sách đơn giản:

```
var list = [1, 2, 3];
```
> Lưu ý: Dart định kiểu đối tượng list ở trên là loại List<int> . Nếu bạn cố gắng thêm các đối tượng không nguyên vào danh sách này, bộ phân tích sẽ báo lỗi hoặc sẽ phát sinh lỗi trong quá trình chạy. Để biết thêm thông tin, đọc về [Suy luận loại](https://dart.dev/guides/language/sound-dart#type-inference).

Danh sách sử dụng zero-base index, trong đó 0 là chỉ mục của phần tử đầu tiên và list.length - 1 là chỉ mục của phần tử cuối cùng. Bạn có thể nhận được độ dài của danh sách và tham khảo các yếu tố danh sách giống như trong JavaScript:

```
var list = [1, 2, 3];
assert(list.length == 3);
assert(list[1] == 2);

list[1] = 1;
assert(list[1] == 1);
```
Để tạo danh sách là hằng số thời gian biên dịch, hãy thêm const trước danh sách bằng chữ:

```
var constantList = const [1, 2, 3];
// constantList[1] = 1; // Uncommenting this causes an error.
```
Dart 2.3 đã giới thiệu toán tử trải rộng ( ... ) và toán tử trải rộng nhận biết null ( ...? ), Cung cấp một cách ngắn gọn để chèn nhiều phần tử vào một bộ sưu tập.

Ví dụ: bạn có thể sử dụng toán tử trải ( ... ) để chèn tất cả các thành phần của danh sách vào danh sách khác:

```
var list = [1, 2, 3];
var list2 = [0, ...list];
assert(list2.length == 4);
```
Nếu biểu thức ở bên phải của toán tử trải rộng có thể là null, bạn có thể tránh các ngoại lệ bằng cách sử dụng toán tử trải rộng nhận biết null ( ...? ):

```
var list;
var list2 = [0, ...?list];
assert(list2.length == 1);
```
Để biết thêm chi tiết và ví dụ về việc sử dụng toán tử trải, hãy xem [đề xuất toán tử trải](https://github.com/dart-lang/language/blob/master/accepted/2.3/spread-collections/feature-specification.md).

Dart 2.3 cũng giới thiệu bộ sưu tập *if* và bộ sưu tập *for* , mà bạn có thể sử dụng để xây dựng bộ sưu tập bằng cách sử dụng điều kiện ( if ) và lặp lại ( for ).

Đây là một ví dụ về việc sử dụng bộ sưu tập if để tạo một danh sách có ba hoặc bốn mục trong đó:

```
var nav = [
  'Home',
  'Furniture',
  'Plants',
  if (promoActive) 'Outlet'
];
```
Đây là một ví dụ về việc sử dụng bộ sưu tập for để thao tác các mục của danh sách trước khi thêm chúng vào danh sách khác:

```
var listOfInts = [1, 2, 3];
var listOfStrings = [
  '#0',
  for (var i in listOfInts) '#$i'
];
assert(listOfStrings[1] == '#1');
```
Để biết thêm chi tiết và ví dụ về việc sử dụng bộ sưu tập if và for, hãy xem [đề xuất bộ sưu tập luồng điều khiển](https://github.com/dart-lang/language/blob/master/accepted/2.3/control-flow-collections/feature-specification.md).

Kiểu Danh sách có nhiều phương thức tiện dụng để thao tác. Để biết thêm thông tin về danh sách, xem [Generics](https://dart.dev/guides/language/language-tour#generics) và [Bộ sưu tập](https://dart.dev/guides/libraries/library-tour#collections) .

### Sets
Một set trong Dart là một bộ sưu tập các item độc nhất. 

> Lưu ý về phiên bản: Mặc dù kiểu Set luôn là một phần cốt lõi của Dart, nhưng set mới chỉ được giới thiệu trong Dart 2.2.

Đây là một set đơn giản, được tạo bằng cách sử dụng một bộ chữ:

```
var halogens = {'fluorine', 'chlorine', 'bromine', 'iodine', 'astatine'};
```
> Lưu ý: Dart định kiểu đối tượng halogens ở trên là loại Set<String> . Nếu bạn cố gắng thêm các đối tượng không phải là kiểu String vào set này, bộ phân tích sẽ báo lỗi hoặc sẽ phát sinh lỗi trong quá trình chạy. Để biết thêm thông tin, đọc về [Suy luận loại](https://dart.dev/guides/language/sound-dart#type-inference).

Để tạo một set rỗng, sử dụng {} trước một đối số loại hoặc gán {} cho một biến loại Set :

```
var names = <String>{};
// Set<String> names = {}; // This works, too.
// var names = {}; // Creates a map, not a set.
```
> Set hay Map? Cú pháp cho Map tương tự như cú pháp cho Set. Vì Map xuất hiện đầu tiên, {} mặc định là loại Map . Nếu bạn quên chú thích loại trên {} hoặc biến được gán cho nó, thì Dart sẽ tạo một đối tượng thuộc loại Map<dynamic, dynamic> .

Thêm các mục vào một Set hiện có bằng cách sử dụng các phương thức add() hoặc addAll() :

```
var elements = <String>{};
elements.add('fluorine');
elements.addAll(halogens);
```
Sử dụng .length để lấy số lượng item trong Set:

```
var elements = <String>{};
elements.add('fluorine');
elements.addAll(halogens);
assert(elements.length == 5);
```
Để tạo một Set đó là hằng số thời gian biên dịch, hãy thêm const:

```
final constantSet = const {
  'fluorine',
  'chlorine',
  'bromine',
  'iodine',
  'astatine',
};
// constantSet.add('helium'); // Uncommenting this causes an error.
```
Kể từ Dart 2.3, Sets hỗ trợ toán tử trải rộng ( ... và ...? ) và bộ sưu tập *if* và *for*, giống như List.

Để biết thêm thông tin về các bộ, xem [Generics](https://dart.dev/guides/language/language-tour#generics) và [Set](https://dart.dev/guides/libraries/library-tour#sets) .

### Map
Nói chung, Map là một đối tượng liên kết các khóa và giá trị. Cả khóa và giá trị có thể là bất kỳ loại đối tượng nào. Mỗi khóa chỉ xảy ra một lần, nhưng bạn có thể sử dụng cùng một giá trị nhiều lần.

Dưới đây là một vài Map đơn giản:

```
var gifts = {
  // Key:    Value
  'first': 'partridge',
  'second': 'turtledoves',
  'fifth': 'golden rings'
};

var nobleGases = {
  2: 'helium',
  10: 'neon',
  18: 'argon',
};
```
> Lưu ý: Dart tự định nghĩa *gifts* có loại Map<String, String> và *nobleGases* có loại Map<int, String> . Nếu bạn cố thêm loại giá trị sai vào một trong hai Map, bộ phân tích sẽ báo lỗi hoặc sẽ phát sinh lỗi trong quá trình chạy. Để biết thêm thông tin, đọc về [Suy luận loại](https://dart.dev/guides/language/sound-dart#type-inference).

Bạn có thể tạo các đối tượng tương tự bằng cách sử dụng hàm tạo Map:

```
var gifts = Map();
gifts['first'] = 'partridge';
gifts['second'] = 'turtledoves';
gifts['fifth'] = 'golden rings';

var nobleGases = Map();
nobleGases[2] = 'helium';
nobleGases[10] = 'neon';
nobleGases[18] = 'argon';
```
> Lưu ý: Bạn có thể thấy new Map() thay vì chỉ Map() . Kể từ Dart 2, từ khóa new là tùy chọn. Để biết chi tiết, xem [Sử dụng constructor](https://dart.dev/guides/language/language-tour#using-constructors).

Thêm cặp khóa-giá trị mới vào Map hiện có giống như trong JavaScript:

```
var gifts = {'first': 'partridge'};
gifts['fourth'] = 'calling birds'; // Add a key-value pair
```
Lấy một giá trị từ Map giống như cách bạn làm trong JavaScript:

```
var gifts = {'first': 'partridge'};
assert(gifts['first'] == 'partridge');
```
Nếu bạn tìm kiếm một khóa không có trong Map, bạn sẽ nhận được một giá trị null:

```
var gifts = {'first': 'partridge'};
assert(gifts['fifth'] == null);
```
Sử dụng .length để lấy số lượng cặp khóa-giá trị trong Map:

```
var gifts = {'first': 'partridge'};
gifts['fourth'] = 'calling birds';
assert(gifts.length == 2);
```
Để tạo một Map là hằng số thời gian biên dịch, hãy thêm const:

```
final constantMap = const {
  2: 'helium',
  10: 'neon',
  18: 'argon',
};

// constantMap[2] = 'Helium'; // Uncommenting this causes an error.
```
Kể từ Dart 2.3, Map hỗ trợ các toán tử trải rộng ( ... và ...? ) và bộ sưu tập if và for, giống như các danh sách.

Để biết thêm thông tin về bản đồ, xem [Generics](https://dart.dev/guides/language/language-tour#generics) và [Maps](https://dart.dev/guides/libraries/library-tour#maps) .

### Rune
Trong Dart, rune là các điểm mã UTF-32 của một chuỗi.

Unicode xác định một giá trị số duy nhất cho mỗi chữ cái, chữ số và ký hiệu được sử dụng trong tất cả các hệ thống chữ viết của thế giới. Bởi vì chuỗi Dart là một chuỗi các đơn vị mã UTF-16, việc thể hiện các giá trị Unicode 32 bit trong một chuỗi đòi hỏi cú pháp đặc biệt.

Cách thông thường để thể hiện điểm mã Unicode là \uXXXX , trong đó XXXX là giá trị thập lục phân 4 chữ số. Ví dụ: ký tự trái tim (♥) là \u2665 . Để chỉ định nhiều hơn hoặc ít hơn 4 chữ số hex, đặt giá trị trong dấu ngoặc nhọn. Ví dụ: biểu tượng cảm xúc cười (😆) là \u{1f600} .

Lớp String có một số thuộc tính bạn có thể sử dụng để trích xuất thông tin rune. Các thuộc tính codeUnit và codeUnit trả về các đơn vị mã 16 bit. Sử dụng thuộc tính runes để có được rune của một chuỗi.

Ví dụ sau minh họa mối quan hệ giữa các rune, đơn vị mã 16 bit và điểm mã 32 bit.
```
main() {
  var clapping = '\u{1f44f}';
  print(clapping);
  print(clapping.codeUnits);
  print(clapping.runes.toList());

  Runes input = new Runes(
      '\u2665  \u{1f605}  \u{1f60e}  \u{1f47b}  \u{1f596}  \u{1f44d}');
  print(new String.fromCharCodes(input));
}
```

> Lưu ý: Cẩn thận khi thao tác rune bằng cách sử dụng danh sách hoạt động. Cách tiếp cận này có thể dễ dàng phá vỡ, tùy thuộc vào ngôn ngữ cụ thể, bộ ký tự và thao tác. Để biết thêm thông tin, hãy xem [Làm cách nào để đảo ngược Chuỗi trong Dart](http://stackoverflow.com/questions/21521729/how-do-i-reverse-a-string-in-dart)? trên Stack Overflow.

### Biểu tượng
Một đối tượng Biểu tượng đại diện cho một toán tử hoặc mã định danh được khai báo trong chương trình Dart. Bạn có thể không bao giờ cần sử dụng các ký hiệu, nhưng chúng là vô giá đối với các API tham chiếu đến các mã định danh theo tên, bởi vì thu nhỏ thay đổi tên định danh nhưng không phải là ký hiệu định danh.

Để lấy ký hiệu cho mã định danh, hãy sử dụng ký hiệu bằng chữ, chỉ # theo sau là mã định danh:

```
#radix
#bar
```
Biểu tượng chữ là hằng số thời gian biên dịch.

Còn tiếp