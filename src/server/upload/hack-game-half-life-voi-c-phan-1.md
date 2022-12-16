Bài viết này mình sẽ hướng dẫn hack máu và đạn trong game Half Life với ngôn ngữ lập trình C/C++.

Chú ý: Nên dùng Half Life 1.6 để test thử vì Half Life 1.6 cho chơi với windowed mode (chế độ cửa sổ) thay vì full screen.

Tải game Half Life 1.6 [tại đây](https://counter-strike.en.uptodown.com/windows).

[Video hướng dẫn chi tiết](https://www.youtube.com/watch?v=ITKeGncsxPc&feature=youtu.be) (nên xem video sau khi đã đọc xong bài viết này).

Kịch bản hack
Thử tưởng tượng bạn tạo ra 1 ứng dụng tính toán đơn giản như sau:
![](https://images.viblo.asia/1de5f3c6-9123-4e7c-a294-ede68902b6f7.png)

Bạn nhập `a = 5.`
Bằng 1 cách nào đó hacker biết được địa chỉ của biến `a` và thay `a = 15` trong khi bạn đang nhập b (khi bạn biết được địa chỉ của 1 biến, bạn sẽ thay đổi được giá trị của nó thông qua WinAPI).
Bạn nhập `b = 10.`
Lúc này chương trình của bạn sẽ in ra `"Tổng của a và b: 25"` thay vì in ra `"Tổng của a và b: 15".`

Tương tự với game Half Life nếu bạn có thể thay đổi được giá trị của các biến lưu trữ đạn, máu và tiền thì ... bạn đã hack thành công.
## 1. Hàm để thay đổi giá trị của 1 biến khi biết địa chỉ của biến đó.
Bên dưới là hàm mình đã viết sẵn:
```
template<class T>
void change(DWORD pid, LPVOID address, T value) {
    HANDLE process = OpenProcess(PROCESS_ALL_ACCESS, FALSE, pid);
    if (!process) {
        cout << "Couldn't open process" << endl;
        return;
    }
    if (!WriteProcessMemory(process, address, &value, sizeof(value), 0)) {
        cout << "Couldn't write process memory" << endl;
    }
}
```
Các tham số đầu vào:

pid là process id của game Half Life, có thể lấy process id của game Half Life bằng cách vào Task Manager -> Details và nhìn giá trị cột PID của game Half Life.
![](https://images.viblo.asia/e0817944-0ab4-43d0-9edd-47598baa0530.png)

`address` là địa chỉ của biến máu hoặc đạn (hướng dẫn cách lấy ở phần sau).

`newValue` là giá trị mới cho vùng nhớ.

Hàm `OpenProcess` và `WriteProcessMemory` là hai hàm nằm trong thư viện `Windows.h`. Thư viện này chứa các hàm để ứng dụng của bạn giao tiếp với hệ điều hành.

Sau khi đã có hàm thay đổi giá trị ô nhớ của game Half Life và process id, thứ duy nhất bạn thiếu bây giờ là địa chỉ của ô nhớ chứa giá trị máu và đạn.
## 2. Xác định địa chỉ của biến máu/đạn.
Khi mới vào game thì số đạn của bạn sẽ là 12/24 (tùy bên), bạn sẽ dựa vào số 12 này để tìm xem ô nhớ chứa biến đạn đang nằm ở đâu bằng cách:

Duyệt tất cả các ô nhớ và xem những ô nhớ nào có giá trị bằng 12 và lưu lại. Thường sẽ có rất nhiều ô nhớ có giá trị này.

Bắn 1 viên đạn và duyệt tất cả ô nhớ vừa lưu xem ô nhớ nào có giá trị 11 và lưu lại.

Tiếp tục thực hiện thao tác trên tới khi nào còn 1 ô nhớ hoặc số lượng ô nhớ không giảm xuống thì dừng.

Trong trường hợp chỉ còn 1 ô nhớ thì đó chính là địa chỉ của biến đạn.

Trong trường hợp còn nhiều hơn môt ô nhớ thì bạn phải thay đổi giá trị cho từng ô nhớ một và kiểm tra xem số lượng đạn trong game có thay đổi theo không, nếu có thì đó chính là ô nhớ cần lấy.

Nhiều bạn code C/C++ sẽ nghĩ ngay tới con trỏ để làm việc này, bằng cách cho con trỏ duyệt từ ô nhớ đầu tiên tới ô nhớ cuối cùng và kiểm tra xem tại ô nhớ nào có giá trị cần tìm. Nhưng mọi thứ không đơn giản như vậy khi ứng dụng của bạn chạy, hệ điều hành sẽ cấp cho nó một vùng nhớ ảo và con trỏ của bạn sẽ trỏ tới vùng nhớ ảo đó chứ không thể trỏ tới vùng nhớ ảo của ứng dụng khác.
![](https://images.viblo.asia/804ba09d-29e6-40ac-ae5d-6b4f48b1af0e.png)

Để đơn giản các bạn sẽ lấy địa chỉ của biến đạn và máu bằng cách tái hiện lại kịch bản trên với ứng dụng Cheat Engine. Cụ thể các bạn có thể xem trong [video](https://www.youtube.com/watch?v=ITKeGncsxPc&feature=youtu.be).

Lưu ý khi dùng Cheat Engine: có nhiều game không dùng biến gốc để hiển thị (biến gốc là biến dùng để tính toán) mà hiển thị biến có giá trị giống biến gốc dẫn tới bạn có thể lầm tưởng biến này là biến thật (khi thay đổi nó bạn sẽ nhận thấy trên màn hình còn khi thay đổi biến gốc thì không). Như trong video bạn nào để ý có thể thấy thực chất tôi chỉ hack máu thành công chứ hack đạn thì chưa thành công, do tôi hack biến dùng để hiển thị của lượng đạn dẫn tới việc nhìn thấy có 100 viên nhưng thực chất chỉ có 30 viên (lúc đầu hack thành công nhưng đây không phải là biến dùng để hiển thị nên tôi không nhận ra, muốn nhận ra phải bắn thử).
## 3. Hack không hết đạn và hồi máu liên tục.
Sau khi có được địa chỉ của 2 biến chương trình để hack game Half Life sẽ trông như sau:
```
#include<iostream>
#include<Windows.h>

using namespace std;

template<class T>

void change(DWORD pid, LPVOID address, T value) {
    HANDLE process = OpenProcess(PROCESS_ALL_ACCESS, FALSE, pid);
    if (!process) {
        cout << "Couldn't open process" << endl;
        return;
    }
    if (!WriteProcessMemory(process, address, &value, sizeof(value), 0)) {
        cout << "Couldn't write process memory" << endl;
    }
}
 
int main() {
    DWORD pid = 12716;
    LPVOID hp_address = (LPVOID)0x1033EC5C;
    LPVOID ammo_address = (LPVOID)0x09c9cb38;
    float hp = 255.0;
    int ammo = 100;
    while (true) {
        change(pid, hp_address, hp);
        change(pid, ammo_address, ammo);
        Sleep(50);
    }     
    return 0;
}
```
Giải thích: khi chạy chương trình này máu sẽ hồi lên 255 và đạn sẽ hồi lên 100 mỗi 0.05 giây.

`0x1033EC5C và 0x09c9cb38` là địa chỉ của biến máu và biến đạn mình lấy được bằng Cheat Engine, ở máy bạn sẽ khác nên bạn không thể dùng 2 giá trị này.

## 4. Phòng chống việc ứng dụng bị hack.
Là 1 người viết phần mềm chắc bạn sẽ không muốn ứng dụng của mình bị hack như trên. Rất tiếc là bạn không thể ngăn cản được hacker thay đổi các ô nhớ trong ứng dụng nhưng bạn có thể detect được sự thay đổi và restore lại dữ liệu chuẩn hoặc bạn có thể làm khó hacker bằng 1 số cách:

Không lưu giá trị của biến máu mà lưu giá trị sau khi đã nhân với 1 số thực nào đó, lúc này sẽ rất khó để hacker có thể mò được địa chỉ của biến.
Dùng nhiều biến để lưu cùng một thông tin => vừa kiểm tra được sự thay đổi bất thường, vừa có thể làm hacker rối khi thấy có quá nhiều ô nhớ có cùng 1 giá tri.
…
=> Làm khó hacker cũng giống việc làm khó mình nên thôi tốt nhất là với các ứng dụng 1 người dùng thì các bạn cho hack thoải còn còn đối với các ứng dụng nhiều người thì tốt nhất là không cho ai động vào server của bạn.

## 5. Kết
Ở phần này mình đã giới thiệu qua về cách một chương trình hack hoạt động nhưng vẫn còn phải dùng Cheat Engine làm thủ công ở rất nhiều bước, phần sau mình sẽ hướng dẫn tạo ra 1 chương trình hack có thể đem đi chạy ở nhiều máy. Rất mong nhận được những góp ý từ các bạn.