Chắc hẳn các bạn Dev IOS không còn xa lạ với cụm từ Texture (trước khi là AsyncDisPlayKit), một món quà của Facebook Inc tặng chúng ta để cải thiện performances cho app. Còn nhớ cảm xúc những ngày đầu mò mẫm, nó như một cái gì đó ở ngoài trái đất vậy, hết sức mới lạ và khó tiếp cận. Thế rồi tôi và team lúc đó đã quyết định code bằng Texture cho dự án ở thời điểm đó. Chỉ một ứng dụng đơn giản, không có gì phức tạp về kỹ thuật thế nhưng phải mất 8 tháng team tôi mới xong được bản demo vì nhiều lý do : Không được kéo thả control mà layout bằng code, vừa làm vừa mò, có nhiều lúc bug mà không biết fix làm sao :D. Nhưng rồi chúng tôi cũng phải tự hài lòng với bản thân vì khi demo sản phẩm mà mình đã tạo ra từ nó, một buổi demo có thể nói là thành công khi tất cả đều phải gật đầu về sự mượt mà của app. Vì hoàn cảnh xô đẩy nên đã lâu lâu tôi không được động đến và hôm nay tôi quyết định bỏ ra một thời gian lớn để xem lại nó không sợ quên mất thì phí cả cuộc đời =)). Khi nhìn được chữ "Texture 2.0" tôi hết sức bất ngờ vì cứ ngỡ là giờ nó phải là 8.0 hay 9.0 gì đó và cũng mừng thầm khi biết mình chưa bị bỏ quá xa. Nhưng sau khi đọc những thay đổi tại upgrade 2.0 này thì quả là không đơn giản. Sau đây tôi xin điểm mặt một số thay đổi quan trọng của Upgrade 2.0 này. 

**1. ASDisplayNode** 
- ASDisplayNote như các bạn đã biết thì nó giống UIView trong UIKit của chúng ta. 
- Khi chúng ta add những subnodes thì việc tự động quản lý các subnodes đã có từ trước. Nhưng thay vì cái tên .usesImplicitHierarchyManagement thì giờ sẽ thành .automaticallyManagesSubnodes
- Chức năng huỷ layout cho ASDisplayNode cũng từ cancelLayoutTransitionsInProgress đổi thành cancelLayoutTransition

**2. Updated Interface State Callback Methods**
- Những Callback methods theo state khi chúng ta update interface khá quen thuộc và giờ đã được đổi lại ngắn gọn hơn 

  didEnterPreloadState / didExitPreloadState  -> loadStateDidChange:(BOOL)inLoadState
  
  didEnterDisplayState / didExitDisplayState  -> displayStateDidChange:(BOOL)inDisplayState
  
  didEnterVisibleState / didExitVisibleState -> visibleStateDidChange:(BOOL)isVisible

**3. CollectionView, TableView**
- UICollectionView và UITableView là 2 cái tên quen thuộc cho các bạn dev IOS sử dụng UIKit. Nó quen thuộc đến phát ngán thì hầu hết app nào hay thậm chí là màn hình nào cũng đều sử dụng đến nó:)) . Ở Texture nó có tên gọi ban đầu là ASCollectionView và ASTableView nhưng giờ cũng đã có đối tượng mới để thay thế đó là ASCollectionNode, ASTableNode. 
- Cụ thể là Texture 2.0 đã deprecate hàm init của ASTableView và khuyến khích dev sử dụng ASTableNode để thay thế. 
- Deprecate hàm beginUpdates và endUpdatesAnimated và chỉ cần ngắn gọn lại bằng hàm performBatchUpdates
- constrainedSizeForNodeAtIndexPath method đã chuyển từ dataSource sang delegate để giúp chúng ta có thể định nghĩa đúng hơn về hàm này. Tôi nghĩ cũng khá hợp lý. 
- Còn một lưu ý khá quan trọng khi các bạn dùng ASTableNode hoặc ASCollectionNode rằng chúng đều chạy không đồng bộ nên khi gọi numberOfRowsInSection trên ASCollectionNode sẽ khác với gọi trên ASCollectionView

**Ngoài ra còn hàng loạt thay đổi nhằm cải thiện để support dev tốt hơn ví dụ :** 

- ASButtonNode đã thêm nhưng thuộc tính sau :

 ASButtonNodeImageAlignment
 
 ASButtonNodeImageAlignmentBeginning
 
 ASButtonNodeImageAlignmentEnd
 
 ASButtonNode.imageAlignment
 
![](https://images.viblo.asia/6e4ac0e5-e45f-4efb-b38c-32eb8e76a962.png) 

**- ASDisplayNode của chúng ta cũng remove và add rất nhiều thuộc tính :**

![](https://images.viblo.asia/4bd47481-acba-48b3-9cb7-c37bc1b13601.png)

**- ASCollectionViewProtocol cũng không kém phần sinh động bằng hàng loạt những thay đổi:**
![](https://images.viblo.asia/000df622-859d-4f18-a2a2-8dc2900d01b3.png)

Texture 2.0 lần này quả là bước ngoặt lớn đối với những người đam mê nó. Chắc hẳn các bạn đang rất khó chịu vì sự thay đổi này bởi vì các bạn sẽ phải update khá nhiều cho project sử dụng Texture version thấp hơn. Nhưng đã đam mê thì biết làm sao đúng không các bạn. Rồi mọi nỗ lực, công sức mà các bạn bỏ ra đều được trả lại xứng đáng. Tin tôi đi. Các bạn hãy vào link sau đây để có cái nhìn cụ thể nhất về các thay đổi trong đợt update lần này của Texture nhé. Giờ tôi cũng phải update project của mình để tránh bị miss kiến thức quan trọng này. 
Link : https://texturegroup.org/docs/apidiff-1992-to-20beta1.html. Chào tạm biệt và hẹn gặp lại các bạn nhé. Nếu ai có đồng đam mê về Texture hoặc muốn vào đời thì hãy comment ở dưới, mình thì chưa nắm sâu hết được bởi vì đã quá lâu chưa sờ lại nhưng về kiến thức cơ bản và cách thức giúp các bạn tiếp cận nhanh nhất thì chắc chắn mình sẽ giúp được không ít. Bye !