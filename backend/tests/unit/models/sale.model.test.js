const { expect } = require('chai');
const sinon = require('sinon');
const { saleModel } = require('../../../src/models'); 

const connection = require('../../../src/models/connection');
const { allSales, newSale, updatedSale } = require('./mocks/sale.model.mock');

describe('Testes de unidade do model de sales', function () {
  it('Recuperando lista de todos as sales', async function () {
    sinon.stub(connection, 'execute').resolves([allSales]);

    const result = await saleModel.findAll();

    expect(result).to.be.deep.equal(allSales);
  });

  it('Recuperando sale por id', async function () {
    sinon.stub(connection, 'execute').resolves([allSales[2]]);

    const result = await saleModel.findById(2);

    expect(result).to.be.deep.equal(allSales[2]);
  });

  it('cria uma sale', async function () {
    sinon.stub(connection, 'execute').resolves([[{ id: 2 }]]);
    
    const result = await saleModel.createSaleId();

    expect(result).to.be.deep.equal(3);
  });

  it('cria uma sale_product, sendo um unico objeto por vez', async function () {
    sinon.stub(connection, 'execute').resolves([newSale[0]]);
    
    const result = await saleModel.create(3, newSale[0]);

    expect(result).to.be.deep.equal(newSale[0]);
  });

  it('Atualiza a quantity de uma sale', async function () {
    sinon.stub(connection, 'execute').resolves([[updatedSale]]);

    const result = await saleModel.update(20, 1, 2);

    expect(result).to.be.equal(updatedSale);
  });
  
  it('Deleta uma sale por id', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const result = await saleModel.deleteSale(2);

    expect(result).to.be.equal(1);
  });

afterEach(function () {
  sinon.restore();
});
});