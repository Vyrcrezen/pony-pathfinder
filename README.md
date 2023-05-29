# ReadMe - Pony Game
This is a React application, which interfaces with the [Pony Panic API](https://ponypanic.io/), calculates and submits the actions of the hero character.

## Table of Contents

- [ReadMe - Pony Game](#readme---pony-game)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Overview](#overview)
    - [First steps](#first-steps)
  - [Heat Map](#heat-map)
  - [Autmotaic actions](#autmotaic-actions)
  - [Heat Map](#heat-map-1)
  - [Conclusion](#conclusion)

---

## Installation
To build the project, run:
```
$ npm run build
```

Once the project is built, start the project with:
```
$ npm start
```

If everything went well, the application should be available at http://localhost:8081/

Please make sure to access the application via the `localhost` URL, otherwise the [Pony Panic API](https://ponypanic.io/) will refuse the requests sent to it.

---

## Overview

### First steps

When you navigate to the application at http://localhost:8081/ , you should be greeted with a UI like this:

<img src="./readme_img/ui-overview.jpg" height="640">

To begin the game, please click on the `GET TOKEN` button inside the `control area`, and retrieve a token.

If clicking the button doesn't work, please navigate to the [Pony Panic API](https://ponypanic.io/).

Once on the [Pony Panic API](https://ponypanic.io/) page, click the `NEW GAME` button.

<img src="./readme_img/Pony-Panic-new-game.jpg" height="400">

Once a new game has started, you should see a `SHOW TOKENS` button on the side panel to the right side of the game map. Please click this `SHOW TOKENS` button, and copy the **Player token** value.

<img src="./readme_img/Pony-Panic-story-token.jpg" height="400">

Once copied, you can now paste the **Player token** into the Token text input inside the the control area. If you were successful, the UI should change to reveal a `Play`, `Step` and a `Reset` button.

<img src="./readme_img/ui-ready-to-play.jpg" height="200">

Pressing the `Play` button will start the game, where the application will continuously calculate the next action of the Hero character, and send it to the Pony Panic API.

Pressing the `Step` button make the application perform only the next "task" in a series of pre-defined tasks.

Please feel free to play the game, eaither with the `Play` or the `Step` buttons, until you reach the 3rd level, as indicated by the `Hero area`, below the word: **Player**

---

## Heat Map

On the 3rd level, you should be faced with the first enemy, a ghost.

This is what the map should look like, if you click the `Step` button, until the `logging area` displays the text **Calculating hero path**:

<img src="./readme_img/ui-third-level.jpg" height="640">

Each opponent is a heat source in the game, contributing to the generation of a `Heat Map`. The `Heat Map` plays a crucial role in the pathing of the `Hero` chatracter.

By default, every opponent produces a heat value, which is normalized to be between 0 and 1. The heat value, with the weights are used to calculate the **Pathing Value**, which is used to calculate the cost of a path.

For now however, let's turn our attention to the **Heat formula** field inside the `ghost settings` panel.

The **Heat formula** defines how the heat value will spread to the neighboring tiles. Let's experiment a little with the **Heat formula** and change the default value to `-2log(x+0.55)-0.2`.

Once we changed the formula, let's click on the **UPDATE HEAT MAP** button, so that the game can re-calculate the heat map with the new value.

We can immediately see that the heat expanded more with the new formula. To get a better understanding of the distribution of the heat values, we can turn on the **Pathing Value** toggle to the bottom right of the game map:

<img src="./readme_img/ui-heat-value.jpg" height="640">

With the **Pathing Value** toggle turned on, we can even calculate the cost of reaching the fruit

`3 + 6 + 10 + 6 + 3 = 28`

These values are derived from the `Heat Map`, and are used by the algorithm responsible for finding the "shortest path" to the nearest fruit.

If we had another fruit which we could reach for a lower travel cost, the game's algorithm would have chosen that fruit instead.

The algorithm used for finding the shortest path to an object is called [Dijkstra's algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm). Thankfully, there is an npm library which implements Dijstra's algorithm, which is available [here](https://www.npmjs.com/package/dijkstrajs).

The application generates the `Heat Map` based on the formula and some other values. Then, it generates a graph of the map, where the pathing values are used as the edge cost. Once the graph is finished, Dijkstra's algorithm returns the path to the destination with the lowest cost.

There is one other value which we can take a look at here, the **Heat cutoff threshold** located inside the `ghost panel`. This value is used by the heat map generator function. If the heat value inside a cell is lower than the **Heat cutoff threshold**, its neighboring cells will not be calculated a heat value.

This way, increaseing the **Heat cutoff threshold** value will make the heat map spread out less. Please keep in mind that the heat values are always normalized to be between 0 and 1, even if the pathing values are higher than that.

This is the effect of setting the **Heat cutoff threshold** to 0.6:

<img src="./readme_img/ui-heat-cutoff-threshold.jpg" height="640">

## Autmotaic actions

Some of the hero's actions are controlled by simple `if` statements. Unfortunately, these are not exposed as of yet.

To quickly summarize, the hero character will decide against moving under these circumstances:

- if an enemy is blocking the path of the hero, and is 2 tiles away, the hero will attack instead
- if there is a bullet where the hero intends to move, the hero will use shield instead
- if a bullet is heading towards the hero, while the hero is heading towards the bullet, while they are 2 tiles away the hero will use shield instead
- if a bullet is approaching perpendicular to the hero's path, and both the bullet and the hero would end up on the same tile, the hero will defend instead

These behaviors a defined inside the `src/features/ponySolver/util/getHeroAction.ts` file.

If we advance the game a bit, we will see that the move action will be overwritten with the attack action, once the hero is close enough to the enemy:

<img src="./readme_img/ui-attacking.jpg" height="640">

Let's advance the game until we reach **Level 7**

## Heat Map

We have discussed the **Heat formula** and the **Heat cutoff threshold** which influence how the `Heat Map` is generated.

Now with multiple ghost enemies present, we can experiment with setting the weight value of each of the ghosts characteristics. Since the heat values are normalized to be between 0 and 1, changing the weights would not have had any noticable effect until now.

The ghost opponents have several characteristics, each of which can be added a weight value when calculating their base heat value. Even though this value will be normalized, it will differ from other ghosts present, allowing us to give a larger heat value to the scarier ghosts.

This is the map that I was given for Level 7:

<img src="./readme_img/ui-level-7.jpg" height="640">

Since the appliction doesn't have those handy floating characteristics panels which [Pony Panic](https://ponypanic.io/) has, let me navigate back there, and check what values the ghosts have:

<img src="./readme_img/Pony-Panic-ghost-attributes.jpg" height="640">

For the sake of testing, let's say that we are only interested in how much touch damage the ghosts have. Especially, since both of them has a 0 for **shoot probability**

I will go ahead and only give a weight value of 1 to the **Touch damage**:

<img src="./readme_img/ui-touch-damage-weight.jpg" height="640">

With these settings, we can see how these settings influenced the heat map and the pathing value generation. The ghost with the higher touch damage has a larger base heat value, which also radiates out further.

## Conclusion

Thank you for following along this introduction to this application. I hope that you will have a good time experimenting with the settings that determine the Hero's path to the treasures.

If you are interested more in the internal states and variables of the application, you can log the current `Redux store` to the console, by clicking on the Player's protrait.

<img src="./readme_img/ui-Redux-store.jpg" height="400">
