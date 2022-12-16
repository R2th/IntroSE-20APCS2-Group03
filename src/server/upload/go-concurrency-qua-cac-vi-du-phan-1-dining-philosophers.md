Bài toán Dining Philosophers (Bữa tối của các triết gia) là một trong những bài toán kinh điển  thường dùng để mô tả các vấn đề trong việc xử lý concurrent, những vấn đề thường gặp trong quá trình cấp phát tài nguyên mà không dính deadlock (khóa chết) và đói tài nguyên (starvation).
# 1. Mô tả bài toán
Bài toán được phát biểu như sau: Cho 5 vị triết gia ngồi quanh một bàn tròn, trước mặt họ là các đĩa spaghetti, mỗi người một đĩa. Có 5 chiếc dĩa được đặt xen kẽ giữa 2 vị triết gia ngồi cạnh nhau, được mô tả như hình vẽ
![](https://images.viblo.asia/3ecc7f22-4e60-401a-bd6d-1c677b1867a1.png)
Mỗi vị triết gia đều có 2 trạng thái: Ăn và Suy Nghĩ. Khi 1 vị triết gia không ăn, họ sẽ ngồi suy nghĩ. Khi vị triết gia thấy đói, ông chỉ có thể ăn nếu 2 chiếc dĩa bên cạnh mình (trái và phải) được đặt trên bàn. Một vị triết gia có thể chỉ lấy 1 chiếc dĩa. Lưu ý rằng, ông ta không thể lấy chiếc dĩa nếu như chiếc dĩa đó đang được dùng bởi 1 vị triết gia khác. Sau khi một vị triết gia ăn xong, ông ta sẽ đặt 2 chiếc dĩa vừa sử dụng xuống bàn và tiếp tục suy nghĩ, từ đó các vị triết gia khác có thể lấy chiếc dĩa của ông ta và bắt đầu ăn.
Yêu cầu của bài toán là mọi vị triết gia đều có thể được ăn hoặc được đổi lượt (nghĩ và ăn) mà không ai bị chết đói.
# 2. Implement bài toán bằng Golang
Đầu tiên, mình sẽ khai báo struct `Fork`, bao gồm 2 biến là `id` và biến channel `l` dùng để đảm bảo rằng nếu cái dĩa được cầm lên thì sẽ không ai khác có thể cầm nó cho đến khi nó được đặt xuống bàn.
```
type Fork struct {
	id int
	l  chan bool  
}
```
Tiếp theo là struct `Philosopher`, bao gồm các biến `id` và `leftFork`,`rightFork`
```
type Philosopher struct {
	id                  int
	leftFork, rightFork *Fork // 2 chiếc dĩa bên cạnh
}
```
Để mô tả quá trình ăn của các vị triết gia, struct `Philosopher` sẽ bao gồm 3 method chính là `pickForks()`, `putDownForks()` và `dine()`
```
func (p *Philosopher) pickForks() {
	<-p.leftFork.l // lấy chiếc đũa bên trái khỏi channel
	fmt.Println(p.id, " picked left fork ", p.leftFork.id)
	time.Sleep(time.Second)
	<-p.rightFork.l // lấy chiếc đũa bên phải khỏi channel
	fmt.Println(p.id, " picked right fork ", p.rightFork.id)
}
```
```
func (p *Philosopher) putDownForks() {
	p.leftFork.l <- true // chiếc đũa bên trái về trạng thái ready trong channel
	fmt.Println(p.id, " put down left fork ", p.rightFork.id)
	p.rightFork.l <- true // chiếc đũa bên phải về trạng thái ready trong channel
	fmt.Println(p.id, " put down right fork ", p.leftFork.id)
}
```
```
func (p *Philosopher) dine() {
    //TODO
}
```
Trong hàm `main()`, mình sẽ khởi tạo 5 Philosophers cùng với 5 Forks. Tuy nhiên, ở lần thí nghiệm này mình sẽ không cho Philosophers ăn vô hạn mà mỗi người sẽ chỉ có thể ăn tối đa 3 lần
```
const (
	HUNGER = 3
	COUNT  = 5
)

var (
	wg       sync.WaitGroup
	forks    [COUNT]*Fork
)

func main() {
	wg.Add(COUNT) 
	for i := 0; i < COUNT; i++ { // khởi tạo forks
		forks[i] = &Fork{id: i, l: make(chan bool, 1)}
		forks[i].l <- true
	}

	philosophers := make([]*Philosopher, COUNT)
	for i := 0; i < COUNT; i++ {
		philosophers[i] = &Philosopher{
			id: i, leftFork: forks[i], rightFork: forks[(i+1)%COUNT]}
		go philosophers[i].dine() // bắt đầu bữa tối
	}

	wg.Wait() // chờ philosophers hoàn thành bữa tối
	fmt.Println("Table is empty")
}
```
Do đó, method `dine()` sẽ được implement như sau: 
```
func (p *Philosopher) dine() {

	for i := 0; i < HUNGER; i++ {
		say("Thinking", p.id)
		doingStuff()

		say("Hungry", p.id)
		p.pickForks()

		say("Eating", p.id)
		doingStuff()
		p.putDownForks()
	}
	say("Satisfied", p.id)
	wg.Done() // hoàn thành bữa tối
	say("Leaving the table", p.id)
}
func doingStuff() {
	time.Sleep(time.Second / 10)
}

func say(action string, id int) {
	fmt.Printf("#%d is %s\n", id, action)
}
```
Sau khi chạy chương trình, output sẽ cho ra như dưới đây: 
```
#4 is Thinking
#1 is Thinking
#0 is Thinking
...
#2 is Hungry
2  picked left fork  2
2  picked right fork  3
#2 is Eating
#4 is Hungry
4  picked left fork  4
4  picked right fork  0
#4 is Eating
...
0  put down left fork  0
0 is Satisfied
0 is Leaving the table
Table is empty
```
Tuyệt vời! Nhìn thoạt qua thì chương trình đã chạy thành công mà không có lỗi nào (Nghĩa là **có vẻ như** không vị triết gia nào bị bỏ đói)

**Nhưng khoan,** Nếu cả 5 vị triết gia mỗi người đều lấy được 1 chiếc đũa thì sao? Điều đó sẽ dẫn đến việc cả 5 người cùng chờ để lấy chiếc đũa còn lại nhưng sẽ không bao giờ lấy được chúng (Deadlock) !!
![](https://images.viblo.asia/b83a617b-8c77-43d0-b4ff-ecafcb7bdb66.jpg)

Tiến hành sửa 1 chút hàm `pickForks()`:
```
func (p *Philosopher) pickForks() {
	<-p.leftFork.l
	fmt.Println(p.id, " picked left fork ", p.leftFork.id)
	time.Sleep(time.Second) // lấy 1 chiếc đũa rồi bắt đầu sleep
	<-p.rightFork.l
	fmt.Println(p.id, " picked right fork ", p.rightFork.id)
}
```
Chạy lại chương trình, chúng ta sẽ có kết quả như sau: 
```
#4 is thinking
#1 is thinking
...
#4 is hungry
#1 is hungry
...
2  picked left fork  2
4  picked left fork  4
3  picked left fork  3
0  picked left fork  0
1  picked left fork  1
fatal error: all goroutines are asleep - deadlock!
```
Kết quả đúng như dự đoán khi mỗi người cùng lấy 1 chiếc đũa, deadlock chắc chắn sẽ xảy ra.
# 3. Giải pháp cho bài toán
Vậy hướng giải quyết để tránh deadlock tối ưu cho bài toán sẽ như thế nào? Nhắc lại 1 chút về deadlock, deadlock sẽ xảy ra chỉ khi xảy ra đủ 4 điều kiện sau:

* Loại trừ tương hỗ **(Mutual Exclusion)**: Tại một thời điểm, tài nguyên không thể chia sẻ được hệ thống cấp phát cho một tiến trình duy nhất. Tiến trình khác không thể sử dụng cho đến khi tài nguyên được giải phóng.
* Giữ và chờ **(Hold and Wait)** : Mỗi tiến trình trong tập hợp tiến trình đang giữ một tài nguyên và chờ đợi để được cấp phát một tài nguyên mới.
* Không có quyền ưu tiên **(No Preemption)**: Một tiến trình không thể chiếm giữ tài nguyên cho đến khi tài nguyên đó được giải phóng bởi tiến trình đang sử dụng nó.
* Tồn tại chu kỳ chờ **(Circular wait)**: Các tiến trình giữ một tài nguyên và chờ nhận một tài nguyên khác bởi tiến trình khác. Chúng nối đuôi nhau tạo thành vòng tròn. Chờ vô tận.

Hướng giải quyết bài toán đầu tiên nhằm tránh deadlock đó là loại bỏ chu kỳ chờ (Circular Wait)
## 3.1. Giải pháp phân cấp tài nguyên
Giải pháp này được chính Dijstra, người đầu tiên mô tả bài toán đưa ra. Mỗi chiếc dĩa sẽ được đánh số từ 1 - 5, và mỗi triết gia sẽ luôn ưu tiên giành lấy chiếc dĩa có số nhỏ nhất trong 2 chiếc cần giành (Triết gia 1 lấy chiếc dĩa 1, triết gia 2 lấy chiếc dĩa 2,...). Như vậy sau khi 4 vị triết gia đã lấy chiếc dĩa của mình, triết gia số 5 sẽ không thể lấy chiếc dĩa nào (vì chiếc dĩa nhỏ nhất số 1 bên cạnh ông đã bị lấy). Nhờ đó, vị triết gia số 4 có thể lấy chiếc dĩa số 5 và bắt đầu ăn. Lưu ý rằng, giải pháp này không quan trọng thứ tự đặt chiếc dĩa xuống bàn.
![](https://images.viblo.asia/6804053c-c697-4cc6-881c-0ffc361ce022.jpg)

Tiến hành sửa lại 1 chút hàm `pickForks()`
```
func (p *Philosopher) pickForks() {
	if p.leftFork.id < p.rightFork.id {
		<-p.leftFork.l
		fmt.Println(p.id, " picked left fork ", p.leftFork.id)
		time.Sleep(time.Second)
		<-p.rightFork.l
		fmt.Println(p.id, " picked right fork ", p.rightFork.id)
	} else {
		<-p.leftFork.l
		fmt.Println(p.id, " picked left fork ", p.leftFork.id)
		time.Sleep(time.Second)
		<-p.rightFork.l
		fmt.Println(p.id, " picked right fork ", p.rightFork.id)
	}
}
```
Chạy lại chương trình, lúc này deadlock đã bị loại bỏ:
```
#4 is Thinking
...
#4 is Hungry
4  picked right fork  0
...
1  picked left fork  1
...
2  picked left fork  2
...
3  picked left fork  3
4  picked left fork  4
#4 is Eating
...
0 is Satisfied
0 is Leaving the table
Table is empty
```
Một giải pháp phân cấp tài nguyên khác là yêu cầu vị triết gia ở vị trí chẵn ưu tiên giành chiếc đũa bên trái, vị triết gia ở vị trí lẻ ưu tiên giành chiếc đũa bên phải (triết gia 1 ưu tiên dĩa 1, triết gia 2 ưu tiên dĩa 3,…) ⇒ Từ đó chiếc dĩa 2 và dĩa 4 sẽ có độ ưu tiên thấp hơn trong các triết gia, từ đó các triết gia có 1 chiếc dĩa trong tay có thể lấy chúng mà không phải tranh chấp.
## 3.2. Giải pháp dùng Monitor
Để giảm tối thiểu quyền tranh chấp chiếc dĩa, các vị triết gia quyết định rằng, mỗi khi 1 vị triết gia có đũa, đó sẽ là 1 đôi thay vì 1 chiếc. Từ đó sẽ giảm thiểu được quyền ưu tiên (Preemption) cũng như chu kì chờ (Circular Wait).
Chúng ta sẽ tiến hành thêm 1 biến Conditional Variable `ForkCond`
```
var ForkCond *sync.Cond
```
Biến `ForkCond` được dùng như 1 monitor, đảm bảo rằng 1 vị triết gia luôn ưu tiên lấy chiếc dĩa trái.
* Nếu dĩa trái được đặt trên bàn, vị triết gia sẽ cầm chiếc dĩa đó lên và cố gắng lấy được chiếc dĩa bên phải. Biến mutex trong`ForkCond` dùng để đảm bảo rằng, một khi vị triết gia cầm được chiếc dĩa bên trái, thì chiếc dĩa bên phải sẽ được ưu tiên cho ông ta mà không bị ai khác cầm lên.
* Nếu dĩa trái được đặt trên bàn, vị triết gia sẽ cầm chiếc dĩa đó lên và cố gắng lấy được chiếc dĩa bên phải. Biến mutex trong `ForkCond` dùng để đảm bảo rằng, một khi vị triết gia cầm được chiếc dĩa bên trái, thì chiếc dĩa bên phải sẽ được ưu tiên cho ông ta mà không bị ai khác cầm lên.

Tiến hành sửa lại hàm `pickForks()`:
```
func (p *Philosopher) pickForks() {
   ForkCond.L.Lock() // lock mutex
   for {
      select {
      case <-p.leftFork.l: 
         fmt.Println(p.id, " picked left fork ", p.leftFork.id)
         <-p.rightFork.l
         fmt.Println(p.id, " picked right fork ", p.rightFork.id)
         ForkCond.L.Unlock() // unlock mutex
         return
      default:
         ForkCond.Wait() //wait cho tới khi được signaled
      }
   }
}
```
Khi đó, hàm `putDownForks()` sẽ có nhiệm vụ signal khi 1 vị triết gia đã ăn xong và đặt chiếc dĩa xuống bàn:
```
func (p *Philosopher) putDownForks() {
	...
	ForkCond.Signal()
}
```
Nhìn vào output của chương trình, vị triết gia số 2 sau khi lấy chiếc dĩa trái số 2 sẽ được ưu tiên lấy chiếc dĩa bên phải số 3 mà không bị ai khác lấy mất, giảm thiểu vấn đề chiếm giữ tài nguyên. 
```
...
3  picked left fork  3
3  picked right fork  4
...
#2 is Hungry
2  picked left fork  2
3  put down left fork  4
3  put down right fork  3
#3 is Thinking
2  picked right fork  3
...
#1 is Satisfied
#1 is Leaving the table
Table is empty
```
# 4. Lời kết
Còn rất nhiều hướng giải quyết cho bài toán Dining Philosophers, tuy nhiên với giới hạn bài viết này chỉ giới thiệu 2 hướng giải quyết cơ bản nhất. Hy vọng rằng sau khi đọc bài viết của mình, các bạn hiểu được cách hoạt động của Concurrency trong Golang cũng như các cách giải quyết nếu gặp vấn đề với deadlock. Cảm ơn các bạn đã đọc bài viết của mình và đón chờ các phần tiếp theo nhé!
## Nguồn tham khảo
[https://en.wikipedia.org/wiki/Dining_philosophers_problem](https://en.wikipedia.org/wiki/Dining_philosophers_problem)

[https://www.golangprograms.com/illustration-of-the-dining-philosophers-problem-in-golang.html](https://www.golangprograms.com/illustration-of-the-dining-philosophers-problem-in-golang.html)

[https://www.khanhtc.me/posts/dining-philosophers/](https://www.khanhtc.me/posts/dining-philosophers/)