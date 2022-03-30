import {Fighter} from './Fighter';

/**
 * Clase donde se almacenarán todos los personajes de los distintos universos
 */
export class BaseDeDatos {
  private baseDeDatos:Fighter[] = [];
  constructor(baseDeDatos:Fighter[]) {
    this.baseDeDatos = baseDeDatos;
  }
  /**
   * Método para introducir en la base de datos a un nuevo participante
   * @param participante
   * @returns texto
   */
  public insertarParticipante(participante:Fighter):string {
    const texto:string = 'Participante introducido';
    this.baseDeDatos.push(participante);
    return texto;
  }
  /**
   * Método para mostrar por pantalla una tabla con todos los participantes
   * de los distintos universos y sus respectivos atributos
   */
  public mostrarBaseDeDatos():void {
    console.table(this.baseDeDatos);
  }
  /**
   * Método para obtener los datos del personaje en un índice
   * @param index
   * @returns
   */
  public getPersonaje(index:number):Fighter {
    return this.baseDeDatos[index];
  }
}