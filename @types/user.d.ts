interface user {
    id: string,
    created_at: Date,
    name: string,
    lastname: string,
    birthday: Date,
    active:boolean,
    license?: boolean,
    adress?: string,
    adressAdditionals?: string,
    zip?: number,
    cityName?:string,
}