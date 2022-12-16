# Giới thiệu
ObjectBox được thiết kế dành cho thiết bị di động. Nó là một cơ sở dữ liệu nhúng hướng đối tượng có khả năng thay thế đầy đủ cho SQLite. ObjectBox cũng rất thích hợp cho IoT.
ObjectBox được tối ưu hóa cho hiệu suất và được thiết kế để các nhà phát triển ứng dụng không phải xử lý SQL. Vì vậy lợi thế hiệu suất là khá ấn tượng so với SQLite.
![](https://images.viblo.asia/81a513a9-eb32-40d7-8e07-782e6fbd181f.png)
# Các tính năng vượt trội của ObjectBox
* **Superfast**: ObjectBox được xây dựng để mang lại hiệu suất tốt nhất có thể. ObjectBox làm tốt hơn hầu hết các cơ sở dữ liệu hiện có
* **Object API**:  Không có nhiều hàng, cột và SQL - ObjectBox là một cơ sở dữ liệu di động được xây dựng hướng đối tượng (không có ORM, không có SQLite). API súc tích rất dễ học và chỉ mất tốn vài dòng code so với việc sử dụng SQLite.
* **QueryBuilder**: WVới ObjectBox bạn chỉ cần truy vấn các đối tượng có kiểm tra tại compile time. Do đó, bạn không còn bị lỗi cú pháp gây ra sự cố khi runtime.
* **Object Relations**:  Các tham chiếu / mối quan hệ đối tượng là một kiểu được xây dựng sẵn; chúng là những tham chiếu tự nhiên.
* **Reactive**:  Phản ứng với những thay đổi dữ liệu một cách đơn giản và mạnh mẽ
* **Multiplatform**: ObjectBox đã hỗ trợ Android và Java thuần túy (Linux và Windows). MacOS và iOS là các nền tảng tiếp theo trên lộ trình.
* **Instant unit testing**: Với phương pháp tiếp cận đa nền tảng, bạn có thể chạy unit test đơn giản trên máy tính để bàn (không có Robolectric, không có thử nghiệm thiết bị) với cơ sở dữ liệu thực bằng mili giây.
* **Robust technology**:  Các thuộc tính ACID và Điều khiển đồng thời đa luồng (MVCC) cung cấp cho bạn các transaction an toàn và tính song song. ACID là viết tắt của: Atomic, Consitent, Isolated, Durable.
* **Simple threading**:  Các đối tượng được trả về bởi ObjectBox làm việc trong tất cả các luồng không có chuỗi đính kèm.
* **No manual schema migrations**:ObjectBox quản lý các phiên bản đối tượng mới có thuộc tính được thêm, xóa và đổi tên.
* **DaoCompat library**: Bạn đã sử dụng greenDAO chưa? Thư viện trợ giúp nhỏ này cung cấp cho bạn các API greenDAO quen thuộc cho ObjectBox.

# Bắt đầu với ObjectBox cho android
### 1. Thêm thư viện ObjectBox trong build.gradle
```
buildscript {
    ext.objectboxVersion = '1.5.0'
    repositories {
        google()
        jcenter()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.0.1'
        classpath "io.objectbox:objectbox-gradle-plugin:$objectboxVersion"


        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}
```

### 2.  Tạo model class và add thêm annotation @Entity
ObjectBox cần truy cập vào các thuộc tính của class, vì vậy bạn sẽ cần phải generate các phương thức setter và getter thích hợp. Ngoài ra, bạn có thể xóa private modifier để ObjectBox sẽ truy cập trực tiếp vào chúng.
```
package com.example.framgia.demoobjectbox.model;

import io.objectbox.annotation.Entity;
import io.objectbox.annotation.Id;

/**
 * Created by Duong on 07/05/2018.
 */

@Entity
public class Animal {
    @Id(assignable = true)
    private long id;

    private String name;

    private boolean flying;

    private boolean swimming;

    private boolean walking;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isFlying() {
        return flying;
    }

    public void setFlying(boolean flying) {
        this.flying = flying;
    }

    public boolean isSwimming() {
        return swimming;
    }

    public void setSwimming(boolean swimming) {
        this.swimming = swimming;
    }

    public boolean isWalking() {
        return walking;
    }

    public void setWalking(boolean walking) {
        this.walking = walking;
    }
}

```

### 3.  Khởi tạo cơ sở dữ liệu
Bây giờ bạn đã đã có class model tiếp theo bạn cần phải khởi tạo cơ sở dữ liệu. Bạn có thể thiết lập nó trong Application class hoặc thiết lập singleton của riêng bạn hoặc sử dụng nó với Dagger nếu bạn thích. Dưới đây mình sử dụng trực tiếp trong Application class
```
public class App extends Application {
    private static App sApp;
    private BoxStore mBoxStore;

    @Override
    public void onCreate() {
        super.onCreate();
        sApp = this;
        mBoxStore = MyObjectBox.builder().androidContext(App.this).build();
    }

    public static App getApp() {
        return sApp;
    }

    public BoxStore getBoxStore() {
        return mBoxStore;
    }
}

```
### 4.  Sử dụng
Bây giờ bạn đã có thể truy cập nó bằng cách sử dụng lớp BoxStore. Thay vì các bảng SQL điển hình, chúng có các boxes. Dưới đây là một số ví dụ về cách sử dụng boxes:

```
BoxStore boxStore = App.getApp().getBoxStore();
Box<Animal> animalBox = boxStore.boxFor(Animal.class);

// loads all animals
List<Animal> animals = animalBox.getAll();

// find a specific animal in the database
long myDogId = 12;
Animal myDog = animalBox.get(myDogId);

// insert an animal into the database
animalBox.put(newAnimal);

// update an animal
myDog.setSwimming(true);
animalBox.put(myDog);

//query for all the flying animals
List<Animal> flyingAnimals = animalBox.query().equal(Animal_.isFlying, true).build().find();

//delete all flying animals from the database
animalBox.remove(flyingAnimals);
```

Đây là những ví dụ đơn giản về các cách sử dụng cơ bản. Bạn cũng có thể thực hiện các truy vấn phức tạp hơn và không phải viết các câu lệnh SQL khó hiểu. ObjectBox tạo ra các truy vấn với nếu bạn thông thạo các API. Để tìm hiểu thêm về cách viết truy vấn, hãy xem document trên trang chủ nhé.
### 5. Relations
Giống như hầu hết các cơ sở dữ liệu khác, ObjectBox có hỗ trợ Relations giữa các class model. Nó có hỗ trợ  quan hệ một-một, một-nhiều và quan hệ nhiều-nhiều. Dưới đây là ví dụ về mối quan hệ một-nhiều như thế nào:
```
@Entity
public class Zoo {

    @Id
    private long id;


    // a Zoo can have many Animals
    @Backlink
    ToMany<Animal> animals;
  
    ...
}

@Entity
public class Animal {
    @Id(assignable = true)
    private long id;

    private String name;

    private boolean flying;

    private boolean swimming;

    private boolean walking;

    // an Animal belongs to one Zoo
    ToOne<Zoo> zoo;
  
    ...
}
```
# Cảm ơn các bạn đã theo giõi