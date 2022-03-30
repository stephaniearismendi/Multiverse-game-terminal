import {Fighter} from './Fighter';

/**
 * Clase que contendrá a los personajes del
 * Universo Marvel
 */
export class Marvel extends Fighter {
  private supersoldado:boolean;
  private mutante:boolean;
  private arma?:string;
  constructor(nombre:string, poder:number, altura:number,
      peso:number, frase:string, aguante:number, vida:number,
      mutante:boolean, supersoldado:boolean, arma?:string) {
    super(poder, nombre, altura, peso, frase, aguante, vida);
    this.mutante = mutante;
    this.supersoldado = supersoldado;
    this.arma = arma;
  }
  /**
   * Método que calculará el aguante, siendo x2 si
   * el personaje es un supersoldado
   * @returns number
   */
  calcularAguante(): number {
    if (this.supersoldado) {
      this.setAguante(this.getAguante() * 2);
    }
    return this.getAguante();
  }
  /**
   * Método que calculará el poder, siendo x2 si
   * el personaje es un mutante
   * @returns number
   */
  calcularPoder():number {
    if (this.mutante) {
      this.setPoder(this.getPoder() * 2);
    }
    return this.getPoder();
  }
  /**
   * Método que retornará la frase de un personaje. Si tiene un arma declarada,
   * se añaderá en el string; de otra manera, se elegirá una aleatoria de un array
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