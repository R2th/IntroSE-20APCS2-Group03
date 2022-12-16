# Tìm hiểu singleton pattern trong java
Singleton pattern thuộc nhóm creational  tức là pattern dành cho việc khởi tạo đối tượng.
 
Implements pattern này khá đơn giản về mặt code nhưng có một số vấn để cần lưu ý khi implement.

## 1. Singleton pattern được hiểu như thế nào ?




Pattern này hạn chế các instance của class cụ thể đây là một và chỉ một instance được tồn tại trong JVM. Có thể nói ví von răng Singleton class giống như hoàng đế thời phong kiến, một nước chỉ có một vua không thể có hai vua.

Singleton thường được sử dụng trong Logger, Configuration File, Cache, .. 

Một số singleton class trong java `java.lang.Runtime, java.awt.Desktop.
`

## 2. Các cách để viết singleton class.
 Một vài rule quan trọng: 
 
*      Contructor phải private
*      Sử dụng static keyword
*      Có một public static method để các class bên ngoài có thể làm việc với singleton class.

### Cách thứ nhất: Eager initialization
```
package designpattern.creational.singleton;

public class EagerInitialization {

	private static EagerInitialization instance = new EagerInitialization();
	
	private EagerInitialization() {
		
	}
	public static EagerInitialization getInstance() {
		return instance;
	}
}
```
Lưu ý: với cách này thì nếu class này **chưa được** hoặc **không sử dụng** thì object cũng đã được khởi tạo nên có thể gây lãng phí memory.
### Cách thứ hai: Dùng khổi static
```
package designpattern.creational.singleton;

public class StaticBlockInitialization {
	private static StaticBlockInitialization instance;
	static {
		try {
			instance = new StaticBlockInitialization();
		} catch (Exception e) {
			System.out.print("Exception occured in creating singleton instance");
		}
	}
	private StaticBlockInitialization() {
		
	}
	public static StaticBlockInitialization getInstance() {
		return instance;
	}
}
```
Lưu ý: Object sẽ được khởi tạo khi class được load.
### cách thứ 3: Lazy Initialization

```
package designpattern.creational.singleton;

public class LazyInitializationSingleton {

	private static LazyInitializationSingleton instance;
	private LazyInitializationSingleton() {
	}
	
	public static LazyInitializationSingleton getInstance() {
		if(instance == null) {
			instance = new LazyInitializationSingleton();
		}
		return instance;
	}
}
```
Lưu ý: Ở cách thực hiện này thì object sẽ đươc tạo ra khi getInstance() method được thực hiện lần đầu tiên.
### Cách thứ 4: Cách này dùng trong thread-safe
```
package designpattern.creational.singleton;

public class TheadSafeInitialization {
	private static TheadSafeInitialization instance;
	
	private TheadSafeInitialization() {
		
	}
	 public static synchronized TheadSafeInitialization getInstance() {
		 if(instance == null) {
			 instance  = new TheadSafeInitialization();
		 }
		 return instance;
	 }
}
```

Với các cách khởi tạo thứ 3 ta rõ ràng thấy rằng nếu có nhiều nhiều thread cùng đồng thời gọi method getInstance thì sẽ có nhiều Singleton object được tạo ra và phá với code của chúng ta. Vậy nên để tránh trường hợp trên trong khi chạy nhiều thread thì ta thêm synchronized keyword vào getInstance()
Các bạn có thể tìm hiểu về Đa luồng trong java.
### Cách thứ 5: Tối ưu cách 4.

```
package designpattern.creational.singleton;

public class TheadSafeInitialization {
	private static TheadSafeInitialization instance;

	private TheadSafeInitialization() {
		
	}
	 public static TheadSafeInitialization getInstance() {
		 if(instance == null) {
			 synchronized(TheadSafeInitialization.class) {
				 if(null == instance) {					 
					 instance  = new TheadSafeInitialization();
				 }
			 }
		 }
		 return instance;
	 }
}
```
Có bạn nào thử đặt ra câu hỏi cách này tối ưu hơn cách 4 ở điểm nào?
        Xem xét code kĩ một chút ta thấy ở cách này mình không dùng `synchronized`  ở `getInstance()` nữa mà mình dùng `synchronized(){   }`. Với chỉ một thay đổi nhỏ này sẽ có một sự thay đổi lớn trong khi chạy chương trình với lượng thread lớn.
        
Với cách 5 thì ta chỉ `synchronized` duy nhất một lần tại thời điểm gọi `getInstance()` lần đầu tiên, các gọi sau thì `instance` đã được khởi tao nên chương trình sẽ không thực hiện khối lệnh 

```
synchronized(TheadSafeInitialization.class) {
    if(null == instance) {
        instance  = new TheadSafeInitialization();
    }
}
  ``` 
  mà return lại giá trị của `instance` luôn
  
  
  # Bài viết của mình còn chưa nêu lên một số vấn đề khi reflection và serializable khi thực hiện với singleton.
  # Mong mọi người góp ý nếu thấy có vấn đề trong bài viết của mình.