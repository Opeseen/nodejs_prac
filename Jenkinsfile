pipeline{
   agent any
   environment{
    AWSregistryCredential = 'ecr:us-east-1:awscreds'
    NodeJSappRegistry = "430776688613.dkr.ecr.us-east-1.amazonaws.com/nodejsapp"
    nodejsRegistryUrl = "https://430776688613.dkr.ecr.us-east-1.amazonaws.com"
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
                dockerImage = docker.build(NodeJSappRegistry + ":$BUILD_NUMBER", "./Self_build/")
            }
        }
    }

    stage('Upload-to-ECR'){
        steps{
            script{
                docker.withRegistry(nodejsRegistryUrl,AWSregistryCredential){
                    dockerImage.push("opeyemiV"+"$BUILD_NUMBER")
                }
            }
        }
    }


    stage('Final'){
        steps{
            sleep(2)
            echo "Completed.."
        }
    }

   }
    
}