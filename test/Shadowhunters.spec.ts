import 'mocha';
import {expect} from 'chai';
import {Shadowhunters} from '../../src/ejercicio-1/Shadowhunters';

const Jace = new Shadowhunters(50, 'Jace Herondale', 1.80, 82,
    '¿Quieres llevar esto afuera y probar esas habilidades de lucha?', 80, 70, 'fortis');
const Clary = new Shadowhunters(60, 'Clary Fairchild', 1.54, 60,
    'Tengo un demonio que matar', 70, 50);

describe('Shadowhunters tests: ', () => {
  it('GetRuna => fortis', () =>{
    expect(Jace.getRuna()).to.be.equal('fortis');
  });
  it('GetRuna => undefined', () =>{
    expect(Clary.getRuna()).to.be.undefined;
  });
  it('setRuna => not thrown an error', () =>{
    expect(Clary.setRuna('amissio')).to.not.throw;
  });
  it('CalcularPoder without fortis or dexteritas=> 60 (not changed)', () =>{
    expect(Clary.calcularPoder()).to.be.equal(60);
  });
  it('CalcularPoder with fortis or dexteritas=> 100 (x2)', () =>{
    expect(Jace.calcularPoder()).to.be.equal(100);
  });
  it('CalcularAguante without curacion or amissio=> 80 (not changed)', () =>{
    expect(Jace.calcularAguante()).to.be.equal(80);
  });
  it('CalcularPoder with curacion or amissio=> 140 (x2)', () =>{
    expect(Clary.calcularAguante()).to.be.equal(140);
  });
  it('fraseAtacar => Jace ha usado . . . must throw', () =>{
    expect(Jace.fraseAtacar()).to.throw;
  });
});