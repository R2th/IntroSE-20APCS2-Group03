# 1. Overview
Google Stackdriver performs monitoring, logging and diagnostics to help businesses ensure optimal performance and availability. The service gathers performance metrics and metadata from multiple cloud accounts and allows IT teams to view that data through custom dashboard, charts and reports.  

Google Stackdriver is natively integrated with [Google Cloud Platform](http://searchcloudcomputing.techtarget.com/definition/Google-Cloud-Platform) and hosted on Google infrastructure, but the monitoring capabilities can also be used for applications and virtual machines (VMs) that run on [Amazon Web Services Elastic Compute Cloud (AWS EC2)](http://searchaws.techtarget.com/definition/Amazon-Elastic-Compute-Cloud-Amazon-EC2). In addition, it can pull performance data from open source systems, such as [Cassandra](http://whatis.techtarget.com/definition/Cassandra-Apache-Cassandra), [Apache Web Server](http://searchsoa.techtarget.com/definition/Apache) and [ElasticSearch](http://whatis.techtarget.com/definition/ElasticSearch).
# 2. Create a Compute Engine instance
In the GCP Console dashboard, go to **Menu > Compute Engine > VM instances, then click Create Instance**.

![](https://images.viblo.asia/40ff3d4b-1213-4dc3-bf56-c8cadf05963d.png)

Fill in the fields for your instance as follows:

**Name:  your-name (name must be lowercase, number, hyphen)**

**Machine type: Small**

**Firewall**: Select both Allow HTTP traffic and Allow HTTPS traffic

Leave the rest of the fields with their default values.

Click **Create**.

![](https://images.viblo.asia/d0fe199c-e76c-4e51-9000-9a805ac6bef6.png)

# 3. Add Apache2 HTTP Server to your instance
If you were to browse to the instance's external IP address, you'd get an error. Now you'll learn how to fix that.

In the Console, click the SSH to open a terminal to your instance.

Run the following commands in the SSH window to set up Apache2 HTTP Server:

![](https://images.viblo.asia/433070d9-e395-4723-bb5e-890986e7a9c2.png)

```
sudo apt-get update
sudo apt-get install apache2 php7.0
```

When asked if you want to continue, type Y

**Note**: If you cannot install php7.0, use php5.

![](https://images.viblo.asia/9589ac35-96cd-484b-a8a0-e2b72789bf21.png)
![](https://images.viblo.asia/125f9fdc-58e1-465c-8fe1-ce97563fa2be.png)

**Restart service apache2 :**

![](https://images.viblo.asia/33e60c87-efbb-40c5-82bd-e6c60900beb0.png)

If you visit http://<EXTERNAL_IP>, you see the Apache2 default page:

![](https://images.viblo.asia/28e5f72c-ab82-4540-9bff-9158b1f00a44.png)
![](https://images.viblo.asia/d1c35b33-d2cc-4ab1-b9d4-a5a883053004.png)

Make sure that you're using **HTTP** and not **HTTPS** for the external IP address
# 4. Create a Stackdriver account
![](https://images.viblo.asia/b9553389-521c-4038-acbc-3a43666047ad.png)
![](https://images.viblo.asia/f1e52be1-5f43-4dbf-9b4a-deef30c96aa8.png)

On the following pages:
* Add Google Cloud Platform projects to monitor - click Continue
* Monitor AWS accounts - Skip AWS Setup
* Install the Stackdriver Agents - Run the commands shown on screen in the SSH window for your instance. Click Continue when you're done.
* Get Reports by Email - select No reports then Continue.

![](https://images.viblo.asia/77f10c62-65e4-4da4-bcfd-5fff7f8c342c.png)
![](https://images.viblo.asia/b59cd336-e4b7-49c0-b202-06d08c7a15fa.png)

Install stackdriver:

![](https://images.viblo.asia/bc2a3b60-e3f0-44c0-a8b0-a396d75cb6a1.png)
![](https://images.viblo.asia/993280be-c4df-400a-a509-ccfbb9dddee7.png)

Continue installing:

![](https://images.viblo.asia/e1546a23-fa33-4c44-b671-9e4f15aaf705.png)
![](https://images.viblo.asia/98a2dbd0-ea27-4cc5-be4f-68b437458e40.png)

Click **launch mornitor**.  A pop-up message will inform you that your account is in a free trial. Click **Continue with the trial**.

You see your Stackdriver account dashboard. Close the "Welcome to Stackdriver" banner.

![](https://images.viblo.asia/f313c112-be9c-4313-88ae-4ae00de04bfe.png)

Dashboard Stackdriver:

![](https://images.viblo.asia/a1f4e824-19c0-4290-83f8-2e6db1de3a1d.png)

# 5. Create an uptime check and an alerting policy
**Uptime** Checks verify that your web server is always accessible. The alerting policy controls who is notified if the uptime checks should fail.

On the Stackdriver tab click **Create an Uptime Check** button on the dashboard. You can also go to **Uptime Checks** in the left-hand menu, then select **Uptime Checks Overview** and then click **Create an Uptime Check** on the new page.

Edit the **New Uptime Check** panel by editing the following fields:
* **Title**: Lamp Uptime Check
* **Check type**: HTTP
* **Resource Type**: Instance
* **Applies To**: Single, lamp-1-vm
* **Check every**: 1 min

![](https://images.viblo.asia/49163716-be8f-46dd-a444-f162ab5c640a.png)

Click **Test** to verify your uptime check is working.

If you see

`Connection error - refused`

a message, you might have not installed the [Apache HTTP Server](https://cloud.google.com/monitoring/quickstart-lamp#install-apache). For other errors, see [Uptime checks](https://cloud.google.com/monitoring/alerts/uptime-checks#test-and-save).

I have error when tested:

![](https://images.viblo.asia/0341654d-573c-47ee-9cd3-79908d469d58.png)

Don't worry, you can press save and create **Create Alerting Policy**.

When you see a green check mark everything is running correctly. Click **Save**.

![](https://images.viblo.asia/e57faee1-39f0-4b0b-ae0c-bd940002b2da.png)

You see the following panel in dasbboard -- click **Create Alerting Policy**:

![](https://images.viblo.asia/f74dc523-dbb9-49e0-ac36-4b1c15a3cd97.png)

Update the Alerting Policy this way:
* The **Conditions** section is already set up. You don't have to change it.
* In the **Notifications** section, click **Add Notification** and fill in your personal email address. You will need to check it for the notification.
* In the **Documentation** section, click **Add Documentation** and enter: **Stackdriver LAMP gettting started example**
* In the **Name this policy** section, you can accept the default: **Uptime Check Policy** 

![](https://images.viblo.asia/def62d39-fd86-4df5-a80d-44d453725a5c.png)
![](https://images.viblo.asia/2036ec95-f221-4be1-84f8-41ded817c3dd.png)

Click **Save Policy**.

The Dashboard will now have your Uptime Check added to it.

# 6. Create a dashboard and chart
Display the metrics collected by Stackdriver Monitoring in your own charts and dashboards. Now you'll create the charts for the lab metrics and a custom dashboard.

In the left-hand menu of Stackdriver Monitoring Console, select **Dashboards > Create Dashboard**.

Click **Add Chart**.

Click into the **Find resource type and metric** field and start typing **"CPU"**, then select **CPU Load (1m)**.

![](https://images.viblo.asia/db744a4f-c969-4ea0-964c-7309e8f85ec1.png)

You will automatically have **GCE VM instance** selected as the Resource type. The chart will name itself after the metric you're using, but you can rename it whatever you want.

Click **Save**.

![](https://images.viblo.asia/cfda5662-1f42-4dfa-8687-a0919c2fcbde.png)

Now create a second chart.

Select **Add Chart**  in the upper-right menu of the new dashboard.

In the field start typing **"Network"**, then choose **"Received Packets"**. Leave the other fields with their default values. You see the chart data in the Preview section.

![](https://images.viblo.asia/ed2509d8-4de5-47c7-99e5-9b1cbff9aad0.png)

Click **Save**.

![](https://images.viblo.asia/6dccf9e4-8e31-492c-aebe-0ab703c2a28a.png)

You still need to name your new Dashboard! Change **Untitled Dashboard** to **Stackdriver LAMP gettting started example**

![](https://images.viblo.asia/2902d932-9909-418c-aa2f-c1284528fd2c.png)

# 7. Test the check and alert
To test the Check and Alert, go back to the Console tab and the VM Instances page. Click on your instance, and click **Stop** from the top menu.

![](https://images.viblo.asia/30244967-6f20-41a2-a12d-e66fa7409543.png)

After stopped and wait several minute to start:

![](https://images.viblo.asia/fad1f73e-a2cd-46f3-b308-29c8da255990.png)

You might wait up to five minutes for the next uptime check to fail. The alert and notification will happen when the next failure occurs.

After a couple of minutes, correct the **"problem"** by returning to the VM Instances page in the Console, select your instance, and click **Start** from the top menu.

![](https://images.viblo.asia/a4ecdcc9-fc0a-43b0-ab30-222d2a1036ac.png)

**Note**: Remember that the uptime check runs once per minute, so if you turn your machine back on in under a minute, it won't violate your uptime policy and you won't see the alert.

You'll see an Incident notice on the Monitoring Overview page on Stackdriver.

![](https://images.viblo.asia/88bc95a1-ff9e-4c8e-832f-6c4d7609f523.png)

The alert email notification will look something like this:

![](https://images.viblo.asia/e356b6ff-ee58-4c23-ac7d-2c0c36b2c387.png)

# 8. View your logs
Stackdriver Monitoring and Stackdriver Logging are closely integrated. Let's check out the logs for your lab.

In the Stackdriver left-hand menu, click **Logging** to see the Logs Viewer. Now change the focus to see the logs you want:
* Select GCE VM Instance in the first drop-down menu.
* Select syslog in the second drop-down menu, and click OK.
* Leave the other fields with their default values.

You see the logs from your VM instance:

![](https://images.viblo.asia/a3287981-a44c-4ccf-ac84-2a4d69da6c44.png)
# 9. References Document:
[1]  Stackdriver Documentation: https://cloud.google.com/stackdriver/docs/

[2] Stackdriver: Qwik Start