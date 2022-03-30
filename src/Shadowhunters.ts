import {Fighter} from './Fighter';

/**
 * Clase que implementará a los personajes del
 * universo Shadowhunters
 */
export class Shadowhunters extends Fighter {
  private runa?:string;
  constructor(poder:number, nombre:string, altura:number,
      peso:number, frase:string, aguante:number, vida:number, runa?:string) {
    super(poder, nombre, altura, peso, frase, aguante, vida);
    this.runa = runa;
  }
  /**
   * Setter
   * @param runa
   */
  public setRuna(runa:string):void {
    this.runa = runa;
  }
  /**
   * getter
   * @returns string
   */
  public getRuna():string | undefined {
    if (this.runa != undefined) {
      return this.runa;
    } else {
      return undefined;
    }
  }
  /**
   * Método que calcula el aguante de un personaje del universo
   * Shadowhunters. Si lleva una runa de curación o amissio, el
   * aguante se multiplicará x2
   * @returns number
   */
  calcularAguante(): number {
    if (this.runa == 'curacion' || this.runa == 'amissio') {
      this.setAguante(this.getAguante() * 2);
    }
    return this.getAguante();
  }
  /**
   * Método que calcula el poder de un personaje del universo
   * Shadowhunters. Si lleva una runa fortis o dexteritas, el
   * poder se multiplicará x2
   * @returns number
   */
  calcularPoder(): number {
    if (this.runa == 'fortis' || this.runa == 'dexteritas') {
      this.setPoder(this.getPoder() * 2);
    }
    return this.getPoder();
  }
  /**
   * Método que devuelve la frase de ataque aleatoriamente de los
   * strings de un array
   * @returns string
   */
  fraseAtacar(): string {
    let texto:string = '';
    const frasesAtacar:string[] = ['ha usado su cuchillo serafín.', 'ha golpeado en la cabeza a su rival.',
      'ha dado una patada a su rival.', 'ha lanzado un cuchillo a su rival.', 'ha usado su daga.'];
    const rand = ~~(Math.random()*frasesAtacar.length);
    texto = this.getNombre() + ' ' + frasesAtacar[rand];
    return texto;
  }
}