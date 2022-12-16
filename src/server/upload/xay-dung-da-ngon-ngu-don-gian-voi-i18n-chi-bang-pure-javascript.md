### 1_ Xây dựng API

Đặt vấn đề: một điều rõ ràng là bản dịch chỉ diễn ra ở phía front-end, không sử dụng gì ngoài Javascript và HTML đơn giản.
Trước khi bắt đầu xây dựng các tính năng cần thiết, cần tìm hiểu API sẽ trông như nào.

Ta có đoạn HTML như sau:

`<h1>This is some English title</h1>`

Nếu muốn dịch đoạn text trên, cách tốt nhất ở đây là gì? Trường hợp nếu đã làm việc với template engines là Handlerbars.js trước đó, có thể sẽ quen với cú syntax này:

`<h1>{{ title }}</h1>`

Khi thực thi đoạn code trên, nó sẽ thay thế title bằng một associated value (giá trị liên kết), được cung cấp bởi một vài kiểu loại đối tượng. Ngoài ra, một function có thể được đặt giữa các dấu ngoặc nhọn, như vậy ta có:

`<h1>{{ i18n('title') }}</h1>`

Trong đoạn code, function *i18n()* sẽ lấy một khoá làm chuỗi và trả về một bản dịch thích hợp. Template engine này sẽ thực thi function mỗi lần nó gặp nó trong template, kết quả sẽ là đoạn HTML được biên dịch.

Mặc dù cách tiếp cận này khá rõ ràng, nhưng thay vì sử dụng một template engines hoàn chỉnh như này, ta có thể dựa vào đó và thử theo cách của riêng mình. Thay vào đó, ta quyết định sẽ sử dụng HTML data atrributes:

`<h1 data-i18n="title">This is some English title</h1>`

Data atrributes là một phần của đặc tả HTML và là một cách tuyệt vời để cung cấp thêm custom data (tuỳ chỉnh dữ liệu) cho HTML. Đối với mỗi một phần tử HTML cần biên dịch, sẽ cung cấp một *data-i18n* attribute tương ứng là một khoá. Trong trường hợp này, title sẽ là khoá để tìm kiếm trong các tệp biên dịch và sẽ cho translator biết văn bản nào cần được áp dụng tương ứng.

### 2_ Các tệp biên dịch

Giờ có một cách để đánh dấu các phần tử HTML có thể dịch được, đó là tạo một tệp biên dịch tiếp đó. Trong project này, sẽ tạo một folder i18n và trong đó sẽ mỗi tệp *.json* tương ứng với một loại ngôn ngữ:
```
i18n
|—— en.json
|—— vi.json
|—— de.json
```
Trong mỗi tệp biên dịch sẽ như thế này:
```
{
  "greeting": "Hello World",
  "header": {
    "title": "This is the header text",
    "button": "Click me!"
  }
}
```
Cấu trúc trong các tệp này phải nhất quán. Không thể đặt một property (thuộc tính) cho header ở file này trùng với một heading nào đó ở file khác. Điều duy nhất có thể thay đổi là nội dung bản dịch.

Phần code trên khá đơn giản. Hãy tham khảo trong repos github nếu muốn xem một ví dụ thực tế lớn hơn ví dụ trên.

### 3_ Xây dựng trình biên dịch

**3.1_ Tạo base class:**

Chúng ta sẽ tạo một file mới gọi là *translator.js* trong folder Javascript. Việc đầu tiên cần làm là tạo một class mới gọi là *Translator*:
```
"use strict"
class Translator {
  constructor() {
  
  }
}
export default Translator;
```
Chúng ta có một class rỗng với một constructor (sẽ có hữu ích sau đó). Sau này khi muốn sử dụng chúng ta chỉ cần khai báo như sau:
```
import Translator from "./translator.js";
new Translator();
```

**3.2_  Xác định user's language (ngôn ngữ người dùng):**

Một trong những điều khá khó khăn là xác định ngôn ngữ nào người dùng muốn sử dụng nhất. Nếu đây là phía server-side (ví dụ: Node.js), mọi thứ sẽ trở nên dễ dàng hơn với việc sử dụng *Accept-Language HTTP Header*, chứa danh sách các ngôn ngữ bao gồm phân loại và bảng kê dựa trên sự yêu thích theo người dùng. Header này sẽ được gửi bởi trình duyệt. Thật không may, giao diện (front-end) luôn bị giới hạn và không có quyền truy cập vào headers. Vì thế, chúng ta sẽ cần dựa vào mảng *navigator.languages*, có chứa các ngôn ngữ yêu thích dựa vào browser settings. Thử mở trình duyệt và vào phần dev tool, bất cứ trình duyệt nào, nhập *navigator.languages* và nhấn Enter. Nó sẽ trả về một mảng tương tự như sau:

```
navigator.languages
(4) ["en-US", "en", "vi-VI", "vi"]
```
Với thông tin trên, chúng ta có thể viết trước một đoạn phương thức trong class *Translator* như sau:
```
getLanguage() {
  var lang = navigator.languages ? navigator.languages[0] : navigator.language;
  
  return lang.substr(0, 2);
}
```
Đầu tiên là khai báo một biến *lang*. Giá trị được gán của nó sẽ phụ thuộc vào việc mảng *navigator.languages* có tồn tại hay không. Đối với một số trình duyệt cũ hơn thì có thể không, vì thế cần có một fallback thích hợp. Với trường hợp trên, *navigator.language* (lưu ý là thiếu "s" ở cuối) sẽ được gán sẵn, chứa một chuỗi kiểu như en-US.

Với việc mảng *navigator.languages* luôn sẵn có ở các trình duyệt đời mới, ta sẽ có chỉ mục đầu tiên và gán nó cho  biến *lang*.

Tiếp theo là cần xem xét chuỗi language này có luôn cùng một định dạng hay không. Có thể là *en-US* hoặc chỉ là *en*. Cần xem xét điều này khi đánh giá chuỗi. Do đó, sử dụng *substr(0,2)*, nghĩa là chỉ trả về 2 kí tự đầu tiên. nếu value là *en-US*, chỉ en được trả về. Nếu value ban đầu là *en*, thì giá trị return không đổi.

Lưu trữ thông tin trong class *Translator* và nơi tốt nhất là trong *constructor*:
```
constructor() {
  this._lang = this.getLanguage();
}
```

**3.3_ Loading các tệp ngôn ngữ:**

Sau khi lựa chọn được ngôn ngữ thích hợp để hiển thị đầu tiên, chúng ta có thể tải tệp ngôn ngữ liên quan và sử dụng data của nó. Thêm một phương thức mới vào class *Translator*:
```
load(lang = null) {
  if (lang) {
    this._lang = lang;
  }
}
```
Chấp nhận một parameter (tham số) *lang* trong phương thức này, vì user sẽ muốn switch language bằng action button hoặc một cái gì đó. Trong trường hợp đó, ta gọi *translator.load('en')* để biên dịch page. Nhưng theo mặc định thì atrribute *lang* không được set, nghĩa là có thể sử dụng bất kì thứ gì được đặt trong *this.lang* bằng cách phát hiện ngôn ngữ sử dụng như ở trên. Dưới hàm *if*, thêm đoạn code sau:
```
fetch(`/i18n/${this._lang}.json`)
  .then((res) => res.json())
  .then((translation) => {
    // do something
  })
  .catch(() => {
    console.error(`Could not load ${this._lang}.json.`));
  });
```
Sử dụng *Fetch API* sẽ bắt được chính xác file language cần và xử lý dưới dạng JSON. Content của nó sẽ hiển thị trong lần call back .then tiếp đó. 

*Lưu ý: nếu không đặt folter i18n trong folder root mà lại ở sub folder thì cần phải thay đổi lại đường dẫn cho phù hợp.*

