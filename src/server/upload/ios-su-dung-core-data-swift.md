### 1 Giới thiệu về coredata
### 2 Tạo bảng dữ liệu

Tạo mới project, click chọn Use Core Data 

- ![](https://images.viblo.asia/0faa2736-cbb5-43e9-a5e3-b262c0705b2f.png)

- Tạo bảng dữ liệu: chọn file CoreDataDemo.xcdatamodeld
- Chọn Add Entity. Ở đây mình tạo bảng TblAccount với các trường: username, password, email, birthday
- Sau khi tạo xong các trường dữ liệu, xCode sẽ tạo ra 1 bảng TblAccount như hình bên dưới 

![](https://images.viblo.asia/af902ee4-0e6d-4bbb-bc37-fade89cd2fb2.png)

![](https://images.viblo.asia/f568cd28-4b4b-488c-817e-336ac474cc18.png)



### 3 Truy xuất dữ liệu

Sau khi đã tạo xong bảng TblAccount, chúng ta sẽ thực hiện thao tác với DB 

**- Tạo model Account**

```
import Foundation
import CoreData

class Account {
    
    var username: String?
    var email: String?
    var password: String?
    var birthday: String?

}

  init(username: String, email: String, password: String, birthday: String) {
        self.username = username
        self.email = email
        self.password = password
        self.birthday = birthday
    }

enum AccountContract: String {
    case TableName = "TblAccount"
    case ColumnId  = "id"
    case ColumnUsername = "username"
    case ColumnEmail  = "email"
    case ColumnPassword = "password"
    case ColumnBirthday  = "birthday"
}
```

**Tạo 1 protocol với các phương thức**

```
protocol AccountDataContract {
    func getAllAccount() -> [Account]?
    func checkAccountByName(username: String) -> Bool
    func checkAccountByEmail(email: String) -> Bool
    func checkSignInAccount(username: String, password: String) -> Bool
    func insertAccount(account: Account) -> Bool
    func updateAccount(account: Account, currentUsername: String) -> Bool
    func deleteAccount(account: Account) -> Bool
}
```

**Fetch all item**

```
    func getAllAccount() -> [Account]? {
        if let managedObjet = managedObjet {
            let entityDescription = NSEntityDescription.entity(
                forEntityName: AccountContract.TableName.rawValue,
                in: managedObjet
            )
            fetchRequest.entity = entityDescription
        }
        do {
            let results = try AppDelegate.managedObjectContext?.fetch(fetchRequest) ?? nil
            if let results = results, results.count > 0 {
                var accounts = [Account]()
                for result in results{
                    let account = result as? NSManagedObject
                    let username = account?.value(forKey: AccountContract.ColumnUsername.rawValue) as? String
                    let email = account?.value(forKey: AccountContract.ColumnEmail.rawValue) as? String
                    let password = account?.value(forKey: AccountContract.ColumnPassword.rawValue) as? String
                    let birthday = account?.value(forKey: AccountContract.ColumnBirthday.rawValue) as? String
                    if let username = username, let email = email, let password = password, let birthday = birthday {
                        accounts.append(Account(username: username, email: email, password: password, birthday: birthday))
                    }
                }
                return accounts
            }
        } catch {
            return nil
        }
        return nil
    }
```

**Get item by Name**

```
    func getAccountDetailByName(username: String) -> Account? {
        if let managedObjet = managedObjet {
            let entityDescription = NSEntityDescription.entity(
                forEntityName: AccountContract.TableName.rawValue,
                in: managedObjet
            )
            fetchRequest.entity = entityDescription
            fetchRequest.predicate = NSPredicate(format: "\(AccountContract.ColumnUsername.rawValue)  == %@", username)
        }
        do {
            let results = try AppDelegate.managedObjectContext?.fetch(fetchRequest) ?? nil
            if let results = results, results.count > 0 {
                let account = results.first as? NSManagedObject
                let username = account?.value(forKey: AccountContract.ColumnUsername.rawValue) as? String
                let email = account?.value(forKey: AccountContract.ColumnEmail.rawValue) as? String
                let password = account?.value(forKey: AccountContract.ColumnPassword.rawValue) as? String
                let birthday = account?.value(forKey: AccountContract.ColumnBirthday.rawValue) as? String
                if let username = username, let email = email, let password = password, let birthday = birthday {
                    let account = Account(username: username, email: email, password: password, birthday: birthday)
                    return account
                }
            }
        } catch {
            return nil
        }
        return nil
    }
```

**Insert item**

```
    func insertAccount(account: Account) -> Bool {
        let context = AppDelegate.managedObjectContext
        if let context = context {
            let managedObject = NSEntityDescription.insertNewObject(
                forEntityName: AccountContract.TableName.rawValue,
                into: context
            )
            managedObject.setValue(account.username, forKey: AccountContract.ColumnUsername.rawValue)
            managedObject.setValue(account.email, forKey: AccountContract.ColumnEmail.rawValue)
            managedObject.setValue(account.password, forKey: AccountContract.ColumnPassword.rawValue)
            managedObject.setValue(account.birthday, forKey: AccountContract.ColumnBirthday.rawValue)
        }
        do {
            try context?.save()
            return true
        } catch  {
            return false
        }
    }
```

**Delete item**

```
    
    func deleteAccount(account: Account) -> Bool {
        if let managedObjet = managedObjet {
            let entityDescription = NSEntityDescription.entity(
                forEntityName: AccountContract.TableName.rawValue,
                in: managedObjet
            )
            fetchRequest.entity = entityDescription
            fetchRequest.predicate = NSPredicate(format: "\(AccountContract.ColumnUsername.rawValue)  == %@", account.username)
        }
        do {
            let results = try AppDelegate.managedObjectContext?.fetch(fetchRequest) ?? nil
            if let results = results, results.count > 0,
                let accountDel = results.first as? NSManagedObject {
                    AppDelegate.managedObjectContext?.delete(accountDel)
                    try AppDelegate.managedObjectContext?.save()
                    return true
            }
        } catch {
            return false
        }
        return false
    }
```

**Update item**

```
    func updateAccount(account: Account, currentUsername: String) -> Bool {
        if let managedObjet = managedObjet {
            let entityDescription = NSEntityDescription.entity(
                forEntityName: AccountContract.TableName.rawValue,
                in: managedObjet
            )
            fetchRequest.entity = entityDescription
            fetchRequest.predicate = NSPredicate(
                format: "\(AccountContract.ColumnUsername.rawValue)  == %@", currentUsername)
        }
        do {
            let results = try AppDelegate.managedObjectContext?.fetch(fetchRequest) ?? nil
            if let results = results, results.count > 0 {
                let accountUpdate = results[0] as! NSManagedObject
                accountUpdate.setValue(account.username, forKey: AccountContract.ColumnUsername.rawValue)
                accountUpdate.setValue(account.email, forKey: AccountContract.ColumnEmail.rawValue)
                accountUpdate.setValue(account.password, forKey: AccountContract.ColumnPassword.rawValue)
                accountUpdate.setValue(account.birthday, forKey: AccountContract.ColumnBirthday.rawValue)
                try accountUpdate.managedObjectContext?.save()
                return true
            }
        } catch {
            return false
        }
        return false
    }
```

### 4 Kết luận

Trên đây mình đã demo 1 số func đơn giản và được dùng thường xuyên khi thao tác vs DB. Chúng các bạn thành công