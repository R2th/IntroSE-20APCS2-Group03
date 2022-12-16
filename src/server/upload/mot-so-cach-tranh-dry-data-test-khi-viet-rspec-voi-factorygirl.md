**1. Đặt vấn đề.**


-----

Với nhưng người làm việc với Rails chắc hẳn đã từng và đang viết rspec hằng ngày. Trong khi viết rspec thì việc tạo data test khác là quan trọng việc tạo data test giúp cho chúng ta dễ dàng viết code test hơn. Và một gem mạnh mẽ để tạo data đó là  "FactoryGirl".Mặc dù có thể bạn làm nhiều với gem này nhưng để thực sự tạo ra những data không thừa không thiếu nhằm cho việc chạy test nhanh hơn hay tránh duplidate data,.. Thì hôm nay e/m muốn nếu ra một số cách mà e/m thường làm khi tạo data test và cũng như một số cú pháp cơ bản của FactoryGirl.


-----


**2.Nôi dung**

**2.1  Squences trong factory**


-----


 Vấn đề chúng ta thường gặp ở đây là nếu như bạn muốn tạo user có email có có tên là "emai_1@gmail.com", email_2@gmail.com,.. và cứ thế chúng ta có thể sẽ viết nó như sau:
   

-----

  
        
          FactoryGirl.define  do
             factory:book do
              ...........
                email "  email_1@gmail.com
              ..........
             end
          end
   

-----


 Với cách viết như trên thì sau khi test thì sẽ bị duplicate email ta dùng Squences như sau:
 

-----


     
          ````
              FactoryGirl.define  do
                 factory:book do
                  ...........
                    sequence(:email) {|n|"email#{n}@gmail.com"}
                  ..........
                 end
              end
            ```
            
**2.2  Association trong FatoryGirl**


-----


   Giả sử ta có model Note có quan hệ với user và project thì đơn giản ta sẽ khởi tạo như sau:
   

-----


   
 ```
  FactoryGirl.define do
          factory:note do 
            message"My important note."
            association:project
            association:user
         end
       end
```
  
**2.3 Thêm alias cho model factories**


-----


  Trong khi test nhiều khi ta muốn dùng một alias cho data để có thể phù hợp với bối cảnh test ta có sử dụng bằng cách thêm alias như sau:


-----
        FactoryGirl.define do 
              factory:user, aliases:[:owner] do
              ...........               
              end
          end
     ```
     

-----

**2.4 Tránh duplicate trong factory**
    
-----
Ở trên mình hơn lan man về FactoryGirl một chút  :D . Trong khi tạo data test thì như mình biết sẽ có những cách như sau: 

Giả sử t có 1 cái task công việc . yêu cầu đề ra là nếu project đó hoàn thành trong ngày hoặc tương lại thì project đó ko bị trể và ngược lại. suy nghĩ ban đầu ta sẽ sẽ phải tạo 3 data test cho 3 trường hợp của project như sau:

-----


                
                   FactoryGirl.definedo
                       factory:project do
                          sequence(:name) {|n| "Test project #{n}" name}
                          description: "adsasdas"
                          due_on 1.week.from_now
                          association :owner
                       end
                       
                      factory:project_due_yesterday, class: Project do
                            sequence(:name) {|n| "Test project #{n}" name}
                             description: "adsasdas"
                           due_on 1.day.ago
                           association :owner
                       end

                    factory:project_due_today, class: Project do
                        sequence(:name) {|n| "Test project #{n}" name}
                        description: "adsasdas"
                        due_on Date.current.in_time_zone
                        association :owner
                   end

                  factory:project_due_tomorrow, class: Project do
                      sequence(:name) {|n| "Test project #{n}" name}
                      description: "adsasdas"
                      due_on 1.day.from_now
                      association :owner
                 end
        end
       

-----


 ==> Khi ta test ta sẽ gọi như sau:  FactoryGirl.create(:project_due_tomorow)



-----


 Cách tạo như trên không sai nhưng có một cách ngắn hơn đó là sử dụng kế thừa trong factory


-----
                    FactoryGirl.definedo
                      factory:project do
                         sequence(:name) {|n| "Test project #{n}" name}
                         description: "adsasdas"
                         due_on 1.week.from_now
                         association :owner
                     end

                    factory:project_due_yesterday do
                       due_on 1.day.ago
                    end

                    factory:project_due_today do
                           due_on Date.current.in_time_zone
                   end
              end


-----


Và khi đó gọi ra:   FactoryGirl.create(:project_due_tomorow)
   ==> Ngoài ra t còn 1 kỹ thuật để giảm thiểu duplication date là sử dung trait cách mà để trộn các object phức tạp lại với nhau:


-----

           FactoryGirl.definedo
             factory:project do
               sequence(:name) {|n| "Test project #{n}" name}
               description: "adsasdas"
               due_on 1.week.from_now
               association :owner
            end

           trait :project_due_yesterday do
             due_on 1.day.ago
          end

          trait :project_due_today do
             due_on Date.current.in_time_zone
          end
       end
**** 3. Kết luận****


-----


 Trên dó là những hiểu biết của mình mong m.n chấp nhận và có những góp ý để những bài biết sau của mình có chất lượng hơn. Xin cảm ơn mọi người.
 

-----