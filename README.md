# Snake Game TS

> The classe snake game built with CRA and Typescript.

## Why

One thursday night I couldn't sleep thinking how can I build a snake game using React in the simplest way. It was a random thought that occured to me and suddently I was thiking in variables and methods names at 2am. On a sunny weekend I built this game within 3 hours.

## Approach

I didn't use canvas or any advanced JS library. I have a board space with X and Y coordinates, one direction and one array with the snakes's history position.

```
{
    direction: 'up',
    history: [[10, 20], [20, 30]]
}
```

I also have a method that is called after 3 seconds and update the first item coordinates (X and Y) in the snake history array, depending on the position setted, and setted the X and Y of the next item with the previous one values.

Of course, there's some validations and others methods, you can check all this out in [this file](https://github.com/Sergioamjr/snakegame-ts/blob/master/src/App.tsx).

## Demo

![Demo](./src/assets/demo.gif)

## License

MIT © [Sergioamjr](https://github.com/Sergioamjr)
