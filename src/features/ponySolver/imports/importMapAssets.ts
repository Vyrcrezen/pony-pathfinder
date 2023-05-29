
function getSrcToImage(src: string) {
    const image = new Image();
    image.src = src;
    return image;
}

/**
 * 
 * @returns An array of all the images which are used inside the game map. Each image is dynamically imported, and then converted to an `img` element for the game map canvas.
 */
export default async function importMapAssets() {

    type assetPropNames = 'ponyChar' | 'hoofPrints' | 'shield' | 'sword' | 'ghost' | 'ghostLamp' | 'fruit' | 'fruitCore' | 'fireball' | 'arrowSlim' | 'carOne' | 'carTwo' | 'carThree' | 'carFour' | 'blankMap';

    const imageImports: Record<assetPropNames, { name: string, image: HTMLImageElement}> = {} as Record<assetPropNames, { name: string, image: HTMLImageElement}>;
    const promiseArray: Promise<any>[] = [];

    promiseArray.push( import('./../media/images/hero-pony.png').then(data => imageImports.ponyChar = { name: 'pony-char', image: getSrcToImage(data.default) }) );
    promiseArray.push( import('./../media/images/hoofprints.png').then(data => imageImports.hoofPrints = { name: 'hoofprints', image: getSrcToImage(data.default) }) );
    promiseArray.push( import('./../media/images/ghost.png').then(data => imageImports.ghost = { name: 'ghost', image: getSrcToImage(data.default) }) );
    promiseArray.push( import('./../media/images/shield.png').then(data => imageImports.shield = { name: 'shield', image: getSrcToImage(data.default) }) );
    promiseArray.push( import('./../media/images/sword.png').then(data => imageImports.sword = { name: 'sword', image: getSrcToImage(data.default) }) );
    promiseArray.push( import('./../media/images/ghost-lamp.png').then(data => imageImports.ghostLamp = { name: 'ghostLamp', image: getSrcToImage(data.default) }) );
    promiseArray.push( import('./../media/images/fruit.png').then(data => imageImports.fruit = { name: 'fruit', image: getSrcToImage(data.default) }) );
    promiseArray.push( import('./../media/images/fruit-core.png').then(data => imageImports.fruitCore = { name: 'fruit-core', image: getSrcToImage(data.default) }) );
    promiseArray.push( import('./../media/images/fireball.png').then(data => imageImports.fireball = { name: 'fireball', image: getSrcToImage(data.default) }) );
    promiseArray.push( import('./../media/images/car-1.png').then(data => imageImports.carOne = { name: 'car-1', image: getSrcToImage(data.default) }) );
    promiseArray.push( import('./../media/images/car-2.png').then(data => imageImports.carTwo = { name: 'car-2', image: getSrcToImage(data.default) }) );
    promiseArray.push( import('./../media/images/car-3.png').then(data => imageImports.carThree = { name: 'car-3', image: getSrcToImage(data.default) }) );
    promiseArray.push( import('./../media/images/car-4.png').then(data => imageImports.carFour = { name: 'car-4', image: getSrcToImage(data.default) }) );
    promiseArray.push( import('./../media/images/arrow-slim.png').then(data => imageImports.arrowSlim = { name: 'arrow-slim', image: getSrcToImage(data.default) }) );
    promiseArray.push( import('./../media/images/blank-map.png').then(data => imageImports.blankMap = { name: 'blank-map.png', image: getSrcToImage(data.default) }) );

    await Promise.all(promiseArray);

    return imageImports;
}
