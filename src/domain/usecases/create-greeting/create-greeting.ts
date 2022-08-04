import { Generator, GreetingsRepo, UseCase, UseCaseConstructor } from '../../boundaries'

type Params = {
  repo: GreetingsRepo
  dateGenerator: Generator<Date>
}

type Request = {
  name: string
}

type Response = {
  message: string
}

export type CreateGreetingUseCase = UseCase<Request, Response>

export const createGreetingUseCase: UseCaseConstructor<Params, Request, Response> = (params) => async (request) => {
  const { repo, dateGenerator } = params
  const { name } = request

  await repo.save({
    id: '',
    from: name,
    to: '',
    message: '',
    createdOn: dateGenerator.next(),
    modifiedOn: dateGenerator.next(),
  })

  return {
    message: `Hi, ${name}!`,
  }
}
