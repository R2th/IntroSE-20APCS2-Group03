Trong bài này, chúng ta sẽ nói về một kiểu dữ liệu mới đó là Hàm `function` và một khái niệm liên quan được gọi là  Vùng `scope`. 

> Hàm là kiểu dữ liệu hạnh phúc nhất trong hầu hết các ngôn ngữ lập trình.  
> *_Một người từng học lập trình*

Bạn không đọc nhầm đâu, mình thực sự đang nói `function` khiến người viết code cảm thấy hạnh phúc. :D

## Tại sao lại như vậy?

Từ `hàm`, hay nguyên gốc là `function` trong nhiều ngôn ngữ lập trình, thực ra là một lỗi đánh máy được thực hiện bởi một trong những lập trình viên đầu tiên trên thế giới. Tên nguyên bản của kiểu dữ liệu này là `action` hay có nghĩa là `hành động`, trước khi lỗi đánh máy kia được phổ biến trong tài liệu lập trình và truyền đi khắp thế giới. Đâu đó trong dòng chảy thời gian tới sau này thì người ta bắt đầu nghĩ rằng: "kiểu dữ liệu này chắc là có gì đó liên quan tới toán học"; Và bắt đầu sử dụng nó theo kiểu của các hàm toán học. Chúng ta hãy cuộn ngược lại cuốn lịch một chút và nói về kiểu dữ liệu này trên phương diện hành động `action`. :D

Nếu như bạn thực hành một vài phong cách sống Zen hay thiền động, thì bạn cũng biết rõ là bất kỳ tác vụ `đơn giản` nào trong cuộc sống của chúng ta cũng sẽ đem lại cảm giác có sự hoàn thành, có kiểm soát, và an lạc nội tâm, hay nói cách khác là `hạnh phúc`. Do được ảnh hưởng sâu đậm bởi phong cách Zen, các lập trình viên đầu tiên của chúng ta đã quyết định mang ý tưởng này vào công việc lập trình. Lý tưởng ở đây là cho phép người viết code có thể chia nhỏ các tác vụ `phức tạp` thành các hành động `đơn giản`. Điều này hiển nhiên là tốt, phải không? :D Bởi vì tất cả chúng ta đều biết là một tác vụ phức tạp sẽ hiếm khi đem lại cảm giác tốt lành. :D

## Sử dụng `function` trong JavaScript

Và như vậy, để định nghĩa một hành động trong JavaScript thì từ khóa bị đánh máy nhầm được sử dụng. :D

```action.js
function actionName() {
   // một vài câu lệnh sẽ được viết ở đây
}
```

Tất cả các câu lệnh được đặt bên trong cặp ngoặc xoắn `{}` sẽ không được thực thi cho đến khi `function` được phát động, hay được gọi.

```action.js
function drink() {
   console.log('Nhấc một tách trà lên.');
   console.log('Khẽ cúi đầu với tâm thái cảm ơn.');
   console.log('Uống chậm rãi...');
}

// thực hiện hành động
drink();
```

Bạn có nhớ cặp ngoặc đơn `()` mà chúng ta đã nhắc đến trong bài viết đầu tiên giới thiệu về JavaScript không? Chính là nó đó! Từ khóa `log` mà chúng ta đã sử dụng trong câu lệnh JavaScript đầu tiên chính là tên của một hành động; Và chủ thể thực hiện hành động đó là `console`. Điểm khác biệt duy nhất ở đây là chúng ta đã không đặt bất kỳ thứ gì giữa các dấu ngoặc đơn `()` khi phát động `drink`.

## Phát động với chất liệu

Hãy thử xem ví dụ sau hoạt động như thế nào. Chúng ta sẽ phát động `drink` 2 lần với các thức uống khác nhau.

```drink.js
function drink() {
   console.log('Nhấc một tách trà lên.');
   console.log('Khẽ cúi đầu với tâm thái cảm ơn.');
   console.log('Uống chậm rãi...');
}

drink('nước');
drink('lavie');
```

Kết quả hiển thị trong cửa sổ console của bạn như thế nào? Vẫn đang uống `trà` phải không? :D Đó là bởi vì phần code định nghĩa `drink` đã không tiếp nhận vào các thức uống được cung cấp bên dưới. Hãy cập nhật lại phần code định nghĩa một chút.

