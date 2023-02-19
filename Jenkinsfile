pipeline{
    agent{
        label "SLAVE"
    }
    stages{
        stage("Fetch-Code"){
            steps{
                git branch: 'self-build', url: 'https://github.com/Opeseen/nodejs-prac.git'
            }
         
        }
        stage('Build-Job'){
            steps{
                sh 'cd Self_build && npm install'
            }
        }
        stage('Run-Job'){
            steps{
                sh 'cd Self_build && npm run watch'
            }
        }
    }

}