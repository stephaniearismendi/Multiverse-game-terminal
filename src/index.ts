import {Combat} from './Combat';
import {Pokemon} from './Pokemon';
import {Marvel} from './Marvel';
import {Shadowhunters} from './Shadowhunters';
import {DC} from './DC';
import {BaseDeDatos} from './BaseDeDatos';
const scanf = require('scanf');


const Pikachu = new Pokemon('electrico', ['impactrueno', 'electrico'],
    70, 'Pikachu', 0.4, 6, '¡Pika, pika!', 40, 70);
const Jace = new Shadowhunters(50, 'Jace Herondale', 1.80, 82,
    '¿Quieres llevar esto afuera y probar esas habilidades de lucha?', 80, 70, 'fortis');
const BlackWidow = new Marvel('Black Widow', 60, 1.70, 59.42, 'No necesito un arma. Yo soy un arma.', 70, 60, false, true);
const HarleyQuinn = new DC(50, 'Harley Quinn', 1.68, 63.5, 'La muerte es un estado mental, cariño.', 70, 80, false, true, 'bate');
const baseDeDatos = new BaseDeDatos([Pikachu, Jace, BlackWidow]);
baseDeDatos.insertarParticipante(HarleyQuinn);
console.log('Bienvenido a la pelea multiversal.');
console.log('A continuación se mostrarán los personajes disponibles');
baseDeDatos.mostrarBaseDeDatos();
console.log('Introduce los índices de los personajes que deseas que combatan: ');
const indicesPersonajes:number[] = [0, 0];
for (let i = 0; i < 2; i++) {
  indicesPersonajes[i] = scanf('%d');
}
console.log('Elección guardada.');
console.clear();
const combate = new Combat(baseDeDatos.getPersonaje(indicesPersonajes[0]), baseDeDatos.getPersonaje(indicesPersonajes[1]));
combate.start();
