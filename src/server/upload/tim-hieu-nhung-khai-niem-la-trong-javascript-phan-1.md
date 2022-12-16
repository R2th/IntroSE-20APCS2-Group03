![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/z14097j3qk_1_OF0xEMkWBv-69zvmNs6RDQ.gif)
># Phần chém gió giới thiệu 
Javascript là ngôn ngữ rất si đa và càng học nó mình càng thấy nó sida vcđ, gần đây mình được tiếp xúc được với một project về react khá thú vị.Mới đầu rất khó khăn trong việc đọc hiểu được từng phần logic của nó, sau một thời gian vừa đọc code vừa tìm hiểu về các cú pháp mới lạ đó mình đã dần quen với nó,trong quá trình tìm hiểu mình đã học ra được nhiều thứ mới , trong bài này mình sẽ chia sẻ thế hết những thứ mới đó
># Proxy trong javascript
Nghe đến proxy thì có thể nhiều người nghĩ ngay đến cổng kết nối, hay một thứ gì đó mà nó chả liên quan đến javascript,khái niệm proxy trong js này chả liên quan gì đến proxy mà chúng ta biết,nói na ná thì nó như cái wrap bọc phía ngoài một data của chúng ta, và mình có thể trigger event khi data của mình thay đổi hoặc get data, nói thể này khó hiểu vl nên mình sẽ đưa ra vd chi tiết
ở đây là vd không sử dụng proxy. get và set là hai khái niệm quen thuộc trong lập trình
```
const monster1 = {
  secret: 'easily scared',
  eyeCount: 4
};
console.log(monster1.secret) // log ra  ...
monster1.eyeCount=100000000000000 // set thôi có gì đâu
```
Vậy giờ mình muốn mỗi khi mình get dữ liệu hoặc set dự liệu mình sẽ trigger event thi sao, đến chính là proxy
```
const monster1 = {
  secret: 'easily scared',
  eyeCount: 4
};
const proxy1 = new Proxy(monster1, { // wrap proxy xung quanh obj monster
  get: function(target, prop) { // target chính là monster1 , còn prop là obj gọi ở chỗ proxy
    if (prop === 'secret') { // nếu gọi secret 
      return `Bố mình được trigger Event rồi Tại mày get data đấy`;
    } else {
      return ": ))) get thằng khác rồi";
    }
  }
set:function(target,prop,value){ // target vẫn là obj monster1, prop là value cần đc set  
// value là giá trị gán
 	console.log(value) // thêm log value khi đc set 
   target[prop]=value; // gán như bình thường nhưng trigger event log value đc gán : ))
	}
}
);
// ở đây ta đã get thằng secret và proxy sẽ trigger event thêm "Bố mình được trigger //Event rồi Tại mày get data đấy" nếu mình get secret 
console.log(proxy1.secret);  // log ra "easily scared" và trigger event
console.log(proxy1.eyeCount); // nó sẽ log ra ": ))) get thằng khác rồi" vì mình get khác secret
// ở đây sẽ set giá trị của secret nhưng proxy sẽ trigger event thêm console.log(value) và //nó sẽ log ra "biến đc gán sẽ đc log ra"
proxy1.secret="biến đc gán sẽ đc log ra"; 
```
Nói chung proxy nó hơi khó hiểu nhưng đọc hồi cũng hiểu thôi .Bạn có thể xem qua document của nó.Link đây:[Linkproxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/set)
># Kiểu dữ liệu trong javascript>
Khá là nhiều người sẽ không để ý đến chuyện ép kiểu trong javascript, vì thằng sida này không có ghi kiểu rõ ràng như C,java.c#,...Mình đã từng không để ý đến kiểu cho đến khi bị bug ngu vật vã với nó suốt 1 ngày =))).
parseInt(), parseFloat()
ép rất đơn gản 
ex:
let numerString="999";
let numverInt=parsreInt(numberStirng); // giờ nó số thực sự
 Nếu bạn cho việc này là vô nghĩa thì khi các bạn sử dụng đến việc điền các thông số như id của một product nào đó để get dữ liệu từ database sẽ bằng null vì 999==="999" // false  
 

