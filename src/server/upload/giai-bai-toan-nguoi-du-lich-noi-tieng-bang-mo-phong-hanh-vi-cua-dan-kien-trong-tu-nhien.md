Bài toán Người du lịch (Travelling Salesman Problem) là một trong những bài toán kinh điển và khó trong tin học. Có rất nhiều cách tiếp cận giải bài toán này ngay từ khi nó mới ra đời, như sử dụng quy hoạch tuyến tính, nhánh và cận (đã được đăng trên Tin học và Nhà trường), nhưng mới chỉ dừng lại ở các bộ dữ liệu nhỏ. Gần đây các cách tiếp cận về tiến hóa, như thuật toán di truyền được áp dụng có những kết quả khả quan hơn.
Trong bài này, chúng tôi xin được phép giới thiệu một phương pháp độc đáo dựa vào mô phỏng hành vi của đàn kiến thực với quá trình tha thức ăn về tổ trong tự nhiên để giải bài toán tìm đường đi ngắn nhất cho người du lịch. Đây là phương pháp tương đối khó so với trình độ Tin học của học sinh phổ thông, nên trong bài viết chúng tôi nhấn mạnh vào ý tưởng, và hướng dẫn cài đặt, cũng như trình bày một cách đơn giản nhất. Các tác giả hy vọng qua bài viết, các em học sinh yêu Tin học nói chung và các em học sinh khối phổ thông chuyên Tin nói riêng có được một các nhìn khác với các cách giải truyền thống bài toán này.


1. Nhắc lại bài toán Người du lịch 
Bài toán Người du lịch, tìm đường đi ngắn nhất cho người thương nhân (salesman), hay còn gọi là người chào hàng xuất phát từ một thành phố, đi qua lần lượt tất cả các thành phố duy nhất một lần và quay về thành phố ban đầu với chi phí rẻ nhất, được phát biểu vào thế kỷ 17 bởi hai nhà toán học vương quốc Anh là Sir William Rowan Hamilton và Thomas Penyngton Kirkman, và được ghi trong cuốn giáo trình Lý thuyết đồ thị nổi
tiếng của Oxford. Nó nhanh chóng trở thành bài toán khó thách thức toàn thế giới bởi độ phức tạp thuật toán tăng theo hàm số mũ (trong chuyên ngành thuật toán người ta còn gọi chúng là những bài toán NP-khó). Người ta bắt đầu thử và công bố các kết quả giải bài toán này trên máy tính từ năm 1954 (49 đỉnh), cho đến năm 2004 bài toán giải được với số đỉnh lên tới 24.978, và dự báo sẽ còn tiếp tục tăng cao nữa. Bài toán có thể phát biểu dưới ngôn ngữ đồ thị như sau :
Cho đồ thị n đỉnh đầy đủ và có trọng số G=(V-tập đỉnh,E-tập cạnh) có hoặc vô hướng. Tìm chu trình Halmilton
có tổng trọng số
là nhỏ nhất.
>
2. Ý tưởng mô phỏng hành vi của đàn kiến thực trong tự nhiên
Năm 1989, nhà bác học người Đan Mạnh Deneubourg và các cộng sự công bố kết quả nghiên cứu về thí nghiệm trên đàn kiến Argentina (một loài kiến hiếm trên thế giới), gọi là thí nghiệm “Chiếc cầu đôi” (Double Bridge Experiment).
Cụ thể, họ đã đặt một chiếc cầu đôi gồm hai nhánh (nhánh dài hơn có độ dài bằng hai lần nhánh ngắn hơn, như hình vẽ) nối tổ của đàn kiến với nguồn thức ăn, sau đó thả một đàn kiến và bắt đầu quan sát hoạt động của chúng trong một khoảng thời gian đủ lớn. Kết quả là ban đầu các con kiến đi theo cả hai nhánh của chiếc cầu với số lượng gần như ngang nhau, nhưng càng về cuối thời gian quan sát người ta nhận thấy các con kiến có xu hướng chọn nhánh ngắn hơn để đi (80-100% số lượng).

