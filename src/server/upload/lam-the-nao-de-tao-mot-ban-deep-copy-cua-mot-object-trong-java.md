Khi chúng ta muốn copy một object trong Java, có hai khả năng mà chúng ta có thể xem xét - shallow copy và deep copy.

Shallow copy là cách tiếp cận khi chúng ta chỉ sao chép các giá trị trường và do đó bản sao có thể phụ thuộc vào object gốc. Còn theo hướng deep copy thì đảm bảo rằng tất cả các object trong cây được sao chép sâu, vì vậy bản sao không phụ thuộc vào bất kỳ object hiện có nào trước đó(object đó có thể thay đổi).

Trong bài viết này, chúng ta sẽ so sánh hai phương pháp này và tìm hiểu bốn phương pháp để triển khai deep copy.

Chúng ta sẽ sử dụng 3 Maven dependencies — Gson, Jackson, and Apache Commons Lang và Junit + AssertJ— để kiểm tra các cách để triển khai deep copy.

Hãy tạo một maven project và đưa chúng vào file pom.xml như sau:

```
<dependency>
			<groupId>com.google.code.gson</groupId>
			<artifactId>gson</artifactId>
			<version>2.8.2</version>
		</dependency>
		<dependency>
			<groupId>commons-lang</groupId>
			<artifactId>commons-lang</artifactId>
			<version>2.6</version>
		</dependency>
		<dependency>
			<groupId>com.fasterxml.jackson.core</groupId>
			<artifactId>jackson-databind</artifactId>
			<version>2.9.3</version>
		</dependency>
		<dependency>
			<groupId>junit</groupId>
			<artifactId>junit</artifactId>
			<version>4.12</version>
			<scope>test</scope>
		</dependency>
        <dependency>
            <groupId>org.assertj</groupId>
            <artifactId>assertj-core</artifactId>
            <version>3.8.0</version>
            <scope>test</scope>
        </dependency>
```

Để so sánh sự khác biệt giữa các phương thức copy java object, chúng ta cần 2 class model như sau:

```
package com.vuta.deep.copy.test;

public class Address {
	private String street;
	private String city;
	private String country;

	public Address() {

	}

	public Address(String street, String city, String country) {
		this.street = street;
		this.city = city;
		this.country = country;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

}

```

```
package com.vuta.deep.copy.test;

public class User {
	private String firstName;
	private String lastName;
	private Address address;

	public User() {

	}

	public User(String firstName, String lastName, Address address) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.address = address;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

}

```

## Shallow Copy

Đối với shallow copy chúng ta chỉ copy các giá trị của các trường trong 1 object sang cho object khác.
Hãy tạo class AppTest như sau và run as unit test để thấy kết quả là đã pass test case

```
package com.vuta.deep.copy.test;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;

import com.vuta.deep.copy.test.Address;
import com.vuta.deep.copy.test.User;

public class AppTest {

	@Test
	public void whenShallowCopying_thenObjectsShouldNotBeSame() {

		Address address = new Address("Downing St 10", "London", "England");
		User pm = new User("Prime", "Minister", address);

		User shallowCopy = new User(pm.getFirstName(), pm.getLastName(), pm.getAddress());

		assertThat(shallowCopy).isNotSameAs(pm);
	}
}
```

Trong test case trên pm != shallowCopy, tức là chúng là các object khác nhau nhưng vấn đề là khi chúng ta thay đổi bất cứ giá trị thuộc tính nào của object address thì cũng sẽ ảnh hưởng đến address của bản copy. Hãy thêm test case sau vào class AppTest để thấy được việc đó

```
@Test
	public void whenModifyingOriginalObject_ThenCopyShouldChange() {
	  
	    Address address = new Address("Downing St 10", "London", "England");
	    User pm = new User("Prime", "Minister", address);
	    User shallowCopy = new User(
	      pm.getFirstName(), pm.getLastName(), pm.getAddress());
	 
	    address.setCountry("Great Britain");
	    assertThat(shallowCopy.getAddress().getCountry())
	      .isEqualTo(pm.getAddress().getCountry());
	}
```

## Deep copy

Deep copy là một giải pháp thay thế để giải quyết vấn đề kể trên. Lợi thế của nó là ít nhất mỗi đối tượng có thể thay đổi trong object graph sẽ được sao chép đệ quy.

