>"Master programmers think of systems as stories to be told rather than programs to be written.” – Robert C. Martin. 
 >(Tạm dịch: “Các lập trình viên bậc thầy luôn cho rằng hệ thống là những câu chuyện sẽ được kể chứ không phải là các chương trình sẽ được viết.”). Vì vậy, hãy luôn kể những câu chuyện thú vị và dễ hiểu.

*Vừa rồi mình có cơ hội được giao task bảo trì cho một module khá lớn và có nghiệp vụ xử lý phức tạp, đó là một quãng thời gian vô cùng căng thẳng của mình. Vì mình đụng tới đâu cũng là “smell code” (code thúi), không hề có một dòng comment hay tài liệu nào để lại và tất nhiên người viết khởi đầu thì cũng đã lặn tăm từ lâu. Ngoài việc [đặt tên biến](https://viblo.asia/p/dev-da-that-su-biet-cach-dat-ten-bien-hieu-qua-924lJPzXKPM) rất lủng củng và khó hiểu, mỗi hàm đều viết rất dài, mất tầm 100 – 150 dòng. Kết quả là phải đập đi, xây lại toàn bộ. Đó là lý do đã thôi thúc mình phải nghiên cứu và viết về chủ đề này ngày hôm nay.*

#### Nguyên tắc 1: Phạm vi nhỏ nhất có thể

Nguyên tắc đầu tiên là phạm vi function (hàm) phải được thu nhỏ.

Vậy dài như thế nào là đủ? Tất nhiên là ngắn nhất có thể. 

Hàm không nên viết dài cỡ 100 dòng, hay thậm chí 20 dòng vẫn quá còn dài. Hợp lý nhất theo mình chỉ nên **4 - 5 dòng là tối đa**. Đồng ý là số lượng hàm sẽ bị tăng lên, nhưng miễn là khi chúng ta đọc vào dễ hiểu, dễ bảo trì, tái sử dụng được thì hãy cứ làm.

Đồng thời, một lưu ý khác là mỗi dòng cũng không nên dài quá 150 ký tự.

Ngoài ra, **khối lệnh** trong câu if, else hoặc câu while cũng chỉ nên có một dòng. Tất nhiên, dòng đó sẽ là câu gọi cho một hàm khác.

**Thụt lề trong các khối lệnh cũng chỉ nên có 2 level là tối đa**. Giả sử như 3 câu if lồng vào nhau là đã vi phạm nguyên tắc này.


```java
//-------------before----------------//
public String classify(Student student) {
	int mark = student.getMark();
	int schoolDaysOff = student.getSchoolDaysOff();
	List<Award> awards = student.getAwards();
	if(mark > 7){//level 1
		if(schoolDaysOff > 2) {//level 2
			if(null != awards && awards.size() > 0) {//level3
				return "A+";
			}
		}
	}
	return "B";
}
//--------------after---------------//
public String classify(Student student) {
	int mark = student.getMark();
	String result = "B";
	if(mark > 7){//level 1
		result = classifyBySchoolDaysOffAndAward(Student student);
	}
	return result;
}
```

#### Nguyên tắc 2: Chỉ xử lý một việc

Mỗi hàm chỉ nên thực hiện **một công việc duy nhất**. Làm sao để nhận biết là một hàm đang thực hiện một chức năng hay đa xử lý?

Hãy tường thuật. Mình ví dụ như cách pha ly nước cam chẳng hạn. Mỗi câu trong đoạn văn sẽ là một hàm mà chúng ta phải viết. Hàm này sẽ gọi hàm kia.

*“Để pha một ly nước cam, Sau đó, ta vắt lấy 1 quả cam bỏ vào ly. Kế tiếp, lấy 1 muỗng đường bỏ vào. Cuối cùng là một lượng nước cần thiết…”*

Nghe thì có vẻ hơi chi li, nhưng thực tế các hàm nên được xây dựng như vậy để đảm bảo tính tường minh và dễ dàng cho việc debug.

#### Nguyên tắc 3: Tham số của Hàm

Số lượng tham số lý tưởng cho một hàm là 0. Tiếp đến là 1 hoặc 2. Nên tránh 3 tham số nếu có thể.

Nhiều tham số còn gây thêm trở ngại trong việc viết unit test. Vì chúng ta sẽ có rất nhiều cách kết hợp từ 3 tham số trở lên trong việc testing.

Tuy nhiên, đời không như là mơ. Thực tế, sẽ có rất nhiều hàm cần hơn 3 tham số. Nếu gặp phải trường hợp đó, chúng ta nên **gom các tham số vào trong một class**.

```java
Circle makeCircle(double x, double y, double radius);
Circle makeCircle(Point center, double radius);
```

#### Nguyên tắc 4: Đặt tên Hàm

Hàm càng nhỏ thì càng dễ cho chúng ta đặt tên. Tên mang tính mô tả cao lại càng tốt.

Đừng ngại trong việc đặt tên dài. Một tên dài nhưng mô tả đúng vẫn hơn là những dòng comment miêu tả dài.

Cũng đừng ngại trong việc mất thời gian lựa chọn tên. Có một tên mô tả chính xác sẽ giúp cho module bạn viết có một thiết kế rõ ràng và giúp đỡ cho chúng ta rất nhiều khi cần cải thiện hay nâng cấp nó về sau.

Và phải luôn thống nhất trong [cách đặt tên](https://viblo.asia/p/dev-da-that-su-biet-cach-dat-ten-bien-hieu-qua-924lJPzXKPM).

Trong trường hợp hàm có một tham số, tên hàm và tên tham số nên tạo thành một cặp động từ và danh từ

```java
makeDrink(Orange orange);
```

#### Nguyên tắc 5: Xử lý râu ria không cần thiết

Hãy tham khảo một hàm sau và đố bạn dòng code nào là râu ria trong hàm :smile: :smile:

```java
public class UserValidator {
  private Cryptographer cryptographer;
  public boolean checkPassword(String userName, String password) {
    User user = UserGateway.findByName(userName);
    if (user != User.NULL) {
      String codedPhrase = user.getPhraseEncodedByPassword();
      String phrase = cryptographer.decrypt(codedPhrase, password);
      if ("Valid Password".equals(phrase)) {
        Session.initialize();
        return true;
      }
   	}
    return false;
  }
}
```

Râu ria ở ví dụ trên chính là dòng *Session.initialize()*. Tên hàm rõ ràng là *checkPassword()* (kiểm tra password), không hề nói lên việc sẽ khởi tạo một Session. Vì vậy trong trường hợp nếu có lỗi xảy ra về mặt Session, lập trình viên sẽ khó biết vấn đề nằm ở đâu. Trong trường hợp này, ta nên tách biệt việc khởi tạo Session ra một hàm riêng sau khi hàm *checkPassword()* trả về true.

#### Nguyên tắc 6: Tách riêng Try và Catch

Bản thân **Try và Catch** đã tạo ra một hình thù xấu xí trong việc trộn lẫn giữa luồng xử lý bình thường và luồng xử lý lỗi. Vì vậy, tốt nhất nên tách riêng các khối lệnh trong try và catch thành 2 hàm riêng biệt.

```java
public void delete(Page page) {
  try {
 	 deletePageAndAllReferences(page);
  }
  catch (Exception e) {
 	 logError(e);
  }
}

private void deletePageAndAllReferences(Page page) throws Exception {
  deletePage(page);
  registry.deleteReference(page.name);
  configKeys.deleteKey(page.name.makeKey());
}
private void logError(Exception e) {
	logger.log(e.getMessage());
}
```

#### Pha nước cam...
Mình mạn phép viết thử luồng xử lý pha nước cam dựa trên những nguyên tắc trên. Tất nhiên đoạn code mang tính ví dụ thôi bạn nhé. :satisfied: :satisfied:

```java
public class Demo () {
	public static void main(String[] args){
		try {
			makeOrangeJuice();
		}catch(Exception e){
			logError(e);
		}
	
	}
	
	private void makeOrangeJuice() throws Exception {
    	Flavor sugar = new Flavor();
		Water water = new Water();
		DrinkMaker orangeJuice = this.prepare();
		orangeJuice.mix(sugar, water);
	}
	
	private DrinkMaker prepare() throws Exception {
		Fruit orange = new Fruit();
		return new DrinkMaker(orange);
	}
	
	private void logError(Exception e) {
		System.out.println("Error: " + e.getMessage());
	}	
	
}

public class DrinkMaker () {
	private Fruit fruit;
	private Mixture mixture;
	
	private DrinkMaker(Fruit fruit) {
		this.fruit = fruit;
		this.mixture = new Mixture();
	}
	
	private void squeeze() throws Exception{
		this.mixture = fruit.squeeze();
	}
	
	private void add(Flavor flavor) throws Exception{
		this.mixture.add(flavor);
	}
	
	private void add(Water water) throws Exception{
		this.mixture.add(water);
	}
	
	public void mix(Flavor flavor, Water water) throws Exception{
		this.squeeze();
		this.add(flavor);
		this.add(water);
	}
	
}
```

Bạn cũng thử làm giống mình xem, ví dụ như luồng xử lý xin tăng lương chẳng hạn. :stuck_out_tongue_closed_eyes::stuck_out_tongue_closed_eyes:
-	Đầu tiên là các bạn thử tường thuật cách xử lý từng bước
-	Cố gắng mô phỏng các hàm ngắn gọn nhất có thể, cũng như đặt tên biến, tên đối tượng sao cho hợp lý
-	Viết thử như mình viết phía trên
-	Hỏi ý kiến người thân (các bạn dev đồng nghiệp í)

#### Kết

Những nguyên tắc trên đây là mình đúc kết từ cuốn **Clean Code của Robert C. Martin**, chương Function. Dựa theo kinh nghiệm làm việc cá nhân, mình cũng lược bỏ một số nguyên tắc không còn phù hợp với bối cảnh hiện tại và viết lại theo cách mình hiểu. Tuy nhiên, các bạn vẫn nên tìm đọc đầy đủ, vì có thể là cách lược bỏ của mình là chưa đúng :blush::blush:

Nếu bạn nào có thêm những ý kiến hữu ích, đừng ngại chia sẻ, mình luôn đánh giá cao những góp ý. Mình cũng đang “bí” đề tài mới cho tuần kế tiếp, nên bạn nào đang có “vướng mắc” thì gợi ý thêm cho mình nhé.