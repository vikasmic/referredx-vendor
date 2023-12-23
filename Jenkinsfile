pipeline {
    agent any
  
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'sudo mkdir -p /usr/local/referredx-ve'
                sh 'sudo rm -rf /usr/local/referredx-ve/*'
                sh 'sudo cp -adfRp $WORKSPACE/* /usr/local/referredx-ve/'
                sh 'sudo cp -adfrp $WORKSPACE/.env /usr/local/referredx-ve/'
                sh 'cd /usr/local/referredx-ve/'
                sh 'sudo pm2 restart ve'
            }
        }
    }
 }
