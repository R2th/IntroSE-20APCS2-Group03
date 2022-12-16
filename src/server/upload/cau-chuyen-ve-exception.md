# Lời mở đầu
Exception là một khái niệm không hề xa lạ với một lập trình viên. Nó là thứ xảy ra hằng ngày hằng giờ. Việc nắm bắt được exception luôn là một thử thách đối với bất cứ ai khi bắt đầu tiếp xúc với lập trình. Và để cho thử thách đó trở nên dễ dàng hơn, mình sẽ đưa nó về những câu chuyện để cho bạn có thể hình dung và nhớ được.

Đó là câu chuyện về hai người chở nhau đi trên một chiếc xe. Bỗng từ đâu có một hòn đá bay thẳng đến phía hai người. Hãy tưởng tượng trong tình huống này hòn đá chính là một exception phát sinh trong chương trình “đạp xe” của bạn. Vậy tình huống nào sẽ xảy ra.

# Tình huống 1: Sự hi sinh thầm lặng
Người lái xe chắn ở phía trước nhận lấy hòn đá ném vào mình nhưng lại chẳng cho người ngồi sau biết. Một cử chỉ cảm động nhưng có vẻ là hơi ngu ngốc. Đến đây bạn đã có thể hình dung exception được xử lý trong trường hợp này chưa (?)
Đây là trường hợp handle exception điển hình bằng try...catch. Mọi exception xảy ra khi thực hiện ở try đều được catch và sau đó thì không có gì phát sinh thêm.
Ví dụ:
```
public void doNotIgnoreExceptions() {
	try {
		// do something
	} catch (NumberFormatException e) {
		// don’t do anything
	}
}
```
* Ưu điểm: Kiểm soát được các lỗi phát sinh để chương trình luôn available.
* Nhược điểm: Một hình thức dấu lỗi, những xử lý (ở phương thức khác) khi dùng phương thức đó sẽ không biết được lỗi phát sinh từ đâu và lỗi như thế nào.

# Tình huống 2: Thân mình là trên hết
Thân mình là trên hết, người ngồi trước thấy đá là né. Người ngồi sau không hiểu chuyện gì xảy ra chỉ thấy đá văng thẳng mặt.
Trường hợp này cũng là trường hợp kinh điển khi bạn phát triển một chức năng nào đấy mà có thể phát sinh exception nhưng bạn không muốn giải quyết chúng. Chỉ cần thêm các exception sau từ khóa throws, không phải try...catch gì nữa. 
Ví dụ:
```
/**
* This method does something extremely useful ...
*
* @param input
* @throws MyBusinessException if ... happens
*/
public void doSomething(String input) throws MyBusinessException {
	// do something with throw MyBusinessException 
}
```
* Ưu điểm: Người lập trình không cần chú ý đến các lỗi phát sinh trong phương thức mình đang xây dựng vì sẽ có người sau đó (cùng những phương thức sau đó) xử lý.
* Nhược điểm: Nếu lạm dụng, chỉ biết ném exception từ phương thức này sang phương thức khác thì ai sẽ là người giải quyết cuối cùng (?)

# Tình huống 3: Có phúc cùng hưởng, có họa cùng chịu
Đúng như tên gọi, người lái xe sau khi bị dính đá lại ném nó cho người ngồi sau. Tình cảm thì ném cái mảnh vụn, không tình cảm thì ném nguyên hòn đá đã văng vào mình.
Các bạn có thể xem đây là sự kết hợp giữa hai tình huống trên. Bạn vẫn xử lý những exception có thể phát sinh đồng thời thông báo cho người sau biết là cái gì đang xảy ra.
Ví dụ:
```
try {
	new Long("xyz");
} catch (NumberFormatException e) {
	log.error(e);
	throw e;
}
```
Ở ví dụ trên có thể xem là một cách khôn khéo để xử lý exception. Log error khi nó  diễn ra và rethrow để người gọi nó có thể xử lý một cách thích hợp. Tuy nhiên với cùng một exception thì việc xử lý ghi log chẳng hạn sẽ ghi lại cùng một lỗi nhiều lần. Message lặp lại không mang lại bất kì lợi ích nào thậm chí còn gây khó khăn trong việc debug. Vì vậy nếu bạn có ném lại exception thì nên ném lại nó nhè nhẹ thôi. Đừng nên ác ý quá mà ném y nguyên lại cái exception đó cho người sau nhé. Và tất nhiên với ví dụ trên, chúng ta nên chuyển thành như sau:
```
public void wrapException(String input) throws MyBusinessException {
	try {
		new Long("xyz");
	} catch (NumberFormatException e) {
		throw new MyBusinessException("String can’t input.", e);
	}
}
```
* Ưu điểm: Mọi chuyện đều diễn ra tường mình, người lập trình sau cũng nhưng như những phương thức sau đó đều biết chuyện gì đang xảy ra, lỗi phát sinh ở đâu và như thế nào. Các bạn thử nghĩ xem, đã có người đằng trước hứng đá thì người đằng sau hẳn là sẽ chịu ít sát thương hơn rồi. Có khi nó tình cảm quăng hòn đá nhè nhẹ hoặc quăng cho cái mảnh vụn vụn :D
* Nhược điểm: Có một hòn đá mà cả hai đứa hứng thì đúng là phiền phức, phải xử lý một việc hai lần. Đối với trường hợp nhiều phương thức sau sử dụng phương thức đó thì tất nhiên là chúng ta vẫn sẽ phải catch đến cuối cùng rồi.
# Tình huống 4: Ném đá dấu tay
Chuyện hai người có những lúc ngang trái. Đời thì vẫn lắm trái ngang. Cái gì cũng có thể xảy ra. Đây là một tình huống khá đau lòng khi không có hòn đá nào tự đâu bay tới nhưng người ngồi sau vẫn ăn hẳn một phát vào mặt. Hẳn các bạn cũng đoán được hung thủ: người ngồi trước làm.
Đây là ví dụ mô tả cho việc xử lý các tình huống mà những cái có sẵn trong Java không thể làm được. Với những exception tùy biến chẳng hạn, Java chẳng biết sẽ phải throw nó lúc nào. Không còn cách nào khác bạn phải tự làm điều đó.
Ví dụ:
```
if(age<18) {
         throw new JobException("Employee not enough age to work."); 
      }
      else {
         System.out.println("Employee’s age is Valid!!"); 
      }
```
* Ưu điểm: Thích hợp cho việc kiểm soát các lỗi nghiệp vụ, không phải do chương trình gây ra.
* Nhược điểm: Thường là các exception tự định nghĩa nên có thể người sau không kiểm soát được.

# Lời kết
Thông qua 4 tình huống từ câu chuyện exception này, mình hy vọng các bạn khi mới tiếp xúc với lập trình cũng như mới lần đầu gặp các xử lý với exception sẽ có thể nhanh chóng nắm bắt được cách xử lý exception như thế nào cho phù hợp với chương trình của bạn nhất có thể. Bài viết ở mức độ basic trên phương diện hiểu biết cá nhân trong quá trình học và làm cũng như vọc vạch đọc thêm các kiểu nên vẫn còn nhiều sai sót. Rất mong các bạn có thể góp ý thêm.

Nguồn tham khảo:https://stackify.com/best-practices-exceptions-java/