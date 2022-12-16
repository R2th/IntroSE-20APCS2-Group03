## Phân biệt Abstract Factory và Factory Method




### Giống nhau
- Đều là `factory pattern`
- Đều dùng để giảm sự phụ thuộc giữa chương trình với những cài đặt cụ thể (với 2 cách làm riêng)
- Đều đóng gói (encapsulate) quá trình tạo ra đối tượng để giúp chương trình độc lập và giảm phụ thuộc với những kiểu cụ thể


### Khác nhau

**Factory Method** 
- Dùng các lớp để tạo ra products.
- Tạo ra các products, objects nhờ vào sự kế thừa (inheritance) nghĩa là nếu muốn tạo ra các đối tượng bằng cách Factory Method, người ta cần phải extend một lớp và override lại hàm tạo Factory Method, rồi Factory Method sẽ tạo ra 1 object 
- Ý tưởng của Factory Method Pattern, là sẽ sử dụng các lớp con để sinh ra 1 đối tượng mong muốn. Bằng cách đó, người dùng sẽ chỉ cần biết đến lớp trừu tượng như gia cầm, và các lớp con cụ thể sẽ lo về các kiểu gà, kiểu vịt, kiểu ngan. Vì vậy, nói theo cách khác, nó giúp chương trình độc lập với các kiểu (type) cụ thể đó.
- Khi muốn bổ sung thêm một product nữa vào nhóm các products chỉ cần một method.
- Factory Method dùng hàm Factory Method để tạo ra product cụ thể mà người dùng muốn, họ sẽ không biết cái gì được tạo ra, mà chỉ cần gọi hàm.

**Abstract Factory** 
- Dùng các đối tượng để tạo ra products.
- Tạo ra các products, objects nhờ vào sự kết hợp các đối tượng.
- Ý tưởng cũng giống giống vậy nhưng làm theo một cách khác : tạo ra một kiểu trừu tượng (abstract type) để dùng vào việc tạo ra một nhóm những products khác. Khi đó, những lớp con của kiểu trừu tượng sẽ xác định cách tạo ra các products này. Để áp dụng được ý tưởng này, phải tạo ra một instance của một trong các lớp con trên (instance này là 1 factory) và đưa nó vào chỗ cần thiết trong code. Vì thế, giống như Factory Method, những nơi sử dụng factory của Abstract Factory sẽ hoàn toàn độc lập với những produtcts cụ thể. Một lợi ích nữa của cách này là các products tương tự nhau đã được nhóm lại. Vậy nên khi cần bổ sung thêm một product nữa vào nhóm các products mà Abstract Factory có thể tạo ra, người dùng phải đi đổi tất cả các lớp con (các lớp con ở đây là các factories). Người dùng rất không thích Abstract Factory ở điểm này.
- Có khả năng tạo ra nhiều kiểu products khác nhau.
- Abstract Factory thường sử dụng nhiều hàm Factory Method theo cách của Factory Method để tạo các đối tượng bên trong những factories của chính nó. Những lớp factory con thường dùng các Factory Method để tạo các products tương ứng. Trong trường hợp này, các Factory Method được dùng thuần túy để tạo ra các products.



## Vậy khi nào nên dùng Abstract Factory, khi nào nên dùng Factory Method?

- Abstract Factory: sử dụng khi nào cần cùng một lúc tạo ra nhiều loại products, và khi muốn chắc chắn những nơi sử dụng sẽ không cần biết đến những lớp cụ thể khi cần làm việc này.

- Factory Method: dùng khi cần tạo ra một kiểu product nào đó thôi, sử dụng để làm cho chương trình độc lập với những lớp cụ thể mà ta cần tạo 1 đối tượng, hoặc khi không biết sau này sẽ cần đến những lớp con nào nữa. Khi cần sử dụng Factory Method, hãy tạo tạo ra subclass (1 factory implement 1 kiểu abstract) và implement Factory Method.



Nguồn: quyển sách Head First – Design Pattern