## I. Mở đầu

Chúng ta đã biết về một số thuật toán sắp xếp quen thuộc như **Bubble sort (sắp xếp nổi bọt), Quick sort (sắp xếp nhanh), Heap sort (sắp xếp vun đống), Counting sort (sắp xếp đếm phân phối)**, ... Ngoài những thuộc toán trên, chúng ta có có một vài giải thuật sắp xếp ít "quen thuộc" hơn, có lẽ sẽ có nhiều bạn còn khá lạ lẫm với chúng. Chúng lần lượt là:

- **Insertion Sort - sắp xếp chèn**
- **Selection Sort - sắp xếp chọn**
- **Merge Sort - sắp xếp trộn**

Tuy nhiên, mỗi cách sắp xếp sẽ có ưu và nhược điểm riêng của chúng, tiếp nạp thêm một công cụ mới, học được một cách tư duy mới sẽ góp phần làm phong phú và tăng thêm khả năng đột phá trong suy nghĩ của bạn trước từng vấn đề. Hãy cùng **Viblo** tìm tòi, khám phá những cách sắp xếp này có gì đặc biệt không nhé!

## II. Insertion Sort - sắp xếp chèn
### 1. Ví dụ về Insertion Sort - Sắp xếp chèn

Tưởng tượng rằng bạn đang đóng vai trò là người chơi trong một trò chơi với các lá bài có giá trị từ **1** đến **10**: Mỗi khi bạn bốc một quân bài thì bạn cần sắp xếp chúng trên tay theo thứ tự tăng dần từ trái qua phải. Cùng **Viblo** phân tích quá trình sắp xếp của bạn như sau:

Xét tại thời điểm bạn bắt đầu bốc quân bài đầu tiên: bạn chỉ có một quân bài và đương nhiên nó đã là thứ tự tăng dần sẵn. Tiếp theo lá bài thứ hai, bạn cần so sánh giá trị của nó với lá bài thứ nhất rồi **chèn** nó vào vị trí cụ thể (bên trái hoặc bên phải lá bài thứ nhất). Đến lá bài thứ ba, đương nhiên chúng ta sẽ cần so sánh nó với giá trị của hai lá bài trước kia rồi mới thực hiện **chèn** nó vào đúng vị trí của nó (Có thể ở vị trí đầu tiên, ở giữa hai lá bài trước, hoặc ở cuối cùng), ...

Như vậy, tại thời điểm bất kì, bạn luôn có một nhóm lá bài đã được thực hiện sắp xếp đúng theo thứ tự tăng dần từ trước, sau đó bạn có một lá bài mới và cần so sánh giá trị của nó với giá trị các lá bài cũ rồi thực hiện thao tác **chèn** lá bài mới vào vị trí đúng của nó trong dãy. Việc thực hiện so sánh giá trị có hai cách:

- Thực hiện so sánh từ trái sang phải (thứ tự các lá bài đang tăng dần), đến khi gặp lá bài có giá trị lớn hơn lá bài mới chúng ta sẽ dừng lại và **chèn** lá bài mới vào vị trí bên trái của lá bài có giá trị lớn hơn nó.
- Thực hiện so sánh từ phải sang trái (thứ tự các lá bài đang giảm dần), đến khi gặp lá bài có giá trị nhỏ hơn lá bài mới chúng ta sẽ dừng lại và **chèn** lá bài mới vào vị trí bên phải của lá bài có giá trị nhỏ hơn nó.

Thật bất ngờ phải không, chính trong cuộc sống hằng ngày thì rất nhiều việc chúng ta thực hiện chính là thao tác của thuật toán **Insertion Sort - sắp xếp chèn**. Để hiểu rõ hơn về thuật toán này, chúng ta có thể xem xét với các con số cụ thể. Giả sử chúng ta đã biết trước các quân bài bạn sẽ bốc được là dãy **4, 3, 1, 5, 7, 9, 6, 2**, kí hiệu màu xanh là các quân bài đã sắp xếp xong, màu cam chỉ các quân bài bạn vừa bốc được và cần **chèn** vào các lá bài trước. Chúng ta có sơ đồ cơ bản về thuật toán trên như sau:

