Hãy nghĩ về lambda expression như một cú pháp rút gọn cho compiler (tương tự như khi ta lập trình trên các IDE, chỉ cần gõ psvm + Tab sẽ ra được hàm “public static void main(String[] args)”), khi compiler thấy cú pháp lambda, nó sẽ mở rộng ra thành hai phần: phần định nghĩa class và phần khởi tạo class. <br>
Nếu bạn nghĩ nó như một công cụ để rút ngắn code lại, bạn sẽ yêu thích nó, đến mức mà bạn sẽ tìm đủ mọi cách tận dụng nó bất cứ khi nào có thể. <br>
Hãy xem thử một ví dụ đơn giản về một trung tâm mua bán xe hơi CarMall, nơi có rất nhiều Car khác nhau:

```
public class CarMall {
    private List<Car> cars;

    public CarMall() {
        cars = new ArrayList<>();
        cars.add(new Car("Honda",  "City 2021"));
        cars.add(new Car("Honda",  "Civic 2021"));
        cars.add(new Car("Honda",  "Accord"));
        cars.add(new Car("Honda",  "CRV"));

        cars.add(new Car("Toyota",  "Vios"));
        cars.add(new Car("Honda",  "Fortuner Legender"));
        cars.add(new Car("Honda",  "Innova"));
    }

    public void showCars(CarFilter filter) {
        for(Car car: cars){
            if(filter.confirm(car)) System.out.println(car);
        }
    }
}
```
Trong đó, CarFilter:
```
public interface CarFilter {
    boolean confirm(Car car);
}
```
Với  Car:
```
public class Car {
    private String producer;
    private String name;

    public Car(String producer, String name) {
        this.producer = producer;
        this.name = name;
    }

    public String getProducer() {
        return producer;
    }
    public String getName() {
        return name;
    }
}
```
Nếu làm như cách thông thường, ta sẽ tạo một class implement interface CarFilter:
```
public class CarFilterImpl implements CarFilter {
    private String producer;

    public CarFilterImpl(String producer) {
        this.producer = producer;
    }

    @Override
    public boolean confirm(Car car) {
        return this.producer.equals(car.getProducer());
    }
}
```
Khi đó, đoạn code để in ra tất cả car hãng Honda là:
```
CarMall carMall = new CarMall();
CarFilter carFilter = new CarFilterImpl("Honda");
carMall.showCars(carFilter);
```
Tuy nhiên, nếu sử dụng lambda expression, ta không cần khởi tạo class implement CarFilter, và code để in ra các car hãng Honda chỉ cần:
```
CarMall carMall = new CarMall();
carMall.showCars(c -> c.getProducer().equals("Honda"));
```
Cách này giúp giảm tải khoảng chục dòng code (do không phải khởi tạo CarFilterImpl). <br>
**Nhưng tại sao? Sao ta có thể code như vậy mà trình biên dịch vẫn hiểu?** <br>
Thực chất, tất cả thông tin cần có để “mở rộng” đã có sẵn trong function *carMall.showCars(...)*. Trình biên dịch biết rằng nó cần truyền một đối tượng của class implement CarFilter interface vào trong function *showCars(CarFilter filter)*, và rằng đối tượng này cần implement function:* boolean confirm(Car car)* bởi nó là function duy nhất trong interface. Nó cũng biết rằng nội dung trong hàm sẽ tương đương với expression:  *c -> c.getProducer().equals("Honda")*. <br>
Từ đó, trình biên dịch sẽ tự động tạo ra một đoạn code như sau:
```
Class XYZ implements CarFilter {
	public boolean confirm(Car car) {
        return car.getProducer().equals(“Honda”);
    }
}
```
 Và thế là chương trình chạy ngon lành !!
Vậy đấy, lambda thực chất rất đơn giản phải không :laughing::laughing::laughing: