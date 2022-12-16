Tự nhiên nay mình lại nhớ ra một vài cái misunderstanding to đùng trong cộng đồng CP từ rất lâu bởi các thầy và 1 đoạn code thần thánh - đọc ghi nhanh. Mà nói chung là về toàn bộ đọc ghi của C++ đi. Giờ cùng đem nó đi mổ xẻ xem mọi người đã sai ở đâu và tại sao nó vẫn được coi là đúng suốt thời gian qua.

### Hiểu nhầm số 1: I/O của C nhanh hơn C++
Ngày trước thầy mình có bảo là I/O của C nhanh hơn C++ vì `cin` dùng `template`, cấn cấn rồi nha, nếu là template thì nó cũng được tối ưu từ lúc dịch rồi, lúc chạy lên thì còn ảnh hưởng gì nữa. Và mình nhận ra, có vô vàn các bài viết cũng khẳng định I/O của C nhanh hơn C++. Vậy cái đó có phải sự thật? Chạy thử mới biết được.

Input: 1e7 int ~ 56.7MB

Code:
```cpp
#include <iostream>
#include <cstdio>
#include <fstream>
#include <cstdlib>
#include <chrono>

using namespace std;
using namespace std::chrono;

steady_clock::time_point tstart;
steady_clock::time_point tend;

void time_start() {
    tstart = std::chrono::steady_clock::now();
}

void time_end() {
    tend = std::chrono::steady_clock::now();
}

void time_elapsed() {
    cout << duration_cast<std::chrono::milliseconds>(tend - tstart).count() << "ms";
}

int main() {
    ios::sync_with_stdio(false);
    time_start();

    if (true) {
        FILE *fin = fopen("input.txt", "r");
        int v;

        while (fscanf(fin, "%d", &v) != EOF);

        fclose(fin);
    }

    time_end();

    cout << "C scanf: ";
    time_elapsed();
    cout << endl;

    time_start();

    if (true) {
        ifstream fin("input.txt");
        int v;

        while (fin >> v);
    }

    time_end();

    cout << "C++ input stream: ";
    time_elapsed();

    return 0;
}
```

> WSL2:\
C scanf: 515ms\
C++ input stream: 414ms\
Windows:\
C scanf: 4479ms\
C++ input stream: 1001ms

Trông có vẻ không giống như những gì mọi người nói lắm. Cái này thì dễ hiểu lắm, scanf phải parse input 2 lần (2 cái input), 1 lần cho format truyền vào, 1 lần cho dữ liệu thực, trong khi đó cin thì chỉ parse dữ liệu thực thôi. Nhưng như vậy tại sao mọi người vẫn thấy điều ngược lại trên các lần chấm thi? Cái này thì hồi sau sẽ rõ, còn về tinh thần thì có thể thấy scanf không thể nào nhanh hơn cin, đặc biệt với những format rắc rối hơn.

### Hiểu nhầm số 2: Fast IO thần thánh là cách đọc/ghi nhanh nhất
KHÔNG, dừng lại ngay, nó là cách chậm nhất có thể thì đúng hơn nếu như không hiểu bản chất vấn đề. Fast IO được nghĩ ra khi nào thì mình không biết, nhưng tinh thần của nó là đọc từng chữ một và phân tích trực tiếp giá trị mình quan tâm, loại bỏ những tính năng không dùng đến trong cả scanf và cin, từ đó tăng tốc độ đọc ghi. Nhưng liệu có phải không, cùng thử nhé.

Input: vẫn như vậy

Code:
```cpp
#include <iostream>
#include <cstdio>
#include <fstream>
#include <cstdlib>
#include <chrono>

using namespace std;
using namespace std::chrono;

steady_clock::time_point tstart;
steady_clock::time_point tend;

void time_start() {
    tstart = std::chrono::steady_clock::now();
}

void time_end() {
    tend = std::chrono::steady_clock::now();
}

void time_elapsed() {
    cout << duration_cast<std::chrono::milliseconds>(tend - tstart).count() << "ms";
}

int ReadInt()
{
    char ch;
    do ch = getchar();
    while (ch != '-' && ch != '+' && (ch < '0' || ch > '9'));
    int sign;
    ch == '-' ? sign = -1: sign = 1;
    int res = (ch >= '0' && ch <= '9') ? ch-'0' : 0;
    ch = getchar();
    while (ch >= '0' && ch <= '9')
        res = res * 10 + ch - '0',
                ch = getchar();
    return res * sign;
}

int main() {
    ios::sync_with_stdio(false);
    time_start();

    if (true) {
        freopen("input.txt", "r", stdin);
        int v;

        for (int i = 0; i < 10000000; i++)
            v = ReadInt();
    }

    fclose(stdin);
    time_end();

    cout << "Das \"Fast IO\": ";
    time_elapsed();
    cout << endl;

    time_start();

    if (true) {
        FILE *fin = fopen("input.txt", "r");
        int v;

        while (fscanf(fin, "%d", &v) != EOF);

        fclose(fin);
    }

    time_end();

    cout << "C scanf: ";
    time_elapsed();
    cout << endl;

    time_start();

    if (true) {
        ifstream fin("input.txt");
        int v;

        while (fin >> v);
    }

    time_end();

    cout << "C++ input stream: ";
    time_elapsed();

    return 0;
}
```

>WSL2:\
Das "Fast IO": 163ms\
C scanf: 519ms\
C++ input stream: 403ms\
Windows:\
Das "Fast IO": 1201ms\
C scanf: 4409ms\
C++ input stream: 956ms

