# Lập trình hướng đối tượng của JavaScript: Chỉ có hai kỹ thuật quan trọng
* JavaScript Objects in Detail
* JavaScript Prototype

Bài viết sẽ chỉ tập trung vào hai kỹ thuật tốt nhất để triển khai OOP trong JavaScript. Đúng vậy, tồn tại nhiều kỹ thuật để triển khai OOP trong JavaScript, nhưng thay vì đánh giá từng kỹ thuật, chúng ta chọn tập trung vào hai kỹ thuật tốt nhất: kỹ thuật tốt nhất để tạo các đối tượng với các chức năng chuyên biệt (hay còn gọi là Encapsulation) và kỹ thuật tốt nhất để sử dụng lại mã (hay còn gọi là Inheritance ). "Tốt nhất" ở đây có nghĩa là phù hợp nhất, hiệu quả nhất, mạnh mẽ nhất.

# Tổng quát về Encapsulation và Inheritance 
**Objects** (Đối tượng) có thể được coi là tác nhân chính trong một ứng dụng, hoặc đơn giản là “những thứ” hoặc blocks chính được xây dựng để thực hiện tất cả công việc. Như bạn đã biết, các objects ở khắp mọi nơi trong JavaScript vì mọi thành phần trong JavaScript là một Objects, bao gồm Functions, Strings và Numbers. Chúng ta thường sử dụng các object literals hoặc các hàm constructor để tạo các objects.

**Encapsulation** (Đóng gói) đề cập đến việc bao bọc tất cả các chức năng của một object bên trong object đó, để các hoạt động bên trong object (các methods và properties của nó) bị ẩn khỏi phần còn lại của ứng dụng.

**Inheritance** (Kế thừa) đề cập đến một đối tượng có thể kế thừa các methods và properties  từ một object mẹ (một Class trong các ngôn ngữ OOP khác hoặc một Hàm trong JavaScript).

Cả hai khái niệm encapsulation và inheritance, đều quan trọng vì chúng cho phép chúng ta xây dựng các ứng dụng với code có thể sử dụng lại, kiến trúc có thể mở rộng và các chức năng được trừu tượng hóa. Có thể bảo trì, có thể mở rộng, hiệu quả.

Ví dụ:
```
// Tree là hàm constructor bởi vì chúng ta sẽ sủ dụng keyword mới để gọi nó.
function Tree (typeOfTree) {} 

// bananaTree là kế thừa của hàm Tree.
var bananaTree = new Tree ("banana");
```
Ở ví dụ trên, bananaTree là một object được tạo từ hàm tạo Tree. Tree vừa là một đối tượng vừa là một hàm, bởi vì các hàm là các đối tượng trong JavaScript. bananaTree có thể có các phương thức và thuộc tính của riêng nó và kế thừa các phương thức và thuộc tính từ đối tượng Tree, chúng ta sẽ thảo luận chi tiết khi chúng ta tìm hiểu về kế thừa bên dưới.

## 1. OOP trong JavaScript
Hai nguyên tắc quan trọng với OOP trong JavaScript là **Object Creation patterns (Encapsulation)**  và **Code Reuse patterns (Inheritance)**. Khi xây dựng ứng dụng, bạn tạo nhiều đối tượng và có nhiều cách để tạo các đối tượng này, ví dụ:
```
var myObj = {name: "Richard", profession: "Developer"}; 
```
    
Bạn có thể sử dụng prototype pattern, thêm từng phương thức và thuộc tính trực tiếp trên prototype pattern của đối tượng. Ví dụ:
```
function Employee () {}

Employee.prototype.firstName = "Abhijit";
Employee.prototype.lastName = "Patel";
Employee.prototype.startDate = new Date();
Employee.prototype.signedNDA = true;
Employee.prototype.fullName = function () {
console.log (this.firstName + " " + this.lastName); 
};

var abhijit = new Employee () //
console.log(abhijit.fullName()); // Abhijit Patel
console.log(abhijit.signedNDA); // true
```

