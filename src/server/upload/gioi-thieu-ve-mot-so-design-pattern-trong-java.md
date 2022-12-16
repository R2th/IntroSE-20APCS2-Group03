# 1) Design Pattern là gì?
- Design Pattern là kỹ thuật trong lập trình hướng đối tượng, là sự đúc kết kinh nghiệm trong của các bậc tiền bối để giải quyết các vấn đề và các bài toán khác nhau. Thông qua việc sử dụng các Design Pattern mà bạn có thể xử lý các đoạn code 1 cách linh hoạt hơn. Để trở nên pro hơn thì bạn trước tiên bạn cần biết đến Design Pattern.
- Về cơ bản, trong java các Design Pattern được chia thành 3 nhóm:
+ Creational Design Pattern
    * Factory Pattern
    * Abstract Factory Pattern
    * Singleton Pattern
    * Prototype Pattern
    * Builder Pattern
+ Structural Design Pattern
    * Adapter Pattern
    * Bridge Pattern
    * Composite Pattern
    * Decorator Pattern
    * Facade Pattern
    * Flyweight Pattern
    * Proxy Pattern
+ Behavioral Design Pattern
    * Chain Of Responsibility Pattern
    * Command Pattern
    * Interpreter Pattern
    * Iterator Pattern
    * Mediator Pattern
    * Memento Pattern
    * Observer Pattern
    * State Pattern
    * Strategy Pattern
    * Template Pattern
    * Visitor Pattern

Trong bài viết này mình sẽ giới thiệu 2 Design Pattern cơ bản: Fatory Pattern và Builder Pattern

