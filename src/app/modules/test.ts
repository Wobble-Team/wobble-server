import mongoose from '../models'

class Test {
    constructor(){}

    async addTest(){
        const newTest = new mongoose.TestModel({
            name: 'Peterson Ngo',
            age: 23,
            shirt_size: 'XL'
          });
        
          try {
            const savedTest = await newTest.save();
            console.log('User saved:', savedTest);
          } catch (error) {
            console.error('Error saving user:', error);
          }
    }
}


export const testInstance = new Test();