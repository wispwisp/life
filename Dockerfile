FROM node:18 as builder

WORKDIR /src

COPY ./app/ /src/app/
COPY ./.eslintignore /src/
COPY ./jest.config.js /src/
COPY ./package.json /src/
COPY ./.prettierignore /src/
COPY ./.prettierrc.json /src/
COPY ./tsconfig.json /src/
COPY ./webpack.config.js /src/
COPY ./yarn.lock /src/

RUN yarn
RUN yarn build

FROM nginx

COPY --from=builder /src/public/ /usr/share/nginx/html/

EXPOSE 80