# 2) Factory Pattern.
## a) Đặt vấn đề
- Trong lập trình hướng đối tượng, các lớp con có thể override lại phương thức của lớp cha để định nghĩa phương thức theo các cách khác nhau. Có những tình huống mà chỉ biết cần phải truy nhập lớp bên trong cây phân cấp nhưng không biết chính xác là lớp con nào. Factory Pattern đưa ra 1 ý tưởng cho việc tạo các lớp con phù hợp với mỗi yêu cầu, đóng gói các chức năng yêu cầu và khởi tạo cũng như lựa chọn lớp con phù hợp bằng phương thức gọi là factoryMethod trả về một đối tượng của lớp cha.
## b) Ví dụ:
   ![](https://images.viblo.asia/00a0405b-cdb4-41be-9785-a6926861e7d3.jpg)
   ```
   public abstract class Shape {
        protected int mSize;
        public abstract void draw();
    }
    ```
    
    ```
    public class Rectangle extends Shape {
        @Override
        public void draw() {
            System.out.println("Rectangle");
        }
    }
    
    ```
    public class Circle extends Shape {
        @Override
        public void draw() {
            System.out.println("Circle");
        }
    }
    ```
    
    ```
    public class Square extends Shape{
        @Override
        public void draw() {
            System.out.println("Square");
        }
    }
    ```
    ```
public class ShapeFactory {
    public Shape create(int shapeType) {
        switch (shapeType) {
            case CIRCLE:
                return new Circle();
            case RECTANGLE:
                return new Rectangle();
            case SQUARE:
                return new Square();
        }
        return null;
    }

    @IntDef({CIRCLE, RECTANGLE, SQUARE})
    @interface ShapeType {
        int CIRCLE = 0;
        int RECTANGLE = 1;
        int SQUARE = 2;
    }
}
```

# 3) Builder Pattern.
## a) Đặt vấn đề:
- Chúng ta hãy xét đối tượng sau:

`public class HotelModel {

    public String nameHotel;
    public String address;
    public String phone;
    public double kinhDo;
    public double viDo;
    public float danhGiaTB;
    public String gia;
    public List<String> images = new ArrayList<>();
    public List<ReviewModel> reviewModels;
    public boolean wifi;
    public boolean dieuHoa;
    public boolean nongLanh;
    public boolean thangMay;
    public boolean tivi;
    public boolean tulanh;
    public String key;

    public HotelModel() {
    }

    public HotelModel( String nameHotel, String address, String phone, double kinhDo, double viDo, float danhGiaTB, String gia, List<String> images, List<ReviewModel> reviewModels, boolean wifi, boolean dieuHoa, boolean nongLanh, boolean thangMay, boolean tivi, boolean tulanh) {

        this.nameHotel = nameHotel;
        this.address = address;
        this.phone = phone;
        this.kinhDo = kinhDo;
        this.viDo = viDo;
        this.danhGiaTB = danhGiaTB;
        this.gia = gia;
        this.images = images;
        this.reviewModels = reviewModels;
        this.wifi = wifi;
        this.dieuHoa = dieuHoa;
        this.nongLanh = nongLanh;
        this.thangMay = thangMay;
        this.tulanh = tulanh;
        this.tivi = tivi;
    }`
    
- Khi muốn khởi tạo đối tượng này, chúng ta khó có thể nhớ được thứ tự sắp xếp các tham số truyền vào, vừa code vừa phải "Ctrl+P" để xem tham số tiếp theo là gì. Hơn nữa, đối tượng có thể không cần truyền vào một vài tham số.
- Builder Pattern được tạo ra để giải quyết vấn đề này. Builder là mẫu thiết kế được tạo ra để chia công việc khởi tạo một đối tượng phức tạp thành khởi tạo các đối tượng ri ng rẽ để từ đó có thể tiến hành khởi tạo đối tượng trong các ngữ cảnh khác nhau.
- Hãy tưởng tượng việc tạo ra đối tượng giống như việc chúng ta tạo ra chiếc xe đạp. Đầu ti n là tạo ra khung xe, sau đó là bánh xe, xích, líp...Việc tạo ra các bộ phận này không nhất thiết phải đựơc thực hiện một cách đồng thời hay theo một trật tự nào cả và nó có thể được tạo ra một cách độc lập bởi nhiều người.
## b) Ví dụ:
- Chúng ta sẽ xét luôn đối tượng Hotel phía trên để xem khi được "khoác lên mình" Builder Pattern thì sẽ trông như thế nào.

```
public class Hotel {

    private String nameHotel;
    private String address;
    private String phone;
    private double kinhDo;
    private double viDo;
    private float danhGiaTB;
    private String gia;
    private List<String> images = new ArrayList<>();
    private boolean wifi;
    private boolean dieuHoa;
    private boolean nongLanh;
    private boolean thangMay;
    private boolean tivi;
    private boolean tulanh;

    public Hotel(Builder builder) {

        this.nameHotel = builder.nameHotel;
        this.address = builder.address;
        this.phone = builder.phone;
        this.kinhDo = builder.kinhDo;
        this.viDo = builder.viDo;
        this.danhGiaTB = builder.danhGiaTB;
        this.gia = builder.gia;
        this.images = builder.images;
        this.wifi = builder.wifi;
        this.dieuHoa = builder.dieuHoa;
        this.nongLanh = builder.nongLanh;
        this.thangMay = builder.thangMay;
        this.tivi = builder.tivi;
        this.tulanh = builder.tulanh;
    }

    public static class Builder {
        private String nameHotel;
        private String address;
        private String phone;
        private double kinhDo;
        private double viDo;
        private float danhGiaTB;
        private String gia;
        private List<String> images = new ArrayList<>();
        private boolean wifi;
        private boolean dieuHoa;
        private boolean nongLanh;
        private boolean thangMay;
        private boolean tivi;
        private boolean tulanh;

        public Builder setNameHotel(String nameHotel) {
            this.nameHotel = nameHotel;
            return this;
        }

        public Builder setAddress(String address) {
            this.address = address;
            return this;
        }

        public Builder setPhone(String phone) {
            this.phone = phone;
            return this;
        }

        public Builder setKinhDo(float kinhDo) {
            this.kinhDo = kinhDo;
            return this;
        }

        public Builder setViDo(float viDo) {
            this.viDo = viDo;
            return this;
        }

        public Builder setDanhGiaTB(int danhGiaTB) {
            this.danhGiaTB = danhGiaTB;
            return this;
        }

        public Builder setGia(String gia) {
            this.gia = gia;
            return this;
        }

        public Builder setImages(List<String> images) {
            this.images = images;
            return this;
        }

        public Builder setWifi(boolean wifi) {
            this.wifi = wifi;
            return this;
        }

        public Builder setDieuHoa(boolean dieuHoa) {
            this.dieuHoa = dieuHoa;
            return this;
        }

        public Builder setNongLanh(boolean nongLanh) {
            this.nongLanh = nongLanh;
            return this;
        }

        public Builder setThangMay(boolean thangMay) {
            this.thangMay = thangMay;
            return this;
        }

        public Builder setTivi(boolean tivi) {
            this.tivi = tivi;
            return this;
        }

        public Builder setTulanh(boolean tulanh) {
            this.tulanh = tulanh;
            return this;
        }

        public Hotel build() {
            return new Hotel(this);
        }
    }
}
```   

- Có vẻ nhìn dài hơn phải không? Nhưng khi khởi tạo đối tượng bạn không cần quan tâm đến thứ tự các tham số mà bạn cần truyền cho thuộc tính nào thì bạn sẽ set thuộc tính đó
```
Hotel hotel = new Hotel.Builder()
                .setNameHotel("Hi Hi")
                .setAddress("Hà Nội")
                .setDieuHoa(true)
                .setGia("1000000$")
                .build();
```

Trên đây mình đã giới thiệu Builder Pattern và Factory Pattern, Hi vọng qua bài viết này các bạn sẽ hiểu được Design Pattern là gì và hiểu được Factory và Builder Pattern để áp dụng chúng trong những tình huống cần thiết. 
# Tài liệu tham khảo.
https://www.tutorialspoint.com/design_pattern/builder_pattern
https://www.tutorialspoint.com/design_pattern/factory_pattern