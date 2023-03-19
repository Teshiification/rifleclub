interface user {
    id: string,
    created_at: Date,
    name: string,
    lastname: string,
    birthday: Date,
    active:boolean,
    license?: boolean,
    postal?: number,
    city?: string,
    street?: string,
    street_nr?: number,
    street_ad?: string,
}