Giờ mọi thứ bắt đầu trở nên kỳ cục này, trên WSL2, Fast IO cho ra performance ngon đấy, vượt trội so với những hàm built-in của C hay C++, nhưng trên Windows thì lại thua C++ cin. Tại sao, tại sao ta? Trước khi trả lời câu hỏi đấy thì ta chạy đoạn code này trên cả Windows và WSL2:

```cpp
#include <cstdio>

int main() {
    printf("%d", BUFSIZ);
}
```

Và kết quả nhận được:

| WSL2 | Windows |
|---------|---------------|
| 8192 | 512 |

BUFSIZ là 1 macro định nghĩa buffer size mặc định cho IO buffer. Thế buffer là gì và tại sao lại dùng buffer? Nhìn vào mô hình cơ bản máy tính trong sách giáo khoa, ta có bộ nhớ trong, bộ nhớ ngoài, CPU. Và tại sao ta cần bộ nhớ trong? Vì bộ nhớ ngoài tốc độ rất chậm, ta không thể sử dụng dữ liệu trực tiếp từ đấy được, ta cần phải lấy nó nhét vào bộ nhớ trong trước rồi xử dụng sau. Buffer mang ý nghĩa tương tự như vậy, thay vì đọc từng chữ trên 1 ổ đĩa rắn (hay thậm chí đĩa cứng) sẽ cho ra tốc độ cực kỳ chậm vì cơ chế của ổ cứng là nó đọc cả 1 vùng cơ, và mỗi lần yêu cầu nó đọc mới là nó phải đi tìm cái vùng đấy - cái này cực kỳ chậm so với thời gian thực sự đọc, bây giờ với buffer, ta sẽ đọc nguyên 1 lượng lớn data vào buffer trước rồi xử lý sau, như vậy sẽ bớt thời gian chờ đi tìm dữ liệu trên đĩa. Nếu để buffer cực bé thì Fast IO không thể nào nhanh được, nó sẽ phải đi tìm dữ liệu trên đĩa liên tục, cực kỳ tốn kém, nhưng nếu như có 1 buffer dư giả thì Fast IO cực nhanh vì loại bỏ được overhead của 2 phương pháp còn lại. Note: Nếu check buffer size của ifstream bằng ios::rdbuf::in_avail thì mặc định WSL2 sẽ đọc full file còn Windows dùng 4096 byte, cái này cũng lý giải được tại sao scanf khi đi thi nhanh hơn cin (rất có thể trình dịch của máy chấm đặt BUFSIZ cao hơn kích thước mặc định của ios::rdbuf).

> Thực tế khi đi thi hoặc là các bạn không cần đọc trực tiếp từ đĩa (những bài đọc từ stdin/stdout sẽ load trước input vào RAM), hoặc là họ để buffer size đủ lớn nên Fast IO cho ra tốc độ kinh khủng nhất. Tuy nhiên khi các bạn tiến vào thực chiến, đọc từng chữ là tạch đấy.

Vậy tổng kết lại, hiểu như nào cho đúng về đọc ghi: đọc ở chỗ nhanh hơn thì đọc nhanh hơn, bớt làm thứ linh tinh lại cũng sẽ đọc nhanh hơn. Ơ không có ghi à, quên đấy, nhưng mà ghi cũng thế nhưng tệ hơn nhiều.

Bonus code Fast IO khi được buffer 64MB 🐧:

```cpp
#include <iostream>
#include <cstdio>
#include <fstream>
#include <cstdlib>
#include <chrono>

using namespace std;
using namespace std::chrono;

steady_clock::time_point tstart;
steady_clock::time_point tend;

void time_start() {
    tstart = std::chrono::steady_clock::now();
}

void time_end() {
    tend = std::chrono::steady_clock::now();
}

void time_elapsed() {
    cout << duration_cast<std::chrono::milliseconds>(tend - tstart).count() << "ms";
}

int ReadInt()
{
    char ch;
    do ch = getchar();
    while (ch != '-' && ch != '+' && (ch < '0' || ch > '9'));
    int sign;
    ch == '-' ? sign = -1: sign = 1;
    int res = (ch >= '0' && ch <= '9') ? ch-'0' : 0;
    ch = getchar();
    while (ch >= '0' && ch <= '9')
        res = res * 10 + ch - '0',
                ch = getchar();
    return res * sign;
}

int BufferedReadInt(char *buffer, int &index) {
    char ch;
    do ch = buffer[index++];
    while (ch != '-' && ch != '+' && (ch < '0' || ch > '9'));
    int sign;
    ch == '-' ? sign = -1: sign = 1;
    int res = (ch >= '0' && ch <= '9') ? ch-'0' : 0;
    ch = buffer[index++];
    while (ch >= '0' && ch <= '9')
        res = res * 10 + ch - '0',
                ch = buffer[index++];
    return res * sign;
}

int main() {
    time_start();

    if (true) {
        freopen("input.txt", "r", stdin);
        int v;

        for (int i = 0; i < 10000000; i++)
            v = ReadInt();
    }

    fclose(stdin);
    time_end();

    cout << "Das \"Fast IO\": ";
    time_elapsed();
    cout << endl;

    time_start();

    if (true) {
        FILE *fin = fopen("input.txt", "r");
        int v, index = 0;
        char *buffer = new char[67108864];
        fgets(buffer, 67108864, fin);

        for (int i = 0; i < 10000000; i++)
            v = BufferedReadInt(buffer, index);
    }

    fclose(stdin);
    time_end();

    cout << "Better \"Fast IO\": ";
    time_elapsed();
    cout << endl;

    return 0;
}
```

>WSL2:\
Das "Fast IO": 160ms\
Better "Fast IO": 85ms\
Windows:\
Das "Fast IO": 1258ms\
Better "Fast IO": 313ms