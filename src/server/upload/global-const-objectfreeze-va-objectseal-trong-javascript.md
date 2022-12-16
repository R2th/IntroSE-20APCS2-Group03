Trong bài này chúng ta sẽ nói về Immutable và Mutable trong JS. Và tìm hiểu Object.freeze() và Object.seal() để hiểu rõ hơn về immutable js. Vấn đề này phải hiểu thật sau hơn khi học javascript.

Tất cả các lập trình viên đều hiểu rằng một trong những cách sử dụng phổ biến nhất của một đối tượng là giữ các trạng thái (hold state) - nó giống như các file congif hay constant được sử dụng trường xuyên trong các ứng dụng của mỗi lập trình viên. Và điều đầu tiên tôi muốn làm rõ là ở đó không có mối quan hệ và so sánh nào giữa const và Object.freeze(), chúng là hai thứ hoàn toàn khác nhau. 

### Immutable là gì?
Với cách hiểu nôm na, Immutable như là một đặc tính của một đối trường nào đó. Nó khiến cho dữ liệu không thể thay đổi khi được tạo, dẫn đến việc dễ dàng hơn rất nhiều trong việc phát triển ứng dụng. Không sao chép, cho phép ghi nhớ và phát hiện kịp thời những thay đổi là những điểm nổi bật cần nhắc đến của Immutable.

### 1 - var Global in javascript
Đầu tiên tôi sẽ trình bày một ví dụ để biết biến global nguy hại như thế nào nếu một developer không hiểu hoạt động của nó dẫn đến một số giá trị bị thay đổi trong khi đã đưa và sử dụng. 

Tại sao, chúng ta đi vào ví dụ đầu tiên

```
var artist = {
    name: "Son Tung MTP",
    latestAlbum: "Chay Ngay Di"
};

function announce (artist) {
    //Chết mất! Vô tình bạn đã gán giá trị chư không phải check 
    if (artist.name = "AnonyStick") {
        console.log("Chay Ngay Di");
    } else {
        console.log(artist.name);
    }
}

// Outputs: "Chay Ngay Di"
announce(artist);

// Outputs: {
//     name: "AnonyStick",
//     latestAlbum: "Chay Ngay Di"
// }
console.log(artist);
```
Các bạn thấy không phải AnonyStick với album Chay Ngay Di. Chúng ta vô tình đã làm lệch hướng của một object. Thật tai hại nếu không nắm vững kiến thức.

### 2 - Const trong javascript
Sử dụng const chỉ có nghĩa là biến sẽ luôn có một tham chiếu đến cùng một đối tượng hoặc giá trị nguyên thủy, bởi vì tham chiếu đó có thể thay đổi. Tham chiếu chính nó là bất biến, nhưng giá trị được giữ bởi biến không trở thành bất biến. 

Ví dụ:

```
const singer = "Son Tung MTP";
function getSinger() {
  singer = "yellow"; // gán giá trị khác nhưng rất tiếc là do
  return singer;
}

getSinger();//Uncaught TypeError: Assignment to constant variable.
```
Chúng ta sẽ đương nhiên là get về một error là do Const ngăn chặn việc gán lại giá trị cho một biến sau khi nó được khai báo một lần trong chương trình. Nhưng đừng vội vui mừng vì ta có thể hold states cho object bằng cách này. Ta đi tiếp ví dụ dưới đây để xem nó sẽ thay đổi như thế nào? Vi dụ:

```
const singer = ['Son Tung MTP', 'My Tam'];

singer.push('AnonyStick');

console.log(singer); // ['Son Tung MTP', 'My Tam', 'AnonyStick']

//hoặc 

const singer = {
  name: 'Son Tung MTP',
  lastAlbum: 'Chay ngay di'
}
singer.name = 'Anonystick';

console.log(singer);//{name: 'Anonystick', lastAlbum: 'Chay ngay di'}
```
Qua hai ví dụ trên ta thấy được điều gì về const, ta thấy trong object singer giá trị đã được thay đổi. Vì sao, điều đó có nghĩa là việc gán lại biến không được phép nhưng giá trị được tham chiếu bởi biến const vẫn có thể thay đổi. 

