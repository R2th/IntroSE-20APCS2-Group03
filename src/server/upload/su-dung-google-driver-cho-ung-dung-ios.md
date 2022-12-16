### Mở đầu:
Trong bài viết này, tôi sẽ hướng dẫn bạn setup và cách cơ bản sử dụng Google Drive trong ứng dụng của bạn "iOs".
### API Access:
Trước khi bạn có thể sử dụng Google Drive đầu tiên chúng ta phải thiết lập.  
truy cập trang:  https://console.cloud.google.com/home 
Tạo project trong phần APIs & Services 

![](https://images.viblo.asia/030d4a2b-73bc-4a27-934f-c89801583ac1.png)

Chọn ‘API & Services’ and ‘Library’  và search  ‘Google Drive’ tiếp theo Enable Google Drive API:

![](https://images.viblo.asia/d89f3bc3-9258-430a-bc65-9cae3bbd18fb.png)
### Enable API:
Ở bước "configure your oauth client" đặt tên và chọn iOS kèm theo BundleID trong project xcode của bạn:

![](https://images.viblo.asia/5f483d50-d9d2-427e-99f5-f59534cb97ad.png)

![](https://images.viblo.asia/b985c817-8396-48a8-a45f-49d424825134.png)

![](https://images.viblo.asia/5f483d50-d9d2-427e-99f5-f59534cb97ad.png)

![](https://images.viblo.asia/a2723ae7-5d0f-49db-9893-6ce0cb463de9.png)

Cuối cùng "download client configuration" kéo file "xxxx.apps.googleusercontent.com.plist" vào project của bạn.
### Prepare the Project:
Create a Podfile for an Xcode project :
platform :ios, '8.0'
target 'QuickstartApp' do
    pod 'GoogleAPIClientForREST/Sheets', '~> 1.2.1'
    pod 'GoogleSignIn', '~> 4.1.1'
end
### Custom URL scheme:
Xem chi tiết file "xxxx.apps.googleusercontent.com.plist" trong project bạn coppy Value: "com.googleusercontent.apps.xxxx" Key: REVERSED_CLIENT_ID
Tiếp theo chọn "TARGETS: project: chọn "info" tìm đến phần "URL Types" nhét . "com.googleusercontent.apps.xxxx" vào "URL scheme" vào "URL Types" vừa tạo 

![](https://images.viblo.asia/03339a58-7c11-4368-b482-ae6b4c28ac5c.png)
### Khởi tạo SDK:
Trong AppDelegate - didFinishLaunching: 
 ```
import GoogleSignIn
        GIDSignIn.sharedInstance().clientID = "xxxxx.apps.googleusercontent.com"
```
**Sign In**
```
import GoogleSignIn
import GoogleAPIClientForREST

import GTMSessionFetcher

@IBOutlet weak var content: UITextView!
    @IBOutlet weak var llistLabel: UILabel!
    fileprivate let service = GTLRDriveService()
    var googleUser: GIDGoogleUser?
    private var drive: ATGoogleDrive?
```

```
private func setupGoogleSignIn() {
        GIDSignIn.sharedInstance().delegate = self
        GIDSignIn.sharedInstance().uiDelegate = self
        GIDSignIn.sharedInstance().scopes = [kGTLRAuthScopeDriveFile]
        GIDSignIn.sharedInstance().signInSilently()
        // Adding the kGTLRAuthScopeDriveFile scope will ask the user to allow full Google Drive access (read and write) to your app during the OAuth flow.
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupGoogleSignIn()
        
        drive = ATGoogleDrive(service)
        view.addSubview(GIDSignInButton())
    }
```

```
extension ViewController: GIDSignInDelegate, GIDSignInUIDelegate {
    func sign(_ signIn: GIDSignIn!, didSignInFor user: GIDGoogleUser!, withError error: Error!) {
        // A nil error indicates a successful login
        if error == nil {
            // Include authorization headers/values with each Drive API request.
            self.service.authorizer = user.authentication.fetcherAuthorizer()
            self.googleUser = user
        } else {
            self.service.authorizer = nil
            self.googleUser = nil
        }
        // ...
    }
}

```

![](https://images.viblo.asia/ae564214-c907-4cce-9c71-61549f1e3bee.png)

```
    @IBAction func upload(_ sender: Any) {  // upload file 
        if let documentsDir = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).last {  // bạn kéo 1 file vô thư mục trên máy mac 
            let testFilePath = documentsDir.appendingPathComponent("ViewController.swift").path
            drive?.uploadFile("Upload_Demo", filePath: testFilePath, MIMEType: "image/png") { (fileID, error) in
                print("Upload file ID: \(fileID); Error: \(error?.localizedDescription)")
            }
        }
    }
    
    @IBAction func list(_ sender: Any) {  // show list file trong thư mục : Upload_Demo trên Driver của bạn
        drive?.listFilesInFolder("Upload_Demo") { (files, error) in
            guard let fileList = files else {
                print("Error listing files: \(error?.localizedDescription)")
                return
            }
            
            self.content.text = fileList.files?.description
        }
        
    }
```


```
enum GDriveError: Error {
    case NoDataAtPath
}

class ATGoogleDrive {
      // Our Google Drive Wrapper
    private let service: GTLRDriveService
    
    init(_ service: GTLRDriveService) {
        self.service = service
    }
    
    public func listFilesInFolder(_ folder: String, onCompleted: @escaping (GTLRDrive_FileList?, Error?) -> ()) {
        search(folder) { (folderID, error) in
            guard let ID = folderID else {
                onCompleted(nil, error)
                return
            }
            self.listFiles(ID, onCompleted: onCompleted)
        }
    }
    
    private func listFiles(_ folderID: String, onCompleted: @escaping (GTLRDrive_FileList?, Error?) -> ()) {
        let query = GTLRDriveQuery_FilesList.query()
        query.pageSize = 100
        query.q = "'\(folderID)' in parents"
        
        service.executeQuery(query) { (ticket, result, error) in
            onCompleted(result as? GTLRDrive_FileList, error)
        }
    }
    
    public func uploadFile(_ folderName: String, filePath: String, MIMEType: String, onCompleted: ((String?, Error?) -> ())?) {
        
        search(folderName) { (folderID, error) in
            
            if let ID = folderID {
                self.upload(ID, path: filePath, MIMEType: MIMEType, onCompleted: onCompleted)
            } else {
                self.createFolder(folderName, onCompleted: { (folderID, error) in
                    guard let ID = folderID else {
                        onCompleted?(nil, error)
                        return
                    }
                    self.upload(ID, path: filePath, MIMEType: MIMEType, onCompleted: onCompleted)
                })
            }
        }
    }
    
    private func upload(_ parentID: String, path: String, MIMEType: String, onCompleted: ((String?, Error?) -> ())?) {
        
        guard let data = FileManager.default.contents(atPath: path) else {
            onCompleted?(nil, GDriveError.NoDataAtPath)
            return
        }
        
        let file = GTLRDrive_File()
        file.name = path.components(separatedBy: "/").last
        file.parents = [parentID]
        
        let uploadParams = GTLRUploadParameters.init(data: data, mimeType: MIMEType)
        uploadParams.shouldUploadWithSingleRequest = true
        
        let query = GTLRDriveQuery_FilesCreate.query(withObject: file, uploadParameters: uploadParams)
        query.fields = "id"
        
        self.service.executeQuery(query, completionHandler: { (ticket, file, error) in
            onCompleted?((file as? GTLRDrive_File)?.identifier, error)
        })
    }
    
    public func download(_ fileID: String, onCompleted: @escaping (Data?, Error?) -> ()) {
        let query = GTLRDriveQuery_FilesGet.queryForMedia(withFileId: fileID)
        service.executeQuery(query) { (ticket, file, error) in
            onCompleted((file as? GTLRDataObject)?.data, error)
        }
    }
    
    public func search(_ fileName: String, onCompleted: @escaping (String?, Error?) -> ()) {
        let query = GTLRDriveQuery_FilesList.query()
        query.pageSize = 1
        query.q = "name contains '\(fileName)'"
        
        service.executeQuery(query) { (ticket, results, error) in
            onCompleted((results as? GTLRDrive_FileList)?.files?.first?.identifier, error)
        }
    }
    
    public func createFolder(_ name: String, onCompleted: @escaping (String?, Error?) -> ()) { // tạo Folder trên GGDrive
        let file = GTLRDrive_File()
        file.name = name
        file.mimeType = "application/vnd.google-apps.folder"
        
        let query = GTLRDriveQuery_FilesCreate.query(withObject: file, uploadParameters: nil)
        query.fields = "id"
        
        service.executeQuery(query) { (ticket, folder, error) in
            onCompleted((folder as? GTLRDrive_File)?.identifier, error)
        }
    }
    
    public func delete(_ fileID: String, onCompleted: ((Error?) -> ())?) {
        let query = GTLRDriveQuery_FilesDelete.query(withFileId: fileID)
        service.executeQuery(query) { (ticket, nilFile, error) in
            onCompleted?(error)
        }
    }
}

```
### RUN APP:
![](https://images.viblo.asia/e3f0aa03-c212-41de-8e87-edf62962a0ad.png)