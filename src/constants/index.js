const navLinks = [
    {
        id: 1,
        name: "Projects",
        type: "finder",
    },
    {
        id: 3,
        name: "Contact",
        type: "contact",
    },
    {
        id: 4,
        name: "Resume",
        type: "resume",
    },
];

const navIcons = [
    {
        id: 1,
        img: "/icons/wifi.svg",
    },
    {
        id: 2,
        img: "/icons/search.svg",
    },
    {
        id: 3,
        img: "/icons/user.svg",
    },
    {
        id: 4,
        img: "/icons/mode.svg",
    },
];

const dockApps = [
    {
        id: "finder",
        name: "Portfolio", // was "Finder"
        icon: "finder.png",
        canOpen: true,
    },
    {
        id: "safari",
        name: "Articles", // was "Safari"
        icon: "safari.png",
        canOpen: true,
    },
    {
        id: "photos",
        name: "Gallery", // was "Photos"
        icon: "photos.png",
        canOpen: true,
    },
    {
        id: "contact",
        name: "Contact", // or "Get in touch"
        icon: "contact.png",
        canOpen: true,
    },
    {
        id: "terminal",
        name: "Skills", // was "Terminal"
        icon: "terminal.png",
        canOpen: true,
    },
    {
        id: "trash",
        name: "Archive", // was "Trash"
        icon: "trash.png",
        canOpen: false,
    },
];

const blogPosts = [
    {
        id: 1,
        date: "Sep 2, 2025",
        title:
            "TypeScript Explained: What It Is, Why It Matters, and How to Master It",
        image: "/images/blog1.png",
        link: "https://jsmastery.com/blog/typescript-explained-what-it-is-why-it-matters-and-how-to-master-it",
    },
    {
        id: 2,
        date: "Aug 28, 2025",
        title: "The Ultimate Guide to Mastering Three.js for 3D Development",
        image: "/images/blog2.png",
        link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-three-js-for-3d-development",
    },
    {
        id: 3,
        date: "Aug 15, 2025",
        title: "The Ultimate Guide to Mastering GSAP Animations",
        image: "/images/blog3.png",
        link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-gsap-animations",
    },
];

const techStack = [
    {
        category: "Frontend",
        items: ["React.js", "Next.js", "TypeScript"],
    },
    {
        category: "Mobile",
        items: ["React Native", "Expo"],
    },
    {
        category: "Styling",
        items: ["Tailwind CSS", "Sass", "CSS"],
    },
    {
        category: "Backend",
        items: ["Node.js", "Express", "NestJS", "Hono"],
    },
    {
        category: "Database",
        items: ["MongoDB", "PostgreSQL"],
    },
    {
        category: "Dev Tools",
        items: ["Git", "GitHub", "Docker"],
    },
];

const socials = [
    {
        id: 1,
        text: "Github",
        icon: "/icons/github.svg",
        bg: "#f4656b",
        link: "https://github.com/JavaScript-Mastery-Pro",
    },
    {
        id: 2,
        text: "Platform",
        icon: "/icons/atom.svg",
        bg: "#4bcb63",
        link: "https://jsmastery.com/",
    },
    {
        id: 3,
        text: "Twitter/X",
        icon: "/icons/twitter.svg",
        bg: "#ff866b",
        link: "https://x.com/jsmasterypro",
    },
    {
        id: 4,
        text: "LinkedIn",
        icon: "/icons/linkedin.svg",
        bg: "#05b6f6",
        link: "https://www.linkedin.com/company/javascriptmastery/posts/?feedView=all",
    },
];

const photosLinks = [
    {
        id: 1,
        icon: "/icons/gicon1.svg",
        title: "Library",
    },
    {
        id: 2,
        icon: "/icons/gicon2.svg",
        title: "Memories",
    },
    {
        id: 3,
        icon: "/icons/file.svg",
        title: "Places",
    },
    {
        id: 4,
        icon: "/icons/gicon4.svg",
        title: "People",
    },
    {
        id: 5,
        icon: "/icons/gicon5.svg",
        title: "Favorites",
    },
];

const gallery = [
    {
        id: 1,
        img: "/images/gal1.png",
    },
    {
        id: 2,
        img: "/images/gal2.png",
    },
    {
        id: 3,
        img: "/images/gal3.png",
    },
    {
        id: 4,
        img: "/images/gal4.png",
    },
];

