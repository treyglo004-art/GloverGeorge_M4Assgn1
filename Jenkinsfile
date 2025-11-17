pipeline {
    agent any

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
    }
}

