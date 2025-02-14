export interface BlogPost{
    id: string
    title: string;
    shortDescription: string;
    content: string;
    urlHandle: string;
    featuredImageUrl: string;
    author: string;
    publishedDate: Date;
    isVisible: boolean;
}