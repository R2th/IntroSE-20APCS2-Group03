### Project 14: Section TableView

Tạo mới 1 project và kéo 1 table vào file storyboard, kéo outlet cho tableView này
ta xây dựng dữ liệu để hiển thị
lưu ý: ta kéo 1 UITableViewCell vào và đặt identifier là cell
![](https://images.viblo.asia/270340a0-83bd-44ad-a570-1873b4a9ec83.png)

```
class AnimalSection: NSObject {
    var title: String!
    var animalsInSection: [String]!
    
    init(title: String, animalsInSection: [String]) {
        self.title = title
        self.animalsInSection = animalsInSection
    }
    
    static let animals: [AnimalSection] = {
        var animals = [AnimalSection]()
        let animalSectionB = AnimalSection(title: "B", animalsInSection: ["Bear", "Black Swan", "Buffalo"])
        animals.append(animalSectionB)
        let animalSectionC = AnimalSection(title: "C", animalsInSection: ["Camel", "Cockatoo"])
        animals.append(animalSectionC)
        let animalSectionD = AnimalSection(title: "D", animalsInSection: ["Dog", "Donkey"])
        animals.append(animalSectionD)
        let animalSectionE = AnimalSection(title: "E", animalsInSection: ["Emu"])
        animals.append(animalSectionE)
        let animalSectionG = AnimalSection(title: "G", animalsInSection: ["Giraffe", "Greater Rhea"])
        animals.append(animalSectionG)
        let animalSectionH = AnimalSection(title: "H", animalsInSection: ["Hippopotamus", "Horse"])
        animals.append(animalSectionH)
        let animalSectionK = AnimalSection(title: "K", animalsInSection: ["Koala"])
        animals.append(animalSectionK)
        let animalSectionL = AnimalSection(title: "L", animalsInSection: ["Lion", "Llama"])
        animals.append(animalSectionL)
        let animalSectionM = AnimalSection(title: "M", animalsInSection: ["Manatus", "Meerkat"])
        animals.append(animalSectionM)
        let animalSectionP = AnimalSection(title: "P", animalsInSection: ["Panda", "Peacock", "Pig", "Platypus", "Polar Bear"])
        animals.append(animalSectionP)
        let animalSectionR = AnimalSection(title: "R", animalsInSection: ["Rhinoceros"])
        animals.append(animalSectionR)
        let animalSectionS = AnimalSection(title: "S", animalsInSection: ["Seagull"])
        animals.append(animalSectionS)
        let animalSectionT = AnimalSection(title: "T", animalsInSection: ["Tasmania Devil"])
        animals.append(animalSectionT)
        let animalSectionW = AnimalSection(title: "W", animalsInSection: ["Whale", "Whale Shark", "Wombat"])
        animals.append(animalSectionW)
        
        return animals
    }()
}
```

ở đây ta có `static let animals:` để lấy dữ liệu từ title của header, cho đến dữ liệu của cell
Tiếp đến ở file ViewController.swift 
gắn datasource, delegate cho tableView 

```
tableView.dataSource = self
tableView.delegate = self
```

Tiếp đến implement 3 phương thức quan trọng của tableView để hiển thị dữ liệu

```

extension ViewController: UITableViewDataSource {
    func numberOfSections(in tableView: UITableView) -> Int {
        return AnimalSection.animals.count
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return AnimalSection.animals[section].animalsInSection.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath)
        cell.textLabel?.text = AnimalSection.animals[indexPath.section].animalsInSection[indexPath.row]
        return cell
    }
}

```

và cuối cùng để hiển thị title cho header ta implement từ UITableViewDelegate

```
extension ViewController: UITableViewDelegate {
    func tableView(_ tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
        return AnimalSection.animals[section].title
    }
}
```

vậy là đã xong, bây giờ hãy cũng xem kết quả

![](https://images.viblo.asia/2720f05a-3d5e-4199-9f58-d76d59ee6bc4.gif)



### Project 15: Section TableView with index

Lấy chính project 14 để àm tiếp ở phần này
Cùng là dữ liệu đó, nhưng giờ ta cần thêm mảng String để hiển thị cho phần index

```
static let indexSection: [String] = {
        var listIndex = [String]()
        for index in 0..<AnimalSection.animals.count {
            let animalSection =  AnimalSection.animals[index]
            listIndex.append(animalSection.title)
        }
        return listIndex
    }()
```

viết tiếp vào file AnimalSection

giờ ta sẽ add thêm index cho tableView bằng cách implement thêm 2 phương thức của UITableViewDelegate

```
    func sectionIndexTitles(for tableView: UITableView) -> [String]? {
        return AnimalSection.indexSection
    }
    
    func tableView(_ tableView: UITableView, sectionForSectionIndexTitle title: String, at index: Int) -> Int {
        let animalSection = AnimalSection.animals[index]
        return AnimalSection.animals.index(of: animalSection) ?? 0
    }

```

Như vậy là xong rồi đó, giờ hãy cùng nhìn lại kết quả nào

![](https://images.viblo.asia/32ee65fb-90ba-4610-b86c-4ece10d85c79.gif)