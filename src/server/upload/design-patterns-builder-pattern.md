Builder Pattern giúp chúng ta xây dựng một `object` phức tạp từ những `object` đơn giản qua từng bước. Builder Pattern được xếp vào nhóm các pattern Khởi .

Một `class Builder` luôn luôn xây dựng `object` thực thể cuối cùng qua từng bước. Bản thân `Builder` luôn luôn độc lập và không lệ thuộc vào các `object` khác.

## Áp dụng triển khai

![sơ đồ các class](https://images.viblo.asia/40fe26e2-b78b-4fc2-a0c2-e3608577be64.png)

- Chúng ta sẽ tạo  `01 abstract class Item` để biểu thị hàng hóa và các `class` để mô tả các thực thể.
- Giao diện `Packing` thể hiện cách đóng gói của sản phẩm.
- Sau đó, chúng ta tạo ra `01 class Meal` có chứa một mảng `Item`.
- Và tạo `01 class Builder` để thực hiện công việc tổ hợp nên các `object Meal` khác nhau bằng việc kết hợp các `Item`.
- Cuối cùng là code `main` sử dụng `Builder` để xây dựng một `Meal`.

Về mặt quản lý code, chúng ta sẽ có `01 package` có  tên là `mealbuilder`. Phần code client trên `main` sẽ chỉ cần tham chiếu tới `Builder` và `Meal` do đó sẽ chỉ có `02 class` này được mở `public`. Tất cả các thành phần còn lại của package sẽ đều được đặt `access modifier` là `default`.

### Bước 1

Tạo `abstract class Item` và `interface Packing`.

`mealbuilder/Item.java`
```java
package mealbuilder;

abstract class Item {
   private final String  name;
   private final float   price;
   private final Packing packing;

   Item(
      String  name,
      float   price,
      Packing packing
   ) {
      this.name    = name;
      this.price   = price;
      this.packing = packing;
   }

   public String getName() {
      return name;
   }

   public float getPrice() {
      return price;
   }

   public Packing getPacking() {
      return packing;
   }
}
```

`mealbuilder/Packing.java`
```java
package mealbuilder;

interface Packing {
   public String pack();
}
```

### Bước 2

Tạo các `class` triển khai của `Packing`.

`mealbuilder/Wrapper.java`
```java
package mealbuilder;

class Wrapper
implements Packing {
   @Override
   public String pack() {
      return "Wrapper";
   }
}
```

`mealbuilder/Bottle.java`
```java
package mealbuilder;

class Bottle
implements Packing {
   @Override
   public String pack() {
      return "Bottle";
   }
}
```

### Bước 3

Tạo các `class Burger` mở rộng `Item`.

`mealbuilder/Burger.java`
```java
package mealbuilder;

public abstract class Burger
extends Item {
   Burger(
      String  name,
      float   price,
      Packing packing
   ) {
      super(name, price, packing);
   }
}
```

`mealBuilder/BurgerForVeg.java`
```java
package mealbuilder;

class BurgerForVeg
extends Burger {
   BurgerForVeg() {
      super("Bugger for Veg", 25.0f, new Wrapper());
   }
}
```

`mealBuilder/BurgerNonVeg.java`
```java
package mealbuilder;

class BurgerNonVeg
extends Burger {
   BurgerNonVeg() {
      super("Burger non-Veg", 50.5f, new Wrapper());
   }
}
```

### Bước 4

Tạo các `class Drink` mở rộng `Item` tương tự như `Burger`.

`mealbuilder/Drink.java`
```java
package mealbuilder;

public abstract class Drink
extends Item {
   Drink(
      String  name,
      float   price,
      Packing packing
   ) {
      super(name, price, packing);
   }
}
```

`mealbuilder/DrinkCoke.java`
```java
package mealbuilder;

class DrinkCoke
extends Drink {
   DrinkCoke() {
      super("Coke", 30.0f, new Bottle());
   }
}
```

`mealbuilder/DrinkPepsi.java`
```java
package mealbuilder;

class DrinkPepsi
extends Drink {
   DrinkPepsi() {
      super("Pepsi", 35.0f, new Bottle());
   }
}
```

### Bước 5

Tạo `class Meal` chứa các `object Item`.

`mealbuilder/Meal.java`
```java
package mealbuilder;

import java.util.ArrayList;
import java.util.List;

public class Meal {
   private List<Item> itemList = new ArrayList<Item>();

   public void addItem(Item newItem) {
      itemList.add(newItem);
   }

   public float getCost() {
      float totalCost = 0.0f;
      for (Item i : itemList) { totalCost += i.getPrice(); }
      return totalCost;
   }

   public void showItems() {
      for (Item i : itemList) {
         System.out.println(i.getName());
         System.out.println("   + Packing: " + i.getPacking().pack());
         System.out.println("   + Price: " + i.getPrice());
      }
   }
}
```

### Bước 6

Tạo `class Builder` giúp xây dựng các `object Meal`.

`mealbuilder/Builder.java`
```java
package mealbuilder;

public class Builder {
   public Meal prepareMealForVeg() {
      Meal mealForVeg = new Meal();
      mealForVeg.addItem(new BurgerForVeg());
      mealForVeg.addItem(new DrinkCoke());
      return mealForVeg;
   }

   public Meal prepareMealNonVeg() {
      Meal mealNonVeg = new Meal();
      mealNonVeg.addItem(new BurgerNonVeg());
      mealNonVeg.addItem(new DrinkPepsi());
      return mealNonVeg;
   }
}
```

### Bước 7

Code `main` tại `PatternDemo` để chạy thử pattern.

`PatternDemo.java`
```java
import mealbuilder.Builder;
import mealbuilder.Meal;

public class PatternDemo {
   public static void main(String[] args) {
      Builder mealBuilder = new Builder();

      Meal mealForVeg = mealBuilder.prepareMealForVeg();
      System.out.println("=== Meal for Veg ========");
      mealForVeg.showItems();
      System.out.println("Total cost: " + mealForVeg.getCost());

      Meal mealNonVeg = mealBuilder.prepareMealNonVeg();
      System.out.println("=== Meal non-Veg ========");
      mealNonVeg.showItems();
      System.out.println("Total cost: " + mealNonVeg.getCost());
   }
}
```

### Bước 8

Kiểm chứng lại thông tin được in ra ở `console`.

`console`
```
=== Meal for Veg ========
Bugger for Veg
   + Packing: Wrapper
   + Price: 25.0
Coke
   + Packing: Bottle
   + Price: 30.0
Total cost: 55.0
=== Meal non-Veg ========
Burger non-Veg
   + Packing: Wrapper
   + Price: 50.5
Pepsi
   + Packing: Bottle
   + Price: 35.0
Total cost: 85.5
```