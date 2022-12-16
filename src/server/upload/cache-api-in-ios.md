Tốc dộ tải dữ liệu phụ thuộc vào đường truyền internet. Đôi khi vì một số TH nào đó tốc độ đường truyền không đc như mong muốn. Việc request API sẽ trở lên khó khăn hoặc mất kết nối với server. Với những ứng dụng như facebook, twitter ... Bạn vẫn thấy dữ liệu được hiển thị lên khi không có mạng. Đó là dữ liệu bạn đã tải trước đó và nó được cache lại sau khi request success.
## Vì sao chúng ta phải cache lại các request.
- Cải thiện tốc độ load data tạo lên sự trải nghiệm tốt hơn cho người dùng.
- Vẫn hiển thị được data trước đó mỗi khi mất mạng, người dùng vẫn có thể truy cập được những thông tin trước đó.
## Khi nào thì cache API:
- Chỉ cache lại các request sử dụng thường xuyên việc hiển thị data cũ không ảnh hưởng đến chức năng của app. Không lên cache lại các data đòi hỏi tính chính xác cũng như đảm bảo nó đồng bộ  với server (thông tin thanh toán, thông tin user..etc..)
## Cache API sử dụng Coredata.
Mình thường dùng Coredata để cache lại API một phần là do thói quen cũng như trước đây mình hay sử dụng core data & Objective-C. Khi chuyển sang swift bạn sẽ có nhiều sự lựa chọn hơn như Realm, ..vv..
Trong bài này mình sẽ hướng dẫn các bạn sử dụng Core data để cache lại các API của bạn.

Đầu tiên khi tạo app nhớ chọn "Use core data". Xcode sẽ setup Coredata cho project của bạn.

