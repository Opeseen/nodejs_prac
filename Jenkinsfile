pipeline{
    agent any
    stages{
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
        stage('Completed'){
            steps{
                echo "Completed"
            }
        }
    }

}