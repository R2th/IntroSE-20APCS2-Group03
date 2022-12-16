# **Những cái quan trọng ES6 áp dụng trong React II**
Trong bài viết này là bài viết thứ 02 của mình đã nói về ES6 về những cái quan trọng nhất mà tôi đã nghiên cứu rằng đó là các bạn cần phải chú ý nhất lúc bạn mới bắt đâu học ReactJS bởi vì những cái đó cùng là một kiến thức mà bạn không nền thiệu được. Như cái bắt đâu mình đã hoàn thành một bài viết thứ nhất của mình trong link [phần một](https://viblo.asia/p/nhung-cai-quan-trong-es6-ap-dung-trong-react-i-yMnKMJ0mZ7P). Đối với phần tiếp theo này mình xin giời thiệu tiếp đó là phần **Destructuring**.

## Destructuring
Destructuring là một kỹ thuật để gán giá trị cho Object, hoặc Array trong ES6 hoặc trả về giá trị của object đó. Kỹ thuật này sẽ giúp chúng ta như sau:
- Tối ứu code
- Code dễ đọc hơn
### Object Destructuring
```javascript
const person = {
    name: 'Dam SamNang',
    age: 29,
    location: {
        country: 'Vietnam'
        company: 'Framgia VN'
    }
};
# cách không dùng destructuring object

const ten = person.name;
const tuoi = person.age;
const nuoc = person.location.country; 
const congty = person.location.company;

# cách dùng destructuring object

const { name, age } = person;
console.log(`${name} is ${age}`); 
=> Dam SamNang is 29

const { country, company } = person.location;
console.log(`${company} is located in ${country}`);
=> Framgia VN is located in Vietnam

const { otherPropertise, name, age } = person;
console.log(otherPropertise); 
=> otherPropertise sẽ trả về bằng undefined
```
- Cách thay đổi tên destructuring object, có cách viết như sau:

```javascript
const {  propertise_name: new_name_propertise } = object;
```

Vi dụ:
```javascript
const { name: ten } = person;
console.log(name) # sẽ có lỗi không tìm thấy name
console.log(ten) # Dam SamNang
```
- Cách gán giá trị bắt đâu (Default value), có cách viết như sau:

```const { propertise_name = default_value } = object;```

Vi dụ:
```javascript
const person = {
    age: 29,
    location: {
        city: 'Hanoi'
        company: 'Framgia'
    }
};
const { name = 'Unknow' } = person;
console.log(name);
=> Unknow
```
- Cách viết default value và thay đổi tên của propertise, có cách viết như sau:

```javascript
const { propertise_name: new_name_propertise = default_value } = object
```
Vi dụ:
```javascript
const person = {
    age: 29,
    location: {
        city: 'Hanoi'
        company: 'Framgia'
    }
};
const { name: firstName = 'Unknow' } = person;
console.log(firstName);
=> Unknow
```
### Array Destructuring
- ***Array Destructuring***: có ý tưởng giống nhau nhưng khác viết.Cách viết array destructuring sẽ giúp chúng ta dễ  hiểu biết càng rõ hơn về thuộc tính của array mà chúng ta đang dùng đó là có mục đích như thể nào.
```javascript
# không sử dùng array destructuring 
const colors = ['blue', 'red', 'pink'];
console.log(`These colors : ${colors[1]} and ${colors[2]}.`);
These colors: red and pink.

# không sử dùng array destructuring 
const do = colors[1];
const hong = colors[2];
console.log(`These colors : ${do} and ${hong}.`);
These colors: red and pink.

# sử dùng array destructuring
const [blue, red, pink] = colors;
console.log(`These colors : ${red} and ${pink}.`);
These colors: red and pink.
```
- **Array destructuring không đây đủ**: đối với array cùng cho phép chúng ta destructuring gán gía trị đối với trường hợp như sau:
Vi dụ:
```javascript
const colors = ['blue', 'red', 'pink'];

const [, red] = colors;
console.log(red); // kết quả: red

const [, , pink] = colors;
console.log(pink); // kết quả: pink

const [, , , otherColor] = colors;
console.log(otherColor); // kết quả: undefined 
```
- **Array destructuring set default value**: chúng ta có thể  gán giá trị bán đầu, có cách viết như sau:

```javascript
const [ object_name = default_value ] = array;
```
Vi dụ:
```javascript
const colors = [];
const [pink = 'pink'] = colors;
console.log(pink); // kết quả: pink
```
## Kết luận
Đối với bài viết này là phần hai đối với những cái quan trọng trong ES6 cần phải chú ý lúc bạn viết code trong React, đối với phần này chúng ta có sự chú ý như sau:
- Ojbject destructuring:  gán theo tên của propertise object
- Array destructuring:  gán theo vi trí của thuộc tính array
+ đối với phần ba, mình sẽ đưa cho các bạn những phần thật là hấp dẫn hơn nữa, đó là: Spread Operatator. 
## Tài Liệu:
- [Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)