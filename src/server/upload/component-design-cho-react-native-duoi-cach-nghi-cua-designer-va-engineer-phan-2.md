Nguồn: https://tech.kitchhike.com/entry/2018/09/30/230000

# Các quan điểm khác ngoài Atomic Design
Ở đây tôi sẽ giới thiểu những điểm mấu chốt trong Component design nếu Engineer cân nhắc trên các quan điểm khác ngoài Atomic Design. Atomic Design cũng là một phần trong đó.
* Atomic Design
* Idempotent and Stateless
* Division of responsibilities (phân tách logic và view)
* Frequency of change

## 1. Atomic Design
Với Atomic design thông thường,  chúng tôi đang phải ý thức về Atoms, Molecules, Organisms để design. Hiện tại thì chưa tiến hành đến phân chia Directory nhưng nếu các component được tổng hợp lại sẽ dễ quản lý hơn, nên chúng tôi đang nghĩ trong tương lai sẽ phân chia Directory.

## 2. Idempotent and Stateless
Tôi sẽ bắt đầu với Stateless Functional Components. Chúng tôi đang đi theo phương châm tạo component mang tính stateless nhất có thể. Khi thiết kế, components không cần state chính là Stateless Functional Components. Nó có quan hệ xử lý như sau đối với Automic design.
| | Phương pháp định nghĩa | State | Tái sử dụng | 
| -------- | -------- |  -------- | -------- |
|Atoms | Functional Component | Không | Có | 
|Molecules | Functional Component | Không | Có | 
|Organisms | Class Component | Có | Không | 
|Templates | Class Component | Có | Không | 
 
Chúng tôi đang cố gắng đưa ra được Functional Component chỉ sử dụng props mà không sử dụng state, nhắm đến việc convert component sang DOM mà không có tác dụng phụ nào.
Tuy nhiên hiện tại kể cả Molecules cũng đang mang state nên khó có thể giải quyết triệt để.

## 3. Phân tách nhiệm vụ (phân chia Logic và View)
Chúng tôi đang dùng Rails để phát triển Server site của KitchHike. Chúng ta có thể cảm nhận được sự khác biệt so với MVC khi viết logic vào file View. Lý tưởng là tạo một View modal class rồi phân chia View nhưng rất dễ viết logic dài dòng vào trong component. Nên chúng tôi cố gắng đưa logic vào phía API (phía server) còn tầng View (phía app) thì không để logic, thế nhưng lại có những cái không để ở phía app thì không được nên khá đau đầu.

## 4. Mật độ thay đổi
Chúng tôi cố gắng bắt đầu với những chỗ thường xuyên thay đổi. Đây là cách suy nghĩ từ lập trường hướng đối tượng khi phát triển trên Rails, nhưng tôi cho rằng đây là quan điểm có thể chia sẻ với hướng component và nó rất quan trọng khi xây dựng một hệ thống mạnh mẽ.

# Component design của Designer và Engineer
Từ đây tôi sẽ giới thiệu về quá trình component design của Designer và Engineer trong team KitchHike.

## Designer
Designer dựa trên những cái như UI hay nguyện vọng của member để tiến hành xử lý requirement. Engineer member thường join MTG ở giai đoạn khi requirement đã chốt. Requirement sẽ tổng hợp ở Kibela.
Dựa trên các requirement đã được chốt chúng tôi tạo design trên Sketch rồi thông qua Zeplin để tạo Design parts catalog theo symbol trên Sketch.

## Engineer
Engineer dựa trên Design parts catalog mà designer đã tạo để xây dựng component. Vì designer tạo part trên quan điểm Atomic design nên engineer sẽ phải cân nhắc đến Idempotent and Stateless, Division of responsibilities, Frequency of change và đứng trên quan điểm tính tái sử dụng để chia thành Atom, Molecules, Organisms.
Hiện tại thì việc review design cho component đã implement sẽ được designer thực hiện bằng cách confirm trên app đã built nhưng nếu nhìn từ hướng phát triển dài hạn sau này thì sẽ tiện hơn nếu chúng ta component catalog hóa được nó, vậy nên chúng tôi đang tiến hành từng bước để có thể confirm trên Storybook.

# Tổng kết
Vậy là tôi đã giới thiệu xong component design được tiến hành như thế nào trên phương châm của designer và engineer khi phát triển Native app KitchHike.
* Component mang nhiều nhiệm vụ liên quan đến cả designer và engineer
* Tùy trường hợp mà tính cấu trúc dưới quan điểm design và tính tái sử dụng trên quan điểm code sẽ nảy sinh mâu thuẫn
* Khi thiết kế component, ngoài Atomic Design cần cân nhắc đến Idempotent and Stateless, Division of responsibilities, Frequency of change.

Chúng tôi đang nhắm đến xây dựng một team trong đó designer và engineer có thể communicate mật thiết để design tốt hơn.