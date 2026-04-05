export interface Book {
    id: string;
    title: string;
    author: string;
    price: number;
    category: string;
    description: string;
    image: string;
    synopsis?: string;
    pages?: number;
    language?: string;
    published_year?: number;
    rating?: number;
    reviews_count?: number;
    author_bio?: string;
    author_image?: string;
    carousel_image?: string;
    is_bestseller?: boolean | number;
    discount_percent?: number;
    keywords?: string[];
    ebook_url?: string;
    ebook_format?: string;
}

export interface CarouselItem {
    id: string;
    image: string;
    title: string;
    subtitle: string;
    tag?: string;
    buttonText?: string;
}

export const books: Book[] = [
    {
        id: "1",
        title: "Sword Art Online: Alicization",
        author: "Reki Kawahara",
        price: 14.99,
        category: "Fantasy",
        description: "Kirito awakens in a vast, fantastical forest filled with towering trees. In his search for clues to the nature of his surroundings, he encounters a young boy who seems to know him.",
        image: "/covers/SAOAlici.jpeg",
    },
    {
        id: "2",
        title: "Bakemonogatari",
        author: "Nisio Isin",
        price: 16.50,
        category: "Fantasy",
        description: "High school student Koyomi Araragi survives a vampire attack with the help of Meme Oshino, a strange man living in an abandoned building. Though no longer a vampire, Araragi retains supernatural abilities.",
        image: "/covers/bakemonogatari.jpeg",
    },
    {
        id: "3",
        title: "Classroom of the Elite",
        author: "Syougo Kinugasa",
        price: 13.99,
        category: "Adventure",
        description: "Kiyotaka Ayanokouji has just enrolled at Tokyo Metropolitan Advanced Nurturing High School, where it's said that 100% of students go on to college or find employment.",
        image: "/covers/classroomofelites.jpeg",
    },
    {
        id: "4",
        title: "HP and the Chamber of Secrets",
        author: "J.K. Rowling",
        price: 24.99,
        category: "Fantasy",
        description: "Harry Potter's second year at Hogwarts School of Witchcraft and Wizardry is filled with new torments and horrors, including a monstrous thing that has been released into the castle.",
        image: "/covers/harrychamberslyther.jpg",
    },
    {
        id: "5",
        title: "HP and the Goblet of Fire",
        author: "J.K. Rowling",
        price: 26.99,
        category: "Fantasy",
        description: "Harry Potter is halfway through his training as a wizard and his coming of age. Harry wants to get away from the pernicious Dursleys and go to the Quidditch World Cup.",
        image: "/covers/harrygoblethuffle.jpg",
    },
    {
        id: "6",
        title: "HP and the Half-Blood Prince",
        author: "J.K. Rowling",
        price: 25.50,
        category: "Fantasy",
        description: "The war against Voldemort is not going well; even Muggle governments are noticing. Ron scans the obituary pages of the Daily Prophet, looking for familiar names.",
        image: "/covers/harryhalfhufflepuff.jpg",
    },
    {
        id: "7",
        title: "HP and the Deathly Hallows",
        author: "J.K. Rowling",
        price: 28.99,
        category: "Fantasy",
        description: "Harry is waiting in Privet Drive. The Order of the Phoenix is coming to escort him safely away without Voldemort and his supporters knowing if they can.",
        image: "/covers/harryhallowsgryffin.jpg",
    },
    {
        id: "8",
        title: "HP and the Order of the Phoenix",
        author: "J.K. Rowling",
        price: 27.50,
        category: "Fantasy",
        description: "Harry Potter is due to start his fifth year at Hogwarts School of Witchcraft and Wizardry. He is desperate to get back to school and find out why his friends Ron and Hermione have been so secretive.",
        image: "/covers/harrypheonixraven.jpg",
    },
    {
        id: "9",
        title: "HP and the Philosopher's Stone",
        author: "J.K. Rowling",
        price: 21.99,
        category: "Fantasy",
        description: "Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive.",
        image: "/covers/harryphilosophergryff.jpg",
    },
    {
        id: "10",
        title: "HP and the Prisoner of Azkaban",
        author: "J.K. Rowling",
        price: 23.50,
        category: "Fantasy",
        description: "For twelve long years, the dread fortress of Azkaban held an infamous prisoner named Sirius Black. Convicted of killing thirteen people with a single curse, he was said to be the heir apparent to the Dark Lord, Voldemort.",
        image: "/covers/harryprisonerhufflepu.jpg",
    },
    {
        id: "11",
        title: "It Ends with Us",
        author: "Colleen Hoover",
        price: 12.99,
        category: "History",
        description: "Lily hasn't always had it easy, but that's never stopped her from working hard for the life she wants. She's come a long way from the small town in Maine where she grew up.",
        image: "/covers/itendswihtus.jpg",
    },
    {
        id: "12",
        title: "It Starts with Us",
        author: "Colleen Hoover",
        price: 13.99,
        category: "History",
        description: "Lily and her ex-husband, Ryle, have just settled into a civil coparenting rhythm when she suddenly bumps into her first love, Atlas, again.",
        image: "/covers/itstartswithus.jpeg",
    },
    {
        id: "13",
        title: "No Longer Human",
        author: "Osamu Dazai",
        price: 15.00,
        category: "History",
        description: "No Longer Human is Dazai's most famous novel, and it's also his most tragic. It tells the story of Oba Yozo, a sensitive man who feels increasingly disconnected from society.",
        image: "/covers/nolongerhuman.jpeg",
    },
    {
        id: "14",
        title: "Out",
        author: "Natsuo Kirino",
        price: 14.50,
        category: "Adventure",
        description: "Natsuo Kirino's novel tells a story of four women who work the night shift in a Japanese lunchbox factory. One of them murders her husband, and the other three help her dispose of the body.",
        image: "/covers/out.jpeg",
    },
    {
        id: "15",
        title: "The Wind-Up Bird Chronicle",
        author: "Haruki Murakami",
        price: 18.99,
        category: "History",
        description: "Toru Okada's cat has disappeared. His wife is growing increasingly distant. A mysterious woman keeps calling him on the telephone. Toru Okada's simple, quiet life is beginning to unravel.",
        image: "/covers/thewindupbird.png",
    },
];

