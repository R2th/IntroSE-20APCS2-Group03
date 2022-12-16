## Giới thiệu

Bài viết này đề cập đến các trò chơi hai người chơi, trong đó mỗi người chơi chọn từ rất nhiều chiến lược thuần túy hoặc ngẫu nhiên trong số các chiến lược và tổng phần thưởng của những người chơi luôn bằng 0.

## Định nghĩa và định lý cơ bản

Vì tất cả dữ liệu của một trò chơi có tổng bằng 0 hữu hạn hai người có thể được tóm tắt trong một ma trận, những trò chơi như vậy được gọi là **matrix game**.

**Định nghĩa 1** (Matrix game) Matrix game là một ma trận A kích thước $m \times n$ gồm các số thực, trong đó $m$ là số hàng và $n$ là số cột. Chiến lược của người chơi 1 là phân phối xác suất $p$ trên các hàng của A, tức là một phần tử của tập hợp

![Imgur](https://imgur.com/wGv7Cso.png)

Tương tự, chiến lược (hỗn hợp) của người chơi 2 là phân phối xác suất $q$ trên các cột của A, tức là một phần tử của tập hợp

![Imgur](https://imgur.com/q4Wuj6u.png)

Chiến lược **p** của người chơi 1 được gọi là thuần túy nếu tồn tại hàng $i$ với $p_i = 1$. Chiến lược này cũng được ký hiệu là $e^i$. Tương tự, chiến lược **q** của người chơi 2 được gọi là thuần túy nếu có cột $j$ với $q_j = 1$. Chiến lược này cũng được ký hiệu là $e^j$.

Việc giải thích một matrix game A như sau. Nếu người chơi 1 chơi hàng $i$ (tức là chiến lược thuần túy $e^i$) và người chơi 2 chơi cột $j$ (tức là chiến lược thuần túy $e^j$), thì người chơi 1 nhận phần thưởng $a_{ij}$ và người chơi 2 phải trả $a_{ij}$ (và do đó, nhận $-a_{ij}$), trong đó $a_{ij}$ là giá trị trong hàng $i$ và cột $j$ của ma trận A. Nếu người chơi 1 chơi chiến lược **p** và người chơi 2 chơi chiến lược **q**, thì người chơi 1 sẽ nhận được phần thưởng mong muốn, đó là

![Imgur](https://imgur.com/q0Zeunp.png)

và người chơi 2 nhận -**p**A**q**.

Để giải quyết matrix game, tức là, thiết lập những gì người chơi thông minh sẽ hoặc nên làm, các khái niệm về chiến lược maximin và minimax là rất quan trọng.

**Định nghĩa 2** (chiến lược Maximin và Minimax) Chiến lược **p** là chiến lược maximin của người chơi 1 trong matrix game A nếu:

![Imgur](https://imgur.com/fvy8OnZ.png)

Chiến lược **q** là chiến lược minimax của người chơi 2 trong matrix game A nếu:

![Imgur](https://imgur.com/pLrqiKW.png)

Nói cách khác: chiến lược maximin của người chơi 1 **tối đa hóa phần thưởng tối thiểu** (đối với chiến lược của người chơi 2) của người chơi 1 và chiến lược minimax của người chơi 2 **tối thiểu hóa mức tối đa** (đối với chiến lược của người chơi 1) mà người chơi 2 phải trả cho người chơi 1. (Có thể chứng minh bằng phân tích toán học cơ bản rằng chiến lược maxin và minimax luôn tồn tại) Tất nhiên, sự bất đối xứng trong các định nghĩa này là do thực tế là, theo quy ước, một matrix game đại diện cho chi phí mà người chơi 2 phải trả cho người chơi 1.

Để kiểm tra xem chiến lược **p** của người chơi 1 có phải là chiến lược maximin hay không, cần kiểm tra xem bất đẳng thức đầu tiên trong Định nghĩa 2.2 có đúng với $e^j$ với mọi $j = 1,...,n$ hay không hay mọi **q** $\in △^n$. Một quan sát tương tự cũng áp dụng cho các chiến lược minimax. Nói cách khác, để kiểm tra xem một chiến lược có phải là maximin (minimax) hay không, cần phải xem xét hiệu suất của nó so với mọi chiến lược thuần túy, tức là cột (hàng). 

Tại sao chúng ta lại quan tâm đến những chiến lược như vậy? Thoạt nhìn, những chiến lược này dường như thể hiện một thái độ rất dè dặt hoặc bi quan, đề phòng trường hợp xấu nhất. Tuy nhiên, lý do cho việc xem xét các chiến lược maximin/minimax được cung cấp bởi định lý minimax, nói rằng với mọi matrix game A có một số thực $v = v(A)$ với các tính chất sau: 

(a) Một chiến lược **p** của người chơi 1 đảm bảo phần thưởng ít nhất là $v$ cho người chơi 1 (tức là **p**A**q** $\ge v$ cho tất cả các chiến lược **q** của người chơi 2) khi và chỉ khi **p** là chiến lược maximin. 

(b) Chiến lược **q** của người chơi 2 đảm bảo trả nhiều nhất $v$ từ người chơi 2 cho người chơi 1 (tức là **p**A**q** $\le v$ cho tất cả các chiến lược **p** của người chơi 1) khi và chỉ khi **q** là chiến lược minimax. 

Do đó, người chơi 1 có thể nhận được phần thưởng ít nhất là $v$ bằng cách chơi chiến lược maximin và người chơi 2 có thể đảm bảo trả không nhiều hơn $v$ — do đó, đảm bảo phần thưởng ít nhất là $v$ — bằng cách chơi chiến lược minimax. Vì những lý do này, giá trị $v = v(A)$ còn được gọi là giá trị của trò chơi A — nó đại diện cho giá trị của người chơi 1 khi chơi trò chơi A — và chiến lược maximin và minimax được gọi là chiến lược tối ưu tương ứng cho người chơi 1 và 2. Vì vậy, ‘giải quyết’ trò chơi A, đương nhiên có nghĩa là xác định các chiến lược tối ưu và giá trị của trò chơi.

**Định nghĩa 3 (Điểm yên ngựa)** Vị trí $(i,j)$ trong matrix game A được gọi là điểm yên ngựa (saddlepoint) nếu:

$a_{ij} \ge a_{kj}$ với mọi $k = 1; ...; m$ và $a_{ij} \le a_{ik}$ với mọi $k = 1; ...; n$ 

tức là, $a_{ij}$ là cực đại trong cột $j$ và cực tiểu trong hàng $i$. 

Rõ ràng, nếu $(i,j)$ là điểm yên ngựa, thì người chơi 1 có thể đảm bảo phần thưởng ít nhất là $a_{ij}$ bằng cách chơi chiến thuật thuần túy hàng $i$, vì $a_{ij}$ là tối thiểu ở hàng thứ $i$. Tương tự, người chơi 2 có thể đảm bảo phần thưởng ít nhất là $-a_{ij}$ bằng cách chơi chiến thuật thuần túy cột $j$, vì $a_{ij}$ là cực đại trong cột $j$. Do đó, $a_{ij}$ phải là giá trị của trò chơi A: $v(A) = a_{ij}$, $e^i$ là chiến lược tối ưu (maximin) của người chơi 1 và $e^j$ là chiến lược tối ưu (minimax) của người chơi 2.

## Tài liệu tham khảo

1. Giải thuật và lập trình - Thầy Lê Minh Hoàng
2. [cp-algorithms.com](https://cp-algorithms.com/)
3. Handbook Competitive Programming - Antti Laaksonen
4. Competitve programming 3 - Steven Halim, Felix Halim
5. Game Theory - Giacomo Bonanno