Nếu file không tồn tại, promise sẽ fail và *.catch* được gọi lại, log lại lỗi. Việc xử lý error handling sẽ để sau. Thay vào đó, giả định rằng file đã được load và chúng ta đã có quyền truy cập vào phần object chứa tất cả các đoạn text. Bược tiếp theo là biên dịch HTML page. Bên trong *.then callback function* add đoạn code như sau:

```
.then((translation) => {
  this.translate(translation);
})
```

**3.4_  Translating the page:**

Về cơ bản, cần phải:
- Lặp lại tất cả các phần từ HTML với atrribute là *data-i18n* và lấy khoá dịch (translation key).
- Khớp key với một chỉ mục trong file biên dịch.
- Thay thế các phần tử HTML văn bản bằng bản biên dịch được tìm thấy.

Nhưng hiện tại chưa có list các phần tử HTML với atrribute *data-i18n*. Quay trở lại *constructor* và thêm đoạn code sau:
```
constructor() {
  this._lang = this.getLanguage();
  // This is new:
  this._elements = document.querySelectorAll("[data-i18n]");
}
```
Sử dụng *querySelectorAll* để chọn tất cả các phần tử có atrribute đã nói ở trên. Một thêm chiếu đến một NodeList sẽ được lưu trữ trong *this.elements*, để nó có thể truy cập được toàn bộ class. Quay lại phương thức *translate* vừa nãy và thêm đoạn *forEach* sau:
```
translate(translation) {
  this._elements.forEach((element) => {
    ..
  });
}
```
Như vậy sẽ lặp lại qua từng phần tử với atrribute *data-i18n*. Bên trong hàm callback, xác định điều gì sẽ xảy ra với phần tử này, hãy tiếp tục như sau:

```
var keys = element.dataset.i18n.split(".");
var text = keys.reduce((obj, i) => obj[i], translation);
if (text) {
  element.innerHTML = text;
}
```
Chuyện gì đang xảy ra?

Ở dòng thứ nhất, khai báo một biến mới với tên là *keys*. *keys* sẽ được gán một mảng là kết quả của phương thức .*split(".")*. Những gì cần làm là phân chia các value bất cứ khi nào có xuất hiện dấu ".". Ví dụ: *data-i18n = "header.title"* sẽ trả về kết quả là mảng  *["header", "title"]*. Tiếp đó, sẽ khó hơn vì liên quan đến *reduce*. Ở đây chúng ta map các mảng *keys* đến một thuộc trính trong translation object và lưu trữ giá trị của nó. Sau đó, chỉ khi chuỗi key khớp với bất cứ thứ gì trong object, thì sẽ ghi đè phần tử HTML bằng bản text mới từ file biên dịch.

Quay trở lại dòng thứ hai, vấn đề là data atrribute của chúng ta sẽ là kiểu như *header.title*. Giờ phải map đến đúng thuộc tính trong nested object, phải không?
```
{
  header: {
    title: "The precious text to look for"
  }
}
```
Sẽ thấy khá quen thuộc với hai cách truy cập thuộc tính này trong objects:
```
obj["title"]
obj.title
```
Vì là nested object nên nếu viết là *obj["header.title"]* nó sẽ trả về undefined. vì thế cần convert chuỗi header.title thành một mảng. Bằng việc sử dụng phương thức *reduce*, chúng ta có thể lặp hai giá trị này trong một mảng:

