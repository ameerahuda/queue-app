# queue-app

This project is a simple React implementation of a Queue app. 

## Project Structure
The project is broken down into two compenents:
1. Front-End which is in the /app directory
```bash
    ├── public              
    ├── src
    │   ├── components          
    │   ├── context
    │   ├── pages           
    │   └── services        # not implemented yet, will hold all the requests made to the server-side app
    ├── .gitignore
    ├── README.md  
    ├── package-lock.json 
    └── package.json
 ```
   
2. Server-Side which is in the /server directory (NOT IMPLEMENTED YET)

## Instructions to Run Front-End

* Front-End was created using React
* State management was implemented using React Context
* App was styled using the styled-componet framework

To run this app, execute the following command in the /app directory:

### `npm start`

## Next Steps
* Implementing the Server-Side app using NodeJS
  * Connecting APIs between the app and the server for all requests
  * Creating a local database using MySQL
