pipeline {
    agent any
  
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh 'rm -rf $WORKSPACE/dist'
                sh 'npm install'
                sh 'sudo mkdir -p /usr/local/referredx-ve'
                sh 'sudo rm -rf /usr/local/referredx-ve/*'
                sh 'sudo cp -adfRp $WORKSPACE/* /usr/local/referredx-ve/'
                sh 'npm run ng build'
                sh 'sudo cp -adfRp $WORKSPACE/dist /var/www/html/ve/dist'
                sh 'sudo chown -R www-data: /var/www/html/ve/dist'
                sh 'sudo systemctl restart nginx'
                sh 'cd /usr/local/referredx-ve/'
                sh 'sudo pm2 restart ve'
            }
        }
    }
 }
