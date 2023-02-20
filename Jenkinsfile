pipeline{
   agent any
   environment{
    registryCredential = 'ecr:us-east-1:awscreds'
    appRegistry = "430776688613.dkr.ecr.us-east-1.amazonaws.com/nodejsapp"
    nodejsRegistry = "https://430776688613.dkr.ecr.us-east-1.amazonaws.com"
   }
   stages{
    stage("Fetch-Code"){
        steps{
            git branch: 'docker-cicd', url: "https://github.com/Opeseen/nodejs_prac.git"
        }
    }

    stage("Build-job"){
        steps{
            script{
                dockerImage = docker.build(appRegistry + ":$BUILD_NUMBER", "./Self_build/")
            }
        }
    }

    stage('Upload-to-ECR'){
        steps{
            script{
                docker.withRegistry(nodejsRegistry,registryCredential){
                    dockerImage.push("$BUILD_NUMBER" + "latest")
                }
            }
        }
    }


    stage('Final'){
        steps{
            sleep(3)
            echo "Completed.."
        }
    }

   }
    
}