Kết quả được các nhà sinh học lý giải như sau : Do đặc tính tự nhiên và đặc tính hóa học, mỗi con kiến khi di chuyển luôn để lại một lượng hóa chất gọi là các vết mùi (pheromone trail) trên đường đi và thường thì chúng sẽ đi theo con đường có lượng mùi đậm đặc hơn. Các vết mùi này là những loại hóa chất bay hơi theo thời gian, do vậy ban đầu thì lượng mùi ở hai nhánh là xấp sỉ như nhau, nhưng sau một khoảng thời gian nhất định nhánh ngắn hơn sẽ có lượng mùi đậm đặc hơn so với nhánh dài hơn do cũng lượng mùi gần xấp sỉ như nhau khi phân bố ở nhánh dài hơn mật độ phân bố mùi ở nhánh này sẽ không dày bằng nhánh có độ dài ngắn hơn, thêm nữa cũng do lượng mùi trên nhánh dài hơn cũng sẽ bị bay hơi nhanh hơn trong cùng một khoảng thời gian.

Năm 1991, với cơ sở là kết quả của thí nghiệm nổi tiếng trên, nhà khoa học người Bỉ Marco Dorigo đã xây dựng thuật toán đàn kiến (Ant Algorithm, hay còn gọi là Hệ kiến, Ant System)
đầu tiên ứng dụng vào giải bài toán người du lịch, và công bố trong luận án tiến sĩ của ông. Trong bài báo này, các tác giả muốn giới thiệu về thuật toán cơ bản Ant-Cycle (thuật toán nổi tiếng và hiệu quả nhất trong lớp các thuật toán Hệ kiến) được công bố năm 1996 trên tạp chí lý thuyết của IEEE (Institute of Electrical and Electronics Engineers, là hiệp hội nghiên cứu công nghệ và khoa học hàng đầu thế giới). Hiện nay, Dorigo và các cộng sự đã xây dựng được nhiều hệ kiến phức tạp hơn ứng dụng trong nhiều bài toán khó hơn và có nhiều ý nghĩa khoa học và thực tiễn hơn, nhưng với khuôn khổ và phạm vi của bài báo là giành cho học sinh phổ thông, chúng tôi xin được phép không trình bày ở đây, bạn đọc quan tâm có thể tìm đọc trong các tài liệu tham khảo có ở phần cuối của bài báo.

3. Thuật toán đàn kiến giải bài toán người du lịch

Để bắt chước hành vi của các con kiến thực, Dorigo xây dựng các con kiến nhân tạo (artificial ants) cũng có đặc trưng sản sinh ra vết mùi để lại trên đường đi và khả năng lần vết theo nồng độ mùi để lựa chọn con đường có nồng độ mùi cao hơn để đi. Với bài toán Người du lịch trên đồ thị trong không gian hai chiều với trọng số là khoảng cách Euclide giữa hai đỉnh bất kỳ, Dorigo gắn với mỗi cạnh (i, j) ngoài trọng số d(i, j) trên là nồng độ vết mùi trên cạnh đó, đặt là . Ban đầu, các nồng độ mùi trên mỗi cạnh được khởi tạo bằng một hằng số c nào đó.

Phương pháp tìm đường đi mô phỏng hành vi con kiến
Các con kiến sẽ tiến hành tìm đường đi từ đỉnh xuất phát qua một loạt các đỉnh và quay trở về đỉnh ban đầu, tại đỉnh u một con kiến sẽ chọn đỉnh v chưa được đi qua trong tập láng giềng của u theo xác suất sau :

trong đó 

- UV(u) là tập các đỉnh láng giềng của u chưa được con kiến hiện tại đi qua.

gọi là thông tin heurtistic giúp đánh giá chính xác hơn sự lựa chọn của con kiến khi quyết định đi từ đỉnh u qua đỉnh v.



Ta có thể hiểu công thức trên đơn giản như sau : quyết định lựa chọn đỉnh tiếp theo để đi của con kiến được lựa chọn ngẫu nhiên theo xác suất (tức là đỉnh nào có xác suất cao hơn sẽ có khả năng được chọn cao hơn, nhưng không có nghĩa là các đỉnh có xác suất thấp hơn không được chọn mà nó được chọn với cơ hội thấp hơn mà thôi). Ý tưởng này được thể hiện qua kỹ thuật Bánh xe xố số (Lottery Wheel) sẽ được trình bày sau. Và xác suất này (hay khả năng chọn đỉnh tiếp theo của con kiến) tỷ lệ thuận với nồng độ vết mùi trên cạnh được chọn (theo đặc tính của con kiến tự nhiên) và tỷ lệ nghịch với độ dài cạnh, là những hệ số điểu khiển việc lựa chọn của con kiến nghiêng về phía nào.

