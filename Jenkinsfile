pipeline {
    agent any

    options {
        timestamps()  
    }

    stages {

        stage('Clone Repo') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/treyglo004-art/GloverGeorge_M4Assgn1.git'
            }
        }

        stage('Build Backend') {
            steps {
                sh 'cd backend && npm install'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'cd frontend && npm install'
            }
        }

        stage('Test Backend') {
            steps {
                sh 'echo "No backend tests yet"'
            }
        }

        stage('Test Frontend') {
            steps {
                sh 'echo "No frontend tests yet"'
            }
        }

        stage('Run Backend Smoke Test') {
            steps {
                sh '''
                    echo "Starting backend server for smoke test..."
                    cd backend
                    node server.js &
                    sleep 5
                '''
                sh 'curl http://localhost:4000/expenses'
            }
        }
    } // end stages

    post {

        // This ALWAYS runs (success or failure)
        always {
            echo "Cleaning workspace..."
            cleanWs()

            echo "Archiving logs..."
            archiveArtifacts artifacts: '**/logs/*.log', fingerprint: true
        }

        // Runs on SUCCESS only
        success {
            echo "Build completed successfully."
        }

        // Runs on FAILURE only
        failure {
            echo "Build failed — sending email notification."
            mail to: 'george.glover@lsu.edu',
                subject: "Jenkins Build Failed: ${env.JOB_NAME}",
                body: "The build #${env.BUILD_NUMBER} has failed. Check Jenkins."

            echo "Incident Response: Logging incident file."
            sh 'echo "Build failed on $(date)" > incident-report.txt'
            archiveArtifacts artifacts: 'incident-report.txt'
        }
    }
}