```
["header", "title"].reduce((obj, i) => obj[i], translation);
```
- Reduce sẽ chạy một lần với mỗi giá trị trong mảng. Trong ví dụ này, nó chạy hai lần. 
- Với tham số thứ hai - *translation*. là giá trị ban đầu của obj. Điều này chỉ đúng với lần lặp đầu tiên. 
- Vì thế, với lần chạy đầu tiên, obj trong function callback sẽ tương ứng với đối tượng *translation* và *i* sẽ tương ứng với *"header"*. 
- Trong function callback, chỉ cần trả về *obj[i]*. Trong trường hợp này, nó là *obj["header"]*. Điều này tương ứng với sub object {` title: "The precious text to look for" }`. Có thể viết như này để thấy rõ ràng hơn:

```
["header", "title"].reduce(function(obj, i) {
  return obj[i];
}, translation);
```
- Reduce tích luỹ giá trị của một mảng. Vì thế đã trả về object `{ title: "The precious text to look for" }` trong lần lặp đầu tiên. Đây sẽ là giá trị của obj trong lần lặp thứ hai. Giá trị của *i* trong lần này sẽ tương ứng với *"title"*.
- Chúng ta thực hiện function với lần hai tương ứng. Giờ sẽ trả về *obj["title"]*, trong đó, nếu bạn còn nhớ cấu trúc đối tượng, và trả về chuỗi *"The precious text to look for"*.
- Vì đây là lần lặp cuối cùng (chúng ta chỉ có hai items trong mảng), phương thức reduce sẽ trả về giá trị này và sau đó chúng ta sẽ lưu trữ trong một biến là *"text"* - hiện tại sẽ tương ứng với đoạn chuỗi *The precious text to look for*.
- Cuối cùng, sau khi đặt được mục tiêu, chúng ta có thể gọi phương thức *load("en")* và nó sẽ load các bản biên dịch phù hợp từ thư mục, sau đó apply content vào đoạn HTML cần biên dịch. Khá gọn gàng, phải không?

**3.5_ Thay đổi atrribute "*lang*":**

Một trong những điều cuối cùng cần làm để cải thiện đoạn script là luôn update *lang* atrribute mỗi lần thay đổi ngôn ngữ:
```
toggleLangTag() {
  if (document.documentElement.lang !== this._lang) {
    document.documentElement.lang = this._lang;
  }
}
```
Set mặc định phần tử này trên đầu trang web của bạn. Điều này là để thay đổi thuộc tính *lang*:

`<html lang="en">`
    
### 4_ Nhận xét
    
- Trong lần lặp đầu tiên của đoạn script trên, tác giả đã không sử dụng fetch để load các file biên dịch, nhưng lại chia code thông qua các function được gọi trong các modules (dynamic import - import()). Sau khi nhận được feedback, tác giả đã thay đổi vì việc fetch data sẽ chính xác hơn về mặt ngữ nghĩa. Javascript imports nên dành cho các module hoặc các loaded logic có điều kiện, chứ không phải các resources.
- Attribute *data-i18n* có thể là bất cứ thứ gì. Nếu không thích cái tên này, có thể đặt là *data-translation* hoặc gì đó theo ý thích và thay đổi code liên quan trong *constructor* (hàm khởi tạo).
- Sử dụng innerHTML để ghi đè nội dung văn bản khi dịch. Có một số cho rằng làm vậy là không tốt vì có thể dẫn đến việc thực thi script không được an toàn trong HTML. Mặc dù argument (đối số) này đúng nếu load data từ server hoặc lấy data từ user (nơi mà sẽ không biết nhận lại được gì), nhưng ở trong trường hợp này đã biết rõ data đến từ đâu và không phải sợ bất kì thẻ script nào ẩn bên trong. 
- Nếu muốn biên dịch trang web của mình khi tải trang, chỉ cần gọi *translator.load()* (mà không phải chuyển bất kỳ language parameter nào).
    
### 5_ Kết luận
    
Nếu muốn sử dụng đoạn script này trong project của mình, chỉ cần import class Translator, khởi tạo nó và gọi đến phương thức *load()*:
```
import Translator from "./translator.js";
var translator = new Translator();
translator.load("de");
```
Việc gọi hàm load này có thể nằm trong event handler, ví dụ sau khi người dùng lựa chọn language từ dropdown hay từ một dạng nào đó. [Ví dụ cụ thể](https://codesandbox.io/s/i18n-example-vds8o).

Link [github](https://github.com/andreasremdt/simple-translator) để thuận tiện cho việc sử dụng thư viện này trong project riêng. 
Happy coding!
    
Tài liệu tham khảo [tại đây](https://codeburst.io/translating-your-website-in-pure-javascript-98b9fa4ce427)