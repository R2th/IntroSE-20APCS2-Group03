## 1. Chuẩn bị hành lý
Như chúng ta đã biết TypeScript (TS) được thiết kế hướng theo mô hình lập trình hướng đối tương (Object Oriented Programming - [OOP](https://vi.wikipedia.org/wiki/L%E1%BA%ADp_tr%C3%ACnh_h%C6%B0%E1%BB%9Bng_%C4%91%E1%BB%91i_t%C6%B0%E1%BB%A3ng)) - mô hình đang được sử dụng rộng rãi nhất hiện nay.

Khi nói đến OOP không thể không nhắc đến "4 tính chất" (*4 trạm dừng chân trong cuộc hành trình này*) mà bất kỳ lập trình viên nào cũng phải nắm rõ như là "*bí kíp tán gái =))*". Mặc dù được đưa vào môn học cơ bản trong trường đại học, nhưng mình đoán chắc không phải ai cũng có thể lĩnh hội được hết những sự tinh túy của nó (ít nhất là mình =))).

Với cuộc hành trình lần này, chúng ta sẽ trải qua 4 trạm dừng chân, và trạm đầu tiên đó là **Abstraction (tính trừu tượng)**

## 2. Khám phá trạm dừng chân đầu tiên - Tính trừu tượng (abstraction)

Nhắc đến abstraction hay trừu tượng có thể chúng ta sẽ liên tưởng ngay đến một thứ gì đó mơ hồ, không có thực. Nghe thôi đã thấy trừu tượng rồi phải không ạ =))?

Thực ra thì trong OOP tồn tại một lớp gọi là lớp trừu tượng (**abstract, interface**), nó hoàn toàn có thực.

`Tại sao nó lại là trừu tượng? Nó trừu tượng ở chỗ nào?`

> Nó trừu tượng ở chỗ là nó không thể dùng để khởi tạo một thể hiện (instance) thông qua từ khóa **new** như những lớp bình thường khác. Lớp trừu tượng này bạn có thể hiểu nó chỉ là một mộ khung ban đầu (base) để tạo ra các lớp con dẫn xuất của nó.

Thêm nữa, các bạn cũng nên đọc qua về khái niệm hàn lâm của nó, mới đầu thì có vẻ phức tạp nhưng đừng vì thế mà bỏ qua nhé. Cứ nghiền ngẫm một ngày nào đó bạn sẽ lĩnh hội được thôi (nguồn mình để ở phần đầu rồi đó). Cụ tỉ như sau:

> **Tính trừu tượng (abstraction)**: Đây là khả năng của chương trình bỏ qua hay không chú ý đến một số khía cạnh của thông tin mà nó đang trực tiếp làm việc lên, nghĩa là nó có khả năng tập trung vào những cốt lõi cần thiết. Mỗi đối tượng phục vụ như là một "động tử" có thể hoàn tất các công việc một cách nội bộ, báo cáo, thay đổi trạng thái của nó và liên lạc với các đối tượng khác mà không cần cho biết làm cách nào đối tượng tiến hành được các thao tác. Tính chất này thường được gọi là sự trừu tượng của dữ liệu.
>
> Tính trừu tượng còn thể hiện qua việc một đối tượng ban đầu có thể có một số đặc điểm chung cho nhiều đối tượng khác như là sự mở rộng của nó nhưng bản thân đối tượng ban đầu này có thể không có các biện pháp thi hành. Tính trừu tượng này thường được xác định trong khái niệm gọi là lớp trừu tượng hay lớp cơ sở trừu tượng.

Mình đọc xong cũng thấy "trừu tượng" luôn hè =)). Chúng ta hãy cùng xem đối với TypeScript sẽ khai báo một lớp trừu tượng như nào nhé!

## 3. Trừu tượng trong TypeScript
TypeScript sử dụng **Abstract class** và **Interface** (Tương tự như những ngôn ngữ lập trình khác) để thể hiện tính chất này.

