Immutability là một khá niệm khá khó hiểu trong React js và hầu như nó xuất hiện khá nhiều trong các ứng dụng React, Redux và javascript nói chung. Thỉnh thoảng bạn sẽ gặp trường hợp component không re-render mặc dù đã update state của component. Và có ai đó đã khuyên bạn rằng nên update state sử dụng Immutability để update state.
Bài này sẽ giải thích rõ Immutability là gì và cách viết Immutability trong ứng dụng của bạn. Let go!!
# Tổng quan về Immutability?
Immutability đúng với tên gọi của nó là không thể  biến đổi. Nó trái ngược hoàn toàn với mutable là có thể thay đổi, có thể update.
Vậy nếu một biến là immutability thì làm thể nào mình có thể thay đổi và update giá trị của biến đó. Câu trả lời là mình sẽ sao chép giá trị biến đó và tiến hành update giá trị của nó trên biến mà mình mới tạo ra. Nghe có vẻ hơi mơ hồ nhỉ, nhưng thực sự mình cam đoan các bạn đã gặp nó trong javasctipt rồi, chỉ có điều chưa biết mà thôi. :D Đó là khi mình sử dụng các hàm thao tác với một mảng, nó thường thao tác và trả về mảng mới thay vì thao tác trên chính mảng ban đầu, và giá trị trong mảng ban đầu sẽ được giữ nguyên. Đối với String thì cũng tương tự. Các bạn cũng có thể viết các function immutability, chỉ cần nắm vững một vài quy tắc.

Trước hết mình sẽ lấy một ví dụ về mutation để hiểu rõ mutable hoạt động như thế nào: 
Giờ mình có một object person  với các thuộc tính như sau.
```
let person = {
	firstName: "Bob",
	lastName: "Loblaw",
	address: {
		street: "123 Fake St",
		city: "Emberton",
		state: "NJ"
	}
}
```
Mình đã có một object persion, nghĩa là con người. Giờ mình muốn viêt một function để cung cấp một chức năng siêu nhân nào đó cho con người. Nó sẽ như thế này:
```
function giveAwesomePowers(person) {
	person.specialPower = "invisibility";
	return person;
}
```
 Mình console.log(person) nó sẽ  như thế này:
```
    { firstName: 'Bob',
      lastName: 'Loblaw',
      address: { street: '123 Fake St', city: 'Emberton', state: 'NJ' } }
```
Và sau đó thì thì mình đưa chức năng đặc biệt này cho một người nào đó tên là Alice.
```
let Alice = giveAwesomePowers(person);
```
Và bây giờ mình console log cả hai để xem kết quả là gì: 
```
console.log(person);
console.log(Alice);
```
Thật bất ngờ khi chương trình cho ra hai kết quả giống hết nhau, mặc dù mình chỉ muốn nhân vật Alice có chức năng đặc biệt kia thôi!
```
{ firstName: 'Bob',
  lastName: 'Loblaw',
  address: { street: '123 Fake St', city: 'Emberton', state: 'NJ' },
  specialPower: 'invisibility' }
{ firstName: 'Bob',
  lastName: 'Loblaw',  address: { street: '123 Fake St', city: 'Emberton', state: 'NJ' },
  specialPower: 'invisibility' }
```
 Chúng ta nhận thấy rằng function giveAwesomePowers đã làm mute object person khi truyền vào, mặc dù là nó vẫn trả về object person nhưng giá trị bên trong thì hoàn toàn khác.  và  vấn đề là giá trị trong person hiện tại vĩnh viễn đã bị thay đổi. Đây là điều không mong muốn.
     Tại sao lại như vậy, mình giải thích như thế này cho các bạn dễ hiểu!
     Khi mình khai báo object person thì lúc này chương trình sẽ tạo ra một tham chiếu đến một vùng nhớ trên máy tính. Đến khi mình new ra một object Alice và gọi đến function giveAwesomePowers, hàm này cũng trả về object person vậy là thằng Alice với person  đang tham chiếu đến cùng một vùng nhớ.  Và khi mình thay đổi giá trị thằng hai thằng này thì thực chất là mình đang thao tác trên cùng một vùng nhớ. Cho nên lúc này Alice thay đổi thì person sẽ thay đổi theo.
     Điều cần làm của mình lúc này đó là sửa lại hàm giveAwesomePowers để object person không bị thay đổi tức là sẽ thực  hiện immutability. Trước khi đọc đến phần tiếp theo các bạn hãy đọc về pure function trước, vì nó có liên quan chặc chẽ đến immutability. https://viblo.asia/p/javascript-ham-thuan-khiet-pure-function-la-gi-OeVKBqz05kW
  Vậy chúng ta  cần viết lại hàm giveAwesomePowers như sau: 
  ```
  function giveAwesomePowers(person) {
  let newPerson = Object.assign({}, person, {
    specialPower: 'invisibility'
  })

  return newPerson;
}
  ```
  
  Cách làm này nó sẽ hơi khác một chút, thay vì update trên chính object person thì chúng ta sẽ tạo ra một person mới và để rỗng, những gì nó làm sẽ là gán các giá trị từ person cũ sang person mới thông qua Object.assign như ở trên. Mình cũng có thể truyền nhiều đối tượng vô trong Object.assign theo thứ tự từ trái sang phải và có thuộc tính nào trùng lặp thì nó sẽ ghi đè lên. ví dụ nếu mình viết Object.assign(result, a, b, c) thì nó sẽ thực hiện sao chép a vào result, sau đó b, sau đó c).
  Tóm lại là đoạn code trên đâu tiên nó sẽ tạo ra một object trống, sau đó gán tất cả các thuộc tính của person cho vào object trống đó và gán luôn thuộc tính specialPower vào object trông luôn. 
  Có một cách viết khác cho hàm giveAwesomePowers như thế này:
  ```
    function giveAwesomePowers(person) {
      let newPerson = {
          ...person,
          specialPower: 'invisibility'
      }
      return newPerson;
    }
  ```
  Cách viết này sử dụng một khá niệm mới đó là Spreed trong ES2018.
  Bây giờ các bạn chạy lại đoạn code trên và kiểm tra kết quả nhé. lúc này persion và Alice đã cho giá trị khác nhau rồi.
  Điểm khác biệt lớn nhất là của cách làm này là nó không thay update trên object person mà nó tại ra một object mới, sau đó thay đổi, sửa xóa...trên object mới đó.
#   Lời kết
  Bây giờ quay lại vấn đề mình nêu ra ở đầu bài viết. 
  Hồi đầu mình nêu ra một vấn đề là component không re-render khi update state, giả sử mình đang  khởi tạo state với object là person ở trên, sau đó sử dụng hàm giveAwesomePowers để trả về một newPerson với mục đích là render ra những thông tin có trong newPerSon, và mình chắc chắn một điều là component sẽ không render lại. Lí do đơn giản là chương trình nó không biết là state person của mình đã được update, bởi vì lúc khởi tạo state nó tham chiếu đến một object, và sau khi hàm được chạy thì nó cũng tham chiếu đến object đó, cho dù mình có đào bới update person ở trong thì nó cũng không quan tâm, trừ khi chương trình của mình trả về một object mới như là mình có trình bày.
 
 Bài này mình đã trình bày tổng quan về Immutability. Trong bài viết tiếp theo mình sẽ nói về các cách update state thường sử dụng trong react redux.
  Cảm ơn mọi người đã đọc!
# Tài liệu tham khảo
https://daveceddia.com/react-redux-immutability-guide/