export {
    navLinks,
    navIcons,
    dockApps,
    blogPosts,
    techStack,
    socials,
    photosLinks,
    gallery,
};

const WORK_LOCATION = {
    id: 1,
    type: "work",
    name: "Work",
    icon: "/icons/work.svg",
    kind: "folder",
    children: [
        // ▶ Project 1
        {
            id: 5,
            name: "AI_TRIP_PLANNER",
            icon: "/images/folder.png",
            kind: "folder",
            position: "top-0 left-0", // icon position inside Finder
            windowPosition: "top-[5vh] left-5", // optional: Finder window position
            children: [
                {
                    id: 1,
                    name: "AI_TRIP_PLANNER.txt",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "top-5 left-10",
                    description: [
                        "About\n" +
                        "This is an AI-powered trip planning platform where you can create personalized travel plans ",
                        "based on your budget, location, and number of travelers.",
                        "The platform suggests the best and most affordable destinations,",
                        "along with hidden gems and unique attractions — all tailored to fit within your budget.",
                    ],
                },
                {
                    id: 2,
                    name: "aitripplaner.com",
                    icon: "/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: "https://ai-trip-planner-eta-blue.vercel.app/",
                    position: "top-10 right-20",
                },
                {
                    id: 4,
                    name: "ai_trip_planner.png",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    position: "top-52 right-80",
                    imageUrl: "/images/tripplanner.png",
                },
                {
                    id: 5,
                    name: "Design.fig",
                    icon: "/images/plain.png",
                    kind: "file",
                    fileType: "fig",
                    href: "https://google.com",
                    position: "top-60 right-20",
                },
            ],
        },

        //project 7

        {
            id: 2,
            name: "Next Mart E-Commerce",
            icon: "/images/folder.png",
            kind: "folder",
            position: "top-10 left-40", // icon position inside Finder
            windowPosition: "top-[5vh] left-5", // optional: Finder window position
            children: [
                {
                    id: 1,
                    name: "nextMart.txt",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "top-5 left-10",
                    description: [
                        "NextMart is a multi-vendor e-commerce platform built with Next.js, offering a scalable and modern shopping experience for both buyers and sellers.",
                        "The platform features robust role-based access, supporting Admin, Seller, Customer, and Premium user flows with tailored dashboards and privileges.",
                        "Users can browse products, manage carts, place orders, and access secure authentication powered by industry-standard best practices.",
                        "Premium members enjoy exclusive discounts through a dynamic coupon system, enhancing engagement and repeat purchases.",
                        "With a clean UI, optimized performance, and a modular architecture, NextMart delivers a reliable foundation for large-scale commerce applications."
                    ]

                },
                {
                    id: 2,
                    name: "nextmart.com",
                    icon: "/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: "https://next-mart-beryl.vercel.app/",
                    position: "top-10 right-20",
                },
                {
                    id: 4,
                    name: "nextmart.png",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    position: "top-52 right-80",
                    imageUrl: "/images/nextmart.png",
                },
                {
                    id: 5,
                    name: "Design.fig",
                    icon: "/images/plain.png",
                    kind: "file",
                    fileType: "fig",
                    href: "https://google.com",
                    position: "top-60 right-20",
                },
            ],
        },

        // ▶ Project 2
        {
            id: 6,
            name: "DocuMind RAG",
            icon: "/images/folder.png",
            kind: "folder",
            position: "top-48 right-70",
            windowPosition: "top-[20vh] left-7",
            children: [
                {
                    id: 1,
                    name: "DocuMind-Scalable-RAG-Chatbot-with-PDF-AUDIO-Uploads.txt",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "top-5 right-10",
                    description: [
                        "About\n" +
                        "A production-grade Retrieval-Augmented Generation (RAG)",
                        " chatbot that lets users upload PDFs, queues them for background processing,",
                        "and transforms them into semantic embeddings stored in Qdrant. When users ask questions,",
                        "the system retrieves the most relevant chunks, provides them as context to GPT, and returns accurate, source-grounded answers",
                    ],
                },
                {
                    id: 2,
                    name: "docmind.com",
                    icon: "/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: "https://docu-mind-scalable-rag-chatbot-with.vercel.app/",
                    position: "top-20 left-20",
                },
                {
                    id: 4,
                    name: "docmind.png",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    position: "top-52 left-80",
                    imageUrl: "/images/docmind.png",
                },
                {
                    id: 5,
                    name: "Design.fig",
                    icon: "/images/plain.png",
                    kind: "file",
                    fileType: "fig",
                    href: "https://google.com",
                    position: "top-60 left-5",
                },
            ],
        },

        // ▶ Project 3
        {
            id: 7,
            name: "AI-Website-Builder-Morphix",
            icon: "/images/folder.png",
            kind: "folder",
            position: "top-10 left-80",
            windowPosition: "top-[33vh] left-7",
            children: [
                {
                    id: 1,
                    name: "ai-website-builder-Morphix.txt",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "top-5 left-10",
                    description: [
                        "About\n" +
                        "A full-stack AI SaaS that lets users generate,",
                        "edit, and deploy complete websites in one click. It uses AI to build responsive designs,",
                        "create content and images, and offers inline editing without regenerating code. ",
                        "Users can manage projects, customize sites, and download deploy-ready code instantly.",
                    ],
                },
                {
                    id: 2,
                    name: "morphix.com",
                    icon: "/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: "https://ai-website-builder-morphix.vercel.app/",
                    position: "top-10 right-20",
                },
                {
                    id: 4,
                    name: "morphix.png",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    position: "top-52 right-80",
                    imageUrl: "/images/morphix1.png",
                },
                {
                    id: 5,
                    name: "Design.fig",
                    icon: "/images/plain.png",
                    kind: "file",
                    fileType: "fig",
                    href: "https://google.com",
                    position: "top-60 right-20",
                },
            ],
        },

        // project 4
        {
            id: 8,
            name: "AI-Mock-Interviews",
            icon: "/images/folder.png",
            kind: "folder",
            position: "top-50 left-[-15px]",
            windowPosition: "top-[33vh] left-7",
            children: [
                {
                    id: 1,
                    name: "ai-mock-interview.txt",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "top-5 left-10",
                    description: [
                        "About\n" +
                        "A full-stack AI mock interview platform where users securely log in through Clerk and practice real technical or behavioral interviews.",
                        "Powered by VAPI, the system simulates real-time, voice-driven interviews and adapts to the user’s chosen format — Technical, Behavioral, or Mixed.",
                        "Users can select the number of questions, and the AI conducts a structured interview with dynamic scenario-based prompts and follow-ups.",
                        "After the session, the platform generates a detailed AI report including feedback, communication score, technical accuracy, and weak areas with percentage-based improvement insights.",
                        "The result is a fully automated, data-backed interview prep experience designed to help users track progress, improve clarity, and boost their chances of real-world success."
                    ]
                },
                {
                    id: 2,
                    name: "aimockinterview.com",
                    icon: "/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: "https://ai-mock-interviews-sigma-one.vercel.app/",
                    position: "top-10 right-20",
                },
                {
                    id: 4,
                    name: "AI_Interview.png",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    position: "top-52 right-80",
                    imageUrl: "/images/aiinterview.png",
                },
                {
                    id: 5,
                    name: "Design.fig",
                    icon: "/images/plain.png",
                    kind: "file",
                    fileType: "fig",
                    href: "https://google.com",
                    position: "top-60 right-20",
                },
            ],
        },

        // project 5
        {
            id: 9,
            name: "converso",
            icon: "/images/folder.png",
            kind: "folder",
            position: "top-50 left-60",
            windowPosition: "top-[33vh] left-7",
            children: [
                {
                    id: 1,
                    name: "converso.txt",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "top-5 left-10",
                    description: [
                        "About\n" +
                        "Converso is an AI-powered learning SaaS platform that delivers real-time, voice-driven lessons tailored to each user's goals and skill level.",
                        "Built with Next.js, TypeScript, Supabase, Clerk, Stripe, and Tailwind, the platform combines powerful backend workflows with a modern, responsive UI.",
                        "Users interact with intelligent AI tutors capable of explaining concepts, answering questions, and guiding learners through personalized study paths.",
                        "The system supports secure authentication, subscription-based access, progress tracking, and dynamic lesson generation designed to accelerate learning.",
                        "Converso provides a seamless, immersive, and adaptive learning experience — turning AI into a personal tutor available anytime."
                    ]

                },
                {
                    id: 2,
                    name: "converso.com",
                    icon: "/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: "https://converso-ai-learning-platform-k4yb.vercel.app/",
                    position: "top-10 right-20",
                },
                {
                    id: 4,
                    name: "converso.png",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    position: "top-52 right-80",
                    imageUrl: "/images/converso.png",
                },
                {
                    id: 5,
                    name: "Design.fig",
                    icon: "/images/plain.png",
                    kind: "file",
                    fileType: "fig",
                    href: "https://google.com",
                    position: "top-60 right-20",
                },
            ],
        },

        // project 6
        {
            id: 10,
            name: "AI-Toolkit-Hub",
            icon: "/images/folder.png",
            kind: "folder",
            position: "top-50 left-85",
            windowPosition: "top-[33vh] left-7",
            children: [
                {
                    id: 1,
                    name: "toolkit.txt",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "top-5 left-10",
                    description: [
                        "About\n" +
                        "AI Toolkit Hub is a powerful AI-driven SaaS platform built using the PERN stack, designed to simplify content creation and creativity workflows.",
                        "Users can generate high-quality blogs, create AI images, edit existing content, and even analyze or improve their resumes — all within a single unified dashboard.",
                        "The platform supports a collaborative creative community where users can share their work, get feedback, and explore ideas from others.",
                        "With a modern UI, seamless workflows, and multiple AI utilities integrated into one hub, AI Toolkit Hub makes productivity faster, smarter, and more accessible for everyone."
                    ]


                },
                {
                    id: 2,
                    name: "toolkit.com",
                    icon: "/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: "https://ai-toolkit-hub.vercel.app/ai",
                    position: "top-10 right-20",
                },
                {
                    id: 4,
                    name: "toolkit.png",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    position: "top-52 right-80",
                    imageUrl: "/images/toolkit.png",
                },
                {
                    id: 5,
                    name: "Design.fig",
                    icon: "/images/plain.png",
                    kind: "file",
                    fileType: "fig",
                    href: "https://google.com",
                    position: "top-60 right-20",
                },
            ],
        },

    ],
};

