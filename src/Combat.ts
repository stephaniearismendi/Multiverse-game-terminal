import {Fighter} from './Fighter';

/**
 * Clase combat en la que desarrolla el combate y los
 * diferentes métodos que servirán en el mismo
 */
export class Combat {
  private Oponente1:Fighter;
  private Oponente2:Fighter;
  constructor(Oponente1:Fighter, Oponente2:Fighter) {
    this.Oponente1 = Oponente1;
    this.Oponente2 = Oponente2;
  }
  /**
	 * Función que retorna un array con las frases de ambos oponentes.
	 * @returns string
	 */
  public decirFrases():string[] {
    const frases:string[] = [' ', ' '];
    frases[0] = this.Oponente1.getFrase();
    frases[1] = this.Oponente2.getFrase();
    return frases;
  }
  /**
	 * Función que imprime una tabla con los atributos de los dos
	 * contrincantes.
	 */
  public mostrarAtributos():void {
    const Oponentes: Fighter[] = [this.Oponente1, this.Oponente2];
    console.log('A continuación se mostrarán las características de ambos adversarios.');
    console.table(Oponentes);
  }
  /**
	* Función que retorna el daño causado siguiendo la siguiente fórmula:
	* Damage = Attack * ( 100 - defense) / 100.
	* @param rival selecciona el rival que está atacando
	*/
  public eficacia(rival:number):number {
    let eficacia:number;
    if (rival == 1) {
      eficacia = this.Oponente1.getPoder() * (100 - this.Oponente2.getAguante()) / 100;
    } else if (rival == 2) {
      eficacia = this.Oponente2.getPoder() * (100 - this.Oponente1.getAguante()) / 100;
    } else {
      eficacia = 0;
    }
    return eficacia;
  }
  /**
	 * Método que resta el daño a el aguante del oponente elegido.
	 * @param oponenteDamaged 1 para restar el daño al oponente1, 2 para restarselo
	 * al oponente2
	 * @returns 1 si el daño es causado por oponente1, 2 si es causado por oponente2, 0 en otro caso
	 */
  public damageGenerado(oponenteDamaged:Number):void {
    if (oponenteDamaged == 1) {
      this.Oponente2.setVida(this.Oponente2.getVida() - this.eficacia(1));
    } else if (oponenteDamaged == 2) {
      this.Oponente1.setVida(this.Oponente1.getVida() - this.eficacia(2));
    }
  }
  /**
   * Método para comprobar si alguno de los contrincantes se ha rendido
   * @param Oponente
   * @returns 'se ha rendido' si aguante es <= 0
   */
  public comprobarRendicion(Oponente:Fighter):string {
    let texto:string = ' ';
    if (Oponente.getVida() <= 0) {
      texto = Oponente.getNombre() + ' se ha rendido.';
    }
    return texto;
  }
  /**
   * Método que lleva el control de el desarrollo del combate. Un combatiente se rendirá cuando ya
   * no le quede ni una gota de fuerza. Tiene en cuenta los boost de los diferentes universos y controla
   * que solo se usen una vez.
   */
  public start() {
    let iter:number = 1;
    let bonusoponente1:boolean = true;
    let bonusoponente2:boolean = true;
    console.log('La batalla está a punto de empezar.');
    while ((this.Oponente1.getVida()) > 0 && (this.Oponente2.getVida()) > 0) {
      if (iter > 2) {
        iter = 1;
      }
      if (iter == 1) {
        this.battle(this.Oponente1, iter);
        if (this.comprobarRendicion(this.Oponente2) != ' ') {
          console.log(this.comprobarRendicion(this.Oponente2));
        } else {
          console.log(this.getAguanteRestante(this.Oponente2));
          if (bonusoponente2 == true) {
            if (this.enApuros(this.Oponente2)) {
              bonusoponente2 = false;
            }
          }
        }
      } else if (iter == 2) {
        this.battle(this.Oponente2, iter);
        if (this.comprobarRendicion(this.Oponente1) != ' ') {
          console.log(this.comprobarRendicion(this.Oponente1));
        } else {
          console.log(this.getAguanteRestante(this.Oponente1));
          if (bonusoponente1 == true) {
            if (this.enApuros(this.Oponente1)) {
              bonusoponente1 = false;
            }
          }
        }
      }
      iter++;
    }
  }
  /**
   * Función que toma como parametro un combatiente de la clase Fighter
   * y calcula los daños ejercidos y recibidos
   * @param Oponente combatiente clase Fighter
   * @param numero necesario para la función damageGenerado y eficacia
   */
  public battle(Oponente:Fighter, numero:number):void {
    console.log(Oponente.fraseAtacar());
    this.damageGenerado(numero);
  }
  /**
   * Función que imprime el aguante restante de los combatientes
   * @param Oponente
   * @returns texto
   */
  public getAguanteRestante(Oponente:Fighter):string {
    const texto = 'A ' + Oponente.getNombre() + ' le queda ' + Oponente.getVida() + ' de vida.';
    return texto;
  }
  /**
   * Bonus por universo que solo se podrá usar en casos de apuros.
   * @param Oponente1aux auxuliar combatiente 1
   * @returns boolean true if used
   */
  public enApuros(Oponente:Fighter):boolean {
    let used:boolean = false;
    if (Oponente.getVida() < 50) {
      Oponente.calcularAguante();
      Oponente.calcularPoder();
      used = true;
    }
    return used;
  }
}