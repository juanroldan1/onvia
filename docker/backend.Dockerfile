FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=maven:3.9-eclipse-temurin-21-alpine /usr/share/maven /usr/share/maven
EXPOSE 8000
CMD ["java", "-jar", "app.jar"]
