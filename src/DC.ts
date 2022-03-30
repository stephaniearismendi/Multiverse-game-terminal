import {Fighter} from './Fighter';

/**
 * Clase del universo DC, que contendrá los personajes del mismo.
 */
export class DC extends Fighter {
  private metahumano:boolean;
  private adrenalina:boolean;
  private arma?:string;
  constructor(poder:number, nombre:string, altura:number,
      peso:number, frase:string, aguante:number, vida:number,
      metahumano:boolean, adrenalina:boolean, arma?:string) {
    super(poder, nombre, altura, peso, frase, aguante, vida);
    this.metahumano = metahumano;
    this.adrenalina = adrenalina;
    this.arma = arma;
  }
  /**
   * Método que, si el jugador tiene un boost de adrenalina,
   * multiplica el aguante x2
   * @returns number
   */
  calcularAguante(): number {
    if (this.adrenalina == true) {
      this.setAguante(this.getAguante() * 2);
    }
    return this.getAguante();
  }
  /**
   * Método que, si el jugador es metahumano, se multiplica
   * el poder x2
   * @returns number
   */
  calcularPoder(): number {
    if (this.metahumano) {
      this.setPoder(this.getPoder() * 2);
    }
    return this.getPoder();
  }
  /**
   * Método que devuelve la frase de ataque de un jugador. Si tiene un arma,
   * el string se forma con el mismo; en otro caso, se elige una frase aleatoria
   * de un array
   * @returns string
   */
  fraseAtacar(): string {
    let texto:string = '';
    const frasesAtaque:string[] = ['ha dado una patada a su rival.', 'ha lanzado un puñetazo a su rival.', 'ha golpeado el rostro de su rival.'];
    const rand = ~~(Math.random()*frasesAtaque.length);
    if (this.arma != undefined) {
      texto = this.getNombre() + ' ' + 'ha golpeado a su rival con su ' + this.arma + '.';
    } else {
      texto = this.getNombre() + ' ' + frasesAtaque[rand];
    }
    return texto;
  }
}