export const carouselItems: CarouselItem[] = [
    {
        id: "c1",
        image: "/carousel/Out-gradient_-_Made_with_PosterMyWall-transformed.jpeg",
        title: "Out",
        subtitle: "A chilling tale of desperation and crime.",
    },
    {
        id: "c2",
        image: "/carousel/SAO-gradient_-_Made_with_PosterMyWall-transformed.jpeg",
        title: "Sword Art Online",
        subtitle: "Enter the world of Aincrad.",
    },
    {
        id: "c3",
        image: "/carousel/bakemonogatari-gradient_-_Made_with_PosterMyWall-transformed.jpeg",
        title: "Bakemonogatari",
        subtitle: "A supernatural mystery unfolds.",
    },
    {
        id: "c4",
        image: "/carousel/classroomofelite-gradient_-_Made_with_PosterMyWall-transformed.jpeg",
        title: "Classroom of the Elite",
        subtitle: "Superiority is a matter of perspective.",
    },
    {
        id: "c5",
        image: "/carousel/itendswithus-gradient-transformed.jpeg",
        title: "It Ends with Us",
        subtitle: "A powerful story of love and resilience.",
    },
    {
        id: "c6",
        image: "/carousel/itstartswithus-gradient-transformed.jpeg",
        title: "It Starts with Us",
        subtitle: "The long-awaited sequel to the phenomenon.",
    },
    {
        id: "c7",
        image: "/carousel/nolongerhuman-gradient_-_Made_with_PosterMyWall-transformed.jpeg",
        title: "No Longer Human",
        subtitle: "A profound exploration of the human condition.",
    },
    {
        id: "c8",
        image: "/carousel/thewindupbird-gradient-transformed.jpeg",
        title: "The Wind-Up Bird Chronicle",
        subtitle: "A surreal journey through Tokyo's underworld.",
    },
];
