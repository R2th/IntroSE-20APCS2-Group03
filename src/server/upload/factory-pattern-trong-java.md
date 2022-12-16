# Giới thiệu về Factory Design Pattern trong Java


## Factory Design Pattern
Factory Design Pattern được sử dụng khi chúng ta có một superclass có nhiều class con và cần phải trả về một trong các class con đó dựa trên một input nhất định. Design Pattern này giúp chúng ta khởi tạo class từ factory class thay vì khởi tạo trên chương trình bên client.

Trước tiên, chúng ta hãy tìm hiểu cách implement design pattern này trong java, và sau đó nêu ra các ưu điểm của nó. Design pattern này cũng được sử dụng trong  JDK. Design pattern này còn có tên gọi khác là **Factory Method Design Pattern**

## Factory Design Pattern Super Class
Super class trong factory design pattern có thể là một interface, một abstract class hoặc một class bình thường. Ví dụ trong đoạn code dưới đây, chúng ta có một abstract super class với phương thức override toString():
```
package com.journaldev.design.model;

public abstract class Computer {
	
	public abstract String getRAM();
	public abstract String getHDD();
	public abstract String getCPU();
	
	@Override
	public String toString(){
		return "RAM= "+this.getRAM()+", HDD="+this.getHDD()+", CPU="+this.getCPU();
	}
}
```

## Factory Design Pattern Sub Classes
Ví dụ chúng ta có 2 subclass là PC và Server được implement như sau:
```
package com.journaldev.design.model;

public class PC extends Computer {

	private String ram;
	private String hdd;
	private String cpu;
	
	public PC(String ram, String hdd, String cpu){
		this.ram=ram;
		this.hdd=hdd;
		this.cpu=cpu;
	}
	@Override
	public String getRAM() {
		return this.ram;
	}

	@Override
	public String getHDD() {
		return this.hdd;
	}

	@Override
	public String getCPU() {
		return this.cpu;
	}

}
```
Lưu ý là cả 2 class này đều extend superclass là Computer
```
package com.journaldev.design.model;

public class Server extends Computer {

	private String ram;
	private String hdd;
	private String cpu;
	
	public Server(String ram, String hdd, String cpu){
		this.ram=ram;
		this.hdd=hdd;
		this.cpu=cpu;
	}
	@Override
	public String getRAM() {
		return this.ram;
	}

	@Override
	public String getHDD() {
		return this.hdd;
	}

	@Override
	public String getCPU() {
		return this.cpu;
	}

}
```

## Factory Class
Sau khi đã viết xong các super class và sub-class, chúng ta có thể tạo factory class. Implementation đơn giản sẽ như sau:
```
package com.journaldev.design.factory;

import com.journaldev.design.model.Computer;
import com.journaldev.design.model.PC;
import com.journaldev.design.model.Server;

public class ComputerFactory {

	public static Computer getComputer(String type, String ram, String hdd, String cpu){
		if("PC".equalsIgnoreCase(type)) return new PC(ram, hdd, cpu);
		else if("Server".equalsIgnoreCase(type)) return new Server(ram, hdd, cpu);
		
		return null;
	}
}
```
Một số điểm quan trọng về design pattern này là:
1. Chúng ta có thể giữ Factory class dưới dạng Singleton, hoặc giữ phương thức trả về class con dưới dạng static.
2. Các class con khác nhau có thể được tạo và trả về, tùy vào phương thức đầu vào. getComputer() là factory method.

Dưới đây là một chương trình client đơn giản có sử dụng design pattern này
```
package com.journaldev.design.test;

import com.journaldev.design.factory.ComputerFactory;
import com.journaldev.design.model.Computer;

public class TestFactory {

	public static void main(String[] args) {
		Computer pc = ComputerFactory.getComputer("pc","2 GB","500 GB","2.4 GHz");
		Computer server = ComputerFactory.getComputer("server","16 GB","1 TB","2.9 GHz");
		System.out.println("Factory PC Config::"+pc);
		System.out.println("Factory Server Config::"+server);
	}

}
```

Output của chương trình trên:
```
Factory PC Config::RAM= 2 GB, HDD=500 GB, CPU=2.4 GHz
Factory Server Config::RAM= 16 GB, HDD=1 TB, CPU=2.9 GHz
```

## Ưu điểm của factory design pattern
1. Factory design pattern cung cấp cách làm theo nguyên tắc "Program to an interface, not an implementation"
2. Factory design pattern tác việc khởi tạo các implementation class thực tế ra khỏi máy client. Factory design pattern làm cho code mạnh hơn, ít bị coupled hơn và dễ dàng mở rộng hơn. Ví dụ, chúng ta có thể dễ dàng thay đổi implementation của class PC, vì nó không dính líu gì đến code bên client.
3. Factory design pattern cung cấp một lớp abstraction giữa implementation class và class bên client thông qua kế thừa.


## Ví dụ về việc sử dụng factory design pattern trong JDK
Các class java.util.Calendar, ResourceBundle and NumberFormat có method getInstance() sử dụng Factory pattern.
Phương thức valueOf() trong các warper class như Boolean, Integer, v.v...

Nguồn: [JournalDev](https://www.journaldev.com/1392/factory-design-pattern-in-java)