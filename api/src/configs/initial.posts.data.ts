import path from 'node:path';

export const initialPosts = [
    {
        id: 1 + Date.now(),
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
            + ' A possimus excepturi aliquid nihil cumque ipsam facere aperiam at!'
            + ' Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!',
        image: path.join('test-posts-images', '4.webp'),
    },
    {
        id: 2 + Date.now(),
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
            + ' A possimus excepturi aliquid nihil cumque ipsam facere aperiam at!'
            + ' Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!',
        image: path.join('test-posts-images', '3.webp'),
    },
    {
        id: 3 + Date.now(),
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
            + ' A possimus excepturi aliquid nihil cumque ipsam facere aperiam at!'
            + ' Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!',
        image: path.join('test-posts-images', '2.webp'),
    },
    {
        id: 4 + Date.now(),
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
            + ' A possimus excepturi aliquid nihil cumque ipsam facere aperiam at!'
            + ' Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!',
        image: path.join('test-posts-images', '1.webp'),
    },
];
