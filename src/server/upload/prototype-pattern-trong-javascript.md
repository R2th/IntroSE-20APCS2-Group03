# `Prototype Pattern trong Javascript`
Trong một ngôn ngữ linh hoạt như Javascript, bạn có thể áp dụng rất nhiều những pattern khác nhau. Tùy vào từng trừng hợp mà chúng ta có thể áp dụng. Object oriented programing hay OOP thì các bạn đã nghe và sử dụng chúng rất là nhiều rồi. Nhưng mà trong Javascript thì ta còn có một hướng programing khác, gọi là prototype. Giờ hãy cũng thử xem prototype có gì thú vị và những ích lợi khi sử dụng prototype nhé.
![](https://images.viblo.asia/d5593cee-f5af-47e0-af8d-907479914e1b.png)

## Prototype
Pattern này thì được focus vào việc giúp tạo object từ một blueprint có trước, đồng thời những object sau sẽ được thừa kế những method, thuộc tính khác nhau. Tính chất này gọi là prototype inheritance.
Khi tạo một object trong ES6, bạn đã quen với việc khai báo với class. Trong ES5 thì ta còn có cách khác là function constructor. Giả sử khi viết game ta muốn xây dựng một lớp Warrior như sau:
```js
function Warrior(name) {
    this.name = name
 }
 
 const harryPotter = new Warrior('Harry Potter')
 const ngan = new Warrior('Ngan')
 const snake = new Warrior('Snake')
 ```
 
 Với cách trên, 3 chiến binh đã được tạo ra. Chúng cùng chia sẻ với nhau một contructor là Warrior
 ```js
 harryPotter.constructor === ngan.constructor // true
 snake.constructor === ngan.constructor // true
 
 console.log(harryPotter.constructor.name) // Warrior
 ```
 
 Giả sử, giờ lớp chiến binh ta muốn có những skill khác nhau như bash, slash thì sao
 ```js
 function Warrior(name) {
    this.name = name
    this.hp = 100
    
    this.bash = function(target) {
        target.hp -= 10
    }
        
    this.slash = function(target) {
        target.hp /= 2
    }
 }
 
 harryPotter.bash(ngan)
 console.log(ngan.hp) // 90
 ngan.slash(snake)
 console.log(snake.hp) // 50
 ```
 
 Giờ cách chiến binh đã có những skill và tha hồ cà khịa lẫn nhau. Nhưng ở đây, mỗi một chiến binh lại có một skill riêng biệt, nhưng rõ ràng, skill này lại giống hệt nhau. Điều này là lãng phí khi mà ta kiểm tra lại
 ```js
harryPotter.bash === ngan.bash // false
snake.bash === ngan.bash // false
 ```
 
Chính vì thể ta cần một cái gì đó giống như constructor, đó chính là prototype
```js
function Warrior(name) {
    this.name = name
    this.hp = 100
}
 
Warrior.prototype.bash = function(target) {
    target.hp -= 10
}

Warrior.prototype.slash = function(target) {
    target.hp /= 2
}

...

harryPotter.bash === ngan.bash // true
snake.bash === ngan.bash // true
```

Cách trên cũng tương tự với cách viết như sau

```js
Warrior.prototype = {
    bash: function(target) {
        target.hp -= 10
    },
    
    slash: function(target) {
        target.hp /= 2
     },
}
```
## Conclusion
Tuy nhiên với cách này sẽ làm mất đi constructor Warrrior đó nhé.
Trên đây chính là cách mà prototype đã thực hiện khả năng thừa kế và chia sẻ của mình như thế nào trong javascript. Hy vọng các bài tiếp theo mình có thể tiếp tục khám phá nhiều điều thú vị hơn nữa. Cám ơn các bạn đã theo dói
## `References`
https://medium.com/better-programming/the-prototype-pattern-in-javascript-bfe9ff433e6c