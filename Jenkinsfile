pipeline{
    agent any
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
       stage('Build'){
            steps{
               // sh 'mvn clean package'
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