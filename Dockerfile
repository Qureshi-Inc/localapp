FROM nginx:alpine
COPY index.html /usr/share/nginx/html/
COPY public/contact.html /usr/share/nginx/html/contact.html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
