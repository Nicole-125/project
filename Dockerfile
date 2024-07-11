# Use the official Python image.
# https://hub.docker.com/_/python
FROM python:3.8

# Install the Google Cloud client library
RUN pip install google-cloud-bigquery Flask
RUN pip install flask-cors
RUN pip install google-cloud-error-reporting
RUN pip install logging

# Copy local code to the container image.
ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . .

# Run the web service on container startup.
CMD ["python", "main.py"]

# Document that the service listens on port 8080.
EXPOSE 8080