Mặc dù OOP đã rất phổ biến nhưng hầu như các developer (đặc biệt dưới 1 năm kinh nghiệm) vẫn còn khá mơ hồ về việc phân biệt hai khái niệm Abstract class và Interface. Và đây cũng là điểm mà các nhà tuyển dụng sẽ khai thác trong các cuộc phỏng vấn.

Trước tiên, chúng ta hãy cùng xem TS khai báo một Abstract class và một Interface như nào nhé.

### 3.1 Abstract classes

Từ khóa để khai báo một lớp trừu tượng là "**abstract class**", đối với các phương thức muốn là trừu tượng thì sử dụng từ khóa  "**abstract**" trước tên hàm.

Ví dụ minh họa:

```
abstract class Avengers {
    readonly name: string;

    protected constructor(name: string) {
        this.name = name;
    }

    // Hàm này được triển khai ở lớp dẫn xuất
    abstract fight(): void;
}

class IronMan extends Avengers {
    // Constructor trong lớp dẫn xuất phải gọi super()
    constructor(name: string) {
        super(name);
    }

    fight(): void {
        console.log(`${this.name} is a super warrior`)
    }
 
    fly(): void {
        console.log(`${this.name} can fly`);
    }
}

// Có thể tạo một tham chiếu với kiểu dữ liệu là lớp trừu tượng
let ironMan: Avengers;

//Error: không thể tạo một thể hiện của lớp trừu tượng.
ironMan = new Avenger('Tony Stark');

//OK: Có thể tạo một thể hiện từ lớp dẫn xuất.
ironMan = new IronMan('Tony Stark');

ironMan.fight();

// Error: phương thức không tồn tại trong lớp trừu tượng (Avengers).
ironMan.fly();
```

Còn nếu bạn khởi tạo instance của lớp dẫn xuất thì sẽ như sau:

```
let ironMan: IronMan;
ironMan = new IronMan('Tony Stark');
ironMan.fight();
ironMan.fly();
```

### 3.2 Interface
Đúng như tên gọi của nó, từ khóa "**interface**" được dùng để khai báo một interface, các phương thức trong interface không thể định nghĩa code xử lý. Lớp thực thi có thể implement nhiều interface (*đa kế thừa*).

```
interface Avengers {
    readonly name: string;

    // Hàm này bắt buộc phải được triển khai ở lớp dẫn xuất
    fight(): void;
}

interface Power {
    // Hàm này bắt buộc phải được triển khai ở lớp dẫn xuất
    fly(): void;
}

class IronMan implements Avengers, Power {
    readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    fight(): void {
        console.log(`${this.name} is a super warrior`);
    }

    fly(): void {
        console.log(`${this.name} can fly`);
    }
}

// Có thể tạo một tham chiếu với kiểu dữ liệu là interface
let ironMan: Avengers;

//Error: Không thể tạo một thể hiện của interface
ironMan = new Avengers();

ironMan = new IronMan('Tony Stark');
ironMan.fight();

// Error: phương thức không tồn tại trong interface Avengers
ironMan.fly();
```

Cũng giống như Abstract, nếu bạn tạo instance của lớp dẫn xuất:

```
let ironMan: IronMan;
ironMan = new IronMan('Tony Stark');
ironMan.fight();
ironMan.fly();
```

Đến đây, chúng ta cũng đã nhìn ra một số sự khác biệt giữa **Abstract class** và **Interface** rồi đúng không. Sự khác nhau giữa chúng chính là mục đích sử dụng:

* **Abstract class**: là một class cha cho tất cả các class có **cùng bản chất** (cũng có thể hiểu là cùng họ, dòng tộc). Bản chất ở đây được hiểu là kiểu, loại, nhiệm vụ của class. Hai class cùng thực hiện một interface có thể hoàn toàn khác nhau về bản chất.
* **Interface**: là một **chức năng** mà chúng ta có thể thêm vào bất kỳ class nào (có thể hiểu interface dùng để thể hiện hành động của đổi tượng). Interface có thể bao gồm nhiều hàm/phương thức và tất cả chúng cùng phục vụ cho một chức năng.

