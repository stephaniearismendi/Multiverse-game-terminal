import 'mocha';
import {expect} from 'chai';
import {DC} from '../../src/ejercicio-1/DC';

const HarleyQuinn = new DC(50, 'Harley Quinn', 1.68, 63.5, 'La muerte es un estado mental, cariño.', 70, 80, false, true, 'bate');
const Flash = new DC(80, 'The Flash', 1.88, 75, 'Si crees en lo imposible, te conviertes en lo imposible.', 60, 90, true, false);

describe('DC Tests: ', () => {
  it('CalcularPoder. 50 => 50. No es metahumano, no cambia', () =>{
    expect(HarleyQuinn.calcularPoder()).to.be.equal(50);
  });
  it('CalcularPoder. 80 => 160. Es metahumano, x2', () =>{
    expect(Flash.calcularPoder()).to.be.equal(160);
  });
  it('CalcularAguante. 70 => 140. Bonus adrenalina, x2', () =>{
    expect(HarleyQuinn.calcularAguante()).to.be.equal(140);
  });
  it('CalcularAguante. 60 => 60. No tiene bonus adrenalina', () =>{
    expect(Flash.calcularAguante()).to.be.equal(60);
  });
  it('fraseAtacar => "Harley Quinn ha golpeado a su rival con su bate.', () =>{
    expect(HarleyQuinn.fraseAtacar()).to.be.equal('Harley Quinn ha golpeado a su rival con su bate.');
  });
  it('fraseAtacar sin arma => debe retornar algo', () =>{
    expect(Flash.fraseAtacar()).to.be.not.equal(' ');
  });
});