```drink.js
function drink(container, liquid) {
   console.log('Nhấc một ' + container + ' ' + liquid + ' lên.');
   console.log('Khẽ cúi đầu với tâm thái cảm ơn.');
   console.log('Uống chậm rãi...');
}

drink('ly', 'nước');
drink('chai', 'lavie');
```

Các `biến` được đặt giữa cặp ngoặc đơn `()` thường được gọi là các tham số `parametters`, còn các giá trị được truyền vào ở các câu lệnh phát động `drink` thường được gọi là các đối số `arguments`, đều là những từ được vay mượn từ toán học. Tuy nhiên thì ở đây chúng ta sẽ giữ nguyên cách gọi là biến và giá trị, bởi vì chúng đơn giản chỉ là như vậy thôi. :D

##  Chỉ một chút từ toán học

Vậy là chỉ vì một lỗi đánh máy nhỏ đã khiến cả thế giới đều nghĩ tới thứ gì đó liên quan tới toán học mỗi khi kiểu dữ liệu này được nhắn tới. Điều đó thực sự đã khiến cho nhiều coder sáng tạo bỏ cuộc ngay khi họ mới bắt đầu suy nghĩ về việc học lập trình. Tuy nhiên thì với việc vay mượn các ý tưởng từ toán học, kiểu dữ liệu này đã có được một tính năng tuyệt vời.

Quay trở lại với khái niệm căn bản của `function`, nó cho phép chúng ta chia nhỏ một tác vụ phức tạp thành nhiều hành động đơn giản. Vậy, việc thực hiện thao tác tính toán cũng là một hành động và đôi khi chúng ta sẽ muốn thực hiện một tác vụ nào đó như thế này.

```action.js
var content = getArticleContent();
var excerpt = makeExcerpt(content);
putExcerptBackToWebpage(excerpt);
```

Tác vụ chính lúc này trông rất rõ ràng và rất dễ để đoán được code đang thực hiện công việc gì, bởi vì chúng ta đã di chuyển tất cả các chi tiết vào các `function`:

- Lệnh phát động `getArticleContent` đầu tiên `trả về một giá trị` nào đó và kết quả được lưu vào biến `content`.
- Lệnh phát động `makeExcerpt` trong dòng thứ hai cũng `trả về một giá trị` nào đó và kết quả được lưu vào biến `excerpt`.
- ...

Đúng là như vậy, một lời gọi hàm có thể `trả về một giá trị` nào đó. Và ý tưởng này được vay mượn từ toán học. Để tạo ra một hàm có thể trả về một giá trị, chúng ta sử dụng một câu lệnh `return` ở vị trí cuối cùng trong phần code định nghĩa hàm.

```return.js
function sum(x, y) {
   var result = x + y;
   return result;
}

var nine = sum(3, 6);
console.log(nine);
// result: 9
```

Và tất cả những thứ chúng ta vừa nói chỉ là để giới thiệu từ khóa `return`. Không có bất kỳ thứ gì khác của toán học liên quan ở đây nữa. Chỉ có một lưu ý nhỏ về câu lệnh `return` mà chúng ta nên ghi lại; Đó là, một khi câu lệnh này được chạm tới, thì `function` đó sẽ dừng hoạt động và các câu lệnh phía sau lệnh `return` trong phần code định nghĩa sẽ được bỏ qua.

```whisper.js
function whisper() {
   console.log('As the bee whispers among the leaves');
   console.log('so the whispering of meditation is action.');
   return 'nothing';
  
   console.log('Câu lệnh này sẽ được bỏ qua.');
}

whisper();
```

## Function là một kiểu dữ liệu

Phần này chỉ là để nhắc lại cách sử dụng cơ bản nhất của `function` trước khi chúng ta nói về khái niệm Vùng `scope`.

Bởi vì `function` là một Kiểu, điều đó có nghĩa là chúng ta có thể coi một `function` là một giá trị. Thay vì định nghĩa một `function` có tên thì chúng ta có thể lưu trữ một `function` không tên trong một biến như thế này.

