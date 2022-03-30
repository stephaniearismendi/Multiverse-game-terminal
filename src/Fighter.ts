/**
 * Clase abstracta a la que pertenecerán los distintos universos.
 */
export abstract class Fighter {
  private nombre:string;
  private poder:number;
  private altura:number;
  private peso:number;
  private frase:string;
  private aguante:number;
  private vida:number;
  constructor(poder:number, nombre:string, altura:number,
      peso:number, frase:string, aguante:number, vida:number) {
    this.nombre = nombre;
    this.poder = poder;
    this.altura = altura;
    this.peso = peso;
    this.frase = frase;
    this.aguante = aguante;
    this.vida = vida;
  }
  /**
   * getters
   */
  public getPoder():number {
    return this.poder;
  }
  public getNombre():string {
    return this.nombre;
  }
  public getFrase():string {
    return this.frase;
  }
  public getAguante():number {
    return this.aguante;
  }
  public getPeso():number {
    return this.peso;
  }
  public getAltura():number {
    return this.altura;
  }
  public getVida():number {
    return this.vida;
  }
  /**
   * setters
   */
  public setAguante(aguante:number):void {
    this.aguante = aguante;
  }
  public setPoder(poder:number):void {
    this.poder = poder;
  }
  public setVida(vida:number):void {
    this.vida = vida;
  }
/**
 * método abstracto para cacular el poder
 */
abstract calcularPoder():number;
/**
 * método abstracto para calcular el aguante
 */
abstract calcularAguante():number;
/**
 * método abstracto para decir las frases de los personajes
 */
abstract fraseAtacar():string;
}