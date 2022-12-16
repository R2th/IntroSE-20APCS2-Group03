**Closures**  (tạm dịch: bao đóng) cho phép lập trình viên Javascript viết mã tốt hơn.  Chúng ta thường sử dụng closures trong Javascript, dù ít hay nhiều kinh nghiệm thì chúng ta vẫn sẽ bắt gặp nó lần này đến lần khác. Bài viết này sẽ giải thích cho những người chưa biết hoặc đang mơ hồ về khái niệm closures, một cách đơn giản và ngắn gọn.

Bài viết này tương đối ngắn về closures trong Javascript. Bạn nên làm quen với khái niệm  **phạm vi biến**  (variable scope) trước khi đọc để dễ dàng nắm bắt hơn.

### Closure là gì ?
Một closure là một hàm bên trong mà có thể truy cập biến của hàm bên ngoài (chứa nó). Closure có 3 scope chain, đó là: Có thể truy cập đến biến của chính nó (biến được định nghĩa trong dấu ngoặc nhọn của nó); Có thể truy cập biến của hàm bên ngoài; Có thể truy cập biến toàn cục (global).

```
function a() {
    var name = "I'm a Copy";
    function b() { // Closure
        console.log(name);
    }
}
```

Hàm bên trong không chỉ truy cập được đến biến của hàm bên ngoài và còn sử dụng được các tham số của hàm bên ngoài nữa. *Chú ý là hàm bên trong này không thể gọi object arguments của hàm bên ngoài, mặc dù nó có thể sử dụng các tham số của hàm bên ngoài một cách bình thường.*

Ta có thể tạo một closure bằng cách thêm một hàm  bên trong một hàm khác.

```
function showName (firstName, lastName) { 
    var nameIntro = "Your name is ";
    
    // Đây là hàm bên trong mà có thể truy cập đến biến của hàm bên ngoài, truy cập được tham số của hàm ngoài.
    function makeFullName () {
        return nameIntro + firstName + " " + lastName;
    }
    
    return makeFullName ();
}

showName ("Michael", "Jackson"); // Your name is Michael Jackson
```

Closures được sử dụng nhiều trong NodeJS; Nó có trong kiến truc non-blocking, bất đồng bộ của NọdeJS. Ngoài ra Closures cũng được sử dụng nhiều trong Jquery, ví dụ:

```
$(function() {
    var selections = []; 
    $(".niners").click(function() { // Closure này có thể truy cập đến biến selections
        selections.push (this.prop("name")); // cập nhật biến selections trong scope của hàm ngoài.
    });
});
```

### Các quy tắc của closures và Side Effects của nó:
#### 1. Closures có thể truy cập biến của hàm bên ngoài ngay cả hàm bên ngoài đã trả về:
Một trong những "tính năng" hay ho quan trọng của closures đó là hàm bên trong vẫn có thể truy cập đến các biến số của hàm bên ngoài ngay cả khi hàm bên ngoài đã trả về. Khi các hàm trong Javascript thực thi, chúng sử dụng cùng scope chain. Điều này có nghĩa là sau khi hàm bên ngoài trả về, hàm bên trong vẫn có thể truy cập đến các biến của hàm bên ngoài. Do đó, ta có thể gọi hàm bên trong này trong chương trình sau đó. Ví dụ: 

```
function celebrityName (firstName) {
    var nameIntro = "This celebrity is ";
    // Đây là hàm bên trong mà có thể truy cập đến biến của hàm bên ngoài, truy cập được tham số của hàm ngoài.
   function lastName (theLastName) {
        return nameIntro + firstName + " " + theLastName;
    }
    return lastName;
}

var mjName = celebrityName ("Michael"); celebrityName (bên ngoài) đã trả về.

// Closure (lastName) được goi ở đây sau khi hàm ngoài đã trả về.
// Closure vẫn có thể truy cập được biến và tham số của hàm bên ngoài.
mjName ("Jackson"); // This celebrity is Michael Jackson.
```