Kỹ thuật bánh xe xổ số
Đây là kỹ thuật phổ biến hay sử dụng trong các phương pháp tìm kiếm dựa vào xác suất, đặc biệt trong phép toán Chọn lọc (Selection) của thuật toán di truyền (Genetic Algorithm). Cụ thể kỹ thuật như sau :


Giả sử V={v1,v2, …, vn} là tập các láng giềng của u, p1, p2, …, pn là xác suất lựa chọn đỉnh tiếp theo từ u của tương ứng v1,v2, …, vn 
 tức là chắc chắn chọn 1 trong các đỉnh trên để đi tiếp. Để đảm bảo ưu thế của những đỉnh có xác suất lớn, nhưng vẫn đảm bảo cơ hội của các đỉnh có xác suất thấp hơn người ta sinh ra một số ngẫu nhiên k (0, sum] rồi chọn i nhỏ nhất sao cho  Cách làm này mô phỏng hoạt động của một vòng quay xổ số (vòng được chia làm nhiều phần không bằng nhau), rõ ràng khi quay ta không biết kim của bánh quay sẽ chỉ vào phần nào nhưng ta cũng có thể nhận thấy ngay là phần lớn hơn sẽ nhiều khả năng kim rơi vào đó hơn. Chính vì vậy kỹ thuật này được gọi là Bánh xe xổ số.
