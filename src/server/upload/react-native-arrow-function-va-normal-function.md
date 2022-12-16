Trong quá trình coding với React Native, chắc hẳn chúng ta sẽ thấy hai kiểu function thường được sử dụng trong một Class như sau
```javascript
// cách 1 - normal function
log() {
    console.log("Hello")
}

// cách 2 - arrow function
log = () => console.log("Hello")

```
### Sự khác nhau của hai dạng function

Trước hết chúng ta sẽ tìm hiểu về sự khác nhau của hai function này
1. Cú pháp: rõ ràng như chúng ta thấy ở trên thì cách viết của arrow function sẽ gọn hơn nhiều so với normal function
2. `this`: với arrow function thì chúng ta sẽ tránh được lỗi undefined của this, vì this trong arrow function sẽ được khởi tạo một lần duy nhất gắn với ngữ cảnh hiện tại, còn đối với normal function chúng ta cần truyền `this` bằng bind, apply hoặc call thì mới có thể sử dụng được. Ví dụ

```javascript
logHello(){
 console.log('Hello!');
 this.setState({...})
}
render(){
 return (
  <View>
   <TouchableOpacity onPress={this.logHello}>
     Click Me
   </TouchableOpacity>
  </View>
 )
}
```

Khi run app, chắc chắn sẽ bị lỗi vì normal function log không thể hiểu được ngữ cảnh mà nó được gọi. Do đó chúng ta cần truyền ngữ cảnh vào cho nó.

```javascript
logHello(){
 console.log('Hello!');
 this.setState({...})
}
render(){
 return (
  <View>
   <TouchableOpacity onPress={this.logHello.bind(this)}>
     Click Me
   </TouchableOpacity>
  </View>
 )
}
```

Hoặc đơn giản hơn chúng ta có thể bind trong constructor của class.
```javascript
constructor(props) {
    super(props)
    this.logHello = this.logHello.bind(this)
}
```

Và với arrow function, mọi việc sẽ trở nên đơn giản hơn nữa

```javascript
const logHello = () => {
 console.log('Hello!');
 this.setState({...})
}
render(){
 return (
  <View>
   <TouchableOpacity onPress={this.logHello}>
     Click Me
   </TouchableOpacity>
  </View>
 )
}
```

Đơn giản hơn phải không các bạn :D

3. Một điểm quan trọng hơn mà chúng ta cần lưu ý khi sử dụng arrow function chính là việc sử dụng nó trong các event như  onPress, onChange, ...

```javascript
render(){
 return (
  <View>
   <CustomView onPress={() => console.log("hello")}>
     <Text>Click Me</Text>
   </CustomView>
  </View>
 )
}
```

Nhiều khi chúng ta rất hay tiện tay viết callback như trên, tuy nhiên chúng ta để ý một chút, function callback này sẽ được tạo mới hàm render() được gọi dẫn đến CustomView cũng bị re-render. Điều này là không nên khi các thuộc tính khác của CustomView đều không thay đổi. Để khắc phục việc này, chúng ta sẽ define callback ở ngoài render như sau

```javascript
log() {
console.log("hello")
}

// hoặc
// const log = console.log("hello")
render(){
 return (
  <View>
   <CustomView onPress={this.log}>
     <Text>Click Me</Text>
   </CustomView>
  </View>
 )
}
```

Như vậy function log chỉ được tạo ra một lần khi khởi tạo class và có một reference duy nhất nên khi vào render thuộc tính onPress này cũng ko thay đổi, do đó CustomView sẽ ko bị thay đổi. 

Đây cũng là một tip để cải thiện hiệu năng của ứng dụng React Native.

### Khi nào nên sử dụng dạng function nào?

Vậy chúng ta sẽ hỏi thế lúc bào thì nên sử dụng loại function nào? Có một gợi ý như này
+ Khi bạn muốn tạo callback của một event nào đó thì chúng ta sẽ sử dụng arrow function.
+ khi bạn khởi tạo một thuộc tính của class là function thì nên tạo dưới dạng normal function.

Ví dụ
```javascript
// normal
const person = {
    name: "Abc",
    talk() {
        console.log(this.name)
    }
}

person.talk() // Abc

// arrow
const person = {
    name: "Abc",
    talk: () => {
        console.log(this.name)
    }
}

person.talk() // undefined
```

Hy vọng bài viết sẽ giúp các bạn hiểu rõ hơn về arrow và normal function trong ES6 cũng như React Native. 

#### Cảm ơn các bạn đã đọc bài viết! Happy coding!