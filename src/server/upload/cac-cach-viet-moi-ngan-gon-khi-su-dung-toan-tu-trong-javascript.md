### Từ ES6, Javascript cung cấp các toán tử mới, giúp chúng ta xử lý các công việc nhanh, và code cũng nhìn chuyên nghiệp hơn.
## 1. Destructuring Array và Object
Bạn có thể đã viết code như thế này. Giả sử có 1 array bạn muốn lấy giá trị của 1 phần tử trong mảng sau đó gán cho 1 biến khác
```
let arr=[1,2,3,4]
let a=arr[0];
let b=arr[1];
```
Với Array desctructuring bạn sẽ viết ngắn gọn như sau 
```
let [a,b]=arr
```
Vậy nếu bạn muốn gán b cho arr[2] thì sẽ như thế nào? Hãy đặt thêm một khoảng trắng ở giữa.
Cách viết này nhìn gọn và đẹp. Bạn cũng sẽ nhìn thấy nó nhiều khi sử dụng ReactJS và các hook như const [a,setA]= useState();
```
let [a,,b]=arr
```
Đối với Object cũng tương tự như Array, bạn có thể lấy các giá trị từ 1 Object bằng cách sử dụng các Key của chúng:
```
let obj={name:"harry", age:"22"}
let {name,age}=obj
```
Bạn cũng có thể swap các biến theo cách sau
```
let arr=[1,2,3,4]
let [a,b]=arr
[a,b]=[b,a]
```
Hai biến a, và b sẽ được gán các giá trị của nhau mà ko cần biến temp.
## 2. Spread Operator
Toán tử này rất hữu dụng. Bạn có thể copy, ghép các array hay object.
-  Copy array hay object
```
let array1=[1,2,3]
let array2=[...array1,4,5,6]
\\ lúc này giá trị của array 2 sẽ là: array2=[1,2,3,4,5,6]
let obj1={name:"harry"}
let obj2={...obj1, age:25}
\\ lúc này giá trụ obj2={name:"harry",age:25}

```
## 3. Các toán tử điều kiện
- Có thể các bạn đã biết toán tử logic như && ||sẽ trả về  các giá trị khi gặp falsy hoặc truthy. Ví dụ
```
let a= "harry"||25
//a sẽ có giá trị là harry vì gặp truthy đầu tiên hoặc trả về . Bạn có thể tìm hiểu các giá trị nào là truthy or falsy của JS
let b="harry"&&25
// b có giá trị 25 vì ko gặp falsy biểu thức sẽ return giá trị đầu tiên
```
- Từ các đặc điểm trên bạn sẽ thấy ứng dụng của nó:
```
// bạn muốn gán giá trị cho biến khi thỏa mãn điều kiện sẽ làm như sau
let obj={name:"khoi"}
if(obj.name){
let newName=obj.name
}
else{
let newName="No Name"
}
// khi key name tồn tại trong obj thì phép toán sẽ dc thực hiện. Với toán tử ta có thể viết ngắn gọn như sau
let newName= obj.name||"No Name"
```
## 4. Kết luận
Còn một số toán tử nữa mình sẽ đề cập ở phần 2 nhé🍷🍷.