import { WithLoggingGreetingRepo, makeLogger, plainMap, withLogging } from 'shared/logger'
import { getSharedDateGenerator, getSharedUUIDGenerator } from '../../generators'

import { HandlerFactory } from '../types'
import { createGreetingUseCase } from 'domain/usecases'
import { getSharedGreetingsRepo } from '../../repositories'
import { makeContextFromRequest } from '../utils'
import { postGreetingHandler } from 'delivery/api/handlers'

export const postGreetingHandlerFactory: HandlerFactory = (req, _res) => {
  const context = makeContextFromRequest(req)
  const logger = makeLogger({ context })

  const repo = getSharedGreetingsRepo()
  const decoratedRepo = WithLoggingGreetingRepo({
    repo,
    logger,
  })

  const dateGenerator = getSharedDateGenerator()
  const uuidGenerator = getSharedUUIDGenerator()

  const usecase = createGreetingUseCase({ repo: decoratedRepo, dateGenerator, uuidGenerator })
  const decoratedUsecase = withLogging(logger, 'USECASE', 'createGreetingUseCase')(usecase, plainMap, plainMap)

  const handler = postGreetingHandler({
    usecase: decoratedUsecase,
  })

  return withLogging(logger, 'API', 'postGreetingHandler')(handler)
}
