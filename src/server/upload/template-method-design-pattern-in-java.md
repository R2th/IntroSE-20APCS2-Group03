<b>1. Giới thiệu:</b>  <br>
Template Method là một Behavioral Design Pattern. Template Method design pattern được sử dụng để tạo một method tiến hành và trì hoãn các bước trong việc triển khai các method trong các subclass. <br> <br>
Template Method design pattern tạo ra các các bước để thực hiện một thuật toán và nó có thể cung cấp các triển khai mặc định cho tất các hoặc cho một vài lớp con kế thừa nó. <br><br>
Có vẻ khó hiểu đúng không ? Đến với một ví dụ thế này : Chúng ta sẽ build một thuật toán để xây dựng ngôi một ngôi nhà. Các bước cần làm để tạo ra ngôi nhà đó là - xây dựng nền móng -> xây các trụ, cột -> xây các bức tường và cửa sổ. Và điều quan trọng ở đây là chúng ta không thể thay đổi các thứ tự thực hiện đó, ví dụ như là không thể xây các cửa sổ trước khi xây nền móng :D . Vì vậy, trong trường hợp này chúng ta sẽ tạo ra một Template như mình đã nói ở trên để đưa vào đó các bước khác nhau theo thứ tự để xây dựng ngôi nhà.<br> 
Xây thôi nào, mình sẽ xây 2 loại nhà là nhà kính và nhà gỗ cho dễ hiểu nhé :v . <br> <br>
Chúng ta sẽ cần tạo ra một Template chứa các bước để xây nhà  dùng chung cho 2 loại nhà này, và nó sẽ được modify với final để không bị Override ở subclass của nó. <br><br>

<b>2. Triển khai ví dụ:</b>  <br>  
<b>a. Template Method Abstract Class</b>
Vì muốn một số các phương phương thức được định nghĩa ở lớp con (ở đây là cách xây cái gì đó theo từng loại nhà), chúng ta phải tạo một base-class là một abstract class.<br>
<b>HouseTemplate.java</b>
```
public abstract class HouseTemplate {

	//template method, final để cho các subclass không thể override lại.
	public final void buildHouse(){
		buildFoundation();
		buildPillars();
		buildWalls();
		buildWindows();
		System.out.println("House is built.");
	}

	//default implementation
	private void buildWindows() {
		System.out.println("Building Glass Windows");
	}

	//methods to be implemented by subclasses
	public abstract void buildWalls();
	public abstract void buildPillars();

	private void buildFoundation() {
		System.out.println("Building foundation with cement,iron rods and sand");
	}
}
```
<br>
Ở đây ta có <b>buildHouse()</b> là một Template method sắp xếp các method theo các bước để tạo ra ngôi nhà.
<br> <br>

<b>b. Template Method Concrete Classes</b> <br>
Chúng ta sẽ có những khác nhau trong việc xây dựng ra các loại nhà khác nhau, dưới đây là nhà kính và nhà gỗ<br>
<b>WoodenHouse.java</b><br>
```
public class WoodenHouse extends HouseTemplate {

	@Override
	public void buildWalls() {
		System.out.println("Building Wooden Walls");
	}

	@Override
	public void buildPillars() {
		System.out.println("Building Pillars with Wood coating");
	}

} 
``` 
<br> 
<b>GlassHouse.java</b>

```
public class GlassHouse extends HouseTemplate {

	@Override
	public void buildWalls() {
		System.out.println("Building Glass Walls");
	}

	@Override
	public void buildPillars() {
		System.out.println("Building Pillars with glass coating");
	}

}
```

<br><br>
<b>c. Template Method Design Pattern Client</b> <br>
Thực thi chương trình nào : <br>
<b>HousingClient.java</b>
<br>
```
public class HousingClient {

	public static void main(String[] args) {
		
		HouseTemplate houseType = new WoodenHouse();
		
		//using template method
		houseType.buildHouse();
		System.out.println("************");
		
		houseType = new GlassHouse();
		
		houseType.buildHouse();
	}

}
```
<br>
Run và chúng ta sẽ nhận được :
<br>

```
Building foundation with cement,iron rods and sand
Building Pillars with Wood coating
Building Wooden Walls
Building Glass Windows
House is built.
************
Building foundation with cement,iron rods and sand
Building Pillars with glass coating
Building Glass Walls
Building Glass Windows
House is built.
```

<b>d. Template Method Design Pattern Client</b> <br>
![](https://images.viblo.asia/959d520f-8521-4188-af64-571c2fe03751.png)
<br><br>
<b>3. Những điểm quan trọng của Template Method design pattern :</b>  <br>
* Template method nên bao gồm các bước cố định để xây dựng chương trình. Và method này phải set modifier là <b>final</b>
* Hầu hết các phương thức sẽ được triển khai ở lớp con, tuy nhiên Template method thì sẽ không như vậy<br>
Đó là tất cả những gì mình tìm hiểu về Design pattern này. Hi vọng bạn thích nó.<br>
Have a good day ! <br>

Các bạn có thể tham khảo bài viết tại đây : https://www.journaldev.com/1763/template-method-design-pattern-in-java