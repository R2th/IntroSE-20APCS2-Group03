## 3. Inheritance trong JavaScript

(Pattern tốt nhất: Parasitic Combination Inheritance)

Việc triển khai Inheritance trong trong ứng dụng câu hỏi *(quiz application)* này sẽ cho phép chúng ta kế thừa chức năng từ các hàm cha để chúng ta có thể dễ dàng sử dụng lại code trong ứng dụng của mình và mở rộng chức năng của các objects. Các objects có thể sử dụng các chức năng kế thừa của chúng và vẫn có các chức năng chuyên biệt của riêng chúng.

Pattern tốt nhất cho việc implement inheritance trong Javascript **Parasitic Combination inheritance** . Trước khi chúng ta đi sâu vào mô hình này hãy xem tại sao nó lại phù hợp trong việc sử dụng inheritance nhé.

Chúng ta đã triển khai thành công tính năng đóng gói bằng cách bao bọc tất cả các function cho users trong ứng dụng này bằng cách thêm các methods và properties, người dùng sẽ cần một User function và tất cả các trường hợp của User sẽ có những properties và methods đó.

### Tại sao lại sử dụng kế thừa (Inheritance)
Tiếp theo, chúng ta sẽ đóng gói tất cả các chức năng của Question.  Question function (là 1 Class trong các ngôn ngữ OOP) sẽ có tất cả các thuộc tính và phương thức mà mỗi loại câu hỏi sẽ cần phải có.Ví dụ, mỗi câu hỏi sẽ bao gồm: câu hỏi, các sự lựa chọn, các đáp án. Nó sẽ là các properties. Thêm vào đó mỗi câu hỏi cũng sẽ có các methods: getCorrectAnswer and getUserAnswer, and displayQuestion.

Để úng dụng này tạo ra các kiểu câu hỏi khác nhau, chúng ta sẽ implement một MultipleChoiceQuestion function và một DragDropQuestion function. Để implement được nó sẽ không hợp lý nếu đặt các properties và methods được nêu ở trên (tất cả các câu hỏi sẽ sử dụng) vào trong MultipleChoiceQuestion và  DragDropQuestion functions một cách riêng biệt và lặp lại code, nó sẽ bị thừa.

Thay vào đó chúng ta sẽ để các properties và methods  này vào trong Question object và để cho MultipleChoiceQuestion, DragDropQuestion functions kế thừa nó. Đây là lúc mà chúng ta thấy được hiệu quả của Inheritance, chúng ta có thể sử dụng lại code trong toàn bộ source của mình một cách hiệu quả và duy trì code tốt hơn.

Bởi vì bố trí html của hàm MultipleChoiceQuestion sẽ khác DragDropQuestion, nên phương thức displayQuestion sẽ triển khai khác nhau ở mỗi cái. Vì vậy chúng ta sẽ ghi đè (override) phương thức displayQuestion vào DragDropQuestion. Hàm override cũng là 1 quy tắc trong hướng đối tượng OOP.

**Lets Code.**

### Triển khai Parasitic Combination Inheritance Pattern

Để thực hiện mẫu này, chúng ta phải sử dụng hai kỹ thuật được phát minh đặc biệt để kế thừa trong JavaScript. Sau đây là một số lưu ý về các kỹ thuật này. Không cần phải ghi nhớ bất kỳ chi tiết nào; chỉ cần hiểu và nhận thức được các kỹ thuật.

***Kế thừa nguyên mẫu* của Douglas Crockford**
Douglas Crockford đã tạo phương thức Object.create sau đây, được sử dụng theo cách cơ bản để triển khai kế thừa với mẫu mà chúng ta đang sử dụng.

**Phương thưc Object.create**
```js
 if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        function F() {
        }

        F.prototype = o;
        return new F();
    };
}
```
Phương thức này đã được thêm vào đặc tả ECMAScript5 và bạn có thể truy cập nó bằng Object.create ().

```js

Object.create = function (o) {
//It creates a temporary constructor F()
        function F() {
        }
//And set the prototype of the this constructor to the parametric (passed-in) o object
//so that the F() constructor now inherits all the properties and methods of o
        F.prototype = o;

//Then it returns a new, empty object (an instance of F())
//Note that this instance of F inherits from the passed-in (parametric object) o object. 
//Or you can say it copied all of the o object's properties and methods
        return new F();
    }
```
Điểm mấu chốt của vấn đề với phương thức Object.create này là bạn truyền vào nó một đối tượng mà bạn muốn kế thừa và nó trả về một đối tượng mới kế thừa từ đối tượng mà bạn đã truyền vào nó. Ví dụ:

```js
// We have a simple cars object
var cars = {
    type:"sedan",
    wheels:4
};

// We want to inherit from the cars object, so we do:
var toyota = Object.create (cars); // now toyota inherits the properties from cars
console.log(toyota.type); // sedan
```
Tất nhiên bây giờ chúng ta có thể thêm nhiều thuộc tính hơn vào đối tượng toyota, tiếp tục ngay sau đây.

