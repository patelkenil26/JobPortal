Job Portal

Table of Contents
Introduction
Features
Technologies Used
Installation
Usage
Contributing
License
Contact
Introduction
The Job Portal project is a web application designed to help users find jobs and employers to post job listings. It provides a streamlined way for job seekers to browse available positions and apply for them, while allowing recruiters to manage job postings and candidate applications.

Features
Job seeker registration and login.
Employer registration and job posting functionality.
Search and filter job listings based on category, location, and more.
Job application system where candidates can submit their resumes.
Admin panel for managing job listings and user accounts.
Technologies Used
Backend: Node.js, Express.js
Frontend: HTML, CSS, JavaScript, Bootstrap
Database: MongoDB
Authentication: JWT (JSON Web Tokens)
Version Control: Git and GitHub
Installation
Follow the steps below to get a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
Make sure you have the following installed on your local machine:

Node.js
MongoDB
Steps
Clone the repository to your local machine:

bash
Copy code
git clone https://github.com/patelkenil26/JobPortal.git
Navigate to the project directory:

bash
Copy code
cd JobPortal
Install the required dependencies:

bash
Copy code
npm install
Set up your environment variables. Create a .env file in the root of the project and add the following:

bash
Copy code
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
Start the server:

bash
Copy code
npm start
Open a browser and navigate to:

arduino
Copy code
http://localhost:3000
Usage
For Job Seekers:
Register as a job seeker.
Browse available jobs and filter based on your preferences.
Apply to jobs by submitting your resume.
For Employers:
Register as an employer.
Post job openings.
Manage applications from the dashboard.