Bạn cũng có thể sử dụng constructor pattern, một hàm constructor (Classes trong ngôn ngữ khác, nhưng là Hàm trong JavaScript). Ví dụ:
```
function Employee (name, profession) {
this.name = name;
this.profession = profession;
} // Employee () is the constructor function because we use the new keyword below to invoke it.

var richard = new Employee (“Richard”, “Developer”) // richard is a new object we create from the Employee () constructor function.

console.log(richard.name); //richard
console.log(richard.profession); // Developer
```

Hai nguyên tắc tổng quát này — tạo các đối tượng (đặc biệt là từ các Hàm constructor) và cho phép các đối tượng kế thừa các properties and methods — là trọng tâm chính của bài viết này và là các khái niệm chính với OOP trong JavaScript. Đầu tiên chúng ta thảo luận về object creation pattern.

## 2. Encapsulation trong JavaScript

(The Best Object Creation Pattern: Combination Constructor/Prototype Pattern)

Như đã viết ở trên, một trong những nguyên tắc chính của OOP là Encapsulation (tính đóng gói): đặt tất cả các event bên trong của một object vào bên trong object đó. Để thực hiện tính năng đóng gói trong JavaScript, chúng ta phải xác định các phương thức và thuộc tính cốt lõi trên đối tượng đó. Để làm điều này, chúng ta sẽ sử dụng pattern tốt nhất để đóng gói trong JavaScript: Combination Constructor / Prototype Pattern .Bạn không cần phải ghi nhớ vì chúng ta chỉ quan tâm đến việc sử dụng nó.

### Tại sao lại sử dụng Encapsulation?

Khi bạn chỉ muốn tạo một đối tượng chỉ để lưu trữ một số dữ liệu và nó là đối tượng duy nhất thuộc loại này, bạn có thể sử dụng một đối tượng theo nghĩa đen và tạo đối tượng của mình. Điều này khá phổ biến và bạn sẽ sử dụng pattern đơn giản này thường xuyên.

Tuy nhiên, bất cứ khi nào bạn muốn tạo các đối tượng có các chức năng tương tự (để sử dụng các phương thức và thuộc tính giống nhau), bạn đóng gói các chức năng chính trong một Hàm và bạn sử dụng phương thức khởi tạo của Hàm đó để tạo các đối tượng. Đây là bản chất của sự đóng gói. Và chính nhu cầu đóng gói này là điều chúng ta quan tâm và tại sao chúng ta lại sử dụng Combination Constructor/Prototype Pattern.

### Sử dụng Combination Constructor/Prototype Pattern

User Function:

```

function User (theName, theEmail) {
    this.name = theName;
    this.email = theEmail;
    this.quizScores = [];
    this.currentScore = 0;
}

User.prototype = {
    constructor: User,
    saveScore:function (theScoreToAdd)  {
        this.quizScores.push(theScoreToAdd)
    },
    showNameAndScores:function ()  {
        var scores = this.quizScores.length > 0 ? this.quizScores.join(",") : "No Scores Yet";
        return this.name + " Scores: " + scores;
    },
    changeEmail:function (newEmail)  {
        this.email = newEmail;
        return "New Email Saved: " + this.email;
    }
}
```

### Tạo kế thừa từ User Function

```
// A User 
firstUser = new User("Richard", "Richard@examnple.com"); 
firstUser.changeEmail("RichardB@examnple.com");
firstUser.saveScore(15);
firstUser.saveScore(10); 

firstUser.showNameAndScores(); //Richard Scores: 15,10

// Another User
secondUser = new User("Peter", "Peter@examnple.com");
secondUser.saveScore(18);
secondUser.showNameAndScores(); //Peter Scores: 18
```

### Giải thích Combination Constructor/Prototype Pattern

Các dòng  khởi tạo các properties. Các properties này sẽ được xác định trên từng User được tạo. Vì vậy, các giá trị sẽ khác nhau đối với mỗi user. Việc sử dụng từ khóa this bên trong hàm chỉ định rằng các thuộc tính này sẽ là duy nhất cho mọi phiên bản của đối tượng User:

```
this.name = theName;
this.email = theEmail;
this.quizScores = [];
this.currentScore = 0;
```

Trong đoạn code dưới đây, chúng ta đang ghi đè prototype property bằng một đối tượng theo nghĩa đen và chúng ta xác định tất cả các phương thức của chúng a (sẽ được kế thừa bởi tất cả các User instances) trong đối tượng này.