Bây giờ, điều đó không tốt cho chúng ta nếu chúng ta có kế hoạch sử dụng như file congif hay constant. Vì vậy chúng ta thử tìm một cách khác mà không thay đổi được các giá trị bên trong mà chúng ta đã khai báo.

### 3 - Immutable Objects with Object.freeze
Tại đây, nơi Object.freeze () phát huy tác dụng. Object.freeze () ngăn chặn sửa đổi hoặc mở rộng giá trị hiện có của một đối tượng. Xét một ví dụ:

```
let alligator = {
  canItFly : false
};

Object.freeze(alligator);
alligator.canItFly = true;

console.log(alligator.canItFly);// vẫn là false
```
Phương thức Object.freeze lấy một đối tượng và làm cho nó trở nên bất biến một cách hiệu quả. Các thuộc tính hiện có của nó có thể không được sửa đổi và các thuộc tính mới có thể không được thêm vào. Kiểu Object.freeze () có vẻ là ổn rồi đây nhưng ta lấy thêm một ví dụ khác để xem ví dụ về Object.freeze()

```
let alligator = {
  canItFly : false
};

Object.freeze(alligator);
alligator = { pi: 3.14159 };

console.log(alligator) // {pi: 3.14159}
```
Một lưu ý nhanh chóng, Thôi xong, nó vẫn có thê thay đổi được , nó có thể thay đổi khi gán lại giá trị mới. 



### 4 - Mutable Objects with Object.seal()
Với Object.seal() chúng ta không thể add new properties, hoặc delete một properties nhưng chúng ta có thể change value của một properties. Chúng ta hãy xem ví dụ dưới đây.

```
const toBeSealed = {
prop1: 'some value',
prop2: 'some other value'
};

const sealedObject = Object.seal(toBeSealed);

sealedObject.prop1 = 'new value'; // no error, value changed
// Cannot add property newProp, object is not extensible
sealedObject.newProp = 'won\'t be added'; 
// Cannot delete property 'prop2' of #<Object>
delete sealedObject.prop2; 
// Cannot define property newProp, object is not extensible
Object.defineProperty(sealedObject, 'newProp', { 
writable: true
});
Chúng ta cũng có thể verify object như sau :


Object.isSealed(sealedObject); // true
Object.isSealed(toBeSealed); // true
Object.isSealed({}); // false
```


### 5 - Unison const và Object.freeze()
Vậy là khi mình kết hợp const và Object.freeze() thì sẽ ngăn được việc thay đổi thông tin ở trong object đúng không ad?

Chúng ta xem tiếp một ví dụ sau để giải đáp câu hỏi này:

```
const alligator = {  canItFly : false};
Object.freeze(alligator);
alligator.canItFly = true; // This is ignored
alligator = {pi: 3.14}; // This will throw an TypeError
console.log(alligator); // {canItFly: false}
```
Ví dụ trên cho thấy sự kết hợp của const và Object.freeze () và là một thiết kế lập trình rất hữu ích trong JavaScript. Điều này sẽ có ích trong khi chúng ta đang tìm hiểu về Singletons sau này.


### 6 - Kết Luận.
Qua bài này các bạn đã hiểu hơn về global, const, và Object.freeze thông qua các ví dụ cụ thể mà tôi đã trình bày ở trên bài viết. 

Vì vậy, tóm lại 

const làm cho biến ràng buộc bất biến nhưng giá trị của nó vẫn có thể được sửa đổi. 
Object.freeze () bỏ qua sửa đổi giá trị cho một đối tượng nhưng không có hạn chế nào về ràng buộc.
Object.seal() cũng giống như object.freeze() nhưng khác điểm là có thể change được value.