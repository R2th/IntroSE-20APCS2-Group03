Chuyện là công ty tớ mới chuyển sang dùng gitlab.

Bộ UI của gitlab dở hơi ở chỗ khi tạo pull request, muốn change branch thì lại phải redirect sang 1 trang khác, đợi trang đấy load xong, chọn branch, bấm ok. Không tiện như dùng bitbucket.

Mặc định thì sẽ merge vào development branch (dev) => khi merge lên staging, production thì cần phải chọn lại target branch => đợi load lâu.

Việc này làm đi làm lại gây nhàm chán, mất thời gian và ức chế.

Hôm nay có ông anh trong công ty tớ đưa ra ý kiến custom lại chỗ chọn branch của gitlab. Đang bí content viết bài, tối về lót dạ xong 4 bát cơm, tranh thủ tìm cách giải quyết ngon hơn thì thấy chạy được, nên ngồi viết bài share cho mọi người.

![](https://images.viblo.asia/168d486c-f37c-4288-bc69-80e9148c3359.jpg)

Bài dưới tớ viết cho gitlab. Anh em hoàn toàn có thể dùng thủ đoạn tương tự cho git server nhà mình nha.

## Cách đơn giản
Dùng bookmark, viết 1 đoạn script khi click vào sẽ tự động thêm cái đuôi 
`&merge_request[target_branch]=<branch_name>`

```
javascript:window.location.href=window.location.href+"&merge_request[target_branch]=dev";
 
javascript:window.location.href=window.location.href+"&merge_request[target_branch]=staging";
 
javascript:window.location.href=window.location.href+"&merge_request[target_branch]=production";
```

## Cách ngon hơn
Cách này tận dụng chrome search engine để tạo PR.
* **Bước 1**: Vào chrome://settings/searchEngines
* **Bước 2**: Thêm tên search engine, keyword, thêm vào mục URL with %s in place of query. Bấm save

```
https://gitlab.com/minhphong306/demopr-/merge_requests/new?utf8=✓&merge_request[source_branch]=%s&merge_request[target_branch]=dev
https://gitlab.com/minhphong306/demopr/-/merge_requests/new?utf8=✓&merge_request[source_branch]=%s&merge_request[target_branch]=staging
https://gitlab.com/minhphong306/demopr/-/merge_requests/new?utf8=✓&merge_request[source_branch]=%s&merge_request[target_branch]=production

```

![](https://images.viblo.asia/40d49815-81eb-4470-8203-0defcb5c002b.PNG)
Trong đó:
* **Search engine**: Tên search engine, đặt gì cũng được. Nhưng nên đặt cái tên nào gợi cảm cho dễ nhớ.
* **Keyword**: cái này anh em đặt cho tiện. Ví dụ mình đặt là `prdev` để merge dev, `prstag` để merge staging, `prprod` để merge production.
* **URL with %s in place of query**: Chỗ này là url tạo pull request. `%s` chính là source branch của anh em.

Use case đầy đủ sẽ thế này:
* Click vào thanh URL của chrome
* Gõ `prdev`, bấm `tab`, gõ tên source branch cần merge (VD: `feature/sontung-mtp`), bấm enter
* Hưởng thụ thành quả :))

Mình có viết 1 bài chi tiết hơn tí, làm với bitbucket. Bạn có thể tham khảo tại đây:
https://minhphong306.wordpress.com/2019/04/05/trick-tan-dung-chrome-search-engine-de-tao-pull-request-nhanh-hon/

## Cách ngon nhất
Ngon nhất là mỗi khi push code, đưa sẵn cái url tạo pull request ra, chỉ việc click vào thôi.

* **Bước 1**: Tạo 1 file bash, trong file sẽ push code và in ra các link dẫn đến custom branch.
Đối với gitlab