Hàm tiếp theo chúng ta sẽ sử dụng để kế thừa là hàm inheritPrototype. Hàm này thực hiện ngắn gọn của Parasitic Combination Inheritance cho chúng ta. Truyền vào parent object (hoặc Super Class) và đối tượng child (hoặc Sub Class), và hàm thực hiện parasitic combination inheritance: làm cho đối tượng child kế thừa từ đối tượng parent.

```js
function inheritPrototype(childObject, parentObject) {
    // As discussed above, we use the Crockford’s method to copy the properties and methods from the parentObject onto the childObject
// So the copyOfParent object now has everything the parentObject has 
    var copyOfParent = Object.create(parentObject.prototype);

    //Then we set the constructor of this new object to point to the childObject.
// Why do we manually set the copyOfParent constructor here, see the explanation immediately following this code block.
    copyOfParent.constructor = childObject;

    // Then we set the childObject prototype to copyOfParent, so that the childObject can in turn inherit everything from copyOfParent (from parentObject)
   childObject.prototype = copyOfParent;
}
```
**Tại sao chúng ta lại đặt copyOfParent.constructor theo cách thủ công?**
Chúng ta đặt thuộc tính copyOfParent.constructor một cách rõ ràng để trỏ đến hàm tạo childObject vì trong bước trước, biến var copyOfParent = Object.create (parentObject.prototype), đây là những gì chúng ta đã thực sự:

```js
// We made a new object and overwrote its prototype with the parentObject prototype:
function F() {
        }
F.prototype = parentObject.prototype;
// Then it was this new F object we assigned to copyOfParent.
// All of this was done inside the Object.create () method.
```

Đối tượng F mới này, chúng ta đã gán cho copyOfParent, không còn thuộc tính constructor nữa vì chúng ta đã ghi đè lên toàn bộ nguyên mẫu của nó. Bất cứ khi nào bạn ghi đè nguyên mẫu của đối tượng (object.prototype = someVal), bạn cũng sẽ ghi đè thuộc tính constructor của đối tượng.

Để đảm bảo rằng chúng ta có giá trị chính xác cho hàm tạo copyOfParent, chúng ta đặt nó theo cách thủ công như thế này:
**copyOfParent.constructor = childObject;**

Về cơ bản, chúng ta đang sao chép tất cả các properties và methods từ parentObject sang childObject, nhưng chúng ta đang sử dụng copyOfParent làm trung gian cho bản sao. Và vì nguyên mẫu childObject bị ghi đè trong quá trình sao chép, chúng ta đặt phương thức khởi tạo copyOfParent theo cách thủ công thành childObject. Sau đó, chúng ta đặt nguyên mẫu childObject thành copyOfParent để childObject kế thừa từ parentObject.

**Quay lại nội dung tạo ứng dụng câu hỏi *(quiz application)* **

Bây giờ chúng ta đã hiểu về hàm inheritPrototype mà chúng ta sẽ sử dụng, giờ chúng ta sẽ triển khai hàm khởi tạo Question.

Lưu ý rằng đôi khi tôi sử dụng “constructor” và “function” thay thế cho nhau trong bài viết cụ thể này khi đề cập đến hàm, bởi vì hàm sẽ được sử dụng như một constructor để tạo các phiên bản khác.

**Hàm khởi tạo Question (parent of all Question Objects):**
(Có thể được coi là Super Class for Questions)

```js
 // The Question function is the parent for all other question objects;
// All question objects will inherit from this Question constructor

function Question(theQuestion, theChoices, theCorrectAnswer) {
    // Initialize the instance properties
    this.question = theQuestion;
    this.choices = theChoices;
    this.correctAnswer = theCorrectAnswer;
    this.userAnswer = "";

    // private properties: these cannot be changed by instances
    var newDate = new Date(),
    // Constant variable: available to all instances through the instance method below. This is also a private property.
        QUIZ_CREATED_DATE = newDate.toLocaleDateString();

// This is the only way to access the private QUIZ_CREATED_DATE variable 
// This is an example of a privilege method: it can access private properties and it can be called publicly
    this.getQuizDate = function () {
        return QUIZ_CREATED_DATE;
    };

// A confirmation message that the question was created
    console.log("Quiz Created On: " + this.getQuizDate());
}
```

**Thêm Prototype Methods cho Question Object**
Tất cả các phiên bản của Question object i sẽ kế thừa các phương thức này, bởi vì chúng ta đang thêm các phương thức trên Question prototype.
```js
// Define the prototype methods that will be inherited
Question.prototype.getCorrectAnswer = function () {
    return  this.correctAnswer;
};

Question.prototype.getUserAnswer = function () {
    return this.userAnswer;
};

Question.prototype.displayQuestion = function () {
    var questionToDisplay = "" + this.question + "";
        choiceCounter = 0;

    this.choices.forEach(function (eachChoice)  {
        questionToDisplay += "" +eachChoice + "";
        choiceCounter++;
    });
    questionToDisplay += "";

    console.log (questionToDisplay);
}; 
```

