interface user {
    id: string,
    active:boolean,
    created_at: Date,
    profile_id?: number,
    name: string,
    lastname: string,
    birthday: Date,
    adress?: string,
    adressAdditionals?: string,
    zip?: number,
    cityName?:string,
}