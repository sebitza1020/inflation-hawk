# --- STEP 1: Build ---
# We use an image which has Maven and Java 21 already installed
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /usr/src/app

# Copy project files in container
COPY pom.xml .
COPY src ./src

# Run compile command (without tests, to work faster)
RUN mvn package -DskipTests

# --- STEP 2: Run ---
# We use a small image, only with Java (without Maven), for production
FROM eclipse-temurin:21-jre
WORKDIR /work/

# Copy compiled files from Step 1 to Step 2
# Quarkus puts all in 'quarkus-app' folder
COPY --from=build /usr/src/app/target/quarkus-app/lib/ /work/lib/
COPY --from=build /usr/src/app/target/quarkus-app/*.jar /work/
COPY --from=build /usr/src/app/target/quarkus-app/app/ /work/app/
COPY --from=build /usr/src/app/target/quarkus-app/quarkus/ /work/quarkus/

# Open port 8080
EXPOSE 8080

# Run command
CMD ["java", "-jar", "/work/quarkus-run.jar"]
