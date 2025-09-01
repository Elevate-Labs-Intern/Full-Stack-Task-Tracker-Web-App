# Tack Tracker Web App 📝
## 🔗 See it live(Non-deployed right now)
### Objective 🎯 
Create a full stack(Spring Boot, React, RESTful API, PostgreSQL database(integrated with Spring Data JPA)) task tracker web app

### Tools 🛠️
Java, Spring Boot, React, PostgreSQL, Docker, H2 Database, Postman, Swagger

## Implementations 🚀  
1. A Spring Boot app with Web, Lombok, H2 Database, JDBC API, PostgreSQL Driver, JPA, DevTools, <br>   Springdoc OpenAPI/Swagger dependencies.  
2. Task and TaskList entities with corresponding DTOs in the domain model.  
3. Mappers(for conversion between Java objects and DTOs) and entity relationships.  
4. JPA Repositories for dealing with Task and TaskList databases.  
5. CRUD based RESTful APIs using @RestController and @Service for both entities.  
6. Test API endpoints using Postman collections.  
7. Filtering(by task status or by task priority), pagination(in task lists - 5 tasks/page)(First, Previous, Next and Last buttons), <br>and sorting(by task priority or task due date) in the ReactJS frontend.  
8. Document API with Swagger using Springdoc dependency(OpenAPI3 specification).  

### Deliverables
Source code(Spring Boot backend, React frontend and RESTful API), Postman collection, Swagger UI link

## 📷 Illustrative Screenshots 📷 
<table>
  <tr>
    <td align="center">
      <img width="450" src="https://github.com/user-attachments/assets/1c1b2d61-61fb-4a0f-9428-a2fa0101eb06" alt="Create task T9" /><br/>
      <strong>📝 Create task T9</strong>
    </td>
    <td align="center">
      <img width="450" src="https://github.com/user-attachments/assets/089a0c25-2613-4c54-907f-4083e5b65da4" alt="View Task Lists" /><br/>
      <strong>📋 View Task Lists</strong>
    </td>
  </tr>
</table>

<br/>

<table>
  <tr>
    <td align="center">
      <img width="450" src="https://github.com/user-attachments/assets/9aecc94a-fa36-4321-9924-cee2313a6520" alt="Updated the Task List" /><br/>
      <strong>🔄 Updated "The Task List"</strong>
    </td>
    <td align="center">
      <img width="450" src="https://github.com/user-attachments/assets/f640cab9-c9fb-47d6-9aec-19c1c130f388" alt="Deleted Task T2" /><br/>
      <strong>🗑️ Deleted Task T2</strong>
    </td>
  </tr>
</table>

<br/>

<table>
  <tr>
    <td align="center">
      <img width="450" src="https://github.com/user-attachments/assets/f98a6918-0390-4524-bfbc-b7cf6f3ecf03" alt="Swagger Documentation" /><br/>
      <strong>📖 Swagger Documentation</strong>
    </td>
    <td align="center">
      <img width="450" src="https://github.com/user-attachments/assets/5b6c6c21-3ba6-4067-a03a-faf7f930453e" alt="Postman Endpoint Testing" /><br/>
      <strong>📬 Postman Endpoint Testing</strong>
    </td>
  </tr>
</table>

<div align="center">
  <img width="1047" height="138" alt="Image" src="https://github.com/user-attachments/assets/8fb90e9c-ba6b-49a8-9268-c1cd2612b8ef" />
  <strong>📋 task_lists Table</strong>
</div>
<!--<img width="1440" height="697" alt="Image" src="https://github.com/user-attachments/assets/089a0c25-2613-4c54-907f-4083e5b65da4" />-->
<!--<img width="1434" height="693" alt="Image" src="https://github.com/user-attachments/assets/1c1b2d61-61fb-4a0f-9428-a2fa0101eb06" />-->
<!--<img width="1438" height="695" alt="Image" src="https://github.com/user-attachments/assets/9aecc94a-fa36-4321-9924-cee2313a6520" />-->
<!--<img width="1440" height="699" alt="Image" src="https://github.com/user-attachments/assets/f640cab9-c9fb-47d6-9aec-19c1c130f388" />-->
<!--<img width="1440" height="683" alt="Image" src="https://github.com/user-attachments/assets/f98a6918-0390-4524-bfbc-b7cf6f3ecf03" />-->
<!--<img width="1302" height="702" alt="Image" src="https://github.com/user-attachments/assets/5b6c6c21-3ba6-4067-a03a-faf7f930453e" />-->

<!--<img width="1047" height="138" alt="Image" src="https://github.com/user-attachments/assets/8fb90e9c-ba6b-49a8-9268-c1cd2612b8ef" />-->


