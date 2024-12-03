pipeline{
    agent any

    environment {
       // PATH = "$PATH:/opt/apache-maven-3.8.2/bin"
       PATH = "$PATH:/opt/share/maven"
    }

            stage('GetCode'){
          steps{
               checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/mfmondal/student-profile-angular.git']])
            }
        }
        
         stage('Install Dependencies') {
          steps {
    
            sh 'npm install'
          }
        }

        stage('Build Project') {
          steps {
            // Build the Angular project
            sh 'npm run build'
          }
        }

        
        stage('Build Docker Image'){
            steps{
                sh 'docker build -t frmondal/student-profile-angular .'
            }
        }

                
        stage('SonarQube analysis') {
		    withSonarQubeEnv() {
		      sh "${mvn}/bin/mvn clean verify sonar:sonar -Dsonar.projectKey=student-profile"
		    }
        
        stage('Push Docker Image to DockerHub'){
            steps{
                 withCredentials([string(credentialsId: 'dockerhubpassword', variable: 'dockerhubpassword')]) {
                 sh 'docker login -u frmondal -p ${dockerhubpassword}'
                 sh 'docker push frmondal/student-profile-angular'

                }
            }
        }
		

    stage ("docker push") {
         steps {
             script {
                sh 'aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 908066074929.dkr.ecr.us-east-1.amazonaws.com'
                sh "docker push docker push 908066074929.dkr.ecr.us-east-1.amazonaws.com/student-profile-angular"
                 
             }
           }   
        }
        
        stage ("Deploy to K8S") {
            steps {
                withKubeConfig(caCertificate: '', clusterName: '', contextName: '', credentialsId: 'K8S', namespace: '', restrictKubeConfigAccess: false, serverUrl: '') {
                sh "kubectl apply -f eks-deploy-k8s.yaml"
                    
                }
            }
        }
    }
}