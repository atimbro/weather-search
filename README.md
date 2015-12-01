# To run the application you will need Grails 3.0.9 and Java 8. I'd suggest using a version manager like sdkman to easily change between versions.

# Packaging the app into jar, war, etc.
- ```grails package``` - resulting build files are in build/libs/

# Ad-hoc deployment into our ec2 instance
- ```scp -i lkraweic.pem build/libs/weather-search-0.1.jar ubuntu@aws-ip```

# Running the app locally
- ```./gradlew bootRun```

# Running the jar on ec2
- ```java -jar appName```

# Running the app locally with debug port
- ```./gradlew bootRun -Pdebug```

