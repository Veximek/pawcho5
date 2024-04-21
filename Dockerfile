FROM scratch
ADD alpine-minirootfs-3.19.1-aarch64.tar /

WORKDIR /app

RUN apk add --update nodejs npm
COPY package.json .
RUN npm install

COPY . .


FROM nginx:alpine


RUN apk add --update nodejs
ARG VERSION
ENV VERSION=${VERSION:-v1}
COPY --from=0 /app /app


RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/

#COPY /nginx.conf /etc/nginx/conf.d/
EXPOSE 80

HEALTHCHECK --interval=30s --timeout=1s --start-period=5s --retries=3 CMD curl -f http://localhost:3000/ || exit 1  

CMD ["sh", "-c", "nginx & node /app/index.js"]