># Gán biến kiểu ,spead trong ES6 
Gán biến là khái niệm cơ bản trong lập trình  ,vậy gán biến kiểu của mình nói đây có gì hot??.
vd: ta có một object thế này
```
let objEx={
	Me:{
        loveDog:{
      			dog:"dog hate cat@@"
       			}
        	}
}
```
Ở đây nếu mình muốn gán cái "dog hat cat" cho một biến mình muốn gán thì phải gán thế này
let avoid= objEx.me.loveDog.dog
Nhìn phức tạp sida quá ,H sẽ có kiểu gán vui hơn
```javascript
let {
	Me:{
		loveDog:{
  			dog: {avoid}  
 	 }
	}
}
```
Đấy avoid tự gán bằng "dog hate cat@@" luôn, cách này vừa nhanh vừa dễ hiểu, khi đọc mình biến luôn cấu trúc của obj đó :v,nó chất vãi lìn
># Sử dụng Promise kiểu ES8 (Không phải kiểu ES6) 
Promise là phát kiến vĩ đại của es6,nó giúp tránh callback hell(hàm trong hàm quá nhiều) , nhưng đó chưa phải phát kiến hay , lên ES8 nó có thêm await ,async  và bây mình sẽ so sánh cho bạn đọc cái phát kiến vĩ cmn đại này
  ```
//với promise ES6
function Example(){
      return new Promise((resolve,reject)=>{
		resolve("I love Dog <3")
})
// bây h mình muốn lấy chuỗi i love dog thì 
Example().then(a=>{
	console.log(a) // nó sẽ log ra I love Dog
})
}
  ```
Tóm lại H mình muốn khi gọi hàm Example thì nó trả về chuỗi "I love Dog" luôn chứ méo muốn phải .then() rồi viết code  logictrong hàm then luôn, thế thật là vl,mình méo thích thế, h đã có kiểu viết thế này hay hơn
```
// với promise sử dụng await
async function Example(){
      return await new Promise((resolve,reject)=>{
        resolve("I love Dog <3")
})
 console.log(Example()) // log mẹ nó ra "I love Dog" luôn =))))
```
Đấy nhìn vào các bạn sẽ thấy sự khác biệt ngay .Mình sẽ không giải thích gì nhiều,nếu có thắc mắc về async,await thì bạn hãy đọc bài này của mình 	[Link](https://kipalog.com/posts/Xu-ly-assynchronous-bang-axios-va-nhung-lam-lan-hay-gap-khi-su-dung-aysnc--await-va-axios)
Tiếp theo là spead, nếu ai biết đến lập trình hàm sẽ biết đến spead
 ```
 let people={"thông minh","chém gió"}
 let Dog={"gâu gâu","ẻ bậy", "cắn người"}
 let bullShit={...people,Dog}
 console.log(bullShit) // log ra{"thông minh","chém gió","gâu gâu","ẻ bậy", "cắn người"}
 ```
># Tự tạo một event cho chính mình dùng
Hằn là ae  học js đều biết đến các event như 'change','click','focus
Để lắng nghe các event này mình sử dụng addEventListener.
vd bạn muốn lắng nghe event click thì 
```
document.addEventListener('click',()=>{
	console.log("gâu gâu")
})
```
Tạo event 
```
let event = new CustomEvent("dog", { detail: 7 }); // hàm  tạo event có tên foo
document.addEventListener("dog", function(e) {
 // nó đã listen event foo . hãy viết gì đấy cho nó chạy
 console.log("gâu gâu")
});
// h sẽ dispatch event đó
document.dispatchEvent(event); // log ra gâu gâu
```
># Tổng kết
Vẫn còn vài thứ mình còn muốn nói nhưng chắc để phần sau, có ý kiến hay sai sót xin hãy cmt phía dưới, mình sẽ tiếp thu và ý kiến nhiệt tính :v. Xin cảm ơn mn đã dành thời gian đọc bài mình