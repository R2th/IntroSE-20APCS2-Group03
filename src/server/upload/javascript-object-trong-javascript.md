Chào các bạn, nếu như đã từng học qua hay làm qua dự án **JavaScript**, thì sẽ đều nghe đến và từng sử dụng **Object**, tóm lại là nó khá phổ biến trong **JavaScript**, bài viết này mình sẽ cùng các bạn tìm hiểu về **Object**, cách tạo và sử dụng 1 cách bản.

![](https://images.viblo.asia/2c8cdecd-c5dc-4270-b3ef-c189c8107ac2.png)
# Object là gì ? #
Về mặt định nghĩa, một **Object** ( **một đối tượng** ) là danh sách các **item** được bao bọc và nằm trong cặp dấu **{}**, mỗi **item** là 1 cặp **name**:**value**, trong đó **value** có thể là các loại kiểu dữ liệu cơ bản như **Number**, **String**, **Boolean**, 1 **funtion**, hay là 1 **Object** khác ( gọi là kiểu dữ liệu phức hợp ).

- Ta gọi mỗi **item** là một **property** ( thuộc tính ) của **Object** đó  có kiểu dữ liệu **phức hợp**, **kiểu dữ liệu cơ bản**.
- Nếu **value** của **item** đó là **function** ( hàm ), thì ta gọi đó là **method** của **Object**. ( Phương thức của đối tượng ).

## Khởi tạo Object ##

Ví dụ :
```
    // Khai báo Object firstObject
    const firstObject = {  
        // item ho, ten này là property vì nó có kiểu dữ liệu string.
        ho: "Nguyen",
        ten: "Tam",
        25:25,
        // item ghepHoTen là method vì nó kiểu dữ liệu function.
        ghepHoTen: function(){
          console.log(this.ho + ' ' + this.ten);
        }
    };

```
- Trong **Object** **firstObject** chúng ta có thể thấy có 4 **item**, đều được lưu trữ dưới dạng 1 cặp **name**:**value**
- Trong ví dụ trên, các **name** của **property** là **ho**, **ten** và **25** đi tương ứng là các giá trị **Nguyen**, **Tam** và **25**.
- **ghepHoTen** là **method** của **Object** **firstObject**.
- Tên của **item** có thể là kí **tự** hoặc **1 số**.

## Cách để tạo Object ##
**Object** trong Javasciprt có thể được tạo theo vài cách khác nhau, mình thường dùng 2 cách này để tạo 1 **Object** :
### Object literal ### 
Cách này nếu bạn đọc ở trên thì sẽ thấy mình đã dùng cách này, và thường mình sẽ dùng **Object literals**, vì nó khá tiện để tạo ra 1 **Object**, cú pháp sử dụng là cặp dấu ngoặc **{}** và bên trong đó là danh sách các item của **Object**.

ví dụ :
```
    const objectLiterals = { ho: "Nguyen", ten: "Tam" };
```
### Object constructor ###
Cách này chúng ta sẽ sử dụng **constructor**( phương thức khởi tạo ) để tạo ra 1 **Object** với từ khóa **new** :
```
     // //Tạo 1 Object mới có tên objectConstructor
    const objectConstructor = new Object();

    // Danh sách các item của Object objectConstructor
    objectConstructor.ho = 'Nguyen';
    objectConstructor.ten = 'Tam';

```

## Mẫu khởi tạo Object ##
ở trên chúng ta đã biết cách tạo ra 1 object như thế nào, nhưng đối với việc tạo ra hàng loạt **Object** thì việc **copy** và **paste** nó sẽ khá tẻ nhạt, buồn chán, mất thời gian, đôi khi bị nhầm lẫn.

Đã nói đến **khuôn mẫu** thì chắc chắn những **Object** được tạo ra bằng cách này sẽ phải giống nhau về **số lượng** các **item** và **name** các **item**, của tất cả các **Object** được tạo bởi cái khuôn này.

 ### Constructor pattern ##

-  chúng ta sử dụng từ khóa **function** để tạo ra một **hàm khởi tạo đối tượng**, dùng từ khoá **this** để gán các item cho đối tượng:
```
    function constructorPattern(ho,ten){
      this.Ho = ho;
      this.Ten = ten;
    }
```
- Ta có thể tạo hàng ra loạt các** Object** kiểu **constructorPattern** với cách như sau:
```
    const objectA = new constructorPattern('Nguyen','Tam');
    const objectB = new constructorPattern('Tran','Long');
```
- Hiển thị kết quả để kiểm tra 
```
    console.log('objectA',objectA.Ten);
    console.log('objectA',objectA.Ten);
```

### Prototype pattern ###
```
Mình chưa hiểu cái này lắm, update sau vậy, Các bạn thông cảm nhé.
```

```
function Fruit () {

}

Fruit.prototype.color = "Yellow";
Fruit.prototype.sweetness = 7;
Fruit.prototype.fruitName = "Generic Fruit";
Fruit.prototype.nativeToLand = "USA";

Fruit.prototype.showName = function () {
console.log("This is a " + this.fruitName);
}

Fruit.prototype.nativeTo = function () {
            console.log("Grown in:" + this.nativeToLand);
}
And this is how we call the Fruit () constructor in this prototype pattern:


var mangoFruit = new Fruit ();
mangoFruit.showName(); //
mangoFruit.nativeTo();
// This is a Generic Fruit
// Grown in:USA
```

## Truy cập tới các item của Object ##
Để lấy được **giá trị** của **item** trong **Object**, chúng ta truy cập từ **tên** của **Object** đến toán tử **[]**  hoặc **.** ( dấu chấm ) ,rồi mới đến **name** của **item** **Object** đó.

Ví dụ : 
```
    // Khai báo Object firstObject
    const firstObject = {  
        // item ho, ten này là property vì nó có kiểu dữ liệu string.
        ho: "Nguyen",
        ten: "Tam",
        25:25,
        // item ghepHoTen là method vì nó kiểu dữ liệu function.
        ghepHoTen: function(){
          console.log(this.ho + ' ' + this.ten);
        }
    };
    
    // sử dụng . để lấy value của item object
        console.log(firstObject.ho);  // Nguyen
        
    // sử dụng [] để lấy value của item object
        console.log(firstObject['ho']); // Nguyen
        console.log(firstObject[25]); // 25

```

- Đối với trường hợp **name** của **item** trong **Object** đó là kiểu **number** (số) thì chúng ta phải dùng **[]**, không thể dùng được **.** ( dấu chấm ).
- Đối với trường hợp **name** của **item** trong **Object** đó là kiểu **string** ( chuỗi ) muốn dùng **[]** thì chúng ta sẽ kèm theo **''** bọc lấy **name** của **item**.
- Nếu **item** của **Object** không tồn tại thì kết quả sẽ báo **undefined**.
## Một cái nhìn chi tiết hơn về Object ##

### Kiểu dữ liệu Reference ( tham chiếu ) ###
Nếu bạn có đọc qua về bài [[JavaScript] Value và Reference trong Javascript
](https://viblo.asia/p/javascript-value-va-reference-trong-javascript-YWOZr6BrZQ0) thì sẽ biết rằng trong **JavaScript**, dữ liệu **Object** sẽ thuộc kiểu **Reference** ( tham chiếu ) 

Ví dụ :
```
// Khởi tạo object objA theo kiểu Object literal
    const objA = {ho: 'Nguyễn' };
    
// gán objB bằng objA
    const objB = objA;
    
// thay đổi property có name là ho của objB
    objB.ho = 'Tâm';
    
// Hiển thị kết quả và đoán xem 
    console.log('objA',objA);
    console.log('objB',objB);
```
Nếu bạn chưa hiểu thì xem lại bài viết [[JavaScript] Value và Reference trong JavaScript
](https://viblo.asia/p/javascript-value-va-reference-trong-javascript-YWOZr6BrZQ0) của mình nhé,
### Thuộc tính riêng và thuộc tính kế thừa của Object ###
- Kiểm tra **Object** bạn có **item name** đó tồn tại không 
```
// Tạo object Info

    const Info = {Ten:'Tâm',showHo: function(){
      console.log('Nguyễn')
    }};

//kiểm tra item
// Ten là name property của object Info
    console.log('Ten' in Info); //true
    
// showHo là name method của object Info
    console.log('showHo' in Info); //true
    
// Không tồn tại item có name là tuoi
    console.log('tuoi' in Info); //false
```
Mình sử dụng từ khóa **in** này để kiểm tra sự tồn tại của **item name object** ( nếu tồn tại **item name** nó sẽ trả về **true** và ngược lại sẽ là **false** ) . 

Theo định dạng : **'name_item_của_Object'** **in** **tên_Object**

- Để kiểm tra một **item** có phải là **item** riêng ( **item được định nghĩa tại bản thân của Object (own property)**), hay **item** được kế thừa từ **prototype** của **Object  (inherited property)** đó. 

ta có thể dùng phương thức **hasOwnProperty** của **Object**.

```
// Tạo mẫu đối tượng
  function info(){};

// prototype name của mẫu đối tượng info
  info.prototype.name = 'Chung';

//tạo đối tượng và item riêng
  const infoTam = new info();
  infoTam.ho = 'Nguyễn';

//kiểm tra thuộc tính
  console.log(infoTam.hasOwnProperty('name')); //false
  console.log(infoTam.hasOwnProperty('ho')); //true
```
Các **item** định nghĩa trong **prototype** sẽ được kế thừa tới mọi **Object**, nhưng ta vẫn có thể thêm các **item** riêng cho từng **Object** khác nhau. Đây là một trong những đặc điểm rất đặc biệt của **prototype** trong Javascript.

## Các đặc tính của thuộc tính (Property Attributes) ##

Trong Tiếng Anh, các bạn đã biết **property** là (  **thuộc tính** ), còn **Attributes** là ( **đặc tính** ). Và trong **JavaScript** thì **1 thuộc tính (property)** sẽ có **4 đặc tính (attribute)** sau đây:
![](https://images.viblo.asia/5a21efa9-abea-4c00-81c0-7ddecc7562e0.png)
- **Value**: Đây là đặc tính rõ thấy nhất, bởi vì mỗi  **item** đều mang 1 **value** nào đó, có thể là **property** hay **method**
- **Enumable**: mang **value** **true/false**, cho phép một **property** được duyệt qua trong vòng lặp **for-in**.
- **configable**: mang **value** **true/false**, nói lên khả năng **config** như **delete** **item**, thay đổi các đặc tính khác của **item**, …
- **writable**: mang **value** **true/false**, cho phép ta thay đổi **value** của  **item** hay không..

Ví dụ :
```
//tạo đối tượng và item riêng
  const hoTen = {
    Ho:'Nguyen',
    ten:'Tam'
  };
// In ra property có name là Ho
  console.log('Ho',hoTen.Ho)
// Xóa property có name là Ho
  delete hoTen.Ho;
// In ra property có name là Ho sau khi xóa
  console.log('Ho',hoTen.Ho)
```

- Để xóa **item** của **object**, ta sử dụng toán tử **delete**. Bạn không thể xóa bỏ **item** kế thừa, để xóa bỏ **item** này bạn phải xóa bỏ **item** được kế thừa của **Object** nguyên mẫu.
- Toán tử **delete** trả về true nếu **item** được xóa bỏ thành công. Và đáng ngạc nhiên, nó cũng trả về **true** nếu **item** không tồn tại hoặc không thể xóa bỏ.
- Nếu **item** đã được xóa và bạn vẫn hiển thị nó ra thì sẽ nhận được **undefined** ( không tồn tại )


# Kết bài #
Cảm ơn các bạn đã cùng mình tìm hiểu cơ bản về **Object** trong **JavaScript**, mong rằng bài viết này giúp ích các bạn thêm kiến thức, nếu thấy bài viết có gì không phù hợp hoặc bổ sung, mọi đóng góp xin bình luận phía dưới,

**Xin cảm ơn !**

## Nguồn tham khảo ##
http://javascriptissexy.com/javascript-objects-in-detail/

https://viblo.asia/p/16-khai-niem-javascript-can-phai-nam-ro-phan-1-javascript-object-gGJ59jR9KX2#_tiep-can-thuoc-tinh-cua-object-10

https://kipalog.com/posts/Ban-ve-khai-niem-Object-trong-Javascript