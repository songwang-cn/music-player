export class BaseEntity{

    id!: number

    name!: string

    setId(id: number) {
        this.id = id
        return this
    }

    setName(name: string) {
        this.name = name
        return this
    }
}