```action.js
var whisper = function() {
   /* ... */
};

whisper();
```

Chúng ta cũng có thể tryền một `function` như một giá trị khi phát động một `function` khác.

```actions.js
function drink(container, liquid) {
   console.log('Nhấc một ' + container + ' ' + liquid + ' lên.');
   console.log('Khẽ cúi đầu với tâm thái cảm ơn.');
   console.log('Uống chậm rãi...');
}

function whisper(just) {
   console.log('As the bee whispers among the leaves');
   console.log('so the whispering of meditation is action.');
   just('ly', 'trà');
}

whisper(drink);
```

Với cách sử dụng này, hàm `whisper` có thể trả về nhiều hơn 1 giá trị khi được phát động. Trong nhiều tình huống, cách sử dụng này có thể sẽ phù hợp hơn so với việc sử dụng một câu lệnh `return`.

Chưa hết. Nếu chúng ta có thể sử dụng một hàm làm giá trị để truyền vào một lời gọi hàm, vậy có lẽ chúng ta cũng có thể sử dụng một hàm như một giá trị trả về sau một lời gọi hàm. :D

```action.js
function drink(container) {
   return function(liquid) {
      console.log('Nhấc một ' + container + ' ' + liquid + ' lên.');
      console.log('Khẽ cúi đầu với tâm thái cảm ơn.');
      console.log('Uống chậm rãi...');
   };
} // drink

var drinkOneCup = drink('ly');
drinkOneCup('nước');
drinkOneCup('trà');
```

Với cách sử dụng như trên thì chúng ta có thể tạo ra một hàm mới từ hàm ban đầu được gắn cố định với một giá trị truyền vào; Như vậy sẽ rất thuận tiện nếu như chúng ta cần lặp thao tác gọi hàm nhiều lần với một trong số các giá trị cần cung cấp được cố định.

## Khái niệm Vùng `scope`

Phần chính của bài viết thì chúng ta đã hoàn thành rồi. Đây chỉ là một khái niệm đơn giản liên quan tới Hàm và Biến. Chúng ta sẽ lướt qua nhanh thôi. Hãy cùng xem xét ví dụ sau.

```scope.js
function just() {
   var box = 'something';
}

console.log(box);
// result: undefined
```

Chúng ta đã tạo ra một biến `box` bên trong hàm `just` và cố gắng sử dụng biến này ở bên ngoài; Máy tính đã không thể tìm thấy biến `box` ở câu lệnh `console.log` và in ra kết quả là biến chưa được định nghĩa `undefined`. Nói cách khác, Phạm Vi hay Vùng hoạt động của biến `box` được bảo vệ bởi hàm `just` và chỉ được nhìn thấy bên trong hàm.

Lưu ý thứ hai về khái niệm `scope` đó là một hàm sẽ luôn cố gắng ưu tiên việc sử dụng các biến bên trong phạm vi của hàm đó.

```scope.js
var box = 'bên ngoài';

function just() {
   var box = 'bên trong';
   console.log(box);
}

just();
// result: 'bên trong'
```

Tuy nhiên điều đó không có nghĩa là các biến ở bên ngoài hàm không thể được sử dụng nếu cần thiết. Trong trường hợp không có biến cục bộ bên trong hàm trùng tên thì hàm sẽ sử dụng biến ở ngoài.

```scope.js
var box = 'bên ngoài';

function just() {
   // var box = 'bên trong';
   console.log(box);
}

just();
// result: 'bên ngoài'
```

Và đó là tất cả mọi thứ về `scope` mà chúng ta có thể nói ở thời điểm hiện tại. Chúng ta đã biết khá đủ về những thứ cơ bản. Chỉ cần thêm một bài viết nữa thôi và chúng ta sẽ bắt đầu học cách sử dụng JavaScript để tùy chỉnh cấu trúc của văn bản HTML và các thuộc tính CSS. Hãy nghỉ giải lao một chút trước khi tiếp tục. :D

`Whispering:` [**Flower Dance - DJ Okawari**](https://soundcloud.com/k_uniq/flower-dance)

[**[JavaScript] Bài 4 - Object & Everything**](https://viblo.asia/p/LzD5dRD0ZjY)