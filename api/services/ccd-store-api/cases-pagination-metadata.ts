import * as express from 'express'
import { config } from '../../../config'
import { http } from '../../lib/http'
import * as log4jui from '../../lib/log4jui'
import { ERROR_UNABLE_TO_GET_CASES_FOR_JURISDICTION } from '../../lib/errors'

const logger = log4jui.getLogger('ccd-store')

const url = config.services.ccd_data_api
