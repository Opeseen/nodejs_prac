pipeline{
   agent any
   environment{
    AWS_ECR_Credential = 'ecr:us-east-1:awscreds'
    NodeJS_ECR_Registry = "430776688613.dkr.ecr.us-east-1.amazonaws.com/nodejsapp"
    NODEJS_ECR_RegistryUrl = "https://430776688613.dkr.ecr.us-east-1.amazonaws.com"
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
                dockerImage = docker.build(NodeJS_ECR_Registry + ":$BUILD_NUMBER", "./Self_build/")
            }
        }
    }

    stage('Upload-to-ECR'){
        steps{
            script{
                docker.withRegistry(NODEJS_ECR_RegistryUrl,AWS_ECR_Credential){
                    dockerImage.push("opeyemi_V"+"$BUILD_NUMBER")
                }
            }
        }
    }


    stage('Completed'){
        steps{
            sleep(2)
            echo "Completed.."
        }
    }

   }
    
}