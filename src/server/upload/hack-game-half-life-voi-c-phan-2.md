Ở bài viết trước mình đã giới thiệu về ý tưởng dùng để hack game và tạo ra 1 ứng dụng hack đơn giản. Vấn đề ở bài trước là mỗi lần vào game đều phải dùng Cheat Engine tìm địa chỉ của biến máu, đạn. Trong bài này mình sẽ hướng dẫn cách tạo ra một ứng dụng hack xịn hơn, có thể đem đi bất cứ đâu chạy.

Nếu bạn muốn dùng thử bản hack để kiểm chứng thì bạn có thể tải Half Life 1.6 tại đây và tải bản hack mình đã tạo ra tại đây với pass giải nén là codelearn.io

Lưu ý: vào game trước rồi mới bật hack.

Video hướng dẫn chi tiết cách hack tại đây.

## Dynamic address và static address.
Để đơn giản mình sẽ gọi biến có địa chỉ động là biến dynamic, biến có địa chỉ tĩnh là biến static.

Biến dynamic là biến mà địa chỉ của nó luôn thay đổi khi vào game, cụ thể là biến máu, do đó sử dụng biến dynamic để hack không phải là một ý tưởng tốt, bạn phải sử dụng Cheat Engine để tìm nó mỗi lần vào game.

Biến static là biến có địa chỉ luôn không thay đổi kể cả khi thoát game ra vào lại hay đem sang máy khác chạy, do đó nếu tìm được một biến con trỏ static trỏ tới biến máu thì bạn sẽ tạo ra được 1 ứng dụng hack có thể đem đi bất cứ đâu chạy.

Tới đây nhiều bạn nghĩ "ơ rõ ràng địa chỉ của các biến luôn khác nhau mỗi lần chạy mà", điều này là đúng nhưng mình sẽ giải thích vì sao mình nói địa chỉ biến static luôn không thay đổi sau.

Trong code thì biến static chính là các biến global hoặc là biến được khai báo với từ khóa static còn biến dynamic chính là các biến local (biến đặt trong hàm)...

Tóm lại mục tiêu của bài này sẽ là tìm biến static trỏ tới biến máu và thực hiện hack máu thông qua biến static này.

## Tìm biến static trỏ tới biến máu.
Tìm địa chỉ của biến máu (giống trong bài trước trước mình đã làm).

Tìm những biến đang trỏ tới biến máu.

Vấn đề gặp phải là trong các biến vừa tìm được có cả biến dynamic (con trỏ được khai báo trong hàm) và biến không phải lúc nào cũng trỏ tới biến máu (bạn chỉ ngẫu nhiên dò được nó lúc nó đang trỏ tới biến máu). Do đó bạn cần loại bỏ những biến không mong muốn này:

Loại bỏ biến dynamic bằng cách thoát game ra vào lại, sau đó kiểm tra xem biến nào không trỏ tới biến máu nữa thì bỏ biến đó đi.
Để loại bỏ những con trỏ không phải lúc nào cũng trỏ tới biến máu thì bạn có thể chơi và quan sát xem nó có luôn trỏ tới biến máu không. Bạn nên chơi trên nhiều chế độ chơi để chắc chắn hơn (thử bắn với bot, thử đổi từ cướp sang cảnh sát...).
**Thực hiện tìm biến static bằng Cheat Engine (các bạn có thể xem trong video):**
Tìm địa chỉ của biến máu (giống trong bài trước).

Chuột phải vào địa chỉ biến máu và chọn Pointer scan for this address như trong hình.
![](https://images.viblo.asia/34370189-db2f-45ba-a5ab-e1648872f46d.png)
Một cửa sổ mới hiện ra, đây là cửa sổ giúp bạn tìm xem những con trỏ nào đang trỏ tới biến máu. Trong cửa sổ này để max level = 1 và bấm ok (max level = 1 tương đương với tìm những con trỏ trỏ trực tiếp tới ô nhớ chứa biến máu, mình đã thử và thấy tìm với max level cao hơn là không cần thiết).
![](https://images.viblo.asia/067f7022-a926-480e-b6ff-0235157f4280.png)
Sau khi bấm ok sẽ có 1 cửa sổ mới hiện lên bắt save thì các bạn có thể save vào bất cứ đâu và đây là kết quả sau khi đã chạy xong.
![](https://images.viblo.asia/0632fcc3-f6a5-460e-b4d2-e3bb2b5cce3d.png)
Có thể thấy có 5 con trỏ đang trỏ tới biến máu (không phải lúc nào cũng có 5 con trỏ trỏ tới biến máu). Cột base address chính là cột mà lưu địa chỉ của biến static, các bạn sẽ thấy nó có dạng "hw.dll" + 1 con số dạng hex. Nếu đó là biến static cần tìm thì con số dạng hex này sẽ giống nhau ở tất cả các lần chạy và ở tất các máy khác nhau. Do đó địa chỉ biến static sẽ luôn không thay đổi so với 1 base address nào đó nên lúc đầu mình nói địa chỉ biến static luôn không thay đổi. Base address trong trường hợp này chính là địa địa chỉ của module "hw.dll", các bạn hoàn toàn có thể gọi hàm để lấy được địa chỉ của module này.
Giờ ta cần loại những biến dynamic và biến static không phải lúc nào nào cũng trỏ tới biến máu bằng cách lưu lại 5 địa chỉ này vào phần address list và quan sát + khởi động lại game (cụ thể bạn có thể xem trong video).
Cuối cùng tôi có được địa chỉ biến static.
![](https://images.viblo.asia/bc328fa2-68ca-4613-bc73-8ec99726c8d5.png)
Địa chỉ biến static cần lấy là là "hw.dll" + 0x00809820.
Địa chỉ này sẽ trỏ tới địa chỉ 0x10330758. Lưu ý 0x10330758 không phải là địa chỉ của biến máu, địa chỉ biến máu sẽ luôn bằng địa chỉ mà biến static trỏ tới (0x10330758) + 0x504. Để hiểu được son số 0x504 các bạn có thể xem đoạn code sau:
![](https://images.viblo.asia/5560a85d-4b76-4a29-96d9-21b83b078d54.png)
Biến static vừa tìm được chính là biến con trỏ p1, con trỏ p1 này không trỏ trực tiếp tới biến máu mà trỏ tới vùng nhớ heap nơi lưu thông tin về player. Địa chỉ biến máu sẽ cách vùng nhớ nơi p1 đang trỏ tới 1 hằng số gọi là offset. Trong đoạn code trên offset sẽ là 0x08 còn offset trong game Half Life mình vừa tìm được là 0x504.
Vậy health_address = p1 + 0x504.
=> Xóa Cheat Engine đi được rồi :)).
Tới đây bạn có thể thấy biến static p1 không trỏ trực tiếp tới biến máu mà trỏ tới ô nhớ nơi chứa biến máu. Bên trên mình nói tìm những biến static trỏ tới biến máu chỉ để cho bạn dễ hình dung chứ nói vậy chưa được chuẩn lắm.
Xem source code để hiểu rõ hơn (nếu source này báo lỗi ở máy bạn thì có thể sử dụng source khác [tại đây:](http://cpp.sh/5ucap) )
```
#include <Windows.h>
#include <iostream>
#include <vector>
#include <TlHelp32.h>
#include <tchar.h>

using namespace std;


// Hàm lấy địa chỉ của module "hw.dll"
DWORD getModuleBaseAddress(TCHAR* moduleName, DWORD pid) {
    DWORD moduleBaseAddress = 0;
    HANDLE hSnap = CreateToolhelp32Snapshot(TH32CS_SNAPMODULE | TH32CS_SNAPMODULE32, pid);
    MODULEENTRY32 modEntry;
    modEntry.dwSize = sizeof(MODULEENTRY32);

    if (Module32First(hSnap, &modEntry))
    {
        do {
            if (_tcscmp(modEntry.szModule, moduleName) == 0)
            {
                moduleBaseAddress = (DWORD)modEntry.modBaseAddr;
                break;
            }
        } while (Module32Next(hSnap, &modEntry));


    }
    CloseHandle(hSnap);
    return moduleBaseAddress;
}

int main() {    
    // Lấy process id thay vì phải làm thủ công như lần trước
    DWORD pid;
    HWND hGameWindow = FindWindow(NULL, "Counter-Strike");
    GetWindowThreadProcessId(hGameWindow, &pid);
    HANDLE pHandle = OpenProcess(PROCESS_ALL_ACCESS, FALSE, pid);

    // Tính địa chỉ của biến máu
    DWORD baseAddress;
    char moduleName[] = "hw.dll";
    DWORD moduleAddress = getModuleBaseAddress(moduleName, pid);
    // 0x00809820 chính là offset tìm được bằng Cheat Engine
    if (!ReadProcessMemory(pHandle, (LPVOID)(moduleAddress + 0x00809820), &baseAddress, sizeof(baseAddress), NULL)) {
        cout << "Couldn't read process memory";
        return -1;
    }
    // 0x504 chính là offset tìm được bằng Cheat Engine
    DWORD healthAddress = baseAddress + 0x504;

    cout << "Static address:" << (moduleAddress + 0x00809820) << endl;
    cout << "Base address:" << baseAddress << endl;
    cout <<"Health address: " << healthAddress << endl;

    float newHealth = 100000;
    while (true) {
        if (!WriteProcessMemory(pHandle, (LPVOID)(healthAddress), &newHealth, sizeof(newHealth), 0)) {
            cout << "Couldn't write process memory"<<endl;
        }
        Sleep(500);
    }
}
```
Code này có 1 số hàm mới so với bài trước:

getModuleBaseAddress là hàm lấy địa chỉ module "hw.dll".

FindWindow và GetWindowThreadProcessId là hai hàm dùng để lấy process id.

ReadProcessMemory là hàm lấy địa chỉ mà biến static đang trỏ tới (tổng quát hơn thì hàm này là hàm lấy giá trị của 1 ô nhớ).

Vào game và chạy thử đoạn code này, nếu không báo lỗi gì thì các bạn đã hack thành công.

## Kết.
Có thể thấy việc tạo ra biến global và static làm cho ứng dụng của bạn bị hack thường xuyên hơn nhưng nếu bạn chỉ dùng các biến local thì việc tạo nên ứng dụng sẽ khó hơn.

Rất mong nhận được những góp ý từ các bạn.
Nguồn bài viết: 
Phần 1: https://codelearn.io/blog/view/hack-game-half-life-voi-c
Phần 2: https://codelearn.io/blog/view/phan-2-hack-game-half-life-voi-c