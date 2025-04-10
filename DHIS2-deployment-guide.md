# Step by step deployment guide on AWS
1. Create a dedicated user called dhis for running DHIS2 on the VM:
```
sudo useradd -d /home/dhis -m dhis -s /bin/false
```
2. Install PostgreSQL:
```
sudo apt-get install postgresql-12 postgresql-12-postgis-3
```
3. Create a non-privileged user called dhis:
```
sudo -u postgres createuser -SDRP dhis
```
4. Create a database called dhis2:
```
sudo -u postgres createdb -O dhis dhis2
```
5. Restart PostgreSQL:
```
sudo systemctl restart postgresql
```
6. Install java JDK
```
sudo apt-get install openjdk-11-jdk
```
7. Create file `dhis.conf` in the `/home/dhis/config/` directory

8. Modify the following lines to fit your configurations:
```
# Database username
connection.username = dhis

# Database password
connection.password = dhis
```
9. Protect the configuration file from unauthorized access.
```
sudo chmod 600 dhis.conf
```
9. Install tomcat servlet 
```
sudo apt-get install tomcat8-user
```
10. Create a tomcat instance in a directory called `tomcat-dhis`
```
cd /home/dhis/
sudo tomcat8-instance-create tomcat-dhis
sudo chown -R dhis:dhis tomcat-dhis/
```
11. Edit the file `tomcat-dhis/bin/setenv.sh` and modify the `JAVA_HOME` and `DHIS2_HOME` variables to set the path to java and the path to the Java distribution and dhis.conf files respectively.
12. Modify the tomcat configuration file `tomcat-dhis/conf/server.xml` and add the line `relaxedQueryChars="[]"` to the connector element.
```
<Connector port="8080" protocol="HTTP/1.1"
  connectionTimeout="20000"
  redirectPort="8443"
  relaxedQueryChars="[]" />
```
13. Download WAR file from https://releases.dhis2.org/
14. Move the WAR file to the tomcat webapps directory
```
mv dhis.war tomcat-dhis/webapps/ROOT.war
```
15. Modify the `tomcat-dhis/bin/startup.sh` script
```
#!/bin/sh
set -e

if [ "$(id -u)" -eq "0" ]; then
  echo "This script must NOT be run as root" 1>&2
  exit 1
fi

export CATALINA_BASE="/home/dhis/tomcat-dhis"
/usr/share/tomcat8/bin/startup.sh
echo "Tomcat started"
```
16. Start DHIS2
```
sudo -u dhis tomcat-dhis/bin/startup.sh
```
17. Finally access the web console via `http://<ip_address>:8080`






