## Đôi lời dẫn nhỏ nhỏ...

Lại một cách tình cờ trong sớm đông lạnh bên ly trà ấm dành cho người cô đơn, mình lại "chộp" được 1 bài viết hay ho có tên là **5 Best Practices to Write Quality JavaScript Variables**. Lướt qua cái tên này, bản thân mình cũng tò mò không biết có gì mới mẻ để mình học hỏi không, thế là mình ấn vô đọc với sự hồ hởi nhất định. 

Sau khi đọc xong, cảm giác đầu tiên mình nghĩ ngay tới đó chính là "mình" của nhiều năm trước khi mới tập toẹ viết code Javascipt. Rồi mình chợt nhận ra có những điều mà nhiều bạn sinh viên hay thậm chí cả những bạn đã đi làm được một thời gian vẫn hay mắc phải. Song, do chưa có suy nghĩ rõ ràng, kinh nghiệm, và  chưa hiểu rõ được tầm quan trọng cũng như mức độ ảnh hưởng của vấn đề khai báo và sử dụng biến trong thực tế những dự án lớn, mà các bạn đã code theo cảm tính để rồi chính những điều nhỏ nhoi ấy lại là nguyên nhân cho hàng loạt hệ quả sau này. 

Bản thân mình cũng từng như vậy, nên quả thực, mình rất muốn được chia sẻ nó rộng rãi hơn cho các bạn nhất là các thế hệ developer tương lai đầy tiềm năng! :clap:

### **Vậy chúng ta bắt đầu thôi!**

Một sự thật chúng ta đều nhận ra đó chính là sự xuất hiện dày đặc của cái gọi là "biến" (variable) trong mọi góc ngách của bất kì project lớn nhỏ nào... Đã là dân lập trình thì việc bạn khai báo, gán giá trị hay đọc biến là những công việc mà ta khéo phải làm nhiều hơn cả số hạt cơm trong bát ăn mỗi tối cùng gia đình. Nếu ví code là sự sống thì biến chính là oxi vậy, sẽ chẳng có một sự sống nào được tạo nên nếu như không có dưỡng khí! :satisfied:

Mà dưỡng khí thì cũng có khí this khí that, nên việc viết ra những dòng sử dụng biến chất lượng sẽ giúp cho code của chúng ta trở nên "gọn gàng", "dễ đọc", "dễ bảo trì" và thậm chí nó còn giúp tăng hiệu năng của project nữa chứ. Quá xịn rồi!

Giờ các bạn hãy cùng mình điểm qua 5 phương pháp thực tế vô cùng gần gũi này nào... 

# 1. Ưu tiên ```const```, còn không thì dùng ```let```
Đây là một lỗi mà có rất là nhiều bạn chưa code lâu JS mắc phải, khi mà bất kì dòng khai báo biến nào mình cũng thấy các bạn đập ngay ```var``` vào :slightly_frowning_face:. Điều này cũng dễ hiểu, bởi cách khai báo đó tiện, đơn giản, và không ít các đoạn code cũ trên các trang lớn ta vẫn thấy nó bởi lẽ dựa theo ES5 syntax (do ```let``` được cập nhật trong bản Javascript ES6).

Với cá nhân mình, mình luôn chỉ sử dụng ```const``` và ```let```. ```var``` sẽ không phải sự lựa chọn sáng suốt bởi nó không hỗ trợ block scope nên có thể gây ra rất nhiều phiền toái trong lúc bảo trì.

Nhìn chúng, sự khác nhau chính giữa ```const``` và ```let``` là giá trị khởi tạo khi khai báo và sự gán lại giá trị cho biến đó.

```js
// const requires initialization
const pi = 3.14;
// const cannot be reassigned
pi = 4.89; // throws "TypeError: Assignment to constant variable"
```

Các bạn thấy đó, khi khai báo 1 hằng số, ta phải truyền giá trị ban đầu cho nó, và biến đó mãi mãi không thể thay đổi được giá trị của nó nữa. Kiểu như "cha mẹ đặt đâu con nằm đó" ấy ạ. :sweat_smile:

Ngược lại, ```let``` mang đặc tính linh hoạt của ```var``` không cần khai báo giá trị khởi tạo và có thể re-assign tức gán lại giá trị cho nó nhiều lần trong vòng đời của biến. Cái này thì nghe chừng "rắn nát mặc dầu tay kẻ nặn" như "bánh trôi nước" vậy á :rofl:

```js
// let initialization is optional
let result;
// let can be reassigned
result = 14;
result = result * 2;
```

