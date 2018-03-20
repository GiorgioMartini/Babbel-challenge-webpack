# Babbel Challenge

This is my entry for the coding bowling challenge. To test it, please clone this repo and run the following commands:
```sh
$ npm install
$ npm start
```
   
- By pressing the orange button we execute one roll.
- After the animation, we can see how many pins we knocked down, which is the result of asking for a random number from one to ten.
- We can keep track of the total score, the last knocked pins, and the current roll which can be 'first', 'strike', 'spare' or 'last'.
- To avoid interfiering with the animation and the roll, the button is disabled.
- After playing all ten frames, we can restart the game by refreshing the page. 
## How I would have continued:

I have not implemented multiplayer functionality, but I if I would, I think I would create an array of objects with properties similar to the current mobx class. Then I would create a function to create a new index in the array, and populate it with default values.
Then when the player finished a frame, the next player would take turn.

Regarging the last frame functionality, I would have checked if the its the last frame, write the correspondnig conditional statements and add the extra rolls depending if a strike or a spare was made.


## Tools

Webpack was used to transpile ES6 to ES5, React for the view layer, and mobx for state managent.
I also used Tachyons for css, a functional css framework which I love.

Thanks for the oportunity and really lookong forward to your feedback.
