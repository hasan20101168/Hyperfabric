/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class FabCar extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const cars = [
            {
                name: "Company A",
                type: "private",
                cashout: "50000",
                cashin: "75000",
                employee: "100",
                country: "USA",
                reputation: "good"
              },
              {
                name: "Company B",
                type: "public",
                cashout: "80000",
                cashin: "90000",
                employee: "200",
                country: "Canada",
                reputation: "excellent"
              },
              {
                name: "Company C",
                type: "private",
                cashout: "60000",
                cashin: "55000",
                employee: "50",
                country: "UK",
                reputation: "fair"
              },
              {
                name: "Company D",
                type: "ngo",
                cashout: "20000",
                cashin: "25000",
                employee: "20",
                country: "Australia",
                reputation: "poor"
              },
              {
                name: "Company E",
                type: "private",
                cashout: "70000",
                cashin: "80000",
                employee: "150",
                country: "Germany",
                reputation: "excellent"
              },
              {
                name: "Company F",
                type: "public",
                cashout: "90000",
                cashin: "95000",
                employee: "300",
                country: "Japan",
                reputation: "good"
              },
              {
                name: "Company G",
                type: "ngo",
                cashout: "30000",
                cashin: "35000",
                employee: "25",
                country: "Brazil",
                reputation: "banned"
              },
              {
                name: "Company H",
                type: "private",
                cashout: "40000",
                cashin: "45000",
                employee: "75",
                country: "France",
                reputation: "fair"
              },
              {
                name: "Company I",
                type: "public",
                cashout: "100000",
                cashin: "120000",
                employee: "400",
                country: "China",
                reputation: "excellent"
              },
              {
                name: "Company J",
                type: "private",
                cashout: "55000",
                cashin: "60000",
                employee: "120",
                country: "India",
                reputation: "good"
              },
        ];

        for (let i = 0; i < cars.length; i++) {
            cars[i].docType = 'car';
            await ctx.stub.putState('CAR' + i, Buffer.from(JSON.stringify(cars[i])));
            console.info('Added <--> ', cars[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryCar(ctx, carNumber) {
        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        console.log(carAsBytes.toString());
        return carAsBytes.toString();
    }

    async createCar(ctx, carNumber, name, type, cashout, cashin, employee, country, reputation) {
        console.info('============= START : Create Car ===========');

        const car = {
            name,
            docType: 'car',
            type,
            cashout,
            cashin,
            employee,
            country,
            reputation,
        };

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : Create Car ===========');
    }

    async queryAllCars(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async changeCarOwner(ctx, carNumber, newName) {
        console.info('============= START : changeCompanyName ===========');

        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.name = newName;

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCompanyName ===========');
    }

    async changeCompanyType(ctx, carNumber, newType) {
      console.info('============= START : changeCompanyType ===========');

      const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
      if (!carAsBytes || carAsBytes.length === 0) {
          throw new Error(`${carNumber} does not exist`);
      }
      const car = JSON.parse(carAsBytes.toString());
      car.type = newType;

      await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
      console.info('============= END : changeCompanyType ===========');
    }

    async changeCompanyEmployee(ctx, carNumber, newCount) {
      console.info('============= START : changeCompanyEmployee ===========');

      const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
      if (!carAsBytes || carAsBytes.length === 0) {
          throw new Error(`${carNumber} does not exist`);
      }
      const car = JSON.parse(carAsBytes.toString());
      car.employee = newCount;

      await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
      console.info('============= END : changeCompanyEmployee ===========');
    }

    async changeCompanyCountry(ctx, carNumber, newCountry) {
      console.info('============= START : changeCompanyCountry ===========');

      const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
      if (!carAsBytes || carAsBytes.length === 0) {
          throw new Error(`${carNumber} does not exist`);
      }
      const car = JSON.parse(carAsBytes.toString());
      car.country = newCountry;

      await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
      console.info('============= END : changeCompanyCountry ===========');
    }

}

module.exports = FabCar;
