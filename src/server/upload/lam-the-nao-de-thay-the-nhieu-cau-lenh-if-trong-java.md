Cấu trúc quyết định là một phần quan trọng của bất kỳ ngôn ngữ lập trình nào. Nhưng việc có một số lượng lớn các câu lệnh If lồng nhau sẽ làm cho code của chúng ta phức tạp hơn và khó bảo trì hơn. Trong bài viết này, chúng ta sẽ cùng tìm hiểu một số cách để thay thế các câu lệnh if lồng nhau.

Hãy cùng lấy ví dụ đơn giản nhất, ví dụ về lớp Calculator. Chúng ta sẽ có một phương thức lấy hai số và một toán tử làm đầu vào và trả về kết quả dựa trên thao tác của toán tử đó:

```
public int calculate(int a, int b, String operator) {
        int result = Integer.MIN_VALUE;

        if ("add".equals(operator)) {
            result = a + b;
        } else if ("multiply".equals(operator)) {
            result = a * b;
        } else if ("divide".equals(operator)) {
            result = a / b;
        } else if ("subtract".equals(operator)) {
            result = a - b;
        }
        return result;
    }
```

Chúng ta cũng có thể implements sử dụng câu lệnh switch như sau

```
public int calculateUsingSwitch(int a, int b, String operator) {
        int result = 0;
        switch (operator) {
        case "add":
            result = a + b;
            break;
        case "multiply":
            result = a * b;
            break;
        case "divide":
            result = a / b;
            break;
        case "subtract":
            result = a - b;
            break;
        default:
            result = Integer.MIN_VALUE;
        }
        return result;
    }
```

Tuy nhiên các câu lệnh if có thể phát triển lớn hơn và phức tạp hơn. Ngoài ra, các câu lệnh switch cũng không phù hợp khi có điều kiện phức tạp.
Đồng thời việc có quá nhiều lệnh if lồng nhau sẽ khiến mọi việc trở nên rắc rối và khó để quản lý được. Ví dụ, nếu chúng ta cần thêm một toán tử mới, chúng ta phải thêm một câu lệnh if mới và thực hiện thao tác.

Vậy làm sao để chúng ta có thể tái cấu trúc nhỉ?

## 1. Factory Class

Hãy định nghĩa 1 interface Operation như sau
```
public interface Operation {
    int apply(int a, int b);
}
```

Tiếp đến cụ thể hóa từng operation
```
public class Addition implements Operation {
    @Override
    public int apply(int a, int b) {
        return a + b;
    }
}
```

```
public class Subtraction implements Operation {
    @Override 
    public int apply(int a, int b) {
            return a - b;
    }
}
```

```
public class Multiplication implements Operation {
    @Override 
    public int apply(int a, int b) {
            return a * b;
    }
}
```

```
public class Division implements Operation {
    @Override 
    public int apply(int a, int b) {
            return a / b;
    }
}
```

Tiếp theo hãy tạo factory class
```
public class OperatorFactory {

    static Map<String, Operation> operationMap = new HashMap<>();
    static {
        operationMap.put("add", new Addition());
        operationMap.put("divide", new Division());
        operationMap.put("multiply", new Multiplication());
        operationMap.put("subtract", new Subtraction());
    }

    public static Optional<Operation> getOperation(String operation) {
        return Optional.ofNullable(operationMap.get(operation));
    }
}
```

Và cuối cùng chúng ta có thể thực hiện tính toán như sau
```
public int calculateUsingFactory(int a, int b, String operator) {
    Operation targetOperation = OperatorFactory
      .getOperation(operator)
      .orElseThrow(() -> new IllegalArgumentException("Invalid Operator"));
    return targetOperation.apply(a, b);
}
```

## 2. Command Pattern

Chúng ta hãy tạo Command interface

```
public interface Command {
    Integer execute();
}
```

Và tạo các class implements Command interface

```
public class AddCommand implements Command {

    private int a;
    private int b;

    public AddCommand(int a, int b) {
        this.a = a;
        this.b = b;
    }

    @Override
    public Integer execute() {
        return a + b;
    }
}
```

```
public class SubCommand implements Command {

    private int a;
    private int b;

    public SubCommand(int a, int b) {
        this.a = a;
        this.b = b;
    }

    @Override
    public Integer execute() {
        return a - b;
    }
}
```

```
public class MulCommand implements Command {

    private int a;
    private int b;

    public MulCommand(int a, int b) {
        this.a = a;
        this.b = b;
    }

    @Override
    public Integer execute() {
        return a * b;
    }
}
```

```
public class DivCommand implements Command {

    private int a;
    private int b;

    public DivCommand(int a, int b) {
        this.a = a;
        this.b = b;
    }

    @Override
    public Integer execute() {
        return a / b;
    }
}
```

Phương thức tính toán chung cho tất cả các loại command
```
public int calculate(Command command) {
    return command.execute();
}
```

```
int addResult = calculator.calculate(new AddCommand(5, 10));
int subResult = calculator.calculate(new SubCommand(100, 10));
...
```

Trên đây chỉ là 2 trong rất nhiều cách thức để loại bỏ các khối if lồng nhau, hy vọng giúp ích phần nào cho các bạn.