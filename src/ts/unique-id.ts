class UniqueId {
  public readonly id: string;

  constructor(id?: string) {
    this.id = id ?? UniqueId.getId();
  }
  
  static getId(): string {
    const S4 = () => (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    return `${S4()+S4()}-${S4()}-${S4()}-${S4()}-${S4()+S4()+S4()}`;
  }
}

export default UniqueId;