#### 2. Closures lưu tham chiếu đến biến của hàm bên ngoài:
Closure không lưu giá trị. Closures trở nên thú vị khi giá trị của biến của hàm bên ngoài thay đổi trươc khi closures được gọi. Đây là một "tính năng" mạnh mẽ có thể được khai thác theo nhiều cách sáng tạo, ví dụ: 

```
function celebrityID () {
    var celebrityID = 999;
    // Ta đang trả về một object với các hàm bên trong.
    // Tất cả các hàm bên trong có thể truy cập đến biến của hàm ngoài (celebrityID).
    return {
        getID: function ()  {
            // Hàm này sẽ trả về celebrityID đã được cập nhật.
            // Nó sẽ trả về giá trị hiện tại của celebrityID, sau khi setID thay đổi nó.
          return celebrityID;
        },
        setID: function (theNewID)  {
            // Hàm này sẽ thay đổi biến của hàm ngoài khi gọi.
            celebrityID = theNewID;
        }
    }

}

var mjID = celebrityID (); //Lúc này, celebrityID đã trả về
mjID.getID(); // 999
mjID.setID(567); // Thay đổi biến của hàm ngoài
mjID.getID(); // 567: Tả về biến celebrityID đã được cập nhật.
```


#### 3. Closures đôi khi trở nên không như ý:
Bởi vì closures có thể truy cập đến các giá trị đã được cập nhật của các biến của hàm bên ngoài, chúng có thể gây ra bugs khi biến của hàm bên ngoài thay đổi với vòng lặp for, ví dụ: 

```
// Ví dụ này sẽ được giải thích bên dưới.
function celebrityIDCreator (theCelebrities) {
    var i;
    var uniqueID = 100;
    for (i = 0; i < theCelebrities.length; i++) {
      theCelebrities[i]["id"] = function ()  {
        return uniqueID + i;
      }
    }
    
    return theCelebrities;
}

var actionCelebs = [{name:"Stallone", id:0}, {name:"Cruise", id:0}, {name:"Willis", id:0}];

var createIdForActionCelebs = celebrityIDCreator (actionCelebs);

var stalloneID = createIdForActionCelebs [0];
console.log(stalloneID.id()); // 103
```

Trong ví dụ trên, trước khi hàm anonymous được gọi, giá trị của i là 3. Con số 3 được cộng vào uniqueID để tạo thành 103 cho tất cả celebritiesID. Vì vậy ở mỗi lúc trả về, thì giá trị nhận được là 103 thay vì 100, 101, 102 như mong muốn.

Như đã giải thích ở ví dụ trước, closure (hàm anonymous trong ví dụ) đã truy cập đến biến của hàm bên ngoài bằng tham chiếu, không phải truy cập giá trị. Vì vậy như ví dụ trước đã chỉ ra, chúng ta có thể truy cập các biến đã được cập nhật với closure, ví dụ này truy cập biến i khi nó đã bị thay đổi, kết quả là hàm bên ngoài chạy toàn bộ vòng lặp và trả về giá trị cuối cùng của i, là 103.

Để sửa bug này trong closures, ta có thể sử dụng Immediately Invoked Function Expression (IIFE), ví dụ như sau:

```
function celebrityIDCreator (theCelebrities) {
    var i;
    var uniqueID = 100;
    for (i = 0; i < theCelebrities.length; i++) {
        theCelebrities[i]["id"] = function (j)  {
            return function () {
                return uniqueID + j;
            } ()
        } (i); // Chạy ngay khi hàm được gọ với tham số i
    }

    return theCelebrities;
}

var actionCelebs = [{name:"Stallone", id:0}, {name:"Cruise", id:0}, {name:"Willis", id:0}];

var createIdForActionCelebs = celebrityIDCreator (actionCelebs);

var stalloneID = createIdForActionCelebs [0];
console.log(stalloneID.id); // 100

var cruiseID = createIdForActionCelebs [1]; console.log(cruiseID.id); // 101
```

Trên đây là bài viết  giải thích về Closures trong rất nhiều bài viết có trên mạng về Closures, hy vọng qua bài viết này bạn có thể hiểu một cách đơn giản về Closures. 

*Nguồn: https://javascriptissexy.com/understand-javascript-closures-with-ease/*