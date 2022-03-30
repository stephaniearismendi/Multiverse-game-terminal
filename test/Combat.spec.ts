import 'mocha';
import {expect} from 'chai';
import {Marvel} from '../../src/ejercicio-1/Marvel';
import {DC} from '../../src/ejercicio-1/DC';
import {Combat} from '../../src/ejercicio-1/Combat';
import {Fighter} from '../../src/ejercicio-1/Fighter';
import {Shadowhunters} from '../../src/ejercicio-1/Shadowhunters';

const BlackWidow = new Marvel('Black Widow', 60, 1.70, 59.42, 'No necesito un arma. Yo soy un arma.', 70, 60, false, true, 'pistola');
const HarleyQuinn = new DC(50, 'Harley Quinn', 1.68, 63.5, 'La muerte es un estado mental, cariño.', 70, 80, false, true, 'bate');
const Oponentes:Fighter[] = [BlackWidow, HarleyQuinn];
const ScarletWitch = new Marvel('Scarlet Witch', 90, 1.65, 63, 'Me arrebataste todo.', 70, 0, true, false);
const Jace = new Shadowhunters(50, 'Jace Herondale', 1.80, 82,
    '¿Quieres llevar esto afuera y probar esas habilidades de lucha?', 80, 70, 'fortis');
const combate = new Combat(BlackWidow, HarleyQuinn);
const combateFull = new Combat(Jace, HarleyQuinn);
const combateSinVida = new Combat(ScarletWitch, Jace);

describe('Combat Tests: ', () => {
  it('decirFrase => ["No necesito un arma. Yo soy un arma", "La muerte es un estado mental, cariño"]', () =>{
    expect(combate.decirFrases()).to.be.deep.equal([BlackWidow.getFrase(), HarleyQuinn.getFrase()]);
  });
  it('mostrarAtributos must return a table', () =>{
    expect(combate.mostrarAtributos()).to.be.deep.equal(console.table(Oponentes));
  });
  it('eficacia black widow -> harley quinn => 18', () =>{
    expect(combate.eficacia(1)).to.be.equal(18);
  });
  it('eficacia harley quinn -> black widow => 15', () =>{
    expect(combate.eficacia(2)).to.be.equal(15);
  });
  it('eficacia con un numero que no sea 1 o 2 => 0', () =>{
    expect(combate.eficacia(3)).to.be.equal(0);
  });
  it('damageGenerado black widow -> harley quinn => not returns error', () =>{
    expect(combate.damageGenerado(2)).to.not.throw;
  });
  it('damageGenerado harley quinn -> black widow => not returns error', () =>{
    expect(combate.damageGenerado(1)).to.not.throw;
  });
  it('getAguanteRestante => "A Black Widow le queda 45 de vida."', () =>{
    expect(combate.getAguanteRestante(BlackWidow)).to.be.equal('A Black Widow le queda 45 de vida.');
  });
  it('getAguanteRestante => "A Harley Quinn le queda 62 de vida."', () =>{
    expect(combate.getAguanteRestante(HarleyQuinn)).to.be.equal('A Harley Quinn le queda 62 de vida.');
  });
  it('enApuros used by Black Widow => true', () =>{
    expect(combate.enApuros(BlackWidow)).to.be.true;
  });
  it('enApuros used by a full hp player => false', () =>{
    expect(combateFull.enApuros(Jace)).to.be.false;
  });
  it('battle => not throw an error', () =>{
    expect(combate.battle).to.not.throw;
  });
  it('start => not throw an error', () =>{
    expect(combate.start).to.not.throw;
  });
  it('start => to exist', () =>{
    expect(combate.start).to.exist;
  });
  it('start sin vida=> not throw an error', () =>{
    expect(combateSinVida.start).to.not.throw;
  });
  it('comprobarRendicion(Scarlet Witch) => Scarlet Witch se ha rendido', ()=>{
    expect(combateSinVida.comprobarRendicion(ScarletWitch)).to.be.equal('Scarlet Witch se ha rendido.');
  });
  it('comprobarRendicion(Jace) => " "', ()=>{
    expect(combateSinVida.comprobarRendicion(Jace)).to.be.equal(' ');
  });
});