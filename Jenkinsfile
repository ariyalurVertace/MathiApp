def CODE_PUSH_APP_NAME = "policeapp-android"
def IS_CODE_PUSH = false
pipeline {
  agent any
     
tools {nodejs "node8"}

    stages{

         stage('Initialize variables') {
            steps {
                script {
                    def isCodePush = sh (script: "git log -1 | grep '.*\\[code-push\\].*'", returnStatus: true)
                    def isCodePushMandatory = sh (script: "git log -1 | grep '.*\\[code-push-m\\].*'", returnStatus: true)

                    echo "isCodePush: ${isCodePush}"
                    echo "isCodePushMandatory: ${isCodePushMandatory}"


                    IS_CODE_PUSH = isCodePush == 0 || isCodePushMandatory == 0

                    echo "IS_CODE_PUSH: ${IS_CODE_PUSH}"

                }
            }
        }


       stage('Install dependencies'){
           steps{
echo "Pulling env file from ${HOME}/.env/${env.JOB_NAME}"
sh "cp ${HOME}/.env/${env.JOB_NAME}/.env ."
               script{
if(env.GIT_BRANCH == 'dev') {
               sh 'chmod 777 ${WORKSPACE}/hosting/dev/install.sh'
           sh '${WORKSPACE}/hosting/dev/install.sh'
}
else if(env.GIT_BRANCH == 'sit'){
               sh 'chmod 777 ${WORKSPACE}/hosting/sit/install.sh'
           sh '${WORKSPACE}/hosting/sit/install.sh'
}
else if(env.GIT_BRANCH == 'uat'){
               sh 'chmod 777 ${WORKSPACE}/hosting/uat/install.sh'
           sh '${WORKSPACE}/hosting/uat/install.sh'
}
else if(env.GIT_BRANCH == 'master'){
               sh 'chmod 777 ${WORKSPACE}/hosting/master/install.sh'
           sh '${WORKSPACE}/hosting/master/install.sh'
}
               }

       }
       }


           stage('Code Push') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'ram_code_push_key', variable: 'CODE_PUSH_ACCESS_KEY')]) {
                        def isCodePush = sh (script: "git log -1 | grep '.*\\[code-push\\].*'", returnStatus: true)
                        def isCodePushMandatory = sh (script: "git log -1 | grep '.*\\[code-push-m\\].*'", returnStatus: true)

                        if (!IS_CODE_PUSH) {
                            return
                        }

                        sh 'code-push logout'
                        sh 'code-push login --key ${CODE_PUSH_ACCESS_KEY}'
                        def CODE_PUSH_META_DATA = sh (
    script: "code-push deployment history ${CODE_PUSH_APP_NAME} ${env.GIT_BRANCH} --format json | grep -E 'label' | tail -1",
    returnStdout: true
).trim()

                        def isMandatory = isCodePushMandatory == 0 ?  true : false

                        def label = "${CODE_PUSH_META_DATA.replace(', ', '')}"
                        label = "${label.replace('\'', '')}"
                        label = "${label.replace('label', '')}"
                        label = "${label.replace('v', '')}"
                        label = "${label.replace('[', '')}"
                        label = "${label.replace(']', '')}"

                        if (label.isInteger()) {
                            label =  label as Integer
                        }
else {
                            label = 1
}
                        label = 'v' + label

                        echo "label: ${label}"

                        sh "code-push release-react ${CODE_PUSH_APP_NAME} android -d ${env.GIT_BRANCH} -m ${isMandatory}"

                }

            }
        }
    }

       stage('Cleaning'){
           steps{
               script{
               sh 'chmod 777 ${WORKSPACE}/hosting/clean.sh'
           sh '${WORKSPACE}/hosting/clean.sh'
               }

       }
       }

              stage('Building APK'){
           steps{
               script{  
if(env.GIT_BRANCH == 'dev'){
               sh 'chmod 777 ${WORKSPACE}/hosting/dev/build.sh'
           sh '${WORKSPACE}/hosting/dev/build.sh'
}
else if(env.GIT_BRANCH == 'sit'){
               sh 'chmod 777 ${WORKSPACE}/hosting/sit/build.sh'
           sh '${WORKSPACE}/hosting/sit/build.sh'
}
else if(env.GIT_BRANCH == 'uat'){
               sh 'chmod 777 ${WORKSPACE}/hosting/uat/build.sh'
           sh '${WORKSPACE}/hosting/uat/build.sh'
}
else if(env.GIT_BRANCH == 'master'){
               sh 'chmod 777 ${WORKSPACE}/hosting/master/build.sh'
           sh '${WORKSPACE}/hosting/master/build.sh'
}
               }

       }
       }

              stage('Bundling aab file'){
           steps{
               script{
if(env.GIT_BRANCH == 'master'){
               sh 'chmod 777 ${WORKSPACE}/hosting/master/bundle.sh'
           sh '${WORKSPACE}/hosting/master/bundle.sh'
}
               }

       }
       }

              stage('Copying builds to server'){
           steps{
                withAWS(region:'ap-south-1') {
               withAWS(credentials:'954b5cb8-bb9f-4499-8cc3-9a922aca57e1') {
               script{
    def apkPath = "android/app/build/outputs/apk/release"
def bundlePath = "android/app/build/outputs/bundle/release"
def VERSION_NAME = sh (
    script: "grep versionName android/app/build.gradle | awk '{print \$2}' | sed -E 's/\"/ /g'",
    returnStdout: true
).trim()
echo "Version Name: ${VERSION_NAME}"
def copyPath = "${env.JOB_NAME}/${VERSION_NAME}"
s3Upload(bucket:"vertaceapks", file:apkPath,  path:copyPath, acl:'PublicRead')

if(env.GIT_BRANCH == 'master'){
    s3Upload(bucket:"vertaceapks", file:bundlePath, path:copyPath, acl:'PublicRead')
}

}
       }

       }

           }

              }

              stage('Publish to Play Store') {
            steps {
                script {
                    if (IS_CODE_PUSH) {
                        sh 'exit 0'
                        return
                    }

                    if (env.GIT_BRANCH == 'master') {
                        def VERSION_NAME = sh (
    script: "grep versionName android/app/build.gradle | awk '{print \$2}' | sed -E 's/\"/ /g'",
    returnStdout: true
).trim()
                        echo "Version Name: ${VERSION_NAME}"
                        androidApkUpload apkFilesPattern: 'android/app/build/outputs/bundle/release/app.aab', googleCredentialsId: 'vertace_play_store', trackName: 'production'
                    }
                }
            }
        }

       }
	   
	       post {
        always {
            echo 'Notifying culprits/developers'
            
emailext(body: '${DEFAULT_CONTENT}', mimeType: 'text/html',
         replyTo: '$DEFAULT_REPLYTO', subject: '${DEFAULT_SUBJECT}',
         to: emailextrecipients([[$class: 'CulpritsRecipientProvider'],
								[$class: 'DevelopersRecipientProvider'],
                                 [$class: 'RequesterRecipientProvider']]))
            
        }
    }
}