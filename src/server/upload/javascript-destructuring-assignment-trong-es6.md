# Mở bài #

![](https://images.viblo.asia/8cd2c144-89be-4d5e-8917-9da40d41229d.png)

Chào các bạn, mình có 1 **ví dụ** như này :
```
const objA = { mot : 'one', hai : 'two', ba : ' three' };
// và đây là cách mình lấy giá trị của thuộc tính object objA
console.log('mot', objA.mot);
// rồi lại tiếp tục, khá là mất công khi phải gọi lại tên object mỗi lần như vậy,
// và nếu có quên điều này thì code sẽ bị lỗi.
console.log('hai', objA.hai);
```

**ví dụ 2 :**
```
const objB = { mot : 'one', hai : 'two', ba : ' three' };
// Nếu mình không muốn dùng objA.mot, mà muốn gán cho 1 biến để dễ nhớ hơn thì làm như sau : 
const soMot = objB.mot;
// Nếu mình muốn gán từng thuộc tính của object này cho nhiều biến thì tiếp tục :
const soHai = objB.hai;
const soBa = objB.ba;
```

**Destructuring Assignment** của **ES6** sẽ giúp bạn giải quyết 2 ví dụ trên 1 cách gọn gàng.

# Thân Bài #
**Destructuring Assignment ( phân rã biến ) là một tính năng tiện ích của ES6, nó làm nhiệm vụ tách nhỏ các phần tử của mảng ( Array ) hoặc đối tượng ( Object ) chỉ bằng một đoạn code duy nhất, và gán nó cho nhiều biến riêng biệt .**

Vậy từ định nghĩa trên, chúng ta biết rằng **Destructuring Assignment** sẽ làm việc với 
- **mảng ( Array )**
- **đối tượng ( Object )**

## Left Hand Side ##

Mình có **ví dụ:**
```
// khai báo và gán giá trị với object objB và mảng arrB

const objB = { mot : 'one', hai : 'two', ba : ' three' };

const arrB = ['mot','hai','ba'];
```

Chúng ta có thể thấy các cú pháp về **mảng** hoặc **object** sẽ được nằm bên bên phải  (right-hand side - RHS) của phép gán, và nó có vai trò là giá trị được gán.

**ví dụ 2:**
```
// khai báo và gán giá trị với object objB và mảng arrB

const objB = { mot : 'one', hai : 'two', ba : ' three' };

const arrB = ['mot','hai','ba'];

// mình sử dụng Destructuring Assignment

const {mot, hai, ba} = objB;

const [mot, hai, ba] = arrB;

// và in ra kết quả để xem thử nhé

console.log('objB',mot);

console.log('arrB',mot);
```

Trong ví dụ trên ta có thể thấy **mảng** hoặc **object** sẽ được nằm bên bên trái (left-hand side - LHS) của phép gán, và nó đóng vai trò để phân tách các giá trị của **mảng** hoặc **object** thành từng phép gán riêng biệt nằm bên trái.
Chúng ta sẽ đi chi tiết về **Destructuring** để xem còn làm được những gì với nó nữa nhé.

## Array Destructuring ##
Chúng ta cùng xem lại ví dụ về **Array Destructuring** trước nhé.
```
// khai báo và gán giá trị với mảng arrB

const arrB = ['mot','hai','ba'];

// mình sử dụng Destructuring Assignment

const [a, b, c] = arrB;

// và in ra kết quả để xem thử nhé

console.log('arrB',a);
```

Khi sử dụng **Array Destructuring**, thực tế sẽ có một **iterator**, nó sẽ duyệt qua các phần tử của mảng và tách các giá trị cần thiết ra khỏi **destructuring source** (right-hand side - RHS)

Chúng ta có thể thấy bên trái (left-hand side - LHS) , biến riêng biệt chúng ta khai báo để tách các phần tử của mảng **arrB**, có thể đặt tên tùy ý và nó chỉ phụ thuộc vào vị trí của biến đó so sánh với ví của phần từ trong mảng **arrB**.

## Object Destructuring ##
Chúng ta hãy cùng xem ví dụ về **Object Destructuring** trưước nhé.

```
// khai báo và gán giá trị với object objB
const objB = { mot : 'one', hai : 'two', ba : ' three' };

// mình sử dụng Destructuring Assignment bằng 2 cách viết
// cách viết đầy đủ
const {mot:mot, hai:hai, ba:ba} = objB;
// cách viết tắt
const {mot, hai, ba} = objB;

// và in ra kết quả để xem thử nhé

console.log('objB',mot);

```
**Object Destructuring** cho phép ta gán **property value** của một **object** vào nhiều **biến** riêng biệt và tên **biến** phải tương ứng với **property** của **object** đó. Chúng ta sẽ lại ví dụ để biết rõ hơn.
```
// mình sử dụng Destructuring Assignment bằng 2 cách viết
// cách viết đầy đủ
const {mot:mot, hai:hai, ba:ba} = objB;
// cách viết tắt
const {mot, hai, ba} = objB;
```
- Với cách viết đầy đủ, thì mỗi **property** của **object** sẽ được gán với 1 **biến** xác định dưới dạng : **property**:**variable**, cách này chúng ta sẽ sử dụng khi muốn dùng tên **variable** khác với tên **property** của **object** đó.
- Với cách viết tắt, là trường hợp khi **property**:**variable** trùng tên với nhau, và chúng ta sẽ loại bỏ  **property** chỉ để giữ lại **variable**, vậy nên chúng ta sẽ sử dụng cách này khi muốn viết **variable** trùng tên với **property** của **object** đó.

Vậy điều này có gì để quan tâm không ?
```
const objB = { mot : 'one', hai : 'two', ba : ' three' };
// hãy thử và cảm nhận thử nhé 
const {mot:_mo, hai:_ha, ba:_b} = objB;
// chạy mượt mà
console.log('objB',_mo);
// sẽ xuất hiện lỗi chưa được định nghĩa : ReferenceError
console.log('objB',mot);
```

Chúng ta sẽ dùng thêm ít thời gian để xem liệu **object** được nằm bên bên trái **(left-hand side - LHS)** của phép gán và **object** được nằm bên bên phải **(right-hand side - RHS)** của phép gán, có gì khác nhau không nhé :
```
// Object Destructuring
const objB = { mot : 'one', hai : 'two', ba : ' three' };
const {mot: _mot, hai: _hai, ba: _ba} = objB;

// Object literal
// Object literal là kiểu cú pháp tạo object sử dụng cặp dấu ngoặc {} 
// và bên trong đó là danh sách các property (thuộc tính) của object.
const soMot = 1, soHai = 2, soBa = 3;
const objC = { _soMot: soMot, _soHai: soHai, _soBa: soBa };
```
Nếu bạn để ý có thể thấy **Object literal**,các **_soMot**, **_soHai**, **_soBa** là  **property** của **object** **objC**, còn **soMot**, **soHai**, **soBa** sẽ là các **source value** được sử dụng để gán cho các **property** của **object** **objC**.

Vậy chốt lại nhé, khi sử dụng **Object literal** thì các **property** của **object** sẽ được gán dưới dạng: **target**:**source**, nhưng khi qua đến **Object Destructuring** thì khái niệm này cũng bị đổi ngược thành  **source**:**target**.

## Khai báo trước, gán sau ##
Các bạn có thể thấy trên các ví dụ trên mình dùng **destructuring assignment** đều có kèm theo từ khóa **const**, tất nhiên có thể dùng **var**, **let**, nhưng với **destructuring assignment** thì không nhất thiết phải thực hiện **phép gán** và **khai báo** cùng lúc, ví dụ :
 ```
 const objB = { mot : 'one', hai : 'two', ba : ' three' };
 
 // khai báo biến
  var mot,hai,ba;

  ({mot,hai,ba} = objB);

  console.log('objB',mot)
```
Khi dùng cách này có thể thấy ta khai báo rồi thích gán khi nào cũng được, khi không dùng từ khóa **var**, **let** để khai báo, lúc gán ta phải bọc nó vào 1 cặp **()**, bởi vì bên trái **(left-hand side - LHS)**, cặp dấu **{}** sẽ được hiểu là 1 **block** chứ không phải là 1 **object**.

## Default Values ##
Khi sử dụng **Destructuring Assignment** chúng ta có thể gán giá trị mặc định cho các **target value**, nó cũng tương tự như gán giá trị mặc định cho **function arguments** vậy.

Chúng ta có ví dụ sau nhé :

```
// Khai báo ván gán giá trị objB
  const objB = { mot : 'one', hai : 'two', ba : ' three' };

// có gán giá trị mặc định cho 'bon' và 'nam' ta sẽ không gán giá trị
  const {mot, hai, ba, bon='Number four',nam} = objB;
// hiển thị kết quả
  console.log('bon',bon)
    console.log('nam',nam)
```

Qua kết quả ví dụ trên, 
- **property** của **object** hoặc **array** có tồn tại thì giá trị của  **property** của **object** hoặc **array** sẽ được sử dụng và trả ra.
- Nếu  **property** của **object** hoặc **array** đó không không tồn tại, đồng thời chúng ta cũng không gán giá trị mặc định thì kết quả sẽ là **undefined**
- nếu có gán giá trị thì mặc định và **property** của object đó không tồn tại thì nó sẽ dùng giá trị mặc định.
- Nếu  **property** của **object** hoặc **array** đó có giá trị được gán là "**undefined**".  **default value** sẽ được sử dụng.

Ví dụ :
```
// Khai báo ván gán giá trị objB
const objB = { mot : 'one',bon:undefined };

// có gán giá trị mặc định cho 'bon' 
  const {mot, bon='Number four'} = objB;
// hiển thị kết quả
  console.log('bon',bon)
```

- **Default value** không nhất thiết phải là một giá trị cố định, nó có thể là kết quả trả về của 1 **function** như ví dụ :
```
function exportBon() {
    return 4;
}
const objB = { mot : 'one',bon:undefined };

// có gán giá trị mặc định cho 'bon'
  const {mot, bon=this.exportBon} = objB;
// hiển thị kết quả
  console.log('bon',bon())
```
- Tuy nhiên theo mình sử dụng **Default Values** cần phải xem xét kĩ, tránh trở nên khó hiểu và debug hơn.

## Chỉ lấy đủ dùng ##
Với cả **array destructuring assignment** hoặc **object destructuring assignment**, bạn không cần lấy tất cả giá trị của **Object** hay **Array** đó mà chỉ **dùng cái nào thì lấy cái đó** mà thôi.

```
// Khai báo ván gán giá trị objB
const objB = { mot : 'one', hai : 'two', ba : ' three' };

// Mình chỉ cần lấy giá trị 2 của objB
  const {hai} = objB;
// hiển thị kết quả
  console.log('hai',hai)
```
## Nested Destructuring ##
Ví dụ từ đầu đến đây mình đều sử dụng **destructure** những  **Object** hoặc **Array** đơn giản, trong 1 dự án thì nó sẽ phức tạp hơn nhiều, nó sẽ tồn tại những :
- **nested arrays** **(array con lồng bên trong array lớn).**
-  **nested objects** **(object con lồng bên trong object lớn).**

Rất hay là **Destructuring Assignment** hoàn toàn giúp ta giải quyết những trở ngại khi lấy **object** hoặc **array** con được lồng trong những **object** hoặc **array**  lớn chứa nó.

Ví dụ đối với **Nested Destructuring Object**
```
// Khai báo ván gán giá trị objB
const objB = { mot : 'one', hai :{ho:'Nguyen',ten:'Tam'} };

// Minh lay property cua object nam long trong object hai 
  const {hai:{ho}} = objB;
  
// hiển thị kết quả
  console.log('ho',ho)
```
Ví dụ đối với **Nested Destructuring Array**
```
// Khai báo ván gán giá trị mảng arrB
const arrB = [1, [2, 3, 4], 5];

// Destructuring ArrayarrB
const [a, [b, c, d], e] = arrB;

// Hiển thị kết quả nhận được 
console.log(a, b, c, d, e);
```
## Destructuring Parameters ##
Khi chúng ta thực thi một **function** với các **arguments** ( là các giá trị mà chúng ta truyền cho hàm), trên thực tế các **arguments** đó sẽ được gán cho các 
**parameters** (  là tên của các biến được định nghĩa trong hàm giá trị chúng ta truyền vào - arguments sẽ được gán cho các biến đó ) được định nghĩa trong function. 

Do đó, chúng ta hoàn toàn có thể sử dụng **Destructuring Assignment** cho **function parameters**.

Ví dụ đối với **Destructuring Parameters Array** :

```
function Sum([a, b]) {
    console.log(a + b);
}
Sum([6, 9]); 
```
Ví dụ đối với **Destructuring Parameters Object** :
```
function Sum({a, b}) {
    console.log(a + b);
}
Sum({a:6, b:9}); 
```

# Kết bài #
Mình đã hoàn thành xong bài viết bài viết của mình, và những hiểu biết của mình về **Destructuring Assignment**,theo mình nó rất xứng đáng để sử dụng vì những lợi ích mang lại, nếu có ý kiến và đóng góp gì các bạn bình luận dưới nhé, **Xin cảm ơn**.

Mình có tham khảo các nguồn : 

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

https://viblo.asia/p/destructuring-assignment-in-es6-xlbRBNQgRDM#_nested-destructuring--destructuring-parameters-5

https://viblo.asia/p/ban-ve-js-destructuring-Eb85omNBZ2G