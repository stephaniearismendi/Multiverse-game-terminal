## Práctica 6 - Clases e interfaces genéricas. Principios SOLID.

En esta práctica se resolverá una serie de ejercicios de programación que nos permitirán conocer más en profundidad las clases e interfaces genéricas del lenguaje TypeScript. Además, también se utilizarán los principios SOLID de diseño orientado a objetos.

### Ejercicio 1 - El combate definitivo

Partiendo del desarrollo realizado para el [Ejercicio 1 de la Práctica 5](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct05-objects-classes-interfaces-stephaniearismendi/tree/master/src/ejercicio-1), se supone que ahora se quieren incluir distintos tipos de contendientes a la pelea. En este caso, se valorarán los universo de Pokémon, Marvel, DC y Shadowhunters.

Para lograrlo implementaremos una clase abstracta `Fighter`, que contendrá todos los universos. Esta seguirá el siguiente esquema:

```typescript
export abstract class Fighter {
  private nombre: string;
  private poder: number;
  private altura: number;
  private peso: number;
  private frase: string;
  private aguante: number;
  private vida: number;
  constructor(
    poder: number,
    nombre: string,
    altura: number,
    peso: number,
    frase: string,
    aguante: number,
    vida: number
  ) {
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
  public getPoder(): number {
    return this.poder;
  }
  public getNombre(): string {
    return this.nombre;
  }
  public getFrase(): string {
    return this.frase;
  }
  public getAguante(): number {
    return this.aguante;
  }
  public getPeso(): number {
    return this.peso;
  }
  public getAltura(): number {
    return this.altura;
  }
  public getVida(): number {
    return this.vida;
  }
  /**
   * setters
   */
  public setAguante(aguante: number): void {
    this.aguante = aguante;
  }
  public setPoder(poder: number): void {
    this.poder = poder;
  }
  public setVida(vida: number): void {
    this.vida = vida;
  }
  /**
   * método abstracto para cacular el poder
   */
  abstract calcularPoder(): number;
  /**
   * método abstracto para calcular el aguante
   */
  abstract calcularAguante(): number;
  /**
   * método abstracto para decir las frases de los personajes
   */
  abstract fraseAtacar(): string;
}
```

En ella se ve la declaración de los atributos privados `nombre`, `poder`, `altura`, `peso`, `frase`, `aguante` y `vida`, que formarán parte del constructor. Al ser una clase abstracta, estos serán comunes a todos los universos. Además, como métodos, también comunes, tenemos los getters y los setters.

Por otra parte, están los métodos abstractos `calcularPoder`, `calcularAguante` y `fraseAtacar` que variarán según el universo. Por ello, en cada una de las clases se implementará su funcionamiento.

Seguidamente, las clases extendidas de cada universo:

- Marvel

```typescript
class Marvel extends Fighter {
  private supersoldado: boolean;
  private mutante: boolean;
  private arma?: string;
  constructor(
    nombre: string,
    poder: number,
    altura: number,
    peso: number,
    frase: string,
    aguante: number,
    vida: number,
    mutante: boolean,
    supersoldado: boolean,
    arma?: string
  ) {
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
  calcularPoder(): number {
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
    let texto: string = "";
    const frasesAtaque: string[] = [
      "ha dado una patada a su rival.",
      "ha lanzado un puñetazo a su rival.",
      "ha golpeado el rostro de su rival.",
    ];
    const rand = ~~(Math.random() * frasesAtaque.length);
    if (this.arma != undefined) {
      texto =
        this.getNombre() +
        " " +
        "ha golpeado a su rival con su " +
        this.arma +
        ".";
    } else {
      texto = this.getNombre() + " " + frasesAtaque[rand];
    }
    return texto;
  }
}
```

En esta clase se puede observar una declaración de atributos adicionales, como son los boolean de `supersoldado` y `mutante`, o el string opcional de `arma`. En el constructor aparecen los atributos generales de la clase , sumado a estos.

Además, aquí se ve la implementación de cada uno de los métodos abstractos, donde si el jugador es supersoldado el aguante se multiplicará por dos. En cambio, si es mutante, lo que se multiplicará será el poder.

Además, en `fraseAtacar` se retornará la frase de ataque, donde si se ha declarado un arma será "Capitán América ha golpeado a su rival con su escudo", por ejemplo. En caso contrario, se elegirá un string aleatorio de dentro de un array.

- Pokémon

```typescript
export type Ataques = [string, string]; // ataque y tipo

export class Pokemon extends Fighter {
  private type: string;
  private ataques: Ataques;
  constructor(
    type: string,
    ataques: Ataques,
    poder: number,
    nombre: string,
    altura: number,
    peso: number,
    frase: string,
    aguante: number,
    vida: number
  ) {
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
    let texto: string = "";
    texto = this.getNombre() + " ha usado " + this.ataques[0] + ".";
    return texto;
  }
}
```

En la clase Pokémon los atributos adicionales consiste en un type Ataque, que implementa dos strings. Uno se referirá al ataque y otro al tipo. Luego, esto servirá para que, al calcular el poder, si el tipo del ataque y el del pokémon es igual se multiplique por dos. En cambio, para el aguante, cuando la vida del poder es menor de 50 este también recibirá un bonus de x2. Es un procedimiento similar a la habilidad Mar Llamas en los iniciales de tipo fuego.

