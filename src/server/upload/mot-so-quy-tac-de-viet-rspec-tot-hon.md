### Lời mở đầu
Đối với các dự án ruby, việc viết rspec đã trở thành một công việc không thể thiếu, ngoài việc giúp hạn chế bug, việc viết rspec tốt còn giúp người khác dễ hiểu logic của dự án hơn.
Viết rspec được gọi là tốt, ngoài việc test đủ test case thì nó còn phải dễ hiểu, gọn gàng sạch sẽ. Và dưới đây mình sẽ giới thiệu một số rule để rspec của chúng ta được tuyệt vời hơn.

### Một số quy tắc khi viết rspec
Chúng ta lấy ví dụ về việc test 1 model FindReaction như sau
```ruby
describe FindReaction do
  #Spec 1
  it "should return no reaction template when there are no reaction templates" do
    post = create :post, locale: "en", type: "basic"
    reaction = FindReaction.for(@post).reaction
    reaction.blank?.should == true
  end
  #Spec 2
  it "should return no reaction template if reaction templates exist, but non fitting" do
    post = create :post, locale: "en", type: "basic"
    reaction1 = ReactionTemplate.create locale: "de", subtypes: ["basic", "top_x"]
    reaction2 = ReactionTemplate.create locale: "en", subtypes: ["slideshow", "top_x"]
    reaction = FindReaction.for(@post).reaction
    reaction.blank?.should == true
  end
  #Spec 3
  it "should return the right reaction if it exists" do
    post = create :post, locale: "en", type: "basic"
    reaction1 = ReactionTemplate.create locale: "en", subtypes: ["basic", "top_x"]
    reaction2 = ReactionTemplate.create locale: "en", subtypes: ["basic", "top_x"]
    reaction3 = ReactionTemplate.create locale: "en" , subtypes: ["slideshow", "top_x"]
    reaction = FindReaction.for(@post).reaction
    reaction.blank?.should == false
    reaction.should eq reaction2
  end
  #Spec 4
  it "should change posts reaction_template when attaching it" do
    post = create :post, locale: "en", type: "basic"
    post.reaction_template.nil?.should == true
    reaction = ReactionTemplate.create locale: "en", subtypes: ["basic", "top_x"]
    FindReaction.for(post).attach
    post.reaction_template.nil?.should == false
    post.reaction_template.should eq reaction
  end
end
```

Mặc dù, cách viết rspec này cho kết quả đúng, nhưng cách viết khá rắc rối và chúng ta có thể viết nó gọn gàng hơn nhờ một số quy tắc sau

Quy tắc 1: Viết rspec gọn gàng hơn, bằng cách sử dụng before block
- Ta nhận thấy là có 1 số đoạn rspec lặp đi lặp lại, việc viết như vậy gây dài dòng khó đọc, bởi vậy ta sẽ viết nó trong before để dùng chung
ví dụ
```ruby
before :each do
    @post = create :post, locale: "en", type: "basic"
end

...
```
Quy tắc 2: Sử dụng before :all thay thế before :each (nếu được)
Giống như việc viết before :each ở trên, thì việc viết như thế này cũng sẽ giúp file rspec gọn gàng hơn, tuy nhiên, chúng ta chỉ nên dùng before :all khi câu lệnh không thay đổi giá trị attributes của model bởi điều này sẽ làm ảnh hưởng đối với các block chạy sau. Nguyên nhân là do
before :each sẽ rollback lại database sau khi rspec thực thi nhưng before :all thì không như vậy. Nếu như có thay đổi model's attributes thì hãy đảm bảo rằng database sẽ được clean sau khi rspec được thực thi.

Quy tắc 3: Sử dụng DESCRIBE để mô tả chức năng của rspec

- Việc viết rspec như trên ví dụ sẽ khiến chúng ta khó có thể hiểu được là viết như vậy để làm gì, test cho cái gì. Chúng ta có thể viết như sau 
````ruby
describe 'có 1 chức năng gì đó được thực hiện ở đây' do
   #Spec 1
   ...
    #Spec 2
    ...
    #Spec 3
    ...
  end
 
  describe 'có 1 chức năng gì đó được thực hiện ở đây' do
    #Spec 4
    ...
  end
````

Quy tắc 4:  Sử dụng create! và save! thay thế cho create và save
Như chúng ta đã biết thì create! và save! sẽ bắt exception và trả về lỗi, còn create và save thì trả về false. Đối với nhiều trường hợp, sử dụng create!, save! trong rspec sẽ giúp chúng ta bắt được chính xác lỗi sẽ gặp phải là gì và việc bắt lỗi càng chi tiết thì càng có lợi trong unit test.

