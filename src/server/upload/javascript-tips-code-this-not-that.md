###### Sau đây là một vài tip khi viết JS sao cho code của mình được mượt mà và hiệu quả nhất :herb:
##### 1.Console log<br>
```js
const nam = {name: 'Nam', age: '24', gender: 'Male'};
const vu = {name: 'Vu', age: '26', gender: 'Female'};
const van = {name: 'Van', age: '24', gender: 'Female'};
```
###### 'Bad Code :hankey:'<br>
```js
console.log(nam);
console.log(vu);
console.log(van);
```
###### 'Good Code :white_check_mark:'<br>
:black_small_square:Computed property names
```js
console.log('%c My Friends', 'color: blue;');
console.log({nam, vu, van});
```
:black_small_square:Console.table(...)
```js
console.log('%c My Friends', 'color: blue;');
console.table([nam, vu, van]);
```
kết quả trả về, ta nhận được:
![](https://images.viblo.asia/07a91204-96cd-44ea-9b07-96d043e9db30.png)

:black_small_square:Console.time
```js
console.time('looper');

let i = 0;
while(i < 100000){i++};

console.timeEnd('looper');
```
:black_small_square:Stack Trace Logs
```js
const deleteMe = () => console.trace('bye bye ^^');

deleteMe();
```
##### 2.Destructuring
```js
const dog = {
  name: 'Vi',
  type: 'Husky',
  legs: 4,
  weight: 15
}
```
###### 'Bad Code :hankey:'<br> 
```js
function information(animal){
  return `Ten toi la ${animal.name}, toi nang ${animal.weight}, toi thuoc giong ${animal.type}`;
}
```
###### 'Good Code :white_check_mark:'<br>
```js
function information({name, weight, type}){
  return `Ten toi la ${name}, toi nang ${weight}, toi thuoc giong ${type}`;
}

// OR

function information(animal){
  const {name, weight, type} = animal;
  return `Ten toi la ${name}, toi nang ${weight}, toi thuoc giong ${type}`;
}
```
##### 3.Template literals
```js
const cat = {
  name: 'Vu',
  type: 'Cat',
  legs: 4,
  weight: 3,
  skills: ['chay', 'nhay'],
  age: 3
}
```
###### 'Bad String Code :hankey:'<br> 
```js
let infor = ' Xin chao! Toi la ' + cat.name + ', toi thuoc loai ' + cat.type + ', toi nang ' +
    cat.weight + ' kg, toi co the ' + cat.skills.join(' va ');
```
###### 'Good String Code :white_check_mark:'<br>
```js
 const {name, type, weight, skills} = cat;
 
 infor = `Xin chao! Toi la ${name}, toi thuoc loai ${type}, toi nang ${weight} kg, 
     toi co the ${skills.join(' va ')}`;

 console.log(infor);
```
:black_small_square:Advanced Example
```js
function catAge(str, age){
  const ageStr = age > 5 ? 'old' : 'young';
  return `${str[0]}${ageStr} at ${age} years`;
}

const infor2 = catAge`This cat is ${cat.age}`;
```
##### 4.Spread syntax
:black_small_square:Object
```js
const pikachu = {name: 'Pikachu'};
const stats = {hp: 80, attack: 100, defense: 50};
```
###### 'Bad Object Code :hankey:'<br> 
```js
pikachu['hp'] = stats.hp;
pikachu['attack'] = stats.attack;
pikachu['defense'] = stats.defense;

// OR

const lv5 = Object.assign(pikachu, stats);
const lv10 = Object.assign(pikachu, {hp: 100});
```
###### 'Good Object Code :white_check_mark:'<br>
```js
const lv5 = {...pikachu, ...stats};
const lv10 = {...pikachu, hp: 100};
```
:black_small_square:Arrays
```js
let pokemon = ['Pikachu', 'Meow', 'Charizard'];
```
###### 'Bad Array Code :hankey:'<br> 
```js
pokemon.push('Blastoise');
pokemon.push('Venusaur');
pokemon.push('Raichu');
```
###### 'Good Array Code :white_check_mark:'<br>
```js
// Push
pokemon = [...pokemon, 'Blastoise', 'Venusaur', 'Raichu'];

// UnShift

pokemon = ['Blastoise', 'Venusaur', 'Raichu', ...pokemon];
```
##### 5.Loops
```js
const orders = [100, 30, 200, 15, 86];
```
###### 'Bad Loop Code :hankey:'<br> 
```js
const total = 0;
const withTax = [];
const highValue = [];
for (i = 0, i < orders.length; i++){
  // Reduce
  total += orders[i];
  
  // Map
  withTax.push(orders[i] * 1.2);
  
  // Filter
  if (orders[i] > 100) {
    highValue.push(orders[i]);
  }
}
```
###### 'Good Loop Code :white_check_mark:'<br>
```js
// Reduce
const total = orders.reduce((acc, cur) => acc + cur)

// Map
const withTax = orders.map(v => v * 1.2);

// Filter
const highValue = orders.filter(v => v > 100);
```
##### 6.Async / Await
```js
const random = () => {
  return Promise.resolve(Math.random())
}
```
###### 'Bad Promise Code :hankey:'<br> 
```js
const sumRandomAsyncNums = () => {
  let first;
  let second;
  let third;
 
 return random()
     .then(v => {
         first = v;
         return random();
     })
     .then(v => {
         second = v;
         return random();
     })
     .then(v => {
         third = v;
         return first + second + third;
     })
     .then(v => {
         console.log(`Result ${v}`);
     })
}
```
###### 'Good Loop Code :white_check_mark:'<br>
```js
const sumRandomAsyncNums = async() => {
  const first = await random();
  const second = await random();
  const third = await random();
  
  console.log(`Result ${first + second + third}`);
}
```

Cảm ơn các bạn đã đọc bài viết của mình :heart_eyes: