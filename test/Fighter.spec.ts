import 'mocha';
import {expect} from 'chai';
import {Marvel} from '../../src/ejercicio-1/Marvel';


const BlackWidow = new Marvel('Black Widow', 60, 1.70, 59.42, 'No necesito un arma. Yo soy un arma.', 70, 60, false, true, 'pistola');

describe('Fighter Tests: ', () => {
  it('getPoder => 60', () =>{
    expect(BlackWidow.getPoder()).to.be.equal(60);
  });
  it('setPoder(20) => not throw error', () =>{
    expect(BlackWidow.setPoder(20)).to.not.throw;
  });
  it('getPoder => 20', () =>{
    expect(BlackWidow.getPoder()).to.be.equal(20);
  });
  it('getNombre => "Black Widow"', () =>{
    expect(BlackWidow.getNombre()).to.be.equal('Black Widow');
  });
  it('getFrase => "No necesito un arma. Yo soy un arma."', () =>{
    expect(BlackWidow.getFrase()).to.be.equal('No necesito un arma. Yo soy un arma.');
  });
  it('getAguante => 70', () =>{
    expect(BlackWidow.getAguante()).to.be.equal(70);
  });
  it('setAguante(40) => not throw error', () =>{
    expect(BlackWidow.setAguante(40)).to.not.throw;
  });
  it('getAguante => 40', () =>{
    expect(BlackWidow.getAguante()).to.be.equal(40);
  });
  it('getPeso => 59.42', () =>{
    expect(BlackWidow.getPeso()).to.be.equal(59.42);
  });
  it('getAltura => 1.70', () =>{
    expect(BlackWidow.getAltura()).to.be.equal(1.70);
  });
  it('getVida => 60', () =>{
    expect(BlackWidow.getVida()).to.be.equal(60);
  });
  it('setVida(20) => not throw error', () =>{
    expect(BlackWidow.setVida(20)).to.not.throw;
  });
  it('getVida => 20', () =>{
    expect(BlackWidow.getVida()).to.be.equal(20);
  });
});