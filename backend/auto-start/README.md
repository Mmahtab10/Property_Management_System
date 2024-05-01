### Create Startup Script

Create the script:

```bash
echo -e '#!/bin/bash\nexport PATH=/opt/bitnami/node/bin:$PATH\ncd /home/bitnami/htdocs/backend\n/opt/bitnami/node/bin/forever start index.js' > ~/start_forever.sh
```

Make it executable:

```bash
chmod +x ~/start_forever.sh
```

### Set Up Cron Job
Open cron jobs for editing:

```bash
crontab -e
```

Add the following lines to your current cron job:

```cron
@reboot ~/start_forever.sh >> ~/forever_start.log 2>&1
@reboot sudo /opt/bitnami/ctlscript.sh restart apache >> ~/apache_restart.log 2>&1
```

Save and exit the editor
