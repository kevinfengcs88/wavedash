Steps for deploying changes to Heroku:

1. Change socket endpoint in `SingleChat.js` to Heroku deployment link
2. `heroku login`
3. `git add .`
4. `git commit -am "commit message"`
5. `git push heroku master`
6. Change socket endpoint in `SingleChat.js` to `localhost:5000` to continue development