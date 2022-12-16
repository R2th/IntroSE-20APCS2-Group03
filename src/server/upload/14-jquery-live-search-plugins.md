# Giới thiệu
`Live Search` hay còn gọi là tìm kiếm trực tiếp, thực chất nó là một form tìm kiếm nâng cao, sử dụng công nghệ AJAX để đưa ra kết quả hoặc 1 suggest ngay trên view bạn vừa nhập. Có 1 số bạn nhầm lẫn với input nhập HTML thông thường được cấp quyền tự động hoàn thành từ các trình duyệt như Chrome, Firefox hay Safari. Một `Live Search` là trường input đã được lập trình để tải những suggest từ một tập dữ liệu cụ thể.

Có 1 bài viết mình đã nói là mức độ thân thiện của trang web chiếm ưu thế rất quan trọng trong quá trình biến những người sử dụng trang web của bạn thành những khách hàng tiềm năng. Và dùng `Live Search` là một trong những cách làm tăng độ thân thiện với người dùng. Bất kể công nghệ back-end nào mà bạn đang sử dụng PHP, Ruby, Java, Python... Javascript vẫn là cách tốt nhất để thực hiện một `Live Search` trực tiếp từ phía client.

Bài viết này sẽ bao gồm cả những plugin non-jQuery để các bạn tham khảo. Và ngoài thuật ngữ `Live Search` thì nhiều người cũng sử dụng các thuật ngữ `autocomplete` hay `type ahead`. Chúng là tương đương với nhau. Thôi chúng ta cùng tìm hiểu nào!
   # 14 jQuery Live Search Plugins
   ## 1. Ajax Live Search
   Danh sách đầu tiên trong danh sách này là một plugin jQuery Live Search có mã nguồn mở tuyệt vời. Nó được tài liệu hóa và hoạt động tốt trên các trình duyệt Chrome, Firefox, Safari, Opera và IE8. Các tính năng ấn tượng nhất là nó có thể trả về kết quả dưới dạng một bảng được phân trang.
   
