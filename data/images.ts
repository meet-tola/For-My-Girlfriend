export type Image = {
    poster: string;
    name: string;
};

export const images = [
    { poster: "/img3.jpg", name: "alicia1" },
    {
        poster: "/img4.jpg",
        name: "Best",
    },
    {
        poster: "/img5.jpg",
        name: "alicia2",
    },
    { poster: "/img6.jpg", name: "alicia3" },
    {
        poster: "/img7.jpg",
        name: "alicia4",
    },
    {
        poster: "/img2.jpg",
        name: "alicia5",
    },
    { poster: "/img1.jpg", name: "alicia6" },
];

export const randomImagesSet1 = images
    .sort(() => Math.random() - 0.5)
    .concat(images.sort(() => Math.random() - 0.5))
    .concat(images.sort(() => Math.random() - 0.5));

export const randomImagesSet2 = images
    .sort(() => Math.random() - 0.5)
    .concat(images.sort(() => Math.random() - 0.5))
    .concat(images.sort(() => Math.random() - 0.5))
    .sort(() => Math.random() - 0.5);
