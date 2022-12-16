# Tìm hiểu đôi chút về giải thuật đàn kiến - Ant colony optimization algorithms
### Tổng quan
Trong thế giới tự nhiên, những con kiến đầu tiên tìm đường lựa chọn ngẫu nhiên đường đi, và tìm được thức ăn trở lại tổ trong khi tìm đường chúng sẽ để lại pheromone của chúng trên đường đi để đánh dấu. Nếu những con kiến khác tìm kiếm một đường đi giống như vậy, chúng không phải di chuyển một cách ngẫu nhiên, mà thay vào đó là theo đường đi đã có trước đó, quay trở lại và củng cố lại nếu chúng tìm thấy được thức ăn.

Tuy nhiên, theo thời gian pheromone được lưu lại trên đường đi sẽ bắt đầu bay hơi, do vậy làm giảm đi nồng độ của nó. Thời gian càng dài pheromone mà chúng để lại trên đoạn đường trước sẽ càng giảm lâu dần pheromone cũng sẽ bốc hơi hoàn toàn. Bằng cách so sánh, những con đường ngắn hơn sẽ lưu lại nồng độ pheromone cao hơn so với các con đường dài do có nhiều kiến đi qua hơn. Nếu pheromone bị bốc hơi hoàn toàn những con đường được chọn bởi những con kiến đầu tiên sẽ không còn thu hút đối với các con kiến sau đó. Trong trường hợp này ảnh hưởng của sự bốc hơi của pheromone có thể không thực sự ảnh hưởng tới việc tìm đường của đàn kiến nhưng nó có ý nghĩa rất quan trọng với các hệ thống nhân tạo.

Kết quả là khi các con kiến tìm thấy con đường tốt nhất tới nguồn thức ăn từ tổ của chúng thì những con kiến khác cũng sẽ di chuyển theo con đường đó và có những phản hồi tích cực về con đường dẫn đến việc các con kiến sau cũng sẽ đi theo một con đường duy nhất. Ý tưởng về giải thuật đàn kiến dựa trên hành vi với những kiến mà chúng ta giả định rằng chúng sẽ đi vòng quanh đồ thị để thấy được vấn đề cần giải quyết.


### Lịch sử
- Ant System được phát triển với Marco Dorigo (Italy) trong luận án tiến sĩ của ông năm 1992.
- Max-Min Ant System được phát triển bởi Hoos và Stützle năm 1996.
- Ant Colony được phát triển bởi Gambardella Dorigo năm 1997.

### Giải thuật Ant colony optimization (ACO) là gì?

![](https://images.viblo.asia/400e9b46-ef71-4522-baaa-312c18c4534e.jpg)

- Là một kỹ thuật xác suất.
- Tìm kiếm đường đi tối ưu trong đồ thị dựa trên hành vi tìm kiếm đường đi của kiến từ tổ của chúng cho đến nguồn thức ăn.
-  Tối ưu hóa Meta-heuristic.

### Tổng quan về một số khái niệm

![](https://images.viblo.asia/a409c130-43bc-4b50-ad53-8bf4d9500975.png)

- Kiến điều hướng từ nơi tổ của chúng tới nguồn thức ăn. Và chúng bị mù do đó chúng định hướng bằng dấu vết mà chúng để lại (pheromone)!
- Đường đi ngắn nhất được phát hiện thông qua pheromone mà chúng đã để lại trên đường đi.
- Mỗi con kiến đều di chuyển một cách ngẫu nhiên.
- Pheromone được kiến lưu lại trên toàn bộ quãng đường đi của chúng.
- Đoạn đường nào có nhiều pheromone hơn sẽ được đi theo nhiều hơn.

### Ant System
Tổng quan về hệ thống:

- Các dấu vết ảo được tích lũy trên các đoạn đường đi.
- Đường đi được lựa chọn bằng cách lựa chọn ngẫu nhiên dựa trên lượng dấu vết hiện tại trên các đoạn đường từ nút bắt đầu đi.
- Các con kiến đến điểm tiếp theo, lựa chọn đường đi tiếp sau đó.
- Tiếp tục cho đến khi đến nút bắt đầu.
- Mỗi hành trình kết thúc là một giải pháp.
- Hành trình sẽ được phân tích để tối ưu.

### Meta-heuristic
- Phương pháp Heuristic để giải quyết một lớp các vấn đề tính toán rất chung bằng cách kết hợp các kinh nghiệm do người dùng cung cấp với hi vọng đưa ra được một quy trình hiệu quả hơn.
- ACO là meta-heuristic.
- Kỹ thuật tính toán mềm để giải quyết các vấn đề tối ưu hóa rời rạc. 

Một số tham khảo về các thuật toán tìm kiếm theo kinh nghiệm các bạn có thể xem thêm [tại đây](http://users.cs.cf.ac.uk/Dave.Marshall/AI2/node23.html)

### Tóm tắt
Túm lại, giải thuật ACO là giải thuật tìm kiếm đường đi tốt nhất lấy ý tưởng dựa trên hành vi của các bạn kiến lưu dấu vết bằng pheromone để chỉ dẫn các đoạn đường đã đi, dựa vào những đoạn đường đã được lưu để phân tích tìm đường tốt nhất  :joy: :joy: :joy:. Dựa trên ý tưởng đó xây dựng các hệ thống chỉ đường đi tối ưu có thể áp dụng cho TSP(Travelling salesman problem ) hay PersTour(Personalized Tour Recommendation) v.v...


Nguồn bài viết:

[https://en.wikipedia.org/wiki/Ant_colony_optimization_algorithms](https://en.wikipedia.org/wiki/Ant_colony_optimization_algorithms)

[http://mat.uab.cat/~alseda/MasterOpt/ACO_Intro.pdf](http://mat.uab.cat/~alseda/MasterOpt/ACO_Intro.pdf)

Bài viết còn rất nhiều thiếu sót rất mong các bạn góp ý để hoàn thiện tốt hơn :joy: