Tiếp tục về loạt bài JavaScript, hôm nay chúng ta sẽ tìm hiểu về `Objects` và `Arrays` trong `ES6`. ES6 cung cấp cho chúng ta những cách mới để làm việc với `Objects` và `Arrays`, đặc biệt là phạm vi dữ liệu trong hai đối tượng trên. Bài viết sẽ bao gồm ba nội dung là: `destructuring assignment`, `object literal enhancement` và `the spread operator`.

## Destructuring Assignment
`Destructuring assignment` cho phép chúng ta giới hạn phạm vi cục bộ của các trường trong một object và đưa chúng ra để sử dụng. 
Ví dụ chúng ta có một object là `sandwich` và object này có 4 trường, tuy nhiên chúng ta chỉ muốn sử dụng 2 trường trong 4 trường đó và chúng ta sẽ giới hạn bằng `Destructuring assignment` như sau
```javascript
        let sandwich = {
            bread: "dutch crunch",
            meat: "tuna",
            cheese: "swiss",
            toppings: ["lettuce", "tomato", "mustard"]
        }
        // destructuring assignment
        let {bread, meat} = sandwich
        
        console.log(bread, meat) // dutch crunch tuna
```
Dòng lệnh `let {bread, meat} = sandwich` đã lấy hai trường `bread` và `meat` và tạo ra 2 biến cục bộ tương ứng là `bread` và `meat`, dó đó hai biến này có thể thay đổi được (chỉ giá trị của hai biến cục bộ thay đổi còn giá trị của hai trường trên trong object `sandwich` thì vẫn được giữ nguyên). Ví dụ
```javascript
        // destructuring assignment
        let {bread, meat} = sandwich

        bread = "garlic"
        meat = "turkey"

        console.log(bread, meat) // garlic turkey
        console.log(sandwich.bread, sandwich.meat) // dutch crunch tuna
```
Các bạn để ý là chúng ta sử dụng từ khóa `let` để `destructuring` nên giá trị có thể thay đổi được, nếu chúng ta sử dụng từ khóa `const` thì hai giá trị của biến cục bộ này sẽ không thể thay đổi. Ví dụ
```javascript
        // destructuring assignment
        const {bread, meat} = sandwich

        bread = "garlic"
        meat = "turkey"

        console.log(bread, meat) // TypeError: invalid assignment to const `bread'
```
Chúng ta cũng có thể `destructuring` cho tham số của một function. Chúng ta xem xét ví dụ sau
```javascript
        let lordify = regularPerson => {
            console.log(`${regularPerson.firstname} of Canterbury`)
        }
        
        let regularPerson = {
            firstname: "Bill",
            lastname: "Wilson"
        }
        
        lordify(regularPerson) // Bill of Canterbury
```
Thay thế cho việc sử dụng cú pháp `.` (regularPerson.firstname) để truy cập vào đối tượng, ta sẽ sử dụng `destructuring` để lấy giá trị mong muốn từ `regularPerson`.
```javascript
        let lordify = ({firstname}) => {
            console.log(`${firstname} of Canterbury`)
        }
         lordify(regularPerson) // Bill of Canterbury
```
Ngoài ra `Destructuring` còn được áp dụng cho `Arrays`. Ví dụ chúng ta muốn lấy giá trị của phần tử đầu tiên của một `array`
```javascript
        // destructuring assignment
        let [firstResort] = ["Kirkwood", "Squaw", "Alpine"]
        console.log(firstResort) // Kirkiwood
```
Một hướng khác, nếu chúng ta muốn lấy giá trị của phần tử thứ 2 hoặc thứ 3 ta làm như sau
```javascript
        // destructuring assignment
        let [, secondResort] = ["Kirkwood", "Squaw", "Alpine"]
        console.log(secondResort) // Squaw
        let [, , thirdResort] = ["Kirkwood", "Squaw", "Alpine"]
        console.log(thirdResort) // Alpine
```
Chúng ta sẽ thay thế các vị trí của các phần tử không cần thiết bằng dấu `,`, từ đó ta sẽ lấy được giá trị của phần tử tương ứng. Chú ý `let [firstResort]` là cách viết gọn của `let [firstResort , ,]`, tương tự  `let [, secondResort]` là cách viết gọn của ` let [, secondResort ,]`.
 ## Object Literal Enhancement
 `Object literal enhancement` là một cách mới để chúng ta tương tác với các `object`. Với object literal enhancement, chúng ta có thể tổ hợp các biến `global` và đưa chúng vào trong một object. Ví dụ
 ```javascript
        let name = "Tuan"
        let age = 25
        // object literal enhancement
        let person = {name, age}

        console.log(person) // {name: "Tuan", age: 25}
 ```
 Như vậy, `name` và `age` bây giờ là các key của đối tượng person.
 
 Mặt khác, chúng ta còn có thể tạo hoặc tái cấu trúc object `method` với object literal enhancement
 ```javascript
        let name = "Tuan"
        let age = 25
        let print = function() {
            console.log(`${this.name} is ${this.age} year olds`)
        }

        // object literal enhancement
        let person = {name, age, print}

        person.print() // Tuan is 25 year olds
 ```
 Chú ý ở trên chúng ta sử dụng từ khóa `this` để truy cập key của object.
 
 Khi định nghĩa một object method, chúng ta không cần thiết sử dụng từ khóa `function`
 ```javascript
         // OLD
        var bike = {
            name: "name",
            run: function() {
                console.log("Running!")
            }
        }
         // NEW
         const bike = {
            name: "name",
            run() {
                console.log("Running!")
            }
        }
 ```
 Như vậy `Object literal enhancement` đã cho phép chúng ta kéo các biến toàn cục `global` vào trong một `object` và làm code ngắn gọn hơn với việc không cần thiết sử dụng từ khóa `function`.
## The Spread Operator
`The spread operator` là dấu ba chấm (...) và cú pháp này sẽ giúp chúng ta xử lý một object hoặc array theo một vài cách mới. Đầu tiên, the spread operator cho phép chúng ta tổ hợp nội dung của một mảng (array). Ví dụ, chúng ta sẽ có hai arrays và tổ hợp chúng thành một mảng thứ ba
```javascript
        let peaks = ["Tallac", "Ralston", "Rose"]
        let canyons = ["Ward", "Blackwood"]
        // the spread operator
        let arr = [...peaks, ...canyons]

        console.log(arr.join(', ')) // Tallac, Ralston, Rose, Ward, Blackwood
```
Tất cả các phần tử của peaks và canyons đã được đẩy vào một mảng mới là `arr`.

Chúng ta sẽ xem xét một vấn đề sau, giả sử chúng ta có một mảng `peaks` như ví dụ trước và chúng ta muốn lấy giá trị của phần tử cuối cùng trong mảng sử dụng `destructuring` và theo cách lấy phần tử đầu tiên. Chúng ta có thể xử lý vấn đề này như sau
```javascript
        let peaks = ["Tallac", "Ralston", "Rose"]
        let [last] = peaks.reverse()
        
        console.log(last) // Rose
        console.log(peaks.join(", ")) // Rose, Ralston, Tallac
```
Tuy nhiên với cách trên thì bản thân mảng `peaks` đã bị đảo ngược (reverse) tức là mảng `peaks` đã bị thay đổi. Khi sử dụng `the spread operator` thì chúng ta không làm thay đổi mảng nguyên gốc ban đầu, chúng ta có thể tạo ra một bản sao của mảng và reverse bản sao này để đảm bảo mảng ban đầu ko bị thay đổi
```javascript
        let peaks = ["Tallac", "Ralston", "Rose"]
        // the spread operator
        let [last] = [...peaks].reverse()

        console.log(last) // Rose
        console.log(peaks.join(", ")) // Tallac, Ralston, Rose
```
Chúng ta cũng có thể sử dụng `the spread operator` để lấy ra một hoặc một vài phần tử trong mảng
```javascript
        let lakes = ["Donner", "Marlette", "Fallen Leaf", "Cascade"]
        let [first, ...rest] = lakes
        
        console.log(first) // Donner
        console.log(rest.join(", ")) // Marlette, Fallen Left, Cascade
```

Chúng ta còn có thể sử dụng `the spread operator` để tập hợp tham số của `function` như một mảng. Ví dụ
```javascript
        function show(...args) {
            console.log(args.length)
        }

        show("Tuan") // 1
        show("Tung", "Tuan") // 2
```
Ngoài ra, chúng ta cũng có thể sử dụng `the spread operator` cho object. Cách sử dụng tương tự với array. 
```javascript
        let morning = {
            breakfast: "oatmeal",
            lunch: "peanut butter and jelly"
        }
        let dinner = "mac and cheese"
        let backpackingMeals = {
            ...morning,
            dinner
        }
        console.log(backpackingMeals) // {breakfast: "oatmeal", lunch: "peanut butter and jelly", dinner: "mac and cheese"}
```
Như vậy chúng ta đã nắm rõ được một số cách dùng của các cú pháp trên. Nếu có gì sai sót, các bạn hãy để lại bình luận phía dưới để bài viết được hoàn thiện hơn. Hẹn gặp lại các bạn ở bài viết lần sau.
#### Tài liệu tham khảo: http://shop.oreilly.com/product/0636920049579.do
#### Cảm ơn các bạn đã đọc bài viết. Happy coding!!!