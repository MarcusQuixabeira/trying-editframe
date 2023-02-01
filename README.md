# Creating a simple video with Editframe a video development platform

[![Node][Node.com]][Node-url]

[Node.com]: https://img.shields.io/badge/node.js-333333?style=for-the-badge&logo=nodedotjs&logoColor=white&labelColor=43853d
[Node-url]: https://nodejs.org/es/


# Setup
## Preparing the environment

1. The project runs using node 16+, so first we use [nvm](https://github.com/nvm-sh/nvm) to install and use that version of node:
    ```bash
    $ nvm install node 16
    $ nvm use 16
    ```
2. Install all the dependencies:
    ```bash
    $ make install
    ```
3. Now we need to setup the environment variables. Go to [Editframe](https://www.editframe.com/) and create an account. With your access tokens, create a .env on the root of the project:
    ```bash
	EDITFRAME_CLIENT_ID=<YOUR CLIENT ID>
    EDITFRAME_TOKEN=<YOUR API TOKEN>
    ```
4. Now it's possible to run the script to create the video using the following command:
    ```bash
	$ make create-video
    ```
5. Follow the encoding process on your terminal.