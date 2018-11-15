export class SwCharacter {
    char_id: number;
    url: string;
    name: string;
    gender: string;
    height: number;
    gender_abrv: string;

    constructor(
        id: number,
        url: string,
        name?: string,
        gender?: string,
        height?: number,
        icon?: string
    ) {
        this.char_id = id;
        this.url = url;
        this.name = name;
        this.gender = gender;
        this.height = height;
        this.gender_abrv = icon;
    }
}
