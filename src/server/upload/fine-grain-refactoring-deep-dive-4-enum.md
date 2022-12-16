## 1. Issue
Cho đoạn code sau:
```
public enum DataActionEnum {

	CREATE(0, "create"),
	UPDATE(1, "update"),
	DELETE(2, "delete");

	private Integer id;

	private String name;

	DataActionEnum(Integer id, String name) {
		this.id = id;
		this.name = name;
	}

	public Integer getId() {return id;}

	public void setId(Integer id) {this.id = id;}

	public String getName() {return name;}

	public void setName(String name) {this.name = name;}
}
```

Thoạt nhìn thì trông có vẻ ổn, nhưng vấn đề ở đây là cách thiết kế này đã làm sai lệch mục đích ban đầu của `Enum`. Mà khoan đã, `Enum` là cái gì?
> Enum (**Enum**eration) là 1 dạng class (bạn xem mã bytecode thì sẽ rõ) với tập hợp số lượng nhất định các hằng số (**CONSTANT**)

Có nghĩa rằng giá trị của `Enum` sau khi được khởi tạo thì không được phép thay đổi tại runtime.

## Solution
Chúng ta sẽ viết lại đoạn code phía trên một cách đơn giản và xịn xò hơn với sự giúp sức của thư viện `lombok` như sau:
```
@Getter
@RequiredArgsConstructor
public enum DataActionEnum {

	CREATE(0, "create"),
	UPDATE(1, "update"),
	DELETE(2, "delete");

	private final Integer id;
	private final String name;
}
```

`Enum` field không phải là `constant` vì điều kiện để khai báo một `constant` trong `Java` phải đi kèm với keywords `static final`, tuy nhiên khi khai báo `static` thì phải initialize giá trị cho nó là điều mà chúng ta sẽ không làm ở đây. Thế nên ở đoạn code phía trên, chúng ta cố gắng tạo nên fake constant bằng việc loại bỏ `setter/mutator` ra khỏi enum và thêm từ khóa `final` vào tất cả các field.