Vì bản copy không phụ thuộc vào bất kỳ đối tượng có thể thay đổi nào được tạo trước đó, nên nó sẽ không bị sửa đổi một cách tình cờ như chúng ta đã thấy với shallow copy.

Trong các phần sau, chúng ta sẽ dùng một số triển khai deep copy và chứng minh lợi thế này.

### Copy Constructor

Hãy thêm các constructor sau đây vào Address và User class tương ứng

```
public Address(Address that) {
	    this(that.getStreet(), that.getCity(), that.getCountry());
	}
```

```
public User(User that) {
	    this(that.getFirstName(), that.getLastName(), new Address(that.getAddress()));
	}
```

và kiểm chứng bằng test case sau

```
@Test
	public void whenModifyingOriginalObject_thenCopyShouldNotChange() {
	    Address address = new Address("Downing St 10", "London", "England");
	    User pm = new User("Prime", "Minister", address);
	    User deepCopy = new User(pm);
	 
	    address.setCountry("Great Britain");
	    assertThat(pm.getAddress().getCountry())
	      .isNotEqualTo(deepCopy.getAddress().getCountry());
	}
```

### Cloneable Interface

Cách tiếp theo cúng ta có thể implement Cloneable interface để chỉ ra rằng object có thể được clone
Hãy chỉnh sửa các class Address và User như sau

```
package com.vuta.deep.copy.test;

public class Address implements Cloneable {
	...

	@Override
	public Object clone() {
	    try {
	        return (Address) super.clone();
	    } catch (CloneNotSupportedException e) {
	        return new Address(this.street, this.getCity(), this.getCountry());
	    }
	}
}

```

```
package com.vuta.deep.copy.test;

public class User implements Cloneable {
	...

	@Override
	public Object clone() {
	    User user = null;
	    try {
	        user = (User) super.clone();
	    } catch (CloneNotSupportedException e) {
	        user = new User(
	          this.getFirstName(), this.getLastName(), this.getAddress());
	    }
	    user.address = (Address) this.address.clone();
	    return user;
	}
}

```

Hãy kiểm chứng bằng test case sau

```
@Test
	public void whenModifyingOriginalObject_thenCloneCopyShouldNotChange() {
	    Address address = new Address("Downing St 10", "London", "England");
	    User pm = new User("Prime", "Minister", address);
	    User deepCopy = (User) pm.clone();
	 
	    address.setCountry("Great Britain");
	 
	    assertThat(deepCopy.getAddress().getCountry())
	      .isNotEqualTo(pm.getAddress().getCountry());
	}
```

### Sử dụng các thư viện khác

Apache Commons Lang: hãy implements Serializable cho Address và user rồi kiểm chứng bằng test case sau

```
@Test
	public void whenModifyingOriginalObject_thenCommonsCloneShouldNotChange() {
	    Address address = new Address("Downing St 10", "London", "England");
	    User pm = new User("Prime", "Minister", address);
	    User deepCopy = (User) SerializationUtils.clone(pm);
	 
	    address.setCountry("Great Britain");
	 
	    assertThat(deepCopy.getAddress().getCountry())
	      .isNotEqualTo(pm.getAddress().getCountry());
	}
```

Gson: đối với Gson thì không cần implements Serializable, 

```
@Test
	public void whenModifyingOriginalObject_thenGsonCloneShouldNotChange() {
	    Address address = new Address("Downing St 10", "London", "England");
	    User pm = new User("Prime", "Minister", address);
	    Gson gson = new Gson();
	    User deepCopy = gson.fromJson(gson.toJson(pm), User.class);
	 
	    address.setCountry("Great Britain");
	 
	    assertThat(deepCopy.getAddress().getCountry())
	      .isNotEqualTo(pm.getAddress().getCountry());
	}
```

JSON Serialization with Jackson:

```
@Test
	public void whenModifyingOriginalObject_thenJacksonCopyShouldNotChange() throws IOException {
	    Address address = new Address("Downing St 10", "London", "England");
	    User pm = new User("Prime", "Minister", address);
	    ObjectMapper objectMapper = new ObjectMapper();
	     
	    User deepCopy = objectMapper
	      .readValue(objectMapper.writeValueAsString(pm), User.class);
	 
	    address.setCountry("Great Britain");
	 
	    assertThat(deepCopy.getAddress().getCountry())
	      .isNotEqualTo(pm.getAddress().getCountry());
	}
```