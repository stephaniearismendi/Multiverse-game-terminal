import 'mocha';
import {expect} from 'chai';
import {Pokemon} from '../../src/ejercicio-1/Pokemon';
const Pikachu = new Pokemon('electrico', ['impactrueno', 'electrico'],
    70, 'Pikachu', 0.4, 6, '¡Pika, pika!', 40, 70);
const PikachuDamaged = new Pokemon('electrico', ['fuerza', 'normal'],
    70, 'Pikachu', 0.4, 6, '¡Pika, pika!', 40, 15);

describe('Pokémon tests: ', () => {
  it('CalcularAguante with health > 20 to be 40', () =>{
    expect(Pikachu.calcularAguante()).to.be.equal(40);
  });
  it('CalcularAguante with health < 20 to be 80', () =>{
    expect(PikachuDamaged.calcularAguante()).to.be.equal(80);
  });
  it('CalculadorPoder with attack its type to be 140', () =>{
    expect(Pikachu.calcularPoder()).to.be.equal(140);
  });
  it('CalculadorPoder with attack not its type to be 70', () =>{
    expect(PikachuDamaged.calcularPoder()).to.be.equal(70);
  });
  it('fraseAtacar to be "Pikachu ha usado impactrueno"', () =>{
    expect(Pikachu.fraseAtacar()).to.be.equal('Pikachu ha usado impactrueno.');
  });
});