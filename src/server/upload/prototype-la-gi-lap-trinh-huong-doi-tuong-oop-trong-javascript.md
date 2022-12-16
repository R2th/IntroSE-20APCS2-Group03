Bài viết gốc: [anonystick.com](https://anonystick.com)

Trong lập trình hướng đối tượng OOP bao gồm rất nhiều nộ dung và khái niệm như class, Prototype, _proto_, prototype chain, constructor, inheritance... Ngoài ra nó cũng liên quan đến pattern như factory pattern, constructor pattern, prototype pattern. Mối quan hệ giữa các khái niệm này là gì?, mối quan hệ giữa các mô hình là gì?, chúng phát triển như thế nào và chúng hoạt động như thế nào? Bản thân người viết cũng chóng cả mặt chứ huống hồ gì những bạn mới học JS.

Trước tiên tôi muốn nói để hiểu về OOP thì như những bài viết khác viết ngắn gọn trong một bài thì tôi đảm bảo sẽ không bai giờ đủ để cho các bạn hiểu. Bạn thấy ngay tiêu đề thôi bao nhiêu là thứ bạn phải hiểu, từng đó đủ chứng minh những lời tôi nói là sự thật. 

Trong bài viết này, tôi sẽ giải thích từng bước về OOP trong JS thông qua quá trình hiểu OOP. Đây có lẽ là một trong những bài viết nói về bản chất của OOP, và hy vọng rằng thông qua việc xây dựng loạt bài viết này, mọi người đều có thể hiểu hoàn toàn OOP trong JS và có thể sử dụng OOP một cách thành thạo hơn. Và tôi cũng hy vọng rằng, tôi có đủ kiên nhẫn và kiến thức để có thể viết hoàn chỉnh một series về lập trình hướng đối tượng trong javascript. 

Và bài đầu tiên tôi muốn trình bày giải thích cho cá bạn hiểu về Prototype một trong những khái niệm liên quan đến OOP. Hy vọng các bạn cũng cố gắng theo sát những gì tôi trình bày, nếu có bất cừ gì sai sót thì có thể góp ý tại đây, thay vì chỉ trích nhau. Thôi để dành thời gian tập trung vào thay vì lan man như các bài viết khác.

## Prototype là gì?

Trước tiên tìm hiều về prototype là gì? Thì tôi sẽ cho các bạn một cái nhìn hình dung hài hước thông qua một ví dụ mà thằng dại gái nào cũng bị dính, bao gồm có tôi. Còn bạn nào mà không dính vụ này thì có thể leave được rồi. Kakaka xD thôi, tập trung nhé! 

Ví dụ về prototype: Khi một thằng nào đó dẫn bạn gái đi mua quần áo, nhưng bạn gái của thằng đó éo có tiền những nó vẫn mua được, như vậy có nghĩa là thằng đó trả tiền (dại gái). Đồng nghĩa với việc con đó nó lợi dụng ví tiền của thằng này. Ta sử dụng code để mô tả hành động này của ví dụ trên

```
var bangai = {
	name: 'dao thi mo'
}
var thangdaigai = {
	name: 'thang dai gai',
	pay: function() {
		console.log('Da mua boi tien cua bo me');
	}
};
Object.setPrototypeOf(bangai, thangdaigai);
bangai.pay(); //Da mua boi tien cua bo me
```

Bạn thấy đấy, qua một ví dụ trên có thể thấy con "dao thi mo" nó lợi dụng như thế nào rồi đó. Và thông qua đây thì prototype là gì? Ví dụ trên kia cho ta thấy những gì? Chương trình chỉ ra rằng prototype của bangai chính là thangdaigai, bangai không có method là pay() nhưng nó đã lợi dụng method của thangdaigai. Như vậy trước mắt chúng ta hiểu là prototype chính là một mối quan hệ uỷ nhiệm thần công và bạn cũng có quyền hiểu nó là sự kế thừa cũng không sao! Từ từ nha, đừng vội... Ví dụ trên tôi sẽ viết lại một cách khác để cho các bạn hình dung hơn nữa

```
var bangai = {
	name: 'dao thi mo',
	pay: function() {
		thangdaigai.pay();
	}
};
var thangdaigai = {
	name: 'thang dai gai',
	pay: function() {
		console.log('Da mua boi tien cua bo me');
	}
};
bangai.pay(); //Da mua boi tien cua bo me
```

Đó chính là Prototype nghĩa la gì? Bản chất nó chính là vậy. Đến đây bạn nào hiểu rồi thì leave chờ bài viết thứ hai về "prototype chain là gì?" Còn bạn nào chưa hiểu nữa thì ở lại, nghe tiếp Bây giờ tôi có một ví dụ tiếp theo nó chả liên quan gì đến thangdaigai Ví dụ: Tôi có một function như thế này

```markdown
function Cat(name, color){

　　this.name = name;

　　this.color = color;

　　this.type = "dongvat";

　　this.eat = function(){
        console.log(' an ca')
    }
}
Sau đó tôi dùng new để tạo hai Object.

var cat1 = new Cat('Sen', 'pink')
console.log(cat1.eat()) //  an ca
console.log(cat1.type) // dongvat

var cat2 = new Cat('Boss', 'black');
console.log(cat2.eat()) //  an ca
console.log(cat2.type) // dongvat
```

Nhìn bề ngoài nếu như bạn chưa hiểu về prototype, dường như không có vấn đề gì, nhưng trên thực tế, có một nhược điểm lớn. Nghĩa là, đối với mỗi đối tượng thể hiện, các thuộc tính type và method eat() hoàn toàn giống nhau. Mỗi lần tạo một thể hiện, nó phải được lặp lại nội dung và chiếm nhiều bộ nhớ hơn. Điều này không thân thiện với mô hình OOP. Để chứng minh thì tôi sẽ cho các bạn xem điều này.

`console.log(cat1.eat === cat2.eat); //false`

Chính vì điều này cho nên prototype mới có tác dụng đó là tât cả các thuộc tính và phương thức của đối tượng này sẽ được kế thừa bởi thể hiện của hàm tạo. Điều này có nghĩa là chúng ta có thể định nghĩa các thuộc tính và phương thức bất biến đó trực tiếp trên prototype đối tượng. Tôi có thể viết lại như sau:

```markdown
 　function Cat(name, color){

　　　　this.name = name;

　　　　this.color = color;
　　}
  Cat.prototype.type = 'dongvat';
  Cat.prototype.eat = function() {
    console.log('an ca')
  }

Sau đó tôi dùng new để tạo hai Object.

var cat1 = new Cat('Sen', 'pink')
console.log(cat1.eat()) //  an ca
console.log(cat1.type) // dongvat

var cat2 = new Cat('Boss', 'black');
console.log(cat2.eat()) //  an ca
console.log(cat2.type) // dongvat
```

Tại thời điểm này, các thuộc tính type và method eat()của tất cả các trường hợp thực sự là cùng một địa chỉ bộ nhớ, trỏ đến prototype đối tượng, do đó hiệu quả hoạt động được cải thiện. Check xem thử

`console.log(cat1.eat === cat2.eat); //true`

Vậy thôi là đủ rồi, nếu bạn vẫn chưa hiểu thì thực sự tôi cũng bó tay luôn đấy! Đây là một trong những bài viết nhằm giúp cho các bạn hiểu hơn về khái niệm Prototype trong javascript là gì? Tôi sẽ cố gắng cập nhật những khái niệm tiếp theo trong những bài viết tiếp theo. 
Bài viết được post từ : [anonystick.com](https://anonystick.com)
Thank for reading!