![](https://i.imgur.com/AsfbECH.png)


### 2. Cài đặt thuật toán

- Ngôn ngữ **C++**

```cpp
void Insertion_sort(int a[], int n) {
	int index, new_number;
	for (int i = 1; i < n; i++){
		index = i;
		new_number = a[i];
		while (index > 0 && a[index - 1] > new_number){
			a[index] = a[index - 1];
			index--;
		}
		a[index] = new_number;
	}
}
```

Trong cách cài đặt trên chúng ta lựa chọn cách so sánh các phần tử theo thứ tự từ phải qua trái, tức là đến khi nào gặp giá trị **a[i]** nhỏ hơn giá trị của "quân bài mới" - **new_number** thì dừng lại.

### 3. Độ phức tạp thời gian - Đặc điểm của Insertion Sort

Giải thuật **Sắp xếp chèn** khá là cơ bản và dễ hiểu nên chắc hẳn bạn cũng đã tìm ra được độ phức tạp thời gian rồi nhỉ. Trong trường hợp tốt nhất (các phần tử ban đầu đã được sắp xếp đúng thứ tự) thì độ phức tạp thời gian là $O(n)$. Tuy nhiên, nếu bạn đang trải qua một ngày thực sự đen đủi, bạn sẽ có thể gặp phải trường hợp hoàn toàn ngược lại, đó là khi chúng ta cần sắp xếp các phần tử theo thứ tự tăng dần, tuy nhiên vị trí gốc của chúng lại là thứ tự giảm dần! Rồi đó, thực sự nếu sử dụng **Insertion Sort** sẽ là một cơn ác mộng, vì chúng ta cần chiến đấu với độ phức tạp thời gian $O(n^2)$.

Một vài ưu điểm của **Sắp xếp chèn** có thể kể đến như:

- Thao tác thực hiện đơn giản, dễ hiểu.
- Thể hiện sự hiệu quả cao đối với các số liệu nhỏ.
- Tại các tình huống thực tế, **Insertion Sort** tỏ ra hiệu quả hơn so với các thuật toán có độ phức tạp $O(n^2)$ khác (ví dụ **Bubble sort**).
- Rất phù hợp đối với các số liệu đã được sắp xếp theo thứ tự sẵn.
- Tính ổn định, không làm thay đổi nhiều thứ tự các nguyên tố gốc.
- Cách sắp xếp có tính phương pháp, tuân theo nguyên tắc cụ thể, dễ nhớ và sử dụng.

Cũng bởi vì độ phức tạp thời gian trung bình là $O(n^2)$, nên **Insertion Sort** không phù hợp với những số liệu lớn. Tuy nhiên, chúng ta có thể vận dụng linh hoạt nó trong các tình huống cụ thể, có thể sử dụng trong một số bộ phẩn nhỏ phần tử cần sắp xếp chẳng hạn. Một điều ngoài lề cho các bạn: Trong hàm **Sort** của thư viện **STL-C++**, khi các số liệu trở nên nhỏ hơn đến một mức độ nào đó, tự chính hàm **Sort** sẽ đổi sang cách sắp xếp **Insertion Sort**, điều này cũng phụ thuộc vào từng phần mềm lập trình cũng như tình trạng thiết bị cụ thể.

## III. Selection Sort - Sắp xếp chọn
### 1. Ví dụ về Selection Sort - Sắp xếp chọn

Vẫn là ví dụ bốc bài ở phần trên, tuy nhiên lần này chúng ta sẽ sửa đổi luật chơi một chút: Thay vì bốc từng quân bài và sắp xếp sau mỗi lần bốc, chúng ta sẽ bốc một lượt tất cả các quân bài. Cách sắp xếp lần này chúng ta sẽ thực hiện như sau: Chúng ta sẽ thực hiện **n** lần sắp xếp, lượt thứ **i** sẽ tìm ra quân bài đúng tại vị trí **i**.

Tại lần thứ nhất, tìm ra quân bài có giá trị nhỏ nhất tại tất cả quân bài, thực hiện đổi chỗ quân bài này với quân bài ở vị trí **1** (nếu chính quân bài ở vị trí **1** có giá trị nhỏ nhất sẽ không cần đổi chỗ). Như vậy chúng ta có được vị trí **1** là quân bài chính xác (quân bài nhỏ nhất). Bỏ qua quân bài đầu tiên, tại lượt thứ hai, tiếp tục tìm kiếm quân bài có giá trị nhỏ nhất trong các quân bài từ vị trí **2** đến quân bài cuối cùng, thực hiện đổi chỗ nó với quân bài ở vị trí thứ hai. Tiếp tục thực hiện như vậy cho đến quân bài thứ **n-1** chúng ta có được nhóm bài có giá trị tăng dần theo thứ tự từ trái sang phải.

Có thể thấy, tại thời điểm sau lượt sắp xếp thứ **i**, chúng ta sẽ có **i** quân bài (bắt đầu từ bên trái) mang đúng thứ tự của mình. Hoặc chúng ta có thể hiểu như lúc nào các quân bài đều được chia làm **2** nhóm, trong đó nhóm bên trái là nhóm bài đã được sắp xếp đúng thứ tự, nhóm bên phải là các quân bài với vị trí lộn xộn. Sau mỗi lượt chúng ta thực hiện mang một quân bài từ nhóm "lộn xộn" sang nhóm "đúng thứ tự".

Đây chính là ví dụ minh họa cho giải thuật **Selection Sort - Sắp xếp chọn**. Bằng cách vận dụng quy tắc so sánh **in-place**, các quân bài lần lượt được đưa về vị trí đúng sau **n** lần sắp xếp. Chúng ta có thể hình dung rõ hơn qua sơ đồ sau đối với dãy cần sắp xếp **4, 3, 1, 5, 7, 9, 6, 2**:

![](https://i.imgur.com/jdQbQFe.png)

### 2. Cài đặt thuật toán

- Ngôn ngữ **C++**
```cpp
void Selection_sort(int a[], int n){
	int min_index;
	for (int i = 0; i < n - 1; i++){
		min_index = i;
		for (int j = i + 1; j < n; j++){
			if (a[min_index] > a[j]){
				min_index = j;
			}
		}
		if (i != min_index){
			int temp = a[i];
			a[i] = a[min_index];
			a[min_index] = temp;
		}
	}
} 
```

### 3. Độ phức tạp thời gian - Đặc điểm của Selection Sort

**Selection Sort** có ý tưởng khá đơn giản tuy nhiên cách thực hiện có vẻ phức tạp hơn **Insertion Sort** một chút. **Sắp xếp chọn** có độ phức tạp thời gian là $O(n^2)$. Giống với **Insertion Sort**, **Selection Sort** cũng không phù hợp với các dữ liệu lớn do công đoạn tìm phần tử nhỏ nhất trong nhóm "lộn xộn" trông tưởng chừng đơn giản (nếu nhìn bằng mắt thường thì khá nhanh để phát hiện ra), tuy nhiên khi thực sự bắt tay vào thực hiện thì bạn sẽ gặp khá nhiều khó khăn liên quan đến thời gian.

Thứ tự sắp xếp của **Selection Sort** cũng được đánh giá là không ổn định. Để hiểu rõ về sự không ổn định này, chúng ta thử xem xét ví dụ sắp xếp dãy **5, 8, 5, 2, 9**: Lần đầu tiên chúng ta sẽ tìm ra số có giá trị nhỏ nhất là **2**, thực hiện hoán đổi vị trí của số **2** với số **5** (trong dãy có hai số **5**, ở đây chỉ số **5** đầu tiên). Lúc này, để ý rằng thứ tự của hai số **5** đã bị thay đổi (tuy cùng là hai số **5** nhưng thực chất số **5** đứng trước đã chuyển sang vị trí đứng sau). Tức là tính ổn định của dãy đã bị phá vỡ! Cho nên thuật toán **Sắp xếp chọn** không phải là thuật toán ổn định. Chúng ta cần vận dụng linh hoạt và khéo léo tại các tình huống khác nhau.

## IV. Merge Sort - sắp xếp trộn
### 1. Mô tả về Merge Sort - sắp xếp trộn

Phân tích ý tưởng: Thuật toán **Merge Sort - sắp xếp trộn** sử dụng ý tưởng **Divide and Conquer(chia để trị)** đối với một dãy cho trước. Có thể hiểu đơn giản **Divide and Conquer(chia để trị)** là việc thực hiện chia một sự việc thành nhiều sự việc với quy mô nhỏ hơn nhưng vẫn giữ nguyên tính chất và mục đích ban đầu rồi thực hiện các thao tác.

Nguyên lí thực hiện: Bao gồm ba bước chính là

- Thực hiện chia dãy.
- Sắp xếp các dãy con.
- Gộp các dãy con lại.

Thực hiện thuật toán: Đối với thuật toán **Merge Sort - sắp xếp trộn**, chúng ta sẽ thực hiện chia đôi liên tục dãy lớn thành các dãy con, cho đến khi ta thu được các các dãy chỉ bao gồm một phần tử. Sau đó sắp xếp lại các phần tử bắt đầu từ những dãy con nhỏ nhất. Cuối cùng thực hiện thao gộp lần lượt ngược lại các dãy con để trở về dãy với số phần tử như ban đầu đã được sắp xếp. Cụ thể đối với dãy số **38, 27, 43, 3, 9, 82, 10**, chúng ta có thể tham khảo hình sau:

![](https://i.imgur.com/JtOggZz.jpg)

Đến đây chắc hẳn bạn vẫn còn một thắc mắc rằng, vậy thì làm sao để có thể "gộp" các dãy con lại? Ý tưởng thì dễ nhưng liệu thực hiện có khó khăn không? Chúng ta hãy tiếp tục theo dõi bài toán nhỏ sau cùng **Viblo** nhé!

- **Bài toán:** Cho hai dãy con gồm dãy **a** với **n** số nguyên, dãy **b** với **m** số nguyên. Hai dãy này đều đã được sắp xếp theo thứ tự tăng dần, hãy in ra một dãy mới gồm tất cả các phần tử của hai dãy này (kể cả các phần tử trùng nhau) theo thứ tự tăng dần? Ví dụ với dãy **[2, 4, 6]** và **[1, 3, 4]** ta sẽ thu được kết quả là **[1, 2, 3, 4, 4, 6]**.
- 
Bởi vì hai dãy cho trước đều đã được sắp xếp theo thứ tự tăng dần nên ta có thể tạo ra một dãy **c** rỗng (có không gian bằng tổng không gian hai dãy đã cho). Tiếp theo chỉ cần so sánh các phần tử nhỏ nhất của hai dãy **a** và **b** rồi thực hiện thao tác nhập vào dãy **c** là xong. Quá trình thực hiện liên tục cho đến khi kết thúc tất cả phần tử.

### 2. Cài đặt thuật toán

- Ngôn ngữ **C++**
```cpp
#include<iostream>
 
using namespace std;

void Merge(int arr[], int l, int m, int r){
    int i, j, k;
    int n1 = m - l + 1;
    int n2 =  r - m;
    int L[n1], R[n2];
    for (i = 0; i < n1; i++){
    	L[i] = arr[l + i];
	}  
    for (j = 0; j < n2; j++){
    	R[j] = arr[m + 1 + j];
	}
    i = 0;
    j = 0; 
    k = l; 
    while (i < n1 && j < n2){
        if (L[i] <= R[j]){
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    while (i < n1){
        arr[k] = L[i];
        i++;
        k++;
    }
    while (j < n2){
        arr[k] = R[j];
        j++;
        k++;
    }
}
void Merge_sort(int a[], int l, int r){
    if (l < r){
        int m = l + (r - l) / 2;
        Merge_sort(a, l, m);
        Merge_sort(a, m + 1, r);
        Merge(a, l, m, r);
    }
}
 
void Print_array(int a[], int n){
    for (int i = 0; i < n; i++){
    	cout << a[i] << " ";
	}
}
int a[100001];
int main(){
	int n;
	cin >> n;
	for (int i = 0; i < n; i++){
		cin >> a[i];
	}
    Merge_sort(a, 0, n - 1);
    Print_array(a, n);
    
    return 0;
}
```

### 3. Độ phức tạp thời gian - Đặc điểm của Merge Sort

Trong giai đoạn tách thành các dãy con, chúng ta chỉ mất thao tác tìm được vị trí trung gian của dãy để chia làm hai, bởi vậy độ phức tạp thời gian là $O(1)$. Trong giai đoạn sắp xếp từng cặp các dãy con, sau đó thực hiện gộp liên tục các dãy con lại với nhau, ta đã thực hiện thao tác với tất cả **n** phần tử. Tổng hợp tất cả các yếu tố trên lại ta có độ phức tạp thời gian cho thuật toán **Merge Sort** là $O(n.log(n))$

Quá trình thực hiện **Merge Sort** đã làm cho vấn đề lớn trở thành các vấn để nhỏ dễ giải quyết hơn. Về ý tưởng có phần nâng cao hơn chút so với hai thuật toán phía trên. Ý tưởng gộp dần các dãy con trở về các dãy lớn hơn để tiến tới dãy gốc khá độc đáo và khá thú vị. Thuật toán **Merge Sort** không phải là thuật toán sắp xếp tại chỗ. Trong các tình huống đặc biệt, có thể kết hợp **Merge Sort** cùng với các thao tác tìm kiếm sẽ đem lại hiệu quả bất ngờ!

## V. Tổng kết

Nếu nói về các thuật toán sắp xếp thì có rất nhiều, mỗi thuật toán đều có ý tưởng, ưu, nhược điểm của chính nó. Chúng ta cần học để hiểu về bản chất và tư duy của thuật toán, không nên lạm dụng các thuật toán sắp xếp mà cần biết phân tích tình huống cụ thể, lựa chọn đồng thời kết hợp một cách tốt nhất đồng thời các thuật toán trên. Bởi một bài toán thường không giới hạn về phương pháp cũng như số lượng thuật toán yêu cầu. Tìm ra hướng đi tối ưu cũng như học tập những điều quý giá mới là mục đích của chúng ta. Chúng ta hoàn toàn có thể kết hợp và vận dụng linh hoạt, sáng tạo đồng thời xây dựng, phát triển các thuật toán sắp xếp cũ để đưa ra những giải thuật tối ưu và thật đặc sắc!

## VI. Tài liệu tham khảo

- [https://en.wikipedia.org/wiki/Insertion_sort](https://en.wikipedia.org/wiki/Insertion_sort)
- [https://en.wikipedia.org/wiki/Selection_sort](https://en.wikipedia.org/wiki/Selection_sort)
- [https://en.wikipedia.org/wiki/Merge_sort](https://en.wikipedia.org/wiki/Merge_sort)