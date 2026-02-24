// TypeScript interfaces for content validation

export interface BioLink {
    label: string;
    url: string;
    external: boolean;
}

export interface BioSection {
    text: string;
    links?: BioLink[];
    linksTitle?: string;
}

export interface BioContent {
    journalist: BioSection;
    advocate: BioSection;
    student: BioSection;
    contact: BioSection;
}

export interface WorkItem {
    title: string;
    description: string;
    date?: string;
    publication?: string;
    href: string;
    external?: boolean;
    type?: 'article' | 'project' | 'presentation' | 'photo';
    featured?: boolean;
    image?: string;
}

export interface WorkContent {
    journalism: WorkItem[];
    technology: WorkItem[];
    advocacy: WorkItem[];
}

export interface GalleryPhoto {
    image: string;
    alt: string;
    caption: string;
    date?: string;
    location?: string;
}

export interface GalleryContent {
    photos: GalleryPhoto[];
}