![](https://images.viblo.asia/08d37de0-cb00-4d7f-8356-560fdf588b6b.png)

Tiếp theo chọn file .xdatamodeld mà xcode đã tạo ra trong project của bạn. Thêm Entity cache API của bạn.

![](https://images.viblo.asia/6e6d677a-7b7b-48fc-a18b-2c07c3513502.png)

Sau đó create NSManagerObject.

Sau khi có Entity AppCacheData data bạn tiến hành cache lại API.
## Cache API.
Để thuận tiện cho việc cache API bạn cần phải xử lý các API một cách tập trung. Ở đây mình viết một Engine nho nhỏ sử dụng để request API. Tất cả các api sẽ request qua đây.
```
class APIEngine {
    static let sharedInstance = APIEngine()
    
    open func requestURL(withMethod method:String, withURL url: String, withHeader headers:[String:String]?, withParams params:[String:Any]?, withHash hash:Bool, usingCache cache:Bool) -> MTResult {
        var _headersConfig = [String:String]()
        _headersConfig = ["Content-Type": "application/json"]
   
        let result = MTResult()
        result.urlString = url
        result.params = _params
        result._usingCache = cache
        result.method = method
        // Load data
        result.request = Alamofire.request(url, method: .get, parameters: _params, encoding: URLEncoding(), headers: _headersConfig)
            .downloadProgress(queue: DispatchQueue.global(qos: .utility)) { progress in
                print("Progress: \(progress.fractionCompleted)")
            }
            .validate { request, response, data in
                return .success
        }
        debugPrint(result.request)
        return result;
    }
}

```
Tất cả các request sẽ được thực hiện qua đây. Và handle call back của request sẽ được được xử lý  trong MTResult.

```
class MTResult {
    var rq: DataRequest?
    var urlString: String?
    var method: String?
    var params: [String:Any]?
    
    var _onComplete:CompletionBlock?
    var _onError:ErrorBlock?
    
    var _usingCache:Bool = false
    
    func completeBlock(onComplete:@escaping CompletionBlock)->Self{
        _onComplete = onComplete
        if self._usingCache {
            self.getDataFromCache()
        }
        return self
    }
    
    func errorBlock(onError:@escaping ErrorBlock){
        _onError = onError
    }
    
    var request:DataRequest{
        get{ return rq! }
        set (newVal){
            newVal.responseJSON { (response) in
                switch response.result {
                case .success(let result):
                    if self._usingCache {
                        self.cacheAPI(result as AnyObject)
                    }
                    self._onComplete?(JSON(result), false)
                case .failure(let error):
                    print("Request failed with error: \(error)")
                    self._onError?(error)
                }
            }
            rq = newVal
        }
    }
    
    func cacheAPI(_ object: AnyObject) {
        if self.verifyCacheContent(object: self) {
            var apiCache = self.getAPICache(withAPIURL: self.urlString, withParm: self.params, withMethod: self.method)
            if apiCache != nil {
                apiCache?.data =  CoredataHelper.archiveNSDataFromObject(object, withKey: "data") as NSData
                apiCache?.date_modified = Date() as NSDate
            } else {
                apiCache = AppCacheData.mr_createEntity()
                apiCache?.url = self.urlString
                apiCache?.method = self.method
                apiCache?.date_modified = Date() as NSDate
                if self.params != nil {
                    let saveParams = self.getHandleParamsFromRealParams(self.params)
                    apiCache?.params = CoredataHelper.archiveNSDataFromObject(saveParams, withKey: "params") as NSData
                }
                apiCache?.data = CoredataHelper.archiveNSDataFromObject(object, withKey: "data") as NSData
            }
            CoredataHelper.saveContext()
        }
    }
    
    func getDataFromCache(){
        if self.params != nil {
            let apiResult = self.getApiJsonFromCache(withURL: self.urlString, withParams: self.params, withMethod: self.method)
            self._onComplete?(JSON(apiResult as Any), true)
        } else {}
    }
    
    func getApiJsonFromCache(withURL _url: String?, withParams _params: [String: Any]?, withMethod _method: String?) -> Any? {
        if let apiCache = self.getAPICache(withAPIURL: _url, withParm: _params, withMethod: _method) {
            if let data = apiCache.data as? Data {
                let jsonData = CoredataHelper.unarchiveNSData(withData: data, withKey: "data")
                return jsonData
            }
        }
        return nil
    }
    
    func getAPICache(withAPIURL _apiURL: String?, withParm _params: [String:Any]?, withMethod _method: String?) -> AppCacheData! {
        var handleParams: [String: Any]!
        if _params != nil {
            handleParams = self.getHandleParamsFromRealParams(_params)
        }
        
        let listCaches = AppCacheData.mr_find(byAttribute: "url", withValue: _apiURL) as! [AppCacheData]
        
        if listCaches.count > 0 {
            for item in listCaches {
                var paramData: [String:Any]!
                if item.managedObjectContext != nil, item.params != nil {
                    let unarchiver = NSKeyedUnarchiver.init(forReadingWith: item.params! as Data)
                    paramData = unarchiver.decodeObject(forKey: "params") as! [String: Any]
                    if (paramData == handleParams) && _method == item.method {
                        return item;
                    }
                }
                if paramData == nil && item.params == nil, _method == item.method {
                    return item;
                }
            }
        }
        return nil;
    }
}

```
Thực hiện request như ví dụ sau:
```
    APIEngine.sharedInstance.getTopchart().completeBlock { (result, cache) in
    
    }.errorBlock { (error) in
    
    }
```
Flow đơn giản như sau. Khi thực hiện một request đồng thời bạn sẽ register CompletionBlock & ErrorBlock trong MTResult. 

Register CompleteBlock
```
func completeBlock(onComplete:@escaping CompletionBlock)->Self{
        _onComplete = onComplete
        if self._usingCache {
            self.getDataFromCache()
        }
        return self
    }
```
Việc thực hiện register CompleteBlock sẽ check bạn có sử dụng cache API này không nếu có cache nó sẽ check trong data nếu có data thì callback về data  đó với trạng thái là data cache.
Sau đó thực hiện request bình thường nếu request thành công thì nó sẽ callback về data mới get được từ server và bạn cũng chỉ việc handle trong callback CompleteBlock mà thôi, đồng thời check xem có cache API này không nếu có thì thực hiện cache lại api.

```
 var request:DataRequest{
        get{ return rq! }
        set (newVal){
            newVal.responseJSON { (response) in
                switch response.result {
                case .success(let result):
                    if self._usingCache {
                        self.cacheAPI(result as AnyObject)
                    }
                    self._onComplete?(JSON(result), false)
                case .failure(let error):
                    print("Request failed with error: \(error)")
                    self._onError?(error)
                }
            }
            rq = newVal
        }
    }
```
## Kết luận
Trong bài này minh hướng dẫn các bạn cache lại API bằng core data. Còn có thể có nhiều phương pháp khác nhưng mình nghĩ flow nó cũng chỉ có vậy. Nếu có thể mình sẽ cố gắng cache thử nó bằng Realm, thậm trí là cả NSUserdefault.