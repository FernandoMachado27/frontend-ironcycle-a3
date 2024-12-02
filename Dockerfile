#Use a imagem oficial do Apache
FROM httpd:alpine

#Copia os arquivos do seu projeto para o diretório público do Apache
COPY ./html /usr/local/apache2/htdocs/
COPY ./css /usr/local/apache2/htdocs/css
COPY ./js /usr/local/apache2/htdocs/js
COPY ./imgs /usr/local/apache2/htdocs/imgs

#Exponha a porta 80
EXPOSE 80