FROM node:18.12.1
WORKDIR /mock_test_backend
COPY package.json .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
        fi

COPY . ./
EXPOSE ${PORT}
CMD ["npm","run","dev"]