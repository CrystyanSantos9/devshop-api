FROM node:12.14.0-alpine3.11
 
# adicionar o bash
RUN apk add --no-cache bash
 
#adicionar o cli do nest para fazer configurações no projeto
RUN npm install -g @nestjs/cli@7.5.6
 
# criar um usuário diferente do root
USER node
 
# criar o diretório principal para o usuário node
WORKDIR /home/node/app