Khi xây dựng những đối tượng phức tạp, chúng ta thường gặp tình trạng đó là phải tạo ra hàm khởi tạo chứa nhiều tham số.
Ví dụ : cần xây dựng đối tượng Team bao gồm các thuộc tính:
* **Bắt buộc(required parameter)**: memberNum
* **Có thể có hoặc không(optional parameter)**: designerNum, editorNum, engineerNum, mentorNum,... ( có thể có rất nhiều)

Giả sử: Phần lớn các đối tượng Team sẽ không có đầy đủ các thành phần designer, editor,...

Dĩ nhiên là có nhiều pattern để xây dựng constructor cho lớp Team. Do đó việc của mình bây giờ là sẽ phân tích từng cách một để cho các bạn xem hiệu quả của chúng ra sao.
1.  ***Telescoping constructor pattern*** : 
> Cách này nôm na là sẽ *xây dựng constructor đầu tiên cho tất cả required parameter, sau đó lần lượt các constructor sau sẽ cho thêm 1 optional parameter so với constructor trước đó.*

```java
public class Team {
	private int memberNum;		// required
	private int designerNum;	// optional
	private int editorNum;		// optional
	private int engineerNum;	// optional
	private int mentorNum;		// optional

	public Team(int memberNum) {
		this(memberNum, 0);
	}
	public Team(int memberNum, int designerNum) {
		this(memberNum, designerNum, 0);
	}
	public Team(int memberNum, int designerNum, int editorNum) {
		this(memberNum, designerNum, editorNum, 0);
	}
	public Team(int memberNum, int designerNum, int editorNum, int engineerNum) {
		this(memberNum, designerNum, editorNum, engineerNum, 0);
	}
	public Team(int memberNum, int designerNum, int editorNum, int engineerNum,
			int mentorNum) {
		this.memberNum = memberNum;
		this.designerNum = designerNum;
		this.editorNum = editorNum;
		this.engineerNum = engineerNum;
		this.mentorNum = mentorNum;
	}
}
```
Có thể thấy vấn đề có thể gặp phải là:  *nhầm thứ tự các tham số* . Rõ ràng do các tham số ở đây có cùng kiểu nên nếu nhầm thứ tự ( gõ nhầm giữa editorNum và engineerNum) thì compiler không báo lỗi nhưng sẽ tạo ra việc hoạt động sai( không như mong muốn). Mà lỗi này thường khó mò ra.

2.  ***JavaBeans Pattern***: 
> Cách này giúp giải quyết vấn đề trên của Telescoping bằng cách *dùng setter để khởi tạo giá trị cho từng thuộc tính.*
```java
public class Team {
	private int memberNum = -1;		// required: no default value
	private int designerNum = 0;	// optional
	private int editorNum = 0;		// optional
	private int engineerNum = 0;	// optional
	private int mentorNum = 0;		// optional
	public Team(){

	}
	public void setMemberNum(int memberNum) {
		this.memberNum = memberNum;
	}
	public void setDesignerNum(int designerNum) {
		this.designerNum = designerNum;
	}
	public void setEditorNum(int editorNum) {
		this.editorNum = editorNum;
	}
	public void setEngineerNum(int engineerNum) {
		this.engineerNum = engineerNum;
	}
	public void setMentorNum(int mentorNum) {
		this.mentorNum = mentorNum;
	}
}
```
Khi dùng sẽ là: 
```java
Team BBAB = new Team();
BBAB.setMemberNum(5);
BBAB.setDesignerNum(1);
BBAB.setEditorNum(0);
BBAB.setEngineerNum(4);
BBAB.setMentorNum(0);
```
Trông có vẻ ổn? Cái này làm mình nhớ lại khi mới học về Java Swing, mình phải set từng thuộc tính cho đối tượng. Khá là mỏi mắt khi muốn thay đổi thuộc tính nào đó mà không biết viết nó ở chỗ nào. Qua đó, thấy được là nó làm mất đi tính nhất quán. Có thể gặp kết quả không mong muốn khi truy cập vào một thuộc tính chưa được set.
Có cách giải quyết vấn đề này đó là *freezing(đóng băng)* đối tượng - tức là không cho phép truy cập đến khi hoàn tất việc khởi tạo. Tuy nhiên, nó ít được sử dụng trong thực tế do nó sẽ *throws rất nhiều exceptions* và hơn nữa, còn là vì có một cách tốt hơn được trình bày ở dưới đây. 

3. ***Builder Pattern*** : Cách này giúp bạn tận dụng được đồng thời cả tính nhất quán của Telescoping và tính dễ đọc, dễ dùng của JavaBeans. 

>    Cách thức là: khởi tạo đối tượng (Team) thông qua một đối tượng *Builder*(lưu trữ thông tin thuộc tính của Team).  Builder sẽ được khai báo là một **static member class** trong lớp Team

```java
public class Team {
	private int memberNum;	
	private int designerNum;	
	private int editorNum;		
	private int engineerNum;	
	private int mentorNum;		

	public static class Builder{
		private int memberNum;		// required: no default value

		private int designerNum = 0;	// optional
		private int editorNum = 0;		// optional
		private int engineerNum = 0;	// optional
		private int mentorNum = 0;		// optional

		public Builder(int memberNum) {
			super();
			this.memberNum = memberNum;
		}
		public Builder designerNum(int val){
			designerNum = val;
			return this;
		}
		public Builder editorNum(int val){
			editorNum = val;
			return this;
		}
		public Builder engineerNum(int val){
			engineerNum = val;
			return this;
		}
		public Builder mentorNum(int val){
			mentorNum = val;
			return this;
		}
		public Team build(){
			return new Team(this);
		}
	}
	public Team(Builder builder){
		memberNum = builder.memberNum;
		designerNum = builder.designerNum;
		editorNum = builder.editorNum;
		engineerNum = builder.engineerNum;
		mentorNum = builder.mentorNum;
	}

	public static void main(String args[]){
		Team team = new Team.Builder(5).designerNum(3).editorNum(1).
						engineerNum(1).mentorNum(0).build();
	}
}
```
Quá trình khởi tạo Team bao gồm các bước sau:
+ Đầu tiên, gọi hàm khởi tạo Builder để khởi tạo các required parameters
+ Sau đó, gán các giá trị cho các optional parameters. Chú ý các method gán giá trị được xây dựng để sử dụng giống như setter
+ Cuối cùng, gọi hàm build để tạo ra đối tượng của lớp Team. Sau khi hàm build được gọi, đối tượng đó trở nên *immutable*(không thể thay đổi).

Hết rồi nhé. Đó là toàn bộ những điều mình nắm được khi đọc Item 2 của cuốn Effective Java. Các bài sau của mình cũng sẽ nói đến các Item trong cuốn sách này. 
Cảm ơn mọi người nhiều 👤