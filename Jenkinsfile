pipeline{
    agent any

   tools {
      nodejs "Nodejs"
   }

    environment {
       // PATH = "$PATH:/opt/apache-maven-3.8.2/bin"
       PATH = "$PATH:/opt/share/maven"
    }
    stages{
       stage('GetCode'){
            steps{
               // git 'https://github.com/mfmondal/student-profile-angular.git'
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


    stage('Docker Build and Push') {
      steps {
          sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
          sh 'docker build -t frmondal/student-profile-angular:1.0 .'
          sh 'docker push frmondal/student-profile-angular:1.0'
      }
    }


        stage('SonarQube analysis') {
			//def mvn = tool 'Default Maven';
		    withSonarQubeEnv() {
		      sh "${mvn}/bin/mvn clean verify sonar:sonar -Dsonar.projectKey=student-profile"
		    }
		}
    }
}