## Directory Structure
```text
├── .DS_Store
├── .gitattributes
├── .gitignore
├── .mvn/
│   └── wrapper/
│       └── maven-wrapper.properties
├── API Endpoint Testing using Postman./
│   ├── Task Requests.postman_collection.json
│   ├── Task Tracker Web App.postman_environment.json
│   └── TaskList Requests.postman_collection.json
├── Final Report.pdf
├── README.md
├── REST API Endpoints.png
├── React Frontend/
│   ├── .DS_Store
│   ├── .vite/
│   │   ├── deps_temp_9d4db432/
│   │   │   └── package.json
│   │   ├── deps_temp_bcd9415c/
│   │   │   └── package.json
│   │   └── deps_temp_cd8f3035/
│   │       └── package.json
│   ├── LICENSE
│   ├── README.md
│   ├── docker-compose.yml
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── public/
│   │   ├── Favicon.png
│   │   └── vite.svg
│   ├── src/
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── AppProvider.tsx
│   │   ├── assets/
│   │   │   └── react.svg
│   │   ├── components/
│   │   │   ├── CreateUpdateTaskListScreen.tsx
│   │   │   ├── CreateUpdateTaskScreen.tsx
│   │   │   ├── TaskListsScreen.tsx
│   │   │   └── TasksScreen.tsx
│   │   ├── domain/
│   │   │   ├── Task.ts
│   │   │   ├── TaskList.ts
│   │   │   ├── TaskPriority.ts
│   │   │   └── TaskStatus.ts
│   │   ├── index.css
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── tailwind.config.js
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── Swagger UI Images/
│   ├── 1.png
│   ├── 2.png
│   ├── 3.png
│   ├── 4.png
│   └── Swagger Documentation.png
├── docker-compose.yml
├── mvnw
├── mvnw.cmd
├── pom.xml
└── src/
    ├── main/
    │   ├── java/
    │   │   └── com/
    │   │       └── projects/
    │   │           └── tasktrackerapp/
    │   │               ├── TasktrackerappApplication.java
    │   │               ├── config/
    │   │               │   └── SwaggerConfig.java
    │   │               ├── controllers/
    │   │               │   ├── GlobalExceptionHandler.java
    │   │               │   ├── TaskListController.java
    │   │               │   └── TasksController.java
    │   │               ├── domain/
    │   │               │   ├── .DS_Store
    │   │               │   ├── dto/
    │   │               │   │   ├── ErrorResponse.java
    │   │               │   │   ├── TaskDto.java
    │   │               │   │   └── TaskListDto.java
    │   │               │   └── entities/
    │   │               │       ├── Task.java
    │   │               │       ├── TaskList.java
    │   │               │       ├── TaskPriority.java
    │   │               │       └── TaskStatus.java
    │   │               ├── mappers/
    │   │               │   ├── TaskListMapper.java
    │   │               │   ├── TaskMapper.java
    │   │               │   └── impl/
    │   │               │       ├── TaskListMapperImpl.java
    │   │               │       └── TaskMapperImpl.java
    │   │               ├── repositories/
    │   │               │   ├── TaskListRepository.java
    │   │               │   └── TaskRepository.java
    │   │               └── services/
    │   │                   ├── TaskListService.java
    │   │                   ├── TaskService.java
    │   │                   └── impl/
    │   │                       ├── TaskListServiceImpl.java
    │   │                       └── TaskServiceImpl.java
    │   └── resources/
    │       └── application.properties
    └── test/
        ├── java/
        │   └── com/
        │       └── projects/
        │           └── tasktrackerapp/
        │               └── TasktrackerappApplicationTests.java
        └── resources/
            └── application.properties
```


## Steps to run application locally
1. Set the password to your PostgreSQL server in src/main/resources and docker-compose.yml files.
2. Open the backend API in IntelliJ and navigate to the pom.xml file. Reload Maven with IntelliJ's <br>built-in support.
3. In Terminal, run `docker ps`. If some other container is listening to port 5432 you may stop it as `docker stop <containerName>` <br>
(you may need to kill process at this port: `sudo lsof -i :5432` --> `sudo kill -9 PID`). If nothing works try:<br>
```
brew services stop postgresql@14
sudo pkill postgres
```
Next, run `docker-compose up`.  
4. Run TasktrackerappApplication.java's main method.  
5. In the directory of the ReactJS project folder, run `npm install` followed by `npm run dev`. Open [web app](http://localhost:5173).  
6. To view the Swagger documentation(in OpenAPI3 specification) visit [documentation](http://localhost:8080/swagger-ui/index.html).  
7. To view the Postman collections import the collection json files(from folder "Postman Endpoint Testing") to your Postman workspace.<br> Also, import the postman_environment.json to your Postman Environments section.