**Child Questions (Sub Classes of the Question object)**
Bây giờ chúng ta có thiết lập  Question constructor object, chúng ta có thể kế thừa từ nó và tạo các lớp con children objects). Với kế thừa từ bây giờ chúng ta có thể tạo ra tất cả các loại câu hỏi và mỗi câu hỏi có thể khá linh hoạt.

Đầu tiên,  **Multiple Choice Question**:
```js
// Create the MultipleChoiceQuestion
function MultipleChoiceQuestion(theQuestion, theChoices, theCorrectAnswer){
// For MultipleChoiceQuestion to properly inherit from Question, here inside the MultipleChoiceQuestion constructor, we have to explicitly call the Question constructor
// passing MultipleChoiceQuestion as the this object, and the parameters we want to use in the Question constructor:
    Question.call(this, theQuestion, theChoices, theCorrectAnswer);
};
```
Và sau đó chúng ta phải sử dụng hàm inheritPrototype:
```js
// inherit the methods and properties from Question
inheritPrototype(MultipleChoiceQuestion, Question);
```
Sau khi chúng ta đã kế thừa từ Question, chúng ta sẽ thêm các phương thức vào hàm MultipleChoiceQuestion nếu cần. Nhưng chúng ta phải thêm sau khi chúng ta kế thừa, không phải trước, hoặc tất cả các methods  chúng ta xác định trên prototype  của nó sẽ bị ghi đè. Chúng ta không thêm bất kỳ bây giờ.

**A Drag and Drop Question**
Theo cách tương tự, chúng ta có thể đưa ra một dạng câu hỏi khác:

```js
// Create the DragDropQuestion
function DragDropQuestion(theQuestion, theChoices, theCorrectAnswer) {
    Question.call(this, theQuestion, theChoices, theCorrectAnswer);
}

// inherit the methods and properties from Question
inheritPrototype(DragDropQuestion, Question);
```
Overriding Methods
Overriding methods là một nguyên tắc khác của OOP và chúng ta có thể thực hiện dễ dàng với pattern này. Vì Drag and Drop questions sẽ có bố cục HTML khác với các  Multiple Choice questions (ví dụ: không có nút radio), chúng tôi có thể ghi đè displayQuestion method để nó hoạt động cụ thể đối với nhu cầu của Drag and Drop question:

```js
// Override the displayQuestion method it inherited
DragDropQuestion.prototype.displayQuestion = function () {
    // Just return the question. Drag and Drop implementation detail is beyond this article
    console.log(this.question);
};
```
Trong ứng dụng Quiz này, chúng ta sẽ tạo một hàm constructor Quiz là ứng dụng chính để launches bài kiểm tra, nhưng trong bài viết này, chúng tôi có thể test inheritance code của mình bằng cách đơn giản thực hiện điều này:

```js
// Initialize some questions and add them to an array
var allQuestions = [
new MultipleChoiceQuestion("Who is Prime Minister of England?", ["Obama", "Blair", "Brown", "Cameron"], 3),
   
new MultipleChoiceQuestion("What is the Capital of Brazil?", ["São Paulo", "Rio de Janeiro", "Brasília"], 2),
   
new DragDropQuestion("Drag the correct City to the world map.", ["Washington, DC", "Rio de Janeiro", "Stockholm"], 0)
];

// Display all the questions
allQuestions.forEach(function (eachQuestion)  {
    eachQuestion.displayQuestion();
});
```

Nếu bạn run code, bạn sẽ thấy rằng displayQuestion cho câu hỏi trắc nghiệm trả về câu hỏi trong thẻ div, với các lựa chọn được định dạng bằng các nút radio bên trong thẻ li. Mặt khác, phương thức kéo và thả câu hỏi displayQuestion chỉ đơn giản là trả về câu hỏi mà không có lựa chọn.

Bạn có thể tự hỏi Combination Constructor/Prototype Pattern mà chúng ta đã sử dụng để đóng gói trước đó khác với Parasitic Combination Inheritance như thế nào. Chúng tương tự nhau, nhưng cái trước được sử dụng tốt nhất để đóng gói (tạo các đối tượng tùy chỉnh) và nó không có tất cả các cơ chế kế thừa như phân lớp (tạo các hàm child constructors kế thừa từ hàm parent constructor). Hơn nữa, inheritance pattern không chỉ thiết lập các đối tượng để chỉ kế thừa các properties and methods, nó cho phép các child objects trở thành parent objects của các đối tượng khác và bạn có thể sử dụng các object riêng, ghi đè và các khái niệm OOP khác. 


**Lời kết**
Trên đây là những điều chúng ta tổng hợp được về một số vấn đề về Lập trình hướng đối tượng trong Javascript. Cảm ơn các bạn đã theo dõi.

Be good and do good work.