```
#!/bin/bash
# minhphong306.wordpress.com
# ~/.smartgit.sh
 
server="gitlab.com"
SHOULD_PROCESS=$(git remote -v | grep "origin.*(push)" | grep -c "$server")
 
 
if [ $SHOULD_PROCESS -ne 0 ]; then
  REPO_NAME=$(git remote -v | grep "origin.*(push)" | sed 's/.*:\(.*\)\.git.*/\1/g')
  BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)
  $(git push origin $BRANCH_NAME)
  echo ""
  echo ">> Merge dev:"
  echo "    https://$server/$REPO_NAME/-/merge_requests/new?merge_request%5Bsource_branch%5D=$BRANCH_NAME&merge_request%5Btarget_branch%5D=dev"
  echo ">> Merge stag:"
  echo "https://$server/$REPO_NAME/-/merge_requests/new?merge_request%5Bsource_branch%5D=$BRANCH_NAME&merge_request%5Btarget_branch%5D=staging"
  echo ">> Merge prod:"
  echo "https://$server/$REPO_NAME/-/merge_requests/new?merge_request%5Bsource_branch%5D=$BRANCH_NAME&merge_request%5Btarget_branch%5D=production"
  echo ""
else
  echo "Not git repo or not has origin remote. Please check again."
fi
```

Đối với github:
```
#!/bin/bash
# minhphong306.wordpress.com
# ~/.smartgit.sh
 
server="github.com"
SHOULD_PROCESS=$(git remote -v | grep "origin.*(push)" | grep -c "$server")
 
 
if [ $SHOULD_PROCESS -ne 0 ]; then
  REPO_NAME=$(git remote -v | grep "origin.*(push)" | sed 's/.*:\(.*\)\.git.*/\1/g')
  BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)
  $(git push origin $BRANCH_NAME)
  echo ""
  echo ">> Merge dev:"
  echo "    https://$server/$REPO_NAME/compare/dev...$BRANCH_NAME"
  echo ">> Merge stag:"
  echo "    https://$server/$REPO_NAME/compare/staging...$BRANCH_NAME"
  echo ">> Merge prod:"
  echo "    https://$server/$REPO_NAME/compare/production...$BRANCH_NAME"
  echo ""
else
  echo "Not git repo or not has origin remote. Please check again."
fi
```

Đối với bitbucket:

```
#!/bin/bash
# minhphong306.wordpress.com
# ~/.smartgit.sh
 
server="bitbucket.org"
SHOULD_PROCESS=$(git remote -v | grep "origin.*(push)" | grep -c "$server")
 
 
if [ $SHOULD_PROCESS -ne 0 ]; then
  REPO_NAME=$(git remote -v | grep "origin.*(push)" | sed 's/.*:\(.*\)\.git.*/\1/g')
  BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)
  $(git push origin $BRANCH_NAME)
  echo ""
  echo ">> Merge dev:"
  echo "    https://$server/$REPO_NAME/pull-requests/new?source=$BRANCH_NAME&t=1&dest=dev"
  echo ">> Merge stag:"
  echo "https://$server/$REPO_NAME/pull-requests/new?source=$BRANCH_NAME&t=1&dest=staging"
  echo ">> Merge prod:"
  echo "https://$server/$REPO_NAME/pull-requests/new?source=$BRANCH_NAME&t=1&dest=production"
  echo ""
else
  echo "Not git repo or not has origin remote. Please check again."
fi
```

* **Bước 2**: Đặt alias cho file
`alias gitsm='sh ~/workspace/sh/gitsmart.sh'`

Chỗ trên tớ đang viết thành 3 cái riêng biệt cho dễ đọc. Anh em có thể chế lại để hoạt động cả với github, gitlab và bitbucket song song nha.

Thành quả:

![](https://images.viblo.asia/d4b5dea0-3e31-41ad-aca4-a773aad8f5a5.jpg)

Cảm ơn bạn, vì đã bỏ thời gian đọc bài.
Nếu trong bài có gì sai, hoặc có cách tối ưu hơn, hãy comment cho mình biết nhé ^^

Nguồn bài viết từ blog của tớ: https://minhphong306.wordpress.com/2021/02/19/trick-huong-dan-custom-lai-message-tao-pull-request-cua-gitlab-github-bitbucket/