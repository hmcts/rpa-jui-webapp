import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import  { getTotalPages } from './pagination'

chai.use(sinonChai)

describe('pagination', () => {
    describe('should return ', () => {
        expect(getTotalPages()).toEqual(false)
    })
})
