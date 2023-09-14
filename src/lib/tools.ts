import { Tool } from '@prisma/client';

export const tools: Omit<Tool, 'id'>[] = [
    {
        name: 'Sri Lanka',
        description:
            'Sri Lanka, formerly known as Ceylon and officially the Democratic Socialist Republic of Sri Lanka, is an island country in South Asia',
        link: 'https://www.youtube.com/watch?v=7h4wud3HMZQ',
        image: '/lk.svg',
    },
    {
        name: 'India',
        description:
            'India, officially the Republic of India, is a country in South Asia. It is the seventh-largest country by area; the most populous country as of June 2023',
        link: 'https://www.youtube.com/watch?v=eeDTn_ObLP8',
        image: '/in.svg',
    }
];