> Mar llamas aumenta la potencia de los movimientos de tipo fuego del poseedor en un 50% cuando su salud esté igual o por debajo de 1/3 de sus PS máximos.

Respecto a `fraseAtacar`, en cambio, y al igual que en los otros universos, devuelve un string con una frase de ataque. Esta esta formada, en este caso, por el nombre del pokémon y el ataque pasado por el constructor.

- DC

```typescript
class DC extends Fighter {
  private metahumano: boolean;
  private adrenalina: boolean;
  private arma?: string;
  constructor(
    poder: number,
    nombre: string,
    altura: number,
    peso: number,
    frase: string,
    aguante: number,
    vida: number,
    metahumano: boolean,
    adrenalina: boolean,
    arma?: string
  ) {
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
    let texto: string = "";
    const frasesAtaque: string[] = [
      "ha dado una patada a su rival.",
      "ha lanzado un puñetazo a su rival.",
      "ha golpeado el rostro de su rival.",
    ];
    const rand = ~~(Math.random() * frasesAtaque.length);
    if (this.arma != undefined) {
      texto =
        this.getNombre() +
        " " +
        "ha golpeado a su rival con su " +
        this.arma +
        ".";
    } else {
      texto = this.getNombre() + " " + frasesAtaque[rand];
    }
    return texto;
  }
}
```

Esta clase es similar a la de marvel, implementandose dos atributos booleanos `metahumano` y `adrenalina`, además del opcional `arma`. Si es metahumano, entonces en la función `calcularPoder` se multiplicará el poder de ataque x2. En cambio, si tiene un boost de adrenalina lo que se multiplicará por dos será el aguante.

Finalmente, `fraseAtacar` tiene un funcionamiento igual al del universo Marvel, donde devuelve un string aleatorio o no según tenga un arma declarada.

- Shadowhunters

```typescript
class Shadowhunters extends Fighter {
  private runa?: string;
  constructor(
    poder: number,
    nombre: string,
    altura: number,
    peso: number,
    frase: string,
    aguante: number,
    vida: number,
    runa?: string
  ) {
    super(poder, nombre, altura, peso, frase, aguante, vida);
    this.runa = runa;
  }
  /**
   * Setter
   * @param runa
   */
  public setRuna(runa: string): void {
    this.runa = runa;
  }
  /**
   * getter
   * @returns string
   */
  public getRuna(): string | undefined {
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
    if (this.runa == "curacion" || this.runa == "amissio") {
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
    if (this.runa == "fortis" || this.runa == "dexteritas") {
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
    let texto: string = "";
    const frasesAtacar: string[] = [
      "ha usado su cuchillo serafín.",
      "ha golpeado en la cabeza a su rival.",
      "ha dado una patada a su rival.",
      "ha lanzado un cuchillo a su rival.",
      "ha usado su daga.",
    ];
    const rand = ~~(Math.random() * frasesAtacar.length);
    texto = this.getNombre() + " " + frasesAtacar[rand];
    return texto;
  }
}
```

En este universo la diferencia de poder o aguante dependerá de las runas. Una runa, para los shadowhunters, es una marca en la piel (como un tatuaje) que le proporciona habilidades adicionales. Estas pueden ir desde visión nocturna, resistencia, curación hasta más poder.

En este caso, si el shadowhunter tiene una runa **fortis** o **dexteritas**, su poder aumentará x2. En cambio, si tiene una runa **curacion** o **amissio** se duplicará su resistencia.

En este universo el método `fraseAtacar` devolverá siempre un string aleatorio de un array.

Además, todos los personajes creados en los distintos universos pertenecerán a una Base de Datos. Esta está implementada en la clase `BaseDeDatos`.

```typescript
class BaseDeDatos {
  private baseDeDatos: Fighter[] = [];
  constructor(baseDeDatos: Fighter[]) {
    this.baseDeDatos = baseDeDatos;
  }
  /**
   * Método para introducir en la base de datos a un nuevo participante
   * @param participante
   * @returns texto
   */
  public insertarParticipante(participante: Fighter): string {
    const texto: string = "Participante introducido";
    this.baseDeDatos.push(participante);
    return texto;
  }
  /**
   * Método para mostrar por pantalla una tabla con todos los participantes
   * de los distintos universos y sus respectivos atributos
   */
  public mostrarBaseDeDatos(): void {
    console.table(this.baseDeDatos);
  }
  /**
   * Método para obtener los datos del personaje en un índice
   * @param index
   * @returns
   */
  public getPersonaje(index: number): Fighter {
    return this.baseDeDatos[index];
  }
}
```

En esta, el constructor recibirá un array de personajes de los diferentes universos (pertenecientes a la clase abstracta `Fighter`), y los introducirá en la base de datos. Como métodos tiene `mostrarBaseDeDatos`, que imprimirá por pantalla una tabla con todos los personajes pertenecientes así como sus distintos atributos, y `getPersonaje`, que retornará el objeto de personaje que esté en el indice indicado. También está `inserarParticipante`, que añadirá un nuevo personaje a la base de datos, retornando un array informando de que el proceso se ha completado correctamente.

Finalmente, todo tendrá lugar en la clase `Combat`.

```typescript

class Combat {
  private Oponente1:Fighter;
  private Oponente2:Fighter;
  constructor(Oponente1:Fighter, Oponente2:Fighter) {
    this.Oponente1 = Oponente1;
    this.Oponente2 = Oponente2;
  }

```

Esta clase cuenta con muchos más métodos, así que se profundizará en ellos uno a uno.

- decirFrases

```typescript

  public decirFrases():string[] {
    const frases:string[] = [' ', ' '];
    frases[0] = this.Oponente1.getFrase();
    frases[1] = this.Oponente2.getFrase();
    return frases;
  }
  ```

Este método sirve para retornar las frases de ambos oponentes en un array.

- mostrarAtributos

```typescript

  public mostrarAtributos():void {
    const Oponentes: Fighter[] = [this.Oponente1, this.Oponente2];
    console.log('A continuación se mostrarán las características de ambos adversarios.');
    console.table(Oponentes);
  }

  ```

  Este método sirve para imprimir por pantalla las características de ambos oponentes. Similar al `mostrarAtributos` de la clase `BasesdeDatos`, pero únicamente con los combatientes.

  - Eficacia

```typescript

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

```

Este método sirve para calcular la eficacia según la fórmula:

> Damage = Attack * ( 100 - defense) / 100.

El parametro `rival` indica el oponente que está atacando.

- damageGenerado

```typescript

  public damageGenerado(oponenteDamaged:Number):void {
    if (oponenteDamaged == 1) {
      this.Oponente2.setVida(this.Oponente2.getVida() - this.eficacia(1));
    } else if (oponenteDamaged == 2) {
      this.Oponente1.setVida(this.Oponente1.getVida() - this.eficacia(2));
    }
  }

```

Este método sirve para actualizar la vida de los oponentes utilizando el método anterior. En este caso, `òponentDamaged` representa al oponente que ha sido dañado. Es decir, no el que haya realizado el ataque.

- comprobarRendicion

```typescript

  public comprobarRendicion(Oponente:Fighter):string {
    let texto:string = ' ';
    if (Oponente.getVida() <= 0) {
      texto = Oponente.getNombre() + ' se ha rendido.';
    }
    return texto;
  }

```

Este método comprueba si el oponente pasado como parametro tiene una vida igual o inferior a cero y, en caso de cummpliur la condición, retorna "X se ha rendido". En caso contrario, retorna un string vacío.

- battle

```typescript
  public battle(Oponente:Fighter, numero:number):void {
    console.log(Oponente.fraseAtacar());
    this.damageGenerado(numero);
  }
```

Sirve para sacar por pantalla el ataque del jugador pasado por parametro, además de generar el daño.

- getAguanteRestante

```typescript

  public getAguanteRestante(Oponente:Fighter):string {
    const texto = 'A ' + Oponente.getNombre() + ' le queda ' + Oponente.getVida() + ' de vida.';
    return texto;
  }

```

Método auxiliar que imprime por pantalla cuánta vida le queda al oponente pasado como parámetro.

- enApuros

```typescript

  public enApuros(Oponente:Fighter):boolean {
    let used:boolean = false;
    if (Oponente.getVida() < 50) {
      Oponente.calcularAguante();
      Oponente.calcularPoder();
      used = true;
    }
    return used;
  }

```

Método que, si la vida del jugador es menor a 50, implementa los diferentes combos. Además, activa retorna el booleano `used` si se ha entrado en el if.

- start

```typescript

  public start():void {
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

```

Contiene el funcionamiento general del combate. Se van alternando las distintas funciones que se repetirán mientras ambos oponentes tengan una vida superior a 0. La variable `iter` sirve para pasar por pantalla a las funciones que necesitan el atacante para diferenciar entre el Oponente1 o el Oponente2. Además, siempre que pase de 2 se reiniciará a 1, para que solo tenga en cuenta los escenarios posibles.

### Ejercicio 2 - DSIflix.

Se imaginará que hay que diseñar el modelo de datos de una plataforma de vídeo en streaming. A través del catálogo de dicha plataforma se puede acceder a películas, series y documentales.

Para ello, primeramente, se implementarán las siguientes interfaces:

```typescript

interface Streamable<T>{
    addItem(newItem: T):void;
    getItem(index:number):T;
    removeItem(index:number):void;
    getNumberOfITems():number;
}

```
Que declarará los métodos de la manipulación de Items.

```typescript
interface StreamSearch<T>{
    searchByName(terminoBusqueda: string):T[] | undefined;
    searchByYear(terminoBusqueda: number):T[] | undefined;
    searchByDescriptor(terminoBusqueda:string):T[] | undefined;
}
```
Que declarará los métodos de búsqueda de los Items.

Estas dos interfaces serán implementadas por la clase abstracta ``BasicStreamableCollection`:

```typescript

abstract class BasicStreamableCollection<T> implements Streamable<T>, StreamSearch<T> {
  constructor(protected items:T[]) {

  }
  /**
   * Método que añade un nuevo Item a la Colección
   * @param newItem
   */
  addItem(newItem: T): void {
    this.items.push(newItem);
  }
  /**
   * Método que devuelve el Item de la Colección en un
   * índice concreto
   * @param index
   * @returns T
   */
  getItem(index: number): T {
    return this.items[index];
  }
  /**
   * Método que elimina el Item de la Colección en un
   * índice concreto
   * @param index
   */
  removeItem(index: number): void {
    this.items.splice(index, 1);
  }
  /**
   * Función que devuelve el número de elementos en la
   * colección
   * @returns number
   */
  getNumberOfITems(): number {
    let contador:number = 0;
    for (let i = 1; i <= this.items.length; i++) {
      contador = i;
    }
    return contador;
  }
  /**
   * Métodos abstractos
   */
  abstract searchByDescriptor(terminoBusqueda: string): T[] | undefined;
  abstract searchByName(terminoBusqueda: string): T[] | undefined;
  abstract searchByYear(terminoBusqueda: number): T[] | undefined;
}

```

Esta recibirá un array de items genéricos como constructor, e implementará las definiciones del manejo de Items. Las de búsqueda, en cambio, serán métodos abstractos, que serán definidos en cada clase.

- Documentales

Para documentales se declarará la interfaz: 

```typescript

type documentalDatos = {
    year:number;
    descriptor:string;
    titulo:string;
    cadena:string;
}

```

Entonces, la clase Documental sería la siguiente, usando como tipo `documentalDatos`:

```typescript

class Documentales extends BasicStreamableCollection<documentalDatos> {
  constructor(protected items:documentalDatos[]) {
    super(items);
  }
  /**
   * Método que devuelve los datos de todos los elementos que coincidan
   * con un descriptor
   * @param terminoBusqueda
   * @returns array
   */
  searchByDescriptor(terminoBusqueda: string): documentalDatos[] | undefined {
    let arrayFinal:documentalDatos[] = [];
    arrayFinal = this.items.filter((obj) => {
      return obj.descriptor == terminoBusqueda;
    });
    if (arrayFinal.length == 0) {
      return undefined;
    } else {
      return arrayFinal;
    }
  }
  /**
   * Método que devuelve los datos de todos los elementos que coincidan
   * con un nombre
   * @param terminoBusqueda
   * @returns array
   */
  searchByName(terminoBusqueda: string): documentalDatos[] | undefined {
    let arrayFinal:documentalDatos[] = [];
    arrayFinal = this.items.filter((obj) => {
      return obj.titulo == terminoBusqueda;
    });
    if (arrayFinal.length == 0) {
      return undefined;
    } else {
      return arrayFinal;
    }
  }
  /**
   * Método que devuelve los datos de todos los elementos que coincidan
   * con un año
   * @param terminoBusqueda
   * @returns array
   */
  searchByYear(terminoBusqueda: number): documentalDatos[] | undefined {
    let arrayFinal:documentalDatos[] = [];
    arrayFinal = this.items.filter((obj) => {
      return obj.year == terminoBusqueda;
    });
    if (arrayFinal.length == 0) {
      return undefined;
    } else {
      return arrayFinal;
    }
  }
  /**
   * Método que devuelve los datos de todos los elementos que sean de
   * una cadena en concreto
   * @param terminoBusqueda
   * @returns array
   */
  public searchByCadena(terminoBusqueda:string): documentalDatos[] | undefined {
    let arrayFinal:documentalDatos[] = [];
    arrayFinal = this.items.filter((obj) => {
      return obj.cadena == terminoBusqueda;
    });
    if (arrayFinal.length == 0) {
      return undefined;
    } else {
      return arrayFinal;
    }
  }
}

```

Al constructor se le pasa como parámetro un array items del tipo `documentalDatos`. Seguidamente, método a método:

1. searchByDescriptor : devuelve los datos de todos los documentales que coincidan con un descriptor en concreto.
2. searchByName : devuelve los datos de todos los elementos del array de documentales que coincidan con un nombre (título).
3. searchByYear : devuelve los datos de todos los elementos del array que hayan sido lanzados en un año en concreto.
4. searchByCadena : devuelve los datos de todos los elementos del array que sean de una cadena televisiva en concreto.

- Películas

Para películas se declarará la interfaz : 

```typescript

type peliculasDatos = {
    year:number;
    descriptor:string;
    titulo:string;
    director:string;
    actores:string[];
}

```

Entonces, la clase Películas será la siguiente, usando como tipo `peliculasDatos`:

```typescript

class Peliculas extends BasicStreamableCollection<peliculasDatos> {
  constructor(protected items:peliculasDatos[]) {
    super(items);
  }
  /**
   * Método que devuelve los datos de todos los elementos que coincidan
   * con un descriptor
   * @param terminoBusqueda
   * @returns array
   */
  searchByDescriptor(terminoBusqueda: string): peliculasDatos[] | undefined {
    let arrayFinal:peliculasDatos[] = [];
    arrayFinal = this.items.filter((obj) => {
      return obj.descriptor == terminoBusqueda;
    });
    if (arrayFinal.length == 0) {
      return undefined;
    } else {
      return arrayFinal;
    }
  }
  /**
   * Método que devuelve los datos de todos los elementos que coincidan
   * con un nombre
   * @param terminoBusqueda
   * @returns array
   */
  searchByName(terminoBusqueda: string): peliculasDatos[] | undefined {
    let arrayFinal:peliculasDatos[] = [];
    arrayFinal = this.items.filter((obj) => {
      return obj.titulo == terminoBusqueda;
    });
    if (arrayFinal.length == 0) {
      return undefined;
    } else {
      return arrayFinal;
    }
  }
  /**
   * Método que devuelve los datos de todos los elementos que coincidan
   * con un año
   * @param terminoBusqueda
   * @returns array
   */
  searchByYear(terminoBusqueda: number): peliculasDatos[] | undefined {
    let arrayFinal:peliculasDatos[] = [];
    arrayFinal = this.items.filter((obj) => {
      return obj.year == terminoBusqueda;
    });
    if (arrayFinal.length == 0) {
      return undefined;
    } else {
      return arrayFinal;
    }
  }
  /**
   * Método que devuelve los datos de todas las películas donde participen
   * uno o más actores
   * @param terminoBusqueda
   * @returns array
   */
  public searchByActores(terminoBusqueda:string[]):peliculasDatos[] | undefined {
    const arrayFinal:peliculasDatos[] = [];
    for (let i = 0; i < this.items.length; i++) {
      const found = this.items[i].actores.some((r)=> terminoBusqueda.includes(r));
      if (found) {
        arrayFinal.push(this.items[i]);
      }
    }
    if (arrayFinal.length == 0) {
      return undefined;
    } else {
      return arrayFinal;
    }
  }
  /**
   * Método que devuelve los datos de todas las películas dirigidas por un director
   * en concreto
   * @param terminoBusqueda
   * @returns array
   */
  public searchByDirector(terminoBusqueda:string): peliculasDatos[] | undefined {
    let arrayFinal:peliculasDatos[] = [];
    arrayFinal = this.items.filter((obj) => {
      return obj.director == terminoBusqueda;
    });
    if (arrayFinal.length == 0) {
      return undefined;
    } else {
      return arrayFinal;
    }
  }
}

```

Al constructor se le pasa como parámetro un array items del tipo `peliculasDatos`. Seguidamente, método a método: 

1. searchByDescriptor : Método que devuelve los datos de todas las películas que coincidan con un descriptor.
2. searchByName : Método que devuelve los datos de todas las películas que coinciden con un nombre.
3. searchByYear : Método que devuelve todos los datos de las películas que coincidan con un año de lanzamiento en concreto.
4. searchByActores : Método que recibe un array con nombres de actores y devuelve todas las películas donde participe uno o más de ellos.
5. searchByDirector : Método que devuelve todas las películas que coincidan por ser dirigidas por un director en concreto.

- Series

Para series se declarará la interfaz :

```typescript

type SeriesDatos = {
    year:number;
    descriptor:string;
    titulo:string;
    temporadas:number;
    director:string;
}

```

Entonces, la clase Serie sería la siguiente, usando como tpo `serieDatos`:

```typescript

class Series extends BasicStreamableCollection<SeriesDatos> {
  constructor(protected items:SeriesDatos[]) {
    super(items);
  }
  /**
   * Método que devuelve los datos de todos los elementos que coincidan
   * con un descriptor
   * @param terminoBusqueda
   * @returns array
   */
  searchByDescriptor(terminoBusqueda: string): SeriesDatos[] | undefined {
    let arrayFinal:SeriesDatos[] = [];
    arrayFinal = this.items.filter((obj) => {
      return obj.descriptor == terminoBusqueda;
    });
    if (arrayFinal.length == 0) {
      return undefined;
    } else {
      return arrayFinal;
    }
  }
  /**
   * Método que devuelve los datos de todos los elementos que coincidan
   * con un nombre
   * @param terminoBusqueda
   * @returns array
   */
  searchByName(terminoBusqueda: string): SeriesDatos[] | undefined {
    let arrayFinal:SeriesDatos[] = [];
    arrayFinal = this.items.filter((obj) => {
      return obj.titulo == terminoBusqueda;
    });
    if (arrayFinal.length == 0) {
      return undefined;
    } else {
      return arrayFinal;
    }
  }
  /**
   * Método que devuelve los datos de todos los elementos que coincidan
   * con un año
   * @param terminoBusqueda
   * @returns array
   */
  searchByYear(terminoBusqueda: number): SeriesDatos[] | undefined {
    let arrayFinal:SeriesDatos[] = [];
    arrayFinal = this.items.filter((obj) => {
      return obj.year == terminoBusqueda;
    });
    if (arrayFinal.length == 0) {
      return undefined;
    } else {
      return arrayFinal;
    }
  }
  /**
   * Método que devuelve los datos de todas las series con un número
   * de temporadas concreto
   * @param terminoBusqueda
   * @returns array
   */
  public searchByTemporadas(terminoBusqueda:number): SeriesDatos[] | undefined {
    let arrayFinal:SeriesDatos[] = [];
    arrayFinal = this.items.filter((obj) => {
      return obj.temporadas == terminoBusqueda;
    });
    if (arrayFinal.length == 0) {
      return undefined;
    } else {
      return arrayFinal;
    }
  }
  /**
   * Método que devuelve los datos de todas las series dirigidas por un director
   * en concreto
   * @param terminoBusqueda
   * @returns array
   */
  public searchByDirector(terminoBusqueda:string): SeriesDatos[] | undefined {
    let arrayFinal:SeriesDatos[] = [];
    arrayFinal = this.items.filter((obj) => {
      return obj.director == terminoBusqueda;
    });
    if (arrayFinal.length == 0) {
      return undefined;
    } else {
      return arrayFinal;
    }
  }
}

```

Al constructor se le pasa como parámetro un array items del tipo `seriesDatos`. Seguidamente, método a método:

1. searchByDescriptor : Método que devuelve los datos de todas las series que coincidan con un descriptor.
2. searchByName : Método que devuelve los datos de todas las series que coincidan con un nombre en concreto.
3. searchByYear : Método que devuelve los datos de todas las series que coincidan con un año en concreto como estreno.
4. searchByTemporadas : Método que devuelve los datos de todas las series que coincidan con un número de temporadas en concreto.
5. searchByDirector : Método que devuelve los datos de todas ls series qeu coincidan con un director. 

### Ejercicio 3 - El cifrado indescifrable

En el [Cifrado César](https://es.wikipedia.org/wiki/Cifrado_C%C3%A9sar), cada letra de un alfabeto se desplaza cierto número de posiciones. Por ejemplo, suponiendo el alfabeto ``ABCDEFGHIJKLMNÑOPQRSTUVWXYZ``, si fijamos un Cifrado César con desplazamiento d = 5, entonces, la letra A pasaría a ser la letra F, la letra B pasaría a ser la letra G, la letra Z pasaría a ser la letra E, y así sucesivamente.

Existe otro tipo de cifrados donde un texto de entrada se encripta utilizando un conjunto de Cifrados César con desplazamientos variables basados en las letras de una palabra clave. El desplazamiento se obtiene aplicando Cifrado César a una letra del mensaje utilizando como desplazamiento la posición de la letra correspondiente de la clave dentro del alfabeto. Por ejemplo, suponiendo el mismo alfabeto anterior y la palabra clave ``CLAVE``:

> "HOLAESTOESUNAPRUEBA"    
"CLAVECLAVECLAVECLAV"

Para simular esta encriptación implementaremos la clase `Cifrado`. Esta tendrá como atributos `alphabet`, un array de strings que contendrá el alfabeto y será opcional en el constructor. También estarán `texto` y `clave`, dos strings. Si el alfebeto no es declarado por medio del constructor, se utiliza el alfabeto por defecto.

```typescript

class Cifrado {
  private alphabet:string[] = [];
  private clave:string;
  private texto:string;
  constructor(texto:string, clave:string, alphabet?:string[]) {
    this.texto = texto;
    this.clave = clave;
    this.alphabet = alphabet || [...'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'];
  }

```

A continuación, tenemos los diferentes métodos: 

- splitEnArray

```typescript

  public splitEnarray(cadena:string):string[] {
    const array:string[] = Array.from(cadena);
    return array;
  }

```

Este método toma un stribng y lo transforma en un array.

- checkDisplacement

```typescript

  public checkDisplacement(caracter:string):number {
    const resultado:number = this.alphabet.indexOf(caracter) + 1;
    return resultado;
  }

```

Este método devuelve el desplazamiento numérico de un caracter respecto al alfabeto declarado.

- checkLongClave

```typescript

  public checkLongClave():void {
    const claveArray:string[] = this.splitEnarray(this.clave);
    const lenghtClave:number = this.clave.length;
    let aux:number = 0;
    if (lenghtClave < this.texto.length) {
      for (let i:number = 0; i < this.texto.length - lenghtClave; i++) {
        this.clave = this.clave.concat(claveArray[aux]);
        aux++;
        if (aux >= lenghtClave) {
          aux = 0;
        }
      }
    }
  }

```

Método que comprueba si la longitud de la clave es inferior a la del texto. En ese caso, se repetirá tantas veces como sea necesario para que las longitudes sean iguales.


- displacementCharacter

```typescript

 public displacementCharacter(caracter:string, displacement:number):string {
    const indiceOriginal:number = this.alphabet.indexOf(caracter);
    let indexDesplazado:number = indiceOriginal + displacement;
    let desplazado:string = '';
    if (indexDesplazado >= this.alphabet.length) {
      indexDesplazado = indexDesplazado - this.alphabet.length;
      desplazado = this.alphabet[indexDesplazado];
    } else {
      desplazado = this.alphabet[indiceOriginal + displacement];
    }
    return desplazado;
  }

```

Método que desplaza un caracter pasado como parametro según el desplazamiento, también como parámetro. Comprueba si el indice original más el desplazamiento introducido se pasan del tamaño del alfabeto y, de ser así, el indice desplazado será el número menos el tamaño del alfabeto.

- displacementString

```typescript

  public displacementString():string {
    let stringFinal:string = '';
    this.checkLongClave();
    for (let i = 0; i < this.texto.length; i++) {
      const displacement = this.checkDisplacement(this.clave[i]);
      stringFinal += this.displacementCharacter(this.texto[i], displacement);
    }
    return stringFinal;
  }

```

Método final, que devuelve el string de texto completamente desplazado haciendo uso de las funciones anteriores.

- descipher

```typescript

  public descipher():string {
    let stringFinal:string = '';
    this.checkLongClave();
    for (let i = 0; i < this.texto.length; i++) {
      const displacement = this.checkDisplacement(this.clave[i]);
      stringFinal += this.displacementCharacter(this.texto[i], -displacement);
    }
    return stringFinal;
  }

```

Método que devuelve un string con el mensaje descifrado haciendo uso de los métodos anteriores.

Finalmente, se han llevado a cabo una serie de pruebas, que pueden encontrarse [aquí](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct06-generics-solid-stephaniearismendi/tree/main/test).

La salida por pantalla es la siguiente:

```terminal



  Combat Tests: 
    ✔ decirFrase => ["No necesito un arma. Yo soy un arma", "La muerte es un estado mental, cariño"]
A continuación se mostrarán las características de ambos adversarios.
┌─────────┬────────────────┬───────┬────────┬───────┬──────────────────────────────────────────┬─────────┬──────┬─────────┬──────────────┬───────────┬────────────┬────────────┐
│ (index) │     nombre     │ poder │ altura │ peso  │                  frase                   │ aguante │ vida │ mutante │ supersoldado │   arma    │ metahumano │ adrenalina │
├─────────┼────────────────┼───────┼────────┼───────┼──────────────────────────────────────────┼─────────┼──────┼─────────┼──────────────┼───────────┼────────────┼────────────┤
│    0    │ 'Black Widow'  │  60   │  1.7   │ 59.42 │  'No necesito un arma. Yo soy un arma.'  │   70    │  60  │  false  │     true     │ 'pistola' │            │            │
│    1    │ 'Harley Quinn' │  50   │  1.68  │ 63.5  │ 'La muerte es un estado mental, cariño.' │   70    │  80  │         │              │  'bate'   │   false    │    true    │
└─────────┴────────────────┴───────┴────────┴───────┴──────────────────────────────────────────┴─────────┴──────┴─────────┴──────────────┴───────────┴────────────┴────────────┘
┌─────────┬────────────────┬───────┬────────┬───────┬──────────────────────────────────────────┬─────────┬──────┬─────────┬──────────────┬───────────┬────────────┬────────────┐
│ (index) │     nombre     │ poder │ altura │ peso  │                  frase                   │ aguante │ vida │ mutante │ supersoldado │   arma    │ metahumano │ adrenalina │
├─────────┼────────────────┼───────┼────────┼───────┼──────────────────────────────────────────┼─────────┼──────┼─────────┼──────────────┼───────────┼────────────┼────────────┤
│    0    │ 'Black Widow'  │  60   │  1.7   │ 59.42 │  'No necesito un arma. Yo soy un arma.'  │   70    │  60  │  false  │     true     │ 'pistola' │            │            │
│    1    │ 'Harley Quinn' │  50   │  1.68  │ 63.5  │ 'La muerte es un estado mental, cariño.' │   70    │  80  │         │              │  'bate'   │   false    │    true    │
└─────────┴────────────────┴───────┴────────┴───────┴──────────────────────────────────────────┴─────────┴──────┴─────────┴──────────────┴───────────┴────────────┴────────────┘
    ✔ mostrarAtributos must return a table
    ✔ eficacia black widow -> harley quinn => 18
    ✔ eficacia harley quinn -> black widow => 15
    ✔ eficacia con un numero que no sea 1 o 2 => 0
    ✔ damageGenerado black widow -> harley quinn => not returns error
    ✔ damageGenerado harley quinn -> black widow => not returns error
    ✔ getAguanteRestante => "A Black Widow le queda 45 de vida."
    ✔ getAguanteRestante => "A Harley Quinn le queda 62 de vida."
    ✔ enApuros used by Black Widow => true
    ✔ enApuros used by a full hp player => false
    ✔ battle => not throw an error
    ✔ start => not throw an error
    ✔ comprobarRendicion(Scarlet Witch) => Scarlet Witch se ha rendido
    ✔ comprobarRendicion(Jace) => " "

  DC Tests: 
    ✔ CalcularPoder. 50 => 50. No es metahumano, no cambia
    ✔ CalcularPoder. 80 => 160. Es metahumano, x2
    ✔ CalcularAguante. 70 => 140. Bonus adrenalina, x2
    ✔ CalcularAguante. 60 => 60. No tiene bonus adrenalina
    ✔ fraseAtacar => "Harley Quinn ha golpeado a su rival con su bate.
    ✔ fraseAtacar sin arma => debe retornar algo

  Fighter Tests: 
    ✔ getPoder => 60
    ✔ setPoder(20) => not throw error
    ✔ getPoder => 20
    ✔ getNombre => "Black Widow"
    ✔ getFrase => "No necesito un arma. Yo soy un arma."
    ✔ getAguante => 70
    ✔ setAguante(40) => not throw error
    ✔ getAguante => 40
    ✔ getPeso => 59.42
    ✔ getAltura => 1.70
    ✔ getVida => 60
    ✔ setVida(20) => not throw error
    ✔ getVida => 20

  Marvel Tests: 
    ✔ CalcularPoder Marvel. 60 => 60 si no es mutante
    ✔ CalcularPoder Marvel. 90 => 180 si es mutante
    ✔ CalcularAguante Marvel. 70 => 140 si no es mutante
    ✔ CalcularAguante Marvel. 70 => 70 si es mutante
    ✔ Frase atacar marvel. Si no lleva arma es aleatoria, no puede ser undefined
    ✔ Frase atacar marvel. Si lleva arma -> "Black Widow ha golpeado a su rival con su pistola"

  Pokémon tests: 
    ✔ CalcularAguante with health > 20 to be 40
    ✔ CalcularAguante with health < 20 to be 80
    ✔ CalculadorPoder with attack its type to be 140
    ✔ CalculadorPoder with attack not its type to be 70
    ✔ fraseAtacar to be "Pikachu ha usado impactrueno"

  Shadowhunters tests: 
    ✔ GetRuna => fortis
    ✔ GetRuna => undefined
    ✔ setRuna => not thrown an error
    ✔ CalcularPoder without fortis or dexteritas=> 60 (not changed)
    ✔ CalcularPoder with fortis or dexteritas=> 100 (x2)
    ✔ CalcularAguante without curacion or amissio=> 80 (not changed)
    ✔ CalcularPoder with curacion or amissio=> 140 (x2)
    ✔ fraseAtacar => Jace ha usado . . . must throw

  Documentales tests: 
    ✔ searchByDescriptor("Ciencia y Naturaleza") to be undefined
    ✔ searchByDescriptor("Biografías") must return Ruiz-Mateos: el primer fenómeno viral
    ✔ searchByName("Ovnis: Proyectos de Alto Secreto desclasificado") to be undefined
    ✔ searchByName("Ruiz-Mateos: el primer fenómeno viral") must return Ruiz-Mateos: el primer fenómeno viral
    ✔ searchByYear(2007) to be undefined
    ✔ searchByYear(2021) must return Ruiz-Mateos: el primer fenómeno viral and El ejército de hackers de China
    ✔ searchByCadena(Netflix) to be undefined
    ✔ searchByCadena("RTVE") must return Ruiz-Mateos: el primer fenómeno viral and El ejército de hackers de China

  Peliculas tests: 
    ✔ searchByDescriptor("Accion") must return Capitán América The Winter Soldier
    ✔ searchByYear(2020) must return Tick, Tick... Boom!
    ✔ searchByDirector("Lin-Manuel Miranda") must return Tick, Tick... Boom!
    ✔ searchByName("Capitan América: El soldado de Invierno") must return movie data
    ✔ searchByName("Star Wars") to be undefined
    ✔ searchByActores(["Andrew Garfield"]) to return Tick, Tick, Boom!
    ✔ searchByDescriptor("Humor") to be undefined
    ✔ searchByYear(210) to be undefined
    ✔ searchByDirector("Steven Spielberg") to be undefined
    ✔ searchByActores(["Sandra Bullock", "Jennifer Lawrence"]) to be undefined

  series tests: 
    ✔ searchByDescriptor("Drama") must return Teen Wolf and The Vampire Diaries
    ✔ searchByDescriptor("Humor") must return undefined
    ✔ searchByName("Teen Wolf") must return Teen Wolf data
    ✔ searchByName("Aqui no hay quien viva") must return undefined
    ✔ searchByYear(2011) must return Teen Wolf data
    ✔ searchByYear(2005) must return undefined
    ✔ searchByTemporadas(6) must return Teen Wolf data
    ✔ searchByTemporadas(2) must return undefined
    ✔ searchByDirector("Julie Plec") must return The Vampire Diaries
    ✔ searchByDirector("Andy Muschietti") must return undefined

  Basic Streamable Collection tests: 
    ✔ getItem to return items in index one
    ✔ getNumberOfITems to return 2
    ✔ addItem to not thrown an error
    ✔ getNumberOfITems to return 3
    ✔ removeItem to not thrown an error
    ✔ getNumberOfITems to return 2

  Cifrado tests: 
    ✔ splitEnarray("hola") debe separar los caracteres en un array
    ✔ checkDisplacement("C") => 3
    ✔ displacementCharacter("O", 12) => A
    ✔ checkLongClave => not throw
    ✔ checkLongClave => not throw
    ✔ checkLongClave => exist
    ✔ checkLongClave => be a function
    ✔ displacementString => KAMWJVFPAXXYBMWXPCW

  Ejercicio clase tests: 
    ✔ GetItem(1) debe retornar dos, que es la posición 1 del array de números [1,2,3]
    ✔ GetString(1) debe retornar "adios", que es la posición 1 del array de strings [hola,adios,a]
    ✔ getNumberItems en numbers = > 2
    ✔ getNumberItems en string = > 3
    ✔ search en numeros => [2]
    ✔ search "casa" en string => undefined
    ✔ search "a" en string => [a]


  102 passing (86ms)

```

Además, se ha hecho uso de Coveralls para comprobar la completitud de las mismas, siendo este el resultado:

```terminal

File                             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
---------------------------------|---------|----------|---------|---------|-------------------
All files                        |   91.02 |    77.88 |   95.55 |   90.79 |                   
 ejercicio-1                     |   82.31 |    63.79 |   94.87 |   82.31 |                   
  Combat.ts                      |   55.17 |    34.37 |      80 |   55.17 | 80-124            
  DC.ts                          |     100 |      100 |     100 |     100 |                   
  Fighter.ts                     |     100 |      100 |     100 |     100 |                   
  Marvel.ts                      |     100 |      100 |     100 |     100 |                   
  Pokemon.ts                     |     100 |      100 |     100 |     100 |                   
  Shadowhunters.ts               |     100 |      100 |     100 |     100 |                   
 ejercicio-2                     |     100 |      100 |     100 |     100 |                   
  BasicStreamableCollection.ts   |     100 |      100 |     100 |     100 |                   
  Documentales.ts                |     100 |      100 |     100 |     100 |                   
  Peliculas.ts                   |     100 |      100 |     100 |     100 |                   
  Series.ts                      |     100 |      100 |     100 |     100 |                   
 ejercicio-3                     |     100 |     87.5 |     100 |     100 |                   
  Cifrado.ts                     |     100 |     87.5 |     100 |     100 | 41                
 ejercicio-clase                 |   90.62 |     87.5 |   77.77 |   89.65 |                   
  NumericSearchableCollection.ts |    90.9 |       75 |     100 |      90 | 20                
  SearchableCollection.ts        |      80 |      100 |      60 |   77.77 | 12,27             
  StringSearchableCollection.ts  |     100 |      100 |     100 |     100 |                   
---------------------------------|---------|----------|---------|---------|-------------------

```

Los resultados más bajos están en la clase `Combat`, dentro del ejercicio uno. Estas líneas se encuentran en el método start, donde se dificulta la realización de pruebas; de resto, todas muestran un porcentaje correcto.