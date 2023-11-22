# Microservices with Node.js and Angular

## Overview

This repository contains the code for Section 2 of the course "Microservices with Node.js and React" available on Udemy.

While the course is originally taught using React, I've implemented the examples and projects using Angular v17.

## Course Information

- **Course Title:** Microservices with Node.js and React
- **Instructor:** [Stephen Grider](https://www.udemy.com/course/microservices-with-node-js-and-react/#instructor-1)
- **Course Link:** [Udemy Course Link](https://www.udemy.com/course/microservices-with-node-js-and-react/)

## Description

This course covers the fundamentals of building microservices using Node.js and React. I've adapted the code to use
Angular, providing an alternative perspective for those comfortable with Angular or interested in learning it alongside
microservices.

## Running the Project

This guide assumes that Docker and Kubernetes are already installed in your local machine.

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/microservices-nodejs-angular.git
   ```

2. Download and Install Skaffold [here](https://skaffold.dev/):


3. Add `127.0.0.1 posts.com` to your OS' hosts file
    - MacOS/Linux: `/etc/hosts`
    - Windows:  `C:\Windows\System32\drivers\etc\hosts`


4. Run the following command on the project's root directory:

   ```bash
   $ skaffold dev
   ```

5. Access the Angular application by adding `posts.com` to your browser's address bar.


