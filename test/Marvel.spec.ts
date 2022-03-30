import 'mocha';
import {expect} from 'chai';
import {Marvel} from '../../src/ejercicio-1/Marvel';

const BlackWidow = new Marvel('Black Widow', 60, 1.70, 59.42, 'No necesito un arma. Yo soy un arma.', 70, 60, false, true, 'pistola');
const ScarletWitch = new Marvel('Scarlet Witch', 90, 1.65, 63, 'Me arrebataste todo.', 70, 50, true, false);

describe('Marvel Tests: ', () => {
  it('CalcularPoder Marvel. 60 => 60 si no es mutante', () =>{
    expect(BlackWidow.calcularPoder()).to.be.equal(60);
  });
  it('CalcularPoder Marvel. 90 => 180 si es mutante', () =>{
    expect(ScarletWitch.calcularPoder()).to.be.equal(180);
  });
  it('CalcularAguante Marvel. 70 => 140 si no es mutante', () =>{
    expect(BlackWidow.calcularAguante()).to.be.equal(140);
  });
  it('CalcularAguante Marvel. 70 => 70 si es mutante', () =>{
    expect(ScarletWitch.calcularAguante()).to.be.equal(70);
  });
  it('Frase atacar marvel. Si no lleva arma es aleatoria, no puede ser undefined', () =>{
    expect(ScarletWitch.fraseAtacar()).to.not.be.equal(' ');
  });
  it('Frase atacar marvel. Si lleva arma -> "Black Widow ha golpeado a su rival con su pistola"', () =>{
    expect(BlackWidow.fraseAtacar()).to.be.equal('Black Widow ha golpeado a su rival con su pistola.');
  });
});
