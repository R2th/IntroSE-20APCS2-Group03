##### Optional chaining là một kĩ thuật giúp ta làm việc dễ dàng hơn trong Javascript. Cũng giống như arrow function hoặc 'let', 'const', nó thực sự rất cần thiết. Vậy cú pháp và cách hoạt động nó ra sao ?
#### Đặt vấn đề
Ví dụ, bạn phải gọi một api và data trả về có dang nested object, để lấy được các properties trong đó bạn phải truy cập rất nhiều object lồng nhau.
```
const person = {
    details: {
        name: {
            firstName: "Mr",
            lastName: "HungPhan",
        }
    },
    jobs: [
        "Developer Frontend",
        "Gamer"
    ]
}

// get firstname
const fistname = person.detail.name.firstname;
```
Với việc lấy ``firstname`` như trên không được tốt, có thể xảy ra lỗi bất cứ lúc nào. Chúng ta có thể giải quyết bằng cách 

```
if (person && person.detail && person.name) {
    const firstname = person.detail.name.firstname || 'Dog';
}
```

Như các bạn thấy đấy mới chỉ là một ví dụ đơn giản để lấy firstname mà đã phức tạp như vâỵ, thì hãy tưởng tượng nếu là một object khổng lồ thì sẽ phải check mỏi tay và code dài dòng . :sweat_smile:
Vì thế mà nhiều coder sử dụng thư viện ``lodash`` để dễ dàng thực hiện nó
```
const firstname = lodash.get(person, 'detail.name.firstname', 'Dog');
```
``lodash`` giúp code dễ nhìn hơn, nhưng lại khiến chúng ta dựa thư viện nhiều, phải giải thích cách làm với người khác nếu bạn làm nhóm. Vì vậy đây cũng chưa phải cách hợp lí lắm nhỉ. 
#### Giải pháp
Optional chaining là giải pháp giúp giải quyết những vấn đề trên

###### **Cách hoạt động**
```
const firstname = person?.detail?.name?.firstname;
```
Chúng ta thấy có nhiều cú pháp ``?.`` ở trên. ``?.`` trước ``person`` nghĩa là chúng đang kiểm tra xem ``person`` có tồn tại hay không ? Nếu ``person`` không tồn tại nó sẽ không trả về lỗi mà sẽ trả về ``undefined``. Tương tự với ``detail``, ``name`` cũng vậy, nếu kiểm tra chúng không tồn tại thì return undefined và không đi sâu hơn nữa
###### **Default value**
```
const firstname = person?.detail?.name?.firstname ?? 'Dog';
```
Điều này có nghĩa nếu ``person?.detail?.name?.firstname`` có giá trị undefined thì ``firsname`` sẽ nhận giá trị sau ``??``. Thật dễ hiểu đúng không.
###### **Dynamic properties**
Đôi lúc bạn phải truy cập một dynamic properties có thể là array hoặc một property trong dynamic object.
```
const index = 1;
const job = person?.job?.[index] ?? 'Dog'
```
`job?.[index]`` ta có thể hiểu là ``job[index]``, nếu nó không tồn tại thì return 'Dog'
###### **Function and Methods**
Thỉnh thoảng ta làm việc với object mà không biết nó có phải là method hay không. Ở đây ta có thể sử dụng cú pháp ?.() hoặc với arguments ?.({ some: 'args'}) . Nếu method này không tồn tại trên object, nó sẽ return undefined.
```
const job = person?.job.gẹtob?.() ?? 'none'
```
###### **Sử dụng**
Bây giờ chưa support cho các browser-nhưng Babel hỗ trợ. Plugin babel.js khác dễ tích hợp nếu bạn đã thiết lập Babel. Bạn có thể tham khảo babel-plugin-proposal-optional-chaining để cài đặt cũng như cách dùng.
#### Kết luận
Trên đây là một số chia sẽ của mình về Optinal chaining trong Javascript, hi vọng nó có thể giúp ích cho mọi người, cảm ơn đãng theo dõi !