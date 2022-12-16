1. Dùng các method static thay vì constructor để tạo object:
    - Các static method thì có tên, constructor không có tên, điều này giúp chúng ta biết rõ chức năng của nó
    - Static method luôn trả về object được tạo sẵn, không cần tạo mới object mỗi lần gọi như constructor
    - Static method có thể trả về kiểu dữ liệu là subtype của class thay vì phải trả đúng kiểu class như constructor. Như vậy kiểu trả về của static method không nhất thiết phải tồn tại. chúng ta có thể extend kiểu của class ra vào sau này
    - Hạn chế: 
        - Không subclass được các class không có public hoặc protected constructor
        - Khó để tìm thấy trong docs

2. Sử dụng builder design pattern khi constructor có nhiều params
    -Tại sao??
    
3. Nên sử dụng dependency injection thay vì cố định tham số
4. Tránh tạo các object không cần thiết:
    - Ví dụ: Không nên viết String a = new String("a"), hãy viết a = "a";
    - Không sử dụng String,match() vì mỗi lần gọi method nó đều tạo ra 1 object Pattern mới trước khi đi match. Thay vào đó hãy dùng pattern.match()
    - Sử dụng các kiểu nguyên tố thay cho object, ví dụ Long thay cho long