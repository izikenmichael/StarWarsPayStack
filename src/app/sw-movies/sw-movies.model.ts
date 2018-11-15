import { SwCharacter } from "../sw-characters/sw-characters.model";

export class SwMovie {
    title: string;
    episode_id: number;
    opening_crawl: string;
    producer: string;
    release_date: string;
    characters: SwCharacter[];
    banner: string;

    constructor(
        title: string,
        episode_id: number,
        opening_crawl: string,
        producer: string,
        release_date: string,
        characters: SwCharacter[],
    
    ) {
        this.title = title;
        this.episode_id = episode_id;
        this.opening_crawl = opening_crawl;
        this.producer = producer;
        this.release_date = release_date;
        this.characters = characters;
        this.banner = `../../assets/images/cover/${episode_id}.png`;
    }


}


