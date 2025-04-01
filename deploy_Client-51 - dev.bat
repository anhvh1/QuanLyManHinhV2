Del \\192.168.100.51\WebDeploy\CMS_Test\Client\static\js
Del \\192.168.100.51\WebDeploy\CMS_Test\Client\static\css
robocopy build \\192.168.100.51\WebDeploy\CMS_Test\Client /E /IS /XF *.cs *.mp4 /XD factory