Quy tắc 5: Sử dụng các method BE_ SYNTACTIC của rspec 
giả sử đối với 
```ruby
reaction.blank?.should == true
```
chúng ta có thể viết tốt hơn bằng cách sử dụng me_thod có sẵn là
```ruby
reaction.should be_blank
```
Sau khi áp dụng các quy tắc trên để refactor lại file rspec ban đầu ta sẽ có 
```ruby
describe FindReaction do
  before :all do
    @post = build :post, locale: "en", type: "basic"
  end
  before :each do
    @post.reaction = nil
  end
  
  describe :reaction do
   #Spec 1
    it "should return no reaction template when there are no reaction templates" do
      reaction = FindReaction.for(@post).reaction
      reaction.should be_blank
    end
    #Spec 2
    it "should return no reaction template if reaction templates exist, but non fitting" do
      reaction1 = ReactionTemplate.create! locale: "de", subtypes: ["basic", "top_x"]
      reaction2 = ReactionTemplate.create! locale: "en", subtypes: ["slideshow", "top_x"]
      reaction = FindReaction.for(@post).reaction
      reaction.should be_blank
    end
    #Spec 3
    it "should return the right reaction if it exists" do
      reaction1 = ReactionTemplate.create! locale: @post.locale, subtypes: [@post.type, "top_x"]
      reaction2 = ReactionTemplate.create! locale: @post.locale, subtypes: [@post.type, "top_x"]
      reaction3 = ReactionTemplate.create! locale: @post.locale, subtypes: ["slideshow", "top_x"]
      reaction = FindReaction.for(@post).reaction
      reaction.should_not be_blank
      reaction.should eq reaction2
    end
  end
 
  describe :attach do
    #Spec 4
    it "should change posts reaction_template when attaching it" do
      post.reaction_template.should be_nil
      reaction = ReactionTemplate.create! locale: @post.locale, subtypes: [@post.type, "top_x"]
      FindReaction.for(post).attach
      post.reaction_template.should_not be_nil
      post.reaction_template.should eq reaction
    end  
  end

end
```

Nhìn có vẻ tốt hơn rồi, nhưng viết như thế này vẫn chưa đủ, chúng ta có thể cải thiện tốt hơn nữa bằng một số quy tắc dưới đây

Quy tắc 6: Sử dụng subject
như đã thấy ở trên rspec ví dụ thì đều sử dụng FindReaction.for(@post).reaction test đầu ra của method. Chúng ta có thể viết gọn hơn
```ruby
subject { FindReaction.for(@post).reaction }
```
và sau đó sử dụng subject này để test

Quy tắc 7: Sử dụng EXPECT {} BLOCK để biết là có sự thay đổi giá trị của mục tiêu test
```ruby
expect { some_operation }.to change{something}.from(initial_value).to(final_value)
```

Áp dụng những quy tắc trên chúng ta có thể viết như sau:
```ruby
describe FindReaction do
  before :all do
    @post = build :post, locale: "en", type: "basic"
  end
  before :each do
    @post.reaction = nil
  end
  
  describe :reaction do
    subject { FindReaction.for(@post).reaction }
    #Spec 1
    context "there are no reaction templates" do
      it {should be_blank }
    end
    #Spec 2
    context "reaction templates exist, but non fitting" do
      before :each do
        reaction1 = ReactionTemplate.create! locale: "de", subtypes: ["basic", "top_x"]
        reaction2 = ReactionTemplate.create! locale: "en", subtypes: ["slideshow", "top_x"]
      end
      it {should be_blank }
    end
    #Spec 3
    context "fitting reaction templates exist" do
      before :each do
        @reaction1 = ReactionTemplate.create! locale: @post.locale, subtypes: [@post.type, "top_x"]
        @reaction2 = ReactionTemplate.create! locale: @post.locale, subtypes: [@post.type, "top_x"]
        @reaction3 = ReactionTemplate.create! locale: @post.locale, subtypes: ["slideshow", "top_x"]
      end
      it {should_not be_blank}
      it {should eq @reaction2}
    end

  end
 
  describe :attach do
    #Spec 4
    context "attaching a reaction to post" do
      before :each do
        @reaction = ReactionTemplate.create! locale: @post.locale, subtypes: [@post.type, "top_x"]
      end
      it "should change posts reaction template" do
        expect {
          FindReaction.for(@post).attach
        }.to change{@post.reaction_template}.from(nil).to(@reaction)
      end
    end
  end

end
```

### 3. Kết luận
Việc viết rspec là rất cần thiết, nhưng viết để gọn gàng, dễ hiểu thì lại cần thiết hơn nữa. Ngoài viết chỉ để test các test case để hạn chế sinh ra bug, rspec còn giúp chúng ta hiểu sâu hơn về logic của dự án, biết được chức năng của các method, function trong dự án... Hi vọng, với những quy tắc trên, dù chưa đủ nhưng cũng giúp mọi người có thể cải thiện được rspec trong những dự án của mình.