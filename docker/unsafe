FROM nginx:1.27

USER root

RUN apt-get update && apt-get install -y \
    vim \
    curl \
    wget \
    telnet

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]