Như vậy, các con kiến từ một đỉnh xuất phát, lần lượt tới thăm các đỉnh tiếp theo theo quy tắc trên (thăm xong đánh dấu chúng lại) cho đến thăm tới đỉnh cuối cùng và quay về đỉnh ban đầu, kết thúc một hành trình. Quá trình này được lặp đi lặp lại, hành trình tốt hơn (có chiều dài ngắn hơn) sẽ được cập nhật cho đến một khoảng thời gian đủ tốt (thông thường tính toán theo số vòng lặp, với các trường hợp nhỏ (số đỉnh <=200) số vòng lặp bằng 500 là đủ tìm ra kết quả tối ưu, còn với các trường hợp lớn hơn ta phải thử với số lần lặp lớn hơn nhiều, tùy thuộc vào từng bộ dữ liệu cụ thể. 

Sau khi và trong quá trình các con kiến tìm đường đi các vết mùi ( ) được cập nhật lại, vì chúng bị biến đổi do quá trình bay hơi và do quá trình tích lũy của các con kiến trên cạnh đó. Có rất nhiều cách cập nhật mùi, mỗi cách có ảnh hưởn nhất định đến chất lượng của thuật toán. Trong phạm vi kiến thức phổ thông, chúng tôi giới thiệu cách cập nhật mùi đơn giản nhất như sau :

Sau mỗi vòng lặp (các con kiến đều tìm được hành trình riêng của mình), vết mùi trên mỗi cạnh được cập nhật lại theo công thức sau :
 
trong đó  gọi là tham số bay hơi (sở dĩ gọi như vậy vì sau mỗi lần cập nhật lượng mùi trên cạnh (i,j) sẽ mất đi một lượng là   thường được chọn là 0,8 trong cài đặt và chạy chương trình. Ngoài lượng bay hơi mất đi đó mỗi cạnh (i, j) còn được tích tụ thêm một lượng mùi   nhất định tùy thuộc vào từng con kiến đi qua, cụ thể được tính như sau :
 
trong đó Q là một hằng số, Lk là độ dài hành trình của con kiến thứ k.
Nhờ việc cập nhật mùi này, sau mỗi vòng lặp (hay sau mỗi lần các con kiến đi hết hành trình), nồng độ vết mùi trên các cạnh sẽ thay đổi (hoặc giảm hoặc tăng dần) ảnh hưởng đến quyết định chọn của các con kiến, có thể ở bước lặp này chọn một cạnh để đi nhưng đến bước lặp khác vẫn con kiến đó lại không đi qua cạnh đó nữa. Nhờ vậy thuật toán có khả năng tìm được lời giải tốt trong những trường hợp dữ liệu cực lớn.

4. Hướng dẫn cài đặt bằng ngôn ngữ PASCAL


Cấu trúc dữ liệu
D[1..N, 1..N] : mảng số thực hai chiều lưu độ dài các cạnh. 

T[1..N, 1..N] : mảng số thực hai chiều lưu nồng độ vết mùi trên các cạnh. 

Delta[1..N, 1..N] : mảng số thực hai chiều lưu sự cập nhật mùi. 

W[1..N] : mảng số nguyên một chiều lưu hành trình của mỗi con kiến. 

Mark[1..N] : mảng boolean một chiều đánh dấu đỉnh đã thăm. 

UV[1..N-1] : mảng số nguyên 1 chiều lưu các đỉnh chưa thăm của con kiến.
	

Các thủ tục đặc tả 

Procedure Init;

Begin

	For i := 1 to n-1 do

		For j :=i+1 to n do

		Begin 	

T[i,j] := c; {c là một hằng số thường lấy bằng 0.5}

Delta[i,j] := 0;

T[j,i] := T[i,j]; Delta[j,i] := Delta[i,j];

		End;

	N_Loop := 0;	{đếm số vòng lặp hiện tại}

	L_Best := MaxReal; {biến số thực đủ lớn}

End;



Procedure Lottery_Wheel (Var k : Integer);

Begin

	sum := 0; dem := 0;

	Fillchar(UV, Sizeof(UV), 0); 

For i:= 1 to n do 

If (Not Mark[i]) then 

Begin

sum := sum+p[i]; {sum là biến tổng các xác suất}

Inc(dem); UV[dem] := i;

		End;

k := random(sum); t := 0; i=1;

While (t

Begin

	t=t+p[UV[i]];

End;

k := UV[i];

End;



Procedure Pheromone_Update;

Begin

	For i:=1 to N-1 do

		For j:=i+1 to N do

		Begin

			T[i,j] := rho*T[i,j] + Delta[i,j];{rho thường được chọn bằng 0.8}

			T[j,i] := T[i,j];

		End;

End;



Procedure Ant_Cycle;

Begin

	Init;

	Repeat

		Inc(N_Loop);

		For i:= 1 to M do	{M là số con kiến, thường chọn bằng 25}

		Begin

			W[1] := 1; 	{Giả sử đỉnh xuất phát là 1 cho tất cả các con kiến}

		Fillchar(Mark, Sizeof (Mark), False); Mark[1] := True;

L := 0; 		{L là độ dài hành trình của con kiến i}

		For j:= 2 to N do

			Begin

				Lottery_Wheel(W[j]);

				L := L + D[W[j-1], W[j]];

				Mark[W[j]] := True;

			End;

		End;	

		L := L+D[W[N], W[1]];

		If (L

		Begin

			L_Best := L;

			Luu_duong_di := W; {Luu_duong_di là mảng lưu kết quả}

		End;

		For i:=1 to N-1 do

			For j:=i+1 to N do

			Begin

				Delta[i,j] := Delta[i,j] + Q/L;

				Delta[i,j] := Delta[j,i];

			End;

		End;

Pheromone_Update;		

	Until (N_Loop < N_C); {N_C là tổng số vòng lặp sẽ chạy, phụ thuộc từng bộ dữ liệu}

End; 
Tài liệu tham khảo
[1] M.Dorigo and T.Stuzle. Ant Colony Optimization. Nhà xuất bản MIT, Tháng 7/2004.
[2] Đinh Quang Huy, Đỗ Đức Đông và Hoàng Xuân Huấn. “Multi-level Ant System : A new approach through the new pheromone update of Ant Colony Optimization. Kỷ yếu Hội nghị quốc tế Khoa học máy tính RIVF lần thứ 4, tp.Hồ Chí Minh, Tháng 2/2006.
[3] Từ điển Wikipedia tiếng Anh http://en.wikipedia.org/wiki/ 
[4] Website về bài toán Người du lịch http://www.tsp.gatech.edu/index.html 
[5] Dữ liệu thử: www.iwr.uni-heidelberg.de/groups/comopt/software/TSPLIB95/ 
Tác giả: Đinh Quang Huy