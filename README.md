# Yorkie React TodoMVC

> This project is no longer in development. Please check the [examples/react-todomvc](https://github.com/yorkie-team/yorkie-js-sdk/tree/main/examples/react-todomvc) in Yorkie JS SDK.

Yorkie React TodoMVC is an example using CreateReactApp and Yorkie JS SDK.

## Screenshot

![Screenshot](/screenshot.gif "Screenshot")

This project uses gRPC-web for communicating with Yorkie server built on gRPC.

```
 +--Browser--+           +--Envoy---------+         +--Yorkie------+
 |           |           |                |         |              |
 | gRPC-web  <- HTTP1.1 -> gRPC-web proxy <- HTTP2 -> gRPC server  |
 |           |           |                |         |              |
 +-----------+           +----------------+         +--------------+
```

For more details: https://grpc.io/blog/state-of-grpc-web/


### Running TodoMVC

TodoMVC needs backend servers like Yorkie and Envoy. We can simply run them using `docker-compose`.
To start Yorkie and Envoy proxy in a terminal:
```
$ docker-compose -f docker/docker-compose.yml up --build -d
```

In the project directory, you can run:

```
$ npm install
$ npm start
```

This project was bootstrapped with Create React App.

<details>

## About this project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

</details>