Chính vì sự "nhất ngôn cửu đỉnh", chỉ được xác định duy nhất 1 lần (one-off assignment) nên ```const``` luôn được ưu tiên sử dụng nhất để giúp bản thân code ít xảy ra lỗi và người lập trình có thể kiểm soát biến của mình tốt hơn. 

Ta sẽ có một ví dụ nhỏ trong một dự án có vài bạn cùng tham gia code:

```js
function myBigFunction(param1, param2) {
  /* lots of stuff... */

  const result = otherFunction(param1); // (1)
  /* lots of stuff... */
  return something;
}
```

Ở code trên, ta gán kết quả hàm ```otherFunction``` vào biến ```const result``` để đảm bảo biến này sẽ không bị ai khác vô ý gán lại ở đoạn code phía sau đó. Đây là điều vô cùng quan trọng khi làm việc nhóm, bởi đôi khi chính mình còn quên code mình, thì các bạn mình khi không hiểu rõ hàm ```myBigFunction``` cũng có thể vô ý sẽ gán lại giá trị cho biến ```result``` nếu nó được khai báo bằng ```let```. Để rồi bugs sẽ phát sinh và rất khó truy vết, để rồi... "không còn những người bạn đó nữa" :rofl::rofl::rofl:

Còn đương nhiên, nếu bạn có nhu cầu re-assign biến nhiều lần thì chẳng ngại gì mà ta không dùng ```let```.

