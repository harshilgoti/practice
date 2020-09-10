pipeline {
    agent {
        docker {
               image 'node:10.16'
        }
    }
    options {
        timeout(10) 
    }
    
    triggers {
        githubPush()
    }
    
    environment {
        EMAIL_TO_SEND_CC_DEV = "kavyeshshah.albetrios@gmail.com"
        EMAIL_TO_SEND_CC_PROD = "adi@zerotocareer.com"
    }
    
    stages {
        stage('Build') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'master') {
                        withAWS(region:'us-east-2', credentials:'jenkins-zerotocareer') {
                            s3Download(file:'.env', bucket:'env.zerotocareer', path:"zero-to-career-fe/${env.BRANCH_NAME}/.env", force:true)
                        }
                    }
                    if (env.BRANCH_NAME == 'development') {
                        withAWS(region:'us-east-2', credentials:'jenkins-zerotocareer') {
                            s3Download(file:'.env', bucket:'env.zerotocareer', path:"zero-to-career-fe/${env.BRANCH_NAME}/.env", force:true)
                        }
                    }
                    if (env.BRANCH_NAME == 'staging') {
                        withAWS(region:'us-east-2', credentials:'jenkins-zerotocareer') {
                            s3Download(file:'.env', bucket:'env.zerotocareer', path:"zero-to-career-fe/${env.BRANCH_NAME}/.env", force:true)
                        }
                    }
                    sh 'npm -v'
                    sh 'node -v'
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        stage('Deploy'){
            steps{
                script {
                     if (env.BRANCH_NAME == 'master') {
                        withAWS(region:'us-east-2',credentials:'jenkins-zerotocareer'){
                            s3Upload(file:'build', bucket:'app.zerotocareer.com', path:'')
                            cfInvalidate(distribution:'E2Y075CSLP0Q1B', paths:['/*'], waitForCompletion: false)
                        }        
                     }
                     if (env.BRANCH_NAME == 'development') {
                        withAWS(region:'us-east-2',credentials:'jenkins-zerotocareer'){
                            s3Upload(file:'build', bucket:'devapp.zerotocareer.com', path:'')
                            cfInvalidate(distribution:'ERPPH0WBIMIW6', paths:['/*'], waitForCompletion: false)
                        }        
                     }
                     if (env.BRANCH_NAME == 'staging') {
                        withAWS(region:'us-east-2',credentials:'jenkins-zerotocareer'){
                            s3Upload(file:'build', bucket:'stagapp.zerotocareer.com', path:'')
                            cfInvalidate(distribution:'E2YHBWF5TO12LO', paths:['/*'], waitForCompletion: false)
                        }        
                     }
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
        // Triggering Mails
        success {  
            script {
                if (env.BRANCH_NAME == 'development') {
                    mail body: "<b>Jenkins Build Status</b><br>Project: ${env.JOB_NAME} <br>Build Number: ${env.BUILD_NUMBER} <br> URL build: ${env.BUILD_URL} <br><h3>Status: Success</h3><br>", cc: "${env.EMAIL_TO_SEND_CC_DEV}", charset: 'UTF-8', from: 'jenkins@zerotocareer.com', mimeType: 'text/html', replyTo: '', subject: "SUCCESS CI: Project name -> ${env.JOB_NAME}", to: "nikunjmavani@albetrios.com, rohitkothiya.albetrios@gmail.com, harshilgoti.albetrios@gmail.com";
                }
                if (env.BRANCH_NAME == 'master' || env.BRANCH_NAME == 'staging') {
                    mail body: "<b>Jenkins Build Status</b><br>Project: ${env.JOB_NAME} <br>Build Number: ${env.BUILD_NUMBER} <br> URL build: ${env.BUILD_URL} <br><h3>Status: Success</h3><br>", cc: "${env.EMAIL_TO_SEND_CC_PROD}", charset: 'UTF-8', from: 'jenkins@zerotocareer.com', mimeType: 'text/html', replyTo: '', subject: "SUCCESS CI: Project name -> ${env.JOB_NAME}", to: "nikunjmavani@albetrios.com";
                }
            }
        }  
        
        failure {  
            script {
                if (env.BRANCH_NAME == 'development') {
                    mail body: "<b>Jenkins Build Status</b><br>Project: ${env.JOB_NAME} <br>Build Number: ${env.BUILD_NUMBER} <br> URL build: ${env.BUILD_URL} <br><h3>Status: Error</h3><br>", cc: "${env.EMAIL_TO_SEND_CC_DEV}", charset: 'UTF-8', from: 'jenkins@zerotocareer.com', mimeType: 'text/html', replyTo: '', subject: "ERROR CI: Project name -> ${env.JOB_NAME}", to: "nikunjmavani@albetrios.com, rohitkothiya.albetrios@gmail.com, harshilgoti.albetrios@gmail.com";  
                }
                if (env.BRANCH_NAME == 'master' || env.BRANCH_NAME == 'staging') {
                    mail body: "<b>Jenkins Build Status</b><br>Project: ${env.JOB_NAME} <br>Build Number: ${env.BUILD_NUMBER} <br> URL build: ${env.BUILD_URL} <br><h3>Status: Error</h3><br>", cc: "${env.EMAIL_TO_SEND_CC_PROD}", charset: 'UTF-8', from: 'jenkins@zerotocareer.com', mimeType: 'text/html', replyTo: '', subject: "ERROR CI: Project name -> ${env.JOB_NAME}", to: "nikunjmavani@albetrios.com";  
                }
                
            }  
        }
    }
}
