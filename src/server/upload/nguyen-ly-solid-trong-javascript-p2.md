Ở bài này chúng ta cùng tìm hiểu về nguyên lý thứ 3 trong S.O.L.I.D, tương ứng vói chữ L.
# L - Liskov Substitution Principle

Đọc cái tên thì đã nguyên lý thôi đã thấy khó hiểu rồi phải không nào, `Substitution` nghĩa là thay thế rồi, vậy `Liskov` là gì nhỉ ? À thực ra cũng không khó hiểu lắm vì `Liskov` chỉ là tên người đã tạo ra nguyên lý này thôi, Barbara Liskov.

Nội dung nguyên lý:
> Trong một chương trình, các đối tượng trong một chương trình có thể được thay thế bởi các class con mà không làm thay đổi tính đúng đắn của chương trình.



Giờ chúng ta cùng tìm hiểu về nguyên lý này thông qua 2 ví dụ nhé.

### Ví dụ 1 
Chính là bức ảnh này. 

Rất đơn giản đó là một chú vịt và vịt chạy bằng pin.
![](https://images.viblo.asia/3da6270b-050d-4af0-9328-73b052e8a893.png)

OK chúng đều là vịt cả, nhưng liệu vịt chạy bằng pin `MechanicalDuck` trở thành class con của vịt `Duck` được không ?

Chúng ta sẽ áp dụng TDD vào chương trình (hiểu nôm na là viết test trước khi viết code),
Chương trình của chúng ta chỉ kỳ vọng là vịt chỉ cần kêu được `Quack`, không cần làm gì nữa. 

```js
describe('Duck', function(){
  describe('#quack', function(){
    it('produces "Quack" sound', function(){
      const duck = new Duck();
      expect(duck.quack()).toEqual('Quack');
    });
  });
});
```

Giờ bắt đầu định nghĩa class `Duck` cơ bản nhất
```js

class Duck{
  constructor(){
    // Duck initialization process
  }

  quack(){
    return 'Quack';
  }
}
```

Chúng ta chạy pass qua test, đáp ứng đủ yêu cầu của chương trình. Cool, giờ thì ta sẽ tạo class con `MechanicalDuck` cho vịt chạy bằng pin. Tất nhiên, nó cần có thể kêu quack được. Sự khác biệt duy nhất là nó cần pin để có thể vận hành.


```js
class MechanicalDuck extends Duck{
  constructor(battery=null){
    super();
    this._battery = battery;
  }

  quack(){
    if(!this._battery){
      throw 'Need battery to operate.';
    }
    return 'Quack';
  }
}
```
Theo LSP, chúng ta có thể thay thế class cha bằng class con một cách an toàn. Giờ hãy thử áp dụng và thay thế `MechanicalDuck` cho `Duck`

Oh, test case đã thất bại. `MechanicalDuck` cần pin để kêu. Do đó, `MechanicalDuck` rõ ràng không thể thay thể `Duck`. Mặc dù giao diện của chúng có vẻ giống nhau, nhưng hành vi của chúng là hoàn toàn khác biệt. Vậy là việc sử dụng `MechanicalDuck` kế thừa `Duck` đã vi phạm LSP

*Vậy cái gì sẽ trở thành class con thích hợp ?*

Trong trường hợp này, đó là `FemaleDuck`.

```js
class FemaleDuck extends Duck{
  constructor(){
    super();
    // Initialization of female stuff
    this._butt = new FemaleDuckButt();
  }

  layAnEgg(){
    const egg = this._butt.layAnEgg();
    return egg;
  } 
}
```

`FemaleDuck` sẽ pass qua test ở trên mà không làm thay đổi hành vi của `Duck`, chỉ mở rộng thêm chức năng cho `Duck`. Vịt của chúng ta giở có thể đẻ trứng.

OK, thông qua ví dụ trên, chắc các bạn cũng đã nắm được phần nào về nguyên lý này. Vậy áp dụng trong JavaScript thì sao nhỉ ?

**Trong ngữ cảnh của JavaScript,** nó có nghĩa là
- Các phương thức của class con sẽ ghi đè phương thức của class cha với chính xác số lượng tham số
- Mỗi tham số của phương thức ghi đè phải có type giống như phương thức của class cha
- Type của giá trị trả về của phương thức ghi đè của class con phải giống class cha
- Các type của exception được ném từ phương thức ghi đè phải giống với phương thức cha


Để tìm hiểu kỹ hơn thì chúng ta sẽ cùng vào ví dụ thứ 2

### Ví dụ 2
Tìm hiểu về đại bàng và chim cánh cụt. Đại bàng và chim cánh cụt đều thuộc loài chim. 
![](https://images.viblo.asia/e18a7f36-b197-43a3-82ae-d0d79c6de374.jpg)

```js

class Bird {
  fly(speed) {
    return `Flying at ${speed} km/h`;
  }
}

class Eagle extends Bird {
  dive() {
    // ...
  }

  fly(speed) {
    return `Soaring through the sky at ${speed}`;
  }
}

// Vi phạm LSP:
class Penguin extends Bird {
  fly() {
    return new Error("Sorry, I cant fly");
  }
}
```



Trong ví dụ này, class `Eagle` đã ghi đè phương thức `fly`, nó không vi phạm LSP bởi vì phương thức mới tương ứng với phương thức của class cha. Phương thức của class con ghi đè với class cha  phải có cùng số lượng tham số => `Eagle` kế thừa cho `Bird` là hoàn toàn hợp lý.


Còn với chim cánh cụt thì sao nhỉ, thực tế thì bạn có thể hiểu là chim cánh cụt thì không thể bay, do đó để nó kế thừa `Bird` cũng đã sai sai rồi. Nhìn theo lý thuyết thì class `Penguin` đã vi phạm LSP ở 3 điểm sau:
- Phương thức ghi đè không có cùng số lượng tham số
- Type giá trị trả về của phương thức `fly` không giống nhau
- Type của exception được ném ra không giống nhau


<br>
Bài viết đến đây là hết. Hi vọng có thể giúp các bạn hiểu thêm về nguyên lý thứ 3 này. Hẹn gặp lại các bạn ở bài viết sau về 2 nguyên lý còn lại nhé.

Nguồn:

https://carstenbehrens.com/liskov-substitution-principle/

https://maksimivanov.com/posts/liskov-substitution-principle/