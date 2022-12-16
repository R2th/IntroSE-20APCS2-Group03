## Design partern: Factory method

### 1. Định nghĩa
   - Factory method design partern gọi tắt là factory method là một design partern thuộc nhóm Creational Design Partern. Factory method có nhiệm vụ giúp chúng ta quản lý và trả về các đối tượng theo yêu cầu, giúp cho việc khởi tạo, quản lý các đối tượng một cách linh hoạt và dễ dàng.
   
   - Factory method giúp chúng ta tạo đối tượng mà không ảnh hương tới các đối tượng khác cũng như không để lộ logic của đối tượng đối với người dùng bằng cách sử dụng một interface chuung.
   
   - Factory method được sử dụng khi cần tạo ra nhiều đối tượng có những phương thức giống nhau (vd: mỗi loài động vật trong sở thú sẽ là kiểu đối tượng). Sẽ có một đối tượng khác để khởi tạo, quản lý, các đối tượng này (vd: nhân viên quản lý quản lý cá thể của mỗi loài động vật trong sở thú).
### 2. Đặt vấn đề

   Để hiểu rõ hơn về cách cài đặt và sử dụng của design partern factory method chúng ta hãy đến với một vd cụ thể:

   Quản lý các loài động vật trong sở thú:
   
   + Thông tin của mỗi cá thể động vật.
    
   + Nhân viên sở thú quản lý các cá thể của mỗi loài động vật.

   Chúng ta sẽ xử lý bài toán này bằng cách sử dụng factory method như sau:
   
   + Đầu tiên tạo ra một interface base class animal_base bao gồm những phương thức: getID(), character().
   + Tạo các class cụ thể sub_class các class này thừa kế từ base_class và triển khai các phương thức trên.
   + Tạo ra class nhân viên employee_zoon để quản lý.

   Với cách phát triển như này chúng ta sẽ dễ dàng tạo ra các đối tượng để quản lý mỗi các thể động vật dựa trên id và class định nghĩa chúng. Không những vậy khi có những loài động vật mới được đưa vào sở thú, ta cũng dễ dàng thêm class mới của loài động vật đó mà không hề ảnh hướng tới các class của những loài động vật trước đó.

### 3. Triển khai
- Đầu tiên chúng ta tạo ra một class base_animal (lớp base có thể là lớp trừu tượng hoặc một lớp bình thường, ở đây mình sử dụng lớp trừu tượng):
```c
class animal_base {
    public:
        virtual int getID() = 0;
        virtual void setCharacter(string character) = 0;
        virtual string character() = 0;
};
```

Tiếp theo là các class của các loài động vật như khỉ, sư tử, ...

```c
class monkey : public animal_base {
    private:
        int _ID;
        string _character;

    public:
    monkey(int id) {
        _ID = id;
    }
    int getID() {
        return _ID;
    }

    void setCharacter(string character) {
        _character = character;
    }

    string character() {
        return _character;
    }
};
```

```c
class lion : public animal_base {
    private:
        int _ID;
        string _character;

    public:
    lion(int id) {
        _ID = id;
    }
    int getID() {
        return _ID;
    }

    void setCharacter(string character) {
        _character = character;
    }

    string character() {
        return _character;
    }
};
```

Tiếp theo là 1 class nhân viên để khởi tạo và quản lý các đối tượng animal:
```c
class implement {
    private:
        int _ID;
    public:
        implement(int id) {
            _ID = id;
        }

        int getID() {
            return _ID;
        }

        animal_base* create_animal(int id) {
            switch (id)
            {
            case 1:
                return new monkey(id);
            case 2:
                return new lion(id);
            default:
                return nullptr;
            }
        }
};
```

- Như chúng ta thấy, khi employee muốn tạo ra một đối tượng để quản lý một cá thể thú mới, chỉ cần gọi phương thức create_animal() và cấp cho cá thể đó một ID để phân biệt với những cá thể cùng loài khác.
- Khi có một loài thú mới được đưa đến vườn thú, chỉ cần tạo thêm một class của loài thú đó và thêm case của class employee là đã xử lý xong các bước để quản lý. Và quan trọng hơn, việc này không làm ảnh hưởng tới các loài thú có sẵn trong vườn thú.

Dưới đây là một vd hoàn chỉnh:
```c
#include<iostream>

#define ID_MONKEY 1
#define ID_LION 2

using namespace std;

class animal_base {
    public:
        virtual int getID() = 0;
        virtual void setCharacter(string character) = 0;
        virtual string character() = 0;
};

class monkey : public animal_base {
    private:
        int _ID;
        string _character;

    public:
    monkey(int id) {
        _ID = id;
    }
    int getID() {
        return _ID;
    }

    void setCharacter(string character) {
        _character = character;
    }

    string character() {
        return _character;
    }
};

class lion : public animal_base {
    private:
        int _ID;
        string _character;

    public:
    lion(int id) {
        _ID = id;
    }
    int getID() {
        return _ID;
    }

    void setCharacter(string character) {
        _character = character;
    }

    string character() {
        return _character;
    }
};

class implement {
    private:
        int _ID;
    public:
        int getID() {
            return _ID;
        }

        implement(int id) {
            _ID = id;
        }

        animal_base* create_animal(int id) {
            switch (id)
            {
            case ID_MONKEY:
                return new monkey(id);
            case ID_LION:
                return new lion(id);
            default:
                return nullptr;
            }
        }
};

int main() {
    implement user(1);

    animal_base *monkey_1 = user.create_animal(ID_MONKEY);
    animal_base *lion_1 = user.create_animal(ID_LION);

    if (monkey_1 != nullptr) {
        monkey_1->setCharacter("Khi: long mao!");
    }
    if (lion_1 != nullptr) {
        lion_1->setCharacter("Su tu: co bom!");
    }
    
    cout << monkey_1->character() << endl;
    cout << lion_1->character() << endl;

    return 0;
}
```

Kết quả chạy chương trình:
```
Khi: long mao! --> lông mao
Su tu: co bom! --> có bờm
```

### 4. Khi nào cần sử dụng factory method design partern
   - Khi chúng ta không thể biết được đối tượng sẽ được khai báo là gì mà cần căn vào một điều kiện nào đó mà chúng ta cần trả về đối tượng tương ứng (có nhiều kiểu đối tượng như này được thừa kế từ một class cha). 
      
   - Sau này sẽ rất có thể chúng ta cần tạo ra những kiểu đối tượng khác nữa, khi đó chúng ta chỉ cần tạo một class và implement những method của class cha đã khai báo --> Việc mở rộng source code.
   

### 5. Ưu điểm
   - Factory method giúp giảm sự phụ thuộc giữa các module: cung cấp 1 hướng tiếp cận với interface thay gì các implement, giúp chương trình độc lập với những lớp cụ thể mà chúng ta cần tạo 1 đối tượng. Code ở phía client (trong vd trên tương đương với class employee) không bị ảnh hưởng khi thay đổi logic ở class cha hoặc class con.
   
   - Việc mở rộng code vô cùng dễ dàng, khi mở rộng chỉ việc ra các class con và implement các method.
   
   - Khởi tạo các object mà có thể che dấu đi phần xử lý logic bên trong mỗi class.
   
   - Giúp các developer có thể dễ dàng hiểu được cấu trúc source code.

Trên đây là bài viết của mình về design partern factory method, mình rất mong nhận được ý kiến đóng góp về bài viết này từ các bạn, các anh chị sau khi đọc bài. Để những bài viết sau được hay và hoàn thiện hơn. Mình xin chân thành cảm ơn!