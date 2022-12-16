Nếu bạn là người đã dùng nhiều factory design pattern trong java, hẳn là bạn đã phát hiện một điều là chúng ta sử dụng một class Factory duy nhất. Class factory này sẽ tùy vào input được cung cấp mà trả về các class con khác nhau (bằng lệnh if-else hoặc switch).

Trong Abstract Factory Design Pattern, chúng ta không sử dụng các khối if-else mà sẽ tạo một factory class cho từng class con. Sau đó, Abstract Factory Design Pattern sẽ trả về class con dựa trên factory class đầu vào. Nghe có vẻ khó hiểu nhưng một khi xem implementation, bạn sẽ hiểu được ngay sự khác biệt giữa mô hình Factory và Abstract Factory.

Sau đây, chúng ta sẽ sử dụng cùng một class cha và class con giống trong bài ví dụ về Factory Design.

### Super Class và Subclass trong Abstract Factory Design Pattern
```
Computer.java
```
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

```
PC.java
```
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

```
Server.java
```
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

### Factory class cho mỗi subclass
Trước hết chúng ta cần tạo một Abstract Factory interface hoặc abstract class.
```
ComputerAbstractFactory.java
```
```

package com.journaldev.design.abstractfactory;

import com.journaldev.design.model.Computer;

public interface ComputerAbstractFactory {

	public Computer createComputer();

}
```
Lưu ý rằng phương thức createComputer() đang trả về một instance của superclass Computer. Bây giờ các factory class của chúng ta sẽ implement interface này và trả về subclass tương ứng.
```
PCFactory.java
```
```

package com.journaldev.design.abstractfactory;

import com.journaldev.design.model.Computer;
import com.journaldev.design.model.PC;

public class PCFactory implements ComputerAbstractFactory {

	private String ram;
	private String hdd;
	private String cpu;
	
	public PCFactory(String ram, String hdd, String cpu){
		this.ram=ram;
		this.hdd=hdd;
		this.cpu=cpu;
	}
	@Override
	public Computer createComputer() {
		return new PC(ram,hdd,cpu);
	}

}
```
Bây giờ chúng ta sẽ tạo một consumer class để cung cấp entry point cho các client class, để client class có thể tạo các subclass.
```
ComputerFactory.java
```
```

package com.journaldev.design.abstractfactory;

import com.journaldev.design.model.Computer;

public class ComputerFactory {

	public static Computer getComputer(ComputerAbstractFactory factory){
		return factory.createComputer();
	}
}
```
Lưu ý rằng bên trên là một class đơn giản và phương thức getComputer() đang chấp nhận arg ComputerAbstractFactory và trả về một object Computer. Đến đây thì có lẽ bạn đã hiểu rõ design pattern này sẽ phải implement thế nào rồi.

Bây giờ chúng ta sẽ viết một method đơn giản để test cách sử dụng abstract factory để lấy instance của các class con.
```
TestDesignPatterns.java
```
```
package com.journaldev.design.test;

import com.journaldev.design.abstractfactory.PCFactory;
import com.journaldev.design.abstractfactory.ServerFactory;
import com.journaldev.design.factory.ComputerFactory;
import com.journaldev.design.model.Computer;

public class TestDesignPatterns {

	public static void main(String[] args) {
		testAbstractFactory();
	}

	private static void testAbstractFactory() {
		Computer pc = com.journaldev.design.abstractfactory.ComputerFactory.getComputer(new PCFactory("2 GB","500 GB","2.4 GHz"));
		Computer server = com.journaldev.design.abstractfactory.ComputerFactory.getComputer(new ServerFactory("16 GB","1 TB","2.9 GHz"));
		System.out.println("AbstractFactory PC Config::"+pc);
		System.out.println("AbstractFactory Server Config::"+server);
	}
}
```
Output sẽ ra như sau:
```
AbstractFactory PC Config::RAM= 2 GB, HDD=500 GB, CPU=2.4 GHz
AbstractFactory Server Config::RAM= 16 GB, HDD=1 TB, CPU=2.9 GHz
```

### Ưu điểm của Abstract Factory Design
* Abstract Factory Design Pattern cung cấp cách tiếp cận "code for interface rather than implementation"
* Abstract Factory đóng vai trò như "factory" của "factory", và có thể dễ dàng mở rộng để chứa nhiều sản phẩm hơn, ví dụ chúng ta có thể thêm sub-class Laptop và một factory là LaptopFactory.
* Abstract Factory Design mạnh mẽ và tránh được logic if-else trong factory pattern

Nguồn: [JournalDev](https://www.journaldev.com/1418/abstract-factory-design-pattern-in-java)