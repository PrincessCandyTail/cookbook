#Build Stage - erstellt aus JAVA-Files ausführbares JAR mittels Maven
FROM maven:3.9.9-eclipse-temurin-21-alpine as build
WORKDIR /home/lab

COPY pom.xml .
RUN ["mvn", "verify", "-DskipTests", "--fail-never"]

COPY src ./src
RUN ["mvn", "verify"]

#Run Stage - baut Image aus Resultat vom Build
FROM eclipse-temurin:21-alpine
WORKDIR /app
COPY --from=build /home/lab/target .
CMD ["java", "-jar", "/app/cookbook-0.0.1-SNAPSHOT.jar"]
EXPOSE 8080