Mình sẽ đặt một bài cụ tỉ mình đọc được ở đây cho các bạn nào muốn đào sâu nhé: [Trời sinh ra var sao còn sinh ra let và const javascript](https://anonystick.com/blog-developer/troi-sinh-ra-var-sao-con-sinh-ra-let-va-const-javascript-2019122884060190).

# 2. Tối giản vùng sử dụng của biến (variable scope)
Như đã nói ở trên, chỉ có ```const``` và ```let``` là được chịu ảnh hướng vùng sử dụng (scope) bởi một khối code (block) hoặc trong một hàm (function). Scope chính là nơi và ở đó biến sẽ được khai báo và chỉ có giá trị sử dụng bên trong đó; bạn nào muốn hiểu rõ scope thì có thể tham khảo thêm bài này nha: [Scope trong Javascript](https://viblo.asia/p/scope-trong-javascript-RQqKLnW6l7z).

Trên thực tế, để tăng tính khả đọc của biến được sử dụng, các chuyên gia đều khuyến nghị rằng ta nên giữ cho scope của 1 biến luôn là nhỏ nhất có thể.

Ta sẽ thử làm qua một hàm binary search cơ bản:

```js
function binarySearch(array, search) {
  let middle; // (1)
  let middleItem; // (2)
  let left = 0;
  let right = array.length - 1;

  while(left <= right) {
    middle = Math.floor((left + right) / 2); // (3)
    middleItem = array[middle]; // (4)
    if (middleItem === search) { 
      return true; 
    }
    if (middleItem < search) { 
      left = middle + 1; 
    } else {
      right = middle - 1; 
    }
  }
  return false;
}

binarySearch([2, 5, 7, 9], 7); // => true
binarySearch([2, 5, 7, 9], 1); // => false
```

Ta dễ thấy, thói quen khai báo hết các biến trên đầu của scope (ở đây là 1 function) rất nhiều bạn mới code sẽ mắc phải và nghĩ đó là cách dễ quản lý biến nhất. Nhưng trên thực tế thì không.

Ở đây, ta thấy 2 biến ```middle``` và ```midleItem``` tuy được khởi tạo ngay đầu function tức là scope của chúng là toàn bộ hàm này, nhưng lại chỉ được sử dụng thực sự ở bên trong scope của vòng lặp ```while (left <= right)``` mà không còn mang ý nghĩa ở bất cứ đoạn nào khác. Như vậy, ta có thể nói 2 biến này đang được khai báo chưa tốt dù code vẫn chạy đúng! :neutral_face:

Ta sẽ sửa lại như sau:
```js
function binarySearch(array, search) {
  let left = 0;
  let right = array.length - 1;

  while(left <= right) {
    const middle = Math.floor((left + right) / 2);    
    const middleItem = array[middle];    
    if (middleItem === search) {
      return true; 
    }
    if (middleItem < search) {
      left = middle + 1; 
    } else {
      right = middle - 1; 
    }
  }
  return false;
}
```

Đoạn code sau khi sửa rút ngắn đi, đồng thời người đọc cũng sẽ hiểu rõ hơn về công dụng, vai trò thực sự của 2 biến ```middle``` và ```middleItem``` trong thuật toán được triển khai. Sau khi ra khỏi vòng lặp, 2 biến này cũng tự động được loại bỏ và chương trình không còn phải lưu trữ nó nữa (lifetime và lifecycle ngắn hơn).

Thử nghĩ mà xem, chúng ta không chỉ code một hàm thuật toán nhỏ như ví dụ trên nữa, mà là cả một project to đùng với những hàm có thể rất phức tạp, nếu một biến không được khai báo ở mức tối giản scope nhất của nó, thì việc ta quản lý code và nắm biết ý nghĩa của biến đó quả thực là một cơn ác mộng, thay vì bị "bóng đè" thì ta bị "code đè". :cry:

# 3. Gần với nơi sử dụng nhất
Phương pháp này là sự tiếp nối với phương pháp phía trên ta đã nêu, đó chính là lời khuyên các bạn hãy khai báo biến ở gần với nơi thực sự sử dụng của nó nhất có thể... Hãy bỏ thói quen mọi thứ đều phải khởi tạo ngay trên đầu của scope như dưới này đi nhaaaa!

```js
function myBigFunction(param1, param2) {
    const result = otherFunction(param1);  
    let something;

    /*
     * calculate something... 
    */

    return something + result;
}
 ```

Thay vào đó, ta hoàn toàn có thể viết như này để ai đọc cũng sẽ nhanh chóng nắm bắt được vai trò của biến ta khai báo và sử dụng một cách dễ dàng!
  ```js
  function myBigFunction(param1, param2) {
      let something;

      /* 
       * calculate something... 
       */

      const result = otherFunction(param1);  
      return something + result;
  }
  ```
  
Tin mình đi, bạn sẽ hiểu rõ hơn vì sao ta nên làm thế này khi mà bạn mở một đoạn code khoảng 1000+ lines và bạn gặp phải một biến được khai báo từ rất sớm trong rõ nguy hiểm và sau một hồi lâu bạn chợt nhận ra nó chỉ để dùng cho những dòng gần cuối của cả đoạn dài như "vạn lý trường thành" đó. 

Lúc đó đầu bạn rất có thể muốn tung chiêu thức "Killer move: Serious series - Serious Punch" của Thánh phồng tôm Saitama vào cái ông nào code đoạn này đó. Còn mình thì mình hiền lắm nhé!!! :rofl:

# 4. Học cách đặt tên hay cho "bé"
"Đặt tên xấu thì dễ nuôi" đã là của các cụ từ lâu rồi, thời đại này làm gì cũng phải thật có tâm và có tầm các bạn ạ! Vậy nên đừng để những đứa con của chúng ta có những cái tên khó đọc và khó hiểu bạn nhé... Vì chúng còn có nhiều "cha mẹ nuôi" khác cùng nuôi nấng nó nữa đó. :persevere:

Để trở thành một developer "xịn sò" thì việc đầu tiên cần học đó chính là đặt tên biến/hàm. *Chúng ta có thể "ế" vì không biết tỏ tình, nhưng không thể "tệ" trong chính công việc của chúng ta*. :100:

**Quy tắc thứ nhất:** Sử dụng [tên lạc đà](https://en.wikipedia.org/wiki/Camel_case) để đặt tên cho biến và giữ chúng nhất quán cho tất cả mọi biến trong code.
```js
const message = 'Hello';
const isLoading = true;
let count;
```
Đương nhiên, ta vẫn có ngoại lệ, đó chính là các biến có tính đặc thù mang giá trị ý nghĩa riêng khác với các biến thông thường. Với các biến này ta sẽ đặt tên bằng chữ hoa và ngăn cách bởi dẫu gạch dưới "_" để phân biệt:
```js
const SECONDS_IN_MINUTE = 60;
const GRAPHQL_URI = 'http://site.com/graphql';
```

**Quy tắc thứ hai:** Tên biến cần phải rõ ràng, không được mơ hồ, phải thể hiện được rõ nhất có thể kiểu dữ liệu mà nó bao chứa, ý nghĩa, vai trò của nó.

Mình xin lấy lại code tốt tốt ở trên:
```js
const message = 'Hello';
const isLoading = true;
let count;
```

Ta sẽ dễ thấy ngay là:
* ```messsage``` đọc lên ta dễ hiểu nó là một đoạn tin nhắn chuỗi dạng ```String```
* ```isLoading``` thì ta hiểu nó ý là kiểm tra trạng thái "loading" của một cái gì đó, và bắt đầu bằng "is" nên ta dễ đoán nó là dạng Boolean.
* ```count```: chắc chắn ông này dùng để đếm rồi còn gì nữa phải không ạ? :rofl:
<br>
<br>

Để mình lấy thêm ví dụ nữa nha, ở dưới là đoạn code các bạn đừng làm theo nhé:
```js
function salary(ws, r) {
  let t = 0;
  for (w of ws) {
    t += w * r;
  }
  return t;
}
```

Hãy làm như này nha:
```js
function calculateTotalSalary(weeksHours, ratePerHour) {
  let totalSalary = 0;
  for (const weekHours of weeksHours) {
    const weeklySalary = weekHours * ratePerHour;
    totalSalary += weeklySalary;
  }
  return totalSalary;
}
```

Đừng tiếc thời gian dành cho những dòng code đẹp để mà làm tốn thời gian của chính mình và người khác trong việc làm việc với nó sau này mọi người nhé! :clap:

# 5. Khai báo biến tức thời, tạm thời
Làm sao để người khác hiểu rõ được code của mình mà không cần phải mất thời gian comment hay viết document nhỉ? Dễ thôi, đó là hãy cắt code của ta ra thật rõ ràng càng tốt. Và cách ta khai báo các biến tức thời, tạm thời chính là phương pháp dễ thực hiện nhất và mang lại hiệu quả cao.

Ví dụ, mình có một đoạn code như sau:
```js
const sum = val1 * val2 + val3 / val4;
```

Đừng dối lòng mình, nó tuy ngắn đấy, nhưng mà nó khó nhìn thật sự, nhất là khi nó được xen vào nhiều các dòng code khác. Vậy nên, mình sẽ chọn cắt nó ra thành các biến tạm như sau:
```js
const multiplication = val1 * val2;
const division       = val3 / val4;

const sum = multiplication + division;
```

Thêm 3 dòng, nhưng hiệu quả vẫn vậy, mà còn dễ hiểu và bảo trì hơn nhiều nữa chứ? Viết ngắn không phải không tốt, nhưng ta cần cân bằng giữa tính ngắn gọn và tính rõ ràng ạ. :sunglasses:

Giờ ta sẽ quay lại ví dụ về hàm binary search mà mình đã nê ở phần 2 nha:
```js
function binarySearch(array, search) {
  let left = 0;
  let right = array.length - 1;

  while(left <= right) {
    const middle = Math.floor((left + right) / 2);
    const middleItem = array[middle];   
    if (middleItem === search) {      
      return true; 
    }
    if (middleItem < search) {   
      left = middle + 1; 
    } else {
      right = middle - 1; 
    }
  }
  return false;
}
```

Ở đây mình đã tạo một biến ```middleItem``` để lấy phần tử ở giữa của mảng, rõ ràng điều này sẽ giúp mình rút ngắn được những đoạn code mình muốn truy cập phần tử này; ngoài ra, cách làm này còn giúp mình giảm thiểu số lần, thời gian phải bỏ ra để truy cập trực tiếp vào mảng nữa chứ...

Các bạn hãy thử nhìn đoạn code dưới đây (không áp dụng phương pháp) để thử cảm nhận và so sánh xem sao, các bạn sẽ thấy rõ được sự bất tiện trong việc truy cập phần tử mình muốn nhiều lần:
```js
function binarySearch(array, search) {
  let left = 0;
  let right = array.length - 1;

  while(left <= right) {
    const middle = Math.floor((left + right) / 2);
    if (array[middle] === search) {
      return true; 
    }
    if (array[middle] < search) {      
      left = middle + 1; 
    } else {
      right = middle - 1; 
    }
  }
  return false;
}
```

Nói một cách hoa mỹ, thì "khai báo biến tức thời, tạm thời" chính là cách ta "dùng code để giải thích code", so với viêc thêm vài dòng khởi tạo thì cái lợi ích của nó đem lại quả thực lớn hơn rất nhiều ạ!

## Tới cái kết to to...
Để nói ngắn gọn lại, thì bạn sẽ cần phải nhớ 3 điều khi làm việc với biến trong Javascript:
* Hãy dùng ```const```, còn không thì dùng ```let```, và đừng lạm dụng ```var```.
* Hãy giảm thiểu tối da scope sử dụng của biến cũng như khai báo biến gần nơi nó được sử dụng nhất.
* Hãy học cách đặt tên biến để code trở nên rõ ràng, chất lượng, và tự nó có thể giải thích chính nó.

Cảm ơn các bạn đã đọc tới những dòng cuối cùng này, vậy là mình đã hoàn thiện công việc "đầu bếp dịch liệu" thêm "mắm thêm muối" để chia sẻ những thông tin bổ ích cho các bạn rồi. Chúc các bạn thu lượm được nhiều điều thú vị và có một ngày thật tuyệt nhé! :heart_eyes:

*Bài gốc cho bạn nào cần: [5 Best Practices to Write Quality JavaScript Variables](https://dmitripavlutin.com/javascript-variables-best-practices/)*