const ABOUT_LOCATION = {
    id: 2,
    type: "about",
    name: "About me",
    icon: "/icons/info.svg",
    kind: "folder",
    children: [
        {
            id: 1,
            name: "me.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-10 left-5",
            imageUrl: "/images/arbazz.jpg",
        },
        {
            id: 2,
            name: "casual-me.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-28 right-72",
            imageUrl: "/images/arbazz4.jpg",
        },
        {
            id: 3,
            name: "conference-me.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-52 left-80",
            imageUrl: "/images/arbazz5.jpg",
        },
        {
            id: 4,
            name: "about-me.txt",
            icon: "/images/txt.png",
            kind: "file",
            fileType: "txt",
            position: "top-60 left-5",
            subtitle: "Meet the Developer Behind the Code",
            image: "/images/arbazz4.jpg",
            description: [
                "Hey! I'm Arbazz 👋 — a full-stack developer who somehow went from fixing console errors to building AI platforms, RAG chatbots, and web apps that actually behave themselves.",
                "I love working with React, Next.js, Node.js, and PostgreSQL, and I'm happiest when turning ideas into clean, scalable products that feel like a little bit of magic.",
                "Every project pushes me to grow, break limits, and remember why I fell in love with building things in the first place.",
                "And when I’m not coding, I’m either fixing 1AM bugs or pretending I’ll watch the new Stranger Things season — but let’s be honest, the real monster is still hiding in my code 👀😂"
            ]
        },
    ],
};

const RESUME_LOCATION = {
    id: 3,
    type: "resume",
    name: "Resume",
    icon: "/icons/file.svg",
    kind: "folder",
    children: [
        {
            id: 1,
            name: "Resume.pdf",
            icon: "/images/pdf.png",
            kind: "file",
            fileType: "pdf",
            imageUrl: "/files/resume.pdf",
            // you can add `href` if you want to open a hosted resume
            // href: "/your/resume/path.pdf",
        },
    ],
};

const TRASH_LOCATION = {
    id: 4,
    type: "trash",
    name: "Trash",
    icon: "/icons/trash.svg",
    kind: "folder",
    children: [
        {
            id: 1,
            name: "trash1.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-10 left-10",
            imageUrl: "/images/trash-1.png",
        },
        {
            id: 2,
            name: "trash2.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-40 left-80",
            imageUrl: "/images/trash-2.png",
        },
    ],
};

export const locations = {
    work: WORK_LOCATION,
    about: ABOUT_LOCATION,
    resume: RESUME_LOCATION,
    trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
    finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };