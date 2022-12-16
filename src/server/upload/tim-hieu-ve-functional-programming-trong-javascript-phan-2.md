### Giới thiệu
Ở phần một chắc hẳn chúng ta đã phần nào hiểu được Functional Programming và các khái niệm đi kèm với nó.
>Điều quan trọng nhất mà mình muốn chia sẻ ở đây là: "Dù có sử dụng frameworkJS nào đi chăng nữa, chúng ta cũng cần phải nắm chắc các kiến thức thuần túy của Javascript"

### Các mục đã nghiên cứu ở phần 1:
- [Functional Programming là gì?](https://viblo.asia/p/tim-hieu-ve-functional-programming-trong-javascript-phan-1-RQqKLYdzZ7z)
- [Các mô hình lập trình chính](https://viblo.asia/p/tim-hieu-ve-functional-programming-trong-javascript-phan-1-RQqKLYdzZ7z)
- [Mathematical Function hoặc Pure Function](https://viblo.asia/p/tim-hieu-ve-functional-programming-trong-javascript-phan-1-RQqKLYdzZ7z)
- [Tại sao nên sử dụng Functional Programming?](https://viblo.asia/p/tim-hieu-ve-functional-programming-trong-javascript-phan-1-RQqKLYdzZ7z)
### Nội Dung
### Array Functions

Cùng làm một ví dụ để hiểu hơn về Array Functions nhé. Đầu tiên khởi tạo một array.
```javascript
    let languages = [
        {name: 'VueJS', isActive: true, total: 100},
        {name: 'ReactJS', isActive: false, total: 120},
        {name: 'NodeJS', isActive: true, total: 130}
    ];
    
    // Imperative
    let activeLanguages = [];
    for (var i = 0; i < languages.length; i++) {
       let item = languages[i];
       if (item.isActive) {
           activeLanguages.push(item);
       }
     }
     console.log(activeLanguages)
     
    // Declarative
    // Use filter
    let activeLanguages = [];
    activeLanguages = languages.filter((item) => {
        return item.isActive;
    });
    console.log(activeLanguages)
    
    //Use map
    let activeLanguages = [];
    activeLanguages = languages.map((item) => {
        return item.isActive;
    });
    console.log(activeLanguages)
```
- Hàm filter cũng nhận vào 3 tham số như hàm map(), tuy nhiên trong trường hợp này ta chỉ sử dụng tham số đầu tiên. Nó cũng có các lợi ích như hàm map(), cũng sử dụng câu lệnh return trong thân hàm. Tuy nhiên, với filter(), ta cần đảm bảo câu lệnh return trả về true hoặc false vì nó là điều kiện để "lọc" ra các giá trị phù hợp trong mảng.
- Với map(), ta không cần quản lý trạng thái của vòng lặp như với for-loop.
Ta không cần sử dụng chỉ số để truy cập vào đúng phần tử trong mảng.
Ta không cần tạo mảng mới và push() từng giá trị vào. map() trả về 1 mảng mới với các giá trị đã được chỉnh sửa, do đó có thể dễ dàng gán nó cho 1 biến khác.
Có 1 điều bạn cần phải ghi nhớ, đó là luôn sử dụng return để trả về từng giá trị sau chỉnh sửa, nếu không mảng trả về cuối cùng sẽ chỉ chứa các giá trị undefined.

**Một số Array methods giúp giảm độ phức tạp của code:**
- find
- map
- reduce
- every
- some
### Function Chaining
>Function Chaining là một cơ chế để gọi nhiều phương thức, mỗi phương thức trả về một đối tượng, cho phép các lần gọi được xích lại với nhau trong một câu lệnh đơn mà không yêu cầu các biến để lưu trữ các kết quả trung gian.
```javascript
    let languages = [
        {name: 'VueJS', isActive: true, total: 100},
        {name: 'ReactJS', isActive: false, total: 120},
        {name: 'NodeJS', isActive: true, total: 130}
    ];
    
    let sum = languages.filter((item) => {
        return item.isActive;
    })
    .map((item) => {
        return item.total;
    })
    .reduce((i, item) => {
        return i + item;
    }, 0);
    // Output will 230
```
**Libraries hỗ trợ Function Chaining**
- RamdaJS: trang chủ: https://ramdajs.com/
- UnderscoreJS: trang chủ: https://underscorejs.org/
- Lodash: trang chủ: https://lodash.com/
### Side Effects
Hàm hoặc biểu thức được cho là có tác dụng phụ nếu nó sửa đổi một số trạng thái của chương trình, nằm ngoài phạm vi của nó hoặc có tương tác quan sát được với các hàm gọi của nó hoặc chương trình bên ngoài ngoài việc trả về một giá trị.
```javascript
    let language = {name: 'VueJS', isActive: true, total: 99};
    
    const totalLanguage = (date, place) => {
        language.date = date;
        language.place = place;
        
        if (language.total < 100)
            language.isActive = true;
    }
    
    const publishLanguage = () => {
        if (language.isActive) {
            language.publish = true;
        }
    }
    
    totalLanguage('today', 'Framgia');
    publishLanguage();
    console.log(language);
```
### Immutability (tính bất biến)
Lời khuyên đầu tiên và cũng là căn bản nhất, luôn dùng const khi khai báo. Chắc bạn cũng đã biết, let và const được giới thiệu từ phiên bản ES6, cho phép khai báo biến có tầm vực theo khối và không thực hiện hosting. Điểm khác biệt giữa let và const là bạn có thể thay đổi giá trị của biến khai báo với let, trong khi không thể với const.
```javascript
    let foo = 1
    foo = 2 // Không thành vấn đề

    const bar = 1
    bar = 2 // Error: Assignment to constant variable.
```
Do đó, trong hầu hết các trường hợp bạn nên khai báo bằng const để tránh xảy ra lỗi khi giá trị của khai báo bị thay đổi bất ngờ. Cũng cần lưu ý là khi khai báo objects với const, mặc dù bạn không thể gán giá trị mới cho object nhưng giá trị của các thuộc tính vẫn có thể bị thay đổi.
```javascript
    const obj = { name: 'foo' }
    obj = { name: 'bar' } // Error: Assignment to constant variable.

    // Nhưng bạn có thể...
    obj.name = 'bar'
    console.log(obj) // { name: 'bar' }
```
**Tham Khảo:**

- Trang web: https://codeburst.io/functional-programming-in-javascript-e57e7e28c0e5 
- Trang web:https://hackernoon.com/understanding-map-filter-and-reduce-in-javascript-5df1c7eee464
- Github: https://github.com/Jam3/Javascript-Code-Conventions
- Viblo: https://viblo.asia/u/ruacondepzaj