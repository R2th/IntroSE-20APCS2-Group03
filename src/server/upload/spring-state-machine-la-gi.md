<h3>1. State machine là gì?</h3>
<p> State Machine là một mô hình tính toán dựa trên một máy giả định được tạo thành từ một hoặc nhiều trạng thái. Nó chuyển từ trạng thái này sang trạng thái khác để thực hiện các hành động khác nhau. </p>
<h3>2. Khi nào ta nên sử dụng State machine ?</h3>
<p>Khi chúng ta muốn chia một nhiệm vụ lớn và phức tạp thành những đơn vị nhỏ độc lập.</p>
<h3>3. Lợi ích của việc dùng state machine ?</h3>
*  dễ dàng theo dõi quá trình chuyển đổi / dữ liệu / sự kiện nào gây ra trạng thái hiện tại của yêu cầu.<br>
 * ngăn chặn các hoạt động câu lệnh trái phép.<br>
* Bảo trì dễ dàng,quá trình chuyển đổi trạng thái độc lập nhau.<br>
* Ổn định và dễ dàng thay đổi.<br>
<h3>4. Công thức tính ?</h3>
<p>Current State + Some Action / Event= Another State
</p>
<h4> State machine thực hiện theo State Design pattern.  Ví dụ như sau: </h4>

![](https://images.viblo.asia/b5f9cee5-d6ab-4581-bab6-1d5d06b41eab.PNG)

- Giả sử Chúng ta đi mượn sách ở thư viện, những cuốn sách trên kệ sách là những cuốn có giá trị đọc và sử dụng (Available). Chúng ta có thể mượn (Borrow) sách, lúc này DB của thư viện sẽ lưu trạng thái Borrowed. Trường hợp nếu mà khi mượn mà làm rách sách thì chúng ta sẽ chịu thêm 1 số chi phí cho thư viện và lúc này thư viện sẽ mang đi sửa (Start repair) khi mang đi sửa xong sách có trạng thái là In_Repair. Trường hợp sửa xong (End Repair) mình mạn phép cho ở trạng thái Borrowed. Và Cuối cùng mượn xong thì chúng ta trả sách (Return) và sách trở thành trạng thái (Available) người đọc khác có thể mượn sách.<br>
-  <h3>5. State Design pattern:  </h3>

![](https://images.viblo.asia/dd6b43cb-b51e-4ea3-b470-ced0aac1903c.png)

- Code: 

```
public interface States {
	public void on();
	public void off();
}
```


```
public class Available implements States {

	@Override
	public void on() {
		System.out.println("get from AVAILABLE to BORROWED");
	}

	@Override
	public void off() {
		System.out.println("get from AVAILABLE to EMPTY STATE");
	}

}
```

```
public class Borrowed implements States{

	@Override
	public void on() {
		System.out.println("get from BORROWED to IN_REPAIR");
	}

	@Override
	public void off() {
		System.out.println("get from BORROWED to AVAILABLE");
	}

}
```

```
public class InRepair implements States{

	@Override
	public void on() {
		// TODO Auto-generated method stub
		System.out.println("get from IN_REPAIR to IN_REPAIR");
	}

	@Override
	public void off() {
		// TODO Auto-generated method stub
		System.out.println("get from IN_REPAIR to BORROWED");
	}

}
```

- Cuối cùng configure cho State của mình: 

```
public class FiniteStateMachine {
	 // 2. states
    private States[] states = {new Available(), new Borrowed(), new InRepair()};
    // 4. transitions
    private int[][] transition = {{0,1}, {0,2}, {1,2}};
    // 3. current
    private int current = 0;

    private void next(int msg) {
        current = transition[current][msg];
    }

    // 5. All client requests are simply delegated to the current state object
    public void on() {
        states[current].on();
        next(1);
    }

    public void off() {
        states[current].off();
        next(0);
    }
}
```

```
public class StateMachineMain {
	public static void main(String[] args) {
	FiniteStateMachine fsm = new FiniteStateMachine();
    int[] msgs = {1, 1, 1, 0 , 1};
    for (int msg : msgs) {
        if (msg == 1) {
            fsm.on();
        } else if (msg == 0) {
            fsm.off();
        }
    }
	}
}
```

- Chương trình lúc này in ra :

```
get from AVAILABLE to BORROWED
get from BORROWED to IN_REPAIR
get from IN_REPAIR to EMPTY STATE
get from IN_REPAIR to BORROWED
get from BORROWED to IN_REPAIR
```

- theo công thức (3) thì chúng ta có :
    - Events : Borrow, Start Repair, End Repair, Return;
    - States: Available, Borrowed, InRepair
    - VD: Available + (Events) Borrow = Borrowed 
    - Mỗi lần chuyển đổi từ trạng thái này sang trạng thái khác người ta gọi là Transitions
    - ở đây mình quy ước On() là mũi tên hướng lên, Off() là mũi tên trở lại.
    - Nhìn vào Sơ đồ thì ta thấy sự chuyển đổi trạng thái {1, 1, 1, 0 , 1}.Ban đầu là Available On() => trạng thái Borrowed. Borrowed On() chuyển sang IN_REPAIR... 
-  <b>Phần tới mình sẽ giới thiệu về Spring state machine</b>