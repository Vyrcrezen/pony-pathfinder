
const divToBody = (divId?: string) => {
    const reactContainer = document.createElement('div') as HTMLDivElement;

    reactContainer.setAttribute('class', 'p-0');

    if (divId) {
        reactContainer.id = divId;
    }
    const body = document.querySelector('body');

    if (!body) {
        throw new Error("Couldn't find body elment!")
    }

    body.appendChild(reactContainer);

    return reactContainer;
}

export default divToBody;