![Ajax Live Search](https://images.viblo.asia/0625305b-aa3f-47a3-960d-664fe86cd033.gif)

Bạn có thể xem thêm tại link dưới đây:
* [Website](https://ajaxlivesearch.com/)
* [Source](https://github.com/iranianpep/ajax-live-search)
* [Download](https://github.com/iranianpep/ajax-live-search/archive/master.zip)

## 2. Semantic UI Search Component
   Nếu bạn dùng một CSS Framework thì bạn nên xem xét Semantic UI. Bởi họ cung cấp cả một [Search Component](https://semantic-ui.com/modules/search.html) cho phép bạn thực hiện Live Search trên form input một cách dễ dàng. Chúng ta cùng xem qua code ví dụ dưới đây:
   
   HTML:
   ```html
   <div class="ui search">
      <input class="prompt" type="text" placeholder="Search GitHub...">
      <div class="results"></div>
</div>
   ```
   
   JavaScript:
   ```javascript
   $('.ui.search')
  .search({
    apiSettings: {
      url: '//api.github.com/search/repositories?q={query}'
    },
    fields: {
      results : 'items',
      title   : 'name',
      url     : 'html_url'
    },
    minCharacters : 3
  })
;
   ```
   
   Nhìn thì đơn giản nhưng nó lại hỗ trợ rất mạnh mẽ. Nếu bạn sử dụng option API settings như trên, bạn có thể thực hiện các tùy chỉnh như nhóm các kết quả theo các categories.
   
   ![](https://images.viblo.asia/8ea02e09-6267-4b3c-9fb5-709ec8532a07.png)
   
   Semantic UI cũng được xây dựng riêng cho cả React, Meteor, Ember và Angular. Để tìm hiểu rõ hơn các bạn xem ở link dưới đây:
   
* [Download](https://semantic-ui.com/introduction/getting-started.html)
* [Documentation](https://semantic-ui.com/modules/search.html)
* [Demo](https://semantic-ui.com/modules/search.html#using-api-settings)
   
 ## 3. jQueryUI Autocomplete
   ![](https://images.viblo.asia/d43f6dcc-718a-4ff7-b86c-73859a43152f.png)
   
   Đây là một phần của thư viện jQuery UI. Thư viện này là một tập hợp các thành phần giao diện người dùng, các hiệu ứng và các thêm được xây dựng dựa trên jQuery.
   Autocomplete đi kèm với 1 số template để người dùng tùy chỉnh, ví dụ như sau:
  
  HTML:
  ```html
  <div class="ui-widget">
    <label for="birds">Birds: </label>
    <input id="birds">
   </div>
  <div class="ui-widget" style="margin-top:2em; font-family:Arial">
    Result:
    <div id="log" style="height: 200px; width: 300px; overflow: auto;" class="ui-widget-content"></div>
  </div>
```

Javascript:
```javascript:
$( function() {
  function log( message ) {
    $( "<div>" ).text( message ).prependTo( "#log" );
    $( "#log" ).scrollTop( 0 );
  }

  $( "#birds" ).autocomplete({
    source: "search.php",
    minLength: 2,
    select: function( event, ui ) {
      log( "Selected: " + ui.item.value + " aka " + ui.item.id );
    }
  });
} );
```
Để tìm hiểu thêm thì bạn xem ở link dưới đây:
* [Source](https://github.com/jquery/jquery-ui)
* [Demo](http://jqueryui.com/autocomplete/)
 ## 4. DevBridge jQuery AutoComplete
   ![](https://images.viblo.asia/47ccdf27-d30e-4052-9942-2525f2d7b4e0.png)
   
   DevBridge jQuery AutoComplete là một thư viện JavaScript nhỏ cho phép bạn chuyển các trường input text thành các hộp gợi ý autocomplete. API của nó rất rộng và được tài liệu hóa tốt, cho phép bạn thực hiện khá nhiều cấu hình khác nhau. Việc triển khai nó khá đơn giản, chúng ta cùng xem ví dụ sau:
   
 HTML:
 ```html
<input type="text" name="country" id="autocomplete"/>
```

Javascript (AJAX lookup):

```javascript:
// AJAX Lookup
$('#autocomplete').autocomplete({
    serviceUrl: '/autocomplete/countries',
    onSelect: function (suggestion) {
        alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
    }
});
```

Javascript (Local lookup):
```javascript
var countries = [
   { value: 'Andorra', data: 'AD' },
   // ...
   { value: 'Zimbabwe', data: 'ZZ' }
];

$('#autocomplete').autocomplete({
    lookup: countries,
    onSelect: function (suggestion) {
        alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
    }
});
```
Để tìm hiểu thêm thì bạn truy cập vào link này:
* [Website](https://www.devbridge.com/sourcery/components/jquery-autocomplete/)
 ## 5. EasyAutocomplete
   ![](https://images.viblo.asia/0d5ed385-f9a6-42bd-9773-096de437a6de.png)
   
   EasyAutocomplete là một plugin jQuery autocomplete có thể tùy biến cao với tất cả các tính năng được yêu cầu. Nó hỗ trợ kiểu dữ liệu JSON, XML, và các định dạng văn bản thuần túy. Nó cũng hỗ trợ các trình xử lý callback cùng với một số style mặc định.
   
   Bạn có thể tùy chỉnh các templete ở view kết quả hoặc sử dụng các giá trị đã có sẵn bao gồm:
   
* Description Template
* Icon Right/Left Template
* Link Template

Sử dụng plugin này cũng khá dễ dàng, đây là một ví dụ:

HTML:
```
<input id="countries"/>
```

Javascript:
```
var options = {

  url: "resources/countries.json",

  getValue: "name",

  list: {
    match: {
      enabled: true
    }
  },

  theme: "square"
};

$("#countries").easyAutocomplete(options);
```

JSON:
```
[
  {"name": "Afghanistan", "code": "AF"},
  {"name": "Aland Islands", "code": "AX"},
  {"name": "Albania", "code": "AL"},
  {"name": "Algeria", "code": "DZ"},
  {"name": "American Samoa", "code": "AS"}
 ]
```

Tìm hiểu thêm thì các bạn xem ở đây:
* [Website](http://easyautocomplete.com/)
* [Download](http://easyautocomplete.com/download)
* [Source](https://github.com/pawelczak/EasyAutocomplete)
 ## 6. PixaBay jQuery-autoComplete
 ![](https://images.viblo.asia/a0e42927-3325-4426-943d-67ee29e96de9.png)
 
 Pixabay.com là một trang web chia sẻ ảnh miễn phí, nó có một plugin jQuery autocomplete mã nguồn mở tuyệt vời mà bạn có thể sử dụng cho dự án của mình. Ban đầu họ đã sử dụng jQuery Autocomplete của DevBridge. Sau đó họ cập nhật chúng để đáp ứng nhu cầu của riêng họ. Cuối cùng họ đã tạo ra một plugin tối ưu hóa hơn ban đầu rất nhiều.
 
 Plugin này khi nén chỉ còn 1.4kB với sự hỗ trợ cho nhiều nguồn dữ liệu, callbacks, và có một hệ thống bộ nhớ đệm thông minh. Dưới đây là ví dụ:
 
 Javascript:
 ```javascript
 $('input[name="q"]').autoComplete({
      source: function(term, response){
            $.getJSON('/some/ajax/url/', { q: term }, function(data){ response(data); });
  }
});
 ```
 
 Tham khảo thêm ở link:
*  [Demo](https://goodies.pixabay.com/jquery/auto-complete/demo.html)
*  [Source](https://github.com/Pixabay/jQuery-autoComplete)
*  [Download](https://github.com/Pixabay/jQuery-autoComplete/archive/master.zip)
  ## 7. Marco Polo
  ![](https://images.viblo.asia/8d541e55-2c37-4e45-bf1e-32698bdc3029.png)
  
  Đây là plugin jQuery autocomplete đáng tin cậy. Nó có tài liệu chất lượng, caching, lựa chọn bộ nhớ, tùy chỉnh style, xử lý callback và hỗ trợ WAI-ARIA. Nó đòi hỏi jQuery >= v1.4.3 và hỗ trợ tất cả các trình duyệt, thậm chí cả IE6.
  Sử dụng Marco Polo cũng ko hề phức tạp. Ví dụ sau:
  
  HTML:
  ```html
  ...
<head>
      <script src="jquery.min.js"></script>
      <script src="jquery.marcopolo.min.js"></script>
</head>
...
<body>
      <input type="text" name="userSearch" id="userSearch">
</body>
  ```
  
  Javascript:
  ```javascript
  $('#userSearch').marcoPolo({
  url: '/users/search',
  formatItem: function (data, $item) {
    return data.first_name + ' ' + data.last_name;
  },
  onSelect: function (data, $item) {
    window.location = data.profile_url;
  }
});
  ```
  JSON (Source data):
  ```
  [
  {
    "first_name": "James",
    "last_name": "Butler",
    "profile_url": "/users/78749",
  },
  {
    "first_name": "Win",
    "last_name": "Butler",
    "profile_url": "/users/41480",
  },
]
  ```
  
  Các bạn muốn tìm hiểu thêm thì xem dưới đây:
*   [Source](https://github.com/jstayton/jquery-marcopolo)
*   [Demo](http://jstayton.github.io/jquery-marcopolo/example1.html)
   ## 8. xDSoft Autocomplete Like Google
   
   ![](https://images.viblo.asia/214bb719-8e1a-4dd3-a435-57b5ff70b973.png)
   
   Đây là một plugin jQuery autocomplete hoàn chỉnh với việc hỗ trợ nguồn dữ liệu cả locale và remote. 
   Javascript:
   ```javascript
   $('#remote_input2').autocomplete({source:[
 {
      url:"/component/jquery_plugins/?task=demodata&q=%QUERY%",
      type:'remote'
 },
 ["One","Two","Three"]
]});
   ```
   Để tìm hiểu thêm, truy cập link dưới đây:
*   [Website](https://xdsoft.net/jqplugins/autocomplete/)
*   [Download](https://github.com/xdan/autocomplete/archive/master.zip)
*   [Source](https://github.com/xdan/autocomplete/)
   ## 9. jQuery Typeahead Search
  ![](https://images.viblo.asia/799b6f8f-1a92-44d5-a494-eefc74d7664d.png)
  
  jQuery Typeahead Search là một plugin autocomplete xây dựng với các tùy chọn sâu. Nó hoạt động trên tất cả các trình duyệt từ IE8+ và hỗ trợ AJAX callbacks.
  
  Nếu bạn xem trang demo, bạn sẽ tìm thấy rất nhiều ví dụ hay ho.
  *   [Website](http://www.runningcoder.org/jquerytypeahead/overview/)
*   [Demo](http://www.runningcoder.org/jquerytypeahead/demo/)
*   [Source](https://www.npmjs.com/package/jquery-typeahead)
 ## 10. Algolia Autocomplete
   Thư viện Javascript này có khả năng thêm menu tự động nhanh và đầy đủ tính năng vào hộp tìm kiếm. Nó có thể kết hợp với công cụ tìm kiếm `Algolia's Search Engine`.
   
   Nó hỗ trợ tất cả các trình duyệt hiện đại từ IE9 và có sẵn như là một jQuery plugin, một Angular directive và là một thư viện độc lập. Cùng với các tính năng thông thường, nó có các tính năng bảo mật chống lại các cuộc tấn công XSS.
   * [Source](https://github.com/algolia/autocomplete.js)
   * [Download](https://www.npmjs.com/package/autocomplete.js)
 ## 11. ng-bootstrap Typeahead
 ![](https://images.viblo.asia/1474967b-c557-444b-be80-2eed24e5be21.png)
 
 Nếu bạn đang sử dụng cả Angular và Bootstrap trong project thì bạn nên sử dụng framework ng-bootstrap. Nó có một thành phần Typeahead hoạt động giống như một plugin jQuery autocomplete.
 
 Nó hỗ trợ các template, dữ liệu local và remote, các tính năng live search thông thường. 
 
 HTML:
 ```html
<div class="form-group" [class.has-danger]="searchFailed">
      <label for="typeahead-http">Search for a wiki page:</label>
      <input id="typeahead-http" type="text" class="form-control" [(ngModel)]="model" [ngbTypeahead]="search" placeholder="Wikipedia search" />
      <span *ngIf="searching">searching...</span>
      <div class="form-control-feedback" *ngIf="searchFailed">Sorry, suggestions could not be loaded.</div>
</div>
```
Typescript:
```javascript
@Injectable()
export class WikipediaService {
  constructor(private _jsonp: Jsonp) {}

  search(term: string) {
    if (term === '') {
      return Observable.of([]);
    }

    let wikiUrl = 'https://en.wikipedia.org/w/api.php';
    let params = new URLSearchParams();
    params.set('search', term);
    params.set('action', 'opensearch');
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this._jsonp
      .get(wikiUrl, {search: params})
      .map(response => <string[]> response.json()[1]);
  }
}

@Component({
  selector: 'ngbd-typeahead-http',
  templateUrl: './typeahead-http.html',
  providers: [WikipediaService],
  styles: [`.form-control { width: 300px; display: inline; }`]
})
export class NgbdTypeaheadHttp {
  model: any;
  searching = false;
  searchFailed = false;

  constructor(private _service: WikipediaService) {}

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searching = true)
      .switchMap(term =>
        this._service.search(term)
            .do(() => this.searchFailed = false)
            .catch(() => {
              this.searchFailed = true;
              return Observable.of([]);
            }))
      .do(() => this.searching = false);
}
```
Tìm hiểu thêm tại:
* [Documentation](https://ng-bootstrap.github.io/#/components/typeahead/examples)
* [Download](https://www.npmjs.com/package/@ng-bootstrap/ng-bootstrap)
 ## 12. React Autosuggest
   ![](https://images.viblo.asia/27ca11fa-17e0-4c5e-a12d-23be92a48386.png)
   
  Tuy nó không phải là jQuery plugin nhưng nó vẫn là Javascript. React Autosuggest là một thư viện mã nguồn mở với một số lượng lớn các tùy chọn cấu hình. Nó thân thiện với các thiết bị di động, tuân thủ WAI-ARIA, có thể tùy chỉnh và tích hợp tốt với Redux và Flux.
  
  Bạn sẽ mất thời gian để thiết lập, nhưng một khi đã làm được, bạn sẽ nhập được một plugin live search hoạt động chính xác theo cách bạn muốn. Đây là code ví dụ:
  
  ```
   return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
      onSuggestionsClearRequested={this.onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
  ```
  Cái này khá khó, bạn nên tìm hiểu thêm tại:
  * [Website](http://react-autosuggest.js.org/)
  * [Source](https://github.com/moroshko/react-autosuggest)
  
   ## 13. W3Schools Ajax Live Search
   ![](https://images.viblo.asia/3bc56982-7860-43d1-89cc-7b1c97648c55.png)
   
   Nếu bạn đang tìm cách trán phụ thuộc và thực hiện một giải pháp với Javascript thuần túy thì bạn nên tham khảo w3schools.com
   
   Back-end sử dụng trong ví dụ này là sử dụng PHP server. Tuy nhiên, bạn có thể thay thế bằng công nghệ khác. Mã yêu cầu dữ liệu ở định dạng XML. Bạn cũng có thể cấu trúc lại mã để chấp nhận các định dạng JSON.
   
   Nó tuyệt vời ở chỗ là làm việc trên tất cả các trình duyệt kể cả IE5.
   
   HTML:
   ```html
<form>
  <input type="text" size="30" onkeyup="showResult(this.value)">
  <div id="livesearch"></div>
</form>
```
Javascript:
```javascript
function showResult(str) {
  if (str.length==0) {
    document.getElementById("livesearch").innerHTML="";
    document.getElementById("livesearch").style.border="0px";
    return;
  }
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else {  // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (this.readyState==4 && this.status==200) {
      document.getElementById("livesearch").innerHTML=this.responseText;
      document.getElementById("livesearch").style.border="1px solid #A5ACB2";
    }
  }
  xmlhttp.open("GET","livesearch.php?q="+str,true);
  xmlhttp.send();
}
```
* [Source + Demo](https://www.w3schools.com/php/php_ajax_livesearch.asp)
 ## 14. WordPress Live Search
   ![](https://images.viblo.asia/c2228325-1765-46ed-a925-c7f6f4a34beb.png)https://images.viblo.asia/c2228325-1765-46ed-a925-c7f6f4a34beb.png
   
   Nếu bạn sử dụng WordPress, tất cả những gì bạn cần làm là cài đặt và thiết lập một plugin WordPress với chức năng live search. Phổ biết nất là Dave's WordPress Live Search, hiện có hơn 10000 lượt cài đặt. Nó tương thích với hầu hết các thêm, đi kèm với một số tùy chọn cấu hình và dễ dàng tích hợp. Bạn có thể lên Youtube và tham khảo để thiết lập.
   * [Download](https://wordpress.org/plugins/daves-wordpress-live-search/)
   * [Documentation](https://www.youtube.com/watch?v=7CGR2bJ1mLM&feature=youtu.be)
   # Tổng kết
   Thật ra mình chỉ mới sử dụng một vài trong số plugin mình đã nêu, nếu có sai sót thì mong các bạn góp ý. Hi vọng danh sách này giúp cho các bạn tìm ra giải pháp phù hợp cho dự án của mình.
   # Tham khảo
   > Nguồn: https://www.sitepoint.com/14-jquery-live-search-plugins/