```
User.prototype = {
    constructor: User,
    saveScore:function (theScoreToAdd)  {
        this.quizScores.push(theScoreToAdd)
    },
    showNameAndScores:function ()  {
        var scores = this.quizScores.length > 0 ? this.quizScores.join(",") : "No Scores Yet";
        return this.name + " Scores: " + scores;
    },
    changeEmail:function (newEmail)  {
        this.email = newEmail;
        return "New Email Saved: " + this.email;
    }
}
```
Cách ghi đè hàm tạo này đơn giản là để thuận tiện, vì vậy chúng ta không phải viết User.prototype mỗi lần, như thế này:

```
User.prototype.constructor = User;
User.prototype.saveScore = function (theScoreToAdd)  {
    this.quizScores.push(theScoreToAdd)
};

User.prototype.showNameAndScores = function ()  {
    var scores = this.quizScores.length > 0 ? this.quizScores.join(",") : "No Scores Yet";
    return this.name + " Scores: " + scores;
};

User.prototype.changeEmail =  function (newEmail)  {
    this.email = newEmail;
    return "New Email Saved: " + this.email;
}
```

Bằng cách ghi đè prototype bằng một đối tượng mới , chúng ta có tất cả các phương thức được tổ chức ở một nơi và bạn có thể thấy rõ hơn cách đóng gói mà chúng ta đang theo đuổi. Và tất nhiên bạn code ít hơn. 

### JavaScript Prototype

Trong JavaScript, bạn thêm các methods và properties trên prototype property khi bạn muốn các thể hiện của một đối tượng kế thừa các methods và properties đó. Đây là lý do chúng ta thêm các phương thức trên thuộc tính User.prototype để chúng có thể được sử dụng bởi tất cả các phiên bản của đối tượng User. 

### Constructor Property

Trong phân JavaScript Prototype,  đã giải thích rằng mọi hàm đều có thuộc tính constructor và thuộc tính này trỏ đến constructor của hàm. Ví dụ:

```
function Fruit () {}
var newFruit = new Fruit ();
console.log (newFruit.constructor) // Fruit ()
```
Một nhược điểm của việc overwriting prototype là thuộc tính constructor property không còn trỏ đến prototype, vì vậy chúng ta phải thiết lập nó theo cách thủ công. như thế này:

```
constructor: User
```

### Prototype Methods

Trong các dòng tiếp theo, chúng ta tạo các phương thức trên prototype để tất cả các trường hợp của Users  có thể truy cập vào các phương thức này.

```
saveScore:function (theScoreToAdd)  {
        this.quizScores.push(theScoreToAdd)
    },
    showNameAndScores:function ()  {
        var scores = this.quizScores.length > 0 ? this.quizScores.join(",") : "No Scores Yet";
        return this.name + " Scores: " + scores;
    },
    changeEmail:function (newEmail)  {
        this.email = newEmail;
        return "New Email Saved: " + this.email;
    }
```

Sau đó, chúng ta tạo các instances của đối tượng User:

```
// A User 
firstUser = new User("Richard", "Richard@examnple.com"); 
firstUser.changeEmail("RichardB@examnple.com");
firstUser.saveScore(15);
firstUser.saveScore(10); 

firstUser.showNameAndScores(); //Richard Scores: 15,10

// Another User
secondUser = new User("Peter", "Peter@examnple.com");
secondUser.saveScore(18);
secondUser.showNameAndScores(); //Peter Scores: 18
```

Như bạn thấy, chúng ta đã đóng gói tất cả các chức năng cho User bên trong User function, để mỗi instance của User có thể sử dụng các prototype methods (như changeEmail) và xác định các  nstance  của thuộc tính của riêng họ (như tên và email).

Với pattern này, bạn có thể sử dụng các toán tử và phương thức chuẩn trên các phiên bản, bao gồm toán tử instanceOf, vòng lặp for-in (thậm chí hasOwnProperty) và constructor property.

# Kết luận
Trên đây là một số điều chúng ta tổng hợp được về một số vấn đề về Lập trình hướng đối tượng trong Javascript. Trong bài sau, chúng ta sẽ đề cập đến Inheritance. Cảm ơn các bạn đã theo dõi.

Be good and do good work.