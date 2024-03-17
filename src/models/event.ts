export class Event {
  private id: number
  private name: string
  private price: number
  private type: string

  public constructor(id: number, name: string, price: number, type: string) {
    this.id = id
    this.name = name
    this.price = price
    this.type = type
  }

  // Getters
  public getId(): number {
    return this.id
  }

  public getName(): string {
    return this.name
  }

  public getPrice(): number {
    return this.price
  }

  public getType(): string {
    return this.type
  }

  // Setters
  public setId(id: number): void {
    this.id = id
  }

  public setName(name: string): void {
    this.name = name
  }

  public setPrice(price: number): void {
    this.price = price
  }

  public setType(type: string): void {
    this.type = type
  }
}
