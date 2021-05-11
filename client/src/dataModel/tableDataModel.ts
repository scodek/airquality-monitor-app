export interface TableColumns{
    key:string;
    rank: number;
    quality: number;
    capital: string;
    flag:string;
    countryName:string;
    population: number;
}

export interface ResponseData{
    _id:string;
    countryName:string;
    capital: string;
    population: number;
    flag:string;
    isoCode:string;
    aqi:number;
    rank: number;
}