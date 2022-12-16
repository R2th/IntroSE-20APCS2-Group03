Xin chào các bạn đã trở lại với series tìm hiểu lập trình của Thọi. Hôm nay, mình sẽ giới thiệu cho các bạn biết về một thứ mà mình chắc là ai trong số chúng ta cũng đã từng một lần nghe qua. Đó chính là Mobx — thứ mà mình cảm nhận nó thật sự magic khi vừa mới tiếp cận gần đây.

![image.png](https://images.viblo.asia/e43e7807-3939-4871-81da-25f1ecf705b7.png)

Link Medium: https://huynhtrongthoai.medium.com/mobx-c%C3%B3-th%E1%BA%ADt-s%E1%BB%B1-t%E1%BB%91t-%C4%91%E1%BB%83-thay-th%E1%BA%BF-cho-redux-part-1-433fd8a02b2c

### **Vậy đã có Redux, sao Mobx còn ra đời chi?**

Đầu tiên, quay trở lại một chút về Redux. Ngày xưa, khi mình mới bắt đầu học React thì việc quản lý state là đều do component quản lý. Chính vì vậy, việc quản lý một đống state đối với mình là vô cùng khủng khiếp. Từ component cha mà muốn truyền props xuống component con thì phải thông qua từng level, dẫn đến việc khai báo component vô cùng dài dòng. (Sau này cũng có React Context API hỗ trợ việc này)

Khoảng vài tháng tìm hiểu, mình biết được một thằng quản lí state vô cùng chất lượng mà người ta gọi nó là Redux… Lúc đầu, đọc khái niệm Redux phải nói là muốn tẩu hỏa nhập ma. Nó vừa dài dòng, vừa khó hiểu lại còn quá nhiều các quy tắc. Tuy nhiên, sau khi mình thực hiện vài project thì dần dần mình cũng đã từng bước nắm vững về nó.

Mình chợt nhận ra rằng, thay vì state do chính component quản lý, ta có thể gom các state vào một store duy nhất và component nào cần sử dụng thì chỉ cần lấy trong store ra là được => Quá tiện dụng phải không nào. Ngoài ra, có thể nói bản chất của Redux là immutable (nghĩa là nó sẽ nhận vào một state để trả về một state mới) và điều đó rất khó tiếp cận với các bạn không hiểu rõ tính chất reference trong JS. Nếu như bạn không quản lý tốt store của redux thì việc component tự động re-render là một điều không thể tránh khỏi hay những lúc mà ta không hiểu tại sao đã gọi action rồi mà component không re-render.

Những những bất cập đó mà thằng Mobx nổi lên như một giải pháp thay thế Redux để quản lý state trong ứng dụng. Vậy Mobx khác Redux ở chỗ nào mà nó có thể được người dùng chấp nhận và sử dụng?

### Sự khác biệt cơ bản giữa Mobx và Redux?

*   Redux sử dụng 1 store để quản lý state trong khi Mobx có thể sử dụng nhiều store sao cho bản thân thấy hiệu quả nhất có thể.
*   Như đã nói, Redux là immuatable trong khi Mobx chỉ là mutable (ta có thể thay đổi trực tiếp giá trị)
*   Redux chỉ đơn giản là một nơi để lưu trữ dữ liệu, còn lại muốn component re-render như thế nào thì ta phải tự tay làm việc đó. Không như Redux, Mobx sử dụng observable để lưu dữ liệu và khi thay đổi giá trị observable thì component sẽ tự động re-render do bên dưới Mobx đã thực thi những việc đó giúp ta.
*   Một nguyên nhân cuối mà mình nhận ra là chúng ta sẽ code ít hơn, ngắn hơn nếu sử dụng Mobx thay vì Redux.

Cuối cùng , có thể là còn rất nhiều điểm mà mình đã bỏ sót nhưng trên hết, những điểm mà mình vừa liệt kê phía trên là cơ bản nhất về sự khác biệt giữa Mobx và Redux.

Sau này, chúng ta sẽ đi sâu hơn vào tìm hiểm thật ra Mobx nó sử dụng những cái gì mà tạo ra magic nhiều đến thế… Let's go.

#### 1\. Observable

Giá trị observable có thể là primitives values (number, string, boolean, null, undefined), reference values (array, objects, function), plain object, class instance, ES6 Map, Set,… Nó là những giá trị mà component sẽ quan sát để biết có nên re-render hay không? Các bạn có thể tìm hiểu thêm về nó thông qua [https://mobx.js.org/refguide/observable.html](https://mobx.js.org/refguide/observable.html)

```
const map = observable.map({ name: "Messi" })
map.set("name", "Ronaldo") 
const list = observable([1,2,3,4])
list[2] = 5
```

#### 2\. Observer

Chắc là nhiều bạn sẽ nhầm lẫn với observable bên trên. Nhìn thì nó viết tương tự nhau nhưng chức năng của nó thì hoàn toàn không liên quan gì nhau.

Trong khi **Observable** là đại diện cho các giá trị được component quan sát thì **Observer** là một HOC hay decorator subscribes mà giúp cho component có khả năng quan sát. Kết quả là, component sẽ tự động được render khi những giá trị observables liên quan thay đổi. Ở đây, có 2 packages cho phép sử dụng observer.

*   mobx-react: chỉ hỗ trợ cho class component.
*   mobx-react-lite: chỉ hỗ trợ cho functional component và kích thước cũng nhỏ hơn rất nhiều.

#### 3\. Computed

Như tên gọi của nó, computed sẽ trả về giá trị mới từ giá trị observable hay giá trị computed khác. Nó giúp chúng ta chỉnh sửa state một cách linh hoạt mà không cần gọi action.

Khi một component nhận vào một computed value mà khi nó thay đổi giá trị thì component vẫn sẽ re-render. Vì vậy, nếu chúng ta muốn cải thiện performance thì có thể kết hợp với reaction (cái này mình sẽ giới thiệu sau) để cache lại giá trị.

Vậy để cache lại giá trị của computed, chúng ta sẽ thực hiện như thế nào? Nó tương đối đơn giản khi bạn có thể sử dụng 2 cách sau:

*   autorun: khi giá trị computed thay đổi thì gán lại giá trị của nó.
*   keep-alive: tốt hơn nhiều mặt so với autorun.

```
class OrderLine {
   @observable price = 0
   @observable amount = 1      
   
   constructor(price) {
      this.price = price     
   }      
   
   @computed
   get total() {    
      return this.price * this.amount     
   }
}
```

#### **4\. Autorun**

Giống như tên gọi của nó, auto là tự động, run là chạy nghĩa là thuộc tính này sẽ tự động chạy hàm truyền vào ngay lập tức, ngoài ra khi các dependencies thay đổi thì bản thân hàm trong nó cũng được gọi. Nghe có vẻ sao mà giống như computed thế không biết. Tuy nhiên, nghĩ kĩ lại thì ta nhận thấy computed luôn tạo ra một giá trị mới trong khi autorun thì không.

Ngoài ra, khi bạn muốn dừng autorun thì bạn có thể gán nó cho một giá trị và gọi lại giá trị đó. (Giá trị đó chính là disposer function)

```
var numbers = observable([1, 2, 3])
var sum = computed(() => numbers.reduce((a, b) => a + b, 0)) 
 
var disposer = autorun(() => console.log(sum.get())) // prints '6' numbers.push(4) // prints '10' 
 
disposer() 
numbers.push(5) // won't print anything, nor is `sum` re-evaluated
```

#### 5\. When

When sẽ nhận vào 2 tham số trong đó tham số thứ hai chỉ chạy khi tham số thứ nhất trả về true.

```
lass MyResource {
   @observerble sum = 0
   constructor() {
      when(
         () => this.sum > 5,
         // sum = 6 thì nó mới chạy hàm bên dưới
         () => {}
      )
   }
   setInteval(() => {
      this.sum++;
   }, 1000);
}
```

Ngoài ra, nếu chúng ta không cung cấp tham số thứ 2 thì mặc định When sẽ trả về một Promise.

#### 6\. Reaction

Được sử dụng rộng rãi nhất là thằng này. Nó được xem là một biến thể của autorun tuy nhiên việc quan sát chi tiết các observable tốt hơn.

Reaction cũng nhận vào 2 tham số:

*   Tham số thứ nhất: quan sát sự thay đổi của các observables và trả về giá trị được sử dụng làm đầu vào của hàm thứ hai.
*   Tham số thứ hai: xử lý các side-effect (là các thao tác cần thời gian để phản hồi như call api, đọc ghi file,…).

Không như autorun, các side-effect này sẽ không được thực thi trực tiếp khi được tạo mà nó phải chờ tham số đầu tiên trả về giá trị mới. Ngoài ra, các observables bên trong function xử lý side-effect này sẽ không được theo dõi.

```
const todos = observable([     
   {
      name: "Ronaldo",         
      goal: true,     
   },     
   {         
      name: "Messi",         
      goal: false,     
   }, 
])  

// Sai khi sử dụng reaction: length thay đổi nhưng không theo dõi được name thay đổi! 
const reaction1 = reaction(
   () => todos.length,     
   (length) => { 
       console.log("reaction 1:", todos.map((todo) => todo.name).join(", "))
   }
)

//Đúng khi sử dụng reaction: luôn trả về giá trị mới khi name thay đổi
const reaction2 = reaction(     
   () => todos.map((todo) => todo.name),     
   (names) => console.log("reaction 2:", names.join(", ")) 
)  
const autorun1 = autorun(
   () => console.log("autorun 1:", todos.map((todo) => todo.name).join(", ")) 
);  

todos.push({ name: "Neymar", goal: false }) 
// reaction 1: Ronaldo, Messi, Neymar
// reaction 2: Ronaldo, Messi, Neymar
// autorun 1: Ronaldo, Messi, Neymar
todos[0].title = "Degea" 
// reaction 2: Degea, Messi, Neymar
// autorun 1: Degea, Messi, Neymar
```

### Kết luận

Vậy là chúng ta đã tìm hiểu những thứ cơ bản trong Mobx rồi. Mình nghĩ chỉ cần nắm vững những thứ vừa nêu ở trên là chúng ta có thể chiến nó một cách ngon lành cành đào. Tuy nhiên, để không phải bắt gặp các tình huống bug khó hiểu hay giảm performance của ứng dụng thì ta phải đào sâu bên trong nó, xem coi cách thức nó hoạt động như thế nào?

Hy vọng qua bài viết của mình, các bạn đã hiểu phần nào về Mobx. Mình thì cũng mới tìm hiểu Mobx gần đây thôi nhưng mình muốn chia sẻ những gì mình hiểu được cũng như là một cách để bản thân nắm vững kiến thức. Ngoài ra, mình có sai sót hay các bạn có thắc mắc gì thì các bạn có thể comment bên dưới bài viết này.

> Cuối cùng, nếu các bạn thấy bài viết bổ ích, xin đừng ngần ngại thả clap cho mình để mình có động lực làm các bài tiếp theo :))