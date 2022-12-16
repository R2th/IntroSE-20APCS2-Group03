#  1. Giới Thiệu Vấn Đề
chào các bạn, ttdat đây. rất lâu rồi mình mới viết bài mới trên Viblo, hôm nay mình vừa gặp một problem query trên jpa mà mình rất muốn giới thiệu nó đến với các bạn, nhất là những bạn mới hoặc những bạn không show query sẽ không biết về vấn đề này, jpa sẽ sinh ra rất nhiều query và những query này không ảnh hưởng đến kết quả nhưng lại ảnh hưởng rất nhiều đến performance (và cái server của tui nó chơi max query có 3600, tui query 15'' là sập :((, phải tìm cách fix thôi, mấy bạn có vps mấy tỉ bỏ qua bài này được nha :))  ) kiến web app của bạn chậm đi, cụ thể trong ví dụ dưới đây

**Bài viết này không dành cho ai đó giàu lúc nào cũng muốn nhét ram 128GB với 2TB ssd vô cái server, chứ em sanh diên nghèo sài heroku**

### a. mô tả ví dụ

ví dụ của mình bao gồm các bảng đại loại như sau :

![image.png](https://images.viblo.asia/3e67cf6f-1e15-4ef3-bfda-30d39d19a788.png)

**Lưu ý : những thuộc tính, bảng không liên quan đến bài viết sẽ bị mình lược bỏ

**Blog.enity**
```Java

@Entity
@Table
@Data
@NoArgsConstructor
public class Blog {
        ..... /// mấy thuộc tính khác
        @Id
        @GeneratedValue(strategy=GenerationType.IDENTITY)
        private Integer id;
        
        /// image của blog (1-1 relationship)
        @OneToOne(fetch = FetchType.LAZY, optional = false)
        @Fetch(FetchMode.JOIN)
        @JoinColumn(name = "image", referencedColumnName = "id")
        private Image image;
        
          /// comment của blog (1 - many relationship)
        @OneToMany(mappedBy = "blog_comment")
        @ElementCollection(fetch = FetchType.LAZY)
        private Set<Comment> comments = new HashSet<>();
}
```
**Image.java**
```Java

@Entity
@Table(name = "user_image")
@Data
@NoArgsConstructor
public class Image {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
    
	.....// thuộc tính khác
    
	@ManyToOne
	@JoinColumn(name = "user_id",  referencedColumnName = "id")
	private Account account;
	
	@OneToMany(mappedBy = "image")
	private Set<Blog> blog;
}
```
**Comments**
```Java

@Entity
@Table(name = "user_comment")
@Data
@NoArgsConstructor
public class Comment {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
    // mấy thuộc tính khác ....
	// 1 comment has one person
	@ManyToOne()
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private Account account;

	@ManyToOne(targetEntity = Blog.class)
	@JoinColumn(name = "blog_id", referencedColumnName = "id")
	private Blog blog_comment;
}
```
**Account enity**
```Java

@Entity
public class Account {
	@Id
	@Getter
	@Setter
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
    
    /// mấy thuộc tính khác ......
    
	//1 human has many blogs
	@OneToMany(mappedBy = "account",fetch = FetchType.LAZY)
	@Getter
	private Set<Blog> listBlog = new HashSet<>();
	
	//1 human has many image
	@OneToMany(mappedBy = "account",fetch = FetchType.LAZY)
	@Getter
	private Set<Image> listImage = new HashSet<>();
	
	@OneToMany(mappedBy = "account")
	private Set<Comment> comments;
}
```
tiếp theo chúng ta sẽ thêm cái jpa reponsitory cho nó, tạo cái interface là xong
**blog jpa**
```Java
//ez
public interface BlogResponsitory extends JpaRepository<Blog, Integer> {}
```
cuối cùng là query
```Java

@Autowired BlogResponsitory blogResponsitory;
/// mình lược đi mấy cái kia cho ngắn
blogResponsitory.findAll()

```
sau đó chúng ta cùng xem query (tôi của một tháng trước vẫn mơ về một dòng query đẹp với nhiều lệnh join ngay hàng thẳng lối nhưng jpa không như mơ :((  )
```

Hibernate: select blog0_.id as id1_1_, blog0_.author as author9_1_, blog0_.content as content2_1_, blog0_.description as descript3_1_, blog0_.edit_date as edit_dat4_1_, blog0_.image as image10_1_, blog0_.publish_date as publish_5_1_, blog0_.love_stat as love_sta6_1_, blog0_.view_stat as view_sta7_1_, blog0_.title as title8_1_ from blog blog0_
Hibernate: select account0_.id as id1_0_0_, account0_.address as address2_0_0_, account0_.brief as brief3_0_0_, account0_.email as email4_0_0_, account0_.full_name as full_nam5_0_0_, account0_.image as image6_0_0_, account0_.password as password7_0_0_, account0_.role as role12_0_0_, account0_.social as social8_0_0_, account0_.status as status9_0_0_, account0_.token as token10_0_0_, account0_.username as usernam11_0_0_, role1_.id as id1_5_1_, role1_.name as name2_5_1_ from account account0_ left outer join role role1_ on account0_.role=role1_.id where account0_.id=?

Hibernate: select image0_.id as id1_8_0_, image0_.user_id as user_id3_8_0_, image0_.name as name2_8_0_, account1_.id as id1_0_1_, account1_.address as address2_0_1_, account1_.brief as brief3_0_1_, account1_.email as email4_0_1_, account1_.full_name as full_nam5_0_1_, account1_.image as image6_0_1_, account1_.password as password7_0_1_, account1_.role as role12_0_1_, account1_.social as social8_0_1_, account1_.status as status9_0_1_, account1_.token as token10_0_1_, account1_.username as usernam11_0_1_, role2_.id as id1_5_2_, role2_.name as name2_5_2_ from user_image image0_ left outer join account account1_ on image0_.user_id=account1_.id left outer join role role2_ on account1_.role=role2_.id where image0_.id=?

Hibernate: select image0_.id as id1_8_0_, image0_.user_id as user_id3_8_0_, image0_.name as name2_8_0_, account1_.id as id1_0_1_, account1_.address as address2_0_1_, account1_.brief as brief3_0_1_, account1_.email as email4_0_1_, account1_.full_name as full_nam5_0_1_, account1_.image as image6_0_1_, account1_.password as password7_0_1_, account1_.role as role12_0_1_, account1_.social as social8_0_1_, account1_.status as status9_0_1_, account1_.token as token10_0_1_, account1_.username as usernam11_0_1_, role2_.id as id1_5_2_, role2_.name as name2_5_2_ from user_image image0_ left outer join account account1_ on image0_.user_id=account1_.id left outer join role role2_ on account1_.role=role2_.id where image0_.id=?

Hibernate: select image0_.id as id1_8_0_, image0_.user_id as user_id3_8_0_, image0_.name as name2_8_0_, account1_.id as id1_0_1_, account1_.address as address2_0_1_, account1_.brief as brief3_0_1_, account1_.email as email4_0_1_, account1_.full_name as full_nam5_0_1_, account1_.image as image6_0_1_, account1_.password as password7_0_1_, account1_.role as role12_0_1_, account1_.social as social8_0_1_, account1_.status as status9_0_1_, account1_.token as token10_0_1_, account1_.username as usernam11_0_1_, role2_.id as id1_5_2_, role2_.name as name2_5_2_ from user_image image0_ left outer join account account1_ on image0_.user_id=account1_.id left outer join role role2_ on account1_.role=role2_.id where image0_.id=?

Hibernate: select accounts_l0_.blog_id as blog_id2_3_2_, accounts_l0_.user_id as user_id1_3_2_, account1_.id as id1_0_0_, account1_.address as address2_0_0_, account1_.brief as brief3_0_0_, account1_.email as email4_0_0_, account1_.full_name as full_nam5_0_0_, account1_.image as image6_0_0_, account1_.password as password7_0_0_, account1_.role as role12_0_0_, account1_.social as social8_0_0_, account1_.status as status9_0_0_, account1_.token as token10_0_0_, account1_.username as usernam11_0_0_, role2_.id as id1_5_1_, role2_.name as name2_5_1_ from blog_user_like accounts_l0_ inner join account account1_ on accounts_l0_.user_id=account1_.id left outer join role role2_ on account1_.role=role2_.id where accounts_l0_.blog_id in (select blog0_.id from blog blog0_)

Hibernate: select comments0_.blog_id as blog_id5_7_0_, comments0_.id as id1_7_0_, comments0_.id as id1_7_1_, comments0_.user_id as user_id4_7_1_, comments0_.blog_id as blog_id5_7_1_, comments0_.content as content2_7_1_, comments0_.publish_date as publish_3_7_1_, account1_.id as id1_0_2_, account1_.address as address2_0_2_, account1_.brief as brief3_0_2_, account1_.email as email4_0_2_, account1_.full_name as full_nam5_0_2_, account1_.image as image6_0_2_, account1_.password as password7_0_2_, account1_.role as role12_0_2_, account1_.social as social8_0_2_, account1_.status as status9_0_2_, account1_.token as token10_0_2_, account1_.username as usernam11_0_2_, role2_.id as id1_5_3_, role2_.name as name2_5_3_ from user_comment comments0_ left outer join account account1_ on comments0_.user_id=account1_.id left outer join role role2_ on account1_.role=role2_.id where comments0_.blog_id=?

Hibernate: select comments0_.blog_id as blog_id5_7_0_, comments0_.id as id1_7_0_, comments0_.id as id1_7_1_, comments0_.user_id as user_id4_7_1_, comments0_.blog_id as blog_id5_7_1_, comments0_.content as content2_7_1_, comments0_.publish_date as publish_3_7_1_, account1_.id as id1_0_2_, account1_.address as address2_0_2_, account1_.brief as brief3_0_2_, account1_.email as email4_0_2_, account1_.full_name as full_nam5_0_2_, account1_.image as image6_0_2_, account1_.password as password7_0_2_, account1_.role as role12_0_2_, account1_.social as social8_0_2_, account1_.status as status9_0_2_, account1_.token as token10_0_2_, account1_.username as usernam11_0_2_, role2_.id as id1_5_3_, role2_.name as name2_5_3_ from user_comment comments0_ left outer join account account1_ on comments0_.user_id=account1_.id left outer join role role2_ on account1_.role=role2_.id where comments0_.blog_id=?
Hibernate: select types0_.blog_id as blog_id1_2_0_, types0_.type_id as type_id2_2_0_, type1_.id as id1_6_1_, type1_.description as descript2_6_1_, type1_.level as level3_6_1_, type1_.name as name4_6_1_, type1_.name_en as name_en5_6_1_ from blog_type types0_ inner join type type1_ on types0_.type_id=type1_.id where types0_.blog_id=?
Hibernate: select comments0_.blog_id as blog_id5_7_0_, comments0_.id as id1_7_0_, comments0_.id as id1_7_1_, comments0_.user_id as user_id4_7_1_, comments0_.blog_id as blog_id5_7_1_, comments0_.content as content2_7_1_, comments0_.publish_date as publish_3_7_1_, account1_.id as id1_0_2_, account1_.address as address2_0_2_, account1_.brief as brief3_0_2_, account1_.email as email4_0_2_, account1_.full_name as full_nam5_0_2_, account1_.image as image6_0_2_, account1_.password as password7_0_2_, account1_.role as role12_0_2_, account1_.social as social8_0_2_, account1_.status as status9_0_2_, account1_.token as token10_0_2_, account1_.username as usernam11_0_2_, role2_.id as id1_5_3_, role2_.name as name2_5_3_ from user_comment comments0_ left outer join account account1_ on comments0_.user_id=account1_.id left outer join role role2_ on account1_.role=role2_.id where comments0_.blog_id=?

Hibernate: select comments0_.blog_id as blog_id5_7_0_, comments0_.id as id1_7_0_, comments0_.id as id1_7_1_, comments0_.user_id as user_id4_7_1_, comments0_.blog_id as blog_id5_7_1_, comments0_.content as content2_7_1_, comments0_.publish_date as publish_3_7_1_, account1_.id as id1_0_2_, account1_.address as address2_0_2_, account1_.brief as brief3_0_2_, account1_.email as email4_0_2_, account1_.full_name as full_nam5_0_2_, account1_.image as image6_0_2_, account1_.password as password7_0_2_, account1_.role as role12_0_2_, account1_.social as social8_0_2_, account1_.status as status9_0_2_, account1_.token as token10_0_2_, account1_.username as usernam11_0_2_, role2_.id as id1_5_3_, role2_.name as name2_5_3_ from user_comment comments0_ left outer join account account1_ on comments0_.user_id=account1_.id left outer join role role2_ on account1_.role=role2_.id where comments0_.blog_id=?

.... // nhiều bảng join thì nhiều query hơn
```
==> các bạn có thấy khủng khiếp không, chỉ với 1 cái api mà jpa sinh ra nhiều query tới vậy thì web nào mà chịu nổi

# 2. Giải quyết vấn đề
### a. xử lí cơ bản

giờ thằng nào sinh ra thì ba má của nó sẽ giải quyết thôi, ở đây mình sài Enity Manager, các bước cài đặt vô cùng đơn giản 
**Blog enity**
ở enity chúng ta thêm annonation ``` @NamedEntityGraph  ```
```Java
@NamedEntityGraph(name = "joinedJava", includeAllAttributes = true)
public class Blog {  ....  }
```
**blog jpa**
```Java
public interface BlogResponsitory extends JpaRepository<Blog, Integer> {
    /// để ý vụ tên nha mọi người
    @EntityGraph("joined")
	 List<Blog> findAll();
}
```

**Lưu ý:**  ông nào không dùng jpa mà dùng hibernate thì thêm như sau
```Java
public List<?> blogRecommend(int rows){
        EntityGraph<?> eg = entityManager.getEntityGraph("joined");
        Query q = entityManager.createQuery("select b from Blog b").setHint("javax.persistence.fetchgraph", eg);
		return q.getResultList();   	
	 }
```
giờ chúng ta chạy lại cái query xem sao
```
Hibernate: select blog0_.id as id1_1_0_, type2_.id as id1_6_1_, account4_.id as id1_0_2_, account5_.id as id1_0_3_, comments6_.id as id1_7_4_, image7_.id as id1_8_5_, blog0_.author as author9_1_0_, blog0_.content as content2_1_0_, blog0_.description as descript3_1_0_, blog0_.edit_date as edit_dat4_1_0_, blog0_.image as image10_1_0_, blog0_.publish_date as publish_5_1_0_, blog0_.love_stat as love_sta6_1_0_, blog0_.view_stat as view_sta7_1_0_, blog0_.title as title8_1_0_, type2_.description as descript2_6_1_, type2_.level as level3_6_1_, type2_.name as name4_6_1_, type2_.name_en as name_en5_6_1_, types1_.blog_id as blog_id1_2_0__, types1_.type_id as type_id2_2_0__, account4_.address as address2_0_2_, account4_.brief as brief3_0_2_, account4_.email as email4_0_2_, account4_.full_name as full_nam5_0_2_, account4_.image as image6_0_2_, account4_.password as password7_0_2_, account4_.role as role12_0_2_, account4_.social as social8_0_2_, account4_.status as status9_0_2_, account4_.token as token10_0_2_, account4_.username as usernam11_0_2_, accounts_l3_.blog_id as blog_id2_3_1__, accounts_l3_.user_id as user_id1_3_1__, account5_.address as address2_0_3_, account5_.brief as brief3_0_3_, account5_.email as email4_0_3_, account5_.full_name as full_nam5_0_3_, account5_.image as image6_0_3_, account5_.password as password7_0_3_, account5_.role as role12_0_3_, account5_.social as social8_0_3_, account5_.status as status9_0_3_, account5_.token as token10_0_3_, account5_.username as usernam11_0_3_, comments6_.user_id as user_id4_7_4_, comments6_.blog_id as blog_id5_7_4_, comments6_.content as content2_7_4_, comments6_.publish_date as publish_3_7_4_, comments6_.blog_id as blog_id5_7_2__, comments6_.id as id1_7_2__, image7_.user_id as user_id3_8_5_, image7_.name as name2_8_5_ from blog blog0_ left outer join blog_type types1_ on blog0_.id=types1_.blog_id left outer join type type2_ on types1_.type_id=type2_.id left outer join blog_user_like accounts_l3_ on blog0_.id=accounts_l3_.blog_id left outer join account account4_ on accounts_l3_.user_id=account4_.id left outer join account account5_ on blog0_.author=account5_.id left outer join user_comment comments6_ on blog0_.id=comments6_.blog_id left outer join user_image image7_ on blog0_.image=image7_.id

Hibernate: select account0_.id as id1_0_0_, account0_.address as address2_0_0_, account0_.brief as brief3_0_0_, account0_.email as email4_0_0_, account0_.full_name as full_nam5_0_0_, account0_.image as image6_0_0_, account0_.password as password7_0_0_, account0_.role as role12_0_0_, account0_.social as social8_0_0_, account0_.status as status9_0_0_, account0_.token as token10_0_0_, account0_.username as usernam11_0_0_, role1_.id as id1_5_1_, role1_.name as name2_5_1_ from account account0_ left outer join role role1_ on account0_.role=role1_.id where account0_.id=?
```
hmmm, có vẻ nai xừ hơn đống hổ lốn lúc này tuy nhiên sao lại có một cái query lòi ra thêm zị, nó đâu ra ???, trông ghét ghê á , tui sẽ giới thiệu cách xử đẹp nó ở phần tiếp theo đây

### b. Vấn đề phát sinh

sau 7749 lần thêm sửa xóa trong cái enity, tui mới phát hiện ra rằng nó liên quan đến thằng comments (không biết vấn đề nằm ở thuộc tính nào nữa :)), nhưng vì nó query liên quan đến account thì chắc thuộc tính liên quan đến account rùi), bây giờ tui thêm attribute vào trong  ``` @NamedEntityGraph  ``` giúp nó có khả năng tóm lấy thằng account ở trong comment enity, cách làm thì vô cùng đơn giản

```Java

@NamedEntityGraph(name = "joined", includeAllAttributes = true ,attributeNodes = {
			@NamedAttributeNode(value = "comments", subgraph = "comments")
			}, subgraphs = @NamedSubgraph(name = "comments", attributeNodes = { @NamedAttributeNode("account") }))
public class Blog {
    @Getter
	@Setter
	@OneToMany(mappedBy = "blog_comment")
	@ElementCollection(fetch = FetchType.LAZY)
	private Set<Comment> comments = new HashSet<>();
}
```
giờ query lại cái nào
```Java
Hibernate: select blog0_.id as id1_1_0_, account1_.id as id1_0_1_, image2_.id as id1_8_2_, account4_.id as id1_0_3_, comments5_.id as id1_7_4_, account6_.id as id1_0_5_, type8_.id as id1_6_6_, blog0_.author as author9_1_0_, blog0_.content as content2_1_0_, blog0_.description as descript3_1_0_, blog0_.edit_date as edit_dat4_1_0_, blog0_.image as image10_1_0_, blog0_.publish_date as publish_5_1_0_, blog0_.love_stat as love_sta6_1_0_, blog0_.view_stat as view_sta7_1_0_, blog0_.title as title8_1_0_, account1_.address as address2_0_1_, account1_.brief as brief3_0_1_, account1_.email as email4_0_1_, account1_.full_name as full_nam5_0_1_, account1_.image as image6_0_1_, account1_.password as password7_0_1_, account1_.role as role12_0_1_, account1_.social as social8_0_1_, account1_.status as status9_0_1_, account1_.token as token10_0_1_, account1_.username as usernam11_0_1_, image2_.user_id as user_id3_8_2_, image2_.name as name2_8_2_, account4_.address as address2_0_3_, account4_.brief as brief3_0_3_, account4_.email as email4_0_3_, account4_.full_name as full_nam5_0_3_, account4_.image as image6_0_3_, account4_.password as password7_0_3_, account4_.role as role12_0_3_, account4_.social as social8_0_3_, account4_.status as status9_0_3_, account4_.token as token10_0_3_, account4_.username as usernam11_0_3_, accounts_l3_.blog_id as blog_id2_3_0__, accounts_l3_.user_id as user_id1_3_0__, comments5_.user_id as user_id4_7_4_, comments5_.blog_id as blog_id5_7_4_, comments5_.content as content2_7_4_, comments5_.publish_date as publish_3_7_4_, comments5_.blog_id as blog_id5_7_1__, comments5_.id as id1_7_1__, account6_.address as address2_0_5_, account6_.brief as brief3_0_5_, account6_.email as email4_0_5_, account6_.full_name as full_nam5_0_5_, account6_.image as image6_0_5_, account6_.password as password7_0_5_, account6_.role as role12_0_5_, account6_.social as social8_0_5_, account6_.status as status9_0_5_, account6_.token as token10_0_5_, account6_.username as usernam11_0_5_, type8_.description as descript2_6_6_, type8_.level as level3_6_6_, type8_.name as name4_6_6_, type8_.name_en as name_en5_6_6_, types7_.blog_id as blog_id1_2_2__, types7_.type_id as type_id2_2_2__ from blog blog0_ left outer join account account1_ on blog0_.author=account1_.id left outer join user_image image2_ on blog0_.image=image2_.id left outer join blog_user_like accounts_l3_ on blog0_.id=accounts_l3_.blog_id left outer join account account4_ on accounts_l3_.user_id=account4_.id left outer join user_comment comments5_ on blog0_.id=comments5_.blog_id left outer join account account6_ on comments5_.user_id=account6_.id left outer join blog_type types7_ on blog0_.id=types7_.blog_id left outer join type type8_ on types7_.type_id=type8_.id
```
giờ chỉ còn 1 query thui, đúng yêu cầu rồi :)))
# 4. Lời Kết

cảm ơn các bạn đã đọc bài này ủng hộ mình, mình là sinh viên chưa đi làm tính ra là fresher của fresher luôn đó, kiến thức lượm đâu đó trên mạng thôi, mong các bạn ném đá nhẹ tay, hẹn các bạn trong bài viết nào đó trong tương lai

# 5. Nguồn Tham Khảo

-https://thorben-janssen.com/jpa-21-entity-graph-part-1-named-entity/ : (Enity Manager ) trong này giới thiệu về enity manager mà hơi bị sơ sơ
- có một nguồn stackoverflow nữa, mấy ông senior trên đó sẽ giải thích tại sao jpa nó lại làm vậy mà mình mất link r :))