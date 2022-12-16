## What is Reference ?
> `A reference is an address that indicates where an object's variables and methods are stored. You aren't actually using objects when you assign an object to a variable or pass an object to a method as an argument. You aren't even using copies of the objects. Instead, you're using references to those objects.`

Một tham chiếu, như định nghĩa, là một địa chỉ chỉ ra nơi mà những biến và phương thức của một đối tượng, hay nói đơn giản là nơi đối thượng đó được lưu trữ, thật ra chúng ta không thực sự sử dụng đối tượng khi gán đối tượng cho một biến hoặc truyền đối tượng là một tham số của phương thức, chúng ta cũng không sử dụng bất kì một bản sao nào của đối tượng, cái chúng ta sử dụng chính là tham chiếu của đối tượng đó.

Nghe có vẻ hàn lâm quá nhỉ, thôi thì để nói một cách dễ hiểu hơn, mình xin đưa ra một ví dụ trực quan, giả sử bây giờ bạn muốn xây nhà đi, thì `class` giống như cái bản vẽ của ngôi nhà, sử dụng bản vẽ đó bạn có thể xây bao nhiêu ngôi nhà cũng được, mỗi ngôi nhà được xây chính là một đối tượng (`object`, hoặc có thể gọi là `instance`) giả sử có một cô nàng xinh đẹp muốn đến thăm nhà bạn, bạn phải đưa cho cô ta một tờ giấy (hay cái gì đó) có thông tin địa chỉ nhà của bạn, đó chính là một `object's reference` - tham chiếu đến một đối tượng.

Bạn có thể sao chép ra bao nhiêu `reference` để đưa cho rất nhiều cô gái khác nhau đều được, nhưng bạn chỉ có duy nhất một ngôi nhà, điều đó có nghĩa bạn chỉ sao chép ra một tờ giấy với địa chỉ ngôi nhà ở trên đó chứ không phải là bản thân ngôi nhà của bạn.

Để rõ ràng hơn nữa, mình sẽ phân tích cụ thể đoạn code này 

    MyHouse myHouse = new MyHouse();
  
    share(myHouse);
    myHouse.repair()

    public void share(MyHouse house) {
        house = new MyHouse();
    }

Ở dòng đầu tiên,  mình gọi `new MyHouse()` để yêu cầu nhà thầu xây dựng (JVM) xây cho mình một căn nhà dựa theo bản thiết kế `MyHouse`, bên nhà thấu sẽ thi công, xong báo lại địa chỉ căn nhà, mình sẽ ghi nó lại, đó là `myHouse`. Xong dòng này nhé.

Đến dòng thứ 2, tự nhiên có một cô nàng xin đẹp đến tán tỉnh hỏi số nhà mình, vì mê gái, à nhầm vì yêu cái đẹp, mình sẽ gửi tờ giấy chứa địa chỉ căn nhà cho một phương thức gọi là `share` , trong phương thức `share`, vì tính chất của Java là *pass-by-value* , nên `house` ở đây chính là một bản sao của tham chiếu `myHouse`, okey, vậy phương thức `share` sẽ làm gì với tham chiếu mình gửi cho nó?  nó sẽ yêu cầu xây mới một căn nhà, tất nhiên là dựa theo thiết kế `MyHouse` của mình, sau đó lấy địa chỉ của căn nhà mới này ghi lên tờ giấy chứa địa chỉ căn nhà của mình, là `house`.

Tiếp đến dòng thứ 3, chúng ta gọi phương thức `repair` có trong bản thiết kế `MyHouse`, một câu hỏi mà nhiều bạn sẽ thắc mắc là bây h tham chiếu `myHouse` sẽ trỏ đến đối tượng nào, tức là nhà của mình hay cái này mới xây trong  `share` sẽ được sửa chữa ? Tất nhiên là nhà của mình rồi, nên nhớ là chúng ta chỉ tạo ra một bản sao của` myHouse ` là `house` khi truyền cho phương thức `share`,  nên địa chỉ trên tờ giấy `myHouse` là không đổi, vẫn là địa chỉ nhà mình. 

Hy vọng sau ví dụ này bạn sẽ hiểu thêm một chút về reference, tiếp theo mình xin giới thiệu các loại reference trong java:

## Các loại references trong java
Để hiểu hơn các loại references trong java, mình xin giới thiệu các bạn một bài viêt giới thiệu rất hay của tác giả Nguyễn Hữu Nam, mọi người có thể xem chi tết ở [đây](https://viblo.asia/p/how-references-work-in-java-and-android-PwRGgmookEd)

## Kết
Hy vọng qua bài viết này, mọi người sẽ hiểu rõ hơn về một đối tượng rất cơ bản nhưng được sử dụng rộng rãi trong java, have fun !