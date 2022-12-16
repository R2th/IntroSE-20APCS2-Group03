![](https://images.viblo.asia/f2f76dd1-02b8-4197-8b76-9491f1206433.jpg)

# 1. Create EC2 on AWS and install apache server
### Step 1:
![](https://images.viblo.asia/b9c1cb2a-7dd4-4401-ad20-02d40b1863e3.png)
### Step 2:
![](https://images.viblo.asia/ee6e383d-265c-49aa-8011-71ad2d9de9fb.png)
### Step 3:
![](https://images.viblo.asia/c01fb486-afc5-444b-b91a-f37f0d1b5c88.png)
### Step 4:
![](https://images.viblo.asia/453eb88d-ddf0-4c77-a036-5862d21d6263.png)
### Step 5:
![](https://images.viblo.asia/a7e83616-7a06-4f1d-b3d9-04a063dbf6f5.png)
### Step 6:
![](https://images.viblo.asia/1cc89a6d-eec9-4453-a706-3f04c5a25538.png)
### Step 7:
![](https://images.viblo.asia/b8435aab-f805-488c-89a9-979d4bbfd564.png)
### Step 8:
![](https://images.viblo.asia/194a1c4b-0271-49ce-b306-72d15bb90abf.png)
### Step 9:
![](https://images.viblo.asia/a089cdb7-b308-4664-b58f-3cd34fbebf81.png)
### Step 10:
![](https://images.viblo.asia/7027f985-a142-471a-b22e-7ca6b277d652.png)
### Step 11:
![](https://images.viblo.asia/77ad4713-29d6-4e61-887d-82d5c3920aed.png)
### Step 12:
![](https://images.viblo.asia/9270ac7f-5fb4-40e5-b73f-ea84ce1303b6.png)
#### Install Apache in AWS
##### Connect to AWS by Putty:
![](https://images.viblo.asia/7c8381b8-46f3-4a94-9583-955c369314c7.png)
##### Install Apache server on Centos: `yum install httpd`
* Configure Apache Server on CentOS, RedHat, Linux:
   * Set the apache service to start on boot: `chkconfig --levels 235 httpd on`
   * Enable name-based virtual hosting on port 80:
     * Open the httpd configuration file located at **/etc/httpd/conf/httpd.conf**: `vi /etc/httpd/conf/httpd.conf`
     * Un-comment the line containing the text: `NameVirtualHost *:80`
   * Save the file
   * Restart the Apache HTTP Server daemon: **service httpd restart**
   ![](https://images.viblo.asia/b0e0af85-31a5-49d9-a310-86bea9cbfeeb.png)
    
    **13.58.44.169**: IP public of VM EC2 in AWS
##### We will install Apache on Ubuntu for this lab
```
sudo apt-get update
sudo apt-get install apache2
```

![](https://images.viblo.asia/c37e7b45-1874-4f4b-a2c0-edd513389ae4.png)
**18.188.92.61**: IP public of VM EC2 in AWS
# 2. Generating the Required GCP Credentials
## 2.1. Create a project in GCP
Research more at [here](https://cloud.google.com/resource-manager/docs/creating-managing-projects) to update the GCP's latest information 
## 2.2. Enable Google Compute Engine API
Open the **Products & services** menu, select **APIs & Services > Dashboard**
![](https://images.viblo.asia/77c7555c-b3d5-4c53-897d-5e7c99606088.png)
On the **Dashboard** page, click the **ENABLE APIS & SERVICES** option
![](https://images.viblo.asia/09537463-662e-453e-a701-3f4a8ca1da0b.png)
This will take you to the **API Library** page. On the Library page, search for **Compute Engine API** in the search box.
![](https://images.viblo.asia/0d020b9d-01ab-4401-ad37-0b1d71216725.png)
Click on **Compute Engine API** from the search results.
![](https://images.viblo.asia/492faa83-dc82-4333-a85a-cc7321637809.png)
On the **Google Compute Engine API** page, click **ENABLE**.
![](https://images.viblo.asia/0f7e0eb2-cd8e-40f8-85a4-28c303ea905a.png)
You will see an API enabled confirmation box
![](https://images.viblo.asia/cf6e15c7-c55b-4687-8d37-3c129153707e.png)

## 2.3. Create service account
Open your project and click on the **Products and services** menu and navigate to **IAM & admin > Service accounts**
![](https://images.viblo.asia/6acbb274-807a-44f8-b802-51834fd190bd.png)
On the **Service accounts** page click **Create service account**
![](https://images.viblo.asia/6c3d3837-11d2-49aa-bbfc-0d64c1d4414d.png)
On the **Create service account** dialog box, set the following:
![](https://images.viblo.asia/1e2c11b0-fc5c-4ac6-ba3c-d6b0872c144f.png)
A confirmation message will appear, informing you that your new service account and key have been created, and that the JSON file that contains your Private Key has been downloaded to your computer.
![](https://images.viblo.asia/3cac4c7e-c8b5-4409-9365-a1887eab715c.png)
Close the confirmation message. You will see your new **Service account** on the Service Accounts page
![](https://images.viblo.asia/045e125a-094c-4476-bbab-5cfa519da9b8.png)

# 3. Import AWS into VM instances in compute engine GCP
### Step 1:
![](https://images.viblo.asia/852a9d34-d965-4ee2-8aba-c43c5886309d.png)
### Step 2:
![](https://images.viblo.asia/0e901c59-d7b3-4354-b088-ff8d149ba5ac.png)
### Step 3:
![](https://images.viblo.asia/16b45c9b-05bc-4768-a135-c4877cac6753.png)
### Step 4:
![](https://images.viblo.asia/19690f9d-e167-4709-b023-20af3aa3e17d.png)
**Click here to choose file**
![](https://images.viblo.asia/992ab3ee-17e6-41c1-917b-1dbeb4f44715.png)
Browse to the location of your downloaded **JSON** file. Select your file and click **Open**
![](https://images.viblo.asia/0d649b84-72fd-4c93-a520-71174e04ca0b.png)
Click **save**
### Step 5: 
Next to tab **REPLICATION SETTING**
![](https://images.viblo.asia/4479c34a-ca31-497f-9366-c3510ae01586.png)
Click **SAVE REPLICATION SETTING**
### Step 6:
Click **MACHINE** Categories to **install cloudendure to AWS by Putty**:
![](https://images.viblo.asia/5107c0af-b763-41d1-aa0c-f6c5da5f8980.png)

### Step 7: 
**Install & config cloudendure in AWS by Putty:**
 ![](https://images.viblo.asia/fa7b3939-ac1d-4d9d-8494-40c282696f50.png)
![](https://images.viblo.asia/92ea7cd3-144b-473a-8734-9d91f06e5516.png)

# 4. Migrate Apache server from AWS to GCP
After installed & configed cloudendure in AWS by Putty, process download application in AWS to GCP happening:
* In GCP, click into **Machine name** to config another for application:
![](https://images.viblo.asia/563d936b-c42b-4404-9fbe-429cab66f95c.png)
* Click into **Lauch target machine** -> choose **test**
![](https://images.viblo.asia/ffd0d465-12af-42e6-8d41-adc0f307bf6f.png)
After tested, you can see green line.
![](https://images.viblo.asia/2de65b9d-b49a-441a-8fa7-fe2939e510b9.png)
Continous you clicking into **Lauch target machine** -> choose cut over
![](https://images.viblo.asia/3f9364aa-328e-4ba8-afb1-e4ebd0c6d53e.png)
Click **product & service** menu -> choose **compute engine** -> choose **vm instances**, you see that 1 instances with name **migratetogcp** same that config name above
![](https://images.viblo.asia/2e2eff25-1c76-4742-9f6f-df884819da74.png)
Click **migratetogcp**, choose **edit** and config the following below:
![](https://images.viblo.asia/bdc89cb2-877f-4738-8111-eb2dedf910f2.png)
Save your **VM instances**

On browser, you type **External IP** of instances GCP to run apache server:
![](https://images.viblo.asia/3966a589-2327-4dd0-a3bf-72331e30e6f6.png)
So, we cloned apache server from AWS to GCP finished
# 5. References
* Google Cloud Platform Documentation: https://cloud.google.com/docs
* Migrating AWS instances to Google Cloud:  https://cloud.google.com/migrate/compute-engine/docs/4.11/how-to/migrate-aws-to-gcp/migrating-aws-vms