Điểm lại *một số* đặc trưng của cả **Abstract class** và **Interface**:
| Interface |  Abstract class |
| -------- | -------- |
| Một class có thể thực thi nhiều interface (đa kế thừa)     | Không hỗ trợ đa kế thừa     |
| Chỉ có thể khai báo, không thể định nghĩa code trong method    | Có thể định nghĩa code trong method   |
| Mọi method, property mặc định là public     | Có thể chỉ định modifier (private, protected...)    |
| Interface không thể kế thừa Abstract class   |Abstract class có thể implement interface|

Tóm lại, việc khai báo một Abstract class hay một Interface thì đơn giản, nhưng mục đích thực sự của "trừu tượng" là gì?

### 3.3 Tại sao lại sử dụng "trừu tượng"? Khi nào thì dùng?
Lớp trừu tượng vẫn tồn tại, vẫn là một lớp thôi. Nhưng nó trừu tượng ở chỗ, nó không thể được dùng để tạo ra các đối tượng như những lớp bình thường khác. Lớp trừu tượng này chỉ là cái "xác không hồn", hay có thể hiểu nó là một bộ khung để từ đó tạo ra các lớp con dựa vào bộ khung này.

Mục đích đằng sau tính trừu tượng này là che dấu đi sự phức tạp của việc xử lý và chỉ hiển thị (cung cấp) những tính năng thiết yếu của đối tượng tới người dùng. Có vẻ khó hình dung nhỉ? Mình sẽ lấy một ví dụ như sau:

> Một ô tô hoạt động thì cần rất nhiều bộ phận cùng làm việc, nhưng tất cả những thông tin đó đều không cần thiết với người lái. Người lái chỉ cần quan tâm và sử dụng những công cụ như: chân ga, phanh, vô lăng... Các kỹ thuật phức tạp đều được ẩn khỏi trình điều khiển.

```
interface Power{
    fly(): void;

    fight(): void;
}

class IronMan implements Power {
    fight(): void {
    }

    fly(): void {
    }
}

let superMan: Power
superMan = new IronMan();
superMan.fly();
superMan.fight();
```

Dễ dàng nhận thấy rằng **superMan** được tham chiếu tới interface Avengers. Lúc này chúng ta không cần quan tâm superMan là Người Sắt hay là gì, chúng ta chỉ cần quan tâm tới interface Avengers có 2 phương thức là fly() và fight(). Mọi chuyện đã trở nên vô cùng đơn giản.

Trong thực tế, chúng ta có thể gặp tính trừu tượng ở đâu đó khi sử dụng các gói thư viện của bên thứ 3 (third-party). Khi implements hoặc extends các interface hoặc class của họ, bỗng dưng hệ thống báo rằng phải override lại một phương thức nào đó, thì chắc chắc đó là lớp trừu tượng.

## 4. Nghỉ ngơi thôi
Như vậy là chúng ta đã hiểu được 1 trong 4 vũ khí lợi hại mà OOP mang lại rồi. Nếu tìm hiểu sâu hơn nữa, chúng ta sẽ thấy tính trừu tượng được áp dụng rất nhiều trong Design Pattern.

Bài viết vẫn còn nhiều thiết sót, có phần nào mình chưa hiểu đúng các bạn hãy comment lại giúp mình nhá. Đợi khi hết dịch, đâu đó chúng ta có thể ngồi lại bên cốc nước nhiều bọt để cùng đàm đạo ạ.

Cũng khuya rồi, cuộc hành trình vẫn còn dài, chúng ta hãy nghỉ ngơi lấy lại sức nhé.

Cảm ơn các bạn đã đọc, hẹn các bạn ở trạm dừng chân tiếp theo nhé: **Trạm Encapsulation - tuyệt kỹ ẩn thân**.