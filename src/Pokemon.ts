import {Fighter} from './Fighter';
export type Ataques = [string, string]; // ataque y tipo
/**
 * Clase que contendrá el universo Pokémon
 */
export class Pokemon extends Fighter {
  private type:string;
  private ataques:Ataques;
  constructor(type:string, ataques:Ataques, poder:number,
      nombre:string, altura:number, peso:number, frase:string, aguante:number, vida:number) {
    super(poder, nombre, altura, peso, frase, aguante, vida);
    this.ataques = ataques;
    this.type = type;
  }
  /**
   * Método que calcula el aguante según la vida restante
   * del pokémon. Si es inferior a 50, se multiplicará
   * por dos.
   * @returns number
   */
  calcularAguante(): number {
    if (this.getVida() < 50) {
      this.setAguante(this.getAguante() * 2);
    }
    return this.getAguante();
  }
  /**
   * Método que calcula el poder según el tipo del
   * ataque. Si es el mismo que del pokémon, se
   * multiplicará por dos.
   * @returns number
   */
  calcularPoder(): number {
    if (this.ataques[1] == this.type) {
      this.setPoder(this.getPoder() * 2);
    }
    return this.getPoder();
  }
  /**
   * Método que devuelve el pokémon y el ataque a utilizar
   * @returns string
   */
  fraseAtacar(): string {
    let texto:string = '';
    texto = this.getNombre() + ' ha usado ' + this.ataques[0] + '.';
    return texto;
  }
}